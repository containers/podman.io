import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import TerminalCard from '@site/src/components/utilities/TerminalCard';
import tabData from './data';

const tabIcons: Record<string, string> = {
  Find: 'mdi:magnify',
  Run: 'mdi:play-circle-outline',
  Build: 'mdi:hammer-wrench',
  Share: 'mdi:share-variant-outline',
};

const Tab = (props): JSX.Element => {
  const { label, method, isActive } = props;
  return (
    <button
      onClick={method}
      className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition duration-150 ease-linear ${
        isActive
          ? 'bg-gradient-to-br from-purple-500 to-purple-700 text-white dark:from-purple-700 dark:to-purple-900'
          : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-500 dark:hover:text-white'
      }`}>
      <Icon icon={tabIcons[label]} className="text-base" />
      {label}
    </button>
  );
};
const TabContent = (props): JSX.Element => {
  const { title, commands, terminal, description, isActive } = props;
  return (
    <>
      <div className="mx-auto my-16 flex w-full max-w-6xl flex-wrap items-center justify-center gap-8 px-4">
        <div className="max-w-sm">
          <h3 className="text-3xl text-white dark:text-white">{title}</h3>
          <ul className="my-6 flex flex-col gap-2">
            {commands.map((command, index) => (
              <li
                key={index}
                className="inline-flex w-fit items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 font-mono text-sm text-blue-100 ring-1 ring-white/15">
                <Icon icon="mdi:chevron-right" className="shrink-0 text-xs text-purple-300" />
                {command}
              </li>
            ))}
          </ul>
          <p className="text-white/90 dark:text-white/90">{description}</p>
        </div>
        <div className={`w-full max-w-[500px] ${isActive % 2 === 1 && 'md:order-first'}`}>
          <TerminalCard>{terminal}</TerminalCard>
        </div>
      </div>
    </>
  );
};

function FeaturesCarousel() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // render content
  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="relative z-10 mx-auto -mb-8 flex w-full max-w-3xl flex-wrap justify-center gap-3 px-4">
        {/* Loop through Tab data and generate tab buttons for each */}
        {tabData.map((tab, index) => {
          return (
            <Tab {...tab} method={() => setActiveTabIndex(index)} isActive={activeTabIndex === index} key={index} />
          );
        })}
      </div>
      <section className="bg-gradient-to-br from-purple-300 via-purple-700 to-purple-900 py-10 dark:from-purple-900 dark:via-purple-900 dark:to-gray-900 md:py-16">
        <div className="mx-auto flex min-h-[540px] w-full max-w-6xl items-center justify-between px-4">
          <button
            type="button"
            className="shrink-0"
            onClick={() => setActiveTabIndex(activeTabIndex > 0 ? activeTabIndex - 1 : tabData.length - 1)}
            aria-label="Previous feature">
            <Icon
              icon="fa-solid:arrow-circle-left"
              className="text-3xl text-white transition duration-150 ease-linear hover:opacity-50 dark:hover:opacity-50"
            />
          </button>
          <TabContent {...tabData[activeTabIndex]} isActive={activeTabIndex} />
          <button
            type="button"
            className="shrink-0"
            onClick={() => setActiveTabIndex(activeTabIndex < 3 ? activeTabIndex + 1 : 0)}
            aria-label="Next feature">
            <Icon
              icon="fa-solid:arrow-circle-right"
              className="text-3xl text-white transition duration-150 ease-linear hover:opacity-50 dark:hover:opacity-50"
            />
          </button>
        </div>
      </section>
    </section>
  );
}

export default FeaturesCarousel;
