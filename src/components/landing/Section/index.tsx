import Link from '@docusaurus/Link' // 导入 Docusaurus 的 Link 组件
import Translate from '@docusaurus/Translate' // 导入翻译组件
import { Icon } from '@iconify/react' // 导入 Iconify 图标组件
import type React from 'react' // 导入 React 类型

// 定义 Section 组件的属性类型
interface SectionProps {
  title: string | JSX.Element // 标题，可以是字符串或 JSX 元素
  icon?: string // 可选的图标字符串
  href?: string // 可选的链接地址
  children: React.ReactNode // 子节点
}

// 定义 Section 组件
export function Section({ title, icon, href, children }: SectionProps) {
  return (
    <section className="group/section py-2 max-lg:mx-4"> {/* 包裹整个部分的 section 元素 */}
      <div className="mt-8 mb-4 inline-flex w-full items-center justify-between md:mt-6"> {/* 章节标题和链接的容器 */}
        <h2 className="m-0 inline-flex items-center justify-center gap-1 text-base"> {/* 标题元素 */}
          {icon && <Icon icon={icon} />} {/* 如果提供了图标，则渲染图标 */}
          {title} {/* 渲染标题 */}
        </h2>
        {href && ( // 如果提供了链接地址
          <Link
            href={href} // 设置链接地址
            className="group/link inline-flex items-center justify-center text-base opacity-0 transition duration-500 group-hover/section:opacity-100" // 添加过渡效果和样式
          >
            <Translate id="homepage.lookMore">查看更多</Translate> {/* 翻译的“查看更多”文本 */}
            <Icon icon="ri:arrow-right-s-line" className="transition group-hover/link:translate-x-1" /> {/* 箭头图标 */}
          </Link>
        )}
      </div>
      {children} {/* 渲染子节点 */}
    </section>
  )
}
