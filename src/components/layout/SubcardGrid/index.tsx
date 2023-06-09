import React from 'react';
import CustomCard from '@site/src/components/ui/CustomCard';

function SubcardGrid({ cards }) {
  return (
    <div className="mb-4 flex lg:mb-6">
      {cards.map((card, index) => {
        return (
          <CustomCard
            key={index}
            title={card.title}
            subtitle={card.date}
            details={card.timeZone}
            text={card.subtitle}
            data={card.buttons}
          />
        );
      })}
    </div>
  );
}

export default SubcardGrid;
