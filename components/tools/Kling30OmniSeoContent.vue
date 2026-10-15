<template>
  <div
    id="kling-3-0-omni-section"
    class="kling-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Kling 3.0 Omni Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Kling 3.0 Omni text, image and reference-to-video on FuseAITools—3–15s clips at 720p/1080p/4K with native audio, smart or custom multi-shot, and reusable subject elements."
    />

    <div class="version-badge">🌐 Kling 3.0 Omni · Text · Image · Reference · 3–15s · up to 4K</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🌐 Kling 3.0 Omni on FuseAITools</h2>
      <p class="tool-sub">
        <strong>Kling 3.0 Omni</strong> is the most flexible member of the Kling 3.x family on
        <a href="/" class="seo-inline-link">FuseAITools</a>—three workflows (<strong>Text to Video</strong>,
        <strong>Image to Video</strong>, and <strong>Reference to Video</strong>) sharing a rich control set:
        prompt up to <strong>3072 characters</strong>, <strong>3–15s</strong> duration,
        <strong>720p / 1080p / 4K</strong> resolution, optional <strong>native audio</strong>, and
        <strong>smart</strong> or <strong>custom</strong> multi-shot. You can attach reusable <strong>subject
        elements</strong> (characters or objects) and reference them with <code>@name</code>. New users receive
        <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Kling 3.0 Omni Core Features</h2>
      <div class="feature-grid">
        <div v-for="(f, i) in coreFeatures" :key="i" class="feature-card">
          <div class="feature-icon" aria-hidden="true">{{ f.icon }}</div>
          <div class="feature-title">{{ f.title }}</div>
          <p v-html="f.description" />
        </div>
      </div>
    </section>

    <section class="info-section" aria-labelledby="scenarios-heading">
      <h2 id="scenarios-heading" class="section-title">🎯 Built for These Scenarios</h2>
      <div class="scenario-list">
        <span v-for="tag in scenarioTags" :key="tag" class="scenario-badge">{{ tag }}</span>
      </div>
    </section>

    <section class="info-section" aria-labelledby="compare-heading">
      <h2 id="compare-heading" class="section-title">📊 Omni Text vs Image vs Reference</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling 3.0 Omni three workflows">
          <thead>
            <tr><th>Dimension</th><th>Text to Video</th><th>Image to Video</th><th>Reference to Video</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Main input</strong></td>
              <td>Prompt only</td>
              <td>One first-frame image + prompt</td>
              <td>Up to 7 images + up to 3 role videos + prompt</td>
            </tr>
            <tr>
              <td><strong>Aspect ratio</strong></td>
              <td>16:9 / 9:16 / 1:1</td>
              <td><code>auto</code> (custom shots may set ratio)</td>
              <td>16:9 / 9:16 / 1:1 (only without a reference video)</td>
            </tr>
            <tr>
              <td><strong>Duration</strong></td>
              <td colspan="3">3–15 seconds (single/smart) or per-shot total (custom)</td>
            </tr>
            <tr>
              <td><strong>Resolution</strong></td>
              <td colspan="3">720p / 1080p / 4K</td>
            </tr>
            <tr>
              <td><strong>Audio</strong></td>
              <td>Optional native audio</td>
              <td>Optional native audio</td>
              <td>Off when a reference video is used</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="shotmode-heading">
      <h2 id="shotmode-heading" class="section-title">🎬 Single, Smart &amp; Custom Multi-Shot</h2>
      <p class="tool-sub">
        Omni's shot ladder sits between the streamlined <a href="/home/kling/v3-turbo-text-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v3-turbo-text-to-video')">V3 Turbo</a>
        and the director-grade <a href="/home/kling/v3-0-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v3-0-video')">3.0 Video</a>:
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling 3.0 Omni shot modes">
          <thead>
            <tr><th>Mode</th><th>What it does</th><th>Constraints</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Single</strong></td>
              <td>One prompt drives the whole clip</td>
              <td>Duration 3–15s</td>
            </tr>
            <tr>
              <td><strong>Smart</strong></td>
              <td>Model auto-splits your prompt into shots (preferMultiShots)</td>
              <td>Cannot combine with Custom</td>
            </tr>
            <tr>
              <td><strong>Custom</strong></td>
              <td>Define each shot's prompt and duration (customizeMultiShots)</td>
              <td>1–6 shots, each 1–12s, total ≤15s</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Kling 3.0 Omni)</h2>
      <div class="faq-list">
        <div v-for="(faq, index) in faqItems" :key="index" class="faq-item" :class="{ open: openFaqIndex === index }">
          <button type="button" class="faq-question" :aria-expanded="openFaqIndex === index" @click="toggleFaq(index)">
            <span>{{ faq.question }}</span>
            <span class="faq-toggle" aria-hidden="true">{{ openFaqIndex === index ? '➖' : '➕' }}</span>
          </button>
          <div v-show="openFaqIndex === index" class="faq-answer"><div v-html="faq.answer" /></div>
        </div>
      </div>
    </section>

    <section class="info-section" aria-labelledby="tech-heading">
      <h2 id="tech-heading" class="section-title">⚙️ Kling 3.0 Omni Technical Specs</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling 3.0 Omni capabilities">
          <thead>
            <tr><th>Workflow</th><th>modelKey</th><th>Required</th><th>Key controls</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Omni Text to Video</strong></td>
              <td><code>kling-3.0-omni-text-to-video</code></td>
              <td>Prompt (≤3072)</td>
              <td>Duration 3–15s; aspect 16:9/9:16/1:1; resolution 720p/1080p/4k; audio; shot modes; elements</td>
            </tr>
            <tr>
              <td><strong>Omni Image to Video</strong></td>
              <td><code>kling-3.0-omni-image-to-video</code></td>
              <td>Prompt (≤3072) + 1 first-frame image</td>
              <td>Aspect auto unless custom; duration 3–15s; resolution; audio; elements</td>
            </tr>
            <tr>
              <td><strong>Omni Reference to Video</strong></td>
              <td><code>kling-3.0-omni-reference-to-video</code></td>
              <td>Prompt (≤3072)</td>
              <td>≤7 images + ≤3 videos; resolution 720p/1080p/4k; with-video pricing when a video is present</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">Pricing is <strong>per second</strong>, keyed on <strong>resolution</strong> (720p / 1080p / 4K) and <strong>scene</strong>—<code>no_audio</code> / <code>with_audio</code>, or <code>with_video</code> when a reference video is uploaded (Reference to Video only). Total credits appear on the Generate button.</p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Kling 3.0 Omni — Three Workflows</h2>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in videoWorkflows"
          :key="item.path"
          :to="item.path"
          class="model-mode-card"
          :class="{ 'model-mode-card--current': isCurrentMode(item.path) }"
          @click.prevent="handleModeClick(item.path)"
        >
          <div class="model-mode-icon" aria-hidden="true"><i :class="item.icon" /></div>
          <h3 class="model-mode-title">{{ item.title }}</h3>
          <p class="model-mode-name">{{ item.name }}</p>
          <p class="model-mode-desc">{{ item.description }}</p>
          <span class="model-mode-cta">{{ isCurrentMode(item.path) ? 'Current workflow' : 'Open this workflow →' }}</span>
        </NuxtLink>
      </div>
    </section>

    <div class="upgrade-tip pricing-tip">
      💳 New users get <strong>20 free credits</strong> on sign-up.
      <a href="/pricing" class="seo-pricing-link">View pricing</a>
      for subscription discounts and credit top-ups.
    </div>

    <div class="upgrade-tip">
      🎬 Want per-shot elements with start/end frames, or a faster cheaper lane?
      <a href="/home/kling/v3-0-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v3-0-video')">Explore Kling 3.0 Video →</a>
      for director-grade multi-shot, or
      <a href="/home/kling/v3-turbo-text-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v3-turbo-text-to-video')">Kling V3 Turbo</a>
      for a streamlined 720p/1080p fast lane.
    </div>

    <div class="upgrade-tip">
      🔄 Already have a clip to restyle?
      <a href="/home/kling/3-0-omni-transformation" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/3-0-omni-transformation')">Try Kling 3.0 Omni Video Transformation →</a>
      —transform one uploaded source video (billed by its actual length) with a prompt and optional reference images.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  { name: 'Kling 3.0 Omni Text to Video', title: 'Omni T2V', description: 'Prompt to video with audio, multi-shot and elements.', path: '/home/kling/3-0-omni-text-to-video', icon: 'fas fa-keyboard' },
  { name: 'Kling 3.0 Omni Image to Video', title: 'Omni I2V', description: 'Animate one first-frame image, 3–15s, up to 4K.', path: '/home/kling/3-0-omni-image-to-video', icon: 'fas fa-image' },
  { name: 'Kling 3.0 Omni Reference to Video', title: 'Omni R2V', description: 'Combine up to 7 images + 3 role videos.', path: '/home/kling/3-0-omni-reference-to-video', icon: 'fas fa-layer-group' }
]

const workflowIntroMap = {
  '/home/kling/3-0-omni-text-to-video': {
    title: '🌐 Kling 3.0 Omni Text to Video',
    lead: 'Type a prompt (≤<strong>3072</strong> chars), pick <strong>aspect ratio</strong> (16:9 / 9:16 / 1:1), <strong>resolution</strong> (720p / 1080p / 4K), a <strong>3–15s</strong> duration, toggle <strong>audio</strong>, and choose <strong>single / smart / custom</strong> shots. Add reusable <strong>elements</strong> referenced by <code>@name</code>. Credits bill <strong>per second</strong>.'
  },
  '/home/kling/3-0-omni-image-to-video': {
    title: '🖼️ Kling 3.0 Omni Image to Video',
    lead: 'Upload <strong>one first-frame image</strong> (JPG/PNG, ≤50MB, min 300px) plus a prompt (≤<strong>3072</strong>). Single/smart shots follow the input frame (<code>auto</code> aspect); custom multi-shot lets you set a ratio. Choose <strong>720p / 1080p / 4K</strong>, duration and audio. Billed per second.'
  },
  '/home/kling/3-0-omni-reference-to-video': {
    title: '🧩 Kling 3.0 Omni Reference to Video',
    lead: 'Combine up to <strong>7 reference images</strong> and up to <strong>3 character videos</strong> with a prompt (≤<strong>3072</strong>). When a reference video is present, pricing switches to the <code>with_video</code> scene and audio is disabled. Output <strong>720p / 1080p / 4K</strong>, 3–15s.'
  }
}

const workflowDefinitionMap = {
  '/home/kling/3-0-omni-text-to-video': {
    title: 'What is Kling 3.0 Omni Text to Video?',
    body: '<strong>Kling 3.0 Omni Text to Video</strong> (<code>kling-3.0-omni-text-to-video</code>)—the flagship prompt-to-video tier with a 3–15s duration, 720p/1080p/4K resolution, native audio, smart/custom multi-shot, and subject elements.'
  },
  '/home/kling/3-0-omni-image-to-video': {
    title: 'What is Kling 3.0 Omni Image to Video?',
    body: '<strong>Kling 3.0 Omni Image to Video</strong> (<code>kling-3.0-omni-image-to-video</code>)—animate a single first-frame image over 3–15s at up to 4K, with audio, multi-shot modes and elements. Aspect is <code>auto</code> unless you use custom shots.'
  },
  '/home/kling/3-0-omni-reference-to-video': {
    title: 'What is Kling 3.0 Omni Reference to Video?',
    body: '<strong>Kling 3.0 Omni Reference to Video</strong> (<code>kling-3.0-omni-reference-to-video</code>)—steer generation with up to 7 reference images and 3 character videos plus a prompt. A reference video triggers <code>with_video</code> pricing.'
  }
}

const workflowFaqMap = {
  '/home/kling/3-0-omni-text-to-video': [
    { question: 'What are smart and custom multi-shot on Omni?', answer: '<strong>Smart</strong> (preferMultiShots) lets the model split your prompt into shots automatically. <strong>Custom</strong> (customizeMultiShots) lets you define each shot\'s prompt and duration—1–6 shots, each 1–12s, total ≤15s. The two are mutually exclusive.' },
    { question: 'How do subject elements work?', answer: 'Add named elements (a character or object) with media; reference them in prompts as <code>@name</code> for consistent identity across shots.' }
  ],
  '/home/kling/3-0-omni-image-to-video': [
    { question: 'What image does Omni Image to Video need?', answer: 'Exactly <strong>one</strong> first-frame image (JPG/JPEG/PNG, ≤50MB, min 300px, aspect 0.4–2.5) plus a prompt.' },
    { question: 'Why can\'t I pick an aspect ratio on single shot?', answer: 'Single and smart shots inherit the input frame, so aspect is <code>auto</code>. Switch to <strong>custom</strong> multi-shot to set 16:9 / 9:16 / 1:1.' }
  ],
  '/home/kling/3-0-omni-reference-to-video': [
    { question: 'How many reference images and videos can I upload?', answer: 'Up to <strong>7 images</strong> and up to <strong>3 character videos</strong>. Mixed subject counts are validated by the vendor.' },
    { question: 'Why is audio disabled when I add a reference video?', answer: 'With a reference video the workflow bills the <code>with_video</code> scene and audio is not applied; remove the video to enable native audio.' }
  ]
}

const commonFaq = [
  { question: 'Do I need a local GPU for Kling 3.0 Omni?', answer: 'No—Omni runs in the cloud. All three workflows bill per output second at the selected resolution and scene.' },
  { question: 'How is Kling 3.0 Omni priced on FuseAITools?', answer: 'Per-second RULE pricing keyed on resolution (720p / 1080p / 4K) and scene (<code>no_audio</code> / <code>with_audio</code>, plus <code>with_video</code> for reference-to-video with a video) × clip duration. Total credits show on the Generate button. See <a href="/pricing" class="seo-pricing-link">pricing</a>.' }
]

const workflowIntro = computed(() => workflowIntroMap[route.path.replace(/\/$/, '')] || null)
const workflowDefinition = computed(() => workflowDefinitionMap[route.path.replace(/\/$/, '')] || null)
const faqItems = computed(() => [...(workflowFaqMap[route.path.replace(/\/$/, '')] || []), ...commonFaq])
useToolSeoFaqSchema(faqItems)

const coreFeatures = [
  { icon: '🌐', title: 'Three Workflows', description: 'Text, image and reference inputs share one rich Omni control set.' },
  { icon: '🎞️', title: '4K & 3–15s', description: 'Up to <strong>4K</strong> output with a continuous <strong>3–15s</strong> duration.' },
  { icon: '🔊', title: 'Native Audio', description: 'Optional synchronized sound—billed as the <code>with_audio</code> scene.' },
  { icon: '🎬', title: 'Smart + Custom Shots', description: 'Auto shot-splitting or hand-tuned 1–6 shot sequences.' },
  { icon: '🧩', title: 'Subject Elements', description: 'Reusable characters/objects referenced by <code>@name</code>.' },
  { icon: '☁️', title: 'Cloud on FuseAITools', description: 'Per-second credits shown before you generate.' }
]

const scenarioTags = ['Narrative multi-shot', 'Character consistency', 'Reference-driven scenes', 'Premium 4K clips', 'Social + audio']

function isCurrentMode(path) { return route.path === path || route.path === `${path}/` }
watchRouteScroll((path) => path.includes('/home/kling/3-0-omni-'))

const openFaqIndex = ref(0)
function toggleFaq(index) { openFaqIndex.value = openFaqIndex === index ? -1 : index }
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
