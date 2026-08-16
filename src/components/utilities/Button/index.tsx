import React from 'react';
import { Icon } from '@iconify/react';

type ButtonProps = Button & {
  outline?: boolean;
  icon?: string;
  colors?: string;
};

function Button({ as = 'link', outline, colors, icon, text, method, path }: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 my-2 max-w-fit cursor-pointer whitespace-nowrap rounded-md px-6 py-2.5 text-base font-semibold no-underline transition duration-150 ease-in-out hover:no-underline active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900';
  const solidColors =
    'border border-transparent bg-purple-700 text-white shadow-sm hover:bg-purple-900 hover:shadow-md hover:text-white dark:bg-purple-700 dark:hover:bg-purple-500';
  const outlineColors =
    'border-2 border-purple-700 bg-transparent text-purple-700 hover:bg-purple-700 hover:text-white dark:border-purple-500 dark:text-purple-300 dark:hover:bg-purple-500 dark:hover:text-white';
  /* Set Colors */
  const variantStyles = `${outline ? outlineColors : solidColors} ${colors ?? ''}`;
  const className = `${baseStyles} ${variantStyles}`;

  const content = !icon ? (
    <span>{text}</span>
  ) : (
    <span className="flex items-center gap-2">
      {text} <Icon icon={icon} />
    </span>
  );

  /** Render the component with style variations */
  if (as === 'button') {
    return (
      <button type="button" onClick={method} className={className}>
        {content}
      </button>
    );
  }
  return (
    <a href={path} className={className}>
      {content}
    </a>
  );
}

export default Button;
