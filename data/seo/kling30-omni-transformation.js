/**
 * Kling30OmniTransformation SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：Kling30OmniTransformationSeoContent.vue）
 */
export default {
  component: 'Kling30OmniTransformationSeoContent',
  rootId: 'kling-3-0-omni-transformation-section',
  rootClass: 'kling-seo',
  meta: {
    name: 'Kling 3.0 Omni Video Transformation on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Kling 3.0 Omni Video Transformation turns one uploaded source video into a restyled clip from a prompt, with optional reference images. Billed by the actual video length at 720p/1080p/4K.'
  },
  badge: '🎬 Kling 3.0 Omni · Video Transformation · Video-to-Video · 720p/1080p/4K',
  faqByPath: {
    '/home/kling/3-0-omni-text-to-video': [
      {
        question: 'How is the cost calculated for Video Transformation?',
        answer: 'The tool reads your uploaded video\'s duration, rounds it up to whole seconds, and matches that length against the selected resolution (720p, 1080p or 4K). There is no per-second selector and no audio or scene surcharge. Before you upload a video, a 5-second example price is shown.'
      },
      {
        question: 'What are the source video requirements?',
        answer: 'Exactly one MP4 or MOV file, between 3 and 15.5 seconds long, with edges between 700 and 4553 pixels, an aspect ratio between 0.4 and 2, and a frame rate between 24 and 60fps.'
      },
      {
        question: 'When can I choose an aspect ratio?',
        answer: 'With a video-only upload the aspect ratio stays <code>auto</code> and follows the source. Once you attach reference images, you can pick 16:9, 9:16 or 1:1 for the transformed output.'
      },
      {
        question: 'Does Video Transformation generate audio?',
        answer: 'No. Because a source video is always present, the vendor does not generate new audio, and the audio flag is kept off without affecting the credit cost.'
      },
      {
        question: 'Do I need a local GPU?',
        answer: 'No—Video Transformation runs in the cloud on FuseAITools. Credits are shown on the Generate button before you submit.'
      }
    ],
    '/home/kling/3-0-omni-image-to-video': [
      {
        question: 'How is the cost calculated for Video Transformation?',
        answer: 'The tool reads your uploaded video\'s duration, rounds it up to whole seconds, and matches that length against the selected resolution (720p, 1080p or 4K). There is no per-second selector and no audio or scene surcharge. Before you upload a video, a 5-second example price is shown.'
      },
      {
        question: 'What are the source video requirements?',
        answer: 'Exactly one MP4 or MOV file, between 3 and 15.5 seconds long, with edges between 700 and 4553 pixels, an aspect ratio between 0.4 and 2, and a frame rate between 24 and 60fps.'
      },
      {
        question: 'When can I choose an aspect ratio?',
        answer: 'With a video-only upload the aspect ratio stays <code>auto</code> and follows the source. Once you attach reference images, you can pick 16:9, 9:16 or 1:1 for the transformed output.'
      },
      {
        question: 'Does Video Transformation generate audio?',
        answer: 'No. Because a source video is always present, the vendor does not generate new audio, and the audio flag is kept off without affecting the credit cost.'
      },
      {
        question: 'Do I need a local GPU?',
        answer: 'No—Video Transformation runs in the cloud on FuseAITools. Credits are shown on the Generate button before you submit.'
      }
    ],
    '/home/kling/3-0-omni-reference-to-video': [
      {
        question: 'How is the cost calculated for Video Transformation?',
        answer: 'The tool reads your uploaded video\'s duration, rounds it up to whole seconds, and matches that length against the selected resolution (720p, 1080p or 4K). There is no per-second selector and no audio or scene surcharge. Before you upload a video, a 5-second example price is shown.'
      },
      {
        question: 'What are the source video requirements?',
        answer: 'Exactly one MP4 or MOV file, between 3 and 15.5 seconds long, with edges between 700 and 4553 pixels, an aspect ratio between 0.4 and 2, and a frame rate between 24 and 60fps.'
      },
      {
        question: 'When can I choose an aspect ratio?',
        answer: 'With a video-only upload the aspect ratio stays <code>auto</code> and follows the source. Once you attach reference images, you can pick 16:9, 9:16 or 1:1 for the transformed output.'
      },
      {
        question: 'Does Video Transformation generate audio?',
        answer: 'No. Because a source video is always present, the vendor does not generate new audio, and the audio flag is kept off without affecting the credit cost.'
      },
      {
        question: 'Do I need a local GPU?',
        answer: 'No—Video Transformation runs in the cloud on FuseAITools. Credits are shown on the Generate button before you submit.'
      }
    ]
  },
  sections: [
    {
      type: 'intro',
      id: 'workflow-intro-heading',
      title: '🔄 Kling 3.0 Omni Video Transformation',
      html: 'Upload <strong>one source video</strong> (MP4/MOV, 3–15.5s), describe the target look in a prompt (≤<strong>3072</strong> chars), and optionally add up to <strong>4 reference images</strong> to steer the style. There is <strong>no duration selector</strong>—credits are matched to the <strong>actual uploaded video length</strong> (rounded up) and your chosen <strong>resolution</strong> (720p / 1080p / 4K). Before you upload, a 5s example price is shown.'
    },
    {
      type: 'definition',
      id: 'definition-heading',
      title: 'What is Kling 3.0 Omni Video Transformation?',
      html: '<strong>Kling 3.0 Omni Video Transformation</strong> (<code>kling-3.0-omni-transformation</code>) is a video-to-video mode in the Omni family on <a href="/" class="seo-inline-link">FuseAITools</a>. Instead of generating a clip from scratch, it restyles an existing uploaded clip with a text prompt and optional reference images—ideal for re-cutting footage, changing mood or art direction, and iterating on takes you already have.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Core Features',
      items: [
        {
          icon: '🎥',
          title: 'Restyle a Real Clip',
          description: 'Upload one source video (3–15.5s) and transform it with a text prompt.'
        },
        {
          icon: '🖼️',
          title: 'Optional References',
          description: 'Add up to <strong>4 reference images</strong> to steer look and mood.'
        },
        {
          icon: '⏱️',
          title: 'Billed by Real Length',
          description: 'No duration knob—cost follows the actual uploaded video length (rounded up).'
        },
        {
          icon: '🧬',
          title: 'Subject Elements',
          description: 'Register reusable characters/objects and reference them with <code>@name</code>.'
        },
        {
          icon: '🖥️',
          title: '720p / 1080p / 4K',
          description: 'Draft at 720p, deliver at 1080p, or go large-screen at 4K.'
        },
        {
          icon: '🤐',
          title: 'Silent by Design',
          description: 'A source video means no new audio is generated—audio stays off and never adds cost.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: ['Video restyling', 'Mood regrading', 'Footage iteration', 'Reference-driven looks', '4K re-cuts']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 How Billing Works',
      ariaLabel: 'Kling 3.0 Omni Video Transformation billing',
      headers: ['Aspect', 'Behavior'],
      rows: [
        [
          '<strong>Duration</strong>',
          'Read from your uploaded video and rounded up to whole seconds—no manual selection.'
        ],
        ['<strong>Default preview</strong>', 'Before a video is uploaded, a 5s example price is shown.'],
        [
          '<strong>Price dimensions</strong>',
          'Matched by actual duration and resolution (720p / 1080p / 4K). No audio or scene surcharge.'
        ],
        [
          '<strong>Aspect ratio</strong>',
          '<code>auto</code> for video-only; 16:9 / 9:16 / 1:1 when reference images are attached.'
        ]
      ],
      note: '💳 Credits per generation = the rate matched for your uploaded clip\'s rounded-up length and the selected resolution. Because a source video is always present, audio is kept off and never affects pricing. See <a href="/pricing" class="seo-pricing-link">pricing</a> for subscription discounts and top-ups.'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Technical Specs',
      ariaLabel: 'Kling 3.0 Omni Video Transformation capabilities',
      headers: ['Specification', 'Details'],
      rows: [
        ['Model Key', '<code>kling-3.0-omni-transformation</code>'],
        ['Input Video', 'Exactly 1 MP4/MOV, 3–15.5s, 700–4553px, aspect 0.4–2, 24–60fps'],
        ['Reference Images', 'Optional, up to 4 (JPG/JPEG/PNG)'],
        ['Prompt', 'Required, up to 3,072 characters'],
        ['Duration', 'Derived from the uploaded video (rounded up)'],
        ['Resolution', '720p / 1080p / 4K'],
        ['Aspect Ratio', 'Auto (video-only) or 16:9 / 9:16 / 1:1 (with images)'],
        ['API Endpoint', '<code>/api/video/kling/3-0-omni-transformation</code>']
      ]
    },
    {
      type: 'table',
      id: 'vs-omni-heading',
      title: '🆚 Video Transformation vs Omni Generation',
      ariaLabel: 'Kling 3.0 Omni Video Transformation vs Text / Image / Reference generation',
      headers: ['Dimension', 'Omni Generation (Text / Image / Reference)', 'Video Transformation'],
      rows: [
        [
          '<strong>Input</strong>',
          'Prompt, image(s) or up to 7 images + 3 role videos',
          'One required source video (3–15.5s) + prompt, optional ≤4 images'
        ],
        [
          '<strong>Duration</strong>',
          'Chosen 3–15s slider',
          'Read from the uploaded clip (rounded up)—no selector'
        ],
        ['<strong>Audio</strong>', 'Native audio can be generated', 'Always off (a source clip is present)'],
        [
          '<strong>Scene surcharge</strong>',
          'Billed by scene × per-second rate',
          'No scene—matched by actual duration × resolution only'
        ],
        [
          '<strong>Best for</strong>',
          'Creating a clip from scratch',
          'Restyling / re-cutting footage you already have'
        ]
      ],
      note: 'Generating something new? Use <a href="/home/kling/3-0-omni-text-to-video" class="seo-inline-link">Omni Text to Video</a>, <a href="/home/kling/3-0-omni-image-to-video" class="seo-inline-link">Image to Video</a>, or <a href="/home/kling/3-0-omni-reference-to-video" class="seo-inline-link">Reference to Video</a>.'
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Video Transformation)'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'More Kling 3.0 Omni Workflows',
      items: [
        {
          name: 'Kling 3.0 Omni Text to Video',
          title: 'Omni T2V',
          description: 'Prompt to video with audio, multi-shot and elements.',
          path: '/home/kling/3-0-omni-text-to-video',
          icon: 'fas fa-keyboard'
        },
        {
          name: 'Kling 3.0 Omni Image to Video',
          title: 'Omni I2V',
          description: 'Animate one first-frame image, 3–15s, up to 4K.',
          path: '/home/kling/3-0-omni-image-to-video',
          icon: 'fas fa-image'
        },
        {
          name: 'Kling 3.0 Omni Reference to Video',
          title: 'Omni R2V',
          description: 'Combine up to 7 images + 3 role videos.',
          path: '/home/kling/3-0-omni-reference-to-video',
          icon: 'fas fa-layer-group'
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
      html: '✨ Want to generate from scratch instead of restyling? <a href="/home/kling/3-0-omni-text-to-video" class="seo-inline-link">Kling 3.0 Omni Text to Video</a>, <a href="/home/kling/3-0-omni-image-to-video" class="seo-inline-link">Image</a> or <a href="/home/kling/3-0-omni-reference-to-video" class="seo-inline-link">Reference</a> variants bill per second with native audio and multi-shot.'
    }
  ],
  watchPathIncludes: '/home/kling/3-0-omni-transformation'
}
