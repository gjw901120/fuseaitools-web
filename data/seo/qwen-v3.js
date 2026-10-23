/**
 * Qwen v3 / v3 Pro SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：QwenV3SeoContent.vue）
 */
export default {
  component: 'QwenV3SeoContent',
  rootId: 'qwen-v3-section',
  rootClass: 'qwen-seo',
  meta: {
    name: 'Qwen v3 and v3 Pro on FuseAITools',
    category: 'MultimediaApplication',
    description:
      'Qwen v3 and v3 Pro image models on FuseAITools—5000-char prompts, smart prompt rewriting, negative prompt, 8 aspect ratios, 1K/2K resolution, up to 3 reference images. Billed by resolution with credits.'
  },
  badge: '🌟 Qwen v3 / v3 Pro · Smart Rewrite · 1K/2K',

  introByPath: {
    '/home/qwen/v3-text-to-image': {
      title: '⭐ Qwen v3 Text to Image',
      lead: 'Generate from <strong>prompts up to 5000 characters</strong> with <strong>smart prompt rewriting (promptExtend)</strong>, a <strong>negative prompt</strong> (≤5000), <strong>8 image sizes</strong> and <strong>1K / 2K</strong> resolution. Output as PNG or JPEG, with an optional seed.'
    },
    '/home/qwen/v3-image-to-image': {
      title: '🖼️ Qwen v3 Image to Image',
      lead: 'Upload <strong>1 to 3 images</strong> (each ≤10MB) plus a 5000-char prompt. <strong>promptExtend</strong> refines short instructions, and a <strong>negative prompt</strong> steers away unwanted elements. Resolution <strong>1K / 2K</strong> sets the price.'
    },
    '/home/qwen/v3-pro-text-to-image': {
      title: '👑 Qwen v3 Pro Text to Image',
      lead: 'The <strong>premium text-to-image tier</strong> with the same rich controls—5000-char prompts, promptExtend, negative prompt, 8 sizes and 1K/2K—tuned for the highest output fidelity.'
    },
    '/home/qwen/v3-pro-image-to-image': {
      title: '💎 Qwen v3 Pro Image to Image',
      lead: 'The <strong>premium image-to-image tier</strong> for up to <strong>3 reference images</strong>, with promptExtend, negative prompt and 1K/2K resolution for top-quality edits.'
    }
  },

  definitionByPath: {
    '/home/qwen/v3-text-to-image': {
      title: 'What is Qwen v3 Text to Image?',
      body: '<strong>Qwen v3 Text to Image</strong> on FuseAITools (<code>qwen3-text-to-image</code>) creates images from a prompt (≤5000) with smart prompt rewriting, a negative prompt, 8 sizes and 1K/2K resolution. Billed by resolution.'
    },
    '/home/qwen/v3-image-to-image': {
      title: 'What is Qwen v3 Image to Image?',
      body: '<strong>Qwen v3 Image to Image</strong> on FuseAITools (<code>qwen3-image-to-image</code>) edits or remixes up to <strong>3 images</strong> with a prompt, promptExtend and negative prompt. Resolution 1K/2K drives pricing.'
    },
    '/home/qwen/v3-pro-text-to-image': {
      title: 'What is Qwen v3 Pro Text to Image?',
      body: '<strong>Qwen v3 Pro Text to Image</strong> on FuseAITools (<code>qwen3-pro-text-to-image</code>) is the premium text-to-image tier—identical controls to v3 with higher output quality and a higher per-resolution cost.'
    },
    '/home/qwen/v3-pro-image-to-image': {
      title: 'What is Qwen v3 Pro Image to Image?',
      body: '<strong>Qwen v3 Pro Image to Image</strong> on FuseAITools (<code>qwen3-pro-image-to-image</code>) is the premium image-to-image tier for up to 3 references, with promptExtend, negative prompt and 1K/2K resolution.'
    }
  },

  faqByPath: {
    '/home/qwen/v3-text-to-image': [
      {
        question: 'What does promptExtend do on Qwen v3?',
        answer:
          '<strong>promptExtend</strong> (on by default) rewrites your prompt with the model to enrich short or simple descriptions—usually a clear quality boost for brief prompts.'
      },
      {
        question: 'Can I use a negative prompt on Qwen v3?',
        answer:
          'Yes—up to <strong>5000 characters</strong> to list elements you want to avoid, alongside the 8 supported image sizes and 1K/2K resolution.'
      }
    ],
    '/home/qwen/v3-image-to-image': [
      {
        question: 'How many images can I upload for Qwen v3 image-to-image?',
        answer:
          'Between <strong>1 and 3</strong> images (jpeg/png/webp/bmp/gif/tiff, each ≤10MB) plus a required prompt.'
      },
      {
        question: 'What image sizes does Qwen v3 support?',
        answer:
          'Eight: <strong>1:1, 3:2, 2:3, 4:3, 3:4, 16:9, 9:16 and 21:9</strong>. The default is 16:9.'
      }
    ],
    '/home/qwen/v3-pro-text-to-image': [
      {
        question: 'How is Qwen v3 Pro text-to-image different from standard v3?',
        answer:
          'Same controls—5000-char prompt, promptExtend, negative prompt, 8 sizes, 1K/2K—but the <strong>Pro</strong> model is a higher-quality tier at a higher credit cost.'
      },
      {
        question: 'What resolution options does Qwen v3 Pro offer?',
        answer:
          '<strong>1K</strong> and <strong>2K</strong>; resolution is the billing dimension. 4K is not available.'
      }
    ],
    '/home/qwen/v3-pro-image-to-image': [
      {
        question: 'How many references does Qwen v3 Pro image-to-image accept?',
        answer:
          'Up to <strong>3</strong> images (each ≤10MB) with a prompt up to 5000 characters and promptExtend enabled by default.'
      },
      {
        question: 'When should I choose v3 Pro over v3 for image editing?',
        answer:
          'Pick <strong>Pro</strong> when you need the finest detail and consistency; standard <strong>v3</strong> is more economical for routine edits.'
      }
    ]
  },

  commonFaq: [
    {
      question: 'Do I need a local GPU for Qwen v3?',
      answer:
        'No—Qwen v3 and v3 Pro run in the cloud on FuseAITools. Credits are charged per successful generation.'
    },
    {
      question: 'How is Qwen v3 priced on FuseAITools?',
      answer:
        'Pricing is matched by <strong>resolution</strong> (1K or 2K), with Pro costing more per tier—the exact credits appear on the Generate button. New users get <strong>20 free credits</strong>—see <a href="/pricing" class="seo-pricing-link">pricing</a>.'
    }
  ],

  sections: [
    { type: 'intro' },
    { type: 'definition' },
    {
      type: 'prose',
      id: 'positioning-heading',
      title: '🌟 Qwen v3 / v3 Pro on FuseAITools',
      html: 'The Qwen <strong>v3</strong> family on <a href="/" class="seo-inline-link">FuseAITools</a> adds <strong>smart prompt rewriting (promptExtend)</strong> and a dedicated <strong>negative prompt</strong> on top of 5000-character prompts, <strong>8 aspect ratios</strong> and <strong>1K / 2K</strong> resolution. Use the standard tier for everyday work or the <strong>v3 Pro</strong> tier for maximum fidelity. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Qwen v3 Core Features',
      items: [
        { icon: '🧠', title: 'Smart Prompt Rewriting', description: '<strong>promptExtend</strong> enriches short prompts automatically—on by default.' },
        { icon: '🚫', title: 'Negative Prompt', description: 'A dedicated <strong>≤5000-char</strong> negative prompt to exclude unwanted elements.' },
        { icon: '🎚️', title: '1K / 2K Resolution', description: '<strong>Resolution is the billing dimension</strong>—no 4K on this family.' },
        { icon: '📐', title: '8 Image Sizes', description: 'From 1:1 to widescreen 21:9, defaulting to 16:9.' },
        { icon: '👑', title: 'v3 Pro Tier', description: 'A premium, higher-fidelity variant with the same rich controls.' },
        { icon: '🎞️', title: 'PNG / JPEG Output', description: 'Two output formats with an optional reproducible seed.' }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'High-fidelity hero art',
        'Prompt-guided refinement',
        'Multi-reference edits',
        'Cinematic 21:9 layouts',
        'Brand-consistent assets'
      ]
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Qwen v3 Technical Specs',
      lead: 'Parameters match the FuseAITools Qwen v3 form and API (<code>qwen3-*</code> and <code>qwen3-pro-*</code> models).',
      ariaLabel: 'Qwen v3 workflow capabilities',
      headers: ['Workflow', 'Input', 'Image sizes', 'Key controls'],
      rows: [
        [
          '<strong>v3 / v3 Pro Text to Image</strong>',
          'Prompt ≤5000 chars',
          '1:1, 3:2, 2:3, 4:3, 3:4, 16:9, 9:16, 21:9',
          'Resolution 1K/2K, promptExtend, negative prompt, PNG/JPEG, seed'
        ],
        [
          '<strong>v3 / v3 Pro Image to Image</strong>',
          '1–3 image URLs + prompt ≤5000',
          'Same 8 sizes (default 16:9)',
          'Resolution 1K/2K, promptExtend, negative prompt, seed'
        ]
      ],
      note: 'Image-to-image accepts <strong>1 to 3</strong> images (jpeg/png/webp/bmp/gif/tiff, each ≤10MB). <code>promptExtend</code> is on by default and noticeably improves short prompts. Pricing is matched by <strong>resolution</strong> (1K / 2K); the <strong>Pro</strong> tier is a higher-quality, higher-cost variant.'
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Qwen Generations Compared: v1 · v2 · v2.1 · v3 · v3 Pro',
      ariaLabel: 'Qwen v3 compared across all model generations',
      headers: ['Dimension', 'v1 Classic', 'v2', 'v2.1', 'v3', 'v3 Pro'],
      rows: [
        ['<strong>Prompt rewriting</strong>', '—', '—', 'enhancePrompt', '<strong>promptExtend</strong>', '<strong>promptExtend</strong>'],
        ['<strong>Negative prompt</strong>', 'Yes (≤500)', '—', '—', '<strong>Yes (≤5000)</strong>', '<strong>Yes (≤5000)</strong>'],
        ['<strong>Reference images</strong>', '1 (I2I / edit)', '1 (edit)', 'up to 10 + mask', 'up to 3', 'up to 3'],
        ['<strong>Sizes / aspects</strong>', '6 presets', '5 / 8 (edit)', '9 (+auto)', '<strong>8 (default 16:9)</strong>', '<strong>8 (default 16:9)</strong>'],
        ['<strong>Resolution / billing</strong>', 'Per image', 'Per image', '1K / 2K', '1K / 2K', '<strong>1K / 2K premium</strong>'],
        ['<strong>Transparent bg</strong>', 'No', 'No', '<strong>Yes</strong>', 'No', 'No'],
        ['<strong>Output formats</strong>', 'PNG / JPEG', 'PNG / JPEG', 'PNG / WebP / JPEG', 'PNG / JPEG', 'PNG / JPEG']
      ],
      note: 'v3 / v3 Pro are the only tiers pairing <strong>smart prompt rewriting with a 5000-char negative prompt</strong>; go back to v2.1 for transparent backgrounds or masked multi-image edits, and v3 Pro when you want the premium quality tier.'
    },
    { type: 'faq', id: 'faq-heading', title: '❓ FAQ (Qwen v3 / v3 Pro)' },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Qwen v3 — Four Workflows',
      lead: 'Choose the mode that matches your task:',
      items: [
        { name: 'Qwen v3 Text to Image', title: 'v3 Text to Image', description: 'Prompt-driven with promptExtend + negative prompt, 8 sizes, 1K/2K.', path: '/home/qwen/v3-text-to-image', icon: 'fas fa-star' },
        { name: 'Qwen v3 Image to Image', title: 'v3 Image to Image', description: 'Edit up to 3 images with a prompt, smart rewriting on.', path: '/home/qwen/v3-image-to-image', icon: 'fas fa-layer-group' },
        { name: 'Qwen v3 Pro Text to Image', title: 'v3 Pro Text', description: 'Premium text-to-image tier—same controls, higher fidelity.', path: '/home/qwen/v3-pro-text-to-image', icon: 'fas fa-crown' },
        { name: 'Qwen v3 Pro Image to Image', title: 'v3 Pro Image', description: 'Premium image-to-image tier for up to 3 references.', path: '/home/qwen/v3-pro-image-to-image', icon: 'fas fa-gem' }
      ]
    }
  ],

  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for Qwen v3 / v3 Pro costs per resolution.'
    },
    {
      html: '🧩 Need transparent backgrounds or a local-edit mask with up to 10 references? <a href="/home/qwen/v21-text-to-image" class="seo-inline-link">Qwen v2.1 Text to Image</a> and <a href="/home/qwen/v21-image-to-image" class="seo-inline-link">Image to Image</a> cover those while still billing by 1K/2K resolution.'
    },
    {
      html: '⚡ Want the lightest, fastest lane with short prompts? <a href="/home/qwen/v2-text-to-image" class="seo-inline-link">Qwen v2</a> remains the streamlined option.'
    },
    {
      html: '👑 On a standard v3 page? Step up to the premium tier — <a href="/home/qwen/v3-pro-text-to-image" class="seo-inline-link">Qwen v3 Pro Text to Image</a> and <a href="/home/qwen/v3-pro-image-to-image" class="seo-inline-link">Qwen v3 Pro Image to Image</a> keep every v3 control but deliver higher-fidelity output at the same 1K/2K resolution billing.'
    }
  ],

  watchPathIncludes: '/home/qwen/v3-'
}
