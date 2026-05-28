<template>
  <div
    id="wan-27-section"
    class="wan-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Wan 2.7 - Full-Stack AI Video Creation Platform" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="End-to-end AI video: natural-language editing, up to 5 character references, pro camera moves, and first/last-frame control."
    />

    <div class="version-badge">🎬 Wan 2.7 · Direct & Perform · Full Creation Pipeline · April 2026</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎬 From Actor to Director: Wan 2.7 Defines the Full Pipeline</h2>
      <p class="tool-sub">
        Wan 2.7 is a paradigm shift—not just generating clips, but directing like a filmmaker with
        <strong>natural-language commands</strong> across <strong>generate, edit, replicate, reshape, drive, and extend</strong>.
        Adjust expressions, swap dialogue, and apply cinematic camera moves in one cloud workflow.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Wan 2.7 Core Features (Full Toolkit)</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Wan 2.7 vs Wan 2.6: Key Upgrades</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Wan 2.7 vs Wan 2.6">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Wan 2.6</th>
              <th>Wan 2.7 (upgrade)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Positioning</td>
              <td>Role-play (“everyone stars”)</td>
              <td><strong>Full pipeline (direct & perform)</strong></td>
            </tr>
            <tr>
              <td>R2V references</td>
              <td>Up to 2</td>
              <td><strong>Up to 5</strong> characters/objects</td>
            </tr>
            <tr>
              <td>Video editing</td>
              <td>—</td>
              <td><strong>Natural-language edit</strong> (add/remove, swap scene, restyle)</td>
            </tr>
            <tr>
              <td>Camera control</td>
              <td>Basic multi-shot</td>
              <td><strong>Pro move library</strong> (dolly zoom, 360° orbit, etc.)</td>
            </tr>
            <tr>
              <td>First/last frame</td>
              <td>Basic first-frame anchor</td>
              <td><strong>Precise start/end</strong> + video extend</td>
            </tr>
            <tr>
              <td>Input modalities</td>
              <td>Text, image, reference video</td>
              <td>Text, image, video, audio unified</td>
            </tr>
            <tr>
              <td>Output length</td>
              <td>5–15s</td>
              <td>2–15s (extend for longer clips)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">Wan 2.7 is not a minor iteration—it moves from “asset generation” to “end-to-end directing.”</p>
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

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Wan 2.7 — Four Video Workflows</h2>
      <p class="section-lead">FuseAITools ships the full Wan 2.7 video suite. Choose the mode that matches your production step:</p>
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

    <div class="upgrade-tip">
      🎭 Prefer simple role-play? <strong>Wan 2.6</strong> is still available for fast “you as the lead” shorts.<br />
      👉
      <a
        href="/home/wan/text-to-video"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/wan/text-to-video')"
      >Explore Wan 2.6 role-play</a>
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
    description: 'Generate 2–15s clips from prompts with pro camera presets, audio input, and extend.',
    path: '/home/wan/v2-7-text-to-video',
    icon: 'fas fa-font'
  },
  {
    name: 'Wan 2.7 Image to Video',
    title: 'Image to Video',
    description: 'First/last frame control, driving audio, and reference clips for precise motion.',
    path: '/home/wan/v2-7-image-to-video',
    icon: 'fas fa-images'
  },
  {
    name: 'Wan 2.7 Video Edit',
    title: 'Video Edit',
    description: 'Upload footage and edit with natural language—swap backgrounds, objects, and performance.',
    path: '/home/wan/v2-7-video-edit',
    icon: 'fas fa-edit'
  },
  {
    name: 'Wan 2.7 R2V',
    title: 'R2V (Reference to Video)',
    description: 'Up to 5 reference images/videos—lock look and voice for complex ensemble scenes.',
    path: '/home/wan/v2-7-r2v',
    icon: 'fas fa-layer-group'
  }
]

const workflowIntroMap = {
  '/home/wan/v2-7-text-to-video': {
    title: '📝 Wan 2.7 Text to Video',
    lead: 'Describe scenes and camera intent in detail—Wan 2.7 applies <strong>pro camera moves</strong>, optional <strong>audio guidance</strong>, and 2–15s output. Ideal for ads, trailers, and scripted shorts.'
  },
  '/home/wan/v2-7-image-to-video': {
    title: '🖼️ Wan 2.7 Image to Video',
    lead: 'Set <strong>first and last frames</strong>, optional driving audio, and reference clips. Reduce abrupt endings and extend smoothly—built for product films and keyframe-driven animation.'
  },
  '/home/wan/v2-7-video-edit': {
    title: '✂️ Wan 2.7 Video Edit',
    lead: 'Upload existing video and instruct changes in plain language—“make it rain,” “make the hero smile,” “remove the passerby on the left.” Video is <strong>editable like a document</strong> in the cloud.'
  },
  '/home/wan/v2-7-r2v': {
    title: '👥 Wan 2.7 R2V',
    lead: 'Combine up to <strong>5</strong> reference images or videos with optional voice lock. Each subject keeps a stable look and timbre—perfect for ensemble ads, game CG, and branded character series.'
  }
}

const workflowIntro = computed(() => {
  const path = route.path.replace(/\/$/, '')
  return workflowIntroMap[path] || null
})

const coreFeatures = [
  {
    icon: '✂️',
    title: 'Natural-Language Editing',
    description:
      'Change details with text: “rainy background,” “make the lead smile,” “remove the person on the left.” Video is <strong>editable like a document</strong>.'
  },
  {
    icon: '👥',
    title: 'Multi-Character R2V+',
    description:
      'Up to <strong>5</strong> video or image references—lock each subject’s look and voice for complex group scenes.'
  },
  {
    icon: '🎥',
    title: 'Pro Camera Library',
    description:
      'Dozens of moves: Hitchcock zoom, 360° orbit, FPV dive, one-take shots—apply in one click.'
  },
  {
    icon: '🔄',
    title: 'First/Last Frame + Extend',
    description:
      'Pin start and end frames to remove “hard stops.” Extend with a target end frame for seamless lengthening.'
  },
  {
    icon: '🎙️',
    title: 'Dialogue Replace & Lip Sync',
    description:
      'Rewrite any line—the model re-voices and matches lips and timbre, including multiple languages.'
  }
]

const scenarioTags = [
  'Film trailers / TVC ads',
  'Game CG & cutscenes',
  'Brand video at scale',
  'Short-drama industrial pipelines',
  'Education & explainer animation'
]

const faqItems = [
  {
    question: '1. Can Wan 2.7 edit existing videos?',
    answer:
      'Yes. Upload any clip and instruct changes—replace backgrounds, add objects, or adjust performance via the <strong>Video Edit</strong> workflow.'
  },
  {
    question: '2. How long can I edit or extend?',
    answer:
      'Video Edit supports up to <strong>30 seconds</strong> for frame-level edits and extend; 60-second support is on the roadmap.'
  },
  {
    question: '3. Do I need a local GPU?',
    answer:
      'No—everything runs in the cloud. Use any modern browser on <a href="/" class="seo-inline-link">FuseAITools</a>.'
  },
  {
    question: '4. How do I try Wan 2.7?',
    answer:
      'Choose any Wan 2.7 workflow above. New users receive <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for member discounts.'
  }
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
