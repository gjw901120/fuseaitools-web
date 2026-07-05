<template>
  <div
    id="hailuo-section"
    class="hailuo-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Hailuo 2.3 Image to Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Hailuo 2.3 Pro and Standard image-to-video on FuseAITools—one image + prompt, 6s/10s, 768P/1080P; 10s clips are 768P only."
    />

    <div class="version-badge">🎬 Hailuo 2.3 · MiniMax · Image to Video · Pro &amp; Standard</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎬 Hailuo on FuseAITools</h2>
      <p class="tool-sub">
        <strong>Hailuo 2.3</strong> (MiniMax) on
        <a href="/" class="seo-inline-link">FuseAITools</a> animates a
        <strong>single input image</strong> with a text prompt—realistic motion, expressive characters, and cinematic
        lighting. Choose <strong>Pro</strong> for highest fidelity or <strong>Standard</strong> for faster iteration;
        both share the same form controls (6s/10s, 768P/1080P). This hub is
        <strong>image-to-video only</strong>—not text-to-video from scratch. Credits appear on Generate before
        submission. New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Hailuo Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Hailuo 2.3 Pro vs Standard</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Hailuo Pro vs Standard comparison">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Pro I2V</th>
              <th>Standard I2V</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Input</strong></td>
              <td colspan="2">1 image (JPEG/PNG/WebP, max 10MB) + prompt (≤5000)</td>
            </tr>
            <tr>
              <td><strong>modelKey</strong></td>
              <td><code>hailuo-2-3-image-to-video-pro</code></td>
              <td><code>hailuo-2-3-image-to-video-standard</code></td>
            </tr>
            <tr>
              <td><strong>Duration</strong></td>
              <td colspan="2">6s or 10s</td>
            </tr>
            <tr>
              <td><strong>Resolution</strong></td>
              <td colspan="2">768P or 1080P (<strong>10s → 768P only</strong>)</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>Hero assets, client work, max cinematic fidelity</td>
              <td>Drafts, batch runs, faster turnaround</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Need text-to-video without a source image? Try
        <a href="/home/seedance/v1-lite-text-to-video" class="seo-inline-link">Seedance Text to Video</a>
        or
        <a href="/home/wan/text-to-video" class="seo-inline-link">Wan Text to Video</a>.
      </p>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Hailuo 2.3)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Hailuo 2.3 Technical Specs</h2>
      <p class="section-lead">
        Parameters match the FuseAITools Hailuo form (<code>hailuo-2-3-image-to-video-*</code>).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Hailuo workflow capabilities">
          <thead>
            <tr>
              <th>Tier</th>
              <th>Required input</th>
              <th>Duration</th>
              <th>Resolution</th>
              <th>Pricing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Pro</strong></td>
              <td>Prompt + 1 image URL</td>
              <td>6s or 10s</td>
              <td>768P / 1080P*</td>
              <td>RULE: duration + quality (768p/1080p)</td>
            </tr>
            <tr>
              <td><strong>Standard</strong></td>
              <td>Prompt + 1 image URL</td>
              <td>6s or 10s</td>
              <td>768P / 1080P*</td>
              <td>RULE: duration + quality (768p/1080p)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">*10-second clips do not support 1080P in the form—select 768P for 10s output.</p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Hailuo 2.3 — Two Image-to-Video Tiers</h2>
      <p class="section-lead">Same controls—pick Pro for quality or Standard for speed.</p>
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
      🖼️ Need a hero still first?
      <a href="/home/seedream/5-lite-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedream/5-lite-text-to-image')">Seedream Text to Image →</a>
      then animate here—or compare
      <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedance/v1-lite-image-to-video')">Seedance Image to Video</a>
      and
      <a href="/home/wan/image-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/wan/image-to-video')">Wan Image to Video</a>.
    </div>

    <div class="upgrade-tip">
      ⚡ Draft on Standard, finish on Pro—start with
      <a href="/home/hailuo/image-to-video-standard" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/hailuo/image-to-video-standard')">Hailuo Standard →</a>
      for fast iteration, then switch to
      <a href="/home/hailuo/image-to-video-pro" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/hailuo/image-to-video-pro')">Hailuo Pro →</a>
      for final 6s/1080P hero clips.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  {
    name: 'Hailuo 2.3 Pro Image to Video',
    title: 'Pro',
    description: 'Highest-fidelity I2V—6s/10s at 768P/1080P (10s → 768P only).',
    path: '/home/hailuo/image-to-video-pro',
    icon: 'fas fa-star'
  },
  {
    name: 'Hailuo 2.3 Standard Image to Video',
    title: 'Standard',
    description: 'Balanced speed and quality—same prompt, image, duration, and resolution controls.',
    path: '/home/hailuo/image-to-video-standard',
    icon: 'fas fa-bolt'
  }
]

const workflowIntroMap = {
  '/home/hailuo/image-to-video-pro': {
    title: '⭐ Hailuo 2.3 Pro Image to Video',
    lead: 'Upload <strong>one image</strong> (JPEG/PNG/WebP, max 10MB) and describe motion with a <strong>prompt</strong> (≤5000 chars). Choose <strong>6s or 10s</strong> and <strong>768P or 1080P</strong>—<strong>10s clips cannot use 1080P</strong>. Model: <code>hailuo-2-3-image-to-video-pro</code>.'
  },
  '/home/hailuo/image-to-video-standard': {
    title: '⚡ Hailuo 2.3 Standard Image to Video',
    lead: 'Same workflow as Pro—<strong>one image + prompt</strong>, <strong>6s/10s</strong>, <strong>768P/1080P</strong>—optimized for faster iteration at slightly lower fidelity. Model: <code>hailuo-2-3-image-to-video-standard</code>.'
  }
}

const workflowDefinitionMap = {
  '/home/hailuo/image-to-video-pro': {
    title: 'What is Hailuo 2.3 Pro Image to Video?',
    body:
      '<strong>Hailuo 2.3 Pro Image to Video</strong> on FuseAITools animates a single still with MiniMax’s high-fidelity model. Required: <strong>prompt (≤5000 chars)</strong> + <strong>image URL</strong>. Duration <strong>6s or 10s</strong>; resolution <strong>768P or 1080P</strong> (<strong>1080P only when duration is 6s</strong>). RULE pricing by duration and quality.'
  },
  '/home/hailuo/image-to-video-standard': {
    title: 'What is Hailuo 2.3 Standard Image to Video?',
    body:
      '<strong>Hailuo 2.3 Standard Image to Video</strong> on FuseAITools shares the same form as Pro—<strong>one image</strong>, <strong>prompt ≤5000</strong>, <strong>6s/10s</strong>, <strong>768P/1080P</strong>—with Standard-tier model output for quicker drafts and batch content.'
  }
}

const workflowFaqMap = {
  '/home/hailuo/image-to-video-pro': [
    {
      question: 'When should I use Hailuo Pro instead of Standard?',
      answer:
        'Choose <strong>Pro</strong> for client deliverables, hero social clips, and when cinematic motion fidelity matters most. Use <strong>Standard</strong> for rapid drafts—same controls, different model tier and credit rate.'
    },
    {
      question: 'Why is 1080P disabled for 10-second Hailuo clips?',
      answer:
        'The form enforces MiniMax’s constraint: <strong>10-second outputs support 768P only</strong>. Pick <strong>6 seconds</strong> when you need <strong>1080P</strong> resolution.'
    }
  ],
  '/home/hailuo/image-to-video-standard': [
    {
      question: 'Does Hailuo Standard use the same inputs as Pro?',
      answer:
        'Yes—<strong>one image</strong> (JPEG/PNG/WebP, max 10MB), <strong>prompt ≤5000</strong>, duration <strong>6s/10s</strong>, and resolution <strong>768P/1080P</strong>. Only the underlying model key differs.'
    },
    {
      question: 'Can I upgrade a Standard render to Pro on the same image?',
      answer:
        'Re-run the same image and prompt on <a href="/home/hailuo/image-to-video-pro" class="seo-inline-link">Hailuo Pro</a>—there is no automatic upscale between tiers; submit a new Pro job when you need final fidelity.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Does Hailuo support text-to-video without an image?',
    answer:
      'No—both Pro and Standard on FuseAITools are <strong>image-to-video only</strong>. For text-to-video, use <a href="/home/seedance/v1-lite-text-to-video" class="seo-inline-link">Seedance Text to Video</a> or <a href="/home/wan/text-to-video" class="seo-inline-link">Wan Text to Video</a>.'
  },
  {
    question: 'How is Hailuo priced on FuseAITools?',
    answer:
      'Both tiers use <strong>RULE</strong> pricing—credits depend on <strong>duration</strong> and <strong>quality</strong> (768p/1080p). The exact amount appears on the Generate button. New users get <strong>20 free credits</strong>—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans.'
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
    icon: '🖼️',
    title: 'Single-Image Animation',
    description:
      'Required <strong>one image</strong> + prompt—JPEG, PNG, or WebP up to <strong>10MB</strong>.'
  },
  {
    icon: '🎬',
    title: 'Cinematic Motion',
    description:
      'MiniMax Hailuo 2.3 targets realistic movement, expressive faces, and stable lighting across frames.'
  },
  {
    icon: '⚖️',
    title: 'Pro vs Standard',
    description:
      'Same form controls—pick <strong>Pro</strong> for max quality or <strong>Standard</strong> for faster iteration.'
  },
  {
    icon: '☁️',
    title: 'Cloud on FuseAITools',
    description:
      '<strong>6s/10s</strong> at <strong>768P/1080P</strong>—credits shown before generate; no local GPU.'
  }
]

const scenarioTags = [
  'Character & portrait animation',
  'Product shot motion',
  'Social & ad short-form',
  'Concept art to clip',
  'Draft → Pro hero pipeline'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) =>
  path === '/home/hailuo/image-to-video-pro' ||
  path === '/home/hailuo/image-to-video-standard'
)

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
