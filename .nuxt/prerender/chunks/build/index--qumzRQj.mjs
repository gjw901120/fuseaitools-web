import { _ as __nuxt_component_0 } from './nuxt-link-BgkIFP7n.mjs';
import { ref, computed, watch, provide, mergeProps, unref, withCtx, createTextVNode, toDisplayString, nextTick, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderAttr } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { V as Veo3Tool } from './Veo3Tool-B81C6sH2.mjs';
import { R as RunwayTool } from './RunwayTool-BKjGgGun.mjs';
import { L as LumaTool } from './LumaTool-DvL0L702.mjs';
import { M as MidjourneyTool } from './MidjourneyTool-DCuO5W57.mjs';
import { G as GPT4oImageTool } from './GPT4oImageTool-CorD3P9E.mjs';
import { G as GPTImageTool } from './GPTImageTool-DHQpYqnM.mjs';
import { I as IdeogramTool } from './IdeogramTool-rt3oxOp3.mjs';
import { N as NanoBananaTool } from './NanoBananaTool-BTyFAlfK.mjs';
import { E as ElevenLabsTool } from './ElevenLabsTool-BQXprj-C.mjs';
import { F as FluxKontextTool } from './FluxKontextTool-7397lJdC.mjs';
import { S as SunoTool } from './SunoTool-Bqs9oITX.mjs';
import { S as SoraTool } from './SoraTool-DFiQ9B8J.mjs';
import { W as WanTool } from './WanTool-DVQ2mFHY.mjs';
import { S as SeedanceTool } from './SeedanceTool-BJKhi7aP.mjs';
import { H as HailuoTool } from './HailuoTool-MChd6H9y.mjs';
import { K as KlingTool } from './KlingTool-Bi6AR_LK.mjs';
import { S as SeedreamTool } from './SeedreamTool-Cq_bMRA3.mjs';
import { Q as QwenTool } from './QwenTool-eqxl300X.mjs';
import { I as Imagen4Tool } from './Imagen4Tool-rhhRnj8I.mjs';
import { useRouter, useRoute } from 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import { u as useHead } from './v3-DXSoGrP9.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs';
import '../_/renderer.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/destr/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ofetch/dist/node.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unstorage/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/project/fuseaitools-web/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/project/fuseaitools-web/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ohash/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/klona/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/scule/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/project/fuseaitools-web/node_modules/pathe/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unhead/dist/server.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/devalue/index.js';
import 'file://C:/project/fuseaitools-web/node_modules/unhead/dist/utils.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unhead/dist/plugins.mjs';
import './UploadImage-D6DL1USQ.mjs';
import './useToast-CATlmXE8.mjs';
import './useAuth-BT_C6798.mjs';
import './useApi-1a9EtG7k.mjs';
import './useModelPrice-DCrt0_k3.mjs';
import './useRecordPolling-QI_mIuwF.mjs';
import './useBatchUploadUrl-_AVZ_-oO.mjs';
import './UploadAudio-CGq6L9QH.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs';

const itemsPerPage = 10;
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
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
    useHead({
      title: "AI Tools Platform - FuseAI",
      meta: [
        { name: "description", content: "Discover and use the most advanced AI tools to enhance your work efficiency and creativity. Includes 100+ curated AI tools covering writing, design, programming, data analysis and more." },
        { name: "keywords", content: "AI tools, artificial intelligence, AI applications, work efficiency, tool recommendations, FuseAI" }
      ]
    });
    const selectedCategory = ref(1);
    const selectedTool = ref(1);
    const currentPage = ref(1);
    const isLoading = ref(false);
    const inputMessage = ref("");
    const isWebSearchEnabled = ref(false);
    const uploadedFiles = ref([]);
    const chatMessages = ref([]);
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
    const allHistoryData = [
      {
        id: 1,
        toolName: "ChatGPT",
        type: "chat",
        timestamp: new Date(Date.now() - 30 * 60 * 1e3),
        // 30分钟前
        duration: "15\u5206\u949F",
        status: "completed",
        icon: "fas fa-comments",
        description: "\u5BF9\u8BDD\u751F\u6210 - \u64B0\u5199\u4EA7\u54C1\u4ECB\u7ECD\u6587\u6848"
      },
      {
        id: 2,
        toolName: "Midjourney",
        type: "image",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1e3),
        // 2小时前
        duration: "8\u5206\u949F",
        status: "completed",
        icon: "fas fa-image",
        description: "\u56FE\u50CF\u751F\u6210 - \u521B\u5EFA\u54C1\u724CLogo\u8BBE\u8BA1"
      },
      {
        id: 3,
        toolName: "ElevenLabs",
        type: "audio",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1e3),
        // 5小时前
        duration: "12\u5206\u949F",
        status: "completed",
        icon: "fas fa-microphone",
        description: "\u8BED\u97F3\u5408\u6210 - \u5236\u4F5C\u64AD\u5BA2\u4ECB\u7ECD\u97F3\u9891"
      },
      {
        id: 4,
        toolName: "Runway ML",
        type: "video",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1e3),
        // 1天前
        duration: "20\u5206\u949F",
        status: "completed",
        icon: "fas fa-video",
        description: "\u89C6\u9891\u7F16\u8F91 - \u5236\u4F5C\u4EA7\u54C1\u6F14\u793A\u89C6\u9891"
      },
      {
        id: 5,
        toolName: "Claude",
        type: "chat",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1e3),
        // 2天前
        duration: "25\u5206\u949F",
        status: "completed",
        icon: "fas fa-comments",
        description: "\u5BF9\u8BDD\u5206\u6790 - \u5206\u6790\u7528\u6237\u53CD\u9988\u6570\u636E"
      },
      {
        id: 6,
        toolName: "DALL-E 3",
        type: "image",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1e3),
        // 3天前
        duration: "6\u5206\u949F",
        status: "completed",
        icon: "fas fa-image",
        description: "\u56FE\u50CF\u521B\u4F5C - \u751F\u6210\u793E\u4EA4\u5A92\u4F53\u914D\u56FE"
      },
      {
        id: 7,
        toolName: "Synthesia",
        type: "video",
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1e3),
        // 4天前
        duration: "18\u5206\u949F",
        status: "completed",
        icon: "fas fa-video",
        description: "AI\u89C6\u9891\u751F\u6210 - \u5236\u4F5C\u57F9\u8BAD\u89C6\u9891"
      },
      {
        id: 8,
        toolName: "Murf AI",
        type: "audio",
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1e3),
        // 5天前
        duration: "10\u5206\u949F",
        status: "completed",
        icon: "fas fa-microphone",
        description: "\u8BED\u97F3\u514B\u9686 - \u5236\u4F5C\u914D\u97F3\u97F3\u9891"
      },
      {
        id: 9,
        toolName: "Jasper AI",
        type: "chat",
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1e3),
        // 6天前
        duration: "22\u5206\u949F",
        status: "completed",
        icon: "fas fa-comments",
        description: "\u5185\u5BB9\u521B\u4F5C - \u64B0\u5199\u8425\u9500\u90AE\u4EF6"
      },
      {
        id: 10,
        toolName: "Stable Diffusion",
        type: "image",
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3),
        // 7天前
        duration: "14\u5206\u949F",
        status: "completed",
        icon: "fas fa-image",
        description: "\u56FE\u50CF\u751F\u6210 - \u521B\u5EFA\u6982\u5FF5\u827A\u672F\u56FE"
      },
      {
        id: 17,
        toolName: "Descript",
        type: "audio",
        timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1e3),
        // 8天前
        duration: "16\u5206\u949F",
        status: "completed",
        icon: "fas fa-microphone",
        description: "\u97F3\u9891\u7F16\u8F91 - \u5904\u7406\u91C7\u8BBF\u5F55\u97F3"
      },
      {
        id: 12,
        toolName: "Luma AI",
        type: "video",
        timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1e3),
        // 9天前
        duration: "12\u5206\u949F",
        status: "completed",
        icon: "fas fa-video",
        description: "3D\u89C6\u9891\u751F\u6210 - \u5236\u4F5C\u4EA7\u54C1\u5C55\u793A"
      },
      {
        id: 13,
        toolName: "Copy.ai",
        type: "chat",
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1e3),
        // 10天前
        duration: "8\u5206\u949F",
        status: "completed",
        icon: "fas fa-comments",
        description: "\u6587\u6848\u751F\u6210 - \u521B\u5EFA\u793E\u4EA4\u5A92\u4F53\u5185\u5BB9"
      },
      {
        id: 14,
        toolName: "Canva AI",
        type: "image",
        timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1e3),
        // 11天前
        duration: "20\u5206\u949F",
        status: "completed",
        icon: "fas fa-image",
        description: "\u8BBE\u8BA1\u751F\u6210 - \u5236\u4F5C\u6D77\u62A5\u8BBE\u8BA1"
      },
      {
        id: 15,
        toolName: "Podcastle",
        type: "audio",
        timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1e3),
        // 12天前
        duration: "25\u5206\u949F",
        status: "completed",
        icon: "fas fa-microphone",
        description: "\u64AD\u5BA2\u5236\u4F5C - \u7F16\u8F91\u64AD\u5BA2\u8282\u76EE"
      },
      {
        id: 16,
        toolName: "InVideo",
        type: "video",
        timestamp: new Date(Date.now() - 13 * 24 * 60 * 60 * 1e3),
        // 13天前
        duration: "30\u5206\u949F",
        status: "completed",
        icon: "fas fa-video",
        description: "\u89C6\u9891\u5236\u4F5C - \u521B\u5EFA\u5BA3\u4F20\u89C6\u9891"
      }
    ];
    const usageHistory = ref([]);
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
        description: "Google's Gemini brings native multimodal understanding and agentic capabilities: text, image, audio, and video in one architecture; tool use (Search, Maps, code execution); and multi-step reasoning under user oversight. Gemini 2.0 is tuned for the agentic era\u2014context understanding, planning ahead, and supervised actions. Use Gemini on FuseAITools for chat, coding, research, and any task that benefits from grounding and tools.",
        icon: "/tools-logo/Gemini.png",
        rating: 4.7,
        usageCount: 680
      },
      // Image 工具
      {
        id: 6,
        name: "GPT 4o Image",
        type: "image",
        description: "OpenAI\u7684\u56FE\u50CF\u751F\u6210\u6A21\u578B",
        icon: "/tools-logo/ChatGPT4OImage.png",
        rating: 4.7,
        usageCount: 750
      },
      {
        id: 16,
        name: "GPT Image",
        type: "image",
        description: "GPT Image is OpenAI's flagship image generation model for high-quality image creation and precise image editing, with strong instruction following and improved text rendering.",
        icon: "/tools-logo/GPTImage.png",
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
        description: "\u9AD8\u8D28\u91CF\u56FE\u50CF\u751F\u6210\u6A21\u578B",
        icon: "/tools-logo/FluxKontext.png",
        rating: 4.6,
        usageCount: 850
      },
      {
        id: 8,
        name: "Nano Banana",
        type: "image",
        description: "\u8F7B\u91CF\u7EA7\u56FE\u50CF\u751F\u6210\u5DE5\u5177",
        icon: "/tools-logo/NanoBanana.png",
        rating: 4.5,
        usageCount: 560
      },
      // Audio 工具
      {
        id: 10,
        name: "Suno",
        type: "audio",
        description: "AI\u97F3\u4E50\u751F\u6210\u5DE5\u5177",
        icon: "/tools-logo/suno.png",
        rating: 4.8,
        usageCount: 780
      },
      {
        id: 11,
        name: "Elevenlabs",
        type: "audio",
        description: "AI\u8BED\u97F3\u5408\u6210\u5DE5\u5177",
        icon: "/tools-logo/Elevenlabs.png",
        rating: 4.8,
        usageCount: 920
      },
      // Video 工具
      {
        id: 12,
        name: "Veo3",
        type: "video",
        description: "Google\u7684AI\u89C6\u9891\u751F\u6210\u5DE5\u5177",
        icon: "/tools-logo/Veo.png",
        rating: 4.8,
        usageCount: 890
      },
      {
        id: 13,
        name: "Runway",
        type: "video",
        description: "AI\u89C6\u9891\u7F16\u8F91\u5DE5\u5177",
        icon: "/tools-logo/Runway.png",
        rating: 4.7,
        usageCount: 720
      },
      {
        id: 14,
        name: "Luma",
        type: "video",
        description: "3D\u89C6\u9891\u751F\u6210\u5DE5\u5177",
        icon: "/tools-logo/Luma.png",
        rating: 4.6,
        usageCount: 650
      },
      {
        id: 16,
        name: "Sora",
        type: "video",
        description: "Sora 2 \u89C6\u9891\u751F\u6210\uFF08Text-to-Video / Image-to-Video\uFF09",
        icon: "/tools-logo/Veo.png",
        rating: 4.7,
        usageCount: 0
      },
      {
        id: 17,
        name: "Wan",
        type: "video",
        description: "Wan AI \u89C6\u9891\uFF1A\u6587\u751F\u89C6\u9891\u3001\u56FE\u751F\u89C6\u9891\u3001\u89C6\u9891\u751F\u89C6\u9891",
        icon: "/tools-logo/Wan.png",
        rating: 4.6,
        usageCount: 0
      },
      {
        id: 18,
        name: "Seedance",
        type: "video",
        description: "Seedance v1 Lite & Pro\uFF1A\u6587\u751F\u89C6\u9891\u3001\u56FE\u751F\u89C6\u9891",
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
        description: "Seedream 5 Lite\uFF1A\u6587\u751F\u56FE\u3001\u56FE\u751F\u56FE",
        icon: "/tools-logo/Seedream.png",
        rating: 4.6,
        usageCount: 0
      },
      {
        id: 20,
        name: "Qwen",
        type: "image",
        description: "Qwen \u56FE\u50CF\uFF1A\u6587\u751F\u56FE\u3001\u56FE\u751F\u56FE\u3001\u56FE\u50CF\u7F16\u8F91\u3001Z-Image",
        icon: "/tools-logo/QWen.png",
        rating: 4.6,
        usageCount: 0
      },
      {
        id: 23,
        name: "Imagen4",
        type: "image",
        description: "Imagen4\uFF1AGenerate\u3001Fast\u3001Ultra",
        icon: "/tools-logo/Imagen4.png",
        rating: 4.6,
        usageCount: 0
      },
      {
        id: 15,
        name: "Midjourney",
        type: "image",
        description: "AI\u56FE\u50CF\u751F\u6210\u5E73\u53F0",
        icon: "/tools-logo/Midjourney.png",
        rating: 4.8,
        usageCount: 1200
      }
    ]);
    const formatTime = (timestamp) => {
      const now = /* @__PURE__ */ new Date();
      const diff = now - timestamp;
      const minutes = Math.floor(diff / 6e4);
      const hours = Math.floor(diff / 36e5);
      const days = Math.floor(diff / 864e5);
      if (days > 0) return `${days}\u5929\u524D`;
      if (hours > 0) return `${hours}\u5C0F\u65F6\u524D`;
      if (minutes > 0) return `${minutes}\u5206\u949F\u524D`;
      return "\u521A\u521A";
    };
    const getTypeLabel = (type) => {
      const typeLabels = {
        chat: "\u5BF9\u8BDD",
        image: "\u56FE\u50CF",
        audio: "\u97F3\u9891",
        video: "\u89C6\u9891"
      };
      return typeLabels[type] || type;
    };
    const addToUsageHistory = (toolName) => {
      const tool = allTools.value.find((t) => t.name === toolName);
      if (tool) {
        const getToolIcon = (type) => {
          const icons = {
            chat: "fas fa-comments",
            image: "fas fa-image",
            audio: "fas fa-microphone",
            video: "fas fa-video"
          };
          return icons[type] || "fas fa-robot";
        };
        const newRecord = {
          id: Date.now(),
          toolName: tool.name,
          type: tool.type,
          timestamp: /* @__PURE__ */ new Date(),
          duration: "0\u5206\u949F",
          status: "in_progress",
          icon: getToolIcon(tool.type),
          description: `${getTypeLabel(tool.type)}\u5904\u7406 - \u6B63\u5728\u4F7F\u7528${tool.name}`
        };
        usageHistory.value.unshift(newRecord);
        syncChatMessagesHeight();
        setTimeout(() => {
          const record = usageHistory.value.find((r) => r.id === newRecord.id);
          if (record) {
            record.status = "completed";
            record.duration = "3\u5206\u949F";
            record.description = `${getTypeLabel(tool.type)}\u5B8C\u6210 - \u4F7F\u7528${tool.name}\u5904\u7406\u4EFB\u52A1`;
          }
          syncChatMessagesHeight();
        }, 3e3);
        tool.usageCount++;
      }
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
    const isChatTool = () => {
      const tool = getSelectedToolInfo();
      const chatToolNames = ["GPT", "Deepseek", "Claude", "Gemini"];
      return chatToolNames.includes(tool.name);
    };
    const syncChatMessagesHeight = () => {
      nextTick(() => {
        const timelineContainer = (void 0).querySelector(".timeline-container");
        const chatMessages2 = (void 0).querySelector(".chat-messages");
        if (timelineContainer && chatMessages2) {
          const timelineHeight = timelineContainer.offsetHeight;
          chatMessages2.style.maxHeight = `${timelineHeight}px`;
        }
      });
    };
    const loadHistoryData = () => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newData = allHistoryData.slice(startIndex, endIndex);
      if (currentPage.value === 1) {
        usageHistory.value = newData;
      } else {
        usageHistory.value.push(...newData);
      }
    };
    const hasMoreData = computed(() => {
      return currentPage.value * itemsPerPage < allHistoryData.length;
    });
    loadHistoryData();
    watch(() => route.path, (newPath) => {
      if (newPath === "/home") {
        router.replace("/home/gpt/generate");
        return;
      }
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
        // Chat tools
        "/home/gpt": "GPT",
        "/home/gpt/generate": "GPT",
        "/home/deepseek": "Deepseek",
        "/home/deepseek/generate": "Deepseek",
        "/home/claude": "Claude",
        "/home/claude/generate": "Claude",
        "/home/gemini": "Gemini",
        "/home/gemini/generate": "Gemini"
      };
      const toolName = routeToToolMap[newPath];
      if (toolName) {
        const tool = allTools.value.find((t) => t.name === toolName);
        if (tool) {
          selectedTool.value = tool.id;
          const toolType = tool.type;
          const navItem = navItems.value.find((nav) => nav.type === toolType);
          if (navItem) {
            selectedCategory.value = navItem.id;
          }
        }
      }
      syncChatMessagesHeight();
    }, { immediate: true });
    provide("addToUsageHistory", addToUsageHistory);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))} data-v-144117fc><div class="main-layout" data-v-144117fc><aside class="left-sidebar" data-v-144117fc><div class="timeline-header" data-v-144117fc><h3 data-v-144117fc>History</h3></div><div class="timeline-container" data-v-144117fc><div class="timeline-items" data-v-144117fc><!--[-->`);
      ssrRenderList(unref(usageHistory), (record, index2) => {
        _push(`<div class="timeline-item" data-v-144117fc><div class="${ssrRenderClass([[record.status, record.type], "timeline-marker"])}" data-v-144117fc><i class="${ssrRenderClass(record.icon)}" data-v-144117fc></i></div><div class="timeline-content" data-v-144117fc><div class="timeline-header" data-v-144117fc><div class="timeline-tool" data-v-144117fc>${ssrInterpolate(record.toolName)}</div></div><div class="timeline-description" data-v-144117fc>${ssrInterpolate(record.description)}</div><div class="timeline-meta" data-v-144117fc><div class="timeline-time" data-v-144117fc>${ssrInterpolate(formatTime(record.timestamp))}</div><div class="timeline-duration" data-v-144117fc>${ssrInterpolate(record.duration)}</div></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(hasMoreData)) {
        _push(`<div class="load-more-container" data-v-144117fc><button class="load-more-btn"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-144117fc>`);
        if (unref(isLoading)) {
          _push(`<i class="fas fa-spinner fa-spin" data-v-144117fc></i>`);
        } else {
          _push(`<i class="fas fa-plus" data-v-144117fc></i>`);
        }
        _push(` ${ssrInterpolate(unref(isLoading) ? "\u52A0\u8F7D\u4E2D..." : "\u52A0\u8F7D\u66F4\u591A")}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(usageHistory).length === 0) {
        _push(`<div class="empty-timeline" data-v-144117fc><i class="fas fa-history" data-v-144117fc></i><p data-v-144117fc>\u6682\u65E0\u4F7F\u7528\u8BB0\u5F55</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></aside><main class="right-main" data-v-144117fc><header class="tools-navigation" data-v-144117fc><div class="nav-tabs" data-v-144117fc><!--[-->`);
      ssrRenderList(unref(navItems), (navItem) => {
        _push(`<div class="${ssrRenderClass([{ active: unref(selectedCategory) === navItem.id }, "nav-tab"])}" data-v-144117fc><i class="${ssrRenderClass(navItem.icon)}" data-v-144117fc></i><span data-v-144117fc>${ssrInterpolate(navItem.name)}</span><span class="tool-count" data-v-144117fc>${ssrInterpolate(getToolCount(navItem.type))}</span></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(selectedCategory)) {
        _push(`<div class="sub-nav" data-v-144117fc><!--[-->`);
        ssrRenderList(getCurrentTools(), (subTool) => {
          _push(`<!--[-->`);
          if (toolRouteMap[subTool.name]) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: toolRouteMap[subTool.name],
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
            _push(`<div class="${ssrRenderClass([{ active: unref(selectedTool) === subTool.id }, "sub-nav-item"])}" data-v-144117fc>${ssrInterpolate(subTool.name)}</div>`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header><section class="tool-interface" data-v-144117fc>`);
      if (getSelectedToolInfo().name === "Veo3") {
        _push(ssrRenderComponent(Veo3Tool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "Runway") {
        _push(ssrRenderComponent(RunwayTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "Luma") {
        _push(ssrRenderComponent(LumaTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "Midjourney") {
        _push(ssrRenderComponent(MidjourneyTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "GPT 4o Image") {
        _push(ssrRenderComponent(GPT4oImageTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "GPT Image") {
        _push(ssrRenderComponent(GPTImageTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "Ideogram") {
        _push(ssrRenderComponent(IdeogramTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "Flux Kontext") {
        _push(ssrRenderComponent(FluxKontextTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "Nano Banana") {
        _push(ssrRenderComponent(NanoBananaTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "Elevenlabs") {
        _push(ssrRenderComponent(ElevenLabsTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "Suno") {
        _push(ssrRenderComponent(SunoTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "Sora") {
        _push(ssrRenderComponent(SoraTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "Wan") {
        _push(ssrRenderComponent(WanTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "Seedance") {
        _push(ssrRenderComponent(SeedanceTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "Hailuo") {
        _push(ssrRenderComponent(HailuoTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "Kling") {
        _push(ssrRenderComponent(KlingTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "Seedream") {
        _push(ssrRenderComponent(SeedreamTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "Qwen") {
        _push(ssrRenderComponent(QwenTool, null, null, _parent));
      } else if (getSelectedToolInfo().name === "Imagen4") {
        _push(ssrRenderComponent(Imagen4Tool, null, null, _parent));
      } else {
        _push(`<div class="chat-interface" data-v-144117fc><div class="chat-header" data-v-144117fc><div class="chat-tool-info" data-v-144117fc><div class="tool-avatar" data-v-144117fc><img${ssrRenderAttr("src", getSelectedToolInfo().icon)}${ssrRenderAttr("alt", getSelectedToolInfo().name)} data-v-144117fc></div><div class="tool-details" data-v-144117fc><h3 data-v-144117fc>${ssrInterpolate(getSelectedToolInfo().name)}</h3><p data-v-144117fc>${ssrInterpolate(getSelectedToolInfo().description)}</p></div></div></div><div class="chat-messages" data-v-144117fc><!--[-->`);
        ssrRenderList(unref(chatMessages), (message) => {
          _push(`<div class="${ssrRenderClass([message.role, "message"])}" data-v-144117fc><div class="message-avatar" data-v-144117fc>`);
          if (message.role === "user") {
            _push(`<img src="https://via.placeholder.com/32x32/667eea/ffffff?text=U" alt="User" data-v-144117fc>`);
          } else {
            _push(`<img${ssrRenderAttr("src", getSelectedToolInfo().icon)}${ssrRenderAttr("alt", getSelectedToolInfo().name)} data-v-144117fc>`);
          }
          _push(`</div><div class="message-content" data-v-144117fc><div class="message-text" data-v-144117fc>${ssrInterpolate(message.text)}</div><div class="message-time" data-v-144117fc>${ssrInterpolate(formatTime(message.timestamp))}</div></div></div>`);
        });
        _push(`<!--]--></div><div class="chat-input" data-v-144117fc>`);
        if (isChatTool()) {
          _push(`<div class="input-actions" data-v-144117fc><button class="action-btn" title="Upload File" data-v-144117fc><i class="fas fa-paperclip" data-v-144117fc></i></button><button class="${ssrRenderClass([{ active: unref(isWebSearchEnabled) }, "action-btn"])}" title="Web Search" data-v-144117fc><i class="fas fa-globe" data-v-144117fc></i></button>`);
          if (unref(uploadedFiles).length > 0) {
            _push(`<div class="uploaded-files" data-v-144117fc><!--[-->`);
            ssrRenderList(unref(uploadedFiles), (file, index2) => {
              _push(`<div class="file-item" data-v-144117fc><span class="file-name" data-v-144117fc>${ssrInterpolate(file.name)}</span><button class="file-delete-btn" title="Delete File" data-v-144117fc><i class="fas fa-times" data-v-144117fc></i></button></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="input-container" data-v-144117fc><textarea placeholder="Enter your question or request..." rows="3" data-v-144117fc>${ssrInterpolate(unref(inputMessage))}</textarea><button class="send-btn"${ssrIncludeBooleanAttr(!unref(inputMessage).trim()) ? " disabled" : ""} data-v-144117fc><i class="fas fa-paper-plane" data-v-144117fc></i></button></div></div></div>`);
      }
      _push(`</section></main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-144117fc"]]);

export { index as default };
//# sourceMappingURL=index--qumzRQj.mjs.map
