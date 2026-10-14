<template>
  <div
    id="wan-30-section"
    class="wan-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Wan 3.0 Video on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Wan 3.0 Video on FuseAITools—one unified entry for text-to-video, first/last frame, all-capability reference, file, and link generation. 2–30s clips at 480p/720p/1080p with per-second credit pricing."
    />

    <div class="version-badge">🎬 Wan 3.0 · One Entry, Five Input Modes · 2–30s · Per-Second Pricing</div>

    <section class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">📝 Wan 3.0 Video</h2>
      <p class="tool-sub">
        Wan 3.0 Video on <a href="/" class="seo-inline-link">FuseAITools</a> collapses five generation paths into
        <strong>one workflow</strong>: switch between <strong>Text</strong>, <strong>First/Last Frame</strong>,
        <strong>Reference</strong> (up to 10 images / 5 videos / 5 audio clips), <strong>File</strong>, and
        <strong>Link</strong> inside the form. Write prompts up to <strong>20000 characters</strong>, output
        <strong>2–30 seconds</strong> at <strong>480p / 720p / 1080p</strong>, and pay
        <strong>per second × resolution</strong> in credits.
      </p>
    </section>

    <section class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">What is Wan 3.0 Video?</h2>
      <p class="tool-sub">
        <strong>Wan 3.0 Video</strong> (<code>wan-3-0-video</code>) on FuseAITools is Alibaba's unified video
        generation entry. A single form handles text-to-video, strict first/last-frame animation, all-capability
        reference generation (cite materials as <strong>Image1 / Video1 / Audio1</strong> in the prompt), file-to-video,
        and link-to-video. Choose <strong>adaptive</strong> or fixed aspect ratios, set duration
        <strong>2–30s</strong>, toggle output audio and the NSFW checker, and pin a seed for reproducibility.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Wan 3.0 Core Features</h2>
      <div class="feature-grid">
        <div v-for="(f, i) in coreFeatures" :key="i" class="feature-card">
          <div class="feature-icon" aria-hidden="true">{{ f.icon }}</div>
          <div class="feature-title">{{ f.title }}</div>
          <p v-html="f.description" />
        </div>
      </div>
    </section>

    <section class="info-section" aria-labelledby="scenarios-heading">
      <h2 id="scenarios-heading" class="section-title">🎯 Built for Long-Form & Reference-Driven Production</h2>
      <div class="scenario-list">
        <span v-for="tag in scenarioTags" :key="tag" class="scenario-badge">{{ tag }}</span>
      </div>
    </section>

    <section class="info-section" aria-labelledby="compare-heading">
      <h2 id="compare-heading" class="section-title">📊 Wan 3.0 vs Wan 2.7</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Wan 3.0 vs Wan 2.7">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Wan 2.7</th>
              <th>Wan 3.0</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Entry</td>
              <td>Separate tabs (T2V / I2V / Edit / R2V)</td>
              <td><strong>One tab, five input modes</strong></td>
            </tr>
            <tr>
              <td>Prompt</td>
              <td>3–5000 chars</td>
              <td><strong>Up to 20000</strong> chars</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td>2–15s</td>
              <td><strong>2–30s</strong> (input-video total + duration ≤ 30s)</td>
            </tr>
            <tr>
              <td>Resolution</td>
              <td>720p / 1080p</td>
              <td><strong>480p / 720p / 1080p</strong></td>
            </tr>
            <tr>
              <td>References</td>
              <td>Up to 5 images/videos (R2V)</td>
              <td><strong>10 images + 5 videos + 5 audio</strong></td>
            </tr>
            <tr>
              <td>Extra inputs</td>
              <td>—</td>
              <td><strong>File</strong> &amp; <strong>Link</strong> to video</td>
            </tr>
            <tr>
              <td>Aspect ratio</td>
              <td>16:9, 9:16, 1:1, 4:3, 3:4</td>
              <td><strong>adaptive</strong>, 16:9, 4:3, 1:1, 3:4, 9:16</td>
            </tr>
            <tr>
              <td>Pricing</td>
              <td>Per generation</td>
              <td><strong>Per second × resolution</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Wan 3.0)</h2>
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
      <h2 id="tech-heading" class="section-title">⚙️ Wan 3.0 Technical Specs</h2>
      <p class="section-lead">
        Parameters below match the FuseAITools Wan 3.0 form and API (<code>wan-3-0-video</code>).
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Wan 3.0 input mode capabilities">
          <thead>
            <tr>
              <th>Input mode</th>
              <th>Required input</th>
              <th>Limits</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Text</strong></td>
              <td>Prompt (≤20000 chars)</td>
              <td>Duration 2–30s</td>
              <td>Prompt is required for pure text-to-video</td>
            </tr>
            <tr>
              <td><strong>First/Last Frame</strong></td>
              <td>First frame URL (last frame optional)</td>
              <td>≤1 image each</td>
              <td>Last frame requires a first frame; can't mix with references</td>
            </tr>
            <tr>
              <td><strong>Reference</strong></td>
              <td>Images / videos / audio</td>
              <td>≤10 img, ≤5 vid, ≤5 audio</td>
              <td>Cite as Image1/Video1/Audio1; input video total + duration ≤ 30s</td>
            </tr>
            <tr>
              <td><strong>File</strong></td>
              <td>One reference file URL</td>
              <td>≤1 file</td>
              <td>Can't combine with link or frame inputs</td>
            </tr>
            <tr>
              <td><strong>Link</strong></td>
              <td>One public web URL</td>
              <td>≤1 link</td>
              <td>Login-free, publicly accessible page only</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Output controls shared across modes: <strong>480p / 720p / 1080p</strong>, aspect ratio
        <strong>adaptive / 16:9 / 4:3 / 1:1 / 3:4 / 9:16</strong>, duration <strong>2–30s</strong>, audio track on/off,
        NSFW checker on/off, and optional seed (0–2147483647). Credits are billed
        <strong>per second × resolution</strong>.
      </p>
    </section>

    <div class="upgrade-tip pricing-tip">
      💳 New users get <strong>20 free credits</strong> on sign-up.
      <a href="/pricing" class="seo-pricing-link">View pricing</a>
      for Wan 3.0 per-second costs.
    </div>

    <div class="upgrade-tip">
      🎞️ Need shorter director-style clips?
      <a
        href="/home/wan/v2-7-text-to-video"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/wan/v2-7-text-to-video')"
      >Wan 2.7 workflows</a>
      remain available for 2–15s generations with natural-language video edit and R2V.
    </div>

    <div class="upgrade-tip">
      🖼️ Still-first pipelines: create keyframes in
      <a
        href="/home/wan/2-7-image-pro"
        class="seo-inline-link"
        @click.prevent="navigateToToolTop('/home/wan/2-7-image-pro')"
      >Wan 2.7 Image Pro (4K)</a>
      then animate them as first/last frames here.
    </div>
  </div>
</template>

<script setup>
const { navigateToToolTop, watchRouteScroll } = useToolSeoPageScroll()

const coreFeatures = [
  {
    icon: '🧩',
    title: 'One Entry, Five Input Modes',
    description:
      'Switch <strong>Text / First-Last Frame / Reference / File / Link</strong> inside a single tab—no page hopping between workflows.'
  },
  {
    icon: '🎚️',
    title: 'All-Capability Reference',
    description:
      'Combine up to <strong>10 images, 5 videos, and 5 audio clips</strong> and cite them as <strong>Image1 / Video1 / Audio1</strong> in the prompt.'
  },
  {
    icon: '⏱️',
    title: 'Longer 2–30s Clips',
    description:
      'Extended duration up to <strong>30 seconds</strong> (input-video total + duration stays ≤ 30s) at <strong>480p–1080p</strong>.'
  },
  {
    icon: '📄',
    title: 'File & Link to Video',
    description:
      'Turn a single uploaded <strong>file</strong> or a public <strong>web link</strong> into a video—inputs the 2.7 lineup didn\'t offer.'
  }
]

const scenarioTags = [
  'Long-form brand films',
  'Reference-locked character scenes',
  'File / link-driven explainers',
  'Storyboard keyframe animation',
  'Audio-synced shorts'
]

const faqItems = [
  {
    question: 'How many reference media can Wan 3.0 accept?',
    answer:
      'In <strong>Reference</strong> mode you can pass up to <strong>10 images</strong>, <strong>5 videos</strong> (each 1–15s, total ≤ 15s), and <strong>5 audio clips</strong>. Reference them in the prompt as <strong>Image1 / Video1 / Audio1</strong>. Total input video duration plus your chosen output duration must stay ≤ <strong>30 seconds</strong>.'
  },
  {
    question: 'Can I combine first/last frame with references or files?',
    answer:
      'No—<strong>first/last frame</strong>, <strong>reference</strong>, <strong>file</strong>, and <strong>link</strong> inputs are mutually exclusive. <strong>last_frame_url</strong> also requires a <strong>first_frame_url</strong>. Pick one input mode per generation.'
  },
  {
    question: 'What resolutions and aspect ratios does Wan 3.0 support?',
    answer:
      'Resolution is <strong>480p, 720p, or 1080p</strong> (default 1080p). Aspect ratio can be <strong>adaptive</strong> (auto from inputs, default) or fixed <strong>16:9, 4:3, 1:1, 3:4, 9:16</strong>.'
  },
  {
    question: 'How is Wan 3.0 priced on FuseAITools?',
    answer:
      'Credits are billed <strong>per second × resolution</strong>. The form shows the estimate before you generate: it takes the per-second rate for your chosen resolution and multiplies by the duration in seconds.'
  },
  {
    question: 'Do I need a local GPU, and how do I start?',
    answer:
      'No—Wan 3.0 runs in the cloud. Open the <strong>Wan 3.0</strong> tab, choose an input mode, and generate. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for top-ups.'
  }
]

useToolSeoFaqSchema(faqItems)

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}

watchRouteScroll((path) => path.includes('v3-0-video'))
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
