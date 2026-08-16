import React from 'react';

function VideoEmbed({ url, title, className = '' }: { url: string; title: string; className?: string }) {
  return (
    <div className={`aspect-video w-full overflow-hidden rounded-lg bg-black ${className}`}>
      <iframe
        src={url}
        title={`${title} recording`}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default VideoEmbed;
