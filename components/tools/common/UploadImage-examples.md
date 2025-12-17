# UploadImage 组件使用示例

## 使用示例：

1. GPT-4o Image 工具使用：
<UploadImage
  input-id="gpt4o-reference-images"
  label="参考图片 (可选)"
  upload-icon="fas fa-cloud-upload-alt"
  upload-text="点击上传参考图片"
  upload-hint="支持 .jfif, .jpeg, .jpg, .png, .webp (最多5张)"
  :max-files="5"
  :max-file-size="10 * 1024 * 1024"
  additional-hint="上传参考图片来指导生成方向"
  theme-color="#10b981"
  @update:files="handleReferenceImages"
/>

2. Midjourney 工具使用：
<UploadImage
  input-id="mj-reference-images"
  label="参考图片 (可选)"
  upload-icon="fas fa-image"
  upload-text="上传参考图片"
  upload-hint="支持 .jpg, .png, .webp (最多2张)"
  :max-files="2"
  :max-file-size="5 * 1024 * 1024"
  additional-hint="参考图片会影响生成风格"
  theme-color="#ff6b6b"
  @update:files="handleMjImages"
/>

3. Luma 工具使用：
<UploadImage
  input-id="luma-input-video"
  label="输入视频"
  upload-icon="fas fa-video"
  upload-text="上传输入视频"
  upload-hint="支持 MP4, MOV, AVI 格式，最大500MB"
  accept="video/*"
  :multiple="false"
  :max-file-size="500 * 1024 * 1024"
  additional-hint="用于修改的输入视频，最长10秒"
  theme-color="#8b5cf6"
  @update:files="handleLumaVideo"
/>

4. ElevenLabs 工具使用：
<UploadImage
  input-id="elevenlabs-audio-upload"
  label="上传音频文件"
  upload-icon="fas fa-file-audio"
  upload-text="点击上传音频文件"
  upload-hint="支持 MP3, WAV, M4A 等格式，最大200MB"
  accept="audio/*"
  :multiple="false"
  :max-file-size="200 * 1024 * 1024"
  additional-hint="上传要识别的音频文件"
  theme-color="#6366f1"
  @update:files="handleAudioUpload"
/>

5. Suno 工具使用：
<UploadImage
  input-id="suno-audio-upload"
  label="上传音频文件"
  upload-icon="fas fa-music"
  upload-text="上传音频文件"
  upload-hint="支持 MP3, WAV, M4A 等格式，最大2分钟"
  accept="audio/*"
  :multiple="false"
  :max-file-size="10 * 1024 * 1024"
  additional-hint="上传要覆盖的音频文件，确保长度不超过2分钟"
  theme-color="#10b981"
  @update:files="handleSunoAudio"
/>

6. Veo3 工具使用：
<UploadImage
  input-id="veo3-image-upload"
  label="参考图片 (可选)"
  upload-icon="fas fa-photo-video"
  upload-text="上传参考图片"
  upload-hint="支持 .jpg, .png, .webp (最多2张)"
  :max-files="2"
  :max-file-size="5 * 1024 * 1024"
  additional-hint="参考图片会影响视频生成风格"
  theme-color="#ef4444"
  @update:files="handleVeo3Images"
/>

7. Runway 工具使用：
<UploadImage
  input-id="runway-image-upload"
  label="输入图片"
  upload-icon="fas fa-image"
  upload-text="上传输入图片"
  upload-hint="支持 .jpg, .png, .webp 格式"
  :multiple="false"
  :max-file-size="10 * 1024 * 1024"
  additional-hint="用于视频生成的输入图片"
  theme-color="#06b6d4"
  @update:files="handleRunwayImage"
/>

8. Flux Kontext 工具使用：
<UploadImage
  input-id="flux-reference-images"
  label="参考图片 (可选)"
  upload-icon="fas fa-palette"
  upload-text="上传参考图片"
  upload-hint="支持 .jpg, .png, .webp (最多3张)"
  :max-files="3"
  :max-file-size="8 * 1024 * 1024"
  additional-hint="参考图片会影响生成的艺术风格"
  theme-color="#f59e0b"
  @update:files="handleFluxImages"
/>

9. Nano Banana 工具使用：
<UploadImage
  input-id="nano-image-upload"
  label="输入图片"
  upload-icon="fas fa-microchip"
  upload-text="上传输入图片"
  upload-hint="支持 .jpg, .png, .webp 格式"
  :multiple="false"
  :max-file-size="5 * 1024 * 1024"
  additional-hint="用于AI处理的输入图片"
  theme-color="#84cc16"
  @update:files="handleNanoImage"
/>

使用方法：
1. 在组件中导入：import UploadImage from '~/components/tools/common/UploadImage.vue'
2. 在模板中使用上述示例代码
3. 根据需要调整 props 参数

