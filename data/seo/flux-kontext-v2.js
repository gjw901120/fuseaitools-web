/**
 * FluxKontextV2 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：FluxKontextV2SeoContent.vue）
 */
export default {
  component: 'FluxKontextV2SeoContent',
  rootId: 'flux-kontext-v2-section',
  rootClass: 'flux-seo',
  meta: {
    name: 'Flux 2 Image on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Flux 2 and Flux 2 Pro text-to-image and image-to-image on FuseAITools—1K/2K resolution, eight aspect ratios plus auto, and up to eight reference images on I2I.'
  },
  badge: '🖼️ Flux 2 · v2 · T2I & I2I · Standard & Pro · 1K/2K',
  introByPath: {
    '/home/flux-kontext/flux-2-text-to-image': {
      title: '📝 Flux 2 Text to Image',
      lead: 'Prompt-only generation—<strong>3–5000 characters</strong>, aspect <strong>1:1 / 4:3 / 3:4 / 16:9 / 9:16 / 3:2 / 2:3 / auto</strong>, resolution <strong>1K or 2K</strong>. Credits vary by quality tier.'
    },
    '/home/flux-kontext/flux-2-image-to-image': {
      title: '🖼️ Flux 2 Image to Image',
      lead: 'Upload <strong>1–8</strong> reference images (max 10MB each) + prompt (3–5000 chars). Pick <strong>1K/2K</strong> and aspect ratio—including <strong>auto</strong>.'
    },
    '/home/flux-kontext/flux-2-pro-text-to-image': {
      title: '✨ Flux 2 Pro Text to Image',
      lead: 'Pro-tier text-to-image—same prompt and ratio controls as Flux 2 T2I with higher-fidelity output at <strong>1K/2K</strong>.'
    },
    '/home/flux-kontext/flux-2-pro-image-to-image': {
      title: '✨ Flux 2 Pro Image to Image',
      lead: 'Pro-tier multi-reference edit—<strong>1–8</strong> input images, prompt (3–5000), <strong>1K/2K</strong>, and eight aspect ratios + auto.'
    }
  },
  definitionByPath: {
    '/home/flux-kontext/flux-2-text-to-image': {
      title: 'What is Flux 2 Text to Image?',
      body: '<strong>Flux 2 Text to Image</strong> on FuseAITools (<code>flux-2-text-to-image</code>) generates images from a prompt. Required: prompt (3–5000 chars). Set resolution <strong>1K or 2K</strong> and aspect ratio. RULE pricing by quality tier.'
    },
    '/home/flux-kontext/flux-2-image-to-image': {
      title: 'What is Flux 2 Image to Image?',
      body: '<strong>Flux 2 Image to Image</strong> (<code>flux-2-image-to-image</code>) edits or restyles from <strong>1–8</strong> reference images plus a prompt (3–5000 chars). Resolution 1K/2K; aspect ratios include auto.'
    },
    '/home/flux-kontext/flux-2-pro-text-to-image': {
      title: 'What is Flux 2 Pro Text to Image?',
      body: '<strong>Flux 2 Pro Text to Image</strong> (<code>flux-2-pro-text-to-image</code>)—same inputs as Flux 2 T2I with Pro-tier fidelity. Prompt 3–5000 chars; 1K/2K; eight aspect ratios + auto.'
    },
    '/home/flux-kontext/flux-2-pro-image-to-image': {
      title: 'What is Flux 2 Pro Image to Image?',
      body: '<strong>Flux 2 Pro Image to Image</strong> (<code>flux-2-pro-image-to-image</code>)—Pro multi-reference pipeline. Required: 1–8 images + prompt; 1K/2K output.'
    }
  },
  faqByPath: {
    '/home/flux-kontext/flux-2-text-to-image': [
      {
        question: 'Which resolutions does Flux 2 text-to-image support?',
        answer: '<strong>1K</strong> and <strong>2K</strong>—credit cost follows the quality tier shown on Generate.'
      },
      {
        question: 'How long can my Flux 2 prompt be?',
        answer: 'Between <strong>3 and 5000 characters</strong>. Pick one of eight aspect ratios or <strong>auto</strong>.'
      }
    ],
    '/home/flux-kontext/flux-2-image-to-image': [
      {
        question: 'How many reference images can Flux 2 image-to-image use?',
        answer: 'Upload <strong>1–8</strong> images (JPEG/PNG/WebP, max 10MB each) plus a prompt (3–5000 chars).'
      },
      {
        question: 'Does Flux 2 I2I support auto aspect ratio?',
        answer: 'Yes—choose <strong>auto</strong> or fixed ratios (1:1 through 2:3). Resolution <strong>1K/2K</strong> affects credits.'
      }
    ],
    '/home/flux-kontext/flux-2-pro-text-to-image': [
      {
        question: 'When should I pick Flux 2 Pro text-to-image over Flux 2 T2I?',
        answer: 'Use <strong>Flux 2 T2I</strong> for fast 2K exploration; switch to <strong>Pro T2I</strong> when you need higher-fidelity finals on the same prompt and ratio controls.'
      },
      {
        question: 'Is Flux 2 Pro T2I priced differently from Flux 2 T2I?',
        answer: 'Both use RULE pricing by <strong>1K vs 2K</strong> quality—Pro tier may differ per credit table. Credits show on Generate before submission.'
      }
    ],
    '/home/flux-kontext/flux-2-pro-image-to-image': [
      {
        question: 'How is Flux 2 Pro image-to-image different from Flux 2 I2I?',
        answer: 'Same inputs—<strong>1–8</strong> images + prompt—but Pro targets sharper detail and cleaner edges for client-facing edits.'
      },
      {
        question: 'Can I mix many references on Flux 2 Pro I2I?',
        answer: 'Yes—up to <strong>8</strong> reference images at 1K/2K. Prompt must stay within 3–5000 characters.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Flux 2?',
      answer: 'No—Flux 2 runs in the cloud on FuseAITools. Pick 1K or 2K; credits appear on the Generate button.'
    },
    {
      question: 'How is Flux 2 priced on FuseAITools?',
      answer: 'RULE credits by <strong>quality (1K/2K)</strong> per workflow modelKey. See <a href="/pricing" class="seo-pricing-link">pricing</a>. New users get <strong>20 free credits</strong> on sign-up.'
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
      title: '🖼️ Flux 2 on FuseAITools',
      html: '<strong>Flux 2 (v2)</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> is Black Forest Labs\' dedicated 1K/2K image line—four workflows split into <strong>Flux 2</strong> (fast drafts) and <strong>Flux 2 Pro</strong> (higher fidelity). Image-to-image modes accept <strong>1–8</strong> reference images; prompts are <strong>3–5000 characters</strong>. Credits scale by resolution (1K vs 2K). New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Flux 2 Core Features',
      items: [
        {
          icon: '📐',
          title: '1K / 2K Output',
          description: 'Pick resolution per run—credits follow the <strong>quality</strong> tier on Generate.'
        },
        {
          icon: '🖼️',
          title: 'Multi-Reference I2I',
          description: 'Up to <strong>8</strong> input images on I2I workflows for style and layout consistency.'
        },
        {
          icon: '✨',
          title: 'Flux 2 Pro Tier',
          description: 'Pro T2I/I2I for higher-fidelity finals on the same prompt and ratio controls.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'Four v2 workflows—RULE pricing shown before generate.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: ['2K social creatives', 'Multi-ref style lock', 'Pro marketing stills', 'Concept-to-final pipeline']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Flux 2 T2I vs Flux 2 Pro T2I',
      ariaLabel: '📊 Flux 2 T2I vs Flux 2 Pro T2I',
      headers: ['Dimension', 'Text to Image', 'Pro upgrade'],
      rows: [
        ['<strong>Input</strong>', 'Prompt (3–5000 chars)', 'Same pipeline, higher-fidelity model'],
        [
          '<strong>modelKey</strong>',
          '<code>flux-2-text-to-image</code>',
          '<code>flux-2-pro-text-to-image</code>'
        ],
        [
          '<strong>Resolution</strong>',
          {
            html: '<strong>1K</strong> or <strong>2K</strong>',
            colspan: 2
          }
        ],
        [
          '<strong>Aspect ratios</strong>',
          {
            html: '1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, auto',
            colspan: 2
          }
        ],
        ['<strong>Best for</strong>', 'Fast 2K concept drafts', 'Client-facing finals and finer detail']
      ],
      paths: ['/home/flux-kontext/flux-2-text-to-image']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Flux 2 I2I vs Flux 2 Pro I2I',
      ariaLabel: '📊 Flux 2 I2I vs Flux 2 Pro I2I',
      headers: ['Dimension', 'Image to Image', 'Pro upgrade'],
      rows: [
        ['<strong>Input</strong>', '1–8 images + prompt', 'Same pipeline, higher-fidelity model'],
        [
          '<strong>modelKey</strong>',
          '<code>flux-2-image-to-image</code>',
          '<code>flux-2-pro-image-to-image</code>'
        ],
        [
          '<strong>Resolution</strong>',
          {
            html: '<strong>1K</strong> or <strong>2K</strong>',
            colspan: 2
          }
        ],
        [
          '<strong>Aspect ratios</strong>',
          {
            html: '1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, auto',
            colspan: 2
          }
        ],
        [
          '<strong>Best for</strong>',
          'Multi-reference style and layout lock',
          'Client-facing finals and finer detail'
        ]
      ],
      paths: ['/home/flux-kontext/flux-2-image-to-image']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Flux 2 T2I vs Flux 2 Pro T2I',
      ariaLabel: '📊 Flux 2 T2I vs Flux 2 Pro T2I',
      headers: ['Dimension', 'Text to Image', 'Pro (current)'],
      rows: [
        ['<strong>Input</strong>', 'Prompt (3–5000 chars)', 'Same pipeline, higher-fidelity model'],
        [
          '<strong>modelKey</strong>',
          '<code>flux-2-pro-text-to-image</code>',
          '<code>flux-2-pro-text-to-image</code>'
        ],
        [
          '<strong>Resolution</strong>',
          {
            html: '<strong>1K</strong> or <strong>2K</strong>',
            colspan: 2
          }
        ],
        [
          '<strong>Aspect ratios</strong>',
          {
            html: '1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, auto',
            colspan: 2
          }
        ],
        ['<strong>Best for</strong>', 'Fast 2K concept drafts', 'Client-facing finals and finer detail']
      ],
      paths: ['/home/flux-kontext/flux-2-pro-text-to-image']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Flux 2 I2I vs Flux 2 Pro I2I',
      ariaLabel: '📊 Flux 2 I2I vs Flux 2 Pro I2I',
      headers: ['Dimension', 'Image to Image', 'Pro (current)'],
      rows: [
        ['<strong>Input</strong>', '1–8 images + prompt', 'Same pipeline, higher-fidelity model'],
        [
          '<strong>modelKey</strong>',
          '<code>flux-2-pro-image-to-image</code>',
          '<code>flux-2-pro-image-to-image</code>'
        ],
        [
          '<strong>Resolution</strong>',
          {
            html: '<strong>1K</strong> or <strong>2K</strong>',
            colspan: 2
          }
        ],
        [
          '<strong>Aspect ratios</strong>',
          {
            html: '1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, auto',
            colspan: 2
          }
        ],
        [
          '<strong>Best for</strong>',
          'Multi-reference style and layout lock',
          'Client-facing finals and finer detail'
        ]
      ],
      paths: ['/home/flux-kontext/flux-2-pro-image-to-image']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Flux 2 I2I vs Flux 2 Pro I2I',
      ariaLabel: '📊 Flux 2 I2I vs Flux 2 Pro I2I',
      headers: ['Dimension', 'Image to Image', 'Pro upgrade'],
      rows: [
        ['<strong>Input</strong>', '1–8 images + prompt', 'Same pipeline, higher-fidelity model'],
        [
          '<strong>modelKey</strong>',
          '<code>flux-2-text-to-image</code>',
          '<code>flux-2-pro-image-to-image</code>'
        ],
        [
          '<strong>Resolution</strong>',
          {
            html: '<strong>1K</strong> or <strong>2K</strong>',
            colspan: 2
          }
        ],
        [
          '<strong>Aspect ratios</strong>',
          {
            html: '1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, auto',
            colspan: 2
          }
        ],
        [
          '<strong>Best for</strong>',
          'Multi-reference style and layout lock',
          'Client-facing finals and finer detail'
        ]
      ],
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Flux 2)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Flux 2 Technical Specs',
      ariaLabel: 'Flux 2 workflow capabilities',
      headers: ['Workflow', 'modelKey', 'Required', 'Key controls'],
      rows: [
        [
          '<strong>Flux 2 T2I</strong>',
          '<code>flux-2-text-to-image</code>',
          'Prompt (3–5000)',
          '1K/2K; 8 ratios + auto'
        ],
        [
          '<strong>Flux 2 I2I</strong>',
          '<code>flux-2-image-to-image</code>',
          '1–8 images + prompt',
          '1K/2K; 8 ratios + auto'
        ],
        [
          '<strong>Flux 2 Pro T2I</strong>',
          '<code>flux-2-pro-text-to-image</code>',
          'Prompt (3–5000)',
          '1K/2K; higher fidelity'
        ],
        [
          '<strong>Flux 2 Pro I2I</strong>',
          '<code>flux-2-pro-image-to-image</code>',
          '1–8 images + prompt',
          '1K/2K; higher fidelity'
        ]
      ],
      note: 'Reference uploads: JPEG, PNG, WebP (max 10MB each). Credits depend on <strong>1K vs 2K</strong>—shown on Generate before submission.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Flux 2 — Four Workflows',
      items: [
        {
          name: 'Flux 2 Text to Image',
          title: 'Flux 2 T2I',
          description: 'Prompt-only 1K/2K generation—eight ratios + auto.',
          path: '/home/flux-kontext/flux-2-text-to-image',
          icon: 'fas fa-font'
        },
        {
          name: 'Flux 2 Image to Image',
          title: 'Flux 2 I2I',
          description: '1–8 reference images + prompt, 1K/2K.',
          path: '/home/flux-kontext/flux-2-image-to-image',
          icon: 'fas fa-image'
        },
        {
          name: 'Flux 2 Pro Text to Image',
          title: 'Flux 2 Pro T2I',
          description: 'Higher-fidelity T2I at 1K/2K.',
          path: '/home/flux-kontext/flux-2-pro-text-to-image',
          icon: 'fas fa-pen-ruler'
        },
        {
          name: 'Flux 2 Pro Image to Image',
          title: 'Flux 2 Pro I2I',
          description: 'Pro multi-reference edit—1–8 images.',
          path: '/home/flux-kontext/flux-2-pro-image-to-image',
          icon: 'fas fa-layer-group'
        }
      ]
    },
    {
      type: 'table',
      id: 'version-compare-heading',
      title: '📊 Flux 2 vs Flux 2 Pro',
      ariaLabel: 'Flux 2 vs Flux 2 Pro',
      headers: ['Dimension', 'Flux 2', 'Flux 2 Pro'],
      rows: [
        ['<strong>Positioning</strong>', 'Fast 1K/2K drafts', 'Higher-fidelity finals'],
        ['<strong>Workflows</strong>', 'T2I, I2I', 'Pro T2I, Pro I2I'],
        [
          '<strong>Resolution</strong>',
          {
            html: '<strong>1K / 2K</strong> (credit tier by quality)',
            colspan: 2
          }
        ],
        [
          '<strong>Multi-reference I2I</strong>',
          {
            html: '<strong>1–8</strong> input images',
            colspan: 2
          }
        ],
        [
          '<strong>Best for</strong>',
          'Exploration and social-ready 2K',
          'Marketing and print-adjacent quality'
        ]
      ],
      lead: '<strong>Flux 2</strong> standard workflows optimize for fast 1K/2K iteration; <strong>Flux 2 Pro</strong> targets higher-fidelity output on the same T2I/I2I pipeline.'
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for subscription discounts and credit top-ups.'
    },
    {
      pricing: false,
      html: '✨ Need higher-fidelity Flux 2 output? <a href="/home/flux-kontext/flux-2-pro-text-to-image" class="seo-inline-link">Try Flux 2 Pro Text to Image →</a> for Pro-tier detail on the same text-to-image pipeline.',
      paths: ['/home/flux-kontext/flux-2-text-to-image']
    },
    {
      pricing: false,
      html: '✨ Need higher-fidelity Flux 2 output? <a href="/home/flux-kontext/flux-2-pro-image-to-image" class="seo-inline-link">Try Flux 2 Pro Image to Image →</a> for Pro-tier detail on the same image-to-image pipeline.',
      paths: ['/home/flux-kontext/flux-2-image-to-image']
    },
    {
      pricing: false,
      html: '⚡ Want 4K and batch output? Try <a href="/home/flux-kontext/flux-3-klein-text-to-image" class="seo-inline-link">Flux 3 Klein Text to Image →</a> for 1K/2K/4K with 1–4 images per run on the same Flux family.',
      paths: ['/home/flux-kontext/flux-2-text-to-image', '/home/flux-kontext/flux-2-pro-text-to-image']
    },
    {
      pricing: false,
      html: '⚡ Want 4K and batch output? Try <a href="/home/flux-kontext/flux-3-klein-edit-image" class="seo-inline-link">Flux 3 Klein Edit Image →</a> for 1K/2K/4K with 1–4 images per run on the same Flux family.',
      paths: ['/home/flux-kontext/flux-2-image-to-image', '/home/flux-kontext/flux-2-pro-image-to-image']
    },
    {
      pricing: false,
      html: '🎬 Turn Flux 2 stills into video with <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link">Seedance Image to Video →</a> or browse multimodal <a href="/home/seedance/v2" class="seo-inline-link">Seedance 2</a> for reference-driven clips.'
    }
  ]
}
