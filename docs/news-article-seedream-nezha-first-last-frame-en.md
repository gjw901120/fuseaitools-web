# News Article: Seedream First & Last Frames — Nezha vs Ao Bing Sprint (English)

Full entry following the `news-article-standard.md` format: **title / path / description / keyword / content**.

---

### title
AI First & Last Frame Images: Nezha vs Ao Bing’s 100m Sprint — Seedream Tutorial

### path
`seedream-nezha-first-last-frame-tutorial`

### description
Generate matching start and finish frames for image-to-video workflows using Seedream 5 Lite on FuseAI Tools. Copy-ready prompts and JSON (16:9, high quality), myth-inspired character styling, result analysis, consistency tips, and a direct link to the companion Seedance video tutorial.

### keyword
Seedream, Seedream 5 Lite, first frame, last frame, keyframe, AI image generation, 16:9, FuseAI Tools, image-to-video prep, Nezha, Ao Bing, sprint, athletics

### content
(Full HTML body below; use as the `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seedream First &amp; Last Frames: Nezha vs Ao Bing 100m Sprint</title>
</head>
<body>
    <article class="ai-model-comparison">
        <header>
            <h1>AI First &amp; Last Frame Images: Nezha vs Ao Bing’s 100m Sprint</h1>
        </header>

        <section class="introduction">
            <p>In animation and short-form video, <strong>first and last frames</strong> are the anchors that let AI fill in smooth motion between two states. In this tutorial, we use <a href="https://www.fuseaitools.com/home/seedream/5-lite-text-to-image">Seedream 5 Lite (Text to Image)</a> on FuseAI Tools to create a <strong>start frame</strong> (on your marks) and a <strong>end frame</strong> (finish-line burst) for a playful 100-meter sprint between myth-inspired characters—<strong>Nezha in red</strong> and <strong>Ao Bing in blue</strong>—in a consistent, photoreal style. Below: prompts, parameters, example outputs, and how to keep both frames visually aligned.</p>
            <p><em>Note:</em> This is an <strong>original creative depiction</strong> for tutorial purposes (modern sportswear, stadium setting). It is not affiliated with any specific film or franchise.</p>
        </section>

        <section class="overview">
            <h2>I. What Are First &amp; Last Frames?</h2>
            <p>Common in video and motion workflows:</p>
            <ul>
                <li><strong>First frame (start)</strong>: the opening pose—here, both runners in a crouch start at the line.</li>
                <li><strong>Last frame (end)</strong>: the closing beat—here, Nezha edges ahead at the tape with Ao Bing a step behind.</li>
            </ul>
            <p>With two coherent stills, an image-to-video model can interpolate action between them instead of hand-drawing every in-between.</p>
        </section>

        <section class="goals">
            <h2>II. Creative Goals</h2>
            <p>We want <strong>two images</strong> that share the same world, lens feel, and character cues:</p>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Frame</th>
                        <th style="text-align:left; padding:0.5rem;">Scene</th>
                        <th style="text-align:left; padding:0.5rem;">Must-haves</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;">
                        <td style="padding:0.5rem; vertical-align:top;"><strong>Start</strong></td>
                        <td style="padding:0.5rem;">100m start line, ready to launch</td>
                        <td style="padding:0.5rem;">Crouch start, sharp focus, visible line, stadium + sky</td>
                    </tr>
                    <tr>
                        <td style="padding:0.5rem; vertical-align:top;"><strong>Finish</strong></td>
                        <td style="padding:0.5rem;">Breaking the tape, decisive moment</td>
                        <td style="padding:0.5rem;">Sprint poses, expressions, finish banner / clock cue</td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Style lock:</strong> photoreal / broadcast sports photography, <strong>16:9</strong>, bright light, high detail.</p>
        </section>

        <section class="parameters-section">
            <h2>III. Core Parameters (Copy &amp; Paste)</h2>
            <p>Open <a href="https://www.fuseaitools.com/home/seedream/5-lite-text-to-image">Seedream 5 Lite — Text to Image</a> and run two generations with the blocks below (map fields to the UI: prompt, aspect ratio, quality).</p>

            <h3>Start frame</h3>
            <div class="code-block">
                <pre><code>{
  "prompt": "Nezha and Ao Bing at the starting line of a 100-meter sprint, ready to run. Both wear modern athletic gear: Nezha in a red tracksuit, Ao Bing in a blue tracksuit. Crouch start position, hands on the track, eyes locked forward. Clear white start line on a standard red synthetic running track; stadium stands and blue sky with clouds in the background. Tense, athletic energy; photoreal sports photography, bright daylight, sharp detail, high resolution, 16:9 widescreen composition.",
  "aspect_ratio": "16:9",
  "quality": "high"
}</code></pre>
            </div>

            <h3>Finish frame</h3>
            <div class="code-block">
                <pre><code>{
  "prompt": "Nezha and Ao Bing burst through the 100-meter finish line; Nezha wins by a slim margin with Ao Bing right behind. Nezha in red sportswear, arms raised in triumph; Ao Bing in blue sportswear, smiling with respect. Broken finish tape, visible timing board suggesting the winning moment, same red track and stadium environment. Dynamic sprinting poses, photoreal sports photography, bright daylight, sharp detail, high resolution, 16:9 widescreen composition.",
  "aspect_ratio": "16:9",
  "quality": "high"
}</code></pre>
            </div>

            <div class="key-takeaways">
                <h3>Parameter notes</h3>
                <ul>
                    <li><strong>aspect_ratio: "16:9"</strong> — ideal for horizontal short video and most editors.</li>
                    <li><strong>quality: "high"</strong> — higher output fidelity for downstream video (per product limits).</li>
                    <li><strong>Repeated cues</strong> — same outfits, track, stadium, and “photoreal / bright / 16:9” in both prompts improves pair consistency.</li>
                </ul>
            </div>
        </section>

        <section class="results-section">
            <h2>IV. Example Outputs &amp; Quick Review</h2>

            <h3>Start frame — at the line</h3>
            <div class="media-showcase">
                <div class="media-column">
                    <div class="image-container">
                        <img src="https://media.fuseaitools.com/image/bb25dd35ae8c5ca6e1049f1f3efd758b_1774686390_75vx5nfh_11de6c478eff479a9efaa0812681e62f.png" alt="Start frame: Nezha and Ao Bing at 100m sprint start line generated with Seedream" loading="lazy" width="1920" height="1080">
                        <p class="image-caption">Start frame (example)</p>
                    </div>
                </div>
            </div>
            <div class="key-takeaways">
                <ul>
                    <li><strong>Character read</strong>: red vs blue kits — instant identity.</li>
                    <li><strong>Action</strong>: credible crouch start.</li>
                    <li><strong>Setting</strong>: track + stands + sky reads as a real meet.</li>
                    <li><strong>Composition</strong>: 16:9 works well as a video master frame.</li>
                </ul>
            </div>

            <h3>Finish frame — at the tape</h3>
            <div class="media-showcase">
                <div class="media-column">
                    <div class="image-container">
                        <img src="https://media.fuseaitools.com/image/d84617fbd61c9936888c12b60a49f0a2_1774686762_8yfb6ny4_36425f2733464b0d894420b2e419a917.png" alt="Finish frame: Nezha and Ao Bing crossing finish line generated with Seedream" loading="lazy" width="1920" height="1080">
                        <p class="image-caption">Finish frame (example)</p>
                    </div>
                </div>
            </div>
            <div class="key-takeaways">
                <ul>
                    <li><strong>Continuity</strong>: poses logically follow a sprint arc.</li>
                    <li><strong>Emotion</strong>: winner energy + respectful rival smile.</li>
                    <li><strong>Details</strong>: tape, clock/board cues add story.</li>
                    <li><strong>Mood</strong>: peak excitement without clutter.</li>
                </ul>
            </div>
        </section>

        <section class="consistency">
            <h2>V. Keeping Start &amp; Finish Frames Consistent</h2>
            <ul>
                <li><strong>Lock wardrobe colors</strong> — “Nezha red / Ao Bing blue” in both prompts.</li>
                <li><strong>Same aspect ratio</strong> — both 16:9.</li>
                <li><strong>Same quality tier</strong> — both <code>high</code>.</li>
                <li><strong>Shared style tokens</strong> — repeat “photoreal sports photography, bright daylight, high resolution.”</li>
                <li><strong>Optional</strong>: generate multiple pairs and pick the two with the closest lens height and skin/tone grading.</li>
            </ul>
        </section>

        <section class="applications-section">
            <h2>VI. Where to Use These Frames</h2>
            <ul>
                <li><strong>Image-to-video</strong> — feed both URLs into a model that accepts 1–2 reference images (e.g. Seedance).</li>
                <li><strong>Animation pipelines</strong> — key poses for timing and blocking.</li>
                <li><strong>Storyboards</strong> — panel A / panel B for pitch decks.</li>
                <li><strong>Promos</strong> — hero still → motion bumper.</li>
            </ul>
        </section>

        <section class="next-step">
            <h2>VII. Next Step: Turn These Frames Into Video</h2>
            <p>Once you have both image URLs, you can synthesize the full sprint—and even layer prop gags and a playful fight beat—using <strong>Seedance 1.5 Pro</strong>. Follow the companion walkthrough with copy-ready prompt and API-shaped parameters:</p>
            <p><a href="https://www.fuseaitools.com/news/seedance-nezha-i2v-props-race-tutorial">From Images to Video: Seedance Image-to-Video — Props Race &amp; Fight (Nezha &amp; Ao Bing)</a></p>
            <p>Tool page: <a href="https://www.fuseaitools.com/home/seedance/v1-5-pro">Seedance 1.5 Pro (Image to Video)</a>.</p>
        </section>

        <section class="conclusion-section">
            <h2>VIII. Summary</h2>
            <p>Strong first/last frames come from <strong>repeated character anchors</strong> and <strong>shared lighting and format</strong>. This Seedream pair is ready to drop into an image-to-video step so the model can focus on motion—not fixing mismatched costumes or sets. Swap names, colors, and actions to reuse the same recipe for your own characters.</p>
        </section>

        <footer class="article-footer">
            <p><strong>Disclaimer:</strong> Outputs vary with prompt wording and model randomness. Character names refer to mythological inspiration only; this tutorial does not claim affiliation with any studio or film. Use generated media in compliance with platform terms and applicable law.</p>
        </footer>
    </article>

    <style>
article.ai-model-comparison,
.article-body.html-content article {
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  background: transparent;
  padding: 0;
  margin: 0;
}

.article-body.html-content section {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin-bottom: 1.5rem;
}

.article-body.html-content h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem;
  line-height: 1.25;
}

.article-body.html-content h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1f2937;
  margin: 2rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.article-body.html-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 1.5rem 0 0.75rem;
}

.article-body.html-content p {
  margin-bottom: 1.25rem;
  color: #374151;
  line-height: 1.7;
}

.article-body.html-content ul,
.article-body.html-content ol {
  margin: 1rem 0 1.5rem 1.5rem;
  padding-left: 1.5rem;
}

.article-body.html-content li {
  margin-bottom: 0.5rem;
}

.article-body.html-content .image-container,
.article-body.html-content figure {
  width: 100%;
  max-width: 100%;
  margin: 1.5rem 0;
  box-sizing: border-box;
}

.article-body.html-content .image-container img,
.article-body.html-content img {
  max-width: 100%;
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.article-body.html-content .image-caption {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
  font-style: italic;
  text-align: center;
}

.article-body.html-content .media-showcase {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.article-body.html-content .media-column {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.article-body.html-content .code-block {
  width: 100%;
  max-width: 100%;
  margin: 1.5rem 0;
  overflow-x: auto;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  box-sizing: border-box;
}

.article-body.html-content .code-block pre {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #1e293b;
}

.article-body.html-content .code-block code {
  font-family: ui-monospace, monospace;
  white-space: pre;
}

.article-body.html-content .key-takeaways {
  width: 100%;
  max-width: 100%;
  padding: 1.25rem 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  box-sizing: border-box;
}

.article-body.html-content .article-footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
}

@media (min-width: 768px) {
  .article-body.html-content .media-showcase {
    grid-template-columns: 1fr 1fr;
  }
}
    </style>
</body>
</html>
```

---

## Field reference

| Field | Use |
|-------|-----|
| **title** | Article title for list/detail and SEO. |
| **path** | URL slug: `/news/seedream-nezha-first-last-frame-tutorial`. |
| **description** | Summary for list, meta description, and OG. |
| **keyword** | Comma-separated keywords for meta and SEO. |
| **content** | Full HTML body; primary CTA: `/home/seedream/5-lite-text-to-image`. Cross-link to Seedance article: `/news/seedance-nezha-i2v-props-race-tutorial`. |

**Media:** Start frame: `https://media.fuseaitools.com/image/bb25dd35ae8c5ca6e1049f1f3efd758b_1774686390_75vx5nfh_11de6c478eff479a9efaa0812681e62f.png` — Finish frame: `https://media.fuseaitools.com/image/d84617fbd61c9936888c12b60a49f0a2_1774686762_8yfb6ny4_36425f2733464b0d894420b2e419a917.png`.
