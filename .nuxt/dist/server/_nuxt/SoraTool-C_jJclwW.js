import { reactive, ref, computed, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderComponent, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { useRoute, useRouter } from "vue-router";
import { U as UploadImage } from "./UploadImage-a1UOMv8U.js";
import { u as useAuth } from "./useAuth-ComhLj5o.js";
import { u as useToast } from "./useToast-CATlmXE8.js";
import { u as useModelPrice } from "./useModelPrice-BZpig2xf.js";
import { _ as _export_sfc } from "../server.mjs";
const _imports_0 = publicAssetsURL("/tools-logo/sora.png");
const _sfc_main = {
  __name: "SoraTool",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    useAuth();
    const { showError } = useToast();
    const { getPrice, formatCredits } = useModelPrice();
    const getAuthToken = () => {
      return null;
    };
    const uploadFilesToUrls = async (files) => {
      var _a, _b, _c;
      if (!files || (Array.isArray(files) ? files.length === 0 : !files)) return [];
      const list = Array.isArray(files) ? files : [files];
      const formDataUpload = new FormData();
      list.forEach((f) => formDataUpload.append("file", f));
      const headers = { Accept: "application/json" };
      const authToken = getAuthToken();
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
      const response = await fetch("/api/common/batch-upload", {
        method: "POST",
        headers,
        body: formDataUpload,
        credentials: "include"
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const msg = typeof (errorData == null ? void 0 : errorData.errorMessage) === "string" && ((_a = errorData.errorMessage) == null ? void 0 : _a.trim()) ? errorData.errorMessage.trim() : typeof (errorData == null ? void 0 : errorData.message) === "string" && ((_b = errorData.message) == null ? void 0 : _b.trim()) ? errorData.message.trim() : (errorData == null ? void 0 : errorData.userTip) || (errorData == null ? void 0 : errorData.error) || (errorData == null ? void 0 : errorData.message) || "Upload failed";
        throw new Error(msg);
      }
      const data = await response.json();
      const urls = ((_c = data == null ? void 0 : data.data) == null ? void 0 : _c.urls) || (data == null ? void 0 : data.fileUrls) || (Array.isArray(data == null ? void 0 : data.data) ? data.data : []);
      if (!Array.isArray(urls)) throw new Error("Invalid response: file URLs not found");
      return urls;
    };
    const form = reactive({
      model: "text-to-video",
      callBackUrl: "",
      input: {
        prompt: "",
        aspect_ratio: "portrait",
        n_frames: "10",
        remove_watermark: false,
        image_urls: [],
        size: "standard",
        video_url: ""
      }
    });
    const imageUploadRef = ref(null);
    ref("");
    const videoList = ref([]);
    const isLoadingVideoList = ref(false);
    const isUploadingImages = ref(false);
    const scenes = ref([{ id: Date.now(), scene: "", duration: "7.5" }]);
    const totalSceneDuration = computed(() => scenes.value.reduce((sum, s) => sum + (parseFloat(s.duration) || 0), 0));
    const framesSeconds = computed(() => Number(form.input.n_frames || 0));
    const remainingDuration = computed(() => {
      const rem = framesSeconds.value - totalSceneDuration.value;
      return rem > 0 ? rem : 0;
    });
    const isGenerating = ref(false);
    let results = ref([]);
    ref("");
    const soraPriceText = computed(() => {
      const model = form.model;
      const duration = Number(form.input.n_frames) || 10;
      let credits = null;
      if (model === "watermark-remover") {
        credits = getPrice("sora-watermark-remover");
      } else if (model === "pro-storyboard") {
        credits = getPrice("sora-2-pro-storyboard", { duration, scene: "generate" });
      } else if (model === "text-to-video") {
        credits = getPrice("sora-2-text-to-video");
      } else if (model === "image-to-video") {
        credits = getPrice("sora-2-image-to-video");
      } else if (model === "pro-text-to-video") {
        credits = getPrice("sora-2-pro-text-to-video", {
          duration,
          size: form.input.size || "standard"
        });
      } else if (model === "pro-image-to-video") {
        credits = getPrice("sora-2-pro-image-to-video", {
          duration,
          size: form.input.size || "standard"
        });
      }
      const str = formatCredits(credits);
      return str ? `(${str})` : "";
    });
    const handleSoraImagesUpdate = async (files) => {
      var _a, _b;
      if (!files || Array.isArray(files) && files.length === 0) {
        form.input.image_urls = [];
        return;
      }
      const list = Array.isArray(files) ? files : [files];
      isUploadingImages.value = true;
      try {
        form.input.image_urls = await uploadFilesToUrls(list);
      } catch (e) {
        showError(e.message || "Failed to upload images");
        form.input.image_urls = [];
        (_b = (_a = imageUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingImages.value = false;
      }
    };
    const soraPathToMode = {
      "/home/sora/text-to-video": "text-to-video",
      "/home/sora/image-to-video": "image-to-video",
      "/home/sora/pro-text-to-video": "pro-text-to-video",
      "/home/sora/pro-image-to-video": "pro-image-to-video",
      "/home/sora/watermark-remover": "watermark-remover",
      "/home/sora/pro-storyboard": "pro-storyboard"
    };
    watch(() => route.path, (path) => {
      const mode = soraPathToMode[path];
      if (mode && form.model !== mode) form.model = mode;
    }, { immediate: true });
    const fetchVideoList = async () => {
      if (isLoadingVideoList.value) return;
      isLoadingVideoList.value = true;
      try {
        const response = await fetch("/api/sora/video-list");
        if (response.ok) {
          const data = await response.json();
          videoList.value = Array.isArray(data) ? data : data.list || data.videos || [];
        } else {
          console.error("Failed to fetch video list");
          videoList.value = [];
        }
      } catch (error) {
        console.error("Error fetching video list:", error);
        videoList.value = [];
      } finally {
        isLoadingVideoList.value = false;
      }
    };
    watch(() => form.model, (newModel) => {
      if (newModel === "watermark-remover" && videoList.value.length === 0) {
        fetchVideoList();
      }
    }, { immediate: true });
    const canSubmit = computed(() => {
      if (form.model === "watermark-remover") {
        return !!form.input.video_url && form.input.video_url.trim() !== "";
      }
      if (form.model === "pro-storyboard") {
        if (!form.input.n_frames) return false;
        if (!Array.isArray(scenes.value) || scenes.value.length === 0) return false;
        const diff = framesSeconds.value - totalSceneDuration.value;
        return Math.abs(diff) < 0.01;
      }
      if (!form.input.prompt.trim()) return false;
      if (["image-to-video", "pro-image-to-video"].includes(form.model)) {
        return Array.isArray(form.input.image_urls) && form.input.image_urls.length > 0;
      }
      return true;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sora-tool" }, _attrs))} data-v-596c9a1a><div class="tool-header" data-v-596c9a1a><div class="tool-avatar" data-v-596c9a1a><img${ssrRenderAttr("src", _imports_0)} alt="Sora" data-v-596c9a1a></div><div class="tool-details" data-v-596c9a1a><h3 data-v-596c9a1a>Sora</h3><p data-v-596c9a1a>Sora 2 is OpenAI’s latest AI video generation model, supporting both text-to-video and image-to-video. It delivers realistic motion, physics consistency, with improved control over style, scene, and aspect ratio—ideal for creative apps and social media content.</p></div></div><div class="mode-tabs" data-v-596c9a1a><div class="${ssrRenderClass([{ active: form.model === "text-to-video" }, "mode-tab"])}" data-v-596c9a1a><i class="fas fa-keyboard" data-v-596c9a1a></i><span data-v-596c9a1a>text-to-video</span></div><div class="${ssrRenderClass([{ active: form.model === "image-to-video" }, "mode-tab"])}" data-v-596c9a1a><i class="fas fa-image" data-v-596c9a1a></i><span data-v-596c9a1a>image-to-video</span></div><div class="${ssrRenderClass([{ active: form.model === "pro-text-to-video" }, "mode-tab"])}" data-v-596c9a1a><i class="fas fa-magic" data-v-596c9a1a></i><span data-v-596c9a1a>pro-text-to-video</span></div><div class="${ssrRenderClass([{ active: form.model === "pro-image-to-video" }, "mode-tab"])}" data-v-596c9a1a><i class="fas fa-wand-magic-sparkles" data-v-596c9a1a></i><span data-v-596c9a1a>pro-image-to-video</span></div><div class="${ssrRenderClass([{ active: form.model === "watermark-remover" }, "mode-tab"])}" data-v-596c9a1a><i class="fas fa-water" data-v-596c9a1a></i><span data-v-596c9a1a>watermark-remover</span></div><div class="${ssrRenderClass([{ active: form.model === "pro-storyboard" }, "mode-tab"])}" data-v-596c9a1a><i class="fas fa-book" data-v-596c9a1a></i><span data-v-596c9a1a>pro-storyboard</span></div></div><div class="main-content" data-v-596c9a1a><div class="config-panel" data-v-596c9a1a><div class="config-header" data-v-596c9a1a><h4 data-v-596c9a1a>Sora Configuration</h4></div><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value) ? " disabled" : ""} data-v-596c9a1a>`);
      if (!["watermark-remover", "pro-storyboard"].includes(form.model)) {
        _push(`<div class="form-group" data-v-596c9a1a><label for="prompt" data-v-596c9a1a>Prompt *</label><textarea id="prompt" rows="5" maxlength="10000" placeholder="The text prompt describing the desired video motion" required data-v-596c9a1a>${ssrInterpolate(form.input.prompt)}</textarea><div class="char-count" data-v-596c9a1a>${ssrInterpolate(form.input.prompt.length)}/10000</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (["image-to-video", "pro-image-to-video", "pro-storyboard"].includes(form.model)) {
        _push(`<div class="form-group" data-v-596c9a1a><label data-v-596c9a1a>Reference Images *</label>`);
        if (isUploadingImages.value) {
          _push(`<span class="form-hint" data-v-596c9a1a>Uploading images...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "imageUploadRef",
          ref: imageUploadRef,
          "input-id": "sora-image-upload",
          label: "",
          "upload-icon": "fas fa-cloud-upload-alt",
          "upload-text": "Click to upload image",
          "upload-hint": "Supports JPG/PNG/WEBP, up to 3 images, max 10MB each",
          "theme-color": "#3b82f6",
          "max-files": 3,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/*",
          multiple: true,
          "onUpdate:files": handleSoraImagesUpdate
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (form.model !== "watermark-remover") {
        _push(`<div class="form-group" data-v-596c9a1a><label data-v-596c9a1a>Aspect Ratio</label><div class="tab-group" data-v-596c9a1a><div class="tab-options" data-v-596c9a1a><button type="button" class="${ssrRenderClass([{ active: form.input.aspect_ratio === "portrait" }, "tab-option"])}" data-v-596c9a1a> portrait </button><button type="button" class="${ssrRenderClass([{ active: form.input.aspect_ratio === "landscape" }, "tab-option"])}" data-v-596c9a1a> landscape </button></div></div><div class="form-help" data-v-596c9a1a>Defines the generated video&#39;s aspect ratio.</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (form.model !== "watermark-remover") {
        _push(`<div class="form-group" data-v-596c9a1a><label data-v-596c9a1a>Frames</label><div class="tab-group" data-v-596c9a1a><div class="tab-options" data-v-596c9a1a><button type="button" class="${ssrRenderClass([{ active: form.input.n_frames === "10" }, "tab-option"])}" data-v-596c9a1a> 10s </button><button type="button" class="${ssrRenderClass([{ active: form.input.n_frames === "15" }, "tab-option"])}" data-v-596c9a1a> 15s </button>`);
        if (form.model === "pro-storyboard") {
          _push(`<button type="button" class="${ssrRenderClass([{ active: form.input.n_frames === "25" }, "tab-option"])}" data-v-596c9a1a> 25s </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (form.model === "pro-storyboard") {
          _push(`<div class="form-help" data-v-596c9a1a>Frames is required for storyboard.</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (["pro-text-to-video", "pro-image-to-video"].includes(form.model)) {
        _push(`<div class="form-group" data-v-596c9a1a><label data-v-596c9a1a>Size</label><div class="tab-group" data-v-596c9a1a><div class="tab-options" data-v-596c9a1a><button type="button" class="${ssrRenderClass([{ active: form.input.size === "standard" }, "tab-option"])}" data-v-596c9a1a> standard </button><button type="button" class="${ssrRenderClass([{ active: form.input.size === "high" }, "tab-option"])}" data-v-596c9a1a> high </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!["watermark-remover", "pro-storyboard"].includes(form.model)) {
        _push(`<div class="form-group" data-v-596c9a1a><label data-v-596c9a1a>Remove Watermark</label><div class="tab-group" data-v-596c9a1a><div class="tab-options" data-v-596c9a1a><button type="button" class="${ssrRenderClass([{ active: form.input.remove_watermark === true }, "tab-option"])}" data-v-596c9a1a><i class="fas fa-check" data-v-596c9a1a></i> true </button><button type="button" class="${ssrRenderClass([{ active: form.input.remove_watermark === false }, "tab-option"])}" data-v-596c9a1a><i class="fas fa-times" data-v-596c9a1a></i> false </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (form.model === "watermark-remover") {
        _push(`<div class="form-group" data-v-596c9a1a><label class="form-label" data-v-596c9a1a>Video Url <span class="required" data-v-596c9a1a>*</span></label><div class="select-wrapper" data-v-596c9a1a><select class="form-select"${ssrIncludeBooleanAttr(isLoadingVideoList.value) ? " disabled" : ""} data-v-596c9a1a><option value="" data-v-596c9a1a${ssrIncludeBooleanAttr(Array.isArray(form.input.video_url) ? ssrLooseContain(form.input.video_url, "") : ssrLooseEqual(form.input.video_url, "")) ? " selected" : ""}>Please select a video</option><!--[-->`);
        ssrRenderList(videoList.value, (video) => {
          _push(`<option${ssrRenderAttr("value", video.value || video.url || video.id)} data-v-596c9a1a${ssrIncludeBooleanAttr(Array.isArray(form.input.video_url) ? ssrLooseContain(form.input.video_url, video.value || video.url || video.id) : ssrLooseEqual(form.input.video_url, video.value || video.url || video.id)) ? " selected" : ""}>${ssrInterpolate(video.label || video.name || video.title || video.url)}</option>`);
        });
        _push(`<!--]--></select><i class="fas fa-chevron-down" data-v-596c9a1a></i></div><div class="form-help" data-v-596c9a1a>Select a video URL from the list</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (form.model === "pro-storyboard") {
        _push(`<div class="form-group" data-v-596c9a1a><label data-v-596c9a1a>shots (Total Duration: ${ssrInterpolate(form.input.n_frames || "?")}s)</label><div class="shots-list" data-v-596c9a1a><!--[-->`);
        ssrRenderList(scenes.value, (shot, idx) => {
          _push(`<div class="shot-card" data-v-596c9a1a><div class="shot-title" data-v-596c9a1a>Scene ${ssrInterpolate(idx + 1)}</div><textarea class="shot-text" rows="3"${ssrRenderAttr("placeholder", `Describe this scene... who, where, what happens?`)} data-v-596c9a1a>${ssrInterpolate(shot.scene)}</textarea><div class="shot-footer" data-v-596c9a1a><div class="duration-input" data-v-596c9a1a><input class="duration-field" type="text"${ssrRenderAttr("value", shot.duration)} data-v-596c9a1a><span class="duration-s" data-v-596c9a1a>s</span></div>`);
          if (scenes.value.length > 1) {
            _push(`<button type="button" class="shot-delete" title="Delete scene" data-v-596c9a1a><i class="fas fa-trash" data-v-596c9a1a></i></button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--><button type="button" class="add-shot" data-v-596c9a1a><i class="fas fa-plus" data-v-596c9a1a></i> Add Scene </button></div>`);
        if (form.input.n_frames && totalSceneDuration.value > Number(form.input.n_frames)) {
          _push(`<div class="duration-warning error" data-v-596c9a1a><i class="fas fa-exclamation-triangle" data-v-596c9a1a></i> Total scene duration exceeds maximum limit, please adjust each scene duration </div>`);
        } else if (form.input.n_frames && remainingDuration.value > 0) {
          _push(`<div class="duration-warning info" data-v-596c9a1a><i class="fas fa-exclamation-triangle" data-v-596c9a1a></i> Please allocate all remaining duration (${ssrInterpolate(remainingDuration.value.toFixed(2))}s) to scenes before generating </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="form-help" data-v-596c9a1a>Add one or more scenes. Each scene includes a textual description and its duration in seconds.</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-actions" data-v-596c9a1a><button class="btn-primary"${ssrIncludeBooleanAttr(!canSubmit.value || isGenerating.value) ? " disabled" : ""} data-v-596c9a1a>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-596c9a1a></i>`);
      } else {
        _push(`<i class="fas fa-play" data-v-596c9a1a></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Submitting..." : "Start Generation")} `);
      if (soraPriceText.value) {
        _push(`<span class="price-tag" data-v-596c9a1a>${ssrInterpolate(soraPriceText.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></fieldset></div><div class="result-panel" data-v-596c9a1a><div class="video-header" data-v-596c9a1a><h4 data-v-596c9a1a>Result Preview</h4>`);
      if (unref(results).length > 0) {
        _push(`<div class="video-actions" data-v-596c9a1a><button class="btn-secondary" data-v-596c9a1a><i class="fas fa-trash" data-v-596c9a1a></i> Clear </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="video-container" data-v-596c9a1a>`);
      if (unref(results).length > 0) {
        _push(`<div class="video-showcase" data-v-596c9a1a><!--[-->`);
        ssrRenderList(unref(results), (item, idx) => {
          _push(`<div class="video-showcase-item" data-v-596c9a1a><pre class="payload-json" data-v-596c9a1a>${ssrInterpolate(typeof item === "object" ? JSON.stringify(item, null, 2) : item)}</pre></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty-state" data-v-596c9a1a><div class="empty-icon" data-v-596c9a1a><i class="fas fa-film" data-v-596c9a1a></i></div><h3 data-v-596c9a1a>Waiting for Generation</h3><p data-v-596c9a1a>Configure parameters, then click Start Generation.</p></div>`);
      }
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/SoraTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SoraTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-596c9a1a"]]);
export {
  SoraTool as S
};
//# sourceMappingURL=SoraTool-C_jJclwW.js.map
