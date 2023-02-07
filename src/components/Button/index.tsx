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
        buttonStyles={`${bgColor} text-purple-700 outline outline-2 dark:text-gray-50 hover:bg-gray-50 hover:text-purple-900`}>
        {text}
      </ButtonBase>
    );
  }
  return (
    <ButtonBase
      {...restProps}
      buttonStyles={`${bgColor} ${textColor} dark:text-gray-50 py-3 px-7 hover:bg-purple-900 hover:text-white hover:no-underline hover:shadow-md`}>
      {text}
    </ButtonBase>
  );
}

export default Button;
