import React from 'react';
import Layout from '@theme/Layout';
import PageHeader from '@site/src/components/layout/PageHeader';

export default function Community() {
  const headerInfo = {
    title: 'Get Started',
  };

  return (
    <Layout>
      <PageHeader title={headerInfo.title} />
    </Layout>
  );
}
