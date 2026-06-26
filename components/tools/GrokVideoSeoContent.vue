<template>
  <div
    id="grok-video-section"
    class="grok-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Grok Imagine Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Grok Imagine text-to-video, image-to-video, upscale, and extend on FuseAITools—6s/10s clips at 480p/720p with fun, normal, or spicy motion modes."
    />

    <div class="version-badge">🎬 Grok Imagine · xAI Video · Four Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎬 Grok Imagine Video on FuseAITools</h2>
      <p class="tool-sub">
        <strong>Grok Imagine video</strong> on
        <a href="/" class="seo-inline-link">FuseAITools</a> covers short clip generation and post steps—
        <strong>text-to-video</strong>, <strong>image-to-video</strong>, <strong>upscale</strong>, and
        <strong>extend</strong>. Pick aspect ratio, motion mode, duration (6s/10s), and resolution (480p/720p) on
        generate modes. Need stills first? Use
        <a href="/home/grok/text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/grok/text-to-image')">Grok Text to Image</a>.
        New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Grok Video Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Grok Video Workflows Compared</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Grok video workflow comparison">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>T2V</th>
              <th>I2V</th>
              <th>Upscale</th>
              <th>Extend</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Input</strong></td>
              <td>Prompt</td>
              <td>Images and/or prompt</td>
              <td>Original task ID</td>
              <td>Task ID + prompt</td>
            </tr>
            <tr>
              <td><strong>modelKey</strong></td>
              <td><code>grok-imagine-text-to-video</code></td>
              <td><code>grok-imagine-image-to-video</code></td>
              <td><code>grok-imagine-upscale</code></td>
              <td><code>grok-imagine-extend</code></td>
            </tr>
            <tr>
              <td><strong>Motion mode</strong></td>
              <td>fun / normal / spicy</td>
              <td>fun / normal / spicy*</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td><strong>Duration</strong></td>
              <td>6s / 10s</td>
              <td>6s / 10s</td>
              <td>—</td>
              <td>Extend 6s / 10s</td>
            </tr>
            <tr>
              <td><strong>Resolution</strong></td>
              <td>480p / 720p</td>
              <td>480p / 720p</td>
              <td>—</td>
              <td>480p / 720p</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>Motion from scratch</td>
              <td>Animate a poster or product still</td>
              <td>Sharpen a prior Grok clip</td>
              <td>Continue a successful shot</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">*Spicy mode is disabled in the form when reference images are uploaded on Image to Video.</p>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Grok Imagine Video)</h2>
      <div class="faq-list">
        <div
          v-for="(faq, index) in faqItems"
          :key="index"
          class="faq-item"
          :class="{ open: openFaqIndex === index }"
        >
          <button type="button" class="faq-question" :aria-expanded="openFaqIndex === index" @click="toggleFaq(index)">
            <span>{{ faq.question }}</span>
            <span class="faq-toggle" aria-hidden="true">{{ openFaqIndex === index ? '➖' : '➕' }}</span>
          </button>
          <div v-show="openFaqIndex === index" class="faq-answer"><div v-html="faq.answer" /></div>
        </div>
      </div>
    </section>

    <section class="info-section" aria-labelledby="tech-heading">
      <h2 id="tech-heading" class="section-title">⚙️ Grok Video Technical Specs</h2>
      <p class="section-lead">Parameters match the FuseAITools Grok video form.</p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Grok video capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Required</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Text to Video</strong></td>
              <td>Prompt (≤5000)</td>
              <td>Aspect 2:3–9:16; mode fun/normal/spicy; 6s/10s; 480p/720p</td>
            </tr>
            <tr>
              <td><strong>Image to Video</strong></td>
              <td>Prompt and/or up to 7 images</td>
              <td>Same as T2V; JPEG/PNG/WebP max 10MB each</td>
            </tr>
            <tr>
              <td><strong>Upscale</strong></td>
              <td>Original task ID</td>
              <td>Pick from completed Grok generation list</td>
            </tr>
            <tr>
              <td><strong>Extend</strong></td>
              <td>Task ID + prompt (≤5000)</td>
              <td>extend_at; extend 6s/10s; 480p/720p</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">T2V / I2V / Extend: RULE credits by <strong>duration</strong> + <strong>resolution</strong>. Upscale: per-run credits on Generate.</p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Grok Imagine — Four Video Workflows</h2>
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
      🖼️ Need a hero still before animating?
      <a href="/home/grok/text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/grok/text-to-image')">Grok Text to Image →</a>
      or
      <a href="/home/grok/image-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/grok/image-to-image')">Image to Image</a>
      for reference-driven variations—then return here for
      <a href="/home/grok/image-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/grok/image-to-video')">Image to Video</a>.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  { name: 'Grok Text to Video', title: 'Text to Video', description: 'Prompt-driven 6s/10s clips—aspect, mode, resolution.', path: '/home/grok/text-to-video', icon: 'fas fa-font' },
  { name: 'Grok Image to Video', title: 'Image to Video', description: 'Up to 7 images and/or prompt—animate stills.', path: '/home/grok/image-to-video', icon: 'fas fa-film' },
  { name: 'Grok Upscale', title: 'Upscale', description: 'Enhance a completed Grok task output.', path: '/home/grok/upscale', icon: 'fas fa-up-right-and-down-left-from-center' },
  { name: 'Grok Extend', title: 'Extend', description: 'Continue a clip with prompt + extend_at.', path: '/home/grok/extend', icon: 'fas fa-video' }
]

const workflowIntroMap = {
  '/home/grok/text-to-video': {
    title: '🎬 Grok Text to Video',
    lead: 'Write a <strong>prompt</strong> (≤5000 chars), pick <strong>aspect ratio</strong> (2:3 through 9:16), <strong>motion mode</strong> (fun / normal / spicy), <strong>duration</strong> (6s or 10s), and <strong>resolution</strong> (480p or 720p) via <code>grok-imagine-text-to-video</code>.'
  },
  '/home/grok/image-to-video': {
    title: '🖼️ Grok Image to Video',
    lead: 'Upload up to <strong>7 images</strong> (JPEG/PNG/WebP, max 10MB each) and/or add a prompt. Configure motion mode, duration, resolution, and aspect ratio through <code>grok-imagine-image-to-video</code>.'
  },
  '/home/grok/upscale': {
    title: '⬆️ Grok Upscale',
    lead: 'Select an <strong>Original Task</strong> from your completed Grok generations—no prompt required. Model: <code>grok-imagine-upscale</code>.'
  },
  '/home/grok/extend': {
    title: '⏩ Grok Extend',
    lead: 'Pick a prior <strong>task ID</strong>, enter a continuation <strong>prompt</strong> (≤5000), set <strong>extend_at</strong>, choose extend length (6s/10s), and resolution (480p/720p) via <code>grok-imagine-extend</code>.'
  }
}

const workflowDefinitionMap = {
  '/home/grok/text-to-video': {
    title: 'What is Grok Text to Video?',
    body: '<strong>Grok Text to Video</strong> (<code>grok-imagine-text-to-video</code>) on FuseAITools generates a short clip from text. Required: <strong>prompt</strong> (max 5000). Optional controls: aspect ratio, motion mode, 6s/10s duration, 480p/720p resolution.'
  },
  '/home/grok/image-to-video': {
    title: 'What is Grok Image to Video?',
    body: '<strong>Grok Image to Video</strong> (<code>grok-imagine-image-to-video</code>) animates uploaded stills. Required: <strong>prompt and/or at least one image</strong>. Up to 7 reference images; spicy mode is disabled when images are present.'
  },
  '/home/grok/upscale': {
    title: 'What is Grok Upscale?',
    body: '<strong>Grok Upscale</strong> (<code>grok-imagine-upscale</code>) enhances output from a prior Grok generation. Required: <strong>task_id</strong> from the Original Task dropdown—no prompt field.'
  },
  '/home/grok/extend': {
    title: 'What is Grok Extend?',
    body: '<strong>Grok Extend</strong> (<code>grok-imagine-extend</code>) continues an existing Grok clip. Required: <strong>task_id</strong> + <strong>prompt</strong>. Set extend_at (start frame), extend length (6s/10s), and resolution.'
  }
}

const workflowFaqMap = {
  '/home/grok/text-to-video': [
    {
      question: 'Is a prompt required for Grok text-to-video?',
      answer: 'Yes—the Generate button requires a <strong>prompt</strong> up to <strong>5000 characters</strong> before submission.'
    },
    {
      question: 'What motion modes does Grok text-to-video support?',
      answer: '<strong>fun</strong>, <strong>normal</strong>, and <strong>spicy</strong>—pick the intensity that matches your scene. Normal is a solid default for most social clips.'
    }
  ],
  '/home/grok/image-to-video': [
    {
      question: 'Can Grok image-to-video run without a prompt?',
      answer: 'Yes—submit <strong>reference images alone</strong> or combine uploads with an optional prompt (max 5000 chars). At least one of prompt or images is required.'
    },
    {
      question: 'Why is spicy mode disabled after I upload images?',
      answer: 'The form disables <strong>spicy</strong> when reference images are present on Image to Video—use <strong>fun</strong> or <strong>normal</strong> instead.'
    }
  ],
  '/home/grok/upscale': [
    {
      question: 'Where does the Original Task on Grok Upscale come from?',
      answer: 'The dropdown lists <strong>completed Grok generations</strong> tied to your account. Pick the task whose output you want to upscale—no prompt is needed.'
    },
    {
      question: 'Can I upscale any video with Grok Upscale?',
      answer: 'Upscale expects a <strong>Grok task_id</strong> from a prior Grok run on FuseAITools—not arbitrary external URLs.'
    }
  ],
  '/home/grok/extend': [
    {
      question: 'What does extend_at control on Grok Extend?',
      answer: '<strong>extend_at</strong> is the timeline position where continuation begins—pick a visually stable frame to reduce jump cuts in the extended clip.'
    },
    {
      question: 'Is a prompt required for Grok Extend?',
      answer: 'Yes—describe how the scene should continue (max <strong>5000 characters</strong>) along with the selected Original Task.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Grok Imagine video?',
    answer: 'No—Grok Imagine video runs in the cloud on FuseAITools. Credits update on Generate when you change duration or resolution.'
  },
  {
    question: 'How is Grok Imagine video priced on FuseAITools?',
    answer: 'Text-to-video, image-to-video, and extend use <strong>duration</strong> (6s/10s) and <strong>resolution</strong> (480p/720p) for RULE credits. Upscale uses a fixed per-run rate. See <a href="/pricing" class="seo-pricing-link">pricing</a>. New users get <strong>20 free credits</strong> on sign-up.'
  }
]

const normalizedPath = computed(() => route.path.replace(/\/$/, ''))
const workflowIntro = computed(() => workflowIntroMap[normalizedPath.value] || null)
const workflowDefinition = computed(() => workflowDefinitionMap[normalizedPath.value] || null)
const faqItems = computed(() => [...(workflowFaqMap[normalizedPath.value] || []), ...commonFaq])
useToolSeoFaqSchema(faqItems)

const coreFeatures = [
  { icon: '🎬', title: 'T2V & I2V', description: 'Generate <strong>6s or 10s</strong> clips from prompts or up to <strong>7 reference images</strong>.' },
  { icon: '🎛️', title: 'Motion Modes', description: '<strong>fun / normal / spicy</strong> on generate modes—spicy disabled when I2V has uploads.' },
  { icon: '⬆️', title: 'Upscale & Extend', description: 'Reuse <strong>task IDs</strong> to sharpen output or continue a winning shot.' },
  { icon: '☁️', title: 'Cloud on FuseAITools', description: 'xAI Grok Imagine video—credits by duration and resolution before generate.' }
]

const scenarioTags = ['Social clips', 'Product motion', 'Storyboard previews', 'Clip continuation']

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

const videoPaths = new Set(['/home/grok/text-to-video', '/home/grok/image-to-video', '/home/grok/upscale', '/home/grok/extend'])
watchRouteScroll((path) => videoPaths.has(path.replace(/\/$/, '')))

const openFaqIndex = ref(0)
function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
