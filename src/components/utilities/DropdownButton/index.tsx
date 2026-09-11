import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

type DropdownProps = {
  text: string;
  option: React.ReactNode;
  icon?: string;
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

function DropdownButton(props: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  toggleDropdown(dropdownRef, () => setIsOpen(false));
  return (
    <div ref={dropdownRef} className="relative">
      <button
        data-dropdown-toggle="dropdown"
        onClick={() => setIsOpen(prev => !prev)}
        className="my-2 flex items-center gap-2 rounded-md bg-white px-4 py-2 font-bold text-purple-700 transition duration-150 ease-linear hover:bg-purple-700 hover:text-white focus:shadow-md dark:text-purple-900 dark:hover:text-white">
        {props.icon && <Icon icon={props.icon} className="text-xl" />}
        <span>{props.text}</span>
        <Icon icon="ion:caret-down-outline" />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-md bg-white shadow-lg dark:bg-gray-900 sm:w-96">
          {props.option}
        </div>
      )}
    </div>
  );
}

export default DropdownButton;
