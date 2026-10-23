/**
 * Seedream5Lite SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：Seedream5LiteSeoContent.vue）
 */
export default {
  component: 'Seedream5LiteSeoContent',
  rootId: 'seedream-5-lite-section',
  rootClass: 'seedream-seo',
  meta: {
    name: 'Seedream 5 Lite Image on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Seedream 5 Lite text-to-image and image-to-image on FuseAITools—2K/3K output, nine aspect ratios, prompts up to 2996 characters.'
  },
  badge: '🖼️ Seedream 5 Lite · ByteDance Image · Two Workflows',
  introByPath: {
    '/home/seedream/5-lite-text-to-image': {
      title: '📝 Seedream 5 Lite Text to Image',
      lead: 'Describe your scene in text—Seedream 5 Lite renders a single image at <strong>Basic (2K)</strong> or <strong>High (3K)</strong>. Choose from <strong>nine aspect ratios</strong> (1:1 through 21:9) with prompts up to <strong>2995 characters</strong>.'
    },
    '/home/seedream/5-lite-image-to-image': {
      title: '🖼️ Seedream 5 Lite Image to Image',
      lead: 'Upload <strong>1–5 images</strong> (JPEG/PNG/WebP, max 10MB each) and guide the result with a prompt up to <strong>2996 characters</strong>—ideal for lighting changes, style transfer, and preparing frames for ByteDance video workflows.'
    }
  },
  definitionByPath: {
    '/home/seedream/5-lite-text-to-image': {
      title: 'What is Seedream 5 Lite Text to Image?',
      body: '<strong>Seedream 5 Lite Text to Image</strong> on FuseAITools (<code>seedream-5-lite-text-to-image</code>) generates one image from a text prompt. Required: <strong>prompt</strong> (max 2995 chars), <strong>aspect ratio</strong>, and <strong>quality</strong> (Basic 2K or High 3K). Ratios include <strong>1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2, and 21:9</strong>.'
    },
    '/home/seedream/5-lite-image-to-image': {
      title: 'What is Seedream 5 Lite Image to Image?',
      body: '<strong>Seedream 5 Lite Image to Image</strong> on FuseAITools (<code>seedream-5-lite-image-to-image</code>) edits or restyles uploaded images via prompt. Required: <strong>1–5 image URLs</strong> + prompt (max 2996 chars), aspect ratio, and quality (Basic 2K / High 3K). Use it for lighting edits, sticker styles, or first/last frame prep before <strong>Seedance</strong> video generation.'
    }
  },
  faqByPath: {
    '/home/seedream/5-lite-text-to-image': [
      {
        question: 'What quality tiers does Seedream 5 Lite text-to-image offer?',
        answer: 'Choose <strong>Basic (2K)</strong> for faster drafts or <strong>High (3K)</strong> for sharper final assets. Credits vary by quality and aspect ratio—check the Generate button before submitting.'
      },
      {
        question: 'Which aspect ratios does Seedream 5 Lite support?',
        answer: 'Nine options: <strong>1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2, and 21:9</strong>—covering social squares, vertical stories, and ultra-wide layouts.'
      }
    ],
    '/home/seedream/5-lite-image-to-image': [
      {
        question: 'How many images can I upload for Seedream 5 Lite image-to-image?',
        answer: 'Between <strong>1 and 5</strong> images per request (JPEG, PNG, or WebP; max <strong>10MB</strong> each). Write a clear instruction—e.g. “golden hour lighting” or “sticker style outline”.'
      },
      {
        question: 'Can Seedream images feed into Seedance video?',
        answer: 'Yes—many creators generate or edit stills in Seedream, then animate them in <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link">Seedance v1 Lite I2V</a> or upload first/last frames to <a href="/home/seedance/v2" class="seo-inline-link">Seedance 2</a>. Both are ByteDance models on FuseAITools.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Seedream 5 Lite?',
      answer: 'No—Seedream 5 Lite runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
    },
    {
      question: 'How is Seedream 5 Lite priced on FuseAITools?',
      answer: 'Credits depend on <strong>aspect ratio</strong> and <strong>quality</strong> (Basic 2K vs High 3K)—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
      title: '🖼️ Seedream 5 Lite on FuseAITools',
      html: 'Seedream 5 Lite on <a href="/" class="seo-inline-link">FuseAITools</a> is ByteDance\'s <strong>multimodal image</strong> line—generate from text or edit existing images with natural-language instructions. Pick <strong>Basic (2K)</strong> or <strong>High (3K)</strong> quality and aspect ratios from square through <strong>21:9</strong>. Credits appear on the Generate button before you submit; new users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Seedream 5 Lite Core Features',
      items: [
        {
          icon: '📐',
          title: 'Nine Aspect Ratios',
          description: 'From <strong>1:1</strong> social squares to <strong>21:9</strong> cinematic—pick the format before you generate.'
        },
        {
          icon: '✨',
          title: '2K & 3K Output',
          description: '<strong>Basic (2K)</strong> for quick iteration; <strong>High (3K)</strong> when you need extra detail for print or hero assets.'
        },
        {
          icon: '🖌️',
          title: 'Text & Image Editing',
          description: 'Generate from scratch or upload <strong>1–5 images</strong> and edit with natural-language instructions.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'ByteDance Seedream in the browser—<strong>credits shown before generate</strong>; pairs with <strong>Seedance</strong> video workflows.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Social & story covers',
        'Sticker & icon design',
        'Lighting & style edits',
        'First/last frame prep',
        'Marketing stills at 2K/3K'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Seedream 5 Lite T2I vs I2I',
      ariaLabel: 'Seedream 5 Lite text-to-image vs image-to-image',
      headers: ['Dimension', 'Text to Image', 'Image to Image'],
      rows: [
        [
          'Input',
          '<strong>Prompt only</strong> (max 2995 chars)',
          '<strong>1–5 images</strong> + prompt (max 2996 chars)'
        ],
        ['Output', 'Single image at chosen ratio', 'Edited or restyled image at chosen ratio'],
        ['Quality', '<strong>Basic 2K</strong> or <strong>High 3K</strong>', 'Same'],
        ['Aspect ratios', '1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2, 21:9', 'Same'],
        ['Best for', 'New concepts from scratch', 'Lighting edits, style transfer, frame prep for video']
      ]
    },
    {
      type: 'table',
      id: 'generations-heading',
      title: '📊 Seedream Generations Compared: 5 Lite · 5 Pro · 5 Flash',
      ariaLabel: 'Seedream 5 Lite compared across all model generations',
      headers: ['Dimension', '5 Lite', '5 Pro', '5 Flash'],
      rows: [
        [
          '<strong>Positioning</strong>',
          '<strong>Multimodal workhorse</strong>',
          'Premium quality',
          'Speed-first lane'
        ],
        ['<strong>Prompt limit</strong>', '<strong>2995 / 2996</strong>', '4–5000', '4–5000'],
        [
          '<strong>Resolution / billing</strong>',
          '<strong>Basic 2K / High 3K</strong>, by ratio + quality',
          '1K / 2K (layers: 1K / 1.5K / 2K)',
          '1K / 1.5K / 2K at one price'
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
          'Routine 2K/3K stills, frame prep for video',
          'Hero art, dense references, editable layers',
          'Bulk drafts at flat resolution pricing'
        ]
      ],
      note: '5 Lite is the only tier billed by <strong>aspect ratio + quality</strong> rather than resolution— pick it for 3K output, or move to 5 Pro / 5 Flash when you need 5000-char prompts, 30MB references or layer splitting.'
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Seedream 5 Lite)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Seedream 5 Lite Technical Specs',
      ariaLabel: 'Seedream 5 Lite workflow capabilities',
      headers: ['Workflow', 'Required input', 'Prompt limit', 'Quality', 'Aspect ratios'],
      rows: [
        [
          '<strong>Text to Image</strong>',
          'Prompt',
          'Max 2995 chars',
          'Basic (2K) / High (3K)',
          '1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2, 21:9'
        ],
        [
          '<strong>Image to Image</strong>',
          '1–5 image URLs + prompt',
          'Max 2996 chars',
          'Basic (2K) / High (3K)',
          'Same as T2I'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Seedream form and API (<code>seedream-5-lite-*</code> models).',
      note: 'Image uploads: JPEG, PNG, WebP (max 10MB each). Credits depend on aspect ratio and quality tier—shown on Generate before submission.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Seedream 5 Lite — Two Image Workflows',
      lead: 'Start from text or edit existing images:',
      items: [
        {
          name: 'Seedream 5 Lite Text to Image',
          title: 'Text to Image',
          description: 'Prompt-only generation—2K/3K at nine aspect ratios from 1:1 to 21:9.',
          path: '/home/seedream/5-lite-text-to-image',
          icon: 'fas fa-font'
        },
        {
          name: 'Seedream 5 Lite Image to Image',
          title: 'Image to Image',
          description: 'Upload 1–5 images and instruct edits—lighting, style transfer, or detail polish.',
          path: '/home/seedream/5-lite-image-to-image',
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
      html: '🎬 <strong>ByteDance video companion — Seedance</strong> Create stills here, then animate them with <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link" >Seedance v1 Lite Image to Video</a> or use Seedream I2I to prepare first/last frames for <a href="/home/seedance/v2" class="seo-inline-link" >Seedance 2</a> multimodal clips. Browse the full <a href="/home/seedance" class="seo-inline-link" >Seedance suite →</a>'
    },
    {
      pricing: false,
      html: '👑 Want ByteDance’s premium image tier? Upgrade to <a href="/home/seedream/5-pro-text-to-image" class="seo-inline-link" >Seedream 5 Pro Text to Image</a> or <a href="/home/seedream/5-pro-image-to-image" class="seo-inline-link" >5 Pro Image to Image</a> —5000-character prompts, up to 10 references at 30MB each, and 1K/2K resolution billing.'
    },
    {
      pricing: false,
      html: '✂️ Need editable layers? Both <a href="/home/seedream/5-pro-layer-decomposition" class="seo-inline-link" >5 Pro Layer Decomposition</a> and <a href="/home/seedream/5-flash-layer-decomposition" class="seo-inline-link" >5 Flash Layer Decomposition</a> split one artwork into PNG layers.'
    },
    {
      pricing: false,
      html: '⚡ Optimising for volume? The <a href="/home/seedream/5-flash-text-to-image" class="seo-inline-link" >Seedream 5 Flash</a> line charges the same credits for 1K, 1.5K and 2K.'
    }
  ]
}
