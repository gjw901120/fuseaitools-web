/**
 * HappyHorseV11 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：HappyHorseV11SeoContent.vue）
 */
export default {
  component: 'HappyHorseV11SeoContent',
  rootId: 'happyhorse-v11-section',
  rootClass: 'happyhorse-seo',
  meta: {
    name: 'HappyHorse v1.1 Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'HappyHorse v1.1 text, image, and reference-to-video on FuseAITools—native audio-video generation at 720p/1080p, 3–15s clips, nine aspect ratios, per-second credit pricing.'
  },
  badge: '🐴 HappyHorse v1.1 · Native Audio-Video · Nine Aspect Ratios · 3–15s',
  introByPath: {
    '/home/happy-horse/v1-1-text-to-video': {
      title: '📝 HappyHorse v1.1 Text to Video',
      lead: 'Describe scenes in text—HappyHorse v1.1 generates <strong>video with synced audio</strong> in one pass. Set <strong>3–15 seconds</strong>, <strong>720p or 1080p</strong>, and any of <strong>nine aspect ratios</strong> from 16:9 to 21:9.'
    },
    '/home/happy-horse/v1-1-image-to-video': {
      title: '🖼️ HappyHorse v1.1 Image to Video',
      lead: 'Upload <strong>one image</strong> and optionally guide motion with a prompt. Output is <strong>3–15 seconds</strong> at <strong>720p/1080p</strong> and keeps the input frame’s aspect ratio.'
    },
    '/home/happy-horse/v1-1-reference-to-video': {
      title: '👥 HappyHorse v1.1 Reference to Video',
      lead: 'Provide <strong>1–9 ordered reference images</strong> plus a prompt that cites them as <strong>[Image 1], [Image 2]…</strong>. Choose any of nine aspect ratios and set duration like text-to-video.'
    }
  },
  definitionByPath: {
    '/home/happy-horse/v1-1-text-to-video': {
      title: 'What is HappyHorse v1.1 Text to Video?',
      body: '<strong>HappyHorse v1.1 Text to Video</strong> (<code>happyhorse-1-1-text-to-video</code>) on FuseAITools turns a prompt (1–5000 characters) into a short clip with <strong>native audio-video sync</strong>. Choose <strong>3–15s</strong>, <strong>720p or 1080p</strong>, and one of <strong>nine aspect ratios</strong>—16:9, 9:16, 1:1, 4:3, 3:4, 4:5, 5:4, 9:21, or 21:9. The vendor does not accept a seed.'
    },
    '/home/happy-horse/v1-1-image-to-video': {
      title: 'What is HappyHorse v1.1 Image to Video?',
      body: '<strong>HappyHorse v1.1 Image to Video</strong> (<code>happyhorse-1-1-image-to-video</code>) animates a <strong>single uploaded image</strong> with optional prompt guidance. Duration is <strong>3–15 seconds</strong> at <strong>720p/1080p</strong>; there is no aspect-ratio control because the output follows your input frame.'
    },
    '/home/happy-horse/v1-1-reference-to-video': {
      title: 'What is HappyHorse v1.1 Reference to Video?',
      body: '<strong>HappyHorse v1.1 Reference to Video</strong> (<code>happyhorse-1-1-reference-to-video</code>) generates from <strong>1–9 reference images</strong> plus a required prompt. Cite subjects in upload order with <strong>[Image 1], [Image 2]…</strong> placeholders for consistent multi-character output at 720p/1080p across nine aspect ratios.'
    }
  },
  faqByPath: {
    '/home/happy-horse/v1-1-text-to-video': [
      {
        question: 'What aspect ratios does HappyHorse v1.1 text-to-video support?',
        answer: 'Nine—<strong>16:9, 9:16, 1:1, 4:3, 3:4, 4:5, 5:4, 9:21, and 21:9</strong>—plus <strong>720p or 1080p</strong> and <strong>3–15 second</strong> duration.'
      },
      {
        question: 'Can I set a seed on HappyHorse v1.1 text-to-video?',
        answer: 'No—unlike v1, the <strong>v1.1 vendor does not accept a seed</strong>. Use the <a href="/home/happy-horse/v1-text-to-video" class="seo-inline-link">HappyHorse v1</a> tab if you need a reproducible seed.'
      }
    ],
    '/home/happy-horse/v1-1-image-to-video': [
      {
        question: 'Is a prompt required for HappyHorse v1.1 image-to-video?',
        answer: 'No—the prompt is <strong>optional</strong> (max 5000 characters). You must upload <strong>exactly one image</strong> (JPEG/PNG/WebP, max 10MB). Duration is <strong>3–15s</strong> at 720p/1080p.'
      },
      {
        question: 'Can I choose the aspect ratio on HappyHorse v1.1 image-to-video?',
        answer: 'No—image-to-video <strong>keeps your input frame’s ratio</strong>. Aspect-ratio controls apply to <strong>text-to-video</strong> and <strong>reference-to-video</strong>.'
      }
    ],
    '/home/happy-horse/v1-1-reference-to-video': [
      {
        question: 'How many reference images can HappyHorse v1.1 use?',
        answer: 'Between <strong>1 and 9</strong>. Reference them in the prompt as <strong>[Image 1], [Image 2]…</strong> matching the upload order for consistent subjects.'
      },
      {
        question: 'What prompt format works best for v1.1 reference-to-video?',
        answer: 'Cite each asset by its bracketed index—e.g. “<strong>[Image 1]</strong> hands the package to <strong>[Image 2]</strong>”—aligned with the order of uploaded reference images.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'How is HappyHorse v1.1 priced on FuseAITools?',
      answer: 'All three modes bill <strong>per second</strong> at the resolution you select—the exact credits appear on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
    },
    {
      question: 'What is the difference between HappyHorse v1 and v1.1?',
      answer: 'v1.1 widens <strong>aspect ratios to nine</strong> and drops the <strong>seed</strong> knob; it covers <strong>text, image, and reference</strong> workflows, while v1 also includes <strong>video edit</strong>.'
    },
    {
      question: 'Do I need a local GPU for HappyHorse v1.1?',
      answer: 'No—HappyHorse v1.1 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
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
      title: '🐴 HappyHorse v1.1 on FuseAITools',
      html: 'HappyHorse v1.1 on <a href="/" class="seo-inline-link">FuseAITools</a> is the refined pass of the <strong>happyhorse-1-1</strong> family—<strong>native audio-video</strong> generation across text, image, and reference workflows. It widens the <strong>aspect-ratio grid to nine</strong> presets (adds 4:5, 5:4, 9:21, 21:9) while keeping <strong>3–15s</strong> clips at <strong>720p/1080p</strong>. Each run shows <strong>credits required</strong> before you generate; new users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ HappyHorse v1.1 Core Features',
      items: [
        {
          icon: '🔊',
          title: 'Native Audio-Video Sync',
          description: 'Generate <strong>video and audio together</strong>—dialogue, lip movement, and ambient sound in one workflow instead of separate dubbing.'
        },
        {
          icon: '🧭',
          title: 'Nine Aspect Ratios',
          description: 'Framing widens to <strong>4:5, 5:4, 9:21, and 21:9</strong> on top of the v1 grid—cover portrait, square, and ultra-wide in one model.'
        },
        {
          icon: '👥',
          title: 'Bracketed Reference Casting',
          description: 'Reference-to-video accepts <strong>1–9 images</strong> cited as <strong>[Image 1], [Image 2]…</strong> for consistent multi-subject scenes.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'Three v1.1 workflows in the browser—<strong>credits shown before generate</strong>; no local GPU install required.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Short drama & dialogue clips',
        'Portrait & vertical social video',
        'Ultra-wide cinematic banners',
        'Character-consistent promos',
        'Audio-synced brand ads'
      ]
    },
    {
      type: 'table',
      id: 'compare-v1-heading',
      title: '🆚 HappyHorse v1.1 vs v1 · Text to Video',
      ariaLabel: 'HappyHorse v1.1 vs v1 text-to-video parameters',
      headers: ['Parameter', 'HappyHorse v1.1', 'HappyHorse v1'],
      rows: [
        ['Model', '<code>happyhorse-1-1-text-to-video</code>', '<code>happyhorse-text-to-video</code>'],
        ['Prompt', 'Required, 1–5000 chars', 'Required, 1–5000 chars'],
        ['Aspect ratios', '<strong>Nine</strong>—adds 4:5, 5:4, 9:21, 21:9', '16:9, 9:16, 1:1, 4:3, 3:4'],
        ['Duration', '3–15s', '3–15s'],
        ['Resolution', '720p / 1080p', '720p / 1080p'],
        ['Seed', 'Vendor rejects seed', '<strong>Optional seed accepted</strong>'],
        ['Pricing', 'Per second × resolution', 'Per second × resolution']
      ],
      lead: 'Same required prompt, duration, resolution, and native audio—the differences are <strong>framing breadth</strong> and the <strong>seed</strong> knob.',
      paths: ['/home/happy-horse/v1-1-text-to-video']
    },
    {
      type: 'table',
      id: 'compare-v1-heading',
      title: '🆚 HappyHorse v1.1 vs v1 · Image to Video',
      ariaLabel: 'HappyHorse v1.1 vs v1 image-to-video parameters',
      headers: ['Parameter', 'HappyHorse v1.1', 'HappyHorse v1'],
      rows: [
        ['Model', '<code>happyhorse-1-1-image-to-video</code>', '<code>happyhorse-image-to-video</code>'],
        ['Input', 'Exactly 1 image URL', 'Exactly 1 image URL'],
        ['Prompt', 'Optional, max 5000 chars', 'Optional, max 5000 chars'],
        ['Aspect ratio', 'Follows input frame', 'Follows input frame'],
        ['Duration', '3–15s', '3–15s'],
        ['Resolution', '720p / 1080p', '720p / 1080p'],
        ['Seed', 'Vendor rejects seed', '<strong>Optional seed accepted</strong>'],
        ['Pricing', 'Per second × resolution', 'Per second × resolution']
      ],
      lead: 'Both animate one still with an optional prompt and follow the input frame’s ratio—the split is the <strong>seed</strong>.',
      paths: ['/home/happy-horse/v1-1-image-to-video']
    },
    {
      type: 'table',
      id: 'compare-v1-heading',
      title: '🆚 HappyHorse v1.1 vs v1 · Reference to Video',
      ariaLabel: 'HappyHorse v1.1 vs v1 reference-to-video parameters',
      headers: ['Parameter', 'HappyHorse v1.1', 'HappyHorse v1'],
      rows: [
        [
          'Model',
          '<code>happyhorse-1-1-reference-to-video</code>',
          '<code>happyhorse-reference-to-video</code>'
        ],
        ['Prompt', 'Required + 1–9 images', 'Required + 1–9 images'],
        ['Citation', '<strong>[Image 1], [Image 2]…</strong>', 'character1, character2…'],
        ['Request field', '<code>referenceImage</code>', '<code>imageUrls</code>'],
        ['Aspect ratios', '<strong>Nine</strong>—adds 4:5, 5:4, 9:21, 21:9', 'Same five as T2V'],
        ['Duration', '3–15s', '3–15s'],
        ['Resolution', '720p / 1080p', '720p / 1080p'],
        ['Seed', 'Vendor rejects seed', '<strong>Optional seed accepted</strong>'],
        ['Pricing', 'Per second × resolution', 'Per second × resolution']
      ],
      lead: 'Both take a prompt plus 1–9 images—the differences are <strong>citation syntax</strong>, the request <strong>field name</strong>, framing breadth, and the seed.',
      paths: ['/home/happy-horse/v1-1-reference-to-video']
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ HappyHorse v1.1 Technical Specs',
      ariaLabel: 'HappyHorse v1.1 workflow capabilities',
      headers: ['Workflow', 'Required input', 'Duration', 'Resolution / ratio', 'Key controls'],
      rows: [
        [
          '<strong>Text to Video</strong>',
          'Prompt (1–5000 chars)',
          '3–15s',
          '720p / 1080p; nine ratios 16:9 → 21:9',
          'No seed (vendor rejects it)'
        ],
        [
          '<strong>Image to Video</strong>',
          '1 image URL + optional prompt',
          '3–15s',
          '720p / 1080p; follows input frame ratio',
          'Prompt optional (max 5000); no aspect control'
        ],
        [
          '<strong>Reference to Video</strong>',
          'Prompt + 1–9 reference images',
          '3–15s',
          '720p / 1080p; nine ratios as T2V',
          'Cite images as [Image 1], [Image 2]… in prompt'
        ]
      ],
      lead: 'Parameters below match the FuseAITools HappyHorse v1.1 form and API (<code>happyhorse-1-1-*</code> models).',
      note: 'Image inputs: JPEG, JPG, PNG, WebP (max 10MB). Credits are shown on the Generate button before submission, billed per second at your chosen resolution.'
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (HappyHorse v1.1)'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'HappyHorse v1.1 — Three Video Workflows',
      lead: 'Choose the mode that matches your source material:',
      items: [
        {
          name: 'HappyHorse v1.1 Text to Video',
          title: 'Text to Video',
          description: 'Prompt-only clips with nine aspect ratios, 3–15s, and 720p/1080p—native audio included.',
          path: '/home/happy-horse/v1-1-text-to-video',
          icon: 'fas fa-font'
        },
        {
          name: 'HappyHorse v1.1 Image to Video',
          title: 'Image to Video',
          description: 'Animate one still with an optional motion prompt—3–15s at 720p/1080p, follows the input ratio.',
          path: '/home/happy-horse/v1-1-image-to-video',
          icon: 'fas fa-image'
        },
        {
          name: 'HappyHorse v1.1 Reference to Video',
          title: 'Reference to Video',
          description: '1–9 reference images cited as [Image 1], [Image 2]… for consistent multi-subject scenes.',
          path: '/home/happy-horse/v1-1-reference-to-video',
          icon: 'fas fa-images'
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
      html: '🐴 Same workflow, older engine—need the extras? Open the matching <a href="/home/happy-horse/v1-text-to-video" class="seo-inline-link">HappyHorse v1 Text to Video →</a> if you need an optional &lt;strong&gt;seed&lt;/strong&gt; for reproducible takes (five aspect ratios instead of nine).',
      paths: ['/home/happy-horse/v1-1-text-to-video']
    },
    {
      pricing: false,
      html: '🐴 Same workflow, older engine—need the extras? Open the matching <a href="/home/happy-horse/v1-image-to-video" class="seo-inline-link">HappyHorse v1 Image to Video →</a> for an optional &lt;strong&gt;seed&lt;/strong&gt;—the one-image flow is otherwise identical.',
      paths: ['/home/happy-horse/v1-1-image-to-video']
    },
    {
      pricing: false,
      html: '🐴 Same workflow, older engine—need the extras? Open the matching <a href="/home/happy-horse/v1-reference-to-video" class="seo-inline-link">HappyHorse v1 Reference to Video →</a> to cite subjects as character1, character2… with an optional &lt;strong&gt;seed&lt;/strong&gt;.',
      paths: ['/home/happy-horse/v1-1-reference-to-video']
    }
  ],
  watchPathIncludes: '/home/happy-horse/v1-1-'
}
