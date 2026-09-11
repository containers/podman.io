import React, { useEffect, useMemo, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import WaveBorder from '@site/src/components/shapes/WaveBorder';
import type { MeetingItem } from '@site/src/utils/communityMeetings';
import { getCabalMeetings, getCommunityMeetings } from '@site/src/utils/communityMeetings';

import { MDXProvider } from '@mdx-js/react';
import TranscriptViewer, {
  ChatLogViewer,
  isTranscriptContent,
  isChatContent,
} from '@site/src/components/content/TranscriptViewer';

function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

const mdxComponents = {
  h1: () => null,
  h2: () => null,
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof children === 'string' ? children : '';
    let icon = 'material-symbols:article-outline';
    if (/attendee/i.test(text)) icon = 'material-symbols:group-outline';
    else if (/note/i.test(text)) icon = 'material-symbols:edit-note-rounded';
    else if (/topic/i.test(text)) icon = 'material-symbols:topic-outline';
    else if (/chat/i.test(text)) icon = 'material-symbols:chat-bubble-outline';
    else if (/next/i.test(text)) icon = 'material-symbols:event-upcoming-outline';

    return (
      <div className="mb-4 mt-8 pb-1">
        <h3
          className="m-0 flex items-center gap-2.5 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          {...props}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-700 text-white shadow-sm shadow-purple-700/25 dark:bg-purple-700 dark:text-white">
            <Icon icon={icon} className="text-lg text-white" />
          </span>
          <span>{children}</span>
        </h3>
      </div>
    );
  },
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="mb-2 mt-6 text-lg font-bold text-gray-900 dark:text-white" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className="text-gray-800 dark:text-gray-200 mb-2 mt-4 text-sm font-bold" {...props}>
      {children}
    </h5>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-3 text-justify text-[15px] leading-relaxed text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isTimestamp = typeof children === 'string' && /^[0-9]{1,2}:[0-9]{2}/.test(children.trim());
    if (isTimestamp) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="dark:text-purple-200 mx-1 inline-flex items-center gap-1 rounded-md bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-900 transition hover:bg-purple-700 hover:text-white hover:no-underline dark:bg-purple-900/60 dark:hover:bg-purple-700"
          {...props}>
          <Icon icon="material-symbols:play-circle-outline-rounded" className="text-sm" />
          <span>{children}</span>
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="dark:text-purple-400 dark:decoration-purple-600 dark:hover:text-purple-200 font-semibold text-purple-700 underline decoration-purple-300 underline-offset-4 transition hover:text-purple-900"
        {...props}>
        {children}
      </a>
    );
  },
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-3 list-disc space-y-1 pl-6 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="my-1.5 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </li>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    function extractText(node: React.ReactNode): string {
      if (typeof node === 'string') return node;
      if (typeof node === 'number') return String(node);
      if (!node) return '';
      if (Array.isArray(node)) return node.map(extractText).join('');
      if (React.isValidElement(node)) {
        return extractText((node.props as { children?: React.ReactNode }).children);
      }
      return '';
    }

    const rawText = extractText(children);

    if (isTranscriptContent(rawText)) {
      return <TranscriptViewer rawText={rawText} />;
    }

    if (isChatContent(rawText)) {
      return <ChatLogViewer rawText={rawText} />;
    }

    return (
      <div className="border-gray-200/80 dark:border-gray-800 relative my-4 overflow-hidden rounded-xl border bg-gray-900 shadow-inner">
        <pre className="max-h-96 overflow-auto p-5 font-mono text-xs leading-relaxed text-gray-100" {...props}>
          {children}
        </pre>
      </div>
    );
  },
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="dark:bg-purple-950/50 rounded-md bg-purple-50 px-1.5 py-0.5 font-mono text-xs font-semibold text-purple-700 dark:text-purple-300"
      {...props}>
      {children}
    </code>
  ),
};

type YearDropdownProps = {
  selectedYear: string;
  onSelectYear: (year: string) => void;
  availableYears: number[];
  countPerYear: Record<string, number>;
  totalCount: number;
};

function YearDropdown({
  selectedYear,
  onSelectYear,
  availableYears,
  countPerYear,
  totalCount,
}: YearDropdownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLabel =
    selectedYear === 'all' ? `All Years (${totalCount})` : `${selectedYear} (${countPerYear[selectedYear] || 0})`;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{ border: 'none', outline: 'none' }}
        className="meetings-year-btn dark:hover:bg-gray-800 ring-gray-200/80 inline-flex items-center justify-between gap-2.5 rounded-md border-0 border-none bg-white px-4 py-2.5 text-sm font-bold text-purple-900 shadow-sm outline-none ring-1 transition hover:bg-purple-50 focus:outline-none dark:bg-gray-900 dark:text-gray-100 dark:ring-gray-700">
        <Icon icon="material-symbols:calendar-month-outline" className="dark:text-purple-400 text-lg text-purple-700" />
        <span>{currentLabel}</span>
        <Icon
          icon="material-symbols:keyboard-arrow-down-rounded"
          className={`text-lg text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-purple-700' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className="no-scrollbar meetings-year-menu absolute right-0 z-50 mt-2 max-h-80 w-56 overflow-y-auto rounded-md bg-white p-2 shadow-2xl ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <button
            type="button"
            onClick={() => {
              onSelectYear('all');
              setIsOpen(false);
            }}
            style={{ border: 'none', outline: 'none' }}
            className={`flex w-full items-center justify-between rounded-md border-0 border-none px-3.5 py-2.5 text-left text-sm font-semibold outline-none transition ${
              selectedYear === 'all'
                ? 'bg-purple-700 font-bold text-white shadow-sm'
                : 'dark:text-gray-200 dark:hover:bg-gray-800 text-gray-700 hover:bg-purple-50 hover:text-purple-900'
            }`}>
            <span>All Years</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                selectedYear === 'all'
                  ? 'bg-white/20 font-bold text-white'
                  : 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
              }`}>
              {totalCount}
            </span>
          </button>
          {availableYears.map(year => (
            <button
              key={year}
              type="button"
              onClick={() => {
                onSelectYear(year.toString());
                setIsOpen(false);
              }}
              style={{ border: 'none', outline: 'none' }}
              className={`flex w-full items-center justify-between rounded-md border-0 border-none px-3.5 py-2.5 text-left text-sm font-semibold outline-none transition ${
                selectedYear === year.toString()
                  ? 'bg-purple-700 font-bold text-white shadow-sm'
                  : 'dark:text-gray-200 dark:hover:bg-gray-800 text-gray-700 hover:bg-purple-50 hover:text-purple-900'
              }`}>
              <span>{year}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  selectedYear === year.toString()
                    ? 'bg-white/20 font-bold text-white'
                    : 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                {countPerYear[year] || 0}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MeetingsPage(): JSX.Element {
  const communityMeetings = useMemo(() => getCommunityMeetings(), []);
  const cabalMeetings = useMemo(() => getCabalMeetings(), []);

  const [activeType, setActiveType] = useState<'community' | 'cabal'>('community');
  const [selectedMeetingId, setSelectedMeetingId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const [videoSeekSeconds, setVideoSeekSeconds] = useState<number | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSeek = (e: Event) => {
      const customEvent = e as CustomEvent<{ seconds: number }>;
      if (typeof customEvent.detail?.seconds === 'number') {
        setVideoSeekSeconds(customEvent.detail.seconds);
        if (videoContainerRef.current) {
          videoContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };
    window.addEventListener('seekMeetingVideo', handleSeek);
    return () => window.removeEventListener('seekMeetingVideo', handleSeek);
  }, []);

  // List of meetings for active category
  const currentList = activeType === 'community' ? communityMeetings : cabalMeetings;

  // Extract unique years and counts
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

  // Filter meetings based on search & year
  const filteredMeetings = useMemo(() => {
    return currentList.filter(m => {
      if (selectedYear !== 'all' && m.year.toString() !== selectedYear) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesDate = m.date.toLowerCase().includes(q) || m.id.includes(q);
        const matchesDay = m.day.toLowerCase().includes(q);
        const matchesTitle = m.title.toLowerCase().includes(q);
        if (!matchesDate && !matchesDay && !matchesTitle) {
          return false;
        }
      }
      return true;
    });
  }, [currentList, selectedYear, searchQuery]);

  // Read URL query params on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get('date');
    const typeParam = params.get('type');

    if (typeParam === 'cabal') {
      setActiveType('cabal');
    } else if (typeParam === 'community') {
      setActiveType('community');
    }

    if (dateParam) {
      setSelectedMeetingId(dateParam);
    }
  }, []);

  // Update selected meeting if not set or out of bounds
  useEffect(() => {
    if (filteredMeetings.length > 0) {
      const exists = filteredMeetings.some(m => m.id === selectedMeetingId);
      if (!exists) {
        setSelectedMeetingId(filteredMeetings[0].id);
      }
    }
  }, [filteredMeetings, selectedMeetingId]);

  // Active meeting object
  const activeMeeting: MeetingItem | undefined = useMemo(() => {
    return currentList.find(m => m.id === selectedMeetingId) || filteredMeetings[0];
  }, [currentList, selectedMeetingId, filteredMeetings]);

  const youtubeId = useMemo(() => {
    return extractYouTubeId(activeMeeting?.recordingUrl);
  }, [activeMeeting]);

  // Select meeting handler & sync to URL
  const handleSelectMeeting = (meeting: MeetingItem) => {
    setSelectedMeetingId(meeting.id);
    setVideoSeekSeconds(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('date', meeting.id);
      url.searchParams.set('type', activeType);
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Copy link handler
  const handleCopyLink = () => {
    if (typeof window === 'undefined' || !activeMeeting) return;
    const url = new URL(window.location.href);
    url.searchParams.set('date', activeMeeting.id);
    url.searchParams.set('type', activeType);
    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <Layout
      title="Podman Community Meeting Notes & Minutes"
      description="Browse notes, agendas, summaries, and embedded video recordings for Podman Community and Cabal meetings.">
      <main className="min-h-screen bg-gray-50 pb-20 dark:bg-gray-900">
        {/* Hero Section matching the Podman landing page gradient & wave */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-700 pb-16 pt-10 dark:from-blue-700 dark:to-purple-900 md:pb-24 md:pt-14">
          <div className="container mx-auto px-4 lg:px-8 xl:max-w-[1440px]">
            {/* Back link */}
            <div className="mb-6">
              <Link
                to="/community"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white hover:no-underline">
                <Icon icon="material-symbols:arrow-back-rounded" className="text-lg" />
                <span>Back to Community</span>
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
              <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                  Select Meeting Type
                </span>
                <div className="inline-flex rounded-2xl border border-white/25 bg-black/20 p-1.5 backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveType('community');
                      setSelectedYear('all');
                    }}
                    className={`flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-bold transition duration-150 ${
                      activeType === 'community'
                        ? 'bg-white text-purple-900 shadow-lg hover:text-purple-900'
                        : 'text-white hover:bg-white/10 hover:text-white'
                    }`}>
                    <Icon icon="material-symbols:groups" className="text-xl" />
                    <span>Community</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        activeType === 'community' ? 'bg-purple-100 text-purple-900' : 'bg-white/20 text-white'
                      }`}>
                      {communityMeetings.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveType('cabal');
                      setSelectedYear('all');
                    }}
                    className={`flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-bold transition duration-150 ${
                      activeType === 'cabal'
                        ? 'bg-white text-purple-900 shadow-lg hover:text-purple-900'
                        : 'text-white hover:bg-white/10 hover:text-white'
                    }`}>
                    <Icon icon="material-symbols:shield" className="text-xl" />
                    <span>Cabal</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        activeType === 'cabal' ? 'bg-purple-100 text-purple-900' : 'bg-white/20 text-white'
                      }`}>
                      {cabalMeetings.length}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <WaveBorder
            className="pointer-events-none absolute bottom-0 left-0 z-10 h-8 w-full sm:h-12 md:h-14 lg:h-16"
            preserveAspectRatio="none"
          />
        </section>

        {/* Controls Bar: Search & Year Dropdown */}
        <div className="container relative z-20 mx-auto -mt-6 px-4 lg:px-8 xl:max-w-[1440px]">
          <div className="shadow-purple-950/5 flex flex-col gap-4 rounded-md bg-white p-4 shadow-xl dark:bg-gray-900 md:flex-row md:items-center md:justify-between">
            {/* Search Box */}
            <div className="relative flex-1">
              <Icon
                icon="material-symbols:search"
                className="text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xl"
              />
              <input
                type="text"
                placeholder="Search meeting notes, dates, topics, or keywords..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ border: 'none', outline: 'none' }}
                className="meetings-search-input ring-gray-200/80 w-full rounded-md border-0 border-none bg-white py-2.5 pl-11 pr-10 text-sm text-gray-900 shadow-sm outline-none ring-1 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-700 dark:bg-gray-900 dark:text-white dark:ring-gray-700 dark:focus:ring-purple-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{ border: 'none', outline: 'none' }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 absolute right-3.5 top-1/2 -translate-y-1/2 border-0 border-none outline-none">
                  <Icon icon="material-symbols:close" className="text-lg" />
                </button>
              )}
            </div>

            {/* Custom Year Filter Dropdown & Status */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-xs font-bold uppercase tracking-wider dark:text-gray-300">
                  Year:
                </span>
                <YearDropdown
                  selectedYear={selectedYear}
                  onSelectYear={setSelectedYear}
                  availableYears={availableYears}
                  countPerYear={countPerYear}
                  totalCount={currentList.length}
                />
              </div>

              <div className="bg-gray-200/60 hidden h-6 w-px dark:bg-gray-700/60 sm:block" />

              <span className="dark:text-gray-400 text-xs font-semibold text-gray-500">
                Showing <strong className="dark:text-purple-400 text-purple-700">{filteredMeetings.length}</strong>{' '}
                meetings
              </span>
            </div>
          </div>
        </div>

        {/* Main Workspace: Left List + Right Reader */}
        <div className="container mx-auto mt-8 px-4 lg:px-8 xl:max-w-[1440px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column: Meeting Selection Sidebar */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-20">
                <div className="dark:text-gray-400 mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
                  <span>Sessions ({filteredMeetings.length})</span>
                  {selectedYear !== 'all' && (
                    <span className="text-purple-800 dark:text-purple-200 rounded bg-purple-100 px-2 py-0.5 dark:bg-purple-900/60">
                      {selectedYear}
                    </span>
                  )}
                </div>

                <style>{`
                  .meetings-sessions-container::-webkit-scrollbar {
                    display: none !important;
                    width: 0 !important;
                    height: 0 !important;
                  }
                  .meetings-sessions-container {
                    -ms-overflow-style: none !important;
                    scrollbar-width: none !important;
                  }
                `}</style>

                <div
                  className="meetings-sessions-container no-scrollbar max-h-[calc(100vh-240px)] space-y-3 overflow-y-auto px-2 py-3"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {filteredMeetings.length === 0 ? (
                    <div className="dark:text-gray-400 rounded-md bg-white p-8 text-center text-sm text-gray-500 shadow-sm dark:bg-gray-900">
                      No meetings match your filter.
                    </div>
                  ) : (
                    filteredMeetings.map(meeting => {
                      const isSelected = activeMeeting?.id === meeting.id;
                      const hasRecording = Boolean(meeting.recordingUrl);

                      return (
                        <div
                          key={meeting.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => handleSelectMeeting(meeting)}
                          onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleSelectMeeting(meeting);
                            }
                          }}
                          style={{ outline: 'none' }}
                          className={`group w-full cursor-pointer select-none rounded-md p-4 text-left outline-none transition-all duration-150 focus:outline-none focus:ring-0 focus-visible:outline-none ${
                            isSelected
                              ? 'bg-purple-700 text-white shadow-lg shadow-purple-700/30'
                              : 'shadow-purple-950/5 bg-white text-gray-900 shadow-md hover:-translate-y-0.5 hover:shadow-xl dark:bg-gray-900 dark:text-white'
                          }`}>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div
                                className={`text-base font-bold transition ${
                                  isSelected
                                    ? 'text-white'
                                    : 'text-gray-900 group-hover:text-purple-700 dark:text-white dark:group-hover:text-purple-300'
                                }`}>
                                {meeting.date}
                              </div>
                              <div
                                className={`mt-0.5 text-xs font-medium ${
                                  isSelected ? 'text-purple-100' : 'dark:text-gray-400 text-gray-500'
                                }`}>
                                {meeting.day}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {hasRecording && (
                                <span
                                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                                    isSelected
                                      ? 'bg-white/20 text-white'
                                      : 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300'
                                  }`}>
                                  <Icon icon="logos:youtube-icon" className="text-xs" />
                                  <span>Video</span>
                                </span>
                              )}
                              {isSelected && (
                                <Icon icon="material-symbols:chevron-right-rounded" className="text-lg text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Active Meeting Document & Embedded Video */}
            <div className="lg:col-span-8 xl:col-span-9">
              {activeMeeting ? (
                <div className="shadow-purple-950/5 rounded-md bg-white p-6 shadow-2xl dark:bg-gray-900 md:p-10">
                  {/* Top Header Card */}
                  <div className="mb-6 flex flex-col justify-between gap-4 pb-6 sm:flex-row sm:items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-md bg-purple-700 px-3 py-1.5 text-xs font-bold text-white shadow-sm shadow-purple-700/25 dark:bg-purple-700 dark:text-white">
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

                    {/* Quick Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      {activeMeeting.recordingUrl && (
                        <a
                          href={activeMeeting.recordingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-red-600 hover:bg-red-700 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:text-white hover:no-underline">
                          <Icon icon="logos:youtube-icon" className="text-base" />
                          <span>Open in YouTube</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="dark:bg-purple-950/60 inline-flex items-center gap-2 rounded-xl bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700 shadow-sm transition hover:bg-purple-700 hover:text-white dark:text-purple-300 dark:hover:bg-purple-700 dark:hover:text-white">
                        <Icon
                          icon={copiedLink ? 'material-symbols:check-rounded' : 'material-symbols:content-copy-outline'}
                          className={`text-lg ${copiedLink ? 'text-green-600' : ''}`}
                        />
                        <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                      </button>
                    </div>
                  </div>

                  {/* EMBEDDED YOUTUBE VIDEO SECTION */}
                  {youtubeId ? (
                    <div className="mb-8" ref={videoContainerRef}>
                      <div className="shadow-purple-950/15 relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-xl">
                        <iframe
                          key={`${youtubeId}-${videoSeekSeconds ?? 'init'}`}
                          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0${
                            videoSeekSeconds !== null ? `&start=${videoSeekSeconds}&autoplay=1` : ''
                          }`}
                          title="Podman Meeting Recording"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="h-full w-full border-0"
                        />
                      </div>
                      <p className="dark:text-gray-400 mt-2 text-center text-xs font-medium text-gray-500">
                        ▶ You can listen to or watch the recorded session above, or click any timestamp in the notes or
                        transcript to jump directly to that part.
                      </p>
                    </div>
                  ) : activeMeeting.recordingUrl ? (
                    <div className="border-blue-200 dark:bg-blue-950/30 mb-8 flex items-center justify-between rounded-xl border bg-blue-50/70 p-4 dark:border-blue-900/50">
                      <div className="flex items-center gap-3">
                        <Icon
                          icon="material-symbols:video-camera-front-rounded"
                          className="text-blue-600 dark:text-blue-400 text-2xl"
                        />
                        <div>
                          <div className="dark:text-blue-200 font-semibold text-blue-900">
                            External Recording Available
                          </div>
                          <div className="text-xs text-blue-700 dark:text-blue-300">
                            Recorded on video meeting platform
                          </div>
                        </div>
                      </div>
                      <a
                        href={activeMeeting.recordingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 hover:text-white hover:no-underline">
                        <span>Watch Recording</span>
                        <Icon icon="material-symbols:open-in-new" />
                      </a>
                    </div>
                  ) : null}

                  {/* Render Markdown Content with Clean Typography */}
                  <div className="meeting-notes-content max-w-none">
                    {activeMeeting.Component ? (
                      <MDXProvider components={mdxComponents}>
                        <activeMeeting.Component />
                      </MDXProvider>
                    ) : (
                      <p className="text-gray-500">No notes available for this meeting.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="dark:text-gray-400 rounded-2xl border border-dashed border-gray-300 p-16 text-center text-gray-500 dark:border-gray-700">
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
