<template>
  <div
    id="kling-v26-section"
    class="kling-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Kling 2.6 Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Kling 2.6 text and image-to-video with optional sound, plus Motion Control on FuseAITools—5/10s clips and reference-video pose transfer."
    />

    <div class="version-badge">🔊 Kling 2.6 · Sound + Motion Control · Three Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🔊 Kling 2.6 on FuseAITools</h2>
      <p class="tool-sub">
        Kling <strong>2.6</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> adds
        <strong>generated sound</strong> to text and image-to-video, plus
        <strong>Motion Control</strong>—transfer pose from a reference video onto a character image at
        720p/1080p. Compared to
        <a href="/home/kling/v2-5-turbo-text-to-video-pro" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v2-5-turbo-text-to-video-pro')">v2.5 Turbo</a>,
        2.6 trades CFG knobs for audio and motion workflows. New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Kling 2.6 Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Kling 2.6 vs v2.5 Turbo</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling 2.6 vs v2.5 Turbo">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>2.6</th>
              <th>v2.5 Turbo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Workflows</strong></td>
              <td>T2V, I2V, Motion Control</td>
              <td>T2V Pro, I2V Pro only</td>
            </tr>
            <tr>
              <td><strong>Generated sound</strong></td>
              <td><strong>Yes</strong> (T2V/I2V toggle)</td>
              <td>No</td>
            </tr>
            <tr>
              <td><strong>Motion control</strong></td>
              <td><strong>2.6 Motion Control</strong></td>
              <td>Not available</td>
            </tr>
            <tr>
              <td><strong>Fine-tuning</strong></td>
              <td>Sound on/off; character orientation</td>
              <td>Negative prompt, CFG scale</td>
            </tr>
            <tr>
              <td><strong>Duration</strong></td>
              <td>5s/10s (T2V/I2V)</td>
              <td>5s/10s</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Kling 2.6)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Kling 2.6 Technical Specs</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling 2.6 capabilities">
          <thead>
            <tr><th>Workflow</th><th>modelKey</th><th>Required</th><th>Key controls</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Text to Video</strong></td>
              <td><code>kling-2.6-text-to-video</code></td>
              <td>Prompt</td>
              <td>Sound; aspect 1:1/16:9/9:16; 5/10s</td>
            </tr>
            <tr>
              <td><strong>Image to Video</strong></td>
              <td><code>kling-2.6-image-to-video</code></td>
              <td>Image + prompt</td>
              <td>Sound; 5/10s</td>
            </tr>
            <tr>
              <td><strong>Motion Control</strong></td>
              <td><code>kling-2.6-motion-control</code></td>
              <td>Reference image + video</td>
              <td>Character orientation; 720p/1080p; per-second pricing</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Kling 2.6 — Three Workflows</h2>
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

    <section class="info-section" aria-labelledby="version-compare-heading">
      <h2 id="version-compare-heading" class="section-title">📊 Kling 2.6 vs 3.0</h2>
      <p class="section-lead">
        <strong>Kling 2.6</strong> covers sound-enabled T2V/I2V and reference-video motion control at fixed 5/10s clips.
        Upgrade to
        <a href="/home/kling/v3-0-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v3-0-video')">Kling 3.0 Video</a>
        for multi-shot director mode (3–15s) or
        <a href="/home/kling/v3-0-motion-control" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v3-0-motion-control')">3.0 Motion Control</a>
        for std/pro quality and background source control.
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling 2.6 vs 3.0 comparison">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>2.6</th>
              <th>3.0</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Positioning</strong></td>
              <td>Sound + motion control</td>
              <td>Director-level storytelling</td>
            </tr>
            <tr>
              <td><strong>Workflows</strong></td>
              <td>T2V, I2V, Motion Control</td>
              <td>3.0 Video, 3.0 Motion Control</td>
            </tr>
            <tr>
              <td><strong>Duration</strong></td>
              <td><strong>5s or 10s</strong> (T2V/I2V); motion = ref video length</td>
              <td><strong>3–15s</strong> (Video); motion = ref video length</td>
            </tr>
            <tr>
              <td><strong>Generated sound</strong></td>
              <td><strong>Yes</strong> (T2V/I2V toggle)</td>
              <td><strong>Yes</strong> (3.0 Video; required in multi-shot)</td>
            </tr>
            <tr>
              <td><strong>Motion control</strong></td>
              <td>2.6 Motion Control (720p/1080p)</td>
              <td>3.0 Motion Control (std/pro + background source)</td>
            </tr>
            <tr>
              <td><strong>Unique controls</strong></td>
              <td>Character orientation from image/video</td>
              <td>Multi-shot (≤5), per-shot elements, start/end frames</td>
            </tr>
            <tr>
              <td><strong>Quality tiers</strong></td>
              <td>720p/1080p (Motion Control only)</td>
              <td><strong>std / pro</strong> on Video and Motion Control</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>Clips with audio, pose transfer</td>
              <td>Narrative sequences, advanced motion</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="upgrade-tip pricing-tip">
      💳 New users get <strong>20 free credits</strong> on sign-up.
      <a href="/pricing" class="seo-pricing-link">View pricing</a>
      for subscription discounts and credit top-ups.
    </div>

    <div class="upgrade-tip">
      🎬 Need multi-shot mode or 3–15 second director clips?
      <a href="/home/kling/v3-0-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v3-0-video')">Explore Kling 3.0 Video →</a>
      for up to five shots, std/pro quality, and per-shot elements—or
      <a href="/home/kling/v3-0-motion-control" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v3-0-motion-control')">3.0 Motion Control</a>
      for std/pro motion transfer with background source control.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  { name: 'Kling 2.6 Text to Video', title: 'Text to Video', description: 'Optional sound—aspect ratio, 5/10s.', path: '/home/kling/v2-6-text-to-video', icon: 'fas fa-font' },
  { name: 'Kling 2.6 Image to Video', title: 'Image to Video', description: 'Single image + optional sound, 5/10s.', path: '/home/kling/v2-6-image-to-video', icon: 'fas fa-image' },
  { name: 'Kling 2.6 Motion Control', title: 'Motion Control', description: 'Reference image + video; 720p/1080p.', path: '/home/kling/v2-6-motion-control', icon: 'fas fa-route' }
]

const workflowIntroMap = {
  '/home/kling/v2-6-text-to-video': {
    title: '📝 Kling 2.6 Text to Video',
    lead: 'Prompt (≤2500) with optional <strong>generated sound</strong>. Aspect <strong>1:1 / 16:9 / 9:16</strong>, duration <strong>5s or 10s</strong>. Sound affects credit pricing.'
  },
  '/home/kling/v2-6-image-to-video': {
    title: '🖼️ Kling 2.6 Image to Video',
    lead: 'One <strong>image</strong> (max 10MB) + prompt (≤2500). Toggle <strong>sound</strong>; pick <strong>5s or 10s</strong>.'
  },
  '/home/kling/v2-6-motion-control': {
    title: '🎭 Kling 2.6 Motion Control',
    lead: '<strong>Reference image + video</strong> (max 100MB)—no prompt required. <strong>Character orientation</strong> from image or video; output <strong>720p or 1080p</strong>. Per-second pricing.'
  }
}

const workflowDefinitionMap = {
  '/home/kling/v2-6-text-to-video': {
    title: 'What is Kling 2.6 Text to Video?',
    body: '<strong>Kling 2.6 Text to Video</strong> (<code>kling-2.6-text-to-video</code>)—prompt max 2500, optional <strong>sound</strong>, aspect 1:1/16:9/9:16, duration 5/10s.'
  },
  '/home/kling/v2-6-image-to-video': {
    title: 'What is Kling 2.6 Image to Video?',
    body: '<strong>Kling 2.6 Image to Video</strong> (<code>kling-2.6-image-to-video</code>)—single image + prompt, optional sound, 5/10s.'
  },
  '/home/kling/v2-6-motion-control': {
    title: 'What is Kling 2.6 Motion Control?',
    body: '<strong>Kling 2.6 Motion Control</strong> (<code>kling-2.6-motion-control</code>)—reference image + video; character_orientation; 720p/1080p; billed per reference-video second.'
  }
}

const workflowFaqMap = {
  '/home/kling/v2-6-text-to-video': [
    { question: 'Does Kling 2.6 text-to-video include sound?', answer: 'Optionally—toggle <strong>Sound On</strong>. Pricing uses <code>with_sound</code> vs <code>without_sound</code> tiers.' },
    { question: 'Which aspect ratios does Kling 2.6 T2V support?', answer: '<strong>1:1</strong>, <strong>16:9</strong>, and <strong>9:16</strong>; prompt max 2500; duration 5/10s.' }
  ],
  '/home/kling/v2-6-image-to-video': [
    { question: 'Is a prompt required for Kling 2.6 image-to-video?', answer: 'Yes—prompt max <strong>2500 characters</strong> with required single image upload.' },
    { question: 'How does sound affect pricing on Kling 2.6 I2V?', answer: 'Sound <strong>On</strong> = <code>with_sound</code>; <strong>Off</strong> = <code>without_sound</code>, plus duration 5/10s.' }
  ],
  '/home/kling/v2-6-motion-control': [
    { question: 'What inputs does Kling 2.6 Motion Control need?', answer: 'Required: reference <strong>image</strong> (JPG/PNG, max 10MB) + <strong>video</strong> (MP4/MOV/MKV, max 100MB). No prompt.' },
    { question: 'How is Kling 2.6 Motion Control priced?', answer: 'Per-second rate at <strong>720p or 1080p</strong> × reference video duration (rounded up).' }
  ]
}

const commonFaq = [
  { question: 'Do I need a local GPU for Kling 2.6?', answer: 'No—Kling 2.6 runs in the cloud. T2V/I2V bill by duration + sound; Motion Control bills per reference-video second.' },
  { question: 'How is Kling 2.6 priced on FuseAITools?', answer: 'Credits on the Generate button—duration and sound for T2V/I2V; per-second for Motion Control. See <a href="/pricing" class="seo-pricing-link">pricing</a>.' }
]

const workflowIntro = computed(() => workflowIntroMap[route.path.replace(/\/$/, '')] || null)
const workflowDefinition = computed(() => workflowDefinitionMap[route.path.replace(/\/$/, '')] || null)
const faqItems = computed(() => [...(workflowFaqMap[route.path.replace(/\/$/, '')] || []), ...commonFaq])
useToolSeoFaqSchema(faqItems)

const coreFeatures = [
  { icon: '🔊', title: 'Optional Sound', description: 'Toggle generated audio on T2V/I2V—pricing reflects with_sound vs without_sound.' },
  { icon: '🎭', title: 'Motion Control', description: 'Transfer reference-video motion to a character still—720p or 1080p.' },
  { icon: '📐', title: 'Social Aspect Ratios', description: '1:1, 16:9, and 9:16 on text and image workflows.' },
  { icon: '☁️', title: 'Cloud on FuseAITools', description: 'Three 2.6 modes in one tier—credits shown before generate.' }
]

const scenarioTags = ['Clips with ambient audio', 'Character pose transfer', 'Vertical social video', 'Product animation']

function isCurrentMode(path) { return route.path === path || route.path === `${path}/` }
watchRouteScroll((path) => path.includes('/home/kling/v2-6-'))

const openFaqIndex = ref(0)
function toggleFaq(index) { openFaqIndex.value = openFaqIndex.value === index ? -1 : index }
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
