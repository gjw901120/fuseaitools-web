/**
 * KlingV25Turbo SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：KlingV25TurboSeoContent.vue）
 */
export default {
  component: 'KlingV25TurboSeoContent',
  rootId: 'kling-v25-section',
  rootClass: 'kling-seo',
  meta: {
    name: 'Kling v2.5 Turbo Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Kling v2.5 Turbo T2V and I2V Pro on FuseAITools—fast text and image-to-video with CFG scale, negative prompts, and 5/10s clips.'
  },
  badge: '⚡ Kling v2.5 Turbo · T2V & I2V Pro · CFG Control',
  introByPath: {
    '/home/kling/v2-5-turbo-image-to-video-pro': {
      title: '🖼️ Kling v2.5 Turbo I2V Pro',
      lead: 'Animate a still image—required <strong>image</strong> (max 10MB) + prompt (≤2500 chars). Optional <strong>tail frame</strong>, <strong>negative prompt</strong>, and <strong>CFG scale</strong> (0–1). Duration <strong>5s or 10s</strong>.'
    },
    '/home/kling/v2-5-turbo-text-to-video-pro': {
      title: '⌨️ Kling v2.5 Turbo T2V Pro',
      lead: 'Text-only video—prompt (≤2500), aspect <strong>16:9 / 9:16 / 1:1</strong>, duration <strong>5s or 10s</strong>. Tune with negative prompt and CFG for prompt adherence.'
    }
  },
  definitionByPath: {
    '/home/kling/v2-5-turbo-image-to-video-pro': {
      title: 'What is Kling v2.5 Turbo I2V Pro?',
      body: '<strong>Kling v2.5 Turbo I2V Pro</strong> (<code>kling-v2-5-turbo-image-to-video-pro</code>) animates an uploaded image. Required: <strong>imageUrl</strong> + prompt (max 2500). Optional tail frame, negative prompt (max 2496), CFG 0–1. Duration 5s or 10s.'
    },
    '/home/kling/v2-5-turbo-text-to-video-pro': {
      title: 'What is Kling v2.5 Turbo T2V Pro?',
      body: '<strong>Kling v2.5 Turbo T2V Pro</strong> (<code>kling-v2-5-turbo-text-to-video-pro</code>) generates video from text. Required: prompt (max 2500). Aspect 16:9, 9:16, or 1:1; duration 5 or 10 seconds. Optional negative prompt and CFG.'
    }
  },
  faqByPath: {
    '/home/kling/v2-5-turbo-image-to-video-pro': [
      {
        question: 'Can I use a tail frame on Kling v2.5 Turbo I2V Pro?',
        answer: 'Yes—optional <strong>tail frame</strong> guides the ending. Main image required (JPEG/PNG/WebP, max 10MB each).'
      },
      {
        question: 'What do negative prompt and CFG scale do on v2.5 Turbo I2V?',
        answer: '<strong>Negative prompt</strong> (max 2496) lists unwanted elements. <strong>CFG</strong> (0–1) controls prompt adherence.'
      }
    ],
    '/home/kling/v2-5-turbo-text-to-video-pro': [
      {
        question: 'Which aspect ratios does Kling v2.5 Turbo T2V Pro support?',
        answer: '<strong>16:9</strong>, <strong>9:16</strong>, and <strong>1:1</strong>. Duration <strong>5s or 10s</strong>.'
      },
      {
        question: 'How long can Kling v2.5 Turbo clips be?',
        answer: 'Both T2V and I2V Pro support <strong>5-second</strong> or <strong>10-second</strong> outputs—credits vary by duration.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Kling v2.5 Turbo?',
      answer: 'No—v2.5 Turbo runs in the cloud on FuseAITools. Credits are charged per successful 5s/10s generation.'
    },
    {
      question: 'How is Kling v2.5 Turbo priced on FuseAITools?',
      answer: 'Credits depend on <strong>duration (5/10s)</strong>—shown on the Generate button. New users get <strong>20 free credits</strong>—see <a href="/pricing" class="seo-pricing-link">pricing</a>.'
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
      title: '⚡ Kling v2.5 Turbo on FuseAITools',
      html: 'Kling <strong>v2.5 Turbo</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> is the fastest Kuaishou scene-generation tier—<strong>T2V Pro</strong> and <strong>I2V Pro</strong> with <strong>negative prompts</strong>, <strong>CFG scale</strong> (0–1), and fixed <strong>5s/10s</strong> outputs. No generated sound (upgrade to <a href="/home/kling/v2-6-text-to-video" class="seo-inline-link">Kling 2.6</a> for audio). Credits show on the Generate button; new users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ v2.5 Turbo Core Features',
      items: [
        {
          icon: '⚡',
          title: 'Fast Turbo Tier',
          description: 'Lowest-latency Kling scene generation—optimized for batch social clips.'
        },
        {
          icon: '🎚️',
          title: 'CFG + Negative Prompt',
          description: 'Fine-tune prompt adherence with <strong>CFG 0–1</strong> and element exclusion lists.'
        },
        {
          icon: '🖼️',
          title: 'Tail Frame I2V',
          description: 'Optional end frame on I2V Pro to control how the clip finishes.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: '5/10s outputs in the browser—credits shown before generate.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: ['Quick social clips', 'CFG-tuned I2V', 'Product still animation', 'A/B prompt testing']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 v2.5 Turbo T2V Pro vs I2V Pro',
      ariaLabel: 'Kling v2.5 Turbo T2V vs I2V',
      headers: ['Dimension', 'T2V Pro', 'I2V Pro'],
      rows: [
        ['<strong>Input</strong>', 'Prompt only', 'Image + prompt (+ optional tail frame)'],
        ['<strong>Aspect ratio</strong>', '16:9, 9:16, 1:1', 'Follows source image'],
        [
          '<strong>Duration</strong>',
          {
            html: '5s or 10s',
            colspan: 2
          }
        ],
        [
          '<strong>Fine-tuning</strong>',
          {
            html: 'Negative prompt, CFG 0–1',
            colspan: 2
          }
        ]
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Kling v2.5 Turbo)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ v2.5 Turbo Technical Specs',
      ariaLabel: 'Kling v2.5 Turbo capabilities',
      headers: ['Workflow', 'modelKey', 'Required', 'Key controls'],
      rows: [
        [
          '<strong>T2V Pro</strong>',
          '<code>kling-v2-5-turbo-text-to-video-pro</code>',
          'Prompt (≤2500)',
          'Aspect 16:9/9:16/1:1; duration 5/10s; negative prompt; CFG'
        ],
        [
          '<strong>I2V Pro</strong>',
          '<code>kling-v2-5-turbo-image-to-video-pro</code>',
          'Image + prompt',
          'Optional tail frame; duration 5/10s; negative prompt; CFG'
        ]
      ],
      lead: 'Parameters match the FuseAITools Kling form (<code>kling-v2-5-turbo-*</code>).'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Kling v2.5 Turbo — Two Workflows',
      items: [
        {
          name: 'Kling v2.5 Turbo I2V Pro',
          title: 'I2V Pro',
          description: 'Animate one image with optional tail frame—CFG, 5/10s.',
          path: '/home/kling/v2-5-turbo-image-to-video-pro',
          icon: 'fas fa-image'
        },
        {
          name: 'Kling v2.5 Turbo T2V Pro',
          title: 'T2V Pro',
          description: 'Text-to-video—16:9/9:16/1:1, negative prompt, CFG, 5/10s.',
          path: '/home/kling/v2-5-turbo-text-to-video-pro',
          icon: 'fas fa-keyboard'
        }
      ]
    },
    {
      type: 'table',
      id: 'version-compare-heading',
      title: '📊 Kling 2.5 vs 2.6 vs 3.0',
      ariaLabel: 'Kling 2.5 vs 2.6 vs 3.0 comparison',
      headers: ['Dimension', 'v2.5 Turbo', '2.6', '3.0'],
      rows: [
        [
          '<strong>Positioning</strong>',
          'Fast, fine-tuned T2V/I2V',
          'Sound + motion control',
          'Director-level storytelling'
        ],
        [
          '<strong>Workflows</strong>',
          'T2V Pro, I2V Pro (+ tail frame)',
          'T2V, I2V, Motion Control',
          '3.0 Video, 3.0 Motion Control'
        ],
        [
          '<strong>Duration</strong>',
          '<strong>5s or 10s</strong>',
          '<strong>5s or 10s</strong> (T2V/I2V); motion = ref video length',
          '<strong>3–15s</strong> (Video); motion = ref video length'
        ],
        [
          '<strong>Generated sound</strong>',
          'No',
          '<strong>Yes</strong> (T2V/I2V toggle)',
          '<strong>Yes</strong> (3.0 Video; required in multi-shot)'
        ],
        [
          '<strong>Motion control</strong>',
          'No',
          '2.6 Motion Control (720p/1080p)',
          '3.0 Motion Control (std/pro + background source)'
        ],
        [
          '<strong>Unique controls</strong>',
          'Negative prompt, CFG scale (0–1)',
          'Character orientation from image/video',
          'Multi-shot (≤5), per-shot elements, start/end frames'
        ],
        [
          '<strong>Best for</strong>',
          'Quick social clips, CFG-tuned I2V',
          'Clips with audio, pose transfer',
          'Narrative sequences, advanced motion'
        ]
      ],
      lead: 'Three video-generation tiers on FuseAITools—pick by speed, audio needs, motion control, or multi-shot depth. <strong>v2.5 Turbo</strong> is the entry tier; upgrade to <a href="/home/kling/v2-6-text-to-video" class="seo-inline-link">Kling 2.6</a> or <a href="/home/kling/v3-0-video" class="seo-inline-link">Kling 3.0 Video</a> when you need sound, motion control, or multi-shot storytelling. AI Avatar is <strong>not</strong> part of this ladder.'
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for subscription discounts and credit top-ups.'
    },
    {
      pricing: false,
      html: '🔊 Need generated sound or motion control? <a href="/home/kling/v2-6-text-to-video" class="seo-inline-link">Try Kling 2.6 →</a> for optional audio on T2V/I2V plus reference-video Motion Control at 720p/1080p.'
    },
    {
      pricing: false,
      html: '🎬 Want multi-shot storytelling or 3–15s clips? <a href="/home/kling/v3-0-video" class="seo-inline-link">Explore Kling 3.0 Video →</a> for director mode, std/pro quality, and up to five shots per generation.'
    },
    {
      pricing: false,
      html: '⚡ Want a faster turbo tier with a 3–15s slider and 720p/1080p? <a href="/home/kling/v3-turbo-text-to-video" class="seo-inline-link">Try Kling V3 Turbo Text to Video →</a> or <a href="/home/kling/v3-turbo-image-to-video" class="seo-inline-link">V3 Turbo Image to Video</a> —same fast lane as v2.5 Turbo but with per-second billing and a continuous duration control.'
    },
    {
      pricing: false,
      html: '🌐 Want the flagship Kling 3.0 Omni family—4K, native audio, smart/custom multi-shot and reusable subject elements? <a href="/home/kling/3-0-omni-text-to-video" class="seo-inline-link">Omni Text to Video</a>, <a href="/home/kling/3-0-omni-image-to-video" class="seo-inline-link">Image</a> / <a href="/home/kling/3-0-omni-reference-to-video" class="seo-inline-link">Reference</a> (billed per second), or <a href="/home/kling/3-0-omni-transformation" class="seo-inline-link">Video Transformation</a> to restyle a clip you already have.'
    }
  ],
  watchPathIncludes: '/home/kling/v2-5-turbo-'
}
