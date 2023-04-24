import React, { lazy, Suspense } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import rehypeRaw from 'rehype-raw';
const ReactMarkdown = lazy(() => import('react-markdown'));
interface Props {
  text: string;
  styles?: string;
}

const fallBackComponent = () => {
  return <p>text loading...</p>;
};

function Markdown({ text, styles }: Props): JSX.Element {
  return (
    <BrowserOnly>
      {() => (
        <Suspense fallback={fallBackComponent()}>
          <ReactMarkdown children={text} className={styles} rehypePlugins={[rehypeRaw]} />
        </Suspense>
      )}
    </BrowserOnly>
  );
}
export default Markdown;
