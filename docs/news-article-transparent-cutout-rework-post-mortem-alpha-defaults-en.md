# News Article: The Transparent-Cutout Rework Post-Mortem (English)

Sixty assets, three default formats, and one resolution combo nobody validates — the transparent-background batch that burned 948 list credits to produce 66 credits of files. A five-stage rework trace and the alpha check that stops all of it.

---

### title
The Transparent-Cutout Rework Post-Mortem: JPG Defaults, a 2K Transparency Nobody Validates, and the 5.6× Bill of Doing It Twice

### path
`transparent-cutout-rework-post-mortem-alpha-defaults`

### description
A cutout rework in five stages: a default JPG that drops alpha, 2K transparency no backend validates, and the 66-credit path that did it right.

### keyword
transparent background PNG alpha, nano banana default jpg, GPT image 2K transparent, flux klein output format, cutout rework cost, FuseAI Tools

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Transparent-Cutout Rework Post-Mortem: JPG Defaults, a 2K Transparency Nobody Validates, and the 5.6× Bill of Doing It Twice</title>
    <meta name="description" content="A cutout rework in five stages: a default JPG that drops alpha, 2K transparency no backend validates, and the 66-credit path that did it right.">
    <link rel="canonical" href="https://www.fuseaitools.com/news/transparent-cutout-rework-post-mortem-alpha-defaults">
</head>
<body style="margin:0;padding:0;background:#0b0c0f;background-image:radial-gradient(circle at 15% 0%, rgba(192,132,252,0.07) 0%, transparent 45%),radial-gradient(circle at 85% 100%, rgba(251,191,36,0.05) 0%, transparent 45%),linear-gradient(180deg, #151318 0%, #0b0c0f 100%);color:#d1d5db;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <article class="ai-model-comparison" itemscope itemtype="https://schema.org/Article" style="max-width:960px;margin:0 auto;padding:32px 20px 64px;">
        <header style="margin-bottom:40px;">
            <h1 itemprop="headline" style="font-size:2rem;line-height:1.25;color:#f9fafb;margin:0 0 16px;">The Transparent-Cutout Rework Post-Mortem: JPG Defaults, a 2K Transparency Nobody Validates, and the 5.6× Bill of Doing It Twice</h1>
            <p style="color:#9ca3af;font-size:0.95rem;margin:0;">Published <time itemprop="datePublished" datetime="2026-11-12">November 12, 2026</time> · FuseAI Tools Editorial</p>
        </header>

        <section itemprop="articleSection" style="margin-bottom:40px;">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Introduction: The Prompt Said Transparent. Three Defaults Disagreed.</h2>
            <p style="color:#d1d5db;">A sticker pack is the simplest job in the image catalog: 60 assets, transparent background, one style. The batch ran on <a href="https://www.fuseaitools.com/home/nano-banana/nano-banana-2-1" style="color:#c084fc;text-decoration:none;">Nano Banana 2.1</a> at 1K, and it consumed <strong style="color:#f9fafb;">948 list credits across five stages</strong> to deliver what a 66-credit first pass would have covered: 60 usable transparent PNGs. The gap is not a keep-rate story, a prompt-quality story, or a model-choice story. It is three separate default values in three neighboring models, plus one resolution combination that no backend on the platform validates.</p>
            <p style="color:#d1d5db;">This is a post-mortem, written the way failure reviews should be: stage by stage, credit by credit, ending with the one-line check that would have caught every stage before the first invoice. The delivery-spec side of this story — the platform rejection at upload — is a different article; this one is about the half before upload, where the file is made wrong and the tools are technically behaving exactly as documented.</p>
        </section>

        <section itemprop="articleSection" style="margin-bottom:40px;">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Stage 1: The JPG Default That Swallows Alpha</h2>
            <p style="color:#d1d5db;">Nano Banana 2.1's <code style="color:#c084fc;background:#1f2937;padding:1px 6px;border-radius:4px;">output_format</code> accepts png or jpg and <strong style="color:#f9fafb;">defaults to jpg</strong> when the field is absent. JPG has no alpha channel — not "weak alpha," none. A prompt reading "isolated object, transparent background" on a default-jpg request produces a perfectly rendered object on a perfectly <em>opaque</em> background, at 6 list credits (1K) to 12 (4K) an image, and the history thumbnail looks fine. The failure only surfaces when the file lands on a colored canvas.</p>
            <p style="color:#d1d5db;">The trap is asymmetric across models, and that is what makes it travel: <a href="https://www.fuseaitools.com/home/flux-kontext/flux-3-klein-text-to-image" style="color:#c084fc;text-decoration:none;">Flux 3 Klein</a> defaults <code>output_format</code> to <strong style="color:#f9fafb;">png</strong>. A team that built its habit on Klein — where omitting the format still yields alpha-capable files — carried the omission to Nano Banana and got 60 JPGs. Two neighboring models, opposite defaults, identical-looking forms. The defaults are documented per model; the muscle memory is per team.</p>
        </section>

        <section itemprop="articleSection" style="margin-bottom:40px;">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Stages 2–4: The 2K Clause, the Upscale Trap, the Batch Multiplier</h2>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Stage 2: "just redo it at 2K" bought transparency that cannot exist.</strong> On GPT Image 2.5, <code>background=transparent</code> is a 1K-only capability at the vendor level — and the backend deliberately does not police the combination; it passes the request through and lets the vendor decide. The documented escape hatch is real, but the failure mode is the expensive kind: depending on vendor behavior you get a clean rejection (free, the good outcome) or a billed 2K image with an opaque background (18 credits, the outcome this team got). At 24 credits, the 4K version of the same mistake is the worst per-asset price in the family.</p>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Stage 3: the rescue that multiplied the batch.</strong> Facing 60 flat JPGs, the natural instinct is to upscale — but Klein's 4K is a <em>generation</em> tier (12 credits per image), not a rescue service, and requesting numImages=4 "to get options" bills four copies of every attempt: a single 4K asset with four variants is 48 list (12 × 4), and scaled across even a tenth of the pack the same instinct turns the 60-credit job into a 480-credit one. Batch pricing multiplies intentions; a draft-quality default paired with a batch ceiling of 4 is the single fastest way to inflate any per-asset price by the number of options nobody asked for.</p>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Stage 4: the aspect ratio that only exists at 1K.</strong> When the pack finally got re-rendered at correct settings, one template still carried 27:16 — a legal GPT Image 2.5 aspect that is <em>only available at 1K</em>, one of four such values (27:16, 16:27, 9:8, 8:9) in its 13-value whitelist. Combined with the stage-2 mistake in the same request — 2K + 27:16 + transparent — the order left the building with three conditions stacked, and nothing on the form warned that the resolution field silently invalidates the other two.</p>
        </section>

        <section itemprop="articleSection" style="margin-bottom:40px;">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">The Rework Ledger: Five Stages, Fourteen Times the Necessary Bill</h2>
            <table style="width:100%;border-collapse:collapse;margin-top:20px;font-size:0.92rem;">
                <thead>
                    <tr style="background:#1f2937;">
                        <th style="padding:12px;border:1px solid #374151;color:#f9fafb;text-align:left;">Stage</th>
                        <th style="padding:12px;border:1px solid #374151;color:#f9fafb;text-align:left;">What ran</th>
                        <th style="padding:12px;border:1px solid #374151;color:#f9fafb;text-align:right;">List</th>
                        <th style="padding:12px;border:1px solid #374151;color:#f9fafb;text-align:right;">Ultra 63%</th>
                        <th style="padding:12px;border:1px solid #374151;color:#f9fafb;text-align:left;">Delivered</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">1. First pass</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">60 × NB2.1 1K, format omitted → JPG</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;">360</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;">227</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">0 usable (no alpha)</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">2. The "fix"</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">10 × GPT 2.5 2K + transparent spot batch</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;color:#fbbf24;">180</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;">113</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">0 usable (opaque at 2K)</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">3. The rescue</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Klein 4K, numImages=4 (one asset)</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;color:#fbbf24;">48</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;">30</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">1 oversized opaque→alpha guess</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">4. The correction</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">60 × NB2.1 1K with png stated</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;">360</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;">227</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#34d399;">60 usable</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;"><strong style="color:#f9fafb;">Total as run</strong></td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">—</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;color:#f472b6;"><strong style="color:#f9fafb;">948</strong></td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;"><strong style="color:#f9fafb;">597</strong></td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">—</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;"><strong style="color:#f9fafb;">Path once-right</strong></td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">60 × NB2.1 1K png (+1 GPT 1K transparent style probe)</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;color:#34d399;"><strong style="color:#f9fafb;">66</strong></td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;"><strong style="color:#f9fafb;">42</strong></td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#34d399;">60 usable</td>
                    </tr>
                </tbody>
            </table>
            <p style="color:#d1d5db;margin-top:16px;">Discount rates are the monthly Basic 82% / Pro 73% / Ultra 63% plan rates. The headline number is the ratio: <strong style="color:#f9fafb;">948 list spent, 66 necessary — a 14× rework tax</strong> on the simplest job in the catalog, and every dollar of it traces to a field left at its default or a combination left unvalidated. Note stage 2 is the only line where the platform behaved as documented and still billed for nothing: background=transparent at 2K passes the DTO, passes pricing, and delivers an opaque file.</p>
        </section>

        <section itemprop="articleSection" style="margin-bottom:40px;">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Pitfalls and One-Line Fixes</h2>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">State the format; never inherit the habit.</strong> NB2.1 defaults to jpg, Klein to png, GPT Image 2.5 writes png when transparent is requested. Three models, three defaults, one delivery requirement: put <code>output_format</code> in every cutout template.</p>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Transparent means 1K on GPT Image 2.5 — plan the resolution around the alpha, not the other way.</strong> If alpha is required, the working resolution is decided for you. If 2K/4K is also required, transparency is someone else's job: matte it in post or pick a lane where the spec allows both — GPT Image 2.5's sibling <a href="https://www.fuseaitools.com/home/gpt-image/v2-5-sunburst-text-to-image" style="color:#c084fc;text-decoration:none;">Sunburst text-to-image</a> tier is the one to probe before committing the pack, not after.</p>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Check the channel, not the thumbnail.</strong> A JPG of a white object on a white background is invisible in a contact sheet. One alpha-channel inspection per batch, on one file, before the other 59 render — the check costs seconds and kills the stage-1 line entirely.</p>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Batch counts are multipliers on mistakes.</strong> numImages=4 on a wrong-settings asset is four wrong-settings assets; the draft-before-batch rule from the reroll economics work exists precisely because the keep denominator multiplies whatever you get wrong first.</p>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Stacked conditions fail as a unit.</strong> 27:16 is legal, 1K is legal, transparent is legal — the triple is legal only at 1K. The backend does not validate combinations on this family, so combination checks belong in your template review, not in the order gate.</p>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">The free lesson exists — take it.</strong> A <a href="https://www.fuseaitools.com/home/nano-banana/nano-banana-2-lite" style="color:#c084fc;text-decoration:none;">Nano Banana 2 lite</a> run is a flat 6 credits with no resolution key: the cheapest place to verify style and format behavior before committing the batch's real budget (6-credit canaries, as the rejection-taxonomy article argues, are the platform's gift to people who plan).</p>
        </section>

        <section itemprop="articleSection" style="margin-bottom:40px;">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Action Checklist</h2>
            <ul style="color:#d1d5db;padding-left:24px;line-height:1.9;">
                <li>Write "format: png" into every transparent-asset template, regardless of which model the template runs on.</li>
                <li>Before any cutout batch, open one output in an editor that shows channels — confirm alpha, then start the remaining run.</li>
                <li>Pin transparent GPT Image 2.5 work to 1K; if the delivery needs 2K, decide the matte workflow before generating, not after invoicing.</li>
                <li>Keep one style probe per vendor family in the batch budget at draft tier; six credits is the cheapest rework insurance in the catalog.</li>
                <li>Audit aspect ratios against their resolution windows — the 1K-only values are invisible until the combination fails.</li>
                <li>Price batches as count × unit × variants; a 4-image draft on a 60-asset job is a 240-image invoice, and the form will not say so.</li>
            </ul>
        </section>

        <section itemprop="articleSection" style="margin-bottom:40px;">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">FAQ</h2>
            <div itemscope itemprop="hasPart" itemtype="https://schema.org/Question" style="margin-bottom:24px;">
                <h3 itemprop="name" style="color:#f9fafb;font-size:1.05rem;margin:0 0 8px;">Q: I asked for a transparent background and the PNG is still opaque. Did the model ignore my prompt?</h3>
                <div itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p style="color:#d1d5db;margin:0;">Most likely the prompt was never the transparency control. On Nano Banana 2.1 the output defaults to JPG — a format with no alpha channel at all — so the request did what it documented and left the field unhelpfully. Transparency is a <em>format</em> property plus, on GPT Image 2.5, a <em>background parameter</em>; prose in the prompt contributes style, not channels. State png explicitly and treat background=transparent as the switch it is.</p></div>
            </div>
            <div itemscope itemprop="hasPart" itemtype="https://schema.org/Question" style="margin-bottom:24px;">
                <h3 itemprop="name" style="color:#f9fafb;font-size:1.05rem;margin:0 0 8px;">Q: Why did my 2K transparent request get billed instead of refused?</h3>
                <div itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p style="color:#d1d5db;margin:0;">Because background=transparent is a 1K capability at the vendor level, and the backend passes the combination through without validating resolution pairs — the vendor gets to decide. When it accepts the order you get a legitimately billed, legitimately rendered <em>opaque</em> 2K image. Refusal would have been free; the architecture chose vendor judgment over platform policing, and the invoice is where you find out which way it went.</p></div>
            </div>
            <div itemscope itemprop="hasPart" itemtype="https://schema.org/Question" style="margin-bottom:24px;">
                <h3 itemprop="name" style="color:#f9fafb;font-size:1.05rem;margin:0 0 8px;">Q: Can I fix a batch of JPGs by upscaling them?</h3>
                <div itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p style="color:#d1d5db;margin:0;">No — upscaling changes pixels, not channels. A JPG has no alpha to inherit, so any "upscaled cutout" still needs a matte pass. And on Klein, 4K is a generation tier priced per image (12 list) with numImages multiplying it up to four at a time: the rescue route costs more than the redo and delivers less certainty. Regenerate with the format stated; that is the 60-credit path, not the 300-credit one.</p></div>
            </div>
            <div itemscope itemprop="hasPart" itemtype="https://schema.org/Question" style="margin-bottom:24px;">
                <h3 itemprop="name" style="color:#f9fafb;font-size:1.05rem;margin:0 0 8px;">Q: Why do two models I use default to different formats?</h3>
                <div itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p style="color:#d1d5db;margin:0;">Because each family's default follows its vendor's convention: Flux 3 Klein ships png-default (alpha-capable by luck), Nano Banana 2.1 ships jpg-default (smaller, lossy, alpha-free). Nothing in either form hints at the other. This is the silent-pass failure class in its purest image-side form: identical-looking requests, opposite outputs, and the only defense is an explicit format field in every template.</p></div>
            </div>
            <div itemscope itemprop="hasPart" itemtype="https://schema.org/Question" style="margin-bottom:24px;">
                <h3 itemprop="name" style="color:#f9fafb;font-size:1.05rem;margin:0 0 8px;">Q: What is the cheapest way to verify all of this before a 60-asset batch?</h3>
                <div itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p style="color:#d1d5db;margin:0;">Two probe orders: one at the draft tier you intend to use, one at the family where transparency lives (GPT Image 2.5 at 1K, background transparent, 6 credits). Inspect channels, confirm the aspect/resolution pair, then release the batch. Against the 948 this post-mortem traces, the 12-credit rehearsal is the highest-return line item in the entire job — and it is the same canary logic the rejection article prices at 6.</p></div>
            </div>
        </section>

        <section itemprop="articleSection" style="margin-bottom:0;">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Closing: Defaults Are Someone Else's Requirements</h2>
            <p style="color:#d1d5db;">Every credit in the 882-credit gap between this job and the right version of it was spent satisfying a default: a format nobody stated, a resolution nobody paired with the transparency clause, a batch count nobody multiplied out. The image families on <a href="https://www.fuseaitools.com/home/gpt-image/v2-5-flare-text-to-image" style="color:#c084fc;text-decoration:none;">FuseAI</a> document all of these — the post-mortem is not a complaint about the contracts but about the reading habits they assume. Before the next asset run, state the format, probe the alpha, and check the resolution pairs against the 1K-only list yourself inside <a href="https://www.fuseaitools.com/home/nano-banana/nano-banana-2-1" style="color:#c084fc;text-decoration:none;">Nano Banana 2.1</a> and <a href="https://www.fuseaitools.com/home/flux-kontext/flux-3-klein-text-to-image" style="color:#c084fc;text-decoration:none;">Flux 3 Klein text-to-image</a> — because in cutout work, the cheapest file is the one that arrives with its channels already correct.</p>
        </section>
    </article>
</body>
</html>
```
