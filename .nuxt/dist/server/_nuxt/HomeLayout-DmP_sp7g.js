import { _ as __nuxt_component_0$1 } from "./nuxt-link-BgkIFP7n.js";
import { mergeProps, withCtx, createVNode, toDisplayString, useSSRContext, toRef, isRef, ref, computed, watch, provide, unref, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc, a as useNuxtApp } from "../server.mjs";
import { useRouter, useRoute } from "vue-router";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import "./client-only-BJZIIy-4.js";
import "C:/project/fuseaitools-web/node_modules/klona/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import { u as useApi } from "./useApi-1a9EtG7k.js";
import { u as useAuth } from "./useAuth-BT_C6798.js";
const _sfc_main$1 = {
  __name: "Breadcrumb",
  __ssrInlineRender: true,
  props: {
    category: {
      type: String,
      default: "",
      validator: (value) => !value || ["chat", "image", "audio", "video"].includes(value)
    },
    currentPage: {
      type: String,
      required: true
    },
    parentLabel: {
      type: String,
      default: ""
    },
    parentTo: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: "breadcrumb",
        "aria-label": "Breadcrumb"
      }, _attrs))} data-v-945c9a8d><ol class="breadcrumb-list" data-v-945c9a8d><li class="breadcrumb-item" data-v-945c9a8d>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/home",
        class: "breadcrumb-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fas fa-home" data-v-945c9a8d${_scopeId}></i><span data-v-945c9a8d${_scopeId}>Home</span>`);
          } else {
            return [
              createVNode("i", { class: "fas fa-home" }),
              createVNode("span", null, "Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
      if (__props.parentLabel) {
        _push(`<li class="breadcrumb-item" data-v-945c9a8d>`);
        if (__props.parentTo) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: __props.parentTo,
            class: "breadcrumb-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span data-v-945c9a8d${_scopeId}>${ssrInterpolate(__props.parentLabel)}</span>`);
              } else {
                return [
                  createVNode("span", null, toDisplayString(__props.parentLabel), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<span class="breadcrumb-current" data-v-945c9a8d>${ssrInterpolate(__props.parentLabel)}</span>`);
        }
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<li class="breadcrumb-item" aria-current="page" data-v-945c9a8d><span class="breadcrumb-current" data-v-945c9a8d>${ssrInterpolate(__props.currentPage)}</span></li></ol></nav>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Breadcrumb.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-945c9a8d"]]);
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useHomeLayout = () => {
  const router = useRouter();
  const route = useRoute();
  useApi();
  const { isAuthenticated } = useAuth();
  const categoryToRoute = {
    "GPT": "/home/gpt/generate",
    "DeepSeek": "/home/deepseek/generate",
    "Deepseek": "/home/deepseek/generate",
    "Claude": "/home/claude/generate",
    "Gemini": "/home/gemini/generate",
    "Veo3": "/home/veo3/text-to-video",
    "Runway": "/home/runway/generate",
    "Luma": "/home/luma/generate",
    "Midjourney": "/home/midjourney/imagine",
    "GPT 4o Image": "/home/gpt-4o-image/generate",
    "GPT Image": "/home/gpt-image/text-to-image",
    "Ideogram": "/home/ideogram/v3-text-to-image",
    "Flux Kontext": "/home/flux-kontext/generate",
    "Nano Banana": "/home/nano-banana/generate",
    "Suno": "/home/suno/generate",
    "Elevenlabs": "/home/elevenlabs/multilingual-v2",
    "ElevenLabs": "/home/elevenlabs/multilingual-v2",
    "Sora": "/home/sora/text-to-video",
    "Wan": "/home/wan/text-to-video",
    "Seedance": "/home/seedance/v1-lite-text-to-video",
    "Hailuo": "/home/hailuo/image-to-video-pro",
    "Kling": "/home/kling/v2-5-turbo-image-to-video-pro",
    "Seedream": "/home/seedream/5-lite-text-to-image",
    "Qwen": "/home/qwen/text-to-image",
    "Imagen4": "/home/imagen4/imagen4-generate"
  };
  const categoryToLogo = {
    "GPT": "/tools-logo/ChatGpt.png",
    "DeepSeek": "/tools-logo/Deepseek.png",
    "Deepseek": "/tools-logo/Deepseek.png",
    "Claude": "/tools-logo/Claude.png",
    "Gemini": "/tools-logo/Gemini.png",
    "Veo3": "/tools-logo/Veo.png",
    "Runway": "/tools-logo/Runway.png",
    "Luma": "/tools-logo/Luma.png",
    "Sora": "/tools-logo/sora.png",
    "Wan": "/tools-logo/Wan.png",
    "Seedance": "/tools-logo/Seedance.png",
    "Hailuo": "/tools-logo/Hailuo.png",
    "Kling": "/tools-logo/Kling.png",
    "Seedream": "/tools-logo/Seedream.png",
    "Qwen": "/tools-logo/QWen.png",
    "Midjourney": "/tools-logo/Midjourney.png",
    "GPT 4o Image": "/tools-logo/ChatGPT4OImage.png",
    "GPT Image": "/tools-logo/GPTImage.png",
    "Ideogram": "/tools-logo/Ideogram.png",
    "Flux Kontext": "/tools-logo/FluxKontext.png",
    "Nano Banana": "/tools-logo/NanoBanana.png",
    "Suno": "/tools-logo/suno.png",
    "Elevenlabs": "/tools-logo/Elevenlabs.png",
    "ElevenLabs": "/tools-logo/Elevenlabs.png",
    "Imagen4": "/tools-logo/Imagen4.png"
  };
  const toolRouteMap = {
    "Veo3": "/home/veo3/text-to-video",
    "Runway": "/home/runway/generate",
    "Luma": "/home/luma/generate",
    "Midjourney": "/home/midjourney/imagine",
    "GPT 4o Image": "/home/gpt-4o-image/generate",
    "GPT Image": "/home/gpt-image/text-to-image",
    "Ideogram": "/home/ideogram/v3-text-to-image",
    "Flux Kontext": "/home/flux-kontext/generate",
    "Nano Banana": "/home/nano-banana/generate",
    "Elevenlabs": "/home/elevenlabs/multilingual-v2",
    "Suno": "/home/suno/generate",
    "Sora": "/home/sora/text-to-video",
    "Wan": "/home/wan/text-to-video",
    "Seedance": "/home/seedance/v1-lite-text-to-video",
    "Hailuo": "/home/hailuo/image-to-video-pro",
    "Kling": "/home/kling/v2-5-turbo-image-to-video-pro",
    "Seedream": "/home/seedream/5-lite-text-to-image",
    "Qwen": "/home/qwen/text-to-image",
    "Imagen4": "/home/imagen4/imagen4-generate",
    // Chat tools
    "GPT": "/home/gpt/generate",
    "Deepseek": "/home/deepseek/generate",
    "Claude": "/home/claude/generate",
    "Gemini": "/home/gemini/generate"
  };
  const selectedCategory = ref(1);
  const selectedTool = ref(1);
  const currentPage = useState("home-history-current-page", () => 1);
  const isLoading = ref(false);
  const historyHasMore = useState("home-history-has-more", () => true);
  const navItems = ref([
    {
      id: 1,
      name: "All",
      type: "all",
      icon: "fas fa-th"
    },
    {
      id: 2,
      name: "Chat",
      type: "chat",
      icon: "fas fa-comments"
    },
    {
      id: 3,
      name: "Image",
      type: "image",
      icon: "fas fa-image"
    },
    {
      id: 4,
      name: "Audio",
      type: "audio",
      icon: "fas fa-microphone"
    },
    {
      id: 5,
      name: "Video",
      type: "video",
      icon: "fas fa-video"
    }
  ]);
  const allTools = ref([
    // Chat 工具
    {
      id: 1,
      name: "GPT",
      type: "chat",
      description: "The OpenAI GPT series represents the most advanced conversational AI available today, combining code generation, creative writing, mathematical reasoning, and complex problem-solving in one platform.",
      icon: "/tools-logo/ChatGpt.png",
      rating: 4.9,
      usageCount: 1250
    },
    {
      id: 2,
      name: "Deepseek",
      type: "chat",
      description: "DeepSeek delivers strong code intelligence and long-context reasoning: trained on massive code and text, it excels at multi-language programming (80+ languages), debugging, and mathematical reasoning. Open and commercially friendly, it rivals top closed-source models on coding benchmarks. Use DeepSeek on FuseAITools for development support, deep analysis, and creative writing with long-context applications.",
      icon: "/tools-logo/Deepseek.png",
      rating: 4.8,
      usageCount: 890
    },
    {
      id: 3,
      name: "Claude",
      type: "chat",
      description: "Anthropic's Claude is built for nuanced conversation, long documents, and helpful, accurate outputs. Strong on coding, analysis, and multilingual dialogue, with vision to read PDFs, charts, and diagrams.",
      icon: "/tools-logo/Claude.png",
      rating: 4.8,
      usageCount: 980
    },
    {
      id: 4,
      name: "Gemini",
      type: "chat",
      description: "Google's Gemini brings native multimodal understanding and agentic capabilities: text, image, audio, and video in one architecture; tool use (Search, Maps, code execution); and multi-step reasoning under user oversight. Gemini 2.0 is tuned for the agentic era—context understanding, planning ahead, and supervised actions. Use Gemini on FuseAITools for chat, coding, research, and any task that benefits from grounding and tools.",
      icon: "/tools-logo/Gemini.png",
      rating: 4.7,
      usageCount: 680
    },
    // Image 工具
    {
      id: 6,
      name: "GPT 4o Image",
      type: "image",
      description: "OpenAI image generation model",
      icon: "/tools-logo/ChatGPT4OImage.png",
      rating: 4.7,
      usageCount: 750
    },
    {
      id: 16,
      name: "GPT Image",
      type: "image",
      description: "GPT Image is OpenAI's flagship image generation model for high-quality image creation and precise image editing, with strong instruction following and improved text rendering.",
      icon: "/tools-logo/ChatGpt.png",
      rating: 4.7,
      usageCount: 0
    },
    {
      id: 17,
      name: "Ideogram",
      type: "image",
      description: "Ideogram  is  image generation model, offering text-to-image, image editing, reframing, and remixing with improved consistency and creative control.",
      icon: "/tools-logo/Ideogram.png",
      rating: 4.6,
      usageCount: 0
    },
    {
      id: 7,
      name: "Flux Kontext",
      type: "image",
      description: "High-quality image generation model",
      icon: "/tools-logo/FluxKontext.png",
      rating: 4.6,
      usageCount: 850
    },
    {
      id: 8,
      name: "Nano Banana",
      type: "image",
      description: "Lightweight image generation tool",
      icon: "/tools-logo/NanoBanana.png",
      rating: 4.5,
      usageCount: 560
    },
    {
      id: 15,
      name: "Midjourney",
      type: "image",
      description: "AI image generation platform",
      icon: "/tools-logo/Midjourney.png",
      rating: 4.8,
      usageCount: 1200
    },
    // Audio 工具
    {
      id: 10,
      name: "Suno",
      type: "audio",
      description: "AI music generation tool",
      icon: "/tools-logo/suno.png",
      rating: 4.8,
      usageCount: 780
    },
    {
      id: 11,
      name: "Elevenlabs",
      type: "audio",
      description: "AI voice synthesis tool",
      icon: "/tools-logo/Elevenlabs.png",
      rating: 4.8,
      usageCount: 920
    },
    // Video 工具
    {
      id: 12,
      name: "Veo3",
      type: "video",
      description: "Google AI video generation tool",
      icon: "/tools-logo/Veo.png",
      rating: 4.8,
      usageCount: 650
    },
    {
      id: 13,
      name: "Runway",
      type: "video",
      description: "AI video editing tool",
      icon: "/tools-logo/Runway.png",
      rating: 4.7,
      usageCount: 720
    },
    {
      id: 14,
      name: "Luma",
      type: "video",
      description: "3D video generation tool",
      icon: "/tools-logo/Luma.png",
      rating: 4.6,
      usageCount: 650
    },
    {
      id: 23,
      name: "Sora",
      type: "video",
      description: "Sora 2 video generation (Text-to-Video / Image-to-Video)",
      icon: "/tools-logo/Veo.png",
      rating: 4.7,
      usageCount: 0
    },
    {
      id: 24,
      name: "Wan",
      type: "video",
      description: "Wan AI video: text-to-video, image-to-video, video-to-video",
      icon: "/tools-logo/Wan.png",
      rating: 4.6,
      usageCount: 0
    },
    {
      id: 18,
      name: "Seedance",
      type: "video",
      description: "Seedance v1 Lite & Pro: text-to-video, image-to-video",
      icon: "/tools-logo/Seedance.png",
      rating: 4.6,
      usageCount: 0
    },
    {
      id: 21,
      name: "Hailuo",
      type: "video",
      description: "Hailuo is MiniMax's high-fidelity AI video generation model designed to create realistic motion, expressive characters, and cinematic visuals. It supports both text-to-video and image-to-video, handling complex movements, lighting changes, and detailed facial expressions with stability and consistency.",
      icon: "/tools-logo/Hailuo.png",
      rating: 4.6,
      usageCount: 0
    },
    {
      id: 22,
      name: "Kling",
      type: "video",
      description: "Kling is the latest AI video generation model from Kuaishou Kling, designed for text-to-video and image-to-video creation. Compared to earlier versions, it features better prompt adherence, more fluid motion, consistent artistic styles, and realistic physics simulation.",
      icon: "/tools-logo/Kling.png",
      rating: 4.6,
      usageCount: 0
    },
    {
      id: 19,
      name: "Seedream",
      type: "image",
      description: "Seedream 5 Lite: text-to-image, image-to-image",
      icon: "/tools-logo/Seedream.png",
      rating: 4.6,
      usageCount: 0
    },
    {
      id: 20,
      name: "Qwen",
      type: "image",
      description: "Qwen image: text-to-image, image-to-image, image-edit, Z-Image",
      icon: "/tools-logo/QWen.png",
      rating: 4.6,
      usageCount: 0
    },
    {
      id: 23,
      name: "Imagen4",
      type: "image",
      description: "Imagen4 series: generate, fast, ultra",
      icon: "/tools-logo/Imagen4.png",
      rating: 4.6,
      usageCount: 0
    }
  ]);
  const usageHistory = useState("home-history-list", () => []);
  const lastHistoryLoadAt = useState("home-history-last-load-at", () => 0);
  const HISTORY_COOLDOWN_MS = 10 * 60 * 1e3;
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = typeof timestamp === "string" ? new Date(timestamp.replace(" ", "T")) : timestamp;
    if (Number.isNaN(date.getTime())) return "";
    const now = /* @__PURE__ */ new Date();
    const diff = now - date;
    const oneDayMs = 24 * 60 * 60 * 1e3;
    if (diff >= oneDayMs) {
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
    }
    const minutes = Math.floor(diff / 6e4);
    const hours = Math.floor(diff / 36e5);
    if (hours > 0) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    if (minutes > 0) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    return "Just now";
  };
  const modelToPath = {
    // Midjourney（二级路由）
    midjourney_imagine: "/home/midjourney/imagine",
    midjourney_upscale: "/home/midjourney/upscale",
    midjourney_vary: "/home/midjourney/vary",
    // Nano Banana（三级路由）
    "nano-banana": "/home/nano-banana/generate",
    "nano-banana-edit": "/home/nano-banana/edit",
    "nano-banana-pro": "/home/nano-banana/pro-generate",
    "nano-banana-2": "/home/nano-banana/nano-banana-2",
    // Suno（三级路由）
    suno_generate: "/home/suno/generate",
    suno_extend: "/home/suno/extend",
    suno_upload_cover: "/home/suno/upload-cover",
    suno_upload_extend: "/home/suno/upload-extend",
    suno_add_instrumental: "/home/suno/add-instrumental",
    suno_add_vocals: "/home/suno/add-vocals",
    // Runway（三级路由）
    runway_generate: "/home/runway/generate",
    runway_extend: "/home/runway/extend",
    runway_aleph: "/home/runway/aleph",
    // Veo3（三级路由）
    veo3: "/home/veo3/text-to-video",
    veo3_fast: "/home/veo3/text-to-video",
    text_2_video: "/home/veo3/text-to-video",
    first_and_last_frames_2_video: "/home/veo3/first-and-last-to-video",
    reference_2_video: "/home/veo3/reference-to-video",
    veo3_extend: "/home/veo3/extend",
    video_extend: "/home/veo3/extend",
    // Sora（二级路由，model 与定价 key 对应）
    "sora-2-text-to-video": "/home/sora/text-to-video",
    "sora-2-image-to-video": "/home/sora/image-to-video",
    "sora-2-pro-text-to-video": "/home/sora/pro-text-to-video",
    "sora-2-pro-image-to-video": "/home/sora/pro-image-to-video",
    "sora-watermark-remover": "/home/sora/watermark-remover",
    "sora-2-pro-storyboard": "/home/sora/pro-storyboard",
    // Hailuo（二级路由）
    "2-3-image-to-video-pro": "/home/hailuo/image-to-video-pro",
    "2-3-image-to-video-standard": "/home/hailuo/image-to-video-standard",
    // Flux 2（二级路由）
    "flux-2-text-to-image": "/home/flux-kontext/flux-2-text-to-image",
    "flux-2-image-to-image": "/home/flux-kontext/flux-2-image-to-image",
    "flux-2-pro-text-to-image": "/home/flux-kontext/flux-2-pro-text-to-image",
    "flux-2-pro-image-to-image": "/home/flux-kontext/flux-2-pro-image-to-image",
    "imagen4-generate": "/home/imagen4/imagen4-generate",
    "imagen4-fast": "/home/imagen4/imagen4-fast",
    "imagen4-ultra": "/home/imagen4/imagen4-ultra",
    "seedance-1.5-pro": "/home/seedance/v1-5-pro",
    "v2-5-turbo-image-to-video-pro": "/home/kling/v2-5-turbo-image-to-video-pro",
    "v2-5-turbo-text-to-video-pro": "/home/kling/v2-5-turbo-text-to-video-pro",
    "2-6-text-to-video": "/home/kling/v2-6-text-to-video",
    "2-6-image-to-video": "/home/kling/v2-6-image-to-video",
    "2-6-motion-control": "/home/kling/v2-6-motion-control",
    "3-0-motion-control": "/home/kling/v3-0-motion-control",
    "kling-3.0-motion-control": "/home/kling/v3-0-motion-control",
    "ai-avatar-standard": "/home/kling/ai-avatar-standard",
    "ai-avatar-pro": "/home/kling/ai-avatar-pro",
    "3-0-video": "/home/kling/v3-0-video",
    // ElevenLabs（三级路由）
    elevenlabs_text_to_speech_multilingual: "/home/elevenlabs/multilingual-v2",
    elevenlabs_text_to_speech_turbo: "/home/elevenlabs/turbo-2-5",
    elevenlabs_speech_to_text: "/home/elevenlabs/speech-to-text",
    elevenlabs_sound_effect: "/home/elevenlabs/sound-effect-v2",
    elevenlabs_audio_isolation: "/home/elevenlabs/audio-isolation"
  };
  const categoryRoutePrefix = {
    "GPT": "/home/gpt",
    "DeepSeek": "/home/deepseek",
    "Deepseek": "/home/deepseek",
    "Claude": "/home/claude",
    "Gemini": "/home/gemini",
    "Veo3": "/home/veo3",
    "Runway": "/home/runway",
    "Luma": "/home/luma",
    "Midjourney": "/home/midjourney",
    "GPT 4o Image": "/home/gpt-4o-image",
    "GPT Image": "/home/gpt-image",
    "Ideogram": "/home/ideogram",
    "Flux Kontext": "/home/flux-kontext",
    "Nano Banana": "/home/nano-banana",
    "Suno": "/home/suno",
    "Elevenlabs": "/home/elevenlabs",
    "ElevenLabs": "/home/elevenlabs",
    "Sora": "/home/sora",
    "Wan": "/home/wan",
    "Seedance": "/home/seedance",
    "Hailuo": "/home/hailuo",
    "Kling": "/home/kling",
    "Seedream": "/home/seedream",
    "Qwen": "/home/qwen",
    "Imagen4": "/home/imagen4"
  };
  const getHistoryItemRoute = (record) => {
    const category = (record.category || record.toolName || "").trim();
    const categoryLower = category.toLowerCase();
    const model = (record.model || "").trim().toLowerCase();
    let path = model && modelToPath[model] ? modelToPath[model] : categoryToRoute[category] || categoryToRoute[record.model] || null;
    if (categoryLower === "elevenlabs") {
      if (!model.startsWith("elevenlabs_")) {
        path = "/home/elevenlabs/multilingual-v2";
      }
    }
    if (!path) {
      if (model.startsWith("midjourney_")) path = "/home/midjourney/imagine";
      else if (model.startsWith("elevenlabs_")) path = "/home/elevenlabs/multilingual-v2";
      else if (model.startsWith("veo3") || model.includes("_2_video") || model === "video_extend") path = "/home/veo3/text-to-video";
      else if (model.startsWith("sora")) path = "/home/sora/text-to-video";
      else path = categoryToRoute[category] || null;
    }
    const expectedPrefix = categoryRoutePrefix[category];
    if (path && expectedPrefix && !path.startsWith(expectedPrefix)) {
      path = categoryToRoute[category] || path;
    }
    if (!path) return null;
    const recordId = record.recordId || (typeof record.id === "string" ? record.id : null);
    if (!recordId) return path;
    return `${path}?record-id=${encodeURIComponent(recordId)}`;
  };
  const navigateToHistoryItem = (record) => {
    const path = getHistoryItemRoute(record);
    if (path) router.push(path);
  };
  const getToolCount = (type) => {
    if (type === "all") {
      return allTools.value.length;
    }
    return allTools.value.filter((tool) => tool.type === type).length;
  };
  const getCurrentTools = () => {
    const selectedNav = navItems.value.find((nav) => nav.id === selectedCategory.value);
    if (!selectedNav) return [];
    if (selectedNav.type === "all") {
      return allTools.value;
    }
    return allTools.value.filter((tool) => tool.type === selectedNav.type);
  };
  const getSelectedToolInfo = () => {
    const tool = allTools.value.find((t) => t.id === selectedTool.value);
    return tool || allTools.value[0];
  };
  const selectCategory = async (categoryId) => {
    selectedCategory.value = categoryId;
    const tools = getCurrentTools();
    const selectedNav = navItems.value.find((nav) => nav.id === categoryId);
    if (!selectedNav) return;
    const defaultToolByCategory = {
      chat: "GPT",
      image: "GPT 4o Image",
      audio: "Suno",
      video: "Veo3"
    };
    const defaultToolName = defaultToolByCategory[selectedNav.type];
    const defaultTool = defaultToolName ? allTools.value.find((t) => t.name === defaultToolName) : null;
    const targetTool = defaultTool || (tools.length > 0 ? tools[0] : null);
    const targetPath = targetTool && toolRouteMap[targetTool.name] ? toolRouteMap[targetTool.name] : null;
    selectedTool.value = targetTool ? targetTool.id : tools.length > 0 ? tools[0].id : null;
    if (targetPath) {
      try {
        await router.push(targetPath);
      } catch (e) {
        if ((e == null ? void 0 : e.name) !== "NavigationDuplicated" && (e == null ? void 0 : e.name) !== "NavigationAborted") throw e;
      }
    }
  };
  const selectTool = async (toolId) => {
    const tool = allTools.value.find((t) => t.id === toolId);
    if (!tool || !toolRouteMap[tool.name]) return;
    const targetPath = toolRouteMap[tool.name];
    selectedTool.value = toolId;
    try {
      await router.push(targetPath);
    } catch (e) {
      if ((e == null ? void 0 : e.name) !== "NavigationDuplicated" && (e == null ? void 0 : e.name) !== "NavigationAborted") throw e;
    }
  };
  const loadHistoryData = async (forceReload = false) => {
    return;
  };
  const loadMore = async () => {
    if (isLoading.value || !historyHasMore.value) return;
    currentPage.value++;
    await loadHistoryData();
  };
  const refreshHistory = async () => {
    if (!isAuthenticated.value) return;
    currentPage.value = 1;
    await loadHistoryData(true);
  };
  const hasMoreData = computed(() => historyHasMore.value);
  const syncRouteToSelection = () => {
    const routeToToolMap = {
      "/home/veo3": "Veo3",
      "/home/veo3/text-to-video": "Veo3",
      "/home/veo3/first-and-last-to-video": "Veo3",
      "/home/veo3/reference-to-video": "Veo3",
      "/home/veo3/extend": "Veo3",
      "/home/runway": "Runway",
      "/home/runway/generate": "Runway",
      "/home/runway/extend": "Runway",
      "/home/runway/aleph": "Runway",
      "/home/luma": "Luma",
      "/home/luma/generate": "Luma",
      "/home/midjourney": "Midjourney",
      "/home/midjourney/imagine": "Midjourney",
      "/home/midjourney/upscale": "Midjourney",
      "/home/midjourney/vary": "Midjourney",
      "/home/gpt-4o-image": "GPT 4o Image",
      "/home/gpt-4o-image/generate": "GPT 4o Image",
      "/home/gpt-image": "GPT Image",
      "/home/gpt-image/generate": "GPT Image",
      "/home/gpt-image/text-to-image": "GPT Image",
      "/home/gpt-image/image-to-image": "GPT Image",
      "/home/ideogram": "Ideogram",
      "/home/ideogram/generate": "Ideogram",
      "/home/ideogram/v3-text-to-image": "Ideogram",
      "/home/ideogram/v3-edit": "Ideogram",
      "/home/ideogram/v3-remix": "Ideogram",
      "/home/ideogram/v3-reframe": "Ideogram",
      "/home/ideogram/character": "Ideogram",
      "/home/ideogram/character-edit": "Ideogram",
      "/home/ideogram/character-remix": "Ideogram",
      "/home/flux-kontext": "Flux Kontext",
      "/home/flux-kontext/generate": "Flux Kontext",
      "/home/flux-kontext/flux-2-text-to-image": "Flux Kontext",
      "/home/flux-kontext/flux-2-image-to-image": "Flux Kontext",
      "/home/flux-kontext/flux-2-pro-text-to-image": "Flux Kontext",
      "/home/flux-kontext/flux-2-pro-image-to-image": "Flux Kontext",
      "/home/nano-banana": "Nano Banana",
      "/home/nano-banana/generate": "Nano Banana",
      "/home/nano-banana/edit": "Nano Banana",
      "/home/nano-banana/pro-generate": "Nano Banana",
      "/home/nano-banana/nano-banana-2": "Nano Banana",
      "/home/elevenlabs": "Elevenlabs",
      "/home/elevenlabs/multilingual-v2": "Elevenlabs",
      "/home/elevenlabs/turbo-2-5": "Elevenlabs",
      "/home/elevenlabs/speech-to-text": "Elevenlabs",
      "/home/elevenlabs/sound-effect-v2": "Elevenlabs",
      "/home/elevenlabs/audio-isolation": "Elevenlabs",
      "/home/suno": "Suno",
      "/home/suno/generate": "Suno",
      "/home/suno/extend": "Suno",
      "/home/suno/upload-cover": "Suno",
      "/home/suno/upload-extend": "Suno",
      "/home/suno/add-instrumental": "Suno",
      "/home/suno/add-vocals": "Suno",
      "/home/sora": "Sora",
      "/home/sora/text-to-video": "Sora",
      "/home/sora/image-to-video": "Sora",
      "/home/sora/pro-text-to-video": "Sora",
      "/home/sora/pro-image-to-video": "Sora",
      "/home/sora/watermark-remover": "Sora",
      "/home/sora/pro-storyboard": "Sora",
      "/home/wan": "Wan",
      "/home/wan/text-to-video": "Wan",
      "/home/wan/image-to-video": "Wan",
      "/home/wan/video-to-video": "Wan",
      "/home/seedance": "Seedance",
      "/home/seedance/v1-lite-text-to-video": "Seedance",
      "/home/seedance/v1-lite-image-to-video": "Seedance",
      "/home/seedance/v1-pro-text-to-video": "Seedance",
      "/home/seedance/v1-pro-image-to-video": "Seedance",
      "/home/seedance/v1-pro-fast-image-to-video": "Seedance",
      "/home/seedance/v1-5-pro": "Seedance",
      "/home/hailuo": "Hailuo",
      "/home/hailuo/image-to-video-pro": "Hailuo",
      "/home/hailuo/image-to-video-standard": "Hailuo",
      "/home/kling": "Kling",
      "/home/kling/v2-5-turbo-image-to-video-pro": "Kling",
      "/home/kling/v2-5-turbo-text-to-video-pro": "Kling",
      "/home/kling/v2-6-text-to-video": "Kling",
      "/home/kling/v2-6-image-to-video": "Kling",
      "/home/kling/v2-6-motion-control": "Kling",
      "/home/kling/v3-0-motion-control": "Kling",
      "/home/kling/ai-avatar-standard": "Kling",
      "/home/kling/ai-avatar-pro": "Kling",
      "/home/kling/v3-0-video": "Kling",
      "/home/seedream": "Seedream",
      "/home/seedream/5-lite-text-to-image": "Seedream",
      "/home/seedream/5-lite-image-to-image": "Seedream",
      "/home/qwen": "Qwen",
      "/home/qwen/text-to-image": "Qwen",
      "/home/qwen/image-to-image": "Qwen",
      "/home/qwen/image-edit": "Qwen",
      "/home/qwen/z-image": "Qwen",
      "/home/imagen4": "Imagen4",
      "/home/imagen4/imagen4-generate": "Imagen4",
      "/home/imagen4/imagen4-fast": "Imagen4",
      "/home/imagen4/imagen4-ultra": "Imagen4",
      "/home/gpt": "GPT",
      "/home/gpt/generate": "GPT",
      "/home/deepseek": "Deepseek",
      "/home/deepseek/generate": "Deepseek",
      "/home/claude": "Claude",
      "/home/claude/generate": "Claude",
      "/home/gemini": "Gemini",
      "/home/gemini/generate": "Gemini"
    };
    const toolName = routeToToolMap[route.path];
    if (toolName) {
      const tool = allTools.value.find((t) => t.name === toolName);
      if (tool) {
        selectedTool.value = tool.id;
        const toolType = tool.type;
        const navItem = navItems.value.find((nav) => nav.type === toolType);
        if (navItem) {
          selectedCategory.value = navItem.id;
        }
        return true;
      }
    }
    return false;
  };
  const getTypeLabel = (type) => {
    const labels = {
      chat: "Chat",
      image: "Image",
      audio: "Audio",
      video: "Video"
    };
    return labels[type] || "Tool";
  };
  const getToolIcon = (type) => {
    const icons = {
      chat: "fas fa-comments",
      image: "fas fa-image",
      audio: "fas fa-microphone",
      video: "fas fa-video"
    };
    return icons[type] || "fas fa-robot";
  };
  const addToUsageHistory = (toolName) => {
    const tool = allTools.value.find((t) => t.name === toolName);
    if (tool) {
      const logoUrl = categoryToLogo[tool.name] || (typeof tool.icon === "string" && tool.icon.startsWith("/") ? tool.icon : null);
      const newRecord = {
        id: Date.now(),
        toolName: tool.name,
        type: tool.type,
        timestamp: /* @__PURE__ */ new Date(),
        duration: "0 minutes",
        status: "in_progress",
        icon: logoUrl || getToolIcon(tool.type),
        iconIsImage: !!logoUrl,
        description: `${getTypeLabel(tool.type)} processing - Using ${tool.name}`
      };
      usageHistory.value.unshift(newRecord);
      setTimeout(() => {
        const record = usageHistory.value.find((r) => r.id === newRecord.id);
        if (record) {
          record.status = "completed";
          record.duration = "3 minutes";
          record.description = `${getTypeLabel(tool.type)} completed - Used ${tool.name} to process task`;
        }
      }, 3e3);
      tool.usageCount++;
    }
  };
  watch(() => route.path, (newPath) => {
    if (newPath === "/home") {
      router.replace("/home/gpt/generate");
      return;
    }
    syncRouteToSelection();
  }, { immediate: true });
  watch(isAuthenticated, (authed) => {
    if (authed) {
      const inCooldown = lastHistoryLoadAt.value > 0 && Date.now() - lastHistoryLoadAt.value < HISTORY_COOLDOWN_MS;
      if (!(inCooldown && usageHistory.value.length > 0)) {
        currentPage.value = 1;
        loadHistoryData();
      }
    } else {
      usageHistory.value = [];
      historyHasMore.value = false;
    }
  });
  return {
    route,
    selectedCategory,
    selectedTool,
    navItems,
    allTools,
    usageHistory,
    toolRouteMap,
    isLoading,
    hasMoreData,
    formatTime,
    getToolCount,
    getCurrentTools,
    getSelectedToolInfo,
    selectCategory,
    selectTool,
    loadMore,
    refreshHistory,
    addToUsageHistory,
    getHistoryItemRoute,
    navigateToHistoryItem
  };
};
const TOOL_PARENT_LABEL_BY_SLUG = {
  // image
  "gpt-4o-image": "GPT 4o Image",
  "gpt-image": "GPT Image",
  ideogram: "Ideogram",
  "flux-kontext": "Flux Kontext",
  "nano-banana": "Nano Banana",
  midjourney: "Midjourney",
  seedream: "Seedream",
  qwen: "Qwen",
  imagen4: "Imagen4",
  // audio
  suno: "Suno",
  elevenlabs: "Elevenlabs",
  // video
  veo3: "Veo3",
  runway: "Runway",
  luma: "Luma",
  sora: "Sora",
  wan: "Wan",
  seedance: "Seedance",
  hailuo: "Hailuo",
  kling: "Kling"
};
const CHILD_LABEL_OVERRIDES_BY_ROUTE = {
  // image
  "/home/gpt-4o-image/generate": "Generate",
  "/home/gpt-image/text-to-image": "Text to Image",
  "/home/gpt-image/image-to-image": "Image to Image",
  "/home/ideogram/v3-text-to-image": "V3 Text to Image",
  "/home/ideogram/v3-edit": "V3 Edit",
  "/home/ideogram/v3-remix": "V3 Remix",
  "/home/ideogram/v3-reframe": "V3 Reframe",
  "/home/ideogram/character": "Character",
  "/home/ideogram/character-edit": "Character Edit",
  "/home/ideogram/character-remix": "Character Remix",
  "/home/flux-kontext/generate": "Generate",
  "/home/flux-kontext/flux-2-text-to-image": "Flux 2 Text to Image",
  "/home/flux-kontext/flux-2-image-to-image": "Flux 2 Image to Image",
  "/home/flux-kontext/flux-2-pro-text-to-image": "Flux 2 Pro Text to Image",
  "/home/flux-kontext/flux-2-pro-image-to-image": "Flux 2 Pro Image to Image",
  "/home/nano-banana/generate": "Generate",
  "/home/nano-banana/edit": "Edit",
  "/home/nano-banana/pro-generate": "Pro Generate",
  "/home/nano-banana/nano-banana-2": "Nano Banana 2",
  "/home/midjourney/imagine": "Imagine",
  "/home/midjourney/upscale": "Upscale",
  "/home/midjourney/vary": "Vary",
  "/home/seedream/5-lite-text-to-image": "5 Lite Text to Image",
  "/home/seedream/5-lite-image-to-image": "5 Lite Image to Image",
  "/home/qwen/text-to-image": "Text to Image",
  "/home/qwen/image-to-image": "Image to Image",
  "/home/qwen/image-edit": "Image Edit",
  "/home/qwen/z-image": "Z-Image",
  "/home/imagen4/imagen4-generate": "Imagen4 Generate",
  "/home/imagen4/imagen4-fast": "Imagen4 Fast",
  "/home/imagen4/imagen4-ultra": "Imagen4 Ultra",
  // audio
  "/home/suno/generate": "Generate",
  "/home/suno/extend": "Extend",
  "/home/suno/upload-cover": "Upload Cover",
  "/home/suno/upload-extend": "Upload Extend",
  "/home/suno/add-instrumental": "Add Instrumental",
  "/home/suno/add-vocals": "Add Vocals",
  "/home/elevenlabs/multilingual-v2": "Multilingual V2",
  "/home/elevenlabs/turbo-2-5": "Turbo 2.5",
  "/home/elevenlabs/speech-to-text": "Speech to Text",
  "/home/elevenlabs/sound-effect-v2": "Sound Effect V2",
  "/home/elevenlabs/audio-isolation": "Audio Isolation",
  // video
  "/home/veo3/text-to-video": "Text to Video",
  "/home/veo3/first-and-last-to-video": "First and Last to Video",
  "/home/veo3/reference-to-video": "Reference to Video",
  "/home/veo3/extend": "Extend",
  "/home/runway/generate": "Generate",
  "/home/runway/extend": "Extend",
  "/home/runway/aleph": "Aleph",
  "/home/luma/generate": "Generate",
  "/home/sora/text-to-video": "Text to Video",
  "/home/sora/image-to-video": "Image to Video",
  "/home/sora/pro-text-to-video": "Pro Text to Video",
  "/home/sora/pro-image-to-video": "Pro Image to Video",
  "/home/sora/watermark-remover": "Watermark Remover",
  "/home/sora/pro-storyboard": "Pro Storyboard",
  "/home/wan/text-to-video": "Text to Video",
  "/home/wan/image-to-video": "Image to Video",
  "/home/wan/video-to-video": "Video to Video",
  "/home/seedance/v1-lite-text-to-video": "V1 Lite Text to Video",
  "/home/seedance/v1-lite-image-to-video": "V1 Lite Image to Video",
  "/home/seedance/v1-pro-text-to-video": "V1 Pro Text to Video",
  "/home/seedance/v1-pro-image-to-video": "V1 Pro Image to Video",
  "/home/seedance/v1-pro-fast-image-to-video": "V1 Pro Fast Image to Video",
  "/home/seedance/v1-5-pro": "V1.5 Pro",
  "/home/hailuo/image-to-video-standard": "Image to Video Standard",
  "/home/hailuo/image-to-video-pro": "Image to Video Pro",
  "/home/kling/v2-5-turbo-image-to-video-pro": "V2.5 Turbo Image to Video Pro",
  "/home/kling/v2-5-turbo-text-to-video-pro": "V2.5 Turbo Text to Video Pro",
  "/home/kling/v2-6-text-to-video": "V2.6 Text to Video",
  "/home/kling/v2-6-image-to-video": "V2.6 Image to Video",
  "/home/kling/v2-6-motion-control": "V2.6 Motion Control",
  "/home/kling/v3-0-motion-control": "V3.0 Motion Control",
  "/home/kling/ai-avatar-standard": "AI Avatar Standard",
  "/home/kling/ai-avatar-pro": "AI Avatar Pro",
  "/home/kling/v3-0-video": "V3.0 Video"
};
function getToolBreadcrumbByRoute(routePath = "", fallbackCurrent = "") {
  const path = (routePath || "").replace(/\/$/, "");
  const segments = path.split("/").filter(Boolean);
  const isHomeToolRoute = segments[0] === "home" && segments.length >= 2;
  if (!isHomeToolRoute) {
    return {
      parentLabel: "",
      parentTo: "",
      currentLabel: fallbackCurrent || ""
    };
  }
  const toolSlug = segments[1];
  const parentLabel = TOOL_PARENT_LABEL_BY_SLUG[toolSlug] || "";
  const isToolChildRoute = segments.length >= 3;
  if (!isToolChildRoute) {
    return {
      parentLabel: "",
      parentTo: "",
      currentLabel: parentLabel || fallbackCurrent || ""
    };
  }
  const parentTo = isToolChildRoute && parentLabel ? `/home/${toolSlug}` : "";
  const currentLabel = isToolChildRoute ? CHILD_LABEL_OVERRIDES_BY_ROUTE[path] || fallbackCurrent || parentLabel : parentLabel || fallbackCurrent || "";
  return { parentLabel, parentTo, currentLabel };
}
const _sfc_main = {
  __name: "HomeLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      route,
      selectedCategory,
      selectedTool,
      navItems,
      usageHistory,
      toolRouteMap,
      isLoading,
      hasMoreData,
      formatTime,
      getToolCount,
      getCurrentTools,
      addToUsageHistory,
      allTools
    } = useHomeLayout();
    ref(null);
    const selectedCategoryName = computed(() => {
      const category = navItems.value.find((item) => item.id === selectedCategory.value);
      return category ? category.type : null;
    });
    const selectedToolName = computed(() => {
      const tool = allTools.value.find((t) => t.id === selectedTool.value);
      return tool ? tool.name : null;
    });
    const routeBreadcrumb = computed(() => getToolBreadcrumbByRoute(route.path, selectedToolName.value || ""));
    const breadcrumbParentLabel = computed(() => {
      return routeBreadcrumb.value.parentLabel;
    });
    const breadcrumbParentTo = computed(() => {
      return routeBreadcrumb.value.parentTo;
    });
    const breadcrumbCurrentPage = computed(() => {
      return routeBreadcrumb.value.currentLabel;
    });
    provide("addToUsageHistory", addToUsageHistory);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))} data-v-292f3e0e><div class="main-layout" data-v-292f3e0e><aside class="left-sidebar" data-v-292f3e0e><div class="timeline-header timeline-header-row" data-v-292f3e0e><h3 data-v-292f3e0e>History</h3><button type="button" class="history-refresh-btn" title="Refresh"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-292f3e0e><i class="${ssrRenderClass(unref(isLoading) ? "fas fa-spinner fa-spin" : "fas fa-sync-alt")}" data-v-292f3e0e></i></button></div><div class="timeline-container" data-v-292f3e0e><div class="timeline-items" data-v-292f3e0e><!--[-->`);
      ssrRenderList(unref(usageHistory), (record, index) => {
        _push(`<div class="timeline-item timeline-item-clickable" data-v-292f3e0e><span class="${ssrRenderClass([record.status, "timeline-item-status-badge"])}"${ssrRenderAttr("title", record.status === "completed" ? "Completed" : "In progress")} data-v-292f3e0e><i class="${ssrRenderClass(record.status === "completed" ? "fas fa-check-circle" : "fas fa-spinner fa-spin")}" data-v-292f3e0e></i></span><div class="${ssrRenderClass([[record.status, record.type], "timeline-marker"])}" data-v-292f3e0e>`);
        if (record.iconIsImage && record.icon) {
          _push(`<img${ssrRenderAttr("src", record.icon)}${ssrRenderAttr("alt", record.toolName || record.category)} class="timeline-marker-logo" data-v-292f3e0e>`);
        } else {
          _push(`<i class="${ssrRenderClass(record.icon)}" data-v-292f3e0e></i>`);
        }
        _push(`</div><div class="timeline-content" data-v-292f3e0e><div class="timeline-header" data-v-292f3e0e><div class="timeline-tool" data-v-292f3e0e>${ssrInterpolate(record.toolName || record.category)}</div></div><div class="timeline-description" data-v-292f3e0e>${ssrInterpolate(record.description || record.title)}</div>`);
        if (record.model) {
          _push(`<div class="timeline-meta" data-v-292f3e0e><span class="timeline-model" data-v-292f3e0e>${ssrInterpolate(record.model)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="timeline-meta" data-v-292f3e0e><div class="timeline-time" data-v-292f3e0e>${ssrInterpolate(unref(formatTime)(record.timestamp))}</div></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(usageHistory).length > 0) {
        _push(`<div class="load-more-container" data-v-292f3e0e>`);
        if (unref(hasMoreData)) {
          _push(`<button class="load-more-btn"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-292f3e0e>`);
          if (unref(isLoading)) {
            _push(`<i class="fas fa-spinner fa-spin" data-v-292f3e0e></i>`);
          } else {
            _push(`<i class="fas fa-plus" data-v-292f3e0e></i>`);
          }
          _push(` ${ssrInterpolate(unref(isLoading) ? "Loading..." : "Load More")}</button>`);
        } else {
          _push(`<div class="no-more-hint" data-v-292f3e0e>No more</div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(usageHistory).length === 0) {
        _push(`<div class="empty-timeline" data-v-292f3e0e>`);
        if (unref(isLoading)) {
          _push(`<i class="fas fa-spinner fa-spin" data-v-292f3e0e></i>`);
        } else {
          _push(`<i class="fas fa-history" data-v-292f3e0e></i>`);
        }
        _push(`<p data-v-292f3e0e>${ssrInterpolate(unref(isLoading) ? "Loading..." : "No usage records")}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></aside><main class="right-main" data-v-292f3e0e><header class="tools-navigation" data-v-292f3e0e><div class="nav-tabs" data-v-292f3e0e><!--[-->`);
      ssrRenderList(unref(navItems), (navItem) => {
        _push(`<div class="${ssrRenderClass([{ active: unref(selectedCategory) === navItem.id }, "nav-tab"])}" data-v-292f3e0e><i class="${ssrRenderClass(navItem.icon)}" data-v-292f3e0e></i><span data-v-292f3e0e>${ssrInterpolate(navItem.name)}</span><span class="tool-count" data-v-292f3e0e>${ssrInterpolate(unref(getToolCount)(navItem.type))}</span></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(selectedCategory)) {
        _push(`<div class="sub-nav" data-v-292f3e0e><!--[-->`);
        ssrRenderList(unref(getCurrentTools)(), (subTool) => {
          _push(`<!--[-->`);
          if (unref(toolRouteMap)[subTool.name]) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: unref(toolRouteMap)[subTool.name],
              class: ["sub-nav-item", { active: unref(selectedTool) === subTool.id }]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(subTool.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(subTool.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<div class="${ssrRenderClass([{ active: unref(selectedTool) === subTool.id }, "sub-nav-item"])}" data-v-292f3e0e>${ssrInterpolate(subTool.name)}</div>`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header><section class="tool-interface" data-v-292f3e0e>`);
      if (selectedCategoryName.value && selectedToolName.value) {
        _push(ssrRenderComponent(Breadcrumb, {
          category: selectedCategoryName.value,
          "parent-label": breadcrumbParentLabel.value,
          "parent-to": breadcrumbParentTo.value,
          "current-page": breadcrumbCurrentPage.value
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="tool-interface-slot" data-v-292f3e0e>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></section></main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HomeLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-292f3e0e"]]);
export {
  __nuxt_component_0 as _,
  getToolBreadcrumbByRoute as g
};
//# sourceMappingURL=HomeLayout-DmP_sp7g.js.map
