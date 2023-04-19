import React from 'react';
import Markdown from '@site/src/components/utilities/Markdown';
type SectionHeaderProps = {
  title: string;
  description?: string;
  textGradientStops?: string;
  textGradient?: boolean;
  textColor?: string;
  fontWeight?: string;
  layout?: string;
  bgColor?: string;
};

function SectionHeader({
  title,
  description,
  textGradientStops = 'from-blue-700 via-blue-700 to-blue-900 dark:from-blue-500  dark:to-blue-700',
  textGradient = false,
  textColor = 'text-gray-900',
  fontWeight,
  layout,
  bgColor,
}: SectionHeaderProps): JSX.Element {
  const applyTextColor = textGradient
    ? `bg-gradient-radial bg-clip-text text-transparent dark:bg-gradient-radial dark:text-transparent ${textGradientStops}`
    : `${textColor}`;
  return (
    <header className={`${bgColor}  ${layout}`}>
      <div className="container mx-auto mb-4 mt-12 text-center  lg:mt-16">
        <h2 className={`${applyTextColor} ${fontWeight}`}>{title}</h2>
        <Markdown text={description} styles="mx-auto my-4 max-w-4xl leading-relaxed text-gray-700 dark:text-gray-100" />
      </div>
    </header>
  );
}

export default SectionHeader;
