#!/usr/bin/env node

/**
 * Sync Podman Documentation Script
 * 
 * This script fetches documentation from the containers/podman repository
 * and syncs it with the local Docusaurus versioned documentation structure.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const PODMAN_REPO = 'containers/podman';
const GITHUB_API_BASE = 'https://api.github.com';
const VERSIONED_DOCS_DIR = path.join(__dirname, '..', 'versioned_docs');
const VERSIONED_SIDEBARS_DIR = path.join(__dirname, '..', 'versioned_sidebars');
const VERSIONS_FILE = path.join(__dirname, '..', 'versions.json');
const TEMP_DIR = path.join(__dirname, '..', 'temp');

// GitHub API helper
function makeGitHubRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'User-Agent': 'podman-website-sync',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`GitHub API error: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Get latest releases from GitHub
async function getLatestReleases() {
  console.log('Fetching latest Podman releases...');
  const releases = await makeGitHubRequest(`/repos/${PODMAN_REPO}/releases?per_page=10`);
  
  // Filter out pre-releases and get stable versions
  const stableReleases = releases
    .filter(release => !release.prerelease && !release.draft)
    .slice(0, 5); // Get latest 5 stable releases
  
  console.log(`Found ${stableReleases.length} stable releases`);
  return stableReleases;
}

// Get tags from GitHub
async function getLatestTags() {
  console.log('Fetching latest Podman tags...');
  const tags = await makeGitHubRequest(`/repos/${PODMAN_REPO}/tags?per_page=20`);
  
  // Filter version tags (e.g., v5.2.0, v5.1.1)
  const versionTags = tags.filter(tag => 
    tag.name.match(/^v\d+\.\d+\.\d+$/)
  ).slice(0, 5);
  
  console.log(`Found ${versionTags.length} version tags`);
  return versionTags;
}

// Download and extract documentation for a specific version
async function downloadDocsForVersion(version) {
  console.log(`Downloading docs for version ${version}...`);
  
  // Remove 'v' prefix for directory name
  const versionNumber = version.replace(/^v/, '');
  const outputPath = path.join(VERSIONED_DOCS_DIR, `version-${versionNumber}`);
  
  // Create output directory
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  
  // Download the archive
  const archiveUrl = `https://github.com/${PODMAN_REPO}/archive/refs/tags/${version}.tar.gz`;
  const tempArchive = path.join(TEMP_DIR, `${version}.tar.gz`);
  
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }
  
  // Download archive using curl
  try {
    execSync(`curl -L -o "${tempArchive}" "${archiveUrl}"`, { stdio: 'inherit' });
    
    // Extract the archive
    execSync(`tar -xzf "${tempArchive}" -C "${TEMP_DIR}"`, { stdio: 'inherit' });
    
    // Find the extracted directory (GitHub archives have format: reponame-version)
    const extractedDirs = fs.readdirSync(TEMP_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('podman-'))
      .map(dirent => dirent.name);
    
    if (extractedDirs.length === 0) {
      throw new Error(`No extracted podman directory found in ${TEMP_DIR}`);
    }
    
    const podmanSrcDir = path.join(TEMP_DIR, extractedDirs[0]);
    console.log(`  📁 Found extracted directory: ${extractedDirs[0]}`);
    
    // Check if Makefile exists and try to run "make docs"
    const makefilePath = path.join(podmanSrcDir, 'Makefile');
    if (fs.existsSync(makefilePath)) {
      console.log(`  ⚙️  Running "make docs" for ${version}...`);
      try {
        // Use more explicit shell execution
        execSync('make docs', { 
          cwd: podmanSrcDir, 
          stdio: 'inherit',
          shell: '/bin/bash',
          env: { 
            ...process.env, 
            PATH: process.env.PATH || '/usr/bin:/bin:/usr/local/bin'
          }
        });
        console.log(`  ✓ Documentation built successfully for ${version}`);
      } catch (makeError) {
        console.warn(`  ⚠️  Warning: "make docs" failed for ${version}, proceeding with existing files...`);
        console.warn(`     Error: ${makeError.message}`);
        // Check if it's a dependency issue
        if (makeError.message.includes('ENOENT') || makeError.message.includes('command not found')) {
          console.warn(`     This might be due to missing build dependencies (make, go, etc.)`);
        }
      }
    } else {
      console.warn(`  ⚠️  No Makefile found in ${podmanSrcDir}, skipping "make docs"`);
    }
    
    // Copy documentation files (only .md files, not .md.in)
    const docsSourcePath = path.join(podmanSrcDir, 'docs');
    if (fs.existsSync(docsSourcePath)) {
      await copyAndProcessDocs(docsSourcePath, outputPath, version);
    } else {
      console.warn(`  ⚠️  No docs directory found at ${docsSourcePath}`);
    }
    
    // Cleanup
    fs.rmSync(tempArchive, { force: true });
    fs.rmSync(podmanSrcDir, { recursive: true, force: true });
    
    // Remove README.md from version root to prevent route conflicts
    const readmeConflict = path.join(outputPath, 'README.md');
    if (fs.existsSync(readmeConflict)) {
      fs.unlinkSync(readmeConflict);
      console.log(`  ✓ Removed conflicting README.md from version root`);
    }
    
    console.log(`✓ Documentation for ${version} processed successfully`);
    return versionNumber;
  } catch (error) {
    console.error(`✗ Failed to download docs for ${version}:`, error.message);
    return null;
  }
}

// Copy and process documentation files
async function copyAndProcessDocs(sourcePath, outputPath, version) {
  const files = fs.readdirSync(sourcePath, { withFileTypes: true });
  
  for (const file of files) {
    const sourceFull = path.join(sourcePath, file.name);
    const outputFull = path.join(outputPath, file.name);
    
    if (file.isDirectory()) {
      if (!fs.existsSync(outputFull)) {
        fs.mkdirSync(outputFull, { recursive: true });
      }
      await copyAndProcessDocs(sourceFull, outputFull, version);
    } else if (file.name.endsWith('.md')) {
      // Only process .md files (skip .md.in since "make docs" generates the final .md files)
      let content = fs.readFileSync(sourceFull, 'utf8');
      
      // Process the markdown content
      content = await processMarkdownContent(content, version);
      
      fs.writeFileSync(outputFull, content);
    }
    // Note: .md.in files are intentionally skipped since "make docs" generates .md files from them
  }
}

// Process markdown content for Docusaurus
async function processMarkdownContent(content, version) {
  // Add frontmatter if not present
  if (!content.startsWith('---')) {
    const title = extractTitleFromContent(content);
    const frontmatter = `---
title: ${title}
version: ${version}
---

`;
    content = frontmatter + content;
  } else {
    // Update existing frontmatter version
    content = content.replace(/^(---[\s\S]*?)version:\s*[^\n]*\n/m, `$1version: ${version}\n`);
  }
  
  // Fix relative links to work with Docusaurus
  content = content.replace(/\]\(([^)]+\.md)\)/g, (match, link) => {
    // Skip external links and absolute paths
    if (link.startsWith('http') || link.startsWith('/')) {
      return match;
    }
    
    // For Docusaurus versioned docs, keep relative paths with .md extension
    // but clean up any ./ prefixes
    const cleanLink = link.replace(/^\.\//, '');
    return `](${cleanLink})`;
  });
  
  // Fix image paths
  content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    if (src.startsWith('http')) {
      return match; // Keep absolute URLs as-is
    }
    // Convert relative image paths
    const cleanSrc = src.replace(/^\.\//, '');
    return `![${alt}](${cleanSrc})`;
  });
  
  return content;
}

// Extract title from markdown content
function extractTitleFromContent(content) {
  const lines = content.split('\n');
  
  // First try to find NAME section (common in manpages)
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].trim() === '## NAME') {
      const nameLine = lines[i + 1].trim();
      if (nameLine) {
        // Extract the full command name (including hyphens) before the dash and description
        const commandMatch = nameLine.match(/^([^\s\\]+(?:\\?-[^\s\\]+)*)/);
        if (commandMatch) {
          // Remove backslash escapes for display
          return commandMatch[1].replace(/\\/g, '');
        }
        return nameLine;
      }
    }
  }
  
  // Fallback: Look for # title
  for (const line of lines) {
    const match = line.match(/^#\s+(.+)$/);
    if (match) {
      return match[1].trim();
    }
  }
  
  // Last fallback: try to extract from filename if it looks like a command
  const filename = content.match(/% ([^\s]+)/);
  if (filename) {
    return filename[1];
  }
  
  return 'Documentation';
}

// Create index file for version
function createIndexFile(outputPath, version) {
  const versionNumber = version.replace(/^v/, '');
  const indexContent = `---
title: Podman Documentation
version: ${version}
---

# Podman Documentation (${version})

Welcome to the Podman documentation for version ${version}.

## Getting Started

- [Installation Instructions](https://podman.io/get-started)
- [Basic Tutorial](tutorials/podman_tutorial.md)
- [Rootless Containers](tutorials/rootless_tutorial.md)

## Commands

- [podman](source/markdown/podman.1.md)
- [podman-build](source/markdown/podman-build.1.md)
- [podman-run](source/markdown/podman-run.1.md)
- [podman-ps](source/markdown/podman-ps.1.md)

## Tutorials

- [Basic Networking](tutorials/basic_networking.md)
- [Rootless Tutorial](tutorials/rootless_tutorial.md)
- [Podman Tutorial](tutorials/podman_tutorial.md)
- [Performance](tutorials/performance.md)

## System & Management

- [System Commands](source/markdown/podman-system.1.md)
- [Machine Commands](source/markdown/podman-machine.1.md)
- [Pod Management](source/markdown/podman-pod.1.md)
- [Volume Management](source/markdown/podman-volume.1.md)

## Advanced Features

- [Systemd Integration](source/markdown/podman-systemd.unit.5.md)
- [Kubernetes Support](source/markdown/podman-kube.1.md)
- [Secret Management](source/markdown/podman-secret.1.md)
- [Code Generation](source/markdown/podman-generate.1.md)
`;

  fs.writeFileSync(path.join(outputPath, 'index.md'), indexContent);
}

// Update versions.json file
function updateVersionsFile(versions) {
  // Sort versions in descending order (newest first)
  const sortedVersions = versions.sort((a, b) => {
    const aNum = a.split('.').map(n => parseInt(n));
    const bNum = b.split('.').map(n => parseInt(n));
    
    for (let i = 0; i < Math.max(aNum.length, bNum.length); i++) {
      const aPart = aNum[i] || 0;
      const bPart = bNum[i] || 0;
      if (aPart !== bPart) {
        return bPart - aPart;
      }
    }
    return 0;
  });

  fs.writeFileSync(VERSIONS_FILE, JSON.stringify(sortedVersions, null, 2));
  console.log('✅ Updated versions.json with:', sortedVersions);
}

// Get versions from versioned_docs directory structure (moved from update-versions.js)
function getVersionsFromDirectories() {
  if (!fs.existsSync(VERSIONED_DOCS_DIR)) {
    console.log('versioned_docs directory not found');
    return [];
  }
  
  const dirs = fs.readdirSync(VERSIONED_DOCS_DIR, { withFileTypes: true });
  const versions = dirs
    .filter(dir => dir.isDirectory() && dir.name.startsWith('version-'))
    .map(dir => dir.name.replace('version-', ''))
    .sort((a, b) => {
      // Sort in descending order (newest first)
      const aNum = a.split('.').map(n => parseInt(n));
      const bNum = b.split('.').map(n => parseInt(n));
      
      for (let i = 0; i < Math.max(aNum.length, bNum.length); i++) {
        const aPart = aNum[i] || 0;
        const bPart = bNum[i] || 0;
        if (aPart !== bPart) {
          return bPart - aPart;
        }
      }
      return 0;
    });
  
  return versions;
}

// Generate versioned sidebar JSON files
function generateVersionedSidebars(versions) {
  // Create versioned_sidebars directory if it doesn't exist
  if (!fs.existsSync(VERSIONED_SIDEBARS_DIR)) {
    fs.mkdirSync(VERSIONED_SIDEBARS_DIR, { recursive: true });
  }
  
  // Generate sidebar file for each version
  for (const version of versions) {
    const versionDocsPath = path.join(VERSIONED_DOCS_DIR, `version-${version}`);
    const tutorialsPath = path.join(versionDocsPath, 'tutorials');
    
    // Dynamically discover tutorial files
    let tutorialItems = [];
    if (fs.existsSync(tutorialsPath)) {
      const tutorialFiles = fs.readdirSync(tutorialsPath)
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace('.md', ''))
        .sort(); // Sort alphabetically
      
      tutorialItems = tutorialFiles.map(filename => `tutorials/${filename}`);
      console.log(`✅ Found ${tutorialItems.length} tutorial files for version ${version}:`, tutorialFiles);
    } else {
      console.warn(`⚠️  No tutorials directory found for version ${version}`);
    }
    
    // Standard sidebar structure for Podman documentation with dynamic tutorials
    const sidebarConfig = {
      "tutorialSidebar": [
        {
          "type": "doc",
          "id": "index",
          "label": "Overview"
        },
        {
          "type": "doc", 
          "id": "source/markdown/podman.1",
          "label": "Podman Command"
        },
        ...(tutorialItems.length > 0 ? [{
          "type": "category",
          "label": "Tutorials",
          "items": tutorialItems
        }] : []),
        {
          "type": "doc",
          "id": "kubernetes_support", 
          "label": "Kubernetes Support"
        },
        {
          "type": "doc",
          "id": "MANPAGE_SYNTAX",
          "label": "Manual Page Syntax"
        }
      ]
    };
    
    const sidebarFileName = `version-${version}-sidebars.json`;
    const sidebarFilePath = path.join(VERSIONED_SIDEBARS_DIR, sidebarFileName);
    
    // Write the sidebar JSON file
    fs.writeFileSync(sidebarFilePath, JSON.stringify(sidebarConfig, null, 2));
    console.log(`✅ Generated sidebar: ${sidebarFileName}`);
  }
  
  console.log(`✅ Generated ${versions.length} versioned sidebar files`);
}

// Validate version directory structure
function validateVersionDirectories(versions) {
  const issues = [];
  
  for (const version of versions) {
    const versionDir = path.join(VERSIONED_DOCS_DIR, `version-${version}`);
    const indexFile = path.join(versionDir, 'index.md');
    
    if (!fs.existsSync(versionDir)) {
      issues.push(`Missing directory: versioned_docs/version-${version}`);
      continue;
    }
    
    if (!fs.existsSync(indexFile)) {
      issues.push(`Missing index.md in: versioned_docs/version-${version}`);
      continue;
    }
    
    // Check if index.md has correct version in frontmatter
    try {
      const content = fs.readFileSync(indexFile, 'utf8');
      const versionMatch = content.match(/^---[\s\S]*?version:\s*v?([^\n]+)/m);
      if (!versionMatch || versionMatch[1].trim() !== version) {
        issues.push(`Version mismatch in versioned_docs/version-${version}/index.md`);
      }
    } catch (error) {
      issues.push(`Error reading versioned_docs/version-${version}/index.md: ${error.message}`);
    }
  }
  
  return issues;
}

// Fix YAML frontmatter syntax issues
async function fixYamlFrontmatter(versions) {
  for (const version of versions) {
    const versionDir = path.join(VERSIONED_DOCS_DIR, `version-${version}`);
    
    if (!fs.existsSync(versionDir)) {
      continue;
    }
    
    console.log(`🔧 Fixing YAML frontmatter in version ${version}...`);
    
    // Recursively find all markdown files
    const findMarkdownFiles = (dir) => {
      const files = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(...findMarkdownFiles(fullPath));
        } else if (entry.name.endsWith('.md') || entry.name.endsWith('.md.in')) {
          files.push(fullPath);
        }
      }
      return files;
    };
    
    const markdownFiles = findMarkdownFiles(versionDir);
    let fixedCount = 0;
    
    for (const filePath of markdownFiles) {
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        let hasChanges = false;
        
        // Fix frontmatter YAML issues
        if (content.startsWith('---')) {
          const frontmatterEnd = content.indexOf('---', 3);
          if (frontmatterEnd !== -1) {
            let frontmatter = content.substring(3, frontmatterEnd).trim();
            const originalFrontmatter = frontmatter;
            
            // Fix unquoted titles with special characters ([], (), etc.)
            frontmatter = frontmatter.replace(
              /^title:\s*(\[.*?\]\(.*?\).*?)$/gm,
              'title: "$1"'
            );
            
            // Fix unquoted strings with colons (most common YAML issue)
            frontmatter = frontmatter.replace(
              /^(\w+):\s*([^"'\n]*:[^"'\n]*)$/gm,
              '$1: "$2"'
            );
            
            // Fix unquoted strings with other special characters
            frontmatter = frontmatter.replace(
              /^(\w+):\s*([^"'\n]*[[\](){}|>*&%@!#^]+[^"'\n]*)$/gm,
              '$1: "$2"'
            );
            
            // Fix unquoted strings that start with special characters
            frontmatter = frontmatter.replace(
              /^(\w+):\s*([[\](){}|>*&%@!#^:][^"'\n]*)$/gm,
              '$1: "$2"'
            );
            
            if (frontmatter !== originalFrontmatter) {
              content = '---\n' + frontmatter + '\n---' + content.substring(frontmatterEnd + 3);
              hasChanges = true;
            }
          }
        }
        
        if (hasChanges) {
          fs.writeFileSync(filePath, content);
          fixedCount++;
          console.log(`  ✅ Fixed YAML in ${path.relative(versionDir, filePath)}`);
        }
      } catch (error) {
        console.error(`  ❌ Error fixing YAML in ${filePath}:`, error.message);
      }
    }
    
    if (fixedCount > 0) {
      console.log(`✅ Fixed YAML frontmatter in ${fixedCount} files for version ${version}`);
    } else {
      console.log(`✅ No YAML issues found in version ${version}`);
    }
  }
}

// Fix broken image links in markdown files
async function fixBrokenImageLinks(versions) {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];
  
  for (const version of versions) {
    const versionDir = path.join(VERSIONED_DOCS_DIR, `version-${version}`);
    
    if (!fs.existsSync(versionDir)) {
      continue;
    }
    
    console.log(`🔍 Checking broken image links in version ${version}...`);
    
    // Recursively find all markdown files
    const findMarkdownFiles = (dir) => {
      const files = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(...findMarkdownFiles(fullPath));
        } else if (entry.name.endsWith('.md') || entry.name.endsWith('.md.in')) {
          files.push(fullPath);
        }
      }
      return files;
    };
    
    const markdownFiles = findMarkdownFiles(versionDir);
    let fixedCount = 0;
    
    for (const filePath of markdownFiles) {
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        let hasChanges = false;
        
        // Find all image references: ![alt](path) or <img src="path">
        const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)|<img[^>]+src=["']([^"']+)["'][^>]*>/g;
        
        content = content.replace(imageRegex, (match, alt1, src1, src2) => {
          const alt = alt1 || '';
          const src = src1 || src2;
          
          // Skip external URLs (http/https)
          if (src.startsWith('http://') || src.startsWith('https://')) {
            return match;
          }
          
          // Check if it's an image file
          const hasImageExtension = imageExtensions.some(ext => 
            src.toLowerCase().includes(ext)
          );
          
          if (!hasImageExtension) {
            return match;
          }
          
          // Try to resolve the image path
          const imagePath = path.resolve(path.dirname(filePath), src);
          const staticImagePath = path.join(__dirname, '..', 'static', src);
          
          // Check if image exists in the docs directory or static directory
          if (!fs.existsSync(imagePath) && !fs.existsSync(staticImagePath)) {
            hasChanges = true;
            console.log(`🔧 Removing broken image link: ${src} in ${path.relative(VERSIONED_DOCS_DIR, filePath)}`);
            
            // Replace with text or remove entirely
            if (alt) {
              return `*[Image: ${alt}]*`;
            } else {
              return '*[Image not available]*';
            }
          }
          
          return match;
        });
        
        if (hasChanges) {
          fs.writeFileSync(filePath, content);
          fixedCount++;
        }
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
      }
    }
    
    if (fixedCount > 0) {
      console.log(`✅ Fixed broken image links in ${fixedCount} files for version ${version}`);
    }
  }
}

// Clean up route conflicts by removing README.md from version roots
async function cleanupVersionRouteConflicts(versions) {
  console.log('🧹 Cleaning up route conflicts...');
  let removedCount = 0;
  
  for (const version of versions) {
    const versionDir = path.join(VERSIONED_DOCS_DIR, `version-${version}`);
    const readmePath = path.join(versionDir, 'README.md');
    
    if (fs.existsSync(readmePath)) {
      try {
        fs.unlinkSync(readmePath);
        console.log(`  ✓ Removed README.md from version-${version} root`);
        removedCount++;
      } catch (error) {
        console.error(`  ❌ Failed to remove README.md from version-${version}:`, error.message);
      }
    }
  }
  
  if (removedCount > 0) {
    console.log(`✅ Removed ${removedCount} conflicting README.md files`);
  } else {
    console.log('✅ No conflicting README.md files found');
  }
}

// Clean up orphaned sidebar files
function cleanupOrphanedSidebars(versions) {
  if (!fs.existsSync(VERSIONED_SIDEBARS_DIR)) {
    return;
  }
  
  const sidebarFiles = fs.readdirSync(VERSIONED_SIDEBARS_DIR)
    .filter(file => file.endsWith('-sidebars.json'));
  
  const validSidebarFiles = versions.map(v => `version-${v}-sidebars.json`);
  
  for (const sidebarFile of sidebarFiles) {
    if (!validSidebarFiles.includes(sidebarFile)) {
      const filePath = path.join(VERSIONED_SIDEBARS_DIR, sidebarFile);
      fs.rmSync(filePath, { force: true });
      console.log(`🗑️  Removed orphaned sidebar: ${sidebarFile}`);
    }
  }
}

// Fix version frontmatter in index files
function fixVersionFrontmatter(versions) {
  for (const version of versions) {
    const indexFile = path.join(VERSIONED_DOCS_DIR, `version-${version}`, 'index.md');
    
    if (fs.existsSync(indexFile)) {
      try {
        let content = fs.readFileSync(indexFile, 'utf8');
        
        // Update version in frontmatter
        content = content.replace(
          /^(---[\s\S]*?)version:\s*[^\n]*/m,
          `$1version: v${version}`
        );
        
        // Update version in title
        content = content.replace(
          /^# Podman Documentation \([^)]+\)/m,
          `# Podman Documentation (v${version})`
        );
        
        // Update welcome message
        content = content.replace(
          /Welcome to the Podman documentation for version [^.]+\./m,
          `Welcome to the Podman documentation for version v${version}.`
        );
        
        fs.writeFileSync(indexFile, content);
        console.log(`✅ Fixed version frontmatter for ${version}`);
      } catch (error) {
        console.error(`❌ Error fixing version frontmatter for ${version}:`, error.message);
      }
    }
  }
}

// Create a new version from template
function createNewVersion(version) {
  const versionDir = path.join(VERSIONED_DOCS_DIR, `version-${version}`);
  
  if (fs.existsSync(versionDir)) {
    console.log(`Version ${version} already exists`);
    return false;
  }
  
  // Create directory
  fs.mkdirSync(versionDir, { recursive: true });
  
  // Create basic index.md
  const indexContent = `---
title: Podman Documentation
version: v${version}
---

# Podman Documentation (v${version})

Welcome to the Podman documentation for version v${version}.

## Getting Started

- [Installation Instructions](https://podman.io/get-started)
- [Basic Tutorial](tutorials/podman_tutorial.md)
- [Rootless Containers](tutorials/rootless_tutorial.md)

## Commands

- [podman](source/markdown/podman.1.md)
- [podman-build](source/markdown/podman-build.1.md)
- [podman-run](source/markdown/podman-run.1.md)

## Documentation Versions

For other versions, please use the version dropdown in the navigation bar.
`;

  fs.writeFileSync(path.join(versionDir, 'index.md'), indexContent);
  console.log(`✅ Created new version directory: version-${version}`);
  return true;
}

// Generate version selector JavaScript file from versions.json
function generateVersionSelectorJS(versions) {
  const versionSelectorPath = path.join(__dirname, '..', 'static', 'js', 'docs-version-selector.js');
  
  if (!fs.existsSync(versionSelectorPath)) {
    console.warn('⚠️  docs-version-selector.js not found, skipping version selector update');
    return;
  }
  
  try {
    let content = fs.readFileSync(versionSelectorPath, 'utf8');
    
    // Generate the version array from versions.json
    const versionArray = versions.map(version => 
      `      { name: '${version}', label: 'v${version}' }`
    ).join(',\n');
    
    // Replace the getAvailableVersions function
    const newFunction = `  // Get available versions - automatically generated from versions.json
  function getAvailableVersions() {
    return [
${versionArray}
    ];
  }`;
    
    // Replace the existing function using regex
    content = content.replace(
      /\/\/ Get available versions.*?\n\s*function getAvailableVersions\(\) \{[\s\S]*?\n\s*\}/,
      newFunction
    );
    
    fs.writeFileSync(versionSelectorPath, content);
    console.log(`✅ Updated version selector with ${versions.length} versions (latest: ${versions[0]})`);
  } catch (error) {
    console.error('❌ Error updating version selector:', error.message);
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  // Handle utility commands from update-versions.js functionality
  if (command === 'sync-versions') {
    console.log('🔄 Syncing versions.json with directory structure...');
    const directoryVersions = getVersionsFromDirectories();
    const currentVersions = JSON.parse(fs.readFileSync(VERSIONS_FILE, 'utf8') || '[]');
    
    if (JSON.stringify(directoryVersions) !== JSON.stringify(currentVersions)) {
      updateVersionsFile(directoryVersions);
      console.log('✅ Synced versions.json with directory structure');
    } else {
      console.log('✅ versions.json is already in sync');
    }
    
    generateVersionedSidebars(directoryVersions);
    generateVersionSelectorJS(directoryVersions);
    return;
  }
  
  if (command === 'validate') {
    console.log('🔍 Validating version structure...');
    const versions = JSON.parse(fs.readFileSync(VERSIONS_FILE, 'utf8') || '[]');
    const issues = validateVersionDirectories(versions);
    
    if (issues.length > 0) {
      console.log('❌ Found issues:');
      issues.forEach(issue => console.log(`  - ${issue}`));
      process.exit(1);
    } else {
      console.log('✅ All version directories are valid');
    }
    return;
  }
  
  if (command === 'fix-yaml') {
    console.log('🔧 Fixing YAML frontmatter...');
    const versions = JSON.parse(fs.readFileSync(VERSIONS_FILE, 'utf8') || '[]');
    await fixYamlFrontmatter(versions);
    return;
  }
  
  if (command === 'fix-images') {
    console.log('🔧 Fixing broken image links...');
    const versions = JSON.parse(fs.readFileSync(VERSIONS_FILE, 'utf8') || '[]');
    await fixBrokenImageLinks(versions);
    return;
  }
  
  if (command === 'cleanup') {
    console.log('🧹 Cleaning up route conflicts...');
    const versions = JSON.parse(fs.readFileSync(VERSIONS_FILE, 'utf8') || '[]');
    await cleanupVersionRouteConflicts(versions);
    return;
  }
  
  if (command === 'sidebars') {
    console.log('🔧 Regenerating sidebars...');
    const versions = JSON.parse(fs.readFileSync(VERSIONS_FILE, 'utf8') || '[]');
    generateVersionedSidebars(versions);
    cleanupOrphanedSidebars(versions);
    return;
  }
  
  if (command === 'update-version-selector') {
    console.log('🔧 Updating version selector...');
    const versions = JSON.parse(fs.readFileSync(VERSIONS_FILE, 'utf8') || '[]');
    generateVersionSelectorJS(versions);
    return;
  }
  
  if (command === 'fix') {
    console.log('🔧 Fixing version frontmatter...');
    const versions = JSON.parse(fs.readFileSync(VERSIONS_FILE, 'utf8') || '[]');
    fixVersionFrontmatter(versions);
    return;
  }
  
  if (command === 'add') {
    const version = args[1];
    if (!version) {
      console.error('❌ Please provide a version number: node scripts/sync-podman-docs.js add 5.6.0');
      process.exit(1);
    }
    
    // Download and add the specific version
    try {
      const versionNumber = await downloadDocsForVersion(version);
      console.log(`✅ Added version ${version} to documentation`);
      
      // Update versions.json and regenerate sidebars
      const versions = getVersionsFromDirectories();
      updateVersionsFile(versions);
      generateVersionedSidebars(versions);
      cleanupOrphanedSidebars(versions);
      generateVersionSelectorJS(versions);
      
      console.log(`✅ Added version ${versionNumber} and synced versions.json`);
    } catch (error) {
      console.error(`❌ Error adding version ${version}:`, error.message);
      process.exit(1);
    }
    return;
  }


  
  // Original sync functionality
  const specificVersion = command;
  
  // Show help if requested
  if (specificVersion === '--help' || specificVersion === '-h') {
    console.log(`
Podman Documentation Management Tool

Usage:
  npm run docs:sync                    # Download latest 5 stable releases
  npm run docs:sync-version 5.5.2     # Download specific version
  npm run docs:sync-version v5.5.2    # Download specific version (with v prefix)

Utility Commands:
  node scripts/sync-podman-docs.js sync-versions     # Sync versions.json with directories
  node scripts/sync-podman-docs.js validate          # Validate version structure
  node scripts/sync-podman-docs.js fix-yaml          # Fix YAML frontmatter issues
  node scripts/sync-podman-docs.js fix-images        # Fix broken image links
  node scripts/sync-podman-docs.js cleanup           # Clean up route conflicts
  node scripts/sync-podman-docs.js sidebars          # Regenerate all sidebars
  node scripts/sync-podman-docs.js fix               # Fix version frontmatter in index files
  node scripts/sync-podman-docs.js add <version>     # Download and add a specific version
  node scripts/sync-podman-docs.js update-version-selector # Update version selector JS from versions.json

Examples:
  npm run docs:sync-version 5.6.0     # Downloads Podman v5.6.0 docs
  npm run docs:sync                    # Downloads latest releases
  node scripts/sync-podman-docs.js validate  # Validates all versions

The script will:
- Download documentation from GitHub
- Create versioned_docs/version-X.X.X/ directory
- Update versions.json file
- Process markdown for Docusaurus compatibility
- Run various fix scripts automatically
- Generate versioned sidebars
- Update version selector in static/js/docs-version-selector.js
`);
    return;
  }
  
  console.log('🚀 Starting Podman documentation sync...');
  
  try {
    let versions = [];
    
    if (specificVersion) {
      // Download specific version
      console.log(`Downloading specific version: ${specificVersion}`);
      
      // Ensure version has 'v' prefix for GitHub API
      const versionWithPrefix = specificVersion.startsWith('v') ? specificVersion : `v${specificVersion}`;
      versions = [versionWithPrefix];
      
    } else {
      // Get latest releases and tags
      const releases = await getLatestReleases();
      const tags = await getLatestTags();
      
      // Use releases if available, otherwise use tags
      versions = releases.length > 0 ? releases.map(r => r.tag_name) : tags.map(t => t.name);
      
      if (versions.length === 0) {
        console.error('No versions found!');
        process.exit(1);
      }
      
      console.log(`Processing ${versions.length} latest versions:`, versions);
    }
    
    // Create versioned_docs directory if it doesn't exist
    if (!fs.existsSync(VERSIONED_DOCS_DIR)) {
      fs.mkdirSync(VERSIONED_DOCS_DIR, { recursive: true });
    }
    
    // Download documentation for each version
    const processedVersions = [];
    for (const version of versions) {
      const versionNumber = await downloadDocsForVersion(version);
      if (versionNumber) {
        // Create index file
        const outputPath = path.join(VERSIONED_DOCS_DIR, `version-${versionNumber}`);
        createIndexFile(outputPath, version);
        processedVersions.push(versionNumber);
      }
    }
    
    // Update versions.json (only if downloading latest versions, not specific ones)
    if (processedVersions.length > 0) {
      if (specificVersion) {
        // For specific versions, sync with existing directory structure
        const existingVersions = getVersionsFromDirectories();
        updateVersionsFile(existingVersions);
        console.log(`✅ Added version ${specificVersion} and synced versions.json`);
        
        // Generate sidebar for the new version
        generateVersionedSidebars(existingVersions);
        generateVersionSelectorJS(existingVersions);
      } else {
        // For latest versions, replace versions.json
        updateVersionsFile(processedVersions);
        
        // Generate sidebars for all versions
        generateVersionedSidebars(processedVersions);
        generateVersionSelectorJS(processedVersions);
      }
    }
    
    // Fix YAML frontmatter syntax issues automatically
    console.log('🔧 Fixing YAML frontmatter syntax...');
    try {
      const versions = processedVersions.length > 0 ? processedVersions : getVersionsFromDirectories();
      await fixYamlFrontmatter(versions);
      console.log('✅ YAML frontmatter fixed successfully!');
    } catch (error) {
      console.warn('⚠️  Warning: Failed to fix YAML frontmatter:', error.message);
    }
    
    // Fix markdown directive issues automatically
    console.log('🔧 Fixing markdown directive syntax...');
    try {
      execSync('npm run docs:fix-directives', { 
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      });
      console.log('✅ Markdown directives fixed successfully!');
    } catch (error) {
      console.warn('⚠️  Warning: Failed to fix markdown directives:', error.message);
      console.warn('   You can run "npm run docs:fix-directives" manually later');
    }
    
    // Fix broken image links automatically
    console.log('🔧 Fixing broken image links...');
    try {
      const versions = processedVersions.length > 0 ? processedVersions : getVersionsFromDirectories();
      await fixBrokenImageLinks(versions);
      console.log('✅ Image links fixed successfully!');
    } catch (error) {
      console.warn('⚠️  Warning: Failed to fix image links:', error.message);
    }
    
    console.log('✅ Podman documentation sync completed successfully!');
    
    // Clean up temp directory
    if (fs.existsSync(TEMP_DIR)) {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }
    
  } catch (error) {
    console.error('❌ Error syncing documentation:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  main,
  getLatestReleases,
  getLatestTags,
  downloadDocsForVersion,
  updateVersionsFile,
  getVersionsFromDirectories,
  generateVersionedSidebars,
  validateVersionDirectories,
  fixYamlFrontmatter,
  fixBrokenImageLinks,
  cleanupVersionRouteConflicts,
  createNewVersion,
  fixVersionFrontmatter,
  cleanupOrphanedSidebars,
  generateVersionSelectorJS
}; 