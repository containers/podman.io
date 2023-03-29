import React from 'react';

export default function Button({
  as = 'a',
  path,
  method,
  text,
  icon,
  secondary,
  primaryColors = 'bg-purple-700 dark:bg-purple-500 text-white dark:text-gray-50 hover:bg-purple-900 hover:dark-purple-700',
  secondaryColors = 'outline-purple-700 dark:outline-purple-500 text-purple-700 dark:text-purple-700 hover:bg-gray-50 hover:dark-bg-gray-100',
}: ButtonProps) {
  /** Element type */
  const Element = as;

  /** style variations */
  const baseStyles =
    'my-2 block max-w-fit cursor-pointer rounded-md px-6 py-2 font-semibold transition duration-150 ease-in-out hover:no-underline hover:shadow-md';
  const variantStyles = secondary ? `bg-transparent outline outline-2 ${secondaryColors}` : `${primaryColors}`;

  /** Render the component with style variations */
  if (as === 'button') {
    return (
      <Element onClick={method} className={`${baseStyles} ${variantStyles}`}>
        {icon ? icon : ''} {text}
      </Element>
    );
  }
  return (
    <Element href={path} className={`${baseStyles} ${variantStyles}`}>
      {icon ? icon : ''} {text}
    </Element>
  );
}
