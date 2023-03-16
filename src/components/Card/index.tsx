import React from 'react';
import Button from '@site/src/components/Button';
import ReactMarkdown from 'react-markdown';

function CardHeader(props) {
  const { title, subtitle, details } = props;
  return (
    <div className="mx-2">
      <h3 className="mb-3 font-bold text-gray-700">{title}</h3>
      <ReactMarkdown children={subtitle} className="text-gray-700" />
      <ReactMarkdown children={details} className="text-gray-700" />
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
// TODO: use render props to make the button feature flexible fallback text here is temporary
function CardButtons({ data = [{ text: 'card text' }] }) {
  return (
    <div className=" mx-2 mb-4 flex justify-center gap-2 lg:mb-8">
      {data.map((item, index) => (
        <div key={index}>
          <Button {...item} />
        </div>
      ))}
    </div>
  );
}

// TODO: improve prop handling. this approach is limited
export default function Card(props): JSX.Element {
  return (
    <article className="m-4 rounded-md p-4 shadow-xl lg:m-2">
      <CardHeader {...props} />
      <CardBody {...props} />
      <CardButtons {...props} />
    </article>
  );
}
