import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import MeetingMarkdown from '@site/src/components/community/meetings/MeetingMarkdown';
import type { Meeting } from '@site/src/types/meeting';

interface Props {
  /** Injected by the Docusaurus module system from meeting-YYYY-MM-DD.json */
  meeting: Meeting;
}

/** Display labels and badge colours for each meeting type. */
const TYPE_DISPLAY: Record<Meeting['type'], { label: string; className: string }> = {
  community: {
    label: 'Podman Community Meeting',
    className:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  },
  cabal: {
    label: 'Podman Community Cabal',
    className:
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
};

/**
 * MeetingDetailPage renders the dedicated page for a single community meeting.
 *
 * Route: /community/meetings/:slug
 * Props are injected by the Docusaurus module system (meetings-plugin → addRoute).
 *
 * Accessibility notes:
 *   - Single <h1> containing the meeting title for correct heading hierarchy
 *   - <time> element with machine-readable dateTime attribute
 *   - External recording link opens in a new tab with rel="noopener noreferrer"
 *     and a visible indicator (" ↗") so keyboard/screen-reader users know
 *   - Prev/Next nav uses <nav aria-label> to identify the landmark
 *   - Focus-visible ring on interactive elements for keyboard users
 *
 * SEO notes:
 *   - <Layout title> sets the <title> tag
 *   - <Head> provides meta description
 *   - MeetingMarkdown renders content into static HTML (no BrowserOnly wrapper)
 */
function MeetingDetailPage({ meeting }: Props): JSX.Element {
  const {
    slug,
    isoDate,
    dateLabel,
    title,
    type,
    recordingUrl,
    rawContent,
    prevSlug,
    prevDateLabel,
    nextSlug,
    nextDateLabel,
  } = meeting;

  const badge = TYPE_DISPLAY[type];

  // Construct a concise meta description from the first non-empty,
  // non-heading line of the raw content.
  const metaDescription = (() => {
    const firstLine = rawContent
      .split('\n')
      .map(l => l.trim())
      .find(l => l.length > 20 && !l.startsWith('#'));
    const excerpt = firstLine ? firstLine.replace(/[*_`]/g, '').slice(0, 155) : '';
    return excerpt
      ? `${dateLabel} — ${excerpt}`
      : `${badge.label} notes for ${dateLabel}.`;
  })();

  return (
    <Layout title={`${title} — ${dateLabel}`} description={metaDescription}>
      <Head>
        <meta name="robots" content="index, follow" />
        {/* Canonical URL prevents any duplicate-content issues */}
        <link rel="canonical" href={`https://podman.io/community/meetings/${slug}`} />
      </Head>

      {/* ── Gradient header bar (matches site's PageHeader pattern) ─────── */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-700 dark:from-blue-700 dark:to-purple-900">
        <div className="container py-10 lg:py-14">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-purple-100">
            <Link
              to="/community"
              className="text-purple-100 no-underline hover:text-white hover:no-underline">
              Community
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link
              to="/community/meetings"
              className="text-purple-100 no-underline hover:text-white hover:no-underline">
              Meetings
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white font-medium">{dateLabel}</span>
          </nav>

          {/* Type badge */}
          <span
            className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${badge.className}`}>
            {badge.label}
          </span>

          {/* Title */}
          <h1 className="mb-2 text-2xl font-bold text-white lg:text-3xl">
            {title}
          </h1>

          {/* Date */}
          <p className="text-purple-100">
            <time dateTime={isoDate}>{dateLabel}</time>
          </p>
        </div>
      </div>

      {/* ── Action bar ───────────────────────────────────────────────────── */}
      {recordingUrl && (
        <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <div className="container flex items-center gap-4 py-4">
            <a
              href={recordingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-purple-700 px-4 py-2 text-sm font-semibold text-white no-underline transition duration-150 ease-linear hover:bg-purple-900 hover:no-underline focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:bg-purple-800 dark:hover:bg-purple-700">
              {/* Film icon via inline SVG — avoids a new icon dependency */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true">
                <path d="M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v12h14V6H5Zm1 1h2v2H6V7Zm4 0h2v2h-2V7Zm4 0h2v2h-2V7Zm0 4h2v2h-2v-2Zm-4 0h2v2h-2v-2Zm-4 0h2v2H6v-2Zm0 4h2v2H6v-2Zm4 0h2v2h-2v-2Zm4 0h2v2h-2v-2Z" />
              </svg>
              Watch Recording ↗
            </a>
          </div>
        </div>
      )}

      {/* ── Meeting content ───────────────────────────────────────────────── */}
      <main className="container py-8 lg:py-12">
        <article className="mx-auto max-w-4xl">
          <MeetingMarkdown content={rawContent} />
        </article>
      </main>

      {/* ── Previous / Next navigation ────────────────────────────────────── */}
      <nav
        aria-label="Meeting navigation"
        className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
        <div className="container flex flex-col gap-4 py-6 sm:flex-row sm:justify-between">
          {/* Previous (earlier in time) */}
          <div>
            {prevSlug ? (
              <Link
                to={`/community/meetings/${prevSlug}`}
                className="flex flex-col no-underline hover:no-underline">
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  ← Previous meeting
                </span>
                <span className="mt-1 font-medium text-purple-700 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300">
                  {prevDateLabel}
                </span>
              </Link>
            ) : (
              <span className="text-sm text-gray-400 dark:text-gray-600">
                ← No earlier meetings
              </span>
            )}
          </div>

          {/* Archive link (centred on desktop) */}
          <Link
            to="/community/meetings"
            className="self-center text-sm text-purple-700 no-underline hover:underline dark:text-purple-400">
            All Meetings
          </Link>

          {/* Next (later in time) */}
          <div className="text-right">
            {nextSlug ? (
              <Link
                to={`/community/meetings/${nextSlug}`}
                className="flex flex-col items-end no-underline hover:no-underline">
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Next meeting →
                </span>
                <span className="mt-1 font-medium text-purple-700 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300">
                  {nextDateLabel}
                </span>
              </Link>
            ) : (
              <span className="text-sm text-gray-400 dark:text-gray-600">
                No later meetings →
              </span>
            )}
          </div>
        </div>
      </nav>
    </Layout>
  );
}

export default MeetingDetailPage;
