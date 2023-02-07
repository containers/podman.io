import React from 'react';
import Layout from '@theme/Layout';
import PageHeader from '@site/src/components/PageHeader';
export default function Community() {
  const headerInfo = {
    title: 'Community',
    description:
      'We want your feedback, issues, patches, and involvement in the development of Podman. Chat with us on Slack, IRC, or on our mailing list. Submit issues & pull requests (see our CONTRIBUTING guide on how.) Participate in one of our twice-monthly community meetings. You are welcome in our community!',
  };
  return (
    <Layout>
      <PageHeader title={headerInfo.title} description={headerInfo.description} />
    </Layout>
  );
}
