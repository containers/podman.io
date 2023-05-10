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
      label: 'Documentation',
      href: 'https://docs.podman.io',
    },
    {
      type: 'link',
      label: 'Network',
      href: 'https://github.com/containers/podman/blob/main/docs/tutorials/basic_networking.md',
    },
  ],
};
module.exports = sidebars;
