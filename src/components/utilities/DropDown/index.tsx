import React, { useState, useEffect } from 'react';
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

function Dropdown(props: DropdownProps) {
  const { dropdownRef } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  toggleDropdown(dropdownRef, () => setIsOpen(false));
  return (
    <div ref={dropdownRef}>
      <div
        data-dropdown-toggle="dropdown"
        onClick={() => setIsOpen(prev => !prev)}
        className="my-2 flex cursor-pointer items-center gap-1 py-2 pl-12 font-bold text-purple-700 dark:text-purple-500">
        <div className={`transition duration-150 ease-linear ${isOpen && 'rotate-90'}`}>
          <Icon icon="bi:caret-right-square-fill" />
        </div>
        <span>{props.text}</span>
      </div>
      <div className="dropdown-options absolute mt-2 flex flex-col overflow-y-auto overflow-x-hidden shadow-md scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:bg-gray-900 md:max-h-full lg:max-h-96">
        {isOpen && props?.options.map(option => option)}
      </div>
    </div>
  );
}

export default Dropdown;
