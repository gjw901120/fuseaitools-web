<template>
  <div
    id="kling-v3-turbo-section"
    class="kling-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Kling V3 Turbo Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Kling V3 Turbo text and image-to-video on FuseAITools—fast 3–15s clips at 720p/1080p with per-second pricing."
    />

    <div class="version-badge">⚡ Kling V3 Turbo · Text & Image to Video · 3–15s · 720p/1080p</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">⚡ Kling V3 Turbo on FuseAITools</h2>
      <p class="tool-sub">
        <strong>Kling V3 Turbo</strong> is the fast lane of the Kling 3.x family on
        <a href="/" class="seo-inline-link">FuseAITools</a>—<strong>Text to Video</strong> and
        <strong>Image to Video</strong> with clean controls: prompt up to 2500 characters, duration from
        <strong>3 to 15 seconds</strong>, output at <strong>720p or 1080p</strong>, billed <strong>per second</strong>.
        Compared to <a href="/home/kling/v2-5-turbo-text-to-video-pro" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v2-5-turbo-text-to-video-pro')">v2.5 Turbo</a>,
        V3 Turbo lifts the duration ceiling from 10s to 15s and drops the CFG/negative-prompt knobs for a streamlined form. New users receive
        <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Kling V3 Turbo Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Kling V3 Turbo vs v2.5 Turbo</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling V3 Turbo vs v2.5 Turbo">
          <thead>
            <tr><th>Dimension</th><th>V3 Turbo</th><th>v2.5 Turbo Pro</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Workflows</strong></td>
              <td>Text to Video, Image to Video</td>
              <td>T2V Pro, I2V Pro</td>
            </tr>
            <tr>
              <td><strong>Duration</strong></td>
              <td><strong>3–15s</strong> slider</td>
              <td>5s / 10s buttons</td>
            </tr>
            <tr>
              <td><strong>Resolution</strong></td>
              <td><strong>720p / 1080p</strong></td>
              <td>Fixed by model</td>
            </tr>
            <tr>
              <td><strong>Aspect ratio</strong></td>
              <td>1:1 / 16:9 / 9:16 (T2V); I2V follows input image</td>
              <td>16:9 / 9:16 / 1:1 (T2V)</td>
            </tr>
            <tr>
              <td><strong>Fine-tuning</strong></td>
              <td>Streamlined—no CFG / negative prompt</td>
              <td>Negative prompt, CFG scale</td>
            </tr>
            <tr>
              <td><strong>Pricing</strong></td>
              <td>Per second × duration × resolution tier</td>
              <td>Per duration</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Kling V3 Turbo)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Kling V3 Turbo Technical Specs</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling V3 Turbo capabilities">
          <thead>
            <tr><th>Workflow</th><th>modelKey</th><th>Required</th><th>Key controls</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>V3 Turbo Text to Video</strong></td>
              <td><code>kling-v3-turbo-text-to-video</code></td>
              <td>Prompt (≤2500)</td>
              <td>Duration 3–15s; aspect 1:1/16:9/9:16; resolution 720p/1080p; per-second</td>
            </tr>
            <tr>
              <td><strong>V3 Turbo Image to Video</strong></td>
              <td><code>kling-v3-turbo-image-to-video</code></td>
              <td>Prompt (≤2500) + 1 image</td>
              <td>Duration 3–15s; resolution 720p/1080p; per-second</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">Pricing is <strong>per second</strong> and keyed on the selected <strong>resolution</strong> (720p / 1080p). The Generate button shows total credits before you submit.</p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Kling V3 Turbo — Two Workflows</h2>
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
      🎬 Need multi-shot storytelling, sound, or motion control?
      <a href="/home/kling/v3-0-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v3-0-video')">Explore Kling 3.0 Video →</a>
      for up to five shots with per-shot elements, or
      <a href="/home/kling/v2-6-text-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v2-6-text-to-video')">Kling 2.6</a>
      for generated sound and reference-video motion control.
    </div>

    <div class="upgrade-tip">
      🌐 Need more control—4K, native audio, smart/custom multi-shot and reusable subject elements?
      <a href="/home/kling/3-0-omni-text-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/3-0-omni-text-to-video')">Try Kling 3.0 Omni Text to Video →</a>
      or its
      <a href="/home/kling/3-0-omni-image-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/3-0-omni-image-to-video')">Image</a>
      /
      <a href="/home/kling/3-0-omni-reference-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/3-0-omni-reference-to-video')">Reference</a>
      variants—also billed per second. Need to restyle existing footage instead? Try
      <a href="/home/kling/3-0-omni-transformation" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/3-0-omni-transformation')">Kling 3.0 Omni Video Transformation</a>,
      billed by the actual uploaded clip length.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  { name: 'Kling V3 Turbo Text to Video', title: 'V3 Turbo T2V', description: 'Prompt to video, 3–15s, 720p/1080p.', path: '/home/kling/v3-turbo-text-to-video', icon: 'fas fa-keyboard' },
  { name: 'Kling V3 Turbo Image to Video', title: 'V3 Turbo I2V', description: 'Animate one image, 3–15s, per-second.', path: '/home/kling/v3-turbo-image-to-video', icon: 'fas fa-image' }
]

const workflowIntroMap = {
  '/home/kling/v3-turbo-text-to-video': {
    title: '⚡ Kling V3 Turbo Text to Video',
    lead: 'Type a prompt (≤<strong>2500</strong> chars), pick <strong>aspect ratio</strong> (1:1 / 16:9 / 9:16), <strong>resolution</strong> (720p / 1080p), and a <strong>3–15s</strong> duration. Credits bill <strong>per second</strong> at your resolution tier.'
  },
  '/home/kling/v3-turbo-image-to-video': {
    title: '🖼️ Kling V3 Turbo Image to Video',
    lead: 'Upload <strong>one image</strong> (JPEG/PNG, ≤10MB) plus a prompt (≤<strong>2500</strong>). Output follows the input frame, so there is no aspect-ratio control—just choose <strong>720p / 1080p</strong> and a <strong>3–15s</strong> duration. Billed per second.'
  }
}

const workflowDefinitionMap = {
  '/home/kling/v3-turbo-text-to-video': {
    title: 'What is Kling V3 Turbo Text to Video?',
    body: '<strong>Kling V3 Turbo Text to Video</strong> (<code>kling-v3-turbo-text-to-video</code>)—a fast text-to-video tier with a 3–15s slider, 720p/1080p resolution, and per-second pricing. A streamlined alternative to v2.5 Turbo Pro.'
  },
  '/home/kling/v3-turbo-image-to-video': {
    title: 'What is Kling V3 Turbo Image to Video?',
    body: '<strong>Kling V3 Turbo Image to Video</strong> (<code>kling-v3-turbo-image-to-video</code>)—animate a single reference image with a prompt over 3–15s at 720p/1080p, billed per second. Aspect ratio follows the input image.'
  }
}

const workflowFaqMap = {
  '/home/kling/v3-turbo-text-to-video': [
    { question: 'How long can Kling V3 Turbo text-to-video clips be?', answer: 'Use the slider to pick any integer from <strong>3 to 15 seconds</strong>. Pricing scales per second at 720p or 1080p.' },
    { question: 'Which aspect ratios does Kling V3 Turbo T2V support?', answer: '<strong>1:1</strong>, <strong>16:9</strong>, and <strong>9:16</strong>. Prompt max 2500 characters.' }
  ],
  '/home/kling/v3-turbo-image-to-video': [
    { question: 'How many images can I upload for Kling V3 Turbo I2V?', answer: 'Exactly <strong>one</strong> reference image (JPEG/PNG, ≤10MB) plus a required prompt.' },
    { question: 'Why is there no aspect-ratio control on V3 Turbo I2V?', answer: 'The output <strong>follows the input image frame</strong>, so aspect ratio is derived from your uploaded image rather than chosen separately.' }
  ]
}

const commonFaq = [
  { question: 'Do I need a local GPU for Kling V3 Turbo?', answer: 'No—V3 Turbo runs in the cloud. Both workflows bill per output second at the selected resolution.' },
  { question: 'How is Kling V3 Turbo priced on FuseAITools?', answer: 'Per-second RULE pricing keyed on resolution (720p / 1080p) × clip duration. Total credits appear on the Generate button. See <a href="/pricing" class="seo-pricing-link">pricing</a>.' }
]

const workflowIntro = computed(() => workflowIntroMap[route.path.replace(/\/$/, '')] || null)
const workflowDefinition = computed(() => workflowDefinitionMap[route.path.replace(/\/$/, '')] || null)
const faqItems = computed(() => [...(workflowFaqMap[route.path.replace(/\/$/, '')] || []), ...commonFaq])
useToolSeoFaqSchema(faqItems)

const coreFeatures = [
  { icon: '⚡', title: 'Fast 3.x Lane', description: 'Streamlined V3 Turbo with clean controls—no CFG or negative-prompt knobs.' },
  { icon: '🎚️', title: '3–15s Slider', description: 'Continuous duration from <strong>3 to 15 seconds</strong>—beyond the 5/10s steps of v2.5 Turbo.' },
  { icon: '🖥️', title: '720p / 1080p', description: 'Pick output resolution; the per-second rate scales with the tier.' },
  { icon: '☁️', title: 'Cloud on FuseAITools', description: 'Text and image workflows in one tier—credits shown before generate.' }
]

const scenarioTags = ['Fast social clips', 'Longer 3–15s shots', 'Image animation', 'Rapid drafts']

function isCurrentMode(path) { return route.path === path || route.path === `${path}/` }
watchRouteScroll((path) => path.includes('/home/kling/v3-turbo-'))

const openFaqIndex = ref(0)
function toggleFaq(index) { openFaqIndex.value = openFaqIndex === index ? -1 : index }
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
