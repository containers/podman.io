import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

type DropdownProps = {
  text: string;
  options: string[];
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
        className="my-2 flex cursor-pointer items-center gap-1 py-2 pl-12 font-bold text-purple-700 transition duration-150 ease-linear">
        <div className={`transition duration-150 ease-linear ${isOpen && 'rotate-90'}`}>
          <Icon icon="bi:caret-right-square-fill" />
        </div>
        <span>{props.text}</span>
      </div>
      <div className="absolute mt-2 flex w-6/12 flex-col overflow-y-auto overflow-x-hidden shadow-md dark:bg-gray-900 md:max-h-full lg:max-h-96">
        {isOpen && props?.options.map(option => option)}
      </div>
    </div>
  );
}

export default Dropdown;
