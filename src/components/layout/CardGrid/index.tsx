import React from 'react';
import Card from '@site/src/components/ui/Card';

function CardGrid({ cards }) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-4 lg:mb-12 lg:gap-8">
      {cards.map((card, index) => {
        return (
          <Card
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

export default CardGrid;
