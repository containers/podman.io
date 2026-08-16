import React, { ReactNode, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { usePluginData } from '@docusaurus/useGlobalData';
import CustomCard from '@site/src/components/ui/CustomCard';
import SubcardGrid from '@site/src/components/layout/SubcardGrid';
import Dropdown from '@site/src/components/utilities/DropDown';
import CloseIcon from '@site/src/components/shapes/CloseIcon';
import VideoEmbed from '@site/src/components/ui/VideoEmbed';

import './styles.css';

type CommunityMeetingsCardProps = {
  title: string;
  subtitle: string;
  date: string;
  timeZone: string;
  buttons: { text: string; path: string }[];
};

type MeetingNote = {
  slug: string;
  displayDate: string;
  title: string;
  recordingLink?: string;
  recordingEmbedUrl?: string;
};

type MeetingsData = { community: MeetingNote[]; cabal: MeetingNote[] };

type ModalTriggerContent = {
  text: string;
  markDown?: ReactNode;
  embedUrl?: string;
  modalHeaderData?: string;
  icon?: string;
};

type DropdownOptionProps = {
  date: string;
  meeting_recording: ModalTriggerContent & { link?: string };
  meeting_minutes: ModalTriggerContent & { path: string };
};

type SubcardButtonProps = {
  text: string;
  path?: string;
  markDown?: ReactNode;
  embedUrl?: string;
  modalHeaderData?: string;
  icon?: string;
};

type SubcardGridProps = {
  buttons: SubcardButtonProps[];
  icon: string;
  date: string;
  embedUrl?: string;
  embedTitle?: string;
};

function toModalOption(note: MeetingNote): DropdownOptionProps {
  return {
    date: note.displayDate,
    meeting_minutes: {
      path: `/community/meetings/${note.slug}`,
      modalHeaderData: note.title,
      text: 'Meeting Minutes',
      icon: 'mdi:text-box-outline',
    },
    meeting_recording: {
      link: note.recordingLink,
      embedUrl: note.recordingEmbedUrl,
      modalHeaderData: note.title,
      text: 'Watch Recording',
      icon: 'mdi:play-circle-outline',
    },
  };
}

function useOutsideClick(ref: React.RefObject<HTMLElement>, handler: (event: Event) => void) {
  React.useEffect(() => {
    const listener = (event: Event) => {
      if (ref?.current?.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

function CommunityMeetingsCardGrid({ cards }: { cards: CommunityMeetingsCardProps[] }) {
  const meetings = usePluginData('meeting-notes-plugin') as MeetingsData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState<ReactNode | undefined>(undefined);
  const [modalContent, setModalContent] = useState<ReactNode | undefined>(undefined);
  const meetingMinutesRef = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const modalRef = useRef<HTMLDialogElement>(null);

  useOutsideClick(modalRef, () => setIsModalOpen(false));

  const communityOptions = meetings.community.map(toModalOption);
  const cabalOptions = meetings.cabal.map(toModalOption);

  const prepareModalHeader = (text: string, date: string) => {
    setModalHeader(
      <div className="flex items-center justify-between gap-4 rounded-t-2xl border-b border-gray-100 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-700">
        <div>
          <h3 className="text-gray-900 dark:text-gray-50">{text}</h3>
          <h3 className="text-sm font-normal text-gray-500 dark:text-gray-300">{date}</h3>
        </div>
        <button
          type="button"
          aria-label="Close"
          className="shrink-0 cursor-pointer rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-50"
          onClick={() => setIsModalOpen(false)}>
          <CloseIcon />
        </button>
      </div>,
    );
  };

  const toggleIsModalOpen = (content: ModalTriggerContent, date: string) => {
    const title = content?.modalHeaderData ?? '';
    if (content?.embedUrl) {
      setModalContent(<VideoEmbed url={content.embedUrl} title={title} className="mx-auto max-w-3xl" />);
    } else {
      setModalContent(content?.markDown);
    }
    prepareModalHeader(title, date);
    setIsModalOpen(true);
  };

  function DropDownOption(props: DropdownOptionProps) {
    const { meeting_minutes, meeting_recording, date } = props;

    return (
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3 transition duration-150 ease-linear hover:bg-gray-50 dark:hover:bg-gray-700">
        <h3 className="min-w-[9rem] flex-1 text-sm text-gray-700 dark:text-gray-100">{date}</h3>
        <div className="flex items-center gap-4 text-sm">
          {meeting_recording?.embedUrl ? (
            <a
              onClick={() => {
                toggleIsModalOpen(meeting_recording, date);
              }}
              className="cursor-pointer font-semibold text-purple-700 no-underline hover:text-purple-900 hover:underline dark:text-purple-500 dark:hover:text-purple-300">
              {meeting_recording?.text}
            </a>
          ) : (
            <a
              className="font-semibold text-purple-700 no-underline hover:text-purple-900 hover:underline dark:text-purple-500 dark:hover:text-purple-300"
              href={meeting_recording?.link}>
              {meeting_recording?.text}
            </a>
          )}
          <a
            href={meeting_minutes?.path}
            className="font-semibold text-blue-700 no-underline hover:text-blue-900 hover:underline dark:text-blue-500 dark:hover:text-blue-300">
            {meeting_minutes?.text}
          </a>
        </div>
      </div>
    );
  }

  function getDropdownOption(options: DropdownOptionProps[]) {
    return options.map((option, index) => <DropDownOption key={index} {...option} />);
  }

  const buildSubcardData = (options: DropdownOptionProps[]): SubcardGridProps[] =>
    options.slice(0, 2).map(meeting => ({
      date: meeting.date,
      icon: 'film-icon',
      embedUrl: meeting.meeting_recording?.embedUrl,
      embedTitle: meeting.meeting_recording?.modalHeaderData,
      buttons: [
        // If we can embed the recording directly, skip the "Watch Recording"
        // button entirely instead of making it open the same video in a modal.
        ...(meeting.meeting_recording?.embedUrl
          ? []
          : [
              {
                path: meeting.meeting_recording?.link,
                text: meeting.meeting_recording?.text,
              },
            ]),
        { ...meeting.meeting_minutes },
      ],
    }));

  const communityMeetingsData = buildSubcardData(communityOptions);
  const cabalMeetingsData = buildSubcardData(cabalOptions);

  return (
    <div className="custom-card-grid-root flex flex-col items-center justify-center gap-x-8 lg:flex-row lg:items-stretch">
      {cards.map((card, index) => {
        const meetingsData = index == 1 ? cabalMeetingsData : communityMeetingsData;
        const dropdownOptions = index == 1 ? cabalOptions : communityOptions;
        return (
          <div
            key={`card-container-${index}`}
            className="card-container mb-4 flex w-full flex-col flex-wrap items-center justify-start gap-4 transition duration-150 ease-linear lg:mb-6 lg:flex-1">
            <CustomCard
              key={`custom-card-${index}`}
              title={card?.title}
              subtitle={card?.date}
              details={card?.timeZone}
              text={card?.subtitle}
              data={card?.buttons}
              primary={true}
            />
            <div className="dark:text-purple-400 mb-2 mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-purple-700">
              <Icon icon="mdi:history" className="text-base" />
              Most Recent Meetings
            </div>
            <SubcardGrid key={`subcard-grid-${index}`} cards={meetingsData} toggleIsModalOpen={toggleIsModalOpen} />
            <Dropdown
              options={getDropdownOption(dropdownOptions.slice(2))}
              dropdownRef={meetingMinutesRef[index]}
              text="Older meeting details"
            />
          </div>
        );
      })}
      <dialog
        className="fixed top-1/2 z-50 w-[90vw] max-w-3xl -translate-y-1/2 overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-2xl dark:bg-gray-700"
        open={isModalOpen}
        ref={modalRef}>
        <div className="flex max-h-[80vh] flex-col">
          {modalHeader}
          <div className="modal-body overflow-y-auto p-6 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:bg-gray-700 dark:text-gray-50">
            {modalContent}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default CommunityMeetingsCardGrid;
