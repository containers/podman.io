import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

export interface YearDropdownProps {
  selectedYear: string;
  onSelectYear: (year: string) => void;
  availableYears: number[];
  countPerYear: Record<string, number>;
  totalCount: number;
}

export const YearDropdown: React.FC<YearDropdownProps> = ({
  selectedYear,
  onSelectYear,
  availableYears,
  countPerYear,
  totalCount,
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

  const currentLabel =
    selectedYear === 'all' ? `All Years (${totalCount})` : `Year: ${selectedYear} (${countPerYear[selectedYear] || 0})`;

  const renderBadge = (isSelected: boolean, count: number) => (
    <span
      className={`inline-flex h-6 min-w-[28px] items-center justify-center rounded-full px-1 text-center text-xs font-bold ${
        isSelected ? 'bg-white/20 text-white' : 'bg-purple-700 text-white dark:bg-purple-700 dark:text-white'
      }`}>
      {count}
    </span>
  );

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Filter meetings by year"
        onClick={() => setIsOpen(!isOpen)}
        className={`meetings-year-btn inline-flex cursor-pointer items-center justify-between gap-2.5 rounded-full border px-4 py-2.5 text-sm font-bold transition-all duration-200 focus:outline-none ${
          isOpen
            ? 'border-black/[0.18] bg-white text-gray-900 shadow-md dark:border-white/20 dark:bg-[#2e2d36] dark:text-white'
            : 'border-black/[0.08] bg-white text-gray-900 shadow-sm hover:border-black/[0.14] hover:bg-gray-50/50 hover:shadow dark:border-white/10 dark:bg-[#25242b] dark:text-white dark:hover:border-white/20 dark:hover:bg-[#2e2d36]'
        }`}>
        <Icon icon="material-symbols:calendar-month-outline" className="text-lg text-purple-700 dark:text-purple-300" />
        <span>{currentLabel}</span>
        <Icon
          icon="material-symbols:keyboard-arrow-down-rounded"
          className={`text-lg transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-purple-700 dark:text-purple-300' : 'text-gray-500 dark:text-gray-300'
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="no-scrollbar meetings-year-menu absolute right-0 z-50 mt-2 max-h-80 w-56 overflow-y-auto rounded-2xl border border-[#d0ccd8] bg-white p-2 shadow-2xl dark:border-[#443e50] dark:bg-[#1e1d24]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <button
            type="button"
            role="option"
            aria-selected={selectedYear === 'all'}
            onClick={() => {
              onSelectYear('all');
              setIsOpen(false);
            }}
            style={{ outline: 'none' }}
            className={`flex w-full items-center justify-between rounded-xl border-0 px-3.5 py-2.5 text-left text-sm font-semibold transition ${
              selectedYear === 'all'
                ? 'bg-purple-700 font-bold text-white shadow-sm'
                : 'text-gray-700 hover:bg-purple-100/60 hover:text-purple-900 dark:text-gray-100 dark:hover:bg-[#2a2933] dark:hover:text-white'
            }`}>
            <span>All Years</span>
            {renderBadge(selectedYear === 'all', totalCount)}
          </button>

          {availableYears.map(year => {
            const yearStr = year.toString();
            const isSelected = selectedYear === yearStr;
            return (
              <button
                key={year}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onSelectYear(yearStr);
                  setIsOpen(false);
                }}
                style={{ outline: 'none' }}
                className={`flex w-full items-center justify-between rounded-xl border-0 px-3.5 py-2.5 text-left text-sm font-semibold transition ${
                  isSelected
                    ? 'bg-purple-700 font-bold text-white shadow-sm'
                    : 'text-gray-700 hover:bg-purple-100/60 hover:text-purple-900 dark:text-gray-100 dark:hover:bg-[#2a2933] dark:hover:text-white'
                }`}>
                <span>{year}</span>
                {renderBadge(isSelected, countPerYear[year] || 0)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
