import React from 'react';
import Button from '@site/src/components/utilities/Button';
import ReactMarkdown from 'react-markdown';

type CardProps = {
  title: string;
  subtitle?: string;
  button?: {
    text: string;
    src: string;
  };
};

export default function SmallCard({ title, subtitle, button }: CardProps) {
  return (
    <article className=" my-4 flex max-w-xs flex-col justify-between">
      <h4 className="text-gray-700">{title}</h4>
      <ReactMarkdown children={subtitle} className="mb-4 mt-2 w-[198px] md:w-64" />
      <Button secondary={true} as="a" text={button.text} path={button.src} />
    </article>
  );
}
