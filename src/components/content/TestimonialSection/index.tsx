import React from 'react';
import { Icon } from '@iconify/react';
import Testimonial from '@site/src/components/ui/Testimonial';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import { testimonials } from '@site/static/data/testimonials';

function TestimonialSection() {
  const slideLeft = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <section className="bg-gradient-to-b from-white to-purple-100 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900">
      <SectionHeader
        title="What people are saying about Podman"
        textGradient={true}
        textGradientStops="from-blue-700 to-blue-500"
      />
      <div className="container relative mx-auto my-8 flex items-center justify-center">
        <button onClick={slideLeft} className="hidden sm:block xl:hidden">
          <Icon
            icon="fa-solid:arrow-circle-left"
            className="text-4xl text-gray-500 opacity-25 transition duration-150 ease-linear hover:text-purple-900 hover:opacity-100 dark:hover:text-purple-700"
          />
        </button>
        <div
          id="slider"
          className="mx-auto flex h-full w-full justify-center overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar">
          {testimonials.map((testimonial, index) => {
            return <Testimonial key={index} {...testimonial} />;
          })}
        </div>
        <button onClick={slideRight} className="hidden sm:block xl:hidden">
          <Icon
            icon="fa-solid:arrow-circle-right"
            className="dark:hover-text-purple-700 text-4xl text-gray-500 opacity-25 transition duration-150 ease-linear hover:text-purple-900 hover:opacity-100"
          />
        </button>
      </div>
    </section>
  );
}

export default TestimonialSection;
