/**
 * Kling30Omni SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：Kling30OmniSeoContent.vue）
 */
export default {
  component: 'Kling30OmniSeoContent',
  rootId: 'kling-3-0-omni-section',
  rootClass: 'kling-seo',
  meta: {
    name: 'Kling 3.0 Omni Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Kling 3.0 Omni text, image and reference-to-video on FuseAITools—3–15s clips at 720p/1080p/4K with native audio, smart or custom multi-shot, and reusable subject elements.'
  },
  badge: '🌐 Kling 3.0 Omni · Text · Image · Reference · 3–15s · up to 4K',
  introByPath: {
    '/home/kling/3-0-omni-text-to-video': {
      title: '🌐 Kling 3.0 Omni Text to Video',
      lead: 'Type a prompt (≤<strong>3072</strong> chars), pick <strong>aspect ratio</strong> (16:9 / 9:16 / 1:1), <strong>resolution</strong> (720p / 1080p / 4K), a <strong>3–15s</strong> duration, toggle <strong>audio</strong>, and choose <strong>single / smart / custom</strong> shots. Add reusable <strong>elements</strong> referenced by <code>@name</code>. Credits bill <strong>per second</strong>.'
    },
    '/home/kling/3-0-omni-image-to-video': {
      title: '🖼️ Kling 3.0 Omni Image to Video',
      lead: 'Upload <strong>one first-frame image</strong> (JPG/PNG, ≤50MB, min 300px) plus a prompt (≤<strong>3072</strong>). Single/smart shots follow the input frame (<code>auto</code> aspect); custom multi-shot lets you set a ratio. Choose <strong>720p / 1080p / 4K</strong>, duration and audio. Billed per second.'
    },
    '/home/kling/3-0-omni-reference-to-video': {
      title: '🧩 Kling 3.0 Omni Reference to Video',
      lead: 'Combine up to <strong>7 reference images</strong> and up to <strong>3 character videos</strong> with a prompt (≤<strong>3072</strong>). When a reference video is present, pricing switches to the <code>with_video</code> scene and audio is disabled. Output <strong>720p / 1080p / 4K</strong>, 3–15s.'
    }
  },
  definitionByPath: {
    '/home/kling/3-0-omni-text-to-video': {
      title: 'What is Kling 3.0 Omni Text to Video?',
      body: '<strong>Kling 3.0 Omni Text to Video</strong> (<code>kling-3.0-omni-text-to-video</code>)—the flagship prompt-to-video tier with a 3–15s duration, 720p/1080p/4K resolution, native audio, smart/custom multi-shot, and subject elements.'
    },
    '/home/kling/3-0-omni-image-to-video': {
      title: 'What is Kling 3.0 Omni Image to Video?',
      body: '<strong>Kling 3.0 Omni Image to Video</strong> (<code>kling-3.0-omni-image-to-video</code>)—animate a single first-frame image over 3–15s at up to 4K, with audio, multi-shot modes and elements. Aspect is <code>auto</code> unless you use custom shots.'
    },
    '/home/kling/3-0-omni-reference-to-video': {
      title: 'What is Kling 3.0 Omni Reference to Video?',
      body: '<strong>Kling 3.0 Omni Reference to Video</strong> (<code>kling-3.0-omni-reference-to-video</code>)—steer generation with up to 7 reference images and 3 character videos plus a prompt. A reference video triggers <code>with_video</code> pricing.'
    }
  },
  faqByPath: {
    '/home/kling/3-0-omni-text-to-video': [
      {
        question: 'What are smart and custom multi-shot on Omni?',
        answer: '<strong>Smart</strong> (preferMultiShots) lets the model split your prompt into shots automatically. <strong>Custom</strong> (customizeMultiShots) lets you define each shot\'s prompt and duration—1–6 shots, each 1–12s, total ≤15s. The two are mutually exclusive.'
      },
      {
        question: 'How do subject elements work?',
        answer: 'Add named elements (a character or object) with media; reference them in prompts as <code>@name</code> for consistent identity across shots.'
      }
    ],
    '/home/kling/3-0-omni-image-to-video': [
      {
        question: 'What image does Omni Image to Video need?',
        answer: 'Exactly <strong>one</strong> first-frame image (JPG/JPEG/PNG, ≤50MB, min 300px, aspect 0.4–2.5) plus a prompt.'
      },
      {
        question: 'Why can\'t I pick an aspect ratio on single shot?',
        answer: 'Single and smart shots inherit the input frame, so aspect is <code>auto</code>. Switch to <strong>custom</strong> multi-shot to set 16:9 / 9:16 / 1:1.'
      }
    ],
    '/home/kling/3-0-omni-reference-to-video': [
      {
        question: 'How many reference images and videos can I upload?',
        answer: 'Up to <strong>7 images</strong> and up to <strong>3 character videos</strong>. Mixed subject counts are validated by the vendor.'
      },
      {
        question: 'Why is audio disabled when I add a reference video?',
        answer: 'With a reference video the workflow bills the <code>with_video</code> scene and audio is not applied; remove the video to enable native audio.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Kling 3.0 Omni?',
      answer: 'No—Omni runs in the cloud. All three workflows bill per output second at the selected resolution and scene.'
    },
    {
      question: 'How is Kling 3.0 Omni priced on FuseAITools?',
      answer: 'Per-second RULE pricing keyed on resolution (720p / 1080p / 4K) and scene (<code>no_audio</code> / <code>with_audio</code>, plus <code>with_video</code> for reference-to-video with a video) × clip duration. Total credits show on the Generate button. See <a href="/pricing" class="seo-pricing-link">pricing</a>.'
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
      title: '🌐 Kling 3.0 Omni on FuseAITools',
      html: '<strong>Kling 3.0 Omni</strong> is the most flexible member of the Kling 3.x family on <a href="/" class="seo-inline-link">FuseAITools</a>—three workflows (<strong>Text to Video</strong>, <strong>Image to Video</strong>, and <strong>Reference to Video</strong>) sharing a rich control set: prompt up to <strong>3072 characters</strong>, <strong>3–15s</strong> duration, <strong>720p / 1080p / 4K</strong> resolution, optional <strong>native audio</strong>, and <strong>smart</strong> or <strong>custom</strong> multi-shot. You can attach reusable <strong>subject elements</strong> (characters or objects) and reference them with <code>@name</code>. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Kling 3.0 Omni Core Features',
      items: [
        {
          icon: '🌐',
          title: 'Three Workflows',
          description: 'Text, image and reference inputs share one rich Omni control set.'
        },
        {
          icon: '🎞️',
          title: '4K & 3–15s',
          description: 'Up to <strong>4K</strong> output with a continuous <strong>3–15s</strong> duration.'
        },
        {
          icon: '🔊',
          title: 'Native Audio',
          description: 'Optional synchronized sound—billed as the <code>with_audio</code> scene.'
        },
        {
          icon: '🎬',
          title: 'Smart + Custom Shots',
          description: 'Auto shot-splitting or hand-tuned 1–6 shot sequences.'
        },
        {
          icon: '🧩',
          title: 'Subject Elements',
          description: 'Reusable characters/objects referenced by <code>@name</code>.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'Per-second credits shown before you generate.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Narrative multi-shot',
        'Character consistency',
        'Reference-driven scenes',
        'Premium 4K clips',
        'Social + audio'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Omni Text vs Image vs Reference',
      ariaLabel: 'Kling 3.0 Omni three workflows',
      headers: ['Dimension', 'Text to Video', 'Image to Video', 'Reference to Video'],
      rows: [
        [
          '<strong>Main input</strong>',
          'Prompt only',
          'One first-frame image + prompt',
          'Up to 7 images + up to 3 role videos + prompt'
        ],
        [
          '<strong>Aspect ratio</strong>',
          '16:9 / 9:16 / 1:1',
          '<code>auto</code> (custom shots may set ratio)',
          '16:9 / 9:16 / 1:1 (only without a reference video)'
        ],
        [
          '<strong>Duration</strong>',
          {
            html: '3–15 seconds (single/smart) or per-shot total (custom)',
            colspan: 3
          }
        ],
        [
          '<strong>Resolution</strong>',
          {
            html: '720p / 1080p / 4K',
            colspan: 3
          }
        ],
        [
          '<strong>Audio</strong>',
          'Optional native audio',
          'Optional native audio',
          'Off when a reference video is used'
        ]
      ]
    },
    {
      type: 'table',
      id: 'shotmode-heading',
      title: '🎬 Single, Smart &amp; Custom Multi-Shot',
      ariaLabel: 'Kling 3.0 Omni shot modes',
      headers: ['Mode', 'What it does', 'Constraints'],
      rows: [
        ['<strong>Single</strong>', 'One prompt drives the whole clip', 'Duration 3–15s'],
        [
          '<strong>Smart</strong>',
          'Model auto-splits your prompt into shots (preferMultiShots)',
          'Cannot combine with Custom'
        ],
        [
          '<strong>Custom</strong>',
          'Define each shot\'s prompt and duration (customizeMultiShots)',
          '1–6 shots, each 1–12s, total ≤15s'
        ]
      ],
      lead: 'Omni\'s shot ladder sits between the streamlined <a href="/home/kling/v3-turbo-text-to-video" class="seo-inline-link">V3 Turbo</a> and the director-grade <a href="/home/kling/v3-0-video" class="seo-inline-link">3.0 Video</a>:'
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Kling 3.0 Omni)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Kling 3.0 Omni Technical Specs',
      ariaLabel: 'Kling 3.0 Omni capabilities',
      headers: ['Workflow', 'modelKey', 'Required', 'Key controls'],
      rows: [
        [
          '<strong>Omni Text to Video</strong>',
          '<code>kling-3.0-omni-text-to-video</code>',
          'Prompt (≤3072)',
          'Duration 3–15s; aspect 16:9/9:16/1:1; resolution 720p/1080p/4k; audio; shot modes; elements'
        ],
        [
          '<strong>Omni Image to Video</strong>',
          '<code>kling-3.0-omni-image-to-video</code>',
          'Prompt (≤3072) + 1 first-frame image',
          'Aspect auto unless custom; duration 3–15s; resolution; audio; elements'
        ],
        [
          '<strong>Omni Reference to Video</strong>',
          '<code>kling-3.0-omni-reference-to-video</code>',
          'Prompt (≤3072)',
          '≤7 images + ≤3 videos; resolution 720p/1080p/4k; with-video pricing when a video is present'
        ]
      ],
      note: 'Pricing is <strong>per second</strong>, keyed on <strong>resolution</strong> (720p / 1080p / 4K) and <strong>scene</strong>—<code>no_audio</code> / <code>with_audio</code>, or <code>with_video</code> when a reference video is uploaded (Reference to Video only). Total credits appear on the Generate button.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Kling 3.0 Omni — Three Workflows',
      items: [
        {
          name: 'Kling 3.0 Omni Text to Video',
          title: 'Omni T2V',
          description: 'Prompt to video with audio, multi-shot and elements.',
          path: '/home/kling/3-0-omni-text-to-video',
          icon: 'fas fa-keyboard'
        },
        {
          name: 'Kling 3.0 Omni Image to Video',
          title: 'Omni I2V',
          description: 'Animate one first-frame image, 3–15s, up to 4K.',
          path: '/home/kling/3-0-omni-image-to-video',
          icon: 'fas fa-image'
        },
        {
          name: 'Kling 3.0 Omni Reference to Video',
          title: 'Omni R2V',
          description: 'Combine up to 7 images + 3 role videos.',
          path: '/home/kling/3-0-omni-reference-to-video',
          icon: 'fas fa-layer-group'
        }
      ]
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for subscription discounts and credit top-ups.'
    },
    {
      pricing: false,
      html: '🎬 Want per-shot elements with start/end frames, or a faster cheaper lane? <a href="/home/kling/v3-0-video" class="seo-inline-link">Explore Kling 3.0 Video →</a> for director-grade multi-shot, or <a href="/home/kling/v3-turbo-text-to-video" class="seo-inline-link">Kling V3 Turbo</a> for a streamlined 720p/1080p fast lane.'
    },
    {
      pricing: false,
      html: '🔄 Already have a clip to restyle? <a href="/home/kling/3-0-omni-transformation" class="seo-inline-link">Try Kling 3.0 Omni Video Transformation →</a> —transform one uploaded source video (billed by its actual length) with a prompt and optional reference images.'
    }
  ],
  watchPathIncludes: '/home/kling/3-0-omni-'
}
