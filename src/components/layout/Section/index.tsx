import React from 'react';

// TODO: bg-color and gradient props
// TODO: svg top or bottom option
// TODO: render prop function for section header
function Header({ title, bgColor = 'bg-blue-100' }) {
  return (
    <header className={`${bgColor} py-8`}>
      <h2>{title}</h2>
    </header>
  );
}

function Section({ children }) {
  return <section className="py-8 lg:py-12">{children}</section>;
}
export default Section;
