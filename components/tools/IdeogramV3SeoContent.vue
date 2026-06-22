<template>
  <div
    id="ideogram-v3-section"
    class="ideogram-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Ideogram V3 Image on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Ideogram V3 text-to-image, edit, remix, and reframe on FuseAITools—TURBO/BALANCED/QUALITY speed, MagicPrompt, and six aspect ratios."
    />

    <div class="version-badge">🎨 Ideogram V3 · T2I · Edit · Remix · Reframe</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎨 Ideogram V3 on FuseAITools</h2>
      <p class="tool-sub">
        <strong>Ideogram V3</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> covers general image creation—
        text-to-image, mask edit, remix, and reframe—with shared controls for
        <strong>TURBO / BALANCED / QUALITY</strong> rendering speed and style presets.
        Need <strong>identity-locked characters</strong> across scenes? Use the separate
        <a href="/home/ideogram/character" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/ideogram/character')">Character</a>
        line. Credits scale by speed tier; new users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Ideogram V3 Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Ideogram V3 Workflows Compared</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Ideogram V3 workflow comparison">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>T2I</th>
              <th>Edit</th>
              <th>Remix</th>
              <th>Reframe</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Input</strong></td>
              <td>Prompt</td>
              <td>Image + mask + prompt</td>
              <td>Image + prompt</td>
              <td>Image (+ size)</td>
            </tr>
            <tr>
              <td><strong>modelKey</strong></td>
              <td><code>ideogram-v3-text-to-image</code></td>
              <td><code>ideogram-v3-edit</code></td>
              <td><code>ideogram-v3-remix</code></td>
              <td><code>ideogram-v3-reframe</code></td>
            </tr>
            <tr>
              <td><strong>Prompt</strong></td>
              <td>Required (≤5000)</td>
              <td>Required</td>
              <td>Required</td>
              <td>Not used</td>
            </tr>
            <tr>
              <td><strong>Unique controls</strong></td>
              <td>MagicPrompt, negative prompt</td>
              <td>Mask inpaint</td>
              <td>Strength 0.01–1</td>
              <td>Aspect reframe, 1–4 outputs</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>New concepts, posters with text</td>
              <td>Local edits, inpainting</td>
              <td>Creative variations</td>
              <td>Resize for social formats</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Ideogram V3)</h2>
      <div class="faq-list">
        <div
          v-for="(faq, index) in faqItems"
          :key="index"
          class="faq-item"
          :class="{ open: openFaqIndex === index }"
        >
          <button type="button" class="faq-question" :aria-expanded="openFaqIndex === index" @click="toggleFaq(index)">
            <span>{{ faq.question }}</span>
            <span class="faq-toggle" aria-hidden="true">{{ openFaqIndex === index ? '➖' : '➕' }}</span>
          </button>
          <div v-show="openFaqIndex === index" class="faq-answer"><div v-html="faq.answer" /></div>
        </div>
      </div>
    </section>

    <section class="info-section" aria-labelledby="tech-heading">
      <h2 id="tech-heading" class="section-title">⚙️ Ideogram V3 Technical Specs</h2>
      <p class="section-lead">Shared V3 controls: rendering speed, style (AUTO/GENERAL/REALISTIC/DESIGN), image size presets, optional seed.</p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Ideogram V3 capabilities">
          <thead>
            <tr><th>Workflow</th><th>Required</th><th>Key controls</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>V3 Text to Image</strong></td>
              <td>Prompt (≤5000)</td>
              <td>Speed; style; MagicPrompt; image size; negative prompt; seed</td>
            </tr>
            <tr>
              <td><strong>V3 Edit</strong></td>
              <td>Image + mask + prompt</td>
              <td>Speed; MagicPrompt; seed</td>
            </tr>
            <tr>
              <td><strong>V3 Remix</strong></td>
              <td>Image + prompt</td>
              <td>Strength; style; size; num_images 1–4; negative prompt</td>
            </tr>
            <tr>
              <td><strong>V3 Reframe</strong></td>
              <td>Image URL</td>
              <td>Target image_size; style; num_images 1–4; seed</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">Pricing: RULE credits by <strong>rendering_speed</strong> (TURBO / BALANCED / QUALITY)—shown on Generate.</p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Ideogram V3 — Four Workflows</h2>
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

    <section class="info-section" aria-labelledby="version-compare-heading">
      <h2 id="version-compare-heading" class="section-title">📊 Ideogram V3 vs Character</h2>
      <p class="section-lead">
        <strong>V3</strong> is for general generation and editing; <strong>Character</strong> locks identity from reference images—complementary product lines on the same brand.
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Ideogram V3 vs Character">
          <thead>
            <tr><th>Dimension</th><th>V3</th><th>Character</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Positioning</strong></td>
              <td>General T2I, edit, remix, reframe</td>
              <td>Identity-consistent character scenes</td>
            </tr>
            <tr>
              <td><strong>Workflows</strong></td>
              <td>T2I, Edit, Remix, Reframe</td>
              <td>Character, Character Edit, Character Remix</td>
            </tr>
            <tr>
              <td><strong>Reference images</strong></td>
              <td>Source image for edit/remix/reframe</td>
              <td><strong>Character reference</strong> (required)</td>
            </tr>
            <tr>
              <td><strong>Style presets</strong></td>
              <td>AUTO, GENERAL, REALISTIC, DESIGN</td>
              <td>AUTO, REALISTIC, FICTION</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>Posters, inpainting, format reframes</td>
              <td>Mascots, game chars, serial content</td>
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

    <div class="upgrade-tip">
      👤 Need the same face across scenes?
      <a href="/home/ideogram/character" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/ideogram/character')">Try Ideogram Character →</a>
      for reference-driven identity, or
      <a href="/home/ideogram/character-edit" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/ideogram/character-edit')">Character Edit</a>
      /
      <a href="/home/ideogram/character-remix" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/ideogram/character-remix')">Character Remix</a>
      for masked or strength-controlled variations.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const imageWorkflows = [
  { name: 'Ideogram V3 Text to Image', title: 'V3 T2I', description: 'Prompt-only generation—speed, style, MagicPrompt.', path: '/home/ideogram/v3-text-to-image', icon: 'fas fa-keyboard' },
  { name: 'Ideogram V3 Edit', title: 'V3 Edit', description: 'Image + mask inpainting with prompt.', path: '/home/ideogram/v3-edit', icon: 'fas fa-paint-brush' },
  { name: 'Ideogram V3 Remix', title: 'V3 Remix', description: 'Remix with strength, size, 1–4 outputs.', path: '/home/ideogram/v3-remix', icon: 'fas fa-sync-alt' },
  { name: 'Ideogram V3 Reframe', title: 'V3 Reframe', description: 'New aspect ratios from one image.', path: '/home/ideogram/v3-reframe', icon: 'fas fa-crop-alt' }
]

const workflowIntroMap = {
  '/home/ideogram/v3-text-to-image': {
    title: '📝 Ideogram V3 Text to Image',
    lead: 'Generate from a <strong>prompt</strong> (≤5000 chars). Pick <strong>TURBO / BALANCED / QUALITY</strong>, style (AUTO/GENERAL/REALISTIC/DESIGN), optional <strong>MagicPrompt</strong>, image size presets, negative prompt, and seed.'
  },
  '/home/ideogram/v3-edit': {
    title: '🖌️ Ideogram V3 Edit',
    lead: 'Upload <strong>image + mask</strong> (same dimensions) and a <strong>prompt</strong> to inpaint or modify the masked region. Speed, MagicPrompt, and seed supported.'
  },
  '/home/ideogram/v3-remix': {
    title: '🔀 Ideogram V3 Remix',
    lead: 'Provide a <strong>source image + prompt</strong>. Tune <strong>strength</strong> (0.01–1), style, image size, <strong>1–4</strong> outputs, negative prompt, and seed.'
  },
  '/home/ideogram/v3-reframe': {
    title: '📐 Ideogram V3 Reframe',
    lead: 'Reframe one <strong>image</strong> into square, portrait, or landscape presets—no prompt required. Optional style, speed, <strong>1–4</strong> outputs, and seed.'
  }
}

const workflowDefinitionMap = {
  '/home/ideogram/v3-text-to-image': {
    title: 'What is Ideogram V3 Text to Image?',
    body: '<strong>Ideogram V3 Text to Image</strong> (<code>ideogram-v3-text-to-image</code>) on FuseAITools generates images from text. Required: prompt (max 5000). RULE pricing by <code>rendering_speed</code> (TURBO/BALANCED/QUALITY).'
  },
  '/home/ideogram/v3-edit': {
    title: 'What is Ideogram V3 Edit?',
    body: '<strong>Ideogram V3 Edit</strong> (<code>ideogram-v3-edit</code>) inpaints a masked region on an uploaded image using a prompt. Required: image URL, mask URL (matching size), and prompt.'
  },
  '/home/ideogram/v3-remix': {
    title: 'What is Ideogram V3 Remix?',
    body: '<strong>Ideogram V3 Remix</strong> (<code>ideogram-v3-remix</code>) varies an input image with a new prompt and adjustable remix strength. Supports multi-image output (1–4) and negative prompts.'
  },
  '/home/ideogram/v3-reframe': {
    title: 'What is Ideogram V3 Reframe?',
    body: '<strong>Ideogram V3 Reframe</strong> (<code>ideogram-v3-reframe</code>) changes aspect ratio and composition of an existing image—square, square_hd, portrait, and landscape presets.'
  }
}

const workflowFaqMap = {
  '/home/ideogram/v3-text-to-image': [
    { question: 'Which rendering speeds does Ideogram V3 T2I support?', answer: '<strong>TURBO</strong>, <strong>BALANCED</strong>, and <strong>QUALITY</strong>—credits follow the speed tier on Generate.' },
    { question: 'Can Ideogram V3 render legible text?', answer: 'Ideogram is known for strong <strong>text-in-image</strong> results—use clear prompt wording and negative prompts to reduce artifacts.' }
  ],
  '/home/ideogram/v3-edit': [
    { question: 'What mask format does V3 Edit need?', answer: 'Upload a mask matching the <strong>same dimensions</strong> as the source image (JPG/PNG/WebP, max 10MB).' },
    { question: 'Is a prompt required for V3 Edit?', answer: 'Yes—describe what should appear in the masked region (max 5000 characters).' }
  ],
  '/home/ideogram/v3-remix': [
    { question: 'What does strength control on V3 Remix?', answer: '<strong>Strength</strong> from 0.01 to 1 balances fidelity to the source image vs. prompt-driven change.' },
    { question: 'How many images can V3 Remix output?', answer: 'Select <strong>1–4</strong> images per generation.' }
  ],
  '/home/ideogram/v3-reframe': [
    { question: 'Does V3 Reframe need a prompt?', answer: 'No—only a <strong>source image</strong> and target <strong>image_size</strong> preset.' },
    { question: 'Which aspect ratios can V3 Reframe target?', answer: 'Square, square_hd, portrait_4_3, portrait_16_9, landscape_4_3, and landscape_16_9.' }
  ]
}

const commonFaq = [
  { question: 'Do I need a local GPU for Ideogram V3?', answer: 'No—Ideogram V3 runs in the cloud on FuseAITools. Pick a rendering speed; credits appear on Generate.' },
  { question: 'How is Ideogram V3 priced on FuseAITools?', answer: 'RULE credits by <strong>speed</strong> (TURBO/BALANCED/QUALITY). See <a href="/pricing" class="seo-pricing-link">pricing</a>. New users get <strong>20 free credits</strong> on sign-up.' }
]

const normalizedPath = computed(() => route.path.replace(/\/$/, ''))
const workflowIntro = computed(() => workflowIntroMap[normalizedPath.value] || null)
const workflowDefinition = computed(() => workflowDefinitionMap[normalizedPath.value] || null)
const faqItems = computed(() => [...(workflowFaqMap[normalizedPath.value] || []), ...commonFaq])
useToolSeoFaqSchema(faqItems)

const coreFeatures = [
  { icon: '✍️', title: 'Legible Text & Design', description: 'V3 excels at <strong>posters, logos, and layout</strong> with readable typography.' },
  { icon: '⚡', title: 'Three Speed Tiers', description: 'TURBO for drafts, BALANCED default, QUALITY for finals—credits scale accordingly.' },
  { icon: '🔀', title: 'Edit to Reframe', description: 'Four workflows from <strong>new prompts</strong> to mask edits, remix strength, and aspect reframes.' },
  { icon: '☁️', title: 'Cloud on FuseAITools', description: 'All V3 modes share one form—speed-based credits before generate.' }
]

const scenarioTags = ['Social creatives', 'Poster design', 'Inpainting fixes', 'Platform reframes']

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path.startsWith('/home/ideogram/v3-'))

const openFaqIndex = ref(0)
function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
