import { ref, watch, reactive, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrLooseContain } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { useRouter, useRoute } from "vue-router";
import { U as UploadImage } from "./UploadImage-D6DL1USQ.js";
import { u as useToast } from "./useToast-CATlmXE8.js";
import { u as useApi } from "./useApi-1a9EtG7k.js";
import { u as useRecordPolling } from "./useRecordPolling-QI_mIuwF.js";
import { u as useModelPrice } from "./useModelPrice-DCrt0_k3.js";
import { u as useBatchUploadUrl } from "./useBatchUploadUrl-_AVZ_-oO.js";
import { _ as _export_sfc } from "../server.mjs";
const _imports_0 = publicAssetsURL("/tools-logo/QWen.png");
const _sfc_main = {
  __name: "QwenTool",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const { showError } = useToast();
    useApi();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const { getPrice, formatCredits, discount } = useModelPrice();
    const batchUploadUrl = useBatchUploadUrl();
    const modeList = [
      { id: "text-to-image", label: "Text to Image", icon: "fas fa-font" },
      { id: "image-to-image", label: "Image to Image", icon: "fas fa-image" },
      { id: "image-edit", label: "Image Edit", icon: "fas fa-edit" },
      { id: "z-image", label: "Z-Image", icon: "fas fa-square" }
    ];
    const modeTabToPath = {
      "text-to-image": "/home/qwen/text-to-image",
      "image-to-image": "/home/qwen/image-to-image",
      "image-edit": "/home/qwen/image-edit",
      "z-image": "/home/qwen/z-image"
    };
    const pathToMode = {};
    Object.keys(modeTabToPath).forEach((k) => {
      pathToMode[modeTabToPath[k]] = k;
    });
    const mode = ref("text-to-image");
    watch(() => route.path, (path) => {
      const m = pathToMode[path];
      if (m && mode.value !== m) mode.value = m;
    }, { immediate: true });
    const formData = reactive({
      prompt: "",
      imageUrl: "",
      imageSize: "square_hd",
      aspectRatio: "1:1",
      strength: 0.8,
      numInferenceSteps: 30,
      seed: null,
      guidanceScale: 2.5,
      outputFormat: "png",
      negativePrompt: "",
      acceleration: "none",
      enableSafetyChecker: true,
      numImages: "1",
      syncMode: false
    });
    const discountText = computed(() => {
      const rate = Number((discount == null ? void 0 : discount.value) ?? 1);
      if (Number.isNaN(rate) || rate <= 0 || rate === 1) return "";
      const percent = (rate * 100).toFixed(0);
      return ` · ${percent}%`;
    });
    const qwenPriceModelKeyMap = {
      "text-to-image": "qwen-text-to-image",
      "image-to-image": "qwen-image-to-image",
      "image-edit": "qwen-image-edit",
      "z-image": "qwen-z-image"
    };
    const qwenPriceText = computed(() => {
      const modelKey = qwenPriceModelKeyMap[mode.value];
      if (!modelKey) return "";
      const formFields = {};
      if (mode.value === "text-to-image" || mode.value === "image-edit") formFields.imageSize = formData.imageSize;
      if (mode.value === "image-edit") formFields.numImages = formData.numImages;
      if (mode.value === "z-image") formFields.aspectRatio = formData.aspectRatio;
      const credits = getPrice(modelKey, formFields);
      const str = formatCredits(credits);
      if (!str) return "";
      return `· ${str} credits${discountText.value}`;
    });
    const imageUploadRef = ref(null);
    const isUploadingImage = ref(false);
    const result = ref(null);
    const isGenerating = ref(false);
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const promptMaxLength = computed(() => {
      if (mode.value === "image-edit") return 2e3;
      if (mode.value === "z-image") return 1e3;
      return 5e3;
    });
    const getAuthToken = () => {
      return null;
    };
    async function uploadFileToUrl(file) {
      var _a;
      if (!file) return "";
      const form = new FormData();
      form.append("file", file);
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
    const canGenerate = computed(() => {
      const p = (formData.prompt || "").trim();
      if (!p || p.length > promptMaxLength.value) return false;
      if (mode.value === "image-to-image" || mode.value === "image-edit") return !!formData.imageUrl;
      return true;
    });
    function fillFormFromOriginalData(o) {
      if (!o || typeof o !== "object") return;
      if (o.prompt != null) formData.prompt = String(o.prompt);
      if (o.imageUrl) formData.imageUrl = String(o.imageUrl);
      if (o.imageSize) formData.imageSize = String(o.imageSize);
      if (o.aspectRatio) formData.aspectRatio = String(o.aspectRatio);
      if (o.strength != null && o.strength !== "") {
        const n = Number(o.strength);
        if (!Number.isNaN(n)) formData.strength = n;
      }
      if (o.numInferenceSteps != null && o.numInferenceSteps !== "") {
        const n = Number(o.numInferenceSteps);
        if (!Number.isNaN(n)) formData.numInferenceSteps = n;
      }
      if (o.seed != null && o.seed !== "") {
        const n = Number(o.seed);
        formData.seed = Number.isNaN(n) ? null : n;
      } else if ("seed" in o && (o.seed === null || o.seed === "")) {
        formData.seed = null;
      }
      if (o.guidanceScale != null && o.guidanceScale !== "") {
        const n = Number(o.guidanceScale);
        if (!Number.isNaN(n)) formData.guidanceScale = n;
      }
      if (o.outputFormat) formData.outputFormat = String(o.outputFormat);
      if (o.negativePrompt != null) formData.negativePrompt = String(o.negativePrompt);
      if (o.acceleration) formData.acceleration = String(o.acceleration);
      if ("enableSafetyChecker" in o) formData.enableSafetyChecker = !!o.enableSafetyChecker;
      if (o.numImages != null) formData.numImages = String(o.numImages);
      if ("syncMode" in o) formData.syncMode = !!o.syncMode;
    }
    function pickDetailImageUrl(d) {
      if (!d || typeof d !== "object") return "";
      let url = d.outputUrl || d.imageUrl;
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
        const url = pickDetailImageUrl(detailData.value);
        if (url) return { imageUrl: url };
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
        console.error("Qwen load record detail failed:", e);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "qwen-tool" }, _attrs))} data-v-609f45af><div class="tool-header" data-v-609f45af><div class="tool-avatar" data-v-609f45af><img${ssrRenderAttr("src", _imports_0)} alt="Qwen" data-v-609f45af></div><div class="tool-details" data-v-609f45af><h3 data-v-609f45af>Qwen</h3><p class="tool-description" data-v-609f45af>The Qwen Image empowers creators, developers, and businesses to generate and edit photorealistic images effortlessly. Whether you&#39;re crafting intricate designs or refining existing visuals, this powerful Qwen integrates seamlessly into your workflow, delivering multilingual text rendering and advanced editing capabilities that rival top models.</p></div></div><div class="mode-tabs-wrap" data-v-609f45af><div class="mode-tabs" data-v-609f45af><!--[-->`);
      ssrRenderList(modeList, (m) => {
        _push(`<div class="${ssrRenderClass([{ active: mode.value === m.id }, "mode-tab"])}" data-v-609f45af><i class="${ssrRenderClass(m.icon)}" data-v-609f45af></i><span data-v-609f45af>${ssrInterpolate(m.label)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="main-content" data-v-609f45af><div class="config-panel" data-v-609f45af><div class="config-header" data-v-609f45af><h4 data-v-609f45af>Configuration</h4></div><form class="config-form" data-v-609f45af><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-609f45af><div class="form-group" data-v-609f45af><label for="qwen-prompt" class="form-label" data-v-609f45af> Prompt <span class="required" data-v-609f45af>*</span></label><textarea id="qwen-prompt" class="form-input" rows="4" placeholder="The prompt to generate the image with"${ssrRenderAttr("maxlength", promptMaxLength.value)} required data-v-609f45af>${ssrInterpolate(formData.prompt)}</textarea>`);
      if (formData.prompt) {
        _push(`<div class="char-count" data-v-609f45af>${ssrInterpolate(formData.prompt.length)}/${ssrInterpolate(promptMaxLength.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (mode.value === "image-to-image" || mode.value === "image-edit") {
        _push(`<div class="form-group" data-v-609f45af><label class="form-label" data-v-609f45af> Image URL <span class="required" data-v-609f45af>*</span></label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "imageUploadRef",
          ref: imageUploadRef,
          "input-id": "qwen-image-upload",
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
          _push(`<span class="form-hint" data-v-609f45af>Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        if (isDetailView.value && formData.imageUrl) {
          _push(`<div class="detail-ref-urls" data-v-609f45af><span class="form-label" data-v-609f45af>Input image (this task)</span><div class="detail-ref-urls-links" data-v-609f45af><a${ssrRenderAttr("href", formData.imageUrl)} target="_blank" rel="noopener noreferrer" class="detail-ref-link" data-v-609f45af>Open image</a></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "image-to-image") {
        _push(`<div class="form-group" data-v-609f45af><label for="qwen-strength" class="form-label" data-v-609f45af>Strength (denoising)</label><input id="qwen-strength"${ssrRenderAttr("value", formData.strength)} type="number" class="form-input" min="0" max="1" step="0.01" placeholder="0.8" data-v-609f45af><div class="form-hint" data-v-609f45af>0 = preserve original, 1 = fully remake.</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "text-to-image" || mode.value === "image-edit") {
        _push(`<div class="form-group" data-v-609f45af><label class="form-label" data-v-609f45af>Image Size</label><div class="tab-group" data-v-609f45af><button type="button" class="${ssrRenderClass([{ active: formData.imageSize === "square" }, "tab-option"])}" data-v-609f45af>Square</button><button type="button" class="${ssrRenderClass([{ active: formData.imageSize === "square_hd" }, "tab-option"])}" data-v-609f45af>Square HD</button><button type="button" class="${ssrRenderClass([{ active: formData.imageSize === "portrait_4_3" }, "tab-option"])}" data-v-609f45af>3:4</button><button type="button" class="${ssrRenderClass([{ active: formData.imageSize === "portrait_16_9" }, "tab-option"])}" data-v-609f45af>9:16</button><button type="button" class="${ssrRenderClass([{ active: formData.imageSize === "landscape_4_3" }, "tab-option"])}" data-v-609f45af>4:3</button><button type="button" class="${ssrRenderClass([{ active: formData.imageSize === "landscape_16_9" }, "tab-option"])}" data-v-609f45af>16:9</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "z-image") {
        _push(`<div class="form-group" data-v-609f45af><label class="form-label" data-v-609f45af>Aspect Ratio <span class="required" data-v-609f45af>*</span></label><div class="tab-group" data-v-609f45af><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "1:1" }, "tab-option"])}" data-v-609f45af>1:1</button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "4:3" }, "tab-option"])}" data-v-609f45af>4:3</button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "3:4" }, "tab-option"])}" data-v-609f45af>3:4</button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "16:9" }, "tab-option"])}" data-v-609f45af>16:9</button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "9:16" }, "tab-option"])}" data-v-609f45af>9:16</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value !== "z-image") {
        _push(`<div class="form-group" data-v-609f45af><label for="qwen-steps" class="form-label" data-v-609f45af>Inference Steps</label><input id="qwen-steps"${ssrRenderAttr("value", formData.numInferenceSteps)} type="number" class="form-input"${ssrRenderAttr("min", mode.value === "image-edit" ? 2 : 2)}${ssrRenderAttr("max", mode.value === "image-edit" ? 49 : 250)} step="1" placeholder="30" data-v-609f45af><div class="form-hint" data-v-609f45af>${ssrInterpolate(mode.value === "image-edit" ? "2–49" : "2–250")}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value !== "z-image") {
        _push(`<div class="form-group" data-v-609f45af><label for="qwen-seed" class="form-label" data-v-609f45af>Seed</label><input id="qwen-seed"${ssrRenderAttr("value", formData.seed)} type="number" class="form-input" placeholder="Optional" data-v-609f45af></div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value !== "z-image") {
        _push(`<div class="form-group" data-v-609f45af><label for="qwen-guidance" class="form-label" data-v-609f45af>Guidance Scale</label><input id="qwen-guidance"${ssrRenderAttr("value", formData.guidanceScale)} type="number" class="form-input" min="0" max="20" step="0.1"${ssrRenderAttr("placeholder", mode.value === "image-edit" ? "4" : "2.5")} data-v-609f45af><div class="form-hint" data-v-609f45af>0–20. CFG: how closely to follow the prompt.</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "image-edit") {
        _push(`<div class="form-group" data-v-609f45af><label class="form-label" data-v-609f45af>Num Images</label><div class="tab-group" data-v-609f45af><button type="button" class="${ssrRenderClass([{ active: formData.numImages === "1" }, "tab-option"])}" data-v-609f45af>1</button><button type="button" class="${ssrRenderClass([{ active: formData.numImages === "2" }, "tab-option"])}" data-v-609f45af>2</button><button type="button" class="${ssrRenderClass([{ active: formData.numImages === "3" }, "tab-option"])}" data-v-609f45af>3</button><button type="button" class="${ssrRenderClass([{ active: formData.numImages === "4" }, "tab-option"])}" data-v-609f45af>4</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "image-edit") {
        _push(`<div class="form-group" data-v-609f45af><label class="checkbox-label" data-v-609f45af><input${ssrIncludeBooleanAttr(Array.isArray(formData.syncMode) ? ssrLooseContain(formData.syncMode, null) : formData.syncMode) ? " checked" : ""} type="checkbox" data-v-609f45af><span data-v-609f45af>Sync mode (wait for upload before response)</span></label></div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value !== "z-image") {
        _push(`<div class="form-group" data-v-609f45af><label class="form-label" data-v-609f45af>Output Format</label><div class="tab-group" data-v-609f45af><button type="button" class="${ssrRenderClass([{ active: formData.outputFormat === "png" }, "tab-option"])}" data-v-609f45af>PNG</button><button type="button" class="${ssrRenderClass([{ active: formData.outputFormat === "jpeg" }, "tab-option"])}" data-v-609f45af>JPEG</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value !== "z-image") {
        _push(`<div class="form-group" data-v-609f45af><label class="form-label" data-v-609f45af>Acceleration</label><div class="tab-group" data-v-609f45af><button type="button" class="${ssrRenderClass([{ active: formData.acceleration === "none" }, "tab-option"])}" data-v-609f45af>None</button><button type="button" class="${ssrRenderClass([{ active: formData.acceleration === "regular" }, "tab-option"])}" data-v-609f45af>Regular</button><button type="button" class="${ssrRenderClass([{ active: formData.acceleration === "high" }, "tab-option"])}" data-v-609f45af>High</button></div><div class="form-hint" data-v-609f45af>Higher = faster. High recommended for images without text.</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value !== "z-image") {
        _push(`<div class="form-group" data-v-609f45af><label for="qwen-negative" class="form-label" data-v-609f45af>Negative Prompt</label><input id="qwen-negative"${ssrRenderAttr("value", formData.negativePrompt)} type="text" class="form-input" placeholder="e.g. blurry, ugly" maxlength="500" data-v-609f45af>`);
        if (formData.negativePrompt) {
          _push(`<div class="char-count" data-v-609f45af>${ssrInterpolate(formData.negativePrompt.length)}/500</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value !== "z-image") {
        _push(`<div class="form-group" data-v-609f45af><label class="checkbox-label" data-v-609f45af><input${ssrIncludeBooleanAttr(Array.isArray(formData.enableSafetyChecker) ? ssrLooseContain(formData.enableSafetyChecker, null) : formData.enableSafetyChecker) ? " checked" : ""} type="checkbox" data-v-609f45af><span data-v-609f45af>Enable safety checker</span></label></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-actions" data-v-609f45af><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canGenerate.value || isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-609f45af>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-609f45af></i>`);
      } else {
        _push(`<i class="fas fa-magic" data-v-609f45af></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Image")} `);
      if (qwenPriceText.value) {
        _push(`<span class="price-tag" data-v-609f45af>${ssrInterpolate(qwenPriceText.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></fieldset></form></div><div class="result-panel" data-v-609f45af>`);
      if (isDetailView.value && Number((_a = detailData.value) == null ? void 0 : _a.status) === 3) {
        _push(`<div class="detail-failure-state" data-v-609f45af><div class="failure-icon" data-v-609f45af><i class="fas fa-exclamation-circle" data-v-609f45af></i></div><p class="failure-message" data-v-609f45af>Generation failed. You can try again with different parameters.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || [0, 1].includes(Number(detailData.value.status)))) {
        _push(`<div class="detail-loading-state" data-v-609f45af><i class="fas fa-spinner fa-spin detail-spinner" data-v-609f45af></i><p data-v-609f45af>Generating...</p></div>`);
      } else if (!displayResult.value) {
        _push(`<div class="empty-state" data-v-609f45af><h4 data-v-609f45af>No image generated yet</h4><p data-v-609f45af>Fill in the form and click &quot;Generate Image&quot; to start.</p></div>`);
      } else {
        _push(`<div class="result-display" data-v-609f45af><div class="image-result" data-v-609f45af>`);
        if (displayResult.value.imageUrl) {
          _push(`<img${ssrRenderAttr("src", displayResult.value.imageUrl)} alt="Generated" class="result-image" data-v-609f45af>`);
        } else {
          _push(`<div class="image-placeholder" data-v-609f45af><i class="fas fa-spinner fa-spin" data-v-609f45af></i><p data-v-609f45af>Generating...</p></div>`);
        }
        if (displayResult.value.imageUrl) {
          _push(`<div class="image-actions" data-v-609f45af><button class="action-btn" data-v-609f45af><i class="fas fa-download" data-v-609f45af></i> Download </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/QwenTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const QwenTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-609f45af"]]);
export {
  QwenTool as Q
};
//# sourceMappingURL=QwenTool-BzdSxeun.js.map
