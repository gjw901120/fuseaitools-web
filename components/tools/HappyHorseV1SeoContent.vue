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
          <p><strong>Generate 5 seconds of 1080P video with audio in as little as 38 seconds</strong>, with ~60% lower compute demand. Member pricing from 25 credits/sec; new users receive <strong>20 free credits</strong>.</p>
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
    answer: 'Billing is <strong>per second of video, with exclusive discounts for subscribers</strong>. <a href="/pricing" class="seo-pricing-link">Ultra</a> members get 720P from <strong>25 credits/sec</strong> and 1080P around <strong>42 credits/sec</strong>. Annual Ultra plans are up to 40% off. New users receive <strong>20 free credits</strong> on first sign-in.'
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

<style src="~/assets/css/tool-seo-content.css"></style>
