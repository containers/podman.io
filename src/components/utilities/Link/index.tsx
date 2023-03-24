import React from 'react';

type LinkProps = {
  text: string;
  url: string;
  textColor?: 'text-blue-700';
};
/** Inline Text Link
 * TODO: for call to actions, pass this into a wrapper component that will handle bg color styles and outline
 */

export default function Link({ text, url, textColor }: LinkProps): JSX.Element {
  return (
    <a
      href={url}
      className={`${textColor} cursor-pointer underline underline-offset-4 transition duration-150 ease-in hover:text-purple-700 dark:text-blue-900`}>
      {text}
    </a>
  );
}
