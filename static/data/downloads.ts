const header = {
  title: 'Download Podman',
  subtitle:
    'Get Podman CLI and Podman Desktop for your platform. We detect your operating system automatically, but every platform is listed below.',
};

const platformTitles: { [key: string]: string } = {
  windows: 'Windows',
  mac: 'macOS',
  linux: 'Linux',
};

const otherOptions = {
  title: 'Looking for something else?',
  subtitle: 'Package manager installs, building from source, and remote installs are covered in the full installation docs.',
  button: {
    text: 'Installation Instructions',
    path: 'docs/installation',
    icon: 'fa6-solid:book',
  },
};

export { header, platformTitles, otherOptions };
