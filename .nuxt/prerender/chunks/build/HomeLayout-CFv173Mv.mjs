import { _ as __nuxt_component_0$1 } from './nuxt-link-BgkIFP7n.mjs';
import { ref, computed, provide, mergeProps, unref, withCtx, createTextVNode, toDisplayString, watch, createVNode, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderSlot } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './server.mjs';
import { useRouter, useRoute } from 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';

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
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: "breadcrumb",
        "aria-label": "Breadcrumb"
      }, _attrs))} data-v-9eca26d6><ol class="breadcrumb-list" data-v-9eca26d6><li class="breadcrumb-item" data-v-9eca26d6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "breadcrumb-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fas fa-home" data-v-9eca26d6${_scopeId}></i><span data-v-9eca26d6${_scopeId}>Home</span>`);
          } else {
            return [
              createVNode("i", { class: "fas fa-home" }),
              createVNode("span", null, "Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item" aria-current="page" data-v-9eca26d6><span class="breadcrumb-current" data-v-9eca26d6>${ssrInterpolate(__props.currentPage)}</span></li></ol></nav>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Breadcrumb.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-9eca26d6"]]);
const useHomeLayout = () => {
  const router = useRouter();
  const route = useRoute();
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
    "Flux Kontext": "/home/flux-kontext/generate",
    "Nano Banana": "/home/nano-banana/generate",
    "Suno": "/home/suno/generate",
    "Elevenlabs": "/home/elevenlabs/multilingual-v2",
    "ElevenLabs": "/home/elevenlabs/multilingual-v2",
    "Sora": "/home/sora/text-to-video"
  };
  const toolRouteMap = {
    "Veo3": "/home/veo3/text-to-video",
    "Runway": "/home/runway/generate",
    "Luma": "/home/luma/generate",
    "Midjourney": "/home/midjourney/imagine",
    "GPT 4o Image": "/home/gpt-4o-image/generate",
    "Flux Kontext": "/home/flux-kontext/generate",
    "Nano Banana": "/home/nano-banana/generate",
    "Elevenlabs": "/home/elevenlabs/multilingual-v2",
    "Suno": "/home/suno/generate",
    "Sora": "/home/sora/text-to-video",
    // Chat tools
    "GPT": "/home/gpt/generate",
    "Deepseek": "/home/deepseek/generate",
    "Claude": "/home/claude/generate",
    "Gemini": "/home/gemini/generate"
  };
  const selectedCategory = ref(1);
  const selectedTool = ref(1);
  const currentPage = ref(1);
  const isLoading = ref(false);
  const historyHasMore = ref(true);
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
      description: "OpenAI conversational AI assistant",
      icon: "/tools-logo/ChatGpt.png",
      rating: 4.9,
      usageCount: 1250
    },
    {
      id: 2,
      name: "Deepseek",
      type: "chat",
      description: "DeepSeek AI assistant",
      icon: "/tools-logo/Deepseek.png",
      rating: 4.8,
      usageCount: 890
    },
    {
      id: 3,
      name: "Claude",
      type: "chat",
      description: "Anthropic AI assistant",
      icon: "/tools-logo/Claude.png",
      rating: 4.8,
      usageCount: 980
    },
    {
      id: 4,
      name: "Gemini",
      type: "chat",
      description: "Google AI assistant",
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
      icon: "/tools-logo/ChatGpt.png",
      rating: 4.7,
      usageCount: 750
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
      id: 16,
      name: "Sora",
      type: "video",
      description: "Sora 2 \u89C6\u9891\u751F\u6210\uFF08Text-to-Video / Image-to-Video\uFF09",
      icon: "/tools-logo/Veo.png",
      rating: 4.7,
      usageCount: 0
    }
  ]);
  const usageHistory = ref([]);
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
    // ElevenLabs（三级路由）
    elevenlabs_text_to_speech_multilingual: "/home/elevenlabs/multilingual-v2",
    elevenlabs_text_to_speech_turbo: "/home/elevenlabs/turbo-2-5",
    elevenlabs_speech_to_text: "/home/elevenlabs/speech-to-text",
    elevenlabs_sound_effect: "/home/elevenlabs/sound-effect-v2",
    elevenlabs_audio_isolation: "/home/elevenlabs/audio-isolation"
  };
  const getHistoryItemRoute = (record) => {
    const category = (record.category || record.toolName || "").trim();
    const model = (record.model || "").trim().toLowerCase();
    let path = model && modelToPath[model] ? modelToPath[model] : categoryToRoute[category] || categoryToRoute[record.model] || null;
    if (!path) {
      if (model.startsWith("midjourney_")) path = "/home/midjourney/imagine";
      else if (model.startsWith("elevenlabs_")) path = "/home/elevenlabs/multilingual-v2";
      else if (model.startsWith("veo3") || model.includes("_2_video") || model === "video_extend") path = "/home/veo3/text-to-video";
      else if (model.startsWith("sora")) path = "/home/sora/text-to-video";
      else path = categoryToRoute[category] || null;
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
  const loadHistoryData = async () => {
    return;
  };
  const loadMore = async () => {
    if (isLoading.value || !historyHasMore.value) return;
    currentPage.value++;
    await loadHistoryData();
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
      "/home/flux-kontext": "Flux Kontext",
      "/home/flux-kontext/generate": "Flux Kontext",
      "/home/nano-banana": "Nano Banana",
      "/home/nano-banana/generate": "Nano Banana",
      "/home/nano-banana/edit": "Nano Banana",
      "/home/nano-banana/pro-generate": "Nano Banana",
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
      const newRecord = {
        id: Date.now(),
        toolName: tool.name,
        type: tool.type,
        timestamp: /* @__PURE__ */ new Date(),
        duration: "0 minutes",
        status: "in_progress",
        icon: getToolIcon(tool.type),
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
    addToUsageHistory,
    getHistoryItemRoute,
    navigateToHistoryItem
  };
};
const _sfc_main = {
  __name: "HomeLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const {
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
    provide("addToUsageHistory", addToUsageHistory);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))} data-v-233806e7><div class="main-layout" data-v-233806e7><aside class="left-sidebar" data-v-233806e7><div class="timeline-header" data-v-233806e7><h3 data-v-233806e7>History</h3></div><div class="timeline-container" data-v-233806e7><div class="timeline-items" data-v-233806e7><!--[-->`);
      ssrRenderList(unref(usageHistory), (record, index) => {
        _push(`<div class="timeline-item timeline-item-clickable" data-v-233806e7><div class="${ssrRenderClass([[record.status, record.type], "timeline-marker"])}" data-v-233806e7><i class="${ssrRenderClass(record.icon)}" data-v-233806e7></i></div><div class="timeline-content" data-v-233806e7><div class="timeline-header" data-v-233806e7><div class="timeline-tool" data-v-233806e7>${ssrInterpolate(record.toolName || record.category)}</div></div><div class="timeline-description" data-v-233806e7>${ssrInterpolate(record.description || record.title)}</div>`);
        if (record.model) {
          _push(`<div class="timeline-meta" data-v-233806e7><span class="timeline-model" data-v-233806e7>${ssrInterpolate(record.model)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="timeline-meta" data-v-233806e7><div class="timeline-time" data-v-233806e7>${ssrInterpolate(unref(formatTime)(record.timestamp))}</div></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(usageHistory).length > 0) {
        _push(`<div class="load-more-container" data-v-233806e7>`);
        if (unref(hasMoreData)) {
          _push(`<button class="load-more-btn"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-233806e7>`);
          if (unref(isLoading)) {
            _push(`<i class="fas fa-spinner fa-spin" data-v-233806e7></i>`);
          } else {
            _push(`<i class="fas fa-plus" data-v-233806e7></i>`);
          }
          _push(` ${ssrInterpolate(unref(isLoading) ? "Loading..." : "Load More")}</button>`);
        } else {
          _push(`<div class="no-more-hint" data-v-233806e7>No more</div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(usageHistory).length === 0) {
        _push(`<div class="empty-timeline" data-v-233806e7>`);
        if (unref(isLoading)) {
          _push(`<i class="fas fa-spinner fa-spin" data-v-233806e7></i>`);
        } else {
          _push(`<i class="fas fa-history" data-v-233806e7></i>`);
        }
        _push(`<p data-v-233806e7>${ssrInterpolate(unref(isLoading) ? "Loading..." : "No usage records")}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></aside><main class="right-main" data-v-233806e7><header class="tools-navigation" data-v-233806e7><div class="nav-tabs" data-v-233806e7><!--[-->`);
      ssrRenderList(unref(navItems), (navItem) => {
        _push(`<div class="${ssrRenderClass([{ active: unref(selectedCategory) === navItem.id }, "nav-tab"])}" data-v-233806e7><i class="${ssrRenderClass(navItem.icon)}" data-v-233806e7></i><span data-v-233806e7>${ssrInterpolate(navItem.name)}</span><span class="tool-count" data-v-233806e7>${ssrInterpolate(unref(getToolCount)(navItem.type))}</span></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(selectedCategory)) {
        _push(`<div class="sub-nav" data-v-233806e7><!--[-->`);
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
            _push(`<div class="${ssrRenderClass([{ active: unref(selectedTool) === subTool.id }, "sub-nav-item"])}" data-v-233806e7>${ssrInterpolate(subTool.name)}</div>`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header><section class="tool-interface" data-v-233806e7>`);
      if (selectedCategoryName.value && selectedToolName.value) {
        _push(ssrRenderComponent(Breadcrumb, {
          category: selectedCategoryName.value,
          "current-page": selectedToolName.value
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="tool-interface-slot" data-v-233806e7>`);
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
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-233806e7"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=HomeLayout-CFv173Mv.mjs.map
