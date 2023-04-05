type Link = {
  text: string;
  path: string | undefined;
};

type Image = {
  path: string | undefined;
  alt: string;
};

type Button = {
  text: string;
  action: () => void | undefined;
};

type Colors = {
  light: string | undefined;
  dark: string | undefined;
};
