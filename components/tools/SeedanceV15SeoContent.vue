<template>
  <div
    id="seedance-v15-section"
    class="seedance-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Seedance 1.5 Pro Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Seedance 1.5 Pro unified text and image-to-video on FuseAITools—4/8/12s, 480p/720p/1080p, optional audio and fixed lens."
    />

    <div class="version-badge">🎵 Seedance 1.5 Pro · Unified T2V/I2V · Optional Audio</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎵 Seedance 1.5 Pro on FuseAITools</h2>
      <p class="tool-sub">
        Seedance 1.5 Pro on <a href="/" class="seo-inline-link">FuseAITools</a> merges
        <strong>text-to-video</strong> and <strong>image-to-video</strong> in one workflow—add
        <strong>0–2 reference images</strong> when you need I2V, or run prompt-only for T2V.
        Toggle <strong>fixed lens</strong> and optional <strong>audio generation</strong>; credits
        reflect duration, resolution, and sound settings. New users receive
        <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Seedance 1.5 Pro Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Seedance 1.5 Pro vs v1 Lite/Pro</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedance 1.5 Pro vs v1">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>1.5 Pro</th>
              <th>v1 Lite/Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Workflows</td>
              <td><strong>One unified mode</strong>—T2V or I2V via optional images</td>
              <td>Separate T2V and I2V pages per tier</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td><strong>4s / 8s / 12s</strong></td>
              <td>5s / 10s</td>
            </tr>
            <tr>
              <td>Audio</td>
              <td>Optional <strong>generate audio</strong> toggle</td>
              <td>Silent output</td>
            </tr>
            <tr>
              <td>Reference images</td>
              <td><strong>0–2</strong> optional input URLs</td>
              <td>1 image (I2V modes)</td>
            </tr>
            <tr>
              <td>Prompt</td>
              <td><strong>3–2500 characters</strong></td>
              <td>Up to 10,000 characters</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Seedance 1.5 Pro)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Seedance 1.5 Pro Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Seedance form and API (<code>seedance-1.5-pro</code>).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedance 1.5 Pro capabilities">
          <thead>
            <tr>
              <th>Input mode</th>
              <th>Required</th>
              <th>Duration</th>
              <th>Resolution / ratio</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Text to Video</strong></td>
              <td>Prompt (3–2500 chars)</td>
              <td>4s / 8s / 12s</td>
              <td>480p–1080p; 1:1, 4:3, 3:4, 16:9, 9:16, 21:9</td>
              <td>Fixed lens, generate audio</td>
            </tr>
            <tr>
              <td><strong>Image to Video</strong></td>
              <td>Prompt + 1–2 image URLs</td>
              <td>4s / 8s / 12s</td>
              <td>480p–1080p; same aspect ratios</td>
              <td>Fixed lens, generate audio</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Credits vary by duration, resolution, and whether audio generation is enabled (with_sound / without_sound). Image inputs: JPEG, PNG, WebP (max 10MB).
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Seedance 1.5 Pro Workflow</h2>
      <p class="section-lead">One page for both text-only and image-guided generation:</p>
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
      ⚡ Need separate Lite/Pro tiers or 21:9 vertical 9:21?
      <a
        href="/home/seedance/v1-lite-text-to-video"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedance/v1-lite-text-to-video')"
      >Browse Seedance v1 →</a>
      for five dedicated Lite and Pro workflows.
    </div>

    <div class="upgrade-tip">
      🎬 Want first/last frame and multimodal references?
      <a
        href="/home/seedance/v2"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedance/v2')"
      >Explore Seedance 2 →</a>
      for 4–15s clips with image, video, and audio conditioning.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  {
    name: 'Seedance 1.5 Pro',
    title: 'Unified T2V / I2V',
    description: 'Prompt-only or 0–2 reference images—4/8/12s, optional audio, fixed lens.',
    path: '/home/seedance/v1-5-pro',
    icon: 'fas fa-video'
  }
]

const workflowIntroMap = {
  '/home/seedance/v1-5-pro': {
    title: '🎵 Seedance 1.5 Pro',
    lead: 'One workflow for <strong>text-to-video</strong> or <strong>image-to-video</strong>—add up to <strong>two reference images</strong> when needed. Pick <strong>4, 8, or 12 seconds</strong>, <strong>480p/720p/1080p</strong>, aspect ratios through <strong>21:9</strong>, plus optional <strong>audio generation</strong> and <strong>fixed lens</strong>.'
  }
}

const workflowDefinitionMap = {
  '/home/seedance/v1-5-pro': {
    title: 'What is Seedance 1.5 Pro?',
    body:
      '<strong>Seedance 1.5 Pro</strong> on FuseAITools is a unified video generator (<code>seedance-1.5-pro</code>). Required: <strong>prompt (3–2500 characters)</strong>. Optional: <strong>0–2 input image URLs</strong> for image-guided scenes. Duration is <strong>4s, 8s, or 12s</strong> at <strong>480p, 720p, or 1080p</strong>—toggle <strong>fixed lens</strong> and <strong>generate audio</strong> as needed.'
  }
}

const workflowFaqMap = {
  '/home/seedance/v1-5-pro': [
    {
      question: 'How do I use Seedance 1.5 Pro for text-to-video vs image-to-video?',
      answer:
        'For <strong>text-to-video</strong>, leave reference images empty and write your prompt. For <strong>image-to-video</strong>, upload <strong>1–2 image URLs</strong> alongside the prompt—the same page handles both without switching workflows.'
    },
    {
      question: 'How does audio generation affect pricing on Seedance 1.5 Pro?',
      answer:
        'Enabling <strong>generate audio</strong> uses the <strong>with_sound</strong> pricing tier; disabling it uses <strong>without_sound</strong>. Credits also depend on <strong>duration (4/8/12s)</strong> and <strong>resolution</strong>—check the Generate button before submitting.'
    },
    {
      question: 'What does fixed lens do on Seedance 1.5 Pro?',
      answer:
        '<strong>Fixed lens</strong> stabilizes camera perspective—useful for product shots and talking-head style clips where you want minimal camera movement.'
    },
    {
      question: 'What aspect ratios does Seedance 1.5 Pro support?',
      answer:
        'Choose <strong>1:1, 4:3, 3:4, 16:9, 9:16, or 21:9</strong> in the form. Prompt length is <strong>3–2500 characters</strong>—shorter than v1 modes but optimized for 1.5 Pro quality.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Seedance 1.5 Pro?',
    answer:
      'No—Seedance 1.5 Pro runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How do I try Seedance 1.5 Pro on FuseAITools?',
    answer:
      'Open this workflow and generate. New users receive <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for credit packs and member rates.'
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
    icon: '🔀',
    title: 'Unified T2V / I2V',
    description:
      'One form for prompt-only or <strong>0–2 reference images</strong>—no separate pages for text vs image starts.'
  },
  {
    icon: '🔊',
    title: 'Optional Audio',
    description:
      'Toggle <strong>generate audio</strong> for sound-aware clips; pricing reflects with_sound vs without_sound tiers.'
  },
  {
    icon: '⏱️',
    title: '4 / 8 / 12 Second Clips',
    description:
      'Longer duration steps than v1—pick <strong>4s, 8s, or 12s</strong> at <strong>480p–1080p</strong>.'
  },
  {
    icon: '☁️',
    title: 'Cloud on FuseAITools',
    description:
      'Fixed lens, aspect ratio, and resolution controls in the browser—<strong>credits shown before generate</strong>.'
  }
]

const scenarioTags = [
  'Short ads with voiceover',
  'Product demos with stable camera',
  'Social clips at 9:16',
  'Image-guided brand stories',
  'Mid-length 8–12s narratives'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path === '/home/seedance/v1-5-pro' || path === '/home/seedance/v1-5-pro/')

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
