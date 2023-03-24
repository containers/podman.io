import React from 'react';

export default function DateTimeBox(): JSX.Element {
  const date = new Date();
  const currentTime = `${date.getHours()}:${date.getMinutes()}`;
  const userTimeZone = new Intl.DateTimeFormat('en-US', { timeZoneName: 'long' }).format().split(',')[1];
  const centralEuropeTime = [
    date.toLocaleString('en-US', {
      timeZone: 'Europe/Paris',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }),
    Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Paris', timeZoneName: 'long' }).format().split(',')[1],
  ];
  const easternTime = [
    date.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }),
    Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', timeZoneName: 'long' }).format().split(',')[1],
  ];

  return (
    <article className="mb-10 max-w-lg rounded-lg bg-aqua shadow-md dark:bg-purple-900">
      <div className="m-4 grid grid-cols-2 gap-x-4 lg:m-8">
        <div className="col-span-full mb-5 text-center">
          <h3 className="font-bold text-gray-300 dark:text-gray-100">Current Time</h3>
        </div>
        <div className="text-center">
          <h4 className="mb-2 text-3xl font-extrabold text-purple-500 dark:text-gray-100">{centralEuropeTime[0]}</h4>
          <p className="w-40 font-bold text-blue-900">{centralEuropeTime[1]}</p>
        </div>
        <div className="text-center">
          <h4 className="mb-2 text-3xl font-extrabold text-purple-500 dark:text-gray-100">{easternTime[0]}</h4>
          <p className="w-40 font-bold text-blue-900">{easternTime[1]}</p>
        </div>
      </div>
    </article>
  );
}
