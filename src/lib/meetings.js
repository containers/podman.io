const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Recordings are almost always YouTube (see extractRecordingLink), but a handful
// link to BlueJeans/Drive instead — those fall back to a plain external link.
function getYouTubeEmbedUrl(url) {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : undefined;
    }
    if (parsed.hostname.endsWith('youtube.com')) {
      const id = parsed.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : undefined;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

function extractFirstHeading(body, level) {
  const re = new RegExp(`^${level}\\s+(.+)$`, 'm');
  const match = body.match(re);
  return match ? match[1].trim() : undefined;
}

function extractRecordingLink(body) {
  const lines = body.split('\n');
  const linkLine = lines.find(line => /video|recording|bluejeans/i.test(line) && /\[[^\]]*\]\([^)]+\)/.test(line));
  const match = linkLine && linkLine.match(/\[[^\]]*\]\(([^)]+)\)/);
  return match ? match[1] : undefined;
}

function getMeetingNotes(notesDir) {
  const slugs = fs
    .readdirSync(notesDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .filter(name => /^\d{4}-\d{2}-\d{2}$/.test(name));

  const notes = slugs
    .map(slug => {
      const filePath = path.join(notesDir, slug, 'index.md');
      if (!fs.existsSync(filePath)) return null;

      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data: frontmatter, content } = matter(raw);

      const title = frontmatter.title || extractFirstHeading(content, '#') || 'Podman Community Meeting';
      const dateHeading = extractFirstHeading(content, '##') || slug;
      const displayDate = dateHeading.split(/\d{2}:\d{2}/)[0].trim();

      // Jekyll leftovers like `# {{ page.title }}` render literally; swap in the resolved title instead.
      const cleanedContent = content.replace(/^#\s+\{\{.*\}\}\s*$/m, `# ${title}`);

      const recordingLink = extractRecordingLink(content);

      return {
        slug,
        date: slug,
        displayDate,
        title,
        isCabal: title.toLowerCase().includes('cabal'),
        recordingLink,
        recordingEmbedUrl: getYouTubeEmbedUrl(recordingLink),
        content: cleanedContent,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date));

  return {
    community: notes.filter(note => !note.isCabal),
    cabal: notes.filter(note => note.isCabal),
  };
}

module.exports = { getMeetingNotes, getYouTubeEmbedUrl };
