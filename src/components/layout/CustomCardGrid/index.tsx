import React from 'react';
import CustomCard from '@site/src/components/ui/CustomCard';
import SubcardGrid from '@site/src/components/layout/SubcardGrid';

function CustomCardGrid({ cards }) {
  return (
    <div className="justify-content-center align-items-center custom-card-grid-root flex">
      {cards.map((card, index) => {
        return (
          <div
            key={`card-container-${index}`}
            className="align-items-center card-container flex-column mb-4 flex flex-wrap justify-center lg:mb-6">
            <CustomCard
              key={`custom-card-${index}`}
              title={card.title}
              subtitle={card.date}
              details={card.timeZone}
              text={card.subtitle}
              data={card.buttons}
              primary={true}
            />
            <SubcardGrid key={`subcard-grid-${index}`} cards={card.subCards} />
          </div>
        );
      })}
    </div>
  );
}

export default CustomCardGrid;
