import React from 'react';
import sponsorData from './data';
import { Icon } from '@iconify/react';

function ThankYouSection(): JSX.Element {
  const [redHat, debian, ...sponsors] = sponsorData;
  const slideLeft = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <section className="my-8 lg:my-12">
      <header className="container my-4 text-center lg:my-8">
        <h2 className="mb-3 text-blue-700 dark:text-purple-500">Special thanks to our contributors</h2>
        <p className="text-gray-900">
          The Podman community has contributors from many different organizations, including:
        </p>
      </header>
      <div className="relative mx-auto my-8 flex items-center">
        <button onClick={slideLeft} className="lg:hidden">
          <Icon
            icon="fa-solid:arrow-circle-left"
            className="text-4xl text-gray-500 opacity-25 transition duration-150 ease-linear hover:text-purple-900 hover:opacity-100 dark:hover:text-purple-700"
          />
        </button>
        <div
          id="slider"
          className="container mx-auto h-full w-full grid-flow-col place-items-center gap-6 overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar scrollbar-track-purple-500 lg:container lg:grid lg:grid-rows-2">
          <a
            href={redHat.href}
            target="_blank"
            className="mx-4 mb-4 inline-block rounded-md p-4  dark:bg-gray-100 lg:row-span-2 lg:row-start-1 lg:mb-0">
            <img {...redHat} className="mx-auto h-20 p-4 lg:h-32" />
          </a>
          {sponsors.map((logo, index) => {
            return (
              <a
                href={logo.href}
                key={index}
                target="_blank"
                className="mx-4 mb-4 inline-block rounded-md p-4 dark:bg-gray-100 lg:mb-0 lg:flex lg:h-28 lg:w-80 lg:items-center">
                <img {...logo} className="object-fit mx-auto max-w-sm p-4 " />
              </a>
            );
          })}
          <a
            href={debian.href}
            target="_blank"
            className="mx-4 mb-4 inline-block rounded-md p-4 dark:bg-gray-100 lg:row-span-2 lg:row-start-1 lg:mb-0">
            <img {...debian} className="mx-auto h-20 p-4 lg:h-32" />
          </a>
        </div>
        <button onClick={slideRight} className="lg:hidden">
          <Icon
            icon="fa-solid:arrow-circle-right"
            className="dark:hover-text-purple-700 text-4xl text-gray-500 opacity-25 transition duration-150 ease-linear hover:text-purple-900 hover:opacity-100"
          />
        </button>
      </div>
    </section>
  );
}

export default ThankYouSection;
