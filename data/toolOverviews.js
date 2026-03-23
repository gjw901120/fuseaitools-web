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
    title: 'GPT-4o Image',
    category: 'Image',
    showCategory: false,
    introFullWidth: true,
    intro: 'GPT-4o Image is OpenAI\'s latest native multimodal image generation model. By deeply integrating text and visual understanding, it enables a complete workflow from concept generation to professional-grade refinement within a single chat flow, excelling in instruction following, text rendering, and style consistency.',
    features: [
      { name: 'Text to Image', path: '/home/gpt-image/text-to-image', description: 'Generate images from complex text descriptions or reference images, with precise control over aspect ratio and quality.' },
      { name: 'Image to Image', path: '/home/gpt-image/image-to-image', description: 'Add, remove, or modify elements using natural language; supports style transfer based on reference images and parametric fine-tuning.' }
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
    intro: 'Ideogram  is  image generation model, offering text-to-image, image editing, reframing, and remixing with improved consistency and creative control.',
    features: [
      { name: 'v3-text-to-image', path: '/home/ideogram/v3-text-to-image', description: 'Generate images from rich natural language prompts, with optional rendering speed, style, prompt expansion, image size, seed, and negative prompt controls.' },
      { name: 'v3-edit', path: '/home/ideogram/v3-edit', description: 'Mask-based image editing: upload an image and mask, then fill or modify the masked region with a new prompt.' },
      { name: 'v3-remix', path: '/home/ideogram/v3-remix', description: 'Remix an existing image with a new prompt, controlling strength, style, size, speed, seed, and negative prompt.' },
      { name: 'v3-reframe', path: '/home/ideogram/v3-reframe', description: 'Reframe an image into new aspect ratios and resolutions (square, portrait, landscape), with optional style, speed, and multi-image outputs.' },
      { name: 'character', path: '/home/ideogram/character', description: 'Generate character-centric scenes from reference images, preserving identity while changing setting, pose, or style.' },
      { name: 'character-edit', path: '/home/ideogram/character-edit', description: 'Edit part of a character image using masks and reference images to adjust looks, clothing, or pose while keeping identity.' },
      { name: 'character-remix', path: '/home/ideogram/character-remix', description: 'Remix character images with new prompts and style references, controlling strength, size, and negative prompts for nuanced variations.' }
    ],
    sections: [
      {
        title: 'Core Features',
        content: `Text to Image (v3-text-to-image): Generate images from detailed text prompts, with options for TURBO/BALANCED/QUALITY rendering speed, style presets (AUTO, GENERAL, REALISTIC, DESIGN), MagicPrompt expansion, multiple aspect ratios (square, portrait, landscape), and seed/negative prompt control up to 5000 characters.

Image Editing (v3-edit): Upload an image and a mask of the same size, then use a prompt to inpaint or modify only the masked region; supports rendering speed, MagicPrompt, and seed for reproducibility.

Image Remixing (v3-remix): Provide an input image and a remix prompt, optionally setting style, size, speed, expand_prompt, number of images, strength, seed, and negative prompt to explore new variations on the same base.

Reframing (v3-reframe): Reframe existing images into different target aspect ratios and resolutions (square, square_hd, portrait_4_3, portrait_16_9, landscape_4_3, landscape_16_9), with optional style, speed, num_images, and seed.`
      },
      {
        title: 'Character Tools',
        content: `Character (character): Use one or more reference images as character anchors, then place them into new scenes described by a prompt. Control rendering speed (TURBO, BALANCED, QUALITY), style (AUTO, REALISTIC, FICTION), MagicPrompt, num_images, image_size, seed, and negative_prompt for fine control.

Character Edit (character-edit): Upload an image, a matching mask, and character reference images to selectively edit parts of a character while preserving identity. Supports the same rendering_speed, style, expand_prompt, num_images, and seed controls for guided edits.

Character Remix (character-remix): Remix character images with new prompts and reference images, adjusting strength of the original, style, image_size, num_images, seed, and negative_prompt, plus optional style reference images and masks for even more precise control.`
      },
      {
        title: 'Typical Use Cases',
        content: `Brand and Product Visuals: Consistent product shots, lifestyle scenes, and campaign images; iterative refinement across formats (1:1, 4:3, 16:9).

Character-Driven Content: Game and animation characters, mascots, and influencers; consistent identity across multiple scenes, poses, and outfits.

Marketing and Social: Ad creatives, social posts, and story formats in portrait and landscape; fast remixing and reframing for each platform size.

Design and Illustration: Concept art, storyboards, editorial illustration, and mood pieces that need controlled style, composition, and character continuity.`
      },
      {
        title: 'Advanced Control & Workflow Tips',
        content: `Prompt Craft: Combine subject, setting, mood, camera, and style; use negative prompts for unwanted artifacts (e.g., "no text," "avoid blur," "no extra limbs").

Parameter Strategy: Start with BALANCED rendering speed; move to TURBO for quick ideation and QUALITY for final images. Use seeds to reproduce or iteratively refine good results.

Aspect Ratio & Size: Choose square or square_hd for avatars and thumbnails; portrait_16_9 or portrait_4_3 for social stories; landscape_16_9 or landscape_4_3 for web, slides, and video frames.

Character Consistency: For character modes, keep reference images clear and consistent; reuse reference_image_urls and seeds to maintain identity across scenes; use strength controls to balance between base image and new creative direction.`
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
    intro: 'Flux is Black Forest Labs\' advanced image generation model that delivers photoreal detail, strong multi-reference consistency, and accurate text rendering with flexible control.',
    features: [
      { name: 'Generate', path: '/home/flux-kontext/generate', description: 'Current Flux Kontext generate/edit workflow with Pro/Max model controls.' },
      { name: 'Flux 2 Text to Image', path: '/home/flux-kontext/flux-2-text-to-image', description: 'Prompt-based image generation with aspect ratio and 1K/2K resolution.' },
      { name: 'Flux 2 Image to Image', path: '/home/flux-kontext/flux-2-image-to-image', description: 'Reference-based image editing with 1-8 input images, prompt, aspect ratio, and resolution.' },
      { name: 'Flux 2 Pro Text to Image', path: '/home/flux-kontext/flux-2-pro-text-to-image', description: 'Higher-fidelity text-to-image generation with Flux 2 Pro settings.' },
      { name: 'Flux 2 Pro Image to Image', path: '/home/flux-kontext/flux-2-pro-image-to-image', description: 'Higher-fidelity image-to-image generation with 1-8 input images and prompt control.' }
    ],
    sections: [
      {
        title: 'Platform architecture',
        content: `Tiered quality: Pro—balanced quality and speed for professional use; Max—flagship fidelity and detail; adaptive optimization by task; progressive rendering from overview to detail.

Fine control: Precise style and composition parameters; consistent style across batches; control from macro concept to micro detail; content-aware optimization.`
      },
      {
        title: 'Core capabilities',
        content: `Generate: Single-prompt high-fidelity images with full control.

Pro tier: ~15–30s per image; professional quality and detail; cost-efficient; efficient batch (10+ images). Max tier: Leading fidelity; ultra-fine texture and detail; strong artistic expression; print-ready output.

Control: Style—movements (Renaissance, Baroque, Impressionist, Modern), techniques (oil, watercolor, sketch, digital), era (classical, retro, modern, futurist), culture. Composition—viewpoint (macro to micro), foreground/mid/background, selective focus and depth; visual balance and rhythm. Lighting and color—natural, studio, dramatic, cinematic; color theory; mood and time of day.`
      },
      {
        title: 'Industry applications',
        content: `Concept: Film and TV concept art, game art (characters, environments, props), product and brand exploration. Content: Social (Instagram, TikTok), blog imagery, marketing assets, presentation visuals. Design: UI/UX and packaging mockups, spatial and fashion concept visuals. Education and publishing: Textbook and science visuals, book and magazine art, training materials.`
      },
      {
        title: 'Technical specs',
        content: `Pro: 2048×2048, 24-bit, PNG/JPG/WEBP, smart compression. Max: Up to 4096×4096, Adobe RGB/ProPhoto RGB, TIFF/PSD, CMYK for print. Speed: Pro ~15–30s, Max ~45–90s per image; batch 10+; queue and priority.`
      },
      {
        title: 'Professional workflow',
        content: `Single-prompt: Define goal and tier (Pro/Max); craft prompt; set style, composition, color; preview; final generate; light post. Batch: Define scope; design template prompts; batch generate; quality check; standardize post; deliver to spec.`
      },
      {
        title: 'Advanced tips',
        content: `Prompt structure: [Subject] + [Atmosphere] + [Composition] + [Lighting] + [Style] + [Tech]. Tier strategy: Pro for speed and exploration; Max for final, detail-heavy work; mix—explore with Pro, refine chosen direction with Max. Micro control: Brush (direction, wash, line weight), materials (metal, fabric, glass), light (highlight, shadow, reflection), space (perspective, depth, atmosphere). Composition: Line and color for gaze; emotion and culture; functional layout.`
      },
      {
        title: 'Quality control',
        content: `Pro: Clarity, color, composition; style vs. prompt; resolution/format/size; intent. Max: Micro detail; artistic quality; industry standards; commercial fit. Human: Pro—commercial fit and cost; Max—artistic and professional depth; style accuracy; novelty.`
      },
      {
        title: 'Roadmap',
        content: `Near real-time generation; 2D-to-3D; subtle motion and interactive content; user-style training. In-image editing, style fusion, enterprise batch, API ecosystem. Film, game, design-agency, and enterprise-marketing editions.`
      },
      {
        title: 'Try Flux Kontext on FuseAITools',
        content: `Flux Kontext on FuseAITools gives you pro-grade image generation with the right balance of speed and quality. Whether you need fast concept exploration or max-fidelity final assets, you get the right tier and control in one place. Turn ideas into precise, high-quality visuals.`
      }
    ]
  },
  'nano-banana': {
    title: 'Nano Banana',
    category: 'Image',
    showCategory: false,
    introFullWidth: true,
    intro: 'Meet Nano Banana, Google\'s Gemini Flash Image model, now available via Fuse AI. Built for developers, it combines lightning-fast speed with Pro-level quality, accurate text rendering, strong character consistency, and scalable image generation and editing workflows.',
    features: [
      { name: 'Text to Image', path: '/home/nano-banana/generate', description: 'Sub-20s generation; social sizes (1080×1080, 1080×1920), web and 16:9; style and mood presets.' },
      { name: 'Image to Image', path: '/home/nano-banana/edit', description: 'Style and theme transfer, detail polish, natural-language edit; batch style unification.' },
      { name: 'Pro Generate', path: '/home/nano-banana/pro-generate', description: 'Up to 4K, fine detail and color; composition, style, and lighting control for final assets.' },
      { name: 'Nano Banana 2', path: '/home/nano-banana/nano-banana-2', description: 'Prompt up to 20000 chars, optional 0-14 image inputs, aspect ratio presets including auto, JPG/PNG output, and 1K/2K/4K resolution.' }
    ],
    sections: [
      {
        title: 'Platform philosophy',
        content: `Efficiency first: Lightweight architecture and compute; second-level response; high cost-effectiveness; minimal steps for maximum output.

Quality–efficiency balance: Smart quality retention at speed; adaptive quality by need; smooth path from quick draft to refined version; batch-optimized throughput.`
      },
      {
        title: 'Core capabilities',
        content: `Text to Image: Fast ideation and concept visualization. Sub-20s average; live preview; high-frequency iteration; parallel requests. Sizes: social (1080×1080, 1080×1920), web (1200×630, 1200×800), 16:9 (1920×1080), 4:3 (1200×900), mobile. Style presets: minimal, colorful, retro, modern; themes (business, tech, nature, food); mood (joy, serious, warm, mysterious). Use for brainstorm, A/B tests, fast feedback, batch exploration.

Image to Image: Style transfer, theme change, detail polish, creative remix. Natural-language edit; smart selection; strength/style/blend control; batch style unification. For brand consistency, quick social polish, concept expansion, format optimization.

Pro Generate: Production-ready assets. Up to 4K; micro detail and color accuracy; pro formats and color spaces. Control: composition (rule of thirds, golden ratio, symmetry, viewpoint, focus, balance); style (strength, blend, per-detail, culture); lighting and color (studio, natural, dramatic, cinematic; color theory; mood; brand).`
      },
      {
        title: 'Use cases',
        content: `Rapid prototyping: Concept validation, UI prototypes, pitch decks, internal visuals. Social marketing: Daily content, trend response, campaign assets, user engagement. Startups and SMBs: Budget-friendly visuals, fast branding, flexible iteration, scaling from small to medium. Education and content: Slides and blog art, student projects, knowledge visualization.`
      },
      {
        title: 'Technical performance',
        content: `Standard: Text-to-image 5–20s, image-to-image 10–25s; 100+ concurrent. Pro: 15–30s generate, 10–25s edit; smart batch. Cost: ~20–30% of traditional compute; smart compression and storage; minimal bandwidth; low energy.`
      },
      {
        title: 'Workflow',
        content: `Quick creative: Describe concept; generate multiple directions in seconds; pick best; quick refine; output; light post. Batch: Plan content; batch generate; unify style and brand; schedule. Team: Fast share, real-time feedback, version compare, visual decision support.`
      },
      {
        title: 'Optimization tips',
        content: `Prompt: [Subject] + [Key traits] + [Simple style] + [Basic params]. Iterate: Small tweaks from last result; multiple variants per run; learn which params matter; save and reuse successful prompts. Cost: Right resolution per use; batch similar tasks; cache similar requests; off-peak when possible. Quality: Key params, minimum quality bar, quick-then-refine, pick best from batch.`
      },
      {
        title: 'Platform advantages',
        content: `Speed: Industry-leading generation time. Cost: High value and efficiency. Ease: Intuitive, low learning curve. Scale: Small to medium projects without friction. Best for: Startups, social managers, educators, solo creators, agile teams.`
      },
      {
        title: 'Try Nano Banana on FuseAITools',
        content: `Nano Banana on FuseAITools redefines fast image creation—speed, cost, and quality in one place. Whether you’re on a tight deadline or want maximum efficiency in exploration, Nano Banana delivers. Turn ideas into visuals at lightning speed.`
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
    intro: 'Seedream is a unified multimodal image generation model by ByteDance, designed for multimodal reasoning, deep understanding, and controllable visual creation. It supports text-to-image and image editing workflows with improved consistency and real-time knowledge integration.',
    features: [
      { name: '5 Lite Text to Image', path: '/home/seedream/5-lite-text-to-image', description: 'Generate images from text descriptions with aspect ratio options from 1:1 to 21:9. Choose Basic (2K) or High (3K) quality. Prompt length up to 2995 characters.' },
      { name: '5 Lite Image to Image', path: '/home/seedream/5-lite-image-to-image', description: 'Transform existing images via text instructions—adjust lighting, apply style transfer, or refine details. Upload one or more images (JPEG, PNG, WebP; max 10MB each), set aspect ratio and quality, and guide the result with natural language prompts up to 2996 characters.' }
    ],
    sections: [
      {
        title: 'Platform philosophy',
        content: `Precision and flexibility: Seedream puts control in your hands—choose exactly the aspect ratio and resolution you need, from social squares to ultra-wide cinematics. High-quality output at 2K or 3K ensures your visuals stand out, whether for web, print, or digital campaigns.

Simplicity without compromise: With straightforward parameters and generous prompt limits, Seedream balances ease of use with professional-grade results. It's built for creators who demand both creative freedom and technical reliability.`
      },
      {
        title: 'Core capabilities',
        content: `5 Lite Text to Image

Describe your vision in detail—up to 2995 characters.

Select aspect ratio: 1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2, 21:9.

Choose quality: Basic 2K (fast, efficient) or High 3K (enhanced detail and clarity).

Ideal for concept art, stickers, social posts, and rapid visual exploration.

5 Lite Image to Image

Upload one or more images (JPEG, PNG, WebP; max 10MB each).

Add a text instruction (e.g., "change lighting to golden hour," "convert to sticker style," "transfer this style to the subject").

Apply the same aspect ratio and quality controls as text-to-image.

Perfect for style unification, lighting adjustments, detail polishing, and creative remixing.`
      },
      {
        title: 'Use cases',
        content: `Sticker creation: Generate custom stickers with precise control over style and format.

Lighting edits: Transform the mood of an image by changing lighting conditions via text prompts.

Style transfer: Apply artistic or brand styles consistently across multiple assets.

Marketing assets: Produce social media graphics, banners, and ads with tailored aspect ratios.

Concept iteration: Rapidly explore variations of a design by tweaking prompts and parameters.

Educational content: Create visuals for presentations, blogs, and student projects with high-quality output.`
      },
      {
        title: 'Technical performance',
        content: `Text-to-image generation: Typically completes in 10–25 seconds for Basic 2K, 20–40 seconds for High 3K (dependent on complexity).

Image-to-image generation: 15–30 seconds for most edits; supports batch processing for multiple images.

Concurrency: Handles 50+ parallel requests smoothly.

Input formats: JPEG, PNG, WebP (max 10MB per image).

Prompt length: Up to 2995–2996 characters, enabling rich, detailed descriptions.`
      },
      {
        title: 'Workflow',
        content: `Quick create: Write a detailed prompt → select aspect ratio and quality → generate → review and refine.

Batch editing: Upload a set of images → apply the same style or lighting instruction → unify output with consistent settings.

Team collaboration: Share generated assets in real time, collect feedback, and iterate quickly using version tracking on FuseAITools.`
      },
      {
        title: 'Optimization tips',
        content: `Prompt crafting: Be specific: [Subject] + [Action/Scene] + [Style/Lighting] + [Key details]. For image-to-image, clearly state what to change (e.g., "make it sunset lighting" rather than just "change lighting").

Resolution strategy: Use Basic 2K for drafts and internal reviews; switch to High 3K for final assets.

Batch efficiency: Group similar tasks (e.g., same aspect ratio/style) to minimize reconfiguration.

Cost management: Optimize by reusing successful prompts and caching frequently used instructions.

Quality control: Experiment with different prompts and aspect ratios to find the best combination; iterate from Basic to High for polish.`
      },
      {
        title: 'Platform advantages',
        content: `Flexible aspect ratios: From 1:1 to 21:9, covering all modern formats.

High-quality output: 2K and 3K options ensure professional-grade visuals.

Long prompt support: Up to 2996 characters for precise creative direction.

Ease of use: Intuitive controls and minimal setup—start generating in seconds.

Versatility: Ideal for stickers, lighting edits, style transfer, and more.

Best for: Designers, marketers, educators, content creators, and anyone needing fast, flexible image generation.`
      },
      {
        title: 'Try Seedream on FuseAITools',
        content: `Seedream on FuseAITools combines precise control with high-quality output—whether you're crafting stickers, fine-tuning lighting, or exploring new styles. With flexible aspect ratios, 2K/3K resolution, and generous prompt limits, Seedream empowers you to create exactly what you envision. Start turning ideas into stunning visuals today.`
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
      { name: 'Z-Image', path: '/home/qwen/z-image', description: 'Fast text-to-image with essential aspect ratio control. Prompt up to 1000 characters; select from 1:1, 4:3, 3:4, 16:9, 9:16. Ideal for quick ideation and format-specific assets.' }
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
  suno: {
    title: 'Suno',
    category: 'Audio',
    showCategory: false,
    introFullWidth: true,
    intro: 'Suno turns text and creative ideas into full music: generate new songs from descriptions, extend existing clips, add instrumentals or vocals, and create cover-style versions from uploaded audio. Newer models support more natural dynamics and a wider emotional range. Use Suno on FuseAITools for film scoring, demos, and creative music production—all in one place.',
    features: [
      { name: 'Music Generation', path: '/home/suno/generate', description: 'Create full tracks from text: genre, mood, structure, and 50+ styles with BPM and key control.' },
      { name: 'Music Extension', path: '/home/suno/extend', description: 'Extend tracks while keeping structure; add variations, transitions, and peak development.' },
      { name: 'Audio Cover', path: '/home/suno/upload-cover', description: 'Reimagine songs: style shift, re-arrangement, emotion reshape, and cross-language adaptation.' },
      { name: 'Audio Expansion', path: '/home/suno/upload-extend', description: 'Turn short clips into full pieces with structure, orchestration, and emotional arc.' },
      { name: 'Accompaniment', path: '/home/suno/add-instrumental', description: 'Add harmony, drums, counter-melody, and atmosphere tailored to your lead.' },
      { name: 'Vocal Generation', path: '/home/suno/add-vocals', description: 'Generate singing in multiple styles, languages, and with natural expression and effects.' }
    ],
    sections: [
      {
        title: 'Platform core value',
        content: `Creative democratization: Create professional music without music theory; full pipeline from idea to finished track; diverse styles across genres and cultures; precise emotional expression.

Technical edge: Multimodal understanding of emotion and imagery in text; strong harmony, rhythm, and structure; natural dynamics and emotional arcs; accurate style adaptation and learning.`
      },
      {
        title: 'Core features',
        content: `Music Generation: From text to full tracks. Specify genre (pop, rock, jazz, classical, electronic, 50+), mood, structure (intro, verse, chorus, bridge, outro), and instruments. Control BPM (60–200), key and mode, harmony complexity, and time signatures (4/4, 3/4, 6/8).

Music Extension: Lengthen tracks while preserving structure; add variations, transitions, and peak development; keep style, motifs, and emotion consistent with balanced dynamics.

Audio Cover: Style conversion, re-arrangement (modern or retro), emotion reshape, cross-language adaptation. For licensed adaptations, brand music, film scoring, and personal expression.

Audio Expansion: Develop short clips into full works—motif development, structure, orchestration, emotional arc. Use for idea completion, sample-based creation, sound design, and experimental music.

Accompaniment: Harmony from melody, style-appropriate drums and rhythm, counter-melodies, and ambient beds. Style-aware, dynamic following, spatial and complexity control.

Vocal Generation: Multiple singing styles (pop, classical, folk, rap), emotion control, natural harmonies, multi-language. Control range, timbre, techniques (vibrato, slides, falsetto), and basic mix effects.`
      },
      {
        title: 'Industry applications',
        content: `Film and game: Theme songs, scene scoring, character themes, dynamic music systems. Ads and brand: Ad music, brand jingles, retail and event music. Independent creators: Idea sparking, demo production, arrangement learning, remote collaboration. Education and therapy: Music theory and creation teaching, therapeutic music, cognitive training, creative expression tools.`
      },
      {
        title: 'Technical specs',
        content: `Audio: 44.1kHz / 48kHz; 16bit / 24bit; WAV, MP3, FLAC, AAC; mono, stereo, 5.1. Generation: 30s to 5 minutes; minute-level turnaround; multiple variants per prompt; batch support.`
      },
      {
        title: 'Professional workflow',
        content: `Standard: Define emotion, style, and use; describe in text; set BPM, key, duration; generate 30s preview; refine; full-length generation; export and light post. Professional: Concept with team; style research; batch generation and A/B; edit and mix in DAW; client feedback; final delivery to spec.`
      },
      {
        title: 'Advanced tips',
        content: `Prompt structure: [Mood] + [Genre] + [Instruments] + [Structure] + [Tech]. Specify progressions, rhythm, dynamics, and timbre. Style: era (80s, 90s, modern), region, artist influence, production character. Emotion: base mood, development arc, moment emphasis, cultural nuance.`
      },
      {
        title: 'Quality control',
        content: `Auto: Harmony, rhythm, structure checks; technical params; style vs. description; emotion accuracy. Human: Creative fulfillment, emotional impact, commercial fit, cultural sensitivity.`
      },
      {
        title: 'Roadmap',
        content: `Longer works and album-length generation; real-time and interactive generation; multi-track editing; user-style training. Lyrics generation, mix and master tools, real-time collaboration. Education, therapy, enterprise, and pro-tier solutions.`
      },
      {
        title: 'Try Suno on FuseAITools',
        content: `Suno on FuseAITools redefines what’s possible in music creation—complex production becomes simple and intuitive. Whether you’re a pro, creator, or enthusiast, you’ll find the right tools and expression here. Turn ideas into full music with AI.`
      }
    ]
  },
  elevenlabs: {
    title: 'ElevenLabs',
    category: 'Audio',
    showCategory: false,
    introFullWidth: true,
    intro: 'ElevenLabs delivers studio-grade voice and audio: natural text-to-speech in many languages, fast Turbo models for real-time use, accurate speech-to-text, and professional sound-effect generation. AI audio isolation extracts vocals or instruments from mixed tracks. Use ElevenLabs on FuseAITools for narration, dubbing, accessibility, and sound design—all in one place.',
    features: [
      { name: 'Multilingual v2', path: '/home/elevenlabs/multilingual-v2', description: '29 languages, native-level prosody and emotion; dubbing, audiobooks, and training.' },
      { name: 'Turbo 2.5', path: '/home/elevenlabs/turbo-2-5', description: 'Sub-400ms latency for assistants, live translation, game NPCs, and streaming.' },
      { name: 'Speech to Text', path: '/home/elevenlabs/speech-to-text', description: '100+ languages, speaker diarization, timestamps, SRT/VTT/TXT for subtitles and notes.' },
      { name: 'Sound Effect v2', path: '/home/elevenlabs/sound-effect-v2', description: 'Generate pro sound effects from text: env, objects, abstract, transitions.' },
      { name: 'AI Audio Isolation', path: '/home/elevenlabs/audio-isolation', description: 'Extract vocals or instruments with minimal quality loss for stems and remixes.' }
    ],
    sections: [
      {
        title: 'Platform strengths',
        content: `Voice synthesis: Human-level naturalness; fine emotional control; 29 languages with native prosody; high-fidelity voice cloning from short samples.

Audio processing: Millisecond-scale latency; professional source separation; realistic acoustic environments; text-to-sound-effect generation.`
      },
      {
        title: 'Core features',
        content: `Multilingual v2: 29 languages and regional variants (e.g. US/UK English, Mandarin/Taiwan); domain terms and cultural nuance. Natural rhythm, emotion (joy, sadness, excitement, seriousness), age (child to elderly), and style (news, audiobook, business). For film dubbing, audiobooks, education, and corporate training.

Turbo 2.5: Sub-400ms end-to-end; high concurrency; real-time pace, tone, and emotion; edge-friendly. Use for virtual assistants, live translation, game NPCs, and live-stream interaction.

Speech to Text: 100+ languages, dialect and accent support, domain terms (medical, legal, tech), noise robustness. Auto punctuation and paragraphs, speaker diarization, word-level timestamps, SRT/VTT/TXT. For subtitles, meeting notes, content indexing, and accessibility.

Sound Effect v2: Natural-language descriptions; physics-based and abstract sounds; mood and atmosphere; layered effects. Environment, object, abstract (sci-fi, fantasy), and transition/UI sounds. Control pitch, duration, intensity, space; envelopes, filters, multi-layer mix; multiple output formats.

AI Audio Isolation: Clean vocal and instrument separation (drums, bass, guitar, keys); background and multi-source separation. High quality, phase preservation, noise suppression; real-time capable. For music production, karaoke, post-production, and archival restoration.`
      },
      {
        title: 'Industry solutions',
        content: `Film and media: Auto dubbing, ADR, custom ambience, bulk subtitling. Games: Character and narrator voice, interactive ambience, UI sounds, dynamic mix. Enterprise and education: Training voiceover, demo narration, meeting notes, accessibility. Creative and art: Sound design for film and art, music production, installation and experimental sound.`
      },
      {
        title: 'Technical specs',
        content: `Audio: Up to 192kHz; 16/24/32-bit; WAV, MP3, FLAC, AAC, OGG; mono, stereo, 5.1, 7.1. Performance: Real-time to minute-scale; enterprise concurrency; storage and management; 99.9% API availability.`
      },
      {
        title: 'Professional workflow',
        content: `Dubbing: Script and timecode; choose voice and emotion; set pace, tone, intensity; batch generate; review and adjust; edit and mix; sync to picture. Sound design: Define concept and mood; describe in text; generate variants; tune parameters; layer and mix; export to pro formats.`
      },
      {
        title: 'Advanced tips',
        content: `Emotion: Base mood, temporal variation, cultural fit, and style (e.g. news vs. storytelling). Voice: Brand voice, character voice, regional and scenario tuning. Sound design: Physical modeling, abstract synthesis, emotion-to-sound mapping, 3D spatial design.`
      },
      {
        title: 'Quality control',
        content: `Auto: Naturalness, clarity, emotion accuracy; STT accuracy and recall; separation purity; sound-effect fit. Human: Emotion accuracy, technical standards, cultural suitability, commercial readiness.`
      },
      {
        title: 'Roadmap',
        content: `Richer emotion and real-time interaction; multimodal (voice, text, image); user-custom voice models. Singing synthesis, voice conversion, historical audio repair, 3D audio. Vertical solutions: healthcare, education, enterprise, and full API/developer support.`
      },
      {
        title: 'Try ElevenLabs on FuseAITools',
        content: `ElevenLabs on FuseAITools redefines voice and audio creation—pro tools in a simple workflow. Whether you make film, games, training, or art, you get the right audio solution in one platform. Turn ideas into professional audio.`
      }
    ]
  },
  veo3: {
    title: 'Veo 3',
    category: 'Video',
    showCategory: false,
    introFullWidth: true,
    intro: 'Google Veo 3 is Google\'s next-generation high-quality video generation model, built for cinematic-quality output. It combines advanced AI with fine motion control to deliver professional video for ads, social content, and film pre-visualization. Use Veo 3 on FuseAITools for text-to-video, first-and-last frame animation, reference-image-to-video, and video extension—all with 1080p output and flexible creative control.',
    features: [
      { name: 'Text to Video', path: '/home/veo3/text-to-video', description: 'Generate high-quality video from text with full creative control: style, motion, duration, and 1080p output.' },
      { name: 'First & Last to Video', path: '/home/veo3/first-and-last-to-video', description: 'Provide start and end frames; Veo 3 intelligently generates the in-between motion with smooth transitions.' },
      { name: 'Reference to Video', path: '/home/veo3/reference-to-video', description: 'Animate a single reference image into video while preserving style, characters, and environment.' },
      { name: 'Extend', path: '/home/veo3/extend', description: 'Extend existing clips with coherent extra seconds while keeping style and content consistency.' }
    ],
    sections: [
      {
        title: 'Core capabilities',
        content: `Text to Video: Create video from written descriptions with precise style control (cinematic, animation, documentary), dynamic motion (camera moves, object speed, rhythm), custom duration, and 1080p resolution. Ideal for ads, social shorts, product demos, and concept visualization.

First & Last to Video: Supply start and end frames; the model generates the motion in between. It predicts motion paths, keeps visual style consistent, and produces smooth transitions—even with multiple moving objects. Use it for product demos, dynamic charts, process flows, and educational videos.

Reference to Video: Turn a single reference image into coherent video while preserving style, character and object consistency, and atmosphere. Great for character animation, bringing scenes to life, illustration animation, and brand storytelling.

Extend: Add seamless extra content to existing clips. The model maintains coherence, style, and smooth transitions, with multiple duration options. Use for lengthening shorts, expanding scenes, continuing stories, or completing content.`
      },
      {
        title: 'Technical highlights',
        content: `Cinematic quality: 1080p output, realistic lighting and shadows, natural motion and physics, and detailed texture rendering.

Fine control: Camera control (push, pull, pan, tilt, aerial, dolly), motion parameters (speed curves, acceleration, trajectories), style presets (cinematic, animated, photorealistic, artistic), and timing (keyframes, rhythm).

Smart understanding: Deep scene understanding, physics-aware motion, emotional tone, and narrative coherence.`
      },
      {
        title: 'Who it’s for',
        content: `Creative professionals: Ad agencies for concept ads, film studios for pre-vis and storyboards, animation studios for concept validation, and social creators for high-quality content.

Businesses and brands: Marketing teams for product videos, training for how-to and educational content, PR for brand stories, and e‑commerce for product showcases.

Individual creators: YouTubers and TikTokers, digital artists, educators for teaching materials, and founders for product demos.`
      },
      {
        title: 'Typical workflow',
        content: `Define your concept (topic, style, duration), prepare inputs (text prompt, reference image, or video), set parameters (motion, style, resolution), generate a preview, refine as needed, then export the final 1080p video. Batch generation, saved presets, and versioning are supported for efficient production.`
      },
      {
        title: 'Technical specs',
        content: `Input: Text in multiple languages; images in JPG/PNG (e.g. 1920×1080 or higher); video in MP4 within duration limits.

Output: Up to 1080p (1920×1080), 24fps or 30fps, MP4 (H.264). Clip length typically from a few seconds up to 60 seconds. Optional watermark handling.`
      },
      {
        title: 'Use cases',
        content: `Advertising: Product launches, seasonal campaigns, A/B tests with different styles. Film and TV: Pre-vis, concept tests, VFX previews. Education: Explainer animations, training and how-to videos, dynamic course materials. Social media: Brand content, trend-based clips, and personalized video.`
      },
      {
        title: 'Quality and support',
        content: `Content is subject to safety and quality checks. Try Veo 3 on FuseAITools to turn ideas into professional video—whether for ads, social content, or film pre-visualization—with high quality and flexible control.`
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
    category: 'Video',
    showCategory: false,
    introFullWidth: true,
    intro: 'Wan is Alibaba\'s AI video model, offering affordable multi-shot 1080p generation with stable characters and synchronized native audio. Through the Wan—including T2V, I2V, and reference-guided modes—you can create up to 15-second cinematic videos with improved motion logic, consistent visuals, and production-ready quality.',
    features: [
      { name: 'Text to Video', path: '/home/wan/text-to-video', description: 'Generate video directly from text prompts. Supports Chinese and English, 1–5000 characters. Choose duration (5, 10, or 15 seconds), resolution (720p or 1080p), and shot composition (single continuous shot or multiple shots with transitions).' },
      { name: 'Image to Video', path: '/home/wan/image-to-video', description: 'Animate static images with text guidance. Provide image URLs (min 256×256px; JPEG, PNG, WebP; max 10MB), add a prompt describing the motion or scene, and set duration, resolution, and multi-shot style. Perfect for bringing illustrations, product shots, or concept art to life.' },
      { name: 'Video to Video', path: '/home/wan/video-to-video', description: 'Transform existing video with new prompts. Upload a video URL (MP4, MOV, MKV; max 10MB), describe the desired changes or style transfer in text, and control duration (5 or 10 seconds), resolution, and shot composition. Ideal for restyling, content adaptation, or creative remixing.' }
    ],
    sections: [
      {
        title: 'Platform philosophy',
        content: `Motion meets imagination: Wan bridges the gap between static concepts and dynamic storytelling. Whether you're starting from text, an image, or existing footage, Wan gives you the tools to craft video content with the same ease as generating an image.

Flexible, fast, and accessible: With support for both Chinese and English, multiple duration options, and resolution choices from web-ready to HD, Wan adapts to your workflow—from quick social clips to polished creative projects.`
      },
      {
        title: 'Core capabilities',
        content: `Text to Video

Prompt: Natural language in Chinese or English, 1–5000 characters.

Duration: 5 seconds (quick loops), 10 seconds (standard clips), or 15 seconds (extended scenes).

Resolution: 720p (fast, web-optimized) or 1080p (Full HD, higher detail).

Shot composition: Single continuous shot for simplicity, or multi-shot with transitions for narrative flow.

Use cases: Concept visualization, ad creatives, social media content, storyboarding.

Image to Video

Input: Image URL(s) required; minimum 256×256px; formats JPEG, PNG, WebP; max 10MB per image.

Prompt: Describe the animation, motion, or scene evolution (1–5000 characters).

Duration: 5, 10, or 15 seconds.

Resolution: 720p or 1080p.

Shot composition: Same multi-shot controls as text-to-video.

Use cases: Animating illustrations, product demos, character movement, bringing concept art to life.

Video to Video

Input: Video URL required; formats MP4, MOV, MKV; max 10MB.

Prompt: Describe the transformation—style transfer, content change, mood shift, etc. (1–5000 characters).

Duration: 5 or 10 seconds (output length may differ from input).

Resolution: 720p or 1080p.

Shot composition: Single or multi-shot, with ability to reinterpret original footage.

Use cases: Restyling existing content, adapting videos for different platforms, creative remixing, consistent brand video generation.`
      },
      {
        title: 'Use cases',
        content: `Social media content: Generate short videos for TikTok, Instagram Reels, YouTube Shorts—in the right duration and resolution.

Advertising and marketing: Create product demos, brand stories, and promotional clips from text briefs or existing assets.

Creative projects: Animate illustrations, bring storyboards to life, experiment with video styles and transitions.

Educational content: Produce explainer videos, visual aids, and short tutorials without complex editing software.

Concept validation: Quickly visualize video ideas before committing to full production.

Content adaptation: Transform existing videos for different audiences, platforms, or brand guidelines.`
      },
      {
        title: 'Technical performance',
        content: `Text-to-video generation: 30–90 seconds for 5s clips, 60–180 seconds for 15s clips (dependent on resolution and shot complexity).

Image-to-video: 40–120 seconds; image complexity and desired motion affect speed.

Video-to-video: 60–180 seconds; depends on input length, transformation complexity, and resolution.

Concurrency: Supports 50+ parallel requests with intelligent queue management.

Prompt length: Up to 5000 characters across all modes.

Input formats: JPEG, PNG, WebP for images; MP4, MOV, MKV for videos (max 10MB each).

Output: MP4 format, delivered via secure URL or direct download.`
      },
      {
        title: 'Workflow',
        content: `Quick create (text-to-video): Write prompt → choose duration/resolution/shot style → generate → preview → iterate with refined prompt or parameters.

Animate assets (image-to-video): Upload image → describe desired motion → set parameters → generate multiple variations → select best animation.

Transform footage (video-to-video): Upload video → describe transformation → choose duration/resolution → generate → review → refine prompt if needed.

Batch production: Plan content calendar → generate multiple videos with consistent parameters → unify style across campaign assets.`
      },
      {
        title: 'Optimization tips',
        content: `Prompt crafting: Be specific about motion, scene changes, and style. Example: "A product rotating slowly on a white background, studio lighting, smooth 360-degree view" vs. just "product video."

Duration strategy: Use 5s for loops and quick social clips; 10–15s for storytelling or demonstrations.

Resolution choice: 720p for drafts, quick reviews, and web-first content; 1080p for final assets, presentations, and HD platforms.

Shot composition: Single shot works best for focused subjects; multi-shot adds narrative depth—use when you need scene changes or progression.

Image quality: For image-to-video, higher resolution inputs (ideally 1024×1024 or larger) yield smoother animations.

Video-to-video prompts: Be explicit about what to change—style, mood, objects, background—and what to preserve.

Cost efficiency: Match duration and resolution to platform requirements; batch similar requests to reuse parameters.`
      },
      {
        title: 'Platform advantages',
        content: `Multilingual support: Generate from prompts in Chinese or English—seamless for global teams.

Flexible input modes: Text, image, or video—start from wherever your creative process begins.

Duration control: 5, 10, or 15 seconds—fit any platform's requirements.

HD quality: Up to 1080p resolution for professional-grade output.

Shot composition: Single or multi-shot—choose the right narrative structure.

Ease of use: Intuitive parameters, no video editing expertise required.

Best for: Social media managers, marketers, content creators, educators, advertisers, and anyone needing fast, high-quality video generation.`
      },
      {
        title: 'Try Wan on FuseAITools',
        content: `Wan on FuseAITools makes video creation as simple as writing a sentence. Whether you're generating from scratch, animating images, or transforming existing footage, Wan delivers professional results in seconds. With full control over duration, resolution, and shot style, it's the all-in-one video solution for modern creators. Start bringing your ideas to motion today.`
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
    intro: 'Kling is the latest AI video generation model from Kuaishou Kling, designed for text-to-video and image-to-video creation. Compared to earlier versions, it features better prompt adherence, more fluid motion, consistent artistic styles, and realistic physics simulation.',
    features: [
      { name: 'v2.5 Turbo I2V Pro', path: '/home/kling/v2-5-turbo-image-to-video-pro', description: 'Image-to-video with tail frame option, duration 5/10s, negative prompt, CFG scale. Max prompt 2500 characters.' },
      { name: 'v2.5 Turbo T2V Pro', path: '/home/kling/v2-5-turbo-text-to-video-pro', description: 'Text-to-video with aspect ratio 16:9, 9:16, 1:1; duration 5/10s; negative prompt and CFG scale.' },
      { name: '2.6 Text to Video', path: '/home/kling/v2-6-text-to-video', description: 'Text-to-video with sound on/off, aspect ratio 1:1/16:9/9:16, duration 5/10s.' },
      { name: '2.6 Image to Video', path: '/home/kling/v2-6-image-to-video', description: 'Image-to-video with sound, duration 5/10s. Single image input.' },
      { name: '2.6 Motion Control', path: '/home/kling/v2-6-motion-control', description: 'Reference image + reference video; character orientation (image/video); 720p/1080p.' },
      { name: '3.0 Motion Control', path: '/home/kling/v3-0-motion-control', description: 'Reference image + reference video; optional prompt; std/pro mode; character orientation and background source.' },
      { name: 'AI Avatar Standard', path: '/home/kling/ai-avatar-standard', description: 'Avatar image + audio to talking-head video. Prompt max 5000 characters.' },
      { name: 'AI Avatar Pro', path: '/home/kling/ai-avatar-pro', description: 'High-quality avatar image + audio to talking-head video. Prompt max 5000 characters.' },
      { name: '3.0 Video', path: '/home/kling/v3-0-video', description: 'Single shot or multi-shot; image refs; duration 3–15s; sound. std/pro mode.' }
    ],
    sections: [
      {
        title: 'Platform philosophy',
        content: `Motion and creativity: Kling brings Kuaishou's latest video models into a unified workflow. From text or image to video, motion control with reference assets, AI avatars driven by audio, to 3.0 multi-shot storytelling—each mode is tuned for quality, prompt adherence, and fluid motion.

Multi-mode first: Nine distinct modes cover text-to-video, image-to-video, motion control, talking-head avatars, and advanced 3.0 single/multi-shot. Choose the right mode for your project without leaving the platform.`
      },
      {
        title: 'Core capabilities',
        content: `v2.5 Turbo

Image-to-video Pro: Single image (optional tail frame), duration 5s or 10s, negative prompt and CFG scale. Prompt up to 2500 characters.

Text-to-video Pro: Aspect ratio 16:9, 9:16, 1:1; duration 5s or 10s; negative prompt and CFG scale for fine control.

2.6 series

Text to Video: Sound on/off, aspect ratio 1:1, 16:9, 9:16; duration 5s or 10s.

Image to Video: Single image input, sound, duration 5s or 10s.

Motion Control: Reference image plus reference video; character orientation from image or video; output 720p or 1080p.

AI Avatar

Standard and Pro: Upload avatar image and audio; generate talking-head video. Prompt up to 5000 characters. Pro tier for higher quality output.

3.0 Video

Single shot or multi-shot; image references; duration 3–15 seconds; optional sound; standard or pro mode.`
      },
      {
        title: 'Use cases',
        content: `Social and short-form: Create text-to-video or image-to-video clips for TikTok, Reels, and Shorts with flexible aspect ratio and 5–10s duration.

Motion control: Use reference image and video to steer character pose and motion for consistent, controllable results.

AI avatars: Turn avatar image and voiceover into talking-head videos for explainers, dubbing, and personalized content.

Multi-shot storytelling: Use 3.0 Video with multiple image references and 3–15s duration for scenes and narrative clips.

Advertising and marketing: Animate product shots and concept art with v2.5 Turbo or 2.6; add motion control or avatars as needed.`
      },
      {
        title: 'Technical performance',
        content: `Prompt length: Up to 2500 characters (v2.5 Turbo); up to 5000 characters (AI Avatar, others as per mode).

Input: Image(s) JPEG/PNG/WebP; video for motion control; audio for AI Avatar. Size and format limits follow each mode.

Duration: 5s or 10s (v2.5, 2.6); 3–15s (3.0 Video).

Resolution: 720p or 1080p where applicable (e.g. motion control, 2.6); aspect ratios 1:1, 16:9, 9:16 (and 21:9 for some modes).

Output: Video via URL or download; optional sound where supported.`
      },
      {
        title: 'Workflow',
        content: `Choose mode: Pick the Kling mode that matches your goal—v2.5 Turbo I2V/T2V, 2.6 text/image/motion, AI Avatar Standard/Pro, or 3.0 Video.

Upload assets: Provide image(s), and for motion control add reference video; for AI Avatar add audio.

Set parameters: Select duration, aspect ratio, resolution, and options (sound, negative prompt, CFG, etc.) as shown in the form.

Generate: Submit and wait for the result; preview in the result panel and download when ready.`
      },
      {
        title: 'Optimization tips',
        content: `Prompt crafting: Be specific about motion, style, and composition. For avatars, clear speech and consistent tone in the audio improve lip-sync and expression.

Mode choice: Use v2.5 Turbo for fast, high-quality text/image-to-video; 2.6 for sound and motion control; AI Avatar for talking-head; 3.0 for multi-shot and longer clips.

Resolution and duration: Match duration to platform (e.g. 5–10s for shorts). Use 1080p when the mode supports it for final deliverables.`
      },
      {
        title: 'Try Kling on FuseAITools',
        content: `Kling on FuseAITools brings Kuaishou's latest video models to your workflow. From text or image to video, motion control, AI avatars, and 3.0 multi-shot—choose the right mode and create video in seconds.`
      }
    ]
  },
  seedance: {
    title: 'Seedance',
    category: 'Video',
    showCategory: false,
    introFullWidth: true,
    intro: 'Seedance is a multimodal AI video model by ByteDance that generates consistent, cinematic videos with strong multi-shot consistency and native audio using text, image, video, and audio references.',
    features: [
      { name: 'v1 Lite Text to Video', path: '/home/seedance/v1-lite-text-to-video', description: 'Fast, efficient text-to-video generation. Choose aspect ratios from 16:9 to 9:21, resolution up to 1080p, duration 5 or 10 seconds. Fixed camera option, seed control, and safety checker included.' },
      { name: 'v1 Lite Image to Video', path: '/home/seedance/v1-lite-image-to-video', description: 'Animate images quickly with optional end image for controlled transitions. Same resolution, duration, and camera controls as Lite Text to Video. Ideal for rapid prototyping and social content.' },
      { name: 'v1 Pro Text to Video', path: '/home/seedance/v1-pro-text-to-video', description: 'Professional text-to-video with expanded aspect ratios (21:9 to 9:16). Choose 480p/720p/1080p, 5s/10s duration, seed control, and safety checker. Higher quality output for production-ready assets.' },
      { name: 'v1 Pro Image to Video', path: '/home/seedance/v1-pro-image-to-video', description: 'Professional image animation with enhanced quality and detail. Full resolution and duration options, camera control, seed, and safety checker. Perfect for brand content and creative projects.' },
      { name: 'v1 Pro Fast Image to Video', path: '/home/seedance/v1-pro-fast-image-to-video', description: 'Ultra-fast image-to-video generation without compromising quality. 720p or 1080p resolution, 5s or 10s duration, and support for prompts up to 10,000 characters. Optimized for speed when you need results now.' },
      { name: 'v1.5 Pro', path: '/home/seedance/v1-5-pro', description: 'Text-to-video or image-to-video in one mode. Prompt 3-2500 chars, optional 0-2 image inputs, aspect ratio 1:1 to 21:9, 480p/720p/1080p, duration 4/8/12s, fixed lens, and optional audio generation.' }
    ],
    sections: [
      {
        title: 'Platform philosophy',
        content: `Choice without compromise: Seedance recognizes that different projects have different needs. Lite tier delivers speed and efficiency for rapid iteration; Pro tier offers enhanced quality for final assets. Both tiers share intuitive controls, so you can move seamlessly between them.

Precision meets creativity: With aspect ratio support from ultra-wide 21:9 to vertical 9:21, camera control options, and seed-based reproducibility, Seedance puts professional video creation tools in your hands—without the complexity of traditional video editing.`
      },
      {
        title: 'Core capabilities',
        content: `v1 Lite

Text to Video: Aspect ratios: 16:9, 4:3, 1:1, 3:4, 9:16, 9:21. Resolution: 480p (fastest), 720p (balanced), or 1080p (HD). Duration: 5s or 10s. Camera: Fixed option for stable shots. Seed: Set for reproducibility (-1 for random). Safety checker: Optional content filtering.

Image to Video: Input image URL (JPEG, PNG, WebP; max 10MB; min 256×256px). Optional end image URL for controlled transitions. Same resolution, duration, camera, and seed controls as text-to-video.

v1 Pro

Text to Video: All Lite aspect ratios plus 21:9 ultra-wide. Same resolution and duration options. Enhanced quality model for superior detail, lighting, and motion coherence.

Image to Video: Professional-grade image animation with improved motion understanding and visual fidelity. Full resolution options, camera control, seed, safety checker.

Pro Fast Image to Video: Optimized pipeline for speed. 720p or 1080p resolution, 5s or 10s duration, prompt support up to 10,000 characters. Delivers quality results in a fraction of the time.`
      },
      {
        title: 'Use cases',
        content: `Social media content: Create videos for TikTok, Instagram Reels, YouTube Shorts with platform-optimized aspect ratios (9:16 for vertical, 16:9 for horizontal).

Advertising campaigns: Generate product demos, brand stories, and promotional clips with consistent quality across formats.

Rapid prototyping: Use Lite tier to explore video concepts quickly before committing to final production.

Creative projects: Animate illustrations, bring concepts to life, experiment with camera movements and transitions.

Content repurposing: Transform existing images into engaging video content for multiple platforms.

Professional productions: Leverage Pro tier for client work, presentations, and assets requiring high visual fidelity.`
      },
      {
        title: 'Technical performance',
        content: `v1 Lite Text/Image to Video: 20–60 seconds for 5s clips, 40–90 seconds for 10s clips (dependent on resolution and complexity).

v1 Pro Text/Image to Video: 40–120 seconds for 5s clips, 80–180 seconds for 10s clips—higher quality requires additional processing.

v1 Pro Fast Image to Video: 15–40 seconds for 5s clips, 30–70 seconds for 10s clips—optimized for speed.

Concurrency: Supports 50+ parallel requests with intelligent queue management.

Prompt length: Up to 10,000 characters for Pro Fast Image to Video; standard limits apply for other modes.

Input formats: JPEG, PNG, WebP for images; max 10MB per file.

Output: MP4 format, delivered via secure URL or direct download.

Aspect ratio support: From 21:9 ultra-wide cinematic to 9:21 vertical—cover all modern formats.`
      },
      {
        title: 'Workflow',
        content: `Quick create (Lite): Write prompt → choose aspect ratio/resolution/duration → set camera/seed → generate → preview → iterate.

Professional production (Pro): Develop concept → refine prompt for detail → select Pro tier and parameters → generate multiple variations → select best → optional refinement with seed control.

Image animation: Upload image → describe motion or scene evolution → choose tier and parameters → generate → review → adjust prompt or end image as needed.

Batch campaigns: Plan content calendar → generate multiple videos with consistent aspect ratios and quality settings → unify brand style across assets.`
      },
      {
        title: 'Optimization tips',
        content: `Tier selection: Use Lite for drafts, internal reviews, and rapid iteration; use Pro for client deliverables, public campaigns, and high-visibility content.

Aspect ratio strategy: Match to platform—9:16 for TikTok/Reels/Shorts, 16:9 for YouTube/websites, 21:9 for cinematic presentations.

Resolution choice: 480p for quick tests and low-bandwidth sharing; 720p for web and social; 1080p for HD platforms and archiving.

Duration planning: 5s works best for loops, transitions, and attention-grabbing moments; 10s allows for storytelling and demonstration.

Camera control: Use fixed camera for product focus and stable scenes; omit for dynamic, cinematic movement.

Seed management: Set specific seeds to reproduce successful results; use -1 for random exploration across generations.

Prompt engineering: Be specific about motion, style, and mood. For image-to-video, describe what should move and how.

Pro Fast advantage: Use when speed is critical—ideation sessions, last-minute content needs, high-volume testing.`
      },
      {
        title: 'Platform advantages',
        content: `Dual-tier flexibility: Lite for speed, Pro for quality—one platform, both options.

Wide aspect ratio support: From 21:9 cinematic to 9:21 vertical—every format covered.

Resolution options: 480p to 1080p—choose based on need and bandwidth.

Camera control: Fixed option for stability or dynamic for creativity.

Seed reproducibility: Consistent results across sessions for brand continuity.

Ultra-long prompts: Up to 10,000 characters for detailed direction in Pro Fast mode.

Fast image-to-video: Dedicated Pro Fast pipeline when time matters most.

Best for: Social media managers, marketers, content creators, advertisers, creative agencies, and anyone needing flexible, high-quality video generation.`
      },
      {
        title: 'Try Seedance on FuseAITools',
        content: `Seedance on FuseAITools puts professional video creation at your fingertips—whether you need lightning-fast drafts or production-ready assets. With Lite and Pro tiers, comprehensive aspect ratio support, and full control over resolution, duration, camera, and seed, Seedance adapts to your creative process. Start transforming text and images into compelling video today.`
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
