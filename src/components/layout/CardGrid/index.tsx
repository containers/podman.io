import React from 'react';

// TODO: use props to set 3 vs 4 column layouts

export default function CardGrid({ children }) {
  return <section className="my-4 flex justify-center gap-8 xl:gap-12">{children}</section>;
}
