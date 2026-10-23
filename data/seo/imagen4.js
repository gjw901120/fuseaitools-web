/**
 * Imagen4 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：Imagen4SeoContent.vue）
 */
export default {
  component: 'Imagen4SeoContent',
  rootId: 'imagen4-section',
  rootClass: 'imagen4-seo',
  meta: {
    name: 'Imagen 4 Image on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Google Imagen 4 text-to-image on FuseAITools—Generate, Fast, and Ultra tiers with prompts up to 5000 characters and five aspect ratios.'
  },
  badge: '🖼️ Google Imagen 4 · Three Tiers · Text to Image',
  introByPath: {
    '/home/imagen4/imagen4-generate': {
      title: '🖼️ Imagen 4 Generate',
      lead: 'Write a prompt up to <strong>5000 characters</strong>—Imagen 4 Generate returns one balanced-quality image. Pick from <strong>five aspect ratios</strong> (1:1, 16:9, 9:16, 3:4, 4:3), add an optional negative prompt, and lock composition with an optional <strong>seed string</strong> (≤500 chars).'
    },
    '/home/imagen4/imagen4-fast': {
      title: '⚡ Imagen 4 Fast',
      lead: 'Optimized for speed and low-cost exploration—Imagen 4 Fast returns a single image per request from your prompt. Default aspect is <strong>16:9</strong>; use an optional <strong>integer seed</strong> for reproducible results during A/B testing.'
    },
    '/home/imagen4/imagen4-ultra': {
      title: '✨ Imagen 4 Ultra',
      lead: 'Google’s flagship Imagen 4 tier on FuseAITools—one high-fidelity image per run with prompts up to <strong>5000 characters</strong>. Default aspect <strong>1:1</strong>; optional negative prompt and <strong>seed string</strong> (≤500 chars) for polished hero assets.'
    }
  },
  definitionByPath: {
    '/home/imagen4/imagen4-generate': {
      title: 'What is Imagen 4 Generate?',
      body: '<strong>Imagen 4 Generate</strong> on FuseAITools (<code>imagen4-generate</code>) turns a text prompt into one image. Required: <strong>prompt</strong> (max 5000 chars). Optional: <strong>negative prompt</strong> (max 5000 chars), <strong>aspect ratio</strong> (1:1, 16:9, 9:16, 3:4, 4:3; default 1:1), and <strong>seed string</strong> (≤500 chars). Best for everyday marketing stills and social visuals.'
    },
    '/home/imagen4/imagen4-fast': {
      title: 'What is Imagen 4 Fast?',
      body: '<strong>Imagen 4 Fast</strong> on FuseAITools (<code>imagen4-fast</code>) is the speed-first tier for rapid single-image iteration. Required: <strong>prompt</strong> (max 5000 chars). Optional: negative prompt, aspect ratio (default <strong>16:9</strong>), and <strong>integer seed</strong>. Ideal for fast drafts and high-volume testing.'
    },
    '/home/imagen4/imagen4-ultra': {
      title: 'What is Imagen 4 Ultra?',
      body: '<strong>Imagen 4 Ultra</strong> on FuseAITools (<code>imagen4-ultra</code>) prioritizes maximum visual fidelity—one image per request. Required: <strong>prompt</strong> (max 5000 chars). Optional: negative prompt, aspect ratio (default <strong>1:1</strong>), and <strong>seed string</strong> (≤500 chars). Use it for final assets, print-ready hero visuals, and client delivery.'
    }
  },
  faqByPath: {
    '/home/imagen4/imagen4-generate': [
      {
        question: 'How does Imagen 4 Generate differ from Imagen 4 Fast?',
        answer: 'Generate outputs <strong>one balanced-quality image</strong> per request with a <strong>string seed</strong> (≤500 chars). Fast is the <strong>speed-first</strong> tier—one image per run with an <strong>integer seed</strong> and defaults to <strong>16:9</strong>—better for rapid, lower-cost iteration.'
      },
      {
        question: 'Which aspect ratios does Imagen 4 Generate support?',
        answer: 'Five presets: <strong>1:1, 16:9, 9:16, 3:4, and 4:3</strong>. Default is <strong>1:1</strong> when you open Generate—switch before submitting to match your layout.'
      }
    ],
    '/home/imagen4/imagen4-fast': [
      {
        question: 'What makes Imagen 4 Fast different from Generate?',
        answer: 'Fast is the <strong>speed-first</strong> tier—one image per request at a lower credit cost, defaulting to <strong>16:9</strong> with an <strong>integer seed</strong>. Use it for rapid drafts and high-volume iteration; choose Generate for balanced quality or Ultra for flagship fidelity.'
      },
      {
        question: 'Why does Imagen 4 Fast use an integer seed instead of a string?',
        answer: 'Fast accepts an optional <strong>integer seed</strong> for reproducible runs. Generate and Ultra use an optional <strong>seed string</strong> (≤500 characters)—pick the tier that matches your workflow.'
      }
    ],
    '/home/imagen4/imagen4-ultra': [
      {
        question: 'When should I choose Imagen 4 Ultra over Generate or Fast?',
        answer: 'Choose Ultra when you need <strong>flagship fidelity</strong> for final delivery—one high-quality image per request. Use Fast for <strong>quick single-image drafts</strong> at lower credit cost or Generate for everyday balanced stills.'
      },
      {
        question: 'Does Imagen 4 Ultra support the same aspect ratios as Generate?',
        answer: 'Yes—all three tiers share <strong>1:1, 16:9, 9:16, 3:4, and 4:3</strong>. Ultra defaults to <strong>1:1</strong> when you open the page; change it before generating widescreen or vertical assets.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Imagen 4 on FuseAITools?',
      answer: 'No—Imagen 4 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
    },
    {
      question: 'How is Imagen 4 priced on FuseAITools?',
      answer: 'Credits depend on tier—shown on the Generate button before you submit. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
      title: '🖼️ Imagen 4 on FuseAITools',
      html: 'Imagen 4 on <a href="/" class="seo-inline-link">FuseAITools</a> is Google\'s <strong>text-to-image</strong> suite—pick <strong>Generate</strong> for balanced quality, <strong>Fast</strong> for raw speed, or <strong>Ultra</strong> for flagship fidelity. All tiers share optional <strong>negative prompts</strong>, <strong>five aspect ratios</strong>, and <strong>seed</strong> controls. Credits appear on the Generate button before you submit; new users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Imagen 4 Core Features',
      items: [
        {
          icon: '📝',
          title: 'Long Prompts',
          description: 'Prompts and negative prompts up to <strong>5000 characters</strong>—enough detail for style, composition, and exclusions.'
        },
        {
          icon: '📐',
          title: 'Five Aspect Ratios',
          description: '<strong>1:1, 16:9, 9:16, 3:4, 4:3</strong> across all tiers—square posts, widescreen banners, and vertical stories.'
        },
        {
          icon: '⚡',
          title: 'Speed on Fast',
          description: 'Imagen 4 Fast is the speed-first, lower-cost tier—iterate rapidly on single-image drafts without waiting on flagship renders.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'Google Imagen 4 in the browser—<strong>credits shown before generate</strong>; pairs with <strong>Veo 3.1</strong> video workflows.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Marketing & ad stills',
        'Social square & vertical',
        'Rapid iteration',
        'Hero / print assets',
        'Negative-prompt cleanup'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Imagen 4 Generate vs Fast vs Ultra',
      ariaLabel: 'Imagen 4 Generate vs Fast vs Ultra',
      headers: ['Dimension', 'Generate', 'Fast', 'Ultra'],
      rows: [
        [
          'Positioning',
          '<strong>Balanced</strong> quality and speed',
          '<strong>Speed-first</strong> exploration',
          '<strong>Flagship</strong> fidelity'
        ],
        [
          'Output count',
          '<strong>1</strong> image per request',
          '<strong>1</strong> image per request',
          '<strong>1</strong> image per request'
        ],
        [
          'Prompt limit',
          'Max <strong>5000</strong> chars',
          'Max <strong>5000</strong> chars',
          'Max <strong>5000</strong> chars'
        ],
        [
          'Negative prompt',
          'Optional (max 5000 chars)',
          'Optional (max 5000 chars)',
          'Optional (max 5000 chars)'
        ],
        [
          'Aspect ratios',
          '1:1, 16:9, 9:16, 3:4, 4:3',
          'Same (default <strong>16:9</strong>)',
          'Same (default <strong>1:1</strong>)'
        ],
        [
          'Seed type',
          'Optional <strong>string</strong> (≤500 chars)',
          'Optional <strong>integer</strong>',
          'Optional <strong>string</strong> (≤500 chars)'
        ],
        [
          'Best for',
          'Everyday marketing and social stills',
          'Rapid iteration and A/B tests',
          'Hero assets and client delivery'
        ]
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Imagen 4)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Imagen 4 Technical Specs',
      ariaLabel: 'Imagen 4 tier capabilities',
      headers: ['Tier', 'Required input', 'Output', 'Aspect ratios', 'Key controls'],
      rows: [
        [
          '<strong>Generate</strong>',
          'Prompt (max 5000 chars)',
          '1 image',
          '1:1, 16:9, 9:16, 3:4, 4:3',
          'Negative prompt, seed string (≤500 chars)'
        ],
        [
          '<strong>Fast</strong>',
          'Prompt (max 5000 chars)',
          '1 image',
          'Same five ratios (default 16:9)',
          'Negative prompt, integer seed'
        ],
        [
          '<strong>Ultra</strong>',
          'Prompt (max 5000 chars)',
          '1 image',
          'Same five ratios (default 1:1)',
          'Negative prompt, seed string (≤500 chars)'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Imagen 4 form and API (<code>imagen4-generate</code>, <code>imagen4-fast</code>, <code>imagen4-ultra</code>).',
      note: 'All tiers are text-to-image only—no image upload on this page. Credits depend on tier; the exact amount appears on Generate before submission.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Imagen 4 — Three Text-to-Image Tiers',
      lead: 'Switch tabs to match speed or final quality:',
      items: [
        {
          name: 'Imagen 4 Generate',
          title: 'Generate',
          description: 'Balanced text-to-image—one image per run with string seed and five aspect ratios.',
          path: '/home/imagen4/imagen4-generate',
          icon: 'fas fa-image'
        },
        {
          name: 'Imagen 4 Fast',
          title: 'Fast',
          description: 'Speed tier—single fast image per request with integer seed; default aspect 16:9.',
          path: '/home/imagen4/imagen4-fast',
          icon: 'fas fa-bolt'
        },
        {
          name: 'Imagen 4 Ultra',
          title: 'Ultra',
          description: 'Flagship fidelity—single high-quality image with string seed; default aspect 1:1.',
          path: '/home/imagen4/imagen4-ultra',
          icon: 'fas fa-star'
        }
      ]
    },
    {
      type: 'table',
      id: 'tier-compare-heading',
      title: '📊 Imagen 4 Generate vs Fast vs Ultra',
      ariaLabel: '📊 Imagen 4 Generate vs Fast vs Ultra',
      headers: ['Dimension', 'Generate', 'Fast', 'Ultra'],
      rows: [
        [
          'Output per request',
          '<strong>1</strong> image',
          '<strong>1</strong> image',
          '<strong>1</strong> image'
        ],
        ['Speed focus', 'Balanced', '<strong>Fastest</strong>', 'Quality-first'],
        ['Seed type', 'String (≤500 chars)', 'Integer', 'String (≤500 chars)'],
        ['Default aspect', '1:1', '16:9', '1:1'],
        ['Best for', 'Everyday stills', 'Rapid drafts', 'Hero / client assets']
      ],
      paths: ['/home/imagen4/imagen4-generate']
    },
    {
      type: 'table',
      id: 'tier-compare-heading',
      title: '📊 Imagen 4 Fast vs Ultra',
      ariaLabel: '📊 Imagen 4 Fast vs Ultra',
      headers: ['Dimension', 'Fast', 'Ultra'],
      rows: [
        ['Output per request', '<strong>1</strong> image', '<strong>1</strong> image'],
        ['Speed focus', '<strong>Fastest</strong>', 'Quality-first'],
        ['Seed type', 'Integer', 'String (≤500 chars)'],
        ['Best for', 'Rapid drafts', 'Hero / client assets']
      ],
      paths: ['/home/imagen4/imagen4-fast']
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for subscription discounts and credit top-ups.'
    },
    {
      pricing: false,
      html: '⚡ <strong>Need faster, lower-cost iteration?</strong> Try <a href="/home/imagen4/imagen4-fast" class="seo-inline-link" >Imagen 4 Fast →</a> for speed-first single-image generation with integer seed control.',
      paths: ['/home/imagen4/imagen4-generate']
    },
    {
      pricing: false,
      html: '✨ <strong>Need flagship fidelity for final delivery?</strong> Try <a href="/home/imagen4/imagen4-ultra" class="seo-inline-link" >Imagen 4 Ultra →</a> for Google\'s highest-quality Imagen 4 tier on FuseAITools.',
      paths: ['/home/imagen4/imagen4-generate', '/home/imagen4/imagen4-fast']
    },
    {
      pricing: false,
      html: '🎬 <strong>Google video companion — Veo 3.1</strong> Turn Imagen 4 stills into clips with <a href="/home/veo3/first-and-last-to-video" class="seo-inline-link" >Veo 3.1 First and Last Frames</a> or browse the full <a href="/home/veo3" class="seo-inline-link" >Veo 3.1 suite →</a>',
      paths: ['/home/imagen4/imagen4-ultra']
    }
  ]
}
