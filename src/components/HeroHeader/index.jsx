import React from 'react';
import heroImage from '@site/static/images/optimized/podman-ui-679w-592h.webp';
import { Icon } from '@iconify/react';
import Button from '@site/src/components/Button';
import Link from '@site/src/components/Link';
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

const Image = ({ grid, display, layout }) => {
  return (
    <div className={`${grid} ${display} ${layout} container`}>
      <img src={heroImage} alt="Screenshots of podman ui" className="w-5/6 lg:w-4/6" />
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
const SvgBorder = ({ grid, layout, lightFill = 'fill-white', darkFill = 'dark:fill-[#1b1b1d]' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${grid} ${layout}`} width="100%" viewBox="-8620 -1968 1400 160">
      <path
        className={`${lightFill} ${darkFill}`}
        d="M-8629-1935v-10.614s78.25-20.752 155.47-20.752c131.788 0 169.95 23.309 233.125 23.309 108.108 0 138.56-21.268 208.573-21.268s108.701 25.151 233.283 25.151c124.581 0 120.881-43.085 251.082-22.031 112.227 18.148 187.023 22.031 264.45 7.825 76.957-14.12 79.117 14.113 79.014 18.38l.003 258h-1425v-258Z"
      />
    </svg>
  );
};

export default function HeroHeader({ title, subtitle }) {
  return (
    <header className="bg-blue-700 dark:bg-blue-900">
      <div className=" grid md:grid-cols-2 md:gap-4">
        <TextBox
          title={title}
          subtitle={subtitle}
          grid="row-span-2 self-center 2xl:self-start"
          layout="mt-20 md:mt-0 2xl:mt-24 mb-4 lg:ml-20 lg:mb-0"
        />
        <PlatformIcons
          grid=""
          layout="md:mt-16 lg:mt-24 md:mx-8 md:ml-12 lg:ml-24 xl:ml-0 2xl:ml-10 md:w-80 lg:w-auto lg:max-w-md"
          display="flex flex-col items-end md:items-start xl:items-center"
        />
        <Image
          grid="md:col-start-2 md:row-start-2 md:row-span-2 self-end"
          display="flex justify-end md:justify-center"
          layout="lg:mb-12"
        />
        <SvgBorder grid="col-span-full md:row-start-3" layout="-mt-12" />
      </div>
    </header>
  );
}
