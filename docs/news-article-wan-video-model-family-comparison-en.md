# News Article: Wan Video Model Family Comparison — How to Choose Seven Versions (English)

Full entry following the `news-article-standard.md` format: **title / path / description / keyword / content**.

---

### title
Wan Video Model Family Comparison: How to Choose Across Seven Core Versions

### path
`wan-video-model-family-comparison-seven-versions`

### description
Compare seven Wan video models across 2.6 and 2.7 routes with key parameters, feature differences, and practical selection guidance for each workflow.

### keyword
Wan video model comparison, Wan text-to-video, Wan image-to-video, Wan video-to-video, Wan v2-7 text-to-video, Wan v2-7 image-to-video, Wan v2-7 video-edit, Wan v2-7 r2v, AI video generation, FuseAI Tools

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wan Video Model Family Comparison: How to Choose Seven Versions</title>
</head>
<body>
    <article class="ai-model-comparison">
        <section class="introduction">
            <h2>Introduction: Alibaba Cloud's Wan Video Empire</h2>
            <p>In 2026, the Wan family is building a complete AI video matrix: from text-to-video and image-driven animation to video editing and multimodal reference fusion. According to public performance discussions, Wan2.1 has become one of the strongest global video foundation stacks in practical evaluations.</p>
            <p>But for most users, the biggest confusion remains the same: what are the real differences between text-to-video, image-to-video, video-to-video, video-edit, and r2v, and which version should I use first?</p>
            <p>This article maps all seven Wan variants based on complete API parameter structures and helps you make route-level decisions quickly.</p>
            <p><strong>Wan tool hub:</strong> <a href="/home/wan">/home/wan</a></p>
        </section>

        <section class="positioning-overview">
            <h2>I. Family Snapshot: One Table to Understand All Seven</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">No.</th>
                        <th style="text-align:left; padding:0.5rem;">Model version</th>
                        <th style="text-align:left; padding:0.5rem;">Core function</th>
                        <th style="text-align:left; padding:0.5rem;">Input type</th>
                        <th style="text-align:left; padding:0.5rem;">Duration</th>
                        <th style="text-align:left; padding:0.5rem;">Unique advantage</th>
                        <th style="text-align:left; padding:0.5rem;">Best scenario</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">1</td><td style="padding:0.5rem;"><a href="/home/wan/text-to-video">2.6 text-to-video</a></td><td style="padding:0.5rem;">Text to video</td><td style="padding:0.5rem;">Prompt</td><td style="padding:0.5rem;">5/10/15s</td><td style="padding:0.5rem;">Up to 15s, detail-friendly</td><td style="padding:0.5rem;">Creative generation, ad drafts</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">2</td><td style="padding:0.5rem;"><a href="/home/wan/image-to-video">2.6 image-to-video</a></td><td style="padding:0.5rem;">Image to video</td><td style="padding:0.5rem;">One image + prompt</td><td style="padding:0.5rem;">5/10/15s</td><td style="padding:0.5rem;">Image-driven animation</td><td style="padding:0.5rem;">Animate static visuals</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">3</td><td style="padding:0.5rem;"><a href="/home/wan/video-to-video">2.6 video-to-video</a></td><td style="padding:0.5rem;">Video to video</td><td style="padding:0.5rem;">1-3 videos + prompt</td><td style="padding:0.5rem;">5/10s</td><td style="padding:0.5rem;">Multi-video blending</td><td style="padding:0.5rem;">Style transfer, reenactment</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">4</td><td style="padding:0.5rem;"><a href="/home/wan/v2-7-text-to-video">2.7 text-to-video</a></td><td style="padding:0.5rem;">Enhanced text to video</td><td style="padding:0.5rem;">Prompt + negative prompt</td><td style="padding:0.5rem;">2-15s</td><td style="padding:0.5rem;">Negative prompt + rewrite</td><td style="padding:0.5rem;">Precise generation control</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">5</td><td style="padding:0.5rem;"><a href="/home/wan/v2-7-image-to-video">2.7 image-to-video</a></td><td style="padding:0.5rem;">Enhanced image to video</td><td style="padding:0.5rem;">First/last frame + audio</td><td style="padding:0.5rem;">2-15s</td><td style="padding:0.5rem;">Keyframe and audio-driven</td><td style="padding:0.5rem;">Storyboard-like animation</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">6</td><td style="padding:0.5rem;"><a href="/home/wan/v2-7-video-edit">2.7 video-edit</a></td><td style="padding:0.5rem;">Video editing</td><td style="padding:0.5rem;">Video + ref image + prompt</td><td style="padding:0.5rem;">2-10s</td><td style="padding:0.5rem;">Local editing + ref control</td><td style="padding:0.5rem;">Outfit and background swap</td></tr>
                    <tr><td style="padding:0.5rem;">7</td><td style="padding:0.5rem;"><a href="/home/wan/v2-7-r2v">2.7 r2v</a></td><td style="padding:0.5rem;">Reference-to-video</td><td style="padding:0.5rem;">Image + video + audio</td><td style="padding:0.5rem;">2-10s</td><td style="padding:0.5rem;">Multimodal fusion</td><td style="padding:0.5rem;">Complex character consistency</td></tr>
                </tbody>
            </table>
        </section>

        <section class="deep-comparison">
            <h2>II. Seven Models Deep Dive</h2>

            <h3>Model 1: 2.6 text-to-video (Standard)</h3>
            <p>This is the base Wan text-to-video model that converts prompts directly into short videos.</p>
            <pre><code>{
  "prompt": "Text prompt (max 5000 chars)",
  "duration": "5 / 10 / 15",
  "resolution": "720p / 1080p"
}</code></pre>
            <p><strong>Highlights:</strong> up to 15 seconds; bilingual prompts; suitable for longer short-form concepts.</p>
            <p><strong>Use cases:</strong> ad drafts, concept videos, ASMR-style visuals, product demos.</p>

            <h3>Model 2: 2.6 image-to-video</h3>
            <p>Turns one static image plus a prompt into animated output.</p>
            <pre><code>{
  "prompt": "Video prompt",
  "image_urls": ["Image URL (max 1)"],
  "duration": "5 / 10 / 15",
  "resolution": "720p / 1080p"
}</code></pre>
            <p><strong>Limits:</strong> one image only; min 256x256; max 10MB; jpeg/png/webp.</p>
            <p><strong>Use cases:</strong> animate old photos, illustration motion, dynamic product display.</p>

            <h3>Model 3: 2.6 video-to-video</h3>
            <p>Generates a new video from source video inputs plus a prompt.</p>
            <pre><code>{
  "prompt": "Video prompt",
  "video_urls": ["Video URL (max 3)"],
  "duration": "5 / 10",
  "resolution": "720p / 1080p"
}</code></pre>
            <p><strong>Highlights:</strong> up to 3 source videos; duration supports 5s or 10s only; mp4/mov/mkv; max 10MB each.</p>
            <p><strong>Use cases:</strong> style transfer, motion reenactment, multi-video fusion.</p>

            <h3>Model 4: 2.7 text-to-video (Enhanced)</h3>
            <p>Upgraded version of 2.6 text-to-video with stronger control tools.</p>
            <pre><code>{
  "prompt": "Positive prompt (max 5000 chars)",
  "negative_prompt": "Negative prompt (max 500 chars)",
  "audio_url": "Optional custom audio URL",
  "resolution": "720p / 1080p",
  "ratio": "16:9 / 9:16 / 1:1 / 4:3 / 3:4",
  "duration": 5,
  "prompt_extend": true,
  "watermark": false,
  "seed": "Optional"
}</code></pre>
            <p><strong>Core gains:</strong> negative prompt, ratio control, prompt rewrite, watermark control, reproducible seed.</p>
            <p><strong>Use cases:</strong> professional production requiring fine-grained generation direction.</p>

            <h3>Model 5: 2.7 image-to-video (Enhanced)</h3>
            <p>Upgraded image animation model with keyframe and audio-driven options.</p>
            <pre><code>{
  "prompt": "Positive prompt (max 5000 chars)",
  "negative_prompt": "Negative prompt (max 500 chars)",
  "first_frame_url": "First frame image URL",
  "last_frame_url": "Last frame image URL",
  "first_clip_url": "First clip URL (continuation)",
  "driving_audio_url": "Driving audio URL",
  "resolution": "720p / 1080p",
  "duration": 5,
  "prompt_extend": true,
  "watermark": false,
  "seed": "Optional"
}</code></pre>
            <p><strong>Core gains:</strong> first+last frame control, audio-driven motion, continuation workflow.</p>
            <p><strong>Use cases:</strong> storyboard animation, audio-driven characters, clip continuation.</p>

            <h3>Model 6: 2.7 video-edit</h3>
            <p>Dedicated editing route for existing videos with optional visual references.</p>
            <pre><code>{
  "prompt": "Text prompt (max 5000 chars)",
  "negative_prompt": "Negative prompt (max 500 chars)",
  "video_url": "Source video URL",
  "reference_image": "Reference image URL (optional)",
  "resolution": "720p / 1080p",
  "aspect_ratio": "16:9 / 9:16 / 1:1 / 4:3 / 3:4",
  "duration": 0,
  "audio_setting": "auto / origin",
  "prompt_extend": true,
  "watermark": false,
  "seed": "Optional"
}</code></pre>
            <p><strong>Key notes:</strong> <code>video_url</code> is required; duration 0 keeps source length; [2,10] trims first N seconds.</p>
            <p><strong>Use cases:</strong> outfit replacement, background swap, local scene edits.</p>

            <h3>Model 7: 2.7 r2v</h3>
            <p>Most advanced Wan variant for multimodal reference fusion.</p>
            <pre><code>{
  "prompt": "Text prompt (max 5000 chars)",
  "negative_prompt": "Negative prompt (max 500 chars)",
  "reference_image": ["Image URLs (max 5)"],
  "reference_video": ["Video URLs (max 5)"],
  "first_frame": "First frame image URL",
  "reference_voice": "Voice URL",
  "resolution": "720p / 1080p",
  "aspect_ratio": "16:9 / 9:16 / 1:1 / 4:3 / 3:4",
  "duration": 5,
  "prompt_extend": true,
  "watermark": false,
  "seed": "Optional"
}</code></pre>
            <p><strong>Limits:</strong> image refs + video refs must be <= 5; reference voice 1-10s, max 15MB; first frame overrides aspect ratio.</p>
            <p><strong>Use cases:</strong> complex character control and multimodal consistency generation.</p>
        </section>

        <section class="feature-summary">
            <h2>III. Seven-Model Comparison Summary</h2>
            <h3>3.1 Core feature matrix</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Model</th>
                        <th style="text-align:left; padding:0.5rem;">Text to video</th>
                        <th style="text-align:left; padding:0.5rem;">Image to video</th>
                        <th style="text-align:left; padding:0.5rem;">Video editing</th>
                        <th style="text-align:left; padding:0.5rem;">First/last frame</th>
                        <th style="text-align:left; padding:0.5rem;">Audio driving</th>
                        <th style="text-align:left; padding:0.5rem;">Reference fusion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">2.6 text-to-video</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">2.6 image-to-video</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">2.6 video-to-video</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">2.7 text-to-video</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">2.7 image-to-video</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">❌</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">2.7 video-edit</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">❌</td><td style="padding:0.5rem;">✅</td></tr>
                    <tr><td style="padding:0.5rem;">2.7 r2v</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">✅</td><td style="padding:0.5rem;">✅</td></tr>
                </tbody>
            </table>

            <h3>3.2 Parameter complexity matrix</h3>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Model</th>
                        <th style="text-align:left; padding:0.5rem;">Parameter count</th>
                        <th style="text-align:left; padding:0.5rem;">Learning curve</th>
                        <th style="text-align:left; padding:0.5rem;">Best for</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">2.6 text-to-video</td><td style="padding:0.5rem;">3</td><td style="padding:0.5rem;">Easy</td><td style="padding:0.5rem;">Beginners</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">2.6 image-to-video</td><td style="padding:0.5rem;">4</td><td style="padding:0.5rem;">Easy</td><td style="padding:0.5rem;">Beginners</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">2.6 video-to-video</td><td style="padding:0.5rem;">4</td><td style="padding:0.5rem;">Easy</td><td style="padding:0.5rem;">Beginners</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">2.7 text-to-video</td><td style="padding:0.5rem;">9</td><td style="padding:0.5rem;">Medium</td><td style="padding:0.5rem;">Intermediate users</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">2.7 image-to-video</td><td style="padding:0.5rem;">11</td><td style="padding:0.5rem;">Medium</td><td style="padding:0.5rem;">Intermediate users</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">2.7 video-edit</td><td style="padding:0.5rem;">11</td><td style="padding:0.5rem;">Medium</td><td style="padding:0.5rem;">Intermediate users</td></tr>
                    <tr><td style="padding:0.5rem;">2.7 r2v</td><td style="padding:0.5rem;">13</td><td style="padding:0.5rem;">Complex</td><td style="padding:0.5rem;">Advanced users</td></tr>
                </tbody>
            </table>
        </section>

        <section class="decision-tree">
            <h2>IV. Model Selection Decision Tree</h2>
            <pre><code>What is your task?
|
|-- Generate video from text
|   |-- Fast and simple needs -> 2.6 text-to-video
|   `-- Precise control needed -> 2.7 text-to-video
|
|-- Animate still images
|   |-- Basic animation -> 2.6 image-to-video
|   `-- Keyframe/audio control needed -> 2.7 image-to-video
|
|-- Edit existing videos
|   |-- Style transfer -> 2.6 video-to-video
|   `-- Local edits and replacement -> 2.7 video-edit
|
`-- Complex multimodal generation
    `-- Image + video + audio fusion -> 2.7 r2v</code></pre>
        </section>

        <section class="conclusion">
            <h2>V. Final Recommendations</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Use case</th>
                        <th style="text-align:left; padding:0.5rem;">Recommended model</th>
                        <th style="text-align:left; padding:0.5rem;">Core reason</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Fast text-to-video</td><td style="padding:0.5rem;"><a href="/home/wan/text-to-video">2.6 text-to-video</a></td><td style="padding:0.5rem;">Simple parameters, up to 15s</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Precise text-to-video</td><td style="padding:0.5rem;"><a href="/home/wan/v2-7-text-to-video">2.7 text-to-video</a></td><td style="padding:0.5rem;">Negative prompt + ratio control</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Static image animation</td><td style="padding:0.5rem;"><a href="/home/wan/image-to-video">2.6 image-to-video</a></td><td style="padding:0.5rem;">Simple and direct workflow</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">First/last-frame animation</td><td style="padding:0.5rem;"><a href="/home/wan/v2-7-image-to-video">2.7 image-to-video</a></td><td style="padding:0.5rem;">Keyframe + audio-driven control</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Video style transfer</td><td style="padding:0.5rem;"><a href="/home/wan/video-to-video">2.6 video-to-video</a></td><td style="padding:0.5rem;">Multi-video input support</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Local video editing</td><td style="padding:0.5rem;"><a href="/home/wan/v2-7-video-edit">2.7 video-edit</a></td><td style="padding:0.5rem;">Reference image + precise edits</td></tr>
                    <tr><td style="padding:0.5rem;">Complex multimodal generation</td><td style="padding:0.5rem;"><a href="/home/wan/v2-7-r2v">2.7 r2v</a></td><td style="padding:0.5rem;">All capabilities integrated</td></tr>
                </tbody>
            </table>

            <p><strong>One-line summary:</strong></p>
            <ul>
                <li>Daily text generation: 2.6 text-to-video</li>
                <li>Precision control: 2.7 text-to-video</li>
                <li>Static image animation: 2.6/2.7 image-to-video</li>
                <li>Video editing and replacement: 2.7 video-edit</li>
                <li>Complex multimodal reference: 2.7 r2v</li>
            </ul>

            <p>Ready to start? All seven parameter sets can be tested directly in Wan routes. Explore from the hub page: <a href="/home/wan">/home/wan</a>.</p>
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
| **path** | URL slug: `/news/wan-video-model-family-comparison-seven-versions`. |
| **description** | Summary for list, meta description, and OG. |
| **keyword** | Comma-separated keywords for meta and SEO. |
| **content** | Full HTML body; links are kept only in section I, section V, and the `/home/wan` hub entry as requested. |
