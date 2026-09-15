import React from 'react';
import { Icon } from '@iconify/react';
import type { MeetingItem } from '@site/src/utils/communityMeetings';

export interface SessionCardProps {
  meeting: MeetingItem;
  isSelected: boolean;
  onSelect: (meeting: MeetingItem) => void;
}

export const SessionCard: React.FC<SessionCardProps> = React.memo(({ meeting, isSelected, onSelect }) => {
  const hasRecording = Boolean(meeting.recordingUrl);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(meeting);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
      onClick={() => onSelect(meeting)}
      onKeyDown={handleKeyDown}
      style={{ outline: 'none' }}
      className={`group flex h-[98px] w-full cursor-pointer select-none flex-col justify-center rounded-md p-4 text-left outline-none transition-all duration-150 focus:outline-none focus:ring-0 focus-visible:outline-none ${
        isSelected
          ? 'border border-purple-700 bg-purple-700 text-white shadow-sm'
          : 'border border-black/[0.06] bg-white text-gray-900 shadow-sm hover:border-black/[0.14] hover:bg-gray-50/80 hover:shadow-md dark:border-white/10 dark:bg-[#24232a] dark:text-white dark:hover:border-white/20 dark:hover:bg-[#2e2d35]'
      }`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div
            className={`text-base font-bold leading-snug transition ${
              isSelected
                ? 'text-white'
                : 'text-gray-900 group-hover:text-purple-700 dark:text-white dark:group-hover:text-purple-300'
            }`}>
            {meeting.date}
          </div>
          <div
            className={`mt-0.5 text-xs font-medium ${
              isSelected ? 'text-purple-100' : 'text-gray-500 dark:text-gray-300'
            }`}>
            {meeting.day}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {hasRecording && (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                isSelected ? 'bg-white/20 text-white' : 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300'
              }`}>
              <Icon icon="logos:youtube-icon" className="text-xs" />
              <span>Video</span>
            </span>
          )}
          {isSelected && <Icon icon="material-symbols:chevron-right-rounded" className="text-lg text-white" />}
        </div>
      </div>
    </div>
  );
});

SessionCard.displayName = 'SessionCard';
