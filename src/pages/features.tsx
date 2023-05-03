import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { Icon } from '@iconify/react';
/* COMPONENTS */
import Markdown from '@site/src/components/utilities/Markdown';
import PageHeader from '@site/src/components/layout/PageHeader';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import ColoringBookSection from '@site/src/components/content/ColoringBookSection';
import ArticleCard from '@site/src/components/ui/ArticleCard';
import FeaturesCarousel from '@site/src/components/content/FeaturesCarousel';
/* PAGE DATA */
import { header, knowPodman, learnMore } from '@site/static/data/features';

/* PAGE COMPONENTS */
function GetToKnowPodmanSection() {
  return (
    <section className="mb-8 mt-4 lg:mt-8 xl:mb-12">
      <SectionHeader title={knowPodman.title} />
      <div className="container flex flex-wrap justify-center gap-4 lg:gap-8">
        {knowPodman.cards.map((card, index) => {
          return (
            <article key={index} className="mt-2 flex flex-col justify-start rounded-md p-4 text-center lg:mt-4">
              <div>
                <h3 className="mb-4 font-medium dark:text-blue-500 xl:mb-6">{card.title}</h3>
                <Markdown text={card.description} styles="max-w-xs" />
              </div>
              <img src={card.image.path} alt={card.image.alt} className="order-first my-2 h-52 w-auto object-contain" />
            </article>
          );
        })}
      </div>
    </section>
  );
}

const PodmanDesktopSection = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 pb-5 dark:bg-gray-900 dark:from-gray-700/25 dark:to-gray-900">
      <div className="align-center container mb-8 flex justify-center xl:mb-20">
        <div className="flex-row content-center">
          <h2 className="mb-5 content-center bg-blue-500 pl-5 pr-5 text-white dark:bg-blue-700 dark:text-white">
            Podman Desktop
          </h2>
        </div>
      </div>
      <div className="container mb-4 grid gap-2 lg:grid-cols-3">
        <div id="imgdiv" className="mx-auto">
          <img id="pdlogo" src="logos/optimized/podman-desktop-logo-200w-198h.webp" />
        </div>
        <div className="col-span-2">
          <p className="my-8 align-middle text-2xl leading-relaxed">
            Podman Desktop is Podman's graphical application that makes it easy to install and work with Podman (and
            other container engines) on Windows, MacOS, and Linux.
          </p>
        </div>
      </div>
    </section>
  );
};

const ManageContainersUISection = () => {
  return (
    <section className="bg-gradient-to-b from-purple-100 to-purple-300 pb-5 dark:from-purple-900 dark:to-blue-900">
      <div className="align-center container my-8 grid justify-center gap-4 md:grid-cols-3 xl:my-20">
        <div className="my-8 h-fit rounded-md bg-white/50 shadow-md">
          <div className="flex flex-col items-center justify-center p-8 dark:text-black">
            <div>
              <h3 className="mb-5 dark:text-black">Manage containers (not just Podman.)</h3>
              <p className="mb-3 dark:text-black">
                Podman Desktop allows you to list, view, and manage containers from multiple supported container
                engines* in a single unified view.
              </p>
              <p className="mb-3 dark:text-black">
                Gain easy access to a shell inside the container, logs, and basic controls.
              </p>
              <em className="mt-10 block">
                * Supported engines and orchestrators include Podman, Docker, Lima, kind, Red Hat OpenShift, Red Hat
                OpenShift Developer Sandbox.
              </em>
            </div>
          </div>
        </div>
        <div className="col-span-2 w-full">
          <img className="w-full" src="images/optimized/ui-screens/ui-manage-containers.webp" />
        </div>
      </div>
    </section>
  );
};

const BuildImagesUISection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 pb-5 dark:from-gray-900 dark:to-purple-900">
      <div className="align-center container my-8 grid justify-center gap-4 md:grid-cols-3 xl:my-20">
        <div className="col-span-2 w-full">
          <img className="mb-6 mt-6 w-full md:max-w-[75%]" src="images/optimized/ui-screens/ui-buildimage.webp" />
        </div>
        <div className="my-8 h-fit rounded-md bg-white/50 shadow-md">
          <div className="flex flex-col items-center justify-center p-8">
            <div>
              <h3 className="mb-5 dark:text-black">Build, pull, and push images.</h3>
              <p className="dark:text-black">
                Build containers from a Dockerfile / Containerfile, or pull images from remote repositories to run.
              </p>
              <p className="dark:text-black">
                Manage accounts for and push your images to multiple container registries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CreatePodsUISection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-100 to-blue-50 pb-5 dark:from-gray-700 dark:to-gray-900">
      <div className="align-right container my-8 grid justify-center gap-4 md:grid-cols-3 xl:my-16">
        <div className="my-8 h-fit rounded-md bg-white/50 shadow-md">
          <div className="flex flex-col items-center justify-center p-8">
            <div>
              <h3 className="mb-5 dark:text-black">Create pods.</h3>
              <p className="dark:text-black">
                Create pods by selecting containers to run together. View unified logs for your pods and inspect the
                containers inside each.
              </p>
              <p className="dark:text-black">
                Play Kubernetes YAML locally, without Kubernetes, and generate Kubernetes YAML from Pods.
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 w-full">
          <img className="mb-6 mt-6 w-full md:max-w-[75%]" src="images/optimized/ui-screens/ui-podify.webp" />
        </div>
      </div>
    </section>
  );
};

const DeployToKubernetesUISection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 pb-5 dark:from-blue-900 dark:to-gray-900">
      <div className="container my-8 grid justify-center gap-4 md:grid-cols-3 xl:my-20">
        <div className="col-span-2 w-full">
          <img className="mb-6 mt-6 w-full md:max-w-[75%]" src="images/optimized/ui-screens/ui-k8sdeploy.webp" />
        </div>
        <div className="my-8 h-fit rounded-md bg-white/50 shadow-md">
          <div className="flex flex-col items-center justify-center p-8">
            <div>
              <h3 className="mb-5 dark:text-black">Deploy to Kubernetes.</h3>
              <p className="dark:text-black">
                Deploy pods from Podman Desktop to local or remote Kubernetes contexts using automatically-generated
                YAML config.
              </p>
            </div>
          </div>
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
          <img className="max-h-[200px]" src="images/raw/podman-selkie-385w-358h.png" />
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

const LearnArticles = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetch(
        'https://blog.podman.io/wp-json/wp/v2/posts?per_page=4&_fields=id, author_info, title, wbDate, jetpack_featured_media_url, link, excerpt',
      );
      const jsonData = await rawData.json();
      setBlogData(jsonData);
    };
    fetchData().catch(console.error);
  }, []);
  return (
    <section className="my-4 lg:my-0">
      <header className="container mb-4 text-center lg:mb-8 lg:text-start">
        <h3 className="font-medium text-blue-700 dark:text-blue-500">{learnMore.blogPosts.title}</h3>
      </header>
      <div className="flex flex-col gap-4">
        {blogData.map((card, index) => {
          if (index < 2) {
            return (
              <ArticleCard
                title={card.title.rendered}
                author_link={card.author_info.author_link}
                display_name={card.author_info.display_name}
                subtitle={card.excerpt.rendered}
                date={card.wbDate}
                imgSrc={card.jetpack_featured_media_url}
                path={card.link}
                altLayout
                key={card.id}
              />
            );
          }
        })}
        <p className="ml-2l text-center 2xl:text-start">
          Check out more posts about Podman{' '}
          <a
            href="https://blog.podman.io"
            target="_blank"
            className="underline-offset-4 transition duration-150 ease-linear hover:text-purple-700 dark:hover:text-purple-500">
            on our Blog!
          </a>
        </p>
      </div>
    </section>
  );
};

const LearnResources = () => {
  return (
    <section className="mt-4 lg:my-0">
      <header className="container mb-6 text-center xl:mb-8 xl:text-start">
        <h3 className="font-medium text-blue-700 dark:text-blue-500">{learnMore.resources.title}</h3>
      </header>
      <div>
        <ul className="mb-10 mt-4 flex flex-col gap-6 sm:flex-row lg:mb-16 lg:mt-8 lg:gap-4 xl:flex-col">
          {learnMore.resources.cards.map((card, index) => {
            return (
              <li key={index}>
                <a
                  href={card.path}
                  className="mx-auto flex h-32 max-w-lg flex-col items-center justify-center gap-4 rounded-md bg-gray-100 p-4 text-center text-purple-700 underline-offset-4 transition duration-150 ease-linear hover:bg-purple-700 hover:text-purple-50 hover:shadow-md dark:bg-gray-700 dark:hover:bg-purple-900 dark:hover:text-white lg:h-auto lg:flex-row xl:justify-start">
                  <span>{card.text}</span>
                  <Icon icon={card.icon} className="order-first hidden lg:block" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

const LearnMoreSection = () => {
  return (
    <section>
      <SectionHeader title={learnMore.title} textGradient={true} textGradientStops="from-purple-500 to-purple-900" />
      <div className="container mt-8 flex flex-wrap justify-center gap-24">
        <LearnArticles />
        <LearnResources />
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
