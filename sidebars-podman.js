// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Overview',
    },
    {
      type: 'doc',
      id: 'source/markdown/podman.1',
      label: 'Podman Command',
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        'tutorials/basic_networking',
        'tutorials/image_signing',
        'tutorials/mac_client',
        'tutorials/performance',
        'tutorials/podman_tutorial',
        'tutorials/rootless_tutorial',
      ],
    },
    {
      type: 'doc',
      id: 'kubernetes_support',
      label: 'Kubernetes Support',
    },
    {
      type: 'doc',
      id: 'MANPAGE_SYNTAX',
      label: 'Manual Page Syntax',
    },
  ],
};

module.exports = sidebars; 