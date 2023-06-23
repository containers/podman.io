import React from 'react';
import { Icon } from '@iconify/react';

type ButtonProps = Button & {
  outline?: boolean;
  icon?: string;
  colors?: string;
};

function Button({ as = 'link', outline, colors, icon, text, method, path }: ButtonProps) {
  const baseStyles =
    'text-xl h-fit my-2 block max-w-fit cursor-pointer rounded-md px-6 py-2 font-semibold transition duration-150 ease-in-out hover:no-underline hover:shadow-md whitespace-nowrap';
  const solidColors =
    'bg-purple-700 dark:bg-purple-900 text-white dark:text-white hover:bg-purple-900 no-underline hover:no-underline dark:hover:text-gray-50 dark:hover:bg-purple-700 hover:text-white';
  const outlineColors =
    'no-underline outline dark:bg-white dark:text-purple-700 text-purple-700 dark:text-purple-900 dark:hover:bg-purple-900 dark:hover:text-white';
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

export default Button;
