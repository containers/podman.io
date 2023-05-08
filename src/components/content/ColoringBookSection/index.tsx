import React from 'react';
import Button from '@site/src/components/utilities/Button';
import data from './data';
function ColoringBookSection() {
  return (
    <section className="container my-12 flex flex-wrap justify-center gap-4 lg:justify-start xl:my-20">
      <div className="flex">
        <div className="mx-4 flex-col items-center text-center lg:mx-0 lg:items-start lg:text-start">
          <h2 className="my-4 font-medium text-blue-900 dark:text-blue-500">{data.title}</h2>
          <p className="mb-4 max-w-prose lg:mb-10">{data.description}</p>
          <Button
            as="link"
            outline
            {...data.button}
            colors="hover:bg-purple-700 dark:hover:bg-purple-900 dark:bg-purple-500 dark:text-purple-700 hover:text-white outline"
          />
        </div>
        <div className="order-first mr-12 hidden lg:block">
          <img src={data.featureImage.src} alt={data.featureImage.alt} />
        </div>
      </div>
      <div className="order-first mx-auto lg:order-last xl:mx-0">
        <img src={data.collageImages.src} alt={data.collageImages.alt} />
      </div>
    </section>
  );
}

export default ColoringBookSection;
