import { computed, ref, watch, reactive, mergeProps, unref, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { useRoute, useRouter } from 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import { U as UploadImage } from './UploadImage-D6DL1USQ.mjs';
import { u as useAuth } from './useAuth-BT_C6798.mjs';
import { u as useToast } from './useToast-CATlmXE8.mjs';
import { u as useApi } from './useApi-1a9EtG7k.mjs';
import { u as useModelPrice } from './useModelPrice-DCrt0_k3.mjs';
import { u as useRecordPolling } from './useRecordPolling-QI_mIuwF.mjs';
import { u as useBatchUploadUrl } from './useBatchUploadUrl-_AVZ_-oO.mjs';
import { _ as _export_sfc } from './server.mjs';

const _imports_0 = publicAssetsURL("/tools-logo/sora.png");
const _sfc_main = {
  __name: "SoraTool",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    useAuth();
    const { showError } = useToast();
    useApi();
    const { getPrice, formatCredits, discount } = useModelPrice();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const batchUploadUrl = useBatchUploadUrl();
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const loadingRecordId = ref(null);
    function getRouteRecordId() {
      return route.query["record-id"] || "";
    }
    const BACKEND_TO_FRONTEND_MODEL = {
      "sora-watermark-remover": "watermark-remover",
      "sora-2-pro-storyboard": "pro-storyboard",
      "sora-2-text-to-video": "text-to-video",
      "sora-2-image-to-video": "image-to-video",
      "sora-2-pro-text-to-video": "pro-text-to-video",
      "sora-2-pro-image-to-video": "pro-image-to-video"
    };
    const soraModeToPath = {
      "text-to-video": "/home/sora/text-to-video",
      "image-to-video": "/home/sora/image-to-video",
      "pro-text-to-video": "/home/sora/pro-text-to-video",
      "pro-image-to-video": "/home/sora/pro-image-to-video",
      "watermark-remover": "/home/sora/watermark-remover",
      "pro-storyboard": "/home/sora/pro-storyboard"
    };
    const soraPathToMode = {
      "/home/sora/text-to-video": "text-to-video",
      "/home/sora/image-to-video": "image-to-video",
      "/home/sora/pro-text-to-video": "pro-text-to-video",
      "/home/sora/pro-image-to-video": "pro-image-to-video",
      "/home/sora/watermark-remover": "watermark-remover",
      "/home/sora/pro-storyboard": "pro-storyboard"
    };
    function fillFormFromOriginalData(data) {
      var _a, _b, _c;
      const o = (data == null ? void 0 : data.originalData) || data;
      if (!o || typeof o !== "object") return;
      if (o.model && BACKEND_TO_FRONTEND_MODEL[o.model]) form.model = BACKEND_TO_FRONTEND_MODEL[o.model];
      if (o.videoUrl !== void 0) form.input.video_url = o.videoUrl || "";
      if (o.video_url !== void 0) form.input.video_url = o.video_url || form.input.video_url;
      if (o.prompt !== void 0) form.input.prompt = o.prompt || "";
      if (o.aspectRatio !== void 0) form.input.aspect_ratio = o.aspect_ratio || form.input.aspect_ratio;
      if (o.aspect_ratio !== void 0) form.input.aspect_ratio = o.aspect_ratio || form.input.aspect_ratio;
      if (o.nFrames !== void 0) form.input.n_frames = String((_b = (_a = o.nFrames) != null ? _a : o.n_frames) != null ? _b : form.input.n_frames);
      if (o.n_frames !== void 0) form.input.n_frames = String((_c = o.n_frames) != null ? _c : form.input.n_frames);
      if (o.imageUrls && Array.isArray(o.imageUrls)) form.input.image_urls = [...o.imageUrls];
      if (o.image_urls && Array.isArray(o.image_urls)) form.input.image_urls = [...o.image_urls];
      if (o.size !== void 0) form.input.size = o.size || form.input.size;
      if (o.removeWatermark !== void 0) form.input.remove_watermark = !!o.removeWatermark;
      if (o.remove_watermark !== void 0) form.input.remove_watermark = !!o.remove_watermark;
      if (o.callBackUrl !== void 0) form.callBackUrl = o.callBackUrl || "";
      if (o.call_back_url !== void 0) form.callBackUrl = o.call_back_url || form.callBackUrl;
      if (o.shots && Array.isArray(o.shots) && o.shots.length > 0) {
        scenes.value = o.shots.map((s, i) => {
          var _a2;
          return {
            id: Date.now() + i,
            scene: typeof s.scene === "string" ? s.scene : s.text || "",
            duration: String((_a2 = s.duration) != null ? _a2 : 7.5)
          };
        });
      }
    }
    async function loadDetailByRecordId(recordId) {
      if (!recordId) return;
      if (getRouteRecordId() !== recordId) return;
      if (loadingRecordId.value === recordId) return;
      loadingRecordId.value = recordId;
      detailData.value = null;
      try {
        const data = await fetchRecordDetailOnce(recordId);
        if (getRouteRecordId() !== recordId) return;
        detailData.value = data || null;
        if (data == null ? void 0 : data.originalData) {
          fillFormFromOriginalData(data);
          if (form.model && soraModeToPath[form.model] && route.path !== soraModeToPath[form.model]) {
            router.replace({ path: soraModeToPath[form.model], query: { ...route.query } });
          }
        }
        if (data != null && Number(data.status) === 1) {
          pollRecordByStatus(recordId, { getIsCancelled: () => getRouteRecordId() !== recordId }).then((res) => {
            if (getRouteRecordId() !== recordId) return;
            detailData.value = res;
            if (res == null ? void 0 : res.originalData) {
              fillFormFromOriginalData(res);
              if (form.model && soraModeToPath[form.model] && route.path !== soraModeToPath[form.model]) {
                router.replace({ path: soraModeToPath[form.model], query: { ...route.query } });
              }
            }
          }).catch(() => {
          });
        }
      } catch (e) {
        console.error("Load record detail failed:", e);
      } finally {
        if (loadingRecordId.value === recordId) loadingRecordId.value = null;
      }
    }
    watch(() => route.query["record-id"], (recordId) => {
      if (recordId) loadDetailByRecordId(recordId);
      else {
        loadingRecordId.value = null;
        detailData.value = null;
      }
    }, { immediate: true });
    const detailOutputItems = computed(() => {
      if (!detailData.value || detailData.value.status !== 2 || !Array.isArray(detailData.value.outputUrls)) return [];
      return detailData.value.outputUrls.map((u) => typeof u === "string" ? u : u == null ? void 0 : u.url).filter(Boolean).map((url) => ({
        type: url.includes("/image/") ? "image" : url.includes("/video/") ? "video" : "unknown",
        url
      })).filter((item) => item.type !== "unknown");
    });
    const uploadFilesToUrls = async (files) => {
      var _a, _b, _c;
      if (!files || (Array.isArray(files) ? files.length === 0 : !files)) return [];
      const list = Array.isArray(files) ? files : [files];
      const formDataUpload = new FormData();
      list.forEach((f) => formDataUpload.append("file", f));
      const headers = { Accept: "application/json" };
      const response = await fetch(batchUploadUrl, {
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
    ref([]);
    ref(false);
    const isUploadingImages = ref(false);
    ref(null);
    const isUploadingWatermarkVideo = ref(false);
    const watermarkVideoFile = ref(null);
    const scenes = ref([{ id: Date.now(), scene: "", duration: "7.5" }]);
    const totalSceneDuration = computed(() => scenes.value.reduce((sum, s) => sum + (parseFloat(s.duration) || 0), 0));
    const framesSeconds = computed(() => Number(form.input.n_frames || 0));
    const remainingDuration = computed(() => {
      const rem = framesSeconds.value - totalSceneDuration.value;
      return rem > 0 ? rem : 0;
    });
    const isGenerating = ref(false);
    const results = ref([]);
    ref("");
    const discountText = computed(() => {
      var _a;
      const rate = Number((_a = discount == null ? void 0 : discount.value) != null ? _a : 1);
      if (Number.isNaN(rate) || rate <= 0 || rate === 1) return "";
      const percent = (rate * 100).toFixed(0);
      return ` \xB7 ${percent}%`;
    });
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
      if (!str) return "";
      return `\xB7 ${str} credits${discountText.value}`;
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
    const formatFileSize = (bytes) => {
      if (bytes == null || bytes === 0) return "0 B";
      const k = 1024;
      const sizes = ["B", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    watch(() => route.path, (path) => {
      const mode = soraPathToMode[path];
      if (mode && form.model !== mode) form.model = mode;
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sora-tool" }, _attrs))} data-v-357d17d7><div class="tool-header" data-v-357d17d7><div class="tool-avatar" data-v-357d17d7><img${ssrRenderAttr("src", _imports_0)} alt="Sora" data-v-357d17d7></div><div class="tool-details" data-v-357d17d7><h3 data-v-357d17d7>Sora</h3><p data-v-357d17d7>Sora is OpenAI&#39;s latest AI video generation model, supporting both text-to-video and image-to-video. It delivers realistic motion, physics consistency, with improved control over style, scene, and aspect ratio\u2014ideal for creative apps and social media content.</p></div></div><div class="mode-tabs" data-v-357d17d7><div class="${ssrRenderClass([{ active: form.model === "text-to-video" }, "mode-tab"])}" data-v-357d17d7><i class="fas fa-keyboard" data-v-357d17d7></i><span data-v-357d17d7>text-to-video</span></div><div class="${ssrRenderClass([{ active: form.model === "image-to-video" }, "mode-tab"])}" data-v-357d17d7><i class="fas fa-image" data-v-357d17d7></i><span data-v-357d17d7>image-to-video</span></div><div class="${ssrRenderClass([{ active: form.model === "pro-text-to-video" }, "mode-tab"])}" data-v-357d17d7><i class="fas fa-magic" data-v-357d17d7></i><span data-v-357d17d7>pro-text-to-video</span></div><div class="${ssrRenderClass([{ active: form.model === "pro-image-to-video" }, "mode-tab"])}" data-v-357d17d7><i class="fas fa-wand-magic-sparkles" data-v-357d17d7></i><span data-v-357d17d7>pro-image-to-video</span></div><div class="${ssrRenderClass([{ active: form.model === "watermark-remover" }, "mode-tab"])}" data-v-357d17d7><i class="fas fa-water" data-v-357d17d7></i><span data-v-357d17d7>watermark-remover</span></div><div class="${ssrRenderClass([{ active: form.model === "pro-storyboard" }, "mode-tab"])}" data-v-357d17d7><i class="fas fa-book" data-v-357d17d7></i><span data-v-357d17d7>pro-storyboard</span></div></div><div class="main-content" data-v-357d17d7><div class="config-panel" data-v-357d17d7><div class="config-header" data-v-357d17d7><h4 data-v-357d17d7>Sora Configuration</h4></div><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-357d17d7>`);
      if (!["watermark-remover", "pro-storyboard"].includes(form.model)) {
        _push(`<div class="form-group" data-v-357d17d7><label for="prompt" data-v-357d17d7>Prompt *</label><textarea id="prompt" rows="5" maxlength="10000" placeholder="The text prompt describing the desired video motion" required data-v-357d17d7>${ssrInterpolate(form.input.prompt)}</textarea><div class="char-count" data-v-357d17d7>${ssrInterpolate(form.input.prompt.length)}/10000</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (["image-to-video", "pro-image-to-video", "pro-storyboard"].includes(form.model)) {
        _push(`<div class="form-group" data-v-357d17d7><label data-v-357d17d7>Reference Images *</label>`);
        if (isUploadingImages.value) {
          _push(`<span class="form-hint" data-v-357d17d7>Uploading images...</span>`);
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
        _push(`<div class="form-group" data-v-357d17d7><label data-v-357d17d7>Aspect Ratio</label><div class="tab-group" data-v-357d17d7><div class="tab-options" data-v-357d17d7><button type="button" class="${ssrRenderClass([{ active: form.input.aspect_ratio === "portrait" }, "tab-option"])}" data-v-357d17d7> portrait </button><button type="button" class="${ssrRenderClass([{ active: form.input.aspect_ratio === "landscape" }, "tab-option"])}" data-v-357d17d7> landscape </button></div></div><div class="form-help" data-v-357d17d7>Defines the generated video&#39;s aspect ratio.</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (form.model !== "watermark-remover") {
        _push(`<div class="form-group" data-v-357d17d7><label data-v-357d17d7>Frames</label><div class="tab-group" data-v-357d17d7><div class="tab-options" data-v-357d17d7><button type="button" class="${ssrRenderClass([{ active: form.input.n_frames === "10" }, "tab-option"])}" data-v-357d17d7> 10s </button><button type="button" class="${ssrRenderClass([{ active: form.input.n_frames === "15" }, "tab-option"])}" data-v-357d17d7> 15s </button>`);
        if (form.model === "pro-storyboard") {
          _push(`<button type="button" class="${ssrRenderClass([{ active: form.input.n_frames === "25" }, "tab-option"])}" data-v-357d17d7> 25s </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (form.model === "pro-storyboard") {
          _push(`<div class="form-help" data-v-357d17d7>Frames is required for storyboard.</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (["pro-text-to-video", "pro-image-to-video"].includes(form.model)) {
        _push(`<div class="form-group" data-v-357d17d7><label data-v-357d17d7>Size</label><div class="tab-group" data-v-357d17d7><div class="tab-options" data-v-357d17d7><button type="button" class="${ssrRenderClass([{ active: form.input.size === "standard" }, "tab-option"])}" data-v-357d17d7> standard </button><button type="button" class="${ssrRenderClass([{ active: form.input.size === "high" }, "tab-option"])}" data-v-357d17d7> high </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!["watermark-remover", "pro-storyboard"].includes(form.model)) {
        _push(`<div class="form-group" data-v-357d17d7><label data-v-357d17d7>Remove Watermark</label><div class="tab-group" data-v-357d17d7><div class="tab-options" data-v-357d17d7><button type="button" class="${ssrRenderClass([{ active: form.input.remove_watermark === true }, "tab-option"])}" data-v-357d17d7><i class="fas fa-check" data-v-357d17d7></i> true </button><button type="button" class="${ssrRenderClass([{ active: form.input.remove_watermark === false }, "tab-option"])}" data-v-357d17d7><i class="fas fa-times" data-v-357d17d7></i> false </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (form.model === "watermark-remover") {
        _push(`<div class="form-group" data-v-357d17d7><label class="form-label" data-v-357d17d7>Upload Video <span class="required" data-v-357d17d7>*</span></label><input type="file" accept="video/*" class="sora-video-file-input" data-v-357d17d7><div class="sora-video-upload-area" data-v-357d17d7>`);
        if (isUploadingWatermarkVideo.value) {
          _push(`<div class="sora-video-uploading" data-v-357d17d7><i class="fas fa-spinner fa-spin" data-v-357d17d7></i> Uploading video... </div>`);
        } else if (form.input.video_url) {
          _push(`<!--[--><div class="sora-video-preview-wrap" data-v-357d17d7><video${ssrRenderAttr("src", form.input.video_url)} class="sora-video-preview" controls data-v-357d17d7></video><button type="button" class="sora-video-remove" title="Remove" data-v-357d17d7><i class="fas fa-times" data-v-357d17d7></i></button></div>`);
          if (watermarkVideoFile.value) {
            _push(`<div class="sora-video-meta" data-v-357d17d7><span data-v-357d17d7>${ssrInterpolate(watermarkVideoFile.value.name)}</span><span data-v-357d17d7>${ssrInterpolate(formatFileSize(watermarkVideoFile.value.size))}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!--[--><i class="fas fa-cloud-upload-alt" data-v-357d17d7></i><span data-v-357d17d7>Click to upload video</span><small data-v-357d17d7>Supports MP4, MOV, etc.</small><!--]-->`);
        }
        _push(`</div><div class="form-help" data-v-357d17d7>Upload a video to remove watermark</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (form.model === "pro-storyboard") {
        _push(`<div class="form-group" data-v-357d17d7><label data-v-357d17d7>shots (Total Duration: ${ssrInterpolate(form.input.n_frames || "?")}s)</label><div class="shots-list" data-v-357d17d7><!--[-->`);
        ssrRenderList(scenes.value, (shot, idx) => {
          _push(`<div class="shot-card" data-v-357d17d7><div class="shot-title" data-v-357d17d7>Scene ${ssrInterpolate(idx + 1)}</div><textarea class="shot-text" rows="3"${ssrRenderAttr("placeholder", `Describe this scene... who, where, what happens?`)} data-v-357d17d7>${ssrInterpolate(shot.scene)}</textarea><div class="shot-footer" data-v-357d17d7><div class="duration-input" data-v-357d17d7><input class="duration-field" type="text"${ssrRenderAttr("value", shot.duration)} data-v-357d17d7><span class="duration-s" data-v-357d17d7>s</span></div>`);
          if (scenes.value.length > 1) {
            _push(`<button type="button" class="shot-delete" title="Delete scene" data-v-357d17d7><i class="fas fa-trash" data-v-357d17d7></i></button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--><button type="button" class="add-shot" data-v-357d17d7><i class="fas fa-plus" data-v-357d17d7></i> Add Scene </button></div>`);
        if (form.input.n_frames && totalSceneDuration.value > Number(form.input.n_frames)) {
          _push(`<div class="duration-warning error" data-v-357d17d7><i class="fas fa-exclamation-triangle" data-v-357d17d7></i> Total scene duration exceeds maximum limit, please adjust each scene duration </div>`);
        } else if (form.input.n_frames && remainingDuration.value > 0) {
          _push(`<div class="duration-warning info" data-v-357d17d7><i class="fas fa-exclamation-triangle" data-v-357d17d7></i> Please allocate all remaining duration (${ssrInterpolate(remainingDuration.value.toFixed(2))}s) to scenes before generating </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="form-help" data-v-357d17d7>Add one or more scenes. Each scene includes a textual description and its duration in seconds.</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-actions" data-v-357d17d7><button class="btn-primary"${ssrIncludeBooleanAttr(!canSubmit.value || isGenerating.value) ? " disabled" : ""} data-v-357d17d7>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-357d17d7></i>`);
      } else {
        _push(`<i class="fas fa-play" data-v-357d17d7></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Submitting..." : "Start Generation")} `);
      if (soraPriceText.value) {
        _push(`<span class="price-tag" data-v-357d17d7>${ssrInterpolate(soraPriceText.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></fieldset></div><div class="result-panel" data-v-357d17d7><div class="video-header" data-v-357d17d7><h4 data-v-357d17d7>Result Preview</h4>`);
      if (results.value.length > 0) {
        _push(`<div class="video-actions" data-v-357d17d7><button class="btn-secondary" data-v-357d17d7><i class="fas fa-trash" data-v-357d17d7></i> Clear </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!isDetailView.value && unref(route).path === "/home/sora/text-to-video") {
        _push(`<div class="tutorial-showcase" data-v-357d17d7><p class="tutorial-showcase-title" data-v-357d17d7>\u{1F3AC} Tutorial Showcase</p><div class="tutorial-showcase-links" data-v-357d17d7><a href="/news/sora-2-landscape-text-to-video-4k-dynamic-wallpaper" class="tutorial-link" data-v-357d17d7> One Text Prompt to a 4K Dynamic Wallpaper? Sora-2 Turns Landscape Descriptions into \u201CBreathing\u201D Video </a><a href="/news/sora-2-portrait-text-to-video-tutorial" class="tutorial-link" data-v-357d17d7> Goodbye Stiff Photos: Turn Text Prompts into Lifelike Portrait Videos with Sora-2 </a></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="video-container" data-v-357d17d7>`);
      if (isDetailView.value && (loadingRecordId.value || !detailData.value && routeRecordId.value)) {
        _push(`<div class="empty-state" data-v-357d17d7><i class="fas fa-spinner fa-spin" style="${ssrRenderStyle({ "font-size": "48px", "color": "#3b82f6" })}" data-v-357d17d7></i><p data-v-357d17d7>Loading record...</p></div>`);
      } else if (isDetailView.value && detailData.value && detailData.value.status === 1) {
        _push(`<div class="empty-state" data-v-357d17d7><i class="fas fa-spinner fa-spin" style="${ssrRenderStyle({ "font-size": "48px", "color": "#3b82f6" })}" data-v-357d17d7></i><p data-v-357d17d7>Generating...</p></div>`);
      } else if (isDetailView.value && detailData.value && detailData.value.status === 3) {
        _push(`<div class="empty-state" data-v-357d17d7><i class="fas fa-exclamation-circle" style="${ssrRenderStyle({ "font-size": "48px", "color": "#ef4444" })}" data-v-357d17d7></i><p data-v-357d17d7>Generation failed.</p></div>`);
      } else if (isDetailView.value && detailData.value && detailData.value.status === 2) {
        _push(`<div class="video-showcase" data-v-357d17d7><div class="video-showcase-item" data-v-357d17d7>`);
        if (detailOutputItems.value.length > 0) {
          _push(`<!--[-->`);
          ssrRenderList(detailOutputItems.value, (item, index) => {
            _push(`<div class="detail-output-item" data-v-357d17d7>`);
            if (item.type === "video") {
              _push(`<video${ssrRenderAttr("src", item.url)} controls class="detail-video" data-v-357d17d7></video>`);
            } else if (item.type === "image") {
              _push(`<img${ssrRenderAttr("src", item.url)}${ssrRenderAttr("alt", "Output " + (index + 1))} class="detail-image" loading="lazy" data-v-357d17d7>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<pre class="payload-json" data-v-357d17d7>${ssrInterpolate(typeof detailData.value === "object" ? JSON.stringify(detailData.value, null, 2) : "")}</pre>`);
        }
        _push(`</div></div>`);
      } else if (results.value.length > 0) {
        _push(`<div class="video-showcase" data-v-357d17d7><!--[-->`);
        ssrRenderList(results.value, (item, idx) => {
          _push(`<div class="video-showcase-item" data-v-357d17d7><pre class="payload-json" data-v-357d17d7>${ssrInterpolate(typeof item === "object" ? JSON.stringify(item, null, 2) : item)}</pre></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty-state" data-v-357d17d7><div class="empty-icon" data-v-357d17d7><i class="fas fa-film" data-v-357d17d7></i></div><h3 data-v-357d17d7>Waiting for Generation</h3><p data-v-357d17d7>Configure parameters, then click Start Generation.</p></div>`);
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
const SoraTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-357d17d7"]]);

export { SoraTool as S };
//# sourceMappingURL=SoraTool-DFiQ9B8J.mjs.map
