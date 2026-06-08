# News Article: Imagen 4 — Three Models Compared (English)

Full entry following the `news-article-standard.md` format: **title / path / description / keyword / content**.

---

### title
Google Imagen 4 Compared: How to Choose Standard, Fast, and Ultra

### path
`imagen4-three-models-comparison-how-to-choose`

### description
Compare Imagen 4, Imagen 4 Fast, and Imagen 4 Ultra with API parameters, batch output, seed types, and FuseAI Tools routes under /home/imagen4.

### keyword
Imagen 4, Google Imagen 4 Fast, Imagen 4 Ultra, text to image, AI image generation, negative prompt, FuseAI Tools

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Imagen 4: Three Models Compared</title>
</head>
<body>
    <article class="ai-model-comparison">
        <section class="introduction">
            <h2>Introduction: The Google Imagen 4 Matrix</h2>
            <p>Google’s <strong>Imagen 4</strong> family targets a clear ladder: a balanced default, a speed-first variant with batch output, and an <strong>Ultra</strong> tier for maximum fidelity. All three are text-to-image pipelines with shared aspect-ratio presets and optional negative prompts—differences show up in speed, batching, seed typing, and default framing.</p>
            <p>On FuseAI Tools, each tier has its own tab under <a href="/home/imagen4">/home/imagen4</a>. This guide maps parameters to routes so you can pick the right model on the first try.</p>
            <p><strong>Imagen4 hub:</strong> <a href="/home/imagen4">/home/imagen4</a></p>
        </section>

        <section class="positioning-overview">
            <h2>I. Snapshot: Three Models at a Glance</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.45rem;">Model</th>
                        <th style="text-align:left; padding:0.45rem;">Positioning</th>
                        <th style="text-align:left; padding:0.45rem;">Aspect ratios</th>
                        <th style="text-align:left; padding:0.45rem;">Batch (numImages)</th>
                        <th style="text-align:left; padding:0.45rem;">Seed type</th>
                        <th style="text-align:left; padding:0.45rem;">Default ratio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;"><a href="/home/imagen4/imagen4-generate">Imagen 4</a></td><td style="padding:0.45rem;">Standard</td><td style="padding:0.45rem;">5 presets</td><td style="padding:0.45rem;">❌</td><td style="padding:0.45rem;">string (≤500 chars)</td><td style="padding:0.45rem;">1:1</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;"><a href="/home/imagen4/imagen4-fast">Imagen 4 Fast</a></td><td style="padding:0.45rem;">Speed + batch</td><td style="padding:0.45rem;">5 presets</td><td style="padding:0.45rem;">✅ 1–4</td><td style="padding:0.45rem;">integer</td><td style="padding:0.45rem;">16:9</td></tr>
                    <tr><td style="padding:0.45rem;"><a href="/home/imagen4/imagen4-ultra">Imagen 4 Ultra</a></td><td style="padding:0.45rem;">Flagship quality</td><td style="padding:0.45rem;">5 presets</td><td style="padding:0.45rem;">❌</td><td style="padding:0.45rem;">string (≤500 chars)</td><td style="padding:0.45rem;">1:1</td></tr>
                </tbody>
            </table>
        </section>

        <section class="deep-comparison">
            <h2>II. Three Models Deep Dive</h2>

            <h3>Model 1: Imagen 4 (standard)</h3>
            <p>Balanced quality and latency for everyday text-to-image work.</p>
            <pre><code>{
  "model": "imagen4-generate",
  "prompt": "Describe the image (max 5000 characters)",
  "negativePrompt": "Optional exclusions (max 5000 characters)",
  "aspectRatio": "1:1",
  "seed": "optional-string-up-to-500-chars"
}</code></pre>
            <p><strong>Notes:</strong> no <code>numImages</code> on this tab; seed is a <strong>string</strong> (not numeric). Switching to the Fast tab resets default aspect ratio behavior—see below.</p>
            <p><strong>Best for:</strong> general creation, social stills, balanced cost/quality.</p>
            <p><strong>Route:</strong> /home/imagen4/imagen4-generate</p>

            <h3>Model 2: Imagen 4 Fast</h3>
            <p>Optimized for iteration speed and optional multi-image output in one request.</p>
            <pre><code>{
  "model": "imagen4-fast",
  "prompt": "Describe the image (max 5000 characters)",
  "negativePrompt": "Optional exclusions",
  "aspectRatio": "16:9",
  "numImages": "4",
  "seed": 12345
}</code></pre>
            <p><strong>vs standard:</strong></p>
            <table style="width:100%; border-collapse:collapse; margin:0.75rem 0; font-size:0.88rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.4rem;">Contrast</th>
                        <th style="padding:0.4rem;">Imagen 4</th>
                        <th style="padding:0.4rem;">Imagen 4 Fast</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Speed</td><td style="padding:0.4rem;">Standard</td><td style="padding:0.4rem;">Faster</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Batch output</td><td style="padding:0.4rem;">Single</td><td style="padding:0.4rem;">1–4 via numImages</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Default aspectRatio</td><td style="padding:0.4rem;">1:1</td><td style="padding:0.4rem;">16:9 (UI default on tab switch)</td></tr>
                    <tr><td style="padding:0.4rem;">seed</td><td style="padding:0.4rem;">string</td><td style="padding:0.4rem;">integer</td></tr>
                </tbody>
            </table>
            <p><strong>Best for:</strong> rapid A/B prompts, storyboard frames, generating up to four variants per click.</p>
            <p><strong>Route:</strong> /home/imagen4/imagen4-fast</p>

            <h3>Model 3: Imagen 4 Ultra</h3>
            <p>Highest visual fidelity tier—same parameter surface as standard, tuned for delivery-grade detail.</p>
            <pre><code>{
  "model": "imagen4-ultra",
  "prompt": "Describe the image (max 5000 characters)",
  "negativePrompt": "blur, noise, watermark, distortion",
  "aspectRatio": "16:9",
  "seed": "42"
}</code></pre>
            <p><strong>vs standard:</strong> identical fields; Ultra trades time/credits for peak quality—use when the asset ships externally.</p>
            <p><strong>Best for:</strong> posters, print-minded layouts, hero marketing stills.</p>
            <p><strong>Route:</strong> /home/imagen4/imagen4-ultra</p>
        </section>

        <section class="feature-summary">
            <h2>III. Cross-Model Comparison</h2>
            <h3>3.1 Capability matrix</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.88rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.4rem;">Feature</th>
                        <th style="text-align:left; padding:0.4rem;">Imagen 4</th>
                        <th style="text-align:left; padding:0.4rem;">Fast</th>
                        <th style="text-align:left; padding:0.4rem;">Ultra</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Text-to-image</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">negativePrompt</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">5 aspect ratios</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">numImages 1–4</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">❌</td></tr>
                    <tr><td style="padding:0.4rem;">Seed type</td><td style="padding:0.4rem;">string</td><td style="padding:0.4rem;">integer</td><td style="padding:0.4rem;">string</td></tr>
                </tbody>
            </table>

            <h3>3.2 Shared aspect ratios</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.88rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.4rem;">Ratio</th>
                        <th style="text-align:left; padding:0.4rem;">Typical use</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">1:1</td><td style="padding:0.4rem;">Social posts, avatars</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">16:9</td><td style="padding:0.4rem;">Desktop wallpaper, video covers</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">9:16</td><td style="padding:0.4rem;">Mobile stories, short-video thumbnails</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">4:3 / 3:4</td><td style="padding:0.4rem;">Slides, editorial portraits</td></tr>
                </tbody>
            </table>
            <p>All three models expose the same five presets on FuseAI Tools: <code>1:1</code>, <code>16:9</code>, <code>9:16</code>, <code>3:4</code>, <code>4:3</code>.</p>

            <h3>3.3 Typical use cases</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.88rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.4rem;">Scenario</th>
                        <th style="text-align:left; padding:0.4rem;">Recommended</th>
                        <th style="text-align:left; padding:0.4rem;">Why</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Prompt testing</td><td style="padding:0.4rem;">Fast</td><td style="padding:0.4rem;">Quickest turnaround</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">4-up concept board</td><td style="padding:0.4rem;">Fast</td><td style="padding:0.4rem;">Only tier with numImages</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Daily balanced output</td><td style="padding:0.4rem;">Imagen 4</td><td style="padding:0.4rem;">Default sweet spot</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Client delivery</td><td style="padding:0.4rem;">Ultra</td><td style="padding:0.4rem;">Top tier fidelity</td></tr>
                    <tr><td style="padding:0.4rem;">Print / large format</td><td style="padding:0.4rem;">Ultra</td><td style="padding:0.4rem;">Detail-forward rendering</td></tr>
                </tbody>
            </table>
        </section>

        <section class="decision-tree">
            <h2>IV. Selection Decision Tree</h2>
            <pre><code>What is your priority?
|
|-- Speed or multiple variants in one job
|   `-- Imagen 4 Fast (numImages 1-4)
|
|-- Maximum quality for final delivery
|   `-- Imagen 4 Ultra
|
`-- Balanced everyday generation
    `-- Imagen 4 (standard)</code></pre>
        </section>

        <section class="examples">
            <h2>V. Practical Payload Examples</h2>
            <h3>Fast — four variants</h3>
            <pre><code>{
  "model": "imagen4-fast",
  "prompt": "A lively comic scene of two colleagues talking in an office",
  "negativePrompt": "blur, low resolution, watermark",
  "aspectRatio": "16:9",
  "numImages": "4",
  "seed": 12345
}</code></pre>
            <h3>Ultra — cinematic landscape</h3>
            <pre><code>{
  "model": "imagen4-ultra",
  "prompt": "Cinematic lakeside at dusk, reeds and water lilies with golden reflections, slight aerial view",
  "negativePrompt": "blur, noise, distortion, watermark",
  "aspectRatio": "16:9",
  "seed": "42"
}</code></pre>
            <h3>Standard — cozy still life</h3>
            <pre><code>{
  "model": "imagen4-generate",
  "prompt": "An orange cat napping in warm sunlight, cozy home mood",
  "aspectRatio": "1:1",
  "seed": "abc123"
}</code></pre>
        </section>

        <section class="conclusion">
            <h2>VI. Final Recommendations</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Tier</th>
                        <th style="text-align:left; padding:0.5rem;">Model</th>
                        <th style="text-align:left; padding:0.5rem;">Core advantage</th>
                        <th style="text-align:left; padding:0.5rem;">Best for</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Standard</td><td style="padding:0.5rem;">Imagen 4</td><td style="padding:0.5rem;">Balanced quality/speed</td><td style="padding:0.5rem;">Daily users</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Fast</td><td style="padding:0.5rem;">Imagen 4 Fast</td><td style="padding:0.5rem;">Speed + batch</td><td style="padding:0.5rem;">Creators iterating often</td></tr>
                    <tr><td style="padding:0.5rem;">Ultra</td><td style="padding:0.5rem;">Imagen 4 Ultra</td><td style="padding:0.5rem;">Peak fidelity</td><td style="padding:0.5rem;">Designers shipping finals</td></tr>
                </tbody>
            </table>

            <p><strong>One-line playbook:</strong></p>
            <ul>
                <li>Everyday → <a href="/home/imagen4/imagen4-generate">Imagen 4</a>.</li>
                <li>Fast or batch → <a href="/home/imagen4/imagen4-fast">Imagen 4 Fast</a>.</li>
                <li>Professional delivery → <a href="/home/imagen4/imagen4-ultra">Imagen 4 Ultra</a>.</li>
            </ul>
            <p>All three share the same prompt and negative-prompt vocabulary—switch tabs without rewriting your creative brief. Start from <a href="/home/imagen4">/home/imagen4</a>.</p>
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
| **path** | URL slug: `/news/imagen4-three-models-comparison-how-to-choose`. |
| **description** | Summary for list, meta description, and OG (~150 characters). |
| **keyword** | Comma-separated keywords for meta and SEO. |
| **content** | Full HTML; links in section I, VI playbook, `/home/imagen4` hub; deep-dive uses plain routes; VI summary table has no links in Model column. |

## Route mapping

| Model | FuseAI route | Submit `model` value | API path |
|-------|----------------|----------------------|----------|
| Imagen 4 | `/home/imagen4/imagen4-generate` | `imagen4-generate` | `/api/image/imagen4/generate` |
| Imagen 4 Fast | `/home/imagen4/imagen4-fast` | `imagen4-fast` | `/api/image/imagen4/fast-generate` |
| Imagen 4 Ultra | `/home/imagen4/imagen4-ultra` | `imagen4-ultra` | `/api/image/imagen4/ultra-generate` |
| Hub | `/home/imagen4` | — | — |

**Note:** External docs may use `google/imagen4`, `google/imagen4-fast`, and `google/imagen4-ultra`; FuseAI Tools sends `imagen4-generate`, `imagen4-fast`, and `imagen4-ultra` in the request body.
