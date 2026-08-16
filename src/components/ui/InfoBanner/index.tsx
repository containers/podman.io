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
  styles?: string;
};
function InfoBanner({
  title,
  description,
  image,
  styles = '',
  icon,
  bgColor,
  titleColor = 'text-white',
  marginHeight = 'mt-8 lg:mt-16',
}: BannerProps): JSX.Element {
  // A gradient's `background-image` always paints over a flat `background-color`,
  // so a caller-supplied `bg-*` in `styles` would silently lose to this default —
  // only fall back to the brand gradient when the caller hasn't set their own background.
  // (Previously this default also omitted `bg-gradient-to-r`, so `from-*`/`via-*`/`to-*`
  // never rendered as a gradient at all — the banner had no visible background.)
  const hasCustomBackground = /(^|\s)bg-/.test(styles);
  const resolvedBgColor =
    bgColor ??
    (hasCustomBackground ? '' : 'bg-gradient-to-r from-blue-500 to-purple-700 dark:from-blue-700 dark:to-purple-900');

  return (
    <section className={`${styles} ${resolvedBgColor} ${marginHeight} mx-auto w-full shadow-inner`}>
      <div className="container mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 py-10 text-center md:py-14 lg:flex-row lg:gap-8 lg:text-start">
        <div className="shrink-0">
          {icon ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
              <Icon icon={icon} className="text-4xl text-white" />
            </div>
          ) : image ? (
            <img src={image.src} alt={image.alt} />
          ) : (
            <p>No image or icon</p>
          )}
        </div>

        {title ? (
          <div>
            <h3 className={`mb-2 text-3xl font-bold ${titleColor}`}>{title}</h3>
            <Markdown text={description} styles="leading-relaxed text-blue-50" />
          </div>
        ) : (
          <Markdown text={description} styles="leading-relaxed text-blue-50" />
        )}
      </div>
    </section>
  );
}

export default InfoBanner;
