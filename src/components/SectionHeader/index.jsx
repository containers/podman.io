import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function SectionHeader({ title = 'Test Title', description }) {
  return (
    <header className="container mx-auto my-8 text-center lg:my-12">
      <h2 className="bg-gradient-radial from-blue-500 to-blue-900 bg-clip-text text-transparent">{title}</h2>
      <ReactMarkdown children={description} />
    </header>
  );
}
