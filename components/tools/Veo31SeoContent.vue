<template>
  <div
    id="veo31-section"
    class="veo-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Veo 3.1 Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Veo 3.1 text, first/last frames, reference-to-video, and extend workflows on FuseAITools—Google DeepMind video with Standard or Fast models."
    />

    <div class="version-badge">🎬 Veo 3.1 · Google DeepMind · Four Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎬 Veo 3.1 on FuseAITools</h2>
      <p class="tool-sub">
        Veo 3.1 on <a href="/" class="seo-inline-link">FuseAITools</a> brings
        <strong>Google DeepMind video generation</strong> to the browser—text-to-video, keyframe animation,
        reference-driven clips, and video extension in one tool stack. Choose
        <strong>Standard (veo3)</strong> for higher quality or <strong>Fast (veo3_fast)</strong> for quicker previews.
        New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Veo 3.1 Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Veo 3.1 Standard vs Fast</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Veo 3.1 Standard vs Fast">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Standard (veo3)</th>
              <th>Fast (veo3_fast)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Quality</td>
              <td><strong>Higher fidelity</strong>—best for final output</td>
              <td>Optimized for speed—ideal for iteration</td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>Longer generation time</td>
              <td><strong>Faster turnaround</strong> for previews</td>
            </tr>
            <tr>
              <td>Workflows</td>
              <td colspan="2"><strong>Text, first/last frames, reference-to-video</strong></td>
            </tr>
            <tr>
              <td>Aspect ratio</td>
              <td colspan="2"><strong>16:9, 9:16, Auto</strong>—16:9 supports 1080P upgrade</td>
            </tr>
            <tr>
              <td>Prompt length</td>
              <td colspan="2">Up to <strong>1000 characters</strong> with optional English translation</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Veo 3.1)</h2>
      <div class="faq-list" itemscope itemtype="https://schema.org/FAQPage">
        <div
          v-for="(faq, index) in faqItems"
          :key="index"
          class="faq-item"
          :class="{ open: openFaqIndex === index }"
          itemscope
          itemprop="mainEntity"
          itemtype="https://schema.org/Question"
        >
          <button
            type="button"
            class="faq-question"
            :aria-expanded="openFaqIndex === index"
            @click="toggleFaq(index)"
          >
            <span itemprop="name">{{ faq.question }}</span>
            <span class="faq-toggle" aria-hidden="true">{{ openFaqIndex === index ? '➖' : '➕' }}</span>
          </button>
          <div
            v-show="openFaqIndex === index"
            class="faq-answer"
            itemscope
            itemprop="acceptedAnswer"
            itemtype="https://schema.org/Answer"
          >
            <div itemprop="text" v-html="faq.answer" />
          </div>
        </div>
      </div>
    </section>

    <section class="info-section" aria-labelledby="tech-heading">
      <h2 id="tech-heading" class="section-title">⚙️ Veo 3.1 Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Veo 3.1 form and API (<code>veo3</code>, <code>veo3_fast</code>, <code>veo3_extend</code>).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Veo 3.1 workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Required input</th>
              <th>Model</th>
              <th>Aspect ratio</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Text to Video</strong></td>
              <td>Prompt (1–1000 chars)</td>
              <td>Standard / Fast</td>
              <td>16:9, 9:16, Auto</td>
              <td>Translation, seed, watermark</td>
            </tr>
            <tr>
              <td><strong>First & Last Frames</strong></td>
              <td>Prompt + 1–2 images</td>
              <td>Standard / Fast</td>
              <td>16:9, 9:16, Auto</td>
              <td>1 image = orbit; 2 = start/end keyframes</td>
            </tr>
            <tr>
              <td><strong>Reference to Video</strong></td>
              <td>Prompt + 1–3 reference images</td>
              <td>Fast (default)</td>
              <td>Follows references</td>
              <td>Translation, seed, watermark</td>
            </tr>
            <tr>
              <td><strong>Video Extend</strong></td>
              <td>Prior Veo3 task + extension prompt</td>
              <td>veo3_extend</td>
              <td>—</td>
              <td>Seed, watermark; 1080P clips not extendable</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Image inputs: JPG/PNG (max 10MB). After generation, use <strong>Get 1080P</strong> on 16:9 outputs. Credits are shown on the Generate button before submission.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Veo 3.1 — Four Video Workflows</h2>
      <p class="section-lead">Choose the mode that matches your source material:</p>
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
      for Veo 3.1 per-generation costs.
    </div>

    <div class="upgrade-tip">
      🎬 Need ByteDance-style multi-shot video?
      <a
        href="/home/seedance/v2"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedance/v2')"
      >Explore Seedance v2 →</a>
      for fast text and image-to-video workflows alongside Veo 3.1.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  {
    name: 'Veo 3.1 Text to Video',
    title: 'Text to Video',
    description: 'Describe scenes in up to 1000 characters—Standard or Fast, 16:9/9:16/Auto, optional translation.',
    path: '/home/veo3/text-to-video',
    icon: 'fas fa-font'
  },
  {
    name: 'Veo 3.1 First & Last Frames',
    title: 'First & Last Frames',
    description: 'Upload 1–2 keyframe images and animate the transition with a motion prompt.',
    path: '/home/veo3/first-and-last-to-video',
    icon: 'fas fa-images'
  },
  {
    name: 'Veo 3.1 Reference to Video',
    title: 'Image to Video',
    description: '1–3 reference images plus prompt—AI generates video content guided by your stills.',
    path: '/home/veo3/reference-to-video',
    icon: 'fas fa-image'
  },
  {
    name: 'Veo 3.1 Video Extend',
    title: 'Video Extend',
    description: 'Continue a prior Veo3 clip with an extension prompt—select from completed tasks.',
    path: '/home/veo3/extend',
    icon: 'fas fa-expand-arrows-alt'
  }
]

const workflowIntroMap = {
  '/home/veo3/text-to-video': {
    title: '📝 Veo 3.1 Text to Video',
    lead: 'Describe video content in up to <strong>1000 characters</strong>—choose <strong>Standard (veo3)</strong> or <strong>Fast (veo3_fast)</strong>, set aspect ratio <strong>16:9, 9:16, or Auto</strong>, and optionally enable English translation for better results.'
  },
  '/home/veo3/first-and-last-to-video': {
    title: '🖼️ Veo 3.1 First & Last Frames to Video',
    lead: 'Upload <strong>1–2 keyframe images</strong> and describe the motion between them. One image orbits around the subject; two images define start and end frames for a smooth transition video.'
  },
  '/home/veo3/reference-to-video': {
    title: '🎞️ Veo 3.1 Reference to Video',
    lead: 'Provide <strong>1–3 reference images</strong> plus a prompt—Veo 3.1 generates video content guided by your stills. Uses the <strong>Fast</strong> model by default for responsive image-to-video output.'
  },
  '/home/veo3/extend': {
    title: '⏩ Veo 3.1 Video Extend',
    lead: 'Select a <strong>completed Veo3 generation task</strong> and describe how to extend the clip. Uses the <strong>veo3_extend</strong> model—note that videos upgraded to 1080P cannot be extended.'
  }
}

const workflowDefinitionMap = {
  '/home/veo3/text-to-video': {
    title: 'What is Veo 3.1 Text to Video?',
    body:
      '<strong>Veo 3.1 Text to Video</strong> on FuseAITools turns a prompt (1–1000 characters) into a short video clip via Google DeepMind. Pick <strong>Standard or Fast</strong>, aspect ratio <strong>16:9, 9:16, or Auto</strong>, optional seed (10000–99999), watermark, and automatic English translation—ideal for cinematic previews and social content.'
  },
  '/home/veo3/first-and-last-to-video': {
    title: 'What is Veo 3.1 First & Last Frames to Video?',
    body:
      '<strong>Veo 3.1 First & Last Frames</strong> on FuseAITools animates between <strong>1–2 uploaded images</strong> with a motion prompt. With one image, the camera can orbit around the subject; with two, the first image is the opening frame and the second is the closing frame—built for keyframe-accurate transitions.'
  },
  '/home/veo3/reference-to-video': {
    title: 'What is Veo 3.1 Reference to Video?',
    body:
      '<strong>Veo 3.1 Reference to Video</strong> on FuseAITools generates video from <strong>1–3 reference images</strong> plus a required prompt (1–1000 characters). The model follows visual cues from your stills—useful for character-consistent clips and scene prototyping.'
  },
  '/home/veo3/extend': {
    title: 'What is Veo 3.1 Video Extend?',
    body:
      '<strong>Veo 3.1 Video Extend</strong> on FuseAITools continues a previously generated Veo3 clip. Select an eligible task from your history, describe the extension in a prompt, and submit via <strong>veo3_extend</strong>. Clips that have been upgraded to 1080P are not eligible for extension.'
  }
}

const workflowFaqMap = {
  '/home/veo3/text-to-video': [
    {
      question: 'What aspect ratios does Veo 3.1 text-to-video support?',
      answer:
        'Choose <strong>16:9, 9:16, or Auto</strong> in the form. <strong>16:9</strong> supports a post-generation <strong>1080P upgrade</strong> via the Get 1080P button.'
    },
    {
      question: 'Should I use Standard or Fast for Veo 3.1 text-to-video?',
      answer:
        'Use <strong>Fast (veo3_fast)</strong> for quick previews and iteration; switch to <strong>Standard (veo3)</strong> when you need higher quality for final output.'
    }
  ],
  '/home/veo3/first-and-last-to-video': [
    {
      question: 'How many images can I upload for first/last frames?',
      answer:
        'Between <strong>1 and 2 images</strong>. One image creates an orbit-style shot; two images define the opening and closing keyframes for a transition video.'
    },
    {
      question: 'Does first/last frames support 1080P on Veo 3.1?',
      answer:
        'Yes—select <strong>16:9</strong> aspect ratio and use the <strong>Get 1080P</strong> button after generation completes successfully.'
    }
  ],
  '/home/veo3/reference-to-video': [
    {
      question: 'How many reference images does Veo 3.1 support?',
      answer:
        'Upload <strong>1–3 reference images</strong> (JPG/PNG, max 10MB each) along with a required prompt up to 1000 characters.'
    },
    {
      question: 'Which model is used for Veo 3.1 reference-to-video?',
      answer:
        'Reference-to-video defaults to the <strong>Fast (veo3_fast)</strong> model for responsive image-guided generation.'
    }
  ],
  '/home/veo3/extend': [
    {
      question: 'Which tasks can be extended with Veo 3.1?',
      answer:
        'Only tasks <strong>completed with Veo3 video generation</strong> appear in the Original Task dropdown. Videos that have been upgraded to <strong>1080P</strong> cannot be extended.'
    },
    {
      question: 'How is Veo 3.1 video extend priced?',
      answer:
        'Extension uses the <strong>veo3_extend</strong> model—credits are shown on the Generate button before you submit.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Veo 3.1?',
    answer:
      'No—Veo 3.1 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How is Veo 3.1 priced on FuseAITools?',
    answer:
      'Generate modes bill per video at the model you select—exact credits appear on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
    title: 'Google DeepMind Video',
    description:
      'Veo 3.1 delivers cinematic motion from text or images—<strong>Standard</strong> for quality, <strong>Fast</strong> for speed.'
  },
  {
    icon: '🖼️',
    title: 'Keyframe & Reference Modes',
    description:
      'Animate <strong>1–2 keyframes</strong> or guide generation with <strong>1–3 reference images</strong> plus a motion prompt.'
  },
  {
    icon: '⏩',
    title: 'Video Extension',
    description:
      'Continue prior Veo3 clips with natural-language extension prompts via <strong>veo3_extend</strong>.'
  },
  {
    icon: '☁️',
    title: 'Cloud on FuseAITools',
    description:
      'Four workflows in the browser—<strong>credits shown before generate</strong>; optional 1080P upgrade on 16:9 outputs.'
  }
]

const scenarioTags = [
  'Cinematic previews',
  'Social & vertical video',
  'Product reveal animations',
  'Keyframe-driven motion',
  'Clip extension & continuity'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path.startsWith('/home/veo3'))

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
