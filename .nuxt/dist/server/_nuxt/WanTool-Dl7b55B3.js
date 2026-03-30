import { ref, watch, reactive, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderList, ssrLooseContain } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { useRouter, useRoute } from "vue-router";
import { U as UploadImage } from "./UploadImage-D6DL1USQ.js";
import { u as useToast } from "./useToast-CATlmXE8.js";
import { u as useApi } from "./useApi-1a9EtG7k.js";
import { u as useRecordPolling } from "./useRecordPolling-QI_mIuwF.js";
import { u as useModelPrice } from "./useModelPrice-DCrt0_k3.js";
import { u as useBatchUploadUrl } from "./useBatchUploadUrl-_AVZ_-oO.js";
import { _ as _export_sfc } from "../server.mjs";
const _imports_0 = publicAssetsURL("/tools-logo/Wan.png");
const _sfc_main = {
  __name: "WanTool",
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
    function fillFormFromOriginalData(o) {
      if (!o || typeof o !== "object") return;
      if (o.prompt != null) formData.prompt = String(o.prompt);
      if (o.duration != null) formData.duration = String(o.duration);
      if (o.resolution) formData.resolution = String(o.resolution);
      if ("multiShots" in o) formData.multiShots = !!o.multiShots;
      if (Array.isArray(o.imageUrls)) formData.imageUrls = [...o.imageUrls];
      else if (Array.isArray(o.image_urls)) formData.imageUrls = [...o.image_urls];
      if (Array.isArray(o.videoUrls)) formData.videoUrls = [...o.videoUrls];
      else if (Array.isArray(o.video_urls)) formData.videoUrls = [...o.video_urls];
    }
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
        console.error("Wan load record detail failed:", e);
      }
    }
    watch(() => route.query["record-id"], (recordId) => {
      if (recordId) loadDetailByRecordId(recordId);
      else detailData.value = null;
    }, { immediate: true });
    const discountText = computed(() => {
      const rate = Number((discount == null ? void 0 : discount.value) ?? 1);
      if (Number.isNaN(rate) || rate <= 0 || rate === 1) return "";
      const percent = (rate * 100).toFixed(0);
      return ` · ${percent}%`;
    });
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
      if (!str) return "";
      return `· ${str} credits${discountText.value}`;
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
    const displayResult = computed(() => {
      if (isDetailView.value && detailData.value && Number(detailData.value.status) === 2) {
        const url = pickDetailVideoUrl(detailData.value);
        if (url) return { videoUrl: url };
      }
      return result.value;
    });
    watch(mode, (m) => {
      const path = modeTabToPath[m];
      if (path && route.path !== path) router.replace(path);
      if (m === "video-to-video" && formData.duration === "15") formData.duration = "10";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wan-tool" }, _attrs))} data-v-f0e1cd1c><div class="tool-header" data-v-f0e1cd1c><div class="tool-avatar" data-v-f0e1cd1c><img${ssrRenderAttr("src", _imports_0)} alt="Wan" data-v-f0e1cd1c></div><div class="tool-details" data-v-f0e1cd1c><h3 data-v-f0e1cd1c>Wan</h3><p class="tool-description" data-v-f0e1cd1c>Wan is Alibaba&#39;s AI video model, offering affordable multi-shot 1080p generation with stable characters and synchronized native audio. Through the Wan—including T2V, I2V, and reference-guided modes—you can create up to 15-second cinematic videos with improved motion logic, consistent visuals, and production-ready quality.</p></div></div><div class="mode-tabs-wrap" data-v-f0e1cd1c><div class="mode-tabs" data-v-f0e1cd1c><div class="${ssrRenderClass([{ active: mode.value === "text-to-video" }, "mode-tab"])}" data-v-f0e1cd1c><i class="fas fa-font" data-v-f0e1cd1c></i><span data-v-f0e1cd1c>Text to Video</span></div><div class="${ssrRenderClass([{ active: mode.value === "image-to-video" }, "mode-tab"])}" data-v-f0e1cd1c><i class="fas fa-image" data-v-f0e1cd1c></i><span data-v-f0e1cd1c>Image to Video</span></div><div class="${ssrRenderClass([{ active: mode.value === "video-to-video" }, "mode-tab"])}" data-v-f0e1cd1c><i class="fas fa-video" data-v-f0e1cd1c></i><span data-v-f0e1cd1c>Video to Video</span></div></div></div><div class="main-content" data-v-f0e1cd1c><div class="config-panel" data-v-f0e1cd1c><div class="config-header" data-v-f0e1cd1c><h4 data-v-f0e1cd1c>Configuration</h4></div><form class="config-form" data-v-f0e1cd1c><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-f0e1cd1c><div class="form-group" data-v-f0e1cd1c><label for="wan-prompt" class="form-label" data-v-f0e1cd1c> Prompt <span class="required" data-v-f0e1cd1c>*</span></label><textarea id="wan-prompt" class="form-input" rows="4"${ssrRenderAttr("placeholder", promptPlaceholder.value)}${ssrRenderAttr("maxlength", 5e3)} required data-v-f0e1cd1c>${ssrInterpolate(formData.prompt)}</textarea>`);
      if (formData.prompt) {
        _push(`<div class="char-count" data-v-f0e1cd1c>${ssrInterpolate(formData.prompt.length)}/5000</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-hint" data-v-f0e1cd1c>${ssrInterpolate(promptHint.value)}</div></div>`);
      if (mode.value === "image-to-video") {
        _push(`<div class="form-group" data-v-f0e1cd1c><label class="form-label" data-v-f0e1cd1c> Image URLs <span class="required" data-v-f0e1cd1c>*</span></label>`);
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
          _push(`<span class="form-hint" data-v-f0e1cd1c>Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        if (isDetailView.value && mode.value === "image-to-video" && ((_a = formData.imageUrls) == null ? void 0 : _a.length)) {
          _push(`<div class="detail-ref-urls" data-v-f0e1cd1c><span class="form-label" data-v-f0e1cd1c>Input images (this task)</span><div class="detail-ref-urls-links" data-v-f0e1cd1c><!--[-->`);
          ssrRenderList(formData.imageUrls, (u, idx) => {
            _push(`<a${ssrRenderAttr("href", u)} target="_blank" rel="noopener noreferrer" class="detail-ref-link" data-v-f0e1cd1c>Image ${ssrInterpolate(idx + 1)}</a>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "video-to-video") {
        _push(`<div class="form-group" data-v-f0e1cd1c><label class="form-label" data-v-f0e1cd1c> Video <span class="required" data-v-f0e1cd1c>*</span></label><input type="file" accept="video/mp4,video/quicktime,video/x-matroska" class="wan-video-input" data-v-f0e1cd1c><div class="wan-video-upload" data-v-f0e1cd1c>`);
        if (isUploadingVideo.value) {
          _push(`<div class="wan-video-uploading" data-v-f0e1cd1c><i class="fas fa-spinner fa-spin" data-v-f0e1cd1c></i> Uploading... </div>`);
        } else if (formData.videoUrls.length) {
          _push(`<div class="wan-video-preview-wrap" data-v-f0e1cd1c><video${ssrRenderAttr("src", formData.videoUrls[0])} class="wan-video-preview" controls data-v-f0e1cd1c></video><button type="button" class="wan-video-remove" title="Remove" data-v-f0e1cd1c>×</button></div>`);
        } else {
          _push(`<div class="wan-video-placeholder" data-v-f0e1cd1c><i class="fas fa-cloud-upload-alt" data-v-f0e1cd1c></i><span data-v-f0e1cd1c>Click to upload video (MP4, MOV, MKV; max 10MB)</span></div>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-f0e1cd1c><label class="form-label" data-v-f0e1cd1c>Duration</label><div class="tab-group" data-v-f0e1cd1c><button type="button" class="${ssrRenderClass([{ active: formData.duration === "5" }, "tab-option"])}" data-v-f0e1cd1c>5s</button><button type="button" class="${ssrRenderClass([{ active: formData.duration === "10" }, "tab-option"])}" data-v-f0e1cd1c>10s</button>`);
      if (mode.value !== "video-to-video") {
        _push(`<button type="button" class="${ssrRenderClass([{ active: formData.duration === "15" }, "tab-option"])}" data-v-f0e1cd1c>15s</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="form-group" data-v-f0e1cd1c><label class="form-label" data-v-f0e1cd1c>Resolution</label><div class="tab-group" data-v-f0e1cd1c><button type="button" class="${ssrRenderClass([{ active: formData.resolution === "720p" }, "tab-option"])}" data-v-f0e1cd1c>720p</button><button type="button" class="${ssrRenderClass([{ active: formData.resolution === "1080p" }, "tab-option"])}" data-v-f0e1cd1c>1080p</button></div></div><div class="form-group" data-v-f0e1cd1c><label class="checkbox-label" data-v-f0e1cd1c><input${ssrIncludeBooleanAttr(Array.isArray(formData.multiShots) ? ssrLooseContain(formData.multiShots, null) : formData.multiShots) ? " checked" : ""} type="checkbox" data-v-f0e1cd1c><span data-v-f0e1cd1c>Multi shots (multiple shots with transitions)</span></label><div class="form-hint" data-v-f0e1cd1c>When unchecked, generates a single continuous shot.</div></div><div class="form-actions" data-v-f0e1cd1c><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canGenerate.value || isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-f0e1cd1c>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-f0e1cd1c></i>`);
      } else {
        _push(`<i class="fas fa-play" data-v-f0e1cd1c></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Video")} `);
      if (wanPriceText.value) {
        _push(`<span class="price-tag" data-v-f0e1cd1c>${ssrInterpolate(wanPriceText.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></fieldset></form></div><div class="result-panel" data-v-f0e1cd1c>`);
      if (isDetailView.value && Number((_b = detailData.value) == null ? void 0 : _b.status) === 3) {
        _push(`<div class="detail-failure-state" data-v-f0e1cd1c><div class="failure-icon" data-v-f0e1cd1c><i class="fas fa-exclamation-circle" data-v-f0e1cd1c></i></div><p class="failure-message" data-v-f0e1cd1c>Generation failed. You can try again with different parameters.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || [0, 1].includes(Number(detailData.value.status)))) {
        _push(`<div class="detail-loading-state" data-v-f0e1cd1c><i class="fas fa-spinner fa-spin detail-spinner" data-v-f0e1cd1c></i><p data-v-f0e1cd1c>Generating...</p></div>`);
      } else if (!displayResult.value) {
        _push(`<div class="empty-state" data-v-f0e1cd1c><h4 data-v-f0e1cd1c>No video generated yet</h4><p data-v-f0e1cd1c>Fill in the form and click &quot;Generate Video&quot; to start.</p></div>`);
      } else {
        _push(`<div class="result-display" data-v-f0e1cd1c><div class="video-result" data-v-f0e1cd1c><div class="video-player" data-v-f0e1cd1c>`);
        if (displayResult.value.videoUrl) {
          _push(`<video${ssrRenderAttr("src", displayResult.value.videoUrl)} controls class="video-element" data-v-f0e1cd1c></video>`);
        } else {
          _push(`<div class="video-placeholder" data-v-f0e1cd1c><i class="fas fa-spinner fa-spin" data-v-f0e1cd1c></i><p data-v-f0e1cd1c>Generating...</p></div>`);
        }
        _push(`</div><div class="video-actions" data-v-f0e1cd1c>`);
        if (displayResult.value.videoUrl) {
          _push(`<button class="action-btn" data-v-f0e1cd1c><i class="fas fa-download" data-v-f0e1cd1c></i> Download </button>`);
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
const WanTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f0e1cd1c"]]);
export {
  WanTool as W
};
//# sourceMappingURL=WanTool-Dl7b55B3.js.map
