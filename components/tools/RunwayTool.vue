<template>
  <div class="runway-tool">
    <!-- 工具信息头部 -->
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Runway.png" alt="Runway" />
      </div>
      <div class="tool-details">
        <h3>Runway</h3>
        <p>Utilize Runway to generate high-quality videos from text and images. Leverage Runway AI for seamless integration and immediately start creating your Runway masterpieces.</p>
      </div>
    </div>

    <!-- 生成模式选择：统一 mode-tabs-wrap 样式，主色 #3b82f6 -->
    <div class="mode-tabs-wrap">
      <div class="mode-tabs">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="mode-tab"
          :class="{ active: activeTab === tab.id }"
          @click="goToRunwayTab(tab.id)"
        >
          <i :class="tab.icon"></i>
          <span>{{ tab.name }}</span>
        </div>
      </div>
    </div>

    <!-- 主内容区域：左右布局 -->
    <div class="main-content">
      <!-- 左侧：参数配置面板 (1/3) -->
      <div class="config-panel">
        <div class="config-header">
          <h4>{{ getConfigHeaderTitle() }}</h4>
        </div>

        <!-- Generate Tab 表单 -->
        <form v-if="activeTab === 'generate'" class="config-form" @submit.prevent="generateVideo">
          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">
          <!-- Prompt 输入 -->
          <div class="form-group">
            <label for="prompt">Video Description *</label>
            <textarea
              id="prompt"
              v-model="formData.prompt"
              placeholder="Descriptive text that guides AI video generation. Specify themes, actions, styles, and scenes. When used with images, describe how to animate or modify image content. Maximum 1800 characters."
              rows="4"
              maxlength="1800"
              required
            ></textarea>
            <div class="char-count">{{ formData.prompt.length }}/1800</div>
          </div>

          <!-- 时长选择 -->
          <div class="form-group">
            <label>Video Duration *</label>
            <div class="tab-group">
              <div class="tab-options">
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.duration === '5' }"
                  @click="formData.duration = '5'"
                >
                  <i class="fas fa-clock"></i>
                  5 seconds
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.duration === '10' }"
                  @click="formData.duration = '10'"
                >
                  <i class="fas fa-clock"></i>
                  10 seconds
                </button>
              </div>
            </div>
          </div>

          <!-- 质量选择 -->
          <div class="form-group">
            <label>Video Quality *</label>
            <div class="tab-group">
              <div class="tab-options">
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.quality === '720p' }"
                  @click="formData.quality = '720p'"
                >
                  <i class="fas fa-hd-video"></i>
                  720p
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.quality === '1080p' }"
                  @click="formData.quality = '1080p'"
                  :disabled="formData.duration === '10'"
                >
                  <i class="fas fa-video"></i>
                  1080p
                </button>
              </div>
            </div>
            <div v-if="formData.duration === '10'" class="form-help">
              10-second videos do not support 1080p resolution
            </div>
          </div>
          </fieldset>

          <!-- 参考图像上传：放在 fieldset 外，选择后立即调用上传接口 -->
          <div class="form-group">
            <label class="form-label">Reference Image</label>
            <span v-if="isUploadingGenerateImage" class="form-hint"><i class="fas fa-spinner fa-spin"></i> Uploading image...</span>
            <UploadImage
              input-id="runway-image-upload"
              label=""
              upload-icon="fas fa-cloud-upload-alt"
              upload-text="Click to upload image"
              upload-hint="Supports JPG/PNG format, max 10MB"
              additional-hint="Optional reference image as the basis for the video. If provided, AI will create a video that animates or extends this image."
              theme-color="#3b82f6"
              :max-files="1"
              :max-file-size="10 * 1024 * 1024"
              accept="image/*"
              :multiple="false"
              @update:files="handleImageUpdate"
            />
          </div>

          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">
          <!-- 宽高比选择 -->
          <div class="form-group" v-if="!formData.imageFile">
            <label>Video Aspect Ratio *</label>
            <div class="tab-group">
              <div class="tab-options">
                <button
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '16:9' }"
                  @click="formData.aspectRatio = '16:9'"
                >
                  16:9
                </button>
                <button
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '4:3' }"
                  @click="formData.aspectRatio = '4:3'"
                >
                  4:3
                </button>
                <button
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '1:1' }"
                  @click="formData.aspectRatio = '1:1'"
                >
                  1:1
                </button>
                <button
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '3:4' }"
                  @click="formData.aspectRatio = '3:4'"
                >
                  3:4
                </button>
                <button
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '9:16' }"
                  @click="formData.aspectRatio = '9:16'"
                >
                  9:16
                </button>
              </div>
            </div>
          </div>

          <!-- 水印设置 -->
          <div class="form-group">
            <label for="waterMark">Watermark Text</label>
            <input
              id="waterMark"
              v-model="formData.waterMark"
              type="text"
              placeholder="fuseai"
            />
            <div class="form-help">
              Video watermark text content. Empty string means no watermark, non-empty string will display the specified watermark text in the bottom-right corner of the video.
            </div>
          </div>

          <div class="form-actions">
            <button
              type="submit"
              class="btn-primary"
              :disabled="!formData.prompt || isGenerating"
            >
              <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-video"></i>
              {{ isGenerating ? 'Generating...' : 'Generate Video' }}
              <span v-if="runwayGeneratePriceText" class="price-tag">{{ runwayGeneratePriceText }}</span>
            </button>
          </div>
          </fieldset>
        </form>

        <!-- Aleph Tab 表单 -->
        <form v-if="activeTab === 'aleph'" class="config-form" @submit.prevent="generateAlephVideo">
          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">
          <!-- Prompt 输入 -->
          <div class="form-group">
            <label for="aleph-prompt">Prompt *</label>
            <textarea
              id="aleph-prompt"
              v-model="alephFormData.prompt"
              placeholder="Descriptive text that guides how to transform the reference video. Specifically describe the style changes, effects, and modifications you want to see in the generated video."
              rows="5"
              required
            ></textarea>
            <div class="form-help">
              <strong>Best Practices:</strong>
              <ul style="margin: 4px 0 0 0; padding-left: 20px;">
                <li>Focus on transformations and style changes, rather than describing content already in the video</li>
                <li>Include camera movement descriptions (e.g., "slow zoom in", "orbital rotation")</li>
                <li>Add temporal elements (e.g., "gradually", "smoothly", "suddenly")</li>
                <li>Specify lighting and atmosphere changes when needed</li>
              </ul>
              <div style="margin-top: 8px;">
                <strong>Example:</strong> "Transform into dreamy watercolor style with soft flowing motion effects"
              </div>
            </div>
          </div>

          <!-- Video 上传：与图片类似，上方小选择区，下方展示已上传视频 -->
          <div class="form-group">
            <label>Input Video *</label>
            <div class="aleph-video-upload">
              <div class="aleph-video-trigger" :class="{ 'has-video': alephReferenceVideo }">
                <input
                  ref="alephVideoInputRef"
                  type="file"
                  accept="video/*"
                  @change="handleAlephVideoUpload"
                  class="aleph-video-file-input"
                />
                <div class="aleph-video-trigger-inner">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <span>Click to upload video</span>
                  <small>Supports MP4, MOV, AVI, max 10MB</small>
                </div>
              </div>
              <div v-if="isUploadingAlephVideo" class="aleph-video-uploading">
                <i class="fas fa-spinner fa-spin"></i> Uploading video...
              </div>
              <div v-if="alephReferenceVideo && !isUploadingAlephVideo" class="aleph-video-display">
                <div class="aleph-video-preview-wrap">
                  <video :src="alephReferenceVideo" class="aleph-video-preview" controls></video>
                  <button type="button" class="aleph-video-remove" title="Remove" @click="clearAlephReferenceVideo">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <div class="aleph-video-meta" v-if="alephFormData.videoFile">
                  <span class="aleph-video-name">{{ alephFormData.videoFile.name }}</span>
                  <span class="aleph-video-size">{{ formatFileSize(alephFormData.videoFile.size) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Watermark 输入 -->
          <div class="form-group">
            <label for="aleph-waterMark">Watermark</label>
            <input
              id="aleph-waterMark"
              v-model="alephFormData.waterMark"
              type="text"
              placeholder="fuseai"
              maxlength="20"
            />
            <div class="form-help">
              Optional watermark text displayed on the generated video. Leave empty for no watermark. Recommended length: 1-20 characters for optimal visibility.
            </div>
          </div>

          <!-- Aspect Ratio 选择：tab 单选，默认选第一个 -->
          <div class="form-group">
            <label>Aspect Ratio</label>
            <div class="tab-group">
              <div class="tab-options">
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: alephFormData.aspectRatio === '16:9' }"
                  @click="alephFormData.aspectRatio = '16:9'"
                >
                  16:9
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: alephFormData.aspectRatio === '9:16' }"
                  @click="alephFormData.aspectRatio = '9:16'"
                >
                  9:16
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: alephFormData.aspectRatio === '4:3' }"
                  @click="alephFormData.aspectRatio = '4:3'"
                >
                  4:3
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: alephFormData.aspectRatio === '3:4' }"
                  @click="alephFormData.aspectRatio = '3:4'"
                >
                  3:4
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: alephFormData.aspectRatio === '1:1' }"
                  @click="alephFormData.aspectRatio = '1:1'"
                >
                  1:1
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: alephFormData.aspectRatio === '21:9' }"
                  @click="alephFormData.aspectRatio = '21:9'"
                >
                  21:9
                </button>
              </div>
            </div>
          </div>

          <!-- Seed 输入 -->
          <div class="form-group">
            <label for="aleph-seed">Seed</label>
            <input
              id="aleph-seed"
              v-model.number="alephFormData.seed"
              type="number"
              placeholder="123456"
            />
            <div class="form-help">
              Optional random seed for reproducible results. The same seed with the same parameters tends to generate consistent results.
            </div>
          </div>
          </fieldset>

          <!-- Reference Image 上传：放在 fieldset 外，选择后立即上传 -->
          <div class="form-group">
            <label class="form-label">Reference Image</label>
            <span v-if="isUploadingAlephImage" class="form-hint"><i class="fas fa-spinner fa-spin"></i> Uploading image...</span>
            <UploadImage
              input-id="runway-aleph-image-upload"
              label=""
              upload-icon="fas fa-cloud-upload-alt"
              upload-text="Click to upload image"
              upload-hint="Supports JPG/PNG format, max 10MB"
              additional-hint="Optional reference image to influence the style or content of the output."
              theme-color="#3b82f6"
              :max-files="1"
              :max-file-size="10 * 1024 * 1024"
              accept="image/*"
              :multiple="false"
              @update:files="handleAlephImageUpdate"
            />
          </div>

          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">
          <div class="form-actions">
            <button
              type="submit"
              class="btn-primary"
              :disabled="!alephFormData.prompt || !alephFormData.uploadedVideoUrl || isGenerating"
            >
              <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-video"></i>
              {{ isGenerating ? 'Generating...' : 'Generate Aleph Video' }}
              <span v-if="runwayAlephPriceText" class="price-tag">{{ runwayAlephPriceText }}</span>
            </button>
          </div>
          </fieldset>
        </form>

        <!-- Extend Tab 表单 -->
        <form v-if="activeTab === 'extend'" class="config-form" @submit.prevent="generateExtendVideo">
          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">
          <!-- Task 选择：来自 /api/records/extend-list?model=runway_generate -->
          <div class="form-group">
            <label for="extend-task">Task *</label>
            <div class="select-wrapper">
              <select id="extend-task" v-model="extendFormData.task" required :disabled="loadingExtendList">
                <option value="">Select a task</option>
                <option v-for="item in extendList" :key="item.taskId" :value="item.taskId">{{ item.title || item.taskId }}</option>
              </select>
              <i class="fas fa-chevron-down"></i>
            </div>
            <div v-if="!loadingExtendList && extendList.length === 0" class="form-hint input-hint-warn">
              Only tasks completed with Runway Generate can be used.
            </div>
            <div v-else class="form-help">
              Original video generation task. Must be a valid task from a previously generated video.
            </div>
          </div>

          <!-- Prompt 输入 -->
          <div class="form-group">
            <label for="extend-prompt">Prompt *</label>
            <textarea
              id="extend-prompt"
              v-model="extendFormData.prompt"
              placeholder="Descriptive text that guides video continuation. Explain what actions, dynamics, or developments should happen next. Be specific but maintain consistency with the original video content."
              rows="5"
              maxlength="1000"
              required
            ></textarea>
            <div class="char-count" v-if="extendFormData.prompt">{{ extendFormData.prompt.length }}/1000</div>
          </div>

          <!-- Quality 选择 -->
          <div class="form-group">
            <label>Video Quality *</label>
            <div class="tab-group">
              <div class="tab-options">
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: extendFormData.quality === '720p' }"
                  @click="extendFormData.quality = '720p'"
                >
                  <i class="fas fa-hd-video"></i>
                  720p
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: extendFormData.quality === '1080p' }"
                  @click="extendFormData.quality = '1080p'"
                >
                  <i class="fas fa-video"></i>
                  1080p
                </button>
              </div>
            </div>
            
          </div>

          <!-- Watermark 输入 -->
          <div class="form-group">
            <label for="extend-waterMark">Watermark</label>
            <input
              id="extend-waterMark"
              v-model="extendFormData.waterMark"
              type="text"
              placeholder="fuseai"
              maxlength="50"
            />
            <div class="form-help">
              Optional watermark text (max 50 characters). Empty means no watermark; non-empty displays in the bottom-right corner of the video.
            </div>
          </div>

          <div class="form-actions">
            <button
              type="submit"
              class="btn-primary"
              :disabled="!extendFormData.task || !extendFormData.prompt || isGenerating"
            >
              <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-expand"></i>
              {{ isGenerating ? 'Generating...' : 'Generate Extend Video' }}
              <span v-if="runwayExtendPriceText" class="price-tag">{{ runwayExtendPriceText }}</span>
            </button>
          </div>
          </fieldset>
        </form>
      </div>

      <!-- 右侧：视频展示区域 (2/3) -->
      <div class="result-panel">
        <div class="video-header">
          <h4>Video Preview</h4>
          <div class="video-actions" v-if="!isDetailView && generatedVideos.length > 0">
            <button @click="clearResults" class="btn-secondary">
              <i class="fas fa-trash"></i> Clear
            </button>
          </div>
        </div>
        
        <!-- 视频展示区域 -->
        <div class="video-container">
          <!-- 详情页：status 3 失败 -->
          <div v-if="isDetailView && detailData && detailData.status === 3" class="detail-failure-state">
            <div class="failure-icon"><i class="fas fa-exclamation-circle"></i></div>
            <p class="failure-message">Generation failed. You can debug the parameters and try generating again. Generation failure will not consume credits.</p>
          </div>
          <!-- 详情页：status 1 或加载中 -->
          <div v-else-if="isDetailView && (!detailData || detailData.status === 1)" class="detail-loading-state">
            <i class="fas fa-spinner fa-spin detail-spinner"></i>
            <p>Generating...</p>
          </div>
          <div v-else-if="displayVideos.length > 0" class="video-showcase">
            <div
              v-for="(video, index) in displayVideos"
              :key="index"
              class="video-showcase-item"
            >
              <div class="video-player">
                <video controls :src="video.url" :poster="video.thumbnail">
                  Your browser does not support video playback
                </video>
              </div>
              <div class="video-details">
                <div class="video-meta">
                  <span class="video-duration">{{ video.duration }}</span>
                  <span class="video-resolution">{{ video.resolution }}</span>
                  <span class="video-ratio">{{ video.aspectRatio }}</span>
                </div>
                <div class="video-actions">
                  <button @click="downloadVideo(video)" class="btn-icon" title="Download">
                    <i class="fas fa-download"></i>
                  </button>
                  <button @click="shareVideo(video)" class="btn-icon" title="Share">
                    <i class="fas fa-share"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 空状态 -->
          <div v-else class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-video"></i>
            </div>
            <h3>Waiting for Video Generation</h3>
            <p>Configure parameters and click "Generate Video" button to start creating your AI video</p>
            <div class="empty-features">
              <div class="feature-item">
                <i class="fas fa-magic"></i>
                <span>Text to Video</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-image"></i>
                <span>Image to Video</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-palette"></i>
                <span>Multiple Aspect Ratios</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用提示 - 底部横排展示 -->
    <div class="usage-tips" v-if="activeTab === 'generate'">
      <div class="tip-item">
        <span class="tip-icon">📝</span>
        <span><strong>Detailed Description:</strong> Include details like scenes, actions, camera movement, lighting, etc.</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🎬</span>
        <span><strong>Cinematic Terms:</strong> Use professional terms like "close-up", "wide shot", "tracking shot"</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🎨</span>
        <span><strong>Style Specification:</strong> Such as "sci-fi style", "romantic comedy", "action film"</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">⏱️</span>
        <span><strong>Duration Limit:</strong> 10-second videos do not support 1080p resolution</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🖼️</span>
        <span><strong>Reference Image:</strong> Providing an image URL can add animation effects to existing images</span>
      </div>
    </div>

    <!-- Aleph Usage Tips -->
    <div class="usage-tips" v-if="activeTab === 'aleph'">
      <div class="tip-item">
        <span class="tip-icon">🔄</span>
        <span><strong>Transformation Description:</strong> Focus on describing the style changes and effect transformations you want</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">📹</span>
        <span><strong>Motion Effects:</strong> Use camera movement terminology to enhance video dynamics</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">⏰</span>
        <span><strong>Temporal Control:</strong> Control transformation rhythm through temporal elements (gradually, suddenly, etc.)</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🎥</span>
        <span><strong>Video Requirements:</strong> Ensure video URL is accessible via HTTPS and file size does not exceed 10MB</span>
      </div>
    </div>

    <!-- Extend Usage Tips -->
    <div class="usage-tips" v-if="activeTab === 'extend'">
      <div class="tip-item">
        <span class="tip-icon">➡️</span>
        <span><strong>Continuation Description:</strong> Describe what should happen next in the video sequence</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🔗</span>
        <span><strong>Consistency:</strong> Maintain visual and narrative consistency with the original video</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">⚡</span>
        <span><strong>Dynamic Actions:</strong> Specify movements, actions, and developments clearly</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🎯</span>
        <span><strong>Quality Selection:</strong> Choose resolution based on your needs - 720p for faster generation, 1080p for higher quality</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, inject, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import UploadImage from './common/UploadImage.vue'
import { useAuth } from '~/composables/useAuth'
import { useToast } from '~/composables/useToast'
import { useApi } from '~/composables/useApi'
import { useModelPrice } from '~/composables/useModelPrice'
import { useRecordPolling } from '~/composables/useRecordPolling'

const isClient = typeof window !== 'undefined'
const { token } = useAuth()
const { showError } = useToast()
const { get, post } = useApi()
const { fetchPrices, getPrice, formatCredits, discount } = useModelPrice()
const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling()
const router = useRouter()
const route = useRoute()
onMounted(() => { fetchPrices() })
const batchUploadUrl = useBatchUploadUrl()

// Tab 与三级路由同步：/home/runway/generate 等
const runwayTabToPath = {
  generate: '/home/runway/generate',
  extend: '/home/runway/extend',
  aleph: '/home/runway/aleph'
}
const runwayPathToTab = {
  '/home/runway/generate': 'generate',
  '/home/runway/extend': 'extend',
  '/home/runway/aleph': 'aleph'
}
function goToRunwayTab(tabId) {
  const path = runwayTabToPath[tabId] || runwayTabToPath.generate
  router.push(path)
}
function getRunwayRecordPath() {
  return runwayTabToPath[activeTab.value] || '/home/runway/generate'
}

// 详情页：仅从 URL 读取 record-id
const routeRecordId = computed(() => route?.query?.['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)
const loadingRecordId = ref(null)
const detailDelayTimer = ref(null)
const displayVideos = computed(() => {
  if (isDetailView.value && detailData.value?.status === 2 && detailData.value?.outputUrls?.length) {
    const urls = detailData.value.outputUrls.map(u => (typeof u === 'string' ? u : u?.url)).filter(Boolean)
    const imageUrl = urls.find(u => u.includes('/image/'))
    const videoUrl = urls.find(u => u.includes('/video/'))
    const od = detailData.value.originalData || {}
    return [{
      id: 'detail',
      url: videoUrl || urls[0],
      thumbnail: imageUrl || undefined,
      prompt: od.prompt || detailData.value.title || '',
      duration: od.duration ? `${od.duration} seconds` : '',
      resolution: od.quality || '',
      aspectRatio: od.aspectRatio || '',
      createdAt: new Date().toISOString()
    }]
  }
  return generatedVideos.value
})
function fillFormFromOriginalData(o) {
  if (!o || typeof o !== 'object') return
  if (activeTab.value === 'generate') Object.keys(formData).forEach(k => { if (o[k] !== undefined) formData[k] = o[k] })
  else if (activeTab.value === 'extend') Object.keys(extendFormData).forEach(k => { if (o[k] !== undefined) extendFormData[k] = o[k] })
  else if (activeTab.value === 'aleph') Object.keys(alephFormData).forEach(k => { if (o[k] !== undefined) alephFormData[k] = o[k] })
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
    if (data != null && Number(data.status) === 1) pollRecordByStatus(recordId, { getIsCancelled: () => getRouteRecordId() !== recordId }).then((res) => {
      if (getRouteRecordId() !== recordId) return
      detailData.value = res
      if (res?.originalData) fillFormFromOriginalData(res.originalData)
    }).catch(() => {})
  } catch (e) { console.error('Load record detail failed:', e) }
  finally { if (loadingRecordId.value === recordId) loadingRecordId.value = null }
}
watch(() => route.query['record-id'], (recordId) => {
  if (recordId) loadDetailByRecordId(recordId)
  else { loadingRecordId.value = null; detailData.value = null }
}, { immediate: true })

const getAuthToken = () => {
  if (!isClient) return null
  try {
    if (token?.value) return token.value
    return localStorage.getItem('auth_token')
  } catch {
    return localStorage.getItem('auth_token')
  }
}

/** 上传文件到 batch-upload，返回 URL 数组；单文件时返回 [url] */
const uploadFilesToUrls = async (files) => {
  if (!files || (Array.isArray(files) ? files.length === 0 : !files)) return []
  const list = Array.isArray(files) ? files : [files]
  const formDataUpload = new FormData()
  list.forEach(f => formDataUpload.append('file', f))
  const headers = { Accept: 'application/json' }
  const authToken = getAuthToken()
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`
  const response = await fetch(batchUploadUrl, {
    method: 'POST',
    headers,
    body: formDataUpload,
    credentials: 'include'
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const msg = (typeof errorData?.errorMessage === 'string' && errorData.errorMessage?.trim())
      ? errorData.errorMessage.trim()
      : (typeof errorData?.message === 'string' && errorData.message?.trim())
        ? errorData.message.trim()
        : (errorData?.userTip || errorData?.error || errorData?.message || 'Upload failed')
    throw new Error(msg)
  }
  const data = await response.json()
  const urls = data?.data?.urls || data?.fileUrls || (Array.isArray(data?.data) ? data.data : [])
  if (!Array.isArray(urls)) throw new Error('Invalid response: file URLs not found')
  return urls
}

// 注入父组件的函数（可选，可能为 undefined）
const addToUsageHistory = inject('addToUsageHistory', null)

// Tab 管理
const activeTab = ref('generate')
// tabs 作为常量数组，不需要响应式
const tabs = Object.freeze([
  { id: 'generate', name: 'Generate', icon: 'fas fa-video' },
  { id: 'extend', name: 'Extend', icon: 'fas fa-expand' },
  { id: 'aleph', name: 'Aleph', icon: 'fas fa-magic' }
])

// Extend Task 列表：来自 /api/records/extend-list?model=runway_generate（需在 watch 前定义）
const EXTEND_LIST_MODEL = 'runway_generate'
const extendList = ref([])
const loadingExtendList = ref(false)
const hasLoadedExtendList = ref(false)
const getSharedExtendListCache = () => {
  if (!import.meta.client) return null
  const key = '__fuseExtendListCache__'
  const root = globalThis
  root[key] = root[key] || {}
  root[key][EXTEND_LIST_MODEL] = root[key][EXTEND_LIST_MODEL] || { data: null, promise: null }
  return root[key][EXTEND_LIST_MODEL]
}
const isUnmounted = ref(false)
let extendListFetchTimer = null
const queueFetchExtendList = () => {
  if (extendListFetchTimer) clearTimeout(extendListFetchTimer)
  // Delay one tick so the leaving instance can unmount before requesting.
  extendListFetchTimer = setTimeout(() => {
    extendListFetchTimer = null
    if (isUnmounted.value) return
    if (route.path !== '/home/runway/extend') return
    fetchExtendList()
  }, 0)
}
const fetchExtendList = async (force = false) => {
  if (!import.meta.client) return
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
      const request = get(`/api/records/extend-list?model=${encodeURIComponent(EXTEND_LIST_MODEL)}`)
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

// 路由 path 同步到 activeTab；进入 extend 时拉取 Task 列表
watch(() => route.path, (path) => {
  const tab = runwayPathToTab[path]
  if (tab && activeTab.value !== tab) activeTab.value = tab
  if (tab === 'extend') queueFetchExtendList()
}, { immediate: true })

onBeforeUnmount(() => {
  isUnmounted.value = true
  if (extendListFetchTimer) {
    clearTimeout(extendListFetchTimer)
    extendListFetchTimer = null
  }
})

// Generate Tab 初始值（切换 Tab 时还原用）
const INIT_GENERATE_FORM = {
  prompt: '',
  duration: '5',
  quality: '720p',
  imageFile: null,
  uploadedImageUrl: null,
  aspectRatio: '16:9',
  waterMark: ''
}
const formData = reactive({ ...INIT_GENERATE_FORM })

// Aleph Tab 初始值
const INIT_ALEPH_FORM = {
  prompt: '',
  videoFile: null,
  uploadedVideoUrl: null,
  waterMark: '',
  aspectRatio: '16:9',
  seed: null,
  referenceImageFile: null,
  uploadedReferenceImageUrl: null
}
const alephFormData = reactive({ ...INIT_ALEPH_FORM })

// Extend Tab 初始值
const INIT_EXTEND_FORM = { task: '', prompt: '', quality: '720p', waterMark: '' }
const extendFormData = reactive({ ...INIT_EXTEND_FORM })

// 切换 Tab 时当前表单恢复为初始状态，三个表单互不影响
watch(activeTab, (tab) => {
  if (tab === 'generate') Object.assign(formData, INIT_GENERATE_FORM)
  else if (tab === 'extend') Object.assign(extendFormData, INIT_EXTEND_FORM)
  else if (tab === 'aleph') Object.assign(alephFormData, INIT_ALEPH_FORM)
})

const isGenerating = ref(false)
const generatedVideos = ref([])
const alephReferenceVideo = ref('')
const alephVideoInputRef = ref(null)
const isUploadingAlephVideo = ref(false)

const formatFileSize = (bytes) => {
  if (bytes == null || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 折扣展示：仅展示折扣比例，不参与 credits 计算
const discountText = computed(() => {
  const rate = Number(discount?.value ?? 1)
  if (Number.isNaN(rate) || rate <= 0 || rate === 1) return ''
  const percent = (rate * 100).toFixed(0)
  return ` · ${percent}%`
})

// 价格：Generate -> runway_generate(RULE: duration, quality)；Extend -> runway_extend；Aleph -> runway_aleph
const runwayGeneratePriceText = computed(() => {
  const credits = getPrice('runway_generate', {
    duration: Number(formData.duration) || 5,
    quality: formData.quality || '720p',
    scene: 'generate'
  })
  const str = formatCredits(credits)
  if (!str) return ''
  return `· ${str} credits${discountText.value}`
})
const runwayExtendPriceText = computed(() => {
  const credits = getPrice('runway_extend')
  const str = formatCredits(credits)
  if (!str) return ''
  return `· ${str} credits${discountText.value}`
})
const runwayAlephPriceText = computed(() => {
  const credits = getPrice('runway_aleph')
  const str = formatCredits(credits)
  if (!str) return ''
  return `· ${str} credits${discountText.value}`
})

// Watch for duration and quality conflicts
watch([() => formData.duration, () => formData.quality], ([duration, quality]) => {
  if (duration === '10' && quality === '1080p') {
    formData.quality = '720p'
  }
})

// 选择文件后立即调用上传接口，并保存 URL 供提交使用
const isUploadingGenerateImage = ref(false)
const handleImageUpdate = async (files) => {
  if (!Array.isArray(files) || files.length === 0) {
    formData.imageFile = null
    formData.uploadedImageUrl = null
    return
  }
  formData.imageFile = files[0]
  formData.uploadedImageUrl = null
  isUploadingGenerateImage.value = true
  try {
    const urls = await uploadFilesToUrls([files[0]])
    formData.uploadedImageUrl = urls[0] || null
  } catch (e) {
    console.error('Reference image upload failed:', e)
    showError(e?.message || 'Upload failed')
    formData.imageFile = null
  } finally {
    isUploadingGenerateImage.value = false
  }
}

// Aleph：选择文件后立即上传
const isUploadingAlephImage = ref(false)
const handleAlephImageUpdate = async (files) => {
  if (!Array.isArray(files) || files.length === 0) {
    alephFormData.referenceImageFile = null
    alephFormData.uploadedReferenceImageUrl = null
    return
  }
  alephFormData.referenceImageFile = files[0]
  alephFormData.uploadedReferenceImageUrl = null
  isUploadingAlephImage.value = true
  try {
    const urls = await uploadFilesToUrls([files[0]])
    alephFormData.uploadedReferenceImageUrl = urls[0] || null
  } catch (e) {
    console.error('Aleph reference image upload failed:', e)
    showError(e?.message || 'Upload failed')
    alephFormData.referenceImageFile = null
  } finally {
    isUploadingAlephImage.value = false
  }
}

// 文件转Base64
const fileToBase64 = (file) => {
  if (!isClient) return Promise.resolve('')
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// 处理 Aleph 视频上传：选择后立即调用上传服务
const handleAlephVideoUpload = async (e) => {
  if (!isClient) return
  const file = e.target.files?.[0]
  if (!file) return
  if (!file.type.startsWith('video/')) {
    showError('Please select a valid video format (MP4, MOV, AVI)')
    e.target.value = ''
    return
  }
  if (file.size > 10 * 1024 * 1024) {
    showError('Video size cannot exceed 10MB')
    e.target.value = ''
    return
  }
  alephFormData.videoFile = file
  alephFormData.uploadedVideoUrl = null
  alephReferenceVideo.value = await fileToBase64(file)
  isUploadingAlephVideo.value = true
  try {
    const urls = await uploadFilesToUrls([file])
    alephFormData.uploadedVideoUrl = urls[0] || null
  } catch (err) {
    console.error('Aleph video upload failed:', err)
    showError(err?.message || 'Video upload failed')
    alephReferenceVideo.value = ''
    alephFormData.videoFile = null
  } finally {
    isUploadingAlephVideo.value = false
  }
  e.target.value = ''
}

// 清空 Aleph 参考视频
const clearAlephReferenceVideo = () => {
  alephReferenceVideo.value = ''
  alephFormData.videoFile = null
  alephFormData.uploadedVideoUrl = null
  if (alephVideoInputRef.value) alephVideoInputRef.value.value = ''
}

// Methods
const generateVideo = async () => {
  const promptTrim = formData.prompt?.trim()
  if (!promptTrim || promptTrim.length > 1800) {
    showError('Prompt is required and cannot exceed 1800 characters')
    return
  }
  if (addToUsageHistory) addToUsageHistory('Runway')

  isGenerating.value = true
  try {
    const body = {
      prompt: promptTrim,
      duration: Number(formData.duration) || 5,
      quality: formData.quality || '720p',
      imageUrl: formData.uploadedImageUrl || undefined,
      aspectRatio: formData.aspectRatio || undefined,
      waterMark: formData.waterMark?.trim() || undefined
    }
    const data = await post('/api/video/runway/generate', body)
    const rid = data?.recordId ?? data?.data?.recordId
    if (rid) { router.push(getRunwayRecordPath() + '?record-id=' + encodeURIComponent(rid)); return }
    let payload = data?.data ?? data
    const newVideo = {
      id: payload.taskId || Date.now(),
      url: payload.videoUrl || payload.url,
      thumbnail: payload.thumbnail,
      duration: `${formData.duration} seconds`,
      resolution: formData.quality,
      aspectRatio: formData.aspectRatio,
      prompt: formData.prompt,
      createdAt: new Date().toISOString()
    }
    generatedVideos.value.unshift(newVideo)
    formData.prompt = ''
    formData.imageFile = null
    formData.uploadedImageUrl = null
    formData.waterMark = ''
  } catch (error) {
    console.error('Video generation failed:', error)
    if (!error?.__fromApi) showError(error?.message || 'Request failed')
  } finally {
    isGenerating.value = false
  }
}

const downloadVideo = (video) => {
  // 实现下载逻辑
  console.log('Download video:', video)
}

const shareVideo = (video) => {
  // 实现分享逻辑
  console.log('Share video:', video)
}

const clearResults = () => {
  generatedVideos.value = []
}

// Aleph 视频生成方法
const generateAlephVideo = async () => {
  const promptTrim = alephFormData.prompt?.trim()
  if (!promptTrim || !alephFormData.uploadedVideoUrl) return
  if (addToUsageHistory) addToUsageHistory('Runway Aleph')

  isGenerating.value = true
  try {
    const videoUrl = alephFormData.uploadedVideoUrl

    const body = {
      prompt: promptTrim,
      videoUrl,
      waterMark: (alephFormData.waterMark?.trim() || '').slice(0, 20) || undefined,
      aspectRatio: alephFormData.aspectRatio || undefined,
      seed: alephFormData.seed != null && alephFormData.seed !== '' ? Math.max(0, Number(alephFormData.seed)) : undefined,
      referenceImageUrl: alephFormData.uploadedReferenceImageUrl || undefined
    }
    const data = await post('/api/video/runway/aleph', body)
    const rid = data?.recordId ?? data?.data?.recordId
    if (rid) { router.push(getRunwayRecordPath() + '?record-id=' + encodeURIComponent(rid)); return }
    let payload = data?.data ?? data
    const newVideo = {
      id: payload.taskId || Date.now(),
      url: payload.videoUrl || payload.url,
      thumbnail: payload.thumbnail,
      duration: 'Converted Video',
      resolution: '720p',
      aspectRatio: alephFormData.aspectRatio || '16:9',
      prompt: alephFormData.prompt,
      createdAt: new Date().toISOString()
    }
    generatedVideos.value.unshift(newVideo)
  } catch (error) {
    console.error('Failed to generate Aleph video:', error)
    if (!error?.__fromApi) showError(error?.message || 'Request failed')
  } finally {
    isGenerating.value = false
  }
}

// Get config header title based on active tab
const getConfigHeaderTitle = () => {
  if (!isClient) return 'Configuration'
  const titles = {
    'generate': 'Video Generation Configuration',
    'aleph': 'Aleph Video Conversion Configuration',
    'extend': 'Video Extend Configuration'
  }
  return titles[activeTab.value] || 'Configuration'
}

// Extend 视频生成方法
const generateExtendVideo = async () => {
  const taskTrim = extendFormData.task?.trim()
  const promptTrim = extendFormData.prompt?.trim()
  if (!taskTrim || !promptTrim) return
  if (promptTrim.length > 1000) {
    showError('Extension prompt cannot exceed 1000 characters')
    return
  }
  if (addToUsageHistory) addToUsageHistory('Runway Extend')

  isGenerating.value = true
  try {
    const body = {
      taskId: taskTrim,
      prompt: promptTrim,
      quality: extendFormData.quality || '720p',
      waterMark: extendFormData.waterMark?.trim() || undefined
    }
    const data = await post('/api/video/runway/extend', body)
    const rid = data?.recordId ?? data?.data?.recordId
    if (rid) { router.push(getRunwayRecordPath() + '?record-id=' + encodeURIComponent(rid)); return }
    let payload = data?.data ?? data
    const newVideo = {
      id: payload.taskId || Date.now(),
      url: payload.videoUrl || payload.url,
      thumbnail: payload.thumbnail,
      duration: 'Extended Video',
      resolution: extendFormData.quality,
      prompt: extendFormData.prompt,
      createdAt: new Date().toISOString()
    }
    generatedVideos.value.unshift(newVideo)
    extendFormData.task = ''
    extendFormData.prompt = ''
    extendFormData.waterMark = ''
  } catch (error) {
    console.error('Failed to generate Extend video:', error)
    if (!error?.__fromApi) showError(error?.message || 'Request failed')
  } finally {
    isGenerating.value = false
  }
}
</script>

<style scoped>
.runway-tool {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
  flex: 1;
  min-height: 0;
  gap: 20px;
}

 .tool-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.tool-avatar {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 16px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-avatar img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: auto;
}

.tool-details h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.tool-details p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

/* 上方模式选择：统一 mode-tabs-wrap 样式，主色 #3b82f6 */
.mode-tabs-wrap {
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.mode-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mode-tab {
  padding: 9px 14px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #64748b;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.mode-tab:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.mode-tab.active {
  background: #3b82f6;
  color: #fff;
  border-color: #3b82f6;
}

.mode-tab i {
  font-size: 1em;
}

.mode-tab span {
  font-weight: 500;
}

/* 配置面板 */
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

.config-header {
  padding: 0 0 20px 0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.config-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.config-form {
  flex: 1;
  overflow-y: auto;
}

.config-fieldset {
  border: none;
  margin: 0;
  padding: 0;
}

.cost-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cost-badge {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.cost-label {
  font-size: 12px;
  color: #64748b;
}

/* 表单样式 */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

/* 设置选项卡样式 */
.settings-tabs {
  display: flex;
  gap: 20px;
}

.tab-group {
  flex: 1;
  border: none;
  border-radius: 12px;
  overflow: hidden;
  background: transparent;
}

.tab-header {
  background: #f8fafc;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.tab-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.tab-content {
  padding: 16px;
}

.tab-options {
  display: flex;
  gap: 8px;
  background: transparent;
}

.tab-option {
  flex: 1;
  padding: 10px 12px;
  border: 2px solid #e2e8f0;
  background: #f8fafc;
  color: #374151;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
}

.tab-option:hover:not(:disabled) {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
  color: #3b82f6;
}

.tab-option.active {
  border-color: #3b82f6;
  background: #3b82f6;
  color: white;
}

.tab-option:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f9fafb;
}

.tab-warning {
  margin-top: 12px;
  padding: 8px 12px;
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 6px;
  color: #92400e;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tab-warning i {
  color: #f59e0b;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.radio-item:hover {
  border-color: #3b82f6;
  background: #f8fafc;
}

.radio-item input[type="radio"] {
  margin-right: 12px;
  width: auto;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
}

.radio-label small {
  color: #ef4444;
  font-size: 12px;
}

.select-wrapper {
  position: relative;
}

.select-wrapper select {
  appearance: none;
  padding-right: 40px;
}

.select-wrapper i {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  pointer-events: none;
}

.form-help {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
  line-height: 1.4;
}

.form-hint {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
  line-height: 1.4;
}

/* 上传区域样式 */
.upload-area {
  position: relative;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
  background: #fafafa;
  cursor: pointer;
}

.upload-area:hover {
  border-color: #3b82f6;
  background: #faf5ff;
}

.upload-area.has-files {
  border-color: #10b981;
  background: #f0fdf4;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.upload-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3b82f6;
  border-radius: 50%;
  color: white;
  font-size: 20px;
}

.upload-area.has-files .upload-icon {
  background: #10b981;
}

.upload-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.upload-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.upload-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

/* 上传后的内容样式 */
.uploaded-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.uploaded-video-container {
  position: relative;
  width: 200px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #10b981;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.uploaded-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.uploaded-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
}

.uploaded-text .upload-title {
  font-size: 16px;
  font-weight: 600;
  color: #10b981;
  margin: 0;
}

.uploaded-text .upload-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.remove-video-btn {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Aleph Input Video：小选择区 + 下方展示（与图片上传类似） */
.aleph-video-upload {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.aleph-video-trigger {
  position: relative;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 12px 16px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  transition: border-color 0.2s, background 0.2s;
}
.aleph-video-trigger:hover {
  border-color: #3b82f6;
  background: #eff6ff;
}
.aleph-video-trigger.has-video {
  border-color: #e2e8f0;
  background: #f8fafc;
}
.aleph-video-file-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.aleph-video-trigger-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  pointer-events: none;
}
.aleph-video-trigger-inner i {
  font-size: 18px;
  color: #64748b;
}
.aleph-video-trigger-inner span {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}
.aleph-video-trigger-inner small {
  font-size: 11px;
  color: #94a3b8;
}
.aleph-video-uploading {
  font-size: 13px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
}
.aleph-video-uploading i {
  font-size: 14px;
}
.aleph-video-display {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
}
.aleph-video-preview-wrap {
  position: relative;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 16/9;
  background: #000;
}
.aleph-video-preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
.aleph-video-remove {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: #dc2626;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: background 0.2s;
}
.aleph-video-remove:hover {
  background: #b91c1c;
}
.aleph-video-meta {
  padding: 10px 12px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: #f8fafc;
}
.aleph-video-name {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.aleph-video-size {
  font-size: 12px;
  color: #64748b;
  flex-shrink: 0;
}

.remove-video-btn:hover {
  background: #b91c1c;
  transform: scale(1.1);
}

.form-actions {
  margin-top: 24px;
  padding-bottom: 20px;
}

.btn-primary {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.price-tag {
  font-size: 15px;
  opacity: 0.8;
  margin-left: 4px;
}

/* 结果面板 */
.result-panel {
  width: 65%;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.video-header {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.video-header h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.video-container {
  flex: 1;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

/* 视频展示区域 */
.video-showcase {
  width: 100%;
  max-width: 100%;
}

.video-showcase-item {
  width: 100%;
  background: #f8fafc;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.video-player {
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
}

.video-player video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-details {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.video-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #64748b;
}

.video-actions {
  display: flex;
  gap: 8px;
}

.btn-secondary,
.btn-icon {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #64748b;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-secondary:hover,
.btn-icon:hover {
  background: #e2e8f0;
  color: #475569;
}

/* 空状态 */
.detail-loading-state, .detail-failure-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 40px; text-align: center;
}
.detail-spinner { font-size: 48px; color: #667eea; }
.detail-loading-state p, .detail-failure-state p { margin: 0; font-size: 16px; color: #64748b; }
.detail-failure-state .failure-icon { font-size: 56px; color: #ef4444; }
.detail-failure-state .failure-message { max-width: 420px; line-height: 1.6; color: #374151; }

.empty-state {
  text-align: center;
  color: #64748b;
  max-width: 500px;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.empty-icon {
  font-size: 72px;
  color: #cbd5e1;
  margin-bottom: 24px;
}

.empty-state h3 {
  font-size: 28px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
}

.empty-state p {
  font-size: 16px;
  margin: 0 0 32px 0;
  line-height: 1.6;
}

.empty-features {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  font-size: 16px;
  color: #64748b;
  padding: 8px 16px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(59, 130, 246, 0.15);
  transform: translateY(-2px);
}

.feature-item i {
  color: #3b82f6;
  width: 20px;
  font-size: 18px;
}

/* Usage Tips - Horizontal layout like Suno */
.usage-tips {
  padding: 20px 30px;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #64748b;
}

.tip-item:last-child {
  margin-bottom: 0;
}

.tip-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.tip-item strong {
  color: #374151;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .runway-tool {
    padding: 16px;
  }
  
  .tool-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .mode-tabs {
    gap: 6px;
  }
  
  .mode-tab {
    padding: 8px 12px;
    font-size: 13px;
  }
}

@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }
  
  .config-panel,
  .result-panel {
    width: 100%;
  }
}

</style>
