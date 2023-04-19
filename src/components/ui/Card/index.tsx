import React from 'react';
import Button from '@site/src/components/utilities/Button/';
import Markdown from '@site/src/components/utilities/Markdown';
function CardHeader(props) {
  const { title, subtitle, details } = props;
  return (
    <div className="mx-2 mt-4">
      <h3 className="mb-3 font-bold text-gray-700 dark:text-gray-50">{title}</h3>
      <Markdown text={subtitle} styles="text-gray-700" />
      <Markdown text={details} styles="text-gray-700" />
    </div>
  );
}
function CardBody(props) {
  const { text } = props;
  return (
    <div className="mx-2 my-6 lg:my-8">
      <p className="max-w-sm text-gray-700 dark:text-gray-100">{text}</p>
    </div>
  );
}
function CardButtons({ data = [{ text: 'button text' }] }) {
  return (
    <div className=" mx-2 mb-4 flex justify-center gap-2 lg:mb-8">
      {data.map((button, index) => (
        <div key={index}>
          {index == 0 ? <Button as="link" {...button} /> : <Button as="link" outline={true} {...button} />}
        </div>
      ))}
    </div>
  );
}

function Card(props) {
  return (
    <article className="m-4 flex flex-col justify-between rounded-lg bg-gray-50 p-4 shadow-xl dark:bg-gray-700 dark:shadow-none lg:m-2">
      <CardHeader {...props} />
      <CardBody {...props} />
      <CardButtons {...props} />
    </article>
  );
}

export default Card;
