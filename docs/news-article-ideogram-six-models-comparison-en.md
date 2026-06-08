# News Article: Ideogram — Six Models Compared (English)

Full entry following the `news-article-standard.md` format: **title / path / description / keyword / content**.

---

### title
Ideogram Image Generation Compared: How to Choose Among Six Core Models

### path
`ideogram-six-models-comparison-how-to-choose`

### description
Compare Ideogram character-edit, character-remix, character, v3-text-to-image, v3-edit, and v3-remix with masks, strength, and FuseAI Tools routes for each workflow.

### keyword
Ideogram, Ideogram character edit, Ideogram v3 text to image, Ideogram v3 edit, Ideogram remix, AI image generation, character consistency, FuseAI Tools

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ideogram: Six Models Compared</title>
</head>
<body>
    <article class="ai-model-comparison">
        <section class="introduction">
            <h2>Introduction: The Ideogram Editing Matrix</h2>
            <p>Ideogram has built a product line around <strong>character consistency</strong> and flexible image editing—from pure text-to-image to masked local edits, scene remixes, and identity-locked character workflows. On FuseAI Tools, six named modes cover the full creative path; the question is which lever to pull for each job.</p>
            <p>This guide maps <strong>character-edit</strong>, <strong>character-remix</strong>, <strong>character</strong>, <strong>v3-text-to-image</strong>, <strong>v3-edit</strong>, and <strong>v3-remix</strong> to representative API fields and the exact routes where you can run them.</p>
            <p><strong>Ideogram hub:</strong> <a href="/home/ideogram">/home/ideogram</a></p>
        </section>

        <section class="positioning-overview">
            <h2>I. Snapshot: Six Models at a Glance</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.88rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.45rem;">Model</th>
                        <th style="text-align:left; padding:0.45rem;">Core function</th>
                        <th style="text-align:left; padding:0.45rem;">Inputs</th>
                        <th style="text-align:left; padding:0.45rem;">Mask</th>
                        <th style="text-align:left; padding:0.45rem;">Character ref</th>
                        <th style="text-align:left; padding:0.45rem;">Positioning</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;"><a href="/home/ideogram/character-edit">character-edit</a></td><td style="padding:0.45rem;">Masked character edit</td><td style="padding:0.45rem;">image + mask + ref + text</td><td style="padding:0.45rem;">✅</td><td style="padding:0.45rem;">✅ (1)</td><td style="padding:0.45rem;">Local character fix</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;"><a href="/home/ideogram/character-remix">character-remix</a></td><td style="padding:0.45rem;">Character scene remix</td><td style="padding:0.45rem;">image + ref + text</td><td style="padding:0.45rem;">❌</td><td style="padding:0.45rem;">✅ (1)</td><td style="padding:0.45rem;">New background, same face</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;"><a href="/home/ideogram/character">character</a></td><td style="padding:0.45rem;">Character in new scene</td><td style="padding:0.45rem;">ref + text</td><td style="padding:0.45rem;">❌</td><td style="padding:0.45rem;">✅ (1)</td><td style="padding:0.45rem;">Scene from reference only</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;"><a href="/home/ideogram/v3-text-to-image">v3-text-to-image</a></td><td style="padding:0.45rem;">Text-to-image</td><td style="padding:0.45rem;">text</td><td style="padding:0.45rem;">❌</td><td style="padding:0.45rem;">❌</td><td style="padding:0.45rem;">Create from zero</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.45rem;"><a href="/home/ideogram/v3-edit">v3-edit</a></td><td style="padding:0.45rem;">Inpainting / local edit</td><td style="padding:0.45rem;">image + mask + text</td><td style="padding:0.45rem;">✅</td><td style="padding:0.45rem;">❌</td><td style="padding:0.45rem;">Generic masked fill</td></tr>
                    <tr><td style="padding:0.45rem;"><a href="/home/ideogram/v3-remix">v3-remix</a></td><td style="padding:0.45rem;">Global remix</td><td style="padding:0.45rem;">image + text</td><td style="padding:0.45rem;">❌</td><td style="padding:0.45rem;">❌</td><td style="padding:0.45rem;">Whole-image restyle</td></tr>
                </tbody>
            </table>
        </section>

        <section class="deep-comparison">
            <h2>II. Six Models Deep Dive</h2>

            <h3>Model 1: character-edit</h3>
            <p>Edit a masked region on a base portrait while locking identity to a separate reference still—ideal for expression tweaks, wardrobe details, or localized refinements.</p>
            <pre><code>{
  "model": "ideogram-character-edit",
  "prompt": "Fill the masked region (max 5000 characters)",
  "imageUrl": "Base image URL",
  "maskUrl": "Mask URL (white = edit, black = keep)",
  "referenceImageUrls": ["Character reference (1 image)"],
  "renderingSpeed": "BALANCED",
  "expandPrompt": true,
  "numImages": "1",
  "seed": 0
}</code></pre>
            <p><strong>Mechanics:</strong> upload base image, mask (same dimensions), and one character reference. FuseAI Tools accepts JPG/PNG/WEBP up to 10MB per asset.</p>
            <p><strong>Best for:</strong> eye/expression changes, localized outfit edits, identity-safe inpainting.</p>
            <p><strong>Route:</strong> /home/ideogram/character-edit</p>

            <h3>Model 2: character-remix</h3>
            <p>Keep a character recognizable while remixing scene and context from an existing frame plus prompt. <code>strength</code> balances fidelity to the source image vs creative freedom.</p>
            <pre><code>{
  "model": "ideogram-character-remix",
  "prompt": "Scene remix brief (max 5000 characters)",
  "imageUrl": "Base image URL",
  "referenceImageUrls": ["Character reference (1 image)"],
  "renderingSpeed": "BALANCED",
  "style": "AUTO",
  "expandPrompt": true,
  "imageSize": "square_hd",
  "numImages": "1",
  "strength": 0.8,
  "negativePrompt": "",
  "seed": 0
}</code></pre>
            <p><strong>Strength guide:</strong> higher (0.8–1.0) preserves more of the original frame; lower (0.1–0.5) follows the prompt more aggressively.</p>
            <p><strong>Best for:</strong> background swaps, environmental storytelling, “same hero, new location.”</p>
            <p><strong>Route:</strong> /home/ideogram/character-remix</p>

            <h3>Model 3: character</h3>
            <p>Place a character into a brand-new scene using only a reference still and text—no base image required.</p>
            <pre><code>{
  "model": "ideogram-character",
  "prompt": "Scene description (max 5000 characters)",
  "referenceImageUrls": ["Character reference (1 image)"],
  "renderingSpeed": "BALANCED",
  "style": "AUTO",
  "expandPrompt": true,
  "imageSize": "square_hd",
  "numImages": "1",
  "negativePrompt": "",
  "seed": 0
}</code></pre>
            <p><strong>vs character-remix:</strong></p>
            <table style="width:100%; border-collapse:collapse; margin:0.75rem 0; font-size:0.88rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.4rem;">Contrast</th>
                        <th style="padding:0.4rem;">character</th>
                        <th style="padding:0.4rem;">character-remix</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Base image</td><td style="padding:0.4rem;">Not required</td><td style="padding:0.4rem;">Required</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Scene source</td><td style="padding:0.4rem;">Prompt only</td><td style="padding:0.4rem;">Original frame + prompt</td></tr>
                    <tr><td style="padding:0.4rem;">strength</td><td style="padding:0.4rem;">N/A</td><td style="padding:0.4rem;">✅</td></tr>
                </tbody>
            </table>
            <p><strong>Best for:</strong> character posters, multi-scene campaigns, net-new compositions anchored to one face.</p>
            <p><strong>Route:</strong> /home/ideogram/character</p>

            <h3>Model 4: v3-text-to-image</h3>
            <p>General-purpose generation from text with style, speed, size, MagicPrompt expansion, and optional negative prompt.</p>
            <pre><code>{
  "model": "ideogram-v3-text-to-image",
  "prompt": "Image description (max 5000 characters)",
  "renderingSpeed": "BALANCED",
  "style": "AUTO",
  "expandPrompt": true,
  "imageSize": "square_hd",
  "negativePrompt": "",
  "seed": 0
}</code></pre>
            <p><strong>Style options:</strong> AUTO, GENERAL, REALISTIC, DESIGN.</p>
            <p><strong>Rendering speed:</strong> TURBO (fastest), BALANCED (default), QUALITY (slowest, highest fidelity).</p>
            <p><strong>Image size examples:</strong> square, square_hd, portrait_4_3, portrait_16_9, landscape_4_3, landscape_16_9.</p>
            <p><strong>Best for:</strong> concept art, product sketches, marketing stills without a reference photo.</p>
            <p><strong>Route:</strong> /home/ideogram/v3-text-to-image</p>

            <h3>Model 5: v3-edit</h3>
            <p>Mask-driven inpainting without a character reference—swap objects, fix backgrounds, or remove artifacts in a selected region.</p>
            <pre><code>{
  "model": "ideogram-v3-edit",
  "prompt": "What to paint inside the mask (max 5000 characters)",
  "imageUrl": "Source image URL",
  "maskUrl": "Mask URL",
  "renderingSpeed": "BALANCED",
  "expandPrompt": true,
  "seed": 0
}</code></pre>
            <p><strong>vs character-edit:</strong> v3-edit is identity-agnostic; character-edit adds <code>referenceImageUrls</code> so faces stay on-model.</p>
            <p><strong>Best for:</strong> prop swaps, watermark cleanup, localized retouching on non-character assets.</p>
            <p><strong>Route:</strong> /home/ideogram/v3-edit</p>

            <h3>Model 6: v3-remix</h3>
            <p>Transform an entire image toward a new style or content direction—no mask, no character reference, with adjustable <code>strength</code>.</p>
            <pre><code>{
  "model": "ideogram-v3-remix",
  "prompt": "Remix direction (max 5000 characters)",
  "imageUrl": "Source image URL",
  "renderingSpeed": "BALANCED",
  "style": "AUTO",
  "expandPrompt": true,
  "imageSize": "square_hd",
  "numImages": "1",
  "strength": 0.8,
  "negativePrompt": "",
  "seed": 0
}</code></pre>
            <p><strong>vs character-remix:</strong> v3-remix does not take a character reference; use character-remix when facial consistency matters.</p>
            <p><strong>Best for:</strong> material changes, illustration styles, holistic art-direction shifts.</p>
            <p><strong>Route:</strong> /home/ideogram/v3-remix</p>
        </section>

        <section class="feature-summary">
            <h2>III. Cross-Model Comparison</h2>
            <h3>3.1 Capability matrix</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.82rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.35rem;">Feature</th>
                        <th style="text-align:left; padding:0.35rem;">char-edit</th>
                        <th style="text-align:left; padding:0.35rem;">char-remix</th>
                        <th style="text-align:left; padding:0.35rem;">char</th>
                        <th style="text-align:left; padding:0.35rem;">v3 T2I</th>
                        <th style="text-align:left; padding:0.35rem;">v3-edit</th>
                        <th style="text-align:left; padding:0.35rem;">v3-remix</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">Text-to-image</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">Mask edit</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">Character reference</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">Global remix</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">strength</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.35rem;">negativePrompt</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td></tr>
                    <tr><td style="padding:0.35rem;">imageSize</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">✅</td><td style="padding:0.35rem;">❌</td><td style="padding:0.35rem;">✅</td></tr>
                </tbody>
            </table>

            <h3>3.2 Character line vs V3 line</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.88rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.4rem;">Product line</th>
                        <th style="text-align:left; padding:0.4rem;">Models</th>
                        <th style="text-align:left; padding:0.4rem;">Core idea</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">Character</td><td style="padding:0.4rem;">character-edit, character-remix, character</td><td style="padding:0.4rem;">Identity-locked edits and scene work</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.4rem;">V3 create</td><td style="padding:0.4rem;">v3-text-to-image</td><td style="padding:0.4rem;">Prompt-only generation</td></tr>
                    <tr><td style="padding:0.4rem;">V3 edit</td><td style="padding:0.4rem;">v3-edit, v3-remix</td><td style="padding:0.4rem;">Generic masked or global edits</td></tr>
                </tbody>
            </table>
        </section>

        <section class="decision-tree">
            <h2>IV. Selection Decision Trees</h2>
            <h3>Character workflows</h3>
            <pre><code>Character consistency required?
|
|-- Local change inside a region (eyes, outfit detail)
|   `-- character-edit (+ mask)
|
|-- New environment but same person
|   |-- Have a frame to remix -> character-remix
|   `-- Start from reference only -> character
|
`-- Campaign with many scenes
    `-- character for new shots; character-remix to adapt existing frames</code></pre>
            <h3>General image workflows</h3>
            <pre><code>No character reference?
|
|-- Create from scratch -> v3-text-to-image
|
`-- Edit existing photo
    |-- Local swap / cleanup -> v3-edit (+ mask)
    `-- Whole-image restyle -> v3-remix</code></pre>
        </section>

        <section class="examples">
            <h2>V. Practical Payload Examples</h2>
            <h3>Expression tweak (character-edit)</h3>
            <pre><code>{
  "model": "ideogram-character-edit",
  "prompt": "Open the eyes and add a gentle forward-looking smile",
  "imageUrl": "https://example.com/portrait.jpg",
  "maskUrl": "https://example.com/eyes-mask.png",
  "referenceImageUrls": ["https://example.com/character-ref.jpg"]
}</code></pre>
            <h3>Background swap (character-remix)</h3>
            <pre><code>{
  "model": "ideogram-character-remix",
  "prompt": "Place the subject at Shibuya crossing at night, neon reflections",
  "imageUrl": "https://example.com/character.jpg",
  "referenceImageUrls": ["https://example.com/character-ref.jpg"],
  "strength": 0.7
}</code></pre>
            <h3>Landscape text-to-image</h3>
            <pre><code>{
  "model": "ideogram-v3-text-to-image",
  "prompt": "Cinematic dusk lakeside, reeds and lily pads with golden reflections",
  "style": "REALISTIC",
  "renderingSpeed": "QUALITY",
  "imageSize": "landscape_16_9"
}</code></pre>
            <h3>Object swap (v3-edit)</h3>
            <pre><code>{
  "model": "ideogram-v3-edit",
  "prompt": "Replace the coffee cup with a red mug",
  "imageUrl": "https://example.com/room.jpg",
  "maskUrl": "https://example.com/cup-mask.png"
}</code></pre>
        </section>

        <section class="conclusion">
            <h2>VI. Final Recommendations</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Use case</th>
                        <th style="text-align:left; padding:0.5rem;">Model</th>
                        <th style="text-align:left; padding:0.5rem;">Why</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Identity-safe local edit</td><td style="padding:0.5rem;">character-edit</td><td style="padding:0.5rem;">Mask + reference lock the face</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Same character, new backdrop</td><td style="padding:0.5rem;">character-remix</td><td style="padding:0.5rem;">Remix with strength control</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Character poster from ref</td><td style="padding:0.5rem;">character</td><td style="padding:0.5rem;">No base frame required</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Fresh illustration / photo</td><td style="padding:0.5rem;">v3-text-to-image</td><td style="padding:0.5rem;">Full V3 style and size stack</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Masked object replace</td><td style="padding:0.5rem;">v3-edit</td><td style="padding:0.5rem;">General inpainting</td></tr>
                    <tr><td style="padding:0.5rem;">Global style shift</td><td style="padding:0.5rem;">v3-remix</td><td style="padding:0.5rem;">Whole-image transformation</td></tr>
                </tbody>
            </table>

            <p><strong>One-line playbook:</strong></p>
            <ul>
                <li>Character consistency → <a href="/home/ideogram/character-edit">character-edit</a>, <a href="/home/ideogram/character-remix">character-remix</a>, or <a href="/home/ideogram/character">character</a>.</li>
                <li>Create from scratch → <a href="/home/ideogram/v3-text-to-image">v3-text-to-image</a>.</li>
                <li>Masked local edit → <a href="/home/ideogram/v3-edit">v3-edit</a>.</li>
                <li>Whole-image remix → <a href="/home/ideogram/v3-remix">v3-remix</a>.</li>
            </ul>
            <p>Open every Ideogram mode from <a href="/home/ideogram">/home/ideogram</a>.</p>
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
| **path** | URL slug: `/news/ideogram-six-models-comparison-how-to-choose`. |
| **description** | Summary for list, meta description, and OG (~155 characters). |
| **keyword** | Comma-separated keywords for meta and SEO. |
| **content** | Full HTML; links in section I, VI playbook, and `/home/ideogram` hub only. **Does not** mention or link `v3-reframe`. Deep-dive sections use plain routes; VI summary table has no links in Model column. |

## Route mapping (six models only)

| Model | FuseAI route |
|-------|----------------|
| character-edit | `/home/ideogram/character-edit` |
| character-remix | `/home/ideogram/character-remix` |
| character | `/home/ideogram/character` |
| v3-text-to-image | `/home/ideogram/v3-text-to-image` |
| v3-edit | `/home/ideogram/v3-edit` |
| v3-remix | `/home/ideogram/v3-remix` |
| Hub | `/home/ideogram` |

**Excluded from article:** `v3-reframe` (per editorial scope—platform has a seventh tab, but this comparison covers the six models above only).
