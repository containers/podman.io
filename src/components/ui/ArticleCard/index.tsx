import React from 'react';
import { Icon } from '@iconify/react';
import parse from 'html-react-parser';
type ArticleCardProps = {
  title: string;
  subtitle: string;
  display_name: string;
  author_link: string;
  date: string;
  imgSrc?: string;
  altLayout?: boolean;
  path: string;
  index?: number;
};

const FALLBACK_IMAGES = [
  '/images/raw/characters/seal-diving.png',
  '/images/raw/characters/seals-swimming.png',
  '/images/raw/characters/confused-seal.png',
  '/images/raw/podman-selkie-385w-358h.png',
];

const PublishDate = ({ date, styles }: { date: string; styles?: string }) => {
  return (
    <div
      className={`${styles} flex h-fit max-w-fit items-center gap-1 rounded-full border border-white/60 bg-white/80 px-2.5 py-1 text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/80 dark:text-gray-300`}>
      <Icon icon="mdi:calendar-blank-outline" className="text-xs text-purple-700 dark:text-purple-300" />
      <p className="text-xs font-semibold">{date}</p>
    </div>
  );
};

function ArticleCard(props: ArticleCardProps) {
  // Select fallback image based on index, cycling through available images
  const fallbackImage = FALLBACK_IMAGES[(props.index || 0) % FALLBACK_IMAGES.length];

  // Sanitizes HTML and converts it to plain text
  const sanitizeHtml = (html: string) => {
    if (!html) return html;
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };
  const abbrSubtitle = sanitizeHtml(props.subtitle).trim().split(' ').slice(0, 32).join(' ').concat('...');

  const TitleLink = ({ className }: { className?: string }) => (
    <h3 className={`text-lg font-bold leading-snug text-gray-900 dark:text-white ${className ?? ''}`}>
      <a
        href={props.path}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-900 no-underline transition duration-150 ease-linear hover:text-purple-700 hover:no-underline dark:text-white dark:hover:text-purple-300">
        {sanitizeHtml(props.title)}
      </a>
    </h3>
  );

  const Byline = () => (
    <div className="flex items-center gap-2">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300">
        <Icon icon="mdi:account" className="text-sm" />
      </span>
      <a
        href={props.author_link}
        className="text-sm text-gray-500 no-underline transition duration-150 ease-linear hover:text-purple-700 hover:no-underline dark:text-gray-300 dark:hover:text-purple-300">
        {props.display_name}
      </a>
    </div>
  );

  if (props.altLayout) {
    return (
      <article className="group my-4 flex max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10 dark:border-white/10 dark:bg-gray-900 dark:hover:border-purple-500/30 dark:hover:shadow-purple-900/20 sm:grid sm:grid-cols-2">
        <div className="relative aspect-[16/10] w-full self-center overflow-hidden sm:aspect-square">
          <img
            src={props.imgSrc || fallbackImage}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <PublishDate date={props.date} styles="absolute left-3 top-3 z-10" />
        </div>
        <div className="flex flex-col justify-center gap-3 p-6">
          <TitleLink />
          <div className="line-clamp-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {parse(abbrSubtitle)}
          </div>
          <Byline />
        </div>
      </article>
    );
  }
  // Normal Layout
  return (
    <article className="group mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10 dark:border-white/10 dark:bg-gray-900 dark:hover:border-purple-500/30 dark:hover:shadow-purple-900/20">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={props.imgSrc || fallbackImage}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <PublishDate date={props.date} styles="absolute left-3 top-3 z-10" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <TitleLink className="line-clamp-2" />
        <div className="line-clamp-3 flex-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {parse(abbrSubtitle)}
        </div>
        <div className="mt-1 border-t border-gray-100 pt-3 dark:border-white/10">
          <Byline />
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
