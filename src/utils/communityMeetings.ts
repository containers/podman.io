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
