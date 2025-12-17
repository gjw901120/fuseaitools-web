<template>
  <div class="sora-tool">
    <!-- 工具信息头部 -->
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/sora.png" alt="Sora" />
      </div>
      <div class="tool-details">
        <h3>Sora</h3>
        <p>Sora 2 is OpenAI’s latest AI video generation model, supporting both text-to-video and image-to-video. It delivers realistic motion, physics consistency, with improved control over style, scene, and aspect ratio—ideal for creative apps and social media content.</p>
      </div>
    </div>

    <!-- 顶部：模式切换（从左侧移至顶部） -->
    <div class="mode-tabs">
      <div class="mode-tab"
           :class="{ active: form.model === 'text-to-video' }"
           @click="switchMode('text-to-video')">
        <i class="fas fa-keyboard"></i>
        <span>text-to-video</span>
      </div>
      <div class="mode-tab"
           :class="{ active: form.model === 'image-to-video' }"
           @click="switchMode('image-to-video')">
        <i class="fas fa-image"></i>
        <span>image-to-video</span>
      </div>
      <div class="mode-tab"
           :class="{ active: form.model === 'pro-text-to-video' }"
           @click="switchMode('pro-text-to-video')">
        <i class="fas fa-magic"></i>
        <span>pro-text-to-video</span>
      </div>
      <div class="mode-tab"
           :class="{ active: form.model === 'pro-image-to-video' }"
           @click="switchMode('pro-image-to-video')">
        <i class="fas fa-wand-magic-sparkles"></i>
        <span>pro-image-to-video</span>
      </div>
      <div class="mode-tab"
           :class="{ active: form.model === 'watermark-remover' }"
           @click="switchMode('watermark-remover')">
        <i class="fas fa-water"></i>
        <span>watermark-remover</span>
      </div>
      <div class="mode-tab"
           :class="{ active: form.model === 'pro-storyboard' }"
           @click="switchMode('pro-storyboard')">
        <i class="fas fa-book"></i>
        <span>pro-storyboard</span>
      </div>
    </div>

    <div class="main-content">
      <!-- 左侧配置面板 -->
      <div class="config-panel">
        <div class="config-header">
          <h4>Sora Configuration</h4>
        </div>

        <!-- 模式选择已移动至顶部 -->

        

        <!-- Prompt (hidden for watermark-remover & pro-storyboard) -->
        <div class="form-group" v-if="!['watermark-remover','pro-storyboard'].includes(form.model)">
          <label for="prompt">Prompt *</label>
          <textarea
            id="prompt"
            v-model="form.input.prompt"
            rows="5"
            maxlength="5000"
            placeholder="The text prompt describing the desired video motion"
            required
          ></textarea>
          <div class="char-count">{{ form.input.prompt.length }}/5000</div>
        </div>

        <!-- Image Upload（image-to-video & pro-image-to-video 必填，storyboard 可选） -->
        <div class="form-group" v-if="['image-to-video','pro-image-to-video','pro-storyboard'].includes(form.model)">
          <label>Reference Images *</label>
          <UploadImage
            input-id="sora-image-upload"
            label=""
            upload-icon="fas fa-cloud-upload-alt"
            upload-text="Click to upload image"
            upload-hint="Supports JPG/PNG/WEBP, up to 3 images, max 10MB each"
            theme-color="#3b82f6"
            :max-files="3"
            :max-file-size="10 * 1024 * 1024"
            accept="image/*"
            :multiple="true"
            @update:files="handleSoraImagesUpdate"
          />
          
        </div>

        <!-- Aspect Ratio (tab 单选; hidden for watermark-remover) -->
        <div class="form-group" v-if="form.model !== 'watermark-remover'">
          <label>Aspect Ratio</label>
          <div class="tab-group">
            <div class="tab-options">
              <button
                type="button"
                class="tab-option"
                :class="{ active: form.input.aspect_ratio === 'portrait' }"
                @click="form.input.aspect_ratio = 'portrait'"
              >
                portrait
              </button>
              <button
                type="button"
                class="tab-option"
                :class="{ active: form.input.aspect_ratio === 'landscape' }"
                @click="form.input.aspect_ratio = 'landscape'"
              >
                landscape
              </button>
            </div>
          </div>
          <div class="form-help">Defines the generated video's aspect ratio.</div>
        </div>

        <!-- n_frames (tab 单选; hidden for watermark-remover) -->
        <div class="form-group" v-if="form.model !== 'watermark-remover'">
          <label>Frames</label>
          <div class="tab-group">
            <div class="tab-options">
              <button
                type="button"
                class="tab-option"
                :class="{ active: form.input.n_frames === '10' }"
                @click="form.input.n_frames = '10'"
              >
                10s
              </button>
              <button
                type="button"
                class="tab-option"
                :class="{ active: form.input.n_frames === '15' }"
                @click="form.input.n_frames = '15'"
              >
                15s
              </button>
              <button
                v-if="form.model === 'pro-storyboard'"
                type="button"
                class="tab-option"
                :class="{ active: form.input.n_frames === '25' }"
                @click="form.input.n_frames = '25'"
              >
                25s
              </button>
            </div>
          </div>
          <div class="form-help" v-if="form.model === 'pro-storyboard'">Frames is required for storyboard.</div>
        </div>

        <!-- size (仅 pro 模式) - tab 切换，无 Default -->
        <div class="form-group" v-if="['pro-text-to-video','pro-image-to-video'].includes(form.model)">
          <label>Size</label>
          <div class="tab-group">
            <div class="tab-options">
              <button 
                type="button"
                class="tab-option"
                :class="{ active: form.input.size === 'standard' }"
                @click="form.input.size = 'standard'"
              >
                standard
              </button>
              <button 
                type="button"
                class="tab-option"
                :class="{ active: form.input.size === 'high' }"
                @click="form.input.size = 'high'"
              >
                high
              </button>
            </div>
          </div>
        </div>

        <!-- remove_watermark (hidden for watermark-remover & pro-storyboard) -->
        <div class="form-group" v-if="!['watermark-remover','pro-storyboard'].includes(form.model)">
          <label>Remove Watermark</label>
          <div class="tab-group">
            <div class="tab-options">
              <button 
                type="button"
                class="tab-option"
                :class="{ active: form.input.remove_watermark === true }"
                @click="form.input.remove_watermark = true"
              >
                <i class="fas fa-check"></i>
                true
              </button>
              <button 
                type="button"
                class="tab-option"
                :class="{ active: form.input.remove_watermark === false }"
                @click="form.input.remove_watermark = false"
              >
                <i class="fas fa-times"></i>
                false
              </button>
            </div>
          </div>
        </div>

        <!-- watermark remover 专用：视频 URL 下拉选择 -->
        <div class="form-group" v-if="form.model === 'watermark-remover'">
          <label class="form-label">Video Url <span class="required">*</span></label>
          <div class="select-wrapper">
            <select
              v-model="form.input.video_url"
              class="form-select"
              :disabled="isLoadingVideoList"
            >
              <option value="">Please select a video</option>
              <option 
                v-for="video in videoList" 
                :key="video.value || video.url || video.id"
                :value="video.value || video.url || video.id"
              >
                {{ video.label || video.name || video.title || video.url }}
              </option>
            </select>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="form-help">Select a video URL from the list</div>
        </div>

        <!-- storyboard shots builder -->
        <div class="form-group" v-if="form.model === 'pro-storyboard'">
          <label>shots (Total Duration: {{ form.input.n_frames || '?' }}s)</label>
          <div class="shots-list">
            <div class="shot-card" v-for="(shot, idx) in scenes" :key="shot.id">
              <div class="shot-title">Scene {{ idx + 1 }}</div>
              <textarea
                class="shot-text"
                v-model="shot.scene"
                rows="3"
                :placeholder="`Describe this scene... who, where, what happens?`"
              ></textarea>
              <div class="shot-footer">
                <div class="duration-input">
                  <input
                    class="duration-field"
                    type="text"
                    v-model="shot.duration"
                  />
                  <span class="duration-s">s</span>
                </div>
                <button
                  v-if="scenes.length > 1"
                  type="button"
                  class="shot-delete"
                  @click="removeScene(idx)"
                  title="Delete scene"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <button type="button" class="add-shot" @click="addScene">
              <i class="fas fa-plus"></i> Add Scene
            </button>
          </div>
          <div 
            class="duration-warning error" 
            v-if="form.input.n_frames && totalSceneDuration > Number(form.input.n_frames)"
          >
            <i class="fas fa-exclamation-triangle"></i>
            Total scene duration exceeds maximum limit, please adjust each scene duration
          </div>
          <div 
            class="duration-warning info" 
            v-else-if="form.input.n_frames && remainingDuration > 0"
          >
            <i class="fas fa-exclamation-triangle"></i>
            Please allocate all remaining duration ({{ remainingDuration.toFixed(2) }}s) to scenes before generating
          </div>
          <div class="form-help">Add one or more scenes. Each scene includes a textual description and its duration in seconds.</div>
        </div>

        <!-- 提交 -->
        <div class="form-actions">
          <button class="btn-primary" :disabled="!canSubmit || isGenerating" @click.prevent="onSubmit">
            <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
            <i v-else class="fas fa-play"></i>
            {{ isGenerating ? 'Submitting...' : 'Start Generation' }}
          </button>
        </div>
      </div>

      <!-- 右侧结果面板 -->
      <div class="result-panel">
        <div class="video-header">
          <h4>Result Preview</h4>
          <div class="video-actions" v-if="results.length > 0">
            <button @click="results = []" class="btn-secondary">
              <i class="fas fa-trash"></i> Clear
            </button>
          </div>
        </div>

        <div class="video-container">
          <div v-if="results.length > 0" class="video-showcase">
            <div v-for="(item, idx) in results" :key="idx" class="video-showcase-item">
              <pre class="payload-json">{{ item }}</pre>
            </div>
          </div>
          <div v-else class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-film"></i>
            </div>
            <h3>Waiting for Generation</h3>
            <p>Configure parameters, then click Start Generation.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import UploadImage from './common/UploadImage.vue'

const isClient = typeof window !== 'undefined'

const form = reactive({
  model: 'text-to-video',
  callBackUrl: '',
  input: {
    prompt: '',
    aspect_ratio: 'portrait',
    n_frames: '10',
    remove_watermark: false,
    image_urls: [],
    size: 'standard',
    video_url: ''
  }
})

const imageUrlsText = ref('')
const videoList = ref([])
const isLoadingVideoList = ref(false)
const scenes = ref([{ id: Date.now(), scene: '', duration: '7.5' }])
const totalSceneDuration = computed(() => scenes.value.reduce((sum, s) => sum + (parseFloat(s.duration) || 0), 0))
const framesSeconds = computed(() => Number(form.input.n_frames || 0))
const remainingDuration = computed(() => {
  const rem = framesSeconds.value - totalSceneDuration.value
  return rem > 0 ? rem : 0
})
const isGenerating = ref(false)
let results = ref([])
const shotsJson = ref('')

const handleSoraImagesUpdate = (files) => {
  if (!files || files.length === 0) {
    form.input.image_urls = []
    return
  }
  try {
    form.input.image_urls = Array.from(files).map(f => (typeof URL !== 'undefined' ? URL.createObjectURL(f) : ''))
  } catch (e) {
    form.input.image_urls = []
  }
}

const switchMode = (model) => {
  form.model = model
}

// 获取视频列表
const fetchVideoList = async () => {
  if (isLoadingVideoList.value) return
  isLoadingVideoList.value = true
  try {
    const response = await fetch('/api/sora/video-list')
    if (response.ok) {
      const data = await response.json()
      videoList.value = Array.isArray(data) ? data : (data.list || data.videos || [])
    } else {
      console.error('Failed to fetch video list')
      videoList.value = []
    }
  } catch (error) {
    console.error('Error fetching video list:', error)
    videoList.value = []
  } finally {
    isLoadingVideoList.value = false
  }
}

// 监听模式切换，如果是 watermark-remover 则加载视频列表
watch(() => form.model, (newModel) => {
  if (newModel === 'watermark-remover' && videoList.value.length === 0) {
    fetchVideoList()
  }
}, { immediate: true })

const canSubmit = computed(() => {
  // watermark remover: require selected video URL
  if (form.model === 'watermark-remover') {
    return !!form.input.video_url && form.input.video_url.trim() !== ''
  }
  // storyboard: require n_frames and at least one scene, and total duration must equal frames
  if (form.model === 'pro-storyboard') {
    if (!form.input.n_frames) return false
    if (!Array.isArray(scenes.value) || scenes.value.length === 0) return false
    const diff = framesSeconds.value - totalSceneDuration.value
    return Math.abs(diff) < 0.01
  }
  // other models require prompt
  if (!form.input.prompt.trim()) return false
  // image required for image-to-video models
  if (['image-to-video','pro-image-to-video'].includes(form.model)) {
    return Array.isArray(form.input.image_urls) && form.input.image_urls.length > 0
  }
  return true
})

const buildPayload = () => {
  const payload = {
    model: String(form.model),
    input: {
      // prompt may be omitted for watermark remover; keep conditional
      ...(form.model !== 'watermark-remover' && { prompt: String(form.input.prompt) })
    }
  }
  if (form.callBackUrl) payload.callBackUrl = String(form.callBackUrl)
  if (form.input.aspect_ratio) payload.input.aspect_ratio = String(form.input.aspect_ratio)
  if (form.input.n_frames) payload.input.n_frames = String(form.input.n_frames)
  if (typeof form.input.remove_watermark === 'boolean') payload.input.remove_watermark = form.input.remove_watermark
  if (['image-to-video','pro-image-to-video','pro-storyboard'].includes(form.model)) {
    payload.input.image_urls = Array.isArray(form.input.image_urls) ? form.input.image_urls : []
  }
  if (form.model === 'watermark-remover' && form.input.video_url) {
    payload.input.video_url = String(form.input.video_url)
  }
  if (['pro-text-to-video','pro-image-to-video'].includes(form.model) && form.input.size) {
    payload.input.size = String(form.input.size)
  }
  if (form.model === 'pro-storyboard') {
    payload.input.shots = scenes.value.map(s => ({ Scene: String(s.scene || ''), duration: Number(s.duration || 0) }))
  }
  return payload
}

const addScene = () => {
  scenes.value.push({ id: Date.now() + Math.random(), scene: '', duration: '7.5' })
}

const removeScene = (idx) => {
  if (scenes.value.length <= 1) return
  scenes.value.splice(idx, 1)
}

const onSubmit = async () => {
  if (!canSubmit.value) return
  isGenerating.value = true
  try {
    const payload = buildPayload()
    // 此处应调用后端 API。为演示目的，先展示 payload
    results.value.unshift(JSON.stringify(payload, null, 2))
    // 重置部分字段
    // form.input.prompt = ''
  } catch (e) {
    console.error(e)
  } finally {
    isGenerating.value = false
  }
}
</script>

<style scoped>
.sora-tool {
  /* 可调变量：修改这些变量即可统一调整输入框尺寸 */
  --shot-text-min-h: 80px;   /* 场景描述最小高度 */
  --shot-text-w: 100%;       /* 场景描述宽度 */
  --duration-w: 30px;        /* 时长输入宽度 */
  --duration-h: 24px;        /* 时长输入高度 */

  width: 100%;
  height: 100%;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}
.tool-header { display: flex; align-items: center; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
.tool-avatar { width: 48px; height: 48px; border-radius: 8px; overflow: hidden; margin-right: 16px; flex: 0 0 auto; display: flex; align-items: center; justify-content: center; }
.tool-avatar img { width: 100%; height: 100%; object-fit: contain; image-rendering: auto; }
.tool-details h3 { margin: 0; font-size: 18px; font-weight: 600; color: #1f2937; }
.tool-details p { margin: 0; font-size: 14px; color: #6b7280; }

/* 顶部模式切换 */
.mode-tabs { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 8px; padding: 12px 0 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
.mode-tab { width: 100%; box-sizing: border-box; padding: 10px 14px; border: 1px solid #e2e8f0; background: #fff; color: #64748b; border-radius: 8px; cursor: pointer; transition: all .2s ease; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 13px; font-weight: 600; min-height: 40px; word-break: break-word; }
.mode-tab:hover { border-color: #3b82f6; background: #f8fafc; color: #3b82f6; }
.mode-tab.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }
.mode-tab i { font-size: 14px; }

.main-content { display: flex; flex: 1; min-height: 0; gap: 20px; }
.config-panel { width: 35%; background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; min-height: 0; }
.config-header { padding: 0 0 20px 0; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
.config-header h4 { margin: 0; font-size: 16px; font-weight: 600; color: #1e293b; }
.config-form { flex: 1; overflow-y: auto; }

.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px; }
.form-group .required { color: #ef4444; }
.form-group input, .form-group textarea, .form-group select { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; transition: border-color 0.2s ease; box-sizing: border-box; }
.form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
.char-count { text-align: right; font-size: 12px; color: #64748b; margin-top: 4px; }
.form-help { font-size: 11px; color: #6b7280; font-weight: 400; margin-top: 4px; line-height: 1.4; }

.tab-group { flex: 1; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background: white; }
.tab-options { display: flex; gap: 8px; }
.tab-option { flex: 1; padding: 12px 16px; border: 1px solid #e5e7eb; background: white; color: #64748b; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 14px; font-weight: 500; }
.tab-option:hover { border-color: #3b82f6; background: #f8fafc; color: #3b82f6; }
.tab-option.active { background: #3b82f6; color: white; border-color: #3b82f6; }

.select-wrapper { position: relative; }
.select-wrapper select { appearance: none; padding-right: 40px; }
.select-wrapper i { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #64748b; pointer-events: none; }
.form-select { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; transition: border-color 0.2s ease; box-sizing: border-box; background: white; }
.form-select:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
.form-select:disabled { background: #f3f4f6; cursor: not-allowed; }

/* 上传区域样式（复用 Luma 风格） */
.upload-area { position: relative; border: 2px dashed #d1d5db; border-radius: 12px; padding: 24px; text-align: center; transition: all 0.3s ease; background: #fafafa; cursor: pointer; }
.upload-area:hover { border-color: #3b82f6; background: #f0f7ff; }
.upload-area.has-files { border-color: #10b981; background: #f0fdf4; }
.upload-content { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.upload-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: #3b82f6; border-radius: 50%; color: white; font-size: 20px; }
.upload-area.has-files .upload-icon { background: #10b981; }
.upload-text { display: flex; flex-direction: column; gap: 4px; }
.upload-title { font-size: 16px; font-weight: 600; color: #1f2937; margin: 0; }
.upload-subtitle { font-size: 14px; color: #6b7280; margin: 0; }
.file-input { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }

/* 上传后的内容样式 */
.uploaded-content { display: flex; flex-direction: column; align-items: center; gap: 12px; width: 100%; }
.uploaded-video-container { position: relative; width: 200px; height: 120px; border-radius: 12px; overflow: hidden; border: 2px solid #10b981; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
.uploaded-video { width: 100%; height: 100%; object-fit: cover; }
.uploaded-text { display: flex; flex-direction: column; gap: 4px; text-align: center; }
.uploaded-text .upload-title { font-size: 16px; font-weight: 600; color: #10b981; margin: 0; }
.uploaded-text .upload-subtitle { font-size: 14px; color: #6b7280; margin: 0; }
.remove-video-btn { position: absolute; top: -6px; right: -6px; width: 20px; height: 20px; background: #dc2626; color: white; border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
.remove-video-btn:hover { background: #b91c1c; transform: scale(1.1); }

/* shots builder */
.shots-list { display: flex; flex-direction: column; gap: 16px; }
.shot-card { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; }
.shot-title { font-size: 13px; font-weight: 600; color: #1f2937; margin-bottom: 8px; }
.shot-text { width: var(--shot-text-w); padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; resize: vertical; min-height: var(--shot-text-min-h); box-sizing: border-box; }
.shot-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
.duration-input { display: inline-flex; align-items: center; gap: 6px; }
.duration-field { width: 30%; max-width: 80px; height: var(--duration-h); padding: 4px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 12px; text-align: right; box-sizing: border-box; }
/* 隐藏数字输入的上下微调箭头（若浏览器仍显示） */
.duration-field::-webkit-outer-spin-button,
.duration-field::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.duration-field[type=number] { -moz-appearance: textfield; }
.duration-s { display: inline-block; padding: 3px 4px; background: #eef2ff; color: #475569; border-radius: 6px; font-size: 9px; }
.shot-delete { border: 1px solid #ef4444; background: #fff1f2; color: #ef4444; border-radius: 6px; font-size: 12px; padding: 6px 10px; cursor: pointer; }
.shot-delete:hover { background: #ffe4e6; }
.add-shot { margin-top: 8px; border: 1px dashed #3b82f6; background: #f0f7ff; color: #1d4ed8; border-radius: 8px; padding: 8px 12px; font-size: 13px; cursor: pointer; }
.add-shot:hover { background: #e0efff; }

.duration-warning { margin-top: 8px; font-size: 12px; line-height: 1.5; display: flex; align-items: flex-start; gap: 6px; }
.duration-warning i { line-height: 1; margin-top: 2px; }
.duration-warning.error { color: #dc2626; font-size: 14px; }
.duration-warning.info { color: #b45309; /* amber-700 */ font-size: 14px; }

.form-actions { margin-top: 24px; padding-bottom: 20px; }
.btn-primary { width: 100%; padding: 16px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.3s ease; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

.result-panel { width: 65%; background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; min-height: 400px; display: flex; flex-direction: column; min-height: 0; }
.video-header { padding: 20px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
.video-header h4 { font-size: 16px; font-weight: 600; color: #1e293b; margin: 0; }
.video-container { flex: 1; padding: 30px; display: flex; align-items: center; justify-content: center; min-height: 80vh; }
.video-showcase { width: 100%; max-width: 100%; }
.video-showcase-item { width: 100%; background: #f8fafc; border-radius: 8px; overflow: hidden; margin-bottom: 16px; }
.payload-json { margin: 0; padding: 16px; font-size: 12px; line-height: 1.5; background: #0f172a; color: #e2e8f0; white-space: pre-wrap; }
.empty-state { text-align: center; color: #64748b; max-width: 500px; min-height: 60vh; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.empty-icon { font-size: 72px; color: #cbd5e1; margin-bottom: 24px; }

@media (max-width: 1024px) {
  .main-content { flex-direction: column; }
  .config-panel, .result-panel { width: 100%; }
  .mode-tabs { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (max-width: 768px) {
  .sora-tool { padding: 16px; }
  .mode-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>


