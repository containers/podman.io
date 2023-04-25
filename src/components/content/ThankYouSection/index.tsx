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
      <div className="container grid place-items-center lg:grid-cols-5">
        <a href={redHat.href} target="_blank" className="row-span-2 row-start-1 block rounded-md p-4 dark:bg-gray-100">
          <img {...redHat} />
        </a>

        {sponsors.map((logo, index) => {
          return (
            <a href={logo.href} key={index} target="_blank" className="block rounded-md p-4 dark:bg-gray-100">
              <img {...logo} />
            </a>
          );
        })}
        <a
          href={debian.href}
          target="_blank"
          className="col-start-5 row-span-2 row-start-1 block rounded-md p-4 dark:bg-gray-100 ">
          <img {...debian} />
        </a>
      </div>
    </section>
  );
}

export default ThankYouSection;
