<template>
  <div
    id="flux-kontext-v2-section"
    class="flux-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Flux 2 Image on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Flux 2 and Flux 2 Pro text-to-image and image-to-image on FuseAITools—1K/2K resolution, eight aspect ratios plus auto, and up to eight reference images on I2I."
    />

    <div class="version-badge">🖼️ Flux 2 · v2 · T2I & I2I · Standard & Pro · 1K/2K</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🖼️ Flux 2 on FuseAITools</h2>
      <p class="tool-sub">
        <strong>Flux 2 (v2)</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> is Black Forest Labs' dedicated
        1K/2K image line—four workflows split into <strong>Flux 2</strong> (fast drafts) and <strong>Flux 2 Pro</strong>
        (higher fidelity). Image-to-image modes accept <strong>1–8</strong> reference images; prompts are
        <strong>3–5000 characters</strong>. Credits scale by resolution (1K vs 2K). New users receive
        <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Flux 2 Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">{{ workflowCompareTitle }}</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" :aria-label="workflowCompareTitle">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>{{ isTextToImageRoute ? 'Text to Image' : 'Image to Image' }}</th>
              <th>{{ isProRoute ? 'Pro (current)' : 'Pro upgrade' }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Input</strong></td>
              <td>{{ isTextToImageRoute ? 'Prompt (3–5000 chars)' : '1–8 images + prompt' }}</td>
              <td>Same pipeline, higher-fidelity model</td>
            </tr>
            <tr>
              <td><strong>modelKey</strong></td>
              <td><code>{{ currentModelKey }}</code></td>
              <td><code>{{ proModelKey }}</code></td>
            </tr>
            <tr>
              <td><strong>Resolution</strong></td>
              <td colspan="2"><strong>1K</strong> or <strong>2K</strong></td>
            </tr>
            <tr>
              <td><strong>Aspect ratios</strong></td>
              <td colspan="2">1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, auto</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>{{ isTextToImageRoute ? 'Fast 2K concept drafts' : 'Multi-reference style and layout lock' }}</td>
              <td>Client-facing finals and finer detail</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Flux 2)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Flux 2 Technical Specs</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Flux 2 workflow capabilities">
          <thead>
            <tr><th>Workflow</th><th>modelKey</th><th>Required</th><th>Key controls</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Flux 2 T2I</strong></td>
              <td><code>flux-2-text-to-image</code></td>
              <td>Prompt (3–5000)</td>
              <td>1K/2K; 8 ratios + auto</td>
            </tr>
            <tr>
              <td><strong>Flux 2 I2I</strong></td>
              <td><code>flux-2-image-to-image</code></td>
              <td>1–8 images + prompt</td>
              <td>1K/2K; 8 ratios + auto</td>
            </tr>
            <tr>
              <td><strong>Flux 2 Pro T2I</strong></td>
              <td><code>flux-2-pro-text-to-image</code></td>
              <td>Prompt (3–5000)</td>
              <td>1K/2K; higher fidelity</td>
            </tr>
            <tr>
              <td><strong>Flux 2 Pro I2I</strong></td>
              <td><code>flux-2-pro-image-to-image</code></td>
              <td>1–8 images + prompt</td>
              <td>1K/2K; higher fidelity</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">Reference uploads: JPEG, PNG, WebP (max 10MB each). Credits depend on <strong>1K vs 2K</strong>—shown on Generate before submission.</p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Flux 2 — Four Workflows</h2>
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

    <section v-if="!isProRoute" class="info-section" aria-labelledby="version-compare-heading">
      <h2 id="version-compare-heading" class="section-title">📊 Flux 2 vs Flux 2 Pro</h2>
      <p class="section-lead">
        <strong>Flux 2</strong> standard workflows optimize for fast 1K/2K iteration;
        <strong>Flux 2 Pro</strong> targets higher-fidelity output on the same T2I/I2I pipeline.
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Flux 2 vs Flux 2 Pro">
          <thead>
            <tr><th>Dimension</th><th>Flux 2</th><th>Flux 2 Pro</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Positioning</strong></td>
              <td>Fast 1K/2K drafts</td>
              <td>Higher-fidelity finals</td>
            </tr>
            <tr>
              <td><strong>Workflows</strong></td>
              <td>T2I, I2I</td>
              <td>Pro T2I, Pro I2I</td>
            </tr>
            <tr>
              <td><strong>Resolution</strong></td>
              <td colspan="2"><strong>1K / 2K</strong> (credit tier by quality)</td>
            </tr>
            <tr>
              <td><strong>Multi-reference I2I</strong></td>
              <td colspan="2"><strong>1–8</strong> input images</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>Exploration and social-ready 2K</td>
              <td>Marketing and print-adjacent quality</td>
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

    <div v-if="!isProRoute" class="upgrade-tip">
      ✨ Need higher-fidelity Flux 2 output?
      <a :href="proUpgradePath" class="seo-inline-link" @click.prevent="navigateToToolTop(proUpgradePath)">Try {{ proUpgradeLabel }} →</a>
      for Pro-tier detail on the same {{ isTextToImageRoute ? 'text-to-image' : 'image-to-image' }} pipeline.
    </div>

    <div class="upgrade-tip">
      🎬 Turn Flux 2 stills into video with
      <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedance/v1-lite-image-to-video')">Seedance Image to Video →</a>
      or browse multimodal
      <a href="/home/seedance/v2" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedance/v2')">Seedance 2</a>
      for reference-driven clips.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const imageWorkflows = [
  {
    name: 'Flux 2 Text to Image',
    title: 'Flux 2 T2I',
    description: 'Prompt-only 1K/2K generation—eight ratios + auto.',
    path: '/home/flux-kontext/flux-2-text-to-image',
    icon: 'fas fa-font'
  },
  {
    name: 'Flux 2 Image to Image',
    title: 'Flux 2 I2I',
    description: '1–8 reference images + prompt, 1K/2K.',
    path: '/home/flux-kontext/flux-2-image-to-image',
    icon: 'fas fa-image'
  },
  {
    name: 'Flux 2 Pro Text to Image',
    title: 'Flux 2 Pro T2I',
    description: 'Higher-fidelity T2I at 1K/2K.',
    path: '/home/flux-kontext/flux-2-pro-text-to-image',
    icon: 'fas fa-pen-ruler'
  },
  {
    name: 'Flux 2 Pro Image to Image',
    title: 'Flux 2 Pro I2I',
    description: 'Pro multi-reference edit—1–8 images.',
    path: '/home/flux-kontext/flux-2-pro-image-to-image',
    icon: 'fas fa-layer-group'
  }
]

const workflowIntroMap = {
  '/home/flux-kontext/flux-2-text-to-image': {
    title: '📝 Flux 2 Text to Image',
    lead: 'Prompt-only generation—<strong>3–5000 characters</strong>, aspect <strong>1:1 / 4:3 / 3:4 / 16:9 / 9:16 / 3:2 / 2:3 / auto</strong>, resolution <strong>1K or 2K</strong>. Credits vary by quality tier.'
  },
  '/home/flux-kontext/flux-2-image-to-image': {
    title: '🖼️ Flux 2 Image to Image',
    lead: 'Upload <strong>1–8</strong> reference images (max 10MB each) + prompt (3–5000 chars). Pick <strong>1K/2K</strong> and aspect ratio—including <strong>auto</strong>.'
  },
  '/home/flux-kontext/flux-2-pro-text-to-image': {
    title: '✨ Flux 2 Pro Text to Image',
    lead: 'Pro-tier text-to-image—same prompt and ratio controls as Flux 2 T2I with higher-fidelity output at <strong>1K/2K</strong>.'
  },
  '/home/flux-kontext/flux-2-pro-image-to-image': {
    title: '✨ Flux 2 Pro Image to Image',
    lead: 'Pro-tier multi-reference edit—<strong>1–8</strong> input images, prompt (3–5000), <strong>1K/2K</strong>, and eight aspect ratios + auto.'
  }
}

const workflowDefinitionMap = {
  '/home/flux-kontext/flux-2-text-to-image': {
    title: 'What is Flux 2 Text to Image?',
    body: '<strong>Flux 2 Text to Image</strong> on FuseAITools (<code>flux-2-text-to-image</code>) generates images from a prompt. Required: prompt (3–5000 chars). Set resolution <strong>1K or 2K</strong> and aspect ratio. RULE pricing by quality tier.'
  },
  '/home/flux-kontext/flux-2-image-to-image': {
    title: 'What is Flux 2 Image to Image?',
    body: '<strong>Flux 2 Image to Image</strong> (<code>flux-2-image-to-image</code>) edits or restyles from <strong>1–8</strong> reference images plus a prompt (3–5000 chars). Resolution 1K/2K; aspect ratios include auto.'
  },
  '/home/flux-kontext/flux-2-pro-text-to-image': {
    title: 'What is Flux 2 Pro Text to Image?',
    body: '<strong>Flux 2 Pro Text to Image</strong> (<code>flux-2-pro-text-to-image</code>)—same inputs as Flux 2 T2I with Pro-tier fidelity. Prompt 3–5000 chars; 1K/2K; eight aspect ratios + auto.'
  },
  '/home/flux-kontext/flux-2-pro-image-to-image': {
    title: 'What is Flux 2 Pro Image to Image?',
    body: '<strong>Flux 2 Pro Image to Image</strong> (<code>flux-2-pro-image-to-image</code>)—Pro multi-reference pipeline. Required: 1–8 images + prompt; 1K/2K output.'
  }
}

const workflowFaqMap = {
  '/home/flux-kontext/flux-2-text-to-image': [
    {
      question: 'Which resolutions does Flux 2 text-to-image support?',
      answer: '<strong>1K</strong> and <strong>2K</strong>—credit cost follows the quality tier shown on Generate.'
    },
    {
      question: 'How long can my Flux 2 prompt be?',
      answer: 'Between <strong>3 and 5000 characters</strong>. Pick one of eight aspect ratios or <strong>auto</strong>.'
    }
  ],
  '/home/flux-kontext/flux-2-image-to-image': [
    {
      question: 'How many reference images can Flux 2 image-to-image use?',
      answer: 'Upload <strong>1–8</strong> images (JPEG/PNG/WebP, max 10MB each) plus a prompt (3–5000 chars).'
    },
    {
      question: 'Does Flux 2 I2I support auto aspect ratio?',
      answer: 'Yes—choose <strong>auto</strong> or fixed ratios (1:1 through 2:3). Resolution <strong>1K/2K</strong> affects credits.'
    }
  ],
  '/home/flux-kontext/flux-2-pro-text-to-image': [
    {
      question: 'When should I pick Flux 2 Pro text-to-image over Flux 2 T2I?',
      answer: 'Use <strong>Flux 2 T2I</strong> for fast 2K exploration; switch to <strong>Pro T2I</strong> when you need higher-fidelity finals on the same prompt and ratio controls.'
    },
    {
      question: 'Is Flux 2 Pro T2I priced differently from Flux 2 T2I?',
      answer: 'Both use RULE pricing by <strong>1K vs 2K</strong> quality—Pro tier may differ per credit table. Credits show on Generate before submission.'
    }
  ],
  '/home/flux-kontext/flux-2-pro-image-to-image': [
    {
      question: 'How is Flux 2 Pro image-to-image different from Flux 2 I2I?',
      answer: 'Same inputs—<strong>1–8</strong> images + prompt—but Pro targets sharper detail and cleaner edges for client-facing edits.'
    },
    {
      question: 'Can I mix many references on Flux 2 Pro I2I?',
      answer: 'Yes—up to <strong>8</strong> reference images at 1K/2K. Prompt must stay within 3–5000 characters.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Flux 2?',
    answer: 'No—Flux 2 runs in the cloud on FuseAITools. Pick 1K or 2K; credits appear on the Generate button.'
  },
  {
    question: 'How is Flux 2 priced on FuseAITools?',
    answer: 'RULE credits by <strong>quality (1K/2K)</strong> per workflow modelKey. See <a href="/pricing" class="seo-pricing-link">pricing</a>. New users get <strong>20 free credits</strong> on sign-up.'
  }
]

const normalizedPath = computed(() => route.path.replace(/\/$/, ''))
const workflowIntro = computed(() => workflowIntroMap[normalizedPath.value] || null)
const workflowDefinition = computed(() => workflowDefinitionMap[normalizedPath.value] || null)
const faqItems = computed(() => [...(workflowFaqMap[normalizedPath.value] || []), ...commonFaq])
useToolSeoFaqSchema(faqItems)

const isProRoute = computed(() => normalizedPath.value.includes('-pro-'))
const isTextToImageRoute = computed(() => normalizedPath.value.includes('text-to-image'))

const workflowCompareTitle = computed(() => {
  if (isTextToImageRoute.value) return '📊 Flux 2 T2I vs Flux 2 Pro T2I'
  return '📊 Flux 2 I2I vs Flux 2 Pro I2I'
})

const currentModelKey = computed(() => {
  const map = {
    '/home/flux-kontext/flux-2-text-to-image': 'flux-2-text-to-image',
    '/home/flux-kontext/flux-2-image-to-image': 'flux-2-image-to-image',
    '/home/flux-kontext/flux-2-pro-text-to-image': 'flux-2-pro-text-to-image',
    '/home/flux-kontext/flux-2-pro-image-to-image': 'flux-2-pro-image-to-image'
  }
  return map[normalizedPath.value] || 'flux-2-text-to-image'
})

const proModelKey = computed(() =>
  isTextToImageRoute.value ? 'flux-2-pro-text-to-image' : 'flux-2-pro-image-to-image'
)

const proUpgradePath = computed(() =>
  isTextToImageRoute.value
    ? '/home/flux-kontext/flux-2-pro-text-to-image'
    : '/home/flux-kontext/flux-2-pro-image-to-image'
)

const proUpgradeLabel = computed(() =>
  isTextToImageRoute.value ? 'Flux 2 Pro Text to Image' : 'Flux 2 Pro Image to Image'
)

const coreFeatures = [
  { icon: '📐', title: '1K / 2K Output', description: 'Pick resolution per run—credits follow the <strong>quality</strong> tier on Generate.' },
  { icon: '🖼️', title: 'Multi-Reference I2I', description: 'Up to <strong>8</strong> input images on I2I workflows for style and layout consistency.' },
  { icon: '✨', title: 'Flux 2 Pro Tier', description: 'Pro T2I/I2I for higher-fidelity finals on the same prompt and ratio controls.' },
  { icon: '☁️', title: 'Cloud on FuseAITools', description: 'Four v2 workflows—RULE pricing shown before generate.' }
]

const scenarioTags = ['2K social creatives', 'Multi-ref style lock', 'Pro marketing stills', 'Concept-to-final pipeline']

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) =>
  path.startsWith('/home/flux-kontext/flux-2')
)

const openFaqIndex = ref(0)
function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
