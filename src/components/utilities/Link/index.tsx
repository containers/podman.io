import React from 'react';
/** Inline Text Link */
export type LinkProps = Link & {
  fontSize?: string;
  textColor?: string;
  hoverColor?: string;
  underline?: string;
  target?: string;
};
function Link({
  text,
  path,
  fontSize,
  textColor = 'text-blue-700 dark:text-blue-500',
  hoverColor = 'hover:text-purple-700 hover:dark:text-purple-700',
  underline = 'underline underline-offset-4',
  target = '_self'
}: LinkProps): JSX.Element {
  return (
    <a
      href={path}
      target={target}
      className={`${fontSize} ${textColor} ${hoverColor} ${underline} cursor-pointer transition duration-150 ease-in`}>
      {text}
    </a>
  );
}

export default Link;
