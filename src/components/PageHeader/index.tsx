import React from 'react';

export default function PageHeader(props): JSX.Element {
  return (
    <header className="h-98 bg-blue-900 bg-water-texture bg-cover bg-bottom mix-blend-darken xl:h-100">
      <div className="mx-6 grid h-full gap-4 md:grid-cols-2 lg:mx-auto xl:max-w-7xl">
        <div className="-mt-24 flex flex-col justify-center md:mt-0">
          <h1 className="mb-6 max-w-sm text-white lg:max-w-lg">{props.title}</h1>
          <p className="max-w-xs text-white md:max-w-prose xl:text-2xl">{props.description}</p>
        </div>
        <div className="absolute -z-50 flex self-end justify-self-end md:static md:z-0 lg:items-center lg:justify-center">
          <img src="/images/original/podman-selkie-385w-358h.png" alt="Podman Logo" className="h-48 w-auto lg:h-5/6" />
        </div>
      </div>
    </header>
  );
}
