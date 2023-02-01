import React from 'react';

export default function Link({ text, url }): JSX.Element {
  return (
    <a
      href={url}
      className="cursor-pointer text-blue-700 underline underline-offset-4 transition duration-150 ease-in hover:text-purple-700 dark:text-blue-900">
      {text}
    </a>
  );
}
