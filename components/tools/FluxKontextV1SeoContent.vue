<template>
  <div
    id="flux-kontext-v1-section"
    class="flux-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Flux Kontext Image on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Flux Kontext Pro and Max on FuseAITools—unified text-to-image and single-image edit with six aspect ratios, safety controls, and prompt enhancement."
    />

    <div class="version-badge">🎨 Flux Kontext · v1 · Generate & Edit · Pro / Max</div>

    <section class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">🎨 Flux Kontext Generate</h2>
      <p class="tool-sub">
        Black Forest Labs <strong>Flux Kontext</strong> on one page—switch <strong>Image Generation</strong> (text-to-image)
        or <strong>Image Editing</strong> (single-image edit). Required: <strong>prompt</strong>. Edit mode adds one uploaded
        image (max 10MB). Pick <strong>Pro</strong> or <strong>Max</strong>, six aspect ratios, JPEG/PNG output, optional
        prompt enhancement and safety tolerance (0–6).
      </p>
    </section>

    <section class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">What is Flux Kontext Generate?</h2>
      <p class="tool-sub">
        <strong>Flux Kontext Generate</strong> on FuseAITools (<code>flux_kontext_pro</code> /
        <code>flux_kontext_max</code>) is the original Kontext workflow—text-to-image from a prompt, or image editing
        when you upload a reference still. Aspect ratios: <strong>21:9, 16:9, 4:3, 1:1, 3:4, 9:16</strong>. Optional auto
        translation, prompt upsampling, watermark ID, and safety tolerance slider. Fixed credits per image (Pro vs Max tier).
      </p>
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎨 Flux Kontext on FuseAITools</h2>
      <p class="tool-sub">
        Flux Kontext on <a href="/" class="seo-inline-link">FuseAITools</a> is Black Forest Labs' governed image line—
        strong text rendering, photoreal detail, and edit controls on a single tab. Need <strong>1K/2K Flux 2</strong>
        output or <strong>multi-reference</strong> (1–8 images)? Upgrade to
        <a href="/home/flux-kontext/flux-2-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/flux-kontext/flux-2-text-to-image')">Flux 2</a>.
        Credits show on Generate; new users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Flux Kontext Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Flux Kontext Pro vs Max</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Flux Kontext Pro vs Max">
          <thead>
            <tr><th>Dimension</th><th>Pro</th><th>Max</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>modelKey</strong></td>
              <td><code>flux_kontext_pro</code></td>
              <td><code>flux_kontext_max</code></td>
            </tr>
            <tr>
              <td><strong>Positioning</strong></td>
              <td>Balanced speed and quality</td>
              <td>Higher fidelity and detail</td>
            </tr>
            <tr>
              <td><strong>Modes</strong></td>
              <td colspan="2">Text-to-image + single-image edit</td>
            </tr>
            <tr>
              <td><strong>Controls</strong></td>
              <td colspan="2">6 aspect ratios; JPEG/PNG; safety 0–6; prompt upsampling</td>
            </tr>
            <tr>
              <td><strong>Pricing</strong></td>
              <td colspan="2">Fixed credits per image (ONCE)—shown before generate</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Flux Kontext)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Flux Kontext Technical Specs</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Flux Kontext capabilities">
          <thead>
            <tr><th>Mode</th><th>Required</th><th>Key controls</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Image Generation</strong></td>
              <td>Prompt</td>
              <td>Pro/Max; aspect 21:9–9:16; JPEG/PNG; auto translation; prompt upsampling; safety 0–6</td>
            </tr>
            <tr>
              <td><strong>Image Editing</strong></td>
              <td>Prompt + 1 image (max 10MB)</td>
              <td>Same controls as generation</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Flux Kontext — Generate Workflow</h2>
      <div class="model-modes-grid">
        <NuxtLink
          to="/home/flux-kontext/generate"
          class="model-mode-card model-mode-card--current"
          @click.prevent="handleModeClick('/home/flux-kontext/generate')"
        >
          <div class="model-mode-icon" aria-hidden="true"><i class="fas fa-wand-magic-sparkles" /></div>
          <h3 class="model-mode-title">Generate</h3>
          <p class="model-mode-name">Flux Kontext</p>
          <p class="model-mode-desc">Text-to-image or single-image edit—Pro/Max, six ratios, governance knobs.</p>
          <span class="model-mode-cta">Current workflow</span>
        </NuxtLink>
      </div>
    </section>

    <section class="info-section" aria-labelledby="version-compare-heading">
      <h2 id="version-compare-heading" class="section-title">📊 Flux Kontext vs Flux 2</h2>
      <p class="section-lead">
        <strong>Flux Kontext (v1)</strong> is the governed generate/edit tab; <strong>Flux 2 (v2)</strong> adds dedicated
        1K/2K T2I and multi-reference I2I (1–8 images) plus a Pro tier. Upgrade when you need 2K drafts or reference-heavy edits.
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Flux Kontext vs Flux 2">
          <thead>
            <tr><th>Dimension</th><th>Flux Kontext (v1)</th><th>Flux 2 (v2)</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Positioning</strong></td>
              <td>Governed generate + single-image edit</td>
              <td>1K/2K T2I + multi-ref I2I (+ Pro tier)</td>
            </tr>
            <tr>
              <td><strong>Workflows</strong></td>
              <td>Generate tab (T2I + edit)</td>
              <td>Flux 2 T2I, I2I, Pro T2I, Pro I2I</td>
            </tr>
            <tr>
              <td><strong>Resolution</strong></td>
              <td>Pro / Max tiers (standard output)</td>
              <td><strong>1K / 2K</strong> selectable</td>
            </tr>
            <tr>
              <td><strong>Reference images</strong></td>
              <td>1 image (edit mode only)</td>
              <td><strong>1–8</strong> on I2I workflows</td>
            </tr>
            <tr>
              <td><strong>Aspect ratios</strong></td>
              <td>6 (21:9–9:16)</td>
              <td>8 + <strong>auto</strong></td>
            </tr>
            <tr>
              <td><strong>Unique controls</strong></td>
              <td>Safety tolerance, prompt upsampling, watermark</td>
              <td>Per-shot 1K/2K; Pro fidelity tier</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>Text-in-image, governed edits, Pro/Max pick</td>
              <td>2K social assets, multi-reference style lock</td>
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
      🖼️ Need 1K/2K output or multi-reference editing?
      <a href="/home/flux-kontext/flux-2-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/flux-kontext/flux-2-text-to-image')">Try Flux 2 Text to Image →</a>
      or
      <a href="/home/flux-kontext/flux-2-image-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/flux-kontext/flux-2-image-to-image')">Flux 2 Image to Image</a>
      (1–8 reference images)—or
      <a href="/home/flux-kontext/flux-2-pro-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/flux-kontext/flux-2-pro-text-to-image')">Flux 2 Pro</a>
      for higher-fidelity finals.
    </div>
  </div>
</template>

<script setup>
const faqItems = [
  {
    question: 'What is the difference between Flux Kontext Pro and Max?',
    answer: '<strong>Pro</strong> (<code>flux_kontext_pro</code>) balances speed and quality; <strong>Max</strong> (<code>flux_kontext_max</code>) targets higher detail. Both support generate and edit modes—credits differ per tier.'
  },
  {
    question: 'Can Flux Kontext edit an uploaded image?',
    answer: 'Yes—switch to <strong>Image Editing</strong>, upload one image (JPEG/PNG/WebP, max 10MB), and describe the change in your prompt.'
  },
  {
    question: 'Which aspect ratios does Flux Kontext support?',
    answer: '<strong>21:9, 16:9, 4:3, 1:1, 3:4, and 9:16</strong>. Output as JPEG or PNG with optional watermark ID.'
  },
  {
    question: 'How is Flux Kontext priced on FuseAITools?',
    answer: 'Fixed credits per successful image—Pro or Max tier. Credits appear on the Generate button. New users get <strong>20 free credits</strong>—see <a href="/pricing" class="seo-pricing-link">pricing</a>.'
  }
]
useToolSeoFaqSchema(computed(() => faqItems))

const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()
watchRouteScroll((path) => path === '/home/flux-kontext/generate' || path === '/home/flux-kontext/generate/')

const coreFeatures = [
  { icon: '✍️', title: 'Text & Edit Modes', description: 'One tab for <strong>text-to-image</strong> and <strong>single-image edit</strong> with the same Pro/Max controls.' },
  { icon: '🎚️', title: 'Governance Knobs', description: 'Safety tolerance (0–6), prompt enhancement, optional watermark, and auto translation.' },
  { icon: '📐', title: 'Six Aspect Ratios', description: '21:9 through 9:16 for widescreen, social, and mobile layouts.' },
  { icon: '☁️', title: 'Cloud on FuseAITools', description: 'Pro/Max credits shown before generate—no local GPU required.' }
]

const scenarioTags = ['Text-in-image posters', 'Single-image retouch', 'Brand-safe generation', 'Pro/Max A/B tests']

const openFaqIndex = ref(0)
function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
