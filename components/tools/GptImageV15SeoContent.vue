<template>
  <div
    id="gpt-image-v15-section"
    class="gpt-image-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="GPT Image 1.5 on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="GPT Image 1.5 text-to-image and image-to-image on FuseAITools—prompts up to 3000 chars, quality medium/high, aspect ratios 1:1/2:3/3:2."
    />

    <div class="version-badge">🎨 GPT Image 1.5 · Classic Generation · Two Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎨 GPT Image 1.5 on FuseAITools</h2>
      <p class="tool-sub">
        GPT Image 1.5 on <a href="/" class="seo-inline-link">FuseAITools</a> is OpenAI's
        <strong>classic image generation</strong> suite—generate from text prompts up to
        <strong>3000 characters</strong> or edit a single reference image with natural language.
        Choose <strong>medium or high quality</strong> to balance speed and detail, with
        <strong>three aspect ratios</strong> (1:1, 2:3, 3:2). New users receive
        <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ GPT Image 1.5 Core Features</h2>
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
      <h2 id="faq-heading" class="section-title">❓ FAQ (GPT Image 1.5)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ GPT Image 1.5 Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools GPT Image form and API (<code>gpt-image-1.5-*</code> models).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="GPT Image 1.5 workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Input</th>
              <th>Aspect ratios</th>
              <th>Quality & credits</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Text to Image</strong></td>
              <td>Prompt ≤3000 chars</td>
              <td>1:1, 2:3, 3:2</td>
              <td>medium <strong>6</strong> / high <strong>36</strong></td>
              <td>Prompt + quality + aspect ratio</td>
            </tr>
            <tr>
              <td><strong>Image to Image</strong></td>
              <td>1 image URL + prompt ≤3000 chars</td>
              <td>1:1, 2:3, 3:2</td>
              <td>medium <strong>12</strong> / high <strong>36</strong></td>
              <td>Prompt + quality + aspect ratio + reference image</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Image inputs: JPEG, PNG, WebP (max 10MB per image). T2I default aspect ratio is 1:1. Quality selection affects generation speed and detail—medium is balanced, high is slower with more detail.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">GPT Image 1.5 — Two Classic Workflows</h2>
      <p class="section-lead">Choose the mode that matches your task:</p>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in v15Workflows"
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

    <section class="info-section" aria-labelledby="compare-heading">
      <h2 id="compare-heading" class="section-title">📊 GPT Image 1.5 vs GPT Image v2</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="GPT Image 1.5 vs GPT Image v2">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>GPT Image 1.5 (Classic)</th>
              <th>GPT Image v2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Positioning</td>
              <td>Classic generation with quality tiers</td>
              <td>Modern generation with resolution control (1K–4K)</td>
            </tr>
            <tr>
              <td>Workflows</td>
              <td><strong>Two</strong>—T2I, I2I</td>
              <td><strong>Two</strong>—T2I, I2I</td>
            </tr>
            <tr>
              <td>Prompt limit</td>
              <td><strong>3000</strong> characters</td>
              <td><strong>20000</strong> characters</td>
            </tr>
            <tr>
              <td>Aspect ratios</td>
              <td><strong>3</strong>—1:1, 2:3, 3:2</td>
              <td><strong>6</strong>—auto, 1:1, 9:16, 16:9, 4:3, 3:4</td>
            </tr>
            <tr>
              <td>Resolution</td>
              <td>Standard (medium/high quality)</td>
              <td><strong>1K / 2K / 4K</strong> selectable</td>
            </tr>
            <tr>
              <td>Image input</td>
              <td>1 image max</td>
              <td>Up to <strong>16 images</strong> (I2I)</td>
            </tr>
            <tr>
              <td>Best for</td>
              <td>Quick drafts and classic quality</td>
              <td>Long prompts, high-res & multi-reference editing</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="upgrade-tip pricing-tip">
      💳 New users get <strong>20 free credits</strong> on sign-up.
      <a href="/pricing" class="seo-pricing-link">View pricing</a>
      for GPT Image 1.5 per-generation costs.
    </div>

    <div class="upgrade-tip">
      ✨ Need longer prompts or higher resolution?
      <a
        href="/home/gpt-image/v2-text-to-image"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/gpt-image/v2-text-to-image')"
      >Upgrade to GPT Image v2 Text to Image →</a>
      for prompts up to <strong>20000 characters</strong> and <strong>1K/2K/4K</strong> resolution, or
      <a
        href="/home/gpt-image/v2-image-to-image"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/gpt-image/v2-image-to-image')"
      >GPT Image v2 Image to Image</a>
      for multi-reference editing with up to 16 images.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const v15Workflows = [
  {
    name: 'GPT Image 1.5 Text to Image',
    title: 'Text to Image',
    description: 'Generate from text prompts up to 3000 chars—choose medium or high quality, three aspect ratios.',
    path: '/home/gpt-image/text-to-image',
    icon: 'fas fa-keyboard'
  },
  {
    name: 'GPT Image 1.5 Image to Image',
    title: 'Image to Image',
    description: 'Transform a single reference image with a prompt—quality and aspect ratio controls.',
    path: '/home/gpt-image/image-to-image',
    icon: 'fas fa-image'
  }
]

const workflowIntroMap = {
  '/home/gpt-image/text-to-image': {
    title: '📝 GPT Image 1.5 Text to Image',
    lead: 'Generate images from <strong>text prompts up to 3000 characters</strong> with classic OpenAI quality. Choose <strong>medium (6 credits)</strong> for fast results or <strong>high (36 credits)</strong> for maximum detail, with <strong>three aspect ratios</strong> (1:1, 2:3, 3:2).'
  },
  '/home/gpt-image/image-to-image': {
    title: '🖼️ GPT Image 1.5 Image to Image',
    lead: 'Upload <strong>one reference image</strong> and edit it with a prompt up to 3000 characters. GPT Image 1.5 understands scene context—<strong>adjust style, objects, or composition</strong> while preserving the original structure.'
  }
}

const workflowDefinitionMap = {
  '/home/gpt-image/text-to-image': {
    title: 'What is GPT Image 1.5 Text to Image?',
    body:
      '<strong>GPT Image 1.5 Text to Image</strong> on FuseAITools (<code>gpt-image-1.5-text-to-image</code>) generates images from a text prompt (≤3000 characters). Set <strong>quality</strong> to medium or high, and choose from <strong>3 aspect ratios</strong> (1:1 square, 2:3 portrait, 3:2 landscape). Medium quality costs <strong>6 credits</strong>, high quality <strong>36 credits</strong>.'
  },
  '/home/gpt-image/image-to-image': {
    title: 'What is GPT Image 1.5 Image to Image?',
    body:
      '<strong>GPT Image 1.5 Image to Image</strong> on FuseAITools (<code>gpt-image-1.5-image-to-image</code>) edits a <strong>single uploaded image</strong> with a text prompt (≤3000 characters). The model understands contextual instructions—change clothing, replace backgrounds, alter lighting, or add objects. Same quality and aspect ratio controls as the T2I workflow. Medium quality costs <strong>12 credits</strong>, high quality <strong>36 credits</strong>.'
  }
}

const workflowFaqMap = {
  '/home/gpt-image/text-to-image': [
    {
      question: 'What are the credit costs for GPT Image 1.5 text-to-image?',
      answer:
        'Medium quality costs <strong>6 credits</strong> per image; high quality costs <strong>36 credits</strong>. High quality generates slower but with more detail and better prompt adherence.'
    },
    {
      question: 'What aspect ratios does GPT Image 1.5 text-to-image support?',
      answer:
        'Three options: <strong>1:1</strong> (square), <strong>2:3</strong> (portrait), and <strong>3:2</strong> (landscape). The default is 1:1 if not specified in the form.'
    }
  ],
  '/home/gpt-image/image-to-image': [
    {
      question: 'How many images can I use as input for GPT Image 1.5 image-to-image?',
      answer:
        'Exactly <strong>one image</strong> (JPEG, PNG, or WebP, max 10MB). Upload it in the form and describe the edit in your prompt. Unlike v2, v1.5 does not support multiple input images.'
    },
    {
      question: 'What credit cost does GPT Image 1.5 image-to-image use?',
      answer:
        'Medium quality costs <strong>12 credits</strong>; high quality costs <strong>36 credits</strong>. The image-to-image workflow costs more than T2I at medium quality because of the additional image processing required.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for GPT Image 1.5?',
    answer:
      'No—GPT Image 1.5 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How is GPT Image 1.5 priced on FuseAITools?',
    answer:
      'Credits depend on the model and quality tier—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
    icon: '🎛️',
    title: 'Classic OpenAI Quality',
    description:
      'Powered by the <strong>gpt-image-1.5-*</strong> model family—strong instruction following, natural-language editing, and consistent output with medium or high quality tiers.'
  },
  {
    icon: '📝',
    title: 'Flexible Prompt Control',
    description:
      'Prompts up to <strong>3000 characters</strong> for detailed scene descriptions. Use creative writing, technical instructions, or simple keywords—the model understands natural language.'
  },
  {
    icon: '🖼️',
    title: 'Reference Image Editing',
    description:
      'Upload <strong>one image</strong> and describe changes in natural language—replace objects, change styles, adjust colors, or composite new elements into the scene.'
  },
  {
    icon: '💳',
    title: 'Credit-Based Pricing',
    description:
      'Pay per generation with credits: T2I medium <strong>6</strong>, T2I high <strong>36</strong> / I2I medium <strong>12</strong>, I2I high <strong>36</strong>. Costs appear on the Generate button before each run.'
  }
]

const scenarioTags = [
  'Quick image drafts & ideation',
  'Social media graphics',
  'Product visual concepts',
  'Photo editing & retouching',
  'Style & background changes'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) =>
  path === '/home/gpt-image/text-to-image' || path === '/home/gpt-image/image-to-image'
)

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
