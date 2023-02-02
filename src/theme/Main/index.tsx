import React from 'react';

//TODO: render props for HeroHeader or PageHeader built in
// NOTE: no x margin or padding, this needs to allow full width sections
export default function Main({ children }) {
  return <main className="mx-auto h-screen">{children}</main>;
}
