<template>
  <div
    id="happyhorse-v11-section"
    class="happyhorse-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="HappyHorse v1.1 Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="HappyHorse v1.1 text, image, and reference-to-video on FuseAITools—native audio-video generation at 720p/1080p, 3–15s clips, nine aspect ratios, per-second credit pricing."
    />

    <div class="version-badge">🐴 HappyHorse v1.1 · Native Audio-Video · Nine Aspect Ratios · 3–15s</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🐴 HappyHorse v1.1 on FuseAITools</h2>
      <p class="tool-sub">
        HappyHorse v1.1 on <a href="/" class="seo-inline-link">FuseAITools</a> is the refined pass of the
        <strong>happyhorse-1-1</strong> family—<strong>native audio-video</strong> generation across text, image,
        and reference workflows. It widens the <strong>aspect-ratio grid to nine</strong> presets (adds 4:5, 5:4,
        9:21, 21:9) while keeping <strong>3–15s</strong> clips at <strong>720p/1080p</strong>. Each run shows
        <strong>credits required</strong> before you generate; new users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ HappyHorse v1.1 Core Features</h2>
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

    <section v-if="currentSameTypeCompare" class="info-section" aria-labelledby="compare-v1-heading">
      <h2 id="compare-v1-heading" class="section-title">{{ currentSameTypeCompare.title }}</h2>
      <p class="section-lead" v-html="currentSameTypeCompare.lead" />
      <div class="compare-table-wrap">
        <table class="compare-table" :aria-label="currentSameTypeCompare.ariaLabel">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>HappyHorse v1.1</th>
              <th>HappyHorse v1</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in currentSameTypeCompare.rows" :key="i">
              <td>{{ row.dim }}</td>
              <td v-html="row.v11" />
              <td v-html="row.v1" />
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="tech-heading">
      <h2 id="tech-heading" class="section-title">⚙️ HappyHorse v1.1 Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools HappyHorse v1.1 form and API (<code>happyhorse-1-1-*</code> models).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="HappyHorse v1.1 workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Required input</th>
              <th>Duration</th>
              <th>Resolution / ratio</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Text to Video</strong></td>
              <td>Prompt (1–5000 chars)</td>
              <td>3–15s</td>
              <td>720p / 1080p; nine ratios 16:9 → 21:9</td>
              <td>No seed (vendor rejects it)</td>
            </tr>
            <tr>
              <td><strong>Image to Video</strong></td>
              <td>1 image URL + optional prompt</td>
              <td>3–15s</td>
              <td>720p / 1080p; follows input frame ratio</td>
              <td>Prompt optional (max 5000); no aspect control</td>
            </tr>
            <tr>
              <td><strong>Reference to Video</strong></td>
              <td>Prompt + 1–9 reference images</td>
              <td>3–15s</td>
              <td>720p / 1080p; nine ratios as T2V</td>
              <td>Cite images as [Image 1], [Image 2]… in prompt</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Image inputs: JPEG, JPG, PNG, WebP (max 10MB). Credits are shown on the Generate button before submission, billed per second at your chosen resolution.
      </p>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (HappyHorse v1.1)</h2>
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
          <div v-show="openFaqIndex === index" class="faq-answer">
            <div v-html="faq.answer" />
          </div>
        </div>
      </div>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">HappyHorse v1.1 — Three Video Workflows</h2>
      <p class="section-lead">Choose the mode that matches your source material:</p>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in v11Workflows"
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

    <div v-if="currentSameTypeCompare" class="upgrade-tip">
      🐴 Same workflow, older engine—need the extras? Open the matching
      <a
        :href="currentV1Link"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop(currentV1Link)"
      >{{ currentSameTypeCompare.linkLabel }}</a>
      {{ currentSameTypeCompare.linkHint }}
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

// 同类型（t2v / i2v / r2v）v1.1 vs v1 对比 + 指向对应 v1 页面的内链
const sameTypeCompareMap = {
  '/home/happy-horse/v1-1-text-to-video': {
    title: '🆚 HappyHorse v1.1 vs v1 · Text to Video',
    lead: 'Same required prompt, duration, resolution, and native audio—the differences are <strong>framing breadth</strong> and the <strong>seed</strong> knob.',
    ariaLabel: 'HappyHorse v1.1 vs v1 text-to-video parameters',
    linkPath: '/home/happy-horse/v1-text-to-video',
    linkLabel: 'HappyHorse v1 Text to Video →',
    linkHint: 'if you need an optional <strong>seed</strong> for reproducible takes (five aspect ratios instead of nine).',
    rows: [
      { dim: 'Model', v11: '<code>happyhorse-1-1-text-to-video</code>', v1: '<code>happyhorse-text-to-video</code>' },
      { dim: 'Prompt', v11: 'Required, 1–5000 chars', v1: 'Required, 1–5000 chars' },
      { dim: 'Aspect ratios', v11: '<strong>Nine</strong>—adds 4:5, 5:4, 9:21, 21:9', v1: '16:9, 9:16, 1:1, 4:3, 3:4' },
      { dim: 'Duration', v11: '3–15s', v1: '3–15s' },
      { dim: 'Resolution', v11: '720p / 1080p', v1: '720p / 1080p' },
      { dim: 'Seed', v11: 'Vendor rejects seed', v1: '<strong>Optional seed accepted</strong>' },
      { dim: 'Pricing', v11: 'Per second × resolution', v1: 'Per second × resolution' }
    ]
  },
  '/home/happy-horse/v1-1-image-to-video': {
    title: '🆚 HappyHorse v1.1 vs v1 · Image to Video',
    lead: 'Both animate one still with an optional prompt and follow the input frame’s ratio—the split is the <strong>seed</strong>.',
    ariaLabel: 'HappyHorse v1.1 vs v1 image-to-video parameters',
    linkPath: '/home/happy-horse/v1-image-to-video',
    linkLabel: 'HappyHorse v1 Image to Video →',
    linkHint: 'for an optional <strong>seed</strong>—the one-image flow is otherwise identical.',
    rows: [
      { dim: 'Model', v11: '<code>happyhorse-1-1-image-to-video</code>', v1: '<code>happyhorse-image-to-video</code>' },
      { dim: 'Input', v11: 'Exactly 1 image URL', v1: 'Exactly 1 image URL' },
      { dim: 'Prompt', v11: 'Optional, max 5000 chars', v1: 'Optional, max 5000 chars' },
      { dim: 'Aspect ratio', v11: 'Follows input frame', v1: 'Follows input frame' },
      { dim: 'Duration', v11: '3–15s', v1: '3–15s' },
      { dim: 'Resolution', v11: '720p / 1080p', v1: '720p / 1080p' },
      { dim: 'Seed', v11: 'Vendor rejects seed', v1: '<strong>Optional seed accepted</strong>' },
      { dim: 'Pricing', v11: 'Per second × resolution', v1: 'Per second × resolution' }
    ]
  },
  '/home/happy-horse/v1-1-reference-to-video': {
    title: '🆚 HappyHorse v1.1 vs v1 · Reference to Video',
    lead: 'Both take a prompt plus 1–9 images—the differences are <strong>citation syntax</strong>, the request <strong>field name</strong>, framing breadth, and the seed.',
    ariaLabel: 'HappyHorse v1.1 vs v1 reference-to-video parameters',
    linkPath: '/home/happy-horse/v1-reference-to-video',
    linkLabel: 'HappyHorse v1 Reference to Video →',
    linkHint: 'to cite subjects as character1, character2… with an optional <strong>seed</strong>.',
    rows: [
      { dim: 'Model', v11: '<code>happyhorse-1-1-reference-to-video</code>', v1: '<code>happyhorse-reference-to-video</code>' },
      { dim: 'Prompt', v11: 'Required + 1–9 images', v1: 'Required + 1–9 images' },
      { dim: 'Citation', v11: '<strong>[Image 1], [Image 2]…</strong>', v1: 'character1, character2…' },
      { dim: 'Request field', v11: '<code>referenceImage</code>', v1: '<code>imageUrls</code>' },
      { dim: 'Aspect ratios', v11: '<strong>Nine</strong>—adds 4:5, 5:4, 9:21, 21:9', v1: 'Same five as T2V' },
      { dim: 'Duration', v11: '3–15s', v1: '3–15s' },
      { dim: 'Resolution', v11: '720p / 1080p', v1: '720p / 1080p' },
      { dim: 'Seed', v11: 'Vendor rejects seed', v1: '<strong>Optional seed accepted</strong>' },
      { dim: 'Pricing', v11: 'Per second × resolution', v1: 'Per second × resolution' }
    ]
  }
}

const currentSameTypeCompare = computed(() => sameTypeCompareMap[route.path.replace(/\/$/, '')] || null)
const currentV1Link = computed(() => currentSameTypeCompare.value?.linkPath || '')

const v11Workflows = [
  {
    name: 'HappyHorse v1.1 Text to Video',
    title: 'Text to Video',
    description: 'Prompt-only clips with nine aspect ratios, 3–15s, and 720p/1080p—native audio included.',
    path: '/home/happy-horse/v1-1-text-to-video',
    icon: 'fas fa-font'
  },
  {
    name: 'HappyHorse v1.1 Image to Video',
    title: 'Image to Video',
    description: 'Animate one still with an optional motion prompt—3–15s at 720p/1080p, follows the input ratio.',
    path: '/home/happy-horse/v1-1-image-to-video',
    icon: 'fas fa-image'
  },
  {
    name: 'HappyHorse v1.1 Reference to Video',
    title: 'Reference to Video',
    description: '1–9 reference images cited as [Image 1], [Image 2]… for consistent multi-subject scenes.',
    path: '/home/happy-horse/v1-1-reference-to-video',
    icon: 'fas fa-images'
  }
]

const workflowIntroMap = {
  '/home/happy-horse/v1-1-text-to-video': {
    title: '📝 HappyHorse v1.1 Text to Video',
    lead: 'Describe scenes in text—HappyHorse v1.1 generates <strong>video with synced audio</strong> in one pass. Set <strong>3–15 seconds</strong>, <strong>720p or 1080p</strong>, and any of <strong>nine aspect ratios</strong> from 16:9 to 21:9.'
  },
  '/home/happy-horse/v1-1-image-to-video': {
    title: '🖼️ HappyHorse v1.1 Image to Video',
    lead: 'Upload <strong>one image</strong> and optionally guide motion with a prompt. Output is <strong>3–15 seconds</strong> at <strong>720p/1080p</strong> and keeps the input frame’s aspect ratio.'
  },
  '/home/happy-horse/v1-1-reference-to-video': {
    title: '👥 HappyHorse v1.1 Reference to Video',
    lead: 'Provide <strong>1–9 ordered reference images</strong> plus a prompt that cites them as <strong>[Image 1], [Image 2]…</strong>. Choose any of nine aspect ratios and set duration like text-to-video.'
  }
}

const workflowDefinitionMap = {
  '/home/happy-horse/v1-1-text-to-video': {
    title: 'What is HappyHorse v1.1 Text to Video?',
    body:
      '<strong>HappyHorse v1.1 Text to Video</strong> (<code>happyhorse-1-1-text-to-video</code>) on FuseAITools turns a prompt (1–5000 characters) into a short clip with <strong>native audio-video sync</strong>. Choose <strong>3–15s</strong>, <strong>720p or 1080p</strong>, and one of <strong>nine aspect ratios</strong>—16:9, 9:16, 1:1, 4:3, 3:4, 4:5, 5:4, 9:21, or 21:9. The vendor does not accept a seed.'
  },
  '/home/happy-horse/v1-1-image-to-video': {
    title: 'What is HappyHorse v1.1 Image to Video?',
    body:
      '<strong>HappyHorse v1.1 Image to Video</strong> (<code>happyhorse-1-1-image-to-video</code>) animates a <strong>single uploaded image</strong> with optional prompt guidance. Duration is <strong>3–15 seconds</strong> at <strong>720p/1080p</strong>; there is no aspect-ratio control because the output follows your input frame.'
  },
  '/home/happy-horse/v1-1-reference-to-video': {
    title: 'What is HappyHorse v1.1 Reference to Video?',
    body:
      '<strong>HappyHorse v1.1 Reference to Video</strong> (<code>happyhorse-1-1-reference-to-video</code>) generates from <strong>1–9 reference images</strong> plus a required prompt. Cite subjects in upload order with <strong>[Image 1], [Image 2]…</strong> placeholders for consistent multi-character output at 720p/1080p across nine aspect ratios.'
  }
}

const workflowFaqMap = {
  '/home/happy-horse/v1-1-text-to-video': [
    {
      question: 'What aspect ratios does HappyHorse v1.1 text-to-video support?',
      answer:
        'Nine—<strong>16:9, 9:16, 1:1, 4:3, 3:4, 4:5, 5:4, 9:21, and 21:9</strong>—plus <strong>720p or 1080p</strong> and <strong>3–15 second</strong> duration.'
    },
    {
      question: 'Can I set a seed on HappyHorse v1.1 text-to-video?',
      answer:
        'No—unlike v1, the <strong>v1.1 vendor does not accept a seed</strong>. Use the <a href="/home/happy-horse/v1-text-to-video" class="seo-inline-link">HappyHorse v1</a> tab if you need a reproducible seed.'
    }
  ],
  '/home/happy-horse/v1-1-image-to-video': [
    {
      question: 'Is a prompt required for HappyHorse v1.1 image-to-video?',
      answer:
        'No—the prompt is <strong>optional</strong> (max 5000 characters). You must upload <strong>exactly one image</strong> (JPEG/PNG/WebP, max 10MB). Duration is <strong>3–15s</strong> at 720p/1080p.'
    },
    {
      question: 'Can I choose the aspect ratio on HappyHorse v1.1 image-to-video?',
      answer:
        'No—image-to-video <strong>keeps your input frame’s ratio</strong>. Aspect-ratio controls apply to <strong>text-to-video</strong> and <strong>reference-to-video</strong>.'
    }
  ],
  '/home/happy-horse/v1-1-reference-to-video': [
    {
      question: 'How many reference images can HappyHorse v1.1 use?',
      answer:
        'Between <strong>1 and 9</strong>. Reference them in the prompt as <strong>[Image 1], [Image 2]…</strong> matching the upload order for consistent subjects.'
    },
    {
      question: 'What prompt format works best for v1.1 reference-to-video?',
      answer:
        'Cite each asset by its bracketed index—e.g. “<strong>[Image 1]</strong> hands the package to <strong>[Image 2]</strong>”—aligned with the order of uploaded reference images.'
    }
  ]
}

const commonFaq = [
  {
    question: 'How is HappyHorse v1.1 priced on FuseAITools?',
    answer:
      'All three modes bill <strong>per second</strong> at the resolution you select—the exact credits appear on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
  },
  {
    question: 'What is the difference between HappyHorse v1 and v1.1?',
    answer:
      'v1.1 widens <strong>aspect ratios to nine</strong> and drops the <strong>seed</strong> knob; it covers <strong>text, image, and reference</strong> workflows, while v1 also includes <strong>video edit</strong>.'
  },
  {
    question: 'Do I need a local GPU for HappyHorse v1.1?',
    answer:
      'No—HappyHorse v1.1 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
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
    icon: '🔊',
    title: 'Native Audio-Video Sync',
    description:
      'Generate <strong>video and audio together</strong>—dialogue, lip movement, and ambient sound in one workflow instead of separate dubbing.'
  },
  {
    icon: '🧭',
    title: 'Nine Aspect Ratios',
    description:
      'Framing widens to <strong>4:5, 5:4, 9:21, and 21:9</strong> on top of the v1 grid—cover portrait, square, and ultra-wide in one model.'
  },
  {
    icon: '👥',
    title: 'Bracketed Reference Casting',
    description:
      'Reference-to-video accepts <strong>1–9 images</strong> cited as <strong>[Image 1], [Image 2]…</strong> for consistent multi-subject scenes.'
  },
  {
    icon: '☁️',
    title: 'Cloud on FuseAITools',
    description:
      'Three v1.1 workflows in the browser—<strong>credits shown before generate</strong>; no local GPU install required.'
  }
]

const scenarioTags = [
  'Short drama & dialogue clips',
  'Portrait & vertical social video',
  'Ultra-wide cinematic banners',
  'Character-consistent promos',
  'Audio-synced brand ads'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path.includes('/home/happy-horse/v1-1-'))

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
