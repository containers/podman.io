import React from 'react';
import Button from '@site/src/components/utilities/Button';
import Markdown from '@site/src/components/utilities/Markdown';

type SmallCardProps = Card & {
  button: Button;
};

function SmallCard(props: SmallCardProps) {
  const { title, subtitle, button } = props;

  return (
    <article className=" my-4 flex max-w-xs flex-col justify-between">
      <h4 className="text-gray-700">{title}</h4>
      <Markdown text={subtitle} styles="mb-4 mt-2 w-[198px] md:w-64" />
      <Button outline={true} as="link" {...button} />
    </article>
  );
}

export default SmallCard;
