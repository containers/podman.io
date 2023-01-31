import React from 'react';

export default function Link(props): JSX.Element {
  return <a href={props.url}>{props.text}</a>;
}
