import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import { MDXProvider } from '@mdx-js/react';
import WaveBorder from '@site/src/components/shapes/WaveBorder';
import type { MeetingItem } from '@site/src/utils/communityMeetings';
import { getCabalMeetings, getCommunityMeetings } from '@site/src/utils/communityMeetings';
import {
  MeetingCategory,
  MeetingTypeSwitcher,
  MeetingVideoPlayer,
  SessionCard,
  YearDropdown,
  meetingMdxComponents,
} from '@site/src/components/community/meetings';

function MeetingsPage(): JSX.Element {
  const communityMeetings = useMemo(() => getCommunityMeetings(), []);
  const cabalMeetings = useMemo(() => getCabalMeetings(), []);

  const [activeType, setActiveType] = useState<MeetingCategory>('community');
  const [selectedMeetingId, setSelectedMeetingId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const copyTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear copy status timer on unmount
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  // Meetings for current category
  const currentList = activeType === 'community' ? communityMeetings : cabalMeetings;

  // Extract unique years and count distribution
  const { availableYears, countPerYear } = useMemo(() => {
    const years = new Set<number>();
    const counts: Record<string, number> = {};
    currentList.forEach(m => {
      years.add(m.year);
      counts[m.year] = (counts[m.year] || 0) + 1;
    });
    return {
      availableYears: Array.from(years).sort((a, b) => b - a),
      countPerYear: counts,
    };
  }, [currentList]);

  // Filter meetings by year and keyword search
  const filteredMeetings = useMemo(() => {
    return currentList.filter(m => {
      if (selectedYear !== 'all' && m.year.toString() !== selectedYear) {
        return false;
      }
      if (searchQuery.trim()) {
        const queryTerms = searchQuery.toLowerCase().trim().split(/\s+/);
        const searchableText = `${m.date} ${m.id} ${m.day} ${m.title} ${m.searchIndex || ''}`.toLowerCase();
        const matchesAll = queryTerms.every(term => searchableText.includes(term));
        if (!matchesAll) {
          return false;
        }
      }
      return true;
    });
  }, [currentList, selectedYear, searchQuery]);

  // Synchronize state from URL query parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get('date');
    const typeParam = params.get('type');

    if (typeParam === 'cabal' || typeParam === 'community') {
      setActiveType(typeParam);
    }

    if (dateParam) {
      setSelectedMeetingId(dateParam);
    }
  }, []);

  // Ensure an active meeting is always selected if available
  useEffect(() => {
    if (filteredMeetings.length > 0) {
      const exists = filteredMeetings.some(m => m.id === selectedMeetingId);
      if (!exists) {
        setSelectedMeetingId(filteredMeetings[0].id);
      }
    }
  }, [filteredMeetings, selectedMeetingId]);

  // Currently active meeting object
  const activeMeeting: MeetingItem | undefined = useMemo(() => {
    return currentList.find(m => m.id === selectedMeetingId) || filteredMeetings[0];
  }, [currentList, selectedMeetingId, filteredMeetings]);

  // Update selected meeting and sync query parameters to address bar
  const handleSelectMeeting = useCallback(
    (meeting: MeetingItem) => {
      setSelectedMeetingId(meeting.id);
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('date', meeting.id);
        url.searchParams.set('type', activeType);
        window.history.replaceState({}, '', url.toString());
      }
    },
    [activeType],
  );

  // Switch category type and reset year filter
  const handleSelectType = useCallback((type: MeetingCategory) => {
    setActiveType(type);
    setSelectedYear('all');
  }, []);

  // Copy shareable link to clipboard
  const handleCopyLink = useCallback(() => {
    if (typeof window === 'undefined' || !activeMeeting) return;
    const url = new URL(window.location.href);
    url.searchParams.set('date', activeMeeting.id);
    url.searchParams.set('type', activeType);
    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopiedLink(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopiedLink(false), 2000);
    });
  }, [activeMeeting, activeType]);

  return (
    <Layout
      title="Podman Community Meeting Notes & Minutes"
      description="Browse notes, agendas, summaries, and embedded video recordings for Podman Community and Cabal meetings.">
      <main className="min-h-screen bg-white pb-20 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-700 pb-16 pt-10 dark:from-blue-700 dark:to-purple-900 md:pb-24 md:pt-14">
          <div className="container mx-auto px-4 lg:px-8 xl:max-w-[1440px]">
            {/* Back to Community Link */}
            <div className="mb-6">
              <Link
                to="/community"
                style={{ color: '#ffffff', textDecoration: 'none' }}
                className="inline-flex items-center gap-2 text-sm font-semibold !text-white !no-underline transition hover:!text-white/80 hover:!no-underline">
                <Icon icon="material-symbols:arrow-back-rounded" className="text-lg !text-white" />
                <span className="!text-white">Back to Community</span>
              </Link>
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-12">
              {/* Left Column: Title & Subtitle */}
              <div className="lg:col-span-7">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                  <Icon icon="material-symbols:video-camera-front-rounded" className="text-base" />
                  <span>Podman Community Archive</span>
                </div>
                <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white dark:text-gray-50 sm:text-4xl lg:text-5xl lg:leading-tight">
                  Meeting Notes & Recordings
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-white/90 dark:text-gray-100 sm:text-lg">
                  Explore meeting agendas, listen to embedded recordings, review attendee lists, and read session
                  summaries for Podman Community and Cabal meetings.
                </p>
              </div>

              {/* Right Column: Category Switcher */}
              <div className="flex flex-col items-start gap-3 lg:col-span-5 lg:items-end">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                  Select Meeting Type
                </span>
                <MeetingTypeSwitcher
                  activeType={activeType}
                  onSelectType={handleSelectType}
                  communityCount={communityMeetings.length}
                  cabalCount={cabalMeetings.length}
                />
              </div>
            </div>
          </div>

          <WaveBorder
            className="pointer-events-none absolute bottom-0 left-0 z-10 h-8 w-full sm:h-12 md:h-14 lg:h-16"
            preserveAspectRatio="none"
          />
        </section>

        {/* Search & Controls Bar - Full Screen Width, No Outer Border, No Bottom Drop Shadow */}
        <div className="w-full bg-white py-5 dark:bg-gray-900">
          <div className="container mx-auto px-4 lg:px-8 xl:max-w-[1440px]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Search Box - Individual Light Grayish Boundary */}
              <div className="relative flex-1">
                <Icon
                  icon="material-symbols:search"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-500"
                />
                <input
                  type="text"
                  aria-label="Search meeting notes, dates, topics, or keywords"
                  placeholder="Search meeting notes, dates, topics, or keywords..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="meetings-search-input dark:placeholder:text-gray-400 w-full rounded-full border border-black/[0.08] bg-white py-2.5 pl-12 pr-10 text-sm text-gray-900 shadow-sm outline-none transition-all duration-200 placeholder:text-gray-500 hover:border-black/[0.14] hover:shadow focus:border-black/[0.18] focus:bg-white focus:shadow-md focus:outline-none dark:border-white/10 dark:bg-[#25242b] dark:text-white dark:hover:border-white/20 dark:focus:border-white/20 dark:focus:shadow-md"
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear search query"
                    onClick={() => setSearchQuery('')}
                    style={{ border: 'none', outline: 'none' }}
                    className="dark:hover:text-gray-200 absolute right-4 top-1/2 -translate-y-1/2 border-0 text-gray-500 outline-none hover:text-gray-700">
                    <Icon icon="material-symbols:close" className="text-lg" />
                  </button>
                )}
              </div>

              {/* Year Filter Dropdown & Status */}
              <div className="flex flex-wrap items-center gap-4">
                <YearDropdown
                  selectedYear={selectedYear}
                  onSelectYear={setSelectedYear}
                  availableYears={availableYears}
                  countPerYear={countPerYear}
                  totalCount={currentList.length}
                />

                <div className="hidden h-6 w-px bg-black/[0.08] dark:bg-white/10 sm:block" />

                <span className="text-xs font-semibold text-gray-500 dark:text-gray-300">
                  Showing <strong className="text-purple-700 dark:text-purple-300">{filteredMeetings.length}</strong>{' '}
                  meetings
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Workspace: Left List + Right Reader */}
        <div className="container mx-auto mt-8 px-4 lg:px-8 xl:max-w-[1440px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column: Meeting Selection Sidebar */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-20">
                <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <span>Sessions ({filteredMeetings.length})</span>
                  {selectedYear !== 'all' && (
                    <span className="rounded bg-purple-100 px-2 py-0.5 text-purple-900 dark:bg-purple-700 dark:text-white">
                      {selectedYear}
                    </span>
                  )}
                </div>

                <div
                  className="meetings-sessions-container no-scrollbar max-h-[calc(100vh-240px)] space-y-3 overflow-y-auto px-2 py-3"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {filteredMeetings.length === 0 ? (
                    <div className="rounded-md border border-black/[0.06] bg-white p-8 text-center text-sm text-gray-500 shadow-sm dark:border-white/10 dark:bg-[#24232a] dark:text-gray-300">
                      No meetings match your filter.
                    </div>
                  ) : (
                    filteredMeetings.map(meeting => (
                      <SessionCard
                        key={meeting.id}
                        meeting={meeting}
                        isSelected={activeMeeting?.id === meeting.id}
                        onSelect={handleSelectMeeting}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Active Meeting Document & Embedded Video */}
            <div className="lg:col-span-8 xl:col-span-9">
              {activeMeeting ? (
                <div className="rounded-md border border-black/[0.06] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#201f27] md:p-10">
                  {/* Top Header Card */}
                  <div className="mb-6 flex flex-col justify-between gap-4 pb-6 sm:flex-row sm:items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-md bg-purple-700 px-3 py-1.5 text-xs font-bold text-white">
                        <Icon
                          icon={activeMeeting.isCabal ? 'material-symbols:shield' : 'material-symbols:groups'}
                          className="text-sm text-white"
                        />
                        <span>{activeMeeting.isCabal ? 'Podman Cabal Meeting' : 'Podman Community Meeting'}</span>
                      </div>
                      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                        {activeMeeting.date}
                      </h2>
                      <p className="dark:text-gray-400 mt-1 text-sm text-gray-500">{activeMeeting.fullDate}</p>
                    </div>

                    {/* High-Contrast, Elevated Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      {activeMeeting.recordingUrl && (
                        <a
                          href={activeMeeting.recordingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none' }}
                          className="inline-flex items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 py-2 text-sm font-bold text-gray-900 !no-underline shadow-sm transition-all duration-150 hover:border-black/[0.16] hover:bg-gray-50/80 hover:text-gray-900 hover:!no-underline hover:shadow dark:border-white/10 dark:bg-[#282732] dark:text-white dark:hover:border-white/20 dark:hover:bg-[#32313e] dark:hover:text-white">
                          <Icon icon="logos:youtube-icon" className="shrink-0 text-base" />
                          <span>Open in YouTube</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        aria-label="Copy link to this meeting"
                        style={{ outline: 'none', textDecoration: 'none' }}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 py-2 text-sm font-bold text-gray-900 !no-underline shadow-sm transition-all duration-150 hover:border-black/[0.16] hover:bg-gray-50/80 hover:text-gray-900 hover:!no-underline hover:shadow dark:border-white/10 dark:bg-[#282732] dark:text-white dark:hover:border-white/20 dark:hover:bg-[#32313e] dark:hover:text-white">
                        <Icon
                          icon={copiedLink ? 'material-symbols:check-rounded' : 'material-symbols:share-outline'}
                          className={`shrink-0 text-base ${copiedLink ? 'text-green-600 dark:text-green-400' : 'dark:text-gray-200 text-gray-700'}`}
                        />
                        <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Embedded Video Player */}
                  <MeetingVideoPlayer meeting={activeMeeting} />

                  {/* Render Markdown Content with MDX Provider */}
                  <div className="meeting-notes-content max-w-none">
                    {activeMeeting.Component ? (
                      <MDXProvider components={meetingMdxComponents}>
                        <activeMeeting.Component />
                      </MDXProvider>
                    ) : (
                      <p className="text-gray-500">No notes available for this meeting.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="dark:text-gray-400 rounded-2xl border border-dashed border-black/10 p-16 text-center text-gray-500 dark:border-white/10">
                  Select a meeting session from the list to view notes and video recording.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default MeetingsPage;
