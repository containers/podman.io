import React, { lazy, Suspense } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
// const rehypeRaw = lazily(() => import('rehype-raw'));
const ReactMarkdown = lazy(() => import('react-markdown'));
interface Props {
  text: string;
  styles?: string;
}

const fallBackComponent = () => {
  return <p>text loading...</p>;
};
// rehypePlugins={[rehypeRaw] as any}
function Markdown({ text, styles }: Props): JSX.Element {
  return (
    <BrowserOnly>
      {() => (
        <Suspense fallback={fallBackComponent()}>
          <ReactMarkdown children={text} className={styles} />
        </Suspense>
      )}
    </BrowserOnly>
  );
}
export default Markdown;
