import React from 'react';
import Layout from '@theme/Layout';
import PageHeader from '@site/src/components/layout/PageHeader';
import DownloadsGrid from '@site/src/components/content/DownloadsGrid';

function Downloads() {
  return (
    <Layout title="Downloads" description="Download Podman CLI and Podman Desktop for Windows, macOS, and Linux.">
      <PageHeader
        title="Downloads"
        description="Get **Podman CLI** and **Podman Desktop** for Windows, macOS, and Linux. We automatically detect your operating system and highlight the best option for you below."
      />
      <DownloadsGrid />
    </Layout>
  );
}

export default Downloads;
