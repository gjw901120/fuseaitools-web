# 定价映射规则

本文档描述前端各工具与定价接口 `GET /api/common/models/price` 返回数据中 **modelKey** 的对应关系，以及 RULE 类型下表单字段与规则匹配方式。前端通过 `composables/useModelPrice.js` 的 `getPrice(modelKey, formFields?)` 获取 credits 并展示在提交按钮旁。

---

## 一、定价数据结构说明

接口返回格式示例：

```json
{
  "modelKey": {
    "type": "ONCE",
    "once": { "credits": 10 }
  },
  "anotherKey": {
    "type": "RULE",
    "rules": [
      { "credits": 20, "duration": 5, "quality": "720p", "size": "", "batchSize": 1, "speed": 1, "scene": "generate" }
    ]
  }
}
```

- **ONCE**：直接使用 `once.credits`，无需表单字段匹配。
- **RULE**：用传入的 `formFields` 与 `rules` 中每条规则做**全字段匹配**，命中则取该条的 `credits`。未传的 key 不参与匹配。

---

## 二、按工具分类的 modelKey 与表单映射

### 1. GPT 4o Image

| 前端展示名称 | modelKey       | 类型  | 说明 |
|-------------|----------------|-------|------|
| GPT 4o Image | `GPT_4o_image` | ONCE  | 图像生成，单一价格 |

- **组件**：`components/tools/GPT4oImageTool.vue`

---

### 2. Flux Kontext

| 前端展示名称   | modelKey           | 类型  | 说明 |
|----------------|--------------------|-------|------|
| Flux Kontext Pro | `flux_kontext_pro` | ONCE  | Model Version 选 Pro |
| Flux Kontext Max | `flux_kontext_max` | ONCE  | Model Version 选 Max |

- **组件**：`components/tools/FluxKontextTool.vue`
- **表单字段**：`formData.model` 为 `'flux-kontext-pro'` 或 `'flux-kontext-max'`，分别对应上述两个 modelKey。

---

### 3. Nano Banana

| 前端展示名称 / 模式     | modelKey          | 类型  | 说明 |
|-------------------------|-------------------|-------|------|
| Nano Banana（文生图）   | `nano-banana`     | ONCE  | 普通生成 |
| Nano Banana（图生图）  | `nano-banana-edit`| ONCE  | 编辑模式 |
| Nano Banana Pro        | `nano-banana-pro` | RULE  | 按 resolution(quality) 等匹配 |

- **组件**：`components/tools/NanoBananaTool.vue`
- **Nano Banana**：由 `formData.mode === 'image-to-image'` 决定用 `nano-banana-edit` 还是 `nano-banana`。
- **Nano Banana Pro（RULE）**：表单 **Resolution** 映射到规则字段 **quality**（1K/2K/4K）。传入 `formFields` 为 `quality: proFormData.resolution`、`duration: 0`、`size: ''`、`batchSize: 1`、`speed: 'none'`、`scene: 'generate'`，与 rules 匹配。

---

### 4. Midjourney

| 前端功能       | 表单 tab id | modelKey              | 类型  |
|----------------|-------------|------------------------|-------|
| Imagine        | `imagine`   | `midjourney_imagine`   | ONCE  |
| Upscale        | `upscale`   | `midjourney_upscale`   | ONCE  |
| Vary           | `vary`      | `midjourney_vary`      | ONCE  |
| Blend          | `blend`     | `midjourney_blend`     | ONCE  |
| Describe       | `describe`  | `midjourney_describe`  | ONCE  |
| Swap Face      | `swap`      | `midjourney_swapface`  | ONCE  |

- **组件**：`components/tools/MidjourneyTool.vue`
- **价格匹配**：`MIDJOURNEY_PRICE_KEYS`，由 `activeCategory`（imagine | upscale | vary）取对应 modelKey；Imagine → `midjourney_imagine`，Upscale → `midjourney_upscale`，Vary → `midjourney_vary`。

---

### 5. Suno

| 前端功能           | 表单 function   | modelKey              | 类型  |
|--------------------|-----------------|------------------------|-------|
| Music Generation   | `generate`      | `suno_generate`        | ONCE  |
| Music Extension    | `extend`        | `suno_extend`          | ONCE  |
| Audio Expansion    | `expand`        | `suno_upload_extend`   | ONCE  |
| Vocal Generation   | `vocal`         | `suno_add_vocals`      | ONCE  |
| Audio Cover        | `cover`         | `suno_upload_cover`    | ONCE  |
| Accompaniment      | `accompaniment` | `suno_add_instrumental`| ONCE  |

- **组件**：`components/tools/SunoTool.vue`
- **映射常量**：`SUNO_MODEL_KEY`，由 `formData.function` 取对应 modelKey。

---

### 6. Veo 3

| 前端模式 / 模型     | modelKey     | 类型  | 说明 |
|---------------------|--------------|-------|------|
| Video Extend        | `veo3_extend`| ONCE  | 延展视频 |
| Text/Image to Video（Standard） | `veo3`      | ONCE  | 模型选 veo3 |
| Text/Image to Video（Fast）    | `veo3_fast` | ONCE  | 模型选 veo3_fast |

- **组件**：`components/tools/Veo3Tool.vue`
- **逻辑**：`formData.generationType === 'VIDEO_EXTEND'` 用 `veo3_extend`，否则用 `formData.model`（`veo3` 或 `veo3_fast`）作为 modelKey。

---

### 7. Runway

| 前端功能   | modelKey         | 类型  | 说明 |
|------------|------------------|-------|------|
| Generate   | `runway_generate`| RULE  | 按 duration、quality 等匹配 |
| Extend     | `runway_extend`  | ONCE  | 延展视频 |
| Aleph      | `runway_aleph`   | ONCE  | Aleph 生成 |

- **组件**：`components/tools/RunwayTool.vue`
- **runway_generate（RULE）**：传入 `formFields` 包含 `duration: Number(formData.duration) || 5`、`quality: formData.quality || '720p'`、`scene: 'generate'`，与 rules 匹配。

---

### 8. Luma

| 前端展示名称 | modelKey | 类型  |
|-------------|----------|-------|
| Luma        | `Luma`   | ONCE  |

- **组件**：`components/tools/LumaTool.vue`

---

### 9. Sora

| 前端模式           | 表单 model            | modelKey                    | 类型  | 说明 |
|--------------------|------------------------|-----------------------------|-------|------|
| watermark-remover  | `watermark-remover`    | `sora-watermark-remover`    | ONCE  | 去水印 |
| pro-storyboard     | `pro-storyboard`       | `sora-2-pro-storyboard`     | RULE  | 按 duration 等匹配 |
| text-to-video      | `text-to-video`        | `sora-2-text-to-video`      | ONCE  | 文生视频 |
| image-to-video     | `image-to-video`       | `sora-2-image-to-video`     | ONCE  | 图生视频 |
| pro-text-to-video  | `pro-text-to-video`    | `sora-2-pro-text-to-video`  | RULE  | 按 duration + size 匹配 |
| pro-image-to-video | `pro-image-to-video`   | `sora-2-pro-image-to-video` | RULE  | 按 duration + size 匹配 |

- **组件**：`components/tools/SoraTool.vue`
- **sora-2-pro-storyboard（RULE）**：传入 `duration`（来自 `form.input.n_frames`）、`scene: 'generate'`。
- **sora-2-pro-text-to-video / sora-2-pro-image-to-video（RULE）**：
  - **duration**：对应表单 **Frames**（`form.input.n_frames`，如 10、15）。
  - **size**：对应表单 **Size**（`form.input.size`：`standard`、`high`）。
  - 仅用 `duration` 与 `size` 参与规则匹配，取 credits。

---

## 三、RULE 匹配字段速查

| modelKey                    | 参与匹配的表单字段说明 |
|-----------------------------|------------------------|
| `nano-banana-pro`           | quality（resolution：1K/2K/4K）、duration、size、batchSize、speed、scene |
| `runway_generate`           | duration、quality（如 720p）、scene |
| `sora-2-pro-storyboard`     | duration（Frames）、scene |
| `sora-2-pro-text-to-video` | duration（Frames）、size（standard/high） |
| `sora-2-pro-image-to-video`| duration（Frames）、size（standard/high） |

---

## 四、前端用法摘要

- **拉取价格**：页面挂载时调用 `fetchPrices()`（内部请求 `GET /api/common/models/price`，带缓存）。
- **取价**：`getPrice(modelKey, formFields?)`，ONCE 不传 `formFields`，RULE 传与规则一致的字段对象。
- **展示**：`formatCredits(credits)` 得到字符串（如 `"20"`），再拼到按钮文案（如 `"Generate (20)"`）。

后端需保证返回的 modelKey 与上表一致，RULE 的 `rules` 中字段名与前端传入的 `formFields` 一致（如 `duration`、`quality`、`size`、`scene` 等），才能正确匹配并展示 credits。
