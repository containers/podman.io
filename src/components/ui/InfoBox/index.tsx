import React from 'react';

type BoxProps = {
  title: string;
  text: string;
};

function InfoBox({ title, text }: BoxProps): JSX.Element {
  return (
    <aside className="flex max-w-lg items-start gap-3 rounded-xl bg-blue-50 p-5 dark:bg-blue-500/10">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-500 text-xs font-bold text-white">
        i
      </span>
      <div>
        <h4 className="mb-1 font-bold text-gray-900 dark:text-gray-50">{title}</h4>
        <p className="text-gray-700 dark:text-gray-100">{text}</p>
      </div>
    </aside>
  );
}

export default InfoBox;
