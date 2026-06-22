<template>
  <div
    id="ideogram-character-section"
    class="ideogram-seo seo-content"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
  >
    <meta itemprop="name" content="Ideogram Character on FuseAITools" />
    <meta itemprop="applicationCategory" content="MultimediaApplication" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta
      itemprop="description"
      content="Ideogram Character, Character Edit, and Character Remix on FuseAITools—reference-driven identity with REALISTIC/FICTION styles and multi-image output."
    />

    <div class="version-badge">👤 Ideogram Character · Identity Lock · Three Workflows</div>

    <section v-if="workflowIntro" class="info-section workflow-intro" aria-labelledby="workflow-intro-heading">
      <h2 id="workflow-intro-heading" class="section-title">{{ workflowIntro.title }}</h2>
      <p class="tool-sub" v-html="workflowIntro.lead" />
    </section>

    <section v-if="workflowDefinition" class="info-section" aria-labelledby="definition-heading">
      <h2 id="definition-heading" class="section-title">{{ workflowDefinition.title }}</h2>
      <p class="tool-sub" v-html="workflowDefinition.body" />
    </section>

    <section class="info-section" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" class="section-title">👤 Ideogram Character on FuseAITools</h2>
      <p class="tool-sub">
        <strong>Ideogram Character</strong> is a separate product line on
        <a href="/" class="seo-inline-link">FuseAITools</a>—not general V3 T2I. Upload
        <strong>character reference image(s)</strong> and place the same identity into new scenes, outfits, or poses.
        Use <strong>AUTO / REALISTIC / FICTION</strong> styles and TURBO/BALANCED/QUALITY speed tiers.
        For posters or reframes without identity lock, use
        <a href="/home/ideogram/v3-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/ideogram/v3-text-to-image')">Ideogram V3</a>.
        New users receive <strong>20 free credits</strong> on sign-up.
      </p>
    </section>

    <section class="info-section" aria-labelledby="features-heading">
      <h2 id="features-heading" class="section-title">✨ Character Core Features</h2>
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
      <h2 id="compare-heading" class="section-title">📊 Character vs Character Edit vs Character Remix</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Ideogram Character workflows">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Character</th>
              <th>Character Edit</th>
              <th>Character Remix</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Input</strong></td>
              <td>Reference + prompt</td>
              <td>Image + mask + reference + prompt</td>
              <td>Image + reference + prompt</td>
            </tr>
            <tr>
              <td><strong>modelKey</strong></td>
              <td><code>ideogram-character</code></td>
              <td><code>ideogram-character-edit</code></td>
              <td><code>ideogram-character-remix</code></td>
            </tr>
            <tr>
              <td><strong>Mask</strong></td>
              <td>No</td>
              <td><strong>Required</strong></td>
              <td>No</td>
            </tr>
            <tr>
              <td><strong>Strength</strong></td>
              <td>—</td>
              <td>—</td>
              <td><strong>0.01–1</strong></td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>New scenes, same face</td>
              <td>Clothing, pose, local edits</td>
              <td>Styled variations</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="info-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title">❓ FAQ (Ideogram Character)</h2>
      <div class="faq-list">
        <div
          v-for="(faq, index) in faqItems"
          :key="index"
          class="faq-item"
          :class="{ open: openFaqIndex === index }"
        >
          <button type="button" class="faq-question" :aria-expanded="openFaqIndex === index" @click="toggleFaq(index)">
            <span>{{ faq.question }}</span>
            <span class="faq-toggle" aria-hidden="true">{{ openFaqIndex === index ? '➖' : '➕' }}</span>
          </button>
          <div v-show="openFaqIndex === index" class="faq-answer"><div v-html="faq.answer" /></div>
        </div>
      </div>
    </section>

    <section class="info-section" aria-labelledby="tech-heading">
      <h2 id="tech-heading" class="section-title">⚙️ Character Technical Specs</h2>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Ideogram Character capabilities">
          <thead>
            <tr><th>Workflow</th><th>Required</th><th>Key controls</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Character</strong></td>
              <td>Reference image + prompt</td>
              <td>Speed; AUTO/REALISTIC/FICTION; MagicPrompt; size; 1–4 images; negative prompt</td>
            </tr>
            <tr>
              <td><strong>Character Edit</strong></td>
              <td>Image + mask + reference + prompt</td>
              <td>Speed; style; MagicPrompt; 1–4 images; seed</td>
            </tr>
            <tr>
              <td><strong>Character Remix</strong></td>
              <td>Image + reference + prompt</td>
              <td>Strength; style; size; 1–4 images; negative prompt</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="meta-note">Reference uploads: JPG, PNG, WebP (max 10MB). RULE pricing by rendering speed.</p>
    </section>

    <section class="info-section" aria-labelledby="workflows-heading">
      <h2 id="workflows-heading" class="section-title">Ideogram Character — Three Workflows</h2>
      <div class="model-modes-grid">
        <NuxtLink
          v-for="item in imageWorkflows"
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

    <section class="info-section" aria-labelledby="vs-v3-heading">
      <h2 id="vs-v3-heading" class="section-title">📊 Character vs Ideogram V3</h2>
      <p class="section-lead">
        Use <strong>Character</strong> when identity must stay consistent; use <strong>V3</strong> for general text, edit, remix, and reframe without a character anchor.
      </p>
      <div class="compare-table-wrap">
        <table class="compare-table" aria-label="Ideogram Character vs V3">
          <thead>
            <tr><th>Dimension</th><th>Character</th><th>V3</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Pipeline</strong></td>
              <td><strong>Reference-driven</strong> identity</td>
              <td><strong>Prompt-driven</strong> general images</td>
            </tr>
            <tr>
              <td><strong>Workflows</strong></td>
              <td>Character, Edit, Remix</td>
              <td>T2I, Edit, Remix, Reframe</td>
            </tr>
            <tr>
              <td><strong>Typical use</strong></td>
              <td>Mascots, serial avatars, game chars</td>
              <td>Posters, inpainting, social reframes</td>
            </tr>
            <tr>
              <td><strong>Pairing</strong></td>
              <td colspan="2">Character for the hero + V3 for backgrounds and props</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="upgrade-tip pricing-tip">
      💳 New users get <strong>20 free credits</strong> on sign-up.
      <a href="/pricing" class="seo-pricing-link">View pricing</a>
      for subscription discounts and credit top-ups.
    </div>

    <div class="upgrade-tip">
      🎨 Need general text-to-image or reframe without a character lock?
      <a href="/home/ideogram/v3-text-to-image" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/ideogram/v3-text-to-image')">Use Ideogram V3 Text to Image →</a>
      for posters and layouts, or
      <a href="/home/ideogram/v3-reframe" class="seo-inline-link" @click.prevent="navigateToToolTop('/home/ideogram/v3-reframe')">V3 Reframe</a>
      for new aspect ratios.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const imageWorkflows = [
  { name: 'Ideogram Character', title: 'Character', description: 'Reference + prompt—new scenes, same identity.', path: '/home/ideogram/character', icon: 'fas fa-user' },
  { name: 'Ideogram Character Edit', title: 'Character Edit', description: 'Mask edit with character reference.', path: '/home/ideogram/character-edit', icon: 'fas fa-user-edit' },
  { name: 'Ideogram Character Remix', title: 'Character Remix', description: 'Strength-controlled character remix.', path: '/home/ideogram/character-remix', icon: 'fas fa-users' }
]

const workflowIntroMap = {
  '/home/ideogram/character': {
    title: '👤 Ideogram Character',
    lead: 'Upload <strong>character reference image(s)</strong> + <strong>prompt</strong> (≤5000). Place the same identity in a new scene—speed, AUTO/REALISTIC/FICTION style, MagicPrompt, image size, 1–4 outputs, negative prompt.'
  },
  '/home/ideogram/character-edit': {
    title: '✏️ Ideogram Character Edit',
    lead: '<strong>Image + mask + character reference</strong> + prompt. Edit clothing, pose, or local details while preserving identity—1–4 outputs, speed, and seed.'
  },
  '/home/ideogram/character-remix': {
    title: '🔀 Ideogram Character Remix',
    lead: 'Remix a character image with <strong>reference + prompt</strong>. Adjust <strong>strength</strong>, style, size, 1–4 outputs, and negative prompt.'
  }
}

const workflowDefinitionMap = {
  '/home/ideogram/character': {
    title: 'What is Ideogram Character?',
    body: '<strong>Ideogram Character</strong> (<code>ideogram-character</code>) generates scenes from <strong>reference_image_urls</strong> + prompt. Identity-locked character pipeline—distinct from V3 text-to-image.'
  },
  '/home/ideogram/character-edit': {
    title: 'What is Ideogram Character Edit?',
    body: '<strong>Ideogram Character Edit</strong> (<code>ideogram-character-edit</code>)—image, mask, reference, and prompt. Masked edits that keep character identity.'
  },
  '/home/ideogram/character-remix': {
    title: 'What is Ideogram Character Remix?',
    body: '<strong>Ideogram Character Remix</strong> (<code>ideogram-character-remix</code>)—source image + reference + prompt with remix strength for nuanced character variations.'
  }
}

const workflowFaqMap = {
  '/home/ideogram/character': [
    { question: 'How many reference images does Character need?', answer: 'The form accepts <strong>one character reference</strong> image (JPG/PNG/WebP, max 10MB).' },
    { question: 'Which styles does Character support?', answer: '<strong>AUTO</strong>, <strong>REALISTIC</strong>, and <strong>FICTION</strong>—not the V3 GENERAL/DESIGN presets.' }
  ],
  '/home/ideogram/character-edit': [
    { question: 'What is required for Character Edit?', answer: 'Source <strong>image</strong>, matching <strong>mask</strong>, <strong>character reference</strong>, and <strong>prompt</strong>.' },
    { question: 'Does Character Edit support multiple outputs?', answer: 'Yes—generate <strong>1–4</strong> images per run.' }
  ],
  '/home/ideogram/character-remix': [
    { question: 'How is Character Remix different from Character?', answer: 'Remix adds a <strong>source image</strong> plus <strong>strength</strong> control—blend the base shot with prompt-driven change.' },
    { question: 'Can I use negative prompts on Character Remix?', answer: 'Yes—optional <strong>negative_prompt</strong> (max 5000 chars).' }
  ]
}

const commonFaq = [
  { question: 'Is Character the same as Ideogram V3?', answer: 'No—Character is <strong>reference-driven</strong> for identity. V3 is for general T2I, edit, remix, and reframe.' },
  { question: 'How is Ideogram Character priced on FuseAITools?', answer: 'RULE credits by <strong>rendering_speed</strong>. See <a href="/pricing" class="seo-pricing-link">pricing</a>. New users get <strong>20 free credits</strong> on sign-up.' }
]

const normalizedPath = computed(() => route.path.replace(/\/$/, ''))
const workflowIntro = computed(() => workflowIntroMap[normalizedPath.value] || null)
const workflowDefinition = computed(() => workflowDefinitionMap[normalizedPath.value] || null)
const faqItems = computed(() => [...(workflowFaqMap[normalizedPath.value] || []), ...commonFaq])
useToolSeoFaqSchema(faqItems)

const coreFeatures = [
  { icon: '👤', title: 'Identity Lock', description: 'Keep the <strong>same character</strong> across scenes with reference images.' },
  { icon: '🎭', title: 'REALISTIC / FICTION', description: 'Character-specific style presets—not V3 GENERAL/DESIGN.' },
  { icon: '✏️', title: 'Edit & Remix', description: 'Masked local edits or <strong>strength</strong>-controlled remix on top of Character.' },
  { icon: '☁️', title: 'Cloud on FuseAITools', description: 'Three Character modes—speed-tier credits on Generate.' }
]

const scenarioTags = ['Brand mascots', 'Game characters', 'Serial avatars', 'Identity-locked campaigns']

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

watchRouteScroll((path) => path.startsWith('/home/ideogram/character'))

const openFaqIndex = ref(0)
function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
