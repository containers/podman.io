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
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-purple-100 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-blue-300/20 blur-3xl dark:bg-purple-700/10" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-purple-300/20 blur-3xl dark:bg-blue-700/10" />
      <SectionHeader
        title="What people are saying about Podman"
        description="Real feedback from developers, contributors, and companies building with Podman every day."
        textGradient={true}
        textGradientStops="from-blue-700 to-blue-500"
      />
      <div className="container relative mx-auto my-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={slideLeft}
          aria-label="Previous testimonial"
          className="hidden shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/70 p-3 text-purple-700 shadow-md backdrop-blur transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-gray-700/70 dark:text-purple-300 dark:hover:bg-gray-700 sm:flex">
          <Icon icon="mdi:chevron-left" className="text-2xl" />
        </button>
        <div className="relative w-full overflow-hidden">
          <div
            id="slider"
            className="flex h-full w-full snap-x snap-mandatory justify-start gap-2 overflow-x-scroll scroll-smooth py-2 scrollbar">
            {testimonials.map((testimonial, index) => {
              return <Testimonial key={index} {...testimonial} />;
            })}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent dark:from-gray-900" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-purple-100 to-transparent dark:from-purple-900" />
        </div>
        <button
          type="button"
          onClick={slideRight}
          aria-label="Next testimonial"
          className="hidden shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/70 p-3 text-purple-700 shadow-md backdrop-blur transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-gray-700/70 dark:text-purple-300 dark:hover:bg-gray-700 sm:flex">
          <Icon icon="mdi:chevron-right" className="text-2xl" />
        </button>
      </div>
    </section>
  );
}

export default TestimonialSection;
