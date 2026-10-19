<template>
  <div
    id="qwen-v21-section"
    class="qwen-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Qwen v2.1 on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Qwen v2.1 text-to-image and image-to-image on FuseAITools—5000-char prompts, 9 aspect ratios, 1K/2K resolution, transparent backgrounds, multi-image references and local-edit masks. Billed by resolution with credits."
    />

    <div class="version-badge">✨ Qwen v2.1 · 1K/2K · Text & Image to Image</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">✨ Qwen v2.1 on FuseAITools</h2>
      <p class="tool-sub">
        Qwen v2.1 on <a href="/" class="seo-inline-link">FuseAITools</a> is a
        <strong>resolution-billed image model</strong> with long <strong>5000-character prompts</strong>,
        <strong>9 aspect ratios</strong>, real <strong>transparent backgrounds</strong> and
        <strong>PNG / WebP / JPEG</strong> output. Generate from text, or drive edits with up to
        <strong>10 reference images</strong> and an optional black/white <strong>local-edit mask</strong>.
        New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Qwen v2.1 Core Features</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Qwen v2.1 Technical Specs</h2>
      <p class="section-lead">Parameters match the FuseAITools Qwen v2.1 form and API (<code>qwen2-1-*</code> models).</p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Qwen v2.1 workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Input</th>
              <th>Aspect ratios</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>v2.1 Text to Image</strong></td>
              <td>Prompt ≤5000 chars</td>
              <td>1:1, 4:3, 3:4, 3:2, 2:3, 16:9, 9:16, 21:9, 9:21</td>
              <td>Resolution 1K/2K, background, output format, enhance, seed</td>
            </tr>
            <tr>
              <td><strong>v2.1 Image to Image</strong></td>
              <td>1–10 image URLs + prompt ≤5000, optional mask</td>
              <td>auto + the 9 above (ignored in local-edit)</td>
              <td>Resolution 1K/2K, mask, background, output format, seed</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Images: single ≤30MB and ≤25MP, direct http(s) URLs. <code>transparent</code> background cannot be
        combined with JPEG output, and a mask requires exactly one image. Pricing is matched by
        <strong>resolution</strong> (1K / 2K)—4K is not supported.
      </p>
    </section>

    <section class="info-section" aria-labelledby="compare-heading">
      <h2 id="compare-heading" class="section-title">📊 Qwen Generations Compared: v1 · v2 · v2.1 · v3 · v3 Pro</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Qwen v2.1 compared across all model generations">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>v1 Classic</th>
              <th>v2</th>
              <th>v2.1</th>
              <th>v3</th>
              <th>v3 Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Prompt limit</strong></td>
              <td>5000</td>
              <td>800</td>
              <td><strong>5000</strong></td>
              <td>5000</td>
              <td>5000</td>
            </tr>
            <tr>
              <td><strong>Aspect / sizes</strong></td>
              <td>6 presets</td>
              <td>5 / 8 (edit)</td>
              <td><strong>9 (+auto)</strong></td>
              <td>8</td>
              <td>8</td>
            </tr>
            <tr>
              <td><strong>Resolution / billing</strong></td>
              <td>Per image</td>
              <td>Per image</td>
              <td><strong>1K / 2K</strong></td>
              <td>1K / 2K</td>
              <td>1K / 2K premium</td>
            </tr>
            <tr>
              <td><strong>Reference images</strong></td>
              <td>1 (I2I / edit)</td>
              <td>1 (edit)</td>
              <td><strong>up to 10 + mask</strong></td>
              <td>up to 3</td>
              <td>up to 3</td>
            </tr>
            <tr>
              <td><strong>Transparent bg</strong></td>
              <td>No</td>
              <td>No</td>
              <td><strong>Yes</strong></td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr>
              <td><strong>Signature controls</strong></td>
              <td>Steps / guidance / acceleration</td>
              <td>Minimal controls</td>
              <td><strong>enhancePrompt + format</strong></td>
              <td>promptExtend + negative</td>
              <td>promptExtend + negative, premium</td>
            </tr>
            <tr>
              <td><strong>Output formats</strong></td>
              <td>PNG / JPEG</td>
              <td>PNG / JPEG</td>
              <td><strong>PNG / WebP / JPEG</strong></td>
              <td>PNG / JPEG</td>
              <td>PNG / JPEG</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">v2.1 is the only tier combining <strong>long prompts, transparent backgrounds, multi-image references and masked local edits</strong>; pick v3 / v3 Pro when smart rewriting and negative prompts matter more.</p>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Qwen v2.1)</h2>
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
      <h2 id="workflows-heading" class="section-title">Qwen v2.1 — Two Workflows</h2>
      <p class="section-lead">Choose the mode that matches your task:</p>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in v21Workflows"
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
      for Qwen v2.1 costs per resolution.
    </div>

    <div class="upgrade-tip">
      🌟 Want smart prompt rewriting and a dedicated negative prompt?
      <a href="/home/qwen/v3-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/qwen/v3-text-to-image')">Qwen v3 Text to Image</a>
      and
      <a href="/home/qwen/v3-image-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/qwen/v3-image-to-image')">Image to Image</a>
      add promptExtend + negative prompt, or step up to the
      <a href="/home/qwen/v3-pro-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/qwen/v3-pro-text-to-image')">v3 Pro</a>
      tier.
    </div>

    <div class="upgrade-tip">
      🖼️ Comparing earlier generations?
      <a href="/home/qwen/v2-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/qwen/v2-text-to-image')">Qwen v2</a>
      stays the lightest fast lane with short 800-char prompts.
    </div>

    <div class="upgrade-tip">
      👑 Want the top of the Qwen lineup? Upgrade to
      <a href="/home/qwen/v3-pro-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/qwen/v3-pro-text-to-image')">Qwen v3 Pro Text to Image</a>
      or
      <a href="/home/qwen/v3-pro-image-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/qwen/v3-pro-image-to-image')">v3 Pro Image to Image</a>
      —the premium tier adds smart prompt rewriting and a negative prompt at the same 1K/2K resolution billing.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const v21Workflows = [
  {
    name: 'Qwen v2.1 Text to Image',
    title: 'v2.1 Text to Image',
    description: 'Prompt-driven creation—5000 chars, 9 aspect ratios, 1K/2K, transparent background, PNG/WebP/JPEG.',
    path: '/home/qwen/v21-text-to-image',
    icon: 'fas fa-font'
  },
  {
    name: 'Qwen v2.1 Image to Image',
    title: 'v2.1 Image to Image',
    description: 'Drive edits with 1–10 reference images plus an optional local-edit mask.',
    path: '/home/qwen/v21-image-to-image',
    icon: 'fas fa-photo-film'
  }
]

const workflowIntroMap = {
  '/home/qwen/v21-text-to-image': {
    title: '📝 Qwen v2.1 Text to Image',
    lead: 'Generate from <strong>prompts up to 5000 characters</strong> across <strong>9 aspect ratios</strong>. Choose <strong>1K or 2K</strong> resolution, an <strong>opaque or transparent</strong> background, and <strong>PNG / WebP / JPEG</strong> output. Toggle <strong>enhancePrompt</strong> and set an optional seed.'
  },
  '/home/qwen/v21-image-to-image': {
    title: '🖼️ Qwen v2.1 Image to Image',
    lead: 'Upload <strong>1 to 10 reference images</strong> (order is what your prompt refers to) plus a 5000-char prompt. Add an optional black/white <strong>mask</strong> for local edits—white repaints, black keeps. Resolution <strong>1K / 2K</strong> drives the price.'
  }
}

const workflowDefinitionMap = {
  '/home/qwen/v21-text-to-image': {
    title: 'What is Qwen v2.1 Text to Image?',
    body: '<strong>Qwen v2.1 Text to Image</strong> on FuseAITools (<code>qwen2-1-text-to-image</code>) turns a prompt (≤5000) into an image with 9 aspect ratios, 1K/2K resolution, real transparent backgrounds, and PNG/WebP/JPEG output. Billed by resolution.'
  },
  '/home/qwen/v21-image-to-image': {
    title: 'What is Qwen v2.1 Image to Image?',
    body: '<strong>Qwen v2.1 Image to Image</strong> on FuseAITools (<code>qwen2-1-image-to-image</code>) edits or remixes up to <strong>10 reference images</strong> with a prompt, and supports an optional <strong>mask</strong> for local repaints. Resolution 1K/2K is the billing dimension.'
  }
}

const workflowFaqMap = {
  '/home/qwen/v21-text-to-image': [
    { question: 'How many aspect ratios does Qwen v2.1 text-to-image support?', answer: 'Nine: <strong>1:1, 4:3, 3:4, 3:2, 2:3, 16:9, 9:16, 21:9 and 9:21</strong>. The default is 1:1.' },
    { question: 'Can Qwen v2.1 produce a transparent background?', answer: 'Yes—choose <strong>transparent</strong> for a real alpha channel. It cannot be combined with JPEG output; use PNG or WebP.' }
  ],
  '/home/qwen/v21-image-to-image': [
    { question: 'How many images can I upload for Qwen v2.1 image-to-image?', answer: 'Between <strong>1 and 10</strong> http(s) image URLs (each ≤30MB, ≤25MP). Their order matches the "first/second image" wording in your prompt.' },
    { question: 'How does the local-edit mask work?', answer: 'Upload a black/white <strong>mask</strong> with <strong>exactly one</strong> image—white areas are repainted, black areas are preserved. In mask mode the aspect ratio and enhance options are ignored.' }
  ]
}

const commonFaq = [
  { question: 'Do I need a local GPU for Qwen v2.1?', answer: 'No—Qwen v2.1 runs in the cloud on FuseAITools. Credits are charged per successful generation.' },
  { question: 'How is Qwen v2.1 priced on FuseAITools?', answer: 'Pricing is matched by <strong>resolution</strong> (1K or 2K)—the exact credits appear on the Generate button. New users get <strong>20 free credits</strong>—see <a href="/pricing" class="seo-pricing-link">pricing</a>.' }
]

const workflowIntro = computed(() => workflowIntroMap[route.path.replace(/\/$/, '')] || null)
const workflowDefinition = computed(() => workflowDefinitionMap[route.path.replace(/\/$/, '')] || null)
const faqItems = computed(() => {
  const path = route.path.replace(/\/$/, '')
  return [...(workflowFaqMap[path] || []), ...commonFaq]
})
useToolSeoFaqSchema(faqItems)

const coreFeatures = [
  { icon: '📝', title: '5000-Char Prompts', description: 'Long, descriptive prompts—far beyond the 800-char limit of v2.' },
  { icon: '🎚️', title: '1K / 2K Resolution', description: 'Pick the output tier; <strong>resolution is the billing dimension</strong> (no 4K).' },
  { icon: '🧩', title: 'Transparent Background', description: 'A real alpha channel for compositing—pair with PNG or WebP.' },
  { icon: '🖼️', title: 'Up to 10 References', description: 'Feed 1–10 images in order to guide remixes and edits.' },
  { icon: '⬛', title: 'Local-Edit Mask', description: 'White/BLACK mask repaints only the areas you mark, keeping the rest intact.' },
  { icon: '🎞️', title: 'PNG / WebP / JPEG', description: 'Three output formats; PNG and WebP carry alpha.' }
]

const scenarioTags = [
  'Logo & sticker cutouts',
  'Multi-reference remixing',
  'Local inpainting edits',
  'Widescreen 21:9 art',
  'Product visual variants'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path.includes('/home/qwen/v21-'))

const openFaqIndex = ref(0)
function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
