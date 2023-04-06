import React from 'react';
import Layout from '@theme/Layout';
import PageHeader from '@site/src/components/layout/PageHeader';
import { header } from '@site/static/data/get-started';
export default function Community() {
  return (
    <Layout>
      {/* TODO: Add List to the header using ListItem Component */}
      <PageHeader title={header.title} description={header.subtitle} />
      {/* Getting Help */}
      {/* TODO: Check if code block + copy already built into docusaurus' components */}
      {/* Searching, Pulling, and listing images */}
      {/* TODO: Add content to data file */}
      {/* TODO: Animate slide in text boxes on side, use shadowing */}
      {/* TODO: See about using the infobox component for this and ones in following section */}
      {/* TODO: also follow up with terminal component */}
      {/* Running a container and listing running containers */}
      {/* TODO: Add content to data file */}
      {/* TODO: See if they want the Want to learn more section on this page too  */}
    </Layout>
  );
}
