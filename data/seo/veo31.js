/**
 * Veo31 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：Veo31SeoContent.vue）
 */
export default {
  component: 'Veo31SeoContent',
  rootId: 'veo31-section',
  rootClass: 'veo-seo',
  meta: {
    name: 'Veo 3.1 Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Veo 3.1 text, first/last frames, reference-to-video, and extend workflows on FuseAITools—Google DeepMind video with Standard, Fast or Lite models.'
  },
  badge: '🎬 Veo 3.1 · Google DeepMind · Four Workflows',
  introByPath: {
    '/home/veo3/text-to-video': {
      title: '📝 Veo 3.1 Text to Video',
      lead: 'Describe video content in up to <strong>1000 characters</strong>—choose <strong>Standard (veo3)</strong>, <strong>Fast (veo3_fast)</strong> or <strong>Lite (veo3_lite)</strong>, set aspect ratio <strong>16:9, 9:16, or Auto</strong>, and optionally enable English translation for better results.'
    },
    '/home/veo3/first-and-last-to-video': {
      title: '🖼️ Veo 3.1 First & Last Frames to Video',
      lead: 'Upload <strong>1–2 keyframe images</strong> and describe the motion between them. One image orbits around the subject; two images define start and end frames for a smooth transition video.'
    },
    '/home/veo3/reference-to-video': {
      title: '🎞️ Veo 3.1 Reference to Video',
      lead: 'Provide <strong>1–3 reference images</strong> plus a prompt—Veo 3.1 generates video content guided by your stills. Uses the <strong>Fast</strong> model by default; reference-to-video accepts the <strong>Fast</strong> and <strong>Lite</strong> tiers.'
    },
    '/home/veo3/extend': {
      title: '⏩ Veo 3.1 Video Extend',
      lead: 'Select a <strong>completed Veo3 generation task</strong> and describe how to extend the clip. Uses the <strong>veo3_extend</strong> model—note that videos upgraded to 1080P cannot be extended.'
    }
  },
  definitionByPath: {
    '/home/veo3/text-to-video': {
      title: 'What is Veo 3.1 Text to Video?',
      body: '<strong>Veo 3.1 Text to Video</strong> on FuseAITools turns a prompt (1–1000 characters) into a short video clip via Google DeepMind. Pick <strong>Standard, Fast or Lite</strong>, aspect ratio <strong>16:9, 9:16, or Auto</strong>, optional seed (10000–99999), watermark, and automatic English translation—ideal for cinematic previews and social content.'
    },
    '/home/veo3/first-and-last-to-video': {
      title: 'What is Veo 3.1 First & Last Frames to Video?',
      body: '<strong>Veo 3.1 First & Last Frames</strong> on FuseAITools animates between <strong>1–2 uploaded images</strong> with a motion prompt. With one image, the camera can orbit around the subject; with two, the first image is the opening frame and the second is the closing frame—built for keyframe-accurate transitions.'
    },
    '/home/veo3/reference-to-video': {
      title: 'What is Veo 3.1 Reference to Video?',
      body: '<strong>Veo 3.1 Reference to Video</strong> on FuseAITools generates video from <strong>1–3 reference images</strong> plus a required prompt (1–1000 characters). The model follows visual cues from your stills—useful for character-consistent clips and scene prototyping.'
    },
    '/home/veo3/extend': {
      title: 'What is Veo 3.1 Video Extend?',
      body: '<strong>Veo 3.1 Video Extend</strong> on FuseAITools continues a previously generated Veo3 clip. Select an eligible task from your history, describe the extension in a prompt, and submit via <strong>veo3_extend</strong>. Clips that have been upgraded to 1080P are not eligible for extension.'
    }
  },
  faqByPath: {
    '/home/veo3/text-to-video': [
      {
        question: 'What aspect ratios does Veo 3.1 text-to-video support?',
        answer: 'Choose <strong>16:9, 9:16, or Auto</strong> in the form. <strong>16:9</strong> supports a post-generation <strong>1080P upgrade</strong> via the Get 1080P button.'
      },
      {
        question: 'Should I use Standard, Fast or Lite for Veo 3.1 text-to-video?',
        answer: 'Use <strong>Fast (veo3_fast)</strong> for quick previews and iteration; switch to <strong>Standard (veo3)</strong> when you need higher quality for final output. <strong>Lite (veo3_lite)</strong> is the lightweight tier—same per-video billing rule, billed at its own credits rate.'
      }
    ],
    '/home/veo3/first-and-last-to-video': [
      {
        question: 'How many images can I upload for first/last frames?',
        answer: 'Between <strong>1 and 2 images</strong>. One image creates an orbit-style shot; two images define the opening and closing keyframes for a transition video.'
      },
      {
        question: 'Does first/last frames support 1080P on Veo 3.1?',
        answer: 'Yes—select <strong>16:9</strong> aspect ratio and use the <strong>Get 1080P</strong> button after generation completes successfully.'
      }
    ],
    '/home/veo3/reference-to-video': [
      {
        question: 'How many reference images does Veo 3.1 support?',
        answer: 'Upload <strong>1–3 reference images</strong> (JPG/PNG, max 10MB each) along with a required prompt up to 1000 characters.'
      },
      {
        question: 'Which model is used for Veo 3.1 reference-to-video?',
        answer: 'Reference-to-video defaults to the <strong>Fast (veo3_fast)</strong> model for responsive image-guided generation; <strong>Lite (veo3_lite)</strong> is the other tier available in this mode.'
      }
    ],
    '/home/veo3/extend': [
      {
        question: 'Which tasks can be extended with Veo 3.1?',
        answer: 'Only tasks <strong>completed with Veo3 video generation</strong> appear in the Original Task dropdown. Videos that have been upgraded to <strong>1080P</strong> cannot be extended.'
      },
      {
        question: 'How is Veo 3.1 video extend priced?',
        answer: 'Extension uses the <strong>veo3_extend</strong> model—credits are shown on the Generate button before you submit.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Veo 3.1?',
      answer: 'No—Veo 3.1 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
    },
    {
      question: 'How is Veo 3.1 priced on FuseAITools?',
      answer: 'Generate modes bill per video at the model you select—exact credits appear on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
      title: '🎬 Veo 3.1 on FuseAITools',
      html: 'Veo 3.1 on <a href="/" class="seo-inline-link">FuseAITools</a> brings <strong>Google DeepMind video generation</strong> to the browser—text-to-video, keyframe animation, reference-driven clips, and video extension in one tool stack. Choose <strong>Standard (veo3)</strong> for higher quality, <strong>Fast (veo3_fast)</strong> for quicker previews, or <strong>Lite (veo3_lite)</strong> as the lightweight tier. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Veo 3.1 Core Features',
      items: [
        {
          icon: '🎬',
          title: 'Google DeepMind Video',
          description: 'Veo 3.1 delivers cinematic motion from text or images—<strong>Standard</strong> for quality, <strong>Fast</strong> for speed, <strong>Lite</strong> for a lightweight tier.'
        },
        {
          icon: '🖼️',
          title: 'Keyframe & Reference Modes',
          description: 'Animate <strong>1–2 keyframes</strong> or guide generation with <strong>1–3 reference images</strong> plus a motion prompt.'
        },
        {
          icon: '⏩',
          title: 'Video Extension',
          description: 'Continue prior Veo3 clips with natural-language extension prompts via <strong>veo3_extend</strong>.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'Four workflows in the browser—<strong>credits shown before generate</strong>; optional 1080P upgrade on 16:9 outputs.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Cinematic previews',
        'Social & vertical video',
        'Product reveal animations',
        'Keyframe-driven motion',
        'Clip extension & continuity'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Veo 3.1 Standard vs Fast vs Lite',
      ariaLabel: 'Veo 3.1 Standard vs Fast vs Lite',
      headers: ['Dimension', 'Standard (veo3)', 'Fast (veo3_fast)', 'Lite (veo3_lite)'],
      rows: [
        [
          'Quality',
          '<strong>Higher fidelity</strong>—best for final output',
          'Optimized for speed—ideal for iteration',
          'Lightweight tier—budget-conscious drafts'
        ],
        ['Speed', 'Longer generation time', '<strong>Faster turnaround</strong> for previews', 'Lightweight pipeline for quick drafts'],
        [
          'Workflows',
          '<strong>Text, first/last frames</strong>',
          '<strong>Text, first/last frames, reference-to-video</strong>',
          '<strong>Text, first/last frames, reference-to-video</strong>'
        ],
        [
          'Aspect ratio',
          {
            html: '<strong>16:9, 9:16, Auto</strong>—16:9 supports 1080P upgrade',
            colspan: 3
          }
        ],
        [
          'Prompt length',
          {
            html: 'Up to <strong>1000 characters</strong> with optional English translation',
            colspan: 3
          }
        ]
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Veo 3.1)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Veo 3.1 Technical Specs',
      ariaLabel: 'Veo 3.1 workflow capabilities',
      headers: ['Workflow', 'Required input', 'Model', 'Aspect ratio', 'Key controls'],
      rows: [
        [
          '<strong>Text to Video</strong>',
          'Prompt (1–1000 chars)',
          'Standard / Fast / Lite',
          '16:9, 9:16, Auto',
          'Translation, seed, watermark'
        ],
        [
          '<strong>First & Last Frames</strong>',
          'Prompt + 1–2 images',
          'Standard / Fast / Lite',
          '16:9, 9:16, Auto',
          '1 image = orbit; 2 = start/end keyframes'
        ],
        [
          '<strong>Reference to Video</strong>',
          'Prompt + 1–3 reference images',
          'Fast (default) / Lite',
          'Follows references',
          'Translation, seed, watermark'
        ],
        [
          '<strong>Video Extend</strong>',
          'Prior Veo3 task + extension prompt',
          'veo3_extend',
          '—',
          'Seed, watermark; 1080P clips not extendable'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Veo 3.1 form and API (<code>veo3</code>, <code>veo3_fast</code>, <code>veo3_lite</code>, <code>veo3_extend</code>).',
      note: 'Image inputs: JPG/PNG (max 10MB). After generation, use <strong>Get 1080P</strong> on 16:9 outputs. Credits are shown on the Generate button before submission.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Veo 3.1 — Four Video Workflows',
      lead: 'Choose the mode that matches your source material:',
      items: [
        {
          name: 'Veo 3.1 Text to Video',
          title: 'Text to Video',
          description: 'Describe scenes in up to 1000 characters—Standard, Fast or Lite, 16:9/9:16/Auto, optional translation.',
          path: '/home/veo3/text-to-video',
          icon: 'fas fa-font'
        },
        {
          name: 'Veo 3.1 First & Last Frames',
          title: 'First & Last Frames',
          description: 'Upload 1–2 keyframe images and animate the transition with a motion prompt.',
          path: '/home/veo3/first-and-last-to-video',
          icon: 'fas fa-images'
        },
        {
          name: 'Veo 3.1 Reference to Video',
          title: 'Image to Video',
          description: '1–3 reference images plus prompt—AI generates video content guided by your stills. Fast or Lite tier.',
          path: '/home/veo3/reference-to-video',
          icon: 'fas fa-image'
        },
        {
          name: 'Veo 3.1 Video Extend',
          title: 'Video Extend',
          description: 'Continue a prior Veo3 clip with an extension prompt—select from completed tasks.',
          path: '/home/veo3/extend',
          icon: 'fas fa-expand-arrows-alt'
        }
      ]
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for Veo 3.1 per-generation costs.'
    },
    {
      pricing: false,
      html: '🎬 Need ByteDance-style multi-shot video? <a href="/home/seedance/v2" class="seo-inline-link" >Explore Seedance v2 →</a> for fast text and image-to-video workflows alongside Veo 3.1.'
    }
  ]
}
