/**
 * KlingAiAvatar SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：KlingAiAvatarSeoContent.vue）
 */
export default {
  component: 'KlingAiAvatarSeoContent',
  rootId: 'kling-avatar-section',
  rootClass: 'kling-seo',
  meta: {
    name: 'Kling AI Avatar on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Kling AI Avatar Standard and Pro on FuseAITools—audio-driven talking-head video from portrait, voice track, and prompt. Separate from Kling scene generation.'
  },
  badge: '👤 Kling AI Avatar · Audio-Driven · Standard & Pro',
  introByPath: {
    '/home/kling/ai-avatar-standard': {
      title: '👤 Kling AI Avatar Standard',
      lead: '<strong>Audio-driven talking head</strong>—not scene generation. Upload <strong>avatar image</strong>, <strong>audio</strong> (max 10MB), and <strong>prompt</strong> (max 5000). Standard tier for drafts and high-volume explainers.'
    },
    '/home/kling/ai-avatar-pro': {
      title: '👔 Kling AI Avatar Pro',
      lead: 'Same pipeline as Standard—portrait + audio + prompt—but <strong>Pro</strong> targets sharper lip-sync and cleaner facial detail for client-facing deliverables. Fixed per-run pricing.'
    }
  },
  definitionByPath: {
    '/home/kling/ai-avatar-standard': {
      title: 'What is Kling AI Avatar Standard?',
      body: '<strong>Kling AI Avatar Standard</strong> (<code>kling-ai-avatar-standard</code>) lip-syncs a portrait to uploaded audio. Required: avatar image, audio URL, prompt (max 5000). Separate from all Kling video-generation tiers.'
    },
    '/home/kling/ai-avatar-pro': {
      title: 'What is Kling AI Avatar Pro?',
      body: '<strong>Kling AI Avatar Pro</strong> (<code>kling-ai-avatar-pro</code>)—same inputs as Standard, higher output quality. For marketing-grade talking heads paired with <a href="/home/kling/v3-0-video" class="seo-inline-link">Kling 3.0 Video</a> B-roll.'
    }
  },
  faqByPath: {
    '/home/kling/ai-avatar-standard': [
      {
        question: 'What do I upload for Kling AI Avatar Standard?',
        answer: 'Required: <strong>avatar image</strong> (max 10MB), <strong>audio</strong> (MP3/WAV/AAC/OGG, max 10MB), <strong>prompt</strong> (max 5000). Use <a href="/home/elevenlabs/multilingual-v2" class="seo-inline-link">ElevenLabs</a> for TTS if needed.'
      },
      {
        question: 'How is AI Avatar Standard different from Pro?',
        answer: '<strong>Standard</strong> = efficient tier. <strong>Pro</strong> = higher lip-sync polish—same form fields, different model key and credits.'
      }
    ],
    '/home/kling/ai-avatar-pro': [
      {
        question: 'What audio formats does Kling AI Avatar Pro accept?',
        answer: '<strong>MP3, WAV, AAC, OGG</strong> up to 10MB. Clear speech improves lip-sync.'
      },
      {
        question: 'Can I combine AI Avatar with Kling 3.0 Video?',
        answer: 'Yes—use Avatar for the presenter clip and <a href="/home/kling/v3-0-video" class="seo-inline-link">3.0 Video</a> for multi-shot scene B-roll in the same project.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Is AI Avatar the same as Kling text-to-video?',
      answer: 'No—Avatar is <strong>audio-driven</strong> lip-sync on a portrait. v2.5/2.6/3.0 invent scenes from prompts or images.'
    },
    {
      question: 'How is Kling AI Avatar priced on FuseAITools?',
      answer: 'Fixed credits per generation (<code>kling-ai-avatar-standard</code> / <code>kling-ai-avatar-pro</code>)—not per-second like 3.0 Video. See <a href="/pricing" class="seo-pricing-link">pricing</a>.'
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
      title: '👤 Kling AI Avatar on FuseAITools',
      html: '<strong>Kling AI Avatar</strong> is a standalone product line—not v2.5, 2.6, or 3.0 scene generation. It lip-syncs a <strong>portrait</strong> to your uploaded <strong>audio</strong> with a delivery <strong>prompt</strong> (max 5000 chars). Use <a href="/home/elevenlabs/multilingual-v2" class="seo-inline-link">ElevenLabs TTS</a> for the voice track, then Avatar Standard or Pro for the video. For cinematic B-roll or multi-shot scenes, pair with <a href="/home/kling/v3-0-video" class="seo-inline-link">Kling 3.0 Video</a> —Avatar handles the talking head; 3.0 handles scene invention. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ AI Avatar Core Features',
      items: [
        {
          icon: '🎙️',
          title: 'Audio-Driven',
          description: 'Lip-sync follows your uploaded voice—not a text-to-scene model.'
        },
        {
          icon: '👤',
          title: 'Portrait Input',
          description: 'Single avatar image drives facial animation and expression.'
        },
        {
          icon: '📝',
          title: '5000-Char Prompt',
          description: 'Guide delivery, framing, and mood beyond the audio alone.'
        },
        {
          icon: '🔗',
          title: 'Pairs with 3.0',
          description: 'Combine with <strong>Kling 3.0 Video</strong> for presenter + scene B-roll edits.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: ['Course explainers', 'Localized dubbing', 'Internal comms', 'Presenter + B-roll edits']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 AI Avatar Standard vs Pro',
      ariaLabel: 'Kling AI Avatar Standard vs Pro',
      headers: ['Dimension', 'Standard', 'Pro'],
      rows: [
        [
          '<strong>Input</strong>',
          {
            html: 'Avatar image + audio + prompt (same form)',
            colspan: 2
          }
        ],
        ['<strong>Output</strong>', 'Efficient talking-head', 'Higher lip-sync and visual polish'],
        [
          '<strong>modelKey</strong>',
          '<code>kling-ai-avatar-standard</code>',
          '<code>kling-ai-avatar-pro</code>'
        ],
        [
          '<strong>Pricing</strong>',
          {
            html: 'Fixed credits per run (not per-second like 3.0 Video)',
            colspan: 2
          }
        ],
        ['<strong>Best for</strong>', 'Drafts, internal comms', 'Marketing, client-facing explainers']
      ]
    },
    {
      type: 'table',
      id: 'vs-video-heading',
      title: '📊 AI Avatar vs Kling 3.0 Video',
      ariaLabel: 'Kling AI Avatar vs 3.0 Video',
      headers: ['Dimension', 'AI Avatar', '3.0 Video'],
      rows: [
        [
          '<strong>Pipeline</strong>',
          '<strong>Audio-driven</strong> lip-sync on a portrait',
          '<strong>Prompt-driven</strong> scene generation'
        ],
        ['<strong>Required input</strong>', 'Image + audio + prompt', 'Shot prompt(s)'],
        [
          '<strong>Typical use</strong>',
          'Explainers, course hosts, dubbing',
          'B-roll, multi-shot stories, cinematic clips'
        ],
        [
          '<strong>Pairing</strong>',
          {
            html: 'Avatar for presenter + 3.0 Video for scene cutaways',
            colspan: 2
          }
        ]
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Kling AI Avatar)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ AI Avatar Technical Specs',
      ariaLabel: 'Kling AI Avatar capabilities',
      headers: ['Tier', 'modelKey', 'Required', 'Limits'],
      rows: [
        [
          '<strong>Standard</strong>',
          '<code>kling-ai-avatar-standard</code>',
          'Avatar image + audio + prompt',
          'Image/audio max 10MB; prompt max 5000'
        ],
        [
          '<strong>Pro</strong>',
          '<code>kling-ai-avatar-pro</code>',
          'Same as Standard',
          'Higher-quality output tier'
        ]
      ]
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Kling AI Avatar — Two Tiers',
      items: [
        {
          name: 'Kling AI Avatar Standard',
          title: 'Standard',
          description: 'Efficient talking-head—image + audio + prompt.',
          path: '/home/kling/ai-avatar-standard',
          icon: 'fas fa-user'
        },
        {
          name: 'Kling AI Avatar Pro',
          title: 'Pro',
          description: 'Premium lip-sync and facial detail.',
          path: '/home/kling/ai-avatar-pro',
          icon: 'fas fa-user-tie'
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
      html: '🎙️ <strong>Voice pipeline — ElevenLabs</strong> Generate narration with <a href="/home/elevenlabs/multilingual-v2" class="seo-inline-link">Multilingual v2</a> or <a href="/home/elevenlabs/turbo-2-5" class="seo-inline-link">Turbo 2.5</a> , then upload the MP3 here for lip-sync.'
    },
    {
      pricing: false,
      html: '🎬 Need cinematic scene B-roll to cut with your avatar? <a href="/home/kling/v3-0-video" class="seo-inline-link">Use Kling 3.0 Video →</a> for multi-shot 3–15s scene generation—Avatar for the presenter, 3.0 for the story visuals. To restyle a clip you already have, try <a href="/home/kling/3-0-omni-transformation" class="seo-inline-link">Kling 3.0 Omni Video Transformation</a>.'
    }
  ],
  watchPathIncludes: '/home/kling/ai-avatar-'
}
