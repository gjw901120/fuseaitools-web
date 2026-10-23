/**
 * QwenV21 SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：QwenV21SeoContent.vue）
 */
export default {
  component: 'QwenV21SeoContent',
  rootId: 'qwen-v21-section',
  rootClass: 'qwen-seo',
  meta: {
    name: 'Qwen v2.1 on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Qwen v2.1 text-to-image and image-to-image on FuseAITools—5000-char prompts, 9 aspect ratios, 1K/2K resolution, transparent backgrounds, multi-image references and local-edit masks. Billed by resolution with credits.'
  },
  badge: '✨ Qwen v2.1 · 1K/2K · Text & Image to Image',
  introByPath: {
    '/home/qwen/v21-text-to-image': {
      title: '📝 Qwen v2.1 Text to Image',
      lead: 'Generate from <strong>prompts up to 5000 characters</strong> across <strong>9 aspect ratios</strong>. Choose <strong>1K or 2K</strong> resolution, an <strong>opaque or transparent</strong> background, and <strong>PNG / WebP / JPEG</strong> output. Toggle <strong>enhancePrompt</strong> and set an optional seed.'
    },
    '/home/qwen/v21-image-to-image': {
      title: '🖼️ Qwen v2.1 Image to Image',
      lead: 'Upload <strong>1 to 10 reference images</strong> (order is what your prompt refers to) plus a 5000-char prompt. Add an optional black/white <strong>mask</strong> for local edits—white repaints, black keeps. Resolution <strong>1K / 2K</strong> drives the price.'
    }
  },
  definitionByPath: {
    '/home/qwen/v21-text-to-image': {
      title: 'What is Qwen v2.1 Text to Image?',
      body: '<strong>Qwen v2.1 Text to Image</strong> on FuseAITools (<code>qwen2-1-text-to-image</code>) turns a prompt (≤5000) into an image with 9 aspect ratios, 1K/2K resolution, real transparent backgrounds, and PNG/WebP/JPEG output. Billed by resolution.'
    },
    '/home/qwen/v21-image-to-image': {
      title: 'What is Qwen v2.1 Image to Image?',
      body: '<strong>Qwen v2.1 Image to Image</strong> on FuseAITools (<code>qwen2-1-image-to-image</code>) edits or remixes up to <strong>10 reference images</strong> with a prompt, and supports an optional <strong>mask</strong> for local repaints. Resolution 1K/2K is the billing dimension.'
    }
  },
  faqByPath: {
    '/home/qwen/v21-text-to-image': [
      {
        question: 'How many aspect ratios does Qwen v2.1 text-to-image support?',
        answer: 'Nine: <strong>1:1, 4:3, 3:4, 3:2, 2:3, 16:9, 9:16, 21:9 and 9:21</strong>. The default is 1:1.'
      },
      {
        question: 'Can Qwen v2.1 produce a transparent background?',
        answer: 'Yes—choose <strong>transparent</strong> for a real alpha channel. It cannot be combined with JPEG output; use PNG or WebP.'
      }
    ],
    '/home/qwen/v21-image-to-image': [
      {
        question: 'How many images can I upload for Qwen v2.1 image-to-image?',
        answer: 'Between <strong>1 and 10</strong> http(s) image URLs (each ≤30MB, ≤25MP). Their order matches the "first/second image" wording in your prompt.'
      },
      {
        question: 'How does the local-edit mask work?',
        answer: 'Upload a black/white <strong>mask</strong> with <strong>exactly one</strong> image—white areas are repainted, black areas are preserved. In mask mode the aspect ratio and enhance options are ignored.'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Do I need a local GPU for Qwen v2.1?',
      answer: 'No—Qwen v2.1 runs in the cloud on FuseAITools. Credits are charged per successful generation.'
    },
    {
      question: 'How is Qwen v2.1 priced on FuseAITools?',
      answer: 'Pricing is matched by <strong>resolution</strong> (1K or 2K)—the exact credits appear on the Generate button. New users get <strong>20 free credits</strong>—see <a href="/pricing" class="seo-pricing-link">pricing</a>.'
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
      title: '✨ Qwen v2.1 on FuseAITools',
      html: 'Qwen v2.1 on <a href="/" class="seo-inline-link">FuseAITools</a> is a <strong>resolution-billed image model</strong> with long <strong>5000-character prompts</strong>, <strong>9 aspect ratios</strong>, real <strong>transparent backgrounds</strong> and <strong>PNG / WebP / JPEG</strong> output. Generate from text, or drive edits with up to <strong>10 reference images</strong> and an optional black/white <strong>local-edit mask</strong>. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Qwen v2.1 Core Features',
      items: [
        {
          icon: '📝',
          title: '5000-Char Prompts',
          description: 'Long, descriptive prompts—far beyond the 800-char limit of v2.'
        },
        {
          icon: '🎚️',
          title: '1K / 2K Resolution',
          description: 'Pick the output tier; <strong>resolution is the billing dimension</strong> (no 4K).'
        },
        {
          icon: '🧩',
          title: 'Transparent Background',
          description: 'A real alpha channel for compositing—pair with PNG or WebP.'
        },
        {
          icon: '🖼️',
          title: 'Up to 10 References',
          description: 'Feed 1–10 images in order to guide remixes and edits.'
        },
        {
          icon: '⬛',
          title: 'Local-Edit Mask',
          description: 'White/BLACK mask repaints only the areas you mark, keeping the rest intact.'
        },
        {
          icon: '🎞️',
          title: 'PNG / WebP / JPEG',
          description: 'Three output formats; PNG and WebP carry alpha.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: [
        'Logo & sticker cutouts',
        'Multi-reference remixing',
        'Local inpainting edits',
        'Widescreen 21:9 art',
        'Product visual variants'
      ]
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Qwen v2.1 Technical Specs',
      ariaLabel: 'Qwen v2.1 workflow capabilities',
      headers: ['Workflow', 'Input', 'Aspect ratios', 'Key controls'],
      rows: [
        [
          '<strong>v2.1 Text to Image</strong>',
          'Prompt ≤5000 chars',
          '1:1, 4:3, 3:4, 3:2, 2:3, 16:9, 9:16, 21:9, 9:21',
          'Resolution 1K/2K, background, output format, enhance, seed'
        ],
        [
          '<strong>v2.1 Image to Image</strong>',
          '1–10 image URLs + prompt ≤5000, optional mask',
          'auto + the 9 above (ignored in local-edit)',
          'Resolution 1K/2K, mask, background, output format, seed'
        ]
      ],
      lead: 'Parameters match the FuseAITools Qwen v2.1 form and API (<code>qwen2-1-*</code> models).',
      note: 'Images: single ≤30MB and ≤25MP, direct http(s) URLs. <code>transparent</code> background cannot be combined with JPEG output, and a mask requires exactly one image. Pricing is matched by <strong>resolution</strong> (1K / 2K)—4K is not supported.'
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Qwen Generations Compared: v1 · v2 · v2.1 · v3 · v3 Pro',
      ariaLabel: 'Qwen v2.1 compared across all model generations',
      headers: ['Dimension', 'v1 Classic', 'v2', 'v2.1', 'v3', 'v3 Pro'],
      rows: [
        ['<strong>Prompt limit</strong>', '5000', '800', '<strong>5000</strong>', '5000', '5000'],
        ['<strong>Aspect / sizes</strong>', '6 presets', '5 / 8 (edit)', '<strong>9 (+auto)</strong>', '8', '8'],
        [
          '<strong>Resolution / billing</strong>',
          'Per image',
          'Per image',
          '<strong>1K / 2K</strong>',
          '1K / 2K',
          '1K / 2K premium'
        ],
        [
          '<strong>Reference images</strong>',
          '1 (I2I / edit)',
          '1 (edit)',
          '<strong>up to 10 + mask</strong>',
          'up to 3',
          'up to 3'
        ],
        ['<strong>Transparent bg</strong>', 'No', 'No', '<strong>Yes</strong>', 'No', 'No'],
        [
          '<strong>Signature controls</strong>',
          'Steps / guidance / acceleration',
          'Minimal controls',
          '<strong>enhancePrompt + format</strong>',
          'promptExtend + negative',
          'promptExtend + negative, premium'
        ],
        [
          '<strong>Output formats</strong>',
          'PNG / JPEG',
          'PNG / JPEG',
          '<strong>PNG / WebP / JPEG</strong>',
          'PNG / JPEG',
          'PNG / JPEG'
        ]
      ],
      note: 'v2.1 is the only tier combining <strong>long prompts, transparent backgrounds, multi-image references and masked local edits</strong>; pick v3 / v3 Pro when smart rewriting and negative prompts matter more.'
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Qwen v2.1)'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Qwen v2.1 — Two Workflows',
      lead: 'Choose the mode that matches your task:',
      items: [
        {
          name: 'Qwen v2.1 Text to Image',
          title: 'v2.1 Text to Image',
          description: 'Prompt-driven creation—5000 chars, 9 aspect ratios, 1K/2K, transparent background, PNG/WebP/JPEG.',
          path: '/home/qwen/v21-text-to-image',
          icon: 'fas fa-font'
        },
        {
          name: 'Qwen v2.1 Image to Image',
          title: 'v2.1 Image to Image',
          description: 'Drive edits with 1–10 reference images plus an optional local-edit mask.',
          path: '/home/qwen/v21-image-to-image',
          icon: 'fas fa-photo-film'
        }
      ]
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for Qwen v2.1 costs per resolution.'
    },
    {
      pricing: false,
      html: '🌟 Want smart prompt rewriting and a dedicated negative prompt? <a href="/home/qwen/v3-text-to-image" class="seo-inline-link">Qwen v3 Text to Image</a> and <a href="/home/qwen/v3-image-to-image" class="seo-inline-link">Image to Image</a> add promptExtend + negative prompt, or step up to the <a href="/home/qwen/v3-pro-text-to-image" class="seo-inline-link">v3 Pro</a> tier.'
    },
    {
      pricing: false,
      html: '🖼️ Comparing earlier generations? <a href="/home/qwen/v2-text-to-image" class="seo-inline-link">Qwen v2</a> stays the lightest fast lane with short 800-char prompts.'
    },
    {
      pricing: false,
      html: '👑 Want the top of the Qwen lineup? Upgrade to <a href="/home/qwen/v3-pro-text-to-image" class="seo-inline-link">Qwen v3 Pro Text to Image</a> or <a href="/home/qwen/v3-pro-image-to-image" class="seo-inline-link">v3 Pro Image to Image</a> —the premium tier adds smart prompt rewriting and a negative prompt at the same 1K/2K resolution billing.'
    }
  ],
  watchPathIncludes: '/home/qwen/v21-'
}
