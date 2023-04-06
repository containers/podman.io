const header = {
  title: 'The best free & open source container tools',
  subtitle:
    'Manage containers, pods, and images with Podman. Seamlessly work with containers and Kubernetes from your local environment.',
  image: {
    path: 'images/optimized/podman-ui-679w-592h.webp',
    alt: 'Two screenshots of the Podman Desktop user interface',
  },
  release: {
    text: 'v4.3.0',
    path: 'https://podman.io/releases/',
  },
  platforms: [
    'Supported Platforms',
    'fa6-brands:redhat',
    'fa6-brands:apple',
    'fa6-brands:microsoft',
    'fa6-brands:linux',
  ],
};

const featureList = [
  {
    title: 'Fast and light.',
    description:
      "Daemonless, using the fastest technologists for a snappy experience. Our UI is reactive and light on resource usage and won't drag you down.",
  },
  {
    title: 'Secure.',
    description:
      'Rootless containers allow you to contain privileges without compromising functionality. Trusted by US government agencies for secure HPC at scale [case study](). ',
  },
  {
    title: 'Open.',
    description:
      "Podman is open source first and won't lock you in. Podman Desktop can be used as one tool to manage all your containers, regardless of container engine - even if you don't use Podman as your container engine.",
  },
  {
    title: 'Compatible.',
    description:
      'Compatible with other OCI compliant container formats including Docker. Run your legacy Docker containers (including docker-compose files) on Podman. [Learn more](#)',
  },
];

const kubernetesBanner = {
  title: 'Kubernetes Ready',
  description:
    'Create, start, inspect, and manage pods. Play Kubernetes YAML directly with Podman, generate Kubernetes YAML from pods, and deploy to existing Kubernetes environments.',
  image: {
    src: 'logos/optimized/kubernetes-logo-147w-143h.webp',
    alt: 'Kubernetes Logo',
  },
};

const compatibleTools = {
  title: 'A growing set of compatible tools',
  tools: [
    {
      title: 'VS Code',
      description: 'Visual Studio code includes Podman support',
      image: { path: 'logos/optimized/vscode-logo-75w-75h.webp', alt: 'VS Code Logo' },
    },
    {
      title: 'Cirrus',
      description: 'Cirrus CLI allows you to reproducibly run containerized tasks with Podman',
      image: { path: 'logos/optimized/cirrus-logo-75w-75h.webp', alt: 'Cirrus Logo' },
    },
    {
      title: 'Github Actions',
      description: 'GitHub Actions include support for Podman, as well as friends buildah and skopeo',
      image: { path: 'logos/optimized/github-logo-115w-115h.webp', alt: 'Github Logo' },
    },
    {
      title: 'Kind',
      description: "Kind's ability to run local Kubernetes clusters via container nodes includes support for Podman.",
      image: { path: 'logos/optimized/kind-logo-165w-95h.webp', alt: 'Kind Logo' },
    },
  ],
};

const coloringBook = {
  title: 'Have fun coloring and learn about Podman!',
  subtitle:
    "A decentralized team of open source container tool superheroes comes to the rescue when an asteroid storm threatens the planet. Learn about each tool—Podman, CRI-O, Buildah, Skopeo, and OpenShift—as they redesign the planet's protective shields' container deployment to protect Earth.",
  link: {
    text: 'Download',
    path: '#',
  },
  images: [
    {
      path: '#',
      altText: 'Container Commandos coloring book cover',
    },
    {
      path: '#',
      altText: 'Four examples of coloring book pages from the Container Commandos coloring book.',
    },
  ],
};

const containerTools = {
  text: 'Podman is one of a family of open source container tools',
  toolList: [
    {
      image: {
        path: '#',
        altText: 'Podman',
      },
      link: {
        text: 'podman.io',
        path: '#',
      },
    },
    {
      image: {
        path: '#',
        altText: 'Buildah',
      },
      link: {
        text: 'buildah.io',
        path: '#',
      },
    },
    {
      image: {
        path: '#',
        altText: 'Cri-o',
      },
      link: {
        text: 'cri-o.io',
        path: '#',
      },
    },
    {
      image: {
        path: '#',
        altText: 'Skopeo',
      },
      link: {
        text: 'github.com/containers/skopeo',
        path: '#',
      },
    },
  ],
};

export { header, featureList, kubernetesBanner, compatibleTools, coloringBook };
