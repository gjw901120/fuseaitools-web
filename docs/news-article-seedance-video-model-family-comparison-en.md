# News Article: ByteDance Seedance Video Model Family Comparison — How to Choose Eight Versions (English)

Full entry following the `news-article-standard.md` format: **title / path / description / keyword / content**.

---

### title
ByteDance Seedance Video Model Family Comparison: How to Choose Across Eight Core Versions

### path
`seedance-video-model-family-comparison-eight-versions`

### description
ByteDance Seedance across eight models from Lite and Pro through 1.5 Pro to Seedance 2, with parameter snapshots, comparison tables, and FuseAI Tools routing picks.

### keyword
Seedance video comparison, ByteDance Seedance, Seedance Lite, Seedance Pro, Seedance 1.5 Pro, Seedance 2, Seedance 2 Fast, AI video generation, multimodal video, FuseAI Tools

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seedance Video Model Family Comparison: Eight Versions Explained</title>
</head>
<body>
    <article class="ai-model-comparison">
        <section class="introduction">
            <h2>Introduction: The Seedance Video Generation Matrix</h2>
            <p>ByteDance's Seedance family forms a layered video stack—from lightweight Lite models through professional Pro variants to the latest multimodal Seedance-2 series—covering basic generation and complex multi-reference workflows.</p>
            <p>Eight routes often confuse teams: v1-lite-text-to-video, v1-lite-image-to-video, v1-pro-text-to-video, v1-pro-image-to-video, v1-pro-fast-image-to-video, seedance-1.5-pro, seedance-2-fast, and seedance-2. This guide maps each variant using complete API-shaped parameters so you can pick the right route fast.</p>
            <p><strong>Seedance tool hub:</strong> <a href="/home/seedance">/home/seedance</a></p>
        </section>

        <section class="positioning-overview">
            <h2>I. Family Snapshot: One Table to Understand All Eight</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">No.</th>
                        <th style="text-align:left; padding:0.5rem;">Model version</th>
                        <th style="text-align:left; padding:0.5rem;">Core function</th>
                        <th style="text-align:left; padding:0.5rem;">Input type</th>
                        <th style="text-align:left; padding:0.5rem;">Duration</th>
                        <th style="text-align:left; padding:0.5rem;">Standout</th>
                        <th style="text-align:left; padding:0.5rem;">Positioning</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">1</td><td style="padding:0.5rem;"><a href="/home/seedance/v1-lite-text-to-video">v1-lite-text-to-video</a></td><td style="padding:0.5rem;">Text to video</td><td style="padding:0.5rem;">Prompt</td><td style="padding:0.5rem;">5-10s</td><td style="padding:0.5rem;">Up to 10k prompt chars</td><td style="padding:0.5rem;">Entry</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">2</td><td style="padding:0.5rem;"><a href="/home/seedance/v1-lite-image-to-video">v1-lite-image-to-video</a></td><td style="padding:0.5rem;">Image to video</td><td style="padding:0.5rem;">1 image + prompt</td><td style="padding:0.5rem;">5-10s</td><td style="padding:0.5rem;">Optional end frame</td><td style="padding:0.5rem;">Entry</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">3</td><td style="padding:0.5rem;"><a href="/home/seedance/v1-pro-text-to-video">v1-pro-text-to-video</a></td><td style="padding:0.5rem;">Text to video</td><td style="padding:0.5rem;">Prompt</td><td style="padding:0.5rem;">5-10s</td><td style="padding:0.5rem;">21:9 ultra-wide</td><td style="padding:0.5rem;">Pro</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">4</td><td style="padding:0.5rem;"><a href="/home/seedance/v1-pro-image-to-video">v1-pro-image-to-video</a></td><td style="padding:0.5rem;">Image to video</td><td style="padding:0.5rem;">1 image + prompt</td><td style="padding:0.5rem;">5-10s</td><td style="padding:0.5rem;">Pro image quality</td><td style="padding:0.5rem;">Pro</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">5</td><td style="padding:0.5rem;"><a href="/home/seedance/v1-pro-fast-image-to-video">v1-pro-fast-image-to-video</a></td><td style="padding:0.5rem;">Fast image to video</td><td style="padding:0.5rem;">1 image + prompt</td><td style="padding:0.5rem;">5-10s</td><td style="padding:0.5rem;">Speed-first; 720p/1080p only</td><td style="padding:0.5rem;">Fast Pro</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">6</td><td style="padding:0.5rem;"><a href="/home/seedance/v1-5-pro">seedance-1.5-pro</a></td><td style="padding:0.5rem;">Text / image to video</td><td style="padding:0.5rem;">0-2 images + prompt</td><td style="padding:0.5rem;">4/8/12s</td><td style="padding:0.5rem;">Audio gen, lens lock</td><td style="padding:0.5rem;">All-round Pro</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">7</td><td style="padding:0.5rem;"><a href="/home/seedance/v2-fast">seedance-2-fast</a></td><td style="padding:0.5rem;">Multimodal generation</td><td style="padding:0.5rem;">Images/video/audio + prompt</td><td style="padding:0.5rem;">4-15s</td><td style="padding:0.5rem;">9 refs / 3 videos / 3 audios</td><td style="padding:0.5rem;">Fast flagship</td></tr>
                    <tr><td style="padding:0.5rem;">8</td><td style="padding:0.5rem;"><a href="/home/seedance/v2">seedance-2</a></td><td style="padding:0.5rem;">Multimodal generation</td><td style="padding:0.5rem;">Images/video/audio + prompt</td><td style="padding:0.5rem;">4-15s</td><td style="padding:0.5rem;">1080p + web search</td><td style="padding:0.5rem;">Top tier</td></tr>
                </tbody>
            </table>
        </section>

        <section class="deep-comparison">
            <h2>II. Eight Models Deep Dive</h2>

            <h3>Model 1: v1-lite-text-to-video</h3>
            <p>Entry-level text-to-video with minimal parameters and fast onboarding.</p>
            <pre><code>{
  "model": "bytedance/v1-lite-text-to-video",
  "prompt": "Text prompt (max 10000 chars)",
  "aspect_ratio": "16:9 / 4:3 / 1:1 / 3:4 / 9:16 / 9:21",
  "resolution": "480p / 720p / 1080p",
  "duration": "5 / 10",
  "camera_fixed": false,
  "seed": -1
}</code></pre>
            <p><strong>Highlight:</strong> rare <code>9:21</code> tall vertical ratio for full-screen mobile framing.</p>
            <p><strong>Use cases:</strong> learning, rapid concept checks.</p>
            <p><strong>Route:</strong> /home/seedance/v1-lite-text-to-video</p>

            <h3>Model 2: v1-lite-image-to-video</h3>
            <p>Lite image-to-video with optional last-frame constraint.</p>
            <pre><code>{
  "model": "bytedance/v1-lite-image-to-video",
  "prompt": "Text prompt (max 10000 chars)",
  "image_url": "First-frame image URL",
  "resolution": "480p / 720p / 1080p",
  "duration": "5 / 10",
  "camera_fixed": false,
  "end_image_url": "Optional last-frame image URL",
  "seed": -1
}</code></pre>
            <p><strong>Unique:</strong> <code>end_image_url</code> enables first/last frame guided motion.</p>
            <p><strong>Use cases:</strong> keyframe animation, animating stills.</p>
            <p><strong>Route:</strong> /home/seedance/v1-lite-image-to-video</p>

            <h3>Model 3: v1-pro-text-to-video</h3>
            <p>Pro text-to-video upgrade with cinematic ultra-wide support.</p>
            <pre><code>{
  "model": "bytedance/v1-pro-text-to-video",
  "prompt": "Text prompt (max 10000 chars)",
  "aspect_ratio": "21:9 / 16:9 / 4:3 / 1:1 / 3:4 / 9:16",
  "resolution": "480p / 720p / 1080p",
  "duration": "5 / 10",
  "camera_fixed": false,
  "seed": -1
}</code></pre>
            <p><strong>Use cases:</strong> cinematic widescreen, higher-end text-only generation.</p>
            <p><strong>Route:</strong> /home/seedance/v1-pro-text-to-video</p>

            <h3>Model 4: v1-pro-image-to-video</h3>
            <p>Pro-grade image-to-video with stronger visual fidelity than Lite.</p>
            <pre><code>{
  "model": "bytedance/v1-pro-image-to-video",
  "prompt": "Text prompt (max 10000 chars)",
  "image_url": "First-frame image URL",
  "resolution": "480p / 720p / 1080p",
  "duration": "5 / 10",
  "camera_fixed": false,
  "seed": -1
}</code></pre>
            <p><strong>Use cases:</strong> commercial-quality image-driven clips.</p>
            <p><strong>Route:</strong> /home/seedance/v1-pro-image-to-video</p>

            <h3>Model 5: v1-pro-fast-image-to-video</h3>
            <p>Speed-optimized Pro image-to-video; no 480p tier.</p>
            <pre><code>{
  "model": "bytedance/v1-pro-fast-image-to-video",
  "prompt": "Text prompt (max 10000 chars)",
  "image_url": "First-frame image URL",
  "resolution": "720p / 1080p",
  "duration": "5 / 10"
}</code></pre>
            <p><strong>Use cases:</strong> batch jobs where turnaround matters.</p>
            <p><strong>Route:</strong> /home/seedance/v1-pro-fast-image-to-video</p>

            <h3>Model 6: seedance-1.5-pro</h3>
            <p>Unified Pro route: zero images behaves like text-to-video; one to two images behave like image-to-video.</p>
            <pre><code>{
  "model": "bytedance/seedance-1.5-pro",
  "prompt": "Text prompt (max 2500 chars)",
  "input_urls": ["Optional 0-2 image URLs"],
  "aspect_ratio": "1:1 / 4:3 / 3:4 / 16:9 / 9:16 / 21:9",
  "resolution": "480p / 720p / 1080p",
  "duration": "4 / 8 / 12",
  "fixed_lens": false,
  "generate_audio": false
}</code></pre>
            <p><strong>Breakthroughs:</strong> dual-mode input; <code>fixed_lens</code> locks camera when needed; <code>generate_audio</code> adds native audio (often higher cost); durations 4/8/12 seconds.</p>
            <p><strong>Use cases:</strong> flexible creative pipelines without switching tools.</p>
            <p><strong>Route:</strong> /home/seedance/v1-5-pro</p>

            <h3>Model 7: seedance-2-fast</h3>
            <p>Fast multimodal flagship: rich references with speed bias and 480p/720p output.</p>
            <pre><code>{
  "model": "bytedance/seedance-2-fast",
  "prompt": "Optional prompt (max 20000 chars)",
  "first_frame_url": "First-frame image URL",
  "last_frame_url": "Last-frame image URL",
  "reference_image_urls": ["Up to 9 reference images"],
  "reference_video_urls": ["Up to 3 reference videos"],
  "reference_audio_urls": ["Up to 3 reference audios"],
  "generate_audio": true,
  "resolution": "480p / 720p",
  "aspect_ratio": "1:1 / 4:3 / 3:4 / 16:9 / 9:16 / 21:9 / adaptive",
  "duration": 5,
  "web_search": false
}</code></pre>
            <p><strong>Reference rules:</strong> reference images plus first/last frames ≤ 9 total; ≤ 3 videos, combined duration ≤ 15s, each ≤ 50MB; ≤ 3 audio clips, combined ≤ 15s, each ≤ 15MB.</p>
            <p><strong>Use cases:</strong> character-consistent multimodal generation at speed.</p>
            <p><strong>Route:</strong> /home/seedance/v2-fast</p>

            <h3>Model 8: seedance-2</h3>
            <p>Full multimodal flagship: adds 1080p and web search on top of the Seedance-2 stack.</p>
            <pre><code>{
  "model": "bytedance/seedance-2",
  "prompt": "Optional prompt (max 20000 chars)",
  "first_frame_url": "First-frame image URL",
  "last_frame_url": "Last-frame image URL",
  "reference_image_urls": ["Up to 9 reference images"],
  "reference_video_urls": ["Up to 3 reference videos"],
  "reference_audio_urls": ["Up to 3 reference audios"],
  "generate_audio": true,
  "resolution": "480p / 720p / 1080p",
  "aspect_ratio": "1:1 / 4:3 / 3:4 / 16:9 / 9:16 / 21:9 / adaptive",
  "duration": 5,
  "web_search": false
}</code></pre>
            <p><strong>Use cases:</strong> maximum quality multimodal briefs and research-grounded generation.</p>
            <p><strong>Route:</strong> /home/seedance/v2</p>
        </section>

        <section class="feature-summary">
            <h2>III. Eight-Model Comparison Summary</h2>

            <h3>3.1 Core feature matrix</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.4rem;">Feature</th>
                        <th style="text-align:left; padding:0.4rem;">Lite T2V</th>
                        <th style="text-align:left; padding:0.4rem;">Lite I2V</th>
                        <th style="text-align:left; padding:0.4rem;">Pro T2V</th>
                        <th style="text-align:left; padding:0.4rem;">Pro I2V</th>
                        <th style="text-align:left; padding:0.4rem;">Pro Fast</th>
                        <th style="text-align:left; padding:0.4rem;">1.5-Pro</th>
                        <th style="text-align:left; padding:0.4rem;">2-Fast</th>
                        <th style="text-align:left; padding:0.4rem;">2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Text to video</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Image to video</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">First/last frame</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Multi-image refs</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Video refs</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Audio refs</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Audio generation</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Camera control</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Web search</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">21:9 ratio</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr><td style="padding:0.4rem;">Max resolution</td><td style="padding:0.4rem;">1080p</td><td style="padding:0.4rem;">1080p</td><td style="padding:0.4rem;">1080p</td><td style="padding:0.4rem;">1080p</td><td style="padding:0.4rem;">1080p</td><td style="padding:0.4rem;">1080p</td><td style="padding:0.4rem;">720p</td><td style="padding:0.4rem;">1080p</td></tr>
                </tbody>
            </table>

            <h3>3.2 Parameter complexity</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Model</th>
                        <th style="text-align:left; padding:0.5rem;">Required</th>
                        <th style="text-align:left; padding:0.5rem;">Optional</th>
                        <th style="text-align:left; padding:0.5rem;">Learning curve</th>
                        <th style="text-align:left; padding:0.5rem;">Best for</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Lite T2V</td><td style="padding:0.5rem;">2</td><td style="padding:0.5rem;">4</td><td style="padding:0.5rem;">Easy</td><td style="padding:0.5rem;">Beginners</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Lite I2V</td><td style="padding:0.5rem;">3</td><td style="padding:0.5rem;">4</td><td style="padding:0.5rem;">Easy</td><td style="padding:0.5rem;">Beginners</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Pro T2V</td><td style="padding:0.5rem;">2</td><td style="padding:0.5rem;">4</td><td style="padding:0.5rem;">Easy</td><td style="padding:0.5rem;">General users</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Pro I2V</td><td style="padding:0.5rem;">3</td><td style="padding:0.5rem;">3</td><td style="padding:0.5rem;">Easy</td><td style="padding:0.5rem;">General users</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Pro Fast I2V</td><td style="padding:0.5rem;">3</td><td style="padding:0.5rem;">2</td><td style="padding:0.5rem;">Easy</td><td style="padding:0.5rem;">Speed-first batches</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">1.5-Pro</td><td style="padding:0.5rem;">2</td><td style="padding:0.5rem;">6</td><td style="padding:0.5rem;">Medium</td><td style="padding:0.5rem;">Advanced creators</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">2-Fast</td><td style="padding:0.5rem;">1</td><td style="padding:0.5rem;">11</td><td style="padding:0.5rem;">Complex</td><td style="padding:0.5rem;">Power users</td></tr>
                    <tr><td style="padding:0.5rem;">Seedance-2</td><td style="padding:0.5rem;">1</td><td style="padding:0.5rem;">12</td><td style="padding:0.5rem;">Complex</td><td style="padding:0.5rem;">Professional delivery</td></tr>
                </tbody>
            </table>

            <h3>3.3 Duration support</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Family</th>
                        <th style="text-align:left; padding:0.5rem;">Allowed seconds</th>
                        <th style="text-align:left; padding:0.5rem;">Range</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Lite</td><td style="padding:0.5rem;">5, 10</td><td style="padding:0.5rem;">5-10</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Pro (incl. Fast I2V)</td><td style="padding:0.5rem;">5, 10</td><td style="padding:0.5rem;">5-10</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">1.5-Pro</td><td style="padding:0.5rem;">4, 8, 12</td><td style="padding:0.5rem;">4-12</td></tr>
                    <tr><td style="padding:0.5rem;">2-Fast / Seedance-2</td><td style="padding:0.5rem;">4-15 (integer)</td><td style="padding:0.5rem;">4-15</td></tr>
                </tbody>
            </table>
        </section>

        <section class="decision-tree">
            <h2>IV. Model Selection Decision Tree</h2>
            <pre><code>What is your task?
|
|-- Generate from text only
|   |-- Quick onboarding -> Lite T2V
|   |-- Need 21:9 ultra-wide -> Pro T2V
|   |-- Need audio generation + lens lock -> 1.5-Pro
|   `-- Need top quality + web search -> Seedance-2
|
|-- Generate from one image
|   |-- Quality-first -> Pro I2V
|   |-- Speed-first -> Pro Fast I2V
|   |-- Need explicit first/last frames -> Lite I2V
|   `-- Need audio + lens + flexible duration -> 1.5-Pro
|
`-- Need multimodal references (images + videos + audio)
    |-- Speed priority -> Seedance-2-Fast
    `-- Quality priority (1080p) -> Seedance-2</code></pre>
        </section>

        <section class="unique-advantages">
            <h2>V. Differentiators for Seedance</h2>
            <h3>5.1 Full ladder from Lite to flagship</h3>
            <p>Seedance spans entry Lite models, professional Pro variants, unified 1.5-Pro, and multimodal Seedance-2—rather than forcing every workflow through one SKU.</p>
            <h3>5.2 First/last frame storytelling</h3>
            <p>Lite image-to-video plus Seedance-2 routes support explicit frame endpoints so motion can interpolate between defined poses.</p>
            <h3>5.3 Rich multimodal references</h3>
            <p>Seedance-2 family supports up to nine reference images combined with first/last frames, three reference videos, and three reference audio tracks—ideal for consistent characters and complex scenes.</p>
            <h3>5.4 Camera discipline</h3>
            <p>Lite, Pro, and 1.5-Pro expose camera or lens lock toggles for deliberate cinematography.</p>
            <h3>5.5 Optional web grounding</h3>
            <p>Seedance-2 routes expose <code>web_search</code> so prompts can lean on fresher real-world context when enabled.</p>
        </section>

        <section class="conclusion">
            <h2>VI. Final Recommendations</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Scenario</th>
                        <th style="text-align:left; padding:0.5rem;">Pick</th>
                        <th style="text-align:left; padding:0.5rem;">Why</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Fast entry text-to-video</td><td style="padding:0.5rem;"><a href="/home/seedance/v1-lite-text-to-video">Lite T2V</a></td><td style="padding:0.5rem;">Minimal parameters, fast learning curve</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Entry image-to-video with end frame</td><td style="padding:0.5rem;"><a href="/home/seedance/v1-lite-image-to-video">Lite I2V</a></td><td style="padding:0.5rem;">Built-in last-frame constraint</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">High-quality text + 21:9</td><td style="padding:0.5rem;"><a href="/home/seedance/v1-pro-text-to-video">Pro T2V</a></td><td style="padding:0.5rem;">Cinematic ultra-wide control</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">High-quality single-image video</td><td style="padding:0.5rem;"><a href="/home/seedance/v1-pro-image-to-video">Pro I2V</a></td><td style="padding:0.5rem;">Pro-grade fidelity</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Batch speed on image prompts</td><td style="padding:0.5rem;"><a href="/home/seedance/v1-pro-fast-image-to-video">Pro Fast I2V</a></td><td style="padding:0.5rem;">Optimized turnaround, HD-only</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Unified text/image + audio + lens</td><td style="padding:0.5rem;"><a href="/home/seedance/v1-5-pro">1.5-Pro</a></td><td style="padding:0.5rem;">Dual-mode input with advanced controls</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Multimodal references (speed)</td><td style="padding:0.5rem;"><a href="/home/seedance/v2-fast">Seedance-2-Fast</a></td><td style="padding:0.5rem;">Maximum reference breadth at 480p/720p</td></tr>
                    <tr><td style="padding:0.5rem;">Multimodal references (quality)</td><td style="padding:0.5rem;"><a href="/home/seedance/v2">Seedance-2</a></td><td style="padding:0.5rem;">1080p plus web search when needed</td></tr>
                </tbody>
            </table>

            <p><strong>One-line playbook:</strong></p>
            <ul>
                <li>Start with Lite when learning or validating ideas quickly.</li>
                <li>Move to Pro when widescreen or commercial fidelity matters.</li>
                <li>Use 1.5-Pro when one route must flip between text-only and light reference inputs with audio and lens control.</li>
                <li>Choose Seedance-2 Fast vs Seedance-2 based on speed versus 1080p and web-assisted prompts.</li>
            </ul>

            <p>All eight parameter stacks map directly to FuseAI Tools Seedance pages. Open the hub to browse every mode: <a href="/home/seedance">/home/seedance</a>.</p>
        </section>
    </article>
</body>
</html>
```

---

## Field reference

| Field | Use |
|-------|-----|
| **title** | Article title for list/detail and SEO. |
| **path** | URL slug: `/news/seedance-video-model-family-comparison-eight-versions`. |
| **description** | Summary for list, meta description, and OG (120-160 chars). |
| **keyword** | Comma-separated keywords for meta and SEO. |
| **content** | Full HTML body; links in section I, section VI, and `/home/seedance` hub; deep-dive routes as plain text. |
