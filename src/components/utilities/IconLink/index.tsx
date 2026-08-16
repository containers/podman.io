import React from 'react';
import { Icon } from '@iconify/react';

export type IconLinkProps = Link & {
  textLogo?: string;
  icon?: string;
  image?: Image;
  invertInDark?: boolean;
  description?: string;
  linkText?: string;
  accentColor?: string;
};

function IconLink({
  text,
  path,
  icon,
  image,
  textLogo,
  invertInDark,
  description,
  linkText,
  accentColor = 'text-blue-700 dark:text-blue-500',
}: IconLinkProps) {
  return (
    <a
      href={path}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col items-center gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 text-center no-underline shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-purple-300 hover:no-underline hover:shadow-xl hover:shadow-purple-500/10 dark:border-white/10 dark:bg-gray-900 dark:hover:border-purple-500/30 dark:hover:shadow-purple-900/20">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-blue-500 via-purple-500 to-purple-700 transition-transform duration-300 ease-out group-hover:scale-x-100" />
      <div
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-3xl shadow-sm ring-1 ring-black/5 transition-transform duration-300 ease-out group-hover:scale-110 dark:bg-white/5 dark:ring-white/10 ${accentColor}`}>
        {icon ? (
          <Icon icon={icon} className="text-3xl" />
        ) : textLogo ? (
          <span className="font-display text-lg font-extrabold text-gray-900 dark:text-gray-50">{textLogo}</span>
        ) : (
          <img src={image.path} alt={image.alt} className={`w-9 ${invertInDark ? 'dark:invert' : ''}`} />
        )}
      </div>
      <div className="flex flex-1 flex-col items-center">
        <h3 className="font-bold text-gray-900 dark:text-gray-50">{text}</h3>
        {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{description}</p>}
      </div>
      <span
        className={`mt-auto inline-flex items-center gap-1.5 font-semibold transition-all duration-200 ease-out group-hover:gap-2.5 ${accentColor}`}>
        {linkText ?? text}
        <Icon icon="mdi:arrow-right" className="text-base transition-transform duration-200 ease-out" />
      </span>
    </a>
  );
}

export default IconLink;
