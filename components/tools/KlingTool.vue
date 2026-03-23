<template>
  <div class="kling-tool">
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Kling.png" alt="Kling" />
      </div>
      <div class="tool-details">
        <h3>Kling</h3>
        <p class="tool-description">Kling is the latest AI video generation model from Kuaishou Kling, designed for text-to-video and image-to-video creation. Compared to earlier versions, it features better prompt adherence, more fluid motion, consistent artistic styles, and realistic physics simulation.</p>
      </div>
    </div>

    <div class="mode-tabs-wrap">
      <div class="mode-tabs">
        <div
          v-for="m in modeList"
          :key="m.id"
          class="mode-tab"
          :class="tabClass(m.id)"
          @click="goToTab(m.id)"
        >
          <i :class="m.icon"></i>
          <span>{{ m.label }}</span>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="config-panel">
        <div class="config-header">
          <h4>Configuration</h4>
        </div>
        <form class="config-form" @submit.prevent="generate">
          <fieldset class="config-fieldset" :disabled="isGenerating">

            <!-- Prompt: most modes -->
            <div class="form-group" v-if="showPrompt">
              <label class="form-label">Prompt <span class="required">*</span></label>
              <textarea
                v-model="formData.prompt"
                class="form-input"
                :rows="modeAvatar ? 3 : 4"
                :placeholder="promptPlaceholder"
                :maxlength="promptMaxLength"
              ></textarea>
              <div class="char-count" v-if="formData.prompt">{{ formData.prompt.length }}/{{ promptMaxLength }}</div>
            </div>

            <!-- v2-5-turbo-image-to-video-pro: image_url, tail_image_url -->
            <div class="form-group" v-if="mode === 'v2-5-turbo-image-to-video-pro'">
              <label class="form-label">Image URL <span class="required">*</span></label>
              <UploadImage ref="imageUploadRef" input-id="kling-i2v-pro-img" label="" upload-text="Click to upload image" upload-hint="JPEG, PNG, WebP; max 10MB" :max-files="1" :max-file-size="10*1024*1024" accept="image/jpeg,image/png,image/webp" :multiple="false" @update:files="handleSingleImage" />
              <span v-if="isUploadingImage" class="form-hint">Uploading...</span>
            </div>
            <div class="form-group" v-if="mode === 'v2-5-turbo-image-to-video-pro'">
              <label class="form-label">Tail frame image (optional)</label>
              <UploadImage ref="tailImageUploadRef" input-id="kling-i2v-pro-tail" label="" upload-text="Click to upload tail frame" upload-hint="Optional; JPEG, PNG, WebP; max 10MB" :max-files="1" :max-file-size="10*1024*1024" accept="image/jpeg,image/png,image/webp" :multiple="false" @update:files="handleTailImage" />
              <span v-if="isUploadingTail" class="form-hint">Uploading...</span>
            </div>

            <!-- v2-5-turbo: duration, negative_prompt, cfg_scale -->
            <template v-if="mode === 'v2-5-turbo-image-to-video-pro' || mode === 'v2-5-turbo-text-to-video-pro'">
              <div class="form-group">
                <label class="form-label">Duration</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="duration5Class()" @click="formData.duration = '5'">5s</button>
                  <button type="button" class="tab-option" :class="duration10Class()" @click="formData.duration = '10'">10s</button>
                </div>
              </div>
              <div class="form-group" v-if="mode === 'v2-5-turbo-text-to-video-pro'">
                <label class="form-label">Aspect ratio</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="aspectRatio16_9Class" @click="setAspectRatio(ASPECT_16_9)">16:9</button>
                  <button type="button" class="tab-option" :class="aspectRatio9_16Class" @click="setAspectRatio(ASPECT_9_16)">9:16</button>
                  <button type="button" class="tab-option" :class="aspectRatio1_1Class" @click="setAspectRatio(ASPECT_1_1)">1:1</button>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Negative prompt (optional)</label>
                <textarea v-model="formData.negative_prompt" class="form-input" rows="2" :maxlength="mode === 'v2-5-turbo-image-to-video-pro' ? 2496 : 2500" placeholder="Elements to avoid"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">CFG scale (0-1)</label>
                <input v-model.number="formData.cfg_scale" type="number" min="0" max="1" step="0.1" class="form-input" />
              </div>
            </template>

            <!-- 2.6-text-to-video: sound, aspect_ratio, duration -->
            <template v-if="mode === 'v2-6-text-to-video'">
              <div class="form-group">
                <label class="form-label">Sound</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="soundOffClass()" @click="formData.sound = false">Off</button>
                  <button type="button" class="tab-option" :class="soundOnClass()" @click="formData.sound = true">On</button>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Aspect ratio</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="aspectRatio1_1Class" @click="setAspectRatio(ASPECT_1_1)">1:1</button>
                  <button type="button" class="tab-option" :class="aspectRatio16_9Class" @click="setAspectRatio(ASPECT_16_9)">16:9</button>
                  <button type="button" class="tab-option" :class="aspectRatio9_16Class" @click="setAspectRatio(ASPECT_9_16)">9:16</button>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Duration</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="duration5Class()" @click="formData.duration = '5'">5s</button>
                  <button type="button" class="tab-option" :class="duration10Class()" @click="formData.duration = '10'">10s</button>
                </div>
              </div>
            </template>

            <!-- 2.6-image-to-video: image_urls (array), sound, duration -->
            <template v-if="mode === 'v2-6-image-to-video'">
              <div class="form-group">
                <label class="form-label">Image URLs <span class="required">*</span></label>
                <UploadImage ref="i2v26ImageRef" input-id="kling-26-i2v" label="" upload-text="Click to upload image" upload-hint="JPEG, PNG, WebP; max 10MB" :max-files="1" :max-file-size="10*1024*1024" accept="image/jpeg,image/png,image/webp" :multiple="false" @update:files="handleImageUrlsSingle" />
                <span v-if="isUploadingImage" class="form-hint">Uploading...</span>
              </div>
              <div class="form-group">
                <label class="form-label">Sound</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="soundOffClass()" @click="formData.sound = false">Off</button>
                  <button type="button" class="tab-option" :class="soundOnClass()" @click="formData.sound = true">On</button>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Duration</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="duration5Class()" @click="formData.duration = '5'">5s</button>
                  <button type="button" class="tab-option" :class="duration10Class()" @click="formData.duration = '10'">10s</button>
                </div>
              </div>
            </template>

            <!-- motion-control: input_urls (image), video_urls, character_orientation, mode -->
            <template v-if="mode === 'v2-6-motion-control' || mode === 'v3-0-motion-control'">
              <div class="form-group">
                <label class="form-label">Reference image <span class="required">*</span></label>
                <UploadImage ref="motionImageRef" input-id="kling-motion-img" label="" upload-text="Click to upload reference image" upload-hint="JPG/PNG, max 10MB, min 300px" :max-files="1" :max-file-size="10*1024*1024" accept="image/jpeg,image/png,image/jpg" :multiple="false" @update:files="handleMotionImage" />
                <span v-if="isUploadingMotionImage" class="form-hint">Uploading...</span>
              </div>
              <div class="form-group">
                <label class="form-label">Reference video <span class="required">*</span></label>
                <div class="kling-video-upload">
                  <div class="kling-video-trigger" :class="{ 'has-video': formData.video_urls.length }">
                    <input
                      ref="motionVideoInput"
                      type="file"
                      accept="video/mp4,video/quicktime,video/x-matroska"
                      class="kling-video-file-input"
                      @change="handleMotionVideo"
                    />
                    <div class="kling-video-trigger-inner" @click="motionVideoInput && motionVideoInput.click()">
                      <i class="fas fa-cloud-upload-alt"></i>
                      <span>Click to upload video</span>
                      <small>Supports MP4/MOV/MKV, max 100MB</small>
                    </div>
                  </div>
                  <div v-if="isUploadingMotionVideo" class="kling-video-uploading">
                    <i class="fas fa-spinner fa-spin"></i> Uploading video...
                  </div>
                  <div v-if="formData.video_urls.length && !isUploadingMotionVideo" class="kling-video-display">
                    <div class="kling-video-preview-wrap">
                      <video :src="formData.video_urls[0]" class="kling-video-preview" controls></video>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Character orientation</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="orientationImageClass()" @click="formData.character_orientation = 'image'">Image</button>
                  <button type="button" class="tab-option" :class="orientationVideoClass()" @click="formData.character_orientation = 'video'">Video</button>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">{{ mode === 'v3-0-motion-control' ? 'Quality mode' : 'Resolution' }}</label>
                <div class="tab-group">
                  <template v-if="mode === 'v3-0-motion-control'">
                    <button type="button" class="tab-option" :class="{ active: formData.mode === 'std' }" @click="formData.mode = 'std'">std</button>
                    <button type="button" class="tab-option" :class="{ active: formData.mode === 'pro' }" @click="formData.mode = 'pro'">pro</button>
                  </template>
                  <template v-else>
                    <button type="button" class="tab-option" :class="mode720Class()" @click="formData.mode = '720p'">720p</button>
                    <button type="button" class="tab-option" :class="mode1080Class()" @click="formData.mode = '1080p'">1080p</button>
                  </template>
                </div>
                <p v-if="mode === 'v3-0-motion-control'" class="form-hint">std: standard 720p, pro: professional 1080p.</p>
              </div>
              <div class="form-group" v-if="mode === 'v3-0-motion-control'">
                <label class="form-label">Background source</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="{ active: formData.background_source === 'input_video' }" @click="formData.background_source = 'input_video'">video</button>
                  <button type="button" class="tab-option" :class="{ active: formData.background_source === 'input_image' }" @click="formData.background_source = 'input_image'">image</button>
                </div>
              </div>
            </template>

            <!-- ai-avatar-standard / ai-avatar-pro: image_url, audio_url, prompt -->
            <template v-if="modeAvatar">
              <div class="form-group">
                <label class="form-label">Avatar image <span class="required">*</span></label>
                <UploadImage ref="avatarImageRef" input-id="kling-avatar-img" label="" upload-text="Click to upload avatar image" upload-hint="JPEG, PNG, WebP; max 10MB" :max-files="1" :max-file-size="10*1024*1024" accept="image/jpeg,image/png,image/webp" :multiple="false" @update:files="handleAvatarImage" />
                <span v-if="isUploadingAvatarImage" class="form-hint">Uploading...</span>
              </div>
              <div class="form-group">
                <label class="form-label">Audio URL <span class="required">*</span></label>
                <input ref="avatarAudioInput" type="file" accept="audio/mpeg,audio/wav,audio/x-wav,audio/aac,audio/mp4,audio/ogg" class="file-input-hidden" @change="handleAvatarAudio" />
                <div class="upload-area" @click="avatarAudioInput && avatarAudioInput.click()">
                  <span v-if="isUploadingAvatarAudio">Uploading...</span>
                  <span v-else-if="formData.audio_url">Audio uploaded</span>
                  <span v-else>Click to upload audio (MP3/WAV/AAC/OGG, max 10MB)</span>
                </div>
              </div>
            </template>

            <!-- 3.0-video: mode, image_urls (start/end), prompt or multi_prompt, duration, multi_shots, sound, aspect_ratio, kling_elements -->
            <div v-if="mode === 'v3-0-video'">
              <div class="form-group">
                <label class="form-label">Generation mode</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="klingModeStdClass()" @click="formData.kling_mode = 'std'">std</button>
                  <button type="button" class="tab-option" :class="klingModeProClass()" @click="formData.kling_mode = 'pro'">pro</button>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Multi-shot</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="v3MultiShotsOffClass" @click="setV3MultiShotsOff">Single shot</button>
                  <button type="button" class="tab-option" :class="v3MultiShotsOnClass" @click="setV3MultiShotsOn">Multi-shot</button>
                </div>
                <p class="form-hint">Single: one prompt, 3-15s. Multi-shot: up to 5 shots, each 1-12s, total 3-15s; sound must be On.</p>
              </div>
              <div class="form-group">
                <label class="form-label">Start frame image (optional)</label>
                <UploadImage ref="kling30ImageRef" input-id="kling-30-img" label="" upload-text="Click to upload image" upload-hint="PNG, JPG, JPEG" :max-files="1" :max-file-size="10*1024*1024" accept="image/png,image/jpeg,image/jpg" :multiple="false" @update:files="handleKling30Image" />
                <span v-if="isUploadingKling30Image" class="form-hint">Uploading...</span>
              </div>
              <div v-if="!formData.v3_multi_shots" class="form-group">
                <label class="form-label">End frame image (optional, single shot)</label>
                <UploadImage ref="kling30EndImageRef" input-id="kling-30-end-img" label="" upload-text="Click to upload end frame" upload-hint="PNG, JPG, JPEG" :max-files="1" :max-file-size="10*1024*1024" accept="image/png,image/jpeg,image/jpg" :multiple="false" @update:files="handleKling30EndImage" />
                <span v-if="isUploadingKling30EndImage" class="form-hint">Uploading...</span>
              </div>
              <div class="form-group">
                <label class="form-label">Shots + Element</label>
                <p class="form-hint">Add groups. Each: prompt + duration + optional element. Total duration 3-15s.</p>
                <div class="shots-list">
                  <div class="shot-card" v-for="(shot, idx) in formData.v3_multi_prompt" :key="idx">
                    <div class="shot-title">Shot {{ idx + 1 }}</div>
                    <textarea
                      class="shot-text"
                      v-model="shot.prompt"
                      rows="3"
                      :placeholder="'Describe this shot...'"
                      maxlength="500"
                    ></textarea>
                    <div class="shot-footer">
                      <div class="duration-input">
                        <select v-model.number="shot.duration" class="duration-field duration-select">
                          <option v-for="d in v3DurationOptions" :key="d" :value="d">{{ d }}</option>
                        </select>
                        <span class="duration-s">s</span>
                      </div>
                      <button v-if="formData.v3_multi_shots && formData.v3_multi_prompt.length > 1" type="button" class="shot-delete" @click="removeV3Shot(idx)" title="Delete shot">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                    <div v-if="shot.element" class="v3-shot-element">
                      <div class="shot-element-label">Element for this shot</div>
                      <input v-model="shot.element.name" type="text" class="form-input" placeholder="Element name (e.g. element_dog)" />
                      <textarea v-model="shot.element.description" class="shot-text shot-text-desc" rows="2" placeholder="Description (required)"></textarea>
                      <UploadImage
                        :ref="(el) => setKlingShotElementRef(idx, el)"
                        :input-id="'kling-shot-el-' + idx"
                        label=""
                        upload-text="2-50 images"
                        upload-hint="JPG/PNG, 2-50 images"
                        :max-files="50"
                        :max-file-size="10*1024*1024"
                        accept="image/jpeg,image/jpg,image/png"
                        :multiple="true"
                        @update:files="(files) => handleKlingShotElementImages(idx, files)"
                      />
                      <button type="button" class="btn-secondary" @click="removeShotElement(idx)">Remove element</button>
                    </div>
                    <button v-else type="button" class="btn-secondary add-element-btn" @click="addShotElement(idx)">+ Add element for this shot</button>
                  </div>
                </div>
                <button v-if="formData.v3_multi_shots && formData.v3_multi_prompt.length < 5" type="button" class="add-shot" @click="addV3Shot">
                  <i class="fas fa-plus"></i> Add shot
                </button>
                <p v-if="formData.v3_multi_shots" class="form-hint">Total: {{ v3MultiShotTotalDuration }}s (must be 3-15s).</p>
              </div>
              <div v-if="!formData.v3_multi_shots">
                <div class="form-group">
                  <label class="form-label">Aspect ratio</label>
                  <div class="tab-group">
                    <button type="button" class="tab-option" :class="v3AspectRatio1_1Class" @click="setV3AspectRatio(V3_RATIO_1_1)">1:1</button>
                    <button type="button" class="tab-option" :class="v3AspectRatio16_9Class" @click="setV3AspectRatio(V3_RATIO_16_9)">16:9</button>
                    <button type="button" class="tab-option" :class="v3AspectRatio9_16Class" @click="setV3AspectRatio(V3_RATIO_9_16)">9:16</button>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Sound</label>
                  <div class="tab-group">
                    <button type="button" class="tab-option" :class="v3SoundOffClass" @click="setV3SoundOff">Off</button>
                    <button type="button" class="tab-option" :class="v3SoundOnClass" @click="setV3SoundOn">On</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <div v-if="mode === 'v2-6-motion-control' || mode === 'v3-0-motion-control'" class="form-hint motion-price-hint">
                <span v-if="mode === 'v2-6-motion-control'">720p: 9 credits per second, 1080p: 15 credits per second (billed by uploaded video duration)</span>
                <span v-else>std: 30 credits per second, pro: 40 credits per second (billed by uploaded video duration)</span>
              </div>
              <button type="submit" class="btn-primary" :disabled="!canGenerate || isGenerating">
                <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-play"></i>
                <span v-if="isGenerating">Generating...</span>
                <span v-else>
                  Generate Video
                  <span v-if="klingPriceText" class="price-tag">{{ klingPriceText }}</span>
                </span>
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
        <div v-else-if="displayVideoUrl" class="video-result">
          <div class="video-player">
            <video :src="displayVideoUrl" controls class="video-element"></video>
          </div>
          <div class="video-actions">
            <button @click="downloadVideo" class="action-btn"><i class="fas fa-download"></i> Download</button>
          </div>
        </div>
        <div v-else class="empty-state">
          <h4>No video generated yet</h4>
          <p>Fill in the form and click &quot;Generate Video&quot; to start.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import UploadImage from './common/UploadImage.vue'
import { useToast } from '../../composables/useToast'
import { useApi } from '../../composables/useApi'
import { useRecordPolling } from '../../composables/useRecordPolling'
import { useModelPrice } from '~/composables/useModelPrice'

const router = useRouter()
const route = useRoute()
const { showError } = useToast()
const { post } = useApi()
const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling()
const { fetchPrices, getPrice, formatCredits, discount } = useModelPrice()
const batchUploadUrl = useBatchUploadUrl()

const modeList = [
  { id: 'v2-5-turbo-image-to-video-pro', label: 'v2.5 Turbo I2V Pro', icon: 'fas fa-image' },
  { id: 'v2-5-turbo-text-to-video-pro', label: 'v2.5 Turbo T2V Pro', icon: 'fas fa-keyboard' },
  { id: 'v2-6-text-to-video', label: '2.6 Text to Video', icon: 'fas fa-font' },
  { id: 'v2-6-image-to-video', label: '2.6 Image to Video', icon: 'fas fa-image' },
  { id: 'v2-6-motion-control', label: '2.6 Motion Control', icon: 'fas fa-route' },
  { id: 'v3-0-motion-control', label: '3.0 Motion Control', icon: 'fas fa-bezier-curve' },
  { id: 'ai-avatar-standard', label: 'AI Avatar Standard', icon: 'fas fa-user' },
  { id: 'ai-avatar-pro', label: 'AI Avatar Pro', icon: 'fas fa-user-tie' },
  { id: 'v3-0-video', label: '3.0 Video', icon: 'fas fa-film' }
]

const modeTabToPath = {
  'v2-5-turbo-image-to-video-pro': '/home/kling/v2-5-turbo-image-to-video-pro',
  'v2-5-turbo-text-to-video-pro': '/home/kling/v2-5-turbo-text-to-video-pro',
  'v2-6-text-to-video': '/home/kling/v2-6-text-to-video',
  'v2-6-image-to-video': '/home/kling/v2-6-image-to-video',
  'v2-6-motion-control': '/home/kling/v2-6-motion-control',
  'v3-0-motion-control': '/home/kling/v3-0-motion-control',
  'ai-avatar-standard': '/home/kling/ai-avatar-standard',
  'ai-avatar-pro': '/home/kling/ai-avatar-pro',
  'v3-0-video': '/home/kling/v3-0-video'
}
const pathToMode = {}
Object.keys(modeTabToPath).forEach(k => { pathToMode[modeTabToPath[k]] = k })

const mode = ref('v2-5-turbo-image-to-video-pro')
function goToTab(m) {
  mode.value = m
  if (m === 'v3-0-motion-control' && (formData.mode !== 'std' && formData.mode !== 'pro')) formData.mode = 'std'
  if (m === 'v2-6-motion-control' && (formData.mode !== '720p' && formData.mode !== '1080p')) formData.mode = '720p'
  router.push(modeTabToPath[m] || modeTabToPath['v2-5-turbo-image-to-video-pro'])
}

const formData = reactive({
  prompt: '',
  image_url: '',
  tail_image_url: '',
  image_urls: [],
  duration: '5',
  aspect_ratio: '16:9',
  negative_prompt: '',
  cfg_scale: 0.5,
  sound: false,
  input_urls: [],
  video_urls: [],
  character_orientation: 'video',
  mode: '720p',
  background_source: 'input_video',
  audio_url: '',
  kling_mode: 'std',
  kling_image_urls: [],
  kling_end_frame_url: '',
  v3_multi_shots: false,
  v3_multi_prompt: [{ prompt: '', duration: 3, element: null }],
  v3_aspect_ratio: '1:1',
  kling_elements: []
})

onMounted(() => { fetchPrices() })

const imageUploadRef = ref(null)
const i2v26ImageRef = ref(null)
const tailImageUploadRef = ref(null)
const motionImageRef = ref(null)
const motionVideoInput = ref(null)
const avatarImageRef = ref(null)
const avatarAudioInput = ref(null)
const kling30ImageRef = ref(null)
const kling30EndImageRef = ref(null)
const klingElementUploadRefs = ref({})
const klingShotElementUploadRefs = ref({})

const isUploadingImage = ref(false)
const isUploadingTail = ref(false)
const isUploadingMotionImage = ref(false)
const isUploadingMotionVideo = ref(false)
const isUploadingAvatarImage = ref(false)
const isUploadingAvatarAudio = ref(false)
const isUploadingKling30Image = ref(false)
const isUploadingKling30EndImage = ref(false)
const isUploadingKlingElement = ref(false)

const result = ref(null)
const isGenerating = ref(false)
const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)

// 折扣文本
const discountText = computed(() => {
  const rate = Number(discount?.value ?? 1)
  if (Number.isNaN(rate) || rate <= 0 || rate === 1) return ''
  const percent = (rate * 100).toFixed(0)
  return ` · ${percent}%`
})

// 价格：
// - v2.5 Turbo T2V/I2V Pro：按 Duration 匹配 RULE（scene 固定 generate）
// - 2.6 Text/Image to Video：按 Duration + Sound 匹配 RULE（sound=false -> without_sound；true -> with_sound）
const klingPriceText = computed(() => {
  let modelKey = ''
  const durationNum = Number(formData.duration) || 0
  const m = mode.value

  if (m === 'v2-5-turbo-image-to-video-pro') {
    modelKey = 'kling-v2-5-turbo-image-to-video-pro'
    const credits = getPrice(modelKey, { duration: durationNum, scene: 'generate' })
    const str = formatCredits(credits)
    return str ? `· ${str} credits${discountText.value}` : ''
  }
  if (m === 'v2-5-turbo-text-to-video-pro') {
    modelKey = 'kling-v2-5-turbo-text-to-video-pro'
    const credits = getPrice(modelKey, { duration: durationNum, scene: 'generate' })
    const str = formatCredits(credits)
    return str ? `· ${str} credits${discountText.value}` : ''
  }
  if (m === 'v2-6-text-to-video') {
    modelKey = 'kling-2.6-text-to-video'
    const scene = formData.sound ? 'with_sound' : 'without_sound'
    const credits = getPrice(modelKey, { duration: durationNum, scene })
    const str = formatCredits(credits)
    return str ? `· ${str} credits${discountText.value}` : ''
  }
  if (m === 'v2-6-image-to-video') {
    modelKey = 'kling-2.6-image-to-video'
    const scene = formData.sound ? 'with_sound' : 'without_sound'
    const credits = getPrice(modelKey, { duration: durationNum, scene })
    const str = formatCredits(credits)
    return str ? `· ${str} credits${discountText.value}` : ''
  }
  if (m === 'v3-0-video') {
    modelKey = 'kling-3.0-video'
    const size = formData.kling_mode || 'std' // std / pro
    let totalDuration = 0
    if (formData.v3_multi_shots) {
      // 多镜头：按所有 shots 的 duration 总和
      totalDuration = v3MultiShotTotalDuration.value || 0
    } else {
      const firstShot = (formData.v3_multi_prompt || [])[0]
      totalDuration = Number(firstShot?.duration) || 0
    }
    const scene = formData.sound ? 'with_sound' : 'without_sound'
    const credits = getPrice(modelKey, {
      duration: totalDuration,
      size,
      scene
    })
    const str = formatCredits(credits)
    return str ? `· ${str} credits${discountText.value}` : ''
  }
  if (m === 'v2-6-motion-control') {
    modelKey = 'kling-2.6-motion-control'
    const quality = formData.mode || '720p'
    const credits = getPrice(modelKey, {
      duration: durationNum,
      quality,
      scene: 'generate'
    })
    const str = formatCredits(credits)
    return str ? `· ${str} credits${discountText.value}` : ''
  }
  if (m === 'v3-0-motion-control') {
    modelKey = 'kling-3.0-motion-control'
    const duration = Number(formData.duration) || 0
    const quality = formData.mode === 'pro' ? '1080p' : '720p'
    const credits = getPrice(modelKey, { duration, quality, scene: 'generate' })
    const str = formatCredits(credits)
    return str ? `· ${str} credits${discountText.value}` : ''
  }
  if (m === 'ai-avatar-standard') {
    modelKey = 'kling-ai-avatar-standard'
    const credits = getPrice(modelKey)
    const str = formatCredits(credits)
    return str ? `· ${str} credits${discountText.value}` : ''
  }
  if (m === 'ai-avatar-pro') {
    modelKey = 'kling-ai-avatar-pro'
    const credits = getPrice(modelKey)
    const str = formatCredits(credits)
    return str ? `· ${str} credits${discountText.value}` : ''
  }
  return ''
})

const showPrompt = computed(() => ['v2-5-turbo-image-to-video-pro', 'v2-5-turbo-text-to-video-pro', 'v2-6-text-to-video', 'v2-6-image-to-video', 'v2-6-motion-control', 'v3-0-motion-control', 'ai-avatar-standard', 'ai-avatar-pro'].includes(mode.value))
const modeAvatar = computed(() => mode.value === 'ai-avatar-standard' || mode.value === 'ai-avatar-pro')
const promptMaxLength = computed(() => modeAvatar.value ? 5000 : 2500)
const promptPlaceholder = computed(() => modeAvatar.value ? 'Prompt for video generation (max 5000)' : 'Text description for the video (max 2500)')
const ASPECT_16_9 = '16:9'
const ASPECT_9_16 = '9:16'
const ASPECT_1_1 = '1:1'
function tabClass(modeId) { return { active: mode.value === modeId } }
const aspectRatio16_9Class = computed(() => ({ active: formData.aspect_ratio === ASPECT_16_9 }))
const aspectRatio9_16Class = computed(() => ({ active: formData.aspect_ratio === ASPECT_9_16 }))
const aspectRatio1_1Class = computed(() => ({ active: formData.aspect_ratio === ASPECT_1_1 }))
function setAspectRatio(r) { formData.aspect_ratio = r }
const v3AspectRatio1_1 = computed(() => formData.v3_aspect_ratio === '1:1')
const v3AspectRatio16_9 = computed(() => formData.v3_aspect_ratio === '16:9')
const v3AspectRatio9_16 = computed(() => formData.v3_aspect_ratio === '9:16')
const v3AspectRatio1_1Class = computed(() => ({ active: formData.v3_aspect_ratio === '1:1' }))
const v3AspectRatio16_9Class = computed(() => ({ active: formData.v3_aspect_ratio === '16:9' }))
const v3AspectRatio9_16Class = computed(() => ({ active: formData.v3_aspect_ratio === '9:16' }))
const v3DurationOptions = computed(() => formData.v3_multi_shots ? [1,2,3,4,5,6,7,8,9,10,11,12] : [3,4,5,6,7,8,9,10,11,12,13,14,15])
const v3MultiShotsOffClass = computed(() => ({ active: formData.v3_multi_shots === false }))
const v3MultiShotsOnClass = computed(() => ({ active: formData.v3_multi_shots === true }))
function setV3MultiShotsOff() { formData.v3_multi_shots = false }
function setV3MultiShotsOn() { formData.v3_multi_shots = true; formData.sound = true }
const V3_RATIO_1_1 = '1:1'
const V3_RATIO_16_9 = '16:9'
const V3_RATIO_9_16 = '9:16'
const v3SoundOff = computed(() => formData.sound === false)
const v3SoundOn = computed(() => formData.sound === true)
const v3SoundOffClass = computed(() => ({ active: formData.sound === false }))
const v3SoundOnClass = computed(() => ({ active: formData.sound === true }))
function setV3SoundOff() { formData.sound = false }
function setV3SoundOn() { formData.sound = true }
function setKlingShotElementRef(i, el) { if (el) klingShotElementUploadRefs.value[i] = el }
function duration5Class() { return { active: formData.duration === '5' } }
function duration10Class() { return { active: formData.duration === '10' } }
function soundOffClass() { return { active: formData.sound === false } }
function soundOnClass() { return { active: formData.sound === true } }
function orientationImageClass() { return { active: formData.character_orientation === 'image' } }
function orientationVideoClass() { return { active: formData.character_orientation === 'video' } }
function mode720Class() { return { active: formData.mode === '720p' } }
function mode1080Class() { return { active: formData.mode === '1080p' } }
function klingModeStdClass() { return { active: formData.kling_mode === 'std' } }
function klingModeProClass() { return { active: formData.kling_mode === 'pro' } }

async function uploadOneFile(file, isVideo = false) {
  const form = new FormData()
  form.append('file', file)
  const headers = { Accept: 'application/json' }
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : null
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(batchUploadUrl, { method: 'POST', headers, body: form, credentials: 'include' })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.errorMessage || err?.message || 'Upload failed')
  }
  const data = await res.json()
  const urls = data?.data?.urls || data?.fileUrls || (Array.isArray(data?.data) ? data.data : [])
  const url = Array.isArray(urls) && urls.length ? urls[0] : (data?.data?.url || '')
  return typeof url === 'string' ? url : ''
}

async function handleSingleImage(files) {
  if (!files?.length) { formData.image_url = ''; return }
  isUploadingImage.value = true
  try {
    formData.image_url = await uploadOneFile(Array.isArray(files) ? files[0] : files)
  } catch (e) {
    showError(e?.message || 'Upload failed')
    formData.image_url = ''
    imageUploadRef.value?.clearFiles?.()
  } finally { isUploadingImage.value = false }
}
async function handleTailImage(files) {
  if (!files?.length) { formData.tail_image_url = ''; return }
  isUploadingTail.value = true
  try {
    formData.tail_image_url = await uploadOneFile(Array.isArray(files) ? files[0] : files)
  } catch (e) {
    showError(e?.message || 'Upload failed')
    formData.tail_image_url = ''
    tailImageUploadRef.value?.clearFiles?.()
  } finally { isUploadingTail.value = false }
}
async function handleImageUrlsSingle(files) {
  if (!files?.length) { formData.image_urls = []; return }
  isUploadingImage.value = true
  try {
    const url = await uploadOneFile(Array.isArray(files) ? files[0] : files)
    formData.image_urls = url ? [url] : []
  } catch (e) {
    showError(e?.message || 'Upload failed')
    formData.image_urls = []
    i2v26ImageRef.value?.clearFiles?.()
  } finally { isUploadingImage.value = false }
}
async function handleMotionImage(files) {
  if (!files?.length) { formData.input_urls = []; return }
  isUploadingMotionImage.value = true
  try {
    const url = await uploadOneFile(Array.isArray(files) ? files[0] : files)
    formData.input_urls = url ? [url] : []
  } catch (e) {
    showError(e?.message || 'Upload failed')
    formData.input_urls = []
    motionImageRef.value?.clearFiles?.()
  } finally { isUploadingMotionImage.value = false }
}

async function getVideoDurationSeconds(file) {
  if (typeof document === 'undefined') return 0
  return new Promise((resolve) => {
    try {
      const url = URL.createObjectURL(file)
      const video = document.createElement('video')
      const cleanup = () => {
        video.removeEventListener('loadedmetadata', onLoaded)
        video.removeEventListener('error', onError)
        URL.revokeObjectURL(url)
      }
      const onLoaded = () => {
        const d = Number(video.duration) || 0
        cleanup()
        resolve(d)
      }
      const onError = () => {
        cleanup()
        resolve(0)
      }
      video.addEventListener('loadedmetadata', onLoaded)
      video.addEventListener('error', onError)
      video.src = url
    } catch {
      resolve(0)
    }
  })
}

async function handleMotionVideo(e) {
  const file = e.target?.files?.[0]
  if (!file) return
  if (file.size > 100 * 1024 * 1024) { showError('Video max 100MB'); e.target.value = ''; return }
  isUploadingMotionVideo.value = true
  try {
    const secs = await getVideoDurationSeconds(file)
    if (secs > 0) formData.duration = String(Math.ceil(secs))
    const url = await uploadOneFile(file, true)
    formData.video_urls = url ? [url] : []
  } catch (err) {
    showError(err?.message || 'Upload failed')
    formData.video_urls = []
  } finally { isUploadingMotionVideo.value = false; e.target.value = '' }
}
async function handleAvatarImage(files) {
  if (!files?.length) return
  isUploadingAvatarImage.value = true
  try {
    formData.image_url = await uploadOneFile(Array.isArray(files) ? files[0] : files)
  } catch (e) {
    showError(e?.message || 'Upload failed')
    formData.image_url = ''
    avatarImageRef.value?.clearFiles?.()
  } finally { isUploadingAvatarImage.value = false }
}
async function handleAvatarAudio(e) {
  const file = e.target?.files?.[0]
  if (!file) return
  isUploadingAvatarAudio.value = true
  try {
    formData.audio_url = await uploadOneFile(file)
  } catch (err) {
    showError(err?.message || 'Upload failed')
    formData.audio_url = ''
  } finally { isUploadingAvatarAudio.value = false; e.target.value = '' }
}
async function handleKling30Image(files) {
  if (!files?.length) { formData.kling_image_urls = []; return }
  isUploadingKling30Image.value = true
  try {
    const url = await uploadOneFile(Array.isArray(files) ? files[0] : files)
    formData.kling_image_urls = url ? [url] : []
  } catch (e) {
    showError(e?.message || 'Upload failed')
    formData.kling_image_urls = []
    kling30ImageRef.value?.clearFiles?.()
  } finally { isUploadingKling30Image.value = false }
}
async function handleKling30EndImage(files) {
  if (!files?.length) { formData.kling_end_frame_url = ''; return }
  isUploadingKling30EndImage.value = true
  try {
    formData.kling_end_frame_url = await uploadOneFile(Array.isArray(files) ? files[0] : files)
  } catch (e) {
    showError(e?.message || 'Upload failed')
    formData.kling_end_frame_url = ''
    kling30EndImageRef.value?.clearFiles?.()
  } finally { isUploadingKling30EndImage.value = false }
}
function addV3Shot() {
  if (formData.v3_multi_prompt.length >= 5) return
  formData.v3_multi_prompt.push({ prompt: '', duration: 3, element: null })
}
function removeV3Shot(idx) {
  formData.v3_multi_prompt.splice(idx, 1)
  if (formData.v3_multi_prompt.length === 0) formData.v3_multi_prompt.push({ prompt: '', duration: 3, element: null })
}
function addShotElement(shotIdx) {
  formData.v3_multi_prompt[shotIdx].element = { name: '', description: '', element_input_urls: [] }
}
function removeShotElement(shotIdx) {
  formData.v3_multi_prompt[shotIdx].element = null
}
watch(() => formData.v3_multi_shots, (multi) => {
  if (!multi && formData.v3_multi_prompt.length > 1) {
    const first = formData.v3_multi_prompt[0]
    const d = Number(first?.duration) ?? 5
    formData.v3_multi_prompt = [{ prompt: first?.prompt ?? '', duration: (d >= 3 && d <= 15) ? d : 5, element: first?.element ?? null }]
  }
}, { flush: 'sync' })
const v3MultiShotTotalDuration = computed(() => {
  return formData.v3_multi_prompt.reduce((sum, s) => sum + (Number(s.duration) || 0), 0)
})
function addKlingElement() {
  formData.kling_elements = [{ name: '', description: '', element_input_urls: [] }]
}
function removeKlingElement(idx) {
  formData.kling_elements.splice(idx, 1)
}
async function handleKlingElementImages(eIdx, files) {
  if (!formData.kling_elements[eIdx]) return
  if (!files?.length) { formData.kling_elements[eIdx].element_input_urls = []; return }
  const el = formData.kling_elements[eIdx]
  isUploadingKlingElement.value = true
  try {
    const fileList = Array.isArray(files) ? files : [files]
    if (fileList.length < 2 || fileList.length > 50) {
      showError('Element requires 2-50 images')
      return
    }
    const urls = []
    for (const f of fileList) {
      const url = await uploadOneFile(f)
      if (url) urls.push(url)
    }
    el.element_input_urls = urls
  } catch (e) {
    showError(e?.message || 'Upload failed')
    el.element_input_urls = []
    const ref = klingElementUploadRefs.value[eIdx]
    if (ref?.clearFiles) ref.clearFiles()
  } finally { isUploadingKlingElement.value = false }
}
async function handleKlingShotElementImages(shotIdx, files) {
  const shot = formData.v3_multi_prompt[shotIdx]
  if (!shot?.element) return
  if (!files?.length) { shot.element.element_input_urls = []; return }
  isUploadingKlingElement.value = true
  try {
    const fileList = Array.isArray(files) ? files : [files]
    if (fileList.length < 2 || fileList.length > 50) {
      showError('Element requires 2-50 images')
      return
    }
    const urls = []
    for (const f of fileList) {
      const url = await uploadOneFile(f)
      if (url) urls.push(url)
    }
    shot.element.element_input_urls = urls
  } catch (e) {
    showError(e?.message || 'Upload failed')
    shot.element.element_input_urls = []
    const ref = klingShotElementUploadRefs.value[shotIdx]
    if (ref?.clearFiles) ref.clearFiles()
  } finally { isUploadingKlingElement.value = false }
}

const canGenerate = computed(() => {
  const m = mode.value
  const p = (formData.prompt || '').trim()
  if (m === 'v2-5-turbo-image-to-video-pro') return p.length <= 2500 && !!formData.image_url
  if (m === 'v2-5-turbo-text-to-video-pro') return p.length <= 2500
  if (m === 'v2-6-text-to-video') return p.length <= 2500
  if (m === 'v2-6-image-to-video') return p.length <= 2500 && formData.image_urls.length > 0
  if (m === 'v2-6-motion-control') return formData.input_urls.length > 0 && formData.video_urls.length > 0
  if (m === 'v3-0-motion-control') return p.length <= 2500 && formData.input_urls.length > 0 && formData.video_urls.length > 0
  if (m === 'ai-avatar-standard' || m === 'ai-avatar-pro') return !!formData.image_url && !!formData.audio_url && p.length <= 5000
  if (m === 'v3-0-video') {
    const shots = formData.v3_multi_prompt || []
    const isV3ElementValid = (el) => {
      if (!el) return false
      const name = (el.name || '').trim()
      const desc = (el.description || '').trim()
      const urls = el.element_input_urls || []
      if (!name || !desc) return false
      return urls.length === 0 || (urls.length >= 2 && urls.length <= 50)
    }
    if (formData.v3_multi_shots) {
      const total = shots.reduce((s, x) => s + (Number(x.duration) || 0), 0)
      const totalChars = shots.reduce((s, x) => s + (x.prompt || '').trim().length, 0)
      const shotsValid = shots.every(sh => {
        const pOk = (sh.prompt || '').trim().length <= 500 && (Number(sh.duration) || 0) >= 1 && (Number(sh.duration) || 0) <= 12
        if (!sh.element) return pOk
        return pOk && isV3ElementValid(sh.element)
      })
      return shots.length >= 1 && shotsValid && total >= 3 && total <= 15 && totalChars <= 2500
    }
    const sh = shots[0]
    if (!sh) return false
    const p = (sh.prompt || '').trim()
    const d = Number(sh.duration) || 0
    const base = p.length >= 1 && p.length <= 2500 && d >= 3 && d <= 15
    if (!sh.element) return base
    const urls = sh.element.element_input_urls || []
    return base && (sh.element.name || '').trim() && (sh.element.description || '').trim() && (urls.length === 0 || (urls.length >= 2 && urls.length <= 50))
  }
  return false
})

const displayResult = computed(() => {
  if (isDetailView.value && detailData.value && Number(detailData.value.status) === 2) {
    const url = detailData.value?.outputUrl || detailData.value?.videoUrl || (detailData.value?.outputUrls && detailData.value.outputUrls[0])
    return url ? { videoUrl: url } : result.value
  }
  return result.value
})
const displayVideoUrl = computed(() => {
  const r = displayResult.value
  return (r && r.videoUrl) || ''
})

const apiPathByMode = {
  'v2-5-turbo-image-to-video-pro': '/api/video/kling/turbo-image-to-video-pro',
  'v2-5-turbo-text-to-video-pro': '/api/video/kling/turbo-text-to-video-pro',
  'v2-6-text-to-video': '/api/video/kling/2-6-text-to-video',
  'v2-6-image-to-video': '/api/video/kling/2-6-image-to-video',
  'v2-6-motion-control': '/api/video/kling/2-6-motion-control',
  'v3-0-motion-control': '/api/video/kling/3-0-motion-control',
  'ai-avatar-standard': '/api/video/kling/ai-avatar-standard',
  'ai-avatar-pro': '/api/video/kling/ai-avatar-pro',
  'v3-0-video': '/api/video/kling/3-0-video'
}

async function loadDetailByRecordId(recordId) {
  if (!recordId || routeRecordId.value !== recordId) return
  detailData.value = null
  try {
    let data = await fetchRecordDetailOnce(recordId)
    if (routeRecordId.value !== recordId) return
    detailData.value = data || null
    if (data != null && Number(data.status) === 1) {
      const res = await pollRecordByStatus(recordId, { getIsCancelled: () => routeRecordId.value !== recordId })
      if (routeRecordId.value === recordId) detailData.value = res
    }
  } catch (e) { console.error('Kling load record detail failed:', e) }
}
watch(() => route.query['record-id'], (recordId) => {
  if (recordId) loadDetailByRecordId(recordId)
  else detailData.value = null
}, { immediate: true })

async function generate() {
  if (!canGenerate.value) return
  const m = mode.value
  if (showPrompt.value && !['v2-6-motion-control', 'v3-0-motion-control'].includes(m) && !(formData.prompt || '').trim()) {
    showError('Prompt is required')
    return
  }
  isGenerating.value = true
  const apiPath = apiPathByMode[m]
  let body = {}
  try {
    if (m === 'v2-5-turbo-image-to-video-pro') {
      body = {
        model: 'kling-v2-5-turbo-image-to-video-pro',
        prompt: (formData.prompt || '').trim(),
        imageUrl: formData.image_url,
        duration: formData.duration
      }
      if (formData.tail_image_url) body.tailImageUrl = formData.tail_image_url
      if (formData.negative_prompt) body.negativePrompt = formData.negative_prompt
      if (formData.cfg_scale != null) body.cfgScale = formData.cfg_scale
    } else if (m === 'v2-5-turbo-text-to-video-pro') {
      body = {
        model: 'kling-v2-5-turbo-text-to-video-pro',
        prompt: (formData.prompt || '').trim(),
        duration: formData.duration,
        aspectRatio: formData.aspect_ratio
      }
      if (formData.negative_prompt) body.negativePrompt = formData.negative_prompt
      if (formData.cfg_scale != null) body.cfgScale = formData.cfg_scale
    } else if (m === 'v2-6-text-to-video') {
      body = {
        model: 'kling-2.6-text-to-video',
        prompt: (formData.prompt || '').trim(),
        sound: !!formData.sound,
        aspectRatio: formData.aspect_ratio,
        duration: formData.duration
      }
    } else if (m === 'v2-6-image-to-video') {
      body = {
        model: 'kling-2.6-image-to-video',
        prompt: (formData.prompt || '').trim(),
        imageUrls: formData.image_urls,
        sound: !!formData.sound,
        duration: formData.duration
      }
    } else if (m === 'v2-6-motion-control') {
      body = {
        model: 'kling-2.6-motion-control',
        prompt: (formData.prompt || '').trim() || undefined,
        inputUrls: formData.input_urls,
        videoUrls: formData.video_urls,
        characterOrientation: formData.character_orientation,
        mode: formData.mode,
        duration: formData.duration ? String(formData.duration) : undefined
      }
    } else if (m === 'v3-0-motion-control') {
      body = {
        model: 'kling-3.0-motion-control',
        prompt: (formData.prompt || '').trim() || undefined,
        inputUrls: formData.input_urls,
        videoUrls: formData.video_urls,
        mode: (formData.mode === 'pro' || formData.mode === 'std') ? formData.mode : 'std',
        characterOrientation: formData.character_orientation || 'video',
        backgroundSource: formData.background_source || 'input_video'
      }
    } else if (m === 'ai-avatar-standard' || m === 'ai-avatar-pro') {
      body = {
        model: m === 'ai-avatar-standard' ? 'kling-ai-avatar-standard' : 'kling-ai-avatar-pro',
        imageUrl: formData.image_url,
        audioUrl: formData.audio_url,
        prompt: (formData.prompt || '').trim()
      }
    } else if (m === 'v3-0-video') {
      const multiShots = !!formData.v3_multi_shots
      body = {
        model: 'kling-3.0-video',
        mode: formData.kling_mode,
        multiShots,
        sound: multiShots ? true : !!formData.sound
      }
      if (multiShots) {
        const isV3ElementValid = (el) => {
          if (!el) return false
          const name = (el.name || '').trim()
          const desc = (el.description || '').trim()
          const urls = el.element_input_urls || []
          return !!name && !!desc && (urls.length === 0 || (urls.length >= 2 && urls.length <= 50))
        }
        const shotElements = (formData.v3_multi_prompt || []).map(s => s.element).filter(isV3ElementValid)
        body.multiPrompt = formData.v3_multi_prompt.map(sh => ({
          prompt: (sh.prompt || '').trim(),
          duration: Number(sh.duration) || 3,
          elementName: isV3ElementValid(sh.element) ? (sh.element.name || '').trim() : null
        })).filter(sh => sh.prompt.length > 0)
        const totalDur = body.multiPrompt.reduce((s, sh) => s + sh.duration, 0)
        body.duration = String(totalDur)
        if (formData.kling_image_urls?.length > 0) body.imageUrls = [formData.kling_image_urls[0]]
        body.klingElements = shotElements.length > 0 ? shotElements.map(el => {
          const urls = el.element_input_urls || []
          return {
            name: (el.name || '').trim(),
            description: (el.description || '').trim(),
            elementInputUrls: urls.length >= 2 && urls.length <= 50 ? urls : []
          }
        }) : []
      } else {
        const sh = formData.v3_multi_prompt[0]
        body.prompt = (sh?.prompt || '').trim()
        body.duration = String(sh?.duration ?? 5)
        const startUrl = formData.kling_image_urls?.[0]
        const endUrl = formData.kling_end_frame_url
        if (startUrl) body.imageUrls = endUrl ? [startUrl, endUrl] : [startUrl]
        if (!startUrl && formData.v3_aspect_ratio) body.aspectRatio = formData.v3_aspect_ratio
        const el = sh?.element
        const singleElValid = el && (el.name || '').trim() && (el.description || '').trim() && ((el.element_input_urls || []).length === 0 || ((el.element_input_urls || []).length >= 2 && (el.element_input_urls || []).length <= 50))
        if (singleElValid) {
          const urls = el.element_input_urls || []
          body.klingElements = [{
            name: (el.name || '').trim(),
            description: (el.description || '').trim(),
            elementInputUrls: urls.length >= 2 && urls.length <= 50 ? urls : []
          }]
        }
      }
    }
    const data = await post(apiPath, body)
    const rid = data?.recordId ?? data?.data?.recordId
    if (rid) {
      router.push((modeTabToPath[m] || '/home/kling/v2-5-turbo-image-to-video-pro') + '?record-id=' + encodeURIComponent(rid))
      return
    }
    const url = data?.videoUrl ?? data?.outputUrl ?? (Array.isArray(data?.outputUrls) && data.outputUrls?.length ? data.outputUrls[0] : null)
    result.value = url ? { videoUrl: url } : data
  } catch (err) {
    if (!err?.__fromApi) showError(err?.message || 'Generation failed')
  } finally {
    isGenerating.value = false
  }
}

function downloadVideo() {
  if (displayResult.value?.videoUrl) {
    const a = document.createElement('a')
    a.href = displayResult.value.videoUrl
    a.download = `kling-video-${Date.now()}.mp4`
    a.click()
  }
}

watch(() => route.path, (path) => {
  const next = pathToMode[path]
  if (next && mode.value !== next) {
    mode.value = next
    if (next === 'v3-0-motion-control' && (formData.mode !== 'std' && formData.mode !== 'pro')) formData.mode = 'std'
    if (next === 'v2-6-motion-control' && (formData.mode !== '720p' && formData.mode !== '1080p')) formData.mode = '720p'
  }
}, { immediate: true })
watch(mode, (m) => {
  const path = modeTabToPath[m]
  if (path && route.path !== path) router.replace(path)
})
</script>

<style scoped>
.kling-tool {
  --shot-text-min-h: 80px;
  --shot-text-w: 100%;
  --duration-h: 24px;
  width: 100%; height: 100%; padding: 20px; background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); display: flex; flex-direction: column;
}
.tool-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; }
.tool-avatar { width: 48px; height: 48px; border-radius: 12px; overflow: hidden; flex-shrink: 0; }
.tool-avatar img { width: 100%; height: 100%; object-fit: cover; }
.tool-details h3 { margin: 0 0 4px 0; font-size: 20px; font-weight: 600; color: #1f2937; }
.tool-details p { margin: 0; font-size: 13px; color: #6b7280; line-height: 1.5; }
.mode-tabs-wrap { padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
.mode-tabs { display: flex; flex-wrap: wrap; gap: 8px; }
.mode-tab { padding: 9px 14px; border: 1px solid #e2e8f0; background: #fff; color: #64748b; border-radius: 8px; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 6px; transition: all 0.3s ease; }
.mode-tab:hover { border-color: #3b82f6; color: #3b82f6; }
.mode-tab.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }
.main-content { display: flex; flex: 1; min-height: 0; gap: 20px; }
.config-panel { width: 35%; background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; min-height: 0; }
.config-header { margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0; }
.config-header h4 { margin: 0; font-size: 18px; font-weight: 600; color: #1f2937; }
.config-fieldset { border: none; margin: 0; padding: 0; }
.config-form { display: flex; flex-direction: column; gap: 16px; flex: 1; overflow-y: auto; }
.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 24px; }
.form-label { font-size: 14px; font-weight: 500; color: #374151; }
.required { color: #ef4444; }
.form-input { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; box-sizing: border-box; }
.form-input:focus { outline: none; border-color: #3b82f6; }
.form-hint { font-size: 12px; color: #6b7280; }
.char-count { font-size: 12px; color: #6b7280; text-align: right; }
.tab-group { display: flex; gap: 8px; flex-wrap: wrap; }
.tab-option { flex: 1; min-width: 60px; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; background: #f8fafc; color: #374151; cursor: pointer; font-size: 13px; font-weight: 500; display: flex; align-items: center; justify-content: center; }
.tab-option:hover { background: rgba(59, 130, 246, 0.05); border-color: #3b82f6; color: #3b82f6; }
.tab-option.active { border-color: #3b82f6; background: #3b82f6; color: #fff; }
.file-input-hidden { position: absolute; opacity: 0; width: 0; height: 0; }
.upload-area { padding: 12px; border: 1px dashed #d1d5db; border-radius: 8px; background: #f9fafb; cursor: pointer; font-size: 14px; color: #6b7280; }
.upload-area:hover { border-color: #3b82f6; color: #3b82f6; }
.form-actions { margin-top: 24px; padding-bottom: 20px; }
.btn-primary { width: 100%; padding: 16px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: #fff; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59,130,246,0.3); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.price-tag { font-size: 15px; opacity: 0.8; margin-left: 4px; }
.motion-price-hint { font-size: 12px; color: #6b7280; margin-bottom: 8px; }
.kling-video-upload { margin-top: 4px; }
.kling-video-trigger { position: relative; border: 1px dashed #d1d5db; border-radius: 8px; padding: 12px; background: #f9fafb; cursor: pointer; }
.kling-video-file-input { position: absolute; opacity: 0; inset: 0; cursor: pointer; }
.kling-video-trigger-inner { display: flex; flex-direction: column; align-items: center; gap: 8px; color: #6b7280; }
.kling-video-trigger-inner i { font-size: 20px; color: #3b82f6; }
.kling-video-trigger-inner span { font-size: 14px; font-weight: 500; }
.kling-video-trigger-inner small { font-size: 12px; color: #9ca3af; }
.kling-video-uploading { margin-top: 8px; font-size: 14px; color: #4b5563; display: flex; align-items: center; gap: 6px; }
.kling-video-display { margin-top: 12px; }
.kling-video-preview-wrap { border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; background: #000; }
.kling-video-preview { width: 100%; height: auto; display: block; }
.result-panel { width: 65%; background: #fff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; min-height: 400px; display: flex; flex-direction: column; }
.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; text-align: center; color: #6b7280; gap: 16px; }
.empty-state h4 { margin: 0; font-size: 18px; color: #374151; }
.video-result { display: flex; flex-direction: column; gap: 16px; }
.video-player { background: #000; border-radius: 8px; overflow: hidden; }
.video-element { width: 100%; height: auto; display: block; }
.video-actions { display: flex; gap: 8px; }
.action-btn { background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 4px; }
.action-btn:hover { background: #e5e7eb; }
.v3-shot-element { margin-top: 12px; padding-top: 12px; border-top: 1px dashed #e5e7eb; display: flex; flex-direction: column; gap: 8px; }
.shot-element-label { font-size: 13px; font-weight: 600; color: #1f2937; margin-bottom: 4px; }
.shot-text-desc { min-height: 56px; resize: vertical; }
.add-element-btn { align-self: flex-start; }
/* shots list (Sora pro-storyboard style) */
.shots-list { display: flex; flex-direction: column; gap: 16px; }
.shot-card { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; }
.shot-title { font-size: 13px; font-weight: 600; color: #1f2937; margin-bottom: 8px; }
.shot-text { width: var(--shot-text-w); padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; resize: vertical; min-height: var(--shot-text-min-h); box-sizing: border-box; }
.shot-text:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
.shot-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
.duration-input { display: inline-flex; align-items: center; gap: 6px; }
.duration-field { min-width: 60px; height: var(--duration-h); padding: 4px 8px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 12px; box-sizing: border-box; }
.duration-field.duration-select { cursor: pointer; }
.duration-s { display: inline-block; padding: 3px 4px; background: #eef2ff; color: #475569; border-radius: 6px; font-size: 9px; }
.shot-delete { border: 1px solid #ef4444; background: #fff1f2; color: #ef4444; border-radius: 6px; font-size: 12px; padding: 6px 10px; cursor: pointer; }
.shot-delete:hover { background: #ffe4e6; }
.add-shot { margin-top: 8px; border: 1px dashed #3b82f6; background: #f0f7ff; color: #1d4ed8; border-radius: 8px; padding: 8px 12px; font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; }
.add-shot:hover { background: #e0efff; }
.btn-secondary { padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 6px; background: #fff; color: #64748b; font-size: 13px; cursor: pointer; }
.btn-secondary:hover { border-color: #3b82f6; color: #3b82f6; }
.detail-failure-state, .detail-loading-state { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 40px; text-align: center; }
.detail-spinner { font-size: 48px; color: #3b82f6; }
.detail-failure-state .failure-icon { font-size: 56px; color: #ef4444; }
@media (max-width: 1024px) { .main-content { flex-direction: column; } .config-panel, .result-panel { width: 100%; } }
</style>
