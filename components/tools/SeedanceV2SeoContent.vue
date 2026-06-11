<template>
  <div
    id="seedance-v2-section"
    class="seedance-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Seedance 2 Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Seedance 2 and Seedance 2 Fast multimodal video on FuseAITools—first/last frame, reference images/videos/audio, 4–15s, 480p/720p."
    />

    <div class="version-badge">🎬 Seedance 2 · Multimodal Video · Fast & Full</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎬 Seedance 2 on FuseAITools</h2>
      <p class="tool-sub">
        Seedance 2 on <a href="/" class="seo-inline-link">FuseAITools</a> is a
        <strong>multimodal video</strong> line—condition generation with
        <strong>first and last frames</strong>, plus optional reference
        <strong>images, videos, and audio</strong>. Choose <strong>Seedance 2 Fast</strong> for
        quicker iteration or <strong>Seedance 2</strong> when you need up to
        <strong>five reference videos</strong>. Output is <strong>4–15 seconds</strong> at
        <strong>480p or 720p</strong>; credits scale by duration and reference usage. New users
        receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Seedance 2 Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Seedance 2 Fast vs Seedance 2</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedance 2 Fast vs Seedance 2">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Seedance 2 Fast</th>
              <th>Seedance 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Model</td>
              <td><code>seedance-2-fast</code></td>
              <td><code>seedance-2</code></td>
            </tr>
            <tr>
              <td>Reference videos</td>
              <td>Up to <strong>3</strong></td>
              <td>Up to <strong>5</strong></td>
            </tr>
            <tr>
              <td>Reference images</td>
              <td>Up to <strong>9</strong> (incl. first/last frame)</td>
              <td>Same</td>
            </tr>
            <tr>
              <td>Reference audio</td>
              <td>Up to <strong>3</strong></td>
              <td>Up to <strong>3</strong></td>
            </tr>
            <tr>
              <td>Duration & resolution</td>
              <td><strong>4–15s</strong> slider; <strong>480p / 720p</strong></td>
              <td>Same</td>
            </tr>
            <tr>
              <td>Pricing</td>
              <td>Per-second credits; higher when reference videos uploaded</td>
              <td>Same billing logic</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Seedance 2)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Seedance 2 Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Seedance form and API (<code>seedance-2-fast</code> / <code>seedance-2</code>).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedance 2 workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Prompt</th>
              <th>References</th>
              <th>Duration</th>
              <th>Resolution / ratio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Seedance 2 Fast</strong></td>
              <td>3–20,000 chars</td>
              <td>First/last frame; ≤9 images total; ≤3 videos; ≤3 audios</td>
              <td>4–15s (slider)</td>
              <td>480p/720p; 1:1–21:9 + adaptive</td>
            </tr>
            <tr>
              <td><strong>Seedance 2</strong></td>
              <td>3–20,000 chars</td>
              <td>First/last frame; ≤9 images total; ≤5 videos; ≤3 audios</td>
              <td>4–15s (slider)</td>
              <td>480p/720p; 1:1–21:9 + adaptive</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        <strong>Web search</strong> toggle is required in the form. Optional <strong>generate audio</strong> for v2 outputs. When reference videos are uploaded, credits bill per second including rounded-up reference duration plus output length.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Seedance 2 — Two Workflows</h2>
      <p class="section-lead">Fast for iteration; full Seedance 2 for richer video references:</p>
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
      Seedance 2 accepts first/last frames—create or refine them in
      <a
        href="/home/seedream/5-lite-image-to-image"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedream/5-lite-image-to-image')"
      >Seedream 5 Lite Image to Image</a>
      or generate concepts from text in
      <a
        href="/home/seedream/5-lite-text-to-image"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedream/5-lite-text-to-image')"
      >Seedream Text to Image</a>
      first.
    </div>

    <div class="upgrade-tip">
      ⚡ Need simpler 5s/10s tiers without multimodal refs?
      <a
        href="/home/seedance/v1-lite-text-to-video"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedance/v1-lite-text-to-video')"
      >Browse Seedance v1 →</a>
      for Lite and Pro text/image workflows up to 1080p.
    </div>

    <div class="upgrade-tip">
      🎵 Want unified T2V/I2V with optional audio in one form?
      <a
        href="/home/seedance/v1-5-pro"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedance/v1-5-pro')"
      >Try Seedance 1.5 Pro →</a>
      for 4/8/12s clips and fixed-lens control.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  {
    name: 'Seedance 2 Fast',
    title: 'Seedance 2 Fast',
    description: 'Multimodal generation with up to 3 reference videos—4–15s at 480p/720p.',
    path: '/home/seedance/v2-fast',
    icon: 'fas fa-forward'
  },
  {
    name: 'Seedance 2',
    title: 'Seedance 2',
    description: 'Full multimodal control with up to 5 reference videos for complex scenes.',
    path: '/home/seedance/v2',
    icon: 'fas fa-film'
  }
]

const workflowIntroMap = {
  '/home/seedance/v2-fast': {
    title: '⚡ Seedance 2 Fast',
    lead: 'Seedance 2 Fast (<code>seedance-2-fast</code>) accepts ultra-long prompts (up to <strong>20,000 characters</strong>) plus optional <strong>first/last frames</strong> and reference <strong>images, videos, and audio</strong>. Set <strong>4–15 seconds</strong> on a slider, pick <strong>480p or 720p</strong>, and enable the required <strong>web search</strong> switch.'
  },
  '/home/seedance/v2': {
    title: '🎬 Seedance 2',
    lead: 'Seedance 2 (<code>seedance-2</code>) extends Fast with up to <strong>five reference videos</strong> for richer scene conditioning. Same <strong>4–15s</strong> duration range, <strong>480p/720p</strong> output, and multimodal controls—including optional <strong>audio generation</strong> and <strong>adaptive</strong> aspect ratio.'
  }
}

const workflowDefinitionMap = {
  '/home/seedance/v2-fast': {
    title: 'What is Seedance 2 Fast?',
    body:
      '<strong>Seedance 2 Fast</strong> on FuseAITools generates video from a prompt (3–20,000 characters) with optional <strong>firstFrameUrl</strong> and <strong>lastFrameUrl</strong>. Add up to <strong>9 total images</strong> (including frames), <strong>3 reference videos</strong>, and <strong>3 reference audios</strong>. Duration is <strong>4–15 seconds</strong> at <strong>480p or 720p</strong>; aspect ratios include <strong>adaptive</strong>.'
  },
  '/home/seedance/v2': {
    title: 'What is Seedance 2?',
    body:
      '<strong>Seedance 2</strong> on FuseAITools matches Seedance 2 Fast for core controls but allows up to <strong>five reference videos</strong>—better for complex multi-clip conditioning. Prompt limit is <strong>20,000 characters</strong>; output remains <strong>4–15s</strong> at <strong>480p/720p</strong> with optional audio generation and web search enabled.'
  }
}

const workflowFaqMap = {
  '/home/seedance/v2-fast': [
    {
      question: 'How many reference files can Seedance 2 Fast use?',
      answer:
        'Up to <strong>9 images total</strong> (first frame + last frame + reference images), <strong>3 reference videos</strong>, and <strong>3 reference audios</strong>. First and last frames count toward the nine-image cap.'
    },
    {
      question: 'Why is web search required on Seedance 2 Fast?',
      answer:
        'The form includes a mandatory <strong>web search</strong> toggle—the API expects this flag on every Seedance 2 / 2 Fast request. Leave it on unless product guidance changes.'
    }
  ],
  '/home/seedance/v2': [
    {
      question: 'When should I choose Seedance 2 over Seedance 2 Fast?',
      answer:
        'Pick <strong>Seedance 2</strong> when you need up to <strong>five reference videos</strong> for richer conditioning. Use <strong>2 Fast</strong> when three reference videos are enough and you want the speed-optimized model.'
    },
    {
      question: 'How is Seedance 2 billed when I upload reference videos?',
      answer:
        'Pricing uses a <strong>per-second</strong> rate. With reference videos, credits multiply by <strong>ceil(reference video duration) + output duration</strong> (output clamped 4–15s). Without reference videos, only output seconds apply—see the Generate button for the exact total.'
    },
    {
      question: 'What aspect ratios does Seedance 2 support?',
      answer:
        'Choose <strong>1:1, 4:3, 3:4, 16:9, 9:16, 21:9, or adaptive</strong>. Resolution is <strong>480p or 720p</strong>—there is no 1080p tier on Seedance 2 workflows.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Seedance 2?',
    answer:
      'No—Seedance 2 runs in the cloud on FuseAITools. Upload reference URLs in the browser; credits are charged per successful generation.'
  },
  {
    question: 'How do I try Seedance 2 on FuseAITools?',
    answer:
      'Open Seedance 2 or 2 Fast above and generate. New users receive <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for credit packs and member rates.'
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
    title: 'First & Last Frame',
    description:
      'Bookend motion with <strong>firstFrameUrl</strong> and <strong>lastFrameUrl</strong>—counts toward the nine-image reference cap.'
  },
  {
    icon: '🎞️',
    title: 'Multimodal References',
    description:
      'Condition with reference <strong>images, videos, and audio</strong>—Seedance 2 supports up to <strong>5</strong> reference videos.'
  },
  {
    icon: '📝',
    title: 'Ultra-Long Prompts',
    description:
      'Up to <strong>20,000 characters</strong> for detailed scene, style, and motion direction.'
  },
  {
    icon: '☁️',
    title: 'Cloud on FuseAITools',
    description:
      '<strong>4–15s</strong> outputs at <strong>480p/720p</strong>—per-second credits shown on Generate before submission.'
  }
]

const scenarioTags = [
  'Reference-driven storytelling',
  'Style-locked brand films',
  'First/last frame transitions',
  'Audio-guided rhythm edits',
  'Complex multi-clip scenes'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path === '/home/seedance/v2-fast' || path === '/home/seedance/v2' || path === '/home/seedance/v2-fast/' || path === '/home/seedance/v2/')

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
