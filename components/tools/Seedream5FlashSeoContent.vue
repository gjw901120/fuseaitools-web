<template>
  <div
    id="seedream-5-flash-section"
    class="seedream-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Seedream 5 Flash on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Seedream 5 Flash text-to-image, image-to-image and layer decomposition on FuseAITools—5000-char prompts, 8 aspect ratios, 1K/1.5K/2K at one price, up to 10 reference images, editable PNG layers. Billed by resolution with credits."
    />

    <div class="version-badge">⚡ Seedream 5 Flash · ByteDance Speed Tier · Three Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">⚡ Seedream 5 Flash on FuseAITools</h2>
      <p class="tool-sub">
        <strong>Seedream 5 Flash</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> is the
        speed-first ByteDance image line: the same <strong>5000-character prompts</strong>,
        <strong>8 aspect ratios</strong> and <strong>10-image reference capacity</strong> as 5 Pro, but
        <strong>1K / 1.5K / 2K all bill at one price</strong>. Three workflows—text to image, image to image and
        <strong>layer decomposition</strong>—make it the default for high-volume drafting. New users receive
        <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Seedream 5 Flash Core Features</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Seedream 5 Flash Technical Specs</h2>
      <p class="section-lead">Parameters match the FuseAITools Seedream form and API (<code>seedream-5-flash-*</code> models).</p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedream 5 Flash workflow capabilities">
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
              <td><strong>5 Flash Text to Image</strong></td>
              <td>Prompt 4–5000 chars</td>
              <td><strong>1K / 1.5K / 2K — same price</strong></td>
              <td>8 aspect ratios, PNG/JPEG, NSFW filter</td>
            </tr>
            <tr>
              <td><strong>5 Flash Image to Image</strong></td>
              <td>1–10 image URLs + prompt 4–5000</td>
              <td><strong>1K / 1.5K / 2K — same price</strong></td>
              <td>Same ratios; each image ≤30MB (jpeg/png/webp)</td>
            </tr>
            <tr>
              <td><strong>5 Flash Layer Decomposition</strong></td>
              <td>Exactly 1 source image + optional prompt 4–5000</td>
              <td><strong>1K / 1.5K / 2K — same price</strong></td>
              <td>&lt;bbox&gt; targeting, base PNG/JPEG, layers always PNG</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Resolution is still a <strong>required</strong> field—FuseAITools does not silently default it—and it is the
        pricing dimension. Layer decomposition sources must be PNG/JPEG ≤30MB with
        <strong>262,144–36,000,000</strong> total pixels and aspect between <strong>1:16 and 16:1</strong>.
      </p>
    </section>

    <section class="info-section" aria-labelledby="compare-heading">
      <h2 id="compare-heading" class="section-title">📊 Seedream Generations Compared: 5 Lite · 5 Pro · 5 Flash</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedream 5 Flash compared across all model generations">
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
              <td>Premium quality</td>
              <td><strong>Speed-first lane</strong></td>
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
              <td>1K / 2K (layers: 1K / 1.5K / 2K)</td>
              <td><strong>1K / 1.5K / 2K at one price</strong></td>
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
              <td>Hero art and maximum detail</td>
              <td><strong>Bulk drafts, A/B variants, fast layers</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">5 Flash is the <strong>cost-predictable</strong> tier: bumping from 1K to 2K does not raise the
        credit price, so render large batches at full resolution and reserve 5 Pro for final hero assets.</p>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Seedream 5 Flash)</h2>
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
      <h2 id="workflows-heading" class="section-title">Seedream 5 Flash — Three Workflows</h2>
      <p class="section-lead">Choose the mode that matches your task:</p>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in flashWorkflows"
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
      for Seedream 5 Flash costs per resolution.
    </div>

    <div class="upgrade-tip">
      👑 Need the highest-fidelity finish? The premium tier keeps identical controls—
      <a href="/home/seedream/5-pro-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedream/5-pro-text-to-image')">Seedream 5 Pro Text to Image</a>,
      <a href="/home/seedream/5-pro-image-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedream/5-pro-image-to-image')">5 Pro Image to Image</a>
      and
      <a href="/home/seedream/5-pro-layer-decomposition" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedream/5-pro-layer-decomposition')">5 Pro Layer Decomposition</a>
      bill by 1K / 2K resolution for final hero assets.
    </div>

    <div class="upgrade-tip">
      🖼️ Want the classic 2K/3K workhorse instead?
      <a href="/home/seedream/5-lite-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedream/5-lite-text-to-image')">Seedream 5 Lite Text to Image</a>
      and
      <a href="/home/seedream/5-lite-image-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedream/5-lite-image-to-image')">5 Lite Image to Image</a>
      price by aspect ratio and quality tier.
    </div>

    <div class="upgrade-tip">
      🎬 <strong>ByteDance video companion — Seedance</strong>
      Draft stills fast here, then animate them with
      <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedance/v1-lite-image-to-video')">Seedance v1 Lite Image to Video</a>
      or feed first/last frames into
      <a href="/home/seedance/v2" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedance/v2')">Seedance 2</a>.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const flashWorkflows = [
  { name: 'Seedream 5 Flash Text to Image', title: 'Flash Text to Image', description: 'Fast prompt-to-image—5000 chars, 8 ratios, 1K/1.5K/2K flat.', path: '/home/seedream/5-flash-text-to-image', icon: 'fas fa-bolt' },
  { name: 'Seedream 5 Flash Image to Image', title: 'Flash Image to Image', description: 'Remix up to 10 references at one resolution price.', path: '/home/seedream/5-flash-image-to-image', icon: 'fas fa-wand-magic-sparkles' },
  { name: 'Seedream 5 Flash Layer Decomposition', title: 'Flash Layer Decomposition', description: 'Quick layer splits into editable PNGs from one source image.', path: '/home/seedream/5-flash-layer-decomposition', icon: 'fas fa-clone' }
]

const workflowIntroMap = {
  '/home/seedream/5-flash-text-to-image': {
    title: '⚡ Seedream 5 Flash Text to Image',
    lead: 'Generate from a <strong>4–5000 character</strong> prompt across <strong>8 aspect ratios</strong>, and pick <strong>1K, 1.5K or 2K</strong>—all three tiers cost the same credits, so there is no penalty for rendering big. Export PNG or JPEG.'
  },
  '/home/seedream/5-flash-image-to-image': {
    title: '🪄 Seedream 5 Flash Image to Image',
    lead: 'Upload <strong>1 to 10 images</strong> (JPEG, PNG or WebP, each ≤30MB) plus a prompt up to <strong>5000 characters</strong> to restyle, combine or correct them—fast, and billed at the same flat rate whatever resolution you choose.'
  },
  '/home/seedream/5-flash-layer-decomposition': {
    title: '🧩 Seedream 5 Flash Layer Decomposition',
    lead: 'Send <strong>one source image</strong> and get back a base plus <strong>separated PNG layers</strong>. The prompt is optional (4–5000 chars when used) and supports <strong>&lt;bbox&gt;x1 y1 x2 y2&lt;/bbox&gt;</strong> coordinates (0–1000) to point at exact elements.'
  }
}

const workflowDefinitionMap = {
  '/home/seedream/5-flash-text-to-image': {
    title: 'What is Seedream 5 Flash Text to Image?',
    body: '<strong>Seedream 5 Flash Text to Image</strong> on FuseAITools (<code>seedream-5-flash-text-to-image</code>) is the speed-oriented ByteDance generator: required <strong>prompt</strong> (4–5000), <strong>aspectRatio</strong> (1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2, 21:9) and <strong>resolution</strong> (1K / 1.5K / 2K, priced identically), with optional <strong>outputFormat</strong> (png / jpeg).'
  },
  '/home/seedream/5-flash-image-to-image': {
    title: 'What is Seedream 5 Flash Image to Image?',
    body: '<strong>Seedream 5 Flash Image to Image</strong> on FuseAITools (<code>seedream-5-flash-image-to-image</code>) edits or composes <strong>1–10 uploaded images</strong> with a 4–5000 character prompt. Aspect ratio and resolution are required; all three resolution bands share one credit price.'
  },
  '/home/seedream/5-flash-layer-decomposition': {
    title: 'What is Seedream 5 Flash Layer Decomposition?',
    body: '<strong>Seedream 5 Flash Layer Decomposition</strong> on FuseAITools (<code>seedream-5-flash-layer-decomposition</code>) separates one image into reusable layers. Required: <strong>one imageUrl</strong> (PNG/JPEG ≤30MB, 262,144–36,000,000 total pixels) and a <strong>resolution</strong> of 1K / 1.5K / 2K. Layers are always PNG; <code>outputFormat</code> only affects the base image.'
  }
}

const workflowFaqMap = {
  '/home/seedream/5-flash-text-to-image': [
    { question: 'Is 2K more expensive than 1K on Seedream 5 Flash?', answer: 'No—<strong>1K, 1.5K and 2K share the same credit price</strong> on 5 Flash. Resolution is still required so the billing rule can be matched explicitly.' },
    { question: 'When should I use 5 Flash instead of 5 Pro?', answer: 'Use <strong>Flash</strong> for iteration volume, previews and A/B variants where turnaround matters; switch to <a href="/home/seedream/5-pro-text-to-image" class="seo-inline-link">5 Pro</a> for final assets that need maximum detail.' }
  ],
  '/home/seedream/5-flash-image-to-image': [
    { question: 'How many references can Seedream 5 Flash image-to-image take?', answer: '<strong>1 to 10</strong> images (JPEG, PNG, WebP), each up to <strong>30MB</strong>—the same capacity as 5 Pro and double the 5 Lite limit.' },
    { question: 'What aspect ratios are available?', answer: 'Eight: <strong>1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2 and 21:9</strong>. Aspect ratio is required on every Flash workflow.' }
  ],
  '/home/seedream/5-flash-layer-decomposition': [
    { question: 'Do I have to write a prompt for layer decomposition?', answer: 'No—the prompt is optional. Leave it empty and the model detects the main elements itself; add one (4–5000 chars) with <strong>&lt;bbox&gt;</strong> coordinates when you need a specific region extracted.' },
    { question: 'What format are the extracted layers?', answer: 'The layers are always <strong>PNG</strong> with transparency; the <code>outputFormat</code> selector only changes the base image (png or jpeg).' }
  ]
}

const commonFaq = [
  { question: 'Do I need a local GPU for Seedream 5 Flash?', answer: 'No—Seedream 5 Flash runs in the cloud on FuseAITools; credits are charged per successful generation.' },
  { question: 'How is Seedream 5 Flash priced on FuseAITools?', answer: 'Pricing is matched by <strong>resolution</strong> (1K / 1.5K / 2K) at a <strong>single flat credit cost</strong>—shown on the Generate button. New users get <strong>20 free credits</strong>—see <a href="/pricing" class="seo-pricing-link">pricing</a>.' }
]

const workflowIntro = computed(() => workflowIntroMap[route.path.replace(/\/$/, '')] || null)
const workflowDefinition = computed(() => workflowDefinitionMap[route.path.replace(/\/$/, '')] || null)
const faqItems = computed(() => {
  const path = route.path.replace(/\/$/, '')
  return [...(workflowFaqMap[path] || []), ...commonFaq]
})
useToolSeoFaqSchema(faqItems)

const coreFeatures = [
  { icon: '⚡', title: 'Speed-First Tier', description: 'Built for volume—drafts, variants and batch edits with short turnaround.' },
  { icon: '💸', title: 'Flat Resolution Price', description: '<strong>1K / 1.5K / 2K cost the same credits</strong>, so render at full size.' },
  { icon: '✍️', title: '5000-Char Prompts', description: 'Required prompt of <strong>4 to 5000 characters</strong> on generation and editing.' },
  { icon: '🖼️', title: 'Up to 10 References', description: 'Composite or restyle <strong>1–10 images</strong>, each up to <strong>30MB</strong>.' },
  { icon: '🧩', title: 'Layer Decomposition', description: 'One source image in, <strong>editable PNG layers</strong> out—optional &lt;bbox&gt; targeting.' },
  { icon: '📐', title: '8 Aspect Ratios', description: 'Square, portrait, story and <strong>21:9</strong> cinematic, all on Flash.' }
]

const scenarioTags = [
  'Bulk concept drafts',
  'A/B creative variants',
  'Fast multi-reference edits',
  'Quick layer extraction',
  'Social assets at flat cost'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path.includes('/home/seedream/5-flash-'))

const openFaqIndex = ref(0)
function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
