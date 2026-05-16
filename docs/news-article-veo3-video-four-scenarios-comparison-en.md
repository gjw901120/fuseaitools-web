# News Article: Google Veo 3 Video — Four Generation Scenarios Compared (English)

Full entry following the `news-article-standard.md` format: **title / path / description / keyword / content**.

---

### title
Veo 3 Video Generation Compared: How to Choose Across Four Core Scenarios

### path
`veo3-video-four-scenarios-comparison-how-to-choose`

### description
Compare Google Veo 3.1-class video workflows across text-to-video, first-and-last frames, reference-to-video, and extend—with parameters, matrices, and FuseAI Tools routes.

### keyword
Veo 3, Veo 3.1, Google Veo video, TEXT_2_VIDEO, first and last frames video, reference to video, Veo extend, AI video generation, FuseAI Tools

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Veo 3 Video: Four Scenarios Compared</title>
</head>
<body>
    <article class="ai-model-comparison">
        <section class="introduction">
            <h2>Introduction: Veo 3.1 and the New Video Generation Stack</h2>
            <p><strong>Google Veo 3.1</strong> represents an evolved generation stack for AI video: sharper motion coherence, stronger prompt adherence, and a clearer split between “pure creation,” “frame-locked storytelling,” “reference-locked subjects,” and “timeline continuation.” On FuseAI Tools, the same conceptual surface maps to four practical routes—each tuned for a different production moment.</p>
            <p>Teams often stall on the same questions: what separates <code>TEXT_2_VIDEO</code>, <code>FIRST_AND_LAST_FRAMES_2_VIDEO</code>, <code>REFERENCE_2_VIDEO</code>, and <code>VEO3_EXTEND</code>, and which one should ship first?</p>
            <p>This guide walks through representative parameter shapes, compares constraints side by side, and ends with a decision tree you can reuse in briefings.</p>
            <p><strong>Veo hub:</strong> <a href="/home/veo3">/home/veo3</a></p>
        </section>

        <section class="positioning-overview">
            <h2>I. Snapshot: Four Scenarios at a Glance</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.92rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.45rem;">Scenario</th>
                        <th style="text-align:left; padding:0.45rem;"><a href="/home/veo3/text-to-video">TEXT_2_VIDEO</a></th>
                        <th style="text-align:left; padding:0.45rem;"><a href="/home/veo3/first-and-last-to-video">FIRST_AND_LAST_FRAMES_2_VIDEO</a></th>
                        <th style="text-align:left; padding:0.45rem;"><a href="/home/veo3/reference-to-video">REFERENCE_2_VIDEO</a></th>
                        <th style="text-align:left; padding:0.45rem;"><a href="/home/veo3/extend">VEO3_EXTEND</a></th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;">Core function</td><td style="padding:0.45rem;">Text-only generation</td><td style="padding:0.45rem;">1-2 images + prompt</td><td style="padding:0.45rem;">1-3 refs + prompt</td><td style="padding:0.45rem;">Extend prior clip</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;">Inputs</td><td style="padding:0.45rem;">Prompt</td><td style="padding:0.45rem;">Images + prompt</td><td style="padding:0.45rem;">Refs + prompt</td><td style="padding:0.45rem;">Task ID + prompt</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;">Output profile</td><td style="padding:0.45rem;">Standard duration tiers</td><td style="padding:0.45rem;">Standard duration tiers</td><td style="padding:0.45rem;">Standard duration tiers</td><td style="padding:0.45rem;">Timeline lengthening</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;">Resolution class</td><td style="padding:0.45rem;">720p / 1080p / 4k</td><td style="padding:0.45rem;">720p / 1080p / 4k</td><td style="padding:0.45rem;">720p / 1080p / 4k</td><td style="padding:0.45rem;">fast / quality / lite</td></tr>
                    <tr><td style="padding:0.45rem;">Positioning</td><td style="padding:0.45rem;">Zero-to-one ideation</td><td style="padding:0.45rem;">Keyframe control</td><td style="padding:0.45rem;">Look consistency</td><td style="padding:0.45rem;">Continuation</td></tr>
                </tbody>
            </table>
        </section>

        <section class="parameter-system">
            <h2>II. Model Stack and Shared Controls</h2>
            <h3>2.1 Core model identifiers</h3>
            <pre><code>{
  "model": "veo3 / veo3_fast / veo3_lite"
}</code></pre>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Model</th>
                        <th style="text-align:left; padding:0.5rem;">Trait</th>
                        <th style="text-align:left; padding:0.5rem;">Best for</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">veo3</td><td style="padding:0.5rem;">Balanced quality</td><td style="padding:0.5rem;">General delivery</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">veo3_fast</td><td style="padding:0.5rem;">Fast iterations</td><td style="padding:0.5rem;">Speed-sensitive workflows</td></tr>
                    <tr><td style="padding:0.5rem;">veo3_lite</td><td style="padding:0.5rem;">Lightweight</td><td style="padding:0.5rem;">Budget or latency caps</td></tr>
                </tbody>
            </table>

            <h3>2.2 Common generation parameters</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Field</th>
                        <th style="text-align:left; padding:0.5rem;">Meaning</th>
                        <th style="text-align:left; padding:0.5rem;">Typical values</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">aspectRatio</td><td style="padding:0.5rem;">Frame geometry</td><td style="padding:0.5rem;">16:9 / 9:16 / Auto</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">resolution</td><td style="padding:0.5rem;">Output sharpness</td><td style="padding:0.5rem;">720p / 1080p / 4k</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">watermark</td><td style="padding:0.5rem;">Optional overlay text</td><td style="padding:0.5rem;">Custom string</td></tr>
                    <tr><td style="padding:0.5rem;">enableTranslation</td><td style="padding:0.5rem;">Prompt translation assist</td><td style="padding:0.5rem;">true / false (often true)</td></tr>
                </tbody>
            </table>
        </section>

        <section class="deep-comparison">
            <h2>III. Four Scenarios Deep Dive</h2>

            <h3>Scenario 1: TEXT_2_VIDEO</h3>
            <p>Pure prompt-to-video creation—no reference frames required.</p>
            <pre><code>{
  "model": "veo3_fast",
  "generationType": "TEXT_2_VIDEO",
  "prompt": "A dog playing in a park",
  "imageUrls": [],
  "aspectRatio": "16:9",
  "resolution": "720p",
  "enableTranslation": true,
  "watermark": "MyBrand"
}</code></pre>
            <p><strong>Notes:</strong> keep <code>imageUrls</code> empty; rich prompts beat single-line labels; up to 4k-class output when the route allows.</p>
            <p><strong>Strength:</strong> maximum creative freedom. <strong>Trade-off:</strong> no pixel-level anchor for specific on-screen elements.</p>
            <p><strong>Route:</strong> /home/veo3/text-to-video</p>

            <h3>Scenario 2: FIRST_AND_LAST_FRAMES_2_VIDEO</h3>
            <p>Drives motion from one or two still references—either animate a single plate or interpolate between explicit endpoints.</p>
            <pre><code>{
  "model": "veo3_fast",
  "generationType": "FIRST_AND_LAST_FRAMES_2_VIDEO",
  "prompt": "The dog continues running through the park",
  "imageUrls": ["http://example.com/first.jpg", "http://example.com/last.jpg"],
  "aspectRatio": "16:9",
  "resolution": "1080p",
  "enableTranslation": true
}</code></pre>
            <p><strong>Image rules:</strong> one image → bring the plate to life; two images → first frame + last frame with AI-filled middle.</p>
            <p><strong>Route:</strong> /home/veo3/first-and-last-to-video</p>

            <h3>Scenario 3: REFERENCE_2_VIDEO</h3>
            <p>Locks character or object appearance via one to three reference stills while language steers action.</p>
            <pre><code>{
  "model": "veo3_fast",
  "generationType": "REFERENCE_2_VIDEO",
  "prompt": "The character is walking through a futuristic city",
  "imageUrls": ["http://example.com/character1.jpg", "http://example.com/character2.jpg"],
  "aspectRatio": "9:16",
  "resolution": "720p"
}</code></pre>
            <p><strong>Constraints:</strong> commonly limited to <strong>veo3_fast</strong>; one to three references; contrasts with first/last mode because refs define <em>look</em>, not necessarily exact start/end frames.</p>
            <p><strong>Route:</strong> /home/veo3/reference-to-video</p>

            <h3>Scenario 4: VEO3_EXTEND</h3>
            <p>Continues an existing Veo-generated clip using the originating task metadata plus a continuation prompt.</p>
            <pre><code>{
  "task": "Original Veo generation task id",
  "model": "fast",
  "prompt": "The dog continues running, clearing small hurdles and joining other dogs",
  "seeds": 12345,
  "watermark": "MyBrand"
}</code></pre>
            <p><strong>Notes:</strong> source clip must come from Veo generation; extension tiers map to <strong>fast / quality / lite</strong>; follow platform rules about resolutions that remain eligible for extend (e.g., restrictions after certain 1080p outputs).</p>
            <p><strong>Route:</strong> /home/veo3/extend</p>
        </section>

        <section class="feature-summary">
            <h2>IV. Comparison Summary</h2>
            <h3>4.1 Capability matrix</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.4rem;">Feature</th>
                        <th style="text-align:left; padding:0.4rem;">TEXT</th>
                        <th style="text-align:left; padding:0.4rem;">FIRST/LAST</th>
                        <th style="text-align:left; padding:0.4rem;">REFERENCE</th>
                        <th style="text-align:left; padding:0.4rem;">EXTEND</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Prompt-only</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Still-image inputs</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅ (1-2)</td><td style="padding:0.4rem;">✅ (1-3)</td><td style="padding:0.4rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Character / look lock</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Spatial keyframe control</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Timeline continuation</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">4k-capable generation</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">❌</td></tr>
                    <tr><td style="padding:0.4rem;">Model flexibility</td><td style="padding:0.4rem;">veo3 / fast / lite</td><td style="padding:0.4rem;">veo3 / fast / lite</td><td style="padding:0.4rem;">Typically fast</td><td style="padding:0.4rem;">fast / quality / lite</td></tr>
                </tbody>
            </table>

            <h3>4.2 Decision tree</h3>
            <pre><code>What is your task?
|
|-- No reference assets
|   `-- TEXT_2_VIDEO
|
|-- You have still images
|   |-- Need explicit start/end framing
|   |   `-- FIRST_AND_LAST_FRAMES_2_VIDEO
|   `-- Need subject appearance lock
|       `-- REFERENCE_2_VIDEO (fast-class stack)
|
`-- Already have a Veo-generated clip to lengthen
    `-- VEO3_EXTEND (respect resolution eligibility rules)</code></pre>
        </section>

        <section class="unique-advantages">
            <h2>V. Why Veo 3.1-Style Workflows Matter</h2>
            <p><strong>5.1 Four-mode coverage.</strong> Ideation, controlled interpolation, identity-consistent heroes, and continuation sit in one policy framework instead of forcing a single generic prompt.</p>
            <p><strong>5.2 Resolution headroom.</strong> Generation modes often scale through 720p, 1080p, and 4k-class outputs—extend focuses on temporal continuation rather than chasing the same resolution ladder.</p>
            <p><strong>5.3 Translation-aware prompting.</strong> When <code>enableTranslation</code> stays on, multilingual briefs map more reliably into the model’s preferred instruction language.</p>
            <p><strong>5.4 Extend tuning.</strong> Fast, quality, and lite continuation modes let producers trade velocity for fidelity when stitching longer narratives.</p>
        </section>

        <section class="conclusion">
            <h2>VI. Final Recommendations</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Use case</th>
                        <th style="text-align:left; padding:0.5rem;">Mode</th>
                        <th style="text-align:left; padding:0.5rem;">Why</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Create from scratch</td><td style="padding:0.5rem;">TEXT_2_VIDEO</td><td style="padding:0.5rem;">Pure language freedom</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Animate one still</td><td style="padding:0.5rem;">FIRST_AND_LAST (1 image)</td><td style="padding:0.5rem;">Motion without extra anchors</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Lock start/end frames</td><td style="padding:0.5rem;">FIRST_AND_LAST (2 images)</td><td style="padding:0.5rem;">Hard endpoints</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Keep character look stable</td><td style="padding:0.5rem;">REFERENCE_2_VIDEO</td><td style="padding:0.5rem;">Reference-conditioned identity</td></tr>
                    <tr><td style="padding:0.5rem;">Lengthen an approved clip</td><td style="padding:0.5rem;">VEO3_EXTEND</td><td style="padding:0.5rem;">Task-linked continuation</td></tr>
                </tbody>
            </table>

            <p><strong>One-line playbook:</strong></p>
            <ul>
                <li>No assets → <a href="/home/veo3/text-to-video">TEXT_2_VIDEO</a>.</li>
                <li>Keyframes or still animation → <a href="/home/veo3/first-and-last-to-video">FIRST_AND_LAST_FRAMES_2_VIDEO</a>.</li>
                <li>Identity from refs → <a href="/home/veo3/reference-to-video">REFERENCE_2_VIDEO</a> (fast stack).</li>
                <li>Continue an existing Veo render → <a href="/home/veo3/extend">VEO3_EXTEND</a>.</li>
            </ul>

            <p>Open every scenario from the Veo overview: <a href="/home/veo3">/home/veo3</a>.</p>
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
| **path** | URL slug: `/news/veo3-video-four-scenarios-comparison-how-to-choose`. |
| **description** | Summary for list, meta description, and OG (mentions Veo 3.1 positioning). |
| **keyword** | Comma-separated keywords for meta and SEO. |
| **content** | Full HTML body; links in section I headers, VI playbook list, and `/home/veo3` hub; VI summary table has no links in Mode column. |
