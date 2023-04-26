import React from 'react';
import CodeBlock from '@theme/Codeblock';
import Markdown from '@site/src/components/utilities/Markdown';
import { searchExample, searchFilterExample, imagesExample } from './data';

interface CodeProps {
  label: string;
  code: string;
  command: string;
}

const RenderLabelledCode = (props: CodeProps) => {
  return (
    <>
      <h3>{props.label}</h3>
      <CodeBlock language="bash" showLineNumbers>
        {props.command}
        {props.code}
      </CodeBlock>
    </>
  );
};

const DesktopCodeBlock = () => {
  return <CodeBlock language="bash" showLineNumbers></CodeBlock>;
};

function CodeExampleSection() {
  return <div></div>;
}

export default CodeExampleSection;
