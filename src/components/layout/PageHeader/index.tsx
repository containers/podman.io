import React from 'react';
import WaveBorder from '@site/src/components/shapes/WaveBorder';
import ReactMarkdown from 'react-markdown';
interface textBoxProps {
  description: string;
  display?: string;
  grid?: string;
  layout?: string;
  title: string;
}

interface ImageSectionProps {
  image: ImageProps;
  display?: string;
  grid?: string;
  layout?: string;
}
interface PageHeaderProps {
  description: string;
  image?: ImageProps;
  title: string;
  darkColor?: string;
  lightColor?: string;
}
const TextBox = ({ grid, display, layout, title, description }: textBoxProps): JSX.Element => {
  return (
    <div className={`${grid} ${display} ${layout}`}>
      <h1 className="mb-6 max-w-sm text-purple-700 dark:text-purple-500 lg:max-w-lg ">{title}</h1>
      <ReactMarkdown className="leading-relaxed" children={description} />
    </div>
  );
};
const Image = ({
  grid,
  display,
  layout,
  image = { src: 'images/raw/podman-2-196w-172h.png', alt: 'Podman Logo' },
}: ImageSectionProps) => {
  return (
    <div>
      <img src={image.src} alt={image.alt} className={`${grid} ${display} ${layout}`} />
    </div>
  );
};

export default function PageHeader({
  title,
  description,
  image,
  lightColor = 'white',
  darkColor = 'gray-900',
}: PageHeaderProps) {
  return (
    <header className={`h-5/6  xl:h-96 bg-${lightColor} dark:bg-${darkColor}`}>
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 pt-2 dark:from-blue-700 dark:to-blue-900 lg:pt-8">
        <WaveBorder />
      </div>
      <div className="container grid justify-items-center gap-3 md:grid-cols-2">
        <TextBox title={title} description={description} layout="mt-12 lg:mt-0" />
        <Image image={image} layout="mb-8 lg:mb-0" />
      </div>
    </header>
  );
}
