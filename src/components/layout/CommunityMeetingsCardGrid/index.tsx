import React, { useEffect, useRef } from 'react';
import CustomCard from '@site/src/components/ui/CustomCard';
import SubcardGrid from '@site/src/components/layout/SubcardGrid';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import Dropdown from '@site/src/components/utilities/DropDown';
import * as markDownFiles from '@site/static/data/meetings/notes/index';

type DropdownOptionProps = {
  date: string;
  meeting_recording: {
    text: string;
    link: string;
  };
  meeting_minutes: {
    text: string;
    link: string;
  };
};

type SubcardButtonProps = {
  text: string;
  path: string;
};

type SubcardGridProps = {
  buttons: SubcardButtonProps[];
  icon: string;
  date: string;
};

let cabalDropdownOptions: DropdownOptionProps[] = [];
let MeetingDropdownOptions: DropdownOptionProps[] = [];

function populateMeetings(): void {
  Object.values(markDownFiles).forEach(mdFile => {
    let mdReader = mdFile.default(useRef());
    mdReader.props.children.forEach(child => {
      let field1: string = child?.props?.children[0];
      let field2: object = child?.props?.children[1];
      if (typeof field1 == 'string' && (field1.includes('BlueJeans') || field1.includes('Video'))) {
        if (mdFile?.contentTitle?.includes('Cabal')) {
          cabalDropdownOptions.push({
            date: (mdFile.toc[0].value as string).split(/[0-9]{2}:[0-9]{2}/)[0],
            meeting_minutes: {
              link: 'https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w',
              text: 'Meeting Minutes',
            },
            meeting_recording: {
              link: field2?.props?.href,
              text: 'Watch Recording',
            },
          });
        } else {
          MeetingDropdownOptions.push({
            date: (mdFile.toc[0].value as string).split(/[0-9]{2}:[0-9]{2}/)[0],
            meeting_minutes: {
              link: 'https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w',
              text: 'Meeting Minutes',
            },
            meeting_recording: {
              link: field2?.props?.href,
              text: 'Watch Recording',
            },
          });
        }
      }
    });
  });
}

function DropDownOption(props: DropdownOptionProps) {
  return (
    <div className="m-px inline-flex w-full justify-around bg-white p-0.5">
      <h3 className="flex-1 pl-1 text-base text-gray-700 dark:text-gray-50">{props.date}</h3>
      <a className="flex-1" href={props.meeting_recording.link}>
        {props.meeting_recording.text}
      </a>
      <a className="flex-1" href={props.meeting_minutes.link}>
        {props.meeting_minutes.text}
      </a>
    </div>
  );
}

function getDropdownOption(options: DropdownOptionProps[]) {
  return options.map(option => <DropDownOption {...option} />);
}

function CustomCardGrid({ cards }) {
  populateMeetings();
  const communityMeetingsLen = MeetingDropdownOptions.length;
  const cabalMeetingsLen = cabalDropdownOptions.length;
  let communityMeetingsData: SubcardGridProps[] = [
    {
      date: MeetingDropdownOptions[communityMeetingsLen - 1].date,
      icon: 'film-icon',
      buttons: [
        {
          path: MeetingDropdownOptions[communityMeetingsLen - 1].meeting_recording.link,
          text: MeetingDropdownOptions[communityMeetingsLen - 1].meeting_recording.text,
        },
        {
          path: MeetingDropdownOptions[communityMeetingsLen - 1].meeting_minutes.link,
          text: MeetingDropdownOptions[communityMeetingsLen - 1].meeting_minutes.text,
        },
      ],
    },
    {
      date: MeetingDropdownOptions[communityMeetingsLen - 2].date,
      icon: 'film-icon',
      buttons: [
        {
          path: MeetingDropdownOptions[communityMeetingsLen - 2].meeting_recording.link,
          text: MeetingDropdownOptions[communityMeetingsLen - 2].meeting_recording.text,
        },
        {
          path: MeetingDropdownOptions[communityMeetingsLen - 2].meeting_minutes.link,
          text: MeetingDropdownOptions[communityMeetingsLen - 2].meeting_minutes.text,
        },
      ],
    },
  ];
  let CabalMeetingsData: SubcardGridProps[] = [
    {
      date: cabalDropdownOptions[cabalMeetingsLen - 1].date,
      icon: 'film-icon',
      buttons: [
        {
          path: cabalDropdownOptions[cabalMeetingsLen - 1].meeting_recording.link,
          text: cabalDropdownOptions[cabalMeetingsLen - 1].meeting_recording.text,
        },
        {
          path: cabalDropdownOptions[cabalMeetingsLen - 1].meeting_minutes.link,
          text: cabalDropdownOptions[cabalMeetingsLen - 1].meeting_minutes.text,
        },
      ],
    },
    {
      date: cabalDropdownOptions[cabalMeetingsLen - 2].date,
      icon: 'film-icon',
      buttons: [
        {
          path: cabalDropdownOptions[cabalMeetingsLen - 2].meeting_recording.link,
          text: cabalDropdownOptions[cabalMeetingsLen - 2].meeting_recording.text,
        },
        {
          path: cabalDropdownOptions[cabalMeetingsLen - 2].meeting_minutes.link,
          text: cabalDropdownOptions[cabalMeetingsLen - 2].meeting_minutes.text,
        },
      ],
    },
  ];

  return (
    <div className="justify-content-center align-items-center custom-card-grid-root flex">
      {cards.map((card, index) => {
        return (
          <div
            key={`card-container-${index}`}
            className="align-items-center card-container mb-4 flex flex-1 flex-col flex-wrap justify-center transition duration-150 ease-linear lg:mb-6">
            <CustomCard
              key={`custom-card-${index}`}
              title={card.title}
              subtitle={card.date}
              details={card.timeZone}
              text={card.subtitle}
              data={card.buttons}
              primary={true}
            />
            <SectionHeader
              title=""
              description="Most Recent Past meetings"
              textGradientStops="from-purple-500 to-purple-700 dark:text-purple-500"
              textGradient={false}
            />
            {card?.subCards && (
              <SubcardGrid
                key={`subcard-grid-${index}`}
                cards={index == 1 ? CabalMeetingsData : communityMeetingsData}
              />
            )}
            {
              <Dropdown
                options={getDropdownOption(index == 1 ? [...cabalDropdownOptions] : [...MeetingDropdownOptions])}
                dropdownRef={useRef()}
                text="Older meeting details"
              />
            }
          </div>
        );
      })}
    </div>
  );
}

export default CustomCardGrid;
