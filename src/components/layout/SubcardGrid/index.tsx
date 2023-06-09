import React from 'react';
import CustomCard from '@site/src/components/ui/CustomCard';

function SubcardGrid({ cards }) {
  let date: string;
  return (
    <div className="mb-4 flex lg:mb-6">
      {cards.map((card, index) => {
        date = new Date(parseInt(card.date)).toDateString();
        let [day, ...dateStr] = date.split(' ');
        let dateISO = dateStr.join(' ');
        console.log(day);

        return (
          <CustomCard
            key={index}
            title={dateISO}
            subtitle={day}
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
