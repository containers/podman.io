import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import { Icon } from '@iconify/react';

interface MeetingEntry {
  date: string;
  title: string;
  type: 'community' | 'cabal';
  recording: string;
  slug: string;
}

const meetingEntries: MeetingEntry[] = [
  { date: '2026-08-04', title: 'Podman Community Meeting - Aug 4, 2026', type: 'community', recording: 'https://youtu.be/W3cWHSrQnEQ', slug: '2026-08-04' },
  { date: '2026-06-02', title: 'Podman Community Meeting - Jun 2, 2026', type: 'community', recording: 'https://www.youtube.com/watch?v=d0XEeePqzag', slug: '2026-06-02' },
  { date: '2026-05-05', title: 'Podman Community Cabal - May 5, 2026', type: 'cabal', recording: '', slug: '2026-05-05' },
  { date: '2026-04-07', title: 'Podman Community Meeting - Apr 7, 2026', type: 'community', recording: '', slug: '2026-04-07' },
  { date: '2026-03-03', title: 'Podman Community Cabal - Mar 3, 2026', type: 'cabal', recording: '', slug: '2026-03-03' },
  { date: '2026-02-03', title: 'Podman Community Meeting - Feb 3, 2026', type: 'community', recording: '', slug: '2026-02-03' },
  { date: '2025-12-02', title: 'Podman Community Meeting - Dec 2, 2025', type: 'community', recording: '', slug: '2025-12-02' },
  { date: '2025-11-04', title: 'Podman Community Cabal - Nov 4, 2025', type: 'cabal', recording: '', slug: '2025-11-04' },
  { date: '2025-10-07', title: 'Podman Community Meeting - Oct 7, 2025', type: 'community', recording: '', slug: '2025-10-07' },
  { date: '2025-09-02', title: 'Podman Community Cabal - Sep 2, 2025', type: 'cabal', recording: '', slug: '2025-09-02' },
  { date: '2025-08-05', title: 'Podman Community Meeting - Aug 5, 2025', type: 'community', recording: '', slug: '2025-08-05' },
  { date: '2025-07-01', title: 'Podman Community Cabal - Jul 1, 2025', type: 'cabal', recording: '', slug: '2025-07-01' },
  { date: '2025-06-03', title: 'Podman Community Meeting - Jun 3, 2025', type: 'community', recording: '', slug: '2025-06-03' },
  { date: '2025-05-06', title: 'Podman Community Cabal - May 6, 2025', type: 'cabal', recording: '', slug: '2025-05-06' },
  { date: '2025-04-01', title: 'Podman Community Meeting - Apr 1, 2025', type: 'community', recording: '', slug: '2025-04-01' },
  { date: '2025-03-04', title: 'Podman Community Cabal - Mar 4, 2025', type: 'cabal', recording: '', slug: '2025-03-04' },
  { date: '2025-02-04', title: 'Podman Community Meeting - Feb 4, 2025', type: 'community', recording: '', slug: '2025-02-04' },
  { date: '2024-11-05', title: 'Podman Community Cabal - Nov 5, 2024', type: 'cabal', recording: '', slug: '2024-11-05' },
  { date: '2024-10-01', title: 'Podman Community Meeting - Oct 1, 2024', type: 'community', recording: '', slug: '2024-10-01' },
  { date: '2024-09-03', title: 'Podman Community Cabal - Sep 3, 2024', type: 'cabal', recording: '', slug: '2024-09-03' },
  { date: '2024-08-06', title: 'Podman Community Meeting - Aug 6, 2024', type: 'community', recording: '', slug: '2024-08-06' },
  { date: '2024-07-02', title: 'Podman Community Cabal - Jul 2, 2024', type: 'cabal', recording: '', slug: '2024-07-02' },
  { date: '2024-06-04', title: 'Podman Community Meeting - Jun 4, 2024', type: 'community', recording: '', slug: '2024-06-04' },
  { date: '2024-05-21', title: 'Podman Community Cabal - May 21, 2024', type: 'cabal', recording: '', slug: '2024-05-21' },
  { date: '2024-04-16', title: 'Podman Community Cabal - Apr 16, 2024', type: 'cabal', recording: '', slug: '2024-04-16' },
  { date: '2024-04-02', title: 'Podman Community Meeting - Apr 2, 2024', type: 'community', recording: '', slug: '2024-04-02' },
  { date: '2024-03-19', title: 'Podman Community Cabal - Mar 19, 2024', type: 'cabal', recording: '', slug: '2024-03-19' },
  { date: '2024-02-20', title: 'Podman Community Cabal - Feb 20, 2024', type: 'cabal', recording: '', slug: '2024-02-20' },
  { date: '2024-02-06', title: 'Podman Community Meeting - Feb 6, 2024', type: 'community', recording: '', slug: '2024-02-06' },
  { date: '2024-01-16', title: 'Podman Community Cabal - Jan 16, 2024', type: 'cabal', recording: '', slug: '2024-01-16' },
  { date: '2023-12-12', title: 'Podman Community Cabal - Dec 12, 2023', type: 'cabal', recording: '', slug: '2023-12-12' },
  { date: '2023-10-19', title: 'Podman Community Cabal - Oct 19, 2023', type: 'cabal', recording: '', slug: '2023-10-19' },
  { date: '2023-10-03', title: 'Podman Community Meeting - Oct 3, 2023', type: 'community', recording: '', slug: '2023-10-03' },
  { date: '2023-09-21', title: 'Podman Community Cabal - Sep 21, 2023', type: 'cabal', recording: '', slug: '2023-09-21' },
  { date: '2023-07-20', title: 'Podman Community Cabal - Jul 20, 2023', type: 'cabal', recording: '', slug: '2023-07-20' },
  { date: '2023-06-15', title: 'Podman Community Cabal - Jun 15, 2023', type: 'cabal', recording: '', slug: '2023-06-15' },
  { date: '2023-06-06', title: 'Podman Community Meeting - Jun 6, 2023', type: 'community', recording: '', slug: '2023-06-06' },
  { date: '2023-05-18', title: 'Podman Community Cabal - May 18, 2023', type: 'cabal', recording: '', slug: '2023-05-18' },
  { date: '2023-04-20', title: 'Podman Community Cabal - Apr 20, 2023', type: 'cabal', recording: '', slug: '2023-04-20' },
  { date: '2023-04-04', title: 'Podman Community Meeting - Apr 4, 2023', type: 'community', recording: '', slug: '2023-04-04' },
  { date: '2023-03-16', title: 'Podman Community Cabal - Mar 16, 2023', type: 'cabal', recording: '', slug: '2023-03-16' },
  { date: '2023-02-16', title: 'Podman Community Cabal - Feb 16, 2023', type: 'cabal', recording: '', slug: '2023-02-16' },
  { date: '2023-02-07', title: 'Podman Community Meeting - Feb 7, 2023', type: 'community', recording: '', slug: '2023-02-07' },
  { date: '2023-01-19', title: 'Podman Community Cabal - Jan 19, 2023', type: 'cabal', recording: '', slug: '2023-01-19' },
  { date: '2022-12-06', title: 'Podman Community Meeting - Dec 6, 2022', type: 'community', recording: '', slug: '2022-12-06' },
  { date: '2022-11-17', title: 'Podman Community Cabal - Nov 17, 2022', type: 'cabal', recording: '', slug: '2022-11-17' },
  { date: '2022-10-04', title: 'Podman Community Meeting - Oct 4, 2022', type: 'community', recording: '', slug: '2022-10-04' },
  { date: '2022-09-15', title: 'Podman Community Cabal - Sep 15, 2022', type: 'cabal', recording: '', slug: '2022-09-15' },
  { date: '2022-08-02', title: 'Podman Community Meeting - Aug 2, 2022', type: 'community', recording: '', slug: '2022-08-02' },
  { date: '2022-07-21', title: 'Podman Community Cabal - Jul 21, 2022', type: 'cabal', recording: '', slug: '2022-07-21' },
  { date: '2022-06-07', title: 'Podman Community Meeting - Jun 7, 2022', type: 'community', recording: '', slug: '2022-06-07' },
  { date: '2022-05-19', title: 'Podman Community Cabal - May 19, 2022', type: 'cabal', recording: '', slug: '2022-05-19' },
  { date: '2022-04-21', title: 'Podman Community Cabal - Apr 21, 2022', type: 'cabal', recording: '', slug: '2022-04-21' },
  { date: '2022-04-05', title: 'Podman Community Meeting - Apr 5, 2022', type: 'community', recording: '', slug: '2022-04-05' },
  { date: '2022-03-17', title: 'Podman Community Cabal - Mar 17, 2022', type: 'cabal', recording: '', slug: '2022-03-17' },
  { date: '2022-02-17', title: 'Podman Community Cabal - Feb 17, 2022', type: 'cabal', recording: '', slug: '2022-02-17' },
  { date: '2022-02-01', title: 'Podman Community Meeting - Feb 1, 2022', type: 'community', recording: '', slug: '2022-02-01' },
  { date: '2022-01-20', title: 'Podman Community Cabal - Jan 20, 2022', type: 'cabal', recording: '', slug: '2022-01-20' },
  { date: '2021-12-16', title: 'Podman Community Cabal - Dec 16, 2021', type: 'cabal', recording: '', slug: '2021-12-16' },
  { date: '2021-12-07', title: 'Podman Community Meeting - Dec 7, 2021', type: 'community', recording: '', slug: '2021-12-07' },
  { date: '2021-11-18', title: 'Podman Community Cabal - Nov 18, 2021', type: 'cabal', recording: '', slug: '2021-11-18' },
  { date: '2021-11-02', title: 'Podman Community Meeting - Nov 2, 2021', type: 'community', recording: '', slug: '2021-11-02' },
  { date: '2021-10-21', title: 'Podman Community Cabal - Oct 21, 2021', type: 'cabal', recording: '', slug: '2021-10-21' },
  { date: '2021-10-05', title: 'Podman Community Meeting - Oct 5, 2021', type: 'community', recording: '', slug: '2021-10-05' },
  { date: '2021-09-16', title: 'Podman Community Cabal - Sep 16, 2021', type: 'cabal', recording: '', slug: '2021-09-16' },
  { date: '2021-09-07', title: 'Podman Community Meeting - Sep 7, 2021', type: 'community', recording: '', slug: '2021-09-07' },
  { date: '2021-08-19', title: 'Podman Community Cabal - Aug 19, 2021', type: 'cabal', recording: '', slug: '2021-08-19' },
  { date: '2021-08-03', title: 'Podman Community Meeting - Aug 3, 2021', type: 'community', recording: '', slug: '2021-08-03' },
  { date: '2021-07-15', title: 'Podman Community Cabal - Jul 15, 2021', type: 'cabal', recording: '', slug: '2021-07-15' },
  { date: '2021-06-01', title: 'Podman Community Meeting - Jun 1, 2021', type: 'community', recording: '', slug: '2021-06-01' },
  { date: '2021-05-04', title: 'Podman Community Meeting - May 4, 2021', type: 'community', recording: '', slug: '2021-05-04' },
  { date: '2021-04-06', title: 'Podman Community Meeting - Apr 6, 2021', type: 'community', recording: '', slug: '2021-04-06' },
  { date: '2021-03-02', title: 'Podman Community Meeting - Mar 2, 2021', type: 'community', recording: '', slug: '2021-03-02' },
  { date: '2021-02-02', title: 'Podman Community Meeting - Feb 2, 2021', type: 'community', recording: '', slug: '2021-02-02' },
  { date: '2020-12-01', title: 'Podman Community Meeting - Dec 1, 2020', type: 'community', recording: '', slug: '2020-12-01' },
  { date: '2020-11-03', title: 'Podman Community Meeting - Nov 3, 2020', type: 'community', recording: '', slug: '2020-11-03' },
  { date: '2020-10-06', title: 'Podman Community Meeting - Oct 6, 2020', type: 'community', recording: '', slug: '2020-10-06' },
];

type FilterType = 'all' | 'community' | 'cabal';

function MeetingCard({ meeting }: { meeting: MeetingEntry }) {
  const isCabal = meeting.type === 'cabal';
  const badgeClasses = isCabal
    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
  const badgeLabel = isCabal ? 'Cabal' : 'Community Meeting';

  return (
    <article className="flex flex-col rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800">
      <div className="mb-3 flex items-center justify-between">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClasses}`}>
          {badgeLabel}
        </span>
        <time className="text-sm text-gray-500 dark:text-gray-400">{meeting.date}</time>
      </div>
      <h3 className="mb-4 text-lg font-bold">{meeting.title}</h3>
      <div className="mt-auto flex flex-wrap gap-3">
        <a
          href={`/meetings/${meeting.slug}`}
          className="inline-flex items-center gap-2 rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold !text-white transition-colors hover:bg-purple-900 hover:no-underline"
        >
          <Icon icon="mdi:file-document-outline" className="text-lg" />
          View Notes
        </a>
        {meeting.recording && (
          <a
            href={meeting.recording}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-purple-700 px-4 py-2 text-sm font-semibold !text-purple-700 transition-colors hover:bg-purple-50 hover:no-underline dark:border-purple-300 dark:!text-purple-300 dark:hover:bg-purple-900/30"
          >
            <Icon icon="mdi:youtube" className="text-lg" />
            Watch Recording
          </a>
        )}
      </div>
    </article>
  );
}

export default function MeetingsPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredMeetings = useMemo(() => {
    if (filter === 'all') return meetingEntries;
    return meetingEntries.filter((m) => m.type === filter);
  }, [filter]);

  const filterButtons: { label: string; value: FilterType; icon: string }[] = [
    { label: 'All Meetings', value: 'all', icon: 'mdi:calendar-multiple' },
    { label: 'Community Meetings', value: 'community', icon: 'mdi:account-group' },
    { label: 'Cabal Meetings', value: 'cabal', icon: 'mdi:head-cog' },
  ];

  return (
    <Layout title="Meeting Notes" description="Browse all Podman community meeting notes with shareable links">
      <header className="bg-gradient-to-r from-purple-700 to-blue-500 py-16 dark:from-purple-900 dark:to-blue-700">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-extrabold !text-white sm:text-5xl lg:text-6xl">
            Meeting Notes
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-purple-100">
            Browse notes from all Podman Community Meetings and Cabal sessions. Each meeting has its own shareable link.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                filter === btn.value
                  ? 'bg-purple-700 !text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Icon icon={btn.icon} className="text-lg" />
              {btn.label}
            </button>
          ))}
        </div>

        <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredMeetings.length} meeting{filteredMeetings.length !== 1 ? 's' : ''}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMeetings.map((meeting) => (
            <MeetingCard key={meeting.slug} meeting={meeting} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
