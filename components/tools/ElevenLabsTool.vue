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

    <!-- 功能选择区域：统一 mode-tabs 样式，主色 #6366f1 -->
    <div class="mode-tabs-wrap">
      <div class="mode-tabs">
        <div
          v-for="func in functionOptions"
          :key="func.id"
          class="mode-tab"
          :class="{ active: formData.function === func.id }"
          @click="goToElevenLabsTab(func.id)"
        >
          <i :class="func.icon"></i>
          <span>{{ func.name }}</span>
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
          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">
          <!-- 文本转语音功能 -->
          <template v-if="formData.function === 'multilingual-v2' || formData.function === 'turbo-2-5'">
            <!-- 语音选择（下拉内带播放，必选） -->
            <div class="form-group">
              <label class="form-label">Voice <span class="required">*</span></label>
              <div class="voice-dropdown" ref="voiceDropdownRef">
                <button
                  type="button"
                  class="voice-dropdown-trigger"
                  :class="{ open: voiceDropdownOpen }"
                  @click="voiceDropdownOpen = !voiceDropdownOpen"
                >
                  <span class="voice-trigger-label">
                    {{ selectedVoiceLabel }}
                  </span>
                  <i class="fas fa-chevron-down voice-trigger-arrow"></i>
                </button>
                <div v-show="voiceDropdownOpen" class="voice-dropdown-panel">
                  <div
                    v-for="v in elevenlabsVoices"
                    :key="v.id"
                    class="voice-option"
                    :class="{ active: formData.voice === v.id }"
                    @click="formData.voice = v.id; voiceDropdownOpen = false"
                  >
                    <span class="voice-option-label">{{ getVoiceOptionLabel(v) }}</span>
                    <button
                      type="button"
                      class="voice-option-play"
                      :title="'Play ' + v.name"
                      :disabled="voicePreviewLoading && playingVoiceId === v.id"
                      @click.stop="playVoicePreviewFor(v.id)"
                    >
                      <i v-if="voicePreviewLoading && playingVoiceId === v.id" class="fas fa-spinner fa-spin"></i>
                      <i v-else class="fas fa-volume-up"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="form-hint">
                Required. Select a voice for speech generation. Click the speaker icon to play a sample.
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

            <!-- 语言代码（Multilingual v2 / Turbo 2.5） -->
            <div class="form-group" v-if="formData.function === 'multilingual-v2' || formData.function === 'turbo-2-5'">
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
                Optional. Language code (ISO 639-1) to enforce a language for the model.
              </div>
            </div>

            <!-- 输出格式 -->
            <div class="form-group">
              <label for="output-format" class="form-label">Output Format</label>
              <div class="select-with-arrow">
                <select id="output-format" v-model="formData.outputFormat" class="form-input">
                  <option value="mp3_44100_128">MP3 (44.1kHz, 128kbps)</option>
                  <option value="mp3_44100_192">MP3 (44.1kHz, 192kbps)</option>
                  <option value="mp3_44100_320">MP3 (44.1kHz, 320kbps)</option>
                  <option value="pcm_16000">PCM (16kHz)</option>
                  <option value="pcm_22050">PCM (22.05kHz)</option>
                  <option value="pcm_24000">PCM (24kHz)</option>
                  <option value="pcm_44100">PCM (44.1kHz)</option>
                </select>
                <i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true"></i>
              </div>
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
              <span v-if="isUploadingSpeech" class="form-hint">Uploading audio...</span>
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
              <!-- 详情页：在 Upload Audio File 下方回显原始音频 -->
              <div v-if="isDetailView && detailOriginalAudioUrl" class="detail-audio-replay">
                <label class="form-label detail-audio-label">Original Audio</label>
                <div class="detail-audio-wrap">
                  <audio controls class="detail-audio-player" :src="detailOriginalAudioUrl"></audio>
                </div>
              </div>
            </div>

            <!-- 语言选择 -->
            <div class="form-group">
              <label for="language" class="form-label">Language</label>
              <div class="select-with-arrow">
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
                <i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true"></i>
              </div>
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
                maxlength="5000"
                required
              ></textarea>
              <div class="form-hint">
                Describe the sound effect characteristics and usage in detail
              </div>
              <div class="char-count">
                {{ formData.soundDescription.length }}/5000
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
                min="0.5"
                max="22"
                step="0.5"
              >
              <div class="form-hint">
                Duration of the sound effect, 0.5–22 seconds
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

            <!-- 输出格式 (codec_sample_rate_bitrate) -->
            <div class="form-group">
              <label for="sound-effect-output-format" class="form-label">Output Format</label>
              <div class="select-with-arrow">
                <select id="sound-effect-output-format" v-model="formData.outputFormat" class="form-input">
                  <option value="mp3_44100_128">MP3 (44.1kHz, 128kbps)</option>
                  <option value="mp3_44100_192">MP3 (44.1kHz, 192kbps)</option>
                  <option value="mp3_44100_320">MP3 (44.1kHz, 320kbps)</option>
                  <option value="pcm_16000">PCM (16kHz)</option>
                  <option value="pcm_22050">PCM (22.05kHz)</option>
                  <option value="pcm_24000">PCM (24kHz)</option>
                  <option value="pcm_44100">PCM (44.1kHz)</option>
                </select>
                <i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true"></i>
              </div>
              <div class="form-hint">
                Optional. Output format of the generated audio (codec_sample_rate_bitrate).
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
              <span v-if="isUploadingIsolation" class="form-hint">Uploading audio...</span>
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
              <!-- 详情页：在 Upload Audio File 下方回显原始音频 -->
              <div v-if="isDetailView && detailIsolationOriginalAudioUrl" class="detail-audio-replay">
                <label class="form-label detail-audio-label">Original Audio</label>
                <div class="detail-audio-wrap">
                  <audio controls class="detail-audio-player" :src="detailIsolationOriginalAudioUrl"></audio>
                </div>
              </div>
            </div>
          </template>

          <!-- 生成按钮 -->
          <button type="submit" class="generate-btn" :disabled="!canGenerate || isGenerating">
            <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
            <i v-else :class="getButtonIcon()"></i> 
            {{ isGenerating ? 'Generating...' : getButtonText() }} ({{ getButtonPrice() }})
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
          <!-- 空状态 -->
          <div v-else-if="!displayResult" class="empty-state">
            <i :class="getEmptyStateIcon()"></i>
            <p>{{ getEmptyStateTitle() }}</p>
            <span>{{ getEmptyStateDescription() }}</span>
          </div>

          <!-- 结果展示（含详情页 status 2） -->
          <div v-else class="result-display">
            <!-- 语音合成结果 -->
            <div v-if="formData.function === 'multilingual-v2' || formData.function === 'turbo-2-5'" class="speech-result">
              <div class="speech-player">
                <div class="speech-info">
                  <h5>{{ getVoiceName(formData.voiceId) }}</h5>
                  <p>{{ formData.function === 'multilingual-v2' ? 'Multilingual v2' : 'Turbo 2.5' }}</p>
                  <div class="speech-meta">
                    <span><i class="fas fa-clock"></i> {{ displayResult.duration || 'Unknown Duration' }}</span>
                    <span><i class="fas fa-file-audio"></i> {{ displayResult.format || 'MP3' }}</span>
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
                :src="displayResult.audioUrl" 
                @timeupdate="updateTextToSpeechProgress"
                @loadedmetadata="setTextToSpeechDuration"
                @ended="onTextToSpeechEnded"
              ></audio>
            </div>

            <!-- Speech-to-Text：详情用 outputResults 渲染，非详情用 result -->
            <div v-else-if="(formData.function === 'speech-to-text' || (isDetailView && (detailData?.model === 'elevenlabs_speech_to_text' || detailData?.model === 'speech_to_text'))) && (displayResult?.transcript != null || speechToTextDetailResult)" class="text-result">
              <div class="text-content">
                <h5>Recognition Result</h5>
                <div class="transcript transcript-block">
                  {{ (speechToTextDetailResult?.text ?? displayResult?.transcript) || 'No transcript' }}
                </div>
                <div v-if="sttWordsList.length" class="words-list">
                  <h6>Words Timeline</h6>
                  <!-- 单行 + 横向滚动：时间轴在上，单词在下，一起滑动 -->
                  <div class="timeline-scroll-wrap">
                    <div class="timeline-inner">
                      <!-- 时间轴：对应整段时长，在上方 -->
                      <div v-if="sttTimelineDuration > 0" class="timeline-ruler-single">
                        <template v-for="t in sttRulerTicks" :key="t">
                          <span
                            class="ruler-tick"
                            :style="{ left: (t / sttTimelineDuration * 100) + '%' }"
                          >{{ formatRulerTick(t) }}</span>
                        </template>
                      </div>
                      <!-- 单词单行展示，不换行 -->
                      <div class="timeline-bar timeline-bar-nowrap">
                        <template v-for="(w, idx) in sttWordsList" :key="idx">
                          <span
                            v-if="w.type === 'word'"
                            class="timeline-segment timeline-word"
                            :title="`${w.start.toFixed(2)}s – ${w.end.toFixed(2)}s`"
                            @click="seekSttAudio(w.start)"
                          >{{ w.text }}</span>
                          <span
                            v-else-if="w.type === 'spacing'"
                            class="timeline-segment timeline-spacing"
                            :title="`${w.start.toFixed(2)}s – ${w.end.toFixed(2)}s`"
                          >&nbsp;</span>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="speechToTextDetailResult?.language_code || displayResult?.outputResults?.language_code" class="stt-meta">
                  <span>Language: {{ speechToTextDetailResult?.language_code ?? displayResult?.outputResults?.language_code }}</span>
                </div>
                <audio v-if="sttResultAudioUrl" ref="sttResultAudioRef" :src="sttResultAudioUrl" class="stt-result-audio"></audio>
              </div>
            </div>

            <!-- 音效生成结果 -->
            <div v-else-if="formData.function === 'sound-effect-v2'" class="sound-effect-result">
              <div class="sound-player">
                <div class="sound-info">
                  <h5>{{ formData.soundDescription }}</h5>
                  <p>Generated Sound Effect</p>
                  <div class="sound-meta">
                    <span><i class="fas fa-clock"></i> {{ displayResult.duration || 'Unknown Duration' }}</span>
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
                :src="displayResult.audioUrl" 
                @timeupdate="updateSoundEffectProgress"
                @loadedmetadata="setSoundEffectDuration"
                @ended="onSoundEffectEnded"
              ></audio>
            </div>

            <!-- 音频分离结果：详情用 outputUrls/displayResult 渲染 -->
            <div v-else-if="(formData.function === 'audio-isolation' || (isDetailView && detailData?.model === 'elevenlabs_audio_isolation')) && isolationOutputUrls.length" class="isolation-result">
              <div class="isolation-player">
                <div class="isolation-info">
                  <h5>{{ getIsolationTypeName(formData.isolationType) }}</h5>
                  <p>Isolation Result</p>
                  <div class="isolation-meta">
                    <span><i class="fas fa-cut"></i> {{ formData.isolationType || 'Isolated' }}</span>
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
                :src="isolationOutputUrls[0]"
                @timeupdate="updateIsolationProgress"
                @loadedmetadata="setIsolationDuration"
                @ended="onIsolationEnded"
              ></audio>
              <!-- 多个 output 时逐个展示 -->
              <div v-if="isolationOutputUrls.length > 1" class="isolation-extra-outputs">
                <template v-for="(url, i) in isolationOutputUrls" :key="i">
                  <div v-if="i > 0" class="isolation-extra-item">
                    <span class="isolation-extra-label">Output {{ i + 1 }}</span>
                    <audio controls class="isolation-extra-audio" :src="url"></audio>
                  </div>
                </template>
              </div>
            </div>
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
        <span>AI Audio Isolation: Intelligently isolate vocals and background music</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onBeforeUnmount } from 'vue'
import AudioUpload from '../AudioUpload.vue'
import UploadAudio from './common/UploadAudio.vue'
import { useAuth } from '~/composables/useAuth'
import { useToast } from '~/composables/useToast'
import { useApi } from '~/composables/useApi'
import { useRecordPolling } from '~/composables/useRecordPolling'
import elevenlabsVoices from '~/data/elevenlabs-voices.js'

const router = useRouter()
const route = useRoute()
const { token } = useAuth()

// Tab 与三级路由同步：/home/elevenlabs/multilingual-v2 等
const elevenlabsTabToPath = {
  'multilingual-v2': '/home/elevenlabs/multilingual-v2',
  'turbo-2-5': '/home/elevenlabs/turbo-2-5',
  'speech-to-text': '/home/elevenlabs/speech-to-text',
  'sound-effect-v2': '/home/elevenlabs/sound-effect-v2',
  'audio-isolation': '/home/elevenlabs/audio-isolation'
}
const elevenlabsPathToTab = {
  '/home/elevenlabs/multilingual-v2': 'multilingual-v2',
  '/home/elevenlabs/turbo-2-5': 'turbo-2-5',
  '/home/elevenlabs/speech-to-text': 'speech-to-text',
  '/home/elevenlabs/sound-effect-v2': 'sound-effect-v2',
  '/home/elevenlabs/audio-isolation': 'audio-isolation'
}
function goToElevenLabsTab(tabId) {
  const path = elevenlabsTabToPath[tabId] || elevenlabsTabToPath['multilingual-v2']
  router.push(path)
}
const { showError, showSuccess } = useToast()
const { post } = useApi()
const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling()
const batchUploadUrl = useBatchUploadUrl()

const getAuthToken = () => {
  if (!process.client) return null
  try {
    if (token?.value) return token.value
    return localStorage.getItem('auth_token')
  } catch {
    return localStorage.getItem('auth_token')
  }
}

/** 上传音频到 batch-upload，返回单个 URL */
const uploadAudioToUrl = async (file) => {
  if (!file) return ''
  const formDataUpload = new FormData()
  formDataUpload.append('file', file)
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
  if (!Array.isArray(urls) || !urls[0]) throw new Error('Invalid response: file URL not found')
  return urls[0]
}

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
  language_code: '', // Multilingual v2 / Turbo 2.5
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
    name: 'AI Audio Isolation',
    description: 'Intelligently isolate vocals and background music',
    detailDescription: 'Intelligently isolate vocals and background music, supports multiple audio formats, maximum 10MB, suitable for audio post-processing',
    icon: 'fas fa-cut'
  }
])

const voiceDropdownOpen = ref(false)
const voiceDropdownRef = ref(null)
const playingVoiceId = ref(null)

// 点击外部关闭 Voice 下拉
let voiceDropdownClickOutside = null
watch(voiceDropdownOpen, (open) => {
  if (voiceDropdownClickOutside) {
    document.removeEventListener('click', voiceDropdownClickOutside)
    voiceDropdownClickOutside = null
  }
  if (open) {
    voiceDropdownClickOutside = (e) => {
      if (voiceDropdownRef.value && !voiceDropdownRef.value.contains(e.target)) {
        voiceDropdownOpen.value = false
      }
    }
    setTimeout(() => document.addEventListener('click', voiceDropdownClickOutside), 0)
  }
})
onBeforeUnmount(() => {
  if (voiceDropdownClickOutside) document.removeEventListener('click', voiceDropdownClickOutside)
})

watch(() => formData.function, (newFunction) => {
  const modelMap = {
    'multilingual-v2': 'elevenlabs_text_to_speech_multilingual',
    'turbo-2-5': 'elevenlabs_text_to_speech_turbo',
    'speech-to-text': 'elevenlabs_speech_to_text',
    'sound-effect-v2': 'elevenlabs_sound_effect',
    'audio-isolation': 'elevenlabs_audio_isolation'
  }
  formData.model = modelMap[newFunction] || ''
}, { immediate: true })

// 上传后的音频 URL（speech-to-text / audio-isolation）
const speechFileUrl = ref('')
const isolationFileUrl = ref('')
const isUploadingSpeech = ref(false)
const isUploadingIsolation = ref(false)

// 结果数据
const result = ref(null)

// 路由 path 同步到 formData.function（须在 formData、result 定义之后）
watch(() => route.path, (path) => {
  const tab = elevenlabsPathToTab[path]
  if (tab && formData.function !== tab) {
    formData.function = tab
    result.value = null
  }
}, { immediate: true })

const isGenerating = ref(false)
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

const voicePreviewLoading = ref(false)
const voicePreviewAudio = ref(null)

// 计算属性
const canGenerate = computed(() => {
  if (formData.function === 'multilingual-v2' || formData.function === 'turbo-2-5') {
    return formData.text.trim().length > 0 && (formData.voice || '').trim().length > 0
  } else if (formData.function === 'speech-to-text') {
    return !!speechFileUrl.value
  } else if (formData.function === 'sound-effect-v2') {
    return formData.soundDescription.trim().length > 0
  } else if (formData.function === 'audio-isolation') {
    return !!isolationFileUrl.value
  }
  return false
})

// 方法（Tab 切换改为路由跳转，由 watch route.path 同步 formData.function）
function getElevenLabsRecordPath() {
  return elevenlabsTabToPath[formData.function] || '/home/elevenlabs/multilingual-v2'
}

const getConfigTitle = () => {
  const titles = {
    'multilingual-v2': 'Text-to-Speech Multilingual v2 Configuration',
    'turbo-2-5': 'Text-to-Speech Turbo 2.5 Configuration',
    'speech-to-text': 'Speech-to-Text Configuration',
    'sound-effect-v2': 'Sound Effect v2 Configuration',
    'audio-isolation': 'AI Audio Isolation Configuration'
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
    'multilingual-v2': '20/1K chars',
    'turbo-2-5': '10/1K chars',
    'speech-to-text': '6/minute',
    'sound-effect-v2': '24/minute',
    'audio-isolation': '20/minute'
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

const getVoiceOptionLabel = (v) => {
  if (!v.description || v.description.trim() === '') return v.name
  return `${v.name} – ${v.description}`
}

const selectedVoiceLabel = computed(() => {
  if (!formData.voice) return 'Select voice'
  const v = elevenlabsVoices.find((x) => x.id === formData.voice)
  return v ? getVoiceOptionLabel(v) : formData.voice
})

const getVoiceName = (voiceId) => {
  if (!voiceId) return 'Unknown Voice'
  const v = elevenlabsVoices.find((item) => item.id === voiceId)
  return v ? v.name : voiceId
}

// 与 scripts/download-elevenlabs-previews.cjs 一致：本地试听路径
const getPreviewPath = (voiceId) => {
  if (!voiceId) return ''
  const safe = String(voiceId).replace(/[^a-zA-Z0-9._-]/g, '_')
  return `/elevenlabs-previews/${safe}.mp3`
}

const playVoicePreviewFor = (voiceId) => {
  if (!voiceId) return
  if (voicePreviewAudio.value) {
    try { voicePreviewAudio.value.pause() } catch (_) {}
    voicePreviewAudio.value = null
  }
  playingVoiceId.value = voiceId
  voicePreviewLoading.value = true
  const audioUrl = getPreviewPath(voiceId)
  const audio = new Audio(audioUrl)
  voicePreviewAudio.value = audio
  const clear = () => {
    voicePreviewLoading.value = false
    if (playingVoiceId.value === voiceId) playingVoiceId.value = null
  }
  audio.play().catch((e) => {
    clear()
    showError(e?.message || 'Playback failed')
  })
  audio.onended = clear
  audio.onerror = () => { clear(); showError('Preview file not found') }
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

// 文件上传处理：上传到 batch-upload 后保存 URL
const handleSpeechAudioUpdate = async (files) => {
  if (!files || (Array.isArray(files) && files.length === 0)) {
    speechFileUrl.value = ''
    formData.uploadedSpeechFile = null
    return
  }
  const file = Array.isArray(files) ? files[0] : files
  formData.uploadedSpeechFile = file
  isUploadingSpeech.value = true
  try {
    speechFileUrl.value = await uploadAudioToUrl(file)
  } catch (e) {
    showError(e.message || 'Failed to upload audio')
    speechFileUrl.value = ''
    formData.uploadedSpeechFile = null
  } finally {
    isUploadingSpeech.value = false
  }
}

const handleIsolationAudioUpdate = async (files) => {
  if (!files || (Array.isArray(files) && files.length === 0)) {
    isolationFileUrl.value = ''
    formData.uploadedIsolationFile = null
    return
  }
  const file = Array.isArray(files) ? files[0] : files
  formData.uploadedIsolationFile = file
  isUploadingIsolation.value = true
  try {
    isolationFileUrl.value = await uploadAudioToUrl(file)
  } catch (e) {
    showError(e.message || 'Failed to upload audio')
    isolationFileUrl.value = ''
    formData.uploadedIsolationFile = null
  } finally {
    isUploadingIsolation.value = false
  }
}

const clamp01 = (v) => v == null ? undefined : Math.min(1, Math.max(0, Number(v)))
const clampSpeed = (v) => v == null ? 1 : Math.min(1.2, Math.max(0.7, Number(v)))
const clampDurationSec = (v) => v == null ? undefined : Math.min(22, Math.max(0.5, Number(v)))

const resolveAudioUrl = (data) => data?.audioUrl ?? data?.data?.audioUrl ?? data?.outputUrls?.[0] ?? (Array.isArray(data?.outputUrls) && data.outputUrls[0] ? data.outputUrls[0] : null)

// 详情页：仅从 URL 读取 record-id
const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)
const loadingRecordId = ref(null)

const displayResult = computed(() => {
  if (isDetailView.value && detailData.value?.status === 2) {
    const d = detailData.value
    const od = d.originalData || {}
    if (d.outputUrls?.length) {
      const audioUrl = typeof d.outputUrls[0] === 'string' ? d.outputUrls[0] : d.outputUrls[0]?.url
      return { ...od, audioUrl, transcript: d.transcript ?? od.transcript }
    }
    if ((d.model === 'elevenlabs_speech_to_text' || d.model === 'speech_to_text') && d.outputResults) {
      return {
        ...od,
        transcript: d.outputResults.text || '',
        outputResults: d.outputResults,
        audioUrl: od.audioUrl || od.audio_url
      }
    }
  }
  return result.value
})

const speechToTextDetailResult = computed(() => {
  if (isDetailView.value && detailData.value?.status === 2 && detailData.value?.outputResults) return detailData.value.outputResults
  if (displayResult.value?.outputResults) return displayResult.value.outputResults
  return null
})

// 时间轴：words 列表、总时长、刻度
const sttWordsList = computed(() => {
  const words = speechToTextDetailResult.value?.words || displayResult.value?.outputResults?.words || []
  return Array.isArray(words) ? words : []
})

const sttTimelineDuration = computed(() => {
  if (!sttWordsList.value.length) return 0
  return Math.max(...sttWordsList.value.map(w => Number(w.end) || 0), 0)
})

const sttRulerTicks = computed(() => {
  const d = sttTimelineDuration.value
  if (d <= 0) return []
  const step = d <= 10 ? 1 : d <= 60 ? 5 : 10
  const ticks = []
  for (let t = 0; t <= Math.ceil(d); t += step) ticks.push(t)
  return ticks
})

function formatRulerTick(t) {
  return Number(t) === parseInt(t, 10) ? t + 's' : Number(t).toFixed(1) + 's'
}

function getSegmentWidth(w) {
  const dur = sttTimelineDuration.value
  if (!dur) return 0
  const segDur = (Number(w.end) || 0) - (Number(w.start) || 0)
  const pct = (segDur / dur) * 100
  return w.type === 'spacing' && segDur <= 0 ? 0.3 : Math.max(pct, 0.5)
}

const sttResultAudioUrl = computed(() => detailOriginalAudioUrl.value || displayResult.value?.audioUrl || '')

function seekSttAudio(sec) {
  const el = sttResultAudioRef.value
  if (el && sttResultAudioUrl.value) {
    el.currentTime = Number(sec) || 0
    el.play().catch(() => {})
  }
}

const sttResultAudioRef = ref(null)

// 详情页 Speech-to-Text 回显的原始音频 URL（用于左侧表单展示播放器）
const detailOriginalAudioUrl = computed(() => {
  if (!isDetailView.value || formData.function !== 'speech-to-text') return ''
  const od = detailData.value?.originalData
  if (od?.audioUrl) return od.audioUrl
  return speechFileUrl.value || ''
})

// 详情页 Audio Isolation 回显的原始音频 URL
const detailIsolationOriginalAudioUrl = computed(() => {
  if (!isDetailView.value || formData.function !== 'audio-isolation') return ''
  const od = detailData.value?.originalData
  if (od?.audioUrl) return od.audioUrl
  return isolationFileUrl.value || ''
})

// 音频分离结果：output 音频 URL 列表（用于主播放器 + 多 output 列表）
const isolationOutputUrls = computed(() => {
  if (isDetailView.value && detailData.value?.outputUrls?.length) {
    return detailData.value.outputUrls.map(u => typeof u === 'string' ? u : u?.url).filter(Boolean)
  }
  const dr = displayResult.value
  if (dr?.audioUrl) return [dr.audioUrl]
  if (Array.isArray(dr?.outputUrls) && dr.outputUrls.length) return dr.outputUrls.map(u => typeof u === 'string' ? u : u?.url).filter(Boolean)
  return []
})

function fillFormFromOriginalData(originalData) {
  if (!originalData || typeof originalData !== 'object') return
  const o = originalData
  Object.keys(formData).forEach(k => { if (o[k] !== undefined && k in formData) formData[k] = o[k] })
  if (o.voiceSettings && typeof o.voiceSettings === 'object') Object.assign(formData.voiceSettings, o.voiceSettings)
  if (o.function) formData.function = o.function
  if (o.model === 'elevenlabs_speech_to_text' || o.model === 'speech_to_text') formData.function = 'speech-to-text'
  if (o.model === 'elevenlabs_sound_effect') formData.function = 'sound-effect-v2'
  if (o.model === 'elevenlabs_audio_isolation') formData.function = 'audio-isolation'
  // 后端 camelCase / 不同字段名 -> 表单回显
  if (o.languageCode !== undefined) {
    formData.language = o.languageCode
    formData.language_code = o.languageCode
  }
  if (o.diarize !== undefined) formData.speakerIdentification = !!o.diarize
  if (o.tagAudioEvents !== undefined) formData.audioEvents = !!o.tagAudioEvents
  if (o.previousText !== undefined) formData.previous_text = o.previousText
  if (o.nextText !== undefined) formData.next_text = o.nextText
  if (o.audioUrl) {
    if (formData.function === 'speech-to-text' || o.model === 'elevenlabs_speech_to_text' || o.model === 'speech_to_text') speechFileUrl.value = o.audioUrl
    if (formData.function === 'audio-isolation' || o.model === 'elevenlabs_audio_isolation') isolationFileUrl.value = o.audioUrl
  }
  // Sound Effect v2
  if (o.text !== undefined) formData.soundDescription = o.text
  if (o.durationSeconds !== undefined) formData.duration = Number(o.durationSeconds)
  if (o.promptInfluence !== undefined) formData.intensity = Number(o.promptInfluence)
  if (o.loop !== undefined) formData.loop = !!o.loop
  if (o.outputFormat !== undefined) formData.outputFormat = o.outputFormat
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
  } catch (e) { console.error('Load record detail failed:', e) }
  finally { if (loadingRecordId.value === recordId) loadingRecordId.value = null }
}

watch(() => route.query['record-id'], (recordId) => {
  if (recordId) loadDetailByRecordId(recordId)
  else { loadingRecordId.value = null; detailData.value = null }
}, { immediate: true })

const generateContent = async () => {
  if (formData.function === 'multilingual-v2' || formData.function === 'turbo-2-5') {
    if (!(formData.voice || '').trim()) {
      showError('Please select a voice')
      return
    }
  } else if (formData.function === 'speech-to-text') {
    if (!speechFileUrl.value) {
      showError('Please upload an audio file')
      return
    }
  }
  isGenerating.value = true
  try {
    if (formData.function === 'multilingual-v2' || formData.function === 'turbo-2-5') {
      const body = {
        model: formData.model,
        text: formData.text.trim(),
        voice: formData.voice?.trim() || undefined,
        stability: clamp01(formData.voiceSettings?.stability),
        similarityBoost: clamp01(formData.voiceSettings?.similarity_boost),
        style: clamp01(formData.voiceSettings?.style),
        speed: clampSpeed(formData.voiceSettings?.speed),
        timestamps: !!formData.timestamps,
        previousText: formData.previous_text?.trim() || undefined,
        nextText: formData.next_text?.trim() || undefined,
        languageCode: formData.language_code?.trim() || undefined
      }
      const data = await post('/api/audio/elevenLabs/text-to-speech', body)
      const rid = data?.recordId ?? data?.data?.recordId
      if (rid) { router.push(getElevenLabsRecordPath() + '?record-id=' + encodeURIComponent(rid)); return }
      const audioUrl = resolveAudioUrl(data)
      result.value = { ...data, audioUrl }
    } else if (formData.function === 'speech-to-text') {
      const body = {
        model: formData.model,
        audioUrl: speechFileUrl.value,
        languageCode: (formData.language && formData.language !== 'auto') ? formData.language : undefined,
        tagAudioEvents: !!formData.audioEvents,
        diarize: !!formData.speakerIdentification
      }
      const data = await post('/api/audio/elevenLabs/speech-to-text', body)
      const rid = data?.recordId ?? data?.data?.recordId
      if (rid) { router.push(getElevenLabsRecordPath() + '?record-id=' + encodeURIComponent(rid)); return }
      result.value = data
    } else if (formData.function === 'sound-effect-v2') {
      const body = {
        model: formData.model,
        text: formData.soundDescription.trim(),
        loop: !!formData.loop,
        durationSeconds: clampDurationSec(formData.duration),
        promptInfluence: clamp01(formData.intensity),
        outputFormat: formData.outputFormat || 'mp3_44100_128'
      }
      const data = await post('/api/audio/elevenLabs/sound-effect-v2', body)
      const rid = data?.recordId ?? data?.data?.recordId
      if (rid) { router.push(getElevenLabsRecordPath() + '?record-id=' + encodeURIComponent(rid)); return }
      const audioUrl = resolveAudioUrl(data)
      result.value = { ...data, audioUrl }
    } else if (formData.function === 'audio-isolation') {
      const body = {
        model: formData.model,
        audioUrl: isolationFileUrl.value
      }
      const data = await post('/api/audio/elevenLabs/audio-isolation', body)
      const rid = data?.recordId ?? data?.data?.recordId
      if (rid) { router.push(getElevenLabsRecordPath() + '?record-id=' + encodeURIComponent(rid)); return }
      const audioUrl = resolveAudioUrl(data)
      result.value = { ...data, audioUrl }
    }
  } catch (error) {
    console.error('Generation failed:', error)
    if (!error?.__fromApi) showError(error?.message || 'Request failed')
  } finally {
    isGenerating.value = false
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
  if (displayResult.value?.audioUrl) {
    const link = document.createElement('a')
    link.href = displayResult.value.audioUrl
    link.download = `elevenlabs-${formData.function}.mp3`
    link.click()
  }
}

const shareResult = () => {
  if (navigator.share && displayResult.value) {
    navigator.share({
      title: `ElevenLabs ${getButtonText()}`,
      text: `听听我使用ElevenLabs生成的内容`,
      url: displayResult.value.audioUrl
    })
  } else {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(displayResult.value.audioUrl)
    showSuccess('Link copied to clipboard')
  }
}
</script>

<style scoped>
/* 功能选择区域：统一 mode-tabs 样式，主色 #6366f1 */
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
  border-color: #6366f1;
  color: #6366f1;
}

.mode-tab.active {
  background: #6366f1;
  color: #fff;
  border-color: #6366f1;
}

.mode-tab i {
  font-size: 1em;
}

.mode-tab span {
  font-weight: 500;
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

.detail-audio-replay {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.detail-audio-replay .detail-audio-label {
  margin-bottom: 8px;
  color: #64748b;
  font-size: 13px;
}

.detail-audio-wrap {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
}

.detail-audio-player {
  width: 100%;
  max-width: 100%;
  height: 40px;
}

/* 详情页禁用时，整块表单不可操作（fieldset :disabled 已处理） */
.config-fieldset:disabled .detail-audio-replay {
  pointer-events: none;
  opacity: 0.9;
}

.config-fieldset:disabled .detail-audio-player {
  pointer-events: auto;
}

/* Voice 下拉（选项内播放按钮） */
.voice-dropdown {
  position: relative;
  width: 100%;
  max-width: 100%;
}

.voice-dropdown-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: border-color 0.2s;
  text-align: left;
}

.voice-dropdown-trigger:hover,
.voice-dropdown-trigger.open {
  border-color: #6366f1;
}

.voice-trigger-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.voice-trigger-arrow {
  flex-shrink: 0;
  margin-left: 8px;
  font-size: 12px;
  color: #64748b;
  transition: transform 0.2s;
}

.voice-dropdown-trigger.open .voice-trigger-arrow {
  transform: rotate(180deg);
}

.voice-dropdown-panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 280px;
  overflow-y: auto;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 50;
}

.voice-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
  transition: background 0.15s;
  border-bottom: 1px solid #f1f5f9;
}

.voice-option:last-child {
  border-bottom: none;
}

.voice-option:hover {
  background: #f8fafc;
}

.voice-option.active {
  background: #eef2ff;
  color: #6366f1;
}

.voice-option-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.voice-option-play {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
}

.voice-option-play:hover:not(:disabled) {
  background: #5a67d8;
}

.voice-option-play:disabled {
  opacity: 0.8;
  cursor: default;
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

.isolation-extra-outputs {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.isolation-extra-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.isolation-extra-label {
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
}

.isolation-extra-audio {
  width: 100%;
  max-width: 100%;
  height: 40px;
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

.transcript-block {
  white-space: pre-wrap;
  word-break: break-word;
}

.words-list {
  margin-top: 16px;
}

.words-list h6 {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}

.timeline-ruler {
  position: relative;
  height: 24px;
  margin-bottom: 10px;
  padding: 0 4px;
  background: linear-gradient(to right, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.timeline-scroll-wrap {
  overflow-x: auto;
  overflow-y: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
}

.timeline-inner {
  min-width: min-content;
  padding: 0 12px 12px;
}

.timeline-ruler-single {
  position: relative;
  height: 24px;
  margin-bottom: 6px;
  padding-top: 4px;
  background: linear-gradient(to right, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 6px 6px 0 0;
}

.ruler-tick {
  position: absolute;
  transform: translateX(-50%);
  font-size: 11px;
  color: #64748b;
  font-weight: 500;
}

.timeline-bar {
  display: flex;
  gap: 6px 10px;
  padding: 14px 18px;
  min-height: 48px;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.timeline-bar-nowrap {
  flex-wrap: nowrap;
  width: max-content;
}

.timeline-segment {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.timeline-word {
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 14px;
  line-height: 1.4;
  cursor: pointer;
  transition: background 0.2s;
  min-width: 1em;
  white-space: nowrap;
}

.timeline-word:hover {
  background: #bae6fd;
}

.timeline-spacing {
  width: 0.25em;
  min-width: 4px;
  user-select: none;
  pointer-events: none;
}

.stt-result-audio {
  display: none;
}

.stt-meta {
  margin-top: 12px;
  font-size: 12px;
  color: #64748b;
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

@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }
  
  .config-panel,
  .result-panel {
    width: 100%;
  }
}

/* 响应式设计 */
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
  
  .mode-tabs {
    gap: 6px;
  }
  
  .mode-tab {
    padding: 8px 12px;
    font-size: 13px;
  }
}
</style>