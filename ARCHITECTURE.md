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
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   ├── ChatInterface.vue   # 聊天统一界面
│   ├── Toast.vue / ToastContainer.vue
│   ├── LoginModal.vue / VerifyCodeModal.vue
│   └── tools/              # 各 AI 工具页使用的组件
│       ├── common/        # 通用上传等（UploadImage、UploadAudio）
│       ├── GPT4oImageTool.vue
│       ├── FluxKontextTool.vue
│       ├── NanoBananaTool.vue
│       └── ...
├── composables/            # 组合式函数（逻辑复用）
│   ├── useApi.js          # 统一 HTTP + 认证 + 错误/Toast
│   ├── useAuth.js         # 登录态、Token
│   ├── useToast.js        # 全局 Toast
│   ├── useHomeLayout.js   # 首页布局/导航状态
│   └── useToolSEO.js      # 工具页 SEO
├── data/                   # 静态数据（如 news.json）
├── layouts/
│   └── default.vue        # 默认布局：Header + 主内容 + Footer + Toast
├── pages/                  # 文件路由
│   ├── index.vue          # 站点首页（营销页）
│   ├── about.vue / pricing.vue
│   ├── home/              # 工具中心与各工具页
│   │   ├── index.vue      # 工具聚合首页（左侧历史 + 右侧工具导航/展示）
│   │   ├── gpt.vue / claude.vue / deepseek.vue / gemini.vue
│   │   ├── gpt-4o-image.vue / flux-kontext.vue / nano-banana.vue
│   │   ├── midjourney.vue / veo3.vue / runway.vue / luma.vue / sora.vue
│   │   ├── elevenlabs.vue + elevenlabs/*.vue
│   │   └── suno.vue + suno/*.vue
│   └── news/
│       ├── index.vue
│       └── [slug].vue
├── plugins/
│   └── auth.client.js     # 客户端登录态恢复（如读 Token）
├── public/                 # 无需构建的静态文件
│   ├── favicon.ico
│   ├── robots.txt / sitemap.xml
│   └── tools-logo/        # 各工具 Logo
├── server/                 # Nitro 服务端
│   ├── api/               # 代理与 BFF 接口
│   │   ├── chat/          # 对话：chatgpt、claude、deepseek、gemini
│   │   ├── common/        # 公共：batch-upload、models/tree、models/price
│   │   ├── image/         # 图像：gpt4o-image、flux-kontext、nano-banana、nano-banana-pro
│   │   ├── midjourney/    # Midjourney：imagine、blend、describe、swap-face
│   │   ├── audio/         # 音频：elevenLabs/*、suno/*
│   │   ├── video/         # 视频：veo、runway、luma、sora、sora-pro
│   │   ├── news/          # 资讯
│   │   └── user/          # 用户：登录、发送验证码
│   └── routes/            # 特殊路由（如 sitemap.xml）
├── nuxt.config.js         # Nuxt 配置（SSR、Nitro preset、SEO、CSS）
├── Dockerfile
├── docker-compose.yml
└── ARCHITECTURE.md        # 本文档
```

---

## 四、前端架构

### 4.1 路由与页面

- **文件路由**：`pages/` 下目录与文件名直接映射为路由。
- **首页**：`/` 使用 `index.vue`，为营销首页（Hero、图库、FAQ 等）。
- **工具中心**：`/home` 使用 `home/index.vue`，提供：
  - 左侧：使用历史（`useHomeLayout` 等）
  - 右侧：工具分类导航 + 当前选中工具的展示区（通过 `<component :is="currentToolComponent" />` 等动态加载对应 Tool 组件）。
- **具体工具页**：如 `/home/gpt`、`/home/gpt-4o-image`、`/home/nano-banana` 等，多为「同一套 home 布局 + 不同 Tool 组件」，部分子路由如 `/home/elevenlabs/multilingual-v2`、`/home/suno/extend` 等。

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
- 后端基地址在开发/生产环境不同（如开发 `http://127.0.0.1:8080`，生产 `https://www.fuseaitools.com`），在各自 API 的 `server/api/**/*.js` 中写死或通过环境变量区分。

### 5.2 API 分类与对应接口

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

#### 图像（Image）

| 前端路径 | 方法 | 说明 |
|----------|------|------|
| `/api/image/gpt4o-image/generate` | POST | GPT-4o 图像生成 |
| `/api/image/flux-kontext/generate` | POST | Flux Kontext 生成/编辑 |
| `/api/image/nano-banana/generate` | POST | Nano Banana 文生图 |
| `/api/image/nano-banana/edit` | POST | Nano Banana 编辑/图生图 |
| `/api/image/nano-banana-pro/generate` | POST | Nano Banana Pro 生成 |

#### Midjourney

| 前端路径 | 方法 | 说明 |
|----------|------|------|
| `/api/midjourney/imagine` | POST | Imagine 文生图 |
| `/api/midjourney/blend` | POST | Blend 混合 |
| `/api/midjourney/describe` | POST | Describe 图生文 |
| `/api/midjourney/swap-face` | POST | Swap Face 换脸 |

#### 音频（Audio）

| 前端路径 | 方法 | 说明 |
|----------|------|------|
| `/api/audio/elevenLabs/text-to-speech` | POST | ElevenLabs 文本转语音（Multilingual v2 / Turbo 2.5） |
| `/api/audio/elevenLabs/speech-to-text` | POST | ElevenLabs 语音转文本 |
| `/api/audio/elevenLabs/sound-effect-v2` | POST | ElevenLabs 音效 v2 |
| `/api/audio/elevenLabs/audio-isolation` | POST | ElevenLabs 音频分离 |
| `/api/audio/suno/generate` | POST | Suno 音乐生成 |
| `/api/audio/suno/extend` | POST | Suno 音乐延长 |
| `/api/audio/suno/upload-cover` | POST | Suno 音频覆盖 |
| `/api/audio/suno/upload-extend` | POST | Suno 音频扩展 |
| `/api/audio/suno/add-instrumental` | POST | Suno 伴奏生成 |
| `/api/audio/suno/add-vocals` | POST | Suno 人声生成 |

#### 视频（Video）

| 前端路径 | 方法 | 说明 |
|----------|------|------|
| `/api/video/veo/generate` | POST | Veo 3 生成（文生视频/首尾帧/图生视频） |
| `/api/video/veo/extend` | POST | Veo 3 视频扩展 |
| `/api/video/runway/generate` | POST | Runway 视频生成 |
| `/api/video/runway/extend` | POST | Runway 视频扩展 |
| `/api/video/runway/aleph` | POST | Runway Aleph 视频转换 |
| `/api/video/luma/generate` | POST | Luma 视频修改 |
| `/api/video/sora/generate` | POST | Sora 生成（text-to-video / image-to-video） |
| `/api/video/sora/watermark-remover` | POST | Sora 去水印 |
| `/api/video/sora-pro/generate` | POST | Sora Pro 生成（pro-text-to-video / pro-image-to-video） |
| `/api/video/sora-pro/storyboard` | POST | Sora Pro 分镜 |

#### 资讯（News）

| 前端路径 | 方法 | 说明 |
|----------|------|------|
| `/api/news` | GET | 资讯列表 |
| `/api/news/[slug]` | GET | 资讯详情 |

#### 用户（User）

| 前端路径 | 方法 | 说明 |
|----------|------|------|
| `/api/user/login-by-email` | POST | 邮箱登录 |
| `/api/user/send-email-code` | POST | 发送验证码 |

---

- **对话类**：请求体 JSON，响应为流式（SSE 等），Nitro 只做转发并设置相应头。
- **上传类**：Nitro 使用 `readMultipartFormData` 解析，再以 `FormData` 转发到后端，保证 `file` 字段与后端一致。
- **业务类**：请求体 JSON，响应 JSON；代理透传 `Authorization`；失败时若后端返回 `errorMessage`，代理可透传或包装为 `createError`，前端统一用 `useApi` 或 catch 展示 `errorMessage`。

### 5.3 错误与 errorMessage

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
- **预渲染**：`nuxt.config.js` 中 `nitro.prerender.routes` 列出需预渲染的路径，提升首屏与 SEO。

---

## 八、扩展与约定

- **新增 AI 工具页**：在 `pages/home/` 下增加或复用路由，在 `home/index.vue` 的导航/工具列表中注册对应 Tool 组件；如需新接口，在 `server/api/image/` 或 `server/api/chat/` 下新增代理并转发到后端。
- **新增对话模型**：在 `server/api/chat/` 增加 `xxx.post.js`，前端在 ChatInterface 的模型列表与 `getChatApiUrl` 中增加分支。
- **统一请求与错误**：新接口尽量通过 `useApi` 调用，失败时由后端返回 `errorMessage`，代理透传，前端统一 Toast 展示并重置状态，避免「失败后无法再次发起」。
- **上传**：需要传文件的接口，先通过 `/api/common/batch-upload` 拿到 URL，再把 URL 作为参数字段传给具体业务接口。

---

*文档随项目演进可增删章节，建议与 `nuxt.config.js`、`server/api` 目录及主要 composables 保持同步。*
