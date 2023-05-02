import React from 'react';
import { Icon } from '@iconify/react';

type TestimonialProps = {
  name: string;
  handle: string;
  image?: Image;
  description: string;
  social: string;
  path: string;
  date: string;
};

function Testimonial(props: TestimonialProps) {
  return (
    <article className="mx-2 my-4 max-w-sm rounded-sm bg-white p-4 shadow-lg dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">{props.name}</h3>
            <Icon icon={`logos:${props.social}`} className="text-2xl" />
          </div>
          <a href={props.path} className=" text-gray-700">
            {props.handle}
          </a>
        </div>
        <div className="order-first">
          <img src="images/article-thumb.png" alt="test image" className="h-12 w-12 rounded-full" />
        </div>
      </div>
      <div className="my-2 max-w-sm">
        <p className="text-gray-900 dark:text-gray-300">{props.description}</p>
      </div>
      <div className="self-start text-gray-500">
        <p>{props.date}</p>
      </div>
    </article>
  );
}

export default Testimonial;
