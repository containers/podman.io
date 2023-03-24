import React from 'react';
import ReactMarkdown from 'react-markdown';

type SectionHeaderProps = {
  title: string;
  description: string;
  textGradientStops: 'from-blue-700 via-blue-700 to-blue-900 dark:from-blue-500  dark:to-blue-700';
  textGradient: false;
  textColor: 'text-gray-900';
  fontWeight: string;
  layout: string;
  bgColor: string;
};

/** TODO: Standardize Color pattern along with other headers (no bg- passed to prop)
 * TODO: reduce some of the prop needs if possible (ie: instead of a text color and bg color, pass a light color and a dark color if possible)
 */

export default function SectionHeader({
  title,
  description,
  textGradientStops,
  textGradient,
  textColor,
  fontWeight,
  layout,
  bgColor,
}: SectionHeaderProps): JSX.Element {
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
