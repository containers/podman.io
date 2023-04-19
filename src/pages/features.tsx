import React from 'react';
import Layout from '@theme/Layout';
import { Icon } from '@iconify/react';
import PageHeader from '@site/src/components/layout/PageHeader';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import ColoringBookSection from '@site/src/components/content/ColoringBookSection';
import ReactMarkdown from 'react-markdown';
import ArticleCard from '@site/src/components/ui/ArticleCard';
import { header, knowPodman, learnMore } from '@site/static/data/features';

function KnowPodmanCards() {
  return (
    <div className="container flex flex-wrap justify-center gap-4 lg:gap-8">
      {knowPodman.cards.map((card, index) => {
        return (
          <article key={index} className="flex flex-col justify-start rounded-md p-4 text-center">
            <div>
              <h3 className="mb-4 font-medium dark:text-blue-500 xl:mb-6">{card.title}</h3>
              <ReactMarkdown children={card.description} className="max-w-xs" />
            </div>
            <img src={card.image.path} alt={card.image.alt} className="order-first my-2" />
          </article>
        );
      })}
    </div>
  );
}
const testCard = {
  title: { text: 'Build Kubernetes pods with Podman play kube', path: 'https://podman.io' },
  date: ' Oct 25, 2021',
  image: { src: 'images/article-thumb.png', alt: 'article thumbnail' },
  subtitle:
    'The podman play kube command has docker compose features in it to make it easier to transition your compose workloads',
  author: {
    path: '#',
    text: 'Brent Baude',
  },
};
const LearnMoreSection = () => {
  return (
    <div>
      <ArticleCard {...testCard} altLayout={true} />
      <ArticleCard {...testCard} altLayout={true} />
      <ArticleCard {...testCard} altLayout={true} />
    </div>
  );
};

export default function Features() {
  return (
    <Layout>
      <PageHeader title={header.title} description={header.subtitle} />
      <section className="mb-8 mt-4 lg:mt-8 xl:mb-12">
        <SectionHeader title={knowPodman.title} />
        <KnowPodmanCards />
      </section>
      {/* Carousel Interface */}
      <section></section>
      {/* Learn More */}
      <section>
        <SectionHeader title={learnMore.title} textGradient={true} textGradientStops="from-purple-500 to-purple-900" />
        <div className="container grid gap-4 lg:grid-cols-2">
          <section>
            <header className="container mb-4 text-center lg:mb-8 lg:text-start">
              <h3 className="font-medium text-blue-700 dark:text-blue-500">{learnMore.blogPosts.title}</h3>
            </header>

            <LearnMoreSection />
          </section>
          <section>
            <header className="container mb-4 text-center lg:text-start xl:mb-8">
              <h3 className="font-medium text-blue-700 dark:text-blue-500">{learnMore.resources.title}</h3>
            </header>
            <div>
              <ul className="container mb-12 mt-4 flex flex-col gap-4 lg:mb-16 lg:mt-8">
                {learnMore.resources.cards.map((card, index) => {
                  return (
                    <li key={index}>
                      <a
                        href={card.path}
                        className="mx-auto flex max-w-lg items-center gap-4 rounded-md bg-gray-100 p-4 text-purple-700 underline-offset-4 transition duration-150 ease-linear hover:bg-purple-700 hover:text-purple-50 hover:shadow-md dark:bg-gray-700 dark:hover:bg-purple-900 dark:hover:text-white">
                        <span>{card.text}</span>
                        <Icon icon={card.icon} className="order-first" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>
      </section>
      {/* Coloring Book */}
      <ColoringBookSection />
    </Layout>
  );
}
