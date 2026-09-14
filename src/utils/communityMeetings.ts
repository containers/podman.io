import type { ComponentType } from 'react';
import * as markDownFiles from '@site/static/data/meetings/notes/index';

export type MeetingItem = {
  id: string; // e.g. "2026-08-04"
  title: string;
  isCabal: boolean;
  date: string; // e.g. "Aug 4, 2026"
  day: string; // e.g. "Tuesday"
  year: number;
  fullDate: string; // e.g. "Aug 4, 2026 11:00 a.m. Eastern (UTC-4)"
  recordingUrl?: string;
  recordingText?: string;
  searchIndex?: string;
  Component?: ComponentType<unknown>;
};

let cachedMeetings: MeetingItem[] | null = null;

export function getAllMeetings(): MeetingItem[] {
  if (cachedMeetings) {
    return cachedMeetings;
  }

  const list: MeetingItem[] = [];

  Object.entries(markDownFiles).forEach(([key, mdFile]: [string, unknown]) => {
    if (!mdFile) return;

    const file = mdFile as {
      contentTitle?: string;
      toc?: Array<{ value?: string }>;
      default?: (ref: unknown) => { props?: { children?: Array<{ props?: { children?: unknown[]; href?: string } }> } };
    };

    // key is like "F20260804"
    const rawDateStr = key.replace(/^F/, '');
    const yearStr = rawDateStr.slice(0, 4);
    const monthStr = rawDateStr.slice(4, 6);
    const dayStr = rawDateStr.slice(6, 8);
    const id = `${yearStr}-${monthStr}-${dayStr}`;
    const year = parseInt(yearStr, 10);

    const title: string = file.contentTitle || 'Podman Community Meeting Notes';
    const isCabal = title.toLowerCase().includes('cabal');

    const tocVal: string = (file.toc?.[0]?.value as string) || '';
    const datePart = tocVal.split(/[0-9]{1,2}:[0-9]{2}/)[0].trim() || id;

    // Calculate day of the week
    let day = 'Tuesday';
    try {
      const dateObj = new Date(`${yearStr}-${monthStr}-${dayStr}T12:00:00Z`);
      if (!isNaN(dateObj.getTime())) {
        day = dateObj.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
      }
    } catch {
      // fallback
    }

    // Extract recording link
    let recordingUrl: string | undefined = undefined;
    let recordingText = 'Watch Recording';

    try {
      const dummyRef = { current: null };
      const mdReader = typeof file.default === 'function' ? file.default(dummyRef) : null;
      if (mdReader?.props?.children) {
        for (const child of mdReader.props.children) {
          const field1 = child?.props?.children?.[0];
          const field2 = child?.props?.children?.[1] as { props?: { href?: string; children?: string } } | undefined;
          if (
            typeof field1 === 'string' &&
            (field1.includes('BlueJeans') || field1.includes('Video') || field1.includes('Recording'))
          ) {
            if (field2?.props?.href) {
              recordingUrl = field2.props.href;
              recordingText = field2.props.children || 'Watch Recording';
              break;
            }
          }
        }
      }
    } catch {
      // ignore
    }

    const tocHeadings = Array.isArray(file.toc)
      ? file.toc.map(item => (typeof item?.value === 'string' ? item.value : '')).filter(Boolean)
      : [];
    const searchIndex = [id, datePart, day, title, tocVal, ...tocHeadings].join(' ').toLowerCase();

    list.push({
      id,
      title,
      isCabal,
      date: datePart,
      day,
      year,
      fullDate: tocVal || datePart,
      recordingUrl,
      recordingText,
      searchIndex,
      Component: file.default as ComponentType<unknown> | undefined,
    });
  });

  // Sort descending by id (YYYY-MM-DD)
  list.sort((a, b) => b.id.localeCompare(a.id));

  cachedMeetings = list;
  return cachedMeetings;
}

export function getCommunityMeetings(): MeetingItem[] {
  return getAllMeetings().filter(m => !m.isCabal);
}

export function getCabalMeetings(): MeetingItem[] {
  return getAllMeetings().filter(m => m.isCabal);
}

export function getRecentCommunityMeetings(count = 4): MeetingItem[] {
  return getCommunityMeetings().slice(0, count);
}

export function getRecentCabalMeetings(count = 4): MeetingItem[] {
  return getCabalMeetings().slice(0, count);
}

export function getMeetingById(id: string): MeetingItem | undefined {
  return getAllMeetings().find(m => m.id === id);
}

/**
 * Extracts YouTube video ID (11 characters) from standard and shortened YouTube URLs.
 */
export function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

/**
 * Automatically parses time patterns like "01:29", "17:30", "1:35", "1:23:45"
 * from text into total seconds.
 */
export function parseTimeString(timeStr: string): number | null {
  if (!timeStr) return null;
  // Match any MM:SS or HH:MM:SS pattern anywhere in the string
  const match = timeStr.match(/\b(?:(\d{1,2}):)?(\d{1,2}):(\d{2})\b/);
  if (!match) return null;

  const [, hStr, mStr, sStr] = match;
  const m = parseInt(mStr, 10);
  const s = parseInt(sStr, 10);
  if (isNaN(m) || isNaN(s)) return null;

  if (hStr !== undefined) {
    const h = parseInt(hStr, 10);
    if (!isNaN(h)) {
      return h * 3600 + m * 60 + s;
    }
  }
  return m * 60 + s;
}

/**
 * Extracts timestamp in seconds from a URL parameter (t=... or start=...).
 * Supports "89s", "89", "1h2m3s", "1m29s", etc.
 */
export function parseUrlTimestamp(url: string): number | null {
  if (!url) return null;
  const match = url.match(/[?&](?:t|start)=([0-9hms:]+)/i);
  if (match) {
    const val = match[1];
    if (/^\d+s?$/i.test(val)) {
      return parseInt(val.replace(/s$/i, ''), 10);
    }
    let total = 0;
    let matched = false;
    const h = val.match(/(\d+)h/i);
    if (h) {
      total += parseInt(h[1], 10) * 3600;
      matched = true;
    }
    const m = val.match(/(\d+)m/i);
    if (m) {
      total += parseInt(m[1], 10) * 60;
      matched = true;
    }
    const s = val.match(/(\d+)s/i);
    if (s) {
      total += parseInt(s[1], 10);
      matched = true;
    }
    if (matched) return total;

    const fromColon = parseTimeString(val);
    if (fromColon !== null) return fromColon;
  }
  return null;
}

/**
 * Automatically detects and extracts the target timestamp in seconds.
 *
 * The visible link text (e.g. "17:30", "01:29", "08:47") is always prioritized
 * as the user-visible ground truth. This automatically detects where to jump in the
 * YouTube timeline even if a markdown URL has no timestamp or has a copy-pasted wrong parameter.
 * If the link text is regular words (e.g. "demonstrated" or "here"), it falls back to URL parameters.
 */
export function extractTimestampSeconds(href?: string, text?: string): number | null {
  // 1. Text is ALWAYS the user-facing truth!
  if (text) {
    const fromText = parseTimeString(text);
    if (fromText !== null) return fromText;
  }

  // 2. Fallback to URL parameters (e.g. &t=492s)
  if (href) {
    const fromUrl = parseUrlTimestamp(href);
    if (fromUrl !== null) return fromUrl;
  }

  return null;
}

/**
 * Event name for seeking the embedded meeting video player.
 */
export const SEEK_MEETING_VIDEO_EVENT = 'seekMeetingVideo';

export interface SeekMeetingVideoDetail {
  seconds: number;
}

/**
 * Dispatches a typed custom event to seek the active embedded video player.
 */
export function dispatchSeekMeetingVideo(seconds: number): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<SeekMeetingVideoDetail>(SEEK_MEETING_VIDEO_EVENT, {
      detail: { seconds: Math.max(0, Math.floor(seconds)) },
    }),
  );
}
