import React from 'react';

function ButtonBase(props) {
  const { as = 'button', buttonStyles, ...restProps } = props;
  const Element = as;
  return (
    <Element
      {...restProps}
      className={`my-2 block max-w-fit rounded-md px-6 py-2 font-semibold transition duration-150 ease-in-out hover:no-underline hover:shadow-md ${buttonStyles}`}
    />
  );
}

function Button(props) {
  const { text, variant = 'solid', ...restProps } = props;
  if (variant === 'outline') {
    return (
      <ButtonBase
        {...restProps}
        buttonStyles="text-purple-700 outline outline-2   hover:bg-gray-50 hover:text-purple-900">
        {text}
      </ButtonBase>
    );
  }
  return (
    <ButtonBase
      {...restProps}
      buttonStyles="bg-purple-700 text-white py-3 px-7 hover:bg-purple-900 hover:text-white hover:no-underline hover:shadow-md">
      {text}
    </ButtonBase>
  );
}

export default Button;
