/**
 * Runway SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：RunwaySeoContent.vue）
 */
export default {
  component: 'RunwaySeoContent',
  rootId: 'runway-section',
  rootClass: 'runway-seo',
  meta: {
    name: 'Runway Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Runway Generate, Extend, and Aleph on FuseAITools—text or image to video, continuation on prior tasks, and style transform on uploaded clips at 720p/1080p.'
  },
  badge: '🎬 Runway · Gen-3 Video · Three Workflows',
  introByPath: {
    '/home/runway/generate': {
      title: '🎬 Runway Generate',
      lead: 'Describe your scene in a <strong>prompt</strong> (≤1800 characters), pick <strong>5 or 10 seconds</strong>, and choose <strong>720p or 1080p</strong>. Optionally upload one reference image to animate a still—set aspect ratio when no image is provided.'
    },
    '/home/runway/extend': {
      title: '➡️ Runway Extend',
      lead: 'Select a <strong>completed Runway Generate task</strong> from your history, then write a continuation <strong>prompt</strong> (≤1000 characters). Output resolution is <strong>720p or 1080p</strong>—ideal for lengthening a clip you already rendered with Generate.'
    },
    '/home/runway/aleph': {
      title: '✨ Runway Aleph',
      lead: 'Upload a <strong>source video</strong> (MP4/MOV/AVI, max 10MB) and describe the style or scene transform in a <strong>prompt</strong>. Optionally add a reference image, aspect ratio, and seed for reproducible Aleph output.'
    }
  },
  definitionByPath: {
    '/home/runway/generate': {
      title: 'What is Runway Generate?',
      body: '<strong>Runway Generate</strong> on FuseAITools creates short MP4 clips from a required <strong>prompt (≤1800 chars)</strong>. Choose <strong>5s or 10s</strong> duration and <strong>720p or 1080p</strong>—note that <strong>10s clips cannot use 1080p</strong>. Without a reference image, pick aspect ratios <strong>16:9, 4:3, 1:1, 3:4, or 9:16</strong>. Optional: one JPG/PNG reference image (max 10MB) and custom watermark text.'
    },
    '/home/runway/extend': {
      title: 'What is Runway Extend?',
      body: '<strong>Runway Extend</strong> on FuseAITools continues a clip produced by <strong>Runway Generate</strong>. Required: a valid <strong>task ID</strong> from your completed generate jobs (listed in the Task dropdown) plus a <strong>prompt (≤1000 chars)</strong>. Choose <strong>720p or 1080p</strong> output quality. Arbitrary video uploads are not accepted—only prior Runway generate tasks.'
    },
    '/home/runway/aleph': {
      title: 'What is Runway Aleph?',
      body: '<strong>Runway Aleph</strong> on FuseAITools restyles an uploaded <strong>video URL</strong> (MP4/MOV/AVI, max 10MB) guided by a <strong>prompt</strong>. Output length matches the source. Set aspect ratio (<strong>16:9, 9:16, 4:3, 3:4, 1:1, 21:9</strong>), optional reference image, optional <strong>seed</strong>, and watermark (≤20 characters). Focus prompts on transformations rather than describing content already in the clip.'
    }
  },
  faqByPath: {
    '/home/runway/generate': [
      {
        question: 'Can Runway Generate animate a still image?',
        answer: 'Yes—upload an <strong>optional reference image</strong> (JPG/PNG, max 10MB). The model animates or extends that still while following your prompt. Aspect ratio controls hide when an image is attached.'
      },
      {
        question: 'Why is 1080p disabled for 10-second Runway Generate clips?',
        answer: 'The form enforces Runway’s constraint: <strong>10-second outputs support 720p only</strong>. Choose <strong>5 seconds</strong> if you need <strong>1080p</strong> resolution.'
      }
    ],
    '/home/runway/extend': [
      {
        question: 'Which tasks can I extend with Runway Extend?',
        answer: 'Only tasks completed with <strong>Runway Generate</strong> (<code>runway_generate</code>) appear in the Task dropdown. Uploads from other tools or Aleph outputs are not eligible unless they were produced through Generate on this account.'
      },
      {
        question: 'How long can a Runway Extend prompt be?',
        answer: 'Up to <strong>1000 characters</strong>. Describe what should happen next while staying consistent with the original clip’s style and motion.'
      }
    ],
    '/home/runway/aleph': [
      {
        question: 'What video formats does Runway Aleph accept?',
        answer: 'MP4, MOV, or AVI up to <strong>10MB</strong>. The clip is uploaded to cloud storage before submission; output duration matches the source video length.'
      },
      {
        question: 'How should I write prompts for Runway Aleph?',
        answer: 'Describe <strong>style changes and transformations</strong>—lighting, atmosphere, camera motion, effects—not the literal content already visible. Example: “Transform into dreamy watercolor with soft flowing motion.”'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Runway on FuseAITools?',
      answer: 'No—Runway runs in the cloud. Use any modern browser; credits are charged per successful generation. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      question: 'How is Runway priced on FuseAITools?',
      answer: '<strong>Generate</strong> bills by <strong>duration and quality</strong> (RULE pricing)—credits show on the button before you submit. <strong>Extend</strong> and <strong>Aleph</strong> use per-run credits. See <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
      title: '🎬 Runway on FuseAITools',
      html: '<strong>Runway</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> covers the full short-video lifecycle— <strong>Generate</strong> from text or a reference still, <strong>Extend</strong> a completed generate task forward or backward, and <strong>Aleph</strong> to restyle uploaded footage while preserving motion structure. Credits appear on each Generate button before submission. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Runway Core Features',
      items: [
        {
          icon: '🎬',
          title: 'Text & Image to Video',
          description: 'Generate <strong>5s or 10s</strong> clips from a prompt—with optional reference still for image-to-video at <strong>720p/1080p</strong>.'
        },
        {
          icon: '➡️',
          title: 'Task-Based Extend',
          description: 'Continue a <strong>Runway Generate</strong> render with a continuation prompt—seamless style-consistent lengthening.'
        },
        {
          icon: '✨',
          title: 'Aleph Style Transform',
          description: 'Restyle uploaded footage with transformation prompts—optional reference image, seed, and six aspect ratios.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'Three Runway workflows in the browser—<strong>credits shown before generate</strong>; no local GPU required.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Social & ad short-form video',
        'Storyboard & pre-visualization',
        'Image-to-motion promos',
        'Clip continuation & loops',
        'Style transfer on existing footage'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Runway Workflows Compared',
      ariaLabel: 'Runway generate, extend, and aleph comparison',
      headers: ['Dimension', 'Generate', 'Extend', 'Aleph'],
      rows: [
        [
          '<strong>Input</strong>',
          'Prompt (+ optional image)',
          'Runway generate task ID + prompt',
          'Uploaded video + prompt (+ optional reference image)'
        ],
        [
          '<strong>modelKey</strong>',
          '<code>runway_generate</code>',
          '<code>runway_extend</code>',
          '<code>runway_aleph</code>'
        ],
        ['<strong>Duration</strong>', '5s or 10s', 'Matches source clip', 'Inherits source length'],
        ['<strong>Resolution</strong>', '720p / 1080p*', '720p / 1080p', '—'],
        [
          '<strong>Best for</strong>',
          'Text-to-video or image animation from scratch',
          'Continue a Runway generate render',
          'Style transfer and scene transform on existing video'
        ]
      ],
      note: '*10-second Generate clips do not support 1080p in the form.'
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Runway)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Runway Technical Specs',
      ariaLabel: 'Runway workflow capabilities',
      headers: ['Workflow', 'Required input', 'Duration', 'Resolution / ratio', 'Key controls'],
      rows: [
        [
          '<strong>Generate</strong>',
          'Prompt (≤1800 chars); optional 1 image (JPG/PNG, max 10MB)',
          '5s or 10s',
          '720p / 1080p; aspect 16:9, 4:3, 1:1, 3:4, 9:16 when no image',
          'Optional watermark text'
        ],
        [
          '<strong>Extend</strong>',
          'Completed <code>runway_generate</code> task ID + prompt (≤1000)',
          'Matches source',
          '720p / 1080p',
          'Watermark (max 50 chars)'
        ],
        [
          '<strong>Aleph</strong>',
          'Video URL (MP4/MOV/AVI, max 10MB) + prompt',
          'Inherits source',
          'Aspect 16:9, 9:16, 4:3, 3:4, 1:1, 21:9',
          'Optional reference image; seed; watermark (max 20 chars)'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Runway form and API (<code>runway_*</code> models).',
      note: 'Generate: RULE credits by <strong>duration</strong> + <strong>quality</strong>. Extend and Aleph: per-run credits on Generate.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Runway — Three Video Workflows',
      lead: 'Typical pipeline: Generate → Extend → Aleph (optional restyle).',
      items: [
        {
          name: 'Runway Generate',
          title: 'Generate',
          description: 'Text or optional reference image to 5s/10s clips at 720p/1080p.',
          path: '/home/runway/generate',
          icon: 'fas fa-video'
        },
        {
          name: 'Runway Extend',
          title: 'Extend',
          description: 'Continue a completed Runway generate task with a continuation prompt.',
          path: '/home/runway/extend',
          icon: 'fas fa-expand'
        },
        {
          name: 'Runway Aleph',
          title: 'Aleph',
          description: 'Transform uploaded video with style prompts—optional reference still and seed.',
          path: '/home/runway/aleph',
          icon: 'fas fa-magic'
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
      html: '🎬 Typical Runway pipeline: <a href="/home/runway/generate" class="seo-inline-link">Generate →</a> <a href="/home/runway/extend" class="seo-inline-link">Extend →</a> <a href="/home/runway/aleph" class="seo-inline-link">Aleph</a> for style transforms on uploaded footage.'
    },
    {
      pricing: false,
      html: '🎥 Need Google Veo 3 reference-to-video or first/last-frame control? <a href="/home/veo3/text-to-video" class="seo-inline-link">Explore Veo 3 →</a> for multi-mode cinematic generation on FuseAITools.'
    }
  ]
}
