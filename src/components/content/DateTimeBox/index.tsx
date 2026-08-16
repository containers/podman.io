import React from 'react';
import { Icon } from '@iconify/react';

function formatTime(date: Date, timeZone: string): string {
  return date.toLocaleString('en-US', { timeZone, hour: '2-digit', minute: '2-digit', hour12: true });
}

function formatZoneAbbreviation(date: Date, timeZone: string): string {
  const long = Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'long' }).format(date).split(', ')[1];
  return long
    .split(' ')
    .map(word => word[0])
    .join('');
}

type ZoneRowData = {
  label: string;
  flag: string;
  time: string;
  abbreviation: string;
};

function ZoneRow({ label, flag, time, abbreviation }: ZoneRowData): JSX.Element {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-white/5 px-5 py-4">
      <div className="flex items-center gap-4">
        <Icon icon={flag} className="h-9 w-9 shrink-0 rounded-full" />
        <div>
          <p className="text-sm text-purple-100">{label}</p>
          <p className="text-2xl font-extrabold text-white">{time}</p>
        </div>
      </div>
      <span className="shrink-0 rounded-md bg-purple-500 px-3 py-1.5 text-sm font-bold text-white">{abbreviation}</span>
    </div>
  );
}

function DateTimeBox(): JSX.Element {
  const date = new Date();

  const zones: ZoneRowData[] = [
    {
      label: 'US / Eastern Time',
      flag: 'circle-flags:us',
      time: formatTime(date, 'America/New_York'),
      abbreviation: formatZoneAbbreviation(date, 'America/New_York'),
    },
    {
      label: 'Europe / Central Time',
      flag: 'circle-flags:eu',
      time: formatTime(date, 'Europe/Paris'),
      abbreviation: formatZoneAbbreviation(date, 'Europe/Paris'),
    },
  ];

  return (
    <article className="relative mx-auto mb-10 max-w-lg overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-purple-700 to-purple-900 p-6 shadow-lg lg:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
      <header className="relative mb-6 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Icon icon="mdi:earth" className="mt-0.5 h-7 w-7 shrink-0 text-purple-100" />
          <div>
            <h3 className="font-bold text-white">Current Time</h3>
            <p className="text-sm text-purple-100">Community around the world</p>
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          Live
        </span>
      </header>
      <div className="relative flex flex-col gap-4">
        {zones.map(zone => (
          <ZoneRow key={zone.label} {...zone} />
        ))}
      </div>
      <footer className="relative mt-6 flex items-center gap-2 border-t border-white/10 pt-5 text-sm text-purple-100">
        <span className="h-2 w-2 rounded-full bg-blue-500" />
        Most community members are online now
      </footer>
    </article>
  );
}

export default DateTimeBox;
