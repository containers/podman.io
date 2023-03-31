import React from 'react';
import { Icon } from '@iconify/react';
interface ListItemProps {
  href?: string;
  icon?: string;
  text: string;
}

export default function ListItem({ text, href, icon = 'fa6-solid:book' }: ListItemProps) {
  const baseStyles =
    'my-4 flex max-w-sm text-xl dark:bg-gray-700 dark:text-purple-300 lg:text-2xl items-center gap-4 rounded-md bg-gray-50 text-purple-700 px-4 py-2';
  return (
    <li className="list-none">
      {href ? (
        <a
          href={href}
          className={`${baseStyles} transition duration-150 ease-linear hover:bg-gray-100 hover:text-purple-900 dark:hover:bg-purple-700 dark:hover:text-purple-100`}>
          <Icon icon={icon} />
          <span>{text}</span>
        </a>
      ) : (
        <div className={`${baseStyles}`}>
          <Icon icon={icon} />
          <span>{text}</span>
        </div>
      )}
    </li>
  );
}
