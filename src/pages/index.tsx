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
/* PAGE DATA */
import { header, featureList, kubernetesBanner, compatibleTools } from '@site/static/data/home';

/* PAGE COMPONENTS */
const FeatureItem = ({ title, description }) => {
  return (
    <div className="flex flex-col justify-start rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-purple-500/40 dark:hover:shadow-purple-500/10">
      <h3 className="mb-4 text-2xl font-bold text-purple-700 dark:text-purple-500">{title}</h3>
      <Markdown text={description} styles="leading-relaxed text-gray-700 dark:text-gray-300" />
    </div>
  );
};

const FeatureSection = () => {
  return (
    <section className="container mb-20 px-4 md:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {featureList.map(feature => {
          return <FeatureItem key={feature.title} title={feature.title} description={feature.description} />;
        })}
      </div>
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

/* PAGE CONTENT */
function IndexPage() {
  return (
    <Layout>
      <HeroHeader {...header} />
      <FeatureSection />
      <InfoBanner {...kubernetesBanner} />
      <CompatibleToolSection />
      <TestimonialSection />
      <BlogArticlesList limit={4} title="Latest Podman News" titleColor="text-purple-700" containerLayout="grid" />
      <ColoringBookSection />
    </Layout>
  );
}

export default IndexPage;
