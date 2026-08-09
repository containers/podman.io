import React from 'react';

// Manually define the subset of react-markdown types we need to avoid TS1479 (ESM import error)
// while keeping strict type safety on the component props.
interface ReactMarkdownOptions {
  children: string;
}
type ReactMarkdownType = React.FC<ReactMarkdownOptions>;

// Docusaurus Webpack resolves this require() perfectly for SSR and client build,
// bypassing tsc's strict CommonJS boundaries.
const ReactMarkdown = (require('react-markdown').default || require('react-markdown')) as ReactMarkdownType;

interface Props {
  /** Raw Markdown text to render (front matter already stripped) */
  content: string;
}

/**
 * Renders raw Markdown into safely-parsed HTML via react-markdown.
 * Because we synchronously import react-markdown, this component is fully
 * compatible with Docusaurus's SSR static-site generation, ensuring the
 * meeting notes are physically present in the generated HTML for SEO/indexability.
 */
function MeetingMarkdown({ content }: Props): JSX.Element {
  const markdownOptions: ReactMarkdownOptions = {
    children: content,
    // Add additional remark/rehype plugins here if the Markdown needs them
    // remarkPlugins={[...]}
  };

  return (
    <div className="meeting-notes prose prose-gray max-w-none dark:prose-invert">
      <ReactMarkdown {...markdownOptions} />
    </div>
  );
}

export default MeetingMarkdown;
