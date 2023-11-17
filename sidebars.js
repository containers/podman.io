// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */


const sidebars = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'podman',
      label: 'Getting Started',
    },
    {
      type: 'doc',
      id: 'installation',
      label: 'Installation',
    },
    {
      type: 'doc',
      id: 'checkpoint',
      label: 'Checkpoint',
    },
    {
      type: 'link',
      label: 'Tutorials',
      href: 'https://docs.podman.io/en/latest/Tutorials.html',
    },
    {
      type: 'link',
      label: 'Documentation',
      href: 'https://docs.podman.io',
    },
    {
      type: 'link',
      label: 'Network',
      href: 'https://github.com/containers/podman/blob/main/docs/tutorials/basic_networking.md',
    },
    {
      type: 'doc',
      id: 'podman-version.1',
      label: 'podman-version',
    },
    {
      type: 'category',
      label: 'podman-generate',
      items: [
        {
          type: 'doc',
          id: 'podman-generate.1',
        },
        {
          type: 'doc',
          id: 'podman-kube-generate.1',
        },
        {
          type: 'doc',
          id: 'podman-generate-spec.1',
        },
        {
          type: 'doc',
          id: 'podman-generate-systemd.1',
        },
        
      ],
    },

    
  ],
};
module.exports = sidebars;
