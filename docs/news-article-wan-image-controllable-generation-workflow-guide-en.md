# News Article: From "Gacha" to "Director": A Controllable Image Generation Workflow Guide — with Wan-Image as the Example

If the previous article discussed how Nano Banana turns "retouching" into an native AI capability, this one explores an even more industrialized direction: what happens when an image model's core competency shifts from "generating one good image" to "precisely controlling every single image"?

**Wan-Image** (Wanxiang Image) is Alibaba's Tongyi Lab's unified image generation and editing model, officially named **Wan2.7-Image**, released on April 1, 2026. It ranked first domestically in "text-to-image" scores in human-preference blind tests, and approached Nano Banana Pro in text rendering, photographic imaging, and world knowledge metrics. But what truly sets it apart is not "how well it draws" — it is that it understands what **"control"** means.

We move beyond "generate and pray" and explore how to use Wan-Image's face-sculpting parameters, color palette HEX control, bbox interactive editing, and batch image-set generation to transform AI from a gacha machine into a controllable design console.

---

### title
From "Gacha" to "Director": A Controllable Image Generation Workflow Guide — with Wan-Image as the Example

### path
`wan-image-controllable-generation-workflow-guide`

### description
When image models shift from "generate and pray" to "precisely control every frame," workflows must evolve. Wan-Image (Wan2.7-Image) — with face-sculpting parameters, HEX color palette control, bbox interactive editing, 3K-token text rendering, and batch generation of up to 12 images — turns AI into a design console that understands "change this, keep that, match this color." This deep guide covers the face-sculpting workflow, color palette precision, bbox editing, model selection between Standard and Pro, pitfalls, and a five-step action checklist.

### keyword
Wan-Image, Wan2.7-Image, controllable image generation, AI face sculpting, HEX color palette, bbox editing, text rendering AI, batch image generation, Alibaba Tongyi, Wan 2.7 Image Pro, FuseAI Tools

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>From "Gacha" to "Director": A Controllable Image Generation Workflow Guide — with Wan-Image as the Example</title>
</head>
<body>
    <article class="ai-model-comparison" style="background:var(--wan-bg, #0b0c0f);background-image:radial-gradient(ellipse 70% 55% at 50% 0, rgba(249,115,22,.08), transparent),radial-gradient(ellipse 55% 45% at 100% 85%, rgba(239,68,68,.06), transparent),linear-gradient(180deg, #131720, #0b0c0f);color:#e5e7eb;padding:20px;border-radius:12px;">

        <section class="introduction">
            <p style="color:#d1d5db;">If the previous article discussed how Nano Banana turns "retouching" into a native AI capability, this one explores an even more industrialized direction: what happens when an image model's core competency shifts from <strong>"generating one good image"</strong> to <strong>"precisely controlling every single image"</strong>?</p>

            <p style="color:#d1d5db;"><strong>Wan-Image</strong> is the image generation and editing model from Alibaba's Tongyi Lab — officially named <strong>Wan2.7-Image</strong>, released on April 1, 2026. It ranked first domestically in "text-to-image" human-preference blind tests, and approached Nano Banana Pro in text rendering, photographic imaging, and world knowledge metrics. But what truly sets it apart is not "how well it draws" — it is that it understands what <strong>"control"</strong> means.</p>

            <p style="color:#d1d5db;">Try Wan-Image on FuseAITools: <a href="https://www.fuseaitools.com/home/wan" style="color:#60a5fa;">Wan Hub</a> · <a href="https://www.fuseaitools.com/home/wan/2-7-image" style="color:#60a5fa;">Wan 2.7 Image</a> · <a href="https://www.fuseaitools.com/home/wan/2-7-image-pro" style="color:#60a5fa;">Wan 2.7 Image Pro</a> — text-to-image, image editing, color palette, bbox regions, and up to 4K output in one unified workflow.</p>
        </section>

        <section class="why-wan-image">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">I. Why Wan-Image? What Fundamentally Separates It from a "Generator"?</h2>
            <p style="color:#d1d5db;">Most image models work like this: you describe a scene, it generates from zero. Whether the result is good depends largely on <strong>"gacha"</strong> — run it a few times, pick one that works. The workflow is essentially a slot machine.</p>

            <p style="color:#d1d5db;">Wan-Image's logic is different — it attempts to <strong>eliminate randomness from the production pipeline</strong>.</p>

            <p style="color:#d1d5db;">This positioning difference comes from its underlying design. Wan-Image adopts a <strong>unified generation-and-understanding architecture</strong>, building semantic mapping in a shared latent space where text sits right next to visuals — the model does not need to guess what scene a word corresponds to. At the data-engineering level, it constructs a multi-dimensional annotation system covering layout, text, lighting, camera angles, and usage context.</p>

            <div style="overflow-x:auto;margin:16px 0;">
                <table style="width:100%;border-collapse:collapse;color:#d1d5db;font-size:14px;">
                    <thead>
                        <tr style="background:rgba(55,65,81,0.4);">
                            <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Dimension</th>
                            <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Traditional Generators (e.g., Midjourney)</th>
                            <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Wan-Image (Controllable Model)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;font-weight:600;color:#f9fafb;">Face generation</td>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Tends toward "AI standard face" — look-alikes</td>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#f97316;">Custom face sculpting: bone structure, eyes, features</td>
                        </tr>
                        <tr>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;font-weight:600;color:#f9fafb;">Color control</td>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Describe "warm tones" and hope for the best</td>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#f97316;">Color palette: HEX codes with precise ratio control</td>
                        </tr>
                        <tr>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;font-weight:600;color:#f9fafb;">Text rendering</td>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Distorted letters, basically unusable</td>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#f97316;">3K-token print-grade rendering — tables and formulas included</td>
                        </tr>
                        <tr>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;font-weight:600;color:#f9fafb;">Editing approach</td>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Local edits ≈ approximate repaint</td>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#f97316;">Bbox interactive editing — click the area you want to change</td>
                        </tr>
                        <tr>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;font-weight:600;color:#f9fafb;">Batch generation</td>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">One by one, consistency by prayer</td>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#f97316;">Up to <strong>12 images</strong> at once with unified style features</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p style="color:#d1d5db;">In short, Wan-Image is not a "painter" — it is an <strong>image control console designed for production pipelines</strong>. You do not sit at a console and pray. You specify parameters, lock values, and execute.</p>
        </section>

        <section class="face-sculpting">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">II. Core Scenario 1: Replace "AI Standard Face" with "Face-Sculpting Parameters"</h2>
            <p style="color:#d1d5db;">One of the most criticized problems in AI image generation is face homogenization — no matter how you describe it, every face looks vaguely "familiar." Wan-Image addresses this pain point with strengthened <strong>virtual character face-sculpting</strong> capabilities.</p>

            <h3 style="color:#f3f4f6;">Basic Structure: Customize from Bone Structure Up</h3>
            <p style="color:#d1d5db;">Wan-Image supports comprehensive customization from bone structure, eyes, to subtle facial features. Specifically, you can specify directly in prompts:</p>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;"><strong style="color:#f97316;">Face shape:</strong> oval, round, square, oblong</li>
                <li style="margin-bottom:6px;"><strong style="color:#f97316;">Eye characteristics:</strong> almond eyes, deep-set eyes, round eyes, phoenix eyes</li>
                <li style="margin-bottom:6px;"><strong style="color:#f97316;">Bone structure parameters:</strong> refine bone structure descriptions in prompts to achieve diverse facial customization</li>
            </ul>

            <h3 style="color:#f3f4f6;">Practical Case: Generating "Distinctive" Characters</h3>
            <p style="color:#d1d5db;">Traditional generative approach (prone to failure):</p>
            <p style="color:#d1d5db;"><em style="color:#f97316;">"A young woman, short hair, smiling."</em></p>
            <p style="color:#d1d5db;">Wan-Image structured approach:</p>
            <p style="color:#d1d5db;"><em style="color:#f97316;">"A 28-year-old woman, oblong face shape, slightly prominent brow bone, phoenix eyes, clear cheekbone lines. Dark short hair, natural smile. Medium shot portrait, soft window light from the left side."</em></p>
            <p style="color:#d1d5db;"><strong style="color:#f97316;">Core idea:</strong> Treat the "face" as a <em>parameterized system</em> rather than gambling on vague adjectives. Wan-Image's face-sculpting function ensures AI no longer just generates a "standard face" — it sculpts distinctive faces based on creative requirements. Use <a href="https://www.fuseaitools.com/home/wan/2-7-image" style="color:#60a5fa;">Wan 2.7 Image</a> for face-sculpting workflows with up to 9 reference images.</p>
        </section>

        <section class="color-palette">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">III. Core Scenario 2: Replace "Color Blind Box" with "Color Palette"</h2>
            <p style="color:#d1d5db;">For designers and brand teams, color precision is the foundation of commercial design. But AI image generation's color control has long been a "blind box" — you say "brand red," and the model gives you something that might lean orange, lean purple, or be completely off.</p>

            <p style="color:#d1d5db;">Wan-Image's <strong>"Color Palette"</strong> feature solves this problem.</p>

            <h3 style="color:#f3f4f6;">Basic Structure: HEX Code + Ratio Control</h3>
            <p style="color:#d1d5db;">Wan-Image supports one-click extraction or manual input of reference image colors via HEX codes with ratio percentages, with full freedom to adjust the number and proportion of colors. This means:</p>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;">You can <strong style="color:#f97316;">write your brand handbook's color values directly</strong> into the prompt</li>
                <li style="margin-bottom:6px;">You can specify the <strong style="color:#f97316;">ratio of primary, secondary, and accent colors</strong></li>
                <li style="margin-bottom:6px;">You can <strong style="color:#f97316;">replicate a master painter's color scheme</strong> (Van Gogh's yellows, Picasso's blues) and migrate it to your composition</li>
            </ul>

            <h3 style="color:#f3f4f6;">Practical Case: Precise Brand Visual Alignment</h3>
            <p style="color:#d1d5db;">Traditional descriptive approach:</p>
            <p style="color:#d1d5db;"><em style="color:#f97316;">"A fresh skincare product poster, light pink and white as the main colors."</em></p>
            <p style="color:#d1d5db;">Wan-Image structured instruction:</p>
            <p style="color:#d1d5db;"><em style="color:#f97316;">"Beauty skincare product promotional image. Primary color #F5E6E8 (light pink), secondary color #FFFFFF (pure white), accent color #A8D5BA (mint green). Products arranged vertically on a light white platform surface, background as a light pink gradient. Pink roses in full bloom distributed on and around the platform, soft petal texture. Eye-level angle, rule-of-thirds composition. Overall palette dominated by light pink, white, and soft blue."</em></p>
            <p style="color:#d1d5db;"><strong style="color:#f97316;">Key difference:</strong> For e-commerce and brand scenarios, color deviation directly impacts conversion rates. The color palette lets brand colors be <em>"hard-coded"</em> in the prompt — not gambled on with every generation. Use <a href="https://www.fuseaitools.com/home/wan/2-7-image" style="color:#60a5fa;">Wan 2.7 Image</a> with the color palette toggle enabled for HEX-precise brand control.</p>
        </section>

        <section class="bbox-editing">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">IV. Core Scenario 3: Replace "Full Repaint" with "Bbox Editing"</h2>
            <p style="color:#d1d5db;">Another core capability of Wan-Image is its <strong>interactive editing module</strong>. It natively supports precise bbox selection — add, align, move, or even perform pixel-level logical replacements within specified regions.</p>

            <h3 style="color:#f3f4f6;">Technique: Click What Bothers You</h3>
            <p style="color:#d1d5db;">When you need to modify an already generated image, you do not need to re-describe the entire scene. Just:</p>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;"><strong style="color:#f97316;">1.</strong> Draw a bbox around the region to modify</li>
                <li style="margin-bottom:6px;"><strong style="color:#f97316;">2.</strong> Describe what to change</li>
                <li style="margin-bottom:6px;"><strong style="color:#f97316;">3.</strong> The model executes the modification only in that region — everything else stays untouched</li>
            </ul>

            <h3 style="color:#f3f4f6;">Practical Case: Modifying Local Elements in a Poster</h3>
            <p style="color:#d1d5db;">Suppose you generated a product poster but a label is positioned incorrectly. The traditional workflow requires regenerating the entire image. With Wan-Image, you can directly:</p>
            <p style="color:#d1d5db;"><em style="color:#f97316;">"Select the label region — move the label 20 pixels to the right, keep all other content unchanged."</em></p>
            <p style="color:#d1d5db;">Or, replace an object in the scene:</p>
            <p style="color:#d1d5db;"><em style="color:#f97316;">"Select the teapot region — replace the teapot with the bottle from the reference image, keep lighting and background unchanged."</em></p>
            <p style="color:#d1d5db;">The core of bbox editing is transforming AI image modification from "regenerate and compare" into <strong>"surgical precision editing."</strong> Use <a href="https://www.fuseaitools.com/home/wan/2-7-image" style="color:#60a5fa;">Wan 2.7 Image</a> with bbox regions for targeted local edits on reference images.</p>
        </section>

        <section class="model-selection">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">V. Model Selection Guide: The Wan-Image Ecosystem</h2>
            <p style="color:#d1d5db;">Wan-Image is not a single model — it is an <strong>ecosystem</strong> covering different production scenarios across two tiers:</p>
            <div style="overflow-x:auto;margin:16px 0;">
                <table style="width:100%;border-collapse:collapse;color:#d1d5db;font-size:14px;">
                    <thead>
                        <tr style="background:rgba(55,65,81,0.4);">
                            <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Model</th>
                            <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Core Positioning</th>
                            <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Best For</th>
                            <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Key Specs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;font-weight:600;color:#f9fafb;">Wan 2.7 Image</td>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Standard edition — full pipeline</td>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Daily creation, content production</td>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Text-to-image, image sets, editing; <strong>1K/2K</strong>; up to 9 refs; sequential mode (n up to 12)</td>
                        </tr>
                        <tr>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;font-weight:600;color:#f9fafb;">Wan 2.7 Image Pro</td>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Flagship edition — print-grade output</td>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Commercial delivery, print-ready creatives</td>
                            <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Same controls + <strong>4K output</strong> (prompt-only, sequential off); more stable composition, finer semantic understanding</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p style="color:#d1d5db;"><strong style="color:#f97316;">Strategic insight:</strong> Wan 2.7 Image covers the vast majority of content creation scenarios — text-to-image, image sets, instructional editing, and interactive editing. Wan 2.7 Image Pro is trained on larger-scale data and dimensions, delivering further improvements in composition stability and semantic understanding precision — ideal for commercial delivery scenarios requiring print-grade output. Both share the same advanced controls: thinking mode, color palette, and bbox regions.</p>
        </section>

        <section class="pitfalls">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">VI. Pitfall Guide: Current Version Limitations</h2>
            <p style="color:#d1d5db;">Wan-Image's controllability is a generational leap, but it still has boundaries. Here are the most common pitfalls:</p>
            <div style="overflow-x:auto;margin:16px 0;">
                <table style="width:100%;border-collapse:collapse;color:#d1d5db;font-size:14px;">
                    <thead>
                        <tr style="background:rgba(55,65,81,0.4);">
                            <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Common Mistake</th>
                            <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Recommended Fix</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#f97316;">Complex bbox edits may be uneven</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">When the edited region interacts with complex neighboring elements, results may not be perfect. Iterate step by step — modify one region at a time.</td></tr>
                        <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#f97316;">Image set count has an upper limit</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Single batch generates up to 12 images. For larger sets, generate in batches and maintain consistency through shared reference images and prompts.</td></tr>
                        <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#f97316;">3K token is the text rendering ceiling</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Ultra-long text rendering supports up to 3K tokens. Very long document content still needs to be split into segments.</td></tr>
                        <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#f97316;">Closed-source since Wan 2.5</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">The Wan 2.7 series is closed-source and cannot be self-hosted. Access via Tongyi Wanxiang official site, Alibaba Cloud Bailian, or Qwen App — or through <a href="https://www.fuseaitools.com/home/wan" style="color:#60a5fa;">FuseAITools</a> for browser-based cloud generation.</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="action-checklist">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">VII. Action Checklist: Integrate Wan-Image into Your Production Pipeline</h2>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:8px;"><strong style="color:#f97316;">1. Build a brand color library.</strong> Convert brand colors to HEX codes and call them directly in the color palette feature — eliminate color deviation at the source. Start with <a href="https://www.fuseaitools.com/home/wan/2-7-image" style="color:#60a5fa;">Wan 2.7 Image</a> and enable the color palette toggle.</li>
                <li style="margin-bottom:8px;"><strong style="color:#f97316;">2. Start with "face-sculpting parameters."</strong> Next time you generate a portrait, do not just write "young woman." Specify face shape and eye characteristics to get distinctive, recognizable faces.</li>
                <li style="margin-bottom:8px;"><strong style="color:#f97316;">3. Try bbox editing.</strong> For modifications to existing assets — moving elements, replacing objects, adjusting positions — do not regenerate. Use bbox regions for targeted editing on <a href="https://www.fuseaitools.com/home/wan/2-7-image" style="color:#60a5fa;">Wan 2.7 Image</a>.</li>
                <li style="margin-bottom:8px;"><strong style="color:#f97316;">4. Use image sets for serialized content.</strong> When you need a unified series of images, generate up to 12 at once instead of praying for consistency one by one. Enable sequential mode for batch output.</li>
                <li style="margin-bottom:8px;"><strong style="color:#f97316;">5. Choose the right version per scenario.</strong> Daily creation and rapid iteration → <a href="https://www.fuseaitools.com/home/wan/2-7-image" style="color:#60a5fa;">Wan 2.7 Image</a> (1K/2K, full pipeline). Commercial delivery and print-grade output → <a href="https://www.fuseaitools.com/home/wan/2-7-image-pro" style="color:#60a5fa;">Wan 2.7 Image Pro</a> (4K, finer composition).</li>
            </ul>
            <p style="color:#d1d5db;">The core view never changes: Wan-Image's competitive edge is not "how stunning a single image looks" — it is bringing <strong>"controllability"</strong> and <strong>"repeatability"</strong> into AI image generation. From face-sculpting parameters to color palettes, from bbox editing to batch image sets, Wan-Image is answering a more practical question: <em>when can AI work like a reliable designer — understanding "change this, keep that, match this color" — instead of gambling from scratch every time?</em></p>
            <p style="color:#d1d5db;">Start your controllable workflow today: <a href="https://www.fuseaitools.com/home/wan" style="color:#60a5fa;">Wan Hub</a> · <a href="https://www.fuseaitools.com/home/wan/2-7-image" style="color:#60a5fa;">Wan 2.7 Image</a> · <a href="https://www.fuseaitools.com/home/wan/2-7-image-pro" style="color:#60a5fa;">Wan 2.7 Image Pro</a>.</p>
        </section>
    </article>
</body>
</html>
```
