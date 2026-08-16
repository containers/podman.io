import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Button from '@site/src/components/utilities/Button';
import operatingSystemData from '@site/src/components/layout/HeroHeader/installOptions';
import { detectOperatingSystem, osLabels, osIcons, type OperatingSystemId } from '@site/src/lib/detectOperatingSystem';

type DownloadOption = {
  title: string;
  subtitle: string;
  icon: string;
  path: string;
};

function DownloadCard({ option }: { option: DownloadOption }): JSX.Element {
  return (
    <div className="hover:border-purple-200 group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 ease-linear hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:hover:border-purple-700">
      <span className="dark:text-purple-400 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 text-2xl text-purple-700 transition duration-200 ease-linear group-hover:bg-purple-700 group-hover:text-white dark:bg-purple-500/15 dark:group-hover:bg-purple-500 dark:group-hover:text-white">
        <Icon icon={option.icon} />
      </span>
      <div className="flex-1">
        <h4 className="text-gray-900 dark:text-gray-50">{option.title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-300">{option.subtitle}</p>
      </div>
      <Button as="link" path={option.path} text="Download" />
    </div>
  );
}

function PlatformSection({
  os,
  highlighted = false,
}: {
  os: (typeof operatingSystemData)[number];
  highlighted?: boolean;
}): JSX.Element {
  const options: DownloadOption[] = [os.preferred, os.alt, ...('third' in os && os.third ? [os.third] : [])];

  return (
    <section
      className={`overflow-hidden rounded-2xl border p-6 transition duration-200 ease-linear lg:p-8 ${
        highlighted
          ? 'border-purple-300 bg-purple-50/50 shadow-md dark:border-purple-700 dark:bg-purple-900/10'
          : 'border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/25'
      }`}>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl ${
            highlighted
              ? 'bg-purple-700 text-white dark:bg-purple-500'
              : 'dark:text-purple-400 bg-white text-purple-700 shadow-sm dark:bg-gray-900'
          }`}>
          <Icon icon={osIcons[os.id as OperatingSystemId]} />
        </span>
        <h3 className="text-gray-900 dark:text-gray-50">{osLabels[os.id as OperatingSystemId]}</h3>
        {highlighted && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-700 px-3 py-1 text-xs font-semibold text-white dark:bg-purple-500">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Recommended for your system
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {options.map((option, index) => (
          <DownloadCard key={index} option={option} />
        ))}
      </div>
      <a
        href={os.other.path === '/downloads' ? '/docs/installation' : os.other.path}
        className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700 no-underline hover:text-purple-900 hover:no-underline dark:text-purple-500 dark:hover:text-purple-300">
        More install options for {osLabels[os.id as OperatingSystemId]}
        <Icon
          icon="mdi:arrow-right"
          className="transition-transform duration-150 ease-linear group-hover:translate-x-1"
        />
      </a>
    </section>
  );
}

function DownloadsGrid(): JSX.Element {
  const [detectedOs, setDetectedOs] = useState<OperatingSystemId | null>(null);

  useEffect(() => {
    setDetectedOs(detectOperatingSystem());
  }, []);

  const orderedOs = detectedOs
    ? [...operatingSystemData].sort((a, b) => (a.id === detectedOs ? -1 : b.id === detectedOs ? 1 : 0))
    : operatingSystemData;

  return (
    <div className="container flex flex-col gap-8 pb-16 lg:pb-24">
      {orderedOs.map(os => (
        <PlatformSection key={os.id} os={os} highlighted={os.id === detectedOs} />
      ))}
    </div>
  );
}

export default DownloadsGrid;
