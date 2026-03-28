# News Article: Seedance Image-to-Video — Nezha vs Ao Bing Props Race (English)

Full entry following the `news-article-standard.md` format: **title / path / description / keyword / content**.

---

### title
From Images to Video: Seedance I2V — Props Race & Fight (Nezha & Ao Bing)

### path
`seedance-nezha-i2v-props-race-tutorial`

### description
Turn two still frames into a 12-second cinematic clip with Seedance 1.5 Pro on FuseAI Tools. Uses the Nezha/Ao Bing sprint frames as input URLs, a detailed motion prompt (ribbon, ice, weapons clash), parameter table, example MP4, storyboard beats, tuning tips, FAQ, and a link back to the Seedream first/last frame tutorial.

### keyword
Seedance, Seedance 1.5 Pro, image to video, first frame, last frame, inputUrls, 16:9, 1080p, FuseAI Tools, Nezha, Ao Bing, AI video, props, fight scene

### content
(Full HTML body below; use as the `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seedance Image-to-Video: Nezha &amp; Ao Bing Props Race Tutorial</title>
</head>
<body>
    <article class="ai-model-comparison">
        <header>
            <h1>From Images to Video: Seedance I2V — Props Race &amp; Fight (Nezha &amp; Ao Bing)</h1>
        </header>

        <section class="introduction">
            <p>With a <strong>start image</strong> and an <strong>end image</strong>, you can ask AI to invent the motion between them. <a href="https://www.fuseaitools.com/home/seedance/v1-5-pro">Seedance 1.5 Pro</a> on FuseAI Tools accepts reference images and a rich text prompt to steer what happens in the middle—here, a 100m sprint upgraded into a <strong>prop-heavy, comedic duel</strong> (ribbon snag, ice on the track, weapon clash) before the finish.</p>
            <p>If you have not generated the two stills yet, start with the paired prompts and parameters in the companion guide: <a href="https://www.fuseaitools.com/news/seedream-nezha-first-last-frame-tutorial">AI First &amp; Last Frame Images: Nezha vs Ao Bing’s 100m Sprint — Seedream Tutorial</a> (tool: <a href="https://www.fuseaitools.com/home/seedream/5-lite-text-to-image">Seedream 5 Lite Text to Image</a>).</p>
            <p><em>Note:</em> Myth-inspired characters in modern sportswear; not affiliated with any specific film IP.</p>
        </section>

        <section class="overview">
            <h2>I. What Is Image-to-Video (I2V)?</h2>
            <ul>
                <li><strong>Inputs</strong>: typically 1–2 images (your keyframes).</li>
                <li><strong>Process</strong>: the model imagines intermediate motion and lighting changes.</li>
                <li><strong>Output</strong>: a continuous clip—stronger character control than pure text-to-video when your frames already match.</li>
            </ul>
        </section>

        <section class="creative-upgrade">
            <h2>II. Creative Upgrade: Plain Sprint → Props + Fight Beats</h2>
            <p>We layer beat-specific instructions onto the timeline so the model has “checkpoints” to hit:</p>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Time</th>
                        <th style="text-align:left; padding:0.5rem;">Gag / beat</th>
                        <th style="text-align:left; padding:0.5rem;">Motion cue</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">~2s</td><td style="padding:0.5rem;">Red ribbon toss</td><td style="padding:0.5rem;">Ribbon wraps an ankle; rival steadies</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">~4s</td><td style="padding:0.5rem;">Ice counter</td><td style="padding:0.5rem;">Frost on lane; jump or slide escape</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">~6s</td><td style="padding:0.5rem;">Side-by-side clash</td><td style="padding:0.5rem;">Circular weapon vs ice hammer, sparks</td></tr>
                    <tr><td style="padding:0.5rem;">~8–12s</td><td style="padding:0.5rem;">Drive to tape</td><td style="padding:0.5rem;">Nezha noses ahead; Ao Bing close second</td></tr>
                </tbody>
            </table>
        </section>

        <section class="parameters-section">
            <h2>III. Example Request Body (Seedance 1.5 Pro)</h2>
            <p>Use on <a href="https://www.fuseaitools.com/home/seedance/v1-5-pro">Seedance 1.5 Pro</a>. Field names match typical API shape: <code>model</code>, <code>prompt</code>, <code>inputUrls</code>, <code>aspectRatio</code>, <code>resolution</code>, <code>duration</code> (allowed values include <code>"4"</code>, <code>"8"</code>, <code>"12"</code>), <code>fixedLens</code>, <code>generateAudio</code>.</p>

            <div class="code-block">
                <pre><code>{
  "model": "seedance-1.5-pro",
  "prompt": "Nezha and Ao Bing explode off the starting line together. Around 2 seconds, Nezha throws a long red ribbon that snags Ao Bing's ankle; Ao Bing wobbles but recovers. Around 4 seconds Ao Bing retaliates with frost magic icing the lane; Nezha leaps and then skates on blazing wheel-like foot glow to stay upright. Around 6 seconds they sprint side by side: Nezha swings a circular ring weapon while Ao Bing raises an ice hammer—they clash mid-air with sparks. Final stretch: both accelerate; Nezha breaks the tape first by a hair, Ao Bing right behind. Camera tracks alongside the runners, cinematic sports broadcast meets fantasy action, crisp 1080p motion, readable faces, smooth continuity from start pose to finish pose.",
  "inputUrls": [
    "https://media.fuseaitools.com/image/bb25dd35ae8c5ca6e1049f1f3efd758b_1774686390_75vx5nfh_11de6c478eff479a9efaa0812681e62f.png",
    "https://media.fuseaitools.com/image/d84617fbd61c9936888c12b60a49f0a2_1774686762_8yfb6ny4_36425f2733464b0d894420b2e419a917.png"
  ],
  "aspectRatio": "16:9",
  "resolution": "1080p",
  "duration": "12",
  "fixedLens": false,
  "generateAudio": true
}</code></pre>
            </div>

            <div class="key-takeaways">
                <h3>Why these settings</h3>
                <ul>
                    <li><strong>duration "12"</strong> — room for multiple beats without rushing.</li>
                    <li><strong>fixedLens: false</strong> — allows camera drift/parallax for action.</li>
                    <li><strong>generateAudio: true</strong> — synced SFX / ambience when enabled (uses more credits per pricing rules).</li>
                    <li><strong>inputUrls</strong> — same two frames as in the <a href="https://www.fuseaitools.com/news/seedream-nezha-first-last-frame-tutorial">Seedream first/last frame article</a>.</li>
                </ul>
            </div>
        </section>

        <section class="results-section">
            <h2>IV. Example Video</h2>
            <div class="video-container">
                <video class="article-video" controls playsinline preload="metadata" poster="https://media.fuseaitools.com/image/bb25dd35ae8c5ca6e1049f1f3efd758b_1774686390_75vx5nfh_11de6c478eff479a9efaa0812681e62f.png">
                    <source src="https://media.fuseaitools.com/video/f50388e578c876162551dd2ab6f78502_1774688319_j7moxwck_d4e0b77b57d34b9887721b7efc601a3a.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <p class="image-caption">Example output — props race + clash + finish (sample)</p>
            </div>
        </section>

        <section class="storyboard">
            <h2>V. Storyboard &amp; Sound Cues (Expected)</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.95rem;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Segment</th>
                        <th style="text-align:left; padding:0.5rem;">Picture</th>
                        <th style="text-align:left; padding:0.5rem;">Sound (when audio on)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">0–2s</td><td style="padding:0.5rem;">Launch from blocks</td><td style="padding:0.5rem;">Starter signal + spikes on track</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">2–3s</td><td style="padding:0.5rem;">Ribbon catches ankle</td><td style="padding:0.5rem;">Fabric whip + stumble grunt</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">4–5s</td><td style="padding:0.5rem;">Ice spreads on lane</td><td style="padding:0.5rem;">Crystallize SFX + jump</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">6–8s</td><td style="padding:0.5rem;">Weapon clash beside sprint</td><td style="padding:0.5rem;">Metal ring + impact sweetener</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">8–10s</td><td style="padding:0.5rem;">Neck-and-neck drive</td><td style="padding:0.5rem;">Rhythmic percussion bed</td></tr>
                    <tr><td style="padding:0.5rem;">10–12s</td><td style="padding:0.5rem;">Tape break; rivalry smile</td><td style="padding:0.5rem;">Crowd swell + light sting</td></tr>
                </tbody>
            </table>
        </section>

        <section class="seo-value">
            <h2>VI. Why This Concept Helps Discoverability</h2>
            <ul>
                <li><strong>Unique hook</strong> — “myth rivals + modern track + fantasy props” is a memorable bundle.</li>
                <li><strong>Long-tail queries</strong> — image-to-video tutorial, two-frame workflow, AI fight scene, etc.</li>
                <li><strong>Session time</strong> — readers who watch the sample clip signal quality to search and social algorithms.</li>
            </ul>
        </section>

        <section class="tuning">
            <h2>VII. Tuning Tips</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Goal</th>
                        <th style="text-align:left; padding:0.5rem;">What to change</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Longer brawl</td><td style="padding:0.5rem;">Try <code>duration</code> <code>"12"</code> with more mid-prompt detail, or split into two clips.</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Slower hero hits</td><td style="padding:0.5rem;">Add “brief slow-motion on the clash” to prompt.</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">More gadgets</td><td style="padding:0.5rem;">Name props explicitly once each; avoid ten new objects in one pass.</td></tr>
                    <tr><td style="padding:0.5rem;">Comedy tone</td><td style="padding:0.5rem;">Add “lighthearted, exaggerated reactions.”</td></tr>
                </tbody>
            </table>
        </section>

        <section class="comparison">
            <h2>VIII. Simple Sprint vs This “Props + Fight” Version</h2>
            <ul>
                <li><strong>Plain sprint</strong> — shorter prompt, fewer failure modes.</li>
                <li><strong>This build</strong> — higher entertainment value; needs clearer time-stamped prompt language.</li>
            </ul>
        </section>

        <section class="faq">
            <h2>IX. FAQ</h2>
            <h3>Will the model always nail the weapon clash?</h3>
            <p>Concrete nouns (“ring weapon,” “ice hammer,” “sparks”) help. Regenerate or tighten timing phrases if a beat slips.</p>
            <h3>Are two input images enough for two characters?</h3>
            <p>Both should already appear in the <a href="https://www.fuseaitools.com/news/seedream-nezha-first-last-frame-tutorial">start and end frames</a>; I2V inherits that casting.</p>
            <h3>Can I add a third character?</h3>
            <p>Not without new key art. Generate new <a href="https://www.fuseaitools.com/home/seedream/5-lite-text-to-image">Seedream</a> frames that include everyone, then re-run Seedance.</p>
        </section>

        <section class="conclusion-section">
            <h2>X. Summary</h2>
            <p>Seedance turns your <strong>Seedream first/last frames</strong> into motion when you (1) keep frames consistent, (2) write a <strong>time-structured prompt</strong>, and (3) pick duration, camera lock, and audio to match the story budget. Reuse this skeleton with your own cast—swap URLs, keep aspect ratio aligned, and iterate.</p>
            <p><strong>Frame generation walkthrough:</strong> <a href="https://www.fuseaitools.com/news/seedream-nezha-first-last-frame-tutorial">Seedream — Nezha &amp; Ao Bing first/last frames</a>.</p>
        </section>

        <footer class="article-footer">
            <p><strong>Disclaimer:</strong> Video results vary by prompt, randomness, and product limits. Pricing for audio-enabled generations follows platform rules. Mythological references only; not endorsed by any rights holder.</p>
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

.article-body.html-content .video-container {
  margin: 1rem 0 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.article-body.html-content .article-video {
  width: 100%;
  max-width: 100%;
  border-radius: 8px;
  display: block;
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
| **path** | URL slug: `/news/seedance-nezha-i2v-props-race-tutorial`. |
| **description** | Summary for list, meta description, and OG. |
| **keyword** | Comma-separated keywords for meta and SEO. |
| **content** | Full HTML body; primary tool: `/home/seedance/v1-5-pro`. Cross-link to frames article: `/news/seedream-nezha-first-last-frame-tutorial`. |

**Media:** MP4: `https://media.fuseaitools.com/video/f50388e578c876162551dd2ab6f78502_1774688319_j7moxwck_d4e0b77b57d34b9887721b7efc601a3a.mp4` — Input images same as Seedream article.
