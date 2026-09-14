import React from 'react';
import { Icon } from '@iconify/react';
import TranscriptViewer, {
  ChatLogViewer,
  isTranscriptContent,
  isChatContent,
  isNotCapturedContent,
} from '@site/src/components/content/TranscriptViewer';
import { extractTimestampSeconds, dispatchSeekMeetingVideo } from '@site/src/utils/communityMeetings';

/**
 * Extracts plain text recursively from React nodes (used for MDX code blocks).
 */
function extractTextContent(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (!node) return '';
  if (Array.isArray(node)) return node.map(extractTextContent).join('');
  if (React.isValidElement(node)) {
    return extractTextContent((node.props as { children?: React.ReactNode }).children);
  }
  return '';
}

/**
 * Renders an MDX anchor tag. If the link or its text represents a video timestamp,
 * renders an interactive button that jumps within the in-page video player.
 */
const MeetingAnchor: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, children, ...restProps }) => {
  let textContent = '';
  if (typeof children === 'string') {
    textContent = children.trim();
  } else if (Array.isArray(children)) {
    textContent = children
      .filter(c => typeof c === 'string')
      .join('')
      .trim();
  }

  const timestampSeconds = extractTimestampSeconds(href, textContent);
  const isTimestamp = timestampSeconds !== null;
  const isTimeString = Boolean(textContent && /\b\d{1,2}:\d{2}(?::\d{2})?\b/.test(textContent));

  if (isTimestamp) {
    const handleSeekClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dispatchSeekMeetingVideo(timestampSeconds);
    };

    if (isTimeString) {
      return (
        <button
          type="button"
          onClick={handleSeekClick}
          title={`Jump to ${textContent} in video`}
          style={{ border: 'none', outline: 'none', textDecoration: 'none' }}
          className="dark:hover:bg-purple-600 mx-1 inline-flex cursor-pointer items-center gap-1 rounded-md bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-900 !no-underline shadow-sm transition hover:bg-purple-700 hover:text-white hover:!no-underline dark:bg-purple-700 dark:text-white dark:hover:text-white">
          <Icon
            icon="material-symbols:play-circle-outline-rounded"
            className="text-sm text-purple-900 dark:text-white"
          />
          <span>{children}</span>
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={handleSeekClick}
        title={`Jump to ${timestampSeconds}s in video`}
        style={{ border: 'none', outline: 'none', textDecoration: 'none' }}
        className="inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 font-semibold text-purple-700 !no-underline transition hover:text-purple-900 hover:!no-underline dark:text-purple-300 dark:hover:text-purple-100">
        <Icon icon="material-symbols:play-circle-outline-rounded" className="text-sm" />
        <span>{children}</span>
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-purple-700 underline decoration-purple-300 underline-offset-4 transition hover:text-purple-900 dark:text-purple-300 dark:decoration-purple-500 dark:hover:text-purple-100"
      {...restProps}>
      {children}
    </a>
  );
};

const IsInsidePreContext = React.createContext(false);

export const meetingMdxComponents = {
  h1: () => null,
  h2: () => null,
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof children === 'string' ? children : '';
    let icon = 'material-symbols:article-outline';
    if (/attendee/i.test(text)) icon = 'material-symbols:group-outline';
    else if (/note/i.test(text)) icon = 'material-symbols:edit-note-rounded';
    else if (/topic/i.test(text)) icon = 'material-symbols:topic-outline';
    else if (/chat/i.test(text)) icon = 'material-symbols:chat-bubble-outline';
    else if (/next/i.test(text)) icon = 'material-symbols:event-upcoming-outline';

    return (
      <div className="mb-4 mt-8 pb-1">
        <h3
          className="m-0 flex items-center gap-2.5 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          {...props}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-700 text-white">
            <Icon icon={icon} className="text-lg text-white" />
          </span>
          <span>{children}</span>
        </h3>
      </div>
    );
  },
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="mb-2 mt-6 text-base font-bold text-gray-900 dark:text-white" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className="mb-2 mt-4 text-sm font-bold text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </h5>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-3 text-justify text-[15px] leading-relaxed text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </p>
  ),
  a: MeetingAnchor,
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-3 list-disc space-y-1 pl-6 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="my-1.5 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </li>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    const rawText = extractTextContent(children);

    if (isNotCapturedContent(rawText)) {
      return (
        <div className="dark:bg-purple-950/20 dark:text-purple-200 my-4 flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50/50 p-4 text-sm text-purple-900 shadow-sm dark:border-purple-900/30">
          <Icon
            icon="material-symbols:info-outline"
            className="text-purple-600 dark:text-purple-400 shrink-0 text-xl"
          />
          <span className="font-medium">{rawText.trim()}</span>
        </div>
      );
    }

    if (isChatContent(rawText)) {
      return <ChatLogViewer rawText={rawText} />;
    }

    if (isTranscriptContent(rawText)) {
      return <TranscriptViewer rawText={rawText} />;
    }

    return (
      <div className="relative my-4 overflow-hidden rounded-xl border border-black/[0.08] bg-gray-900 shadow-sm dark:border-white/10">
        <pre className="max-h-96 overflow-auto p-5 font-mono text-xs leading-relaxed text-gray-100" {...props}>
          <IsInsidePreContext.Provider value={true}>{children}</IsInsidePreContext.Provider>
        </pre>
      </div>
    );
  },
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isInsidePre = React.useContext(IsInsidePreContext);
    if (isInsidePre) {
      return (
        <code className={className || 'font-mono text-xs text-gray-100'} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded-md bg-purple-50 px-1.5 py-0.5 font-mono text-xs font-semibold text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
        {...props}>
        {children}
      </code>
    );
  },
};
