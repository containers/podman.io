import React from 'react';

type shapeProps = {
  grid?: string;
  layout?: string;
  lightFill?: string;
  darkFill?: string;
  width?: number;
  height?: number;
};

export default function WaveBorder({
  grid,
  layout,
  height = 130,
  width = 100,
  lightFill = 'fill-white',
  darkFill = 'fill-gray-900',
}: shapeProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${grid} ${layout}`}
      width={`${width}%`}
      viewBox={`-8620 -1968 1400 ${height}`}>
      <path
        className={`${lightFill} dark:${darkFill}`}
        d="M-8629-1935v-10.614s78.25-20.752 155.47-20.752c131.788 0 169.95 23.309 233.125 23.309 108.108 0 138.56-21.268 208.573-21.268s108.701 25.151 233.283 25.151c124.581 0 120.881-43.085 251.082-22.031 112.227 18.148 187.023 22.031 264.45 7.825 76.957-14.12 79.117 14.113 79.014 18.38l.003 258h-1425v-258Z"
      />
    </svg>
  );
}
