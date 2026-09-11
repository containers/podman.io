import React, { useState, useMemo, useCallback } from 'react';
import { Icon } from '@iconify/react';

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
  { bg: 'bg-purple-100 dark:bg-purple-900/50', text: 'text-purple-700 dark:text-purple-300' },
  { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-700 dark:text-blue-300' },
  { bg: 'bg-emerald-100 dark:bg-emerald-900/50', text: 'text-emerald-700 dark:text-emerald-300' },
  { bg: 'bg-amber-100 dark:bg-amber-900/50', text: 'text-amber-700 dark:text-amber-300' },
  { bg: 'bg-rose-100 dark:bg-rose-900/50', text: 'text-rose-700 dark:text-rose-300' },
  { bg: 'bg-cyan-100 dark:bg-cyan-900/50', text: 'text-cyan-700 dark:text-cyan-300' },
  { bg: 'bg-indigo-100 dark:bg-indigo-900/50', text: 'text-indigo-700 dark:text-indigo-300' },
  { bg: 'bg-teal-100 dark:bg-teal-900/50', text: 'text-teal-700 dark:text-teal-300' },
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
 * Check if a raw code string is a Zoom/Meet transcript
 */
export function isTranscriptContent(content: string): boolean {
  if (!content || typeof content !== 'string') return false;
  // Check for WebVTT cues or timestamp arrows: 00:10:52.070 --> 00:10:58.269
  if (/-->/m.test(content) && /\d{1,2}:\d{2}:\d{2}/.test(content)) return true;
  if (/^WEBVTT/m.test(content)) return true;
  // Check for dialogue with timestamps like "00:02:56" and speaker names
  const speakerLines = content.match(/^[A-Z][a-zA-Z\s.,()'-]{2,30}:\s+[^\n]+/gm);
  if (speakerLines && speakerLines.length >= 4) return true;
  return false;
}

/**
 * Check if a raw code string is a chat log
 */
export function isChatContent(content: string): boolean {
  if (!content || typeof content !== 'string') return false;
  // Check for pattern: 00:07:52\tSpeaker:\tMessage
  const chatLines = content.match(/^\d{1,2}:\d{2}:\d{2}\s+[^\n:]+:\s+[^\n]+/gm);
  return Boolean(chatLines && chatLines.length >= 2);
}

/**
 * Parse Zoom VTT or Google Meet raw transcript text into structured turns
 */
export function parseTranscript(rawText: string): TranscriptTurn[] {
  const turns: TranscriptTurn[] = [];

  // 1. Check if it's Zoom VTT format with --> timestamps
  if (/-->/.test(rawText)) {
    const cueRegex =
      /(?:(\d+)\s*\n)?(\d{1,2}:\d{2}:\d{2}(?:[.,]\d+)?)\s*-->\s*(\d{1,2}:\d{2}:\d{2}(?:[.,]\d+)?)\s*\n([\s\S]*?)(?=(?:\n\s*\d+\s*\n\d{1,2}:\d{2}:\d{2}|\n\s*\d{1,2}:\d{2}:\d{2}\s*-->|$))/g;
    let match: RegExpExecArray | null;

    while ((match = cueRegex.exec(rawText)) !== null) {
      const id = match[1] || `${turns.length + 1}`;
      const startTime = match[2];
      const body = match[4].trim();
      if (!body) continue;

      const seconds = parseTimeToSeconds(startTime);
      const timeFormatted = formatSecondsToDisplay(seconds);

      // Extract speaker if present: "Speaker Name (Affiliation): Text"
      const speakerMatch = body.match(/^([^:\n]+):\s*([\s\S]*)$/);
      let speaker = 'Speaker';
      let affiliation: string | undefined;
      let text = body;

      if (speakerMatch) {
        const rawSpeaker = speakerMatch[1].trim();
        text = speakerMatch[2].trim();

        // Extract "(Red Hat LLC)" or similar
        const affMatch = rawSpeaker.match(/^(.+?)\s*\((.+?)\)$/);
        if (affMatch) {
          speaker = affMatch[1].trim();
          affiliation = affMatch[2].trim();
        } else {
          speaker = rawSpeaker;
        }
      }

      if (text) {
        turns.push({
          id,
          timeSeconds: seconds,
          timeFormatted,
          speaker,
          affiliation,
          text,
        });
      }
    }

    if (turns.length > 0) return turns;
  }

  // 2. Fallback: Parse line-by-line for Google Meet transcript or generic dialogue
  const lines = rawText.split('\n');
  let currentSeconds = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line === 'WEBVTT' || /^xrq-uemd/.test(line) || /^Transcript$/i.test(line)) continue;

    // Check if line is a standalone timestamp e.g. "00:02:56" or "0:12"
    if (/^\d{1,2}:\d{2}(?::\d{2})?$/.test(line)) {
      currentSeconds = parseTimeToSeconds(line);
      continue;
    }

    // Check for Speaker: Text format
    const speakerMatch = line.match(/^([A-Z][a-zA-Z\s.,()'-]{1,35}):\s+(.+)$/);
    if (speakerMatch) {
      const rawSpeaker = speakerMatch[1].trim();
      const text = speakerMatch[2].trim();

      const affMatch = rawSpeaker.match(/^(.+?)\s*\((.+?)\)$/);
      let speaker = rawSpeaker;
      let affiliation: string | undefined;

      if (affMatch) {
        speaker = affMatch[1].trim();
        affiliation = affMatch[2].trim();
      }

      turns.push({
        id: `${turns.length + 1}`,
        timeSeconds: currentSeconds,
        timeFormatted: formatSecondsToDisplay(currentSeconds),
        speaker,
        affiliation,
        text,
      });
    }
  }

  return turns;
}

/**
 * Parse in-meeting chat logs
 */
export function parseChatLog(rawText: string): ChatMessage[] {
  const messages: ChatMessage[] = [];
  const lines = rawText.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Format: "00:07:52\tPranav Jogdand:\tMessage..." or "00:07:52 Pranav Jogdand: Message..."
    const match = line.match(/^(\d{1,2}:\d{2}:\d{2})\s+([^:\t]+):\s*(.*)$/);
    if (match) {
      const rawTime = match[1];
      const rawSpeaker = match[2].trim();
      const text = match[3].trim();
      const seconds = parseTimeToSeconds(rawTime);

      const affMatch = rawSpeaker.match(/^(.+?)\s*\((.+?)\)$/);
      let speaker = rawSpeaker;
      let affiliation: string | undefined;

      if (affMatch) {
        speaker = affMatch[1].trim();
        affiliation = affMatch[2].trim();
      }

      messages.push({
        id: `${messages.length + 1}`,
        timeSeconds: seconds,
        timeFormatted: formatSecondsToDisplay(seconds),
        speaker,
        affiliation,
        text,
      });
    }
  }

  return messages;
}

export type TranscriptViewerProps = {
  rawText: string;
  onSeekTimestamp?: (seconds: number) => void;
};

/**
 * World-class interactive transcript viewer matching the user's reference design
 */
export function TranscriptViewer({ rawText, onSeekTimestamp }: TranscriptViewerProps): JSX.Element {
  const turns = useMemo(() => parseTranscript(rawText), [rawText]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('all');
  const [activeTurnId, setActiveTurnId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
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
    <div className="border-gray-200/80 dark:border-gray-800 my-6 overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-200 dark:bg-gray-900">
      {/* Header Bar */}
      <div className="border-gray-200/80 dark:border-gray-800 flex flex-col gap-3 border-b bg-gray-50/70 p-4 dark:bg-gray-900/80 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-700 text-white shadow-sm shadow-purple-700/25 dark:bg-purple-700 dark:text-white">
            <Icon icon="material-symbols:record-voice-over-outline-rounded" className="text-lg text-white" />
          </div>
          <div>
            <h4 className="m-0 text-sm font-bold text-gray-900 dark:text-white">Meeting Audio Transcript</h4>
            <div className="dark:text-gray-400 text-xs text-gray-500">
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
              className="text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 text-sm"
            />
            <input
              type="text"
              placeholder="Search transcript..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ border: 'none', outline: 'none' }}
              className="text-gray-800 ring-gray-200/80 dark:bg-gray-800 w-full rounded-md border-0 border-none bg-white py-1.5 pl-8 pr-7 text-xs shadow-sm outline-none ring-1 transition focus:ring-2 focus:ring-purple-700 dark:text-gray-100 dark:ring-gray-700 dark:focus:ring-purple-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{ border: 'none', outline: 'none' }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 absolute right-2 top-1/2 -translate-y-1/2 border-0 border-none">
                <Icon icon="material-symbols:close" className="text-xs" />
              </button>
            )}
          </div>

          {/* Speaker Selector */}
          <select
            value={selectedSpeaker}
            onChange={e => setSelectedSpeaker(e.target.value)}
            style={{ border: 'none', outline: 'none' }}
            className="ring-gray-200/80 dark:bg-gray-800 dark:text-gray-200 rounded-md border-0 border-none bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 shadow-sm outline-none ring-1 transition hover:bg-gray-50 dark:ring-gray-700">
            <option value="all">All Speakers ({speakerStats.length})</option>
            {speakerStats.map(([name, count]) => (
              <option key={name} value={name}>
                {name} ({count})
              </option>
            ))}
          </select>

          {/* Expand/Collapse Container Height */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ border: 'none', outline: 'none' }}
            title={isExpanded ? 'Collapse viewer' : 'Expand full height'}
            className="ring-gray-200/80 dark:bg-gray-800 inline-flex items-center gap-1 rounded-md border-0 border-none bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 shadow-sm outline-none ring-1 transition hover:bg-gray-50 hover:text-purple-700 dark:text-gray-300 dark:ring-gray-700">
            <Icon
              icon={isExpanded ? 'material-symbols:collapse-all-rounded' : 'material-symbols:expand-all-rounded'}
              className="text-sm"
            />
            <span className="hidden sm:inline">{isExpanded ? 'Collapse' : 'Expand'}</span>
          </button>
        </div>
      </div>

      {/* Transcript Dialogue List (matching user's reference image) */}
      <div
        className={`dark:divide-gray-800/80 divide-y divide-gray-100 overflow-y-auto transition-all ${
          isExpanded ? 'max-h-[85vh]' : 'max-h-[500px]'
        }`}
        style={{ scrollbarWidth: 'thin' }}>
        {filteredTurns.length === 0 ? (
          <div className="dark:text-gray-400 p-8 text-center text-xs text-gray-500">
            No spoken dialogue found matching "{searchQuery}".
          </div>
        ) : (
          filteredTurns.map(turn => {
            const isSelected = activeTurnId === turn.id;
            const colors = getSpeakerColor(turn.speaker);
            const initials = getSpeakerInitials(turn.speaker);

            return (
              <div
                key={turn.id}
                className={`group flex items-start gap-4 p-4 transition-colors duration-150 ${
                  isSelected ? 'dark:bg-purple-950/30 bg-purple-50/80' : 'dark:hover:bg-gray-800/40 hover:bg-gray-50/70'
                }`}>
                {/* Left Column: Timestamp Pill */}
                <div className="shrink-0 pt-0.5">
                  <button
                    type="button"
                    onClick={() => handleTimestampClick(turn)}
                    style={{ border: 'none', outline: 'none' }}
                    title={`Seek video to ${turn.timeFormatted}`}
                    className="dark:bg-purple-950/60 dark:hover:bg-purple-600 inline-flex items-center gap-1 rounded border-0 border-none bg-purple-50 px-2 py-1 font-mono text-xs font-semibold text-purple-700 shadow-sm transition hover:bg-purple-700 hover:text-white hover:shadow dark:text-purple-300 dark:hover:text-white">
                    <Icon
                      icon="material-symbols:play-arrow-rounded"
                      className="text-xs transition-transform group-hover:scale-110"
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
                        <span className="text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium">
                          {turn.affiliation}
                        </span>
                      )}
                    </div>

                    {/* Copy Quote Button on hover */}
                    <button
                      type="button"
                      onClick={() => handleCopyQuote(turn)}
                      style={{ border: 'none', outline: 'none' }}
                      className="text-gray-400 border-0 border-none opacity-0 transition-opacity duration-150 group-hover:opacity-100 hover:text-purple-700 dark:hover:text-purple-300"
                      title="Copy Quote">
                      <Icon
                        icon={
                          copiedId === turn.id
                            ? 'material-symbols:check-rounded'
                            : 'material-symbols:content-copy-outline'
                        }
                        className={`text-sm ${copiedId === turn.id ? 'text-green-600' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Spoken Text */}
                  <p className="m-0 mt-1.5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{turn.text}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer / Status bar */}
      <div className="dark:border-gray-800 dark:text-gray-400 flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-4 py-2 text-xs text-gray-500 dark:bg-gray-900/60">
        <span>
          Showing {filteredTurns.length} of {turns.length} utterances
        </span>
        <span className="text-[11px] italic">
          💡 Click any timestamp to jump the video recording to that exact moment
        </span>
      </div>
    </div>
  );
}

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
    <div className="border-gray-200/80 dark:border-gray-800 my-6 overflow-hidden rounded-xl border bg-white shadow-lg dark:bg-gray-900">
      <div className="border-gray-200/80 dark:border-gray-800 flex items-center justify-between border-b bg-gray-50/70 p-3.5 dark:bg-gray-900/80">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-700 text-white shadow-sm shadow-purple-700/25 dark:bg-purple-700 dark:text-white">
            <Icon icon="material-symbols:chat-outline-rounded" className="text-lg text-white" />
          </div>
          <h4 className="m-0 text-sm font-bold text-gray-900 dark:text-white">
            Meeting Chat Transcript ({messages.length} messages)
          </h4>
        </div>
        <button
          type="button"
          onClick={handleCopyChat}
          style={{ border: 'none', outline: 'none' }}
          className="ring-gray-200/80 dark:bg-gray-800 inline-flex items-center gap-1 rounded-md border-0 border-none bg-white px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm ring-1 transition hover:bg-gray-50 hover:text-purple-700 dark:text-gray-300 dark:ring-gray-700">
          <Icon icon={copied ? 'material-symbols:check-rounded' : 'material-symbols:content-copy-outline'} />
          <span>{copied ? 'Copied!' : 'Copy Chat'}</span>
        </button>
      </div>

      <div className="max-h-72 space-y-2.5 overflow-y-auto p-4" style={{ scrollbarWidth: 'thin' }}>
        {messages.map(msg => {
          const colors = getSpeakerColor(msg.speaker);
          const isUrl = /^https?:\/\//i.test(msg.text);

          return (
            <div key={msg.id} className="flex items-start gap-2.5 text-xs">
              <span className="text-gray-400 shrink-0 pt-0.5 font-mono font-medium">{msg.timeFormatted}</span>
              <div className="flex-1">
                <span className={`font-bold ${colors.text} mr-1.5`}>{msg.speaker}:</span>
                {isUrl ? (
                  <a
                    href={msg.text}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dark:text-purple-400 font-medium text-purple-700 underline underline-offset-2 hover:text-purple-900">
                    {msg.text}
                  </a>
                ) : (
                  <span className="text-gray-800 dark:text-gray-200">{msg.text}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TranscriptViewer;
