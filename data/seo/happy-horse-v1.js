/**
 * HappyHorseV1 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：HappyHorseV1SeoContent.vue）
 */
export default {
  component: 'HappyHorseV1SeoContent',
  rootId: 'happyhorse-v1-section',
  rootClass: 'happyhorse-seo',
  meta: {
    name: 'HappyHorse v1 Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'HappyHorse v1 text, image, reference, and video-edit workflows on FuseAITools—native audio-video generation at 720p/1080p, 3–15s clips.'
  },
  badge: '🐴 HappyHorse v1 · Native Audio-Video · Four Workflows',
  introByPath: {
    '/home/happy-horse/v1-text-to-video': {
      title: '📝 HappyHorse v1 Text to Video',
      lead: 'Describe scenes in text—HappyHorse v1 generates <strong>video with synced audio</strong> in one pass. Set <strong>3–15 seconds</strong>, <strong>720p or 1080p</strong>, and aspect ratio from 16:9 to 3:4.'
    },
    '/home/happy-horse/v1-image-to-video': {
      title: '🖼️ HappyHorse v1 Image to Video',
      lead: 'Upload <strong>one image</strong> and optionally guide motion with a prompt. Output is <strong>3–15 seconds</strong> at <strong>720p/1080p</strong> with native audio-video generation.'
    },
    '/home/happy-horse/v1-reference-to-video': {
      title: '👥 HappyHorse v1 Reference to Video',
      lead: 'Provide <strong>1–9 ordered reference images</strong> plus a prompt with <strong>character1, character2…</strong> placeholders. Control aspect ratio and duration like text-to-video.'
    },
    '/home/happy-horse/v1-video-edit': {
      title: '✂️ HappyHorse v1 Video Edit',
      lead: 'Upload <strong>MP4 or MOV</strong> footage and describe edits in plain language. Optional <strong>0–5 reference images</strong>; choose whether to keep original audio or let the model regenerate it.'
    }
  },
  definitionByPath: {
    '/home/happy-horse/v1-text-to-video': {
      title: 'What is HappyHorse v1 Text to Video?',
      body: '<strong>HappyHorse v1 Text to Video</strong> on FuseAITools turns a prompt (1–5000 characters) into a short MP4 with <strong>native audio-video sync</strong>. Choose <strong>3–15s</strong> duration, <strong>720p or 1080p</strong>, and aspect ratios <strong>16:9, 9:16, 1:1, 4:3, or 3:4</strong>—ideal for social clips and dialogue-driven scenes.'
    },
    '/home/happy-horse/v1-image-to-video': {
      title: 'What is HappyHorse v1 Image to Video?',
      body: '<strong>HappyHorse v1 Image to Video</strong> on FuseAITools animates a <strong>single uploaded image</strong> with optional prompt guidance. Duration is <strong>3–15 seconds</strong> at <strong>720p/1080p</strong>; the prompt is optional (max 5000 characters).'
    },
    '/home/happy-horse/v1-reference-to-video': {
      title: 'What is HappyHorse v1 Reference to Video?',
      body: '<strong>HappyHorse v1 Reference to Video</strong> on FuseAITools generates from <strong>1–9 reference images</strong> plus a required prompt. Map subjects with <strong>character1, character2…</strong> placeholders in the prompt for consistent multi-character output at 720p/1080p.'
    },
    '/home/happy-horse/v1-video-edit': {
      title: 'What is HappyHorse v1 Video Edit?',
      body: '<strong>HappyHorse v1 Video Edit</strong> on FuseAITools edits uploaded video with natural-language instructions. Required: <strong>video URL + prompt</strong>. Credits bill by <strong>source duration (rounded up)</strong>; optional reference images and audio setting <strong>auto</strong> or <strong>origin</strong>.'
    }
  },
  faqByPath: {
    '/home/happy-horse/v1-text-to-video': [
      {
        question: 'What aspect ratios does HappyHorse v1 text-to-video support?',
        answer: 'Yes—choose <strong>16:9, 9:16, 1:1, 4:3, or 3:4</strong> in the form, plus <strong>720p or 1080p</strong> and <strong>3–15 second</strong> duration.'
      },
      {
        question: 'Does HappyHorse v1 text-to-video include audio?',
        answer: 'Yes—HappyHorse v1 generates <strong>video and synced audio together</strong> in one pass, including dialogue and ambient sound when described in your prompt.'
      }
    ],
    '/home/happy-horse/v1-image-to-video': [
      {
        question: 'Is a prompt required for HappyHorse v1 image-to-video?',
        answer: 'No—the prompt is <strong>optional</strong> (max 5000 characters). You must upload <strong>exactly one image</strong> (JPEG/PNG/WebP, max 10MB). Duration is <strong>3–15s</strong> at 720p/1080p.'
      },
      {
        question: 'Can I set aspect ratio on HappyHorse v1 image-to-video?',
        answer: 'No—aspect ratio controls apply to <strong>text-to-video</strong> and <strong>reference-to-video</strong> only. Image-to-video follows your input frame composition.'
      }
    ],
    '/home/happy-horse/v1-reference-to-video': [
      {
        question: 'How many reference images can HappyHorse v1 use?',
        answer: 'Between <strong>1 and 9</strong> reference images. Align prompt placeholders (<strong>character1, character2…</strong>) with upload order for consistent subjects.'
      },
      {
        question: 'What prompt format works best for reference-to-video?',
        answer: 'Use explicit character tags in the prompt—e.g. “<strong>character1</strong> walks beside <strong>character2</strong>”—matching the order of uploaded reference images.'
      }
    ],
    '/home/happy-horse/v1-video-edit': [
      {
        question: 'How is HappyHorse v1 video edit billed?',
        answer: 'Credits are based on <strong>source video length rounded up</strong> (shown in the form after upload). The API accepts durations between <strong>3 and 60 seconds</strong> derived from your clip.'
      },
      {
        question: 'What does the audio setting do on video edit?',
        answer: 'Choose <strong>auto</strong> to let the model regenerate audio, or <strong>origin</strong> to preserve the uploaded clip’s audio track when supported.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for HappyHorse v1?',
      answer: 'No—HappyHorse v1 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
    },
    {
      question: 'How is HappyHorse v1 priced on FuseAITools?',
      answer: 'Generate modes bill <strong>per second</strong> at the resolution you select—the exact credits appear on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
      title: '🐴 HappyHorse v1 on FuseAITools',
      html: 'HappyHorse v1 on <a href="/" class="seo-inline-link">FuseAITools</a> targets <strong>native audio-video joint generation</strong>—dialogue, lip sync, and ambient sound in one pass. Pick text-to-video, image-to-video, reference-to-video, or video edit; each workflow shows <strong>credits required</strong> before you generate. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ HappyHorse v1 Core Features',
      items: [
        {
          icon: '🔊',
          title: 'Native Audio-Video Sync',
          description: 'Generate <strong>video and audio together</strong>—dialogue, lip movement, and ambient sound in one workflow instead of separate dubbing.'
        },
        {
          icon: '👥',
          title: 'Reference-Driven Casting',
          description: 'Reference-to-video accepts <strong>1–9 images</strong> with character placeholders for consistent multi-subject scenes.'
        },
        {
          icon: '✂️',
          title: 'Natural-Language Video Edit',
          description: 'Upload MP4/MOV and instruct changes in text—optional <strong>0–5 reference images</strong> and audio auto/origin controls.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'Four v1 workflows in the browser—<strong>credits shown before generate</strong>; no local GPU install required.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Short drama & dialogue clips',
        'Brand ads with voiceover',
        'Social & vertical video',
        'Character-consistent promos',
        'Quick video edits in the cloud'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 HappyHorse v1 vs Traditional Two-Stage Video',
      ariaLabel: 'HappyHorse v1 vs traditional text-to-video',
      headers: ['Dimension', 'HappyHorse v1', 'Traditional two-stage'],
      rows: [
        [
          'Audio',
          '<strong>Native audio-video</strong> in one generation pass',
          'Silent video, then separate dubbing and alignment'
        ],
        ['Lip sync', 'Built into the model output', 'Often requires post-production fixes'],
        [
          'Workflows on FuseAITools',
          '<strong>Four modes</strong>—T2V, I2V, reference, edit',
          'Separate tools per step'
        ],
        [
          'Output (form)',
          '<strong>3–15s</strong> (generate modes); <strong>720p / 1080p</strong>',
          'Varies by provider'
        ]
      ]
    },
    {
      type: 'table',
      id: 'compare-v11-heading',
      title: '🆚 HappyHorse v1 vs v1.1 · Text to Video',
      ariaLabel: 'HappyHorse v1 vs v1.1 text-to-video parameters',
      headers: ['Parameter', 'HappyHorse v1', 'HappyHorse v1.1'],
      rows: [
        ['Model', '<code>happyhorse-text-to-video</code>', '<code>happyhorse-1-1-text-to-video</code>'],
        ['Prompt', 'Required, 1–5000 chars', 'Required, 1–5000 chars'],
        ['Aspect ratios', '16:9, 9:16, 1:1, 4:3, 3:4', '<strong>Nine</strong>—adds 4:5, 5:4, 9:21, 21:9'],
        ['Duration', '3–15s', '3–15s'],
        ['Resolution', '720p / 1080p', '720p / 1080p'],
        ['Seed', '<strong>Optional seed accepted</strong>', 'Vendor rejects seed'],
        ['Pricing', 'Per second × resolution', 'Per second × resolution']
      ],
      lead: 'Same required prompt, duration, resolution, and native audio—the differences are <strong>framing breadth</strong> and the <strong>seed</strong> knob.',
      paths: ['/home/happy-horse/v1-text-to-video']
    },
    {
      type: 'table',
      id: 'compare-v11-heading',
      title: '🆚 HappyHorse v1 vs v1.1 · Image to Video',
      ariaLabel: 'HappyHorse v1 vs v1.1 image-to-video parameters',
      headers: ['Parameter', 'HappyHorse v1', 'HappyHorse v1.1'],
      rows: [
        ['Model', '<code>happyhorse-image-to-video</code>', '<code>happyhorse-1-1-image-to-video</code>'],
        ['Input', 'Exactly 1 image URL', 'Exactly 1 image URL'],
        ['Prompt', 'Optional, max 5000 chars', 'Optional, max 5000 chars'],
        ['Aspect ratio', 'Follows input frame', 'Follows input frame'],
        ['Duration', '3–15s', '3–15s'],
        ['Resolution', '720p / 1080p', '720p / 1080p'],
        ['Seed', '<strong>Optional seed accepted</strong>', 'Vendor rejects seed'],
        ['Pricing', 'Per second × resolution', 'Per second × resolution']
      ],
      lead: 'Both animate one still with an optional prompt and follow the input frame’s ratio—the split is the <strong>seed</strong>.',
      paths: ['/home/happy-horse/v1-image-to-video']
    },
    {
      type: 'table',
      id: 'compare-v11-heading',
      title: '🆚 HappyHorse v1 vs v1.1 · Reference to Video',
      ariaLabel: 'HappyHorse v1 vs v1.1 reference-to-video parameters',
      headers: ['Parameter', 'HappyHorse v1', 'HappyHorse v1.1'],
      rows: [
        [
          'Model',
          '<code>happyhorse-reference-to-video</code>',
          '<code>happyhorse-1-1-reference-to-video</code>'
        ],
        ['Prompt', 'Required + 1–9 images', 'Required + 1–9 images'],
        ['Citation', 'character1, character2…', '<strong>[Image 1], [Image 2]…</strong>'],
        ['Request field', '<code>imageUrls</code>', '<code>referenceImage</code>'],
        ['Aspect ratios', 'Same five as T2V', '<strong>Nine</strong>—adds 4:5, 5:4, 9:21, 21:9'],
        ['Duration', '3–15s', '3–15s'],
        ['Resolution', '720p / 1080p', '720p / 1080p'],
        ['Seed', '<strong>Optional seed accepted</strong>', 'Vendor rejects seed'],
        ['Pricing', 'Per second × resolution', 'Per second × resolution']
      ],
      lead: 'Both take a prompt plus 1–9 images—the differences are <strong>citation syntax</strong>, the request <strong>field name</strong>, framing breadth, and the seed.',
      paths: ['/home/happy-horse/v1-reference-to-video']
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (HappyHorse v1)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ HappyHorse v1 Technical Specs',
      ariaLabel: 'HappyHorse v1 workflow capabilities',
      headers: ['Workflow', 'Required input', 'Duration', 'Resolution / ratio', 'Key controls'],
      rows: [
        [
          '<strong>Text to Video</strong>',
          'Prompt (1–5000 chars)',
          '3–15s',
          '720p / 1080p; 16:9, 9:16, 1:1, 4:3, 3:4',
          'Optional seed'
        ],
        [
          '<strong>Image to Video</strong>',
          '1 image URL + optional prompt',
          '3–15s',
          '720p / 1080p',
          'Prompt optional (max 5000); seed'
        ],
        [
          '<strong>Reference to Video</strong>',
          'Prompt + 1–9 reference images',
          '3–15s',
          '720p / 1080p; aspect ratios as T2V',
          'Use character1/2/3… placeholders in prompt'
        ],
        [
          '<strong>Video Edit</strong>',
          'Video URL (MP4/MOV) + prompt',
          'Billed by source length (ceil sec, API 3–60s)',
          '720p / 1080p',
          '0–5 reference images; audio auto/origin; seed'
        ]
      ],
      lead: 'Parameters below match the FuseAITools HappyHorse form and API (<code>happyhorse-*</code> models).',
      note: 'Image inputs: JPEG, JPG, PNG, WebP (max 10MB). Video edit accepts MP4 or MOV. Credits are shown on the Generate button before submission.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'HappyHorse v1 — Four Video Workflows',
      lead: 'Choose the mode that matches your source material:',
      items: [
        {
          name: 'HappyHorse v1 Text to Video',
          title: 'Text to Video',
          description: 'Prompt-only clips with aspect ratio, 3–15s, and 720p/1080p—native audio included.',
          path: '/home/happy-horse/v1-text-to-video',
          icon: 'fas fa-font'
        },
        {
          name: 'HappyHorse v1 Image to Video',
          title: 'Image to Video',
          description: 'Animate one still image with an optional motion prompt—3–15s at 720p/1080p.',
          path: '/home/happy-horse/v1-image-to-video',
          icon: 'fas fa-image'
        },
        {
          name: 'HappyHorse v1 Reference to Video',
          title: 'Reference to Video',
          description: '1–9 reference images with character placeholders for consistent multi-subject scenes.',
          path: '/home/happy-horse/v1-reference-to-video',
          icon: 'fas fa-images'
        },
        {
          name: 'HappyHorse v1 Video Edit',
          title: 'Video Edit',
          description: 'Upload MP4/MOV and edit with natural language—optional references and audio setting.',
          path: '/home/happy-horse/v1-video-edit',
          icon: 'fas fa-edit'
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
      html: '🎬 Need multi-reference or director-style editing? <a href="/home/wan/v2-7-text-to-video" class="seo-inline-link" >Explore Wan 2.7 →</a> for frame control, natural-language edit, and R2V with up to five references.'
    },
    {
      pricing: false,
      html: '⚡ Same workflow, newer engine—open the matching <a href="/home/happy-horse/v1-1-text-to-video" class="seo-inline-link">HappyHorse v1.1 Text to Video →</a> for nine aspect ratios (adds 4:5, 5:4, 9:21, 21:9); note it drops the seed.',
      paths: ['/home/happy-horse/v1-text-to-video']
    },
    {
      pricing: false,
      html: '⚡ Same workflow, newer engine—open the matching <a href="/home/happy-horse/v1-1-image-to-video" class="seo-inline-link">HappyHorse v1.1 Image to Video →</a> for the v1.1 engine—identical one-image flow, just without a seed field.',
      paths: ['/home/happy-horse/v1-image-to-video']
    },
    {
      pricing: false,
      html: '⚡ Same workflow, newer engine—open the matching <a href="/home/happy-horse/v1-1-reference-to-video" class="seo-inline-link">HappyHorse v1.1 Reference to Video →</a> to cite assets as [Image 1], [Image 2]… with nine aspect ratios; note it drops the seed.',
      paths: ['/home/happy-horse/v1-reference-to-video']
    }
  ]
}
