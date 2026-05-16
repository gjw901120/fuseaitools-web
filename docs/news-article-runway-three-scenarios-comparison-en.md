# News Article: Runway Video — Three Scenarios Compared (English)

Full entry following the `news-article-standard.md` format: **title / path / description / keyword / content**.

---

### title
Runway Video Generation Compared: How to Choose Across Generate, Extend, and Aleph

### path
`runway-video-three-scenarios-comparison-how-to-choose`

### description
Compare Runway generate, extend, and aleph with API parameters, capability matrices, decision trees, and FuseAI Tools routes for text-to-video, continuation, and style transfer.

### keyword
Runway AI, Runway generate, Runway extend, Runway Aleph, AI video generation, text to video, image to video, video extend, video style transfer, FuseAI Tools

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Runway: Three Video Scenarios Compared</title>
</head>
<body>
    <article class="ai-model-comparison">
        <section class="introduction">
            <h2>Introduction: The Runway Video Creation Stack</h2>
            <p>Runway helped define the modern AI video workflow: create from text or images, continue a story on an existing render, and restyle footage while preserving motion structure. On FuseAI Tools, three named flows—<strong>generate</strong>, <strong>extend</strong>, and <strong>aleph</strong>—map cleanly to that lifecycle.</p>
            <p>Many creators ask the same question: when should I generate fresh pixels, when should I extend a prior Runway task, and when should I run Aleph on uploaded video? This guide aligns each scenario with representative API parameters and the exact route on the platform.</p>
            <p><strong>Runway hub:</strong> <a href="/home/runway">/home/runway</a></p>
        </section>

        <section class="positioning-overview">
            <h2>I. Snapshot: Three Scenarios at a Glance</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.45rem;">Scenario</th>
                        <th style="text-align:left; padding:0.45rem;">Core function</th>
                        <th style="text-align:left; padding:0.45rem;">Primary inputs</th>
                        <th style="text-align:left; padding:0.45rem;">Duration / resolution</th>
                        <th style="text-align:left; padding:0.45rem;">Positioning</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;"><a href="/home/runway/generate">generate</a></td><td style="padding:0.45rem;">Text-to-video / image-to-video</td><td style="padding:0.45rem;">prompt (+ optional imageUrl)</td><td style="padding:0.45rem;">5s or 10s · 720p / 1080p</td><td style="padding:0.45rem;">Create from zero</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;"><a href="/home/runway/extend">extend</a></td><td style="padding:0.45rem;">Video continuation</td><td style="padding:0.45rem;">taskId + prompt</td><td style="padding:0.45rem;">Matches source · 720p / 1080p</td><td style="padding:0.45rem;">Continue a Runway clip</td></tr>
                    <tr><td style="padding:0.45rem;"><a href="/home/runway/aleph">aleph</a></td><td style="padding:0.45rem;">Video style / scene transform</td><td style="padding:0.45rem;">videoUrl + prompt (+ optional referenceImageUrl)</td><td style="padding:0.45rem;">Inherits source length</td><td style="padding:0.45rem;">Style migration on existing video</td></tr>
                </tbody>
            </table>
        </section>

        <section class="deep-comparison">
            <h2>II. Three Scenarios Deep Dive</h2>

            <h3>Scenario 1: generate (text-to-video / image-to-video)</h3>
            <p>Start from language—or animate a still image—without any prior Runway task.</p>
            <pre><code>{
  "prompt": "Descriptive text for the scene (max 1800 characters)",
  "imageUrl": "Optional reference image URL",
  "duration": 5,
  "quality": "720p",
  "aspectRatio": "9:16",
  "waterMark": "FuseAi"
}</code></pre>
            <p><strong>Modes:</strong></p>
            <table style="width:100%; border-collapse:collapse; margin:0.75rem 0; font-size:0.88rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.4rem;">Mode</th>
                        <th style="text-align:left; padding:0.4rem;">Input</th>
                        <th style="text-align:left; padding:0.4rem;">Output</th>
                        <th style="text-align:left; padding:0.4rem;">Aspect ratio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Text-to-video</td><td style="padding:0.4rem;">prompt only</td><td style="padding:0.4rem;">New clip</td><td style="padding:0.4rem;">Set via aspectRatio</td></tr>
                    <tr><td style="padding:0.4rem;">Image-to-video</td><td style="padding:0.4rem;">prompt + imageUrl</td><td style="padding:0.4rem;">Animated still</td><td style="padding:0.4rem;">Follows uploaded image</td></tr>
                </tbody>
            </table>
            <p><strong>Duration vs quality:</strong> 720p supports both 5s and 10s. 1080p is limited to 5s only—10-second jobs must stay at 720p on the FuseAI Tools UI.</p>
            <p><strong>Aspect ratios (text-only):</strong> 16:9, 9:16, 4:3, 3:4, 1:1—pick platform fit before you prompt (YouTube vs Shorts vs square social).</p>
            <p><strong>Best for:</strong> concept reels, product motion from stills, ad previsualization, social shorts from scratch.</p>
            <p><strong>Route:</strong> /home/runway/generate</p>

            <h3>Scenario 2: extend (video continuation)</h3>
            <p>Append a sequel to a clip that was produced with Runway <strong>generate</strong>. The UI lists eligible tasks from your account history.</p>
            <pre><code>{
  "taskId": "Original Runway generate task ID",
  "prompt": "What should happen next (max 1000 characters)",
  "quality": "720p",
  "waterMark": "FuseAi"
}</code></pre>
            <p><strong>Inheritance from the parent clip:</strong></p>
            <table style="width:100%; border-collapse:collapse; margin:0.75rem 0; font-size:0.88rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.4rem;">Property</th>
                        <th style="text-align:left; padding:0.4rem;">Inherited?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Resolution / aspect ratio</td><td style="padding:0.4rem;">✅ Aligned with source</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Visual style / palette</td><td style="padding:0.4rem;">✅ Strong continuity</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Subject / scene logic</td><td style="padding:0.4rem;">✅ Prompt steers the sequel</td></tr>
                    <tr><td style="padding:0.4rem;">Clip length</td><td style="padding:0.4rem;">✅ Matches original duration</td></tr>
                </tbody>
            </table>
            <p><strong>Constraint:</strong> <code>taskId</code> must reference a completed Runway generate job—not arbitrary uploads.</p>
            <p><strong>Best for:</strong> serial storytelling, finishing truncated generations, episodic social content.</p>
            <p><strong>Route:</strong> /home/runway/extend</p>

            <h3>Scenario 3: aleph (video style conversion)</h3>
            <p>Transform an existing video (any source you can upload) while keeping motion and structure; steer look and atmosphere with text and an optional reference still.</p>
            <pre><code>{
  "prompt": "Describe the target style or scene change",
  "videoUrl": "Reference video URL (uploaded in UI)",
  "waterMark": "FuseAi",
  "aspectRatio": "16:9",
  "seed": 123456,
  "referenceImageUrl": "Optional style reference image URL"
}</code></pre>
            <p><strong>vs generate:</strong></p>
            <table style="width:100%; border-collapse:collapse; margin:0.75rem 0; font-size:0.88rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.4rem;">Contrast</th>
                        <th style="padding:0.4rem;">generate</th>
                        <th style="padding:0.4rem;">aleph</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Input anchor</td><td style="padding:0.4rem;">Text (+ optional image)</td><td style="padding:0.4rem;">Video + text (+ optional reference image)</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Output</td><td style="padding:0.4rem;">Brand-new footage</td><td style="padding:0.4rem;">Restyled version of source</td></tr>
                    <tr><td style="padding:0.4rem;">Motion structure</td><td style="padding:0.4rem;">N/A (created fresh)</td><td style="padding:0.4rem;">Preserved from source video</td></tr>
                </tbody>
            </table>
            <p><strong>Advanced knobs:</strong> <code>seed</code> improves reproducibility; <code>referenceImageUrl</code> nudges palette and art direction; <code>aspectRatio</code> sets output framing (16:9, 9:16, 4:3, 3:4, 1:1, 21:9 on FuseAI Tools).</p>
            <p><strong>Best for:</strong> anime or film-grade regrades, seasonal or weather swaps, stylized ads, turning live action into illustrated motion.</p>
            <p><strong>Route:</strong> /home/runway/aleph</p>
        </section>

        <section class="feature-summary">
            <h2>III. Comparison Summary</h2>
            <h3>3.1 Capability matrix</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.85rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.35rem;">Feature</th>
                        <th style="text-align:left; padding:0.35rem;">generate</th>
                        <th style="text-align:left; padding:0.35rem;">extend</th>
                        <th style="text-align:left; padding:0.35rem;">aleph</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">Text-to-video</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">Image-to-video</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">Continue Runway output</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">Style transfer on video</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">Requires reference video</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">Requires prior taskId</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">User-picked aspect ratio</td><td style="padding:0.35rem;">✅ (no image)</td><td style="padding:0.35rem;">Inherited</td><td style="padding:0.35rem;">✅</td></tr>
                    <tr><td style="padding:0.35rem;">Reference still for style</td><td style="padding:0.35rem;">Optional imageUrl</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">Optional referenceImageUrl</td></tr>
                </tbody>
            </table>

            <h3>3.2 Input / output snapshot</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.88rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.4rem;">Scenario</th>
                        <th style="text-align:left; padding:0.4rem;">Typical input</th>
                        <th style="text-align:left; padding:0.4rem;">Output</th>
                        <th style="text-align:left; padding:0.4rem;">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">generate</td><td style="padding:0.4rem;">prompt (+ imageUrl)</td><td style="padding:0.4rem;">New video</td><td style="padding:0.4rem;">5s or 10s</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">extend</td><td style="padding:0.4rem;">taskId + prompt</td><td style="padding:0.4rem;">Continuation clip</td><td style="padding:0.4rem;">Same as parent</td></tr>
                    <tr><td style="padding:0.4rem;">aleph</td><td style="padding:0.4rem;">videoUrl + prompt (+ referenceImageUrl)</td><td style="padding:0.4rem;">Transformed video</td><td style="padding:0.4rem;">Same as source</td></tr>
                </tbody>
            </table>

            <h3>3.3 Hard limits to remember</h3>
            <ul>
                <li><strong>generate:</strong> 1080p only when duration is 5s; 10s forces 720p.</li>
                <li><strong>extend:</strong> taskId must come from a finished Runway generate job in your history.</li>
                <li><strong>aleph:</strong> requires a valid uploaded <code>videoUrl</code>; optional seed and reference image refine repeatability and look.</li>
            </ul>
        </section>

        <section class="decision-tree">
            <h2>IV. Selection Decision Tree</h2>
            <pre><code>What is your starting asset?
|
|-- Nothing yet (idea or still image)
|   |-- Have a reference image -> generate + imageUrl
|   `-- Text only -> generate
|
|-- A clip you made with Runway generate
|   `-- Want more story on the same timeline -> extend
|
`-- Any finished video file (your shoot or download)
    `-- Want new look / season / style, same motion -> aleph</code></pre>
        </section>

        <section class="examples">
            <h2>V. Practical Payload Examples</h2>
            <h3>Vertical social short (generate)</h3>
            <pre><code>{
  "prompt": "A corgi chasing butterflies on sunlit grass, playful handheld feel",
  "duration": 5,
  "quality": "1080p",
  "aspectRatio": "9:16"
}</code></pre>
            <h3>Product still to motion (generate)</h3>
            <pre><code>{
  "prompt": "Slow orbit around the product, soft studio lighting",
  "imageUrl": "https://example.com/product.jpg",
  "duration": 5,
  "quality": "720p"
}</code></pre>
            <h3>Story continuation (extend)</h3>
            <pre><code>{
  "taskId": "ee603959-debb-48d1-98c4-a6d1c717eba6",
  "prompt": "The cat keeps dancing; disco lights spin faster around the room",
  "quality": "720p"
}</code></pre>
            <h3>Animated regrade (aleph)</h3>
            <pre><code>{
  "prompt": "Convert to warm Ghibli-inspired animation, gentle film grain",
  "videoUrl": "https://example.com/input.mp4",
  "aspectRatio": "16:9",
  "seed": 12345
}</code></pre>
        </section>

        <section class="conclusion">
            <h2>VI. Final Recommendations</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Use case</th>
                        <th style="text-align:left; padding:0.5rem;">Feature</th>
                        <th style="text-align:left; padding:0.5rem;">Why</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Create from scratch</td><td style="padding:0.5rem;">generate</td><td style="padding:0.5rem;">Full control of duration, quality, and aspect ratio</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Animate a still</td><td style="padding:0.5rem;">generate + imageUrl</td><td style="padding:0.5rem;">Image anchors composition; prompt drives motion</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Extend a Runway clip</td><td style="padding:0.5rem;">extend</td><td style="padding:0.5rem;">Preserves lineage via taskId</td></tr>
                    <tr><td style="padding:0.5rem;">Restyle existing footage</td><td style="padding:0.5rem;">aleph</td><td style="padding:0.5rem;">Keeps structure; changes look and mood</td></tr>
                </tbody>
            </table>

            <p><strong>One-line playbook:</strong></p>
            <ul>
                <li>From scratch → <a href="/home/runway/generate">generate</a>.</li>
                <li>Continue a Runway render → <a href="/home/runway/extend">extend</a>.</li>
                <li>Restyle any video → <a href="/home/runway/aleph">aleph</a>.</li>
            </ul>

            <p>The three modes form a loop: <strong>generate</strong> seeds the timeline, <strong>extend</strong> lengthens the narrative, and <strong>aleph</strong> can reinterpret any footage without reshooting. Open every Runway mode from the hub: <a href="/home/runway">/home/runway</a>.</p>
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
| **path** | URL slug: `/news/runway-video-three-scenarios-comparison-how-to-choose`. |
| **description** | Summary for list, meta description, and OG (~155 characters). |
| **keyword** | Comma-separated keywords for meta and SEO. |
| **content** | Full HTML body; links in section I (scenario names), VI playbook list, `/home/runway` hub; deep-dive sections use plain route text; VI summary table has no links in Feature column. |
