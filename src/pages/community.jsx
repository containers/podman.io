import React from 'react';
import Layout from '@theme/Layout';
import PageHeader from '@site/src/components/PageHeader';
import SectionHeader from '@site/src/components/SectionHeader';
import WaveBorder from '@site/src/components/svgShapes/WaveBorder';

import { header, communityChat } from '@site/static/data/community';

function DateTimeBox() {
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
    <article className="mb-10 max-w-lg rounded-lg bg-[#f2f9f9] shadow-md">
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
    <div className="container my-8">
      <ul className="mb-12 flex flex-wrap justify-around gap-8 lg:gap-16">
        {links.map(link => {
          return (
            <li>
              <a href={link.path} className="mx-auto block text-center">
                <img src={link.image.path} alt={link.image.alt} />
                <span className="underline-offset-6 duration-149 mt-2 block text-blue-700 underline transition ease-linear hover:text-blue-900">
                  {link.text}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Community() {
  return (
    <Layout>
      <PageHeader title={header.title} description={header.subtitle} />
      <section className="mt-8 bg-gray-50 lg:mt-16">
        <SectionHeader title={communityChat.title} />
        <div className="flex flex-wrap justify-around gap-4 lg:gap-12">
          <div>
            <p className="max-w-sm text-center text-gray-700 md:max-w-md md:text-start">{communityChat.subtitle}</p>
          </div>
          <DateTimeBox />
        </div>

        <CommunityLinks />
        <WaveBorder />
      </section>
    </Layout>
  );
}
