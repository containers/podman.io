import React from 'react';
import Button from '@site/src/components/utilities/Button';
import data from './data';
function ColoringBookSection() {
  return (
    <section className="container my-12 flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 xl:my-20">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-start lg:items-center">
        <img
          src={data.featureImage.src}
          alt={data.featureImage.alt}
          className="w-40 shrink-0 rounded-lg shadow-lg sm:w-44 lg:w-52"
        />
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="mb-4 font-medium text-blue-900 dark:text-blue-500">{data.title}</h2>
          <p className="mb-6 max-w-prose">{data.description}</p>
          <Button as="link" outline {...data.button} />
        </div>
      </div>
      <div className="w-full max-w-sm shrink-0 lg:max-w-md">
        <img src={data.collageImages.src} alt={data.collageImages.alt} className="w-full" />
      </div>
    </section>
  );
}

export default ColoringBookSection;
