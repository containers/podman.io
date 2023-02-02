import React from 'react';
import Button from '../Button';

function CardHeader(props) {
  const { title, subtitle, details } = props;
  return (
    <div className="mx-2">
      <h3 className="mb-3 font-bold text-gray-700">{title}</h3>
      <p className="text-gray-700">{subtitle}</p>
      <p className="text-gray-700">{details}</p>
    </div>
  );
}
function CardBody(props) {
  const { text } = props;
  return (
    <div className="my-6 mx-2 lg:my-8">
      <p className="max-w-sm text-gray-700">{text}</p>
    </div>
  );
}
function CardButtons(props) {
  const data = props.data;
  return (
    <div className=" mx-2 mb-4 flex justify-center gap-2 lg:mb-8">
      {data.map(item => (
        <Button {...item} />
      ))}
    </div>
  );
}

export default function Card(props): JSX.Element {
  const data = props.data;
  return (
    <article className="m-4 rounded-md p-4 shadow-xl lg:m-2">
      <CardHeader {...props} />
      <CardBody {...props} />
      <CardButtons {...props} />
    </article>
  );
}
