import React from 'react';
import Head from '@docusaurus/Head';

// This serves as a simple redirect for the installation page
const GettingStarted = () => (
  <Head>
    <meta charSet="utf-8" />
    <meta http-equiv="refresh" content="0 url=/docs/installation" />
    <title>Redirect to Podman Docs</title>
  </Head>
);

export default GettingStarted;
