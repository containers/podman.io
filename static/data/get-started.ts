const header = {
  title: 'Get Started with Podman',
  subtitle:
    'Podman is a utility provided as part of the libpod library. It can be used to create and maintain containers. The following tutorial will teach you how to set up Podman and perform some basic commands. First, check that you have already [installed Podman](https://podman-desktop.io/downloads)',
  instructions: {
    title: 'First Things First: Installing Podman',
    subtitle: 'For installing or building Podman, please see the installation instructions:',
    button: {
      text: 'Installation Instructions',
      path: '#',
      icon: 'fa6-solid:book',
    },
  },
  resources: {
    title: 'Basic Resources',
    buttons: [
      {
        text: 'Installation Instructions',
        path: '#',
        icon: 'fa6-solid:book',
      },
      {
        text: 'Documentation',
        path: '#',
        icon: 'fa6-solid:book',
      },
      {
        text: 'Podman Troubleshooting Guide',
        path: '#',
        icon: 'fa6-solid:book',
      },
    ],
  },
};

const getHelp = {
  title: 'Getting Help',
  subtitle: 'Help & manpages',
};

export { header, getHelp };
