<template>
  <div
    id="sora-v2-section"
    class="sora-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Sora 2 on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Sora 2 text-to-video and image-to-video on FuseAITools—prompts up to 10000 chars, portrait/landscape, 10s/15s, optional watermark removal."
    />

    <div class="version-badge">🎬 Sora 2 · Standard Video Generation · Two Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎬 Sora 2 on FuseAITools</h2>
      <p class="tool-sub">
        <strong>Sora 2</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> is OpenAI's
        standard video generation tier—realistic motion, physics consistency, and improved control
        over style and scene. Generate from <strong>text prompts up to 10000 characters</strong>
        or animate <strong>reference images</strong> with <strong>portrait or landscape</strong>
        aspect ratios at <strong>10s or 15s</strong> duration. Optional watermark removal.
        New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Sora 2 Core Features</h2>
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

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Sora 2)</h2>
      <div class="faq-list">
        <div
          v-for="(faq, index) in faqItems"
          :key="index"
          class="faq-item"
          :class="{ open: openFaqIndex === index }"
        >
          <button
            type="button"
            class="faq-question"
            :aria-expanded="openFaqIndex === index"
            @click="toggleFaq(index)"
          >
            <span>{{ faq.question }}</span>
            <span class="faq-toggle" aria-hidden="true">{{ openFaqIndex === index ? '➖' : '➕' }}</span>
          </button>
          <div
            v-show="openFaqIndex === index"
            class="faq-answer"
          >
            <div v-html="faq.answer" />
          </div>
        </div>
      </div>
    </section>

    <section class="info-section" aria-labelledby="tech-heading">
      <h2 id="tech-heading" class="section-title">⚙️ Sora 2 Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Sora 2 form and API (<code>sora-2-*</code> models).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Sora 2 workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Input</th>
              <th>Aspect ratio</th>
              <th>Duration</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Text to Video</strong></td>
              <td>Prompt ≤10000 chars</td>
              <td>portrait / landscape</td>
              <td>10s / 15s</td>
              <td>Prompt + aspect ratio + frames + remove watermark</td>
            </tr>
            <tr>
              <td><strong>Image to Video</strong></td>
              <td>Prompt ≤10000 chars + up to 3 reference images</td>
              <td>portrait / landscape</td>
              <td>10s / 15s</td>
              <td>Prompt + images + aspect ratio + frames + remove watermark</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Image inputs: JPG, PNG, WebP (max 10MB each, up to 3 images). The remove-watermark option is available on both T2V and I2V. Prompts exceeding 10000 characters will be rejected.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Sora 2 — Two Standard Workflows</h2>
      <p class="section-lead">Choose the mode that matches your task:</p>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in sora2Workflows"
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

    <!-- Sora 2 vs Sora 2 Pro comparison -->
    <section class="info-section" aria-labelledby="compare-heading">
      <h2 id="compare-heading" class="section-title">📊 Sora 2 vs Sora 2 Pro</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Sora 2 vs Sora 2 Pro">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Sora 2 (Standard)</th>
              <th>Sora 2 Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Positioning</td>
              <td>Standard video generation with essential controls</td>
              <td>Pro-grade generation with size tiers and storyboard</td>
            </tr>
            <tr>
              <td>Workflows</td>
              <td><strong>Two</strong>—T2V, I2V</td>
              <td><strong>Three</strong>—Pro T2V, Pro I2V, Pro Storyboard</td>
            </tr>
            <tr>
              <td>Prompt limit</td>
              <td><strong>10000</strong> characters</td>
              <td><strong>10000</strong> characters</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td><strong>10s / 15s</strong></td>
              <td>T2V/I2V: <strong>10s / 15s</strong>; Storyboard: <strong>10s / 15s / 25s</strong></td>
            </tr>
            <tr>
              <td>Size control</td>
              <td>Not available—single quality</td>
              <td><strong>Standard / High</strong> (T2V & I2V)</td>
            </tr>
            <tr>
              <td>Multi-scene</td>
              <td>Single-scene only</td>
              <td>Storyboard: <strong>multi-scene</strong> with per-shot duration</td>
            </tr>
            <tr>
              <td>Reference images</td>
              <td>Up to <strong>3</strong> images (I2V)</td>
              <td>Up to <strong>3</strong> images (I2V & Storyboard optional)</td>
            </tr>
            <tr>
              <td>Watermark removal</td>
              <td>✅ Available</td>
              <td>✅ Available (T2V & I2V)</td>
            </tr>
            <tr>
              <td>Best for</td>
              <td>Standard text/image-to-video with clean controls</td>
              <td>Higher quality, multi-shot narratives & storyboard</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="upgrade-tip pricing-tip">
      💳 New users get <strong>20 free credits</strong> on sign-up.
      <a href="/pricing" class="seo-pricing-link">View pricing</a>
      for Sora 2 per-generation costs.
    </div>

    <div class="upgrade-tip">
      🚀 <strong>Need higher quality or multi-scene storyboards?</strong>
      <a
        href="/home/sora/pro-text-to-video"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/sora/pro-text-to-video')"
      >Upgrade to Sora 2 Pro Text to Video →</a>
      with <strong>standard/high size</strong> control, or
      <a
        href="/home/sora/pro-image-to-video"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/sora/pro-image-to-video')"
      >Sora 2 Pro Image to Video</a>
      for pro-grade I2V. For multi-scene narratives, use
      <a
        href="/home/sora/pro-storyboard"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/sora/pro-storyboard')"
      >Sora 2 Pro Storyboard →</a>
      with up to <strong>25s</strong> and per-shot scene control.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const sora2Workflows = [
  {
    name: 'Sora 2 Text to Video',
    title: 'Text to Video',
    description: 'Generate videos from text prompts up to 10000 chars—portrait/landscape, 10s or 15s, optional watermark removal.',
    path: '/home/sora/text-to-video',
    icon: 'fas fa-keyboard'
  },
  {
    name: 'Sora 2 Image to Video',
    title: 'Image to Video',
    description: 'Animate up to 3 reference images with a text prompt—full aspect ratio and duration controls.',
    path: '/home/sora/image-to-video',
    icon: 'fas fa-image'
  }
]

const workflowIntroMap = {
  '/home/sora/text-to-video': {
    title: '📝 Sora 2 Text to Video',
    lead: 'Generate videos from <strong>text prompts up to 10000 characters</strong> with OpenAI Sora 2. Choose <strong>portrait or landscape</strong> aspect ratio, <strong>10s or 15s</strong> duration, and optional <strong>watermark removal</strong>.'
  },
  '/home/sora/image-to-video': {
    title: '🖼️ Sora 2 Image to Video',
    lead: 'Upload <strong>up to 3 reference images</strong> and animate them with a text prompt (≤10000 chars). Sora 2 produces realistic motion with physics consistency, supporting portrait and landscape formats at 10s or 15s.'
  }
}

const workflowDefinitionMap = {
  '/home/sora/text-to-video': {
    title: 'What is Sora 2 Text to Video?',
    body:
      '<strong>Sora 2 Text to Video</strong> on FuseAITools (<code>sora-2-text-to-video</code>) generates videos from a text prompt (≤10000 characters). Configure <strong>aspect ratio</strong> (portrait/landscape), <strong>duration</strong> (10s/15s), and toggle <strong>watermark removal</strong>. Ideal for social content, marketing videos, and creative prototyping.'
  },
  '/home/sora/image-to-video': {
    title: 'What is Sora 2 Image to Video?',
    body:
      '<strong>Sora 2 Image to Video</strong> on FuseAITools (<code>sora-2-image-to-video</code>) animates <strong>up to 3 reference images</strong> with a text prompt (≤10000 chars). Same aspect ratio and duration controls as T2V. Use it to bring product photos, character art, or storyboards to life with natural motion.'
  }
}

const workflowFaqMap = {
  '/home/sora/text-to-video': [
    {
      question: 'What are the duration options for Sora 2 text-to-video?',
      answer:
        'Two options: <strong>10 seconds</strong> (standard) or <strong>15 seconds</strong> (extended motion). Choose based on your content needs—shorter clips for social media, longer for storytelling or product demonstrations.'
    },
    {
      question: 'What aspect ratios does Sora 2 text-to-video support?',
      answer:
        'Two aspect ratios: <strong>portrait</strong> (9:16, ideal for mobile/social) and <strong>landscape</strong> (16:9, ideal for widescreen). Unlike Sora 2 Pro, there is no square or custom ratio option.'
    }
  ],
  '/home/sora/image-to-video': [
    {
      question: 'How many images can I upload for Sora 2 image-to-video?',
      answer:
        'Up to <strong>3 images</strong> (JPG, PNG, or WebP, max 10MB each). Upload at least one image when using I2V mode. The images serve as visual anchors for the generated video motion.'
    },
    {
      question: 'Does Sora 2 image-to-video support watermark removal?',
      answer:
        'Yes, the <strong>remove watermark</strong> toggle is available on both Sora 2 T2V and I2V workflows. It removes the OpenAI Sora watermark from the generated output.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Sora 2?',
    answer:
      'No—Sora 2 runs entirely in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How is Sora 2 priced on FuseAITools?',
    answer:
      'Credits are shown on the Generate button before each run. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
  }
]

const workflowIntro = computed(() => {
  const path = route.path.replace(/\/$/, '')
  return workflowIntroMap[path] || null
})

const workflowDefinition = computed(() => {
  const path = route.path.replace(/\/$/, '')
  return workflowDefinitionMap[path] || null
})

const faqItems = computed(() => {
  const path = route.path.replace(/\/$/, '')
  const workflowFaqs = workflowFaqMap[path] || []
  return [...workflowFaqs, ...commonFaq]
})

useToolSeoFaqSchema(faqItems)

const coreFeatures = [
  {
    icon: '🎥',
    title: 'OpenAI Sora Quality',
    description:
      'Powered by OpenAI\'s <strong>Sora 2 model</strong>—realistic motion, physics consistency, and improved control over style, scene, and aspect ratio for creative and social content.'
  },
  {
    icon: '📝',
    title: 'Long Prompt Support',
    description:
      'Prompts up to <strong>10000 characters</strong> allow detailed scene descriptions, complex narratives, and precise motion instructions for accurate video generation.'
  },
  {
    icon: '🖼️',
    title: 'Image-to-Video Animation',
    description:
      'Upload <strong>up to 3 reference images</strong> and animate them with descriptive prompts. The model preserves visual identity while generating natural movement.'
  },
  {
    icon: '⏱️',
    title: 'Flexible Duration',
    description:
      'Choose between <strong>10s and 15s</strong> output duration. Shorter for punchy social clips, longer for more detailed scene exploration.'
  },
  {
    icon: '💧',
    title: 'Watermark Control',
    description:
      'Built-in <strong>watermark removal</strong> toggle gives you clean, publish-ready output without post-processing.'
  }
]

const scenarioTags = [
  'Social media video content',
  'Marketing & ad creatives',
  'Product showcase animations',
  'Concept visualization & prototyping',
  'Short-form storytelling'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) =>
  path === '/home/sora/text-to-video' || path === '/home/sora/image-to-video'
)

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
