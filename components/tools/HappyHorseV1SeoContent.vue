<template>
  <div
    class="happyhorse-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="HappyHorse v1" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">⚡ HappyHorse v1 Core Features</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon" aria-hidden="true">🎬</div>
          <div class="feature-title" itemprop="featureList">Native Audio-Video Sync</div>
          <p>The first large-scale commercial native audio-video joint generation model with a <strong>15B-parameter single-stream architecture</strong>. It solves lip-sync drift and A/V misalignment at the source—dialogue, lip movement, and ambient sound (wind, rain, engines) are generated in one pass with no manual alignment.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon" aria-hidden="true">😲</div>
          <div class="feature-title">Lifelike Detail</div>
          <p>Understands complex emotional prompts and faithfully renders <strong>hair texture, eye reflections, and subtle skin movement</strong>. Close-ups look remarkably natural, with industry-leading lip-sync accuracy.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon" aria-hidden="true">🎥</div>
          <div class="feature-title">Cinematic Camera Motion</div>
          <p>Supports push, pull, pan, tilt, track, and follow shots with <strong>multi-shot continuous storytelling</strong> and smooth scene transitions—plus composition and lighting tuned for East Asian aesthetics.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon" aria-hidden="true">🇨🇳</div>
          <div class="feature-title">Chinese Language Optimization</div>
          <p>Optimized for Chinese idioms, classical poetry, and modern speech—it understands poetic imagery such as “sunset glow and lone duck flying together,” with <strong>character consistency above 95%</strong>, ahead of many overseas models.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon" aria-hidden="true">⚡️</div>
          <div class="feature-title">Fast & Cost-Effective</div>
          <p><strong>Generate 5 seconds of 1080P video with audio in as little as 38 seconds</strong>, with ~60% lower compute demand. Member pricing from 25 credits/sec; new users receive <strong>77 free credits</strong>.</p>
        </div>
      </div>
    </section>

    <section class="info-section" aria-labelledby="scenarios-heading">
      <h2 id="scenarios-heading" class="section-title">🎯 Built for These Use Cases</h2>
      <p class="tool-sub">HappyHorse v1’s strong audio-video sync and realism make it ideal for professional workflows such as:</p>
      <div class="scenario-list">
        <span v-for="tag in scenarioTags" :key="tag" class="scenario-badge">{{ tag }}</span>
      </div>
      <p class="section-lead">Whether you are a solo creator, marketing team, or production studio, HappyHorse v1 helps you turn ideas into high-quality video quickly.</p>
    </section>

    <section class="info-section" aria-labelledby="compare-heading">
      <h2 id="compare-heading" class="section-title">📊 HappyHorse v1 vs. Traditional Two-Stage Models</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="HappyHorse v1 vs traditional text-to-video models">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>HappyHorse v1 (native joint generation)</th>
              <th>Traditional text-to-video</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Generation</td>
              <td><strong>Native audio-video joint generation</strong>—video and synced audio in one inference pass</td>
              <td>Silent video first, then separate dubbing and manual alignment</td>
            </tr>
            <tr>
              <td>Audio-video sync</td>
              <td><strong>Frame-accurate sync</strong>, no drift</td>
              <td>Depends on post-production; lip-sync and ambient lag are common</td>
            </tr>
            <tr>
              <td>Lip sync</td>
              <td>Natural and precise; multi-language support (CN/EN/JP/KR, etc.) with &gt;95% accuracy</td>
              <td>Often inaccurate; may need face swap or dubbing tools</td>
            </tr>
            <tr>
              <td>Speed</td>
              <td><strong>38 seconds</strong> for 5s 1080P output</td>
              <td>Often 2–5 minutes or longer</td>
            </tr>
            <tr>
              <td>Compute cost</td>
              <td><strong>~60% lower</strong> compute; up to 3× faster inference</td>
              <td>High hardware requirements; long clips strain consumer GPUs</td>
            </tr>
            <tr>
              <td>Multi-shot narrative</td>
              <td>Native support with smooth transitions</td>
              <td>Usually single-shot with obvious stitching</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">*Based on official benchmark reports and third-party media evaluations.</p>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ Frequently Asked Questions</h2>
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

    <section class="info-section" aria-labelledby="tech-heading">
      <h2 id="tech-heading" class="section-title">🔧 Technical Specs & Tips</h2>
      <div class="tech-panel">
        <ul class="tech-list">
          <li><strong>Model scale</strong>: 15B parameters, 40-layer unified self-attention Transformer single-stream architecture; trained on 20M+ hours of multilingual video.</li>
          <li><strong>Inputs</strong>: Text-to-video, image-to-video, reference-driven generation, and video editing (localized repaint).</li>
          <li><strong>Output</strong>: MP4 (H.264), stereo AAC audio, 24/30 fps.</li>
          <li><strong>Best practices</strong>: Add camera motion (e.g. “slow dolly in”) and mood cues (e.g. “warm golden hour”) to improve quality.</li>
          <li><strong>Safety</strong>: Built-in content filters block violence, adult content, and sensitive political material in line with generative AI service guidelines.</li>
        </ul>
      </div>
    </section>

    <section class="info-section" aria-labelledby="model-modes-heading">
      <h2 id="model-modes-heading" class="section-title">HappyHorse 1.0 — Four Workflows</h2>
      <p class="section-lead">FuseAITools integrates the full HappyHorse 1.0 suite. Choose the workflow that matches your task:</p>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in modelCategories"
          :key="item.path"
          :to="item.path"
          class="model-mode-card"
          :class="{ 'model-mode-card--current': isCurrentMode(item.path) }"
          @click="handleModeClick"
        >
          <div class="model-mode-icon" aria-hidden="true">
            <i :class="item.icon" />
          </div>
          <h3 class="model-mode-title">{{ item.title }}</h3>
          <p class="model-mode-name">{{ item.name }}</p>
          <p class="model-mode-desc">{{ item.description }}</p>
          <span class="model-mode-cta">{{ isCurrentMode(item.path) ? 'Current workflow' : 'Open this workflow →' }}</span>
        </NuxtLink>
      </div>
      <p class="review-score">⭐ Overall rating: 4.8/5 (from 1200+ verified user reviews), exceeding comparable products by 20%+ on audio-video sync.</p>
    </section>
  </div>
</template>

<script setup>
const route = useRoute()

const modelCategories = [
  {
    name: 'v1 Text to Video',
    title: 'Text to Video',
    description: 'Generate video from text prompts with controls for resolution, aspect ratio, duration, and seed.',
    path: '/home/happy-horse/v1-text-to-video',
    icon: 'fas fa-keyboard'
  },
  {
    name: 'v1 Image to Video',
    title: 'Image to Video',
    description: 'Upload a single image with an optional prompt to animate a still frame into video.',
    path: '/home/happy-horse/v1-image-to-video',
    icon: 'fas fa-image'
  },
  {
    name: 'v1 Reference to Video',
    title: 'Reference to Video',
    description: 'Use 1–9 reference images and character placeholders for consistent, controllable multi-subject generation.',
    path: '/home/happy-horse/v1-reference-to-video',
    icon: 'fas fa-images'
  },
  {
    name: 'v1 Video Edit',
    title: 'Video Edit',
    description: 'Edit existing video with natural-language instructions, optional references, and audio retention.',
    path: '/home/happy-horse/v1-video-edit',
    icon: 'fas fa-film'
  }
]

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

function scrollPageToTop() {
  if (typeof window === 'undefined') return
  const scroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    document.querySelectorAll('.home-page--with-below, .main-content').forEach((el) => {
      el.scrollTop = 0
    })
  }
  scroll()
  setTimeout(scroll, 100)
}

function handleModeClick() {
  scrollPageToTop()
}

watch(
  () => route.path,
  (newPath, oldPath) => {
    if (!oldPath || newPath === oldPath) return
    if (!newPath.startsWith('/home/happy-horse/')) return
    nextTick(() => {
      setTimeout(scrollPageToTop, 50)
    })
  }
)

const scenarioTags = [
  'Short drama & character storytelling',
  'Brand ads & commercial video',
  'Social media & short-form',
  'E-commerce product showcases',
  'Education & explainer animation',
  'Music videos & lyric visuals',
  'Game cinematics & cutscenes'
]

const faqItems = [
  {
    question: '1. Is HappyHorse v1 available now?',
    answer: 'Yes. FuseAITools has integrated all four HappyHorse 1.0 models. Every user can access them on the platform.'
  },
  {
    question: '2. How long can generated videos be?',
    answer: 'HappyHorse v1 supports <strong>3 to 15 seconds</strong> per clip, with multi-shot storytelling and camera transitions. Longer clips (e.g. 30 seconds) are planned.'
  },
  {
    question: '3. What resolutions and aspect ratios are supported?',
    answer: 'Output resolutions include <strong>480P, 720P, and 1080P</strong>. Aspect ratios: 21:9, 16:9, 4:3, 1:1, 3:4, and 9:16—for landscape and vertical platforms (TikTok, Bilibili, YouTube, etc.).'
  },
  {
    question: '4. How is HappyHorse v1 priced?',
    answer: 'Billing is <strong>per second of video, with exclusive discounts for subscribers</strong>. <a href="/pricing" class="seo-pricing-link">Ultra</a> members get 720P from <strong>25 credits/sec</strong> and 1080P around <strong>42 credits/sec</strong>. Annual Ultra plans are up to 40% off. New users receive <strong>77 free credits</strong> on first sign-in.'
  },
  {
    question: '5. Can I use generated videos commercially? Who owns the rights?',
    answer: 'Videos created on the platform are yours—<strong>copyright belongs to the creator</strong>. Commercial use is supported (ads, film, e-commerce, and more).'
  },
  {
    question: '6. Do I need special hardware or a desktop app?',
    answer: 'Everything runs in the cloud—<strong>no local GPU or software install required</strong>. Use any browser on the official site or <a href="/" class="seo-inline-link">FuseAITools</a>. Results are saved to the cloud and available for download.'
  }
]

const openFaqIndex = ref(0)

function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style scoped>
.happyhorse-seo {
  max-width: var(--content-max-width, 1200px);
  margin: 0 auto;
  padding: 2.5rem var(--container-padding, 2rem) 3.5rem;
  color: var(--flux-foreground, hsl(0, 0%, 98%));
}

.info-section {
  margin: 2.5rem 0;
}

.info-section:first-child {
  margin-top: 0;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  position: relative;
  display: inline-block;
  color: var(--flux-foreground, hsl(0, 0%, 98%));
  line-height: 1.3;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg, var(--flux-primary, hsl(173, 80%, 40%)), hsl(200, 90%, 42%));
  border-radius: 3px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.75rem;
}

.feature-card {
  background: var(--flux-card, hsl(215, 25%, 11%));
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid var(--flux-border, hsl(215, 16%, 22%));
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.feature-card:hover {
  border-color: hsla(173, 80%, 40%, 0.45);
  box-shadow: 0 4px 20px hsla(173, 80%, 40%, 0.12);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  line-height: 1;
}

.feature-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--flux-foreground, hsl(0, 0%, 98%));
}

.feature-card p {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--flux-muted, hsl(215, 12%, 62%));
}

.feature-card strong {
  color: hsl(165, 75%, 72%);
  font-weight: 600;
}

.tool-sub {
  margin: 0 0 1rem;
  padding-left: 1rem;
  border-left: 3px solid hsl(270, 65%, 58%);
  color: var(--flux-muted, hsl(215, 12%, 62%));
  line-height: 1.6;
}

.section-lead {
  margin: 1rem 0 0;
  color: var(--flux-muted, hsl(215, 12%, 62%));
  line-height: 1.65;
}

.scenario-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1.25rem 0;
}

.scenario-badge {
  background: hsla(173, 80%, 40%, 0.12);
  border: 1px solid hsla(173, 80%, 40%, 0.28);
  color: hsl(165, 70%, 78%);
  padding: 0.45rem 1rem;
  border-radius: 2rem;
  font-weight: 500;
  font-size: 0.875rem;
}

.compare-table-wrap {
  overflow-x: auto;
  margin: 1.25rem 0;
  border-radius: 1rem;
  border: 1px solid var(--flux-border, hsl(215, 16%, 22%));
}

.compare-table {
  width: 100%;
  min-width: 640px;
  background: var(--flux-card, hsl(215, 25%, 11%));
  border-collapse: collapse;
}

.compare-table th,
.compare-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--flux-border, hsl(215, 16%, 22%));
  font-size: 0.9rem;
  line-height: 1.5;
  vertical-align: top;
}

.compare-table th {
  background: var(--flux-bg-elevated, hsl(215, 25%, 14%));
  color: var(--flux-foreground, hsl(0, 0%, 98%));
  font-weight: 600;
}

.compare-table td {
  color: var(--flux-muted, hsl(215, 12%, 62%));
}

.compare-table td strong {
  color: hsl(165, 75%, 72%);
}

.compare-table tbody tr:last-child td {
  border-bottom: none;
}

.meta-note {
  font-size: 0.8125rem;
  color: var(--flux-muted, hsl(215, 12%, 55%));
  margin-top: 0.75rem;
}

.faq-list {
  margin-top: 1rem;
}

.faq-item {
  background: var(--flux-card, hsl(215, 25%, 11%));
  margin-bottom: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid var(--flux-border, hsl(215, 16%, 22%));
  overflow: hidden;
}

.faq-item.open {
  border-color: hsla(173, 80%, 40%, 0.4);
}

.faq-question {
  width: 100%;
  font-weight: 700;
  padding: 1.1rem 1.25rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  text-align: left;
  background: transparent;
  border: none;
  color: var(--flux-foreground, hsl(0, 0%, 98%));
  font-size: 0.9375rem;
  font-family: inherit;
}

.faq-question:hover {
  color: var(--flux-primary, hsl(173, 80%, 40%));
}

.faq-toggle {
  flex-shrink: 0;
  font-size: 1rem;
  opacity: 0.85;
}

.faq-answer {
  padding: 0 1.25rem 1.15rem;
  color: var(--flux-muted, hsl(215, 12%, 62%));
  font-size: 0.9375rem;
  line-height: 1.65;
}

.faq-answer :deep(strong) {
  color: hsl(165, 75%, 72%);
}

.faq-answer :deep(.seo-pricing-link),
.faq-answer :deep(.seo-inline-link) {
  color: hsl(165, 85%, 62%);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.faq-answer :deep(.seo-pricing-link:hover),
.faq-answer :deep(.seo-inline-link:hover) {
  color: var(--flux-primary, hsl(173, 80%, 48%));
}

.tech-panel {
  background: var(--flux-card, hsl(215, 25%, 11%));
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--flux-border, hsl(215, 16%, 22%));
}

.tech-list {
  margin: 0;
  padding-left: 1.25rem;
  line-height: 1.7;
  color: var(--flux-muted, hsl(215, 12%, 62%));
}

.tech-list li {
  margin-bottom: 0.65rem;
}

.tech-list li:last-child {
  margin-bottom: 0;
}

.tech-list strong {
  color: var(--flux-foreground, hsl(0, 0%, 98%));
}

.model-modes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-top: 1.25rem;
}

.model-mode-card {
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  border-radius: 1rem;
  background: var(--flux-card, hsl(215, 25%, 11%));
  border: 1px solid var(--flux-border, hsl(215, 16%, 22%));
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.model-mode-card:hover {
  border-color: hsla(173, 80%, 40%, 0.5);
  box-shadow: 0 6px 24px hsla(173, 80%, 40%, 0.14);
  transform: translateY(-2px);
}

.model-mode-card--current {
  border-color: hsla(173, 80%, 40%, 0.55);
  background: linear-gradient(135deg, hsla(173, 72%, 44%, 0.14) 0%, var(--flux-card, hsl(215, 25%, 11%)) 100%);
}

.model-mode-icon {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.625rem;
  background: hsla(173, 80%, 40%, 0.15);
  color: hsl(165, 85%, 62%);
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
}

.model-mode-title {
  margin: 0 0 0.25rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--flux-foreground, hsl(0, 0%, 98%));
}

.model-mode-name {
  margin: 0 0 0.5rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: hsl(165, 70%, 72%);
}

.model-mode-desc {
  margin: 0;
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--flux-muted, hsl(215, 12%, 62%));
}

.model-mode-cta {
  margin-top: 0.85rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: hsl(165, 85%, 62%);
}

.model-mode-card--current .model-mode-cta {
  color: var(--flux-primary, hsl(173, 80%, 48%));
}

.review-score {
  margin-top: 1.25rem;
  font-size: 0.9rem;
  background: hsla(173, 80%, 40%, 0.1);
  border: 1px solid hsla(173, 80%, 40%, 0.22);
  padding: 0.85rem 1rem;
  border-radius: 0.75rem;
  color: var(--flux-muted, hsl(215, 12%, 62%));
  line-height: 1.55;
}

@media (max-width: 768px) {
  .happyhorse-seo {
    padding: 2rem 1rem 2.5rem;
  }

  .section-title {
    font-size: 1.4rem;
  }

  .feature-grid {
    gap: 1rem;
  }

  .model-modes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
