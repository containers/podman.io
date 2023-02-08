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
      <p className="max-w-sm text-white dark:text-gray-100 lg:max-w-3xl">{subtitle}</p>
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
    <header className="bg-blue-700 dark:bg-blue-900">
      <div className="grid md:grid-cols-2 md:gap-8">
        <TextBox
          title={title}
          subtitle={subtitle}
          grid="row-span-2 row-start-1  place-self-center"
          layout="mb-4 lg:ml-24 lg:mb-0"
        />
        <div className="row-span-2 self-end md:col-start-2 md:row-start-2 lg:mr-24">
          <PlatformIcons layout="max-w-lg" display="flex flex-col items-end md:items-start" />
          <Image display="flex justify-end" layout="lg:mb-12" />
        </div>
        <WaveBorder grid="col-span-full row-start-3" layout="" />
      </div>
    </header>
  );
}
