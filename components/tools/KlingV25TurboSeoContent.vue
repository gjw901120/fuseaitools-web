<template>
  <div
    id="kling-v25-section"
    class="kling-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Kling v2.5 Turbo Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Kling v2.5 Turbo T2V and I2V Pro on FuseAITools—fast text and image-to-video with CFG scale, negative prompts, and 5/10s clips."
    />

    <div class="version-badge">⚡ Kling v2.5 Turbo · T2V & I2V Pro · CFG Control</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">⚡ Kling v2.5 Turbo on FuseAITools</h2>
      <p class="tool-sub">
        Kling <strong>v2.5 Turbo</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> is the
        fastest Kuaishou scene-generation tier—<strong>T2V Pro</strong> and <strong>I2V Pro</strong> with
        <strong>negative prompts</strong>, <strong>CFG scale</strong> (0–1), and fixed <strong>5s/10s</strong>
        outputs. No generated sound (upgrade to
        <a href="/home/kling/v2-6-text-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v2-6-text-to-video')">Kling 2.6</a>
        for audio). Credits show on the Generate button; new users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ v2.5 Turbo Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 v2.5 Turbo T2V Pro vs I2V Pro</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling v2.5 Turbo T2V vs I2V">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>T2V Pro</th>
              <th>I2V Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Input</strong></td>
              <td>Prompt only</td>
              <td>Image + prompt (+ optional tail frame)</td>
            </tr>
            <tr>
              <td><strong>Aspect ratio</strong></td>
              <td>16:9, 9:16, 1:1</td>
              <td>Follows source image</td>
            </tr>
            <tr>
              <td><strong>Duration</strong></td>
              <td colspan="2">5s or 10s</td>
            </tr>
            <tr>
              <td><strong>Fine-tuning</strong></td>
              <td colspan="2">Negative prompt, CFG 0–1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Kling v2.5 Turbo)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ v2.5 Turbo Technical Specs</h2>
      <p class="section-lead">Parameters match the FuseAITools Kling form (<code>kling-v2-5-turbo-*</code>).</p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling v2.5 Turbo capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>modelKey</th>
              <th>Required</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>T2V Pro</strong></td>
              <td><code>kling-v2-5-turbo-text-to-video-pro</code></td>
              <td>Prompt (≤2500)</td>
              <td>Aspect 16:9/9:16/1:1; duration 5/10s; negative prompt; CFG</td>
            </tr>
            <tr>
              <td><strong>I2V Pro</strong></td>
              <td><code>kling-v2-5-turbo-image-to-video-pro</code></td>
              <td>Image + prompt</td>
              <td>Optional tail frame; duration 5/10s; negative prompt; CFG</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Kling v2.5 Turbo — Two Workflows</h2>
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
      <h2 id="version-compare-heading" class="section-title">📊 Kling 2.5 vs 2.6 vs 3.0</h2>
      <p class="section-lead">
        Three video-generation tiers on FuseAITools—pick by speed, audio needs, motion control, or multi-shot depth.
        <strong>v2.5 Turbo</strong> is the entry tier; upgrade to
        <a href="/home/kling/v2-6-text-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v2-6-text-to-video')">Kling 2.6</a>
        or
        <a href="/home/kling/v3-0-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v3-0-video')">Kling 3.0 Video</a>
        when you need sound, motion control, or multi-shot storytelling. AI Avatar is <strong>not</strong> part of this ladder.
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling 2.5 vs 2.6 vs 3.0 comparison">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>v2.5 Turbo</th>
              <th>2.6</th>
              <th>3.0</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Positioning</strong></td>
              <td>Fast, fine-tuned T2V/I2V</td>
              <td>Sound + motion control</td>
              <td>Director-level storytelling</td>
            </tr>
            <tr>
              <td><strong>Workflows</strong></td>
              <td>T2V Pro, I2V Pro (+ tail frame)</td>
              <td>T2V, I2V, Motion Control</td>
              <td>3.0 Video, 3.0 Motion Control</td>
            </tr>
            <tr>
              <td><strong>Duration</strong></td>
              <td><strong>5s or 10s</strong></td>
              <td><strong>5s or 10s</strong> (T2V/I2V); motion = ref video length</td>
              <td><strong>3–15s</strong> (Video); motion = ref video length</td>
            </tr>
            <tr>
              <td><strong>Generated sound</strong></td>
              <td>No</td>
              <td><strong>Yes</strong> (T2V/I2V toggle)</td>
              <td><strong>Yes</strong> (3.0 Video; required in multi-shot)</td>
            </tr>
            <tr>
              <td><strong>Motion control</strong></td>
              <td>No</td>
              <td>2.6 Motion Control (720p/1080p)</td>
              <td>3.0 Motion Control (std/pro + background source)</td>
            </tr>
            <tr>
              <td><strong>Unique controls</strong></td>
              <td>Negative prompt, CFG scale (0–1)</td>
              <td>Character orientation from image/video</td>
              <td>Multi-shot (≤5), per-shot elements, start/end frames</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>Quick social clips, CFG-tuned I2V</td>
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
      🔊 Need generated sound or motion control?
      <a href="/home/kling/v2-6-text-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v2-6-text-to-video')">Try Kling 2.6 →</a>
      for optional audio on T2V/I2V plus reference-video Motion Control at 720p/1080p.
    </div>

    <div class="upgrade-tip">
      🎬 Want multi-shot storytelling or 3–15s clips?
      <a href="/home/kling/v3-0-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v3-0-video')">Explore Kling 3.0 Video →</a>
      for director mode, std/pro quality, and up to five shots per generation.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  {
    name: 'Kling v2.5 Turbo I2V Pro',
    title: 'I2V Pro',
    description: 'Animate one image with optional tail frame—CFG, 5/10s.',
    path: '/home/kling/v2-5-turbo-image-to-video-pro',
    icon: 'fas fa-image'
  },
  {
    name: 'Kling v2.5 Turbo T2V Pro',
    title: 'T2V Pro',
    description: 'Text-to-video—16:9/9:16/1:1, negative prompt, CFG, 5/10s.',
    path: '/home/kling/v2-5-turbo-text-to-video-pro',
    icon: 'fas fa-keyboard'
  }
]

const workflowIntroMap = {
  '/home/kling/v2-5-turbo-image-to-video-pro': {
    title: '🖼️ Kling v2.5 Turbo I2V Pro',
    lead: 'Animate a still image—required <strong>image</strong> (max 10MB) + prompt (≤2500 chars). Optional <strong>tail frame</strong>, <strong>negative prompt</strong>, and <strong>CFG scale</strong> (0–1). Duration <strong>5s or 10s</strong>.'
  },
  '/home/kling/v2-5-turbo-text-to-video-pro': {
    title: '⌨️ Kling v2.5 Turbo T2V Pro',
    lead: 'Text-only video—prompt (≤2500), aspect <strong>16:9 / 9:16 / 1:1</strong>, duration <strong>5s or 10s</strong>. Tune with negative prompt and CFG for prompt adherence.'
  }
}

const workflowDefinitionMap = {
  '/home/kling/v2-5-turbo-image-to-video-pro': {
    title: 'What is Kling v2.5 Turbo I2V Pro?',
    body:
      '<strong>Kling v2.5 Turbo I2V Pro</strong> (<code>kling-v2-5-turbo-image-to-video-pro</code>) animates an uploaded image. Required: <strong>imageUrl</strong> + prompt (max 2500). Optional tail frame, negative prompt (max 2496), CFG 0–1. Duration 5s or 10s.'
  },
  '/home/kling/v2-5-turbo-text-to-video-pro': {
    title: 'What is Kling v2.5 Turbo T2V Pro?',
    body:
      '<strong>Kling v2.5 Turbo T2V Pro</strong> (<code>kling-v2-5-turbo-text-to-video-pro</code>) generates video from text. Required: prompt (max 2500). Aspect 16:9, 9:16, or 1:1; duration 5 or 10 seconds. Optional negative prompt and CFG.'
  }
}

const workflowFaqMap = {
  '/home/kling/v2-5-turbo-image-to-video-pro': [
    {
      question: 'Can I use a tail frame on Kling v2.5 Turbo I2V Pro?',
      answer: 'Yes—optional <strong>tail frame</strong> guides the ending. Main image required (JPEG/PNG/WebP, max 10MB each).'
    },
    {
      question: 'What do negative prompt and CFG scale do on v2.5 Turbo I2V?',
      answer: '<strong>Negative prompt</strong> (max 2496) lists unwanted elements. <strong>CFG</strong> (0–1) controls prompt adherence.'
    }
  ],
  '/home/kling/v2-5-turbo-text-to-video-pro': [
    {
      question: 'Which aspect ratios does Kling v2.5 Turbo T2V Pro support?',
      answer: '<strong>16:9</strong>, <strong>9:16</strong>, and <strong>1:1</strong>. Duration <strong>5s or 10s</strong>.'
    },
    {
      question: 'How long can Kling v2.5 Turbo clips be?',
      answer: 'Both T2V and I2V Pro support <strong>5-second</strong> or <strong>10-second</strong> outputs—credits vary by duration.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Kling v2.5 Turbo?',
    answer: 'No—v2.5 Turbo runs in the cloud on FuseAITools. Credits are charged per successful 5s/10s generation.'
  },
  {
    question: 'How is Kling v2.5 Turbo priced on FuseAITools?',
    answer: 'Credits depend on <strong>duration (5/10s)</strong>—shown on the Generate button. New users get <strong>20 free credits</strong>—see <a href="/pricing" class="seo-pricing-link">pricing</a>.'
  }
]

const workflowIntro = computed(() => workflowIntroMap[route.path.replace(/\/$/, '')] || null)
const workflowDefinition = computed(() => workflowDefinitionMap[route.path.replace(/\/$/, '')] || null)
const faqItems = computed(() => {
  const path = route.path.replace(/\/$/, '')
  return [...(workflowFaqMap[path] || []), ...commonFaq]
})
useToolSeoFaqSchema(faqItems)

const coreFeatures = [
  { icon: '⚡', title: 'Fast Turbo Tier', description: 'Lowest-latency Kling scene generation—optimized for batch social clips.' },
  { icon: '🎚️', title: 'CFG + Negative Prompt', description: 'Fine-tune prompt adherence with <strong>CFG 0–1</strong> and element exclusion lists.' },
  { icon: '🖼️', title: 'Tail Frame I2V', description: 'Optional end frame on I2V Pro to control how the clip finishes.' },
  { icon: '☁️', title: 'Cloud on FuseAITools', description: '5/10s outputs in the browser—credits shown before generate.' }
]

const scenarioTags = ['Quick social clips', 'CFG-tuned I2V', 'Product still animation', 'A/B prompt testing']

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path.includes('/home/kling/v2-5-turbo-'))

const openFaqIndex = ref(0)
function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
