import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import Markdown from '@site/src/components/utilities/Markdown';
import { searchExample, searchFilterExample, imagesExample } from './data';

interface CodeProps {
  command: string;
  code: string;
  label: string;
  extra?: string;
  className?: string;
}
const RenderLabelledCode = (props: CodeProps) => {
  const { command, code, label, extra, className } = props;

  return (
    <div className={`w-full max-w-md ${className}`}>
      <div className="my-4 w-full max-w-full rounded-md bg-blue-700 p-4 text-center shadow-md dark:bg-blue-900 md:text-start">
        <Markdown text={label} styles="text-white dark:text-white" />
      </div>
      {extra && (
        <div className="mb-2 mt-4 hidden w-full max-w-full rounded-md bg-blue-700 p-4 shadow-md dark:bg-blue-900 md:block">
          <Markdown text={extra} styles="text-white dark:text-white" />
        </div>
      )}
      <CodeBlock language="bash" showLineNumbers className="mx-4 my-2 max-w-md md:hidden">
        {command}
        {code}
      </CodeBlock>
    </div>
  );
};

interface DeskProps {
  className: string;
}
const DesktopCodeBlock = (props: DeskProps) => {
  return (
    <div className={`container hidden min-w-0 md:block ${props.className}`}>
      <CodeBlock language="bash" showLineNumbers>
        {searchExample.command}
        {searchExample.code}
        {searchFilterExample.command}
        {searchFilterExample.code}
        {imagesExample.command}
        {imagesExample.code}
      </CodeBlock>
    </div>
  );
};

function CodeExampleSection() {
  return (
    <div className="container my-12 grid place-items-center gap-4 md:grid-cols-12 md:place-items-end">
      <DesktopCodeBlock className="md:col-span-12 md:col-start-1 md:row-start-1 lg:col-span-8 lg:row-span-3 lg:place-self-center" />
      <RenderLabelledCode
        {...searchExample}
        className="md:col-span-12 md:col-start-1 md:row-start-2 lg:col-span-4 lg:col-start-9 lg:row-start-1"
      />
      <RenderLabelledCode
        {...searchFilterExample}
        className="md:col-span-12 md:col-start-1 md:row-start-3 lg:col-span-4 lg:col-start-9 lg:row-start-2"
      />
      <RenderLabelledCode
        {...imagesExample}
        className="md:col-span-12 md:col-start-1 md:row-start-4 lg:col-span-4 lg:col-start-9 lg:row-start-3"
      />
    </div>
  );
}

export default CodeExampleSection;
