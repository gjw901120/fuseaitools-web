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
| 底部 SEO | `Wan26VideoSeoContent.vue`（2.6 三路）/ `Wan27VideoSeoContent.vue`（2.7 四路）/ `Wan27ImageSeoContent.vue`（2.7 图像两页） | 长文、FAQ、对比、工作流卡片 |
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
11. **（多版本品牌）** 版本对比表 — 见 §3.3.3，放在 Workflow grid **之后**  
12. Pricing tip（20 free credits → `/pricing`）  
13. **（多版本品牌）** 向上版本 `upgrade-tip` — 见 §3.3.2；单版本品牌可保留跨版本引导（如 Wan 2.6 ↔ 2.7）

**多版本品牌**：按 **§3.3** 以版本为维度拆分 `*SeoContent.vue`；同版本内工作流共用一个组件，禁止把所有版本塞进单一 SEO 组件。

### 3.2 聚合页 `/home/wan`（示例）

对应 `toolOverviews.wan`：

| 字段 | 要求（Wan 已实现） |
|------|-------------------|
| `title` | `Wan`（与全站称呼一致） |
| `intro` | 1 段：2.6 / 2.7 分工 + 图像能力一句 + FuseAITools + **20 free credits** |
| `features[]` | 9 项：2 图像 + **7 视频**；`name` 带版本前缀（如 `Wan 2.6 Text to Video`）；`description` 与子页不矛盾 |
| `sections[]` | **3 段**：`Core capabilities`、`Workflow`、`Try Wan on FuseAITools`（勿堆 8+ 段重复子页） |

聚合页 title/description 覆盖 **品牌总览词**；子页覆盖 **工作流长尾词**（如 `Wan 2.7 R2V`），禁止与子页 meta 完全相同。

### 3.3 多版本品牌：按版本拆分 SEO 组件与向上互链

**适用**：同一品牌下存在 **2 个及以上主版本梯队**（如 Seedance v1 / 1.5 / 2，Kling v2.5 / 2.6 / 3.0）。Wan 2.6 / 2.7 为 **双主版本** 但共用表单切换，仍各用一个 `*SeoContent.vue`；**三条以上版本梯队** 或 **独立产品线** 时，必须完整遵循本节。

#### 3.3.1 组件拆分（版本为维度）

| 原则 | 说明 |
|------|------|
| **一版本一组件** | 每个主版本档一个 `{Brand}{Version}SeoContent.vue`（如 `KlingV26SeoContent.vue`），该版本下所有工作流子页共用 |
| **路由差异化** | 组件内用 `workflowIntroMap` / `workflowDefinitionMap` / `workflowFaqMap` 按 `route.path` 区分工作流 |
| **禁止单体混版** | 不要用一个 `KlingSeoContent.vue` 承载 v2.5–3.0 全部正文；GEO 会判重复且无法做分层互链 |
| **独立产品线** | 与主版本梯队 **不同能力模型** 的工作流（如 Kling AI Avatar）单独一个 `*SeoContent.vue`，不进版本对比梯队 |
| **页面接线** | `pages/home/{brand}/*.vue` 的 `#below-main` 引入 **该子页所属版本** 的 SEO 组件 |

**参考实现**：

| 品牌 | SEO 组件 | 覆盖子页 |
|------|----------|----------|
| Seedance | `SeedanceV1LiteProSeoContent` / `SeedanceV15SeoContent` / `SeedanceV2SeoContent` | v1 五页 / 1.5 Pro / 2 Fast & 2 |
| Kling | `KlingV25TurboSeoContent` / `KlingV26SeoContent` / `KlingV30SeoContent` / `KlingAiAvatarSeoContent` | v2.5 两页 / 2.6 三页 / 3.0 两页 / Avatar 两页 |
| Flux Kontext | `FluxKontextV1SeoContent` / `FluxKontextV2SeoContent` | generate 一页 / Flux 2 四页 |

#### 3.3.2 向上互链（只链高版本，不回链低版本）

底部用 **`upgrade-tip`** + `navigateToToolTop('/home/...')` 引导升级；**低版本 → 高版本**，最高档 **不再链更低版本**。

| 当前版本档 | 底部 `upgrade-tip` 链向 | 禁止 |
|------------|-------------------------|------|
| **入门档**（如 v2.5） | 所有更高档（如 2.6 + 3.0 Video） | — |
| **中间档**（如 2.6） | 更高档（如 3.0 Video + 3.0 Motion Control） | 不回链 v2.5 |
| **最高档**（如 3.0） | 仅 **pricing**；可选 **独立产品线关联**（见下） | 不回链 2.6 / v2.5 |
| **独立产品线**（如 AI Avatar） | 互补场景的高版本能力 + 上下游工具（如 3.0 Video、ElevenLabs TTS） | 不写入版本梯队对比表 |

**独立产品线 vs 版本对比**：

- **版本对比表**：仅用于 **同一梯队** 内的版本选型（如 v2.5 vs 2.6 vs 3.0）。
- **产品线关联**：最高档 → 独立产品线时，**只用 `upgrade-tip` 文案 + 内链**，**不在最高档页放对比表**（Kling 3.0 → AI Avatar 为关联，非对比）。
- 独立产品线页 **可以** 放与最高档的对比表（如 Avatar 页「AI Avatar vs 3.0 Video」），帮助用户理解分工。

**文案句式**（英文正文）：

```text
🔊 Need generated sound or motion control?
Try [Kling 2.6 →](/home/kling/v2-6-text-to-video) for optional audio on T2V/I2V plus reference-video Motion Control.
```

每条 `upgrade-tip` 说明 **升级后多什么能力**，并链到具体工作流 path，不要只链聚合页。

#### 3.3.3 版本对比表（Workflow grid 之后）

多版本品牌在 **Workflow grid 下方**、**Pricing tip 上方** 增加版本对比表，范围随当前档 **向上收窄**：

| 当前版本档 | 对比表标题 | 列 |
|------------|------------|-----|
| 入门档 | `📊 {Brand} 2.5 vs 2.6 vs 3.0`（示例） | 当前档 + 所有更高档 |
| 中间档 | `📊 {Brand} 2.6 vs 3.0` | 当前档 + 更高档 |
| 最高档 | **无版本对比表** | — |
| 独立产品线 | 可与最高档场景生成对比（可选） | 产品线 vs 最高档 Video |

对比维度建议 6–8 行：**Positioning / Workflows / Duration / Generated sound / Motion control（如有）/ Unique controls / Best for**。数字须与 `*Tool.vue`、`PRICING_MAPPING.md` 一致。

同版本 **工作流之间** 的对比（如 v2.5 T2V vs I2V）仍放在 FAQ 之前的常规 `compare-heading` 区块，与 §3.3.3 的版本对比 **并存、不合并**。

#### 3.3.4 区块顺序（多版本子页）

在 §3.1 顺序基础上，多版本品牌固定为：

1. …（至 Workflow grid）  
2. **版本对比表**（§3.3.3，按档决定是否展示）  
3. Pricing tip  
4. **向上版本 `upgrade-tip`**（§3.3.2，一条或多条）  
5. 跨品牌互链（ElevenLabs、Seedance 等，按品牌清单）

#### 3.3.5 Agent 实施清单（多版本新品牌）

- [ ] 列出版本梯队与独立产品线，确定几个 `*SeoContent.vue`  
- [ ] 每个组件：`workflow*Map` 仅含本版本 routes；`watchRouteScroll` 匹配本版本 path 前缀  
- [ ] 各子页 `#below-main` 引入对应版本组件  
- [ ] 入门/中间档：Workflow grid 后补版本对比表 + 向上 `upgrade-tip`  
- [ ] 最高档：无版本对比；仅 pricing +（可选）独立产品线关联  
- [ ] 删除或废弃单体 `{Brand}SeoContent.vue`，grep 确认无残留引用  
- [ ] 品牌对齐清单（§11–§15）引用本节，不写重复规则  

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
| `/home/wan/2-7-image` | `2-7-image.vue` | `Wan27ImageSeoContent` | `wan-2-7-image` |
| `/home/wan/2-7-image-pro` | `2-7-image-pro.vue` | `Wan27ImageSeoContent` | `wan-2-7-image-pro` |

**相关文件**：

- `components/tools/WanTool.vue` — 事实源  
- `components/tools/Wan27ImageSeoContent.vue` — 2.7 图像两页  
- `composables/useToolSeoFaqSchema.js` — FAQ JSON-LD  
- `composables/useToolSeoPageScroll.js` — 回顶与路由滚动  
- `public/llms.txt` — `## Video — Wan 2.6 & 2.7`

**Wan image ↔ video 互链**：`Wan27ImageSeoContent` 链到 2.7/2.6 视频；`Wan26/27VideoSeoContent` 链到 2.7 Image / Image Pro；`WanTool.vue` 按 image/video 模式切换简介。

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

**Wan 2.7 图像**

| 工作流 | API model | 关键约束 |
|--------|-----------|----------|
| Image | `wan-2-7-image` | prompt 1–5000；inputUrls 0–9；无 input 时 aspectRatio 八档；1K/2K；n 1–4（sequential 时 1–12） |
| Image Pro | `wan-2-7-image-pro` | 同 Image；**4K** 仅无 input 且 sequential off |

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
- [x] 图像 2 页已补 `Wan27ImageSeoContent` + 与视频页互链  

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

**多版本规则**：组件拆分与向上互链见 **§3.3**（Seedance 为分组件参考实现；底部互链含跨版本 browse，新品牌优先只链高版本）。

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

## 13. Suno 对齐清单（以 HappyHorse 为对照）

Suno 六音频子页 + `/home/suno` 聚合页，按 §3 同一标准实施。

### 13.1 涉及文件

- `pages/home/suno/*.vue`（6 子页）  
- `pages/home/suno.vue`  
- `components/tools/SunoSeoContent.vue`  
- `components/tools/SunoTool.vue`  
- `data/toolOverviews.js` → `suno`

### 13.2 API 参数（写作核对）

| 工作流 | modelKey | 关键约束 |
|------|----------|----------|
| Music Generation | `suno_generate` | prompt；Simple 500 / Custom 3k–5k；customMode；instrumental；V3_5–V5 |
| Music Extension | `suno_extend` | audioId（generate 任务）；defaultParamFlag；continueAt |
| Audio Cover | `suno_upload_cover` | fileUrl ≤2 min；style/title；customMode |
| Audio Expansion | `suno_upload_extend` | fileUrl ≤2 min；expandDefaultParamFlag；continueAt |
| Accompaniment | `suno_add_instrumental` | fileUrl + title + tags + negativeTags（无 prompt） |
| Vocal Generation | `suno_add_vocals` | fileUrl + prompt ≤5000 + title/style/negativeTags |

### 13.3 实施自检（Suno 六子页 + 聚合）

**子页（6 工作流）**

- [x] `workflowIntroMap` + `workflowDefinitionMap` 按路由  
- [x] 每页独立 `useToolSEOAsync` description / keywords  
- [x] SEO 正文与 `SunoTool.vue` 一致  
- [x] FAQ + `useToolSeoFaqSchema`  
- [x] Technical specs + 六模式能力简表  
- [x] `useToolSeoPageScroll` 工作流卡片回顶  
- [x] 底部 Suno pipeline 内链（generate → extend → vocals/accompaniment）  

**聚合页 `/home/suno`**

- [x] intro + 6 features 命名带 `Suno` 前缀  
- [x] sections 3 段  
- [x] 与子页 meta 不重复  

**组件**：`components/tools/SunoSeoContent.vue`

---

## 14. ElevenLabs 对齐清单（以 Suno 为对照）

ElevenLabs 五音频子页 + `/home/elevenlabs` 聚合页，按 §3 同一标准实施。

### 14.1 涉及文件

- `pages/home/elevenlabs/*.vue`（5 子页）  
- `pages/home/elevenlabs.vue`  
- `components/tools/ElevenLabsSeoContent.vue`  
- `components/tools/ElevenLabsTool.vue`  
- `data/toolOverviews.js` → `elevenlabs`

### 14.2 API 参数（写作核对）

| 工作流 | modelKey | 关键约束 |
|------|----------|----------|
| Multilingual v2 TTS | `elevenlabs_text_to_speech_multilingual` | voice + text ≤5000；stability/similarity/style/speed；optional timestamps, context, language_code |
| Turbo 2.5 TTS | `elevenlabs_text_to_speech_turbo` | 同 Multilingual v2 参数集 |
| Speech-to-Text | `elevenlabs_speech_to_text` | audioUrl ≤200MB；language auto/ISO；diarize；tagAudioEvents |
| Sound Effect v2 | `elevenlabs_sound_effect` | text ≤5000；duration 0.5–22s；loop；promptInfluence |
| AI Audio Isolation | `elevenlabs_audio_isolation` | audioUrl ≤10MB |

### 14.3 实施自检（ElevenLabs 五子页 + 聚合）

**子页（5 工作流）**

- [x] `workflowIntroMap` + `workflowDefinitionMap` 按路由  
- [x] 每页独立 `useToolSEOAsync` description / keywords  
- [x] SEO 正文与 `ElevenLabsTool.vue` 一致  
- [x] FAQ + `useToolSeoFaqSchema`  
- [x] Technical specs + 五模式能力简表  
- [x] `useToolSeoPageScroll` 工作流卡片回顶  
- [x] 底部 ElevenLabs pipeline 内链 + Suno 音乐互链  

**聚合页 `/home/elevenlabs`**

- [x] intro + 5 features 命名带 `ElevenLabs` 前缀  
- [x] sections 3 段  
- [x] 与子页 meta 不重复  

**组件**：`components/tools/ElevenLabsSeoContent.vue`

---

## 15. Kling 对齐清单（以 Suno / ElevenLabs 为对照）

Kling 九视频子页 + `/home/kling` 聚合页，按 §3 同一标准实施。

### 15.1 涉及文件

- `pages/home/kling/*.vue`（9 子页）  
- `pages/home/kling.vue`  
- `components/tools/KlingV25TurboSeoContent.vue`（v2.5 Turbo T2V/I2V Pro 两页）
- `components/tools/KlingV26SeoContent.vue`（2.6 T2V/I2V/Motion Control 三页）
- `components/tools/KlingV30SeoContent.vue`（3.0 Video / 3.0 Motion Control 两页）
- `components/tools/KlingAiAvatarSeoContent.vue`（AI Avatar Standard/Pro 两页）
- `components/tools/KlingTool.vue`  
- `data/toolOverviews.js` → `kling`

### 15.2 API 参数（写作核对）

| 工作流 | modelKey | 关键约束 |
|------|----------|----------|
| v2.5 Turbo I2V Pro | `kling-v2-5-turbo-image-to-video-pro` | image + prompt ≤2500；optional tail；duration 5/10；CFG；negative prompt |
| v2.5 Turbo T2V Pro | `kling-v2-5-turbo-text-to-video-pro` | prompt ≤2500；aspect 16:9/9:16/1:1；duration 5/10 |
| 2.6 Text to Video | `kling-2.6-text-to-video` | prompt；sound；aspect；duration 5/10 |
| 2.6 Image to Video | `kling-2.6-image-to-video` | image + prompt；sound；duration 5/10 |
| 2.6 Motion Control | `kling-2.6-motion-control` | reference image + video；orientation；720p/1080p |
| 3.0 Motion Control | `kling-3.0-motion-control` | reference image + video；std/pro；background_source |
| AI Avatar Standard | `kling-ai-avatar-standard` | avatar image + audio + prompt ≤5000 |
| AI Avatar Pro | `kling-ai-avatar-pro` | 同上 |
| 3.0 Video | `kling-3.0-video` | single/multi-shot；total 3–15s；std/pro；optional frames/elements |

### 15.3 实施自检（Kling 九子页 + 聚合）

**子页（9 工作流）**

- [x] `workflowIntroMap` + `workflowDefinitionMap` 按路由  
- [x] 每页独立 `useToolSEOAsync` description / keywords  
- [x] SEO 正文与 `KlingTool.vue` 一致  
- [x] FAQ + `useToolSeoFaqSchema`  
- [x] Technical specs + 九模式能力简表  
- [x] `useToolSeoPageScroll` 工作流卡片回顶  
- [x] 底部版本互链（见下方）+ ElevenLabs 语音互链 + Seedance/Veo/HappyHorse 视频互链  

**聚合页 `/home/kling`**

- [x] intro + 9 features 命名带 `Kling` 前缀  
- [x] sections 3 段  
- [x] 与子页 meta 不重复  

**组件**：`KlingV25TurboSeoContent.vue` / `KlingV26SeoContent.vue` / `KlingV30SeoContent.vue` / `KlingAiAvatarSeoContent.vue`

**多版本规则（§3.3 实例）**：

| 版本档 | Workflow grid 后对比表 | 底部互链 |
|--------|------------------------|----------|
| v2.5 Turbo | 2.5 vs 2.6 vs 3.0 | → 2.6、→ 3.0 Video |
| 2.6 | 2.6 vs 3.0 | → 3.0 Video + 3.0 Motion Control（不回链 2.5） |
| 3.0 | 无版本对比 | pricing + → AI Avatar（**关联**，非对比） |
| AI Avatar | Avatar vs 3.0 Video（可选） | ElevenLabs TTS + → 3.0 Video |

---

## 16. Agent 修改工作流（执行顺序）

1. **读** `WanTool.vue`（或目标 `*Tool.vue`）+ `toolOverviews['wan']` + 本文 §9  
2. **若为多版本品牌**：先读 **§3.3**，列版本梯队 → 确定几个 `*SeoContent.vue` 与各页接线  
3. **改** `useToolSEOAsync`（各子页；聚合页改 `toolOverviews` + 确认 `ToolOverview` head）  
4. **改 / 新建** `*SeoContent.vue`（按 §3 区块顺序、§3.3 对比表与向上互链、英文）  
5. **接** `useToolSeoFaqSchema(faqItems)`  
6. **改** `public/llms.txt` 对应 `##` 区块  
7. **检查** sitemap / prerender、Footer 内链、`useToolSeoPageScroll`  
8. **不要** 改 `tool-seo-content.css` 除非用户要求统一样式  

---

## 17. 质量自检表（PR 前）

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

### 多版本品牌（§3.3）

- [ ] 每主版本档一个 `*SeoContent.vue`，子页 `#below-main` 接线正确  
- [ ] 入门/中间档：Workflow grid 后有版本对比表，列范围向上收窄  
- [ ] 最高档：无版本对比表；底部仅 pricing +（可选）独立产品线 **关联**  
- [ ] `upgrade-tip` **只链高版本**，中间档不回链低版本  
- [ ] 独立产品线单独组件，不进版本梯队表（可与最高档对比，仅在产品线页）  
- [ ] 无废弃 `{Brand}SeoContent.vue` 残留引用  

---

## 18. 附录：英文句式模板（Wan）

### Definition

> **Wan 2.7 Video Edit** on FuseAITools edits an uploaded video with natural-language instructions. Required: **video URL + prompt (3–5000 chars)**. Set duration to **0 (auto) or 2–10 seconds** at **720p/1080p**.

### FAQ answer

> Yes. Wan 2.6 video-to-video **transforms one uploaded clip** with a prompt (5/10s output). Wan 2.7 **R2V** combines up to **5** reference images/videos for ensemble scenes. See our [pricing](/pricing) for credit costs.

### Upgrade tip（跨版本，向上）

> Need generated sound or motion control? Try [Kling 2.6 →](/home/kling/v2-6-text-to-video) for optional audio on T2V/I2V plus reference-video Motion Control at 720p/1080p.

> Want director-level control? Try [Wan 2.7 →](/home/wan/v2-7-text-to-video) for natural-language video edit, up to 5 references (R2V), and finer prompt controls.

### Upgrade tip（最高档 → 独立产品线，关联非对比）

> Need a talking-head presenter to cut with your 3.0 scenes? Try [Kling AI Avatar Standard →](/home/kling/ai-avatar-standard) for audio-driven lip-sync.

### 聚合 intro（一句式）

> Wan on FuseAITools is Alibaba's multimodal suite for image and video: Wan 2.6 for fast multi-shot clips, Wan 2.7 for edit and multi-reference R2V—plus Wan 2.7 Image / Image Pro. New users receive **20 free credits** on sign-up.

---

## 19. Flux Kontext 对齐清单（§3.3 多版本实例）

Flux Kontext 五图像子页 + `/home/flux-kontext` 聚合页。**generate = v1**；四个 Flux 2 工作流 = **v2**（含 Pro 子档）。

### 19.1 涉及文件

- `pages/home/flux-kontext/*.vue`（5 子页）  
- `pages/home/flux-kontext.vue`  
- `components/tools/FluxKontextV1SeoContent.vue`（generate 一页）  
- `components/tools/FluxKontextV2SeoContent.vue`（Flux 2 / Pro 四页）  
- `components/tools/FluxKontextTool.vue`  
- `data/toolOverviews.js` → `flux-kontext`

### 19.2 API 参数（写作核对）

| 工作流 | modelKey | 关键约束 |
|------|----------|----------|
| Kontext Generate (Pro) | `flux_kontext_pro` | prompt；generate 或 edit（1 图）；aspect 21:9–9:16；JPEG/PNG；safety 0–6 |
| Kontext Generate (Max) | `flux_kontext_max` | 同上 |
| Flux 2 T2I | `flux-2-text-to-image` | prompt 3–5000；1K/2K；8 ratios + auto |
| Flux 2 I2I | `flux-2-image-to-image` | 1–8 图 + prompt；1K/2K |
| Flux 2 Pro T2I | `flux-2-pro-text-to-image` | 同 Flux 2 T2I，Pro 档位 |
| Flux 2 Pro I2I | `flux-2-pro-image-to-image` | 同 Flux 2 I2I，Pro 档位 |

### 19.3 实施自检

**子页（5 工作流）**

- [x] v1 / v2 分组件（§3.3.1）  
- [x] v2 四页：`workflowIntroMap` + `workflowDefinitionMap` + 专属 FAQ  
- [x] 每页独立 `useToolSEOAsync` description / keywords（含 20 free credits）  
- [x] FAQ + `useToolSeoFaqSchema`  
- [x] Technical specs + 能力简表  
- [x] `useToolSeoPageScroll` 工作流卡片回顶  
- [x] `#below-main` + 可滚动 `tool-page`  

**多版本互链（§3.3 实例）**

| 版本档 | Workflow grid 后对比表 | 底部互链 |
|--------|------------------------|----------|
| v1 Kontext | Kontext vs Flux 2 | → Flux 2 T2I / I2I / Pro |
| v2 Flux 2（标准） | Flux 2 vs Flux 2 Pro | → 对应 Pro T2I 或 Pro I2I |
| v2 Flux 2 Pro | 无版本对比 | pricing + → Seedance 视频 |

**聚合页 `/home/flux-kontext`**

- [x] intro 区分 v1 Kontext / v2 Flux 2  
- [x] features 5 项带版本前缀  
- [x] sections 3 段  

**组件**：`FluxKontextV1SeoContent.vue` / `FluxKontextV2SeoContent.vue`

---

**文档版本**：1.5  
**最后更新**：2026-05-20  
**维护**：Wan §9、HappyHorse §10、Seedance §11、Seedream §12、Suno §13、ElevenLabs §14、Kling §15、**Flux Kontext §19** 为参考实现；**多版本拆分与向上互链**见 **§3.3**。路由/计费变更时同步对应 API 表、`PRICING_MAPPING.md`、`llms.txt`。
