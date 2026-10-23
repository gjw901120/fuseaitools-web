/**
 * QwenV1 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：QwenV1SeoContent.vue）
 */
export default {
  component: 'QwenV1SeoContent',
  rootId: 'qwen-v1-section',
  rootClass: 'qwen-seo',
  meta: {
    name: 'Qwen v1 Classic Image on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Qwen v1 classic image generation—text-to-image, image-to-image, and image-edit workflows on FuseAITools with full parameter control.'
  },
  badge: '🎨 Qwen v1 · Classic Image · Three Workflows',
  introByPath: {
    '/home/qwen/text-to-image': {
      title: '📝 Qwen v1 Text to Image',
      lead: 'Generate images from <strong>text prompts up to 5000 characters</strong> with full parameter control. Choose from <strong>6 image size presets</strong>, set <strong>inference steps (2–250)</strong> and <strong>guidance scale (0–20)</strong>, and toggle acceleration for speed or quality.'
    },
    '/home/qwen/image-to-image': {
      title: '🖼️ Qwen v1 Image to Image',
      lead: 'Upload <strong>one reference image</strong> and guide transformation with a prompt up to 5000 characters. Adjust <strong>denoising strength (0–1)</strong> to balance between preserving the original and applying new content.'
    },
    '/home/qwen/image-edit': {
      title: '✂️ Qwen v1 Image Edit',
      lead: 'Edit specific elements of an image via natural language—<strong>prompt up to 2000 characters</strong>. Generate <strong>1–4 outputs</strong> per request, enable <strong>sync mode</strong>, and fine-tune with <strong>steps (2–49)</strong> and <strong>guidance</strong>.'
    }
  },
  definitionByPath: {
    '/home/qwen/text-to-image': {
      title: 'What is Qwen v1 Text to Image?',
      body: '<strong>Qwen v1 Text to Image</strong> on FuseAITools turns a text prompt (≤5000 characters) into an image with <strong>six size presets</strong> (square, square_hd, portrait 3:4/9:16, landscape 4:3/16:9). Set <strong>inference steps 2–250</strong>, <strong>guidance scale 0–20</strong>, optional <strong>seed</strong>, <strong>acceleration</strong> (none/regular/high), <strong>negative prompt</strong>, and <strong>output format</strong> PNG or JPEG.'
    },
    '/home/qwen/image-to-image': {
      title: 'What is Qwen v1 Image to Image?',
      body: '<strong>Qwen v1 Image to Image</strong> on FuseAITools transforms a <strong>single uploaded image</strong> with a text prompt (≤5000 characters). The <strong>strength parameter (0–1)</strong> controls how much the output deviates from the original—use lower values for subtle edits, higher for full remakes. Includes full parameter set: steps, guidance, seed, acceleration, negative prompt, safety checker.'
    },
    '/home/qwen/image-edit': {
      title: 'What is Qwen v1 Image Edit?',
      body: '<strong>Qwen v1 Image Edit</strong> on FuseAITools edits specific parts of an uploaded image with natural-language instructions. Prompt up to <strong>2000 characters</strong>. Generate <strong>1–4 images</strong> per request, enable <strong>sync mode</strong> for deterministic outputs, and fine-tune with <strong>steps (2–49)</strong> and <strong>guidance scale</strong> (default 4).'
    }
  },
  faqByPath: {
    '/home/qwen/text-to-image': [
      {
        question: 'What image size options does Qwen v1 text-to-image offer?',
        answer: 'Choose from <strong>6 presets</strong>: Square (1024×1024), square_hd (1536×1536), portrait 3:4 (864×1152), portrait 9:16 (768×1344), landscape 4:3 (1152×864), and landscape 16:9 (1344×768).'
      },
      {
        question: 'What acceleration modes are available on Qwen v1 text-to-image?',
        answer: 'Three levels: <strong>None</strong> (maximum quality), <strong>Regular</strong>, and <strong>High</strong>. High acceleration reduces generation time by up to 50% and is recommended for images without text elements.'
      }
    ],
    '/home/qwen/image-to-image': [
      {
        question: 'What does the strength parameter do on Qwen v1 image-to-image?',
        answer: 'Strength (0–1) controls <strong>denoising intensity</strong>. <strong>0</strong> preserves the original almost unchanged; <strong>1</strong> fully remakes the image from the prompt. Start around <strong>0.3–0.7</strong> for a balanced edit.'
      },
      {
        question: 'Can I use negative prompts on Qwen v1 image-to-image?',
        answer: 'Yes—enter a <strong>negative prompt</strong> (max 500 characters) to exclude unwanted elements, such as "blurry, low quality, extra limbs". Works alongside the safety checker for content filtering.'
      }
    ],
    '/home/qwen/image-edit': [
      {
        question: 'How many images can Qwen v1 image edit generate per request?',
        answer: 'Between <strong>1 and 4</strong> outputs. Enable <strong>sync mode</strong> for deterministic results across multiple runs with the same prompt and seed.'
      },
      {
        question: 'What is the inference step range on Qwen v1 image edit?',
        answer: 'Steps run from <strong>2 to 49</strong>, with a default of 4 for guidance scale. Lower steps generate faster but may reduce detail; higher steps improve quality at the cost of speed.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Qwen v1 Classic?',
      answer: 'No—Qwen v1 runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
    },
    {
      question: 'How is Qwen v1 Classic priced on FuseAITools?',
      answer: 'Credits depend on the model and image size—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
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
      title: '🎨 Qwen v1 Classic on FuseAITools',
      html: 'Qwen v1 Classic on <a href="/" class="seo-inline-link">FuseAITools</a> delivers <strong>three image workflows</strong> with full parameter control—prompts up to <strong>5000 characters</strong>, inference steps, guidance scale, seed, acceleration, and negative prompts. Whether you generate from text, transform existing images, or edit specific elements, Qwen v1 gives you fine-grained tuning for every task. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Qwen v1 Classic Core Features',
      items: [
        {
          icon: '🎛️',
          title: 'Full Parameter Control',
          description: 'Fine-tune every generation with <strong>inference steps, guidance scale, seed, acceleration, and negative prompts</strong>—perfect for power users who want pixel-level control.'
        },
        {
          icon: '📝',
          title: 'Long Prompt Support',
          description: 'Prompts up to <strong>5000 characters</strong> on T2I and I2I workflows—describe intricate scenes, detailed edits, and complex compositions without truncation.'
        },
        {
          icon: '⚡',
          title: 'Acceleration Tiers',
          description: 'Three <strong>acceleration levels</strong> (none / regular / high) let you trade speed for quality. Use high acceleration for rapid drafts, none for final assets.'
        },
        {
          icon: '🔁',
          title: 'Reproducible Outputs',
          description: 'Set a fixed <strong>seed</strong> for consistent results across runs. Sync mode on Image Edit ensures deterministic multi-output generation.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Concept exploration & iteration',
        'Brand asset creation',
        'Photo editing & retouching',
        'Social media content',
        'Batch experimentation'
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Qwen v1 Classic)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Qwen v1 Classic Technical Specs',
      ariaLabel: 'Qwen v1 Classic workflow capabilities',
      headers: ['Workflow', 'Input', 'Image size', 'Key controls'],
      rows: [
        [
          '<strong>Text to Image</strong>',
          'Prompt ≤5000 chars',
          '6 presets (square, square_hd, portrait 3:4/9:16, landscape 4:3/16:9)',
          'Steps 2–250, guidance 0–20, acceleration, seed, negative prompt, safety checker, PNG/JPEG'
        ],
        [
          '<strong>Image to Image</strong>',
          '1 image URL + prompt ≤5000 chars',
          'Follows input image',
          'Strength 0–1, steps, guidance, acceleration, seed, negative prompt, safety checker, PNG/JPEG'
        ],
        [
          '<strong>Image Edit</strong>',
          '1 image URL + prompt ≤2000 chars',
          '6 presets (same as T2I)',
          'Steps 2–49, guidance (default 4), 1–4 outputs, sync mode, negative prompt, safety checker, PNG/JPEG'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Qwen form and API (<code>qwen-*-*</code> models).',
      note: 'Image inputs: JPEG, PNG, WebP (max 10MB). Acceleration: none / regular / high. High acceleration recommended for images without text.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Qwen v1 Classic — Three Image Workflows',
      lead: 'Choose the mode that matches your source material:',
      items: [
        {
          name: 'Qwen v1 Text to Image',
          title: 'Text to Image',
          description: 'Generate from text prompts up to 5000 chars—full control over steps, guidance, acceleration, and seed.',
          path: '/home/qwen/text-to-image',
          icon: 'fas fa-font'
        },
        {
          name: 'Qwen v1 Image to Image',
          title: 'Image to Image',
          description: 'Transform a reference image with a prompt—adjust denoising strength from 0 to 1.',
          path: '/home/qwen/image-to-image',
          icon: 'fas fa-image'
        },
        {
          name: 'Qwen v1 Image Edit',
          title: 'Image Edit',
          description: 'Edit specific elements via natural language—1–4 outputs, sync mode, 2–49 inference steps.',
          path: '/home/qwen/image-edit',
          icon: 'fas fa-edit'
        }
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Qwen Generations Compared: v1 · v2 · v2.1 · v3 · v3 Pro',
      ariaLabel: 'Qwen v1 Classic compared across all model generations',
      headers: ['Dimension', 'v1 Classic', 'v2', 'v2.1', 'v3', 'v3 Pro'],
      rows: [
        [
          '<strong>Positioning</strong>',
          'Full-parameter control for power users',
          'Minimal fast lane',
          'Long prompts + alpha output',
          'Smart rewriting flagship',
          '<strong>Premium quality tier</strong>'
        ],
        ['<strong>Prompt limit</strong>', 'T2I/I2I <strong>5000</strong>; Edit 2000', '800', '5000', '5000', '5000'],
        [
          '<strong>Signature controls</strong>',
          'Steps, guidance, acceleration, seed',
          'Seed only—simplified',
          'enhancePrompt, background, mask',
          'promptExtend + negative (≤5000)',
          'promptExtend + negative (≤5000)'
        ],
        ['<strong>Sizes / aspects</strong>', '6 presets', '5 / 8 (edit)', '9 (+auto)', '8', '8'],
        [
          '<strong>Reference images</strong>',
          '1 (I2I / edit)',
          '1 (edit)',
          '<strong>up to 10 + mask</strong>',
          'up to 3',
          'up to 3'
        ],
        [
          '<strong>Resolution / billing</strong>',
          'Per image',
          'Per image',
          '1K / 2K',
          '1K / 2K',
          '<strong>1K / 2K premium</strong>'
        ],
        [
          '<strong>Output formats</strong>',
          'PNG / JPEG',
          'PNG / JPEG',
          '<strong>PNG / WebP / JPEG</strong>',
          'PNG / JPEG',
          'PNG / JPEG'
        ],
        [
          '<strong>Best for</strong>',
          'Fine-tuned iterative control',
          'Quick social graphics',
          'Cutouts, remixes, inpainting',
          'Prompt-assisted production',
          'Hero assets &amp; final delivery'
        ]
      ],
      note: 'v1 Classic remains the only tier with <strong>inference steps, guidance scale and acceleration tiers</strong>—use it when pixel-level control matters; newer generations trade those knobs for resolution-billed quality.'
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for subscription discounts and credit top-ups.'
    },
    {
      pricing: false,
      html: '✨ Need modern streamlined generation? <a href="/home/qwen/v2-text-to-image" class="seo-inline-link" >Try Qwen v2 Text to Image →</a> for faster generation with aspect ratio control and modern quality, or <a href="/home/qwen/v2-image-edit" class="seo-inline-link" >Qwen v2 Image Edit</a> for reference-based editing with up to 21:9 support.'
    },
    {
      pricing: false,
      html: '🌟 Want the newest Qwen image families? <a href="/home/qwen/v21-text-to-image" class="seo-inline-link" >Qwen v2.1</a> adds transparent backgrounds, PNG/WebP/JPEG output and 1–10 image references with optional mask edits, while <a href="/home/qwen/v3-text-to-image" class="seo-inline-link" >Qwen v3</a> and <a href="/home/qwen/v3-pro-text-to-image" class="seo-inline-link" >v3 Pro</a> bring smart prompt rewriting plus a 5000-character negative prompt—all billed by 1K/2K resolution.'
    },
    {
      pricing: false,
      html: '👑 Ready for the premium tier? Go straight to <a href="/home/qwen/v3-pro-text-to-image" class="seo-inline-link" >Qwen v3 Pro Text to Image</a> or <a href="/home/qwen/v3-pro-image-to-image" class="seo-inline-link" >v3 Pro Image to Image</a> —the highest-fidelity Qwen image models, with smart prompt rewriting and a 5000-char negative prompt at 1K/2K resolution billing.'
    }
  ]
}
