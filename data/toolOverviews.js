/**
 * 14 个工具二级路由的静态详情页配置：模型介绍 + 三级子功能与跳转链接
 * 用于 /home/{tool} 概览页，每个功能卡片链接到 /home/{tool}/{child}
 */
export const toolOverviews = {
  gpt: {
    title: 'GPT',
    category: 'Chat',
    showCategory: false,
    introFullWidth: true,
    intro: 'The OpenAI GPT series represents the most advanced conversational AI available today, combining code generation, creative writing, mathematical reasoning, and complex problem-solving in one platform. Newer models keep responses fast while using extended "thinking" for hard tasks, significantly reducing hallucinations and following instructions more reliably. Use the latest GPT on FuseAITools for dialogue, code generation, and analysis—all without switching tools.',
    features: [
      { name: 'Chat & Generate', path: '/home/gpt/generate', description: 'Multi-turn dialogue, content creation, code generation, and step-by-step reasoning—with optional extended thinking for complex tasks.' }
    ],
    sections: [
      {
        title: 'Core technical strengths',
        content: `Multimodal intelligence: Deep language understanding and generation with coherent, natural replies; code intelligence across 30+ languages with debugging, refactoring, and optimization; step-by-step math reasoning from basics to advanced; and structured breakdown of complex problems with clear solutions.

New architecture: A fast core for everyday use; extended thinking for deep reasoning on complex tasks; strong hallucination reduction for fewer factual errors; and accurate follow-through on multi-step instructions.`
      },
      {
        title: 'Core capabilities',
        content: `Smart dialogue and content: Multi-turn context (e.g. 128K tokens), personalized interaction, multilingual support (e.g. English and Chinese), and emotionally aware replies. Content creation covers creative writing (fiction, poetry, scripts, copy), professional documents (reports, proposals, technical docs), social content (posts, scripts), and translation and localization.

Code generation and dev support: 30+ languages (Python, JavaScript, Java, C++, Go, Rust, etc.), code generation from descriptions, review for bugs and security, refactoring and optimization, and debugging help. Use cases include API integration, algorithm implementation, test generation, and documentation from code.

Complex problem-solving: Step-by-step math and logic with multiple solution approaches and plain-language explanations; data analysis and insights, decision support, option comparison, and trend prediction.

Extended reasoning: Task decomposition and execution plans, multi-angle analysis, hypothesis testing, and long-document summarization and analysis.`
      },
      {
        title: 'Application scenarios',
        content: `Enterprise: Customer service and FAQ automation, content marketing and personalization, internal knowledge Q&A, and business intelligence reporting.

Education and research: Personalized tutoring and Q&A, literature review and thesis support, programming teaching with examples and error explanation, and academic writing structure and refinement.

Creative and content: Script and dialogue writing, game NPC and narrative design, ad copy and slogans, and editing and proofreading.

Technical development: Rapid prototyping and concept code, API and user documentation, code migration across languages or frameworks, and DevOps scripts and config generation.`
      },
      {
        title: 'Platform integration on FuseAITools',
        content: `Seamless access without complex API setup; cost-aware token usage; real-time performance and quality visibility; and enterprise-grade security and privacy.

Workflow: Batch handling of multiple requests, saved prompt templates, flexible model and parameter choice, and shared history and best practices for teams.`
      },
      {
        title: 'Technical specs',
        content: `Context: Standard 128K tokens with support for long documents. Response: Millisecond- to second-level latency with optional streaming. Accuracy: Leading factual accuracy. Multimodal: Image understanding when used with vision-capable models.

Models: GPT-5 series for general use; specialized variants for code, math, etc.; and support for custom or fine-tuned models in enterprise settings.`
      },
      {
        title: 'Reliability and safety',
        content: `Content filtering and safety mechanisms; fact-checking and reduced hallucinations; originality and copyright awareness; and encrypted, secure storage of conversation data.`
      },
      {
        title: 'Best practices',
        content: `Give clear, specific instructions and constraints; break complex tasks into steps; provide context and examples; and iterate on initial outputs. Advanced patterns: chain-of-thought prompting, few-shot examples, self-correction, and role or domain specification.`
      },
      {
        title: 'Try GPT on FuseAITools',
        content: `Use the latest GPT for chat, code, and analysis in one place. Whether you are a developer, creator, educator, or business user, the GPT series delivers a powerful, reliable assistant to boost productivity and creativity. Start a conversation and explore what’s possible.`
      }
    ]
  },
  deepseek: {
    title: 'DeepSeek',
    category: 'Chat',
    showCategory: false,
    introFullWidth: true,
    intro: 'DeepSeek delivers strong code intelligence and long-context reasoning: trained on massive code and text, it excels at multi-language programming (80+ languages), debugging, and mathematical reasoning. Open and commercially friendly, it rivals top closed-source models on coding benchmarks. Use DeepSeek on FuseAITools for development support, deep analysis, and creative writing with long-context applications.',
    features: [
      { name: 'Chat & Generate', path: '/home/deepseek/generate', description: 'Code generation, refactoring, debugging, explanation, and Q&A with 128K context and strong reasoning.' }
    ],
    sections: [
      {
        title: 'Technical architecture',
        content: `Multilingual code intelligence: 80+ languages (Python, JavaScript, Java, C++, Go, Rust, etc.); cross-language paradigms and best practices; style and project-convention adaptation; framework and library awareness.

Long-context reasoning: 128K-token context; complex multi-step problem decomposition; consistent technical context across long conversations; multi-file and multi-document analysis.`
      },
      {
        title: 'Core capabilities',
        content: `Code generation: Implement features from natural language; API calls, data models, interfaces; algorithms (multiple implementations and optimizations); tests and unit tests.

Optimization and refactor: Performance analysis and optimization; refactor steps and best practices; design patterns and implementation; review and improvement suggestions.

Debugging and problem-solving: Error analysis and fixes; logic bugs and fixes; performance diagnosis and optimization; cross-platform and version compatibility.

Explanation and teaching: Plain-language concept explanations; code walkthroughs; best practices; learning paths and skill-up suggestions.`
      },
      {
        title: 'Use cases',
        content: `Software development: Prototypes, enterprise apps, open-source work, tech-stack migration. Data science: Data cleaning, analysis, visualization; ML training, evaluation, deployment; distributed and big-data; scientific and numerical computing. Education: Course materials and examples, personalized learning and exercises, homework help, skill assessment. Support and maintenance: API and technical docs, troubleshooting, performance tuning, security audit.`
      },
      {
        title: 'Technical highlights',
        content: `Code understanding: Syntax and semantics, design intent, dependencies, business logic. Generation: Context-aware from history; best-practice adherence; error handling and edge cases; comments and docs. Reasoning: Problem decomposition, solution comparison, optimization (performance, readability, maintainability), risk assessment. Learning: Project style, domain adaptation, tech trends, personalized responses.`
      },
      {
        title: 'Professional workflow',
        content: `Development: Describe requirements; discuss architecture and tech choices; generate core code; tests and QA; performance tuning; docs; deployment scripts. Debugging: Describe issue; analyze environment and config; review code; design tests; propose solutions; suggest prevention. Learning: Assess skills and gaps; plan learning; recommend projects; track progress.`
      },
      {
        title: 'Advanced tips',
        content: `Prompt structure: [Problem] + [Constraints] + [Expected output] + [Context] + [Special requirements]. Code prompts: Specify language and version; framework and libs; performance goals; test framework and coverage. Long context: Provide multiple files; use full history; attach docs and specs; develop in steps. Quality: Ask for review and optimization; full test coverage; security check; performance baseline and optimization.`
      },
      {
        title: 'Quality assurance',
        content: `Auto: Correctness (syntax, logic); best-practice compliance; performance snapshot; common security checks. Human: Architecture, business logic, maintainability, extensibility.`
      },
      {
        title: 'Try DeepSeek on FuseAITools',
        content: `DeepSeek on FuseAITools brings pro-grade code intelligence to real-world development. Whether you’re a developer, team lead, educator, or hobbyist, DeepSeek delivers strong support in one place. Make development faster, smarter, and more enjoyable.`
      }
    ]
  },
  claude: {
    title: 'Claude',
    category: 'Chat',
    showCategory: false,
    introFullWidth: true,
    intro: 'Anthropic\'s Claude is built for nuanced conversation, long documents, and helpful, accurate outputs. Strong on coding, analysis, and multilingual dialogue, with vision to read PDFs, charts, and diagrams. Newer versions add extended thinking, tool use, and fewer unnecessary refusals. Use Claude on FuseAITools for in-depth discussion, document understanding, and creative or technical writing.',
    features: [
      { name: 'Chat & Generate', path: '/home/claude/generate', description: 'Nuanced dialogue, 200K context, document and image analysis, extended thinking, and tool use in one flow.' }
    ],
    sections: [
      {
        title: 'Design philosophy',
        content: `Responsible AI: Constitutional AI and safety-first design; transparent reasoning and explainable responses.

Human-centered: Natural, human-like conversation; empathy and context; assistive, not replacement; honest about what it knows and doesn’t.`
      },
      {
        title: 'Core capabilities',
        content: `Dialogue: 200K-token context; emotion-aware responses; cultural sensitivity; style adaptation (formal, casual, professional).

Document analysis: PDF, Word, Excel, PPT, images, web; structured extraction; cross-document linking; summaries and key points.

Vision: Charts, flowcharts, architecture diagrams; image description; document OCR; spatial and layout understanding.

Extended thinking: Layered analysis; multiple perspectives; hypothesis testing; systems-level reasoning.`
      },
      {
        title: 'Use cases',
        content: `Academic and research: Literature review, paper structure and polish, data analysis, peer-style critique. Enterprise: Contract analysis, report generation, meeting notes and action items, knowledge management. Content and media: Creative writing (fiction, scripts, poetry), technical docs (API, manuals), content strategy, editing and proofing. Education and consulting: Tutoring, case analysis, career advice, decision support.`
      },
      {
        title: 'Technical highlights',
        content: `Long documents: Up to 100MB, multiple formats; smart chunking and context; key-point extraction; document Q&A. Multi-document: Relevance, contradiction detection, trend across time, synthesis and reports. Vision: Chart data and insights, image description, layout and structure, text + image fusion. Tools: Calculator, code execution, web search, file create/edit/manage.`
      },
      {
        title: 'Professional workflow',
        content: `Research: Upload docs; define questions; skim and extract; deep read; synthesize; conclusions; report. Business analysis: Gather docs; current-state analysis; trends; opportunity and risk; recommendations; presentation. Creative: Ideate; gather references; co-create and iterate; edit; final review.`
      },
      {
        title: 'Advanced tips',
        content: `Prompt: [Context] + [Question] + [Expected output] + [Constraints] + [Special requirements]. Dialogue: Stepwise for complex questions; multi-angle questions; challenge assumptions; follow-up for depth. Documents: Preprocess guidance; highlight key sections; effective questions; ask for citations. Extended thinking: Systems view; long-term impact; stakeholder perspectives; ethics.`
      },
      {
        title: 'Quality assurance',
        content: `Auto: Relevance, factual check, completeness, safety. Human: Logic, accuracy, depth and insight, practicality.`
      },
      {
        title: 'Try Claude on FuseAITools',
        content: `Claude on FuseAITools delivers deep thinking and nuanced conversation—strong analysis with a human-centered experience. Whether you need research, document analysis, or an insightful dialogue partner, Claude is here in one place. Elevate your thinking and discussion.`
      }
    ]
  },
  gemini: {
    title: 'Gemini',
    category: 'Chat',
    showCategory: false,
    introFullWidth: true,
    intro: 'Google\'s Gemini brings native multimodal understanding and agentic capabilities: text, image, audio, and video in one architecture; tool use (Search, Maps, code execution); and multi-step reasoning under user oversight. Gemini 2.0 is tuned for the agentic era—context understanding, planning ahead, and supervised actions. Use Gemini on FuseAITools for chat, coding, research, and any task that benefits from grounding and tools.',
    features: [
      { name: 'Chat & Generate', path: '/home/gemini/generate', description: 'Multimodal chat, 128K context, tool use (Search, Maps, code), and agentic planning in one flow.' }
    ],
    sections: [
      {
        title: 'Platform architecture',
        content: `Native multimodal: Unified text, image, audio, video; simultaneous multi-input understanding; cross-modal generation (one input, many output types); spatial and temporal understanding for video and motion.

Agentic: Multi-step planning for complex tasks; seamless Google and third-party tool integration; learning and adaptation from interaction; safe, human-supervised operation.`
      },
      {
        title: 'Core capabilities',
        content: `Multimodal dialogue: Text, image, audio, video in one turn; 128K-token context; dynamic style and depth; emotion-aware responses.

Tool use: Search—real-time web, fact-check, multi-language. Maps—location, local business, traffic, routes, geo analysis. Code execution—multiple languages, data and viz, API calls, compute and simulation. Planning—task decomposition, step ordering, resource use, progress tracking.`
      },
      {
        title: 'Use cases',
        content: `Research and academic: Literature search, data analysis, experiment design, paper collaboration. Development: Project and architecture planning, multi-language code and debug, API integration, deploy and ops. Business and decision: Market and trend research, competitive analysis, business planning, data-driven decision support. Education: Adaptive learning, project guidance, knowledge exploration, skill assessment and planning.`
      },
      {
        title: 'Technical highlights',
        content: `Multimodal output: Text (reports, articles, code, dialogue); image (infographics, diagrams); audio (speech, music, SFX); code (runnable snippets). Smart adaptation: Format choice, quality tuning, style consistency, interactivity. Tools: Auto tool selection, parameter tuning, error handling, result integration. Ecosystem: Google (Search, Maps, Calendar, Drive), third-party APIs, vertical tools, custom tools. Agent: Goal understanding, executable plans, risk assessment, learning from outcomes.`
      },
      {
        title: 'Professional workflow',
        content: `Research: Define question; gather with search; analyze; form hypothesis; design experiment; run and analyze; write report. Development: Multimodal requirements; tech selection; prototype; implementation; test and deploy; feedback; iterate. Business: Identify problem; collect data; analyze; propose solution; predict effect; monitor; evaluate.`
      },
      {
        title: 'Advanced tips',
        content: `Prompt: [Task] + [Input type] + [Output requirement] + [Tool constraints] + [Quality]. Multimodal: Specify format and type; guide tool use; set quality bar; design interaction. Agent: Define autonomy and supervision; feedback to improve; build trust gradually. Tools: Combine tools; tune parameters; prevent errors; verify results.`
      },
      {
        title: 'Quality assurance',
        content: `Auto: Task completion; tool efficiency; multimodal quality; safety and compliance. Human: Planning quality; tool choice; execution and effect; risk.`
      },
      {
        title: 'Roadmap',
        content: `Smarter agents; deeper multimodal fusion; broader tool ecosystem; stronger personalization. Domain agents; team agents; workflow automation; real-time interaction. Enterprise, education, healthcare, and finance solutions.`
      },
      {
        title: 'Try Gemini on FuseAITools',
        content: `Gemini on FuseAITools brings the agentic era to your workflow—multimodal understanding and intelligent execution in one place. Whether you need research, multi-tool development, or an agent that plans and acts under your oversight, Gemini delivers. Raise your work and learning to a new level.`
      }
    ]
  },
  'gpt-image': {
    title: 'GPT Image',
    category: 'Image',
    showCategory: false,
    introFullWidth: true,
    intro: 'GPT Image is OpenAI\'s image generation and editing model family. It supports both classic 1.5 workflows and new v2 generation/editing modes, with strong instruction following, text rendering, style consistency, and flexible aspect ratio and resolution controls.',
    features: [
      { name: 'Text to Image', path: '/home/gpt-image/text-to-image', description: 'Classic GPT Image 1.5 text-to-image generation with prompt-driven creation and quality controls.' },
      { name: 'Image to Image', path: '/home/gpt-image/image-to-image', description: 'Classic GPT Image 1.5 image editing with reference images and prompt-based transformations.' },
      { name: 'v2 Text to Image', path: '/home/gpt-image/v2-text-to-image', description: 'Generate with model gpt-image-2-text-to-image, supporting up to 20000 prompt characters plus aspect ratio and 1K/2K/4K resolution settings.' },
      { name: 'v2 Image to Image', path: '/home/gpt-image/v2-image-to-image', description: 'Edit with model gpt-image-2-image-to-image using reference image + prompt, with v2 aspect ratio and resolution options.' }
    ],
    sections: [
      {
        title: 'Platform Strengths & Technical Highlights',
        content: `Deep Understanding & Precise Control

Unified Multimodal Architecture: Deeply aligns vision and language to parse vague intent and translate abstract concepts (e.g., "the loneliness of cyberpunk") into precise visual output.

Professional-Grade Visual Control: Enables fine adjustments to composition (viewpoint, focal length), color (saturation, temperature), lighting (direction, intensity), and style (brushstroke, texture).

Real-Time Feedback Optimization: Iteratively refines through dialogue, with built-in aesthetic evaluation and conflict detection to ensure every modification meets user expectations.

Seamless Workflow

Zero-Switch Experience: Generate, edit, and optimize within a unified conversation interface, eliminating the need to switch between multiple traditional software windows.

In-Context Memory: Maintains style and context consistency throughout the chat history, supporting version rollback and the combinatorial optimization of key elements.`
      },
      {
        title: 'Typical Use Cases',
        content: `Concept Development: Concept art for games/film, storyboards, mood boards, brand exploration, product design.

Commercial Creation: Social media content, advertising concepts, product-in-scene composites, presentation visuals.

Design & Prototyping: High-fidelity UI/UX mockups, packaging design, interior/exterior spatial visualization.

Education & Communication: Scientific visualizations, instructional diagrams, infographics for complex reports.`
      },
      {
        title: 'Advanced Tips',
        content: `Effective Prompt Structure: [Subject] + [Setting] + [Mood] + [Technical Parameters] + [Style Reference]

Precise Instructions: Use quantifiable descriptions (e.g., "increase saturation by 30%," "warmer tones," "follow the rule of thirds") for accurate results.

Style Fusion: Blend different artistic genres, fuse traditional and digital elements, and explore cross-cultural visual evolution.

Iteration Strategy: Follow an optimization path from global to local: finalize the composition first, then refine details, and finally combine key elements.`
      },
      {
        title: 'Quality Standards & Roadmap',
        content: `Quality Assurance: Features built-in automated aesthetic evaluation, technical artifact detection (noise, artifacts), and analysis of creative and commercial fit.

Content Safety: Strictly adheres to brand alignment guidelines and cultural sensitivity principles.

Future Roadmap: Will support more detailed dynamic image generation, 2D-to-3D capabilities, and real-time collaboration features, with specialized editions planned for enterprises, educational institutions, and professional creators.`
      }
    ]
  },
  ideogram: {
    title: 'Ideogram',
    category: 'Image',
    showCategory: false,
    introFullWidth: true,
    intro: 'Ideogram on FuseAITools spans two product lines: **V3** for general text-to-image, edit, remix, and reframe; **Character** for reference-driven identity across scenes. All modes share TURBO/BALANCED/QUALITY speed tiers. New users receive **20 free credits** on sign-up.',
    features: [
      { name: 'V3 Text to Image', path: '/home/ideogram/v3-text-to-image', description: 'V3—prompt-only generation with MagicPrompt, style presets, six aspect ratios, negative prompt, and seed.' },
      { name: 'V3 Edit', path: '/home/ideogram/v3-edit', description: 'V3—mask-based inpainting: image + mask + prompt.' },
      { name: 'V3 Remix', path: '/home/ideogram/v3-remix', description: 'V3—remix with strength, style, 1–4 outputs, and negative prompt.' },
      { name: 'V3 Reframe', path: '/home/ideogram/v3-reframe', description: 'V3—reframe to square, portrait, or landscape presets without a prompt.' },
      { name: 'Character', path: '/home/ideogram/character', description: 'Character—reference image + prompt for identity-locked scenes (AUTO/REALISTIC/FICTION).' },
      { name: 'Character Edit', path: '/home/ideogram/character-edit', description: 'Character—image + mask + reference for local edits while preserving identity.' },
      { name: 'Character Remix', path: '/home/ideogram/character-remix', description: 'Character—strength-controlled remix with reference images and negative prompt.' }
    ],
    sections: [
      {
        title: 'Ideogram V3 — General Image',
        content: `Text to Image: Prompt up to 5000 chars; TURBO/BALANCED/QUALITY; styles AUTO, GENERAL, REALISTIC, DESIGN; MagicPrompt; square/portrait/landscape sizes; negative prompt and seed.

Edit: Image + matching mask + prompt for inpainting.

Remix: Source image + prompt; strength 0.01–1; 1–4 outputs; style, size, negative prompt.

Reframe: Source image only—new aspect ratio presets; optional style, speed, 1–4 outputs, seed.`
      },
      {
        title: 'Ideogram Character — Identity Lock',
        content: `Character: One or more reference images + prompt—place the same identity in new scenes; REALISTIC/FICTION styles; 1–4 outputs.

Character Edit: Image + mask + character reference + prompt for clothing, pose, or local edits.

Character Remix: Source + reference + prompt with remix strength; multi-image output and negative prompts.`
      },
      {
        title: 'Try on FuseAITools',
        content: `Use V3 for posters, inpainting, and social reframes; use Character when mascots or serial avatars must stay consistent. Credits scale by rendering_speed (RULE pricing). Pair Character heroes with V3 backgrounds, or export stills to Seedance for motion.`
      }
    ]
  },
  'gpt-4o-image': {
    title: 'GPT 4o Image',
    category: 'Image',
    showCategory: false,
    introFullWidth: true,
    intro: 'ChatGPT 4o Image, is OpenAI\'s latest AI image generation model. It understands both text and visual context, allowing developers to create and edit images with remarkable accuracy. Unlike traditional diffusion models, ChatGPT 4o Image follows instructions precisely, supports consistent styles, and renders legible text — making it ideal for applications in design, marketing, and creative automation.',
    features: [
      { name: 'Generate', path: '/home/gpt-4o-image/generate', description: 'Generate new images from text or references; edit, refine, and iterate with natural language in one flow.' }
    ],
    sections: [
      {
        title: 'Platform strengths',
        content: `Unified multimodal: Vision–language alignment for deep text–image understanding; intent parsing from vague description to precise visuals; real-time refinement from feedback.

Workflow: Zero-switch—generate, edit, and optimize in one conversation; natural-language control for pro-level edits; iterative, dialogue-based refinement; strong reference understanding for style and content.`
      },
      {
        title: 'Core capabilities',
        content: `Generation: Turn abstract ideas into concrete visuals; control style, technique, and mood; smart composition and hierarchy; rich detail from concept to micro-level.

Editing: Natural-language edits (add, remove, replace, adjust); style transfer from references; parametric tweaks (color, brightness, contrast, sharpness).

Unified: Context and style consistency across the chat; full history and rollback; text + image references; step-by-step improvement from feedback.`
      },
      {
        title: 'Use cases',
        content: `Concept: Concept art (games, film, product), mood boards, storyboards, brand exploration. Commercial: Social content, ad concepts, product-in-scene, presentation visuals. Design and prototyping: UI/UX and product mockups, packaging, spatial visualization. Education and communication: Teaching visuals, science visualization, report graphics, communication aids.`
      },
      {
        title: 'Technical highlights',
        content: `Understanding: Scene and style parsing, emotion-to-visual mapping, cultural nuance. Control: Composition (viewpoint, focal length, depth, perspective); color (hue, saturation, value, balance); lighting (direction, intensity, temperature, shadows); style (brush, texture, abstraction). Smart optimization: Auto composition and color; conflict detection; quality assessment; multiple variants per concept.`
      },
      {
        title: 'Professional workflow',
        content: `Conversation flow: Describe intent; generate first draft; give feedback in chat; iterate; refine details; confirm final; export resolution and format. Reference-driven: Upload references for style; describe changes; generate style-consistent work; extend creatively while keeping the look.`
      },
      {
        title: 'Advanced tips',
        content: `Prompt structure: [Subject] + [Setting] + [Mood] + [Tech] + [Style reference]. Be precise: “increase saturation by 30%”, “slightly warmer”, “rule of thirds”, “golden hour”; use “no text”, “avoid oversaturated”. Iterate: Optimize from overall to local; adjust from previous result; save and compare versions; refine key elements then combine. Style fusion: Mix genres, blend traditional and digital, cross-cultural elements, temporal style evolution.`
      },
      {
        title: 'Quality assurance',
        content: `Auto: Aesthetic (composition, color); intent consistency; technical (resolution, noise, artifacts); creativity. Human: Creative fulfillment, commercial fit, brand alignment, cultural sensitivity.`
      },
      {
        title: 'Roadmap',
        content: `Finer detail and control; simple motion and dynamic images; 2D-to-3D; real-time collaboration. Education, enterprise, agency, and freelancer editions.`
      },
      {
        title: 'Try GPT-4o Image on FuseAITools',
        content: `GPT-4o Image on FuseAITools redefines visual creation—complex generation and editing become a natural conversation. Whether you’re a designer, marketer, educator, or enthusiast, you get an efficient, intuitive visual workflow in one place. Turn ideas into polished visuals.`
      }
    ]
  },
  'flux-kontext': {
    title: 'Flux Kontext',
    category: 'Image',
    showCategory: false,
    introFullWidth: true,
    intro: 'Flux on FuseAITools is Black Forest Labs\' image suite: Flux Kontext (v1) for governed generate/edit with Pro/Max tiers, and Flux 2 (v2) for 1K/2K text-to-image and multi-reference image-to-image—including Flux 2 Pro for higher-fidelity finals. New users receive 20 free credits on sign-up.',
    features: [
      { name: 'Flux Kontext Generate', path: '/home/flux-kontext/generate', description: 'v1—text-to-image and single-image edit with Pro/Max, six aspect ratios, safety and prompt controls.' },
      { name: 'Flux 2 Text to Image', path: '/home/flux-kontext/flux-2-text-to-image', description: 'v2—prompt-only 1K/2K generation, eight aspect ratios plus auto.' },
      { name: 'Flux 2 Image to Image', path: '/home/flux-kontext/flux-2-image-to-image', description: 'v2—1–8 reference images + prompt, 1K/2K resolution.' },
      { name: 'Flux 2 Pro Text to Image', path: '/home/flux-kontext/flux-2-pro-text-to-image', description: 'v2 Pro—higher-fidelity T2I at 1K/2K.' },
      { name: 'Flux 2 Pro Image to Image', path: '/home/flux-kontext/flux-2-pro-image-to-image', description: 'v2 Pro—multi-reference I2I with Pro-tier detail.' }
    ],
    sections: [
      {
        title: 'Core capabilities',
        content: `Flux Kontext (v1): Unified generate tab—text-to-image or single-image edit. Models flux_kontext_pro / flux_kontext_max (ONCE credits). Aspect 21:9, 16:9, 4:3, 1:1, 3:4, 9:16; JPEG/PNG; safety tolerance 0–6; optional prompt upsampling and watermark.

Flux 2 (v2): Four workflows—flux-2-text-to-image, flux-2-image-to-image, flux-2-pro-text-to-image, flux-2-pro-image-to-image. Prompt 3–5000 chars; resolution 1K/2K (RULE pricing); aspect 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, auto. I2I accepts 1–8 images (max 10MB each).`
      },
      {
        title: 'Workflow',
        content: `v1 Kontext: write prompt → pick Pro or Max → choose generate or edit mode → set aspect ratio and output format → generate.

v2 Flux 2 T2I: prompt → aspect ratio → 1K/2K → generate.

v2 Flux 2 I2I: upload 1–8 references → prompt → ratio and resolution → generate.

v2 Pro: same steps on Pro T2I or Pro I2I tabs for higher-fidelity output.`
      },
      {
        title: 'Try Flux on FuseAITools',
        content: `Start with Flux Kontext Generate for governed text-in-image and single-image edits, or jump to Flux 2 for 2K drafts and multi-reference I2I. Upgrade to Flux 2 Pro when you need client-facing quality. Pair stills with Seedance image-to-video when you need motion. Credits appear on Generate before each run.`
      }
    ]
  },
  'nano-banana': {
    title: 'Nano Banana',
    category: 'Image',
    showCategory: false,
    introFullWidth: true,
    intro: 'Nano Banana on FuseAITools is Google\'s Gemini Flash Image suite in two generations: v1 (Text to Image, Image to Image, Pro Generate) and v2 (Nano Banana 2 with 20k prompts and optional 0–14 images). Credits shown before each run. Pair with Seedream for ByteDance image workflows. New users receive 20 free credits on sign-up.',
    features: [
      { name: 'Nano Banana v1 · Text to Image', path: '/home/nano-banana/generate', description: 'Generate from text—prompt up to 5000 chars, eleven aspect ratios including auto, PNG or JPEG output.' },
      { name: 'Nano Banana v1 · Image to Image', path: '/home/nano-banana/edit', description: 'Edit 1–10 images with natural-language prompts—style transfer, detail polish, or batch look unification.' },
      { name: 'Nano Banana v1 · Pro Generate', path: '/home/nano-banana/pro-generate', description: '1–10 reference images plus prompt—1K, 2K, or 4K resolution for production-ready assets.' },
      { name: 'Nano Banana 2 (v2)', path: '/home/nano-banana/nano-banana-2', description: 'Prompts up to 20,000 chars, optional 0–14 image inputs, fifteen aspect ratios, 1K/2K/4K, JPG or PNG output.' }
    ],
    sections: [
      {
        title: 'Core capabilities',
        content: `v1 — Text to Image (nano-banana): Required prompt (max 5000 chars). Image size 1:1, 9:16, 16:9, 3:4, 4:3, 3:2, 2:3, 5:4, 4:5, 21:9, auto. Output PNG or JPEG.

v1 — Image to Image (nano-banana-edit): Required 1–10 image URLs (JPEG/PNG/WebP, max 10MB each) + prompt (max 5000 chars). Same aspect ratios and output formats as text-to-image.

v1 — Pro Generate (nano-banana-pro): Required 1–10 image URLs + prompt (max 5000 chars). Resolution 1K, 2K, or 4K; eleven aspect ratios. Credit cost follows resolution tier.

v2 — Nano Banana 2 (nano-banana-2): Required prompt (max 20,000 chars); optional 0–14 image inputs. Resolution 1K/2K/4K; fifteen aspect ratios; JPG or PNG output.`
      },
      {
        title: 'Workflow',
        content: `v1 text to image: write a prompt → pick aspect ratio and output format → generate → download from history.

v1 image to image: upload 1–10 images → describe the edit → set ratio and format → generate.

v1 Pro: upload 1–10 reference images → write prompt → choose 1K/2K/4K and aspect ratio → generate.

v2 Nano Banana 2: write a long prompt (up to 20k chars) → optionally add 0–14 images → set resolution, ratio, and format → generate.

When to pick v1 vs v2: use v1 for fast prompt-only drafts, dedicated I2I edits, or mandatory-reference Pro 4K; use v2 for 20k-character briefs or optional multi-reference in one workflow.

ByteDance creative pipeline: create or refine stills in Seedream, then animate in Seedance (v1 Lite I2V, 1.5 Pro, or Seedance 2).

All workflows run in the browser—no local GPU required.`
      },
      {
        title: 'Try Nano Banana on FuseAITools',
        content: `Nano Banana on FuseAITools delivers fast Gemini Flash Image generation and editing—whether you need social covers, style transfers, or 4K production assets. Open any workflow above and start creating. New users receive 20 free credits on sign-up.`
      }
    ]
  },
  midjourney: {
    title: 'Midjourney',
    category: 'Image',
    showCategory: false,
    introFullWidth: true,
    intro: 'Midjourney is a leading AI image tool for art and photorealistic imagery. Describe your idea in natural language, then use Upscale for higher resolution and Vary to explore alternatives. Used by artists, designers, and marketers for concept art, mood boards, and striking visuals. Use Midjourney on FuseAITools for a single, streamlined creative workflow.',
    features: [
      { name: 'Imagine', path: '/home/midjourney/imagine', description: 'Text-to-image with 200+ styles, composition, lighting, aspect ratio, and style strength.' },
      { name: 'Upscale', path: '/home/midjourney/upscale', description: '2×, 4×, 8× upscale with detail reconstruction, edge and texture preservation, batch support.' },
      { name: 'Vary', path: '/home/midjourney/vary', description: 'Subtle to strong variations, style transfer, composition changes; multi-variant exploration.' }
    ],
    sections: [
      {
        title: 'Platform philosophy',
        content: `Creative freedom and control: Language as brush—natural language as the primary medium; art diversity from classical to futurist; iterative refinement and exploration; community-driven inspiration.

Tech and art: Deep style and technique understanding; aesthetic intelligence (composition, color); rich detail at every scale; creative combinations beyond expectation.`
      },
      {
        title: 'Core features',
        content: `Imagine: Text to visual art. Specify 200+ styles (impressionist, surreal, cyberpunk, ink wash); mood and atmosphere; composition (close-up, panorama, aerial, low angle); lighting (natural, dramatic, cinematic, stage). Controls: aspect ratio (1:1, 4:3, 16:9, 9:16, custom); style strength; seed; negative prompts. Art-level: brushwork (oil, watercolor, sketch), materials (metal, fabric, glass), light and shadow, perspective and depth.

Upscale: Detail reconstruction, sharp edges, preserved texture, denoising. Modes: 2×, 4×, 8×; creative upscale with added detail; batch; progressive. For print (posters, books, exhibitions), digital (web, apps), concept presentation, and commercial assets.

Vary: Subtle tweaks or bold new directions; style transfer; composition and viewpoint changes. Control variation strength, preserve key features, guide with text, generate multiple variants. For concept exploration, style tests, iteration, and combining elements from variants.`
      },
      {
        title: 'Industry applications',
        content: `Art and design: Concept art (games, film, animation), illustration (books, magazines, ads), graphic design (posters, packaging, brand), and pure art exploration. Film and game: Character and environment design, props, storyboard assets. Ads and brand: Ad concepts, brand identity, social content, product imagery. Architecture and interior: Concept visualization, interior mood boards, landscape and material studies.`
      },
      {
        title: 'Technical specs',
        content: `Image: Default 1024×1024; upscale to 4096×4096; PNG, JPG, WEBP; sRGB, Adobe RGB. Performance: Minute-level generation; batch prompts; queue and priority; full history and versioning.`
      },
      {
        title: 'Professional workflow',
        content: `Creative: Define theme, style, and emotion; craft prompts; generate first drafts; explore with Vary; refine best direction; upscale to final resolution; light color and crop. Commercial: Brief from client; style research; concept proposals; iterate on feedback; deliver to spec; organize and archive assets.`
      },
      {
        title: 'Advanced tips',
        content: `Prompt structure: [Subject] + [Composition] + [Lighting] + [Style] + [Tech]. Style: movements (Baroque, Romantic, Expressionist), artist influence (“in the style of Van Gogh”), period (Renaissance, Victorian, Modern), culture (ukiyo-e, ink wash, Persian miniature). Composition: viewpoint (worm’s-eye, bird’s-eye, eye-level), focus (shallow/deep/selective), scale, visual flow. Color and emotion: color psychology, harmony (complementary, analogous, triadic), mood, season and time of day.`
      },
      {
        title: 'Quality control',
        content: `Auto: Composition and balance; style vs. description; resolution, noise, artifacts; novelty. Human: Artistic impact, style accuracy, commercial fit, cultural sensitivity.`
      },
      {
        title: 'Roadmap',
        content: `Higher resolution (8K+); 2D-to-3D; subtle motion; user-style training. In-image editing, style fusion, bulk customization. Education, enterprise, professional, and research editions.`
      },
      {
        title: 'Try Midjourney on FuseAITools',
        content: `Midjourney on FuseAITools redefines digital art creation—pro techniques in a simple, intuitive flow. Whether you’re an artist, designer, creative director, or enthusiast, you get the right tools in one place. Turn ideas into striking visual art.`
      }
    ]
  },
  seedream: {
    title: 'Seedream',
    category: 'Image',
    showCategory: false,
    introFullWidth: true,
    intro: 'Seedream 5 Lite on FuseAITools is ByteDance\'s multimodal image line—text-to-image and image-to-image at Basic (2K) or High (3K), with nine aspect ratios from 1:1 to 21:9. Pair with Seedance for ByteDance video workflows. Credits shown before each run. New users receive 20 free credits on sign-up.',
    features: [
      { name: 'Seedream 5 Lite Text to Image', path: '/home/seedream/5-lite-text-to-image', description: 'Generate from text—prompt up to 2995 chars, Basic 2K or High 3K, aspect ratios 1:1 through 21:9.' },
      { name: 'Seedream 5 Lite Image to Image', path: '/home/seedream/5-lite-image-to-image', description: 'Edit 1–5 images with natural-language prompts—lighting, style transfer, or frame prep for Seedance video.' }
    ],
    sections: [
      {
        title: 'Core capabilities',
        content: `Text to Image (seedream-5-lite-text-to-image): Required prompt (max 2995 chars). Aspect ratio 1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2, 21:9. Quality Basic (2K) or High (3K).

Image to Image (seedream-5-lite-image-to-image): Required 1–5 image URLs (JPEG/PNG/WebP, max 10MB each) + prompt (max 2996 chars). Same aspect ratios and quality tiers as text-to-image.

Both workflows run on FuseAITools with credit-based pricing keyed to aspect ratio and quality.`
      },
      {
        title: 'Workflow',
        content: `Text to image: write a detailed prompt → pick aspect ratio and Basic/High quality → generate → download from history.

Image to image: upload 1–5 images → describe the edit (lighting, style, details) → set ratio and quality → generate.

ByteDance creative pipeline: create or refine stills in Seedream, then animate in Seedance (v1 Lite I2V, 1.5 Pro, or Seedance 2 first/last frame modes).

All workflows run in the browser—no local GPU required.`
      },
      {
        title: 'Try Seedream on FuseAITools',
        content: `Seedream 5 Lite on FuseAITools delivers flexible 2K/3K image generation and editing—whether you need social covers, sticker art, or frames for Seedance video. Open either workflow above and start creating. New users receive 20 free credits on sign-up.`
      }
    ]
  },
  qwen: {
    title: 'Qwen',
    category: 'Image',
    showCategory: false,
    introFullWidth: true,
    intro: 'The Qwen Image empowers creators, developers, and businesses to generate and edit photorealistic images effortlessly. Whether you\'re crafting intricate designs or refining existing visuals, this powerful Qwen integrates seamlessly into your workflow, delivering multilingual text rendering and advanced editing capabilities that rival top models.',
    features: [
      { name: 'Text to Image', path: '/home/qwen/text-to-image', description: 'Generate from text prompts up to 5000 characters. Control image size (square, portrait, landscape), inference steps (2–250), guidance scale (0–20), seed, output format (PNG/JPEG), negative prompts, and acceleration (none/regular/high). Safety checker included.' },
      { name: 'Image to Image', path: '/home/qwen/image-to-image', description: 'Transform a reference image with a text prompt. Set denoising strength (0–1) to balance between original and new content. Full parameter control: steps, guidance, seed, negative prompt, acceleration, output format.' },
      { name: 'Image Edit', path: '/home/qwen/image-edit', description: 'Edit specific elements of an image via natural language. Choose image size, steps (2–49), number of outputs (1–4), sync mode, guidance scale, negative prompt, and safety checker. Prompt limit 2000 characters.' },
      { name: 'Z-Image', path: '/home/qwen/z-image', description: 'Fast text-to-image with essential aspect ratio control. Prompt up to 1000 characters; select from 1:1, 4:3, 3:4, 16:9, 9:16. Ideal for quick ideation and format-specific assets.' },
      { name: 'V2 Text to Image', path: '/home/qwen/v2-text-to-image', description: 'Generate images with model `qwen2-image-edit`. Required: prompt (<=800). Optional: image_size (1:1, 3:4, 4:3, 9:16, 16:9; default 16:9), seed, output_format (png/jpeg; default png).' },
      { name: 'V2 Image Edit', path: '/home/qwen/v2-image-edit', description: 'Edit an uploaded image URL with model `qwen2/image-edit`. Required: prompt (<=800) + image_url. Optional: image_size (1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, 21:9; default 16:9), seed, output_format (png/jpeg; default png).' }
    ],
    sections: [
      {
        title: 'Platform philosophy',
        content: `Total creative control: Qwen puts every dial and switch in your hands—from step count and guidance scale to seed and acceleration. Whether you're a power user fine-tuning every detail or a rapid prototyper seeking speed, Qwen adapts to your workflow.

Flexibility at scale: With support for extra-long prompts (up to 5000 characters) and multiple generation modes, Qwen handles everything from complex scene descriptions to targeted edits. The Z-Image mode offers a streamlined path for quick, aspect-aware generation.`
      },
      {
        title: 'Core capabilities',
        content: `Text to Image

Prompt: Up to 5000 characters, supporting rich descriptions and negative prompts.

Size options: Square (1024×1024), square_hd (1536×1536), portrait 3:4 (864×1152), portrait 9:16 (768×1344), landscape 4:3 (1152×864), landscape 16:9 (1344×768).

Inference steps: 2–250 (higher steps = more detail, slower generation).

Guidance scale: 0–20 (higher = stricter adherence to prompt).

Seed: Set for reproducibility or leave random.

Output format: PNG or JPEG.

Acceleration: None, regular, or high—trade speed for quality.

Safety checker: Optional filter for sensitive content.

Image to Image

Reference image: Required URL (JPEG, PNG, WebP).

Prompt: Up to 5000 characters.

Denoising strength: 0–1 (0 = minimal change, 1 = maximum deviation from original).

Full parameter set: Steps, guidance, seed, negative prompt, acceleration, output format, safety checker—same as text-to-image.

Image Edit

Prompt: Up to 2000 characters for describing the edit.

Image URL: Required input.

Image size: Adjustable (same options as text-to-image).

Steps: 2–49.

Num images: 1–4 outputs per request.

Sync mode: Enable for deterministic generation across multiple runs.

Guidance scale: Default 4, adjustable.

Negative prompt: Specify what to avoid.

Safety checker: Optional.

Z-Image

Prompt: Up to 1000 characters.

Aspect ratio: Required—1:1, 4:3, 3:4, 16:9, 9:16.

Simplified workflow: No advanced parameters; designed for speed and format compliance.`
      },
      {
        title: 'Use cases',
        content: `Concept exploration: Quickly generate multiple variations with long, detailed prompts.

Brand asset creation: Maintain consistency by setting seeds and using negative prompts to avoid unwanted elements.

Photo editing and retouching: Use Image-to-Image or Image Edit to change backgrounds, adjust lighting, or add/remove objects.

Content for social media: Generate assets in exact aspect ratios with Z-Image for platforms like Instagram, TikTok, or YouTube.

Batch experimentation: Run parallel generations with different seeds and guidance scales to find the perfect result.

Educational materials: Create diagrams, illustrations, and visual aids with precise control over style and content.`
      },
      {
        title: 'Technical performance',
        content: `Text-to-image generation: 5–30 seconds depending on steps, acceleration, and resolution. High acceleration reduces time by up to 50%.

Image-to-image / edit: 10–35 seconds; denoising strength affects speed (higher strength may take slightly longer).

Z-Image: 3–15 seconds—optimized for rapid output.

Concurrency: Supports 100+ parallel requests; smart queue management.

Prompt limits: 5000 chars (text/image-to-image), 2000 chars (edit), 1000 chars (Z-Image).

Input formats: JPEG, PNG, WebP (max 10MB for image inputs).

Safety checker: Optional filter; adds minimal processing time.`
      },
      {
        title: 'Workflow',
        content: `Quick generate: Write prompt → choose size/parameters → generate → review → iterate with adjusted seed or guidance.

Edit iteration: Upload image → describe edit → adjust strength/steps → generate multiple versions → select best.

Batch production: Set seed and parameters → run multiple prompts in parallel → unify style with consistent negative prompts and guidance.

Team collaboration: Share generated assets, compare versions, and collect feedback in real time on FuseAITools.`
      },
      {
        title: 'Optimization tips',
        content: `Prompt engineering: Be specific—[Subject] + [Action/Scene] + [Style] + [Details]. Use negative prompts to exclude unwanted elements (e.g., "blurry, low quality, extra limbs").

Step/guidance tuning: Start with 20–30 steps and guidance 7–9; increase steps for fine detail, decrease for speed. For image-to-image, strength 0.3–0.7 often balances change and coherence.

Seed strategy: Use a fixed seed to reproduce results; vary seed for exploration. Save successful seeds for future batches.

Acceleration: Use "high" for drafts and internal reviews; "none" for final assets where quality is paramount.

Cost efficiency: Match resolution to need—use smaller sizes for thumbnails, larger for print. Batch similar requests to reuse parameters.

Safety checker: Enable only when necessary to avoid unintended filtering; disable for unrestricted creative exploration.`
      },
      {
        title: 'Platform advantages',
        content: `Granular control: Adjust steps, guidance, seed, and more—unmatched flexibility for power users.

Long prompt support: Up to 5000 characters for intricate descriptions and detailed edits.

Multiple modes: Text-to-image, image-to-image, edit, and Z-Image—all in one platform.

Speed options: Acceleration levels let you prioritize speed or quality on demand.

Reproducibility: Seed control ensures consistent outputs across sessions.

Best for: Designers, developers, content creators, researchers, and anyone needing precise, repeatable image generation.`
      },
      {
        title: 'Try Qwen on FuseAITools',
        content: `Qwen on FuseAITools delivers the ultimate balance of control and speed—whether you're drafting concepts, refining details, or producing final assets. With four powerful modes, extensive parameter tuning, and support for long prompts, Qwen empowers you to create exactly what you envision. Start generating with precision today.`
      }
    ]
  },
  grok: {
    title: 'Grok',
    category: 'Image & Video',
    showCategory: false,
    introFullWidth: true,
    intro: 'Grok Imagine on FuseAITools—xAI **image** (text-to-image, image-to-image) and **video** (text-to-video, image-to-video, upscale, extend) in one suite. Image modes use per-run credits; video generate modes scale by duration and resolution. New users receive **20 free credits** on sign-up.',
    features: [
      { name: 'Image · Text to Image', path: '/home/grok/text-to-image', description: 'grok-imagine-text-to-image—prompt required (max 5000); current form outputs 1:1 square.' },
      { name: 'Image · Image to Image', path: '/home/grok/image-to-image', description: 'grok-imagine-image-to-image—exactly one image URL; prompt optional (max 5000).' },
      { name: 'Video · Text to Video', path: '/home/grok/text-to-video', description: 'grok-imagine-text-to-video—prompt, aspect ratio, fun/normal/spicy mode, 6s/10s, 480p/720p.' },
      { name: 'Video · Image to Video', path: '/home/grok/image-to-video', description: 'grok-imagine-image-to-video—up to 7 images and/or prompt; same duration, resolution, and mode controls.' },
      { name: 'Video · Upscale', path: '/home/grok/upscale', description: 'grok-imagine-upscale—Original Task ID from a completed Grok generation; no prompt.' },
      { name: 'Video · Extend', path: '/home/grok/extend', description: 'grok-imagine-extend—task ID + prompt; extend_at; extend 6s/10s; 480p/720p.' }
    ],
    sections: [
      {
        title: 'Grok Imagine Image',
        content: `Text to Image: Prompt up to 5000 characters; model grok-imagine-text-to-image; current web form submits 1:1 square output.

Image to Image: Exactly one uploaded image; optional prompt; JPEG, PNG, WebP; max 10MB.`
      },
      {
        title: 'Grok Imagine Video',
        content: `Text to Video & Image to Video: Prompt up to 5000 (required on T2V; optional on I2V with images). Aspect ratios 2:3, 3:2, 1:1, 16:9, 9:16. Motion modes fun, normal, spicy (spicy disabled when I2V has uploads). Duration 6s or 10s; resolution 480p or 720p.

Upscale: Select Original Task from completed Grok runs—enhance prior output.

Extend: Task ID + continuation prompt; extend_at frame; extend length 6s/10s; 480p/720p.`
      },
      {
        title: 'Try on FuseAITools',
        content: `Start with Image T2I or I2I for hero stills, animate via Image to Video, then Upscale or Extend winning clips. Credits appear on Generate—video pricing follows duration and resolution; image and upscale use per-run modelKey rates.`
      }
    ]
  },
  suno: {
    title: 'Suno',
    category: 'Audio',
    showCategory: false,
    introFullWidth: true,
    intro: 'Suno on FuseAITools turns text and uploaded audio into full music—generate new songs, extend tracks, create covers, expand short clips, and add instrumentals or vocals. Models V3.5 through V5 with Simple or Custom control. Credits shown before each run. New users receive 20 free credits on sign-up.',
    features: [
      { name: 'Suno Music Generation', path: '/home/suno/generate', description: 'Text-to-music—Simple mode (500 chars) or Custom with style, title, and lyrics. V3.5–V5; instrumental toggle.' },
      { name: 'Suno Music Extension', path: '/home/suno/extend', description: 'Extend completed generate tasks via Audio ID—optional continueAt and custom style/title.' },
      { name: 'Suno Audio Cover', path: '/home/suno/upload-cover', description: 'Upload ≤2 min MP3/WAV/M4A and reimagine style, title, and lyrics.' },
      { name: 'Suno Audio Expansion', path: '/home/suno/upload-extend', description: 'Expand uploaded clips—default or custom parameter mode with continueAt.' },
      { name: 'Suno Accompaniment', path: '/home/suno/add-instrumental', description: 'Add backing instruments via include/exclude tags—no prompt required.' },
      { name: 'Suno Vocal Generation', path: '/home/suno/add-vocals', description: 'Add vocals to source audio—prompt up to 5000 chars plus style and exclude tags.' }
    ],
    sections: [
      {
        title: 'Core capabilities',
        content: `Music Generation (suno_generate): Prompt required. Simple mode max 500 chars; Custom mode adds style/title and longer prompts (3k on V3.5/V4, 5k on V4.5/V5). Models V3_5, V4 (~4 min), V4_5/V4_5PLUS (~8 min), V5. Instrumental toggle; optional vocal gender and weight sliders.

Music Extension (suno_extend): Audio ID from completed suno_generate tasks. Original params or custom continueAt, prompt (max 3000), style (max 200), title (max 80).

Audio Cover (suno_upload_cover): Upload fileUrl (≤2 min). Style + title required; prompt when vocals enabled.

Audio Expansion (suno_upload_extend): Upload fileUrl (≤2 min). Default params or custom mode with style, title, optional prompt, continueAt.

Accompaniment (suno_add_instrumental): Source audio + title + include tags + exclude tags (max 500 each). No prompt.

Vocal Generation (suno_add_vocals): Source audio + prompt (max 5000) + title + style + exclude tags. Optional vocal gender m/f.`
      },
      {
        title: 'Workflow',
        content: `New song: Music Generation → pick Simple or Custom → choose model (V5 for speed, V4.5+ for length) → download from history.

Continue a track: complete Music Generation first → Music Extension → select Audio ID → optional custom continue point.

Upload-based: Audio Cover or Expansion for external clips (≤2 min) → set style/title → generate.

Layering: upload instrumental bed → Accompaniment or Vocal Generation to add backing or sung parts.

All workflows run in the browser on FuseAITools with per-workflow credit pricing—no local GPU required.`
      },
      {
        title: 'Try Suno on FuseAITools',
        content: `Suno on FuseAITools covers the full creative pipeline—from first prompt to extended mixes, covers, and vocal layers. Open any workflow above, review credits on the Generate button, and start creating. New users receive 20 free credits on sign-up.`
      }
    ]
  },
  elevenlabs: {
    title: 'ElevenLabs',
    category: 'Audio',
    showCategory: false,
    introFullWidth: true,
    intro: 'ElevenLabs on FuseAITools delivers voice and audio in the browser—Multilingual v2 and Turbo 2.5 text-to-speech, Speech-to-Text with diarization, Sound Effect v2, and AI Audio Isolation. Credits shown before each run. New users receive 20 free credits on sign-up.',
    features: [
      { name: 'ElevenLabs Multilingual v2', path: '/home/elevenlabs/multilingual-v2', description: 'Natural TTS—voice picker, stability/style sliders, optional timestamps and context text.' },
      { name: 'ElevenLabs Turbo 2.5', path: '/home/elevenlabs/turbo-2-5', description: 'Fast TTS with the same voice controls—low latency for assistants and batch narration.' },
      { name: 'ElevenLabs Speech-to-Text', path: '/home/elevenlabs/speech-to-text', description: 'Upload ≤200MB audio—auto language, speaker diarization, event tags, word timeline.' },
      { name: 'ElevenLabs Sound Effect v2', path: '/home/elevenlabs/sound-effect-v2', description: 'Generate SFX from text—duration 0.5–22s, loop, intensity, MP3/PCM output.' },
      { name: 'ElevenLabs AI Audio Isolation', path: '/home/elevenlabs/audio-isolation', description: 'Extract vocals or instruments from mixed uploads (≤10MB).' }
    ],
    sections: [
      {
        title: 'Core capabilities',
        content: `Multilingual v2 TTS (elevenlabs_text_to_speech_multilingual): Required voice + text (max 5000 chars). Stability, similarity boost, style, speed (0.7–1.2); optional timestamps, previous/next context, language code; MP3/PCM output. Priced per 1K characters.

Turbo 2.5 TTS (elevenlabs_text_to_speech_turbo): Same parameter set as Multilingual v2—faster generation. Priced per 1K characters.

Speech-to-Text (elevenlabs_speech_to_text): Upload audio URL (≤200MB). Language auto or ISO code; diarize; tagAudioEvents. Word-level timeline in results. Priced per minute.

Sound Effect v2 (elevenlabs_sound_effect): Text description (max 5000 chars); duration 0.5–22s; loop; promptInfluence; output format. Priced per minute.

AI Audio Isolation (elevenlabs_audio_isolation): Upload audio URL (≤10MB). Isolates vocals/instruments. Priced per minute.`
      },
      {
        title: 'Workflow',
        content: `Narration: pick Multilingual v2 or Turbo 2.5 → select voice → paste text → tune sliders → generate → download from history.

Transcription: Speech-to-Text → upload audio → set language/diarization → generate → copy transcript or use word timeline.

Sound design: Sound Effect v2 → describe SFX → set duration/loop → generate.

Stems: Audio Isolation → upload mixed track → download isolated output.

Pair with Suno for full music tracks—ElevenLabs covers voice, transcription, SFX, and separation. All workflows run in the browser with per-run credit pricing—no local GPU required.`
      },
      {
        title: 'Try ElevenLabs on FuseAITools',
        content: `ElevenLabs on FuseAITools covers the voice and audio pipeline—from TTS narration to transcripts, sound effects, and stem isolation. Open any workflow above, review credits on the Generate button, and start creating. New users receive 20 free credits on sign-up.`
      }
    ]
  },
  veo3: {
    title: 'Veo 3.1',
    category: 'Video',
    showCategory: false,
    introFullWidth: true,
    intro: 'Veo 3.1 on FuseAITools is Google DeepMind video—stable routes at /home/veo3 with text-to-video, first-and-last frames, reference-to-video, and extend. Standard (veo3) or Fast (veo3_fast) on generate modes; extend uses veo3_extend. 16:9 supports 1080P. Pair with Seedance for ByteDance video. New users receive 20 free credits on sign-up.',
    features: [
      { name: 'Veo 3.1 Text to Video', path: '/home/veo3/text-to-video', description: 'Prompt-only video—Standard or Fast, aspect 16:9/9:16/Auto, prompts up to 1000 chars.' },
      { name: 'Veo 3.1 First and Last Frames', path: '/home/veo3/first-and-last-to-video', description: 'Upload 1–2 keyframe images—model generates motion between first and last frames.' },
      { name: 'Veo 3.1 Reference to Video', path: '/home/veo3/reference-to-video', description: 'Animate 1–3 reference images while preserving look—Standard or Fast.' },
      { name: 'Veo 3.1 Video Extend', path: '/home/veo3/extend', description: 'Extend completed Veo3 clips—select original task plus extension prompt.' }
    ],
    sections: [
      {
        title: 'Core capabilities',
        content: `Text to Video (TEXT_2_VIDEO): Required prompt (1–1000 chars). Model veo3 (Standard) or veo3_fast (Fast). Aspect ratio 16:9 (1080P-capable), 9:16, or Auto. Optional seed 10000–99999 and translation to English.

First and Last Frames (FIRST_AND_LAST_FRAMES_2_VIDEO): Required 1–2 image URLs (JPG/PNG) + prompt. Same Standard/Fast and aspect-ratio options as text-to-video.

Reference to Video (REFERENCE_2_VIDEO): Required 1–3 image URLs + prompt. Standard or Fast; no aspect-ratio control in the form.

Video Extend (VIDEO_EXTEND): Required original Veo3 task ID + extension prompt (1–1000 chars). Priced via veo3_extend. Clips after 1080P upscale cannot be extended.`
      },
      {
        title: 'Workflow',
        content: `Text to video: write prompt → pick Standard or Fast → set aspect ratio → generate → download from history.

First and last frames: upload 1–2 keyframe images → describe motion → set model and ratio → generate.

Reference to video: upload 1–3 references → write motion prompt → pick Standard or Fast → generate.

Extend: complete a Veo3 generation first → open extend → select original task → describe continuation → generate.

ByteDance pipeline: pair Veo 3.1 with Seedance (v1 Lite I2V, 1.5 Pro, or Seedance 2) for image-to-video and multimodal clips.

All workflows run in the browser—no local GPU required.`
      },
      {
        title: 'Try Veo 3.1 on FuseAITools',
        content: `Veo 3.1 on FuseAITools delivers Google DeepMind video at /home/veo3—whether you need cinematic text-to-video, keyframe transitions, reference animation, or clip extension. Open any workflow above and start creating. New users receive 20 free credits on sign-up.`
      }
    ]
  },
  runway: {
    title: 'Runway',
    category: 'Video',
    showCategory: false,
    introFullWidth: true,
    intro: 'Runway Gen-3 and its related models bring AI video generation and editing into one seamless workflow: create video from text or images, intelligently extend clip length, and use Aleph for fine motion control and visual effects. Used by filmmakers, marketers, and creators for quick drafts, storyboards, and polished short-form video—all without high-end hardware, from any device.',
    features: [
      { name: 'Generate', path: '/home/runway/generate', description: 'Create high-quality video from text or image prompts—up to 4K, multiple styles and frame rates, 3–16 second clips, and multiple variants per prompt.' },
      { name: 'Extend', path: '/home/runway/extend', description: 'Extend video forward or backward with seamless, style-consistent content and natural motion continuation.' },
      { name: 'Aleph', path: '/home/runway/aleph', description: 'Professional motion control, style transfer, color grading, VFX, compositing, and 3D integration with Runway Aleph.' }
    ],
    sections: [
      {
        title: 'Platform value',
        content: `End-to-end workflow from concept to final video; a full toolset for generation, editing, and effects; real-time collaboration and versioning; and a cloud-native setup so you can create from anywhere without heavy hardware.

Gen-3 delivers high-quality video with strong temporal consistency, fine motion control, and style preservation—plus powerful style transfer and consistency across shots.`
      },
      {
        title: 'Core features',
        content: `Generate: Text-to-video with natural language, style presets (cinematic, animation, documentary, experimental), motion parameters (camera speed, angle, path), and mood. Image-to-video animates a single image while keeping its style, character motion, and scene extension. Output up to 4K, 24/30/60fps, 3–16 seconds, with multiple variants per prompt.

Extend: Add length forward or backward with seamless joins, strict style consistency, and natural motion continuation. Use for lengthening shorts, pace adjustment, loop creation, or filling gaps. Modes include smart prediction, direction-guided extend, multi-step extend, and quality preview.

Aleph: Camera path and object animation control, physics-aware motion, time remapping. Visual effects: style transfer, color grading, dynamic effects (rain, snow, particles), and scene transitions. Composition: layers, green-screen, 2D/3D blend, and audio sync.`
      },
      {
        title: 'Who it’s for',
        content: `Film and TV: Pre-vis, storyboards, VFX previews, and extending existing footage. Marketing and ads: Product videos, social content, brand stories, and A/B tests. Content creators: YouTube, TikTok, Instagram, education, and personal projects. Enterprise: Training, product demos, internal comms, and event highlights.`
      },
      {
        title: 'Tech and performance',
        content: `Cloud-native: Browser access, real-time cloud rendering, smart caching, and full API support. Formats: Input MP4, MOV, PNG, JPG; output MP4, ProRes, GIF; 480p to 4K; H.264/H.265. Processing: Minute-scale generation, batch jobs, queue management, and live progress tracking.`
      },
      {
        title: 'Creative workflow',
        content: `Standard: Define concept, prepare text or images, set resolution and style, generate preview, iterate, then export. Optionally refine with Aleph. Team workflow: Shared projects, version history, comments and annotations, and role-based permissions.`
      },
      {
        title: 'Tips and best practices',
        content: `Prompts: Be specific about scene, action, and mood; reference directors or art styles; specify camera, motion, and lighting; use negative prompts to exclude elements. Motion: Use keyframes, speed curves, and planned camera paths; set physical constraints. Style: Use reference images, define color and atmosphere, keep texture and lighting consistent.`
      },
      {
        title: 'Quality and optimization',
        content: `Automated quality checks, human review options, and user-driven improvements. Rendering and caching optimizations, efficient compression, and load balancing for fast, reliable output.`
      },
      {
        title: 'Future direction',
        content: `Longer video, 3D and real-time generation, deeper multimodal (audio/video/text) integration. Ecosystem growth: plugins, template libraries, training, and enterprise solutions. Applications: Virtual production, game cinematics, VR/AR, and e‑commerce product video.`
      },
      {
        title: 'Try Runway on FuseAITools',
        content: `Runway Gen-3 gives you a one-stop AI video solution—from simple text descriptions to professional motion and VFX—all in one platform. Whether you’re a solo creator, small team, or large organization, Runway has the tools to match. Start with Generate, Extend, or Aleph and unlock your video potential.`
      }
    ]
  },
  luma: {
    title: 'Luma',
    category: 'Video',
    showCategory: false,
    introFullWidth: true,
    intro: 'Luma AI Dream Machine is a one-click AI video tool that turns text or images into high-quality video with smooth motion and realistic physics. Built for social content, product demos, and pre-visualization, it offers a minimal interface and strong results—no steep learning curve, with fast previews and quick iteration so you can experiment freely.',
    features: [
      { name: 'Generate', path: '/home/luma/generate', description: 'One-click video from text or image: natural language and multi-language support, style control, single-image animation, and scene extension with coherent motion.' }
    ],
    sections: [
      {
        title: 'Platform strengths',
        content: `Minimal design: One-click generation, zero learning curve, real-time preview, and intuitive controls with few parameters and maximum creative freedom.

Technical quality: Strong frame-to-frame coherence, physics-aware motion, rich texture and lighting, and support for multiple visual and artistic styles.`
      },
      {
        title: 'Core features',
        content: `Generate turns text or images into video. Text-to-video: natural language and multi-language understanding, support for abstract and concrete scenes, and precise style control via description. Image-to-video: animate a single photo, preserve style, extend the scene, and generate natural character and creature motion.`
      },
      {
        title: 'Use cases',
        content: `Social: TikTok, Instagram Reels, YouTube Shorts, brand marketing, and trend-driven content. Business and product: 360° product demos, service explainers, internal training, and pitch decks. Creative and concept: film and animation pre-vis, ad concept tests, game scene and character previews, and digital art and experimental video.`
      },
      {
        title: 'Tech and performance',
        content: `Quality: Rich dynamic range, natural motion and acceleration, high-fidelity detail. Speed: Minute-scale generation, concurrent tasks, progressive preview, and batch export. Formats: Input JPG, PNG, text; output MP4, GIF, PNG sequence; ready for social upload and professional editing.`
      },
      {
        title: 'Creative workflow',
        content: `Define your concept, add text or a reference image, choose aspect ratio and duration, then generate. Iterate from the result and export when satisfied. Effective prompts: [subject] + [action/scene] + [style/mood] + [technical]. Examples: product—"Modern smartphone slowly rotating on a lit table, metal finish and screen, cinematic light, 16:9"; nature—"Morning forest, sun through leaves, mist, birds flying, documentary style"; abstract—"Colored liquid mixing underwater, light refraction, artistic slow motion."`
      },
      {
        title: 'Pro tips',
        content: `Motion: Use concrete action verbs and adverbs, control pace and rhythm, set camera angle and path, describe physical interactions. Visual style: Specify lighting direction and color, color mood and contrast, texture and material, and art style or reference. Applications: Film—concept animation, camera tests, VFX preview, storyboards. E‑commerce and marketing—product videos, seasonal content, A/B tests, social ads. Education and training—explainer animations, learning materials, concept demos, training videos.`
      },
      {
        title: 'Quality and feedback',
        content: `Automatic checks for coherence, physical plausibility, detail preservation, and style consistency. User ratings, issue reporting, and feature requests feed into ongoing model and product improvements.`
      },
      {
        title: 'Roadmap and value',
        content: `Planned: Longer video, audio (music and SFX), template library, and team collaboration. Value: Major time and cost savings, no heavy equipment or crew; fast creative validation and scalable output. Luma makes professional video accessible—low-risk experimentation, quick iteration, and strong results for individuals and teams alike.`
      },
      {
        title: 'Try Luma Dream Machine on FuseAITools',
        content: `Luma AI Dream Machine turns complex video production into a single click. Whether you need a quick prototype or are new to video, you get simplicity and high quality in one place. Start with text or an image and turn ideas into video at speed.`
      }
    ]
  },
  sora: {
    title: 'Sora',
    category: 'Video',
    showCategory: false,
    introFullWidth: true,
    intro: 'Sora is OpenAI\'s AI video generation model, supporting both text-to-video and image-to-video. It delivers realistic motion, physics consistency, with improved control over style, scene, and aspect ratio—ideal for creative apps and social media content.',
    features: [
      { name: 'Text to Video', path: '/home/sora/text-to-video', description: 'Create video from natural language with deep scene understanding, physics, timing, and style control.' },
      { name: 'Image to Video', path: '/home/sora/image-to-video', description: 'Animate static images while preserving composition, style, and detail.' },
      { name: 'Pro Text to Video', path: '/home/sora/pro-text-to-video', description: 'Pro-tier text-to-video: 4K+, longer duration (60s+), fine control, and batch variants.' },
      { name: 'Pro Image to Video', path: '/home/sora/pro-image-to-video', description: 'Commercial-grade image-to-video with brand consistency and multi-platform delivery.' },
      { name: 'Watermark Remover', path: '/home/sora/watermark-remover', description: 'Detect and remove watermarks with smart inpainting; batch processing supported.' },
      { name: 'Pro Storyboard', path: '/home/sora/pro-storyboard', description: 'Plan shots, timing, and transitions; dynamic preview, collaboration, and standard exports.' }
    ],
    sections: [
      {
        title: 'Platform architecture',
        content: `Multimodal AI: Deep scene understanding, physics-aware motion, strong temporal consistency, and precise style control.

Layered offering: Standard high-quality generation; Pro for higher fidelity; enterprise for custom and batch; plus post-production and planning tools (watermark removal, storyboard).`
      },
      {
        title: 'Core features',
        content: `Text to Video: Complex scene parsing, dynamic relationships, mood and atmosphere, and timing control. Controls: camera language (push, pull, pan, follow, aerial), motion paths, lighting (natural, artificial, special), and style presets (cinematic, documentary, animation, experimental).

Image to Video: Composition and style preservation, motion prediction, detail enhancement. Use for concept art, photo animation, illustration, and product stills.

Pro Text to Video: 4K+, 60s+ clips, finer parameters, batch variants; frame rate (24/30/60fps), HDR, professional codecs, metadata and timecode.

Pro Image to Video: Brand consistency, multi-platform specs, copyright and watermark handling, delivery standards. For brand content, product lines, corporate films, and training at scale.

Watermark Remover: Auto detection, inpainting, seamless removal, batch processing. For clean assets, rights compliance, brand uniformity, and localization.

Pro Storyboard: Shot planning, timing and transitions, dynamic preview, team comments. Industry formats, PDF/video/web export, versioning, and links to shoot plans and budgets.`
      },
      {
        title: 'Industry applications',
        content: `Ads and marketing: Concept tests, product demos, brand narrative, seasonal campaigns. Film and entertainment: Pre-vis, VFX preview, animation support, trailers and promo. Enterprise: Training at scale, product demos, corporate films, event highlights. Education: Concept explainers, step-by-step guides, historical and science demos.`
      },
      {
        title: 'Technical specs',
        content: `Standard: 1080p, up to ~10s. Pro: 1080p, up to ~15s (and longer in Pro tiers). Batch: up to ~10 variants per prompt. Speed: minutes to hours depending on complexity. Input: text (plain, Markdown, JSON), images (JPG, PNG, RAW up to 8K), video (MP4, MOV, ProRes for reference). Output: MP4, MOV, ProRes, GIF; storyboard as PDF, HTML, video; metadata as XML/JSON.`
      },
      {
        title: 'Professional workflow',
        content: `Concept and audience; plan with Pro Storyboard; generate with the right model; quality review; iterate; post (watermark removal, format); deliver. Team workflow: role-based access (director, producer, designer), frame-accurate comments, version comparison.`
      },
      {
        title: 'Advanced tips',
        content: `Prompts: [Scene] + [Subject] + [Action] + [Tech] + [Style]. Tech: camera (focal length, aperture, ISO, shutter), lighting (key, fill, back, ambient), motion curves (ease, linear, elastic), color (LUT, color space, gamma). Quality: auto checks (physics, consistency, composition, brand); human review for creative intent, emotion, business fit, and sensitivity.`
      },
      {
        title: 'Business value',
        content: `ROI: 70–90% time savings, lower cost (equipment, crew, location), faster creative testing, early risk mitigation. For agencies: faster concepts, more options, higher satisfaction, more capacity. For brands: lower cost, faster time-to-market, consistent quality, flexible updates.`
      },
      {
        title: 'Roadmap',
        content: `Longer video and multi-scene narrative; near real-time generation; user-specific style training. Audio generation, more languages, interactive editing, API ecosystem. Vertical solutions (e.g. healthcare, education, finance), on-prem deployment, compliance, and enterprise project and team features.`
      },
      {
        title: 'Try Sora on FuseAITools',
        content: `OpenAI Sora on FuseAITools gives you a full AI video stack—from concept tests to commercial production on one platform. Whether you’re a solo creator, agency, or enterprise, Sora provides the right tier and tools. Start with text or image and turn ideas into high-impact video.`
      }
    ]
  },
  wan: {
    title: 'Wan',
    category: 'Image & Video',
    showCategory: false,
    introFullWidth: true,
    intro: 'Wan on FuseAITools is Alibaba\'s multimodal suite for image and video. Use Wan 2.6 for text, image, and video-to-video clips (5–15s, multi-shot, 720p/1080p), or Wan 2.7 for director-style text-to-video, frame-controlled image-to-video, natural-language Video Edit, and R2V with up to five references—plus Wan 2.7 Image and Image Pro. New users receive 20 free credits on sign-up.',
    features: [
      { name: 'Wan 2.7 Image', path: '/home/wan/2-7-image', description: 'Text-to-image and image editing—optional up to 9 reference images, aspect ratios when generating from prompt only, batch n, 1K/2K, sequential mode, and advanced controls.' },
      { name: 'Wan 2.7 Image Pro', path: '/home/wan/2-7-image-pro', description: 'Same as Wan 2.7 Image with 4K output when no input image and sequential mode is off—built for hero assets and print-ready creatives.' },
      { name: 'Wan 2.6 Text to Video', path: '/home/wan/text-to-video', description: 'Prompt-only clips: 5/10/15s, 720p/1080p, single or multi-shot—fast social and storyboard previews.' },
      { name: 'Wan 2.6 Image to Video', path: '/home/wan/image-to-video', description: 'Upload stills (JPEG/PNG/WebP) plus a motion prompt—5/10/15s at 720p/1080p with multi-shot support.' },
      { name: 'Wan 2.6 Video to Video', path: '/home/wan/video-to-video', description: 'Upload footage and transform with a prompt—5 or 10s output at 720p/1080p (15s UI maps to 10s API).' },
      { name: 'Wan 2.7 Text to Video', path: '/home/wan/v2-7-text-to-video', description: 'Director-grade generation: 3–5000 char prompt, 2–15s, aspect ratios, optional audio and negative prompt.' },
      { name: 'Wan 2.7 Image to Video', path: '/home/wan/v2-7-image-to-video', description: 'First/last frame, reference clip, or driving audio with 2–15s output at 720p/1080p.' },
      { name: 'Wan 2.7 Video Edit', path: '/home/wan/v2-7-video-edit', description: 'Edit uploaded video with natural language—duration 0 (auto) or 2–10s, optional reference image.' },
      { name: 'Wan 2.7 R2V', path: '/home/wan/v2-7-r2v', description: 'Up to 5 combined reference images/videos, 2–10s clips—ensemble scenes with optional voice lock.' }
    ],
    sections: [
      {
        title: 'Core capabilities',
        content: `Wan 2.7 Image (wan-2-7-image): Prompt up to 5000 characters (Chinese/English). Optional input_urls (up to 9). Without input images: aspect ratios 1:1, 16:9, 4:3, 21:9, 3:4, 9:16, 8:1, 1:8; resolution 1K/2K; n 1–4 (or 1–12 in sequential mode). Optional thinking mode, color palette, bbox regions, watermark, seed.

Wan 2.7 Image Pro (wan-2-7-image-pro): Same as Image plus 4K when no input image and sequential mode is off.

Wan 2.6 Text to Video (wan-2-6-text-to-video): Prompt 1–5000 characters. Duration 5/10/15s. Resolution 720p/1080p. Multi-shot on/off.

Wan 2.6 Image to Video (wan-2-6-image-to-video): Image URL(s) (min 256×256px; JPEG, PNG, WebP; max 10MB) + prompt. Duration 5/10/15s. Resolution 720p/1080p. Multi-shot on/off.

Wan 2.6 Video to Video (wan-2-6-video-to-video): Video URL (MP4, MOV, MKV; max 10MB) + prompt. Output duration 5 or 10s (15s selection maps to 10s). Resolution 720p/1080p. Multi-shot on/off.

Wan 2.7 Text to Video (wan-2-7-text-to-video): Prompt 3–5000 characters. Optional negative prompt and audio URL. Duration 2–15s. Resolution 720p/1080p. Aspect ratio 16:9, 9:16, 1:1, 4:3, 3:4. Prompt extend, watermark, seed.

Wan 2.7 Image to Video (wan-2-7-image-to-video): Prompt 3–5000; at least one of first frame, last frame, reference clip, or driving audio. Duration 2–15s. Resolution 720p/1080p.

Wan 2.7 Video Edit (wan-2-7-videoedit): Video URL + prompt 3–5000. Duration 0 or 2–10s. Resolution 720p/1080p. Optional reference image; audio setting auto or origin.

Wan 2.7 R2V (wan-2-7-r2v): Prompt 3–5000; up to 5 reference images/videos combined. Duration 2–10s. Optional first frame and reference voice; aspect ratio omitted when first frame is set.`
      },
      {
        title: 'Workflow',
        content: `Choose a version: Wan 2.6 for quick text/image/video-to-video clips with multi-shot; Wan 2.7 when you need frame control, natural-language edit, or multi-reference R2V.

Image: Open Wan 2.7 Image or Image Pro → write prompt → (optional) upload references → set resolution, batch, and advanced options → generate.

Wan 2.6 video: Pick Text to Video, Image to Video, or Video to Video → provide prompt and media → set duration, resolution, multi-shot → submit → download from history.

Wan 2.7 video: Pick Text to Video, Image to Video, Video Edit, or R2V → match required inputs (frames, footage, or references) → set duration and quality → submit → iterate with refined prompts.

All workflows run in the browser on FuseAITools with credit-based pricing—no local GPU required.`
      },
      {
        title: 'Try Wan on FuseAITools',
        content: `Wan on FuseAITools is your hub for Alibaba Wan image and video models. Start with Wan 2.7 Image / Image Pro for stills, use Wan 2.6 for fast multi-shot video from text, images, or footage, and step up to Wan 2.7 for editing and up-to-five-reference R2V. New users receive 20 free credits on sign-up—open any workflow card above or see pricing for credit packs.`
      }
    ]
  },
  'happy-horse': {
    title: 'HappyHorse',
    category: 'Video',
    showCategory: false,
    introFullWidth: true,
    intro: 'HappyHorse v1 on FuseAITools delivers native audio-video generation across four workflows: text-to-video, image-to-video, reference-to-video (1–9 images), and video edit. Clips run 3–15s at 720p/1080p with credits shown before each run. New users receive 20 free credits on sign-up.',
    features: [
      { name: 'HappyHorse v1 Text to Video', path: '/home/happy-horse/v1-text-to-video', description: 'Prompt-only generation with native audio-video sync—3–15s, 720p/1080p, aspect ratios 16:9 through 3:4.' },
      { name: 'HappyHorse v1 Image to Video', path: '/home/happy-horse/v1-image-to-video', description: 'Animate one still image with optional prompt—3–15s at 720p/1080p.' },
      { name: 'HappyHorse v1 Reference to Video', path: '/home/happy-horse/v1-reference-to-video', description: '1–9 reference images with character1/2/3 placeholders in the prompt for consistent casts.' },
      { name: 'HappyHorse v1 Video Edit', path: '/home/happy-horse/v1-video-edit', description: 'Upload MP4/MOV and edit with natural language—0–5 optional references, audio auto or origin.' }
    ],
    sections: [
      {
        title: 'Core capabilities',
        content: `Text to Video (happyhorse-text-to-video): Required prompt (1–5000 chars). Duration 3–15s. Resolution 720p/1080p. Aspect ratio 16:9, 9:16, 1:1, 4:3, 3:4. Optional seed.

Image to Video (happyhorse-image-to-video): Exactly one image URL required. Optional prompt (max 5000). Duration 3–15s. Resolution 720p/1080p. Optional seed.

Reference to Video (happyhorse-reference-to-video): Required prompt plus 1–9 ordered reference images. Use character1, character2… in the prompt. Duration 3–15s. Resolution 720p/1080p. Aspect ratios same as text-to-video.

Video Edit (happyhorse-video-edit): Required video URL (MP4/MOV) and prompt. Optional 0–5 reference images. Resolution 720p/1080p. Audio setting auto or origin. Billing duration from source video (ceil seconds, API clamp 3–60s). Optional seed.`
      },
      {
        title: 'Workflow',
        content: `Choose a mode: text for scripted clips with aspect control, image for single-frame animation, reference for multi-subject consistency, or edit to transform existing footage.

Generate modes: write prompt → set duration/resolution (and aspect ratio if available) → submit → download from history.

Reference mode: upload images in order → reference them as character1, character2… in the prompt.

Video edit: upload source clip → describe changes → pick audio auto/origin → submit. Credits scale with source length.

All workflows run in the browser on FuseAITools with credit-based pricing—no local GPU required.`
      },
      {
        title: 'Try HappyHorse on FuseAITools',
        content: `HappyHorse v1 on FuseAITools is built for dialogue-driven and audio-synced video—social clips, ads, and quick edits in one hub. Start with text or image workflows, use reference mode for cast consistency, or open Video Edit for natural-language changes. New users receive 20 free credits on sign-up—open any workflow card above or see pricing for plans.`
      }
    ]
  },
  hailuo: {
    title: 'Hailuo',
    category: 'Video',
    showCategory: false,
    introFullWidth: true,
    intro: 'Hailuo is MiniMax\'s high-fidelity AI video generation model designed to create realistic motion, expressive characters, and cinematic visuals. It supports both text-to-video and image-to-video, handling complex movements, lighting changes, and detailed facial expressions with stability and consistency.',
    features: [
      { name: 'Pro Image to Video', path: '/home/hailuo/image-to-video-pro', description: 'High-fidelity image-to-video with 6s or 10s duration, 768P or 1080P resolution. Best for cinematic quality and detailed motion. Note: 10s videos do not support 1080P.' },
      { name: 'Standard Image to Video', path: '/home/hailuo/image-to-video-standard', description: 'Efficient image-to-video with the same controls: prompt, single image input, 6s/10s duration, 768P/1080P. Balanced quality and speed.' }
    ],
    sections: [
      {
        title: 'Platform philosophy',
        content: `Motion and fidelity: Hailuo brings MiniMax's high-fidelity video generation to a single, easy-to-use workflow. Whether you choose Pro for maximum cinematic quality or Standard for faster iteration, you get realistic motion, expressive characters, and stable, consistent output.

Image-to-video first: Both tiers focus on animating a single input image with a text prompt—ideal for concept art, product shots, character animation, and creative storytelling. No video editing expertise required.`
      },
      {
        title: 'Core capabilities',
        content: `Pro Image to Video

Prompt: Natural language description of the desired video animation; max 5000 characters.

Input image: Single image required; formats JPEG, PNG, WebP; max 10MB.

Duration: 6 seconds (standard) or 10 seconds (extended). Note: 10-second videos do not support 1080P resolution—use 768P.

Resolution: 768P (web and social) or 1080P (full HD; only when duration is 6s).

Use cases: Cinematic clips, character animation, product demos, high-quality social and marketing content.

Standard Image to Video

Same parameters as Pro: prompt (max 5000 characters), single image (JPEG/PNG/WebP, max 10MB), duration 6s or 10s, resolution 768P or 1080P (1080P not available for 10s).

Optimized for speed and cost while maintaining strong motion and visual consistency.

Use cases: Rapid prototyping, batch content, social shorts, and workflows where turnaround time matters.`
      },
      {
        title: 'Use cases',
        content: `Social media content: Create short, high-quality clips for TikTok, Instagram Reels, YouTube Shorts with 6s or 10s duration and 768P/1080P output.

Advertising and marketing: Animate product shots, brand visuals, and concept art with realistic motion and lighting.

Creative projects: Bring illustrations and character art to life with expressive motion and detailed facial expressions.

Concept validation: Quickly test video ideas from a single image and prompt before committing to full production.

Educational and explainer content: Produce clear, consistent motion for tutorials and visual explanations.`
      },
      {
        title: 'Technical performance',
        content: `Prompt length: Up to 5000 characters for both Pro and Standard.

Input: Single image; JPEG, PNG, or WebP; max 10MB.

Duration: 6 seconds or 10 seconds. Important: 10-second videos are not supported at 1080P—select 768P when using 10s.

Resolution: 768P (all duration options) or 1080P (6s only).

Output: Video delivered via secure URL or direct download; format and codec follow platform defaults.

Concurrency: Supports parallel requests with queue management; typical generation time varies by resolution and duration.`
      },
      {
        title: 'Workflow',
        content: `Choose tier: Select Pro Image to Video for highest quality or Standard Image to Video for balanced speed and quality.

Upload image: Provide one image (JPEG, PNG, or WebP; max 10MB) as the base frame.

Write prompt: Describe the desired animation—motion, lighting changes, character expression, scene evolution (up to 5000 characters).

Set parameters: Pick duration (6s or 10s) and resolution (768P or 1080P; remember 1080P is only for 6s).

Generate: Submit and wait for the result; preview in the result panel and download when ready.`
      },
      {
        title: 'Optimization tips',
        content: `Prompt crafting: Be specific about motion, lighting, and expression. Example: "A graceful geisha performs a traditional Japanese dance indoors. Soft hand movements, sleeves flowing naturally. Warm ambient lighting, cinematic, soft depth of field" yields better results than a generic "person dancing."

Duration and resolution: Use 6s + 1080P for final HD assets; use 10s + 768P when you need longer clips (1080P is not available for 10s).

Image quality: Higher resolution, well-lit input images produce smoother and more consistent animations.

Pro vs Standard: Use Pro for client work, hero content, and when quality is the priority; use Standard for drafts, batch runs, and faster iteration.`
      },
      {
        title: 'Try Hailuo on FuseAITools',
        content: `Hailuo on FuseAITools brings MiniMax's cinematic AI video to your workflow. Animate still images with realistic motion, expressive characters, and consistent lighting. Choose Pro for highest fidelity or Standard for faster results. Start with an image and a prompt to create video in seconds.`
      }
    ]
  },
  kling: {
    title: 'Kling',
    category: 'Video',
    showCategory: false,
    introFullWidth: true,
    intro: 'Kling on FuseAITools covers Kuaishou video from v2.5 Turbo through 3.0—nine workflows for text-to-video, image-to-video, motion control, AI avatars, and multi-shot 3.0 Video. v2.5 Turbo adds CFG and negative prompts; 2.6 supports optional sound; motion control transfers reference-video motion; avatars turn image + audio into talking heads. Credits shown before each run. New users receive 20 free credits on sign-up.',
    features: [
      { name: 'Kling v2.5 Turbo I2V Pro', path: '/home/kling/v2-5-turbo-image-to-video-pro', description: 'Image-to-video with optional tail frame—5/10s, negative prompt, CFG scale.' },
      { name: 'Kling v2.5 Turbo T2V Pro', path: '/home/kling/v2-5-turbo-text-to-video-pro', description: 'Text-to-video—16:9/9:16/1:1, 5/10s, negative prompt and CFG.' },
      { name: 'Kling 2.6 Text to Video', path: '/home/kling/v2-6-text-to-video', description: 'Prompt-only clips with sound toggle and aspect ratio—5s/10s.' },
      { name: 'Kling 2.6 Image to Video', path: '/home/kling/v2-6-image-to-video', description: 'Single image animation with optional sound—5s/10s.' },
      { name: 'Kling 2.6 Motion Control', path: '/home/kling/v2-6-motion-control', description: 'Reference image + video; character orientation; 720p/1080p.' },
      { name: 'Kling 3.0 Motion Control', path: '/home/kling/v3-0-motion-control', description: 'std/pro quality; background source; optional prompt.' },
      { name: 'Kling AI Avatar Standard', path: '/home/kling/ai-avatar-standard', description: 'Avatar image + audio + prompt (max 5000)—talking-head video.' },
      { name: 'Kling AI Avatar Pro', path: '/home/kling/ai-avatar-pro', description: 'Higher-quality talking-head from image and audio.' },
      { name: 'Kling 3.0 Video', path: '/home/kling/v3-0-video', description: 'Single or multi-shot; 3–15s; std/pro; optional frames and elements.' }
    ],
    sections: [
      {
        title: 'Core capabilities',
        content: `v2.5 Turbo I2V Pro (kling-v2-5-turbo-image-to-video-pro): Image + prompt (max 2500); optional tail frame; duration 5/10s; negative prompt; CFG 0–1.

v2.5 Turbo T2V Pro (kling-v2-5-turbo-text-to-video-pro): Prompt + aspect 16:9/9:16/1:1; duration 5/10s; negative prompt; CFG.

2.6 Text to Video (kling-2.6-text-to-video): Prompt; sound on/off; aspect 1:1/16:9/9:16; 5/10s.

2.6 Image to Video (kling-2.6-image-to-video): Single image + prompt; sound; 5/10s.

2.6 Motion Control (kling-2.6-motion-control): Reference image + video; character orientation; 720p/1080p; per-second pricing.

3.0 Motion Control (kling-3.0-motion-control): Reference image + video; std/pro; background source; optional prompt.

AI Avatar Standard/Pro (kling-ai-avatar-standard / kling-ai-avatar-pro): Avatar image + audio + prompt (max 5000).

3.0 Video (kling-3.0-video): Single or multi-shot (≤5); total 3–15s; std/pro; optional start/end frames and elements.`
      },
      {
        title: 'Workflow',
        content: `Quick clips: v2.5 Turbo T2V or 2.6 T2V/I2V → pick aspect ratio and duration → generate.

Product animation: v2.5 Turbo I2V with optional tail frame → tune CFG and negative prompt.

Controlled motion: 2.6 or 3.0 Motion Control → upload reference image + video → set orientation and quality.

Talking heads: generate audio with ElevenLabs TTS → AI Avatar Standard or Pro → download from history.

Story beats: 3.0 Video multi-shot → define up to 5 shots (total 3–15s) with optional per-shot elements.

All workflows run in the browser on FuseAITools—no local GPU required.`
      },
      {
        title: 'Try Kling on FuseAITools',
        content: `Kling on FuseAITools brings Kuaishou's latest video models into one suite—from Turbo text/image generation to motion control, avatars, and 3.0 multi-shot. Open any workflow above, review credits on the Generate button, and start creating. New users receive 20 free credits on sign-up.`
      }
    ]
  },
  seedance: {
    title: 'Seedance',
    category: 'Video',
    showCategory: false,
    introFullWidth: true,
    intro: 'Seedance on FuseAITools covers ByteDance video models from v1 Lite/Pro through 1.5 Pro and Seedance 2—eight workflows for text, image, and multimodal generation. Pair with Seedream for 2K/3K stills and image edits. v1 offers 5/10s clips up to 1080p; 1.5 Pro adds 4/8/12s with optional audio; Seedance 2 supports first/last frame and reference media at 4–15s. Credits are shown before each run. New users receive 20 free credits on sign-up.',
    features: [
      { name: 'Seedance v1 Lite Text to Video', path: '/home/seedance/v1-lite-text-to-video', description: 'Prompt-only clips—16:9 through 9:21, 480p/720p/1080p, 5s or 10s. Camera fixed, seed, and safety checker.' },
      { name: 'Seedance v1 Lite Image to Video', path: '/home/seedance/v1-lite-image-to-video', description: 'Animate one image with optional end frame—5/10s at up to 1080p with camera and seed controls.' },
      { name: 'Seedance v1 Pro Text to Video', path: '/home/seedance/v1-pro-text-to-video', description: '21:9 ultra-wide plus standard ratios—enhanced Pro quality at 480p–1080p, 5s/10s.' },
      { name: 'Seedance v1 Pro Image to Video', path: '/home/seedance/v1-pro-image-to-video', description: 'Pro image animation with camera fixed, seed, and safety checker—5/10s at 480p–1080p.' },
      { name: 'Seedance v1 Pro Fast Image to Video', path: '/home/seedance/v1-pro-fast-image-to-video', description: 'Speed-optimized I2V—720p/1080p only, 5s/10s, streamlined form without extra toggles.' },
      { name: 'Seedance 1.5 Pro', path: '/home/seedance/v1-5-pro', description: 'Unified T2V/I2V—0–2 reference images, 4/8/12s, optional audio and fixed lens at 480p–1080p.' },
      { name: 'Seedance 2 Fast', path: '/home/seedance/v2-fast', description: 'Multimodal generation—first/last frame, up to 3 reference videos, 4–15s at 480p/720p, prompts up to 20k chars.' },
      { name: 'Seedance 2', path: '/home/seedance/v2', description: 'Full multimodal control—up to 5 reference videos plus image/audio refs, 4–15s at 480p/720p.' }
    ],
    sections: [
      {
        title: 'Core capabilities',
        content: `v1 Lite Text to Video (seedance-v1-lite-text-to-video): Prompt max 10,000 chars. Duration 5s/10s. Resolution 480p/720p/1080p. Aspect ratio 16:9, 4:3, 1:1, 3:4, 9:16, 9:21. Camera fixed, seed, safety checker.

v1 Lite Image to Video (seedance-v1-lite-image-to-video): One image URL + prompt. Optional end image. Duration 5s/10s. Resolution 480p–1080p. Camera fixed, seed.

v1 Pro Text to Video (seedance-v1-pro-text-to-video): Same as Lite T2V plus 21:9. Duration 5s/10s. Camera fixed, seed, safety checker.

v1 Pro Image to Video (seedance-v1-pro-image-to-video): One image + prompt. Duration 5s/10s. Resolution 480p–1080p. Camera fixed, seed, safety checker.

v1 Pro Fast Image to Video (seedance-v1-pro-fast-image-to-video): One image + prompt. Duration 5s/10s. Resolution 720p/1080p only (no 480p). No camera/seed/safety toggles.

Seedance 1.5 Pro (seedance-1.5-pro): Prompt 3–2500 chars. Optional 0–2 input image URLs. Duration 4s/8s/12s. Resolution 480p–1080p. Aspect ratio 1:1 through 21:9. Fixed lens, generate audio (with_sound/without_sound pricing).

Seedance 2 Fast (seedance-2-fast): Prompt 3–20,000 chars. First/last frame; ≤9 images total; ≤3 reference videos; ≤3 reference audios. Duration 4–15s. Resolution 480p/720p. Aspect ratio adaptive option. Web search flag required. Per-second credits.

Seedance 2 (seedance-2): Same as 2 Fast with up to 5 reference videos. Per-second credits when reference videos are uploaded.`
      },
      {
        title: 'Workflow',
        content: `Pick a tier: Lite for fast drafts and vertical 9:21 tests; Pro for 21:9 cinematic and production I2V; Pro Fast when you only need 720p/1080p I2V quickly.

1.5 Pro: one page for text-only or 0–2 reference images—set 4/8/12s, toggle audio and fixed lens as needed.

Seedance 2 / 2 Fast: upload first/last frames and optional reference media → set 4–15s duration, 480p/720p, aspect ratio (adaptive optional) → enable web search → generate.

All workflows run in the browser on FuseAITools with credit-based pricing—no local GPU required.`
      },
      {
        title: 'Try Seedance on FuseAITools',
        content: `Seedance on FuseAITools spans eight workflows—from v1 Lite/Pro text and image modes through 1.5 Pro with optional audio to Seedance 2 multimodal generation. Open any workflow above, review credits on the Generate button, and start creating. New users receive 20 free credits on sign-up.`
      }
    ]
  },
  imagen4: {
    title: 'Imagen4',
    category: 'Image',
    showCategory: false,
    introFullWidth: true,
    intro: 'Imagen4 is a versatile text-to-image generation model offering three distinct modes: Generate, Fast, and Ultra, designed to balance speed and quality for diverse creative needs. With support for detailed prompts, negative prompting, and precise control over aspect ratio and seed, Imagen4 delivers flexibility from rapid ideation to high-fidelity final assets.',
    features: [
      { name: 'Imagen4 Generate', path: '/home/imagen4/imagen4-generate', description: 'Standard mode for balanced, high-quality image generation. Supports prompt-based creation with optional negative prompts, aspect ratio, and seed control.' },
      { name: 'Imagen4 Fast', path: '/home/imagen4/imagen4-fast', description: 'Optimized for speed and iterative exploration. Generates 1-4 images per request, ideal for quick concept variations and high-volume testing.' },
      { name: 'Imagen4 Ultra', path: '/home/imagen4/imagen4-ultra', description: 'Premium mode focused on maximum detail and visual fidelity. Designed for final assets where quality is paramount.' }
    ],
    sections: [
      {
        title: 'Platform philosophy',
        content: `Precision and flexibility: Imagen4 puts creative control at the forefront. Choose from standard, fast, or ultra modes to match your workflow. With optional negative prompts, adjustable aspect ratios, and seed parameters, you can fine-tune results to meet exact specifications.

Simplicity without compromise: Whether generating a single polished image or exploring dozens of variations, Imagen4 balances intuitive operation with professional-grade capabilities. Generous prompt limits and straightforward controls make it accessible for creators at every level.`
      },
      {
        title: 'Core capabilities',
        content: `Imagen4 Generate

Prompt required (up to 5000 characters)
Optional negative prompt (up to 5000 characters)
Aspect ratio: 1:1, 16:9, 9:16, 3:4, 4:3
Optional seed string (up to 500 characters)
Ideal for general-purpose image creation: marketing assets, social media visuals, concept art, and drafts.

Imagen4 Fast

Prompt required (up to 5000 characters)
Optional negative prompt (up to 5000 characters)
Aspect ratio defaults to 16:9
Number of images: 1-4 per request
Optional integer seed
Ideal for high-speed exploration, A/B testing, and generating multiple variants in a single run.

Imagen4 Ultra

Prompt required (up to 5000 characters)
Optional negative prompt (up to 5000 characters)
Aspect ratio defaults to 1:1
Optional seed string (up to 500 characters)
Ideal for premium-quality outputs: final assets, high-resolution visuals, and detail-sensitive projects.`
      },
      {
        title: 'Use cases',
        content: `Marketing assets: Generate consistent, on-brand visuals for campaigns, ads, and social content across multiple aspect ratios.

Concept iteration: Use Fast mode to explore dozens of variations quickly; refine with Generate or Ultra for final execution.

Polished final assets: Leverage Ultra mode for high-fidelity images suitable for print, hero visuals, or client presentations.

Creative exploration: Experiment with prompts and negative prompts to refine style, composition, and subject matter.

Batch ideation: Fast mode's multi-output capability supports rapid prototyping and team brainstorming sessions.`
      },
      {
        title: 'Technical performance',
        content: `Generate mode: Balanced speed and quality; typical generation time varies based on prompt complexity and aspect ratio.

Fast mode: Optimized for speed; supports parallel generation of up to 4 images per request for rapid iteration.

Ultra mode: Prioritizes detail and fidelity; longer generation time suited for final assets.

Prompt length: Up to 5000 characters for both prompts and negative prompts, enabling highly detailed and nuanced instructions.

Aspect ratios: Supports 1:1, 16:9, 9:16, 3:4, 4:3 across all modes for flexible output formatting.

Seed control: Allows reproducibility and fine-grained variation tuning via optional seed parameters.`
      },
      {
        title: 'Workflow',
        content: `Quick create: Write a detailed prompt -> select mode (Generate, Fast, or Ultra) -> set aspect ratio and optional negative prompt -> generate -> review and refine.

Multi-output exploration: Use Fast mode with num_images set to 2-4 -> generate multiple variations simultaneously -> compare and select the best direction.

Reproducible generation: Set a seed value in Generate or Ultra mode to recreate consistent results across sessions or team workflows.

Team collaboration: Share generated assets and seed values to ensure alignment; iterate using negative prompts to eliminate unwanted elements.`
      },
      {
        title: 'Optimization tips',
        content: `Prompt crafting: Be specific and structured: [Subject] + [Action/Scene] + [Style/Composition] + [Key details]. For negative prompts, clearly list elements to avoid (e.g., "no text, no watermark, no blurry background").

Mode selection: Use Fast for early-stage ideation and volume generation. Use Generate for refined concepts. Use Ultra for final, high-stakes outputs where detail matters most.

Aspect ratio strategy: Match aspect ratio to intended use: 16:9 for widescreen visuals, 1:1 for social posts, 9:16 for vertical stories.

Seed utilization: When iterating, lock the seed to maintain composition consistency while tweaking prompts; change the seed to explore new compositions.

Quality control: Run initial explorations in Fast mode to validate prompt effectiveness; scale to Generate or Ultra once the creative direction is locked.`
      },
      {
        title: 'Platform advantages',
        content: `Three distinct modes: Tailor speed and quality to your workflow from rapid ideation to premium output.

Long prompt support: Up to 5000 characters for both prompts and negative prompts enables precise creative direction.

Negative prompting: Explicitly exclude unwanted elements for cleaner, more accurate results.

Flexible aspect ratios: Cover modern formats including square, widescreen, and vertical orientations.

Seed control: Ensure reproducibility and fine-tune variation across generations.

Multi-output capability: Fast mode supports 1-4 images per request for efficient exploration.

Best for: Designers, marketers, content creators, and teams requiring flexible, high-quality image generation with control over speed, fidelity, and output consistency.`
      },
      {
        title: 'Try Imagen4',
        content: `Imagen4 combines speed, quality, and precision in one unified platform. Whether you are iterating rapidly in Fast mode, balancing quality in Generate, or perfecting final assets in Ultra, Imagen4 gives you the tools to create exactly what you envision. Start bringing your ideas to life today.`
      }
    ]
  }
}

/** 根据父路径取 key，例如 /home/runway -> runway */
export function getToolOverviewKey(path) {
  const match = path.match(/^\/home\/([^/]+)\/?$/)
  return match ? match[1] : null
}
