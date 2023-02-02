import React from 'react';

export default function CardGrid({ children }) {
  return <section className="my-4 flex justify-center gap-8 xl:gap-12">{children}</section>;
}
