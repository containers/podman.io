import React from 'react';
import Layout from '@theme/Layout';
import PageHeader from '@site/src/components/PageHeader';
import { header } from '@site/static/data/features';
export default function Community() {
  return (
    <Layout>
      <PageHeader title={header.title} description={header.subtitle} />
    </Layout>
  );
}
