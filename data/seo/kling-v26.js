/**
 * KlingV26 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：KlingV26SeoContent.vue）
 */
export default {
  component: 'KlingV26SeoContent',
  rootId: 'kling-v26-section',
  rootClass: 'kling-seo',
  meta: {
    name: 'Kling 2.6 Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Kling 2.6 text and image-to-video with optional sound, plus Motion Control on FuseAITools—5/10s clips and reference-video pose transfer.'
  },
  badge: '🔊 Kling 2.6 · Sound + Motion Control · Three Workflows',
  introByPath: {
    '/home/kling/v2-6-text-to-video': {
      title: '📝 Kling 2.6 Text to Video',
      lead: 'Prompt (≤2500) with optional <strong>generated sound</strong>. Aspect <strong>1:1 / 16:9 / 9:16</strong>, duration <strong>5s or 10s</strong>. Sound affects credit pricing.'
    },
    '/home/kling/v2-6-image-to-video': {
      title: '🖼️ Kling 2.6 Image to Video',
      lead: 'One <strong>image</strong> (max 10MB) + prompt (≤2500). Toggle <strong>sound</strong>; pick <strong>5s or 10s</strong>.'
    },
    '/home/kling/v2-6-motion-control': {
      title: '🎭 Kling 2.6 Motion Control',
      lead: '<strong>Reference image + video</strong> (max 100MB)—no prompt required. <strong>Character orientation</strong> from image or video; output <strong>720p or 1080p</strong>. Per-second pricing.'
    }
  },
  definitionByPath: {
    '/home/kling/v2-6-text-to-video': {
      title: 'What is Kling 2.6 Text to Video?',
      body: '<strong>Kling 2.6 Text to Video</strong> (<code>kling-2.6-text-to-video</code>)—prompt max 2500, optional <strong>sound</strong>, aspect 1:1/16:9/9:16, duration 5/10s.'
    },
    '/home/kling/v2-6-image-to-video': {
      title: 'What is Kling 2.6 Image to Video?',
      body: '<strong>Kling 2.6 Image to Video</strong> (<code>kling-2.6-image-to-video</code>)—single image + prompt, optional sound, 5/10s.'
    },
    '/home/kling/v2-6-motion-control': {
      title: 'What is Kling 2.6 Motion Control?',
      body: '<strong>Kling 2.6 Motion Control</strong> (<code>kling-2.6-motion-control</code>)—reference image + video; character_orientation; 720p/1080p; billed per reference-video second.'
    }
  },
  faqByPath: {
    '/home/kling/v2-6-text-to-video': [
      {
        question: 'Does Kling 2.6 text-to-video include sound?',
        answer: 'Optionally—toggle <strong>Sound On</strong>. Pricing uses <code>with_sound</code> vs <code>without_sound</code> tiers.'
      },
      {
        question: 'Which aspect ratios does Kling 2.6 T2V support?',
        answer: '<strong>1:1</strong>, <strong>16:9</strong>, and <strong>9:16</strong>; prompt max 2500; duration 5/10s.'
      }
    ],
    '/home/kling/v2-6-image-to-video': [
      {
        question: 'Is a prompt required for Kling 2.6 image-to-video?',
        answer: 'Yes—prompt max <strong>2500 characters</strong> with required single image upload.'
      },
      {
        question: 'How does sound affect pricing on Kling 2.6 I2V?',
        answer: 'Sound <strong>On</strong> = <code>with_sound</code>; <strong>Off</strong> = <code>without_sound</code>, plus duration 5/10s.'
      }
    ],
    '/home/kling/v2-6-motion-control': [
      {
        question: 'What inputs does Kling 2.6 Motion Control need?',
        answer: 'Required: reference <strong>image</strong> (JPG/PNG, max 10MB) + <strong>video</strong> (MP4/MOV/MKV, max 100MB). No prompt.'
      },
      {
        question: 'How is Kling 2.6 Motion Control priced?',
        answer: 'Per-second rate at <strong>720p or 1080p</strong> × reference video duration (rounded up).'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Kling 2.6?',
      answer: 'No—Kling 2.6 runs in the cloud. T2V/I2V bill by duration + sound; Motion Control bills per reference-video second.'
    },
    {
      question: 'How is Kling 2.6 priced on FuseAITools?',
      answer: 'Credits on the Generate button—duration and sound for T2V/I2V; per-second for Motion Control. See <a href="/pricing" class="seo-pricing-link">pricing</a>.'
    }
  ],
  sections: [
    {
      type: 'intro'
    },
    {
      type: 'definition'
    },
    {
      type: 'prose',
      id: 'positioning-heading',
      title: '🔊 Kling 2.6 on FuseAITools',
      html: 'Kling <strong>2.6</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> adds <strong>generated sound</strong> to text and image-to-video, plus <strong>Motion Control</strong>—transfer pose from a reference video onto a character image at 720p/1080p. Compared to <a href="/home/kling/v2-5-turbo-text-to-video-pro" class="seo-inline-link">v2.5 Turbo</a>, 2.6 trades CFG knobs for audio and motion workflows. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Kling 2.6 Core Features',
      items: [
        {
          icon: '🔊',
          title: 'Optional Sound',
          description: 'Toggle generated audio on T2V/I2V—pricing reflects with_sound vs without_sound.'
        },
        {
          icon: '🎭',
          title: 'Motion Control',
          description: 'Transfer reference-video motion to a character still—720p or 1080p.'
        },
        {
          icon: '📐',
          title: 'Social Aspect Ratios',
          description: '1:1, 16:9, and 9:16 on text and image workflows.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'Three 2.6 modes in one tier—credits shown before generate.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: ['Clips with ambient audio', 'Character pose transfer', 'Vertical social video', 'Product animation']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Kling 2.6 vs v2.5 Turbo',
      ariaLabel: 'Kling 2.6 vs v2.5 Turbo',
      headers: ['Dimension', '2.6', 'v2.5 Turbo'],
      rows: [
        ['<strong>Workflows</strong>', 'T2V, I2V, Motion Control', 'T2V Pro, I2V Pro only'],
        ['<strong>Generated sound</strong>', '<strong>Yes</strong> (T2V/I2V toggle)', 'No'],
        ['<strong>Motion control</strong>', '<strong>2.6 Motion Control</strong>', 'Not available'],
        ['<strong>Fine-tuning</strong>', 'Sound on/off; character orientation', 'Negative prompt, CFG scale'],
        ['<strong>Duration</strong>', '5s/10s (T2V/I2V)', '5s/10s']
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Kling 2.6)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Kling 2.6 Technical Specs',
      ariaLabel: 'Kling 2.6 capabilities',
      headers: ['Workflow', 'modelKey', 'Required', 'Key controls'],
      rows: [
        [
          '<strong>Text to Video</strong>',
          '<code>kling-2.6-text-to-video</code>',
          'Prompt',
          'Sound; aspect 1:1/16:9/9:16; 5/10s'
        ],
        [
          '<strong>Image to Video</strong>',
          '<code>kling-2.6-image-to-video</code>',
          'Image + prompt',
          'Sound; 5/10s'
        ],
        [
          '<strong>Motion Control</strong>',
          '<code>kling-2.6-motion-control</code>',
          'Reference image + video',
          'Character orientation; 720p/1080p; per-second pricing'
        ]
      ]
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Kling 2.6 — Three Workflows',
      items: [
        {
          name: 'Kling 2.6 Text to Video',
          title: 'Text to Video',
          description: 'Optional sound—aspect ratio, 5/10s.',
          path: '/home/kling/v2-6-text-to-video',
          icon: 'fas fa-font'
        },
        {
          name: 'Kling 2.6 Image to Video',
          title: 'Image to Video',
          description: 'Single image + optional sound, 5/10s.',
          path: '/home/kling/v2-6-image-to-video',
          icon: 'fas fa-image'
        },
        {
          name: 'Kling 2.6 Motion Control',
          title: 'Motion Control',
          description: 'Reference image + video; 720p/1080p.',
          path: '/home/kling/v2-6-motion-control',
          icon: 'fas fa-route'
        }
      ]
    },
    {
      type: 'table',
      id: 'version-compare-heading',
      title: '📊 Kling 2.6 vs 3.0',
      ariaLabel: 'Kling 2.6 vs 3.0 comparison',
      headers: ['Dimension', '2.6', '3.0'],
      rows: [
        ['<strong>Positioning</strong>', 'Sound + motion control', 'Director-level storytelling'],
        ['<strong>Workflows</strong>', 'T2V, I2V, Motion Control', '3.0 Video, 3.0 Motion Control'],
        [
          '<strong>Duration</strong>',
          '<strong>5s or 10s</strong> (T2V/I2V); motion = ref video length',
          '<strong>3–15s</strong> (Video); motion = ref video length'
        ],
        [
          '<strong>Generated sound</strong>',
          '<strong>Yes</strong> (T2V/I2V toggle)',
          '<strong>Yes</strong> (3.0 Video; required in multi-shot)'
        ],
        [
          '<strong>Motion control</strong>',
          '2.6 Motion Control (720p/1080p)',
          '3.0 Motion Control (std/pro + background source)'
        ],
        [
          '<strong>Unique controls</strong>',
          'Character orientation from image/video',
          'Multi-shot (≤5), per-shot elements, start/end frames'
        ],
        [
          '<strong>Quality tiers</strong>',
          '720p/1080p (Motion Control only)',
          '<strong>std / pro</strong> on Video and Motion Control'
        ],
        [
          '<strong>Best for</strong>',
          'Clips with audio, pose transfer',
          'Narrative sequences, advanced motion'
        ]
      ],
      lead: '<strong>Kling 2.6</strong> covers sound-enabled T2V/I2V and reference-video motion control at fixed 5/10s clips. Upgrade to <a href="/home/kling/v3-0-video" class="seo-inline-link">Kling 3.0 Video</a> for multi-shot director mode (3–15s) or <a href="/home/kling/v3-0-motion-control" class="seo-inline-link">3.0 Motion Control</a> for std/pro quality and background source control.'
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for subscription discounts and credit top-ups.'
    },
    {
      pricing: false,
      html: '🎬 Need multi-shot mode or 3–15 second director clips? <a href="/home/kling/v3-0-video" class="seo-inline-link">Explore Kling 3.0 Video →</a> for up to five shots, std/pro quality, and per-shot elements—or <a href="/home/kling/v3-0-motion-control" class="seo-inline-link">3.0 Motion Control</a> for std/pro motion transfer with background source control.'
    },
    {
      pricing: false,
      html: '⚡ Want a streamlined fast lane with a 3–15s slider and 720p/1080p? <a href="/home/kling/v3-turbo-text-to-video" class="seo-inline-link">Try Kling V3 Turbo Text to Video →</a> or <a href="/home/kling/v3-turbo-image-to-video" class="seo-inline-link">V3 Turbo Image to Video</a> for per-second billing and continuous duration control (no sound or motion transfer).'
    },
    {
      pricing: false,
      html: '🌐 Want the flagship Kling 3.0 Omni family—4K, native audio, smart/custom multi-shot and reusable subject elements? <a href="/home/kling/3-0-omni-text-to-video" class="seo-inline-link">Omni Text to Video</a>, <a href="/home/kling/3-0-omni-image-to-video" class="seo-inline-link">Image</a> / <a href="/home/kling/3-0-omni-reference-to-video" class="seo-inline-link">Reference</a> (billed per second), or <a href="/home/kling/3-0-omni-transformation" class="seo-inline-link">Video Transformation</a> to restyle a clip you already have.'
    }
  ],
  watchPathIncludes: '/home/kling/v2-6-'
}
