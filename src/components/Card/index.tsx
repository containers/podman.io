import React from 'react';
import Link from '../Link';

function Button({ text, url, variant }) {
  if (variant === 'outline') {
    return (
      <a
        href={url}
        className="block rounded-md px-6 py-2 font-semibold text-purple-700 outline outline-2 -outline-offset-1 transition duration-150 ease-in-out hover:bg-gray-50 hover:text-purple-900 hover:no-underline hover:shadow-md">
        {text}
      </a>
    );
  }
  return (
    <a
      href={url}
      className="block rounded-md bg-purple-700 py-2 px-6 font-semibold text-white transition duration-150 ease-in hover:bg-purple-900 hover:text-white hover:no-underline hover:shadow-md">
      {text}
    </a>
  );
}

export default function Card(props): JSX.Element {
  return (
    <article className="m-4 rounded-md p-4 shadow-xl lg:m-2">
      <div className=" mx-2">
        <h3 className="mb-3 font-bold text-gray-700">Podman Community meeting</h3>
        <p className="text-gray-700">
          <strong>1st Tuesday</strong> every month
        </p>
        <p className="text-gray-700">11 AM US ET / 5 PM CET</p>
      </div>
      <div className="my-6 mx-2 lg:my-8">
        <p className="max-w-sm text-gray-700">
          This meeting is used to show demos for or to have general discussions about Podman or other related container
          technologies. It is also used to make announcements about Podman and the other projects in the{' '}
          <Link text="Containers Repository" /> on GitHub.
        </p>
      </div>
      <div className="mx-2 mb-4 flex justify-center gap-2 lg:mb-8">
        <Button variant="" text="Join Meeting" url="" />
        <Button variant="outline" text="Meeting Agenda" url="" />
      </div>
    </article>
  );
}
