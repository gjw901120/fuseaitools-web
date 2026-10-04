# News Article: Luma Dream Machine Complete Guide — From Beginner to Pro (English)

Full entry following the `news-article-standard.md` format: **title / path / description / keyword / content**.

---

### title
Luma Dream Machine Complete Guide: From Beginner to Pro

### path
`luma-dream-machine-complete-guide-beginner-to-pro`

### description
The complete Luma Dream Machine guide — what it is, the Ray series evolution (Ray 2 / Ray 3 / Ray 3.14 / Ray 3.2), core features including text-to-video, image-to-video, video extension, looping, audio and lip sync, Luma Agents and Skills, a step-by-step tutorial, prompt techniques with examples, video modify and style transfer, visual reference and character control, use cases and limitations, and an eight-question FAQ.

### keyword
Luma Dream Machine, Luma AI, Ray 2, Ray 3, Ray 3.2, Ray 3.14, text-to-video, image-to-video, video extension, loop video, keyframes, lip sync, HDR, video modify, style transfer, Luma Agents, Skills, camera control, AI video generation, Luma tutorial, FuseAI Tools, /home/luma

### content
(Full HTML for CMS `content` field.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Luma Dream Machine Complete Guide: From Beginner to Pro</title>
</head>
<body>
    <article class="ai-tool-guide">
        <section class="introduction">
            <h2>Introduction</h2>
            <p>Luma Dream Machine is Luma AI's flagship AI video generation platform. Unlike many tools focused purely on video generation, Luma AI has a unique technical foundation — the company first became known for neural radiance field (NeRF) technology and 3D capture, then transferred its deep expertise in spatial computing to generative video, giving it a distinctive understanding of physics, materials, and motion simulation.</p>
            <p>Try Luma's video generation directly on FuseAI Tools: <a href="/home/luma">/home/luma</a> — <a href="/home/luma/generate">Generate</a>.</p>
            <p>Dream Machine's core goal: generate high-quality video clips with cinematic, dynamic motion from text or images. Its output is known for dreamlike, film-like movement and natural light and shadow, especially in mood-building and expressive camera language. It is accessible via Web and iOS, supports quick login with a Google account, and offers free usage credits for creators to experiment.</p>
        </section>

        <section class="ray-series">
            <h2>II. Core Models: Ray Series Evolution</h2>
            <p>Luma's video generation is powered by the Ray series of models, which has gone through several major iterations:</p>

            <h3>2.1 Ray 2</h3>
            <p>Ray 2, released in January 2025, is Luma's first-generation mainstream video generation model. It excels at dreamlike, film-like motion styles, supports 1080p output, generates 5 to 10 second clips, and supports adding voiceovers. Ray 2's image-to-video capability is especially popular, transforming static images into dynamic footage with smooth camera movement.</p>

            <h3>2.2 Ray 3</h3>
            <p>Ray 3, released in September 2025, is Luma's first reasoning video model. Unlike traditional AI video generators, Ray 3 spends more computation time before generation to process the request and "check" the answer, enabling it to handle complex action sequences better.</p>
            <p>Ray 3 introduced several major upgrades:</p>
            <ul>
                <li><strong>16-bit HDR generation:</strong> higher-resolution color and dynamic range, usable directly in professional post-production</li>
                <li><strong>Draft mode:</strong> quickly test creative ideas at lower resolution in about 20 seconds, then upgrade to high-fidelity output (about 2 to 5 minutes)</li>
                <li><strong>Visual annotation tools:</strong> show the steps the model takes while working, flagging characters that need adjustment and regions that must remain unchanged</li>
            </ul>
            <p>Luma AI CEO Amit Jain described this reasoning ability as "the model not only converts text to pixels, but also evaluates and judges — 'that's not good, I need to do better at this.'"</p>

            <h3>2.3 Ray 3.14 and Ray 3.2</h3>
            <p>Ray 3.14 further optimized speed and audio support, enabling synchronized audio generation in specific interfaces.</p>
            <p>Ray 3.2, released in June 2026, is a major update designed in collaboration with creators in the entertainment, advertising, and gaming industries, marking Luma's full upgrade toward professional film production tools. Core improvements include:</p>
            <ul>
                <li><strong>Multi-keyframe control:</strong> up to 16 keyframes per clip for frame-level control of action and narrative beats</li>
                <li><strong>Enhanced performance tracking:</strong> tracks skeletal pose, gestures, and expression states for up to 8 faces simultaneously</li>
                <li><strong>Native HDR and 16-bit EXR export:</strong> output can enter professional color grading and compositing workflows directly</li>
                <li><strong>Up to 20 seconds of 1080p generation:</strong> enough duration for real scene construction</li>
                <li><strong>Open API:</strong> full model capabilities available via API for the first time, easy to integrate into enterprise products and workflows</li>
            </ul>
        </section>

        <section class="core-features">
            <h2>III. Core Features Explained</h2>

            <h3>3.1 Text-to-Video</h3>
            <p>Users input a text description and the model generates video content. Output supports up to 1080p native resolution. Prompts should include a complete description of the scene, subject, action, lighting, camera movement, and style.</p>

            <h3>3.2 Image-to-Video</h3>
            <p>One of Luma's most competitive features. Users upload a static image and the model generates a dynamic video with action and camera movement based on it.</p>
            <p>Image-to-video supports two modes:</p>
            <ul>
                <li><strong>Single image animation:</strong> upload one image and the model adds motion, camera movement, and action</li>
                <li><strong>Keyframe transition:</strong> provide a start image and an end image, and the model generates the transition video between them — ideal for precise narrative control</li>
            </ul>

            <h3>3.3 Video Extension</h3>
            <p>Users can extend already-generated videos, adding about 5 seconds forward or backward. This lets original 5 to 10 second clips gradually extend into longer narratives.</p>

            <h3>3.4 Loop Video</h3>
            <p>Users can generate seamlessly looping videos by adding "loop" to the prompt or toggling the loop option in the interface. On Web, enable it by clicking the infinity symbol in the prompt bar; on iOS, select the "Loop" tag in the prompt dial.</p>

            <h3>3.5 Video Modify</h3>
            <p>Luma supports transforming existing videos in style, lighting, environment, weather, and more. See Part VI of this article.</p>

            <h3>3.6 Audio and Voiceover</h3>
            <p>Luma provides a fairly complete audio chain:</p>
            <ul>
                <li><strong>Text-to-speech voiceover:</strong> natural narration with emotion labels, including excited, whispered, sad, and more</li>
                <li><strong>Sound effect generation:</strong> 5 to 22 second short effects to enhance atmosphere</li>
                <li><strong>Music generation:</strong> full background music tracks with or without vocals</li>
                <li><strong>Lip sync:</strong> synchronizes a character video's mouth movements to any audio track for realistic lip-syncing, with emotion and expression control</li>
            </ul>

            <h3>3.7 Subtitles and Transcription</h3>
            <p>Luma can extract word-level timestamps from a video's audio track and render animated subtitles and title overlays with full style control.</p>

            <h3>3.8 Luma Agents Project Memory</h3>
            <p>Luma Agents is the platform's core capability at the project-level workflow layer. An Agent maintains creative context across a project, remembering decisions already made, directions already rejected, and creative rules established from the initial brief. When handling batch assets that need consistent style, tone, and branding, the Agent eliminates the need to repeat requirements on every generation, automatically applying project parameters across all subsequent work.</p>

            <h3>3.9 Skills: Reusable Workflows</h3>
            <p>Skills let teams encode and reuse common workflows. When a team develops a specific process (such as turning product photography into hero shots, or producing social media variants), Skills capture that knowledge as a ready-to-use asset. A spring campaign template built once can become the foundation for a fall campaign — with brand guidelines, color palettes, and creative approaches embedded.</p>
        </section>

        <section class="tutorial">
            <h2>IV. Usage Tutorial</h2>

            <h3>4.1 Preparation</h3>
            <p>Visit the Dream Machine website and log in with a Google account. The interface is clean — a central prompt bar with community-generated work displayed below. iOS users can download the Dream Machine app from the App Store and log in with Google or Apple accounts.</p>

            <h3>4.2 Step 1: Choose the Generation Mode</h3>
            <ul>
                <li><strong>Text-to-video:</strong> enter a text description in the prompt bar</li>
                <li><strong>Image-to-video:</strong> click the image icon to upload a reference image, then enter a prompt describing the desired motion</li>
            </ul>

            <h3>4.3 Step 2: Write the Prompt</h3>
            <p>Describe your desired video in a structured way. Use this formula:</p>
            <pre><code>[Subject] + [Action] + [Environment] + [Lighting/Atmosphere] + [Camera movement] + [Technical style]

Example: "A rusty industrial robot trudges through a foggy redwood forest, moss growing on its metal plates. Cinematic low-angle tracking shot, god rays streaming through the canopy, 4K, photorealistic style, slow motion."</code></pre>

            <h3>4.4 Step 3: Configure Settings</h3>
            <ul>
                <li><strong>Duration:</strong> choose 5 or 10 seconds</li>
                <li><strong>Model:</strong> choose the Ray2 or Ray3 series</li>
                <li><strong>Resolution:</strong> 540p, 720p, or 1080p</li>
                <li><strong>Loop:</strong> click the infinity symbol if you want seamless looping</li>
            </ul>

            <h3>4.5 Step 4: Generate and Iterate</h3>
            <p>Click generate. Standard generation takes 10 to 60 seconds depending on video complexity and queue load. Draft mode outputs results quickly at lower resolution in about 20 seconds — confirm the direction, then upgrade to the high-fidelity version.</p>
            <p>After generation, download the MP4 file. If unsatisfied, revise the prompt and regenerate.</p>

            <h3>4.6 iOS Quick Start</h3>
            <p>The iOS flow is basically the same as Web:</p>
            <ol>
                <li>Tap "+" on the home page to create a new Board</li>
                <li>Enter a prompt to generate a batch of 4 images</li>
                <li>Pick a favorite image and tap "Make Video" to generate 4-second video variants</li>
                <li>Use "Extend" to keep extending</li>
                <li>Adjust camera movement direction (pan, orbit, zoom) via the star icon in the prompt box</li>
            </ol>
        </section>

        <section class="prompt-techniques">
            <h2>V. Prompting Tips and Examples</h2>

            <h3>5.1 Five Core Techniques</h3>

            <p><strong>Technique 1: Use natural, specific language.</strong> Concrete descriptions beat abstract vocabulary. Instead of just "city," write "magazine-cover-quality city skyline, golden hour lighting."</p>

            <p><strong>Technique 2: Include camera movement.</strong> Luma excels at camera simulation. Use terms like pan, zoom, dolly, and tracking shot to help the model apply realistic camera work.</p>

            <p><strong>Technique 3: Use a structured prompt format.</strong> Experts recommend this structure:</p>
            <pre><code>Subject → Action → Subject detail → Scene → Style → Camera movement → Emphasis words

Example: "A man in a red coat running through a foggy forest, cinematic lighting, tracking shot, camera following from behind."</code></pre>

            <p><strong>Technique 4: Focus on motion description in image-to-video.</strong> After uploading an image, the prompt should only describe the motion you want to add, not re-describe existing content.</p>

            <p><strong>Technique 5: Use CFG scale to control adherence.</strong> The CFG scale controls how strictly the model follows your prompt:</p>
            <ul>
                <li><strong>0.5:</strong> balanced default (recommended starting point)</li>
                <li><strong>0.7-1.0:</strong> stricter prompt adherence</li>
                <li><strong>0.2-0.4:</strong> more creative freedom</li>
            </ul>

            <h3>5.2 Example Prompts</h3>
            <p><strong>Product showcase:</strong></p>
            <pre><code>"360-degree orbiting shot of a sleek smartphone on a minimalist stand, slowly floating motion. Audio: quiet studio ambience, slight whoosh during rotation, faint click when the screen lights up. No dialogue. Clear commercial lighting, clean reflections, product photography style."</code></pre>
            <p><strong>Creator talking head:</strong></p>
            <pre><code>"Medium close-up, a creator faces the camera in a home studio, subtle gestures, gentle camera push-in. Audio: clear voice over a low-volume Lo-Fi beat, faint room tone. She says: 'Today I'll show you three AI tricks you can use right away.' Warm key light, soft background blur, natural skin texture."</code></pre>
            <p><strong>Emotional atmosphere:</strong></p>
            <pre><code>"Neon-lit street on a rainy night, camera slowly tracks the subject from behind, then the subject turns to the camera. Audio: rain hitting the pavement, distant traffic, footsteps. She says: 'Okay... this is where it starts.' Noir-style lighting, high contrast, shallow depth of field."</code></pre>
            <p><strong>Seamless loop:</strong></p>
            <pre><code>"Continuous hyper-speed FPV shot: the camera seamlessly flies through a glacial canyon into a dreamlike cloudscape. loop."</code></pre>
        </section>

        <section class="video-modify">
            <h2>VI. Video Modify and Style Transfer</h2>
            <p>Luma's Video Modify (video-to-video) feature lets users modify existing videos based on prompts, rather than generating from scratch.</p>

            <h3>6.1 What Can You Modify?</h3>
            <ul>
                <li><strong>Style transfer:</strong> live-action to animation, or photorealistic to illustration</li>
                <li><strong>Relighting:</strong> change the time of day, add dramatic lighting</li>
                <li><strong>Environment change:</strong> city to nature, summer to winter, day to night</li>
                <li><strong>Weather modification:</strong> add rain, fog, snow, sunlight</li>
                <li><strong>Artistic stylization:</strong> oil painting, watercolor, comic book, film color grading</li>
            </ul>

            <h3>6.2 Intensity Control</h3>
            <p>Modification has three intensity modes, each with three levels:</p>
            <div class="comparison-table">
                <table>
                    <thead>
                        <tr>
                            <th>Mode</th>
                            <th>Effect</th>
                            <th>Best For</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Adhere (1-3)</strong></td>
                            <td>Stays close to the original video, subtle changes</td>
                            <td>Light color grading, small touch-ups</td>
                        </tr>
                        <tr>
                            <td><strong>Flex (1-3)</strong></td>
                            <td>Balanced transformation</td>
                            <td>General style transfer</td>
                        </tr>
                        <tr>
                            <td><strong>Reimagine (1-3)</strong></td>
                            <td>Creative freedom, major overhaul</td>
                            <td>Completely changing style and environment</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>6.3 Key Rules</h3>
            <p>Three rules must be followed when using Video Modify:</p>
            <ul>
                <li><strong>Describe the target state, not the command:</strong> write "cyberpunk neon city night, rain-soaked streets" rather than "turn the sky blue"</li>
                <li><strong>Avoid temporal language:</strong> don't say "become" or "transform into"</li>
                <li><strong>Use only positive descriptions:</strong> write "clear blue sky" rather than "no clouds"</li>
            </ul>
        </section>

        <section class="reference-control">
            <h2>VII. Visual Reference and Character Control</h2>

            <h3>7.1 Reference Mode</h3>
            <p>Luma's Reference mode lets users upload reference images to guide generation. Switch to Reference mode, select Image V2 as the working model, upload a reference image clearly showing a single character or object, then describe the desired change in natural language.</p>
            <p><strong>Valid reference instructions:</strong></p>
            <ul>
                <li>"Generate an image of this character skiing in the Swiss Alps"</li>
                <li>"Show me a Dutch-angle shot of this character running through a city, with motion blur"</li>
                <li>"Create an image of this character surfing in Costa Rica"</li>
            </ul>
            <p><strong>Invalid reference instructions:</strong></p>
            <ul>
                <li>"Skiing in the Swiss Alps" (missing an action instruction like "generate an image")</li>
                <li>"Dutch angle, city, motion blur" (missing the subject reference)</li>
            </ul>

            <h3>7.2 Combining Multiple Reference Images</h3>
            <p>Reference mode supports multiple reference images at once. Effective combinations include:</p>
            <ul>
                <li>Reference 1: a clear, unobstructed character</li>
                <li>Reference 2: a clear, unobstructed vehicle</li>
                <li>Reference 3: a matching background scene</li>
            </ul>
            <p>If the reference images have clear logical relationships, you can skip the text instruction and let the model combine all references into a coherent output.</p>
        </section>

        <section class="use-cases-limitations">
            <h2>VIII. Use Cases and Limitations</h2>

            <h3>8.1 Use Cases</h3>
            <ul>
                <li><strong>Cinematic atmosphere and mood shorts:</strong> Luma's dreamlike motion style and natural lighting make it a top choice for atmosphere. Travel-style B-roll, title backgrounds, and mood-based music videos fit especially well.</li>
                <li><strong>Product ads and hero shots:</strong> Ray 3.2 supports HDR and 16-bit EXR output, so generated video can go straight into DaVinci Resolve or Premiere Pro for professional grading without conversion or loss of dynamic range.</li>
                <li><strong>Social vertical content:</strong> Luma supports 1:1 square ratio for Instagram posts. Lip sync performs well in direct-to-camera talking-head content.</li>
                <li><strong>Rapid creative exploration and iteration:</strong> draft mode lets creators test creative directions in about 20 seconds, iterating through dozens of versions before final delivery.</li>
                <li><strong>Multi-shot narratives:</strong> Ray 3.2 supports up to 16 keyframes for frame-level control of action and narrative beats — ideal for precise storyboard matching.</li>
            </ul>

            <h3>8.2 Limitations</h3>
            <ul>
                <li><strong>Audio and lip sync need extra work:</strong> Luma typically generates video and audio in separate steps — video first, sound design later. While it supports lip sync, it differs from tools with native synchronized audio-video generation.</li>
                <li><strong>Short native clips:</strong> base generation is 5 to 10 seconds; extensions can lengthen it, but native short clips mean long narratives need stitching work.</li>
                <li><strong>Better for atmosphere than literal detail:</strong> Luma's cinematic style excels at emotion but may fall short in scenarios requiring strict literal detail (such as precise product spec display or clear text rendering) compared to more photorealistic models.</li>
                <li><strong>More about motion than reference production:</strong> compared with models emphasizing reference assets and long-form production, Luma's core strength lies in cinematic dynamics and keyframe-driven motion control.</li>
            </ul>
        </section>

        <section class="faq">
            <h2>IX. FAQ</h2>

            <h3>Q1: Is Luma Dream Machine free to use?</h3>
            <p>Yes. Luma provides free usage credits for creators to experience and experiment. For more generations and commercial rights, upgrade to the Lite, Plus, or Unlimited plans.</p>

            <h3>Q2: What is the maximum video length?</h3>
            <p>Base generation supports 5 or 10 seconds. The Extend feature can add about 5 seconds forward or backward from an existing clip. The Ray 3.2 version supports single generations of up to 20 seconds.</p>

            <h3>Q3: What is draft mode?</h3>
            <p>Draft mode, introduced with Ray 3, lets users quickly test creative ideas at lower resolution in about 20 seconds, then upgrade to high-fidelity output. High-fidelity generation takes about 2 to 5 minutes.</p>

            <h3>Q4: Does Luma support Chinese prompts?</h3>
            <p>Yes. But the official prompt guides and examples are mostly in English. When using Chinese prompts, keep them structured and specific, following the "subject + action + environment + lighting + camera movement" structure.</p>

            <h3>Q5: What are the requirements for input images in image-to-video?</h3>
            <p>Use images with a clear subject and good composition. In Reference mode, character reference images work best with the subject alone on a simple background — for example, "isolating the character on a white background" before use as reference input.</p>

            <h3>Q6: Does Luma support multiple keyframes?</h3>
            <p>Ray 3.2 supports up to 16 keyframes per clip for frame-level precision control.</p>

            <h3>Q7: Is Luma's API open?</h3>
            <p>Ray 3.2 provides the full model capability via API for the first time. Developers can integrate Luma's video generation into enterprise products, custom tools, and workflows.</p>

            <h3>Q8: What's the difference between Luma and other video models?</h3>
            <p>Luma's signature is cinematic motion — natural, expressive movement and keyframe-controlled camera language. If your creative needs are "cinematic motion" and "precise camera choreography," Luma is a leading choice.</p>
        </section>

        <section class="conclusion">
            <h2>Conclusion</h2>
            <p>Luma Dream Machine is one of the most distinctive "cinematic" platforms in AI video generation. From Ray 2's dreamlike motion style, to Ray 3's reasoning ability and draft mode, to Ray 3.2's multi-keyframe control, HDR output, and professional-grade API, Luma's evolution clearly points toward one goal: taking creators from "prompting" to "directing."</p>
            <p>For content creators, ad producers, and film industry professionals, Luma offers a toolchain that precisely translates creative visions into dynamic footage. It is especially strong at mood-building, expressive camera work, and frame-level control.</p>
            <p>Of course, Luma isn't universal. Its native clips are short, it emphasizes motion control over long-form narrative, and audio generation requires extra steps. Understanding its capability boundaries and choosing the right scenarios matters more than blindly chasing "AI generating everything."</p>
            <p>For creators who want to produce cinematic short films quickly and value camera control and style consistency, start from the <a href="/home/luma">Luma hub</a> on FuseAI Tools and explore the generation workflow via <a href="/home/luma/generate">/home/luma/generate</a>.</p>
        </section>
    </article>
</body>
</html>
```
