import React from 'react';
import Layout from '@theme/Layout';
import HeroHeader from '@site/src/components/HeroHeader';
import InfoBanner from '@site/src/components/InfoBanner';
import kubernetesLogo from '@site/static/logos/optimized/kubernetes-logo-147w-143h.webp';
import vscodeLogo from '@site/static/logos/optimized/vscode-logo-75w-75h.webp';
import cirrusLogo from '@site/static/logos/optimized/cirrus-logo-75w-75h.webp';
import githubLogo from '@site/static/logos/optimized/github-logo-115w-115h.webp';
import kindLogo from '@site/static/logos/optimized/kind-logo-165w-95h.webp';

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
const kubernetesBanner = {
  title: 'Kubernetes Ready',
  description:
    'Create, start, inspect, and manage pods. Play Kubernetes YAML directly with Podman, generate Kubernetes YAML from pods, and deploy to existing Kubernetes environments.',
  image: {
    src: kubernetesLogo,
    alt: 'Kubernetes Logo',
  },
};
const compatibleTools = [
  {
    title: 'VS Code',
    description: 'Visual Studio code includes Podman support',
    image: { src: vscodeLogo, alt: 'VS Code Logo' },
  },
  {
    title: 'Cirrus',
    description: 'Cirrus CLI allows you to reproducibly run containerized tasks with Podman',
    image: { src: cirrusLogo, alt: 'Cirrus Logo' },
  },
  {
    title: 'Github Actions',
    description: 'GitHub Actions include support for Podman, as well as friends buildah and skopeo',
    image: { src: githubLogo, alt: 'Github Logo' },
  },
  {
    title: 'Kind',
    description: "Kind's ability to run local Kubernetes clusters via container nodes includes support for Podman.",
    image: { src: kindLogo, alt: 'Kind Logo' },
  },
];
/* PAGE COMPONENTS */
const FeatureItem = ({ title = 'Placeholder Title', description = 'This is a bit of placeholder text' }) => {
  return (
    <li className="m-6 rounded-md bg-gray-50 p-12 text-center dark:bg-gray-900 lg:w-1/3">
      <h3 className="mx-auto mb-4 text-3xl font-bold text-purple-700 dark:text-purple-500">{title}</h3>
      <p className="mx-auto max-w-md leading-relaxed text-gray-700">{description}</p>
    </li>
  );
};

const CompatibleTool = ({ title, description, image }) => {
  return (
    <article className="flex max-w-xs flex-col items-center justify-center rounded-md p-6 shadow-md lg:m-4">
      <h3 className="hidden">{title}</h3>
      <p className="w-48 text-center">{description}</p>
      <img src={image.src} alt={image.alt} className="order-first my-8 h-20" />
    </article>
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
            return <FeatureItem key={feature.title} title={feature.title} description={feature.description} />;
          })}
        </ul>
      </section>
      <InfoBanner
        title={kubernetesBanner.title}
        description={kubernetesBanner.description}
        image={kubernetesBanner.image}
        bgColor="bg-gradient-radial from-blue-100 to-blue-500"
      />
      <section>
        <header className="my-4">
          <h2 className="text-center text-2xl font-medium">A growing set of Podman-compatible tools</h2>
        </header>
        <div className="mx-auto flex flex-wrap justify-center gap-4">
          {compatibleTools.map(tool => {
            return <CompatibleTool key={tool.title} description={tool.description} image={tool.image} />;
          })}
        </div>
      </section>
    </Layout>
  );
}
