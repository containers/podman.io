import React from 'react';

type HeaderProps = {
  image?: {
    src: string;
    alt: string;
  };
  bgColor?: String;
};

/** TODO: Standardize passing color
 * ie: separated with darkColor and lightColor props, then prefixed with `text-` or `bg-`
 * or: pass with prefix as a part of the color
 * **NOTE** I think it's better to do this without the bg-tag as part of the color
 */
export default function PageHeader({}: HeaderProps): JSX.Element {
  return <header></header>;
}
