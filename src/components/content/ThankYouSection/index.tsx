import React from 'react';
import sponsorData from './data';

function ThankYouSection(): JSX.Element {
  return (
    <section className="pb-16 pt-8 lg:pb-24 lg:pt-12">
      <div className="container">
        <header className="mx-auto mb-10 max-w-2xl text-center lg:mb-12">
          <h2 className="mb-3 text-blue-700 dark:text-purple-500">Special thanks to our contributors</h2>
          <p className="text-gray-900 dark:text-gray-100">
            The Podman community has contributors from many different organizations, including:
          </p>
        </header>
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-8 rounded-2xl border border-gray-100 bg-gray-50 px-8 py-10 dark:border-gray-700 dark:bg-gray-700/25 lg:gap-x-14 lg:px-14">
          {sponsorData.map(sponsor => (
            <a
              key={sponsor.label}
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={sponsor.label}
              className="flex h-16 w-32 shrink-0 items-center justify-center rounded-md bg-white shadow-sm transition duration-150 ease-linear hover:-translate-y-1 hover:shadow-md dark:bg-white">
              <img {...sponsor} className="max-h-12 max-w-[80%] object-contain" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ThankYouSection;
