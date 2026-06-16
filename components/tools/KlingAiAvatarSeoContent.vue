<template>
  <div
    id="kling-avatar-section"
    class="kling-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Kling AI Avatar on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Kling AI Avatar Standard and Pro on FuseAITools—audio-driven talking-head video from portrait, voice track, and prompt. Separate from Kling scene generation."
    />

    <div class="version-badge">👤 Kling AI Avatar · Audio-Driven · Standard & Pro</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">👤 Kling AI Avatar on FuseAITools</h2>
      <p class="tool-sub">
        <strong>Kling AI Avatar</strong> is a standalone product line—not v2.5, 2.6, or 3.0 scene generation.
        It lip-syncs a <strong>portrait</strong> to your uploaded <strong>audio</strong> with a delivery
        <strong>prompt</strong> (max 5000 chars). Use
        <a href="/home/elevenlabs/multilingual-v2" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/elevenlabs/multilingual-v2')">ElevenLabs TTS</a>
        for the voice track, then Avatar Standard or Pro for the video. For cinematic B-roll or multi-shot scenes,
        pair with
        <a href="/home/kling/v3-0-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v3-0-video')">Kling 3.0 Video</a>
        —Avatar handles the talking head; 3.0 handles scene invention. New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ AI Avatar Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 AI Avatar Standard vs Pro</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling AI Avatar Standard vs Pro">
          <thead>
            <tr><th>Dimension</th><th>Standard</th><th>Pro</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Input</strong></td>
              <td colspan="2">Avatar image + audio + prompt (same form)</td>
            </tr>
            <tr>
              <td><strong>Output</strong></td>
              <td>Efficient talking-head</td>
              <td>Higher lip-sync and visual polish</td>
            </tr>
            <tr>
              <td><strong>modelKey</strong></td>
              <td><code>kling-ai-avatar-standard</code></td>
              <td><code>kling-ai-avatar-pro</code></td>
            </tr>
            <tr>
              <td><strong>Pricing</strong></td>
              <td colspan="2">Fixed credits per run (not per-second like 3.0 Video)</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>Drafts, internal comms</td>
              <td>Marketing, client-facing explainers</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="vs-video-heading">
      <h2 id="vs-video-heading" class="section-title">📊 AI Avatar vs Kling 3.0 Video</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling AI Avatar vs 3.0 Video">
          <thead>
            <tr><th>Dimension</th><th>AI Avatar</th><th>3.0 Video</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Pipeline</strong></td>
              <td><strong>Audio-driven</strong> lip-sync on a portrait</td>
              <td><strong>Prompt-driven</strong> scene generation</td>
            </tr>
            <tr>
              <td><strong>Required input</strong></td>
              <td>Image + audio + prompt</td>
              <td>Shot prompt(s)</td>
            </tr>
            <tr>
              <td><strong>Typical use</strong></td>
              <td>Explainers, course hosts, dubbing</td>
              <td>B-roll, multi-shot stories, cinematic clips</td>
            </tr>
            <tr>
              <td><strong>Pairing</strong></td>
              <td colspan="2">Avatar for presenter + 3.0 Video for scene cutaways</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Kling AI Avatar)</h2>
      <div class="faq-list">
        <div v-for="(faq, index) in faqItems" :key="index" class="faq-item" :class="{ open: openFaqIndex === index }">
          <button type="button" class="faq-question" :aria-expanded="openFaqIndex === index" @click="toggleFaq(index)">
            <span>{{ faq.question }}</span>
            <span class="faq-toggle" aria-hidden="true">{{ openFaqIndex === index ? '➖' : '➕' }}</span>
          </button>
          <div v-show="openFaqIndex === index" class="faq-answer"><div v-html="faq.answer" /></div>
        </div>
      </div>
    </section>

    <section class="info-section" aria-labelledby="tech-heading">
      <h2 id="tech-heading" class="section-title">⚙️ AI Avatar Technical Specs</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling AI Avatar capabilities">
          <thead>
            <tr><th>Tier</th><th>modelKey</th><th>Required</th><th>Limits</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Standard</strong></td>
              <td><code>kling-ai-avatar-standard</code></td>
              <td>Avatar image + audio + prompt</td>
              <td>Image/audio max 10MB; prompt max 5000</td>
            </tr>
            <tr>
              <td><strong>Pro</strong></td>
              <td><code>kling-ai-avatar-pro</code></td>
              <td>Same as Standard</td>
              <td>Higher-quality output tier</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Kling AI Avatar — Two Tiers</h2>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in avatarWorkflows"
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
      🎙️ <strong>Voice pipeline — ElevenLabs</strong>
      Generate narration with
      <a href="/home/elevenlabs/multilingual-v2" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/elevenlabs/multilingual-v2')">Multilingual v2</a>
      or
      <a href="/home/elevenlabs/turbo-2-5" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/elevenlabs/turbo-2-5')">Turbo 2.5</a>
      , then upload the MP3 here for lip-sync.
    </div>

    <div class="upgrade-tip">
      🎬 Need cinematic scene B-roll to cut with your avatar?
      <a href="/home/kling/v3-0-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/v3-0-video')">Use Kling 3.0 Video →</a>
      for multi-shot 3–15s scene generation—Avatar for the presenter, 3.0 for the story visuals.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const avatarWorkflows = [
  { name: 'Kling AI Avatar Standard', title: 'Standard', description: 'Efficient talking-head—image + audio + prompt.', path: '/home/kling/ai-avatar-standard', icon: 'fas fa-user' },
  { name: 'Kling AI Avatar Pro', title: 'Pro', description: 'Premium lip-sync and facial detail.', path: '/home/kling/ai-avatar-pro', icon: 'fas fa-user-tie' }
]

const workflowIntroMap = {
  '/home/kling/ai-avatar-standard': {
    title: '👤 Kling AI Avatar Standard',
    lead: '<strong>Audio-driven talking head</strong>—not scene generation. Upload <strong>avatar image</strong>, <strong>audio</strong> (max 10MB), and <strong>prompt</strong> (max 5000). Standard tier for drafts and high-volume explainers.'
  },
  '/home/kling/ai-avatar-pro': {
    title: '👔 Kling AI Avatar Pro',
    lead: 'Same pipeline as Standard—portrait + audio + prompt—but <strong>Pro</strong> targets sharper lip-sync and cleaner facial detail for client-facing deliverables. Fixed per-run pricing.'
  }
}

const workflowDefinitionMap = {
  '/home/kling/ai-avatar-standard': {
    title: 'What is Kling AI Avatar Standard?',
    body: '<strong>Kling AI Avatar Standard</strong> (<code>kling-ai-avatar-standard</code>) lip-syncs a portrait to uploaded audio. Required: avatar image, audio URL, prompt (max 5000). Separate from all Kling video-generation tiers.'
  },
  '/home/kling/ai-avatar-pro': {
    title: 'What is Kling AI Avatar Pro?',
    body: '<strong>Kling AI Avatar Pro</strong> (<code>kling-ai-avatar-pro</code>)—same inputs as Standard, higher output quality. For marketing-grade talking heads paired with <a href="/home/kling/v3-0-video" class="seo-inline-link">Kling 3.0 Video</a> B-roll.'
  }
}

const workflowFaqMap = {
  '/home/kling/ai-avatar-standard': [
    { question: 'What do I upload for Kling AI Avatar Standard?', answer: 'Required: <strong>avatar image</strong> (max 10MB), <strong>audio</strong> (MP3/WAV/AAC/OGG, max 10MB), <strong>prompt</strong> (max 5000). Use <a href="/home/elevenlabs/multilingual-v2" class="seo-inline-link">ElevenLabs</a> for TTS if needed.' },
    { question: 'How is AI Avatar Standard different from Pro?', answer: '<strong>Standard</strong> = efficient tier. <strong>Pro</strong> = higher lip-sync polish—same form fields, different model key and credits.' }
  ],
  '/home/kling/ai-avatar-pro': [
    { question: 'What audio formats does Kling AI Avatar Pro accept?', answer: '<strong>MP3, WAV, AAC, OGG</strong> up to 10MB. Clear speech improves lip-sync.' },
    { question: 'Can I combine AI Avatar with Kling 3.0 Video?', answer: 'Yes—use Avatar for the presenter clip and <a href="/home/kling/v3-0-video" class="seo-inline-link">3.0 Video</a> for multi-shot scene B-roll in the same project.' }
  ]
}

const commonFaq = [
  { question: 'Is AI Avatar the same as Kling text-to-video?', answer: 'No—Avatar is <strong>audio-driven</strong> lip-sync on a portrait. v2.5/2.6/3.0 invent scenes from prompts or images.' },
  { question: 'How is Kling AI Avatar priced on FuseAITools?', answer: 'Fixed credits per generation (<code>kling-ai-avatar-standard</code> / <code>kling-ai-avatar-pro</code>)—not per-second like 3.0 Video. See <a href="/pricing" class="seo-pricing-link">pricing</a>.' }
]

const workflowIntro = computed(() => workflowIntroMap[route.path.replace(/\/$/, '')] || null)
const workflowDefinition = computed(() => workflowDefinitionMap[route.path.replace(/\/$/, '')] || null)
const faqItems = computed(() => [...(workflowFaqMap[route.path.replace(/\/$/, '')] || []), ...commonFaq])
useToolSeoFaqSchema(faqItems)

const coreFeatures = [
  { icon: '🎙️', title: 'Audio-Driven', description: 'Lip-sync follows your uploaded voice—not a text-to-scene model.' },
  { icon: '👤', title: 'Portrait Input', description: 'Single avatar image drives facial animation and expression.' },
  { icon: '📝', title: '5000-Char Prompt', description: 'Guide delivery, framing, and mood beyond the audio alone.' },
  { icon: '🔗', title: 'Pairs with 3.0', description: 'Combine with <strong>Kling 3.0 Video</strong> for presenter + scene B-roll edits.' }
]

const scenarioTags = ['Course explainers', 'Localized dubbing', 'Internal comms', 'Presenter + B-roll edits']

function isCurrentMode(path) { return route.path === path || route.path === `${path}/` }
watchRouteScroll((path) => path.includes('/home/kling/ai-avatar-'))

const openFaqIndex = ref(0)
function toggleFaq(index) { openFaqIndex.value = openFaqIndex.value === index ? -1 : index }
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
