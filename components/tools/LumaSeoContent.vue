<template>
  <div
    id="luma-section"
    class="luma-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Luma Video Modification on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Luma Dream Machine video modification on FuseAITools—upload MP4/MOV/AVI (max 500MB, 10s) and describe changes in English; optional watermark; per-run credits."
    />

    <div class="version-badge">🎥 Luma Dream Machine · Video Modification</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎥 Luma on FuseAITools</h2>
      <p class="tool-sub">
        <strong>Luma Dream Machine</strong> on
        <a href="/" class="seo-inline-link">FuseAITools</a> is a focused
        <strong>video modification</strong> workflow: upload a short clip, describe the visual changes you want in
        <strong>English</strong>, and receive a modified render. Ideal for 3D-style scene tweaks, visual effects, and
        rapid iteration on existing footage—not text-to-video from scratch. Credits appear on the Modify button before
        submission. New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Luma Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Luma vs Other Video-Edit Flows on FuseAITools</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Luma vs Seedance I2V vs Wan video edit">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Luma Modify</th>
              <th>Seedance I2V</th>
              <th>Wan 2.7 Video Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Input</strong></td>
              <td>Video + English prompt</td>
              <td>1 image + prompt</td>
              <td>Video + prompt (+ optional references)</td>
            </tr>
            <tr>
              <td><strong>modelKey</strong></td>
              <td><code>Luma</code></td>
              <td><code>seedance-v1-lite-image-to-video</code></td>
              <td><code>wan-2-7-video-edit</code></td>
            </tr>
            <tr>
              <td><strong>Max upload</strong></td>
              <td>500MB · ≤10s</td>
              <td>1 image (JPG/PNG)</td>
              <td>Varies by form</td>
            </tr>
            <tr>
              <td><strong>Prompt language</strong></td>
              <td><strong>English only</strong></td>
              <td>Any</td>
              <td>Any</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>3D-style mods on short clips</td>
              <td>Animate a still into 5s/10s video</td>
              <td>Natural-language edit with audio options</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Need to create video from text or images? Use
        <a href="/home/seedance/v1-lite-text-to-video" class="seo-inline-link">Seedance Text to Video</a>
        or
        <a href="/home/wan/text-to-video" class="seo-inline-link">Wan Text to Video</a>
        instead.
      </p>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Luma)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Luma Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Luma form and API (<code>POST /api/video/luma/generate</code>,
        modelKey <code>Luma</code>).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Luma video modification capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Required input</th>
              <th>Video constraints</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Video Modification</strong></td>
              <td>English prompt + uploaded video URL</td>
              <td>MP4 / MOV / AVI · max <strong>500MB</strong> · max <strong>10 seconds</strong></td>
              <td>Optional watermark identifier</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">Pricing: ONCE per modification—credits shown on the Modify Video button.</p>
    </section>

    <div class="upgrade-tip pricing-tip">
      💳 New users get <strong>20 free credits</strong> on sign-up.
      <a href="/pricing" class="seo-pricing-link">View pricing</a>
      for subscription discounts and credit top-ups.
    </div>

    <div class="upgrade-tip">
      🎬 Starting from scratch?
      <a href="/home/seedance/v1-lite-text-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedance/v1-lite-text-to-video')">Seedance Text to Video →</a>
      or
      <a href="/home/wan/text-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/wan/text-to-video')">Wan Text to Video →</a>
      for clips from text or images—or
      <a href="/home/luma/generate" class="seo-inline-link">stay on Luma</a>
      when you already have a short clip to modify.
    </div>

    <div class="upgrade-tip">
      ✨ Prefer image-driven generation or edit-with-prompt workflows?
      <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/seedance/v1-lite-image-to-video')">Seedance Image to Video →</a>
      or
      <a href="/home/wan/v2-7-video-edit" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/wan/v2-7-video-edit')">Wan 2.7 Video Edit →</a>
      for reference stills, frame control, and natural-language edits.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, watchRouteScroll } = useToolSeoPageScroll()

const workflowIntroMap = {
  '/home/luma/generate': {
    title: '🎥 Luma Video Modification',
    lead: 'Upload a short <strong>MP4, MOV, or AVI</strong> clip (max <strong>500MB</strong>, max <strong>10 seconds</strong>) and describe the visual changes in an <strong>English prompt</strong>. Luma applies your modification description to the input video—strong for 3D-style scene updates and visual effects.'
  }
}

const workflowDefinitionMap = {
  '/home/luma/generate': {
    title: 'What is Luma Video Modification?',
    body:
      '<strong>Luma Video Modification</strong> on FuseAITools edits an uploaded clip with natural-language instructions. Required: <strong>video URL + English prompt</strong> describing elements to add or change. Supports <strong>MP4, MOV, AVI</strong> up to <strong>500MB</strong> and <strong>10 seconds</strong>. Optional <strong>watermark</strong> identifier for branding. Model key: <code>Luma</code> (per-run credits).'
  }
}

const workflowFaqMap = {
  '/home/luma/generate': [
    {
      question: 'Does Luma support text-to-video without an input clip?',
      answer:
        'No—Luma on FuseAITools is <strong>video modification only</strong>. You must upload a source video. For text or image to video, use <a href="/home/seedance/v1-lite-text-to-video" class="seo-inline-link">Seedance Text to Video</a> or <a href="/home/wan/text-to-video" class="seo-inline-link">Wan Text to Video</a>.'
    },
    {
      question: 'Must Luma prompts be in English?',
      answer:
        'Yes—the form and API expect <strong>English-only</strong> modification descriptions. Be specific about visual elements to add or change for best results.'
    },
    {
      question: 'What are the input video limits for Luma?',
      answer:
        'Upload <strong>MP4, MOV, or AVI</strong> up to <strong>500MB</strong> and <strong>10 seconds</strong> maximum duration. The file is uploaded to cloud storage before submission.'
    },
    {
      question: 'How is Luma different from Seedance or Wan video flows on FuseAITools?',
      answer:
        '<strong>Luma</strong> modifies an uploaded clip with <strong>English prompts</strong> (≤10s, 500MB). <strong>Seedance Image to Video</strong> animates a still into a new 5s/10s clip—see <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link">Seedance I2V</a>. <strong>Wan 2.7 Video Edit</strong> edits footage with natural language plus optional references and audio settings—see <a href="/home/wan/v2-7-video-edit" class="seo-inline-link">Wan Video Edit</a>.'
    }
  ]
}

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
  return workflowFaqMap[path] || []
})

useToolSeoFaqSchema(faqItems)

const coreFeatures = [
  {
    icon: '🎬',
    title: 'Video-In, Video-Out',
    description:
      'Modify existing footage—upload a clip and describe changes instead of generating from a blank prompt.'
  },
  {
    icon: '🌐',
    title: 'English Modification Prompts',
    description:
      'Detailed <strong>English</strong> descriptions of visual elements to add or alter—matched to the Luma API.'
  },
  {
    icon: '🎥',
    title: 'Short-Clip Optimized',
    description:
      'Built for clips up to <strong>10 seconds</strong> and <strong>500MB</strong>—MP4, MOV, or AVI.'
  },
  {
    icon: '☁️',
    title: 'Cloud on FuseAITools',
    description:
      'Per-run credits on the Modify button—no local GPU; optional watermark identifier for output branding.'
  }
]

const scenarioTags = [
  '3D scene tweaks on short clips',
  'Visual effects experiments',
  'Product demo iterations',
  'Social clip variations',
  'Pre-vis effect tests'
]

watchRouteScroll((path) => path === '/home/luma/generate')

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
