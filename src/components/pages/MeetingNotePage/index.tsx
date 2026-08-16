import React from 'react';
import Layout from '@theme/Layout';
import Markdown from '@site/src/components/utilities/Markdown';
import VideoEmbed from '@site/src/components/ui/VideoEmbed';

type MeetingNote = {
  slug: string;
  displayDate: string;
  title: string;
  recordingLink?: string;
  recordingEmbedUrl?: string;
  content: string;
};

// The page already renders the title in its own header, so drop the matching
// leading `# Title` line from the markdown to avoid showing it twice.
function stripLeadingTitle(content: string, title: string): string {
  return content.replace(new RegExp(`^#\\s+${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\n`), '');
}

function MeetingNotePage({ note }: { note: MeetingNote }): JSX.Element {
  return (
    <Layout title={`${note.title} - ${note.displayDate}`} description="Podman Community meeting notes">
      <article className="container mx-auto max-w-3xl py-12">
        <a
          href="/community"
          className="mb-6 inline-block text-sm font-semibold text-purple-700 no-underline hover:text-purple-900 hover:underline dark:text-purple-500 dark:hover:text-purple-300">
          ← Back to Community
        </a>
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-purple-700 dark:text-purple-500">{note.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-300">{note.displayDate}</p>
        </header>
        {note.recordingEmbedUrl ? (
          <div className="mb-8">
            <VideoEmbed url={note.recordingEmbedUrl} title={note.title} />
          </div>
        ) : note.recordingLink ? (
          <p className="mb-8 text-center">
            <a
              href={note.recordingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-purple-700 no-underline hover:text-purple-900 hover:underline dark:text-purple-500 dark:hover:text-purple-300">
              Watch Recording
            </a>
          </p>
        ) : null}
        <Markdown text={stripLeadingTitle(note.content, note.title)} styles="max-w-none" />
      </article>
    </Layout>
  );
}

export default MeetingNotePage;
