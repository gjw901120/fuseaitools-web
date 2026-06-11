<template>
  <div
    id="happyhorse-v1-section"
    class="happyhorse-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="HappyHorse v1 Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="HappyHorse v1 text, image, reference, and video-edit workflows on FuseAITools—native audio-video generation at 720p/1080p, 3–15s clips."
    />

    <div class="version-badge">🐴 HappyHorse v1 · Native Audio-Video · Four Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🐴 HappyHorse v1 on FuseAITools</h2>
      <p class="tool-sub">
        HappyHorse v1 on <a href="/" class="seo-inline-link">FuseAITools</a> targets
        <strong>native audio-video joint generation</strong>—dialogue, lip sync, and ambient sound in one pass.
        Pick text-to-video, image-to-video, reference-to-video, or video edit; each workflow shows
        <strong>credits required</strong> before you generate. New users receive
        <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ HappyHorse v1 Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 HappyHorse v1 vs Traditional Two-Stage Video</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="HappyHorse v1 vs traditional text-to-video">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>HappyHorse v1</th>
              <th>Traditional two-stage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Audio</td>
              <td><strong>Native audio-video</strong> in one generation pass</td>
              <td>Silent video, then separate dubbing and alignment</td>
            </tr>
            <tr>
              <td>Lip sync</td>
              <td>Built into the model output</td>
              <td>Often requires post-production fixes</td>
            </tr>
            <tr>
              <td>Workflows on FuseAITools</td>
              <td><strong>Four modes</strong>—T2V, I2V, reference, edit</td>
              <td>Separate tools per step</td>
            </tr>
            <tr>
              <td>Output (form)</td>
              <td><strong>3–15s</strong> (generate modes); <strong>720p / 1080p</strong></td>
              <td>Varies by provider</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (HappyHorse v1)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ HappyHorse v1 Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools HappyHorse form and API (<code>happyhorse-*</code> models).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="HappyHorse v1 workflow capabilities">
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
              <td>Prompt (1–5000 chars)</td>
              <td>3–15s</td>
              <td>720p / 1080p; 16:9, 9:16, 1:1, 4:3, 3:4</td>
              <td>Optional seed</td>
            </tr>
            <tr>
              <td><strong>Image to Video</strong></td>
              <td>1 image URL + optional prompt</td>
              <td>3–15s</td>
              <td>720p / 1080p</td>
              <td>Prompt optional (max 5000); seed</td>
            </tr>
            <tr>
              <td><strong>Reference to Video</strong></td>
              <td>Prompt + 1–9 reference images</td>
              <td>3–15s</td>
              <td>720p / 1080p; aspect ratios as T2V</td>
              <td>Use character1/2/3… placeholders in prompt</td>
            </tr>
            <tr>
              <td><strong>Video Edit</strong></td>
              <td>Video URL (MP4/MOV) + prompt</td>
              <td>Billed by source length (ceil sec, API 3–60s)</td>
              <td>720p / 1080p</td>
              <td>0–5 reference images; audio auto/origin; seed</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Image inputs: JPEG, JPG, PNG, WebP (max 10MB). Video edit accepts MP4 or MOV. Credits are shown on the Generate button before submission.
      </p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">HappyHorse v1 — Four Video Workflows</h2>
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
      for subscription discounts and credit top-ups.
    </div>

    <div class="upgrade-tip">
      🎬 Need multi-reference or director-style editing?
      <a
        href="/home/wan/v2-7-text-to-video"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/wan/v2-7-text-to-video')"
      >Explore Wan 2.7 →</a>
      for frame control, natural-language edit, and R2V with up to five references.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  {
    name: 'HappyHorse v1 Text to Video',
    title: 'Text to Video',
    description: 'Prompt-only clips with aspect ratio, 3–15s, and 720p/1080p—native audio included.',
    path: '/home/happy-horse/v1-text-to-video',
    icon: 'fas fa-font'
  },
  {
    name: 'HappyHorse v1 Image to Video',
    title: 'Image to Video',
    description: 'Animate one still image with an optional motion prompt—3–15s at 720p/1080p.',
    path: '/home/happy-horse/v1-image-to-video',
    icon: 'fas fa-image'
  },
  {
    name: 'HappyHorse v1 Reference to Video',
    title: 'Reference to Video',
    description: '1–9 reference images with character placeholders for consistent multi-subject scenes.',
    path: '/home/happy-horse/v1-reference-to-video',
    icon: 'fas fa-images'
  },
  {
    name: 'HappyHorse v1 Video Edit',
    title: 'Video Edit',
    description: 'Upload MP4/MOV and edit with natural language—optional references and audio setting.',
    path: '/home/happy-horse/v1-video-edit',
    icon: 'fas fa-edit'
  }
]

const workflowIntroMap = {
  '/home/happy-horse/v1-text-to-video': {
    title: '📝 HappyHorse v1 Text to Video',
    lead: 'Describe scenes in text—HappyHorse v1 generates <strong>video with synced audio</strong> in one pass. Set <strong>3–15 seconds</strong>, <strong>720p or 1080p</strong>, and aspect ratio from 16:9 to 3:4.'
  },
  '/home/happy-horse/v1-image-to-video': {
    title: '🖼️ HappyHorse v1 Image to Video',
    lead: 'Upload <strong>one image</strong> and optionally guide motion with a prompt. Output is <strong>3–15 seconds</strong> at <strong>720p/1080p</strong> with native audio-video generation.'
  },
  '/home/happy-horse/v1-reference-to-video': {
    title: '👥 HappyHorse v1 Reference to Video',
    lead: 'Provide <strong>1–9 ordered reference images</strong> plus a prompt with <strong>character1, character2…</strong> placeholders. Control aspect ratio and duration like text-to-video.'
  },
  '/home/happy-horse/v1-video-edit': {
    title: '✂️ HappyHorse v1 Video Edit',
    lead: 'Upload <strong>MP4 or MOV</strong> footage and describe edits in plain language. Optional <strong>0–5 reference images</strong>; choose whether to keep original audio or let the model regenerate it.'
  }
}

const workflowDefinitionMap = {
  '/home/happy-horse/v1-text-to-video': {
    title: 'What is HappyHorse v1 Text to Video?',
    body:
      '<strong>HappyHorse v1 Text to Video</strong> on FuseAITools turns a prompt (1–5000 characters) into a short MP4 with <strong>native audio-video sync</strong>. Choose <strong>3–15s</strong> duration, <strong>720p or 1080p</strong>, and aspect ratios <strong>16:9, 9:16, 1:1, 4:3, or 3:4</strong>—ideal for social clips and dialogue-driven scenes.'
  },
  '/home/happy-horse/v1-image-to-video': {
    title: 'What is HappyHorse v1 Image to Video?',
    body:
      '<strong>HappyHorse v1 Image to Video</strong> on FuseAITools animates a <strong>single uploaded image</strong> with optional prompt guidance. Duration is <strong>3–15 seconds</strong> at <strong>720p/1080p</strong>; the prompt is optional (max 5000 characters).'
  },
  '/home/happy-horse/v1-reference-to-video': {
    title: 'What is HappyHorse v1 Reference to Video?',
    body:
      '<strong>HappyHorse v1 Reference to Video</strong> on FuseAITools generates from <strong>1–9 reference images</strong> plus a required prompt. Map subjects with <strong>character1, character2…</strong> placeholders in the prompt for consistent multi-character output at 720p/1080p.'
  },
  '/home/happy-horse/v1-video-edit': {
    title: 'What is HappyHorse v1 Video Edit?',
    body:
      '<strong>HappyHorse v1 Video Edit</strong> on FuseAITools edits uploaded video with natural-language instructions. Required: <strong>video URL + prompt</strong>. Credits bill by <strong>source duration (rounded up)</strong>; optional reference images and audio setting <strong>auto</strong> or <strong>origin</strong>.'
  }
}

const workflowFaqMap = {
  '/home/happy-horse/v1-text-to-video': [
    {
      question: 'What aspect ratios does HappyHorse v1 text-to-video support?',
      answer:
        'Yes—choose <strong>16:9, 9:16, 1:1, 4:3, or 3:4</strong> in the form, plus <strong>720p or 1080p</strong> and <strong>3–15 second</strong> duration.'
    },
    {
      question: 'Does HappyHorse v1 text-to-video include audio?',
      answer:
        'Yes—HappyHorse v1 generates <strong>video and synced audio together</strong> in one pass, including dialogue and ambient sound when described in your prompt.'
    }
  ],
  '/home/happy-horse/v1-image-to-video': [
    {
      question: 'Is a prompt required for HappyHorse v1 image-to-video?',
      answer:
        'No—the prompt is <strong>optional</strong> (max 5000 characters). You must upload <strong>exactly one image</strong> (JPEG/PNG/WebP, max 10MB). Duration is <strong>3–15s</strong> at 720p/1080p.'
    },
    {
      question: 'Can I set aspect ratio on HappyHorse v1 image-to-video?',
      answer:
        'No—aspect ratio controls apply to <strong>text-to-video</strong> and <strong>reference-to-video</strong> only. Image-to-video follows your input frame composition.'
    }
  ],
  '/home/happy-horse/v1-reference-to-video': [
    {
      question: 'How many reference images can HappyHorse v1 use?',
      answer:
        'Between <strong>1 and 9</strong> reference images. Align prompt placeholders (<strong>character1, character2…</strong>) with upload order for consistent subjects.'
    },
    {
      question: 'What prompt format works best for reference-to-video?',
      answer:
        'Use explicit character tags in the prompt—e.g. “<strong>character1</strong> walks beside <strong>character2</strong>”—matching the order of uploaded reference images.'
    }
  ],
  '/home/happy-horse/v1-video-edit': [
    {
      question: 'How is HappyHorse v1 video edit billed?',
      answer:
        'Credits are based on <strong>source video length rounded up</strong> (shown in the form after upload). The API accepts durations between <strong>3 and 60 seconds</strong> derived from your clip.'
    },
    {
      question: 'What does the audio setting do on video edit?',
      answer:
        'Choose <strong>auto</strong> to let the model regenerate audio, or <strong>origin</strong> to preserve the uploaded clip’s audio track when supported.'
    }
  ]
}

const commonFaq = [
  {
    question: 'Do I need a local GPU for HappyHorse v1?',
    answer:
      'No—HappyHorse v1 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
  },
  {
    question: 'How is HappyHorse v1 priced on FuseAITools?',
    answer:
      'Generate modes bill <strong>per second</strong> at the resolution you select—the exact credits appear on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
    icon: '🔊',
    title: 'Native Audio-Video Sync',
    description:
      'Generate <strong>video and audio together</strong>—dialogue, lip movement, and ambient sound in one workflow instead of separate dubbing.'
  },
  {
    icon: '👥',
    title: 'Reference-Driven Casting',
    description:
      'Reference-to-video accepts <strong>1–9 images</strong> with character placeholders for consistent multi-subject scenes.'
  },
  {
    icon: '✂️',
    title: 'Natural-Language Video Edit',
    description:
      'Upload MP4/MOV and instruct changes in text—optional <strong>0–5 reference images</strong> and audio auto/origin controls.'
  },
  {
    icon: '☁️',
    title: 'Cloud on FuseAITools',
    description:
      'Four v1 workflows in the browser—<strong>credits shown before generate</strong>; no local GPU install required.'
  }
]

const scenarioTags = [
  'Short drama & dialogue clips',
  'Brand ads with voiceover',
  'Social & vertical video',
  'Character-consistent promos',
  'Quick video edits in the cloud'
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path.startsWith('/home/happy-horse/'))

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
