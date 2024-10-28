---
sidebar_position: 1
---

# 教程简介

让我们在 **不到 5 分钟内发现 Docusaurus**。

## 开始使用

通过 **创建一个新站点** 开始使用。

或者 **立即尝试 Docusaurus**，访问 **[docusaurus.new](https://docusaurus.new)**。

### 你需要准备

- [Node.js](https://nodejs.org/en/download/) 版本 18.0 或以上：
  - 安装 Node.js 时，建议勾选所有与依赖项相关的复选框。

## 生成新站点

使用 **经典模板** 生成一个新的 Docusaurus 站点。

在运行以下命令后，经典模板将自动添加到你的项目中：

```bash
npm init docusaurus@latest my-website classic
```

你可以在命令提示符、PowerShell、终端或任何代码编辑器的集成终端中输入此命令。

该命令还会安装运行 Docusaurus 所需的所有依赖项。

## 启动你的站点

运行开发服务器：

```bash
cd my-website
npm run start
```

`cd` 命令用于更改你正在处理的目录。为了操作新创建的 Docusaurus 站点，你需要在终端中导航到该目录。

`npm run start` 命令会在本地构建你的网站，并通过开发服务器提供服务，准备好让你在 http://localhost:3000/ 上查看。

打开 `docs/intro.md`（此页面）并编辑几行：网站会 **自动重载** 并显示你的更改。