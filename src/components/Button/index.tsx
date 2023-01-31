import React from 'react';

export default function Button({ variant }): JSX.Element {
  return (
    <button
      className={`rounded-md ${variant} px-6 py-1 font-medium transition duration-150 ease-in-out hover:bg-purple-900 hover:shadow-sm lg:px-8`}>
      Join Meeting
    </button>
  );
}
