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
  other?: { path: string; text: string; subtext: string };
};

const detectOperatingSystem = () => {
  const userAgent = window.navigator.userAgent.toLowerCase().split(' ');
  if (userAgent.find(item => item.includes('windows'))) {
    return 'windows';
  } else if (userAgent.find(item => item.includes('macintosh'))) {
    if (userAgent.find(item => item.includes('intel'))){
      return 'mac_amd';
    }
    return 'mac_arm';
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
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-700 dark:from-blue-700 dark:to-purple-900">
      <div className="mx-auto grid md:grid-cols-2 md:gap-12 xl:mx-20">
        <div className="container row-span-2 mb-4 mt-12 place-self-end md:mb-0 md:ml-10 xl:ml-24">
          <h1 className="mb-4 text-white dark:text-gray-50 lg:mb-8">{title}</h1>
          <p className="max-w-sm text-white dark:text-gray-50 lg:max-w-prose">{subtitle}</p>
          <div className="my-3 flex max-w-sm gap-8 text-lg">
            <Button as="link" text="Get Started" path="/get-started" />
            <BrowserOnly>
              {() => <DropdownButton text="Download" option={InstallOption(returnOperatingSystemData())} />}
            </BrowserOnly>
          </div>
          <p className="flex gap-4 text-white dark:text-gray-100">
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

        <div className="container mx-auto flex flex-col justify-end self-end md:col-start-2 md:row-span-3 lg:row-span-2 lg:row-start-2">
          <div className="container mb-12 flex flex-col items-start md:mb-0 md:max-w-lg lg:max-w-full lg:items-end 2xl:pr-8">
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
          <div className="z-10 hidden justify-end md:flex lg:mb-12 lg:w-[510px] 2xl:w-full">
            <img src={image.path} alt={image.alt} className="object-cover" />
          </div>
        </div>
      </div>
      <WaveBorder grid="lg:-mt-44" />
    </header>
  );
}

export default HeroHeader;
