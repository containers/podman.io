import React from 'react';

/**
 * Carries the active meeting's videoOffset (in seconds) down the tree.
 *
 * videoOffset = how many seconds the transcript timestamps are ahead of the
 * YouTube recording.  When a user clicks a timestamp the player seeks to:
 *   max(0, transcriptTime - videoOffset)
 *
 * The meetings page sets this via <VideoOffsetContext.Provider value={meeting.videoOffset}>.
 * Defaults to 0 (no offset adjustment).
 */
export const VideoOffsetContext = React.createContext<number>(0);
