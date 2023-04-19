import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Papa from 'papaparse';
import HeroHeader from '@site/src/components/layout/HeroHeader';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import InfoBanner from '@site/src/components/ui/InfoBanner';
import ColoringBookSection from '@site/src/components/content/ColoringBookSection';
import ThumbCard from '@site/src/components/ui/ThumbCard';
import ReactMarkdown from 'react-markdown';
import ArticleCard from '@site/src/components/ui/ArticleCard';
/* PAGE DATA */
import { header, featureList, kubernetesBanner, compatibleTools, testimonials } from '@site/static/data/home';
import Testimonial from '../components/ui/Testimonial';
import newsLocal from '@site/static/data/newsLocal';
/* PAGE COMPONENTS */
const FeatureItem = ({ title, description }) => {
  return (
    <li className="m-6 rounded-md bg-gray-50 p-12 text-center dark:bg-gray-900 lg:w-1/3">
      <h3 className="mx-auto mb-4 text-3xl font-bold text-purple-700 dark:text-purple-500">{title}</h3>
      <ReactMarkdown children={description} className="mx-auto max-w-md leading-relaxed text-gray-700" />
    </li>
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
    <div className="container flex flex-wrap justify-center gap-4 md:gap-6">
      {testimonials.map((testimonial, index) => {
        return <Testimonial key={index} {...testimonial} />;
      })}
    </div>
  );
};

/* PAGE CONTENT */
export default function IndexPage() {
  return (
    <Layout>
      <HeroHeader {...header} />
      <section className="container"></section>
      <section className="mb-12">
        <ul className="flex flex-wrap justify-center gap-4">
          {featureList.map(feature => {
            return <FeatureItem key={feature.title} title={feature.title} description={feature.description} />;
          })}
        </ul>
      </section>
      <InfoBanner {...kubernetesBanner} />
      <section>
        <SectionHeader title={compatibleTools.title} fontWeight="font-light" />
        <div className="mx-auto flex flex-wrap justify-center gap-4">
          {compatibleTools.tools.map(tool => {
            return <ThumbCard key={tool.title} subtitle={tool.description} image={tool.image} />;
          })}
        </div>
      </section>
      <section className="bg-gradient-to-b from-white to-purple-100 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900">
        <SectionHeader
          title="What people are saying about Podman"
          textGradient={true}
          textGradientStops="from-blue-700 to-blue-500"
        />
        <TestimonialSection />
      </section>
      <LatestNews />
      <ColoringBookSection />
    </Layout>
  );
}
