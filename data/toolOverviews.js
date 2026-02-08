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
  'gpt-4o-image': {
    title: 'GPT 4o Image',
    category: 'Image',
    showCategory: false,
    introFullWidth: true,
    intro: 'OpenAI\'s vision-capable GPT-4o drives both image generation and natural-language image editing. Describe what you want or upload a reference—create new art, edit existing images, refine composition and style, and iterate in one conversation. Built for concept art, marketing assets, and fast visual iteration; all without leaving the chat.',
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
    intro: 'Flux Kontext delivers high-fidelity image generation with fine control over style and composition. Choose Pro for balanced quality and speed, or Max for top-tier fidelity—both from a single text prompt. Produce photorealistic or artistic visuals for concept art, social content, and design mockups. Use Flux Kontext on FuseAITools to find the right balance for every project.',
    features: [
      { name: 'Generate', path: '/home/flux-kontext/generate', description: 'Pro or Max: single-prompt photorealistic or artistic images with style, composition, and lighting control.' }
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
    intro: 'Nano Banana is a lightweight, fast image model: text-to-image for quick ideation, image-to-image for style transfer and edits, and a Pro tier for higher fidelity and control. Built for rapid prototyping, social graphics, and workflows where speed and cost matter without sacrificing quality. Use Nano Banana on FuseAITools to ship visuals fast.',
    features: [
      { name: 'Text to Image', path: '/home/nano-banana/generate', description: 'Sub-20s generation; social sizes (1080×1080, 1080×1920), web and 16:9; style and mood presets.' },
      { name: 'Image to Image', path: '/home/nano-banana/edit', description: 'Style and theme transfer, detail polish, natural-language edit; batch style unification.' },
      { name: 'Pro Generate', path: '/home/nano-banana/pro-generate', description: 'Up to 4K, fine detail and color; composition, style, and lighting control for final assets.' }
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
    intro: 'OpenAI Sora delivers professional-grade text-to-video and image-to-video generation. Pro tiers support higher fidelity and longer clips; the platform also includes a watermark remover and Pro Storyboard for planning shots and sequences. Use Sora on FuseAITools for ads, concept reels, narrative and commercial video—all in one place.',
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
  }
}

/** 根据父路径取 key，例如 /home/runway -> runway */
export function getToolOverviewKey(path) {
  const match = path.match(/^\/home\/([^/]+)\/?$/)
  return match ? match[1] : null
}
