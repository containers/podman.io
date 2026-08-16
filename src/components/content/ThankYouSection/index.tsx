import React from 'react';
import sponsorData from './data';

function ThankYouSection(): JSX.Element {
  return (
    <section className="my-8 lg:my-12">
      <header className="container my-4 text-center lg:my-8">
        <h2 className="mb-3 text-blue-700 dark:text-purple-500">Special thanks to our contributors</h2>
        <p className="text-gray-900 dark:text-gray-100">
          The Podman community has contributors from many different organizations, including:
        </p>
      </header>
      <div className="container flex flex-wrap items-center justify-center gap-x-10 gap-y-8 lg:gap-x-14">
        {sponsorData.map(sponsor => (
          <a
            key={sponsor.label}
            href={sponsor.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={sponsor.label}
            className="flex h-16 w-32 shrink-0 items-center justify-center rounded-md transition duration-150 ease-linear hover:-translate-y-1 hover:bg-gray-50 hover:shadow-md dark:bg-white dark:hover:shadow-lg">
            <img {...sponsor} className="max-h-12 max-w-[80%] object-contain" />
          </a>
        ))}
      </div>
    </section>
  );
}

export default ThankYouSection;
