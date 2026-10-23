/**
 * Suno SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：SunoSeoContent.vue）
 */
export default {
  component: 'SunoSeoContent',
  rootId: 'suno-section',
  rootClass: 'suno-seo',
  meta: {
    name: 'Suno AI Music on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Suno on FuseAITools—six music workflows: generate, extend, cover, expand, add instrumentals, and add vocals. Models V3.5 through V5.'
  },
  badge: '🎵 Suno · AI Music · Six Workflows · V3.5–V5',
  introByPath: {
    '/home/suno/generate': {
      title: '🎵 Suno Music Generation',
      lead: 'Create new tracks from a text prompt—choose <strong>Simple mode</strong> (500 characters) or <strong>Custom mode</strong> with style, title, and longer lyrics (up to 3k–5k depending on model). Toggle <strong>instrumental</strong> for backing-only output. Models <strong>V3.5 through V5</strong> supported.'
    },
    '/home/suno/extend': {
      title: '⏩ Suno Music Extension',
      lead: 'Extend a track you previously generated with Suno—select an <strong>Audio ID</strong> from completed Music Generation tasks. Use <strong>original parameters</strong> or specify custom <strong>continueAt</strong> (seconds), prompt, style, and title for the extended section.'
    },
    '/home/suno/upload-cover': {
      title: '🎤 Suno Audio Cover',
      lead: 'Upload an audio file (<strong>MP3, WAV, or M4A</strong>, max <strong>2 minutes</strong>) and recreate it in a new style. Set <strong>style</strong> and <strong>title</strong>; add lyrics via prompt when not in instrumental mode.'
    },
    '/home/suno/upload-extend': {
      title: '📈 Suno Audio Expansion',
      lead: 'Upload a short clip (≤2 minutes) and expand it into a fuller piece. Enable <strong>custom parameter mode</strong> to set style, title, optional lyrics, and an <strong>expansion time point</strong>—or use default parameters with the upload URL only.'
    },
    '/home/suno/add-instrumental': {
      title: '🎸 Suno Accompaniment',
      lead: 'Add backing instrumentation to an uploaded source track—provide <strong>title</strong>, <strong>include tags</strong> (desired styles), and <strong>exclude tags</strong> (max 500 chars each). No prompt field; control mood purely through tags.'
    },
    '/home/suno/add-vocals': {
      title: '🎙️ Suno Vocal Generation',
      lead: 'Layer sung vocals onto instrumental audio—upload source file, write a <strong>prompt</strong> (max 5000 chars) for lyrics and delivery, plus required <strong>title</strong>, <strong>style</strong>, and <strong>exclude tags</strong>. Optional vocal gender (m/f).'
    }
  },
  definitionByPath: {
    '/home/suno/generate': {
      title: 'What is Suno Music Generation?',
      body: '<strong>Suno Music Generation</strong> on FuseAITools (<code>suno_generate</code>) creates new music from a prompt. <strong>Simple mode</strong> needs only a prompt (max 500 chars). <strong>Custom mode</strong> adds required style and title plus longer prompts (3000 chars on V3.5/V4, 5000 on V4.5/V5). Choose models V3_5, V4 (up to ~4 min), V4_5/V4_5PLUS (up to ~8 min), or V5.'
    },
    '/home/suno/extend': {
      title: 'What is Suno Music Extension?',
      body: '<strong>Suno Music Extension</strong> on FuseAITools (<code>suno_extend</code>) lengthens an existing Suno generate output. Required: <strong>audioId</strong> (taskId from Music Generation history). Optionally reuse original parameters or supply custom <strong>continueAt</strong> (&gt;0 seconds), prompt (max 3000), style (max 200), and title (max 80).'
    },
    '/home/suno/upload-cover': {
      title: 'What is Suno Audio Cover?',
      body: '<strong>Suno Audio Cover</strong> on FuseAITools (<code>suno_upload_cover</code>) reimagines uploaded audio via <strong>fileUrl</strong>. Required: upload + style + title. Prompt required when vocals are enabled (instrumental off). Prompt limits follow the selected model (3k–5k chars). Upload max duration <strong>2 minutes</strong>.'
    },
    '/home/suno/upload-extend': {
      title: 'What is Suno Audio Expansion?',
      body: '<strong>Suno Audio Expansion</strong> on FuseAITools (<code>suno_upload_extend</code>) develops uploaded clips into longer works. Required: <strong>fileUrl</strong> (≤2 min). With custom parameter mode: style, title, optional prompt, and <strong>continueAt</strong> for where expansion begins. Instrumental toggle applies when custom mode is on.'
    },
    '/home/suno/add-instrumental': {
      title: 'What is Suno Accompaniment?',
      body: '<strong>Suno Accompaniment</strong> on FuseAITools (<code>suno_add_instrumental</code>) adds backing parts to source audio. Required: <strong>fileUrl</strong>, <strong>title</strong> (max 100), <strong>tags</strong> (include styles, max 500), and <strong>negativeTags</strong> (exclude styles, max 500). No prompt—tags define the desired instrumentation.'
    },
    '/home/suno/add-vocals': {
      title: 'What is Suno Vocal Generation?',
      body: '<strong>Suno Vocal Generation</strong> on FuseAITools (<code>suno_add_vocals</code>) adds singing to uploaded audio. Required: <strong>fileUrl</strong>, <strong>prompt</strong> (max 5000), <strong>title</strong>, <strong>style</strong> (max 200), and <strong>negativeTags</strong> (max 500). Optional vocal gender m/f and shared weight sliders.'
    }
  },
  faqByPath: {
    '/home/suno/generate': [
      {
        question: 'What is the difference between Suno Simple and Custom mode?',
        answer: '<strong>Simple mode</strong> only requires a prompt (max <strong>500 characters</strong>)—ideal for quick ideas. <strong>Custom mode</strong> requires <strong>style</strong> and <strong>title</strong> plus a longer prompt/lyrics field (up to <strong>3000</strong> on V3.5/V4 or <strong>5000</strong> on V4.5/V5). Toggle <strong>instrumental</strong> to skip vocals.'
      },
      {
        question: 'Which Suno model should I choose?',
        answer: '<strong>V5</strong> offers faster generation and stronger expressiveness. <strong>V4.5+</strong> supports longer tracks (up to ~8 minutes) and 1000-character style fields. <strong>V3.5/V4</strong> cap around ~4 minutes with 200-character style limits—good for quick drafts.'
      }
    ],
    '/home/suno/extend': [
      {
        question: 'Why is my Audio ID list empty on Music Extension?',
        answer: 'Only tasks completed with <strong>Suno Music Generation</strong> appear in the Audio ID dropdown. Generate a track first, wait for success, then open Music Extension—the list pulls from your generate history (<code>suno_generate</code> tasks).'
      },
      {
        question: 'When do I need continueAt on Music Extension?',
        answer: 'When using <strong>custom parameters</strong> (<code>defaultParamFlag</code> true), set <strong>continueAt</strong> to a positive second value where the extension should begin—it must be greater than 0 and less than the source track duration.'
      }
    ],
    '/home/suno/upload-cover': [
      {
        question: 'What upload formats does Suno Audio Cover accept?',
        answer: '<strong>MP3, WAV, or M4A</strong> files up to <strong>2 minutes</strong> and 10MB. You still need <strong>style</strong> and <strong>title</strong>; add a prompt when generating vocals (instrumental unchecked).'
      },
      {
        question: 'How is Audio Cover different from Audio Expansion?',
        answer: '<strong>Cover</strong> reimagines the uploaded clip in a new style (like a cover version). <strong>Expansion</strong> lengthens or develops the clip forward from a time point—better when you have a short sketch to grow.'
      }
    ],
    '/home/suno/upload-extend': [
      {
        question: 'Do I need custom parameters for Audio Expansion?',
        answer: 'No—leave <strong>custom parameter mode</strong> off to expand with defaults using only the upload URL. Enable it when you need explicit <strong>style</strong>, <strong>title</strong>, lyrics/prompt, and an <strong>expansion time point</strong> (continueAt).'
      },
      {
        question: 'What prompt length applies to Audio Expansion?',
        answer: 'When custom mode is on and instrumental is off, prompt limits match the model—<strong>3000</strong> chars on V3.5/V4 or <strong>5000</strong> on V4.5/V5. Instrumental expansions use the prompt field for style/mood description instead of lyrics.'
      }
    ],
    '/home/suno/add-instrumental': [
      {
        question: 'Does Suno Accompaniment use a prompt?',
        answer: 'No—control output with <strong>include tags</strong> (desired styles) and <strong>exclude tags</strong> (unwanted elements), each up to <strong>500 characters</strong>, plus a required <strong>title</strong> and source audio upload.'
      },
      {
        question: 'What should I put in include vs exclude tags?',
        answer: 'Include tags describe what you want—e.g. <strong>relaxed, piano, strings</strong>. Exclude tags remove unwanted traits—e.g. <strong>heavy metal, fast drums</strong>. Both fields are required in the form.'
      }
    ],
    '/home/suno/add-vocals': [
      {
        question: 'What does the prompt do on Suno Vocal Generation?',
        answer: 'The prompt (max <strong>5000 characters</strong>) guides <strong>lyrics and vocal delivery</strong> on top of your uploaded instrumental. Also set <strong>style</strong>, <strong>title</strong>, and <strong>exclude tags</strong> for finer control.'
      },
      {
        question: 'Can I choose vocal gender on Suno Vocal Generation?',
        answer: 'Yes—optionally set vocal gender to <strong>m</strong> (male) or <strong>f</strong> (female). The API treats this as a probability hint, not a guarantee. Style weight sliders (0–1) also apply.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Suno on FuseAITools?',
      answer: 'No—Suno runs in the cloud. Use any modern browser; credits are charged per successful generation.'
    },
    {
      question: 'How is Suno priced on FuseAITools?',
      answer: 'Each workflow has its own credit cost (<code>suno_generate</code>, <code>suno_extend</code>, etc.)—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
      title: '🎵 Suno on FuseAITools',
      html: 'Suno on <a href="/" class="seo-inline-link">FuseAITools</a> turns text, lyrics, and uploaded audio into full tracks—generate from scratch, extend completed songs, reimagine covers, expand short clips, or add instrumentals and vocals. Pick models from <strong>V3.5</strong> through <strong>V5</strong> (up to 8 minutes on V4.5+). Credits appear on the Generate button before you submit; new users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Suno Core Features',
      items: [
        {
          icon: '🎼',
          title: 'Six Workflows',
          description: 'Generate, extend, cover, expand, add instrumentals, or add vocals—one Suno suite on FuseAITools.'
        },
        {
          icon: '⚡',
          title: 'V3.5 Through V5',
          description: 'Pick model tier by length and quality—<strong>V5</strong> for speed and expressiveness; <strong>V4.5+</strong> for up to ~8-minute tracks.'
        },
        {
          icon: '🎚️',
          title: 'Simple & Custom Modes',
          description: 'Quick 500-character prompts or full custom control with style, title, lyrics, and weight sliders.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'Upload, generate, and download in the browser—<strong>credits shown before submit</strong>; chain workflows in one pipeline.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Song demos & sketches',
        'Podcast & video beds',
        'Extend finished tracks',
        'Vocals on instrumentals',
        'Style covers & remixes'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Suno Workflow Quick Guide',
      ariaLabel: 'Suno six workflows comparison',
      headers: ['Workflow', 'Input', 'Best for'],
      rows: [
        [
          '<strong>Music Generation</strong>',
          'Prompt (+ optional custom mode: style, title, lyrics)',
          'New songs from text'
        ],
        [
          '<strong>Music Extension</strong>',
          'Audio ID from prior generate + optional custom params',
          'Continue an existing Suno track'
        ],
        [
          '<strong>Audio Cover</strong>',
          'Upload audio (≤2 min) + style/title',
          'Style reimagination of a clip'
        ],
        [
          '<strong>Audio Expansion</strong>',
          'Upload audio (≤2 min) + optional custom params',
          'Turn short uploads into fuller pieces'
        ],
        [
          '<strong>Accompaniment</strong>',
          'Source audio + title + include/exclude tags',
          'Add backing instruments (no prompt)'
        ],
        [
          '<strong>Vocal Generation</strong>',
          'Source audio + prompt + style/tags',
          'Add sung vocals to instrumental beds'
        ]
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Suno)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Suno Technical Specs',
      ariaLabel: 'Suno workflow capabilities',
      headers: ['Workflow', 'modelKey', 'Required', 'Models', 'Key controls'],
      rows: [
        [
          '<strong>Music Generation</strong>',
          '<code>suno_generate</code>',
          'Prompt',
          'V3_5–V5',
          'Simple (500 char) or Custom (style/title, up to 3k–5k prompt); instrumental toggle'
        ],
        [
          '<strong>Music Extension</strong>',
          '<code>suno_extend</code>',
          'Audio ID (from generate tasks)',
          'V3_5–V5',
          'Original params or custom (continueAt, prompt, style max 200, title max 80)'
        ],
        [
          '<strong>Audio Cover</strong>',
          '<code>suno_upload_cover</code>',
          'Uploaded file URL',
          'V3_5–V5',
          'Custom mode; style/title; prompt if not instrumental (3k–5k by model)'
        ],
        [
          '<strong>Audio Expansion</strong>',
          '<code>suno_upload_extend</code>',
          'Uploaded file URL (≤2 min)',
          'V3_5–V5',
          'Default or custom param mode; continueAt when custom'
        ],
        [
          '<strong>Accompaniment</strong>',
          '<code>suno_add_instrumental</code>',
          'Source audio + title + tags',
          'V3_5–V5',
          'Include tags (max 500) + exclude tags (max 500); no prompt'
        ],
        [
          '<strong>Vocal Generation</strong>',
          '<code>suno_add_vocals</code>',
          'Source audio + prompt + title/style/tags',
          'V3_5–V5',
          'Prompt max 5000; vocal gender optional (m/f)'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Suno form and API (<code>suno_*</code> model keys).',
      note: 'Upload workflows (cover, expand): MP3, WAV, M4A, max <strong>2 minutes</strong> and 10MB. Accompaniment/vocal uploads: max 10MB. Shared sliders: styleWeight, weirdnessConstraint, audioWeight (0–1). V5 offers faster generation and stronger expressiveness.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Suno — Six Music Workflows',
      lead: 'Pick the mode that matches your starting material:',
      items: [
        {
          name: 'Suno Music Generation',
          title: 'Music Generation',
          description: 'Text-to-music—Simple or Custom mode, V3.5–V5, instrumental or vocal tracks.',
          path: '/home/suno/generate',
          icon: 'fas fa-music'
        },
        {
          name: 'Suno Music Extension',
          title: 'Music Extension',
          description: 'Extend a completed generate task—pick Audio ID, optional custom continue point.',
          path: '/home/suno/extend',
          icon: 'fas fa-expand-arrows-alt'
        },
        {
          name: 'Suno Audio Cover',
          title: 'Audio Cover',
          description: 'Upload ≤2 min audio and reimagine style, lyrics, and arrangement.',
          path: '/home/suno/upload-cover',
          icon: 'fas fa-microphone'
        },
        {
          name: 'Suno Audio Expansion',
          title: 'Audio Expansion',
          description: 'Expand uploaded clips into fuller compositions with optional custom params.',
          path: '/home/suno/upload-extend',
          icon: 'fas fa-compress-arrows-alt'
        },
        {
          name: 'Suno Accompaniment',
          title: 'Accompaniment',
          description: 'Add instrumentals via include/exclude tags—no prompt required.',
          path: '/home/suno/add-instrumental',
          icon: 'fas fa-guitar'
        },
        {
          name: 'Suno Vocal Generation',
          title: 'Vocal Generation',
          description: 'Add vocals to source audio—prompt guides lyrics and singing style.',
          path: '/home/suno/add-vocals',
          icon: 'fas fa-user'
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
      html: '🔗 <strong>Suno pipeline tip</strong> Start with <a href="/home/suno/generate" class="seo-inline-link" >Music Generation</a> , then continue the same track via <a href="/home/suno/extend" class="seo-inline-link" >Music Extension</a> —or upload a short clip to <a href="/home/suno/upload-extend" class="seo-inline-link" >Audio Expansion</a> and layer <a href="/home/suno/add-vocals" class="seo-inline-link" >Vocals</a> / <a href="/home/suno/add-instrumental" class="seo-inline-link" >Accompaniment</a> as needed.'
    },
    {
      pricing: false,
      html: '🎙️ <strong>Audio companion — ElevenLabs</strong> Narrate over Suno tracks with <a href="/home/elevenlabs/multilingual-v2" class="seo-inline-link" >Multilingual v2</a> or <a href="/home/elevenlabs/turbo-2-5" class="seo-inline-link" >Turbo 2.5</a> , add production SFX via <a href="/home/elevenlabs/sound-effect-v2" class="seo-inline-link" >Sound Effect v2</a> , transcribe sessions with <a href="/home/elevenlabs/speech-to-text" class="seo-inline-link" >Speech-to-Text</a> , or split stems using <a href="/home/elevenlabs/audio-isolation" class="seo-inline-link" >AI Audio Isolation</a> . Browse the full <a href="/home/elevenlabs" class="seo-inline-link" >ElevenLabs suite →</a>'
    }
  ]
}
