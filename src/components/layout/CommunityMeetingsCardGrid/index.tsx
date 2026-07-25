import type { ReactNode } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import CustomCard from '@site/src/components/ui/CustomCard';
import SubcardGrid from '@site/src/components/layout/SubcardGrid';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import Dropdown from '@site/src/components/utilities/DropDown';
import CloseIcon from '@site/src/components/shapes/CloseIcon';
import meetings from '@site/static/data/meetings/notes/index';

import './styles.css';

type CommunityMeetingsCardProps = {
  title: string;
  subtitle: string;
  date: string;
  timeZone: string;
  buttons: [
    {
      text: string;
      path: string;
    },
  ];
};

type DropdownOptionProps = {
  date: string;
  meeting_recording: {
    text: string;
    link: string;
  };
  meeting_minutes: {
    text: string;
    folderName: string;
    modalHeaderData: string;
  };
};

type SubcardButtonProps = {
  text: string;
  path?: string;
  folderName?: string;
  modalHeaderData?: string;
};

type SubcardGridProps = {
  buttons: SubcardButtonProps[];
  icon: string;
  date: string;
};

function toggleModalOpen(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (ref?.current?.contains(event.target)) {
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

function CommunityMeetingsCardGrid({ cards }) {
  const cabalDropdownOptions: DropdownOptionProps[] = [];
  const MeetingDropdownOptions: DropdownOptionProps[] = [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState<ReactNode | undefined>(undefined);
  const [meetinNotesMD, setMeetinNotesMD] = useState<ReactNode | undefined>(undefined);
  const meetingMinutesRef = [useRef(), useRef()];
  const modalRef = useRef();

  toggleModalOpen(modalRef, () => setIsModalOpen(false));

  const prepareModalHeader = (text: string, date: string) => {
    const modalHeader: ReactNode = (
      <div className="modal-header dark:bg-gray-500 dark:shadow-none">
        <h3 className="modal-header-title dark:text-gray-900">{text}</h3>
        <h3 className="modal-header-date dark:text-gray-900">{date}</h3>
        <div className="cursor-pointer" onClick={() => setIsModalOpen(false)}>
          <CloseIcon />
        </div>
      </div>
    );
    setModalHeader(modalHeader);
  };

  const populateMeetings = (): void => {
    if (!meetings) {
      console.warn('meetings metadata list is undefined');
      return;
    }
    meetings.forEach(meeting => {
      const option: DropdownOptionProps = {
        date: meeting.date,
        meeting_recording: {
          link: meeting.videoLink,
          text: 'Watch Recording',
        },
        meeting_minutes: {
          folderName: meeting.folderName,
          modalHeaderData: meeting.title,
          text: 'Meeting Minutes',
        },
      };

      if (meeting.isCabal) {
        cabalDropdownOptions.push(option);
      } else {
        MeetingDropdownOptions.push(option);
      }
    });
  };

  const toggleIsModalOpen = async (meetingMinutes: { folderName: string; modalHeaderData: string }, date: string) => {
    setMeetinNotesMD(<div className="p-4 text-center">Loading meeting minutes...</div>);
    prepareModalHeader(meetingMinutes.modalHeaderData, date);
    setIsModalOpen(true);

    const meeting = meetings?.find(m => m.folderName === meetingMinutes.folderName);
    if (meeting) {
      try {
        const mdxModule = await meeting.importMDX();
        const MDXComponent = mdxModule.default;
        setMeetinNotesMD(<MDXComponent />);
      } catch (err) {
        console.error(err);
        setMeetinNotesMD(
          <div className="text-red-500 p-4 text-center">Failed to load meeting minutes. Please try again.</div>,
        );
      }
    } else {
      setMeetinNotesMD(<div className="text-red-500 p-4 text-center">Meeting notes not found.</div>);
    }
  };

  function DropDownOption(props: DropdownOptionProps) {
    const { meeting_minutes, meeting_recording, date } = props;

    return (
      <div className="inline-flex justify-around bg-white px-8 py-1 dark:bg-gray-700 dark:shadow-none">
        <h3 className="flex-1 pl-1 text-base text-gray-700 dark:text-gray-50">{date}</h3>
        <a className="flex-1 no-underline hover:no-underline" href={meeting_recording?.link}>
          {meeting_recording?.text}
        </a>
        <a
          onClick={() => {
            toggleIsModalOpen(meeting_minutes, date);
          }}
          className="cursor-pointer">
          {meeting_minutes?.text}
        </a>
      </div>
    );
  }

  function getDropdownOption(options: DropdownOptionProps[]) {
    return options.map(option => <DropDownOption {...option} />);
  }

  populateMeetings();

  const communityMeetingsData: SubcardGridProps[] = [];
  const CabalMeetingsData: SubcardGridProps[] = [];

  // get top 2 CommunityMeetings & CabalMeetings for subcards
  for (let i = 0; i < 2; i++) {
    let meeting = MeetingDropdownOptions.shift();
    communityMeetingsData.push({
      date: meeting?.date,
      icon: 'film-icon',
      buttons: [
        {
          path: meeting?.meeting_recording?.link,
          text: meeting?.meeting_recording?.text,
        },
        { ...meeting?.meeting_minutes },
      ],
    });
    meeting = cabalDropdownOptions.shift();
    CabalMeetingsData.push({
      date: meeting?.date,
      icon: 'film-icon',
      buttons: [
        {
          path: meeting?.meeting_recording?.link,
          text: meeting?.meeting_recording?.text,
        },
        { ...meeting?.meeting_minutes },
      ],
    });
  }

  return (
    <div className="justify-content-center align-items-center custom-card-grid-root flex">
      {cards.map((card: CommunityMeetingsCardProps, index: number) => {
        const meetingsData = index == 1 ? CabalMeetingsData : communityMeetingsData;
        return (
          <div
            key={`card-container-${index}`}
            className="align-items-center card-container mb-4 flex flex-1 flex-col flex-wrap justify-center transition duration-150 ease-linear lg:mb-6">
            <CustomCard
              key={`custom-card-${index}`}
              title={card?.title}
              subtitle={card?.date}
              details={card?.timeZone}
              text={card?.subtitle}
              data={card?.buttons}
              primary={true}
            />
            <SectionHeader
              title=""
              description="Most Recent meetings"
              textGradientStops="from-purple-500 to-purple-700 dark:text-purple-500"
              textGradient={false}
            />
            <SubcardGrid key={`subcard-grid-${index}`} cards={meetingsData} toggleIsModalOpen={toggleIsModalOpen} />
            <Dropdown
              options={getDropdownOption(index == 1 ? [...cabalDropdownOptions] : [...MeetingDropdownOptions])}
              dropdownRef={meetingMinutesRef[index]}
              text="Older meeting details"
            />
            <dialog
              className="bg-stone-200 w-90-screen h-80-screen fixed top-20 z-50 max-h-screen w-fit border-4 border-purple-100"
              open={isModalOpen}
              ref={modalRef}>
              <div className="modal-content flex flex-col">
                {modalHeader}
                <div className="md-wrapper overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:bg-gray-700  dark:text-gray-50 dark:shadow-none">
                  {meetinNotesMD}
                </div>
              </div>
            </dialog>
          </div>
        );
      })}
    </div>
  );
}

export default CommunityMeetingsCardGrid;
