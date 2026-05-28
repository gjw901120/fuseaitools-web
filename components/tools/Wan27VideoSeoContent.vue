<template>
  <div
    id="wan-27-section"
    class="wan-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Wan 2.7 Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Wan 2.7 text, image, video edit, and R2V workflows on FuseAITools—2–15s clips, natural-language editing, up to 5 references."
    />

    <div class="version-badge">🎬 Wan 2.7 · Direct & Perform · Full Video Pipeline · April 2026</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎬 Wan 2.7 on FuseAITools</h2>
      <p class="tool-sub">
        Wan 2.7 on <a href="/" class="seo-inline-link">FuseAITools</a> is the director-grade stack:
        <strong>generate, edit, and reference-lock</strong> in one browser workflow.
        Move from quick Wan 2.6 clips to <strong>natural-language video edit</strong>,
        <strong>first/last frame</strong> control, and <strong>multi-reference R2V</strong> when production needs more precision.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Wan 2.7 Core Features</h2>
      <div class="feature-grid">
        <div v-for="(f, i) in coreFeatures" :key="i" class="feature-card">
          <div class="feature-icon" aria-hidden="true">{{ f.icon }}</div>
          <div class="feature-title">{{ f.title }}</div>
          <p v-html="f.description" />
        </div>
      </div>
    </section>

    <section class="info-section" aria-labelledby="scenarios-heading">
      <h2 id="scenarios-heading" class="section-title">🎯 Built for Professional Production</h2>
      <div class="scenario-list">
        <span v-for="tag in scenarioTags" :key="tag" class="scenario-badge">{{ tag }}</span>
      </div>
    </section>

    <section class="info-section" aria-labelledby="compare-heading">
      <h2 id="compare-heading" class="section-title">📊 Wan 2.7 vs Wan 2.6</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Wan 2.7 vs Wan 2.6">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Wan 2.6</th>
              <th>Wan 2.7</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Video edit</td>
              <td>—</td>
              <td><strong>Natural-language Video Edit</strong></td>
            </tr>
            <tr>
              <td>References (R2V)</td>
              <td>Transform one source video (V2V)</td>
              <td><strong>Up to 5</strong> images/videos in R2V</td>
            </tr>
            <tr>
              <td>Frame control</td>
              <td>Image / video inputs</td>
              <td><strong>First & last frame</strong>, driving audio</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td>5–15s (2.6 video modes)</td>
              <td><strong>2–15s</strong> generate; edit <strong>0–10s</strong></td>
            </tr>
            <tr>
              <td>Prompt</td>
              <td>1–5000 chars (2.6)</td>
              <td><strong>3–5000</strong> chars + negative prompt</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Wan 2.7)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Wan 2.7 Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Wan 2.7 form and API (<code>wan-2-7-*</code> / <code>wan-2-7-videoedit</code>).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Wan 2.7 video workflow capabilities">
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
              <td><strong>Text to Video</strong></td>
              <td>Prompt (3–5000 chars)</td>
              <td>2–15s</td>
              <td>720p / 1080p; 16:9, 9:16, 1:1, 4:3, 3:4</td>
              <td>Negative prompt, audio URL, prompt extend, seed</td>
            </tr>
            <tr>
              <td><strong>Image to Video</strong></td>
              <td>Prompt + ≥1 of first/last frame, clip, or driving audio</td>
              <td>2–15s</td>
              <td>720p / 1080p</td>
              <td>First & last frame, driving audio, prompt extend</td>
            </tr>
            <tr>
              <td><strong>Video Edit</strong></td>
              <td>Video URL + prompt</td>
              <td>0 or 2–10s</td>
              <td>720p / 1080p; optional aspect ratio</td>
              <td>Reference image, audio setting (auto/origin)</td>
            </tr>
            <tr>
              <td><strong>R2V</strong></td>
              <td>Prompt + references (≤5 total)</td>
              <td>2–10s</td>
              <td>720p / 1080p; aspect ratio if no first frame</td>
              <td>Reference images/videos, optional voice lock</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        R2V accepts up to <strong>5</strong> combined reference images and videos. When a first frame is set, aspect ratio is omitted in the API.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Wan 2.7 — Four Video Workflows</h2>
      <p class="section-lead">Choose the mode that matches your production step:</p>
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
      for Wan 2.7 per-generation costs.
    </div>

    <div class="upgrade-tip">
      🎭 Prefer fast multi-shot clips from text or stills?
      <a
        href="/home/wan/text-to-video"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/wan/text-to-video')"
      >Wan 2.6 workflows</a>
      remain available for lightweight generation.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  {
    name: 'Wan 2.7 Text to Video',
    title: 'Text to Video',
    description: '2–15s clips from prompts with aspect ratio, optional audio, and prompt extend.',
    path: '/home/wan/v2-7-text-to-video',
    icon: 'fas fa-font'
  },
  {
    name: 'Wan 2.7 Image to Video',
    title: 'Image to Video',
    description: 'First/last frame, driving audio, or reference clip—precise motion control.',
    path: '/home/wan/v2-7-image-to-video',
    icon: 'fas fa-images'
  },
  {
    name: 'Wan 2.7 Video Edit',
    title: 'Video Edit',
    description: 'Upload footage and edit with natural language—backgrounds, objects, performance.',
    path: '/home/wan/v2-7-video-edit',
    icon: 'fas fa-edit'
  },
  {
    name: 'Wan 2.7 R2V',
    title: 'R2V (Reference to Video)',
    description: 'Up to 5 reference images or videos—lock look and voice for ensemble scenes.',
    path: '/home/wan/v2-7-r2v',
    icon: 'fas fa-layer-group'
  }
]

const workflowIntroMap = {
  '/home/wan/v2-7-text-to-video': {
    title: '📝 Wan 2.7 Text to Video',
    lead: 'Describe scenes with a <strong>3–5000 character</strong> prompt—set <strong>2–15s</strong> duration, <strong>720p/1080p</strong>, aspect ratio, optional audio, and prompt extend for richer motion.'
  },
  '/home/wan/v2-7-image-to-video': {
    title: '🖼️ Wan 2.7 Image to Video',
    lead: 'Anchor motion with <strong>first and/or last frames</strong>, a reference clip, or <strong>driving audio</strong>. Reduce abrupt endings and steer performance without a full edit suite.'
  },
  '/home/wan/v2-7-video-edit': {
    title: '✂️ Wan 2.7 Video Edit',
    lead: 'Upload existing video and instruct changes in plain language—“add rain,” “remove the passerby,” “warm the grade.” Duration is <strong>0 (auto) or 2–10 seconds</strong> per the form.'
  },
  '/home/wan/v2-7-r2v': {
    title: '👥 Wan 2.7 R2V',
    lead: 'Combine up to <strong>5</strong> reference images or videos (total) with optional voice lock. Each subject keeps a stable look—built for ensemble ads and branded character series.'
  }
}

const workflowDefinitionMap = {
  '/home/wan/v2-7-text-to-video': {
    title: 'What is Wan 2.7 Text to Video?',
    body:
      '<strong>Wan 2.7 Text to Video</strong> on FuseAITools generates <strong>2–15 second</strong> clips from a prompt (3–5000 characters). Choose <strong>720p or 1080p</strong>, aspect ratios from 16:9 to 3:4, optional negative prompt and audio URL, plus prompt extend—ideal for ads and scripted shorts.'
  },
  '/home/wan/v2-7-image-to-video': {
    title: 'What is Wan 2.7 Image to Video?',
    body:
      '<strong>Wan 2.7 Image to Video</strong> on FuseAITools animates from key inputs: provide at least one of <strong>first frame, last frame, reference clip, or driving audio</strong> with a 3–5000 character prompt. Duration is <strong>2–15s</strong> at 720p/1080p—built for product films and keyframe-driven motion.'
  },
  '/home/wan/v2-7-video-edit': {
    title: 'What is Wan 2.7 Video Edit?',
    body:
      '<strong>Wan 2.7 Video Edit</strong> on FuseAITools edits an uploaded video with natural-language instructions. Required: <strong>video URL + prompt</strong>. Set duration to <strong>0 (model decides) or 2–10 seconds</strong>, 720p/1080p, optional reference image and audio setting (auto or keep origin).'
  },
  '/home/wan/v2-7-r2v': {
    title: 'What is Wan 2.7 R2V?',
    body:
      '<strong>Wan 2.7 R2V (reference-to-video)</strong> on FuseAITools generates scenes from up to <strong>5 combined reference images and videos</strong> plus a prompt. Output is <strong>2–10 seconds</strong> at 720p/1080p with optional voice lock—use when multiple characters must stay consistent.'
  }
}

const workflowFaqMap = {
  '/home/wan/v2-7-text-to-video': [
    {
      question: 'What aspect ratios does Wan 2.7 text-to-video support?',
      answer:
        'Yes—choose <strong>16:9, 9:16, 1:1, 4:3, or 3:4</strong> in the form, plus <strong>720p or 1080p</strong> and <strong>2–15 second</strong> duration.'
    },
    {
      question: 'Can I add audio guidance to Wan 2.7 text-to-video?',
      answer:
        'Yes—optionally pass an <strong>audio URL</strong> with your prompt so generation can follow rhythm or dialogue cues (when supported by the model).'
    }
  ],
  '/home/wan/v2-7-image-to-video': [
    {
      question: 'What inputs are required for Wan 2.7 image-to-video?',
      answer:
        'You need a prompt (3–5000 chars) and at least one of: <strong>first frame URL, last frame URL, first clip URL, or driving audio URL</strong>. Duration is <strong>2–15s</strong> at 720p/1080p.'
    },
    {
      question: 'When should I use first and last frames on Wan 2.7?',
      answer:
        'Use both when you need a shot to <strong>start and end on specific keyframes</strong>—common for product reveals, logo lockups, and storyboard-accurate motion.'
    }
  ],
  '/home/wan/v2-7-video-edit': [
    {
      question: 'Can Wan 2.7 edit an existing video on FuseAITools?',
      answer:
        'Yes—open <strong>Video Edit</strong>, upload a video URL, and describe changes in a 3–5000 character prompt. Optional reference image and audio setting (auto vs keep origin) refine the result.'
    },
    {
      question: 'What duration should I pick for Wan 2.7 video edit?',
      answer:
        'Use <strong>0</strong> to let the model decide length, or set <strong>2–10 seconds</strong> when you need a fixed output window—values outside that range are clamped by the form.'
    }
  ],
  '/home/wan/v2-7-r2v': [
    {
      question: 'How many references can Wan 2.7 R2V use?',
      answer:
        'Up to <strong>5 total</strong> across reference images and videos combined. Add an optional <strong>first frame</strong> and <strong>reference voice</strong> URL for tighter identity lock.'
    },
    {
      question: 'Does Wan 2.7 R2V support aspect ratio with a first frame?',
      answer:
        'When you set a <strong>first frame</strong>, the API omits aspect ratio—composition follows that frame. Without a first frame, pick an aspect ratio in the form.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Wan 2.7?',
    answer:
      'No—Wan 2.7 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How do I try Wan 2.7 on FuseAITools?',
    answer:
      'Select any Wan 2.7 workflow above. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and top-ups.'
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
    icon: '✂️',
    title: 'Natural-Language Video Edit',
    description:
      'Change backgrounds, objects, or performance with text on the <strong>Video Edit</strong> workflow—no timeline required.'
  },
  {
    icon: '👥',
    title: 'Multi-Reference R2V',
    description:
      'Lock up to <strong>5</strong> reference images/videos for ensemble scenes with optional voice guidance.'
  },
  {
    icon: '🖼️',
    title: 'First / Last Frame Control',
    description:
      'Pin keyframes and optional <strong>driving audio</strong> on image-to-video for predictable starts and ends.'
  },
  {
    icon: '📝',
    title: 'Director-Grade Prompting',
    description:
      'Prompts <strong>3–5000</strong> chars with negative prompt, prompt extend, watermark, and seed on generate/edit modes.'
  }
]

const scenarioTags = [
  'Film trailers & TVC',
  'Game CG & cutscenes',
  'Brand video at scale',
  'Short-drama pipelines',
  'Education & explainers'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll(
  (path) => path.includes('v2-7') && !path.includes('2-7-image')
)

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
