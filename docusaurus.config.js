// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Podman',
  tagline:
    'Podman is a daemonless container engine for developing, managing, and running OCI Containers on your Linux System',
  url: 'https://podman.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'favicon.ico',
  trailingSlash: false,
  deploymentBranch: 'gh-pages',
  organizationName: 'containers',
  projectName: 'containers.github.io',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    '@docusaurus/theme-live-codeblock',
    async function tailwindPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          path: 'docs',
          editUrl: 'https://github.com/containers/podman.io/tree/main',
        },
        theme: {
          customCss: require.resolve('./src/css/main.css'),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        hideOnScroll: true,

        title: 'podman',
        logo: {
          alt: 'Podman Logo',
          src: 'logos/optimized/podman-3-logo-95w-90h.webp',
        },
        items: [
          { to: 'features', label: 'Features', position: 'right' },
          { to: 'get-started', label: 'Get Started', position: 'right' },
          { to: 'community', label: 'Community', position: 'right' },
          {
            to: 'https://blog.podman.io',
            target: '_self',
            label: 'Development Blog',
            position: 'right',
          },
          {
            type: 'doc',
            docId: 'podman',
            label: 'Documentation',
            position: 'right',
          },

          {
            to: 'https://github.com/containers/',
            target: '_self',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Installation Instructions',
                to: 'docs/installation',
              },
              {
                label: 'Documentation',
                to: 'docs/',
              },

              {
                label: 'Podman CLI Commands',
                href: 'https://docs.podman.io/en/latest/Commands.html',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.com/invite/x5GzFF6QH4',
              },
              {
                label: 'Blog',
                href: 'https://blog.podman.io/',
              },
              {
                label: 'Mailing List',
                href: 'https://lists.podman.io',
              },
            ],
          },
          {
            title: 'Projects',
            items: [
              {
                label: 'Podman GitHub',
                href: 'https://github.com/containers/podman',
              },
              {
                label: 'Podman Desktop GitHub',
                href: 'https://github.com/containers/podman-desktop',
              },
              {
                label: 'Podman Website Github',
                href: 'https://github.com/containers/podman.io',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Podman. Built with Docusaurus.`,
      },

      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      liveCodeBlock: {
        playgroundPosition: 'bottom',
      },
    }),
};

module.exports = config;
