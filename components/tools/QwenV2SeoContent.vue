<template>
  <div
    id="qwen-v2-section"
    class="qwen-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Qwen v2 on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Qwen v2 text-to-image and image-edit on FuseAITools—streamlined generation with aspect ratio control, 800-char prompts, and modern image quality."
    />

    <div class="version-badge">✨ Qwen v2 · Enhanced Generation · Two Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">✨ Qwen v2 on FuseAITools</h2>
      <p class="tool-sub">
        Qwen v2 on <a href="/" class="seo-inline-link">FuseAITools</a> delivers
        <strong>streamlined image generation and editing</strong> with modern quality.
        Choose <strong>v2 Text to Image</strong> for prompt-driven creation with aspect ratio control,
        or <strong>v2 Image Edit</strong> for reference-based editing with up to <strong>21:9</strong> support.
        Both workflows use concise prompts (≤800 characters) and simplified controls.
        New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Qwen v2 Core Features</h2>
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
      <h2 id="faq-heading" class="section-title">❓ FAQ (Qwen v2)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Qwen v2 Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Qwen v2 form and API (<code>qwen2-*</code> models).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Qwen v2 workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Input</th>
              <th>Image sizes / ratios</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>v2 Text to Image</strong></td>
              <td>Prompt ≤800 chars</td>
              <td>1:1, 3:4, 4:3, 9:16, 16:9</td>
              <td>Seed, output format (PNG/JPEG)</td>
            </tr>
            <tr>
              <td><strong>v2 Image Edit</strong></td>
              <td>1 image URL + prompt ≤800 chars</td>
              <td>1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, <strong>21:9</strong></td>
              <td>Seed, output format (PNG/JPEG)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Image inputs: JPEG, PNG, WebP (max 10MB). Default aspect ratio is 16:9 for both workflows.
        Default output format is PNG.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Qwen v2 — Two Workflows</h2>
      <p class="section-lead">Choose the mode that matches your task:</p>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in v2Workflows"
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
      for Qwen v2 per-generation costs.
    </div>

    <div class="upgrade-tip">
      🖼️ <strong>Wan image companion</strong>
      Need high-resolution stills or sequential storyboards?
      <a
        href="/home/wan/2-7-image"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/wan/2-7-image')"
      >Wan 2.7 Image</a>
      offers 1K/2K resolution with up to 9 reference images, or
      <a
        href="/home/wan/2-7-image-pro"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/wan/2-7-image-pro')"
      >Wan 2.7 Image Pro (4K)</a>
      for ultra-high-fidelity hero assets.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const v2Workflows = [
  {
    name: 'Qwen v2 Text to Image',
    title: 'v2 Text to Image',
    description: 'Streamlined T2I with 5 aspect ratios (1:1–16:9), seed control, and PNG/JPEG output.',
    path: '/home/qwen/v2-text-to-image',
    icon: 'fas fa-wand-magic-sparkles'
  },
  {
    name: 'Qwen v2 Image Edit',
    title: 'v2 Image Edit',
    description: 'Upload a reference image and edit with prompts—8 aspect ratios including 21:9.',
    path: '/home/qwen/v2-image-edit',
    icon: 'fas fa-scissors'
  }
]

const workflowIntroMap = {
  '/home/qwen/v2-text-to-image': {
    title: '📝 Qwen v2 Text to Image',
    lead: 'Generate images from <strong>prompts up to 800 characters</strong> with <strong>5 aspect ratio</strong> options (1:1, 3:4, 4:3, 9:16, 16:9). Set an optional <strong>seed</strong> and choose <strong>PNG or JPEG</strong> output—simple and fast.'
  },
  '/home/qwen/v2-image-edit': {
    title: '✂️ Qwen v2 Image Edit',
    lead: 'Upload <strong>one image</strong> and edit with a prompt up to <strong>800 characters</strong>. Choose from <strong>8 aspect ratios</strong> including <strong>21:9</strong> ultra-wide—more flexibility than v1 Classic for format-specific outputs.'
  }
}

const workflowDefinitionMap = {
  '/home/qwen/v2-text-to-image': {
    title: 'What is Qwen v2 Text to Image?',
    body:
      '<strong>Qwen v2 Text to Image</strong> on FuseAITools (<code>qwen2-text-to-image</code>) generates images from a prompt (≤800 characters) with <strong>5 aspect ratios</strong>: 1:1, 3:4, 4:3, 9:16, and 16:9. Optional seed for reproducibility, PNG or JPEG output (default PNG).'
  },
  '/home/qwen/v2-image-edit': {
    title: 'What is Qwen v2 Image Edit?',
    body:
      '<strong>Qwen v2 Image Edit</strong> on FuseAITools (<code>qwen2-image-edit</code>) transforms an uploaded image URL with a prompt (≤800 characters). Choose from <strong>8 aspect ratios</strong> including ultra-wide <strong>21:9</strong>—more format flexibility than the v1 Classic edit workflow.'
  }
}

const workflowFaqMap = {
  '/home/qwen/v2-text-to-image': [
    {
      question: 'What aspect ratios does Qwen v2 text-to-image support?',
      answer:
        'Five options: <strong>1:1, 3:4, 4:3, 9:16, and 16:9</strong>. The default is 16:9 if not specified in the form.'
    },
    {
      question: 'What is the prompt limit for Qwen v2 text-to-image?',
      answer:
        'Prompts are limited to <strong>800 characters</strong>. This is shorter than v1 Classic (5000) but sufficient for streamlined generation with the v2 model architecture.'
    }
  ],
  '/home/qwen/v2-image-edit': [
    {
      question: 'What aspect ratios does Qwen v2 image edit support?',
      answer:
        'Eight options: <strong>1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, and 21:9</strong>. The <strong>21:9</strong> ultra-wide option is exclusive to v2—v1 Classic does not offer it.'
    },
    {
      question: 'Is an image required for Qwen v2 image edit?',
      answer:
        'Yes—you must upload <strong>exactly one image</strong> (JPEG, PNG, or WebP, max 10MB) and provide a prompt up to 800 characters. The image URL is required before generation.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Qwen v2?',
    answer:
      'No—Qwen v2 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How is Qwen v2 priced on FuseAITools?',
    answer:
      'Credits depend on the model—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
    icon: '✨',
    title: 'Streamlined Generation',
    description:
      'Simplified controls for <strong>fast, high-quality results</strong>. No steps, guidance, or acceleration—just prompt, aspect ratio, and optional seed.'
  },
  {
    icon: '📐',
    title: 'Flexible Aspect Ratios',
    description:
      'v2 Image Edit offers <strong>8 aspect ratios</strong> including <strong>21:9</strong> ultra-wide—more format options than v1 Classic for cinematic and widescreen outputs.'
  },
  {
    icon: '⚡',
    title: 'Modern Model Architecture',
    description:
      'Powered by the <strong>qwen2-*</strong> model family for improved image quality, better text rendering, and consistent output at every supported aspect ratio.'
  },
  {
    icon: '🎯',
    title: 'Reference-Based Editing',
    description:
      'Upload an image and edit with short prompts—ideal for quick style transfers, background changes, and product variations.'
  }
]

const scenarioTags = [
  'Quick social media graphics',
  'Product variations & mockups',
  'Cinematic & widescreen edits',
  'Style-consistent brand assets',
  'Ultra-wide 21:9 compositions'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) =>
  path === '/home/qwen/v2-text-to-image' || path === '/home/qwen/v2-image-edit'
)

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
