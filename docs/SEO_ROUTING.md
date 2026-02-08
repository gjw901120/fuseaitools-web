# 路由规划与 SEO 说明

本文档说明当前「二级详情页 + 三级功能页」路由规划对 SEO 的影响，以及已做的配置。

---

## 一、路由结构对 SEO 的利弊

### 1. 对 SEO 有利的方面

| 方面 | 说明 |
|------|------|
| **层级清晰** | `/home` → `/home/{tool}` → `/home/{tool}/{child}` 结构清晰，便于爬虫理解站点层级和权重分配。 |
| **URL 语义化** | 路径含品牌/功能关键词（如 `/home/claude`、`/home/runway/generate`），有利于相关词检索。 |
| **一 URL 一内容** | 二级详情页（模型介绍+功能入口）与三级功能页（实际工具）内容不同，无重复内容问题。 |
| **301 重定向** | 旧二级路径（如 `/home/suno-extend`）已用 301 指向新三级路径，权重可传递到新 URL。 |
| **内链结构** | 首页 → 详情页 → 功能页，详情页有明确 CTA 到各功能，利于爬虫发现和权重下传。 |
| **详情页内容** | 每个工具详情页有独立 intro 与功能描述，便于做长尾词（如「Claude 介绍」「Runway 用法」）。 |

### 2. 需要注意或可优化之处

| 方面 | 说明 |
|------|------|
| **抓取深度** | 三级页比二级多一层，重要功能页建议在 sitemap 与内链上给予足够权重（已通过 sitemap priority 与首页/详情页链接覆盖）。 |
| **Canonical** | 每个页面应设 canonical 指向自身，避免带参或尾斜杠产生重复 URL（详情页已加 canonical；三级页由 useToolSEO 统一设置）。 |
| **Sitemap** | 二级详情页与三级功能页都应提交，便于收录（已在 sitemap 中同时包含二级与三级 URL）。 |

---

## 二、已做的 SEO 配置

1. **Sitemap（`server/routes/sitemap.xml.get.js`）**
   - 包含首页、/home、about、pricing、news。
   - 包含 14 个工具二级详情页：`/home/gpt`、`/home/claude`、`/home/runway` 等（priority 0.85）。
   - 包含所有三级功能页（priority 0.7–0.8）。
   - 已移除不存在的 `/tools`，避免 404 被收录。

2. **301 重定向（`nuxt.config.js` routeRules）**
   - 旧路径（如 `/home/suno-extend`）→ 新三级路径（如 `/home/suno/extend`），statusCode 301，利于权重合并。

3. **详情页 Canonical（`components/ToolOverview.vue`）**
   - 每个工具详情页输出 `link[rel="canonical"]` 指向当前 URL（如 `https://fuseaitools.com/home/claude`），避免重复收录。

4. **三级页 SEO（`composables/useToolSEO.js`）**
   - 各功能页统一设置 title、description、canonical、BreadcrumbList + SoftwareApplication/Product 结构化数据，利于摘要与富结果。

5. **预渲染（`nuxt.config.js` nitro.prerender.routes）**
   - 二级详情页与三级功能页均加入预渲染列表，静态输出利于首屏与抓取。

---

## 三、结论与建议

- **整体**：当前「二级详情 + 三级功能」的路由规划对 SEO 是**有利的**：层级清楚、URL 有意义、无重复内容，且通过 301、sitemap、canonical 和结构化数据做了配套。
- **建议**：保持二级页作为「介绍 + 入口」、三级页作为「具体功能」的划分；新工具上线时同步在 sitemap 与 toolOverviews 中增加对应二级与三级 URL。
