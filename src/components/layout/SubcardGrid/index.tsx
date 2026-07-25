import React from 'react';
import { Icon } from '@iconify/react';
import { DayOfTheWeek } from '@site/src/components/utilities/DateUtils';

function MeetingVideoCard({ card, toggleIsModalOpen }) {
  const dayIndex = new Date(card.date).getDay();
  const dayName = DayOfTheWeek(dayIndex);
  const videoLink = card.buttons?.[0]?.path;
  const minutesData = card.buttons?.[1];

  return (
    <div className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20">
      {/* Video Thumbnail Header */}
      <div 
        className="relative aspect-video w-full cursor-pointer overflow-hidden bg-black"
        onClick={() => videoLink && window.open(videoLink, '_blank')}
      >
        {card.thumbnailUrl ? (
          <img 
            src={card.thumbnailUrl} 
            alt={card.date}
            className="h-full w-full object-cover scale-[1.35] transition-transform duration-500 group-hover:scale-[1.42] opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-900">
            <Icon icon="fa-solid:film" className="text-4xl text-gray-600" />
          </div>
        )}
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-300 group-hover:bg-black/10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-600/90 text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500">
            <Icon icon="fa-solid:play" className="translate-x-[2px] text-xl" />
          </div>
        </div>

        {/* Floating Date Badge */}
        <div className="absolute top-3 left-3 rounded-md bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {card.date}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-purple-400">
            {dayName}
          </div>
          <h4 className="mt-1 text-lg font-bold text-gray-100">
            Meeting Recording
          </h4>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center gap-3">
          <a
            href={videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg !bg-purple-600 px-4 py-2.5 text-sm font-bold !text-white !no-underline shadow-md transition-all hover:!bg-purple-500"
          >
            <Icon icon="fa-solid:play" className="text-xs" />
            Watch
          </a>
          <button
            onClick={() => toggleIsModalOpen(minutesData, card.date)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-600 !bg-gray-700 px-4 py-2.5 text-sm font-bold !text-gray-100 transition-all hover:!bg-gray-600"
          >
            <Icon icon="fa-solid:file-alt" className="text-xs" />
            Minutes
          </button>
        </div>
      </div>
    </div>
  );
}

function SubcardGrid({ cards, toggleIsModalOpen }) {
  return (
    <div className="my-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6 w-full px-1">
      {cards?.map((card, index) => (
        <MeetingVideoCard
          key={index}
          card={card}
          toggleIsModalOpen={toggleIsModalOpen}
        />
      ))}
    </div>
  );
}

export default SubcardGrid;
