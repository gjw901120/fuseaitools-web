<template>
  <div
    id="seedance-v2-5-section"
    class="seedance-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Seedance 2.5 Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Seedance 2.5 multimodal video on FuseAITools—first/last frame, reference images/videos/audio, 4–30s, 480p/720p/1080p."
    />

    <div class="version-badge">🎬 Seedance 2.5 · Extended Duration Multimodal Video</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section workflow-definition" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">🎬 Seedance 2.5 on FuseAITools</h2>
      <p class="tool-sub">
        Seedance 2.5 on <a href="/" class="seo-inline-link">FuseAITools</a> extends the Seedance 2
        multimodal feature set with <strong>4–30 second</strong> duration and up to
        <strong>1080p</strong> resolution—ideal for longer storytelling, ads, and social content.
        Same first/last frame and reference media controls as Seedance 2.
        <strong>480p / 720p / 1080p</strong> output, credits scale by duration and reference usage.
        New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Seedance 2.5 Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Seedance 2 Family Comparison</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedance 2 vs 2 Mini vs 2.5">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Seedance 2</th>
              <th>Seedance 2 Mini</th>
              <th>Seedance 2.5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Model</td>
              <td><code>seedance-2</code></td>
              <td><code>seedance-2-mini</code></td>
              <td><code>seedance-2-5</code></td>
            </tr>
            <tr>
              <td>Reference videos</td>
              <td>Up to <strong>5</strong></td>
              <td>Up to <strong>3</strong></td>
              <td>Up to <strong>3</strong></td>
            </tr>
            <tr>
              <td>Resolution</td>
              <td><strong>480p / 720p / 1080p / 4K</strong></td>
              <td><strong>480p / 720p</strong></td>
              <td><strong>480p / 720p / 1080p</strong></td>
            </tr>
            <tr>
              <td>Duration</td>
              <td><strong>4–15s</strong> slider</td>
              <td><strong>4–15s</strong> slider</td>
              <td><strong>4–30s</strong> slider</td>
            </tr>
            <tr>
              <td>Pricing</td>
              <td>Per-second credits</td>
              <td>Per-second credits</td>
              <td>Per-second credits</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Seedance 2.5)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Seedance 2.5 Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Seedance form and API (<code>seedance-2-5</code>).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Seedance 2.5 capabilities">
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
              <td><strong>Seedance 2.5</strong></td>
              <td>3–20,000 chars</td>
              <td>First/last frame; ≤9 images total; ≤3 videos; ≤3 audios</td>
              <td>4–30s (slider)</td>
              <td>480p/720p/1080p; 1:1–21:9 + adaptive</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        <strong>Web search</strong> toggle is required in the form. Optional <strong>generate audio</strong> for 2.5 outputs. When reference videos are uploaded, credits bill per second including rounded-up reference duration plus output length.
      </p>
    </section>

    <div class="upgrade-tip pricing-tip">
      💳 New users get <strong>20 free credits</strong> on sign-up.
      <a href="/pricing" class="seo-pricing-link">View pricing</a>
      for subscription discounts and credit top-ups.
    </div>

    <div class="upgrade-tip">
      🎬 Need 4K output or more reference videos?
      <a
        href="/home/seedance/v2"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/seedance/v2')"
      >Explore Seedance 2 →</a>
      for 480p/720p/1080p/4K output and up to 5 reference videos.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const workflowIntro = {
  title: '🎬 Seedance 2.5',
  lead: 'Seedance 2.5 (<code>seedance-2-5</code>) is an extended-duration multimodal video model on FuseAITools—same controls as Seedance 2 at <strong>480p / 720p / 1080p</strong> with up to <strong>30 seconds</strong>. Set <strong>4–30 seconds</strong> on a slider, add optional <strong>first/last frames</strong> and reference <strong>images, videos, and audio</strong>, and enable the required <strong>web search</strong> switch.'
}

const workflowDefinition = {
  title: 'What is Seedance 2.5?',
  body:
    '<strong>Seedance 2.5</strong> on FuseAITools extends the Seedance 2 multimodal feature set—same inputs (prompt up to <strong>20,000 characters</strong>, first/last frames, reference images/videos/audio) at <strong>480p / 720p / 1080p</strong> resolution. Duration extends to <strong>4–30 seconds</strong>; ideal for longer storytelling, social ads, and extended clips when 4K is not required.'
}

const workflowFaq = [
  {
    question: 'How is Seedance 2.5 different from Seedance 2?',
    answer:
      'Seedance 2.5 supports up to <strong>30 seconds</strong> duration (vs 15s on Seedance 2) and outputs at <strong>480p / 720p / 1080p</strong> (no 4K). It supports up to <strong>3 reference videos</strong> (vs 5 on Seedance 2). All other controls—prompt length, aspect ratios, audio generation—are identical.'
  },
  {
    question: 'How is Seedance 2.5 different from Seedance 2 Mini?',
    answer:
      'Seedance 2.5 adds <strong>1080p</strong> resolution (Mini is 480p/720p only) and extends duration to <strong>30 seconds</strong> (Mini caps at 15s). Both support up to 3 reference videos.'
  },
  {
    question: 'How many reference files can Seedance 2.5 use?',
    answer:
      'Up to <strong>9 images total</strong> (first frame + last frame + reference images), <strong>3 reference videos</strong>, and <strong>3 reference audios</strong>. First and last frames count toward the nine-image cap.'
  },
  {
    question: 'Why is web search required on Seedance 2.5?',
    answer:
      'The form includes a mandatory <strong>web search</strong> toggle—the API expects this flag on every Seedance 2.5 request. Leave it on unless product guidance changes.'
  },
  {
    question: 'How is Seedance 2.5 billed when I upload reference videos?',
    answer:
      'Pricing uses a <strong>per-second</strong> rate. With reference videos, credits multiply by <strong>ceil(reference video duration) + output duration</strong> (output clamped 4–30s). Without reference videos, only output seconds apply—see the Generate button for the exact total.'
  }
]

const commonFaq = [
  {
    question: 'Do I need a local GPU for Seedance 2.5?',
    answer:
      'No—Seedance 2.5 runs in the cloud on FuseAITools. Upload reference URLs in the browser; credits are charged per successful generation.'
  },
  {
    question: 'How do I try Seedance 2.5 on FuseAITools?',
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
    icon: '⏱️',
    title: 'Extended Duration',
    description:
      '<strong>4–30 seconds</strong> on a continuous slider—double the range of Seedance 2 for longer storytelling and ads.'
  },
  {
    icon: '📺',
    title: 'Up to 1080p',
    description:
      '<strong>480p / 720p / 1080p</strong> resolution—full HD output when 4K is not needed.'
  }
]

const scenarioTags = [
  'Extended storytelling (15–30s)',
  'Social media ads and promos',
  'Product showcase videos',
  'Reference-driven short films',
  'Mobile-first 9:16 content'
]

watchRouteScroll((path) => path === '/home/seedance/v2-5' || path === '/home/seedance/v2-5/')

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
