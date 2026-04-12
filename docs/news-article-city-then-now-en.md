# News Article: City Then & Now — AI Time-Travel Video Tutorial (English)

Mirrors `news-article-city-then-now-zh.md` with English body HTML. Tool links: **II** → Seedream Text to Image; **III–IV** → Seedream Image to Image; **V** → Seedance v1 Lite Image to Video.

---

### title
Build an AI Time-Travel Video: Full “City Then & Now” Production Guide

### path
`city-then-now-ai-time-travel-video-tutorial`

### description
From one core city-corner plate, use Seedream 5 Lite (text-to-image and image-to-image) for first and last frames, then Seedance v1 Lite image-to-video for a modern→retro transition; includes copy-ready JSON prompts, result analysis, and extension ideas.

### keyword
City Then & Now, Seedream, Seedance, image to image, image to video, first frame, last frame, time travel, FuseAI Tools, AI video tutorial, 16:9

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>City Then &amp; Now: AI Time-Travel Video — Full Tutorial</title>
</head>
<body>
    <article class="ai-model-comparison">
        <header>
            <h1>Build an AI Time-Travel Video: Full “City Then &amp; Now” Production Guide</h1>
        </header>

        <section class="introduction">
            <p><strong>Intro:</strong> Ever wanted a static street-corner photo to <em>come alive</em> and show decades of change? With AI image-to-image and image-to-video, you can. This article walks through the full <strong>City Then &amp; Now</strong> pipeline—core scene plate, first and last frames, then one smooth time-travel clip.</p>
        </section>

        <section class="why-core-scene">
            <h2>I. Why Reuse a “Core Scene”?</h2>
            <p>First and last frames must match for believable motion. If layout, framing, and light differ wildly, the model struggles to bridge them.</p>
            <p><strong>Our approach:</strong> generate one <strong>environment-only plate</strong> (no people), then derive both keyframes from it. Same buildings, angle, and light—only “what changes” (people, era) is left for the model.</p>
            <p><strong>Comparison:</strong></p>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Method</th>
                        <th style="text-align:left; padding:0.5rem;">Scene match</th>
                        <th style="text-align:left; padding:0.5rem;">Transition</th>
                        <th style="text-align:left; padding:0.5rem;">Best for</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Two unrelated generations</td><td style="padding:0.5rem;">Uncontrolled</td><td style="padding:0.5rem;">Okay</td><td style="padding:0.5rem;">Quick tests</td></tr>
                    <tr><td style="padding:0.5rem;"><strong>Shared core plate</strong></td><td style="padding:0.5rem;">Fully controlled</td><td style="padding:0.5rem;">Smooth</td><td style="padding:0.5rem;">Pro video workflows</td></tr>
                </tbody>
            </table>
        </section>

        <section class="step-text-to-image">
            <h2>II. Text-to-Image: Core Scene Plate</h2>
            <p><strong>Goal:</strong> a modern street corner with <strong>no people</strong>—the base for everything after.</p>
            <p>Open <a href="https://www.fuseaitools.com/home/seedream/5-lite-text-to-image">Seedream 5 Lite — Text to Image</a> on FuseAI Tools (<code>/home/seedream/5-lite-text-to-image</code>), paste the prompt and settings below, and generate.</p>

            <div class="code-block">
                <pre><code>{
  "prompt": "A modern city street corner on a sunny day. A red-brick wedge building on the corner with an old bookstore on the ground floor and a vintage street lamp beside it. Across the street, a glass curtain-wall office tower. Modern cars and pedestrians on the road. Centered composition, 16:9 landscape, photorealistic, ultra sharp.",
  "aspect_ratio": "16:9",
  "quality": "high"
}</code></pre>
            </div>

            <p><strong>Sample output:</strong></p>
            <p><a href="https://media.fuseaitools.com/image/ff7f3be0285d278bc3cc622da732c1b8_1775896723_2otxlf2i_63bb3e6ebc5248b29b1d69ab7c6cf4ee.png" target="_blank" rel="noopener noreferrer">Open core plate image</a></p>
            <div class="image-container">
                <img src="https://media.fuseaitools.com/image/ff7f3be0285d278bc3cc622da732c1b8_1775896723_2otxlf2i_63bb3e6ebc5248b29b1d69ab7c6cf4ee.png" alt="Core plate: bookstore corner and tower" width="1200" loading="lazy" style="max-width:100%; height:auto;">
                <p class="image-caption">Core plate: locks layout, lens, and light for all following steps</p>
            </div>
            <p><strong>Notes:</strong> this image defines bookstore, lamp, tower, angle, and sun direction—everything downstream keys off it.</p>
        </section>

        <section class="step-img2img-first">
            <h2>III. Image-to-Image: First Frame (Modern + Elder)</h2>
            <p><strong>Goal:</strong> add modern people and details for the <strong>start</strong> of the clip.</p>
            <p>Open <a href="https://www.fuseaitools.com/home/seedream/5-lite-image-to-image">Seedream 5 Lite — Image to Image</a> (<code>/home/seedream/5-lite-image-to-image</code>), upload the <strong>core plate from Section II</strong> as reference, then use:</p>

            <div class="code-block">
                <pre><code>{
  "prompt": "Keep building layout, camera angle, and lighting exactly the same. On the sidewalk at the corner, add a man in his 70s in a dark trench coat, back to camera, looking up at the glass tower across the street. Replace cars with modern models (Tesla, Toyota). Contemporary city mood, photoreal.",
  "image_urls": ["https://media.fuseaitools.com/image/ff7f3be0285d278bc3cc622da732c1b8_1775896723_2otxlf2i_63bb3e6ebc5248b29b1d69ab7c6cf4ee.png"],
  "aspect_ratio": "16:9",
  "quality": "high"
}</code></pre>
            </div>

            <p><strong>Sample output:</strong></p>
            <p><a href="https://media.fuseaitools.com/image/78121a330dc5a4bf20ee54ab02e89af7_1775901058_a1uqp9d9_300bdd84acc141c5ae50e9a9b0e1977f.png" target="_blank" rel="noopener noreferrer">Open first frame</a></p>
            <div class="image-container">
                <img src="https://media.fuseaitools.com/image/78121a330dc5a4bf20ee54ab02e89af7_1775901058_a1uqp9d9_300bdd84acc141c5ae50e9a9b0e1977f.png" alt="First frame: elder, back to camera" width="1200" loading="lazy" style="max-width:100%; height:auto;">
                <p class="image-caption">First frame: modern “now”—curiosity from the back-facing figure</p>
            </div>
            <p><strong>Notes:</strong> the back view invites “what is he looking at?” and modern cars anchor the present.</p>
        </section>

        <section class="step-img2img-last">
            <h2>IV. Image-to-Image: Last Frame (1950s + Young Adult)</h2>
            <p><strong>Goal:</strong> same corner, new era—<strong>end frame</strong> for the video.</p>
            <p>Stay on <a href="https://www.fuseaitools.com/home/seedream/5-lite-image-to-image">Seedream 5 Lite — Image to Image</a> (<code>/home/seedream/5-lite-image-to-image</code>), upload the <strong>same core plate</strong> as in Section III, then:</p>

            <div class="code-block">
                <pre><code>{
  "prompt": "Keep layout, angle, and light direction the same. Shift the scene to the 1950s: bookstore sign in retro lettering; lamp unchanged but warmer glow; glass tower reads as brick. Add a 25-year-old man in vintage suit and hat, smiling. Replace cars with classic 1950s (e.g. Chevrolet Bel Air). Warm yellow grade, film texture.",
  "image_urls": ["https://media.fuseaitools.com/image/ff7f3be0285d278bc3cc622da732c1b8_1775896723_2otxlf2i_63bb3e6ebc5248b29b1d69ab7c6cf4ee.png"],
  "aspect_ratio": "16:9",
  "quality": "high"
}</code></pre>
            </div>

            <p><strong>Sample output:</strong></p>
            <p><a href="https://media.fuseaitools.com/image/c5ac3f2a3efa7df1d8fed07f9a1ef34d_1775901232_x2wm1dpv_81e3ca1d9859444f8ec43b9f0cbcb426.png" target="_blank" rel="noopener noreferrer">Open last frame</a></p>
            <div class="image-container">
                <img src="https://media.fuseaitools.com/image/c5ac3f2a3efa7df1d8fed07f9a1ef34d_1775901232_x2wm1dpv_81e3ca1d9859444f8ec43b9f0cbcb426.png" alt="Last frame: 1950s corner and young man" width="1200" loading="lazy" style="max-width:100%; height:auto;">
                <p class="image-caption">Last frame: retro mood; geometry matches the first frame</p>
            </div>
            <p><strong>Notes:</strong> silhouette, lamp position, and POV align with Section III—only era, wardrobe, and cars change. That gives I2V a clean anchor.</p>
        </section>

        <section class="step-image-to-video">
            <h2>V. Image-to-Video: The Transition</h2>
            <p><strong>Goal:</strong> feed first and last frames so the model interpolates from modern to retro.</p>
            <p>Open <a href="https://www.fuseaitools.com/home/seedance/v1-lite-image-to-video">Seedance v1 Lite — Image to Video</a> (<code>/home/seedance/v1-lite-image-to-video</code>), set <strong>start image</strong> and <strong>end image</strong>, then align prompt and settings with your API/UI (resolution, duration, fixed camera, etc.).</p>

            <div class="code-block">
                <pre><code>{
  "prompt": "Fixed camera on the same corner. Opens in the modern city with an elderly man at the curb. Light warms; modern cars morph into classics; glass tower becomes brick; bookstore sign turns retro. The man grows younger—hair darkens, trench becomes a vintage suit. Ends in the 1950s with the young man smiling into the distance. Smooth, cinematic, film-like color.",
  "image_url": "https://media.fuseaitools.com/image/78121a330dc5a4bf20ee54ab02e89af7_1775901058_a1uqp9d9_300bdd84acc141c5ae50e9a9b0e1977f.png",
  "end_image_url": "https://media.fuseaitools.com/image/c5ac3f2a3efa7df1d8fed07f9a1ef34d_1775901232_x2wm1dpv_81e3ca1d9859444f8ec43b9f0cbcb426.png",
  "resolution": "1080p",
  "duration": "10",
  "camera_fixed": true,
  "seed": -1
}</code></pre>
            </div>

            <p><strong>Sample output:</strong></p>
            <p><a href="https://media.fuseaitools.com/video/97516ac4f65fdf3cab2424c1f4c64ce0_1775985154_fk1ct6n0_e88da5b1dfbe4afcaa93800ed49b2696.mp4" target="_blank" rel="noopener noreferrer">Open sample MP4</a></p>
            <div class="video-container" style="position:relative;width:100%;max-width:100%;aspect-ratio:16/9;background:#0f172a;border-radius:8px;overflow:hidden;margin:1rem 0;">
                <video class="article-video" controls playsinline preload="metadata" poster="https://media.fuseaitools.com/image/78121a330dc5a4bf20ee54ab02e89af7_1775901058_a1uqp9d9_300bdd84acc141c5ae50e9a9b0e1977f.png" style="position:absolute;left:0;top:0;width:100%;height:100%;object-fit:contain;display:block;">
                    <source src="https://media.fuseaitools.com/video/97516ac4f65fdf3cab2424c1f4c64ce0_1775985154_fk1ct6n0_e88da5b1dfbe4afcaa93800ed49b2696.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <p class="image-caption">Sample: modern-to-retro time travel in one take</p>

            <p><strong>Quality snapshot:</strong></p>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Dimension</th>
                        <th style="text-align:left; padding:0.5rem;">Rating</th>
                        <th style="text-align:left; padding:0.5rem;">Comment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Transition smoothness</td><td style="padding:0.5rem;">⭐⭐⭐⭐⭐</td><td style="padding:0.5rem;">Aligned geometry and light</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Era shift</td><td style="padding:0.5rem;">⭐⭐⭐⭐⭐</td><td style="padding:0.5rem;">Cars, façades, wardrobe evolve naturally</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Character morph</td><td style="padding:0.5rem;">⭐⭐⭐⭐</td><td style="padding:0.5rem;">Elder→youth reads well; slight dreamlike feel</td></tr>
                    <tr><td style="padding:0.5rem;">Emotion</td><td style="padding:0.5rem;">⭐⭐⭐⭐⭐</td><td style="padding:0.5rem;">Nostalgic “rewind time” beat</td></tr>
                </tbody>
            </table>
            <p><strong>Good fits:</strong> city promos, heritage brand stories, before/after place marketing, nostalgic short-form.</p>
        </section>

        <section class="advantages">
            <h2>VI. Why This Pipeline Works</h2>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Strength</th>
                        <th style="text-align:left; padding:0.5rem;">Why it matters</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Consistency</td><td style="padding:0.5rem;">Both keyframes inherit one plate—framing and light lock</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Control</td><td style="padding:0.5rem;">Tune each step without breaking the others</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Efficiency</td><td style="padding:0.5rem;">Generate the plate once; reuse for many variants</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Natural motion</td><td style="padding:0.5rem;">The model only models change, not guessing a new set</td></tr>
                    <tr><td style="padding:0.5rem;">Extensible</td><td style="padding:0.5rem;">Same plate → seasons, day/night, style passes, etc.</td></tr>
                </tbody>
            </table>
        </section>

        <section class="advanced">
            <h2>VII. More Ideas From One Plate</h2>
            <p>Reuse the same core image for other stories:</p>
            <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
                <thead>
                    <tr style="border-bottom:1px solid #e5e7eb;">
                        <th style="text-align:left; padding:0.5rem;">Variation</th>
                        <th style="text-align:left; padding:0.5rem;">Prompt cues</th>
                        <th style="text-align:left; padding:0.5rem;">Use case</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Seasons</td><td style="padding:0.5rem;">“Winter snow, coats, gray sky”</td><td style="padding:0.5rem;">Four-season campaign</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Day / night</td><td style="padding:0.5rem;">“Neon at night, moonlight on wet asphalt”</td><td style="padding:0.5rem;">Day vs night city edit</td></tr>
                    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:0.5rem;">Style</td><td style="padding:0.5rem;">“Studio Ghibli-inspired, warm and painterly”</td><td style="padding:0.5rem;">Stylized short</td></tr>
                    <tr><td style="padding:0.5rem;">Character</td><td style="padding:0.5rem;">“Couple hugging at the corner”</td><td style="padding:0.5rem;">Emotional spot</td></tr>
                </tbody>
            </table>
        </section>

        <section class="conclusion">
            <h2>VIII. Wrap-Up</h2>
            <p><strong>Core plate → first frame → last frame → video</strong> is a repeatable way to get pro-looking time-travel shorts: lock what stays fixed, then let the model handle change.</p>
            <p><em>City Then &amp; Now</em> is one template—the same corner can spin into seasons, day/night, or style studies. Experiment on <a href="https://www.fuseaitools.com/home/seedream/5-lite-text-to-image">Seedream 5 Lite (Text to Image)</a>, <a href="https://www.fuseaitools.com/home/seedream/5-lite-image-to-image">Image to Image</a>, and <a href="https://www.fuseaitools.com/home/seedance/v1-lite-image-to-video">Seedance v1 Lite (Image to Video)</a>.</p>
        </section>
    </article>
</body>
</html>
```
