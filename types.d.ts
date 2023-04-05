declare module '*.webp';

type Image = {
  path: string | undefined;
  alt: string;
};

type Colors = {
  light: string | undefined;
  dark: string | undefined;
  primary: string;
  secondary: string;
};

type Link = {
  text: string;
  path: string;
};

type Button = {
  readonly text: string;
  readonly as: 'button' | 'link';
  readonly method?: () => void;
  readonly path?: string;
};

type Shape = {
  readonly height?: string;
  readonly width?: string;
  readonly light?: string;
  readonly dark?: string;
};
