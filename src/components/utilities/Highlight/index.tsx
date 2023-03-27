import React from 'react';
type highlightProps = {
  text: string;
  color?: 'white dark:gray-100';
  bgColor?: 'purple-500 dark:purple-300';
  fontWeight?: 'regular';
};
export const Highlight = ({ text, color, bgColor, fontWeight }: highlightProps) => {
  return <span className={`text-${color} bg-${bgColor} font-${fontWeight}`}>{text}</span>;
};
