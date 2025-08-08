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
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',
  favicon: 'favicon.ico',
  trailingSlash: false,
  deploymentBranch: 'gh-pages',
  organizationName: 'containers',
  projectName: 'containers.github.io',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  // Configure markdown processing: .md files use CommonMark, .mdx files use MDX
  markdown: {
    format: 'detect',
  },
  // Configure static directories and asset handling
  staticDirectories: ['static'],
  plugins: [
    '@docusaurus/theme-live-codeblock',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        // Index configuration
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: true,
        indexPages: false,
        // Route configuration
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/blogs',
        // Version-aware directory configuration
        docsDir: 'versioned_docs',
        blogDir: ['blog', 'release'],
        // Search result configuration
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        // Search bar configuration
        searchBarShortcut: true,
        searchBarShortcutHint: true,
        searchBarPosition: 'right',
      },
    ],
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
    ['@docusaurus/plugin-content-blog',
      {
        showReadingTime: true,
        routeBasePath: 'release',
        id: 'release-anouncements',
        path: './release',
        authorsMapPath: '../blog/authors.yml',
        onInlineAuthors: 'ignore',
      },
    ],

  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars-podman.js'),
          routeBasePath: 'docs',
          disableVersioning: false,
          includeCurrentVersion: false,
        },
        blog: {
          showReadingTime: true,
          routeBasePath: 'blogs',
          authorsMapPath: 'blog/authors.yml',
          onInlineAuthors: 'ignore',
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
          src: 'logos/optimized/podman-3-logo-266w-253h.webp',
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
            docId: 'index',
            label: 'Documentation',
            position: 'right',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
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
                to: 'get-started',
              },
              {
                label: 'Documentation',
                to: 'docs/',
              },
              {
                label: 'Podman CLI Commands',
                to: 'docs/source/markdown/podman.1',
              },
              {
                label: 'Tutorials',
                to: 'docs/tutorials/podman_tutorial',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Matrix',
                href: 'https://matrix.to/#/#podman:fedoraproject.org',
              },
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
              {
                label: 'RSS Feed',
                href: 'https://blog.podman.io/feed/',
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
                label: 'Podman Website GitHub',
                href: 'https://github.com/containers/podman.io',
              },
              {
                label: 'Podman Desktop Website',
                href: 'https://podman-desktop.io/',
              },
            ],
          },
        ],
        copyright: `<p>Copyright © ${new Date().getFullYear()} Podman Container Tools, a Series of LF Projects, LLC. Built with Docusaurus.</p><p>For website terms of use, trademark policy, and other project policies, please see the <a href="https://lfprojects.org/policies/">LF Projects policies page</a>.</p>`,
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
