import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

type DropdownProps = {
  text: string;
  option: React.ReactNode;
  className?: string;
};

const defaultButtonClassName =
  'my-2 inline-flex items-center gap-2 rounded-md border border-transparent bg-white px-6 py-2.5 text-base font-semibold text-purple-700 shadow-sm transition duration-150 ease-in-out hover:bg-purple-50 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:text-purple-900 dark:hover:bg-white/90 dark:focus-visible:ring-offset-gray-900';

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
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
        className={props.className ?? defaultButtonClassName}>
        <span>{props.text}</span>
        <Icon
          icon="ion:caret-down-outline"
          className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-2 min-w-[16rem] max-w-fit overflow-hidden rounded-md border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {props.option}
        </div>
      )}
    </div>
  );
}

export default DropdownButton;
