/**
 * Flux3Klein SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：Flux3KleinSeoContent.vue）
 */
export default {
  component: 'Flux3KleinSeoContent',
  rootId: 'flux-3-klein-section',
  rootClass: 'flux-seo',
  meta: {
    name: 'Flux 3 Klein Image on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Flux 3 Klein text-to-image and image editing on FuseAITools—1K/2K/4K resolution, nine aspect ratios plus auto on edit, and 1–4 images per run. Credits scale by resolution and image count.'
  },
  badge: '⚡ Flux 3 Klein · T2I & Edit · 1K/2K/4K · 1–4 images',
  introByPath: {
    '/home/flux-kontext/flux-3-klein-text-to-image': {
      title: '⚡ Flux 3 Klein Text to Image',
      lead: 'Prompt-only generation—<strong>1–5000 characters</strong>, aspect <strong>1:1 / 4:3 / 3:4 / 3:2 / 2:3 / 16:9 / 9:16 / 21:9 / 9:21</strong>, resolution <strong>1K, 2K or 4K</strong>, and <strong>1–4 images</strong> per run. Credits = per-image price at your resolution × image count.'
    },
    '/home/flux-kontext/flux-3-klein-edit-image': {
      title: '🖼️ Flux 3 Klein Edit Image',
      lead: 'Upload <strong>1–10</strong> reference images (max 30MB each) + prompt (1–5000 chars). Pick <strong>1K/2K/4K</strong>, an aspect ratio—including <strong>auto</strong> that follows the first image—and <strong>1–4 outputs</strong>. Credits scale with resolution and image count.'
    }
  },
  definitionByPath: {
    '/home/flux-kontext/flux-3-klein-text-to-image': {
      title: 'What is Flux 3 Klein Text to Image?',
      body: '<strong>Flux 3 Klein Text to Image</strong> on FuseAITools (<code>flux-3-klein-text-to-image</code>) generates images from a prompt (1–5000 chars). Set resolution <strong>1K/2K/4K</strong>, an aspect ratio (nine options), and <strong>1–4 images</strong>. RULE pricing by resolution tier, multiplied by image count.'
    },
    '/home/flux-kontext/flux-3-klein-edit-image': {
      title: 'What is Flux 3 Klein Edit Image?',
      body: '<strong>Flux 3 Klein Edit Image</strong> (<code>flux-3-klein-edit-image</code>) edits or restyles from <strong>1–10</strong> reference images plus a prompt (1–5000 chars). Resolution 1K/2K/4K; nine aspect ratios plus <strong>auto</strong>; 1–4 outputs. Credits scale by resolution and image count.'
    }
  },
  faqByPath: {
    '/home/flux-kontext/flux-3-klein-text-to-image': [
      {
        question: 'What resolutions does Flux 3 Klein text-to-image support?',
        answer: '<strong>1K</strong>, <strong>2K</strong>, and <strong>4K</strong>—credit cost follows the resolution tier shown on Generate, multiplied by the number of images (1–4).'
      },
      {
        question: 'How many images can I generate per run?',
        answer: 'Choose <strong>1–4</strong> images per run. Total credits = single-image price at your resolution × image count.'
      }
    ],
    '/home/flux-kontext/flux-3-klein-edit-image': [
      {
        question: 'How many reference images can Flux 3 Klein edit accept?',
        answer: 'Upload <strong>1–10</strong> images (JPG/PNG/WebP, max 30MB each) plus a prompt (1–5000 chars).'
      },
      {
        question: 'Does Flux 3 Klein edit support auto aspect ratio?',
        answer: 'Yes—choose <strong>auto</strong> to follow the first input image, or pick one of nine fixed ratios. Resolution <strong>1K/2K/4K</strong> and image count (1–4) both affect credits.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Flux 3 Klein?',
      answer: 'No—Flux 3 Klein runs in the cloud on FuseAITools. Pick resolution and image count; credits appear on the Generate button.'
    },
    {
      question: 'How is Flux 3 Klein priced on FuseAITools?',
      answer: 'RULE credits by <strong>resolution (1K/2K/4K)</strong> per image, then multiplied by the <strong>1–4</strong> images you request. See <a href="/pricing" class="seo-pricing-link">pricing</a>. New users get <strong>20 free credits</strong> on sign-up.'
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
      title: '⚡ Flux 3 Klein on FuseAITools',
      html: '<strong>Flux 3 Klein</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> is Black Forest Labs\' high-resolution image line—two workflows: <strong>Text to Image</strong> for prompt-only generation and <strong>Edit Image</strong> for multi-reference editing with <strong>1–10</strong> input images. Prompts run up to <strong>5000 characters</strong>, output reaches <strong>4K</strong>, and each run produces <strong>1–4 images</strong>. Credits scale by <strong>resolution (1K/2K/4K)</strong> and <strong>image count</strong>. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Flux 3 Klein Core Features',
      items: [
        {
          icon: '📐',
          title: 'Up to 4K Output',
          description: 'Pick <strong>1K / 2K / 4K</strong> per run—credits follow the resolution tier on Generate.'
        },
        {
          icon: '🗂️',
          title: 'Batch 1–4 Images',
          description: 'Request <strong>1–4</strong> images at once—total credits scale by image count.'
        },
        {
          icon: '🖼️',
          title: 'Multi-Reference Edit',
          description: 'Edit from up to <strong>10</strong> input images with an optional <strong>auto</strong> aspect ratio.'
        },
        {
          icon: '🎲',
          title: 'Seed & Enhancement',
          description: 'Set a fixed <strong>seed</strong> for reproducibility and toggle <strong>prompt enhancement</strong>.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: ['4K print finals', 'Batch concept sets', 'Multi-ref restyle', 'Seeded reproducible edits']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Flux 3 Klein T2I vs Edit Image',
      ariaLabel: '📊 Flux 3 Klein T2I vs Edit Image',
      headers: ['Dimension', 'Text to Image', 'Edit Image'],
      rows: [
        ['<strong>Input</strong>', 'Prompt (1–5000 chars)', '1–10 images + prompt'],
        [
          '<strong>modelKey</strong>',
          '<code>flux-3-klein-text-to-image</code>',
          '<code>flux-3-klein-edit-image</code>'
        ],
        [
          '<strong>Resolution</strong>',
          {
            html: '<strong>1K</strong>, <strong>2K</strong>, or <strong>4K</strong>',
            colspan: 2
          }
        ],
        [
          '<strong>Images per run</strong>',
          {
            html: '<strong>1–4</strong>—credits multiply by count',
            colspan: 2
          }
        ],
        ['<strong>Aspect ratios</strong>', '9 fixed ratios', '9 fixed ratios + auto'],
        ['<strong>Best for</strong>', '4K prompt-only finals', 'Reference-driven editing']
      ],
      paths: ['/home/flux-kontext/flux-3-klein-text-to-image']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Flux 3 Klein T2I vs Edit Image',
      ariaLabel: '📊 Flux 3 Klein T2I vs Edit Image',
      headers: ['Dimension', 'Edit Image', 'Text to Image'],
      rows: [
        ['<strong>Input</strong>', '1–10 images + prompt', 'Prompt (1–5000 chars)'],
        [
          '<strong>modelKey</strong>',
          '<code>flux-3-klein-edit-image</code>',
          '<code>flux-3-klein-text-to-image</code>'
        ],
        [
          '<strong>Resolution</strong>',
          {
            html: '<strong>1K</strong>, <strong>2K</strong>, or <strong>4K</strong>',
            colspan: 2
          }
        ],
        [
          '<strong>Images per run</strong>',
          {
            html: '<strong>1–4</strong>—credits multiply by count',
            colspan: 2
          }
        ],
        ['<strong>Aspect ratios</strong>', '9 fixed ratios + auto', '9 fixed ratios'],
        ['<strong>Best for</strong>', 'Multi-reference edits and restyles', 'Prompt-only concept drafts']
      ],
      paths: ['/home/flux-kontext/flux-3-klein-edit-image']
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Flux 3 Klein)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Flux 3 Klein Technical Specs',
      ariaLabel: 'Flux 3 Klein workflow capabilities',
      headers: ['Workflow', 'modelKey', 'Required', 'Key controls'],
      rows: [
        [
          '<strong>Flux 3 Klein T2I</strong>',
          '<code>flux-3-klein-text-to-image</code>',
          'Prompt (1–5000)',
          '1K/2K/4K; 9 ratios; 1–4 images'
        ],
        [
          '<strong>Flux 3 Klein Edit</strong>',
          '<code>flux-3-klein-edit-image</code>',
          '1–10 images + prompt',
          '1K/2K/4K; 9 ratios + auto; 1–4 images'
        ]
      ],
      note: 'Both workflows support <strong>output format</strong> (PNG, JPEG, WebP), an optional <strong>seed</strong> (0–2147483647) for reproducibility, and <strong>prompt enhancement</strong> (on by default). Edit-mode uploads accept JPG/PNG/WebP up to <strong>30MB</strong> each. Credits depend on <strong>resolution</strong> and <strong>image count</strong>—shown on Generate before submission.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Flux 3 Klein — Two Workflows',
      items: [
        {
          name: 'Flux 3 Klein Text to Image',
          title: 'Flux 3 Klein T2I',
          description: 'Prompt-only generation up to 4K—9 ratios, 1–4 images per run.',
          path: '/home/flux-kontext/flux-3-klein-text-to-image',
          icon: 'fas fa-bolt'
        },
        {
          name: 'Flux 3 Klein Edit Image',
          title: 'Flux 3 Klein Edit',
          description: 'Edit from 1–10 reference images + prompt—1K/2K/4K, 1–4 outputs.',
          path: '/home/flux-kontext/flux-3-klein-edit-image',
          icon: 'fas fa-pen'
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
      html: '🔁 Already using Flux? Compare with <a href="/home/flux-kontext/flux-2-text-to-image" class="seo-inline-link">Flux 2 Text to Image →</a> for fast 1K/2K drafts on the same Flux family.',
      paths: ['/home/flux-kontext/flux-3-klein-text-to-image']
    },
    {
      pricing: false,
      html: '🔁 Already using Flux? Compare with <a href="/home/flux-kontext/flux-2-image-to-image" class="seo-inline-link">Flux 2 Image to Image →</a> for fast 1K/2K drafts on the same Flux family.',
      paths: ['/home/flux-kontext/flux-3-klein-edit-image']
    },
    {
      pricing: false,
      html: '🎬 Turn Flux 3 Klein stills into video with <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link">Seedance Image to Video →</a> or browse multimodal <a href="/home/seedance/v2" class="seo-inline-link">Seedance 2</a> for reference-driven clips.'
    }
  ]
}
