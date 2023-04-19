declare module '*.webp';
declare module '*.png';

type Card = {
  title?: string;
  subtitle?: string;
};

type Image = {
  path: string;
  alt: string;
};

type Link = {
  readonly text: string;
  readonly path: string;
};

type Button = {
  readonly text: string;
  readonly as?: 'button' | 'link';
  readonly method?: () => void;
  readonly path?: string;
};

type Shape = {
  readonly height?: string;
  readonly width?: string;
  readonly light?: string;
  readonly dark?: string;
};

type Colors = {
  light: string | undefined;
  dark: string | undefined;
  primary: string;
  secondary: string;
};

type LayoutProps = {
  display?: string;
  grid?: string;
  layout?: string;
};

type HeaderProps = {
  readonly title?: string;
  readonly description?: string;
};
