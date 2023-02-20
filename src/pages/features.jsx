import React from 'react';
import Layout from '@theme/Layout';
import PageHeader from '@site/src/components/PageHeader';
export default function Community() {
  const headerInfo = {
    title: 'Features',
  };

  return (
    <Layout>
      <PageHeader title={headerInfo.title} />
    </Layout>
  );
}
