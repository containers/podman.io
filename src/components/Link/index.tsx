import React from 'react';

export default function Link({ text, url, textColor = 'text-blue-700' }): JSX.Element {
  return (
    <a
      href={url}
      className={`${textColor} cursor-pointer  underline underline-offset-4 transition duration-150 ease-in hover:text-purple-700 dark:text-blue-900`}>
      {text}
    </a>
  );
}
