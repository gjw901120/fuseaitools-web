/**
 * Hailuo SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：HailuoSeoContent.vue）
 */
export default {
  component: 'HailuoSeoContent',
  rootId: 'hailuo-section',
  rootClass: 'hailuo-seo',
  meta: {
    name: 'Hailuo 2.3 Image to Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Hailuo 2.3 Pro and Standard image-to-video on FuseAITools—one image + prompt, 6s/10s, 768P/1080P; 10s clips are 768P only.'
  },
  badge: '🎬 Hailuo 2.3 · MiniMax · Image to Video · Pro &amp; Standard',
  introByPath: {
    '/home/hailuo/image-to-video-pro': {
      title: '⭐ Hailuo 2.3 Pro Image to Video',
      lead: 'Upload <strong>one image</strong> (JPEG/PNG/WebP, max 10MB) and describe motion with a <strong>prompt</strong> (≤5000 chars). Choose <strong>6s or 10s</strong> and <strong>768P or 1080P</strong>—<strong>10s clips cannot use 1080P</strong>. Model: <code>hailuo-2-3-image-to-video-pro</code>.'
    },
    '/home/hailuo/image-to-video-standard': {
      title: '⚡ Hailuo 2.3 Standard Image to Video',
      lead: 'Same workflow as Pro—<strong>one image + prompt</strong>, <strong>6s/10s</strong>, <strong>768P/1080P</strong>—optimized for faster iteration at slightly lower fidelity. Model: <code>hailuo-2-3-image-to-video-standard</code>.'
    }
  },
  definitionByPath: {
    '/home/hailuo/image-to-video-pro': {
      title: 'What is Hailuo 2.3 Pro Image to Video?',
      body: '<strong>Hailuo 2.3 Pro Image to Video</strong> on FuseAITools animates a single still with MiniMax’s high-fidelity model. Required: <strong>prompt (≤5000 chars)</strong> + <strong>image URL</strong>. Duration <strong>6s or 10s</strong>; resolution <strong>768P or 1080P</strong> (<strong>1080P only when duration is 6s</strong>). RULE pricing by duration and quality.'
    },
    '/home/hailuo/image-to-video-standard': {
      title: 'What is Hailuo 2.3 Standard Image to Video?',
      body: '<strong>Hailuo 2.3 Standard Image to Video</strong> on FuseAITools shares the same form as Pro—<strong>one image</strong>, <strong>prompt ≤5000</strong>, <strong>6s/10s</strong>, <strong>768P/1080P</strong>—with Standard-tier model output for quicker drafts and batch content.'
    }
  },
  faqByPath: {
    '/home/hailuo/image-to-video-pro': [
      {
        question: 'When should I use Hailuo Pro instead of Standard?',
        answer: 'Choose <strong>Pro</strong> for client deliverables, hero social clips, and when cinematic motion fidelity matters most. Use <strong>Standard</strong> for rapid drafts—same controls, different model tier and credit rate.'
      },
      {
        question: 'Why is 1080P disabled for 10-second Hailuo clips?',
        answer: 'The form enforces MiniMax’s constraint: <strong>10-second outputs support 768P only</strong>. Pick <strong>6 seconds</strong> when you need <strong>1080P</strong> resolution.'
      }
    ],
    '/home/hailuo/image-to-video-standard': [
      {
        question: 'Does Hailuo Standard use the same inputs as Pro?',
        answer: 'Yes—<strong>one image</strong> (JPEG/PNG/WebP, max 10MB), <strong>prompt ≤5000</strong>, duration <strong>6s/10s</strong>, and resolution <strong>768P/1080P</strong>. Only the underlying model key differs.'
      },
      {
        question: 'Can I upgrade a Standard render to Pro on the same image?',
        answer: 'Re-run the same image and prompt on <a href="/home/hailuo/image-to-video-pro" class="seo-inline-link">Hailuo Pro</a>—there is no automatic upscale between tiers; submit a new Pro job when you need final fidelity.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Does Hailuo support text-to-video without an image?',
      answer: 'No—both Pro and Standard on FuseAITools are <strong>image-to-video only</strong>. For text-to-video, use <a href="/home/seedance/v1-lite-text-to-video" class="seo-inline-link">Seedance Text to Video</a> or <a href="/home/wan/text-to-video" class="seo-inline-link">Wan Text to Video</a>.'
    },
    {
      question: 'How is Hailuo priced on FuseAITools?',
      answer: 'Both tiers use <strong>RULE</strong> pricing—credits depend on <strong>duration</strong> and <strong>quality</strong> (768p/1080p). The exact amount appears on the Generate button. New users get <strong>20 free credits</strong>—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans.'
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
      title: '🎬 Hailuo on FuseAITools',
      html: '<strong>Hailuo 2.3</strong> (MiniMax) on <a href="/" class="seo-inline-link">FuseAITools</a> animates a <strong>single input image</strong> with a text prompt—realistic motion, expressive characters, and cinematic lighting. Choose <strong>Pro</strong> for highest fidelity or <strong>Standard</strong> for faster iteration; both share the same form controls (6s/10s, 768P/1080P). This hub is <strong>image-to-video only</strong>—not text-to-video from scratch. Credits appear on Generate before submission. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Hailuo Core Features',
      items: [
        {
          icon: '🖼️',
          title: 'Single-Image Animation',
          description: 'Required <strong>one image</strong> + prompt—JPEG, PNG, or WebP up to <strong>10MB</strong>.'
        },
        {
          icon: '🎬',
          title: 'Cinematic Motion',
          description: 'MiniMax Hailuo 2.3 targets realistic movement, expressive faces, and stable lighting across frames.'
        },
        {
          icon: '⚖️',
          title: 'Pro vs Standard',
          description: 'Same form controls—pick <strong>Pro</strong> for max quality or <strong>Standard</strong> for faster iteration.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: '<strong>6s/10s</strong> at <strong>768P/1080P</strong>—credits shown before generate; no local GPU.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Character & portrait animation',
        'Product shot motion',
        'Social & ad short-form',
        'Concept art to clip',
        'Draft → Pro hero pipeline'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Hailuo 2.3 Pro vs Standard',
      ariaLabel: 'Hailuo Pro vs Standard comparison',
      headers: ['Dimension', 'Pro I2V', 'Standard I2V'],
      rows: [
        [
          '<strong>Input</strong>',
          {
            html: '1 image (JPEG/PNG/WebP, max 10MB) + prompt (≤5000)',
            colspan: 2
          }
        ],
        [
          '<strong>modelKey</strong>',
          '<code>hailuo-2-3-image-to-video-pro</code>',
          '<code>hailuo-2-3-image-to-video-standard</code>'
        ],
        [
          '<strong>Duration</strong>',
          {
            html: '6s or 10s',
            colspan: 2
          }
        ],
        [
          '<strong>Resolution</strong>',
          {
            html: '768P or 1080P (<strong>10s → 768P only</strong>)',
            colspan: 2
          }
        ],
        [
          '<strong>Best for</strong>',
          'Hero assets, client work, max cinematic fidelity',
          'Drafts, batch runs, faster turnaround'
        ]
      ],
      note: 'Need text-to-video without a source image? Try <a href="/home/seedance/v1-lite-text-to-video" class="seo-inline-link">Seedance Text to Video</a> or <a href="/home/wan/text-to-video" class="seo-inline-link">Wan Text to Video</a>.'
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Hailuo 2.3)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Hailuo 2.3 Technical Specs',
      ariaLabel: 'Hailuo workflow capabilities',
      headers: ['Tier', 'Required input', 'Duration', 'Resolution', 'Pricing'],
      rows: [
        [
          '<strong>Pro</strong>',
          'Prompt + 1 image URL',
          '6s or 10s',
          '768P / 1080P*',
          'RULE: duration + quality (768p/1080p)'
        ],
        [
          '<strong>Standard</strong>',
          'Prompt + 1 image URL',
          '6s or 10s',
          '768P / 1080P*',
          'RULE: duration + quality (768p/1080p)'
        ]
      ],
      lead: 'Parameters match the FuseAITools Hailuo form (<code>hailuo-2-3-image-to-video-*</code>).',
      note: '*10-second clips do not support 1080P in the form—select 768P for 10s output.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Hailuo 2.3 — Two Image-to-Video Tiers',
      lead: 'Same controls—pick Pro for quality or Standard for speed.',
      items: [
        {
          name: 'Hailuo 2.3 Pro Image to Video',
          title: 'Pro',
          description: 'Highest-fidelity I2V—6s/10s at 768P/1080P (10s → 768P only).',
          path: '/home/hailuo/image-to-video-pro',
          icon: 'fas fa-star'
        },
        {
          name: 'Hailuo 2.3 Standard Image to Video',
          title: 'Standard',
          description: 'Balanced speed and quality—same prompt, image, duration, and resolution controls.',
          path: '/home/hailuo/image-to-video-standard',
          icon: 'fas fa-bolt'
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
      html: '🖼️ Need a hero still first? <a href="/home/seedream/5-lite-text-to-image" class="seo-inline-link">Seedream Text to Image →</a> then animate here—or compare <a href="/home/seedance/v1-lite-image-to-video" class="seo-inline-link">Seedance Image to Video</a> and <a href="/home/wan/image-to-video" class="seo-inline-link">Wan Image to Video</a>.'
    },
    {
      pricing: false,
      html: '⚡ Draft on Standard, finish on Pro—start with <a href="/home/hailuo/image-to-video-standard" class="seo-inline-link">Hailuo Standard →</a> for fast iteration, then switch to <a href="/home/hailuo/image-to-video-pro" class="seo-inline-link">Hailuo Pro →</a> for final 6s/1080P hero clips.'
    }
  ]
}
