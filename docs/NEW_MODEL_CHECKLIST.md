# 新增模型标准化接入指南

> 以 Seedance 2 Mini 为参考模板，记录在 FuseAITools-Web 中新增一个视频模型所需的全部文件变更与检查项。  
> 以后新增模型时，按本文档逐项执行即可。

---

## 0. 前置信息收集（向用户确认）

| 参数 | 说明 | 示例（seedance-2-mini） |
|---|---|---|
| `modelId` | 前端模式 ID（modeList 中用） | `seedance-2-mini` |
| `modelLabel` | 前端显示名称 | `Seedance 2 Mini` |
| `modelIcon` | FontAwesome 图标 class | `fas fa-compress-arrows-alt` |
| `backendPath` | 后端接口路径 | `/video/seedance/v2-mini` |
| `proxyFileName` | Nuxt server 代理文件名 | `v2-mini.post.js` |
| `pageRoute` | 页面路由 | `/home/seedance/v2-mini` |
| `pageFile` | 页面文件路径 | `pages/home/seedance/v2-mini.vue` |
| `seoComponent` | SEO 内容组件名 | `SeedanceV2MiniSeoContent.vue` |
| `priceModelKey` | 价格接口中的 modelKey | `seedance-2-mini` |
| `parentTool` | 所属工具组件 | `SeedanceTool.vue` |
| `dtoFields` | 后端 DTO 字段与校验 | 见用户提供的 Java DTO |
| `resolution` | 支持的分辨率 | `480p, 720p` |
| `duration` | 时长范围 | `4–15s` |
| `aspectRatios` | 画面比例选项 | `1:1, 4:3, 3:4, 16:9, 9:16, 21:9, adaptive` |
| `promptMaxLength` | 提示词最大长度 | `20000` |
| `pricingType` | 定价类型 | `RULE (per-second)` 或 `ONCE` |
| `与已有模式的关系` | 是否复用已有表单/表单字段 | 与 seedance-2 同构 |

---

## 1. 服务端代理（Server API Proxy）

**路径规则**：`server/api/video/{tool}/{proxyFileName}`

**模板**（以 `v2-mini.post.js` 为例）：

```js
/**
 * {模型名称} 视频生成接口（代理）
 * 后端：POST .../{backendPath}（实体 model={modelId}）
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}${backendPath}`
  try {
    const authHeader = getHeader(event, 'authorization')
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    if (authHeader) headers['Authorization'] = authHeader
    const cookie = getHeader(event, 'cookie')
    if (cookie) headers['Cookie'] = cookie
    const response = await fetch(targetUrl, { method: 'POST', headers, body: JSON.stringify(body) })
    const data = await response.json().catch(() => ({}))
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('{模型名称} proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
```

---

## 2. 工具组件修改（{ParentTool}.vue）

> 以下所有修改点均在 `<script setup>` 中，按代码位置从上到下排列。

### 2.1 modeList — 新增模式条目

```js
// 在 modeList 数组末尾（或合适位置）追加
{ id: '{modelId}', label: '{modelLabel}', icon: '{modelIcon}' }
```

### 2.2 modeTabToPath — 路由映射

```js
const modeTabToPath = {
  // ...existing entries
  '{modelId}': '{pageRoute}'
}
```

### 2.3 seedancePriceModelKeyMap — 价格模型映射

```js
const seedancePriceModelKeyMap = {
  // ...existing entries
  '{modelId}': '{priceModelKey}'
}
```

### 2.4 价格计算逻辑 — 纳入条件分支

如果新模型与已有 Seedance 2 系列定价逻辑相同（per-second + reference video 场景），将 `modelId` 加入条件：

```js
if (mode.value === 'seedance-2-fast' || mode.value === 'seedance-2' || mode.value === '{modelId}') {
  // per-second pricing with scene=with_video/without_video
}
```

如果定价逻辑不同，需新增独立分支。

### 2.5 isSeedance2Mode（或等效 computed） — 纳入模式判断

```js
const isSeedance2Mode = computed(() => 
  ['seedance-2-fast', 'seedance-2', '{modelId}'].includes(mode.value)
)
```

> 此 computed 控制：aspectRatio 选项（含 adaptive）、promptMaxLength（20000）、表单区域显示（Seedance 2 系列表单）。

### 2.6 promptPlaceholder — 自定义提示文本（可选）

```js
// 如果需要在 prompt 占位符中显示独立名称
`Prompt for ${mode.value === '{modelId}' ? '{modelLabel}' : 'Seedance 2 / 2 Fast'} (3-20000 characters)`
```

### 2.7 generate() — 生成请求体构建

**apiPath 分支**：

```js
if (modeVal === '{modelId}') {
  apiPath = '/api/video/seedance/{proxyFileName去掉.post}'
} else if (modeVal === 'seedance-2-fast') {
  // ...
}
```

**body.model 字段**：

```js
model: modeVal === '{modelId}' ? '{modelId}' : (/* ... */)
```

**resolution 字段**（如果分辨率选项与同组模式不同）：

```js
// 例如 mini 仅支持 480p/720p
resolution: modeVal === '{modelId}'
  ? (formData.resolution === '480p' ? '480p' : '720p')
  : (['480p', '720p', '1080p', '4K'].includes(formData.resolution) ? formData.resolution : '720p')
```

**模板中的分辨率按钮**（如果需要限制显示）：

```html
<template v-if="mode !== '{modelId}'">
  <!-- 1080p / 4K buttons -->
</template>
```

### 2.8 watch(mode) — 模式切换默认值

```js
watch(mode, (m) => {
  if (m === 'seedance-2-fast' || m === 'seedance-2' || m === '{modelId}') {
    formData.aspectRatio = '16:9'
    formData.resolution = '720p'
    formData.durationInt = 5
    formData.generateAudioV2 = true
    formData.webSearch = false
    referenceVideoUploadDurationSec.value = 0
  }
  // ...
})
```

### 2.9 fillFormFromOriginalData — 详情回填（通常无需改动）

> 如果新模型与已有模式的 DTO 字段同构（如 seedance-2-mini 与 seedance-2），`fillFormFromOriginalData` 已覆盖所有字段，**无需修改**。  
> 若有新字段，需在此函数中补充映射。

---

## 3. 页面文件（pages/home/seedance/{pageFile}）

```vue
<template>
  <HomeLayout>
    <div class="tool-page">
      <SeedanceTool />
    </div>
    <template #below-main>
      <{SeoComponent} />
    </template>
  </HomeLayout>
</template>

<script setup>
import SeedanceTool from '~/components/tools/SeedanceTool.vue'
import {SeoComponent} from '~/components/tools/{SeoComponent}.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: '{modelLabel} Generator',
  description:
    '{modelLabel} on FuseAITools—{一句话描述核心能力}. {duration} at {resolution}, prompts up to {promptMaxLength} chars. 20 free credits on sign-up.',
  category: 'video',
  route: '{pageRoute}',
  keywords: ['{modelLabel}', 'multimodal video', 'lightweight AI video', 'first last frame', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: '{priceModelKey}', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page {
  width: 100%;
  height: auto;
  min-height: 100%;
  overflow: visible;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}
</style>
```

---

## 4. SEO / AEO / GEO 内容组件

**路径**：`components/tools/{SeoComponent}.vue`

### 4.1 必须包含的结构化区块

| 区块 | 作用 | HTML 结构 |
|---|---|---|
| **Schema.org 标记** | GEO 机器可读 | `itemscope itemtype="https://schema.org/SoftwareApplication"` + itemprop meta |
| **Workflow Intro** | AEO 问答 | `workflowIntro.title` + `workflowIntro.lead`（含 `<code>` 和 `<strong>`） |
| **Workflow Definition** | AEO "What is" | `workflowDefinition.title` + `workflowDefinition.body` |
| **定位段落** | SEO 核心文本 | "🎬 {modelLabel} on FuseAITools" + 功能概述 |
| **Core Features** | SEO + AEO | feature-grid 卡片（icon + title + description） |
| **Scenarios** | SEO 场景标签 | scenario-badge 列表 |
| **对比表** | SEO + AEO | compare-table（新模型 vs 同组模型） |
| **FAQ** | AEO 结构化数据 | faq-list + `useToolSeoFaqSchema(faqItems)` 注入 JSON-LD |
| **Technical Specs** | SEO 技术规格 | 参数表格（Prompt / References / Duration / Resolution） |
| **升级提示** | 内链 + 转化 | pricing-tip + 同组高配模型链接 |

### 4.2 FAQ JSON-LD Schema

```js
const workflowFaq = [
  { question: '...', answer: '...' },
  // 至少 3-4 个模型专属 FAQ
]
const commonFaq = [
  { question: 'Do I need a local GPU for ...?', answer: '...' },
  { question: 'How do I try ... on FuseAITools?', answer: '...' }
]
const faqItems = computed(() => [...workflowFaq, ...commonFaq])
useToolSeoFaqSchema(faqItems)  // ← 必须调用，注入 JSON-LD
```

### 4.3 路由滚动监听

```js
watchRouteScroll((path) => path === '{pageRoute}' || path === '{pageRoute}/')
```

### 4.4 样式

```vue
<style src="~/assets/css/tool-seo-content.css"></style>
```

---

## 5. 聚合页面（data/toolOverviews.js）

> 在所属工具（如 `seedance`）的 overview 对象中更新以下 4 处：

### 5.1 intro — 工具总述

- 更新工作流数量（如 "eight" → "nine"）
- 追加新模型一句话描述

### 5.2 features 列表 — 新增条目

```js
{ name: '{modelLabel}', path: '{pageRoute}', description: '{一句话描述}' }
```

### 5.3 Core capabilities section — 新增模型参数

```
{modelLabel} ({modelId}): {prompt范围}. {references}. Duration {duration}. Resolution {resolution}. {其他参数}.
```

### 5.4 Workflow section — 新增工作流说明

```
{modelLabel}: {工作流简述}.
```

### 5.5 Try section — 更新总数

- 更新工作流数量
- 提及新模型

---

## 6. 历史记录路由映射（composables/useHomeLayout.js）

在 `modelToPath` 对象中新增：

```js
'{modelId}': '{pageRoute}',
```

> 确保生成完成后，历史记录点击能正确跳转到带 `record-id` 的详情页。

## 6.1 侧边栏路由识别映射（⚠️ 容易遗漏）

在 **单一数据源** `constants/routeToToolMap.js` 中新增：

```js
'{pageRoute}': '{ParentToolName}',
```

- `composables/useHomeLayout.js` 与 `pages/home/index.vue` 均 `import { routeToToolMap } from '~/constants/routeToToolMap'`，只需改这一处

> **不添加会导致**：访问新页面时侧边栏无法识别当前工具，`onMounted` 回退跳转到 `/home/gpt/generate`。

## 6.2 样式规范：禁止在 scoped CSS 写死颜色

工具组件的 `<style scoped>` 中**不允许**出现硬编码色值（如 `#374151`/`#1e293b`），统一使用 flux 令牌：

| 用途 | 令牌 |
|---|---|
| 主文字（标题、label、激活态） | `var(--flux-foreground)` |
| 次要文字（说明、hint、空状态段落） | `var(--flux-muted)` |
| 卡片/按钮底色 | `var(--flux-card)` |
| 输入区底色 | `var(--flux-input-bg)` |
| 边框 | `var(--flux-border)` |

> 令牌定义在 `assets/css/flux-theme.css` 的 `:root`，全局可用。写死浅色主题色会被主题 `!important` 覆盖，形成"两套真相"，新页面漏写覆盖时出现白底白字。

## 6.3 弹窗规范：一律使用 `BaseModal`

全站模态框统一走基座组件 `components/BaseModal.vue`，**禁止**在业务组件里自写 `Teleport + overlay + 卡片 + 关闭按钮 + ESC + 滚动锁`。

```vue
<BaseModal :is-open="open" max-width="420px" aria-label="Xxx" @close="open = false">
  <h3 class="panel-title">标题</h3>
  ... 弹窗内容 ...
</BaseModal>
```

| prop | 说明 |
|---|---|
| `isOpen` | Boolean，控制显隐 |
| `maxWidth` | String，默认 `420px`；宽内容（如画布编辑器）传 `920px` |
| `heavy` | Boolean，默认 false；为 true 时遮罩用 `--z-modal-heavy`（覆盖普通弹窗） |
| `closeOnOverlay` | Boolean，默认 true，点遮罩关闭 |
| `showClose` | Boolean，默认 true，右上角 × |
| `ariaLabel` | String，无障碍标签 |

- BaseModal 已内置：`Teleport to="body"`、遮罩 `.flux-modal-overlay`、卡片 `.flux-modal-card`（暗色令牌底色）、ESC 监听、`body` 滚动锁。
- 弹窗内容色值一律用 flux 令牌（`:root` 全局可用，Teleport 到 body 也能取到）。
- 弹窗内的按钮若依赖 `.home-layout--flux` 作用域样式，因 Teleport 逃过该作用域，需在组件内补一条 flux 覆盖（参见 `WanTool.vue` 的 `.bbox-modal-footer .btn-primary`）。
- 已迁移示例：`LoginModal.vue`、`VerifyCodeModal.vue`、`credits.vue`（退款双弹窗）、`WanTool.vue`（bbox 弹窗）。

## 6.4 面板/弹窗标题统一用 `panel-title`

工具页预览/配置标题、弹窗标题一律使用 class `panel-title`，**不再**新增 `video-header`/`image-header`/`result-header`/`results-header` 等散落命名。

- 新工具页的左右面板直接用壳组件 `ToolResultPanel.vue` / `ToolConfigPanel.vue`（已内置 `panel-title` + `actions` 插槽，flux 令牌化外观），**不要**再复制粘贴数百行 scoped 样式。
- `flux-theme.css` 对标题的覆盖已收敛为 `.home-layout--flux .panel-title, .home-layout--flux .section-label`，无需再枚举旧命名。

## 6.5 z-index：只用 `:root` 刻度，禁止随手写数值

层级统一定义在 `flux-theme.css` 的 `:root`，按需取用，**禁止**硬编码 `9999`/`10001` 之类：

| 令牌 | 值 | 适用 |
|---|---|---|
| `--z-header` | 1000 | 顶栏 / 吸顶 |
| `--z-dropdown` | 2000 | 下拉菜单 |
| `--z-modal` | 3000 | 普通弹窗（BaseModal 遮罩） |
| `--z-modal-heavy` | 4000 | 重型弹窗（`heavy`，如 bbox 编辑器） |
| `--z-lightbox` | 5000 | 图片放大预览 |
| `--z-toast` | 9000 | Toast（恒在最上） |

> 历史 bug：Toast 曾写 `10001` 被 bbox 弹窗 `10050` 盖住；退款 `9999` 低于认证 `10000`。刻度化后彻底消除。

## 6.6 新页面接入 flux 暗色主题

内容页（非工具页）要从浅色转 flux 暗色，两步：

1. 在 `composables/useFluxThemeRoute.js` 放行路由（`if (path === '/xxx') return true`），使 `.app-layout` 挂上 `.flux-theme`。
2. 在 `assets/css/flux-content-pages.css` 追加 `.flux-theme .xxx-page ...` 覆盖块，把页面 scoped 里的硬编码浅色换成 flux 令牌。该文件由 `plugins/flux-content-pages-styles.client.ts` 注入 `document.head` 末尾，用 `!important` 盖过 scoped。

> 已接入：`/pricing`、`/news`、`/about`、`/credits`。

---

## 6.7 路由登记：三张 SEO 表 + 首页入口（⚠️ 历史高频遗漏）

新页面建好后，必须同步下面这四张表（前三张只管 SEO，第四张是用户能不能点进来），否则页面能跑但不完整：

| 文件 | 作用 | 漏登记的后果 |
|---|---|---|
| `server/routes/sitemap.xml.js` | 动态生成 `/sitemap.xml`，`staticPages` 数组手工列工具页（父页 priority 0.85 / 功能页 0.8） | 页面不在站点地图里，爬虫发现与收录变慢——**影响最大** |
| `utils/toolBreadcrumbs.js` | `CHILD_LABEL_OVERRIDES_BY_ROUTE` 提供面包屑短标签；被 `useToolSEO.js`（JSON-LD `BreadcrumbList`）和 `HomeLayout.vue`（可见 `<Breadcrumb>` + `<h1 class="sr-only">{{ pageH1Text }}</h1>`）共用 | 不报错，走降级：`currentLabel` 回退成页面 SEO `name`，H1 变成「Seedream - Seedream 5 Pro Text to Image」这种父子重复 |
| `nuxt.config.js` → `nitro.prerender.routes` | 构建期预渲染清单（配 `crawlLinks: true` / `failOnError: false`） | Docker 走 `NITRO_PRESET=node-server`（`Dockerfile`）时按需 SSR，无风险；一旦改回默认 `preset: 'static'`，未登记且未被爬虫发现的路由会 404 |
| `components/ImageGallery.vue` | 首页 `/` 的「100+ AI Models」画廊，Chat / Image / Audio / Video 四行硬编码入口卡片（链到工具父页 `/home/{tool}`） | **用户影响最大**：页面能直链访问、三张 SEO 表全绿、构建全绿，但首页根本没入口，新工具等于没上线（Grok Chat / Kimi 接入时即漏掉） |

插入约定：三处都按**同工具族紧邻排列**（如 seedream 新行接在 `5-lite-image-to-image` 之后），标签命名对齐既有风格（`V3.0 Video`、`Seedance 2.5`、`5 Pro Layer Decomposition`）。

同工具的新 tab 一般**不需要**动 `routeRules`（旧路由 301 表）和 `constants/footerNav.js`；父页 `/home/{tool}` 也无需重复加（通常已在册）。但**新增工具（新父页）必须加 `components/ImageGallery.vue` 的对应分类行**；`constants/footerNav.js` 是精选清单（不含 Midjourney、GPT 4o Image），按运营判断取舍、脚本不强制。

自检脚本（列出所有 `pages/home/**.vue` 路由与三张登记表的差集，并双向校验首页画廊入口）：

```bash
node scripts/check-route-registry.mjs
```

差集里允许保留的只有一类：

- 孤儿旧别名页——`/home/gpt-image/generate`、`/home/ideogram/generate`（全站无入链，故意不进 sitemap）

chat 工具页（`/home/{gpt,deepseek,claude,gemini,grok-chat,kimi}/generate`）已于 2026-10 全部补齐三张表（含 `TOOL_PARENT_LABEL_BY_SLUG` 的 chat 段），**不再属于例外**；新增 chat 通道时按同一口径登记。另需注意：chat 为 TOKEN 计费，不进 `/api/common/models/price`，页面 `priceSpecification` 必须按 `docs/PRICING_MAPPING.md` 「### 22. Chat 通道」的区间手算。

---

## 7. 完成检查清单

| # | 检查项 | 文件 |
|---|---|---|
| 1 | Server API 代理文件已创建 | `server/api/video/{tool}/{proxyFileName}` |
| 2 | modeList 新增模式条目 | `{ParentTool}.vue` |
| 3 | modeTabToPath 路由映射 | `{ParentTool}.vue` |
| 4 | seedancePriceModelKeyMap 价格映射 | `{ParentTool}.vue` |
| 5 | 价格计算逻辑纳入条件分支 | `{ParentTool}.vue` |
| 6 | isSeedance2Mode（等效 computed）纳入 | `{ParentTool}.vue` |
| 7 | promptPlaceholder 自定义（如需） | `{ParentTool}.vue` |
| 8 | generate() apiPath 分支 | `{ParentTool}.vue` |
| 9 | generate() body.model 字段 | `{ParentTool}.vue` |
| 10 | generate() resolution 字段（如需限制） | `{ParentTool}.vue` |
| 11 | 模板中分辨率按钮显示控制（如需） | `{ParentTool}.vue` |
| 12 | watch(mode) 默认值 | `{ParentTool}.vue` |
| 13 | fillFormFromOriginalData 覆盖新字段（如有） | `{ParentTool}.vue` |
| 14 | 页面文件创建（含 useToolSEOAsync） | `pages/.../{pageFile}` |
| 15 | SEO 内容组件创建（含全部区块） | `components/tools/{SeoComponent}.vue` |
| 16 | FAQ JSON-LD Schema 注入 | `{SeoComponent}.vue` |
| 17 | watchRouteScroll 路由监听 | `{SeoComponent}.vue` |
| 18 | toolOverviews.js intro 更新 | `data/toolOverviews.js` |
| 19 | toolOverviews.js features 新增 | `data/toolOverviews.js` |
| 20 | toolOverviews.js Core capabilities 新增 | `data/toolOverviews.js` |
| 21 | toolOverviews.js Workflow 新增 | `data/toolOverviews.js` |
| 22 | toolOverviews.js Try 段落更新 | `data/toolOverviews.js` |
| 23 | useHomeLayout.js modelToPath 新增 | `composables/useHomeLayout.js` |
| 23b | routeToToolMap.js 新增（单一数据源） | `constants/routeToToolMap.js` |
| 23c | scoped CSS 无硬编码色值，全部使用 flux 令牌 | `{ParentTool}.vue` / 新建页面 |
| 23d | 弹窗一律用 `BaseModal`，标题用 `panel-title` | 含弹窗的组件 |
| 23e | z-index 只取 `:root` 刻度（`--z-*`），无硬编码数值 | 含层级样式的组件 |
| 23f | 工具面板优先用 `ToolResultPanel` / `ToolConfigPanel` 壳 | `{ParentTool}.vue` |
| 23g | sitemap 新增各新页面 `loc` 条目 | `server/routes/sitemap.xml.js` |
| 23h | 面包屑短标签新增各新页面路由 | `utils/toolBreadcrumbs.js` |
| 23i | prerender 清单新增各新页面路由（父页缺失时一并补） | `nuxt.config.js` |
| 23j | 首页「100+ AI Models」画廊对应分类行加入口卡片（新工具父页必需） | `components/ImageGallery.vue` |
| 24 | 后端价格接口已有 `{priceModelKey}` 定价规则 | 后端（非前端） |
| 25 | 后端 API 已部署 `{backendPath}` 接口 | 后端（非前端） |

---

## 8. 用户提供的参数结构模板

> 以后新增模型时，请按以下格式提供参数，我将按本文档自动完成全部前端接入：

```
模型ID: seedance-2-mini
显示名称: Seedance 2 Mini
后端接口: /api/video/seedance/v2-mini
页面路由: /home/seedance/v2-mini
价格ModelKey: seedance-2-mini
所属工具: SeedanceTool
与已有模式关系: 与 seedance-2 同构，仅分辨率限制为 480p/720p

DTO 字段:
  - model: "seedance-2-mini" (fixed)
  - prompt: 3-20000 chars
  - firstFrameUrl: string
  - lastFrameUrl: string
  - referenceImageUrls: list, max 9 (含首尾帧)
  - referenceVideoUrls: list, max 3
  - referenceAudioUrls: list, max 3
  - generateAudio: boolean, default true
  - resolution: "480p" | "720p"
  - aspectRatio: "1:1" | "4:3" | "3:4" | "16:9" | "9:16" | "21:9" | "adaptive"
  - duration: 4-15 (string regex [4-9]|1[0-5])
  - uploadDuration: string
  - webSearch: boolean (required)
  - nsfwChecker: boolean, default false
```
