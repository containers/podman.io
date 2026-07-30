import React from 'react';

type ThumbCardProps = Card & {
  image: Image;
};

function ThumbCard({ title, subtitle, image }: ThumbCardProps): JSX.Element {
  return (
    <article className="flex max-w-xs flex-col items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-purple-500/40 dark:hover:shadow-purple-500/10 lg:m-4">
      <h3 className="hidden">{title}</h3>
      <p className="w-48 text-center">{subtitle}</p>
      <img src={image.path} alt={image.alt} className="order-first my-8 h-20" />
    </article>
  );
}

export default ThumbCard;
