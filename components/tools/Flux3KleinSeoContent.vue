<template>
  <div
    id="flux-3-klein-section"
    class="flux-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Flux 3 Klein Image on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Flux 3 Klein text-to-image and image editing on FuseAITools—1K/2K/4K resolution, nine aspect ratios plus auto on edit, and 1–4 images per run. Credits scale by resolution and image count."
    />

    <div class="version-badge">⚡ Flux 3 Klein · T2I & Edit · 1K/2K/4K · 1–4 images</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">⚡ Flux 3 Klein on FuseAITools</h2>
      <p class="tool-sub">
        <strong>Flux 3 Klein</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> is Black Forest Labs'
        high-resolution image line—two workflows: <strong>Text to Image</strong> for prompt-only generation and
        <strong>Edit Image</strong> for multi-reference editing with <strong>1–10</strong> input images. Prompts run up
        to <strong>5000 characters</strong>, output reaches <strong>4K</strong>, and each run produces
        <strong>1–4 images</strong>. Credits scale by <strong>resolution (1K/2K/4K)</strong> and
        <strong>image count</strong>. New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Flux 3 Klein Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">{{ workflowCompareTitle }}</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" :aria-label="workflowCompareTitle">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>{{ isTextToImageRoute ? 'Text to Image' : 'Edit Image' }}</th>
              <th>{{ isTextToImageRoute ? 'Edit Image' : 'Text to Image' }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Input</strong></td>
              <td>{{ isTextToImageRoute ? 'Prompt (1–5000 chars)' : '1–10 images + prompt' }}</td>
              <td>{{ isTextToImageRoute ? '1–10 images + prompt' : 'Prompt (1–5000 chars)' }}</td>
            </tr>
            <tr>
              <td><strong>modelKey</strong></td>
              <td><code>{{ currentModelKey }}</code></td>
              <td><code>{{ otherModelKey }}</code></td>
            </tr>
            <tr>
              <td><strong>Resolution</strong></td>
              <td colspan="2"><strong>1K</strong>, <strong>2K</strong>, or <strong>4K</strong></td>
            </tr>
            <tr>
              <td><strong>Images per run</strong></td>
              <td colspan="2"><strong>1–4</strong>—credits multiply by count</td>
            </tr>
            <tr>
              <td><strong>Aspect ratios</strong></td>
              <td>{{ isTextToImageRoute ? '9 fixed ratios' : '9 fixed ratios + auto' }}</td>
              <td>{{ isTextToImageRoute ? '9 fixed ratios + auto' : '9 fixed ratios' }}</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>{{ isTextToImageRoute ? '4K prompt-only finals' : 'Multi-reference edits and restyles' }}</td>
              <td>{{ isTextToImageRoute ? 'Reference-driven editing' : 'Prompt-only concept drafts' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Flux 3 Klein)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Flux 3 Klein Technical Specs</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Flux 3 Klein workflow capabilities">
          <thead>
            <tr><th>Workflow</th><th>modelKey</th><th>Required</th><th>Key controls</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Flux 3 Klein T2I</strong></td>
              <td><code>flux-3-klein-text-to-image</code></td>
              <td>Prompt (1–5000)</td>
              <td>1K/2K/4K; 9 ratios; 1–4 images</td>
            </tr>
            <tr>
              <td><strong>Flux 3 Klein Edit</strong></td>
              <td><code>flux-3-klein-edit-image</code></td>
              <td>1–10 images + prompt</td>
              <td>1K/2K/4K; 9 ratios + auto; 1–4 images</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">Both workflows support <strong>output format</strong> (PNG, JPEG, WebP), an optional
        <strong>seed</strong> (0–2147483647) for reproducibility, and <strong>prompt enhancement</strong> (on by default).
        Edit-mode uploads accept JPG/PNG/WebP up to <strong>30MB</strong> each. Credits depend on
        <strong>resolution</strong> and <strong>image count</strong>—shown on Generate before submission.</p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Flux 3 Klein — Two Workflows</h2>
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
      🔁 Already using Flux? Compare with
      <a :href="flux2Path" class="seo-inline-link" @click.prevent="navigateToToolTop(flux2Path)">Flux 2 {{ isTextToImageRoute ? 'Text to Image' : 'Image to Image' }} →</a>
      for fast 1K/2K drafts on the same Flux family.
    </div>

    <div class="upgrade-tip">
      🎬 Turn Flux 3 Klein stills into video with
      <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedance/v1-lite-image-to-video')">Seedance Image to Video →</a>
      or browse multimodal
      <a href="/home/seedance/v2" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedance/v2')">Seedance 2</a>
      for reference-driven clips.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const imageWorkflows = [
  {
    name: 'Flux 3 Klein Text to Image',
    title: 'Flux 3 Klein T2I',
    description: 'Prompt-only generation up to 4K—9 ratios, 1–4 images per run.',
    path: '/home/flux-kontext/flux-3-klein-text-to-image',
    icon: 'fas fa-bolt'
  },
  {
    name: 'Flux 3 Klein Edit Image',
    title: 'Flux 3 Klein Edit',
    description: 'Edit from 1–10 reference images + prompt—1K/2K/4K, 1–4 outputs.',
    path: '/home/flux-kontext/flux-3-klein-edit-image',
    icon: 'fas fa-pen'
  }
]

const workflowIntroMap = {
  '/home/flux-kontext/flux-3-klein-text-to-image': {
    title: '⚡ Flux 3 Klein Text to Image',
    lead: 'Prompt-only generation—<strong>1–5000 characters</strong>, aspect <strong>1:1 / 4:3 / 3:4 / 3:2 / 2:3 / 16:9 / 9:16 / 21:9 / 9:21</strong>, resolution <strong>1K, 2K or 4K</strong>, and <strong>1–4 images</strong> per run. Credits = per-image price at your resolution × image count.'
  },
  '/home/flux-kontext/flux-3-klein-edit-image': {
    title: '🖼️ Flux 3 Klein Edit Image',
    lead: 'Upload <strong>1–10</strong> reference images (max 30MB each) + prompt (1–5000 chars). Pick <strong>1K/2K/4K</strong>, an aspect ratio—including <strong>auto</strong> that follows the first image—and <strong>1–4 outputs</strong>. Credits scale with resolution and image count.'
  }
}

const workflowDefinitionMap = {
  '/home/flux-kontext/flux-3-klein-text-to-image': {
    title: 'What is Flux 3 Klein Text to Image?',
    body: '<strong>Flux 3 Klein Text to Image</strong> on FuseAITools (<code>flux-3-klein-text-to-image</code>) generates images from a prompt (1–5000 chars). Set resolution <strong>1K/2K/4K</strong>, an aspect ratio (nine options), and <strong>1–4 images</strong>. RULE pricing by resolution tier, multiplied by image count.'
  },
  '/home/flux-kontext/flux-3-klein-edit-image': {
    title: 'What is Flux 3 Klein Edit Image?',
    body: '<strong>Flux 3 Klein Edit Image</strong> (<code>flux-3-klein-edit-image</code>) edits or restyles from <strong>1–10</strong> reference images plus a prompt (1–5000 chars). Resolution 1K/2K/4K; nine aspect ratios plus <strong>auto</strong>; 1–4 outputs. Credits scale by resolution and image count.'
  }
}

const workflowFaqMap = {
  '/home/flux-kontext/flux-3-klein-text-to-image': [
    {
      question: 'What resolutions does Flux 3 Klein text-to-image support?',
      answer: '<strong>1K</strong>, <strong>2K</strong>, and <strong>4K</strong>—credit cost follows the resolution tier shown on Generate, multiplied by the number of images (1–4).'
    },
    {
      question: 'How many images can I generate per run?',
      answer: 'Choose <strong>1–4</strong> images per run. Total credits = single-image price at your resolution × image count.'
    }
  ],
  '/home/flux-kontext/flux-3-klein-edit-image': [
    {
      question: 'How many reference images can Flux 3 Klein edit accept?',
      answer: 'Upload <strong>1–10</strong> images (JPG/PNG/WebP, max 30MB each) plus a prompt (1–5000 chars).'
    },
    {
      question: 'Does Flux 3 Klein edit support auto aspect ratio?',
      answer: 'Yes—choose <strong>auto</strong> to follow the first input image, or pick one of nine fixed ratios. Resolution <strong>1K/2K/4K</strong> and image count (1–4) both affect credits.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Flux 3 Klein?',
    answer: 'No—Flux 3 Klein runs in the cloud on FuseAITools. Pick resolution and image count; credits appear on the Generate button.'
  },
  {
    question: 'How is Flux 3 Klein priced on FuseAITools?',
    answer: 'RULE credits by <strong>resolution (1K/2K/4K)</strong> per image, then multiplied by the <strong>1–4</strong> images you request. See <a href="/pricing" class="seo-pricing-link">pricing</a>. New users get <strong>20 free credits</strong> on sign-up.'
  }
]

const normalizedPath = computed(() => route.path.replace(/\/$/, ''))
const workflowIntro = computed(() => workflowIntroMap[normalizedPath.value] || null)
const workflowDefinition = computed(() => workflowDefinitionMap[normalizedPath.value] || null)
const faqItems = computed(() => [...(workflowFaqMap[normalizedPath.value] || []), ...commonFaq])
useToolSeoFaqSchema(faqItems)

const isTextToImageRoute = computed(() => normalizedPath.value.includes('text-to-image'))

const workflowCompareTitle = computed(() => '📊 Flux 3 Klein T2I vs Edit Image')

const currentModelKey = computed(() =>
  isTextToImageRoute.value ? 'flux-3-klein-text-to-image' : 'flux-3-klein-edit-image'
)
const otherModelKey = computed(() =>
  isTextToImageRoute.value ? 'flux-3-klein-edit-image' : 'flux-3-klein-text-to-image'
)

const flux2Path = computed(() =>
  isTextToImageRoute.value
    ? '/home/flux-kontext/flux-2-text-to-image'
    : '/home/flux-kontext/flux-2-image-to-image'
)

const coreFeatures = [
  { icon: '📐', title: 'Up to 4K Output', description: 'Pick <strong>1K / 2K / 4K</strong> per run—credits follow the resolution tier on Generate.' },
  { icon: '🗂️', title: 'Batch 1–4 Images', description: 'Request <strong>1–4</strong> images at once—total credits scale by image count.' },
  { icon: '🖼️', title: 'Multi-Reference Edit', description: 'Edit from up to <strong>10</strong> input images with an optional <strong>auto</strong> aspect ratio.' },
  { icon: '🎲', title: 'Seed & Enhancement', description: 'Set a fixed <strong>seed</strong> for reproducibility and toggle <strong>prompt enhancement</strong>.' }
]

const scenarioTags = ['4K print finals', 'Batch concept sets', 'Multi-ref restyle', 'Seeded reproducible edits']

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) =>
  path.startsWith('/home/flux-kontext/flux-3-klein')
)

const openFaqIndex = ref(0)
function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
