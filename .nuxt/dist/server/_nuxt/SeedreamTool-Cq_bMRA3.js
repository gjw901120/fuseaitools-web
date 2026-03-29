import { ref, watch, reactive, computed, mergeProps, unref, useSSRContext } from "vue";
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
const _imports_0 = publicAssetsURL("/tools-logo/Seedream.png");
const _sfc_main = {
  __name: "SeedreamTool",
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
      "5-lite-text-to-image": "/home/seedream/5-lite-text-to-image",
      "5-lite-image-to-image": "/home/seedream/5-lite-image-to-image"
    };
    const pathToMode = {
      "/home/seedream/5-lite-text-to-image": "5-lite-text-to-image",
      "/home/seedream/5-lite-image-to-image": "5-lite-image-to-image",
      // 旧 URL（若未触发 Nitro 301，仍同步 tab）
      "/home/seedream/1-5-lite-text-to-image": "5-lite-text-to-image",
      "/home/seedream/2-5-lite-image-to-image": "5-lite-image-to-image"
    };
    const mode = ref("5-lite-text-to-image");
    watch(() => route.path, (path) => {
      const m = pathToMode[path];
      if (m && mode.value !== m) mode.value = m;
    }, { immediate: true });
    const formData = reactive({
      prompt: "",
      imageUrls: [],
      aspectRatio: "1:1",
      quality: "basic"
    });
    const discountText = computed(() => {
      const rate = Number((discount == null ? void 0 : discount.value) ?? 1);
      if (Number.isNaN(rate) || rate <= 0 || rate === 1) return "";
      const percent = (rate * 100).toFixed(0);
      return ` · ${percent}%`;
    });
    const seedreamPriceModelKeyMap = {
      "5-lite-text-to-image": "seedream-5-lite-text-to-image",
      "5-lite-image-to-image": "seedream-5-lite-image-to-image"
    };
    const seedreamPriceText = computed(() => {
      const modelKey = seedreamPriceModelKeyMap[mode.value];
      if (!modelKey) return "";
      const credits = getPrice(modelKey, {
        aspectRatio: formData.aspectRatio,
        quality: formData.quality
      });
      const str = formatCredits(credits);
      if (!str) return "";
      return `· ${str} credits${discountText.value}`;
    });
    const imageUploadRef = ref(null);
    const isUploadingImages = ref(false);
    const result = ref(null);
    const isGenerating = ref(false);
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
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
    const maxPromptLen = computed(() => mode.value === "5-lite-image-to-image" ? 2996 : 2995);
    const canGenerate = computed(() => {
      const p = (formData.prompt || "").trim();
      if (!p || p.length > maxPromptLen.value) return false;
      if (mode.value === "5-lite-image-to-image") return formData.imageUrls.length > 0;
      return true;
    });
    const displayResult = computed(() => {
      var _a, _b, _c, _d;
      if (isDetailView.value && ((_a = detailData.value) == null ? void 0 : _a.status) === 2 && ((_c = (_b = detailData.value) == null ? void 0 : _b.outputUrls) == null ? void 0 : _c.length)) {
        const url = typeof detailData.value.outputUrls[0] === "string" ? detailData.value.outputUrls[0] : (_d = detailData.value.outputUrls[0]) == null ? void 0 : _d.url;
        return { imageUrl: url };
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
        console.error("Seedream load record detail failed:", e);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "seedream-tool" }, _attrs))} data-v-3a14dc30><div class="tool-header" data-v-3a14dc30><div class="tool-avatar" data-v-3a14dc30><img${ssrRenderAttr("src", _imports_0)} alt="Seedream" data-v-3a14dc30></div><div class="tool-details" data-v-3a14dc30><h3 data-v-3a14dc30>Seedream</h3><p class="tool-description" data-v-3a14dc30>Seedream is a unified multimodal image generation model by ByteDance, designed for multimodal reasoning, deep understanding, and controllable visual creation. It supports text-to-image and image editing workflows with improved consistency and real-time knowledge integration.</p></div></div><div class="mode-tabs-wrap" data-v-3a14dc30><div class="mode-tabs" data-v-3a14dc30><div class="${ssrRenderClass([{ active: mode.value === "5-lite-text-to-image" }, "mode-tab"])}" data-v-3a14dc30><i class="fas fa-font" data-v-3a14dc30></i><span data-v-3a14dc30>5 Lite Text to Image</span></div><div class="${ssrRenderClass([{ active: mode.value === "5-lite-image-to-image" }, "mode-tab"])}" data-v-3a14dc30><i class="fas fa-image" data-v-3a14dc30></i><span data-v-3a14dc30>5 Lite Image to Image</span></div></div></div><div class="main-content" data-v-3a14dc30><div class="config-panel" data-v-3a14dc30><div class="config-header" data-v-3a14dc30><h4 data-v-3a14dc30>Configuration</h4></div><form class="config-form" data-v-3a14dc30><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-3a14dc30><div class="form-group" data-v-3a14dc30><label for="seedream-prompt" class="form-label" data-v-3a14dc30> Prompt <span class="required" data-v-3a14dc30>*</span></label><textarea id="seedream-prompt" class="form-input" rows="4" placeholder="A text description of the image you want to generate"${ssrRenderAttr("maxlength", mode.value === "5-lite-image-to-image" ? 2996 : 2995)} required data-v-3a14dc30>${ssrInterpolate(formData.prompt)}</textarea>`);
      if (formData.prompt) {
        _push(`<div class="char-count" data-v-3a14dc30>${ssrInterpolate(formData.prompt.length)}/${ssrInterpolate(mode.value === "5-lite-image-to-image" ? 2996 : 2995)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (mode.value === "5-lite-image-to-image") {
        _push(`<div class="form-group" data-v-3a14dc30><label class="form-label" data-v-3a14dc30> Image(s) <span class="required" data-v-3a14dc30>*</span></label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "imageUploadRef",
          ref: imageUploadRef,
          "input-id": "seedream-image-upload",
          label: "",
          "upload-text": "Click to upload image(s)",
          "upload-hint": "JPEG, PNG, WebP; max 10MB each",
          "max-files": 5,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/webp",
          multiple: true,
          "onUpdate:files": handleImageFiles
        }, null, _parent));
        if (isUploadingImages.value) {
          _push(`<span class="form-hint" data-v-3a14dc30>Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-3a14dc30><label class="form-label" data-v-3a14dc30>Aspect Ratio <span class="required" data-v-3a14dc30>*</span></label><div class="tab-group" data-v-3a14dc30><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "1:1" }, "tab-option"])}" data-v-3a14dc30><span data-v-3a14dc30>1:1</span></button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "4:3" }, "tab-option"])}" data-v-3a14dc30><span data-v-3a14dc30>4:3</span></button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "3:4" }, "tab-option"])}" data-v-3a14dc30><span data-v-3a14dc30>3:4</span></button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "16:9" }, "tab-option"])}" data-v-3a14dc30><span data-v-3a14dc30>16:9</span></button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "9:16" }, "tab-option"])}" data-v-3a14dc30><span data-v-3a14dc30>9:16</span></button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "2:3" }, "tab-option"])}" data-v-3a14dc30><span data-v-3a14dc30>2:3</span></button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "3:2" }, "tab-option"])}" data-v-3a14dc30><span data-v-3a14dc30>3:2</span></button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "21:9" }, "tab-option"])}" data-v-3a14dc30><span data-v-3a14dc30>21:9</span></button></div></div><div class="form-group" data-v-3a14dc30><label class="form-label" data-v-3a14dc30>Quality <span class="required" data-v-3a14dc30>*</span></label><div class="tab-group" data-v-3a14dc30><button type="button" class="${ssrRenderClass([{ active: formData.quality === "basic" }, "tab-option"])}" data-v-3a14dc30>Basic (2K)</button><button type="button" class="${ssrRenderClass([{ active: formData.quality === "high" }, "tab-option"])}" data-v-3a14dc30>High (3K)</button></div><div class="form-hint" data-v-3a14dc30>Basic outputs 2K; High outputs 3K.</div></div><div class="form-actions" data-v-3a14dc30><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canGenerate.value || isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-3a14dc30>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-3a14dc30></i>`);
      } else {
        _push(`<i class="fas fa-magic" data-v-3a14dc30></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Image")} `);
      if (seedreamPriceText.value) {
        _push(`<span class="price-tag" data-v-3a14dc30>${ssrInterpolate(seedreamPriceText.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></fieldset></form></div><div class="result-panel" data-v-3a14dc30><div class="image-container" data-v-3a14dc30>`);
      if (!isDetailView.value && unref(route).path === "/home/seedream/5-lite-text-to-image") {
        _push(`<div class="tutorial-showcase" data-v-3a14dc30><p class="tutorial-showcase-title" data-v-3a14dc30>🎨 Tutorial Showcase</p><div class="tutorial-showcase-links" data-v-3a14dc30><a href="https://www.fuseaitools.com/news/seedream-nezha-first-last-frame-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link" data-v-3a14dc30>First &amp; last frame images for video (Nezha &amp; Ao Bing sprint) — Seedream 5 Lite</a></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!isDetailView.value && unref(route).path === "/home/seedream/5-lite-image-to-image") {
        _push(`<div class="tutorial-showcase" data-v-3a14dc30><p class="tutorial-showcase-title" data-v-3a14dc30>🎨 Tutorial Showcase</p><div class="tutorial-showcase-links" data-v-3a14dc30><a href="https://www.fuseaitools.com/news/seedream-nezha-first-last-frame-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link" data-v-3a14dc30>First &amp; last frame images for video (Nezha &amp; Ao Bing sprint) — Seedream 5 Lite</a><a href="https://www.fuseaitools.com/news/seedance-nezha-i2v-props-race-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link" data-v-3a14dc30>Turn those frames into video with Seedance 1.5 Pro (I2V walkthrough)</a></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="image-container-main" data-v-3a14dc30>`);
      if (isDetailView.value && ((_a = detailData.value) == null ? void 0 : _a.status) === 3) {
        _push(`<div class="detail-failure-state" data-v-3a14dc30><div class="failure-icon" data-v-3a14dc30><i class="fas fa-exclamation-circle" data-v-3a14dc30></i></div><p class="failure-message" data-v-3a14dc30>Generation failed. You can try again with different parameters.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || detailData.value.status === 1)) {
        _push(`<div class="detail-loading-state" data-v-3a14dc30><i class="fas fa-spinner fa-spin detail-spinner" data-v-3a14dc30></i><p data-v-3a14dc30>Generating...</p></div>`);
      } else if (!displayResult.value) {
        _push(`<div class="empty-state" data-v-3a14dc30><h4 data-v-3a14dc30>No image generated yet</h4><p data-v-3a14dc30>Fill in the form and click &quot;Generate Image&quot; to start.</p></div>`);
      } else {
        _push(`<div class="result-display" data-v-3a14dc30><div class="image-result" data-v-3a14dc30>`);
        if (displayResult.value.imageUrl) {
          _push(`<img${ssrRenderAttr("src", displayResult.value.imageUrl)} alt="Generated" class="result-image" data-v-3a14dc30>`);
        } else {
          _push(`<div class="image-placeholder" data-v-3a14dc30><i class="fas fa-spinner fa-spin" data-v-3a14dc30></i><p data-v-3a14dc30>Generating...</p></div>`);
        }
        if (displayResult.value.imageUrl) {
          _push(`<div class="image-actions" data-v-3a14dc30><button class="action-btn" data-v-3a14dc30><i class="fas fa-download" data-v-3a14dc30></i> Download </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/SeedreamTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SeedreamTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3a14dc30"]]);
export {
  SeedreamTool as S
};
//# sourceMappingURL=SeedreamTool-Cq_bMRA3.js.map
