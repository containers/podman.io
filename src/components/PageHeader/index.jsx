import React from 'react';
import WaveBorder from '@site/src/components/svgShapes/WaveBorder';

const TextBox = ({ grid, display, layout, title = 'Default Title', description = 'Just some Text' }) => {
  return (
    <div className={`${grid} ${display} ${layout}`}>
      <h1 className="mb-6 max-w-sm text-purple-700 dark:text-purple-500 lg:max-w-lg ">{title}</h1>
      <p className="leading-relaxed">{description}</p>
    </div>
  );
};
const Image = ({
  grid,
  display,
  layout,
  image = { src: '/images/raw/podman-2-196w-172h.png', alt: 'Podman Logo' },
}) => {
  return (
    <div>
      <img src={image.src} alt={image.alt} className={`${grid} ${display} ${layout}`} />
    </div>
  );
};

export default function PageHeader({ title, description, image }) {
  return (
    <header className="h-5/6 xl:h-96">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900">
        <WaveBorder />
      </div>
      <div className="container grid justify-items-center gap-3 md:grid-cols-2">
        <TextBox title={title} description={description} layout="mt-12 lg:mt-0" />
        <Image image={image} layout="mb-8 lg:mb-0" />
      </div>
    </header>
  );
}
