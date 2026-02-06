<template>
  <div class="suno-tool">
    <!-- 工具信息头部 -->
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/suno.png" alt="Suno" />
      </div>
      <div class="tool-details">
        <h3>Suno</h3>
        <p>Where AI and Melody Unite Seamlessly! Transform text prompts into stunning AI-generated tracks, blending vocals and instruments with revolutionary realism. Newly added V5 delivers hyper-dynamic, natural performances—emotional arcs, breathing, and fluid progressions for lifelike depth. Ideal for developers crafting immersive apps: fast and scalable. Revolutionize music creation today!</p>
      </div>
    </div>

    <!-- 功能选择区域 -->
    <div class="function-selection-section">
      <div class="function-tabs">
        <div 
          v-for="func in functionOptions" 
          :key="func.id"
          class="function-tab"
          :class="{ active: formData.function === func.id }"
          @click="switchFunction(func.id)"
        >
          <div class="function-icon">
            <i :class="func.icon"></i>
          </div>
          <div class="function-info">
            <div class="function-name">{{ func.name }}</div>
            <div class="function-description">{{ func.description }}</div>
          </div>
          <div class="function-info-icon" :title="func.detailDescription">
            <i class="fas fa-info-circle"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容区域：左右布局 -->
    <div class="main-content">
      <!-- 左侧：参数配置面板 (1/3) -->
      <div class="config-panel">
        <div class="config-header">
          <h4>Music Generation Configuration</h4>
        </div>
        <form class="config-form" @submit.prevent="generateMusic">
          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">
          <!-- 模式选择（仅在音乐生成时显示） -->
          <div class="form-group" v-if="formData.function === 'generate'">
            <label class="form-label">Mode Selection *</label>
            <div class="mode-switch">
              <button 
                type="button" 
                class="mode-btn" 
                :class="{ active: !formData.customMode }"
                @click="formData.customMode = false"
              >
                <i class="fas fa-magic"></i> Simple Mode
              </button>
              <button 
                type="button" 
                class="mode-btn" 
                :class="{ active: formData.customMode }"
                @click="formData.customMode = true"
              >
                <i class="fas fa-sliders-h"></i> Custom Mode
              </button>
            </div>
            <div class="form-hint">
              {{ formData.customMode ? 'Allows detailed control of all parameters' : 'Simple mode, only basic parameters needed' }}
            </div>
          </div>

          <!-- 模型选择 -->
          <div class="form-group">
            <label for="model" class="form-label">Model Version *</label>
            <div class="select-with-arrow">
              <select id="model" v-model="formData.model" class="form-input model-select" required>
                <option value="V3_5">V3.5 - Better song structure, max 4 minutes</option>
                <option value="V4">V4 - Improved vocal quality, max 4 minutes</option>
                <option value="V4_5">V4.5 - Smarter prompts, max 8 minutes</option>
                <option value="V4_5PLUS">V4.5+ - Richer timbre, max 8 minutes</option>
                <option value="V5">V5 - Superior music expressiveness, faster generation</option>
              </select>
              <i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true"></i>
            </div>
          </div>

          <!-- 音乐延长功能特定字段 -->
          <template v-if="formData.function === 'extend'">
            <!-- 音频ID：来自 /api/records/extend-list?model=suno_generate，提交值为 taskId -->
            <div class="form-group">
              <label for="audio-id" class="form-label">
                Audio ID <span class="required">*</span>
              </label>
              <div class="select-with-arrow">
                <select
                  id="audio-id"
                  v-model="formData.audioId"
                  class="form-input"
                  required
                  :disabled="loadingExtendList"
                >
                  <option value="">Please select audio</option>
                  <option v-for="item in extendList" :key="item.taskId" :value="item.taskId">{{ item.title || item.taskId }}</option>
                </select>
                <i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true"></i>
              </div>
              <div v-if="!loadingExtendList && extendList.length === 0" class="form-hint input-hint-warn">
                Only tasks completed with Suno Music Generation can be used.
              </div>
              <div v-else class="form-hint">
                Unique identifier for the audio track to extend. All extension requests require this parameter.
              </div>
            </div>

            <!-- 参数来源选择 -->
            <div class="form-group">
              <label class="form-label">
                Parameter Source <span class="required">*</span>
              </label>
              <div class="mode-switch">
                <button 
                  type="button" 
                  class="mode-btn" 
                  :class="{ active: formData.defaultParamFlag }"
                  @click="formData.defaultParamFlag = true"
                >
                  <i class="fas fa-sliders-h"></i> Use Custom Parameters
                </button>
                <button 
                  type="button" 
                  class="mode-btn" 
                  :class="{ active: !formData.defaultParamFlag }"
                  @click="formData.defaultParamFlag = false"
                >
                  <i class="fas fa-clone"></i> Use Original Audio Parameters
                </button>
              </div>
              <div class="form-hint">
                {{ formData.defaultParamFlag ? 'Use custom parameters specified in this request' : 'Use original audio parameters' }}
              </div>
            </div>

            <!-- 延长时间点 -->
            <div class="form-group" v-if="formData.defaultParamFlag">
              <label for="continue-at" class="form-label">
                Extension Time Point (seconds) <span class="required">*</span>
              </label>
              <input 
                id="continue-at"
                v-model.number="formData.continueAt" 
                type="number" 
                class="form-input" 
                placeholder="e.g.: 60"
                min="0.01"
                step="0.01"
                required
              >
              <div class="form-hint">
                Time point (in seconds) where audio starts extending. Must be greater than 0 and less than the total duration of the generated audio.
              </div>
            </div>
          </template>

          <!-- 音频覆盖功能特定字段 -->
          <template v-if="formData.function === 'cover'">
            <!-- 音频上传 -->
            <div class="form-group">
              <label class="form-label">
                Upload Audio File <span class="required">*</span>
              </label>
              <span v-if="isUploadingCover" class="form-hint">Uploading audio...</span>
              <UploadAudio
                input-id="audio-upload"
                label="Upload audio file"
                upload-icon="fas fa-cloud-upload-alt"
                upload-text="Click to upload audio file"
                upload-hint="Supports MP3, WAV, M4A formats, max 2 minutes"
                additional-hint="Upload audio file to cover, ensure length does not exceed 2 minutes"
                theme-color="#10b981"
                :max-duration="120"
                :max-file-size="10 * 1024 * 1024"
                :multiple="false"
                @update:files="handleCoverAudioUpdate"
              />
            </div>
          </template>

          <!-- 音频扩展功能特定字段 -->
          <template v-if="formData.function === 'expand'">
            <!-- 音频上传 -->
            <div class="form-group">
              <label class="form-label">
                Upload Audio File <span class="required">*</span>
              </label>
              <span v-if="isUploadingExpand" class="form-hint">Uploading audio...</span>
              <UploadAudio
                input-id="expand-audio-upload"
                label="Upload audio file"
                upload-icon="fas fa-cloud-upload-alt"
                upload-text="Click to upload audio file"
                upload-hint="Supports MP3, WAV, M4A formats, max 2 minutes"
                additional-hint="Upload audio file to expand, ensure length does not exceed 2 minutes"
                theme-color="#10b981"
                :max-duration="120"
                :max-file-size="10 * 1024 * 1024"
                :multiple="false"
                @update:files="handleExpandAudioUpdate"
              />
            </div>

            <!-- 参数模式选择 -->
            <div class="form-group">
              <label class="checkbox-label" for="expand-default-param-flag">
                <input 
                  id="expand-default-param-flag"
                  v-model="formData.expandDefaultParamFlag" 
                  type="checkbox"
                >
                <span class="checkmark"></span>
                Use Custom Parameter Mode
              </label>
              <div class="form-hint">
                {{ formData.expandDefaultParamFlag ? 'Need to provide custom parameters like style, title, etc.' : 'Use default parameters, just upload URL' }}
              </div>
            </div>

            <!-- 扩展时间点 -->
            <div class="form-group" v-if="formData.expandDefaultParamFlag">
              <label for="expand-continue-at" class="form-label">
                Expansion Time Point (seconds) <span class="required">*</span>
              </label>
              <input 
                id="expand-continue-at"
                v-model.number="formData.expandContinueAt" 
                type="number" 
                class="form-input" 
                placeholder="e.g.: 60"
                min="0"
                step="1"
                required
              >
              <div class="form-hint">
                Specify the time point from the original audio to start the expansion
              </div>
            </div>
          </template>

          <!-- 伴奏生成功能特定字段 -->
          <template v-if="formData.function === 'accompaniment'">
            <!-- 源音频上传 -->
            <div class="form-group">
              <label class="form-label">
                Source Audio File <span class="required">*</span>
              </label>
              <span v-if="isUploadingAccompaniment" class="form-hint">Uploading audio...</span>
              <UploadAudio
                input-id="accompaniment-audio-upload"
                label="Source audio file"
                upload-icon="fas fa-cloud-upload-alt"
                upload-text="Click to upload audio file"
                upload-hint="Supports MP3, WAV, M4A formats, max 10MB"
                additional-hint="Specify the source audio file to add accompaniment to"
                theme-color="#10b981"
                :max-file-size="10 * 1024 * 1024"
                :multiple="false"
                @update:files="handleAccompanimentAudioUpdate"
              />
            </div>

            <!-- 音乐标题 -->
            <div class="form-group">
              <label for="accompaniment-title" class="form-label">
                Music Title <span class="required">*</span>
              </label>
              <input 
                id="accompaniment-title"
                v-model="formData.accompanimentTitle" 
                type="text" 
                class="form-input" 
                placeholder="e.g.: Relaxing Piano"
                maxlength="100"
                required
              >
              <div class="form-hint">
                Title of the generated music, will be displayed in the player interface and filename
              </div>
            </div>

            <!-- 包含标签 -->
            <div class="form-group">
              <label for="accompaniment-tags" class="form-label">
                Include Tags <span class="required">*</span>
              </label>
              <input 
                id="accompaniment-tags"
                v-model="formData.accompanimentTags" 
                type="text" 
                class="form-input" 
                placeholder="e.g.: relaxed, piano, soothing"
                maxlength="500"
                required
              >
              <div class="form-hint">
                Music styles or tags you want to include in the generated music, defines the desired music style and characteristics
              </div>
            </div>

            <!-- 排除标签 -->
            <div class="form-group">
              <label for="accompaniment-negative-tags" class="form-label">
                Exclude Tags <span class="required">*</span>
              </label>
              <input 
                id="accompaniment-negative-tags"
                v-model="formData.accompanimentNegativeTags" 
                type="text" 
                class="form-input" 
                placeholder="e.g.: heavy metal, fast drums"
                maxlength="500"
                required
              >
              <div class="form-hint">
                Music styles or characteristics to exclude from generated audio, used to avoid specific unwanted music elements
              </div>
            </div>
          </template>

          <!-- 人声生成功能特定字段 -->
          <template v-if="formData.function === 'vocal'">
            <!-- 源音频上传 -->
            <div class="form-group">
              <label for="vocal-audio-upload" class="form-label">
                Source Audio File <span class="required">*</span>
              </label>
              <span v-if="isUploadingVocal" class="form-hint">Uploading audio...</span>
              <UploadAudio
                input-id="vocal-audio-upload"
                label="Source audio file"
                upload-icon="fas fa-cloud-upload-alt"
                upload-text="Click to upload audio file"
                upload-hint="Supports MP3, WAV, M4A formats, max 10MB"
                additional-hint="Specify the source audio file to add vocals to"
                theme-color="#10b981"
                :max-file-size="10 * 1024 * 1024"
                :multiple="false"
                @update:files="handleVocalAudioUpdate"
              />
              <div class="form-hint">
                Specify the source audio file to add vocals to
              </div>
            </div>

            <!-- 音乐标题 -->
            <div class="form-group">
              <label for="vocal-title" class="form-label">
                Music Title <span class="required">*</span>
              </label>
              <input 
                id="vocal-title"
                v-model="formData.vocalTitle" 
                type="text" 
                class="form-input" 
                placeholder="e.g.: Relaxing Piano"
                maxlength="100"
                required
              >
              <div class="form-hint">
                Title of the music, will be displayed in the player interface and filename
              </div>
            </div>

            <!-- 音乐风格 -->
            <div class="form-group">
              <label for="vocal-style" class="form-label">
                Music Style <span class="required">*</span>
              </label>
              <input 
                id="vocal-style"
                v-model="formData.vocalStyle" 
                type="text" 
                class="form-input" 
                placeholder="e.g.: Jazz"
                maxlength="200"
                required
              >
              <div class="form-hint">
                Style of the music, such as jazz, electronic, classical music genres
              </div>
            </div>

            <!-- 排除标签 -->
            <div class="form-group">
              <label for="vocal-negative-tags" class="form-label">
                Exclude Tags <span class="required">*</span>
              </label>
              <input 
                id="vocal-negative-tags"
                v-model="formData.vocalNegativeTags" 
                type="text" 
                class="form-input" 
                placeholder="e.g.: heavy metal, strong drums"
                maxlength="500"
                required
              >
              <div class="form-hint">
                Music styles to exclude, used to avoid specific styles or elements in generated music
              </div>
            </div>
          </template>

          <!-- 提示词输入 -->
          <div class="form-group" v-if="formData.function !== 'extend' || formData.defaultParamFlag">
            <label for="prompt" class="form-label">
              Prompt <span class="required" v-if="isPromptRequired">*</span>
            </label>
            <textarea 
              id="prompt"
              v-model="formData.prompt" 
              class="form-input" 
              rows="4" 
              :placeholder="getPromptPlaceholder()"
              :maxlength="getPromptMaxLength()"
              :required="isPromptRequired"
            ></textarea>
            <div class="form-hint">
              {{ getPromptHint() }}
            </div>
            <div class="char-count">
              {{ formData.prompt.length }}/{{ getPromptMaxLength() }}
            </div>
          </div>

          <!-- 自定义模式下的额外字段 -->
          <template v-if="formData.customMode || (formData.function === 'extend' && formData.defaultParamFlag) || formData.function === 'cover' || (formData.function === 'expand' && formData.expandDefaultParamFlag) || formData.function === 'accompaniment' || formData.function === 'vocal'">
            <!-- 纯音乐选择 (仅在非extend功能时显示) -->
            <div class="form-group" v-if="formData.function !== 'extend'">
              <label class="checkbox-label" for="instrumental">
                <input 
                  id="instrumental"
                  v-model="formData.instrumental" 
                  type="checkbox"
                >
                <span class="checkmark"></span>
                Instrumental (No Lyrics)
              </label>
              <div class="form-hint">
                If instrumental is selected, only style and title are needed
              </div>
            </div>

            <!-- 音乐风格 -->
            <div class="form-group">
              <label for="style" class="form-label">
                Music Style <span class="required">*</span>
              </label>
              <input 
                id="style"
                v-model="formData.style" 
                type="text" 
                class="form-input" 
                placeholder="e.g.: classical, jazz, electronic, pop, rock"
                :maxlength="formData.function === 'extend' ? 200 : getStyleMaxLength()"
                required
              >
              <div class="form-hint">
                {{ formData.function === 'extend' ? 'Music style specification for extended audio. Usually should match the original audio style for best results. Max 200 characters.' : 'Defines genre, mood, or artistic direction' }}
              </div>
            </div>

            <!-- 标题 -->
            <div class="form-group">
              <label for="title" class="form-label">
                Music Title <span class="required">*</span>
              </label>
              <input 
                id="title"
                v-model="formData.title" 
                type="text" 
                class="form-input" 
                placeholder="e.g.: Peaceful Piano Meditation"
                :maxlength="formData.function === 'extend' ? 80 : 80"
                required
              >
              <div class="form-hint">
                {{ formData.function === 'extend' ? 'Title of the extended music track. Will be displayed in the player interface and filename. Max 80 characters.' : 'Will be displayed in the player interface and filename' }}
              </div>
            </div>

            <!-- 人声性别（仅在非纯音乐时显示，且非extend功能或extend且defaultParamFlag为true时） -->
            <div class="form-group" v-if="(formData.function !== 'extend' && !formData.instrumental) || (formData.function === 'extend' && formData.defaultParamFlag)">
              <label for="vocal-gender" class="form-label">Vocal Gender</label>
              <div class="select-with-arrow">
                <select id="vocal-gender" v-model="formData.vocalGender" class="form-input">
                  <option value="">Not specified</option>
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                </select>
                <i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true"></i>
              </div>
              <div class="form-hint">
                Vocal gender preference. Optional. 'm' for male, 'f' for female. According to practice, this parameter can only strengthen probability but cannot guarantee compliance.
              </div>
            </div>

            <!-- 排除标签 -->
            <div class="form-group">
              <label for="negative-tags" class="form-label">Exclude Tags</label>
              <input 
                id="negative-tags"
                v-model="formData.negativeTags" 
                type="text" 
                class="form-input" 
                placeholder="e.g.: heavy metal, fast drums"
              >
              <div class="form-hint">
                {{ formData.function === 'extend' ? 'Music styles or characteristics to exclude from extended audio. Optional. Used to avoid specific unwanted features.' : 'Music styles or characteristics to exclude from generated audio' }}
              </div>
            </div>

            <!-- 风格权重 (仅在extend且defaultParamFlag为true或其他功能时显示) -->
            <div class="form-group" v-if="formData.function === 'extend' ? formData.defaultParamFlag : true">
              <label for="style-weight" class="form-label">
                Style Weight ({{ formData.styleWeight.toFixed(2) }})
              </label>
              <input 
                id="style-weight"
                v-model.number="formData.styleWeight" 
                type="range" 
                min="0" 
                max="1" 
                step="0.01"
                class="form-slider"
              >
              <div class="slider-labels">
                <span>Loose (0)</span>
                <span>Strict (1)</span>
              </div>
              <div class="form-hint" v-if="formData.function === 'extend'">
                Intensity of adherence to specified style. Optional. Range 0-1, rounded to 2 decimal places.
              </div>
            </div>

            <!-- 创意约束 (仅在extend且defaultParamFlag为true或其他功能时显示) -->
            <div class="form-group" v-if="formData.function === 'extend' ? formData.defaultParamFlag : true">
              <label for="weirdness-constraint" class="form-label">
                Creative Constraint ({{ formData.weirdnessConstraint.toFixed(2) }})
              </label>
              <input 
                id="weirdness-constraint"
                v-model.number="formData.weirdnessConstraint" 
                type="range" 
                min="0" 
                max="1" 
                step="0.01"
                class="form-slider"
              >
              <div class="slider-labels">
                <span>Conservative (0)</span>
                <span>Experimental (1)</span>
              </div>
              <div class="form-hint" v-if="formData.function === 'extend'">
                Controls experimental/creative deviation. Optional. Range 0-1, rounded to 2 decimal places.
              </div>
            </div>

            <!-- 音频权重 (仅在extend且defaultParamFlag为true或其他功能时显示) -->
            <div class="form-group" v-if="formData.function === 'extend' ? formData.defaultParamFlag : true">
              <label for="audio-weight" class="form-label">
                Audio Weight ({{ formData.audioWeight.toFixed(2) }})
              </label>
              <input 
                id="audio-weight"
                v-model.number="formData.audioWeight" 
                type="range" 
                min="0" 
                max="1" 
                step="0.01"
                class="form-slider"
              >
              <div class="slider-labels">
                <span>Low Weight (0)</span>
                <span>High Weight (1)</span>
              </div>
              <div class="form-hint" v-if="formData.function === 'extend'">
                Relative weight of audio elements. Optional. Range 0-1, rounded to 2 decimal places.
              </div>
            </div>
          </template>

          <!-- 生成按钮 -->
          <button type="submit" class="generate-btn" :disabled="!canGenerate || isGenerating">
            <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
            <i v-else :class="getButtonIcon()"></i> 
            {{ isGenerating ? 'Generating...' : getButtonText() }}{{ sunoPriceText }}
          </button>
          </fieldset>
        </form>
      </div>

      <!-- 右侧：结果展示区域 (2/3) -->
      <div class="result-panel">
        <div class="result-header">
          <h4>Generation Result</h4>
          <div class="result-actions" v-if="!isDetailView && displayResult">
            <button class="action-btn" @click="downloadResult" title="Download">
              <i class="fas fa-download"></i>
            </button>
            <button class="action-btn" @click="shareResult" title="Share">
              <i class="fas fa-share"></i>
            </button>
          </div>
        </div>

        <div class="result-content">
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
          <!-- 空状态（非详情页且无结果） -->
          <div v-else-if="!displayResult" class="empty-state">
            <i class="fas fa-music"></i>
            <p>No music generated yet</p>
            <span>Configure parameters and click "Generate Music" to start creating</span>
          </div>

          <!-- 结果展示（含详情页 status 2） -->
          <div v-else class="music-result">
            <div class="music-player">
              <div class="music-info">
                <h5>{{ displayResult.title || 'Generated Music' }}</h5>
                <p>{{ displayResult.style || 'Unknown Style' }}</p>
                <div class="music-meta">
                  <span><i class="fas fa-clock"></i> {{ displayResult.duration || 'Unknown Duration' }}</span>
                  <span><i class="fas fa-user"></i> {{ displayResult.model || 'Suno' }}</span>
                </div>
              </div>
              <div class="player-controls">
                <button class="play-btn" @click="togglePlay">
                  <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
                </button>
                <div class="progress-bar">
                  <div class="progress" :style="{ width: progress + '%' }"></div>
                </div>
                <span class="time">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
              </div>
            </div>
            
            <audio 
              ref="audioPlayer"
              :src="displayResult.audioUrl" 
              @timeupdate="updateProgress"
              @loadedmetadata="setDuration"
              @ended="onAudioEnded"
            ></audio>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用提示 -->
    <div class="usage-tips">
      <div class="tip-item">
        <span class="tip-icon">🎵</span>
        <span>Music Generation: Create new music; Music Extension: Extend existing audio; Audio Cover: Recreate audio; Audio Expansion: Expand on uploaded audio; Accompaniment: Generate accompaniment; Vocal Generation: Generate vocals for audio</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🎼</span>
        <span>Simple mode is suitable for quick generation, custom mode provides more control options</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🎹</span>
        <span>Extend function requires selecting audio, cover and expand functions require uploading audio files (max 2 minutes), accompaniment and vocal generation require uploading source audio files</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">⚡</span>
        <span>V5 model has faster generation speed and better music expressiveness</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🎯</span>
        <span>Vocal generation guides vocal content and style through prompts, supports music style and exclude tags control</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import UploadAudio from './common/UploadAudio.vue'
import { useAuth } from '~/composables/useAuth'
import { useToast } from '~/composables/useToast'
import { useApi } from '~/composables/useApi'
import { useModelPrice } from '~/composables/useModelPrice'
import { useRecordPolling } from '~/composables/useRecordPolling'

const router = useRouter()
const route = useRoute()
const { token } = useAuth()
const { showError } = useToast()
const { post, get } = useApi()
const { fetchPrices, getPrice, formatCredits } = useModelPrice()
const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling()

onMounted(() => { fetchPrices() })

// 功能与价格 key 对应：Music Extension→suno_extend, Audio Expansion→suno_upload_extend, Vocal Generation→suno_add_vocals, Audio Cover→suno_upload_cover, Music Generation→suno_generate, Accompaniment→suno_add_instrumental
const SUNO_MODEL_KEY = {
  generate: 'suno_generate',
  extend: 'suno_extend',
  expand: 'suno_upload_extend',
  vocal: 'suno_add_vocals',
  cover: 'suno_upload_cover',
  accompaniment: 'suno_add_instrumental'
}
const sunoPriceText = computed(() => {
  const key = SUNO_MODEL_KEY[formData.function]
  if (!key) return ''
  const credits = getPrice(key)
  const str = formatCredits(credits)
  return str ? ` (${str})` : ''
})

const getAuthToken = () => {
  if (!process.client) return null
  try {
    if (token?.value) return token.value
    return localStorage.getItem('auth_token')
  } catch {
    return localStorage.getItem('auth_token')
  }
}

const uploadAudioToUrl = async (file) => {
  if (!file) return ''
  const formDataUpload = new FormData()
  formDataUpload.append('file', file)
  const headers = { Accept: 'application/json' }
  const authToken = getAuthToken()
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`
  const response = await fetch('/api/common/batch-upload', {
    method: 'POST',
    headers,
    body: formDataUpload,
    credentials: 'include'
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const msg = (typeof errorData?.errorMessage === 'string' && errorData.errorMessage.trim())
      ? errorData.errorMessage.trim()
      : (typeof errorData?.message === 'string' && errorData.message.trim())
        ? errorData.message.trim()
        : (errorData?.userTip || errorData?.error || errorData?.message || 'Upload failed')
    throw new Error(msg)
  }
  const data = await response.json()
  const urls = data?.data?.urls || data?.fileUrls || (Array.isArray(data?.data) ? data.data : [])
  if (!Array.isArray(urls) || !urls[0]) throw new Error('Invalid response: file URL not found')
  return urls[0]
}

// 表单数据
const formData = reactive({
  function: 'generate', // 'generate', 'extend', 'cover', 'expand', 'accompaniment' 或 'vocal'
  prompt: '',
  customMode: false,
  instrumental: true,
  model: 'V5',
  style: '',
  title: '',
  negativeTags: '',
  vocalGender: 'm',
  styleWeight: 0.65,
  weirdnessConstraint: 0.65,
  audioWeight: 0.65,
  // 音乐延长相关字段
  audioId: '',
  defaultParamFlag: true,
  continueAt: 60,
  // 音频覆盖相关字段
  uploadedFile: null,
  // 音频扩展相关字段
  expandDefaultParamFlag: true,
  expandContinueAt: 60,
  expandUploadedFile: null,
  // 伴奏生成相关字段
  accompanimentTitle: '',
  accompanimentTags: '',
  accompanimentNegativeTags: '',
  // 人声生成相关字段
  vocalTitle: '',
  vocalStyle: '',
  vocalNegativeTags: ''
})

// Music Extension：Audio ID 从 extend-list 拉取（model=suno_generate），提交值为 taskId
const EXTEND_LIST_MODEL = 'suno_generate'
const extendList = ref([])
const loadingExtendList = ref(false)
const fetchExtendList = async () => {
  loadingExtendList.value = true
  try {
    const data = await get(`/api/records/extend-list?model=${encodeURIComponent(EXTEND_LIST_MODEL)}`)
    extendList.value = Array.isArray(data) ? data : []
  } catch {
    extendList.value = []
  } finally {
    loadingExtendList.value = false
  }
}
// 监听路由变化，同步功能选择状态；仅当路由为 extend 时拉取 extend-list，避免与 switchFunction 重复触发两次请求
watch(() => route.path, (newPath) => {
  const routeToFunctionMap = {
    '/home/suno': 'generate',
    '/home/suno/extend': 'extend',
    '/home/suno/cover': 'cover',
    '/home/suno/expand': 'expand',
    '/home/suno/accompaniment': 'accompaniment',
    '/home/suno/vocal': 'vocal'
  }
  const functionId = routeToFunctionMap[newPath]
  if (functionId) {
    formData.function = functionId
    if (functionId === 'extend') fetchExtendList()
  }
}, { immediate: true })

// 详情页：仅从 URL 读取 record-id
const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)
const loadingRecordId = ref(null)

const detailResult = computed(() => {
  if (!detailData.value || detailData.value.status !== 2 || !Array.isArray(detailData.value.outputUrls) || !detailData.value.outputUrls[0]) return null
  const od = detailData.value.originalData || {}
  return {
    audioUrl: typeof detailData.value.outputUrls[0] === 'string' ? detailData.value.outputUrls[0] : detailData.value.outputUrls[0]?.url,
    title: od.title || 'Generated Music',
    style: od.style || '',
    model: od.model || formData.model,
    duration: detailData.value.duration
  }
})

const displayResult = computed(() => {
  if (isDetailView.value && detailData.value?.status === 2 && detailResult.value) return detailResult.value
  return result.value
})

function fillFormFromOriginalData(originalData) {
  if (!originalData || typeof originalData !== 'object') return
  const o = originalData
  const keys = ['prompt', 'customMode', 'instrumental', 'model', 'style', 'title', 'negativeTags', 'vocalGender', 'audioId', 'defaultParamFlag', 'continueAt', 'expandDefaultParamFlag', 'expandContinueAt', 'accompanimentTitle', 'accompanimentTags', 'accompanimentNegativeTags', 'vocalTitle', 'vocalStyle', 'vocalNegativeTags']
  keys.forEach(k => { if (o[k] !== undefined) formData[k] = o[k] })
  if (o.function) formData.function = o.function
  if (o.styleWeight != null) formData.styleWeight = Number(o.styleWeight) ?? 0.65
  if (o.weirdnessConstraint != null) formData.weirdnessConstraint = Number(o.weirdnessConstraint) ?? 0.65
  if (o.audioWeight != null) formData.audioWeight = Number(o.audioWeight) ?? 0.65
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
      pollRecordByStatus(recordId, { getIsCancelled: () => getRouteRecordId() !== recordId }).then((resultData) => {
        if (getRouteRecordId() !== recordId) return
        detailData.value = resultData
        if (resultData?.originalData) fillFormFromOriginalData(resultData.originalData)
      }).catch(() => {})
    }
  } catch (e) {
    console.error('Load record detail failed:', e)
  } finally {
    if (loadingRecordId.value === recordId) loadingRecordId.value = null
  }
}

watch(() => route.query['record-id'], (recordId) => {
  if (recordId) loadDetailByRecordId(recordId)
  else { loadingRecordId.value = null; detailData.value = null }
}, { immediate: true })

// 功能选项
const functionOptions = ref([
  {
    id: 'generate',
    name: 'Music Generation',
    description: 'Create new music',
    detailDescription: 'Generate complete music works from scratch, supports custom mode and simple mode, can control music style, lyrics content and other parameters',
    icon: 'fas fa-music'
  },
  {
    id: 'extend',
    name: 'Music Extension',
    description: 'Extend existing music',
    detailDescription: 'Extend based on selected audio, supports custom parameter mode, can control the music style and content of the extended part',
    icon: 'fas fa-expand-arrows-alt'
  },
  {
    id: 'cover',
    name: 'Audio Cover',
    description: 'Recreate audio',
    detailDescription: 'Upload audio file for recreation, supports custom mode, can control music style, lyrics content and other parameters',
    icon: 'fas fa-microphone'
  },
  {
    id: 'expand',
    name: 'Audio Expansion',
    description: 'Expand on uploaded audio',
    detailDescription: 'Upload audio file for expansion, supports custom parameter mode, can control the music style and content of the expanded part',
    icon: 'fas fa-compress-arrows-alt'
  },
  {
    id: 'accompaniment',
    name: 'Accompaniment',
    description: 'Generate accompaniment',
    detailDescription: 'Add background accompaniment to existing audio, control music style through include and exclude tags, no prompt needed',
    icon: 'fas fa-guitar'
  },
  {
    id: 'vocal',
    name: 'Vocal Generation',
    description: 'Generate vocals for audio',
    detailDescription: 'Add vocal singing to existing audio, guide singing content and style through prompts, supports music style and exclude tags control',
    icon: 'fas fa-user'
  }
])

// 切换功能
const switchFunction = (functionId) => {
  formData.function = functionId
  // 路由跳转
  const functionRouteMap = {
    'generate': '/home/suno',
    'extend': '/home/suno/extend',
    'cover': '/home/suno/cover',
    'expand': '/home/suno/expand',
    'accompaniment': '/home/suno/accompaniment',
    'vocal': '/home/suno/vocal'
  }
  
  const route = functionRouteMap[functionId]
  if (route) {
    router.push(route)
  }
}


// 上传文件相关（File 用于展示，fileUrl 用于 API）
const uploadedFile = ref(null)
const expandUploadedFile = ref(null)
const accompanimentUploadedFile = ref(null)
const vocalUploadedFile = ref(null)
const coverFileUrl = ref('')
const expandFileUrl = ref('')
const accompanimentFileUrl = ref('')
const vocalFileUrl = ref('')
const isUploadingCover = ref(false)
const isUploadingExpand = ref(false)
const isUploadingAccompaniment = ref(false)
const isUploadingVocal = ref(false)

// 结果数据
const result = ref(null)
const isGenerating = ref(false)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)
const audioPlayer = ref(null)

// 计算属性
const isPromptRequired = computed(() => {
  if (formData.function === 'extend') {
    return formData.defaultParamFlag
  }
  if (formData.function === 'cover') {
    return !formData.instrumental
  }
  if (formData.function === 'expand') {
    return formData.expandDefaultParamFlag && !formData.instrumental
  }
  if (formData.function === 'accompaniment') {
    return false // 伴奏生成不需要提示词
  }
  if (formData.function === 'vocal') {
    return true // 人声生成需要提示词
  }
  return true
})

const canGenerate = computed(() => {
  if (formData.function === 'extend') {
    // audioId is always required
    if (!formData.audioId.trim()) {
      return false
    }
    // If defaultParamFlag is true, require continueAt, prompt, style, and title
    if (formData.defaultParamFlag) {
      if (!formData.prompt.trim() || !formData.style.trim() || !formData.title.trim()) {
        return false
      }
      if (formData.continueAt <= 0) {
        return false
      }
    }
    // If defaultParamFlag is false, only audioId is needed (already checked above)
  } else if (formData.function === 'cover') {
    if (!coverFileUrl.value) return false
    if (!formData.style.trim() || !formData.title.trim()) return false
    if (!formData.instrumental && !formData.prompt.trim()) return false
  } else if (formData.function === 'expand') {
    if (!expandFileUrl.value) return false
    if (formData.expandDefaultParamFlag) {
      if (!formData.style.trim() || !formData.title.trim()) return false
      if (!formData.instrumental && !formData.prompt.trim()) return false
      if (formData.expandContinueAt <= 0) return false
    }
  } else if (formData.function === 'accompaniment') {
    if (!accompanimentFileUrl.value ||
        !formData.accompanimentTitle.trim() ||
        !formData.accompanimentTags.trim() ||
        !formData.accompanimentNegativeTags.trim()) return false
  } else if (formData.function === 'vocal') {
    if (!vocalFileUrl.value ||
        !formData.vocalTitle.trim() ||
        !formData.vocalStyle.trim() ||
        !formData.vocalNegativeTags.trim() ||
        !formData.prompt.trim()) return false
  } else {
    // 音乐生成模式
    if (!formData.prompt.trim()) {
      return false
    }
    
    if (formData.customMode) {
      if (!formData.style.trim() || !formData.title.trim()) {
        return false
      }
      if (!formData.instrumental && !formData.prompt.trim()) {
        return false
      }
    }
  }
  
  return true
})

// 方法
const getFunctionDescription = () => {
  const descriptions = {
    'generate': 'Create new music',
    'extend': 'Extend existing music',
    'cover': 'Recreate audio',
    'expand': 'Expand on uploaded audio files',
    'accompaniment': 'Generate accompaniment',
    'vocal': 'Generate vocals for audio'
  }
  return descriptions[formData.function] || ''
}

const getPromptPlaceholder = () => {
  if (formData.function === 'extend') {
    return ''
  }
  
  if (formData.function === 'cover') {
    return ''
  }
  
  if (formData.function === 'expand') {
    return ''
  }
  
  if (formData.function === 'accompaniment') {
    return ''
  }
  
  if (formData.function === 'vocal') {
    return ''
  }
  
  if (formData.customMode) {
    return ''
  }
  return ''
}

const getPromptMaxLength = () => {
  if (formData.function === 'extend') {
    return 3000
  }
  
  if (formData.function === 'cover') {
    const limits = {
      'V3_5': 3000,
      'V4': 3000,
      'V4_5': 5000,
      'V4_5PLUS': 5000,
      'V5': 5000
    }
    return limits[formData.model]
  }
  
  if (formData.function === 'expand') {
    const limits = {
      'V3_5': 3000,
      'V4': 3000,
      'V4_5': 5000,
      'V4_5PLUS': 5000,
      'V5': 5000
    }
    return limits[formData.model]
  }
  
  if (formData.function === 'accompaniment') {
    return 0 // 伴奏生成不需要提示词
  }
  
  if (formData.function === 'vocal') {
    return 5000 // 人声生成提示词限制
  }
  
  const limits = {
    'V3_5': 3000,
    'V4': 3000,
    'V4_5': 5000,
    'V4_5PLUS': 5000,
    'V5': 5000
  }
  return formData.customMode ? limits[formData.model] : 500
}

const getPromptHint = () => {
  if (formData.function === 'extend') {
    return 'Describe how the music should continue or change in the extended part. Max 3000 characters.'
  }
  
  if (formData.function === 'cover') {
    return formData.instrumental 
      ? 'Describe the desired audio content to generate, max ' + getPromptMaxLength() + ' characters'
      : 'Enter lyrics content, max ' + getPromptMaxLength() + ' characters'
  }
  
  if (formData.function === 'expand') {
    return formData.instrumental 
      ? 'Describe how the music should expand, max ' + getPromptMaxLength() + ' characters'
      : 'Enter lyrics content, max ' + getPromptMaxLength() + ' characters'
  }
  
  if (formData.function === 'accompaniment') {
    return 'Accompaniment generation does not require prompts, control music style through include and exclude tags'
  }
  
  if (formData.function === 'vocal') {
    return 'Text describing audio content, used to guide vocal singing content and style, max 5000 characters'
  }
  
  if (formData.customMode) {
    return formData.instrumental 
      ? 'Describe music style and mood, max ' + getPromptMaxLength() + ' characters'
      : 'Enter lyrics content, max ' + getPromptMaxLength() + ' characters'
  }
  return 'As the core creativity, lyrics will be automatically generated based on it, max 500 characters'
}

const getStyleMaxLength = () => {
  const limits = {
    'V3_5': 200,
    'V4': 200,
    'V4_5': 1000,
    'V4_5PLUS': 1000,
    'V5': 1000
  }
  return limits[formData.model]
}

const handleCoverAudioUpdate = async (files) => {
  if (!files || (Array.isArray(files) && files.length === 0)) {
    coverFileUrl.value = ''
    return
  }
  const file = Array.isArray(files) ? files[0] : files
  uploadedFile.value = file
  isUploadingCover.value = true
  try {
    coverFileUrl.value = await uploadAudioToUrl(file)
  } catch (e) {
    showError(e.message || 'Failed to upload audio')
    coverFileUrl.value = ''
    uploadedFile.value = null
  } finally {
    isUploadingCover.value = false
  }
}

const handleExpandAudioUpdate = async (files) => {
  if (!files || (Array.isArray(files) && files.length === 0)) {
    expandFileUrl.value = ''
    return
  }
  const file = Array.isArray(files) ? files[0] : files
  expandUploadedFile.value = file
  isUploadingExpand.value = true
  try {
    expandFileUrl.value = await uploadAudioToUrl(file)
  } catch (e) {
    showError(e.message || 'Failed to upload audio')
    expandFileUrl.value = ''
    expandUploadedFile.value = null
  } finally {
    isUploadingExpand.value = false
  }
}

const handleAccompanimentAudioUpdate = async (files) => {
  if (!files || (Array.isArray(files) && files.length === 0)) {
    accompanimentFileUrl.value = ''
    return
  }
  const file = Array.isArray(files) ? files[0] : files
  accompanimentUploadedFile.value = file
  isUploadingAccompaniment.value = true
  try {
    accompanimentFileUrl.value = await uploadAudioToUrl(file)
  } catch (e) {
    showError(e.message || 'Failed to upload audio')
    accompanimentFileUrl.value = ''
    accompanimentUploadedFile.value = null
  } finally {
    isUploadingAccompaniment.value = false
  }
}

const handleVocalAudioUpdate = async (files) => {
  if (!files || (Array.isArray(files) && files.length === 0)) {
    vocalFileUrl.value = ''
    return
  }
  const file = Array.isArray(files) ? files[0] : files
  vocalUploadedFile.value = file
  isUploadingVocal.value = true
  try {
    vocalFileUrl.value = await uploadAudioToUrl(file)
  } catch (e) {
    showError(e.message || 'Failed to upload audio')
    vocalFileUrl.value = ''
    vocalUploadedFile.value = null
  } finally {
    isUploadingVocal.value = false
  }
}

const toNum = (v) => (v != null && v !== '') ? Number(v) : undefined
const clamp01 = (v) => v == null ? undefined : Math.min(1, Math.max(0, Number(v)))

const resolveAudioUrl = (data) => data?.audioUrl ?? data?.data?.audioUrl ?? data?.outputUrls?.[0] ?? (Array.isArray(data?.outputUrls) && data.outputUrls[0] ? data.outputUrls[0] : null)

const generateMusic = async () => {
  isGenerating.value = true
  try {
    if (formData.function === 'generate') {
      const body = {
        prompt: formData.prompt.trim(),
        customMode: !!formData.customMode,
        instrumental: !!formData.instrumental,
        model: formData.model,
        style: formData.style?.trim() || undefined,
        title: formData.title?.trim() || undefined,
        negativeTags: formData.negativeTags?.trim() || undefined,
        vocalGender: formData.vocalGender || undefined,
        styleWeight: clamp01(formData.styleWeight),
        weirdnessConstraint: clamp01(formData.weirdnessConstraint),
        audioWeight: clamp01(formData.audioWeight)
      }
      const data = await post('/api/audio/suno/generate', body)
      const rid = data?.recordId ?? data?.data?.recordId
      if (rid) { router.push(route.path + '?record-id=' + encodeURIComponent(rid)); return }
      const audioUrl = resolveAudioUrl(data)
      result.value = { title: formData.title || getDefaultTitle(), style: formData.style, model: formData.model, audioUrl, duration: data?.duration, function: 'generate' }
    } else if (formData.function === 'extend') {
      const body = {
        defaultParamFlag: !!formData.defaultParamFlag,
        audioId: formData.audioId.trim(),
        model: formData.model,
        prompt: formData.prompt?.trim() || undefined,
        style: formData.style?.trim() || undefined,
        title: formData.title?.trim() || undefined,
        continueAt: formData.continueAt > 0 ? formData.continueAt : undefined,
        negativeTags: formData.negativeTags?.trim() || undefined,
        vocalGender: formData.vocalGender || undefined,
        styleWeight: clamp01(formData.styleWeight),
        weirdnessConstraint: clamp01(formData.weirdnessConstraint),
        audioWeight: clamp01(formData.audioWeight)
      }
      const data = await post('/api/audio/suno/extend', body)
      const rid = data?.recordId ?? data?.data?.recordId
      if (rid) { router.push(route.path + '?record-id=' + encodeURIComponent(rid)); return }
      const audioUrl = resolveAudioUrl(data)
      result.value = { title: formData.title || getDefaultTitle(), style: formData.style, model: formData.model, audioUrl, duration: data?.duration, function: 'extend' }
    } else if (formData.function === 'cover') {
      const body = {
        fileUrl: coverFileUrl.value,
        customMode: !!formData.customMode,
        instrumental: !!formData.instrumental,
        model: formData.model,
        prompt: formData.prompt?.trim() || undefined,
        style: formData.style?.trim() || undefined,
        title: formData.title?.trim() || undefined,
        negativeTags: formData.negativeTags?.trim() || undefined,
        vocalGender: formData.vocalGender || undefined,
        styleWeight: clamp01(formData.styleWeight),
        weirdnessConstraint: clamp01(formData.weirdnessConstraint),
        audioWeight: clamp01(formData.audioWeight)
      }
      const data = await post('/api/audio/suno/upload-cover', body)
      const rid = data?.recordId ?? data?.data?.recordId
      if (rid) { router.push(route.path + '?record-id=' + encodeURIComponent(rid)); return }
      const audioUrl = resolveAudioUrl(data)
      result.value = { title: formData.title || getDefaultTitle(), style: formData.style, model: formData.model, audioUrl, duration: data?.duration, function: 'cover' }
    } else if (formData.function === 'expand') {
      const body = {
        fileUrl: expandFileUrl.value,
        defaultParamFlag: !!formData.expandDefaultParamFlag,
        model: formData.model,
        instrumental: formData.instrumental,
        prompt: formData.prompt?.trim() || undefined,
        style: formData.style?.trim() || undefined,
        title: formData.title?.trim() || undefined,
        continueAt: formData.expandContinueAt > 0 ? formData.expandContinueAt : undefined,
        negativeTags: formData.negativeTags?.trim() || undefined,
        vocalGender: formData.vocalGender || undefined,
        styleWeight: clamp01(formData.styleWeight),
        weirdnessConstraint: clamp01(formData.weirdnessConstraint),
        audioWeight: clamp01(formData.audioWeight)
      }
      const data = await post('/api/audio/suno/upload-extend', body)
      const rid = data?.recordId ?? data?.data?.recordId
      if (rid) { router.push(route.path + '?record-id=' + encodeURIComponent(rid)); return }
      const audioUrl = resolveAudioUrl(data)
      result.value = { title: formData.title || getDefaultTitle(), style: formData.style, model: formData.model, audioUrl, duration: data?.duration, function: 'expand' }
    } else if (formData.function === 'accompaniment') {
      const body = {
        fileUrl: accompanimentFileUrl.value,
        title: formData.accompanimentTitle.trim(),
        negativeTags: formData.accompanimentNegativeTags.trim(),
        tags: formData.accompanimentTags.trim(),
        model: formData.model,
        vocalGender: formData.vocalGender || undefined,
        styleWeight: clamp01(formData.styleWeight),
        weirdnessConstraint: clamp01(formData.weirdnessConstraint),
        audioWeight: clamp01(formData.audioWeight)
      }
      const data = await post('/api/audio/suno/add-instrumental', body)
      const rid = data?.recordId ?? data?.data?.recordId
      if (rid) { router.push(route.path + '?record-id=' + encodeURIComponent(rid)); return }
      const audioUrl = resolveAudioUrl(data)
      result.value = { title: formData.accompanimentTitle, style: '', model: formData.model, audioUrl, duration: data?.duration, function: 'accompaniment' }
    } else if (formData.function === 'vocal') {
      const body = {
        prompt: formData.prompt.trim(),
        title: formData.vocalTitle.trim(),
        negativeTags: formData.vocalNegativeTags.trim(),
        style: formData.vocalStyle.trim(),
        fileUrl: vocalFileUrl.value,
        model: formData.model,
        vocalGender: formData.vocalGender || undefined,
        styleWeight: clamp01(formData.styleWeight),
        weirdnessConstraint: clamp01(formData.weirdnessConstraint),
        audioWeight: clamp01(formData.audioWeight)
      }
      const data = await post('/api/audio/suno/add-vocals', body)
      const rid = data?.recordId ?? data?.data?.recordId
      if (rid) { router.push(route.path + '?record-id=' + encodeURIComponent(rid)); return }
      const audioUrl = resolveAudioUrl(data)
      result.value = { title: formData.vocalTitle, style: formData.vocalStyle, model: formData.model, audioUrl, duration: data?.duration, function: 'vocal' }
    }
  } catch (error) {
    console.error('Failed to generate music:', error)
    showError(error?.message || 'Request failed')
  } finally {
    isGenerating.value = false
  }
}

const getDefaultTitle = () => {
  const titles = {
    'generate': 'Generated Music',
    'extend': 'Extended Music',
    'cover': 'Covered Music',
    'expand': 'Expanded Music',
    'accompaniment': 'Generated Accompaniment',
    'vocal': 'Generated Vocals'
  }
  return titles[formData.function] || 'Generated Music'
}

const getButtonIcon = () => {
  const icons = {
    'generate': 'fas fa-music',
    'extend': 'fas fa-expand-arrows-alt',
    'cover': 'fas fa-microphone',
    'expand': 'fas fa-compress-arrows-alt',
    'accompaniment': 'fas fa-guitar',
    'vocal': 'fas fa-user'
  }
  return icons[formData.function] || 'fas fa-music'
}

const getButtonText = () => {
  const texts = {
    'generate': 'Generate Music',
    'extend': 'Extend Music',
    'cover': 'Cover Music',
    'expand': 'Expand Music',
    'accompaniment': 'Generate Accompaniment',
    'vocal': 'Generate Vocals'
  }
  return texts[formData.function] || 'Generate Music'
}

const togglePlay = () => {
  if (!audioPlayer.value) return
  
  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const updateProgress = () => {
  if (audioPlayer.value) {
    currentTime.value = audioPlayer.value.currentTime
    progress.value = (currentTime.value / duration.value) * 100
  }
}

const setDuration = () => {
  if (audioPlayer.value) {
    duration.value = audioPlayer.value.duration
  }
}

const onAudioEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
  progress.value = 0
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const downloadResult = () => {
  if (result.value?.audioUrl) {
    const link = document.createElement('a')
    link.href = result.value.audioUrl
    link.download = `${result.value.title}.mp3`
    link.click()
  }
}

const shareResult = () => {
  if (navigator.share && result.value) {
    navigator.share({
      title: result.value.title,
      text: `Listen to the music I generated using Suno: ${result.value.title}`,
      url: result.value.audioUrl
    })
  } else {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(result.value.audioUrl)
    alert('Music link copied to clipboard')
  }
}
</script>

<style scoped>
/* 功能选择区域样式 */
.function-selection-section {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 20px 30px;
}

.function-tabs {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
}

.function-tab {
  display: flex;
  align-items: center;
  padding: 6px 9px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 63px;
}

.function-tab:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.function-tab.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.function-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  margin-right: 6px;
  flex-shrink: 0;
}

.function-tab.active .function-icon {
  background: rgba(255, 255, 255, 0.3);
}

.function-icon i {
  font-size: 15px;
  color: #667eea;
}

.function-tab.active .function-icon i {
  color: white;
}

.function-info {
  flex: 1;
  min-width: 0;
}

.function-name {
  font-size: 13.5px;
  font-weight: 600;
  margin-bottom: 1px;
  color: #1e293b;
}

.function-tab.active .function-name {
  color: white;
}

.function-description {
  font-size: 10.5px;
  color: #64748b;
  line-height: 1.1;
}

.function-tab.active .function-description {
  color: rgba(255, 255, 255, 0.9);
}

.function-info-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  flex-shrink: 0;
}

.function-tab.active .function-info-icon {
  color: rgba(255, 255, 255, 0.8);
}

.function-info-icon:hover {
  color: #667eea;
}

.function-tab.active .function-info-icon:hover {
  color: white;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .function-tabs {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 900px) {
  .function-tabs {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .function-tabs {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .function-tab {
    height: auto;
    padding: 4.5px 6px;
  }
  
  .function-icon {
    width: 27px;
    height: 27px;
    margin-right: 4.5px;
  }
  
  .function-icon i {
    font-size: 12px;
  }
  
  .function-name {
    font-size: 12px;
  }
  
  .function-description {
    font-size: 9px;
  }
}

.suno-tool {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.tool-header {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
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

.main-content {
  display: flex;
  flex: 1;
  min-height: 0;
  gap: 20px;
}

.config-panel {
  width: 40%;
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

.form-group {
  margin-bottom: 20px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.required {
  color: #ef4444;
}

.function-switch,
.mode-switch {
  display: flex;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.function-btn,
.mode-btn {
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: #f8fafc;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
}

.function-btn:hover,
.mode-btn:hover {
  background: #f1f5f9;
}

.function-btn.active,
.mode-btn.active {
  background: #10b981;
  color: white;
}

.form-input {
  width: 90%;
  max-width: 90%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #10b981;
}

/* 下拉框使用全局 .select-with-arrow 统一样式，仅保留 Suno 宽度 */
.suno-tool .select-with-arrow {
  width: 90%;
  max-width: 90%;
}
.suno-tool .select-with-arrow select,
.suno-tool .select-with-arrow .form-input {
  width: 100%;
  max-width: none;
}

#prompt {
  background: transparent;
}

.model-select {
  width: 100%;
}

.form-hint {
  margin-top: 6px;
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
}

.input-hint-warn {
  color: #b45309;
}

.char-count {
  margin-top: 4px;
  font-size: 12px;
  color: #94a3b8;
  text-align: right;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: #10b981;
  border-color: #10b981;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.form-slider {
  width: 90%;
  height: 6px;
  border-radius: 3px;
  background: #e2e8f0;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.form-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #10b981;
  cursor: pointer;
}

.form-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #10b981;
  cursor: pointer;
  border: none;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 12px;
  color: #64748b;
}

.upload-container {
  position: relative;
}

.upload-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.upload-area {
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8fafc;
}

.upload-area:hover {
  border-color: #10b981;
  background: #f0fdf4;
}

.upload-area i {
  font-size: 32px;
  color: #10b981;
  margin-bottom: 12px;
}

.upload-area p {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 500;
  color: #374151;
}

.upload-area span {
  font-size: 14px;
  color: #64748b;
}

.uploaded-file {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f0fdf4;
  border: 1px solid #10b981;
  border-radius: 8px;
  margin-top: 12px;
}

.uploaded-file i {
  color: #10b981;
  font-size: 18px;
}

.uploaded-file span {
  flex: 1;
  font-size: 14px;
  color: #374151;
}

.remove-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: #dc2626;
  transform: scale(1.1);
}

.generate-btn {
  width: 100%;
  padding: 16px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.generate-btn:hover:not(:disabled) {
  background: #059669;
  transform: translateY(-1px);
}

.generate-btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
  transform: none;
}

.result-panel {
  width: 60%;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.result-header {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.result-actions {
  display: flex;
  gap: 8px;
}

.result-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.detail-loading-state, .detail-failure-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 40px; text-align: center;
}
.detail-spinner { font-size: 48px; color: #667eea; }
.detail-loading-state p, .detail-failure-state p { margin: 0; font-size: 16px; color: #64748b; }
.detail-failure-state .failure-icon { font-size: 56px; color: #ef4444; }
.detail-failure-state .failure-message { max-width: 420px; line-height: 1.6; color: #374151; }

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #64748b;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 8px 0;
}

.empty-state span {
  font-size: 14px;
  opacity: 0.8;
}

.music-result {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.music-player {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
}

.music-info h5 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

.music-info p {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #64748b;
}

.music-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #94a3b8;
}

.music-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}

.play-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #10b981;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn:hover {
  background: #059669;
  transform: scale(1.05);
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
}

.progress {
  height: 100%;
  background: #10b981;
  transition: width 0.1s ease;
}

.time {
  font-size: 12px;
  color: #64748b;
  min-width: 80px;
}

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
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }
  
  .config-panel,
  .result-panel {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .suno-tool {
    padding: 16px;
  }
  
  .tool-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .config-header {
    padding: 0 0 16px 0;
  }
  
  .function-tabs {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .function-tab {
    height: auto;
    padding: 4.5px 6px;
  }
  
  .function-icon {
    width: 27px;
    height: 27px;
    margin-right: 4.5px;
  }
  
  .function-icon i {
    font-size: 12px;
  }
  
  .function-name {
    font-size: 12px;
  }
  
  .function-description {
    font-size: 9px;
  }
}
</style>
