/**
 * SeedanceV2Mini SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：SeedanceV2MiniSeoContent.vue）
 */
export default {
  component: 'SeedanceV2MiniSeoContent',
  rootId: 'seedance-v2-mini-section',
  rootClass: 'seedance-seo',
  meta: {
    name: 'Seedance 2 Mini Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Seedance 2 Mini lightweight multimodal video on FuseAITools—first/last frame, reference images/videos/audio, 4–15s, 480p/720p.'
  },
  badge: '🎬 Seedance 2 Mini · Lightweight Multimodal Video',
  introByPath: {
    '/home/seedance/v2': {
      title: '🎬 Seedance 2 Mini',
      lead: 'Seedance 2 Mini (<code>seedance-2-mini</code>) is a lightweight multimodal video model on FuseAITools—same controls as Seedance 2 at <strong>480p or 720p</strong>. Set <strong>4–15 seconds</strong> on a slider, add optional <strong>first/last frames</strong> and reference <strong>images, videos, and audio</strong>, and enable the required <strong>web search</strong> switch.'
    },
    '/home/seedance/v2-5': {
      title: '🎬 Seedance 2 Mini',
      lead: 'Seedance 2 Mini (<code>seedance-2-mini</code>) is a lightweight multimodal video model on FuseAITools—same controls as Seedance 2 at <strong>480p or 720p</strong>. Set <strong>4–15 seconds</strong> on a slider, add optional <strong>first/last frames</strong> and reference <strong>images, videos, and audio</strong>, and enable the required <strong>web search</strong> switch.'
    }
  },
  definitionByPath: {
    '/home/seedance/v2': {
      title: 'What is Seedance 2 Mini?',
      body: '<strong>Seedance 2 Mini</strong> on FuseAITools is a lightweight variant of Seedance 2—same multimodal inputs (prompt up to <strong>20,000 characters</strong>, first/last frames, reference images/videos/audio) at <strong>480p or 720p</strong> resolution. Duration is <strong>4–15 seconds</strong>; ideal for fast iteration, social clips, and cost-effective generation when 1080p/4K is not required.'
    },
    '/home/seedance/v2-5': {
      title: 'What is Seedance 2 Mini?',
      body: '<strong>Seedance 2 Mini</strong> on FuseAITools is a lightweight variant of Seedance 2—same multimodal inputs (prompt up to <strong>20,000 characters</strong>, first/last frames, reference images/videos/audio) at <strong>480p or 720p</strong> resolution. Duration is <strong>4–15 seconds</strong>; ideal for fast iteration, social clips, and cost-effective generation when 1080p/4K is not required.'
    }
  },
  faqByPath: {
    '/home/seedance/v2': [
      {
        question: 'How is Seedance 2 Mini different from Seedance 2?',
        answer: 'Seedance 2 Mini outputs at <strong>480p or 720p</strong> only (no 1080p/4K) and supports up to <strong>3 reference videos</strong> (vs 5 on Seedance 2). All other controls—prompt length, duration, aspect ratios, audio generation—are identical.'
      },
      {
        question: 'How many reference files can Seedance 2 Mini use?',
        answer: 'Up to <strong>9 images total</strong> (first frame + last frame + reference images), <strong>3 reference videos</strong>, and <strong>3 reference audios</strong>. First and last frames count toward the nine-image cap.'
      },
      {
        question: 'Why is web search required on Seedance 2 Mini?',
        answer: 'The form includes a mandatory <strong>web search</strong> toggle—the API expects this flag on every Seedance 2 Mini request. Leave it on unless product guidance changes.'
      },
      {
        question: 'How is Seedance 2 Mini billed when I upload reference videos?',
        answer: 'Pricing uses a <strong>per-second</strong> rate. With reference videos, credits multiply by <strong>ceil(reference video duration) + output duration</strong> (output clamped 4–15s). Without reference videos, only output seconds apply—see the Generate button for the exact total.'
      }
    ],
    '/home/seedance/v2-5': [
      {
        question: 'How is Seedance 2 Mini different from Seedance 2?',
        answer: 'Seedance 2 Mini outputs at <strong>480p or 720p</strong> only (no 1080p/4K) and supports up to <strong>3 reference videos</strong> (vs 5 on Seedance 2). All other controls—prompt length, duration, aspect ratios, audio generation—are identical.'
      },
      {
        question: 'How many reference files can Seedance 2 Mini use?',
        answer: 'Up to <strong>9 images total</strong> (first frame + last frame + reference images), <strong>3 reference videos</strong>, and <strong>3 reference audios</strong>. First and last frames count toward the nine-image cap.'
      },
      {
        question: 'Why is web search required on Seedance 2 Mini?',
        answer: 'The form includes a mandatory <strong>web search</strong> toggle—the API expects this flag on every Seedance 2 Mini request. Leave it on unless product guidance changes.'
      },
      {
        question: 'How is Seedance 2 Mini billed when I upload reference videos?',
        answer: 'Pricing uses a <strong>per-second</strong> rate. With reference videos, credits multiply by <strong>ceil(reference video duration) + output duration</strong> (output clamped 4–15s). Without reference videos, only output seconds apply—see the Generate button for the exact total.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Seedance 2 Mini?',
      answer: 'No—Seedance 2 Mini runs in the cloud on FuseAITools. Upload reference URLs in the browser; credits are charged per successful generation.'
    },
    {
      question: 'How do I try Seedance 2 Mini on FuseAITools?',
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
      title: '🎬 Seedance 2 Mini on FuseAITools',
      html: 'Seedance 2 Mini on <a href="/" class="seo-inline-link">FuseAITools</a> is a <strong>lightweight multimodal video</strong> model—same feature set as Seedance 2 (first/last frames, reference images/videos/audio) at <strong>480p or 720p</strong>. Ideal when you need fast iteration without 1080p/4K output. <strong>4–15 seconds</strong> duration, credits scale by duration and reference usage. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Seedance 2 Mini Core Features',
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
          icon: '⚡',
          title: 'Lightweight Output',
          description: '<strong>480p or 720p</strong> resolution—faster generation and lower credits when high resolution is not needed.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: '<strong>4–15s</strong> outputs at <strong>480p/720p</strong>—per-second credits shown on Generate before submission.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Quick social media clips',
        'Draft previews before full-res render',
        'Cost-effective batch generation',
        'Reference-driven short videos',
        'Mobile-first 9:16 content'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Seedance 2 Mini vs Seedance 2',
      ariaLabel: 'Seedance 2 Mini vs Seedance 2',
      headers: ['Dimension', 'Seedance 2 Mini', 'Seedance 2'],
      rows: [
        ['Model', '<code>seedance-2-mini</code>', '<code>seedance-2</code>'],
        ['Reference videos', 'Up to <strong>3</strong>', 'Up to <strong>5</strong>'],
        ['Resolution', '<strong>480p / 720p</strong>', '<strong>480p / 720p / 1080p / 4K</strong>'],
        ['Duration', '<strong>4–15s</strong> slider', '<strong>4–15s</strong> slider'],
        ['Pricing', 'Per-second credits; higher when reference videos uploaded', 'Same billing logic']
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Seedance 2 Mini)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Seedance 2 Mini Technical Specs',
      ariaLabel: 'Seedance 2 Mini capabilities',
      headers: ['Workflow', 'Prompt', 'References', 'Duration', 'Resolution / ratio'],
      rows: [
        [
          '<strong>Seedance 2 Mini</strong>',
          '3–20,000 chars',
          'First/last frame; ≤9 images total; ≤3 videos; ≤3 audios',
          '4–15s (slider)',
          '480p/720p; 1:1–21:9 + adaptive'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Seedance form and API (<code>seedance-2-mini</code>).',
      note: '<strong>Web search</strong> toggle is required in the form. Optional <strong>generate audio</strong> for v2-mini outputs. When reference videos are uploaded, credits bill per second including rounded-up reference duration plus output length.'
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for subscription discounts and credit top-ups.'
    },
    {
      pricing: false,
      html: '🎬 Need higher resolution or more reference videos? <a href="/home/seedance/v2" class="seo-inline-link" >Explore Seedance 2 →</a> for 480p/720p/1080p/4K output and up to 5 reference videos.'
    },
    {
      pricing: false,
      html: '⏱️ Need longer duration or 1080p? <a href="/home/seedance/v2-5" class="seo-inline-link" >Try Seedance 2.5 →</a> for 4–30s at 480p/720p/1080p.'
    }
  ]
}
