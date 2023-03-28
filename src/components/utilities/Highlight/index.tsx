import React from 'react';
type highlightProps = {
  text: string;
  textColor?: 'text-white dark:text-gray-100';
  bgColor?: 'bg-purple-500 dark:bg-purple-300';
  fontWeight?: 'font-regular';
};
export const Highlight = ({ text, textColor, bgColor, fontWeight }: highlightProps): JSX.Element => {
  return <span className={`${textColor} ${bgColor} ${fontWeight}`}>{text}</span>;
};
