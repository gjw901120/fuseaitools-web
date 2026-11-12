# News Article: The Hidden Price of Every Re-roll — Cost-per-Keep Economics (English)

Nobody budgets for the clips they delete. Cost-per-keep — unit price divided by keep rate — is the only number that describes what a finished video actually costs, and it moves more than the model choice does.

---

### title
The Hidden Price of Every Re-roll: Cost-per-Keep Across Seven AI Video Models, and the Draft-First Workflow That Halves It

### path
`ai-video-reroll-economics-hidden-cost-per-keep`

### description
Every re-roll hides a unit price: cost per kept clip. Keep-rate math across seven AI video models, and the draft-first workflow that nearly halves it.

### keyword
AI video re-roll cost, cost per keep, keep rate economics, Kling Omni pricing, Seedance mini drafts, AI video budget math, FuseAI Tools

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Hidden Price of Every Re-roll: Cost-per-Keep Across Seven AI Video Models, and the Draft-First Workflow That Halves It</title>
    <meta name="description" content="Every re-roll hides a unit price: cost per kept clip. Keep-rate math across seven AI video models, and the draft-first workflow that nearly halves it.">
</head>
<body>
    <article class="ai-model-comparison" itemscope itemtype="https://schema.org/Article" style="background:#0b0c0f;background-image:radial-gradient(ellipse 65% 50% at 50% 0%, rgba(244,114,182,.07), transparent),radial-gradient(ellipse 50% 40% at 100% 90%, rgba(34,211,238,.05), transparent),linear-gradient(180deg, #151318, #0b0c0f);color:#e5e7eb;padding:20px;border-radius:12px;">

        <section class="introduction">
            <p style="color:#d1d5db;">A budget says "40 clips this month" and an invoice says something else entirely, because budgets count keeps and billing counts rolls. On <a href="https://www.fuseaitools.com" style="color:#f472b6;">FuseAITools</a> the gap between those two numbers is fully predictable: it's <strong style="color:#f9fafb;">unit list price ÷ keep rate</strong>, a ratio most creators have never written down and every model choice silently changes. This article builds the table — cost-per-keep across seven real units at three honest keep rates — and then prices the one workflow decision (draft first, final second) that has moved monthly invoices more than any model switch ever has.</p>

            <p style="color:#d1d5db;">Credits bill at 100 = $1; monthly plans meter at <strong style="color:#f9fafb;">Basic 82%, Pro 73%, Ultra 63%</strong> of list. All unit prices below are list credits per single generation, failures included the moment you hit render.</p>
        </section>

        <section class="ratio">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">One Ratio, Seven Units: The Cost-per-Keep Table</h2>
            <p style="color:#d1d5db;">Three keep rates cover real behavior: <strong style="color:#f9fafb;">1-in-2</strong> for a model and scene you've already tuned, <strong style="color:#f9fafb;">1-in-3</strong> for new prompts or finicky motion, <strong style="color:#f9fafb;">1-in-4</strong> for anything photoreal-human or physics-sensitive. Multiply the unit by the denominator and the sticker prices stop being comparable:</p>
            <table style="width:100%;border-collapse:collapse;color:#d1d5db;font-size:14px;">
                <thead>
                    <tr style="background:rgba(55,65,81,0.4);">
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Unit (list per roll)</th>
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Keep 1-in-2</th>
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Keep 1-in-3</th>
                        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #374151;">Keep 1-in-4</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;"><a href="https://www.fuseaitools.com/home/sora/text-to-video" style="color:#60a5fa;">Sora 2 clip</a> (10, flat)</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">20</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">30</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">40</td></tr>
                    <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;"><a href="https://www.fuseaitools.com/home/suno/generate" style="color:#34d399;">Suno track</a> (20, flat)</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">40</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">60</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">80</td></tr>
                    <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;"><a href="https://www.fuseaitools.com/home/veo3/text-to-video" style="color:#818cf8;">Veo 3.1 Lite clip</a> (24, flat)</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">48</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">72</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">96</td></tr>
                    <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;"><a href="https://www.fuseaitools.com/home/wan/v3-0-video" style="color:#60a5fa;">Wan 3.0</a> 8s 480p (96)</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">192</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">288</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">384</td></tr>
                    <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;"><a href="https://www.fuseaitools.com/home/kling/v3-turbo-image-to-video" style="color:#f472b6;">Kling V3 Turbo</a> 8s 720p (216)</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">432</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">648</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">864</td></tr>
                    <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;"><a href="https://www.fuseaitools.com/home/kling/3-0-omni-text-to-video" style="color:#f472b6;">Kling 3.0 Omni</a> 8s 1080p w/ audio (288)</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">576</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">864</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">1,152</td></tr>
                    <tr><td style="padding:10px 12px;border-bottom:1px solid #1f2937;"><a href="https://www.fuseaitools.com/home/seedance/v2" style="color:#a78bfa;">Seedance 2</a> 8s 4K w/ reference (2,592)</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">5,184</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">7,776</td><td style="padding:10px 12px;border-bottom:1px solid #1f2937;">10,368</td></tr>
                </tbody>
            </table>
            <p style="color:#d1d5db;">Read the corners: a $10 budget line (1,000 credits) buys fifty kept Sora clips at a generous 1-in-2, or <strong style="color:#f472b6;">zero kept Seedance 4K shots</strong> — one in four at 10,368 cost-per-keep blows the month on a single success. The far right column is where per-second billing meets ambition, and it's also why the top units in this table are exactly the ones professionals run through a draft lane first.</p>
        </section>

        <section class="workflow">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Draft-First: Buying the Keep Rate Before the Pixels</h2>
            <p style="color:#d1d5db;">The ratio has two levers — unit price and keep rate — and the draft lane is the only workflow that improves both at once. Render the scene concept as an 8-second <a href="https://www.fuseaitools.com/home/seedance/v2-mini" style="color:#a78bfa;">Seedance 2 Mini</a> beat at 480p with reference (3 credits/sec — 24 a roll), iterate until the composition survives review, then spend the 288-credit Omni final <em>once</em>. Same family, 108× price spread between draft and flagship; the cheap half of the ladder exists precisely to protect the expensive half from experimentation.</p>
            <p style="color:#d1d5db;">Priced against the naive alternative — shooting finals blind at a 1-in-3 keep rate — for a month that must deliver <strong style="color:#f9fafb;">20 kept hero clips</strong>:</p>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;"><strong style="color:#f9fafb;">Blind finals:</strong> 20 × 3 rolls × 288 = <strong style="color:#f472b6;">17,280 list credits</strong> — $172.80 raw, effective cost per keep 864.</li>
                <li style="margin-bottom:6px;"><strong style="color:#f9fafb;">Draft-first:</strong> 20 × 2 draft rolls × 24 = 960, plus finals at a 1-in-1.2 keep rate (drafting absorbs most failures) 20 × 1.2 × 288 = 6,912 → <strong style="color:#f472b6;">7,872 list credits</strong> — effective cost per keep <strong style="color:#f472b6;">394</strong>.</li>
                <li style="margin-bottom:6px;"><strong style="color:#f9fafb;">Spread:</strong> 9,408 list credits saved, 54% of the invoice — and 394 happens to be the exact price of a mid-tier signature unit in the 60-video pyramid budget, which is not a coincidence: draft-first is how a hero render gets down to signature-tier economics.</li>
            </ul>
        </section>

        <section class="controls">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">The Insurance Line: Storyboards and the 4.4× Payback</h2>
            <p style="color:#d1d5db;">A second lever works before any pixels exist: <a href="https://www.fuseaitools.com/home/sora/pro-storyboard" style="color:#60a5fa;">storyboard planning</a> at 160 credits per episode locks composition, blocking, and shot order in a medium where a mistake costs almost nothing. Model the effect as a keep-rate shift on six Omni beats — 1-in-2 becomes 2-in-3 — and the arithmetic is blunt: 6 keeps cost 3,456 blind versus 2,592 after planning plus the 160 storyboard, <strong style="color:#f472b6;">704 credits saved per episode, 4.4× the price of the planning pass itself</strong>. Buy it on every unit over roughly 300 credits; skip it on flat clips where a re-roll costs less than the thinking.</p>
            <p style="color:#d1d5db;">What the draft lane and the storyboard share is the direction of the bet: both spend small, fixed amounts to move the denominator, while re-rolling finals spends the big, variable amount to move nothing at all. "Just generate it again" is the only workflow where the price of hope is the price of the model.</p>
        </section>

        <section class="pitfalls">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Four Ways This Math Gets Lied To</h2>
            <ul style="color:#d1d5db;">
                <li style="margin-bottom:6px;"><strong style="color:#f9fafb;">Comparing models at the same keep rate.</strong> A pricier model that keeps 1-in-2 beats a cheap one that keeps 1-in-4 (576 vs 1,152 on Omni-class shots); model comparisons that quote per-roll prices without per-keep prices are comparing menus, not meals.</li>
                <li style="margin-bottom:6px;"><strong style="color:#f9fafb;">Counting drafts you didn't budget.</strong> Draft-first saves 54% only if drafts stay drafts; a 24-credit roll run forty times is still 960, and an unpriced "quick test lane" is how draft economies quietly become a second finals bill.</li>
                <li style="margin-bottom:6px;"><strong style="color:#f9fafb;">Flat clips feel free and aren't.</strong> Ten credits at 1-in-4 is still forty a keep, and a thousand flat rolls a month is ten thousand credits with two hundred and fifty keeps to show — flat pricing hides keep-rate damage in volume, which is exactly where budgets die.</li>
                <li style="margin-bottom:6px;"><strong style="color:#f9fafb;">Discounts apply to the meter, not the habit.</strong> Ultra's 63% turns the blind month into $108.86 and the draft-first month into $49.59 — great, but the ratio between them (54%) belongs entirely to the workflow. Plans discount invoices; only process changes discounts mistakes.</li>
            </ul>
        </section>

        <section class="action-checklist">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Action Checklist</h2>
            <ol style="color:#d1d5db;">
                <li style="margin-bottom:8px;"><strong style="color:#f9fafb;">Compute your real keep rate per model</strong> from last month's history: kept clips ÷ total rolls. Use 1-in-2 / 1-in-3 / 1-in-4 only until you have your own numbers.</li>
                <li style="margin-bottom:8px;"><strong style="color:#f9fafb;">Reprice every recurring unit as cost-per-keep</strong> (list × denominator) and rebuild the monthly budget from those numbers, not sticker prices.</li>
                <li style="margin-bottom:8px;"><strong style="color:#f9fafb;">Route every final over ~200 credits through a Mini draft lane</strong> — 24-credit rolls until the composition survives, then one paid final.</li>
                <li style="margin-bottom:8px;"><strong style="color:#f9fafb;">Buy the storyboard on multi-beat episodes</strong> where a 4.4× payback is modeled; pass on single flat clips.</li>
                <li style="margin-bottom:8px;"><strong style="color:#f9fafb;">Track the two columns monthly</strong> — blind invoice and draft-first invoice — and let the 54% spread argue for the process on your own numbers.</li>
            </ol>
        </section>

        <section class="faq">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">FAQ</h2>
            <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                <h3 style="color:#f9fafb;" itemprop="name">Q: Is a 1-in-3 keep rate normal or am I bad at prompting?</h3>
                <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p style="color:#d1d5db;" itemprop="text">Normal for first-pass work on new scenes; tuning prompts and references typically walks it to 1-in-2 within a few sessions on the same model. The planning levers (storyboard, draft lane) exist because even tuned 1-in-2 still doubles every unit price.</p></div>
            </div>
            <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                <h3 style="color:#f9fafb;" itemprop="name">Q: Does per-second billing change the keep-rate math?</h3>
                <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p style="color:#d1d5db;" itemprop="text">It sharpens it. Metered units multiply duration into every failed roll, so a 1-in-3 on an 8-second Omni shot is 864 a keep while the same rate on a flat 10-credit clip is 30. The longer the metered clip, the more expensive the denominator gets.</p></div>
            </div>
            <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                <h3 style="color:#f9fafb;" itemprop="name">Q: When is draft-first not worth it?</h3>
                <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p style="color:#d1d5db;" itemprop="text">Under roughly 100 list credits per final, a 24-credit draft saves little and adds a review step. The workflow pays exactly where finals are expensive and compositions are uncertain — hero shots, flagship beats, anything a client signs off on.</p></div>
            </div>
            <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                <h3 style="color:#f9fafb;" itemprop="name">Q: Do plan discounts change which workflow wins?</h3>
                <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p style="color:#d1d5db;" itemprop="text">No — Basic 82%, Pro 73% and Ultra 63% scale both columns equally, so the 9,408-credit spread between blind and draft-first stays 54% at every tier. Discounts lower your prices; they don't lower your failure rate.</p></div>
            </div>
            <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                <h3 style="color:#f9fafb;" itemprop="name">Q: What's the single fastest keep-rate improvement?</h3>
                <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p style="color:#d1d5db;" itemprop="text">Image-to-video from a kept still: drafting the frame as a 6-credit <a href="https://www.fuseaitools.com/home/gpt-image/v2-5-sunburst-text-to-image" style="color:#c084fc;">image render</a> means composition failures cost 6 instead of 288, and the video model inherits a frame that already survives review.</p></div>
            </div>
        </section>

        <section class="closing">
            <h2 style="color:#f9fafb;border-bottom-color:#374151;">Closing: Budget the Denominator</h2>
            <p style="color:#d1d5db;">Every number in this article is two numbers: what a roll costs and how many rolls a keep survives. Creators budget the first and get surprised by the second every month; operations people price both, discover that the denominator is the bigger bill, and spend down from there — drafts, storyboards, kept stills — until the effective price is one they'd pay on purpose. On FuseAITools the tools for that are all on the same invoice: the 24-credit draft and the 2,592-credit flagship are meters apart on the same balance, and cost-per-keep is simply the discipline of never spending the second without testing on the first.</p>
        </section>

    </article>
</body>
</html>
```
