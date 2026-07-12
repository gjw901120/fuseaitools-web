<template>
  <div
    id="sora-pro-section"
    class="sora-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Sora 2 Pro on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Sora 2 Pro text-to-video, image-to-video, and storyboard on FuseAITools—size control (standard/high), multi-scene storyboard, 10s/15s/25s duration."
    />

    <div class="version-badge">🌟 Sora 2 Pro · Pro-Grade Video Generation · Three Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🌟 Sora 2 Pro on FuseAITools</h2>
      <p class="tool-sub">
        <strong>Sora 2 Pro</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> is the
        professional-tier of OpenAI's Sora video generation—<strong>three workflows</strong> covering
        pro T2V, pro I2V, and <strong>multi-scene storyboard</strong> with per-shot duration control.
        Choose <strong>standard or high quality size</strong>, durations from <strong>10s to 25s</strong>,
        and craft complex narratives with the built-in shot builder. New users receive
        <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Sora 2 Pro Core Features</h2>
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
      <h2 id="faq-heading" class="section-title">❓ FAQ (Sora 2 Pro)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Sora 2 Pro Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Sora 2 Pro form and API (<code>sora-2-pro-*</code> models).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Sora 2 Pro workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Input</th>
              <th>Duration</th>
              <th>Size</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Pro Text to Video</strong></td>
              <td>Prompt ≤10000 chars</td>
              <td>10s / 15s</td>
              <td>standard / high</td>
              <td>Prompt + size + aspect ratio + frames + remove watermark</td>
            </tr>
            <tr>
              <td><strong>Pro Image to Video</strong></td>
              <td>Prompt ≤10000 chars + up to 3 reference images</td>
              <td>10s / 15s</td>
              <td>standard / high</td>
              <td>Prompt + images + size + aspect ratio + frames + remove watermark</td>
            </tr>
            <tr>
              <td><strong>Pro Storyboard</strong></td>
              <td>Per-shot descriptions + optional reference images</td>
              <td>10s / 15s / <strong>25s</strong></td>
              <td>Fixed (high quality)</td>
              <td>Multi-shot builder + per-shot duration + aspect ratio + optional images</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Image inputs: JPG, PNG, WebP (max 10MB each, up to 3 images). Storyboard supports optional reference images for visual consistency across shots. Pro T2V and I2V include the standard/high size toggle and watermark removal.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Sora 2 Pro — Three Pro Workflows</h2>
      <p class="section-lead">Choose the mode that matches your task:</p>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in soraProWorkflows"
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
      for Sora 2 Pro per-generation costs.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { handleModeClick, navigateToToolTop, watchRouteScroll } = useToolSeoPageScroll()

const soraProWorkflows = [
  {
    name: 'Sora 2 Pro Text to Video',
    title: 'Pro Text to Video',
    description: 'Pro-grade text-to-video with standard/high size control, 10s/15s duration, and watermark removal.',
    path: '/home/sora/pro-text-to-video',
    icon: 'fas fa-magic'
  },
  {
    name: 'Sora 2 Pro Image to Video',
    title: 'Pro Image to Video',
    description: 'Animate up to 3 reference images with pro quality—size and duration controls.',
    path: '/home/sora/pro-image-to-video',
    icon: 'fas fa-wand-magic-sparkles'
  },
  {
    name: 'Sora 2 Pro Storyboard',
    title: 'Pro Storyboard',
    description: 'Multi-scene narratives with per-shot descriptions and duration. Up to 25s total.',
    path: '/home/sora/pro-storyboard',
    icon: 'fas fa-book'
  }
]

const workflowIntroMap = {
  '/home/sora/pro-text-to-video': {
    title: '📝 Sora 2 Pro Text to Video',
    lead: 'Pro-grade text-to-video generation with <strong>standard or high quality size</strong> control, <strong>10s or 15s</strong> duration, and <strong>watermark removal</strong>. Prompts up to 10000 characters.'
  },
  '/home/sora/pro-image-to-video': {
    title: '🖼️ Sora 2 Pro Image to Video',
    lead: 'Professional image-to-video with <strong>size control (standard/high)</strong>, <strong>up to 3 reference images</strong>, and full aspect ratio and duration options. Watermark removal included.'
  },
  '/home/sora/pro-storyboard': {
    title: '📖 Sora 2 Pro Storyboard',
    lead: 'Create <strong>multi-scene narratives</strong> with per-shot descriptions and individual duration settings. Supports <strong>10s, 15s, or 25s</strong> total duration with optional reference images for visual consistency across shots.'
  }
}

const workflowDefinitionMap = {
  '/home/sora/pro-text-to-video': {
    title: 'What is Sora 2 Pro Text to Video?',
    body:
      '<strong>Sora 2 Pro Text to Video</strong> on FuseAITools (<code>sora-2-pro-text-to-video</code>) generates videos from text prompts (≤10000 chars) with an additional <strong>size control</strong> (standard or high), offering higher quality output than Sora 2 standard.'
  },
  '/home/sora/pro-image-to-video': {
    title: 'What is Sora 2 Pro Image to Video?',
    body:
      '<strong>Sora 2 Pro Image to Video</strong> on FuseAITools (<code>sora-2-pro-image-to-video</code>) animates <strong>up to 3 reference images</strong> with size control (standard/high) for superior output quality. Ideal for professional content pipelines.'
  },
  '/home/sora/pro-storyboard': {
    title: 'What is Sora 2 Pro Storyboard?',
    body:
      '<strong>Sora 2 Pro Storyboard</strong> on FuseAITools (<code>sora-2-pro-storyboard</code>) is a <strong>multi-scene video builder</strong> that lets you define a sequence of shots with individual descriptions and durations. Total duration options: <strong>10s, 15s, or 25s</strong>. Optional reference images maintain visual consistency across scenes.'
  }
}

const workflowFaqMap = {
  '/home/sora/pro-text-to-video': [
    {
      question: 'What is the difference between Sora 2 Pro text-to-video and the standard Sora 2?',
      answer:
        'Sora 2 Pro adds a <strong>size control</strong> (standard/high) that lets you choose output quality. Standard size matches Sora 2 quality while high delivers superior fidelity. Pro T2V also shares infrastructure with the Pro I2V and Storyboard workflows for a unified pro pipeline.'
    },
    {
      question: 'Does Sora 2 Pro text-to-video support the same duration and aspect ratio as Sora 2?',
      answer:
        'Yes—<strong>10s/15s</strong> duration and <strong>portrait/landscape</strong> aspect ratios, plus the same <strong>watermark removal</strong> toggle and <strong>10000-char prompt</strong> limit.'
    }
  ],
  '/home/sora/pro-image-to-video': [
    {
      question: 'How many images can I use in Sora 2 Pro image-to-video?',
      answer:
        'Up to <strong>3 images</strong> (JPG, PNG, WebP, max 10MB each). Unlike the standard Sora 2 I2V, the Pro version adds the <strong>size control (standard/high)</strong> for improved output quality.'
    },
    {
      question: 'Is watermark removal available in Sora 2 Pro image-to-video?',
      answer:
        'Yes—the <strong>remove watermark</strong> toggle is available on both Pro T2V and Pro I2V workflows. It is not available on the Pro Storyboard workflow.'
    }
  ],
  '/home/sora/pro-storyboard': [
    {
      question: 'How does the Sora 2 Pro Storyboard shot builder work?',
      answer:
        'Each shot requires a <strong>scene description</strong> and a <strong>duration in seconds</strong>. You can add or remove shots, and the total scene duration must exactly match the selected total duration (10s, 15s, or 25s). Optional reference images can be uploaded to maintain visual consistency.'
    },
    {
      question: 'What is the maximum duration for Sora 2 Pro Storyboard?',
      answer:
        '<strong>25 seconds</strong>—significantly longer than the 10s/15s limit on standard Sora 2 or Pro T2V/I2V. This makes it ideal for short films, product narratives, and multi-scene storytelling. Storyboard does not include the watermark removal option.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Sora 2 Pro?',
    answer:
      'No—Sora 2 Pro runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How is Sora 2 Pro priced on FuseAITools?',
    answer:
      'Credits depend on the model, selected duration, and size (standard/high). The exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
    icon: '📐',
    title: 'Size Control (Standard / High)',
    description:
      'Choose <strong>standard</strong> for speed or <strong>high</strong> for superior fidelity on Pro T2V and I2V. Credits scale with the selected size tier.'
  },
  {
    icon: '📖',
    title: 'Multi-Scene Storyboard',
    description:
      'The <strong>storyboard workflow</strong> lets you build multi-shot narratives with individual scene descriptions and per-shot durations. Total duration up to <strong>25 seconds</strong>—ideal for complex storytelling.'
  },
  {
    icon: '🎥',
    title: 'Pro-Grade Output Quality',
    description:
      'Sora 2 Pro delivers <strong>enhanced fidelity and motion coherence</strong> compared to the standard tier, with professional-grade results suitable for client work and production pipelines.'
  },
  {
    icon: '🖼️',
    title: 'Image-to-Video Animation',
    description:
      'Upload <strong>up to 3 reference images</strong> for Pro I2V and Storyboard. The model maintains visual identity while generating natural motion across the output.'
  },
  {
    icon: '⏱️',
    title: 'Flexible Duration & Watermark Control',
    description:
      'Choose from <strong>10s, 15s, or 25s</strong> (storyboard only). Watermark removal toggle available on Pro T2V and I2V for clean, publish-ready output.'
  }
]

const scenarioTags = [
  'Professional video production',
  'Multi-scene storytelling & narratives',
  'High-fidelity marketing content',
  'Client presentations & pitch videos',
  'Complex scene sequencing with shot-by-shot control'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) =>
  path === '/home/sora/pro-text-to-video' || path === '/home/sora/pro-image-to-video' || path === '/home/sora/pro-storyboard'
)

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
