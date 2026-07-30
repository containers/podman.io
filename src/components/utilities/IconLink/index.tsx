import React from 'react';
import { Icon } from '@iconify/react';

export type IconLinkProps = Link & {
  textLogo?: string;
  icon?: string;
  image?: Image;
};

function IconLink({ text, path, icon, image, textLogo }: IconLinkProps) {
  return (
    <a
      href={path}
      className="group mx-auto flex flex-col items-center text-center no-underline transition-transform duration-200 ease-out hover:-translate-y-1 hover:no-underline">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-gray-900 shadow-sm ring-2 ring-transparent transition-all duration-200 ease-out group-hover:bg-purple-50 group-hover:text-purple-700 group-hover:shadow-lg group-hover:shadow-purple-500/30 group-hover:ring-purple-300 dark:bg-gray-700 dark:text-white dark:ring-1 dark:ring-white/10 dark:group-hover:bg-purple-700 dark:group-hover:text-white dark:group-hover:shadow-lg dark:group-hover:shadow-purple-500/40 dark:group-hover:ring-purple-300">
        {icon ? (
          <Icon icon={icon} className="text-5xl" />
        ) : textLogo ? (
          <span className="block font-display text-4xl font-extrabold">{textLogo}</span>
        ) : (
          <img src={image.path} alt={image.alt} className="w-16" />
        )}
      </div>
      <span className="mt-4 block text-blue-700 no-underline transition-colors duration-200 ease-out group-hover:text-purple-700 dark:text-blue-300 dark:group-hover:text-purple-300">
        {text}
      </span>
    </a>
  );
}

export default IconLink;
