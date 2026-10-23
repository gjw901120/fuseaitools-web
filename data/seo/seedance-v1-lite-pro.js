/**
 * SeedanceV1LitePro SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：SeedanceV1LiteProSeoContent.vue）
 */
export default {
  component: 'SeedanceV1LiteProSeoContent',
  rootId: 'seedance-v1-section',
  rootClass: 'seedance-seo',
  meta: {
    name: 'Seedance v1 Lite & Pro Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Seedance v1 Lite and Pro text and image-to-video workflows on FuseAITools—480p/720p/1080p, 5/10s clips, camera and seed controls.'
  },
  badge: '🎬 Seedance v1 · Lite & Pro · Five Workflows',
  introByPath: {
    '/home/seedance/v1-lite-text-to-video': {
      title: '📝 Seedance v1 Lite Text to Video',
      lead: 'Describe scenes in text—Seedance v1 Lite renders <strong>5 or 10 second</strong> clips at <strong>480p, 720p, or 1080p</strong>. Pick aspect ratios from <strong>16:9</strong> through vertical <strong>9:21</strong>, with optional fixed camera and seed control.'
    },
    '/home/seedance/v1-lite-image-to-video': {
      title: '🖼️ Seedance v1 Lite Image to Video',
      lead: 'Upload <strong>one image</strong> and guide motion with a prompt. Add an optional <strong>end image</strong> for smoother transitions—<strong>5s/10s</strong> at up to <strong>1080p</strong> with camera fixed and seed options.'
    },
    '/home/seedance/v1-pro-text-to-video': {
      title: '📝 Seedance v1 Pro Text to Video',
      lead: 'Pro text-to-video adds <strong>21:9 ultra-wide</strong> alongside standard ratios for cinematic output. Same <strong>5s/10s</strong> duration tiers and <strong>480p–1080p</strong> resolution with camera, seed, and safety checker controls.'
    },
    '/home/seedance/v1-pro-image-to-video': {
      title: '🖼️ Seedance v1 Pro Image to Video',
      lead: 'Animate stills with Pro-grade motion understanding—<strong>one image URL</strong> plus prompt, <strong>5s or 10s</strong>, and full resolution options with camera fixed, seed, and safety checker.'
    },
    '/home/seedance/v1-pro-fast-image-to-video': {
      title: '⚡ Seedance v1 Pro Fast Image to Video',
      lead: 'When speed matters, Pro Fast I2V skips extra toggles—upload <strong>one image</strong>, write your prompt, and generate <strong>5s or 10s</strong> at <strong>720p or 1080p</strong> in an optimized pipeline.'
    }
  },
  definitionByPath: {
    '/home/seedance/v1-lite-text-to-video': {
      title: 'What is Seedance v1 Lite Text to Video?',
      body: '<strong>Seedance v1 Lite Text to Video</strong> on FuseAITools turns a prompt (max <strong>10,000 characters</strong>) into an MP4. Choose <strong>5 or 10 seconds</strong>, <strong>480p/720p/1080p</strong>, and aspect ratios <strong>16:9, 4:3, 1:1, 3:4, 9:16, or 9:21</strong>—with optional fixed camera, seed (-1 for random), and safety checker.'
    },
    '/home/seedance/v1-lite-image-to-video': {
      title: 'What is Seedance v1 Lite Image to Video?',
      body: '<strong>Seedance v1 Lite Image to Video</strong> on FuseAITools animates a <strong>single uploaded image</strong> with a required prompt. Optional <strong>end image URL</strong> controls transition endpoints. Output is <strong>5s or 10s</strong> at <strong>480p–1080p</strong>; camera fixed and seed are available.'
    },
    '/home/seedance/v1-pro-text-to-video': {
      title: 'What is Seedance v1 Pro Text to Video?',
      body: '<strong>Seedance v1 Pro Text to Video</strong> on FuseAITools delivers higher-fidelity text-to-video with <strong>21:9</strong> ultra-wide plus standard aspect ratios. Duration is <strong>5 or 10 seconds</strong> at <strong>480p/720p/1080p</strong>, with camera fixed, seed, and safety checker controls.'
    },
    '/home/seedance/v1-pro-image-to-video': {
      title: 'What is Seedance v1 Pro Image to Video?',
      body: '<strong>Seedance v1 Pro Image to Video</strong> on FuseAITools animates one image with Pro-grade quality. Required: <strong>image URL + prompt</strong>. Set <strong>5s/10s</strong>, <strong>480p–1080p</strong>, plus camera fixed, seed, and safety checker for brand-safe production work.'
    },
    '/home/seedance/v1-pro-fast-image-to-video': {
      title: 'What is Seedance v1 Pro Fast Image to Video?',
      body: '<strong>Seedance v1 Pro Fast Image to Video</strong> on FuseAITools is a streamlined image-to-video path—<strong>one image + prompt</strong>, <strong>5 or 10 seconds</strong>, and <strong>720p or 1080p only</strong> (no 480p tier). Camera, seed, and safety toggles are omitted for faster iteration.'
    }
  },
  faqByPath: {
    '/home/seedance/v1-lite-text-to-video': [
      {
        question: 'What aspect ratios does Seedance v1 Lite text-to-video support?',
        answer: 'Choose <strong>16:9, 4:3, 1:1, 3:4, 9:16, or 9:21</strong>—including tall vertical <strong>9:21</strong> for mobile-first content. Resolution is <strong>480p, 720p, or 1080p</strong>; duration is <strong>5s or 10s</strong>.'
      },
      {
        question: 'What does the safety checker do on Lite text-to-video?',
        answer: 'When enabled, the optional <strong>safety checker</strong> filters content before generation. You can also set a fixed <strong>seed</strong> (-1 for random) to reproduce successful results.'
      }
    ],
    '/home/seedance/v1-lite-image-to-video': [
      {
        question: 'Can I use an end image on Seedance v1 Lite image-to-video?',
        answer: 'Yes—add an optional <strong>end image URL</strong> to steer how the clip finishes. You still need a start image and prompt; duration is <strong>5s or 10s</strong> at up to <strong>1080p</strong>.'
      },
      {
        question: 'Does Lite image-to-video have aspect ratio controls?',
        answer: 'No—image-to-video follows your input frame composition. Aspect ratio tabs apply to <strong>text-to-video</strong> modes only.'
      }
    ],
    '/home/seedance/v1-pro-text-to-video': [
      {
        question: 'How is Seedance v1 Pro text-to-video different from Lite?',
        answer: 'Pro adds <strong>21:9 ultra-wide</strong> and higher visual fidelity for final assets. Both support <strong>5s/10s</strong> and <strong>480p–1080p</strong>; Pro is better when you need cinematic widescreen or production-grade detail.'
      },
      {
        question: 'What prompt length does Pro text-to-video accept?',
        answer: 'Up to <strong>10,000 characters</strong>—same as Lite. Use detailed motion, lighting, and camera direction for best results.'
      }
    ],
    '/home/seedance/v1-pro-image-to-video': [
      {
        question: 'What controls does Pro image-to-video include?',
        answer: 'Upload <strong>one image</strong> plus prompt, then set <strong>5s/10s</strong> and <strong>480p–1080p</strong>. Optional <strong>camera fixed</strong>, <strong>seed</strong>, and <strong>safety checker</strong> match Pro text-to-video.'
      },
      {
        question: 'When should I pick Pro I2V over Pro Fast I2V?',
        answer: 'Use <strong>Pro I2V</strong> when you need 480p drafts, camera/seed control, or the safety checker. Choose <strong>Pro Fast I2V</strong> when you only need 720p/1080p and want the fastest path.'
      }
    ],
    '/home/seedance/v1-pro-fast-image-to-video': [
      {
        question: 'Why does Pro Fast image-to-video only offer 720p and 1080p?',
        answer: 'The Pro Fast pipeline is optimized for speed at <strong>720p or 1080p</strong>—there is no 480p option. Duration remains <strong>5s or 10s</strong> with prompt up to <strong>10,000 characters</strong>.'
      },
      {
        question: 'Does Pro Fast image-to-video support seed or camera fixed?',
        answer: 'No—Pro Fast omits <strong>camera fixed</strong>, <strong>seed</strong>, and <strong>safety checker</strong> toggles to reduce form complexity and latency. Use standard Pro I2V if you need those controls.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Seedance v1?',
      answer: 'No—Seedance v1 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
    },
    {
      question: 'How is Seedance v1 priced on FuseAITools?',
      answer: 'Credits depend on <strong>duration</strong> and <strong>resolution</strong>—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
      title: '🎬 Seedance v1 on FuseAITools',
      html: 'Seedance v1 on <a href="/" class="seo-inline-link">FuseAITools</a> offers <strong>Lite</strong> for fast iteration and <strong>Pro</strong> for higher-fidelity output. Choose text-to-video or image-to-video—including a dedicated <strong>Pro Fast I2V</strong> pipeline. Credits are shown on the Generate button before you submit; new users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Seedance v1 Core Features',
      items: [
        {
          icon: '⚡',
          title: 'Lite vs Pro Tiers',
          description: '<strong>Lite</strong> for rapid drafts; <strong>Pro</strong> for 21:9 cinematic and higher detail—switch tiers without leaving FuseAITools.'
        },
        {
          icon: '🖼️',
          title: 'Text & Image Inputs',
          description: 'Five workflows cover <strong>text-to-video</strong> and <strong>image-to-video</strong>, including optional end frames on Lite I2V.'
        },
        {
          icon: '🎛️',
          title: 'Camera & Seed Control',
          description: 'Fixed camera, reproducible <strong>seed</strong>, and optional <strong>safety checker</strong> on most v1 modes (except Pro Fast I2V).'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: '480p–1080p output in the browser—<strong>credits shown before generate</strong>; no local GPU install required.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Social & vertical video',
        'Product motion from stills',
        'Cinematic 21:9 ads',
        'Rapid creative iteration',
        'Brand-safe campaigns'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Seedance v1 Lite vs Pro',
      ariaLabel: 'Seedance v1 Lite vs Pro',
      headers: ['Dimension', 'Lite', 'Pro'],
      rows: [
        [
          'Best for',
          '<strong>Rapid drafts</strong> and social tests',
          '<strong>Production-ready</strong> assets and 21:9 cinematic'
        ],
        [
          'Text-to-video ratios',
          '16:9 … 9:21 (incl. vertical 9:21)',
          '<strong>21:9</strong> ultra-wide plus standard ratios'
        ],
        ['Resolution', '480p / 720p / 1080p', '480p / 720p / 1080p (Pro Fast I2V: 720p/1080p only)'],
        ['Duration', '<strong>5s or 10s</strong>', '<strong>5s or 10s</strong>'],
        [
          'Controls',
          'Camera fixed, seed, safety checker (T2V)',
          'Same + Pro Fast I2V streamlines to prompt + image only'
        ]
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Seedance v1)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Seedance v1 Technical Specs',
      ariaLabel: 'Seedance v1 workflow capabilities',
      headers: ['Workflow', 'Required input', 'Duration', 'Resolution / ratio', 'Key controls'],
      rows: [
        [
          '<strong>Lite Text to Video</strong>',
          'Prompt (max 10,000 chars)',
          '5s / 10s',
          '480p–1080p; 16:9, 4:3, 1:1, 3:4, 9:16, 9:21',
          'Camera fixed, seed, safety checker'
        ],
        [
          '<strong>Lite Image to Video</strong>',
          '1 image URL + prompt',
          '5s / 10s',
          '480p–1080p (follows image framing)',
          'Optional end image; camera fixed, seed'
        ],
        [
          '<strong>Pro Text to Video</strong>',
          'Prompt (max 10,000 chars)',
          '5s / 10s',
          '480p–1080p; 21:9 + standard ratios',
          'Camera fixed, seed, safety checker'
        ],
        [
          '<strong>Pro Image to Video</strong>',
          '1 image URL + prompt',
          '5s / 10s',
          '480p–1080p',
          'Camera fixed, seed, safety checker'
        ],
        [
          '<strong>Pro Fast Image to Video</strong>',
          '1 image URL + prompt',
          '5s / 10s',
          '<strong>720p / 1080p only</strong>',
          'Streamlined—no camera/seed/safety toggles'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Seedance form and API (<code>seedance-v1-*</code> models).',
      note: 'Image inputs: JPEG, PNG, WebP (max 10MB; min 256×256px). Credits bill by duration and resolution—shown on Generate before submission.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Seedance v1 — Five Workflows',
      lead: 'Pick Lite for speed or Pro for quality:',
      items: [
        {
          name: 'Seedance v1 Lite Text to Video',
          title: 'Lite Text to Video',
          description: 'Prompt-only clips with 9:21 vertical support—480p/720p/1080p, 5s or 10s.',
          path: '/home/seedance/v1-lite-text-to-video',
          icon: 'fas fa-font'
        },
        {
          name: 'Seedance v1 Lite Image to Video',
          title: 'Lite Image to Video',
          description: 'Animate one image with optional end frame for controlled transitions.',
          path: '/home/seedance/v1-lite-image-to-video',
          icon: 'fas fa-image'
        },
        {
          name: 'Seedance v1 Pro Text to Video',
          title: 'Pro Text to Video',
          description: '21:9 cinematic plus standard ratios—enhanced detail at 480p–1080p.',
          path: '/home/seedance/v1-pro-text-to-video',
          icon: 'fas fa-font'
        },
        {
          name: 'Seedance v1 Pro Image to Video',
          title: 'Pro Image to Video',
          description: 'Professional image animation with camera, seed, and safety controls.',
          path: '/home/seedance/v1-pro-image-to-video',
          icon: 'fas fa-image'
        },
        {
          name: 'Seedance v1 Pro Fast Image to Video',
          title: 'Pro Fast Image to Video',
          description: 'Speed-optimized I2V at 720p/1080p—5s or 10s without extra toggles.',
          path: '/home/seedance/v1-pro-fast-image-to-video',
          icon: 'fas fa-bolt'
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
      html: '🖼️ <strong>ByteDance image companion — Seedream</strong> Create 2K/3K stills with <a href="/home/seedream/5-lite-text-to-image" class="seo-inline-link" >Seedream 5 Lite Text to Image</a> or prep first/last frames via <a href="/home/seedream/5-lite-image-to-image" class="seo-inline-link" >Seedream 5 Lite Image to Image</a> before animating here in Seedance.'
    },
    {
      pricing: false,
      html: '🎵 Need unified T2V/I2V with optional audio? <a href="/home/seedance/v1-5-pro" class="seo-inline-link" >Try Seedance 1.5 Pro →</a> for 4–12s clips and fixed-lens control.'
    },
    {
      pricing: false,
      html: '🎬 Want multimodal references and first/last frame control? <a href="/home/seedance/v2" class="seo-inline-link" >Explore Seedance 2 →</a> for 4–15s outputs with image, video, and audio references.'
    },
    {
      pricing: false,
      html: '⏱️ Need longer multimodal clips (up to 30s)? <a href="/home/seedance/v2-5" class="seo-inline-link" >Try Seedance 2.5 →</a> for 4–30s at 480p/720p/1080p.'
    }
  ]
}
