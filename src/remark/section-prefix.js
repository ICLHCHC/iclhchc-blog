// 自定义 MDX 插件
import {visit} from 'unist-util-visit';

// 此插件访问每个 h2 标题并添加一个 Section X. 前缀。
const plugin = (options) => {
  const transformer = async (ast) => {
    let number = 1;
    visit(ast, 'heading', (node) => {
      if (node.depth === 2 && node.children.length > 0) {
        node.children.unshift({
          type: 'text',
          value: `Section ${number}. `,
        });
        number++;
      }
    });
  };
  return transformer;
};

export default plugin;