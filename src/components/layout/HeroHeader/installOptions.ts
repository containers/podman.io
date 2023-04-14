const windows = {
  title: 'Download for Windows',
  subtitle: 'Install on Desktop',
  icon: 'fa-brands:windows',
  options: [],
  path: 'https://github.com/containers/podman-desktop/releases/download/v0.13.0/podman-desktop-0.13.0-setup.exe',
  other: {
    path: 'https://podman-desktop.io/downloads',
    text: 'Other Install Options',
    subtext: '(Including Windows portable executable and other OS options)',
  },
};
const mac = {
  title: 'Download for macOS',
  subtitle: 'Universal *.dmg',
  icon: 'fa-brands:apple',
  options: [],
  path: 'https://github.com/containers/podman-desktop/releases/download/v0.13.0/podman-desktop-0.13.0-universal.dmg',
  other: {
    path: 'https://podman-desktop.io/downloads',
    text: 'Other Install Options',
    subtext: '(Including macOS Intel & Arm builds and other Os options)',
  },
};
const linux = {
  title: 'Download for Linux',
  subtitle: 'Install on Desktop',
  icon: 'fa-brands:linux',
  options: [{ path: 'https://podman.io/getting-started/installation#installing-on-linux', text: 'CLI Install' }],
  path: 'https://github.com/containers/podman-desktop/releases/download/v0.13.0/podman-desktop-0.13.0.flatpak',
  other: {
    path: 'https://podman-desktop.io/downloads',
    text: 'Other Install Options',
    subtext: '(Including binary tar.gz and other OS options)',
  },
};

export { windows, mac, linux };
