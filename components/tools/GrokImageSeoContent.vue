<template>
  <div
    id="grok-image-section"
    class="grok-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Grok Imagine Image on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Grok Imagine text-to-image and image-to-image on FuseAITools—xAI image generation from prompts or one reference image, up to 5000 characters."
    />

    <div class="version-badge">🖼️ Grok Imagine · xAI Image · Two Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🖼️ Grok Imagine Image on FuseAITools</h2>
      <p class="tool-sub">
        <strong>Grok Imagine</strong> image workflows on
        <a href="/" class="seo-inline-link">FuseAITools</a> are xAI's still-image line—generate from a
        <strong>text prompt</strong> or transform a single <strong>uploaded image</strong> with optional instructions.
        Credits appear on Generate before you submit; new users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Grok Image Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Grok Text to Image vs Image to Image</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Grok text-to-image vs image-to-image">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Text to Image</th>
              <th>Image to Image</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Input</strong></td>
              <td><strong>Prompt</strong> (required)</td>
              <td><strong>1 image URL</strong> + optional prompt</td>
            </tr>
            <tr>
              <td><strong>modelKey</strong></td>
              <td><code>grok-imagine-text-to-image</code></td>
              <td><code>grok-imagine-image-to-image</code></td>
            </tr>
            <tr>
              <td><strong>Prompt limit</strong></td>
              <td>Max 5000 chars</td>
              <td>Max 5000 chars (optional)</td>
            </tr>
            <tr>
              <td><strong>Output framing</strong></td>
              <td>1:1 square (current form)</td>
              <td>Derived from source image</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>New concepts from scratch</td>
              <td>Style shifts, variations, guided edits</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Grok Imagine Image)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Grok Image Technical Specs</h2>
      <p class="section-lead">Parameters match the FuseAITools Grok image form and API.</p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Grok image workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Required</th>
              <th>Prompt</th>
              <th>Uploads</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Text to Image</strong></td>
              <td>Prompt</td>
              <td>≤5000 chars</td>
              <td>—</td>
            </tr>
            <tr>
              <td><strong>Image to Image</strong></td>
              <td>1 image URL</td>
              <td>Optional, ≤5000 chars</td>
              <td>JPEG/PNG/WebP, max 10MB</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">Pricing: per-generation credits by modelKey—shown on Generate (<code>grok-imagine-text-to-image</code> / <code>grok-imagine-image-to-image</code>).</p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Grok Imagine — Two Image Workflows</h2>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in imageWorkflows"
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
      🎨 Need poster typography or character consistency?
      Try
      <a href="/home/ideogram/v3-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/ideogram/v3-text-to-image')">Ideogram V3 Text to Image →</a>
      for legible text layouts, or
      <a href="/home/flux-kontext/generate" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/flux-kontext/generate')">Flux Kontext</a>
      for Pro/Max still generation and single-image edit.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const imageWorkflows = [
  {
    name: 'Grok Text to Image',
    title: 'Text to Image',
    description: 'Prompt-only—1:1 square output in the current form.',
    path: '/home/grok/text-to-image',
    icon: 'fas fa-font'
  },
  {
    name: 'Grok Image to Image',
    title: 'Image to Image',
    description: 'One reference image + optional prompt for variations.',
    path: '/home/grok/image-to-image',
    icon: 'fas fa-image'
  }
]

const workflowIntroMap = {
  '/home/grok/text-to-image': {
    title: '📝 Grok Text to Image',
    lead: 'Describe your scene in a <strong>prompt</strong> (≤5000 characters). Grok Imagine generates a still image—the current FuseAITools form submits <strong>1:1</strong> square output via <code>grok-imagine-text-to-image</code>.'
  },
  '/home/grok/image-to-image': {
    title: '🖼️ Grok Image to Image',
    lead: 'Upload <strong>one image</strong> (JPEG/PNG/WebP, max 10MB) and optionally add a prompt (≤5000 chars) to guide style or edits through <code>grok-imagine-image-to-image</code>.'
  }
}

const workflowDefinitionMap = {
  '/home/grok/text-to-image': {
    title: 'What is Grok Text to Image?',
    body: '<strong>Grok Text to Image</strong> (<code>grok-imagine-text-to-image</code>) on FuseAITools creates a still image from text. Required: <strong>prompt</strong> (max 5000). The web form currently sends <strong>aspect_ratio 1:1</strong>.'
  },
  '/home/grok/image-to-image': {
    title: 'What is Grok Image to Image?',
    body: '<strong>Grok Image to Image</strong> (<code>grok-imagine-image-to-image</code>) transforms one uploaded image. Required: <strong>exactly one image URL</strong>. Prompt is optional (max 5000 chars).'
  }
}

const workflowFaqMap = {
  '/home/grok/text-to-image': [
    {
      question: 'Is a prompt required for Grok text-to-image?',
      answer: 'Yes—enter a description up to <strong>5000 characters</strong>. The Generate button stays disabled until the prompt is filled.'
    },
    {
      question: 'Which aspect ratio does Grok T2I use on FuseAITools?',
      answer: 'The current form submits <strong>1:1</strong> square output. Describe composition in your prompt if you need a portrait or landscape feel inside the square frame.'
    }
  ],
  '/home/grok/image-to-image': [
    {
      question: 'How many images can I upload for Grok image-to-image?',
      answer: 'The API accepts <strong>exactly one</strong> image per request (JPEG, PNG, or WebP; max <strong>10MB</strong>). Upload one reference, then optionally guide the result with a prompt.'
    },
    {
      question: 'Is a prompt required for Grok image-to-image?',
      answer: 'No—the prompt is <strong>optional</strong> (max 5000 chars). You can submit the image alone or add instructions for style, lighting, or subject changes.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Grok Imagine image?',
    answer: 'No—Grok Imagine runs in the cloud on FuseAITools. Credits appear on the Generate button before you submit.'
  },
  {
    question: 'How is Grok Imagine image priced on FuseAITools?',
    answer: 'Per-generation credits by modelKey (<code>grok-imagine-text-to-image</code> or <code>grok-imagine-image-to-image</code>). See <a href="/pricing" class="seo-pricing-link">pricing</a>. New users get <strong>20 free credits</strong> on sign-up.'
  }
]

const normalizedPath = computed(() => route.path.replace(/\/$/, ''))
const workflowIntro = computed(() => workflowIntroMap[normalizedPath.value] || null)
const workflowDefinition = computed(() => workflowDefinitionMap[normalizedPath.value] || null)
const faqItems = computed(() => [...(workflowFaqMap[normalizedPath.value] || []), ...commonFaq])
useToolSeoFaqSchema(faqItems)

const coreFeatures = [
  { icon: '✍️', title: 'Prompt-First T2I', description: 'Start from text—up to <strong>5000 characters</strong> with credits shown before generate.' },
  { icon: '🖼️', title: 'Single-Image I2I', description: 'Upload <strong>one reference</strong> and optionally steer output with natural language.' },
  { icon: '⚡', title: 'Compact Controls', description: 'Minimal parameters—focus on prompt quality and fast iteration.' },
  { icon: '☁️', title: 'Cloud on FuseAITools', description: 'xAI Grok Imagine in the browser—no local GPU required.' }
]

const scenarioTags = ['Concept art', 'Social thumbnails', 'Style variations', 'Quick visual drafts']

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path === '/home/grok/text-to-image' || path === '/home/grok/image-to-image')

const openFaqIndex = ref(0)
function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
