import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

export type MeetingTab = 'notes' | 'transcript';

export interface MeetingViewDropdownProps {
  activeTab: MeetingTab;
  onSelectTab: (tab: MeetingTab) => void;
  hasTranscript: boolean;
}

export const MeetingViewDropdown: React.FC<MeetingViewDropdownProps> = ({ activeTab, onSelectTab, hasTranscript }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const options: Array<{
    id: MeetingTab;
    label: string;
    icon: string;
    badge?: string;
    isAvailable?: boolean;
  }> = [
    {
      id: 'notes',
      label: 'Meeting Notes',
      icon: 'material-symbols:edit-note-rounded',
      isAvailable: true,
    },
    {
      id: 'transcript',
      label: 'Transcript & Chat',
      icon: 'material-symbols:subtitles-outline',
      badge: hasTranscript ? 'Available' : 'N/A',
      isAvailable: hasTranscript,
    },
  ];

  const currentOption = options.find(o => o.id === activeTab) || options[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger — always solid purple with white text */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select view: Meeting Notes or Transcript"
        style={{
          border: 'none',
          outline: 'none',
          textDecoration: 'none',
          backgroundColor: isOpen ? '#6b1f7e' : '#892ca0',
          color: '#ffffff',
        }}
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold !no-underline shadow-sm transition-all duration-150 hover:opacity-90 hover:shadow-md">
        <Icon icon={currentOption.icon} className="shrink-0 text-base" style={{ color: '#ffffff' }} />
        <span>{currentOption.label}</span>
        <Icon
          icon="material-symbols:keyboard-arrow-down-rounded"
          className={`shrink-0 text-lg transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: '#ffffff' }}
        />
      </button>

      {/* Dropdown Panel — full purple container */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          style={{ backgroundColor: '#892ca0' }}
          className="absolute left-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl p-1.5 shadow-xl">
          {/* "View" label */}
          <div style={{ color: '#ffffff' }} className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest">
            View
          </div>

          {options.map(option => {
            const isSelected = activeTab === option.id;
            const isDisabled = !option.isAvailable;

            return (
              <button
                key={option.id}
                type="button"
                role="menuitem"
                disabled={isDisabled}
                onClick={() => {
                  if (!isDisabled) {
                    onSelectTab(option.id);
                    setIsOpen(false);
                  }
                }}
                style={{
                  border: 'none',
                  outline: 'none',
                  backgroundColor: isSelected ? '#6b1f7e' : 'transparent',
                  color: isDisabled ? '#c084fc' : '#ffffff',
                  opacity: isDisabled ? 0.5 : 1,
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
                className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:!opacity-90"
                onMouseEnter={e => {
                  if (!isSelected && !isDisabled) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#7a268f';
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected && !isDisabled) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  }
                }}>
                <div className="flex items-center gap-2.5">
                  <Icon
                    icon={option.icon}
                    style={{ color: isDisabled ? '#c084fc' : '#e9d5ff' }}
                    className="text-base"
                  />
                  <span>{option.label}</span>
                </div>
                {option.badge && (
                  <span
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: '#ffffff',
                    }}
                    className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    {option.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
