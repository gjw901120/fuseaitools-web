<template>
  <div
    id="imagen4-section"
    class="imagen4-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Imagen 4 Image on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Google Imagen 4 text-to-image on FuseAITools—Generate, Fast (1–4 images), and Ultra tiers with prompts up to 5000 characters and five aspect ratios."
    />

    <div class="version-badge">🖼️ Google Imagen 4 · Three Tiers · Text to Image</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🖼️ Imagen 4 on FuseAITools</h2>
      <p class="tool-sub">
        Imagen 4 on <a href="/" class="seo-inline-link">FuseAITools</a> is Google's
        <strong>text-to-image</strong> suite—pick <strong>Generate</strong> for balanced quality,
        <strong>Fast</strong> for speed and batch output (1–4 images), or <strong>Ultra</strong> for flagship fidelity.
        All tiers share optional <strong>negative prompts</strong>, <strong>five aspect ratios</strong>, and
        <strong>seed</strong> controls. Credits appear on the Generate button before you submit; new users receive
        <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Imagen 4 Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Imagen 4 Generate vs Fast vs Ultra</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Imagen 4 Generate vs Fast vs Ultra">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Generate</th>
              <th>Fast</th>
              <th>Ultra</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Positioning</td>
              <td><strong>Balanced</strong> quality and speed</td>
              <td><strong>Speed + batch</strong> exploration</td>
              <td><strong>Flagship</strong> fidelity</td>
            </tr>
            <tr>
              <td>Output count</td>
              <td><strong>1</strong> image per request</td>
              <td><strong>1–4</strong> images per request</td>
              <td><strong>1</strong> image per request</td>
            </tr>
            <tr>
              <td>Prompt limit</td>
              <td>Max <strong>5000</strong> chars</td>
              <td>Max <strong>5000</strong> chars</td>
              <td>Max <strong>5000</strong> chars</td>
            </tr>
            <tr>
              <td>Negative prompt</td>
              <td>Optional (max 5000 chars)</td>
              <td>Optional (max 5000 chars)</td>
              <td>Optional (max 5000 chars)</td>
            </tr>
            <tr>
              <td>Aspect ratios</td>
              <td>1:1, 16:9, 9:16, 3:4, 4:3</td>
              <td>Same (default <strong>16:9</strong>)</td>
              <td>Same (default <strong>1:1</strong>)</td>
            </tr>
            <tr>
              <td>Seed type</td>
              <td>Optional <strong>string</strong> (≤500 chars)</td>
              <td>Optional <strong>integer</strong></td>
              <td>Optional <strong>string</strong> (≤500 chars)</td>
            </tr>
            <tr>
              <td>Best for</td>
              <td>Everyday marketing and social stills</td>
              <td>Rapid A/B tests and concept batches</td>
              <td>Hero assets and client delivery</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Imagen 4)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Imagen 4 Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Imagen 4 form and API (<code>imagen4-generate</code>,
        <code>imagen4-fast</code>, <code>imagen4-ultra</code>).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Imagen 4 tier capabilities">
          <thead>
            <tr>
              <th>Tier</th>
              <th>Required input</th>
              <th>Output</th>
              <th>Aspect ratios</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Generate</strong></td>
              <td>Prompt (max 5000 chars)</td>
              <td>1 image</td>
              <td>1:1, 16:9, 9:16, 3:4, 4:3</td>
              <td>Negative prompt, seed string (≤500 chars)</td>
            </tr>
            <tr>
              <td><strong>Fast</strong></td>
              <td>Prompt (max 5000 chars)</td>
              <td>1–4 images</td>
              <td>Same five ratios (default 16:9)</td>
              <td>Negative prompt, num images, integer seed</td>
            </tr>
            <tr>
              <td><strong>Ultra</strong></td>
              <td>Prompt (max 5000 chars)</td>
              <td>1 image</td>
              <td>Same five ratios (default 1:1)</td>
              <td>Negative prompt, seed string (≤500 chars)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        All tiers are text-to-image only—no image upload on this page. Credits depend on tier and batch count (Fast);
        the exact amount appears on Generate before submission.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Imagen 4 — Three Text-to-Image Tiers</h2>
      <p class="section-lead">Switch tabs to match speed, batch size, or final quality:</p>
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
          <span class="model-mode-cta">{{ isCurrentMode(item.path) ? 'Current tier' : 'Open this tier →' }}</span>
        </NuxtLink>
      </div>
    </section>

    <section
      v-if="tierCompareRows.length"
      class="info-section"
      aria-labelledby="tier-compare-heading"
    >
      <h2 id="tier-compare-heading" class="section-title">{{ tierCompareTitle }}</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" :aria-label="tierCompareTitle">
          <thead>
            <tr>
              <th>Dimension</th>
              <th v-for="col in tierCompareColumns" :key="col">{{ col }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in tierCompareRows" :key="idx">
              <td>{{ row.label }}</td>
              <td v-for="(cell, cidx) in row.cells" :key="cidx" v-html="cell" />
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

    <div v-if="showFastUpgradeTip" class="upgrade-tip">
      ⚡ <strong>Need batch output or faster iteration?</strong>
      Try
      <a
        href="/home/imagen4/imagen4-fast"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/imagen4/imagen4-fast')"
      >Imagen 4 Fast →</a>
      for <strong>1–4 images</strong> per request with integer seed control.
    </div>

    <div v-if="showUltraUpgradeTip" class="upgrade-tip">
      ✨ <strong>Need flagship fidelity for final delivery?</strong>
      Try
      <a
        href="/home/imagen4/imagen4-ultra"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/imagen4/imagen4-ultra')"
      >Imagen 4 Ultra →</a>
      for Google's highest-quality Imagen 4 tier on FuseAITools.
    </div>

    <div v-if="isUltraPage" class="upgrade-tip">
      🎬 <strong>Google video companion — Veo 3.1</strong>
      Turn Imagen 4 stills into clips with
      <a
        href="/home/veo3/first-and-last-to-video"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/veo3/first-and-last-to-video')"
      >Veo 3.1 First and Last Frames</a>
      or browse the full
      <a
        href="/home/veo3"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/veo3')"
      >Veo 3.1 suite →</a>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const IMAGEN4_PATHS = {
  generate: '/home/imagen4/imagen4-generate',
  fast: '/home/imagen4/imagen4-fast',
  ultra: '/home/imagen4/imagen4-ultra'
}

const imageWorkflows = [
  {
    name: 'Imagen 4 Generate',
    title: 'Generate',
    description: 'Balanced text-to-image—one image per run with string seed and five aspect ratios.',
    path: IMAGEN4_PATHS.generate,
    icon: 'fas fa-image'
  },
  {
    name: 'Imagen 4 Fast',
    title: 'Fast',
    description: 'Speed tier—output 1–4 images per request with integer seed; default aspect 16:9.',
    path: IMAGEN4_PATHS.fast,
    icon: 'fas fa-bolt'
  },
  {
    name: 'Imagen 4 Ultra',
    title: 'Ultra',
    description: 'Flagship fidelity—single high-quality image with string seed; default aspect 1:1.',
    path: IMAGEN4_PATHS.ultra,
    icon: 'fas fa-star'
  }
]

const workflowIntroMap = {
  [IMAGEN4_PATHS.generate]: {
    title: '🖼️ Imagen 4 Generate',
    lead: 'Write a prompt up to <strong>5000 characters</strong>—Imagen 4 Generate returns one balanced-quality image. Pick from <strong>five aspect ratios</strong> (1:1, 16:9, 9:16, 3:4, 4:3), add an optional negative prompt, and lock composition with an optional <strong>seed string</strong> (≤500 chars).'
  },
  [IMAGEN4_PATHS.fast]: {
    title: '⚡ Imagen 4 Fast',
    lead: 'Optimized for speed and exploration—Imagen 4 Fast outputs <strong>1–4 images</strong> per request from the same prompt. Default aspect is <strong>16:9</strong>; use an optional <strong>integer seed</strong> for reproducible batches during A/B testing.'
  },
  [IMAGEN4_PATHS.ultra]: {
    title: '✨ Imagen 4 Ultra',
    lead: 'Google\u2019s flagship Imagen 4 tier on FuseAITools—one high-fidelity image per run with prompts up to <strong>5000 characters</strong>. Default aspect <strong>1:1</strong>; optional negative prompt and <strong>seed string</strong> (≤500 chars) for polished hero assets.'
  }
}

const workflowDefinitionMap = {
  [IMAGEN4_PATHS.generate]: {
    title: 'What is Imagen 4 Generate?',
    body:
      '<strong>Imagen 4 Generate</strong> on FuseAITools (<code>imagen4-generate</code>) turns a text prompt into one image. Required: <strong>prompt</strong> (max 5000 chars). Optional: <strong>negative prompt</strong> (max 5000 chars), <strong>aspect ratio</strong> (1:1, 16:9, 9:16, 3:4, 4:3; default 1:1), and <strong>seed string</strong> (≤500 chars). Best for everyday marketing stills and social visuals.'
  },
  [IMAGEN4_PATHS.fast]: {
    title: 'What is Imagen 4 Fast?',
    body:
      '<strong>Imagen 4 Fast</strong> on FuseAITools (<code>imagen4-fast</code>) generates <strong>1–4 images</strong> from one prompt for rapid iteration. Required: <strong>prompt</strong> (max 5000 chars). Optional: negative prompt, <strong>num images</strong> (1–4), aspect ratio (default <strong>16:9</strong>), and <strong>integer seed</strong>. Ideal for concept batches and high-volume testing.'
  },
  [IMAGEN4_PATHS.ultra]: {
    title: 'What is Imagen 4 Ultra?',
    body:
      '<strong>Imagen 4 Ultra</strong> on FuseAITools (<code>imagen4-ultra</code>) prioritizes maximum visual fidelity—one image per request. Required: <strong>prompt</strong> (max 5000 chars). Optional: negative prompt, aspect ratio (default <strong>1:1</strong>), and <strong>seed string</strong> (≤500 chars). Use it for final assets, print-ready hero visuals, and client delivery.'
  }
}

const workflowFaqMap = {
  [IMAGEN4_PATHS.generate]: [
    {
      question: 'How does Imagen 4 Generate differ from Imagen 4 Fast?',
      answer:
        'Generate outputs <strong>one balanced-quality image</strong> per request with a <strong>string seed</strong> (≤500 chars). Fast returns <strong>1–4 images</strong> per run with an <strong>integer seed</strong> and defaults to <strong>16:9</strong>—better for rapid batch exploration.'
    },
    {
      question: 'Which aspect ratios does Imagen 4 Generate support?',
      answer:
        'Five presets: <strong>1:1, 16:9, 9:16, 3:4, and 4:3</strong>. Default is <strong>1:1</strong> when you open Generate—switch before submitting to match your layout.'
    }
  ],
  [IMAGEN4_PATHS.fast]: [
    {
      question: 'How many images can Imagen 4 Fast generate at once?',
      answer:
        'Between <strong>1 and 4</strong> images per request—set <strong>Num Images</strong> on the form. All images share the same prompt, negative prompt, aspect ratio, and optional integer seed.'
    },
    {
      question: 'Why does Imagen 4 Fast use an integer seed instead of a string?',
      answer:
        'Fast accepts an optional <strong>integer seed</strong> for reproducible batch runs. Generate and Ultra use an optional <strong>seed string</strong> (≤500 characters)—pick the tier that matches your workflow.'
    }
  ],
  [IMAGEN4_PATHS.ultra]: [
    {
      question: 'When should I choose Imagen 4 Ultra over Generate or Fast?',
      answer:
        'Choose Ultra when you need <strong>flagship fidelity</strong> for final delivery—one high-quality image per request. Use Fast for <strong>1–4</strong> quick variants or Generate for everyday balanced stills at lower credit cost.'
    },
    {
      question: 'Does Imagen 4 Ultra support the same aspect ratios as Generate?',
      answer:
        'Yes—all three tiers share <strong>1:1, 16:9, 9:16, 3:4, and 4:3</strong>. Ultra defaults to <strong>1:1</strong> when you open the page; change it before generating widescreen or vertical assets.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Imagen 4 on FuseAITools?',
    answer:
      'No—Imagen 4 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How is Imagen 4 priced on FuseAITools?',
    answer:
      'Credits depend on tier—and for Fast, on <strong>num images</strong>—shown on the Generate button before you submit. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
  }
]

const normalizedPath = computed(() => route.path.replace(/\/$/, ''))

const workflowIntro = computed(() => workflowIntroMap[normalizedPath.value] || null)

const workflowDefinition = computed(() => workflowDefinitionMap[normalizedPath.value] || null)

const faqItems = computed(() => {
  const workflowFaqs = workflowFaqMap[normalizedPath.value] || []
  return [...workflowFaqs, ...commonFaq]
})

useToolSeoFaqSchema(faqItems)

const isGeneratePage = computed(() => normalizedPath.value === IMAGEN4_PATHS.generate)
const isFastPage = computed(() => normalizedPath.value === IMAGEN4_PATHS.fast)
const isUltraPage = computed(() => normalizedPath.value === IMAGEN4_PATHS.ultra)

const showFastUpgradeTip = computed(() => isGeneratePage.value)
const showUltraUpgradeTip = computed(() => isGeneratePage.value || isFastPage.value)

const tierCompareTitle = computed(() => {
  if (isGeneratePage.value) return '📊 Imagen 4 Generate vs Fast vs Ultra'
  if (isFastPage.value) return '📊 Imagen 4 Fast vs Ultra'
  return ''
})

const tierCompareColumns = computed(() => {
  if (isGeneratePage.value) return ['Generate', 'Fast', 'Ultra']
  if (isFastPage.value) return ['Fast', 'Ultra']
  return []
})

const tierCompareRows = computed(() => {
  if (isGeneratePage.value) {
    return [
      { label: 'Output per request', cells: ['<strong>1</strong> image', '<strong>1–4</strong> images', '<strong>1</strong> image'] },
      { label: 'Speed focus', cells: ['Balanced', '<strong>Fastest</strong>', 'Quality-first'] },
      { label: 'Seed type', cells: ['String (≤500 chars)', 'Integer', 'String (≤500 chars)'] },
      { label: 'Default aspect', cells: ['1:1', '16:9', '1:1'] },
      { label: 'Best for', cells: ['Everyday stills', 'Batch ideation', 'Hero / client assets'] }
    ]
  }
  if (isFastPage.value) {
    return [
      { label: 'Output per request', cells: ['<strong>1–4</strong> images', '<strong>1</strong> image'] },
      { label: 'Speed focus', cells: ['<strong>Fastest</strong>', 'Quality-first'] },
      { label: 'Seed type', cells: ['Integer', 'String (≤500 chars)'] },
      { label: 'Best for', cells: ['Batch ideation', 'Hero / client assets'] }
    ]
  }
  return []
})

const coreFeatures = [
  {
    icon: '📝',
    title: 'Long Prompts',
    description:
      'Prompts and negative prompts up to <strong>5000 characters</strong>—enough detail for style, composition, and exclusions.'
  },
  {
    icon: '📐',
    title: 'Five Aspect Ratios',
    description:
      '<strong>1:1, 16:9, 9:16, 3:4, 4:3</strong> across all tiers—square posts, widescreen banners, and vertical stories.'
  },
  {
    icon: '⚡',
    title: 'Batch on Fast',
    description:
      'Imagen 4 Fast outputs <strong>1–4 images</strong> per request—compare variants without re-running the prompt.'
  },
  {
    icon: '☁️',
    title: 'Cloud on FuseAITools',
    description:
      'Google Imagen 4 in the browser—<strong>credits shown before generate</strong>; pairs with <strong>Veo 3.1</strong> video workflows.'
  }
]

const scenarioTags = [
  'Marketing & ad stills',
  'Social square & vertical',
  'Concept batch testing',
  'Hero / print assets',
  'Negative-prompt cleanup'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path.startsWith('/home/imagen4/'))

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
