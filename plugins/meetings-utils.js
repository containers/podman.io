// @ts-check
'use strict';

/**
 * Mapping of month name → 1-based month number.
 * Used to parse human-readable date headings inside Markdown files.
 */
const MONTH_NAMES = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

/**
 * Formats a year/month/day triple into a human-readable string.
 * Example: formatDateLabel(2026, 8, 4) → "August 4, 2026"
 * @param {number} year
 * @param {number} month  1-based month
 * @param {number} day
 * @returns {string}
 */
function formatDateLabel(year, month, day) {
  const name = MONTH_NAMES[month - 1];
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return `${capitalized} ${day}, ${year}`;
}

/**
 * Strips Jekyll/YAML front matter (--- … ---) from the top of a file.
 * Older meeting files were authored for a Jekyll-based website and contain
 * front matter that should not be rendered on the new Docusaurus site.
 * @param {string} content  Raw file content
 * @returns {string}        Content with front matter removed
 */
function stripFrontMatter(content) {
  const lines = content.split('\n');
  if (!lines[0] || lines[0].trim() !== '---') {
    return content;
  }
  // Find the closing ---
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      return lines.slice(i + 1).join('\n');
    }
  }
  // Malformed front matter — return as-is so we don't silently discard content
  return content;
}

/**
 * Determines the meeting type by inspecting the first H1 heading.
 * If the H1 contains "Cabal" (case-insensitive) → 'cabal', otherwise 'community'.
 * This is deliberately conservative: everything that is not explicitly a Cabal
 * meeting is classified as a community meeting.
 * @param {string} body  Markdown body (front matter already stripped)
 * @returns {'community' | 'cabal'}
 */
function detectMeetingType(body) {
  const h1Match = body.match(/^# (.+)$/m);
  if (h1Match && /cabal/i.test(h1Match[1])) {
    return 'cabal';
  }
  return 'community';
}

/**
 * Extracts the human-readable title from the first H1 heading.
 * Falls back to a sensible default so the page is never untitled.
 * @param {string} body
 * @param {'community' | 'cabal'} type
 * @returns {string}
 */
function extractTitle(body, type) {
  const h1Match = body.match(/^# (.+)$/m);
  if (h1Match && h1Match[1].trim() && h1Match[1].trim() !== '{{ page.title }}') {
    return h1Match[1].trim();
  }
  return type === 'cabal'
    ? 'Podman Community Cabal Notes'
    : 'Podman Community Meeting Notes';
}

/**
 * Tries to extract a human-readable date string from the Markdown body.
 * Meeting files contain headings like:
 *   ## August 4, 2026 11:00 a.m. Eastern (UTC-4)
 *   ## November 3, 2020 11:00 a.m. Eastern
 *   ## October 21, 2021 11:00 a.m. Eastern
 *
 * We extract only the date portion (Month D, YYYY) and strip the time.
 * Falls back to formatting the slug date so we always return a value.
 *
 * @param {string} body
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @returns {string}
 */
function extractDateLabel(body, year, month, day) {
  // Match H2 headings that start with a capitalized month name followed by a date
  const h2Match = body.match(
    /^## (January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}/im,
  );
  if (h2Match) {
    // Strip time component (everything after the year)
    const raw = h2Match[0].replace(/^## /, '').trim();
    const dateOnly = raw.match(
      /^([A-Za-z]+ \d{1,2}, \d{4})/,
    );
    if (dateOnly) {
      return dateOnly[1];
    }
  }
  return formatDateLabel(year, month, day);
}

/**
 * Extracts the URL of the meeting recording from the Markdown body.
 * Handles all known historical formats:
 *
 *   Format A (2022+):      Video [Recording](https://youtu.be/…)
 *   Format B (2021–2022):  [Recording](https://bluejeans.com/…)
 *   Format C (some files): BlueJeans [Recording](https://…)
 *   Format D (older):      ### BlueJeans [Recording](https://…)
 *   Format E (some files): [Watch Recording](https://…)
 *
 * Returns null if no recording link is found (e.g. upcoming meetings,
 * meetings whose recordings were not preserved).
 *
 * @param {string} body
 * @returns {string | null}
 */
function extractRecordingUrl(body) {
  const patterns = [
    // Format A: "Video [Recording](URL)"
    /Video\s+\[Recording\]\((https?:\/\/[^)]+)\)/i,
    // Format B/C/D: "[Recording](URL)" optionally preceded by "BlueJeans"
    /\[Recording\]\((https?:\/\/[^)]+)\)/i,
    // Format E: "[Watch Recording](URL)"
    /\[Watch Recording\]\((https?:\/\/[^)]+)\)/i,
    // Generic fallback: any link anchor containing "record"
    /\[(?:[^\]]*[Rr]ecord[^\]]*)\]\((https?:\/\/[^)]+)\)/,
  ];

  for (const pattern of patterns) {
    const match = body.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

/**
 * Parses a single meeting's `index.md` content and returns a structured record.
 *
 * The slug (YYYY-MM-DD folder name) is the authoritative source for the meeting
 * date — it is always well-formed and never requires interpretation.  The
 * human-readable date label is derived secondarily from the Markdown headings.
 *
 * @param {string} rawContent  Full contents of the meeting's index.md file
 * @param {string} slug        Folder name in YYYY-MM-DD format
 * @returns {{
 *   slug: string,
 *   isoDate: string,
 *   dateLabel: string,
 *   title: string,
 *   type: 'community' | 'cabal',
 *   recordingUrl: string | null,
 *   rawContent: string,
 * }}
 * @throws {Error} if slug is not a valid YYYY-MM-DD date
 */
function parseMeetingMarkdown(rawContent, slug) {
  // Validate slug format — this is our authoritative date source
  const slugMatch = slug.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!slugMatch) {
    throw new Error(
      `[meetings-plugin] Invalid slug format: "${slug}". Expected YYYY-MM-DD.`,
    );
  }

  const year = parseInt(slugMatch[1], 10);
  const month = parseInt(slugMatch[2], 10);
  const day = parseInt(slugMatch[3], 10);
  const isoDate = slug; // Already in YYYY-MM-DD form

  let body = stripFrontMatter(rawContent).trim();
  const type = detectMeetingType(body);
  const title = extractTitle(body, type);
  
  // Replace legacy Jekyll {{ page.title }} tags with the actual resolved title
  body = body.replace(/\{\{\s*page\.title\s*\}\}/g, title);

  const dateLabel = extractDateLabel(body, year, month, day);
  const recordingUrl = extractRecordingUrl(body);

  return {
    slug,
    isoDate,
    dateLabel,
    title,
    type,
    recordingUrl,
    rawContent: body,
  };
}

module.exports = {
  parseMeetingMarkdown,
  // Exported individually for unit testing
  stripFrontMatter,
  detectMeetingType,
  extractTitle,
  extractDateLabel,
  extractRecordingUrl,
  formatDateLabel,
};
