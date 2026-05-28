<template>
  <div
    id="wan-26-section"
    class="wan-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Wan 2.6 - Role-Play Video Generation Model" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="China's first reference-to-video model with role-play, smart storyboarding, and audio-video sync—up to 15s 1080P output."
    />

    <div class="version-badge">🎭 Wan 2.6 · Role-Play Master · Released January 2026</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎭 Everyone Can Star: Wan 2.6 Defines Role-Play Video Generation</h2>
      <p class="tool-sub">
        Wan 2.6 is the world's first large-scale commercial <strong>role-play video generation model</strong>.
        Upload a reference video (selfie, pet, product)—the model extracts appearance and voice, then
        <strong>casts that character into brand-new AI-generated scenes</strong>. You become the star of the video.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Wan 2.6 Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Wan 2.6 vs. Traditional Video Models</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Wan 2.6 vs traditional text-to-video models">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Wan 2.6</th>
              <th>Traditional text-to-video</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Core strength</td>
              <td><strong>Role-play</strong> (R2V reference-to-video)</td>
              <td>Text/image only—cannot reuse a specific character</td>
            </tr>
            <tr>
              <td>Character consistency</td>
              <td>Very high (reference-driven)</td>
              <td>Appearance drifts between generations</td>
            </tr>
            <tr>
              <td>Audio-video sync</td>
              <td>Native optimization; lip accuracy 90%+</td>
              <td>Often needs post dubbing and alignment</td>
            </tr>
            <tr>
              <td>Output length</td>
              <td>5–15s 1080P</td>
              <td>Usually 3–10s</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">* Wan 2.6 is China's first reference-to-video model—a pioneering lead of 6+ months over peers.</p>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Wan 2.6)</h2>
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
      <h2 id="workflows-heading" class="section-title">Wan 2.6 — Three Video Workflows</h2>
      <p class="section-lead">FuseAITools integrates all Wan 2.6 video modes. Pick the workflow that fits your task:</p>
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
      💡 Want director-level control? Try
      <a
        href="/home/wan/v2-7-text-to-video"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/wan/v2-7-text-to-video')"
      >Wan 2.7 →</a>
      —natural-language video editing, up to 5 character references, and fine-grained prompt control.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  {
    name: 'Wan 2.6 Text to Video',
    title: 'Text to Video',
    description: 'Describe role-play scenes and multi-shot stories in text—output with synced audio and video.',
    path: '/home/wan/text-to-video',
    icon: 'fas fa-font'
  },
  {
    name: 'Wan 2.6 Image to Video',
    title: 'Image to Video',
    description: 'Upload stills with optional prompts—animate people, products, and posters.',
    path: '/home/wan/image-to-video',
    icon: 'fas fa-image'
  },
  {
    name: 'Wan 2.6 Video to Video',
    title: 'Video to Video',
    description: 'Upload reference footage; extract look and voice, then generate new scenes (core R2V workflow).',
    path: '/home/wan/video-to-video',
    icon: 'fas fa-video'
  }
]

const workflowIntroMap = {
  '/home/wan/text-to-video': {
    title: '📝 Wan 2.6 Text to Video',
    lead: 'Describe scenes in natural language—Wan 2.6 builds <strong>multi-shot coherent narratives</strong> with strong subject consistency and native audio-video sync. Ideal for vlogs, short drama beats, and social clips without filming.'
  },
  '/home/wan/image-to-video': {
    title: '🖼️ Wan 2.6 Image to Video',
    lead: 'Upload one or more still images with optional prompts. Wan 2.6 animates while keeping <strong>face, outfit, and style</strong> stable—great for product heroes, avatars, and character teasers.'
  },
  '/home/wan/video-to-video': {
    title: '🎬 Wan 2.6 Video to Video (R2V)',
    lead: 'Upload a <strong>5–15s reference video</strong> (up to <strong>2 subjects</strong>). The model extracts appearance and voice, then places the character in a new AI scene—the core “you as the lead” role-play workflow.'
  }
}

const workflowIntro = computed(() => {
  const path = route.path.replace(/\/$/, '')
  return workflowIntroMap[path] || null
})

const coreFeatures = [
  {
    icon: '🎭',
    title: 'Role-Play (R2V)',
    description:
      'Upload reference video or images (up to <strong>2</strong>). The model extracts look, motion, and voice, then blends them into new scenes—solo, duo, or human-and-object shots.'
  },
  {
    icon: '🎬',
    title: 'Smart Storyboarding',
    description:
      'Simple prompts become coherent multi-shot stories with high subject and scene consistency—built for short video and micro-drama.'
  },
  {
    icon: '🔊',
    title: 'Enhanced Audio-Video Sync',
    description:
      'Optimized for dialogue and song scenes—lip match improved ~40%, with natural ambient sound.'
  },
  {
    icon: '🎥',
    title: 'Cinematic Output',
    description: 'Up to <strong>15 seconds at 1080P</strong>, 24 fps—enough for film-style storytelling.'
  }
]

const scenarioTags = [
  'Personal vlog / virtual avatar',
  'Pet fun videos',
  'E-commerce product motion',
  'Short-drama character acting',
  'Social viral content'
]

const faqItems = [
  {
    question: '1. What are the reference video requirements?',
    answer:
      'Use <strong>5–15 seconds</strong> of clear, front-facing footage without heavy occlusion. People, pets, and objects are supported—the model extracts features automatically; <strong>no fine-tuning required</strong>.'
  },
  {
    question: '2. How many reference subjects are supported?',
    answer: 'Wan 2.6 supports up to <strong>2</strong> reference videos or images—for duets or human-and-pet co-stars.'
  },
  {
    question: '3. How long does one generation take?',
    answer:
      'A 5s clip takes about <strong>45 seconds</strong>; at 1080P, Wan 2.6 is roughly <strong>40% faster</strong> than comparable models.'
  },
  {
    question: '4. How do I try Wan 2.6 on FuseAITools?',
    answer:
      'Choose any Wan 2.6 workflow above. New users receive <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for member rates.'
  }
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll(
  (path) => path.startsWith('/home/wan/') && !path.includes('v2-7') && !path.includes('2-7-image')
)

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
