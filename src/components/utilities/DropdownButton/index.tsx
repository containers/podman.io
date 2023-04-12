import React from 'react';
import { Icon } from '@iconify/react';

type DropdownProps = {
  selectName: string;
  initialText: string;
  options: string[];
};

export default function DropdownButton(props: DropdownProps) {
  return (
    <div>
      <select
        name={props.selectName}
        id={props.selectName}
        className="appearance-none rounded-md bg-white px-4 py-2 hover:bg-purple-700 hover:text-white active:bg-white active:text-gray-900 active:shadow-lg">
        <option className="">{props.initialText}</option>
        {props.options.map(item => {
          return <option value="">{item}</option>;
        })}
      </select>
    </div>
  );
}
