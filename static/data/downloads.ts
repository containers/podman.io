export interface DownloadOption {
  os: 'Windows' | 'macOS' | 'Linux';
  title: string;
  description: string;
  icon: string;
  cli: {
    url: string;
    label: string;
    instructionsUrl?: string;
  };
  desktop: {
    url: string;
    label: string;
    instructionsUrl?: string;
  };
}

export const downloadOptions: DownloadOption[] = [
  {
    os: 'Windows',
    title: 'Windows',
    description: 'Download Podman for Windows 10 and 11',
    icon: 'fa6-brands:windows',
    cli: {
      url: 'https://github.com/containers/podman/releases/latest/download/podman-setup.exe',
      label: 'Download Podman CLI (.exe)',
      instructionsUrl: 'https://podman.io/docs/installation#windows',
    },
    desktop: {
      url: 'https://podman-desktop.io/api/update/win32/latest',
      label: 'Download Podman Desktop (.exe)',
      instructionsUrl: 'https://podman-desktop.io/downloads#windows',
    },
  },
  {
    os: 'macOS',
    title: 'macOS',
    description: 'Download Podman for Apple Silicon (M1/M2) or Intel Macs',
    icon: 'fa6-brands:apple',
    cli: {
      url: 'https://github.com/containers/podman/releases/latest/download/podman-installer-macos-amd64.pkg', // fallback URL, users might prefer brew
      label: 'Download Podman CLI (.pkg)',
      instructionsUrl: 'https://podman.io/docs/installation#macos',
    },
    desktop: {
      url: 'https://podman-desktop.io/api/update/darwin/arm64/latest',
      label: 'Download Podman Desktop Universal',
      instructionsUrl: 'https://podman-desktop.io/downloads#macos',
    },
  },
  {
    os: 'Linux',
    title: 'Linux',
    description: 'Install Podman via your package manager',
    icon: 'fa6-brands:linux',
    cli: {
      url: 'https://podman.io/docs/installation#linux',
      label: 'View CLI Installation Instructions',
    },
    desktop: {
      url: 'https://podman-desktop.io/api/update/linux/latest',
      label: 'Download Podman Desktop Flatpak',
      instructionsUrl: 'https://podman-desktop.io/downloads#linux',
    },
  },
];

export const headerData = {
  title: 'Download Podman',
  subtitle: 'Get Podman CLI and Podman Desktop for your operating system.',
};
