<template>
  <div
    id="qwen-zimage-section"
    class="qwen-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Qwen Z-Image on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Qwen Z-Image fast text-to-image on FuseAITools—streamlined generation with aspect ratio control (1:1, 4:3, 3:4, 16:9, 9:16), prompts up to 1000 characters."
    />

    <div class="version-badge">⚡ Qwen Z-Image · Fast T2I · Five Aspect Ratios</div>

    <section class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">⚡ Qwen Z-Image</h2>
      <p class="tool-sub">
        Qwen Z-Image on <a href="/" class="seo-inline-link">FuseAITools</a> is a
        <strong>streamlined text-to-image</strong> workflow optimized for speed and format compliance.
        Write a prompt up to <strong>1000 characters</strong> and pick from <strong>5 aspect ratios</strong>
        (1:1, 4:3, 3:4, 16:9, 9:16). No advanced parameters—just prompt, aspect ratio, and generate.
        New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">What is Qwen Z-Image?</h2>
      <p class="tool-sub">
        <strong>Qwen Z-Image</strong> on FuseAITools (<code>qwen-z-image</code>) generates images from text with
        <strong>essential aspect ratio control</strong>—choose 1:1, 4:3, 3:4, 16:9, or 9:16.
        Designed for <strong>rapid ideation and format-specific assets</strong>, Z-Image strips away
        complex parameters (no steps, guidance, or acceleration) so you can iterate fast.
        Generation takes <strong>3–15 seconds</strong>.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Qwen Z-Image Core Features</h2>
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

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Qwen Z-Image)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Qwen Z-Image Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Qwen Z-Image form and API.
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Qwen Z-Image capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Input</th>
              <th>Aspect ratios</th>
              <th>Generation speed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Z-Image</strong></td>
              <td>Prompt ≤1000 chars</td>
              <td>1:1, 4:3, 3:4, 16:9, 9:16</td>
              <td><strong>3–15 seconds</strong>—optimized for rapid output</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Qwen — All Workflows</h2>
      <p class="section-lead">Z-Image is the streamlined path. Switch to v1 Classic or v2 for more controls:</p>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in allWorkflows"
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

    <section class="info-section" aria-labelledby="compare-heading">
      <h2 id="compare-heading" class="section-title">📊 Qwen Z-Image vs Qwen v2</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Qwen Z-Image vs Qwen v2">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Z-Image</th>
              <th>Qwen v2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Positioning</td>
              <td>Fast T2I with aspect ratio control—3–15s generation</td>
              <td>Streamlined generation & editing with modern quality</td>
            </tr>
            <tr>
              <td>Workflows</td>
              <td><strong>One</strong>—Text to Image only</td>
              <td><strong>Two</strong>—Text to Image + Image Edit</td>
            </tr>
            <tr>
              <td>Prompt limit</td>
              <td><strong>1000</strong> characters</td>
              <td><strong>800</strong> characters for both workflows</td>
            </tr>
            <tr>
              <td>Aspect ratios</td>
              <td><strong>5</strong>—1:1, 4:3, 3:4, 16:9, 9:16</td>
              <td>T2I: <strong>5</strong> (1:1–16:9); Edit: <strong>8</strong> (incl. 21:9)</td>
            </tr>
            <tr>
              <td>Image input</td>
              <td>Not supported—prompt only</td>
              <td>v2 Image Edit supports <strong>1 image</strong> + prompt</td>
            </tr>
            <tr>
              <td>Controls</td>
              <td>Minimal—prompt + aspect ratio only</td>
              <td>Seed, output format (PNG/JPEG)</td>
            </tr>
            <tr>
              <td>Best for</td>
              <td>Rapid ideation & format-specific assets</td>
              <td>Modern quality with reference editing</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="upgrade-tip pricing-tip">
      💳 New users get <strong>20 free credits</strong> on sign-up.
      <a href="/pricing" class="seo-pricing-link">View pricing</a>
      for Qwen Z-Image per-generation costs.
    </div>

    <div class="upgrade-tip">
      ✨ Need reference-based image editing or more aspect ratios?
      <a
        href="/home/qwen/v2-text-to-image"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/qwen/v2-text-to-image')"
      >Upgrade to Qwen v2 Text to Image →</a>
      for streamlined T2I with modern quality, or
      <a
        href="/home/qwen/v2-image-edit"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/qwen/v2-image-edit')"
      >Qwen v2 Image Edit</a>
      for 21:9 ultra-wide and reference-based editing.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const allWorkflows = [
  {
    name: 'Qwen v1 Text to Image',
    title: 'v1 Text to Image',
    description: 'Full parameter control: steps, guidance, acceleration, negative prompt.',
    path: '/home/qwen/text-to-image',
    icon: 'fas fa-font'
  },
  {
    name: 'Qwen v1 Image to Image',
    title: 'v1 Image to Image',
    description: 'Transform reference images with denoising strength control.',
    path: '/home/qwen/image-to-image',
    icon: 'fas fa-image'
  },
  {
    name: 'Qwen v1 Image Edit',
    title: 'v1 Image Edit',
    description: 'Natural-language edits with multi-output and sync mode.',
    path: '/home/qwen/image-edit',
    icon: 'fas fa-edit'
  },
  {
    name: 'Qwen Z-Image',
    title: 'Z-Image',
    description: 'Fast T2I with aspect ratio control—1:1, 4:3, 3:4, 16:9, 9:16.',
    path: '/home/qwen/z-image',
    icon: 'fas fa-square'
  },
  {
    name: 'Qwen v2 Text to Image',
    title: 'v2 Text to Image',
    description: 'Streamlined T2I with modern quality and aspect ratio options.',
    path: '/home/qwen/v2-text-to-image',
    icon: 'fas fa-wand-magic-sparkles'
  },
  {
    name: 'Qwen v2 Image Edit',
    title: 'v2 Image Edit',
    description: 'Reference-based editing with up to 21:9 support.',
    path: '/home/qwen/v2-image-edit',
    icon: 'fas fa-scissors'
  }
]

const coreFeatures = [
  {
    icon: '⚡',
    title: 'Optimized for Speed',
    description:
      'Generation in <strong>3–15 seconds</strong>—no advanced parameters to tune. Write a prompt, pick an aspect ratio, and generate instantly.'
  },
  {
    icon: '📐',
    title: 'Five Aspect Ratios',
    description:
      'Choose from <strong>1:1, 4:3, 3:4, 16:9, and 9:16</strong>—perfect for social media, presentations, and format-specific assets.'
  },
  {
    icon: '🎯',
    title: 'Focused Simplicity',
    description:
      'No steps, guidance, seed, or acceleration controls—just <strong>prompt + aspect ratio</strong>. Built for rapid ideation and quick drafts.'
  }
]

const scenarioTags = [
  'Quick ideation & drafts',
  'Social media assets',
  'Format-specific mockups'
]

const faqItems = computed(() => {
  return [
    {
      question: 'What aspect ratios does Qwen Z-Image support?',
      answer:
        'Five options: <strong>1:1</strong> (square), <strong>4:3</strong> (landscape), <strong>3:4</strong> (portrait), <strong>16:9</strong> (widescreen), and <strong>9:16</strong> (vertical). Pick the one that fits your output format.'
    },
    {
      question: 'How fast is Qwen Z-Image compared to v1 Classic?',
      answer:
        'Z-Image generates in <strong>3–15 seconds</strong>—significantly faster than v1 Classic with full parameters. It is optimized for rapid output with no steps or acceleration tuning needed.'
    },
    {
      question: 'Do I need a local GPU for Qwen Z-Image?',
      answer:
        'No—Z-Image runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
    },
    {
      question: 'How is Qwen Z-Image priced on FuseAITools?',
      answer:
        'Credits are based on the aspect ratio selected—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
    }
  ]
})

useToolSeoFaqSchema(faqItems)

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path === '/home/qwen/z-image' || path === '/home/qwen/z-image/')

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
