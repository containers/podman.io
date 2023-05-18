import React from 'react';
import { Icon } from '@iconify/react';
import { resources } from './data';

const BasicResourcesBox = () => {
  return (
    <section className="mt-4 lg:my-0">
      <header className="container mb-6 text-center xl:mb-8 xl:text-start">
        <h3 className="font-medium text-blue-700 dark:text-blue-500">{resources.title}</h3>
      </header>
      <div>
        <ul className="mb-10 mt-4 flex flex-col gap-6 sm:flex-row lg:mb-16 lg:mt-8 lg:gap-4 xl:flex-col">
          {resources.buttons.map((button, index) => {
            return (
              <li key={index}>
                <a
                  href={button.path}
                  className="mx-auto flex h-32 max-w-lg flex-col items-center justify-center gap-4 rounded-md bg-gray-100 p-4 text-center text-purple-700 underline-offset-4 transition duration-150 ease-linear hover:bg-purple-700 hover:text-purple-50 hover:shadow-md dark:bg-gray-700 dark:hover:bg-purple-900 dark:hover:text-white lg:h-auto lg:flex-row xl:justify-start">
                  <span>{button.text}</span>
                  <Icon icon={button.icon} className="order-first hidden lg:block" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default BasicResourcesBox;
