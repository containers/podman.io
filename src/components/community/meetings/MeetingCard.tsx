import React from 'react';
import Link from '@docusaurus/Link';
import type { MeetingMeta } from '@site/src/types/meeting';

interface Props {
  meeting: MeetingMeta;
}

/**
 * TYPE_LABELS maps the internal meeting type to a user-facing display label
 * and a set of Tailwind color classes so each type has a visually distinct
 * badge without duplicating the style logic in the parent component.
 */
const TYPE_LABELS: Record<
  MeetingMeta['type'],
  { label: string; className: string }
> = {
  community: {
    label: 'Community Meeting',
    className:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  },
  cabal: {
    label: 'Community Cabal',
    className:
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
};

/**
 * MeetingCard renders a single row in the meeting archive list.
 * It intentionally uses a simple card layout that mirrors the existing
 * CustomCard and ArticleCard visual language used elsewhere on the site.
 */
function MeetingCard({ meeting }: Props): JSX.Element {
  const { slug, isoDate, dateLabel, title, type, recordingUrl } = meeting;
  const badge = TYPE_LABELS[type];
  const detailUrl = `/community/meetings/${slug}`;

  return (
    <article className="flex flex-col gap-3 rounded-lg bg-white p-5 shadow-md transition duration-150 ease-linear hover:shadow-lg dark:bg-gray-800 dark:shadow-none sm:flex-row sm:items-center sm:justify-between">
      {/* Date + type badge column */}
      <div className="flex flex-shrink-0 flex-col gap-1 sm:w-44">
        <time
          dateTime={isoDate}
          className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          {dateLabel}
        </time>
        <span
          className={`w-fit rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}
          aria-label={`Meeting type: ${badge.label}`}>
          {badge.label}
        </span>
      </div>

      {/* Title column */}
      <div className="min-w-0 flex-1">
        <Link
          to={detailUrl}
          className="text-base font-semibold text-gray-800 no-underline hover:text-purple-700 hover:no-underline dark:text-gray-100 dark:hover:text-purple-400">
          {title}
        </Link>
      </div>

      {/* Actions column */}
      <div className="flex flex-shrink-0 flex-wrap gap-2">
        <Link
          to={detailUrl}
          className="rounded-md border border-purple-700 px-3 py-1 text-sm font-medium text-purple-700 no-underline transition duration-150 ease-linear hover:bg-purple-700 hover:text-white hover:no-underline dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-700 dark:hover:text-white">
          Meeting Notes
        </Link>
        {recordingUrl && (
          <a
            href={recordingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-gray-400 px-3 py-1 text-sm font-medium text-gray-700 no-underline transition duration-150 ease-linear hover:border-gray-600 hover:bg-gray-100 hover:no-underline dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-700">
            Watch Recording ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default MeetingCard;
