<template>
  <div
    id="gpt-image-v2-section"
    class="gpt-image-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="GPT Image v2 on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="GPT Image v2 text-to-image and image-to-image on FuseAITools—prompts up to 20000 chars, 6 aspect ratios, 1K/2K/4K resolution, up to 16 input images."
    />

    <div class="version-badge">🌟 GPT Image v2 · Modern Generation · Two Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🌟 GPT Image v2 on FuseAITools</h2>
      <p class="tool-sub">
        GPT Image v2 on <a href="/" class="seo-inline-link">FuseAITools</a> is OpenAI's
        <strong>next-generation image model</strong> with significantly longer prompt capacity
        (<strong>20000 characters</strong>), <strong>selectable resolution up to 4K</strong>,
        <strong>six aspect ratios</strong> including auto-optimized framing, and support for
        <strong>up to 16 reference images</strong> in the I2I workflow. New users receive
        <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ GPT Image v2 Core Features</h2>
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
      <h2 id="faq-heading" class="section-title">❓ FAQ (GPT Image v2)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ GPT Image v2 Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools GPT Image v2 form and API (<code>gpt-image-2-*</code> models).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="GPT Image v2 workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Input</th>
              <th>Aspect ratios</th>
              <th>Resolution & credits</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>v2 Text to Image</strong></td>
              <td>Prompt ≤20000 chars</td>
              <td>auto, 1:1, 9:16, 16:9, 4:3, 3:4</td>
              <td>1K <strong>6</strong> / 2K <strong>9</strong> / 4K <strong>12</strong></td>
              <td>Prompt + resolution + aspect ratio</td>
            </tr>
            <tr>
              <td><strong>v2 Image to Image</strong></td>
              <td>Up to 16 image URLs + prompt ≤20000 chars</td>
              <td>auto, 1:1, 9:16, 16:9, 4:3, 3:4</td>
              <td>1K <strong>6</strong> / 2K <strong>9</strong> / 4K <strong>12</strong></td>
              <td>Prompt + resolution + aspect ratio + up to 16 reference images</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Resolution 1K is required when using "auto" aspect ratio. The 1:1 ratio does not support 4K. Image inputs: JPEG, PNG, WebP (max 10MB each). Multi-image input (≤16) is available only in the I2I workflow.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">GPT Image v2 — Two Modern Workflows</h2>
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
      for GPT Image v2 per-generation costs.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { handleModeClick, navigateToToolTop, watchRouteScroll } = useToolSeoPageScroll()

const v2Workflows = [
  {
    name: 'GPT Image v2 Text to Image',
    title: 'v2 Text to Image',
    description: 'Long prompts up to 20000 chars, 6 aspect ratios, 1K/2K/4K resolution—modern quality at 6–12 credits.',
    path: '/home/gpt-image/v2-text-to-image',
    icon: 'fas fa-wand-magic-sparkles'
  },
  {
    name: 'GPT Image v2 Image to Image',
    title: 'v2 Image to Image',
    description: 'Edit with up to 16 reference images, long prompts, and full resolution control.',
    path: '/home/gpt-image/v2-image-to-image',
    icon: 'fas fa-pen-to-square'
  }
]

const workflowIntroMap = {
  '/home/gpt-image/v2-text-to-image': {
    title: '📝 GPT Image v2 Text to Image',
    lead: 'Generate images from <strong>prompts up to 20000 characters</strong> with OpenAI\'s next-generation model. Choose <strong>1K (6 credits), 2K (9 credits), or 4K (12 credits)</strong> resolution and <strong>six aspect ratios</strong> including auto-optimized framing.'
  },
  '/home/gpt-image/v2-image-to-image': {
    title: '🖼️ GPT Image v2 Image to Image',
    lead: 'Upload <strong>up to 16 reference images</strong> and edit them with a prompt up to 20000 characters. GPT Image v2 offers <strong>multi-reference fusion, resolution control (1K–4K), and six aspect ratios</strong> for complex editing tasks.'
  }
}

const workflowDefinitionMap = {
  '/home/gpt-image/v2-text-to-image': {
    title: 'What is GPT Image v2 Text to Image?',
    body:
      '<strong>GPT Image v2 Text to Image</strong> on FuseAITools (<code>gpt-image-2-text-to-image</code>) generates images from a text prompt (≤20000 chars). Key features: <strong>6 aspect ratios</strong> (auto, 1:1, 9:16, 16:9, 4:3, 3:4), <strong>3 resolution tiers</strong> (1K at 6 credits, 2K at 9 credits, 4K at 12 credits), and improved text rendering compared to v1.5.'
  },
  '/home/gpt-image/v2-image-to-image': {
    title: 'What is GPT Image v2 Image to Image?',
    body:
      '<strong>GPT Image v2 Image to Image</strong> on FuseAITools (<code>gpt-image-2-image-to-image</code>) edits <strong>up to 16 uploaded images</strong> with a text prompt (≤20000 chars). The v2 model fuses multiple visual references into one coherent edit. Same resolution and aspect ratio controls as the T2I workflow.'
  }
}

const workflowFaqMap = {
  '/home/gpt-image/v2-text-to-image': [
    {
      question: 'What resolution options does GPT Image v2 text-to-image support?',
      answer:
        'Three resolution tiers: <strong>1K</strong> (fast, 6 credits), <strong>2K</strong> (balanced, 9 credits), and <strong>4K</strong> (maximum detail, 12 credits). 4K is not available with the 1:1 aspect ratio. "Auto" aspect ratio requires 1K resolution.'
    },
    {
      question: 'What aspect ratios are available in GPT Image v2 text-to-image?',
      answer:
        'Six options: <strong>auto</strong> (optimized framing), <strong>1:1</strong> (square), <strong>9:16</strong> (portrait), <strong>16:9</strong> (landscape), <strong>4:3</strong>, and <strong>3:4</strong>. This is a significant expansion from v1.5\'s three ratios.'
    }
  ],
  '/home/gpt-image/v2-image-to-image': [
    {
      question: 'How many reference images can I upload for GPT Image v2 image-to-image?',
      answer:
        'Up to <strong>16 images</strong> (JPEG, PNG, or WebP, max 10MB each). This is a major upgrade from v1.5\'s single-image limit. Upload multiple images of the same subject from different angles or with different styles, and GPT Image v2 will fuse them into a coherent generation.'
    },
    {
      question: 'Does GPT Image v2 image-to-image support 4K resolution?',
      answer:
        'Yes, the v2 I2I workflow supports <strong>1K, 2K, and 4K</strong> resolution—same as the T2I workflow. Costs: 1K = <strong>6 credits</strong>, 2K = <strong>9 credits</strong>, 4K = <strong>12 credits</strong>. Note that 4K is unavailable with the 1:1 aspect ratio, and auto ratio requires 1K.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for GPT Image v2?',
    answer:
      'No—GPT Image v2 runs entirely in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How is GPT Image v2 priced on FuseAITools?',
    answer:
      'Credits depend on the selected resolution—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
    icon: '📝',
    title: '20000-Character Prompts',
    description:
      'Dramatically increased prompt capacity from v1.5—write <strong>detailed scene descriptions, multi-paragraph instructions, or storyboard treatments</strong> that the model follows with precision.'
  },
  {
    icon: '🔍',
    title: '1K / 2K / 4K Resolution',
    description:
      'Select your output resolution: <strong>1K</strong> for fast drafts, <strong>2K</strong> for standard quality, or <strong>4K</strong> for maximum detail. Credit costs scale with resolution: 6 / 9 / 12 respectively.'
  },
  {
    icon: '🖼️',
    title: 'Six Aspect Ratios + Auto',
    description:
      'Choose from <strong>auto, 1:1, 9:16, 16:9, 4:3, 3:4</strong>—covers everything from vertical social posts to cinematic landscape framing. The "auto" option optimizes framing for your content.'
  },
  {
    icon: '🔄',
    title: 'Multi-Reference Editing (≤16)',
    description:
      'Upload <strong>up to 16 images</strong> in the I2I workflow and prompt GPT Image v2 to fuse visual elements from all references into a single coherent generation.'
  }
]

const scenarioTags = [
  'Long-form creative & storytelling',
  'High-resolution print assets',
  'Cinematic & landscape imagery',
  'Multi-reference style fusion',
  'Social & marketing content at scale'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) =>
  path === '/home/gpt-image/v2-text-to-image' || path === '/home/gpt-image/v2-image-to-image'
)

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
