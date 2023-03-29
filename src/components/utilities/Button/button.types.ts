type ButtonProps = {
  as?: 'a' | 'button';
  text: string;
  icon?: JSX.Element;
  path?: string;
  method?: () => void;
  secondary?: boolean;
  primaryColors?: string;
  secondaryColors?: string;
};
