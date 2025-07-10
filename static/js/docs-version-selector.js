/**
 * Docs Version Selector Injection Script
 * Moves the version selector from navbar into the docs content area
 */



(function() {
  'use strict';

  // Wait for DOM to be ready
  function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
      callback(element);
    } else {
      setTimeout(() => waitForElement(selector, callback), 100);
    }
  }

  // Check if we're on a docs page
  function isDocsPage() {
    return document.body.hasAttribute('data-current-docs-plugin-id') || 
           window.location.pathname.startsWith('/docs');
  }

  // Extract version information from URL and page
  function getVersionInfo() {
    const path = window.location.pathname;
    const versionMatch = path.match(/\/docs\/([^\/]+)/);
    
    if (versionMatch) {
      return {
        current: versionMatch[1],
        isVersioned: true
      };
    }
    
    return {
      current: 'latest',
      isVersioned: false
    };
  }

  // Get available versions - automatically generated from versions.json
  function getAvailableVersions() {
    return [
      { name: '5.5.2', label: 'v5.5.2' },
      { name: '5.5.1', label: 'v5.5.1' },
      { name: '5.5.0', label: 'v5.5.0' },
      { name: '5.4.2', label: 'v5.4.2' },
      { name: '5.4.1', label: 'v5.4.1' }
    ];
  }

  // Create the version selector HTML
  function createVersionSelector(currentVersion, versions) {
    const container = document.createElement('div');
    container.className = 'docs-version-selector-injected';
    container.style.cssText = `
      background: #f0f0f0;
      border: 2px solid #007acc;
      border-radius: 8px;
      padding: 16px;
      margin: 16px 0;
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 14px;
      color: #333;
      z-index: 9999;
    `;
    
    container.innerHTML = `
      <span style="font-size: 18px;">📚</span>
      <span style="font-weight: 600;">Documentation Version:</span>
      <select id="docs-version-select" style="
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 6px 12px;
        background: white;
        font-size: 14px;
        cursor: pointer;
      ">
        ${versions.map(version => `
          <option value="${version.name}" ${version.name === currentVersion ? 'selected' : ''}>
            ${version.label}
          </option>
        `).join('')}
      </select>
      <span style="color: #666; font-size: 12px;">(Test Version)</span>
    `;
    
    return container;
  }

  // Handle version change
  function handleVersionChange(event) {
    const selectedVersion = event.target.value;
    const currentPath = window.location.pathname;
    
    // Extract the current doc path (everything after /docs/version/)
    const pathMatch = currentPath.match(/\/docs\/[^\/]+(\/.*)?$/);
    const docPath = pathMatch && pathMatch[1] ? pathMatch[1] : '/';
    
    // Construct new URL
    const newPath = `/docs/${selectedVersion}${docPath}`;
    
    // Navigate to new version
    window.location.href = newPath;
  }

  // Inject the version selector into the docs content
  function injectVersionSelector() {
    console.log('injectVersionSelector called');
    console.log('Current URL:', window.location.pathname);
    console.log('Is docs page?', isDocsPage());
    
    if (!isDocsPage()) {
      console.log('Not a docs page, skipping injection');
      return;
    }
    
    // Remove any existing injected selector
    const existing = document.querySelector('.docs-version-selector-injected');
    if (existing) {
      console.log('Removing existing version selector');
      existing.remove();
    }
    
    const versionInfo = getVersionInfo();
    const versions = getAvailableVersions();
    
    console.log('Version info:', versionInfo);
    console.log('Available versions:', versions);
    
    if (versions.length <= 1) {
      console.log('Only one version available, not showing selector');
      return; // Don't show if only one version
    }
    
    // Try multiple possible insertion points
    const possibleSelectors = [
      '.main-wrapper .container .row',
      '.main-wrapper .container',
      '.main-wrapper',
      'main .container',
      'main',
      '.docusaurus-wrapper main'
    ];
    
         let injected = false;
     
     for (const selector of possibleSelectors) {
       const targetElement = document.querySelector(selector);
       if (targetElement) {
         console.log('Injecting version selector into:', selector);
         
         const versionSelector = createVersionSelector(versionInfo.current, versions);
         
         // Insert at the beginning of the target element
         targetElement.insertBefore(versionSelector, targetElement.firstChild);
         
         // Add event listener for version changes
         const selectElement = versionSelector.querySelector('#docs-version-select');
         if (selectElement) {
           selectElement.addEventListener('change', handleVersionChange);
         }
         
         injected = true;
         break; // Stop after successful injection
       }
     }
     
     // Fallback: inject into body if no suitable container found
     if (!injected) {
       console.log('No suitable container found, injecting into body as fallback');
       const versionSelector = createVersionSelector(versionInfo.current, versions);
       versionSelector.style.position = 'fixed';
       versionSelector.style.top = '80px';
       versionSelector.style.right = '20px';
       versionSelector.style.zIndex = '10000';
       
       document.body.appendChild(versionSelector);
       
       // Add event listener for version changes
       const selectElement = versionSelector.querySelector('#docs-version-select');
       if (selectElement) {
         selectElement.addEventListener('change', handleVersionChange);
       }
     }
  }

  // Debug logging
  console.log('Docs version selector script loaded');
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    console.log('DOM still loading, waiting for DOMContentLoaded');
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOMContentLoaded fired, injecting version selector');
      injectVersionSelector();
    });
  } else {
    console.log('DOM already ready, injecting version selector immediately');
    injectVersionSelector();
  }

  // Re-inject on navigation (for SPA routing)
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    setTimeout(injectVersionSelector, 100);
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    setTimeout(injectVersionSelector, 100);
  };
  
  window.addEventListener('popstate', () => {
    setTimeout(injectVersionSelector, 100);
  });

})(); 