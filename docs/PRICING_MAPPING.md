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
| Flux 3 Klein Text to Image | `flux-3-klein-text-to-image` | RULE | 单张价按 quality(1K/2K/4K) 命中 × 张数(1–4) |
| Flux 3 Klein Edit Image | `flux-3-klein-edit-image` | RULE | 同上；1–10 参考图 |

- **组件**：`components/tools/FluxKontextTool.vue`
- **modelKey 以本表为准**（下划线）。表单里 `formData.model` 为 `'flux-kontext-pro'` 或 `'flux-kontext-max'`（连字符），分别对应上表两个 modelKey。
- 若定价接口返回的 key 为连字符形式（如 `flux-kontext-pro`），前端 `getPrice` / `useToolSEOAsync` 会做下划线↔连字符兼容查找。
- **Flux 2 系列（RULE）**：`quality = flux2Form.resolution`（`1K` / `2K`）；`getPrice` 另传 `scene: 'generate'` 与接口 rules 对齐（见 `FluxKontextTool.vue`）。
- **Flux 3 Klein 系列（RULE，2 mode）**：`modelKey` 直接取 tab（`flux-3-klein-text-to-image` / `flux-3-klein-edit-image`）。**底部价格 = 单张 credits × clamp(numImages, 1, 4)**，与 wan-image / ideogram / qwen-image-edit 批量价口径一致。单张价取法：`getPrice(modelKey, { quality: flux3KleinForm.resolution, numImages: '1', scene: 'generate' })`，若后端 rules 未配 `numImages` 维度则回退 `getPrice(modelKey, { quality: flux3KleinForm.resolution, scene: 'generate' })`；`quality` 取值为 `1K` / `2K` / `4K`（与后端 DTO `resolution` 字段 `@Pattern` 一致）。body 仍照常发送 `resolution` 与 `numImages`（实际出图张数），仅底部展示价做「单张 × 张数」乘算。切换 Resolution 或 Number of Images 时 `fluxKontextPriceText` 实时重算。

---

### 3. Nano Banana

| 前端展示名称 / 模式     | modelKey          | 类型  | 说明 |
|-------------------------|-------------------|-------|------|
| Nano Banana（文生图）   | `nano-banana`     | ONCE  | 普通生成 |
| Nano Banana（图生图）  | `nano-banana-edit`| ONCE  | 编辑模式 |
| Nano Banana Pro        | `nano-banana-pro` | RULE  | 按 resolution(quality) 等匹配 |
| Nano Banana 2          | `nano-banana-2`   | RULE  | 按 resolution 映射 quality（1K/2K/4K），scene: generate |
| Nano Banana 2 Lite     | `nano-banana-2-lite` | ONCE | 单档固定价，`getPrice(key)` 直接取 `once.credits` |
| Nano Banana 2.1        | `nano-banana-2-1` | RULE  | 按 resolution 映射 quality（1K/2K/4K），scene: generate |

- **组件**：`components/tools/NanoBananaTool.vue`
- **Nano Banana**：由 `formData.mode === 'image-to-image'` 决定用 `nano-banana-edit` 还是 `nano-banana`。
- **Nano Banana Pro（RULE）**：表单 **Resolution** 映射到规则字段 **quality**（1K/2K/4K）。传入 `formFields` 为 `quality: proFormData.resolution`、`duration: 0`、`size: ''`、`batchSize: 1`、`speed: 'none'`、`scene: 'generate'`，与 rules 匹配。
- **Nano Banana 2（RULE）**：`quality = resolution`（1K/2K/4K）；传入 `scene: 'generate'`。其余参数（`aspect_ratio`、`image_input`、`output_format`）不参与价格匹配。
- **Nano Banana 2 Lite（ONCE）**：文生图/图生图合一、单档固定价。`nanoBanana2LitePriceText` 直接 `getPrice('nano-banana-2-lite')`，**不传 formFields**（ONCE 忽略匹配字段）。body 传 `imageUrls`（0–10 可选）、必填 `aspectRatio`，无 `resolution` / `outputFormat`。
- **Nano Banana 2.1（RULE）**：与 Pro / Nano Banana 2 同款口径，`quality = nano21FormData.resolution`（1K/2K/4K）为计费维度；传 `duration: 0`、`size: ''`、`batchSize: 1`、`speed: 'none'`、`scene: 'generate'`。body 传 `imageInput`（0–10 可选）、必填 `resolution`、可选 `aspectRatio`（默认 auto）、`outputFormat`（默认 jpg）。

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
| 5 Pro Text to Image      | `seedream-5-pro-text-to-image`     | RULE  | 文生图：`quality`（1K/2K，来自 Resolution） |
| 5 Pro Image to Image     | `seedream-5-pro-image-to-image`    | RULE  | 同上；1–10 参考图（每张 ≤30MB） |
| 5 Pro Layer Decomposition | `seedream-5-pro-layer-decomposition` | RULE | 图层拆解：`quality`（1K/1.5K/2K） |
| 5 Flash Text to Image    | `seedream-5-flash-text-to-image`   | RULE  | 文生图：`quality`（1K/1.5K/2K，三档同价） |
| 5 Flash Image to Image   | `seedream-5-flash-image-to-image`  | RULE  | 同上；1–10 参考图 |
| 5 Flash Layer Decomposition | `seedream-5-flash-layer-decomposition` | RULE | 图层拆解：`quality`（1K/1.5K/2K，三档同价） |

- **组件**：`components/tools/SeedreamTool.vue`
- **映射**：`seedreamPriceModelKeyMap` 由 `mode` 取 modelKey。
- **formFields**：Lite 两个 mode 传 `{ aspectRatio: formData.aspectRatio, quality: formData.quality }`；接口为 ONCE 时忽略，为 RULE 时与 rules 匹配。
- **新家族（5 Pro / 5 Flash，共 6 mode）**：计价统一 **`resolution → quality`**：`getPrice(modelKey, { quality: formData.resolution })`，与 Qwen 新家族同款。取值与后端 DTO `@Pattern` 一致：Pro 文生图/图生图为 `1K|2K`，Pro 图层拆解与 Flash 全系为 `1K|1.5K|2K`（Flash 三档同价，但字段必传，不做隐式兜底）。字段差异：t2i/i2i 必填 `aspectRatio`（8 档，无 auto）+ 可选 `outputFormat`（png/jpeg）+ `nsfwChecker`；i2i 传 `imageUrls`（1–10）；图层拆解传 `imageUrl`（恰好 1 张）+ 可选 `prompt`（Pro ≤5000、Flash 4–5000，支持 `<bbox>` 坐标），拆解图层固定 PNG。

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
| qwen21-text-to-image | `qwen2-1-text-to-image` | RULE | Qwen2.1 文生图：`quality`（1K/2K，来自 Resolution） |
| qwen21-image-to-image | `qwen2-1-image-to-image` | RULE | 同上；1–10 参考图 + 可选 mask（local-edit） |
| qwen3-text-to-image | `qwen3-text-to-image` | RULE | Qwen3 文生图：`quality`（1K/2K） |
| qwen3-image-to-image | `qwen3-image-to-image` | RULE | 同上；1–3 输入图 |
| qwen3-pro-text-to-image | `qwen3-pro-text-to-image` | RULE | 同 `qwen3-text-to-image`，仅 key 不同 |
| qwen3-pro-image-to-image | `qwen3-pro-image-to-image` | RULE | 同 `qwen3-image-to-image`，仅 key 不同 |

- **组件**：`components/tools/QwenTool.vue`
- **映射**：`qwenPriceModelKeyMap` 由 `mode` 取 modelKey。
- **formFields（RULE 时）**：`text-to-image` / `image-edit` 传 `imageSize`；`z-image` 传 `aspectRatio`。其余旧 mode 传空对象，以接口 rules 为准。
- **image-edit 多图总价（与 wan-image 的 `batchSize` / ideogram 逻辑一致）**：`qwen-image-edit` 支持 `numImages`（1–4）。底部价格 = **单张 credits × clamp(numImages, 1, 4)**。单张价取法：`getPrice(modelKey, { imageSize, numImages: '1' })`，若后端未配 `numImages` 维度则回退 `getPrice(modelKey, { imageSize })`。切换 Number of images 时 `qwenPriceText` 实时重算。
- **新家族（v2.1 / v3 / v3 Pro，共 6 mode）**：计价统一 **`resolution → quality`**：`getPrice(modelKey, { quality: formData.resolution })`，`quality` 取值为 `1K` / `2K`（大写，与后端 DTO `@Pattern(regexp="1K|2K")` 一致；4K 厂商拒单）。字段差异：v2.1 用 `aspectRatio`（含 auto，仅 i2i）+ `enhancePrompt` + `background`（opaque/transparent）+ `outputFormat`（png/webp/jpeg）；v3 / v3 Pro 用 `imageSize`（8 档，缺省 16:9）+ `promptExtend` + `negativePrompt`（≤5000）+ `outputFormat`（png/jpeg）。

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
- **所有模式（RULE）**：统一传入 `formFields` 为 `{ speed: form.rendering_speed, scene: 'generate' }`，取**单张** credits。`rendering_speed` 对应 rules 的 `speed`（如 TURBO、BALANCED、QUALITY）。
- **多图总价（与 wan-image 的 `batchSize` 逻辑一致）**：`v3-remix / v3-reframe / character / character-edit / character-remix` 支持 `num_images`（1–4）。底部价格 = `单张 credits × clamp(num_images, 1, 4)`；`v3-text-to-image / v3-edit` 不显示张数控件，按 1 张计价。切换 Number of images 时 `ideogramCreditsText` 实时重算。

---

### 8. Imagen4

| 前端模式（tab）   | modelKey           | 类型  | 说明 |
|-------------------|--------------------|-------|------|
| imagen4-generate  | `imagen4-generate` | ONCE / RULE | 常规生成 |
| imagen4-fast      | `imagen4-fast`     | ONCE / RULE | 快速生成（固定单张，已移除 Num Images 字段，body 不再传 numImages） |
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
| v2-text-to-image  | `gpt-image-2-text-to-image`      | RULE  | 按 resolution（1K/2K/4K）匹配，接口 rules 口径为 quality |
| v2-image-to-image | `gpt-image-2-image-to-image`     | RULE  | 同上 |
| v2-5-flare-text-to-image | `gpt-image-2-5-flare-text-to-image` | RULE | 按 resolution（1K/2K/4K，DTO 必传）匹配；宽高比与 background 不参与计价 |
| v2-5-flare-image-to-image | `gpt-image-2-5-flare-image-to-image` | RULE | 同上；inputUrls 可选（≤16），不影响价格 |
| v2-5-sunburst-text-to-image | `gpt-image-2-5-sunburst-text-to-image` | RULE | 按 resolution 匹配 |
| v2-5-sunburst-image-to-image | `gpt-image-2-5-sunburst-image-to-image` | RULE | 同上 |

- **组件**：`components/tools/GPTImageTool.vue`
- **价格匹配**：`currentModelKey` 由 `MODE_CONFIG` 按 mode 取；1.5 的 RULE 匹配字段为 **size**（对应表单 Quality），v2 / 2.5 的 RULE 匹配字段为 **resolution**（接口 rules 沿用 `quality` 口径，故 formFields 传 `{ quality: form.resolution, duration: 0, size: '', batchSize: 1, speed: 'none', scene: 'generate' }`）。
- **2.5 取价优先级**：先调 `/api/common/models/price`（`fetchPrices` + `getPrice`）；接口未返回该 modelKey 时回落组件内本地 `modelPricing` 兜底表（1K/2K/4K 三档，与 v2 同构造），后端正式定价上线后无需改前端。
- **2.5 约束**：resolution 必传（1K/2K/4K）；background（transparent/opaque/auto）与 27:16 / 16:27 / 9:8 / 8:9 四个宽高比仅 1K 支持，切到 2K/4K 时表单会自动清理这些选项，避免后端校验失败。

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
| v3-0-video | `wan-3-0-video` | RULE | **`duration: 1` = 每秒单价**：`getPrice(modelKey, { duration: 1, quality })`（quality 为小写 `480p`/`720p`/`1080p`，来自 Resolution；厂商枚举大写由后端 service 转），再 × 计费秒数 = clamp(`durationNum`, 2, 30)；`audio`（音轨开关）不影响单价，仅按分辨率计价。统一入口：内部 text/first-last frame/reference/file/link 五种输入模式共用同一 modelKey |
| v3-0-video-prime | `wan-3-0-video-prime` | RULE | 高速版，入参契约与计价逻辑与 `wan-3-0-video` 完全一致，仅 modelKey 不同：`getPrice(modelKey, { duration: 1, quality })`（quality 小写 480p/720p/1080p）× clamp(`durationNum`, 2, 30) |
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
| v3-turbo-text-to-video            | `kling-v3-turbo-text-to-video`          | RULE  | **`duration: 1` = 每秒单价**：`getPrice(modelKey, { duration: 1, quality })`（quality 720p/1080p）再乘 3–15s 秒数 |
| v3-turbo-image-to-video           | `kling-v3-turbo-image-to-video`         | RULE  | 同上；1 张参考图，输出跟随输入帧 |
| v2-6-text-to-video               | `kling-2.6-text-to-video`              | RULE  | 按 duration、scene(with_sound/without_sound) 匹配 |
| v2-6-image-to-video              | `kling-2.6-image-to-video`              | RULE  | 同上 |
| v2-6-motion-control              | `kling-2.6-motion-control`              | RULE  | 按 duration、quality(720p/1080p)、scene: generate 匹配 |
| v3-0-motion-control              | `kling-3.0-motion-control`              | RULE  | 按 duration(上传视频时长)、quality(720p/1080p)、scene: generate 匹配；std→720p，pro→1080p |
| ai-avatar-standard               | `kling-ai-avatar-standard`              | ONCE  | |
| ai-avatar-pro                    | `kling-ai-avatar-pro`                   | ONCE  | |
| v3-0-video                       | `kling-3.0-video`                       | RULE  | 按 duration、size(std/pro/4k)、scene 匹配；多镜头为 shots duration 之和 |
| 3-0-omni-text-to-video            | `kling-3.0-omni-text-to-video`          | RULE  | **`duration: 1` = 每秒单价**：`getPrice(modelKey, { duration: 1, quality, scene })`（quality 720p/1080p/4k；scene no_audio/with_audio）再乘计费秒 |
| 3-0-omni-image-to-video           | `kling-3.0-omni-image-to-video`         | RULE  | 同上；1 张首帧图，单/智能镜头 aspect=auto |
| 3-0-omni-reference-to-video       | `kling-3.0-omni-reference-to-video`     | RULE  | 同上；scene 额外支持 `with_video`（存在参考视频时，此时 audio 不生效） |
| 3-0-omni-transformation           | `kling-3.0-omni-transformation`         | RULE  | **按实际时长匹配（非每秒）**：`getPrice(modelKey, { duration: 向上取整的上传视频秒数, quality })`；无 scene；未上传视频时按 5s 展示 |

- **组件**：`components/tools/KlingTool.vue`
- **v2.5 Turbo**：`formFields` 为 `{ duration: formData.duration, scene: 'generate' }`。
- **V3 Turbo（每秒）**：`formFields` 为 `{ duration: 1, quality: formData.v3tbo_resolution }`（`720p`/`1080p`）取每秒单价，再乘 clamp(3,15) 计费秒；text 模式带 `aspectRatio`，image 模式无 `aspectRatio`（跟随输入帧）。
- **2.6 Text/Image to Video**：`scene` 由 `formData.sound` 得 `with_sound` 或 `without_sound`；`formFields` 含 `duration`、`scene`。
- **2.6 Motion Control**：`formFields` 为 `{ duration, quality: formData.mode }`（如 720p）、`scene: 'generate'`。
- **3.0 Motion Control**：`formFields` 为 `{ duration, quality, scene: 'generate' }`，其中 `duration` 取上传视频时长，`quality` 由 `mode` 映射（`std -> 720p`，`pro -> 1080p`）。
- **AI Avatar**：ONCE，无需 formFields。
- **3.0 Video**：`formFields` 含 `duration`（单镜头为第一条 prompt 的 duration，多镜头为各 shot duration 之和）、`size: formData.kling_mode`（std/pro/4k，直接透传生成模式档位）、`scene`。
- **3.0 Omni（每秒，三变体 text/image/reference）**：`formFields` 为 `{ duration: 1, quality: formData.omni_resolution, scene }`；`quality` 小写 `720p`/`1080p`/`4k`；`scene` 由 audio 与参考视频映射：reference 且 `omni_ref_video_urls` 非空 → `with_video`，否则 `omni_audio ? 'with_audio' : 'no_audio'`。计费秒 = 自定义多镜头（`omni_shot_mode==='custom'`）时各 shot 之和，否则 `omni_duration`，clamp(3,15)。
- **3.0 Omni Video Transformation（按实际时长，非每秒）**：`formFields` 为 `{ duration: omniTransBillSec, quality: formData.omni_resolution }`，**无 scene**。`omniTransBillSec` = 上传源视频实际时长的 `Math.ceil`，clamp(3,15)；未读取到时长（未上传）时默认 5 用于展示。表单不显示 duration 选择器。

---

### 19. Grok

| 前端模式（tab） | modelKey | 类型 | 说明 |
|-----------------|----------|------|------|
| text-to-image | `grok-imagine-text-to-image` | ONCE / RULE | `getPrice(modelKey)`，无额外 formFields |
| image-to-image | `grok-imagine-image-to-image` | ONCE / RULE | 同上 |
| image-2-0-text-to-image | `grok-imagine-image-2-0-text-to-image` | ONCE | `getPrice(modelKey)`，无 formFields；prompt≤8000、aspectRatio 必填（1:1/2:3/3:2/16:9/9:16） |
| image-2-0-image-edit | `grok-imagine-image-2-0-image-edit` | ONCE | 同上；prompt 可选≤8000、imageUrls 1–5、aspectRatio 必填（含 auto） |
| image-2-0-segment-edit | `grok-imagine-image-2-0-segment-edit` | ONCE | 同上；prompt 必填≤65000、taskId 必填（extend-list 取 `grok-imagine-image-2-0-text-to-image`）、maskIndexs 可选 |
| text-to-video | `grok-imagine-text-to-video` | RULE | `getPrice(modelKey, { duration: form.duration, quality: form.resolution })` |
| image-to-video | `grok-imagine-image-to-video` | RULE | 同上 |
| video-1-5-preview | `grok-imagine-video-1-5-preview` | RULE | `getPrice(modelKey, { duration: 1, quality: form.resolution })` 取**每秒单价**，再乘所选 1-15s 时长（统一入口，resolution 仅 480p/720p） |
| upscale | `grok-imagine-upscale` | RULE | `getPrice(modelKey, { quality: 源任务分辨率, duration: 源任务时长, scene: form.scene })`（scene 取 `upscale-720p`/`upscale-1080p`；源为 1080p 时拦截） |
| extend | `grok-imagine-extend` | RULE | `getPrice(modelKey, { duration: form.duration, quality: form.resolution })` |

- **组件**：`components/tools/GrokToolCore.vue`
- **映射**：`grokPriceModelKeyMap` 由 `mode` 取 modelKey。
- **Image 2.0 三模型**（`image-2-0-text-to-image` / `image-2-0-image-edit` / `image-2-0-segment-edit`）均为 **ONCE 单档直接取价**，底部价各自独立展示；DTO 无 duration/resolution 计费维度，故 `getPrice(modelKey)` 不传 formFields。
- **segment-edit 的 taskId**：复用 `/api/records/extend-list`，按 `image-2-0-segment-edit` 模式将请求 model 切为 `grok-imagine-image-2-0-text-to-image`（与 upscale/extend 复用同一套缓存/登录守卫，缓存按 model 分 key）。

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

### 21. HappyHorse

| 前端模式（mode） | modelKey | 类型 | 说明 |
|--------------------|----------|------|------|
| v1-text-to-video | `happyhorse-text-to-video` | RULE | **`duration: 1` = 每秒单价**：`getPrice(modelKey, { duration: 1, quality, scene: 'generate' })`（quality 小写 `720p`/`1080p`），再乘计费秒 = clamp(时长, 3, 15) |
| v1-image-to-video | `happyhorse-image-to-video` | RULE | 同上 |
| v1-reference-to-video | `happyhorse-reference-to-video` | RULE | 同上 |
| v1-video-edit | `happyhorse-video-edit` | RULE | 每秒单价 × 源视频 ceil 秒数（clamp 3–60） |
| v1-1-text-to-video | `happyhorse-1-1-text-to-video` | RULE | 高速版同 v1 每秒计价，仅 modelKey 不同；宽高比九档、厂商不接受 seed（不影响计价） |
| v1-1-image-to-video | `happyhorse-1-1-image-to-video` | RULE | 同上 |
| v1-1-reference-to-video | `happyhorse-1-1-reference-to-video` | RULE | 同上（字段 referenceImage，≤9 张） |

- **组件**：`components/tools/HappyHorseTool.vue`
- **计价一致**：v1 与 v1.1 生成类模式均 `getPrice(modelKey, { duration: 1, quality, scene: 'generate' })` 取每秒单价，再乘 clamp(3, 15) 计费秒。

---

## 三、RULE 匹配字段速查

| modelKey                    | 参与匹配的表单字段说明 |
|-----------------------------|------------------------|
| `nano-banana-pro`           | quality（resolution：1K/2K/4K）、duration、size、batchSize、speed、scene |
| `nano-banana-2`             | quality（resolution：1K/2K/4K）、duration、size、batchSize、speed、scene |
| `nano-banana-2-1`           | quality（resolution：1K/2K/4K）、duration、size、batchSize、speed、scene |
| `midjourney_imagine`        | speed（relaxed/fast/turbo）、duration、quality、size、batchSize、scene |
| `flux-2-*` / `flux-2-pro-*` | quality（1K/2K）、scene |
| `flux-3-klein-text-to-image` / `flux-3-klein-edit-image` | quality（1K/2K/4K）、scene；底部展示价 = 单张价 × numImages（1–4），可先传 `numImages: '1'` 命中失败则回退不传 |
| `seedream-5-lite-text-to-image` / `seedream-5-lite-image-to-image` | aspectRatio、quality（接口为 ONCE 时仍可传，多余字段不参与匹配） |
| `seedream-5-pro-*` / `seedream-5-flash-*` | quality（1K/1.5K/2K，来自表单 Resolution） |
| `ideogram-v3-*` / `ideogram-character*` | speed（TURBO/BALANCED/QUALITY）、scene |
| `gpt-image-1.5-text-to-image` / `gpt-image-1.5-image-to-image` | size（medium/high，对应 Quality） |
| `gpt-image-2-*` / `gpt-image-2-5-flare-*` / `gpt-image-2-5-sunburst-*` | resolution（1K/2K/4K，接口 rules 以 quality 字段承载） |
| `wan-2-6-text-to-video` / `wan-2-6-image-to-video` / `wan-2-6-video-to-video` | duration、quality（720p/1080p） |
| `wan-2-7-text-to-video` / `wan-2-7-image-to-video` / `wan-2-7-video-edit` / `wan-2-7-r2v` | 展示价：`duration: 1` + quality 取**每秒单价**，再乘计费秒（见上文「### 15. Wan」） |
| `wan-2-7-image` / `wan-2-7-image-pro` | quality、batchSize |
| `wan-3-0-video` | 展示价：`duration: 1`（每秒单价）+ quality（480p/720p/1080p，小写），再乘 2–30s 秒数 |
| `wan-3-0-video-prime` | 同 `wan-3-0-video`（高速版，仅 key 不同） |
| `seedance-v1-*`             | duration、quality（480p/720p/1080p） |
| `seedance-1.5-pro`          | duration、quality、scene（with_sound/without_sound） |
| `seedance-2-fast` / `seedance-2` | 展示价：`duration: 1` + quality（480p/720p）+ scene（with_video/without_video），再乘秒数（见上文「### 16. Seedance」） |
| `hailuo-2-3-image-to-video-*` | duration、quality（768p/1080p）、scene |
| `grok-imagine-text-to-video` / `grok-imagine-image-to-video` / `grok-imagine-extend` | duration、quality |
| `grok-imagine-video-1-5-preview` | 展示价：`duration: 1`（每秒单价）+ quality（480p/720p），再乘 1-15s 秒数 |
| `grok-imagine-upscale` | duration（源任务时长）、quality（源任务分辨率）、scene（`upscale-720p`/`upscale-1080p`） |
| `kling-v2-5-turbo-*`        | duration、scene: generate |
| `kling-2.6-text-to-video` / `kling-2.6-image-to-video` | duration、scene（with_sound/without_sound） |
| `kling-2.6-motion-control`  | duration、quality（720p/1080p）、scene |
| `kling-3.0-motion-control`  | duration（上传视频时长）、quality（720p/1080p，std/pro 映射）、scene |
| `kling-3.0-video`           | duration、size（std/pro/4k）、scene |
| `kling-v3-turbo-text-to-video` / `kling-v3-turbo-image-to-video` | 展示价：`duration: 1`（每秒单价）+ quality（720p/1080p），再乘 3–15s 秒数 |
| `kling-3.0-omni-text-to-video` / `kling-3.0-omni-image-to-video` / `kling-3.0-omni-reference-to-video` | 展示价：`duration: 1`（每秒单价）+ quality（720p/1080p/4k）+ scene（no_audio/with_audio，reference 额外 with_video），再乘 3–15s 秒数 |
| `kling-3.0-omni-transformation` | duration（**上传视频实际时长向上取整**，非每秒单价、无 scene）、quality（720p/1080p/4k）；未上传时按 5s 展示 |
| `runway_generate`           | duration、quality（如 720p）、scene |
| `qwen-text-to-image` / `qwen-image-edit` | imageSize（`image-edit` 底部价 = 单张价 × numImages，1–4） |
| `qwen-z-image`              | aspectRatio |
| `qwen2-text-to-image` / `qwen2-image-edit` | 以接口 rules 为准；无匹配字段时传 `{}` |
| `qwen2-1-text-to-image` / `qwen2-1-image-to-image` / `qwen3-text-to-image` / `qwen3-image-to-image` / `qwen3-pro-text-to-image` / `qwen3-pro-image-to-image` | quality（1K/2K，来自表单 Resolution） |
| `sora-2-pro-storyboard`     | duration（Frames）、scene |
| `sora-2-pro-text-to-video` | duration（Frames）、size（standard/high） |
| `sora-2-pro-image-to-video`| duration（Frames）、size（standard/high） |
| `happyhorse-text-to-video` / `happyhorse-image-to-video` / `happyhorse-reference-to-video` | 展示价：`duration: 1`（每秒单价）+ quality（720p/1080p，小写）+ scene（`generate`），再乘 3–15s 秒数 |
| `happyhorse-video-edit` | 每秒单价 × 源视频 ceil 秒数（3–60） |
| `happyhorse-1-1-text-to-video` / `happyhorse-1-1-image-to-video` / `happyhorse-1-1-reference-to-video` | 同 v1 生成类（`duration: 1` 每秒单价 + quality 小写 + scene:generate），仅 key 不同 |

---

## 四、前端用法摘要

- **拉取价格**：页面挂载时调用 `fetchPrices()`（内部请求 `GET /api/common/models/price`，带缓存）。
- **取价**：`getPrice(modelKey, formFields?)`，ONCE 不传 `formFields`，RULE 传与规则一致的字段对象。
- **展示**：`formatCredits(credits)` 得到字符串（如 `"20"`），再拼到按钮文案（如 `"Generate (20)"`）。

后端需保证返回的 modelKey 与上表一致，RULE 的 `rules` 中字段名与前端传入的 `formFields` 一致（如 `duration`、`quality`、`size`、`scene` 等），才能正确匹配并展示 credits。
