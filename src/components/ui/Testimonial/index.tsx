import React from 'react';
import { Icon } from '@iconify/react';

type TestimonialProps = {
  name: string;
  handle: string;
  description: string;
  social: string;
  path: string;
  date: string;
  avatar: string;
  featuredlink?: string;
};

const AVATAR_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%23A5A0B1'/%3E%3Ccircle cx='24' cy='19' r='8' fill='%23F7F6F9'/%3E%3Cpath d='M8 42c2-10 10-16 16-16s14 6 16 16' fill='%23F7F6F9'/%3E%3C/svg%3E";

function Testimonial(props: TestimonialProps) {
  return (
    <article className="group relative mx-2 my-4 flex w-80 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10 dark:border-white/10 dark:bg-gray-900/90 dark:hover:border-purple-500/30 dark:hover:shadow-purple-900/20">
      <Icon
        icon="mdi:format-quote-close"
        className="pointer-events-none absolute -right-3 -top-3 text-8xl text-purple-50 transition-colors duration-300 group-hover:text-purple-100 dark:text-white/5 dark:group-hover:text-white/10"
      />
      <div className="relative z-10 mb-4 flex items-center gap-3">
        <div className="relative shrink-0">
          <img
            src={props.avatar}
            alt="user avatar"
            className="h-12 w-12 rounded-full object-cover shadow-sm ring-2 ring-white dark:ring-gray-700"
            onError={e => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = AVATAR_FALLBACK;
            }}
          />
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100 dark:bg-gray-700 dark:ring-white/10">
            <Icon icon={`logos:${props.social}`} className="text-[0.65rem]" />
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold leading-tight text-gray-900 dark:text-white">{props.name}</h3>
          <a
            href={props.path}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate text-sm text-gray-500 no-underline transition duration-150 ease-linear hover:text-purple-700 hover:no-underline dark:text-gray-300 dark:hover:text-purple-300">
            {props.handle}
          </a>
        </div>
      </div>
      <p className="relative z-10 mb-3 line-clamp-4 flex-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {props.description}
      </p>
      {props.featuredlink && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={props.featuredlink}
          className="relative z-10 mb-3 truncate rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 no-underline hover:no-underline dark:bg-blue-500/10 dark:text-blue-300">
          {props.featuredlink}
        </a>
      )}
      <a
        href={props.path}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 mt-auto flex items-center gap-1 self-start border-t border-gray-100 pt-3 text-xs font-medium text-gray-500 no-underline transition duration-150 ease-linear hover:text-purple-700 hover:no-underline dark:border-white/10 dark:text-gray-500 dark:hover:text-purple-300">
        <Icon icon="mdi:calendar-blank-outline" className="text-sm" />
        {props.date}
      </a>
    </article>
  );
}

export default Testimonial;
