import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Main from '@site/src/components/layout/Main';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // map Main to the Main component
  Main: Main,
};
