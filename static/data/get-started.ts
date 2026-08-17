const header = {
  title: 'Get Started with Podman',
  subtitle:
    'Podman is a utility provided as part of the libpod library. It can be used to create and maintain containers. The following tutorial will teach you how to set up Podman and perform some basic commands.',
  instructions: {
    title: 'First Things First: Installing Podman',
    subtitle: 'For installing or building Podman, please see the installation instructions:',
    buttons: [
      {
        text: 'Installation Instructions',
        path: 'docs/installation',
        icon: 'fa6-solid:book',
      },
      {
        text: 'Podman Desktop',
        path: 'https://podman-desktop.io/downloads',
        icon: 'fa6-solid:desktop',
      },
    ],
  },
};

const getHelp = {
  title: 'Getting Help',
  subtitle: 'Help & manpages',
};

export { header, getHelp };
