import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
/* COMPONENTS */
import Markdown from '@site/src/components/utilities/Markdown';
import HeroHeader from '@site/src/components/layout/HeroHeader';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import InfoBanner from '@site/src/components/ui/InfoBanner';
import ThumbCard from '@site/src/components/ui/ThumbCard';
import ArticleCard from '@site/src/components/ui/ArticleCard';
import ColoringBookSection from '@site/src/components/content/ColoringBookSection';
import TestimonialSection from '@site/src/components/content/TestimonialSection';
/* PAGE DATA */
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
    <section>
      <SectionHeader title="Latest Podman News" textColor="text-purple-700" />
      <div className="flex flex-wrap justify-center gap-4">
        {blogData.map(card => {
          console.log(card);
          return (
            <ArticleCard
              title={card.title.rendered}
              author_link={card.author_info.author_link}
              display_name={card.author_info.display_name}
              subtitle={card.excerpt.rendered}
              date={card.wbDate}
              imgSrc={card.jetpack_featured_media_url}
              path={card.link}
              key={card.id}
            />
          );
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
