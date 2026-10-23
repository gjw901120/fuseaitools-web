/**
 * GptImageV15 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：GptImageV15SeoContent.vue）
 */
export default {
  component: 'GptImageV15SeoContent',
  rootId: 'gpt-image-v15-section',
  rootClass: 'gpt-image-seo',
  meta: {
    name: 'GPT Image 1.5 on FuseAITools',
    category: 'MultimediaApplication',
    description: 'GPT Image 1.5 text-to-image and image-to-image on FuseAITools—prompts up to 3000 chars, quality medium/high, aspect ratios 1:1/2:3/3:2.'
  },
  badge: '🎨 GPT Image 1.5 · Classic Generation · Two Workflows',
  introByPath: {
    '/home/gpt-image/text-to-image': {
      title: '📝 GPT Image 1.5 Text to Image',
      lead: 'Generate images from <strong>text prompts up to 3000 characters</strong> with classic OpenAI quality. Choose <strong>medium (6 credits)</strong> for fast results or <strong>high (36 credits)</strong> for maximum detail, with <strong>three aspect ratios</strong> (1:1, 2:3, 3:2).'
    },
    '/home/gpt-image/image-to-image': {
      title: '🖼️ GPT Image 1.5 Image to Image',
      lead: 'Upload <strong>one reference image</strong> and edit it with a prompt up to 3000 characters. GPT Image 1.5 understands scene context—<strong>adjust style, objects, or composition</strong> while preserving the original structure.'
    }
  },
  definitionByPath: {
    '/home/gpt-image/text-to-image': {
      title: 'What is GPT Image 1.5 Text to Image?',
      body: '<strong>GPT Image 1.5 Text to Image</strong> on FuseAITools (<code>gpt-image-1.5-text-to-image</code>) generates images from a text prompt (≤3000 characters). Set <strong>quality</strong> to medium or high, and choose from <strong>3 aspect ratios</strong> (1:1 square, 2:3 portrait, 3:2 landscape). Medium quality costs <strong>6 credits</strong>, high quality <strong>36 credits</strong>.'
    },
    '/home/gpt-image/image-to-image': {
      title: 'What is GPT Image 1.5 Image to Image?',
      body: '<strong>GPT Image 1.5 Image to Image</strong> on FuseAITools (<code>gpt-image-1.5-image-to-image</code>) edits a <strong>single uploaded image</strong> with a text prompt (≤3000 characters). The model understands contextual instructions—change clothing, replace backgrounds, alter lighting, or add objects. Same quality and aspect ratio controls as the T2I workflow. Medium quality costs <strong>12 credits</strong>, high quality <strong>36 credits</strong>.'
    }
  },
  faqByPath: {
    '/home/gpt-image/text-to-image': [
      {
        question: 'What are the credit costs for GPT Image 1.5 text-to-image?',
        answer: 'Medium quality costs <strong>6 credits</strong> per image; high quality costs <strong>36 credits</strong>. High quality generates slower but with more detail and better prompt adherence.'
      },
      {
        question: 'What aspect ratios does GPT Image 1.5 text-to-image support?',
        answer: 'Three options: <strong>1:1</strong> (square), <strong>2:3</strong> (portrait), and <strong>3:2</strong> (landscape). The default is 1:1 if not specified in the form.'
      }
    ],
    '/home/gpt-image/image-to-image': [
      {
        question: 'How many images can I use as input for GPT Image 1.5 image-to-image?',
        answer: 'Exactly <strong>one image</strong> (JPEG, PNG, or WebP, max 10MB). Upload it in the form and describe the edit in your prompt. Unlike v2, v1.5 does not support multiple input images.'
      },
      {
        question: 'What credit cost does GPT Image 1.5 image-to-image use?',
        answer: 'Medium quality costs <strong>12 credits</strong>; high quality costs <strong>36 credits</strong>. The image-to-image workflow costs more than T2I at medium quality because of the additional image processing required.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for GPT Image 1.5?',
      answer: 'No—GPT Image 1.5 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
    },
    {
      question: 'How is GPT Image 1.5 priced on FuseAITools?',
      answer: 'Credits depend on the model and quality tier—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
      title: '🎨 GPT Image 1.5 on FuseAITools',
      html: 'GPT Image 1.5 on <a href="/" class="seo-inline-link">FuseAITools</a> is OpenAI\'s <strong>classic image generation</strong> suite—generate from text prompts up to <strong>3000 characters</strong> or edit a single reference image with natural language. Choose <strong>medium or high quality</strong> to balance speed and detail, with <strong>three aspect ratios</strong> (1:1, 2:3, 3:2). New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ GPT Image 1.5 Core Features',
      items: [
        {
          icon: '🎛️',
          title: 'Classic OpenAI Quality',
          description: 'Powered by the <strong>gpt-image-1.5-*</strong> model family—strong instruction following, natural-language editing, and consistent output with medium or high quality tiers.'
        },
        {
          icon: '📝',
          title: 'Flexible Prompt Control',
          description: 'Prompts up to <strong>3000 characters</strong> for detailed scene descriptions. Use creative writing, technical instructions, or simple keywords—the model understands natural language.'
        },
        {
          icon: '🖼️',
          title: 'Reference Image Editing',
          description: 'Upload <strong>one image</strong> and describe changes in natural language—replace objects, change styles, adjust colors, or composite new elements into the scene.'
        },
        {
          icon: '💳',
          title: 'Credit-Based Pricing',
          description: 'Pay per generation with credits: T2I medium <strong>6</strong>, T2I high <strong>36</strong> / I2I medium <strong>12</strong>, I2I high <strong>36</strong>. Costs appear on the Generate button before each run.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Quick image drafts & ideation',
        'Social media graphics',
        'Product visual concepts',
        'Photo editing & retouching',
        'Style & background changes'
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (GPT Image 1.5)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ GPT Image 1.5 Technical Specs',
      ariaLabel: 'GPT Image 1.5 workflow capabilities',
      headers: ['Workflow', 'Input', 'Aspect ratios', 'Quality & credits', 'Key controls'],
      rows: [
        [
          '<strong>Text to Image</strong>',
          'Prompt ≤3000 chars',
          '1:1, 2:3, 3:2',
          'medium <strong>6</strong> / high <strong>36</strong>',
          'Prompt + quality + aspect ratio'
        ],
        [
          '<strong>Image to Image</strong>',
          '1 image URL + prompt ≤3000 chars',
          '1:1, 2:3, 3:2',
          'medium <strong>12</strong> / high <strong>36</strong>',
          'Prompt + quality + aspect ratio + reference image'
        ]
      ],
      lead: 'Parameters below match the FuseAITools GPT Image form and API (<code>gpt-image-1.5-*</code> models).',
      note: 'Image inputs: JPEG, PNG, WebP (max 10MB per image). T2I default aspect ratio is 1:1. Quality selection affects generation speed and detail—medium is balanced, high is slower with more detail.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'GPT Image 1.5 — Two Classic Workflows',
      lead: 'Choose the mode that matches your task:',
      items: [
        {
          name: 'GPT Image 1.5 Text to Image',
          title: 'Text to Image',
          description: 'Generate from text prompts up to 3000 chars—choose medium or high quality, three aspect ratios.',
          path: '/home/gpt-image/text-to-image',
          icon: 'fas fa-keyboard'
        },
        {
          name: 'GPT Image 1.5 Image to Image',
          title: 'Image to Image',
          description: 'Transform a single reference image with a prompt—quality and aspect ratio controls.',
          path: '/home/gpt-image/image-to-image',
          icon: 'fas fa-image'
        }
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 GPT Image 1.5 vs GPT Image v2',
      ariaLabel: 'GPT Image 1.5 vs GPT Image v2',
      headers: ['Dimension', 'GPT Image 1.5 (Classic)', 'GPT Image v2'],
      rows: [
        [
          'Positioning',
          'Classic generation with quality tiers',
          'Modern generation with resolution control (1K–4K)'
        ],
        ['Workflows', '<strong>Two</strong>—T2I, I2I', '<strong>Two</strong>—T2I, I2I'],
        ['Prompt limit', '<strong>3000</strong> characters', '<strong>20000</strong> characters'],
        [
          'Aspect ratios',
          '<strong>3</strong>—1:1, 2:3, 3:2',
          '<strong>6</strong>—auto, 1:1, 9:16, 16:9, 4:3, 3:4'
        ],
        ['Resolution', 'Standard (medium/high quality)', '<strong>1K / 2K / 4K</strong> selectable'],
        ['Image input', '1 image max', 'Up to <strong>16 images</strong> (I2I)'],
        ['Best for', 'Quick drafts and classic quality', 'Long prompts, high-res & multi-reference editing']
      ]
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for GPT Image 1.5 per-generation costs.'
    },
    {
      pricing: false,
      html: '✨ Need longer prompts or higher resolution? <a href="/home/gpt-image/v2-text-to-image" class="seo-inline-link" >Upgrade to GPT Image v2 Text to Image →</a> for prompts up to <strong>20000 characters</strong> and <strong>1K/2K/4K</strong> resolution, or <a href="/home/gpt-image/v2-image-to-image" class="seo-inline-link" >GPT Image v2 Image to Image</a> for multi-reference editing with up to 16 images.'
    },
    {
      pricing: false,
      html: '⚡ Want the widest framing options? <a href="/home/gpt-image/v2-5-flare-text-to-image" class="seo-inline-link" >Try GPT Image 2.5 Flare Text to Image →</a> and <a href="/home/gpt-image/v2-5-sunburst-text-to-image" class="seo-inline-link" >2.5 Sunburst Text to Image</a> for <strong>13 aspect ratios</strong> plus <strong>background control at 1K</strong>, with matching <a href="/home/gpt-image/v2-5-flare-image-to-image" class="seo-inline-link" >Flare</a> / <a href="/home/gpt-image/v2-5-sunburst-image-to-image" class="seo-inline-link" >Sunburst image-to-image</a> variants.'
    }
  ]
}
