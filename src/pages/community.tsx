import React from 'react';
import Layout from '@theme/Layout';
import PageHeader from '@site/src/components/layout/PageHeader';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import CardGrid from '@site/src/components/layout/CardGrid';
import DateTimeBox from '@site/src/components/content/DateTimeBox';
import InfoBox from '@site/src/components/ui/InfoBox';
import InfoBanner from '@site/src/components/ui/InfoBanner';
import IconLink from '@site/src/components/utilities/IconLink';
import SmallCard from '@site/src/components/ui/SmallCard';
import WaveBorder from '@site/src/components/shapes/WaveBorder';
import ReactMarkdown from 'react-markdown';
import { header, communityChat, communityMeetings, mailingList, submittingIssues } from '@site/static/data/community';

function CommunityLinks() {
  const links = communityChat.links.map(x => x);
  return (
    <ul className="mb-12 flex flex-wrap items-end justify-around gap-8 lg:gap-16">
      {links.map((link, index) => {
        return (
          <li key={index}>
            <IconLink {...link} />
          </li>
        );
      })}
    </ul>
  );
}

export default function Community() {
  return (
    <Layout>
      <PageHeader title={header.title} description={header.subtitle} />
      <InfoBanner
        description={header.banner.text}
        icon={header.banner.icon}
        bgColor="bg-purple-500 dark:bg-purple-700"
      />
      {/* Community Chat */}
      <section className="bg-gray-50 dark:bg-gradient-to-t dark:from-gray-700 dark:via-gray-900 dark:to-gray-900 ">
        <SectionHeader title={communityChat.title} />
        <div className="mx-4 mt-8 flex flex-wrap justify-around gap-4 sm:mx-8 lg:mx-auto lg:mt-16 lg:max-w-6xl">
          <div className="">
            <p className="max-w-sm text-center text-gray-700 md:max-w-md md:text-start lg:max-w-xl">
              {communityChat.subtitle}
            </p>
          </div>
          <DateTimeBox />
        </div>
        <div className="container pt-12 lg:pt-20">
          <CommunityLinks />
        </div>
        <WaveBorder />
      </section>
      {/* Community Meetings */}
      <section className="bg-gradient-to-b from-white via-gray-50 to-gray-100 pb-8 dark:from-gray-900 dark:to-gray-900">
        <div className="container flex flex-col">
          <SectionHeader
            title={communityMeetings.title}
            description={communityMeetings.subtitle}
            textColor="from-purple-500 to-purple-700 dark:text-purple-500"
          />
          <img
            src={communityMeetings.image.path}
            alt={communityMeetings.image.alt}
            className="order-first mx-auto object-cover lg:max-w-lg"
          />
          <CardGrid cards={communityMeetings.cards} />
        </div>
      </section>
      {/* Mailing Lists */}
      <section>
        <div className="container grid gap-4 lg:grid-cols-2">
          <SectionHeader
            title={mailingList.title}
            description={mailingList.subtitle}
            layout="col-span-full"
            textColor="dark:text-blue-700"
          />
          <section className="container mb-8">
            <h3 className="mb-2 font-medium text-purple-700 dark:text-purple-500">{mailingList.browseInfo.title}</h3>
            <p className="max-w-prose text-gray-500">{mailingList.browseInfo.subtitle}</p>
          </section>
          <section className="container mb-8">
            <h3 className="mb-2 font-medium text-purple-700 dark:text-purple-500">{mailingList.subscribeInfo.title}</h3>
            <ReactMarkdown children={mailingList.subscribeInfo.subtitle} className="max-w-prose " />
            <div className="flex flex-wrap gap-6">
              {mailingList.subscribeInfo.options.map((card, index) => {
                return <SmallCard {...card} />;
              })}
            </div>
            <div className="my-4 max-w-prose">
              <ReactMarkdown children={mailingList.subscribeInfo.description} />
            </div>
          </section>
          <section className="mb-8 lg:col-start-2 lg:row-span-2 lg:row-start-2">
            <div>
              <img
                src={mailingList.extraInfo.image.path}
                alt={mailingList.extraInfo.image.alt}
                className="w-full  object-cover"
              />
            </div>
            <div className="ml-8 xl:ml-10">
              <InfoBox title={mailingList.extraInfo.note.title} text={mailingList.extraInfo.note.text} />
            </div>
          </section>
        </div>
      </section>
      {/* Submit Pull Requests */}
      <section className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-900">
        <SectionHeader
          title={submittingIssues[0].title}
          description={submittingIssues[0].subtitle}
          textColor="from-purple-500 to-purple-700 dark:text-blue-700"
        />
      </section>
    </Layout>
  );
}
