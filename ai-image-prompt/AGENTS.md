# Repository Guidelines

## 项目结构与模块组织
- 项目基于 Next.js Pages Router，主页面位于 `pages/`，多语言页面存放在 `pages/zh/`，API 入口集中在 `pages/api/`。
- 复用型界面组件放在 `components/`，业务逻辑与数据处理位于 `lib/` 与 `types/`，其中 `lib/models.ts` 和 `types/case.ts` 定义核心类型。
- 数据源 JSON 文件保存在 `data/`，博客 Markdown 素材位于 `content/blog/`，静态资产使用 `public/assets/`，Tailwind 配置样式集中在 `styles/`。
- 构建辅助脚本位于 `scripts/`，例如 `scripts/generate-data.ts`，可根据需要扩展。

## 构建、测试与开发命令
- `npm run dev`：启动本地开发服务（Turbopack），默认监听 `http://localhost:3000`。
- `npm run build`：执行生产构建，请在发布前运行以确保编译通过。
- `npm run start`：在本地使用生产构建启动服务器，验证部署行为。
- `npm run lint`：运行 ESLint（`next/core-web-vitals` 规则），用于静态检查与格式统一。
- `npm run generate:data` 与 `npm run generate:sitemap`：使用 `tsx` 执行脚本，分别生成案例数据与站点地图；修改 `data/` 或路由后务必重新生成。

### 数据加载实现
- `lib/dataLoader.ts` 通过静态 `import` 引入 `data/*.json`，生成构建时直接打包，不再在运行时读取文件系统；新增数据后需重新执行生成脚本并提交 JSON。
- 可使用 `buildTagMap`/`loadCases` 提前生成标签映射，保证筛选与多语言内容一致。

## UI 交互与组件行为
- 首页画廊使用受控瀑布流：按屏幕宽度划分固定列数（1/2/3），新增数据仅附加在列尾，避免触底加载时已有卡片跳列。
- 首页启用 IntersectionObserver 实现触底增量加载，每次追加 30 条，底部展示加载状态文案；无更多内容时显示 “All prompts loaded”。
- 卡片图片点击后触发 `ImagePreviewModal`，模态支持输入/输出分组切换、缩略图导航、键盘左右键切换及 `Esc` 关闭。
- 语言切换位于头部尾部：使用受控 `<details>` 下拉菜单，点击外部区域或选中语言时自动收起；选中项高亮并保持中英文链接。
- 语言下拉菜单展开容器禁止被父元素裁剪（移除头部 `overflow-hidden`），位置居中且带投影层级。


## 代码风格与命名约定
- TypeScript 开启 `strict`，默认使用 `@/*` 路径别名；导入示例：`import { CaseCard } from "@/components/CaseCard";`。
- 组件文件采用 PascalCase，内部变量与函数使用 camelCase，JSON 键保持小写连字符以匹配模型 ID。
- 统一使用两空格缩进与单引号，React 组件使用函数式写法，状态管理优先使用 React hooks。
- Tailwind 4 样式通过 `@import "tailwindcss"` 与内联主题完成，新增设计变量请在 `styles/globals.css` 内维护。

## 测试规范
- 当前仓库尚未引入自动化测试框架，建议新增单元测试时在相邻目录创建 `__tests__` 并采用 Vitest + Testing Library。
- 数据脚本提交前请运行 `npm run generate:data` 并人工核对产出的 JSON 结构，避免破坏前端筛选逻辑。
- UI 调整需在开发服务器下完成跨语言 smoke test，确保 `pages/zh/` 与英文页面内容同步。

## 提交与合并请求指南
- Git 历史以简短动词（如 `upd`）为主，后续 commit 建议改用 `type: 简要说明` 形式，例如 `feat: 增加案例筛选`，并保持英文祈使语气或简洁中文动词。
- 提交前确认 `npm run lint` 与脚本生成全部通过，必要时附上关键截图或数据片段。
- 新建分支建议遵循 `feature/`、`fix/`、`chore/` 前缀。PR 描述需包含背景、改动要点、验证方式和关联 issue 链接。
- 对 UI 或数据更新的 PR，请附带中英文界面截图或样例 JSON，以便评审快速校验。

## 配置与安全提示
- 机密凭据应存放在 `.env.local`，不要提交到版本库；在文档中使用占位符如 `YOUR_API_KEY`。
- `.next/`、`node_modules/` 等目录已在 `.gitignore` 中列出，若新增构建产物请同步更新忽略规则。
- 生成站点地图或数据时注意文件体积，保持 JSON 压缩整洁并避免携带敏感字段。
