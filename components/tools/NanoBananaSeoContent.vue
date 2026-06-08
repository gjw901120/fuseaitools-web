<template>
  <div
    id="nano-banana-section"
    class="nano-banana-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Nano Banana Image on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Nano Banana text-to-image, image-to-image, Pro 4K, and Nano Banana 2 on FuseAITools—Google Gemini Flash Image with credit-based pricing."
    />

    <div class="version-badge">🍌 Nano Banana · Google Gemini Flash Image · v1 (3 workflows) + v2</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🍌 Nano Banana on FuseAITools</h2>
      <p class="tool-sub">
        Nano Banana on <a href="/" class="seo-inline-link">FuseAITools</a> is Google's
        <strong>Gemini Flash Image</strong> suite in two generations: <strong>v1</strong> covers
        <strong>Text to Image</strong>, <strong>Image to Image</strong>, and <strong>Pro Generate</strong> (5000-char
        prompts; Pro adds mandatory 1–10 references and 1K/2K/4K). <strong>v2 — Nano Banana 2</strong> raises the
        prompt cap to <strong>20,000 characters</strong> with <strong>optional 0–14</strong> image inputs. Credits
        appear on the Generate button before you submit; new users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Nano Banana Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Nano Banana v1 vs v2</h2>
      <p class="section-lead">
        <strong>v1</strong> splits into three focused workflows; <strong>v2 (Nano Banana 2)</strong> unifies long-prompt
        and optional multi-image generation in one mode.
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Nano Banana v1 three workflows vs v2">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Nano Banana v1</th>
              <th>Nano Banana 2 (v2)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Workflows</td>
              <td>
                <strong>3 modes</strong>:
                <a href="/home/nano-banana/generate" class="seo-inline-link">Text to Image</a>,
                <a href="/home/nano-banana/edit" class="seo-inline-link">Image to Image</a>,
                <a href="/home/nano-banana/pro-generate" class="seo-inline-link">Pro Generate</a>
              </td>
              <td><strong>1 unified mode</strong> — prompt-first with optional references</td>
            </tr>
            <tr>
              <td>Prompt limit</td>
              <td>Max <strong>5000</strong> chars (all v1 modes)</td>
              <td>Max <strong>20,000</strong> chars</td>
            </tr>
            <tr>
              <td>Image input</td>
              <td>
                T2I: <strong>none</strong>; I2I: <strong>1–10 required</strong>; Pro:
                <strong>1–10 required</strong>
              </td>
              <td><strong>0–14 optional</strong> — text-only or multi-reference</td>
            </tr>
            <tr>
              <td>Resolution</td>
              <td>T2I/I2I: <strong>aspect ratios</strong> (11 options); Pro: <strong>1K/2K/4K</strong></td>
              <td><strong>1K / 2K / 4K</strong> + fifteen aspect ratios</td>
            </tr>
            <tr>
              <td>Pricing</td>
              <td>T2I/I2I: flat per image; Pro: <strong>RULE</strong> by resolution</td>
              <td><strong>RULE</strong> by resolution tier</td>
            </tr>
            <tr>
              <td>Output format</td>
              <td>PNG / JPEG</td>
              <td>JPG / PNG</td>
            </tr>
            <tr>
              <td>Best for</td>
              <td>Fast drafts, mandatory-reference 4K (Pro), dedicated I2I edits</td>
              <td>Long creative briefs, optional multi-reference, single flexible entry point</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="v1-detail-heading">
      <h2 id="v1-detail-heading" class="section-title">📋 Nano Banana v1 — Three Workflows</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Nano Banana v1 text-to-image vs image-to-image vs pro">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Text to Image</th>
              <th>Image to Image</th>
              <th>Pro Generate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Input</td>
              <td><strong>Prompt only</strong></td>
              <td><strong>1–10 images</strong> + prompt</td>
              <td><strong>1–10 images</strong> + prompt</td>
            </tr>
            <tr>
              <td>Size / resolution</td>
              <td><strong>11 aspect ratios</strong> (imageSize)</td>
              <td>Same as T2I</td>
              <td><strong>1K / 2K / 4K</strong> + 11 aspect ratios</td>
            </tr>
            <tr>
              <td>Best for</td>
              <td>Fast drafts &amp; social covers</td>
              <td>Style transfer &amp; edits</td>
              <td>4K production assets with required references</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Nano Banana)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Nano Banana Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Nano Banana form and API (<code>nano-banana*</code> models).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Nano Banana workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Required input</th>
              <th>Prompt limit</th>
              <th>Size / resolution</th>
              <th>Output</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Text to Image</strong></td>
              <td>Prompt</td>
              <td>Max 5000 chars</td>
              <td>1:1, 9:16, 16:9, 3:4, 4:3, 3:2, 2:3, 5:4, 4:5, 21:9, auto</td>
              <td>PNG / JPEG</td>
            </tr>
            <tr>
              <td><strong>Image to Image</strong></td>
              <td>1–10 image URLs + prompt</td>
              <td>Max 5000 chars</td>
              <td>Same ratios as T2I</td>
              <td>PNG / JPEG</td>
            </tr>
            <tr>
              <td><strong>Pro Generate</strong></td>
              <td>1–10 image URLs + prompt</td>
              <td>Max 5000 chars</td>
              <td>1K / 2K / 4K; 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9, auto</td>
              <td>PNG / JPEG</td>
            </tr>
            <tr>
              <td><strong>Nano Banana 2</strong></td>
              <td>Prompt (+ 0–14 optional images)</td>
              <td>Max 20,000 chars</td>
              <td>1K / 2K / 4K; auto, 1:1, 1:4, 16:9, 1:8, 21:9, 2:3, 3:2, 3:4, 4:1, 4:3, 4:5, 5:4, 8:1, 9:16</td>
              <td>JPG / PNG</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Edit uploads: JPEG, PNG, WebP (max 10MB each). Pro and NB2 reference uploads: JPEG, PNG, WebP (max 30MB each).
        Pro and Nano Banana 2 credit costs follow the <strong>resolution</strong> tier shown on Generate.
      </p>
    </section>

    <section v-if="!isV2Page" class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Nano Banana v1 — Three Workflows</h2>
      <p class="section-lead">Three specialized v1 modes—pick the input style that fits your task:</p>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in v1Workflows"
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

    <div v-if="isV2Page" class="upgrade-tip">
      🍌 Prefer dedicated v1 modes?
      Start with
      <a
        href="/home/nano-banana/generate"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/nano-banana/generate')"
      >Text to Image</a>
      for prompt-only drafts,
      <a
        href="/home/nano-banana/edit"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/nano-banana/edit')"
      >Image to Image</a>
      for mandatory-reference edits, or
      <a
        href="/home/nano-banana/pro-generate"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/nano-banana/pro-generate')"
      >Pro Generate</a>
      when you need required 1–10 references at 1K/2K/4K.
    </div>
    <div v-else class="upgrade-tip">
      🧊 Need <strong>20k-character</strong> prompts or <strong>optional 0–14</strong> image inputs?
      <a
        href="/home/nano-banana/nano-banana-2"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/nano-banana/nano-banana-2')"
      >Nano Banana 2 (v2) →</a>
      unifies long briefs and flexible multi-reference generation in one workflow.
    </div>

    <div class="upgrade-tip">
      🖼️ <strong>ByteDance image companion — Seedream</strong>
      Create or refine stills in
      <a
        href="/home/seedream/5-lite-text-to-image"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedream/5-lite-text-to-image')"
      >Seedream 5 Lite Text to Image</a>
      or
      <a
        href="/home/seedream/5-lite-image-to-image"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedream/5-lite-image-to-image')"
      >Seedream 5 Lite Image to Image</a>
      —then animate with
      <a
        href="/home/seedance/v1-lite-image-to-video"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedance/v1-lite-image-to-video')"
      >Seedance v1 Lite I2V</a>.
      Browse the full
      <a
        href="/home/seedream"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedream')"
      >Seedream suite →</a>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const v1Workflows = [
  {
    name: 'Nano Banana v1 · Text to Image',
    title: 'Text to Image',
    description: 'Prompt-only generation—eleven aspect ratios including auto, PNG or JPEG output.',
    path: '/home/nano-banana/generate',
    icon: 'fas fa-font'
  },
  {
    name: 'Nano Banana v1 · Image to Image',
    title: 'Image to Image',
    description: 'Upload 1–10 images and instruct edits—style transfer, detail polish, or look unification.',
    path: '/home/nano-banana/edit',
    icon: 'fas fa-edit'
  },
  {
    name: 'Nano Banana v1 · Pro Generate',
    title: 'Pro Generate',
    description: '1–10 reference images plus prompt—1K, 2K, or 4K resolution for production assets.',
    path: '/home/nano-banana/pro-generate',
    icon: 'fas fa-star'
  }
]

const V2_PATH = '/home/nano-banana/nano-banana-2'

const isV2Page = computed(() => {
  const path = route.path.replace(/\/$/, '')
  return path === V2_PATH
})

const workflowIntroMap = {
  '/home/nano-banana/generate': {
    title: '📝 Nano Banana Text to Image',
    lead:
      'Describe your scene in text—Nano Banana (Gemini Flash Image) returns a single image in seconds. Pick from <strong>eleven aspect ratios</strong> including <strong>auto</strong>, and export as <strong>PNG or JPEG</strong> with prompts up to <strong>5000 characters</strong>.'
  },
  '/home/nano-banana/edit': {
    title: '🖼️ Nano Banana Image to Image',
    lead:
      'Upload <strong>1–10 images</strong> (JPEG/PNG/WebP, max 10MB each) and guide the result with a prompt up to <strong>5000 characters</strong>—ideal for style transfer, detail polish, and batch look unification.'
  },
  '/home/nano-banana/pro-generate': {
    title: '⭐ Nano Banana Pro Generate',
    lead:
      'Provide <strong>1–10 reference images</strong> plus a prompt and choose <strong>1K, 2K, or 4K</strong> resolution. Eleven aspect ratios from square through <strong>21:9</strong> and <strong>auto</strong>—built for production-ready assets on FuseAITools.'
  },
  '/home/nano-banana/nano-banana-2': {
    title: '🧊 Nano Banana 2',
    lead:
      'Write prompts up to <strong>20,000 characters</strong> and optionally attach <strong>0–14 images</strong>. Pick from <strong>fifteen aspect ratios</strong> and <strong>1K/2K/4K</strong> resolution with <strong>JPG or PNG</strong> output.'
  }
}

const workflowDefinitionMap = {
  '/home/nano-banana/generate': {
    title: 'What is Nano Banana Text to Image?',
    body:
      '<strong>Nano Banana Text to Image</strong> on FuseAITools (<code>nano-banana</code>) turns a text prompt into one image via Google\'s <strong>Gemini Flash Image</strong> model. Required: <strong>prompt</strong> (max 5000 chars). Choose <strong>image size</strong> from eleven ratios (1:1, 9:16, 16:9, 3:4, 4:3, 3:2, 2:3, 5:4, 4:5, 21:9, and <strong>auto</strong>) and <strong>PNG or JPEG</strong> output.'
  },
  '/home/nano-banana/edit': {
    title: 'What is Nano Banana Image to Image?',
    body:
      '<strong>Nano Banana Image to Image</strong> on FuseAITools (<code>nano-banana-edit</code>) edits or restyles uploaded images via prompt. Required: <strong>1–10 image URLs</strong> + prompt (max 5000 chars), image size ratio, and PNG/JPEG output. Use it for style transfer, detail polish, or unified looks across a batch.'
  },
  '/home/nano-banana/pro-generate': {
    title: 'What is Nano Banana Pro Generate?',
    body:
      '<strong>Nano Banana Pro</strong> on FuseAITools (<code>nano-banana-pro</code>) generates from <strong>1–10 reference images</strong> plus a prompt (max 5000 chars). Set <strong>resolution</strong> to <strong>1K, 2K, or 4K</strong> and <strong>aspect ratio</strong> from square through <strong>21:9</strong> or <strong>auto</strong>. Credit cost follows the resolution tier shown on Generate.'
  },
  '/home/nano-banana/nano-banana-2': {
    title: 'What is Nano Banana 2?',
    body:
      '<strong>Nano Banana 2</strong> on FuseAITools (<code>nano-banana-2</code>) accepts prompts up to <strong>20,000 characters</strong> with <strong>optional 0–14 image inputs</strong>. Choose <strong>1K, 2K, or 4K</strong> resolution, fifteen aspect ratios (including <strong>auto</strong>), and <strong>JPG or PNG</strong> output. Ideal when you need long creative briefs or multi-reference generation without Pro\'s required image set.'
  }
}

const workflowFaqMap = {
  '/home/nano-banana/generate': [
    {
      question: 'Which aspect ratios does Nano Banana text-to-image support?',
      answer:
        'Eleven options: <strong>1:1, 9:16, 16:9, 3:4, 4:3, 3:2, 2:3, 5:4, 4:5, 21:9, and auto</strong>—covering social squares, vertical stories, widescreen, and model-chosen framing.'
    },
    {
      question: 'How does Nano Banana v1 text-to-image differ from Nano Banana 2?',
      answer:
        '<strong>v1 Text to Image</strong> needs only a prompt (max <strong>5000</strong> chars) with <strong>imageSize</strong> ratios. <strong>Nano Banana 2 (v2)</strong> supports prompts up to <strong>20,000</strong> chars and <strong>optional 0–14</strong> images with <strong>1K/2K/4K</strong> resolution. Use v1 T2I for fast drafts; v2 for long creative briefs.'
    }
  ],
  '/home/nano-banana/edit': [
    {
      question: 'How many images can I upload for Nano Banana image-to-image?',
      answer:
        'Between <strong>1 and 10</strong> images per request (JPEG, PNG, or WebP; max <strong>10MB</strong> each). Write a clear instruction—e.g. “watercolor style” or “brighten and sharpen details”.'
    },
    {
      question: 'When should I use Image to Image instead of Text to Image?',
      answer:
        'Use <strong>Image to Image</strong> when you have existing photos or art to restyle, polish, or unify. <strong>Text to Image</strong> starts from scratch with a prompt only—faster for new concepts and social covers.'
    }
  ],
  '/home/nano-banana/pro-generate': [
    {
      question: 'Does Nano Banana Pro require reference images?',
      answer:
        'Yes—<strong>1 to 10 images</strong> are required per request (JPEG/PNG/WebP; max 30MB each), plus a prompt up to <strong>5000 characters</strong>. Credits vary by <strong>1K, 2K, or 4K</strong> resolution.'
    },
    {
      question: 'What resolution should I pick for Nano Banana Pro?',
      answer:
        'Choose <strong>1K</strong> for faster iteration, <strong>2K</strong> for balanced detail, or <strong>4K</strong> for hero assets and print-ready output. The exact credit cost appears on the Generate button before you submit.'
    }
  ],
  '/home/nano-banana/nano-banana-2': [
    {
      question: 'How is Nano Banana 2 (v2) different from Nano Banana v1?',
      answer:
        '<strong>v2</strong> accepts <strong>optional 0–14 images</strong> and prompts up to <strong>20,000 characters</strong> in one workflow. <strong>v1</strong> splits into three modes—T2I (prompt only), I2I (1–10 required images), and Pro (1–10 required references at 1K/2K/4K) with a <strong>5000</strong>-char cap.'
    },
    {
      question: 'Does Nano Banana 2 support 4K output?',
      answer:
        'Yes—choose <strong>1K, 2K, or 4K</strong> resolution and export as <strong>JPG or PNG</strong>. Fifteen aspect ratios include <strong>auto</strong> for flexible framing.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Nano Banana?',
    answer:
      'No—Nano Banana runs in the cloud on FuseAITools via Google\'s Gemini Flash Image. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How is Nano Banana priced on FuseAITools?',
    answer:
      'Base <strong>Text to Image</strong> and <strong>Image to Image</strong> use flat per-image credits. <strong>Pro</strong> and <strong>Nano Banana 2</strong> vary by <strong>resolution</strong> tier—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
    icon: '⚡',
    title: 'Gemini Flash Speed',
    description:
      'Google\'s <strong>Gemini Flash Image</strong> model—fast text-to-image and image-to-image for rapid iteration and social-ready output.'
  },
  {
    icon: '🔤',
    title: 'Accurate Text Rendering',
    description:
      'Strong in-image text and character consistency—useful for covers, thumbnails, and branded marketing stills.'
  },
  {
    icon: '🖼️',
    title: 'v1 + v2 Line-up',
    description:
      '<strong>v1</strong>: T2I, I2I, and Pro (1K/2K/4K). <strong>v2 — Nano Banana 2</strong>: 20k prompts with optional 0–14 images.'
  },
  {
    icon: '☁️',
    title: 'Cloud on FuseAITools',
    description:
      'No local GPU—<strong>credits shown before generate</strong>; pairs with <strong>Seedream</strong> and <strong>Seedance</strong> for ByteDance image-to-video pipelines.'
  }
]

const scenarioTags = [
  'Social & story covers',
  'Rapid concept drafts',
  'Style transfer & edits',
  '4K production assets',
  'Long-prompt creative briefs'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path.startsWith('/home/nano-banana/'))

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
