# News Article: Wan Image 2.7 — Standard vs Pro: How to Choose (English)

Full entry following the `news-article-standard.md` format: **title / path / description / keyword / content**.

---

### title
Wan Image 2.7 Standard vs Pro: How to Choose Between Alibaba Cloud's Two Core Image Models

### path
`wan-image-2-7-standard-vs-pro-how-to-choose`

### description
Compare Alibaba Cloud Wan 2.7 Image and Image Pro with shared parameters, strict 4K eligibility, resolution matrices, and practical FuseAI Tools routing for standard vs Pro workflows.

### keyword
Wan 2.7 Image, Wan 2.7 Image Pro, Alibaba Wan image, Tongyi Wanxiang, AI image generation, 4K text-to-image, FuseAI Tools, /home/wan

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wan Image 2.7: Standard vs Pro Compared</title>
</head>
<body>
    <article class="ai-model-comparison">
        <section class="introduction">
            <h2>Introduction: Wan Image's Two-Tier Stack</h2>
            <p>Alibaba Tongyi Wanxiang's Wan image lineup centers on two closely related models: <strong>Wan 2.7 Image</strong> (standard) and <strong>Wan 2.7 Image Pro</strong> (professional). They share the same control surface—aspect ratios, sequential batches, thinking mode, palettes, and bbox edits—yet diverge where pixel budget matters most.</p>
            <p>The recurring question is simple: what exactly is "Pro," and when does paying for Pro return real value?</p>
            <p>This guide compares both APIs side by side, spells out the only meaningful capability gap (4K eligibility), and ends with routing you can hand to production teams.</p>
            <p><strong>Wan hub:</strong> <a href="/home/wan">/home/wan</a></p>
        </section>

        <section class="positioning-overview">
            <h2>I. Snapshot: One Table for Both Versions</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Dimension</th>
                        <th style="text-align:left; padding:0.5rem;"><a href="/home/wan/2-7-image">Wan 2.7 Image (Standard)</a></th>
                        <th style="text-align:left; padding:0.5rem;"><a href="/home/wan/2-7-image-pro">Wan 2.7 Image Pro</a></th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Positioning</td><td style="padding:0.5rem;">Everyday generation</td><td style="padding:0.5rem;">Pro-grade delivery</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Peak resolution</td><td style="padding:0.5rem;">Up to 2K</td><td style="padding:0.5rem;">Up to 4K (qualified text-only)</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Aspect ratios</td><td style="padding:0.5rem;">8 presets</td><td style="padding:0.5rem;">8 presets (same set)</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Sequential / group mode</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Thinking mode</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Color palette</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Local edit (bbox)</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Max input images</td><td style="padding:0.5rem;">9</td><td style="padding:0.5rem;">9</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Max outputs per call</td><td style="padding:0.5rem;">4 (normal) / 12 (sequential)</td><td style="padding:0.5rem;">4 (normal) / 12 (sequential)</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Pricing</td><td style="padding:0.5rem;">Lower</td><td style="padding:0.5rem;">Higher</td></tr>
                    <tr><td style="padding:0.5rem;">Typical buyer</td><td style="padding:0.5rem;">Creators, social teams</td><td style="padding:0.5rem;">Studios, brand design, print</td></tr>
                </tbody>
            </table>
        </section>

        <section class="deep-comparison">
            <h2>II. Two Models Deep Dive</h2>

            <h3>Model 1: Wan 2.7 Image (Standard)</h3>
            <p>The baseline Wan image model for day-to-day text-to-image and image-to-image work.</p>
            <pre><code>{
  "model": "wan/2-7-image",
  "prompt": "Generation or edit prompt (max 5000 chars)",
  "input_urls": ["Optional, up to 9 input images"],
  "aspect_ratio": "1:1 / 16:9 / 4:3 / 21:9 / 3:4 / 9:16 / 8:1 / 1:8",
  "enable_sequential": false,
  "n": 4,
  "resolution": "1K / 2K",
  "thinking_mode": false,
  "color_palette": ["Optional, 3-10 colors"],
  "bbox_list": ["Optional region boxes"],
  "watermark": false,
  "seed": 0
}</code></pre>
            <p><strong>Highlights:</strong> <code>resolution</code> tops out at <strong>1K / 2K</strong>; <code>n</code> supports 1-4 in normal mode or 1-12 when sequential grouping is enabled.</p>
            <p><strong>Use cases:</strong> social posts, ecommerce stills, blog covers, fast concept boards.</p>
            <p><strong>Route:</strong> /home/wan/2-7-image</p>

            <h3>Model 2: Wan 2.7 Image Pro</h3>
            <p>Same control vocabulary with a higher ceiling—<strong>4K</strong> when all eligibility gates pass.</p>
            <pre><code>{
  "model": "wan/2-7-image-pro",
  "prompt": "Generation or edit prompt (max 5000 chars)",
  "input_urls": ["Optional, up to 9 input images"],
  "aspect_ratio": "1:1 / 16:9 / 4:3 / 21:9 / 3:4 / 9:16 / 8:1 / 1:8",
  "enable_sequential": false,
  "n": 4,
  "resolution": "1K / 2K / 4K",
  "thinking_mode": false,
  "color_palette": ["Optional, 3-10 colors"],
  "bbox_list": ["Optional region boxes"],
  "watermark": false,
  "seed": 0
}</code></pre>
            <p><strong>Pro-only headline:</strong> <code>resolution</code> may include <strong>4K</strong>, but only under strict conditions (see section III).</p>
            <p><strong>Use cases:</strong> large-format print, flagship hero art, photography-grade finals when pure text generation is enough.</p>
            <p><strong>Route:</strong> /home/wan/2-7-image-pro</p>
        </section>

        <section class="feature-summary">
            <h2>III. Head-to-Head Comparison</h2>

            <h3>3.1 Resolution matrix</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Mode</th>
                        <th style="text-align:left; padding:0.5rem;">Standard peak</th>
                        <th style="text-align:left; padding:0.5rem;">Pro peak</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Text-to-image (normal)</td><td style="padding:0.5rem;">2K</td><td style="padding:0.5rem;">4K</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Text-to-image (sequential / group)</td><td style="padding:0.5rem;">2K</td><td style="padding:0.5rem;">2K</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Image-to-image</td><td style="padding:0.5rem;">2K</td><td style="padding:0.5rem;">2K</td></tr>
                    <tr><td style="padding:0.5rem;">Thinking mode</td><td style="padding:0.5rem;">2K</td><td style="padding:0.5rem;">2K</td></tr>
                </tbody>
            </table>
            <p><strong>Pixel scale reference:</strong> 4K ≈ 4096×4096 (~16M pixels) vs 2K ≈ 2048×2048 (~4M pixels)—up to ~4× pixel count when 4K is allowed.</p>

            <h3>3.2 4K eligibility (Pro only)</h3>
            <pre><code>4K output =
  pure text-to-image (no input_urls)
  + non-sequential mode (enable_sequential = false)
  + resolution = "4K"</code></pre>
            <p>Sequential batches, image-conditioned edits, and thinking workflows remain capped like the standard tier even on Pro.</p>

            <h3>3.3 Parameter parity</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Parameter</th>
                        <th style="text-align:left; padding:0.5rem;">Standard</th>
                        <th style="text-align:left; padding:0.5rem;">Pro</th>
                        <th style="text-align:left; padding:0.5rem;">Match?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Max prompt length</td><td style="padding:0.5rem;">5000 chars</td><td style="padding:0.5rem;">5000 chars</td><td style="padding:0.5rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Max input images</td><td style="padding:0.5rem;">9</td><td style="padding:0.5rem;">9</td><td style="padding:0.5rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Aspect ratios</td><td style="padding:0.5rem;">8</td><td style="padding:0.5rem;">8</td><td style="padding:0.5rem;">✅</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Sequential + thinking + palette + bbox</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">✅</td></tr>
                    <tr><td style="padding:0.5rem;">4K resolution option</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">✅ (qualified)</td><td style="padding:0.5rem;">❌</td></tr>
                </tbody>
            </table>
            <p><strong>Conclusion:</strong> feature sets are effectively identical; the purchase decision is whether you repeatedly need gated 4K text-only finals.</p>
        </section>

        <section class="decision-tree">
            <h2>IV. Selection Decision Tree</h2>
            <pre><code>What is your task?
|
|-- Social posts, blog covers, ecommerce hero stills
|   `-- Standard (2K is usually enough)
|
|-- Large print, billboards, flagship brand masters
|   `-- Pro when you can meet pure-text 4K rules
|
|-- Sequential / animation-style batches
|   `-- Standard (Pro does not unlock 4K here)
|
|-- Image-to-image edits
|   `-- Standard (Pro does not unlock 4K here)
|
`-- Thinking mode with heavy prompt refinement
    `-- Standard (Pro does not unlock 4K here)</code></pre>
        </section>

        <section class="practical-tips">
            <h2>V. Practical Guidance</h2>
            <h3>5.1 When Pro actually pays off</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Scenario</th>
                        <th style="text-align:left; padding:0.5rem;">Need Pro?</th>
                        <th style="text-align:left; padding:0.5rem;">Reason</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">WeChat / Xiaohongshu tiles</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">2K covers delivery</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Newsletter hero</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">2K covers delivery</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Offline poster print</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">Need 4K headroom</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Large outdoor boards</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">Need 4K headroom</td></tr>
                    <tr><td style="padding:0.5rem;">Brand VI / photography finals</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">Need 4K headroom</td></tr>
                </tbody>
            </table>

            <h3>5.2 Cost guardrail</h3>
            <p>If your pipeline never satisfies the pure-text, non-sequential 4K gate, Pro behaves like Standard for practical purposes—route spend accordingly.</p>

            <h3>5.3 Suggested dual workflow</h3>
            <pre><code>1. Ideation / volume passes -> Standard (fast, lower cost)
2. Locked creative + eligible 4K brief -> Pro for finals</code></pre>
        </section>

        <section class="conclusion">
            <h2>VI. Final Recommendations</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Use case</th>
                        <th style="text-align:left; padding:0.5rem;">Version</th>
                        <th style="text-align:left; padding:0.5rem;">Why</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Everyday design</td><td style="padding:0.5rem;">Standard</td><td style="padding:0.5rem;">2K suffices, lower cost</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Eligible 4K text-only finals</td><td style="padding:0.5rem;">Pro</td><td style="padding:0.5rem;">Only tier with 4K path</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Sequential / group generation</td><td style="padding:0.5rem;">Standard</td><td style="padding:0.5rem;">Pro does not add 4K here</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Image-to-image edits</td><td style="padding:0.5rem;">Standard</td><td style="padding:0.5rem;">Pro does not add 4K here</td></tr>
                    <tr><td style="padding:0.5rem;">Thinking mode passes</td><td style="padding:0.5rem;">Standard</td><td style="padding:0.5rem;">Pro does not add 4K here</td></tr>
                </tbody>
            </table>

            <p><strong>One-line playbook:</strong></p>
            <ul>
                <li>No 4K requirement → <a href="/home/wan/2-7-image">Wan 2.7 Image (Standard)</a>.</li>
                <li>Pure text, non-sequential, needs 4K → <a href="/home/wan/2-7-image-pro">Wan 2.7 Image Pro</a>.</li>
                <li>For every other mode, pick Standard unless pricing policies change—capabilities align.</li>
            </ul>

            <p>Run both parameter stacks from the Wan overview: <a href="/home/wan">/home/wan</a>.</p>
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
| **path** | URL slug: `/news/wan-image-2-7-standard-vs-pro-how-to-choose`. |
| **description** | Summary for list, meta description, and OG (120-160 chars target). |
| **keyword** | Comma-separated keywords for meta and SEO. |
| **content** | Full HTML body; links in section I column headers, VI playbook list, `/home/wan` hub; deep-dive and VI summary tables use plain route text / no links in Version column. |
