/**
 * ElevenLabs SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：ElevenLabsSeoContent.vue）
 */
export default {
  component: 'ElevenLabsSeoContent',
  rootId: 'elevenlabs-section',
  rootClass: 'elevenlabs-seo',
  meta: {
    name: 'ElevenLabs Voice & Audio on FuseAITools',
    category: 'MultimediaApplication',
    description: 'ElevenLabs on FuseAITools—five audio workflows: Multilingual v2 TTS, Turbo 2.5 TTS, Speech-to-Text, Sound Effect v2, and AI Audio Isolation.'
  },
  badge: '🎙️ ElevenLabs · Voice & Audio · Five Workflows',
  introByPath: {
    '/home/elevenlabs/multilingual-v2': {
      title: '🌍 ElevenLabs Multilingual v2 TTS',
      lead: 'Convert text to natural speech with a required <strong>voice</strong> selection and up to <strong>5000 characters</strong> of input. Tune <strong>stability</strong>, <strong>similarity boost</strong>, <strong>style</strong>, and <strong>speed</strong> (0.7–1.2). Optional <strong>previous/next context text</strong>, <strong>language code</strong>, and <strong>word timestamps</strong> for subtitle workflows.'
    },
    '/home/elevenlabs/turbo-2-5': {
      title: '⚡ ElevenLabs Turbo 2.5 TTS',
      lead: 'Same voice and text controls as Multilingual v2—optimized for <strong>faster generation</strong> when you need low-latency narration, batch dubbing, or interactive assistants. Required: <strong>voice + text</strong> (≤5000 chars). Preview voices in the dropdown before generating.'
    },
    '/home/elevenlabs/speech-to-text': {
      title: '📝 ElevenLabs Speech-to-Text',
      lead: 'Upload an audio file (<strong>MP3, WAV, or M4A</strong>, max <strong>200MB</strong>) and receive a transcript with optional <strong>speaker diarization</strong> and <strong>audio event tagging</strong>. Set language to <strong>auto detect</strong> or pick from supported ISO codes. Results include a word-level timeline you can click to seek playback.'
    },
    '/home/elevenlabs/sound-effect-v2': {
      title: '🎵 ElevenLabs Sound Effect v2',
      lead: 'Describe the sound you need (max <strong>5000 characters</strong>)—rain, footsteps, UI clicks, ambience, and more. Set duration between <strong>0.5 and 22 seconds</strong>, toggle <strong>loop</strong> for seamless beds, and adjust <strong>intensity</strong> (prompt influence). Choose MP3 or PCM output format.'
    },
    '/home/elevenlabs/audio-isolation': {
      title: '✂️ ElevenLabs AI Audio Isolation',
      lead: 'Upload mixed audio (<strong>MP3, WAV, or M4A</strong>, max <strong>10MB</strong>) to isolate vocals or instruments for stems, karaoke, or remix prep. One-click processing—download isolated output from your generation history.'
    }
  },
  definitionByPath: {
    '/home/elevenlabs/multilingual-v2': {
      title: 'What is ElevenLabs Multilingual v2 TTS?',
      body: '<strong>ElevenLabs Multilingual v2</strong> on FuseAITools (<code>elevenlabs_text_to_speech_multilingual</code>) synthesizes speech from text. Required: <strong>voice</strong> (from the curated voice list) and <strong>text</strong> (max 5000 chars). Optional: stability/similarity/style/speed sliders, timestamps, previous/next context (5000 chars each), ISO <strong>language_code</strong>, and output format (MP3 128–320 kbps or PCM). Priced per <strong>1K characters</strong>.'
    },
    '/home/elevenlabs/turbo-2-5': {
      title: 'What is ElevenLabs Turbo 2.5 TTS?',
      body: '<strong>ElevenLabs Turbo 2.5</strong> on FuseAITools (<code>elevenlabs_text_to_speech_turbo</code>) delivers the same TTS parameter set as Multilingual v2 with faster turnaround—voice + text required, same slider and context controls. Choose Turbo when latency matters more than maximum prosody fidelity. Priced per <strong>1K characters</strong> at a lower rate than Multilingual v2.'
    },
    '/home/elevenlabs/speech-to-text': {
      title: 'What is ElevenLabs Speech-to-Text?',
      body: '<strong>ElevenLabs Speech-to-Text</strong> on FuseAITools (<code>elevenlabs_speech_to_text</code>) transcribes uploaded audio. Required: <strong>audioUrl</strong> from upload (≤200MB). Optional: <strong>languageCode</strong> (auto or en/zh/ja/ko/es/fr/de/it/pt/ru), <strong>diarize</strong> for speaker identification, and <strong>tagAudioEvents</strong> for music/noise markers. Returns full text plus word timeline. Priced per <strong>minute</strong> of audio.'
    },
    '/home/elevenlabs/sound-effect-v2': {
      title: 'What is ElevenLabs Sound Effect v2?',
      body: '<strong>ElevenLabs Sound Effect v2</strong> on FuseAITools (<code>elevenlabs_sound_effect</code>) generates audio SFX from a text prompt (max 5000 chars). Optional: <strong>durationSeconds</strong> (0.5–22), <strong>loop</strong>, <strong>promptInfluence</strong> (intensity 0–1), and output format. Ideal for games, trailers, and UI feedback. Priced per <strong>minute</strong> of generated audio.'
    },
    '/home/elevenlabs/audio-isolation': {
      title: 'What is ElevenLabs AI Audio Isolation?',
      body: '<strong>ElevenLabs AI Audio Isolation</strong> on FuseAITools (<code>elevenlabs_audio_isolation</code>) separates vocals or instruments from a mixed upload. Required: <strong>audioUrl</strong> (≤10MB). Output is downloadable isolated audio—use for stems, karaoke, or post-production cleanup. Priced per <strong>minute</strong> of source audio.'
    }
  },
  faqByPath: {
    '/home/elevenlabs/multilingual-v2': [
      {
        question: 'Which voice should I pick for Multilingual v2?',
        answer: 'Browse the <strong>Voice</strong> dropdown and click the speaker icon to preview samples. Each voice includes a short description—pick one that matches your language, tone, and use case (narration, character, news, etc.). Voice selection is <strong>required</strong> before generating.'
      },
      {
        question: 'What do stability and similarity boost control on Multilingual v2?',
        answer: '<strong>Stability</strong> (0–1) trades expressiveness for consistency—higher values sound steadier. <strong>Similarity boost</strong> (0–1) keeps output closer to the base voice. <strong>Style</strong> adds drama; <strong>speed</strong> ranges from 0.7 (slower) to 1.2 (faster).'
      }
    ],
    '/home/elevenlabs/turbo-2-5': [
      {
        question: 'When should I choose Turbo 2.5 over Multilingual v2?',
        answer: 'Pick <strong>Turbo 2.5</strong> when you need faster turnaround—live assistants, batch dubbing, or social clips. Choose <strong>Multilingual v2</strong> when maximum natural prosody and emotional nuance matter more than latency.'
      },
      {
        question: 'Does Turbo 2.5 support the same output formats as Multilingual v2?',
        answer: 'Yes—both TTS workflows support MP3 (128/192/320 kbps) and PCM (16–44.1 kHz) output, optional timestamps, context text, and language code enforcement.'
      }
    ],
    '/home/elevenlabs/speech-to-text': [
      {
        question: 'What audio formats does ElevenLabs Speech-to-Text accept?',
        answer: '<strong>MP3, WAV, and M4A</strong> uploads up to <strong>200MB</strong>. Set language to auto detect or choose from English, Chinese, Japanese, Korean, Spanish, French, German, Italian, Portuguese, or Russian.'
      },
      {
        question: 'What does speaker identification do on Speech-to-Text?',
        answer: 'Enabling <strong>speaker identification</strong> (<code>diarize</code>) labels different speakers in the transcript—useful for meetings and interviews. <strong>Mark audio events</strong> adds tags for music, noise, and silence when enabled.'
      }
    ],
    '/home/elevenlabs/sound-effect-v2': [
      {
        question: 'How long can ElevenLabs Sound Effect v2 clips be?',
        answer: 'Set duration between <strong>0.5 and 22 seconds</strong> in 0.5s steps. Enable <strong>Loop</strong> for seamlessly repeatable ambience. Adjust <strong>intensity</strong> (prompt influence) from soft (0) to intense (1).'
      },
      {
        question: 'How should I write sound effect prompts?',
        answer: 'Describe physical details—material, environment, distance, and mood. Examples: <strong>soft rain on a tin roof</strong>, <strong>wooden door creak in a hallway</strong>, <strong>short UI click with subtle reverb</strong>. Max <strong>5000 characters</strong>.'
      }
    ],
    '/home/elevenlabs/audio-isolation': [
      {
        question: 'What file size limit applies to AI Audio Isolation?',
        answer: 'Uploads must be <strong>10MB or smaller</strong> (MP3, WAV, or M4A)—smaller than Speech-to-Text because isolation processes full mixed tracks at high fidelity. Trim long files before upload if needed.'
      },
      {
        question: 'Can I isolate vocals and instruments separately?',
        answer: 'The form uploads one mixed track per run and returns isolated output in your history. For full stem workflows, run isolation on different source mixes or combine with <a href="/home/suno/add-instrumental" class="seo-inline-link">Suno Accompaniment</a> for music layering.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for ElevenLabs on FuseAITools?',
      answer: 'No—ElevenLabs runs in the cloud. Use any modern browser; credits are charged per successful generation based on characters (TTS) or minutes (STT, SFX, isolation).'
    },
    {
      question: 'How is ElevenLabs priced on FuseAITools?',
      answer: 'TTS workflows bill per <strong>1K characters</strong> (<code>elevenlabs_text_to_speech_multilingual</code> / <code>elevenlabs_text_to_speech_turbo</code>); STT, Sound Effect, and Isolation bill per <strong>minute</strong>. Exact credits appear on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
      title: '🎙️ ElevenLabs on FuseAITools',
      html: 'ElevenLabs on <a href="/" class="seo-inline-link">FuseAITools</a> covers professional voice and audio in the browser—natural <strong>text-to-speech</strong> (Multilingual v2 or fast Turbo 2.5), accurate <strong>speech-to-text</strong> with optional diarization, AI <strong>sound effects</strong>, and <strong>audio isolation</strong> for stems. Pick a voice, paste or upload audio, and download results from history. Credits appear on the Generate button before you submit; new users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ ElevenLabs Core Features',
      items: [
        {
          icon: '🗣️',
          title: 'Two TTS Models',
          description: '<strong>Multilingual v2</strong> for premium prosody; <strong>Turbo 2.5</strong> for faster, lower-latency speech.'
        },
        {
          icon: '📝',
          title: 'Speech-to-Text',
          description: 'Upload up to <strong>200MB</strong>—auto language, diarization, event tags, and clickable word timelines.'
        },
        {
          icon: '🎚️',
          title: 'Voice Fine-Tuning',
          description: 'Stability, similarity, style, and speed sliders plus optional context text for seamless multi-clip narration.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'Generate, transcribe, and isolate in the browser—<strong>credits shown before submit</strong>; no local GPU required.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Video & podcast narration',
        'Dubbing & accessibility',
        'Meeting transcripts',
        'Game & film SFX',
        'Vocal stem extraction'
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 ElevenLabs Workflow Quick Guide',
      ariaLabel: 'ElevenLabs five workflows comparison',
      headers: ['Workflow', 'Input', 'Best for'],
      rows: [
        [
          '<strong>Multilingual v2 TTS</strong>',
          'Voice + text (≤5000 chars)',
          'High-quality narration, dubbing, audiobooks'
        ],
        [
          '<strong>Turbo 2.5 TTS</strong>',
          'Voice + text (≤5000 chars)',
          'Low-latency voice for assistants and batch runs'
        ],
        [
          '<strong>Speech-to-Text</strong>',
          'Uploaded audio (≤200MB)',
          'Transcripts, subtitles, meeting notes'
        ],
        [
          '<strong>Sound Effect v2</strong>',
          'Text description (≤5000 chars)',
          'Game, video, and UI sound design'
        ],
        [
          '<strong>AI Audio Isolation</strong>',
          'Uploaded audio (≤10MB)',
          'Vocal/instrument stems and remix prep'
        ]
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (ElevenLabs)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ ElevenLabs Technical Specs',
      ariaLabel: 'ElevenLabs workflow capabilities',
      headers: ['Workflow', 'modelKey', 'Required', 'Pricing unit', 'Key controls'],
      rows: [
        [
          '<strong>Multilingual v2 TTS</strong>',
          '<code>elevenlabs_text_to_speech_multilingual</code>',
          'Voice + text',
          'credits / 1K chars',
          'Stability, similarity, style, speed (0.7–1.2); optional timestamps, context text, language code; MP3/PCM output'
        ],
        [
          '<strong>Turbo 2.5 TTS</strong>',
          '<code>elevenlabs_text_to_speech_turbo</code>',
          'Voice + text',
          'credits / 1K chars',
          'Same voice controls as Multilingual v2—optimized for faster generation'
        ],
        [
          '<strong>Speech-to-Text</strong>',
          '<code>elevenlabs_speech_to_text</code>',
          'Uploaded audio URL',
          'credits / min',
          'Language (auto or ISO code); speaker diarization; audio event tagging; word timeline in results'
        ],
        [
          '<strong>Sound Effect v2</strong>',
          '<code>elevenlabs_sound_effect</code>',
          'Sound description',
          'credits / min',
          'Duration 0.5–22s; loop toggle; intensity (prompt influence); MP3/PCM output'
        ],
        [
          '<strong>AI Audio Isolation</strong>',
          '<code>elevenlabs_audio_isolation</code>',
          'Uploaded audio URL',
          'credits / min',
          'Upload MP3/WAV/M4A (≤10MB)—isolates vocals or instruments from mixed audio'
        ]
      ],
      lead: 'Parameters below match the FuseAITools ElevenLabs form and API (<code>elevenlabs_*</code> model keys).',
      note: 'TTS text and context fields: max <strong>5000 characters</strong> each. STT uploads: max <strong>200MB</strong>. Isolation uploads: max <strong>10MB</strong>. Output formats include MP3 (128–320 kbps) and PCM (16–44.1 kHz).'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'ElevenLabs — Five Audio Workflows',
      lead: 'Pick the mode that matches your starting material:',
      items: [
        {
          name: 'ElevenLabs Multilingual v2',
          title: 'Multilingual v2 TTS',
          description: 'Natural multilingual voice synthesis—voice picker, stability/style sliders, optional timestamps.',
          path: '/home/elevenlabs/multilingual-v2',
          icon: 'fas fa-globe'
        },
        {
          name: 'ElevenLabs Turbo 2.5',
          title: 'Turbo 2.5 TTS',
          description: 'Fast text-to-speech with the same voice controls—ideal for assistants and high-volume runs.',
          path: '/home/elevenlabs/turbo-2-5',
          icon: 'fas fa-bolt'
        },
        {
          name: 'ElevenLabs Speech-to-Text',
          title: 'Speech-to-Text',
          description: 'Upload audio for transcripts—auto language, diarization, and word-level timeline.',
          path: '/home/elevenlabs/speech-to-text',
          icon: 'fas fa-keyboard'
        },
        {
          name: 'ElevenLabs Sound Effect v2',
          title: 'Sound Effect v2',
          description: 'Generate SFX from text—duration 0.5–22s, loop, intensity, and format controls.',
          path: '/home/elevenlabs/sound-effect-v2',
          icon: 'fas fa-volume-up'
        },
        {
          name: 'ElevenLabs AI Audio Isolation',
          title: 'AI Audio Isolation',
          description: 'Extract vocals or instruments from mixed tracks—upload MP3/WAV/M4A up to 10MB.',
          path: '/home/elevenlabs/audio-isolation',
          icon: 'fas fa-cut'
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
      html: '🔗 <strong>ElevenLabs pipeline tip</strong> Narrate with <a href="/home/elevenlabs/multilingual-v2" class="seo-inline-link" >Multilingual v2</a> or <a href="/home/elevenlabs/turbo-2-5" class="seo-inline-link" >Turbo 2.5</a> , transcribe meetings via <a href="/home/elevenlabs/speech-to-text" class="seo-inline-link" >Speech-to-Text</a> , design SFX with <a href="/home/elevenlabs/sound-effect-v2" class="seo-inline-link" >Sound Effect v2</a> , and split stems with <a href="/home/elevenlabs/audio-isolation" class="seo-inline-link" >AI Audio Isolation</a> . For full music tracks, pair with <a href="/home/suno/generate" class="seo-inline-link" >Suno Music Generation</a> .'
    }
  ]
}
