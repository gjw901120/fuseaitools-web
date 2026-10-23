/**
 * QwenV2 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：QwenV2SeoContent.vue）
 */
export default {
  component: 'QwenV2SeoContent',
  rootId: 'qwen-v2-section',
  rootClass: 'qwen-seo',
  meta: {
    name: 'Qwen v2 on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Qwen v2 text-to-image and image-edit on FuseAITools—streamlined generation with aspect ratio control, 800-char prompts, and modern image quality.'
  },
  badge: '✨ Qwen v2 · Enhanced Generation · Two Workflows',
  introByPath: {
    '/home/qwen/v2-text-to-image': {
      title: '📝 Qwen v2 Text to Image',
      lead: 'Generate images from <strong>prompts up to 800 characters</strong> with <strong>5 aspect ratio</strong> options (1:1, 3:4, 4:3, 9:16, 16:9). Set an optional <strong>seed</strong> and choose <strong>PNG or JPEG</strong> output—simple and fast.'
    },
    '/home/qwen/v2-image-edit': {
      title: '✂️ Qwen v2 Image Edit',
      lead: 'Upload <strong>one image</strong> and edit with a prompt up to <strong>800 characters</strong>. Choose from <strong>8 aspect ratios</strong> including <strong>21:9</strong> ultra-wide—more flexibility than v1 Classic for format-specific outputs.'
    }
  },
  definitionByPath: {
    '/home/qwen/v2-text-to-image': {
      title: 'What is Qwen v2 Text to Image?',
      body: '<strong>Qwen v2 Text to Image</strong> on FuseAITools (<code>qwen2-text-to-image</code>) generates images from a prompt (≤800 characters) with <strong>5 aspect ratios</strong>: 1:1, 3:4, 4:3, 9:16, and 16:9. Optional seed for reproducibility, PNG or JPEG output (default PNG).'
    },
    '/home/qwen/v2-image-edit': {
      title: 'What is Qwen v2 Image Edit?',
      body: '<strong>Qwen v2 Image Edit</strong> on FuseAITools (<code>qwen2-image-edit</code>) transforms an uploaded image URL with a prompt (≤800 characters). Choose from <strong>8 aspect ratios</strong> including ultra-wide <strong>21:9</strong>—more format flexibility than the v1 Classic edit workflow.'
    }
  },
  faqByPath: {
    '/home/qwen/v2-text-to-image': [
      {
        question: 'What aspect ratios does Qwen v2 text-to-image support?',
        answer: 'Five options: <strong>1:1, 3:4, 4:3, 9:16, and 16:9</strong>. The default is 16:9 if not specified in the form.'
      },
      {
        question: 'What is the prompt limit for Qwen v2 text-to-image?',
        answer: 'Prompts are limited to <strong>800 characters</strong>. This is shorter than v1 Classic (5000) but sufficient for streamlined generation with the v2 model architecture.'
      }
    ],
    '/home/qwen/v2-image-edit': [
      {
        question: 'What aspect ratios does Qwen v2 image edit support?',
        answer: 'Eight options: <strong>1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, and 21:9</strong>. The <strong>21:9</strong> ultra-wide option is exclusive to v2—v1 Classic does not offer it.'
      },
      {
        question: 'Is an image required for Qwen v2 image edit?',
        answer: 'Yes—you must upload <strong>exactly one image</strong> (JPEG, PNG, or WebP, max 10MB) and provide a prompt up to 800 characters. The image URL is required before generation.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Qwen v2?',
      answer: 'No—Qwen v2 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
    },
    {
      question: 'How is Qwen v2 priced on FuseAITools?',
      answer: 'Credits depend on the model—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
      title: '✨ Qwen v2 on FuseAITools',
      html: 'Qwen v2 on <a href="/" class="seo-inline-link">FuseAITools</a> delivers <strong>streamlined image generation and editing</strong> with modern quality. Choose <strong>v2 Text to Image</strong> for prompt-driven creation with aspect ratio control, or <strong>v2 Image Edit</strong> for reference-based editing with up to <strong>21:9</strong> support. Both workflows use concise prompts (≤800 characters) and simplified controls. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Qwen v2 Core Features',
      items: [
        {
          icon: '✨',
          title: 'Streamlined Generation',
          description: 'Simplified controls for <strong>fast, high-quality results</strong>. No steps, guidance, or acceleration—just prompt, aspect ratio, and optional seed.'
        },
        {
          icon: '📐',
          title: 'Flexible Aspect Ratios',
          description: 'v2 Image Edit offers <strong>8 aspect ratios</strong> including <strong>21:9</strong> ultra-wide—more format options than v1 Classic for cinematic and widescreen outputs.'
        },
        {
          icon: '⚡',
          title: 'Modern Model Architecture',
          description: 'Powered by the <strong>qwen2-*</strong> model family for improved image quality, better text rendering, and consistent output at every supported aspect ratio.'
        },
        {
          icon: '🎯',
          title: 'Reference-Based Editing',
          description: 'Upload an image and edit with short prompts—ideal for quick style transfers, background changes, and product variations.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Quick social media graphics',
        'Product variations & mockups',
        'Cinematic & widescreen edits',
        'Style-consistent brand assets',
        'Ultra-wide 21:9 compositions'
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Qwen v2)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Qwen v2 Technical Specs',
      ariaLabel: 'Qwen v2 workflow capabilities',
      headers: ['Workflow', 'Input', 'Image sizes / ratios', 'Key controls'],
      rows: [
        [
          '<strong>v2 Text to Image</strong>',
          'Prompt ≤800 chars',
          '1:1, 3:4, 4:3, 9:16, 16:9',
          'Seed, output format (PNG/JPEG)'
        ],
        [
          '<strong>v2 Image Edit</strong>',
          '1 image URL + prompt ≤800 chars',
          '1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, <strong>21:9</strong>',
          'Seed, output format (PNG/JPEG)'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Qwen v2 form and API (<code>qwen2-*</code> models).',
      note: 'Image inputs: JPEG, PNG, WebP (max 10MB). Default aspect ratio is 16:9 for both workflows. Default output format is PNG.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Qwen v2 — Two Workflows',
      lead: 'Choose the mode that matches your task:',
      items: [
        {
          name: 'Qwen v2 Text to Image',
          title: 'v2 Text to Image',
          description: 'Streamlined T2I with 5 aspect ratios (1:1–16:9), seed control, and PNG/JPEG output.',
          path: '/home/qwen/v2-text-to-image',
          icon: 'fas fa-wand-magic-sparkles'
        },
        {
          name: 'Qwen v2 Image Edit',
          title: 'v2 Image Edit',
          description: 'Upload a reference image and edit with prompts—8 aspect ratios including 21:9.',
          path: '/home/qwen/v2-image-edit',
          icon: 'fas fa-scissors'
        }
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Qwen Generations Compared: v1 · v2 · v2.1 · v3 · v3 Pro',
      ariaLabel: 'Qwen v2 compared across all model generations',
      headers: ['Dimension', 'v1 Classic', 'v2', 'v2.1', 'v3', 'v3 Pro'],
      rows: [
        [
          '<strong>Positioning</strong>',
          'Full-parameter control',
          '<strong>Minimal fast lane</strong>',
          'Long prompts + alpha output',
          'Smart rewriting flagship',
          'Premium quality tier'
        ],
        ['<strong>Prompt limit</strong>', '5000 (edit 2000)', '<strong>800</strong>', '5000', '5000', '5000'],
        [
          '<strong>Signature controls</strong>',
          'Steps, guidance, acceleration',
          'Seed only—simplest',
          'enhancePrompt, background, mask',
          'promptExtend + negative (≤5000)',
          'promptExtend + negative (≤5000)'
        ],
        [
          '<strong>Sizes / aspects</strong>',
          '6 presets',
          '5 / <strong>8 incl. 21:9</strong> (edit)',
          '9 (+auto)',
          '8',
          '8'
        ],
        ['<strong>Reference images</strong>', '1 (I2I / edit)', '1 (edit)', 'up to 10 + mask', 'up to 3', 'up to 3'],
        ['<strong>Resolution / billing</strong>', 'Per image', 'Per image', '1K / 2K', '1K / 2K', '1K / 2K premium'],
        [
          '<strong>Best for</strong>',
          'Pixel-level iteration',
          '<strong>Quick social graphics</strong>',
          'Cutouts, remixes, inpainting',
          'Prompt-assisted production',
          'Hero assets &amp; final delivery'
        ]
      ],
      note: 'v2 stays the lightest option—<strong>800-char prompts and seed-only controls</strong>. Move up when you need long prompts (v2.1), transparent output, or smart prompt rewriting with negative prompts (v3 / v3 Pro).'
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for Qwen v2 per-generation costs.'
    },
    {
      pricing: false,
      html: '🖼️ <strong>Wan image companion</strong> Need high-resolution stills or sequential storyboards? <a href="/home/wan/2-7-image" class="seo-inline-link" >Wan 2.7 Image</a> offers 1K/2K resolution with up to 9 reference images, or <a href="/home/wan/2-7-image-pro" class="seo-inline-link" >Wan 2.7 Image Pro (4K)</a> for ultra-high-fidelity hero assets.'
    },
    {
      pricing: false,
      html: '🌟 Upgraded Qwen image families are here. <a href="/home/qwen/v21-text-to-image" class="seo-inline-link" >Qwen v2.1</a> lifts prompts to 5000 chars with 9 aspect ratios, transparent backgrounds and PNG/WebP/JPEG output—plus <a href="/home/qwen/v21-image-to-image" class="seo-inline-link" >1–10 image references with mask-based local edits</a>. For smart prompt rewriting and a negative prompt, use <a href="/home/qwen/v3-text-to-image" class="seo-inline-link" >Qwen v3</a> or <a href="/home/qwen/v3-pro-image-to-image" class="seo-inline-link" >v3 Pro Image to Image</a>.'
    },
    {
      pricing: false,
      html: '👑 Ready for the premium tier? Go straight to <a href="/home/qwen/v3-pro-text-to-image" class="seo-inline-link" >Qwen v3 Pro Text to Image</a> or <a href="/home/qwen/v3-pro-image-to-image" class="seo-inline-link" >v3 Pro Image to Image</a> —the highest-fidelity Qwen image models, with smart prompt rewriting and a 5000-char negative prompt at 1K/2K resolution billing.'
    }
  ]
}
