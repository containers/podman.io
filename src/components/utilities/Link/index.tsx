import React from 'react';
/** Inline Text Link */
export type LinkProps = Link & {
  fontSize?: string;
  textColor?: string;
  hoverColor?: string;
  underline?: string;
  target?: string;
  rel?: string;
};
function Link({
  text,
  path,
  fontSize,
  textColor = 'text-blue-700 dark:text-blue-500',
  hoverColor = 'hover:text-purple-700 hover:dark:text-purple-700',
  underline = 'underline underline-offset-4',
  target = '_self',
  rel,
}: LinkProps): JSX.Element {
  /* Links opening a new tab must not hand window.opener to the target page */
  const relationship = rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined);
  return (
    <a
      href={path}
      target={target}
      rel={relationship}
      className={`${fontSize} ${textColor} ${hoverColor} ${underline} cursor-pointer transition duration-150 ease-in`}>
      {text}
    </a>
  );
}

export default Link;
