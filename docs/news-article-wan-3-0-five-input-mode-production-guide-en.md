# News Article: Wan 3.0 — One Video Model, Five Ways In (English)

Wan 3.0 collapses text-to-video, first/last-frame, multi-reference, file and link inputs into a single endpoint with per-second pricing, while Wan 3.0 Prime offers a faster-rendering sibling at a premium. This guide walks through the five input modes, the real cost math, and where each variant fits a production pipeline.

---

### title
Wan 3.0 and Wan 3.0 Prime: One Endpoint, Five Ways Into Video — A Production-Mode Guide

### path
`wan-3-0-five-input-mode-production-guide`

### description
Wan 3.0 unifies text, frame, reference, file and link inputs in one per-second-priced video lane — how Wan 3.0 and Prime differ in cost and workflow.

### keyword
Wan 3.0, Wan 3.0 Prime, unified video model, first last frame video, reference to video, per second pricing, Tongyi Wanxiang, AI video workflow, video production cost, FuseAI Tools

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wan 3.0 and Wan 3.0 Prime: One Endpoint, Five Ways Into Video — A Production-Mode Guide</title>
    <meta name="description" content="Wan 3.0 unifies text, frame, reference, file and link inputs in one per-second-priced video lane — how Wan 3.0 and Prime differ in cost and workflow.">
</head>
<body>
    <article class="ai-model-comparison" itemscope itemtype="https://schema.org/Article" style="background:#0b0c0f;background-image:radial-gradient(ellipse 65% 50% at 50% 0%, rgba(96,165,250,.07), transparent),radial-gradient(ellipse 50% 40% at 100% 90%, rgba(96,165,250,.05), transparent),linear-gradient(180deg, #151318, #0b0c0f);color:#e5e7eb;padding:20px;border-radius:12px;">

        <section class="introduction">
            <p style="color:#d1d5db;">Most AI video stacks force you to make a decision before you have an idea: text-to-video or image-to-video? Reference-driven or frame-driven? Every choice comes with its own model, its own parameter vocabulary, and its own pricing sheet. Teams shipping dozens of clips a week end up maintaining five pipelines where they only wanted one product.</p>

            <p style="color:#d1d5db;"><a href="https://www.fuseaitools.com/home/wan" style="color:#60a5fa;">Wan</a> 3.0 removes that pre-decision. The <a href="https://www.fuseaitools.com/home/wan/v3-0-video" style="color:#60a5fa;">Wan 3.0</a> model exposes five mutually exclusive input modes — plain text, first/last frame, multi-reference (up to 10 images, 5 videos, 5 audio tracks), single file, and single link — through one form, one pricing logic, and one 2–30 second duration slider. Its sibling <a href="https://www.fuseaitools.com/home/wan/v3-0-video-prime" style="color:#60a5fa;">Wan 3.0 Prime</a> accepts the exact same inputs at a higher per-second rate, trading cost for turnaround.</p>

            <p style="color:#d1d5db;">This guide is not a feature tour. It is a mode-by-mode production walkthrough: when each input path wins, what a finished clip actually costs, and how the 3.0 family relates to the earlier <a href="https://www.fuseaitools.com/home/wan/v2-7-r2v" style="color:#60a5fa;">Wan 2.7 R2V</a> and <a href="https://www.fuseaitools.com/home/wan/v2-7-image-to-video" style="color:#60a5fa;">Wan 2.7 Image-to-Video</a> lines that still run today.</p>
        </section>

        <section class="pipeline-consolidation">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Why One Endpoint Beats Five Pipelines</h2>

            <p style="color:#d1d5db;">Under the old model-per-mode layout, switching from "animate this keyframe pair" to "keep this brand character consistent across shots" meant jumping tools, re-learning parameters, and re-estimating budgets. The consolidation in Wan 3.0 has three practical consequences:</p>

            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;"><strong style="color:#60a5fa;">Budget predictability.</strong> All five modes bill identically: a flat per-second rate scaled by resolution. You estimate a clip by multiplying seconds × rate — the input mode never changes the unit price.</li>
                <li style="margin-bottom:6px;"><strong style="color:#60a5fa;">Iteration inside one workspace.</strong> A shot can start as a text concept, get re-shot with a first/last frame pair, then re-shot again with reference material — all without leaving the same tool tab.</li>
                <li style="margin-bottom:6px;"><strong style="color:#60a5fa;">A clean standard-vs-speed decision.</strong> Standard and Prime share the identical contract, so "pay more to render sooner" becomes a per-job toggle instead of a workflow fork.</li>
            </ul>

            <h3 style="color:#f3f4f6;">The Price Sheet, Reckoned Per Clip</h3>

            <table style="width:100%;border-collapse:collapse;color:#d1d5db;font-size:14px;">
                <thead>
                    <tr style="background:rgba(55,65,81,0.4);">
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Resolution</th>
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Wan 3.0 (per sec)</th>
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Wan 3.0 Prime (per sec)</th>
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">10-sec clip: 3.0</th>
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">10-sec clip: Prime</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">480p</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">12 credits</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">20 credits</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">120 credits</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">200 credits</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">720p</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">24 credits</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">40 credits</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">240 credits</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">400 credits</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">1080p (default)</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">48 credits</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">80 credits</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">480 credits</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">800 credits</td>
                    </tr>
                </tbody>
            </table>

            <p style="color:#d1d5db;">Prime costs roughly 67% more per second. The two versions also share the same aspect ratio set (adaptive, 16:9, 4:3, 1:1, 3:4, 9:16) and the same audio switch — and notably, enabling audio does not change the unit price in either version.</p>

            <p style="color:#d1d5db;">Those are list prices. Subscription plans bill credits at a discount — on monthly plans, <strong style="color:#60a5fa;">Basic pays 82%, Pro 73%, and Ultra 63%</strong> of the face amount. The 480-credit standard 1080p clip above lands at roughly 394 / 350 / 302 credits depending on plan, and the 800-credit Prime render at 656 / 584 / 504. Long-form teams effectively negotiate with themselves at the Ultra tier: a 30-second 1080p final costs 907 credits there instead of the headline 1,440.</p>
        </section>

        <section class="workflow">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Four Ways to Actually Use the Five Modes</h2>

            <h3 style="color:#f3f4f6;">Mode 1 — Text-Only Concepting: Cheap, Fast, Throwaway</h3>
            <p style="color:#d1d5db;">With no media attached, the prompt becomes mandatory, and this is the cheapest way to scout a concept because you can run it at 480p for as little as 24 credits (a 2-second micro-test).</p>

            <div style="background:rgba(31,41,55,0.3);padding:16px;border-radius:8px;margin:16px 0;">
                <p style="color:#60a5fa;font-style:italic;margin-bottom:8px;">"Slow push-in on a rain-soaked Tokyo alley at night, neon reflections pooling on asphalt, a vending light flickering over an empty bench, documentary handheld feel, 8 seconds, 9:16"</p>
                <p style="color:#9ca3af;">Explicit camera motion + one lighting anchor + duration in the prompt. Text mode is where you find out if the shot exists before you spend 1080p money on it.</p>
            </div>

            <p style="color:#d1d5db;">Practitioners migrating from <a href="https://www.fuseaitools.com/home/wan/v2-7-text-to-video" style="color:#60a5fa;">Wan 2.7 Text-to-Video</a> will find the prompt discipline similar, but with a longer duration ceiling — 30 seconds instead of the 2.7-era defaults around 5–10.</p>

            <h3 style="color:#f3f4f6;">Mode 2 — First/Last Frame: Animating Between Two Known States</h3>
            <p style="color:#d1d5db;">The frame mode takes a start image and an optional end image (the last frame always requires a first frame — the pairing is validated before submission). This is the deterministic storytelling mode: you know exactly what the clip begins and ends with, and the model interpolates the journey.</p>

            <div style="background:rgba(31,41,55,0.3);padding:16px;border-radius:8px;margin:16px 0;">
                <p style="color:#60a5fa;font-style:italic;margin-bottom:8px;">First frame: product sealed on a pedestal. Last frame: same product open, packaging fanned out. Prompt: "camera orbits 90 degrees, lid lifts, tissue paper unfolds smoothly, studio softbox lighting."</p>
                <p style="color:#9ca3af;">Frames can themselves originate from <a href="https://www.fuseaitools.com/home/wan/2-7-image" style="color:#60a5fa;">Wan 2.7 Image</a> generations, closing the image-to-video loop inside one family.</p>
            </div>

            <h3 style="color:#f3f4f6;">Mode 3 — Multi-Reference: Brand Consistency Across Shots</h3>
            <p style="color:#d1d5db;">The reference mode is the family's most differentiated capability: up to 10 images, 5 videos, and 5 audio tracks passed together, which is how you lock a character, a product look, and a soundtrack vibe simultaneously. It supersedes the single-purpose <a href="https://www.fuseaitools.com/home/wan/v2-7-r2v" style="color:#60a5fa;">Wan 2.7 R2V</a> reference workflow by absorbing it into the same unified form.</p>

            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;"><strong style="color:#60a5fa;">Character shoots:</strong> 3–5 turnaround images of the same figure, one motion-reference video, prompt describes only the new scene.</li>
                <li style="margin-bottom:6px;"><strong style="color:#60a5fa;">Music-reactive cuts:</strong> attach an audio reference so rhythm and pacing anchor the edit — audio is supported where the 2.7 line had no equivalent.</li>
                <li style="margin-bottom:6px;"><strong style="color:#60a5fa;">Exclusivity rule:</strong> reference inputs and first/last-frame inputs cannot be mixed in one request. Decide which kind of control you need.</li>
            </ul>

            <h3 style="color:#f3f4f6;">Modes 4 &amp; 5 — File and Link: Feed It a Document or a Page</h3>
            <p style="color:#d1d5db;">Two single-item modes accept one file or one URL as the creative source — a storyboard PDF, a landing page, a mood board link. Use them when the "brief" is the input: the model extracts visual direction from the artifact itself rather than from your typing. File and link are mutually exclusive, and both are capped at one item per request.</p>

            <h3 style="color:#f3f4f6;">Choosing Standard vs Prime</h3>
            <p style="color:#d1d5db;">Because the contracts are identical, the decision reduces to queue economics: client-facing revisions and deadline-driven renders go to <a href="https://www.fuseaitools.com/home/wan/v3-0-video-prime" style="color:#60a5fa;">Wan 3.0 Prime</a>; internal drafts, volume variants, and mode-exploration passes go to standard. A common budget split is 80% standard drafts, 20% Prime finals.</p>
        </section>

        <section class="pitfalls">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Where the Unified Form Can Still Bite You</h2>

            <table style="width:100%;border-collapse:collapse;color:#d1d5db;font-size:14px;">
                <thead>
                    <tr style="background:rgba(55,65,81,0.4);">
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Risk</th>
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">What Happens</th>
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Countermeasure</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">"Smart" duration doesn't exist</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Per-second billing requires a fixed length; the slider runs 2–30s and every request is billed at its exact seconds — no auto-length option.</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Storyboard in seconds first; treat 5s (the default) as a unit test and 15–30s as finals.</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">30s at 1080p is a 1,440-credit commitment (907 at the Ultra 63% plan discount, 1,051 at Pro 73%)</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">48 credits/sec × 30s is the family's single most expensive legal request; a bad prompt at that length is a four-figure loss.</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Never send an untested prompt above 720p/10s. Draft at 480p (12 credits/sec), then re-render.</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Mixing frame + reference inputs</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">The two control strategies are rejected together at validation; a last frame without a first frame fails the same way.</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Pick one input mode per shot. Re-plan a "frame + reference" idea as: frames from mode 2, consistency via mode 3 on the next pass.</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Assuming audio adds cost</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Surprise in the other direction: the audio toggle changes output, not price — some teams avoid it reflexively and lose free value.</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Default audio on for social cuts; turn off only when you're laying your own track.</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Over-referencing</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Ten images plus five videos plus five audios is the ceiling, not the recipe; crowded references dilute each other's signal.</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Start with 2–4 references; add only what visibly pulls the render.</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section class="action-checklist">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Action Checklist</h2>
            <ol style="color:#d1d5db;">
                <li style="margin-bottom:8px;"><strong style="color:#60a5fa;">Scout in text mode at 480p.</strong> Two-to-five second probes at 24–60 credits to validate the shot concept.</li>
                <li style="margin-bottom:8px;"><strong style="color:#60a5fa;">Lock endpoints early.</strong> If the clip must start/end on known visuals, generate those stills now — via <a href="https://www.fuseaitools.com/home/wan/2-7-image-pro" style="color:#60a5fa;">Wan 2.7 Image Pro</a> or your own library — so mode 2 becomes available.</li>
                <li style="margin-bottom:8px;"><strong style="color:#60a5fa;">Build a reference pack per brand.</strong> Collect the approved turnarounds, motion clips, and audio signatures once; reuse them across every mode-3 request.</li>
                <li style="margin-bottom:8px;"><strong style="color:#60a5fa;">Set a per-clip credit ceiling.</strong> 720p × 10s × standard = 240 credits list price (176 on Ultra monthly) is a sane final-render cap; anything above requires a passing 480p draft first.</li>
                <li style="margin-bottom:8px;"><strong style="color:#60a5fa;">Reserve Prime for deadline lanes.</strong> Route client revisions and same-day finals to <a href="https://www.fuseaitools.com/home/wan/v3-0-video-prime" style="color:#60a5fa;">Prime</a>; keep bulk iteration on standard.</li>
                <li style="margin-bottom:8px;"><strong style="color:#60a5fa;">Log the mode you used.</strong> Tag each accepted clip with its input mode — after a month you'll know which of the five doors actually ships your work.</li>
            </ol>
        </section>

        <section class="faq">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Frequently Asked Questions</h2>
            <div style="margin-bottom:16px;">
                <h3 style="color:#f3f4f6;">Q: Does Wan 3.0 pricing depend on which input mode I use?</h3>
                <p style="color:#d1d5db;">No. All five modes — text, first/last frame, multi-reference, file, link — bill at the same per-second rate: 12, 24, or 48 credits per second for 480p, 720p, and 1080p on the standard model, and 20/40/80 credits on Prime. Plan discounts apply on top: monthly Basic, Pro, and Ultra subscribers pay 82%, 73%, and 63% of those amounts. Duration is fixed between 2 and 30 seconds, and resolution defaults to 1080p, so always confirm before sending.</p>
            </div>
            <div style="margin-bottom:16px;">
                <h3 style="color:#f3f4f6;">Q: What is the difference between Wan 3.0 and Wan 3.0 Prime?</h3>
                <p style="color:#d1d5db;">The input contract is field-for-field identical; Prime is the premium tier at roughly 67% higher per-second cost (80 vs 48 credits at 1080p). Generate on the same form, and switch to Prime when turnaround speed matters more than marginal cost — typically final client-facing renders.</p>
            </div>
            <div style="margin-bottom:16px;">
                <h3 style="color:#f3f4f6;">Q: Can I combine a first/last frame pair with reference images?</h3>
                <p style="color:#d1d5db;">No — frame inputs and reference inputs are mutually exclusive and rejected at submission. You can, however, re-create the composition in two passes: render with references first, then feed a still from that render as the first frame of a follow-up clip.</p>
            </div>
            <div style="margin-bottom:16px;">
                <h3 style="color:#f3f4f6;">Q: How much does audio cost in Wan 3.0?</h3>
                <p style="color:#d1d5db;">Nothing extra. The audio switch changes whether the output carries generated sound, but the per-second price is driven solely by resolution. That makes native audio a free option to test on social cuts before paying for a separate music tool.</p>
            </div>
            <div style="margin-bottom:16px;">
                <h3 style="color:#f3f4f6;">Q: Should I still use Wan 2.7 models at all?</h3>
                <p style="color:#d1d5db;">Yes, for two cases: 2.7 remains the cheaper option for short standard-format clips, and its separate per-mode tabs suit teams whose pipeline is already organized by input type. Wan 3.0 wins when you want reference-heavy control (audio references in particular), longer durations up to 30s, or one unified estimate sheet across a mixed workload.</p>
            </div>
        </section>

        <section class="closing">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">The Real Shift</h2>
            <p style="color:#d1d5db;">The interesting part of Wan 3.0 isn't any single mode — it's that "how do I feed the model?" stops being an architectural question. Once five input styles share one price sheet and one form, the planning conversation moves upstream, to storyboards, reference packs, and duration budgets, where it always should have been.</p>
            <p style="color:#d1d5db;">Try <a href="https://www.fuseaitools.com/home/wan/v3-0-video" style="color:#60a5fa;">Wan 3.0 on FuseAITools</a> for unified multi-mode video production — and switch to <a href="https://www.fuseaitools.com/home/wan/v3-0-video-prime" style="color:#60a5fa;">Wan 3.0 Prime</a> when the deadline says so.</p>
        </section>
    </article>
</body>
</html>
```
