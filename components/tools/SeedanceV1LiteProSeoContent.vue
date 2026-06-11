<template>
  <div
    id="seedance-v1-section"
    class="seedance-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Seedance v1 Lite & Pro Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Seedance v1 Lite and Pro text and image-to-video workflows on FuseAITools—480p/720p/1080p, 5/10s clips, camera and seed controls."
    />

    <div class="version-badge">🎬 Seedance v1 · Lite & Pro · Five Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎬 Seedance v1 on FuseAITools</h2>
      <p class="tool-sub">
        Seedance v1 on <a href="/" class="seo-inline-link">FuseAITools</a> offers
        <strong>Lite</strong> for fast iteration and <strong>Pro</strong> for higher-fidelity output.
        Choose text-to-video or image-to-video—including a dedicated <strong>Pro Fast I2V</strong> pipeline.
        Credits are shown on the Generate button before you submit; new users receive
        <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Seedance v1 Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Seedance v1 Lite vs Pro</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedance v1 Lite vs Pro">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Lite</th>
              <th>Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Best for</td>
              <td><strong>Rapid drafts</strong> and social tests</td>
              <td><strong>Production-ready</strong> assets and 21:9 cinematic</td>
            </tr>
            <tr>
              <td>Text-to-video ratios</td>
              <td>16:9 … 9:21 (incl. vertical 9:21)</td>
              <td><strong>21:9</strong> ultra-wide plus standard ratios</td>
            </tr>
            <tr>
              <td>Resolution</td>
              <td>480p / 720p / 1080p</td>
              <td>480p / 720p / 1080p (Pro Fast I2V: 720p/1080p only)</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td><strong>5s or 10s</strong></td>
              <td><strong>5s or 10s</strong></td>
            </tr>
            <tr>
              <td>Controls</td>
              <td>Camera fixed, seed, safety checker (T2V)</td>
              <td>Same + Pro Fast I2V streamlines to prompt + image only</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Seedance v1)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Seedance v1 Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Seedance form and API (<code>seedance-v1-*</code> models).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedance v1 workflow capabilities">
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
              <td><strong>Lite Text to Video</strong></td>
              <td>Prompt (max 10,000 chars)</td>
              <td>5s / 10s</td>
              <td>480p–1080p; 16:9, 4:3, 1:1, 3:4, 9:16, 9:21</td>
              <td>Camera fixed, seed, safety checker</td>
            </tr>
            <tr>
              <td><strong>Lite Image to Video</strong></td>
              <td>1 image URL + prompt</td>
              <td>5s / 10s</td>
              <td>480p–1080p (follows image framing)</td>
              <td>Optional end image; camera fixed, seed</td>
            </tr>
            <tr>
              <td><strong>Pro Text to Video</strong></td>
              <td>Prompt (max 10,000 chars)</td>
              <td>5s / 10s</td>
              <td>480p–1080p; 21:9 + standard ratios</td>
              <td>Camera fixed, seed, safety checker</td>
            </tr>
            <tr>
              <td><strong>Pro Image to Video</strong></td>
              <td>1 image URL + prompt</td>
              <td>5s / 10s</td>
              <td>480p–1080p</td>
              <td>Camera fixed, seed, safety checker</td>
            </tr>
            <tr>
              <td><strong>Pro Fast Image to Video</strong></td>
              <td>1 image URL + prompt</td>
              <td>5s / 10s</td>
              <td><strong>720p / 1080p only</strong></td>
              <td>Streamlined—no camera/seed/safety toggles</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Image inputs: JPEG, PNG, WebP (max 10MB; min 256×256px). Credits bill by duration and resolution—shown on Generate before submission.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Seedance v1 — Five Workflows</h2>
      <p class="section-lead">Pick Lite for speed or Pro for quality:</p>
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
      🖼️ <strong>ByteDance image companion — Seedream</strong>
      Create 2K/3K stills with
      <a
        href="/home/seedream/5-lite-text-to-image"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedream/5-lite-text-to-image')"
      >Seedream 5 Lite Text to Image</a>
      or prep first/last frames via
      <a
        href="/home/seedream/5-lite-image-to-image"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedream/5-lite-image-to-image')"
      >Seedream 5 Lite Image to Image</a>
      before animating here in Seedance.
    </div>

    <div class="upgrade-tip">
      🎵 Need unified T2V/I2V with optional audio?
      <a
        href="/home/seedance/v1-5-pro"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedance/v1-5-pro')"
      >Try Seedance 1.5 Pro →</a>
      for 4/8/12s clips and fixed-lens control.
    </div>

    <div class="upgrade-tip">
      🎬 Want multimodal references and first/last frame control?
      <a
        href="/home/seedance/v2"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedance/v2')"
      >Explore Seedance 2 →</a>
      for 4–15s outputs with image, video, and audio references.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  {
    name: 'Seedance v1 Lite Text to Video',
    title: 'Lite Text to Video',
    description: 'Prompt-only clips with 9:21 vertical support—480p/720p/1080p, 5s or 10s.',
    path: '/home/seedance/v1-lite-text-to-video',
    icon: 'fas fa-font'
  },
  {
    name: 'Seedance v1 Lite Image to Video',
    title: 'Lite Image to Video',
    description: 'Animate one image with optional end frame for controlled transitions.',
    path: '/home/seedance/v1-lite-image-to-video',
    icon: 'fas fa-image'
  },
  {
    name: 'Seedance v1 Pro Text to Video',
    title: 'Pro Text to Video',
    description: '21:9 cinematic plus standard ratios—enhanced detail at 480p–1080p.',
    path: '/home/seedance/v1-pro-text-to-video',
    icon: 'fas fa-font'
  },
  {
    name: 'Seedance v1 Pro Image to Video',
    title: 'Pro Image to Video',
    description: 'Professional image animation with camera, seed, and safety controls.',
    path: '/home/seedance/v1-pro-image-to-video',
    icon: 'fas fa-image'
  },
  {
    name: 'Seedance v1 Pro Fast Image to Video',
    title: 'Pro Fast Image to Video',
    description: 'Speed-optimized I2V at 720p/1080p—5s or 10s without extra toggles.',
    path: '/home/seedance/v1-pro-fast-image-to-video',
    icon: 'fas fa-bolt'
  }
]

const workflowIntroMap = {
  '/home/seedance/v1-lite-text-to-video': {
    title: '📝 Seedance v1 Lite Text to Video',
    lead: 'Describe scenes in text—Seedance v1 Lite renders <strong>5 or 10 second</strong> clips at <strong>480p, 720p, or 1080p</strong>. Pick aspect ratios from <strong>16:9</strong> through vertical <strong>9:21</strong>, with optional fixed camera and seed control.'
  },
  '/home/seedance/v1-lite-image-to-video': {
    title: '🖼️ Seedance v1 Lite Image to Video',
    lead: 'Upload <strong>one image</strong> and guide motion with a prompt. Add an optional <strong>end image</strong> for smoother transitions—<strong>5s/10s</strong> at up to <strong>1080p</strong> with camera fixed and seed options.'
  },
  '/home/seedance/v1-pro-text-to-video': {
    title: '📝 Seedance v1 Pro Text to Video',
    lead: 'Pro text-to-video adds <strong>21:9 ultra-wide</strong> alongside standard ratios for cinematic output. Same <strong>5s/10s</strong> duration tiers and <strong>480p–1080p</strong> resolution with camera, seed, and safety checker controls.'
  },
  '/home/seedance/v1-pro-image-to-video': {
    title: '🖼️ Seedance v1 Pro Image to Video',
    lead: 'Animate stills with Pro-grade motion understanding—<strong>one image URL</strong> plus prompt, <strong>5s or 10s</strong>, and full resolution options with camera fixed, seed, and safety checker.'
  },
  '/home/seedance/v1-pro-fast-image-to-video': {
    title: '⚡ Seedance v1 Pro Fast Image to Video',
    lead: 'When speed matters, Pro Fast I2V skips extra toggles—upload <strong>one image</strong>, write your prompt, and generate <strong>5s or 10s</strong> at <strong>720p or 1080p</strong> in an optimized pipeline.'
  }
}

const workflowDefinitionMap = {
  '/home/seedance/v1-lite-text-to-video': {
    title: 'What is Seedance v1 Lite Text to Video?',
    body:
      '<strong>Seedance v1 Lite Text to Video</strong> on FuseAITools turns a prompt (max <strong>10,000 characters</strong>) into an MP4. Choose <strong>5 or 10 seconds</strong>, <strong>480p/720p/1080p</strong>, and aspect ratios <strong>16:9, 4:3, 1:1, 3:4, 9:16, or 9:21</strong>—with optional fixed camera, seed (-1 for random), and safety checker.'
  },
  '/home/seedance/v1-lite-image-to-video': {
    title: 'What is Seedance v1 Lite Image to Video?',
    body:
      '<strong>Seedance v1 Lite Image to Video</strong> on FuseAITools animates a <strong>single uploaded image</strong> with a required prompt. Optional <strong>end image URL</strong> controls transition endpoints. Output is <strong>5s or 10s</strong> at <strong>480p–1080p</strong>; camera fixed and seed are available.'
  },
  '/home/seedance/v1-pro-text-to-video': {
    title: 'What is Seedance v1 Pro Text to Video?',
    body:
      '<strong>Seedance v1 Pro Text to Video</strong> on FuseAITools delivers higher-fidelity text-to-video with <strong>21:9</strong> ultra-wide plus standard aspect ratios. Duration is <strong>5 or 10 seconds</strong> at <strong>480p/720p/1080p</strong>, with camera fixed, seed, and safety checker controls.'
  },
  '/home/seedance/v1-pro-image-to-video': {
    title: 'What is Seedance v1 Pro Image to Video?',
    body:
      '<strong>Seedance v1 Pro Image to Video</strong> on FuseAITools animates one image with Pro-grade quality. Required: <strong>image URL + prompt</strong>. Set <strong>5s/10s</strong>, <strong>480p–1080p</strong>, plus camera fixed, seed, and safety checker for brand-safe production work.'
  },
  '/home/seedance/v1-pro-fast-image-to-video': {
    title: 'What is Seedance v1 Pro Fast Image to Video?',
    body:
      '<strong>Seedance v1 Pro Fast Image to Video</strong> on FuseAITools is a streamlined image-to-video path—<strong>one image + prompt</strong>, <strong>5 or 10 seconds</strong>, and <strong>720p or 1080p only</strong> (no 480p tier). Camera, seed, and safety toggles are omitted for faster iteration.'
  }
}

const workflowFaqMap = {
  '/home/seedance/v1-lite-text-to-video': [
    {
      question: 'What aspect ratios does Seedance v1 Lite text-to-video support?',
      answer:
        'Choose <strong>16:9, 4:3, 1:1, 3:4, 9:16, or 9:21</strong>—including tall vertical <strong>9:21</strong> for mobile-first content. Resolution is <strong>480p, 720p, or 1080p</strong>; duration is <strong>5s or 10s</strong>.'
    },
    {
      question: 'What does the safety checker do on Lite text-to-video?',
      answer:
        'When enabled, the optional <strong>safety checker</strong> filters content before generation. You can also set a fixed <strong>seed</strong> (-1 for random) to reproduce successful results.'
    }
  ],
  '/home/seedance/v1-lite-image-to-video': [
    {
      question: 'Can I use an end image on Seedance v1 Lite image-to-video?',
      answer:
        'Yes—add an optional <strong>end image URL</strong> to steer how the clip finishes. You still need a start image and prompt; duration is <strong>5s or 10s</strong> at up to <strong>1080p</strong>.'
    },
    {
      question: 'Does Lite image-to-video have aspect ratio controls?',
      answer:
        'No—image-to-video follows your input frame composition. Aspect ratio tabs apply to <strong>text-to-video</strong> modes only.'
    }
  ],
  '/home/seedance/v1-pro-text-to-video': [
    {
      question: 'How is Seedance v1 Pro text-to-video different from Lite?',
      answer:
        'Pro adds <strong>21:9 ultra-wide</strong> and higher visual fidelity for final assets. Both support <strong>5s/10s</strong> and <strong>480p–1080p</strong>; Pro is better when you need cinematic widescreen or production-grade detail.'
    },
    {
      question: 'What prompt length does Pro text-to-video accept?',
      answer:
        'Up to <strong>10,000 characters</strong>—same as Lite. Use detailed motion, lighting, and camera direction for best results.'
    }
  ],
  '/home/seedance/v1-pro-image-to-video': [
    {
      question: 'What controls does Pro image-to-video include?',
      answer:
        'Upload <strong>one image</strong> plus prompt, then set <strong>5s/10s</strong> and <strong>480p–1080p</strong>. Optional <strong>camera fixed</strong>, <strong>seed</strong>, and <strong>safety checker</strong> match Pro text-to-video.'
    },
    {
      question: 'When should I pick Pro I2V over Pro Fast I2V?',
      answer:
        'Use <strong>Pro I2V</strong> when you need 480p drafts, camera/seed control, or the safety checker. Choose <strong>Pro Fast I2V</strong> when you only need 720p/1080p and want the fastest path.'
    }
  ],
  '/home/seedance/v1-pro-fast-image-to-video': [
    {
      question: 'Why does Pro Fast image-to-video only offer 720p and 1080p?',
      answer:
        'The Pro Fast pipeline is optimized for speed at <strong>720p or 1080p</strong>—there is no 480p option. Duration remains <strong>5s or 10s</strong> with prompt up to <strong>10,000 characters</strong>.'
    },
    {
      question: 'Does Pro Fast image-to-video support seed or camera fixed?',
      answer:
        'No—Pro Fast omits <strong>camera fixed</strong>, <strong>seed</strong>, and <strong>safety checker</strong> toggles to reduce form complexity and latency. Use standard Pro I2V if you need those controls.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Seedance v1?',
    answer:
      'No—Seedance v1 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How is Seedance v1 priced on FuseAITools?',
    answer:
      'Credits depend on <strong>duration</strong> and <strong>resolution</strong>—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
    icon: '⚡',
    title: 'Lite vs Pro Tiers',
    description:
      '<strong>Lite</strong> for rapid drafts; <strong>Pro</strong> for 21:9 cinematic and higher detail—switch tiers without leaving FuseAITools.'
  },
  {
    icon: '🖼️',
    title: 'Text & Image Inputs',
    description:
      'Five workflows cover <strong>text-to-video</strong> and <strong>image-to-video</strong>, including optional end frames on Lite I2V.'
  },
  {
    icon: '🎛️',
    title: 'Camera & Seed Control',
    description:
      'Fixed camera, reproducible <strong>seed</strong>, and optional <strong>safety checker</strong> on most v1 modes (except Pro Fast I2V).'
  },
  {
    icon: '☁️',
    title: 'Cloud on FuseAITools',
    description:
      '480p–1080p output in the browser—<strong>credits shown before generate</strong>; no local GPU install required.'
  }
]

const scenarioTags = [
  'Social & vertical video',
  'Product motion from stills',
  'Cinematic 21:9 ads',
  'Rapid creative iteration',
  'Brand-safe campaigns'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) =>
  [
    '/home/seedance/v1-lite-text-to-video',
    '/home/seedance/v1-lite-image-to-video',
    '/home/seedance/v1-pro-text-to-video',
    '/home/seedance/v1-pro-image-to-video',
    '/home/seedance/v1-pro-fast-image-to-video'
  ].some((p) => path === p || path === `${p}/`)
)

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
