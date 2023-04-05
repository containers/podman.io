type Image = {
  path: string | undefined;
  alt: string;
};

type Colors = {
  light: string | undefined;
  dark: string | undefined;
};

type Link = {
  text: string;
  path: string | undefined;
};

type Button = {
  readonly text: string;
  readonly as: 'a' | 'button';
  readonly method: () => void | undefined;
  readonly path?: string;
};
