# News Article: Flux Image — Five Scenarios Compared (English)

Full entry following the `news-article-standard.md` format: **title / path / description / keyword / content**.

---

### title
Flux Image Generation Compared: How to Choose Kontext vs Flux 2 and Pro

### path
`flux-image-five-models-comparison-how-to-choose`

### description
Compare Flux Kontext generate, Flux 2 text/image-to-image, and Flux 2 Pro modes with API parameters, aspect ratios, and FuseAI Tools routes under /home/flux-kontext.

### keyword
Flux Kontext, Flux 2, Flux 2 Pro, AI image generation, text to image, image to image, Black Forest Labs, FuseAI Tools

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flux: Five Image Scenarios Compared</title>
</head>
<body>
    <article class="ai-model-comparison">
        <section class="introduction">
            <h2>Introduction: The Flux Image Matrix</h2>
            <p>Black Forest Labs’ <strong>Flux</strong> stack spans a mature <strong>Kontext</strong> line (unified generate/edit with governance knobs) and a newer <strong>Flux 2</strong> family split into standard and <strong>Pro</strong> tiers for 1K/2K output. On FuseAI Tools, five tabs under <a href="/home/flux-kontext">/home/flux-kontext</a> map to those workflows.</p>
            <p>The common question: when do you need Kontext’s translation, safety, and watermark controls—and when should you move to Flux 2 or Flux 2 Pro for aspect-ratio breadth and multi-image editing?</p>
            <p><strong>Flux hub:</strong> <a href="/home/flux-kontext">/home/flux-kontext</a></p>
        </section>

        <section class="positioning-overview">
            <h2>I. Snapshot: Five Scenarios at a Glance</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.88rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.45rem;">Scenario</th>
                        <th style="text-align:left; padding:0.45rem;">Core function</th>
                        <th style="text-align:left; padding:0.45rem;">Resolution</th>
                        <th style="text-align:left; padding:0.45rem;">Aspect ratios</th>
                        <th style="text-align:left; padding:0.45rem;">Reference images</th>
                        <th style="text-align:left; padding:0.45rem;">Positioning</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;"><a href="/home/flux-kontext/generate">Kontext generate</a></td><td style="padding:0.45rem;">Text-to-image + edit</td><td style="padding:0.45rem;">Standard</td><td style="padding:0.45rem;">6 ratios</td><td style="padding:0.45rem;">Optional (edit)</td><td style="padding:0.45rem;">Pro / Max, governance</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;"><a href="/home/flux-kontext/flux-2-text-to-image">Flux 2 T2I</a></td><td style="padding:0.45rem;">Text-to-image</td><td style="padding:0.45rem;">1K / 2K</td><td style="padding:0.45rem;">8 + auto</td><td style="padding:0.45rem;">❌</td><td style="padding:0.45rem;">Fast 2K drafts</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;"><a href="/home/flux-kontext/flux-2-image-to-image">Flux 2 I2I</a></td><td style="padding:0.45rem;">Image-to-image</td><td style="padding:0.45rem;">1K / 2K</td><td style="padding:0.45rem;">8 + auto</td><td style="padding:0.45rem;">✅ (1–8)</td><td style="padding:0.45rem;">Multi-ref edit</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;"><a href="/home/flux-kontext/flux-2-pro-text-to-image">Flux 2 Pro T2I</a></td><td style="padding:0.45rem;">Text-to-image</td><td style="padding:0.45rem;">1K / 2K</td><td style="padding:0.45rem;">8 + auto</td><td style="padding:0.45rem;">❌</td><td style="padding:0.45rem;">Higher-fidelity T2I</td></tr>
                    <tr><td style="padding:0.45rem;"><a href="/home/flux-kontext/flux-2-pro-image-to-image">Flux 2 Pro I2I</a></td><td style="padding:0.45rem;">Image-to-image</td><td style="padding:0.45rem;">1K / 2K</td><td style="padding:0.45rem;">8 + auto</td><td style="padding:0.45rem;">✅ (1–8)</td><td style="padding:0.45rem;">Pro multi-ref edit</td></tr>
                </tbody>
            </table>
            <p><em>Note:</em> API docs may label the standard Flux 2 tier as “Flex”; on FuseAI Tools the routes are <code>flux-2-text-to-image</code> and <code>flux-2-image-to-image</code>.</p>
        </section>

        <section class="deep-comparison">
            <h2>II. Five Scenarios Deep Dive</h2>

            <h3>Scenario 1: Kontext generate (flux-kontext-pro / flux-kontext-max)</h3>
            <p>One tab covers both pure generation and single-image editing. Pick <strong>Pro</strong> for balanced speed/quality or <strong>Max</strong> for heavier detail on complex briefs.</p>
            <pre><code>{
  "model": "flux-kontext-pro",
  "prompt": "English prompt describing the image or edit",
  "enableTranslation": true,
  "imageUrl": "Optional source image URL (edit mode)",
  "aspectRatio": "RATIO_16_9",
  "outputFormat": "JPEG",
  "promptUpsampling": false,
  "safetyTolerance": 2,
  "watermark": "your-watermark-id"
}</code></pre>
            <p><strong>Key controls:</strong></p>
            <ul>
                <li><strong>enableTranslation</strong> — auto-translate non-English prompts (UI recommends English).</li>
                <li><strong>promptUpsampling</strong> — MagicPrompt-style enhancement (slower).</li>
                <li><strong>safetyTolerance</strong> — 0 (strictest) through 6 (more relaxed).</li>
                <li><strong>watermark</strong> — optional ID embedded on output (max 100 chars on FuseAI Tools).</li>
            </ul>
            <p><strong>Aspect ratios:</strong> 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 (unique ultra-wide 21:9 vs Flux 2 line).</p>
            <p><strong>Best for:</strong> everyday generation, governed edits, teams that need translation and safety sliders.</p>
            <p><strong>Route:</strong> /home/flux-kontext/generate</p>

            <h3>Scenario 2: Flux 2 text-to-image</h3>
            <p>Entry-tier Flux 2 text-to-image with explicit 1K/2K resolution and eight aspect presets plus <code>auto</code>.</p>
            <pre><code>{
  "model": "flux-2-text-to-image",
  "prompt": "3-5000 characters",
  "aspectRatio": "16:9",
  "resolution": "2K"
}</code></pre>
            <p><strong>Aspect ratios:</strong> 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, auto.</p>
            <p><strong>Best for:</strong> quick 2K stills, social crops, cost-conscious iteration.</p>
            <p><strong>Route:</strong> /home/flux-kontext/flux-2-text-to-image</p>

            <h3>Scenario 3: Flux 2 image-to-image</h3>
            <p>Same resolution and ratio stack as Flux 2 T2I, plus <strong>1–8</strong> reference uploads for fusion edits (e.g., swap a product from image B into scene A).</p>
            <pre><code>{
  "model": "flux-2-image-to-image",
  "inputUrls": ["https://example.com/ref-1.jpg", "https://example.com/ref-2.jpg"],
  "prompt": "Describe the edit (3-5000 characters)",
  "aspectRatio": "3:4",
  "resolution": "2K"
}</code></pre>
            <p><strong>Best for:</strong> multi-reference compositing, localized swaps, catalog variations.</p>
            <p><strong>Route:</strong> /home/flux-kontext/flux-2-image-to-image</p>

            <h3>Scenario 4: Flux 2 Pro text-to-image</h3>
            <p>Parameter surface matches Flux 2 T2I; Pro targets higher perceptual quality and detail for delivery assets.</p>
            <pre><code>{
  "model": "flux-2-pro-text-to-image",
  "prompt": "3-5000 characters",
  "aspectRatio": "16:9",
  "resolution": "2K"
}</code></pre>
            <p><strong>vs Flux 2 T2I:</strong> same fields; choose Pro when quality outweighs speed/credits on your plan.</p>
            <p><strong>Best for:</strong> hero banners, campaign key visuals, print-minded 2K stills.</p>
            <p><strong>Route:</strong> /home/flux-kontext/flux-2-pro-text-to-image</p>

            <h3>Scenario 5: Flux 2 Pro image-to-image</h3>
            <p>Pro-grade image-to-image with up to eight references—mirror of Flux 2 I2I with a higher-fidelity backend tier.</p>
            <pre><code>{
  "model": "flux-2-pro-image-to-image",
  "inputUrls": ["https://example.com/person.jpg", "https://example.com/shirt.jpg"],
  "prompt": "Have the person in image 1 wear the shirt from image 2",
  "aspectRatio": "3:4",
  "resolution": "2K"
}</code></pre>
            <p><strong>Best for:</strong> precise multi-image fusion, fashion/product pipelines, final retouch passes.</p>
            <p><strong>Route:</strong> /home/flux-kontext/flux-2-pro-image-to-image</p>
        </section>

        <section class="feature-summary">
            <h2>III. Cross-Scenario Comparison</h2>
            <h3>3.1 Capability matrix</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.82rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.35rem;">Feature</th>
                        <th style="padding:0.35rem;">Kontext</th>
                        <th style="padding:0.35rem;">2 T2I</th>
                        <th style="padding:0.35rem;">2 I2I</th>
                        <th style="padding:0.35rem;">Pro T2I</th>
                        <th style="padding:0.35rem;">Pro I2I</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">Text-to-image</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">Image-to-image</td><td style="padding:0.35rem;">✅ (1 img)</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">1K / 2K resolution</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">Multi-ref (≤8)</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">auto aspect ratio</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">Auto translation</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">Prompt upsampling</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">Safety tolerance</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td></tr>
                    <tr><td style="padding:0.35rem;">Watermark ID</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td></tr>
                </tbody>
            </table>

            <h3>3.2 Prompt limits</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.88rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.4rem;">Line</th>
                        <th style="text-align:left; padding:0.4rem;">Prompt limit</th>
                        <th style="text-align:left; padding:0.4rem;">Language</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Kontext</td><td style="padding:0.4rem;">≤ 5000 chars (UI)</td><td style="padding:0.4rem;">English recommended; optional auto-translate</td></tr>
                    <tr><td style="padding:0.4rem;">Flux 2 / Pro</td><td style="padding:0.4rem;">3–5000 chars</td><td style="padding:0.4rem;">Any (write clear English for best results)</td></tr>
                </tbody>
            </table>

            <h3>3.3 Aspect ratio coverage</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.88rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.4rem;">Ratio</th>
                        <th style="padding:0.4rem;">Kontext</th>
                        <th style="padding:0.4rem;">Flux 2 / Pro</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">21:9</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">16:9 / 9:16</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">4:3 / 3:4 / 1:1</td><td style="padding:0.4rem;">✅</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">3:2 / 2:3</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td></tr>
                    <tr><td style="padding:0.4rem;">auto</td><td style="padding:0.4rem;">❌</td><td style="padding:0.4rem;">✅</td></tr>
                </tbody>
            </table>
        </section>

        <section class="decision-tree">
            <h2>IV. Selection Decision Tree</h2>
            <pre><code>What do you need first?
|
|-- Governance: translation, safety slider, watermark, 21:9
|   `-- Kontext generate (Pro or Max)
|
|-- 2K output + rich ratios (incl. 3:2, 2:3, auto)
|   |-- Text only -> Flux 2 T2I or Flux 2 Pro T2I
|   `-- 1-8 reference images -> Flux 2 I2I or Flux 2 Pro I2I
|
`-- Multi-image fusion edit
    `-- Flux 2 I2I (draft) or Flux 2 Pro I2I (delivery)</code></pre>
        </section>

        <section class="examples">
            <h2>V. Practical Payload Examples</h2>
            <h3>Kontext edit with translation</h3>
            <pre><code>{
  "model": "flux-kontext-pro",
  "prompt": "Change the background to a sunset beach",
  "enableTranslation": true,
  "imageUrl": "https://example.com/portrait.jpg",
  "aspectRatio": "RATIO_16_9"
}</code></pre>
            <h3>Flux 2 — 2K landscape</h3>
            <pre><code>{
  "model": "flux-2-text-to-image",
  "prompt": "Serene mountain lake at sunset, orange sky reflected in still water",
  "aspectRatio": "16:9",
  "resolution": "2K"
}</code></pre>
            <h3>Flux 2 Pro — multi-image fusion</h3>
            <pre><code>{
  "model": "flux-2-pro-image-to-image",
  "inputUrls": [
    "https://example.com/person.jpg",
    "https://example.com/shirt.jpg"
  ],
  "prompt": "Person from image 1 wearing the shirt from image 2",
  "aspectRatio": "3:4",
  "resolution": "2K"
}</code></pre>
        </section>

        <section class="conclusion">
            <h2>VI. Final Recommendations</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Use case</th>
                        <th style="text-align:left; padding:0.5rem;">Scenario</th>
                        <th style="text-align:left; padding:0.5rem;">Why</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">All-in-one with controls</td><td style="padding:0.5rem;">Kontext generate</td><td style="padding:0.5rem;">Translation, safety, watermark, 21:9</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Fast 2K text-to-image</td><td style="padding:0.5rem;">Flux 2 T2I</td><td style="padding:0.5rem;">Best credits/speed tradeoff</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Multi-ref editing</td><td style="padding:0.5rem;">Flux 2 I2I</td><td style="padding:0.5rem;">Up to 8 inputUrls</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Delivery-quality T2I</td><td style="padding:0.5rem;">Flux 2 Pro T2I</td><td style="padding:0.5rem;">Highest Flux 2 text tier</td></tr>
                    <tr><td style="padding:0.5rem;">Delivery-quality I2I</td><td style="padding:0.5rem;">Flux 2 Pro I2I</td><td style="padding:0.5rem;">Pro fusion + 2K</td></tr>
                </tbody>
            </table>

            <p><strong>One-line playbook:</strong></p>
            <ul>
                <li>Controls + single-image edit → <a href="/home/flux-kontext/generate">Kontext generate</a>.</li>
                <li>Everyday 2K → <a href="/home/flux-kontext/flux-2-text-to-image">Flux 2 T2I</a> / <a href="/home/flux-kontext/flux-2-image-to-image">Flux 2 I2I</a>.</li>
                <li>Final quality → <a href="/home/flux-kontext/flux-2-pro-text-to-image">Flux 2 Pro T2I</a> / <a href="/home/flux-kontext/flux-2-pro-image-to-image">Flux 2 Pro I2I</a>.</li>
            </ul>
            <p>Kontext and Flux 2 complement each other: draft and govern on Kontext, scale to 2K and multi-reference on Flux 2. Open all modes from <a href="/home/flux-kontext">/home/flux-kontext</a>.</p>
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
| **path** | URL slug: `/news/flux-image-five-models-comparison-how-to-choose`. |
| **description** | Summary for list, meta description, and OG (~155 characters). |
| **keyword** | Comma-separated keywords for meta and SEO. |
| **content** | Full HTML; links in section I, VI playbook, `/home/flux-kontext` hub; deep-dive uses plain routes; VI summary table has no links in Scenario column. |

## Route mapping (five scenarios)

| Scenario | FuseAI route | API model key (submit body) |
|----------|----------------|-----------------------------|
| Kontext generate | `/home/flux-kontext/generate` | `flux-kontext-pro` or `flux-kontext-max` |
| Flux 2 text-to-image | `/home/flux-kontext/flux-2-text-to-image` | `flux-2-text-to-image` |
| Flux 2 image-to-image | `/home/flux-kontext/flux-2-image-to-image` | `flux-2-image-to-image` |
| Flux 2 Pro text-to-image | `/home/flux-kontext/flux-2-pro-text-to-image` | `flux-2-pro-text-to-image` |
| Flux 2 Pro image-to-image | `/home/flux-kontext/flux-2-pro-image-to-image` | `flux-2-pro-image-to-image` |
| Hub | `/home/flux-kontext` | — |

**Naming note:** External docs may say “Flex”; FuseAI routes use the `flux-2-*` prefix. Resolution on Flux 2 tabs is **1K or 2K only** (no 4K in the UI).
