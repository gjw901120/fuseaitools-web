<template>
  <div
    id="qwen-v1-section"
    class="qwen-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Qwen v1 Classic Image on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Qwen v1 classic image generation—text-to-image, image-to-image, and image-edit workflows on FuseAITools with full parameter control."
    />

    <div class="version-badge">🎨 Qwen v1 · Classic Image · Three Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎨 Qwen v1 Classic on FuseAITools</h2>
      <p class="tool-sub">
        Qwen v1 Classic on <a href="/" class="seo-inline-link">FuseAITools</a> delivers
        <strong>three image workflows</strong> with full parameter control—prompts up to
        <strong>5000 characters</strong>, inference steps, guidance scale, seed, acceleration,
        and negative prompts. Whether you generate from text, transform existing images,
        or edit specific elements, Qwen v1 gives you fine-grained tuning for every task.
        New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Qwen v1 Classic Core Features</h2>
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
      <h2 id="faq-heading" class="section-title">❓ FAQ (Qwen v1 Classic)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Qwen v1 Classic Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Qwen form and API (<code>qwen-*-*</code> models).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Qwen v1 Classic workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Input</th>
              <th>Image size</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Text to Image</strong></td>
              <td>Prompt ≤5000 chars</td>
              <td>6 presets (square, square_hd, portrait 3:4/9:16, landscape 4:3/16:9)</td>
              <td>Steps 2–250, guidance 0–20, acceleration, seed, negative prompt, safety checker, PNG/JPEG</td>
            </tr>
            <tr>
              <td><strong>Image to Image</strong></td>
              <td>1 image URL + prompt ≤5000 chars</td>
              <td>Follows input image</td>
              <td>Strength 0–1, steps, guidance, acceleration, seed, negative prompt, safety checker, PNG/JPEG</td>
            </tr>
            <tr>
              <td><strong>Image Edit</strong></td>
              <td>1 image URL + prompt ≤2000 chars</td>
              <td>6 presets (same as T2I)</td>
              <td>Steps 2–49, guidance (default 4), 1–4 outputs, sync mode, negative prompt, safety checker, PNG/JPEG</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Image inputs: JPEG, PNG, WebP (max 10MB). Acceleration: none / regular / high. High acceleration recommended for images without text.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Qwen v1 Classic — Three Image Workflows</h2>
      <p class="section-lead">Choose the mode that matches your source material:</p>
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

    <section class="info-section" aria-labelledby="compare-heading">
      <h2 id="compare-heading" class="section-title">📊 Qwen v1 Classic vs Qwen v2</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Qwen v1 Classic vs Qwen v2">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Qwen v1 Classic</th>
              <th>Qwen v2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Positioning</td>
              <td>Full-parameter control for power users</td>
              <td>Streamlined generation with modern quality</td>
            </tr>
            <tr>
              <td>Workflows</td>
              <td><strong>Three</strong>—T2I, I2I, Image Edit</td>
              <td><strong>Two</strong>—T2I, Image Edit</td>
            </tr>
            <tr>
              <td>Prompt limit</td>
              <td>T2I/I2I <strong>5000</strong>; Edit <strong>2000</strong></td>
              <td><strong>800</strong> for both workflows</td>
            </tr>
            <tr>
              <td>Controls</td>
              <td>Steps, guidance, acceleration, seed, negative prompt, safety checker</td>
              <td>Seed, image size, output format—<strong>simplified</strong></td>
            </tr>
            <tr>
              <td>Image size</td>
              <td>6 presets (square, square_hd, portrait, landscape)</td>
              <td>5–8 aspect ratios including 21:9</td>
            </tr>
            <tr>
              <td>Best for</td>
              <td>Fine-tuned creative control and iterative refinement</td>
              <td>Quick high-quality generation with modern quality</td>
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
      ✨ Need modern streamlined generation?
      <a
        href="/home/qwen/v2-text-to-image"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/qwen/v2-text-to-image')"
      >Try Qwen v2 Text to Image →</a>
      for faster generation with aspect ratio control and modern quality, or
      <a
        href="/home/qwen/v2-image-edit"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/qwen/v2-image-edit')"
      >Qwen v2 Image Edit</a>
      for reference-based editing with up to 21:9 support.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const v1Workflows = [
  {
    name: 'Qwen v1 Text to Image',
    title: 'Text to Image',
    description: 'Generate from text prompts up to 5000 chars—full control over steps, guidance, acceleration, and seed.',
    path: '/home/qwen/text-to-image',
    icon: 'fas fa-font'
  },
  {
    name: 'Qwen v1 Image to Image',
    title: 'Image to Image',
    description: 'Transform a reference image with a prompt—adjust denoising strength from 0 to 1.',
    path: '/home/qwen/image-to-image',
    icon: 'fas fa-image'
  },
  {
    name: 'Qwen v1 Image Edit',
    title: 'Image Edit',
    description: 'Edit specific elements via natural language—1–4 outputs, sync mode, 2–49 inference steps.',
    path: '/home/qwen/image-edit',
    icon: 'fas fa-edit'
  }
]

const workflowIntroMap = {
  '/home/qwen/text-to-image': {
    title: '📝 Qwen v1 Text to Image',
    lead: 'Generate images from <strong>text prompts up to 5000 characters</strong> with full parameter control. Choose from <strong>6 image size presets</strong>, set <strong>inference steps (2–250)</strong> and <strong>guidance scale (0–20)</strong>, and toggle acceleration for speed or quality.'
  },
  '/home/qwen/image-to-image': {
    title: '🖼️ Qwen v1 Image to Image',
    lead: 'Upload <strong>one reference image</strong> and guide transformation with a prompt up to 5000 characters. Adjust <strong>denoising strength (0–1)</strong> to balance between preserving the original and applying new content.'
  },
  '/home/qwen/image-edit': {
    title: '✂️ Qwen v1 Image Edit',
    lead: 'Edit specific elements of an image via natural language—<strong>prompt up to 2000 characters</strong>. Generate <strong>1–4 outputs</strong> per request, enable <strong>sync mode</strong>, and fine-tune with <strong>steps (2–49)</strong> and <strong>guidance</strong>.'
  }
}

const workflowDefinitionMap = {
  '/home/qwen/text-to-image': {
    title: 'What is Qwen v1 Text to Image?',
    body:
      '<strong>Qwen v1 Text to Image</strong> on FuseAITools turns a text prompt (≤5000 characters) into an image with <strong>six size presets</strong> (square, square_hd, portrait 3:4/9:16, landscape 4:3/16:9). Set <strong>inference steps 2–250</strong>, <strong>guidance scale 0–20</strong>, optional <strong>seed</strong>, <strong>acceleration</strong> (none/regular/high), <strong>negative prompt</strong>, and <strong>output format</strong> PNG or JPEG.'
  },
  '/home/qwen/image-to-image': {
    title: 'What is Qwen v1 Image to Image?',
    body:
      '<strong>Qwen v1 Image to Image</strong> on FuseAITools transforms a <strong>single uploaded image</strong> with a text prompt (≤5000 characters). The <strong>strength parameter (0–1)</strong> controls how much the output deviates from the original—use lower values for subtle edits, higher for full remakes. Includes full parameter set: steps, guidance, seed, acceleration, negative prompt, safety checker.'
  },
  '/home/qwen/image-edit': {
    title: 'What is Qwen v1 Image Edit?',
    body:
      '<strong>Qwen v1 Image Edit</strong> on FuseAITools edits specific parts of an uploaded image with natural-language instructions. Prompt up to <strong>2000 characters</strong>. Generate <strong>1–4 images</strong> per request, enable <strong>sync mode</strong> for deterministic outputs, and fine-tune with <strong>steps (2–49)</strong> and <strong>guidance scale</strong> (default 4).'
  }
}

const workflowFaqMap = {
  '/home/qwen/text-to-image': [
    {
      question: 'What image size options does Qwen v1 text-to-image offer?',
      answer:
        'Choose from <strong>6 presets</strong>: Square (1024×1024), square_hd (1536×1536), portrait 3:4 (864×1152), portrait 9:16 (768×1344), landscape 4:3 (1152×864), and landscape 16:9 (1344×768).'
    },
    {
      question: 'What acceleration modes are available on Qwen v1 text-to-image?',
      answer:
        'Three levels: <strong>None</strong> (maximum quality), <strong>Regular</strong>, and <strong>High</strong>. High acceleration reduces generation time by up to 50% and is recommended for images without text elements.'
    }
  ],
  '/home/qwen/image-to-image': [
    {
      question: 'What does the strength parameter do on Qwen v1 image-to-image?',
      answer:
        'Strength (0–1) controls <strong>denoising intensity</strong>. <strong>0</strong> preserves the original almost unchanged; <strong>1</strong> fully remakes the image from the prompt. Start around <strong>0.3–0.7</strong> for a balanced edit.'
    },
    {
      question: 'Can I use negative prompts on Qwen v1 image-to-image?',
      answer:
        'Yes—enter a <strong>negative prompt</strong> (max 500 characters) to exclude unwanted elements, such as "blurry, low quality, extra limbs". Works alongside the safety checker for content filtering.'
    }
  ],
  '/home/qwen/image-edit': [
    {
      question: 'How many images can Qwen v1 image edit generate per request?',
      answer:
        'Between <strong>1 and 4</strong> outputs. Enable <strong>sync mode</strong> for deterministic results across multiple runs with the same prompt and seed.'
    },
    {
      question: 'What is the inference step range on Qwen v1 image edit?',
      answer:
        'Steps run from <strong>2 to 49</strong>, with a default of 4 for guidance scale. Lower steps generate faster but may reduce detail; higher steps improve quality at the cost of speed.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Qwen v1 Classic?',
    answer:
      'No—Qwen v1 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How is Qwen v1 Classic priced on FuseAITools?',
    answer:
      'Credits depend on the model and image size—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
    icon: '🎛️',
    title: 'Full Parameter Control',
    description:
      'Fine-tune every generation with <strong>inference steps, guidance scale, seed, acceleration, and negative prompts</strong>—perfect for power users who want pixel-level control.'
  },
  {
    icon: '📝',
    title: 'Long Prompt Support',
    description:
      'Prompts up to <strong>5000 characters</strong> on T2I and I2I workflows—describe intricate scenes, detailed edits, and complex compositions without truncation.'
  },
  {
    icon: '⚡',
    title: 'Acceleration Tiers',
    description:
      'Three <strong>acceleration levels</strong> (none / regular / high) let you trade speed for quality. Use high acceleration for rapid drafts, none for final assets.'
  },
  {
    icon: '🔁',
    title: 'Reproducible Outputs',
    description:
      'Set a fixed <strong>seed</strong> for consistent results across runs. Sync mode on Image Edit ensures deterministic multi-output generation.'
  }
]

const scenarioTags = [
  'Concept exploration & iteration',
  'Brand asset creation',
  'Photo editing & retouching',
  'Social media content',
  'Batch experimentation'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) =>
  path === '/home/qwen/text-to-image' || path === '/home/qwen/image-to-image' || path === '/home/qwen/image-edit'
)

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
