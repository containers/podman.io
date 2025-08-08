#!/usr/bin/env node

/**
 * Fix Markdown Directive Issues
 * 
 * This script finds and fixes problematic colon patterns in markdown files
 * that could be misinterpreted as MyST directives by Docusaurus
 */

const fs = require('fs');
const path = require('path');

const VERSIONED_DOCS_DIR = path.join(__dirname, '..', 'versioned_docs');

// Patterns that need to be escaped to prevent directive interpretation
const PROBLEMATIC_PATTERNS = [
  // Fix :target directive warnings using HTML entities (clean approach)
  {
    pattern: /(\*[^*]*):target(\[?[^*]*\*)/g,
    replacement: '$1&#58;target$2',
    description: 'Prevent :target directive by using HTML entity for colon'
  },
  // Specific fix for podman-machine-init volume header
  {
    pattern: /(\*\*--volume\*\*, \*\*-v\*\*=)\*source:target\[:options\]\*/g,
    replacement: '$1*source&#58;target[&#58;options]*',
    description: 'Fix podman-machine-init volume header using HTML entities'
  },
  // Specific fix for inline source:target reference
  {
    pattern: /(If \/host-dir:\/machine-dir is specified as the `)\*source:target(\*`,)/g,
    replacement: '$1*source&#58;target$2',
    description: 'Fix inline source:target reference using HTML entity'
  },
  // Cleanup any remaining double-escaped options
  {
    pattern: /\[\\:options\]/g,
    replacement: '[&#58;options]',
    description: 'Clean up double-escaped options using HTML entity'
  },
  // Uppercase parameter names in command syntax (like :CONTAINER-DIR, :OPTIONS)
  {
    pattern: /([:\[,\s\-]):([A-Z][A-Z0-9_-]*[A-Z0-9])/g,
    replacement: '$1\\:$2',
    description: 'Uppercase parameter names with colons'
  },
  // Parameter names after other parameters (like HOST-DIR:CONTAINER-DIR)
  {
    pattern: /([A-Z0-9_-]+):([A-Z][A-Z0-9_-]*[A-Z0-9])/g,
    replacement: '$1\\:$2',
    description: 'Parameter names after other parameters'
  },
  // Command syntax patterns in headers/options
  {
    pattern: /(\*\*--[a-zA-Z-]+\*\*=\*[^*]*container_uid):from_uid([^*]*\*)/g,
    replacement: '$1\\:from_uid$2',
    description: 'container_uid:from_uid in command syntax'
  },
  {
    pattern: /(\*\*--[a-zA-Z-]+\*\*=\*[^*]*):([a-zA-Z_]+[^*]*\*)/g,
    replacement: '$1\\:$2',
    description: 'Generic command syntax with colons'
  },
  // Specific pattern for source:target in volume commands
  {
    pattern: /(\*[^*]*\w):([a-zA-Z][a-zA-Z0-9_]*(?:\[[^\]]*\])?[^*]*\*)/g,
    replacement: '$1\\:$2',
    description: 'Source:target patterns in volume commands'
  },
  {
    pattern: /(\*[^*]*):([a-zA-Z_][a-zA-Z0-9_]*[^*]*\*)/g,
    replacement: '$1\\:$2',
    description: 'Italicized text with colons'
  },
  // Security label patterns
  {
    pattern: /(\s)label:([a-zA-Z_]+)/g,
    replacement: '$1label\\:$2',
    description: 'SELinux label patterns'
  },
  // Compression format patterns
  {
    pattern: /zstd:chunked/g,
    replacement: 'zstd\\:chunked',
    description: 'Compression format with colon'
  },
  // Network/port patterns that could be problematic
  {
    pattern: /(\s)([a-zA-Z]+):([0-9]+)/g,
    replacement: '$1$2\\:$3',
    description: 'Host:port patterns'
  },
  // Fix broken relative links to root-level files with GitHub URLs
  {
    pattern: /\]\(\.\.\/\.\.\/README\.md(#[^)]*)?/g,
    replacement: '](https://github.com/containers/podman/blob/main/README.md$1',
    description: 'Replace broken relative links to README.md with GitHub URL'
  },
  {
    pattern: /\]\(\.\.\/\.\.\/troubleshooting\.md(#[^)]*)?/g,
    replacement: '](https://github.com/containers/podman/blob/main/troubleshooting.md$1',
    description: 'Replace broken relative links to troubleshooting.md with GitHub URL'
  },
  {
    pattern: /\]\(\.\.\/\.\.\/test\/README\.md(#[^)]*)?/g,
    replacement: '](https://github.com/containers/podman/blob/main/test/README.md$1',
    description: 'Replace broken relative links to test/README.md with GitHub URL'
  }
];

// Patterns that are likely safe and shouldn't be escaped
const SAFE_PATTERNS = [
  /https?:\/\//,           // URLs
  /fd[0-9a-f]*::[0-9a-f]/,  // IPv6 addresses
  /inet6?\s+[^:]+::/,       // IPv6 in network output
  /\d+:\d+/,               // Time or ratio patterns
  /[A-Z]+::/               // Image registry patterns like RHEL::
];

function isSafePattern(text) {
  return SAFE_PATTERNS.some(pattern => pattern.test(text));
}

function fixMarkdownDirectives(content, filePath) {
  let modifiedContent = content;
  const changes = [];

  for (const { pattern, replacement, description } of PROBLEMATIC_PATTERNS) {
    const matches = [...content.matchAll(pattern)];
    
    for (const match of matches) {
      // Check if this match should be skipped (safe pattern)
      if (isSafePattern(match[0])) {
        continue;
      }
      
      const before = modifiedContent;
      modifiedContent = modifiedContent.replace(pattern, replacement);
      
      if (before !== modifiedContent) {
        changes.push({
          description,
          match: match[0],
          file: path.relative(VERSIONED_DOCS_DIR, filePath)
        });
      }
    }
  }

  return { content: modifiedContent, changes };
}

function processMarkdownFiles(directory) {
  const allChanges = [];
  let filesProcessed = 0;
  let filesModified = 0;

  function processDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        processDirectory(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.md.in'))) {
        filesProcessed++;
        
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const { content: fixedContent, changes } = fixMarkdownDirectives(content, fullPath);

          if (changes.length > 0) {
            fs.writeFileSync(fullPath, fixedContent);
            filesModified++;
            allChanges.push(...changes);
            
            console.log(`✅ Fixed ${changes.length} issues in ${path.relative(VERSIONED_DOCS_DIR, fullPath)}`);
            changes.forEach(change => {
              console.log(`   - ${change.description}: ${change.match}`);
            });
          }
        } catch (error) {
          console.error(`❌ Error processing ${fullPath}:`, error.message);
        }
      }
    }
  }

  console.log('🔧 Fixing markdown directive issues...\n');
  processDirectory(directory);

  console.log('\n📊 Summary:');
  console.log(`   Files processed: ${filesProcessed}`);
  console.log(`   Files modified: ${filesModified}`);
  console.log(`   Total fixes applied: ${allChanges.length}`);

  if (allChanges.length > 0) {
    console.log('\n🔍 Changes by type:');
    const changesByType = {};
    allChanges.forEach(change => {
      changesByType[change.description] = (changesByType[change.description] || 0) + 1;
    });
    
    Object.entries(changesByType).forEach(([type, count]) => {
      console.log(`   - ${type}: ${count} fixes`);
    });
  }

  return allChanges.length;
}

// Clean up over-escaped content
function cleanupOverEscapedContent(baseDir) {
  let filesFixed = 0;
  
  // Patterns where colons should NOT be escaped and need to be fixed
  const OVER_ESCAPED_PATTERNS = [
    // Documentation/man page references
    {
      pattern: /man\\+:([a-zA-Z0-9-_.()]+)/g,
      replacement: 'man:$1',
      description: 'Man page references'
    },
    // Emphasis text with colons (like **_NOTE\:_**)
    {
      pattern: /(\*\*_[A-Z]+)\\+:(_\*\*)/g,
      replacement: '$1:$2',
      description: 'Emphasized text with colons'
    },
    // Host:port patterns (localhost\:5000, hostname\:port)
    {
      pattern: /([a-zA-Z0-9.-]+)\\+:([0-9]+)/g,
      replacement: '$1:$2',
      description: 'Host:port patterns'
    },
    // Image registry patterns (registry.io\:5000/image)
    {
      pattern: /([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\\+:([0-9]+\/[a-zA-Z0-9/_-]+)/g,
      replacement: '$1:$2',
      description: 'Registry:port/image patterns'
    },
    // Docker registry URLs with image versions (docker://registry/repo/image\:version)
    {
      pattern: /(docker:\/\/[a-zA-Z0-9.-\/]+)\\+:([a-zA-Z0-9._-]+)/g,
      replacement: '$1:$2',
      description: 'Docker registry image versions'
    },
    // Italicized source:target patterns (*source\:target*)
    {
      pattern: /(\*[a-zA-Z0-9/_${}.-]+)\\+:([a-zA-Z0-9/_${}.-]+\*)/g,
      replacement: '$1:$2',
      description: 'Italicized source:target patterns'
    },
    // Italicized source:target with options (*source\:target[\:options]*)
    {
      pattern: /(\*[a-zA-Z0-9/_${}.-]+)\\+:([a-zA-Z0-9/_${}.-]+\[)\\+:([a-zA-Z0-9/_${}.-]+\]\*)/g,
      replacement: '$1:$2:$3',
      description: 'Italicized source:target with options'
    },
    // Mount options in examples ($HOME/git\:ro)
    {
      pattern: /(\$[A-Z]+\/[a-zA-Z0-9/_.-]+)\\+:([a-zA-Z0-9_,=]+)/g,
      replacement: '$1:$2',
      description: 'Mount options in command examples'
    },
    // File paths with options in backticks (`path\:options`)
    {
      pattern: /(`[^`]+)\\+:([^`]+`)/g,
      replacement: '$1:$2',
      description: 'File paths with options in code blocks'
    },
    // Compression format patterns (zstd\:chunked)
    {
      pattern: /(zstd|gzip|lz4)\\+:(chunked|fast|best)/g,
      replacement: '$1:$2',
      description: 'Compression format patterns'
    },
    // SHA256 hash patterns
    {
      pattern: /(SHA256)\\+:([A-Za-z0-9+/=]+)/g,
      replacement: '$1:$2',
      description: 'SHA256 hash patterns'
    },
    // IPv6 address patterns (protect against over-escaping)
    {
      pattern: /([0-9a-fA-F]+)\\+::([0-9a-fA-F:]+)/g,
      replacement: '$1::$2',
      description: 'IPv6 address patterns'
    },
    // File path patterns in systemd unit examples
    {
      pattern: /(Documentation=man)\\+:([a-zA-Z0-9-_.()]+)/g,
      replacement: '$1:$2',
      description: 'Systemd documentation references'
    },
    // Time patterns (HH\:MM\:SS)
    {
      pattern: /([0-9]{1,2})\\+:([0-9]{2})\\+:([0-9]{2})/g,
      replacement: '$1:$2:$3',
      description: 'Time patterns'
    },
    // URLs (http:, https:, ftp:, etc.) - should never be escaped
    {
      pattern: /(https?|ftp|ssh|sftp|file)\\+:/g,
      replacement: '$1:',
      description: 'URL protocols'
    },
    // Docker/container registry patterns
    {
      pattern: /(docker|podman|registry)\\+:\/\//g,
      replacement: '$1://',
      description: 'Container registry URLs'
    }
  ];
  
  function processDirectoryForCleanup(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        processDirectoryForCleanup(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.md.in'))) {
        try {
          let content = fs.readFileSync(fullPath, 'utf8');
          const originalContent = content;
          let changesApplied = 0;
          
          // Apply specific over-escaped pattern fixes
          for (const { pattern, replacement, description } of OVER_ESCAPED_PATTERNS) {
            const before = content;
            content = content.replace(pattern, replacement);
            if (before !== content) {
              changesApplied++;
              console.log(`   🔧 Fixed ${description} in ${path.relative(baseDir, fullPath)}`);
            }
          }
          
          // Fix over-escaped colons (reduce excessive backslashes)
          // Match 4 or more backslashes before a colon and reduce to single escape
          const beforeMultiple = content;
          content = content.replace(/\\{4,}:/g, '\\:');
          if (beforeMultiple !== content) {
            changesApplied++;
            console.log(`   🔧 Fixed multiple backslashes before colons in ${path.relative(baseDir, fullPath)}`);
          }
          
          // Fix over-escaped content in code/command examples that got too many backslashes
          const beforeTriple = content;
          content = content.replace(/(\w)\\{3,}:(\w)/g, '$1\\:$2');
          if (beforeTriple !== content) {
            changesApplied++;
            console.log(`   🔧 Fixed triple+ backslashes in ${path.relative(baseDir, fullPath)}`);
          }
          
          if (content !== originalContent) {
            fs.writeFileSync(fullPath, content);
            filesFixed++;
            console.log(`✅ Cleaned over-escaped content in ${path.relative(baseDir, fullPath)} (${changesApplied} fixes)`);
          }
        } catch (error) {
          console.error(`❌ Error processing ${fullPath}:`, error.message);
        }
      }
    }
  }
  
  processDirectoryForCleanup(baseDir);
  return filesFixed;
}

// Main execution
if (require.main === module) {
  if (!fs.existsSync(VERSIONED_DOCS_DIR)) {
    console.error('❌ Versioned docs directory not found:', VERSIONED_DOCS_DIR);
    process.exit(1);
  }

  const totalFixes = processMarkdownFiles(VERSIONED_DOCS_DIR);
  
  if (totalFixes > 0) {
    console.log(`\n✅ Successfully fixed ${totalFixes} markdown directive issues!`);
  } else {
    console.log('\n✅ No markdown directive issues found.');
  }
  
  // Clean up any over-escaped content as the final step
  console.log('\n🔧 Cleaning up over-escaped content...');
  const cleanupFixes = cleanupOverEscapedContent(VERSIONED_DOCS_DIR);
  
  if (cleanupFixes > 0) {
    console.log(`✅ Cleaned up over-escaped content in ${cleanupFixes} files!`);
  } else {
    console.log('✅ No over-escaped content found.');
  }
}

module.exports = { fixMarkdownDirectives, processMarkdownFiles, cleanupOverEscapedContent }; 