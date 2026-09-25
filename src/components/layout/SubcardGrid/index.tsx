import React from 'react';
import CustomCard from '@site/src/components/ui/CustomCard';
import { DayOfTheWeek } from '@site/src/components/utilities/DateUtils';

type SubcardButtonProps = {
  text: string;
  path?: string;
  markDown?: React.ReactNode;
};

type SubcardItem = {
  date: string;
  subtitle?: string;
  timeZone?: string;
  icon?: string;
  buttons: SubcardButtonProps[];
};

type SubcardGridProps = {
  cards: SubcardItem[];
  toggleIsModalOpen?: (meeting_minutes: unknown, date: string) => void;
};

function SubcardGrid({ cards, toggleIsModalOpen }: SubcardGridProps): JSX.Element {
  return (
    <div className="mb-4 flex flex-wrap justify-center gap-4 lg:mb-6 lg:flex-nowrap">
      {cards?.map((card, index) => {
        let weekday = card.subtitle;
        if (!weekday) {
          try {
            const dayNum = new Date(card.date).getDay();
            weekday = isNaN(dayNum) ? 'Tuesday' : DayOfTheWeek(dayNum);
          } catch {
            weekday = 'Tuesday';
          }
        }

        return (
          <CustomCard
            key={index}
            title={card.date}
            subtitle={weekday}
            details={card.timeZone}
            text={card.subtitle}
            data={card.buttons}
            icon={card.icon}
            method={meeting_minutes => {
              toggleIsModalOpen?.(meeting_minutes, card.date);
            }}
          />
        );
      })}
    </div>
  );
}

export default SubcardGrid;
