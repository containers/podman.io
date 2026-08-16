import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Icon } from '@iconify/react';
import Button from '@site/src/components/utilities/Button';
import DropdownButton from '@site/src/components/utilities/DropdownButton';
import WaveBorder from '@site/src/components/shapes/WaveBorder';
import operatingSystemData from './installOptions';
import { detectOperatingSystem } from '@site/src/lib/detectOperatingSystem';
type InstallOptionProps = Card & {
  icon: string;
  option?: React.ReactNode;
  path: string;
  third?: { title: string; subtitle: string; icon: string; path: string };
  other?: { path: string; text: string; subtext: string };
};

function returnOperatingSystemData() {
  const os = operatingSystemData.find(os => os.id === detectOperatingSystem());
  return { os };
}

const InstallOptionRow = ({
  title,
  subtitle,
  icon,
  path,
}: {
  title: string;
  subtitle: string;
  icon: string;
  path: string;
}): JSX.Element => (
  <a
    href={path}
    className="group flex items-center gap-4 px-4 py-3.5 no-underline transition duration-150 ease-linear hover:bg-purple-50 hover:no-underline dark:hover:bg-purple-500/10">
    <span className="dark:text-purple-400 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-50 text-xl text-purple-700 transition duration-150 ease-linear group-hover:bg-purple-700 group-hover:text-white dark:bg-purple-500/10 dark:group-hover:bg-purple-500 dark:group-hover:text-white">
      <Icon icon={icon} />
    </span>
    <div className="min-w-0">
      <h4 className="truncate text-sm font-semibold text-gray-900 dark:text-gray-50">{title}</h4>
      <p className="truncate text-xs text-gray-500 dark:text-gray-300">{subtitle}</p>
    </div>
  </a>
);

const InstallOption = (props): JSX.Element => {
  if (!props) {
    props = operatingSystemData[0];
  }
  return (
    <section className="w-80">
      <div className="divide-y divide-gray-100 py-1 dark:divide-gray-700">
        <InstallOptionRow {...props.preferred} />
        <InstallOptionRow {...props.alt} />
        {props.third && <InstallOptionRow {...props.third} />}
      </div>
      <a
        href={props.other.path}
        className="flex items-center justify-between gap-2 border-t border-gray-100 bg-gray-50 px-4 py-3 no-underline transition duration-150 ease-linear hover:bg-purple-50 hover:no-underline dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-purple-500/10">
        <div className="min-w-0">
          <h5 className="dark:text-purple-400 truncate text-sm font-semibold text-purple-700">{props.other.text}</h5>
          {props.other.subtext && (
            <p className="truncate text-xs text-gray-500 dark:text-gray-300">{props.other.subtext}</p>
          )}
        </div>
        <Icon icon="mdi:arrow-right" className="dark:text-purple-400 shrink-0 text-lg text-purple-700" />
      </a>
    </section>
  );
};

const VersionBadge = ({ icon, text, path }: { icon: string; text: string; path: string }): JSX.Element => (
  <a
    href={path}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-sm font-medium text-white no-underline transition duration-150 ease-linear hover:border-white/40 hover:bg-white/20 hover:text-white hover:no-underline">
    <Icon icon={icon} className="text-sm" />
    {text}
  </a>
);

function HeroHeader({ title, subtitle, podmanrelease, desktoprelease, image, platforms, platformsLabel }) {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-700 dark:from-blue-700 dark:to-purple-900">
      <div className="mx-auto grid px-4 sm:px-6 md:grid-cols-2 md:gap-12 xl:mx-20">
        <div className="container row-span-2 mb-4 mt-12 place-self-end md:mb-0 md:ml-10 xl:ml-24">
          <h1 className="mb-4 text-white dark:text-gray-50 lg:mb-8">{title}</h1>
          <p className="max-w-sm text-white dark:text-gray-50 lg:max-w-prose">{subtitle}</p>
          <div className="my-3 flex max-w-sm gap-8 text-lg">
            <Button as="link" text="Get Started" path="/get-started" />
            <BrowserOnly>
              {() => {
                const { os } = returnOperatingSystemData();
                return <DropdownButton text="Download" option={InstallOption(os)} />;
              }}
            </BrowserOnly>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <VersionBadge icon="simple-icons:podman" text={`Podman ${podmanrelease.text}`} path={podmanrelease.path} />
            <VersionBadge icon="ph:desktop-fill" text={`Desktop ${desktoprelease.text}`} path={desktoprelease.path} />
            <VersionBadge icon="ph:scales-fill" text="Apache 2.0" path="https://www.apache.org/licenses/LICENSE-2.0" />
          </div>
        </div>

        <div className="container mx-auto flex flex-col justify-end self-end md:col-start-2 md:row-span-3 lg:row-span-2 lg:row-start-2">
          <div className="container mb-12 flex flex-col items-start md:mb-0 md:max-w-lg lg:max-w-full lg:items-end 2xl:pr-8">
            <h3 className="text-base font-medium text-white dark:text-gray-100">{platformsLabel}</h3>
            <ul className="flex gap-4">
              {platforms.map(platform => {
                return (
                  <li key={platform.label}>
                    <a
                      href={platform.path}
                      aria-label={platform.label}
                      className="block rounded-full p-1 text-white no-underline transition duration-150 ease-linear hover:-translate-y-0.5 hover:text-purple-300 hover:no-underline dark:text-gray-100">
                      <Icon icon={platform.icon} className="text-3xl" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="hidden justify-end md:flex lg:mb-12 lg:w-[510px] 2xl:w-full">
            <img src={image.path} alt={image.alt} className="object-cover" />
          </div>
        </div>
      </div>
      <WaveBorder grid="lg:-mt-44" />
    </header>
  );
}

export default HeroHeader;
