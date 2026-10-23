/**
 * SoraPro SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：SoraProSeoContent.vue）
 */
export default {
  component: 'SoraProSeoContent',
  rootId: 'sora-pro-section',
  rootClass: 'sora-seo',
  meta: {
    name: 'Sora 2 Pro on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Sora 2 Pro text-to-video, image-to-video, and storyboard on FuseAITools—size control (standard/high), multi-scene storyboard, 10s/15s/25s duration.'
  },
  badge: '🌟 Sora 2 Pro · Pro-Grade Video Generation · Three Workflows',
  introByPath: {
    '/home/sora/pro-text-to-video': {
      title: '📝 Sora 2 Pro Text to Video',
      lead: 'Pro-grade text-to-video generation with <strong>standard or high quality size</strong> control, <strong>10s or 15s</strong> duration, and <strong>watermark removal</strong>. Prompts up to 10000 characters.'
    },
    '/home/sora/pro-image-to-video': {
      title: '🖼️ Sora 2 Pro Image to Video',
      lead: 'Professional image-to-video with <strong>size control (standard/high)</strong>, <strong>up to 3 reference images</strong>, and full aspect ratio and duration options. Watermark removal included.'
    },
    '/home/sora/pro-storyboard': {
      title: '📖 Sora 2 Pro Storyboard',
      lead: 'Create <strong>multi-scene narratives</strong> with per-shot descriptions and individual duration settings. Supports <strong>10s, 15s, or 25s</strong> total duration with optional reference images for visual consistency across shots.'
    }
  },
  definitionByPath: {
    '/home/sora/pro-text-to-video': {
      title: 'What is Sora 2 Pro Text to Video?',
      body: '<strong>Sora 2 Pro Text to Video</strong> on FuseAITools (<code>sora-2-pro-text-to-video</code>) generates videos from text prompts (≤10000 chars) with an additional <strong>size control</strong> (standard or high), offering higher quality output than Sora 2 standard.'
    },
    '/home/sora/pro-image-to-video': {
      title: 'What is Sora 2 Pro Image to Video?',
      body: '<strong>Sora 2 Pro Image to Video</strong> on FuseAITools (<code>sora-2-pro-image-to-video</code>) animates <strong>up to 3 reference images</strong> with size control (standard/high) for superior output quality. Ideal for professional content pipelines.'
    },
    '/home/sora/pro-storyboard': {
      title: 'What is Sora 2 Pro Storyboard?',
      body: '<strong>Sora 2 Pro Storyboard</strong> on FuseAITools (<code>sora-2-pro-storyboard</code>) is a <strong>multi-scene video builder</strong> that lets you define a sequence of shots with individual descriptions and durations. Total duration options: <strong>10s, 15s, or 25s</strong>. Optional reference images maintain visual consistency across scenes.'
    }
  },
  faqByPath: {
    '/home/sora/pro-text-to-video': [
      {
        question: 'What is the difference between Sora 2 Pro text-to-video and the standard Sora 2?',
        answer: 'Sora 2 Pro adds a <strong>size control</strong> (standard/high) that lets you choose output quality. Standard size matches Sora 2 quality while high delivers superior fidelity. Pro T2V also shares infrastructure with the Pro I2V and Storyboard workflows for a unified pro pipeline.'
      },
      {
        question: 'Does Sora 2 Pro text-to-video support the same duration and aspect ratio as Sora 2?',
        answer: 'Yes—<strong>10s/15s</strong> duration and <strong>portrait/landscape</strong> aspect ratios, plus the same <strong>watermark removal</strong> toggle and <strong>10000-char prompt</strong> limit.'
      }
    ],
    '/home/sora/pro-image-to-video': [
      {
        question: 'How many images can I use in Sora 2 Pro image-to-video?',
        answer: 'Up to <strong>3 images</strong> (JPG, PNG, WebP, max 10MB each). Unlike the standard Sora 2 I2V, the Pro version adds the <strong>size control (standard/high)</strong> for improved output quality.'
      },
      {
        question: 'Is watermark removal available in Sora 2 Pro image-to-video?',
        answer: 'Yes—the <strong>remove watermark</strong> toggle is available on both Pro T2V and Pro I2V workflows. It is not available on the Pro Storyboard workflow.'
      }
    ],
    '/home/sora/pro-storyboard': [
      {
        question: 'How does the Sora 2 Pro Storyboard shot builder work?',
        answer: 'Each shot requires a <strong>scene description</strong> and a <strong>duration in seconds</strong>. You can add or remove shots, and the total scene duration must exactly match the selected total duration (10s, 15s, or 25s). Optional reference images can be uploaded to maintain visual consistency.'
      },
      {
        question: 'What is the maximum duration for Sora 2 Pro Storyboard?',
        answer: '<strong>25 seconds</strong>—significantly longer than the 10s/15s limit on standard Sora 2 or Pro T2V/I2V. This makes it ideal for short films, product narratives, and multi-scene storytelling. Storyboard does not include the watermark removal option.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Sora 2 Pro?',
      answer: 'No—Sora 2 Pro runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
    },
    {
      question: 'How is Sora 2 Pro priced on FuseAITools?',
      answer: 'Credits depend on the model, selected duration, and size (standard/high). The exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
      title: '🌟 Sora 2 Pro on FuseAITools',
      html: '<strong>Sora 2 Pro</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> is the professional-tier of OpenAI\'s Sora video generation—<strong>three workflows</strong> covering pro T2V, pro I2V, and <strong>multi-scene storyboard</strong> with per-shot duration control. Choose <strong>standard or high quality size</strong>, durations from <strong>10s to 25s</strong>, and craft complex narratives with the built-in shot builder. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Sora 2 Pro Core Features',
      items: [
        {
          icon: '📐',
          title: 'Size Control (Standard / High)',
          description: 'Choose <strong>standard</strong> for speed or <strong>high</strong> for superior fidelity on Pro T2V and I2V. Credits scale with the selected size tier.'
        },
        {
          icon: '📖',
          title: 'Multi-Scene Storyboard',
          description: 'The <strong>storyboard workflow</strong> lets you build multi-shot narratives with individual scene descriptions and per-shot durations. Total duration up to <strong>25 seconds</strong>—ideal for complex storytelling.'
        },
        {
          icon: '🎥',
          title: 'Pro-Grade Output Quality',
          description: 'Sora 2 Pro delivers <strong>enhanced fidelity and motion coherence</strong> compared to the standard tier, with professional-grade results suitable for client work and production pipelines.'
        },
        {
          icon: '🖼️',
          title: 'Image-to-Video Animation',
          description: 'Upload <strong>up to 3 reference images</strong> for Pro I2V and Storyboard. The model maintains visual identity while generating natural motion across the output.'
        },
        {
          icon: '⏱️',
          title: 'Flexible Duration & Watermark Control',
          description: 'Choose from <strong>10s, 15s, or 25s</strong> (storyboard only). Watermark removal toggle available on Pro T2V and I2V for clean, publish-ready output.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Professional video production',
        'Multi-scene storytelling & narratives',
        'High-fidelity marketing content',
        'Client presentations & pitch videos',
        'Complex scene sequencing with shot-by-shot control'
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Sora 2 Pro)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Sora 2 Pro Technical Specs',
      ariaLabel: 'Sora 2 Pro workflow capabilities',
      headers: ['Workflow', 'Input', 'Duration', 'Size', 'Key controls'],
      rows: [
        [
          '<strong>Pro Text to Video</strong>',
          'Prompt ≤10000 chars',
          '10s / 15s',
          'standard / high',
          'Prompt + size + aspect ratio + frames + remove watermark'
        ],
        [
          '<strong>Pro Image to Video</strong>',
          'Prompt ≤10000 chars + up to 3 reference images',
          '10s / 15s',
          'standard / high',
          'Prompt + images + size + aspect ratio + frames + remove watermark'
        ],
        [
          '<strong>Pro Storyboard</strong>',
          'Per-shot descriptions + optional reference images',
          '10s / 15s / <strong>25s</strong>',
          'Fixed (high quality)',
          'Multi-shot builder + per-shot duration + aspect ratio + optional images'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Sora 2 Pro form and API (<code>sora-2-pro-*</code> models).',
      note: 'Image inputs: JPG, PNG, WebP (max 10MB each, up to 3 images). Storyboard supports optional reference images for visual consistency across shots. Pro T2V and I2V include the standard/high size toggle and watermark removal.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Sora 2 Pro — Three Pro Workflows',
      lead: 'Choose the mode that matches your task:',
      items: [
        {
          name: 'Sora 2 Pro Text to Video',
          title: 'Pro Text to Video',
          description: 'Pro-grade text-to-video with standard/high size control, 10s/15s duration, and watermark removal.',
          path: '/home/sora/pro-text-to-video',
          icon: 'fas fa-magic'
        },
        {
          name: 'Sora 2 Pro Image to Video',
          title: 'Pro Image to Video',
          description: 'Animate up to 3 reference images with pro quality—size and duration controls.',
          path: '/home/sora/pro-image-to-video',
          icon: 'fas fa-wand-magic-sparkles'
        },
        {
          name: 'Sora 2 Pro Storyboard',
          title: 'Pro Storyboard',
          description: 'Multi-scene narratives with per-shot descriptions and duration. Up to 25s total.',
          path: '/home/sora/pro-storyboard',
          icon: 'fas fa-book'
        }
      ]
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for Sora 2 Pro per-generation costs.'
    }
  ]
}
