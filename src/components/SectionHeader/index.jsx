import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function SectionHeader({
  title = 'Test Title',
  description,
  textColor = 'from-blue-700 via-blue-700 to-blue-900 dark:from-blue-500  dark:to-blue-700',
  layout,
}) {
  return (
    <header className={`container mx-auto my-12 text-center lg:my-20  ${layout}`}>
      <h2
        className={`${textColor} bg-gradient-radial bg-clip-text text-transparent dark:bg-gradient-radial dark:text-transparent`}>
        {title}
      </h2>
      <ReactMarkdown children={description} className="my-4 mx-auto max-w-4xl text-gray-700 dark:text-gray-100" />
    </header>
  );
}
