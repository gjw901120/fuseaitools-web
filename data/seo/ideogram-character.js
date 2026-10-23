/**
 * IdeogramCharacter SEO 内容数据
 * 渲染器：components/tools/ToolSeoContent.vue（薄壳：IdeogramCharacterSeoContent.vue）
 */
export default {
  component: 'IdeogramCharacterSeoContent',
  rootId: 'ideogram-character-section',
  rootClass: 'ideogram-seo',
  meta: {
    name: 'Ideogram Character on FuseAITools',
    category: 'MultimediaApplication',
    description: 'Ideogram Character, Character Edit, and Character Remix on FuseAITools—reference-driven identity with REALISTIC/FICTION styles and multi-image output.'
  },
  badge: '👤 Ideogram Character · Identity Lock · Three Workflows',
  introByPath: {
    '/home/ideogram/character': {
      title: '👤 Ideogram Character',
      lead: 'Upload <strong>character reference image(s)</strong> + <strong>prompt</strong> (≤5000). Place the same identity in a new scene—speed, AUTO/REALISTIC/FICTION style, MagicPrompt, image size, 1–4 outputs, negative prompt.'
    },
    '/home/ideogram/character-edit': {
      title: '✏️ Ideogram Character Edit',
      lead: '<strong>Image + mask + character reference</strong> + prompt. Edit clothing, pose, or local details while preserving identity—1–4 outputs, speed, and seed.'
    },
    '/home/ideogram/character-remix': {
      title: '🔀 Ideogram Character Remix',
      lead: 'Remix a character image with <strong>reference + prompt</strong>. Adjust <strong>strength</strong>, style, size, 1–4 outputs, and negative prompt.'
    }
  },
  definitionByPath: {
    '/home/ideogram/character': {
      title: 'What is Ideogram Character?',
      body: '<strong>Ideogram Character</strong> (<code>ideogram-character</code>) generates scenes from <strong>reference_image_urls</strong> + prompt. Identity-locked character pipeline—distinct from V3 text-to-image.'
    },
    '/home/ideogram/character-edit': {
      title: 'What is Ideogram Character Edit?',
      body: '<strong>Ideogram Character Edit</strong> (<code>ideogram-character-edit</code>)—image, mask, reference, and prompt. Masked edits that keep character identity.'
    },
    '/home/ideogram/character-remix': {
      title: 'What is Ideogram Character Remix?',
      body: '<strong>Ideogram Character Remix</strong> (<code>ideogram-character-remix</code>)—source image + reference + prompt with remix strength for nuanced character variations.'
    }
  },
  faqByPath: {
    '/home/ideogram/character': [
      {
        question: 'How many reference images does Character need?',
        answer: 'The form accepts <strong>one character reference</strong> image (JPG/PNG/WebP, max 10MB).'
      },
      {
        question: 'Which styles does Character support?',
        answer: '<strong>AUTO</strong>, <strong>REALISTIC</strong>, and <strong>FICTION</strong>—not the V3 GENERAL/DESIGN presets.'
      }
    ],
    '/home/ideogram/character-edit': [
      {
        question: 'What is required for Character Edit?',
        answer: 'Source <strong>image</strong>, matching <strong>mask</strong>, <strong>character reference</strong>, and <strong>prompt</strong>.'
      },
      {
        question: 'Does Character Edit support multiple outputs?',
        answer: 'Yes—generate <strong>1–4</strong> images per run.'
      }
    ],
    '/home/ideogram/character-remix': [
      {
        question: 'How is Character Remix different from Character?',
        answer: 'Remix adds a <strong>source image</strong> plus <strong>strength</strong> control—blend the base shot with prompt-driven change.'
      },
      {
        question: 'Can I use negative prompts on Character Remix?',
        answer: 'Yes—optional <strong>negative_prompt</strong> (max 5000 chars).'
      }
    ]
  },
  commonFaq: [
    {
      question: 'Is Character the same as Ideogram V3?',
      answer: 'No—Character is <strong>reference-driven</strong> for identity. V3 is for general T2I, edit, remix, and reframe.'
    },
    {
      question: 'How is Ideogram Character priced on FuseAITools?',
      answer: 'RULE credits by <strong>rendering_speed</strong>. See <a href="/pricing" class="seo-pricing-link">pricing</a>. New users get <strong>20 free credits</strong> on sign-up.'
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
      title: '👤 Ideogram Character on FuseAITools',
      html: '<strong>Ideogram Character</strong> is a separate product line on <a href="/" class="seo-inline-link">FuseAITools</a>—not general V3 T2I. Upload <strong>character reference image(s)</strong> and place the same identity into new scenes, outfits, or poses. Use <strong>AUTO / REALISTIC / FICTION</strong> styles and TURBO/BALANCED/QUALITY speed tiers. For posters or reframes without identity lock, use <a href="/home/ideogram/v3-text-to-image" class="seo-inline-link">Ideogram V3</a>. New users receive <strong>20 free credits</strong> on sign-up.'
    },
    {
      type: 'features',
      id: 'features-heading',
      title: '✨ Character Core Features',
      items: [
        {
          icon: '👤',
          title: 'Identity Lock',
          description: 'Keep the <strong>same character</strong> across scenes with reference images.'
        },
        {
          icon: '🎭',
          title: 'REALISTIC / FICTION',
          description: 'Character-specific style presets—not V3 GENERAL/DESIGN.'
        },
        {
          icon: '✏️',
          title: 'Edit & Remix',
          description: 'Masked local edits or <strong>strength</strong>-controlled remix on top of Character.'
        },
        {
          icon: '☁️',
          title: 'Cloud on FuseAITools',
          description: 'Three Character modes—speed-tier credits on Generate.'
        }
      ]
    },
    {
      type: 'badges',
      id: 'scenarios-heading',
      title: '🎯 Built for These Scenarios',
      items: ['Brand mascots', 'Game characters', 'Serial avatars', 'Identity-locked campaigns']
    },
    {
      type: 'table',
      id: 'compare-heading',
      title: '📊 Character vs Character Edit vs Character Remix',
      ariaLabel: 'Ideogram Character workflows',
      headers: ['Dimension', 'Character', 'Character Edit', 'Character Remix'],
      rows: [
        [
          '<strong>Input</strong>',
          'Reference + prompt',
          'Image + mask + reference + prompt',
          'Image + reference + prompt'
        ],
        [
          '<strong>modelKey</strong>',
          '<code>ideogram-character</code>',
          '<code>ideogram-character-edit</code>',
          '<code>ideogram-character-remix</code>'
        ],
        ['<strong>Mask</strong>', 'No', '<strong>Required</strong>', 'No'],
        ['<strong>Strength</strong>', '—', '—', '<strong>0.01–1</strong>'],
        [
          '<strong>Best for</strong>',
          'New scenes, same face',
          'Clothing, pose, local edits',
          'Styled variations'
        ]
      ]
    },
    {
      type: 'faq',
      id: 'faq-heading',
      title: '❓ FAQ (Ideogram Character)'
    },
    {
      type: 'table',
      id: 'tech-heading',
      title: '⚙️ Character Technical Specs',
      ariaLabel: 'Ideogram Character capabilities',
      headers: ['Workflow', 'Required', 'Key controls'],
      rows: [
        [
          '<strong>Character</strong>',
          'Reference image + prompt',
          'Speed; AUTO/REALISTIC/FICTION; MagicPrompt; size; 1–4 images; negative prompt'
        ],
        [
          '<strong>Character Edit</strong>',
          'Image + mask + reference + prompt',
          'Speed; style; MagicPrompt; 1–4 images; seed'
        ],
        [
          '<strong>Character Remix</strong>',
          'Image + reference + prompt',
          'Strength; style; size; 1–4 images; negative prompt'
        ]
      ],
      note: 'Reference uploads: JPG, PNG, WebP (max 10MB). RULE pricing by rendering speed.'
    },
    {
      type: 'workflows',
      id: 'workflows-heading',
      title: 'Ideogram Character — Three Workflows',
      items: [
        {
          name: 'Ideogram Character',
          title: 'Character',
          description: 'Reference + prompt—new scenes, same identity.',
          path: '/home/ideogram/character',
          icon: 'fas fa-user'
        },
        {
          name: 'Ideogram Character Edit',
          title: 'Character Edit',
          description: 'Mask edit with character reference.',
          path: '/home/ideogram/character-edit',
          icon: 'fas fa-user-edit'
        },
        {
          name: 'Ideogram Character Remix',
          title: 'Character Remix',
          description: 'Strength-controlled character remix.',
          path: '/home/ideogram/character-remix',
          icon: 'fas fa-users'
        }
      ]
    },
    {
      type: 'table',
      id: 'vs-v3-heading',
      title: '📊 Character vs Ideogram V3',
      ariaLabel: 'Ideogram Character vs V3',
      headers: ['Dimension', 'Character', 'V3'],
      rows: [
        [
          '<strong>Pipeline</strong>',
          '<strong>Reference-driven</strong> identity',
          '<strong>Prompt-driven</strong> general images'
        ],
        ['<strong>Workflows</strong>', 'Character, Edit, Remix', 'T2I, Edit, Remix, Reframe'],
        [
          '<strong>Typical use</strong>',
          'Mascots, serial avatars, game chars',
          'Posters, inpainting, social reframes'
        ],
        [
          '<strong>Pairing</strong>',
          {
            html: 'Character for the hero + V3 for backgrounds and props',
            colspan: 2
          }
        ]
      ],
      lead: 'Use <strong>Character</strong> when identity must stay consistent; use <strong>V3</strong> for general text, edit, remix, and reframe without a character anchor.'
    }
  ],
  tips: [
    {
      pricing: true,
      html: '💳 New users get <strong>20 free credits</strong> on sign-up. <a href="/pricing" class="seo-pricing-link">View pricing</a> for subscription discounts and credit top-ups.'
    },
    {
      pricing: false,
      html: '🎨 Need general text-to-image or reframe without a character lock? <a href="/home/ideogram/v3-text-to-image" class="seo-inline-link">Use Ideogram V3 Text to Image →</a> for posters and layouts, or <a href="/home/ideogram/v3-reframe" class="seo-inline-link">V3 Reframe</a> for new aspect ratios.'
    }
  ]
}
