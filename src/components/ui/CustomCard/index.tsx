import React, { ReactNode } from 'react';
import Button from '@site/src/components/utilities/Button/';
import Markdown from '@site/src/components/utilities/Markdown';
import FilmIcon from '../../shapes/FilmIcon';

type SubcardButtonProps = {
  text: string;
  path?: string;
  markDown?: ReactNode;
};

type CardInfoButtonProps = {
  data: SubcardButtonProps[];
  primary: Boolean;
  method: Function;
};

function CardHeader(props) {
  const { title, subtitle, details } = props;
  return (
    <div className="mx-2 mb-10 mt-4 text-center">
      <h3 className="mb-3 whitespace-nowrap font-bold text-gray-700 dark:text-gray-50">{title}</h3>
      <Markdown text={subtitle} styles="text-gray-700" />
      <Markdown text={details} styles="text-gray-700" />
    </div>
  );
}

function CardBody(props) {
  const { text } = props;
  return (
    <div className="mx-2 my-6 overflow-y-auto lg:my-8">
      <p id="cardBody-parsed" className="text-gray-700 dark:text-gray-100">
        <Markdown text={text} />
      </p>
    </div>
  );
}

// CardInfoButtons component is the same as CardButtons but this component has both button secondary
// There is a 'CardButtons' mode which can be attained by passing parimary flag as true
function CardInfoButtons(cardInfoButtonProps: CardInfoButtonProps) {
  const {
    data = [{ text: 'button text', markDown: <>No MarkDown to Display!</> }],
    primary = false,
    method = () => {
      console.error('No callback method passed');
    },
  } = cardInfoButtonProps;
  return (
    <div className="align-center mb-4 mt-8 flex flex-row flex-wrap justify-center gap-4 lg:mb-8 2xl:px-10">
      {primary
        ? data.map((button, index) => (
            <div key={index}>
              {index == 0 ? <Button as="link" {...button} /> : <Button as="link" outline={true} {...button} />}
            </div>
          ))
        : data.map((button, index) => (
            <div key={index}>
              {index == 0 ? (
                <Button as="link" outline={true} {...button} />
              ) : (
                <Button
                  as="button"
                  method={() => {
                    method(button);
                  }}
                  outline={true}
                  {...button}
                />
              )}
            </div>
          ))}
    </div>
  );
}

function CustomCard(props) {
  return (
    <article
      style={props.primary ? { maxHeight: '550px', flex: 1 } : {}}
      className="flex w-11/12 flex-col rounded-lg bg-gray-50 p-4 shadow-xl dark:bg-gray-700 dark:shadow-none lg:mx-8 lg:my-4">
      <CardHeader {...props} />
      {props?.icon ? <FilmIcon /> : <CardBody {...props} />}
      <CardInfoButtons {...props} />
    </article>
  );
}

export default CustomCard;
