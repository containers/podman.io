import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

export type MeetingCategory = 'community' | 'cabal';

export interface MeetingTypeSwitcherProps {
  activeType: MeetingCategory;
  onSelectType: (type: MeetingCategory) => void;
  communityCount: number;
  cabalCount: number;
}

interface TypeOption {
  id: MeetingCategory;
  label: string;
  icon: string;
  count: number;
}

export const MeetingTypeSwitcher: React.FC<MeetingTypeSwitcherProps> = ({
  activeType,
  onSelectType,
  communityCount,
  cabalCount,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<MeetingCategory, HTMLButtonElement | null>>({
    community: null,
    cabal: null,
  });

  const [sliderStyle, setSliderStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const [hasMeasured, setHasMeasured] = useState(false);

  // Update sliding indicator position
  const updateSlider = () => {
    const container = containerRef.current;
    const activeButton = buttonRefs.current[activeType];
    if (container && activeButton) {
      setSliderStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
      setHasMeasured(true);
    }
  };

  useEffect(() => {
    updateSlider();
    const rafId = requestAnimationFrame(() => {
      updateSlider();
    });
    return () => cancelAnimationFrame(rafId);
  }, [activeType, communityCount, cabalCount]);

  // Keep slider aligned on window resize & container size change
  useEffect(() => {
    window.addEventListener('resize', updateSlider);
    const container = containerRef.current;
    let observer: ResizeObserver | null = null;
    if (container && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        updateSlider();
      });
      observer.observe(container);
    }
    return () => {
      window.removeEventListener('resize', updateSlider);
      if (observer) observer.disconnect();
    };
  }, [activeType]);

  const options: TypeOption[] = [
    {
      id: 'community',
      label: 'Community',
      icon: 'material-symbols:groups',
      count: communityCount,
    },
    {
      id: 'cabal',
      label: 'Cabal',
      icon: 'material-symbols:shield',
      count: cabalCount,
    },
  ];

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Select meeting type"
      className="relative inline-flex w-fit self-start rounded-2xl border border-white/25 bg-black/20 p-1.5 backdrop-blur-md lg:self-end">
      {/* Sliding Background Indicator */}
      <div
        className="pointer-events-none absolute bottom-1.5 top-1.5 rounded-xl bg-white shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          left: `${sliderStyle.left}px`,
          width: `${sliderStyle.width}px`,
          opacity: hasMeasured ? 1 : 0,
        }}
      />

      {options.map(option => {
        const isActive = activeType === option.id;
        return (
          <button
            key={option.id}
            ref={el => {
              buttonRefs.current[option.id] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectType(option.id)}
            style={{ border: 'none', outline: 'none', textDecoration: 'none' }}
            className={`relative z-10 flex min-w-[140px] cursor-pointer items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-sm font-bold !no-underline transition-colors duration-200 hover:!no-underline ${
              isActive ? 'text-purple-900' : 'text-white hover:text-white/80'
            }`}>
            <Icon icon={option.icon} className="shrink-0 text-xl" />
            <span>{option.label}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-bold transition-colors duration-200 ${
                isActive ? 'bg-purple-100 text-purple-900' : 'bg-white/20 text-white'
              }`}>
              {option.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
