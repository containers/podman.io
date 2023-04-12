import React, { useState } from 'react';
import { Icon } from '@iconify/react';

type DropdownProps = {
  selectName: string;
  buttonText: string;
  options: string[];
};

export default function DropdownButton(props: DropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const toggleDropdown = state => {
    setOpen(!state);
  };
  console.log(open);
  return (
    <div>
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        onClick={e => toggleDropdown(open)}
        className="flex items-center gap-2 rounded-md bg-white px-4 py-2 font-bold hover:bg-purple-700 hover:text-white focus:shadow-md dark:text-purple-900 dark:hover:text-white">
        <span>{props.buttonText}</span>
        <Icon icon="ion:caret-down-outline" />
      </button>
      {open && (
        <div id="dropdown">
          <ul aria-labelledby="dropdownButton">
            {props.options.map((listItem, index) => {
              return <li key={index}>{listItem}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
