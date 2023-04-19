import React from 'react';
/** Inline Text Link */
export type LinkProps = Link & {
  fontSize?: string;
  textColor?: string;
  hoverColor?: string;
};
function Link({
  text,
  path,
  fontSize,
  textColor = 'text-blue-700 dark:text-blue-500',
  hoverColor = 'hover:text-purple-700 hover:dark:text-purple-700',
}: LinkProps): JSX.Element {
  return (
    <a
      href={path}
      className={`${fontSize} ${textColor} ${hoverColor} cursor-pointer underline underline-offset-4 transition duration-150 ease-in`}>
      {text}
    </a>
  );
}

export default Link;
