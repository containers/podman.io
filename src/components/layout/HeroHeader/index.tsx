import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Icon } from '@iconify/react';
import Button from '@site/src/components/utilities/Button';
import DropdownButton from '@site/src/components/utilities/DropdownButton';
import Link from '@site/src/components/utilities/Link';
import WaveBorder from '@site/src/components/shapes/WaveBorder';
import operatingSystemData from './installOptions';
type InstallOptionProps = Card & {
  icon: string;
  options?: Link[];
  path: string;
  other?: { path: string; text: string; subtext: string };
};

/* TODO: use find instead of filter */
const detectOperatingSystem = () => {
  return window.navigator.userAgent
    .toLowerCase()
    .split(' ')
    .filter(item => item.includes('linux' || 'windows' || 'macos'))
    .toString();
};

/* this should return an object that matches InstallOptionProps */
function returnOperatingSystemData() {
  return operatingSystemData.find(os => os.id === detectOperatingSystem());
}
const InstallOption = (): JSX.Element => {
  const data = returnOperatingSystemData();
  return (
    <section>
      <div>
        <a
          href={data.path}
          className="block rounded-t-md transition duration-150 ease-linear hover:bg-purple-700 hover:text-white hover:no-underline dark:hover:bg-purple-900">
          <div className="flex items-center gap-2 px-4 pb-6 pt-4">
            <div>
              <h3>{data.title}</h3>
              <p>{data.subtitle}</p>
            </div>
            <Icon icon={data.icon} className="order-first text-4xl" />
          </div>
        </a>
      </div>
      <div>
        <a
          href={data.other.path}
          className="block rounded-b-md bg-gray-50 transition duration-150 ease-linear hover:bg-purple-700 hover:text-white hover:no-underline dark:bg-gray-700 dark:hover:bg-purple-900">
          <div className="px-4 py-2">
            <div className="flex items-center gap-2">
              <h4 className="row-start-1">{data.other.text}</h4>
              <Icon icon="material-symbols:arrow-circle-right-rounded" className="row-start-1 text-xl" />
            </div>
            <p>{data.other.subtext}</p>
          </div>
        </a>
      </div>
    </section>
  );
};

export default function HeroHeader({ title, subtitle, release, image, platforms }) {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-purple-700 dark:to-blue-900">
      <div className="grid md:grid-cols-2 md:gap-12">
        <div className="container row-span-2 mb-4 mt-12 place-self-center md:mb-0 md:ml-10 xl:ml-24">
          <h1 className="mb-4 text-white dark:text-gray-50 lg:mb-8">{title}</h1>
          <p className="max-w-sm text-white dark:text-gray-50 lg:max-w-prose">{subtitle}</p>
          <div className="my-3 flex max-w-sm gap-8">
            <Button as="link" text="Get Started" path="#" />
            <BrowserOnly>{() => <DropdownButton text="Download" option={InstallOption()} />}</BrowserOnly>
          </div>
          <p className="flex gap-4 text-white dark:text-gray-100">
            <span>
              Latest stable <Link {...release} textColor="text-white dark:text-gray-100" />
            </span>
            <span>-</span>
            <Link
              text="Apache License 2.0"
              path="https://www.apache.org/licenses/LICENSE-2.0"
              textColor="text-white dark:text-gray-100"
            />
          </p>
        </div>

        <div className="flex flex-col justify-end self-end md:col-start-2 md:row-span-3 lg:row-span-2 lg:row-start-2">
          <div className="container mb-12 flex flex-col items-end md:mb-0 md:max-w-lg lg:max-w-full 2xl:pr-8">
            <h3 className="text-base font-medium text-white dark:text-gray-100">{platforms[0]}</h3>
            <ul className="flex gap-4">
              {platforms.slice(1).map((icon, index) => {
                return (
                  <li key={index}>
                    <Icon icon={icon} className="text-3xl text-white dark:text-gray-100" />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="-mb-23 hidden justify-end md:flex lg:mb-12 lg:w-[510px] 2xl:w-full">
            <img src={image.path} alt={image.alt} className="object-cover" />
          </div>
        </div>
        <WaveBorder grid="col-span-full lg:row-start-3" />
      </div>
    </header>
  );
}
