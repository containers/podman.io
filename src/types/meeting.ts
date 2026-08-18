/**
 * Shared TypeScript types for the community meetings feature.
 *
 * `MeetingMeta`   – lightweight metadata used in the list page and on /community.
 *                   Does NOT include rawContent to keep global data small.
 *
 * `Meeting`       – full record including rawContent and prev/next navigation.
 *                   Used only on individual meeting detail pages.
 */

export type MeetingType = 'community' | 'cabal';

/**
 * Lightweight meeting metadata.
 * Stored in global Docusaurus plugin data and in the list-page JSON module.
 */
export interface MeetingMeta {
  /** YYYY-MM-DD folder name — stable, URL-safe identifier */
  slug: string;
  /** ISO date string in YYYY-MM-DD format */
  isoDate: string;
  /** Human-readable date, e.g. "August 4, 2026" */
  dateLabel: string;
  /** First H1 heading from the Markdown file */
  title: string;
  /** 'community' or 'cabal' based on the H1 heading */
  type: MeetingType;
  /** Recording URL extracted from the Markdown, or null if not available */
  recordingUrl: string | null;
}

/**
 * Full meeting record, including content and navigation.
 * Stored in per-meeting JSON modules; received as a prop by MeetingDetailPage.
 */
export interface Meeting extends MeetingMeta {
  /** Raw Markdown body (front matter stripped) ready for rendering */
  rawContent: string;
  /** Slug of the previous meeting (earlier in time), or null */
  prevSlug: string | null;
  /** Human-readable date of the previous meeting, or null */
  prevDateLabel: string | null;
  /** Slug of the next meeting (later in time), or null */
  nextSlug: string | null;
  /** Human-readable date of the next meeting, or null */
  nextDateLabel: string | null;
}
