import React from 'react';
import { Icon } from '@iconify/react';

export type IconLinkProps = Link & {
  textLogo?: string;
  icon?: string;
  image?: Image;
};

function IconLink({ text, path, icon, image, textLogo }: IconLinkProps) {
  return (
    <a href={path} className="mx-auto flex flex-col items-center text-center">
      <div className="max-w-fit rounded-full bg-white p-8 shadow-sm  dark:bg-gray-900">
        {icon ? (
          <Icon icon={icon} className="text-5xl" />
        ) : textLogo ? (
          <span className="block py-2 font-display text-4xl font-extrabold">{textLogo}</span>
        ) : (
          <img src={image.path} alt={image.alt} className="w-16" />
        )}
      </div>
      <span className="underline-offset-6 duration-149 mt-4 block text-blue-700 underline transition ease-linear hover:text-blue-900">
        {text}
      </span>
    </a>
  );
}

export default IconLink;
