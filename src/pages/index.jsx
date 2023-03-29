import React from 'react';
import Layout from '@theme/Layout';
import HeroHeader from '@site/src/components/layout/HeroHeader';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import InfoBanner from '@site/src/components/ui/InfoBanner';
import ColoringBookSection from '@site/src/components/content/ColoringBookSection';
import ReactMarkdown from 'react-markdown';

/* PAGE DATA */
import { header, featureList, kubernetesBanner, compatibleTools } from '/data/home';

/* PAGE COMPONENTS */
const FeatureItem = ({ title, description }) => {
  return (
    <li className="m-6 rounded-md bg-gray-50 p-12 text-center dark:bg-gray-900 lg:w-1/3">
      <h3 className="mx-auto mb-4 text-3xl font-bold text-purple-700 dark:text-purple-500">{title}</h3>
      <ReactMarkdown children={description} className="mx-auto max-w-md leading-relaxed text-gray-700" />
    </li>
  );
};

const CompatibleTool = ({ title, description, image }) => {
  return (
    <article className="flex max-w-xs flex-col items-center justify-center rounded-md p-6 shadow-md lg:m-4">
      <h3 className="hidden">{title}</h3>
      <p className="w-48 text-center">{description}</p>
      <img src={image.src} alt={image.alt} className="order-first my-8 h-20" />
    </article>
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
        // bgColor="bg-gradient-radial from-blue-100/50 to-blue-300/25 dark:from-blue-700/25 dark:to-blue-700/45"
      />
      <section>
        <SectionHeader title={compatibleTools.title} fontWeight="font-light" />
        <div className="mx-auto flex flex-wrap justify-center gap-4">
          {compatibleTools.tools.map(tool => {
            return <CompatibleTool key={tool.title} description={tool.description} image={tool.image} />;
          })}
        </div>
      </section>
      <ColoringBookSection />
    </Layout>
  );
}
