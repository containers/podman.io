import { LATEST_VERSION, LATEST_DESKTOP_VERSION } from '@site/static/data/global';
const operatingSystemData = [
  {
    id: 'windows',
    preferred:{
      title: 'Podman Desktop for Windows',
      subtitle: `Windows Installer v-${LATEST_DESKTOP_VERSION}`,
      icon: 'fa-brands:windows',
      options: [],
      path: `https://github.com/containers/podman-desktop/releases/download/v${LATEST_DESKTOP_VERSION}/podman-desktop-${LATEST_DESKTOP_VERSION}-setup.exe`,
    },
    alt: {
      title: 'Podman CLI for Windows',
      subtitle: `Windows MSI Installer v-${LATEST_VERSION}`,
      icon: 'material-symbols:terminal-rounded',
      options: [],
      path: `https://github.com/containers/podman/releases/download/v${LATEST_VERSION}/podman-v${LATEST_VERSION}.msi`,
    },
    other: {
      path: 'docs/installation',
      text: 'Other Install Options',
    },
  },
  {
    id: 'macintosh',
    preferred: {
      title: 'Podman Desktop for macOS',
      subtitle: `Universal *.dmg v-${LATEST_DESKTOP_VERSION}`,
      icon: 'fa-brands:apple',
      options: [],
      path: `https://github.com/containers/podman-desktop/releases/download/v${LATEST_DESKTOP_VERSION}/podman-desktop-${LATEST_DESKTOP_VERSION}-universal.dmg`,
    },
    alt: {
      title: 'Podman CLI for macOS',
      subtitle: `Install using Brew`,
      icon: 'material-symbols:terminal-rounded',
      path: `docs/installation#macos`,
    },
    other: {
      path: 'docs/installation',
      text: 'Other Install Options',
    },
  },
  {
    id: 'linux',
    preferred: {
      title: 'Podman CLI for Linux',
      subtitle: `Podman Engine v${LATEST_VERSION}`,
      icon: 'material-symbols:terminal-rounded',
      path: `docs/installation#installing-on-linux`,
    },
    alt: {
      title: 'Podman Desktop for Linux',
      subtitle: `Flatpak v-${LATEST_DESKTOP_VERSION}`,
      icon: 'fa-brands:linux',
      path: `https://github.com/containers/podman-desktop/releases/download/v${LATEST_DESKTOP_VERSION}/podman-desktop-${LATEST_DESKTOP_VERSION}.flatpak`,
    },
    other: {
      path: 'docs/installation',
      text: 'Other Install Options',
    },
  },
];
export default operatingSystemData;
