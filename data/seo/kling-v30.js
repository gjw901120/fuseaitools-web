/**
 * Kling 3.0 Video / Motion Control SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：KlingV30SeoContent.vue）
 */
export default {
  component: 'KlingV30SeoContent',
  rootId: 'kling-v30-section',
  rootClass: 'kling-seo',
  meta: {
    name: 'Kling 3.0 Video on FuseAITools',
    category: 'MultimediaApplication',
    description:
      'Kling 3.0 Video and Motion Control on FuseAITools—multi-shot director mode, 3–15s clips, std/pro/4K quality, and advanced motion transfer.'
  },
  badge: '🎬 Kling 3.0 · Director Mode · Multi-Shot · std/pro/4K',

  introByPath: {
    '/home/kling/v3-0-video': {
      title: '🎬 Kling 3.0 Video',
      lead: '<strong>std/pro/4K</strong> director mode. <strong>Single shot</strong>: one prompt (3–15s), optional start/end frames, aspect ratio, sound. <strong>Multi-shot</strong>: ≤<strong>5 shots</strong> (1–12s each, total 3–15s)—sound required; optional per-shot elements (2–50 images).'
    },
    '/home/kling/v3-0-motion-control': {
      title: '🎭 Kling 3.0 Motion Control',
      lead: 'Reference <strong>image + video</strong>, optional prompt (≤2500). <strong>std</strong> (720p) or <strong>pro</strong> (1080p); set <strong>background source</strong> from video or image. Per-second pricing from reference length.'
    }
  },

  definitionByPath: {
    '/home/kling/v3-0-video': {
      title: 'What is Kling 3.0 Video?',
      body: '<strong>Kling 3.0 Video</strong> (<code>kling-3.0-video</code>)—single-shot (3–15s) or multi-shot (≤5 shots, total 3–15s). std/pro/4K quality tiers; optional start/end frames and per-shot elements. Per-second pricing on total duration.'
    },
    '/home/kling/v3-0-motion-control': {
      title: 'What is Kling 3.0 Motion Control?',
      body: '<strong>Kling 3.0 Motion Control</strong> (<code>kling-3.0-motion-control</code>)—reference image + video; std/pro; background_source; optional prompt. Per-second × reference video duration.'
    }
  },

  faqByPath: {
    '/home/kling/v3-0-video': [
      {
        question: 'What is multi-shot mode on Kling 3.0 Video?',
        answer:
          'Up to <strong>5 shots</strong>, 1–12s each (total 3–15s). Each shot prompt max 500 chars (2500 total). Sound must be <strong>On</strong>.'
      },
      {
        question: 'What duration can Kling 3.0 Video generate?',
        answer:
          'Single shot: <strong>3–15s</strong>. Multi-shot: sum of shots must stay 3–15s. std/pro/4K and sound affect per-second rate.'
      },
      {
        question: 'What does 4K mode do on Kling 3.0 Video?',
        answer:
          '<strong>4K</strong> is the top generation-mode tier (alongside <strong>std</strong> and <strong>pro</strong>), producing ultra-high-definition output. It bills per output second at the highest rate—pick it when maximum resolution matters.'
      }
    ],
    '/home/kling/v3-0-motion-control': [
      {
        question: 'What is background source on Kling 3.0 Motion Control?',
        answer:
          'Background follows <strong>input video</strong> or <strong>input image</strong>. Combine with character orientation for pose control.'
      },
      {
        question: 'When should I pick std vs pro on Kling 3.0 Motion Control?',
        answer:
          '<strong>std</strong> = 720p; <strong>pro</strong> = 1080p. Both bill per reference-video second—pro costs more per second.'
      }
    ]
  },

  commonFaq: [
    {
      question: 'Do I need a local GPU for Kling 3.0?',
      answer:
        'No—3.0 runs in the cloud. Video bills per output second; Motion Control bills per reference-video second.'
    },
    {
      question: 'How is Kling 3.0 priced on FuseAITools?',
      answer:
        'Per-second RULE pricing—total clip duration (Video) or reference length (Motion Control). Credits on the Generate button. See <a href="/pricing" class="seo-pricing-link">pricing</a>.'
    }
  ],

  sections: [
    { type: 'intro' },
    { type: 'definition' },
    {
      type: 'prose',
      id: 'positioning-heading',
      title: '🎬 Kling 3.0 on FuseAITools',
      html: 'Kling <strong>3.0</strong> is Kuaishou\'s top scene-generation tier on <a href="/" class="seo-inline-link">FuseAITools</a>—<strong>3.0 Video</strong> for single- or multi-shot storytelling (3–15s, std/pro/4K) and <strong>3.0 Motion Control</strong> for advanced pose transfer with background source control. Compared to <a href="/home/kling/v2-6-text-to-video" class="seo-inline-link">Kling 2.6</a>, 3.0 adds longer flexible duration, multi-shot editing, and per-shot elements. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Kling 3.0 Core Features',
      items: [
        { icon: '🎬', title: 'Multi-Shot Director', description: 'Up to <strong>5 shots</strong> per generation—total duration 3–15 seconds.' },
        { icon: '🎭', title: '3.0 Motion Control', description: 'std/pro pose transfer with <strong>background source</strong> control.' },
        { icon: '🖼️', title: 'Per-Shot Elements', description: 'Attach 2–50 reference images to individual shots for character consistency.' },
        { icon: '☁️', title: 'Cloud on FuseAITools', description: 'Top Kling tier—per-second credits shown before generate.' }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: ['Multi-beat narratives', 'Advanced motion transfer', 'Brand story sequences', 'Longer 3–15s clips']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Kling 3.0 Video vs 3.0 Motion Control',
      ariaLabel: 'Kling 3.0 Video vs Motion Control',
      headers: ['Dimension', '3.0 Video', '3.0 Motion Control'],
      rows: [
        ['<strong>Input</strong>', 'Shot prompt(s); optional start/end frames', 'Reference image + video (+ optional prompt)'],
        ['<strong>Duration</strong>', '<strong>3–15s</strong> (single or multi-shot ≤5)', 'Matches reference video length'],
        ['<strong>Quality</strong>', 'std / pro / 4K', 'std (720p) / pro (1080p)'],
        ['<strong>Unique</strong>', 'Multi-shot, per-shot elements (2–50 imgs)', 'Background source (video vs image)'],
        ['<strong>Pricing</strong>', 'Per second × total output duration', 'Per second × reference video duration']
      ]
    },
    { type: 'faq', id: 'faq-heading', title: '❓ FAQ (Kling 3.0)' },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Kling 3.0 Technical Specs',
      ariaLabel: 'Kling 3.0 capabilities',
      headers: ['Workflow', 'modelKey', 'Required', 'Key controls'],
      rows: [
        [
          '<strong>3.0 Video</strong>',
          '<code>kling-3.0-video</code>',
          'Shot prompt(s)',
          'Single/multi-shot; 3–15s; std/pro/4K; sound; optional frames/elements'
        ],
        [
          '<strong>3.0 Motion Control</strong>',
          '<code>kling-3.0-motion-control</code>',
          'Reference image + video',
          'std/pro; background_source; optional prompt (≤2500)'
        ]
      ],
      note: 'Multi-shot: up to <strong>5 shots</strong>, each 1–12s, total 3–15s; sound required. Per-shot elements: 2–50 reference images.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Kling 3.0 — Two Workflows',
      items: [
        { name: 'Kling 3.0 Video', title: '3.0 Video', description: 'Single/multi-shot, 3–15s, std/pro/4K, elements.', path: '/home/kling/v3-0-video', icon: 'fas fa-film' },
        { name: 'Kling 3.0 Motion Control', title: '3.0 Motion Control', description: 'std/pro motion transfer + background source.', path: '/home/kling/v3-0-motion-control', icon: 'fas fa-bezier-curve' }
      ]
    }
  ],

  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for subscription discounts and credit top-ups.'
    },
    {
      html: '👤 Need a talking-head presenter to cut with your 3.0 scenes? <a href="/home/kling/ai-avatar-standard" class="seo-inline-link">Try Kling AI Avatar Standard →</a> for audio-driven lip-sync—or <a href="/home/kling/ai-avatar-pro" class="seo-inline-link">AI Avatar Pro</a> for higher-quality presenter output. Pair with <a href="/home/elevenlabs/multilingual-v2" class="seo-inline-link">ElevenLabs TTS</a> to generate narration first.'
    },
    {
      html: '⚡ Just need a fast, affordable clip without multi-shot or sound? <a href="/home/kling/v3-turbo-text-to-video" class="seo-inline-link">Try Kling V3 Turbo Text to Video →</a> or <a href="/home/kling/v3-turbo-image-to-video" class="seo-inline-link">V3 Turbo Image to Video</a> for the streamlined 3.x fast lane—3–15s at 720p/1080p, billed per second.'
    },
    {
      html: '🌐 Want 4K, native audio, smart/custom multi-shot and reusable subject elements? <a href="/home/kling/3-0-omni-text-to-video" class="seo-inline-link">Kling 3.0 Omni Text</a>, <a href="/home/kling/3-0-omni-image-to-video" class="seo-inline-link">Image</a> or <a href="/home/kling/3-0-omni-reference-to-video" class="seo-inline-link">Reference</a> —up to 7 images + 3 role videos, billed per second. To restyle footage you already have, try <a href="/home/kling/3-0-omni-transformation" class="seo-inline-link">Omni Video Transformation</a>.'
    }
  ],

  watchPathIncludes: '/home/kling/v3-0-'
}
