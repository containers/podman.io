const tabData = [
  {
    label: 'Find',
    title: 'Find and pull down containers no matter where they are.',
    commands: ['podman search', 'podman pull'],
    description:
      'Find and pull down containers whether they are on dockerhub.io or quay.io, an internal registry server, or direct from a vendor.',
    image: {
      src: '',
      alt: 'example of podman commands',
    },
  },
  {
    label: 'Run',
    title: 'Run pre-built application or distro containers.',
    commands: ['podman run'],
    description:
      'Find and pull down containers whether they are on dockerhub.io or quay.io, an internal registry server, or direct from a vendor.',
    image: {
      src: '',
      alt: 'example of podman commands',
    },
  },
  {
    label: 'Build',
    title: 'Podman Troubleshooting Guide ',
    commands: ['podman build'],
    description:
      'Find and pull down containers whether they are on dockerhub.io or quay.io, an internal registry server, or direct from a vendor.',
    image: {
      src: '',
      alt: 'example of podman commands',
    },
  },
  {
    label: 'share',
    title: "Share the containers you've built.",
    commands: ['podman push'],
    description:
      'Podman lets you push your newly-built containers anywhere you want with a single podman push command.',
    image: {
      src: '',
      alt: 'example of podman commands',
    },
  },
];

export default tabData;
