import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

export interface SpeakerDropdownProps {
  selectedSpeaker: string;
  onSelectSpeaker: (speaker: string) => void;
  speakerStats: [string, number][];
  totalTurns: number;
}

export const SpeakerDropdown: React.FC<SpeakerDropdownProps> = ({
  selectedSpeaker,
  onSelectSpeaker,
  speakerStats,
  totalTurns,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard accessibility: Close on Escape
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Determine current active label
  const activeCount =
    selectedSpeaker === 'all' ? totalTurns : speakerStats.find(([name]) => name === selectedSpeaker)?.[1] || 0;

  const currentLabel = selectedSpeaker === 'all' ? `All Speakers (${speakerStats.length})` : selectedSpeaker;

  const renderBadge = (isSelected: boolean, count: number) => (
    <span
      className={`inline-flex h-5 min-w-[22px] items-center justify-center rounded-full px-1.5 text-center text-[11px] font-bold ${
        isSelected ? 'bg-white/20 text-white' : 'bg-purple-700 text-white dark:bg-purple-700 dark:text-white'
      }`}>
      {count}
    </span>
  );

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button with Generous Right Padding & Balanced Arrow Spacing */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Filter transcript by speaker"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          outline: 'none',
          backgroundColor: 'rgba(255,255,255,0.15)',
          color: '#ffffff',
          borderColor: 'rgba(255,255,255,0.35)',
        }}
        className="speaker-filter-btn shadow-xs inline-flex cursor-pointer items-center justify-between gap-2.5 rounded-full border py-1.5 pl-3.5 pr-3 text-xs font-bold text-white transition hover:bg-white/25 focus:outline-none">
        <Icon icon="material-symbols:record-voice-over-outline-rounded" className="shrink-0 text-sm text-white" />
        <span className="max-w-[140px] truncate text-white">{currentLabel}</span>
        {selectedSpeaker !== 'all' && <span className="text-[10px] font-bold text-white/80">({activeCount})</span>}
        <Icon
          icon="material-symbols:keyboard-arrow-down-rounded"
          className={`shrink-0 text-base text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Popover Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="no-scrollbar speaker-dropdown-menu absolute right-0 z-50 mt-2 max-h-72 w-64 overflow-y-auto rounded-2xl border border-[#d0ccd8] bg-white p-2 shadow-2xl dark:border-[#443e50] dark:bg-[#1e1d24]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* All Speakers Option */}
          <button
            type="button"
            role="option"
            aria-selected={selectedSpeaker === 'all'}
            onClick={() => {
              onSelectSpeaker('all');
              setIsOpen(false);
            }}
            style={{ outline: 'none' }}
            className={`flex w-full items-center justify-between rounded-xl border-0 px-3 py-2 text-left text-xs font-semibold transition ${
              selectedSpeaker === 'all'
                ? 'bg-purple-700 font-bold text-white shadow-sm'
                : 'text-gray-700 hover:bg-purple-100/60 hover:text-purple-900 dark:text-gray-100 dark:hover:bg-[#2a2933] dark:hover:text-white'
            }`}>
            <span className="truncate pr-2">All Speakers</span>
            {renderBadge(selectedSpeaker === 'all', speakerStats.length)}
          </button>

          <div className="my-1 border-t border-[#d0ccd8]/60 dark:border-[#443e50]" />

          {/* Individual Speakers List */}
          {speakerStats.map(([name, count]) => {
            const isSelected = selectedSpeaker === name;
            return (
              <button
                key={name}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onSelectSpeaker(name);
                  setIsOpen(false);
                }}
                style={{ outline: 'none' }}
                className={`flex w-full items-center justify-between rounded-xl border-0 px-3 py-2 text-left text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-purple-700 font-bold text-white shadow-sm'
                    : 'text-gray-700 hover:bg-purple-100/60 hover:text-purple-900 dark:text-gray-100 dark:hover:bg-[#2a2933] dark:hover:text-white'
                }`}>
                <span className="truncate pr-2" title={name}>
                  {name}
                </span>
                {renderBadge(isSelected, count)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SpeakerDropdown;
