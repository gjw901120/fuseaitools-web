<template>
  <div
    id="seedance-v2-mini-section"
    class="seedance-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Seedance 2 Mini Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Seedance 2 Mini lightweight multimodal video on FuseAITools—first/last frame, reference images/videos/audio, 4–15s, 480p/720p."
    />

    <div class="version-badge">🎬 Seedance 2 Mini · Lightweight Multimodal Video</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section workflow-definition" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎬 Seedance 2 Mini on FuseAITools</h2>
      <p class="tool-sub">
        Seedance 2 Mini on <a href="/" class="seo-inline-link">FuseAITools</a> is a
        <strong>lightweight multimodal video</strong> model—same feature set as Seedance 2
        (first/last frames, reference images/videos/audio) at <strong>480p or 720p</strong>.
        Ideal when you need fast iteration without 1080p/4K output.
        <strong>4–15 seconds</strong> duration, credits scale by duration and reference usage.
        New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Seedance 2 Mini Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Seedance 2 Mini vs Seedance 2</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedance 2 Mini vs Seedance 2">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Seedance 2 Mini</th>
              <th>Seedance 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Model</td>
              <td><code>seedance-2-mini</code></td>
              <td><code>seedance-2</code></td>
            </tr>
            <tr>
              <td>Reference videos</td>
              <td>Up to <strong>3</strong></td>
              <td>Up to <strong>5</strong></td>
            </tr>
            <tr>
              <td>Resolution</td>
              <td><strong>480p / 720p</strong></td>
              <td><strong>480p / 720p / 1080p / 4K</strong></td>
            </tr>
            <tr>
              <td>Duration</td>
              <td><strong>4–15s</strong> slider</td>
              <td><strong>4–15s</strong> slider</td>
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
      <h2 id="faq-heading" class="section-title">❓ FAQ (Seedance 2 Mini)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Seedance 2 Mini Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Seedance form and API (<code>seedance-2-mini</code>).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedance 2 Mini capabilities">
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
              <td><strong>Seedance 2 Mini</strong></td>
              <td>3–20,000 chars</td>
              <td>First/last frame; ≤9 images total; ≤3 videos; ≤3 audios</td>
              <td>4–15s (slider)</td>
              <td>480p/720p; 1:1–21:9 + adaptive</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        <strong>Web search</strong> toggle is required in the form. Optional <strong>generate audio</strong> for v2-mini outputs. When reference videos are uploaded, credits bill per second including rounded-up reference duration plus output length.
      </p>
    </section>

    <div class="upgrade-tip pricing-tip">
      💳 New users get <strong>20 free credits</strong> on sign-up.
      <a href="/pricing" class="seo-pricing-link">View pricing</a>
      for subscription discounts and credit top-ups.
    </div>

    <div class="upgrade-tip">
      🎬 Need higher resolution or more reference videos?
      <a
        href="/home/seedance/v2"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedance/v2')"
      >Explore Seedance 2 →</a>
      for 480p/720p/1080p/4K output and up to 5 reference videos.
    </div>

    <div class="upgrade-tip">
      ⏱️ Need longer duration or 1080p?
      <a
        href="/home/seedance/v2-5"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedance/v2-5')"
      >Try Seedance 2.5 →</a>
      for 4–30s at 480p/720p/1080p.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const workflowIntro = {
  title: '🎬 Seedance 2 Mini',
  lead: 'Seedance 2 Mini (<code>seedance-2-mini</code>) is a lightweight multimodal video model on FuseAITools—same controls as Seedance 2 at <strong>480p or 720p</strong>. Set <strong>4–15 seconds</strong> on a slider, add optional <strong>first/last frames</strong> and reference <strong>images, videos, and audio</strong>, and enable the required <strong>web search</strong> switch.'
}

const workflowDefinition = {
  title: 'What is Seedance 2 Mini?',
  body:
    '<strong>Seedance 2 Mini</strong> on FuseAITools is a lightweight variant of Seedance 2—same multimodal inputs (prompt up to <strong>20,000 characters</strong>, first/last frames, reference images/videos/audio) at <strong>480p or 720p</strong> resolution. Duration is <strong>4–15 seconds</strong>; ideal for fast iteration, social clips, and cost-effective generation when 1080p/4K is not required.'
}

const workflowFaq = [
  {
    question: 'How is Seedance 2 Mini different from Seedance 2?',
    answer:
      'Seedance 2 Mini outputs at <strong>480p or 720p</strong> only (no 1080p/4K) and supports up to <strong>3 reference videos</strong> (vs 5 on Seedance 2). All other controls—prompt length, duration, aspect ratios, audio generation—are identical.'
  },
  {
    question: 'How many reference files can Seedance 2 Mini use?',
    answer:
      'Up to <strong>9 images total</strong> (first frame + last frame + reference images), <strong>3 reference videos</strong>, and <strong>3 reference audios</strong>. First and last frames count toward the nine-image cap.'
  },
  {
    question: 'Why is web search required on Seedance 2 Mini?',
    answer:
      'The form includes a mandatory <strong>web search</strong> toggle—the API expects this flag on every Seedance 2 Mini request. Leave it on unless product guidance changes.'
  },
  {
    question: 'How is Seedance 2 Mini billed when I upload reference videos?',
    answer:
      'Pricing uses a <strong>per-second</strong> rate. With reference videos, credits multiply by <strong>ceil(reference video duration) + output duration</strong> (output clamped 4–15s). Without reference videos, only output seconds apply—see the Generate button for the exact total.'
  }
]

const commonFaq = [
  {
    question: 'Do I need a local GPU for Seedance 2 Mini?',
    answer:
      'No—Seedance 2 Mini runs in the cloud on FuseAITools. Upload reference URLs in the browser; credits are charged per successful generation.'
  },
  {
    question: 'How do I try Seedance 2 Mini on FuseAITools?',
    answer:
      'Open this workflow and generate. New users receive <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for credit packs and member rates.'
  }
]

const faqItems = computed(() => [...workflowFaq, ...commonFaq])

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
      'Condition with reference <strong>images, videos, and audio</strong>—up to <strong>3</strong> reference videos.'
  },
  {
    icon: '⚡',
    title: 'Lightweight Output',
    description:
      '<strong>480p or 720p</strong> resolution—faster generation and lower credits when high resolution is not needed.'
  },
  {
    icon: '☁️',
    title: 'Cloud on FuseAITools',
    description:
      '<strong>4–15s</strong> outputs at <strong>480p/720p</strong>—per-second credits shown on Generate before submission.'
  }
]

const scenarioTags = [
  'Quick social media clips',
  'Draft previews before full-res render',
  'Cost-effective batch generation',
  'Reference-driven short videos',
  'Mobile-first 9:16 content'
]

watchRouteScroll((path) => path === '/home/seedance/v2-mini' || path === '/home/seedance/v2-mini/')

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
