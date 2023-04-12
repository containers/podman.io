import React from 'react';
import { Icon } from '@iconify/react';

export type ButtonProps = Button & {
  outline?: boolean;
  icon?: string;
  colors?: string;
};

export default function Button({ as = 'link', outline, colors, icon, text, method, path }: ButtonProps) {
  const baseStyles =
    'my-2 block max-w-fit cursor-pointer rounded-md px-6 py-2 font-semibold transition duration-150 ease-in-out hover:no-underline hover:shadow-md';
  const solidColors =
    'bg-purple-700 dark:bg-purple-900 text-white dark:text-gray-50 hover:bg-purple-900 hover:dark:bg-purple-700';
  const outlineColors =
    'dark:bg-white text-purple-700 dark:text-purple-900 hover:dark:bg-purple-900 hover:dark:text-white';
  /* Set Colors */
  const variantStyles = outline ? ` ${outlineColors} ${colors}` : `${solidColors} ${colors}`;

  /** Render the component with style variations */
  if (as === 'button') {
    return (
      <button onClick={method} className={`${baseStyles} ${variantStyles}`}>
        {!icon ? (
          <span>{text}</span>
        ) : (
          <span className="flex items-center gap-2">
            {text} <Icon icon={icon} />
          </span>
        )}
      </button>
    );
  }
  return (
    <a href={path} className={`${baseStyles} ${variantStyles}`}>
      {!icon ? (
        <span>{text}</span>
      ) : (
        <span className="flex items-center gap-2">
          {text} <Icon icon={icon} />
        </span>
      )}
    </a>
  );
}
