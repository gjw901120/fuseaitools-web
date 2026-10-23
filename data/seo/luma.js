/**
 * Luma SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：LumaSeoContent.vue）
 */
export default {
  component: 'LumaSeoContent',
  rootId: 'luma-section',
  rootClass: 'luma-seo',
  meta: {
    name: 'Luma Video Modification on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Luma Dream Machine video modification on FuseAITools—upload MP4/MOV/AVI (max 500MB, 10s) and describe changes in English; optional watermark; per-run credits.'
  },
  badge: '🎥 Luma Dream Machine · Video Modification',
  introByPath: {
    '/home/luma/generate': {
      title: '🎥 Luma Video Modification',
      lead: 'Upload a short <strong>MP4, MOV, or AVI</strong> clip (max <strong>500MB</strong>, max <strong>10 seconds</strong>) and describe the visual changes in an <strong>English prompt</strong>. Luma applies your modification description to the input video—strong for 3D-style scene updates and visual effects.'
    }
  },
  definitionByPath: {
    '/home/luma/generate': {
      title: 'What is Luma Video Modification?',
      body: '<strong>Luma Video Modification</strong> on FuseAITools edits an uploaded clip with natural-language instructions. Required: <strong>video URL + English prompt</strong> describing elements to add or change. Supports <strong>MP4, MOV, AVI</strong> up to <strong>500MB</strong> and <strong>10 seconds</strong>. Optional <strong>watermark</strong> identifier for branding. Model key: <code>Luma</code> (per-run credits).'
    }
  },
  faqByPath: {
    '/home/luma/generate': [
      {
        question: 'Does Luma support text-to-video without an input clip?',
        answer: 'No—Luma on FuseAITools is <strong>video modification only</strong>. You must upload a source video. For text or image to video, use <a href="/home/seedance/v1-lite-text-to-video" class="seo-inline-link">Seedance Text to Video</a> or <a href="/home/wan/text-to-video" class="seo-inline-link">Wan Text to Video</a>.'
      },
      {
        question: 'Must Luma prompts be in English?',
        answer: 'Yes—the form and API expect <strong>English-only</strong> modification descriptions. Be specific about visual elements to add or change for best results.'
      },
      {
        question: 'What are the input video limits for Luma?',
        answer: 'Upload <strong>MP4, MOV, or AVI</strong> up to <strong>500MB</strong> and <strong>10 seconds</strong> maximum duration. The file is uploaded to cloud storage before submission.'
      },
      {
        question: 'How is Luma different from Seedance or Wan video flows on FuseAITools?',
        answer: '<strong>Luma</strong> modifies an uploaded clip with <strong>English prompts</strong> (≤10s, 500MB). <strong>Seedance Image to Video</strong> animates a still into a new 5s/10s clip—see <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link">Seedance I2V</a>. <strong>Wan 2.7 Video Edit</strong> edits footage with natural language plus optional references and audio settings—see <a href="/home/wan/v2-7-video-edit" class="seo-inline-link">Wan Video Edit</a>.'
      }
    ]
  },
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
      title: '🎥 Luma on FuseAITools',
      html: '<strong>Luma Dream Machine</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> is a focused <strong>video modification</strong> workflow: upload a short clip, describe the visual changes you want in <strong>English</strong>, and receive a modified render. Ideal for 3D-style scene tweaks, visual effects, and rapid iteration on existing footage—not text-to-video from scratch. Credits appear on the Modify button before submission. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Luma Core Features',
      items: [
        {
          icon: '🎬',
          title: 'Video-In, Video-Out',
          description: 'Modify existing footage—upload a clip and describe changes instead of generating from a blank prompt.'
        },
        {
          icon: '🌐',
          title: 'English Modification Prompts',
          description: 'Detailed <strong>English</strong> descriptions of visual elements to add or alter—matched to the Luma API.'
        },
        {
          icon: '🎥',
          title: 'Short-Clip Optimized',
          description: 'Built for clips up to <strong>10 seconds</strong> and <strong>500MB</strong>—MP4, MOV, or AVI.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'Per-run credits on the Modify button—no local GPU; optional watermark identifier for output branding.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        '3D scene tweaks on short clips',
        'Visual effects experiments',
        'Product demo iterations',
        'Social clip variations',
        'Pre-vis effect tests'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Luma vs Other Video-Edit Flows on FuseAITools',
      ariaLabel: 'Luma vs Seedance I2V vs Wan video edit',
      headers: ['Dimension', 'Luma Modify', 'Seedance I2V', 'Wan 2.7 Video Edit'],
      rows: [
        [
          '<strong>Input</strong>',
          'Video + English prompt',
          '1 image + prompt',
          'Video + prompt (+ optional references)'
        ],
        [
          '<strong>modelKey</strong>',
          '<code>Luma</code>',
          '<code>seedance-v1-lite-image-to-video</code>',
          '<code>wan-2-7-video-edit</code>'
        ],
        ['<strong>Max upload</strong>', '500MB · ≤10s', '1 image (JPG/PNG)', 'Varies by form'],
        ['<strong>Prompt language</strong>', '<strong>English only</strong>', 'Any', 'Any'],
        [
          '<strong>Best for</strong>',
          '3D-style mods on short clips',
          'Animate a still into 5s/10s video',
          'Natural-language edit with audio options'
        ]
      ],
      note: 'Need to create video from text or images? Use <a href="/home/seedance/v1-lite-text-to-video" class="seo-inline-link">Seedance Text to Video</a> or <a href="/home/wan/text-to-video" class="seo-inline-link">Wan Text to Video</a> instead.'
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Luma)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Luma Technical Specs',
      ariaLabel: 'Luma video modification capabilities',
      headers: ['Workflow', 'Required input', 'Video constraints', 'Key controls'],
      rows: [
        [
          '<strong>Video Modification</strong>',
          'English prompt + uploaded video URL',
          'MP4 / MOV / AVI · max <strong>500MB</strong> · max <strong>10 seconds</strong>',
          'Optional watermark identifier'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Luma form and API (<code>POST /api/video/luma/generate</code>, modelKey <code>Luma</code>).',
      note: 'Pricing: ONCE per modification—credits shown on the Modify Video button.'
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for subscription discounts and credit top-ups.'
    },
    {
      pricing: false,
      html: '🎬 Starting from scratch? <a href="/home/seedance/v1-lite-text-to-video" class="seo-inline-link">Seedance Text to Video →</a> or <a href="/home/wan/text-to-video" class="seo-inline-link">Wan Text to Video →</a> for clips from text or images—or <a href="/home/luma/generate" class="seo-inline-link">stay on Luma</a> when you already have a short clip to modify.'
    },
    {
      pricing: false,
      html: '✨ Prefer image-driven generation or edit-with-prompt workflows? <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link">Seedance Image to Video →</a> or <a href="/home/wan/v2-7-video-edit" class="seo-inline-link">Wan 2.7 Video Edit →</a> for reference stills, frame control, and natural-language edits.'
    }
  ]
}
