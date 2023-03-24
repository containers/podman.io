import React from 'react';

type CardProps = {
  title: string;
  subtitle: string;
  description: string;
};

/** Standard Card
 * accepts: title, subtitle, 2 links
 * TODO: discuss with team on having multiple cards or a single card with more options
 */

export default function Card({ title, subtitle, description }: CardProps): JSX.Element {
  return <article></article>;
}
