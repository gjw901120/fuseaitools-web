<template>
  <div
    id="kling-v30-section"
    class="kling-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Kling 3.0 Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Kling 3.0 Video and Motion Control on FuseAITools—multi-shot director mode, 3–15s clips, std/pro quality, and advanced motion transfer."
    />

    <div class="version-badge">🎬 Kling 3.0 · Director Mode · Multi-Shot · std/pro</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎬 Kling 3.0 on FuseAITools</h2>
      <p class="tool-sub">
        Kling <strong>3.0</strong> is Kuaishou's top scene-generation tier on
        <a href="/" class="seo-inline-link">FuseAITools</a>—<strong>3.0 Video</strong> for single- or
        multi-shot storytelling (3–15s, std/pro) and <strong>3.0 Motion Control</strong> for advanced pose
        transfer with background source control. Compared to
        <a href="/home/kling/v2-6-text-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v2-6-text-to-video')">Kling 2.6</a>,
        3.0 adds longer flexible duration, multi-shot editing, and per-shot elements. New users receive
        <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Kling 3.0 Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Kling 3.0 Video vs 3.0 Motion Control</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling 3.0 Video vs Motion Control">
          <thead>
            <tr><th>Dimension</th><th>3.0 Video</th><th>3.0 Motion Control</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Input</strong></td>
              <td>Shot prompt(s); optional start/end frames</td>
              <td>Reference image + video (+ optional prompt)</td>
            </tr>
            <tr>
              <td><strong>Duration</strong></td>
              <td><strong>3–15s</strong> (single or multi-shot ≤5)</td>
              <td>Matches reference video length</td>
            </tr>
            <tr>
              <td><strong>Quality</strong></td>
              <td>std / pro</td>
              <td>std (720p) / pro (1080p)</td>
            </tr>
            <tr>
              <td><strong>Unique</strong></td>
              <td>Multi-shot, per-shot elements (2–50 imgs)</td>
              <td>Background source (video vs image)</td>
            </tr>
            <tr>
              <td><strong>Pricing</strong></td>
              <td>Per second × total output duration</td>
              <td>Per second × reference video duration</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Kling 3.0)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Kling 3.0 Technical Specs</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling 3.0 capabilities">
          <thead>
            <tr><th>Workflow</th><th>modelKey</th><th>Required</th><th>Key controls</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>3.0 Video</strong></td>
              <td><code>kling-3.0-video</code></td>
              <td>Shot prompt(s)</td>
              <td>Single/multi-shot; 3–15s; std/pro; sound; optional frames/elements</td>
            </tr>
            <tr>
              <td><strong>3.0 Motion Control</strong></td>
              <td><code>kling-3.0-motion-control</code></td>
              <td>Reference image + video</td>
              <td>std/pro; background_source; optional prompt (≤2500)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">Multi-shot: up to <strong>5 shots</strong>, each 1–12s, total 3–15s; sound required. Per-shot elements: 2–50 reference images.</p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Kling 3.0 — Two Workflows</h2>
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
      👤 Need a talking-head presenter to cut with your 3.0 scenes?
      <a href="/home/kling/ai-avatar-standard" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/ai-avatar-standard')">Try Kling AI Avatar Standard →</a>
      for audio-driven lip-sync—or
      <a href="/home/kling/ai-avatar-pro" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/ai-avatar-pro')">AI Avatar Pro</a>
      for higher-quality presenter output. Pair with
      <a href="/home/elevenlabs/multilingual-v2" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/elevenlabs/multilingual-v2')">ElevenLabs TTS</a>
      to generate narration first.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  { name: 'Kling 3.0 Video', title: '3.0 Video', description: 'Single/multi-shot, 3–15s, std/pro, elements.', path: '/home/kling/v3-0-video', icon: 'fas fa-film' },
  { name: 'Kling 3.0 Motion Control', title: '3.0 Motion Control', description: 'std/pro motion transfer + background source.', path: '/home/kling/v3-0-motion-control', icon: 'fas fa-bezier-curve' }
]

const workflowIntroMap = {
  '/home/kling/v3-0-video': {
    title: '🎬 Kling 3.0 Video',
    lead: '<strong>std/pro</strong> director mode. <strong>Single shot</strong>: one prompt (3–15s), optional start/end frames, aspect ratio, sound. <strong>Multi-shot</strong>: ≤<strong>5 shots</strong> (1–12s each, total 3–15s)—sound required; optional per-shot elements (2–50 images).'
  },
  '/home/kling/v3-0-motion-control': {
    title: '🎭 Kling 3.0 Motion Control',
    lead: 'Reference <strong>image + video</strong>, optional prompt (≤2500). <strong>std</strong> (720p) or <strong>pro</strong> (1080p); set <strong>background source</strong> from video or image. Per-second pricing from reference length.'
  }
}

const workflowDefinitionMap = {
  '/home/kling/v3-0-video': {
    title: 'What is Kling 3.0 Video?',
    body: '<strong>Kling 3.0 Video</strong> (<code>kling-3.0-video</code>)—single-shot (3–15s) or multi-shot (≤5 shots, total 3–15s). std/pro; optional start/end frames and per-shot elements. Per-second pricing on total duration.'
  },
  '/home/kling/v3-0-motion-control': {
    title: 'What is Kling 3.0 Motion Control?',
    body: '<strong>Kling 3.0 Motion Control</strong> (<code>kling-3.0-motion-control</code>)—reference image + video; std/pro; background_source; optional prompt. Per-second × reference video duration.'
  }
}

const workflowFaqMap = {
  '/home/kling/v3-0-video': [
    { question: 'What is multi-shot mode on Kling 3.0 Video?', answer: 'Up to <strong>5 shots</strong>, 1–12s each (total 3–15s). Each shot prompt max 500 chars (2500 total). Sound must be <strong>On</strong>.' },
    { question: 'What duration can Kling 3.0 Video generate?', answer: 'Single shot: <strong>3–15s</strong>. Multi-shot: sum of shots must stay 3–15s. std/pro and sound affect per-second rate.' }
  ],
  '/home/kling/v3-0-motion-control': [
    { question: 'What is background source on Kling 3.0 Motion Control?', answer: 'Background follows <strong>input video</strong> or <strong>input image</strong>. Combine with character orientation for pose control.' },
    { question: 'When should I pick std vs pro on Kling 3.0 Motion Control?', answer: '<strong>std</strong> = 720p; <strong>pro</strong> = 1080p. Both bill per reference-video second—pro costs more per second.' }
  ]
}

const commonFaq = [
  { question: 'Do I need a local GPU for Kling 3.0?', answer: 'No—3.0 runs in the cloud. Video bills per output second; Motion Control bills per reference-video second.' },
  { question: 'How is Kling 3.0 priced on FuseAITools?', answer: 'Per-second RULE pricing—total clip duration (Video) or reference length (Motion Control). Credits on the Generate button. See <a href="/pricing" class="seo-pricing-link">pricing</a>.' }
]

const workflowIntro = computed(() => workflowIntroMap[route.path.replace(/\/$/, '')] || null)
const workflowDefinition = computed(() => workflowDefinitionMap[route.path.replace(/\/$/, '')] || null)
const faqItems = computed(() => [...(workflowFaqMap[route.path.replace(/\/$/, '')] || []), ...commonFaq])
useToolSeoFaqSchema(faqItems)

const coreFeatures = [
  { icon: '🎬', title: 'Multi-Shot Director', description: 'Up to <strong>5 shots</strong> per generation—total duration 3–15 seconds.' },
  { icon: '🎭', title: '3.0 Motion Control', description: 'std/pro pose transfer with <strong>background source</strong> control.' },
  { icon: '🖼️', title: 'Per-Shot Elements', description: 'Attach 2–50 reference images to individual shots for character consistency.' },
  { icon: '☁️', title: 'Cloud on FuseAITools', description: 'Top Kling tier—per-second credits shown before generate.' }
]

const scenarioTags = ['Multi-beat narratives', 'Advanced motion transfer', 'Brand story sequences', 'Longer 3–15s clips']

function isCurrentMode(path) { return route.path === path || route.path === `${path}/` }
watchRouteScroll((path) => path.includes('/home/kling/v3-0-'))

const openFaqIndex = ref(0)
function toggleFaq(index) { openFaqIndex.value = openFaqIndex.value === index ? -1 : index }
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
