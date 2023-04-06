import React from 'react';
import Button from '@site/src/components/utilities/Button';
import ReactMarkdown from 'react-markdown';

type SmallCardProps = Card & {
  button: Button;
};

export default function SmallCard({ title, subtitle, button }: SmallCardProps) {
  return (
    <article className=" my-4 flex max-w-xs flex-col justify-between">
      <h4 className="text-gray-700">{title}</h4>
      <ReactMarkdown children={subtitle} className="mb-4 mt-2 w-[198px] md:w-64" />
      <Button outline={true} as="link" {...button} />
    </article>
  );
}
