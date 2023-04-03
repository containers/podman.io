import React from 'react';

type thumbCardProps = {
  title?: string;
  description?: string;
  image?: ImageProps;
};

export default function ThumbCard({ title, description, image }: thumbCardProps) {
  return (
    <article className="flex max-w-xs flex-col items-center justify-center rounded-md p-6 shadow-md lg:m-4">
      <h3 className="hidden">{title}</h3>
      <p className="w-48 text-center">{description}</p>
      <img src={image.src} alt={image.alt} className="order-first my-8 h-20" />
    </article>
  );
}
