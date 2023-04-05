import React from 'react';

type ButtonProps = Button & {
  outline: boolean;
  icon: string;
  solidColors: string | undefined;
  outlineColors: string | undefined;
};

export default function Button(
  {
    as = 'a',
    solidColors = 'bg-purple-700 dark:bg-purple-500 text-white dark:text-gray-50 hover:bg-purple-900 hover:dark-purple-700',
    outlineColors = 'outline-purple-700 dark:outline-purple-500 text-purple-700 dark:text-purple-700 hover:bg-gray-50 hover:dark-bg-gray-100',
  },
  props: ButtonProps,
) {
  const baseStyles =
    'my-2 block max-w-fit cursor-pointer rounded-md px-6 py-2 font-semibold transition duration-150 ease-in-out hover:no-underline hover:shadow-md';
  const variantStyles = props.outline ? `bg-transparent outline outline-2 ${outlineColors}` : `${solidColors}`;

  /** Render the component with style variations */
  if (as === 'button') {
    return (
      <button onClick={props.method} className={`${baseStyles} ${variantStyles}`}>
        {props.icon ? props.icon : ''} {props.text}
      </button>
    );
  }
  return (
    <a href={props.path} className={`${baseStyles} ${variantStyles}`}>
      {props.icon ? props.icon : ''} {props.text}
    </a>
  );
}
