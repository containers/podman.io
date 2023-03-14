import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function SectionHeader({
  title = 'Test Title',
  description,
  textColor = ' from-blue-500 to-blue-900 ',
}) {
  return (
    <header className="container mx-auto my-8 text-center lg:my-12">
      <h2 className={`${textColor} bg-gradient-radial bg-clip-text text-transparent`}>{title}</h2>
      <ReactMarkdown children={description} className="my-4 text-gray-700" />
    </header>
  );
}
