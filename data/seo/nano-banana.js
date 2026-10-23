/**
 * NanoBanana SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：NanoBananaSeoContent.vue）
 */
export default {
  component: 'NanoBananaSeoContent',
  rootId: 'nano-banana-section',
  rootClass: 'nano-banana-seo',
  meta: {
    name: 'Nano Banana Image on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Nano Banana text-to-image, image-to-image, Pro 4K, and Nano Banana 2 on FuseAITools—Google Gemini Flash Image with credit-based pricing.'
  },
  badge: '🍌 Nano Banana · Google Gemini Flash Image · v1 (3 workflows) + v2',
  introByPath: {
    '/home/nano-banana/generate': {
      title: '📝 Nano Banana Text to Image',
      lead: 'Describe your scene in text—Nano Banana (Gemini Flash Image) returns a single image in seconds. Pick from <strong>eleven aspect ratios</strong> including <strong>auto</strong>, and export as <strong>PNG or JPEG</strong> with prompts up to <strong>5000 characters</strong>.'
    },
    '/home/nano-banana/edit': {
      title: '🖼️ Nano Banana Image to Image',
      lead: 'Upload <strong>1–10 images</strong> (JPEG/PNG/WebP, max 10MB each) and guide the result with a prompt up to <strong>5000 characters</strong>—ideal for style transfer, detail polish, and batch look unification.'
    },
    '/home/nano-banana/pro-generate': {
      title: '⭐ Nano Banana Pro Generate',
      lead: 'Provide <strong>1–10 reference images</strong> plus a prompt and choose <strong>1K, 2K, or 4K</strong> resolution. Eleven aspect ratios from square through <strong>21:9</strong> and <strong>auto</strong>—built for production-ready assets on FuseAITools.'
    },
    '/home/nano-banana/nano-banana-2': {
      title: '🧊 Nano Banana 2',
      lead: 'Write prompts up to <strong>20,000 characters</strong> and optionally attach <strong>0–14 images</strong>. Pick from <strong>fifteen aspect ratios</strong> and <strong>1K/2K/4K</strong> resolution with <strong>JPG or PNG</strong> output.'
    },
    '/home/nano-banana/nano-banana-2-lite': {
      title: '🪶 Nano Banana 2 Lite',
      lead: '<strong>Text-to-image and image-to-image in one mode</strong>—write prompts up to <strong>20,000 characters</strong> and optionally attach <strong>0–10 reference images</strong>. Choose from <strong>fifteen aspect ratios</strong> (including <strong>auto</strong>) with a <strong>single flat credit price</strong>—the most affordable entry in the Nano Banana 2 family.'
    },
    '/home/nano-banana/nano-banana-2-1': {
      title: '💎 Nano Banana 2.1',
      lead: 'High-resolution generation with <strong>1K, 2K, or 4K</strong> output. Prompts up to <strong>20,000 characters</strong>, optional <strong>0–10 reference images</strong>, and <strong>fifteen aspect ratios</strong> (including <strong>auto</strong>). Credits follow the resolution tier shown on Generate.'
    }
  },
  definitionByPath: {
    '/home/nano-banana/generate': {
      title: 'What is Nano Banana Text to Image?',
      body: '<strong>Nano Banana Text to Image</strong> on FuseAITools (<code>nano-banana</code>) turns a text prompt into one image via Google\'s <strong>Gemini Flash Image</strong> model. Required: <strong>prompt</strong> (max 5000 chars). Choose <strong>image size</strong> from eleven ratios (1:1, 9:16, 16:9, 3:4, 4:3, 3:2, 2:3, 5:4, 4:5, 21:9, and <strong>auto</strong>) and <strong>PNG or JPEG</strong> output.'
    },
    '/home/nano-banana/edit': {
      title: 'What is Nano Banana Image to Image?',
      body: '<strong>Nano Banana Image to Image</strong> on FuseAITools (<code>nano-banana-edit</code>) edits or restyles uploaded images via prompt. Required: <strong>1–10 image URLs</strong> + prompt (max 5000 chars), image size ratio, and PNG/JPEG output. Use it for style transfer, detail polish, or unified looks across a batch.'
    },
    '/home/nano-banana/pro-generate': {
      title: 'What is Nano Banana Pro Generate?',
      body: '<strong>Nano Banana Pro</strong> on FuseAITools (<code>nano-banana-pro</code>) generates from <strong>1–10 reference images</strong> plus a prompt (max 5000 chars). Set <strong>resolution</strong> to <strong>1K, 2K, or 4K</strong> and <strong>aspect ratio</strong> from square through <strong>21:9</strong> or <strong>auto</strong>. Credit cost follows the resolution tier shown on Generate.'
    },
    '/home/nano-banana/nano-banana-2': {
      title: 'What is Nano Banana 2?',
      body: '<strong>Nano Banana 2</strong> on FuseAITools (<code>nano-banana-2</code>) accepts prompts up to <strong>20,000 characters</strong> with <strong>optional 0–14 image inputs</strong>. Choose <strong>1K, 2K, or 4K</strong> resolution, fifteen aspect ratios (including <strong>auto</strong>), and <strong>JPG or PNG</strong> output. Ideal when you need long creative briefs or multi-reference generation without Pro\'s required image set.'
    },
    '/home/nano-banana/nano-banana-2-lite': {
      title: 'What is Nano Banana 2 Lite?',
      body: '<strong>Nano Banana 2 Lite</strong> on FuseAITools (<code>nano-banana-2-lite</code>) unifies <strong>text-to-image and image-to-image</strong> in one mode. Required: <strong>prompt</strong> (max 20,000 chars) and <strong>aspect ratio</strong> (fifteen options including <strong>auto</strong>); optionally attach <strong>0–10 reference images</strong>. It uses a <strong>single flat credit price</strong>—no resolution tier—making it the simplest, most cost-predictable Nano Banana 2 workflow.'
    },
    '/home/nano-banana/nano-banana-2-1': {
      title: 'What is Nano Banana 2.1?',
      body: '<strong>Nano Banana 2.1</strong> on FuseAITools (<code>nano-banana-2-1</code>) is the high-resolution member of the Nano Banana 2 family. Prompts up to <strong>20,000 characters</strong> with <strong>optional 0–10 image inputs</strong>, fifteen aspect ratios (including <strong>auto</strong>), and mandatory <strong>1K / 2K / 4K resolution</strong> as the billing dimension. Export as <strong>JPG or PNG</strong>; credits scale with the resolution tier shown on Generate.'
    }
  },
  faqByPath: {
    '/home/nano-banana/generate': [
      {
        question: 'Which aspect ratios does Nano Banana text-to-image support?',
        answer: 'Eleven options: <strong>1:1, 9:16, 16:9, 3:4, 4:3, 3:2, 2:3, 5:4, 4:5, 21:9, and auto</strong>—covering social squares, vertical stories, widescreen, and model-chosen framing.'
      },
      {
        question: 'How does Nano Banana v1 text-to-image differ from Nano Banana 2?',
        answer: '<strong>v1 Text to Image</strong> needs only a prompt (max <strong>5000</strong> chars) with <strong>imageSize</strong> ratios. <strong>Nano Banana 2 (v2)</strong> supports prompts up to <strong>20,000</strong> chars and <strong>optional 0–14</strong> images with <strong>1K/2K/4K</strong> resolution. Use v1 T2I for fast drafts; v2 for long creative briefs.'
      }
    ],
    '/home/nano-banana/edit': [
      {
        question: 'How many images can I upload for Nano Banana image-to-image?',
        answer: 'Between <strong>1 and 10</strong> images per request (JPEG, PNG, or WebP; max <strong>10MB</strong> each). Write a clear instruction—e.g. “watercolor style” or “brighten and sharpen details”.'
      },
      {
        question: 'When should I use Image to Image instead of Text to Image?',
        answer: 'Use <strong>Image to Image</strong> when you have existing photos or art to restyle, polish, or unify. <strong>Text to Image</strong> starts from scratch with a prompt only—faster for new concepts and social covers.'
      }
    ],
    '/home/nano-banana/pro-generate': [
      {
        question: 'Does Nano Banana Pro require reference images?',
        answer: 'Yes—<strong>1 to 10 images</strong> are required per request (JPEG/PNG/WebP; max 30MB each), plus a prompt up to <strong>5000 characters</strong>. Credits vary by <strong>1K, 2K, or 4K</strong> resolution.'
      },
      {
        question: 'What resolution should I pick for Nano Banana Pro?',
        answer: 'Choose <strong>1K</strong> for faster iteration, <strong>2K</strong> for balanced detail, or <strong>4K</strong> for hero assets and print-ready output. The exact credit cost appears on the Generate button before you submit.'
      }
    ],
    '/home/nano-banana/nano-banana-2': [
      {
        question: 'How is Nano Banana 2 (v2) different from Nano Banana v1?',
        answer: '<strong>v2</strong> accepts <strong>optional 0–14 images</strong> and prompts up to <strong>20,000 characters</strong> in one workflow. <strong>v1</strong> splits into three modes—T2I (prompt only), I2I (1–10 required images), and Pro (1–10 required references at 1K/2K/4K) with a <strong>5000</strong>-char cap.'
      },
      {
        question: 'Does Nano Banana 2 support 4K output?',
        answer: 'Yes—choose <strong>1K, 2K, or 4K</strong> resolution and export as <strong>JPG or PNG</strong>. Fifteen aspect ratios include <strong>auto</strong> for flexible framing.'
      }
    ],
    '/home/nano-banana/nano-banana-2-lite': [
      {
        question: 'What makes Nano Banana 2 Lite different from Nano Banana 2?',
        answer: '<strong>2 Lite</strong> (<code>nano-banana-2-lite</code>) unifies text-to-image and image-to-image with <strong>optional 0–10 images</strong> and prompts up to <strong>20,000</strong> chars at a <strong>single flat credit price</strong>—no resolution option. <strong>Nano Banana 2</strong> adds <strong>1K/2K/4K</strong> resolution tiers and accepts up to <strong>0–14</strong> images. Pick 2 Lite for predictable, budget-friendly output.'
      },
      {
        question: 'Can Nano Banana 2 Lite do image-to-image?',
        answer: 'Yes—attach <strong>0–10 reference images</strong> to guide the result, or omit them for pure text-to-image. Both live in one workflow; you only always provide a prompt and an <strong>aspect ratio</strong>.'
      }
    ],
    '/home/nano-banana/nano-banana-2-1': [
      {
        question: 'How is Nano Banana 2.1 priced?',
        answer: 'Credits scale with the <strong>resolution</strong> tier you select—<strong>1K, 2K, or 4K</strong>. The exact cost appears on the Generate button before you submit. Prompts reach <strong>20,000</strong> chars with <strong>optional 0–10 reference images</strong>.'
      },
      {
        question: 'When should I choose Nano Banana 2.1 over 2 Lite?',
        answer: 'Use <strong>2.1</strong> when you need <strong>high-resolution 1K/2K/4K</strong> output and are fine paying per resolution tier. Choose <strong>2 Lite</strong> for a single fixed price and simpler, cost-predictable generation. Both share the same twenty-thousand-character prompt cap and fifteen aspect ratios.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Nano Banana?',
      answer: 'No—Nano Banana runs in the cloud on FuseAITools via Google\'s Gemini Flash Image. Use any modern browser; credits are charged per successful generation.'
    },
    {
      question: 'How is Nano Banana priced on FuseAITools?',
      answer: 'Base <strong>Text to Image</strong> and <strong>Image to Image</strong> use flat per-image credits. <strong>Pro</strong> and <strong>Nano Banana 2</strong> vary by <strong>resolution</strong> tier—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
      title: '🍌 Nano Banana on FuseAITools',
      html: 'Nano Banana on <a href="/" class="seo-inline-link">FuseAITools</a> is Google\'s <strong>Gemini Flash Image</strong> suite in two generations: <strong>v1</strong> covers <strong>Text to Image</strong>, <strong>Image to Image</strong>, and <strong>Pro Generate</strong> (5000-char prompts; Pro adds mandatory 1–10 references and 1K/2K/4K). <strong>v2 — Nano Banana 2</strong> raises the prompt cap to <strong>20,000 characters</strong> with <strong>optional 0–14</strong> image inputs. Credits appear on the Generate button before you submit; new users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Nano Banana Core Features',
      items: [
        {
          icon: '⚡',
          title: 'Gemini Flash Speed',
          description: 'Google\'s <strong>Gemini Flash Image</strong> model—fast text-to-image and image-to-image for rapid iteration and social-ready output.'
        },
        {
          icon: '🔤',
          title: 'Accurate Text Rendering',
          description: 'Strong in-image text and character consistency—useful for covers, thumbnails, and branded marketing stills.'
        },
        {
          icon: '🖼️',
          title: 'v1 + v2 Line-up',
          description: '<strong>v1</strong>: T2I, I2I, and Pro (1K/2K/4K). <strong>v2 — Nano Banana 2</strong>: 20k prompts with optional 0–14 images.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'No local GPU—<strong>credits shown before generate</strong>; pairs with <strong>Seedream</strong> and <strong>Seedance</strong> for ByteDance image-to-video pipelines.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Social & story covers',
        'Rapid concept drafts',
        'Style transfer & edits',
        '4K production assets',
        'Long-prompt creative briefs'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Nano Banana v1 vs v2',
      ariaLabel: 'Nano Banana v1 three workflows vs v2',
      headers: ['Dimension', 'Nano Banana v1', 'Nano Banana 2 (v2)'],
      rows: [
        [
          'Workflows',
          '<strong>3 modes</strong>: <a href="/home/nano-banana/generate" class="seo-inline-link">Text to Image</a>, <a href="/home/nano-banana/edit" class="seo-inline-link">Image to Image</a>, <a href="/home/nano-banana/pro-generate" class="seo-inline-link">Pro Generate</a>',
          '<strong>1 unified mode</strong> — prompt-first with optional references'
        ],
        [
          'Prompt limit',
          'Max <strong>5000</strong> chars (all v1 modes)',
          'Max <strong>20,000</strong> chars'
        ],
        [
          'Image input',
          'T2I: <strong>none</strong>; I2I: <strong>1–10 required</strong>; Pro: <strong>1–10 required</strong>',
          '<strong>0–14 optional</strong> — text-only or multi-reference'
        ],
        [
          'Resolution',
          'T2I/I2I: <strong>aspect ratios</strong> (11 options); Pro: <strong>1K/2K/4K</strong>',
          '<strong>1K / 2K / 4K</strong> + fifteen aspect ratios'
        ],
        [
          'Pricing',
          'T2I/I2I: flat per image; Pro: <strong>RULE</strong> by resolution',
          '<strong>RULE</strong> by resolution tier'
        ],
        ['Output format', 'PNG / JPEG', 'JPG / PNG'],
        [
          'Best for',
          'Fast drafts, mandatory-reference 4K (Pro), dedicated I2I edits',
          'Long creative briefs, optional multi-reference, single flexible entry point'
        ]
      ],
      lead: '<strong>v1</strong> splits into three focused workflows; <strong>v2 (Nano Banana 2)</strong> unifies long-prompt and optional multi-image generation in one mode.'
    },
    {
      type: 'table',
      id: 'v1-detail-heading',
      title: '📋 Nano Banana v1 — Three Workflows',
      ariaLabel: 'Nano Banana v1 text-to-image vs image-to-image vs pro',
      headers: ['Dimension', 'Text to Image', 'Image to Image', 'Pro Generate'],
      rows: [
        [
          'Input',
          '<strong>Prompt only</strong>',
          '<strong>1–10 images</strong> + prompt',
          '<strong>1–10 images</strong> + prompt'
        ],
        [
          'Size / resolution',
          '<strong>11 aspect ratios</strong> (imageSize)',
          'Same as T2I',
          '<strong>1K / 2K / 4K</strong> + 11 aspect ratios'
        ],
        [
          'Best for',
          'Fast drafts &amp; social covers',
          'Style transfer &amp; edits',
          '4K production assets with required references'
        ]
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Nano Banana)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Nano Banana Technical Specs',
      ariaLabel: 'Nano Banana workflow capabilities',
      headers: ['Workflow', 'Required input', 'Prompt limit', 'Size / resolution', 'Output'],
      rows: [
        [
          '<strong>Text to Image</strong>',
          'Prompt',
          'Max 5000 chars',
          '1:1, 9:16, 16:9, 3:4, 4:3, 3:2, 2:3, 5:4, 4:5, 21:9, auto',
          'PNG / JPEG'
        ],
        [
          '<strong>Image to Image</strong>',
          '1–10 image URLs + prompt',
          'Max 5000 chars',
          'Same ratios as T2I',
          'PNG / JPEG'
        ],
        [
          '<strong>Pro Generate</strong>',
          '1–10 image URLs + prompt',
          'Max 5000 chars',
          '1K / 2K / 4K; 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9, auto',
          'PNG / JPEG'
        ],
        [
          '<strong>Nano Banana 2</strong>',
          'Prompt (+ 0–14 optional images)',
          'Max 20,000 chars',
          '1K / 2K / 4K; auto, 1:1, 1:4, 16:9, 1:8, 21:9, 2:3, 3:2, 3:4, 4:1, 4:3, 4:5, 5:4, 8:1, 9:16',
          'JPG / PNG'
        ],
        [
          '<strong>Nano Banana 2 Lite</strong>',
          'Prompt (+ 0–10 optional images)',
          'Max 20,000 chars',
          'Fifteen aspect ratios (incl. auto); single flat price, no resolution tier',
          'Single output'
        ],
        [
          '<strong>Nano Banana 2.1</strong>',
          'Prompt (+ 0–10 optional images)',
          'Max 20,000 chars',
          '1K / 2K / 4K (billing tier); fifteen aspect ratios (incl. auto)',
          'JPG / PNG'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Nano Banana form and API (<code>nano-banana*</code> models).',
      note: 'Edit uploads: JPEG, PNG, WebP (max 10MB each). Pro and NB2 reference uploads: JPEG, PNG, WebP (max 30MB each). Pro and Nano Banana 2 credit costs follow the <strong>resolution</strong> tier shown on Generate.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Nano Banana v1 — Three Workflows',
      lead: 'Three specialized v1 modes—pick the input style that fits your task:',
      items: [
        {
          name: 'Nano Banana v1 · Text to Image',
          title: 'Text to Image',
          description: 'Prompt-only generation—eleven aspect ratios including auto, PNG or JPEG output.',
          path: '/home/nano-banana/generate',
          icon: 'fas fa-font'
        },
        {
          name: 'Nano Banana v1 · Image to Image',
          title: 'Image to Image',
          description: 'Upload 1–10 images and instruct edits—style transfer, detail polish, or look unification.',
          path: '/home/nano-banana/edit',
          icon: 'fas fa-edit'
        },
        {
          name: 'Nano Banana v1 · Pro Generate',
          title: 'Pro Generate',
          description: '1–10 reference images plus prompt—1K, 2K, or 4K resolution for production assets.',
          path: '/home/nano-banana/pro-generate',
          icon: 'fas fa-star'
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
      html: '🍌 Prefer dedicated v1 modes? Start with <a href="/home/nano-banana/generate" class="seo-inline-link" >Text to Image</a> for prompt-only drafts, <a href="/home/nano-banana/edit" class="seo-inline-link" >Image to Image</a> for mandatory-reference edits, or <a href="/home/nano-banana/pro-generate" class="seo-inline-link" >Pro Generate</a> when you need required 1–10 references at 1K/2K/4K.',
      paths: ['/home/nano-banana/nano-banana-2', '/home/nano-banana/nano-banana-2-lite', '/home/nano-banana/nano-banana-2-1']
    },
    {
      pricing: false,
      html: '🧊 Need <strong>20k-character</strong> prompts or <strong>optional 0–14</strong> image inputs? <a href="/home/nano-banana/nano-banana-2" class="seo-inline-link" >Nano Banana 2 (v2) →</a> unifies long briefs and flexible multi-reference generation in one workflow.'
    },
    {
      pricing: false,
      html: '🖼️ <strong>ByteDance image companion — Seedream</strong> Create or refine stills in <a href="/home/seedream/5-lite-text-to-image" class="seo-inline-link" >Seedream 5 Lite Text to Image</a> or <a href="/home/seedream/5-lite-image-to-image" class="seo-inline-link" >Seedream 5 Lite Image to Image</a> —then animate with <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link" >Seedance v1 Lite I2V</a>. Browse the full <a href="/home/seedream" class="seo-inline-link" >Seedream suite →</a>'
    }
  ]
}
