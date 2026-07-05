<template>
  <div
    id="runway-section"
    class="runway-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Runway Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Runway Generate, Extend, and Aleph on FuseAITools—text or image to video, continuation on prior tasks, and style transform on uploaded clips at 720p/1080p."
    />

    <div class="version-badge">🎬 Runway · Gen-3 Video · Three Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎬 Runway on FuseAITools</h2>
      <p class="tool-sub">
        <strong>Runway</strong> on
        <a href="/" class="seo-inline-link">FuseAITools</a> covers the full short-video lifecycle—
        <strong>Generate</strong> from text or a reference still,
        <strong>Extend</strong> a completed generate task forward or backward, and
        <strong>Aleph</strong> to restyle uploaded footage while preserving motion structure.
        Credits appear on each Generate button before submission. New users receive
        <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Runway Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Runway Workflows Compared</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Runway generate, extend, and aleph comparison">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Generate</th>
              <th>Extend</th>
              <th>Aleph</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Input</strong></td>
              <td>Prompt (+ optional image)</td>
              <td>Runway generate task ID + prompt</td>
              <td>Uploaded video + prompt (+ optional reference image)</td>
            </tr>
            <tr>
              <td><strong>modelKey</strong></td>
              <td><code>runway_generate</code></td>
              <td><code>runway_extend</code></td>
              <td><code>runway_aleph</code></td>
            </tr>
            <tr>
              <td><strong>Duration</strong></td>
              <td>5s or 10s</td>
              <td>Matches source clip</td>
              <td>Inherits source length</td>
            </tr>
            <tr>
              <td><strong>Resolution</strong></td>
              <td>720p / 1080p*</td>
              <td>720p / 1080p</td>
              <td>—</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>Text-to-video or image animation from scratch</td>
              <td>Continue a Runway generate render</td>
              <td>Style transfer and scene transform on existing video</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">*10-second Generate clips do not support 1080p in the form.</p>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Runway)</h2>
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
          <div v-show="openFaqIndex === index" class="faq-answer">
            <div v-html="faq.answer" />
          </div>
        </div>
      </div>
    </section>

    <section class="info-section" aria-labelledby="tech-heading">
      <h2 id="tech-heading" class="section-title">⚙️ Runway Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Runway form and API (<code>runway_*</code> models).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Runway workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Required input</th>
              <th>Duration</th>
              <th>Resolution / ratio</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Generate</strong></td>
              <td>Prompt (≤1800 chars); optional 1 image (JPG/PNG, max 10MB)</td>
              <td>5s or 10s</td>
              <td>720p / 1080p; aspect 16:9, 4:3, 1:1, 3:4, 9:16 when no image</td>
              <td>Optional watermark text</td>
            </tr>
            <tr>
              <td><strong>Extend</strong></td>
              <td>Completed <code>runway_generate</code> task ID + prompt (≤1000)</td>
              <td>Matches source</td>
              <td>720p / 1080p</td>
              <td>Watermark (max 50 chars)</td>
            </tr>
            <tr>
              <td><strong>Aleph</strong></td>
              <td>Video URL (MP4/MOV/AVI, max 10MB) + prompt</td>
              <td>Inherits source</td>
              <td>Aspect 16:9, 9:16, 4:3, 3:4, 1:1, 21:9</td>
              <td>Optional reference image; seed; watermark (max 20 chars)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Generate: RULE credits by <strong>duration</strong> + <strong>quality</strong>. Extend and Aleph: per-run credits on Generate.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Runway — Three Video Workflows</h2>
      <p class="section-lead">Typical pipeline: Generate → Extend → Aleph (optional restyle).</p>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in videoWorkflows"
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
      🎬 Typical Runway pipeline:
      <a href="/home/runway/generate" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/runway/generate')">Generate →</a>
      <a href="/home/runway/extend" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/runway/extend')">Extend →</a>
      <a href="/home/runway/aleph" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/runway/aleph')">Aleph</a>
      for style transforms on uploaded footage.
    </div>

    <div class="upgrade-tip">
      🎥 Need Google Veo 3 reference-to-video or first/last-frame control?
      <a href="/home/veo3/text-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/veo3/text-to-video')">Explore Veo 3 →</a>
      for multi-mode cinematic generation on FuseAITools.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  {
    name: 'Runway Generate',
    title: 'Generate',
    description: 'Text or optional reference image to 5s/10s clips at 720p/1080p.',
    path: '/home/runway/generate',
    icon: 'fas fa-video'
  },
  {
    name: 'Runway Extend',
    title: 'Extend',
    description: 'Continue a completed Runway generate task with a continuation prompt.',
    path: '/home/runway/extend',
    icon: 'fas fa-expand'
  },
  {
    name: 'Runway Aleph',
    title: 'Aleph',
    description: 'Transform uploaded video with style prompts—optional reference still and seed.',
    path: '/home/runway/aleph',
    icon: 'fas fa-magic'
  }
]

const workflowIntroMap = {
  '/home/runway/generate': {
    title: '🎬 Runway Generate',
    lead: 'Describe your scene in a <strong>prompt</strong> (≤1800 characters), pick <strong>5 or 10 seconds</strong>, and choose <strong>720p or 1080p</strong>. Optionally upload one reference image to animate a still—set aspect ratio when no image is provided.'
  },
  '/home/runway/extend': {
    title: '➡️ Runway Extend',
    lead: 'Select a <strong>completed Runway Generate task</strong> from your history, then write a continuation <strong>prompt</strong> (≤1000 characters). Output resolution is <strong>720p or 1080p</strong>—ideal for lengthening a clip you already rendered with Generate.'
  },
  '/home/runway/aleph': {
    title: '✨ Runway Aleph',
    lead: 'Upload a <strong>source video</strong> (MP4/MOV/AVI, max 10MB) and describe the style or scene transform in a <strong>prompt</strong>. Optionally add a reference image, aspect ratio, and seed for reproducible Aleph output.'
  }
}

const workflowDefinitionMap = {
  '/home/runway/generate': {
    title: 'What is Runway Generate?',
    body:
      '<strong>Runway Generate</strong> on FuseAITools creates short MP4 clips from a required <strong>prompt (≤1800 chars)</strong>. Choose <strong>5s or 10s</strong> duration and <strong>720p or 1080p</strong>—note that <strong>10s clips cannot use 1080p</strong>. Without a reference image, pick aspect ratios <strong>16:9, 4:3, 1:1, 3:4, or 9:16</strong>. Optional: one JPG/PNG reference image (max 10MB) and custom watermark text.'
  },
  '/home/runway/extend': {
    title: 'What is Runway Extend?',
    body:
      '<strong>Runway Extend</strong> on FuseAITools continues a clip produced by <strong>Runway Generate</strong>. Required: a valid <strong>task ID</strong> from your completed generate jobs (listed in the Task dropdown) plus a <strong>prompt (≤1000 chars)</strong>. Choose <strong>720p or 1080p</strong> output quality. Arbitrary video uploads are not accepted—only prior Runway generate tasks.'
  },
  '/home/runway/aleph': {
    title: 'What is Runway Aleph?',
    body:
      '<strong>Runway Aleph</strong> on FuseAITools restyles an uploaded <strong>video URL</strong> (MP4/MOV/AVI, max 10MB) guided by a <strong>prompt</strong>. Output length matches the source. Set aspect ratio (<strong>16:9, 9:16, 4:3, 3:4, 1:1, 21:9</strong>), optional reference image, optional <strong>seed</strong>, and watermark (≤20 characters). Focus prompts on transformations rather than describing content already in the clip.'
  }
}

const workflowFaqMap = {
  '/home/runway/generate': [
    {
      question: 'Can Runway Generate animate a still image?',
      answer:
        'Yes—upload an <strong>optional reference image</strong> (JPG/PNG, max 10MB). The model animates or extends that still while following your prompt. Aspect ratio controls hide when an image is attached.'
    },
    {
      question: 'Why is 1080p disabled for 10-second Runway Generate clips?',
      answer:
        'The form enforces Runway’s constraint: <strong>10-second outputs support 720p only</strong>. Choose <strong>5 seconds</strong> if you need <strong>1080p</strong> resolution.'
    }
  ],
  '/home/runway/extend': [
    {
      question: 'Which tasks can I extend with Runway Extend?',
      answer:
        'Only tasks completed with <strong>Runway Generate</strong> (<code>runway_generate</code>) appear in the Task dropdown. Uploads from other tools or Aleph outputs are not eligible unless they were produced through Generate on this account.'
    },
    {
      question: 'How long can a Runway Extend prompt be?',
      answer:
        'Up to <strong>1000 characters</strong>. Describe what should happen next while staying consistent with the original clip’s style and motion.'
    }
  ],
  '/home/runway/aleph': [
    {
      question: 'What video formats does Runway Aleph accept?',
      answer:
        'MP4, MOV, or AVI up to <strong>10MB</strong>. The clip is uploaded to cloud storage before submission; output duration matches the source video length.'
    },
    {
      question: 'How should I write prompts for Runway Aleph?',
      answer:
        'Describe <strong>style changes and transformations</strong>—lighting, atmosphere, camera motion, effects—not the literal content already visible. Example: “Transform into dreamy watercolor with soft flowing motion.”'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Runway on FuseAITools?',
    answer:
      'No—Runway runs in the cloud. Use any modern browser; credits are charged per successful generation. New users receive <strong>20 free credits</strong> on sign-up.'
  },
  {
    question: 'How is Runway priced on FuseAITools?',
    answer:
      '<strong>Generate</strong> bills by <strong>duration and quality</strong> (RULE pricing)—credits show on the button before you submit. <strong>Extend</strong> and <strong>Aleph</strong> use per-run credits. See <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
    icon: '🎬',
    title: 'Text & Image to Video',
    description:
      'Generate <strong>5s or 10s</strong> clips from a prompt—with optional reference still for image-to-video at <strong>720p/1080p</strong>.'
  },
  {
    icon: '➡️',
    title: 'Task-Based Extend',
    description:
      'Continue a <strong>Runway Generate</strong> render with a continuation prompt—seamless style-consistent lengthening.'
  },
  {
    icon: '✨',
    title: 'Aleph Style Transform',
    description:
      'Restyle uploaded footage with transformation prompts—optional reference image, seed, and six aspect ratios.'
  },
  {
    icon: '☁️',
    title: 'Cloud on FuseAITools',
    description:
      'Three Runway workflows in the browser—<strong>credits shown before generate</strong>; no local GPU required.'
  }
]

const scenarioTags = [
  'Social & ad short-form video',
  'Storyboard & pre-visualization',
  'Image-to-motion promos',
  'Clip continuation & loops',
  'Style transfer on existing footage'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) =>
  path === '/home/runway/generate' ||
  path === '/home/runway/extend' ||
  path === '/home/runway/aleph'
)

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
