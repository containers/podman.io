import React, { useState, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

function formatTime(timeZone: string): [string, string] {
  const now = new Date();
  return [
    now.toLocaleString('en-US', {
      timeZone,
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }),
    Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'long' }).format(now).split(',')[1],
  ];
}

function Clock(): JSX.Element {
  const [centralEuropeTime, setCentralEuropeTime] = useState(() => formatTime('Europe/Paris'));
  const [easternTime, setEasternTime] = useState(() => formatTime('America/New_York'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCentralEuropeTime(formatTime('Europe/Paris'));
      setEasternTime(formatTime('America/New_York'));
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="text-center">
        <h4 className="mb-2 text-3xl font-extrabold text-purple-500 dark:text-gray-100">{centralEuropeTime[0]}</h4>
        <p className="w-40 font-bold text-blue-900">{centralEuropeTime[1]}</p>
      </div>
      <div className="text-center">
        <h4 className="mb-2 text-3xl font-extrabold text-purple-500 dark:text-gray-100">{easternTime[0]}</h4>
        <p className="w-40 font-bold text-blue-900">{easternTime[1]}</p>
      </div>
    </>
  );
}

function DateTimeBox(): JSX.Element {
  return (
    <article className="mb-10 max-w-lg rounded-lg bg-aqua shadow-md dark:bg-purple-900">
      <div className="m-4 grid grid-cols-2 gap-x-4 lg:m-8">
        <div className="col-span-full mb-5 text-center">
          <h3 className="font-bold text-gray-300 dark:text-gray-100">Current Time</h3>
        </div>
        <BrowserOnly>{() => <Clock />}</BrowserOnly>
      </div>
    </article>
  );
}

export default DateTimeBox;
