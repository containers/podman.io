import React from 'react';
import CustomCard from '@site/src/components/ui/CustomCard';
import { DayOfTheWeek } from '@site/src/components/utilities/DateUtils';

function SubcardGrid({ cards }) {
  return (
    <div className="mb-4 flex lg:mb-6">
      {cards?.map((card, index) => {
        let date = new Date(card.date).getDay();
        return (
          <CustomCard
            key={index}
            title={card.date}
            subtitle={DayOfTheWeek(date)}
            details={card.timeZone}
            text={card.subtitle}
            data={card.buttons}
            icon={card.icon}
          />
        );
      })}
    </div>
  );
}

export default SubcardGrid;
