/**
 * GrokVideo SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：GrokVideoSeoContent.vue）
 */
export default {
  component: 'GrokVideoSeoContent',
  rootId: 'grok-video-section',
  rootClass: 'grok-seo',
  meta: {
    name: 'Grok Imagine Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Grok Imagine text-to-video, image-to-video, Video 1.5 Preview, upscale, and extend on FuseAITools—6-30s clips up to 1080p with fun, normal, or spicy motion modes, plus a unified text/image 1.5 preview entry at 480p/720p, billed per second.'
  },
  badge: '🎬 Grok Imagine · xAI Video · Five Workflows',
  introByPath: {
    '/home/grok/text-to-video': {
      title: '🎬 Grok Text to Video',
      lead: 'Write a <strong>prompt</strong> (≤5000 chars), pick <strong>aspect ratio</strong> (2:3 through 9:16), <strong>motion mode</strong> (fun / normal / spicy), a <strong>duration</strong> on the 6–30s slider, and <strong>resolution</strong> (480p / 720p / 1080p) via <code>grok-imagine-text-to-video</code>.'
    },
    '/home/grok/image-to-video': {
      title: '🖼️ Grok Image to Video',
      lead: 'Upload up to <strong>7 images</strong> (JPEG/PNG/WebP, max 10MB each) and/or add a prompt. Configure motion mode, duration, resolution, and aspect ratio through <code>grok-imagine-image-to-video</code>.'
    },
    '/home/grok/video-1-5-preview': {
      title: '🧩 Grok Video 1.5 Preview',
      lead: 'One unified endpoint for text-to-video (prompt ≤4096) or image-to-video (up to <strong>7 images</strong>). Pick <strong>aspect ratio</strong> (incl. auto; ignored on a single image), <strong>1–15s</strong> duration, and <strong>480p / 720p</strong> resolution via <code>grok-imagine-video-1-5-preview</code>.'
    },
    '/home/grok/upscale': {
      title: '⬆️ Grok Upscale',
      lead: 'Select an <strong>Original Task</strong> from your completed Grok generations, then pick a target <strong>720p</strong> or <strong>1080p</strong>—no prompt required. Model: <code>grok-imagine-upscale</code>.'
    },
    '/home/grok/extend': {
      title: '⏩ Grok Extend',
      lead: 'Pick a prior <strong>task ID</strong>, enter a continuation <strong>prompt</strong> (≤5000), set <strong>extend_at</strong>, choose extend length (6s/10s), and resolution (480p/720p) via <code>grok-imagine-extend</code>.'
    }
  },
  definitionByPath: {
    '/home/grok/text-to-video': {
      title: 'What is Grok Text to Video?',
      body: '<strong>Grok Text to Video</strong> (<code>grok-imagine-text-to-video</code>) on FuseAITools generates a clip from text. Required: <strong>prompt</strong> (max 5000). Optional controls: aspect ratio, motion mode, 6–30s duration slider, 480p/720p/1080p resolution.'
    },
    '/home/grok/image-to-video': {
      title: 'What is Grok Image to Video?',
      body: '<strong>Grok Image to Video</strong> (<code>grok-imagine-image-to-video</code>) animates uploaded stills. Required: <strong>prompt and/or at least one image</strong>. Up to 7 reference images; spicy mode is disabled when images are present.'
    },
    '/home/grok/video-1-5-preview': {
      title: 'What is Grok Video 1.5 Preview?',
      body: '<strong>Grok Video 1.5 Preview</strong> (<code>grok-imagine-video-1-5-preview</code>) is a unified generation entry: no images runs text-to-video, images run image-to-video (up to 7). Controls: optional prompt (max 4096), aspect ratio including auto (ignored in single-image mode), 1–15s duration, 480p/720p resolution, and an NSFW safety toggle. There is no separate motion mode.'
    },
    '/home/grok/upscale': {
      title: 'What is Grok Upscale?',
      body: '<strong>Grok Upscale</strong> (<code>grok-imagine-upscale</code>) enhances output from a prior Grok generation. Required: <strong>task_id</strong> from the Original Task dropdown plus a target <strong>scene</strong> (<code>upscale-720p</code> / <code>upscale-1080p</code>)—no prompt field. 1080p source clips cannot be upscaled.'
    },
    '/home/grok/extend': {
      title: 'What is Grok Extend?',
      body: '<strong>Grok Extend</strong> (<code>grok-imagine-extend</code>) continues an existing Grok clip. Required: <strong>task_id</strong> + <strong>prompt</strong>. Set extend_at (start frame), extend length (6s/10s), and resolution.'
    }
  },
  faqByPath: {
    '/home/grok/text-to-video': [
      {
        question: 'Is a prompt required for Grok text-to-video?',
        answer: 'Yes—the Generate button requires a <strong>prompt</strong> up to <strong>5000 characters</strong> before submission.'
      },
      {
        question: 'What motion modes does Grok text-to-video support?',
        answer: '<strong>fun</strong>, <strong>normal</strong>, and <strong>spicy</strong>—pick the intensity that matches your scene. Normal is a solid default for most social clips.'
      }
    ],
    '/home/grok/image-to-video': [
      {
        question: 'Can Grok image-to-video run without a prompt?',
        answer: 'Yes—submit <strong>reference images alone</strong> or combine uploads with an optional prompt (max 5000 chars). At least one of prompt or images is required.'
      },
      {
        question: 'Why is spicy mode disabled after I upload images?',
        answer: 'The form disables <strong>spicy</strong> when reference images are present on Image to Video—use <strong>fun</strong> or <strong>normal</strong> instead.'
      }
    ],
    '/home/grok/video-1-5-preview': [
      {
        question: 'Is Grok Video 1.5 Preview text-to-video or image-to-video?',
        answer: 'Both from one entry—submit a <strong>prompt</strong> alone for text-to-video, or add up to <strong>7 reference images</strong> for image-to-video. At least one of prompt or images is required.'
      },
      {
        question: 'Why is the aspect ratio greyed out on Grok Video 1.5 Preview?',
        answer: 'When exactly <strong>one reference image</strong> is uploaded, aspect ratio is ignored (the image sets framing). The selector unlocks at 0 or 2–7 inputs.'
      }
    ],
    '/home/grok/upscale': [
      {
        question: 'Where does the Original Task on Grok Upscale come from?',
        answer: 'The dropdown lists <strong>completed Grok generations</strong> tied to your account. Pick the task whose output you want to upscale—no prompt is needed.'
      },
      {
        question: 'Can I upscale any video with Grok Upscale?',
        answer: 'Upscale expects a <strong>Grok task_id</strong> from a prior Grok run on FuseAITools—not arbitrary external URLs. Pick a 720p or 1080p target; 1080p source clips are not supported.'
      }
    ],
    '/home/grok/extend': [
      {
        question: 'What does extend_at control on Grok Extend?',
        answer: '<strong>extend_at</strong> is the timeline position where continuation begins—pick a visually stable frame to reduce jump cuts in the extended clip.'
      },
      {
        question: 'Is a prompt required for Grok Extend?',
        answer: 'Yes—describe how the scene should continue (max <strong>5000 characters</strong>) along with the selected Original Task.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Grok Imagine video?',
      answer: 'No—Grok Imagine video runs in the cloud on FuseAITools. Credits update on Generate when you change duration or resolution.'
    },
    {
      question: 'How is Grok Imagine video priced on FuseAITools?',
      answer: 'Text-to-video and image-to-video are billed <strong>per second</strong> (the RULE <code>duration=1</code> rate × your 6–30s choice) at the selected <strong>resolution</strong> (480p/720p/1080p). Video 1.5 Preview uses the same <strong>per-second</strong> model × your 1–15s choice at 480p/720p. Extend uses <strong>duration</strong> (6s/10s) + <strong>resolution</strong> (480p/720p) for RULE credits. Upscale matches RULE credits by the source task <strong>resolution</strong> and <strong>duration</strong> plus the target <strong>scene</strong> (<code>upscale-720p</code>/<code>upscale-1080p</code>). See <a href="/pricing" class="seo-pricing-link">pricing</a>. New users get <strong>20 free credits</strong> on sign-up.'
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
      title: '🎬 Grok Imagine Video on FuseAITools',
      html: '<strong>Grok Imagine video</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> covers short clip generation and post steps— <strong>text-to-video</strong>, <strong>image-to-video</strong>, <strong>Video 1.5 Preview</strong>, <strong>upscale</strong>, and <strong>extend</strong>. <strong>Video 1.5 Preview</strong> is a unified entry—one endpoint for text-to-video or up to 7 reference images at 480p/720p, 1–15s. On text and image to video, pick aspect ratio, motion mode, a <strong>6–30s duration slider</strong>, and resolution (<strong>480p / 720p / 1080p</strong>); extend keeps 6s/10s at 480p/720p. Need stills first? Use <a href="/home/grok/text-to-image" class="seo-inline-link">Grok Text to Image</a>. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Grok Video Core Features',
      items: [
        {
          icon: '🎬',
          title: 'T2V & I2V',
          description: 'Generate <strong>6–30s</strong> clips up to <strong>1080p</strong> from prompts or up to <strong>7 reference images</strong>.'
        },
        {
          icon: '🧩',
          title: 'Video 1.5 Preview',
          description: 'Unified entry—text or up to <strong>7 images</strong> at <strong>480p/720p</strong>, <strong>1–15s</strong>, aspect incl. auto.'
        },
        {
          icon: '🎛️',
          title: 'Motion Modes',
          description: '<strong>fun / normal / spicy</strong> on generate modes—spicy disabled when I2V has uploads.'
        },
        {
          icon: '⬆️',
          title: 'Upscale & Extend',
          description: 'Reuse <strong>task IDs</strong> to sharpen output or continue a winning shot.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'xAI Grok Imagine video—credits by duration and resolution before generate.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: ['Social clips', 'Product motion', 'Storyboard previews', 'Clip continuation']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Grok Video Workflows Compared',
      ariaLabel: 'Grok video workflow comparison',
      headers: ['Dimension', 'T2V', 'I2V', 'Preview', 'Upscale', 'Extend'],
      rows: [
        [
          '<strong>Input</strong>',
          'Prompt',
          'Images and/or prompt',
          'Prompt and/or up to 7 images',
          'Original task ID',
          'Task ID + prompt'
        ],
        [
          '<strong>modelKey</strong>',
          '<code>grok-imagine-text-to-video</code>',
          '<code>grok-imagine-image-to-video</code>',
          '<code>grok-imagine-video-1-5-preview</code>',
          '<code>grok-imagine-upscale</code>',
          '<code>grok-imagine-extend</code>'
        ],
        ['<strong>Motion mode</strong>', 'fun / normal / spicy', 'fun / normal / spicy*', '—', '—', '—'],
        ['<strong>Duration</strong>', '6–30s (slider)', '6–30s (slider)', '1–15s (slider)', '—', 'Extend 6s / 10s'],
        [
          '<strong>Resolution</strong>',
          '480p / 720p / 1080p',
          '480p / 720p / 1080p',
          '480p / 720p',
          '720p / 1080p target',
          '480p / 720p'
        ],
        [
          '<strong>Best for</strong>',
          'Motion from scratch',
          'Animate a poster or product still',
          'Unified T2V + I2V preview',
          'Sharpen a prior Grok clip',
          'Continue a successful shot'
        ]
      ],
      note: '*Spicy mode is disabled in the form when reference images are uploaded on Image to Video.'
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Grok Imagine Video)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Grok Video Technical Specs',
      ariaLabel: 'Grok video capabilities',
      headers: ['Workflow', 'Required', 'Key controls'],
      rows: [
        [
          '<strong>Text to Video</strong>',
          'Prompt (≤5000)',
          'Aspect 2:3–9:16; mode fun/normal/spicy; 6–30s slider; 480p/720p/1080p'
        ],
        [
          '<strong>Image to Video</strong>',
          'Prompt and/or up to 7 images',
          'Same as T2V; JPEG/PNG/WebP max 10MB each'
        ],
        [
          '<strong>Video 1.5 Preview</strong>',
          'Prompt and/or up to 7 images',
          'Unified entry; aspect incl. auto (ignored on single image); 1–15s slider; 480p/720p; NSFW toggle; no motion mode'
        ],
        [
          '<strong>Upscale</strong>',
          'Original task ID + target Resolution',
          'Target 720p / 1080p (submits <code>scene: upscale-720p / upscale-1080p</code>); 720p source locks to 1080p; 1080p source unsupported'
        ],
        ['<strong>Extend</strong>', 'Task ID + prompt (≤5000)', 'extend_at; extend 6s/10s; 480p/720p']
      ],
      lead: 'Parameters match the FuseAITools Grok video form.',
      note: 'T2V / I2V: per-second rate (RULE <code>duration=1</code>) × chosen 6–30s duration, at the selected resolution. Video 1.5 Preview: same per-second model × chosen 1–15s at 480p/720p. Extend: RULE credits by <strong>duration</strong> + <strong>resolution</strong>. Upscale: RULE credits matched by the source task <strong>resolution</strong> + <strong>duration</strong> + target <strong>scene</strong> (<code>upscale-720p</code> / <code>upscale-1080p</code>); switching target recomputes the price.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Grok Imagine — Five Video Workflows',
      items: [
        {
          name: 'Grok Text to Video',
          title: 'Text to Video',
          description: 'Prompt-driven 6–30s clips up to 1080p—aspect, mode, resolution.',
          path: '/home/grok/text-to-video',
          icon: 'fas fa-font'
        },
        {
          name: 'Grok Image to Video',
          title: 'Image to Video',
          description: 'Up to 7 images and/or prompt—animate stills.',
          path: '/home/grok/image-to-video',
          icon: 'fas fa-film'
        },
        {
          name: 'Grok Video 1.5 Preview',
          title: 'Video 1.5 Preview',
          description: 'Unified text/image entry—480p/720p, 1–15s.',
          path: '/home/grok/video-1-5-preview',
          icon: 'fas fa-bolt'
        },
        {
          name: 'Grok Upscale',
          title: 'Upscale',
          description: 'Enhance a completed Grok task output.',
          path: '/home/grok/upscale',
          icon: 'fas fa-up-right-and-down-left-from-center'
        },
        {
          name: 'Grok Extend',
          title: 'Extend',
          description: 'Continue a clip with prompt + extend_at.',
          path: '/home/grok/extend',
          icon: 'fas fa-video'
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
      html: '🖼️ Need a hero still before animating? <a href="/home/grok/text-to-image" class="seo-inline-link">Grok Text to Image →</a> or <a href="/home/grok/image-to-image" class="seo-inline-link">Image to Image</a> for reference-driven variations—then return here for <a href="/home/grok/image-to-video" class="seo-inline-link">Image to Video</a>.'
    }
  ]
}
