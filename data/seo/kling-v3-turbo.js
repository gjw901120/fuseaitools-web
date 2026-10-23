/**
 * KlingV3Turbo SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：KlingV3TurboSeoContent.vue）
 */
export default {
  component: 'KlingV3TurboSeoContent',
  rootId: 'kling-v3-turbo-section',
  rootClass: 'kling-seo',
  meta: {
    name: 'Kling V3 Turbo Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Kling V3 Turbo text and image-to-video on FuseAITools—fast 3–15s clips at 720p/1080p with per-second pricing.'
  },
  badge: '⚡ Kling V3 Turbo · Text & Image to Video · 3–15s · 720p/1080p',
  introByPath: {
    '/home/kling/v3-turbo-text-to-video': {
      title: '⚡ Kling V3 Turbo Text to Video',
      lead: 'Type a prompt (≤<strong>2500</strong> chars), pick <strong>aspect ratio</strong> (1:1 / 16:9 / 9:16), <strong>resolution</strong> (720p / 1080p), and a <strong>3–15s</strong> duration. Credits bill <strong>per second</strong> at your resolution tier.'
    },
    '/home/kling/v3-turbo-image-to-video': {
      title: '🖼️ Kling V3 Turbo Image to Video',
      lead: 'Upload <strong>one image</strong> (JPEG/PNG, ≤10MB) plus a prompt (≤<strong>2500</strong>). Output follows the input frame, so there is no aspect-ratio control—just choose <strong>720p / 1080p</strong> and a <strong>3–15s</strong> duration. Billed per second.'
    }
  },
  definitionByPath: {
    '/home/kling/v3-turbo-text-to-video': {
      title: 'What is Kling V3 Turbo Text to Video?',
      body: '<strong>Kling V3 Turbo Text to Video</strong> (<code>kling-v3-turbo-text-to-video</code>)—a fast text-to-video tier with a 3–15s slider, 720p/1080p resolution, and per-second pricing. A streamlined alternative to v2.5 Turbo Pro.'
    },
    '/home/kling/v3-turbo-image-to-video': {
      title: 'What is Kling V3 Turbo Image to Video?',
      body: '<strong>Kling V3 Turbo Image to Video</strong> (<code>kling-v3-turbo-image-to-video</code>)—animate a single reference image with a prompt over 3–15s at 720p/1080p, billed per second. Aspect ratio follows the input image.'
    }
  },
  faqByPath: {
    '/home/kling/v3-turbo-text-to-video': [
      {
        question: 'How long can Kling V3 Turbo text-to-video clips be?',
        answer: 'Use the slider to pick any integer from <strong>3 to 15 seconds</strong>. Pricing scales per second at 720p or 1080p.'
      },
      {
        question: 'Which aspect ratios does Kling V3 Turbo T2V support?',
        answer: '<strong>1:1</strong>, <strong>16:9</strong>, and <strong>9:16</strong>. Prompt max 2500 characters.'
      }
    ],
    '/home/kling/v3-turbo-image-to-video': [
      {
        question: 'How many images can I upload for Kling V3 Turbo I2V?',
        answer: 'Exactly <strong>one</strong> reference image (JPEG/PNG, ≤10MB) plus a required prompt.'
      },
      {
        question: 'Why is there no aspect-ratio control on V3 Turbo I2V?',
        answer: 'The output <strong>follows the input image frame</strong>, so aspect ratio is derived from your uploaded image rather than chosen separately.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Kling V3 Turbo?',
      answer: 'No—V3 Turbo runs in the cloud. Both workflows bill per output second at the selected resolution.'
    },
    {
      question: 'How is Kling V3 Turbo priced on FuseAITools?',
      answer: 'Per-second RULE pricing keyed on resolution (720p / 1080p) × clip duration. Total credits appear on the Generate button. See <a href="/pricing" class="seo-pricing-link">pricing</a>.'
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
      title: '⚡ Kling V3 Turbo on FuseAITools',
      html: '<strong>Kling V3 Turbo</strong> is the fast lane of the Kling 3.x family on <a href="/" class="seo-inline-link">FuseAITools</a>—<strong>Text to Video</strong> and <strong>Image to Video</strong> with clean controls: prompt up to 2500 characters, duration from <strong>3 to 15 seconds</strong>, output at <strong>720p or 1080p</strong>, billed <strong>per second</strong>. Compared to <a href="/home/kling/v2-5-turbo-text-to-video-pro" class="seo-inline-link">v2.5 Turbo</a>, V3 Turbo lifts the duration ceiling from 10s to 15s and drops the CFG/negative-prompt knobs for a streamlined form. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Kling V3 Turbo Core Features',
      items: [
        {
          icon: '⚡',
          title: 'Fast 3.x Lane',
          description: 'Streamlined V3 Turbo with clean controls—no CFG or negative-prompt knobs.'
        },
        {
          icon: '🎚️',
          title: '3–15s Slider',
          description: 'Continuous duration from <strong>3 to 15 seconds</strong>—beyond the 5/10s steps of v2.5 Turbo.'
        },
        {
          icon: '🖥️',
          title: '720p / 1080p',
          description: 'Pick output resolution; the per-second rate scales with the tier.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'Text and image workflows in one tier—credits shown before generate.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: ['Fast social clips', 'Longer 3–15s shots', 'Image animation', 'Rapid drafts']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Kling V3 Turbo vs v2.5 Turbo',
      ariaLabel: 'Kling V3 Turbo vs v2.5 Turbo',
      headers: ['Dimension', 'V3 Turbo', 'v2.5 Turbo Pro'],
      rows: [
        ['<strong>Workflows</strong>', 'Text to Video, Image to Video', 'T2V Pro, I2V Pro'],
        ['<strong>Duration</strong>', '<strong>3–15s</strong> slider', '5s / 10s buttons'],
        ['<strong>Resolution</strong>', '<strong>720p / 1080p</strong>', 'Fixed by model'],
        [
          '<strong>Aspect ratio</strong>',
          '1:1 / 16:9 / 9:16 (T2V); I2V follows input image',
          '16:9 / 9:16 / 1:1 (T2V)'
        ],
        [
          '<strong>Fine-tuning</strong>',
          'Streamlined—no CFG / negative prompt',
          'Negative prompt, CFG scale'
        ],
        ['<strong>Pricing</strong>', 'Per second × duration × resolution tier', 'Per duration']
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Kling V3 Turbo)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Kling V3 Turbo Technical Specs',
      ariaLabel: 'Kling V3 Turbo capabilities',
      headers: ['Workflow', 'modelKey', 'Required', 'Key controls'],
      rows: [
        [
          '<strong>V3 Turbo Text to Video</strong>',
          '<code>kling-v3-turbo-text-to-video</code>',
          'Prompt (≤2500)',
          'Duration 3–15s; aspect 1:1/16:9/9:16; resolution 720p/1080p; per-second'
        ],
        [
          '<strong>V3 Turbo Image to Video</strong>',
          '<code>kling-v3-turbo-image-to-video</code>',
          'Prompt (≤2500) + 1 image',
          'Duration 3–15s; resolution 720p/1080p; per-second'
        ]
      ],
      note: 'Pricing is <strong>per second</strong> and keyed on the selected <strong>resolution</strong> (720p / 1080p). The Generate button shows total credits before you submit.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Kling V3 Turbo — Two Workflows',
      items: [
        {
          name: 'Kling V3 Turbo Text to Video',
          title: 'V3 Turbo T2V',
          description: 'Prompt to video, 3–15s, 720p/1080p.',
          path: '/home/kling/v3-turbo-text-to-video',
          icon: 'fas fa-keyboard'
        },
        {
          name: 'Kling V3 Turbo Image to Video',
          title: 'V3 Turbo I2V',
          description: 'Animate one image, 3–15s, per-second.',
          path: '/home/kling/v3-turbo-image-to-video',
          icon: 'fas fa-image'
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
      html: '🎬 Need multi-shot storytelling, sound, or motion control? <a href="/home/kling/v3-0-video" class="seo-inline-link">Explore Kling 3.0 Video →</a> for up to five shots with per-shot elements, or <a href="/home/kling/v2-6-text-to-video" class="seo-inline-link">Kling 2.6</a> for generated sound and reference-video motion control.'
    },
    {
      pricing: false,
      html: '🌐 Need more control—4K, native audio, smart/custom multi-shot and reusable subject elements? <a href="/home/kling/3-0-omni-text-to-video" class="seo-inline-link">Try Kling 3.0 Omni Text to Video →</a> or its <a href="/home/kling/3-0-omni-image-to-video" class="seo-inline-link">Image</a> / <a href="/home/kling/3-0-omni-reference-to-video" class="seo-inline-link">Reference</a> variants—also billed per second. Need to restyle existing footage instead? Try <a href="/home/kling/3-0-omni-transformation" class="seo-inline-link">Kling 3.0 Omni Video Transformation</a>, billed by the actual uploaded clip length.'
    }
  ],
  watchPathIncludes: '/home/kling/v3-turbo-'
}
