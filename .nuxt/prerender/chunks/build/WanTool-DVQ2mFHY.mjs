import { ref, watch, reactive, computed, mergeProps, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrLooseContain } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { useRouter, useRoute } from 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import { U as UploadImage } from './UploadImage-D6DL1USQ.mjs';
import { u as useToast } from './useToast-CATlmXE8.mjs';
import { u as useApi } from './useApi-1a9EtG7k.mjs';
import { u as useRecordPolling } from './useRecordPolling-QI_mIuwF.mjs';
import { u as useModelPrice } from './useModelPrice-DCrt0_k3.mjs';
import { u as useBatchUploadUrl } from './useBatchUploadUrl-_AVZ_-oO.mjs';
import { _ as _export_sfc } from './server.mjs';

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
    const discountText = computed(() => {
      var _a;
      const rate = Number((_a = discount == null ? void 0 : discount.value) != null ? _a : 1);
      if (Number.isNaN(rate) || rate <= 0 || rate === 1) return "";
      const percent = (rate * 100).toFixed(0);
      return ` \xB7 ${percent}%`;
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
      return `\xB7 ${str} credits${discountText.value}`;
    });
    async function uploadFilesToUrls(files) {
      var _a;
      if (!(files == null ? void 0 : files.length)) return [];
      const form = new FormData();
      files.forEach((f) => form.append("file", f));
      const headers = { Accept: "application/json" };
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
      if (mode.value === "text-to-video") return "Describe the video you want (1\u20135000 characters, Chinese or English).";
      return "Describe how to animate or transform the media (2\u20135000 characters).";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wan-tool" }, _attrs))} data-v-2bdccb58><div class="tool-header" data-v-2bdccb58><div class="tool-avatar" data-v-2bdccb58><img${ssrRenderAttr("src", _imports_0)} alt="Wan" data-v-2bdccb58></div><div class="tool-details" data-v-2bdccb58><h3 data-v-2bdccb58>Wan</h3><p class="tool-description" data-v-2bdccb58>Wan is Alibaba&#39;s AI video model, offering affordable multi-shot 1080p generation with stable characters and synchronized native audio. Through the Wan\u2014including T2V, I2V, and reference-guided modes\u2014you can create up to 15-second cinematic videos with improved motion logic, consistent visuals, and production-ready quality.</p></div></div><div class="mode-tabs-wrap" data-v-2bdccb58><div class="mode-tabs" data-v-2bdccb58><div class="${ssrRenderClass([{ active: mode.value === "text-to-video" }, "mode-tab"])}" data-v-2bdccb58><i class="fas fa-font" data-v-2bdccb58></i><span data-v-2bdccb58>Text to Video</span></div><div class="${ssrRenderClass([{ active: mode.value === "image-to-video" }, "mode-tab"])}" data-v-2bdccb58><i class="fas fa-image" data-v-2bdccb58></i><span data-v-2bdccb58>Image to Video</span></div><div class="${ssrRenderClass([{ active: mode.value === "video-to-video" }, "mode-tab"])}" data-v-2bdccb58><i class="fas fa-video" data-v-2bdccb58></i><span data-v-2bdccb58>Video to Video</span></div></div></div><div class="main-content" data-v-2bdccb58><div class="config-panel" data-v-2bdccb58><div class="config-header" data-v-2bdccb58><h4 data-v-2bdccb58>Configuration</h4></div><form class="config-form" data-v-2bdccb58><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-2bdccb58><div class="form-group" data-v-2bdccb58><label for="wan-prompt" class="form-label" data-v-2bdccb58> Prompt <span class="required" data-v-2bdccb58>*</span></label><textarea id="wan-prompt" class="form-input" rows="4"${ssrRenderAttr("placeholder", promptPlaceholder.value)}${ssrRenderAttr("maxlength", 5e3)} required data-v-2bdccb58>${ssrInterpolate(formData.prompt)}</textarea>`);
      if (formData.prompt) {
        _push(`<div class="char-count" data-v-2bdccb58>${ssrInterpolate(formData.prompt.length)}/5000</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-hint" data-v-2bdccb58>${ssrInterpolate(promptHint.value)}</div></div>`);
      if (mode.value === "image-to-video") {
        _push(`<div class="form-group" data-v-2bdccb58><label class="form-label" data-v-2bdccb58> Image URLs <span class="required" data-v-2bdccb58>*</span></label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "imageUploadRef",
          ref: imageUploadRef,
          "input-id": "wan-image-upload",
          label: "",
          "upload-text": "Click to upload image(s)",
          "upload-hint": "JPEG, PNG, WebP; min 256\xD7256px; max 10MB per image",
          "max-files": 5,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/webp",
          multiple: true,
          "onUpdate:files": handleImageFiles
        }, null, _parent));
        if (isUploadingImages.value) {
          _push(`<span class="form-hint" data-v-2bdccb58>Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "video-to-video") {
        _push(`<div class="form-group" data-v-2bdccb58><label class="form-label" data-v-2bdccb58> Video <span class="required" data-v-2bdccb58>*</span></label><input type="file" accept="video/mp4,video/quicktime,video/x-matroska" class="wan-video-input" data-v-2bdccb58><div class="wan-video-upload" data-v-2bdccb58>`);
        if (isUploadingVideo.value) {
          _push(`<div class="wan-video-uploading" data-v-2bdccb58><i class="fas fa-spinner fa-spin" data-v-2bdccb58></i> Uploading... </div>`);
        } else if (formData.videoUrls.length) {
          _push(`<div class="wan-video-preview-wrap" data-v-2bdccb58><video${ssrRenderAttr("src", formData.videoUrls[0])} class="wan-video-preview" controls data-v-2bdccb58></video><button type="button" class="wan-video-remove" title="Remove" data-v-2bdccb58>\xD7</button></div>`);
        } else {
          _push(`<div class="wan-video-placeholder" data-v-2bdccb58><i class="fas fa-cloud-upload-alt" data-v-2bdccb58></i><span data-v-2bdccb58>Click to upload video (MP4, MOV, MKV; max 10MB)</span></div>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-2bdccb58><label class="form-label" data-v-2bdccb58>Duration</label><div class="tab-group" data-v-2bdccb58><button type="button" class="${ssrRenderClass([{ active: formData.duration === "5" }, "tab-option"])}" data-v-2bdccb58>5s</button><button type="button" class="${ssrRenderClass([{ active: formData.duration === "10" }, "tab-option"])}" data-v-2bdccb58>10s</button>`);
      if (mode.value !== "video-to-video") {
        _push(`<button type="button" class="${ssrRenderClass([{ active: formData.duration === "15" }, "tab-option"])}" data-v-2bdccb58>15s</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="form-group" data-v-2bdccb58><label class="form-label" data-v-2bdccb58>Resolution</label><div class="tab-group" data-v-2bdccb58><button type="button" class="${ssrRenderClass([{ active: formData.resolution === "720p" }, "tab-option"])}" data-v-2bdccb58>720p</button><button type="button" class="${ssrRenderClass([{ active: formData.resolution === "1080p" }, "tab-option"])}" data-v-2bdccb58>1080p</button></div></div><div class="form-group" data-v-2bdccb58><label class="checkbox-label" data-v-2bdccb58><input${ssrIncludeBooleanAttr(Array.isArray(formData.multiShots) ? ssrLooseContain(formData.multiShots, null) : formData.multiShots) ? " checked" : ""} type="checkbox" data-v-2bdccb58><span data-v-2bdccb58>Multi shots (multiple shots with transitions)</span></label><div class="form-hint" data-v-2bdccb58>When unchecked, generates a single continuous shot.</div></div><div class="form-actions" data-v-2bdccb58><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canGenerate.value || isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-2bdccb58>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-2bdccb58></i>`);
      } else {
        _push(`<i class="fas fa-play" data-v-2bdccb58></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Video")} `);
      if (wanPriceText.value) {
        _push(`<span class="price-tag" data-v-2bdccb58>${ssrInterpolate(wanPriceText.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></fieldset></form></div><div class="result-panel" data-v-2bdccb58>`);
      if (isDetailView.value && ((_a = detailData.value) == null ? void 0 : _a.status) === 3) {
        _push(`<div class="detail-failure-state" data-v-2bdccb58><div class="failure-icon" data-v-2bdccb58><i class="fas fa-exclamation-circle" data-v-2bdccb58></i></div><p class="failure-message" data-v-2bdccb58>Generation failed. You can try again with different parameters.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || detailData.value.status === 1)) {
        _push(`<div class="detail-loading-state" data-v-2bdccb58><i class="fas fa-spinner fa-spin detail-spinner" data-v-2bdccb58></i><p data-v-2bdccb58>Generating...</p></div>`);
      } else if (!displayResult.value) {
        _push(`<div class="empty-state" data-v-2bdccb58><h4 data-v-2bdccb58>No video generated yet</h4><p data-v-2bdccb58>Fill in the form and click &quot;Generate Video&quot; to start.</p></div>`);
      } else {
        _push(`<div class="result-display" data-v-2bdccb58><div class="video-result" data-v-2bdccb58><div class="video-player" data-v-2bdccb58>`);
        if (displayResult.value.videoUrl) {
          _push(`<video${ssrRenderAttr("src", displayResult.value.videoUrl)} controls class="video-element" data-v-2bdccb58></video>`);
        } else {
          _push(`<div class="video-placeholder" data-v-2bdccb58><i class="fas fa-spinner fa-spin" data-v-2bdccb58></i><p data-v-2bdccb58>Generating...</p></div>`);
        }
        _push(`</div><div class="video-actions" data-v-2bdccb58>`);
        if (displayResult.value.videoUrl) {
          _push(`<button class="action-btn" data-v-2bdccb58><i class="fas fa-download" data-v-2bdccb58></i> Download </button>`);
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
const WanTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2bdccb58"]]);

export { WanTool as W };
//# sourceMappingURL=WanTool-DVQ2mFHY.mjs.map
