// @ts-check
'use strict';

const path = require('path');
const fs = require('fs');
const { parseMeetingMarkdown } = require('./meetings-utils');

/**
 * Reads all meeting folders from the canonical notes directory and parses
 * each one into a structured record.
 *
 * Folder discovery rules:
 *   - Must be a directory (not a file)
 *   - Name must match YYYY-MM-DD exactly
 *   - Must contain an index.md file
 *
 * Folders that do not match or whose index.md cannot be parsed are
 * logged as warnings and skipped rather than crashing the build.
 *
 * @param {string} notesDir  Absolute path to static/data/meetings/notes/
 * @returns {Array<object>}  Parsed meeting records, sorted ascending by isoDate
 */
function discoverMeetings(notesDir) {
  /** @type {fs.Dirent[]} */
  let entries;
  try {
    entries = fs.readdirSync(notesDir, { withFileTypes: true });
  } catch (err) {
    throw new Error(
      `[meetings-plugin] Cannot read meetings directory at "${notesDir}": ${err.message}`,
    );
  }

  const slugs = entries
    .filter(d => d.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(d.name))
    .map(d => d.name)
    .sort(); // ascending chronological order

  const meetings = [];
  for (const slug of slugs) {
    const mdPath = path.join(notesDir, slug, 'index.md');
    if (!fs.existsSync(mdPath)) {
      console.warn(
        `[meetings-plugin] No index.md found for meeting "${slug}" — skipping.`,
      );
      continue;
    }

    const rawContent = fs.readFileSync(mdPath, 'utf-8');
    try {
      meetings.push(parseMeetingMarkdown(rawContent, slug));
    } catch (err) {
      console.warn(
        `[meetings-plugin] Failed to parse meeting "${slug}": ${err.message} — skipping.`,
      );
    }
  }

  return meetings;
}

/**
 * Attaches previous/next navigation slugs to each meeting record.
 * Mutates the records in-place for efficiency.
 *
 * Navigation is chronological: "previous" means the meeting that occurred
 * before this one in time; "next" means the one that occurred after.
 *
 * @param {Array<object>} meetings  Sorted ascending by isoDate
 */
function attachNavigation(meetings) {
  for (let i = 0; i < meetings.length; i++) {
    meetings[i].prevSlug = i > 0 ? meetings[i - 1].slug : null;
    meetings[i].prevDateLabel = i > 0 ? meetings[i - 1].dateLabel : null;
    meetings[i].nextSlug =
      i < meetings.length - 1 ? meetings[i + 1].slug : null;
    meetings[i].nextDateLabel =
      i < meetings.length - 1 ? meetings[i + 1].dateLabel : null;
  }
}

/**
 * Custom Docusaurus v2 plugin that generates a dedicated page for every
 * community meeting and a listing/archive page for all meetings.
 *
 * Routes created:
 *   /community/meetings                    — MeetingListPage component
 *   /community/meetings/:slug (×N)         — MeetingDetailPage component
 *
 * Global data set (readable via usePluginData('meetings-plugin')):
 *   Array of MeetingMeta objects (metadata only, no rawContent)
 *   Used by CommunityMeetingsCardGrid to show recent meetings on /community.
 *
 * @param {import('@docusaurus/types').LoadContext} context
 * @returns {import('@docusaurus/types').Plugin}
 */
function meetingsPlugin(context) {
  const notesDir = path.join(
    context.siteDir,
    'static',
    'data',
    'meetings',
    'notes',
  );

  return {
    name: 'meetings-plugin',

    // ─── Phase 1: Load ──────────────────────────────────────────────────────
    async loadContent() {
      const meetings = discoverMeetings(notesDir);
      attachNavigation(meetings);
      return meetings;
    },

    // ─── Phase 2: Generate routes ────────────────────────────────────────────
    async contentLoaded({ content, actions }) {
      /** @type {Array<Record<string, unknown>>} */
      const meetings = /** @type {any} */ (content);
      const { addRoute, createData, setGlobalData } = actions;

      // Share lightweight metadata with the community page via global data.
      // rawContent is intentionally excluded from global data — it is large
      // and only needed on individual meeting pages.
      const meetingsMeta = meetings.map(
        ({ rawContent: _raw, ...meta }) => meta,
      );
      setGlobalData(meetingsMeta);

      // ── List page ─────────────────────────────────────────────────────────
      const listDataPath = await createData(
        'meetings-list.json',
        JSON.stringify(meetingsMeta),
      );
      addRoute({
        path: '/community/meetings',
        component:
          '@site/src/components/community/meetings/MeetingListPage',
        modules: { meetings: listDataPath },
        exact: true,
      });

      // ── Individual meeting pages ──────────────────────────────────────────
      for (const rawMeeting of meetings) {
        const meeting = /** @type {any} */ (rawMeeting);
        const meetingDataPath = await createData(
          // Use a filename that is safe across all operating systems
          `meeting-${meeting.slug}.json`,
          JSON.stringify(meeting),
        );
        addRoute({
          path: `/community/meetings/${meeting.slug}`,
          component:
            '@site/src/components/community/meetings/MeetingDetailPage',
          modules: { meeting: meetingDataPath },
          exact: true,
        });
      }
    },
  };
}

module.exports = meetingsPlugin;
