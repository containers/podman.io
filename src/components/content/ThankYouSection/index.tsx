import React from 'react';
import sponsorData from './data';
function ThankYouSection(): JSX.Element {
  const [redHat, debian, ...sponsors] = sponsorData;
  return (
    <section className="my-8 lg:my-12">
      <header className="container my-4 text-center lg:my-8">
        <h2 className="mb-3 text-blue-700 dark:text-purple-500">Special thanks to our contributors</h2>
        <p className="text-gray-900">
          The Podman community has contributors from many different organizations, including:
        </p>
      </header>
      <div className="relative mx-auto my-8">
        <div
          id="slider"
          className="mx-auto h-full w-full place-items-center gap-6 overflow-x-scroll scroll-smooth whitespace-nowrap lg:container lg:grid lg:grid-cols-5">
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
                className="mx-4 mb-4 inline-block rounded-md p-4  dark:bg-gray-100 lg:mb-0">
                <img {...logo} className="mx-auto h-20 p-4 lg:h-32" />
              </a>
            );
          })}
          <a
            href={debian.href}
            target="_blank"
            className="mx-4 mb-4 inline-block rounded-md p-4  dark:bg-gray-100 lg:col-start-5  lg:row-span-2 lg:row-start-1 lg:mb-0">
            <img {...debian} className="mx-auto h-20 p-4 lg:h-32" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default ThankYouSection;
