/**
 * Wan27Video SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：Wan27VideoSeoContent.vue）
 */
export default {
  component: 'Wan27VideoSeoContent',
  rootId: 'wan-27-section',
  rootClass: 'wan-seo',
  meta: {
    name: 'Wan 2.7 Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Wan 2.7 text, image, video edit, and R2V workflows on FuseAITools—2–15s clips, natural-language editing, up to 5 references.'
  },
  badge: '🎬 Wan 2.7 · Direct & Perform · Full Video Pipeline · April 2026',
  introByPath: {
    '/home/wan/v2-7-text-to-video': {
      title: '📝 Wan 2.7 Text to Video',
      lead: 'Describe scenes with a <strong>3–5000 character</strong> prompt—set <strong>2–15s</strong> duration, <strong>720p/1080p</strong>, aspect ratio, optional audio, and prompt extend for richer motion.'
    },
    '/home/wan/v2-7-image-to-video': {
      title: '🖼️ Wan 2.7 Image to Video',
      lead: 'Anchor motion with <strong>first and/or last frames</strong>, a reference clip, or <strong>driving audio</strong>. Reduce abrupt endings and steer performance without a full edit suite.'
    },
    '/home/wan/v2-7-video-edit': {
      title: '✂️ Wan 2.7 Video Edit',
      lead: 'Upload existing video and instruct changes in plain language—“add rain,” “remove the passerby,” “warm the grade.” Duration is <strong>0 (auto) or 2–10 seconds</strong> per the form.'
    },
    '/home/wan/v2-7-r2v': {
      title: '👥 Wan 2.7 R2V',
      lead: 'Combine up to <strong>5</strong> reference images or videos (total) with optional voice lock. Each subject keeps a stable look—built for ensemble ads and branded character series.'
    }
  },
  definitionByPath: {
    '/home/wan/v2-7-text-to-video': {
      title: 'What is Wan 2.7 Text to Video?',
      body: '<strong>Wan 2.7 Text to Video</strong> on FuseAITools generates <strong>2–15 second</strong> clips from a prompt (3–5000 characters). Choose <strong>720p or 1080p</strong>, aspect ratios from 16:9 to 3:4, optional negative prompt and audio URL, plus prompt extend—ideal for ads and scripted shorts.'
    },
    '/home/wan/v2-7-image-to-video': {
      title: 'What is Wan 2.7 Image to Video?',
      body: '<strong>Wan 2.7 Image to Video</strong> on FuseAITools animates from key inputs: provide at least one of <strong>first frame, last frame, reference clip, or driving audio</strong> with a 3–5000 character prompt. Duration is <strong>2–15s</strong> at 720p/1080p—built for product films and keyframe-driven motion.'
    },
    '/home/wan/v2-7-video-edit': {
      title: 'What is Wan 2.7 Video Edit?',
      body: '<strong>Wan 2.7 Video Edit</strong> on FuseAITools edits an uploaded video with natural-language instructions. Required: <strong>video URL + prompt</strong>. Set duration to <strong>0 (model decides) or 2–10 seconds</strong>, 720p/1080p, optional reference image and audio setting (auto or keep origin).'
    },
    '/home/wan/v2-7-r2v': {
      title: 'What is Wan 2.7 R2V?',
      body: '<strong>Wan 2.7 R2V (reference-to-video)</strong> on FuseAITools generates scenes from up to <strong>5 combined reference images and videos</strong> plus a prompt. Output is <strong>2–10 seconds</strong> at 720p/1080p with optional voice lock—use when multiple characters must stay consistent.'
    }
  },
  faqByPath: {
    '/home/wan/v2-7-text-to-video': [
      {
        question: 'What aspect ratios does Wan 2.7 text-to-video support?',
        answer: 'Yes—choose <strong>16:9, 9:16, 1:1, 4:3, or 3:4</strong> in the form, plus <strong>720p or 1080p</strong> and <strong>2–15 second</strong> duration.'
      },
      {
        question: 'Can I add audio guidance to Wan 2.7 text-to-video?',
        answer: 'Yes—optionally pass an <strong>audio URL</strong> with your prompt so generation can follow rhythm or dialogue cues (when supported by the model).'
      }
    ],
    '/home/wan/v2-7-image-to-video': [
      {
        question: 'What inputs are required for Wan 2.7 image-to-video?',
        answer: 'You need a prompt (3–5000 chars) and at least one of: <strong>first frame URL, last frame URL, first clip URL, or driving audio URL</strong>. Duration is <strong>2–15s</strong> at 720p/1080p.'
      },
      {
        question: 'When should I use first and last frames on Wan 2.7?',
        answer: 'Use both when you need a shot to <strong>start and end on specific keyframes</strong>—common for product reveals, logo lockups, and storyboard-accurate motion.'
      }
    ],
    '/home/wan/v2-7-video-edit': [
      {
        question: 'Can Wan 2.7 edit an existing video on FuseAITools?',
        answer: 'Yes—open <strong>Video Edit</strong>, upload a video URL, and describe changes in a 3–5000 character prompt. Optional reference image and audio setting (auto vs keep origin) refine the result.'
      },
      {
        question: 'What duration should I pick for Wan 2.7 video edit?',
        answer: 'Use <strong>0</strong> to let the model decide length, or set <strong>2–10 seconds</strong> when you need a fixed output window—values outside that range are clamped by the form.'
      }
    ],
    '/home/wan/v2-7-r2v': [
      {
        question: 'How many references can Wan 2.7 R2V use?',
        answer: 'Up to <strong>5 total</strong> across reference images and videos combined. Add an optional <strong>first frame</strong> and <strong>reference voice</strong> URL for tighter identity lock.'
      },
      {
        question: 'Does Wan 2.7 R2V support aspect ratio with a first frame?',
        answer: 'When you set a <strong>first frame</strong>, the API omits aspect ratio—composition follows that frame. Without a first frame, pick an aspect ratio in the form.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Wan 2.7?',
      answer: 'No—Wan 2.7 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
    },
    {
      question: 'How do I try Wan 2.7 on FuseAITools?',
      answer: 'Select any Wan 2.7 workflow above. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and top-ups.'
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
      title: '🎬 Wan 2.7 on FuseAITools',
      html: 'Wan 2.7 on <a href="/" class="seo-inline-link">FuseAITools</a> is the director-grade stack: <strong>generate, edit, and reference-lock</strong> in one browser workflow. Move from quick Wan 2.6 clips to <strong>natural-language video edit</strong>, <strong>first/last frame</strong> control, and <strong>multi-reference R2V</strong> when production needs more precision.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Wan 2.7 Core Features',
      items: [
        {
          icon: '✂️',
          title: 'Natural-Language Video Edit',
          description: 'Change backgrounds, objects, or performance with text on the <strong>Video Edit</strong> workflow—no timeline required.'
        },
        {
          icon: '👥',
          title: 'Multi-Reference R2V',
          description: 'Lock up to <strong>5</strong> reference images/videos for ensemble scenes with optional voice guidance.'
        },
        {
          icon: '🖼️',
          title: 'First / Last Frame Control',
          description: 'Pin keyframes and optional <strong>driving audio</strong> on image-to-video for predictable starts and ends.'
        },
        {
          icon: '📝',
          title: 'Director-Grade Prompting',
          description: 'Prompts <strong>3–5000</strong> chars with negative prompt, prompt extend, watermark, and seed on generate/edit modes.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for Professional Production',
      items: [
        'Film trailers & TVC',
        'Game CG & cutscenes',
        'Brand video at scale',
        'Short-drama pipelines',
        'Education & explainers'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Wan 2.7 vs Wan 2.6',
      ariaLabel: 'Wan 2.7 vs Wan 2.6',
      headers: ['Dimension', 'Wan 2.6', 'Wan 2.7'],
      rows: [
        ['Video edit', '—', '<strong>Natural-language Video Edit</strong>'],
        [
          'References (R2V)',
          'Transform one source video (V2V)',
          '<strong>Up to 5</strong> images/videos in R2V'
        ],
        ['Frame control', 'Image / video inputs', '<strong>First & last frame</strong>, driving audio'],
        [
          'Duration',
          '5–15s (2.6 video modes)',
          '<strong>2–15s</strong> generate; edit <strong>0–10s</strong>'
        ],
        ['Prompt', '1–5000 chars (2.6)', '<strong>3–5000</strong> chars + negative prompt']
      ]
    },
    {
      type: 'table',
      id: 'compare-30-heading',
      title: '🆚 Wan 2.7 vs Wan 3.0',
      ariaLabel: 'Wan 2.7 vs Wan 3.0 parameters',
      headers: ['Parameter', 'Wan 2.7 video', 'Wan 3.0'],
      rows: [
        [
          'Entry',
          '4 tabs (T2V / I2V / Edit / R2V)',
          '<strong>One tab, five input modes</strong> (text / frame / reference / file / link)'
        ],
        ['Prompt', '3–5000 chars', '<strong>Up to 20000</strong> chars'],
        ['Duration', '2–15s (edit 0–10, R2V 2–10)', '<strong>2–30s</strong> (input video + duration ≤ 30s)'],
        ['Resolution', '720p / 1080p', '<strong>480p / 720p / 1080p</strong>'],
        [
          'Aspect ratio',
          '16:9, 9:16, 1:1, 4:3, 3:4',
          '<strong>adaptive</strong> + 16:9, 4:3, 1:1, 3:4, 9:16'
        ],
        [
          'References (R2V)',
          'Up to 5 images/videos',
          '<strong>≤10 images + ≤5 videos + ≤5 audio</strong> (Image1/Video1/Audio1)'
        ],
        ['File / link input', '—', '<strong>Yes</strong> (1 file or 1 public link)'],
        [
          'Pricing',
          'Per second × resolution',
          'Per second × resolution (<code>audio</code> does not change the rate)'
        ]
      ],
      lead: 'Both bill per second by resolution and live in the same tool. Wan 3.0 adds a <strong>unified entry</strong>, longer duration, more references, and file/link inputs.'
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Wan 2.7)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Wan 2.7 Technical Specs',
      ariaLabel: 'Wan 2.7 video workflow capabilities',
      headers: ['Workflow', 'Required input', 'Duration', 'Resolution / ratio', 'Key controls'],
      rows: [
        [
          '<strong>Text to Video</strong>',
          'Prompt (3–5000 chars)',
          '2–15s',
          '720p / 1080p; 16:9, 9:16, 1:1, 4:3, 3:4',
          'Negative prompt, audio URL, prompt extend, seed'
        ],
        [
          '<strong>Image to Video</strong>',
          'Prompt + ≥1 of first/last frame, clip, or driving audio',
          '2–15s',
          '720p / 1080p',
          'First & last frame, driving audio, prompt extend'
        ],
        [
          '<strong>Video Edit</strong>',
          'Video URL + prompt',
          '0 or 2–10s',
          '720p / 1080p; optional aspect ratio',
          'Reference image, audio setting (auto/origin)'
        ],
        [
          '<strong>R2V</strong>',
          'Prompt + references (≤5 total)',
          '2–10s',
          '720p / 1080p; aspect ratio if no first frame',
          'Reference images/videos, optional voice lock'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Wan 2.7 form and API (<code>wan-2-7-*</code> / <code>wan-2-7-videoedit</code>).',
      note: 'R2V accepts up to <strong>5</strong> combined reference images and videos. When a first frame is set, aspect ratio is omitted in the API.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Wan 2.7 — Four Video Workflows',
      lead: 'Choose the mode that matches your production step:',
      items: [
        {
          name: 'Wan 2.7 Text to Video',
          title: 'Text to Video',
          description: '2–15s clips from prompts with aspect ratio, optional audio, and prompt extend.',
          path: '/home/wan/v2-7-text-to-video',
          icon: 'fas fa-font'
        },
        {
          name: 'Wan 2.7 Image to Video',
          title: 'Image to Video',
          description: 'First/last frame, driving audio, or reference clip—precise motion control.',
          path: '/home/wan/v2-7-image-to-video',
          icon: 'fas fa-images'
        },
        {
          name: 'Wan 2.7 Video Edit',
          title: 'Video Edit',
          description: 'Upload footage and edit with natural language—backgrounds, objects, performance.',
          path: '/home/wan/v2-7-video-edit',
          icon: 'fas fa-edit'
        },
        {
          name: 'Wan 2.7 R2V',
          title: 'R2V (Reference to Video)',
          description: 'Up to 5 reference images or videos—lock look and voice for ensemble scenes.',
          path: '/home/wan/v2-7-r2v',
          icon: 'fas fa-layer-group'
        }
      ]
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for Wan 2.7 per-generation costs.'
    },
    {
      pricing: false,
      html: '🖼️ <strong>Wan image companion</strong> Generate first/last frames in <a href="/home/wan/2-7-image-pro" class="seo-inline-link" >Wan 2.7 Image Pro (4K)</a> or edit references in <a href="/home/wan/2-7-image" class="seo-inline-link" >Wan 2.7 Image</a> —then animate in this page\'s I2V or R2V workflows.'
    },
    {
      pricing: false,
      html: '🎭 Prefer fast multi-shot clips from text or stills? <a href="/home/wan/text-to-video" class="seo-inline-link" >Wan 2.6 workflows</a> remain available for lightweight generation.'
    },
    {
      pricing: false,
      html: '⚡ Ready for more? The <strong>Wan 3.0 unified entry</strong> folds text, first/last frame, reference (≤10 images), file, and link into one form—<strong>2–30s</strong> at 480p/720p/1080p. <a href="/home/wan/v3-0-video" class="seo-inline-link" >Wan 3.0 →</a> or the faster <a href="/home/wan/v3-0-video-prime" class="seo-inline-link" >Wan 3.0 Prime →</a>'
    }
  ]
}
