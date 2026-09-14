import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import type { MeetingItem } from '@site/src/utils/communityMeetings';
import {
  extractYouTubeId,
  SEEK_MEETING_VIDEO_EVENT,
  type SeekMeetingVideoDetail,
} from '@site/src/utils/communityMeetings';

export interface MeetingVideoPlayerProps {
  meeting: MeetingItem;
}

export const MeetingVideoPlayer: React.FC<MeetingVideoPlayerProps> = ({ meeting }) => {
  const youtubeId = extractYouTubeId(meeting.recordingUrl);
  const [videoSeekAction, setVideoSeekAction] = useState<{ seconds: number; reqId: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset seek state when meeting changes
  useEffect(() => {
    setVideoSeekAction(null);
  }, [meeting.id]);

  // Subscribe to timestamp seek events
  useEffect(() => {
    const handleSeek = (e: Event) => {
      const customEvent = e as CustomEvent<SeekMeetingVideoDetail>;
      if (typeof customEvent.detail?.seconds === 'number') {
        const targetSeconds = Math.max(0, Math.floor(customEvent.detail.seconds));

        // Smoothly scroll the video player into view
        if (containerRef.current) {
          containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Direct YouTube iframe API seek & play command via postMessage
        if (iframeRef.current && iframeRef.current.contentWindow) {
          try {
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({
                event: 'command',
                func: 'seekTo',
                args: [targetSeconds, true],
              }),
              '*',
            );
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({
                event: 'command',
                func: 'playVideo',
                args: [],
              }),
              '*',
            );
          } catch {
            // Handled via state fallback
          }
        }

        // Trigger iframe URL start parameter update
        setVideoSeekAction({ seconds: targetSeconds, reqId: Date.now() });
      }
    };

    window.addEventListener(SEEK_MEETING_VIDEO_EVENT, handleSeek);
    return () => window.removeEventListener(SEEK_MEETING_VIDEO_EVENT, handleSeek);
  }, []);

  if (youtubeId) {
    return (
      <div className="mb-8" ref={containerRef}>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-black/[0.08] bg-black shadow-md dark:border-white/10">
          <iframe
            ref={iframeRef}
            key={`${youtubeId}-${videoSeekAction?.reqId ?? 'init'}`}
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1&rel=0${
              videoSeekAction !== null ? `&start=${videoSeekAction.seconds}&autoplay=1` : ''
            }`}
            title={`Recording for ${meeting.title} - ${meeting.date}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
        <p className="dark:text-gray-400 mt-2 text-center text-xs font-medium text-gray-500">
          ▶ Click any timestamp in the notes or transcript to jump directly to that point in the recording.
        </p>
      </div>
    );
  }

  if (meeting.recordingUrl) {
    return (
      <div className="border-blue-200/50 dark:bg-blue-950/20 mb-8 flex items-center justify-between rounded-xl border bg-blue-50/60 p-4 dark:border-blue-900/30">
        <div className="flex items-center gap-3">
          <Icon
            icon="material-symbols:video-camera-front-rounded"
            className="text-blue-600 dark:text-blue-400 text-2xl"
          />
          <div>
            <div className="dark:text-blue-200 font-semibold text-blue-900">External Recording Available</div>
            <div className="text-xs text-blue-700 dark:text-blue-300">Recorded on external meeting platform</div>
          </div>
        </div>
        <a
          href={meeting.recordingUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: '#009FFF', color: '#ffffff', textDecoration: 'none' }}
          className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold !text-white !no-underline transition hover:bg-[#0080cc] hover:!text-white hover:!no-underline">
          <span className="!text-white">Watch Recording</span>
          <Icon icon="material-symbols:open-in-new" className="!text-white" />
        </a>
      </div>
    );
  }

  return null;
};
