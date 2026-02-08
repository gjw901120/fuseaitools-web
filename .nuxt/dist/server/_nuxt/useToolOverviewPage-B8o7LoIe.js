import { _ as __nuxt_component_0$1 } from "./HomeLayout-CFv173Mv.js";
import { _ as __nuxt_component_0$2 } from "./nuxt-link-BgkIFP7n.js";
import { withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext, computed } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { u as useHead } from "./v3-DXSoGrP9.js";
import { _ as _export_sfc } from "../server.mjs";
import { useRoute } from "vue-router";
const _sfc_main = {
  __name: "ToolOverview",
  __ssrInlineRender: true,
  props: {
    config: {
      type: Object,
      required: true,
      validator: (c) => c.title && Array.isArray(c.features)
    }
  },
  setup(__props) {
    const props = __props;
    useHead({
      title: `${props.config.title} - AI Tools | FuseAITools`,
      meta: [
        { name: "description", content: props.config.intro }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tool-overview content-padding" data-v-07d550a1${_scopeId}><header class="overview-header" data-v-07d550a1${_scopeId}><span class="overview-category" data-v-07d550a1${_scopeId}>${ssrInterpolate(__props.config.category)}</span><h1 class="overview-title" data-v-07d550a1${_scopeId}>${ssrInterpolate(__props.config.title)}</h1><p class="overview-intro" data-v-07d550a1${_scopeId}>${ssrInterpolate(__props.config.intro)}</p></header><section class="overview-features" data-v-07d550a1${_scopeId}><h2 class="features-heading" data-v-07d550a1${_scopeId}>Features</h2><div class="features-grid" data-v-07d550a1${_scopeId}><!--[-->`);
            ssrRenderList(__props.config.features, (feature) => {
              _push2(ssrRenderComponent(_component_NuxtLink, {
                key: feature.path,
                to: feature.path,
                class: "feature-card-link"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="feature-card" data-v-07d550a1${_scopeId2}><div class="feature-icon" data-v-07d550a1${_scopeId2}><i class="fas fa-arrow-right" data-v-07d550a1${_scopeId2}></i></div><h3 class="feature-title" data-v-07d550a1${_scopeId2}>${ssrInterpolate(feature.name)}</h3><p class="feature-description" data-v-07d550a1${_scopeId2}>${ssrInterpolate(feature.description)}</p><span class="feature-cta" data-v-07d550a1${_scopeId2}>Use this feature →</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "feature-card" }, [
                        createVNode("div", { class: "feature-icon" }, [
                          createVNode("i", { class: "fas fa-arrow-right" })
                        ]),
                        createVNode("h3", { class: "feature-title" }, toDisplayString(feature.name), 1),
                        createVNode("p", { class: "feature-description" }, toDisplayString(feature.description), 1),
                        createVNode("span", { class: "feature-cta" }, "Use this feature →")
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></section></div>`);
          } else {
            return [
              createVNode("div", { class: "tool-overview content-padding" }, [
                createVNode("header", { class: "overview-header" }, [
                  createVNode("span", { class: "overview-category" }, toDisplayString(__props.config.category), 1),
                  createVNode("h1", { class: "overview-title" }, toDisplayString(__props.config.title), 1),
                  createVNode("p", { class: "overview-intro" }, toDisplayString(__props.config.intro), 1)
                ]),
                createVNode("section", { class: "overview-features" }, [
                  createVNode("h2", { class: "features-heading" }, "Features"),
                  createVNode("div", { class: "features-grid" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.config.features, (feature) => {
                      return openBlock(), createBlock(_component_NuxtLink, {
                        key: feature.path,
                        to: feature.path,
                        class: "feature-card-link"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "feature-card" }, [
                            createVNode("div", { class: "feature-icon" }, [
                              createVNode("i", { class: "fas fa-arrow-right" })
                            ]),
                            createVNode("h3", { class: "feature-title" }, toDisplayString(feature.name), 1),
                            createVNode("p", { class: "feature-description" }, toDisplayString(feature.description), 1),
                            createVNode("span", { class: "feature-cta" }, "Use this feature →")
                          ])
                        ]),
                        _: 2
                      }, 1032, ["to"]);
                    }), 128))
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ToolOverview.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-07d550a1"]]);
const toolOverviews = {
  gpt: {
    title: "GPT",
    category: "Chat",
    intro: "OpenAI's GPT delivers powerful conversational AI for writing, coding, and analysis. Use the latest models in one place with FuseAITools.",
    features: [
      { name: "Chat & Generate", path: "/home/gpt/generate", description: "Conversational AI: ask questions, write content, and get instant answers." }
    ]
  },
  deepseek: {
    title: "DeepSeek",
    category: "Chat",
    intro: "DeepSeek provides high-quality reasoning and long-context support for coding and general tasks. Access it easily through FuseAITools.",
    features: [
      { name: "Chat & Generate", path: "/home/deepseek/generate", description: "Chat with DeepSeek for code, analysis, and creative writing." }
    ]
  },
  claude: {
    title: "Claude",
    category: "Chat",
    intro: "Anthropic's Claude excels at nuanced conversation, long documents, and safe, helpful outputs. Use Claude on FuseAITools.",
    features: [
      { name: "Chat & Generate", path: "/home/claude/generate", description: "Have in-depth conversations and get detailed, thoughtful responses." }
    ]
  },
  gemini: {
    title: "Gemini",
    category: "Chat",
    intro: "Google's Gemini offers multimodal understanding and strong performance across text, code, and reasoning. Try it on FuseAITools.",
    features: [
      { name: "Chat & Generate", path: "/home/gemini/generate", description: "Use Gemini for chat, coding, and multi-turn reasoning." }
    ]
  },
  "gpt-4o-image": {
    title: "GPT 4o Image",
    category: "Image",
    intro: "Generate and edit images with OpenAI's vision-capable GPT 4o. Create images from text or refine existing ones in one workflow.",
    features: [
      { name: "Generate", path: "/home/gpt-4o-image/generate", description: "Create and edit images with natural language prompts." }
    ]
  },
  "flux-kontext": {
    title: "Flux Kontext",
    category: "Image",
    intro: "Flux Kontext delivers high-quality image generation with fine control. Choose Pro or Max and create stunning visuals.",
    features: [
      { name: "Generate", path: "/home/flux-kontext/generate", description: "Generate images with Flux Kontext (Pro/Max) from text prompts." }
    ]
  },
  "nano-banana": {
    title: "Nano Banana",
    category: "Image",
    intro: "Nano Banana offers lightweight, fast image generation: text-to-image, image-to-image, and a Pro tier for advanced creation.",
    features: [
      { name: "Text to Image", path: "/home/nano-banana/generate", description: "Generate images from text descriptions." },
      { name: "Image to Image", path: "/home/nano-banana/edit", description: "Transform or edit existing images with prompts." },
      { name: "Pro Generate", path: "/home/nano-banana/pro-generate", description: "Use Nano Banana Pro for higher quality and control." }
    ]
  },
  midjourney: {
    title: "Midjourney",
    category: "Image",
    intro: "Midjourney powers artistic and photorealistic image creation. Imagine, upscale, and vary your images in one place.",
    features: [
      { name: "Imagine", path: "/home/midjourney/imagine", description: "Create new images from text prompts." },
      { name: "Upscale", path: "/home/midjourney/upscale", description: "Upscale and refine your generated images." },
      { name: "Vary", path: "/home/midjourney/vary", description: "Generate variations of an existing image." }
    ]
  },
  suno: {
    title: "Suno",
    category: "Audio",
    intro: "Suno turns ideas into music and audio: generate new tracks, extend songs, add vocals or instrumentals, and create covers.",
    features: [
      { name: "Music Generation", path: "/home/suno/generate", description: "Create new music from text prompts." },
      { name: "Music Extension", path: "/home/suno/extend", description: "Extend existing music tracks." },
      { name: "Audio Cover", path: "/home/suno/upload-cover", description: "Create cover versions from uploaded audio." },
      { name: "Audio Expansion", path: "/home/suno/upload-extend", description: "Expand on uploaded audio clips." },
      { name: "Accompaniment", path: "/home/suno/add-instrumental", description: "Add instrumental accompaniment to audio." },
      { name: "Vocal Generation", path: "/home/suno/add-vocals", description: "Generate vocals for your tracks." }
    ]
  },
  elevenlabs: {
    title: "ElevenLabs",
    category: "Audio",
    intro: "ElevenLabs provides state-of-the-art text-to-speech, speech-to-text, sound effects, and audio isolation—all in one platform.",
    features: [
      { name: "Multilingual v2", path: "/home/elevenlabs/multilingual-v2", description: "Natural text-to-speech in multiple languages." },
      { name: "Turbo 2.5", path: "/home/elevenlabs/turbo-2-5", description: "Fast, high-quality speech synthesis." },
      { name: "Speech to Text", path: "/home/elevenlabs/speech-to-text", description: "Transcribe audio to text accurately." },
      { name: "Sound Effect v2", path: "/home/elevenlabs/sound-effect-v2", description: "Generate sound effects from descriptions." },
      { name: "AI Audio Isolation", path: "/home/elevenlabs/audio-isolation", description: "Isolate vocals or instruments from mixed audio." }
    ]
  },
  veo3: {
    title: "Veo 3",
    category: "Video",
    intro: "Google's Veo 3 creates and extends video from text, reference images, or first-and-last frames. High quality and flexible.",
    features: [
      { name: "Text to Video", path: "/home/veo3/text-to-video", description: "Generate video from text prompts." },
      { name: "First & Last to Video", path: "/home/veo3/first-and-last-to-video", description: "Create video between start and end frames." },
      { name: "Reference to Video", path: "/home/veo3/reference-to-video", description: "Generate video from a reference image." },
      { name: "Extend", path: "/home/veo3/extend", description: "Extend existing video clips." }
    ]
  },
  runway: {
    title: "Runway",
    category: "Video",
    intro: "Runway brings AI video generation and editing to your workflow: create from text or images, extend clips, and use Aleph for advanced effects.",
    features: [
      { name: "Generate", path: "/home/runway/generate", description: "Create video from text or image prompts." },
      { name: "Extend", path: "/home/runway/extend", description: "Extend video length with AI." },
      { name: "Aleph", path: "/home/runway/aleph", description: "Advanced AI video and effects with Runway Aleph." }
    ]
  },
  luma: {
    title: "Luma",
    category: "Video",
    intro: "Luma AI enables high-quality video generation from text or images. Create smooth, realistic clips in one click.",
    features: [
      { name: "Generate", path: "/home/luma/generate", description: "Generate video from text or image inputs." }
    ]
  },
  sora: {
    title: "Sora",
    category: "Video",
    intro: "OpenAI's Sora delivers powerful text-to-video and image-to-video generation, with Pro modes, watermark removal, and storyboard tools.",
    features: [
      { name: "Text to Video", path: "/home/sora/text-to-video", description: "Create video from text prompts." },
      { name: "Image to Video", path: "/home/sora/image-to-video", description: "Animate images into video." },
      { name: "Pro Text to Video", path: "/home/sora/pro-text-to-video", description: "Pro-tier text-to-video generation." },
      { name: "Pro Image to Video", path: "/home/sora/pro-image-to-video", description: "Pro-tier image-to-video generation." },
      { name: "Watermark Remover", path: "/home/sora/watermark-remover", description: "Remove watermarks from video." },
      { name: "Pro Storyboard", path: "/home/sora/pro-storyboard", description: "Create storyboards with Sora Pro." }
    ]
  }
};
function useToolOverviewPage() {
  const route = useRoute();
  const pathNormalized = computed(() => (route.path || "").replace(/\/$/, ""));
  const overviewKey = computed(() => {
    const match = pathNormalized.value.match(/^\/home\/([^/]+)$/);
    return match ? match[1] : null;
  });
  const isOverviewPage = computed(() => !!overviewKey.value);
  const overviewConfig = computed(
    () => overviewKey.value ? toolOverviews[overviewKey.value] || null : null
  );
  return { isOverviewPage, overviewConfig };
}
export {
  __nuxt_component_0 as _,
  useToolOverviewPage as u
};
//# sourceMappingURL=useToolOverviewPage-B8o7LoIe.js.map
