import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
// 导航栏是一组文档的集合，其中的所有文档共用一个导航栏。
/**
 * 创建侧边栏使您能够：
 * - 创建一个有序的文档组
 * - 为该组中的每个文档渲染侧边栏
 * - 提供上下文导航（下一步/上一步）
 *
 * 侧边栏可以从文件系统生成，也可以在此处显式定义。
 *
 * 您可以创建任意数量的侧边栏。
 */
const sidebars: SidebarsConfig = {
  // 默认情况下，Docusaurus 会根据 docs 文件夹结构生成侧边栏
  tutorialSidebar: [{type: 'autogenerated', dirName: 'tutorial'}],
  "恐龙文档": [
    {
      type: 'autogenerated', dirName: 'docusaurus' // 相对于 docs 目录
    },
  ],
  "WebDev学习笔记": [
    {
      type: 'autogenerated', dirName: 'learn-webdev'
    }
  ]
  // 但您也可以手动创建侧边栏
  /*
  tutorialSidebar: [
    'intro',  // 指向一个文档
    'hello',  // 另一个文档
    {
      type: 'category',  // 创建一个类别
      label: 'Tutorial',  // 类别的标签
      items: ['tutorial-basics/create-a-document'],  // 类别下的文档
    },
  ],
   */
};

export default sidebars;
