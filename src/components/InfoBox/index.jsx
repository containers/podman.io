import React from 'react';

export default function InfoBox({ title, text, darkBg = 'dark:bg-purple-900' }) {
  return (
    <aside
      className={`container rounded-lg bg-aqua ${darkBg} max-w-md py-8 px-4 text-gray-700 shadow-xl dark:shadow-md dark:shadow-gray-900`}>
      <h4 className="mb-2 font-bold dark:text-gray-50">{title}</h4>
      <p className="dark:text-gray-100">{text}</p>
    </aside>
  );
}
