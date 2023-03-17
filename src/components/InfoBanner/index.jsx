import React from 'react';

export default function InfoBanner({ title, description, image }) {
  return (
    <section
      className={`dark:via-blue-700/35 mx-auto mb-12 w-full bg-gradient-radial  from-blue-100/50 to-blue-300/25 dark:from-blue-700/50 dark:to-blue-900/25`}>
      <div className="container mx-auto flex flex-wrap items-center gap-8 py-4 md:py-8 lg:py-12">
        <div className="mx-auto md:mx-0">
          {/* TODO: support both images and iconify icons */}
          {image.src ? <img src={image.src} alt={image.alt} /> : <p>no image</p>}
        </div>
        <div className="mx-auto text-center md:text-start">
          <h3 className="mx-auto mb-4 text-3xl font-bold text-purple-700 dark:text-purple-500">{title}</h3>
          <p className="mx-auto max-w-lg leading-relaxed text-gray-700 xl:max-w-4xl">{description}</p>
        </div>
      </div>
    </section>
  );
}
