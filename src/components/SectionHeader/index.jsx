import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function SectionHeader({
  title = 'Test Title',
  description,
  textGradientStops = 'from-blue-700 via-blue-700 to-blue-900 dark:from-blue-500  dark:to-blue-700',
  textGradient = false,
  textColor = 'text-gray-900',
  fontWeight,
  layout,
  bgColor = '',
}) {
  const applyTextColor = textGradient
    ? `bg-gradient-radial bg-clip-text text-transparent dark:bg-gradient-radial dark:text-transparent ${textGradientStops}`
    : `${textColor}`;
  return (
    <header className={`${bgColor}  ${layout}`}>
      <div className="container mx-auto mt-12 mb-4 text-center  lg:mt-16">
        <h2 className={`${applyTextColor} ${fontWeight}`}>{title}</h2>
        <ReactMarkdown
          children={description}
          className="my-4 mx-auto max-w-4xl leading-relaxed text-gray-700 dark:text-gray-100"
        />
      </div>
    </header>
  );
}
