<template>
  <div
    id="qwen-v3-section"
    class="qwen-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Qwen v3 and v3 Pro on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Qwen v3 and v3 Pro image models on FuseAITools—5000-char prompts, smart prompt rewriting, negative prompt, 8 aspect ratios, 1K/2K resolution, up to 3 reference images. Billed by resolution with credits."
    />

    <div class="version-badge">🌟 Qwen v3 / v3 Pro · Smart Rewrite · 1K/2K</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🌟 Qwen v3 / v3 Pro on FuseAITools</h2>
      <p class="tool-sub">
        The Qwen <strong>v3</strong> family on <a href="/" class="seo-inline-link">FuseAITools</a> adds
        <strong>smart prompt rewriting (promptExtend)</strong> and a dedicated
        <strong>negative prompt</strong> on top of 5000-character prompts, <strong>8 aspect ratios</strong>
        and <strong>1K / 2K</strong> resolution. Use the standard tier for everyday work or the
        <strong>v3 Pro</strong> tier for maximum fidelity. New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Qwen v3 Core Features</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Qwen v3 Technical Specs</h2>
      <p class="section-lead">Parameters match the FuseAITools Qwen v3 form and API (<code>qwen3-*</code> and <code>qwen3-pro-*</code> models).</p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Qwen v3 workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Input</th>
              <th>Image sizes</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>v3 / v3 Pro Text to Image</strong></td>
              <td>Prompt ≤5000 chars</td>
              <td>1:1, 3:2, 2:3, 4:3, 3:4, 16:9, 9:16, 21:9</td>
              <td>Resolution 1K/2K, promptExtend, negative prompt, PNG/JPEG, seed</td>
            </tr>
            <tr>
              <td><strong>v3 / v3 Pro Image to Image</strong></td>
              <td>1–3 image URLs + prompt ≤5000</td>
              <td>Same 8 sizes (default 16:9)</td>
              <td>Resolution 1K/2K, promptExtend, negative prompt, seed</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Image-to-image accepts <strong>1 to 3</strong> images (jpeg/png/webp/bmp/gif/tiff, each ≤10MB).
        <code>promptExtend</code> is on by default and noticeably improves short prompts. Pricing is matched
        by <strong>resolution</strong> (1K / 2K); the <strong>Pro</strong> tier is a higher-quality, higher-cost variant.
      </p>
    </section>

    <section class="info-section" aria-labelledby="compare-heading">
      <h2 id="compare-heading" class="section-title">📊 Qwen Generations Compared: v1 · v2 · v2.1 · v3 · v3 Pro</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Qwen v3 compared across all model generations">
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
              <td><strong>Prompt rewriting</strong></td>
              <td>—</td>
              <td>—</td>
              <td>enhancePrompt</td>
              <td><strong>promptExtend</strong></td>
              <td><strong>promptExtend</strong></td>
            </tr>
            <tr>
              <td><strong>Negative prompt</strong></td>
              <td>Yes (≤500)</td>
              <td>—</td>
              <td>—</td>
              <td><strong>Yes (≤5000)</strong></td>
              <td><strong>Yes (≤5000)</strong></td>
            </tr>
            <tr>
              <td><strong>Reference images</strong></td>
              <td>1 (I2I / edit)</td>
              <td>1 (edit)</td>
              <td>up to 10 + mask</td>
              <td>up to 3</td>
              <td>up to 3</td>
            </tr>
            <tr>
              <td><strong>Sizes / aspects</strong></td>
              <td>6 presets</td>
              <td>5 / 8 (edit)</td>
              <td>9 (+auto)</td>
              <td><strong>8 (default 16:9)</strong></td>
              <td><strong>8 (default 16:9)</strong></td>
            </tr>
            <tr>
              <td><strong>Resolution / billing</strong></td>
              <td>Per image</td>
              <td>Per image</td>
              <td>1K / 2K</td>
              <td>1K / 2K</td>
              <td><strong>1K / 2K premium</strong></td>
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
              <td><strong>Output formats</strong></td>
              <td>PNG / JPEG</td>
              <td>PNG / JPEG</td>
              <td>PNG / WebP / JPEG</td>
              <td>PNG / JPEG</td>
              <td>PNG / JPEG</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">v3 / v3 Pro are the only tiers pairing <strong>smart prompt rewriting with a 5000-char negative prompt</strong>; go back to v2.1 for transparent backgrounds or masked multi-image edits, and v3 Pro when you want the premium quality tier.</p>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Qwen v3 / v3 Pro)</h2>
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
      <h2 id="workflows-heading" class="section-title">Qwen v3 — Four Workflows</h2>
      <p class="section-lead">Choose the mode that matches your task:</p>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in v3Workflows"
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
      for Qwen v3 / v3 Pro costs per resolution.
    </div>

    <div class="upgrade-tip">
      🧩 Need transparent backgrounds or a local-edit mask with up to 10 references?
      <a href="/home/qwen/v21-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/qwen/v21-text-to-image')">Qwen v2.1 Text to Image</a>
      and
      <a href="/home/qwen/v21-image-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/qwen/v21-image-to-image')">Image to Image</a>
      cover those while still billing by 1K/2K resolution.
    </div>

    <div class="upgrade-tip">
      ⚡ Want the lightest, fastest lane with short prompts?
      <a href="/home/qwen/v2-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/qwen/v2-text-to-image')">Qwen v2</a>
      remains the streamlined option.
    </div>

    <div class="upgrade-tip">
      👑 On a standard v3 page? Step up to the premium tier —
      <a href="/home/qwen/v3-pro-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/qwen/v3-pro-text-to-image')">Qwen v3 Pro Text to Image</a>
      and
      <a href="/home/qwen/v3-pro-image-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/qwen/v3-pro-image-to-image')">Qwen v3 Pro Image to Image</a>
      keep every v3 control but deliver higher-fidelity output at the same 1K/2K resolution billing.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const v3Workflows = [
  { name: 'Qwen v3 Text to Image', title: 'v3 Text to Image', description: 'Prompt-driven with promptExtend + negative prompt, 8 sizes, 1K/2K.', path: '/home/qwen/v3-text-to-image', icon: 'fas fa-star' },
  { name: 'Qwen v3 Image to Image', title: 'v3 Image to Image', description: 'Edit up to 3 images with a prompt, smart rewriting on.', path: '/home/qwen/v3-image-to-image', icon: 'fas fa-layer-group' },
  { name: 'Qwen v3 Pro Text to Image', title: 'v3 Pro Text', description: 'Premium text-to-image tier—same controls, higher fidelity.', path: '/home/qwen/v3-pro-text-to-image', icon: 'fas fa-crown' },
  { name: 'Qwen v3 Pro Image to Image', title: 'v3 Pro Image', description: 'Premium image-to-image tier for up to 3 references.', path: '/home/qwen/v3-pro-image-to-image', icon: 'fas fa-gem' }
]

const workflowIntroMap = {
  '/home/qwen/v3-text-to-image': {
    title: '⭐ Qwen v3 Text to Image',
    lead: 'Generate from <strong>prompts up to 5000 characters</strong> with <strong>smart prompt rewriting (promptExtend)</strong>, a <strong>negative prompt</strong> (≤5000), <strong>8 image sizes</strong> and <strong>1K / 2K</strong> resolution. Output as PNG or JPEG, with an optional seed.'
  },
  '/home/qwen/v3-image-to-image': {
    title: '🖼️ Qwen v3 Image to Image',
    lead: 'Upload <strong>1 to 3 images</strong> (each ≤10MB) plus a 5000-char prompt. <strong>promptExtend</strong> refines short instructions, and a <strong>negative prompt</strong> steers away unwanted elements. Resolution <strong>1K / 2K</strong> sets the price.'
  },
  '/home/qwen/v3-pro-text-to-image': {
    title: '👑 Qwen v3 Pro Text to Image',
    lead: 'The <strong>premium text-to-image tier</strong> with the same rich controls—5000-char prompts, promptExtend, negative prompt, 8 sizes and 1K/2K—tuned for the highest output fidelity.'
  },
  '/home/qwen/v3-pro-image-to-image': {
    title: '💎 Qwen v3 Pro Image to Image',
    lead: 'The <strong>premium image-to-image tier</strong> for up to <strong>3 reference images</strong>, with promptExtend, negative prompt and 1K/2K resolution for top-quality edits.'
  }
}

const workflowDefinitionMap = {
  '/home/qwen/v3-text-to-image': {
    title: 'What is Qwen v3 Text to Image?',
    body: '<strong>Qwen v3 Text to Image</strong> on FuseAITools (<code>qwen3-text-to-image</code>) creates images from a prompt (≤5000) with smart prompt rewriting, a negative prompt, 8 sizes and 1K/2K resolution. Billed by resolution.'
  },
  '/home/qwen/v3-image-to-image': {
    title: 'What is Qwen v3 Image to Image?',
    body: '<strong>Qwen v3 Image to Image</strong> on FuseAITools (<code>qwen3-image-to-image</code>) edits or remixes up to <strong>3 images</strong> with a prompt, promptExtend and negative prompt. Resolution 1K/2K drives pricing.'
  },
  '/home/qwen/v3-pro-text-to-image': {
    title: 'What is Qwen v3 Pro Text to Image?',
    body: '<strong>Qwen v3 Pro Text to Image</strong> on FuseAITools (<code>qwen3-pro-text-to-image</code>) is the premium text-to-image tier—identical controls to v3 with higher output quality and a higher per-resolution cost.'
  },
  '/home/qwen/v3-pro-image-to-image': {
    title: 'What is Qwen v3 Pro Image to Image?',
    body: '<strong>Qwen v3 Pro Image to Image</strong> on FuseAITools (<code>qwen3-pro-image-to-image</code>) is the premium image-to-image tier for up to 3 references, with promptExtend, negative prompt and 1K/2K resolution.'
  }
}

const workflowFaqMap = {
  '/home/qwen/v3-text-to-image': [
    { question: 'What does promptExtend do on Qwen v3?', answer: '<strong>promptExtend</strong> (on by default) rewrites your prompt with the model to enrich short or simple descriptions—usually a clear quality boost for brief prompts.' },
    { question: 'Can I use a negative prompt on Qwen v3?', answer: 'Yes—up to <strong>5000 characters</strong> to list elements you want to avoid, alongside the 8 supported image sizes and 1K/2K resolution.' }
  ],
  '/home/qwen/v3-image-to-image': [
    { question: 'How many images can I upload for Qwen v3 image-to-image?', answer: 'Between <strong>1 and 3</strong> images (jpeg/png/webp/bmp/gif/tiff, each ≤10MB) plus a required prompt.' },
    { question: 'What image sizes does Qwen v3 support?', answer: 'Eight: <strong>1:1, 3:2, 2:3, 4:3, 3:4, 16:9, 9:16 and 21:9</strong>. The default is 16:9.' }
  ],
  '/home/qwen/v3-pro-text-to-image': [
    { question: 'How is Qwen v3 Pro text-to-image different from standard v3?', answer: 'Same controls—5000-char prompt, promptExtend, negative prompt, 8 sizes, 1K/2K—but the <strong>Pro</strong> model is a higher-quality tier at a higher credit cost.' },
    { question: 'What resolution options does Qwen v3 Pro offer?', answer: '<strong>1K</strong> and <strong>2K</strong>; resolution is the billing dimension. 4K is not available.' }
  ],
  '/home/qwen/v3-pro-image-to-image': [
    { question: 'How many references does Qwen v3 Pro image-to-image accept?', answer: 'Up to <strong>3</strong> images (each ≤10MB) with a prompt up to 5000 characters and promptExtend enabled by default.' },
    { question: 'When should I choose v3 Pro over v3 for image editing?', answer: 'Pick <strong>Pro</strong> when you need the finest detail and consistency; standard <strong>v3</strong> is more economical for routine edits.' }
  ]
}

const commonFaq = [
  { question: 'Do I need a local GPU for Qwen v3?', answer: 'No—Qwen v3 and v3 Pro run in the cloud on FuseAITools. Credits are charged per successful generation.' },
  { question: 'How is Qwen v3 priced on FuseAITools?', answer: 'Pricing is matched by <strong>resolution</strong> (1K or 2K), with Pro costing more per tier—the exact credits appear on the Generate button. New users get <strong>20 free credits</strong>—see <a href="/pricing" class="seo-pricing-link">pricing</a>.' }
]

const workflowIntro = computed(() => workflowIntroMap[route.path.replace(/\/$/, '')] || null)
const workflowDefinition = computed(() => workflowDefinitionMap[route.path.replace(/\/$/, '')] || null)
const faqItems = computed(() => {
  const path = route.path.replace(/\/$/, '')
  return [...(workflowFaqMap[path] || []), ...commonFaq]
})
useToolSeoFaqSchema(faqItems)

const coreFeatures = [
  { icon: '🧠', title: 'Smart Prompt Rewriting', description: '<strong>promptExtend</strong> enriches short prompts automatically—on by default.' },
  { icon: '🚫', title: 'Negative Prompt', description: 'A dedicated <strong>≤5000-char</strong> negative prompt to exclude unwanted elements.' },
  { icon: '🎚️', title: '1K / 2K Resolution', description: '<strong>Resolution is the billing dimension</strong>—no 4K on this family.' },
  { icon: '📐', title: '8 Image Sizes', description: 'From 1:1 to widescreen 21:9, defaulting to 16:9.' },
  { icon: '👑', title: 'v3 Pro Tier', description: 'A premium, higher-fidelity variant with the same rich controls.' },
  { icon: '🎞️', title: 'PNG / JPEG Output', description: 'Two output formats with an optional reproducible seed.' }
]

const scenarioTags = [
  'High-fidelity hero art',
  'Prompt-guided refinement',
  'Multi-reference edits',
  'Cinematic 21:9 layouts',
  'Brand-consistent assets'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path.includes('/home/qwen/v3-'))

const openFaqIndex = ref(0)
function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
