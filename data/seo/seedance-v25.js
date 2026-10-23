/**
 * SeedanceV25 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：SeedanceV25SeoContent.vue）
 */
export default {
  component: 'SeedanceV25SeoContent',
  rootId: 'seedance-v2-5-section',
  rootClass: 'seedance-seo',
  meta: {
    name: 'Seedance 2.5 Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Seedance 2.5 multimodal video on FuseAITools—first/last frame, reference images/videos/audio, 4–30s, 480p/720p/1080p.'
  },
  badge: '🎬 Seedance 2.5 · Extended Duration Multimodal Video',
  introByPath: {
    '/home/seedance/v2': {
      title: '🎬 Seedance 2.5',
      lead: 'Seedance 2.5 (<code>seedance-2-5</code>) is an extended-duration multimodal video model on FuseAITools—same controls as Seedance 2 at <strong>480p / 720p / 1080p</strong> with up to <strong>30 seconds</strong>. Set <strong>4–30 seconds</strong> on a slider, add optional <strong>first/last frames</strong> and reference <strong>images, videos, and audio</strong>, and enable the required <strong>web search</strong> switch.'
    }
  },
  definitionByPath: {
    '/home/seedance/v2': {
      title: 'What is Seedance 2.5?',
      body: '<strong>Seedance 2.5</strong> on FuseAITools extends the Seedance 2 multimodal feature set—same inputs (prompt up to <strong>20,000 characters</strong>, first/last frames, reference images/videos/audio) at <strong>480p / 720p / 1080p</strong> resolution. Duration extends to <strong>4–30 seconds</strong>; ideal for longer storytelling, social ads, and extended clips when 4K is not required.'
    }
  },
  faqByPath: {
    '/home/seedance/v2': [
      {
        question: 'How is Seedance 2.5 different from Seedance 2?',
        answer: 'Seedance 2.5 supports up to <strong>30 seconds</strong> duration (vs 15s on Seedance 2) and outputs at <strong>480p / 720p / 1080p</strong> (no 4K). It supports up to <strong>3 reference videos</strong> (vs 5 on Seedance 2). All other controls—prompt length, aspect ratios, audio generation—are identical.'
      },
      {
        question: 'How is Seedance 2.5 different from Seedance 2 Mini?',
        answer: 'Seedance 2.5 adds <strong>1080p</strong> resolution (Mini is 480p/720p only) and extends duration to <strong>30 seconds</strong> (Mini caps at 15s). Both support up to 3 reference videos.'
      },
      {
        question: 'How many reference files can Seedance 2.5 use?',
        answer: 'Up to <strong>9 images total</strong> (first frame + last frame + reference images), <strong>3 reference videos</strong>, and <strong>3 reference audios</strong>. First and last frames count toward the nine-image cap.'
      },
      {
        question: 'Why is web search required on Seedance 2.5?',
        answer: 'The form includes a mandatory <strong>web search</strong> toggle—the API expects this flag on every Seedance 2.5 request. Leave it on unless product guidance changes.'
      },
      {
        question: 'How is Seedance 2.5 billed when I upload reference videos?',
        answer: 'Pricing uses a <strong>per-second</strong> rate. With reference videos, credits multiply by <strong>ceil(reference video duration) + output duration</strong> (output clamped 4–30s). Without reference videos, only output seconds apply—see the Generate button for the exact total.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Seedance 2.5?',
      answer: 'No—Seedance 2.5 runs in the cloud on FuseAITools. Upload reference URLs in the browser; credits are charged per successful generation.'
    },
    {
      question: 'How do I try Seedance 2.5 on FuseAITools?',
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
      title: '🎬 Seedance 2.5 on FuseAITools',
      html: 'Seedance 2.5 on <a href="/" class="seo-inline-link">FuseAITools</a> extends the Seedance 2 multimodal feature set with <strong>4–30 second</strong> duration and up to <strong>1080p</strong> resolution—ideal for longer storytelling, ads, and social content. Same first/last frame and reference media controls as Seedance 2. <strong>480p / 720p / 1080p</strong> output, credits scale by duration and reference usage. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Seedance 2.5 Core Features',
      items: [
        {
          icon: '🖼️',
          title: 'First & Last Frame',
          description: 'Bookend motion with <strong>firstFrameUrl</strong> and <strong>lastFrameUrl</strong>—counts toward the nine-image reference cap.'
        },
        {
          icon: '🎞️',
          title: 'Multimodal References',
          description: 'Condition with reference <strong>images, videos, and audio</strong>—up to <strong>3</strong> reference videos.'
        },
        {
          icon: '⏱️',
          title: 'Extended Duration',
          description: '<strong>4–30 seconds</strong> on a continuous slider—double the range of Seedance 2 for longer storytelling and ads.'
        },
        {
          icon: '📺',
          title: 'Up to 1080p',
          description: '<strong>480p / 720p / 1080p</strong> resolution—full HD output when 4K is not needed.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Extended storytelling (15–30s)',
        'Social media ads and promos',
        'Product showcase videos',
        'Reference-driven short films',
        'Mobile-first 9:16 content'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Seedance 2 Family Comparison',
      ariaLabel: 'Seedance 2 vs 2 Mini vs 2.5',
      headers: ['Dimension', 'Seedance 2', 'Seedance 2 Mini', 'Seedance 2.5'],
      rows: [
        ['Model', '<code>seedance-2</code>', '<code>seedance-2-mini</code>', '<code>seedance-2-5</code>'],
        ['Reference videos', 'Up to <strong>5</strong>', 'Up to <strong>3</strong>', 'Up to <strong>3</strong>'],
        [
          'Resolution',
          '<strong>480p / 720p / 1080p / 4K</strong>',
          '<strong>480p / 720p</strong>',
          '<strong>480p / 720p / 1080p</strong>'
        ],
        [
          'Duration',
          '<strong>4–15s</strong> slider',
          '<strong>4–15s</strong> slider',
          '<strong>4–30s</strong> slider'
        ],
        ['Pricing', 'Per-second credits', 'Per-second credits', 'Per-second credits']
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Seedance 2.5)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Seedance 2.5 Technical Specs',
      ariaLabel: 'Seedance 2.5 capabilities',
      headers: ['Workflow', 'Prompt', 'References', 'Duration', 'Resolution / ratio'],
      rows: [
        [
          '<strong>Seedance 2.5</strong>',
          '3–20,000 chars',
          'First/last frame; ≤9 images total; ≤3 videos; ≤3 audios',
          '4–30s (slider)',
          '480p/720p/1080p; 1:1–21:9 + adaptive'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Seedance form and API (<code>seedance-2-5</code>).',
      note: '<strong>Web search</strong> toggle is required in the form. Optional <strong>generate audio</strong> for 2.5 outputs. When reference videos are uploaded, credits bill per second including rounded-up reference duration plus output length.'
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for subscription discounts and credit top-ups.'
    },
    {
      pricing: false,
      html: '🎬 Need 4K output or more reference videos? <a href="/home/seedance/v2" class="seo-inline-link" >Explore Seedance 2 →</a> for 480p/720p/1080p/4K output and up to 5 reference videos.'
    }
  ]
}
