import { ref, watch, reactive, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrLooseContain } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { useRouter, useRoute } from "vue-router";
import { U as UploadImage } from "./UploadImage-CdWm1sTQ.js";
import { u as useToast } from "./useToast-CATlmXE8.js";
import "./useAuth-BT_C6798.js";
import { u as useRecordPolling } from "./useRecordPolling-QI_mIuwF.js";
import { u as useModelPrice } from "./useModelPrice-DcNReY6Y.js";
import { u as useBatchUploadUrl } from "./useBatchUploadUrl-Wq7pvxpv.js";
import { _ as _export_sfc } from "../server.mjs";
const _imports_0 = publicAssetsURL("/tools-logo/Wan.png");
const _sfc_main = {
  __name: "WanTool",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const { showError } = useToast();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const { getPrice, formatCredits } = useModelPrice();
    const batchUploadUrl = useBatchUploadUrl();
    const modeTabToPath = {
      "text-to-video": "/home/wan/text-to-video",
      "image-to-video": "/home/wan/image-to-video",
      "video-to-video": "/home/wan/video-to-video"
    };
    const pathToMode = {
      "/home/wan/text-to-video": "text-to-video",
      "/home/wan/image-to-video": "image-to-video",
      "/home/wan/video-to-video": "video-to-video"
    };
    const mode = ref("text-to-video");
    watch(() => route.path, (path) => {
      const m = pathToMode[path];
      if (m && mode.value !== m) mode.value = m;
    }, { immediate: true });
    const formData = reactive({
      prompt: "",
      imageUrls: [],
      videoUrls: [],
      duration: "5",
      resolution: "1080p",
      multiShots: false
    });
    const imageUploadRef = ref(null);
    ref(null);
    const isUploadingImages = ref(false);
    const isUploadingVideo = ref(false);
    const result = ref(null);
    const isGenerating = ref(false);
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    async function loadDetailByRecordId(recordId) {
      if (!recordId || routeRecordId.value !== recordId) return;
      detailData.value = null;
      try {
        let data = await fetchRecordDetailOnce(recordId);
        if (routeRecordId.value !== recordId) return;
        detailData.value = data || null;
        if (data != null && Number(data.status) === 1) {
          const res = await pollRecordByStatus(recordId, { getIsCancelled: () => routeRecordId.value !== recordId });
          if (routeRecordId.value === recordId) detailData.value = res;
        }
      } catch (e) {
        console.error("Wan load record detail failed:", e);
      }
    }
    watch(() => route.query["record-id"], (recordId) => {
      if (recordId) loadDetailByRecordId(recordId);
      else detailData.value = null;
    }, { immediate: true });
    const wanPriceModelKeyMap = {
      "text-to-video": "wan-2-6-text-to-video",
      "image-to-video": "wan-2-6-image-to-video",
      "video-to-video": "wan-2-6-video-to-video"
    };
    const wanPriceText = computed(() => {
      const modelKey = wanPriceModelKeyMap[mode.value];
      if (!modelKey) return "";
      const credits = getPrice(modelKey, {
        duration: formData.duration,
        quality: formData.resolution
      });
      const str = formatCredits(credits);
      return str ? `(${str})` : "";
    });
    const getAuthToken = () => {
      return null;
    };
    async function uploadFilesToUrls(files) {
      var _a;
      if (!(files == null ? void 0 : files.length)) return [];
      const form = new FormData();
      files.forEach((f) => form.append("file", f));
      const headers = { Accept: "application/json" };
      const token = getAuthToken();
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const res = await fetch(batchUploadUrl, {
        method: "POST",
        headers,
        body: form,
        credentials: "include"
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err == null ? void 0 : err.errorMessage) || (err == null ? void 0 : err.message) || "Upload failed");
      }
      const data = await res.json();
      const urls = ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.urls) || (data == null ? void 0 : data.fileUrls) || (Array.isArray(data == null ? void 0 : data.data) ? data.data : []);
      return Array.isArray(urls) ? urls : [];
    }
    async function handleImageFiles(files) {
      var _a, _b;
      if (!(files == null ? void 0 : files.length)) {
        formData.imageUrls = [];
        return;
      }
      const list = Array.isArray(files) ? files : [files];
      isUploadingImages.value = true;
      try {
        formData.imageUrls = await uploadFilesToUrls(list);
      } catch (e) {
        showError((e == null ? void 0 : e.message) || "Upload failed");
        formData.imageUrls = [];
        (_b = (_a = imageUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingImages.value = false;
      }
    }
    const promptPlaceholder = computed(() => {
      if (mode.value === "text-to-video") return "Describe the video you want (1–5000 characters, Chinese or English).";
      return "Describe how to animate or transform the media (2–5000 characters).";
    });
    const promptHint = computed(() => {
      if (mode.value === "text-to-video") return "Min 1 character, max 5000. Supports Chinese and English.";
      return "Min 2 characters, max 5000.";
    });
    const canGenerate = computed(() => {
      const p = (formData.prompt || "").trim();
      if (mode.value === "text-to-video") return p.length >= 1 && p.length <= 5e3;
      if (mode.value === "image-to-video") return p.length >= 2 && p.length <= 5e3 && formData.imageUrls.length > 0;
      if (mode.value === "video-to-video") return p.length >= 2 && p.length <= 5e3 && formData.videoUrls.length > 0;
      return false;
    });
    const displayResult = computed(() => result.value);
    watch(mode, (m) => {
      const path = modeTabToPath[m];
      if (path && route.path !== path) router.replace(path);
      if (m === "video-to-video" && formData.duration === "15") formData.duration = "10";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wan-tool" }, _attrs))} data-v-2dbc3e7c><div class="tool-header" data-v-2dbc3e7c><div class="tool-avatar" data-v-2dbc3e7c><img${ssrRenderAttr("src", _imports_0)} alt="Wan" data-v-2dbc3e7c></div><div class="tool-details" data-v-2dbc3e7c><h3 data-v-2dbc3e7c>Wan</h3><p class="tool-description" data-v-2dbc3e7c>Wan is Alibaba&#39;s AI video model, offering affordable multi-shot 1080p generation with stable characters and synchronized native audio. Through the Wan—including T2V, I2V, and reference-guided modes—you can create up to 15-second cinematic videos with improved motion logic, consistent visuals, and production-ready quality.</p></div></div><div class="mode-tabs-wrap" data-v-2dbc3e7c><div class="mode-tabs" data-v-2dbc3e7c><div class="${ssrRenderClass([{ active: mode.value === "text-to-video" }, "mode-tab"])}" data-v-2dbc3e7c><i class="fas fa-font" data-v-2dbc3e7c></i><span data-v-2dbc3e7c>Text to Video</span></div><div class="${ssrRenderClass([{ active: mode.value === "image-to-video" }, "mode-tab"])}" data-v-2dbc3e7c><i class="fas fa-image" data-v-2dbc3e7c></i><span data-v-2dbc3e7c>Image to Video</span></div><div class="${ssrRenderClass([{ active: mode.value === "video-to-video" }, "mode-tab"])}" data-v-2dbc3e7c><i class="fas fa-video" data-v-2dbc3e7c></i><span data-v-2dbc3e7c>Video to Video</span></div></div></div><div class="main-content" data-v-2dbc3e7c><div class="config-panel" data-v-2dbc3e7c><div class="config-header" data-v-2dbc3e7c><h4 data-v-2dbc3e7c>Configuration</h4></div><form class="config-form" data-v-2dbc3e7c><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value) ? " disabled" : ""} data-v-2dbc3e7c><div class="form-group" data-v-2dbc3e7c><label for="wan-prompt" class="form-label" data-v-2dbc3e7c> Prompt <span class="required" data-v-2dbc3e7c>*</span></label><textarea id="wan-prompt" class="form-input" rows="4"${ssrRenderAttr("placeholder", promptPlaceholder.value)}${ssrRenderAttr("maxlength", 5e3)} required data-v-2dbc3e7c>${ssrInterpolate(formData.prompt)}</textarea>`);
      if (formData.prompt) {
        _push(`<div class="char-count" data-v-2dbc3e7c>${ssrInterpolate(formData.prompt.length)}/5000</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-hint" data-v-2dbc3e7c>${ssrInterpolate(promptHint.value)}</div></div>`);
      if (mode.value === "image-to-video") {
        _push(`<div class="form-group" data-v-2dbc3e7c><label class="form-label" data-v-2dbc3e7c> Image URLs <span class="required" data-v-2dbc3e7c>*</span></label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "imageUploadRef",
          ref: imageUploadRef,
          "input-id": "wan-image-upload",
          label: "",
          "upload-text": "Click to upload image(s)",
          "upload-hint": "JPEG, PNG, WebP; min 256×256px; max 10MB per image",
          "max-files": 5,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/webp",
          multiple: true,
          "onUpdate:files": handleImageFiles
        }, null, _parent));
        if (isUploadingImages.value) {
          _push(`<span class="form-hint" data-v-2dbc3e7c>Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "video-to-video") {
        _push(`<div class="form-group" data-v-2dbc3e7c><label class="form-label" data-v-2dbc3e7c> Video <span class="required" data-v-2dbc3e7c>*</span></label><input type="file" accept="video/mp4,video/quicktime,video/x-matroska" class="wan-video-input" data-v-2dbc3e7c><div class="wan-video-upload" data-v-2dbc3e7c>`);
        if (isUploadingVideo.value) {
          _push(`<div class="wan-video-uploading" data-v-2dbc3e7c><i class="fas fa-spinner fa-spin" data-v-2dbc3e7c></i> Uploading... </div>`);
        } else if (formData.videoUrls.length) {
          _push(`<div class="wan-video-preview-wrap" data-v-2dbc3e7c><video${ssrRenderAttr("src", formData.videoUrls[0])} class="wan-video-preview" controls data-v-2dbc3e7c></video><button type="button" class="wan-video-remove" title="Remove" data-v-2dbc3e7c>×</button></div>`);
        } else {
          _push(`<div class="wan-video-placeholder" data-v-2dbc3e7c><i class="fas fa-cloud-upload-alt" data-v-2dbc3e7c></i><span data-v-2dbc3e7c>Click to upload video (MP4, MOV, MKV; max 10MB)</span></div>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-2dbc3e7c><label class="form-label" data-v-2dbc3e7c>Duration</label><div class="tab-group" data-v-2dbc3e7c><button type="button" class="${ssrRenderClass([{ active: formData.duration === "5" }, "tab-option"])}" data-v-2dbc3e7c>5s</button><button type="button" class="${ssrRenderClass([{ active: formData.duration === "10" }, "tab-option"])}" data-v-2dbc3e7c>10s</button>`);
      if (mode.value !== "video-to-video") {
        _push(`<button type="button" class="${ssrRenderClass([{ active: formData.duration === "15" }, "tab-option"])}" data-v-2dbc3e7c>15s</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="form-group" data-v-2dbc3e7c><label class="form-label" data-v-2dbc3e7c>Resolution</label><div class="tab-group" data-v-2dbc3e7c><button type="button" class="${ssrRenderClass([{ active: formData.resolution === "720p" }, "tab-option"])}" data-v-2dbc3e7c>720p</button><button type="button" class="${ssrRenderClass([{ active: formData.resolution === "1080p" }, "tab-option"])}" data-v-2dbc3e7c>1080p</button></div></div><div class="form-group" data-v-2dbc3e7c><label class="checkbox-label" data-v-2dbc3e7c><input${ssrIncludeBooleanAttr(Array.isArray(formData.multiShots) ? ssrLooseContain(formData.multiShots, null) : formData.multiShots) ? " checked" : ""} type="checkbox" data-v-2dbc3e7c><span data-v-2dbc3e7c>Multi shots (multiple shots with transitions)</span></label><div class="form-hint" data-v-2dbc3e7c>When unchecked, generates a single continuous shot.</div></div><div class="form-actions" data-v-2dbc3e7c><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canGenerate.value || isGenerating.value) ? " disabled" : ""} data-v-2dbc3e7c>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-2dbc3e7c></i>`);
      } else {
        _push(`<i class="fas fa-play" data-v-2dbc3e7c></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Video")} `);
      if (wanPriceText.value) {
        _push(`<span class="price-tag" data-v-2dbc3e7c>${ssrInterpolate(wanPriceText.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></fieldset></form></div><div class="result-panel" data-v-2dbc3e7c>`);
      if (isDetailView.value && ((_a = detailData.value) == null ? void 0 : _a.status) === 3) {
        _push(`<div class="detail-failure-state" data-v-2dbc3e7c><div class="failure-icon" data-v-2dbc3e7c><i class="fas fa-exclamation-circle" data-v-2dbc3e7c></i></div><p class="failure-message" data-v-2dbc3e7c>Generation failed. You can try again with different parameters.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || detailData.value.status === 1)) {
        _push(`<div class="detail-loading-state" data-v-2dbc3e7c><i class="fas fa-spinner fa-spin detail-spinner" data-v-2dbc3e7c></i><p data-v-2dbc3e7c>Generating...</p></div>`);
      } else if (!displayResult.value) {
        _push(`<div class="empty-state" data-v-2dbc3e7c><h4 data-v-2dbc3e7c>No video generated yet</h4><p data-v-2dbc3e7c>Fill in the form and click &quot;Generate Video&quot; to start.</p></div>`);
      } else {
        _push(`<div class="result-display" data-v-2dbc3e7c><div class="video-result" data-v-2dbc3e7c><div class="video-player" data-v-2dbc3e7c>`);
        if (displayResult.value.videoUrl) {
          _push(`<video${ssrRenderAttr("src", displayResult.value.videoUrl)} controls class="video-element" data-v-2dbc3e7c></video>`);
        } else {
          _push(`<div class="video-placeholder" data-v-2dbc3e7c><i class="fas fa-spinner fa-spin" data-v-2dbc3e7c></i><p data-v-2dbc3e7c>Generating...</p></div>`);
        }
        _push(`</div><div class="video-actions" data-v-2dbc3e7c>`);
        if (displayResult.value.videoUrl) {
          _push(`<button class="action-btn" data-v-2dbc3e7c><i class="fas fa-download" data-v-2dbc3e7c></i> Download </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/WanTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const WanTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2dbc3e7c"]]);
export {
  WanTool as W
};
//# sourceMappingURL=WanTool-D9OMkrdx.js.map
