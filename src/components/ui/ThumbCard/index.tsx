import React from 'react';

type ThumbCardProps = Card & {
  image: Image;
};

function ThumbCard({ title, subtitle, image }: ThumbCardProps): JSX.Element {
  return (
    <article className="flex max-w-xs flex-col items-center justify-center rounded-md p-6 shadow-md lg:m-4">
      <h3 className="hidden">{title}</h3>
      <p className="w-48 text-center">{subtitle}</p>
      <img src={image.path} alt={image.alt} className="order-first my-8 h-20" />
    </article>
  );
}

export default ThumbCard;
