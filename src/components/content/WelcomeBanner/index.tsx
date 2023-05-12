import React from 'react';
import { Icon } from '@iconify/react';

function WelcomeBanner() {
  return (
    <section className="bg-gray-900">
      <div className="container my-20 grid grid-cols-4 place-items-center gap-y-4 md:grid-cols-10 lg:grid-cols-12">
        <div className=" col-span-2 hidden md:block lg:row-span-2">
          <Icon icon="noto-v1:confetti-ball" className="rotate-[120deg] text-7xl" />
        </div>
        <header className=" col-span-full flex items-center gap-4 text-center md:col-span-6 lg:col-span-8">
          <h2 className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-5xl font-extrabold text-transparent dark:bg-gradient-to-r  dark:from-purple-700 dark:to-blue-700 dark:bg-clip-text dark:text-transparent">
            Welcome to the new Podman Website!
          </h2>
        </header>
        <div className="col-span-2 hidden md:block lg:row-span-2">
          <Icon icon="noto-v1:confetti-ball" className="rotate-180 text-7xl" />
        </div>
        <div className="col-span-full mt-8 flex flex-wrap items-center gap-8 md:mt-0 lg:col-span-8 ">
          <p className="max-w-prose text-center text-white">
            Take a look around, don't forget to check out the new <a href="docs">docs layout</a>. Please report
            any bugs to <a href="https://github.com/containers/website-new/issues">the issue tracker</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WelcomeBanner;
