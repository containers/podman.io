import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { usePapaParse } from 'react-papaparse';
import HeroHeader from '@site/src/components/layout/HeroHeader';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import InfoBanner from '@site/src/components/ui/InfoBanner';
import ColoringBookSection from '@site/src/components/content/ColoringBookSection';
import ThumbCard from '@site/src/components/ui/ThumbCard';
import ReactMarkdown from 'react-markdown';
import ArticleCard from '@site/src/components/ui/ArticleCard';
/* PAGE DATA */
import { header, featureList, kubernetesBanner, compatibleTools } from '@site/static/data/home';
import Testimonial from '../components/ui/Testimonial';

/* PAGE COMPONENTS */
const FeatureItem = ({ title, description }) => {
  return (
    <li className="m-6 rounded-md bg-gray-50 p-12 text-center dark:bg-gray-900 lg:w-1/3">
      <h3 className="mx-auto mb-4 text-3xl font-bold text-purple-700 dark:text-purple-500">{title}</h3>
      <ReactMarkdown children={description} className="mx-auto max-w-md leading-relaxed text-gray-700" />
    </li>
  );
};
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
const LatestNews = () => {
  return (
    <section>
      <SectionHeader title="Latest Podman News" textColor="text-purple-700" />
      <div className="flex flex-wrap justify-center gap-4">
        <ArticleCard {...testCard} />
        <ArticleCard {...testCard} />
        <ArticleCard {...testCard} />
        <ArticleCard {...testCard} />
      </div>
    </section>
  );
};

const testimonialTest = {
  name: 'Shakeel Ahmad Minhas',
  handle: '@Ahmad_Shakeel77',
  description:
    'Looking for a lightweight and efficient way to run containers on your Mac? Give Podman a try! This open-source container engine can help you manage your containerized applications easily on macOS.  #Mac #Podman #Containers',
  social: 'twitter',
  path: '#',
  date: 'Mar 9, 2023',
};

const TestimonialSection = () => {
  return <Testimonial {...testimonialTest} />;
};
/* PAGE CONTENT */
export default function IndexPage() {
  const { readString } = usePapaParse();
  const handleReadString = () => {
    const csvString = `
user,handle,platform,link,date,description
Shakeel Ahmad Minhas,@Ahmad_Shakeel77,twitter,,2023-03-09,"Looking for a lightweight and efficient way to run containers on your Mac? Give Podman a try! This open-source container engine can help you manage your containerized applications easily on macOS. #Mac #Podman #Containers"""
Marco Mornati,@mmornati@techhub.social,mastadon,,2023-02-19,"Just getting back to test #podman-desktop I used a bit after the I think this became THE replacement for what we knew... #docker-desktop payment announcement.Changes are incredible and on #macosx all looks pretty smooth right now: docker API, host folder sharing, port sharing with hosts, privileged access (I test with https://github.com/mmornati/docker-mock-rpmbuilder), ..."
John Hammond,@_JohnHammond,youtube,,2022-11-18,
@snonu,@snonux,twitter,,2023-03-07,
,,,,,https://matduggafinally-delete-doc
,,,,,#docker #podman #k8s #kubernetes 
`;
    readString(csvString, {
      worker: true,
      complete: results => {
        console.log(results);
      },
    });
  };
  console.log(handleReadString());
  return (
    <Layout>
      <HeroHeader {...header} />
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
      <section className="bg-gradient-to-b from-white to-purple-100">
        <SectionHeader
          title="What people are saying about Podman"
          textGradient={true}
          textGradientStops="from-blue-700 to-blue-500"
        />
        <div className="container">
          <TestimonialSection />
        </div>
      </section>
      <LatestNews />
      <ColoringBookSection />
    </Layout>
  );
}
