import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';

type DropdownProps = {
  text: string;
  options?: React.ReactNode | Link[];
  option: React.ReactNode;
};

export default function DropdownButton(props: DropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const toggleDropdown = state => {
    setOpen(!state);
  };

  return (
    <div>
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        onClick={e => toggleDropdown(open)}
        className="my-2 flex items-center gap-2 rounded-md bg-white px-4 py-2 font-bold text-purple-700 transition duration-150 ease-linear hover:bg-purple-700 hover:text-white focus:shadow-md dark:text-purple-900 dark:hover:text-white">
        <span>{props.text}</span>
        <Icon icon="ion:caret-down-outline" />
      </button>
      {open && (
        <div id="dropdown" className="absolute mt-2 max-w-fit rounded-md bg-white shadow-md dark:bg-gray-900">
          {props.options.map((ListItem, index) => {
            return <li key={index}>{ListItem}</li>;
          })}
        </div>
      )}
    </div>
  );
}
