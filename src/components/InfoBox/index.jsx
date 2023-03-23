import React from 'react';

export default function InfoBox({ title, text, darkBg = 'dark:bg-purple-900' }) {
  return (
    <aside
      className={`rounded-lg bg-aqua ${darkBg} max-w-lg py-8 px-6 text-gray-700 shadow-xl dark:shadow-md dark:shadow-gray-900`}>
      <h4 className="mx-auto mb-2 max-w-md font-bold dark:text-gray-50">{title}</h4>
      <p className="mx-auto max-w-md dark:text-gray-100">{text}</p>
    </aside>
  );
}
