import React from 'react';
import Layout from '@theme/Layout';
/* COMPONENTS */
import Markdown from '@site/src/components/utilities/Markdown';
import HeroHeader from '@site/src/components/layout/HeroHeader';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import InfoBanner from '@site/src/components/ui/InfoBanner';
import ThumbCard from '@site/src/components/ui/ThumbCard';
import ColoringBookSection from '@site/src/components/content/ColoringBookSection';
import TestimonialSection from '@site/src/components/content/TestimonialSection';
import BlogArticlesList from '@site/src/components/content/BlogArticlesList';
import Button from '@site/src/components/utilities/Button';
/* PAGE DATA */
import { header, featureList, kubernetesBanner, compatibleTools } from '@site/static/data/home';

/* PAGE COMPONENTS */
const FeatureItem = ({ title, description }) => {
  return (
    <li className="m-2 rounded-xl border border-gray-100 bg-gray-50 p-12 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 lg:w-1/3">
      <h3 className="mx-auto mb-4 text-3xl font-bold text-purple-700 dark:text-purple-500">{title}</h3>
      <Markdown text={description} styles="mx-auto max-w-md leading-relaxed text-gray-700" />
    </li>
  );
};

const FeatureSection = () => {
  return (
    <section className="container mx-auto mb-12">
      <ul className="flex flex-wrap justify-center gap-6">
        {featureList.map(feature => {
          return <FeatureItem key={feature.title} title={feature.title} description={feature.description} />;
        })}
      </ul>
    </section>
  );
};

const CompatibleToolSection = () => {
  return (
    <section>
      <SectionHeader title={compatibleTools.title} fontWeight="font-light" />
      <div className="mx-auto flex flex-wrap justify-center gap-4">
        {compatibleTools.tools.map(tool => {
          return <ThumbCard key={tool.title} subtitle={tool.description} image={tool.image} />;
        })}
      </div>
    </section>
  );
};

const BlogSection = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-16 dark:bg-gray-900/40 lg:py-20">
      <div className="pointer-events-none absolute -top-16 right-1/4 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-700/10" />
      <BlogArticlesList
        limit={3}
        title="Latest Podman News"
        description="Release notes, deep dives, and updates from the Podman team and community."
        titleColor="text-purple-700 dark:text-purple-500"
        containerLayout="grid"
      />
      <div className="mt-10 flex justify-center">
        <Button as="link" outline path="https://blog.podman.io" text="View all posts" />
      </div>
    </section>
  );
};

/* PAGE CONTENT */
function IndexPage() {
  return (
    <Layout>
      <HeroHeader {...header} />
      <FeatureSection />
      <InfoBanner {...kubernetesBanner} />
      <CompatibleToolSection />
      <TestimonialSection />
      <BlogSection />
      <ColoringBookSection />
    </Layout>
  );
}

export default IndexPage;
