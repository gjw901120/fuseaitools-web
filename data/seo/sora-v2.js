/**
 * SoraV2 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：SoraV2SeoContent.vue）
 */
export default {
  component: 'SoraV2SeoContent',
  rootId: 'sora-v2-section',
  rootClass: 'sora-seo',
  meta: {
    name: 'Sora 2 on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Sora 2 text-to-video and image-to-video on FuseAITools—prompts up to 10000 chars, portrait/landscape, 10s/15s, optional watermark removal.'
  },
  badge: '🎬 Sora 2 · Standard Video Generation · Two Workflows',
  introByPath: {
    '/home/sora/text-to-video': {
      title: '📝 Sora 2 Text to Video',
      lead: 'Generate videos from <strong>text prompts up to 10000 characters</strong> with OpenAI Sora 2. Choose <strong>portrait or landscape</strong> aspect ratio, <strong>10s or 15s</strong> duration, and optional <strong>watermark removal</strong>.'
    },
    '/home/sora/image-to-video': {
      title: '🖼️ Sora 2 Image to Video',
      lead: 'Upload <strong>up to 3 reference images</strong> and animate them with a text prompt (≤10000 chars). Sora 2 produces realistic motion with physics consistency, supporting portrait and landscape formats at 10s or 15s.'
    }
  },
  definitionByPath: {
    '/home/sora/text-to-video': {
      title: 'What is Sora 2 Text to Video?',
      body: '<strong>Sora 2 Text to Video</strong> on FuseAITools (<code>sora-2-text-to-video</code>) generates videos from a text prompt (≤10000 characters). Configure <strong>aspect ratio</strong> (portrait/landscape), <strong>duration</strong> (10s/15s), and toggle <strong>watermark removal</strong>. Ideal for social content, marketing videos, and creative prototyping.'
    },
    '/home/sora/image-to-video': {
      title: 'What is Sora 2 Image to Video?',
      body: '<strong>Sora 2 Image to Video</strong> on FuseAITools (<code>sora-2-image-to-video</code>) animates <strong>up to 3 reference images</strong> with a text prompt (≤10000 chars). Same aspect ratio and duration controls as T2V. Use it to bring product photos, character art, or storyboards to life with natural motion.'
    }
  },
  faqByPath: {
    '/home/sora/text-to-video': [
      {
        question: 'What are the duration options for Sora 2 text-to-video?',
        answer: 'Two options: <strong>10 seconds</strong> (standard) or <strong>15 seconds</strong> (extended motion). Choose based on your content needs—shorter clips for social media, longer for storytelling or product demonstrations.'
      },
      {
        question: 'What aspect ratios does Sora 2 text-to-video support?',
        answer: 'Two aspect ratios: <strong>portrait</strong> (9:16, ideal for mobile/social) and <strong>landscape</strong> (16:9, ideal for widescreen). Unlike Sora 2 Pro, there is no square or custom ratio option.'
      }
    ],
    '/home/sora/image-to-video': [
      {
        question: 'How many images can I upload for Sora 2 image-to-video?',
        answer: 'Up to <strong>3 images</strong> (JPG, PNG, or WebP, max 10MB each). Upload at least one image when using I2V mode. The images serve as visual anchors for the generated video motion.'
      },
      {
        question: 'Does Sora 2 image-to-video support watermark removal?',
        answer: 'Yes, the <strong>remove watermark</strong> toggle is available on both Sora 2 T2V and I2V workflows. It removes the OpenAI Sora watermark from the generated output.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Sora 2?',
      answer: 'No—Sora 2 runs entirely in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
    },
    {
      question: 'How is Sora 2 priced on FuseAITools?',
      answer: 'Credits are shown on the Generate button before each run. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
      title: '🎬 Sora 2 on FuseAITools',
      html: '<strong>Sora 2</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> is OpenAI\'s standard video generation tier—realistic motion, physics consistency, and improved control over style and scene. Generate from <strong>text prompts up to 10000 characters</strong> or animate <strong>reference images</strong> with <strong>portrait or landscape</strong> aspect ratios at <strong>10s or 15s</strong> duration. Optional watermark removal. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Sora 2 Core Features',
      items: [
        {
          icon: '🎥',
          title: 'OpenAI Sora Quality',
          description: 'Powered by OpenAI\'s <strong>Sora 2 model</strong>—realistic motion, physics consistency, and improved control over style, scene, and aspect ratio for creative and social content.'
        },
        {
          icon: '📝',
          title: 'Long Prompt Support',
          description: 'Prompts up to <strong>10000 characters</strong> allow detailed scene descriptions, complex narratives, and precise motion instructions for accurate video generation.'
        },
        {
          icon: '🖼️',
          title: 'Image-to-Video Animation',
          description: 'Upload <strong>up to 3 reference images</strong> and animate them with descriptive prompts. The model preserves visual identity while generating natural movement.'
        },
        {
          icon: '⏱️',
          title: 'Flexible Duration',
          description: 'Choose between <strong>10s and 15s</strong> output duration. Shorter for punchy social clips, longer for more detailed scene exploration.'
        },
        {
          icon: '💧',
          title: 'Watermark Control',
          description: 'Built-in <strong>watermark removal</strong> toggle gives you clean, publish-ready output without post-processing.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Social media video content',
        'Marketing & ad creatives',
        'Product showcase animations',
        'Concept visualization & prototyping',
        'Short-form storytelling'
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Sora 2)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Sora 2 Technical Specs',
      ariaLabel: 'Sora 2 workflow capabilities',
      headers: ['Workflow', 'Input', 'Aspect ratio', 'Duration', 'Key controls'],
      rows: [
        [
          '<strong>Text to Video</strong>',
          'Prompt ≤10000 chars',
          'portrait / landscape',
          '10s / 15s',
          'Prompt + aspect ratio + frames + remove watermark'
        ],
        [
          '<strong>Image to Video</strong>',
          'Prompt ≤10000 chars + up to 3 reference images',
          'portrait / landscape',
          '10s / 15s',
          'Prompt + images + aspect ratio + frames + remove watermark'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Sora 2 form and API (<code>sora-2-*</code> models).',
      note: 'Image inputs: JPG, PNG, WebP (max 10MB each, up to 3 images). The remove-watermark option is available on both T2V and I2V. Prompts exceeding 10000 characters will be rejected.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Sora 2 — Two Standard Workflows',
      lead: 'Choose the mode that matches your task:',
      items: [
        {
          name: 'Sora 2 Text to Video',
          title: 'Text to Video',
          description: 'Generate videos from text prompts up to 10000 chars—portrait/landscape, 10s or 15s, optional watermark removal.',
          path: '/home/sora/text-to-video',
          icon: 'fas fa-keyboard'
        },
        {
          name: 'Sora 2 Image to Video',
          title: 'Image to Video',
          description: 'Animate up to 3 reference images with a text prompt—full aspect ratio and duration controls.',
          path: '/home/sora/image-to-video',
          icon: 'fas fa-image'
        }
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Sora 2 vs Sora 2 Pro',
      ariaLabel: 'Sora 2 vs Sora 2 Pro',
      headers: ['Dimension', 'Sora 2 (Standard)', 'Sora 2 Pro'],
      rows: [
        [
          'Positioning',
          'Standard video generation with essential controls',
          'Pro-grade generation with size tiers and storyboard'
        ],
        [
          'Workflows',
          '<strong>Two</strong>—T2V, I2V',
          '<strong>Three</strong>—Pro T2V, Pro I2V, Pro Storyboard'
        ],
        ['Prompt limit', '<strong>10000</strong> characters', '<strong>10000</strong> characters'],
        [
          'Duration',
          '<strong>10s / 15s</strong>',
          'T2V/I2V: <strong>10s / 15s</strong>; Storyboard: <strong>10s / 15s / 25s</strong>'
        ],
        ['Size control', 'Not available—single quality', '<strong>Standard / High</strong> (T2V & I2V)'],
        [
          'Multi-scene',
          'Single-scene only',
          'Storyboard: <strong>multi-scene</strong> with per-shot duration'
        ],
        [
          'Reference images',
          'Up to <strong>3</strong> images (I2V)',
          'Up to <strong>3</strong> images (I2V & Storyboard optional)'
        ],
        ['Watermark removal', '✅ Available', '✅ Available (T2V & I2V)'],
        [
          'Best for',
          'Standard text/image-to-video with clean controls',
          'Higher quality, multi-shot narratives & storyboard'
        ]
      ]
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for Sora 2 per-generation costs.'
    },
    {
      pricing: false,
      html: '🚀 <strong>Need higher quality or multi-scene storyboards?</strong> <a href="/home/sora/pro-text-to-video" class="seo-inline-link" >Upgrade to Sora 2 Pro Text to Video →</a> with <strong>standard/high size</strong> control, or <a href="/home/sora/pro-image-to-video" class="seo-inline-link" >Sora 2 Pro Image to Video</a> for pro-grade I2V. For multi-scene narratives, use <a href="/home/sora/pro-storyboard" class="seo-inline-link" >Sora 2 Pro Storyboard →</a> with up to <strong>25s</strong> and per-shot scene control.'
    }
  ]
}
