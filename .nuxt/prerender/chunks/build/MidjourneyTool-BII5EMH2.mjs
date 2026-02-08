import { computed, ref, watch, reactive, mergeProps, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrLooseContain, ssrLooseEqual } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { useRouter, useRoute } from 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import { U as UploadImage } from './UploadImage-a1UOMv8U.mjs';
import { u as useAuth } from './useAuth-ComhLj5o.mjs';
import { u as useToast } from './useToast-CATlmXE8.mjs';
import { u as useModelPrice } from './useModelPrice-BZpig2xf.mjs';
import { u as useRecordPolling } from './useRecordPolling-DxMEWIpb.mjs';
import { _ as _export_sfc } from './server.mjs';

const _imports_0 = publicAssetsURL("/tools-logo/Midjourney.png");
const _sfc_main = {
  __name: "MidjourneyTool",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    useAuth();
    const { showError } = useToast();
    const { getPrice, formatCredits } = useModelPrice();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const MIDJOURNEY_PRICE_KEYS = { imagine: "midjourney_imagine", upscale: "midjourney_upscale", vary: "midjourney_vary" };
    const midjourneyPriceText = computed(() => {
      const key = MIDJOURNEY_PRICE_KEYS[activeCategory.value] || "midjourney_imagine";
      const credits = getPrice(key);
      const str = formatCredits(credits);
      return str ? ` (${str})` : "";
    });
    const loading = ref(false);
    const results = ref([]);
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const loadingRecordId = ref(null);
    const detailOutputList = computed(() => {
      if (!detailData.value || !Array.isArray(detailData.value.outputUrls)) return [];
      return detailData.value.outputUrls.map((url) => {
        var _a, _b;
        const u = typeof url === "string" ? url : (_b = (_a = url == null ? void 0 : url.url) != null ? _a : url == null ? void 0 : url.imageUrl) != null ? _b : "";
        const isImage = /\.(jpe?g|png|gif|webp)(\?|$)/i.test(u) || u.startsWith("data:image/");
        return { url: u, isImage };
      }).filter((x) => x.url);
    });
    function fillFormFromOriginalData(originalData) {
      if (!originalData || typeof originalData !== "object") return;
      const o = originalData;
      if (o.taskType) form.taskType = String(o.taskType);
      if (o.prompt != null) form.prompt = String(o.prompt);
      if (o.speed) form.speed = String(o.speed);
      if (o.fileUrl) form.fileUrls = [o.fileUrl];
      if (Array.isArray(o.fileUrls)) form.fileUrls = [...o.fileUrls];
      if (o.aspectRatio) form.aspectRatio = String(o.aspectRatio);
      if (o.version) form.version = String(o.version);
      if (o.variety != null) form.variety = Number(o.variety);
      if (o.stylization != null) form.stylization = Number(o.stylization);
      if (o.weirdness != null) form.weirdness = Number(o.weirdness);
      if (o.waterMark != null) form.waterMark = String(o.waterMark);
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
        if (data != null && Number(data.status) === 1) {
          pollRecordByStatus(recordId, { getIsCancelled: () => getRouteRecordId() !== recordId }).then((result) => {
            if (getRouteRecordId() !== recordId) return;
            detailData.value = result;
            if (result == null ? void 0 : result.originalData) fillFormFromOriginalData(result.originalData);
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
    const activeCategory = ref("imagine");
    const validCategories = ["imagine", "upscale", "vary"];
    const midjourneyPathToTab = {
      "/home/midjourney/imagine": "imagine",
      "/home/midjourney/upscale": "upscale",
      "/home/midjourney/vary": "vary"
    };
    watch(() => route.path, (path) => {
      const tab = midjourneyPathToTab[path];
      if (tab && validCategories.includes(tab)) activeCategory.value = tab;
    }, { immediate: true });
    const categoryOptions = ref([
      { id: "imagine", name: "Imagine", description: "Create a new image generation task using the Midjourney AI model", icon: "fas fa-wand-magic-sparkles" },
      { id: "upscale", name: "Upscale", description: "Create an upscale task based on previously generated Midjourney images", icon: "fas fa-expand-arrows-alt" },
      { id: "vary", name: "Vary", description: "Create a vary task to enhance image clarity and simulate styles based on previously generated Midjourney images", icon: "fas fa-palette" }
    ]);
    const INIT_IMAGINE_FORM = {
      taskType: "mj_txt2img",
      prompt: "",
      speed: "relaxed",
      fileUrls: [],
      aspectRatio: "16:9",
      version: "7",
      variety: 10,
      stylization: 100,
      weirdness: 0,
      waterMark: ""
    };
    const form = reactive({ ...INIT_IMAGINE_FORM });
    const INIT_UPSCALE_FORM = { taskId: "", imageIndex: 0, waterMark: "" };
    const upscaleForm = reactive({ ...INIT_UPSCALE_FORM });
    const INIT_VARY_FORM = { taskId: "", imageIndex: 1, waterMark: "" };
    const varyForm = reactive({ ...INIT_VARY_FORM });
    const extendList = ref([]);
    const loadingExtendList = ref(false);
    const fetchExtendList = async () => {
      return;
    };
    watch(activeCategory, (cat) => {
      if (cat === "upscale" || cat === "vary") fetchExtendList();
      if (cat === "imagine") Object.assign(form, INIT_IMAGINE_FORM);
      else if (cat === "upscale") Object.assign(upscaleForm, INIT_UPSCALE_FORM);
      else if (cat === "vary") Object.assign(varyForm, INIT_VARY_FORM);
    }, { immediate: true });
    watch(() => upscaleForm.taskId, () => {
      upscaleForm.imageIndex = 0;
    });
    watch(() => varyForm.taskId, () => {
      varyForm.imageIndex = 1;
    });
    const extendListOptions = computed(() => extendList.value || []);
    const selectedExtendTask = computed(() => {
      const taskId = activeCategory.value === "upscale" ? upscaleForm.taskId : varyForm.taskId;
      if (!taskId || !extendList.value.length) return null;
      return extendList.value.find((x) => x.taskId === taskId) || null;
    });
    const selectedOutputUrls = computed(() => {
      const task = selectedExtendTask.value;
      if (!task || !Array.isArray(task.outputUrls)) return [];
      return task.outputUrls.filter((u) => typeof u === "string" && u.trim());
    });
    const needFileUrlsButEmpty = computed(() => {
      var _a;
      if (form.taskType !== "mj_img2img") return false;
      return !((_a = form.fileUrls) == null ? void 0 : _a.length);
    });
    const fileUrlsUploadRef = ref(null);
    const uploadFilesToUrls = async (files) => {
      var _a;
      if (!files || (Array.isArray(files) ? files.length === 0 : !files)) return [];
      const list = Array.isArray(files) ? files : [files];
      const formDataUpload = new FormData();
      list.forEach((f) => formDataUpload.append("file", f));
      const headers = { Accept: "application/json" };
      const response = await fetch("/api/common/batch-upload", {
        method: "POST",
        headers,
        body: formDataUpload,
        credentials: "include"
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const msg = typeof (errorData == null ? void 0 : errorData.errorMessage) === "string" && errorData.errorMessage.trim() ? errorData.errorMessage.trim() : typeof (errorData == null ? void 0 : errorData.message) === "string" && errorData.message.trim() ? errorData.message.trim() : (errorData == null ? void 0 : errorData.userTip) || (errorData == null ? void 0 : errorData.error) || (errorData == null ? void 0 : errorData.message) || "Upload failed";
        throw new Error(msg);
      }
      const data = await response.json();
      const urls = ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.urls) || (data == null ? void 0 : data.fileUrls) || (Array.isArray(data == null ? void 0 : data.data) ? data.data : []);
      if (!Array.isArray(urls)) throw new Error("Invalid response: file URLs not found");
      return urls;
    };
    const handleFileUrlsUpdate = async (files) => {
      var _a, _b, _c, _d;
      if (!files || Array.isArray(files) && files.length === 0) {
        form.fileUrls = [];
        (_b = (_a = fileUrlsUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
        return;
      }
      const list = Array.isArray(files) ? files : [files];
      try {
        form.fileUrls = await uploadFilesToUrls(list);
      } catch (e) {
        showError(e.message || "Failed to upload images");
        form.fileUrls = [];
        (_d = (_c = fileUrlsUploadRef.value) == null ? void 0 : _c.clearFiles) == null ? void 0 : _d.call(_c);
      }
    };
    const formatJson = (obj) => JSON.stringify(obj, null, 2);
    const formatTime = (timeStr) => {
      return new Date(timeStr).toLocaleString("zh-CN");
    };
    const getResultType = (data) => {
      if (data.error) return "Error";
      if (data.result) return "Task ID: " + data.result;
      if (data.code === 1) return "Submission Successful";
      if (data.code === 0) return "Operation Completed";
      return "Response";
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "midjourney-tool" }, _attrs))} data-v-b532afac><div class="tool-header" data-v-b532afac><div class="tool-avatar" data-v-b532afac><img${ssrRenderAttr("src", _imports_0)} alt="Midjourney" data-v-b532afac></div><div class="tool-details" data-v-b532afac><h3 data-v-b532afac>Midjourney</h3><p data-v-b532afac>AI image generation tool</p></div></div><div class="function-selection-section" data-v-b532afac><div class="function-tabs" data-v-b532afac><!--[-->`);
      ssrRenderList(categoryOptions.value, (cat) => {
        _push(`<div class="${ssrRenderClass([{ active: activeCategory.value === cat.id }, "function-tab"])}" data-v-b532afac><div class="function-icon" data-v-b532afac><i class="${ssrRenderClass(cat.icon)}" data-v-b532afac></i></div><div class="function-info" data-v-b532afac><div class="function-name" data-v-b532afac>${ssrInterpolate(cat.name)}</div><div class="function-description" data-v-b532afac>${ssrInterpolate(cat.description)}</div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="main-content" data-v-b532afac><div class="config-panel" data-v-b532afac>`);
      if (activeCategory.value === "imagine") {
        _push(`<form class="config-form" data-v-b532afac><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(loading.value || isDetailView.value) ? " disabled" : ""} data-v-b532afac><div class="form-group" data-v-b532afac><label data-v-b532afac>Task Type *</label><div class="option-btn-group" data-v-b532afac><button type="button" class="${ssrRenderClass([{ active: form.taskType === "mj_txt2img" }, "option-btn"])}" data-v-b532afac> Text-to-image </button><button type="button" class="${ssrRenderClass([{ active: form.taskType === "mj_img2img" }, "option-btn"])}" data-v-b532afac> Image-to-image </button></div></div><div class="form-group" data-v-b532afac><label data-v-b532afac>Prompt *</label><textarea rows="4" required placeholder="Describe the desired image content. Be detailed (style, composition, lighting). Example: Help me generate a sci-fi themed fighter jet in a beautiful sky, to be used as a computer wallpaper" maxlength="2000" data-v-b532afac>${ssrInterpolate(form.prompt)}</textarea><div class="char-count" data-v-b532afac>${ssrInterpolate(form.prompt.length)}/2000</div></div><div class="form-group" data-v-b532afac><label data-v-b532afac>Speed</label><div class="option-btn-group" data-v-b532afac><button type="button" class="${ssrRenderClass([{ active: form.speed === "relaxed" }, "option-btn"])}" data-v-b532afac>relaxed</button><button type="button" class="${ssrRenderClass([{ active: form.speed === "fast" }, "option-btn"])}" data-v-b532afac>fast</button><button type="button" class="${ssrRenderClass([{ active: form.speed === "turbo" }, "option-btn"])}" data-v-b532afac>turbo</button></div></div>`);
        if (form.taskType === "mj_img2img") {
          _push(`<div class="form-group" data-v-b532afac>`);
          _push(ssrRenderComponent(UploadImage, {
            ref_key: "fileUrlsUploadRef",
            ref: fileUrlsUploadRef,
            "input-id": "midjourney-input-images",
            label: "Input Image(s) *",
            "upload-icon": "fas fa-cloud-upload-alt",
            "upload-text": "Click to upload image",
            "upload-hint": "Required for image-to-image.",
            "max-files": 5,
            "max-file-size": 10 * 1024 * 1024,
            "theme-color": "#667eea",
            "onUpdate:files": handleFileUrlsUpdate
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="form-group" data-v-b532afac><label data-v-b532afac>Aspect Ratio</label><select class="form-select form-select-enhanced" data-v-b532afac><option value="1:2" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.aspectRatio) ? ssrLooseContain(form.aspectRatio, "1:2") : ssrLooseEqual(form.aspectRatio, "1:2")) ? " selected" : ""}>1:2</option><option value="9:16" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.aspectRatio) ? ssrLooseContain(form.aspectRatio, "9:16") : ssrLooseEqual(form.aspectRatio, "9:16")) ? " selected" : ""}>9:16</option><option value="2:3" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.aspectRatio) ? ssrLooseContain(form.aspectRatio, "2:3") : ssrLooseEqual(form.aspectRatio, "2:3")) ? " selected" : ""}>2:3</option><option value="3:4" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.aspectRatio) ? ssrLooseContain(form.aspectRatio, "3:4") : ssrLooseEqual(form.aspectRatio, "3:4")) ? " selected" : ""}>3:4</option><option value="5:6" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.aspectRatio) ? ssrLooseContain(form.aspectRatio, "5:6") : ssrLooseEqual(form.aspectRatio, "5:6")) ? " selected" : ""}>5:6</option><option value="6:5" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.aspectRatio) ? ssrLooseContain(form.aspectRatio, "6:5") : ssrLooseEqual(form.aspectRatio, "6:5")) ? " selected" : ""}>6:5</option><option value="4:3" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.aspectRatio) ? ssrLooseContain(form.aspectRatio, "4:3") : ssrLooseEqual(form.aspectRatio, "4:3")) ? " selected" : ""}>4:3</option><option value="3:2" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.aspectRatio) ? ssrLooseContain(form.aspectRatio, "3:2") : ssrLooseEqual(form.aspectRatio, "3:2")) ? " selected" : ""}>3:2</option><option value="1:1" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.aspectRatio) ? ssrLooseContain(form.aspectRatio, "1:1") : ssrLooseEqual(form.aspectRatio, "1:1")) ? " selected" : ""}>1:1</option><option value="16:9" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.aspectRatio) ? ssrLooseContain(form.aspectRatio, "16:9") : ssrLooseEqual(form.aspectRatio, "16:9")) ? " selected" : ""}>16:9</option><option value="2:1" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.aspectRatio) ? ssrLooseContain(form.aspectRatio, "2:1") : ssrLooseEqual(form.aspectRatio, "2:1")) ? " selected" : ""}>2:1</option></select></div><div class="form-group" data-v-b532afac><label data-v-b532afac>Version</label><select class="form-select form-select-enhanced" data-v-b532afac><option value="7" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.version) ? ssrLooseContain(form.version, "7") : ssrLooseEqual(form.version, "7")) ? " selected" : ""}>7</option><option value="6.1" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.version) ? ssrLooseContain(form.version, "6.1") : ssrLooseEqual(form.version, "6.1")) ? " selected" : ""}>6.1</option><option value="6" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.version) ? ssrLooseContain(form.version, "6") : ssrLooseEqual(form.version, "6")) ? " selected" : ""}>6</option><option value="5.2" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.version) ? ssrLooseContain(form.version, "5.2") : ssrLooseEqual(form.version, "5.2")) ? " selected" : ""}>5.2</option><option value="5.1" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.version) ? ssrLooseContain(form.version, "5.1") : ssrLooseEqual(form.version, "5.1")) ? " selected" : ""}>5.1</option><option value="niji6" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.version) ? ssrLooseContain(form.version, "niji6") : ssrLooseEqual(form.version, "niji6")) ? " selected" : ""}>niji6</option><option value="niji7" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(form.version) ? ssrLooseContain(form.version, "niji7") : ssrLooseEqual(form.version, "niji7")) ? " selected" : ""}>niji7</option></select></div><div class="form-group" data-v-b532afac><label data-v-b532afac>Variety (0\u2013100, step 5)</label><input${ssrRenderAttr("value", form.variety)} type="number" min="0" max="100" step="5" class="form-input" data-v-b532afac><div class="input-hint" data-v-b532afac>Higher = more diverse; lower = more consistent</div></div><div class="form-group" data-v-b532afac><label data-v-b532afac>Stylization (0\u20131000)</label><input${ssrRenderAttr("value", form.stylization)} type="number" min="0" max="1000" step="50" class="form-input" data-v-b532afac><div class="input-hint" data-v-b532afac>Higher = more stylized; lower = more realistic</div></div><div class="form-group" data-v-b532afac><label data-v-b532afac>Weirdness (0\u20133000)</label><input${ssrRenderAttr("value", form.weirdness)} type="number" min="0" max="3000" step="100" class="form-input" data-v-b532afac><div class="input-hint" data-v-b532afac>Higher = more unusual; lower = more conventional</div></div><div class="form-group" data-v-b532afac><label data-v-b532afac>Watermark</label><input${ssrRenderAttr("value", form.waterMark)} type="text" class="form-input" placeholder="Optional watermark identifier" data-v-b532afac></div><div class="form-actions" data-v-b532afac><button class="btn-primary" type="submit"${ssrIncludeBooleanAttr(loading.value || !((_a = form.prompt) == null ? void 0 : _a.trim()) || needFileUrlsButEmpty.value) ? " disabled" : ""} data-v-b532afac>`);
        if (loading.value) {
          _push(`<i class="fas fa-spinner fa-spin" data-v-b532afac></i>`);
        } else {
          _push(`<i class="fas fa-magic" data-v-b532afac></i>`);
        }
        _push(` ${ssrInterpolate(loading.value ? "Generating..." : "Start Generation")}${ssrInterpolate(midjourneyPriceText.value)}</button></div></fieldset></form>`);
      } else {
        _push(`<!---->`);
      }
      if (activeCategory.value === "upscale") {
        _push(`<form class="config-form" data-v-b532afac><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(loading.value || isDetailView.value) ? " disabled" : ""} data-v-b532afac><p class="category-desc" data-v-b532afac>Create an upscale task based on previously generated Midjourney images.</p><div class="form-group" data-v-b532afac><label data-v-b532afac>Task ID *</label><div class="select-with-arrow" data-v-b532afac><select class="form-select form-select-enhanced" required${ssrIncludeBooleanAttr(loadingExtendList.value) ? " disabled" : ""} data-v-b532afac><option value="" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(upscaleForm.taskId) ? ssrLooseContain(upscaleForm.taskId, "") : ssrLooseEqual(upscaleForm.taskId, "")) ? " selected" : ""}>Select a task</option><!--[-->`);
        ssrRenderList(extendListOptions.value, (item) => {
          _push(`<option${ssrRenderAttr("value", item.taskId)} data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(upscaleForm.taskId) ? ssrLooseContain(upscaleForm.taskId, item.taskId) : ssrLooseEqual(upscaleForm.taskId, item.taskId)) ? " selected" : ""}>${ssrInterpolate(item.title || item.taskId)}</option>`);
        });
        _push(`<!--]--></select><i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true" data-v-b532afac></i></div>`);
        if (!loadingExtendList.value && extendListOptions.value.length === 0) {
          _push(`<div class="input-hint input-hint-warn" data-v-b532afac>Only tasks completed with Midjourney Imagine can be used.</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (selectedOutputUrls.value.length) {
          _push(`<div class="form-group" data-v-b532afac><label data-v-b532afac>Image Index *</label><div class="extend-image-index-grid" data-v-b532afac><!--[-->`);
          ssrRenderList(selectedOutputUrls.value, (url, idx) => {
            _push(`<button type="button" class="${ssrRenderClass([{ selected: upscaleForm.imageIndex === idx }, "extend-image-index-item"])}" data-v-b532afac><img${ssrRenderAttr("src", url)}${ssrRenderAttr("alt", `Image ${idx}`)} data-v-b532afac><span class="index-badge" data-v-b532afac>${ssrInterpolate(idx)}</span></button>`);
          });
          _push(`<!--]--></div><div class="input-hint" data-v-b532afac>Select one image</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="form-group" data-v-b532afac><label data-v-b532afac>Watermark</label><input${ssrRenderAttr("value", upscaleForm.waterMark)} type="text" class="form-input" placeholder="Optional watermark identifier" data-v-b532afac></div><div class="form-actions" data-v-b532afac><button class="btn-primary" type="submit"${ssrIncludeBooleanAttr(loading.value || !((_b = upscaleForm.taskId) == null ? void 0 : _b.trim())) ? " disabled" : ""} data-v-b532afac>`);
        if (loading.value) {
          _push(`<i class="fas fa-spinner fa-spin" data-v-b532afac></i>`);
        } else {
          _push(`<i class="fas fa-expand-arrows-alt" data-v-b532afac></i>`);
        }
        _push(` ${ssrInterpolate(loading.value ? "Submitting..." : "Upscale")}${ssrInterpolate(midjourneyPriceText.value)}</button></div></fieldset></form>`);
      } else {
        _push(`<!---->`);
      }
      if (activeCategory.value === "vary") {
        _push(`<form class="config-form" data-v-b532afac><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(loading.value || isDetailView.value) ? " disabled" : ""} data-v-b532afac><p class="category-desc" data-v-b532afac>Create a vary task to enhance image clarity and simulate styles based on previously generated Midjourney images.</p><div class="form-group" data-v-b532afac><label data-v-b532afac>Task ID *</label><div class="select-with-arrow" data-v-b532afac><select class="form-select form-select-enhanced" required${ssrIncludeBooleanAttr(loadingExtendList.value) ? " disabled" : ""} data-v-b532afac><option value="" data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(varyForm.taskId) ? ssrLooseContain(varyForm.taskId, "") : ssrLooseEqual(varyForm.taskId, "")) ? " selected" : ""}>Select a task</option><!--[-->`);
        ssrRenderList(extendListOptions.value, (item) => {
          _push(`<option${ssrRenderAttr("value", item.taskId)} data-v-b532afac${ssrIncludeBooleanAttr(Array.isArray(varyForm.taskId) ? ssrLooseContain(varyForm.taskId, item.taskId) : ssrLooseEqual(varyForm.taskId, item.taskId)) ? " selected" : ""}>${ssrInterpolate(item.title || item.taskId)}</option>`);
        });
        _push(`<!--]--></select><i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true" data-v-b532afac></i></div>`);
        if (!loadingExtendList.value && extendListOptions.value.length === 0) {
          _push(`<div class="input-hint input-hint-warn" data-v-b532afac>Only tasks completed with Midjourney Imagine can be used.</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (selectedOutputUrls.value.length) {
          _push(`<div class="form-group" data-v-b532afac><label data-v-b532afac>Image Index *</label><div class="extend-image-index-grid" data-v-b532afac><!--[-->`);
          ssrRenderList(selectedOutputUrls.value, (url, idx) => {
            _push(`<button type="button" class="${ssrRenderClass([{ selected: varyForm.imageIndex === idx + 1 }, "extend-image-index-item"])}" data-v-b532afac><img${ssrRenderAttr("src", url)}${ssrRenderAttr("alt", `Image ${idx + 1}`)} data-v-b532afac><span class="index-badge" data-v-b532afac>${ssrInterpolate(idx + 1)}</span></button>`);
          });
          _push(`<!--]--></div><div class="input-hint" data-v-b532afac>Select one image</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="form-group" data-v-b532afac><label data-v-b532afac>Watermark</label><input${ssrRenderAttr("value", varyForm.waterMark)} type="text" class="form-input" placeholder="Optional watermark identifier" data-v-b532afac></div><div class="form-actions" data-v-b532afac><button class="btn-primary" type="submit"${ssrIncludeBooleanAttr(loading.value || !((_c = varyForm.taskId) == null ? void 0 : _c.trim())) ? " disabled" : ""} data-v-b532afac>`);
        if (loading.value) {
          _push(`<i class="fas fa-spinner fa-spin" data-v-b532afac></i>`);
        } else {
          _push(`<i class="fas fa-palette" data-v-b532afac></i>`);
        }
        _push(` ${ssrInterpolate(loading.value ? "Submitting..." : "Vary")}${ssrInterpolate(midjourneyPriceText.value)}</button></div></fieldset></form>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="results-display-panel" data-v-b532afac><div class="results-header" data-v-b532afac><h4 data-v-b532afac>Generation Results</h4>`);
      if (!isDetailView.value && results.value.length) {
        _push(`<div class="results-actions" data-v-b532afac><button class="btn-secondary" data-v-b532afac><i class="fas fa-trash" data-v-b532afac></i> Clear </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="results-container" data-v-b532afac>`);
      if (isDetailView.value && detailData.value && detailData.value.status === 2 && detailOutputList.value.length > 0) {
        _push(`<div class="results-showcase" data-v-b532afac><!--[-->`);
        ssrRenderList(detailOutputList.value, (item, idx) => {
          _push(`<div class="result-item" data-v-b532afac><div class="result-content" data-v-b532afac>`);
          if (item.isImage) {
            _push(`<img${ssrRenderAttr("src", item.url)} class="detail-output-image"${ssrRenderAttr("alt", `Output ${idx + 1}`)} data-v-b532afac>`);
          } else {
            _push(`<pre class="result-json" data-v-b532afac>${ssrInterpolate(item.url)}</pre>`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (isDetailView.value && detailData.value && detailData.value.status === 3) {
        _push(`<div class="detail-failure-state" data-v-b532afac><div class="failure-icon" data-v-b532afac><i class="fas fa-exclamation-circle" data-v-b532afac></i></div><p class="failure-message" data-v-b532afac>Generation failed. You can debug the parameters and try generating again. Generation failure will not consume credits.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || detailData.value.status === 1)) {
        _push(`<div class="detail-loading-state" data-v-b532afac><i class="fas fa-spinner fa-spin detail-spinner" data-v-b532afac></i><p data-v-b532afac>Generating...</p></div>`);
      } else if (isDetailView.value) {
        _push(`<div class="detail-loading-state" data-v-b532afac><p data-v-b532afac>No output</p></div>`);
      } else if (results.value.length) {
        _push(`<div class="results-showcase" data-v-b532afac><!--[-->`);
        ssrRenderList(results.value, (item, idx) => {
          _push(`<div class="result-item" data-v-b532afac><div class="result-header" data-v-b532afac><span class="result-time" data-v-b532afac>${ssrInterpolate(formatTime(item.time))}</span><span class="result-type" data-v-b532afac>${ssrInterpolate(getResultType(item.data))}</span></div><div class="result-content" data-v-b532afac><pre class="result-json" data-v-b532afac>${ssrInterpolate(formatJson(item.data))}</pre></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty-state" data-v-b532afac><div class="empty-icon" data-v-b532afac><i class="fas fa-paint-brush" data-v-b532afac></i></div><h3 data-v-b532afac>Waiting for Generation</h3><p data-v-b532afac>Fill in the prompt and optional reference images, then click Start Generation to create your AI image</p></div>`);
      }
      _push(`</div></div></div><div class="usage-tips" data-v-b532afac><div class="tip-item" data-v-b532afac><span class="tip-icon" data-v-b532afac>\u{1F3A8}</span><span data-v-b532afac>Describe the image you want in English; the more detailed the prompt, the better the result</span></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/MidjourneyTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MidjourneyTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b532afac"]]);

export { MidjourneyTool as M };
//# sourceMappingURL=MidjourneyTool-BII5EMH2.mjs.map
