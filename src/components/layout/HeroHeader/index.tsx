import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Icon } from '@iconify/react';
import Button from '@site/src/components/utilities/Button';
import DropdownButton from '@site/src/components/utilities/DropdownButton';
import Link from '@site/src/components/utilities/Link';
import WaveBorder from '@site/src/components/shapes/WaveBorder';
import operatingSystemData from './installOptions';

const detectOperatingSystem = () => {
  const userAgent = window.navigator.userAgent.toLowerCase().split(' ');
  if (userAgent.find(item => item.includes('windows'))) {
    return 'windows';
  } else if (userAgent.find(item => item.includes('macintosh'))) {
    return 'mac';
  }
  return 'linux';
};

function returnOperatingSystemData() {
  const os = operatingSystemData.find(os => os.id === detectOperatingSystem() && os);
  return os;
}

const InstallOption = (props): JSX.Element => {
  if (!props) {
    props = operatingSystemData[0];
  }
  return (
    <section>
      <div>
        <a
          href={props.preferred.path}
          className="group block rounded-t-md px-4 py-3.5 text-purple-900 no-underline transition duration-150 ease-linear hover:bg-purple-700 hover:text-white hover:no-underline dark:text-white dark:hover:bg-purple-700">
          <div className="flex items-center gap-4">
            <Icon
              icon={props.preferred.icon}
              className="order-first shrink-0 text-3xl text-purple-900 group-hover:text-white dark:!text-white dark:group-hover:!text-white sm:text-4xl"
            />
            <div className="min-w-0 flex-1">
              <h3 className="m-0 text-sm font-semibold text-purple-900 group-hover:text-white dark:!text-white dark:group-hover:!text-white sm:text-base">
                {props.preferred.title}
              </h3>
              <p className="m-0 mt-0.5 text-xs font-normal text-gray-500 group-hover:text-purple-100 dark:!text-white dark:group-hover:!text-white sm:text-sm">
                {props.preferred.subtitle}
              </p>
            </div>
          </div>
        </a>
      </div>
      <div>
        <a
          href={props.alt.path}
          className="group block px-4 py-3.5 text-purple-900 no-underline transition duration-150 ease-linear hover:bg-purple-700 hover:text-white hover:no-underline dark:text-white dark:hover:bg-purple-700">
          <div className="flex items-center gap-4">
            <Icon
              icon={props.alt.icon}
              className="order-first shrink-0 text-3xl text-purple-900 group-hover:text-white dark:!text-white dark:group-hover:!text-white sm:text-4xl"
            />
            <div className="min-w-0 flex-1">
              <h4 className="m-0 text-sm font-semibold text-purple-900 group-hover:text-white dark:!text-white dark:group-hover:!text-white sm:text-base">
                {props.alt.title}
              </h4>
              <p className="m-0 mt-0.5 text-xs font-normal text-gray-500 group-hover:text-purple-100 dark:!text-white dark:group-hover:!text-white sm:text-sm">
                {props.alt.subtitle}
              </p>
            </div>
          </div>
        </a>
      </div>
      {props.third && (
        <div>
          <a
            href={props.third.path}
            className="group block px-4 py-3.5 text-purple-900 no-underline transition duration-150 ease-linear hover:bg-purple-700 hover:text-white hover:no-underline dark:text-white dark:hover:bg-purple-700">
            <div className="flex items-center gap-4">
              <Icon
                icon={props.third.icon}
                className="order-first shrink-0 text-3xl text-purple-900 group-hover:text-white dark:!text-white dark:group-hover:!text-white sm:text-4xl"
              />
              <div className="min-w-0 flex-1">
                <h4 className="m-0 text-sm font-semibold text-purple-900 group-hover:text-white dark:!text-white dark:group-hover:!text-white sm:text-base">
                  {props.third.title}
                </h4>
                <p className="m-0 mt-0.5 text-xs font-normal text-gray-500 group-hover:text-purple-100 dark:!text-white dark:group-hover:!text-white sm:text-sm">
                  {props.third.subtitle}
                </p>
              </div>
            </div>
          </a>
        </div>
      )}
      <div>
        <a
          href={props.other.path}
          className="group block rounded-b-md bg-gray-50 px-4 py-3 text-purple-900 no-underline transition duration-150 ease-linear hover:bg-purple-700 hover:text-white hover:no-underline dark:bg-white/[0.07] dark:text-white dark:hover:bg-purple-700">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h5 className="m-0 text-sm font-semibold text-purple-900 group-hover:text-white dark:!text-white dark:group-hover:!text-white">
                {props.other.text}
              </h5>
              {props.other.subtext && (
                <p className="m-0 mt-0.5 text-xs font-normal text-gray-500 group-hover:text-purple-100 dark:!text-white dark:group-hover:!text-white">
                  {props.other.subtext}
                </p>
              )}
            </div>
            <Icon
              icon="material-symbols:arrow-circle-right-rounded"
              className="shrink-0 text-xl text-purple-900 group-hover:text-white dark:!text-white dark:group-hover:!text-white"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

function HeroHeader({ title, subtitle, podmanrelease, desktoprelease, image, platforms }) {
  return (
    <header className="relative z-30 overflow-hidden bg-gradient-to-r from-blue-500 to-purple-700 dark:from-blue-700 dark:to-purple-900 md:overflow-visible">
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24">
        <div className="grid items-end md:grid-cols-2 md:gap-8 lg:gap-12 xl:gap-16">
          {/* Left Column: Heading, Subtitle, Buttons, Release Links */}
          <div className="relative z-30 min-w-0 pb-8 pt-6 sm:pb-12 sm:pt-8 md:pb-16 md:pt-8 lg:pb-20 lg:pt-10 xl:pb-24 xl:pt-12 2xl:pb-28 2xl:pt-16">
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-white dark:text-gray-50 sm:text-4xl lg:text-5xl lg:leading-tight xl:text-[3.25rem] 2xl:text-6xl">
              {title}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/90 dark:text-gray-100 sm:text-lg lg:text-lg xl:max-w-2xl xl:text-xl">
              {subtitle}
            </p>
            <div className="relative z-40 my-4 flex flex-wrap items-center gap-3 text-lg sm:my-5 sm:gap-4">
              <Button as="link" text="Get Started" path="/get-started" />
              <BrowserOnly>
                {() => (
                  <DropdownButton
                    text="Download"
                    icon="material-symbols:download-rounded"
                    option={InstallOption(returnOperatingSystemData())}
                  />
                )}
              </BrowserOnly>
            </div>
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white dark:text-gray-100 xl:text-base">
              <span>
                Latest stable Podman <Link {...podmanrelease} textColor="text-white dark:text-gray-100" />
              </span>
              <span>-</span>
              <span>
                Latest stable Podman Desktop <Link {...desktoprelease} textColor="text-white dark:text-gray-100" />
              </span>
              <span>-</span>
              <Link
                text="Apache License 2.0"
                path="https://www.apache.org/licenses/LICENSE-2.0"
                textColor="text-white dark:text-gray-100"
              />
            </p>
          </div>

          {/* Right Column: Supported Platforms & Desktop Preview */}
          <div className="relative z-10 flex min-w-0 flex-row items-end justify-between pb-8 sm:pb-10 md:flex-col md:pb-0">
            <div className="mb-2 flex shrink-0 flex-col items-start md:mb-4 md:items-end">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/90 dark:text-gray-100 sm:text-sm xl:text-base">
                {platforms[0]}
              </h3>
              <ul className="flex items-center gap-2.5 sm:gap-3 lg:gap-4 xl:gap-5">
                {platforms.slice(1).map((icon, index) => {
                  return (
                    <li key={index}>
                      <Icon
                        icon={icon}
                        className="text-xl text-white/90 transition hover:text-white dark:text-gray-100 sm:text-2xl lg:text-3xl xl:text-4xl"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex w-auto justify-end overflow-hidden md:w-full md:overflow-visible">
              <img
                src={image.path}
                alt={image.alt}
                className="3xl:max-w-[1100px] w-[210px] max-w-none translate-x-3 object-contain sm:w-[320px] sm:translate-x-0 md:w-full md:max-w-[500px] lg:max-w-[600px] xl:max-w-[720px] 2xl:max-w-[950px]"
              />
            </div>
          </div>
        </div>
      </div>
      <WaveBorder
        className="pointer-events-none absolute bottom-0 left-0 z-20 h-10 w-full sm:h-12 md:h-14 lg:h-16 xl:h-20 2xl:h-24"
        preserveAspectRatio="none"
      />
    </header>
  );
}

export default HeroHeader;
