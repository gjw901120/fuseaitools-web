<template>
  <div class="grok-tool" :class="isVideoContext ? 'wan-like' : 'qwen-like'">
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Grok.png" alt="Grok" />
      </div>
      <div class="tool-details">
        <h3>Grok</h3>
        <p class="tool-description">{{ isVideoContext ? videoDesc : imageDesc }}</p>
      </div>
    </div>

    <div class="mode-tabs-wrap">
      <div class="mode-tabs">
        <div v-for="t in tabs" :key="t.key" class="mode-tab" :class="{ active: mode === t.key }" @click="go(t.key)">
          <i :class="t.icon"></i>
          <span>{{ t.label }}</span>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="config-panel">
        <div class="config-header">
          <h4 class="panel-title">Configuration</h4>
        </div>
        <form class="config-form" @submit.prevent="generate">
          <fieldset class="config-fieldset" :disabled="loading || isDetailView">
            <div v-if="mode !== 'upscale'" class="form-group">
              <label class="form-label">Prompt <span v-if="isPromptRequired" class="required">*</span></label>
              <textarea v-model="form.prompt" class="form-input" rows="4" :maxlength="promptMaxLength" :placeholder="placeholder"></textarea>
              <div v-if="form.prompt" class="char-count">{{ form.prompt.length }}/{{ promptMaxLength }}</div>
            </div>

            <div v-if="mode === 'upscale' || mode === 'extend' || mode === 'image-2-0-segment-edit'" class="form-group">
              <label class="form-label">Original Task <span class="required">*</span></label>
              <div class="select-with-arrow">
                <select v-model="form.taskId" class="form-input">
                  <option disabled value="">{{ loadingExtendList ? 'Loading tasks...' : 'Select a task' }}</option>
                  <option v-for="item in extendList" :key="item.taskId" :value="item.taskId">{{ item.title || item.taskId }}</option>
                </select>
                <i class="fas fa-chevron-down select-arrow-icon"></i>
              </div>
              <div v-if="!loadingExtendList && extendList.length === 0" class="form-hint">No available tasks.</div>
            </div>

            <!-- segment-edit 专属：可选的分块编号（逗号分隔的非负整数，留空则编辑全图） -->
            <div v-if="mode === 'image-2-0-segment-edit'" class="form-group">
              <label class="form-label">Mask Indexes</label>
              <input v-model="form.maskIndexs" type="text" class="form-input" placeholder="e.g. 0, 2, 3" />
              <div class="form-hint">Optional. Comma-separated segment indexes (0-based) from the source task. Leave empty to edit the whole image.</div>
            </div>

            <div v-if="mode === 'image-to-image' || mode === 'image-to-video' || mode === 'video-1-5-preview' || mode === 'image-2-0-image-edit'" class="form-group">
              <label class="form-label">
                Image URL(s) <span v-if="mode === 'image-to-image' || mode === 'image-2-0-image-edit'" class="required">*</span>
              </label>
              <UploadImage :readonly="isDetailView"
                input-id="grok-upload"
                label=""
                upload-text="Click to upload image(s)"
                upload-hint="JPEG, PNG, WEBP; max 10MB each"
                :max-files="(mode === 'image-to-image' || mode === 'image-2-0-image-edit') ? 5 : 7"
                :multiple="true"
                :max-file-size="10 * 1024 * 1024"
                accept="image/jpeg,image/png,image/webp"
                @update:files="handleFiles"
              />
              <div v-if="isDetailView && form.imageUrls?.length" class="detail-ref-urls">
                <span class="form-label">Input images (this task)</span>
                <div class="detail-ref-urls-links">
                  <a
                    v-for="(u, idx) in form.imageUrls"
                    :key="idx"
                    :href="u"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="detail-ref-link"
                  >Image {{ idx + 1 }}</a>
                </div>
              </div>
            </div>

            <!-- Image 2.0（t2i / image-edit）专属宽高比选择：t2i 五档无 auto，edit 额外支持 auto -->
            <div v-if="mode === 'image-2-0-text-to-image' || mode === 'image-2-0-image-edit'" class="form-group">
              <label class="form-label">Aspect Ratio <span class="required">*</span></label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '1:1' }" @click="form.aspectRatio = '1:1'">1:1</button>
                <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '2:3' }" @click="form.aspectRatio = '2:3'">2:3</button>
                <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '3:2' }" @click="form.aspectRatio = '3:2'">3:2</button>
                <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '16:9' }" @click="form.aspectRatio = '16:9'">16:9</button>
                <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '9:16' }" @click="form.aspectRatio = '9:16'">9:16</button>
                <button v-if="mode === 'image-2-0-image-edit'" type="button" class="tab-option" :class="{ active: form.aspectRatio === 'auto' }" @click="form.aspectRatio = 'auto'">Auto</button>
              </div>
            </div>

            <template v-if="isVideoContext">
              <div v-if="mode === 'text-to-video' || mode === 'image-to-video'" class="form-group">
                <label class="form-label">Aspect Ratio</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '2:3' }" @click="form.aspectRatio = '2:3'">2:3</button>
                  <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '3:2' }" @click="form.aspectRatio = '3:2'">3:2</button>
                  <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '1:1' }" @click="form.aspectRatio = '1:1'">1:1</button>
                  <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '16:9' }" @click="form.aspectRatio = '16:9'">16:9</button>
                  <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '9:16' }" @click="form.aspectRatio = '9:16'">9:16</button>
                </div>
              </div>

              <div v-if="mode === 'text-to-video' || mode === 'image-to-video'" class="form-group">
                <label class="form-label">Mode</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="{ active: form.motionMode === 'fun' }" @click="form.motionMode = 'fun'">fun</button>
                  <button type="button" class="tab-option" :class="{ active: form.motionMode === 'normal' }" @click="form.motionMode = 'normal'">normal</button>
                  <button
                    type="button"
                    class="tab-option"
                    :class="{ active: form.motionMode === 'spicy' }"
                    :disabled="mode === 'image-to-video' && form.imageUrls.length > 0"
                    @click="form.motionMode = 'spicy'"
                  >spicy</button>
                </div>
              </div>

              <div v-if="mode === 'text-to-video' || mode === 'image-to-video'" class="form-group">
                <label class="form-label">Duration</label>
                <div class="tab-group">
                  <input
                    v-model.number="form.duration"
                    type="range"
                    class="duration-range"
                    min="6"
                    max="30"
                    step="1"
                  />
                  <div class="form-hint">Duration: {{ form.duration }}s (6-30s)</div>
                </div>
              </div>

              <div v-else-if="mode === 'extend'" class="form-group">
                <label class="form-label">Extend Times</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="{ active: Number(form.duration) === 6 }" @click="form.duration = 6">6s</button>
                  <button type="button" class="tab-option" :class="{ active: Number(form.duration) === 10 }" @click="form.duration = 10">10s</button>
                </div>
              </div>

              <div v-if="mode === 'text-to-video' || mode === 'image-to-video'" class="form-group">
                <label class="form-label">Resolution</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="{ active: form.resolution === '480p' }" @click="form.resolution = '480p'">480p</button>
                  <button type="button" class="tab-option" :class="{ active: form.resolution === '720p' }" @click="form.resolution = '720p'">720p</button>
                  <button type="button" class="tab-option" :class="{ active: form.resolution === '1080p' }" @click="form.resolution = '1080p'">1080p</button>
                </div>
              </div>

              <div v-if="mode === 'extend'" class="form-group">
                <label class="form-label">Resolution (from source)</label>
                <div class="form-hint">
                  <template v-if="!extendSourceResolution">Select an original task to load its source resolution.</template>
                  <span v-else-if="isExtendSourceUnsupported" class="extend-warning">1080p source videos are not supported for Extend yet — please choose a 480p or 720p task.</span>
                  <template v-else>{{ extendSourceResolution }}</template>
                </div>
              </div>

              <div v-if="mode === 'extend'" class="form-group">
                <label class="form-label">Extend At</label>
                <input v-model.number="form.extendAt" type="number" min="0" class="form-input" />
                <div class="form-hint">The starting point of the extension</div>
              </div>

              <!-- upscale：源分辨率来自所选任务；决定目标档位（1080p 源不可放大） -->
              <div v-if="mode === 'upscale'" class="form-group">
                <label class="form-label">Source Resolution (from task)</label>
                <div class="form-hint">
                  <template v-if="!form.taskId">Select an original task to load its source resolution.</template>
                  <span v-else-if="isUpscaleSourceUnsupported" class="extend-warning">1080p source videos cannot be upscaled — please choose a 480p or 720p task.</span>
                  <template v-else>{{ form.resolution }}</template>
                </div>
              </div>

              <!-- upscale：目标 Resolution（显示 720p / 1080p，提交标准值 upscale-720p / upscale-1080p；按源档位限制可选并联动计价） -->
              <div v-if="mode === 'upscale'" class="form-group">
                <label class="form-label">Resolution <span class="required">*</span></label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="{ active: form.scene === 'upscale-720p' }" :disabled="!canUpscaleTo720p" @click="form.scene = 'upscale-720p'">720p</button>
                  <button type="button" class="tab-option" :class="{ active: form.scene === 'upscale-1080p' }" :disabled="!canUpscaleTo1080p" @click="form.scene = 'upscale-1080p'">1080p</button>
                </div>
                <div v-if="form.taskId && form.resolution === '720p'" class="form-hint">720p source can only upscale to 1080p.</div>
                <div v-else-if="form.taskId && form.resolution === '480p'" class="form-hint">480p source can upscale to 720p or 1080p (default 1080p).</div>
              </div>

              <!-- video-1-5-preview：统一入口文生/图生视频专属控件（aspect 含 auto、仅 1-15s、480p/720p、nsfw） -->
              <template v-if="mode === 'video-1-5-preview'">
                <div class="form-group">
                  <label class="form-label">Aspect Ratio</label>
                  <div class="tab-group">
                    <button type="button" class="tab-option" :class="{ active: form.aspectRatio === 'auto' }" :disabled="isPreviewSingleImage" @click="form.aspectRatio = 'auto'">Auto</button>
                    <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '1:1' }" :disabled="isPreviewSingleImage" @click="form.aspectRatio = '1:1'">1:1</button>
                    <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '16:9' }" :disabled="isPreviewSingleImage" @click="form.aspectRatio = '16:9'">16:9</button>
                    <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '9:16' }" :disabled="isPreviewSingleImage" @click="form.aspectRatio = '9:16'">9:16</button>
                    <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '3:2' }" :disabled="isPreviewSingleImage" @click="form.aspectRatio = '3:2'">3:2</button>
                    <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '2:3' }" :disabled="isPreviewSingleImage" @click="form.aspectRatio = '2:3'">2:3</button>
                  </div>
                  <div v-if="isPreviewSingleImage" class="form-hint">Aspect ratio is ignored in single-image mode.</div>
                </div>

                <div class="form-group">
                  <label class="form-label">Duration</label>
                  <div class="tab-group">
                    <input v-model.number="form.duration" type="range" class="duration-range" min="1" max="15" step="1" />
                    <div class="form-hint">Duration: {{ form.duration }}s (1-15s)</div>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Resolution</label>
                  <div class="tab-group">
                    <button type="button" class="tab-option" :class="{ active: form.resolution === '480p' }" @click="form.resolution = '480p'">480p</button>
                    <button type="button" class="tab-option" :class="{ active: form.resolution === '720p' }" @click="form.resolution = '720p'">720p</button>
                  </div>
                </div>

                <div class="form-group">
                  <label class="check-row">
                    <input v-model="form.nsfwChecker" type="checkbox" />
                    Content safety check (NSFW)
                  </label>
                </div>
              </template>
            </template>

            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="!canGenerate || loading">
                <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                <i v-else :class="isVideoContext ? 'fas fa-play' : 'fas fa-magic'"></i>
                {{ loading ? 'Generating...' : (isVideoContext ? 'Generate Video' : 'Generate Image') }}
                <span v-if="grokPriceText" class="price-tag">{{ grokPriceText }}</span>
              </button>
            </div>
          </fieldset>
        </form>
      </div>

      <div class="result-panel">
        <div v-if="isDetailView && detailData && detailData.status === 3" class="detail-failure-state">
          <div class="failure-icon"><i class="fas fa-exclamation-circle"></i></div>
          <p class="failure-message">Generation failed. You can try again with different parameters.</p>
        </div>
        <div v-else-if="isDetailView && (!detailData || detailData.status === 1)" class="detail-loading-state">
          <i class="fas fa-spinner fa-spin detail-spinner"></i>
          <p>Generating...</p>
        </div>
        <div v-else-if="!displayResult" class="empty-state">
          <h4>{{ isVideoContext ? 'No video generated yet' : 'No image generated yet' }}</h4>
          <p>Fill in the form and click generate to start.</p>
        </div>
        <div v-else class="result-display">
          <div v-if="displayResult.imageUrl" class="image-result">
            <img :src="displayResult.imageUrl" alt="Generated image" class="result-image" loading="lazy" decoding="async" />
            <div class="media-actions">
              <button v-if="!isDetailView" class="action-btn" @click="downloadImage"><i class="fas fa-download"></i> Download</button>
            </div>
          </div>
          <div v-else class="video-result">
            <div class="video-player">
              <video :src="displayResult.videoUrl" controls preload="metadata" class="video-element"></video>
            </div>
            <div class="media-actions">
              <button v-if="!isDetailView" class="action-btn" @click="downloadVideo"><i class="fas fa-download"></i> Download</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UploadImage from './common/UploadImage.vue'
import { useApi } from '~/composables/useApi'
import { useToast } from '~/composables/useToast'
import { useModelPrice } from '~/composables/useModelPrice'
import { useRecordPolling } from '~/composables/useRecordPolling'

const route = useRoute()
const router = useRouter()
const { post, get } = useApi()
const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling()
const { token, isAuthenticated } = useAuth()
const { guardExtendListFetch } = useExtendListAuth()
const { showError } = useToast()
const { fetchPrices, getPrice, formatCredits } = useModelPrice()
const batchUploadUrl = useBatchUploadUrl()
const { getUrlsForFiles } = useFileUploadUrlCache()
onMounted(() => { fetchPrices() })

const getAuthToken = () => {
  if (!import.meta.client) return null
  try {
    if (token?.value) return token.value
    return localStorage.getItem('auth_token')
  } catch {
    return localStorage.getItem('auth_token')
  }
}

const imageDesc = 'Grok Imagine image on FuseAITools—xAI text-to-image and image-to-image. Generate from a prompt or transform one uploaded image; credits shown before Generate.'
const videoDesc = 'Grok Imagine video on FuseAITools—xAI text-to-video and image-to-video with a 6-30s duration slider and 480p/720p/1080p resolution, a unified Video 1.5 Preview entry (text or up to 7 images at 480p/720p, 1-15s), plus upscale and extend from prior task IDs. Credits are billed per second and update when duration or resolution changes.'
const EXTEND_LIST_MODEL = 'grok-extend'
// segment-edit 的 taskId 取自文生图历史任务（extend-list 以该 model 拉取）
const SEGMENT_EDIT_EXTEND_MODEL = 'grok-imagine-image-2-0-text-to-image'
const isTaskIdMode = (m) => m === 'upscale' || m === 'extend' || m === 'image-2-0-segment-edit'
// 按当前模式解析 extend-list 请求的 model（缓存与请求共用同一 key）
const resolveExtendListModel = () => (mode.value === 'image-2-0-segment-edit' ? SEGMENT_EDIT_EXTEND_MODEL : EXTEND_LIST_MODEL)
const extendList = ref([])
const loadingExtendList = ref(false)
const hasLoadedExtendList = ref(false)
const getSharedExtendListCache = () => {
  if (!import.meta.client) return null
  const key = '__fuseExtendListCache__'
  const root = globalThis
  root[key] = root[key] || {}
  const model = resolveExtendListModel()
  root[key][model] = root[key][model] || { data: null, promise: null }
  return root[key][model]
}
const fetchExtendList = async (force = false) => {
  if (!import.meta.client) return
  if (!guardExtendListFetch(extendList, { loadingRef: loadingExtendList, hasLoadedRef: hasLoadedExtendList })) return
  if (loadingExtendList.value) return
  if (!force && hasLoadedExtendList.value) return
  const shared = getSharedExtendListCache()
  if (!force && shared?.data) {
    extendList.value = Array.isArray(shared.data) ? shared.data : []
    hasLoadedExtendList.value = true
    return
  }
  loadingExtendList.value = true
  try {
    if (shared?.promise) {
      await shared.promise
      extendList.value = Array.isArray(shared.data) ? shared.data : []
    } else {
      const request = get(`/api/records/extend-list?model=${encodeURIComponent(resolveExtendListModel())}`)
      if (shared) shared.promise = request
      const data = await request
      const list = Array.isArray(data) ? data : []
      extendList.value = list
      if (shared) shared.data = list
    }
    hasLoadedExtendList.value = true
  } catch {
    extendList.value = []
  } finally {
    if (shared) shared.promise = null
    loadingExtendList.value = false
  }
}

const imageModes = ['text-to-image', 'image-to-image', 'image-2-0-text-to-image', 'image-2-0-image-edit', 'image-2-0-segment-edit']
const videoModes = ['text-to-video', 'image-to-video', 'video-1-5-preview', 'upscale', 'extend']

const tabsByCtx = {
  image: [
    { key: 'text-to-image', label: 'Text to Image', icon: 'fas fa-font' },
    { key: 'image-to-image', label: 'Image to Image', icon: 'fas fa-image' },
    { key: 'image-2-0-text-to-image', label: 'Image 2.0 Text to Image', icon: 'fas fa-wand-magic-sparkles' },
    { key: 'image-2-0-image-edit', label: 'Image 2.0 Edit', icon: 'fas fa-pen-ruler' },
    { key: 'image-2-0-segment-edit', label: 'Image 2.0 Segment Edit', icon: 'fas fa-object-group' }
  ],
  video: [
    { key: 'text-to-video', label: 'Text to Video', icon: 'fas fa-font' },
    { key: 'image-to-video', label: 'Image to Video', icon: 'fas fa-film' },
    { key: 'video-1-5-preview', label: 'Video 1.5 Preview', icon: 'fas fa-bolt' },
    { key: 'upscale', label: 'Upscale', icon: 'fas fa-up-right-and-down-left-from-center' },
    { key: 'extend', label: 'Extend', icon: 'fas fa-video' }
  ]
}

const pathToMode = {
  '/home/grok/text-to-image': 'text-to-image',
  '/home/grok/image-to-image': 'image-to-image',
  '/home/grok/text-to-video': 'text-to-video',
  '/home/grok/image-to-video': 'image-to-video',
  '/home/grok/upscale': 'upscale',
  '/home/grok/extend': 'extend',
  '/home/grok/video-1-5-preview': 'video-1-5-preview',
  '/home/grok/image-2-0-text-to-image': 'image-2-0-text-to-image',
  '/home/grok/image-2-0-image-edit': 'image-2-0-image-edit',
  '/home/grok/image-2-0-segment-edit': 'image-2-0-segment-edit'
}
const modeToPath = Object.fromEntries(Object.entries(pathToMode).map(([k, v]) => [v, k]))

const mode = ref(pathToMode[route.path] || 'text-to-image')
watch(() => route.path, (p) => {
  if (pathToMode[p]) mode.value = pathToMode[p]
}, { immediate: true })
watch(mode, (m) => {
  if (isTaskIdMode(m)) fetchExtendList(true)
}, { immediate: true })

watch(isAuthenticated, (authed) => {
  const shared = getSharedExtendListCache()
  if (!authed) {
    guardExtendListFetch(extendList, { loadingRef: loadingExtendList, hasLoadedRef: hasLoadedExtendList })
    if (shared) {
      shared.data = null
      shared.promise = null
    }
    return
  }
  if (isTaskIdMode(mode.value)) {
    hasLoadedExtendList.value = false
    if (shared) shared.data = null
    fetchExtendList(true)
  }
})

const isVideoContext = computed(() => videoModes.includes(mode.value))
const tabs = computed(() => tabsByCtx[isVideoContext.value ? 'video' : 'image'])
const placeholder = computed(() => isVideoContext.value ? 'Describe motion, camera movement, and timing...' : 'Describe the desired image in detail...')
const isPromptRequired = computed(() => ['text-to-image', 'text-to-video', 'extend', 'image-2-0-text-to-image', 'image-2-0-segment-edit'].includes(mode.value))
const promptMaxLength = computed(() => {
  if (mode.value === 'image-2-0-segment-edit') return 65000
  if (['image-2-0-text-to-image', 'image-2-0-image-edit'].includes(mode.value)) return 8000
  if (mode.value === 'video-1-5-preview') return 4096
  return 5000
})
const grokPriceModelKeyMap = {
  'text-to-image': 'grok-imagine-text-to-image',
  'image-to-image': 'grok-imagine-image-to-image',
  'image-2-0-text-to-image': 'grok-imagine-image-2-0-text-to-image',
  'image-2-0-image-edit': 'grok-imagine-image-2-0-image-edit',
  'image-2-0-segment-edit': 'grok-imagine-image-2-0-segment-edit',
  'text-to-video': 'grok-imagine-text-to-video',
  'image-to-video': 'grok-imagine-image-to-video',
  upscale: 'grok-imagine-upscale',
  extend: 'grok-imagine-extend',
  'video-1-5-preview': 'grok-imagine-video-1-5-preview'
}
const grokPriceText = computed(() => {
  const modelKey = grokPriceModelKeyMap[mode.value]
  if (!modelKey) return ''

  // text-to-video / image-to-video：RULE 中 duration=1 为「每 1 秒」单价，按所选时长逐秒计价
  if (mode.value === 'text-to-video' || mode.value === 'image-to-video') {
    const perSecond = getPrice(modelKey, {
      duration: 1,
      quality: ['480p', '720p', '1080p'].includes(form.resolution) ? form.resolution : '480p'
    })
    if (perSecond == null) return ''
    const dur = Math.max(6, Math.min(30, Number(form.duration) || 6))
    const text = formatCredits(perSecond * dur)
    return text ? `· ${text} credits` : ''
  }

  // video-1-5-preview：RULE duration=1 为每秒单价，×所选 1-15s 时长；分辨率仅 480p/720p
  if (mode.value === 'video-1-5-preview') {
    const perSecond = getPrice(modelKey, {
      duration: 1,
      quality: ['480p', '720p'].includes(form.resolution) ? form.resolution : '480p'
    })
    if (perSecond == null) return ''
    const dur = Math.max(1, Math.min(15, Number(form.duration) || 6))
    const text = formatCredits(perSecond * dur)
    return text ? `· ${text} credits` : ''
  }

  // upscale：统一逻辑——下拉选中源任务后，用 quality(源分辨率)+duration(源时长)+scene(目标档位) 匹配价格；切换档位自动重算
  if (mode.value === 'upscale') {
    if (!form.taskId || !form.scene || !['480p', '720p'].includes(form.resolution)) return ''
    const credits = getPrice(modelKey, {
      quality: form.resolution,
      duration: form.sourceDuration ?? undefined,
      scene: form.scene
    })
    const text = formatCredits(credits)
    return text ? `· ${text} credits` : ''
  }

  const formFields = mode.value === 'extend'
    ? { duration: Number(form.duration), quality: form.resolution }
    : {}
  const credits = getPrice(modelKey, formFields)
  const text = formatCredits(credits)
  return text ? `· ${text} credits` : ''
})
// extend 模式：分辨率不再手选，取自所选源任务（供价格展示与 1080p 拦截）
const extendSourceResolution = computed(() => (mode.value === 'extend' ? form.resolution : ''))
const isExtendSourceUnsupported = computed(() => mode.value === 'extend' && form.resolution === '1080p')
// upscale 模式：源任务为 1080p 时不可再放大（与 extend 同拦截逻辑）
const isUpscaleSourceUnsupported = computed(() => mode.value === 'upscale' && form.resolution === '1080p')
// 目标档位可用性：720p 仅当源为 480p；1080p 当源为 480p/720p（720p 源锁定 1080p、不可切换到 720p）
const canUpscaleTo720p = computed(() => mode.value === 'upscale' && form.resolution === '480p')
const canUpscaleTo1080p = computed(() => mode.value === 'upscale' && ['480p', '720p'].includes(form.resolution))
// video-1-5-preview：仅 1 张参考图时 aspectRatio 无效
const isPreviewSingleImage = computed(() => mode.value === 'video-1-5-preview' && form.imageUrls.length === 1)

const canGenerate = computed(() => {
  if (loading.value) return false
  const prompt = form.prompt.trim()
  const taskId = form.taskId.trim()

  if (mode.value === 'text-to-image') return !!prompt
  if (mode.value === 'image-to-image') return form.imageUrls.length > 0
  if (mode.value === 'image-2-0-text-to-image') return !!prompt
  if (mode.value === 'image-2-0-image-edit') return form.imageUrls.length >= 1 && form.imageUrls.length <= 5
  if (mode.value === 'image-2-0-segment-edit') return !!prompt && !!taskId
  if (mode.value === 'text-to-video') return !!prompt
  if (mode.value === 'image-to-video') return !!prompt || form.imageUrls.length > 0
  if (mode.value === 'video-1-5-preview') return !!prompt || form.imageUrls.length > 0
  if (mode.value === 'upscale') return !!taskId && !!form.scene && !isUpscaleSourceUnsupported.value
  if (mode.value === 'extend') return !!taskId && !!prompt && !isExtendSourceUnsupported.value
  return false
})

const form = reactive({
  prompt: '',
  taskId: '',
  imageUrls: [],
  maskIndexs: '',
  aspectRatio: '2:3',
  motionMode: 'normal',
  duration: 6,
  resolution: '480p',
  extendAt: 0,
  scene: 'upscale-1080p',
  sourceDuration: null,
  nsfwChecker: false
})
// 切换模式时归一化 duration（text/image to video 用 6-30 滑动；extend 仅 6/10）
watch(mode, (m) => {
  if (m === 'text-to-video' || m === 'image-to-video') {
    form.duration = Math.max(6, Math.min(30, Number(form.duration) || 6))
  } else if (m === 'extend' && ![6, 10].includes(Number(form.duration))) {
    form.duration = 6
  } else if (m === 'video-1-5-preview') {
    form.aspectRatio = 'auto'
    form.resolution = form.resolution === '720p' ? '720p' : '480p'
    form.duration = Math.max(1, Math.min(15, Number(form.duration) || 6))
  } else if (m === 'image-2-0-text-to-image') {
    // 五档无 auto；auto 或旧值非法时归一为 1:1
    if (!['1:1', '2:3', '3:2', '16:9', '9:16'].includes(form.aspectRatio)) form.aspectRatio = '1:1'
  } else if (m === 'image-2-0-image-edit') {
    if (!['1:1', '2:3', '3:2', '16:9', '9:16', 'auto'].includes(form.aspectRatio)) form.aspectRatio = '1:1'
  }
})
const loading = ref(false)
const result = ref(null)

const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)
const loadingRecordId = ref(null)

const MODEL_TO_MODE = {
  'grok-imagine-text-to-image': 'text-to-image',
  'grok-imagine-image-to-image': 'image-to-image',
  'grok-imagine-image-2-0-text-to-image': 'image-2-0-text-to-image',
  'grok-imagine-image-2-0-image-edit': 'image-2-0-image-edit',
  'grok-imagine-image-2-0-segment-edit': 'image-2-0-segment-edit',
  'grok-imagine-text-to-video': 'text-to-video',
  'grok-imagine-image-to-video': 'image-to-video',
  'grok-imagine-upscale': 'upscale',
  'grok-imagine-extend': 'extend',
  'grok-imagine-video-1-5-preview': 'video-1-5-preview'
}

function fillFormFromOriginalData(o) {
  if (!o || typeof o !== 'object') return
  if (o.prompt != null) form.prompt = String(o.prompt)
  if (o.taskId != null) form.taskId = String(o.taskId)
  if (Array.isArray(o.imageUrls)) form.imageUrls = [...o.imageUrls]
  if (Array.isArray(o.maskIndexs)) form.maskIndexs = o.maskIndexs.join(', ')
  else if (typeof o.maskIndexs === 'string') form.maskIndexs = o.maskIndexs
  if (o.aspectRatio) form.aspectRatio = String(o.aspectRatio)
  if (o.mode) form.motionMode = String(o.mode)
  if (o.motionMode) form.motionMode = String(o.motionMode)
  if (o.duration != null) form.duration = Number(o.duration) || form.duration
  if (o.extendTimes != null) form.duration = Number(o.extendTimes) || form.duration
  if (o.resolution) form.resolution = String(o.resolution)
  if (o.scene) form.scene = String(o.scene)
  if (o.extendAt != null) form.extendAt = Number(o.extendAt) || 0
  if (o.nsfwChecker != null) form.nsfwChecker = !!o.nsfwChecker
  if (o.model && MODEL_TO_MODE[o.model]) {
    const m = MODEL_TO_MODE[o.model]
    mode.value = m
    const path = modeToPath[m]
    if (path && route.path !== path) {
      router.replace({ path, query: { ...route.query } })
    }
  }
}

function getRouteRecordId() { return route.query['record-id'] || '' }

async function loadDetailByRecordId(recordId) {
  if (!recordId) return
  if (getRouteRecordId() !== recordId) return
  if (loadingRecordId.value === recordId) return
  loadingRecordId.value = recordId
  detailData.value = null
  try {
    const data = await fetchRecordDetailOnce(recordId)
    if (getRouteRecordId() !== recordId) return
    detailData.value = data || null
    if (data?.originalData) fillFormFromOriginalData(data.originalData)
    if (data != null && Number(data.status) === 1) {
      pollRecordByStatus(recordId, { getIsCancelled: () => getRouteRecordId() !== recordId }).then((res) => {
        if (getRouteRecordId() !== recordId) return
        detailData.value = res
        if (res?.originalData) fillFormFromOriginalData(res.originalData)
      }).catch(() => {})
    }
  } catch (e) {
    console.error('Grok load record detail failed:', e)
  } finally {
    if (loadingRecordId.value === recordId) loadingRecordId.value = null
  }
}

watch(() => route.query['record-id'], (recordId) => {
  if (recordId) loadDetailByRecordId(recordId)
  else { loadingRecordId.value = null; detailData.value = null }
}, { immediate: true })

const displayResult = computed(() => {
  if (isDetailView.value && detailData.value?.status === 2 && detailData.value?.outputUrls?.length) {
    const raw = detailData.value.outputUrls[0]
    const url = typeof raw === 'string' ? raw : raw?.url
    if (!url) return null
    const isImage = imageModes.includes(mode.value) || /\.(jpe?g|png|gif|webp)(\?|$)/i.test(url)
    return isImage ? { imageUrl: url } : { videoUrl: url }
  }
  return result.value
})

function go(m) {
  mode.value = m
  router.push(modeToPath[m] || modeToPath['text-to-image'])
}

// extend / upscale 选中源任务后，将任务分辨率与时长同步（供价格匹配与 1080p 拦截；详情页不覆盖已存数据）
watch([mode, () => form.taskId], () => {
  if (mode.value !== 'extend' && mode.value !== 'upscale') return
  if (isDetailView.value) return
  const item = extendList.value.find((it) => it.taskId === form.taskId)
  form.resolution = item?.resolution || ''
  form.sourceDuration = item?.duration != null && item.duration !== '' ? Number(item.duration) : null
  if (mode.value === 'upscale') {
    // 默认 1080p；480p 源可手动切换到 720p；720p 源锁定 1080p；1080p 源无可用档位（清 scene 以拦截）
    form.scene = form.resolution === '1080p' ? '' : 'upscale-1080p'
  }
})

async function handleFiles(files) {
  if (!files?.length) {
    form.imageUrls = []
    return
  }
  const list = Array.isArray(files) ? files : [files]
  const headers = { Accept: 'application/json' }
  const authToken = getAuthToken()
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`
  try {
    form.imageUrls = await getUrlsForFiles(list, async (need) => {
      const fd = new FormData()
      need.forEach((f) => fd.append('file', f))
      const res = await fetch(batchUploadUrl, { method: 'POST', headers, body: fd, credentials: 'include' })
      const data = await parseBatchUploadFetchResponse(res)
      const urls = data?.data?.urls || data?.fileUrls || []
      return Array.isArray(urls) ? urls : []
    })
  } catch (e) {
    form.imageUrls = []
    showError(e?.message || 'Upload failed')
  }
}

async function generate() {
  if (!canGenerate.value) return
  loading.value = true
  try {
    let api = ''
    let body = {}
    if (mode.value === 'text-to-image') {
      api = '/api/image/grok/text-to-image'
      body = { model: 'grok-imagine-text-to-image', prompt: form.prompt.trim(), aspectRatio: '1:1' }
    } else if (mode.value === 'image-to-image') {
      api = '/api/image/grok/image-to-image'
      body = { model: 'grok-imagine-image-to-image', prompt: form.prompt.trim() || undefined, imageUrls: form.imageUrls }
    } else if (mode.value === 'image-2-0-text-to-image') {
      api = '/api/image/grok/image-2-0-text-to-image'
      body = { model: 'grok-imagine-image-2-0-text-to-image', prompt: form.prompt.trim(), aspectRatio: form.aspectRatio }
    } else if (mode.value === 'image-2-0-image-edit') {
      api = '/api/image/grok/image-2-0-image-edit'
      body = { model: 'grok-imagine-image-2-0-image-edit', prompt: form.prompt.trim() || undefined, aspectRatio: form.aspectRatio, imageUrls: form.imageUrls }
    } else if (mode.value === 'image-2-0-segment-edit') {
      api = '/api/image/grok/image-2-0-segment-edit'
      const maskIndexs = String(form.maskIndexs || '')
        .split(',')
        .map((v) => parseInt(v.trim(), 10))
        .filter((v) => Number.isInteger(v) && v >= 0)
      body = { model: 'grok-imagine-image-2-0-segment-edit', prompt: form.prompt.trim(), taskId: form.taskId.trim() }
      if (maskIndexs.length >= 1) body.maskIndexs = maskIndexs
    } else if (mode.value === 'text-to-video') {
      api = '/api/video/grok/text-to-video'
      body = {
        model: 'grok-imagine-text-to-video',
        prompt: form.prompt.trim(),
        aspectRatio: form.aspectRatio,
        mode: form.motionMode,
        duration: Number(form.duration),
        resolution: form.resolution
      }
    } else if (mode.value === 'image-to-video') {
      api = '/api/video/grok/image-to-video'
      body = {
        model: 'grok-imagine-image-to-video',
        imageUrls: form.imageUrls,
        prompt: form.prompt.trim() || undefined,
        mode: form.motionMode,
        duration: Number(form.duration),
        resolution: form.resolution,
        aspectRatio: form.aspectRatio
      }
    } else if (mode.value === 'video-1-5-preview') {
      api = '/api/video/grok/video-1-5-preview'
      body = {
        model: 'grok-imagine-video-1-5-preview',
        prompt: form.prompt.trim() || undefined,
        imageUrls: form.imageUrls.length ? form.imageUrls : undefined,
        aspectRatio: form.imageUrls.length === 1 ? undefined : form.aspectRatio,
        resolution: form.resolution,
        duration: Number(form.duration),
        nsfwChecker: form.nsfwChecker
      }
    } else if (mode.value === 'upscale') {
      api = '/api/video/grok/upscale'
      body = { model: 'grok-imagine-upscale', taskId: form.taskId.trim(), scene: form.scene }
    } else {
      api = '/api/video/grok/extend'
      body = {
        model: 'grok-imagine-extend',
        taskId: form.taskId.trim(),
        prompt: form.prompt.trim(),
        extendAt: Number(form.extendAt) || 0,
        extendTimes: form.duration
      }
    }

    const data = await post(api, body)
    const rid = data?.recordId ?? data?.data?.recordId
    if (rid) {
      router.push(`${modeToPath[mode.value] || '/home/grok/text-to-image'}?record-id=${encodeURIComponent(rid)}`)
      return
    }
    const url = data?.imageUrl ?? data?.videoUrl ?? data?.outputUrl ?? (Array.isArray(data?.outputUrls) ? data.outputUrls[0] : '')
    result.value = imageModes.includes(mode.value) ? { imageUrl: url } : { videoUrl: url }
  } catch (e) {
    if (!e?.__fromApi) showError(e?.message || 'Generate failed')
  } finally {
    loading.value = false
  }
}

function downloadImage() {
  if (!result.value?.imageUrl) return
  const a = document.createElement('a')
  a.href = result.value.imageUrl
  a.download = `grok-image-${Date.now()}.png`
  a.click()
}

function downloadVideo() {
  if (!result.value?.videoUrl) return
  const a = document.createElement('a')
  a.href = result.value.videoUrl
  a.download = `grok-video-${Date.now()}.mp4`
  a.click()
}
</script>

<style scoped>
.grok-tool {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}
.tool-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}
.tool-avatar { width: 48px; height: 48px; border-radius: 12px; overflow: hidden; flex-shrink: 0; }
.tool-avatar img { width: 100%; height: 100%; object-fit: cover; }
.tool-details h3 { margin: 0 0 4px 0; font-size: 20px; font-weight: 600; color: var(--flux-foreground); }
.tool-details p { margin: 0; font-size: 13px; color: #6b7280; line-height: 1.55; }

.mode-tabs-wrap {
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}
.mode-tabs { display: flex; flex-wrap: wrap; gap: 8px; }
.mode-tab {
  padding: 9px 14px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #64748b;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}
.mode-tab:hover { border-color: #3b82f6; color: #3b82f6; }
.mode-tab.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }
.mode-tab span { font-weight: 500; }

.main-content { display: flex; flex: 1; min-height: 0; gap: 20px; }
.config-panel {
  width: 35%;
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.config-header { margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0; }
.config-header h4 { margin: 0; font-size: 18px; font-weight: 600; color: var(--flux-foreground); }
.config-form { display: flex; flex-direction: column; gap: 16px; flex: 1; overflow-y: auto; }
.config-fieldset { border: none; margin: 0; padding: 0; }

.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 24px; }
.form-group:last-of-type { margin-bottom: 0; }
.form-label { font-size: 14px; font-weight: 500; color: var(--flux-muted); }
.required { color: #ef4444; }
.form-input {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
}
.form-input:focus { outline: none; border-color: #3b82f6; }
.char-count { font-size: 12px; color: #6b7280; text-align: right; }
.form-hint { font-size: 12px; color: #6b7280; line-height: 1.4; }
.extend-warning { color: var(--flux-destructive); font-weight: 500; }
.select-with-arrow { position: relative; }
.select-with-arrow .form-input { width: 100%; appearance: none; padding-right: 32px; }
.select-arrow-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #6b7280;
  font-size: 12px;
}

.tab-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
}
.tab-option {
  flex: 1;
  min-width: 60px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.duration-range {
  width: 100%;
  accent-color: var(--flux-primary);
  cursor: pointer;
}

.check-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--flux-muted);
  cursor: pointer;
}
.check-row input {
  width: 16px;
  height: 16px;
  accent-color: var(--flux-primary);
  cursor: pointer;
}

.qwen-like .tab-option {
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #64748b;
}
.qwen-like .tab-option:hover {
  background: #f8fafc;
  border-color: #3b82f6;
  color: #3b82f6;
}
.qwen-like .tab-option.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #fff;
}

.wan-like .tab-option {
  border: 2px solid #e2e8f0;
  background: #f8fafc;
  color: var(--flux-muted);
}
.wan-like .tab-option:hover {
  background: rgba(59, 130, 246, 0.05);
  border-color: #3b82f6;
  color: #3b82f6;
}
.wan-like .tab-option.active {
  border-color: #3b82f6;
  background: #3b82f6;
  color: #fff;
}

.tab-option:disabled {
  cursor: not-allowed;
  opacity: 0.45;
  pointer-events: none;
}

.form-actions { margin-top: 24px; padding-bottom: 20px; }
.btn-primary {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.price-tag { font-size: 15px; opacity: 0.85; margin-left: 4px; }

.result-panel {
  width: 65%;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  color: #6b7280;
  gap: 12px;
}
.empty-state h4 { margin: 0; font-size: 18px; color: var(--flux-foreground); }
.result-image { max-width: 100%; height: auto; border-radius: 8px; display: block; }
.video-player { background: #000; border-radius: 8px; overflow: hidden; }
.video-element { width: 100%; height: auto; display: block; }
.media-actions { display: flex; margin-top: 12px; }
.action-btn {
  background: #f3f4f6;
  color: var(--flux-muted);
  border: 1px solid #d1d5db;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}
.action-btn:hover { background: #e5e7eb; }

.detail-loading-state, .detail-failure-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 40px; text-align: center; flex: 1;
}
.detail-spinner { font-size: 48px; color: #3b82f6; }
.detail-loading-state p, .detail-failure-state p { margin: 0; font-size: 16px; color: #64748b; }
.detail-failure-state .failure-icon { font-size: 56px; color: #ef4444; }
.detail-failure-state .failure-message { max-width: 420px; line-height: 1.6; color: var(--flux-muted); }
.detail-ref-urls { margin-top: 8px; }
.detail-ref-urls-links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
.detail-ref-link { font-size: 13px; color: #3b82f6; text-decoration: none; }
.detail-ref-link:hover { text-decoration: underline; }

@media (max-width: 1024px) {
  .main-content { flex-direction: column; }
  .config-panel, .result-panel { width: 100%; }
}
</style>
