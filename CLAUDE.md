# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个 AI 图像提示词精选画廊网站项目（AI Image Prompt），专注于展示高品质的"图片+提示词"组合。项目使用 Next.js 开发，采用纯前端实现方案，最终部署到 Cloudflare Pages。

## 核心技术栈

- **框架**: Next.js（服务端渲染）
- **样式**: Tailwind CSS
- **数据管理**: JSON 文件存储图片路径、提示词等信息
- **部署**: Cloudflare Pages

## 开发命令

```bash
# 创建新的 Next.js 项目
npx create-next-app@latest . --typescript --tailwind --app

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 启动生产环境预览
npm start

# 代码检查
npm run lint
```

## 项目架构

### 页面结构
- **主页 (/)**: 瀑布流/网格布局的图片画廊，包含搜索和分类功能
- **博客页面 (/blog)**: 博客文章列表和详情页
- **FAQ页面 (/faq)**: 常见问题解答
- **服务条款 (/terms)**: 服务条款页面
- **隐私政策 (/privacy)**: 隐私政策页面
- **联系我们 (/contact)**: 联系方式页面

### 核心功能模块
1. **画廊展示**: 瀑布流展示图片，点击弹窗显示提示词详情
2. **分类筛选**: 按模型（nano-banana 和 gpt-4o）、风格、主题筛选
3. **搜索功能**: 前端实现的图片和提示词搜索
4. **复制功能**: 一键复制提示词和参数

### 数据结构
图片数据存储在 JSON 文件中，包含：
- 图片路径
- 提示词文本
- 模型版本
- 分类标签
- 参数（如 --ar 16:9）

## SEO 和技术要求

### 强制要求
- 所有页面必须使用服务端渲染（SSR）
- 导航栏切换必须触发完整页面重载，禁用前端 JS 切换
- 所有内容必须为英文
- 除主页外，每个页面单词数不低于 600 个
- 所有页面必须兼容移动端

### SEO 规范
- Canonical URL 不包含 `www` 和 `.html` 后缀
- 所有 `<img>` 标签必须包含关键词的 `alt` 属性
- 页面 description 必须以 `#1` 开头
- 在 `<head>` 中添加：`<link rel="icon" href="/favicon.ico" type="image/png">`
- 生成 sitemap.xml，包含所有页面

### 页面布局要求
- **导航栏**: 包含 Home、Blog、FAQ
- **页脚**: 包含 Terms of Service、Privacy Policy、Contact Us（不包含 Home、Blog、FAQ）

## 开发注意事项

1. **图片优化**: 图片需压缩并转换为 WebP 格式，使用懒加载
2. **数据管理**: 使用 `getStaticProps` 或 API 路由获取 JSON 数据
3. **样式风格**: 采用赛博朋克风格设计
4. **联系邮箱**: firenull52@gmail.com

## 部署流程

1. 将代码推送到 GitHub/GitLab 仓库
2. 配置 Cloudflare Pages 与仓库的自动集成
3. 设置自定义域名：https://ai-image-prompt.com
4. 每次代码更新后自动部署