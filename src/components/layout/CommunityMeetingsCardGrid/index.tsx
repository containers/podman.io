import React, { useEffect, useMemo, useRef, useState } from 'react';
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

const RecentMeetingCard = React.memo(function RecentMeetingCard({
  date,
  day,
  isCabal,
  notesUrl,
}: RecentMeetingCardProps): JSX.Element {
  return (
    <article className="recent-meeting-card flex min-h-[450px] w-full flex-col items-center justify-between rounded-lg border border-black/[0.08] bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-gray-900 dark:shadow-none">
      <div className="pt-2 text-center">
        <span className="shadow-xs mb-3 inline-block rounded-md bg-purple-700 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white dark:bg-purple-700 dark:text-white">
          {isCabal ? 'Cabal' : 'Community'}
        </span>
        <h3 className="text-gray-800 text-xl font-bold tracking-tight dark:text-gray-100 sm:text-2xl">{date}</h3>
        <p className="dark:text-gray-400 mt-1 text-sm font-medium text-gray-500">{day}</p>
      </div>

      <div className="my-8 flex flex-1 items-center justify-center">
        <FilmIcon />
      </div>

      <div className="flex w-full justify-center pb-2">
        <Link
          to={notesUrl}
          style={{ textDecoration: 'none' }}
          className="hover:bg-purple-800 dark:hover:bg-purple-600 inline-flex w-full max-w-[220px] items-center justify-center gap-2 rounded-md bg-purple-700 px-5 py-2.5 text-center text-sm font-semibold text-white !no-underline shadow-sm transition duration-150 ease-in-out hover:text-white hover:!no-underline hover:shadow-md dark:bg-purple-700 dark:text-white">
          <span>View meeting</span>
          <Icon icon="material-symbols:arrow-forward-rounded" className="text-base" />
        </Link>
      </div>
    </article>
  );
});

function CommunityMeetingsCardGrid({ cards }: { cards: CommunityMeetingsCardProps[] }): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<'all' | 'community' | 'cabal'>('all');

  const allMeetings = useMemo(() => getAllMeetings(), []);
  const communityMeetings = useMemo(() => getCommunityMeetings(), []);
  const cabalMeetings = useMemo(() => getCabalMeetings(), []);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [sliderStyle, setSliderStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const [hasMeasured, setHasMeasured] = useState(false);

  const updateSlider = () => {
    const container = containerRef.current;
    const activeButton = buttonRefs.current[activeFilter];
    if (container && activeButton) {
      setSliderStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
      setHasMeasured(true);
    }
  };

  useEffect(() => {
    updateSlider();
  }, [activeFilter]);

  useEffect(() => {
    window.addEventListener('resize', updateSlider);
    return () => window.removeEventListener('resize', updateSlider);
  }, [activeFilter]);

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

  const filterOptions = [
    { id: 'all' as const, label: 'All Meetings' },
    { id: 'community' as const, label: 'Community Meetings' },
    { id: 'cabal' as const, label: 'Cabal Meetings' },
  ];

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

      {/* Meeting Filters (All, Community, Cabal) - Subtle Sliding Tab Bar */}
      <div className="relative mx-auto mb-10 flex max-w-7xl items-center justify-center px-4">
        <div
          ref={containerRef}
          role="tablist"
          aria-label="Filter meeting archive"
          className="relative inline-flex items-center rounded-xl border border-black/[0.08] bg-white p-1.5 shadow-sm dark:border-white/10 dark:bg-gray-900">
          {/* Animated Sliding Indicator */}
          <div
            className="pointer-events-none absolute bottom-1.5 top-1.5 rounded-lg bg-purple-700 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              left: `${sliderStyle.left}px`,
              width: `${sliderStyle.width}px`,
              opacity: hasMeasured ? 1 : 0,
            }}
          />

          {filterOptions.map(option => {
            const isActive = activeFilter === option.id;
            return (
              <button
                key={option.id}
                ref={el => {
                  buttonRefs.current[option.id] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(option.id)}
                style={{ border: 'none', outline: 'none', textDecoration: 'none' }}
                className={`relative z-10 cursor-pointer rounded-lg px-6 py-2.5 text-sm font-semibold !no-underline transition-colors duration-200 hover:!no-underline ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-600 hover:text-purple-700 dark:text-gray-300 dark:hover:text-white'
                }`}>
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Top-Right "View All" link with black arrow turning brand purple on hover */}
        <div className="absolute right-4 hidden sm:block">
          <Link
            to={viewAllLink}
            style={{ textDecoration: 'none' }}
            className="dark:hover:text-purple-400 group inline-flex items-center gap-1.5 text-sm font-semibold text-black !no-underline transition-colors duration-200 hover:text-purple-700 hover:!no-underline dark:text-white">
            <span className="dark:group-hover:text-purple-400 transition-colors duration-200 group-hover:text-purple-700">
              View All
            </span>
            <Icon
              icon="material-symbols:arrow-forward-rounded"
              className="dark:group-hover:text-purple-400 text-base text-black transition-all duration-200 group-hover:translate-x-1 group-hover:text-purple-700 dark:text-white"
            />
          </Link>
        </div>
      </div>

      {/* Mobile-only View All link */}
      <div className="mx-auto -mt-6 mb-6 flex max-w-7xl justify-end px-4 sm:hidden">
        <Link
          to={viewAllLink}
          style={{ textDecoration: 'none' }}
          className="dark:hover:text-purple-400 group inline-flex items-center gap-1.5 text-sm font-semibold text-black !no-underline transition-colors duration-200 hover:text-purple-700 hover:!no-underline dark:text-white">
          <span className="dark:group-hover:text-purple-400 transition-colors duration-200 group-hover:text-purple-700">
            View All
          </span>
          <Icon
            icon="material-symbols:arrow-forward-rounded"
            className="dark:group-hover:text-purple-400 text-base text-black transition-all duration-200 group-hover:translate-x-1 group-hover:text-purple-700 dark:text-white"
          />
        </Link>
      </div>

      {/* 4 Cards Grid Across */}
      <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayedMeetings.map(meeting => (
          <RecentMeetingCard
            key={meeting.id}
            date={meeting.date}
            day={meeting.day}
            isCabal={meeting.isCabal}
            notesUrl={`/community/meetings?date=${meeting.id}&type=${meeting.isCabal ? 'cabal' : 'community'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default CommunityMeetingsCardGrid;
