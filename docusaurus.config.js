// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Podman',
  tagline:
    ' Podman is a daemonless container engine for developing, managing, and running OCI Containers on your Linux System',
  url: 'https://containers.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'images/favicon.ico',
  trailingSlash: true,
  organizationName: 'containers',
  projectName: 'containers.github.io',
  deploymentBranch: 'sprint-1',
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
          editUrl: 'https://github.com/containers/website-new',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/containers/website-new',
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
      navbar: {
        title: 'Podman',
        logo: {
          alt: 'Podman Logo',
          src: 'logos/optimized/podman-3-logo-95w-90h.webp',
        },
        items: [
          { to: 'features', label: 'Features', position: 'right' },
          { to: 'get-started', label: 'Get Started', position: 'right' },
          { to: 'community', label: 'Community', position: 'right' },
          {
            to: 'https://podman.io/blogs',
            label: 'Development Blog',
            position: 'right',
          },
          {
            type: 'doc',
            docId: 'README',
            label: 'Documentation',
            position: 'right',
          },

          {
            href: 'https://github.com/containers/website-new',
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
                label: 'Documentation',
                href: 'https://docs.podman.io/',
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
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                href: 'https://podman.io/blogs/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/containers/website-new',
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
