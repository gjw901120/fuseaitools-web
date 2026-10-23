/**
 * Wan30Video SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：Wan30VideoSeoContent.vue）
 */
export default {
  component: 'Wan30VideoSeoContent',
  rootId: 'wan-30-section',
  rootClass: 'wan-seo',
  meta: {
    name: 'Wan 3.0 Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Wan 3.0 Video on FuseAITools—one unified entry for text-to-video, first/last frame, all-capability reference, file, and link generation. 2–30s clips at 480p/720p/1080p with per-second credit pricing.'
  },
  badge: '🎬 Wan 3.0 · One Entry, Five Input Modes · 2–30s · Per-Second Pricing',
  faqByPath: {
    '/home/wan/v2-7-text-to-video': [
      {
        question: 'How many reference media can Wan 3.0 accept?',
        answer: 'In <strong>Reference</strong> mode you can pass up to <strong>10 images</strong>, <strong>5 videos</strong> (each 1–15s, total ≤ 15s), and <strong>5 audio clips</strong>. Reference them in the prompt as <strong>Image1 / Video1 / Audio1</strong>. Total input video duration plus your chosen output duration must stay ≤ <strong>30 seconds</strong>.'
      },
      {
        question: 'Can I combine first/last frame with references or files?',
        answer: 'No—<strong>first/last frame</strong>, <strong>reference</strong>, <strong>file</strong>, and <strong>link</strong> inputs are mutually exclusive. <strong>last_frame_url</strong> also requires a <strong>first_frame_url</strong>. Pick one input mode per generation.'
      },
      {
        question: 'What resolutions and aspect ratios does Wan 3.0 support?',
        answer: 'Resolution is <strong>480p, 720p, or 1080p</strong> (default 1080p). Aspect ratio can be <strong>adaptive</strong> (auto from inputs, default) or fixed <strong>16:9, 4:3, 1:1, 3:4, 9:16</strong>.'
      },
      {
        question: 'How is Wan 3.0 priced on FuseAITools?',
        answer: 'Credits are billed <strong>per second × resolution</strong>. The form shows the estimate before you generate: it takes the per-second rate for your chosen resolution and multiplies by the duration in seconds.'
      },
      {
        question: 'Do I need a local GPU, and how do I start?',
        answer: 'No—Wan 3.0 runs in the cloud. Open the <strong>Wan 3.0</strong> tab, choose an input mode, and generate. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for top-ups.'
      }
    ],
    '/home/wan/2-7-image-pro': [
      {
        question: 'How many reference media can Wan 3.0 accept?',
        answer: 'In <strong>Reference</strong> mode you can pass up to <strong>10 images</strong>, <strong>5 videos</strong> (each 1–15s, total ≤ 15s), and <strong>5 audio clips</strong>. Reference them in the prompt as <strong>Image1 / Video1 / Audio1</strong>. Total input video duration plus your chosen output duration must stay ≤ <strong>30 seconds</strong>.'
      },
      {
        question: 'Can I combine first/last frame with references or files?',
        answer: 'No—<strong>first/last frame</strong>, <strong>reference</strong>, <strong>file</strong>, and <strong>link</strong> inputs are mutually exclusive. <strong>last_frame_url</strong> also requires a <strong>first_frame_url</strong>. Pick one input mode per generation.'
      },
      {
        question: 'What resolutions and aspect ratios does Wan 3.0 support?',
        answer: 'Resolution is <strong>480p, 720p, or 1080p</strong> (default 1080p). Aspect ratio can be <strong>adaptive</strong> (auto from inputs, default) or fixed <strong>16:9, 4:3, 1:1, 3:4, 9:16</strong>.'
      },
      {
        question: 'How is Wan 3.0 priced on FuseAITools?',
        answer: 'Credits are billed <strong>per second × resolution</strong>. The form shows the estimate before you generate: it takes the per-second rate for your chosen resolution and multiplies by the duration in seconds.'
      },
      {
        question: 'Do I need a local GPU, and how do I start?',
        answer: 'No—Wan 3.0 runs in the cloud. Open the <strong>Wan 3.0</strong> tab, choose an input mode, and generate. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for top-ups.'
      }
    ]
  },
  sections: [
    {
      type: 'intro',
      id: 'workflow-intro-heading',
      title: '📝 Wan 3.0 Video',
      html: 'Wan 3.0 Video on <a href="/" class="seo-inline-link">FuseAITools</a> collapses five generation paths into <strong>one workflow</strong>: switch between <strong>Text</strong>, <strong>First/Last Frame</strong>, <strong>Reference</strong> (up to 10 images / 5 videos / 5 audio clips), <strong>File</strong>, and <strong>Link</strong> inside the form. Write prompts up to <strong>20000 characters</strong>, output <strong>2–30 seconds</strong> at <strong>480p / 720p / 1080p</strong>, and pay <strong>per second × resolution</strong> in credits.'
    },
    {
      type: 'definition',
      id: 'definition-heading',
      title: 'What is Wan 3.0 Video?',
      html: '<strong>Wan 3.0 Video</strong> (<code>wan-3-0-video</code>) on FuseAITools is Alibaba\'s unified video generation entry. A single form handles text-to-video, strict first/last-frame animation, all-capability reference generation (cite materials as <strong>Image1 / Video1 / Audio1</strong> in the prompt), file-to-video, and link-to-video. Choose <strong>adaptive</strong> or fixed aspect ratios, set duration <strong>2–30s</strong>, toggle output audio and the NSFW checker, and pin a seed for reproducibility.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Wan 3.0 Core Features',
      items: [
        {
          icon: '🧩',
          title: 'One Entry, Five Input Modes',
          description: 'Switch <strong>Text / First-Last Frame / Reference / File / Link</strong> inside a single tab—no page hopping between workflows.'
        },
        {
          icon: '🎚️',
          title: 'All-Capability Reference',
          description: 'Combine up to <strong>10 images, 5 videos, and 5 audio clips</strong> and cite them as <strong>Image1 / Video1 / Audio1</strong> in the prompt.'
        },
        {
          icon: '⏱️',
          title: 'Longer 2–30s Clips',
          description: 'Extended duration up to <strong>30 seconds</strong> (input-video total + duration stays ≤ 30s) at <strong>480p–1080p</strong>.'
        },
        {
          icon: '📄',
          title: 'File & Link to Video',
          description: 'Turn a single uploaded <strong>file</strong> or a public <strong>web link</strong> into a video—inputs the 2.7 lineup didn\'t offer.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for Long-Form & Reference-Driven Production',
      items: [
        'Long-form brand films',
        'Reference-locked character scenes',
        'File / link-driven explainers',
        'Storyboard keyframe animation',
        'Audio-synced shorts'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Wan 3.0 vs Wan 2.7',
      ariaLabel: 'Wan 3.0 vs Wan 2.7',
      headers: ['Dimension', 'Wan 2.7', 'Wan 3.0'],
      rows: [
        ['Entry', 'Separate tabs (T2V / I2V / Edit / R2V)', '<strong>One tab, five input modes</strong>'],
        ['Prompt', '3–5000 chars', '<strong>Up to 20000</strong> chars'],
        ['Duration', '2–15s', '<strong>2–30s</strong> (input-video total + duration ≤ 30s)'],
        ['Resolution', '720p / 1080p', '<strong>480p / 720p / 1080p</strong>'],
        ['References', 'Up to 5 images/videos (R2V)', '<strong>10 images + 5 videos + 5 audio</strong>'],
        ['Extra inputs', '—', '<strong>File</strong> &amp; <strong>Link</strong> to video'],
        ['Aspect ratio', '16:9, 9:16, 1:1, 4:3, 3:4', '<strong>adaptive</strong>, 16:9, 4:3, 1:1, 3:4, 9:16'],
        ['Pricing', 'Per generation', '<strong>Per second × resolution</strong>']
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Wan 3.0)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Wan 3.0 Technical Specs',
      ariaLabel: 'Wan 3.0 input mode capabilities',
      headers: ['Input mode', 'Required input', 'Limits', 'Notes'],
      rows: [
        [
          '<strong>Text</strong>',
          'Prompt (≤20000 chars)',
          'Duration 2–30s',
          'Prompt is required for pure text-to-video'
        ],
        [
          '<strong>First/Last Frame</strong>',
          'First frame URL (last frame optional)',
          '≤1 image each',
          'Last frame requires a first frame; can\'t mix with references'
        ],
        [
          '<strong>Reference</strong>',
          'Images / videos / audio',
          '≤10 img, ≤5 vid, ≤5 audio',
          'Cite as Image1/Video1/Audio1; input video total + duration ≤ 30s'
        ],
        ['<strong>File</strong>', 'One reference file URL', '≤1 file', 'Can\'t combine with link or frame inputs'],
        ['<strong>Link</strong>', 'One public web URL', '≤1 link', 'Login-free, publicly accessible page only']
      ],
      lead: 'Parameters below match the FuseAITools Wan 3.0 form and API (<code>wan-3-0-video</code>).',
      note: 'Output controls shared across modes: <strong>480p / 720p / 1080p</strong>, aspect ratio <strong>adaptive / 16:9 / 4:3 / 1:1 / 3:4 / 9:16</strong>, duration <strong>2–30s</strong>, audio track on/off, NSFW checker on/off, and optional seed (0–2147483647). Credits are billed <strong>per second × resolution</strong>.'
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for Wan 3.0 per-second costs.'
    },
    {
      pricing: false,
      html: '🎞️ Need shorter director-style clips? <a href="/home/wan/v2-7-text-to-video" class="seo-inline-link" >Wan 2.7 workflows</a> remain available for 2–15s generations with natural-language video edit and R2V.'
    },
    {
      pricing: false,
      html: '🖼️ Still-first pipelines: create keyframes in <a href="/home/wan/2-7-image-pro" class="seo-inline-link" >Wan 2.7 Image Pro (4K)</a> then animate them as first/last frames here.'
    }
  ],
  watchPathIncludes: 'v3-0-video'
}
