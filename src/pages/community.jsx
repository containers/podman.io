import React from 'react';
import Layout from '@theme/Layout';
import PageHeader from '@site/src/components/PageHeader';
import SectionHeader from '@site/src/components/SectionHeader';
import CardSection from '@site/src/components/CardSection';
import DateTimeBox from '@site/src/components/DateTimeBox';
import InfoBox from '@site/src/components/InfoBox';
import Button from '../components/Button';
import WaveBorder from '@site/src/components/svgShapes/WaveBorder';
import { Icon } from '@iconify/react';
import ReactMarkdown from 'react-markdown';
import { header, communityChat, communityMeetings, mailingList, submittingIssues } from '@site/static/data/community';

const extractObjects = arr => {
  return arr.map(item => {
    return structuredClone(item);
  });
};

function CommunityLinks() {
  const links = communityChat.links.map(x => x);
  return (
    <ul className="mb-12 flex flex-wrap justify-around gap-8 lg:gap-16">
      {links.map((link, index) => {
        return (
          <li key={index}>
            <a href={link.src} className="mx-auto  flex flex-col items-center text-center">
              <div className="max-w-fit rounded-full bg-white p-5 dark:bg-gray-700">
                <img src={link.image.src} alt={link.image.alt} />
              </div>
              <span className="underline-offset-6 duration-149 mt-4 block text-blue-700 underline transition ease-linear hover:text-blue-900">
                {link.text}
              </span>
            </a>
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
      {/* Community Chat */}
      <section className="mt-8 bg-gray-50 dark:bg-gradient-to-tl dark:from-gray-700 dark:via-gray-900 dark:to-gray-900 lg:mt-16">
        <SectionHeader title={communityChat.title} textColor="dark:text-blue-700" />
        <div className="mx-4 flex flex-wrap justify-around gap-4 sm:mx-8 lg:mx-auto lg:max-w-6xl">
          <div>
            <p className="max-w-sm text-center text-gray-700 md:max-w-md md:text-start lg:max-w-xl">
              {communityChat.subtitle}
            </p>
          </div>
          <DateTimeBox />
        </div>
        <div className="container my-8">
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
            src={communityMeetings.image.src}
            alt={communityMeetings.image.alt}
            className="order-first mx-auto object-cover lg:max-w-lg"
          />
          <CardSection cards={communityMeetings.cards} />
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
              {mailingList.subscribeInfo.options.map((item, index) => {
                return (
                  <article className=" my-4 flex max-w-xs flex-col justify-between" key={index}>
                    <h4 className="text-gray-700">{item.title}</h4>
                    <ReactMarkdown children={item.subtitle} className="mb-4 mt-2 w-[198px] md:w-64" />
                    <Button variant="outline" bgColor="white" text={item.button.text} src={item.button.src} />
                  </article>
                );
              })}
            </div>
            <div className="my-4 max-w-prose text-gray-700">
              <ReactMarkdown children={mailingList.subscribeInfo.description} />
            </div>
          </section>
          <section className="mb-8 lg:col-start-2 lg:row-span-2 lg:row-start-2">
            <div>
              <img
                src={mailingList.extraInfo.image.src}
                alt={mailingList.extraInfo.image.alt}
                className="w-full object-cover"
              />
            </div>
            <InfoBox
              title={mailingList.extraInfo.note.title}
              text={mailingList.extraInfo.note.text}
              darkBg="bg-purple-900"
            />
          </section>
        </div>
      </section>
      {/* Submit Pull Requests */}
      <section className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-900">
        <SectionHeader
          title={submittingIssues.title}
          description={submittingIssues.subtitle}
          textColor="from-purple-500 to-purple-700 dark:text-blue-700"
        />
      </section>
    </Layout>
  );
}
