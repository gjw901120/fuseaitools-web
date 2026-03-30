import { ref, watch, reactive, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { useRouter, useRoute } from "vue-router";
import { U as UploadImage } from "./UploadImage-D6DL1USQ.js";
import { u as useToast } from "./useToast-CATlmXE8.js";
import { u as useApi } from "./useApi-1a9EtG7k.js";
import { u as useRecordPolling } from "./useRecordPolling-QI_mIuwF.js";
import { u as useModelPrice } from "./useModelPrice-DCrt0_k3.js";
import { u as useBatchUploadUrl } from "./useBatchUploadUrl-_AVZ_-oO.js";
import { _ as _export_sfc } from "../server.mjs";
const _imports_0 = publicAssetsURL("/tools-logo/Hailuo.png");
const _sfc_main = {
  __name: "HailuoTool",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const { showError } = useToast();
    useApi();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const { getPrice, formatCredits, discount } = useModelPrice();
    const batchUploadUrl = useBatchUploadUrl();
    const modeTabToPath = {
      "image-to-video-pro": "/home/hailuo/image-to-video-pro",
      "image-to-video-standard": "/home/hailuo/image-to-video-standard"
    };
    const pathToMode = {
      "/home/hailuo/image-to-video-pro": "image-to-video-pro",
      "/home/hailuo/image-to-video-standard": "image-to-video-standard"
    };
    const mode = ref("image-to-video-pro");
    watch(() => route.path, (path) => {
      const m = pathToMode[path];
      if (m && mode.value !== m) mode.value = m;
    }, { immediate: true });
    const formData = reactive({
      prompt: "",
      imageUrl: "",
      duration: "6",
      resolution: "768P"
    });
    const imageUploadRef = ref(null);
    const isUploadingImage = ref(false);
    const result = ref(null);
    const isGenerating = ref(false);
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    function fillFormFromOriginalData(o) {
      if (!o || typeof o !== "object") return;
      if (o.prompt != null) formData.prompt = String(o.prompt);
      if (o.imageUrl) formData.imageUrl = String(o.imageUrl);
      if (o.duration != null) formData.duration = String(o.duration);
      if (o.resolution) {
        const r = String(o.resolution);
        formData.resolution = r.toUpperCase() === "1080P" || r.toLowerCase() === "1080p" ? "1080P" : "768P";
      }
    }
    async function loadDetailByRecordId(recordId) {
      if (!recordId || routeRecordId.value !== recordId) return;
      detailData.value = null;
      try {
        let data = await fetchRecordDetailOnce(recordId);
        if (routeRecordId.value !== recordId) return;
        detailData.value = data || null;
        if (data == null ? void 0 : data.originalData) fillFormFromOriginalData(data.originalData);
        const status = Number(data == null ? void 0 : data.status);
        if (data == null || status === 0 || status === 1) {
          const res = await pollRecordByStatus(recordId, { getIsCancelled: () => routeRecordId.value !== recordId });
          if (routeRecordId.value === recordId) {
            detailData.value = res;
            if (res == null ? void 0 : res.originalData) fillFormFromOriginalData(res.originalData);
          }
        }
      } catch (e) {
        console.error("Hailuo load record detail failed:", e);
      }
    }
    watch(() => route.query["record-id"], (recordId) => {
      if (recordId) loadDetailByRecordId(recordId);
      else detailData.value = null;
    }, { immediate: true });
    async function uploadFileToUrl(file) {
      var _a, _b;
      if (!file) return "";
      const form = new FormData();
      form.append("file", file);
      const headers = { Accept: "application/json" };
      const token = typeof localStorage !== "undefined" ? localStorage.getItem("auth_token") : null;
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
      const url = Array.isArray(urls) && urls.length ? urls[0] : ((_b = data == null ? void 0 : data.data) == null ? void 0 : _b.url) || "";
      return typeof url === "string" ? url : "";
    }
    async function handleImageFile(files) {
      var _a, _b;
      if (!(files == null ? void 0 : files.length)) {
        formData.imageUrl = "";
        return;
      }
      const file = Array.isArray(files) ? files[0] : files;
      isUploadingImage.value = true;
      try {
        formData.imageUrl = await uploadFileToUrl(file);
      } catch (e) {
        showError((e == null ? void 0 : e.message) || "Upload failed");
        formData.imageUrl = "";
        (_b = (_a = imageUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingImage.value = false;
      }
    }
    const canGenerate = computed(() => {
      const p = (formData.prompt || "").trim();
      return p.length >= 1 && p.length <= 5e3 && !!formData.imageUrl;
    });
    function pickDetailVideoUrl(d) {
      if (!d || typeof d !== "object") return "";
      let url = d.outputUrl || d.videoUrl;
      if (url) return typeof url === "string" ? url : (url == null ? void 0 : url.url) || "";
      const ou = d.outputUrls;
      if (typeof ou === "string" && ou) return ou;
      if (Array.isArray(ou) && ou.length) {
        const first = ou[0];
        return typeof first === "string" ? first : (first == null ? void 0 : first.url) || "";
      }
      return "";
    }
    const displayResult = computed(() => {
      if (isDetailView.value && detailData.value && Number(detailData.value.status) === 2) {
        const url = pickDetailVideoUrl(detailData.value);
        return url ? { videoUrl: url } : result.value;
      }
      return result.value;
    });
    const discountText = computed(() => {
      const rate = Number((discount == null ? void 0 : discount.value) ?? 1);
      if (Number.isNaN(rate) || rate <= 0 || rate === 1) return "";
      const percent = (rate * 100).toFixed(0);
      return ` · ${percent}%`;
    });
    const hailuoPriceText = computed(() => {
      const modelKey = mode.value === "image-to-video-pro" ? "hailuo-2-3-image-to-video-pro" : "hailuo-2-3-image-to-video-standard";
      const durationNum = Number(formData.duration) || 0;
      const quality = String(formData.resolution || "").toLowerCase();
      const credits = getPrice(modelKey, {
        duration: durationNum,
        quality,
        scene: "generate"
      });
      const str = formatCredits(credits);
      if (!str) return "";
      return `· ${str} credits${discountText.value}`;
    });
    watch(mode, (m) => {
      const path = modeTabToPath[m];
      if (path && route.path !== path) router.replace(path);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "hailuo-tool" }, _attrs))} data-v-932dc244><div class="tool-header" data-v-932dc244><div class="tool-avatar" data-v-932dc244><img${ssrRenderAttr("src", _imports_0)} alt="Hailuo" data-v-932dc244></div><div class="tool-details" data-v-932dc244><h3 data-v-932dc244>Hailuo</h3><p class="tool-description" data-v-932dc244>Hailuo is MiniMax&#39;s high-fidelity AI video generation model designed to create realistic motion, expressive characters, and cinematic visuals. It supports both text-to-video and image-to-video, handling complex movements, lighting changes, and detailed facial expressions with stability and consistency.</p></div></div><div class="mode-tabs-wrap" data-v-932dc244><div class="mode-tabs" data-v-932dc244><div class="${ssrRenderClass([{ active: mode.value === "image-to-video-pro" }, "mode-tab"])}" data-v-932dc244><i class="fas fa-image" data-v-932dc244></i><span data-v-932dc244>image-to-video-pro</span></div><div class="${ssrRenderClass([{ active: mode.value === "image-to-video-standard" }, "mode-tab"])}" data-v-932dc244><i class="fas fa-image" data-v-932dc244></i><span data-v-932dc244>image-to-video-standard</span></div></div></div><div class="main-content" data-v-932dc244><div class="config-panel" data-v-932dc244><div class="config-header" data-v-932dc244><h4 data-v-932dc244>Configuration</h4></div><form class="config-form" data-v-932dc244><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-932dc244><div class="form-group" data-v-932dc244><label for="hailuo-prompt" class="form-label" data-v-932dc244> Prompt <span class="required" data-v-932dc244>*</span></label><textarea id="hailuo-prompt" class="form-input" rows="4" placeholder="Text prompt describing the desired video animation (max 5000 characters)"${ssrRenderAttr("maxlength", 5e3)} required data-v-932dc244>${ssrInterpolate(formData.prompt)}</textarea>`);
      if (formData.prompt) {
        _push(`<div class="char-count" data-v-932dc244>${ssrInterpolate(formData.prompt.length)}/5000</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-932dc244><label class="form-label" data-v-932dc244> Input Image <span class="required" data-v-932dc244>*</span></label>`);
      _push(ssrRenderComponent(UploadImage, {
        ref_key: "imageUploadRef",
        ref: imageUploadRef,
        "input-id": "hailuo-image-upload",
        label: "",
        "upload-text": "Click to upload image",
        "upload-hint": "JPEG, PNG, WebP; max 10MB",
        "max-files": 1,
        "max-file-size": 10 * 1024 * 1024,
        accept: "image/jpeg,image/png,image/webp",
        multiple: false,
        "onUpdate:files": handleImageFile
      }, null, _parent));
      if (isUploadingImage.value) {
        _push(`<span class="form-hint" data-v-932dc244>Uploading...</span>`);
      } else {
        _push(`<!---->`);
      }
      if (isDetailView.value && formData.imageUrl) {
        _push(`<div class="detail-ref-urls" data-v-932dc244><span class="form-label" data-v-932dc244>Input image (this task)</span><div class="detail-ref-urls-links" data-v-932dc244><a${ssrRenderAttr("href", formData.imageUrl)} target="_blank" rel="noopener noreferrer" class="detail-ref-link" data-v-932dc244>Open image</a></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-932dc244><label class="form-label" data-v-932dc244>Duration</label><div class="tab-group" data-v-932dc244><button type="button" class="${ssrRenderClass([{ active: formData.duration === "6" }, "tab-option"])}" data-v-932dc244>6s</button><button type="button" class="${ssrRenderClass([{ active: formData.duration === "10" }, "tab-option"])}" data-v-932dc244>10s</button></div><div class="form-hint" data-v-932dc244>10 seconds videos are not supported for 1080P resolution.</div></div><div class="form-group" data-v-932dc244><label class="form-label" data-v-932dc244>Resolution</label><div class="tab-group" data-v-932dc244><button type="button" class="${ssrRenderClass([{ active: formData.resolution === "768P" }, "tab-option"])}" data-v-932dc244>768P</button><button type="button" class="${ssrRenderClass([{ active: formData.resolution === "1080P", disabled: formData.duration === "10" }, "tab-option"])}"${ssrIncludeBooleanAttr(formData.duration === "10") ? " disabled" : ""} data-v-932dc244>1080P</button></div></div><div class="form-actions" data-v-932dc244><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canGenerate.value || isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-932dc244>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-932dc244></i>`);
      } else {
        _push(`<i class="fas fa-play" data-v-932dc244></i>`);
      }
      if (isGenerating.value) {
        _push(`<span data-v-932dc244>Generating...</span>`);
      } else {
        _push(`<span data-v-932dc244> Generate Video `);
        if (hailuoPriceText.value) {
          _push(`<span class="price-tag" data-v-932dc244>${ssrInterpolate(hailuoPriceText.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      }
      _push(`</button></div></fieldset></form></div><div class="result-panel" data-v-932dc244>`);
      if (isDetailView.value && Number((_a = detailData.value) == null ? void 0 : _a.status) === 3) {
        _push(`<div class="detail-failure-state" data-v-932dc244><div class="failure-icon" data-v-932dc244><i class="fas fa-exclamation-circle" data-v-932dc244></i></div><p class="failure-message" data-v-932dc244>Generation failed. You can try again with different parameters.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || [0, 1].includes(Number(detailData.value.status)))) {
        _push(`<div class="detail-loading-state" data-v-932dc244><i class="fas fa-spinner fa-spin detail-spinner" data-v-932dc244></i><p data-v-932dc244>Generating...</p></div>`);
      } else if ((_b = displayResult.value) == null ? void 0 : _b.videoUrl) {
        _push(`<div class="video-result" data-v-932dc244><div class="video-player" data-v-932dc244><video${ssrRenderAttr("src", displayResult.value.videoUrl)} controls class="video-element" data-v-932dc244></video></div><div class="video-actions" data-v-932dc244><button class="action-btn" data-v-932dc244><i class="fas fa-download" data-v-932dc244></i> Download </button></div></div>`);
      } else {
        _push(`<div class="empty-state" data-v-932dc244><h4 data-v-932dc244>No video generated yet</h4><p data-v-932dc244>Fill in the form and click &quot;Generate Video&quot; to start.</p></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/HailuoTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HailuoTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-932dc244"]]);
export {
  HailuoTool as H
};
//# sourceMappingURL=HailuoTool-fdY1TWiN.js.map
