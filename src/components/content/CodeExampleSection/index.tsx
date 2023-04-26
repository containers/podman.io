import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import Markdown from '@site/src/components/utilities/Markdown';
import { searchExample, searchFilterExample, imagesExample } from './data';

interface CodeProps {
  command: string;
  code: string;
  label: string;
  extra?: string;
}
const RenderLabelledCode = (props: CodeProps) => {
  const { command, code, label, extra } = props;

  return (
    <div className="container">
      <div className="mx-4 mb-2 mt-4 rounded-md bg-blue-700 p-4 text-center shadow-md dark:bg-blue-900 md:max-w-sm lg:mx-0 lg:text-start">
        <Markdown text={label} styles="text-white dark:text-white" />
      </div>
      {extra && (
        <div className="mx-4 mb-2 mt-4 hidden rounded-md bg-blue-700 p-4 shadow-md dark:bg-blue-900 md:block md:max-w-sm lg:mx-0">
          <Markdown text={extra} styles="text-white dark:text-white" />
        </div>
      )}
      <CodeBlock language="bash" showLineNumbers className="mx-4 my-2 md:hidden">
        {command}
        {code}
      </CodeBlock>
    </div>
  );
};

const DesktopCodeBlock = () => {};

function CodeExampleSection() {
  return (
    <div>
      <RenderLabelledCode {...searchExample} />
      <RenderLabelledCode {...searchFilterExample} />
      <RenderLabelledCode {...imagesExample} />
    </div>
  );
}

export default CodeExampleSection;
