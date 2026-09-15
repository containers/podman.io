import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

import './styles.css';

type DropdownProps = {
  text: string;
  options: any[];
  dropdownRef: React.MutableRefObject<undefined>;
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

function closeOnEscape(handler) {
  useEffect(() => {
    const listener = event => {
      if (event.key === 'Escape') {
        handler();
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [handler]);
}

function Dropdown(props: DropdownProps) {
  const { dropdownRef } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const optionsId = useRef(`dropdown-options-${Math.random().toString(36).slice(2)}`).current;
  toggleDropdown(dropdownRef, () => setIsOpen(false));
  closeOnEscape(() => setIsOpen(false));
  return (
    <div ref={dropdownRef}>
      <button
        type="button"
        data-dropdown-toggle="dropdown"
        aria-expanded={isOpen}
        aria-controls={optionsId}
        onClick={() => setIsOpen(prev => !prev)}
        className="my-2 flex items-center gap-1 py-2 pl-12 font-bold text-purple-700 dark:text-purple-500">
        <div className={`transition duration-150 ease-linear ${isOpen && 'rotate-90'}`}>
          <Icon icon="bi:caret-right-square-fill" />
        </div>
        <span>{props.text}</span>
      </button>
      <div
        id={optionsId}
        className="dropdown-options absolute mt-2 flex flex-col overflow-y-auto overflow-x-hidden shadow-md scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:bg-gray-900 md:max-h-full lg:max-h-96">
        {isOpen && props?.options.map(option => option)}
      </div>
    </div>
  );
}

export default Dropdown;
