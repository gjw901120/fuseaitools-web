/**
 * SeedanceV15 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：SeedanceV15SeoContent.vue）
 */
export default {
  component: 'SeedanceV15SeoContent',
  rootId: 'seedance-v15-section',
  rootClass: 'seedance-seo',
  meta: {
    name: 'Seedance 1.5 Pro Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Seedance 1.5 Pro unified text and image-to-video on FuseAITools—4–12s slider, 480p/720p/1080p, optional audio and fixed lens.'
  },
  badge: '🎵 Seedance 1.5 Pro · Unified T2V/I2V · Optional Audio',
  introByPath: {
    '/home/seedance/v1-5-pro': {
      title: '🎵 Seedance 1.5 Pro',
      lead: 'One workflow for <strong>text-to-video</strong> or <strong>image-to-video</strong>—add up to <strong>two reference images</strong> when needed. Pick <strong>4–12 seconds</strong> with a smooth slider, <strong>480p/720p/1080p</strong>, aspect ratios through <strong>21:9</strong>, plus optional <strong>audio generation</strong> and <strong>fixed lens</strong>.'
    }
  },
  definitionByPath: {
    '/home/seedance/v1-5-pro': {
      title: 'What is Seedance 1.5 Pro?',
      body: '<strong>Seedance 1.5 Pro</strong> on FuseAITools is a unified video generator (<code>seedance-1.5-pro</code>). Required: <strong>prompt (3–2500 characters)</strong>. Optional: <strong>0–2 input image URLs</strong> for image-guided scenes. Duration is a <strong>4–12 second slider</strong> (whole seconds) at <strong>480p, 720p, or 1080p</strong>—toggle <strong>fixed lens</strong> and <strong>generate audio</strong> as needed.'
    }
  },
  faqByPath: {
    '/home/seedance/v1-5-pro': [
      {
        question: 'How do I use Seedance 1.5 Pro for text-to-video vs image-to-video?',
        answer: 'For <strong>text-to-video</strong>, leave reference images empty and write your prompt. For <strong>image-to-video</strong>, upload <strong>1–2 image URLs</strong> alongside the prompt—the same page handles both without switching workflows.'
      },
      {
        question: 'How does audio generation affect pricing on Seedance 1.5 Pro?',
        answer: 'Enabling <strong>generate audio</strong> uses the <strong>with_sound</strong> pricing tier; disabling it uses <strong>without_sound</strong>. Credits also depend on <strong>duration (4–12s)</strong> and <strong>resolution</strong>—check the Generate button before submitting.'
      },
      {
        question: 'What does fixed lens do on Seedance 1.5 Pro?',
        answer: '<strong>Fixed lens</strong> stabilizes camera perspective—useful for product shots and talking-head style clips where you want minimal camera movement.'
      },
      {
        question: 'What aspect ratios does Seedance 1.5 Pro support?',
        answer: 'Choose <strong>1:1, 4:3, 3:4, 16:9, 9:16, or 21:9</strong> in the form. Prompt length is <strong>3–2500 characters</strong>—shorter than v1 modes but optimized for 1.5 Pro quality.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Seedance 1.5 Pro?',
      answer: 'No—Seedance 1.5 Pro runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
    },
    {
      question: 'How do I try Seedance 1.5 Pro on FuseAITools?',
      answer: 'Open this workflow and generate. New users receive <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for credit packs and member rates.'
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
      title: '🎵 Seedance 1.5 Pro on FuseAITools',
      html: 'Seedance 1.5 Pro on <a href="/" class="seo-inline-link">FuseAITools</a> merges <strong>text-to-video</strong> and <strong>image-to-video</strong> in one workflow—add <strong>0–2 reference images</strong> when you need I2V, or run prompt-only for T2V. Toggle <strong>fixed lens</strong> and optional <strong>audio generation</strong>; credits reflect duration, resolution, and sound settings. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Seedance 1.5 Pro Core Features',
      items: [
        {
          icon: '🔀',
          title: 'Unified T2V / I2V',
          description: 'One form for prompt-only or <strong>0–2 reference images</strong>—no separate pages for text vs image starts.'
        },
        {
          icon: '🔊',
          title: 'Optional Audio',
          description: 'Toggle <strong>generate audio</strong> for sound-aware clips; pricing reflects with_sound vs without_sound tiers.'
        },
        {
          icon: '⏱️',
          title: '4–12 Second Clips',
          description: 'Continuous duration slider from 4 to 12 seconds—pick any whole-second length at <strong>480p–1080p</strong>.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'Fixed lens, aspect ratio, and resolution controls in the browser—<strong>credits shown before generate</strong>.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Short ads with voiceover',
        'Product demos with stable camera',
        'Social clips at 9:16',
        'Image-guided brand stories',
        'Mid-length 8–12s narratives'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Seedance 1.5 Pro vs v1 Lite/Pro',
      ariaLabel: 'Seedance 1.5 Pro vs v1',
      headers: ['Dimension', '1.5 Pro', 'v1 Lite/Pro'],
      rows: [
        [
          'Workflows',
          '<strong>One unified mode</strong>—T2V or I2V via optional images',
          'Separate T2V and I2V pages per tier'
        ],
        ['Duration', '<strong>4–12s</strong> (slider, 1s step)', '5s / 10s'],
        ['Audio', 'Optional <strong>generate audio</strong> toggle', 'Silent output'],
        ['Reference images', '<strong>0–2</strong> optional input URLs', '1 image (I2V modes)'],
        ['Prompt', '<strong>3–2500 characters</strong>', 'Up to 10,000 characters']
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Seedance 1.5 Pro)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Seedance 1.5 Pro Technical Specs',
      ariaLabel: 'Seedance 1.5 Pro capabilities',
      headers: ['Input mode', 'Required', 'Duration', 'Resolution / ratio', 'Key controls'],
      rows: [
        [
          '<strong>Text to Video</strong>',
          'Prompt (3–2500 chars)',
          '4–12s',
          '480p–1080p; 1:1, 4:3, 3:4, 16:9, 9:16, 21:9',
          'Fixed lens, generate audio'
        ],
        [
          '<strong>Image to Video</strong>',
          'Prompt + 1–2 image URLs',
          '4–12s',
          '480p–1080p; same aspect ratios',
          'Fixed lens, generate audio'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Seedance form and API (<code>seedance-1.5-pro</code>).',
      note: 'Credits vary by duration, resolution, and whether audio generation is enabled (with_sound / without_sound). Image inputs: JPEG, PNG, WebP (max 10MB).'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Seedance 1.5 Pro Workflow',
      lead: 'One page for both text-only and image-guided generation:',
      items: [
        {
          name: 'Seedance 1.5 Pro',
          title: 'Unified T2V / I2V',
          description: 'Prompt-only or 0–2 reference images—4–12s slider, optional audio, fixed lens.',
          path: '/home/seedance/v1-5-pro',
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
      html: '🖼️ <strong>ByteDance image companion — Seedream</strong> Generate hero stills with <a href="/home/seedream/5-lite-text-to-image" class="seo-inline-link" >Seedream 5 Lite</a> or edit reference frames in <a href="/home/seedream/5-lite-image-to-image" class="seo-inline-link" >Seedream I2I</a> before Seedance 1.5 Pro or Seedance 2 video runs.'
    },
    {
      pricing: false,
      html: '⚡ Need separate Lite/Pro tiers or 21:9 vertical 9:21? <a href="/home/seedance/v1-lite-text-to-video" class="seo-inline-link" >Browse Seedance v1 →</a> for five dedicated Lite and Pro workflows.'
    },
    {
      pricing: false,
      html: '🎬 Want first/last frame and multimodal references? <a href="/home/seedance/v2" class="seo-inline-link" >Explore Seedance 2 →</a> for 4–15s clips with image, video, and audio conditioning.'
    },
    {
      pricing: false,
      html: '⏱️ Need longer duration (up to 30s) with multimodal refs? <a href="/home/seedance/v2-5" class="seo-inline-link" >Try Seedance 2.5 →</a> for 4–30s at 480p/720p/1080p.'
    }
  ]
}
