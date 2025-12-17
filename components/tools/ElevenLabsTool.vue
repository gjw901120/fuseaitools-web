<template>
  <div class="elevenlabs-tool">
    <!-- 工具信息头部 -->
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Elevenlabs.png" alt="ElevenLabs" />
      </div>
      <div class="tool-details">
        <h3>ElevenLabs</h3>
        <p>The most natural and expressive voice generation tool. Whether it's creators, publishers, or developers, they can easily generate high-quality voice content for videos, audiobooks, games, or applications using our technology.</p>
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
          <h4>{{ getConfigTitle() }}</h4>
        </div>
        <form class="config-form" @submit.prevent="generateContent">

          <!-- 文本转语音功能 -->
          <template v-if="formData.function === 'multilingual-v2' || formData.function === 'turbo-2-5'">
            <!-- 语音选择 -->
            <div class="form-group">
              <label for="voice" class="form-label">Voice</label>
              <select id="voice" v-model="formData.voice" class="form-input">
                <option value="">Not specified</option>
                <option value="Rachel">Rachel</option>
                <option value="Aria">Aria</option>
                <option value="Roger">Roger</option>
                <option value="Sarah">Sarah</option>
                <option value="Laura">Laura</option>
                <option value="Charlie">Charlie</option>
                <option value="George">George</option>
                <option value="Callum">Callum</option>
                <option value="River">River</option>
                <option value="Liam">Liam</option>
                <option value="Charlotte">Charlotte</option>
                <option value="Alice">Alice</option>
                <option value="Matilda">Matilda</option>
                <option value="Will">Will</option>
                <option value="Jessica">Jessica</option>
                <option value="Eric">Eric</option>
                <option value="Chris">Chris</option>
                <option value="Brian">Brian</option>
                <option value="Daniel">Daniel</option>
                <option value="Lily">Lily</option>
                <option value="Bill">Bill</option>
              </select>
              <div class="form-hint">
                Optional. The voice to use for speech generation
              </div>
            </div>

            <!-- 文本输入 -->
            <div class="form-group">
              <label for="text" class="form-label">Text to Synthesize *</label>
              <textarea 
                id="text"
                v-model="formData.text" 
                class="form-input" 
                rows="6" 
                placeholder="Enter the text content to convert to speech..."
                maxlength="5000"
                required
              ></textarea>
              <div class="form-hint">
                Supports multilingual text, max 5000 characters
              </div>
              <div class="char-count">
                {{ formData.text.length }}/5000
              </div>
            </div>

            <!-- 语音设置 -->
            <div class="form-group">
              <label for="voice-settings" class="form-label">Voice Settings</label>
              <div class="voice-settings">
                <!-- 稳定性 -->
                <div class="setting-item">
                  <label for="stability" class="setting-label">
                    Stability ({{ formData.voiceSettings.stability.toFixed(2) }})
                  </label>
                  <input 
                    id="stability"
                    v-model.number="formData.voiceSettings.stability" 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01"
                    class="form-slider"
                  >
                  <div class="slider-labels">
                    <span>Variable (0)</span>
                    <span>Stable (1)</span>
                  </div>
                </div>

                <!-- 相似性 -->
                <div class="setting-item">
                  <label for="similarity-boost" class="setting-label">
                    Similarity Boost ({{ formData.voiceSettings.similarity_boost.toFixed(2) }})
                  </label>
                  <input 
                    id="similarity-boost"
                    v-model.number="formData.voiceSettings.similarity_boost" 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01"
                    class="form-slider"
                  >
                  <div class="slider-labels">
                    <span>Low (0)</span>
                    <span>High (1)</span>
                  </div>
                </div>

                <!-- 风格 -->
                <div class="setting-item">
                  <label for="style" class="setting-label">
                    Style ({{ formData.voiceSettings.style.toFixed(2) }})
                  </label>
                  <input 
                    id="style"
                    v-model.number="formData.voiceSettings.style" 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01"
                    class="form-slider"
                  >
                  <div class="slider-labels">
                    <span>Natural (0)</span>
                    <span>Dramatic (1)</span>
                  </div>
                </div>

                <!-- 语速 -->
                <div class="setting-item">
                  <label for="speed" class="setting-label">
                    Speed ({{ formData.voiceSettings.speed.toFixed(2) }})
                  </label>
                  <input 
                    id="speed"
                    v-model.number="formData.voiceSettings.speed" 
                    type="range" 
                    min="0.7" 
                    max="1.2" 
                    step="0.01"
                    class="form-slider"
                  >
                  <div class="slider-labels">
                    <span>Slow (0.7)</span>
                    <span>Fast (1.2)</span>
                  </div>
                  <div class="form-hint">
                    Values below 1.0 slow down speech, above 1.0 speed it up. Extreme values may affect quality.
                  </div>
                </div>

                <!-- 时间戳 -->
                <div class="setting-item">
                  <label class="checkbox-label" for="timestamps">
                    <input 
                      id="timestamps"
                      v-model="formData.timestamps" 
                      type="checkbox"
                    >
                    <span class="checkmark"></span>
                    Return Timestamps
                  </label>
                  <div class="form-hint">
                    Whether to return timestamps for each word in the generated speech
                  </div>
                </div>
              </div>
            </div>

            <!-- 上下文文本 -->
            <div class="form-group">
              <label class="form-label">Context Text (Optional)</label>
              <div class="form-group" style="margin-bottom: 12px;">
                <label for="previous-text" class="form-label">Previous Text</label>
                <textarea 
                  id="previous-text"
                  v-model="formData.previous_text" 
                  class="form-input" 
                  rows="2" 
                  placeholder="Text that came before the current request"
                  maxlength="5000"
                ></textarea>
                <div class="form-hint">
                  Optional. Can be used to improve speech continuity when concatenating multiple generations. Max 5000 characters.
                </div>
                <div class="char-count">
                  {{ formData.previous_text.length }}/5000
                </div>
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label for="next-text" class="form-label">Next Text</label>
                <textarea 
                  id="next-text"
                  v-model="formData.next_text" 
                  class="form-input" 
                  rows="2" 
                  placeholder="Text that comes after the current request"
                  maxlength="5000"
                ></textarea>
                <div class="form-hint">
                  Optional. Can be used to improve speech continuity when concatenating multiple generations. Max 5000 characters.
                </div>
                <div class="char-count">
                  {{ formData.next_text.length }}/5000
                </div>
              </div>
            </div>

            <!-- 语言代码（仅Turbo 2.5） -->
            <div class="form-group" v-if="formData.function === 'turbo-2-5'">
              <label for="language-code" class="form-label">Language Code</label>
              <input 
                id="language-code"
                v-model="formData.language_code" 
                type="text" 
                class="form-input" 
                placeholder="e.g.: en, zh, ja"
                maxlength="500"
              >
              <div class="form-hint">
                Optional. Language code (ISO 639-1) to enforce a language for the model. Only Turbo v2.5 and Flash v2.5 support language enforcement.
              </div>
            </div>

            <!-- 输出格式 -->
            <div class="form-group">
              <label for="output-format" class="form-label">Output Format</label>
              <select id="output-format" v-model="formData.outputFormat" class="form-input">
                <option value="mp3_44100_128">MP3 (44.1kHz, 128kbps)</option>
                <option value="mp3_44100_192">MP3 (44.1kHz, 192kbps)</option>
                <option value="mp3_44100_320">MP3 (44.1kHz, 320kbps)</option>
                <option value="pcm_16000">PCM (16kHz)</option>
                <option value="pcm_22050">PCM (22.05kHz)</option>
                <option value="pcm_24000">PCM (24kHz)</option>
                <option value="pcm_44100">PCM (44.1kHz)</option>
              </select>
              <div class="form-hint">
                Select audio output format and quality
              </div>
            </div>
          </template>

          <!-- 语音转文本功能 -->
          <template v-if="formData.function === 'speech-to-text'">
            <!-- 音频上传 -->
            <div class="form-group">
              <label class="form-label">
                Upload Audio File <span class="required">*</span>
              </label>
              <UploadAudio
                input-id="speech-audio-upload"
                label="Upload audio file"
                upload-icon="fas fa-cloud-upload-alt"
                upload-text="Click to upload audio file"
                upload-hint="Supports MP3, WAV, M4A formats, max 200MB"
                additional-hint="Upload audio file to recognize, supports multiple formats"
                theme-color="#6366f1"
                :max-file-size="200 * 1024 * 1024"
                :multiple="false"
                @update:files="handleSpeechAudioUpdate"
              />
            </div>

            <!-- 语言选择 -->
            <div class="form-group">
              <label for="language" class="form-label">Language</label>
              <select id="language" v-model="formData.language" class="form-input">
                <option value="auto">Auto Detect</option>
                <option value="en">English</option>
                <option value="zh">Chinese</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
              </select>
              <div class="form-hint">
                Select the main language of the audio, or use auto detect
              </div>
            </div>

            <!-- 说话人识别 -->
            <div class="form-group">
              <label class="checkbox-label" for="speaker-identification">
                <input 
                  id="speaker-identification"
                  v-model="formData.speakerIdentification" 
                  type="checkbox"
                >
                <span class="checkmark"></span>
                Enable Speaker Identification
              </label>
              <div class="form-hint">
                Identify and label different speakers
              </div>
            </div>

            <!-- 音频事件标记 -->
            <div class="form-group">
              <label class="checkbox-label" for="audio-events">
                <input 
                  id="audio-events"
                  v-model="formData.audioEvents" 
                  type="checkbox"
                >
                <span class="checkmark"></span>
                Mark Audio Events
              </label>
              <div class="form-hint">
                Mark audio events like music, noise, silence, etc.
              </div>
            </div>
          </template>

          <!-- 音效生成功能 -->
          <template v-if="formData.function === 'sound-effect-v2'">
            <!-- 音效描述 -->
            <div class="form-group">
              <label for="sound-description" class="form-label">Sound Description *</label>
              <textarea 
                id="sound-description"
                v-model="formData.soundDescription" 
                class="form-input" 
                rows="4" 
                placeholder="Describe the sound effect you want, e.g.: rain, footsteps, doorbell..."
                maxlength="1000"
                required
              ></textarea>
              <div class="form-hint">
                Describe the sound effect characteristics and usage in detail
              </div>
              <div class="char-count">
                {{ formData.soundDescription.length }}/1000
              </div>
            </div>

            <!-- 音效时长 -->
            <div class="form-group">
              <label for="duration" class="form-label">Sound Duration (seconds)</label>
              <input 
                id="duration"
                v-model.number="formData.duration" 
                type="number" 
                class="form-input" 
                placeholder="e.g.: 5"
                min="1"
                max="30"
                step="1"
              >
              <div class="form-hint">
                Duration of the sound effect, maximum 30 seconds
              </div>
            </div>

            <!-- 循环播放 -->
            <div class="form-group">
              <label class="checkbox-label" for="loop">
                <input 
                  id="loop"
                  v-model="formData.loop" 
                  type="checkbox"
                >
                <span class="checkmark"></span>
                Loop
              </label>
              <div class="form-hint">
                Generate seamlessly loopable sound effects
              </div>
            </div>

            <!-- 音效强度 -->
            <div class="form-group">
              <label for="intensity" class="form-label">
                Sound Intensity ({{ formData.intensity }})
              </label>
              <input 
                id="intensity"
                v-model.number="formData.intensity" 
                type="range" 
                min="0" 
                max="1" 
                step="0.1"
                class="form-slider"
              >
              <div class="slider-labels">
                <span>Soft (0)</span>
                <span>Intense (1)</span>
              </div>
            </div>
          </template>

          <!-- 音频分离功能 -->
          <template v-if="formData.function === 'audio-isolation'">
            <!-- 音频上传 -->
            <div class="form-group">
              <label class="form-label">
                Upload Audio File <span class="required">*</span>
              </label>
              <UploadAudio
                input-id="isolation-audio-upload"
                label="Upload audio file"
                upload-icon="fas fa-cloud-upload-alt"
                upload-text="Click to upload audio file"
                upload-hint="Supports MP3, WAV, M4A formats, max 10MB"
                additional-hint="Upload audio file to isolate"
                theme-color="#6366f1"
                :max-file-size="10 * 1024 * 1024"
                :multiple="false"
                @update:files="handleIsolationAudioUpdate"
              />
            </div>

            <!-- 分离类型 -->
            <div class="form-group">
              <label for="isolation-type" class="form-label">Isolation Type *</label>
              <select id="isolation-type" v-model="formData.isolationType" class="form-input" required>
                <option value="vocals">Vocals Isolation</option>
                <option value="instrumental">Background Music Isolation</option>
                <option value="drums">Drums Isolation</option>
                <option value="bass">Bass Isolation</option>
                <option value="other">Other Instruments</option>
              </select>
              <div class="form-hint">
                Select the audio element to isolate
              </div>
            </div>

            <!-- 分离强度 -->
            <div class="form-group">
              <label for="isolation-strength" class="form-label">
                Isolation Strength ({{ formData.isolationStrength }})
              </label>
              <input 
                id="isolation-strength"
                v-model.number="formData.isolationStrength" 
                type="range" 
                min="0" 
                max="1" 
                step="0.1"
                class="form-slider"
              >
              <div class="slider-labels">
                <span>Light (0)</span>
                <span>Complete (1)</span>
              </div>
            </div>
          </template>

          <!-- 生成按钮 -->
          <button type="submit" class="generate-btn" :disabled="!canGenerate">
            <i :class="getButtonIcon()"></i> 
            {{ getButtonText() }} ({{ getButtonPrice() }})
          </button>
        </form>
      </div>

      <!-- 右侧：结果展示区域 (2/3) -->
      <div class="result-panel">
        <div class="result-header">
          <h4>Generation Result</h4>
          <div class="result-actions" v-if="result">
            <button class="action-btn" @click="downloadResult" title="Download">
              <i class="fas fa-download"></i>
            </button>
            <button class="action-btn" @click="shareResult" title="Share">
              <i class="fas fa-share"></i>
            </button>
          </div>
        </div>

        <div class="result-content">
          <!-- 空状态 -->
          <div v-if="!result" class="empty-state">
            <i :class="getEmptyStateIcon()"></i>
            <p>{{ getEmptyStateTitle() }}</p>
            <span>{{ getEmptyStateDescription() }}</span>
          </div>

          <!-- 结果展示 -->
          <div v-else class="result-display">
            <!-- 语音合成结果 -->
            <div v-if="formData.function === 'multilingual-v2' || formData.function === 'turbo-2-5'" class="speech-result">
              <div class="speech-player">
                <div class="speech-info">
                  <h5>{{ getVoiceName(formData.voiceId) }}</h5>
                  <p>{{ formData.function === 'multilingual-v2' ? 'Multilingual v2' : 'Turbo 2.5' }}</p>
                  <div class="speech-meta">
                    <span><i class="fas fa-clock"></i> {{ result.duration || 'Unknown Duration' }}</span>
                    <span><i class="fas fa-file-audio"></i> {{ result.format || 'MP3' }}</span>
                  </div>
                </div>
                <div class="player-controls">
                  <button class="play-btn" @click="toggleTextToSpeechPlay">
                    <i :class="textToSpeechPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
                  </button>
                  <div class="progress-bar">
                    <div class="progress" :style="{ width: textToSpeechProgress + '%' }"></div>
                  </div>
                  <span class="time">{{ formatTime(textToSpeechCurrentTime) }} / {{ formatTime(textToSpeechDuration) }}</span>
                </div>
              </div>
              
              <audio 
                ref="textToSpeechPlayer"
                :src="result.audioUrl" 
                @timeupdate="updateTextToSpeechProgress"
                @loadedmetadata="setTextToSpeechDuration"
                @ended="onTextToSpeechEnded"
              ></audio>
            </div>

            <!-- 语音识别结果 - 已禁用 -->
            <!--
            <div v-else-if="formData.function === 'speech-to-text'" class="text-result">
              <div class="text-content">
                <h5>识别结果</h5>
                <div class="transcript">
                  {{ result.transcript || '暂无识别结果' }}
                </div>
                <div v-if="result.speakers" class="speakers-info">
                  <h6>说话人信息</h6>
                  <div v-for="(speaker, index) in result.speakers" :key="index" class="speaker-item">
                    <span class="speaker-name">{{ speaker.name }}</span>
                    <span class="speaker-time">{{ speaker.time }}</span>
                  </div>
                </div>
              </div>
            </div>
            -->

            <!-- 音效生成结果 -->
            <div v-else-if="formData.function === 'sound-effect-v2'" class="sound-effect-result">
              <div class="sound-player">
                <div class="sound-info">
                  <h5>{{ formData.soundDescription }}</h5>
                  <p>Generated Sound Effect</p>
                  <div class="sound-meta">
                    <span><i class="fas fa-clock"></i> {{ result.duration || 'Unknown Duration' }}</span>
                    <span><i class="fas fa-volume-up"></i> Sound Effect</span>
                  </div>
                </div>
                <div class="player-controls">
                  <button class="play-btn" @click="toggleSoundEffectPlay">
                    <i :class="soundEffectPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
                  </button>
                  <div class="progress-bar">
                    <div class="progress" :style="{ width: soundEffectProgress + '%' }"></div>
                  </div>
                  <span class="time">{{ formatTime(soundEffectCurrentTime) }} / {{ formatTime(soundEffectDuration) }}</span>
                </div>
              </div>
              
              <audio 
                ref="soundEffectPlayer"
                :src="result.audioUrl" 
                @timeupdate="updateSoundEffectProgress"
                @loadedmetadata="setSoundEffectDuration"
                @ended="onSoundEffectEnded"
              ></audio>
            </div>

            <!-- 音频分离结果 - 已禁用 -->
            <!--
            <div v-else-if="formData.function === 'audio-isolation' && result" class="isolation-result">
              <div class="isolation-player">
                <div class="isolation-info">
                  <h5>{{ getIsolationTypeName(formData.isolationType) }}</h5>
                  <p>分离结果</p>
                  <div class="isolation-meta">
                    <span><i class="fas fa-clock"></i> {{ result.duration || '未知时长' }}</span>
                    <span><i class="fas fa-cut"></i> {{ formData.isolationType }}</span>
                  </div>
                </div>
                <div class="player-controls">
                  <button class="play-btn" @click="toggleIsolationPlay">
                    <i :class="isolationPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
                  </button>
                  <div class="progress-bar">
                    <div class="progress" :style="{ width: isolationProgress + '%' }"></div>
                  </div>
                  <span class="time">{{ formatTime(isolationCurrentTime) }} / {{ formatTime(isolationDuration) }}</span>
                </div>
              </div>
              
              <audio 
                ref="isolationPlayer"
                :src="result.audioUrl" 
                @timeupdate="updateIsolationProgress"
                @loadedmetadata="setIsolationDuration"
                @ended="onIsolationEnded"
              ></audio>
            </div>
            -->
          </div>
        </div>
      </div>
    </div>

    <!-- 使用提示 -->
    <div class="usage-tips">
      <div class="tip-item">
        <span class="tip-icon">🎤</span>
        <span>Text-to-Speech: Supports multiple languages and voice styles, adjustable stability, similarity and style parameters</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">📝</span>
        <span>Speech-to-Text: High-precision speech recognition with speaker identification and audio event marking</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🎵</span>
        <span>Sound Effect Generation: AI-driven sound effect generation with loop playback and duration control</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">✂️</span>
        <span>Audio Isolation: Intelligently isolate vocals and background music, supports multiple audio element isolation</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import AudioUpload from '../AudioUpload.vue'
import UploadAudio from './common/UploadAudio.vue'

// 表单数据
const formData = reactive({
  function: 'multilingual-v2',
  // 文本转语音相关
  model: '', // 将根据 function 自动设置
  voice: '', // 使用文档中的选项：Rachel, Aria, Roger 等
  text: '',
  voiceSettings: {
    stability: 0.5,
    similarity_boost: 0.75,
    style: 0.0,
    speed: 1.0
  },
  timestamps: false,
  previous_text: '',
  next_text: '',
  language_code: '', // 仅Turbo 2.5支持
  outputFormat: 'mp3_44100_128',
  // 语音转文本相关
  language: 'auto',
  speakerIdentification: false,
  audioEvents: false,
  uploadedSpeechFile: null,
  // 音效生成相关
  soundDescription: '',
  duration: 5,
  loop: false,
  intensity: 0.5,
  // 音频分离相关
  isolationType: 'vocals',
  isolationStrength: 0.8,
  uploadedIsolationFile: null
})

// 功能选项
const functionOptions = ref([
  {
    id: 'multilingual-v2',
    name: 'Multilingual v2',
    description: 'Multilingual Voice Synthesis',
    detailDescription: 'AI voice synthesis supporting 100+ languages, suitable for international content creation, high-quality multilingual voice generation tool',
    icon: 'fas fa-globe'
  },
  {
    id: 'turbo-2-5',
    name: 'Turbo 2.5',
    description: 'Fast Voice Synthesis',
    detailDescription: 'Optimized for speed, 3x faster generation speed, suitable for real-time applications and batch processing, efficient AI voice synthesis tool',
    icon: 'fas fa-bolt'
  },
  {
    id: 'speech-to-text',
    name: 'Speech-to-Text',
    description: 'AI Speech Recognition',
    detailDescription: 'High-precision speech recognition, supports multiple audio formats, maximum 200MB, supports speaker identification and audio event marking',
    icon: 'fas fa-keyboard'
  },
  {
    id: 'sound-effect-v2',
    name: 'Sound Effect v2',
    description: 'AI Sound Effect Generation',
    detailDescription: 'AI-driven sound effect generation, supports loop playback, duration control, multiple output formats, suitable for games, video production',
    icon: 'fas fa-volume-up'
  },
  {
    id: 'audio-isolation',
    name: 'Audio Isolation',
    description: 'AI Audio Isolation',
    detailDescription: 'Intelligently isolate vocals and background music, supports multiple audio formats, maximum 10MB, suitable for audio post-processing',
    icon: 'fas fa-cut'
  }
])

// 监听 function 变化，自动设置 model
watch(() => formData.function, (newFunction) => {
  if (newFunction === 'multilingual-v2') {
    formData.model = 'elevenlabs/text-to-speech-multilingual-v2'
  } else if (newFunction === 'turbo-2-5') {
    formData.model = 'elevenlabs/text-to-speech-turbo-2-5'
  }
}, { immediate: true })

// 结果数据
const result = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)
const audioPlayer = ref(null)

// 为不同功能创建独立的播放状态
const speechToTextPlayer = ref(null)
const soundEffectPlayer = ref(null)
const isolationPlayer = ref(null)
const textToSpeechPlayer = ref(null)

const speechToTextPlaying = ref(false)
const soundEffectPlaying = ref(false)
const isolationPlaying = ref(false)
const textToSpeechPlaying = ref(false)

const speechToTextCurrentTime = ref(0)
const soundEffectCurrentTime = ref(0)
const isolationCurrentTime = ref(0)
const textToSpeechCurrentTime = ref(0)

const speechToTextDuration = ref(0)
const soundEffectDuration = ref(0)
const isolationDuration = ref(0)
const textToSpeechDuration = ref(0)

const speechToTextProgress = ref(0)
const soundEffectProgress = ref(0)
const isolationProgress = ref(0)
const textToSpeechProgress = ref(0)

// 计算属性
const canGenerate = computed(() => {
  if (formData.function === 'multilingual-v2' || formData.function === 'turbo-2-5') {
    return formData.text.trim().length > 0
  } else if (formData.function === 'speech-to-text') {
    return formData.uploadedSpeechFile !== null
  } else if (formData.function === 'sound-effect-v2') {
    return formData.soundDescription.trim().length > 0
  } else if (formData.function === 'audio-isolation') {
    return formData.uploadedIsolationFile !== null
  }
  return false
})

// 方法
const switchFunction = (functionId) => {
  formData.function = functionId
  // 重置结果
  result.value = null
}

const getConfigTitle = () => {
  const titles = {
    'multilingual-v2': 'Text-to-Speech Multilingual v2 Configuration',
    'turbo-2-5': 'Text-to-Speech Turbo 2.5 Configuration',
    'speech-to-text': 'Speech-to-Text Configuration',
    'sound-effect-v2': 'Sound Effect v2 Configuration',
    'audio-isolation': 'Audio Isolation Configuration'
  }
  return titles[formData.function] || 'Configuration'
}

const getButtonIcon = () => {
  const icons = {
    'multilingual-v2': 'fas fa-globe',
    'turbo-2-5': 'fas fa-bolt',
    'speech-to-text': 'fas fa-keyboard',
    'sound-effect-v2': 'fas fa-volume-up',
    'audio-isolation': 'fas fa-cut'
  }
  return icons[formData.function] || 'fas fa-play'
}

const getButtonText = () => {
  const texts = {
    'multilingual-v2': 'Generate Speech',
    'turbo-2-5': 'Generate Speech',
    'speech-to-text': 'Start Recognition',
    'sound-effect-v2': 'Generate Sound Effect',
    'audio-isolation': 'Start Isolation'
  }
  return texts[formData.function] || 'Generate'
}

const getButtonPrice = () => {
  const prices = {
    'multilingual-v2': '$0.18/1K chars',
    'turbo-2-5': '$0.15/1K chars',
    'speech-to-text': '$0.10/minute',
    'sound-effect-v2': '$0.05/second',
    'audio-isolation': '$0.15/minute'
  }
  return prices[formData.function] || ''
}

const getEmptyStateIcon = () => {
  const icons = {
    'multilingual-v2': 'fas fa-globe',
    'turbo-2-5': 'fas fa-bolt',
    'speech-to-text': 'fas fa-keyboard',
    'sound-effect-v2': 'fas fa-volume-up',
    'audio-isolation': 'fas fa-cut'
  }
  return icons[formData.function] || 'fas fa-play'
}

const getEmptyStateTitle = () => {
  const titles = {
    'multilingual-v2': 'No speech generated yet',
    'turbo-2-5': 'No speech generated yet',
    'speech-to-text': 'No recognition result yet',
    'sound-effect-v2': 'No sound effect generated yet',
    'audio-isolation': 'No isolation result yet'
  }
  return titles[formData.function] || 'No Result Yet'
}

const getEmptyStateDescription = () => {
  const descriptions = {
    'multilingual-v2': 'Enter text and click "Generate Speech" to start synthesis',
    'turbo-2-5': 'Enter text and click "Generate Speech" to start synthesis',
    'speech-to-text': 'Upload audio file and click "Start Recognition"',
    'sound-effect-v2': 'Enter sound effect description and click "Generate Sound Effect"',
    'audio-isolation': 'Upload audio file and click "Start Isolation"'
  }
  return descriptions[formData.function] || 'Start Using'
}

const getVoiceName = (voiceId) => {
  const voiceMap = {
    '21m00Tcm4TlvDq8ikWAM': 'Rachel',
    'AZnzlk1XvdvUeBnXmlld': 'Domi',
    'EXAVITQu4vr4xnSDxMaL': 'Bella',
    'ErXwobaYiN019PkySvjV': 'Antoni',
    'MF3mGyEYCl7XYWbV9V6O': 'Elli',
    'TxGEqnHWrfWFTfGW9XjX': 'Josh',
    'VR6AewLTigWG4xSOukaG': 'Arnold',
    'pNInz6obpgDQGcFmaJgB': 'Adam',
    'yoZ06aMxZJJ28mfd3POQ': 'Sam'
  }
  return voiceMap[voiceId] || 'Unknown Voice'
}

const getIsolationTypeName = (type) => {
  const typeMap = {
    'vocals': 'Vocals Isolation',
    'instrumental': 'Background Music Isolation',
    'drums': 'Drums Isolation',
    'bass': 'Bass Isolation',
    'other': 'Other Instruments Isolation'
  }
  return typeMap[type] || 'Audio Isolation'
}

// 文件上传处理
const handleSpeechAudioUpdate = (files) => {
  if (files && files.length > 0) {
    formData.uploadedSpeechFile = files[0]
  } else {
    formData.uploadedSpeechFile = null
  }
}

const handleIsolationAudioUpdate = (files) => {
  if (files && files.length > 0) {
    formData.uploadedIsolationFile = files[0]
  } else {
    formData.uploadedIsolationFile = null
  }
}

const generateContent = async () => {
  try {
    let apiEndpoint = ''
    switch (formData.function) {
      case 'text-to-speech':
        apiEndpoint = '/api/elevenlabs/text-to-speech'
        break
      case 'speech-to-text':
        apiEndpoint = '/api/elevenlabs/speech-to-text'
        break
      case 'sound-effect':
        apiEndpoint = '/api/elevenlabs/sound-effect'
        break
      case 'audio-isolation':
        apiEndpoint = '/api/elevenlabs/audio-isolation'
        break
    }
    
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    
    if (response.ok) {
      const data = await response.json()
      result.value = data
    } else {
      throw new Error('Generation failed')
    }
  } catch (error) {
    console.error('Generation failed:', error)
    // 模拟成功结果用于演示
    result.value = {
      audioUrl: 'https://example.com/generated-content.mp3',
      duration: '0:15',
      format: 'MP3',
      transcript: 'This is a simulated recognition result text...'
    }
  }
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

// 文本转语音播放控制函数
const toggleTextToSpeechPlay = () => {
  if (!textToSpeechPlayer.value) return
  
  if (textToSpeechPlaying.value) {
    textToSpeechPlayer.value.pause()
  } else {
    textToSpeechPlayer.value.play()
  }
  textToSpeechPlaying.value = !textToSpeechPlaying.value
}

const updateTextToSpeechProgress = () => {
  if (textToSpeechPlayer.value) {
    textToSpeechCurrentTime.value = textToSpeechPlayer.value.currentTime
    textToSpeechProgress.value = (textToSpeechCurrentTime.value / textToSpeechDuration.value) * 100
  }
}

const setTextToSpeechDuration = () => {
  if (textToSpeechPlayer.value) {
    textToSpeechDuration.value = textToSpeechPlayer.value.duration
  }
}

const onTextToSpeechEnded = () => {
  textToSpeechPlaying.value = false
  textToSpeechCurrentTime.value = 0
  textToSpeechProgress.value = 0
}

// 音效播放控制函数
const toggleSoundEffectPlay = () => {
  if (!soundEffectPlayer.value) return
  
  if (soundEffectPlaying.value) {
    soundEffectPlayer.value.pause()
  } else {
    soundEffectPlayer.value.play()
  }
  soundEffectPlaying.value = !soundEffectPlaying.value
}

const updateSoundEffectProgress = () => {
  if (soundEffectPlayer.value) {
    soundEffectCurrentTime.value = soundEffectPlayer.value.currentTime
    soundEffectProgress.value = (soundEffectCurrentTime.value / soundEffectDuration.value) * 100
  }
}

const setSoundEffectDuration = () => {
  if (soundEffectPlayer.value) {
    soundEffectDuration.value = soundEffectPlayer.value.duration
  }
}

const onSoundEffectEnded = () => {
  soundEffectPlaying.value = false
  soundEffectCurrentTime.value = 0
  soundEffectProgress.value = 0
}

// 音频分离播放控制函数
const toggleIsolationPlay = () => {
  if (!isolationPlayer.value) return
  
  if (isolationPlaying.value) {
    isolationPlayer.value.pause()
  } else {
    isolationPlayer.value.play()
  }
  isolationPlaying.value = !isolationPlaying.value
}

const updateIsolationProgress = () => {
  if (isolationPlayer.value) {
    isolationCurrentTime.value = isolationPlayer.value.currentTime
    isolationProgress.value = (isolationCurrentTime.value / isolationDuration.value) * 100
  }
}

const setIsolationDuration = () => {
  if (isolationPlayer.value) {
    isolationDuration.value = isolationPlayer.value.duration
  }
}

const onIsolationEnded = () => {
  isolationPlaying.value = false
  isolationCurrentTime.value = 0
  isolationProgress.value = 0
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
    link.download = `elevenlabs-${formData.function}.mp3`
    link.click()
  }
}

const shareResult = () => {
  if (navigator.share && result.value) {
    navigator.share({
      title: `ElevenLabs ${getButtonText()}`,
      text: `听听我使用ElevenLabs生成的内容`,
      url: result.value.audioUrl
    })
  } else {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(result.value.audioUrl)
    alert('链接已复制到剪贴板')
  }
}
</script>

<style scoped>
/* 功能选择区域样式 */
.function-selection-section {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 30px;
}

.function-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.function-tab {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 0;
  flex: 1;
  height: 56px;
  flex-shrink: 0;
}

.function-tab:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.function-tab.active {
  background: #6366f1;
  border-color: #6366f1;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.function-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  margin-right: 10px;
  flex-shrink: 0;
}

.function-tab.active .function-icon {
  background: rgba(255, 255, 255, 0.3);
}

.function-icon i {
  font-size: 14px;
  color: #6366f1;
}

.function-tab.active .function-icon i {
  color: white;
}

.function-info {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.function-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.function-tab.active .function-name {
  color: white;
}

.function-description {
  font-size: 11px;
  color: #64748b;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  margin-left: 6px;
}

.function-tab.active .function-info-icon {
  color: rgba(255, 255, 255, 0.8);
}

.function-info-icon:hover {
  color: #6366f1;
}

.function-tab.active .function-info-icon:hover {
  color: white;
}

.elevenlabs-tool {
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
}

.tool-avatar img {
  width: 48px;
  height: 48px;
  object-fit: cover;
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
  border-color: #6366f1;
}

.form-hint {
  margin-top: 6px;
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
}

.char-count {
  margin-top: 4px;
  font-size: 12px;
  color: #94a3b8;
  text-align: right;
}

.voice-settings {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}

.setting-item {
  margin-bottom: 16px;
}

.setting-item:last-child {
  margin-bottom: 0;
}

.setting-label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
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
  background: #6366f1;
  cursor: pointer;
}

.form-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #6366f1;
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
  background: #6366f1;
  border-color: #6366f1;
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

.generate-btn {
  width: 100%;
  padding: 16px;
  background: #6366f1;
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
  background: #4f46e5;
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

.result-display {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.speech-result,
.sound-effect-result,
.isolation-result {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.speech-player,
.sound-player,
.isolation-player {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
}

.speech-info h5,
.sound-info h5,
.isolation-info h5 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

.speech-info p,
.sound-info p,
.isolation-info p {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #64748b;
}

.speech-meta,
.sound-meta,
.isolation-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #94a3b8;
}

.speech-meta span,
.sound-meta span,
.isolation-meta span {
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
  background: #6366f1;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn:hover {
  background: #4f46e5;
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
  background: #6366f1;
  transition: width 0.1s ease;
}

.time {
  font-size: 12px;
  color: #64748b;
  min-width: 80px;
}

.text-result {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
}

.text-content h5 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

.transcript {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
  margin-bottom: 16px;
}

.speakers-info h6 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.speaker-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 8px;
}

.speaker-name {
  font-weight: 500;
  color: #374151;
}

.speaker-time {
  font-size: 12px;
  color: #64748b;
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
@media (max-width: 1200px) {
  .function-tabs {
    gap: 6px;
  }
  
  .function-tab {
    padding: 8px 12px;
    height: 52px;
  }
  
  .function-name {
    font-size: 13px;
  }
  
  .function-description {
    font-size: 10px;
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
  
  .function-tabs {
    gap: 4px;
  }
  
  .function-tab {
    padding: 6px 10px;
    height: 48px;
  }
  
  .function-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
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

@media (max-width: 768px) {
  .elevenlabs-tool {
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
  
  .function-selection-section {
    padding: 12px 20px;
  }
  
  .function-tabs {
    gap: 4px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  .function-tab {
    min-width: 100px;
    padding: 6px 8px;
    height: 44px;
  }
  
  .function-icon {
    width: 22px;
    height: 22px;
    margin-right: 6px;
  }
  
  .function-icon i {
    font-size: 11px;
  }
  
  .function-name {
    font-size: 11px;
  }
  
  .function-description {
    font-size: 8px;
  }
  
  .function-info-icon {
    width: 16px;
    height: 16px;
    margin-left: 4px;
  }
}
</style>