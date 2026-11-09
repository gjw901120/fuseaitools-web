/**
 * KlingV26 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：KlingV26SeoContent.vue）
 */
export default {
  component: 'KlingV26SeoContent',
  rootId: 'kling-v26-section',
  rootClass: 'kling-seo',
  meta: {
    name: 'Kling 2.6 Video on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Kling 2.6 text and image-to-video with optional sound, plus Motion Control on FuseAITools—5/10s clips and reference-video pose transfer.'
  },
  badge: '🔊 Kling 2.6 · Sound + Motion Control · Three Workflows',
  introByPath: {
    '/home/kling/v2-6-text-to-video': {
      title: '📝 Kling 2.6 Text to Video',
      lead: 'Write one <strong>prompt (max 2500 characters)</strong>, flip <strong>Sound On</strong> for matching generated audio, then lock the shape of the clip: <strong>1:1, 16:9 or 9:16</strong> at <strong>5s or 10s</strong>. The exact credit cost appears on the generate button—audio tracks bill higher than silent ones.'
    },
    '/home/kling/v2-6-image-to-video': {
      title: '🖼️ Kling 2.6 Image to Video',
      lead: 'Start from <strong>one key frame</strong> (JPEG/PNG/WebP, up to 10MB) and tell the model how it should move in a <strong>prompt (max 2500 characters)</strong>. Add <strong>sound</strong> and choose <strong>5s or 10s</strong>—your upload anchors the opening composition, so the clip keeps the framing you already approved.'
    },
    '/home/kling/v2-6-motion-control': {
      title: '🎭 Kling 2.6 Motion Control',
      lead: 'Give the model <strong>two files: a character image and a motion video</strong>—the still supplies identity, the clip supplies the performance (dance, gestures, camera choreography). Pick <strong>720p or 1080p</strong> and decide whether orientation follows <strong>your image or the reference video</strong>. Credits = per-second rate × reference-clip seconds, shown after upload.'
    }
  },
  definitionByPath: {
    '/home/kling/v2-6-text-to-video': {
      title: 'What is Kling 2.6 Text to Video?',
      body: '<strong>Kling 2.6 Text to Video</strong> (<code>kling-2.6-text-to-video</code>) is the prompt-only, audio-capable workflow of the Kling 2.6 line on FuseAITools: you describe the whole scene in text and the model renders a 5- or 10-second clip, optionally with generated sound baked in. Against <a href="/home/kling/v2-5-turbo-text-to-video-pro" class="seo-inline-link">v2.5 Turbo Pro</a> it trades the CFG and negative-prompt dials for native audio and three fixed social aspect ratios—fewer knobs, but finished clips that need no separate sound pass.'
    },
    '/home/kling/v2-6-image-to-video': {
      title: 'What is Kling 2.6 Image to Video?',
      body: '<strong>Kling 2.6 Image to Video</strong> (<code>kling-2.6-image-to-video</code>) animates a single still you supply: the uploaded frame becomes the visual anchor of the clip while your prompt (max 2500 characters) directs the motion on top of it. It carries the same 2.6 audio toggle and 5/10-second options as <a href="/home/kling/v2-6-text-to-video" class="seo-inline-link">Text to Video</a>, and is the natural second step—generate or pick a still you like, then bring it to life instead of hoping a fresh text prompt lands the same composition.'
    },
    '/home/kling/v2-6-motion-control': {
      title: 'What is Kling 2.6 Motion Control?',
      body: '<strong>Kling 2.6 Motion Control</strong> (<code>kling-2.6-motion-control</code>) is reference-based performance transfer: upload a character image (JPG/PNG, min 300px, max 10MB) plus a motion video (MP4/MOV/MKV, max 100MB), and the render reproduces that video\'s movement with your subject. A prompt is optional here—orientation and <strong>720p/1080p</strong> resolution are the real controls, output length tracks the reference clip, and billing runs per reference-video second. Want newer quality tiers and background-source control? Compare <a href="/home/kling/v3-0-motion-control" class="seo-inline-link">3.0 Motion Control</a>.'
    }
  },
  faqByPath: {
    '/home/kling/v2-6-text-to-video': [
      {
        question: 'Does Kling 2.6 text-to-video include sound?',
        answer: 'Yes—optionally. The <strong>Sound</strong> switch has Off and On, and On bakes generated audio into the render so you can publish without a separate sound pass. The two states bill at different rates (<code>with_sound</code> vs <code>without_sound</code>), and the quote on the generate button updates as soon as you toggle it.'
      },
      {
        question: 'Which aspect ratios does Kling 2.6 T2V support?',
        answer: 'Three, selected as tabs in the form: <strong>1:1</strong> for square feeds, <strong>16:9</strong> for widescreen embeds, and <strong>9:16</strong> for Shorts/Reels/TikTok. Pair them with a 5s or 10s duration—vertical 9:16 at 5s is the usual starting point for social tests.'
      },
      {
        question: 'How long can a prompt be, and what should it contain?',
        answer: 'Up to <strong>2500 characters</strong>. Because 5/10-second clips fit one action arc, spend the budget on subject + a single clear verb + camera behavior + lighting/mood, rather than several unrelated scenes—the model reads the prompt as one continuous shot.'
      },
      {
        question: 'Does Kling 2.6 T2V expose negative prompts or CFG like v2.5 Turbo?',
        answer: 'No. The 2.6 form is deliberately shorter: sound, aspect ratio and duration are the only controls. If you relied on <strong>negative_prompt</strong> or <strong>cfg_scale</strong> tuning, stay on <a href="/home/kling/v2-5-turbo-text-to-video-pro" class="seo-inline-link">v2.5 Turbo Pro</a>; if you wanted finished clips with audio, this page replaces a two-tool pipeline with one.'
      }
    ],
    '/home/kling/v2-6-image-to-video': [
      {
        question: 'Is a prompt required for Kling 2.6 image-to-video?',
        answer: 'Yes. The image sets <em>what</em> the shot looks like, and the prompt (max <strong>2500 characters</strong>) sets <em>how</em> it moves—camera push-ins, subject gestures, wind or water motion. Without a motion description the render tends to drift with minimal intent.'
      },
      {
        question: 'What image files does the upload accept?',
        answer: 'A single <strong>JPEG, PNG or WebP</strong> up to <strong>10MB</strong>. Use the highest-quality source you have: the upload anchors the opening frame, so compression artifacts or cropped edges in the still carry straight into the video.'
      },
      {
        question: 'How does sound affect pricing on Kling 2.6 I2V?',
        answer: 'Sound <strong>On</strong> bills at the <code>with_sound</code> tier, <strong>Off</strong> at <code>without_sound</code>; the 5s/10s choice multiplies on top. Both factors are already reflected in the credit figure shown on the generate button, so you can compare tiers before spending.'
      },
      {
        question: 'When should I pick image-to-video over text-to-video?',
        answer: 'When composition is non-negotiable—product shots, brand characters, approved covers, portraits you cannot afford to distort. <a href="/home/kling/v2-6-text-to-video" class="seo-inline-link">Text to Video</a> is faster for pure ideation; I2V is the continuity step that animates an asset you already signed off.'
      }
    ],
    '/home/kling/v2-6-motion-control': [
      {
        question: 'What inputs does Kling 2.6 Motion Control need?',
        answer: 'Exactly two required files: a reference <strong>image</strong> of your character (JPG/PNG, min 300px, max 10MB) and a reference <strong>video</strong> containing the movement (MP4/MOV/MKV, max 100MB). The image supplies identity, the video supplies the performance.'
      },
      {
        question: 'Do I have to write a prompt for motion control?',
        answer: 'No—the form accepts a prompt but never blocks on it. Two uploads plus orientation and resolution are enough for a transfer. Add a short prompt only to nudge scene details (background treatment, mood); most motion-transfer tests work fine with it empty.'
      },
      {
        question: 'How is Kling 2.6 Motion Control priced?',
        answer: 'Per second at your chosen <strong>720p or 1080p</strong> rate × the reference video\'s duration, rounded up, with a one-second minimum. The total appears on the generate button after the video uploads—trim the reference clip first, since every extra billed second costs.'
      },
      {
        question: 'What does "character orientation" actually switch?',
        answer: 'It decides which input defines the direction your character faces: <strong>Video</strong> (the default) follows the reference clip\'s facing, while <strong>Image</strong> anchors orientation to the pose shown in your uploaded still. Switch to Image when the source photo\'s body direction matters more than the dance or action video\'s.'
      },
      {
        question: 'How long is the rendered output?',
        answer: 'It follows the reference video you upload rather than a 5/10s menu—there is no duration dial on this page. Keep the reference tight (a single clean action loop) for the cheapest, most on-model result.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Kling 2.6?',
      answer: 'No—Kling 2.6 runs in the cloud. T2V/I2V bill by duration + sound; Motion Control bills per reference-video second.'
    },
    {
      question: 'How is Kling 2.6 priced on FuseAITools?',
      answer: 'Credits on the Generate button—duration and sound for T2V/I2V; per-second for Motion Control. See <a href="/pricing" class="seo-pricing-link">pricing</a>.'
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
      title: '🔊 Kling 2.6 on FuseAITools',
      html: 'Kling <strong>2.6</strong> on <a href="/" class="seo-inline-link">FuseAITools</a> adds <strong>generated sound</strong> to text and image-to-video, plus <strong>Motion Control</strong>—transfer pose from a reference video onto a character image at 720p/1080p. Compared to <a href="/home/kling/v2-5-turbo-text-to-video-pro" class="seo-inline-link">v2.5 Turbo</a>, 2.6 trades CFG knobs for audio and motion workflows. New users receive <strong>10 free credits</strong> on sign-up.'
    },
    {
      type: 'prose',
      id: 't26-prompting-heading',
      paths: ['/home/kling/v2-6-text-to-video'],
      title: '📝 Prompting for Motion, Not Just Looks',
      html: 'A text-to-video prompt is a shooting brief, not a mood board. With only <strong>5 or 10 seconds</strong> on the clock, the strongest Kling 2.6 prompts commit to <em>one</em> action—an espresso shot being pulled, a coat turning in wind, a drone rising off a rooftop—and then describe the camera (locked-off, push-in, handheld), the light, and the lens feel. Save environment detail for a single trailing clause. Use <strong>9:16</strong> when the clip is destined for vertical feeds, <strong>16:9</strong> for blog embeds, and keep <strong>Sound On</strong> for scenes whose realism depends on ambience (streets, kitchens, nature); switch it Off when you plan to lay your own music or voiceover on top, since silent renders bill lower.'
    },
    {
      type: 'prose',
      id: 'i26-keyframe-heading',
      paths: ['/home/kling/v2-6-image-to-video'],
      title: '🖼️ Choosing the Right Key Frame',
      html: 'Image-to-video inherits everything your still already contains—composition, palette, subject angle—so the upload decision matters more than the prompt. Pick a frame with <strong>one clear subject</strong>, clean edges, and room around the elements you want to move: cropped limbs or dense text in the still tend to warp once animation starts. A practical pipeline is to first generate the perfect still with any FuseAITools image workflow (for example <a href="/home/seedream/5-pro-text-to-image" class="seo-inline-link">Seedream 5 Pro text-to-image</a>), approve it, then feed it here and spend the prompt budget purely on motion verbs. Because the still anchors the opening, <strong>5s</strong> is usually enough for a single gesture; reserve <strong>10s</strong> for slow camera moves.'
    },
    {
      type: 'prose',
      id: 'm26-transfer-heading',
      paths: ['/home/kling/v2-6-motion-control'],
      title: '🎭 Making Reference Transfer Look Clean',
      html: 'The two uploads rarely come from the same shoot, so matching them is the craft: choose a reference video with <strong>one visible performer</strong>, full body in frame, and a simple background—crowds and occlusion confuse the mapping. For the character image, a front-facing portrait at <strong>300px or larger</strong> on the short edge keeps identity stable through the transfer. Then set <strong>character orientation</strong> deliberately: leave it on <strong>Video</strong> to mirror the clip\'s body direction, or switch to <strong>Image</strong> when your still\'s pose should win. Render at <strong>720p</strong> to iterate cheaply, and rerun only the keeper at <strong>1080p</strong>—billing counts every second of the reference clip, so trim dance or action footage to the exact loop before uploading.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Kling 2.6 Core Features',
      items: [
        {
          icon: '🔊',
          title: 'Optional Sound',
          description: 'Toggle generated audio on T2V/I2V—pricing reflects with_sound vs without_sound.'
        },
        {
          icon: '🎭',
          title: 'Motion Control',
          description: 'Transfer reference-video motion to a character still—720p or 1080p.'
        },
        {
          icon: '📐',
          title: 'Social Aspect Ratios',
          description: '1:1, 16:9, and 9:16 on text and image workflows.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'Three 2.6 modes in one tier—credits shown before generate.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: ['Clips with ambient audio', 'Character pose transfer', 'Vertical social video', 'Product animation']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Kling 2.6 vs v2.5 Turbo',
      ariaLabel: 'Kling 2.6 vs v2.5 Turbo',
      headers: ['Dimension', '2.6', 'v2.5 Turbo'],
      rows: [
        ['<strong>Workflows</strong>', 'T2V, I2V, Motion Control', 'T2V Pro, I2V Pro only'],
        ['<strong>Generated sound</strong>', '<strong>Yes</strong> (T2V/I2V toggle)', 'No'],
        ['<strong>Motion control</strong>', '<strong>2.6 Motion Control</strong>', 'Not available'],
        ['<strong>Fine-tuning</strong>', 'Sound on/off; character orientation', 'Negative prompt, CFG scale'],
        ['<strong>Duration</strong>', '5s/10s (T2V/I2V)', '5s/10s']
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Kling 2.6)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Kling 2.6 Technical Specs',
      ariaLabel: 'Kling 2.6 capabilities',
      headers: ['Workflow', 'modelKey', 'Required', 'Key controls'],
      rows: [
        [
          '<strong>Text to Video</strong>',
          '<code>kling-2.6-text-to-video</code>',
          'Prompt',
          'Sound; aspect 1:1/16:9/9:16; 5/10s'
        ],
        [
          '<strong>Image to Video</strong>',
          '<code>kling-2.6-image-to-video</code>',
          'Image + prompt',
          'Sound; 5/10s'
        ],
        [
          '<strong>Motion Control</strong>',
          '<code>kling-2.6-motion-control</code>',
          'Reference image + video',
          'Character orientation; 720p/1080p; per-second pricing'
        ]
      ]
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Kling 2.6 — Three Workflows',
      items: [
        {
          name: 'Kling 2.6 Text to Video',
          title: 'Text to Video',
          description: 'Optional sound—aspect ratio, 5/10s.',
          path: '/home/kling/v2-6-text-to-video',
          icon: 'fas fa-font'
        },
        {
          name: 'Kling 2.6 Image to Video',
          title: 'Image to Video',
          description: 'Single image + optional sound, 5/10s.',
          path: '/home/kling/v2-6-image-to-video',
          icon: 'fas fa-image'
        },
        {
          name: 'Kling 2.6 Motion Control',
          title: 'Motion Control',
          description: 'Reference image + video; 720p/1080p.',
          path: '/home/kling/v2-6-motion-control',
          icon: 'fas fa-route'
        }
      ]
    },
    {
      type: 'table',
      id: 'version-compare-heading',
      title: '📊 Kling 2.6 vs 3.0',
      ariaLabel: 'Kling 2.6 vs 3.0 comparison',
      headers: ['Dimension', '2.6', '3.0'],
      rows: [
        ['<strong>Positioning</strong>', 'Sound + motion control', 'Director-level storytelling'],
        ['<strong>Workflows</strong>', 'T2V, I2V, Motion Control', '3.0 Video, 3.0 Motion Control'],
        [
          '<strong>Duration</strong>',
          '<strong>5s or 10s</strong> (T2V/I2V); motion = ref video length',
          '<strong>3–15s</strong> (Video); motion = ref video length'
        ],
        [
          '<strong>Generated sound</strong>',
          '<strong>Yes</strong> (T2V/I2V toggle)',
          '<strong>Yes</strong> (3.0 Video; required in multi-shot)'
        ],
        [
          '<strong>Motion control</strong>',
          '2.6 Motion Control (720p/1080p)',
          '3.0 Motion Control (std/pro + background source)'
        ],
        [
          '<strong>Unique controls</strong>',
          'Character orientation from image/video',
          'Multi-shot (≤5), per-shot elements, start/end frames'
        ],
        [
          '<strong>Quality tiers</strong>',
          '720p/1080p (Motion Control only)',
          '<strong>std / pro</strong> on Video and Motion Control'
        ],
        [
          '<strong>Best for</strong>',
          'Clips with audio, pose transfer',
          'Narrative sequences, advanced motion'
        ]
      ],
      lead: '<strong>Kling 2.6</strong> covers sound-enabled T2V/I2V and reference-video motion control at fixed 5/10s clips. Upgrade to <a href="/home/kling/v3-0-video" class="seo-inline-link">Kling 3.0 Video</a> for multi-shot director mode (3–15s) or <a href="/home/kling/v3-0-motion-control" class="seo-inline-link">3.0 Motion Control</a> for std/pro quality and background source control.'
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>10 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for subscription discounts and credit top-ups.'
    },
    {
      pricing: false,
      html: '🎬 Need multi-shot mode or 3–15 second director clips? <a href="/home/kling/v3-0-video" class="seo-inline-link">Explore Kling 3.0 Video →</a> for up to five shots, std/pro quality, and per-shot elements—or <a href="/home/kling/v3-0-motion-control" class="seo-inline-link">3.0 Motion Control</a> for std/pro motion transfer with background source control.'
    },
    {
      pricing: false,
      html: '⚡ Want a streamlined fast lane with a 3–15s slider and 720p/1080p? <a href="/home/kling/v3-turbo-text-to-video" class="seo-inline-link">Try Kling V3 Turbo Text to Video →</a> or <a href="/home/kling/v3-turbo-image-to-video" class="seo-inline-link">V3 Turbo Image to Video</a> for per-second billing and continuous duration control (no sound or motion transfer).'
    },
    {
      pricing: false,
      html: '🌐 Want the flagship Kling 3.0 Omni family—4K, native audio, smart/custom multi-shot and reusable subject elements? <a href="/home/kling/3-0-omni-text-to-video" class="seo-inline-link">Omni Text to Video</a>, <a href="/home/kling/3-0-omni-image-to-video" class="seo-inline-link">Image</a> / <a href="/home/kling/3-0-omni-reference-to-video" class="seo-inline-link">Reference</a> (billed per second), or <a href="/home/kling/3-0-omni-transformation" class="seo-inline-link">Video Transformation</a> to restyle a clip you already have.'
    }
  ],
  watchPathIncludes: '/home/kling/v2-6-'
}
