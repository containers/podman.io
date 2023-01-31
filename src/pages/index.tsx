import React from 'react';
import Layout from '@theme/Layout';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';

const headerInfo = {
  title: 'The daemonless container manager',
  description:
    'Manage containers, pods, and images with Podman. Podman provides a simple command line interface as well as a socket activated API which is mostly backwards compatible with Docker. ',
};

export default function Home(): JSX.Element {
  return (
    <Layout>
      <main>
        <PageHeader title={headerInfo.title} description={headerInfo.description} />
        <div className="my-12 flex justify-center">
          <Card />
          <Card />
        </div>
      </main>
    </Layout>
  );
}
