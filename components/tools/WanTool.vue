<template>
  <div class="wan-tool">
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Wan.png" alt="Wan" />
      </div>
      <div class="tool-details">
        <h3>Wan</h3>
        <p class="tool-description">{{ toolDescription }}</p>
      </div>
    </div>

    <div class="mode-tabs-wrap">
      <div class="mode-tabs">
        <div
          v-for="tab in visibleModeTabs"
          :key="tab.key"
          class="mode-tab"
          :class="{ active: mode === tab.key }"
          @click="goToTab(tab.key)"
        >
          <i :class="tab.icon"></i>
          <span>{{ tab.label }}</span>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="config-panel">
        <div class="config-header">
          <h4>Configuration</h4>
        </div>
        <form class="config-form" @submit.prevent="generate">
          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">
            <div class="form-group">
              <label for="wan-prompt" class="form-label">
                Prompt <span class="required">*</span>
              </label>
              <textarea
                id="wan-prompt"
                v-model="formData.prompt"
                class="form-input"
                rows="4"
                :placeholder="promptPlaceholder"
                :maxlength="promptMaxLength"
                :minlength="isWan27StrictPromptModes ? 3 : undefined"
                required
              ></textarea>
              <div class="char-count" v-if="formData.prompt">{{ formData.prompt.length }}/{{ promptMaxLength }}</div>
              <div class="form-hint">{{ promptHint }}</div>
            </div>

            <div v-if="isWan27VideoMode" class="form-group">
              <label class="form-label">Negative Prompt (optional)</label>
              <textarea v-model="formData.negativePrompt" class="form-input" rows="2" maxlength="500" placeholder="Up to 500 characters"></textarea>
            </div>

            <div v-if="mode === 'v2-7-text-to-video'" class="form-group">
              <label class="form-label">Audio (optional)</label>
              <input ref="wan27TextAudioInputRef" type="file" accept="audio/wav,audio/mpeg,audio/mp3" class="wan-video-input" @change="handleWan27TextAudioFile" />
              <div
                class="wan-video-upload wan-video-upload--stack"
                @click="!isUploadingWan27TextAudio && !formData.audioUrl && triggerWan27TextAudioInput()"
              >
                <div v-if="isUploadingWan27TextAudio" class="wan-video-uploading"><i class="fas fa-spinner fa-spin"></i> Uploading...</div>
                <template v-else-if="formData.audioUrl">
                  <div class="wan-video-preview-wrap wan-audio-preview-wrap" @click.stop>
                    <audio :src="formData.audioUrl" class="wan-audio-preview" controls playsinline></audio>
                    <button type="button" class="wan-video-remove" title="Remove" @click.stop="clearWan27TextAudio">×</button>
                  </div>
                  <button type="button" class="action-btn wan-upload-replace-btn" @click.stop="triggerWan27TextAudioInput">Replace audio</button>
                </template>
                <div v-else class="wan-video-placeholder"><i class="fas fa-cloud-upload-alt"></i><span>Click to upload audio (WAV, MP3)</span></div>
              </div>
            </div>

            <!-- Image input -->
            <div v-if="mode === 'image-to-video' || isWanImageMode" class="form-group">
              <label class="form-label">
                Image URLs <span v-if="mode === 'image-to-video'" class="required">*</span>
              </label>
              <UploadImage
                ref="imageUploadRef"
                input-id="wan-image-upload"
                label=""
                upload-text="Click to upload image(s)"
                upload-hint="JPEG, PNG, WebP; min 256×256px; max 10MB per image"
                :max-files="maxImageFiles"
                :max-file-size="10 * 1024 * 1024"
                accept="image/jpeg,image/png,image/webp"
                :multiple="true"
                @update:files="handleImageFiles"
              />
              <span v-if="isUploadingImages" class="form-hint">Uploading...</span>
              <div v-if="isDetailView && (mode === 'image-to-video' || isWanImageMode) && formData.imageUrls?.length" class="detail-ref-urls">
                <span class="form-label">Input images (this task)</span>
                <div class="detail-ref-urls-links">
                  <a
                    v-for="(u, idx) in formData.imageUrls"
                    :key="idx"
                    :href="u"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="detail-ref-link"
                  >Image {{ idx + 1 }}</a>
                </div>
              </div>
            </div>

            <div v-if="isWanImageMode && hasImageInput" class="form-group bbox-list-group">
              <div class="bbox-list-head">
                <label class="form-label">bbox_list</label>
                <span class="bbox-list-meta">{{ activeImageBboxCount }} box{{ activeImageBboxCount === 1 ? '' : 'es' }} selected</span>
              </div>
              <p class="form-hint bbox-list-intro">
                Draw edit regions on each image. Coordinates are saved as [x1, y1, x2, y2] in original image pixels. Each image supports up to 2 boxes.
              </p>
              <div class="bbox-thumb-row">
                <button
                  v-for="(url, idx) in formData.imageUrls"
                  :key="'bbox-thumb-' + idx"
                  type="button"
                  class="bbox-thumb"
                  :class="{ active: bboxActiveImageIdx === idx }"
                  @click="bboxActiveImageIdx = idx"
                >
                  <img :src="url" alt="" @load="onBboxThumbLoad($event, idx)" />
                  <span class="bbox-thumb-res" v-if="bboxThumbSizeByIdx[idx]">{{ bboxThumbSizeByIdx[idx].w }} × {{ bboxThumbSizeByIdx[idx].h }}</span>
                  <span class="bbox-thumb-count">{{ (formData.bboxPerImage[idx] || []).length }}/2 boxes</span>
                </button>
              </div>
              <div class="bbox-boxes-panel">
                <div class="bbox-boxes-head">
                  <span class="bbox-boxes-title">Boxes</span>
                  <button
                    type="button"
                    class="bbox-add-link"
                    :disabled="(formData.bboxPerImage[bboxActiveImageIdx] || []).length >= 2"
                    @click="openBboxModal(bboxActiveImageIdx, null)"
                  >
                    Add box
                  </button>
                </div>
                <p v-if="!(formData.bboxPerImage[bboxActiveImageIdx] || []).length" class="bbox-empty">No boxes selected for this image.</p>
                <div v-else class="bbox-card-list">
                  <div
                    v-for="(box, bidx) in formData.bboxPerImage[bboxActiveImageIdx]"
                    :key="'bbox-card-' + bidx"
                    class="bbox-card"
                  >
                    <div class="bbox-card-head">
                      <span>Box {{ bidx + 1 }}</span>
                      <div class="bbox-card-actions">
                        <button type="button" class="action-btn" @click="openBboxModal(bboxActiveImageIdx, bidx)">Edit</button>
                        <button type="button" class="action-btn bbox-remove-btn" @click="removeBboxBox(bboxActiveImageIdx, bidx)">Remove</button>
                      </div>
                    </div>
                    <div class="bbox-coord-grid">
                      <label class="bbox-coord"><span>X1</span><input v-model.number="box[0]" type="number" class="form-input" /></label>
                      <label class="bbox-coord"><span>Y1</span><input v-model.number="box[1]" type="number" class="form-input" /></label>
                      <label class="bbox-coord"><span>X2</span><input v-model.number="box[2]" type="number" class="form-input" /></label>
                      <label class="bbox-coord"><span>Y2</span><input v-model.number="box[3]" type="number" class="form-input" /></label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bbox-footer-actions">
                <button type="button" class="action-btn" @click="clearBboxesForActiveImage">Clear current image</button>
                <button type="button" class="action-btn bbox-clear-all-btn" @click="clearAllBboxes">Clear all</button>
              </div>
            </div>

            <!-- Video to Video: video URL -->
            <div v-if="mode === 'video-to-video'" class="form-group">
              <label class="form-label">
                Video <span class="required">*</span>
              </label>
              <input
                ref="videoInputRef"
                type="file"
                accept="video/mp4,video/quicktime,video/x-matroska"
                class="wan-video-input"
                @change="handleVideoFile"
              />
              <div class="wan-video-upload" @click="triggerVideoInput">
                <div v-if="isUploadingVideo" class="wan-video-uploading">
                  <i class="fas fa-spinner fa-spin"></i> Uploading...
                </div>
                <template v-else-if="formData.videoUrls.length">
                  <div class="wan-video-preview-wrap">
                    <video :src="formData.videoUrls[0]" class="wan-video-preview" controls></video>
                    <button type="button" class="wan-video-remove" title="Remove" @click.stop="clearVideo">×</button>
                  </div>
                </template>
                <div v-else class="wan-video-placeholder">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <span>Click to upload video (MP4, MOV, MKV; max 10MB)</span>
                </div>
              </div>
            </div>

            <div v-if="mode === 'v2-7-image-to-video'" class="form-group">
              <label class="form-label">First Frame URL (optional)</label>
              <UploadImage
                ref="wan27FirstFrameUploadRef"
                input-id="wan27-first-frame-upload"
                label=""
                upload-text="Click to upload first frame"
                upload-hint="JPEG, PNG, WebP; max 20MB"
                :max-files="1"
                :max-file-size="20 * 1024 * 1024"
                accept="image/jpeg,image/png,image/webp"
                :multiple="false"
                @update:files="handleWan27FirstFrameFile"
              />
            </div>

            <div v-if="mode === 'v2-7-image-to-video'" class="form-group">
              <label class="form-label">Last Frame URL (optional)</label>
              <UploadImage
                ref="wan27LastFrameUploadRef"
                input-id="wan27-last-frame-upload"
                label=""
                upload-text="Click to upload last frame"
                upload-hint="JPEG, PNG, WebP; max 20MB"
                :max-files="1"
                :max-file-size="20 * 1024 * 1024"
                accept="image/jpeg,image/png,image/webp"
                :multiple="false"
                @update:files="handleWan27LastFrameFile"
              />
            </div>

            <div v-if="mode === 'v2-7-image-to-video'" class="form-group">
              <label class="form-label">First Clip (optional)</label>
              <input ref="wan27FirstClipInputRef" type="file" accept="video/mp4,video/quicktime" class="wan-video-input" @change="handleWan27FirstClipFile" />
              <div
                class="wan-video-upload wan-video-upload--stack"
                @click="!isUploadingWan27FirstClip && !formData.firstClipUrl && triggerWan27FirstClipInput()"
              >
                <div v-if="isUploadingWan27FirstClip" class="wan-video-uploading"><i class="fas fa-spinner fa-spin"></i> Uploading...</div>
                <template v-else-if="formData.firstClipUrl">
                  <div class="wan-video-preview-wrap" @click.stop>
                    <video :src="formData.firstClipUrl" class="wan-video-preview" controls playsinline></video>
                    <button type="button" class="wan-video-remove" title="Remove" @click.stop="clearWan27FirstClip">×</button>
                  </div>
                  <button type="button" class="action-btn wan-upload-replace-btn" @click.stop="triggerWan27FirstClipInput">Replace clip</button>
                </template>
                <div v-else class="wan-video-placeholder"><i class="fas fa-cloud-upload-alt"></i><span>Click to upload first clip (MP4, MOV)</span></div>
              </div>
              <div class="form-hint">At least one of first frame, last frame, first clip, or driving audio is required.</div>
            </div>

            <div v-if="mode === 'v2-7-image-to-video'" class="form-group">
              <label class="form-label">Driving Audio (optional)</label>
              <input ref="wan27DrivingAudioInputRef" type="file" accept="audio/wav,audio/mpeg,audio/mp3" class="wan-video-input" @change="handleWan27DrivingAudioFile" />
              <div
                class="wan-video-upload wan-video-upload--stack"
                @click="!isUploadingWan27DrivingAudio && !formData.drivingAudioUrl && triggerWan27DrivingAudioInput()"
              >
                <div v-if="isUploadingWan27DrivingAudio" class="wan-video-uploading"><i class="fas fa-spinner fa-spin"></i> Uploading...</div>
                <template v-else-if="formData.drivingAudioUrl">
                  <div class="wan-video-preview-wrap wan-audio-preview-wrap" @click.stop>
                    <audio :src="formData.drivingAudioUrl" class="wan-audio-preview" controls playsinline></audio>
                    <button type="button" class="wan-video-remove" title="Remove" @click.stop="clearWan27DrivingAudio">×</button>
                  </div>
                  <button type="button" class="action-btn wan-upload-replace-btn" @click.stop="triggerWan27DrivingAudioInput">Replace audio</button>
                </template>
                <div v-else class="wan-video-placeholder"><i class="fas fa-cloud-upload-alt"></i><span>Click to upload driving audio (WAV, MP3)</span></div>
              </div>
            </div>

            <div v-if="mode === 'v2-7-video-edit'" class="form-group">
              <label class="form-label">Input Video <span class="required">*</span></label>
              <input
                ref="wan27EditVideoInputRef"
                type="file"
                accept="video/mp4,video/quicktime"
                class="wan-video-input"
                @change="handleWan27EditVideoFile"
              />
              <div class="wan-video-upload" @click="triggerWan27EditVideoInput">
                <div v-if="isUploadingWan27EditVideo" class="wan-video-uploading"><i class="fas fa-spinner fa-spin"></i> Uploading...</div>
                <template v-else-if="formData.videoUrl">
                  <div class="wan-video-preview-wrap">
                    <video :src="formData.videoUrl" class="wan-video-preview" controls playsinline></video>
                    <button type="button" class="wan-video-remove" title="Remove" @click.stop="clearWan27EditVideo">×</button>
                  </div>
                </template>
                <div v-else class="wan-video-placeholder"><i class="fas fa-cloud-upload-alt"></i><span>Click to upload video (MP4, MOV)</span></div>
              </div>
            </div>

            <div v-if="mode === 'v2-7-video-edit'" class="form-group">
              <label class="form-label">Reference Image (optional)</label>
              <UploadImage
                ref="wan27EditRefImageUploadRef"
                input-id="wan27-edit-ref-image-upload"
                label=""
                upload-text="Click to upload reference image"
                upload-hint="JPEG, PNG, BMP, WEBP; max 20MB"
                :max-files="1"
                :max-file-size="20 * 1024 * 1024"
                accept="image/jpeg,image/jpg,image/png,image/bmp,image/webp"
                :multiple="false"
                @update:files="handleWan27EditReferenceImageFile"
              />
            </div>

            <div v-if="mode === 'v2-7-r2v'" class="form-group">
              <label class="form-label">Reference Images (optional, max 5)</label>
              <UploadImage
                ref="wan27R2vRefImageUploadRef"
                input-id="wan27-r2v-ref-image-upload"
                label=""
                upload-text="Click to upload reference images"
                upload-hint="JPEG, PNG, BMP, WEBP; max 20MB each"
                :max-files="5"
                :max-file-size="20 * 1024 * 1024"
                accept="image/jpeg,image/jpg,image/png,image/bmp,image/webp"
                :multiple="true"
                @update:files="handleWan27R2vReferenceImages"
              />
            </div>

            <div v-if="mode === 'v2-7-r2v'" class="form-group">
              <label class="form-label">Reference Videos (optional, max 5)</label>
              <input ref="wan27R2vRefVideoInputRef" type="file" accept="video/mp4,video/quicktime" class="wan-video-input" multiple @change="handleWan27R2vReferenceVideos" />
              <div
                class="wan-video-upload wan-video-upload--stack"
                @click="!isUploadingWan27R2vRefVideos && !(formData.referenceVideos?.length) && triggerWan27R2vRefVideoInput()"
              >
                <div v-if="isUploadingWan27R2vRefVideos" class="wan-video-uploading"><i class="fas fa-spinner fa-spin"></i> Uploading...</div>
                <template v-else-if="formData.referenceVideos?.length">
                  <div class="wan-ref-videos-block" @click.stop>
                    <div class="wan-ref-videos-list">
                      <div v-for="(url, idx) in formData.referenceVideos" :key="url + idx" class="wan-video-preview-wrap wan-ref-video-tile">
                        <video :src="url" class="wan-video-preview" controls playsinline></video>
                        <button type="button" class="wan-video-remove" title="Remove" @click.stop="removeWan27R2vReferenceVideoAt(idx)">×</button>
                      </div>
                    </div>
                    <div class="wan-ref-videos-actions">
                      <button type="button" class="action-btn" @click.stop="triggerWan27R2vRefVideoInput">Replace all</button>
                      <span class="form-hint wan-ref-videos-hint">Up to 5 clips; replacing runs a new upload for the selection.</span>
                    </div>
                  </div>
                </template>
                <div v-else class="wan-video-placeholder"><i class="fas fa-cloud-upload-alt"></i><span>Click to upload reference videos</span></div>
              </div>
            </div>

            <div v-if="mode === 'v2-7-r2v'" class="form-group">
              <label class="form-label">First Frame (optional)</label>
              <UploadImage
                ref="wan27R2vFirstFrameUploadRef"
                input-id="wan27-r2v-first-frame-upload"
                label=""
                upload-text="Click to upload first frame"
                upload-hint="JPEG, PNG, WEBP; max 20MB"
                :max-files="1"
                :max-file-size="20 * 1024 * 1024"
                accept="image/jpeg,image/png,image/webp"
                :multiple="false"
                @update:files="handleWan27R2vFirstFrame"
              />
            </div>

            <div v-if="mode === 'v2-7-r2v'" class="form-group">
              <label class="form-label">Reference Voice (optional)</label>
              <input ref="wan27R2vVoiceInputRef" type="file" accept="audio/wav,audio/mpeg,audio/mp3" class="wan-video-input" @change="handleWan27R2vReferenceVoice" />
              <div
                class="wan-video-upload wan-video-upload--stack"
                @click="!isUploadingWan27R2vVoice && !formData.referenceVoice && triggerWan27R2vVoiceInput()"
              >
                <div v-if="isUploadingWan27R2vVoice" class="wan-video-uploading"><i class="fas fa-spinner fa-spin"></i> Uploading...</div>
                <template v-else-if="formData.referenceVoice">
                  <div class="wan-video-preview-wrap wan-audio-preview-wrap" @click.stop>
                    <audio :src="formData.referenceVoice" class="wan-audio-preview" controls playsinline></audio>
                    <button type="button" class="wan-video-remove" title="Remove" @click.stop="clearWan27R2vReferenceVoice">×</button>
                  </div>
                  <button type="button" class="action-btn wan-upload-replace-btn" @click.stop="triggerWan27R2vVoiceInput">Replace voice</button>
                </template>
                <div v-else class="wan-video-placeholder"><i class="fas fa-cloud-upload-alt"></i><span>Click to upload reference voice</span></div>
              </div>
            </div>

            <div v-if="isWanImageMode && !hasImageInput" class="form-group">
              <label class="form-label">Aspect Ratio</label>
              <div class="tab-group">
                <button v-for="ratio in wanImageAspectRatios" :key="ratio" type="button" class="tab-option" :class="{ active: formData.aspectRatio === ratio }" @click="formData.aspectRatio = ratio">{{ ratio }}</button>
              </div>
            </div>

            <div v-if="isWanImageMode" class="form-group">
              <label class="checkbox-label">
                <input v-model="formData.enableSequential" type="checkbox" />
                <span>Enable sequential (group images)</span>
              </label>
              <div class="form-hint">When enabled, supports larger batch size and disables thinking mode.</div>
            </div>

            <div v-if="isWanImageMode" class="form-group">
              <label class="form-label">Image Count (n)</label>
              <input v-model.number="formData.n" type="number" class="form-input" :min="nMin" :max="nMax" />
              <div class="form-hint">Range: {{ nMin }} - {{ nMax }}.</div>
            </div>

            <div v-if="!isWanImageMode && !isWan27VideoMode" class="form-group">
              <label class="form-label">Duration</label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: formData.duration === '5' }" @click="formData.duration = '5'">5s</button>
                <button type="button" class="tab-option" :class="{ active: formData.duration === '10' }" @click="formData.duration = '10'">10s</button>
                <button v-if="mode !== 'video-to-video'" type="button" class="tab-option" :class="{ active: formData.duration === '15' }" @click="formData.duration = '15'">15s</button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Resolution</label>
              <div class="tab-group">
                <template v-if="isWanImageMode">
                  <button type="button" class="tab-option" :class="{ active: formData.resolution === '1K' }" @click="formData.resolution = '1K'">1K</button>
                  <button type="button" class="tab-option" :class="{ active: formData.resolution === '2K' }" @click="formData.resolution = '2K'">2K</button>
                  <button v-if="isWanImageProMode && canUse4k" type="button" class="tab-option" :class="{ active: formData.resolution === '4K' }" @click="formData.resolution = '4K'">4K</button>
                </template>
                <template v-else>
                  <button type="button" class="tab-option" :class="{ active: formData.resolution === '720p' }" @click="formData.resolution = '720p'">720p</button>
                  <button type="button" class="tab-option" :class="{ active: formData.resolution === '1080p' }" @click="formData.resolution = '1080p'">1080p</button>
                </template>
              </div>
            </div>

            <div v-if="isWan27TextToVideoMode || mode === 'v2-7-video-edit' || mode === 'v2-7-r2v'" class="form-group">
              <label class="form-label">Aspect Ratio</label>
              <div class="tab-group">
                <button v-for="ratio in ['16:9','9:16','1:1','4:3','3:4']" :key="'wan27-'+ratio" type="button" class="tab-option" :class="{ active: formData.aspectRatio === ratio }" @click="formData.aspectRatio = ratio">{{ ratio }}</button>
              </div>
            </div>

            <div v-if="isWan27VideoMode" class="form-group">
              <label class="form-label">Duration</label>
              <input v-model.number="formData.durationNum" type="range" class="duration-range" :min="mode === 'v2-7-video-edit' ? 0 : 2" :max="(mode === 'v2-7-video-edit' || mode === 'v2-7-r2v') ? 10 : 15" step="1" />
              <div class="form-hint">{{ formData.durationNum }}s</div>
            </div>

            <div v-if="!isWanImageMode && !isWan27VideoMode" class="form-group">
              <label class="checkbox-label">
                <input v-model="formData.multiShots" type="checkbox" />
                <span>Multi shots (multiple shots with transitions)</span>
              </label>
              <div class="form-hint">When unchecked, generates a single continuous shot.</div>
            </div>

            <div v-if="isWanImageMode && canUseThinkingMode" class="form-group">
              <label class="checkbox-label">
                <input v-model="formData.thinkingMode" type="checkbox" />
                <span>Thinking mode</span>
              </label>
              <div class="form-hint">Available only when no input images and sequential mode is off.</div>
            </div>

            <div v-if="isWanImageMode && !formData.enableSequential" class="form-group color-palette-group">
              <div class="color-palette-head">
                <label class="form-label">Color Palette</label>
                <span class="color-palette-meta">{{ formData.colorPalette.length }} colors · {{ colorPaletteSumPercent.toFixed(2) }}%</span>
              </div>
              <p class="form-hint color-palette-intro">Optional theme: 3–10 colors. Ratios must total <strong>100%</strong>. Click the swatch to pick a color (fills HEX).</p>
              <div class="color-palette-list">
                <div v-for="(row, idx) in formData.colorPalette" :key="idx" class="color-palette-row">
                  <label class="palette-swatch-hit" :title="'Pick color ' + (idx + 1)">
                    <input
                      type="color"
                      class="palette-color-native"
                      :value="palettePickerValue(row.hex)"
                      @input="row.hex = ($event.target).value"
                    />
                    <span class="palette-swatch" :style="{ backgroundColor: paletteDisplayHex(row.hex) }" />
                  </label>
                  <div class="palette-field">
                    <span class="palette-field-label">HEX</span>
                    <input
                      v-model.trim="row.hex"
                      type="text"
                      class="form-input palette-hex-input"
                      placeholder="#RRGGBB"
                      maxlength="7"
                      @blur="onPaletteHexBlur(row)"
                    />
                  </div>
                  <div class="palette-field">
                    <span class="palette-field-label palette-field-label-muted">RATIO</span>
                    <input v-model="row.ratioInput" type="text" class="form-input palette-ratio-input" placeholder="e.g. 12.5" />
                  </div>
                  <button type="button" class="palette-remove-btn" title="Remove" @click="removeColor(idx)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
              <div class="color-palette-actions">
                <button type="button" class="action-btn" @click="addColor" :disabled="formData.colorPalette.length >= 10">
                  <i class="fas fa-plus"></i> Add color
                </button>
                <button type="button" class="action-btn action-btn-ghost" :disabled="formData.colorPalette.length === 0" @click="clearColorPalette">Clear</button>
              </div>
              <p v-if="colorPaletteFooterText" class="color-palette-footer" :class="{ 'color-palette-footer--error': colorPaletteNeedsAttention }">{{ colorPaletteFooterText }}</p>
            </div>

            <div v-if="isWanImageMode" class="form-group">
              <label class="checkbox-label">
                <input v-model="formData.watermark" type="checkbox" />
                <span>Add watermark</span>
              </label>
            </div>

            <div v-if="isWan27VideoMode && mode === 'v2-7-video-edit'" class="form-group">
              <label class="form-label">Audio Setting</label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: formData.audioSetting === 'auto' }" @click="formData.audioSetting = 'auto'">auto</button>
                <button type="button" class="tab-option" :class="{ active: formData.audioSetting === 'origin' }" @click="formData.audioSetting = 'origin'">origin</button>
              </div>
            </div>

            <div v-if="isWan27VideoMode" class="form-group">
              <label class="checkbox-label">
                <input v-model="formData.promptExtend" type="checkbox" />
                <span>Prompt extend</span>
              </label>
            </div>

            <div v-if="isWan27VideoMode" class="form-group">
              <label class="checkbox-label">
                <input v-model="formData.watermark" type="checkbox" />
                <span>Add watermark</span>
              </label>
            </div>

            <div v-if="isWan27VideoMode" class="form-group">
              <label class="form-label">Seed</label>
              <input v-model.number="formData.seed" type="number" class="form-input" min="0" max="2147483647" />
            </div>

            <div v-if="isWanImageMode" class="form-group">
              <label class="form-label">Seed</label>
              <input v-model.number="formData.seed" type="number" class="form-input" min="0" max="2147483647" />
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="!canGenerate || isGenerating || isDetailView">
                <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-play"></i>
                {{ isGenerating ? 'Generating...' : (isWanImageMode ? 'Generate Image' : 'Generate Video') }}
                <span v-if="wanPriceText" class="price-tag">{{ wanPriceText }}</span>
              </button>
            </div>
          </fieldset>
        </form>
      </div>

      <div class="result-panel">
        <div v-if="isDetailView && Number(detailData?.status) === 3" class="detail-failure-state">
          <div class="failure-icon"><i class="fas fa-exclamation-circle"></i></div>
          <p class="failure-message">Generation failed. You can try again with different parameters.</p>
        </div>
        <div v-else-if="isDetailView && (!detailData || [0, 1].includes(Number(detailData.status)))" class="detail-loading-state">
          <i class="fas fa-spinner fa-spin detail-spinner"></i>
          <p>Generating...</p>
        </div>
        <div v-else-if="!displayResult" class="empty-state">
          <h4>{{ isWanImageMode ? 'No image generated yet' : 'No video generated yet' }}</h4>
          <p>Fill in the form and click "{{ isWanImageMode ? 'Generate Image' : 'Generate Video' }}" to start.</p>
        </div>
        <div v-else class="result-display">
          <div v-if="isWanImageMode" class="image-result">
            <div class="image-player">
              <img v-if="displayResult.imageUrl" :src="displayResult.imageUrl" class="image-element" alt="Generated image" />
              <div v-else class="video-placeholder">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Generating...</p>
              </div>
            </div>
            <div class="video-actions">
              <button v-if="displayResult.imageUrl" @click="downloadResultAsset" class="action-btn">
                <i class="fas fa-download"></i> Download
              </button>
            </div>
          </div>
          <div v-else class="video-result">
            <div class="video-player">
              <video v-if="displayResult.videoUrl" :src="displayResult.videoUrl" controls class="video-element"></video>
              <div v-else class="video-placeholder">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Generating...</p>
              </div>
            </div>
            <div class="video-actions">
              <button v-if="displayResult.videoUrl" @click="downloadResultAsset" class="action-btn">
                <i class="fas fa-download"></i> Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="bboxModalOpen" class="bbox-modal-root" @keydown.esc="closeBboxModalCancel">
        <div class="bbox-modal-backdrop" @click="closeBboxModalCancel" />
        <div class="bbox-modal" role="dialog" aria-modal="true" @click.stop>
          <div class="bbox-modal-header">
            <div>
              <h4 class="bbox-modal-title">Add box for Image {{ bboxModalImageIdx + 1 }}</h4>
              <p class="bbox-modal-hint">Drag to draw a rectangle. Saved coordinates use original image pixels (same as API bbox_list).</p>
            </div>
            <button type="button" class="bbox-modal-close" aria-label="Close" @click="closeBboxModalCancel">×</button>
          </div>
          <p v-if="bboxModalNaturalW" class="bbox-modal-size">Original size: {{ bboxModalNaturalW }} × {{ bboxModalNaturalH }}</p>
          <div class="bbox-modal-canvas-wrap">
            <canvas
              ref="bboxModalCanvasRef"
              class="bbox-modal-canvas"
              @mousedown.prevent="onBboxCanvasPointerDown"
              @mouseup.prevent="onBboxCanvasPointerUp"
            />
          </div>
          <div class="bbox-modal-footer">
            <button type="button" class="action-btn" @click="clearBboxModalDraft">Clear selection</button>
            <div class="bbox-modal-footer-right">
              <button type="button" class="action-btn action-btn-ghost" @click="closeBboxModalCancel">Cancel</button>
              <button type="button" class="btn-primary bbox-modal-save" :disabled="!bboxDraftValid" @click="saveBboxModal">Save box</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import UploadImage from './common/UploadImage.vue'
import { useToast } from '~/composables/useToast'
import { useApi } from '~/composables/useApi'
import { useRecordPolling } from '~/composables/useRecordPolling'
import { useModelPrice } from '~/composables/useModelPrice'

const router = useRouter()
const route = useRoute()
const { showError } = useToast()
const { post } = useApi()
const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling()
const { fetchPrices, getPrice, formatCredits, discount } = useModelPrice()
onMounted(() => { fetchPrices() })
const batchUploadUrl = useBatchUploadUrl()
const { getUrlsForFiles } = useFileUploadUrlCache()

const modeTabToPath = {
  'text-to-video': '/home/wan/text-to-video',
  'image-to-video': '/home/wan/image-to-video',
  'video-to-video': '/home/wan/video-to-video',
  'v2-7-text-to-video': '/home/wan/v2-7-text-to-video',
  'v2-7-image-to-video': '/home/wan/v2-7-image-to-video',
  'v2-7-video-edit': '/home/wan/v2-7-video-edit',
  'v2-7-r2v': '/home/wan/v2-7-r2v',
  '2-7-image': '/home/wan/2-7-image',
  '2-7-image-pro': '/home/wan/2-7-image-pro'
}
const pathToMode = {
  '/home/wan/text-to-video': 'text-to-video',
  '/home/wan/image-to-video': 'image-to-video',
  '/home/wan/video-to-video': 'video-to-video',
  '/home/wan/v2-7-text-to-video': 'v2-7-text-to-video',
  '/home/wan/v2-7-image-to-video': 'v2-7-image-to-video',
  '/home/wan/v2-7-video-edit': 'v2-7-video-edit',
  '/home/wan/v2-7-videoedit': 'v2-7-video-edit',
  '/home/wan/v2-7-r2v': 'v2-7-r2v',
  '/home/wan/2-7-image': '2-7-image',
  '/home/wan/2-7-image-pro': '2-7-image-pro'
}

// 必须与当前 URL 一致，避免 watch(mode, { immediate }) 在 route→mode 同步前把 /home/wan/2-7-image replace 成 text-to-video
const mode = ref(pathToMode[route.path] || 'text-to-video')
const modeTabs = [
  { key: 'text-to-video', label: 'Text to Video', icon: 'fas fa-font', group: 'video' },
  { key: 'image-to-video', label: 'Image to Video', icon: 'fas fa-image', group: 'video' },
  { key: 'video-to-video', label: 'Video to Video', icon: 'fas fa-video', group: 'video' },
  { key: 'v2-7-text-to-video', label: 'v2.7 Text to Video', icon: 'fas fa-font', group: 'video' },
  { key: 'v2-7-image-to-video', label: 'v2.7 Image to Video', icon: 'fas fa-images', group: 'video' },
  { key: 'v2-7-video-edit', label: 'v2.7 Video Edit', icon: 'fas fa-edit', group: 'video' },
  { key: 'v2-7-r2v', label: 'v2.7 R2V', icon: 'fas fa-layer-group', group: 'video' },
  { key: '2-7-image', label: '2.7 Image', icon: 'fas fa-image', group: 'image' },
  { key: '2-7-image-pro', label: '2.7 Image Pro', icon: 'fas fa-images', group: 'image' }
]
const visibleModeTabs = computed(() => {
  const activeGroup = (mode.value === '2-7-image' || mode.value === '2-7-image-pro') ? 'image' : 'video'
  return modeTabs.filter(tab => tab.group === activeGroup)
})
function goToTab(m) {
  mode.value = m
  router.push(modeTabToPath[m] || modeTabToPath['text-to-video'])
}

watch(() => route.path, (path) => {
  const m = pathToMode[path]
  if (m && mode.value !== m) mode.value = m
}, { immediate: true })

/** 与 route 同步后的 mode 一致：Image 子页首屏即 1K，避免仍为 1080p 导致无 Resolution 选中态 */
const initialWanResolution =
  mode.value === '2-7-image' || mode.value === '2-7-image-pro' ? '1K' : '1080p'

const formData = reactive({
  prompt: '',
  negativePrompt: '',
  audioUrl: '',
  imageUrls: [],
  videoUrls: [],
  firstFrameUrl: '',
  lastFrameUrl: '',
  firstClipUrl: '',
  drivingAudioUrl: '',
  videoUrl: '',
  referenceImageUrl: '',
  referenceImages: [],
  referenceVideos: [],
  firstFrame: '',
  referenceVoice: '',
  aspectRatio: '1:1',
  enableSequential: false,
  n: 4,
  duration: '5',
  durationNum: 5,
  resolution: initialWanResolution,
  multiShots: false,
  audioSetting: 'auto',
  promptExtend: true,
  thinkingMode: false,
  /** @type {{ hex: string, ratioInput: string }[]} */
  colorPalette: [],
  /** 与 input_urls 下标对齐；每项为该图上的框 [x1,y1,x2,y2]（原图像素），每图最多 2 个 */
  bboxPerImage: [],
  watermark: false,
  seed: 0
})

const imageUploadRef = ref(null)
const videoInputRef = ref(null)
const wan27FirstFrameUploadRef = ref(null)
const wan27LastFrameUploadRef = ref(null)
const wan27EditVideoInputRef = ref(null)
const wan27EditRefImageUploadRef = ref(null)
const wan27R2vRefImageUploadRef = ref(null)
const wan27R2vRefVideoInputRef = ref(null)
const wan27R2vFirstFrameUploadRef = ref(null)
const wan27R2vVoiceInputRef = ref(null)
const wan27TextAudioInputRef = ref(null)
const wan27FirstClipInputRef = ref(null)
const wan27DrivingAudioInputRef = ref(null)
const isUploadingImages = ref(false)
const isUploadingVideo = ref(false)
const isUploadingWan27EditVideo = ref(false)
/** 上传的待编辑视频时长（秒），用于 duration=0 时计价与展示 */
const wan27EditVideoSourceDurationSec = ref(0)
const isUploadingWan27TextAudio = ref(false)
const isUploadingWan27FirstClip = ref(false)
const isUploadingWan27DrivingAudio = ref(false)
const isUploadingWan27R2vRefVideos = ref(false)
const isUploadingWan27R2vVoice = ref(false)
const result = ref(null)
const isGenerating = ref(false)
const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)
const wanImageAspectRatios = ['1:1', '16:9', '4:3', '21:9', '3:4', '9:16', '8:1', '1:8']
const isWanImageMode = computed(() => mode.value === '2-7-image' || mode.value === '2-7-image-pro')
const isWan27VideoMode = computed(() => ['v2-7-text-to-video', 'v2-7-image-to-video', 'v2-7-video-edit', 'v2-7-r2v'].includes(mode.value))
const isWan27TextToVideoMode = computed(() => mode.value === 'v2-7-text-to-video')
/** 与后端一致：prompt @NotBlank + @Size(min=3,max=5000) */
const isWan27StrictPromptModes = computed(() =>
  ['v2-7-text-to-video', 'v2-7-image-to-video', 'v2-7-video-edit', 'v2-7-r2v'].includes(mode.value)
)
const isWanImageProMode = computed(() => mode.value === '2-7-image-pro')
const hasImageInput = computed(() => Array.isArray(formData.imageUrls) && formData.imageUrls.length > 0)
const toolDescription = computed(() => {
  if (isWanImageMode.value) {
    return 'Wan is Alibaba\'s multimodal AI generation suite. In image mode, it provides Wan 2.7 Image / Image Pro for high-quality generation and editing with strong prompt adherence, controllable quality, and production-ready outputs.'
  }
  return 'Wan is Alibaba\'s multimodal AI generation suite. In video mode, it provides complete T2V, I2V, and V2V workflows with strong prompt adherence, controllable quality, and production-ready outputs.'
})
const canUseThinkingMode = computed(() => isWanImageMode.value && !formData.enableSequential && !hasImageInput.value)
const canUse4k = computed(() => isWanImageProMode.value && !formData.enableSequential && !hasImageInput.value)
const nMin = computed(() => 1)
const nMax = computed(() => formData.enableSequential ? 12 : 4)
const maxImageFiles = computed(() => isWanImageMode.value ? 9 : 5)

/* —— bbox_list 可视化（与 input_urls 对齐） —— */
const bboxActiveImageIdx = ref(0)
const bboxThumbSizeByIdx = reactive({})
function onBboxThumbLoad(e, idx) {
  const el = e?.target
  if (el instanceof HTMLImageElement && el.naturalWidth) {
    bboxThumbSizeByIdx[idx] = { w: el.naturalWidth, h: el.naturalHeight }
  }
}
const activeImageBboxCount = computed(() => (formData.bboxPerImage[bboxActiveImageIdx.value] || []).length)

function syncBboxPerImageToImages() {
  const len = formData.imageUrls.length
  while (formData.bboxPerImage.length < len) formData.bboxPerImage.push([])
  if (formData.bboxPerImage.length > len) formData.bboxPerImage.splice(len)
  if (bboxActiveImageIdx.value >= len) bboxActiveImageIdx.value = Math.max(0, len - 1)
}

watch(
  () => formData.imageUrls.length,
  () => {
    syncBboxPerImageToImages()
  },
  { immediate: true }
)

watch(hasImageInput, (ok) => {
  if (!ok) bboxModalOpen.value = false
})

const bboxModalOpen = ref(false)
const bboxModalImageIdx = ref(0)
/** @type {import('vue').Ref<number | null>} */
const bboxModalEditIdx = ref(null)
const bboxModalCanvasRef = ref(null)
const bboxModalNaturalW = ref(0)
const bboxModalNaturalH = ref(0)
/** @type {import('vue').Ref<number[] | null>} */
const bboxDraft = ref(null)

let bboxModalImg = null
let bboxCreating = false
/** @type {{ x: number, y: number } | null} */
let bboxDragStart = null

function normalizeRectCoords(x1, y1, x2, y2) {
  return [
    Math.round(Math.min(x1, x2)),
    Math.round(Math.min(y1, y2)),
    Math.round(Math.max(x1, x2)),
    Math.round(Math.max(y1, y2))
  ]
}

function parseBoxRow(row) {
  if (!Array.isArray(row)) return []
  const out = []
  for (const b of row) {
    if (Array.isArray(b) && b.length >= 4) {
      const x1 = Number(b[0])
      const y1 = Number(b[1])
      const x2 = Number(b[2])
      const y2 = Number(b[3])
      if ([x1, y1, x2, y2].every(Number.isFinite)) out.push(normalizeRectCoords(x1, y1, x2, y2))
    }
    if (out.length >= 2) break
  }
  return out
}

function applyBboxListFromApi(raw) {
  if (!Array.isArray(raw)) return
  syncBboxPerImageToImages()
  formData.bboxPerImage = formData.imageUrls.map((_, i) => parseBoxRow(raw[i]))
}

function buildBboxListForApi() {
  if (!hasImageInput.value) return undefined
  const out = formData.imageUrls.map((_, i) => (formData.bboxPerImage[i] || []).map((b) => [...b]))
  const any = out.some((row) => row.length > 0)
  return any ? out : undefined
}

function removeBboxBox(imageIdx, boxIdx) {
  const arr = formData.bboxPerImage[imageIdx]
  if (arr) arr.splice(boxIdx, 1)
}

function clearBboxesForActiveImage() {
  const i = bboxActiveImageIdx.value
  if (formData.bboxPerImage[i]) formData.bboxPerImage[i].splice(0, formData.bboxPerImage[i].length)
}

function clearAllBboxes() {
  formData.imageUrls.forEach((_, i) => {
    if (!formData.bboxPerImage[i]) formData.bboxPerImage[i] = []
    else formData.bboxPerImage[i].splice(0, formData.bboxPerImage[i].length)
  })
}

function openBboxModal(imageIdx, editIdx) {
  const existing = formData.bboxPerImage[imageIdx] || []
  if (editIdx == null && existing.length >= 2) {
    showError('Each image supports at most 2 boxes.')
    return
  }
  bboxModalImageIdx.value = imageIdx
  bboxModalEditIdx.value = editIdx
  bboxDraft.value = null
  bboxCreating = false
  bboxDragStart = null
  bboxModalNaturalW.value = 0
  bboxModalNaturalH.value = 0
  bboxModalImg = null
  bboxModalOpen.value = true

  const url = formData.imageUrls[imageIdx]
  const img = new Image()
  // 不设 crossOrigin：CDN 若未返回 Access-Control-Allow-Origin，anonymous 会导致 CORS 失败；
  // 此处仅用 drawImage 展示与画框，无需读像素，与缩略图 <img> 同源策略一致即可加载。
  img.onload = () => {
    bboxModalImg = img
    bboxModalNaturalW.value = img.naturalWidth
    bboxModalNaturalH.value = img.naturalHeight
    nextTick(() => {
      const c = bboxModalCanvasRef.value
      if (!c || !bboxModalImg) return
      c.width = bboxModalNaturalW.value
      c.height = bboxModalNaturalH.value
      redrawBboxModalCanvas()
    })
  }
  img.onerror = () => {
    showError('Failed to load image for bbox editor')
    bboxModalOpen.value = false
  }
  img.src = url
}

function closeBboxModalCancel() {
  onWindowBboxPointerUp()
  bboxModalOpen.value = false
  bboxDraft.value = null
  bboxCreating = false
  bboxDragStart = null
  bboxModalEditIdx.value = null
  bboxModalImg = null
}

function clearBboxModalDraft() {
  bboxDraft.value = null
  bboxCreating = false
  bboxDragStart = null
  redrawBboxModalCanvas()
}

const bboxDraftValid = computed(() => {
  const d = bboxDraft.value
  if (!d || d.length < 4) return false
  return d[2] - d[0] >= 2 && d[3] - d[1] >= 2
})

function canvasPixelFromEvent(e) {
  const canvas = bboxModalCanvasRef.value
  if (!canvas) return { x: 0, y: 0 }
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height
  const x = (e.clientX - rect.left) * scaleX
  const y = (e.clientY - rect.top) * scaleY
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
  return {
    x: clamp(x, 0, canvas.width),
    y: clamp(y, 0, canvas.height)
  }
}

function onWindowBboxPointerMove(e) {
  if (!bboxCreating || !bboxDragStart || !bboxModalImg) return
  const p = canvasPixelFromEvent(e)
  bboxDraft.value = normalizeRectCoords(bboxDragStart.x, bboxDragStart.y, p.x, p.y)
  redrawBboxModalCanvas()
}

function onWindowBboxPointerUp() {
  bboxCreating = false
  bboxDragStart = null
  window.removeEventListener('mousemove', onWindowBboxPointerMove)
  window.removeEventListener('mouseup', onWindowBboxPointerUp)
}

function onBboxCanvasPointerDown(e) {
  if (!bboxModalImg) return
  const p = canvasPixelFromEvent(e)
  bboxCreating = true
  bboxDragStart = p
  bboxDraft.value = [p.x, p.y, p.x, p.y]
  redrawBboxModalCanvas()
  window.addEventListener('mousemove', onWindowBboxPointerMove)
  window.addEventListener('mouseup', onWindowBboxPointerUp)
}

function onBboxCanvasPointerUp() {
  onWindowBboxPointerUp()
}

function strokeBoxOnCtx(ctx, b, stroke, fill) {
  const [x1, y1, x2, y2] = b
  const w = x2 - x1
  const h = y2 - y1
  if (w <= 0 || h <= 0) return
  if (fill) {
    ctx.fillStyle = fill
    ctx.fillRect(x1, y1, w, h)
  }
  const lw = Math.max(2, Math.round((ctx.canvas?.width || 512) / 256))
  ctx.strokeStyle = stroke
  ctx.lineWidth = lw
  ctx.strokeRect(x1, y1, w, h)
}

function redrawBboxModalCanvas() {
  const c = bboxModalCanvasRef.value
  if (!c || !bboxModalImg) return
  const ctx = c.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, c.width, c.height)
  ctx.drawImage(bboxModalImg, 0, 0)
  const idx = bboxModalImageIdx.value
  const saved = formData.bboxPerImage[idx] || []
  const editI = bboxModalEditIdx.value
  saved.forEach((b, si) => {
    if (editI != null && si === editI) return
    strokeBoxOnCtx(ctx, b, '#2563eb', 'rgba(37, 99, 235, 0.12)')
    ctx.fillStyle = '#2563eb'
    ctx.font = `${Math.max(12, Math.round(c.width / 48))}px sans-serif`
    ctx.fillText(`Box ${si + 1}`, b[0] + 4, b[1] + Math.max(14, Math.round(c.width / 40)))
  })
  if (bboxDraft.value) strokeBoxOnCtx(ctx, bboxDraft.value, '#ea580c', 'rgba(234, 88, 12, 0.15)')
}

function saveBboxModal() {
  if (!bboxDraftValid.value) {
    showError('Drag a rectangle first (min ~2px per side).')
    return
  }
  const norm = normalizeRectCoords(bboxDraft.value[0], bboxDraft.value[1], bboxDraft.value[2], bboxDraft.value[3])
  const i = bboxModalImageIdx.value
  if (!formData.bboxPerImage[i]) formData.bboxPerImage[i] = []
  const edit = bboxModalEditIdx.value
  if (edit != null) {
    formData.bboxPerImage[i].splice(edit, 1, norm)
  } else {
    formData.bboxPerImage[i].push(norm)
  }
  closeBboxModalCancel()
}

watch(bboxModalOpen, (open) => {
  if (!open) return
  nextTick(() => {
    if (bboxModalImg && bboxModalCanvasRef.value) {
      const c = bboxModalCanvasRef.value
      c.width = bboxModalNaturalW.value
      c.height = bboxModalNaturalH.value
      redrawBboxModalCanvas()
    }
  })
})

function fillFormFromOriginalData(o) {
  if (!o || typeof o !== 'object') return
  if (o.prompt != null) formData.prompt = String(o.prompt)
  if (o.negativePrompt != null) formData.negativePrompt = String(o.negativePrompt)
  else if (o.negative_prompt != null) formData.negativePrompt = String(o.negative_prompt)
  if (o.audioUrl != null) formData.audioUrl = String(o.audioUrl)
  else if (o.audio_url != null) formData.audioUrl = String(o.audio_url)
  if (o.firstFrameUrl != null) formData.firstFrameUrl = String(o.firstFrameUrl)
  else if (o.first_frame_url != null) formData.firstFrameUrl = String(o.first_frame_url)
  if (o.lastFrameUrl != null) formData.lastFrameUrl = String(o.lastFrameUrl)
  else if (o.last_frame_url != null) formData.lastFrameUrl = String(o.last_frame_url)
  if (o.firstClipUrl != null) formData.firstClipUrl = String(o.firstClipUrl)
  else if (o.first_clip_url != null) formData.firstClipUrl = String(o.first_clip_url)
  if (o.drivingAudioUrl != null) formData.drivingAudioUrl = String(o.drivingAudioUrl)
  else if (o.driving_audio_url != null) formData.drivingAudioUrl = String(o.driving_audio_url)
  if (o.videoUrl != null) formData.videoUrl = String(o.videoUrl)
  else if (o.video_url != null) formData.videoUrl = String(o.video_url)
  if (Array.isArray(o.referenceImage)) formData.referenceImages = [...o.referenceImage]
  else if (Array.isArray(o.reference_image)) formData.referenceImages = [...o.reference_image]
  else if (o.referenceImage != null) formData.referenceImageUrl = String(o.referenceImage)
  else if (o.reference_image != null) formData.referenceImageUrl = String(o.reference_image)
  if (Array.isArray(o.referenceVideo)) formData.referenceVideos = [...o.referenceVideo]
  else if (Array.isArray(o.reference_video)) formData.referenceVideos = [...o.reference_video]
  if (o.firstFrame != null) formData.firstFrame = String(o.firstFrame)
  else if (o.first_frame != null) formData.firstFrame = String(o.first_frame)
  if (o.referenceVoice != null) formData.referenceVoice = String(o.referenceVoice)
  else if (o.reference_voice != null) formData.referenceVoice = String(o.reference_voice)
  if (o.duration != null) formData.duration = String(o.duration)
  if (o.duration != null) formData.durationNum = Number(o.duration) || formData.durationNum
  if (o.resolution) formData.resolution = String(o.resolution)
  if (o.ratio != null) formData.aspectRatio = String(o.ratio)
  else if (o.aspect_ratio) formData.aspectRatio = String(o.aspect_ratio)
  else if (o.aspectRatio) formData.aspectRatio = String(o.aspectRatio)
  if ('enable_sequential' in o) formData.enableSequential = !!o.enable_sequential
  if ('enableSequential' in o) formData.enableSequential = !!o.enableSequential
  if (o.n != null) formData.n = Number(o.n) || formData.n
  if ('thinking_mode' in o) formData.thinkingMode = !!o.thinking_mode
  if ('thinkingMode' in o) formData.thinkingMode = !!o.thinkingMode
  if (Array.isArray(o.color_palette)) formData.colorPalette = o.color_palette.map(mapApiColorPaletteRow).filter((r) => r.hex)
  if (Array.isArray(o.colorPalette)) formData.colorPalette = o.colorPalette.map(mapApiColorPaletteRow).filter((r) => r.hex)
  if ('watermark' in o) formData.watermark = !!o.watermark
  if ('promptExtend' in o) formData.promptExtend = !!o.promptExtend
  else if ('prompt_extend' in o) formData.promptExtend = !!o.prompt_extend
  if (o.audioSetting != null) formData.audioSetting = String(o.audioSetting)
  else if ('audio_setting' in o) formData.audioSetting = String(o.audio_setting)
  if (o.seed != null && o.seed !== '') formData.seed = Number(o.seed) || 0
  if ('multiShots' in o) formData.multiShots = !!o.multiShots
  if (Array.isArray(o.imageUrls)) formData.imageUrls = [...o.imageUrls]
  else if (Array.isArray(o.image_urls)) formData.imageUrls = [...o.image_urls]
  syncBboxPerImageToImages()
  if (Array.isArray(o.bbox_list)) applyBboxListFromApi(o.bbox_list)
  else if (Array.isArray(o.bboxList)) applyBboxListFromApi(o.bboxList)
  if (Array.isArray(o.videoUrls)) formData.videoUrls = [...o.videoUrls]
  else if (Array.isArray(o.video_urls)) formData.videoUrls = [...o.video_urls]
}

function pickDetailVideoUrl(d) {
  if (!d || typeof d !== 'object') return ''
  let url = d.outputUrl || d.videoUrl
  if (url) return typeof url === 'string' ? url : url?.url || ''
  const ou = d.outputUrls
  if (typeof ou === 'string' && ou) return ou
  if (Array.isArray(ou) && ou.length) {
    const first = ou[0]
    return typeof first === 'string' ? first : first?.url || ''
  }
  return ''
}

async function loadDetailByRecordId(recordId) {
  if (!recordId || routeRecordId.value !== recordId) return
  detailData.value = null
  try {
    let data = await fetchRecordDetailOnce(recordId)
    if (routeRecordId.value !== recordId) return
    detailData.value = data || null
    if (data?.originalData) fillFormFromOriginalData(data.originalData)
    const status = Number(data?.status)
    if (data == null || status === 0 || status === 1) {
      const res = await pollRecordByStatus(recordId, { getIsCancelled: () => routeRecordId.value !== recordId })
      if (routeRecordId.value === recordId) {
        detailData.value = res
        if (res?.originalData) fillFormFromOriginalData(res.originalData)
      }
    }
  } catch (e) { console.error('Wan load record detail failed:', e) }
}
watch(() => route.query['record-id'], (recordId) => {
  if (recordId) loadDetailByRecordId(recordId)
  else detailData.value = null
}, { immediate: true })

// 折扣文本
const discountText = computed(() => {
  const rate = Number(discount?.value ?? 1)
  if (Number.isNaN(rate) || rate <= 0 || rate === 1) return ''
  const percent = (rate * 100).toFixed(0)
  return ` · ${percent}%`
})

// 价格：2.6 / 其余 2.7 视频按接口 RULE；wan-2-7-text-to-video / image-to-video / video-edit / r2v：RULE duration=1+quality 为每秒单价×计费秒数（Video Edit 时长 0 时用上传源视频时长估；R2V 计费秒=输出时长 2–10）
const wanPriceModelKeyMap = {
  'text-to-video': 'wan-2-6-text-to-video',
  'image-to-video': 'wan-2-6-image-to-video',
  'video-to-video': 'wan-2-6-video-to-video',
  'v2-7-text-to-video': 'wan-2-7-text-to-video',
  'v2-7-image-to-video': 'wan-2-7-image-to-video',
  'v2-7-video-edit': 'wan-2-7-video-edit',
  'v2-7-r2v': 'wan-2-7-r2v',
  '2-7-image': 'wan-2-7-image',
  '2-7-image-pro': 'wan-2-7-image-pro'
}
const wanPriceText = computed(() => {
  const modelKey = wanPriceModelKeyMap[mode.value]
  if (!modelKey) return ''

  if (mode.value === 'v2-7-text-to-video' || mode.value === 'v2-7-image-to-video' || mode.value === 'v2-7-video-edit' || mode.value === 'v2-7-r2v') {
    const quality = formData.resolution === '720p' ? '720p' : '1080p'
    const perSecond = getPrice(modelKey, {
      duration: 1,
      quality
    })
    if (perSecond == null) return ''
    let billSec = 0
    if (mode.value === 'v2-7-video-edit') {
      const d = Number(formData.durationNum) || 0
      if (d === 0) {
        const src = Math.ceil(Number(wan27EditVideoSourceDurationSec.value) || 0)
        if (src >= 2) {
          billSec = Math.max(2, Math.min(10, src))
        } else if (formData.videoUrl) {
          // 已填视频 URL 但无本地元数据（如粘贴链接）：用 5 秒作展示估算
          billSec = 5
        } else {
          // 未填视频：按最低计费 2 秒展示参考价（与后端 2–10s 区间下限一致）
          billSec = 2
        }
      } else {
        billSec = Math.max(2, Math.min(10, d))
      }
    } else if (mode.value === 'v2-7-r2v') {
      billSec = Math.max(2, Math.min(10, Number(formData.durationNum) || 5))
    } else {
      billSec = Math.max(2, Math.min(15, Number(formData.durationNum) || 5))
    }
    const totalCredits = perSecond * billSec
    const str = formatCredits(totalCredits)
    if (!str) return ''
    return `· ${str} credits${discountText.value}`
  }

  const priceFields = isWanImageMode.value
    ? { quality: formData.resolution, batchSize: Number(formData.n) || 1 }
    : { duration: String(isWan27VideoMode.value ? formData.durationNum : formData.duration), quality: formData.resolution }
  const credits = getPrice(modelKey, priceFields)
  const str = formatCredits(credits)
  if (!str) return ''
  return `· ${str} credits${discountText.value}`
})

const getAuthToken = () => {
  if (!import.meta.client) return null
  try {
    return localStorage.getItem('auth_token')
  } catch {
    return null
  }
}

async function uploadFilesToUrls(files) {
  if (!files?.length) return []
  const form = new FormData()
  files.forEach(f => form.append('file', f))
  const headers = { Accept: 'application/json' }
  const token = getAuthToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(batchUploadUrl, {
    method: 'POST',
    headers,
    body: form,
    credentials: 'include'
  })
  const data = await parseBatchUploadFetchResponse(res)
  const urls = data?.data?.urls || data?.fileUrls || (Array.isArray(data?.data) ? data.data : [])
  return Array.isArray(urls) ? urls : []
}

async function handleImageFiles(files) {
  if (!files?.length) {
    formData.imageUrls = []
    return
  }
  const list = Array.isArray(files) ? files : [files]
  isUploadingImages.value = true
  try {
    formData.imageUrls = await getUrlsForFiles(list, uploadFilesToUrls)
  } catch (e) {
    showError(e?.message || 'Upload failed')
    formData.imageUrls = []
    imageUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingImages.value = false
  }
}

function triggerVideoInput() {
  videoInputRef.value?.click()
}
function triggerWan27EditVideoInput() {
  wan27EditVideoInputRef.value?.click()
}
function clearWan27EditVideo() {
  formData.videoUrl = ''
  wan27EditVideoSourceDurationSec.value = 0
  if (wan27EditVideoInputRef.value) wan27EditVideoInputRef.value.value = ''
}
function triggerWan27R2vRefVideoInput() {
  wan27R2vRefVideoInputRef.value?.click()
}
function triggerWan27R2vVoiceInput() {
  wan27R2vVoiceInputRef.value?.click()
}
function triggerWan27TextAudioInput() {
  wan27TextAudioInputRef.value?.click()
}
function triggerWan27FirstClipInput() {
  wan27FirstClipInputRef.value?.click()
}
function triggerWan27DrivingAudioInput() {
  wan27DrivingAudioInputRef.value?.click()
}
function clearWan27TextAudio() {
  formData.audioUrl = ''
  if (wan27TextAudioInputRef.value) wan27TextAudioInputRef.value.value = ''
}
function clearWan27FirstClip() {
  formData.firstClipUrl = ''
  if (wan27FirstClipInputRef.value) wan27FirstClipInputRef.value.value = ''
}
function clearWan27DrivingAudio() {
  formData.drivingAudioUrl = ''
  if (wan27DrivingAudioInputRef.value) wan27DrivingAudioInputRef.value.value = ''
}
function removeWan27R2vReferenceVideoAt(idx) {
  const list = formData.referenceVideos || []
  formData.referenceVideos = list.filter((_, j) => j !== idx)
}
function clearWan27R2vReferenceVoice() {
  formData.referenceVoice = ''
  if (wan27R2vVoiceInputRef.value) wan27R2vVoiceInputRef.value.value = ''
}
function clearVideo() {
  formData.videoUrls = []
  if (videoInputRef.value) videoInputRef.value.value = ''
}
async function handleVideoFile(e) {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.size > 10 * 1024 * 1024) {
    showError('Video max 10MB')
    e.target.value = ''
    return
  }
  isUploadingVideo.value = true
  try {
    formData.videoUrls = await uploadFilesToUrls([file])
  } catch (err) {
    showError(err?.message || 'Upload failed')
    formData.videoUrls = []
  } finally {
    isUploadingVideo.value = false
    e.target.value = ''
  }
}
async function handleWan27FirstFrameFile(files) {
  const file = Array.isArray(files) ? files[0] : files
  if (!file) {
    formData.firstFrameUrl = ''
    return
  }
  formData.firstFrameUrl = (await uploadFilesToUrls([file]))[0] || ''
}
async function handleWan27LastFrameFile(files) {
  const file = Array.isArray(files) ? files[0] : files
  if (!file) {
    formData.lastFrameUrl = ''
    return
  }
  formData.lastFrameUrl = (await uploadFilesToUrls([file]))[0] || ''
}
function getFileVideoDurationSeconds(file) {
  if (!file || typeof document === 'undefined') return Promise.resolve(0)
  return new Promise((resolve) => {
    try {
      const url = URL.createObjectURL(file)
      const video = document.createElement('video')
      const cleanup = () => {
        video.removeEventListener('loadedmetadata', onLoaded)
        video.removeEventListener('error', onError)
        try { URL.revokeObjectURL(url) } catch { /* noop */ }
      }
      const onLoaded = () => {
        const d = Number(video.duration) || 0
        cleanup()
        resolve(Number.isFinite(d) && d > 0 ? d : 0)
      }
      const onError = () => {
        cleanup()
        resolve(0)
      }
      video.addEventListener('loadedmetadata', onLoaded)
      video.addEventListener('error', onError)
      video.preload = 'metadata'
      video.muted = true
      video.src = url
    } catch {
      resolve(0)
    }
  })
}

async function handleWan27EditVideoFile(e) {
  const file = e.target.files?.[0]
  if (!file) {
    formData.videoUrl = ''
    wan27EditVideoSourceDurationSec.value = 0
    return
  }
  isUploadingWan27EditVideo.value = true
  try {
    const secs = await getFileVideoDurationSeconds(file)
    wan27EditVideoSourceDurationSec.value = secs > 0 ? secs : 0
    formData.videoUrl = (await uploadFilesToUrls([file]))[0] || ''
    if (!formData.videoUrl) wan27EditVideoSourceDurationSec.value = 0
  } catch (err) {
    showError(err?.message || 'Upload failed')
    formData.videoUrl = ''
    wan27EditVideoSourceDurationSec.value = 0
  } finally {
    isUploadingWan27EditVideo.value = false
    e.target.value = ''
  }
}
async function handleWan27EditReferenceImageFile(files) {
  const file = Array.isArray(files) ? files[0] : files
  if (!file) {
    formData.referenceImageUrl = ''
    return
  }
  formData.referenceImageUrl = (await uploadFilesToUrls([file]))[0] || ''
}
async function handleWan27R2vReferenceImages(files) {
  const list = Array.isArray(files) ? files.slice(0, 5) : (files ? [files] : [])
  if (!list.length) {
    formData.referenceImages = []
    return
  }
  formData.referenceImages = await getUrlsForFiles(list, uploadFilesToUrls)
}
async function handleWan27R2vReferenceVideos(e) {
  const files = Array.from(e.target.files || []).slice(0, 5)
  if (!files.length) return
  isUploadingWan27R2vRefVideos.value = true
  try {
    formData.referenceVideos = await uploadFilesToUrls(files)
  } catch (err) {
    showError(err?.message || 'Upload failed')
    formData.referenceVideos = []
  } finally {
    isUploadingWan27R2vRefVideos.value = false
    e.target.value = ''
  }
}
async function handleWan27R2vFirstFrame(files) {
  const file = Array.isArray(files) ? files[0] : files
  if (!file) {
    formData.firstFrame = ''
    return
  }
  formData.firstFrame = (await uploadFilesToUrls([file]))[0] || ''
}
async function handleWan27R2vReferenceVoice(e) {
  const file = e.target.files?.[0]
  if (!file) return
  isUploadingWan27R2vVoice.value = true
  try {
    formData.referenceVoice = (await uploadFilesToUrls([file]))[0] || ''
  } catch (err) {
    showError(err?.message || 'Upload failed')
    formData.referenceVoice = ''
  } finally {
    isUploadingWan27R2vVoice.value = false
    e.target.value = ''
  }
}
async function handleWan27TextAudioFile(e) {
  const file = e.target.files?.[0]
  if (!file) return
  isUploadingWan27TextAudio.value = true
  try {
    formData.audioUrl = (await uploadFilesToUrls([file]))[0] || ''
  } catch (err) {
    showError(err?.message || 'Upload failed')
    formData.audioUrl = ''
  } finally {
    isUploadingWan27TextAudio.value = false
    e.target.value = ''
  }
}
async function handleWan27FirstClipFile(e) {
  const file = e.target.files?.[0]
  if (!file) return
  isUploadingWan27FirstClip.value = true
  try {
    formData.firstClipUrl = (await uploadFilesToUrls([file]))[0] || ''
  } catch (err) {
    showError(err?.message || 'Upload failed')
    formData.firstClipUrl = ''
  } finally {
    isUploadingWan27FirstClip.value = false
    e.target.value = ''
  }
}
async function handleWan27DrivingAudioFile(e) {
  const file = e.target.files?.[0]
  if (!file) return
  isUploadingWan27DrivingAudio.value = true
  try {
    formData.drivingAudioUrl = (await uploadFilesToUrls([file]))[0] || ''
  } catch (err) {
    showError(err?.message || 'Upload failed')
    formData.drivingAudioUrl = ''
  } finally {
    isUploadingWan27DrivingAudio.value = false
    e.target.value = ''
  }
}

function normalizeHex(v) {
  const raw = String(v || '').trim()
  if (!raw) return ''
  let m = raw.replace(/^#/, '')
  if (/^[0-9a-fA-F]{3}$/.test(m)) m = m.split('').map((ch) => ch + ch).join('')
  if (!/^[0-9a-fA-F]{6}$/.test(m)) return ''
  return '#' + m.toLowerCase()
}

function parseRatioInputStr(s) {
  const t = String(s ?? '')
    .replace(/%/g, '')
    .trim()
    .replace(/,/g, '.')
  if (!t) return NaN
  const n = Number(t)
  return Number.isFinite(n) ? n : NaN
}

function mapApiColorPaletteRow(c) {
  if (typeof c === 'string') {
    const hex = normalizeHex(c)
    return { hex: hex || '#94a3b8', ratioInput: '' }
  }
  const col = c?.color ?? c?.hex ?? ''
  const hex = normalizeHex(String(col)) || '#94a3b8'
  let ratioInput = ''
  const rv = c?.ratio ?? c?.weight
  if (rv != null && Number.isFinite(Number(rv))) {
    const num = Number(rv)
    if (num >= 0 && num <= 1) {
      const pct = Math.round(num * 10000) / 100
      ratioInput = Number.isInteger(pct) ? String(pct) : String(pct)
    } else {
      ratioInput = String(num)
    }
  }
  return { hex, ratioInput }
}

function palettePickerValue(hex) {
  return normalizeHex(hex) || '#3b82f6'
}

function paletteDisplayHex(hex) {
  return normalizeHex(hex) || '#e2e8f0'
}

const colorPaletteSumPercent = computed(() =>
  formData.colorPalette.reduce((sum, row) => {
    const v = parseRatioInputStr(row.ratioInput)
    return sum + (Number.isFinite(v) ? v : 0)
  }, 0)
)

const colorPaletteValidForGenerate = computed(() => {
  const rows = formData.colorPalette
  const n = rows.length
  if (n === 0) return true
  if (n < 3 || n > 10) return false
  let sum = 0
  for (const row of rows) {
    if (!normalizeHex(row.hex)) return false
    const r = parseRatioInputStr(row.ratioInput)
    if (!Number.isFinite(r) || r < 0) return false
    sum += r
  }
  return Math.abs(sum - 100) < 0.02
})

const colorPaletteNeedsAttention = computed(() => {
  const n = formData.colorPalette.length
  if (n === 0) return false
  return !colorPaletteValidForGenerate.value
})

const colorPaletteFooterText = computed(() => {
  const n = formData.colorPalette.length
  if (n === 0) return ''
  if (n < 3) return `color_palette requires 3 to 10 colors (add ${3 - n} more).`
  if (n > 10) return 'Maximum 10 colors.'
  const badHex = formData.colorPalette.some((row) => !normalizeHex(row.hex))
  if (badHex) return 'Each row needs a valid HEX (e.g. #aabbcc).'
  const sum = colorPaletteSumPercent.value
  if (Math.abs(sum - 100) >= 0.02) return `Ratios must total 100% (currently ${sum.toFixed(2)}%).`
  return ''
})

function addColor() {
  if (formData.colorPalette.length >= 10) return
  formData.colorPalette.push({ hex: '#3b82f6', ratioInput: '' })
}

function removeColor(idx) {
  formData.colorPalette.splice(idx, 1)
}

function clearColorPalette() {
  formData.colorPalette.splice(0, formData.colorPalette.length)
}

function onPaletteHexBlur(row) {
  const n = normalizeHex(row.hex)
  if (n) row.hex = n
}

const promptMaxLength = computed(() => 5000)
const promptPlaceholder = computed(() => {
  if (mode.value === 'text-to-video') return 'Describe the video you want (1–5000 characters, Chinese or English).'
  if (isWan27StrictPromptModes.value) {
    return 'Describe expected elements and visual style (3–5000 characters, Chinese or English).'
  }
  if (isWan27VideoMode.value) return 'Describe expected elements and visual style (max 5000 characters).'
  if (isWanImageMode.value) return 'Describe image generation/editing intent (supports Chinese/English, max 5000 characters).'
  return 'Describe how to animate or transform the media (2–5000 characters).'
})
const promptHint = computed(() => {
  if (mode.value === 'text-to-video') return 'Min 1 character, max 5000. Supports Chinese and English.'
  if (isWan27StrictPromptModes.value) {
    return 'Required: 3–5000 characters (Chinese or English). Use negative prompt to suppress unwanted artifacts.'
  }
  if (isWan27VideoMode.value) return 'Use negative prompt to suppress unwanted artifacts.'
  if (isWanImageMode.value) return 'Max 5000 characters. When input images are provided, aspect ratio is ignored.'
  return 'Min 2 characters, max 5000.'
})

const canGenerate = computed(() => {
  const p = (formData.prompt || '').trim()
  if (isWanImageMode.value) {
    if (!(p.length >= 1 && p.length <= 5000)) return false
    if (formData.enableSequential) return formData.n >= 1 && formData.n <= 12
    if (formData.colorPalette.length > 0 && !colorPaletteValidForGenerate.value) return false
    return formData.n >= 1 && formData.n <= 4
  }
  if (isWan27VideoMode.value) {
    if (mode.value === 'v2-7-text-to-video') return p.length >= 3 && p.length <= 5000
    if (mode.value === 'v2-7-image-to-video') {
      const hasInput = !!formData.firstFrameUrl || !!formData.lastFrameUrl || !!formData.firstClipUrl || !!formData.drivingAudioUrl
      return p.length >= 3 && p.length <= 5000 && hasInput
    }
    if (mode.value === 'v2-7-video-edit') return p.length >= 3 && p.length <= 5000 && !!formData.videoUrl
    if (mode.value === 'v2-7-r2v') {
      const total = (formData.referenceImages?.length || 0) + (formData.referenceVideos?.length || 0)
      return p.length >= 3 && p.length <= 5000 && total > 0 && total <= 5
    }
  }
  if (mode.value === 'text-to-video') return p.length >= 1 && p.length <= 5000
  if (mode.value === 'image-to-video') return p.length >= 2 && p.length <= 5000 && formData.imageUrls.length > 0
  if (mode.value === 'video-to-video') return p.length >= 2 && p.length <= 5000 && formData.videoUrls.length > 0
  return false
})

const displayResult = computed(() => {
  if (isDetailView.value && detailData.value && Number(detailData.value.status) === 2) {
    const url = pickDetailVideoUrl(detailData.value)
    if (url) return isWanImageMode.value ? { imageUrl: url } : { videoUrl: url }
  }
  return result.value
})

async function generate() {
  const p = (formData.prompt || '').trim()
  if (!canGenerate.value) return
  if (mode.value === 'v2-7-r2v') {
    const total = (formData.referenceImages?.length || 0) + (formData.referenceVideos?.length || 0)
    if (total > 5) {
      showError('Reference images + videos total cannot exceed 5')
      return
    }
  }

  isGenerating.value = true
  try {
    const modeVal = mode.value
    let apiPath, body

    if (modeVal === '2-7-image' || modeVal === '2-7-image-pro') {
      apiPath = modeVal === '2-7-image' ? '/api/image/wan/2-7-image' : '/api/image/wan/2-7-image-pro'
      if (!formData.enableSequential && formData.colorPalette.length > 0 && !colorPaletteValidForGenerate.value) {
        showError('Color palette: 3–10 colors, valid HEX, ratio percentages must total 100%.')
        return
      }
      const color_palette =
        !formData.enableSequential && formData.colorPalette.length > 0
          ? formData.colorPalette.map((row) => ({
              color: normalizeHex(row.hex),
              ratio: parseRatioInputStr(row.ratioInput) / 100
            }))
          : undefined
      const bboxList = buildBboxListForApi()
      let resolution = formData.resolution
      if (modeVal === '2-7-image' && resolution !== '1K' && resolution !== '2K') resolution = '2K'
      if (modeVal === '2-7-image-pro' && resolution === '4K' && !canUse4k.value) resolution = '2K'
      body = {
        model: modeVal === '2-7-image' ? 'wan-2-7-image' : 'wan-2-7-image-pro',
        prompt: p,
        input_urls: formData.imageUrls,
        aspect_ratio: hasImageInput.value ? undefined : formData.aspectRatio,
        enable_sequential: !!formData.enableSequential,
        n: Number(formData.n),
        resolution,
        thinking_mode: canUseThinkingMode.value ? !!formData.thinkingMode : false,
        color_palette,
        bbox_list: hasImageInput.value ? bboxList : undefined,
        watermark: !!formData.watermark,
        seed: Math.max(0, Math.min(2147483647, Number(formData.seed) || 0))
      }
    } else if (modeVal === 'text-to-video') {
      apiPath = '/api/video/wan/text-to-video'
      body = {
        model: 'wan-2-6-text-to-video',
        prompt: p,
        duration: String(formData.duration),
        resolution: formData.resolution,
        multiShots: !!formData.multiShots
      }
    } else if (modeVal === 'image-to-video') {
      apiPath = '/api/video/wan/image-to-video'
      body = {
        model: 'wan-2-6-image-to-video',
        prompt: p,
        imageUrls: formData.imageUrls,
        duration: String(formData.duration),
        resolution: formData.resolution,
        multiShots: !!formData.multiShots
      }
    } else if (modeVal === 'video-to-video') {
      apiPath = '/api/video/wan/video-to-video'
      const duration = formData.duration === '15' ? '10' : String(formData.duration)
      body = {
        model: 'wan-2-6-video-to-video',
        prompt: p,
        videoUrls: formData.videoUrls,
        duration,
        resolution: formData.resolution,
        multiShots: !!formData.multiShots
      }
    } else if (modeVal === 'v2-7-text-to-video') {
      apiPath = '/api/video/wan/v27-text-to-video'
      const dur = Math.max(2, Math.min(15, Number(formData.durationNum) || 5))
      const seedNum = Math.max(0, Math.min(2147483647, Number(formData.seed) || 0))
      body = {
        model: 'wan-2-7-text-to-video',
        prompt: p,
        negativePrompt: (formData.negativePrompt || '').trim() || undefined,
        audioUrl: (formData.audioUrl || '').trim() || undefined,
        resolution: formData.resolution === '720p' ? '720p' : '1080p',
        ratio: formData.aspectRatio,
        duration: String(dur),
        promptExtend: !!formData.promptExtend,
        watermark: !!formData.watermark,
        seed: String(seedNum)
      }
    } else if (modeVal === 'v2-7-image-to-video') {
      apiPath = '/api/video/wan/v27-image-to-video'
      const dur = Math.max(2, Math.min(15, Number(formData.durationNum) || 5))
      const seedNum = Math.max(0, Math.min(2147483647, Number(formData.seed) || 0))
      const pt = p.trim()
      body = {
        model: 'wan-2-7-image-to-video',
        prompt: pt,
        negativePrompt: (formData.negativePrompt || '').trim() || undefined,
        firstFrameUrl: formData.firstFrameUrl || undefined,
        lastFrameUrl: formData.lastFrameUrl || undefined,
        firstClipUrl: (formData.firstClipUrl || '').trim() || undefined,
        drivingAudioUrl: (formData.drivingAudioUrl || '').trim() || undefined,
        resolution: formData.resolution === '720p' ? '720p' : '1080p',
        duration: String(dur),
        promptExtend: !!formData.promptExtend,
        watermark: !!formData.watermark,
        seed: String(seedNum)
      }
    } else if (modeVal === 'v2-7-video-edit') {
      apiPath = '/api/video/wan/v27-video-edit'
      const dNum = Math.max(0, Math.min(10, Number(formData.durationNum) || 0))
      const seedNum = Math.max(0, Math.min(2147483647, Number(formData.seed) || 0))
      body = {
        model: 'wan-2-7-videoedit',
        prompt: p,
        negativePrompt: (formData.negativePrompt || '').trim() || undefined,
        videoUrl: formData.videoUrl,
        referenceImage: formData.referenceImageUrl || undefined,
        resolution: formData.resolution === '720p' ? '720p' : '1080p',
        aspectRatio: formData.aspectRatio || undefined,
        duration: String(dNum),
        audioSetting: formData.audioSetting === 'origin' ? 'origin' : 'auto',
        promptExtend: !!formData.promptExtend,
        watermark: !!formData.watermark,
        seed: String(seedNum)
      }
    } else if (modeVal === 'v2-7-r2v') {
      apiPath = '/api/video/wan/v27-r2v'
      const dur = Math.max(2, Math.min(10, Number(formData.durationNum) || 5))
      const seedNum = Math.max(0, Math.min(2147483647, Number(formData.seed) || 0))
      body = {
        model: 'wan-2-7-r2v',
        prompt: p,
        negativePrompt: (formData.negativePrompt || '').trim() || undefined,
        referenceImage: formData.referenceImages?.length ? formData.referenceImages.slice(0, 5) : undefined,
        referenceVideo: formData.referenceVideos?.length ? formData.referenceVideos.slice(0, 5) : undefined,
        firstFrame: (formData.firstFrame || '').trim() || undefined,
        referenceVoice: (formData.referenceVoice || '').trim() || undefined,
        resolution: formData.resolution === '720p' ? '720p' : '1080p',
        aspectRatio: formData.firstFrame ? undefined : formData.aspectRatio,
        duration: String(dur),
        promptExtend: !!formData.promptExtend,
        watermark: !!formData.watermark,
        seed: String(seedNum)
      }
    }

    const data = await post(apiPath, body)
    const rid = data?.recordId ?? data?.data?.recordId
    if (rid) {
      router.push((modeTabToPath[modeVal] || '/home/wan/text-to-video') + '?record-id=' + encodeURIComponent(rid))
      return
    }
    const url = data?.imageUrl ?? data?.videoUrl ?? data?.outputUrl ?? (Array.isArray(data?.outputUrls) && data.outputUrls?.length ? data.outputUrls[0] : null)
    if (isWanImageMode.value) {
      result.value = url ? { imageUrl: url } : data
    } else {
      result.value = url ? { videoUrl: url } : data
    }
  } catch (err) {
    if (!err?.__fromApi) showError(err?.message || 'Generation failed')
  } finally {
    isGenerating.value = false
  }
}

function downloadResultAsset() {
  const url = displayResult.value?.videoUrl || displayResult.value?.imageUrl
  if (url) {
    const a = document.createElement('a')
    a.href = url
    a.download = displayResult.value?.imageUrl ? `wan-image-${Date.now()}.png` : `wan-video-${Date.now()}.mp4`
    a.click()
  }
}

// 勿在此 watch 内 router.replace：会与 route→mode 竞态，且在 route.path 未就绪时把全站导航劫持到 /home/wan/text-to-video。
// Tab 切换请走 goToTab（router.push）；mode 与 URL 对齐由上方 watch(route.path) 负责。
watch(mode, (m) => {
  if (m === 'video-to-video' && formData.duration === '15') formData.duration = '10'
  if (['v2-7-text-to-video', 'v2-7-image-to-video', 'v2-7-video-edit', 'v2-7-r2v'].includes(m)) {
    if (!['720p', '1080p'].includes(formData.resolution)) formData.resolution = '1080p'
    if (!['16:9', '9:16', '1:1', '4:3', '3:4'].includes(formData.aspectRatio)) formData.aspectRatio = '16:9'
    formData.durationNum = m === 'v2-7-video-edit' ? 0 : 5
    if (m === 'v2-7-video-edit') wan27EditVideoSourceDurationSec.value = 0
    formData.promptExtend = true
    formData.audioSetting = 'auto'
    formData.negativePrompt = ''
  }
  if (m === '2-7-image') {
    // 进入该 Tab 不沿用其它模式的 Resolution，默认 1K
    formData.resolution = '1K'
    formData.enableSequential = false
    formData.n = 4
    formData.thinkingMode = false
  }
  if (m === '2-7-image-pro') {
    formData.resolution = '1K'
    formData.n = 4
  }
}, { immediate: true })

watch(() => formData.enableSequential, (enabled) => {
  if (enabled) {
    if (formData.n < 1 || formData.n > 12) formData.n = 12
    formData.thinkingMode = false
    if (formData.resolution === '4K') formData.resolution = '2K'
  } else {
    if (formData.n < 1 || formData.n > 4) formData.n = 4
  }
})
</script>

<style scoped>
.wan-tool {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}
.tool-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}
.tool-avatar { width: 48px; height: 48px; border-radius: 12px; overflow: hidden; flex-shrink: 0; }
.tool-avatar img { width: 100%; height: 100%; object-fit: cover; }
.tool-details h3 { margin: 0 0 4px 0; font-size: 20px; font-weight: 600; color: #1f2937; }
.tool-details p { margin: 0; font-size: 13px; color: #6b7280; line-height: 1.5; }
.tool-details p.tool-description { line-height: 1.55; }

/* 模式选择区域：统一 mode-tabs-wrap 样式，主色 #3b82f6 */
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
  transition: all 0.2s ease;
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

/* min-width:0 避免子项（如 type=color）最小内容宽度把侧栏整体撑破布局 */
.main-content {
  display: flex;
  flex: 1;
  min-height: 0;
  min-width: 0;
  gap: 20px;
}
.config-panel {
  width: 35%;
  min-width: 0;
  flex-shrink: 1;
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.config-header { margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0; }
.config-header h4 { margin: 0; font-size: 18px; font-weight: 600; color: #1f2937; }
.config-fieldset { border: none; margin: 0; padding: 0; }
.config-form { display: flex; flex-direction: column; gap: 16px; flex: 1; overflow-y: auto; }

.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 24px; }
.form-group:last-of-type { margin-bottom: 0; }
.form-label { font-size: 14px; font-weight: 500; color: #374151; }
.required { color: #ef4444; }
.form-input, .form-select { padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; }
.form-input:focus { outline: none; border-color: #3b82f6; }
.form-hint { font-size: 12px; color: #6b7280; line-height: 1.4; }
.char-count { font-size: 12px; color: #6b7280; text-align: right; }
.select-with-arrow { position: relative; }
.select-with-arrow .form-input { width: 100%; appearance: none; padding-right: 32px; }
.select-arrow-icon { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #6b7280; }

.checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; color: #374151; }
.checkbox-label input[type="checkbox"] { width: 16px; height: 16px; accent-color: #3b82f6; }

.form-actions { margin-top: 24px; padding-bottom: 20px; }
.price-tag { font-size: 15px; opacity: 0.8; margin-left: 4px; }
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
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.tab-option:hover {
  background: rgba(59, 130, 246, 0.05);
  border-color: #3b82f6;
  color: #3b82f6;
}
.tab-option.active {
  border-color: #3b82f6;
  background: #3b82f6;
  color: white;
}
.duration-range {
  display: block;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0;
  accent-color: #3b82f6;
}
.btn-primary {
  width: 100%; padding: 16px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: #fff; border: none;
  border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
}
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59,130,246,0.3); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

.detail-ref-urls {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.detail-ref-urls-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.detail-ref-link {
  font-size: 13px;
  color: #3b82f6;
  text-decoration: none;
}
.detail-ref-link:hover {
  text-decoration: underline;
}

.result-panel {
  width: 65%;
  min-width: 0;
  flex-shrink: 1;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}
.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; text-align: center; color: #6b7280; gap: 16px; }
.empty-state h4 { margin: 0; font-size: 18px; color: #374151; }
.video-result { display: flex; flex-direction: column; gap: 16px; }
.video-player { background: #000; border-radius: 8px; overflow: hidden; }
.video-element { width: 100%; height: auto; display: block; }
.image-result { display: flex; flex-direction: column; gap: 16px; }
.image-player { background: #0f172a; border-radius: 8px; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 240px; }
.image-element { width: 100%; height: auto; display: block; object-fit: contain; }
.video-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px; color: #6b7280; }
.video-actions { display: flex; gap: 8px; }
.action-btn { background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 4px; }
.action-btn:hover { background: #e5e7eb; }

/* Color Palette：整块包在单一容器内，与周围表单项区分 */
.form-group.color-palette-group {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #f8fafc;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
}
.color-palette-group .color-palette-head .form-label {
  margin: 0;
}
.color-palette-group .color-palette-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.color-palette-meta {
  font-size: 12px;
  color: #64748b;
  background: #f1f5f9;
  padding: 4px 10px;
  border-radius: 999px;
}
.color-palette-intro {
  margin-top: 4px;
}
.color-palette-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 12px 0;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}
/* 用 grid + minmax(0,…) 避免 Chrome 在窄视口下按「内容最小宽度」把整列撑成全屏宽 */
.color-palette-row {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) minmax(0, 112px) 40px;
  gap: 10px;
  align-items: center;
  min-width: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
}
.palette-swatch-hit {
  position: relative;
  flex: 0 0 40px;
  width: 40px;
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #cbd5e1;
  flex-shrink: 0;
  align-self: center;
  box-sizing: border-box;
}
.palette-color-native {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 40px;
  height: 40px;
  max-width: 40px;
  max-height: 40px;
  margin: 0;
  padding: 0;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
  font-size: 16px;
  appearance: none;
  -webkit-appearance: none;
}
.palette-swatch {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 7px;
  pointer-events: none;
}
.palette-field {
  min-width: 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.palette-field-label {
  font-size: 11px;
  font-weight: 600;
  color: #3b82f6;
  letter-spacing: 0.02em;
}
.palette-field-label-muted {
  color: #64748b;
}
.color-palette-row .form-input {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
}
.palette-hex-input {
  min-width: 0;
}
.palette-ratio-input {
  max-width: 100%;
}
.palette-remove-btn {
  align-self: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #fecaca;
  background: #fef2f2;
  color: #dc2626;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.palette-remove-btn:hover {
  background: #fee2e2;
}
.color-palette-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 4px;
}
.action-btn-ghost {
  background: transparent;
}
.color-palette-footer {
  font-size: 12px;
  margin: 10px 0 0;
  color: #64748b;
}
.color-palette-footer--error {
  color: #dc2626;
}

/* bbox_list 可视化 */
.form-group.bbox-list-group {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #f8fafc;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
}
.bbox-list-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.bbox-list-head .form-label {
  margin: 0;
}
.bbox-list-meta {
  font-size: 12px;
  color: #64748b;
  background: #e2e8f0;
  padding: 4px 10px;
  border-radius: 999px;
}
.bbox-list-intro {
  margin-top: 4px;
}
.bbox-thumb-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 12px 0;
  min-width: 0;
}
.bbox-thumb {
  position: relative;
  width: 72px;
  height: 72px;
  padding: 0;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  flex-shrink: 0;
}
.bbox-thumb.active {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}
.bbox-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.bbox-thumb-res {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 9px;
  color: #fff;
  background: rgba(0, 0, 0, 0.65);
  padding: 2px 5px;
  border-radius: 4px;
  line-height: 1.2;
}
.bbox-thumb-count {
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 10px;
  color: #fff;
  background: rgba(37, 99, 235, 0.9);
  padding: 2px 6px;
  border-radius: 4px;
}
.bbox-boxes-panel {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px;
  min-width: 0;
}
.bbox-boxes-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.bbox-boxes-title {
  font-weight: 600;
  font-size: 14px;
  color: #1f2937;
}
.bbox-add-link {
  border: none;
  background: none;
  color: #3b82f6;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
}
.bbox-add-link:disabled {
  color: #94a3b8;
  cursor: not-allowed;
}
.bbox-empty {
  font-size: 13px;
  color: #94a3b8;
  text-align: center;
  padding: 16px 8px;
  margin: 0;
}
.bbox-card-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.bbox-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px;
  background: #f8fafc;
}
.bbox-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}
.bbox-card-actions {
  display: flex;
  gap: 6px;
}
.bbox-remove-btn {
  border-color: #fecaca !important;
  color: #b91c1c !important;
  background: #fef2f2 !important;
}
.bbox-coord-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  min-width: 0;
}
.bbox-coord {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  min-width: 0;
}
.bbox-coord .form-input {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}
.bbox-footer-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}
.bbox-clear-all-btn {
  border-color: #fecaca !important;
  color: #b91c1c !important;
  background: #fef2f2 !important;
}

/* bbox 模态（Teleport 到 body，仍受 scoped 属性限制） */
.bbox-modal-root {
  position: fixed;
  inset: 0;
  z-index: 10050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
}
.bbox-modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
}
.bbox-modal {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: min(920px, 96vw);
  max-height: min(92vh, 900px);
  overflow: auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}
.bbox-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.bbox-modal-title {
  margin: 0 0 6px 0;
  font-size: 17px;
  font-weight: 600;
  color: #0f172a;
}
.bbox-modal-hint {
  margin: 0;
  font-size: 12px;
  color: #64748b;
  line-height: 1.45;
}
.bbox-modal-close {
  border: none;
  background: #f1f5f9;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  color: #64748b;
  flex-shrink: 0;
}
.bbox-modal-close:hover {
  background: #e2e8f0;
  color: #0f172a;
}
.bbox-modal-size {
  margin: 0;
  font-size: 12px;
  color: #64748b;
  text-align: right;
}
.bbox-modal-canvas-wrap {
  background: #0f172a;
  border-radius: 10px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  max-height: min(72vh, 720px);
  min-height: 120px;
  min-width: 0;
}
.bbox-modal-canvas {
  max-width: 100%;
  height: auto;
  display: block;
  cursor: crosshair;
  vertical-align: top;
}
.bbox-modal-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 4px;
}
.bbox-modal-footer-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.bbox-modal-save {
  width: auto !important;
  padding: 10px 22px !important;
  display: inline-flex !important;
}

.wan-video-input { position: absolute; width: 0; height: 0; opacity: 0; pointer-events: none; }
.wan-video-upload { border: 2px dashed #d1d5db; border-radius: 12px; padding: 20px; text-align: center; cursor: pointer; min-height: 80px; display: flex; align-items: center; justify-content: center; }
.wan-video-upload:hover { border-color: #3b82f6; background: #f0f7ff; }
.wan-video-uploading { color: #64748b; }
.wan-video-placeholder { display: flex; flex-direction: column; align-items: center; gap: 8px; color: #64748b; }
.wan-video-upload--stack { flex-direction: column; gap: 12px; }
.wan-upload-replace-btn { align-self: center; margin: 0; }
.wan-video-preview-wrap { position: relative; width: 100%; max-width: 280px; margin: 0 auto; }
.wan-audio-preview-wrap { max-width: 360px; }
.wan-audio-preview { width: 100%; display: block; border-radius: 8px; }
.wan-video-preview { width: 100%; max-height: 160px; display: block; border-radius: 8px; }
.wan-video-remove { position: absolute; top: 6px; right: 6px; width: 28px; height: 28px; border: none; border-radius: 50%; background: rgba(0,0,0,0.6); color: #fff; cursor: pointer; font-size: 18px; line-height: 1; }
.wan-video-remove:hover { background: #dc2626; }
.wan-ref-videos-list { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; width: 100%; }
.wan-ref-video-tile { flex: 0 0 auto; width: 100%; max-width: 200px; margin: 0; }
.wan-ref-videos-actions { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 100%; }
.wan-ref-videos-hint { margin: 0; text-align: center; max-width: 420px; }

.detail-loading-state, .detail-failure-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 40px; text-align: center;
}
.detail-spinner { font-size: 48px; color: #3b82f6; }
.detail-loading-state p, .detail-failure-state p { margin: 0; font-size: 16px; color: #64748b; }
.detail-failure-state .failure-icon { font-size: 56px; color: #ef4444; }

@media (max-width: 1024px) {
  .main-content { flex-direction: column; }
  .config-panel, .result-panel { width: 100%; }
}
</style>
