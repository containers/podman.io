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
  option?: React.ReactNode;
  path: string;
  third?: { title: string; subtitle: string; icon: string; path: string };
  other?: { path: string; text: string; subtext: string };
};

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
          className="block rounded-t-md text-purple-900 no-underline transition duration-150 ease-linear hover:bg-purple-700 hover:text-white hover:no-underline dark:text-white dark:hover:bg-purple-900 dark:hover:text-gray-300">
          <div className="flex items-center gap-4 px-4 pb-6 pt-4">
            <div>
              <h3>{props.preferred.title}</h3>
              <p>{props.preferred.subtitle}</p>
            </div>
            <Icon icon={props.preferred.icon} className="order-first text-4xl" />
          </div>
        </a>
      </div>
      <div>
        <a
          href={props.alt.path}
          className="block text-purple-900 no-underline transition duration-150 ease-linear hover:bg-purple-700 hover:text-white hover:no-underline dark:text-white dark:hover:bg-purple-900 dark:hover:text-gray-300">
          <div className="flex items-center gap-4 px-4 pb-6 pt-4">
            <div>
              <h4>{props.alt.title}</h4>
              <p>{props.alt.subtitle}</p>
            </div>
            <Icon icon={props.alt.icon} className="order-first text-4xl" />
          </div>
        </a>
      </div>
      {props.third && (
        <div>
          <a
            href={props.third.path}
            className="block text-purple-900 no-underline transition duration-150 ease-linear hover:bg-purple-700 hover:text-white hover:no-underline dark:text-white dark:hover:bg-purple-900 dark:hover:text-gray-300">
            <div className="flex items-center gap-4 px-4 pb-6 pt-4">
              <div>
                <h4>{props.third.title}</h4>
                <p>{props.third.subtitle}</p>
              </div>
              <Icon icon={props.third.icon} className="order-first text-4xl" />
            </div>
          </a>
        </div>
      )}
      <div>
        <a
          href={props.other.path}
          className="block rounded-b-md bg-gray-50 py-2 text-purple-900 no-underline transition duration-150 ease-linear hover:bg-purple-700 hover:text-white hover:no-underline dark:bg-gray-700 dark:text-white dark:hover:bg-purple-900 dark:hover:text-gray-300">
          <div className="px-4 py-2">
            <div className="flex items-center gap-2">
              <h5 className="row-start-1">{props.other.text}</h5>
              <Icon icon="material-symbols:arrow-circle-right-rounded" className="row-start-1 text-xl" />
            </div>
            <p>{props.other.subtext}</p>
          </div>
        </a>
      </div>
    </section>
  );
};

function HeroHeader({ title, subtitle, podmanrelease, desktoprelease, image, platforms }) {
  const releaseLinkProps = {
    fontSize: 'text-sm lg:text-sm font-normal',
    textColor: 'text-white dark:text-gray-100',
    hoverColor: 'hover:text-purple-300 dark:hover:text-purple-300',
    underline: 'underline underline-offset-4 decoration-white/70 hover:decoration-purple-300',
  };

  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-700 dark:from-blue-700 dark:to-purple-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end md:grid-cols-12 md:gap-8 lg:gap-12">
          <div className="min-w-0 pt-8 pb-16 md:col-span-7 md:pt-12 md:pb-24 lg:col-span-7 lg:pb-28 xl:col-span-7">
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white dark:text-gray-50 sm:text-4xl lg:text-5xl lg:leading-tight">
              {title}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/90 dark:text-gray-100 sm:text-lg">
              {subtitle}
            </p>
            <div className="my-5 flex flex-wrap items-center gap-4 text-lg">
              <Button as="link" text="Get Started" path="/get-started" />
              <BrowserOnly>
                {() => <DropdownButton text="Download" option={InstallOption(returnOperatingSystemData())} />}
              </BrowserOnly>
            </div>
            <p className="flex flex-wrap items-center gap-y-1.5 pt-2 text-sm font-normal text-white dark:text-gray-100">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <span>Latest stable Podman</span>
                <Link {...podmanrelease} {...releaseLinkProps} />
              </span>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap before:mx-2.5 before:opacity-60 before:content-['-']">
                <span>Latest stable Podman Desktop</span>
                <Link {...desktoprelease} {...releaseLinkProps} />
              </span>
              <span className="inline-flex items-center whitespace-nowrap before:mx-2.5 before:opacity-60 before:content-['-']">
                <Link
                  text="Apache License 2.0"
                  path="https://www.apache.org/licenses/LICENSE-2.0"
                  {...releaseLinkProps}
                />
              </span>
            </p>
          </div>

          <div className="min-w-0 flex flex-col justify-end self-end pb-12 md:col-span-5 md:pb-0 lg:col-span-5 xl:col-span-5">
            <div className="mb-4 flex flex-col items-start md:items-end">
              <h3 className="mb-2 text-sm font-semibold tracking-wide text-white/90 uppercase dark:text-gray-100">
                {platforms[0]}
              </h3>
              <ul className="flex items-center gap-3 lg:gap-4">
                {platforms.slice(1).map((icon, index) => {
                  return (
                    <li key={index}>
                      <Icon icon={icon} className="text-2xl lg:text-3xl text-white/90 transition hover:text-white dark:text-gray-100" />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="hidden justify-end md:flex w-full">
              <img
                src={image.path}
                alt={image.alt}
                className="w-full max-h-[380px] xl:max-h-[460px] object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      <WaveBorder
        className="pointer-events-none absolute bottom-0 left-0 z-10 w-full h-10 sm:h-14 md:h-16 lg:h-20 xl:h-24"
        preserveAspectRatio="none"
      />
    </header>
  );
}

export default HeroHeader;
