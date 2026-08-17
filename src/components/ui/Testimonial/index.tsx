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

function Avatar({ src, name }: { src: string; name: string }) {
  const [broken, setBroken] = React.useState(false);
  const initials = name
    .replace(/[^\p{L} ]/gu, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word[0])
    .join('');

  if (broken) {
    return (
      <div
        aria-label={`${name} avatar`}
        role="img"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 text-xl font-bold text-white">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${name} avatar`}
      onError={() => setBroken(true)}
      ref={img => {
        if (img && img.complete && img.naturalWidth === 0) setBroken(true);
      }}
      className="h-16 w-16 rounded-full object-cover"
    />
  );
}

function Testimonial(props: TestimonialProps) {
  return (
    <article className="my-4 flex max-w-xs flex-col rounded-sm bg-white p-4 shadow-lg dark:bg-gray-900">
      <div className="mb-4 flex items-center gap-3">
        <div className="m-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">{props.name}</h3>
            <Icon icon={`logos:${props.social}`} className="text-2xl" />
          </div>
          <a
            href={props.path}
            className="text-gray-700 no-underline hover:bg-purple-300 hover:no-underline dark:text-gray-100 dark:hover:text-purple-900">
            {props.handle}
          </a>
        </div>
        <div className="order-first shrink-0">
          <Avatar src={props.avatar} name={props.name} />
        </div>
      </div>
      <div className="mb-4 mt-2 truncate">
        <p className="mb-2 whitespace-normal leading-snug text-gray-900 dark:text-gray-300">{props.description}</p>
        {props.featuredlink && (
          <a target="_blank" href={props.featuredlink}>
            {props.featuredlink}
          </a>
        )}
      </div>
      <div className="mt-auto self-start italic text-gray-300 dark:text-gray-700">
        <a
          href={props.path}
          className="text-gray-300 no-underline hover:bg-purple-300 hover:no-underline dark:text-gray-700 dark:hover:text-gray-700">
          {props.date}
        </a>
      </div>
    </article>
  );
}

export default Testimonial;
