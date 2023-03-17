import React from 'react';

export default function InfoBox({ title, text, darkBg = 'bg-purple-900' }) {
  return (
    <aside
      className={`container rounded-lg bg-aqua ${darkBg} p-8 text-gray-700 shadow-xl dark:shadow-md dark:shadow-gray-700 lg:ml-10 lg:max-w-xl`}>
      <h4 className="mb-2 font-bold dark:text-gray-50">{title}</h4>
      <p className="dark:text-gray-100">{text}</p>
    </aside>
  );
}
