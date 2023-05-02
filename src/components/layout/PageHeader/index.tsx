import React from 'react';
import WaveBorder from '@site/src/components/shapes/WaveBorder';
import Markdown from '@site/src/components/utilities/Markdown';
type ImageSectionProps = LayoutProps & {
  image: Image;
};

type PageHeaderProps = LayoutProps &
  HeaderProps & {
    image?: Image;
    colors?: Colors;
    darkColor?: string;
    lightColor?: string;
  };
const TextBox = ({ grid, display, layout, title, description }: PageHeaderProps): JSX.Element => {
  return (
    <div className={`${grid} ${display} ${layout}`}>
      <h1 className="mb-6 max-w-sm text-purple-700 dark:text-purple-500 lg:max-w-lg ">{title}</h1>
      <Markdown text={description} styles="leading-relaxed" />
    </div>
  );
};
const Image = ({
  grid,
  display,
  layout,
  image = { path: 'images/raw/podman-2-196w-172h.png', alt: 'Podman Logo' },
}: ImageSectionProps) => {
  return (
    <div>
      <img src={image.path} alt={image.alt} className={`${grid} ${display} ${layout}`} />
    </div>
  );
};

function PageHeader({ title, description, image, lightColor = 'white', darkColor = 'gray-900' }: PageHeaderProps) {
  return (
    <header className={`h-5/6  xl:h-100 bg-${lightColor} dark:bg-${darkColor}`}>
      <div className="bg-gradient-to-r from-blue-500  to-purple-700 dark:from-blue-700 dark:to-purple-900 lg:pt-8">
        <WaveBorder />
      </div>
      <div className="container grid justify-items-center gap-3 md:grid-cols-2">
        <TextBox title={title} description={description} layout="mt-12 lg:mt-0" />
        <Image image={image} layout="mb-8 lg:mb-0" />
      </div>
    </header>
  );
}

export default PageHeader;
