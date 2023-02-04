import MDXComponents from '@theme-original/MDXComponents';
// Layout Components
import Main from '@site/src/components/layout/Main';
import Section from '@site/src/components/layout/Section';
import CardGrid from '@site/src/components/layout/CardGrid';
// Element Components
import Card from '@site/src/components/Card';
export default {
  ...MDXComponents,
  // layout components
  main: Main,
  section: Section,
  cardGrid: CardGrid,
  card: Card,
};
