<template>
  <div
    id="seedream-5-pro-section"
    class="seedream-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Seedream 5 Pro on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Seedream 5 Pro text-to-image, image-to-image and layer decomposition on FuseAITools—prompts up to 5000 chars, 8 aspect ratios, 1K/2K resolution, up to 10 reference images, editable PNG layers. Billed by resolution with credits."
    />

    <div class="version-badge">👑 Seedream 5 Pro · ByteDance Premium · Three Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">👑 Seedream 5 Pro on FuseAITools</h2>
      <p class="tool-sub">
        <strong>Seedream 5 Pro</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> is ByteDance's premium
        image tier: <strong>prompts up to 5000 characters</strong>, <strong>8 aspect ratios</strong> from 1:1 to 21:9,
        and <strong>1K / 2K resolution as the billing dimension</strong>. It ships three workflows—text to image,
        image to image with up to <strong>10 reference images</strong>, and <strong>layer decomposition</strong> that
        splits one artwork into editable PNG layers. New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Seedream 5 Pro Core Features</h2>
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

    <section class="info-section" aria-labelledby="tech-heading">
      <h2 id="tech-heading" class="section-title">⚙️ Seedream 5 Pro Technical Specs</h2>
      <p class="section-lead">Parameters match the FuseAITools Seedream form and API (<code>seedream-5-pro-*</code> models).</p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedream 5 Pro workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Input</th>
              <th>Resolution (billing)</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>5 Pro Text to Image</strong></td>
              <td>Prompt 4–5000 chars</td>
              <td><strong>1K / 2K</strong></td>
              <td>8 aspect ratios, PNG/JPEG, NSFW filter</td>
            </tr>
            <tr>
              <td><strong>5 Pro Image to Image</strong></td>
              <td>1–10 image URLs + prompt 4–5000</td>
              <td><strong>1K / 2K</strong></td>
              <td>Same ratios; each image ≤30MB (jpeg/png/webp)</td>
            </tr>
            <tr>
              <td><strong>5 Pro Layer Decomposition</strong></td>
              <td>Exactly 1 source image + optional prompt ≤5000</td>
              <td><strong>1K / 1.5K / 2K</strong></td>
              <td>&lt;bbox&gt; targeting, base PNG/JPEG, layers always PNG</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Layer decomposition source images must be PNG/JPEG ≤30MB with total pixels between
        <strong>262,144 and 36,000,000</strong> and aspect between <strong>1:16 and 16:1</strong>.
        Pricing is matched by <strong>resolution</strong> (<code>quality</code>), not by aspect ratio.
      </p>
    </section>

    <section class="info-section" aria-labelledby="compare-heading">
      <h2 id="compare-heading" class="section-title">📊 Seedream Generations Compared: 5 Lite · 5 Pro · 5 Flash</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedream 5 Pro compared across all model generations">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>5 Lite</th>
              <th>5 Pro</th>
              <th>5 Flash</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Positioning</strong></td>
              <td>Multimodal workhorse</td>
              <td><strong>Premium quality</strong></td>
              <td>Speed-first lane</td>
            </tr>
            <tr>
              <td><strong>Prompt limit</strong></td>
              <td>2995 / 2996</td>
              <td><strong>4–5000</strong></td>
              <td><strong>4–5000</strong></td>
            </tr>
            <tr>
              <td><strong>Resolution / billing</strong></td>
              <td>Basic 2K / High 3K, by ratio + quality</td>
              <td><strong>1K / 2K (layers: 1K / 1.5K / 2K)</strong></td>
              <td>1K / 1.5K / 2K, one price</td>
            </tr>
            <tr>
              <td><strong>Reference images</strong></td>
              <td>1–5, each ≤10MB</td>
              <td><strong>1–10, each ≤30MB</strong></td>
              <td><strong>1–10, each ≤30MB</strong></td>
            </tr>
            <tr>
              <td><strong>Layer decomposition</strong></td>
              <td>—</td>
              <td><strong>Yes</strong></td>
              <td><strong>Yes</strong></td>
            </tr>
            <tr>
              <td><strong>Aspect ratios</strong></td>
              <td>8 (1:1 → 21:9)</td>
              <td>8 (1:1 → 21:9)</td>
              <td>8 (1:1 → 21:9)</td>
            </tr>
            <tr>
              <td><strong>Output formats</strong></td>
              <td>PNG</td>
              <td>PNG / JPEG</td>
              <td>PNG / JPEG</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>Routine 2K/3K stills and frame prep</td>
              <td>Hero art, dense references, editable layers</td>
              <td>High-volume drafts at flat resolution pricing</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">5 Pro is the <strong>quality-first</strong> tier of the trio—same 5000-char prompt ceiling and
        10-image capacity as 5 Flash, but billed per resolution band with 2K as the top step for generation.</p>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Seedream 5 Pro)</h2>
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
          <div v-show="openFaqIndex === index" class="faq-answer"><div v-html="faq.answer" /></div>
        </div>
      </div>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Seedream 5 Pro — Three Workflows</h2>
      <p class="section-lead">Choose the mode that matches your task:</p>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in proWorkflows"
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
      for Seedream 5 Pro costs per resolution.
    </div>

    <div class="upgrade-tip">
      ⚡ Optimising for throughput rather than peak fidelity?
      <a href="/home/seedream/5-flash-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedream/5-flash-text-to-image')">Seedream 5 Flash Text to Image</a>,
      <a href="/home/seedream/5-flash-image-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedream/5-flash-image-to-image')">5 Flash Image to Image</a>
      and
      <a href="/home/seedream/5-flash-layer-decomposition" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedream/5-flash-layer-decomposition')">5 Flash Layer Decomposition</a>
      keep the same controls with 1K / 1.5K / 2K billed at one price.
    </div>

    <div class="upgrade-tip">
      🖼️ Still on the older tier? The
      <a href="/home/seedream/5-lite-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedream/5-lite-text-to-image')">Seedream 5 Lite</a>
      pair remains the 2K/3K workhorse—but 5 Pro is the only line with layer decomposition and 30MB references.
    </div>

    <div class="upgrade-tip">
      🎬 <strong>ByteDance video companion — Seedance</strong>
      Export layers or stills here, then animate them with
      <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedance/v1-lite-image-to-video')">Seedance v1 Lite Image to Video</a>
      or feed first/last frames into
      <a href="/home/seedance/v2" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedance/v2')">Seedance 2</a>.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const proWorkflows = [
  { name: 'Seedream 5 Pro Text to Image', title: 'Pro Text to Image', description: 'Prompt-only premium generation—5000 chars, 8 ratios, 1K/2K.', path: '/home/seedream/5-pro-text-to-image', icon: 'fas fa-crown' },
  { name: 'Seedream 5 Pro Image to Image', title: 'Pro Image to Image', description: 'Blend up to 10 references (≤30MB each) with a prompt.', path: '/home/seedream/5-pro-image-to-image', icon: 'fas fa-photo-film' },
  { name: 'Seedream 5 Pro Layer Decomposition', title: 'Pro Layer Decomposition', description: 'Split one image into editable PNG layers, 1K/1.5K/2K.', path: '/home/seedream/5-pro-layer-decomposition', icon: 'fas fa-layer-group' }
]

const workflowIntroMap = {
  '/home/seedream/5-pro-text-to-image': {
    title: '👑 Seedream 5 Pro Text to Image',
    lead: 'Write a prompt of <strong>4 to 5000 characters</strong>, pick one of <strong>8 aspect ratios</strong> (1:1 through 21:9) and a <strong>1K or 2K</strong> resolution band—the resolution is what sets your credit cost. Export as PNG or JPEG.'
  },
  '/home/seedream/5-pro-image-to-image': {
    title: '🎬 Seedream 5 Pro Image to Image',
    lead: 'Upload <strong>1 to 10 reference images</strong> (JPEG, PNG or WebP, each ≤30MB) and direct the remix with a prompt up to <strong>5000 characters</strong>. Same 8 ratios and <strong>1K / 2K</strong> resolution billing as Pro text-to-image.'
  },
  '/home/seedream/5-pro-layer-decomposition': {
    title: '🧩 Seedream 5 Pro Layer Decomposition',
    lead: 'Feed <strong>exactly one source image</strong> and Seedream 5 Pro separates it into <strong>editable PNG layers</strong> plus a base image. The prompt is optional—leave it blank for automatic element detection, or target regions with <strong>&lt;bbox&gt;x1 y1 x2 y2&lt;/bbox&gt;</strong> coordinates (0–1000).'
  }
}

const workflowDefinitionMap = {
  '/home/seedream/5-pro-text-to-image': {
    title: 'What is Seedream 5 Pro Text to Image?',
    body: '<strong>Seedream 5 Pro Text to Image</strong> on FuseAITools (<code>seedream-5-pro-text-to-image</code>) is ByteDance’s premium prompt-to-image model: required <strong>prompt</strong> (4–5000 chars), <strong>aspectRatio</strong> (1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2, 21:9) and <strong>resolution</strong> (1K / 2K), with optional <strong>outputFormat</strong> (png / jpeg).'
  },
  '/home/seedream/5-pro-image-to-image': {
    title: 'What is Seedream 5 Pro Image to Image?',
    body: '<strong>Seedream 5 Pro Image to Image</strong> on FuseAITools (<code>seedream-5-pro-image-to-image</code>) edits or composites <strong>1–10 uploaded images</strong> under a 4–5000 character prompt. Aspect ratio and resolution (1K / 2K) are required; the resolution is the billing dimension.'
  },
  '/home/seedream/5-pro-layer-decomposition': {
    title: 'What is Seedream 5 Pro Layer Decomposition?',
    body: '<strong>Seedream 5 Pro Layer Decomposition</strong> on FuseAITools (<code>seedream-5-pro-layer-decomposition</code>) breaks a single artwork into reusable layers. Required: <strong>one imageUrl</strong> (PNG/JPEG ≤30MB, 262,144–36,000,000 total pixels) and a <strong>resolution</strong> of 1K / 1.5K / 2K. The decomposed layers are always PNG; <code>outputFormat</code> only affects the base image.'
  }
}

const workflowFaqMap = {
  '/home/seedream/5-pro-text-to-image': [
    { question: 'What resolution options does Seedream 5 Pro text-to-image offer?', answer: '<strong>1K</strong> and <strong>2K</strong>. Resolution is the billing dimension—choose it before generating, since credits are matched to that band.' },
    { question: 'How long can a Seedream 5 Pro prompt be?', answer: 'Between <strong>4 and 5000 characters</strong>, far beyond the 2995-character limit on Seedream 5 Lite.' }
  ],
  '/home/seedream/5-pro-image-to-image': [
    { question: 'How many images can I upload to Seedream 5 Pro image-to-image?', answer: 'From <strong>1 to 10</strong> images (JPEG, PNG or WebP), each up to <strong>30MB</strong>—five times the reference capacity of 5 Lite.' },
    { question: 'Does 5 Pro image-to-image support transparent backgrounds?', answer: 'No—choose <strong>png</strong> or <strong>jpeg</strong> as the output format. For cut-out layers, run the result through <a href="/home/seedream/5-pro-layer-decomposition" class="seo-inline-link">5 Pro Layer Decomposition</a>.' }
  ],
  '/home/seedream/5-pro-layer-decomposition': [
    { question: 'What does layer decomposition return?', answer: 'A <strong>base image</strong> in your chosen format plus the separated <strong>layers as PNG</strong>, so you can move or delete individual elements in any design tool.' },
    { question: 'Can I tell Seedream 5 Pro which element to extract?', answer: 'Yes—add an optional prompt (≤5000 chars) and use <strong>&lt;bbox&gt;x1 y1 x2 y2&lt;/bbox&gt;</strong> normalised coordinates (0–1000) to point at a specific region. Omit the prompt to let the model detect the main elements automatically.' }
  ]
}

const commonFaq = [
  { question: 'Do I need a local GPU for Seedream 5 Pro?', answer: 'No—Seedream 5 Pro runs in the cloud on FuseAITools from any modern browser; credits are charged per successful generation.' },
  { question: 'How is Seedream 5 Pro priced on FuseAITools?', answer: 'Pricing is matched by <strong>resolution</strong>—1K or 2K for generation, 1K / 1.5K / 2K for layer decomposition—with the exact credit cost shown on the Generate button. New users get <strong>20 free credits</strong>—see <a href="/pricing" class="seo-pricing-link">pricing</a>.' }
]

const workflowIntro = computed(() => workflowIntroMap[route.path.replace(/\/$/, '')] || null)
const workflowDefinition = computed(() => workflowDefinitionMap[route.path.replace(/\/$/, '')] || null)
const faqItems = computed(() => {
  const path = route.path.replace(/\/$/, '')
  return [...(workflowFaqMap[path] || []), ...commonFaq]
})
useToolSeoFaqSchema(faqItems)

const coreFeatures = [
  { icon: '👑', title: 'Premium Quality Tier', description: 'ByteDance’s top Seedream line for hero assets—<strong>1K / 2K</strong> output bands.' },
  { icon: '✍️', title: '5000-Char Prompts', description: 'Describe layout, lighting and material in one pass—<strong>4 to 5000 characters</strong>.' },
  { icon: '🖼️', title: 'Up to 10 References', description: 'Composite or restyle <strong>1–10 images</strong>, each up to <strong>30MB</strong>.' },
  { icon: '🧩', title: 'Layer Decomposition', description: 'Split one artwork into <strong>editable PNG layers</strong> with optional &lt;bbox&gt; targeting.' },
  { icon: '📐', title: '8 Aspect Ratios', description: 'Square, portrait, story and <strong>21:9</strong> cinematic—all on the Pro tier.' },
  { icon: '🎞️', title: 'PNG / JPEG Output', description: 'Pick the container explicitly or leave the provider default.' }
]

const scenarioTags = [
  'Hero campaign art',
  'Multi-reference composites',
  'Editable layer extraction',
  'Design asset reuse',
  'Video frame prep for Seedance'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path.includes('/home/seedream/5-pro-'))

const openFaqIndex = ref(0)
function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
