import React, { useRef, useEffect } from 'react';

interface VideoProps {
    url: string;
    vidFormat?: string;
    styles?: string;
  }

const PlayOnScroll: React.FC = (props: VideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
  
    useEffect(() => {
      const handleScroll = () => {
        if (videoRef.current) {
          const rect = videoRef.current.getBoundingClientRect();
          const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
          
          if (isFullyVisible) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <div>
        <video className={props.styles} ref={videoRef} autoPlay>
          <source src={props.url} type={props.vidFormat} />
          {/* Add additional source elements for different video formats if needed */}
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };
  
  export default PlayOnScroll;