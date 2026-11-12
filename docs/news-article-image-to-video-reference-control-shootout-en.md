# News Article: Image-to-Video Reference Control Shootout — How Much Material Can Each Model Swallow (English)

One model takes a single frame. Another takes ten images, five videos, and five audio tracks. A third gets 40% cheaper when you feed it video. The reference-capacity shootout.

---

### title
How Many References Does Your Video Model Need? Kling 3.0 Omni vs Wan 3.0 vs Seedance 2.5 vs HappyHorse 1.1, Measured in What You Can Feed It

### path
`image-to-video-reference-control-shootout-kling-wan-seedance-happyhorse`

### description
Reference capacity compared across Kling 3.0 Omni, Wan 3.0, Seedance 2.5, and HappyHorse 1.1 — and how uploads change the per-second price.

### keyword
image to video AI, reference video conditioning, Kling 3.0 Omni, Wan 3.0 reference, Seedance 2.5 with video, HappyHorse reference, consistency AI video, FuseAI Tools

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>How Many References Does Your Video Model Need? Kling 3.0 Omni vs Wan 3.0 vs Seedance 2.5 vs HappyHorse 1.1, Measured in What You Can Feed It</title>
    <meta name="description" content="Reference capacity compared across Kling 3.0 Omni, Wan 3.0, Seedance 2.5, and HappyHorse 1.1 — and how uploads change the per-second price.">
</head>
<body>
    <article class="ai-model-comparison" itemscope itemtype="https://schema.org/Article" style="background:#0b0c0f;background-image:radial-gradient(ellipse 65% 50% at 50% 0%, rgba(96,165,250,.07), transparent),radial-gradient(ellipse 50% 40% at 100% 90%, rgba(244,114,182,.05), transparent),linear-gradient(180deg, #151318, #0b0c0f);color:#e5e7eb;padding:20px;border-radius:12px;">

        <section class="introduction">
            <p style="color:#d1d5db;">Prompting a video model is bargaining. Feeding it references is a contract. And the four serious image/reference-to-video lines on <a href="https://www.fuseaitools.com" style="color:#60a5fa;">FuseAITools</a> accept wildly different contracts: one demands exactly a single frame and won't negotiate; one swallows ten images, five videos, and five audio tracks at once; one gives you a 40% discount for uploading motion references; and one ships a dedicated reference model as its flagship input. This shootout measures the models by the material they'll digest — because that's the spec that determines whether your character, product, or camera move survives the render.</p>

            <p style="color:#d1d5db;">All rates are list credits per second (100 credits = $1); monthly plans meter at <strong style="color:#f9fafb;">Basic 82%, Pro 73%, Ultra 63%</strong>. Where references move the price, that's the story, not a footnote.</p>
        </section>

        <section class="capacity">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">The Capacity Table</h2>
            <table style="width:100%;border-collapse:collapse;color:#d1d5db;font-size:14px;">
                <thead>
                    <tr style="background:rgba(55,65,81,0.4);">
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Model</th>
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Images</th>
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Videos</th>
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Audio</th>
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Price effect of references</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;"><a href="https://www.fuseaitools.com/home/kling/3-0-omni-image-to-video" style="color:#f472b6;">Kling 3.0 Omni image-to-video</a></td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">exactly 1</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">—</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">—</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">None — frame is the job</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;"><a href="https://www.fuseaitools.com/home/kling/3-0-omni-reference-to-video" style="color:#f472b6;">Kling 3.0 Omni reference-to-video</a></td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">optional pack</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">yes (scene: with_video)</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">via audio scenes</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">1080p: silent 30, audio 36, ref-video 45/sec (+50%)</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;"><a href="https://www.fuseaitools.com/home/wan/v3-0-video" style="color:#60a5fa;">Wan 3.0 reference mode</a></td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">≤10</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">≤5</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">≤5</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">None — 12/24/48 per sec regardless</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;"><a href="https://www.fuseaitools.com/home/seedance/v2-5" style="color:#a78bfa;">Seedance 2.5 with reference video</a></td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">image-to-video ✓</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">conditioning input</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">—</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Cheaper: 1080p 250 → 150/sec (−40%)</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;"><a href="https://www.fuseaitools.com/home/happy-horse/v1-1-reference-to-video" style="color:#34d399;">HappyHorse 1.1 reference-to-video</a></td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">1–9</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">edit mode in family</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">native audio out</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">None — flat 36/45 per sec by resolution</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;"><a href="https://www.fuseaitools.com/home/grok/image-to-video" style="color:#60a5fa;">Grok Video 1.5 Preview</a></td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">presence flips mode</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">—</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">—</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">None — 6/12 per sec either way</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section class="styles">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Four Reference Philosophies</h2>
            <p style="color:#d1d5db;"><strong style="color:#f472b6;">Kling's discipline (Omni image-to-video): exactly one frame, aspect ratio locked to auto.</strong> It sounds ascetic, it's actually a workflow: the frame comes pre-composed elsewhere — from a <a href="https://www.fuseaitools.com/home/kling/v3-0-motion-control" style="color:#f472b6;">motion-control pass</a> or an external keyframe — and Kling animates it without reinterpretation. When the look is already decided, single-reference is the lowest-drift option. The <a href="https://www.fuseaitools.com/home/kling/3-0-omni-transformation" style="color:#f472b6;">transformation model</a> extends the idea to video-in (plus ≤4 reference images) at 30–100/sec, no audio generated.</p>
            <p style="color:#d1d5db;"><strong style="color:#60a5fa;">Wan's buffet (≤10 images + 5 videos + 5 audio, at no surcharge):</strong> the widest contract on the shelf. Cast a character from three angles, lock a product from five, hand it a motion sketch and a voice timbre — one generation, one price (12/24/48 per second by resolution, 2–30 seconds). Its <a href="https://www.fuseaitools.com/home/wan/v3-0-video-prime" style="color:#60a5fa;">Prime sibling (80/40/20 per sec)</a> takes identical inputs at express-line speed. The catch is not price but mutual exclusion: first/last-frame mode can't mix with reference packs, and file vs link references are one-or-the-other. Planning the input bundle is half the craft.</p>
            <p style="color:#a78bfa;">Seedance's inversion: references make it cheaper.</p>
            <p style="color:#d1d5db;">Across the line — <a href="https://www.fuseaitools.com/home/seedance/v2" style="color:#a78bfa;">Seedance 2</a> (18–324/sec by tier) and 2.5 — attaching a reference video moves the scene from without_video to with_video and cuts 40%+ off every rate (480p: 45 → 27; 1080p: 250 → 150; on 2-series, 480p 30 → 18). The pricing is a workflow instruction: <em>if you can shoot or sketch the motion, do — the model renders closer to intention and bills less for the privilege.</em> Duration runs 4–30 seconds.</p>
            <p style="color:#34d399;"><strong style="color:#f9fafb;">HappyHorse's specialization:</strong> reference-to-video isn't a mode, it's a model in the family — 1–9 reference images, 9 aspect ratios, native audio, 36/45 per sec at 720p/1080p. Where Wan asks "how much can you throw at me," HappyHorse asks "how consistent should the subject be" and prices the answer flat.</p>
        </section>

        <section class="pitfalls">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Reference Workflow Traps</h2>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;"><strong style="color:#f9fafb;">Counting uploads instead of roles.</strong> Ten images of one product from ten angles ≠ ten references' worth of information. Redundant views dilute; complementary views (front/side/detail/hands-in-use) lock. Wan's cap is 10 slots, but craft is filling 4–6 well.</li>
                <li style="margin-bottom:6px;"><strong style="color:#f9fafb;">Forgetting the reference changes the price — in both directions.</strong> Seedance drops 40%; Kling Omni reference scenes rise (1080p: 30 silent → 45 with ref video). A "free" workflow on one line is a 50% surcharge on another.</li>
                <li style="margin-bottom:6px;"><strong style="color:#f9fafb;">Mixing incompatible modes.</strong> Wan rejects last-frame without first-frame, and frame + reference packs are mutually exclusive by design; HappyHorse 1.1 dropped seed acceptance entirely, so seed-pinned workflows from v1 don't port.</li>
                <li style="margin-bottom:6px;"><strong style="color:#f9fafb;">Paying full rate for conditioning you could have drafted.</strong> A phone-cam walkaround uploaded to Seedance cuts the render price 40%; the same walkaround described in prompt text costs full without_video and lands further from intent.</li>
            </ul>
        </section>

        <section class="action-checklist">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Action Checklist</h2>
            <ol style="color:#d1d5db;">
                <li style="margin-bottom:8px;"><strong style="color:#f9fafb;">Match the model to your material, then the material to the model.</strong> One perfect frame → Kling Omni. Multi-asset brand kit → Wan. Motion you can demo on your phone → Seedance. 1–9 subject views for consistency → HappyHorse.</li>
                <li style="margin-bottom:8px;"><strong style="color:#f9fafb;">Build a reference sheet once per character/product</strong> (4–6 complementary angles) and reuse it across every generation — consistency is an asset-management problem.</li>
                <li style="margin-bottom:8px;"><strong style="color:#f9fafb;">Quote Seedance renders in with_video pricing when you have footage.</strong> A 12-second 1080p conditioning pass is 1,800 credits (150/sec) not 3,000 — monthly plans take it to ~1,134 at Ultra 63%.</li>
                <li style="margin-bottom:8px;"><strong style="color:#f9fafb;">Test mode-mutex rules with a checklist, not a 480-credit error.</strong> First/last vs reference, file vs link, seed support per version — verify against the form before batch runs.</li>
                <li style="margin-bottom:8px;"><strong style="color:#f9fafb;">Let references carry what prompts can't:</strong> camera feel, product proportions, voice timbre (Wan's 5 audio slots). The reference pack is the brief; the prompt is only the shot.</li>
            </ol>
        </section>

        <section class="faq">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Frequently Asked Questions</h2>
            <div style="margin-bottom:16px;">
                <h3 style="color:#f3f4f6;">Q: Which AI video model accepts the most reference material?</h3>
                <p style="color:#d1d5db;">Wan 3.0: up to 10 images plus 5 videos plus 5 audio files in its reference mode, at no price surcharge (per-second rates stay 12/24/48 by resolution, Ultra plan holders effectively 7.6/15.1/30.2 per second at 63%). HappyHorse 1.1's dedicated reference model (1–9 images) and Kling Omni's reference-to-video follow.</p>
            </div>
            <div style="margin-bottom:16px;">
                <h3 style="color:#f3f4f6;">Q: Why would uploading a reference video make generation cheaper?</h3>
                <p style="color:#d1d5db;">On Seedance 2 / 2 Mini / 2.5, a reference video moves billing to the with_video scene — the model spends less compute inventing motion it can copy. 2.5 at 1080p: 250 → 150 credits/sec; 2 Mini at 720p: 15 → 9. It's the rare pricing rule that rewards better inputs.</p>
            </div>
            <div style="margin-bottom:16px;">
                <h3 style="color:#f3f4f6;">Q: How do I keep a character consistent across shots?</h3>
                <p style="color:#d1d5db;">Use the same reference set every generation: 3–5 complementary angles in Wan's or HappyHorse's image slots, or one locked keyframe through Kling Omni image-to-video where the frame itself was produced from a consistent image model. Consistency comes from reusing material, not from describing the character twice.</p>
            </div>
            <div style="margin-bottom:16px;">
                <h3 style="color:#f3f4f6;">Q: Does more reference material cost more on any model?</h3>
                <p style="color:#d1d5db;">Only through scenes, not counts: Wan, HappyHorse, and Grok price identically whether you attach one asset or their full cap. Kling Omni's reference-to-video charges more when a video is attached (with_video scene, up to +50% at 1080p vs silent), and Seedance's scene switch works the other direction.</p>
            </div>
            <div style="margin-bottom:16px;">
                <h3 style="color:#f3f4f6;">Q: Which model for animating a finished product photo?</h3>
                <p style="color:#d1d5db;">Kling 3.0 Omni image-to-video (single frame, source aspect kept, from 20/sec at 720p silent) is built for exactly this. <a href="https://www.fuseaitools.com/home/grok/video-1-5-preview" style="color:#60a5fa;">Grok Video 1.5 Preview</a> is the budget answer — same image-presence flip at 6/12 credits per second, with an <a href="https://www.fuseaitools.com/home/grok/upscale" style="color:#60a5fa;">upscale station</a> (15/sec to 720p, 30/sec to 1080p by source seconds) when the clip earns it.</p>
            </div>
        </section>

        <section class="closing">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Feed It, Don't Describe It</h2>
            <p style="color:#d1d5db;">The reference-capacity axis is the most practical way to sort these four because it maps directly onto what you already own: frames, packs, phone footage, voice files. Single-frame discipline buys fidelity to one decision; buffet inputs buy a full production brief; conditioning-video discounts pay you for showing instead of telling.</p>
            <p style="color:#d1d5db;">Assemble the material, pick the model by its contract, and run the same asset kit through all four on <a href="https://www.fuseaitools.com/home/wan/v3-0-video" style="color:#60a5fa;">FuseAITools</a> — the render that keeps your product looking like your product wins, regardless of list price.</p>
        </section>
    </article>
</body>
</html>
```
