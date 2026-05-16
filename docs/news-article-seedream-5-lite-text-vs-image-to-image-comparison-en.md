# News Article: Seedream 5 Lite Text-to-Image vs Image-to-Image — How to Choose (English)

Full entry following the `news-article-standard.md` format: **title / path / description / keyword / content**.

---

### title
Seedream 5 Lite Text-to-Image vs Image-to-Image: How to Choose Between the Two Core Models

### path
`seedream-5-lite-text-vs-image-to-image-how-to-choose`

### description
Compare Seedream 5 Lite text-to-image and image-to-image with parameters, resolution tiers, reference limits, decision logic, and direct FuseAI Tools routes for both modes.

### keyword
Seedream 5 Lite, Seedream text-to-image, Seedream image-to-image, ByteDance Seedream, AI image generation, image editing AI, FuseAI Tools, /home/seedream

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seedream 5 Lite: Text-to-Image vs Image-to-Image</title>
</head>
<body>
    <article class="ai-model-comparison">
        <section class="introduction">
            <h2>Introduction: ByteDance Seedream's Dual Core for Still Images</h2>
            <p>ByteDance Seedream is known for high-quality output and flexible controls. Within Seedream 5 Lite, two complementary modes anchor most workflows: <strong>text-to-image</strong> for creation from prompts alone, and <strong>image-to-image</strong> for reference-driven edits, style transfer, and multi-image fusion.</p>
            <p>The practical question is always the same: when should you stay in pure text generation, and when do you need reference images?</p>
            <p>This guide compares both modes using complete parameter shapes and turns differences into a simple selection framework.</p>
            <p><strong>Seedream hub:</strong> <a href="/home/seedream">/home/seedream</a></p>
        </section>

        <section class="positioning-overview">
            <h2>I. Snapshot: One Table for Both Modes</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Dimension</th>
                        <th style="text-align:left; padding:0.5rem;"><a href="/home/seedream/5-lite-text-to-image">Seedream 5 Lite Text-to-Image</a></th>
                        <th style="text-align:left; padding:0.5rem;"><a href="/home/seedream/5-lite-image-to-image">Seedream 5 Lite Image-to-Image</a></th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Core function</td><td style="padding:0.5rem;">Generate from text only</td><td style="padding:0.5rem;">Edit / generate from refs + text</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Input</td><td style="padding:0.5rem;">Prompt only (up to ~3000 chars)</td><td style="padding:0.5rem;">1-14 reference images + prompt</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Output (basic / high)</td><td style="padding:0.5rem;">2K / 3K</td><td style="padding:0.5rem;">2K / 4K</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Aspect ratios</td><td style="padding:0.5rem;">8 options</td><td style="padding:0.5rem;">8 options</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Reference images</td><td style="padding:0.5rem;">None</td><td style="padding:0.5rem;">Up to 14</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Typical use</td><td style="padding:0.5rem;">Concept art, ads from scratch</td><td style="padding:0.5rem;">Style transfer, local edits, fusion</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Learning curve</td><td style="padding:0.5rem;">Easy</td><td style="padding:0.5rem;">Medium</td></tr>
                    <tr><td style="padding:0.5rem;">Positioning</td><td style="padding:0.5rem;">Creative generation</td><td style="padding:0.5rem;">Precise control</td></tr>
                </tbody>
            </table>
        </section>

        <section class="deep-comparison">
            <h2>II. Two Models Deep Dive</h2>

            <h3>Model 1: Seedream 5 Lite Text-to-Image</h3>
            <p>The baseline Seedream 5 Lite route for generating brand-new images purely from language.</p>
            <pre><code>{
  "model": "seedream/5-lite-text-to-image",
  "prompt": "Image description (max ~3000 chars)",
  "aspect_ratio": "1:1 / 4:3 / 3:4 / 16:9 / 9:16 / 2:3 / 3:2 / 21:9",
  "quality": "basic / high"
}</code></pre>
            <p><strong>Highlights:</strong> no reference assets required; long prompts; <code>basic</code> targets 2K-class output, <code>high</code> targets 3K-class output.</p>
            <p><strong>Use cases:</strong> zero-to-one concepts, hero visuals without source photos, exploration before refinement.</p>
            <p><strong>Route:</strong> /home/seedream/5-lite-text-to-image</p>

            <h3>Model 2: Seedream 5 Lite Image-to-Image</h3>
            <p>Reference-first workflow for edits, material changes, and blending multiple visual cues.</p>
            <pre><code>{
  "model": "seedream/5-lite-image-to-image",
  "prompt": "Edit or fusion instructions (max ~3000 chars)",
  "image_urls": ["Reference image URLs (1-14)"],
  "aspect_ratio": "1:1 / 4:3 / 3:4 / 16:9 / 9:16 / 2:3 / 3:2 / 21:9",
  "quality": "basic / high"
}</code></pre>
            <p><strong>Highlights:</strong> requires at least one image; up to 14 references; <code>high</code> reaches 4K-class output (higher ceiling than text-only high); typical limits include jpeg/png/webp up to ~10MB per file.</p>
            <p><strong>Use cases:</strong> style or material swaps with structure preserved, localized edits, multi-reference fusion.</p>
            <p><strong>Route:</strong> /home/seedream/5-lite-image-to-image</p>
        </section>

        <section class="feature-summary">
            <h2>III. Head-to-Head Comparison</h2>

            <h3>3.1 Resolution by quality tier</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Quality</th>
                        <th style="text-align:left; padding:0.5rem;">Text-to-Image</th>
                        <th style="text-align:left; padding:0.5rem;">Image-to-Image</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">basic</td><td style="padding:0.5rem;">2K-oriented</td><td style="padding:0.5rem;">2K-oriented</td></tr>
                    <tr><td style="padding:0.5rem;">high</td><td style="padding:0.5rem;">3K-oriented</td><td style="padding:0.5rem;">4K-oriented</td></tr>
                </tbody>
            </table>
            <p><strong>Takeaway:</strong> if maximum pixel budget matters and you already have references, image-to-image high often wins.</p>

            <h3>3.2 Input flexibility</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Capability</th>
                        <th style="text-align:left; padding:0.5rem;">Text-to-Image</th>
                        <th style="text-align:left; padding:0.5rem;">Image-to-Image</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Prompt-only input</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Single reference</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Multi-image fusion</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">✅ (max 14)</td></tr>
                    <tr><td style="padding:0.5rem;">Preserve layout / structure</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">✅</td></tr>
                </tbody>
            </table>

            <h3>3.3 Task routing cheat sheet</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Task</th>
                        <th style="text-align:left; padding:0.5rem;">Recommended mode</th>
                        <th style="text-align:left; padding:0.5rem;">Reason</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">“Draw a cat on grass” with no photo</td><td style="padding:0.5rem;">Text-to-Image</td><td style="padding:0.5rem;">Pure creation</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Change fur color on an existing cat photo</td><td style="padding:0.5rem;">Image-to-Image</td><td style="padding:0.5rem;">Anchored edit</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Tech cover with no assets</td><td style="padding:0.5rem;">Text-to-Image</td><td style="padding:0.5rem;">Fast ideation</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Summer photo → winter mood, same composition</td><td style="padding:0.5rem;">Image-to-Image</td><td style="padding:0.5rem;">Structure lock</td></tr>
                    <tr><td style="padding:0.5rem;">Merge composition A with palette B</td><td style="padding:0.5rem;">Image-to-Image</td><td style="padding:0.5rem;">Multi-reference fusion</td></tr>
                </tbody>
            </table>
        </section>

        <section class="decision-tree">
            <h2>IV. Selection Decision Tree</h2>
            <pre><code>What is your task?
|
|-- No reference images at all
|   `-- Create from scratch -> Text-to-Image
|
|-- You have 1-14 reference images
|   |-- Change material / style -> Image-to-Image
|   |-- Local element swap -> Image-to-Image
|   |-- Fuse multiple references -> Image-to-Image
|   `-- Keep structure, change look -> Image-to-Image
|
`-- Pixel budget priority
    |-- Need ~3K-class peak from prompt-only -> Text-to-Image (high)
    `-- Need ~4K-class peak with refs -> Image-to-Image (high)</code></pre>
        </section>

        <section class="unique-advantages">
            <h2>V. Why Seedream 5 Lite Stands Out</h2>
            <h3>5.1 Resolution ladder</h3>
            <p>Text-to-image high emphasizes crisp 3K-class delivery; image-to-image high pushes toward 4K-class output when references justify the extra detail.</p>
            <h3>5.2 Long prompts</h3>
            <p>Both modes accept very long natural-language briefs (on the order of thousands of characters) so art direction, lighting, and brand cues can live inside one prompt.</p>
            <h3>5.3 Eight aspect ratios</h3>
            <p>Shared ratio set spans square, portrait, landscape, and cinematic 21:9—enough for social, landing pages, and widescreen hero art.</p>
            <h3>5.4 Deep reference stacks</h3>
            <p>Image-to-image supports up to fourteen references—strong for mashups and iterative pipelines where multiple cues must coexist.</p>
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
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Zero-reference creation</td><td style="padding:0.5rem;">Text-to-Image</td><td style="padding:0.5rem;">Prompt-only freedom</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Style or material transfer</td><td style="padding:0.5rem;">Image-to-Image</td><td style="padding:0.5rem;">Preserves structure while restyling</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Surgical edits</td><td style="padding:0.5rem;">Image-to-Image</td><td style="padding:0.5rem;">Grounded in pixels you already trust</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Heavy multi-image fusion</td><td style="padding:0.5rem;">Image-to-Image</td><td style="padding:0.5rem;">Up to 14 references</td></tr>
                    <tr><td style="padding:0.5rem;">Maximum resolution with references</td><td style="padding:0.5rem;">Image-to-Image (high)</td><td style="padding:0.5rem;">4K-class ceiling</td></tr>
                </tbody>
            </table>

            <p><strong>One-line playbook:</strong></p>
            <ul>
                <li>No reference images → <a href="/home/seedream/5-lite-text-to-image">Text-to-Image</a>.</li>
                <li>Need edits, fusion, or structure preservation → <a href="/home/seedream/5-lite-image-to-image">Image-to-Image</a>.</li>
                <li>The modes complement each other: draft with text-to-image, polish with image-to-image.</li>
            </ul>

            <p>Run both parameter sets directly on FuseAI Tools—start from <a href="/home/seedream">/home/seedream</a>.</p>
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
| **path** | URL slug: `/news/seedream-5-lite-text-vs-image-to-image-how-to-choose`. |
| **description** | Summary for list, meta description, and OG (target 120-160 chars). |
| **keyword** | Comma-separated keywords for meta and SEO. |
| **content** | Full HTML body; relative links in section I (table headers), VI playbook list, and `/home/seedream` hub; VI Scenario/Pick/Why table has no links in Pick column. |
