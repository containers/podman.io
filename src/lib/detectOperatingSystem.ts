export type OperatingSystemId = 'windows' | 'mac' | 'linux';

export function detectOperatingSystem(): OperatingSystemId {
  const userAgent = window.navigator.userAgent.toLowerCase().split(' ');
  if (userAgent.find(item => item.includes('windows'))) {
    return 'windows';
  } else if (userAgent.find(item => item.includes('macintosh'))) {
    return 'mac';
  }
  return 'linux';
}

export const osLabels: Record<OperatingSystemId, string> = {
  windows: 'Windows',
  mac: 'macOS',
  linux: 'Linux',
};

export const osIcons: Record<OperatingSystemId, string> = {
  windows: 'fa-brands:windows',
  mac: 'fa-brands:apple',
  linux: 'fa-brands:linux',
};
