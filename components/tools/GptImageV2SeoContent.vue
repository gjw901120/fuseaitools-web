<template>
  <div
    id="gpt-image-v2-section"
    class="gpt-image-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="GPT Image v2 on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="GPT Image v2 and 2.5 Flare / Sunburst text-to-image and image-to-image on FuseAITools—prompts up to 20000 chars, up to 13 aspect ratios, 1K/2K/4K resolution, optional background, up to 16 input images."
    />

    <div class="version-badge">🌟 GPT Image v2 &amp; 2.5 · Modern Generation · Six Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🌟 GPT Image v2 &amp; 2.5 on FuseAITools</h2>
      <p class="tool-sub">
        GPT Image on <a href="/" class="seo-inline-link">FuseAITools</a> covers OpenAI's
        <strong>v2</strong> and <strong>2.5 Flare / Sunburst</strong> image models, all with
        <strong>20000-character prompt</strong> capacity and <strong>selectable 1K/2K/4K resolution</strong>
        as the billing tier. The 2.5 families expand framing to <strong>13 aspect ratios</strong> and add an
        optional <strong>background</strong> control at 1K, while image-to-image accepts
        <strong>up to 16 reference images</strong>. New users receive
        <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ GPT Image v2 &amp; 2.5 Core Features</h2>
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
      <h2 id="faq-heading" class="section-title">❓ FAQ (GPT Image v2 &amp; 2.5)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ GPT Image v2 &amp; 2.5 Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools GPT Image form and API (<code>gpt-image-2-*</code> and <code>gpt-image-2-5-*</code> models).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="GPT Image v2 and 2.5 workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Input</th>
              <th>Aspect ratios</th>
              <th>Resolution & credits</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>v2 Text to Image</strong></td>
              <td>Prompt ≤20000 chars</td>
              <td>auto, 1:1, 9:16, 16:9, 4:3, 3:4</td>
              <td>1K <strong>6</strong> / 2K <strong>9</strong> / 4K <strong>12</strong></td>
              <td>Prompt + resolution + aspect ratio</td>
            </tr>
            <tr>
              <td><strong>v2 Image to Image</strong></td>
              <td>Up to 16 image URLs + prompt ≤20000 chars</td>
              <td>auto, 1:1, 9:16, 16:9, 4:3, 3:4</td>
              <td>1K <strong>6</strong> / 2K <strong>9</strong> / 4K <strong>12</strong></td>
              <td>Prompt + resolution + aspect ratio + up to 16 reference images</td>
            </tr>
            <tr>
              <td><strong>2.5 Flare Text to Image</strong></td>
              <td>Prompt ≤20000 chars (required)</td>
              <td>13 ratios: auto, 1:1, 3:2, 2:3, 4:3, 3:4, 16:9, 9:16, 21:9, 27:16, 16:27, 9:8, 8:9</td>
              <td>1K / 2K / 4K — resolution is the billing tier</td>
              <td>Prompt + resolution + 13 ratios + background (1K only)</td>
            </tr>
            <tr>
              <td><strong>2.5 Flare Image to Image</strong></td>
              <td>Up to 16 image URLs (optional) + prompt ≤20000 chars</td>
              <td>Same 13 ratios as Flare T2I</td>
              <td>1K / 2K / 4K — resolution is the billing tier</td>
              <td>Prompt + resolution + 13 ratios + background (1K only) + ≤16 references</td>
            </tr>
            <tr>
              <td><strong>2.5 Sunburst Text to Image</strong></td>
              <td>Prompt ≤20000 chars (required)</td>
              <td>13 ratios, incl. ultra-wide 21:9 / 27:16 / 16:27 and 9:8 / 8:9</td>
              <td>1K / 2K / 4K — resolution is the billing tier</td>
              <td>Prompt + resolution + 13 ratios + background (1K only)</td>
            </tr>
            <tr>
              <td><strong>2.5 Sunburst Image to Image</strong></td>
              <td>Up to 16 image URLs (optional) + prompt ≤20000 chars</td>
              <td>Same 13 ratios as Sunburst T2I</td>
              <td>1K / 2K / 4K — resolution is the billing tier</td>
              <td>Prompt + resolution + 13 ratios + background (1K only) + ≤16 references</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        v2: "auto" requires 1K and 1:1 does not support 4K. 2.5 Flare / Sunburst: resolution (1K / 2K / 4K) is required and is the billing tier; the ratios 27:16, 16:27, 9:8, 8:9 and the optional background (transparent / opaque / auto) are only supported at 1K. Image inputs: JPEG, PNG, WebP (max 10MB each, up to 16) in the I2I workflows.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">GPT Image v2 &amp; 2.5 — Six Workflows</h2>
      <p class="section-lead">Choose the mode that matches your task:</p>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in v2Workflows"
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
      for GPT Image v2 / 2.5 Flare / 2.5 Sunburst per-generation costs.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { handleModeClick, navigateToToolTop, watchRouteScroll } = useToolSeoPageScroll()

const v2Workflows = [
  {
    name: 'GPT Image v2 Text to Image',
    title: 'v2 Text to Image',
    description: 'Long prompts up to 20000 chars, 6 aspect ratios, 1K/2K/4K resolution—modern quality at 6–12 credits.',
    path: '/home/gpt-image/v2-text-to-image',
    icon: 'fas fa-wand-magic-sparkles'
  },
  {
    name: 'GPT Image v2 Image to Image',
    title: 'v2 Image to Image',
    description: 'Edit with up to 16 reference images, long prompts, and full resolution control.',
    path: '/home/gpt-image/v2-image-to-image',
    icon: 'fas fa-pen-to-square'
  },
  {
    name: 'GPT Image 2.5 Flare Text to Image',
    title: '2.5 Flare Text to Image',
    description: 'Fast 2.5 generation with 13 aspect ratios, 1K–4K resolution tiers, and background control at 1K.',
    path: '/home/gpt-image/v2-5-flare-text-to-image',
    icon: 'fas fa-bolt'
  },
  {
    name: 'GPT Image 2.5 Flare Image to Image',
    title: '2.5 Flare Image to Image',
    description: 'Fuse up to 16 references into a 2.5 Flare edit with long-prompt precision and resolution control.',
    path: '/home/gpt-image/v2-5-flare-image-to-image',
    icon: 'fas fa-fire'
  },
  {
    name: 'GPT Image 2.5 Sunburst Text to Image',
    title: '2.5 Sunburst Text to Image',
    description: 'Bright, detailed 2.5 text-to-image with ultra-wide ratios (21:9 / 27:16) and transparent background at 1K.',
    path: '/home/gpt-image/v2-5-sunburst-text-to-image',
    icon: 'fas fa-sun'
  },
  {
    name: 'GPT Image 2.5 Sunburst Image to Image',
    title: '2.5 Sunburst Image to Image',
    description: 'Restyle and composite up to 16 inputs with the Sunburst model, billed by resolution.',
    path: '/home/gpt-image/v2-5-sunburst-image-to-image',
    icon: 'fas fa-cloud-sun'
  }
]

const workflowIntroMap = {
  '/home/gpt-image/v2-text-to-image': {
    title: '📝 GPT Image v2 Text to Image',
    lead: 'Generate images from <strong>prompts up to 20000 characters</strong> with OpenAI\'s next-generation model. Choose <strong>1K (6 credits), 2K (9 credits), or 4K (12 credits)</strong> resolution and <strong>six aspect ratios</strong> including auto-optimized framing.'
  },
  '/home/gpt-image/v2-image-to-image': {
    title: '🖼️ GPT Image v2 Image to Image',
    lead: 'Upload <strong>up to 16 reference images</strong> and edit them with a prompt up to 20000 characters. GPT Image v2 offers <strong>multi-reference fusion, resolution control (1K–4K), and six aspect ratios</strong> for complex editing tasks.'
  },
  '/home/gpt-image/v2-5-flare-text-to-image': {
    title: '⚡ GPT Image 2.5 Flare Text to Image',
    lead: 'Generate from <strong>prompts up to 20000 characters</strong> with GPT Image 2.5 Flare. Pick from <strong>13 aspect ratios</strong>, set the required <strong>1K / 2K / 4K resolution</strong> (the billing tier), and optionally force a <strong>transparent, opaque, or auto background</strong> at 1K.'
  },
  '/home/gpt-image/v2-5-flare-image-to-image': {
    title: '🔥 GPT Image 2.5 Flare Image to Image',
    lead: 'Edit with <strong>up to 16 optional reference images</strong> and a prompt up to 20000 characters. 2.5 Flare keeps <strong>13 aspect ratios, 1K–4K resolution billing, and 1K background control</strong> identical to its text-to-image workflow.'
  },
  '/home/gpt-image/v2-5-sunburst-text-to-image': {
    title: '🌞 GPT Image 2.5 Sunburst Text to Image',
    lead: 'GPT Image 2.5 Sunburst turns <strong>prompts up to 20000 characters</strong> into bright, detail-dense imagery across <strong>13 aspect ratios</strong> (including ultra-wide 21:9 and 27:16), with <strong>1K / 2K / 4K resolution</strong> as the billing tier.'
  },
  '/home/gpt-image/v2-5-sunburst-image-to-image': {
    title: '🌤️ GPT Image 2.5 Sunburst Image to Image',
    lead: 'Composite and restyle <strong>up to 16 optional references</strong> with the Sunburst model. Same control surface as Sunburst T2I: <strong>13 ratios, required 1K–4K resolution, and background only at 1K</strong>.'
  }
}

const workflowDefinitionMap = {
  '/home/gpt-image/v2-text-to-image': {
    title: 'What is GPT Image v2 Text to Image?',
    body:
      '<strong>GPT Image v2 Text to Image</strong> on FuseAITools (<code>gpt-image-2-text-to-image</code>) generates images from a text prompt (≤20000 chars). Key features: <strong>6 aspect ratios</strong> (auto, 1:1, 9:16, 16:9, 4:3, 3:4), <strong>3 resolution tiers</strong> (1K at 6 credits, 2K at 9 credits, 4K at 12 credits), and improved text rendering compared to v1.5.'
  },
  '/home/gpt-image/v2-image-to-image': {
    title: 'What is GPT Image v2 Image to Image?',
    body:
      '<strong>GPT Image v2 Image to Image</strong> on FuseAITools (<code>gpt-image-2-image-to-image</code>) edits <strong>up to 16 uploaded images</strong> with a text prompt (≤20000 chars). The v2 model fuses multiple visual references into one coherent edit. Same resolution and aspect ratio controls as the T2I workflow.'
  },
  '/home/gpt-image/v2-5-flare-text-to-image': {
    title: 'What is GPT Image 2.5 Flare Text to Image?',
    body:
      '<strong>GPT Image 2.5 Flare Text to Image</strong> on FuseAITools (<code>gpt-image-2-5-flare-text-to-image</code>) generates an image from a required text prompt (≤20000 chars). Controls: <strong>13 aspect ratios</strong> (auto, 1:1, 3:2, 2:3, 4:3, 3:4, 16:9, 9:16, 21:9, 27:16, 16:27, 9:8, 8:9), a <strong>required resolution tier (1K / 2K / 4K) that drives pricing</strong>, and an optional <strong>background</strong> (transparent / opaque / auto) available only at 1K.'
  },
  '/home/gpt-image/v2-5-flare-image-to-image': {
    title: 'What is GPT Image 2.5 Flare Image to Image?',
    body:
      '<strong>GPT Image 2.5 Flare Image to Image</strong> on FuseAITools (<code>gpt-image-2-5-flare-image-to-image</code>) edits or composes <strong>up to 16 reference image URLs</strong> guided by a required prompt (≤20000 chars). Inputs are optional, so you can also generate freely while keeping the same 13 ratios, resolution billing tiers, and 1K-only background control.'
  },
  '/home/gpt-image/v2-5-sunburst-text-to-image': {
    title: 'What is GPT Image 2.5 Sunburst Text to Image?',
    body:
      '<strong>GPT Image 2.5 Sunburst Text to Image</strong> on FuseAITools (<code>gpt-image-2-5-sunburst-text-to-image</code>) is the Sunburst variant of the 2.5 family: required prompt (≤20000 chars), <strong>13 aspect ratios</strong>, <strong>1K / 2K / 4K resolution</strong> as the billing dimension, and optional <strong>background</strong> handling at 1K for cut-out-ready assets.'
  },
  '/home/gpt-image/v2-5-sunburst-image-to-image': {
    title: 'What is GPT Image 2.5 Sunburst Image to Image?',
    body:
      '<strong>GPT Image 2.5 Sunburst Image to Image</strong> on FuseAITools (<code>gpt-image-2-5-sunburst-image-to-image</code>) takes a required prompt plus <strong>up to 16 optional reference URLs</strong> and returns a Sunburst-styled edit. Same ratio set, resolution-billed pricing, and 1K-only background option as the other 2.5 workflows.'
  }
}

const workflowFaqMap = {
  '/home/gpt-image/v2-text-to-image': [
    {
      question: 'What resolution options does GPT Image v2 text-to-image support?',
      answer:
        'Three resolution tiers: <strong>1K</strong> (fast, 6 credits), <strong>2K</strong> (balanced, 9 credits), and <strong>4K</strong> (maximum detail, 12 credits). 4K is not available with the 1:1 aspect ratio. "Auto" aspect ratio requires 1K resolution.'
    },
    {
      question: 'What aspect ratios are available in GPT Image v2 text-to-image?',
      answer:
        'Six options: <strong>auto</strong> (optimized framing), <strong>1:1</strong> (square), <strong>9:16</strong> (portrait), <strong>16:9</strong> (landscape), <strong>4:3</strong>, and <strong>3:4</strong>. This is a significant expansion from v1.5\'s three ratios.'
    }
  ],
  '/home/gpt-image/v2-image-to-image': [
    {
      question: 'How many reference images can I upload for GPT Image v2 image-to-image?',
      answer:
        'Up to <strong>16 images</strong> (JPEG, PNG, or WebP, max 10MB each). This is a major upgrade from v1.5\'s single-image limit. Upload multiple images of the same subject from different angles or with different styles, and GPT Image v2 will fuse them into a coherent generation.'
    },
    {
      question: 'Does GPT Image v2 image-to-image support 4K resolution?',
      answer:
        'Yes, the v2 I2I workflow supports <strong>1K, 2K, and 4K</strong> resolution—same as the T2I workflow. Costs: 1K = <strong>6 credits</strong>, 2K = <strong>9 credits</strong>, 4K = <strong>12 credits</strong>. Note that 4K is unavailable with the 1:1 aspect ratio, and auto ratio requires 1K.'
    }
  ],
  '/home/gpt-image/v2-5-flare-text-to-image': [
    {
      question: 'How is GPT Image 2.5 Flare text-to-image priced?',
      answer:
        'By <strong>resolution</strong>: the tier you pick (1K, 2K or 4K) determines the credits charged, and the exact amount is shown on the Generate button before you submit. Aspect ratio and background do not change the price.'
    },
    {
      question: 'Which aspect ratios and background options does 2.5 Flare support?',
      answer:
        '<strong>13 ratios</strong>: auto, 1:1, 3:2, 2:3, 4:3, 3:4, 16:9, 9:16, 21:9, 27:16, 16:27, 9:8, 8:9. The four extreme ratios <strong>27:16, 16:27, 9:8, 8:9 are only available at 1K</strong>, and the optional <strong>background</strong> (transparent / opaque / auto) is likewise a 1K-only control.'
    }
  ],
  '/home/gpt-image/v2-5-flare-image-to-image': [
    {
      question: 'How many reference images can 2.5 Flare image-to-image accept?',
      answer:
        'Up to <strong>16 image URLs</strong> (JPEG, PNG, WebP, max 10MB each). The list is <strong>optional</strong>—the prompt is what the model requires—so you can edit existing visuals or let Flare compose from a loose set of references.'
    },
    {
      question: 'Does 2.5 Flare image-to-image support transparent backgrounds?',
      answer:
        'Yes, but only at <strong>1K resolution</strong>: choose <strong>transparent</strong>, <strong>opaque</strong>, or <strong>auto</strong> in the Background control. Leave it unset to use the server default. Switching to 2K or 4K clears the background selection automatically.'
    }
  ],
  '/home/gpt-image/v2-5-sunburst-text-to-image': [
    {
      question: 'When should I pick GPT Image 2.5 Sunburst over Flare for text-to-image?',
      answer:
        'Both share the same control surface (20000-char prompt, 13 ratios, 1K–4K resolution billing, 1K-only background), so treat them as <strong>two stylistic variants of the 2.5 family</strong>. Generate the same prompt on both and keep the output that matches your brief—credits follow the resolution tier you select.'
    },
    {
      question: 'Can I make ultra-wide banners with 2.5 Sunburst text-to-image?',
      answer:
        'Yes — use <strong>21:9</strong> at any resolution, or the extreme <strong>27:16</strong> / <strong>16:27</strong> / <strong>9:8</strong> / <strong>8:9</strong> ratios which are restricted to <strong>1K</strong>. The form disables those ratios automatically when you move to 2K or 4K.'
    }
  ],
  '/home/gpt-image/v2-5-sunburst-image-to-image': [
    {
      question: 'What inputs does 2.5 Sunburst image-to-image need?',
      answer:
        'A <strong>required prompt (≤20000 chars)</strong>, a <strong>required resolution tier (1K / 2K / 4K)</strong>, an optional aspect ratio (13 choices, default auto), and an optional list of <strong>up to 16 reference image URLs</strong>.'
    },
    {
      question: 'Why does my background option disappear when I change resolution?',
      answer:
        'The API only accepts <strong>background at 1K</strong>. When you select 2K or 4K the form clears background (and any 1K-only aspect ratio) so the request never fails server-side validation.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for GPT Image v2?',
    answer:
      'No—GPT Image v2 runs entirely in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How is GPT Image v2 priced on FuseAITools?',
    answer:
      'Credits depend on the selected resolution—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
  },
  {
    question: 'What is the difference between GPT Image v2 and the 2.5 Flare / Sunburst models?',
    answer:
      'All three keep the <strong>20000-character prompt</strong>, <strong>1K/2K/4K resolution billing</strong> and <strong>up to 16 references</strong> in image-to-image. The <strong>2.5</strong> families expand framing from six to <strong>13 aspect ratios</strong> and add an optional <strong>background</strong> control (transparent / opaque / auto) that is available only at 1K.'
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
    icon: '📝',
    title: '20000-Character Prompts',
    description:
      'Dramatically increased prompt capacity from v1.5—write <strong>detailed scene descriptions, multi-paragraph instructions, or storyboard treatments</strong> that the model follows with precision.'
  },
  {
    icon: '🔍',
    title: '1K / 2K / 4K Resolution',
    description:
      'Select your output resolution: <strong>1K</strong> for fast drafts, <strong>2K</strong> for standard quality, or <strong>4K</strong> for maximum detail. Credit costs scale with resolution: 6 / 9 / 12 respectively.'
  },
  {
    icon: '🖼️',
    title: 'Six Aspect Ratios + Auto',
    description:
      'Choose from <strong>auto, 1:1, 9:16, 16:9, 4:3, 3:4</strong>—covers everything from vertical social posts to cinematic landscape framing. The "auto" option optimizes framing for your content.'
  },
  {
    icon: '📐',
    title: '13 Ratios on 2.5 Flare / Sunburst',
    description:
      'The 2.5 models add <strong>3:2, 2:3, 21:9, 27:16, 16:27, 9:8, 8:9</strong> to the v2 set—<strong>13 aspect ratios</strong> in total. The four extreme ratios are gated to <strong>1K</strong> and are disabled in the form at 2K / 4K.'
  },
  {
    icon: '🎨',
    title: 'Background Control at 1K',
    description:
      '2.5 Flare and Sunburst accept an optional <strong>transparent / opaque / auto</strong> background, making cut-out-ready assets without a separate matting step. Only available at <strong>1K</strong>; unset it to keep the server default.'
  },
  {
    icon: '🔄',
    title: 'Multi-Reference Editing (≤16)',
    description:
      'Upload <strong>up to 16 images</strong> in the I2I workflow and prompt GPT Image v2 to fuse visual elements from all references into a single coherent generation.'
  }
]

const scenarioTags = [
  'Long-form creative & storytelling',
  'High-resolution print assets',
  'Cinematic & ultra-wide banners',
  'Multi-reference style fusion',
  'Transparent-background product cut-outs',
  'Social & marketing content at scale'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

const V25_PATHS = [
  '/home/gpt-image/v2-5-flare-text-to-image',
  '/home/gpt-image/v2-5-flare-image-to-image',
  '/home/gpt-image/v2-5-sunburst-text-to-image',
  '/home/gpt-image/v2-5-sunburst-image-to-image'
]

watchRouteScroll((path) =>
  path === '/home/gpt-image/v2-text-to-image'
  || path === '/home/gpt-image/v2-image-to-image'
  || V25_PATHS.includes(path)
)

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
