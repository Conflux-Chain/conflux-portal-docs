const path = require('path');
module.exports = {
  title: 'Conflux Portal Developer',
  tagline: 'Conflux Portal Documentation',
  url: 'https://conflux-chain.github.io/conflux-portal-docs/',
  baseUrl: process.env.NODE_ENV === "production" ? '/conflux-portal-docs/' : '/',
  favicon: 'img/favicon.ico',
  organizationName: 'Conflux-Chain', // Usually your GitHub org/user name.
  projectName: 'conflux-portal', // Usually your repo name.
  themeConfig: {
    sidebarCollapsible: false,
    navbar: {
      title: 'Conflux Portal Documentation',
      logo: {
        alt: 'Conflux Logo',
        src: 'img/logo.svg',
      },
      links: [
        // {
        //   to: 'docs/portal/introduction',
        //   activeBasePath: 'docs',
        //   label: 'Docs',
        //   position: 'left',
        // },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/Conflux-Chain/conflux-portal',
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
              label: 'Introduction',
              to: 'docs/portal/introduction',
            },
            {
              label: 'Getting Started',
              to: 'docs/portal/Main_Concepts/getting_started',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Conflux Bounty',
              href: 'https://bounty.conflux-chain.org/',
            },
            {
              label: 'Issues',
              href: 'https://github.com/Conflux-Chain/conflux-portal/issues',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/Conflux-Chain/conflux-portal',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/Conflux_Network',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Conflux Network, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: "docs/en",
          routeBasePath: "docs",
          sidebarPath: path.resolve(__dirname, './sidebars.en.js'),
          showLastUpdateTime: true,
          showLastUpdateAuthor: true
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
