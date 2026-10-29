# FuseAI Tools Web 项目架构说明

本文档描述 `fuseaitools-web` 的前后端架构、目录职责与数据流，便于新人上手与后续扩展。

---

## 一、项目概述

FuseAI Tools Web 是一个**一体化 AI 工具平台**前端项目，集成多类 AI 能力：

- **对话/聊天**：GPT、Claude、DeepSeek、Gemini 等
- **图像生成/编辑**：GPT-4o Image、Flux Kontext、Nano Banana、Midjourney 等
- **视频**：Veo3、Runway、Luma、Sora 等
- **音频**：ElevenLabs、Suno 等

技术形态为 **Nuxt 3 全栈应用**：前端 Vue 3 + 服务端 Nitro，通过服务端 API 代理转发到后端 Java 服务，支持 SSR、预渲染与 Docker 部署。

---

## 二、技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | Nuxt 3 | 基于 Vue 3 的全栈框架，SSR + 文件路由 |
| 服务端运行时 | Nitro | Nuxt 的服务端引擎，提供 API 路由与代理 |
| UI / 样式 | Vue 3 (Composition API)、Tailwind CSS、Font Awesome | 组件化 + 工具类样式 |
| 构建 / 部署 | Node.js、Docker | 支持 `nuxt build` 静态/Node 模式及 Docker 编排 |

- **开发**：`npm run dev`
- **构建**：`npm run build`（受 `NITRO_PRESET` 控制为 static 或 node-server）
- **预览**：`npm run preview`

---

## 三、目录结构

```
fuseaitools-web/
├── assets/                 # 需构建的静态资源（CSS 等）
│   └── css/
├── components/             # 全局/业务组件
│   ├── AppHeader.vue / AppFooter.vue
│   ├── HomeLayout.vue      # 工具页外壳：Header + 主区 + SEO 插槽（below-main）
│   ├── ChatInterface.vue   # 聊天统一界面
│   ├── Toast.vue / ToastContainer.vue
│   ├── LoginModal.vue / VerifyCodeModal.vue
│   └── tools/              # 各 AI 工具页使用的组件
│       ├── common/         # 通用上传/配置/结果面板（UploadImage、UploadAudio…）
│       ├── ToolSeoContent.vue    # SEO 内容唯一渲染器（数据驱动）
│       ├── QwenV3SeoContent.vue  # SEO 薄壳：只引入 data/seo/*.js
│       ├── GPT4oImageTool.vue
│       ├── FluxKontextTool.vue
│       └── ...
├── composables/            # 组合式函数（逻辑复用）
│   ├── useApi.js           # 统一 HTTP + 认证 + 错误/Toast
│   ├── useAuth.js          # 登录态、Token
│   ├── useApiCache.js      # models tree/price 的 localStorage 1 小时缓存
│   ├── useModelPrice.js    # 按模型 key + 表单字段计算 credits
│   ├── useRecordPolling.js # 非 chat 任务的 recordId 轮询
│   ├── useToolSEO.js / useToolSeoFaqSchema.js / useToolSeoPageScroll.js
│   └── ...
├── constants/              # 常量单一数据源
│   ├── site.js             # SITE_ORIGIN（canonical/og/sitemap/llms.txt 统一引用）
│   ├── routeToToolMap.js   # 路由 → 工具组件映射（新增页面必须登记）
│   └── footerNav.js
├── data/                   # 静态数据
│   ├── seo/                # 每工具一份 SEO 内容数据（qwen-v3.js、kling-v30.js…）
│   ├── elevenlabs-voices.js
│   └── toolOverviews.js
├── layouts/
│   └── default.vue         # 默认布局：Header + 主内容 + Footer + Toast
├── middleware/
│   └── midjourney-disabled.global.js
├── pages/                  # 文件路由
│   ├── index.vue           # 站点首页（营销页）
│   ├── about.vue / pricing.vue / credits.vue / test-routes.vue
│   ├── home/               # 工具中心与各工具页（二级/三级路由）
│   └── news/
│       ├── index.vue
│       └── [slug].vue
├── plugins/
│   ├── auth.client.js      # 客户端登录态恢复
│   └── flux-*.client.ts    # 工具页/内容页样式按路由注入
├── public/                 # 无需构建的静态文件（favicon、tools-logo、示例图…）
├── scripts/                # 构建质量闸门（prebuild + postbuild）
│   ├── check-route-registry.mjs  # 路由登记 + 首页画廊入口校验
│   ├── check-seo-content.mjs     # SEO 文案迁移一致性校验
│   ├── check-backend-contract.mjs # 前后端契约校验（读隔壁 Java 服务源码）
│   ├── check-build-output.mjs    # 产物校验：相对链接 / 404 页 / 站内死链
│   └── smoke-test.mjs            # prebuild 入口，串联 6 项检查
├── server/                 # Nitro 服务端
│   ├── api/
│   │   ├── [...path].js    # catch-all 代理（白名单内业务接口统一入口）
│   │   ├── chat/           # SSE 流式对话（独立文件）
│   │   ├── common/         # batch-upload、models/tree、models/price
│   │   ├── records/        # 记录详情/列表/扩展列表/chat 详情
│   │   ├── news/           # 资讯列表/详情
│   │   ├── user/           # 登录、验证码、credits-detail、refresh-timezone
│   │   ├── refund/         # 退款/取消订阅
│   │   └── stripe/         # 支付会话
│   ├── routes/             # 特殊路由（sitemap.xml 等）
│   └── utils/
│       ├── apiProxyRoutes.js  # 代理白名单（METHOD /path，131 条）
│       └── getApiBase.js      # 服务端后端基地址
├── utils/                  # 客户端工具
│   ├── apiBase.js          # 客户端 API 基地址（生产直连 api.fuseaitools.com）
│   ├── parseStandardApiResponse.js
│   ├── md5.js
│   └── toolBreadcrumbs.js
├── eslint.config.mjs       # ESLint 扁平配置（@nuxt/eslint）
├── error.vue               # 全站错误页
├── nuxt.config.js          # Nuxt 配置（SSR、Nitro preset、SEO、CSS、ESLint 模块）
├── Dockerfile / docker-compose.yml
└── ARCHITECTURE.md         # 本文档
```

---

## 四、前端架构

### 4.1 路由与页面

- **文件路由**：`pages/` 下目录与文件名直接映射为路由。
- **首页**：`/` 使用 `index.vue`，为营销首页（Hero、图库、FAQ 等）。
- **工具中心**：`/home` 使用 `home/index.vue`，提供：
  - 左侧：使用历史（`useHomeLayout` 等）
  - 右侧：工具分类导航 + 当前选中工具的展示区（通过 `<component :is="currentToolComponent" />` 等动态加载对应 Tool 组件）。
- **具体工具页**：如 `/home/gpt`、`/home/gpt-4o-image`、`/home/nano-banana` 等，多为「同一套 home 布局 + 不同 Tool 组件」；Suno 已统一为二级路由如 `/home/suno-generate`、`/home/suno-extend` 等；ElevenLabs 仍为三级如 `/home/elevenlabs/multilingual-v2`。

### 4.2 布局

- **default.vue**：全站默认布局，包含 `AppHeader`、主内容槽 `<slot />`、`AppFooter`、`ToastContainer`。
- 页面只需写内容，无需重复写头尾和 Toast。

### 4.3 组件分层

| 类型 | 位置 | 示例 |
|------|------|------|
| 全局布局/通用 | `components/` 根目录 | AppHeader、AppFooter、Breadcrumb、Toast、LoginModal |
| 业务/页面级 | `components/` | ChatInterface、HomeLayout、ProductShowcase、ToolCategory |
| 工具专用 | `components/tools/` | GPT4oImageTool、FluxKontextTool、NanoBananaTool、MidjourneyTool、Veo3Tool 等 |
| 工具内复用 | `components/tools/common/` | UploadImage、UploadAudio |

- **ChatInterface**：统一封装多模型对话（GPT/Claude/DeepSeek/Gemini），包含输入、上传文件、流式输出、历史等。
- **各 Tool 组件**：接收路由/模型信息，内部调用 `useApi`、`useAuth`、`useToast`，上传走 `/api/common/batch-upload`，业务请求走对应 `/api/chat/*` 或 `/api/image/*`。

#### 巨型 Tool 组件的拆分约定

超过 ~1500 行的 Tool 组件按「先逻辑、后模板」推进，每刀都可独立验证：

1. **逻辑先出**：纯状态机/交互逻辑抽到 `composables/use<Tool><Feature>.js`，签名统一为 `useXxx(依赖对象, showError)`，组件内只保留解构赋值，模板零改动；
2. **模板后拆**：轮廓清晰的面板（结果区、上传器、模式表单）再抽为 `components/tools/<tool>/*.vue`，props 只传只读数据 + 回调；
3. **样式跟随**：被抽走模板对应的 scoped 样式一并迁到子组件，父组件不留孤儿样式；
4. **每刀必验**：`npm run lint` + `npm run build`（构建自动跑冒烟测试与全站预渲染，渲染报错会直接中断）。

已拆分：`WanTool.vue` 的 bbox_list 编辑（缩略图 / 画框弹窗 / 回填）→ `composables/useWanBbox.js`（3051 → 2811 行）。下一步候选（按收益排序）：`WanTool` 上传处理器 → `useWanUploads`；`ElevenLabsTool` / `NanoBananaTool` / `SunoTool` 的生成与轮询逻辑。

### 4.4 组合式函数（Composables）

| 名称 | 作用 |
|------|------|
| `useApi` | 封装 `$fetch`，统一加 Authorization、解析 `errorCode/errorMessage`、失败时 `useToast` 并 throw |
| `useAuth` | 登录态：token、login、logout 等，与 localStorage / 后端登录接口协同 |
| `useToast` | 全局 Toast 展示（成功/失败/提示） |
| `useHomeLayout` | 首页/工具中心布局状态：分类、选中工具、历史记录等 |
| `useToolSEO` | 为工具页设置 title、description 等 SEO |
| `useModelPrice` | 拉取 `/api/common/models/price`，按模型 key 与表单字段计算 credits，用于提交按钮价格展示 |

认证流程：登录/验证码通过 `server/api/user/*` 调后端，成功后写 Token；之后 `useApi` 在请求头中附带 Token，供需要鉴权的接口使用。

---

## 五、服务端架构（Nitro）

### 5.1 角色

- Nitro 以 **BFF/代理** 身份存在：接收浏览器请求，转发到后端 Java 服务，并统一处理 CORS、认证头、错误体。
- 后端基地址由 `server/utils/getApiBase.js` 统一解析：开发环境 `http://127.0.0.1:8080/api`，生产域名下 `https://api.fuseaitools.com/api`。
- 浏览器端直连由 `utils/apiBase.js` 解析：线上 non-www / www 域名强制走 `https://api.fuseaitools.com/api`（静态资源由 CloudFront 分发，不处理 `/api`，POST 会 403），代理只服务本地开发与 SSR。
- 对外声明的主域统一从 `constants/site.js` 的 `SITE_ORIGIN` 引入，禁止在页面/结构化数据里硬编码域名。

### 5.2 代理实现

绝大多数业务接口由 **catch-all 代理** `server/api/[...path].js` 统一转发，不再为每个后端接口建文件：

- 透传 `Authorization`、`Cookie`、`Accept`、`Content-Type`（含 multipart 边界）与查询串；
- 请求体按原始字节转发，不做 JSON 解析再序列化，避免字段丢失；
- 原样返回上游状态码、`Content-Type`、`Content-Disposition`、`Set-Cookie` 与响应体，SSE 直接返回流。

可转发路径登记在 `server/utils/apiProxyRoutes.js` 白名单（`METHOD /path`），未登记一律 404，避免把后端 `/api` 全量暴露给公网。当前白名单 **131 条（130 POST + 1 GET）**；**新增后端接口只需在白名单加一行**，不再新建代理文件。

以下路径行为有差异，保留独立文件（Nitro 静态路由优先于 catch-all）：

| 路径 | 保留原因 |
|------|----------|
| `chat/*` | SSE 流式响应，直接返回 `response.body` |
| `common/batch-upload` | multipart 重组，后端要求 part 名为 `file` |
| `common/models/price` | 进程内 TTL 缓存 + 未登录时的服务端凭证 |
| `common/models/tree`、`records/*`、`news/*`、`user/credits-detail` | 查询参数校验与默认值 |
| `user/login-by-email`、`send-email-code`、`auth/refresh-timezone` | 依赖 `$fetch` 的 HTTP 错误映射 |
| `refund/*`、`stripe/create-session` | 退款/支付会话的请求体与错误码转换 |

### 5.3 API 分类与对应接口

#### 对话（Chat）

| 前端路径 | 方法 | 说明 |
|----------|------|------|
| `/api/chat/chatgpt` | POST | GPT 对话流式 |
| `/api/chat/claude` | POST | Claude 对话流式 |
| `/api/chat/deepseek` | POST | DeepSeek 对话流式 |
| `/api/chat/gemini` | POST | Gemini 对话流式 |

#### 公共（Common）

| 前端路径 | 方法 | 说明 |
|----------|------|------|
| `/api/common/batch-upload` | POST | 批量文件上传，multipart，返回 `data.urls` |
| `/api/common/models/tree` | GET | 模型树/列表 |
| `/api/common/models/price` | GET | 模型价格（credits），用于按钮展示 |

上述两个接口在客户端请求完成后会**缓存到本地（localStorage）**，缓存时长为 **1 小时**。读取时若没有有效缓存则再次请求接口，并将结果写入缓存。缓存逻辑由 `composables/useApiCache.js` 提供，`useModelPrice` 与 ChatInterface 的模型列表拉取会使用该缓存。

#### 记录详情（Records，轮询任务结果）

| 前端路径 | 方法 | 说明 |
|----------|------|------|
| `/api/records/detail` | GET | 查询记录详情，query: `record-id`。用于 Image/Audio/Video 等非 chat 任务轮询结果 |

除 chat 类型流式会话外，Image（4）、Audio（2）、Video（4）等模型的生成接口可能返回 `{ "errorCode": "00000", "data": { "recordId": "xxx" } }`。此时前端使用 `composables/useRecordPolling.js` 每 10 秒请求一次 `/api/records/detail?record-id=xxx`，直到返回 `data.outputUrls`；将 `outputUrls` 在右侧结果区展示。**轮询期间表单通过 fieldset disabled 锁定，不可修改**。

#### 业务接口（白名单分组）

除下方「独立文件接口」外，其余接口全部由 catch-all 代理转发。完整清单以 `server/utils/apiProxyRoutes.js` 为准（131 条），本文不再逐条罗列，避免文档与代码漂移。

| 分组 | 条数 | 代表路径 | 覆盖范围 |
|------|------|----------|----------|
| `image/*` | 59 | `/api/image/qwen/v3-text-to-image`、`/api/image/flux-2/image-to-image` | gpt-image（v2 / v2.5）、gpt4o-image、flux-kontext / flux-2 / flux-2-pro / flux-3-klein、grok、ideogram、imagen4、nano-banana（2 / 2-lite / 2-1 / pro）、qwen（v1 / v2 / v21 / v3 / v3-pro / z-image）、seedream（lite / 5-flash / 5-pro）、wan 2.7 image |
| `video/*` | 58 | `/api/video/kling/3-0-video`、`/api/video/seedance/v2` | grok、hailuo、happy-horse、kling（2.6 / 3.0 / omni / avatar / turbo）、luma、runway、seedance（lite / pro / v2 系列）、sora / sora-pro、veo、wan（v1 / v27 / v30） |
| `audio/*` | 10 | `/api/audio/elevenLabs/text-to-speech`、`/api/audio/suno/generate` | ElevenLabs 4 条（TTS / STT / 音效 / 音频分离），Suno 6 条（generate / extend / upload / instrumental / vocals） |
| `midjourney/*` | 3 | `/api/midjourney/imagine`、`/upscale`、`/vary` | blend / describe / swap-face 后端已下线，不再登记 |
| `user/*` | 1 | `GET /api/user/detail` | 其余用户接口见下方独立文件表 |

#### 独立文件接口（Nitro 文件路由）

Nitro 静态路由优先于 catch-all，以下接口因行为差异保留独立文件：

| 前端路径 | 方法 | 文件 / 说明 |
|----------|------|-------------|
| `/api/chat/{chatgpt,claude,deepseek,gemini}` | POST | `server/api/chat/*.post.js`，SSE 流式响应 |
| `/api/common/batch-upload` | POST | `server/api/common/batch-upload.post.js`，multipart 重组 |
| `/api/common/models/tree`、`/api/common/models/price` | GET | `server/api/common/models/*.get.js`，price 带进程内 TTL 缓存 |
| `/api/records/{detail,chat-detail,list,extend-list}` | GET | `server/api/records/*.get.js`，查询参数校验与默认值 |
| `/api/news/{list,detail}` | GET | `server/api/news/*.get.js` |
| `/api/user/{login-by-email,send-email-code,credits-detail}` | POST/GET | `server/api/user/*`，HTTP 错误映射 |
| `/api/user/auth/refresh-timezone` | POST | `server/api/user/auth/refresh-timezone.post.js` |
| `/api/refund/{refund-subscription,refund-recharge,cancel-subscription,*-detail}` | POST/GET | `server/api/refund/*` |
| `/api/stripe/create-session` | POST | `server/api/stripe/create-session.post.js` |

---

- **对话类**：请求体 JSON，响应为流式（SSE 等），Nitro 只做转发并设置相应头。
- **上传类**：Nitro 使用 `readMultipartFormData` 解析，再以 `FormData` 转发到后端，保证 `file` 字段与后端一致。
- **业务类**：请求体 JSON，响应 JSON；代理透传 `Authorization`；失败时若后端返回 `errorMessage`，代理可透传或包装为 `createError`，前端统一用 `useApi` 或 catch 展示 `errorMessage`。

### 5.4 错误与 errorMessage

- 后端统一格式如：`{ errorCode, errorMessage, data }`。
- 代理在非 2xx 或业务错误时，应尽量把后端 `errorMessage` 透传或放入 `message`，前端在 catch 或 `useApi` 中展示，保证「失败时抛出/展示 errorMessage」。

---

## 六、数据流与认证

1. **页面加载**：Nuxt 服务端渲染或客户端导航，layout 挂载，页面组件从路由/布局拿到当前工具或模型。
2. **用户操作**：在 Tool 或 ChatInterface 中填写表单、选择文件；文件先走 `/api/common/batch-upload` 得到 `urls`，再在提交时把 `urls` 带入对应业务接口（如 image 的 `imageUrls`/`imageInput`）。
3. **请求发出**：通过 `useApi().post/get` 或直接 `$fetch` 调用 `/api/*`；Nitro 转发到后端，并附加 `Authorization`（从当前请求头或插件注入的 Token 读取）。
4. **响应处理**：成功时解析 `data` 或流式内容；失败时由 `useApi` 或组件内 catch 显示 Toast（优先使用后端 `errorMessage`），并重置加载/上传状态，避免「失败后无法再次发起」。
5. **登录态**：登录成功后 Token 写入 localStorage 或由 useAuth 管理；`plugins/auth.client.js` 在客户端恢复；需要鉴权的接口由 `useApi` 自动带 Token。

---

## 七、部署与构建

- **Nitro preset**：通过环境变量 `NITRO_PRESET` 控制。
  - `static`：生成静态站点，适合纯前端或预渲染路由。
  - `node-server`：生成 Node 服务，保留服务端 API 与 SSR，适合 Docker 或 Node 托管。
- **Docker**：根目录提供 `Dockerfile`、`docker-compose.yml`，用于构建运行 Nitro 的镜像及编排；细节见 `README_DOCKER.md` / `DOCKER_SETUP.md`。
  - 基础镜像为 `node:24-alpine`（Node 20 已 EOL，且 `eslint-plugin-jsdoc` / `jsdoc-type-pratt-parser` 要求 `>=24.15`），`build.sh` 的拉取镜像名需与 Dockerfile 保持一致；
  - `npm ci --no-audit --no-fund --loglevel=error` 安装依赖：审计报告只覆盖 devDependencies（生产依赖 0 漏洞）且不进运行镜像；`loglevel=error` 屏蔽间接依赖的 engine/deprecation 噪音，安装失败仍以 error 输出；
  - 运行镜像只复制 `.output` 与 `package.json`，不再重复复制 `public/`（`.output/public` 已包含全部静态资源）。
- **预渲染**：`nuxt.config.js` 中 `nitro.prerender.routes` 列出需预渲染的路径，提升首屏与 SEO。`crawlLinks: true` 会沿着页面内链接继续抓取，因此**页面里必须使用带前导 `/` 的绝对路径**；相对链接会被按当前页 URL 解析成嵌套路径（如 `/home/qwen/home/qwen/x`），爬虫必然 404。
- **构建前质量闸门**：`prebuild` 自动执行 `node scripts/smoke-test.mjs`，任一失败则构建中断：
  1. **路由登记与首页入口**：`pages/home/**` 新增页面是否已登记到 sitemap / prerender / 面包屑三张表，且每个工具父页（`pages/home/{tool}.vue`）在首页「100+ AI Models」画廊 `components/ImageGallery.vue` 有入口卡片（反向也查：画廊链到不存在的页即悬空）；脚本 `scripts/check-route-registry.mjs`；
  2. **白名单格式**：`server/utils/apiProxyRoutes.js` 每条必须是 `METHOD /path` 且不以 `/` 结尾；
  3. **调用与白名单对齐**：扫描 `components/`、`composables/`、`pages/` 里的 `/api` 调用点与 `server/api/**` 文件路由，未登记的调用直接失败；
  4. **SEO 数据完整性**：`data/seo/*.js` 必填字段（`component` / `rootId` / `meta` / `sections`）+ 薄壳组件必须显式 import `ToolSeoContent`；
  5. **SEO 文案一致性**：`scripts/check-seo-content.mjs --all` 对比 git 基准版本（默认 HEAD）的旧组件，防止数据化迁移丢字。组件一旦迁完入库，基准版本本身就是薄壳，输出为「旧组件文案片段 0 段」——这是预期降级而非真验证；要回验迁移保真度把基准指到迁移前的 commit：`--ref=<sha>^`；
  6. **前后端契约**：`scripts/check-backend-contract.mjs` 读取 `../fuseaitools-server` 的 Java 源码（可用 `FUSE_SERVER_DIR` 覆盖），校验白名单路由能在 Controller 找到、请求体顶层字段能映射到 `@RequestBody` DTO、DTO 枚举字段的传值符合 `@JsonCreator` 的可接受值；另外把 6 个 chat 页的 `priceSpecification` 区间与 `sql/chat-*.md` 的**售价列**逐数字比对（该表同时有 `loss_*` 成本列，误取会对用户虚报低价，而这类错只有数值能查出来）；后端目录不存在时自动跳过，未修复的后端缺陷只提示不阻断。
- **构建后质量闸门**：`postbuild` 自动执行 `node scripts/check-build-output.mjs`，直接检查 `.output/public`：
  1. **相对链接**：任何 `href` 不以 `/`、`#`、协议开头的站内链接直接判失败（这是嵌套 404 的唯一来源）；
  2. **404 产物页**：`failOnError: false` 下坏链会被写成静态页，脚本会删除对应 html/payload，并提示修链接（避免被 CDN、搜索引擎当作真实页面）；
  3. **站内死链**：`href` 指向的路由在产物中既无 html 也无静态文件时只提示，用于发现后端文章数据里的失效 `prevPath` / `nextPath`。
- **代码检查**：`npm run lint`（ESLint 扁平配置见 `eslint.config.mjs`）。基线 **0 error**；存量 `unused-vars` 以 warning 形式存在，用 `--max-warnings` 锁住数值，新增代码不得抬高。

---

## 八、扩展与约定

- **新增 AI 工具页**：在 `pages/home/` 下增加或复用路由，在 `home/index.vue` 的导航/工具列表中注册对应 Tool 组件；**首页「100+ AI Models」画廊 `components/ImageGallery.vue`（Chat / Image / Audio / Video 四行硬编码列表）与 `constants/footerNav.js` 也要加入口，否则用户从首页点不进去**——前者已由 `check-route-registry.mjs` 强制校验，后者是精选清单不做强校验；如需新接口，在 `server/utils/apiProxyRoutes.js` 白名单加一行 `POST /xxx/yyy` 即可，不需要新建代理文件。
- **新增对话模型**：先在后端 `ChatChannelEnum` 确认通道协议与档位白名单；新通道才需要在 `server/api/chat/` 加 `xxx.post.js`（SSE 代理，镜像 `chatgpt.post.js`，**不**加进 `API_PROXY_ROUTES`，由 `smoke-test` 的 `collectNitroApiRoutes()` 覆盖），并在 `ChatInterface.vue` 的 `CHAT_CHANNELS` 登记 `endpoint` / `webSearch`（未登记的分类直接拒绝发送，不再回落 chatgpt）；新模型则只需把 `models_category.name` 加进该表 key 与各处路由登记。思考明文**不在前端配置**：服务端只要收到 thinking delta 就下发 `{reasoning}` 事件，前端收到就渲染（后端 `ChatChannelEnum.thoughtVisible` 也是个只被赋值、从未被读取的字段）。字段能力必须与后端 DTO 对齐：`enableWebSearch` 仅 GPT/Claude/Gemini，`enableDeep` 全通道且**必须显式传值**（不传等于「未表态」，后端取通道默认档）。
- **统一请求与错误**：新接口尽量通过 `useApi` 调用，失败时由后端返回 `errorMessage`，代理透传，前端统一 Toast 展示并重置状态，避免「失败后无法再次发起」。
- **上传**：需要传文件的接口，先通过 `/api/common/batch-upload` 拿到 URL，再把 URL 作为参数字段传给具体业务接口。
- **SEO 内容数据化（新增/修改工具页必读）**：
  1. 内容写到 `data/seo/<tool>.js`，schema 参照 `data/seo/qwen-v3.js`：`component` / `rootId` / `rootClass` / `meta` / `introByPath` / `definitionByPath` / `faqByPath` / `commonFaq` / `sections[]` / `tips[]` / `watchPathIncludes`；
  2. `sections` 可用类型：`intro`、`definition`、`prose`、`features`、`badges`、`table`、`faq`、`workflows`，个别工具的特有段落用 `html` 兜底；顺序自由，按渲染顺序排列即可；
  3. **按路由收窄**：`sections` 和 `tips` 都支持 `paths: ['/home/x/y']`，只在列出的路由渲染；同一段落按路由文案不同（如 v1/v1.1 对比表）时，就写成多个带 `paths` 的 section，不要写模板逻辑；
  4. 表格单元格可以是字符串或 `{ html, colspan }`（合并单元格用后者），`headers` 为纯文本；`table` 还支持 `lead` / `note` / `ariaLabel`；
  5. 薄壳组件（如 `QwenV3SeoContent.vue`）只保留三件事：`<ToolSeoContent :data="seo" />`、**显式** `import ToolSeoContent from '~/components/tools/ToolSeoContent.vue'`、引入数据文件与 `assets/css/tool-seo-content.css`。显式 import 不可省略——Nuxt 自动导入会解析为 `ToolsToolSeoContent`，导致 SSR 渲染为空且不报错；
  6. 迁移或改写后用 `node scripts/check-seo-content.mjs <组件名>`（或 `--all`）做文案比对，确认无丢字；脚本会把旧组件文案与 `data/seo/*.js` 做去标签/折叠空白后的子串比对，类名、`v-for` 表达式与跨标签碎片会自动忽略；片段只从**模板区**取文本节点（`<script>` / `<style>` 与注释先剔除，否则薄壳组件的 import 行会被当成一个巨型文案报假差异），`<script>` 里的长正文则通过单/双引号与**反引号模板字面量**补齐（`${}` 插值当分段边界）。
  7. 模板结构（标题层级、FAQ 折叠、内链事件委托、JSON-LD FAQ schema）统一由 `ToolSeoContent.vue` 维护，**不要在数据文件里写模板逻辑**；
  8. `npm run build` 的 prebuild 会自动跑 `smoke-test`，其中 [4/6] 会校验「每个数据文件字段完整 + 薄壳引用正确」，新增数据文件无需改脚本。
- **域名与 URL**：canonical / og:url / sitemap / llms.txt 一律从 `constants/site.js` 的 `SITE_ORIGIN` 拼接，不要在页面里硬编码域名。
- **前后端契约（改请求参数必读）**：
  1. `npm run check:backend` 手动跑契约校验；`prebuild` 也会跑（后端目录缺失时跳过），保证「改路由/改字段/改枚举」不会静默失效；
  2. 后端 Jackson 默认 `FAIL_ON_UNKNOWN_PROPERTIES=false` + camelCase，**字段名拼错不会报错，只会被丢弃**；请求体字段一律以 DTO 字段名为准；
  3. `*Enum` 类型字段按 `@JsonCreator` 的规则传值：多数枚举用 `@JsonValue` 的 code/ratio（如 `FluxKontextAspectRatioEnum` 收 `16:9` 而不是 `RATIO_16_9`），少数无 creator 的枚举才收枚举名；新增枚举字段时先看后端 `@JsonCreator` 再写前端；
  4. 后端 `BeanUtils.copyProperties(DTO, Request)` 遇到同名不同类型的字段会**静默跳过**，String→Enum 的字段必须在 Service 里显式 `setXxx(Enum.fromCode(...))`；契约脚本的 D 项会持续提示这类遗漏。

---

*文档随项目演进可增删章节，建议与 `nuxt.config.js`、`server/api` 目录及主要 composables 保持同步。*
