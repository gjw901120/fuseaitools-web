<template>
  <div
    id="wan-27-image-section"
    class="wan-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Wan 2.7 Image on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Wan 2.7 Image and Image Pro text-to-image and image editing on FuseAITools—1K/2K/4K, up to 9 reference images, sequential mode, and advanced controls."
    />

    <div class="version-badge">🖼️ Wan 2.7 · Image & Image Pro · Two Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🖼️ Wan 2.7 Image on FuseAITools</h2>
      <p class="tool-sub">
        Wan 2.7 Image on <a href="/" class="seo-inline-link">FuseAITools</a> is Alibaba's
        <strong>still-image</strong> line—generate from text or edit up to
        <strong>9 reference images</strong> with prompts up to <strong>5000 characters</strong>.
        Choose <strong>Image</strong> for 1K/2K output or <strong>Image Pro</strong> for
        <strong>4K</strong> when generating without input images. Pair with
        <strong>Wan 2.7 video</strong> workflows to animate keyframes. New users receive
        <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Wan 2.7 Image Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Wan 2.7 Image vs Image Pro</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Wan 2.7 Image vs Image Pro">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Wan 2.7 Image</th>
              <th>Wan 2.7 Image Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Model</td>
              <td><code>wan-2-7-image</code></td>
              <td><code>wan-2-7-image-pro</code></td>
            </tr>
            <tr>
              <td>Resolution</td>
              <td><strong>1K / 2K</strong></td>
              <td>1K / 2K + <strong>4K</strong> (text-only, sequential off)</td>
            </tr>
            <tr>
              <td>Reference images</td>
              <td>Up to <strong>9</strong> optional input URLs</td>
              <td>Same</td>
            </tr>
            <tr>
              <td>Batch (n)</td>
              <td><strong>1–4</strong> (or 1–12 in sequential mode)</td>
              <td>Same</td>
            </tr>
            <tr>
              <td>Advanced controls</td>
              <td>Thinking mode, color palette, bbox regions</td>
              <td>Same (4K gated as above)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Wan 2.7 Image)</h2>
      <div class="faq-list" itemscope itemtype="https://schema.org/FAQPage">
        <div
          v-for="(faq, index) in faqItems"
          :key="index"
          class="faq-item"
          :class="{ open: openFaqIndex === index }"
          itemscope
          itemprop="mainEntity"
          itemtype="https://schema.org/Question"
        >
          <button
            type="button"
            class="faq-question"
            :aria-expanded="openFaqIndex === index"
            @click="toggleFaq(index)"
          >
            <span itemprop="name">{{ faq.question }}</span>
            <span class="faq-toggle" aria-hidden="true">{{ openFaqIndex === index ? '➖' : '➕' }}</span>
          </button>
          <div
            v-show="openFaqIndex === index"
            class="faq-answer"
            itemscope
            itemprop="acceptedAnswer"
            itemtype="https://schema.org/Answer"
          >
            <div itemprop="text" v-html="faq.answer" />
          </div>
        </div>
      </div>
    </section>

    <section class="info-section" aria-labelledby="tech-heading">
      <h2 id="tech-heading" class="section-title">⚙️ Wan 2.7 Image Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Wan form and API (<code>wan-2-7-image</code> / <code>wan-2-7-image-pro</code>).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Wan 2.7 Image workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Input</th>
              <th>Resolution</th>
              <th>Aspect ratio</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Wan 2.7 Image</strong></td>
              <td>Prompt (1–5000 chars); optional ≤9 images</td>
              <td>1K / 2K</td>
              <td>When no input: 1:1, 16:9, 4:3, 21:9, 3:4, 9:16, 8:1, 1:8</td>
              <td>n 1–4 (1–12 sequential); thinking mode; color palette; bbox; seed</td>
            </tr>
            <tr>
              <td><strong>Wan 2.7 Image Pro</strong></td>
              <td>Same as Image</td>
              <td>1K / 2K / <strong>4K</strong> (4K: no input, sequential off)</td>
              <td>Same (ignored when input images present)</td>
              <td>Same advanced controls as Image</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        When input images are uploaded, aspect ratio is omitted from the API. Sequential mode enables grouped output (n up to 12) and disables thinking mode and color palette.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Wan 2.7 — Two Image Workflows</h2>
      <p class="section-lead">Image for 1K/2K; Image Pro when you need 4K hero assets:</p>
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
      for Wan 2.7 Image per-generation costs.
    </div>

    <div class="upgrade-tip">
      🎬 <strong>Wan video companion</strong>
      Turn stills into motion with
      <a
        href="/home/wan/v2-7-image-to-video"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/wan/v2-7-image-to-video')"
      >Wan 2.7 Image to Video</a>
      (first/last frame or driving audio), build ensemble scenes in
      <a
        href="/home/wan/v2-7-r2v"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/wan/v2-7-r2v')"
      >Wan 2.7 R2V</a>
      , or use
      <a
        href="/home/wan/image-to-video"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/wan/image-to-video')"
      >Wan 2.6 Image to Video</a>
      for fast multi-shot clips. Browse all
      <a
        href="/home/wan/v2-7-text-to-video"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/wan/v2-7-text-to-video')"
      >Wan 2.7 video workflows →</a>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const imageWorkflows = [
  {
    name: 'Wan 2.7 Image',
    title: '2.7 Image',
    description: 'Text-to-image and image editing—1K/2K, up to 9 refs, thinking mode and color palette.',
    path: '/home/wan/2-7-image',
    icon: 'fas fa-image'
  },
  {
    name: 'Wan 2.7 Image Pro',
    title: '2.7 Image Pro',
    description: 'Same controls plus 4K output when generating from prompt only (no sequential).',
    path: '/home/wan/2-7-image-pro',
    icon: 'fas fa-images'
  }
]

const workflowIntroMap = {
  '/home/wan/2-7-image': {
    title: '🖼️ Wan 2.7 Image',
    lead: 'Generate or edit images with prompts up to <strong>5000 characters</strong>—add up to <strong>9 optional reference images</strong>, pick <strong>1K or 2K</strong>, and use eight aspect ratios when starting from text only. Toggle <strong>sequential mode</strong> for grouped batches (n up to 12).'
  },
  '/home/wan/2-7-image-pro': {
    title: '✨ Wan 2.7 Image Pro',
    lead: 'Image Pro matches Wan 2.7 Image controls and adds <strong>4K output</strong> when you generate from prompt only—no input images and sequential mode off. Ideal for hero keyframes before <strong>Wan 2.7 Image to Video</strong> or print-ready stills.'
  }
}

const workflowDefinitionMap = {
  '/home/wan/2-7-image': {
    title: 'What is Wan 2.7 Image?',
    body:
      '<strong>Wan 2.7 Image</strong> on FuseAITools (<code>wan-2-7-image</code>) creates or edits still images from a prompt (1–5000 characters). Optional: up to <strong>9 input image URLs</strong>. Without inputs, choose aspect ratios from <strong>1:1 through 1:8</strong> and resolution <strong>1K/2K</strong>. Supports batch n (1–4, or 1–12 sequential), thinking mode, color palette, bbox regions on inputs, watermark, and seed.'
  },
  '/home/wan/2-7-image-pro': {
    title: 'What is Wan 2.7 Image Pro?',
    body:
      '<strong>Wan 2.7 Image Pro</strong> on FuseAITools (<code>wan-2-7-image-pro</code>) extends Image with <strong>4K resolution</strong> when there are no input images and sequential mode is disabled. Same prompt limit, reference cap, and advanced controls—built for high-fidelity frames you later animate in Wan video workflows.'
  }
}

const workflowFaqMap = {
  '/home/wan/2-7-image': [
    {
      question: 'When does Wan 2.7 Image use aspect ratio controls?',
      answer:
        'Aspect ratio applies only when you generate <strong>without input images</strong>. If you upload reference images, the API omits aspect ratio and follows your inputs—use bbox regions to steer edits on specific areas.'
    },
    {
      question: 'What is sequential mode on Wan 2.7 Image?',
      answer:
        'Sequential mode generates <strong>grouped image batches</strong> with n up to <strong>12</strong>. It disables thinking mode and the color palette. When off, n is capped at <strong>4</strong> and thinking mode is available for text-only runs.'
    }
  ],
  '/home/wan/2-7-image-pro': [
    {
      question: 'When can I use 4K on Wan 2.7 Image Pro?',
      answer:
        '4K appears when <strong>no input images</strong> are uploaded and <strong>sequential mode is off</strong>. With reference images or sequential enabled, resolution stays at 1K/2K—matching the form validation in FuseAITools.'
    },
    {
      question: 'How do Wan 2.7 images connect to Wan video?',
      answer:
        'Export stills here, then upload them as <strong>first/last frames</strong> in <a href="/home/wan/v2-7-image-to-video" class="seo-inline-link">Wan 2.7 Image to Video</a>, as references in <a href="/home/wan/v2-7-r2v" class="seo-inline-link">R2V</a>, or animate via <a href="/home/wan/image-to-video" class="seo-inline-link">Wan 2.6 Image to Video</a>.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Wan 2.7 Image?',
    answer:
      'No—Wan 2.7 Image runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How is Wan 2.7 Image priced on FuseAITools?',
    answer:
      'Credits depend on model, resolution, and batch settings—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
    icon: '🖼️',
    title: 'Text & Reference Editing',
    description:
      'Prompt-only generation or edit with up to <strong>9 input images</strong>—bbox regions target specific areas when references are provided.'
  },
  {
    icon: '🎨',
    title: 'Color Palette & Thinking',
    description:
      '<strong>Thinking mode</strong> for text-only runs; optional <strong>3–10 color palette</strong> with ratio percentages totaling 100%.'
  },
  {
    icon: '📐',
    title: 'Flexible Formats',
    description:
      'Eight aspect ratios including <strong>8:1</strong> and <strong>1:8</strong>—1K/2K on Image, plus <strong>4K</strong> on Image Pro when eligible.'
  },
  {
    icon: '🔗',
    title: 'Pairs with Wan Video',
    description:
      'Still outputs feed <strong>Wan 2.7 I2V</strong>, <strong>R2V</strong>, and <strong>Wan 2.6</strong> video workflows on the same platform.'
  }
]

const scenarioTags = [
  'Hero keyframes for I2V',
  'Brand stills at 2K/4K',
  'Reference-driven edits',
  'Sequential storyboards',
  'Social & ultra-wide layouts'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path === '/home/wan/2-7-image' || path === '/home/wan/2-7-image-pro' || path === '/home/wan/2-7-image/' || path === '/home/wan/2-7-image-pro/')

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
