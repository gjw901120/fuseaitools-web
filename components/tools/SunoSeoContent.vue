<template>
  <div
    id="suno-section"
    class="suno-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Suno AI Music on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Suno on FuseAITools—six music workflows: generate, extend, cover, expand, add instrumentals, and add vocals. Models V3.5 through V5."
    />

    <div class="version-badge">🎵 Suno · AI Music · Six Workflows · V3.5–V5</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎵 Suno on FuseAITools</h2>
      <p class="tool-sub">
        Suno on <a href="/" class="seo-inline-link">FuseAITools</a> turns text, lyrics, and uploaded audio into
        full tracks—generate from scratch, extend completed songs, reimagine covers, expand short clips, or add
        instrumentals and vocals. Pick models from <strong>V3.5</strong> through <strong>V5</strong> (up to 8 minutes
        on V4.5+). Credits appear on the Generate button before you submit; new users receive
        <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Suno Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Suno Workflow Quick Guide</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Suno six workflows comparison">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Input</th>
              <th>Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Music Generation</strong></td>
              <td>Prompt (+ optional custom mode: style, title, lyrics)</td>
              <td>New songs from text</td>
            </tr>
            <tr>
              <td><strong>Music Extension</strong></td>
              <td>Audio ID from prior generate + optional custom params</td>
              <td>Continue an existing Suno track</td>
            </tr>
            <tr>
              <td><strong>Audio Cover</strong></td>
              <td>Upload audio (≤2 min) + style/title</td>
              <td>Style reimagination of a clip</td>
            </tr>
            <tr>
              <td><strong>Audio Expansion</strong></td>
              <td>Upload audio (≤2 min) + optional custom params</td>
              <td>Turn short uploads into fuller pieces</td>
            </tr>
            <tr>
              <td><strong>Accompaniment</strong></td>
              <td>Source audio + title + include/exclude tags</td>
              <td>Add backing instruments (no prompt)</td>
            </tr>
            <tr>
              <td><strong>Vocal Generation</strong></td>
              <td>Source audio + prompt + style/tags</td>
              <td>Add sung vocals to instrumental beds</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Suno)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Suno Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Suno form and API (<code>suno_*</code> model keys).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Suno workflow capabilities">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>modelKey</th>
              <th>Required</th>
              <th>Models</th>
              <th>Key controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Music Generation</strong></td>
              <td><code>suno_generate</code></td>
              <td>Prompt</td>
              <td>V3_5–V5</td>
              <td>Simple (500 char) or Custom (style/title, up to 3k–5k prompt); instrumental toggle</td>
            </tr>
            <tr>
              <td><strong>Music Extension</strong></td>
              <td><code>suno_extend</code></td>
              <td>Audio ID (from generate tasks)</td>
              <td>V3_5–V5</td>
              <td>Original params or custom (continueAt, prompt, style max 200, title max 80)</td>
            </tr>
            <tr>
              <td><strong>Audio Cover</strong></td>
              <td><code>suno_upload_cover</code></td>
              <td>Uploaded file URL</td>
              <td>V3_5–V5</td>
              <td>Custom mode; style/title; prompt if not instrumental (3k–5k by model)</td>
            </tr>
            <tr>
              <td><strong>Audio Expansion</strong></td>
              <td><code>suno_upload_extend</code></td>
              <td>Uploaded file URL (≤2 min)</td>
              <td>V3_5–V5</td>
              <td>Default or custom param mode; continueAt when custom</td>
            </tr>
            <tr>
              <td><strong>Accompaniment</strong></td>
              <td><code>suno_add_instrumental</code></td>
              <td>Source audio + title + tags</td>
              <td>V3_5–V5</td>
              <td>Include tags (max 500) + exclude tags (max 500); no prompt</td>
            </tr>
            <tr>
              <td><strong>Vocal Generation</strong></td>
              <td><code>suno_add_vocals</code></td>
              <td>Source audio + prompt + title/style/tags</td>
              <td>V3_5–V5</td>
              <td>Prompt max 5000; vocal gender optional (m/f)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Upload workflows (cover, expand): MP3, WAV, M4A, max <strong>2 minutes</strong> and 10MB. Accompaniment/vocal uploads: max 10MB. Shared sliders: styleWeight, weirdnessConstraint, audioWeight (0–1). V5 offers faster generation and stronger expressiveness.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Suno — Six Music Workflows</h2>
      <p class="section-lead">Pick the mode that matches your starting material:</p>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in audioWorkflows"
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
      🔗 <strong>Suno pipeline tip</strong>
      Start with
      <a
        href="/home/suno/generate"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/suno/generate')"
      >Music Generation</a>
      , then continue the same track via
      <a
        href="/home/suno/extend"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/suno/extend')"
      >Music Extension</a>
      —or upload a short clip to
      <a
        href="/home/suno/upload-extend"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/suno/upload-extend')"
      >Audio Expansion</a>
      and layer
      <a
        href="/home/suno/add-vocals"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/suno/add-vocals')"
      >Vocals</a>
      /
      <a
        href="/home/suno/add-instrumental"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/suno/add-instrumental')"
      >Accompaniment</a>
      as needed.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const audioWorkflows = [
  {
    name: 'Suno Music Generation',
    title: 'Music Generation',
    description: 'Text-to-music—Simple or Custom mode, V3.5–V5, instrumental or vocal tracks.',
    path: '/home/suno/generate',
    icon: 'fas fa-music'
  },
  {
    name: 'Suno Music Extension',
    title: 'Music Extension',
    description: 'Extend a completed generate task—pick Audio ID, optional custom continue point.',
    path: '/home/suno/extend',
    icon: 'fas fa-expand-arrows-alt'
  },
  {
    name: 'Suno Audio Cover',
    title: 'Audio Cover',
    description: 'Upload ≤2 min audio and reimagine style, lyrics, and arrangement.',
    path: '/home/suno/upload-cover',
    icon: 'fas fa-microphone'
  },
  {
    name: 'Suno Audio Expansion',
    title: 'Audio Expansion',
    description: 'Expand uploaded clips into fuller compositions with optional custom params.',
    path: '/home/suno/upload-extend',
    icon: 'fas fa-compress-arrows-alt'
  },
  {
    name: 'Suno Accompaniment',
    title: 'Accompaniment',
    description: 'Add instrumentals via include/exclude tags—no prompt required.',
    path: '/home/suno/add-instrumental',
    icon: 'fas fa-guitar'
  },
  {
    name: 'Suno Vocal Generation',
    title: 'Vocal Generation',
    description: 'Add vocals to source audio—prompt guides lyrics and singing style.',
    path: '/home/suno/add-vocals',
    icon: 'fas fa-user'
  }
]

const workflowIntroMap = {
  '/home/suno/generate': {
    title: '🎵 Suno Music Generation',
    lead: 'Create new tracks from a text prompt—choose <strong>Simple mode</strong> (500 characters) or <strong>Custom mode</strong> with style, title, and longer lyrics (up to 3k–5k depending on model). Toggle <strong>instrumental</strong> for backing-only output. Models <strong>V3.5 through V5</strong> supported.'
  },
  '/home/suno/extend': {
    title: '⏩ Suno Music Extension',
    lead: 'Extend a track you previously generated with Suno—select an <strong>Audio ID</strong> from completed Music Generation tasks. Use <strong>original parameters</strong> or specify custom <strong>continueAt</strong> (seconds), prompt, style, and title for the extended section.'
  },
  '/home/suno/upload-cover': {
    title: '🎤 Suno Audio Cover',
    lead: 'Upload an audio file (<strong>MP3, WAV, or M4A</strong>, max <strong>2 minutes</strong>) and recreate it in a new style. Set <strong>style</strong> and <strong>title</strong>; add lyrics via prompt when not in instrumental mode.'
  },
  '/home/suno/upload-extend': {
    title: '📈 Suno Audio Expansion',
    lead: 'Upload a short clip (≤2 minutes) and expand it into a fuller piece. Enable <strong>custom parameter mode</strong> to set style, title, optional lyrics, and an <strong>expansion time point</strong>—or use default parameters with the upload URL only.'
  },
  '/home/suno/add-instrumental': {
    title: '🎸 Suno Accompaniment',
    lead: 'Add backing instrumentation to an uploaded source track—provide <strong>title</strong>, <strong>include tags</strong> (desired styles), and <strong>exclude tags</strong> (max 500 chars each). No prompt field; control mood purely through tags.'
  },
  '/home/suno/add-vocals': {
    title: '🎙️ Suno Vocal Generation',
    lead: 'Layer sung vocals onto instrumental audio—upload source file, write a <strong>prompt</strong> (max 5000 chars) for lyrics and delivery, plus required <strong>title</strong>, <strong>style</strong>, and <strong>exclude tags</strong>. Optional vocal gender (m/f).'
  }
}

const workflowDefinitionMap = {
  '/home/suno/generate': {
    title: 'What is Suno Music Generation?',
    body:
      '<strong>Suno Music Generation</strong> on FuseAITools (<code>suno_generate</code>) creates new music from a prompt. <strong>Simple mode</strong> needs only a prompt (max 500 chars). <strong>Custom mode</strong> adds required style and title plus longer prompts (3000 chars on V3.5/V4, 5000 on V4.5/V5). Choose models V3_5, V4 (up to ~4 min), V4_5/V4_5PLUS (up to ~8 min), or V5.'
  },
  '/home/suno/extend': {
    title: 'What is Suno Music Extension?',
    body:
      '<strong>Suno Music Extension</strong> on FuseAITools (<code>suno_extend</code>) lengthens an existing Suno generate output. Required: <strong>audioId</strong> (taskId from Music Generation history). Optionally reuse original parameters or supply custom <strong>continueAt</strong> (&gt;0 seconds), prompt (max 3000), style (max 200), and title (max 80).'
  },
  '/home/suno/upload-cover': {
    title: 'What is Suno Audio Cover?',
    body:
      '<strong>Suno Audio Cover</strong> on FuseAITools (<code>suno_upload_cover</code>) reimagines uploaded audio via <strong>fileUrl</strong>. Required: upload + style + title. Prompt required when vocals are enabled (instrumental off). Prompt limits follow the selected model (3k–5k chars). Upload max duration <strong>2 minutes</strong>.'
  },
  '/home/suno/upload-extend': {
    title: 'What is Suno Audio Expansion?',
    body:
      '<strong>Suno Audio Expansion</strong> on FuseAITools (<code>suno_upload_extend</code>) develops uploaded clips into longer works. Required: <strong>fileUrl</strong> (≤2 min). With custom parameter mode: style, title, optional prompt, and <strong>continueAt</strong> for where expansion begins. Instrumental toggle applies when custom mode is on.'
  },
  '/home/suno/add-instrumental': {
    title: 'What is Suno Accompaniment?',
    body:
      '<strong>Suno Accompaniment</strong> on FuseAITools (<code>suno_add_instrumental</code>) adds backing parts to source audio. Required: <strong>fileUrl</strong>, <strong>title</strong> (max 100), <strong>tags</strong> (include styles, max 500), and <strong>negativeTags</strong> (exclude styles, max 500). No prompt—tags define the desired instrumentation.'
  },
  '/home/suno/add-vocals': {
    title: 'What is Suno Vocal Generation?',
    body:
      '<strong>Suno Vocal Generation</strong> on FuseAITools (<code>suno_add_vocals</code>) adds singing to uploaded audio. Required: <strong>fileUrl</strong>, <strong>prompt</strong> (max 5000), <strong>title</strong>, <strong>style</strong> (max 200), and <strong>negativeTags</strong> (max 500). Optional vocal gender m/f and shared weight sliders.'
  }
}

const workflowFaqMap = {
  '/home/suno/generate': [
    {
      question: 'What is the difference between Suno Simple and Custom mode?',
      answer:
        '<strong>Simple mode</strong> only requires a prompt (max <strong>500 characters</strong>)—ideal for quick ideas. <strong>Custom mode</strong> requires <strong>style</strong> and <strong>title</strong> plus a longer prompt/lyrics field (up to <strong>3000</strong> on V3.5/V4 or <strong>5000</strong> on V4.5/V5). Toggle <strong>instrumental</strong> to skip vocals.'
    },
    {
      question: 'Which Suno model should I choose?',
      answer:
        '<strong>V5</strong> offers faster generation and stronger expressiveness. <strong>V4.5+</strong> supports longer tracks (up to ~8 minutes) and 1000-character style fields. <strong>V3.5/V4</strong> cap around ~4 minutes with 200-character style limits—good for quick drafts.'
    }
  ],
  '/home/suno/extend': [
    {
      question: 'Why is my Audio ID list empty on Music Extension?',
      answer:
        'Only tasks completed with <strong>Suno Music Generation</strong> appear in the Audio ID dropdown. Generate a track first, wait for success, then open Music Extension—the list pulls from your generate history (<code>suno_generate</code> tasks).'
    },
    {
      question: 'When do I need continueAt on Music Extension?',
      answer:
        'When using <strong>custom parameters</strong> (<code>defaultParamFlag</code> true), set <strong>continueAt</strong> to a positive second value where the extension should begin—it must be greater than 0 and less than the source track duration.'
    }
  ],
  '/home/suno/upload-cover': [
    {
      question: 'What upload formats does Suno Audio Cover accept?',
      answer:
        '<strong>MP3, WAV, or M4A</strong> files up to <strong>2 minutes</strong> and 10MB. You still need <strong>style</strong> and <strong>title</strong>; add a prompt when generating vocals (instrumental unchecked).'
    },
    {
      question: 'How is Audio Cover different from Audio Expansion?',
      answer:
        '<strong>Cover</strong> reimagines the uploaded clip in a new style (like a cover version). <strong>Expansion</strong> lengthens or develops the clip forward from a time point—better when you have a short sketch to grow.'
    }
  ],
  '/home/suno/upload-extend': [
    {
      question: 'Do I need custom parameters for Audio Expansion?',
      answer:
        'No—leave <strong>custom parameter mode</strong> off to expand with defaults using only the upload URL. Enable it when you need explicit <strong>style</strong>, <strong>title</strong>, lyrics/prompt, and an <strong>expansion time point</strong> (continueAt).'
    },
    {
      question: 'What prompt length applies to Audio Expansion?',
      answer:
        'When custom mode is on and instrumental is off, prompt limits match the model—<strong>3000</strong> chars on V3.5/V4 or <strong>5000</strong> on V4.5/V5. Instrumental expansions use the prompt field for style/mood description instead of lyrics.'
    }
  ],
  '/home/suno/add-instrumental': [
    {
      question: 'Does Suno Accompaniment use a prompt?',
      answer:
        'No—control output with <strong>include tags</strong> (desired styles) and <strong>exclude tags</strong> (unwanted elements), each up to <strong>500 characters</strong>, plus a required <strong>title</strong> and source audio upload.'
    },
    {
      question: 'What should I put in include vs exclude tags?',
      answer:
        'Include tags describe what you want—e.g. <strong>relaxed, piano, strings</strong>. Exclude tags remove unwanted traits—e.g. <strong>heavy metal, fast drums</strong>. Both fields are required in the form.'
    }
  ],
  '/home/suno/add-vocals': [
    {
      question: 'What does the prompt do on Suno Vocal Generation?',
      answer:
        'The prompt (max <strong>5000 characters</strong>) guides <strong>lyrics and vocal delivery</strong> on top of your uploaded instrumental. Also set <strong>style</strong>, <strong>title</strong>, and <strong>exclude tags</strong> for finer control.'
    },
    {
      question: 'Can I choose vocal gender on Suno Vocal Generation?',
      answer:
        'Yes—optionally set vocal gender to <strong>m</strong> (male) or <strong>f</strong> (female). The API treats this as a probability hint, not a guarantee. Style weight sliders (0–1) also apply.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for Suno on FuseAITools?',
    answer:
      'No—Suno runs in the cloud. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How is Suno priced on FuseAITools?',
    answer:
      'Each workflow has its own credit cost (<code>suno_generate</code>, <code>suno_extend</code>, etc.)—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
    icon: '🎼',
    title: 'Six Workflows',
    description:
      'Generate, extend, cover, expand, add instrumentals, or add vocals—one Suno suite on FuseAITools.'
  },
  {
    icon: '⚡',
    title: 'V3.5 Through V5',
    description:
      'Pick model tier by length and quality—<strong>V5</strong> for speed and expressiveness; <strong>V4.5+</strong> for up to ~8-minute tracks.'
  },
  {
    icon: '🎚️',
    title: 'Simple & Custom Modes',
    description:
      'Quick 500-character prompts or full custom control with style, title, lyrics, and weight sliders.'
  },
  {
    icon: '☁️',
    title: 'Cloud on FuseAITools',
    description:
      'Upload, generate, and download in the browser—<strong>credits shown before submit</strong>; chain workflows in one pipeline.'
  }
]

const scenarioTags = [
  'Song demos & sketches',
  'Podcast & video beds',
  'Extend finished tracks',
  'Vocals on instrumentals',
  'Style covers & remixes'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path.startsWith('/home/suno/'))

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
