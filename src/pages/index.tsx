import React from 'react';
import Layout from '@theme/Layout';
/* COMPONENTS */
import Markdown from '@site/src/components/utilities/Markdown';
import HeroHeader from '@site/src/components/layout/HeroHeader';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import InfoBanner from '@site/src/components/ui/InfoBanner';
import ThumbCard from '@site/src/components/ui/ThumbCard';
import ArticleCard from '@site/src/components/ui/ArticleCard';
import ColoringBookSection from '@site/src/components/content/ColoringBookSection';
import Testimonial from '@site/src/components/ui/Testimonial';
/* PAGE DATA */
import newsLocal from '@site/static/data/newsLocal';
import { header, featureList, kubernetesBanner, compatibleTools, testimonials } from '@site/static/data/home';

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
const LatestNews = () => {
  return (
    <section>
      <SectionHeader title="Latest Podman News" textColor="text-purple-700" />
      <div className="flex flex-wrap justify-center gap-4">
        {newsLocal.map((article, index) => {
          return <ArticleCard {...article} key={index} />;
        })}
      </div>
    </section>
  );
};

const TestimonialSection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-purple-100 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900">
      <SectionHeader
        title="What people are saying about Podman"
        textGradient={true}
        textGradientStops="from-blue-700 to-blue-500"
      />
      <div className="container flex flex-wrap justify-center gap-4 md:gap-6">
        {testimonials.map((testimonial, index) => {
          return <Testimonial key={index} {...testimonial} />;
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
      <LatestNews />
      <ColoringBookSection />
    </Layout>
  );
}

export default IndexPage;
