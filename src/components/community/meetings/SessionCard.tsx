import React from 'react';
import { Icon } from '@iconify/react';
import type { MeetingItem } from '@site/src/utils/communityMeetings';

export interface SessionCardProps {
  meeting: MeetingItem;
  isSelected: boolean;
  onSelect: (meeting: MeetingItem) => void;
  isMobileAccordion?: boolean;
  isExpanded?: boolean;
  searchQuery?: string;
}

/**
 * Wraps every occurrence of `query` inside `text` in a <mark> element with
 * the `search-highlight` CSS class for both light and dark themed highlighting.
 */
function HighlightedText({ text, query }: { text: string; query: string }): JSX.Element {
  if (!query.trim()) return <>{text}</>;

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const splitRegex = new RegExp(`(${escapedQuery})`, 'gi');
  const testRegex = new RegExp(`^${escapedQuery}$`, 'i');
  const parts = text.split(splitRegex);

  return (
    <>
      {parts.map((part, i) =>
        testRegex.test(part) ? (
          <mark key={i} className="search-highlight">
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

export const SessionCard: React.FC<SessionCardProps> = React.memo(
  ({ meeting, isSelected, onSelect, isMobileAccordion, isExpanded, searchQuery = '' }) => {
    const hasRecording = Boolean(meeting.recordingUrl);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(meeting);
      }
    };

    const activeState = isMobileAccordion ? Boolean(isExpanded) : isSelected;

    return (
      <div
        role="button"
        tabIndex={0}
        aria-selected={activeState}
        aria-expanded={isMobileAccordion ? Boolean(isExpanded) : undefined}
        onClick={() => onSelect(meeting)}
        onKeyDown={handleKeyDown}
        style={{ outline: 'none' }}
        className={`group flex h-[98px] w-full cursor-pointer select-none flex-col justify-center p-4 text-left outline-none transition-all duration-150 focus:outline-none focus:ring-0 focus-visible:outline-none ${
          isMobileAccordion
            ? isExpanded
              ? 'rounded-b-none rounded-t-xl border-b-0 shadow-none'
              : 'rounded-xl shadow-sm'
            : 'rounded-md shadow-sm'
        } ${
          activeState
            ? 'session-card-active border border-purple-700 bg-purple-700 text-white'
            : 'border border-black/[0.06] bg-white text-gray-900 shadow-sm hover:border-black/[0.14] hover:bg-gray-50/80 hover:shadow-md dark:border-white/10 dark:bg-[#24232a] dark:text-white dark:hover:border-white/20 dark:hover:bg-[#2e2d35]'
        }`}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div
              className={`text-base font-bold leading-snug transition ${
                activeState
                  ? 'text-white'
                  : 'text-gray-900 group-hover:text-purple-700 dark:text-white dark:group-hover:text-purple-300'
              }`}>
              <HighlightedText text={meeting.date} query={searchQuery} />
            </div>
            <div
              className={`mt-0.5 text-xs font-medium ${
                activeState ? 'text-purple-100' : 'text-gray-500 dark:text-gray-300'
              }`}>
              <HighlightedText text={meeting.day} query={searchQuery} />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {hasRecording && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  activeState ? 'bg-white/20 text-white' : 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300'
                }`}>
                <Icon icon="logos:youtube-icon" className="text-xs" />
                <span>Video</span>
              </span>
            )}
            {isMobileAccordion ? (
              <Icon
                icon="material-symbols:keyboard-arrow-down-rounded"
                className={`text-2xl transition-transform duration-200 ${
                  isExpanded ? 'rotate-180 text-white' : 'text-gray-400 dark:text-gray-300'
                }`}
              />
            ) : (
              isSelected && <Icon icon="material-symbols:chevron-right-rounded" className="text-lg text-white" />
            )}
          </div>
        </div>
      </div>
    );
  },
);

SessionCard.displayName = 'SessionCard';
