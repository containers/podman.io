import { LATEST_VERSION, LATEST_DESKTOP_VERSION } from '@site/static/data/global';
const operatingSystemData = [
  {
    id: 'windows',
    title: 'Download Podman Desktop for Windows',
    subtitle: `Windows Installer v-${LATEST_DESKTOP_VERSION}`,
    icon: 'fa-brands:windows',
    options: [],
    path: `https://github.com/containers/podman-desktop/releases/download/v${LATEST_DESKTOP_VERSION}/podman-desktop-${LATEST_DESKTOP_VERSION}-setup.exe`,
    other: {
      path: 'https://podman-desktop.io/downloads',
      text: 'Other Install Options',
      subtext: '(Including Windows portable executable and other OS options)',
    },
  },
  {
    id: 'macintosh',
    title: 'Download Podman Desktop for macOS',
    subtitle: `Universal *.dmg v-${LATEST_DESKTOP_VERSION}`,
    icon: 'fa-brands:apple',
    options: [],
    path: `https://github.com/containers/podman-desktop/releases/download/v${LATEST_DESKTOP_VERSION}/podman-desktop-${LATEST_DESKTOP_VERSION}-universal.dmg`,
    other: {
      path: 'https://podman-desktop.io/downloads',
      text: 'Other Install Options',
      subtext: '(Including macOS Intel & Arm builds and other OS options)',
    },
  },
  {
    id: 'linux',
    title: 'Download Podman Desktop for Linux',
    subtitle: `Flatpak v-${LATEST_DESKTOP_VERSION}`,
    icon: 'fa-brands:linux',
    options: [{ path: 'https://podman.io/getting-started/installation#installing-on-linux', text: 'CLI Install' }],
    path: `https://github.com/containers/podman-desktop/releases/download/v${LATEST_DESKTOP_VERSION}/podman-desktop-${LATEST_DESKTOP_VERSION}.flatpak`,
    other: {
      path: 'https://podman-desktop.io/downloads',
      text: 'Other Install Options',
      subtext: '(Including binary tar.gz and other OS options)',
    },
  },
];
export default operatingSystemData;
