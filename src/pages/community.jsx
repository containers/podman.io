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
    <article className="max-w-lg rounded-lg bg-[#f2f9f9] shadow-md">
      <div className="m-8 grid gap-2 md:grid-cols-2">
        <div className="col-span-full text-center">
          <h3 className="text-gray-300">Current Time</h3>
        </div>
        <div>
          <p>{currentTime}</p>
          <p>{userTimeZone}</p>
        </div>
        <div>
          <p>{centralTime[0]}</p>
          <p>{centralTime[1]}</p>
        </div>
      </div>
    </article>
  );
}

export default function Community() {
  return (
    <Layout>
      <PageHeader title={header.title} description={header.subtitle} />
      <section className="mt-8 bg-gray-50">
        <SectionHeader title={communityChat.title} />
        <div className="container flex justify-center gap-4">
          <div>
            <p className="max-w-prose">{communityChat.subtitle}</p>
          </div>
          <DateTimeBox />
        </div>
        <WaveBorder />
      </section>
    </Layout>
  );
}
