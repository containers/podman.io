import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

type DropdownProps = {
  text: string;
  option: React.ReactNode;
};

function toggleDropdown(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.body.addEventListener('mousedown', listener);
    document.body.addEventListener('touchstart', listener);
    return () => {
      document.body.removeEventListener('mousedown', listener);
      document.body.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

function DropdownButton(props: DropdownProps) {
  const dropdownRef = useRef();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  toggleDropdown(dropdownRef, () => setIsOpen(false));
  return (
    <div ref={dropdownRef}>
      <button
        data-dropdown-toggle="dropdown"
        onClick={() => setIsOpen(prev => !prev)}
        className="my-2 flex items-center gap-2 rounded-md bg-white px-4 py-2 font-bold text-purple-700 transition duration-150 ease-linear hover:bg-purple-700 hover:text-white focus:shadow-md dark:text-purple-900 dark:hover:text-white">
        <span>{props.text}</span>
        <Icon icon="ion:caret-down-outline" />
      </button>
      {isOpen && (
        <div className="absolute mt-2 max-w-fit rounded-md bg-white shadow-md dark:bg-gray-900">{props.option}</div>
      )}
    </div>
  );
}
export default DropdownButton;
