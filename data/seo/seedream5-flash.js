/**
 * Seedream5Flash SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：Seedream5FlashSeoContent.vue）
 */
export default {
  component: 'Seedream5FlashSeoContent',
  rootId: 'seedream-5-flash-section',
  rootClass: 'seedream-seo',
  meta: {
    name: 'Seedream 5 Flash on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Seedream 5 Flash text-to-image, image-to-image and layer decomposition on FuseAITools—5000-char prompts, 8 aspect ratios, 1K/1.5K/2K at one price, up to 10 reference images, editable PNG layers. Billed by resolution with credits.'
  },
  badge: '⚡ Seedream 5 Flash · ByteDance Speed Tier · Three Workflows',
  introByPath: {
    '/home/seedream/5-flash-text-to-image': {
      title: '⚡ Seedream 5 Flash Text to Image',
      lead: 'Generate from a <strong>4–5000 character</strong> prompt across <strong>8 aspect ratios</strong>, and pick <strong>1K, 1.5K or 2K</strong>—all three tiers cost the same credits, so there is no penalty for rendering big. Export PNG or JPEG.'
    },
    '/home/seedream/5-flash-image-to-image': {
      title: '🪄 Seedream 5 Flash Image to Image',
      lead: 'Upload <strong>1 to 10 images</strong> (JPEG, PNG or WebP, each ≤30MB) plus a prompt up to <strong>5000 characters</strong> to restyle, combine or correct them—fast, and billed at the same flat rate whatever resolution you choose.'
    },
    '/home/seedream/5-flash-layer-decomposition': {
      title: '🧩 Seedream 5 Flash Layer Decomposition',
      lead: 'Send <strong>one source image</strong> and get back a base plus <strong>separated PNG layers</strong>. The prompt is optional (4–5000 chars when used) and supports <strong>&lt;bbox&gt;x1 y1 x2 y2&lt;/bbox&gt;</strong> coordinates (0–1000) to point at exact elements.'
    }
  },
  definitionByPath: {
    '/home/seedream/5-flash-text-to-image': {
      title: 'What is Seedream 5 Flash Text to Image?',
      body: '<strong>Seedream 5 Flash Text to Image</strong> on FuseAITools (<code>seedream-5-flash-text-to-image</code>) is the speed-oriented ByteDance generator: required <strong>prompt</strong> (4–5000), <strong>aspectRatio</strong> (1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2, 21:9) and <strong>resolution</strong> (1K / 1.5K / 2K, priced identically), with optional <strong>outputFormat</strong> (png / jpeg).'
    },
    '/home/seedream/5-flash-image-to-image': {
      title: 'What is Seedream 5 Flash Image to Image?',
      body: '<strong>Seedream 5 Flash Image to Image</strong> on FuseAITools (<code>seedream-5-flash-image-to-image</code>) edits or composes <strong>1–10 uploaded images</strong> with a 4–5000 character prompt. Aspect ratio and resolution are required; all three resolution bands share one credit price.'
    },
    '/home/seedream/5-flash-layer-decomposition': {
      title: 'What is Seedream 5 Flash Layer Decomposition?',
      body: '<strong>Seedream 5 Flash Layer Decomposition</strong> on FuseAITools (<code>seedream-5-flash-layer-decomposition</code>) separates one image into reusable layers. Required: <strong>one imageUrl</strong> (PNG/JPEG ≤30MB, 262,144–36,000,000 total pixels) and a <strong>resolution</strong> of 1K / 1.5K / 2K. Layers are always PNG; <code>outputFormat</code> only affects the base image.'
    }
  },
  faqByPath: {
    '/home/seedream/5-flash-text-to-image': [
      {
        question: 'Is 2K more expensive than 1K on Seedream 5 Flash?',
        answer: 'No—<strong>1K, 1.5K and 2K share the same credit price</strong> on 5 Flash. Resolution is still required so the billing rule can be matched explicitly.'
      },
      {
        question: 'When should I use 5 Flash instead of 5 Pro?',
        answer: 'Use <strong>Flash</strong> for iteration volume, previews and A/B variants where turnaround matters; switch to <a href="/home/seedream/5-pro-text-to-image" class="seo-inline-link">5 Pro</a> for final assets that need maximum detail.'
      }
    ],
    '/home/seedream/5-flash-image-to-image': [
      {
        question: 'How many references can Seedream 5 Flash image-to-image take?',
        answer: '<strong>1 to 10</strong> images (JPEG, PNG, WebP), each up to <strong>30MB</strong>—the same capacity as 5 Pro and double the 5 Lite limit.'
      },
      {
        question: 'What aspect ratios are available?',
        answer: 'Eight: <strong>1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2 and 21:9</strong>. Aspect ratio is required on every Flash workflow.'
      }
    ],
    '/home/seedream/5-flash-layer-decomposition': [
      {
        question: 'Do I have to write a prompt for layer decomposition?',
        answer: 'No—the prompt is optional. Leave it empty and the model detects the main elements itself; add one (4–5000 chars) with <strong>&lt;bbox&gt;</strong> coordinates when you need a specific region extracted.'
      },
      {
        question: 'What format are the extracted layers?',
        answer: 'The layers are always <strong>PNG</strong> with transparency; the <code>outputFormat</code> selector only changes the base image (png or jpeg).'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Seedream 5 Flash?',
      answer: 'No—Seedream 5 Flash runs in the cloud on FuseAITools; credits are charged per successful generation.'
    },
    {
      question: 'How is Seedream 5 Flash priced on FuseAITools?',
      answer: 'Pricing is matched by <strong>resolution</strong> (1K / 1.5K / 2K) at a <strong>single flat credit cost</strong>—shown on the Generate button. New users get <strong>20 free credits</strong>—see <a href="/pricing" class="seo-pricing-link">pricing</a>.'
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
      title: '⚡ Seedream 5 Flash on FuseAITools',
      html: '<strong>Seedream 5 Flash</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> is the speed-first ByteDance image line: the same <strong>5000-character prompts</strong>, <strong>8 aspect ratios</strong> and <strong>10-image reference capacity</strong> as 5 Pro, but <strong>1K / 1.5K / 2K all bill at one price</strong>. Three workflows—text to image, image to image and <strong>layer decomposition</strong>—make it the default for high-volume drafting. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Seedream 5 Flash Core Features',
      items: [
        {
          icon: '⚡',
          title: 'Speed-First Tier',
          description: 'Built for volume—drafts, variants and batch edits with short turnaround.'
        },
        {
          icon: '💸',
          title: 'Flat Resolution Price',
          description: '<strong>1K / 1.5K / 2K cost the same credits</strong>, so render at full size.'
        },
        {
          icon: '✍️',
          title: '5000-Char Prompts',
          description: 'Required prompt of <strong>4 to 5000 characters</strong> on generation and editing.'
        },
        {
          icon: '🖼️',
          title: 'Up to 10 References',
          description: 'Composite or restyle <strong>1–10 images</strong>, each up to <strong>30MB</strong>.'
        },
        {
          icon: '🧩',
          title: 'Layer Decomposition',
          description: 'One source image in, <strong>editable PNG layers</strong> out—optional &lt;bbox&gt; targeting.'
        },
        {
          icon: '📐',
          title: '8 Aspect Ratios',
          description: 'Square, portrait, story and <strong>21:9</strong> cinematic, all on Flash.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Bulk concept drafts',
        'A/B creative variants',
        'Fast multi-reference edits',
        'Quick layer extraction',
        'Social assets at flat cost'
      ]
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Seedream 5 Flash Technical Specs',
      ariaLabel: 'Seedream 5 Flash workflow capabilities',
      headers: ['Workflow', 'Input', 'Resolution (billing)', 'Key controls'],
      rows: [
        [
          '<strong>5 Flash Text to Image</strong>',
          'Prompt 4–5000 chars',
          '<strong>1K / 1.5K / 2K — same price</strong>',
          '8 aspect ratios, PNG/JPEG, NSFW filter'
        ],
        [
          '<strong>5 Flash Image to Image</strong>',
          '1–10 image URLs + prompt 4–5000',
          '<strong>1K / 1.5K / 2K — same price</strong>',
          'Same ratios; each image ≤30MB (jpeg/png/webp)'
        ],
        [
          '<strong>5 Flash Layer Decomposition</strong>',
          'Exactly 1 source image + optional prompt 4–5000',
          '<strong>1K / 1.5K / 2K — same price</strong>',
          '&lt;bbox&gt; targeting, base PNG/JPEG, layers always PNG'
        ]
      ],
      lead: 'Parameters match the FuseAITools Seedream form and API (<code>seedream-5-flash-*</code> models).',
      note: 'Resolution is still a <strong>required</strong> field—FuseAITools does not silently default it—and it is the pricing dimension. Layer decomposition sources must be PNG/JPEG ≤30MB with <strong>262,144–36,000,000</strong> total pixels and aspect between <strong>1:16 and 16:1</strong>.'
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Seedream Generations Compared: 5 Lite · 5 Pro · 5 Flash',
      ariaLabel: 'Seedream 5 Flash compared across all model generations',
      headers: ['Dimension', '5 Lite', '5 Pro', '5 Flash'],
      rows: [
        [
          '<strong>Positioning</strong>',
          'Multimodal workhorse',
          'Premium quality',
          '<strong>Speed-first lane</strong>'
        ],
        ['<strong>Prompt limit</strong>', '2995 / 2996', '<strong>4–5000</strong>', '<strong>4–5000</strong>'],
        [
          '<strong>Resolution / billing</strong>',
          'Basic 2K / High 3K, by ratio + quality',
          '1K / 2K (layers: 1K / 1.5K / 2K)',
          '<strong>1K / 1.5K / 2K at one price</strong>'
        ],
        [
          '<strong>Reference images</strong>',
          '1–5, each ≤10MB',
          '<strong>1–10, each ≤30MB</strong>',
          '<strong>1–10, each ≤30MB</strong>'
        ],
        ['<strong>Layer decomposition</strong>', '—', '<strong>Yes</strong>', '<strong>Yes</strong>'],
        ['<strong>Aspect ratios</strong>', '8 (1:1 → 21:9)', '8 (1:1 → 21:9)', '8 (1:1 → 21:9)'],
        ['<strong>Output formats</strong>', 'PNG', 'PNG / JPEG', 'PNG / JPEG'],
        [
          '<strong>Best for</strong>',
          'Routine 2K/3K stills and frame prep',
          'Hero art and maximum detail',
          '<strong>Bulk drafts, A/B variants, fast layers</strong>'
        ]
      ],
      note: '5 Flash is the <strong>cost-predictable</strong> tier: bumping from 1K to 2K does not raise the credit price, so render large batches at full resolution and reserve 5 Pro for final hero assets.'
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Seedream 5 Flash)'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Seedream 5 Flash — Three Workflows',
      lead: 'Choose the mode that matches your task:',
      items: [
        {
          name: 'Seedream 5 Flash Text to Image',
          title: 'Flash Text to Image',
          description: 'Fast prompt-to-image—5000 chars, 8 ratios, 1K/1.5K/2K flat.',
          path: '/home/seedream/5-flash-text-to-image',
          icon: 'fas fa-bolt'
        },
        {
          name: 'Seedream 5 Flash Image to Image',
          title: 'Flash Image to Image',
          description: 'Remix up to 10 references at one resolution price.',
          path: '/home/seedream/5-flash-image-to-image',
          icon: 'fas fa-wand-magic-sparkles'
        },
        {
          name: 'Seedream 5 Flash Layer Decomposition',
          title: 'Flash Layer Decomposition',
          description: 'Quick layer splits into editable PNGs from one source image.',
          path: '/home/seedream/5-flash-layer-decomposition',
          icon: 'fas fa-clone'
        }
      ]
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for Seedream 5 Flash costs per resolution.'
    },
    {
      pricing: false,
      html: '👑 Need the highest-fidelity finish? The premium tier keeps identical controls— <a href="/home/seedream/5-pro-text-to-image" class="seo-inline-link">Seedream 5 Pro Text to Image</a>, <a href="/home/seedream/5-pro-image-to-image" class="seo-inline-link">5 Pro Image to Image</a> and <a href="/home/seedream/5-pro-layer-decomposition" class="seo-inline-link">5 Pro Layer Decomposition</a> bill by 1K / 2K resolution for final hero assets.'
    },
    {
      pricing: false,
      html: '🖼️ Want the classic 2K/3K workhorse instead? <a href="/home/seedream/5-lite-text-to-image" class="seo-inline-link">Seedream 5 Lite Text to Image</a> and <a href="/home/seedream/5-lite-image-to-image" class="seo-inline-link">5 Lite Image to Image</a> price by aspect ratio and quality tier.'
    },
    {
      pricing: false,
      html: '🎬 <strong>ByteDance video companion — Seedance</strong> Draft stills fast here, then animate them with <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link">Seedance v1 Lite Image to Video</a> or feed first/last frames into <a href="/home/seedance/v2" class="seo-inline-link">Seedance 2</a>.'
    }
  ],
  watchPathIncludes: '/home/seedream/5-flash-'
}
