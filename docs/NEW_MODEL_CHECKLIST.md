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
