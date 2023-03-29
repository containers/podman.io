import React from 'react';
import Button from '@site/src/components/utilities/Button';
import ReactMarkdown from 'react-markdown';
type CardProps = {
  title: string;
  subtitle?: string;
  details?: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  bgColor?: string;
  textColor?: string;
  buttons: JSX.Element[];
};

/** Standard Card */

export default function Card({ title, subtitle, details, description, image, buttons }: CardProps): JSX.Element {
  return (
    <article>
      <div className="mx-2 mt-4">
        <h3 className="mb-3 font-bold text-gray-700 dark:text-gray-50">{title}</h3>
        <ReactMarkdown children={subtitle} className="text-gray-700" />
        <ReactMarkdown children={details} className="text-gray-700" />
      </div>
      <div className="my-6 mx-2 lg:my-8">
        {/* Optional Image */}
        <p className="max-w-sm text-gray-700 dark:text-gray-100">{description}</p>
      </div>
      {/* Buttons */}
    </article>
  );
}
