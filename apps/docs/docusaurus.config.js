// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HHX的笔记',
  tagline: 'HHX',
  url: 'https://hhx.vercel.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: '903040380', // Usually your GitHub org/user name.
  projectName: 'blog-docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // 显示文档更新时间
          showLastUpdateTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'HHX的笔记',
        logo: {
          alt: 'HHX LOGO',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: '笔记-react/intro/架构',
            position: 'left',
            label: '文档',
          },
          { to: '/blog', label: '博客', position: 'left' },
          {
            href: 'https://github.com/903040380',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '学习',
            items: [
              {
                label: '文档',
                to: '/docs/笔记-react/intro/架构',
              },
              {
                label: '博客',
                to: '/blog',
              },
            ],
          },
          {
            title: '参考',
            items: [
              {
                label: 'react-卡颂',
                href: 'https://react.iamkasong.com',
              },
              {
                label: 'http-山月',
                href: 'https://q.shanyue.tech/http/',
              },
              {
                label: 'webpack-山月',
                href: 'https://q.shanyue.tech/engineering/',
              },
              {
                label: 'webpack-山月',
                href: 'https://q.shanyue.tech/engineering/',
              },
              {
                label: 'reference-山月',
                href: 'https://q.shanyue.tech/',
              },
              {
                label: '数据结构-Carl',
                href: 'https://www.programmercarl.com/',
              },
              {
                label: '排序-bubucuo',
                href: 'https://space.bilibili.com/455025597',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/903040380',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} HHX`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
