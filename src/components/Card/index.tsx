import React from 'react';
import Link from '../Link';
import Button from '../Button';

function CardHeader(props) {
  const { title, subtitle, details } = props;
  return (
    <div className=" mx-2">
      <h3 className="mb-3 font-bold text-gray-700">{title}</h3>
      <p className="text-gray-700">{subtitle}</p>
      <p className="text-gray-700">{details}</p>
    </div>
  );
}
function CardBody({ text }) {
  return (
    <div className="my-6 mx-2 lg:my-8">
      <p className="max-w-sm text-gray-700">{text}</p>
    </div>
  );
}

// TODO: must be able to assign individual link and inner text to each button at the page level
function CardButtons(props) {
  const { as, text, variant } = props;
  // take button data and iterate through it to fill buttons
  return (
    <div className="mx-2 mb-4 flex justify-center gap-2 lg:mb-8">
      <Button as="a" text="Join Meeting" url="" />
      <Button as="a" variant="outline" text="Meeting Agenda" url="" />
    </div>
  );
}
export default function Card(props): JSX.Element {
  const { ...passProps } = props;
  return (
    <article className="m-4 rounded-md p-4 shadow-xl lg:m-2">
      <CardHeader {...passProps} />
      <CardBody {...passProps} />
      <CardButtons {...passProps} />
    </article>
  );
}
