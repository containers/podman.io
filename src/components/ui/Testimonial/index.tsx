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

function Testimonial(props: TestimonialProps) {
  return (
    <article className="mx-2 my-4 flex max-w-sm flex-col rounded-sm bg-white p-4 shadow-lg dark:bg-gray-900">
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
        <div className="order-first">
          <img src={`${props.avatar}`} alt="user avatar" className="h-fit max-h-16 w-fit max-w-16 rounded-full" />
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
