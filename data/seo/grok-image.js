/**
 * GrokImage SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：GrokImageSeoContent.vue）
 */
export default {
  component: 'GrokImageSeoContent',
  rootId: 'grok-image-section',
  rootClass: 'grok-seo',
  meta: {
    name: 'Grok Imagine Image on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Grok Imagine text-to-image and image-to-image on FuseAITools—xAI image generation from prompts or one reference image, up to 5000 characters.'
  },
  badge: '🖼️ Grok Imagine · xAI Image · Two Workflows',
  introByPath: {
    '/home/grok/text-to-image': {
      title: '📝 Grok Text to Image',
      lead: 'Describe your scene in a <strong>prompt</strong> (≤5000 characters). Grok Imagine generates a still image—the current FuseAITools form submits <strong>1:1</strong> square output via <code>grok-imagine-text-to-image</code>.'
    },
    '/home/grok/image-to-image': {
      title: '🖼️ Grok Image to Image',
      lead: 'Upload <strong>one image</strong> (JPEG/PNG/WebP, max 10MB) and optionally add a prompt (≤5000 chars) to guide style or edits through <code>grok-imagine-image-to-image</code>'
    },
    '/home/grok/image-2-0-text-to-image': {
      title: '✨ Grok Image 2.0 Text to Image',
      lead: 'The newest xAI image model—describe your scene in a <strong>prompt up to 8000 characters</strong> and pick from <strong>five aspect ratios</strong> (<strong>1:1, 2:3, 3:2, 16:9, 9:16</strong>) via <code>grok-imagine-image-2-0-text-to-image</code>.'
    },
    '/home/grok/image-2-0-image-edit': {
      title: '🖋️ Grok Image 2.0 Edit',
      lead: 'Upload <strong>1–5 reference images</strong> and optionally guide the result with a prompt (≤8000 chars). Choose <strong>five aspect ratios plus auto</strong> through <code>grok-imagine-image-2-0-image-edit</code>.'
    },
    '/home/grok/image-2-0-segment-edit': {
      title: '🧩 Grok Image 2.0 Segment Edit',
      lead: 'Pick a prior <strong>Image 2.0 text-to-image task</strong> and refine it with a <strong>prompt up to 65000 characters</strong>—optionally targeting specific <strong>segment indexes</strong>—via <code>grok-imagine-image-2-0-segment-edit</code>.'
    }
  },
  definitionByPath: {
    '/home/grok/text-to-image': {
      title: 'What is Grok Text to Image?',
      body: '<strong>Grok Text to Image</strong> (<code>grok-imagine-text-to-image</code>) on FuseAITools creates a still image from text. Required: <strong>prompt</strong> (max 5000). The web form currently sends <strong>aspect_ratio 1:1</strong>.'
    },
    '/home/grok/image-to-image': {
      title: 'What is Grok Image to Image?',
      body: '<strong>Grok Image to Image</strong> (<code>grok-imagine-image-to-image</code>) transforms one uploaded image. Required: <strong>exactly one image URL</strong>. Prompt is optional (max 5000 chars).'
    },
    '/home/grok/image-2-0-text-to-image': {
      title: 'What is Grok Image 2.0 Text to Image?',
      body: '<strong>Grok Image 2.0 Text to Image</strong> (<code>grok-imagine-image-2-0-text-to-image</code>) on FuseAITools is xAI\'s newest still-image generator. Required: <strong>prompt</strong> (max 8000) and <strong>aspect ratio</strong> (1:1, 2:3, 3:2, 16:9, 9:16). Credits are a flat per-image price shown on Generate.'
    },
    '/home/grok/image-2-0-image-edit': {
      title: 'What is Grok Image 2.0 Edit?',
      body: '<strong>Grok Image 2.0 Edit</strong> (<code>grok-imagine-image-2-0-image-edit</code>) restyles or transforms <strong>1–5 reference images</strong>. Required: <strong>imageUrls</strong> (1–5) and <strong>aspect ratio</strong> (five fixed ratios plus <strong>auto</strong>); the prompt is optional (max 8000 chars).'
    },
    '/home/grok/image-2-0-segment-edit': {
      title: 'What is Grok Image 2.0 Segment Edit?',
      body: '<strong>Grok Image 2.0 Segment Edit</strong> (<code>grok-imagine-image-2-0-segment-edit</code>) refines an existing source task. Required: <strong>taskId</strong> (chosen from your Image 2.0 text-to-image history) and <strong>prompt</strong> (max 65000). <strong>maskIndexs</strong> is optional—supply 0-based segment indexes to edit specific regions, or omit it to edit the whole image.'
    }
  },
  faqByPath: {
    '/home/grok/text-to-image': [
      {
        question: 'Is a prompt required for Grok text-to-image?',
        answer: 'Yes—enter a description up to <strong>5000 characters</strong>. The Generate button stays disabled until the prompt is filled.'
      },
      {
        question: 'Which aspect ratio does Grok T2I use on FuseAITools?',
        answer: 'The current form submits <strong>1:1</strong> square output. Describe composition in your prompt if you need a portrait or landscape feel inside the square frame.'
      }
    ],
    '/home/grok/image-to-image': [
      {
        question: 'How many images can I upload for Grok image-to-image?',
        answer: 'The API accepts <strong>exactly one</strong> image per request (JPEG, PNG, or WebP; max <strong>10MB</strong>). Upload one reference, then optionally guide the result with a prompt.'
      },
      {
        question: 'Is a prompt required for Grok image-to-image?',
        answer: 'No—the prompt is <strong>optional</strong> (max 5000 chars). You can submit the image alone or add instructions for style, lighting, or subject changes.'
      }
    ],
    '/home/grok/image-2-0-text-to-image': [
      {
        question: 'How is Grok Image 2.0 Text to Image different from the original?',
        answer: 'Image 2.0 (<code>grok-imagine-image-2-0-text-to-image</code>) accepts prompts up to <strong>8000 characters</strong> and lets you choose <strong>five aspect ratios</strong> (1:1, 2:3, 3:2, 16:9, 9:16). The original text-to-image form submits a fixed <strong>1:1</strong> square with a 5000-char cap.'
      },
      {
        question: 'What does Grok Image 2.0 Text to Image cost?',
        answer: 'A <strong>flat per-image credit price</strong>—the exact amount is shown on the Generate button before you submit. New users get <strong>20 free credits</strong> on sign-up.'
      }
    ],
    '/home/grok/image-2-0-image-edit': [
      {
        question: 'How many reference images can Grok Image 2.0 Edit take?',
        answer: 'Between <strong>1 and 5 images</strong> per request. The prompt is <strong>optional</strong> (max 8000 chars), so you can restyle with images alone or add instructions.'
      },
      {
        question: 'Can Grok Image 2.0 Edit auto-pick the aspect ratio?',
        answer: 'Yes—besides <strong>1:1, 2:3, 3:2, 16:9, 9:16</strong> it supports <strong>auto</strong>, letting the model decide framing from your references. Aspect ratio is required.'
      }
    ],
    '/home/grok/image-2-0-segment-edit': [
      {
        question: 'Where does the Task ID for Grok Image 2.0 Segment Edit come from?',
        answer: 'It is selected from the <strong>Original Task</strong> dropdown, which lists your prior <code>grok-imagine-image-2-0-text-to-image</code> generations. Sign in to load your task history, then pick the image you want to refine.'
      },
      {
        question: 'Are mask indexes required for segment edit?',
        answer: 'No—<strong>maskIndexs</strong> is optional. Enter comma-separated <strong>0-based</strong> segment indexes to target specific regions, or leave it empty to edit the entire image. The prompt itself is required (up to <strong>65000 characters</strong>).'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Grok Imagine image?',
      answer: 'No—Grok Imagine runs in the cloud on FuseAITools. Credits appear on the Generate button before you submit.'
    },
    {
      question: 'How is Grok Imagine image priced on FuseAITools?',
      answer: 'Per-generation credits by modelKey (<code>grok-imagine-text-to-image</code> or <code>grok-imagine-image-to-image</code>). See <a href="/pricing" class="seo-pricing-link">pricing</a>. New users get <strong>20 free credits</strong> on sign-up.'
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
      title: '🖼️ Grok Imagine Image on FuseAITools',
      html: '<strong>Grok Imagine</strong> image workflows on <a href="/" class="seo-inline-link">FuseAITools</a> are xAI\'s still-image line—generate from a <strong>text prompt</strong> or transform a single <strong>uploaded image</strong> with optional instructions. Credits appear on Generate before you submit; new users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Grok Image Core Features',
      items: [
        {
          icon: '✍️',
          title: 'Prompt-First T2I',
          description: 'Start from text—up to <strong>5000 characters</strong> with credits shown before generate.'
        },
        {
          icon: '🖼️',
          title: 'Single-Image I2I',
          description: 'Upload <strong>one reference</strong> and optionally steer output with natural language.'
        },
        {
          icon: '⚡',
          title: 'Compact Controls',
          description: 'Minimal parameters—focus on prompt quality and fast iteration.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'xAI Grok Imagine in the browser—no local GPU required.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: ['Concept art', 'Social thumbnails', 'Style variations', 'Quick visual drafts']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Grok Text to Image vs Image to Image',
      ariaLabel: 'Grok text-to-image vs image-to-image',
      headers: ['Dimension', 'Text to Image', 'Image to Image'],
      rows: [
        [
          '<strong>Input</strong>',
          '<strong>Prompt</strong> (required)',
          '<strong>1 image URL</strong> + optional prompt'
        ],
        [
          '<strong>modelKey</strong>',
          '<code>grok-imagine-text-to-image</code>',
          '<code>grok-imagine-image-to-image</code>'
        ],
        ['<strong>Prompt limit</strong>', 'Max 5000 chars', 'Max 5000 chars (optional)'],
        ['<strong>Output framing</strong>', '1:1 square (current form)', 'Derived from source image'],
        ['<strong>Best for</strong>', 'New concepts from scratch', 'Style shifts, variations, guided edits']
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Grok Imagine Image)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Grok Image Technical Specs',
      ariaLabel: 'Grok image workflow capabilities',
      headers: ['Workflow', 'Required', 'Prompt', 'Uploads'],
      rows: [
        ['<strong>Text to Image</strong>', 'Prompt', '≤5000 chars', '—'],
        ['<strong>Image to Image</strong>', '1 image URL', 'Optional, ≤5000 chars', 'JPEG/PNG/WebP, max 10MB'],
        ['<strong>Image 2.0 Text to Image</strong>', 'Prompt + aspect ratio', '≤8000 chars', '—'],
        [
          '<strong>Image 2.0 Edit</strong>',
          '1–5 image URLs + aspect',
          'Optional, ≤8000 chars',
          '1–5 reference images'
        ],
        ['<strong>Image 2.0 Segment Edit</strong>', 'Task ID + prompt', '≤65000 chars', 'Optional mask indexes']
      ],
      lead: 'Parameters match the FuseAITools Grok image form and API.',
      note: 'Pricing: per-generation credits by modelKey—shown on Generate (<code>grok-imagine-text-to-image</code> / <code>grok-imagine-image-to-image</code> / <code>grok-imagine-image-2-0-text-to-image</code> / <code>grok-imagine-image-2-0-image-edit</code> / <code>grok-imagine-image-2-0-segment-edit</code>).'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Grok Imagine — Image Workflows',
      items: [
        {
          name: 'Grok Text to Image',
          title: 'Text to Image',
          description: 'Prompt-only—1:1 square output in the current form.',
          path: '/home/grok/text-to-image',
          icon: 'fas fa-font'
        },
        {
          name: 'Grok Image to Image',
          title: 'Image to Image',
          description: 'One reference image + optional prompt for variations.',
          path: '/home/grok/image-to-image',
          icon: 'fas fa-image'
        },
        {
          name: 'Grok Image 2.0 · Text to Image',
          title: 'Image 2.0 Text to Image',
          description: 'Newest xAI image model—prompts up to 8000 chars with 1:1, 2:3, 3:2, 16:9 or 9:16 aspect ratios.',
          path: '/home/grok/image-2-0-text-to-image',
          icon: 'fas fa-wand-magic-sparkles'
        },
        {
          name: 'Grok Image 2.0 · Edit',
          title: 'Image 2.0 Edit',
          description: 'Restyle 1–5 reference images with an optional prompt and auto or fixed aspect ratios.',
          path: '/home/grok/image-2-0-image-edit',
          icon: 'fas fa-pen-ruler'
        },
        {
          name: 'Grok Image 2.0 · Segment Edit',
          title: 'Image 2.0 Segment Edit',
          description: 'Refine a prior Image 2.0 task by prompt (≤65000 chars) and optional 0-based segment indexes.',
          path: '/home/grok/image-2-0-segment-edit',
          icon: 'fas fa-object-group'
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
      html: '🎬 Need short motion from your stills? <a href="/home/grok/text-to-video" class="seo-inline-link">Try Grok Text to Video →</a> or <a href="/home/grok/image-to-video" class="seo-inline-link">Image to Video</a> to animate Grok images—then upscale or extend the clip.'
    }
  ]
}
