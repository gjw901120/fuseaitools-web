# 全局路由与模型规范

本文档描述 Home 下所有工具的路由层级、多 Tab 工具的独立路由约定，以及 **History 详情跳转** 使用的 **model** 与路由的对应关系。无论从 History 点击进入还是 Tab 间切换，均使用同一套**三级路由**。

---

## 一、路由层级约定

| 层级 | 含义 | 示例 |
|------|------|------|
| **一级** | 首页 / 分类入口 | `/home`（Image / Audio / Video 聚合） |
| **二级** | 工具父路径（仅作重定向或子路由容器） | `/home/gpt`、`/home/suno` |
| **三级** | 实际功能页（单 Tab 工具的默认子页或多 Tab 的某一 Tab） | `/home/gpt/generate`、`/home/suno/extend`、`/home/midjourney/imagine` |

规则摘要：

- **所有工具**统一为 **三级路由**：`/home/{tool}/{child}`。
- **单 Tab / 无 Tab 工具**：仅一个子路径，一般为 `generate`，如 `/home/gpt/generate`、`/home/flux-kontext/generate`。
- **多 Tab 工具**：每个 Tab 对应一条三级路径，如：
  - **Midjourney**：`/home/midjourney/imagine`、`/home/midjourney/upscale`、`/home/midjourney/vary`
  - **Suno**：`/home/suno/generate`、`/home/suno/extend`、`/home/suno/upload-cover` 等
  - **Veo3**：`/home/veo3/text-to-video`、`/home/veo3/extend` 等
- **父路径**（如 `/home/gpt`、`/home/suno`）：通过 **301 重定向** 到该工具的默认子页，不单独渲染内容。
- **详情**：带 `record-id` 时在对应路由后加查询参数，如 `/home/suno/extend?record-id=xxx`。History 根据 **model** 决定跳转到哪条路由。

---

## 二、按分类的完整路由与模型表

### 1. Chat（单页，三级路径固定为 `/generate`）

| 工具名 | 路由 | 说明 | History 用 category |
|--------|------|------|---------------------|
| GPT | `/home/gpt/generate` | 单页 | GPT |
| DeepSeek | `/home/deepseek/generate` | 单页 | DeepSeek / Deepseek |
| Claude | `/home/claude/generate` | 单页 | Claude |
| Gemini | `/home/gemini/generate` | 单页 | Gemini |

---

### 2. Image

| 工具名 | 路由 | Tab/模式 | 说明 | History 用 model/category |
|--------|------|----------|------|---------------------------|
| GPT 4o Image | `/home/gpt-4o-image/generate` | 单页 | 无 Tab | GPT 4o Image |
| Flux Kontext | `/home/flux-kontext/generate` | 单页 | 内选 Pro/Max | Flux Kontext |
| **Nano Banana** | `/home/nano-banana/generate` | Text to Image | 文生图 | `nano-banana` |
| **Nano Banana** | `/home/nano-banana/edit` | Image to Image | 图生图 | `nano-banana-edit` |
| **Nano Banana** | `/home/nano-banana/pro-generate` | Pro | 独立路由 | `nano-banana-pro` |
| **Midjourney** | `/home/midjourney/imagine` | Imagine | — | `midjourney_imagine` |
| **Midjourney** | `/home/midjourney/upscale` | Upscale | — | `midjourney_upscale` |
| **Midjourney** | `/home/midjourney/vary` | Vary | — | `midjourney_vary` |

---

### 3. Audio

| 工具名 | 路由 | Tab/功能 | 说明 | History 用 model |
|--------|------|----------|------|------------------|
| **Suno** | `/home/suno/generate` | Music Generation | — | `suno_generate` |
| **Suno** | `/home/suno/extend` | Music Extension | — | `suno_extend` |
| **Suno** | `/home/suno/upload-cover` | Audio Cover | — | `suno_upload_cover` |
| **Suno** | `/home/suno/upload-extend` | Audio Expansion | — | `suno_upload_extend` |
| **Suno** | `/home/suno/add-instrumental` | Accompaniment | — | `suno_add_instrumental` |
| **Suno** | `/home/suno/add-vocals` | Vocal Generation | — | `suno_add_vocals` |
| **ElevenLabs** | `/home/elevenlabs/multilingual-v2` | Multilingual v2 | — | `elevenlabs_text_to_speech_multilingual` |
| **ElevenLabs** | `/home/elevenlabs/turbo-2-5` | Turbo 2.5 | — | `elevenlabs_text_to_speech_turbo` |
| **ElevenLabs** | `/home/elevenlabs/speech-to-text` | Speech-to-Text | — | `elevenlabs_speech_to_text` |
| **ElevenLabs** | `/home/elevenlabs/sound-effect-v2` | Sound Effect v2 | — | `elevenlabs_sound_effect` |
| **ElevenLabs** | `/home/elevenlabs/audio-isolation` | AI Audio Isolation | — | `elevenlabs_audio_isolation` |

---

### 4. Video

| 工具名 | 路由 | Tab/模式 | 说明 | History 用 model |
|--------|------|----------|------|------------------|
| **Veo3** | `/home/veo3/text-to-video` | Text to Video | — | `veo3`、`veo3_fast`、`text_2_video` |
| **Veo3** | `/home/veo3/first-and-last-to-video` | First And Last Frames to Video | — | `first_and_last_frames_2_video` |
| **Veo3** | `/home/veo3/reference-to-video` | Image to Video | — | `reference_2_video` |
| **Veo3** | `/home/veo3/extend` | Video Extend | — | `veo3_extend`、`video_extend` |
| **Runway** | `/home/runway/generate` | Generate | — | `runway_generate` |
| **Runway** | `/home/runway/extend` | Extend | — | `runway_extend` |
| **Runway** | `/home/runway/aleph` | Aleph | — | `runway_aleph` |
| Luma | `/home/luma/generate` | Generate | 单页 | category: Luma |
| **Sora** | `/home/sora/text-to-video` | Text to Video | — | `sora-2-text-to-video` |
| **Sora** | `/home/sora/image-to-video` | Image to Video | — | `sora-2-image-to-video` |
| **Sora** | `/home/sora/pro-text-to-video` | Pro Text to Video | — | `sora-2-pro-text-to-video` |
| **Sora** | `/home/sora/pro-image-to-video` | Pro Image to Video | — | `sora-2-pro-image-to-video` |
| **Sora** | `/home/sora/watermark-remover` | Watermark Remover | — | `sora-watermark-remover` |
| **Sora** | `/home/sora/pro-storyboard` | Pro Storyboard | — | `sora-2-pro-storyboard` |

---

## 三、Model → 路由映射（History 详情跳转）

History 列表项来自 `GET /api/records/list`，每条记录含 `recordId`、`model`、`category` 等。跳转规则：**优先用 `model` 查下表得到 path，无匹配时用 `category` 回退到工具默认页**。

| model（后端返回） | 目标路由 |
|------------------|----------|
| `midjourney_imagine` | `/home/midjourney/imagine` |
| `midjourney_upscale` | `/home/midjourney/upscale` |
| `midjourney_vary` | `/home/midjourney/vary` |
| `nano-banana` | `/home/nano-banana/generate` |
| `nano-banana-edit` | `/home/nano-banana/edit` |
| `nano-banana-pro` | `/home/nano-banana/pro-generate` |
| `suno_generate` | `/home/suno/generate` |
| `suno_extend` | `/home/suno/extend` |
| `suno_upload_cover` | `/home/suno/upload-cover` |
| `suno_upload_extend` | `/home/suno/upload-extend` |
| `suno_add_instrumental` | `/home/suno/add-instrumental` |
| `suno_add_vocals` | `/home/suno/add-vocals` |
| `veo3`、`veo3_fast`、`text_2_video` | `/home/veo3/text-to-video` |
| `first_and_last_frames_2_video` | `/home/veo3/first-and-last-to-video` |
| `reference_2_video` | `/home/veo3/reference-to-video` |
| `veo3_extend`、`video_extend` | `/home/veo3/extend` |
| `runway_generate` | `/home/runway/generate` |
| `runway_extend` | `/home/runway/extend` |
| `runway_aleph` | `/home/runway/aleph` |
| `elevenlabs_text_to_speech_multilingual` | `/home/elevenlabs/multilingual-v2` |
| `elevenlabs_text_to_speech_turbo` | `/home/elevenlabs/turbo-2-5` |
| `elevenlabs_speech_to_text` | `/home/elevenlabs/speech-to-text` |
| `elevenlabs_sound_effect` | `/home/elevenlabs/sound-effect-v2` |
| `elevenlabs_audio_isolation` | `/home/elevenlabs/audio-isolation` |
| `sora-2-text-to-video` 等 Sora model | 对应 `/home/sora/{子路径}`（见上表） |
| 其他 | 用 `category` 查 `categoryToRoute` 得到工具默认页 |

带详情时统一格式：`{path}?record-id={recordId}`，例如 `/home/suno/extend?record-id=xxx`。

---

## 四、SEO 重定向（301）

旧路径（父路径或历史二级路径）均做 **301 永久重定向** 到新三级路径，便于 SEO 与缓存。

- **配置位置**：`nuxt.config.js` 的 `routeRules`（服务端 301）+ 各父级/旧页的 `definePageMeta` middleware（兜底）。
- **父路径 → 默认子页**：如 `/home/gpt` → `/home/gpt/generate`，`/home/suno` → `/home/suno/generate`，`/home/sora` → `/home/sora/text-to-video`。
- **旧二级路径 → 新三级路径**：如 `/home/suno-extend` → `/home/suno/extend`，`/home/midjourney-imagine` → `/home/midjourney/imagine`，`/home/elevenlabs-multilingual-v2` → `/home/elevenlabs/multilingual-v2` 等。

完整旧路径列表见 `nuxt.config.js` 中 `routeRules` 与 `hooks.pages:extend` 的 `redirectPaths`。Sitemap 仅包含新三级 URL，不包含旧路径。

---

## 五、页面文件与路由对应

| 类型 | 路径示例 | 页面文件 |
|------|-----------|----------|
| 首页 | `/home` | `pages/home/index.vue` |
| 父级（重定向） | `/home/gpt`、`/home/suno` 等 | `pages/home/gpt.vue`、`pages/home/suno.vue` 等（内为 `<NuxtPage />` + middleware 301 到默认子页） |
| 三级子页 | `/home/gpt/generate`、`/home/suno/extend` 等 | `pages/home/gpt/generate.vue`、`pages/home/suno/extend.vue` 等 |
| 旧路径重定向页 | `/home/suno-extend`、`/home/midjourney-imagine` 等 | `pages/home/suno-extend.vue`、`pages/home/midjourney-imagine.vue` 等（仅 301 到对应三级路径） |

目录结构摘要：

- **Chat**：`gpt.vue`、`gpt/generate.vue`；`deepseek.vue`、`deepseek/generate.vue`；`claude.vue`、`claude/generate.vue`；`gemini.vue`、`gemini/generate.vue`。
- **Image**：`gpt-4o-image.vue`、`gpt-4o-image/generate.vue`；`flux-kontext.vue`、`flux-kontext/generate.vue`；`nano-banana.vue`、`nano-banana/{generate,edit,pro-generate}.vue`；`midjourney.vue`、`midjourney/{imagine,upscale,vary}.vue`。
- **Audio**：`suno.vue`、`suno/{generate,extend,upload-cover,upload-extend,add-instrumental,add-vocals}.vue`；`elevenlabs.vue`、`elevenlabs/{multilingual-v2,turbo-2-5,speech-to-text,sound-effect-v2,audio-isolation}.vue`。
- **Video**：`veo3.vue`、`veo3/{text-to-video,first-and-last-to-video,reference-to-video,extend}.vue`；`runway.vue`、`runway/{generate,extend,aleph}.vue`；`luma.vue`、`luma/generate.vue`；`sora.vue`、`sora/{text-to-video,image-to-video,pro-text-to-video,pro-image-to-video,watermark-remover,pro-storyboard}.vue`。

---

## 六、Tab 切换与路由同步

- **Midjourney**：Tab 对应 `/home/midjourney/imagine|upscale|vary`，组件根据 `route.path` 设置 `activeCategory`，提交成功后按当前 path + `?record-id=xxx` 跳转。
- **Nano Banana**：三 Tab 对应 `/home/nano-banana/generate`、`/home/nano-banana/edit`、`/home/nano-banana/pro-generate`；`watch(route.path)` 同步 `activeTab`，提交后按当前 path + `?record-id=xxx`。
- **Suno**：六 Tab 对应 `/home/suno/generate`、`extend`、`upload-cover`、`upload-extend`、`add-instrumental`、`add-vocals`；`watch(route.path)` 同步 `formData.function`，提交后按当前 path + `?record-id=xxx`。
- **ElevenLabs**：五 Tab 对应 `/home/elevenlabs/multilingual-v2`、`turbo-2-5`、`speech-to-text`、`sound-effect-v2`、`audio-isolation`；`watch(route.path)` 同步 `formData.function`，提交后使用 `getElevenLabsRecordPath() + '?record-id=xxx'`。
- **Veo3**：四 Tab 对应 `/home/veo3/text-to-video`、`first-and-last-to-video`、`reference-to-video`、`extend`；`watch(route.path)` 同步 `formData.generationType`，提交后使用 `getVeo3RecordPath() + '?record-id=xxx'`。
- **Runway**：三 Tab 对应 `/home/runway/generate`、`extend`、`aleph`；`watch(route.path)` 同步 `activeTab`，提交后使用 `getRunwayRecordPath() + '?record-id=xxx'`。
- **Sora**：多模式对应 `/home/sora/text-to-video` 等；按 `route.path` 同步模式，提交后按当前 path + `?record-id=xxx`。

---

## 七、定价 modelKey 与路由的区分

- **定价**：前端用 **modelKey** 调 `getPrice(modelKey)` 展示价格（见 `docs/PRICING_MAPPING.md`）。
- **History**：后端列表返回的 **model**（或 `modelId`）用于生成详情链接；需与上文「Model → 路由」表一致，以便点击记录打开对应 Tab 的详情页。

若后端 `model` 与表内不一致，需在 `composables/useHomeLayout.js` 的 `modelToPath` 或 `getHistoryItemRoute` 中做映射（别名或兼容旧值）。

---

## 八、实现说明

- **History 跳转**：`composables/useHomeLayout.js` 中维护 `categoryToRoute`、`modelToPath`；`getHistoryItemRoute(record)` 优先用 `record.model` 查 `modelToPath` 得到 path，再拼接 `?record-id=xxx`；无 model 匹配时回退到 `categoryToRoute[category]`。
- **导航与默认跳转**：`toolRouteMap` 为工具名 → 默认三级 path；`pages/home/index.vue` 访问 `/home` 时默认跳转到 `toolRouteMap` 中配置的默认工具 path。
- **各工具组件**：Tab/模式与三级 path 一一对应；提交成功后跳转当前 path + `?record-id=xxx`。路径与 model 的映射在各工具的 `*TabToPath` / `getXxxRecordPath()` 中维护，并与 `modelToPath` 保持一致。
