import { ref, watch, reactive, computed, mergeProps, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrLooseContain, ssrLooseEqual } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { useRouter, useRoute } from 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import { U as UploadImage } from './UploadImage-CdWm1sTQ.mjs';
import { u as useToast } from './useToast-CATlmXE8.mjs';
import { u as useRecordPolling } from './useRecordPolling-QI_mIuwF.mjs';
import { u as useModelPrice } from './useModelPrice-DcNReY6Y.mjs';
import { u as useBatchUploadUrl } from './useBatchUploadUrl-Wq7pvxpv.mjs';
import { _ as _export_sfc } from './server.mjs';

const _imports_0 = publicAssetsURL("/tools-logo/Seedance.png");
const _sfc_main = {
  __name: "SeedanceTool",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const { showError } = useToast();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const { getPrice, formatCredits } = useModelPrice();
    const batchUploadUrl = useBatchUploadUrl();
    const modeList = [
      { id: "v1-lite-text-to-video", label: "v1 Lite T2V", icon: "fas fa-font" },
      { id: "v1-lite-image-to-video", label: "v1 Lite I2V", icon: "fas fa-image" },
      { id: "v1-pro-text-to-video", label: "v1 Pro T2V", icon: "fas fa-font" },
      { id: "v1-pro-image-to-video", label: "v1 Pro I2V", icon: "fas fa-image" },
      { id: "v1-pro-fast-image-to-video", label: "v1 Pro Fast I2V", icon: "fas fa-bolt" }
    ];
    const modeTabToPath = {
      "v1-lite-text-to-video": "/home/seedance/v1-lite-text-to-video",
      "v1-lite-image-to-video": "/home/seedance/v1-lite-image-to-video",
      "v1-pro-text-to-video": "/home/seedance/v1-pro-text-to-video",
      "v1-pro-image-to-video": "/home/seedance/v1-pro-image-to-video",
      "v1-pro-fast-image-to-video": "/home/seedance/v1-pro-fast-image-to-video"
    };
    const pathToMode = {};
    Object.keys(modeTabToPath).forEach((k) => {
      pathToMode[modeTabToPath[k]] = k;
    });
    const mode = ref("v1-lite-text-to-video");
    watch(() => route.path, (path) => {
      const m = pathToMode[path];
      if (m && mode.value !== m) mode.value = m;
    }, { immediate: true });
    const formData = reactive({
      prompt: "",
      imageUrl: "",
      endImageUrl: "",
      aspectRatio: "16:9",
      resolution: "720p",
      duration: "5",
      cameraFixed: false,
      seed: -1,
      enableSafetyChecker: true
    });
    const seedancePriceModelKeyMap = {
      "v1-lite-text-to-video": "seedance-v1-lite-text-to-video",
      "v1-lite-image-to-video": "seedance-v1-lite-image-to-video",
      "v1-pro-text-to-video": "seedance-v1-pro-text-to-video",
      "v1-pro-image-to-video": "seedance-v1-pro-image-to-video",
      "v1-pro-fast-image-to-video": "seedance-v1-pro-fast-image-to-video"
    };
    const seedancePriceText = computed(() => {
      const modelKey = seedancePriceModelKeyMap[mode.value];
      if (!modelKey) return "";
      const credits = getPrice(modelKey, {
        duration: formData.duration,
        quality: formData.resolution
      });
      const str = formatCredits(credits);
      return str ? `(${str})` : "";
    });
    const imageUploadRef = ref(null);
    const endImageUploadRef = ref(null);
    const isUploadingImage = ref(false);
    const isUploadingEndImage = ref(false);
    const result = ref(null);
    const isGenerating = ref(false);
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const isTextToVideoMode = computed(() => mode.value === "v1-lite-text-to-video" || mode.value === "v1-pro-text-to-video");
    const isImageMode = computed(() => [
      "v1-lite-image-to-video",
      "v1-pro-image-to-video",
      "v1-pro-fast-image-to-video"
    ].includes(mode.value));
    async function uploadFileToUrl(file) {
      var _a;
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
      const url = Array.isArray(urls) && urls.length ? urls[0] : "";
      return typeof url === "string" ? url : (url == null ? void 0 : url.url) || "";
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
    async function handleEndImageFile(files) {
      var _a, _b;
      if (!(files == null ? void 0 : files.length)) {
        formData.endImageUrl = "";
        return;
      }
      const file = Array.isArray(files) ? files[0] : files;
      isUploadingEndImage.value = true;
      try {
        formData.endImageUrl = await uploadFileToUrl(file);
      } catch (e) {
        showError((e == null ? void 0 : e.message) || "Upload failed");
        formData.endImageUrl = "";
        (_b = (_a = endImageUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingEndImage.value = false;
      }
    }
    const canGenerate = computed(() => {
      const p = (formData.prompt || "").trim();
      if (!p || p.length > 1e4) return false;
      if (isImageMode.value) return !!formData.imageUrl;
      return true;
    });
    const displayResult = computed(() => {
      var _a, _b, _c, _d;
      if (isDetailView.value && ((_a = detailData.value) == null ? void 0 : _a.status) === 2 && ((_c = (_b = detailData.value) == null ? void 0 : _b.outputUrls) == null ? void 0 : _c.length)) {
        const url = typeof detailData.value.outputUrls[0] === "string" ? detailData.value.outputUrls[0] : (_d = detailData.value.outputUrls[0]) == null ? void 0 : _d.url;
        return { videoUrl: url };
      }
      return result.value;
    });
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
        console.error("Seedance load record detail failed:", e);
      }
    }
    watch(() => route.query["record-id"], (recordId) => {
      if (recordId) loadDetailByRecordId(recordId);
      else detailData.value = null;
    }, { immediate: true });
    watch(mode, (m) => {
      const path = modeTabToPath[m];
      if (path && route.path !== path) router.replace(path);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "seedance-tool" }, _attrs))} data-v-d2e46241><div class="tool-header" data-v-d2e46241><div class="tool-avatar" data-v-d2e46241><img${ssrRenderAttr("src", _imports_0)} alt="Seedance" data-v-d2e46241></div><div class="tool-details" data-v-d2e46241><h3 data-v-d2e46241>Seedance</h3><p class="tool-description" data-v-d2e46241>Seedance is a multimodal AI video model by ByteDance that generates consistent, cinematic videos with strong multi-shot consistency and native audio using text, image, video, and audio references.</p></div></div><div class="mode-tabs-wrap" data-v-d2e46241><div class="mode-tabs" data-v-d2e46241><!--[-->`);
      ssrRenderList(modeList, (m) => {
        _push(`<div class="${ssrRenderClass([{ active: mode.value === m.id }, "mode-tab"])}" data-v-d2e46241><i class="${ssrRenderClass(m.icon)}" data-v-d2e46241></i><span data-v-d2e46241>${ssrInterpolate(m.label)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="main-content" data-v-d2e46241><div class="config-panel" data-v-d2e46241><div class="config-header" data-v-d2e46241><h4 data-v-d2e46241>Configuration</h4></div><form class="config-form" data-v-d2e46241><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value) ? " disabled" : ""} data-v-d2e46241><div class="form-group" data-v-d2e46241><label for="seedance-prompt" class="form-label" data-v-d2e46241> Prompt <span class="required" data-v-d2e46241>*</span></label><textarea id="seedance-prompt" class="form-input" rows="4" placeholder="The text prompt used to generate the video (max 10000 characters)" maxlength="10000" required data-v-d2e46241>${ssrInterpolate(formData.prompt)}</textarea>`);
      if (formData.prompt) {
        _push(`<div class="char-count" data-v-d2e46241>${ssrInterpolate(formData.prompt.length)}/10000</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (isImageMode.value) {
        _push(`<div class="form-group" data-v-d2e46241><label class="form-label" data-v-d2e46241> Image URL <span class="required" data-v-d2e46241>*</span></label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "imageUploadRef",
          ref: imageUploadRef,
          "input-id": "seedance-image-upload",
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
          _push(`<span class="form-hint" data-v-d2e46241>Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "v1-lite-image-to-video") {
        _push(`<div class="form-group" data-v-d2e46241><label class="form-label" data-v-d2e46241>End Image URL (optional)</label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "endImageUploadRef",
          ref: endImageUploadRef,
          "input-id": "seedance-end-image-upload",
          label: "",
          "upload-text": "Click to upload end frame image",
          "upload-hint": "Optional; JPEG, PNG, WebP; max 10MB",
          "max-files": 1,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/webp",
          multiple: false,
          "onUpdate:files": handleEndImageFile
        }, null, _parent));
        if (isUploadingEndImage.value) {
          _push(`<span class="form-hint" data-v-d2e46241>Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isTextToVideoMode.value) {
        _push(`<div class="form-group" data-v-d2e46241><label for="seedance-aspect" class="form-label" data-v-d2e46241>Aspect Ratio</label><div class="select-with-arrow" data-v-d2e46241><select id="seedance-aspect" class="form-input" data-v-d2e46241>`);
        if (mode.value === "v1-lite-text-to-video") {
          _push(`<!--[--><option value="16:9" data-v-d2e46241${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "16:9") : ssrLooseEqual(formData.aspectRatio, "16:9")) ? " selected" : ""}>16:9</option><option value="4:3" data-v-d2e46241${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "4:3") : ssrLooseEqual(formData.aspectRatio, "4:3")) ? " selected" : ""}>4:3</option><option value="1:1" data-v-d2e46241${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "1:1") : ssrLooseEqual(formData.aspectRatio, "1:1")) ? " selected" : ""}>1:1</option><option value="3:4" data-v-d2e46241${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "3:4") : ssrLooseEqual(formData.aspectRatio, "3:4")) ? " selected" : ""}>3:4</option><option value="9:16" data-v-d2e46241${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "9:16") : ssrLooseEqual(formData.aspectRatio, "9:16")) ? " selected" : ""}>9:16</option><option value="9:21" data-v-d2e46241${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "9:21") : ssrLooseEqual(formData.aspectRatio, "9:21")) ? " selected" : ""}>9:21</option><!--]-->`);
        } else {
          _push(`<!--[--><option value="21:9" data-v-d2e46241${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "21:9") : ssrLooseEqual(formData.aspectRatio, "21:9")) ? " selected" : ""}>21:9</option><option value="16:9" data-v-d2e46241${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "16:9") : ssrLooseEqual(formData.aspectRatio, "16:9")) ? " selected" : ""}>16:9</option><option value="4:3" data-v-d2e46241${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "4:3") : ssrLooseEqual(formData.aspectRatio, "4:3")) ? " selected" : ""}>4:3</option><option value="1:1" data-v-d2e46241${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "1:1") : ssrLooseEqual(formData.aspectRatio, "1:1")) ? " selected" : ""}>1:1</option><option value="3:4" data-v-d2e46241${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "3:4") : ssrLooseEqual(formData.aspectRatio, "3:4")) ? " selected" : ""}>3:4</option><option value="9:16" data-v-d2e46241${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "9:16") : ssrLooseEqual(formData.aspectRatio, "9:16")) ? " selected" : ""}>9:16</option><!--]-->`);
        }
        _push(`</select><i class="fas fa-chevron-down select-arrow-icon" data-v-d2e46241></i></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-d2e46241><label class="form-label" data-v-d2e46241>Resolution</label><div class="tab-group" data-v-d2e46241>`);
      if (mode.value !== "v1-pro-fast-image-to-video") {
        _push(`<button type="button" class="${ssrRenderClass([{ active: formData.resolution === "480p" }, "tab-option"])}" data-v-d2e46241>480p</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button" class="${ssrRenderClass([{ active: formData.resolution === "720p" }, "tab-option"])}" data-v-d2e46241>720p</button><button type="button" class="${ssrRenderClass([{ active: formData.resolution === "1080p" }, "tab-option"])}" data-v-d2e46241>1080p</button></div></div><div class="form-group" data-v-d2e46241><label class="form-label" data-v-d2e46241>Duration</label><div class="tab-group" data-v-d2e46241><button type="button" class="${ssrRenderClass([{ active: formData.duration === "5" }, "tab-option"])}" data-v-d2e46241>5s</button><button type="button" class="${ssrRenderClass([{ active: formData.duration === "10" }, "tab-option"])}" data-v-d2e46241>10s</button></div></div>`);
      if (mode.value !== "v1-pro-fast-image-to-video") {
        _push(`<!--[--><div class="form-group" data-v-d2e46241><label class="checkbox-label" data-v-d2e46241><input${ssrIncludeBooleanAttr(Array.isArray(formData.cameraFixed) ? ssrLooseContain(formData.cameraFixed, null) : formData.cameraFixed) ? " checked" : ""} type="checkbox" data-v-d2e46241><span data-v-d2e46241>Camera fixed</span></label></div><div class="form-group" data-v-d2e46241><label for="seedance-seed" class="form-label" data-v-d2e46241>Seed</label><input id="seedance-seed"${ssrRenderAttr("value", formData.seed)} type="number" class="form-input" placeholder="-1 for random" min="-1"${ssrRenderAttr("max", 2147483647)} data-v-d2e46241><div class="form-hint" data-v-d2e46241>Use -1 for random.</div></div>`);
        if (isTextToVideoMode.value || mode.value === "v1-pro-image-to-video") {
          _push(`<div class="form-group" data-v-d2e46241><label class="checkbox-label" data-v-d2e46241><input${ssrIncludeBooleanAttr(Array.isArray(formData.enableSafetyChecker) ? ssrLooseContain(formData.enableSafetyChecker, null) : formData.enableSafetyChecker) ? " checked" : ""} type="checkbox" data-v-d2e46241><span data-v-d2e46241>Enable safety checker</span></label></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-actions" data-v-d2e46241><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canGenerate.value || isGenerating.value) ? " disabled" : ""} data-v-d2e46241>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-d2e46241></i>`);
      } else {
        _push(`<i class="fas fa-play" data-v-d2e46241></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Video")} `);
      if (seedancePriceText.value) {
        _push(`<span class="price-tag" data-v-d2e46241>${ssrInterpolate(seedancePriceText.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></fieldset></form></div><div class="result-panel" data-v-d2e46241>`);
      if (isDetailView.value && ((_a = detailData.value) == null ? void 0 : _a.status) === 3) {
        _push(`<div class="detail-failure-state" data-v-d2e46241><div class="failure-icon" data-v-d2e46241><i class="fas fa-exclamation-circle" data-v-d2e46241></i></div><p class="failure-message" data-v-d2e46241>Generation failed. You can try again with different parameters.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || detailData.value.status === 1)) {
        _push(`<div class="detail-loading-state" data-v-d2e46241><i class="fas fa-spinner fa-spin detail-spinner" data-v-d2e46241></i><p data-v-d2e46241>Generating...</p></div>`);
      } else if (!displayResult.value) {
        _push(`<div class="empty-state" data-v-d2e46241><h4 data-v-d2e46241>No video generated yet</h4><p data-v-d2e46241>Fill in the form and click &quot;Generate Video&quot; to start.</p></div>`);
      } else {
        _push(`<div class="result-display" data-v-d2e46241><div class="video-result" data-v-d2e46241><div class="video-player" data-v-d2e46241>`);
        if (displayResult.value.videoUrl) {
          _push(`<video${ssrRenderAttr("src", displayResult.value.videoUrl)} controls class="video-element" data-v-d2e46241></video>`);
        } else {
          _push(`<div class="video-placeholder" data-v-d2e46241><i class="fas fa-spinner fa-spin" data-v-d2e46241></i><p data-v-d2e46241>Generating...</p></div>`);
        }
        _push(`</div><div class="video-actions" data-v-d2e46241>`);
        if (displayResult.value.videoUrl) {
          _push(`<button class="action-btn" data-v-d2e46241><i class="fas fa-download" data-v-d2e46241></i> Download </button>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/SeedanceTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SeedanceTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d2e46241"]]);

export { SeedanceTool as S };
//# sourceMappingURL=SeedanceTool-wZptg8mB.mjs.map
