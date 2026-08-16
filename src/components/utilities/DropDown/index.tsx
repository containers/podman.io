import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

import './styles.css';

type DropdownProps = {
  text: string;
  options: any[];
  dropdownRef: React.RefObject<HTMLDivElement | null>;
};

function toggleDropdown(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

function Dropdown(props: DropdownProps) {
  const { dropdownRef } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  toggleDropdown(dropdownRef, () => setIsOpen(false));
  return (
    <div ref={dropdownRef} className="w-full">
      <button
        type="button"
        data-dropdown-toggle="dropdown"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        className="my-2 flex w-full cursor-pointer items-center gap-2 py-2 pl-12 font-bold text-purple-700 transition duration-150 ease-linear hover:text-purple-900 dark:text-purple-500 dark:hover:text-purple-300">
        <div className={`transition duration-150 ease-linear ${isOpen && 'rotate-90'}`}>
          <Icon icon="bi:caret-right-square-fill" />
        </div>
        <span>{props.text}</span>
      </button>
      {isOpen && (
        <div className="dropdown-options flex max-h-96 flex-col divide-y divide-gray-100 overflow-y-auto overflow-x-hidden rounded-xl border border-gray-100 bg-white shadow-md scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900">
          {props?.options.map(option => option)}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
