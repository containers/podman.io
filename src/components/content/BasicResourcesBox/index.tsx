import React from 'react';
import { Icon } from '@iconify/react';
import { resources } from './data';

const BasicResourcesBox = ({ showHeader = true }: { showHeader?: boolean }) => {
  return (
    <div className="mx-auto w-full max-w-sm rounded-xl border border-gray-100 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-900 lg:p-8">
      {showHeader && (
        <header className="mb-6 text-center">
          <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-500 lg:text-3xl">{resources.title}</h3>
        </header>
      )}
      <ul className="flex flex-col gap-4">
        {resources.buttons.map((button, index) => {
          return (
            <li key={index}>
              <a
                href={button.path}
                className="mx-auto flex max-w-lg items-center justify-center gap-4 rounded-md bg-gray-100 p-4 text-center leading-none text-purple-700 no-underline underline-offset-4 transition duration-150 ease-linear hover:-translate-y-0.5 hover:bg-purple-700 hover:text-purple-50 hover:no-underline hover:shadow-md dark:bg-gray-700 dark:text-purple-300 dark:hover:bg-purple-900 dark:hover:text-white">
                <Icon icon={button.icon} className="shrink-0" />
                <span className="text-left">{button.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BasicResourcesBox;
