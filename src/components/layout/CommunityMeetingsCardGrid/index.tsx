import React, { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import CustomCard from '@site/src/components/ui/CustomCard';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import FilmIcon from '@site/src/components/shapes/FilmIcon';
import { getAllMeetings, getCabalMeetings, getCommunityMeetings } from '@site/src/utils/communityMeetings';

type CommunityMeetingsCardProps = {
  title: string;
  subtitle: string;
  date: string;
  timeZone: string;
  buttons: Array<{
    text: string;
    path: string;
  }>;
};

type RecentMeetingCardProps = {
  date: string;
  day: string;
  isCabal: boolean;
  recordingUrl?: string;
  notesUrl: string;
};

function RecentMeetingCard({ date, day, isCabal, recordingUrl, notesUrl }: RecentMeetingCardProps): JSX.Element {
  return (
    <article className="recent-meeting-card shadow-purple-950/5 hover:shadow-purple-950/15 flex min-h-[490px] w-full flex-col items-center justify-between rounded-md bg-white p-8 shadow-xl transition-all duration-200 hover:-translate-y-1.5 hover:shadow-2xl dark:bg-gray-900 dark:shadow-black/20">
      <div className="pt-2 text-center">
        <span className="mb-3 inline-block rounded-md bg-purple-700 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm shadow-purple-700/25 dark:bg-purple-700 dark:text-white">
          {isCabal ? 'Cabal' : 'Community'}
        </span>
        <h3 className="text-gray-800 text-xl font-bold tracking-tight dark:text-gray-100 sm:text-2xl">{date}</h3>
        <p className="dark:text-gray-400 mt-1 text-sm font-medium text-gray-500">{day}</p>
      </div>

      <div className="my-8 flex flex-1 items-center justify-center">
        <FilmIcon />
      </div>

      <div className="flex w-full flex-col items-center gap-3.5 pb-2">
        {recordingUrl ? (
          <a
            href={recordingUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
            className="recent-meeting-card-btn dark:bg-purple-950/50 inline-flex w-full max-w-[220px] items-center justify-center gap-2 rounded-md bg-purple-50 px-5 py-2.5 text-center text-sm font-semibold text-purple-700 !no-underline shadow-sm transition duration-150 ease-in-out hover:bg-purple-700 hover:text-white hover:!no-underline hover:shadow-md dark:text-purple-300 dark:hover:bg-purple-700 dark:hover:text-white">
            <Icon icon="logos:youtube-icon" className="shrink-0 text-base" />
            <span style={{ textDecoration: 'none' }} className="!no-underline">
              Watch Recording
            </span>
          </a>
        ) : (
          <span className="text-gray-400 inline-flex w-full max-w-[220px] items-center justify-center rounded-md bg-gray-50 px-5 py-2.5 text-center text-sm font-medium dark:bg-gray-900 dark:text-gray-500">
            No Recording
          </span>
        )}

        <Link
          to={notesUrl}
          style={{ textDecoration: 'none' }}
          className="recent-meeting-card-btn hover:bg-purple-800 dark:bg-purple-600 inline-flex w-full max-w-[220px] items-center justify-center gap-2 rounded-md bg-purple-700 px-5 py-2.5 text-center text-sm font-semibold text-white !no-underline shadow-md shadow-purple-700/20 transition duration-150 ease-in-out hover:text-white hover:!no-underline hover:shadow-lg hover:shadow-purple-700/30 dark:hover:bg-purple-500">
          <Icon icon="material-symbols:description-outline" className="shrink-0 text-base" />
          <span style={{ textDecoration: 'none' }} className="!no-underline">
            Meeting Minutes
          </span>
        </Link>
      </div>
    </article>
  );
}

function CommunityMeetingsCardGrid({ cards }: { cards: CommunityMeetingsCardProps[] }): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<'all' | 'community' | 'cabal'>('all');

  const allMeetings = useMemo(() => getAllMeetings(), []);
  const communityMeetings = useMemo(() => getCommunityMeetings(), []);
  const cabalMeetings = useMemo(() => getCabalMeetings(), []);

  const displayedMeetings = useMemo(() => {
    if (activeFilter === 'community') return communityMeetings.slice(0, 4);
    if (activeFilter === 'cabal') return cabalMeetings.slice(0, 4);
    return allMeetings.slice(0, 4);
  }, [activeFilter, allMeetings, communityMeetings, cabalMeetings]);

  const viewAllLink = useMemo(() => {
    if (activeFilter === 'community') return '/community/meetings?type=community';
    if (activeFilter === 'cabal') return '/community/meetings?type=cabal';
    return '/community/meetings';
  }, [activeFilter]);

  return (
    <div className="custom-card-grid-root w-full">
      {/* Top 2 Primary Cards: Community Meeting & Cabal Meeting side-by-side */}
      <div className="mb-14 flex flex-col justify-center gap-8 lg:flex-row lg:gap-10">
        {cards.map((card: CommunityMeetingsCardProps, index: number) => (
          <div key={`primary-card-${index}`} className="flex flex-1 justify-center">
            <CustomCard
              title={card?.title}
              subtitle={card?.date}
              details={card?.timeZone}
              text={card?.subtitle}
              data={card?.buttons}
              primary={true}
            />
          </div>
        ))}
      </div>

      {/* ONE Single Unified Heading */}
      <div className="mb-4 text-center">
        <SectionHeader
          title=""
          description="Most Recent meetings"
          textGradientStops="from-purple-500 to-purple-700 dark:text-purple-500"
          textGradient={false}
        />
      </div>

      {/* Meeting Filters (All, Community, Cabal) - Soft, Elevated Pill Bar without harsh borders */}
      <div className="mb-10 flex justify-center">
        <div className="shadow-purple-950/5 inline-flex items-center rounded-full bg-white p-1.5 shadow-lg dark:bg-gray-900">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`rounded-full px-6 py-2.5 text-sm font-bold transition duration-150 ${
              activeFilter === 'all'
                ? 'bg-purple-700 text-white shadow-md shadow-purple-700/25'
                : 'text-gray-600 hover:text-purple-700 dark:text-gray-300 dark:hover:text-white'
            }`}>
            All Meetings
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('community')}
            className={`rounded-full px-6 py-2.5 text-sm font-bold transition duration-150 ${
              activeFilter === 'community'
                ? 'bg-purple-700 text-white shadow-md shadow-purple-700/25'
                : 'text-gray-600 hover:text-purple-700 dark:text-gray-300 dark:hover:text-white'
            }`}>
            Community Meetings
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('cabal')}
            className={`rounded-full px-6 py-2.5 text-sm font-bold transition duration-150 ${
              activeFilter === 'cabal'
                ? 'bg-purple-700 text-white shadow-md shadow-purple-700/25'
                : 'text-gray-600 hover:text-purple-700 dark:text-gray-300 dark:hover:text-white'
            }`}>
            Cabal Meetings
          </button>
        </div>
      </div>

      {/* 4 Cards Grid Across */}
      <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayedMeetings.map(meeting => (
          <RecentMeetingCard
            key={meeting.id}
            date={meeting.date}
            day={meeting.day}
            isCabal={meeting.isCabal}
            recordingUrl={meeting.recordingUrl}
            notesUrl={`/community/meetings?date=${meeting.id}&type=${meeting.isCabal ? 'cabal' : 'community'}`}
          />
        ))}
      </div>

      {/* ONE Unified "View All" Button - Solid Purple Button matching homepage button roundness */}
      <div className="flex justify-center">
        <Link
          to={viewAllLink}
          style={{ textDecoration: 'none' }}
          className="hover:bg-purple-800 dark:bg-purple-600 group inline-flex items-center gap-3 rounded-md bg-purple-700 px-8 py-3.5 text-base font-bold text-white !no-underline shadow-lg shadow-purple-700/25 transition duration-200 ease-in-out hover:-translate-y-0.5 hover:text-white hover:!no-underline hover:shadow-xl hover:shadow-purple-700/30 dark:hover:bg-purple-500">
          <span style={{ textDecoration: 'none' }} className="!no-underline">
            View All Past Meeting Notes & Recordings
          </span>
          <Icon
            icon="material-symbols:arrow-forward-rounded"
            className="text-xl transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}

export default CommunityMeetingsCardGrid;
