import React from 'react';
import heroImage from '@site/static/images/optimized/podman-ui-679w-592h.webp';
import { Icon } from '@iconify/react';

export default function HeroHeader({ title, subtitle }) {
  return (
    <header className="flex h-[420px] flex-col bg-blue-700 dark:bg-blue-900">
      <div className="grid-row grid flex-grow items-center md:grid-cols-2">
        <div className="container mt-10 md:mt-0 lg:ml-20">
          <h1 className="mb-4 text-white dark:text-gray-100 lg:mb-8">{title}</h1>
          <p className="max-w-3xl text-white dark:text-gray-100">{subtitle}</p>
        </div>
        <div className="grid grid-rows-1">
          <div className="grid-row-1 container flex flex-col items-end lg:items-center">
            <h3 className=" text-base font-medium text-white dark:text-gray-100">Supported platforms</h3>
            <ul className=" my-4 flex gap-4">
              <li>
                <Icon icon="fa6-brands:redhat" className="text-3xl text-white dark:text-gray-100" />
              </li>
              <li>
                <Icon icon="fa6-brands:apple" className="text-3xl text-white dark:text-gray-100" />
              </li>
              <li>
                <Icon icon="fa6-brands:microsoft" className="text-3xl text-white dark:text-gray-100" />
              </li>
              <li>
                <Icon icon="fa6-brands:linux" className="text-3xl text-white dark:text-gray-100" />
              </li>
            </ul>
          </div>
          <div className="-mb-24 -mr-12 flex justify-end">
            <img src={heroImage} alt="Screenshots of podman ui" className="w-4/6" />
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 2000 291">
        <title>wave border</title>
        <path
          fill="#fff"
          d="M0 32V21.386S78.25.634 155.47.634c131.788 0 169.95 23.309 233.125 23.309 108.108 0 138.56-21.268 208.573-21.268s108.701 25.151 233.283 25.151c124.581 0 120.881-43.085 251.082-22.031 112.227 18.148 187.023 22.031 264.45 7.825C1422.94-.5 1425.1 27.733 1424.997 32l.003 258H0V32Z"
        />
      </svg>
    </header>
  );
}
