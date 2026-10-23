/**
 * QwenZImage SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：QwenZImageSeoContent.vue）
 */
export default {
  component: 'QwenZImageSeoContent',
  rootId: 'qwen-zimage-section',
  rootClass: 'qwen-seo',
  meta: {
    name: 'Qwen Z-Image on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Qwen Z-Image fast text-to-image on FuseAITools—streamlined generation with aspect ratio control (1:1, 4:3, 3:4, 16:9, 9:16), prompts up to 1000 characters.'
  },
  badge: '⚡ Qwen Z-Image · Fast T2I · Five Aspect Ratios',
  faqByPath: {
    '/home/qwen/v2-text-to-image': [
      {
        question: 'What aspect ratios does Qwen Z-Image support?',
        answer: 'Five options: <strong>1:1</strong> (square), <strong>4:3</strong> (landscape), <strong>3:4</strong> (portrait), <strong>16:9</strong> (widescreen), and <strong>9:16</strong> (vertical). Pick the one that fits your output format.'
      },
      {
        question: 'How fast is Qwen Z-Image compared to v1 Classic?',
        answer: 'Z-Image generates in <strong>3–15 seconds</strong>—significantly faster than v1 Classic with full parameters. It is optimized for rapid output with no steps or acceleration tuning needed.'
      },
      {
        question: 'Do I need a local GPU for Qwen Z-Image?',
        answer: 'No—Z-Image runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
      },
      {
        question: 'How is Qwen Z-Image priced on FuseAITools?',
        answer: 'Credits are based on the aspect ratio selected—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
      }
    ],
    '/home/qwen/v2-image-edit': [
      {
        question: 'What aspect ratios does Qwen Z-Image support?',
        answer: 'Five options: <strong>1:1</strong> (square), <strong>4:3</strong> (landscape), <strong>3:4</strong> (portrait), <strong>16:9</strong> (widescreen), and <strong>9:16</strong> (vertical). Pick the one that fits your output format.'
      },
      {
        question: 'How fast is Qwen Z-Image compared to v1 Classic?',
        answer: 'Z-Image generates in <strong>3–15 seconds</strong>—significantly faster than v1 Classic with full parameters. It is optimized for rapid output with no steps or acceleration tuning needed.'
      },
      {
        question: 'Do I need a local GPU for Qwen Z-Image?',
        answer: 'No—Z-Image runs in the cloud on FuseAITools. Use any modern browser; credits are charged per successful generation.'
      },
      {
        question: 'How is Qwen Z-Image priced on FuseAITools?',
        answer: 'Credits are based on the aspect ratio selected—the exact amount appears on the Generate button. New users get <strong>20 free credits</strong> on sign-up—see <a href="/pricing" class="seo-pricing-link">pricing</a> for plans and member discounts.'
      }
    ]
  },
  sections: [
    {
      type: 'intro',
      id: 'workflow-intro-heading',
      title: '⚡ Qwen Z-Image',
      html: 'Qwen Z-Image on <a href="/" class="seo-inline-link">FuseAITools</a> is a <strong>streamlined text-to-image</strong> workflow optimized for speed and format compliance. Write a prompt up to <strong>1000 characters</strong> and pick from <strong>5 aspect ratios</strong> (1:1, 4:3, 3:4, 16:9, 9:16). No advanced parameters—just prompt, aspect ratio, and generate. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'definition',
      id: 'definition-heading',
      title: 'What is Qwen Z-Image?',
      html: '<strong>Qwen Z-Image</strong> on FuseAITools (<code>qwen-z-image</code>) generates images from text with <strong>essential aspect ratio control</strong>—choose 1:1, 4:3, 3:4, 16:9, or 9:16. Designed for <strong>rapid ideation and format-specific assets</strong>, Z-Image strips away complex parameters (no steps, guidance, or acceleration) so you can iterate fast. Generation takes <strong>3–15 seconds</strong>.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Qwen Z-Image Core Features',
      items: [
        {
          icon: '⚡',
          title: 'Optimized for Speed',
          description: 'Generation in <strong>3–15 seconds</strong>—no advanced parameters to tune. Write a prompt, pick an aspect ratio, and generate instantly.'
        },
        {
          icon: '📐',
          title: 'Five Aspect Ratios',
          description: 'Choose from <strong>1:1, 4:3, 3:4, 16:9, and 9:16</strong>—perfect for social media, presentations, and format-specific assets.'
        },
        {
          icon: '🎯',
          title: 'Focused Simplicity',
          description: 'No steps, guidance, seed, or acceleration controls—just <strong>prompt + aspect ratio</strong>. Built for rapid ideation and quick drafts.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: ['Quick ideation & drafts', 'Social media assets', 'Format-specific mockups']
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Qwen Z-Image)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Qwen Z-Image Technical Specs',
      ariaLabel: 'Qwen Z-Image capabilities',
      headers: ['Workflow', 'Input', 'Aspect ratios', 'Generation speed'],
      rows: [
        [
          '<strong>Z-Image</strong>',
          'Prompt ≤1000 chars',
          '1:1, 4:3, 3:4, 16:9, 9:16',
          '<strong>3–15 seconds</strong>—optimized for rapid output'
        ]
      ],
      lead: 'Parameters below match the FuseAITools Qwen Z-Image form and API.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Qwen — All Workflows',
      lead: 'Z-Image is the streamlined path. Switch to v1 Classic or v2 for more controls:',
      items: [
        {
          name: 'Qwen v1 Text to Image',
          title: 'v1 Text to Image',
          description: 'Full parameter control: steps, guidance, acceleration, negative prompt.',
          path: '/home/qwen/text-to-image',
          icon: 'fas fa-font'
        },
        {
          name: 'Qwen v1 Image to Image',
          title: 'v1 Image to Image',
          description: 'Transform reference images with denoising strength control.',
          path: '/home/qwen/image-to-image',
          icon: 'fas fa-image'
        },
        {
          name: 'Qwen v1 Image Edit',
          title: 'v1 Image Edit',
          description: 'Natural-language edits with multi-output and sync mode.',
          path: '/home/qwen/image-edit',
          icon: 'fas fa-edit'
        },
        {
          name: 'Qwen Z-Image',
          title: 'Z-Image',
          description: 'Fast T2I with aspect ratio control—1:1, 4:3, 3:4, 16:9, 9:16.',
          path: '/home/qwen/z-image',
          icon: 'fas fa-square'
        },
        {
          name: 'Qwen v2 Text to Image',
          title: 'v2 Text to Image',
          description: 'Streamlined T2I with modern quality and aspect ratio options.',
          path: '/home/qwen/v2-text-to-image',
          icon: 'fas fa-wand-magic-sparkles'
        },
        {
          name: 'Qwen v2 Image Edit',
          title: 'v2 Image Edit',
          description: 'Reference-based editing with up to 21:9 support.',
          path: '/home/qwen/v2-image-edit',
          icon: 'fas fa-scissors'
        }
      ]
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Qwen Z-Image vs Qwen v2',
      ariaLabel: 'Qwen Z-Image vs Qwen v2',
      headers: ['Dimension', 'Z-Image', 'Qwen v2'],
      rows: [
        [
          'Positioning',
          'Fast T2I with aspect ratio control—3–15s generation',
          'Streamlined generation & editing with modern quality'
        ],
        [
          'Workflows',
          '<strong>One</strong>—Text to Image only',
          '<strong>Two</strong>—Text to Image + Image Edit'
        ],
        [
          'Prompt limit',
          '<strong>1000</strong> characters',
          '<strong>800</strong> characters for both workflows'
        ],
        [
          'Aspect ratios',
          '<strong>5</strong>—1:1, 4:3, 3:4, 16:9, 9:16',
          'T2I: <strong>5</strong> (1:1–16:9); Edit: <strong>8</strong> (incl. 21:9)'
        ],
        [
          'Image input',
          'Not supported—prompt only',
          'v2 Image Edit supports <strong>1 image</strong> + prompt'
        ],
        ['Controls', 'Minimal—prompt + aspect ratio only', 'Seed, output format (PNG/JPEG)'],
        ['Best for', 'Rapid ideation & format-specific assets', 'Modern quality with reference editing']
      ]
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for Qwen Z-Image per-generation costs.'
    },
    {
      pricing: false,
      html: '✨ Need reference-based image editing or more aspect ratios? <a href="/home/qwen/v2-text-to-image" class="seo-inline-link" >Upgrade to Qwen v2 Text to Image →</a> for streamlined T2I with modern quality, or <a href="/home/qwen/v2-image-edit" class="seo-inline-link" >Qwen v2 Image Edit</a> for 21:9 ultra-wide and reference-based editing.'
    }
  ]
}
