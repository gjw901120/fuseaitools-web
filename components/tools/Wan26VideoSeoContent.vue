<template>
  <div
    id="wan-26-section"
    class="wan-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Wan 2.6 Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Wan 2.6 text, image, and video-to-video workflows on FuseAITools—multi-shot clips up to 15s at 720p or 1080p."
    />

    <div class="version-badge">🎭 Wan 2.6 · Role-Play & Multi-Shot Video · January 2026</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎭 Wan 2.6 on FuseAITools</h2>
      <p class="tool-sub">
        Wan 2.6 on <a href="/" class="seo-inline-link">FuseAITools</a> focuses on
        <strong>role-play style video</strong> with multi-shot storytelling and strong subject consistency.
        Choose text-to-video, image-to-video, or video-to-video—each runs in the cloud with
        <strong>credit-based pricing</strong> and no local GPU.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Wan 2.6 Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Wan 2.6 vs Traditional Text-to-Video</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Wan 2.6 vs traditional text-to-video">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Wan 2.6</th>
              <th>Traditional text-to-video</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Inputs</td>
              <td><strong>Text, images, or source video</strong></td>
              <td>Text only (or image in separate tools)</td>
            </tr>
            <tr>
              <td>Shot control</td>
              <td><strong>Single or multi-shot</strong> composition</td>
              <td>Usually single continuous clip</td>
            </tr>
            <tr>
              <td>Output length</td>
              <td><strong>5–15s</strong> at 720p / 1080p</td>
              <td>Often 3–10s, fixed tiers</td>
            </tr>
            <tr>
              <td>On FuseAITools</td>
              <td>Three 2.6 workflows + Wan 2.7 upgrade path</td>
              <td>Separate tools per modality</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Wan 2.6)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Wan 2.6 Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Wan 2.6 form and API (<code>wan-2-6-*</code> models).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Wan 2.6 video workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Required input</th>
              <th>Duration</th>
              <th>Resolution</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Text to Video</strong></td>
              <td>Prompt (1–5000 chars)</td>
              <td>5 / 10 / 15s</td>
              <td>720p / 1080p</td>
              <td>Multi-shot on/off</td>
            </tr>
            <tr>
              <td><strong>Image to Video</strong></td>
              <td>Image URL(s) + prompt</td>
              <td>5 / 10 / 15s</td>
              <td>720p / 1080p</td>
              <td>Multi-shot on/off</td>
            </tr>
            <tr>
              <td><strong>Video to Video</strong></td>
              <td>Video URL + prompt</td>
              <td>5 / 10s*</td>
              <td>720p / 1080p</td>
              <td>Multi-shot; style/transform prompt</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        * Selecting 15s in the UI for video-to-video is submitted as <strong>10s</strong> to the API.
        Image inputs: JPEG, PNG, WebP (min 256×256px). Video input: MP4, MOV, MKV (max 10MB).
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Wan 2.6 — Three Video Workflows</h2>
      <p class="section-lead">Pick the workflow that matches your source material:</p>
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
      for per-generation credit costs on Wan 2.6.
    </div>

    <div class="upgrade-tip">
      🖼️ <strong>Wan image companion</strong>
      Create stills and keyframes with
      <a
        href="/home/wan/2-7-image"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/wan/2-7-image')"
      >Wan 2.7 Image</a>
      or
      <a
        href="/home/wan/2-7-image-pro"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/wan/2-7-image-pro')"
      >Image Pro (4K)</a>
      before animating in Wan 2.6 Image to Video.
    </div>

    <div class="upgrade-tip">
      💡 Want director-level control? Try
      <a
        href="/home/wan/v2-7-text-to-video"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/wan/v2-7-text-to-video')"
      >Wan 2.7 →</a>
      —natural-language video edit, up to 5 references (R2V), and finer prompt controls.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  {
    name: 'Wan 2.6 Text to Video',
    title: 'Text to Video',
    description: 'Prompt-only generation with 5/10/15s output and multi-shot composition.',
    path: '/home/wan/text-to-video',
    icon: 'fas fa-font'
  },
  {
    name: 'Wan 2.6 Image to Video',
    title: 'Image to Video',
    description: 'Upload stills plus a motion prompt—animate products, avatars, and art.',
    path: '/home/wan/image-to-video',
    icon: 'fas fa-image'
  },
  {
    name: 'Wan 2.6 Video to Video',
    title: 'Video to Video',
    description: 'Upload footage and restyle or transform it with a new prompt (5/10s output).',
    path: '/home/wan/video-to-video',
    icon: 'fas fa-video'
  }
]

const workflowIntroMap = {
  '/home/wan/text-to-video': {
    title: '📝 Wan 2.6 Text to Video',
    lead: 'Describe scenes in natural language—Wan 2.6 builds <strong>single or multi-shot</strong> clips with subject consistency. Set duration (5/10/15s) and 720p or 1080p without filming.'
  },
  '/home/wan/image-to-video': {
    title: '🖼️ Wan 2.6 Image to Video',
    lead: 'Upload one or more still images and guide motion with a prompt. Wan 2.6 animates while keeping <strong>look and style</strong> stable—ideal for product heroes and character teasers.'
  },
  '/home/wan/video-to-video': {
    title: '🎬 Wan 2.6 Video to Video',
    lead: 'Upload a source clip (MP4, MOV, MKV) and describe the transformation—<strong>restyle, mood, or content changes</strong> with a new prompt. Output is 5 or 10 seconds at 720p/1080p (15s UI maps to 10s API).'
  }
}

const workflowDefinitionMap = {
  '/home/wan/text-to-video': {
    title: 'What is Wan 2.6 Text to Video?',
    body:
      '<strong>Wan 2.6 Text to Video</strong> on FuseAITools turns a text prompt into a short MP4 clip. It supports <strong>5, 10, or 15 second</strong> duration, <strong>720p or 1080p</strong>, and <strong>single or multi-shot</strong> composition—built for social clips and story beats without a camera crew.'
  },
  '/home/wan/image-to-video': {
    title: 'What is Wan 2.6 Image to Video?',
    body:
      '<strong>Wan 2.6 Image to Video</strong> on FuseAITools animates your still images with a motion prompt. Upload image URL(s), choose <strong>5/10/15s</strong> and <strong>720p/1080p</strong>, and toggle <strong>multi-shot</strong> for narrative transitions—ideal for product demos and illustrated characters.'
  },
  '/home/wan/video-to-video': {
    title: 'What is Wan 2.6 Video to Video?',
    body:
      '<strong>Wan 2.6 Video to Video</strong> on FuseAITools transforms an uploaded video with a new prompt—restyle footage, shift mood, or adapt content for another channel. Output length is <strong>5 or 10 seconds</strong> at <strong>720p/1080p</strong> (the 15s control maps to 10s in the API).'
  }
}

const workflowFaqMap = {
  '/home/wan/text-to-video': [
    {
      question: 'How does Wan 2.6 text-to-video work on FuseAITools?',
      answer:
        'Yes—enter a prompt (1–5000 characters), pick <strong>5, 10, or 15 seconds</strong>, choose <strong>720p or 1080p</strong>, and enable or disable <strong>multi-shot</strong>. The model returns an MP4 you can download from your generation history.'
    },
    {
      question: 'What is multi-shot mode in Wan 2.6 text-to-video?',
      answer:
        'Multi-shot mode tells Wan 2.6 to plan <strong>multiple shots with transitions</strong> instead of one continuous take—useful for short story beats and social narratives.'
    }
  ],
  '/home/wan/image-to-video': [
    {
      question: 'What images can I use for Wan 2.6 image-to-video?',
      answer:
        'Upload image URL(s) in <strong>JPEG, PNG, or WebP</strong> (minimum <strong>256×256px</strong>, max <strong>10MB</strong> per file). Add a prompt describing motion, then set duration, resolution, and multi-shot like text-to-video.'
    },
    {
      question: 'Do I need a prompt for Wan 2.6 image-to-video?',
      answer:
        'Yes—a prompt (1–5000 characters) guides how the stills move. Without clear motion direction, results may look static or off-brief.'
    }
  ],
  '/home/wan/video-to-video': [
    {
      question: 'How does Wan 2.6 video-to-video differ from Wan 2.7 R2V?',
      answer:
        'Wan 2.6 video-to-video <strong>transforms one uploaded clip</strong> with a prompt (5/10s output). Wan 2.7 <strong>R2V</strong> combines up to <strong>5 reference images/videos</strong> to lock multiple characters—use R2V for ensemble role-play scenes.'
    },
    {
      question: 'Why does Wan 2.6 video-to-video show 15 seconds but output 10?',
      answer:
        'The form may show 15s for consistency with other 2.6 modes, but the API maps that choice to <strong>10 seconds</strong> for video-to-video. Pick <strong>5s</strong> or <strong>10s</strong> when you need an exact length.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU to run Wan 2.6?',
    answer:
      'No. Wan 2.6 runs entirely in the cloud on FuseAITools—use any modern browser; no CUDA or local install required.'
  },
  {
    question: 'How do I try Wan 2.6 on FuseAITools?',
    answer:
      'Open any Wan 2.6 workflow above and generate. New users receive <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for credit packs and member rates.'
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
    title: 'Multi-Shot Composition',
    description:
      'Toggle <strong>single or multi-shot</strong> on text, image, and video-to-video—plan short narratives without an edit timeline.'
  },
  {
    icon: '🖼️',
    title: 'Three Input Modes',
    description:
      'Start from <strong>text</strong>, <strong>still images</strong>, or <strong>existing footage</strong>—pick the workflow that matches your asset.'
  },
  {
    icon: '⏱️',
    title: 'Flexible Duration',
    description:
      'Export <strong>5, 10, or 15 second</strong> clips (video-to-video: 5/10s effective) at <strong>720p or 1080p</strong>.'
  },
  {
    icon: '☁️',
    title: 'Cloud on FuseAITools',
    description:
      'No GPU setup—pay per generation with <strong>credits</strong> and switch to <strong>Wan 2.7</strong> when you need editing or R2V.'
  }
]

const scenarioTags = [
  'Social shorts & reels',
  'Product motion from stills',
  'Video restyle & remix',
  'Storyboard previews',
  'Quick ad concepts'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll(
  (path) => path.startsWith('/home/wan/') && !path.includes('v2-7') && !path.includes('2-7-image')
)

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
