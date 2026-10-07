# News 文章生成规范与标准

> **本文档为 News 文章生成的唯一标准。** 所有新文章（行业应用 + 变现指南）均以本文档为准。  
> **语言**：正文、meta、Schema.org 描述 **统一英文**。  
> **目录**：`docs/news-industry-applications/`（行业应用）、`docs/news-freelancer-business/`（变现指南）。

---

## 1. 文章类型

| 类型 | 目录 | 定位 | 标题模式 |
|------|------|------|----------|
| **行业应用** | `news-industry-applications/` | 面向企业/行业，展示 AI 工具在特定行业的工作流与应用 | `From X to Y: An Industry Application Guide with {Tool} for {Industry}` |
| **变现指南** | `news-freelancer-business/` | 面向自由职业者，展示如何用 AI 工具建立可盈利的服务业务 | `Building a {Service} with {Tool} for {Role}` |

每篇文章对应一个工具 + 一个场景。每个工具可有多个场景文章。

---

## 2. 文件命名

```
news-article-{tool}-{scenario}-{type}-en.md
```

- `{tool}`: 工具名小写连写（如 `flux`、`elevenlabs`、`gpt-image`）
- `{scenario}`: 场景描述连写（如 `architectural-visualization`、`audiobook-publishing`）
- `{type}`: `industry-application` 或省略（变现类通常省略）

**示例**：
- `news-article-flux-architectural-visualization-en.md`
- `news-article-elevenlabs-audiobook-publishing-en.md`
- `news-article-gpt-image-candid-fashion-photography-en.md`

---

## 3. 文件结构（Frontmatter + Content）

```markdown
# News Article: {工具名} for {场景} — {副标题} (English)

{一段话概述文章核心内容，2-3句}

---

### title
{文章标题}

### path
`{url-slug}`

### description
{SEO 描述，120-160 字符}

### keyword
{逗号分隔的关键词，6-12个，含 FuseAI Tools}

### content
{完整 HTML 正文}
```

### 字段说明

| 字段 | 要求 |
|------|------|
| **title** | 文章标题，用于 SEO title 和列表展示 |
| **path** | URL slug，对应 `/news/[path]` 路由 |
| **description** | 120-160 字符，含工具名 + 场景 + 差异化价值 |
| **keyword** | 6-12 个关键词，含品牌名、场景词、品类词、`FuseAI Tools` |
| **content** | 完整 HTML 正文，含 `<html>/<head>/<body>` |

---

## 4. HTML 正文结构

### 4.1 整体模板

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{文章标题}</title>
    <meta name="description" content="{SEO描述，120-160字符}">
</head>
<body>
    <article class="ai-model-comparison" itemscope itemtype="https://schema.org/Article" style="background:#0b0c0f;background-image:radial-gradient(ellipse 65% 50% at 50% 0%, rgba({R},{G},{B},.07), transparent),radial-gradient(ellipse 50% 40% at 100% 90%, rgba({R},{G},{B},.05), transparent),linear-gradient(180deg, #151318, #0b0c0f);color:#e5e7eb;padding:20px;border-radius:12px;">

        <!-- 1. 引言 -->
        <section class="introduction">...</section>

        <!-- 2. 市场机会 / 工具优势 -->
        <section class="market-opportunity">...</section>

        <!-- 3. 工作流 / 服务线（2-4个） -->
        <section class="workflow">...</section>

        <!-- 4. 风险指南 -->
        <section class="pitfalls">...</section>

        <!-- 5. 行动清单 -->
        <section class="action-checklist">...</section>

        <!-- 6. FAQ（AEO） -->
        <section class="faq">...</section>

        <!-- 7. 结语 + CTA -->
        <section class="closing">...</section>

    </article>
</body>
</html>
```

### 4.2 暗色主题样式规范

所有文章使用暗色主题，**所有样式内联**。颜色方案按工具区分：

| 工具 | 主色 (RGB) | 主色 Hex | 用途 |
|------|-----------|----------|------|
| Claude | 251,113,133 | `#fb7185` | 强调文字、表头 |
| DeepSeek | 96,165,250 | `#60a5fa` | 强调文字、表头 |
| Gemini | 129,140,248 | `#818cf8` | 强调文字、表头 |
| GPT (text) | 16,185,129 | `#10b981` | 强调文字、表头 |
| ElevenLabs | 167,139,250 | `#a78bfa` | 强调文字、表头、内链 |
| Flux | 52,211,153 | `#34d399` | 强调文字、表头、内链 |
| GPT-4o Image | 244,114,182 | `#f472b6` | 强调文字、表头、内链 |
| GPT Image | 192,132,252 | `#c084fc` | 强调文字、表头、内链 |
| Grok | 96,165,250 | `#60a5fa` | 强调文字、表头、内链 |
| Hailuo | 167,139,250 | `#a78bfa` | 强调文字、表头、内链 |
| Happy Horse | 52,211,153 | `#34d399` | 强调文字、表头、内链 |
| Ideogram | 251,146,60 | `#fb923c` | 强调文字、表头、内链 |
| Imagen4 | 129,140,248 | `#818cf8` | 强调文字、表头、内链 |
| Kling | 244,114,182 | `#f472b6` | 强调文字、表头、内链 |
| Luma | 129,140,248 | `#818cf8` | 强调文字、表头、内链 |
| Nano Banana | 251,191,36 | `#fbbf24` | 强调文字、表头、内链 |
| Qwen | 96,165,250 | `#60a5fa` | 强调文字、表头、内链 |
| Runway | 52,211,153 | `#34d399` | 强调文字、表头、内链 |
| Seedance | 167,139,250 | `#a78bfa` | 强调文字、表头、内链 |
| Seedream | 129,140,248 | `#818cf8` | 强调文字、表头、内链 |
| Sora | 96,165,250 | `#60a5fa` | 强调文字、表头、内链 |
| Suno | 52,211,153 | `#34d399` | 强调文字、表头、内链 |
| Veo | 129,140,248 | `#818cf8` | 强调文字、表头、内链 |
| Wan | 96,165,250 | `#60a5fa` | 强调文字、表头、内链 |

### 4.3 内联样式速查

```html
<!-- 通用段落 -->
<p style="color:#d1d5db;">正文内容</p>

<!-- H2 标题 -->
<h2 style="color:#f9fafb;border-bottom-color:#374151;">标题</h2>

<!-- H3 标题 -->
<h3 style="color:#f3f4f6;">子标题</h3>

<!-- 强调文字（工具名、关键概念） -->
<strong style="color:{主色Hex};">强调内容</strong>

<!-- 内链 -->
<a href="https://www.fuseaitools.com/home/{tool}" style="color:{主色Hex};">链接文字</a>

<!-- 表格 -->
<table style="width:100%;border-collapse:collapse;color:#d1d5db;font-size:14px;">
  <thead>
    <tr style="background:rgba(55,65,81,0.4);">
      <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">列名</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">内容</td>
    </tr>
  </tbody>
</table>

<!-- 引用块（工作流步骤） -->
<div style="background:rgba(31,41,55,0.3);padding:16px;border-radius:8px;margin:16px 0;">
  <p style="color:{主色Hex};font-style:italic;margin-bottom:8px;">步骤内容</p>
</div>

<!-- 列表 -->
<ul style="color:#d1d5db;">
  <li style="margin-bottom:6px;"><strong style="color:{主色Hex};">标签：</strong>内容</li>
</ul>

<!-- 有序列表 -->
<ol style="color:#d1d5db;">
  <li style="margin-bottom:8px;"><strong style="color:{主色Hex};">步骤名。</strong>描述内容</li>
</ol>
```

---

## 5. SEO / AEO / GEO 三层优化（必须）

### 5.1 SEO — Meta Description

在 `<head>` 的 `<title>` 标签后添加：

```html
<meta name="description" content="{120-160字符描述}">
```

**要求**：
- 包含工具名 + 场景 + 差异化价值
- 120-160 字符
- 英文

### 5.2 AEO — FAQ 段落

在 `action-checklist` 和 `closing` 之间插入 FAQ section：

```html
<section class="faq">
    <h2 style="color:#f9fafb;border-bottom-color:#374151;">Frequently Asked Questions</h2>
    <div style="margin-bottom:16px;">
        <h3 style="color:#f3f4f6;">Q: {问题}?</h3>
        <p style="color:#d1d5db;">{回答。首句直接给出结论。}</p>
    </div>
    <!-- 4-5 个 Q&A -->
</section>
```

**FAQ 要求**：
- 4-5 个 Q&A
- 问题自然，不含编号
- 回答首句直接给出结论/答案
- 包含价格、时间、工具选择等可核实信息
- 行业应用类：关注技术可行性、成本对比、实施建议
- 变现指南类：关注定价、客户获取、质量控制、法律合规

### 5.3 GEO — Schema.org 标记

在 `<article>` 标签添加：

```html
<article class="ai-model-comparison" itemscope itemtype="https://schema.org/Article" style="...">
```

---

## 6. 内链规范

### 6.1 聚合页链接（所有文章）

每篇文章必须有：
- **首段**：工具名首次出现时链到聚合页（`/home/{tool}`）
- **文末 CTA**：`Try [Tool] on FuseAITools for [场景].`

### 6.2 子页面链接（非 Chat 工具）

对于**非 Chat 类型工具**（有 2+ 个子页面的工具），在文章 body 中自然插入**至少 5 个子页面链接**。

**子页面 URL 格式**：`https://www.fuseaitools.com/home/{tool}/{sub-page}`

**插入策略**：
1. **引言段**：在工具名后提及具体能力时链接
2. **工作流段**：在描述具体操作时链接对应子页面
3. **风险/对比表**：在推荐具体工具时链接
4. **行动清单**：在建议使用特定功能时链接

**链接样式**：`<a href="https://www.fuseaitools.com/home/{tool}/{sub-page}" style="color:{主色Hex};">{显示文字}</a>`

### 6.3 Chat 类型工具（不添加子页面链接）

以下工具为 Chat 类型，仅有聚合页链接，不添加子页面链接：
- Claude (`/home/claude`)
- DeepSeek (`/home/deepseek`)
- Gemini (`/home/gemini`)
- GPT text (`/home/gpt`)

### 6.4 各工具子页面清单

| 工具 | 子页面 |
|------|--------|
| ElevenLabs | `turbo-2-5`, `multilingual-v2`, `sound-effect-v2`, `speech-to-text`, `audio-isolation` |
| Flux | `generate`, `flux-2-text-to-image`, `flux-2-image-to-image`, `flux-2-pro-text-to-image`, `flux-2-pro-image-to-image` |
| GPT Image | `generate`, `text-to-image`, `image-to-image`, `v2-text-to-image`, `v2-image-to-image` |
| Grok | `text-to-image`, `image-to-image`, `text-to-video`, `image-to-video`, `upscale`, `extend` |
| Hailuo | `image-to-video-pro`, `image-to-video-standard` |
| Happy Horse | `v1-text-to-video`, `v1-image-to-video`, `v1-reference-to-video`, `v1-video-edit` |
| Ideogram | `generate`, `v3-text-to-image`, `v3-edit`, `v3-remix`, `v3-reframe`, `character`, `character-edit`, `character-remix` |
| Imagen4 | `imagen4-generate`, `imagen4-fast`, `imagen4-ultra` |
| Kling | `v2-5-turbo-text-to-video-pro`, `v2-5-turbo-image-to-video-pro`, `v2-6-text-to-video`, `v2-6-image-to-video`, `v2-6-motion-control`, `v3-0-video`, `v3-0-motion-control`, `ai-avatar-standard`, `ai-avatar-pro` |
| Luma | `generate` |
| Nano Banana | `generate`, `pro-generate`, `edit`, `nano-banana-2` |
| Qwen | `text-to-image`, `image-to-image`, `image-edit`, `v2-text-to-image`, `v2-image-edit`, `z-image` |
| Runway | `generate`, `extend`, `aleph` |
| Seedance | `v1-lite-text-to-video`, `v1-lite-image-to-video`, `v1-pro-text-to-video`, `v1-pro-image-to-video`, `v1-pro-fast-image-to-video`, `v1-5-pro`, `v2`, `v2-fast` |
| Seedream | `5-lite-text-to-image`, `5-lite-image-to-image` |
| Sora | `text-to-video`, `image-to-video`, `pro-text-to-video`, `pro-image-to-video`, `pro-storyboard`, `watermark-remover` |
| Suno | `generate`, `extend`, `add-vocals`, `add-instrumental`, `upload-cover`, `upload-extend` |
| Veo | `text-to-video`, `reference-to-video`, `first-and-last-to-video`, `extend` |
| Wan | `text-to-video`, `image-to-video`, `video-to-video`, `2-7-image`, `2-7-image-pro`, `v2-7-text-to-video`, `v2-7-image-to-video`, `v2-7-r2v`, `v2-7-video-edit` |

---

## 7. 文章内容结构

### 7.1 行业应用文章

```
1. Introduction（引言）
   - 行业痛点（成本、时间、规模）
   - 工具如何解决
   - 文章覆盖的工作流概述

2. Market Opportunity / Why Tool Fits（市场机会）
   - 对比表格：传统方式 vs AI方式（成本、时间、质量）
   - 市场规模数据

3. Workflow 1-4（工作流详解，每个含）
   - 场景描述
   - Workshop 示例（含引用块展示 prompt/步骤）
   - 关键技巧

4. Pitfall Guide（风险指南）
   - 风险/解决方案对比表格

5. Action Checklist（行动清单）
   - 5-6 个有序步骤

6. FAQ（常见问题，4-5 个）

7. Closing（结语 + CTA）
   - 行业变革总结
   - Try [Tool] on FuseAITools
```

### 7.2 变现指南文章

```
1. Introduction（引言）
   - 市场需求
   - 工具如何赋能自由职业者
   - 文章覆盖的服务线概述

2. Market Opportunity（市场机会）
   - 服务/市场价格/AI辅助时间 对比表格
   - 市场规模

3. Service Line 1-4（服务线详解，每个含）
   - 定价模型
   - Workshop 示例
   - 客户获取策略

4. Pitfall Guide（风险指南）
   - 风险/缓解措施 对比表格

5. Action Checklist（行动清单）
   - 5-6 个有序步骤

6. FAQ（常见问题，4-5 个）

7. Closing（结语 + CTA）
   - 商业模式总结
   - Try [Tool] on FuseAITools
```

---

## 8. 写作规范

### 8.1 语言与风格

- **语言**：英文
- **语气**：专业、直接、可操作
- **数据**：使用具体数字（价格范围、时间、百分比）
- **避免**：泛化表述（" revolutionary"、"game-changing"）、无依据的声明

### 8.2 实体命名

| 统一写法 | 避免 |
|----------|------|
| FuseAITools / FuseAITools | Fuse AI Tools、域名混写 |
| 工具全名（如 ElevenLabs Multilingual v2） | 仅写缩写不解释 |
| 价格用 `$X–$Y` 范围格式 | 单一价格点 |

### 8.3 内链锚文本

- 使用完整产品名（如 `Flux 2 Pro Text-to-Image`）
- 避免「点击这里」等泛化表述
- 文末 CTA：`Try [Tool] on FuseAITools for [场景].`

---

## 9. 完整示例

### 9.1 行业应用示例（Flux 建筑可视化，节选）

```markdown
# News Article: Flux for Architectural Visualization — From 3D Renders to AI-Generated Architectural Concepts (English)

Flux transforms architectural visualization by enabling architecture firms and real estate developers to generate concept renders, design iterations, and marketing visuals at a fraction of traditional visualization costs.

---

### title
From 3D Renders to AI Architectural Concepts: An Industry Application Guide with Flux for Architecture & Real Estate

### path
`flux-architectural-visualization-industry-application`

### description
Flux transforms architectural visualization with AI-generated concept renders, design iterations, and marketing visuals at a fraction of traditional costs. Industry guide for architecture firms and real estate developers.

### keyword
Flux, architectural visualization, AI architecture, concept rendering, real estate marketing, design visualization, architectural AI, building design, FuseAI Tools
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>From 3D Renders to AI Architectural Concepts: An Industry Application Guide with Flux for Architecture & Real Estate</title>
    <meta name="description" content="Flux transforms architectural visualization with AI-generated concept renders, design iterations, and marketing visuals at a fraction of traditional costs. Industry guide for architecture firms and real estate developers.">
</head>
<body>
    <article class="ai-model-comparison" itemscope itemtype="https://schema.org/Article" style="background:#0b0c0f;background-image:radial-gradient(ellipse 65% 50% at 50% 0%, rgba(52,211,153,.07), transparent),radial-gradient(ellipse 50% 40% at 100% 90%, rgba(16,185,129,.05), transparent),linear-gradient(180deg, #151318, #0b0c0f);color:#e5e7eb;padding:20px;border-radius:12px;">

        <section class="introduction">
            <p style="color:#d1d5db;">Architectural visualization has a cost problem. A single photorealistic 3D render costs $500–3,000 and takes 2–5 days to produce...</p>
            <p style="color:#d1d5db;"><a href="https://www.fuseaitools.com/home/flux-kontext" style="color:#34d399;">Flux</a> changes this equation. With <a href="https://www.fuseaitools.com/home/flux-kontext/flux-2-pro-text-to-image" style="color:#34d399;">Flux 2 Pro</a> for high-quality concept renders, AI image generation enables architecture firms to produce concept renders in minutes instead of days...</p>
        </section>

        <!-- ... 工作流、风险指南、行动清单 ... -->

        <section class="faq">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Frequently Asked Questions</h2>
            <div style="margin-bottom:16px;">
                <h3 style="color:#f3f4f6;">Q: Can AI-generated renders replace traditional 3D visualization?</h3>
                <p style="color:#d1d5db;">Not for final delivery. AI generates concepts and design exploration visuals, not construction documents...</p>
            </div>
            <!-- 更多 Q&A -->
        </section>

        <section class="closing">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">The Real Shift</h2>
            <p style="color:#d1d5db;">Architectural visualization was bottlenecked by cost...</p>
            <p style="color:#d1d5db;">Try <a href="https://www.fuseaitools.com/home/flux-kontext" style="color:#34d399;">Flux on FuseAITools</a> for AI-powered architectural visualization.</p>
        </section>
    </article>
</body>
</html>
```

### 9.2 变现指南示例（ElevenLabs 配音服务，节选）

```markdown
# News Article: ElevenLabs for Freelance Voiceover Services — Building an AI Voiceover Business (English)

ElevenLabs enables freelance voiceover artists and audio producers to offer scalable voiceover services — from audiobooks and e-learning to commercial scripts and multilingual dubbing.

---

### title
Building an AI Voiceover Service Business with ElevenLabs for Freelance Audio Producers

### path
`elevenlabs-voiceover-service-freelancer-business`

### description
ElevenLabs enables freelance voiceover artists to build scalable audio businesses offering e-learning narration, commercial voiceovers, audiobook production, and multilingual dubbing services.

### keyword
ElevenLabs, voiceover service, freelance voiceover, AI voice business, text to speech service, audio production, voice cloning, e-learning narration, FuseAI Tools
```

---

## 10. 质量自检清单

生成文章后，逐项检查：

### Frontmatter
- [ ] title 含工具名 + 场景
- [ ] path 为小写连写 slug
- [ ] description 120-160 字符
- [ ] keyword 6-12 个，含 FuseAI Tools

### HTML 结构
- [ ] `<meta name="description">` 在 `<title>` 后
- [ ] `<article>` 含 `itemscope itemtype="https://schema.org/Article"`
- [ ] 暗色主题内联样式正确
- [ ] 颜色方案与工具匹配

### 内容
- [ ] Introduction：行业痛点 + 工具解决方案
- [ ] 2-4 个工作流/服务线，每个含 Workshop 示例
- [ ] 对比表格（传统 vs AI）
- [ ] Pitfall Guide 表格
- [ ] Action Checklist（5-6 步）
- [ ] FAQ（4-5 个 Q&A）
- [ ] Closing + CTA

### 内链
- [ ] 首段工具名链到聚合页
- [ ] 文末 CTA 链到聚合页
- [ ] 非 Chat 工具：5+ 子页面链接
- [ ] 链接颜色与工具主色一致

### SEO/AEO/GEO
- [ ] Meta description 唯一且英文
- [ ] FAQ 回答首句直接给出结论
- [ ] Schema.org Article 标记
- [ ] 数字可核实（价格、时间、参数）
