import React from 'react';
import Layout from '@theme/Layout';
import PageHeader from '@site/src/components/PageHeader';
import SectionHeader from '@site/src/components/SectionHeader';
import Card from '@site/src/components/Card';
import Button from '../components/Button';
import WaveBorder from '@site/src/components/svgShapes/WaveBorder';
import { Icon } from '@iconify/react';
import ReactMarkdown from 'react-markdown';
import { header, communityChat, communityMeetings, mailingList, submittingIssues } from '@site/static/data/community';

function DateTimeBox() {
  // TODO: Optimize this code
  const date = new Date();
  const currentTime = `${date.getHours()}:${date.getMinutes()}`;
  const userTimeZone = new Intl.DateTimeFormat('en-US', { timeZoneName: 'long' }).format().split(',')[1];

  const centralTime = [
    date.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }),
    Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', timeZoneName: 'long' }).format().split(',')[1],
  ];

  return (
    <article className="mb-10 max-w-lg rounded-lg bg-aqua shadow-md">
      <div className="m-4 grid grid-cols-2 gap-x-4 lg:m-8">
        <div className="col-span-full mb-5 text-center">
          <h3 className="font-bold text-gray-300">Current Time</h3>
        </div>
        <div className="text-center">
          <h4 className="mb-2 text-3xl font-extrabold text-purple-500">{currentTime}</h4>
          <p className="w-40 font-bold text-blue-900">{userTimeZone}</p>
        </div>
        <div className="text-center">
          <h4 className="mb-2 text-3xl font-extrabold text-purple-500">{centralTime[0]}</h4>
          <p className="w-40 font-bold text-blue-900">{centralTime[1]}</p>
        </div>
      </div>
    </article>
  );
}

function CommunityLinks() {
  const links = communityChat.links.map(x => x);
  return (
    <ul className="mb-12 flex flex-wrap justify-around gap-8 lg:gap-16">
      {links.map((link, index) => {
        return (
          <li key={index}>
            <a href={link.src} className="mx-auto  flex flex-col items-center text-center">
              <div className="max-w-fit rounded-full bg-white p-5">
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

function CardSection() {
  const cards = communityMeetings.cards.map(card => card);
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-4 lg:mb-12 lg:gap-8">
      {cards.map((card, index) => {
        return (
          <Card
            key={index}
            title={card.title}
            subtitle={card.date}
            details={card.timeZone}
            text={card.subtitle}
            data={card.buttons}
          />
        );
      })}
    </div>
  );
}

function MultiSectionCard({ content }) {
  const section = content;
  console.log(section);
  return (
    <article className="mt-4 mb-8 w-full rounded-sm bg-white p-8 shadow-xl lg:w-1/3">
      <header>
        <h4 className="text-center text-blue-700 md:text-xl">{section.title}</h4>
        <aside className="my-4 flex items-center justify-center gap-2 rounded-md bg-aqua p-2">
          <Icon icon="fa6-solid:circle-exclamation" className="text-purple-700" />
          <p>{}</p>
        </aside>
      </header>
      <section className="flex flex-col items-center">
        {/* <ReactMarkdown children={} className="max-w-sm" /> */}
        <ul className="my-2 ml-10 list-disc">
          <li className="my-3"></li>
        </ul>
        <div className="mb-8">{/* <Button text={} src={} variant="outline" bgColor="white" /> */}</div>
      </section>
    </article>
  );
}
export default function Community() {
  return (
    <Layout>
      <PageHeader title={header.title} description={header.subtitle} />
      {/* Community Chat */}
      <section className="mt-8 bg-gray-50 lg:mt-16">
        <SectionHeader title={communityChat.title} />
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
      <section className="bg-gradient-to-b from-white via-gray-50 to-gray-100 pb-8">
        <div className="container flex flex-col">
          <SectionHeader
            title={communityMeetings.title}
            description={communityMeetings.subtitle}
            textColor="from-purple-500 to-purple-700"
          />
          <img
            src={communityMeetings.image.src}
            alt={communityMeetings.image.alt}
            className="order-first mx-auto object-cover lg:max-w-lg"
          />
          {/* TODO: Add card background color support */}
          <CardSection />
        </div>
      </section>
      {/* Mailing Lists */}
      <section>
        {/* TODO: optimize  single to multi column layouts */}
        <div className="container grid gap-4 lg:grid-cols-2">
          <SectionHeader title={mailingList.title} description={mailingList.subtitle} layout="col-span-full" />
          <section className="container mb-8">
            <h3 className="font-medium text-purple-700">{mailingList.browseInfo.title}</h3>
            <p className="max-w-prose text-gray-500">{mailingList.browseInfo.subtitle}</p>
          </section>
          <section className="container mb-8">
            <h3 className="font-medium text-purple-700">{mailingList.subscribeInfo.title}</h3>
            <ReactMarkdown children={mailingList.subscribeInfo.subtitle} className="max-w-prose text-gray-500" />
            <div className="flex flex-wrap gap-4">
              {mailingList.subscribeInfo.options.map((item, index) => {
                return (
                  <article className="my-4 max-w-xs" key={index}>
                    <h4 className="text-gray-700">{item.title}</h4>
                    <ReactMarkdown children={item.subtitle} className="mb-4 mt-2 w-48 text-gray-500 md:w-64" />
                    <Button variant="outline" bgColor="white" text={item.button.text} src={item.button.src} />
                  </article>
                );
              })}
            </div>
            <div className="my-4 max-w-prose text-gray-700">
              <p>{mailingList.subscribeInfo.description}</p>
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
            {/* TODO: create a new component called InfoBox with this */}
            <aside className="container rounded-lg bg-aqua p-8 text-gray-700 shadow-xl lg:ml-10 lg:max-w-xl">
              <h4 className="mb-2 font-bold">{mailingList.extraInfo.note.title}</h4>
              <p>{mailingList.extraInfo.note.text}</p>
            </aside>
          </section>
        </div>
      </section>
      {/* Submit Pull Requests */}
      <section className="bg-gray-50">
        <SectionHeader
          title={submittingIssues.title}
          description={submittingIssues.subtitle}
          textColor="from-purple-500 to-purple-700"
        />
        <div className="container flex flex-wrap justify-center gap-4">
          {submittingIssues.sections.map((item, index) => {
            return <MultiSectionCard content={item} key={index} />;
          })}
        </div>
        {/*  TODO: Add Aside Box */}
      </section>
    </Layout>
  );
}
