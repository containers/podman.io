import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Icon } from '@iconify/react';

export default function InfoBanner({
  title,
  description,
  image,
  icon,
  bgColor = 'bg-blue-500/25 dark:bg-blue-900',
  titleColor = 'text-purple-700 dark:text-purple-500',
  marginHeight = 'mt-8 lg:mt-16',
}) {
  return (
    <section className={`${bgColor} ${marginHeight} mx-auto w-full`}>
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4 py-4 md:py-8 lg:gap-8 xl:max-w-fit">
        <div>
          {icon ? (
            <Icon icon={icon} className="text-4xl text-white dark:text-gray-50" />
          ) : image ? (
            <img src={image.src} alt={image.alt} />
          ) : (
            <p>No image or icon</p>
          )}
        </div>
        {/* change layout whether or not there is a title */}
        {title ? (
          <div className="mx-auto text-center md:text-start lg:pl-4">
            <h3 className={`mx-auto mb-4 text-3xl font-bold ${titleColor}`}>{title}</h3>
            <ReactMarkdown children={description} className={`mx-auto max-w-4xl leading-relaxed text-gray-700`} />
          </div>
        ) : (
          <ReactMarkdown children={description} className={`mx-auto leading-relaxed`} />
        )}
      </div>
    </section>
  );
}
