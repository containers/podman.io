import React from 'react';
import Button from '@site/src/components/utilities/Button/';
import Markdown from '@site/src/components/utilities/Markdown';
import FilmIcon from '../../shapes/FilmIcon';

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
      <p className="text-gray-700 dark:text-gray-100">{text}</p>
    </div>
  );
}

// CardInfoButtons component is the same as CardButtons but this component has both button secondary
// There is a 'CardButtons' mode which can be attained by passing parimary flag as true
function CardInfoButtons({ data = [{ text: 'button text' }], primary = false }) {
  return (
    <div className="align-center mb-4 mt-8 flex flex-row flex-wrap justify-center gap-4 lg:mb-8 2xl:px-10">
      {primary
        ? data.map((button, index) => (
            <div key={index}>
              {index == 0 ? <Button as="link" {...button} /> : <Button as="link" outline={true} {...button} />}
            </div>
          ))
        : data.map((button, index) => (
            <div key={index} className="">
              <Button as="link" outline={true} {...button} />
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
