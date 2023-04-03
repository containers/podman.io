import React from 'react';
import Layout from '@theme/Layout';
import HeroHeader from '@site/src/components/layout/HeroHeader';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import InfoBanner from '@site/src/components/ui/InfoBanner';
import ColoringBookSection from '@site/src/components/content/ColoringBookSection';
import ThumbCard from '@site/src/components/ui/ThumbCard';
import ReactMarkdown from 'react-markdown';

/* PAGE DATA */
import { header, featureList, kubernetesBanner, compatibleTools } from '@site/static/data/home';

/* PAGE COMPONENTS */
const FeatureItem = ({ title, description }) => {
  return (
    <li className="m-6 rounded-md bg-gray-50 p-12 text-center dark:bg-gray-900 lg:w-1/3">
      <h3 className="mx-auto mb-4 text-3xl font-bold text-purple-700 dark:text-purple-500">{title}</h3>
      <ReactMarkdown children={description} className="mx-auto max-w-md leading-relaxed text-gray-700" />
    </li>
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
      />
      <section>
        <SectionHeader title={compatibleTools.title} fontWeight="font-light" />
        <div className="mx-auto flex flex-wrap justify-center gap-4">
          {compatibleTools.tools.map(tool => {
            return <ThumbCard key={tool.title} description={tool.description} image={tool.image} />;
          })}
        </div>
      </section>
      <ColoringBookSection />
    </Layout>
  );
}
