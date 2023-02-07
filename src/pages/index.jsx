import React from 'react';
import Layout from '@theme/Layout';
import HeroHeader from '../components/HeroHeader';

const header = {
  title: 'The best free & open source container tools',
  subtitle:
    'Manage containers, pods, and images with Podman. Seamlessly work with containers and Kubernetes from your local environment.',
};

export default function IndexPage() {
  return (
    <Layout>
      <HeroHeader title={header.title} subtitle={header.subtitle} />
    </Layout>
  );
}
