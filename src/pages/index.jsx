import React from 'react';
import Layout from '@theme/Layout';
import HeroHeader from '../components/HeroHeader';

/* PAGE DATA */
const header = {
  title: 'The best free & open source container tools',
  subtitle:
    'Manage containers, pods, and images with Podman. Seamlessly work with containers and Kubernetes from your local environment.',
};
const featureList = [
  {
    title: 'Fast and light.',
    description:
      "Daemonless, using the fastest technologists for a snappy experience. Our UI is reactive and light on resource usage and won't drag you down.",
  },
  {
    title: 'Secure.',
    description:
      'Rootless containers allow you to contain privileges without compromising functionality. Trusted by US government agencies for secure HPC at scale (case study.) ',
  },
  {
    title: 'Open.',
    description:
      "Podman is open source first and won't lock you in. Podman Desktop can be used as one tool to manage all your containers, regardless of container engine - even if you don't use Podman as your container engine.",
  },
  {
    title: 'Compatible.',
    description:
      'Compatible with other OCI compliant container formats including Docker. Run your legacy Docker containers (including docker-compose files) on Podman. (Learn more)',
  },
];

/* PAGE COMPONENTS */
const FeatureItem = ({ title = 'Placeholder Title', description = 'This is a bit of placeholder text' }) => {
  return (
    <li className="m-6  w-1/3 rounded-md bg-gray-50 p-12 text-center dark:bg-gray-900">
      <h3 className="mx-auto mb-4 text-3xl font-bold text-purple-700 dark:text-purple-500">{title}</h3>
      <p className="mx-auto max-w-md leading-relaxed text-gray-700">{description}</p>
    </li>
  );
};

/* PAGE CONTENT */
export default function IndexPage() {
  return (
    <Layout>
      <HeroHeader title={header.title} subtitle={header.subtitle} />
      <section className="mb-12">
        <ul className="flex flex-wrap justify-center gap-4">
          {featureList.map(feature => {
            return <FeatureItem title={feature.title} description={feature.description} />;
          })}
        </ul>
      </section>
    </Layout>
  );
}
