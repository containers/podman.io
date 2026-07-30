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
    <article className="flex flex-col mx-2 my-4 min-w-[280px] max-w-sm rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-purple-500/40 dark:hover:shadow-purple-500/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="m-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">{props.name}</h3>
            <Icon icon={`logos:${props.social}`} className="text-2xl" />
          </div>
          <a href={props.path} className=" text-gray-700 dark:text-gray-100 dark:hover:text-purple-900 no-underline hover:no-underline hover:bg-purple-300">
            {props.handle}
          </a>
        </div>
        <div className="order-first">
          <img src={`${props.avatar}`} alt="user avatar" className="h-fit w-fit max-w-16 max-h-16 rounded-full" />
        </div>
      </div>
      <div className="mt-2 mb-4 truncate">
        <p className="whitespace-normal text-gray-900 dark:text-gray-300 leading-snug mb-2">{props.description}</p>
        {props.featuredlink && <a target="_blank" href={props.featuredlink}>{props.featuredlink}</a>}
      </div>
      <div className="mt-auto self-start text-gray-300 dark:text-gray-700 italic">
        <a href={props.path} className="text-gray-300 dark:text-gray-700 dark:hover:text-gray-700 no-underline hover:no-underline hover:bg-purple-300">
          {props.date}
        </a>
      </div>
    </article>
  );
}

export default Testimonial;
