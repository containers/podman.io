import React from 'react';
import Layout from '@theme/Layout';
import { Icon } from '@iconify/react';
/* COMPONENTS */
import Markdown from '@site/src/components/utilities/Markdown';
import PageHeader from '@site/src/components/layout/PageHeader';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import ColoringBookSection from '@site/src/components/content/ColoringBookSection';
import FeaturesCarousel from '@site/src/components/content/FeaturesCarousel';
import BlogArticlesList from '@site/src/components/content/BlogArticlesList';
/* PAGE DATA */
import { header, knowPodman, podmanDesktop, learnMore } from '@site/static/data/features';
import PlayOnScroll from '@site/src/components/utilities/PlayOnScroll';
import BasicResourcesBox from '@site/src/components/content/BasicResourcesBox';

/* PAGE COMPONENTS */
function GetToKnowPodmanSection() {
  return (
    <section className="mb-8 mt-4 lg:mt-8 xl:mb-12">
      <SectionHeader title={knowPodman.title} textColor="text-blue-700 dark:text-blue-500" />
      <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {knowPodman.cards.map((card, index) => {
          return (
            <article
              key={index}
              className="flex h-full flex-col items-center rounded-lg bg-gray-50 p-6 pb-8 text-center shadow-md dark:bg-gray-700 dark:shadow-none lg:p-8">
              <img
                src={card.image.path}
                alt={card.image.alt}
                className="mb-6 h-40 w-auto object-contain"
              />
              <h3 className="mb-3 font-medium dark:text-blue-500">{card.title}</h3>
              <Markdown text={card.description} styles="max-w-xs leading-relaxed" />
            </article>
          );
        })}
      </div>
    </section>
  );
}

const PodmanDesktopSection = () => {
  return (
    <section className="mb-8 mt-4 lg:mt-8 xl:mb-12">
      <SectionHeader title={podmanDesktop.title} textColor="text-blue-700 dark:text-blue-500" />
      <div className="container flex flex-col items-center gap-8 py-4 md:flex-row md:items-center md:gap-10 lg:gap-14">
        <img
          src={podmanDesktop.image.path}
          alt={podmanDesktop.image.alt}
          className="h-40 w-auto shrink-0 object-contain hidden md:block md:h-44 lg:h-48"
        />
        <p className="min-w-0 flex-1 text-xl leading-relaxed text-gray-700 dark:text-gray-100 md:text-2xl">
          <a
            className="font-semibold text-purple-700 no-underline hover:text-purple-500 dark:text-blue-500 dark:hover:text-blue-300"
            href="https://podman-desktop.io">
            {podmanDesktop.title}
          </a>{' '}
          {podmanDesktop.description}
        </p>
      </div>
    </section>
  );
};

const ManageContainersUISection = () => {
  return (
    <section className="xl:py-16 xl:flex xl:flex-row-reverse bg-gradient-to-b from-purple-100 to-purple-300 dark:from-black dark:to-gray-900">
      <div className="flex-1 w-full md:my-16 md:w-4/5 md:mx-auto lg:w-full xl:my-16">
        <PlayOnScroll vidFormat="video/mp4" url="video/ui/containers.mp4" posterImg="images/optimized/ui-screens/ui-manage-containers.webp" styles="rounded-lg w-full lg:w-3/4 lg:mx-auto xl:mr-0 xl:w-full max-w-[1200px] items-center md:rounded-3xl bg-cover md:bg-contain xl:rounded-r-none" />
      </div>
      <div className="flex flex-1 my-16 md:my-none">
        <div className="flex-row px-16 xl:p-16 x2l:my-16 md:w-4/5 md:mx-auto">
          <h3 className="mb-5 dark:text-white">Manage containers (not just Podman.)</h3>
          <p className="mb-3 dark:text-white">
            Podman Desktop allows you to list, view, and manage containers from multiple supported container
            engines* in a single unified view.
          </p>
          <p className="mb-3 dark:text-white">
            Gain easy access to a shell inside the container, logs, and basic controls.
          </p>
          <em className="mt-10 block dark:text-white">
            * Supported engines and orchestrators include Podman, Docker, Lima, kind, Red Hat OpenShift, Red Hat 
            OpenShift Developer Sandbox.
          </em>
        </div>
      </div>
    </section>
  );
};

const BuildImagesUISection = () => {
  return (
  <section className="xl:py-16 xl:flex xl:flex-row bg-gradient-to-b from-purple-100 to-purple-300 dark:from-black dark:to-gray-900 xl:dark:from-gray-900 xl:dark:to-black">
    <div className="flex-1 w-full md:my-16 md:w-4/5 md:mx-auto lg:w-full xl:my-16">
      <PlayOnScroll vidFormat="video/mp4" url="video/ui/images.mp4" posterImg="images/optimized/ui-screens/ui-buildimage.webp" styles="rounded-lg w-full lg:w-3/4 lg:mx-auto xl:ml-0 xl:w-full max-w-[1200px] items-center md:rounded-3xl bg-cover md:bg-contain xl:rounded-l-none" />
    </div>
    <div className="flex flex-1 my-16 md:my-none">
      <div className="flex-row px-16 xl:p-16 x2l:my-16 md:w-4/5 md:mx-auto">
        <h3 className="mb-5 dark:text-white">Build, pull, and push images.</h3>
        <p className="mb-3 dark:text-white">
          Build containers from a Dockerfile / Containerfile, or pull images from remote repositories to run.
        </p>
        <p className="mb-3 dark:text-white">
          Manage accounts for and push your images to multiple container registries.
        </p>
      </div>
    </div>
  </section>
  );
};

const CreatePodsUISection = () => {
  return (
    <section className="xl:py-16 xl:flex xl:flex-row-reverse bg-gradient-to-b from-purple-100 to-purple-300 dark:from-black dark:to-gray-900">
    <div className="flex-1 w-full md:my-16 md:w-4/5 md:mx-auto lg:w-full xl:my-16">
      <PlayOnScroll vidFormat="video/mp4" url="video/ui/podify.mp4" posterImg="images/optimized/ui-screens/ui-podify.webp" styles="rounded-lg w-full lg:w-3/4 lg:mx-auto xl:mr-0 xl:w-full max-w-[1200px] items-center md:rounded-3xl bg-cover md:bg-contain xl:rounded-r-none" />
    </div>
    <div className="flex flex-1 my-16 md:my-none">
      <div className="flex-row px-16 xl:p-16 x2l:my-16 md:w-4/5 md:mx-auto">
        <h3 className="mb-5 dark:text-white">Podify containers into pods.</h3>
        <p className="mb-3 dark:text-white">
          Create pods by selecting containers to run together. View unified logs for your pods and inspect the
          containers inside each.
        </p>
        <p className="mb-3 dark:text-white">
        Play Kubernetes YAML locally, without Kubernetes, and generate Kubernetes YAML from Pods.
        </p>
      </div>
    </div>
  </section>
  );
};

const DeployToKubernetesUISection = () => {
  return (
  <section className="xl:py-16 md:pb-32 xl:flex xl:flex-row bg-gradient-to-b from-purple-100 to-purple-300  dark:from-black dark:to-gray-900 xl:dark:from-gray-900 xl:dark:to-black">
    <div className="flex-1 w-full md:my-16 md:w-4/5 md:mx-auto lg:w-full xl:my-16">
      <PlayOnScroll vidFormat="video/mp4" url="video/ui/kubernetes.mp4" posterImg="images/optimized/ui-screens/ui-k8sdeploy.webp" styles="rounded-lg w-full lg:w-3/4 lg:mx-auto xl:ml-0 xl:w-full max-w-[1200px] items-center md:rounded-3xl bg-cover md:bg-contain xl:rounded-l-none" />
    </div>
    <div className="flex flex-1 my-16 md:my-none">
      <div className="flex-row px-16 xl:p-16 x2l:my-16 md:w-4/5 md:mx-auto">
        <h3 className="mb-5 dark:text-white">Deploy to Kubernetes.</h3>
        <p className="mb-3 dark:text-white">
          Deploy pods from Podman Desktop to local or remote Kubernetes contexts using automatically-generated
          YAML config.
        </p>
      </div>
    </div>
  </section>
  );
};

const PodmanCLISection = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100  pb-5 dark:from-gray-700/25  dark:to-gray-900">
      <div className="align-center container mb-8 flex justify-center xl:mb-20">
        <div className="flex-row content-center">
          <h2 className="mb-5 content-center bg-blue-700 pl-5 pr-5 text-white dark:text-white">Podman Command-Line</h2>
        </div>
      </div>
      <div className="container mb-4 grid gap-2 lg:grid-cols-3">
        <div className="mx-auto">
          <img className="max-h-[200px]" src="images/optimized/podman-selkie-385w-358h.webp" />
        </div>
        <div className="col-span-2">
          <p className="my-8 align-middle text-2xl leading-relaxed">
            Podman's command-line interface allows you to find, run, build, and share containers.
          </p>
        </div>
      </div>
    </section>
  );
};

const LearnMoreSection = () => {
  return (
    <section>
      <SectionHeader title={learnMore.title} textGradient={true} textGradientStops="from-purple-500 to-purple-900" />
      <div className="container mt-8 flex flex-wrap justify-center gap-24">
        <BlogArticlesList
          limit={2}
          displayCount={2}
          altLayout
          title={learnMore.blogPosts.title}
          titleColor="text-blue-700 dark:text-blue-500"
          showFooter
          footerText="Check out more posts about Podman"
          containerLayout="vertical"
          sectionClassName="my-4 lg:my-0"
        />
        <BasicResourcesBox />
      </div>
    </section>
  );
};

function Features() {
  return (
    <Layout>
      <PageHeader title={header.title} description={header.subtitle} image={header.image} />
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
