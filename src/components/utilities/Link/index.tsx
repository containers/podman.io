import React from 'react';
/** Inline Text Link */
type LinkProps = {
  text: string;
  href: string;
  fontSize?: 'text-base';
  textColor?: 'text-blue-700 dark:text-blue-500';
  hoverColor?: 'hover:text-purple-700 hover:dark:text-purple-500';
};

export default function Link({ text, href, fontSize, textColor, hoverColor }: LinkProps): JSX.Element {
  return (
    <a
      href={href}
      className={`${fontSize} ${textColor} ${hoverColor} cursor-pointer underline underline-offset-4 transition duration-150 ease-in`}>
      {text}
    </a>
  );
}
