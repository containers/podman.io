import React, { useRef, useEffect } from 'react';

interface VideoProps {
  url: string;
  vidFormat?: string;
  styles?: string;
  posterImg?: string;
}

const PlayOnScroll: React.FC<VideoProps> = props => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <video className={props.styles} ref={videoRef} poster={props.posterImg} muted playsInline loop>
        <source src={props.url} type={props.vidFormat} />
        {/* Add additional source elements for different video formats if needed */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default PlayOnScroll;
