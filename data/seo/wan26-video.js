/**
 * Wan26Video SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：Wan26VideoSeoContent.vue）
 */
export default {
  component: 'Wan26VideoSeoContent',
  rootId: 'wan-26-section',
  rootClass: 'wan-seo',
  meta: {
    name: 'Wan 2.6 Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Wan 2.6 text, image, and video-to-video workflows on FuseAITools—multi-shot clips up to 15s at 720p or 1080p.'
  },
  badge: '🎭 Wan 2.6 · Role-Play & Multi-Shot Video · January 2026',
  introByPath: {
    '/home/wan/text-to-video': {
      title: '📝 Wan 2.6 Text to Video',
      lead: 'Describe scenes in natural language—Wan 2.6 builds <strong>single or multi-shot</strong> clips with subject consistency. Set duration (5/10/15s) and 720p or 1080p without filming.'
    },
    '/home/wan/image-to-video': {
      title: '🖼️ Wan 2.6 Image to Video',
      lead: 'Upload one or more still images and guide motion with a prompt. Wan 2.6 animates while keeping <strong>look and style</strong> stable—ideal for product heroes and character teasers.'
    },
    '/home/wan/video-to-video': {
      title: '🎬 Wan 2.6 Video to Video',
      lead: 'Upload a source clip (MP4, MOV, MKV) and describe the transformation—<strong>restyle, mood, or content changes</strong> with a new prompt. Output is 5 or 10 seconds at 720p/1080p (15s UI maps to 10s API).'
    }
  },
  definitionByPath: {
    '/home/wan/text-to-video': {
      title: 'What is Wan 2.6 Text to Video?',
      body: '<strong>Wan 2.6 Text to Video</strong> on FuseAITools turns a text prompt into a short MP4 clip. It supports <strong>5, 10, or 15 second</strong> duration, <strong>720p or 1080p</strong>, and <strong>single or multi-shot</strong> composition—built for social clips and story beats without a camera crew.'
    },
    '/home/wan/image-to-video': {
      title: 'What is Wan 2.6 Image to Video?',
      body: '<strong>Wan 2.6 Image to Video</strong> on FuseAITools animates your still images with a motion prompt. Upload image URL(s), choose <strong>5/10/15s</strong> and <strong>720p/1080p</strong>, and toggle <strong>multi-shot</strong> for narrative transitions—ideal for product demos and illustrated characters.'
    },
    '/home/wan/video-to-video': {
      title: 'What is Wan 2.6 Video to Video?',
      body: '<strong>Wan 2.6 Video to Video</strong> on FuseAITools transforms an uploaded video with a new prompt—restyle footage, shift mood, or adapt content for another channel. Output length is <strong>5 or 10 seconds</strong> at <strong>720p/1080p</strong> (the 15s control maps to 10s in the API).'
    }
  },
  faqByPath: {
    '/home/wan/text-to-video': [
      {
        question: 'How does Wan 2.6 text-to-video work on FuseAITools?',
        answer: 'Yes—enter a prompt (1–5000 characters), pick <strong>5, 10, or 15 seconds</strong>, choose <strong>720p or 1080p</strong>, and enable or disable <strong>multi-shot</strong>. The model returns an MP4 you can download from your generation history.'
      },
      {
        question: 'What is multi-shot mode in Wan 2.6 text-to-video?',
        answer: 'Multi-shot mode tells Wan 2.6 to plan <strong>multiple shots with transitions</strong> instead of one continuous take—useful for short story beats and social narratives.'
      }
    ],
    '/home/wan/image-to-video': [
      {
        question: 'What images can I use for Wan 2.6 image-to-video?',
        answer: 'Upload image URL(s) in <strong>JPEG, PNG, or WebP</strong> (minimum <strong>256×256px</strong>, max <strong>10MB</strong> per file). Add a prompt describing motion, then set duration, resolution, and multi-shot like text-to-video.'
      },
      {
        question: 'Do I need a prompt for Wan 2.6 image-to-video?',
        answer: 'Yes—a prompt (1–5000 characters) guides how the stills move. Without clear motion direction, results may look static or off-brief.'
      }
    ],
    '/home/wan/video-to-video': [
      {
        question: 'How does Wan 2.6 video-to-video differ from Wan 2.7 R2V?',
        answer: 'Wan 2.6 video-to-video <strong>transforms one uploaded clip</strong> with a prompt (5/10s output). Wan 2.7 <strong>R2V</strong> combines up to <strong>5 reference images/videos</strong> to lock multiple characters—use R2V for ensemble role-play scenes.'
      },
      {
        question: 'Why does Wan 2.6 video-to-video show 15 seconds but output 10?',
        answer: 'The form may show 15s for consistency with other 2.6 modes, but the API maps that choice to <strong>10 seconds</strong> for video-to-video. Pick <strong>5s</strong> or <strong>10s</strong> when you need an exact length.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU to run Wan 2.6?',
      answer: 'No. Wan 2.6 runs entirely in the cloud on FuseAITools—use any modern browser; no CUDA or local install required.'
    },
    {
      question: 'How do I try Wan 2.6 on FuseAITools?',
      answer: 'Open any Wan 2.6 workflow above and generate. New users receive <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for credit packs and member rates.'
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
      title: '🎭 Wan 2.6 on FuseAITools',
      html: 'Wan 2.6 on <a href="/" class="seo-inline-link">FuseAITools</a> focuses on <strong>role-play style video</strong> with multi-shot storytelling and strong subject consistency. Choose text-to-video, image-to-video, or video-to-video—each runs in the cloud with <strong>credit-based pricing</strong> and no local GPU.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Wan 2.6 Core Features',
      items: [
        {
          icon: '🎬',
          title: 'Multi-Shot Composition',
          description: 'Toggle <strong>single or multi-shot</strong> on text, image, and video-to-video—plan short narratives without an edit timeline.'
        },
        {
          icon: '🖼️',
          title: 'Three Input Modes',
          description: 'Start from <strong>text</strong>, <strong>still images</strong>, or <strong>existing footage</strong>—pick the workflow that matches your asset.'
        },
        {
          icon: '⏱️',
          title: 'Flexible Duration',
          description: 'Export <strong>5, 10, or 15 second</strong> clips (video-to-video: 5/10s effective) at <strong>720p or 1080p</strong>.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'No GPU setup—pay per generation with <strong>credits</strong> and switch to <strong>Wan 2.7</strong> when you need editing or R2V.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Social shorts & reels',
        'Product motion from stills',
        'Video restyle & remix',
        'Storyboard previews',
        'Quick ad concepts'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Wan 2.6 vs Traditional Text-to-Video',
      ariaLabel: 'Wan 2.6 vs traditional text-to-video',
      headers: ['Dimension', 'Wan 2.6', 'Traditional text-to-video'],
      rows: [
        [
          'Inputs',
          '<strong>Text, images, or source video</strong>',
          'Text only (or image in separate tools)'
        ],
        [
          'Shot control',
          '<strong>Single or multi-shot</strong> composition',
          'Usually single continuous clip'
        ],
        ['Output length', '<strong>5–15s</strong> at 720p / 1080p', 'Often 3–10s, fixed tiers'],
        ['On FuseAITools', 'Three 2.6 workflows + Wan 2.7 upgrade path', 'Separate tools per modality']
      ]
    },
    {
      type: 'table',
      id: 'compare-30-heading',
      title: '🆚 Wan 2.6 vs Wan 3.0',
      ariaLabel: 'Wan 2.6 vs Wan 3.0 parameters',
      headers: ['Parameter', 'Wan 2.6', 'Wan 3.0'],
      rows: [
        [
          'Entry',
          '3 separate tabs (T2V / I2V / V2V)',
          '<strong>One tab, five input modes</strong> (text / frame / reference / file / link)'
        ],
        ['Prompt', '1–5000 chars', '<strong>Up to 20000</strong> chars'],
        ['Duration', '5 / 10 / 15s (V2V 5/10s)', '<strong>2–30s</strong>'],
        ['Resolution', '720p / 1080p', '<strong>480p / 720p / 1080p</strong>'],
        [
          'References',
          'Source image/video only',
          '<strong>≤10 images + ≤5 videos + ≤5 audio</strong> (Image1/Video1/Audio1)'
        ],
        ['File / link input', '—', '<strong>Yes</strong> (1 file or 1 public link)'],
        [
          'Multi-shot',
          '<strong>Yes</strong> (single/multi-shot toggle)',
          'Adaptive aspect ratio instead of a shot toggle'
        ],
        ['Pricing', 'Per generation', '<strong>Per second × resolution</strong>']
      ],
      lead: 'Wan 2.6 stays the fast pick for multi-shot social clips. Wan 3.0 is a <strong>unified entry</strong> with five input modes, longer duration, and finer control.'
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Wan 2.6)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Wan 2.6 Technical Specs',
      ariaLabel: 'Wan 2.6 video workflow capabilities',
      headers: ['Workflow', 'Required input', 'Duration', 'Resolution', 'Key controls'],
      rows: [
        [
          '<strong>Text to Video</strong>',
          'Prompt (1–5000 chars)',
          '5 / 10 / 15s',
          '720p / 1080p',
          'Multi-shot on/off'
        ],
        [
          '<strong>Image to Video</strong>',
          'Image URL(s) + prompt',
          '5 / 10 / 15s',
          '720p / 1080p',
          'Multi-shot on/off'
        ],
        [
          '<strong>Video to Video</strong>',
          'Video URL + prompt',
          '5 / 10s*',
          '720p / 1080p',
          'Multi-shot; style/transform prompt'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Wan 2.6 form and API (<code>wan-2-6-*</code> models).',
      note: '* Selecting 15s in the UI for video-to-video is submitted as <strong>10s</strong> to the API. Image inputs: JPEG, PNG, WebP (min 256×256px). Video input: MP4, MOV, MKV (max 10MB).'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Wan 2.6 — Three Video Workflows',
      lead: 'Pick the workflow that matches your source material:',
      items: [
        {
          name: 'Wan 2.6 Text to Video',
          title: 'Text to Video',
          description: 'Prompt-only generation with 5/10/15s output and multi-shot composition.',
          path: '/home/wan/text-to-video',
          icon: 'fas fa-font'
        },
        {
          name: 'Wan 2.6 Image to Video',
          title: 'Image to Video',
          description: 'Upload stills plus a motion prompt—animate products, avatars, and art.',
          path: '/home/wan/image-to-video',
          icon: 'fas fa-image'
        },
        {
          name: 'Wan 2.6 Video to Video',
          title: 'Video to Video',
          description: 'Upload footage and restyle or transform it with a new prompt (5/10s output).',
          path: '/home/wan/video-to-video',
          icon: 'fas fa-video'
        }
      ]
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for per-generation credit costs on Wan 2.6.'
    },
    {
      pricing: false,
      html: '🖼️ <strong>Wan image companion</strong> Create stills and keyframes with <a href="/home/wan/2-7-image" class="seo-inline-link" >Wan 2.7 Image</a> or <a href="/home/wan/2-7-image-pro" class="seo-inline-link" >Image Pro (4K)</a> before animating in Wan 2.6 Image to Video.'
    },
    {
      pricing: false,
      html: '💡 Want director-level control? Try <a href="/home/wan/v2-7-text-to-video" class="seo-inline-link" >Wan 2.7 →</a> —natural-language video edit, up to 5 references (R2V), and finer prompt controls.'
    },
    {
      pricing: false,
      html: '⚡ Step up to the <strong>Wan 3.0 unified entry</strong>—text, first/last frame, reference, file, and link in one form; prompts to 20000 chars, <strong>2–30s</strong> at 480p/720p/1080p. <a href="/home/wan/v3-0-video" class="seo-inline-link" >Wan 3.0 →</a> or the faster <a href="/home/wan/v3-0-video-prime" class="seo-inline-link" >Wan 3.0 Prime →</a>'
    }
  ]
}
