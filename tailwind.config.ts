import svgToDataUri from 'mini-svg-data-uri';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

const twConfig: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // 指定需要生成的内容文件
  darkMode: ['class', '[data-theme="dark"]'], // 使用类或数据属性来启用暗模式
  theme: {
    extend: {
      colors: {
        background: 'var(--content-background)',
        card: 'var(--ifm-card-background-color)',
        text: 'var(--ifm-text-color)',
        secondary: 'var(--ifm-secondary-text-color)',
        link: 'var(--ifm-link-color)',
        primary: 'var(--ifm-color-primary)',
        border: 'var(--ifm-border-color)',
      },
      fontFamily: {
        misans: ['misans'],
      },
      borderRadius: {
        card: 'var(--ifm-card-border-radius)',
      },
      boxShadow: {
        blog: 'var(--blog-item-shadow)',
      },
      animation: {
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
      },
    },
  },
  corePlugins: {
    preflight: false, // 禁用 Tailwind 的默认样式重置
  },
  plugins: [
    require('@tailwindcss/typography'), // 引入排版插件
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'bg-grid': value => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme('backgroundColor')),
          type: 'color',
        },
      );
    }),
    addVariablesForColors, // 添加颜色变量的插件
  ],
};

export default twConfig;

// 添加颜色变量到 :root
function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme('colors'));
  const newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ':root': newVars, // 将变量添加到根元素
  });
}
