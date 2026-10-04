# News Article: Wan-Video Complete Guide — From Beginner to Pro (English)

From an open-source 1.3B model that runs in 8.19 GB of VRAM to a cloud-native All-in-One model that generates 30 seconds of 1080p video from a product PPT — Alibaba's Wan-Video (万相) family draws one of the most complete arcs in AI video generation: open community first, commercial production second.

Wan-Video is the multimodal visual generation model family from Alibaba's Tongyi Lab, spanning both image and video generation. Its defining traits are comprehensiveness and openness: it ships models at different scales for efficiency-versus-quality trade-offs, and it open-sources both code and weights on GitHub. In parallel, Alibaba Cloud's Bailian platform exposes the commercial API — Wan 3.0-Video — with 30-second long-form generation and multimodal reference capabilities.

This complete guide walks every version from Wan 2.1 to Wan 3.0, all seven core features, hands-on tutorials, prompt formulas with real examples, and honest limitations.

---

### title
Wan-Video Complete Guide: From Beginner to Pro — Alibaba's Open-Source to Cloud AI Video Generation Platform

### path
`wan-video-complete-guide-beginner-to-pro`

### description
Wan-Video (万相) is Alibaba Tongyi Lab's multimodal visual generation model family covering image and video creation. From the open-source Wan 2.1/2.2 (1.3B runs in 8.19GB VRAM) to the production-grade Wan 3.0 cloud API (30-second 1080p generation, first-and-last-frame control, up to 10 reference images + 5 videos + 5 audio tracks, document and webpage parsing, native audio-sync, multi-shot narrative), this from-beginner-to-pro guide explains the full version roadmap, seven core capabilities, tutorials for both local deployment and cloud API, five prompt techniques with real examples, ideal use cases, limitations, and answers to the seven most common questions.

### keyword
Wan-Video, Wan 万相, Alibaba Tongyi Lab, Wan 3.0, Wan 3.0-Video, Wan 2.1, Wan 2.2, open source video model, text-to-video, image-to-video, first-and-last-frame control, reference-to-video, multimodal reference, document parsing, native audio sync, multi-shot narrative, Bailian API, AI video generation, FuseAI Tools

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wan-Video Complete Guide: From Beginner to Pro — Alibaba's Open-Source to Cloud AI Video Generation Platform</title>
</head>
<body>
    <article class="ai-model-comparison" style="background:var(--wan-bg, #0b0d12);background-image:radial-gradient(ellipse 70% 55% at 50% 0, rgba(124,58,237,.10), transparent),radial-gradient(ellipse 55% 45% at 100% 85%, rgba(37,99,235,.08), transparent),linear-gradient(180deg, #14161f, #0b0d12);color:#e5e7eb;padding:20px;border-radius:12px;">

        <section class="introduction">
            <p style="color:#d1d5db;">Alibaba Cloud's <strong>Wan-Video</strong> (万相) is not a single model — it is a complete visual generation ecosystem. Backed by Alibaba's Tongyi Lab, the Wan family covers both image generation and video generation, built to deliver <strong>end-to-end creation from text, to pictures, to video.</strong></p>

            <p style="color:#d1d5db;">What makes Wan-Video stand out is its twin-track strategy of <strong>comprehensive openness and commercial production:</strong> it publishes open-source weights and source code on GitHub for researchers and developers to download, deploy, and customize freely, while simultaneously offering the Wan 3.0-Video cloud API through Alibaba Cloud's Bailian (百炼) platform for enterprises that need 30-second long-form video and multimodal reference workflows.</p>

            <p style="color:#d1d5db;">Whether you are a developer running models on a consumer GPU or a creative team building ad campaigns through an API, this guide takes you from the open-source fundamentals to the commercial frontier of the Wan family.</p>

            <p style="color:#d1d5db;">Generate AI video with the Wan series on FuseAITools: <a href="https://www.fuseaitools.com/home/wan" style="color:#60a5fa;">Wan Video Hub</a>.</p>
        </section>

        <section class="what-is-wan">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">I. What Is Wan-Video?</h2>

            <p style="color:#d1d5db;">Wan-Video is the advanced multimodal visual generation model family from Alibaba's Tongyi Lab, covering two domains — <strong>image generation</strong> and <strong>video generation</strong>. Positioned as a comprehensive and open collection of video foundation models, its core mission is to push the boundaries of video generation and provide a full-chain generation capability that starts from text or images and ends in video.</p>

            <p style="color:#d1d5db;">Two features define Wan-Video more than any benchmark score:</p>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;"><strong style="color:#a78bfa;">Scale flexibility:</strong> models at different sizes serve different efficiency-versus-quality needs, from a 1.3B parameter model for consumer GPUs to a 14B flagship and cloud-native production tiers.</li>
                <li style="margin-bottom:6px;"><strong style="color:#a78bfa;">Openness:</strong> source code and all model weights are publicly available on GitHub, actively fueling research and the video generation community — an unusual move for a major cloud vendor.</li>
            </ul>

            <p style="color:#d1d5db;">The open-source community line (Wan 2.1, Wan 2.2) and the commercial cloud API line (Wan 3.0-Video) complement each other: community users deploy open models locally for research and customization, while enterprise users call the Bailian cloud API for commercial capabilities such as <strong>30-second long video generation</strong> and <strong>multimodal reference generation</strong>.</p>
        </section>

        <section class="model-evolution">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">II. Core Model Evolution: From Open-Source Foundation to All-in-One Production</h2>

            <p style="color:#d1d5db;">The Wan family has iterated through several generations, each with a clear positioning — from the open-source foundation models to the all-around production model.</p>

            <h3 style="color:#f3f4f6;">1. Open-Source Line: Wan 2.1 and Wan 2.2</h3>
            <p style="color:#d1d5db;"><strong>Wan 2.1</strong> established the technical roadmap of the series. Built on the diffusion-transformer (DiT) paradigm, it achieved a major breakthrough in video generation through a new VAE, a scalable pre-training strategy, and large-scale data curation. Wan 2.1 ships in two sizes:</p>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;"><strong style="color:#a78bfa;">14B (14 billion parameters):</strong> trained on a massive dataset of billions of images and videos; outperforms existing open models and several commercial solutions across internal and external benchmarks.</li>
                <li style="margin-bottom:6px;"><strong style="color:#a78bfa;">1.3B (1.3 billion parameters):</strong> built for resource efficiency — it runs in only <strong>8.19 GB of VRAM</strong> and is compatible with a wide range of consumer GPUs.</li>
            </ul>

            <p style="color:#d1d5db;"><strong>Wan 2.2</strong> extends Wan 2.1 with multi-GPU inference, FP8 quantization, and LoRA training support. Its headline addition is the <strong>Speech-to-Video (S2V)</strong> task, which generates video directly from speech and pairs with <strong>CosyVoice</strong> text-to-speech to enable one-step audio-video creation.</p>

            <h3 style="color:#f3f4f6;">2. Commercialization Line: Wan 2.5 to Wan 3.0</h3>
            <p style="color:#d1d5db;">Starting with <strong>Wan 2.5</strong>, the series kept its open-source ecosystem while moving toward productivity tools — Wan 2.5 introduced audio-supported short video generation and 480P test capabilities. <strong>Wan 2.6</strong> and <strong>Wan 2.7</strong> pushed multi-shot narrative and native audio-video sync: the former uses more explicit shot control, and the latter supports multi-shot transitions described in natural language.</p>

            <p style="color:#d1d5db;"><strong>Wan 3.0</strong> entered public beta in <strong>August 2026</strong> as an All-in-One reference-based video generation model built for production environments. It generates up to <strong>30 seconds of 1080P video in a single pass</strong> and supports complex camera language such as continuous camera movement and one-take (一镜到底) shots.</p>

            <h3 style="color:#f3f4f6;">3. Version Comparison at a Glance</h3>
            <div style="overflow-x:auto;margin:16px 0;">
                <table style="width:100%;border-collapse:collapse;color:#d1d5db;font-size:14px;">
                    <thead>
                        <tr style="background:rgba(55,65,81,0.4);">
                            <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Version</th>
                            <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Key Features</th>
                            <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Best For</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#a78bfa;">Wan 2.2</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Open-source base model; 1.3B/14B dual versions; runs in 8.19GB VRAM</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Local deployment, academic research, dev testing</td></tr>
                        <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#a78bfa;">Wan 2.5</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Audio support; 480P short video</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Quick visual drafts, fast testing</td></tr>
                        <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#a78bfa;">Wan 2.6</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Explicit multi-shot control; native audio</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Structured storyboard narratives</td></tr>
                        <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#a78bfa;">Wan 2.7</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Natural-language multi-shot control; first/last-frame control</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Scene-sequence descriptive creation</td></tr>
                        <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#a78bfa;">Wan 3.0</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">30s native duration; all-modality reference; document parsing</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Commercial production, ad marketing, short dramas</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="core-capabilities">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">III. Core Capabilities Explained</h2>

            <h3 style="color:#f3f4f6;">1. Text-to-Video</h3>
            <p style="color:#d1d5db;">Describe a scene in text and the model generates the corresponding video. Wan 3.0 outputs up to <strong>30 seconds of 1080P HD video in one generation</strong>, with deeply optimized prompt adherence that faithfully reproduces complex motion trajectories and physical dynamics.</p>
            <p style="color:#d1d5db;">For prompts, structured formulas work best:</p>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;"><strong style="color:#a78bfa;">Basic formula — Subject + Scene + Motion:</strong> ideal for first-time users. The more accurate and rich the description, the higher the output quality.</li>
                <li style="margin-bottom:6px;"><strong style="color:#a78bfa;">Advanced formula — Subject description + Scene description + Motion description + Aesthetic control + Stylization:</strong> for experienced users, adding richer detail on top of the basics boosts texture quality and storytelling.</li>
            </ul>
            <p style="color:#d1d5db;">Try text-to-video on FuseAITools: <a href="https://www.fuseaitools.com/home/wan/text-to-video" style="color:#60a5fa;">Wan Text to Video</a>.</p>

            <h3 style="color:#f3f4f6;">2. Image-to-Video</h3>
            <p style="color:#d1d5db;">Upload a static image as reference, and the model continues it into a motion video. Wan 3.0 delivers more stable, natural motion while keeping the subject's identity and visual style highly consistent with the source image. Image-to-video prompts should <strong>focus on describing the motion to be added</strong>, not re-describing what already exists in the image. The formula is <strong>Motion + Camera movement</strong> — control shots with instructions like "camera pushes in" or "camera moves left."</p>
            <p style="color:#d1d5db;">Animate a still image on FuseAITools: <a href="https://www.fuseaitools.com/home/wan/image-to-video" style="color:#60a5fa;">Wan Image to Video</a>.</p>

            <h3 style="color:#f3f4f6;">3. First-and-Last-Frame Control</h3>
            <p style="color:#d1d5db;">Provide both a start frame and an end frame; the model generates the transition video between them. This is for scenes that need precisely controlled narrative start and end points and controllable transitions — for example, a product's form change or a character moving between scenes. Wan 2.5 and above support this feature steadily.</p>

            <h3 style="color:#f3f4f6;">4. Reference-Based Video Generation</h3>
            <p style="color:#d1d5db;">Wan 3.0 supports mixing multiple types of reference material in a single task. Per task you can feed up to:</p>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;"><strong style="color:#a78bfa;">10 images:</strong> lock character design, art style, prop style, and scene mood.</li>
                <li style="margin-bottom:6px;"><strong style="color:#a78bfa;">5 videos:</strong> provide reference for camera language and action rhythm.</li>
                <li style="margin-bottom:6px;"><strong style="color:#a78bfa;">5 audio clips:</strong> control voice style, dialogue tone, and background music mood.</li>
            </ul>
            <p style="color:#d1d5db;">Images, videos, text, and audio can be combined freely; the model absorbs the key information from all references to keep the entire video stylistically unified.</p>
            <p style="color:#d1d5db;">Generate from references on FuseAITools: <a href="https://www.fuseaitools.com/home/wan/v2-7-r2v" style="color:#60a5fa;">Wan Reference-to-Video (R2V)</a>.</p>

            <h3 style="color:#f3f4f6;">5. Document & Webpage Parsing</h3>
            <p style="color:#d1d5db;">A signature capability that sets Wan 3.0 apart from most video models — it is the first to accept office documents and webpage links as input references:</p>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;">Supported formats: <strong>doc, xls, ppt, pdf, md</strong>.</li>
                <li style="margin-bottom:6px;">Limits: a single file or link up to <strong>100 MB / 50 pages</strong>.</li>
            </ul>
            <p style="color:#d1d5db;">The model parses the document's hierarchy, layout, and data relationships, converting product specs, selling-point structures, and image-text layouts into video frames. Upload a product introduction PPT, for example, and Wan extracts the key information automatically to produce a promotional short film.</p>

            <h3 style="color:#f3f4f6;">6. Native Audio-Visual Sync</h3>
            <p style="color:#d1d5db;">Wan 3.0 supports native audio-visual sync generation: the model can automatically match background music and sound effects to the visuals, or accept external audio as a driver to align a character's lip movements and actions with the audio rhythm. Wan 2.5 and above all support audio-aware generation.</p>
            <p style="color:#d1d5db;">In the prompt, sound descriptions sit alongside visual descriptions. The formula is <strong>Subject + Scene + Motion + Sound description (voice / sound effects / background music)</strong>, structured as:</p>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;"><strong style="color:#a78bfa;">Voice</strong> = spoken content + emotion + tone + speaking speed + timbre + accent</li>
                <li style="margin-bottom:6px;"><strong style="color:#a78bfa;">Sound effects</strong> = description of the concrete sound event</li>
                <li style="margin-bottom:6px;"><strong style="color:#a78bfa;">Background music</strong> = musical style and mood</li>
            </ul>

            <h3 style="color:#f3f4f6;">7. Multi-Shot Coherent Narrative</h3>
            <p style="color:#d1d5db;">Wan 2.6 and Wan 2.7 introduced multi-shot coherent narrative generation. Users control shot structure, camera position, and timing through prompts while keeping key elements — subject, scene, atmosphere — consistent across shots.</p>
            <p style="color:#d1d5db;">The multi-shot prompt structure is <strong>Overall description + Shot number + Timestamp + Shot content</strong>:</p>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;"><strong style="color:#a78bfa;">Overall description:</strong> briefly summarize the story theme, narrative style, and core emotion.</li>
                <li style="margin-bottom:6px;"><strong style="color:#a78bfa;">Shot number / timestamp:</strong> define where each shot starts and ends.</li>
                <li style="margin-bottom:6px;"><strong style="color:#a78bfa;">Shot content:</strong> describe that shot's visuals, action, and sound.</li>
            </ul>
            <p style="color:#d1d5db;">Wan 3.0 raises the multi-shot ceiling to <strong>30 seconds</strong>, making a complete one-take or continuously-moving shot narrative feasible in a single generation.</p>
            <p style="color:#d1d5db;">Build first/last-frame stories on FuseAITools: <a href="https://www.fuseaitools.com/home/wan/v2-7-image-to-video" style="color:#60a5fa;">Wan v2.7 Image to Video</a>.</p>
        </section>

        <section class="usage-tutorial">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">IV. Usage Tutorial</h2>

            <h3 style="color:#f3f4f6;">1. Preparation: Two Paths Into Wan-Video</h3>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Path A — Open-source local deployment (Wan 2.1 / Wan 2.2):</strong></p>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;">Hardware: the 1.3B model needs 8.19GB VRAM and runs on consumer GPUs; the 14B model needs higher specs.</li>
                <li style="margin-bottom:6px;">Software: Python environment with PyTorch &gt;= 2.4.0.</li>
                <li style="margin-bottom:6px;">Steps: <code style="background:#1f2937;padding:1px 6px;border-radius:4px;">git clone https://github.com/Wan-Video/Wan2.2.git</code>, then <code style="background:#1f2937;padding:1px 6px;border-radius:4px;">pip install -r requirements.txt</code>; install <code style="background:#1f2937;padding:1px 6px;border-radius:4px;">requirements_s2v.txt</code> for speech synthesis; finally download model weights from Hugging Face or ModelScope.</li>
            </ul>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Path B — Cloud API (Wan 3.0-Video):</strong></p>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;">Obtain an API key from Alibaba Cloud's Bailian (百炼) platform.</li>
                <li style="margin-bottom:6px;">Currently in invitation-based beta; some users can apply for public beta access.</li>
                <li style="margin-bottom:6px;">No local GPU required — call through the API.</li>
            </ul>

            <h3 style="color:#f3f4f6;">2. Step One: Choose a Generation Mode</h3>
            <div style="overflow-x:auto;margin:16px 0;">
                <table style="width:100%;border-collapse:collapse;color:#d1d5db;font-size:14px;">
                    <thead>
                        <tr style="background:rgba(55,65,81,0.4);">
                            <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Mode</th>
                            <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Input</th>
                            <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#a78bfa;">Text-to-Video</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Text description</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Ideation from scratch</td></tr>
                        <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#a78bfa;">Image-to-Video</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Image + text</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Animating static assets</td></tr>
                        <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#a78bfa;">First/Last-Frame Transition</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Start image + end image + text</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Precise control of start &amp; end states</td></tr>
                        <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#a78bfa;">Reference Generation</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Mixed image/video/audio + text</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Multi-element consistent creation</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 style="color:#f3f4f6;">3. Step Two: Write Structured Prompts</h3>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Text-to-video (advanced formula) example:</strong></p>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;">Subject description: a black-haired Miao ethnic-minority girl in traditional costume.</li>
                <li style="margin-bottom:6px;">Scene description: terraced rice fields wrapped in morning mist at dawn, layered mountains in the distance.</li>
                <li style="margin-bottom:6px;">Motion description: the girl slowly turns; her hair lifts in the breeze; the hem of her clothes sways gently.</li>
                <li style="margin-bottom:6px;">Aesthetic control: soft morning light from the side, medium shot, slow push-in.</li>
                <li style="margin-bottom:6px;">Stylization: photorealistic cinematic style, teal-and-warm color palette.</li>
            </ul>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Image-to-video:</strong> after uploading the image, describe only the motion — "The person smiles and waves at the camera, slowly raising an arm and swaying it side to side; a breeze rustles the rice paddies in the background. Fixed camera."</p>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Multimodal prompt with audio:</strong> "A man speaks in a dim recording studio. He says: 'Welcome to today's sharing,' with a calm tone, medium speed, deep voice. Minimal electronic ambient music plays quietly in the background."</p>

            <h3 style="color:#f3f4f6;">4. Step Three: Configure Generation Parameters</h3>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;">Duration &amp; resolution: Wan 3.0 supports 480P, 720P, and 1080P, with up to 30 seconds per generation.</li>
                <li style="margin-bottom:6px;">Reference material: upload reference images, videos, or audio to keep characters or styles consistent.</li>
                <li style="margin-bottom:6px;">Extension: Wan 3.0 supports smart duration recommendations and video extension on top of an already-generated clip.</li>
            </ul>

            <h3 style="color:#f3f4f6;">5. Step Four: Generate and Iterate</h3>
            <p style="color:#d1d5db;">Submit the task and the model begins processing. Generation time depends on video length, resolution, and complexity. Preview the result when done; if it is not ideal, adjust the prompt and regenerate, or use editing features for targeted fixes.</p>
        </section>

        <section class="prompting-tips">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">V. Prompt Techniques and Examples</h2>

            <h3 style="color:#f3f4f6;">1. Five Core Techniques</h3>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Technique 1 — Use the structured formula.</strong> Organize prompts with the advanced formula "subject + scene + motion + aesthetic control + stylization" so the model understands every dimension precisely.</p>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Technique 2 — For image-to-video, focus on motion.</strong> After uploading an input image, do not repeat what is already in it; only describe the motion and changes you want to add.</p>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Technique 3 — Describe dialogue and audio separately.</strong> For prompts containing human voice, explicitly state the spoken content, emotion, tone, and speaking speed.</p>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Technique 4 — Label multi-shot prompts with numbers and timestamps.</strong> Wan 2.6 and above support multi-shot control via structures like "Shot 1 (0-4s)" and "Shot 2 (5-8s)."</p>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Technique 5 — Make good use of prompt expansion.</strong> Wan models support automatic prompt extension to raise generation quality, especially for shorter prompts.</p>

            <h3 style="color:#f3f4f6;">2. Example Prompts</h3>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Nature scene:</strong> "Aerial view of Iceland's black sand beach; white waves crash against the black volcanic coastline while low clouds cast moving shadows. The camera pushes in slowly. Sound: continuous wave crashes and high-altitude wind."</p>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Product showcase:</strong> "Subject: a deep-blue ceramic coffee cup with fine matte texture. Scene: pure white background, soft overhead lighting. Motion: the cup slowly rotates for a 360-degree showcase. Aesthetic: clean commercial lighting, product photography style."</p>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Talking-head:</strong> "A woman in her early 30s sits facing the camera in a home studio and says: 'Today I'll show you three tips you can use right away,' with a relaxed, natural tone and medium speed. Low-volume Lo-Fi beats in the background. Warm key light, soft background blur."</p>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Multi-shot narrative (Wan 2.6 / 2.7):</strong> "Overall: a girl searches the forest for her lost necklace. Shot 1 (0-4s): wide shot — the girl walks through the trees, looking around. Shot 2 (5-9s): medium close-up — the girl bends down, picks up the necklace from the ground, and lights up with joy. Shot 3 (10-14s): close-up — the pendant glints in the sunlight as the girl fastens the necklace."</p>
        </section>

        <section class="use-cases-and-limits">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">VI. Use Cases and Limitations</h2>

            <h3 style="color:#f3f4f6;">1. Ideal Use Cases</h3>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Short-drama and short-video production.</strong> Wan 3.0's 30-second native long-form generation completes a full micro narrative in one pass, reducing visual discontinuities from multi-segment stitching, quickly producing script-matched draft footage, and cutting live-shoot costs.</p>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Ad marketing and brand promotion.</strong> Feed product images as references to generate dynamic product demo videos for short-video distribution channels; document parsing converts a product PPT into video material with one click.</p>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">UI and product demos.</strong> Document parsing is especially friendly to UI demos and data-chart animation, preserving chart and interface structure without garbled, broken text.</p>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Local development and academic research.</strong> The open-source line offers 1.3B and 14B models; the 1.3B runs in only 8.19GB of VRAM and fits consumer GPUs.</p>
            <p style="color:#d1d5db;"><strong style="color:#a78bfa;">Character-consistency-critical projects.</strong> Wan 3.0's all-around reference mode accepts up to 10 images, 5 videos, and 5 audio clips as reference material, keeping character design, prop details, and spatial relationships consistent across long videos.</p>

            <h3 style="color:#f3f4f6;">2. Limitations</h3>
            <p style="color:#d1d5db;"><strong style="color:#f59e0b;">Clear functional boundaries.</strong> Wan 3.0 does not support: Function Calling (tool invocation), web search, model fine-tuning (SFT), context caching, or batch asynchronous inference endpoints.</p>
            <p style="color:#d1d5db;"><strong style="color:#f59e0b;">No video continuation.</strong> You cannot append new footage to the end of an existing video. Full films longer than 30 seconds must be generated in multiple passes and stitched on your side.</p>
            <p style="color:#d1d5db;"><strong style="color:#f59e0b;">Long-video generation is still evolving.</strong> Wan 3.0 supports 30-second generation, but long-form output remains under continuous optimization — its benchmark long-narrative score is 64.3/100, meaning multi-scene coherent storytelling still has room to grow.</p>
            <p style="color:#d1d5db;"><strong style="color:#f59e0b;">Invitation-stage restrictions.</strong> Wan 3.0-Video is still in invitation-based beta and is not yet open to all users for public or commercial use.</p>
        </section>

        <section class="faq">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">VII. FAQ</h2>

            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Q1: Is Wan-Video open source?</strong><br>
            A: The Wan series follows a parallel open-source-plus-commercial model. The source code and model weights of Wan 2.1 and Wan 2.2 are fully open on GitHub for free download, deployment, and customization. Wan 3.0-Video, meanwhile, is offered commercially as an API service through Alibaba Cloud's Bailian platform.</p>

            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Q2: What hardware does the Wan 2.1 1.3B model require?</strong><br>
            A: The 1.3B version is extremely resource-efficient — it needs only 8.19GB of VRAM and is compatible with a wide range of consumer GPUs, making high-quality local video generation feasible on your own machine.</p>

            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Q3: How long a video can Wan 3.0 generate?</strong><br>
            A: Wan 3.0 generates up to 30 seconds of 1080P video in a single pass, supporting continuous camera movement, one-take shots, and multi-shot narratives. It does not support video continuation, so content beyond 30 seconds must be generated in segments and stitched together.</p>

            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Q4: What input modalities does Wan 3.0 support?</strong><br>
            A: Wan 3.0 accepts text, images, video, audio, documents (doc/xls/ppt/pdf/md), and webpage links. Each task accepts up to 10 images, 5 videos, and 5 audio clips, and the model automatically fuses multimodal reference information during generation.</p>

            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Q5: Does Wan support native audio-visual sync?</strong><br>
            A: Yes. Wan 2.5 and above support audio-aware video generation. Wan 3.0 can both auto-match background music and sound effects to the visuals, and accept external audio to drive lip and action alignment. A sound-description field in the prompt gives precise control over the audio.</p>

            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Q6: Which versions support multi-shot control?</strong><br>
            A: Wan 2.6 and Wan 2.7 support multi-shot coherent narrative generation. Wan 2.6 uses explicit shot control via a shot_type parameter; Wan 2.7 supports shot transitions described in natural language. Wan 3.0 supports one-take or multi-shot narratives within a single 30-second pass.</p>

            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Q7: What is the pricing for the Wan 3.0 API?</strong><br>
            A: Wan 3.0-Video is billed per second, with different unit prices across the three resolutions — 480P, 720P, and 1080P. For exact pricing, always refer to the latest announcement on Alibaba Cloud's Bailian platform.</p>
        </section>

        <section class="conclusion">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">VIII. Conclusion</h2>

            <p style="color:#d1d5db;">Wan-Video represents a critical step in AI video generation moving from "toy" toward "production tool." From the open-source Wan 2.1 to the production-oriented Wan 3.0, the Wan series answers the question with disciplined version iteration.</p>

            <p style="color:#d1d5db;">Wan 3.0 is the latest result of that trajectory. It pushes generation length to 30 seconds, making one-take continuous narratives possible. It expands the input range beyond text, image, audio, and video to include office documents and webpage links — moving the starting point of video generation from "one sentence" to "an entire brief." And it uses an all-around reference mode to solve character consistency, the key pain point of commercial production.</p>

            <p style="color:#d1d5db;">Of course, Wan 3.0 is not the end point. It is still in invitation-stage beta, does not support video continuation or web search, and its long-narrative capability still has room to improve. But the path Wan-Video has charted — nurturing an open-source community while steadily evolving toward commercial production — offers a reference model worth watching for the whole AI video industry.</p>

            <p style="color:#d1d5db;">For developers, content creators, and enterprises alike, Wan's open-source ecosystem and cloud API are complementary: local deployment suits technical exploration and custom development; cloud calls suit large-scale commercial production. Understanding its capability boundaries and choosing the right access path releases far more value than simply "trying it out."</p>

            <p style="color:#d1d5db;">Generate with the Wan series on FuseAITools: <a href="https://www.fuseaitools.com/home/wan/text-to-video" style="color:#60a5fa;">Wan Text to Video</a>, <a href="https://www.fuseaitools.com/home/wan/image-to-video" style="color:#60a5fa;">Wan Image to Video</a>, <a href="https://www.fuseaitools.com/home/wan/video-to-video" style="color:#60a5fa;">Wan Video to Video</a>, <a href="https://www.fuseaitools.com/home/wan/v2-7-image-to-video" style="color:#60a5fa;">Wan v2.7 Image to Video</a>, and <a href="https://www.fuseaitools.com/home/wan/v2-7-r2v" style="color:#60a5fa;">Wan v2.7 Reference-to-Video</a> — find the AI video tool that fits your creative workflow.</p>
        </section>

    </article>
</body>
</html>
```
