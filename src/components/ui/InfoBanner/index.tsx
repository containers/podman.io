import React from 'react';
import { Icon } from '@iconify/react';
import Markdown from '@site/src/components/utilities/Markdown';
type BannerProps = HeaderProps & {
  image?: {
    src: string;
    alt: string;
  };
  icon?: string;
  bgColor?: string;
  titleColor?: string;
  marginHeight?: string;
};
function InfoBanner({
  title,
  description,
  image,
  icon,
  bgColor = 'from-blue-700 via-blue-700 to-blue-900 dark:from-blue-500  dark:to-blue-700',
  titleColor = 'text-purple-700 dark:text-purple-500',
  marginHeight = 'mt-8 lg:mt-16',
}: BannerProps): JSX.Element {
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

        {title ? (
          <div className="mx-auto text-center md:text-start lg:pl-4">
            <h3 className={`mx-auto mb-4 text-3xl font-bold ${titleColor}`}>{title}</h3>
            <Markdown text={description} styles="mx-auto max-w-4xl leading-relaxed text-gray-700" />
          </div>
        ) : (
          <Markdown text={description} styles="mx-auto leading-relaxed" />
        )}
      </div>
    </section>
  );
}

export default InfoBanner;
