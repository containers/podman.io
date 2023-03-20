import React from 'react';
import Layout from '@theme/Layout';
import PageHeader from '@site/src/components/PageHeader';
import SectionHeader from '@site/src/components/SectionHeader';
import ReactMarkdown from 'react-markdown';
import { header, knowPodman } from '@site/static/data/features';
export default function Community() {
  return (
    <Layout>
      <PageHeader title={header.title} description={header.subtitle} />
      <section>
        <SectionHeader title={knowPodman.title} />
        <div className="container flex flex-wrap justify-center gap-4 lg:gap-8">
          {knowPodman.cards.map(card => {
            return (
              <article className="flex flex-col justify-start rounded-md p-4 text-center">
                <div>
                  <h3 className="mb-4 font-medium xl:mb-6">{card.title}</h3>
                  <ReactMarkdown children={card.description} className="max-w-xs" />
                </div>
                <img src={card.image.src} alt={card.image.alt} className="order-first my-2" />
              </article>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
