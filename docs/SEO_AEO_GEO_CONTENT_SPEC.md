# FuseAITools 工具页 SEO / AEO / GEO 内容规范

> **用途**：改文案、补 SEO 区块、做新工具页时，先读本文。Agent 可直接按清单改 `pages/home/**`、`*SeoContent.vue`、`data/toolOverviews.js`、`useToolSEOAsync` 等。  
> **站点语言**：用户可见正文、meta、JSON-LD 描述 **统一英文**（除非产品明确要求中文页）。  
> **参考实现**：**Wan 7 个视频工作流子页 + `/home/wan` 聚合页**（见 §9）。  
> **相关文档**：`docs/SEO_ROUTING.md`（路由与 sitemap）、`docs/PRICING_MAPPING.md`（计费事实）。

---

## 1. 概念与目标

| 类型 | 全称 | 目标 | 在本项目中的载体 |
|------|------|------|------------------|
| **SEO** | Search Engine Optimization | 收录、排名、摘要、富结果 | `<head>`、`sitemap`、canonical、内链 |
| **AEO** | Answer Engine Optimization | 被 AI 摘要/问答直接引用 | 首段定义、FAQ、对比表、清晰 H2 |
| **GEO** | Generative Engine Optimization | 被 RAG/生成式搜索选为可信来源 | 实体一致、可核实事实、少重复、结构化 |

三者共用同一套页面内容，**写一次、三层受益**。不要为 SEO 堆关键词而为 AEO 写空话；**可核实的事实**是共同基础。

---

## 2. 页面类型与文件落点

### 2.1 工具表单页（三级功能页）

**路径模式**：`/home/{brand}/{workflow}`  
**示例（Wan）**：`/home/wan/text-to-video`、`/home/wan/v2-7-r2v`

| 层级 | 文件（Wan 示例） | 职责 |
|------|------------------|------|
| 页面壳 | `pages/home/wan/text-to-video.vue` 等 7 个视频页 | `HomeLayout` + `WanTool` + `#below-main` SEO 插槽 |
| 表单 | `components/tools/WanTool.vue` | 真实能力边界（改 SEO 前必须对齐） |
| 底部 SEO | `Wan26VideoSeoContent.vue`（2.6 三路）/ `Wan27VideoSeoContent.vue`（2.7 四路） | 长文、FAQ、对比、工作流卡片 |
| Head SEO | `useToolSEOAsync({ ... })` in 页面 `<script setup>` | title、description、OG、JSON-LD |
| FAQ JSON-LD | `composables/useToolSeoFaqSchema.js` | 与 `faqItems` 同步的 `FAQPage` schema |
| 样式 | `assets/css/tool-seo-content.css` | 共用 `.seo-content`（flux 青绿主题） |
| 滚动 | `composables/useToolSeoPageScroll.js` | 工作流切换 / 跨页链接回顶 |

**布局约定**：

```vue
<HomeLayout>
  <div class="tool-page"><WanTool /></div>
  <template #below-main><Wan26VideoSeoContent /></template>
  <!-- 2.7 子页用 Wan27VideoSeoContent -->
</HomeLayout>
```

`tool-page` 使用 `height: auto; overflow: visible`，以配合 `home-page--with-below` 页面级滚动。

### 2.2 工具聚合页（二级概览页）

**路径模式**：`/home/{brand}`  
**示例（Wan）**：`/home/wan`

| 层级 | 文件 | 职责 |
|------|------|------|
| 路由壳 | `pages/home/wan.vue` | `ToolOverview` + `NuxtPage` |
| 配置 | `data/toolOverviews.js` → `toolOverviews.wan` | intro、features 卡片、sections 长文 |
| 展示 | `components/ToolOverview.vue` | 渲染 + canonical（`https://fuseaitools.com/home/wan`） |
| Head | `ToolOverview` 内 `useHead`：title、description（= intro）、BreadcrumbList、CollectionPage、ItemList |

聚合页 = **品牌入口 + 内链到各工作流**；不替代子页的独立 SEO，也不复制子页整段 FAQ/技术表。

---

## 3. 品牌级内容架构（以 Wan 视频 7 页为模板）

### 3.1 子页（每个工作流：差异化 + 可共享）

**必须差异化（GEO 防重复）**：

1. **当前工作流导语** — `workflowIntroMap[route]`，仅匹配路由时显示，2–4 句  
2. **定义段** — `workflowDefinitionMap[route]`，H2：`What is Wan 2.x {Workflow}?`  
3. **`useToolSEOAsync`** — 每页唯一的 `name` / `description` / `keywords` / `route`  
4. **工作流专属 FAQ** — `workflowFaqMap[route]` 至少 2 条，再拼 `commonFaq`

**可共享（同版本内相同）**：

- Version badge、品牌定位、Core features 网格、场景标签、vs 对比表、`commonFaq`、技术规格 + 能力简表、工作流导航卡片、定价提示、跨版本引导

**推荐区块顺序（自上而下）** — 与 `Wan26VideoSeoContent` / `Wan27VideoSeoContent` 一致：

1. Version badge（如 `Wan 2.6 · Role-Play & Multi-Shot Video`）  
2. **当前工作流导语**（`workflowIntro`）  
3. **定义段**（`workflowDefinition`）  
4. 品牌定位（Wan on FuseAITools）  
5. Core features（4–6 卡）  
6. Use cases（scenario badges）  
7. Comparison table（vs 传统方案或 vs 上一代，如 2.7 vs 2.6）  
8. FAQ（microdata + `useToolSeoFaqSchema(faqItems)`）  
9. Technical specs + **能力简表**（与表单/API 一致）  
10. Workflow grid（`model-mode-card--current` 高亮当前）  
11. Pricing tip（20 free credits → `/pricing`）  
12. Optional：跨版本引导（2.6 ↔ 2.7，`navigateToToolTop`）

**多版本品牌**：按主版本拆 SEO 组件（Wan 2.6 / 2.7 各一个 `*SeoContent.vue`），不要混用两套正文逻辑。

### 3.2 聚合页 `/home/wan`（示例）

对应 `toolOverviews.wan`：

| 字段 | 要求（Wan 已实现） |
|------|-------------------|
| `title` | `Wan`（与全站称呼一致） |
| `intro` | 1 段：2.6 / 2.7 分工 + 图像能力一句 + FuseAITools + **20 free credits** |
| `features[]` | 9 项：2 图像 + **7 视频**；`name` 带版本前缀（如 `Wan 2.6 Text to Video`）；`description` 与子页不矛盾 |
| `sections[]` | **3 段**：`Core capabilities`、`Workflow`、`Try Wan on FuseAITools`（勿堆 8+ 段重复子页） |

聚合页 title/description 覆盖 **品牌总览词**；子页覆盖 **工作流长尾词**（如 `Wan 2.7 R2V`），禁止与子页 meta 完全相同。

---

## 4. SEO 规范（`<head>` 与技术）

### 4.1 Title

- 格式（三级页，由 `useToolSEO` 生成）：  
  `{Tool Page Name} - {Category} AI Tool | Free Online | FuseAI Tools`
- `Tool Page Name` 须含 **品牌 + 版本 + 工作流**  
- **示例**：`Wan 2.7 Text to Video Generator - Video AI Tool | Free Online | FuseAI Tools`

### 4.2 Meta description

- **长度**：120–160 字符（`clampDescription`）  
- **必含**：工作流做什么、FuseAITools、1 个可核实参数或差异化  
- **可选**：20 free credits、credit-based pricing  
- **示例（Wan 2.6 T2V）**：  
  `Wan 2.6 text-to-video on FuseAITools—5/10/15s clips at 720p/1080p with multi-shot mode. Pay with credits; 20 free credits on sign-up.`

### 4.3 Keywords

- 每页 **6–12 个**  
- 结构：品牌、版本、工作流英文、品类词、1–2 长尾、`FuseAITools`  
- **示例（Wan 2.7 R2V）**：  
  `Wan 2.7, Wan, reference to video, R2V, multi character video, FuseAITools`

### 4.4 Canonical / robots / OG

- Canonical：`https://fuseaitools.com` + `route`  
- 子页：`useToolSEOAsync` 输出完整 meta / OG / robots  
- 聚合页：`ToolOverview` 输出 canonical + 简化 meta（description = intro）

### 4.5 JSON-LD

**子页（`useToolSEOAsync`）**：

1. `BreadcrumbList`（`utils/toolBreadcrumbs.js`）  
2. `SoftwareApplication`（offers、可选 priceSpecification）

**子页额外（AEO）**：

3. **`FAQPage`** — 在 `*SeoContent.vue` 中调用 `useToolSeoFaqSchema(faqItems)`，与 FAQ 折叠列表同源  
4. **`aggregateRating`** — 全站 `useToolSEO.js` 仍有占位评分；**新内容禁止**在正文写与之矛盾的评分；后续应统一移除或改为真实数据

### 4.6 Sitemap

- Wan 聚合页 `priority` **高于** 子页（如 `0.85` vs `0.8`），见 `server/routes/sitemap.xml.js`  
- 7 视频 URL + 2 图像 URL + `/home/wan` 均已收录

### 4.7 llms.txt（GEO 站点索引）

- 路径：`public/llms.txt` → `https://fuseaitools.com/llms.txt`  
- Wan 区块：`## Video — Wan 2.6 & 2.7`，含 Overview + 7 视频 + 2 图像链接  
- 维护规则：新增工作流时追加一行；URL 与 canonical 一致；不写 `/api/` 或需登录 URL

---

## 5. AEO 规范（可被 AI 摘录）

### 5.1 定义段（Features 之前）

```text
[H2] What is Wan 2.6 Text to Video?
[P]  Wan 2.6 Text to Video on FuseAITools turns a text prompt into a short MP4 clip.
     It supports 5, 10, or 15 second duration, 720p or 1080p, and single or multi-shot composition.
```

要求：首句直接回答；数字与 `WanTool.vue` / API 一致。

### 5.2 标题层级

- 工具区承担逻辑 **H1**；SEO 区一律 **H2**（如 `FAQ (Wan 2.7)`、`Wan 2.6 Technical Specs`）

### 5.3 FAQ

| 规则 | Wan 示例 |
|------|----------|
| 问法 | `How does Wan 2.6 video-to-video differ from Wan 2.7 R2V?`（无 `1.` 编号） |
| 数量 | 4 条左右：2 专属 + 2 通用（GPU、credits、pricing） |
| 答案 | 首句 Yes/No 或结论 + `<strong>` 数字 |
| JSON-LD | `useToolSeoFaqSchema(computed(() => [...workflowFaqs, ...commonFaq]))` |

### 5.4 对比表 & 能力简表

- **对比表**：如 `Wan 2.7 vs Wan 2.6` 或 `Wan 2.6 vs Traditional text-to-video`  
- **能力简表**：Technical specs 内一张表，列 Workflow / Input / Duration / Resolution / Key controls

### 5.5 实体命名（GEO）

| 统一写法 | 避免 |
|----------|------|
| Wan 2.6 / Wan 2.7 | 混用 v2.7 与 2.7 且无说明 |
| Wan 2.6 Video to Video | 把 2.6 V2V 写成 R2V（R2V 是 2.7 工作流） |
| FuseAITools | Fuse AI Tool、域名混写 |
| 20 free credits | 77 credits（已废弃） |
| Text to Video / Image to Video | 仅写 T2V 不解释 |

四处一致：**meta、SEO 区块、`toolOverviews.wan`、Footer / llms.txt**。

---

## 6. GEO 规范（生成式引擎可信引用）

### 6.1 事实来源优先级

1. `components/tools/WanTool.vue`（提交 body、校验、model 名）  
2. `data/toolOverviews.js` → `wan.sections[Core capabilities]`  
3. `docs/PRICING_MAPPING.md` / `priceFromApi.modelKey`  
4. 有依据的 benchmark（须标注来源）

**Wan 易错点（写作时核对）**：

| 工作流 | 勿写错 |
|--------|--------|
| 2.6 Video to Video | 非「双主体 R2V」；是上传视频 + prompt 变换；15s UI → API 10s |
| 2.7 R2V | 参考图+视频合计 **≤5**；有 first frame 时不传 aspectRatio |
| 2.7 Video Edit | duration **0 或 2–10s**，非 30s |

### 6.2 减少跨页重复

- **7 个子页**禁止相同 SEO 正文  
- 共享：定位、features 网格、对比表框架、commonFaq  
- 独有：导语、定义段、专属 FAQ、meta description

### 6.3 可引用块类型

Definition → Capability table → FAQ → vs table → Workflow grid（Wan 均已实现于视频 7 页）

### 6.4 聚合页与子页分工

| 页面 | 回答的问题 |
|------|------------|
| `/home/wan` | What is Wan on FuseAITools？有哪些 2.6/2.7 模式？如何选型？ |
| `/home/wan/v2-7-video-edit` | How to use Wan 2.7 Video Edit？参数、时长、价格？ |

聚合页 **链出** 子页（features 卡片）；子页通过 **工作流网格** 互链，回聚合页为可选（Footer / 品牌 hub）。

---

## 7. HTML / Schema 组件约定

### 7.1 根节点（Wan）

```html
<div id="wan-26-section" class="wan-seo seo-content" itemscope itemtype="https://schema.org/SoftwareApplication">
<!-- 2.7 使用 id="wan-27-section" -->
```

### 7.2 工作流卡片

```vue
<NuxtLink
  :to="item.path"
  class="model-mode-card"
  :class="{ 'model-mode-card--current': isCurrentMode(item.path) }"
  @click.prevent="handleModeClick(item.path)"
/>
```

- `watchRouteScroll` 过滤当前版本路径（2.6 与 2.7 分开）  
- 跨版本链接用 `navigateToToolTop('/home/wan/v2-7-text-to-video')`，**不要** `#wan-27-section`

### 7.3 样式

- 仅使用 `assets/css/tool-seo-content.css`  
- 不要为 Wan 单独做橙/蓝品牌色主题

---

## 8. 全站商业文案常量

| 项 | 当前约定 |
|----|----------|
| 新用户赠送 | **20 free credits** on sign-up |
| 定价链接 | `/pricing`（`seo-pricing-link`） |
| 首页链接 | `/`（`seo-inline-link`） |
| 语言 | 正文英文 |

---

## 9. Wan 参考实现（7 视频子页 + 聚合页）

> 新品牌（如 HappyHorse）可按本节对齐；多版本品牌按 2.6/2.7 方式拆 `*SeoContent.vue`。

### 9.1 页面与文件映射

| 路由 | 页面文件 | SEO 组件 | `priceFromApi.modelKey` |
|------|----------|----------|-------------------------|
| `/home/wan` | `wan.vue` → `ToolOverview` | —（`toolOverviews.wan`） | — |
| `/home/wan/text-to-video` | `text-to-video.vue` | `Wan26VideoSeoContent` | `wan-2-6-text-to-video` |
| `/home/wan/image-to-video` | `image-to-video.vue` | `Wan26VideoSeoContent` | `wan-2-6-image-to-video` |
| `/home/wan/video-to-video` | `video-to-video.vue` | `Wan26VideoSeoContent` | `wan-2-6-video-to-video` |
| `/home/wan/v2-7-text-to-video` | `v2-7-text-to-video.vue` | `Wan27VideoSeoContent` | `wan-2-7-text-to-video` |
| `/home/wan/v2-7-image-to-video` | `v2-7-image-to-video.vue` | `Wan27VideoSeoContent` | `wan-2-7-image-to-video` |
| `/home/wan/v2-7-video-edit` | `v2-7-video-edit.vue` | `Wan27VideoSeoContent` | `wan-2-7-video-edit` |
| `/home/wan/v2-7-r2v` | `v2-7-r2v.vue` | `Wan27VideoSeoContent` | `wan-2-7-r2v` |

**相关文件**：

- `components/tools/WanTool.vue` — 事实源  
- `composables/useToolSeoFaqSchema.js` — FAQ JSON-LD  
- `composables/useToolSeoPageScroll.js` — 回顶与路由滚动  
- `public/llms.txt` — `## Video — Wan 2.6 & 2.7`

**范围外（可选扩展）**：`/home/wan/2-7-image`、`2-7-image-pro` 仅有 `useToolSEOAsync`，无底部 `*SeoContent`；若需与视频 7 页同级，另建 `Wan27ImageSeoContent` 或合并进图像专用组件。

### 9.2 与 API 对齐的参数（写作核对表）

**Wan 2.6 视频（model `wan-2-6-*`）**

| 工作流 | API model | 关键约束 |
|--------|-----------|----------|
| Text to Video | `wan-2-6-text-to-video` | prompt；duration 5/10/15s；720p/1080p；`multiShots` |
| Image to Video | `wan-2-6-image-to-video` | `imageUrls` + prompt；同上 duration/resolution/multiShots |
| Video to Video | `wan-2-6-video-to-video` | `videoUrls` + prompt；duration 5/10s（UI 15 → API 10）；720p/1080p；`multiShots` |

**Wan 2.7 视频**

| 工作流 | API model | 关键约束 |
|--------|-----------|----------|
| Text to Video | `wan-2-7-text-to-video` | prompt 3–5000；duration 2–15s；720p/1080p；ratio 16:9/9:16/1:1/4:3/3:4；可选 negative/audio |
| Image to Video | `wan-2-7-image-to-video` | prompt 3–5000；≥1：first/last frame、clip、driving audio；2–15s |
| Video Edit | `wan-2-7-videoedit` | `videoUrl` + prompt；duration 0 或 2–10s；audioSetting auto/origin |
| R2V | `wan-2-7-r2v` | prompt；reference 图+视频合计 ≤5；duration 2–10s；有 firstFrame 时不传 aspectRatio |

### 9.3 聚合页 `toolOverviews.wan` 结构（示例）

```javascript
// 结构示意 — 以仓库内实文件为准
wan: {
  title: 'Wan',
  intro: '… 2.6 vs 2.7 … FuseAITools … 20 free credits …',
  features: [
    { name: 'Wan 2.6 Text to Video', path: '/home/wan/text-to-video', description: '…' },
    // … 共 9 项（含 2 图像 + 7 视频）
  ],
  sections: [
    { title: 'Core capabilities', content: '… 2.7 image + 2.6 三路 + 2.7 四路 API 摘要 …' },
    { title: 'Workflow', content: '… 如何选 2.6 / 2.7 …' },
    { title: 'Try Wan on FuseAITools', content: '…' }
  ]
}
```

### 9.4 实施自检（Wan 视频 7 页 + 聚合）

**子页（7 视频）**

- [x] `workflowIntroMap` + `workflowDefinitionMap` 按路由  
- [x] 每页独立 `useToolSEOAsync` description / keywords  
- [x] SEO 正文与 `WanTool.vue` 一致（含 V2V 15s→10s、R2V ≤5）  
- [x] FAQ 自然问句 + 每页 ≥2 条专属 FAQ  
- [x] `useToolSeoFaqSchema` + FAQ microdata  
- [x] Technical specs + 能力简表  
- [x] `useToolSeoPageScroll` 工作流卡片回顶  
- [x] 分版本 SEO 组件（26 / 27）  

**聚合页 `/home/wan`**

- [x] intro + 9 features 路径正确、命名带版本  
- [x] sections 精简为 3 段，与子页 meta 不重复  
- [x] canonical → `/home/wan`  

**待全站处理（非 Wan 独有）**

- [ ] `useToolSEO.js` 中 `aggregateRating` 移除或改为真实数据  
- [ ] 图像 2 页是否补 `*SeoContent`（产品排期）  

---

## 10. HappyHorse 对齐清单（以 Wan 为对照）

HappyHorse 四视频子页 + `/home/happy-horse` 聚合页，按 §3、§9 同一标准实施。

### 10.1 涉及文件

- `pages/home/happy-horse/v1-*.vue`（4 子页）  
- `pages/home/happy-horse.vue`  
- `components/tools/HappyHorseV1SeoContent.vue`  
- `components/tools/HappyHorseTool.vue`  
- `data/toolOverviews.js` → `happy-horse`

### 10.2 API 参数（写作核对）

| 模式 | modelKey | 关键约束 |
|------|----------|----------|
| Text to Video | `happyhorse-text-to-video` | prompt 必填；720p/1080p；ratio 多种；duration 3–15s |
| Image to Video | `happyhorse-image-to-video` | **1** 张图；prompt 可选；duration 3–15s |
| Reference to Video | `happyhorse-reference-to-video` | prompt；**1–9** 参考图；character1/2/3 |
| Video Edit | `happyhorse-video-edit` | prompt + video；参考图 0–5；audio auto/origin |

### 10.3 实施自检（HappyHorse v1 四子页 + 聚合，对齐 Wan §9.4）

**子页（4 视频工作流）**

- [x] `workflowIntroMap` + `workflowDefinitionMap` 按路由  
- [x] 每页独立 `useToolSEOAsync` description / keywords  
- [x] SEO 正文与 `HappyHorseTool.vue` 一致（720p/1080p、无 480P）  
- [x] FAQ 自然问句 + 每页 ≥2 条专属 FAQ  
- [x] `useToolSeoFaqSchema` + FAQ microdata  
- [x] Technical specs + 四模式能力简表  
- [x] `useToolSeoPageScroll` 工作流卡片回顶  
- [x] 移除虚假 `review-score` / 与 head 矛盾的评分文案  

**聚合页 `/home/happy-horse`**

- [x] intro + 4 features 路径与命名带 `HappyHorse v1`  
- [x] sections 3 段（Core capabilities / Workflow / Try on FuseAITools）  
- [x] 与子页 meta 不重复  

**组件**：`components/tools/HappyHorseV1SeoContent.vue`

---

## 11. Seedance 对齐清单（以 Wan 为对照）

Seedance 八视频子页 + `/home/seedance` 聚合页，按 §3、§9 同一标准实施。

### 11.1 涉及文件

- `pages/home/seedance/*.vue`（8 子页）  
- `pages/home/seedance.vue`  
- `components/tools/SeedanceV1LiteProSeoContent.vue`（v1 Lite/Pro 五页）  
- `components/tools/SeedanceV15SeoContent.vue`（v1-5-pro）  
- `components/tools/SeedanceV2SeoContent.vue`（v2-fast / v2）  
- `components/tools/SeedanceTool.vue`  
- `data/toolOverviews.js` → `seedance`

### 11.2 API 参数（写作核对）

| 模式 | modelKey | 关键约束 |
|------|----------|----------|
| v1 Lite T2V | `seedance-v1-lite-text-to-video` | prompt ≤10k；480p–1080p；5s/10s；ratio 16:9–9:21；camera/seed/safety |
| v1 Lite I2V | `seedance-v1-lite-image-to-video` | 1 图 + prompt；可选 endImage；5s/10s |
| v1 Pro T2V | `seedance-v1-pro-text-to-video` | 同 Lite + **21:9** |
| v1 Pro I2V | `seedance-v1-pro-image-to-video` | 1 图 + prompt；camera/seed/safety |
| v1 Pro Fast I2V | `seedance-v1-pro-fast-image-to-video` | **720p/1080p only**；无 camera/seed/safety |
| v1.5 Pro | `seedance-1.5-pro` | prompt 3–2500；0–2 图；4/8/12s；fixedLens；generateAudio |
| Seedance 2 Fast | `seedance-2-fast` | prompt ≤20k；首尾帧；≤9 图；≤3 视频；≤3 音频；4–15s；480p/720p；webSearch |
| Seedance 2 | `seedance-2` | 同 2 Fast；参考视频 ≤**5** |

### 11.3 实施自检（Seedance 八子页 + 聚合，对齐 Wan §9.4）

**子页（8 工作流）**

- [x] `workflowIntroMap` + `workflowDefinitionMap` 按路由  
- [x] 每页独立 `useToolSEOAsync` description / keywords  
- [x] SEO 正文与 `SeedanceTool.vue` 一致  
- [x] FAQ 自然问句 + 每页 ≥2 条专属 FAQ  
- [x] `useToolSeoFaqSchema` + FAQ microdata  
- [x] Technical specs + 能力简表  
- [x] `useToolSeoPageScroll` 工作流卡片回顶  
- [x] 无虚假 review-score  

**聚合页 `/home/seedance`**

- [x] intro + 8 features 命名带版本前缀  
- [x] sections 3 段（Core capabilities / Workflow / Try on FuseAITools）  
- [x] 与子页 meta 不重复  

**组件**：`SeedanceV1LiteProSeoContent.vue` / `SeedanceV15SeoContent.vue` / `SeedanceV2SeoContent.vue`

**ByteDance 呼应（与 §12 Seedream）**：各 `Seedance*SeoContent.vue` 底部 `upgrade-tip` 链到 Seedream T2I/I2I；`SeedanceTool.vue` 头部简介提及 Seedream。

---

## 12. Seedream 对齐清单（以 Wan / Seedance 为对照）

Seedream 两图像子页 + `/home/seedream` 聚合页，按 §3 同一标准实施；与 §11 Seedance 形成 ByteDance 图像↔视频互链。

### 12.1 涉及文件

- `pages/home/seedream/*.vue`（2 子页）  
- `pages/home/seedream.vue`  
- `components/tools/Seedream5LiteSeoContent.vue`  
- `components/tools/SeedreamTool.vue`  
- `data/toolOverviews.js` → `seedream`

### 12.2 API 参数（写作核对）

| 模式 | modelKey | 关键约束 |
|------|----------|----------|
| 5 Lite Text to Image | `seedream-5-lite-text-to-image` | prompt ≤2995；aspectRatio 九档；quality basic/high（2K/3K） |
| 5 Lite Image to Image | `seedream-5-lite-image-to-image` | 1–5 图 + prompt ≤2996；同上 ratio/quality |

### 12.3 实施自检（Seedream 两子页 + 聚合）

**子页（2 工作流）**

- [x] `workflowIntroMap` + `workflowDefinitionMap` 按路由  
- [x] 每页独立 `useToolSEOAsync` description / keywords  
- [x] SEO 正文与 `SeedreamTool.vue` 一致  
- [x] FAQ + `useToolSeoFaqSchema`  
- [x] Technical specs + 两模式能力简表  
- [x] `useToolSeoPageScroll` 工作流卡片回顶  
- [x] 底部 **ByteDance video companion — Seedance** 互链  

**聚合页 `/home/seedream`**

- [x] intro + 2 features 命名带 `Seedream 5 Lite`  
- [x] sections 3 段  
- [x] Workflow 段提及 Seedance 配对  

**组件**：`components/tools/Seedream5LiteSeoContent.vue`

---

## 13. Agent 修改工作流（执行顺序）

1. **读** `WanTool.vue`（或目标 `*Tool.vue`）+ `toolOverviews['wan']` + 本文 §9  
2. **改** `useToolSEOAsync`（各子页；聚合页改 `toolOverviews` + 确认 `ToolOverview` head）  
3. **改** `Wan26/27VideoSeoContent.vue`（或新建 `*SeoContent.vue`，按 §3 区块顺序、英文）  
4. **接** `useToolSeoFaqSchema(faqItems)`  
5. **改** `public/llms.txt` 对应 `##` 区块  
6. **检查** sitemap / prerender、Footer 内链、`useToolSeoPageScroll`  
7. **不要** 改 `tool-seo-content.css` 除非用户要求统一样式  

---

## 14. 质量自检表（PR 前）

### 单个子页（以 Wan 视频页为基准）

- [ ] title / description / canonical 唯一且英文  
- [ ] 有 `workflowIntro` + `workflowDefinition`（What is …）  
- [ ] FAQ ≥ 4，问句自然，含 20 credits / pricing 一致  
- [ ] 能力简表 / 对比表数字与 `*Tool.vue` 一致  
- [ ] 工作流卡片 `@click.prevent="handleModeClick"` 回顶  
- [ ] 无中文残留（除非明确要求）  
- [ ] 无 `#hash` 滚到 SEO 区  

### 聚合页

- [ ] intro + features 链到正确 path  
- [ ] 与子页 meta **不完全相同**  
- [ ] canonical 指向 `/home/{brand}`  
- [ ] sections 建议 ≤4 段，含 Core capabilities + Workflow + Try on FuseAITools  

### 全品牌

- [ ] 品牌名、版本、积分文案一致  
- [ ] JSON-LD 无矛盾 rating  
- [ ] `public/llms.txt` 已更新  

---

## 15. 附录：英文句式模板（Wan）

### Definition

> **Wan 2.7 Video Edit** on FuseAITools edits an uploaded video with natural-language instructions. Required: **video URL + prompt (3–5000 chars)**. Set duration to **0 (auto) or 2–10 seconds** at **720p/1080p**.

### FAQ answer

> Yes. Wan 2.6 video-to-video **transforms one uploaded clip** with a prompt (5/10s output). Wan 2.7 **R2V** combines up to **5** reference images/videos for ensemble scenes. See our [pricing](/pricing) for credit costs.

### Upgrade tip（跨版本）

> Want director-level control? Try [Wan 2.7 →](/home/wan/v2-7-text-to-video) for natural-language video edit, up to 5 references (R2V), and finer prompt controls.

### 聚合 intro（一句式）

> Wan on FuseAITools is Alibaba's multimodal suite for image and video: Wan 2.6 for fast multi-shot clips, Wan 2.7 for edit and multi-reference R2V—plus Wan 2.7 Image / Image Pro. New users receive **20 free credits** on sign-up.

---

**文档版本**：1.1  
**最后更新**：2026-05-20  
**维护**：Wan 7 视频 + 聚合页为参考实现；HappyHorse §10、Seedance §11、Seedream §12 对齐；Seedance ↔ Seedream 底部互链保持同步。路由/计费变更时同步 §9.2、`PRICING_MAPPING.md`、`llms.txt`。
