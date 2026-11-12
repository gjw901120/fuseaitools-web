# News Article: Parameter Combinations That Get Orders Refused (English)

Six of the eight loudest order failures cost exactly zero credits — and the one that slips past the gate costs the most. The rejection taxonomy, the October tightening that moved the walls, and the combination table worth keeping on your wall.

---

### title
The Parameter Combinations That Get Your Order Refused: MODEL_IS_NOT_SUPPORT, the Three Legal Upscale Paths, and the Silent 2K Alpha Trap

### path
`order-rejected-parameter-combinations-model-not-support`

### description
Why orders get refused: three legal Grok upscale pairs, numImages mandatory 1–4, and the 2K transparent request that passes every gate and still bills.

### keyword
MODEL_IS_NOT_SUPPORT, AI video order rejected, numImages parameter, transparent background 2K, pricing row no-match, FuseAI Tools

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Parameter Combinations That Get Your Order Refused: MODEL_IS_NOT_SUPPORT, the Three Legal Upscale Paths, and the Silent 2K Alpha Trap</title>
    <meta name="description" content="Why orders get refused: three legal Grok upscale pairs, numImages mandatory 1–4, and the 2K transparent request that passes every gate and still bills.">
    <link rel="canonical" href="https://www.fuseaitools.com/news/order-rejected-parameter-combinations-model-not-support">
</head>
<body style="margin:0;padding:0;background:#0b0c0f;background-image:radial-gradient(circle at 15% 0%, rgba(248,113,113,0.07) 0%, transparent 45%),radial-gradient(circle at 85% 100%, rgba(251,191,36,0.05) 0%, transparent 45%),linear-gradient(180deg, #151318 0%, #0b0c0f 100%);color:#d1d5db;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <article class="ai-model-comparison" itemscope itemtype="https://schema.org/Article" style="max-width:960px;margin:0 auto;padding:32px 20px 64px;">
        <header style="margin-bottom:40px;">
            <h1 itemprop="headline" style="font-size:2rem;line-height:1.25;color:#f9fafb;margin:0 0 16px;">The Parameter Combinations That Get Your Order Refused: MODEL_IS_NOT_SUPPORT, the Three Legal Upscale Paths, and the Silent 2K Alpha Trap</h1>
            <p style="color:#9ca3af;font-size:0.95rem;margin:0;">Published <time itemprop="datePublished" datetime="2026-11-12">November 12, 2026</time> · FuseAI Tools Editorial</p>
        </header>

        <section itemprop="articleSection" style="margin-bottom:40px;">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Introduction: The Gate Is Not One Door, It Is Three</h2>
            <p style="color:#d1d5db;">Ask a team why orders fail and you will get one story. The real answer is three gates standing between your form and the vendor, and each one rejects for different reasons, at different costs, with different error text. On <a href="https://www.fuseaitools.com/home/grok/upscale" style="color:#f87171;text-decoration:none;">FuseAI</a>: the <strong style="color:#f9fafb;">DTO whitelist</strong> (field-level: required fields, legal values, image counts), the <strong style="color:#f9fafb;">pricing matcher</strong> (combination-level: the request must hit exactly one row in the price table, or it dies as <code style="color:#f87171;background:#1f2937;padding:1px 6px;border-radius:4px;">MODEL_IS_NOT_SUPPORT</code>), and the <strong style="color:#f9fafb;">vendor itself</strong> — which only sees the orders the first two let through. Most rejection complaints filed as "the model is broken" are actually a pricing-row no-match, and the fix is not a bug report; it is knowing which combinations have rows.</p>
            <p style="color:#d1d5db;">Here is the part that changes budgets: <strong style="color:#f9fafb;">six of the seven failure classes below cost zero credits</strong> because the gates refuse before anything is charged. The dangerous one is the eighth entry in the table — a request that passes every gate, bills normally, and delivers something subtly wrong. Read the refusals as free education, and the silent pass as the reason audits exist.</p>
        </section>

        <section itemprop="articleSection" style="margin-bottom:40px;">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">The Refusal Taxonomy, With Real Rows</h2>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Class A — the combination has no row.</strong> <a href="https://www.fuseaitools.com/home/grok/upscale" style="color:#f87171;text-decoration:none;">Grok upscale</a> is the purest case: exactly three legal paths exist — 480→720 at 15/s of source seconds, 720→1080 at 30/s, and 480→1080 at 45/s. There is no 720→720 row (nothing changes) and no 1080→4K row (the ladder stops). Request one and the matcher finds nothing to bill against: no-match, <code>MODEL_IS_NOT_SUPPORT</code>, order gone, credits untouched. The same logic explains the 1080p refusal on Grok video 1.5: the vendor supports it, the price table does not have it, and a feature without a price is not a feature.</p>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Class B — a mandatory key went missing.</strong> <a href="https://www.fuseaitools.com/home/qwen/image-edit" style="color:#f87171;text-decoration:none;">Qwen image edit</a> charges 9 credits per image with numImages required between 1 and 4 — but that mandatory status is dated October 20, 2026. Before it, an absent n resolved to <code>Integer.valueOf(null)</code> and the failure was a server error, not a clean refusal. <a href="https://www.fuseaitools.com/home/flux-kontext/flux-3-klein-text-to-image" style="color:#f87171;text-decoration:none;">Flux 3 Klein</a> is stricter still: resolution and numImages are both <em>billing keys</em>, which means the pricing engine literally cannot compute a cost without them. Treat "the price depends on it" as "the order needs it."</p>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Class C — auto is the vendor's default and the platform's refusal.</strong> Layer decomposition on the Wan family accepts an <code>auto</code> size, and FuseAI rejects it on principle: with auto, the vendor picks the resolution after the fact, so no pricing row can be matched before submission and the cost is unknowable at the gate. Same story in reverse on <a href="https://www.fuseaitools.com/home/kling/3-0-omni-image-to-video" style="color:#f87171;text-decoration:none;">Kling Omni image-to-video</a>, where a single shot must pass <code>aspect_ratio=auto</code> — here auto is the <em>only</em> legal value, because the first frame owns the ratio. "Auto" is not one setting; it is a different contract per endpoint, and both directions of the mistake are common.</p>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Class D — the input count is part of the row.</strong> Omni image-to-video wants exactly one image; v3-turbo image-to-video accepts at most one; GPT 2.5 flare edit takes up to sixteen; <a href="https://www.fuseaitools.com/home/qwen/image-to-image" style="color:#f87171;text-decoration:none;">Qwen 2.1 image-to-image</a> wants one to ten, with an optional mask that silently switches it into local-edit mode at the same price. Zero or two on the one-image endpoints, seventeen on the sixteen-cap endpoint: all refusals, all free, all avoidable by reading the input slot as a number and not a checkbox.</p>
        </section>

        <section itemprop="articleSection" style="margin-bottom:40px;">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">The Rejection Ledger: Eight Requests, Seven Free Lessons</h2>
            <table style="width:100%;border-collapse:collapse;margin-top:20px;font-size:0.92rem;">
                <thead>
                    <tr style="background:#1f2937;">
                        <th style="padding:12px;border:1px solid #374151;color:#f9fafb;text-align:left;">Refused request</th>
                        <th style="padding:12px;border:1px solid #374151;color:#f9fafb;text-align:left;">Gate that caught it</th>
                        <th style="padding:12px;border:1px solid #374151;color:#f9fafb;text-align:right;">Credits burned</th>
                        <th style="padding:12px;border:1px solid #374151;color:#f9fafb;text-align:right;">If it had passed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Grok upscale 720p → 720p</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#9ca3af;">pricing matcher (no-match)</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;color:#34d399;">0</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;">—</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Qwen image edit, n omitted</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#9ca3af;">DTO @NotBlank</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;color:#34d399;">0</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;">n × 9</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Klein 4K batch of 5 (numImages 1–4)</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#9ca3af;">@AssertTrue combo check</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;color:#34d399;">0</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;">48 (4 × 12); a 5th would be 60</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Wan layer decomposition, size=auto</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#9ca3af;">DTO whitelist</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;color:#34d399;">0</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;">unknown — the point</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Omni i2v, single shot, aspect 16:9</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#9ca3af;">contract check (must be auto)</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;color:#34d399;">0</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;">150 (5s @ 30/s)</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Omni i2v with two reference frames</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#9ca3af;">DTO (exactly 1)</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;color:#34d399;">0</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;">150–225</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;">Nano Banana 2.1, resolution omitted</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#9ca3af;">pricing matcher (billing key)</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;color:#34d399;">0</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;">6 / 9 / 12 by tier</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#f87171;">GPT Image 2.5, 2K + background=transparent</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;color:#f87171;">none — it passes</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;color:#fbbf24;">18 billed</td>
                        <td style="padding:10px 12px;border-bottom:1px solid #1f2937;text-align:right;">opaque 2K, no alpha</td>
                    </tr>
                </tbody>
            </table>
            <p style="color:#d1d5db;margin-top:16px;">The last row is the whole article in one line: <code>background</code> is only in effect at 1K on <a href="https://www.fuseaitools.com/home/gpt-image/v2-5-flare-text-to-image" style="color:#f87171;text-decoration:none;">GPT Image 2.5</a> — a parameter the pricing table does not read and the DTO does not police. Ask for transparency at 2K (18 list) and you get a legitimate, correctly-sized, completely opaque image — 13 at Pro's 73% and 15 at Basic's 82%, since the ledger is in list and the plans meter at Basic 82% / Pro 73% / Ultra 63%. It is not a bug; it is a contract clause nobody put on the button.</p>
        </section>

        <section itemprop="articleSection" style="margin-bottom:40px;">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">The October Tightening: When the Walls Moved</h2>
            <p style="color:#d1d5db;">Three of the refusals above have a birth date, and that is its own failure class for automation: <strong style="color:#f9fafb;">a request that worked last month can legitimately fail this one</strong>. On October 19 the Wan-family quality rows tightened resolution from optional to mandatory (1K/2K only — other values are vendor-refused, and now platform-refused first). On October 20 the GPT Image 2.5 family tightened resolution to <code>@NotBlank</code>, Qwen's n became mandatory with the 1–4 combo check, and Klein shipped with both keys required from day one. Nothing in this list is a regression; all of it is the gate learning to refuse on the platform's terms instead of the vendor's.</p>
            <p style="color:#d1d5db;">For anyone running batch pipelines, the operational lesson is versioning: a template library is a set of assumptions about the gates, and the gates move. The cheap insurance is a canary order per model per week — at 6 credits (the debug-tier rate that <a href="https://www.fuseaitools.com/home/nano-banana/nano-banana-2-lite" style="color:#f87171;text-decoration:none;">Nano Banana 2 lite</a> charges for a whole generation) you learn within a week whether your assumptions are still true, instead of discovering it mid-batch when 200 of 240 orders fail the same new wall.</p>
        </section>

        <section itemprop="articleSection" style="margin-bottom:40px;">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Pitfalls and One-Line Fixes</h2>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">No-match reads like an outage; it is a price table.</strong> <code>MODEL_IS_NOT_SUPPORT</code> means "this combination has no row," not "this model is down." Check the combination against the ladder before filing anything.</p>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Vendor support is not platform availability.</strong> Grok 1080p video and 720→720 upscale exist at the vendor level; without price rows they cannot be ordered. If a feature matters, its price row is what to watch for.</p>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Billing-key fields fail loudly and cheaply.</strong> If resolution or numImages changes the price, omitting it must fail — the matcher cannot guess. The fix is never "make it default"; the fix is your form sending it.</p>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Auto means "you choose" on some endpoints and "I refuse" on others.</strong> Kling i2v single-shot: auto is the only legal aspect value. Layer decomposition auto: the only illegal size. Read the contract per endpoint, never carry the habit.</p>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">Input counts are numbers with upper and lower bounds.</strong> Exactly-1, ≤1, ≤16, 1–10: four different sentences in four neighboring models. Put the sentence in the template note, not in memory.</p>
            <p style="color:#d1d5db;"><strong style="color:#f9fafb;">The silent pass is the one that costs.</strong> Every loud refusal saved credits. The 2K transparent request charged 18 and delivered an opaque file — the only line in the ledger where the money left and the requirement did not arrive. Feature-condition parameters (background at tier X, mode at resolution Y) belong on checklists.</p>
        </section>

        <section itemprop="articleSection" style="margin-bottom:40px;">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Action Checklist</h2>
            <ul style="color:#d1d5db;padding-left:24px;line-height:1.9;">
                <li>Before automating a new model, enumerate its legal parameter tuples from the price table — the rows are the contract, the form is not.</li>
                <li>Send every billing-key field explicitly (resolution, numImages, duration where metered); "the form has a default" is not the same sentence as "the matcher has a row."</li>
                <li>Pin transparent-background work to 1K, or verify alpha at 2K/4K with one test order before the batch, not after the invoice.</li>
                <li>Keep the error strings distinguishable in your logs: DTO refusal, pricing no-match, and vendor rejection are three different repairs.</li>
                <li>Run one 6-credit canary per pipeline model weekly — gates moved three times in October alone.</li>
                <li>For upscaling, plan the source resolution as if only three doors exist: 480→720, 720→1080, 480→1080. Everything else is a free lesson.</li>
            </ul>
        </section>

        <section itemprop="articleSection" style="margin-bottom:40px;">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">FAQ</h2>
            <div itemscope itemprop="hasPart" itemtype="https://schema.org/Question" style="margin-bottom:24px;">
                <h3 itemprop="name" style="color:#f9fafb;font-size:1.05rem;margin:0 0 8px;">Q: What does MODEL_IS_NOT_SUPPORT actually mean?</h3>
                <div itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p style="color:#d1d5db;margin:0;">It is the pricing matcher saying "no row matches your combination." The model exists and is healthy; the specific tuple — a 720p-to-720p upscale, an omitted resolution on a tier-priced model — simply has nothing to bill against. These refusals are free, which makes them the cheapest information the platform gives you.</p></div>
            </div>
            <div itemscope itemprop="hasPart" itemtype="https://schema.org/Question" style="margin-bottom:24px;">
                <h3 itemprop="name" style="color:#f9fafb;font-size:1.05rem;margin:0 0 8px;">Q: Why does Grok upscale reject my 720p video even though it is supported?</h3>
                <div itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p style="color:#d1d5db;margin:0;">Only three source-to-target pairs have price rows: 480→720 at 15 per source-second, 720→1080 at 30, and 480→1080 at 45. A 720p source can only go to 1080; anything else finds no row and dies at the gate with no charge. If your plan needed 720→720, the request was always a no-op — the refusal is telling you the truth.</p></div>
            </div>
            <div itemscope itemprop="hasPart" itemtype="https://schema.org/Question" style="margin-bottom:24px;">
                <h3 itemprop="name" style="color:#f9fafb;font-size:1.05rem;margin:0 0 8px;">Q: My transparent background request worked but the PNG has no alpha — why?</h3>
                <div itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p style="color:#d1d5db;margin:0;">Because background=transparent is only in effect at 1K on the GPT Image 2.5 family. At 2K the order passes every gate — the price row exists, the field is legal — and the transparency condition silently does not apply. This is the rare failure that bills: check alpha on one test frame at your delivery resolution before committing a batch.</p></div>
            </div>
            <div itemscope itemprop="hasPart" itemtype="https://schema.org/Question" style="margin-bottom:24px;">
                <h3 itemprop="name" style="color:#f9fafb;font-size:1.05rem;margin:0 0 8px;">Q: Why is auto rejected as a size on layer decomposition when the vendor accepts it?</h3>
                <div itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p style="color:#d1d5db;margin:0;">With auto, the vendor picks the resolution after pricing must be locked, so no row can be matched in advance and the platform cannot tell you the cost before charging it. Refusing auto is the same principle that makes resolution a mandatory billing key on Klein and Nano Banana 2.1: if a field can change the price, the order must state it. Pick 1K or 2K explicitly.</p></div>
            </div>
            <div itemscope itemprop="hasPart" itemtype="https://schema.org/Question" style="margin-bottom:24px;">
                <h3 itemprop="name" style="color:#f9fafb;font-size:1.05rem;margin:0 0 8px;">Q: Do rejected orders consume credits?</h3>
                <div itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p style="color:#d1d5db;margin:0;">Gate refusals do not — DTO validation and pricing no-match both resolve before any charge, which is why this entire failure class is the cheapest to learn. The two things that do cost are the silent passes (valid order, wrong assumption — like alpha at 2K) and the pre-October behavior where missing mandatory fields surfaced as server errors rather than clean rejections. The 6-credit canary exists precisely to convert the first kind of lesson before it becomes a batch.</p></div>
            </div>
        </section>

        <section itemprop="articleSection" style="margin-bottom:0;">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Closing: Free Lessons Are Still Lessons</h2>
            <p style="color:#d1d5db;">The gates are doing you a favor seven times out of eight: refusing loudly, charging nothing, and naming the exact tuple that has no home in the price table. The only expensive version of this story is the request that passes — because the platform's job is to bill what it can price, and your job is to know what you are buying. Keep the three-door upscale map, the mandatory-key list, and the one silent-pass line somewhere your automation can see them, and spot-check the contract rows yourself inside <a href="https://www.fuseaitools.com/home/grok/upscale" style="color:#f87171;text-decoration:none;">Grok upscale</a> and <a href="https://www.fuseaitools.com/home/gpt-image/v2-5-flare-text-to-image" style="color:#f87171;text-decoration:none;">GPT Image 2.5 flare text-to-image</a> on FuseAI. A refusal costs seconds. The silent pass costs the batch.</p>
        </section>
    </article>
</body>
</html>
```
