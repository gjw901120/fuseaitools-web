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
- **RULE**：以**前端实际传入的 `formFields` 字段集合**为准，对 `rules` 中每条规则做“按字段逐个比对（AND）”匹配，命中则取该条 `credits`。**未传的 key 不参与匹配**。
  - 匹配逻辑实现位于：`composables/useModelPrice.js`（`getPrice`）与各工具组件（构造 `formFields`）。
  - 若某工具的匹配字段/默认值不明确，请以该工具的实际代码为准（见对应 `components/tools/*Tool.vue`），不要按统一模板臆断。

### SEO 中 credits 区间（minValue / maxValue）的取值规则

工具页 JSON-LD 里 `offers.priceSpecification.eligibleQuantity.minValue` / `maxValue` 由同一套定价数据按以下规则计算（实现：`composables/useModelPrice.js` 的 `getPriceRangeFromData`，被 `composables/useToolSEO.js` 的 `useToolSEOAsync` 调用）：

| 定价类型 | minValue | maxValue |
|----------|----------|----------|
| **ONCE** | `once.credits` | `once.credits` |
| **RULE** | `min(rules[].credits)` | `max(rules[].credits)` |

- 不依赖表单或 `formFields`，仅根据接口返回的该 modelKey 下 **ONCE 单值** 或 **RULE 下全部规则的 credits** 取最小/最大。
- 若接口返回为统一包裹格式 `{ errorCode, data }`，则使用 `data` 作为上述结构的输入。

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
| Flux 2 Text to Image | `flux-2-text-to-image` | RULE | 按 quality(1K/2K) 匹配 |
| Flux 2 Image to Image | `flux-2-image-to-image` | RULE | 按 quality(1K/2K) 匹配 |
| Flux 2 Pro Text to Image | `flux-2-pro-text-to-image` | RULE | 按 quality(1K/2K) 匹配 |
| Flux 2 Pro Image to Image | `flux-2-pro-image-to-image` | RULE | 按 quality(1K/2K) 匹配 |

- **组件**：`components/tools/FluxKontextTool.vue`
- **modelKey 以本表为准**（下划线）。表单里 `formData.model` 为 `'flux-kontext-pro'` 或 `'flux-kontext-max'`（连字符），分别对应上表两个 modelKey。
- 若定价接口返回的 key 为连字符形式（如 `flux-kontext-pro`），前端 `getPrice` / `useToolSEOAsync` 会做下划线↔连字符兼容查找。
- **Flux 2 系列（RULE）**：`quality = flux2Form.resolution`（`1K` / `2K`）；`getPrice` 另传 `scene: 'generate'` 与接口 rules 对齐（见 `FluxKontextTool.vue`）。

---

### 3. Nano Banana

| 前端展示名称 / 模式     | modelKey          | 类型  | 说明 |
|-------------------------|-------------------|-------|------|
| Nano Banana（文生图）   | `nano-banana`     | ONCE  | 普通生成 |
| Nano Banana（图生图）  | `nano-banana-edit`| ONCE  | 编辑模式 |
| Nano Banana Pro        | `nano-banana-pro` | RULE  | 按 resolution(quality) 等匹配 |
| Nano Banana 2          | `nano-banana-2`   | RULE  | 按 resolution 映射 quality（1K/2K/4K），scene: generate |

- **组件**：`components/tools/NanoBananaTool.vue`
- **Nano Banana**：由 `formData.mode === 'image-to-image'` 决定用 `nano-banana-edit` 还是 `nano-banana`。
- **Nano Banana Pro（RULE）**：表单 **Resolution** 映射到规则字段 **quality**（1K/2K/4K）。传入 `formFields` 为 `quality: proFormData.resolution`、`duration: 0`、`size: ''`、`batchSize: 1`、`speed: 'none'`、`scene: 'generate'`，与 rules 匹配。
- **Nano Banana 2（RULE）**：`quality = resolution`（1K/2K/4K）；传入 `scene: 'generate'`。其余参数（`aspect_ratio`、`image_input`、`output_format`）不参与价格匹配。

---

### 4. Midjourney

| 前端功能       | 表单 tab id | modelKey              | 类型  | 说明 |
|----------------|-------------|------------------------|-------|------|
| Imagine        | `imagine`   | `midjourney_imagine`   | RULE  | 按 speed（relaxed / fast / turbo）匹配 |
| Upscale        | `upscale`   | `midjourney_upscale`   | ONCE  | |
| Vary           | `vary`      | `midjourney_vary`      | ONCE  | |
| Blend          | `blend`     | `midjourney_blend`     | ONCE  | |
| Describe       | `describe`  | `midjourney_describe`  | ONCE  | |
| Swap Face      | `swap`      | `midjourney_swapface`  | ONCE  | |

- **组件**：`components/tools/MidjourneyTool.vue`
- **价格匹配**：`MIDJOURNEY_PRICE_KEYS` 由 `activeCategory` 取 modelKey。**Imagine（RULE）**：传入 `formFields` 为 `{ duration: 0, quality: '', size: '', batchSize: 1, speed: form.speed, scene: 'generate' }`，与 rules 的 `speed`（relaxed / fast / turbo）匹配；Upscale、Vary 为 ONCE，无需 formFields。

---

### 5. Seedream

| 前端模式（tab/mode）     | modelKey                          | 类型  | 说明 |
|--------------------------|------------------------------------|-------|------|
| 5 Lite Text to Image     | `seedream-5-lite-text-to-image`   | ONCE  | 文生图 |
| 5 Lite Image to Image    | `seedream-5-lite-image-to-image`   | ONCE  | 图生图（若接口改为 RULE，则按 aspectRatio、quality 匹配） |

- **组件**：`components/tools/SeedreamTool.vue`
- **映射**：`seedreamPriceModelKeyMap` 由 `mode` 取 modelKey。
- **formFields**：当前组件统一传 `{ aspectRatio: formData.aspectRatio, quality: formData.quality }`；接口为 ONCE 时忽略，为 RULE 时与 rules 匹配。

---

### 6. Qwen

| 前端模式（tab）   | modelKey               | 类型  | 说明 |
|-------------------|------------------------|-------|------|
| text-to-image     | `qwen-text-to-image`   | ONCE / RULE | 文生图 |
| image-to-image    | `qwen-image-to-image`  | ONCE / RULE | 图生图 |
| image-edit        | `qwen-image-edit`      | ONCE / RULE | 图像编辑 |
| z-image           | `qwen-z-image`        | ONCE / RULE | Z-Image |
| qwen2-text-to-image | `qwen2-text-to-image` | ONCE / RULE | Qwen2 文生图 |
| qwen2-image-edit  | `qwen2-image-edit`    | ONCE / RULE | Qwen2 图像编辑 |

- **组件**：`components/tools/QwenTool.vue`
- **映射**：`qwenPriceModelKeyMap` 由 `mode` 取 modelKey。
- **formFields（RULE 时）**：`text-to-image` / `image-edit` 传 `imageSize`；`image-edit` 另传 `numImages`；`z-image` 传 `aspectRatio`。其余 mode 传空对象，以接口 rules 为准。

---

### 7. Ideogram

| 前端模式（tab）      | modelKey                    | 类型  | 说明 |
|----------------------|-----------------------------|-------|------|
| v3-text-to-image     | `ideogram-v3-text-to-image` | RULE  | 按 speed（TURBO/BALANCED/QUALITY）匹配 |
| v3-edit              | `ideogram-v3-edit`          | RULE  | 同上 |
| v3-remix             | `ideogram-v3-remix`         | RULE  | 同上 |
| v3-reframe           | `ideogram-v3-reframe`       | RULE  | 同上 |
| character            | `ideogram-character`        | RULE  | 同上 |
| character-edit       | `ideogram-character-edit`   | RULE  | 同上 |
| character-remix      | `ideogram-character-remix`  | RULE  | 同上 |

- **组件**：`components/tools/IdeogramTool.vue`
- **映射**：`IDEOGRAM_PRICE_KEY_BY_MODE` 由 `mode` 取 modelKey。
- **所有模式（RULE）**：统一传入 `formFields` 为 `{ speed: form.rendering_speed, scene: 'generate' }`。`rendering_speed` 对应 rules 的 `speed`（如 TURBO、BALANCED、QUALITY）。

---

### 8. Imagen4

| 前端模式（tab）   | modelKey           | 类型  | 说明 |
|-------------------|--------------------|-------|------|
| imagen4-generate  | `imagen4-generate` | ONCE / RULE | 常规生成 |
| imagen4-fast      | `imagen4-fast`     | ONCE / RULE | 快速生成（支持 1-4 张） |
| imagen4-ultra     | `imagen4-ultra`    | ONCE  | 直接匹配 once，当前为 18 credits |

- **组件**：`components/tools/Imagen4Tool.vue`
- **映射**：按当前 tab 直接使用同名 modelKey。
- **Ultra 价格规则**：`imagen4-ultra` 为 ONCE，直接取 `once.credits = 18`，无需表单字段匹配。

---

### 9. GPT Image

| 前端模式（tab）   | modelKey                         | 类型  | 说明 |
|-------------------|----------------------------------|-------|------|
| text-to-image     | `gpt-image-1.5-text-to-image`   | RULE  | 按 size（Quality：medium/high）匹配 |
| image-to-image    | `gpt-image-1.5-image-to-image`  | RULE  | 同上 |

- **组件**：`components/tools/GPTImageTool.vue`
- **价格匹配**：`currentModelKey` 由 `mode` 取；RULE 匹配字段为 **size**，对应表单 **Quality**（`form.quality`：`medium` / `high`）。组件当前使用本地 `modelPricing` 与 `form.quality` 匹配；若对接接口 getPrice，应传 `formFields` 为 `{ duration: 0, quality: '', size: form.quality, batchSize: 1, speed: 'none', scene: 'generate' }`（与接口 rules 字段一致）。

---

### 10. Suno

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

### 11. ElevenLabs

| 前端功能（路由/function） | modelKey                              | 类型  | 单价说明 |
|---------------------------|----------------------------------------|-------|----------|
| Multilingual v2（/multilingual-v2） | `elevenlabs_text_to_speech_multilingual` | ONCE  | 20 credits/1K 字符 |
| Turbo 2.5（/turbo-2-5）   | `elevenlabs_text_to_speech_turbo`      | ONCE  | 10 credits/1K 字符 |
| Speech to Text（/speech-to-text） | `elevenlabs_speech_to_text`         | ONCE  | 6 credits/分钟 |
| Sound Effect v2（/sound-effect-v2） | `elevenlabs_sound_effect`          | ONCE  | 18 credits/分钟 |
| Audio Isolation（/audio-isolation） | `elevenlabs_audio_isolation`        | ONCE  | 21 credits/分钟 |

- **组件**：`components/tools/ElevenLabsTool.vue`
- **映射**：`keyMap` 由 `formData.function`（multilingual-v2 | turbo-2-5 | speech-to-text | sound-effect-v2 | audio-isolation）取 modelKey。
- **展示**：提交按钮旁显示「X credits / 1K」或「X credits / minute」（见组件 `getButtonPrice` 与 `creditsUnitMap`）。

---

### 12. Veo 3

| 前端模式 / 模型     | modelKey     | 类型  | 说明 |
|---------------------|--------------|-------|------|
| Video Extend        | `veo3_extend`| ONCE  | 延展视频 |
| Text/Image to Video（Standard） | `veo3`      | ONCE  | 模型选 veo3 |
| Text/Image to Video（Fast）    | `veo3_fast` | ONCE  | 模型选 veo3_fast |

- **组件**：`components/tools/Veo3Tool.vue`
- **逻辑**：`formData.generationType === 'VIDEO_EXTEND'` 用 `veo3_extend`，否则用 `formData.model`（`veo3` 或 `veo3_fast`）作为 modelKey。
- **SEO minValue/maxValue**：
  - `/home/veo3/extend`：仅取 `veo3_extend`（ONCE，当前为 200/200）。
  - `/home/veo3/text-to-video`、`/home/veo3/reference-to-video`、`/home/veo3/first-and-last-to-video`：按 `Model Type` 兼容 `standard -> veo3` 与 `fast -> veo3_fast`，SEO 区间取两者合并后的最小/最大值（当前为 36/200）。

---

### 13. Runway

| 前端功能   | modelKey         | 类型  | 说明 |
|------------|------------------|-------|------|
| Generate   | `runway_generate`| RULE  | 按 duration、quality 等匹配 |
| Extend     | `runway_extend`  | ONCE  | 延展视频 |
| Aleph      | `runway_aleph`   | ONCE  | Aleph 生成 |

- **组件**：`components/tools/RunwayTool.vue`
- **runway_generate（RULE）**：传入 `formFields`：`duration`（数值秒）、`quality`（如 720p）、`scene: 'generate'`，与 rules 匹配。

---

### 14. Luma

| 前端展示名称 | modelKey | 类型  |
|-------------|----------|-------|
| Luma        | `Luma`   | ONCE  |

- **组件**：`components/tools/LumaTool.vue`

---

### 15. Wan

| 前端模式（mode） | modelKey | 类型 | 说明 |
|------------------|----------|------|------|
| text-to-video | `wan-2-6-text-to-video` | RULE | `getPrice`：`duration`（字符串，与表单 5/10/15 一致）、`quality`（720p/1080p，来自 Resolution） |
| image-to-video | `wan-2-6-image-to-video` | RULE | 同上 |
| video-to-video | `wan-2-6-video-to-video` | RULE | 同上 |
| v2-7-text-to-video | `wan-2-7-text-to-video` | RULE | 定价规则多为 **`duration: 1` = 每秒单价**：`getPrice(modelKey, { duration: 1, quality })`，再 × **输出秒数**（2–15，来自 `durationNum`） |
| v2-7-image-to-video | `wan-2-7-image-to-video` | RULE | 同上 |
| v2-7-video-edit | `wan-2-7-video-edit` | RULE | 同上；计费秒：输出时长为 0 时按源视频可读时长（2–10），否则按所选秒数 clamp 到 2–10；无视频时展示用 2s、仅有 URL 无元数据用 5s 估算 |
| v2-7-r2v | `wan-2-7-r2v` | RULE | 同上；计费秒 = clamp(`durationNum`, 2, 10) |
| 2-7-image | `wan-2-7-image` | RULE | `quality`（分辨率档位）、`batchSize`（`n`）；不传 `scene` |
| 2-7-image-pro | `wan-2-7-image-pro` | RULE | 同上 |

- **组件**：`components/tools/WanTool.vue`
- **映射**：`wanPriceModelKeyMap` 由 `mode` 取 modelKey。

---

### 16. Seedance

| 前端模式（tab）              | modelKey                                | 类型  | 说明 |
|------------------------------|-----------------------------------------|-------|------|
| v1-lite-text-to-video        | `seedance-v1-lite-text-to-video`        | RULE  | 按 duration、quality(480p/720p/1080p) 匹配 |
| v1-lite-image-to-video       | `seedance-v1-lite-image-to-video`        | RULE  | 同上 |
| v1-pro-text-to-video         | `seedance-v1-pro-text-to-video`         | RULE  | 同上 |
| v1-pro-image-to-video        | `seedance-v1-pro-image-to-video`        | RULE  | 同上 |
| v1-pro-fast-image-to-video   | `seedance-v1-pro-fast-image-to-video`    | RULE  | 同上 |
| v1-5-pro                     | `seedance-1.5-pro`                      | RULE  | 按 duration(4/8/12)、quality(480p/720p/1080p)、scene(with_sound/without_sound) 匹配；图生时支持可选 inputUrls(0-2) |
| seedance-2-fast | `seedance-2-fast` | RULE | **`duration: 1` = 每秒单价**；`getPrice(modelKey, { duration: 1, quality: 480p\|720p, scene })`，`scene` 为 `with_video`（已上传参考视频）或 `without_video`；总价 = `perSecond × (有参考视频 ? ceil(参考视频时长)+输出时长 : 仅输出时长)`，输出时长 clamp 4–15 |
| seedance-2 | `seedance-2` | RULE | 与 `seedance-2-fast` 相同计价逻辑 |

- **组件**：`components/tools/SeedanceTool.vue`
- **映射**：`seedancePriceModelKeyMap` 由 `mode` 取 modelKey。
- **formFields（v1 系列）**：`{ duration: formData.duration, quality: formData.resolution }`；`v1-5-pro` 额外传 `scene`（`generateAudio=true -> with_sound`，否则 `without_sound`）。
- **v1.5 Pro 参数补充**：`prompt` 必填（3-2500）；`inputUrls` 可选（0-2）；`aspectRatio` 默认 `1:1`；`resolution` 默认 `720p`；`duration` 默认 `8`；支持 `fixedLens` 与 `generateAudio`。

---

### 17. Hailuo

| 前端模式（tab）            | modelKey                                | 类型  | 说明 |
|----------------------------|-----------------------------------------|-------|------|
| image-to-video-standard    | `hailuo-2-3-image-to-video-standard`    | RULE  | 按 duration、quality(768p/1080p)、scene 匹配 |
| image-to-video-pro         | `hailuo-2-3-image-to-video-pro`         | RULE  | 同上 |

- **组件**：`components/tools/HailuoTool.vue`
- **modelKey**：由 `mode`（`image-to-video-standard` / `image-to-video-pro`）取。
- **formFields**：`{ duration: Number(formData.duration), quality: String(formData.resolution).toLowerCase(), scene: 'generate' }`（如 768p、1080p）。

---

### 18. Kling

| 前端模式（tab）                  | modelKey                                | 类型  | 说明 |
|----------------------------------|-----------------------------------------|-------|------|
| v2-5-turbo-image-to-video-pro    | `kling-v2-5-turbo-image-to-video-pro`   | RULE  | 按 duration、scene: generate 匹配 |
| v2-5-turbo-text-to-video-pro     | `kling-v2-5-turbo-text-to-video-pro`    | RULE  | 同上 |
| v2-6-text-to-video               | `kling-2.6-text-to-video`              | RULE  | 按 duration、scene(with_sound/without_sound) 匹配 |
| v2-6-image-to-video              | `kling-2.6-image-to-video`              | RULE  | 同上 |
| v2-6-motion-control              | `kling-2.6-motion-control`              | RULE  | 按 duration、quality(720p/1080p)、scene: generate 匹配 |
| v3-0-motion-control              | `kling-3.0-motion-control`              | RULE  | 按 duration(上传视频时长)、quality(720p/1080p)、scene: generate 匹配；std→720p，pro→1080p |
| ai-avatar-standard               | `kling-ai-avatar-standard`              | ONCE  | |
| ai-avatar-pro                    | `kling-ai-avatar-pro`                   | ONCE  | |
| v3-0-video                       | `kling-3.0-video`                       | RULE  | 按 duration、size(std/pro)、scene 匹配；多镜头为 shots duration 之和 |

- **组件**：`components/tools/KlingTool.vue`
- **v2.5 Turbo**：`formFields` 为 `{ duration: formData.duration, scene: 'generate' }`。
- **2.6 Text/Image to Video**：`scene` 由 `formData.sound` 得 `with_sound` 或 `without_sound`；`formFields` 含 `duration`、`scene`。
- **2.6 Motion Control**：`formFields` 为 `{ duration, quality: formData.mode }`（如 720p）、`scene: 'generate'`。
- **3.0 Motion Control**：`formFields` 为 `{ duration, quality, scene: 'generate' }`，其中 `duration` 取上传视频时长，`quality` 由 `mode` 映射（`std -> 720p`，`pro -> 1080p`）。
- **AI Avatar**：ONCE，无需 formFields。
- **3.0 Video**：`formFields` 含 `duration`（单镜头为第一条 prompt 的 duration，多镜头为各 shot duration 之和）、`size: formData.kling_mode`（std/pro）、`scene`。

---

### 19. Grok

| 前端模式（tab） | modelKey | 类型 | 说明 |
|-----------------|----------|------|------|
| text-to-image | `grok-imagine-text-to-image` | ONCE / RULE | `getPrice(modelKey)`，无额外 formFields |
| image-to-image | `grok-imagine-image-to-image` | ONCE / RULE | 同上 |
| text-to-video | `grok-imagine-text-to-video` | RULE | `getPrice(modelKey, { duration: form.duration, quality: form.resolution })` |
| image-to-video | `grok-imagine-image-to-video` | RULE | 同上 |
| upscale | `grok-imagine-upscale` | ONCE / RULE | `getPrice(modelKey)` |
| extend | `grok-imagine-extend` | RULE | `getPrice(modelKey, { duration: form.duration, quality: form.resolution })` |

- **组件**：`components/tools/GrokToolCore.vue`
- **映射**：`grokPriceModelKeyMap` 由 `mode` 取 modelKey。

---

### 20. Sora

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
| `nano-banana-2`             | quality（resolution：1K/2K/4K）、duration、size、batchSize、speed、scene |
| `midjourney_imagine`        | speed（relaxed/fast/turbo）、duration、quality、size、batchSize、scene |
| `flux-2-*` / `flux-2-pro-*` | quality（1K/2K）、scene |
| `seedream-5-lite-text-to-image` / `seedream-5-lite-image-to-image` | aspectRatio、quality（接口为 ONCE 时仍可传，多余字段不参与匹配） |
| `ideogram-v3-*` / `ideogram-character*` | speed（TURBO/BALANCED/QUALITY）、scene |
| `gpt-image-1.5-text-to-image` / `gpt-image-1.5-image-to-image` | size（medium/high，对应 Quality） |
| `wan-2-6-text-to-video` / `wan-2-6-image-to-video` / `wan-2-6-video-to-video` | duration、quality（720p/1080p） |
| `wan-2-7-text-to-video` / `wan-2-7-image-to-video` / `wan-2-7-video-edit` / `wan-2-7-r2v` | 展示价：`duration: 1` + quality 取**每秒单价**，再乘计费秒（见上文「### 15. Wan」） |
| `wan-2-7-image` / `wan-2-7-image-pro` | quality、batchSize |
| `seedance-v1-*`             | duration、quality（480p/720p/1080p） |
| `seedance-1.5-pro`          | duration、quality、scene（with_sound/without_sound） |
| `seedance-2-fast` / `seedance-2` | 展示价：`duration: 1` + quality（480p/720p）+ scene（with_video/without_video），再乘秒数（见上文「### 16. Seedance」） |
| `hailuo-2-3-image-to-video-*` | duration、quality（768p/1080p）、scene |
| `grok-imagine-text-to-video` / `grok-imagine-image-to-video` / `grok-imagine-extend` | duration、quality |
| `kling-v2-5-turbo-*`        | duration、scene: generate |
| `kling-2.6-text-to-video` / `kling-2.6-image-to-video` | duration、scene（with_sound/without_sound） |
| `kling-2.6-motion-control`  | duration、quality（720p/1080p）、scene |
| `kling-3.0-motion-control`  | duration（上传视频时长）、quality（720p/1080p，std/pro 映射）、scene |
| `kling-3.0-video`           | duration、size（std/pro）、scene |
| `runway_generate`           | duration、quality（如 720p）、scene |
| `qwen-text-to-image` / `qwen-image-edit` | imageSize；`qwen-image-edit` 另 numImages |
| `qwen-z-image`              | aspectRatio |
| `qwen2-text-to-image` / `qwen2-image-edit` | 以接口 rules 为准；无匹配字段时传 `{}` |
| `sora-2-pro-storyboard`     | duration（Frames）、scene |
| `sora-2-pro-text-to-video` | duration（Frames）、size（standard/high） |
| `sora-2-pro-image-to-video`| duration（Frames）、size（standard/high） |

---

## 四、前端用法摘要

- **拉取价格**：页面挂载时调用 `fetchPrices()`（内部请求 `GET /api/common/models/price`，带缓存）。
- **取价**：`getPrice(modelKey, formFields?)`，ONCE 不传 `formFields`，RULE 传与规则一致的字段对象。
- **展示**：`formatCredits(credits)` 得到字符串（如 `"20"`），再拼到按钮文案（如 `"Generate (20)"`）。

后端需保证返回的 modelKey 与上表一致，RULE 的 `rules` 中字段名与前端传入的 `formFields` 一致（如 `duration`、`quality`、`size`、`scene` 等），才能正确匹配并展示 credits。
