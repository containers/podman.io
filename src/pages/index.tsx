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
import TerminalSimulator from '@site/src/components/ui/TerminalSimulator';

/* PAGE COMPONENTS */
const FeatureItem = ({ title, description }) => {
  return (
    <li className="m-6 rounded-md bg-gray-50 p-12 text-center dark:bg-gray-900 lg:w-1/3">
      <h3 className="mx-auto mb-4 text-3xl font-bold text-purple-700 dark:text-purple-500">{title}</h3>
      <Markdown text={description} styles="mx-auto max-w-md leading-relaxed text-gray-700" />
    </li>
  );
};

const FeatureSection = () => {
  return (
    <section className="mb-12">
      <ul className="flex flex-wrap justify-center gap-4">
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

/* PAGE CONTENT */
function IndexPage() {
  return (
    <Layout>
      <HeroHeader {...header} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-[-3rem] relative z-10 hidden md:block">
        <TerminalSimulator />
      </div>
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
