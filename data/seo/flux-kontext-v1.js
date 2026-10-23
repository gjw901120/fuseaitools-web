/**
 * FluxKontextV1 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：FluxKontextV1SeoContent.vue）
 */
export default {
  component: 'FluxKontextV1SeoContent',
  rootId: 'flux-kontext-v1-section',
  rootClass: 'flux-seo',
  meta: {
    name: 'Flux Kontext Image on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Flux Kontext Pro and Max on FuseAITools—unified text-to-image and single-image edit with six aspect ratios, safety controls, and prompt enhancement.'
  },
  badge: '🎨 Flux Kontext · v1 · Generate & Edit · Pro / Max',
  faqByPath: {
    '/home/flux-kontext/flux-2-text-to-image': [
      {
        question: 'What is the difference between Flux Kontext Pro and Max?',
        answer: '<strong>Pro</strong> (<code>flux_kontext_pro</code>) balances speed and quality; <strong>Max</strong> (<code>flux_kontext_max</code>) targets higher detail. Both support generate and edit modes—credits differ per tier.'
      },
      {
        question: 'Can Flux Kontext edit an uploaded image?',
        answer: 'Yes—switch to <strong>Image Editing</strong>, upload one image (JPEG/PNG/WebP, max 10MB), and describe the change in your prompt.'
      },
      {
        question: 'Which aspect ratios does Flux Kontext support?',
        answer: '<strong>21:9, 16:9, 4:3, 1:1, 3:4, and 9:16</strong>. Output as JPEG or PNG with optional watermark ID.'
      },
      {
        question: 'How is Flux Kontext priced on FuseAITools?',
        answer: 'Fixed credits per successful image—Pro or Max tier. Credits appear on the Generate button. New users get <strong>20 free credits</strong>—see <a href="/pricing" class="seo-pricing-link">pricing</a>.'
      }
    ],
    '/home/flux-kontext/flux-2-image-to-image': [
      {
        question: 'What is the difference between Flux Kontext Pro and Max?',
        answer: '<strong>Pro</strong> (<code>flux_kontext_pro</code>) balances speed and quality; <strong>Max</strong> (<code>flux_kontext_max</code>) targets higher detail. Both support generate and edit modes—credits differ per tier.'
      },
      {
        question: 'Can Flux Kontext edit an uploaded image?',
        answer: 'Yes—switch to <strong>Image Editing</strong>, upload one image (JPEG/PNG/WebP, max 10MB), and describe the change in your prompt.'
      },
      {
        question: 'Which aspect ratios does Flux Kontext support?',
        answer: '<strong>21:9, 16:9, 4:3, 1:1, 3:4, and 9:16</strong>. Output as JPEG or PNG with optional watermark ID.'
      },
      {
        question: 'How is Flux Kontext priced on FuseAITools?',
        answer: 'Fixed credits per successful image—Pro or Max tier. Credits appear on the Generate button. New users get <strong>20 free credits</strong>—see <a href="/pricing" class="seo-pricing-link">pricing</a>.'
      }
    ],
    '/home/flux-kontext/flux-2-pro-text-to-image': [
      {
        question: 'What is the difference between Flux Kontext Pro and Max?',
        answer: '<strong>Pro</strong> (<code>flux_kontext_pro</code>) balances speed and quality; <strong>Max</strong> (<code>flux_kontext_max</code>) targets higher detail. Both support generate and edit modes—credits differ per tier.'
      },
      {
        question: 'Can Flux Kontext edit an uploaded image?',
        answer: 'Yes—switch to <strong>Image Editing</strong>, upload one image (JPEG/PNG/WebP, max 10MB), and describe the change in your prompt.'
      },
      {
        question: 'Which aspect ratios does Flux Kontext support?',
        answer: '<strong>21:9, 16:9, 4:3, 1:1, 3:4, and 9:16</strong>. Output as JPEG or PNG with optional watermark ID.'
      },
      {
        question: 'How is Flux Kontext priced on FuseAITools?',
        answer: 'Fixed credits per successful image—Pro or Max tier. Credits appear on the Generate button. New users get <strong>20 free credits</strong>—see <a href="/pricing" class="seo-pricing-link">pricing</a>.'
      }
    ]
  },
  sections: [
    {
      type: 'intro',
      id: 'workflow-intro-heading',
      title: '🎨 Flux Kontext Generate',
      html: 'Black Forest Labs <strong>Flux Kontext</strong> on one page—switch <strong>Image Generation</strong> (text-to-image) or <strong>Image Editing</strong> (single-image edit). Required: <strong>prompt</strong>. Edit mode adds one uploaded image (max 10MB). Pick <strong>Pro</strong> or <strong>Max</strong>, six aspect ratios, JPEG/PNG output, optional prompt enhancement and safety tolerance (0–6).'
    },
    {
      type: 'definition',
      id: 'definition-heading',
      title: 'What is Flux Kontext Generate?',
      html: '<strong>Flux Kontext Generate</strong> on FuseAITools (<code>flux_kontext_pro</code> / <code>flux_kontext_max</code>) is the original Kontext workflow—text-to-image from a prompt, or image editing when you upload a reference still. Aspect ratios: <strong>21:9, 16:9, 4:3, 1:1, 3:4, 9:16</strong>. Optional auto translation, prompt upsampling, watermark ID, and safety tolerance slider. Fixed credits per image (Pro vs Max tier).'
    },
    {
      type: 'prose',
      id: 'positioning-heading',
      title: '🎨 Flux Kontext on FuseAITools',
      html: 'Flux Kontext on <a href="/" class="seo-inline-link">FuseAITools</a> is Black Forest Labs\' governed image line— strong text rendering, photoreal detail, and edit controls on a single tab. Need <strong>1K/2K Flux 2</strong> output or <strong>multi-reference</strong> (1–8 images)? Upgrade to <a href="/home/flux-kontext/flux-2-text-to-image" class="seo-inline-link">Flux 2</a>. Credits show on Generate; new users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Flux Kontext Core Features',
      items: [
        {
          icon: '✍️',
          title: 'Text & Edit Modes',
          description: 'One tab for <strong>text-to-image</strong> and <strong>single-image edit</strong> with the same Pro/Max controls.'
        },
        {
          icon: '🎚️',
          title: 'Governance Knobs',
          description: 'Safety tolerance (0–6), prompt enhancement, optional watermark, and auto translation.'
        },
        {
          icon: '📐',
          title: 'Six Aspect Ratios',
          description: '21:9 through 9:16 for widescreen, social, and mobile layouts.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'Pro/Max credits shown before generate—no local GPU required.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: ['Text-in-image posters', 'Single-image retouch', 'Brand-safe generation', 'Pro/Max A/B tests']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Flux Kontext Pro vs Max',
      ariaLabel: 'Flux Kontext Pro vs Max',
      headers: ['Dimension', 'Pro', 'Max'],
      rows: [
        ['<strong>modelKey</strong>', '<code>flux_kontext_pro</code>', '<code>flux_kontext_max</code>'],
        ['<strong>Positioning</strong>', 'Balanced speed and quality', 'Higher fidelity and detail'],
        [
          '<strong>Modes</strong>',
          {
            html: 'Text-to-image + single-image edit',
            colspan: 2
          }
        ],
        [
          '<strong>Controls</strong>',
          {
            html: '6 aspect ratios; JPEG/PNG; safety 0–6; prompt upsampling',
            colspan: 2
          }
        ],
        [
          '<strong>Pricing</strong>',
          {
            html: 'Fixed credits per image (ONCE)—shown before generate',
            colspan: 2
          }
        ]
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Flux Kontext)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Flux Kontext Technical Specs',
      ariaLabel: 'Flux Kontext capabilities',
      headers: ['Mode', 'Required', 'Key controls'],
      rows: [
        [
          '<strong>Image Generation</strong>',
          'Prompt',
          'Pro/Max; aspect 21:9–9:16; JPEG/PNG; auto translation; prompt upsampling; safety 0–6'
        ],
        ['<strong>Image Editing</strong>', 'Prompt + 1 image (max 10MB)', 'Same controls as generation']
      ]
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Flux Kontext — Generate Workflow',
      items: [
        {
          path: '/home/flux-kontext/generate',
          icon: 'fas fa-wand-magic-sparkles',
          title: 'Generate',
          name: 'Flux Kontext',
          description: 'Text-to-image or single-image edit—Pro/Max, six ratios, governance knobs.'
        }
      ]
    },
    {
      type: 'table',
      id: 'version-compare-heading',
      title: '📊 Flux Kontext vs Flux 2',
      ariaLabel: 'Flux Kontext vs Flux 2',
      headers: ['Dimension', 'Flux Kontext (v1)', 'Flux 2 (v2)'],
      rows: [
        [
          '<strong>Positioning</strong>',
          'Governed generate + single-image edit',
          '1K/2K T2I + multi-ref I2I (+ Pro tier)'
        ],
        ['<strong>Workflows</strong>', 'Generate tab (T2I + edit)', 'Flux 2 T2I, I2I, Pro T2I, Pro I2I'],
        [
          '<strong>Resolution</strong>',
          'Pro / Max tiers (standard output)',
          '<strong>1K / 2K</strong> selectable'
        ],
        [
          '<strong>Reference images</strong>',
          '1 image (edit mode only)',
          '<strong>1–8</strong> on I2I workflows'
        ],
        ['<strong>Aspect ratios</strong>', '6 (21:9–9:16)', '8 + <strong>auto</strong>'],
        [
          '<strong>Unique controls</strong>',
          'Safety tolerance, prompt upsampling, watermark',
          'Per-shot 1K/2K; Pro fidelity tier'
        ],
        [
          '<strong>Best for</strong>',
          'Text-in-image, governed edits, Pro/Max pick',
          '2K social assets, multi-reference style lock'
        ]
      ],
      lead: '<strong>Flux Kontext (v1)</strong> is the governed generate/edit tab; <strong>Flux 2 (v2)</strong> adds dedicated 1K/2K T2I and multi-reference I2I (1–8 images) plus a Pro tier. Upgrade when you need 2K drafts or reference-heavy edits.'
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for subscription discounts and credit top-ups.'
    },
    {
      pricing: false,
      html: '🖼️ Need 1K/2K output or multi-reference editing? <a href="/home/flux-kontext/flux-2-text-to-image" class="seo-inline-link">Try Flux 2 Text to Image →</a> or <a href="/home/flux-kontext/flux-2-image-to-image" class="seo-inline-link">Flux 2 Image to Image</a> (1–8 reference images)—or <a href="/home/flux-kontext/flux-2-pro-text-to-image" class="seo-inline-link">Flux 2 Pro</a> for higher-fidelity finals.'
    }
  ]
}
