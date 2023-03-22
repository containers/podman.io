import React from 'react';

function ButtonBase(props) {
  const { as = 'button', buttonStyles, ...restProps } = props;
  const Element = as;
  return (
    <Element
      {...restProps}
      className={`my-2 block max-w-fit cursor-pointer rounded-md px-6 py-2 font-semibold transition duration-150 ease-in-out hover:no-underline hover:shadow-md ${buttonStyles}`}
    />
  );
}

function Button(props) {
  const { text, variant = 'solid', bgColor = 'bg-purple-700', textColor = 'text-white', ...restProps } = props;
  if (variant === 'outline') {
    return (
      <ButtonBase
        {...restProps}
        buttonStyles={`bg-transparent text-purple-700 outline outline-2 hover:bg-purple-100 hover:text-purple-900 dark:text-purple-500 dark:hover:text-purple-700 transition duration-150 ease-linear`}>
        {text}
      </ButtonBase>
    );
  }
  return (
    <ButtonBase
      {...restProps}
      buttonStyles={`${bgColor} ${textColor} py-3 px-7 hover:bg-purple-900 hover:text-white dark:hover:text-gray-100 dark:text-gray-50 hover:no-underline hover:shadow-md`}>
      {text}
    </ButtonBase>
  );
}

export default Button;
