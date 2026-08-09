import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import Link from '@docusaurus/Link';
import CustomCard from '@site/src/components/ui/CustomCard';
import type { MeetingMeta } from '@site/src/types/meeting';

// ── Types ──────────────────────────────────────────────────────────────────

/**
 * Shape of each card in the `communityMeetings.cards` data array defined in
 * static/data/community.ts.  These top-level cards describe the meeting
 * schedule and provide "Join Meeting" + "Meeting Agenda" links.
 */
type ScheduleCardProps = {
  title: string;
  subtitle: string;
  date: string;
  timeZone: string;
  buttons: Array<{ text: string; path: string }>;
};

// ── Helper ─────────────────────────────────────────────────────────────────

/**
 * Returns the two most recent meetings of the given type, sorted newest first.
 * If fewer than two meetings of that type exist the returned array will be
 * shorter — callers must guard against undefined entries.
 */
function recentMeetingsOfType(
  all: MeetingMeta[],
  type: MeetingMeta['type'],
): MeetingMeta[] {
  return [...all]
    .filter(m => m.type === type)
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate))
    .slice(0, 2);
}

// ── Sub-components ─────────────────────────────────────────────────────────

/**
 * RecentMeetingRow renders a single row in the "Most recent meetings" section.
 * Each row shows the date, a link to the meeting notes page, and a recording
 * link when one is available.
 */
function RecentMeetingRow({ meeting }: { meeting: MeetingMeta }): JSX.Element {
  const { slug, dateLabel, recordingUrl } = meeting;
  return (
    <li className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 py-2 last:border-0 dark:border-gray-700">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {dateLabel}
      </span>
      <div className="flex gap-2">
        <Link
          to={`/community/meetings/${slug}`}
          className="rounded border border-purple-600 px-2 py-0.5 text-xs font-medium text-purple-700 no-underline transition duration-150 ease-linear hover:bg-purple-700 hover:text-white hover:no-underline dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-700 dark:hover:text-white">
          Meeting Notes
        </Link>
        {recordingUrl && (
          <a
            href={recordingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-gray-400 px-2 py-0.5 text-xs font-medium text-gray-600 no-underline transition duration-150 ease-linear hover:bg-gray-100 hover:no-underline dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-700">
            Recording ↗
          </a>
        )}
      </div>
    </li>
  );
}

/**
 * RecentMeetingsList renders the two most recent meetings of a given type
 * below their corresponding schedule card, plus a link to the full archive.
 */
function RecentMeetingsList({
  meetings,
}: {
  meetings: MeetingMeta[];
}): JSX.Element {
  if (meetings.length === 0) {
    return (
      <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        No meeting records yet.
      </p>
    );
  }

  return (
    <div className="mt-4 w-full max-w-sm rounded-lg bg-white px-4 pb-2 pt-3 shadow-md dark:bg-gray-700">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Most recent meetings
      </p>
      <ul>
        {meetings.map(m => (
          <RecentMeetingRow key={m.slug} meeting={m} />
        ))}
      </ul>
      <Link
        to="/community/meetings"
        className="mt-3 block text-center text-xs font-medium text-purple-700 no-underline hover:underline dark:text-purple-400">
        View all meeting notes →
      </Link>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

/**
 * CommunityMeetingsCardGrid renders the "Podman Community Meetings" section
 * on /community.
 *
 * Layout:
 *   For each meeting type (Community Meeting, Cabal) it shows:
 *     1. A schedule card  — title, recurrence, time zone, Join/Agenda buttons
 *     2. A "recent meetings" list — 2 most recent, linking to dedicated pages
 *
 * This component no longer contains any modal, dialog, or Markdown-file
 * import logic.  Meeting discovery and data extraction are handled at build
 * time by the meetings-plugin Docusaurus plugin.
 *
 * @param {{ cards: ScheduleCardProps[] }} props
 */
function CommunityMeetingsCardGrid({
  cards,
}: {
  cards: ScheduleCardProps[];
}): JSX.Element {
  // usePluginData returns the lightweight MeetingMeta array set by the plugin.
  // The cast is safe because the plugin always populates this with MeetingMeta[].
  const allMeetings = usePluginData('meetings-plugin') as MeetingMeta[];

  // cards[0] → Community Meeting, cards[1] → Community Cabal (order from data)
  const meetingTypes: MeetingMeta['type'][] = ['community', 'cabal'];

  return (
    <div className="justify-content-center align-items-center custom-card-grid-root flex flex-wrap gap-8">
      {cards.map((card: ScheduleCardProps, index: number) => {
        const type = meetingTypes[index] ?? 'community';
        const recent = recentMeetingsOfType(allMeetings, type);

        return (
          <div
            key={`card-container-${index}`}
            className="align-items-center mb-4 flex flex-1 flex-col flex-wrap items-center justify-center transition duration-150 ease-linear lg:mb-6">
            {/* Schedule card — unchanged from the previous implementation */}
            <CustomCard
              key={`custom-card-${index}`}
              title={card?.title}
              subtitle={card?.date}
              details={card?.timeZone}
              text={card?.subtitle}
              data={card?.buttons}
              primary={true}
            />

            {/* Two most recent meetings with links to dedicated pages */}
            <RecentMeetingsList meetings={recent} />
          </div>
        );
      })}
    </div>
  );
}

export default CommunityMeetingsCardGrid;
