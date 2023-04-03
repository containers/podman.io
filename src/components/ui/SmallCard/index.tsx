import React from 'react';
import Button from '@site/src/components/utilities/Button';
import ReactMarkdown from 'react-markdown';

type CardProps = {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonPath: string;
};

export default function SmallCard({ title, subtitle, buttonText, buttonPath }: CardProps) {
  return (
    <article className=" my-4 flex max-w-xs flex-col justify-between">
      <h4 className="text-gray-700">{title}</h4>
      <ReactMarkdown children={subtitle} className="mb-4 mt-2 w-[198px] md:w-64" />
      <Button secondary={true} as="a" text={buttonText} path={buttonPath} />
    </article>
  );
}
