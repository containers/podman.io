import React from 'react';
const LinkMaker = (text: string): JSX.Element => {
  // find a pattern ']('
  const paraJunction = /[\]][(]/gm;
  const paraStart = /[/[]/gm;
  const paraEnd = /[)]/gm;

  let [linkText, link] = text.split(paraJunction);
  linkText = linkText.split(paraStart)[1];
  link = link.split(paraEnd)[0];

  // validate paranthesis
  // add everything back
  // return jsx
  return <div>Magic Link</div>;
};

export default LinkMaker;
