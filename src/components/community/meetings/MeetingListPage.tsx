import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import MeetingCard from '@site/src/components/community/meetings/MeetingCard';
import type { MeetingMeta } from '@site/src/types/meeting';

interface Props {
  /** Injected by the Docusaurus module system from meetings-list.json */
  meetings: MeetingMeta[];
}

const TYPE_FILTER_OPTIONS: { value: 'all' | MeetingMeta['type']; label: string }[] = [
  { value: 'all', label: 'All Meetings' },
  { value: 'community', label: 'Community Meetings' },
  { value: 'cabal', label: 'Community Cabal' },
];

/**
 * MeetingListPage renders the /community/meetings archive.
 *
 * Meetings are displayed newest-first.  A simple tab/button filter lets
 * visitors narrow the list to one meeting type without requiring a full page
 * reload — the filter is pure client-side state that Docusaurus's SSR pass
 * renders in the default "all" state for correct initial HTML.
 */
function MeetingListPage({ meetings }: Props): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<'all' | MeetingMeta['type']>('all');

  // Sort newest first — isoDate strings sort correctly as plain strings
  const sorted = [...meetings].sort((a, b) => b.isoDate.localeCompare(a.isoDate));

  const filtered =
    activeFilter === 'all'
      ? sorted
      : sorted.filter(m => m.type === activeFilter);

  const pageTitle = 'Community Meetings — Podman';
  const pageDescription =
    'Archive of Podman community meetings and community cabal sessions. ' +
    'Browse notes, recordings, and discussion from every session.';

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <Head>
        <meta name="robots" content="index, follow" />
      </Head>

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-700 dark:from-blue-700 dark:to-purple-900">
        <div className="container py-12 lg:py-16">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-purple-100">
            <Link to="/community" className="text-purple-100 no-underline hover:text-white hover:no-underline">
              Community
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white font-medium">Meetings</span>
          </nav>
          <h1 className="mb-3 text-3xl font-bold text-white lg:text-4xl">
            Podman Community Meetings
          </h1>
          <p className="max-w-2xl text-purple-100">
            Podman community meetings and cabal sessions, archived with notes
            and recordings. Share a direct link to any individual meeting.
          </p>
        </div>
      </header>

      {/* ── Filter bar ───────────────────────────────────────────────────── */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div className="container">
          <nav
            role="tablist"
            aria-label="Filter meetings by type"
            className="flex gap-1 overflow-x-auto">
            {TYPE_FILTER_OPTIONS.map(opt => (
              <button
                key={opt.value}
                role="tab"
                aria-selected={activeFilter === opt.value}
                onClick={() => setActiveFilter(opt.value)}
                className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition duration-150 ease-linear focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                  activeFilter === opt.value
                    ? 'border-purple-700 text-purple-700 dark:border-purple-400 dark:text-purple-400'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}>
                {opt.label}
                {opt.value !== 'all' && (
                  <span className="ml-1.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs tabular-nums text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                    {sorted.filter(m => m.type === opt.value).length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Meeting list ─────────────────────────────────────────────────── */}
      <main className="container py-8 lg:py-12">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No meetings found.
          </p>
        ) : (
          <ol
            className="flex flex-col gap-3"
            aria-label={`${filtered.length} meeting${filtered.length !== 1 ? 's' : ''}`}>
            {filtered.map(meeting => (
              <li key={meeting.slug}>
                <MeetingCard meeting={meeting} />
              </li>
            ))}
          </ol>
        )}
      </main>

      {/* ── Back link ────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
        <div className="container py-6">
          <Link
            to="/community"
            className="text-sm text-purple-700 no-underline hover:underline dark:text-purple-400">
            ← Back to Community
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default MeetingListPage;
