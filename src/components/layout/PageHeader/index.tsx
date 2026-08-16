import React, { PropsWithChildren } from 'react';
import { Icon } from '@iconify/react';
import Markdown from '@site/src/components/utilities/Markdown';
import BasicResourcesBox from '@site/src/components/content/BasicResourcesBox';
type ImageSectionProps = LayoutProps & {
  image?: Image;
};

type PageHeaderProps = LayoutProps &
  HeaderProps & {
    image?: Image;
    colors?: Colors;
    darkColor?: string;
    lightColor?: string;
    basicResources?: boolean;
    instructions?: { [key: string]: any };
  };

type PageHeaderSupplementalInfoProps = PageHeaderProps & {
  image?: Image;
  basicResources?: boolean;
};

type InstructionsProps = PageHeaderProps & {
  instructions?: { [key: string]: any };
};

const TextBox = ({ grid, display, layout, title, description }: PageHeaderProps): JSX.Element => {
  return (
    <div className={`${grid} ${display} ${layout}`}>
      <h1 className="mb-6 max-w-sm text-purple-700 dark:text-purple-500 lg:max-w-lg">{title}</h1>
      <Markdown text={description} styles="leading-relaxed" />
    </div>
  );
};

const DecorativeBlob = () => (
  <div className="pointer-events-none absolute -inset-8 z-0 flex items-center justify-center">
    <svg viewBox="0 0 200 200" className="h-full w-full text-purple-100 dark:text-purple-500/10">
      <path
        fill="currentColor"
        d="M52.4,-58.5C66.4,-49.6,75.6,-32.1,78.4,-13.7C81.2,4.7,77.6,24,67.4,39.4C57.2,54.8,40.4,66.3,21.6,71.6C2.8,76.9,-18,75.9,-35.9,67.6C-53.8,59.3,-68.8,43.6,-74.9,25.2C-81,6.8,-78.2,-14.3,-68.5,-31.2C-58.8,-48.1,-42.2,-60.8,-24.9,-68.5C-7.6,-76.2,10.4,-78.9,26.7,-74.6C43,-70.3,52.4,-58.5,52.4,-58.5Z"
        transform="translate(100 100)"
      />
    </svg>
    <Icon icon="mdi:sparkles" className="absolute left-0 top-0 text-lg text-purple-300 dark:text-purple-300/40" />
    <Icon icon="mdi:sparkles" className="absolute bottom-2 right-0 text-base text-purple-300 dark:text-purple-300/40" />
    <span className="absolute right-4 top-6 h-2 w-2 rounded-full bg-purple-300 dark:bg-purple-300/30" />
    <span className="absolute bottom-6 left-2 h-1.5 w-1.5 rounded-full bg-purple-300 dark:bg-purple-300/30" />
  </div>
);

const Image = ({
  layout, // if array then {[key:string]: any}[];
  image = { path: '/images/optimized/podman-2-196w-172h.webp', alt: 'Podman Logo' },
}: ImageSectionProps) => {
  return (
    <div className={`relative mx-auto w-full max-w-[220px] md:max-w-[260px] ${layout ?? ''}`}>
      <DecorativeBlob />
      <img src={image.path} alt={image.alt} className="relative z-10 h-auto w-full object-contain" />
    </div>
  );
};

function PageHeaderSupplementalInfo({ image, basicResources }: PageHeaderSupplementalInfoProps) {
  if (basicResources) {
    return (
      <div className="mx-auto w-full max-w-sm">
        <BasicResourcesBox />
      </div>
    );
  }
  return <Image image={image} layout="mb-8 lg:mb-0" />;
}

function Instructions({ instructions }: InstructionsProps) {
  if (instructions) {
    return (
      <div>
        <h3 className="mb-4 text-gray-700 dark:text-gray-100">{instructions.title}</h3>
        <p>{instructions.subtitle}</p>
        <ul className="mb-10 mt-4 flex flex-col gap-6 sm:flex-row lg:mb-16 lg:gap-4 xl:flex-col">
          <li>
            <a
              href={instructions.button.path}
              className="flex h-32 max-w-lg flex-col items-center justify-center gap-4 rounded-md bg-gray-100 p-4 text-center text-purple-700 no-underline underline-offset-4 transition duration-150 ease-linear hover:bg-purple-700 hover:text-purple-50 hover:no-underline hover:shadow-md dark:bg-gray-700 dark:text-purple-300 dark:hover:bg-purple-900 dark:hover:text-white lg:h-auto lg:flex-row xl:justify-start">
              <span>{instructions.button.text}</span>
              <Icon icon={instructions.button.icon} className="order-first hidden lg:block" />
            </a>
          </li>
        </ul>
      </div>
    );
  }
  return null;
}

function PageHeader({
  title,
  description,
  image,
  lightColor = 'white',
  darkColor = 'gray-900',
  basicResources,
  instructions,
}: PageHeaderProps) {
  return (
    <header className={`bg-${lightColor} dark:bg-${darkColor}`}>
      <div className="h-24 lg:h-32" />
      <div className="container flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-20">
        <div className="md:flex-1">
          <TextBox title={title} description={description} layout="mt-12 lg:mt-0 mb-8" />
          <Instructions instructions={instructions} />
        </div>
        <div className="mt-8 w-full shrink-0 md:mt-0 md:w-auto">
          <PageHeaderSupplementalInfo basicResources={basicResources} />
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
