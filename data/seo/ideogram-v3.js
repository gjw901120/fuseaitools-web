/**
 * IdeogramV3 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：IdeogramV3SeoContent.vue）
 */
export default {
  component: 'IdeogramV3SeoContent',
  rootId: 'ideogram-v3-section',
  rootClass: 'ideogram-seo',
  meta: {
    name: 'Ideogram V3 Image on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Ideogram V3 text-to-image, edit, remix, and reframe on FuseAITools—TURBO/BALANCED/QUALITY speed, MagicPrompt, and six aspect ratios.'
  },
  badge: '🎨 Ideogram V3 · T2I · Edit · Remix · Reframe',
  introByPath: {
    '/home/ideogram/v3-text-to-image': {
      title: '📝 Ideogram V3 Text to Image',
      lead: 'Generate from a <strong>prompt</strong> (≤5000 chars). Pick <strong>TURBO / BALANCED / QUALITY</strong>, style (AUTO/GENERAL/REALISTIC/DESIGN), optional <strong>MagicPrompt</strong>, image size presets, negative prompt, and seed.'
    },
    '/home/ideogram/v3-edit': {
      title: '🖌️ Ideogram V3 Edit',
      lead: 'Upload <strong>image + mask</strong> (same dimensions) and a <strong>prompt</strong> to inpaint or modify the masked region. Speed, MagicPrompt, and seed supported.'
    },
    '/home/ideogram/v3-remix': {
      title: '🔀 Ideogram V3 Remix',
      lead: 'Provide a <strong>source image + prompt</strong>. Tune <strong>strength</strong> (0.01–1), style, image size, <strong>1–4</strong> outputs, negative prompt, and seed.'
    },
    '/home/ideogram/v3-reframe': {
      title: '📐 Ideogram V3 Reframe',
      lead: 'Reframe one <strong>image</strong> into square, portrait, or landscape presets—no prompt required. Optional style, speed, <strong>1–4</strong> outputs, and seed.'
    }
  },
  definitionByPath: {
    '/home/ideogram/v3-text-to-image': {
      title: 'What is Ideogram V3 Text to Image?',
      body: '<strong>Ideogram V3 Text to Image</strong> (<code>ideogram-v3-text-to-image</code>) on FuseAITools generates images from text. Required: prompt (max 5000). RULE pricing by <code>rendering_speed</code> (TURBO/BALANCED/QUALITY).'
    },
    '/home/ideogram/v3-edit': {
      title: 'What is Ideogram V3 Edit?',
      body: '<strong>Ideogram V3 Edit</strong> (<code>ideogram-v3-edit</code>) inpaints a masked region on an uploaded image using a prompt. Required: image URL, mask URL (matching size), and prompt.'
    },
    '/home/ideogram/v3-remix': {
      title: 'What is Ideogram V3 Remix?',
      body: '<strong>Ideogram V3 Remix</strong> (<code>ideogram-v3-remix</code>) varies an input image with a new prompt and adjustable remix strength. Supports multi-image output (1–4) and negative prompts.'
    },
    '/home/ideogram/v3-reframe': {
      title: 'What is Ideogram V3 Reframe?',
      body: '<strong>Ideogram V3 Reframe</strong> (<code>ideogram-v3-reframe</code>) changes aspect ratio and composition of an existing image—square, square_hd, portrait, and landscape presets.'
    }
  },
  faqByPath: {
    '/home/ideogram/v3-text-to-image': [
      {
        question: 'Which rendering speeds does Ideogram V3 T2I support?',
        answer: '<strong>TURBO</strong>, <strong>BALANCED</strong>, and <strong>QUALITY</strong>—credits follow the speed tier on Generate.'
      },
      {
        question: 'Can Ideogram V3 render legible text?',
        answer: 'Ideogram is known for strong <strong>text-in-image</strong> results—use clear prompt wording and negative prompts to reduce artifacts.'
      }
    ],
    '/home/ideogram/v3-edit': [
      {
        question: 'What mask format does V3 Edit need?',
        answer: 'Upload a mask matching the <strong>same dimensions</strong> as the source image (JPG/PNG/WebP, max 10MB).'
      },
      {
        question: 'Is a prompt required for V3 Edit?',
        answer: 'Yes—describe what should appear in the masked region (max 5000 characters).'
      }
    ],
    '/home/ideogram/v3-remix': [
      {
        question: 'What does strength control on V3 Remix?',
        answer: '<strong>Strength</strong> from 0.01 to 1 balances fidelity to the source image vs. prompt-driven change.'
      },
      {
        question: 'How many images can V3 Remix output?',
        answer: 'Select <strong>1–4</strong> images per generation.'
      }
    ],
    '/home/ideogram/v3-reframe': [
      {
        question: 'Does V3 Reframe need a prompt?',
        answer: 'No—only a <strong>source image</strong> and target <strong>image_size</strong> preset.'
      },
      {
        question: 'Which aspect ratios can V3 Reframe target?',
        answer: 'Square, square_hd, portrait_4_3, portrait_16_9, landscape_4_3, and landscape_16_9.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Ideogram V3?',
      answer: 'No—Ideogram V3 runs in the cloud on FuseAITools. Pick a rendering speed; credits appear on Generate.'
    },
    {
      question: 'How is Ideogram V3 priced on FuseAITools?',
      answer: 'RULE credits by <strong>speed</strong> (TURBO/BALANCED/QUALITY). See <a href="/pricing" class="seo-pricing-link">pricing</a>. New users get <strong>20 free credits</strong> on sign-up.'
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
      title: '🎨 Ideogram V3 on FuseAITools',
      html: '<strong>Ideogram V3</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> covers general image creation— text-to-image, mask edit, remix, and reframe—with shared controls for <strong>TURBO / BALANCED / QUALITY</strong> rendering speed and style presets. Need <strong>identity-locked characters</strong> across scenes? Use the separate <a href="/home/ideogram/character" class="seo-inline-link">Character</a> line. Credits scale by speed tier; new users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Ideogram V3 Core Features',
      items: [
        {
          icon: '✍️',
          title: 'Legible Text & Design',
          description: 'V3 excels at <strong>posters, logos, and layout</strong> with readable typography.'
        },
        {
          icon: '⚡',
          title: 'Three Speed Tiers',
          description: 'TURBO for drafts, BALANCED default, QUALITY for finals—credits scale accordingly.'
        },
        {
          icon: '🔀',
          title: 'Edit to Reframe',
          description: 'Four workflows from <strong>new prompts</strong> to mask edits, remix strength, and aspect reframes.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'All V3 modes share one form—speed-based credits before generate.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: ['Social creatives', 'Poster design', 'Inpainting fixes', 'Platform reframes']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Ideogram V3 Workflows Compared',
      ariaLabel: 'Ideogram V3 workflow comparison',
      headers: ['Dimension', 'T2I', 'Edit', 'Remix', 'Reframe'],
      rows: [
        ['<strong>Input</strong>', 'Prompt', 'Image + mask + prompt', 'Image + prompt', 'Image (+ size)'],
        [
          '<strong>modelKey</strong>',
          '<code>ideogram-v3-text-to-image</code>',
          '<code>ideogram-v3-edit</code>',
          '<code>ideogram-v3-remix</code>',
          '<code>ideogram-v3-reframe</code>'
        ],
        ['<strong>Prompt</strong>', 'Required (≤5000)', 'Required', 'Required', 'Not used'],
        [
          '<strong>Unique controls</strong>',
          'MagicPrompt, negative prompt',
          'Mask inpaint',
          'Strength 0.01–1',
          'Aspect reframe, 1–4 outputs'
        ],
        [
          '<strong>Best for</strong>',
          'New concepts, posters with text',
          'Local edits, inpainting',
          'Creative variations',
          'Resize for social formats'
        ]
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Ideogram V3)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Ideogram V3 Technical Specs',
      ariaLabel: 'Ideogram V3 capabilities',
      headers: ['Workflow', 'Required', 'Key controls'],
      rows: [
        [
          '<strong>V3 Text to Image</strong>',
          'Prompt (≤5000)',
          'Speed; style; MagicPrompt; image size; negative prompt; seed'
        ],
        ['<strong>V3 Edit</strong>', 'Image + mask + prompt', 'Speed; MagicPrompt; seed'],
        [
          '<strong>V3 Remix</strong>',
          'Image + prompt',
          'Strength; style; size; num_images 1–4; negative prompt'
        ],
        ['<strong>V3 Reframe</strong>', 'Image URL', 'Target image_size; style; num_images 1–4; seed']
      ],
      lead: 'Shared V3 controls: rendering speed, style (AUTO/GENERAL/REALISTIC/DESIGN), image size presets, optional seed.',
      note: 'Pricing: RULE credits by <strong>rendering_speed</strong> (TURBO / BALANCED / QUALITY)—shown on Generate.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Ideogram V3 — Four Workflows',
      items: [
        {
          name: 'Ideogram V3 Text to Image',
          title: 'V3 T2I',
          description: 'Prompt-only generation—speed, style, MagicPrompt.',
          path: '/home/ideogram/v3-text-to-image',
          icon: 'fas fa-keyboard'
        },
        {
          name: 'Ideogram V3 Edit',
          title: 'V3 Edit',
          description: 'Image + mask inpainting with prompt.',
          path: '/home/ideogram/v3-edit',
          icon: 'fas fa-paint-brush'
        },
        {
          name: 'Ideogram V3 Remix',
          title: 'V3 Remix',
          description: 'Remix with strength, size, 1–4 outputs.',
          path: '/home/ideogram/v3-remix',
          icon: 'fas fa-sync-alt'
        },
        {
          name: 'Ideogram V3 Reframe',
          title: 'V3 Reframe',
          description: 'New aspect ratios from one image.',
          path: '/home/ideogram/v3-reframe',
          icon: 'fas fa-crop-alt'
        }
      ]
    },
    {
      type: 'table',
      id: 'version-compare-heading',
      title: '📊 Ideogram V3 vs Character',
      ariaLabel: 'Ideogram V3 vs Character',
      headers: ['Dimension', 'V3', 'Character'],
      rows: [
        [
          '<strong>Positioning</strong>',
          'General T2I, edit, remix, reframe',
          'Identity-consistent character scenes'
        ],
        [
          '<strong>Workflows</strong>',
          'T2I, Edit, Remix, Reframe',
          'Character, Character Edit, Character Remix'
        ],
        [
          '<strong>Reference images</strong>',
          'Source image for edit/remix/reframe',
          '<strong>Character reference</strong> (required)'
        ],
        ['<strong>Style presets</strong>', 'AUTO, GENERAL, REALISTIC, DESIGN', 'AUTO, REALISTIC, FICTION'],
        [
          '<strong>Best for</strong>',
          'Posters, inpainting, format reframes',
          'Mascots, game chars, serial content'
        ]
      ],
      lead: '<strong>V3</strong> is for general generation and editing; <strong>Character</strong> locks identity from reference images—complementary product lines on the same brand.'
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for subscription discounts and credit top-ups.'
    },
    {
      pricing: false,
      html: '👤 Need the same face across scenes? <a href="/home/ideogram/character" class="seo-inline-link">Try Ideogram Character →</a> for reference-driven identity, or <a href="/home/ideogram/character-edit" class="seo-inline-link">Character Edit</a> / <a href="/home/ideogram/character-remix" class="seo-inline-link">Character Remix</a> for masked or strength-controlled variations.'
    }
  ]
}
