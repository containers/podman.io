import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Button from '@site/src/components/utilities/Button';
import { literature } from '@site/static/data/literature';

function LiteratureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Randomize initial book on page load
  useEffect(() => {
    setActiveIndex(Math.floor(Math.random() * literature.length));
  }, []);
  const currentBook = literature[activeIndex];

  const navigateLeft = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : literature.length - 1));
  };

  const navigateRight = () => {
    setActiveIndex((prev) => (prev < literature.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="container my-12 xl:my-20">
      <div className="relative flex items-center justify-center gap-4">
        {/* Left Arrow */}
        <button type="button" onClick={navigateLeft} className="absolute left-0 z-10">
          <Icon
            icon="fa-solid:arrow-circle-left"
            className="text-3xl text-purple-700 opacity-50 transition duration-150 ease-linear hover:text-purple-900 hover:opacity-100 dark:text-purple-500 dark:hover:text-purple-300"
          />
        </button>

        {/* Book Content - Fixed Width Container */}
        <div className="flex flex-wrap justify-center gap-4 lg:justify-start max-w-5xl mx-auto">
          <div className={`flex flex-1 ${!currentBook.coverImage ? 'justify-center' : ''}`}>
            {/* Book Cover Image (only if available) */}
            {currentBook.coverImage && (
              <div className="order-first mr-12 hidden lg:block">
                <img
                  src={currentBook.coverImage.src}
                  alt={currentBook.coverImage.alt}
                  className="max-w-xs"
                />
              </div>
            )}

            {/* Text Content */}
            <div className="mx-4 flex-col items-center text-center lg:mx-0 lg:items-start lg:text-start max-w-prose">
              <h2 className="my-4 p-0 font-medium text-blue-900 dark:text-blue-500">
                {currentBook.title}
              </h2>
              <p className="mb-4 max-w-prose lg:mb-10">{currentBook.description}</p>
              <Button
                as="link"
                outline
                {...currentBook.button}
                colors="hover:bg-purple-700 dark:hover:bg-purple-900 dark:bg-purple-500 dark:text-purple-700 hover:text-white outline"
              />
            </div>
          </div>

          {/* Extra Images (like coloring pages collage) */}
          {currentBook.extraImages && (
            <div className="order-first mx-auto lg:order-last xl:mx-0 hidden lg:block">
              <img
                src={currentBook.extraImages.src}
                alt={currentBook.extraImages.alt}
                className="max-w-sm"
              />
            </div>
          )}
        </div>

        {/* Right Arrow */}
        <button type="button" onClick={navigateRight} className="absolute right-0 z-10">
          <Icon
            icon="fa-solid:arrow-circle-right"
            className="text-3xl text-purple-700 opacity-50 transition duration-150 ease-linear hover:text-purple-900 hover:opacity-100 dark:text-purple-500 dark:hover:text-purple-300"
          />
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="mt-6 flex justify-center gap-2">
        {literature.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'w-8 bg-purple-700 dark:bg-purple-500'
                : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
            }`}
            aria-label={`Go to book ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default LiteratureCarousel;
