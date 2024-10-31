import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
// 命令行语法高亮
import npm2yarn from '@docusaurus/remark-plugin-npm2yarn';
// 数学公式支持
// remark 用于提取公式并将其转换为 <span> 标签，rehype 用于渲染转换后的公式（<span>）
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
// 使用自定义的 MDX 插件
import sectionPrefix from './src/remark/section-prefix';

// 设置备案信息
const beian = "你的备案信息"; // 定义 beian 变量
const beian1 = "你的备案信息1";

const config: Config = {
  title: 'ICLHC 的个人网站',
  tagline: '恐龙很酷🦕',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  // docusaurus 插件配置
  plugins: [
    // 在 docusaurus 中使用 Sass/SCSS 作为 CSS 预处理器
    'docusaurus-plugin-sass',
    // 提供图像组件
    // import Image from '@theme/IdealImage'
    '@docusaurus/plugin-ideal-image',
    // 增强后的博客插件： https://github.com/kuizuo/blog/blob/main/src/plugin/plugin-content-blog/index.js
    [
      './src/plugin/plugin-content-blog', // 为了实现全局 blog 数据，必须改写 plugin-content-blog 插件
      {
        path: 'blog',
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/kuizuo/blog/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogDescription: '代码人生：编织技术与生活的博客之旅',
        blogSidebarCount: 10,
        blogSidebarTitle: '博文',
        postsPerPage: 12,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        feedOptions: {
          type: 'all',
          title: '愧怍',
          description: 'feedId:41215011978385457+userId:41840354283324416',
          copyright: `Copyright © ${new Date().getFullYear()} 愧怍 Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`,
        },
      },
    ],
  ],
  // 自定义静态资源目录源（默认为 static）
  // staticDirectories: ['public', 'static'],
  markdown: {
    mermaid: true,
  },
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  themes: [
    '@docusaurus/theme-live-codeblock', // 交互式代码编辑器，可以在文档中插入一个 jsx 代码编辑器，可实时得到执行结果
    '@docusaurus/theme-mermaid', // Mermaid 插件，用于绘制流程图、序列图、甘特图、饼图等
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          remarkPlugins: [
            // 命令行语法高亮
            [npm2yarn, { sync: true }],
            // 数学公式支持
            remarkMath
          ],
          rehypePlugins: [
            // 数学公式支持
            [rehypeKatex, { strict: false }],
          ],
          admonitions: { // 自定义警示类型组件，需要在 src/theme/Admonition/Types.js 中定义对应组件
            keywords: ['my-custom-admonition'],
            extendDefaults: true,
          },
        },
        // 禁用 Docusaurus 自带的博客插件，采用增强后的博客插件
        // 详见： https://github.com/kuizuo/blog/blob/main/src/plugin/plugin-content-blog/index.js
        blog: false,
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        //   // beforeDefaultRemarkPlugins: [sectionPrefix],
        //   remarkPlugins: [
        //     // 命令行语法高亮插件
        //     [
        //       require('@docusaurus/remark-plugin-npm2yarn'),
        //       { converters: ['pnpm'] },
        //     ],
        //     // 自定义 MDX 插件
        //     // sectionPrefix,
        //   ],
        // },
        pages: {
          // 命令行语法高亮插件
          remarkPlugins: [require('@docusaurus/remark-plugin-npm2yarn')],
        },
        theme: {
          // 引入自定义全局 CSS
          customCss: './src/css/custom.css',
          // 要使用 SASS 作为 CSS 预处理器
          // 1. 需要安装这些包：docusaurus-plugin-sass sass
          // 2. 在 docusaur.config.js 中，配置 docusaurus-plugin-sass 插件
          // 2. 创建 SASS 版的全局样式： ./src/css/custom.scss
          // 3. 修改 tsconfig.json ，启用 SASS 编译选项
          // customCss: ['./src/css/custom.scss'], // 使用 sass 版的全局样式表
        },
      } satisfies Preset.Options,
    ],
  ],
  stylesheets: [
    { // 设置 KaTeX 渲染公式的样式
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
    {
      href: '/css/custom.css',
      type: 'text/css',
    },
  ],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    // 设置目录标题级别
    tableOfContents: {
      // 侧边栏显示 2-3 级标题
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    mermaid: { // 设置 meraid 插件的主题样式，可以分别为亮色和黑色模式设置。
      theme: { light: 'neutral', dark: 'forest' },
      options: {
        // maxTextSize: 11,
      },
    },
    navbar: {
      title: 'ICLHC 的小站',
      logo: {
        alt: 'My Site Logo',
        src: 'img/favicon.png',
      },
      items: [
        // 导航栏配置
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: '各种教程',
        // },
        {
          type: 'docSidebar',
          sidebarId: '恐龙文档',
          position: 'left',
          label: '恐龙文档（中文版）',
        }
        ,
        {
          type: 'docSidebar',
          sidebarId: 'WebDev学习笔记',
          position: 'left',
          label: 'WebDev 学习笔记',
        }
        ,
        { to: '/blog', label: '博客', position: 'right' },
        {
          href: 'https://github.com/ICLHCHC',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: 'Docusaurus',
              to: 'https://docusaurus.io/',
            },
          ],
        },
        {
          title: '社交媒体',
          items: [
            {
              label: '关于我',
              href: '/about',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ICLHCHC',
            },
            // {
            //   label: 'Discord',
            //   href: 'https://discordapp.com/invite/docusaurus',
            // },
            // {
            //   label: 'Twitter',
            //   href: 'https://twitter.com/docusaurus',
            // },
          ],
        },
        {
          title: '更多',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              html: `
                <a href="https://docusaurus.io" target="_blank" rel="noreferrer noopener">
                  <img src="/img/buildwith.png" alt="build with docusaurus" width="120" height="50"/>
                </a>
                `,
            },
          ],
        },
      ],
      copyright: `Copyright ©   ${new Date().getFullYear()} ICLHCHC. | Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java'],
      magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        { // 自定义魔法注释
          className: 'code-block-error-line',
          line: '这将出错',
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
