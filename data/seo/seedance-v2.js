/**
 * SeedanceV2 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：SeedanceV2SeoContent.vue）
 */
export default {
  component: 'SeedanceV2SeoContent',
  rootId: 'seedance-v2-section',
  rootClass: 'seedance-seo',
  meta: {
    name: 'Seedance 2 Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Seedance 2 and Seedance 2 Fast multimodal video on FuseAITools—first/last frame, reference images/videos/audio, 4–15s, 480p/720p/1080p/4K.'
  },
  badge: '🎬 Seedance 2 · Multimodal Video · Fast & Full',
  introByPath: {
    '/home/seedance/v2-fast': {
      title: '⚡ Seedance 2 Fast',
      lead: 'Seedance 2 Fast (<code>seedance-2-fast</code>) accepts ultra-long prompts (up to <strong>20,000 characters</strong>) plus optional <strong>first/last frames</strong> and reference <strong>images, videos, and audio</strong>. Set <strong>4–15 seconds</strong> on a slider, pick <strong>480p, 720p, 1080p, or 4K</strong>, and enable the required <strong>web search</strong> switch.'
    },
    '/home/seedance/v2': {
      title: '🎬 Seedance 2',
      lead: 'Seedance 2 (<code>seedance-2</code>) extends Fast with up to <strong>five reference videos</strong> for richer scene conditioning. Same <strong>4–15s</strong> duration range, <strong>480p/720p/1080p/4K</strong> output, and multimodal controls—including optional <strong>audio generation</strong> and <strong>adaptive</strong> aspect ratio.'
    }
  },
  definitionByPath: {
    '/home/seedance/v2-fast': {
      title: 'What is Seedance 2 Fast?',
      body: '<strong>Seedance 2 Fast</strong> on FuseAITools generates video from a prompt (3–20,000 characters) with optional <strong>firstFrameUrl</strong> and <strong>lastFrameUrl</strong>. Add up to <strong>9 total images</strong> (including frames), <strong>3 reference videos</strong>, and <strong>3 reference audios</strong>. Duration is <strong>4–15 seconds</strong> at <strong>480p, 720p, 1080p, or 4K</strong>; aspect ratios include <strong>adaptive</strong>.'
    },
    '/home/seedance/v2': {
      title: 'What is Seedance 2?',
      body: '<strong>Seedance 2</strong> on FuseAITools matches Seedance 2 Fast for core controls but allows up to <strong>five reference videos</strong>—better for complex multi-clip conditioning. Prompt limit is <strong>20,000 characters</strong>; output remains <strong>4–15s</strong> at <strong>480p, 720p, 1080p, or 4K</strong> with optional audio generation and web search enabled.'
    }
  },
  faqByPath: {
    '/home/seedance/v2-fast': [
      {
        question: 'How many reference files can Seedance 2 Fast use?',
        answer: 'Up to <strong>9 images total</strong> (first frame + last frame + reference images), <strong>3 reference videos</strong>, and <strong>3 reference audios</strong>. First and last frames count toward the nine-image cap.'
      },
      {
        question: 'Why is web search required on Seedance 2 Fast?',
        answer: 'The form includes a mandatory <strong>web search</strong> toggle—the API expects this flag on every Seedance 2 / 2 Fast request. Leave it on unless product guidance changes.'
      }
    ],
    '/home/seedance/v2': [
      {
        question: 'When should I choose Seedance 2 over Seedance 2 Fast?',
        answer: 'Pick <strong>Seedance 2</strong> when you need up to <strong>five reference videos</strong> for richer conditioning. Use <strong>2 Fast</strong> when three reference videos are enough and you want the speed-optimized model.'
      },
      {
        question: 'How is Seedance 2 billed when I upload reference videos?',
        answer: 'Pricing uses a <strong>per-second</strong> rate. With reference videos, credits multiply by <strong>ceil(reference video duration) + output duration</strong> (output clamped 4–15s). Without reference videos, only output seconds apply—see the Generate button for the exact total.'
      },
      {
        question: 'What aspect ratios does Seedance 2 support?',
        answer: 'Choose <strong>1:1, 4:3, 3:4, 16:9, 9:16, 21:9, or adaptive</strong>. Resolution options are <strong>480p, 720p, 1080p, or 4K</strong>.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Seedance 2?',
      answer: 'No—Seedance 2 runs in the cloud on FuseAITools. Upload reference URLs in the browser; credits are charged per successful generation.'
    },
    {
      question: 'How do I try Seedance 2 on FuseAITools?',
      answer: 'Open Seedance 2 or 2 Fast above and generate. New users receive <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for credit packs and member rates.'
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
      title: '🎬 Seedance 2 on FuseAITools',
      html: 'Seedance 2 on <a href="/" class="seo-inline-link">FuseAITools</a> is a <strong>multimodal video</strong> line—condition generation with <strong>first and last frames</strong>, plus optional reference <strong>images, videos, and audio</strong>. Choose <strong>Seedance 2 Fast</strong> for quicker iteration or <strong>Seedance 2</strong> when you need up to <strong>five reference videos</strong>. Output is <strong>4–15 seconds</strong> at <strong>480p, 720p, 1080p, or 4K</strong>; credits scale by duration and reference usage. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Seedance 2 Core Features',
      items: [
        {
          icon: '🖼️',
          title: 'First & Last Frame',
          description: 'Bookend motion with <strong>firstFrameUrl</strong> and <strong>lastFrameUrl</strong>—counts toward the nine-image reference cap.'
        },
        {
          icon: '🎞️',
          title: 'Multimodal References',
          description: 'Condition with reference <strong>images, videos, and audio</strong>—Seedance 2 supports up to <strong>5</strong> reference videos.'
        },
        {
          icon: '📝',
          title: 'Ultra-Long Prompts',
          description: 'Up to <strong>20,000 characters</strong> for detailed scene, style, and motion direction.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: '<strong>4–15s</strong> outputs at <strong>480p/720p/1080p/4K</strong>—per-second credits shown on Generate before submission.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Reference-driven storytelling',
        'Style-locked brand films',
        'First/last frame transitions',
        'Audio-guided rhythm edits',
        'Complex multi-clip scenes'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Seedance 2 Fast vs Seedance 2',
      ariaLabel: 'Seedance 2 Fast vs Seedance 2',
      headers: ['Dimension', 'Seedance 2 Fast', 'Seedance 2'],
      rows: [
        ['Model', '<code>seedance-2-fast</code>', '<code>seedance-2</code>'],
        ['Reference videos', 'Up to <strong>3</strong>', 'Up to <strong>5</strong>'],
        ['Reference images', 'Up to <strong>9</strong> (incl. first/last frame)', 'Same'],
        ['Reference audio', 'Up to <strong>3</strong>', 'Up to <strong>3</strong>'],
        [
          'Duration & resolution',
          '<strong>4–15s</strong> slider; <strong>480p / 720p / 1080p / 4K</strong>',
          'Same'
        ],
        ['Pricing', 'Per-second credits; higher when reference videos uploaded', 'Same billing logic']
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Seedance 2)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Seedance 2 Technical Specs',
      ariaLabel: 'Seedance 2 workflow capabilities',
      headers: ['Workflow', 'Prompt', 'References', 'Duration', 'Resolution / ratio'],
      rows: [
        [
          '<strong>Seedance 2 Fast</strong>',
          '3–20,000 chars',
          'First/last frame; ≤9 images total; ≤3 videos; ≤3 audios',
          '4–15s (slider)',
          '480p/720p/1080p/4K; 1:1–21:9 + adaptive'
        ],
        [
          '<strong>Seedance 2</strong>',
          '3–20,000 chars',
          'First/last frame; ≤9 images total; ≤5 videos; ≤3 audios',
          '4–15s (slider)',
          '480p/720p/1080p/4K; 1:1–21:9 + adaptive'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Seedance form and API (<code>seedance-2-fast</code> / <code>seedance-2</code>).',
      note: '<strong>Web search</strong> toggle is required in the form. Optional <strong>generate audio</strong> for v2 outputs. When reference videos are uploaded, credits bill per second including rounded-up reference duration plus output length.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Seedance 2 — Two Workflows',
      lead: 'Fast for iteration; full Seedance 2 for richer video references:',
      items: [
        {
          name: 'Seedance 2 Fast',
          title: 'Seedance 2 Fast',
          description: 'Multimodal generation with up to 3 reference videos—4–15s at 480p/720p/1080p/4K.',
          path: '/home/seedance/v2-fast',
          icon: 'fas fa-forward'
        },
        {
          name: 'Seedance 2',
          title: 'Seedance 2',
          description: 'Full multimodal control with up to 5 reference videos for complex scenes.',
          path: '/home/seedance/v2',
          icon: 'fas fa-film'
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
      html: '🖼️ <strong>ByteDance image companion — Seedream</strong> Seedance 2 accepts first/last frames—create or refine them in <a href="/home/seedream/5-lite-image-to-image" class="seo-inline-link" >Seedream 5 Lite Image to Image</a> or generate concepts from text in <a href="/home/seedream/5-lite-text-to-image" class="seo-inline-link" >Seedream Text to Image</a> first.'
    },
    {
      pricing: false,
      html: '⚡ Need simpler 5s/10s tiers without multimodal refs? <a href="/home/seedance/v1-lite-text-to-video" class="seo-inline-link" >Browse Seedance v1 →</a> for Lite and Pro text/image workflows up to 1080p.'
    },
    {
      pricing: false,
      html: '🎵 Want unified T2V/I2V with optional audio in one form? <a href="/home/seedance/v1-5-pro" class="seo-inline-link" >Try Seedance 1.5 Pro →</a> for 4–12s clips and fixed-lens control.'
    },
    {
      pricing: false,
      html: '⏱️ Need longer duration (up to 30s)? <a href="/home/seedance/v2-5" class="seo-inline-link" >Try Seedance 2.5 →</a> for 4–30s at 480p/720p/1080p.'
    }
  ]
}
