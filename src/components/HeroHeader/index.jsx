import React from 'react';
import heroImage from '@site/static/images/optimized/podman-ui-679w-592h.webp';
import { Icon } from '@iconify/react';
import Button from '@site/src/components/Button';
import Link from '@site/src/components/Link';
import WaveBorder from '@site/src/components/svgShapes/WaveBorder';
const latestVersion = '4.3.0';
const TextBox = ({ grid, display, layout, title, subtitle }) => {
  return (
    <div className={`${grid} ${display} ${layout} container`}>
      <h1 className="mb-4 text-white dark:text-gray-100 lg:mb-8">{title}</h1>
      <p className="max-w-sm text-white dark:text-gray-100 lg:max-w-prose">{subtitle}</p>
      <Buttons layout="flex  max-w-sm gap-8 my-3" />
      <p className="flex gap-4 text-white dark:text-gray-100">
        <span>
          Latest stable <Link text="v4.3.0" textColor="text-white dark:text-gray-100" />
        </span>
        <span>-</span>
        <Link text="Apache License 2.0" textColor="text-white dark:text-gray-100"></Link>
      </p>
    </div>
  );
};

const Buttons = ({ grid, display, layout, buttonOne, buttonTwo }) => {
  return (
    <div className={`${grid} ${display} ${layout}`}>
      <Button text="Get Started" />
      <Button text="Downloads" bgColor="bg-white" textColor="text-purple-700" />
    </div>
  );
};

const PlatformIcons = ({ grid, display, layout }) => {
  return (
    <div className={` ${grid} ${display} ${layout} container`}>
      <h3 className=" text-base font-medium text-white dark:text-gray-100">Supported platforms</h3>
      <ul className="flex gap-4">
        <li>
          <Icon icon="fa6-brands:redhat" className="text-3xl text-white dark:text-gray-100" />
        </li>
        <li>
          <Icon icon="fa6-brands:apple" className="text-3xl text-white dark:text-gray-100" />
        </li>
        <li>
          <Icon icon="fa6-brands:microsoft" className="text-3xl text-white dark:text-gray-100" />
        </li>
        <li>
          <Icon icon="fa6-brands:linux" className="text-3xl text-white dark:text-gray-100" />
        </li>
      </ul>
    </div>
  );
};

const Image = ({ grid, display, layout }) => {
  return (
    <div className={`${grid} ${display} ${layout}`}>
      <img src={heroImage} alt="Screenshots of podman ui" className="" />
    </div>
  );
};

export default function HeroHeader({ title, subtitle }) {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900">
      <div className="grid md:grid-cols-2 md:gap-12">
        <TextBox
          title={title}
          subtitle={subtitle}
          grid="row-span-2 place-self-center"
          layout="mt-12 mb-4 md:ml-10 xl:ml-24 md:mb-0"
        />
        <div className="self-end md:col-start-2 md:row-span-3 lg:row-span-2 lg:row-start-2 lg:mr-24">
          <PlatformIcons layout="md:max-w-lg lg:max-w-full mb-12 md:mb-0" display="flex flex-col" />
          <Image display="hidden md:block flex justify-end" layout="-mb-24 lg:mb-12" />
        </div>
        <WaveBorder grid="col-span-full lg:row-start-3" layout="" />
      </div>
    </header>
  );
}
