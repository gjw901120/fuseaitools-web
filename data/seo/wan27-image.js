/**
 * Wan27Image SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：Wan27ImageSeoContent.vue）
 */
export default {
  component: 'Wan27ImageSeoContent',
  rootId: 'wan-27-image-section',
  rootClass: 'wan-seo',
  meta: {
    name: 'Wan 2.7 Image on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Wan 2.7 Image and Image Pro text-to-image and image editing on FuseAITools—1K/2K/4K, up to 9 reference images, sequential mode, and advanced controls.'
  },
  badge: '🖼️ Wan 2.7 · Image & Image Pro · Two Workflows',
  introByPath: {
    '/home/wan/2-7-image': {
      title: '🖼️ Wan 2.7 Image',
      lead: 'Generate or edit images with prompts up to <strong>5000 characters</strong>—add up to <strong>9 optional reference images</strong>, pick <strong>1K or 2K</strong>, and use eight aspect ratios when starting from text only. Toggle <strong>sequential mode</strong> for grouped batches (n up to 12).'
    },
    '/home/wan/2-7-image-pro': {
      title: '✨ Wan 2.7 Image Pro',
      lead: 'Image Pro matches Wan 2.7 Image controls and adds <strong>4K output</strong> when you generate from prompt only—no input images and sequential mode off. Ideal for hero keyframes before <strong>Wan 2.7 Image to Video</strong> or print-ready stills.'
    }
  },
  definitionByPath: {
    '/home/wan/2-7-image': {
      title: 'What is Wan 2.7 Image?',
      body: '<strong>Wan 2.7 Image</strong> on FuseAITools (<code>wan-2-7-image</code>) creates or edits still images from a prompt (1–5000 characters). Optional: up to <strong>9 input image URLs</strong>. Without inputs, choose aspect ratios from <strong>1:1 through 1:8</strong> and resolution <strong>1K/2K</strong>. Supports batch n (1–4, or 1–12 sequential), thinking mode, color palette, bbox regions on inputs, watermark, and seed.'
    },
    '/home/wan/2-7-image-pro': {
      title: 'What is Wan 2.7 Image Pro?',
      body: '<strong>Wan 2.7 Image Pro</strong> on FuseAITools (<code>wan-2-7-image-pro</code>) extends Image with <strong>4K resolution</strong> when there are no input images and sequential mode is disabled. Same prompt limit, reference cap, and advanced controls—built for high-fidelity frames you later animate in Wan video workflows.'
    }
  },
  faqByPath: {
    '/home/wan/2-7-image': [
      {
        question: 'When does Wan 2.7 Image use aspect ratio controls?',
        answer: 'Aspect ratio applies only when you generate <strong>without input images</strong>. If you upload reference images, the API omits aspect ratio and follows your inputs—use bbox regions to steer edits on specific areas.'
      },
      {
        question: 'What is sequential mode on Wan 2.7 Image?',
        answer: 'Sequential mode generates <strong>grouped image batches</strong> with n up to <strong>12</strong>. It disables thinking mode and the color palette. When off, n is capped at <strong>4</strong> and thinking mode is available for text-only runs.'
      }
    ],
    '/home/wan/2-7-image-pro': [
      {
        question: 'When can I use 4K on Wan 2.7 Image Pro?',
        answer: '4K appears when <strong>no input images</strong> are uploaded and <strong>sequential mode is off</strong>. With reference images or sequential enabled, resolution stays at 1K/2K—matching the form validation in FuseAITools.'
      },
      {
        question: 'How do Wan 2.7 images connect to Wan video?',
        answer: 'Export stills here, then upload them as <strong>first/last frames</strong> in <a href="/home/wan/v2-7-image-to-video" class="seo-inline-link">Wan 2.7 Image to Video</a>, as references in <a href="/home/wan/v2-7-r2v" class="seo-inline-link">R2V</a>, or animate via <a href="/home/wan/image-to-video" class="seo-inline-link">Wan 2.6 Image to Video</a>.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Wan 2.7 Image?',
      answer: 'No—Wan 2.7 Image runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
    },
    {
      question: 'How is Wan 2.7 Image priced on FuseAITools?',
      answer: 'Credits depend on model, resolution, and batch settings—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
      title: '🖼️ Wan 2.7 Image on FuseAITools',
      html: 'Wan 2.7 Image on <a href="/" class="seo-inline-link">FuseAITools</a> is Alibaba\'s <strong>still-image</strong> line—generate from text or edit up to <strong>9 reference images</strong> with prompts up to <strong>5000 characters</strong>. Choose <strong>Image</strong> for 1K/2K output or <strong>Image Pro</strong> for <strong>4K</strong> when generating without input images. Pair with <strong>Wan 2.7 video</strong> workflows to animate keyframes. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Wan 2.7 Image Core Features',
      items: [
        {
          icon: '🖼️',
          title: 'Text & Reference Editing',
          description: 'Prompt-only generation or edit with up to <strong>9 input images</strong>—bbox regions target specific areas when references are provided.'
        },
        {
          icon: '🎨',
          title: 'Color Palette & Thinking',
          description: '<strong>Thinking mode</strong> for text-only runs; optional <strong>3–10 color palette</strong> with ratio percentages totaling 100%.'
        },
        {
          icon: '📐',
          title: 'Flexible Formats',
          description: 'Eight aspect ratios including <strong>8:1</strong> and <strong>1:8</strong>—1K/2K on Image, plus <strong>4K</strong> on Image Pro when eligible.'
        },
        {
          icon: '🔗',
          title: 'Pairs with Wan Video',
          description: 'Still outputs feed <strong>Wan 2.7 I2V</strong>, <strong>R2V</strong>, and <strong>Wan 2.6</strong> video workflows on the same platform.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Hero keyframes for I2V',
        'Brand stills at 2K/4K',
        'Reference-driven edits',
        'Sequential storyboards',
        'Social & ultra-wide layouts'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Wan 2.7 Image vs Image Pro',
      ariaLabel: 'Wan 2.7 Image vs Image Pro',
      headers: ['Dimension', 'Wan 2.7 Image', 'Wan 2.7 Image Pro'],
      rows: [
        ['Model', '<code>wan-2-7-image</code>', '<code>wan-2-7-image-pro</code>'],
        [
          'Resolution',
          '<strong>1K / 2K</strong>',
          '1K / 2K + <strong>4K</strong> (text-only, sequential off)'
        ],
        ['Reference images', 'Up to <strong>9</strong> optional input URLs', 'Same'],
        ['Batch (n)', '<strong>1–4</strong> (or 1–12 in sequential mode)', 'Same'],
        ['Advanced controls', 'Thinking mode, color palette, bbox regions', 'Same (4K gated as above)']
      ]
    },
    {
      type: 'table',
      id: 'compare-30-heading',
      title: '🆚 From Wan 2.7 Image to Wan 3.0 Video',
      ariaLabel: 'Wan 2.7 Image vs Wan 3.0 parameters',
      headers: ['Aspect', 'Wan 2.7 Image / Pro', 'Wan 3.0 Video'],
      rows: [
        [
          'Output',
          'Stills: <strong>1K / 2K</strong> (Pro adds <strong>4K</strong>)',
          'Video: <strong>480p / 720p / 1080p</strong>, <strong>2–30s</strong>'
        ],
        ['Prompt', '1–5000 chars', '<strong>Up to 20000</strong> chars'],
        [
          'Media role',
          'Produces the frames / references',
          'Consumes them as <strong>first/last frame</strong> or ≤10 <strong>reference images</strong>'
        ],
        [
          'References',
          'Up to <strong>9</strong> input images (editing)',
          'Up to <strong>10</strong> images + 5 videos + 5 audio (Image1/Video1/Audio1)'
        ],
        ['Pricing', 'Per generation', '<strong>Per second × resolution</strong>']
      ],
      lead: 'Stills made here drop straight into the <strong>Wan 3.0 unified entry</strong>—as first/last frames or among up to 10 reference images. Key parameters side by side:'
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Wan 2.7 Image)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Wan 2.7 Image Technical Specs',
      ariaLabel: 'Wan 2.7 Image workflow capabilities',
      headers: ['Workflow', 'Input', 'Resolution', 'Aspect ratio', 'Key controls'],
      rows: [
        [
          '<strong>Wan 2.7 Image</strong>',
          'Prompt (1–5000 chars); optional ≤9 images',
          '1K / 2K',
          'When no input: 1:1, 16:9, 4:3, 21:9, 3:4, 9:16, 8:1, 1:8',
          'n 1–4 (1–12 sequential); thinking mode; color palette; bbox; seed'
        ],
        [
          '<strong>Wan 2.7 Image Pro</strong>',
          'Same as Image',
          '1K / 2K / <strong>4K</strong> (4K: no input, sequential off)',
          'Same (ignored when input images present)',
          'Same advanced controls as Image'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Wan form and API (<code>wan-2-7-image</code> / <code>wan-2-7-image-pro</code>).',
      note: 'When input images are uploaded, aspect ratio is omitted from the API. Sequential mode enables grouped output (n up to 12) and disables thinking mode and color palette.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Wan 2.7 — Two Image Workflows',
      lead: 'Image for 1K/2K; Image Pro when you need 4K hero assets:',
      items: [
        {
          name: 'Wan 2.7 Image',
          title: '2.7 Image',
          description: 'Text-to-image and image editing—1K/2K, up to 9 refs, thinking mode and color palette.',
          path: '/home/wan/2-7-image',
          icon: 'fas fa-image'
        },
        {
          name: 'Wan 2.7 Image Pro',
          title: '2.7 Image Pro',
          description: 'Same controls plus 4K output when generating from prompt only (no sequential).',
          path: '/home/wan/2-7-image-pro',
          icon: 'fas fa-images'
        }
      ]
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for Wan 2.7 Image per-generation costs.'
    },
    {
      pricing: false,
      html: '🎬 <strong>Wan video companion</strong> Turn stills into motion with <a href="/home/wan/v2-7-image-to-video" class="seo-inline-link" >Wan 2.7 Image to Video</a> (first/last frame or driving audio), build ensemble scenes in <a href="/home/wan/v2-7-r2v" class="seo-inline-link" >Wan 2.7 R2V</a> , or use <a href="/home/wan/image-to-video" class="seo-inline-link" >Wan 2.6 Image to Video</a> for fast multi-shot clips. Browse all <a href="/home/wan/v2-7-text-to-video" class="seo-inline-link" >Wan 2.7 video workflows →</a>'
    },
    {
      pricing: false,
      html: '🎬 Animate these stills in the <a href="/home/wan/v3-0-video" class="seo-inline-link" >Wan 3.0 unified entry</a> —use them as first/last frames or up to 10 reference images (2–30s, 480p–1080p), or try the faster <a href="/home/wan/v3-0-video-prime" class="seo-inline-link" >Wan 3.0 Prime →</a>'
    }
  ]
}
