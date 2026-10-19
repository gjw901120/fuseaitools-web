<template>
  <div
    id="seedream-5-lite-section"
    class="seedream-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Seedream 5 Lite Image on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Seedream 5 Lite text-to-image and image-to-image on FuseAITools—2K/3K output, nine aspect ratios, prompts up to 2996 characters."
    />

    <div class="version-badge">🖼️ Seedream 5 Lite · ByteDance Image · Two Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🖼️ Seedream 5 Lite on FuseAITools</h2>
      <p class="tool-sub">
        Seedream 5 Lite on <a href="/" class="seo-inline-link">FuseAITools</a> is ByteDance's
        <strong>multimodal image</strong> line—generate from text or edit existing images with natural-language
        instructions. Pick <strong>Basic (2K)</strong> or <strong>High (3K)</strong> quality and aspect ratios from
        square through <strong>21:9</strong>. Credits appear on the Generate button before you submit; new users
        receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Seedream 5 Lite Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Seedream 5 Lite T2I vs I2I</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedream 5 Lite text-to-image vs image-to-image">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Text to Image</th>
              <th>Image to Image</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Input</td>
              <td><strong>Prompt only</strong> (max 2995 chars)</td>
              <td><strong>1–5 images</strong> + prompt (max 2996 chars)</td>
            </tr>
            <tr>
              <td>Output</td>
              <td>Single image at chosen ratio</td>
              <td>Edited or restyled image at chosen ratio</td>
            </tr>
            <tr>
              <td>Quality</td>
              <td><strong>Basic 2K</strong> or <strong>High 3K</strong></td>
              <td>Same</td>
            </tr>
            <tr>
              <td>Aspect ratios</td>
              <td>1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2, 21:9</td>
              <td>Same</td>
            </tr>
            <tr>
              <td>Best for</td>
              <td>New concepts from scratch</td>
              <td>Lighting edits, style transfer, frame prep for video</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="generations-heading">
      <h2 id="generations-heading" class="section-title">📊 Seedream Generations Compared: 5 Lite · 5 Pro · 5 Flash</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedream 5 Lite compared across all model generations">
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
              <td><strong>Multimodal workhorse</strong></td>
              <td>Premium quality</td>
              <td>Speed-first lane</td>
            </tr>
            <tr>
              <td><strong>Prompt limit</strong></td>
              <td><strong>2995 / 2996</strong></td>
              <td>4–5000</td>
              <td>4–5000</td>
            </tr>
            <tr>
              <td><strong>Resolution / billing</strong></td>
              <td><strong>Basic 2K / High 3K</strong>, by ratio + quality</td>
              <td>1K / 2K (layers: 1K / 1.5K / 2K)</td>
              <td>1K / 1.5K / 2K at one price</td>
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
              <td>Routine 2K/3K stills, frame prep for video</td>
              <td>Hero art, dense references, editable layers</td>
              <td>Bulk drafts at flat resolution pricing</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">5 Lite is the only tier billed by <strong>aspect ratio + quality</strong> rather than resolution—
        pick it for 3K output, or move to 5 Pro / 5 Flash when you need 5000-char prompts, 30MB references or layer splitting.</p>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Seedream 5 Lite)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Seedream 5 Lite Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Seedream form and API (<code>seedream-5-lite-*</code> models).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedream 5 Lite workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Required input</th>
              <th>Prompt limit</th>
              <th>Quality</th>
              <th>Aspect ratios</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Text to Image</strong></td>
              <td>Prompt</td>
              <td>Max 2995 chars</td>
              <td>Basic (2K) / High (3K)</td>
              <td>1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2, 21:9</td>
            </tr>
            <tr>
              <td><strong>Image to Image</strong></td>
              <td>1–5 image URLs + prompt</td>
              <td>Max 2996 chars</td>
              <td>Basic (2K) / High (3K)</td>
              <td>Same as T2I</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Image uploads: JPEG, PNG, WebP (max 10MB each). Credits depend on aspect ratio and quality tier—shown on Generate before submission.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Seedream 5 Lite — Two Image Workflows</h2>
      <p class="section-lead">Start from text or edit existing images:</p>
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
      🎬 <strong>ByteDance video companion — Seedance</strong>
      Create stills here, then animate them with
      <a
        href="/home/seedance/v1-lite-image-to-video"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedance/v1-lite-image-to-video')"
      >Seedance v1 Lite Image to Video</a>
      or use Seedream I2I to prepare first/last frames for
      <a
        href="/home/seedance/v2"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedance/v2')"
      >Seedance 2</a>
      multimodal clips. Browse the full
      <a
        href="/home/seedance"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedance')"
      >Seedance suite →</a>
    </div>

    <div class="upgrade-tip">
      👑 Want ByteDance’s premium image tier? Upgrade to
      <a
        href="/home/seedream/5-pro-text-to-image"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedream/5-pro-text-to-image')"
      >Seedream 5 Pro Text to Image</a>
      or
      <a
        href="/home/seedream/5-pro-image-to-image"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedream/5-pro-image-to-image')"
      >5 Pro Image to Image</a>
      —5000-character prompts, up to 10 references at 30MB each, and 1K/2K resolution billing.
    </div>

    <div class="upgrade-tip">
      ✂️ Need editable layers? Both
      <a
        href="/home/seedream/5-pro-layer-decomposition"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedream/5-pro-layer-decomposition')"
      >5 Pro Layer Decomposition</a>
      and
      <a
        href="/home/seedream/5-flash-layer-decomposition"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedream/5-flash-layer-decomposition')"
      >5 Flash Layer Decomposition</a>
      split one artwork into PNG layers.
    </div>

    <div class="upgrade-tip">
      ⚡ Optimising for volume? The
      <a
        href="/home/seedream/5-flash-text-to-image"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedream/5-flash-text-to-image')"
      >Seedream 5 Flash</a>
      line charges the same credits for 1K, 1.5K and 2K.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const imageWorkflows = [
  {
    name: 'Seedream 5 Lite Text to Image',
    title: 'Text to Image',
    description: 'Prompt-only generation—2K/3K at nine aspect ratios from 1:1 to 21:9.',
    path: '/home/seedream/5-lite-text-to-image',
    icon: 'fas fa-font'
  },
  {
    name: 'Seedream 5 Lite Image to Image',
    title: 'Image to Image',
    description: 'Upload 1–5 images and instruct edits—lighting, style transfer, or detail polish.',
    path: '/home/seedream/5-lite-image-to-image',
    icon: 'fas fa-image'
  }
]

const workflowIntroMap = {
  '/home/seedream/5-lite-text-to-image': {
    title: '📝 Seedream 5 Lite Text to Image',
    lead: 'Describe your scene in text—Seedream 5 Lite renders a single image at <strong>Basic (2K)</strong> or <strong>High (3K)</strong>. Choose from <strong>nine aspect ratios</strong> (1:1 through 21:9) with prompts up to <strong>2995 characters</strong>.'
  },
  '/home/seedream/5-lite-image-to-image': {
    title: '🖼️ Seedream 5 Lite Image to Image',
    lead: 'Upload <strong>1–5 images</strong> (JPEG/PNG/WebP, max 10MB each) and guide the result with a prompt up to <strong>2996 characters</strong>—ideal for lighting changes, style transfer, and preparing frames for ByteDance video workflows.'
  }
}

const workflowDefinitionMap = {
  '/home/seedream/5-lite-text-to-image': {
    title: 'What is Seedream 5 Lite Text to Image?',
    body:
      '<strong>Seedream 5 Lite Text to Image</strong> on FuseAITools (<code>seedream-5-lite-text-to-image</code>) generates one image from a text prompt. Required: <strong>prompt</strong> (max 2995 chars), <strong>aspect ratio</strong>, and <strong>quality</strong> (Basic 2K or High 3K). Ratios include <strong>1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2, and 21:9</strong>.'
  },
  '/home/seedream/5-lite-image-to-image': {
    title: 'What is Seedream 5 Lite Image to Image?',
    body:
      '<strong>Seedream 5 Lite Image to Image</strong> on FuseAITools (<code>seedream-5-lite-image-to-image</code>) edits or restyles uploaded images via prompt. Required: <strong>1–5 image URLs</strong> + prompt (max 2996 chars), aspect ratio, and quality (Basic 2K / High 3K). Use it for lighting edits, sticker styles, or first/last frame prep before <strong>Seedance</strong> video generation.'
  }
}

const workflowFaqMap = {
  '/home/seedream/5-lite-text-to-image': [
    {
      question: 'What quality tiers does Seedream 5 Lite text-to-image offer?',
      answer:
        'Choose <strong>Basic (2K)</strong> for faster drafts or <strong>High (3K)</strong> for sharper final assets. Credits vary by quality and aspect ratio—check the Generate button before submitting.'
    },
    {
      question: 'Which aspect ratios does Seedream 5 Lite support?',
      answer:
        'Nine options: <strong>1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2, and 21:9</strong>—covering social squares, vertical stories, and ultra-wide layouts.'
    }
  ],
  '/home/seedream/5-lite-image-to-image': [
    {
      question: 'How many images can I upload for Seedream 5 Lite image-to-image?',
      answer:
        'Between <strong>1 and 5</strong> images per request (JPEG, PNG, or WebP; max <strong>10MB</strong> each). Write a clear instruction—e.g. “golden hour lighting” or “sticker style outline”.'
    },
    {
      question: 'Can Seedream images feed into Seedance video?',
      answer:
        'Yes—many creators generate or edit stills in Seedream, then animate them in <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link">Seedance v1 Lite I2V</a> or upload first/last frames to <a href="/home/seedance/v2" class="seo-inline-link">Seedance 2</a>. Both are ByteDance models on FuseAITools.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Seedream 5 Lite?',
    answer:
      'No—Seedream 5 Lite runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How is Seedream 5 Lite priced on FuseAITools?',
    answer:
      'Credits depend on <strong>aspect ratio</strong> and <strong>quality</strong> (Basic 2K vs High 3K)—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
    icon: '📐',
    title: 'Nine Aspect Ratios',
    description:
      'From <strong>1:1</strong> social squares to <strong>21:9</strong> cinematic—pick the format before you generate.'
  },
  {
    icon: '✨',
    title: '2K & 3K Output',
    description:
      '<strong>Basic (2K)</strong> for quick iteration; <strong>High (3K)</strong> when you need extra detail for print or hero assets.'
  },
  {
    icon: '🖌️',
    title: 'Text & Image Editing',
    description:
      'Generate from scratch or upload <strong>1–5 images</strong> and edit with natural-language instructions.'
  },
  {
    icon: '☁️',
    title: 'Cloud on FuseAITools',
    description:
      'ByteDance Seedream in the browser—<strong>credits shown before generate</strong>; pairs with <strong>Seedance</strong> video workflows.'
  }
]

const scenarioTags = [
  'Social & story covers',
  'Sticker & icon design',
  'Lighting & style edits',
  'First/last frame prep',
  'Marketing stills at 2K/3K'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path.startsWith('/home/seedream/'))

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
