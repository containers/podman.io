import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import Markdown from '@site/src/components/utilities/Markdown';
import { searchExample, searchFilterExample, pullExample, imagesExample } from './data';

interface CodeProps {
  command: string;
  code: string;
  label: string;
  note?: string;
}
const RenderLabelledCode = (props: CodeProps) => {
  const { command, code, label, note } = props;

  return (
    <div className="mx-auto my-10 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      <div className="rounded-md bg-blue-700 p-4 text-center shadow-md dark:bg-blue-900">
        <Markdown text={label} styles="text-white dark:text-white" />
      </div>
      <CodeBlock language="bash" showLineNumbers className="mt-4 overflow-auto text-left">
        {command}
        {code}
      </CodeBlock>
      {note && (
        <div className="mt-3 border-l-2 border-gray-300 pl-4 dark:border-gray-500">
          <Markdown text={note} styles="[&_p]:mb-0 [&_p]:text-sm [&_p]:text-gray-700 dark:[&_p]:text-gray-100" />
        </div>
      )}
    </div>
  );
};

function CodeExampleSection() {
  return (
    <div className="container my-12">
      <RenderLabelledCode {...searchExample} />
      <RenderLabelledCode {...searchFilterExample} />
      <RenderLabelledCode {...pullExample} />
      <RenderLabelledCode {...imagesExample} />
    </div>
  );
}

export default CodeExampleSection;
