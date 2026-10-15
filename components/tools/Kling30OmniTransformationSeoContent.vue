<template>
  <div
    id="kling-3-0-omni-transformation-section"
    class="kling-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Kling 3.0 Omni Video Transformation on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Kling 3.0 Omni Video Transformation turns one uploaded source video into a restyled clip from a prompt, with optional reference images. Billed by the actual video length at 720p/1080p/4K."
    />

    <div class="version-badge">🎬 Kling 3.0 Omni · Video Transformation · Video-to-Video · 720p/1080p/4K</div>

    <section class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">🔄 Kling 3.0 Omni Video Transformation</h2>
      <p class="tool-sub">
        Upload <strong>one source video</strong> (MP4/MOV, 3–15.5s), describe the target look in a prompt
        (≤<strong>3072</strong> chars), and optionally add up to <strong>4 reference images</strong> to steer the style.
        There is <strong>no duration selector</strong>—credits are matched to the <strong>actual uploaded video length</strong>
        (rounded up) and your chosen <strong>resolution</strong> (720p / 1080p / 4K). Before you upload, a 5s example price is shown.
      </p>
    </section>

    <section class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">What is Kling 3.0 Omni Video Transformation?</h2>
      <p class="tool-sub">
        <strong>Kling 3.0 Omni Video Transformation</strong> (<code>kling-3.0-omni-transformation</code>) is a
        video-to-video mode in the Omni family on
        <a href="/" class="seo-inline-link">FuseAITools</a>. Instead of generating a clip from scratch, it restyles an
        existing uploaded clip with a text prompt and optional reference images—ideal for re-cutting footage, changing
        mood or art direction, and iterating on takes you already have.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 How Billing Works</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling 3.0 Omni Video Transformation billing">
          <thead>
            <tr><th>Aspect</th><th>Behavior</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Duration</strong></td>
              <td>Read from your uploaded video and rounded up to whole seconds—no manual selection.</td>
            </tr>
            <tr>
              <td><strong>Default preview</strong></td>
              <td>Before a video is uploaded, a 5s example price is shown.</td>
            </tr>
            <tr>
              <td><strong>Price dimensions</strong></td>
              <td>Matched by actual duration and resolution (720p / 1080p / 4K). No audio or scene surcharge.</td>
            </tr>
            <tr>
              <td><strong>Aspect ratio</strong></td>
              <td><code>auto</code> for video-only; 16:9 / 9:16 / 1:1 when reference images are attached.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        💳 Credits per generation = the rate matched for your uploaded clip's rounded-up length and the selected
        resolution. Because a source video is always present, audio is kept off and never affects pricing.
        See <a href="/pricing" class="seo-pricing-link">pricing</a> for subscription discounts and top-ups.
      </p>
    </section>

    <section class="info-section" aria-labelledby="tech-heading">
      <h2 id="tech-heading" class="section-title">⚙️ Technical Specs</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling 3.0 Omni Video Transformation capabilities">
          <thead>
            <tr><th>Specification</th><th>Details</th></tr>
          </thead>
          <tbody>
            <tr><td>Model Key</td><td><code>kling-3.0-omni-transformation</code></td></tr>
            <tr><td>Input Video</td><td>Exactly 1 MP4/MOV, 3–15.5s, 700–4553px, aspect 0.4–2, 24–60fps</td></tr>
            <tr><td>Reference Images</td><td>Optional, up to 4 (JPG/JPEG/PNG)</td></tr>
            <tr><td>Prompt</td><td>Required, up to 3,072 characters</td></tr>
            <tr><td>Duration</td><td>Derived from the uploaded video (rounded up)</td></tr>
            <tr><td>Resolution</td><td>720p / 1080p / 4K</td></tr>
            <tr><td>Aspect Ratio</td><td>Auto (video-only) or 16:9 / 9:16 / 1:1 (with images)</td></tr>
            <tr><td>API Endpoint</td><td><code>/api/video/kling/3-0-omni-transformation</code></td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="vs-omni-heading">
      <h2 id="vs-omni-heading" class="section-title">🆚 Video Transformation vs Omni Generation</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Kling 3.0 Omni Video Transformation vs Text / Image / Reference generation">
          <thead>
            <tr><th>Dimension</th><th>Omni Generation (Text / Image / Reference)</th><th>Video Transformation</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Input</strong></td>
              <td>Prompt, image(s) or up to 7 images + 3 role videos</td>
              <td>One required source video (3–15.5s) + prompt, optional ≤4 images</td>
            </tr>
            <tr>
              <td><strong>Duration</strong></td>
              <td>Chosen 3–15s slider</td>
              <td>Read from the uploaded clip (rounded up)—no selector</td>
            </tr>
            <tr>
              <td><strong>Audio</strong></td>
              <td>Native audio can be generated</td>
              <td>Always off (a source clip is present)</td>
            </tr>
            <tr>
              <td><strong>Scene surcharge</strong></td>
              <td>Billed by scene × per-second rate</td>
              <td>No scene—matched by actual duration × resolution only</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>Creating a clip from scratch</td>
              <td>Restyling / re-cutting footage you already have</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">
        Generating something new? Use
        <a href="/home/kling/3-0-omni-text-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/3-0-omni-text-to-video')">Omni Text to Video</a>,
        <a href="/home/kling/3-0-omni-image-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/3-0-omni-image-to-video')">Image to Video</a>, or
        <a href="/home/kling/3-0-omni-reference-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/3-0-omni-reference-to-video')">Reference to Video</a>.
      </p>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Video Transformation)</h2>
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

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">More Kling 3.0 Omni Workflows</h2>
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
      ✨ Want to generate from scratch instead of restyling?
      <a href="/home/kling/3-0-omni-text-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/3-0-omni-text-to-video')">Kling 3.0 Omni Text to Video</a>,
      <a href="/home/kling/3-0-omni-image-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/3-0-omni-image-to-video')">Image</a>
      or
      <a href="/home/kling/3-0-omni-reference-to-video" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/kling/3-0-omni-reference-to-video')">Reference</a>
      variants bill per second with native audio and multi-shot.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const videoWorkflows = [
  { name: 'Kling 3.0 Omni Text to Video', title: 'Omni T2V', description: 'Prompt to video with audio, multi-shot and elements.', path: '/home/kling/3-0-omni-text-to-video', icon: 'fas fa-keyboard' },
  { name: 'Kling 3.0 Omni Image to Video', title: 'Omni I2V', description: 'Animate one first-frame image, 3–15s, up to 4K.', path: '/home/kling/3-0-omni-image-to-video', icon: 'fas fa-image' },
  { name: 'Kling 3.0 Omni Reference to Video', title: 'Omni R2V', description: 'Combine up to 7 images + 3 role videos.', path: '/home/kling/3-0-omni-reference-to-video', icon: 'fas fa-layer-group' }
]

const coreFeatures = [
  { icon: '🎥', title: 'Restyle a Real Clip', description: 'Upload one source video (3–15.5s) and transform it with a text prompt.' },
  { icon: '🖼️', title: 'Optional References', description: 'Add up to <strong>4 reference images</strong> to steer look and mood.' },
  { icon: '⏱️', title: 'Billed by Real Length', description: 'No duration knob—cost follows the actual uploaded video length (rounded up).' },
  { icon: '🧬', title: 'Subject Elements', description: 'Register reusable characters/objects and reference them with <code>@name</code>.' },
  { icon: '🖥️', title: '720p / 1080p / 4K', description: 'Draft at 720p, deliver at 1080p, or go large-screen at 4K.' },
  { icon: '🤐', title: 'Silent by Design', description: 'A source video means no new audio is generated—audio stays off and never adds cost.' }
]

const scenarioTags = ['Video restyling', 'Mood regrading', 'Footage iteration', 'Reference-driven looks', '4K re-cuts']

const faqItems = computed(() => [
  { question: 'How is the cost calculated for Video Transformation?', answer: 'The tool reads your uploaded video\'s duration, rounds it up to whole seconds, and matches that length against the selected resolution (720p, 1080p or 4K). There is no per-second selector and no audio or scene surcharge. Before you upload a video, a 5-second example price is shown.' },
  { question: 'What are the source video requirements?', answer: 'Exactly one MP4 or MOV file, between 3 and 15.5 seconds long, with edges between 700 and 4553 pixels, an aspect ratio between 0.4 and 2, and a frame rate between 24 and 60fps.' },
  { question: 'When can I choose an aspect ratio?', answer: 'With a video-only upload the aspect ratio stays <code>auto</code> and follows the source. Once you attach reference images, you can pick 16:9, 9:16 or 1:1 for the transformed output.' },
  { question: 'Does Video Transformation generate audio?', answer: 'No. Because a source video is always present, the vendor does not generate new audio, and the audio flag is kept off without affecting the credit cost.' },
  { question: 'Do I need a local GPU?', answer: 'No—Video Transformation runs in the cloud on FuseAITools. Credits are shown on the Generate button before you submit.' }
])
useToolSeoFaqSchema(faqItems)

function isCurrentMode(path) { return route.path === path || route.path === `${path}/` }
watchRouteScroll((path) => path.includes('/home/kling/3-0-omni-transformation'))

const openFaqIndex = ref(0)
function toggleFaq(index) { openFaqIndex.value = openFaqIndex === index ? -1 : index }
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
