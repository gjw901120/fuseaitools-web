# News 与频道（Channels）梳理：数据存储、页面展示与 SEO

本文档梳理「新闻 + 频道」的数据结构、后端存储、列表/详情页展示方式，以及为 SEO 优化的方案。

---

## 一、概念与层级

| 概念 | 说明 | 示例 |
|------|------|------|
| **News（新闻/文章）** | 单篇内容，有标题、摘要、正文、发布时间等。 | 《Introducing GPT-5》《Getting Started with Midjourney》 |
| **Channel（频道）** | 内容的分类/栏目，用于聚合列表和导航。一篇新闻可归属一个主频道（或标签）。 | 产品动态、AI 趋势、教程、行业洞察 |

当前项目中的 `category`（Chat / Image / Audio / Video）更偏「工具类型」，若希望做「频道」SEO，建议**新增 channel 维度**：  
- 保留 `category` 用于与工具类型关联（可选）；  
- 新增 `channelId` / `channelSlug`，对应「频道」表或配置，用于列表筛选和 URL。

---

## 二、推荐 URL 设计（利于 SEO）

| 页面 | URL | 说明 |
|------|-----|------|
| 新闻列表（全部） | `/news` | 现有，保持不变。 |
| 频道列表 | `/news/channel/[channelSlug]` | 按频道筛选的列表，如 `/news/channel/product-updates`。 |
| 文章详情 | `/news/[slug]` | 现有，如 `/news/introducing-gpt5-next-generation-ai-language-models`。 |

这样做的 SEO 好处：

- 列表页与详情页 URL 语义清晰、层级明确。
- 频道页可做独立 title/description，便于长尾词（如「FuseAI 产品动态」）。
- 详情页 canonical 固定为 `/news/[slug]`，无重复内容。

---

## 三、后端数据存储结构

### 3.1 方案 A：当前 JSON 扩展（无需数据库）

在现有 `data/news.json` 基础上扩展字段，并新增频道配置。

**频道配置**（新建 `data/newsChannels.json` 或写在 `news.json` 顶部）：

```json
{
  "channels": [
    {
      "id": "product-updates",
      "slug": "product-updates",
      "name": "Product Updates",
      "nameZh": "产品动态",
      "description": "Latest product and feature updates from FuseAI Tools.",
      "sort": 1
    },
    {
      "id": "ai-trends",
      "slug": "ai-trends",
      "name": "AI Trends",
      "nameZh": "AI 趋势",
      "description": "AI industry trends and insights.",
      "sort": 2
    },
    {
      "id": "tutorials",
      "slug": "tutorials",
      "name": "Tutorials",
      "nameZh": "教程指南",
      "description": "How-to guides and tutorials for AI tools.",
      "sort": 3
    },
    {
      "id": "industry",
      "slug": "industry",
      "name": "Industry Insights",
      "nameZh": "行业洞察",
      "description": "Industry analysis and thought leadership.",
      "sort": 4
    }
  ],
  "articles": [
    {
      "id": 1,
      "slug": "introducing-gpt5-next-generation-ai-language-models",
      "title": "Introducing GPT-5: The Next Generation of AI Language Models",
      "excerpt": "OpenAI has announced the release of GPT-5...",
      "channelSlug": "product-updates",
      "category": "Chat",
      "image": "/images/news/gpt5-announcement.jpg",
      "publishDate": "2024-01-15",
      "updatedAt": "2024-01-15",
      "readTime": 5,
      "content": "Full article content...",
      "author": "FuseAI Team",
      "tags": ["GPT-5", "OpenAI", "Language Models"]
    }
  ]
}
```

**单篇文章字段说明**（与 SEO 强相关）：

| 字段 | 类型 | 说明 |
|------|------|------|
| id | number | 主键。 |
| slug | string | URL 唯一标识，不可变，用于 canonical。 |
| title | string | 标题，用于 title、og:title、Schema headline。 |
| excerpt | string | 摘要，用于 meta description、og:description。 |
| channelSlug | string | 所属频道，对应 channels[].slug，用于列表筛选与频道页。 |
| category | string | 可选，工具类型（Chat/Image/Audio/Video）。 |
| image | string | 头图绝对路径或 URL，用于 og:image、Schema image。 |
| publishDate | string | 发布日期 ISO 或 YYYY-MM-DD。 |
| updatedAt | string | 最后修改日期，用于 Schema dateModified。 |
| readTime | number | 阅读分钟数。 |
| content | string | 正文（可 HTML 或 Markdown，由前端渲染）。 |
| author | string | 作者名或 "FuseAI Team"。 |
| tags | string[] | 可选，标签，便于相关推荐与内链。 |

### 3.2 方案 B：MySQL 表结构（后续迁移）

若后端为 Java + MySQL，可按下表设计，与上面 JSON 字段一一对应。

**频道表 `t_news_channel`**：

| 字段 | 类型 | 说明 |
|------|------|------|
| id | bigint PK | 主键。 |
| slug | varchar(64) UNIQUE | 频道 URL 标识，如 product-updates。 |
| name | varchar(128) | 频道名称（英文）。 |
| name_zh | varchar(128) | 频道名称（中文，可选）。 |
| description | varchar(512) | 频道描述，用于频道列表页 SEO。 |
| sort_order | int | 排序，越小越靠前。 |
| created_at | datetime | 创建时间。 |
| updated_at | datetime | 更新时间。 |

**文章表 `t_news_article`**：

| 字段 | 类型 | 说明 |
|------|------|------|
| id | bigint PK | 主键。 |
| slug | varchar(256) UNIQUE | 文章 URL 标识，唯一、不可变。 |
| channel_id | bigint FK | 所属频道，关联 t_news_channel.id。 |
| category | varchar(32) | 可选，工具类型。 |
| title | varchar(512) | 标题。 |
| excerpt | varchar(1024) | 摘要。 |
| image_url | varchar(512) | 头图 URL。 |
| content | text/longtext | 正文。 |
| author | varchar(128) | 作者。 |
| publish_date | date | 发布日期。 |
| updated_at | datetime | 最后修改时间。 |
| read_time_minutes | int | 阅读时长（分钟）。 |
| status | tinyint | 状态：0 草稿 1 已发布。 |
| created_at | datetime | 创建时间。 |

**标签表（可选）**：  
- `t_news_tag`：id, name, slug  
- `t_news_article_tag`：article_id, tag_id（多对多）

API 返回时把 `channel_id` 解析为 `channelSlug`（或带上 channel 对象），前端与当前 JSON 结构保持一致即可。

---

## 四、列表页展示与 SEO

### 4.1 列表页类型

1. **全部新闻** `/news`  
   - 展示所有已发布文章（分页 + 可选按频道筛选）。  
   - 筛选器：All + 各 channel（从 channels 配置读取）。

2. **频道列表** `/news/channel/[channelSlug]`  
   - 仅展示该 channelSlug 下的文章，分页。  
   - 面包屑：Home > News > [Channel Name]。  
   - 标题区可写「Product Updates」等，与频道 name/description 一致。

### 4.2 列表页 SEO 建议

- **Title**  
  - `/news`：`AI News & Updates - FuseAI Tools`（或略作优化长尾词）。  
  - `/news/channel/[channelSlug]`：`[Channel Name] - AI News | FuseAI Tools`。

- **Meta description**  
  - 使用频道 description，或从首屏文章摘要拼接一段 150 字以内描述。

- **Canonical**  
  - `/news` → `https://fuseaitools.com/news`  
  - `/news/channel/product-updates` → `https://fuseaitools.com/news/channel/product-updates`

- **结构化数据**  
  - **ItemList**：列出当前页文章（title、url、image、datePublished），帮助搜索引擎理解列表内容。  
  - **BreadcrumbList**：Home > News [> Channel Name]。

- **分页**  
  - 若使用 `?page=2`，建议 canonical 仍指向无参或第 1 页的列表 URL，或使用 `rel="prev"/"next"` 指向上一页/下一页 URL，避免每页都被当独立列表重复收录。

---

## 五、详情页展示与 SEO

### 5.1 展示内容建议

- 面包屑：Home > News [> Channel Name] > Article Title。  
- 文章头：频道标签（可点击回频道列表）、标题、作者、发布日期、更新时间（若有）、阅读时长。  
- 头图、正文、相关文章（同频道或同 tag）、分享、Newsletter 等保持现有即可。

### 5.2 详情页 SEO（在现有基础上增强）

- **Title**：`[Article Title] - FuseAI Tools News`（已做）。  
- **Description**：`excerpt`（已做）。  
- **Canonical**：`https://fuseaitools.com/news/[slug]`（已做）。  
- **Open Graph / Twitter**：title、description、image、type=article、url（已做）。  
- **Schema.org Article**：  
  - 已包含：headline、description、image、datePublished、publisher。  
  - 建议补充：`dateModified`（用 `updatedAt`）、`author`（用 `author` 字段）、`articleSection` 用频道名（如 "Product Updates"）。  

这样列表页和详情页都能在搜索引擎中形成清晰层级和富摘要。

---

## 六、API 设计建议（与存储对应）

| 接口 | 方法 | 说明 | 返回要点 |
|------|------|------|----------|
| 频道列表 | GET | 供导航/筛选用 | `channels[]`：slug, name, description, sort。 |
| 新闻列表 | GET `/api/news` | 支持 ?page=&limit=&channel= | articles[], pagination, categories/channels。 |
| 频道新闻列表 | GET `/api/news/channel/[channelSlug]` | 或复用 `/api/news?channel=channelSlug` | 同上，仅该频道文章。 |
| 新闻详情 | GET `/api/news/[slug]` | 已有 | article（含 channel 信息）, relatedArticles。 |

列表返回的每篇文章建议至少包含：id, slug, title, excerpt, channelSlug, image, publishDate, readTime，便于列表页渲染和 ItemList 结构化数据。

---

## 七、Sitemap 与爬虫

- **固定 URL**：  
  - `/news`  
  - `/news/channel/product-updates`、`/news/channel/ai-trends` 等（按 channels 配置生成）。

- **详情页**：  
  - 方案 1：从 JSON/DB 读取所有已发布文章的 slug，生成 `/news/[slug]` 列表，写入 sitemap。  
  - 方案 2：sitemap index + 分片（如 sitemap-news-1.xml），避免单文件过大。

- **更新频率**：  
  - 列表页 changefreq 可设为 `daily`，详情页 `weekly` 或按 `updatedAt` 决定。  
  - priority：首页 1.0，/news 0.6，频道页 0.5，文章页 0.5–0.6。

---

## 八、实施顺序建议

1. **数据层**  
   - 在现有 `news.json` 中增加 `channelSlug`、`updatedAt`、`author`；  
   - 新建 `newsChannels.json`（或合并进 news.json）列出频道。

2. **API**  
   - 列表 API 支持 `channel` 查询参数，返回 channel 信息；  
   - 详情 API 返回 article 时带上 channel 对象或 channelSlug，供面包屑和 Schema 使用。

3. **前端列表**  
   - `/news` 保留，筛选器增加「按频道」；  
   - 新增路由 `/news/channel/[channelSlug].vue`，复用列表组件并传入 channelSlug，设置该频道页的 title/description/canonical/ItemList/BreadcrumbList。

4. **前端详情**  
   - 面包屑增加「频道」一层；  
   - useHead 中 Article 增加 dateModified、author、articleSection（频道名）。

5. **Sitemap**  
   - 加入 `/news` 与各 `/news/channel/[channelSlug]`；  
   - 若可行，从 API 或 JSON 读取文章 slug 列表，批量加入 `/news/[slug]`。

按上述结构，新闻与频道在「存储 → 列表/详情展示 → SEO」上可以保持一致、便于扩展；后续若从 JSON 迁到 MySQL，只需 API 层切换数据源，前端与 URL 设计可保持不变。
