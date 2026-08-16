import React from 'react';
import Layout from '@theme/Layout';
import { Icon } from '@iconify/react';
/* COMPONENTS */
import Markdown from '@site/src//components/utilities/Markdown';
import PageHeader from '@site/src/components/layout/PageHeader';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import ThankYouSection from '@site/src/components/content/ThankYouSection';
import CommunityMeetingsCardGrid from '@site/src/components/layout/CommunityMeetingsCardGrid';
import SmallCard from '@site/src/components/ui/SmallCard';
import DateTimeBox from '@site/src/components/content/DateTimeBox';
import InfoBox from '@site/src/components/ui/InfoBox';
import IconLink from '@site/src/components/utilities/IconLink';
import Button from '@site/src/components/utilities/Button';
import DropdownButton from '@site/src/components/utilities/DropdownButton';
/* PAGE DATA */
import { header, communityChat, communityMeetings, mailingList, submittingIssues } from '@site/static/data/community';

/* PAGE COMPONENTS */
const NoticeCard = ({
  icon,
  image,
  text,
  accent = 'purple',
}: {
  icon?: string;
  image?: { src: string; alt: string };
  text: string;
  accent?: 'purple' | 'blue';
}): JSX.Element => {
  const accentStyles =
    accent === 'blue'
      ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
      : 'border-purple-500 bg-purple-50 dark:bg-purple-500/10';
  return (
    <div className="container">
      <div
        className={`mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border-l-4 p-6 text-center shadow-sm sm:flex-row sm:text-left lg:p-8 ${accentStyles}`}>
        <div className="shrink-0">
          {icon ? (
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white ${accent === 'blue' ? 'bg-blue-600' : 'bg-purple-700'}`}>
              <Icon icon={icon} />
            </div>
          ) : (
            image && <img src={image.src} alt={image.alt} className="h-12 w-12 object-contain" />
          )}
        </div>
        <Markdown
          text={text}
          styles="leading-relaxed text-gray-700 dark:text-gray-100 [&_a]:font-semibold [&_a]:text-purple-700 dark:[&_a]:text-purple-400"
        />
      </div>
    </div>
  );
};

const CommunityLinks = () => {
  const links = communityChat.links.map(x => x);
  return (
    <ul className="mx-auto grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {links.map((link, index) => {
        return (
          <li key={index} className="h-full">
            <IconLink {...link} accentColor="text-purple-700 dark:text-purple-300" />
          </li>
        );
      })}
    </ul>
  );
};

const CommunityChatSection = (): JSX.Element => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white pb-12 dark:from-gray-700 dark:to-gray-900 lg:pb-20">
      <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-700/10" />
      <div className="pointer-events-none absolute -top-10 right-1/4 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-700/10" />
      <SectionHeader
        textGradient={true}
        title={communityChat.title}
        description={communityChat.subtitle}
        textGradientStops="from-blue-700 to-purple-700 dark:from-blue-500 dark:to-purple-500"
      />
      <div className="relative mx-4 mt-8 flex flex-col items-center justify-center gap-10 sm:mx-8 lg:mx-auto lg:mt-16 lg:max-w-6xl">
        <CommunityLinks />
        <DateTimeBox />
      </div>
    </section>
  );
};

const CommunityMeetingSection = (): JSX.Element => {
  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-gray-100 pb-8 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="container flex flex-col">
        <SectionHeader
          title={communityMeetings.title}
          textGradientStops="from-purple-500 to-purple-700 dark:text-purple-500"
          textGradient={true}
        />
        <div className="mx-auto mb-12 flex flex-col items-center gap-8 lg:mb-16 lg:flex-row lg:items-center lg:gap-12">
          <img
            src={communityMeetings.image.path}
            alt={communityMeetings.image.alt}
            className="w-full max-w-lg shrink-0 rounded-2xl object-cover shadow-md lg:w-1/2"
          />
          <Markdown
            text={communityMeetings.subtitle}
            styles="max-w-2xl text-center leading-relaxed text-gray-700 dark:text-gray-100 lg:text-left"
          />
        </div>
        <CommunityMeetingsCardGrid cards={communityMeetings.cards} />
      </div>
    </section>
  );
};

const MailingListSection = (): JSX.Element => {
  return (
    <section className="pb-16 lg:pb-20">
      <div className="container grid gap-10 lg:grid-cols-2">
        <SectionHeader
          title={mailingList.title}
          description={mailingList.subtitle}
          layout="col-span-full"
          textColor="dark:text-blue-700"
        />
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 lg:p-8">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-500">
                <Icon icon="mdi:email-search-outline" className="text-xl" />
              </span>
              <h3 className="font-medium text-purple-700 dark:text-purple-500">{mailingList.browseInfo.title}</h3>
            </div>
            <Markdown text={mailingList.browseInfo.subtitle} styles="max-w-prose" />
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 lg:p-8">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-500">
                <Icon icon="mdi:email-fast-outline" className="text-xl" />
              </span>
              <h3 className="font-medium text-purple-700 dark:text-purple-500">{mailingList.subscribeInfo.title}</h3>
            </div>
            <Markdown text={mailingList.subscribeInfo.subtitle} styles="max-w-prose" />
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {mailingList.subscribeInfo.options.map((card, index) => {
                return <SmallCard {...card} key={index} />;
              })}
            </div>
            <div className="mt-6 max-w-prose border-t border-gray-100 pt-4 text-xs text-gray-500 dark:border-white/10 dark:text-gray-300">
              <Markdown text={mailingList.subscribeInfo.description} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-900">
          <img
            src={mailingList.extraInfo.image.path}
            alt={mailingList.extraInfo.image.alt}
            className="w-full rounded-xl object-cover"
          />
          <InfoBox title={mailingList.extraInfo.note.title} text={mailingList.extraInfo.note.text} />
        </div>
      </div>
    </section>
  );
};

const DropdownContent = (props): JSX.Element => {
  return (
    <div className="rounded-md p-4 shadow-md">
      <ul>
        {props.map((link, index) => {
          return (
            <li
              key={index}
              className="my-2 rounded-md px-2 transition duration-150 ease-linear hover:bg-purple-700 hover:text-white">
              <a href={link.path} className="w-full hover:text-white hover:no-underline">
                {link.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const IssuesSection = () => {
  return (
    <section className="max-w-lg rounded-2xl border border-gray-100 bg-white px-10 pt-10 shadow-md ring-1 ring-black/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:ring-white/5">
      <header className="mb-10">
        <h3 className="mb-4 text-center text-blue-700 dark:text-blue-500">{submittingIssues[1].title}</h3>
        <div className="rounded-md bg-blue-100/25 px-3 py-2 dark:bg-blue-500/10">
          <p className="flex items-center gap-2 rounded-md dark:text-gray-100">
            <Icon icon="fa-solid:exclamation-circle" className="text-purple-700 dark:text-purple-500" />
            <span>{submittingIssues[1].subtitle}</span>
          </p>
        </div>
      </header>
      <div>
        {submittingIssues[1].sections.map((section, index) => {
          return (
            <div key={index} className="mb-12">
              <Markdown text={section.text} />
              <ul className="mb-8 ml-5 mt-4 list-disc">
                {section.checkList.map((item, index) => {
                  return (
                    <li key={index} className="text-gray-900 dark:text-gray-100">
                      {item}
                    </li>
                  );
                })}
              </ul>
              <DropdownButton
                text={section.button.text}
                option={DropdownContent(section.button.links)}
                className="my-2 inline-flex items-center gap-2 rounded-md border-2 border-purple-700 bg-transparent px-6 py-2.5 text-base font-semibold text-purple-700 transition duration-150 ease-in-out hover:bg-purple-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 active:scale-[0.98] dark:border-purple-500 dark:text-purple-300 dark:hover:bg-purple-500 dark:hover:text-white dark:focus-visible:ring-offset-gray-900"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

const PullRequestSection = () => {
  return (
    <section className="max-w-lg rounded-2xl border border-gray-100 bg-white p-10 shadow-md ring-1 ring-black/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:ring-white/5">
      <header className="mx-auto mb-10">
        <h3 className="mb-3 text-center text-blue-700 dark:text-blue-500">{submittingIssues[2].title}</h3>
        <Markdown text={submittingIssues[2].subtitle} />
      </header>
      <div>
        {submittingIssues[2].description.map((paragraph, index) => {
          return (
            <p key={index} className="my-3">
              {paragraph}
            </p>
          );
        })}
        <ul className="my-4 ml-5 list-disc">
          {submittingIssues[2].checkList.map((item, index) => {
            return (
              <li key={index} className="text-gray-900 dark:text-gray-100">
                {item}
              </li>
            );
          })}
        </ul>
        <Button
          as="link"
          outline={true}
          path={submittingIssues[2].button.path}
          text={submittingIssues[2].button.text}
        />
      </div>
    </section>
  );
};

const SubmitIssuesSection = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 pb-16 pt-8 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 lg:pb-20 lg:pt-12">
      <SectionHeader
        title={submittingIssues[0].title}
        description={submittingIssues[0].subtitle}
        textGradientStops="from-purple-500 to-purple-700 dark:text-blue-700"
        textGradient={true}
      />
      <div className="mx-auto mt-16 flex flex-wrap justify-center gap-10 px-8 lg:container lg:gap-20">
        <IssuesSection />
        <PullRequestSection />
      </div>
    </section>
  );
};

/* PAGE CONTENT */
function Community() {
  return (
    <Layout>
      <PageHeader title={header.title} description={header.subtitle} />
      <div className="pb-8 lg:pb-12">
        <NoticeCard icon={header.banner.icon} text={header.banner.text} accent="purple" />
      </div>
      <CommunityChatSection />
      <CommunityMeetingSection />
      <div className="py-8 lg:py-12">
        <NoticeCard
          image={{ src: '/logos/optimized/podman-desktop-logo-200w-198h.webp', alt: 'Podman Desktop Logo' }}
          text="**Searching for Podman Desktop Community Meetings?** [Click Here](https://podman-desktop.io/community#community-events) or visit the [official website](https://podman-desktop.io) to learn more."
          accent="blue"
        />
      </div>
      <MailingListSection />
      <SubmitIssuesSection />
      <ThankYouSection />
    </Layout>
  );
}

export default Community;
