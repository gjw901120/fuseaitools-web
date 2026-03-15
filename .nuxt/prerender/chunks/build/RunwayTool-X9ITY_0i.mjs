import { computed, ref, watch, inject, reactive, mergeProps, unref, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { useRouter, useRoute } from 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import { U as UploadImage } from './UploadImage-CdWm1sTQ.mjs';
import { u as useAuth } from './useAuth-BT_C6798.mjs';
import { u as useToast } from './useToast-CATlmXE8.mjs';
import { u as useModelPrice, a as useApi } from './useModelPrice-DcNReY6Y.mjs';
import { u as useRecordPolling } from './useRecordPolling-QI_mIuwF.mjs';
import { u as useBatchUploadUrl } from './useBatchUploadUrl-Wq7pvxpv.mjs';
import { _ as _export_sfc } from './server.mjs';

const _imports_0 = publicAssetsURL("/tools-logo/Runway.png");
const EXTEND_LIST_MODEL = "runway_generate";
const _sfc_main = {
  __name: "RunwayTool",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const { showError } = useToast();
    const { get } = useApi();
    const { getPrice, formatCredits } = useModelPrice();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    useRouter();
    const route = useRoute();
    const batchUploadUrl = useBatchUploadUrl();
    const runwayPathToTab = {
      "/home/runway/generate": "generate",
      "/home/runway/extend": "extend",
      "/home/runway/aleph": "aleph"
    };
    const routeRecordId = computed(() => {
      var _a;
      return ((_a = route == null ? void 0 : route.query) == null ? void 0 : _a["record-id"]) || "";
    });
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const loadingRecordId = ref(null);
    ref(null);
    const displayVideos = computed(() => {
      var _a, _b, _c;
      if (isDetailView.value && ((_a = detailData.value) == null ? void 0 : _a.status) === 2 && ((_c = (_b = detailData.value) == null ? void 0 : _b.outputUrls) == null ? void 0 : _c.length)) {
        const urls = detailData.value.outputUrls.map((u) => typeof u === "string" ? u : u == null ? void 0 : u.url).filter(Boolean);
        const imageUrl = urls.find((u) => u.includes("/image/"));
        const videoUrl = urls.find((u) => u.includes("/video/"));
        const od = detailData.value.originalData || {};
        return [{
          id: "detail",
          url: videoUrl || urls[0],
          thumbnail: imageUrl || void 0,
          prompt: od.prompt || detailData.value.title || "",
          duration: od.duration ? `${od.duration} seconds` : "",
          resolution: od.quality || "",
          aspectRatio: od.aspectRatio || "",
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        }];
      }
      return generatedVideos.value;
    });
    function fillFormFromOriginalData(o) {
      if (!o || typeof o !== "object") return;
      if (activeTab.value === "generate") Object.keys(formData).forEach((k) => {
        if (o[k] !== void 0) formData[k] = o[k];
      });
      else if (activeTab.value === "extend") Object.keys(extendFormData).forEach((k) => {
        if (o[k] !== void 0) extendFormData[k] = o[k];
      });
      else if (activeTab.value === "aleph") Object.keys(alephFormData).forEach((k) => {
        if (o[k] !== void 0) alephFormData[k] = o[k];
      });
    }
    function getRouteRecordId() {
      return route.query["record-id"] || "";
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
        if (data == null ? void 0 : data.originalData) fillFormFromOriginalData(data.originalData);
        if (data != null && Number(data.status) === 1) pollRecordByStatus(recordId, { getIsCancelled: () => getRouteRecordId() !== recordId }).then((res) => {
          if (getRouteRecordId() !== recordId) return;
          detailData.value = res;
          if (res == null ? void 0 : res.originalData) fillFormFromOriginalData(res.originalData);
        }).catch(() => {
        });
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
    inject("addToUsageHistory", null);
    const activeTab = ref("generate");
    const tabs = Object.freeze([
      { id: "generate", name: "Generate", icon: "fas fa-video" },
      { id: "extend", name: "Extend", icon: "fas fa-expand" },
      { id: "aleph", name: "Aleph", icon: "fas fa-magic" }
    ]);
    const extendList = ref([]);
    const loadingExtendList = ref(false);
    const fetchExtendList = async () => {
      loadingExtendList.value = true;
      try {
        const data = await get(`/api/records/extend-list?model=${encodeURIComponent(EXTEND_LIST_MODEL)}`);
        extendList.value = Array.isArray(data) ? data : [];
      } catch {
        extendList.value = [];
      } finally {
        loadingExtendList.value = false;
      }
    };
    watch(() => route.path, (path) => {
      const tab = runwayPathToTab[path];
      if (tab && activeTab.value !== tab) activeTab.value = tab;
      if (tab === "extend") fetchExtendList();
    }, { immediate: true });
    const INIT_GENERATE_FORM = {
      prompt: "",
      duration: "5",
      quality: "720p",
      imageFile: null,
      uploadedImageUrl: null,
      aspectRatio: "16:9",
      waterMark: ""
    };
    const formData = reactive({ ...INIT_GENERATE_FORM });
    const INIT_ALEPH_FORM = {
      prompt: "",
      videoFile: null,
      uploadedVideoUrl: null,
      waterMark: "",
      aspectRatio: "16:9",
      seed: null,
      referenceImageFile: null,
      uploadedReferenceImageUrl: null
    };
    const alephFormData = reactive({ ...INIT_ALEPH_FORM });
    const INIT_EXTEND_FORM = { task: "", prompt: "", quality: "720p", waterMark: "" };
    const extendFormData = reactive({ ...INIT_EXTEND_FORM });
    watch(activeTab, (tab) => {
      if (tab === "generate") Object.assign(formData, INIT_GENERATE_FORM);
      else if (tab === "extend") Object.assign(extendFormData, INIT_EXTEND_FORM);
      else if (tab === "aleph") Object.assign(alephFormData, INIT_ALEPH_FORM);
    });
    const isGenerating = ref(false);
    const generatedVideos = ref([]);
    const alephReferenceVideo = ref("");
    ref(null);
    const isUploadingAlephVideo = ref(false);
    const formatFileSize = (bytes) => {
      if (bytes == null || bytes === 0) return "0 B";
      const k = 1024;
      const sizes = ["B", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    const runwayGeneratePriceText = computed(() => {
      const credits = getPrice("runway_generate", {
        duration: Number(formData.duration) || 5,
        quality: formData.quality || "720p",
        scene: "generate"
      });
      const str = formatCredits(credits);
      return str ? `(${str})` : "";
    });
    const runwayExtendPriceText = computed(() => {
      const credits = getPrice("runway_extend");
      const str = formatCredits(credits);
      return str ? `(${str})` : "";
    });
    const runwayAlephPriceText = computed(() => {
      const credits = getPrice("runway_aleph");
      const str = formatCredits(credits);
      return str ? `(${str})` : "";
    });
    watch([() => formData.duration, () => formData.quality], ([duration, quality]) => {
      if (duration === "10" && quality === "1080p") {
        formData.quality = "720p";
      }
    });
    const isUploadingGenerateImage = ref(false);
    const handleImageUpdate = async (files) => {
      if (!Array.isArray(files) || files.length === 0) {
        formData.imageFile = null;
        formData.uploadedImageUrl = null;
        return;
      }
      formData.imageFile = files[0];
      formData.uploadedImageUrl = null;
      isUploadingGenerateImage.value = true;
      try {
        const urls = await uploadFilesToUrls([files[0]]);
        formData.uploadedImageUrl = urls[0] || null;
      } catch (e) {
        console.error("Reference image upload failed:", e);
        showError((e == null ? void 0 : e.message) || "Upload failed");
        formData.imageFile = null;
      } finally {
        isUploadingGenerateImage.value = false;
      }
    };
    const isUploadingAlephImage = ref(false);
    const handleAlephImageUpdate = async (files) => {
      if (!Array.isArray(files) || files.length === 0) {
        alephFormData.referenceImageFile = null;
        alephFormData.uploadedReferenceImageUrl = null;
        return;
      }
      alephFormData.referenceImageFile = files[0];
      alephFormData.uploadedReferenceImageUrl = null;
      isUploadingAlephImage.value = true;
      try {
        const urls = await uploadFilesToUrls([files[0]]);
        alephFormData.uploadedReferenceImageUrl = urls[0] || null;
      } catch (e) {
        console.error("Aleph reference image upload failed:", e);
        showError((e == null ? void 0 : e.message) || "Upload failed");
        alephFormData.referenceImageFile = null;
      } finally {
        isUploadingAlephImage.value = false;
      }
    };
    const getConfigHeaderTitle = () => {
      return "Configuration";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "runway-tool" }, _attrs))} data-v-d2252e65><div class="tool-header" data-v-d2252e65><div class="tool-avatar" data-v-d2252e65><img${ssrRenderAttr("src", _imports_0)} alt="Runway" data-v-d2252e65></div><div class="tool-details" data-v-d2252e65><h3 data-v-d2252e65>Runway</h3><p data-v-d2252e65>Utilize Runway to generate high-quality videos from text and images. Leverage Runway AI for seamless integration and immediately start creating your Runway masterpieces.</p></div></div><div class="mode-tabs-wrap" data-v-d2252e65><div class="mode-tabs" data-v-d2252e65><!--[-->`);
      ssrRenderList(unref(tabs), (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: activeTab.value === tab.id }, "mode-tab"])}" data-v-d2252e65><i class="${ssrRenderClass(tab.icon)}" data-v-d2252e65></i><span data-v-d2252e65>${ssrInterpolate(tab.name)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="main-content" data-v-d2252e65><div class="config-panel" data-v-d2252e65><div class="config-header" data-v-d2252e65><h4 data-v-d2252e65>${ssrInterpolate(getConfigHeaderTitle())}</h4></div>`);
      if (activeTab.value === "generate") {
        _push(`<form class="config-form" data-v-d2252e65><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-d2252e65><div class="form-group" data-v-d2252e65><label for="prompt" data-v-d2252e65>Video Description *</label><textarea id="prompt" placeholder="Descriptive text that guides AI video generation. Specify themes, actions, styles, and scenes. When used with images, describe how to animate or modify image content. Maximum 1800 characters." rows="4" maxlength="1800" required data-v-d2252e65>${ssrInterpolate(formData.prompt)}</textarea><div class="char-count" data-v-d2252e65>${ssrInterpolate(formData.prompt.length)}/1800</div></div><div class="form-group" data-v-d2252e65><label data-v-d2252e65>Video Duration *</label><div class="tab-group" data-v-d2252e65><div class="tab-options" data-v-d2252e65><button type="button" class="${ssrRenderClass([{ active: formData.duration === "5" }, "tab-option"])}" data-v-d2252e65><i class="fas fa-clock" data-v-d2252e65></i> 5 seconds </button><button type="button" class="${ssrRenderClass([{ active: formData.duration === "10" }, "tab-option"])}" data-v-d2252e65><i class="fas fa-clock" data-v-d2252e65></i> 10 seconds </button></div></div></div><div class="form-group" data-v-d2252e65><label data-v-d2252e65>Video Quality *</label><div class="tab-group" data-v-d2252e65><div class="tab-options" data-v-d2252e65><button type="button" class="${ssrRenderClass([{ active: formData.quality === "720p" }, "tab-option"])}" data-v-d2252e65><i class="fas fa-hd-video" data-v-d2252e65></i> 720p </button><button type="button" class="${ssrRenderClass([{ active: formData.quality === "1080p" }, "tab-option"])}"${ssrIncludeBooleanAttr(formData.duration === "10") ? " disabled" : ""} data-v-d2252e65><i class="fas fa-video" data-v-d2252e65></i> 1080p </button></div></div>`);
        if (formData.duration === "10") {
          _push(`<div class="form-help" data-v-d2252e65> 10-second videos do not support 1080p resolution </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></fieldset><div class="form-group" data-v-d2252e65><label class="form-label" data-v-d2252e65>Reference Image</label>`);
        if (isUploadingGenerateImage.value) {
          _push(`<span class="form-hint" data-v-d2252e65><i class="fas fa-spinner fa-spin" data-v-d2252e65></i> Uploading image...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(UploadImage, {
          "input-id": "runway-image-upload",
          label: "",
          "upload-icon": "fas fa-cloud-upload-alt",
          "upload-text": "Click to upload image",
          "upload-hint": "Supports JPG/PNG format, max 10MB",
          "additional-hint": "Optional reference image as the basis for the video. If provided, AI will create a video that animates or extends this image.",
          "theme-color": "#3b82f6",
          "max-files": 1,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/*",
          multiple: false,
          "onUpdate:files": handleImageUpdate
        }, null, _parent));
        _push(`</div><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-d2252e65>`);
        if (!formData.imageFile) {
          _push(`<div class="form-group" data-v-d2252e65><label data-v-d2252e65>Video Aspect Ratio *</label><div class="select-wrapper" data-v-d2252e65><select required data-v-d2252e65><option value="16:9" data-v-d2252e65${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "16:9") : ssrLooseEqual(formData.aspectRatio, "16:9")) ? " selected" : ""}>16:9 (Landscape)</option><option value="4:3" data-v-d2252e65${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "4:3") : ssrLooseEqual(formData.aspectRatio, "4:3")) ? " selected" : ""}>4:3 (Standard)</option><option value="1:1" data-v-d2252e65${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "1:1") : ssrLooseEqual(formData.aspectRatio, "1:1")) ? " selected" : ""}>1:1 (Square)</option><option value="3:4" data-v-d2252e65${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "3:4") : ssrLooseEqual(formData.aspectRatio, "3:4")) ? " selected" : ""}>3:4 (Portrait)</option><option value="9:16" data-v-d2252e65${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "9:16") : ssrLooseEqual(formData.aspectRatio, "9:16")) ? " selected" : ""}>9:16 (Mobile)</option></select><i class="fas fa-chevron-down" data-v-d2252e65></i></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="form-group" data-v-d2252e65><label for="waterMark" data-v-d2252e65>Watermark Text</label><input id="waterMark"${ssrRenderAttr("value", formData.waterMark)} type="text" placeholder="fuseai" data-v-d2252e65><div class="form-help" data-v-d2252e65> Video watermark text content. Empty string means no watermark, non-empty string will display the specified watermark text in the bottom-right corner of the video. </div></div><div class="form-actions" data-v-d2252e65><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!formData.prompt || isGenerating.value) ? " disabled" : ""} data-v-d2252e65>`);
        if (isGenerating.value) {
          _push(`<i class="fas fa-spinner fa-spin" data-v-d2252e65></i>`);
        } else {
          _push(`<i class="fas fa-video" data-v-d2252e65></i>`);
        }
        _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Video")} `);
        if (runwayGeneratePriceText.value) {
          _push(`<span class="price-tag" data-v-d2252e65>${ssrInterpolate(runwayGeneratePriceText.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button></div></fieldset></form>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "aleph") {
        _push(`<form class="config-form" data-v-d2252e65><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-d2252e65><div class="form-group" data-v-d2252e65><label for="aleph-prompt" data-v-d2252e65>Prompt *</label><textarea id="aleph-prompt" placeholder="Descriptive text that guides how to transform the reference video. Specifically describe the style changes, effects, and modifications you want to see in the generated video." rows="5" required data-v-d2252e65>${ssrInterpolate(alephFormData.prompt)}</textarea><div class="form-help" data-v-d2252e65><strong data-v-d2252e65>Best Practices:</strong><ul style="${ssrRenderStyle({ "margin": "4px 0 0 0", "padding-left": "20px" })}" data-v-d2252e65><li data-v-d2252e65>Focus on transformations and style changes, rather than describing content already in the video</li><li data-v-d2252e65>Include camera movement descriptions (e.g., &quot;slow zoom in&quot;, &quot;orbital rotation&quot;)</li><li data-v-d2252e65>Add temporal elements (e.g., &quot;gradually&quot;, &quot;smoothly&quot;, &quot;suddenly&quot;)</li><li data-v-d2252e65>Specify lighting and atmosphere changes when needed</li></ul><div style="${ssrRenderStyle({ "margin-top": "8px" })}" data-v-d2252e65><strong data-v-d2252e65>Example:</strong> &quot;Transform into dreamy watercolor style with soft flowing motion effects&quot; </div></div></div><div class="form-group" data-v-d2252e65><label data-v-d2252e65>Input Video *</label><div class="aleph-video-upload" data-v-d2252e65><div class="${ssrRenderClass([{ "has-video": alephReferenceVideo.value }, "aleph-video-trigger"])}" data-v-d2252e65><input type="file" accept="video/*" class="aleph-video-file-input" data-v-d2252e65><div class="aleph-video-trigger-inner" data-v-d2252e65><i class="fas fa-cloud-upload-alt" data-v-d2252e65></i><span data-v-d2252e65>Click to upload video</span><small data-v-d2252e65>Supports MP4, MOV, AVI, max 10MB</small></div></div>`);
        if (isUploadingAlephVideo.value) {
          _push(`<div class="aleph-video-uploading" data-v-d2252e65><i class="fas fa-spinner fa-spin" data-v-d2252e65></i> Uploading video... </div>`);
        } else {
          _push(`<!---->`);
        }
        if (alephReferenceVideo.value && !isUploadingAlephVideo.value) {
          _push(`<div class="aleph-video-display" data-v-d2252e65><div class="aleph-video-preview-wrap" data-v-d2252e65><video${ssrRenderAttr("src", alephReferenceVideo.value)} class="aleph-video-preview" controls data-v-d2252e65></video><button type="button" class="aleph-video-remove" title="Remove" data-v-d2252e65><i class="fas fa-times" data-v-d2252e65></i></button></div>`);
          if (alephFormData.videoFile) {
            _push(`<div class="aleph-video-meta" data-v-d2252e65><span class="aleph-video-name" data-v-d2252e65>${ssrInterpolate(alephFormData.videoFile.name)}</span><span class="aleph-video-size" data-v-d2252e65>${ssrInterpolate(formatFileSize(alephFormData.videoFile.size))}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="form-group" data-v-d2252e65><label for="aleph-waterMark" data-v-d2252e65>Watermark</label><input id="aleph-waterMark"${ssrRenderAttr("value", alephFormData.waterMark)} type="text" placeholder="fuseai" maxlength="20" data-v-d2252e65><div class="form-help" data-v-d2252e65> Optional watermark text displayed on the generated video. Leave empty for no watermark. Recommended length: 1-20 characters for optimal visibility. </div></div><div class="form-group" data-v-d2252e65><label data-v-d2252e65>Aspect Ratio</label><div class="tab-group" data-v-d2252e65><div class="tab-options" data-v-d2252e65><button type="button" class="${ssrRenderClass([{ active: alephFormData.aspectRatio === "16:9" }, "tab-option"])}" data-v-d2252e65> 16:9 </button><button type="button" class="${ssrRenderClass([{ active: alephFormData.aspectRatio === "9:16" }, "tab-option"])}" data-v-d2252e65> 9:16 </button><button type="button" class="${ssrRenderClass([{ active: alephFormData.aspectRatio === "4:3" }, "tab-option"])}" data-v-d2252e65> 4:3 </button><button type="button" class="${ssrRenderClass([{ active: alephFormData.aspectRatio === "3:4" }, "tab-option"])}" data-v-d2252e65> 3:4 </button><button type="button" class="${ssrRenderClass([{ active: alephFormData.aspectRatio === "1:1" }, "tab-option"])}" data-v-d2252e65> 1:1 </button><button type="button" class="${ssrRenderClass([{ active: alephFormData.aspectRatio === "21:9" }, "tab-option"])}" data-v-d2252e65> 21:9 </button></div></div></div><div class="form-group" data-v-d2252e65><label for="aleph-seed" data-v-d2252e65>Seed</label><input id="aleph-seed"${ssrRenderAttr("value", alephFormData.seed)} type="number" placeholder="123456" data-v-d2252e65><div class="form-help" data-v-d2252e65> Optional random seed for reproducible results. The same seed with the same parameters tends to generate consistent results. </div></div></fieldset><div class="form-group" data-v-d2252e65><label class="form-label" data-v-d2252e65>Reference Image</label>`);
        if (isUploadingAlephImage.value) {
          _push(`<span class="form-hint" data-v-d2252e65><i class="fas fa-spinner fa-spin" data-v-d2252e65></i> Uploading image...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(UploadImage, {
          "input-id": "runway-aleph-image-upload",
          label: "",
          "upload-icon": "fas fa-cloud-upload-alt",
          "upload-text": "Click to upload image",
          "upload-hint": "Supports JPG/PNG format, max 10MB",
          "additional-hint": "Optional reference image to influence the style or content of the output.",
          "theme-color": "#3b82f6",
          "max-files": 1,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/*",
          multiple: false,
          "onUpdate:files": handleAlephImageUpdate
        }, null, _parent));
        _push(`</div><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-d2252e65><div class="form-actions" data-v-d2252e65><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!alephFormData.prompt || !alephFormData.uploadedVideoUrl || isGenerating.value) ? " disabled" : ""} data-v-d2252e65>`);
        if (isGenerating.value) {
          _push(`<i class="fas fa-spinner fa-spin" data-v-d2252e65></i>`);
        } else {
          _push(`<i class="fas fa-video" data-v-d2252e65></i>`);
        }
        _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Aleph Video")} `);
        if (runwayAlephPriceText.value) {
          _push(`<span class="price-tag" data-v-d2252e65>${ssrInterpolate(runwayAlephPriceText.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button></div></fieldset></form>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "extend") {
        _push(`<form class="config-form" data-v-d2252e65><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-d2252e65><div class="form-group" data-v-d2252e65><label for="extend-task" data-v-d2252e65>Task *</label><div class="select-wrapper" data-v-d2252e65><select id="extend-task" required${ssrIncludeBooleanAttr(loadingExtendList.value) ? " disabled" : ""} data-v-d2252e65><option value="" data-v-d2252e65${ssrIncludeBooleanAttr(Array.isArray(extendFormData.task) ? ssrLooseContain(extendFormData.task, "") : ssrLooseEqual(extendFormData.task, "")) ? " selected" : ""}>Select a task</option><!--[-->`);
        ssrRenderList(extendList.value, (item) => {
          _push(`<option${ssrRenderAttr("value", item.taskId)} data-v-d2252e65${ssrIncludeBooleanAttr(Array.isArray(extendFormData.task) ? ssrLooseContain(extendFormData.task, item.taskId) : ssrLooseEqual(extendFormData.task, item.taskId)) ? " selected" : ""}>${ssrInterpolate(item.title || item.taskId)}</option>`);
        });
        _push(`<!--]--></select><i class="fas fa-chevron-down" data-v-d2252e65></i></div>`);
        if (!loadingExtendList.value && extendList.value.length === 0) {
          _push(`<div class="form-hint input-hint-warn" data-v-d2252e65> Only tasks completed with Runway Generate can be used. </div>`);
        } else {
          _push(`<div class="form-help" data-v-d2252e65> Original video generation task. Must be a valid task from a previously generated video. </div>`);
        }
        _push(`</div><div class="form-group" data-v-d2252e65><label for="extend-prompt" data-v-d2252e65>Prompt *</label><textarea id="extend-prompt" placeholder="Descriptive text that guides video continuation. Explain what actions, dynamics, or developments should happen next. Be specific but maintain consistency with the original video content." rows="5" maxlength="1000" required data-v-d2252e65>${ssrInterpolate(extendFormData.prompt)}</textarea>`);
        if (extendFormData.prompt) {
          _push(`<div class="char-count" data-v-d2252e65>${ssrInterpolate(extendFormData.prompt.length)}/1000</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-d2252e65><label data-v-d2252e65>Video Quality *</label><div class="tab-group" data-v-d2252e65><div class="tab-options" data-v-d2252e65><button type="button" class="${ssrRenderClass([{ active: extendFormData.quality === "720p" }, "tab-option"])}" data-v-d2252e65><i class="fas fa-hd-video" data-v-d2252e65></i> 720p </button><button type="button" class="${ssrRenderClass([{ active: extendFormData.quality === "1080p" }, "tab-option"])}" data-v-d2252e65><i class="fas fa-video" data-v-d2252e65></i> 1080p </button></div></div></div><div class="form-group" data-v-d2252e65><label for="extend-waterMark" data-v-d2252e65>Watermark</label><input id="extend-waterMark"${ssrRenderAttr("value", extendFormData.waterMark)} type="text" placeholder="fuseai" maxlength="50" data-v-d2252e65><div class="form-help" data-v-d2252e65> Optional watermark text (max 50 characters). Empty means no watermark; non-empty displays in the bottom-right corner of the video. </div></div><div class="form-actions" data-v-d2252e65><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!extendFormData.task || !extendFormData.prompt || isGenerating.value) ? " disabled" : ""} data-v-d2252e65>`);
        if (isGenerating.value) {
          _push(`<i class="fas fa-spinner fa-spin" data-v-d2252e65></i>`);
        } else {
          _push(`<i class="fas fa-expand" data-v-d2252e65></i>`);
        }
        _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Extend Video")} `);
        if (runwayExtendPriceText.value) {
          _push(`<span class="price-tag" data-v-d2252e65>${ssrInterpolate(runwayExtendPriceText.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button></div></fieldset></form>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="result-panel" data-v-d2252e65><div class="video-header" data-v-d2252e65><h4 data-v-d2252e65>Video Preview</h4>`);
      if (!isDetailView.value && generatedVideos.value.length > 0) {
        _push(`<div class="video-actions" data-v-d2252e65><button class="btn-secondary" data-v-d2252e65><i class="fas fa-trash" data-v-d2252e65></i> Clear </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="video-container" data-v-d2252e65>`);
      if (isDetailView.value && detailData.value && detailData.value.status === 3) {
        _push(`<div class="detail-failure-state" data-v-d2252e65><div class="failure-icon" data-v-d2252e65><i class="fas fa-exclamation-circle" data-v-d2252e65></i></div><p class="failure-message" data-v-d2252e65>Generation failed. You can debug the parameters and try generating again. Generation failure will not consume credits.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || detailData.value.status === 1)) {
        _push(`<div class="detail-loading-state" data-v-d2252e65><i class="fas fa-spinner fa-spin detail-spinner" data-v-d2252e65></i><p data-v-d2252e65>Generating...</p></div>`);
      } else if (displayVideos.value.length > 0) {
        _push(`<div class="video-showcase" data-v-d2252e65><!--[-->`);
        ssrRenderList(displayVideos.value, (video, index) => {
          _push(`<div class="video-showcase-item" data-v-d2252e65><div class="video-player" data-v-d2252e65><video controls${ssrRenderAttr("src", video.url)}${ssrRenderAttr("poster", video.thumbnail)} data-v-d2252e65> Your browser does not support video playback </video></div><div class="video-details" data-v-d2252e65><div class="video-meta" data-v-d2252e65><span class="video-duration" data-v-d2252e65>${ssrInterpolate(video.duration)}</span><span class="video-resolution" data-v-d2252e65>${ssrInterpolate(video.resolution)}</span><span class="video-ratio" data-v-d2252e65>${ssrInterpolate(video.aspectRatio)}</span></div><div class="video-actions" data-v-d2252e65><button class="btn-icon" title="Download" data-v-d2252e65><i class="fas fa-download" data-v-d2252e65></i></button><button class="btn-icon" title="Share" data-v-d2252e65><i class="fas fa-share" data-v-d2252e65></i></button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty-state" data-v-d2252e65><div class="empty-icon" data-v-d2252e65><i class="fas fa-video" data-v-d2252e65></i></div><h3 data-v-d2252e65>Waiting for Video Generation</h3><p data-v-d2252e65>Configure parameters and click &quot;Generate Video&quot; button to start creating your AI video</p><div class="empty-features" data-v-d2252e65><div class="feature-item" data-v-d2252e65><i class="fas fa-magic" data-v-d2252e65></i><span data-v-d2252e65>Text to Video</span></div><div class="feature-item" data-v-d2252e65><i class="fas fa-image" data-v-d2252e65></i><span data-v-d2252e65>Image to Video</span></div><div class="feature-item" data-v-d2252e65><i class="fas fa-palette" data-v-d2252e65></i><span data-v-d2252e65>Multiple Aspect Ratios</span></div></div></div>`);
      }
      _push(`</div></div></div>`);
      if (activeTab.value === "generate") {
        _push(`<div class="usage-tips" data-v-d2252e65><div class="tip-item" data-v-d2252e65><span class="tip-icon" data-v-d2252e65>\u{1F4DD}</span><span data-v-d2252e65><strong data-v-d2252e65>Detailed Description:</strong> Include details like scenes, actions, camera movement, lighting, etc.</span></div><div class="tip-item" data-v-d2252e65><span class="tip-icon" data-v-d2252e65>\u{1F3AC}</span><span data-v-d2252e65><strong data-v-d2252e65>Cinematic Terms:</strong> Use professional terms like &quot;close-up&quot;, &quot;wide shot&quot;, &quot;tracking shot&quot;</span></div><div class="tip-item" data-v-d2252e65><span class="tip-icon" data-v-d2252e65>\u{1F3A8}</span><span data-v-d2252e65><strong data-v-d2252e65>Style Specification:</strong> Such as &quot;sci-fi style&quot;, &quot;romantic comedy&quot;, &quot;action film&quot;</span></div><div class="tip-item" data-v-d2252e65><span class="tip-icon" data-v-d2252e65>\u23F1\uFE0F</span><span data-v-d2252e65><strong data-v-d2252e65>Duration Limit:</strong> 10-second videos do not support 1080p resolution</span></div><div class="tip-item" data-v-d2252e65><span class="tip-icon" data-v-d2252e65>\u{1F5BC}\uFE0F</span><span data-v-d2252e65><strong data-v-d2252e65>Reference Image:</strong> Providing an image URL can add animation effects to existing images</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "aleph") {
        _push(`<div class="usage-tips" data-v-d2252e65><div class="tip-item" data-v-d2252e65><span class="tip-icon" data-v-d2252e65>\u{1F504}</span><span data-v-d2252e65><strong data-v-d2252e65>Transformation Description:</strong> Focus on describing the style changes and effect transformations you want</span></div><div class="tip-item" data-v-d2252e65><span class="tip-icon" data-v-d2252e65>\u{1F4F9}</span><span data-v-d2252e65><strong data-v-d2252e65>Motion Effects:</strong> Use camera movement terminology to enhance video dynamics</span></div><div class="tip-item" data-v-d2252e65><span class="tip-icon" data-v-d2252e65>\u23F0</span><span data-v-d2252e65><strong data-v-d2252e65>Temporal Control:</strong> Control transformation rhythm through temporal elements (gradually, suddenly, etc.)</span></div><div class="tip-item" data-v-d2252e65><span class="tip-icon" data-v-d2252e65>\u{1F3A5}</span><span data-v-d2252e65><strong data-v-d2252e65>Video Requirements:</strong> Ensure video URL is accessible via HTTPS and file size does not exceed 10MB</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "extend") {
        _push(`<div class="usage-tips" data-v-d2252e65><div class="tip-item" data-v-d2252e65><span class="tip-icon" data-v-d2252e65>\u27A1\uFE0F</span><span data-v-d2252e65><strong data-v-d2252e65>Continuation Description:</strong> Describe what should happen next in the video sequence</span></div><div class="tip-item" data-v-d2252e65><span class="tip-icon" data-v-d2252e65>\u{1F517}</span><span data-v-d2252e65><strong data-v-d2252e65>Consistency:</strong> Maintain visual and narrative consistency with the original video</span></div><div class="tip-item" data-v-d2252e65><span class="tip-icon" data-v-d2252e65>\u26A1</span><span data-v-d2252e65><strong data-v-d2252e65>Dynamic Actions:</strong> Specify movements, actions, and developments clearly</span></div><div class="tip-item" data-v-d2252e65><span class="tip-icon" data-v-d2252e65>\u{1F3AF}</span><span data-v-d2252e65><strong data-v-d2252e65>Quality Selection:</strong> Choose resolution based on your needs - 720p for faster generation, 1080p for higher quality</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/RunwayTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RunwayTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d2252e65"]]);

export { RunwayTool as R };
//# sourceMappingURL=RunwayTool-X9ITY_0i.mjs.map
