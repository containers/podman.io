import React from 'react';

// TODO: bg-color and gradient props
// TODO: svg top or bottom option
// TODO: render prop function for section header

export default function Section({ header, children }) {
  return (
    <section className="py-8 lg:py-12">
      <header>
        <h2>{header.title}</h2>
        <p>{header.description}</p>
      </header>
      <div>{children}</div>
    </section>
  );
}
