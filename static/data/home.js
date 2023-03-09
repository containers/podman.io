const header = {
  title: 'The best free & open source container tools',
  subtitle:
    'Manage containers, pods, and images with Podman. Seamlessly work with containers and Kubernetes from your local environment.',
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
      'Rootless containers allow you to contain privileges without compromising functionality. Trusted by US government agencies for secure HPC at scale (case study.) ',
  },
  {
    title: 'Open.',
    description:
      "Podman is open source first and won't lock you in. Podman Desktop can be used as one tool to manage all your containers, regardless of container engine - even if you don't use Podman as your container engine.",
  },
  {
    title: 'Compatible.',
    description:
      'Compatible with other OCI compliant container formats including Docker. Run your legacy Docker containers (including docker-compose files) on Podman. (Learn more)',
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

const compatibleTools = [
  {
    title: 'VS Code',
    description: 'Visual Studio code includes Podman support',
    image: { src: 'logos/optimized/vscode-logo-75w-75h.webp', alt: 'VS Code Logo' },
  },
  {
    title: 'Cirrus',
    description: 'Cirrus CLI allows you to reproducibly run containerized tasks with Podman',
    image: { src: 'logos/optimized/cirrus-logo-75w-75h.webp', alt: 'Cirrus Logo' },
  },
  {
    title: 'Github Actions',
    description: 'GitHub Actions include support for Podman, as well as friends buildah and skopeo',
    image: { src: 'logos/optimized/github-logo-115w-115h.webp', alt: 'Github Logo' },
  },
  {
    title: 'Kind',
    description: "Kind's ability to run local Kubernetes clusters via container nodes includes support for Podman.",
    image: { src: 'logos/optimized/kind-logo-165w-95h.webp', alt: 'Kind Logo' },
  },
];

export { header, featureList, kubernetesBanner, compatibleTools };
