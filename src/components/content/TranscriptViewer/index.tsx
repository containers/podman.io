import React, { useState, useMemo, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { SpeakerDropdown } from './SpeakerDropdown';

export type TranscriptTurn = {
  id: string;
  timeSeconds: number;
  timeFormatted: string;
  speaker: string;
  affiliation?: string;
  text: string;
};

export type ChatMessage = {
  id: string;
  timeSeconds: number;
  timeFormatted: string;
  speaker: string;
  affiliation?: string;
  text: string;
};

// Distinct pastel color palette for speaker avatar circles
const AVATAR_PALETTES = [
  { bg: 'bg-purple-100 dark:bg-purple-900/60', text: 'text-purple-700 dark:text-purple-300' },
  { bg: 'bg-blue-100 dark:bg-blue-900/60', text: 'text-blue-700 dark:text-blue-300' },
  { bg: 'bg-deep-purple-100 dark:bg-deep-purple-900/60', text: 'text-deep-purple-700 dark:text-deep-purple-300' },
  { bg: 'bg-[#e6f7ed] dark:bg-[#143823]', text: 'text-[#0e8a40] dark:text-[#56d389]' },
  { bg: 'bg-[#fef3e7] dark:bg-[#3d2410]', text: 'text-[#c05621] dark:text-[#f6ad55]' },
  { bg: 'bg-[#fde8e8] dark:bg-[#3d1418]', text: 'text-[#c53030] dark:text-[#feb2b2]' },
  { bg: 'bg-[#e6fffa] dark:bg-[#123032]', text: 'text-[#234e52] dark:text-[#4fd1c5]' },
  { bg: 'bg-[#ebf4ff] dark:bg-[#1e1e42]', text: 'text-[#4c51bf] dark:text-[#a3bffa]' },
];

function getSpeakerColor(speaker: string) {
  let hash = 0;
  for (let i = 0; i < speaker.length; i++) {
    hash = (hash << 5) - hash + speaker.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % AVATAR_PALETTES.length;
  return AVATAR_PALETTES[index];
}

function getSpeakerInitials(speaker: string): string {
  const parts = speaker.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return speaker.slice(0, 2).toUpperCase();
}

export function parseTimeToSeconds(timeStr: string): number {
  const clean = timeStr.trim().split('.')[0].split(',')[0];
  const parts = clean.split(':');
  if (parts.length === 3) {
    const h = parseInt(parts[0], 10) || 0;
    const m = parseInt(parts[1], 10) || 0;
    const s = parseInt(parts[2], 10) || 0;
    return h * 3600 + m * 60 + s;
  }
  if (parts.length === 2) {
    const m = parseInt(parts[0], 10) || 0;
    const s = parseInt(parts[1], 10) || 0;
    return m * 60 + s;
  }
  return 0;
}

export function formatSecondsToDisplay(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Check if a raw code string represents a "Not captured" / placeholder block
 */
export function isNotCapturedContent(content: string): boolean {
  if (!content || typeof content !== 'string') return false;
  const t = content.trim().toLowerCase();
  return (
    t === 'none' ||
    t.includes('not captured') ||
    t.includes('did not record') ||
    t.includes('raw chat was not captured') ||
    t.includes('no transcript available') ||
    t.includes('no chat available')
  );
}

/**
 * Check if a raw code string is a Zoom/Meet transcript
 */
export function isTranscriptContent(content: string): boolean {
  if (!content || typeof content !== 'string') return false;
  if (isNotCapturedContent(content)) return false;
  // If it has comma-separated SRT chat timestamps, it is a chat log, NOT a spoken transcript!
  if (/\d{2}:\d{2}:\d{2}[.,]\d{3}\s*,\s*\d{2}:\d{2}:\d{2}[.,]\d{3}/.test(content)) return false;
  // 1. Zoom VTT format: has --> timestamp arrows or WEBVTT
  if (content.includes('-->')) return true;
  if (/^WEBVTT/m.test(content)) return true;
  // 2. Google Meet header markers
  if (/- Transcript\b/i.test(content)) return true;
  if (/This editable transcript was computer generated/i.test(content)) return true;
  // 3. Google Meet transcript with repeated speaker names: "Roberto Majadas\nRoberto Majadas\n00:12:15"
  if (/^([A-Za-z\s().,'"-]{2,40})\r?\n\1\r?\n\s*(?:\d{1,2}:\d{2}:\d{2}|\d{1,2}:\d{2})\s*$/m.test(content)) {
    return true;
  }
  // 4. Multiple speaker dialogue turns (spoken meeting conversation without timestamps)
  if (!/\b(?:[01]?\d|2[0-3]):[0-5]\d\b/.test(content)) {
    const speakerLines = content.match(/^[A-Z][a-zA-Z\s.,()'-]{2,30}:\s+[^\n]+/gm);
    if (speakerLines && speakerLines.length >= 4) return true;
  }
  return false;
}

/**
 * Check if a raw code string is a chat log
 */
export function isChatContent(content: string): boolean {
  if (!content || typeof content !== 'string') return false;
  if (isNotCapturedContent(content)) return false;
  if (isTranscriptContent(content)) return false;

  // Format 1: "To Everyone" or "From ... To"
  if (/To Everyone/i.test(content)) return true;
  // Format 2: "00:07:52\tSpeaker:\tMessage" or "00:07:52 Speaker: Message"
  if (/\b(?:[01]?\d|2[0-3]):[0-5]\d(?::[0-5]\d)?\s+[^:\n]{2,40}:\s*/.test(content)) return true;
  // Format 3: SRT timestamp format: "00:10:39.522,00:10:42.522" followed by speaker line
  if (/\d{2}:\d{2}:\d{2}[.,]\d{3}\s*,\s*\d{2}:\d{2}:\d{2}[.,]\d{3}/.test(content)) return true;
  // Exclude yaml/code patterns
  if (!/^\s*(?:version:|services:|volumes:|image:)/m.test(content)) {
    // Format 4: Multi-line Speaker Name followed by time on next line:
    // e.g. "Tom Sweeney (Red Hat LLC)\n12:35" or "Brent Baude\n11:04 AM"
    if (
      /^[ \t]*[A-Za-z][A-Za-z\s().,'"-]{2,40}\r?\n\s*(?:[01]?\d|2[0-3]):[0-5]\d(?:\s*(?:AM|PM|am|pm))?\s*$/m.test(
        content,
      )
    )
      return true;
    if (/[A-Za-z][A-Za-z\s().,'"-]{2,40}(?:[01]?\d|2[0-3]):[0-5]\d\s*(?:AM|PM)/m.test(content)) return true;
    // Format 5: Speaker dialogue lines with colon (e.g. 1-3 lines of chat)
    const speakerDialogue = content.match(/^[ \t]*[A-Z][a-zA-Z\s.,()'-]{2,35}:\s+.+$/gm);
    if (speakerDialogue && speakerDialogue.length >= 1 && !content.includes('restart: always')) return true;
  }
  return false;
}

/**
 * Parse Zoom VTT or Google Meet raw transcript text into structured turns.
 * Highly optimized O(N) line-by-line parser with zero regex backtracking.
 */
export function parseTranscript(rawText: string): TranscriptTurn[] {
  if (!rawText || typeof rawText !== 'string') return [];
  const turns: TranscriptTurn[] = [];

  // 1. Zoom VTT format with --> timestamps
  if (rawText.includes('-->')) {
    const lines = rawText.split(/\r?\n/);
    let currentId = '';
    let currentStart = '';
    let currentLines: string[] = [];

    const flushCue = () => {
      if (currentStart && currentLines.length > 0) {
        const body = currentLines.join(' ').trim();
        if (body) {
          const seconds = parseTimeToSeconds(currentStart);
          const timeFormatted = formatSecondsToDisplay(seconds);

          const speakerMatch = body.match(/^([^:\n]{2,40}):\s*([\s\S]*)$/);
          let speaker = 'Speaker';
          let affiliation: string | undefined;
          let text = body;

          if (speakerMatch) {
            const rawSpeaker = speakerMatch[1].trim();
            text = speakerMatch[2].trim();
            const affMatch = rawSpeaker.match(/^(.+?)\s*\((.+?)\)$/);
            if (affMatch) {
              speaker = affMatch[1].trim();
              affiliation = affMatch[2].trim();
            } else {
              speaker = rawSpeaker;
            }
          }

          turns.push({
            id: currentId || `${turns.length + 1}`,
            timeSeconds: seconds,
            timeFormatted,
            speaker,
            affiliation,
            text,
          });
        }
      }
      currentId = '';
      currentStart = '';
      currentLines = [];
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line === 'WEBVTT') continue;

      const arrowIdx = line.indexOf('-->');
      if (arrowIdx !== -1) {
        flushCue();
        const parts = line.split('-->');
        currentStart = parts[0].trim();
        continue;
      }

      if (!currentStart && /^\d+$/.test(line)) {
        currentId = line;
        continue;
      }

      if (currentStart) {
        currentLines.push(line);
      }
    }
    flushCue();

    if (turns.length > 0) return turns;
  }

  // 2. Google Meet transcript or generic dialogue format
  // Handles:
  // - "Roberto Majadas\nRoberto Majadas\n00:12:15\nText..."
  // - "11:03\nText..."
  // - "Speaker: Text..."
  const lines = rawText.split(/\r?\n/);
  let currentSpeaker = 'Speaker';
  let currentAffiliation: string | undefined;
  let currentSeconds = 0;
  let currentLines: string[] = [];

  const flushTurn = () => {
    if (currentLines.length > 0) {
      const text = currentLines.join(' ').trim();
      if (text) {
        turns.push({
          id: `${turns.length + 1}`,
          timeSeconds: currentSeconds,
          timeFormatted: formatSecondsToDisplay(currentSeconds),
          speaker: currentSpeaker,
          affiliation: currentAffiliation,
          text,
        });
      }
    }
    currentLines = [];
  };

  const parseSpeaker = (raw: string) => {
    const clean = raw.trim();
    const affMatch = clean.match(/^(.+?)\s*\((.+?)\)$/);
    if (affMatch) {
      return { speaker: affMatch[1].trim(), affiliation: affMatch[2].trim() };
    }
    return { speaker: clean };
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line === 'WEBVTT' || /^xrq-uemd/.test(line) || /^Transcript$/i.test(line)) continue;

    // Check for "Speaker:\n" or "Speaker: Text"
    const colonSpeakerMatch = line.match(/^([A-Z][a-zA-Z\s.,()'-]{1,35}):(?:\s+(.+))?$/);
    if (colonSpeakerMatch) {
      flushTurn();
      const parsed = parseSpeaker(colonSpeakerMatch[1]);
      currentSpeaker = parsed.speaker;
      currentAffiliation = parsed.affiliation;
      if (colonSpeakerMatch[2]) {
        currentLines.push(colonSpeakerMatch[2]);
      }
      continue;
    }

    // Check if current line is a standalone timestamp e.g. "11:03" or "00:12:15"
    if (/^\d{1,2}:\d{2}(?::\d{2})?$/.test(line)) {
      flushTurn();
      currentSeconds = parseTimeToSeconds(line);
      continue;
    }

    // Check Google Meet pattern:
    // Line i: Speaker (e.g. "Roberto Majadas")
    // Line i+1: Speaker or Timestamp
    // Line i+2: Timestamp
    const line2 = lines[i + 1]?.trim() || '';
    const line3 = lines[i + 2]?.trim() || '';

    if (line.length <= 40 && !line.includes('http') && !line.includes('?') && !line.endsWith('.')) {
      if (/^\d{1,2}:\d{2}(?::\d{2})?$/.test(line2)) {
        flushTurn();
        const parsed = parseSpeaker(line);
        currentSpeaker = parsed.speaker;
        currentAffiliation = parsed.affiliation;
        currentSeconds = parseTimeToSeconds(line2);
        i++; // skip timestamp line
        continue;
      }
      if (line === line2 && /^\d{1,2}:\d{2}(?::\d{2})?$/.test(line3)) {
        flushTurn();
        const parsed = parseSpeaker(line);
        currentSpeaker = parsed.speaker;
        currentAffiliation = parsed.affiliation;
        currentSeconds = parseTimeToSeconds(line3);
        i += 2; // skip duplicate speaker and timestamp line
        continue;
      }
    }

    currentLines.push(line);
  }
  flushTurn();

  return turns;
}

/**
 * Parse in-meeting chat logs across Zoom, Google Meet, and WebVTT chat formats.
 * Instant, robust parser supporting multi-line messages, URLs, and affiliations.
 */
export function parseChatLog(rawText: string): ChatMessage[] {
  if (!rawText || typeof rawText !== 'string') return [];
  const messages: ChatMessage[] = [];
  const lines = rawText.split(/\r?\n/);

  let currentSpeaker = '';
  let currentAffiliation: string | undefined;
  let currentTimeSeconds = 0;
  let currentTimeFormatted = '';
  let currentMsgLines: string[] = [];

  const flushMessage = () => {
    if (currentSpeaker && currentMsgLines.length > 0) {
      const text = currentMsgLines.join('\n').trim();
      if (text && !/^keep$/i.test(text) && !/^pinned$/i.test(text)) {
        messages.push({
          id: `${messages.length + 1}`,
          timeSeconds: currentTimeSeconds,
          timeFormatted: currentTimeFormatted || formatSecondsToDisplay(currentTimeSeconds),
          speaker: currentSpeaker,
          affiliation: currentAffiliation,
          text,
        });
      }
    }
    currentSpeaker = '';
    currentAffiliation = undefined;
    currentTimeSeconds = 0;
    currentTimeFormatted = '';
    currentMsgLines = [];
  };

  const parseSpeaker = (raw: string) => {
    const clean = raw
      .replace(/^From\s+/i, '')
      .replace(/\s+To\s+.*$/i, '')
      .trim();
    const affMatch = clean.match(/^(.+?)\s*\((.+?)\)$/);
    if (affMatch) {
      return { speaker: affMatch[1].trim(), affiliation: affMatch[2].trim() };
    }
    return { speaker: clean };
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Format 1: "10:56:23 From Tom Sweeney (Red Hat, Inc.) To Everyone:\n Message"
    const fromMatch = line.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s+From\s+(.+?)\s+To\s+.+?:?\s*(.*)$/i);
    if (fromMatch) {
      flushMessage();
      const timeStr = fromMatch[1];
      const parsed = parseSpeaker(fromMatch[2]);
      currentSpeaker = parsed.speaker;
      currentAffiliation = parsed.affiliation;
      currentTimeSeconds = parseTimeToSeconds(timeStr);
      currentTimeFormatted = formatSecondsToDisplay(currentTimeSeconds);
      if (fromMatch[3]?.trim()) {
        currentMsgLines.push(fromMatch[3].trim());
      }
      continue;
    }

    // Format 2: SRT timestamp line e.g. "00:10:39.522,00:10:42.522"
    const srtTimeMatch = line.match(/^(\d{1,2}:\d{2}(?::\d{2})?)[.,]\d{3}\s*,\s*\d{1,2}:\d{2}/);
    if (srtTimeMatch) {
      flushMessage();
      const timeStr = srtTimeMatch[1];
      currentTimeSeconds = parseTimeToSeconds(timeStr);
      currentTimeFormatted = formatSecondsToDisplay(currentTimeSeconds);
      // Check next line for Speaker: Message
      const nextLine = lines[i + 1]?.trim() || '';
      const nextSpeakerMatch = nextLine.match(/^([A-Za-z\s().,'"-]+?):\s*(.*)$/);
      if (nextSpeakerMatch) {
        const parsed = parseSpeaker(nextSpeakerMatch[1]);
        currentSpeaker = parsed.speaker;
        currentAffiliation = parsed.affiliation;
        if (nextSpeakerMatch[2]) {
          currentMsgLines.push(nextSpeakerMatch[2]);
        }
        i++;
      }
      continue;
    }

    // Format 3: Tab or space separated "00:17:51\tMartin Beckert:\tmessage"
    const tabMatch = line.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s+([^:\t]+):\s*(.*)$/);
    if (tabMatch) {
      flushMessage();
      const timeStr = tabMatch[1];
      const parsed = parseSpeaker(tabMatch[2]);
      currentSpeaker = parsed.speaker;
      currentAffiliation = parsed.affiliation;
      currentTimeSeconds = parseTimeToSeconds(timeStr);
      currentTimeFormatted = formatSecondsToDisplay(currentTimeSeconds);
      if (tabMatch[3]?.trim()) {
        currentMsgLines.push(tabMatch[3].trim());
      }
      continue;
    }

    // Format 4: Multi-line Zoom / Google Meet format:
    // Line 1: Speaker Name (e.g. "Tom Sweeney (Red Hat LLC)" or "Brent Baude")
    // Line 2: Timestamp (e.g. "12:35" or "11:04 AM")
    const nextLine = lines[i + 1]?.trim() || '';
    const timeOnlyMatch = nextLine.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s*(?:AM|PM|am|pm)?$/i);
    if (timeOnlyMatch && line.length < 50 && !line.includes('http') && !line.startsWith('@') && !line.startsWith('>')) {
      flushMessage();
      const parsed = parseSpeaker(line);
      currentSpeaker = parsed.speaker;
      currentAffiliation = parsed.affiliation;
      const timeStr = timeOnlyMatch[1];
      currentTimeSeconds = parseTimeToSeconds(timeStr);
      currentTimeFormatted = formatSecondsToDisplay(currentTimeSeconds);
      i++;
      continue;
    }

    // Format 5: Concatenated "Brent Baude11:04 AM"
    const concatMatch = line.match(/^([A-Za-z\s().,'"-]+?)(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)$/);
    if (concatMatch && concatMatch[1].trim().length >= 2) {
      flushMessage();
      const parsed = parseSpeaker(concatMatch[1]);
      currentSpeaker = parsed.speaker;
      currentAffiliation = parsed.affiliation;
      const timeStr = concatMatch[2].trim();
      currentTimeSeconds = parseTimeToSeconds(timeStr);
      currentTimeFormatted = formatSecondsToDisplay(currentTimeSeconds);
      continue;
    }

    // Format 6: Simple speaker line without timestamp e.g. "Martin Beckert: There's a new Podlet release v0.3.2"
    const isUrlOrLabel = /https?:\/\/|blog|post|update|agenda|meeting|notes|release/i.test(line);
    const speakerLineMatch = !isUrlOrLabel && line.match(/^([A-Z][a-zA-Z\s().,'"-]{2,35}):\s+(.+)$/);
    if (speakerLineMatch && !line.startsWith('http')) {
      flushMessage();
      const parsed = parseSpeaker(speakerLineMatch[1]);
      currentSpeaker = parsed.speaker;
      currentAffiliation = parsed.affiliation;
      currentTimeSeconds = 0;
      currentTimeFormatted = '';
      currentMsgLines.push(speakerLineMatch[2]);
      continue;
    }

    if (currentSpeaker) {
      currentMsgLines.push(line);
    }
  }
  flushMessage();

  return messages;
}

export type TranscriptViewerProps = {
  rawText: string;
  onSeekTimestamp?: (seconds: number) => void;
};

interface TurnRowProps {
  turn: TranscriptTurn;
  isSelected: boolean;
  copied: boolean;
  onTimestampClick: (turn: TranscriptTurn) => void;
  onCopyQuote: (turn: TranscriptTurn) => void;
}

const TurnRow = React.memo(function TurnRow({
  turn,
  isSelected,
  copied,
  onTimestampClick,
  onCopyQuote,
}: TurnRowProps): JSX.Element {
  const colors = getSpeakerColor(turn.speaker);
  const initials = getSpeakerInitials(turn.speaker);

  return (
    <div
      className={`group flex items-start gap-4 p-4 transition-colors duration-150 ${
        isSelected ? 'bg-purple-100/60 dark:bg-purple-900/30' : 'hover:bg-gray-50/70 dark:hover:bg-[#25242b]/80'
      }`}>
      {/* Left Column: Timestamp Pill */}
      <div className="shrink-0 pt-0.5">
        <button
          type="button"
          onClick={() => onTimestampClick(turn)}
          style={{ border: 'none', outline: 'none' }}
          title={`Seek video to ${turn.timeFormatted}`}
          className="hover:bg-purple-800 dark:hover:bg-purple-600 inline-flex items-center gap-1 rounded border-0 border-none bg-purple-700 px-2 py-1 font-mono text-xs font-semibold text-white shadow-sm transition dark:bg-purple-700 dark:text-white">
          <Icon
            icon="material-symbols:play-arrow-rounded"
            className="text-xs text-white transition-transform group-hover:scale-110"
          />
          <span>{turn.timeFormatted}</span>
        </button>
      </div>

      {/* Right Column: Speaker Name + Spoken Text */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Speaker Initials Avatar */}
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${colors.bg} ${colors.text}`}>
              {initials}
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">{turn.speaker}</span>
            {turn.affiliation && (
              <span className="border-gray-200 shadow-xs rounded-md border bg-white px-2 py-0.5 text-[11px] font-medium text-gray-700 dark:border dark:border-[#4d465c] dark:bg-[#2d2c35] dark:text-gray-100">
                {turn.affiliation}
              </span>
            )}
          </div>

          {/* Copy Quote Button on hover */}
          <button
            type="button"
            onClick={() => onCopyQuote(turn)}
            style={{ border: 'none', outline: 'none' }}
            className="text-gray-400 border-0 border-none opacity-0 transition-opacity duration-150 group-hover:opacity-100 hover:text-purple-700 dark:text-gray-500 dark:hover:text-purple-300"
            title="Copy Quote">
            <Icon
              icon={copied ? 'material-symbols:check-rounded' : 'material-symbols:content-copy-outline'}
              className={`text-sm ${copied ? 'text-green-600' : ''}`}
            />
          </button>
        </div>

        {/* Spoken Text */}
        <p className="m-0 mt-1.5 text-sm leading-relaxed text-gray-700 dark:text-gray-100">{turn.text}</p>
      </div>
    </div>
  );
});

/**
 * World-class interactive transcript viewer matching the user's reference design
 */
export function TranscriptViewer({ rawText, onSeekTimestamp }: TranscriptViewerProps): JSX.Element {
  const turns = useMemo(() => parseTranscript(rawText), [rawText]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('all');
  const [activeTurnId, setActiveTurnId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract list of unique speakers with turn counts
  const speakerStats = useMemo(() => {
    const map = new Map<string, number>();
    turns.forEach(t => {
      map.set(t.speaker, (map.get(t.speaker) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [turns]);

  // Filter turns by search query and speaker
  const filteredTurns = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return turns.filter(turn => {
      const matchSpeaker = selectedSpeaker === 'all' || turn.speaker === selectedSpeaker;
      if (!matchSpeaker) return false;
      if (!q) return true;
      return (
        turn.text.toLowerCase().includes(q) || turn.speaker.toLowerCase().includes(q) || turn.timeFormatted.includes(q)
      );
    });
  }, [turns, searchQuery, selectedSpeaker]);

  const handleCopyQuote = useCallback((turn: TranscriptTurn) => {
    const quote = `[${turn.timeFormatted}] ${turn.speaker}: "${turn.text}"`;
    navigator.clipboard.writeText(quote);
    setCopiedId(turn.id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const handleTimestampClick = useCallback(
    (turn: TranscriptTurn) => {
      setActiveTurnId(turn.id);
      if (onSeekTimestamp) {
        onSeekTimestamp(turn.timeSeconds);
      } else {
        // Broadcast custom event in case YouTube player is listening
        window.dispatchEvent(new CustomEvent('seekMeetingVideo', { detail: { seconds: turn.timeSeconds } }));
      }
    },
    [onSeekTimestamp],
  );

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-sm transition-all duration-200 dark:border-white/10 dark:bg-[#1b1b1d]">
      {/* Header Bar */}
      <div className="flex flex-col gap-3 border-b border-black/[0.06] bg-gray-50/70 p-4 dark:border-b dark:border-white/10 dark:bg-[#212027] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-700 text-white shadow-sm">
            <Icon icon="material-symbols:record-voice-over-outline-rounded" className="text-lg text-white" />
          </div>
          <div>
            <h4 className="m-0 text-sm font-bold text-gray-900 dark:text-white">Meeting Audio Transcript</h4>
            <div className="text-xs text-gray-500 dark:text-gray-300">
              {turns.length} turns • {speakerStats.length} speakers
            </div>
          </div>
        </div>

        {/* Controls: Search and Speaker Filter */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Transcript Search */}
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Icon
              icon="material-symbols:search"
              className="dark:text-gray-400 pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
            />
            <input
              type="text"
              placeholder="Search transcript..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ outline: 'none' }}
              className="dark:placeholder:text-gray-400 dark:focus:border-purple-400 w-full rounded-full border border-[#d0ccd8] bg-white py-1.5 pl-8 pr-7 text-xs text-gray-900 shadow-sm outline-none transition hover:border-[#a8a2b5] focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-[#443e50] dark:bg-[#25242b] dark:text-white dark:hover:border-[#635b75] dark:focus:ring-purple-900/40"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{ border: 'none', outline: 'none' }}
                className="dark:text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 border-0 text-gray-500 hover:text-gray-700 dark:hover:text-white">
                <Icon icon="material-symbols:close" className="text-xs" />
              </button>
            )}
          </div>

          {/* Custom Styled Speaker Dropdown UI */}
          <SpeakerDropdown
            selectedSpeaker={selectedSpeaker}
            onSelectSpeaker={setSelectedSpeaker}
            speakerStats={speakerStats}
            totalTurns={turns.length}
          />
        </div>
      </div>

      {/* Transcript Dialogue List (matching user's reference image) */}
      <div
        className="transcript-dialogue-list no-scrollbar max-h-[520px] divide-y divide-black/[0.06] overflow-y-auto transition-all dark:divide-white/10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {filteredTurns.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500 dark:text-gray-300">
            No spoken dialogue found matching "{searchQuery}".
          </div>
        ) : (
          filteredTurns.map(turn => (
            <TurnRow
              key={turn.id}
              turn={turn}
              isSelected={activeTurnId === turn.id}
              copied={copiedId === turn.id}
              onTimestampClick={handleTimestampClick}
              onCopyQuote={handleCopyQuote}
            />
          ))
        )}
      </div>

      {/* Footer / Status bar */}
      <div className="flex items-center justify-between border-t border-black/[0.06] bg-gray-50/50 px-4 py-2 text-xs text-gray-500 dark:border-t dark:border-white/10 dark:bg-[#212027] dark:text-gray-300">
        <span>
          Showing {filteredTurns.length} of {turns.length} utterances
        </span>
        <span className="text-[11px] italic text-gray-500 dark:text-gray-300">
          💡 Click any timestamp to jump the video recording to that exact moment
        </span>
      </div>
    </div>
  );
}

const ChatMessageRow = React.memo(function ChatMessageRow({ msg }: { msg: ChatMessage }): JSX.Element {
  const colors = getSpeakerColor(msg.speaker);
  const isUrl = /^https?:\/\//i.test(msg.text);

  return (
    <div className="flex items-start gap-2.5 text-xs">
      <span className="text-gray-400 shrink-0 pt-0.5 font-mono font-medium dark:text-gray-300">
        {msg.timeFormatted}
      </span>
      <div className="flex-1">
        <span className={`font-bold ${colors.text} mr-1.5`}>{msg.speaker}:</span>
        {isUrl ? (
          <a
            href={msg.text}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-purple-700 underline underline-offset-2 hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100">
            {msg.text}
          </a>
        ) : (
          <span className="text-gray-800 dark:text-gray-100">{msg.text}</span>
        )}
      </div>
    </div>
  );
});

/**
 * Clean in-meeting chat log viewer
 */
export function ChatLogViewer({ rawText }: { rawText: string }): JSX.Element {
  const messages = useMemo(() => parseChatLog(rawText), [rawText]);
  const [copied, setCopied] = useState(false);

  const handleCopyChat = useCallback(() => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [rawText]);

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-sm dark:border-white/10 dark:bg-[#1b1b1d]">
      <div className="flex items-center justify-between border-b border-black/[0.06] bg-gray-50/70 p-3.5 dark:border-b dark:border-white/10 dark:bg-[#212027]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-700 text-white shadow-sm">
            <Icon icon="material-symbols:chat-outline-rounded" className="text-lg text-white" />
          </div>
          <h4 className="m-0 text-sm font-bold text-gray-900 dark:text-white">
            Meeting Chat Transcript ({messages.length} messages)
          </h4>
        </div>
        <button
          type="button"
          onClick={handleCopyChat}
          style={{ outline: 'none' }}
          className="text-gray-800 shadow-xs inline-flex items-center gap-1.5 rounded-lg border border-[#d0ccd8] bg-white px-3 py-1.5 text-xs font-semibold transition hover:border-[#a8a2b5] hover:bg-gray-50 hover:text-purple-700 dark:border-0 dark:bg-[#25242b] dark:text-gray-100 dark:hover:bg-[#2e2d36] dark:hover:text-white">
          <Icon
            icon={copied ? 'material-symbols:check-rounded' : 'material-symbols:content-copy-outline'}
            className={`text-sm ${copied ? 'text-green-600' : 'text-gray-600 dark:text-gray-300'}`}
          />
          <span>{copied ? 'Copied!' : 'Copy Chat'}</span>
        </button>
      </div>

      <div
        className="chat-log-list no-scrollbar max-h-72 space-y-2.5 overflow-y-auto p-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {messages.map(msg => (
          <ChatMessageRow key={msg.id} msg={msg} />
        ))}
      </div>
    </div>
  );
}

export default TranscriptViewer;
