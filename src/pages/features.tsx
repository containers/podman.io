import React from 'react';
import Layout from '@theme/Layout';
import { Icon } from '@iconify/react';
/* COMPONENTS */
import Markdown from '@site/src/components/utilities/Markdown';
import PageHeader from '@site/src/components/layout/PageHeader';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import ColoringBookSection from '@site/src/components/content/ColoringBookSection';
import FeaturesCarousel from '@site/src/components/content/FeaturesCarousel';
/* PAGE DATA */
import { header, knowPodman, learnMore } from '@site/static/data/features';
import PlayOnScroll from '@site/src/components/utilities/PlayOnScroll';

/* PAGE COMPONENTS */
const knowPodmanMeta = [
  { icon: 'mdi:book-open-page-variant', cta: { text: 'Docs', path: '/docs' } },
  { icon: 'mdi:account-group', cta: { text: 'Join Us', path: '/community' } },
  {
    icon: 'mdi:help-circle',
    cta: {
      text: 'Troubleshooting',
      path: 'https://github.com/containers/podman/blob/main/troubleshooting.md',
    },
  },
];

function GetToKnowPodmanSection() {
  return (
    <section className="mb-8 mt-4 lg:mt-8 xl:mb-12">
      <SectionHeader title={knowPodman.title} textColor="text-blue-700 dark:text-blue-500" />
      <div className="container grid grid-cols-1 gap-12 sm:grid-cols-3 lg:gap-16">
        {knowPodman.cards.map((card, index) => {
          const meta = knowPodmanMeta[index];
          return (
            <article key={index} className="flex h-full flex-col items-center rounded-md p-4 text-center">
              <div className="flex h-48 w-48 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-500/10">
                <img src={card.image.path} alt={card.image.alt} className="h-36 w-auto object-contain" />
              </div>
              {meta?.icon && (
                <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-2xl text-purple-700 dark:bg-purple-500/10 dark:text-purple-300">
                  <Icon icon={meta.icon} />
                </span>
              )}
              <h3 className="mt-4 font-medium dark:text-blue-500">{card.title}</h3>
              <span className="mt-2 h-0.5 w-8 rounded-full bg-purple-500" />
              <Markdown text={card.description} styles="mt-4 max-w-xs text-sm" />
              {meta?.cta && (
                <a
                  href={meta.cta.path}
                  className="mt-auto inline-flex items-center gap-1.5 pt-4 font-semibold text-purple-700 no-underline hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100">
                  {meta.cta.text}
                  <Icon icon="mdi:arrow-right" />
                </a>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

const PodmanDesktopSection = () => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 p-8 text-center shadow-sm dark:border-white/10 dark:bg-gray-900 sm:flex-row sm:p-12 sm:text-left">
          <div className="pointer-events-none absolute -left-10 -top-16 h-56 w-56 rounded-full bg-blue-300/50 blur-3xl dark:bg-blue-700/20" />
          <div className="pointer-events-none absolute -bottom-20 right-10 h-64 w-64 rounded-full bg-purple-300/50 blur-3xl dark:bg-purple-700/20" />
          <img
            className="relative h-28 w-28 shrink-0 sm:h-32 sm:w-32"
            src="/logos/optimized/podman-desktop-logo-200w-198h.webp"
            alt="Podman Desktop logo"
          />
          <div className="relative flex flex-col items-center gap-4 sm:items-start">
            <h3 className="text-blue-700 dark:text-blue-500">Podman Desktop</h3>
            <p className="max-w-2xl text-lg leading-relaxed text-gray-700 dark:text-gray-100">
              Podman Desktop is Podman's graphical application that makes it easy to install and work with Podman (and
              other container engines) on Windows, MacOS, and Linux.
            </p>
            <a
              href="https://podman-desktop.io"
              className="inline-flex items-center gap-1.5 rounded-md bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white no-underline shadow-sm transition duration-150 ease-linear hover:bg-purple-900 hover:no-underline dark:bg-purple-700 dark:hover:bg-purple-500">
              Explore Podman Desktop
              <Icon icon="mdi:arrow-right" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const SectionEyebrow = ({ icon, text }: { icon: string; text: string }) => (
  <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-500/10 dark:text-purple-300">
    <Icon icon={icon} />
    {text}
  </span>
);

const FeatureList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map(item => (
      <li key={item} className="flex items-start gap-2.5">
        <Icon icon="mdi:check-circle" className="mt-0.5 shrink-0 text-lg text-purple-700 dark:text-purple-300" />
        <span className="text-gray-700 dark:text-gray-100">{item}</span>
      </li>
    ))}
  </ul>
);

const ManageContainersUISection = () => {
  return (
    <section className="flex flex-col items-center gap-8 py-12 sm:flex-row-reverse sm:gap-12 sm:py-16">
      <div className="relative w-full sm:w-2/5 sm:flex-none">
        <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-48 rounded-[45%] bg-purple-300/55 blur-2xl dark:bg-purple-900/35" />
        <div className="pointer-events-none absolute -bottom-10 -left-6 h-32 w-40 rounded-[40%] bg-blue-300/45 blur-2xl dark:bg-blue-900/30" />
        <PlayOnScroll
          vidFormat="video/mp4"
          url="/video/ui/containers.mp4"
          posterImg="/images/optimized/ui-screens/ui-manage-containers.webp"
          styles="relative mx-auto w-full max-w-[560px] rounded-lg bg-cover object-contain md:rounded-3xl"
        />
      </div>
      <div className="w-full px-6 sm:flex-1 sm:px-16">
        <SectionEyebrow icon="mdi:cube-outline" text="Container Management" />
        <h3 className="mb-4 text-blue-700 dark:text-blue-500">Manage every container, not just Podman's.</h3>
        <FeatureList
          items={[
            'List, inspect, and control containers from every supported engine* in a single unified view.',
            'Jump into a live shell, tail logs, and run everyday lifecycle actions without touching a terminal.',
          ]}
        />
        <p className="mt-6 text-sm italic text-gray-500 dark:text-gray-300">
          * Supported engines and orchestrators include Podman, Docker, Lima, kind, Red Hat OpenShift, Red Hat OpenShift
          Developer Sandbox.
        </p>
      </div>
    </section>
  );
};

const BuildImagesUISection = () => {
  return (
    <section className="flex flex-col items-center gap-8 py-12 sm:flex-row sm:gap-12 sm:py-16">
      <div className="relative w-full sm:w-2/5 sm:flex-none">
        <div className="pointer-events-none absolute -left-10 -top-8 h-36 w-44 rounded-[40%] bg-blue-300/55 blur-2xl dark:bg-blue-900/35" />
        <div className="pointer-events-none absolute -bottom-8 -right-6 h-36 w-36 rounded-[45%] bg-purple-300/45 blur-2xl dark:bg-purple-900/30" />
        <PlayOnScroll
          vidFormat="video/mp4"
          url="/video/ui/images.mp4"
          posterImg="/images/optimized/ui-screens/ui-buildimage.webp"
          styles="relative mx-auto w-full max-w-[560px] rounded-lg bg-cover object-contain md:rounded-3xl"
        />
      </div>
      <div className="w-full px-6 sm:flex-1 sm:px-16">
        <SectionEyebrow icon="mdi:package-variant-closed" text="Image Building" />
        <h3 className="mb-4 text-blue-700 dark:text-blue-500">Build, pull, and push images with ease.</h3>
        <FeatureList
          items={[
            'Build containers straight from a Dockerfile or Containerfile, or pull ready-made images from any remote registry.',
            'Manage accounts for every registry and push your images wherever they need to go.',
          ]}
        />
      </div>
    </section>
  );
};

const CreatePodsUISection = () => {
  return (
    <section className="flex flex-col items-center gap-8 py-12 sm:flex-row-reverse sm:gap-12 sm:py-16">
      <div className="relative w-full sm:w-2/5 sm:flex-none">
        <div className="pointer-events-none absolute -bottom-10 -right-6 h-40 w-48 rounded-[42%] bg-purple-300/55 blur-2xl dark:bg-purple-900/35" />
        <div className="pointer-events-none absolute -left-8 -top-6 h-32 w-36 rounded-[38%] bg-blue-300/45 blur-2xl dark:bg-blue-900/30" />
        <PlayOnScroll
          vidFormat="video/mp4"
          url="/video/ui/podify.mp4"
          posterImg="/images/optimized/ui-screens/ui-podify.webp"
          styles="relative mx-auto w-full max-w-[560px] rounded-lg bg-cover object-contain md:rounded-3xl"
        />
      </div>
      <div className="w-full px-6 sm:flex-1 sm:px-16">
        <SectionEyebrow icon="mdi:hexagon-multiple-outline" text="Pod Orchestration" />
        <h3 className="mb-4 text-blue-700 dark:text-blue-500">Podify containers into pods.</h3>
        <FeatureList
          items={[
            'Group containers into pods with a click, then view unified logs and inspect every container inside.',
            'Play Kubernetes YAML locally without a cluster, or generate YAML straight from your pods.',
          ]}
        />
      </div>
    </section>
  );
};

const DeployToKubernetesUISection = () => {
  return (
    <section className="flex flex-col items-center gap-8 py-12 sm:flex-row sm:gap-12 sm:py-16">
      <div className="relative w-full sm:w-2/5 sm:flex-none">
        <div className="pointer-events-none absolute -bottom-8 -left-6 h-36 w-44 rounded-[44%] bg-blue-300/55 blur-2xl dark:bg-blue-900/35" />
        <div className="pointer-events-none absolute -right-10 -top-8 h-32 w-36 rounded-[36%] bg-purple-300/45 blur-2xl dark:bg-purple-900/30" />
        <PlayOnScroll
          vidFormat="video/mp4"
          url="/video/ui/kubernetes.mp4"
          posterImg="/images/optimized/ui-screens/ui-k8sdeploy.webp"
          styles="relative mx-auto w-full max-w-[560px] rounded-lg bg-cover object-contain md:rounded-3xl"
        />
      </div>
      <div className="w-full px-6 sm:flex-1 sm:px-16">
        <SectionEyebrow icon="mdi:kubernetes" text="Kubernetes Deploy" />
        <h3 className="mb-4 text-blue-700 dark:text-blue-500">Deploy straight to Kubernetes.</h3>
        <FeatureList
          items={[
            'Push pods from Podman Desktop to local or remote Kubernetes contexts using automatically-generated YAML.',
          ]}
        />
      </div>
    </section>
  );
};

const PodmanCLISection = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 dark:from-gray-700/25 dark:to-gray-900">
      <div className="container flex flex-col items-center gap-8 text-center sm:flex-row sm:gap-12 sm:text-left">
        <img
          className="h-36 w-36 shrink-0 sm:h-44 sm:w-44"
          src="/images/optimized/podman-selkie-385w-358h.webp"
          alt="Podman CLI seal mascot"
        />
        <div>
          <h2 className="mb-3 text-blue-700 dark:text-blue-500">Podman Command-Line</h2>
          <p className="max-w-xl text-xl leading-relaxed text-gray-700 dark:text-gray-100">
            Find, run, build, and share containers &mdash; all from a single, familiar CLI.
          </p>
        </div>
      </div>
    </section>
  );
};

const learnMoreResources = [
  {
    icon: 'mdi:book-open-page-variant',
    title: 'Documentation',
    description: 'Guides and references to get you started.',
    cta: 'Read the docs',
    path: 'https://docs.podman.io',
  },
  {
    icon: 'mdi:account-group',
    title: 'Community',
    description: 'Join us on Discord, IRC, or Matrix.',
    cta: 'Get involved',
    path: '/community',
  },
  {
    icon: 'mdi:source-branch',
    title: 'Contribute',
    description: 'Help make Podman even better.',
    cta: 'Contribute on GitHub',
    path: 'https://github.com/containers/podman',
  },
  {
    icon: 'mdi:rss',
    title: 'Blog',
    description: 'Release notes and updates from the team.',
    cta: 'Read the blog',
    path: 'https://blog.podman.io',
  },
];

const LearnMoreSection = () => {
  return (
    <section className="py-4">
      <div className="container">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-gray-50 p-6 text-center dark:bg-gray-700/40 sm:flex-row sm:gap-8 sm:p-8">
          <img
            className="h-28 w-28 shrink-0 sm:h-32 sm:w-32"
            src="/images/optimized/podman-2-196w-172h.webp"
            alt="Podman seal"
          />
          <div className="flex-1">
            <h2 className="mb-2 text-blue-700 dark:text-blue-500">{learnMore.title}</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-100">
              Explore our documentation, join the community, and start contributing.
            </p>
            <a
              href="https://docs.podman.io"
              className="inline-flex items-center gap-1.5 rounded-md bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white no-underline shadow-sm transition duration-150 ease-linear hover:bg-purple-900 hover:no-underline dark:bg-purple-700 dark:hover:bg-purple-500">
              Explore documentation
              <Icon icon="mdi:arrow-right" />
            </a>
          </div>
        </div>

        <h3 className="mb-6 mt-12 text-center text-blue-700 dark:text-blue-500">Resources</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {learnMoreResources.map(item => (
            <div key={item.title} className="rounded-xl border border-gray-100 p-5 dark:border-gray-700">
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-700 text-lg text-white">
                <Icon icon={item.icon} />
              </span>
              <h4 className="mb-1 dark:text-white">{item.title}</h4>
              <p className="mb-3 text-sm text-gray-500 dark:text-gray-300">{item.description}</p>
              <a
                href={item.path}
                className="inline-flex items-center gap-1 text-sm font-semibold text-purple-700 no-underline hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100">
                {item.cta}
                <Icon icon="mdi:arrow-right" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function Features() {
  return (
    <Layout>
      <PageHeader title={header.title} description={header.subtitle} />
      <GetToKnowPodmanSection />
      <PodmanDesktopSection />
      <ManageContainersUISection />
      <BuildImagesUISection />
      <CreatePodsUISection />
      <DeployToKubernetesUISection />
      <PodmanCLISection />
      <FeaturesCarousel />
      <LearnMoreSection />
      <ColoringBookSection />
    </Layout>
  );
}

export default Features;
