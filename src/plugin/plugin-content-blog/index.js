// eslint-disable-next-line @typescript-eslint/no-var-requires
const blogPluginExports = require('@docusaurus/plugin-content-blog'); // 导入 Docusaurus 的博客插件
const { default: blogPlugin } = blogPluginExports; // 解构获取插件的默认导出

// 定义一个增强的博客插件
async function blogPluginEnhanced(context, options) {
  const blogPluginInstance = await blogPlugin(context, options); // 创建博客插件实例
  const { postsPerPage } = options; // 解构获取每页显示的博客文章数

  return {
    ...blogPluginInstance, // 返回插件实例的其他属性和方法
    async contentLoaded({ content, allContent, actions }) {
      // 对博客文章进行排序，依据 sticky 前端数据
      content.blogPosts.sort((a, b) => (b.metadata.frontMatter.sticky || 0) - (a.metadata.frontMatter.sticky || 0));

      // 按照每页文章数将文章分组
      const groupedPosts = Array.from({ length: Math.ceil(content.blogPosts.length / postsPerPage) }, (_, i) => ({
        items: content.blogPosts.slice(i * postsPerPage, (i + 1) * postsPerPage).map(post => post.id), // 获取每组的文章 ID
      }));

      // 更新分页博客列表
      content.blogListPaginated.forEach((page, i) => {
        page.items = groupedPosts[i] ? groupedPosts[i].items : []; // 更新每页的文章项
      });

      // 调用原始插件的 contentLoaded 方法以创建默认页面
      await blogPluginInstance.contentLoaded({ content, allContent, actions });

      // 创建自定义的全局数据
      const { blogTags } = content; // 解构获取博客标签
      const { setGlobalData } = actions; // 解构获取设置全局数据的函数

      setGlobalData({
        posts: content.blogPosts.slice(0, 10), // 仅存储前 10 篇博客文章
        postNum: content.blogPosts.length, // 总博客文章数
        tagNum: Object.keys(blogTags).length, // 博客标签数量
      });
    },
  };
}

// 导出增强的插件及其原始属性
module.exports = Object.assign({}, blogPluginExports, {
  default: blogPluginEnhanced, // 使用增强后的插件
});
