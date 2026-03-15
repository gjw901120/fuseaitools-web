import { computed, reactive, watch, ref, mergeProps, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent, ssrRenderStyle } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { useRouter, useRoute } from 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import { U as UploadAudio } from './UploadAudio-BiE3XXaz.mjs';
import { u as useAuth } from './useAuth-BT_C6798.mjs';
import { u as useToast } from './useToast-CATlmXE8.mjs';
import { u as useModelPrice, a as useApi } from './useModelPrice-DcNReY6Y.mjs';
import { u as useRecordPolling } from './useRecordPolling-QI_mIuwF.mjs';
import { u as useBatchUploadUrl } from './useBatchUploadUrl-Wq7pvxpv.mjs';
import { _ as _export_sfc } from './server.mjs';

const _imports_0 = publicAssetsURL("/tools-logo/suno.png");
const EXTEND_LIST_MODEL = "suno_generate";
const _sfc_main = {
  __name: "SunoTool",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    useAuth();
    const { showError } = useToast();
    const { get } = useApi();
    const { getPrice, formatCredits } = useModelPrice();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const batchUploadUrl = useBatchUploadUrl();
    const SUNO_MODEL_KEY = {
      generate: "suno_generate",
      extend: "suno_extend",
      expand: "suno_upload_extend",
      vocal: "suno_add_vocals",
      cover: "suno_upload_cover",
      accompaniment: "suno_add_instrumental"
    };
    const sunoPriceText = computed(() => {
      const key = SUNO_MODEL_KEY[formData.function];
      if (!key) return "";
      const credits = getPrice(key);
      const str = formatCredits(credits);
      return str ? ` (${str})` : "";
    });
    const uploadAudioToUrl = async (file) => {
      var _a;
      if (!file) return "";
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      const headers = { Accept: "application/json" };
      const response = await fetch(batchUploadUrl, {
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
      if (!Array.isArray(urls) || !urls[0]) throw new Error("Invalid response: file URL not found");
      return urls[0];
    };
    const INIT_SUNO_FORM = {
      function: "generate",
      prompt: "",
      customMode: false,
      instrumental: true,
      model: "V5",
      style: "",
      title: "",
      negativeTags: "",
      vocalGender: "m",
      styleWeight: 0.65,
      weirdnessConstraint: 0.65,
      audioWeight: 0.65,
      audioId: "",
      defaultParamFlag: true,
      continueAt: 60,
      uploadedFile: null,
      expandDefaultParamFlag: true,
      expandContinueAt: 60,
      expandUploadedFile: null,
      accompanimentTitle: "",
      accompanimentTags: "",
      accompanimentNegativeTags: "",
      vocalTitle: "",
      vocalStyle: "",
      vocalNegativeTags: ""
    };
    const formData = reactive({ ...INIT_SUNO_FORM });
    watch(() => formData.function, (fn) => {
      Object.assign(formData, { ...INIT_SUNO_FORM, function: fn });
    });
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
    watch(() => route.path, (newPath) => {
      const routeToFunctionMap = {
        "/home/suno/generate": "generate",
        "/home/suno/extend": "extend",
        "/home/suno/upload-cover": "cover",
        "/home/suno/upload-extend": "expand",
        "/home/suno/add-instrumental": "accompaniment",
        "/home/suno/add-vocals": "vocal"
      };
      const functionId = routeToFunctionMap[newPath];
      if (functionId) {
        formData.function = functionId;
        if (functionId === "extend") fetchExtendList();
      }
    }, { immediate: true });
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const loadingRecordId = ref(null);
    const detailResult = computed(() => {
      var _a;
      if (!detailData.value || detailData.value.status !== 2 || !Array.isArray(detailData.value.outputUrls) || !detailData.value.outputUrls[0]) return null;
      const od = detailData.value.originalData || {};
      const firstUrl = typeof detailData.value.outputUrls[0] === "string" ? detailData.value.outputUrls[0] : (_a = detailData.value.outputUrls[0]) == null ? void 0 : _a.url;
      return {
        audioUrl: firstUrl,
        title: od.title || "Generated Music",
        style: od.style || "",
        model: od.model || formData.model,
        duration: detailData.value.duration
      };
    });
    const detailOutputItems = computed(() => {
      if (!detailData.value || detailData.value.status !== 2 || !Array.isArray(detailData.value.outputUrls)) return [];
      return detailData.value.outputUrls.map((u) => typeof u === "string" ? u : u == null ? void 0 : u.url).filter(Boolean).map((url) => ({
        type: url.includes("/image/") ? "image" : url.includes("/audio/") ? "audio" : "unknown",
        url
      })).filter((item) => item.type !== "unknown");
    });
    const displayResult = computed(() => {
      var _a;
      if (isDetailView.value && ((_a = detailData.value) == null ? void 0 : _a.status) === 2 && detailResult.value) return detailResult.value;
      return result.value;
    });
    function fillFormFromOriginalData(originalData) {
      var _a, _b, _c;
      if (!originalData || typeof originalData !== "object") return;
      const o = originalData;
      const keys = ["prompt", "customMode", "instrumental", "model", "style", "title", "negativeTags", "vocalGender", "audioId", "defaultParamFlag", "continueAt", "expandDefaultParamFlag", "expandContinueAt", "accompanimentTitle", "accompanimentTags", "accompanimentNegativeTags", "vocalTitle", "vocalStyle", "vocalNegativeTags"];
      keys.forEach((k) => {
        if (o[k] !== void 0) formData[k] = o[k];
      });
      if (o.function) formData.function = o.function;
      if (o.styleWeight != null) formData.styleWeight = (_a = Number(o.styleWeight)) != null ? _a : 0.65;
      if (o.weirdnessConstraint != null) formData.weirdnessConstraint = (_b = Number(o.weirdnessConstraint)) != null ? _b : 0.65;
      if (o.audioWeight != null) formData.audioWeight = (_c = Number(o.audioWeight)) != null ? _c : 0.65;
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
          pollRecordByStatus(recordId, { getIsCancelled: () => getRouteRecordId() !== recordId }).then((resultData) => {
            if (getRouteRecordId() !== recordId) return;
            detailData.value = resultData;
            if (resultData == null ? void 0 : resultData.originalData) fillFormFromOriginalData(resultData.originalData);
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
    const functionOptions = ref([
      {
        id: "generate",
        name: "Music Generation",
        description: "Create new music",
        detailDescription: "Generate complete music works from scratch, supports custom mode and simple mode, can control music style, lyrics content and other parameters",
        icon: "fas fa-music"
      },
      {
        id: "extend",
        name: "Music Extension",
        description: "Extend existing music",
        detailDescription: "Extend based on selected audio, supports custom parameter mode, can control the music style and content of the extended part",
        icon: "fas fa-expand-arrows-alt"
      },
      {
        id: "cover",
        name: "Audio Cover",
        description: "Recreate audio",
        detailDescription: "Upload audio file for recreation, supports custom mode, can control music style, lyrics content and other parameters",
        icon: "fas fa-microphone"
      },
      {
        id: "expand",
        name: "Audio Expansion",
        description: "Expand on uploaded audio",
        detailDescription: "Upload audio file for expansion, supports custom parameter mode, can control the music style and content of the expanded part",
        icon: "fas fa-compress-arrows-alt"
      },
      {
        id: "accompaniment",
        name: "Accompaniment",
        description: "Generate accompaniment",
        detailDescription: "Add background accompaniment to existing audio, control music style through include and exclude tags, no prompt needed",
        icon: "fas fa-guitar"
      },
      {
        id: "vocal",
        name: "Vocal Generation",
        description: "Generate vocals for audio",
        detailDescription: "Add vocal singing to existing audio, guide singing content and style through prompts, supports music style and exclude tags control",
        icon: "fas fa-user"
      }
    ]);
    const uploadedFile = ref(null);
    const expandUploadedFile = ref(null);
    const accompanimentUploadedFile = ref(null);
    const vocalUploadedFile = ref(null);
    const coverFileUrl = ref("");
    const expandFileUrl = ref("");
    const accompanimentFileUrl = ref("");
    const vocalFileUrl = ref("");
    const isUploadingCover = ref(false);
    const isUploadingExpand = ref(false);
    const isUploadingAccompaniment = ref(false);
    const isUploadingVocal = ref(false);
    const result = ref(null);
    const isGenerating = ref(false);
    const isPlaying = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    const progress = ref(0);
    ref(null);
    const playbackSpeed = ref(1);
    const isPromptRequired = computed(() => {
      if (formData.function === "extend") {
        return formData.defaultParamFlag;
      }
      if (formData.function === "cover") {
        return !formData.instrumental;
      }
      if (formData.function === "expand") {
        return formData.expandDefaultParamFlag && !formData.instrumental;
      }
      if (formData.function === "accompaniment") {
        return false;
      }
      if (formData.function === "vocal") {
        return true;
      }
      return true;
    });
    const canGenerate = computed(() => {
      if (formData.function === "extend") {
        if (!formData.audioId.trim()) {
          return false;
        }
        if (formData.defaultParamFlag) {
          if (!formData.prompt.trim() || !formData.style.trim() || !formData.title.trim()) {
            return false;
          }
          if (formData.continueAt <= 0) {
            return false;
          }
        }
      } else if (formData.function === "cover") {
        if (!coverFileUrl.value) return false;
        if (!formData.style.trim() || !formData.title.trim()) return false;
        if (!formData.instrumental && !formData.prompt.trim()) return false;
      } else if (formData.function === "expand") {
        if (!expandFileUrl.value) return false;
        if (formData.expandDefaultParamFlag) {
          if (!formData.style.trim() || !formData.title.trim()) return false;
          if (!formData.instrumental && !formData.prompt.trim()) return false;
          if (formData.expandContinueAt <= 0) return false;
        }
      } else if (formData.function === "accompaniment") {
        if (!accompanimentFileUrl.value || !formData.accompanimentTitle.trim() || !formData.accompanimentTags.trim() || !formData.accompanimentNegativeTags.trim()) return false;
      } else if (formData.function === "vocal") {
        if (!vocalFileUrl.value || !formData.vocalTitle.trim() || !formData.vocalStyle.trim() || !formData.vocalNegativeTags.trim() || !formData.prompt.trim()) return false;
      } else {
        if (!formData.prompt.trim()) {
          return false;
        }
        if (formData.customMode) {
          if (!formData.style.trim() || !formData.title.trim()) {
            return false;
          }
          if (!formData.instrumental && !formData.prompt.trim()) {
            return false;
          }
        }
      }
      return true;
    });
    const getPromptPlaceholder = () => {
      if (formData.function === "extend") {
        return "";
      }
      if (formData.function === "cover") {
        return "";
      }
      if (formData.function === "expand") {
        return "";
      }
      if (formData.function === "accompaniment") {
        return "";
      }
      if (formData.function === "vocal") {
        return "";
      }
      if (formData.customMode) {
        return "";
      }
      return "";
    };
    const getPromptMaxLength = () => {
      if (formData.function === "extend") {
        return 3e3;
      }
      if (formData.function === "cover") {
        const limits2 = {
          "V3_5": 3e3,
          "V4": 3e3,
          "V4_5": 5e3,
          "V4_5PLUS": 5e3,
          "V5": 5e3
        };
        return limits2[formData.model];
      }
      if (formData.function === "expand") {
        const limits2 = {
          "V3_5": 3e3,
          "V4": 3e3,
          "V4_5": 5e3,
          "V4_5PLUS": 5e3,
          "V5": 5e3
        };
        return limits2[formData.model];
      }
      if (formData.function === "accompaniment") {
        return 0;
      }
      if (formData.function === "vocal") {
        return 5e3;
      }
      const limits = {
        "V3_5": 3e3,
        "V4": 3e3,
        "V4_5": 5e3,
        "V4_5PLUS": 5e3,
        "V5": 5e3
      };
      return formData.customMode ? limits[formData.model] : 500;
    };
    const getPromptHint = () => {
      if (formData.function === "extend") {
        return "Describe how the music should continue or change in the extended part. Max 3000 characters.";
      }
      if (formData.function === "cover") {
        return formData.instrumental ? "Describe the desired audio content to generate, max " + getPromptMaxLength() + " characters" : "Enter lyrics content, max " + getPromptMaxLength() + " characters";
      }
      if (formData.function === "expand") {
        return formData.instrumental ? "Describe how the music should expand, max " + getPromptMaxLength() + " characters" : "Enter lyrics content, max " + getPromptMaxLength() + " characters";
      }
      if (formData.function === "accompaniment") {
        return "Accompaniment generation does not require prompts, control music style through include and exclude tags";
      }
      if (formData.function === "vocal") {
        return "Text describing audio content, used to guide vocal singing content and style, max 5000 characters";
      }
      if (formData.customMode) {
        return formData.instrumental ? "Describe music style and mood, max " + getPromptMaxLength() + " characters" : "Enter lyrics content, max " + getPromptMaxLength() + " characters";
      }
      return "As the core creativity, lyrics will be automatically generated based on it, max 500 characters";
    };
    const getStyleMaxLength = () => {
      const limits = {
        "V3_5": 200,
        "V4": 200,
        "V4_5": 1e3,
        "V4_5PLUS": 1e3,
        "V5": 1e3
      };
      return limits[formData.model];
    };
    const handleCoverAudioUpdate = async (files) => {
      if (!files || Array.isArray(files) && files.length === 0) {
        coverFileUrl.value = "";
        return;
      }
      const file = Array.isArray(files) ? files[0] : files;
      uploadedFile.value = file;
      isUploadingCover.value = true;
      try {
        coverFileUrl.value = await uploadAudioToUrl(file);
      } catch (e) {
        showError(e.message || "Failed to upload audio");
        coverFileUrl.value = "";
        uploadedFile.value = null;
      } finally {
        isUploadingCover.value = false;
      }
    };
    const handleExpandAudioUpdate = async (files) => {
      if (!files || Array.isArray(files) && files.length === 0) {
        expandFileUrl.value = "";
        return;
      }
      const file = Array.isArray(files) ? files[0] : files;
      expandUploadedFile.value = file;
      isUploadingExpand.value = true;
      try {
        expandFileUrl.value = await uploadAudioToUrl(file);
      } catch (e) {
        showError(e.message || "Failed to upload audio");
        expandFileUrl.value = "";
        expandUploadedFile.value = null;
      } finally {
        isUploadingExpand.value = false;
      }
    };
    const handleAccompanimentAudioUpdate = async (files) => {
      if (!files || Array.isArray(files) && files.length === 0) {
        accompanimentFileUrl.value = "";
        return;
      }
      const file = Array.isArray(files) ? files[0] : files;
      accompanimentUploadedFile.value = file;
      isUploadingAccompaniment.value = true;
      try {
        accompanimentFileUrl.value = await uploadAudioToUrl(file);
      } catch (e) {
        showError(e.message || "Failed to upload audio");
        accompanimentFileUrl.value = "";
        accompanimentUploadedFile.value = null;
      } finally {
        isUploadingAccompaniment.value = false;
      }
    };
    const handleVocalAudioUpdate = async (files) => {
      if (!files || Array.isArray(files) && files.length === 0) {
        vocalFileUrl.value = "";
        return;
      }
      const file = Array.isArray(files) ? files[0] : files;
      vocalUploadedFile.value = file;
      isUploadingVocal.value = true;
      try {
        vocalFileUrl.value = await uploadAudioToUrl(file);
      } catch (e) {
        showError(e.message || "Failed to upload audio");
        vocalFileUrl.value = "";
        vocalUploadedFile.value = null;
      } finally {
        isUploadingVocal.value = false;
      }
    };
    const getButtonIcon = () => {
      const icons = {
        "generate": "fas fa-music",
        "extend": "fas fa-expand-arrows-alt",
        "cover": "fas fa-microphone",
        "expand": "fas fa-compress-arrows-alt",
        "accompaniment": "fas fa-guitar",
        "vocal": "fas fa-user"
      };
      return icons[formData.function] || "fas fa-music";
    };
    const getButtonText = () => {
      const texts = {
        "generate": "Generate Music",
        "extend": "Extend Music",
        "cover": "Cover Music",
        "expand": "Expand Music",
        "accompaniment": "Generate Accompaniment",
        "vocal": "Generate Vocals"
      };
      return texts[formData.function] || "Generate Music";
    };
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "suno-tool" }, _attrs))} data-v-40f77877><div class="tool-header" data-v-40f77877><div class="tool-avatar" data-v-40f77877><img${ssrRenderAttr("src", _imports_0)} alt="Suno" data-v-40f77877></div><div class="tool-details" data-v-40f77877><h3 data-v-40f77877>Suno</h3><p data-v-40f77877>Where AI and Melody Unite Seamlessly! Transform text prompts into stunning AI-generated tracks, blending vocals and instruments with revolutionary realism. Newly added V5 delivers hyper-dynamic, natural performances\u2014emotional arcs, breathing, and fluid progressions for lifelike depth. Ideal for developers crafting immersive apps: fast and scalable. Revolutionize music creation today!</p></div></div><div class="mode-tabs-wrap" data-v-40f77877><div class="mode-tabs" data-v-40f77877><!--[-->`);
      ssrRenderList(functionOptions.value, (func) => {
        _push(`<div class="${ssrRenderClass([{ active: formData.function === func.id }, "mode-tab"])}" data-v-40f77877><i class="${ssrRenderClass(func.icon)}" data-v-40f77877></i><span data-v-40f77877>${ssrInterpolate(func.name)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="main-content" data-v-40f77877><div class="config-panel" data-v-40f77877><div class="config-header" data-v-40f77877><h4 data-v-40f77877>Music Generation Configuration</h4></div><form class="config-form" data-v-40f77877><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-40f77877>`);
      if (formData.function === "generate") {
        _push(`<div class="form-group" data-v-40f77877><label class="form-label" data-v-40f77877>Mode Selection *</label><div class="mode-switch" data-v-40f77877><button type="button" class="${ssrRenderClass([{ active: !formData.customMode }, "mode-btn"])}" data-v-40f77877><i class="fas fa-magic" data-v-40f77877></i> Simple Mode </button><button type="button" class="${ssrRenderClass([{ active: formData.customMode }, "mode-btn"])}" data-v-40f77877><i class="fas fa-sliders-h" data-v-40f77877></i> Custom Mode </button></div><div class="form-hint" data-v-40f77877>${ssrInterpolate(formData.customMode ? "Allows detailed control of all parameters" : "Simple mode, only basic parameters needed")}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-40f77877><label for="model" class="form-label" data-v-40f77877>Model Version *</label><div class="select-with-arrow" data-v-40f77877><select id="model" class="form-input model-select" required data-v-40f77877><option value="V3_5" data-v-40f77877${ssrIncludeBooleanAttr(Array.isArray(formData.model) ? ssrLooseContain(formData.model, "V3_5") : ssrLooseEqual(formData.model, "V3_5")) ? " selected" : ""}>V3.5 - Better song structure, max 4 minutes</option><option value="V4" data-v-40f77877${ssrIncludeBooleanAttr(Array.isArray(formData.model) ? ssrLooseContain(formData.model, "V4") : ssrLooseEqual(formData.model, "V4")) ? " selected" : ""}>V4 - Improved vocal quality, max 4 minutes</option><option value="V4_5" data-v-40f77877${ssrIncludeBooleanAttr(Array.isArray(formData.model) ? ssrLooseContain(formData.model, "V4_5") : ssrLooseEqual(formData.model, "V4_5")) ? " selected" : ""}>V4.5 - Smarter prompts, max 8 minutes</option><option value="V4_5PLUS" data-v-40f77877${ssrIncludeBooleanAttr(Array.isArray(formData.model) ? ssrLooseContain(formData.model, "V4_5PLUS") : ssrLooseEqual(formData.model, "V4_5PLUS")) ? " selected" : ""}>V4.5+ - Richer timbre, max 8 minutes</option><option value="V5" data-v-40f77877${ssrIncludeBooleanAttr(Array.isArray(formData.model) ? ssrLooseContain(formData.model, "V5") : ssrLooseEqual(formData.model, "V5")) ? " selected" : ""}>V5 - Superior music expressiveness, faster generation</option></select><i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true" data-v-40f77877></i></div></div>`);
      if (formData.function === "extend") {
        _push(`<!--[--><div class="form-group" data-v-40f77877><label for="audio-id" class="form-label" data-v-40f77877> Audio ID <span class="required" data-v-40f77877>*</span></label><div class="select-with-arrow" data-v-40f77877><select id="audio-id" class="form-input" required${ssrIncludeBooleanAttr(loadingExtendList.value) ? " disabled" : ""} data-v-40f77877><option value="" data-v-40f77877${ssrIncludeBooleanAttr(Array.isArray(formData.audioId) ? ssrLooseContain(formData.audioId, "") : ssrLooseEqual(formData.audioId, "")) ? " selected" : ""}>Please select audio</option><!--[-->`);
        ssrRenderList(extendList.value, (item) => {
          _push(`<option${ssrRenderAttr("value", item.taskId)} data-v-40f77877${ssrIncludeBooleanAttr(Array.isArray(formData.audioId) ? ssrLooseContain(formData.audioId, item.taskId) : ssrLooseEqual(formData.audioId, item.taskId)) ? " selected" : ""}>${ssrInterpolate(item.title || item.taskId)}</option>`);
        });
        _push(`<!--]--></select><i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true" data-v-40f77877></i></div>`);
        if (!loadingExtendList.value && extendList.value.length === 0) {
          _push(`<div class="form-hint input-hint-warn" data-v-40f77877> Only tasks completed with Suno Music Generation can be used. </div>`);
        } else {
          _push(`<div class="form-hint" data-v-40f77877> Unique identifier for the audio track to extend. All extension requests require this parameter. </div>`);
        }
        _push(`</div><div class="form-group" data-v-40f77877><label class="form-label" data-v-40f77877> Parameter Source <span class="required" data-v-40f77877>*</span></label><div class="mode-switch" data-v-40f77877><button type="button" class="${ssrRenderClass([{ active: formData.defaultParamFlag }, "mode-btn"])}" data-v-40f77877><i class="fas fa-sliders-h" data-v-40f77877></i> Use Custom Parameters </button><button type="button" class="${ssrRenderClass([{ active: !formData.defaultParamFlag }, "mode-btn"])}" data-v-40f77877><i class="fas fa-clone" data-v-40f77877></i> Use Original Audio Parameters </button></div><div class="form-hint" data-v-40f77877>${ssrInterpolate(formData.defaultParamFlag ? "Use custom parameters specified in this request" : "Use original audio parameters")}</div></div>`);
        if (formData.defaultParamFlag) {
          _push(`<div class="form-group" data-v-40f77877><label for="continue-at" class="form-label" data-v-40f77877> Extension Time Point (seconds) <span class="required" data-v-40f77877>*</span></label><input id="continue-at"${ssrRenderAttr("value", formData.continueAt)} type="number" class="form-input" placeholder="e.g.: 60" min="0.01" step="0.01" required data-v-40f77877><div class="form-hint" data-v-40f77877> Time point (in seconds) where audio starts extending. Must be greater than 0 and less than the total duration of the generated audio. </div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (formData.function === "cover") {
        _push(`<div class="form-group" data-v-40f77877><label class="form-label" data-v-40f77877> Upload Audio File <span class="required" data-v-40f77877>*</span></label>`);
        if (isUploadingCover.value) {
          _push(`<span class="form-hint" data-v-40f77877>Uploading audio...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(UploadAudio, {
          "input-id": "audio-upload",
          label: "Upload audio file",
          "upload-icon": "fas fa-cloud-upload-alt",
          "upload-text": "Click to upload audio file",
          "upload-hint": "Supports MP3, WAV, M4A formats, max 2 minutes",
          "additional-hint": "Upload audio file to cover, ensure length does not exceed 2 minutes",
          "theme-color": "#10b981",
          "max-duration": 120,
          "max-file-size": 10 * 1024 * 1024,
          multiple: false,
          "onUpdate:files": handleCoverAudioUpdate
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (formData.function === "expand") {
        _push(`<!--[--><div class="form-group" data-v-40f77877><label class="form-label" data-v-40f77877> Upload Audio File <span class="required" data-v-40f77877>*</span></label>`);
        if (isUploadingExpand.value) {
          _push(`<span class="form-hint" data-v-40f77877>Uploading audio...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(UploadAudio, {
          "input-id": "expand-audio-upload",
          label: "Upload audio file",
          "upload-icon": "fas fa-cloud-upload-alt",
          "upload-text": "Click to upload audio file",
          "upload-hint": "Supports MP3, WAV, M4A formats, max 2 minutes",
          "additional-hint": "Upload audio file to expand, ensure length does not exceed 2 minutes",
          "theme-color": "#10b981",
          "max-duration": 120,
          "max-file-size": 10 * 1024 * 1024,
          multiple: false,
          "onUpdate:files": handleExpandAudioUpdate
        }, null, _parent));
        _push(`</div><div class="form-group" data-v-40f77877><label class="checkbox-label" for="expand-default-param-flag" data-v-40f77877><input id="expand-default-param-flag"${ssrIncludeBooleanAttr(Array.isArray(formData.expandDefaultParamFlag) ? ssrLooseContain(formData.expandDefaultParamFlag, null) : formData.expandDefaultParamFlag) ? " checked" : ""} type="checkbox" data-v-40f77877><span class="checkmark" data-v-40f77877></span> Use Custom Parameter Mode </label><div class="form-hint" data-v-40f77877>${ssrInterpolate(formData.expandDefaultParamFlag ? "Need to provide custom parameters like style, title, etc." : "Use default parameters, just upload URL")}</div></div>`);
        if (formData.expandDefaultParamFlag) {
          _push(`<div class="form-group" data-v-40f77877><label for="expand-continue-at" class="form-label" data-v-40f77877> Expansion Time Point (seconds) <span class="required" data-v-40f77877>*</span></label><input id="expand-continue-at"${ssrRenderAttr("value", formData.expandContinueAt)} type="number" class="form-input" placeholder="e.g.: 60" min="0" step="1" required data-v-40f77877><div class="form-hint" data-v-40f77877> Specify the time point from the original audio to start the expansion </div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (formData.function === "accompaniment") {
        _push(`<!--[--><div class="form-group" data-v-40f77877><label class="form-label" data-v-40f77877> Source Audio File <span class="required" data-v-40f77877>*</span></label>`);
        if (isUploadingAccompaniment.value) {
          _push(`<span class="form-hint" data-v-40f77877>Uploading audio...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(UploadAudio, {
          "input-id": "accompaniment-audio-upload",
          label: "Source audio file",
          "upload-icon": "fas fa-cloud-upload-alt",
          "upload-text": "Click to upload audio file",
          "upload-hint": "Supports MP3, WAV, M4A formats, max 10MB",
          "additional-hint": "Specify the source audio file to add accompaniment to",
          "theme-color": "#10b981",
          "max-file-size": 10 * 1024 * 1024,
          multiple: false,
          "onUpdate:files": handleAccompanimentAudioUpdate
        }, null, _parent));
        _push(`</div><div class="form-group" data-v-40f77877><label for="accompaniment-title" class="form-label" data-v-40f77877> Music Title <span class="required" data-v-40f77877>*</span></label><input id="accompaniment-title"${ssrRenderAttr("value", formData.accompanimentTitle)} type="text" class="form-input" placeholder="e.g.: Relaxing Piano" maxlength="100" required data-v-40f77877><div class="form-hint" data-v-40f77877> Title of the generated music, will be displayed in the player interface and filename </div></div><div class="form-group" data-v-40f77877><label for="accompaniment-tags" class="form-label" data-v-40f77877> Include Tags <span class="required" data-v-40f77877>*</span></label><input id="accompaniment-tags"${ssrRenderAttr("value", formData.accompanimentTags)} type="text" class="form-input" placeholder="e.g.: relaxed, piano, soothing" maxlength="500" required data-v-40f77877><div class="form-hint" data-v-40f77877> Music styles or tags you want to include in the generated music, defines the desired music style and characteristics </div></div><div class="form-group" data-v-40f77877><label for="accompaniment-negative-tags" class="form-label" data-v-40f77877> Exclude Tags <span class="required" data-v-40f77877>*</span></label><input id="accompaniment-negative-tags"${ssrRenderAttr("value", formData.accompanimentNegativeTags)} type="text" class="form-input" placeholder="e.g.: heavy metal, fast drums" maxlength="500" required data-v-40f77877><div class="form-hint" data-v-40f77877> Music styles or characteristics to exclude from generated audio, used to avoid specific unwanted music elements </div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (formData.function === "vocal") {
        _push(`<!--[--><div class="form-group" data-v-40f77877><label for="vocal-audio-upload" class="form-label" data-v-40f77877> Source Audio File <span class="required" data-v-40f77877>*</span></label>`);
        if (isUploadingVocal.value) {
          _push(`<span class="form-hint" data-v-40f77877>Uploading audio...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(UploadAudio, {
          "input-id": "vocal-audio-upload",
          label: "Source audio file",
          "upload-icon": "fas fa-cloud-upload-alt",
          "upload-text": "Click to upload audio file",
          "upload-hint": "Supports MP3, WAV, M4A formats, max 10MB",
          "additional-hint": "Specify the source audio file to add vocals to",
          "theme-color": "#10b981",
          "max-file-size": 10 * 1024 * 1024,
          multiple: false,
          "onUpdate:files": handleVocalAudioUpdate
        }, null, _parent));
        _push(`</div><div class="form-group" data-v-40f77877><label for="vocal-title" class="form-label" data-v-40f77877> Music Title <span class="required" data-v-40f77877>*</span></label><input id="vocal-title"${ssrRenderAttr("value", formData.vocalTitle)} type="text" class="form-input" placeholder="e.g.: Relaxing Piano" maxlength="100" required data-v-40f77877><div class="form-hint" data-v-40f77877> Title of the music, will be displayed in the player interface and filename </div></div><div class="form-group" data-v-40f77877><label for="vocal-style" class="form-label" data-v-40f77877> Music Style <span class="required" data-v-40f77877>*</span></label><input id="vocal-style"${ssrRenderAttr("value", formData.vocalStyle)} type="text" class="form-input" placeholder="e.g.: Jazz" maxlength="200" required data-v-40f77877><div class="form-hint" data-v-40f77877> Style of the music, such as jazz, electronic, classical music genres </div></div><div class="form-group" data-v-40f77877><label for="vocal-negative-tags" class="form-label" data-v-40f77877> Exclude Tags <span class="required" data-v-40f77877>*</span></label><input id="vocal-negative-tags"${ssrRenderAttr("value", formData.vocalNegativeTags)} type="text" class="form-input" placeholder="e.g.: heavy metal, strong drums" maxlength="500" required data-v-40f77877><div class="form-hint" data-v-40f77877> Music styles to exclude, used to avoid specific styles or elements in generated music </div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (formData.function !== "extend" || formData.defaultParamFlag) {
        _push(`<div class="form-group" data-v-40f77877><label for="prompt" class="form-label" data-v-40f77877> Prompt `);
        if (isPromptRequired.value) {
          _push(`<span class="required" data-v-40f77877>*</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label><textarea id="prompt" class="form-input" rows="4"${ssrRenderAttr("placeholder", getPromptPlaceholder())}${ssrRenderAttr("maxlength", getPromptMaxLength())}${ssrIncludeBooleanAttr(isPromptRequired.value) ? " required" : ""} data-v-40f77877>${ssrInterpolate(formData.prompt)}</textarea><div class="form-hint" data-v-40f77877>${ssrInterpolate(getPromptHint())}</div><div class="char-count" data-v-40f77877>${ssrInterpolate(formData.prompt.length)}/${ssrInterpolate(getPromptMaxLength())}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (formData.customMode || formData.function === "extend" && formData.defaultParamFlag || formData.function === "cover" || formData.function === "expand" && formData.expandDefaultParamFlag || formData.function === "accompaniment" || formData.function === "vocal") {
        _push(`<!--[-->`);
        if (formData.function !== "extend") {
          _push(`<div class="form-group" data-v-40f77877><label class="checkbox-label" for="instrumental" data-v-40f77877><input id="instrumental"${ssrIncludeBooleanAttr(Array.isArray(formData.instrumental) ? ssrLooseContain(formData.instrumental, null) : formData.instrumental) ? " checked" : ""} type="checkbox" data-v-40f77877><span class="checkmark" data-v-40f77877></span> Instrumental (No Lyrics) </label><div class="form-hint" data-v-40f77877> If instrumental is selected, only style and title are needed </div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (formData.function !== "vocal" && formData.function !== "accompaniment") {
          _push(`<div class="form-group" data-v-40f77877><label for="style" class="form-label" data-v-40f77877> Music Style <span class="required" data-v-40f77877>*</span></label><input id="style"${ssrRenderAttr("value", formData.style)} type="text" class="form-input" placeholder="e.g.: classical, jazz, electronic, pop, rock"${ssrRenderAttr("maxlength", formData.function === "extend" ? 200 : getStyleMaxLength())} required data-v-40f77877><div class="form-hint" data-v-40f77877>${ssrInterpolate(formData.function === "extend" ? "Music style specification for extended audio. Usually should match the original audio style for best results. Max 200 characters." : "Defines genre, mood, or artistic direction")}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (formData.function !== "vocal" && formData.function !== "accompaniment") {
          _push(`<div class="form-group" data-v-40f77877><label for="title" class="form-label" data-v-40f77877> Music Title <span class="required" data-v-40f77877>*</span></label><input id="title"${ssrRenderAttr("value", formData.title)} type="text" class="form-input" placeholder="e.g.: Peaceful Piano Meditation"${ssrRenderAttr("maxlength", formData.function === "extend" ? 80 : 80)} required data-v-40f77877><div class="form-hint" data-v-40f77877>${ssrInterpolate(formData.function === "extend" ? "Title of the extended music track. Will be displayed in the player interface and filename. Max 80 characters." : "Will be displayed in the player interface and filename")}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (formData.function !== "extend" && !formData.instrumental || formData.function === "extend" && formData.defaultParamFlag) {
          _push(`<div class="form-group" data-v-40f77877><label for="vocal-gender" class="form-label" data-v-40f77877>Vocal Gender</label><div class="select-with-arrow" data-v-40f77877><select id="vocal-gender" class="form-input" data-v-40f77877><option value="" data-v-40f77877${ssrIncludeBooleanAttr(Array.isArray(formData.vocalGender) ? ssrLooseContain(formData.vocalGender, "") : ssrLooseEqual(formData.vocalGender, "")) ? " selected" : ""}>Not specified</option><option value="m" data-v-40f77877${ssrIncludeBooleanAttr(Array.isArray(formData.vocalGender) ? ssrLooseContain(formData.vocalGender, "m") : ssrLooseEqual(formData.vocalGender, "m")) ? " selected" : ""}>Male</option><option value="f" data-v-40f77877${ssrIncludeBooleanAttr(Array.isArray(formData.vocalGender) ? ssrLooseContain(formData.vocalGender, "f") : ssrLooseEqual(formData.vocalGender, "f")) ? " selected" : ""}>Female</option></select><i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true" data-v-40f77877></i></div><div class="form-hint" data-v-40f77877> Vocal gender preference. Optional. &#39;m&#39; for male, &#39;f&#39; for female. According to practice, this parameter can only strengthen probability but cannot guarantee compliance. </div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (formData.function !== "vocal" && formData.function !== "accompaniment") {
          _push(`<div class="form-group" data-v-40f77877><label for="negative-tags" class="form-label" data-v-40f77877>Exclude Tags</label><input id="negative-tags"${ssrRenderAttr("value", formData.negativeTags)} type="text" class="form-input" placeholder="e.g.: heavy metal, fast drums" data-v-40f77877><div class="form-hint" data-v-40f77877>${ssrInterpolate(formData.function === "extend" ? "Music styles or characteristics to exclude from extended audio. Optional. Used to avoid specific unwanted features." : "Music styles or characteristics to exclude from generated audio")}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (formData.function === "extend" ? formData.defaultParamFlag : true) {
          _push(`<div class="form-group" data-v-40f77877><label for="style-weight" class="form-label" data-v-40f77877> Style Weight (${ssrInterpolate(formData.styleWeight.toFixed(2))}) </label><input id="style-weight"${ssrRenderAttr("value", formData.styleWeight)} type="range" min="0" max="1" step="0.01" class="form-slider" data-v-40f77877><div class="slider-labels" data-v-40f77877><span data-v-40f77877>Loose (0)</span><span data-v-40f77877>Strict (1)</span></div>`);
          if (formData.function === "extend") {
            _push(`<div class="form-hint" data-v-40f77877> Intensity of adherence to specified style. Optional. Range 0-1, rounded to 2 decimal places. </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (formData.function === "extend" ? formData.defaultParamFlag : true) {
          _push(`<div class="form-group" data-v-40f77877><label for="weirdness-constraint" class="form-label" data-v-40f77877> Creative Constraint (${ssrInterpolate(formData.weirdnessConstraint.toFixed(2))}) </label><input id="weirdness-constraint"${ssrRenderAttr("value", formData.weirdnessConstraint)} type="range" min="0" max="1" step="0.01" class="form-slider" data-v-40f77877><div class="slider-labels" data-v-40f77877><span data-v-40f77877>Conservative (0)</span><span data-v-40f77877>Experimental (1)</span></div>`);
          if (formData.function === "extend") {
            _push(`<div class="form-hint" data-v-40f77877> Controls experimental/creative deviation. Optional. Range 0-1, rounded to 2 decimal places. </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (formData.function === "extend" ? formData.defaultParamFlag : true) {
          _push(`<div class="form-group" data-v-40f77877><label for="audio-weight" class="form-label" data-v-40f77877> Audio Weight (${ssrInterpolate(formData.audioWeight.toFixed(2))}) </label><input id="audio-weight"${ssrRenderAttr("value", formData.audioWeight)} type="range" min="0" max="1" step="0.01" class="form-slider" data-v-40f77877><div class="slider-labels" data-v-40f77877><span data-v-40f77877>Low Weight (0)</span><span data-v-40f77877>High Weight (1)</span></div>`);
          if (formData.function === "extend") {
            _push(`<div class="form-hint" data-v-40f77877> Relative weight of audio elements. Optional. Range 0-1, rounded to 2 decimal places. </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="generate-btn"${ssrIncludeBooleanAttr(!canGenerate.value || isGenerating.value) ? " disabled" : ""} data-v-40f77877>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-40f77877></i>`);
      } else {
        _push(`<i class="${ssrRenderClass(getButtonIcon())}" data-v-40f77877></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : getButtonText())}${ssrInterpolate(sunoPriceText.value)}</button></fieldset></form></div><div class="result-panel" data-v-40f77877><div class="result-header" data-v-40f77877><h4 data-v-40f77877>Generation Result</h4></div><div class="result-content" data-v-40f77877>`);
      if (isDetailView.value && detailData.value && detailData.value.status === 3) {
        _push(`<div class="detail-failure-state" data-v-40f77877><div class="failure-icon" data-v-40f77877><i class="fas fa-exclamation-circle" data-v-40f77877></i></div><p class="failure-message" data-v-40f77877>Generation failed. You can debug the parameters and try generating again. Generation failure will not consume credits.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || detailData.value.status === 1)) {
        _push(`<div class="detail-loading-state" data-v-40f77877><i class="fas fa-spinner fa-spin detail-spinner" data-v-40f77877></i><p data-v-40f77877>Generating...</p></div>`);
      } else if (!displayResult.value) {
        _push(`<div class="empty-state" data-v-40f77877><i class="fas fa-music" data-v-40f77877></i><p data-v-40f77877>No music generated yet</p><span data-v-40f77877>Configure parameters and click &quot;Generate Music&quot; to start creating</span></div>`);
      } else {
        _push(`<div class="music-result" data-v-40f77877>`);
        if (isDetailView.value && detailOutputItems.value.length) {
          _push(`<!--[--><div class="music-info" data-v-40f77877><h5 data-v-40f77877>${ssrInterpolate(displayResult.value.title || "Generated Music")}</h5><p data-v-40f77877>${ssrInterpolate(displayResult.value.style || "Unknown Style")}</p><div class="music-meta" data-v-40f77877><span data-v-40f77877><i class="fas fa-clock" data-v-40f77877></i> ${ssrInterpolate(displayResult.value.duration || "Unknown Duration")}</span><span data-v-40f77877><i class="fas fa-user" data-v-40f77877></i> ${ssrInterpolate(displayResult.value.model || "Suno")}</span></div></div><div class="detail-output-list" data-v-40f77877><!--[-->`);
          ssrRenderList(detailOutputItems.value, (item, index) => {
            _push(`<!--[-->`);
            if (item.type === "image") {
              _push(`<div class="detail-output-item detail-output-image" data-v-40f77877><img${ssrRenderAttr("src", item.url)}${ssrRenderAttr("alt", "Cover " + (index + 1))} loading="lazy" data-v-40f77877></div>`);
            } else if (item.type === "audio") {
              _push(`<div class="detail-output-item detail-output-audio" data-v-40f77877><audio${ssrRenderAttr("src", item.url)} controls data-v-40f77877></audio></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!--[--><div class="music-player" data-v-40f77877><div class="music-info" data-v-40f77877><h5 data-v-40f77877>${ssrInterpolate(displayResult.value.title || "Generated Music")}</h5><p data-v-40f77877>${ssrInterpolate(displayResult.value.style || "Unknown Style")}</p><div class="music-meta" data-v-40f77877><span data-v-40f77877><i class="fas fa-clock" data-v-40f77877></i> ${ssrInterpolate(displayResult.value.duration || "Unknown Duration")}</span><span data-v-40f77877><i class="fas fa-user" data-v-40f77877></i> ${ssrInterpolate(displayResult.value.model || "Suno")}</span></div></div><div class="player-controls" data-v-40f77877><button class="play-btn" data-v-40f77877><i class="${ssrRenderClass(isPlaying.value ? "fas fa-pause" : "fas fa-play")}" data-v-40f77877></i></button><div class="progress-bar" data-v-40f77877><div class="progress" style="${ssrRenderStyle({ width: progress.value + "%" })}" data-v-40f77877></div></div><span class="time" data-v-40f77877>${ssrInterpolate(formatTime(currentTime.value))} / ${ssrInterpolate(formatTime(duration.value))}</span><div class="playback-speed" data-v-40f77877><span class="speed-label" data-v-40f77877>Speed</span><select class="speed-select" data-v-40f77877><option${ssrRenderAttr("value", 0.5)} data-v-40f77877${ssrIncludeBooleanAttr(Array.isArray(playbackSpeed.value) ? ssrLooseContain(playbackSpeed.value, 0.5) : ssrLooseEqual(playbackSpeed.value, 0.5)) ? " selected" : ""}>0.5x</option><option${ssrRenderAttr("value", 1)} data-v-40f77877${ssrIncludeBooleanAttr(Array.isArray(playbackSpeed.value) ? ssrLooseContain(playbackSpeed.value, 1) : ssrLooseEqual(playbackSpeed.value, 1)) ? " selected" : ""}>1x</option><option${ssrRenderAttr("value", 1.25)} data-v-40f77877${ssrIncludeBooleanAttr(Array.isArray(playbackSpeed.value) ? ssrLooseContain(playbackSpeed.value, 1.25) : ssrLooseEqual(playbackSpeed.value, 1.25)) ? " selected" : ""}>1.25x</option><option${ssrRenderAttr("value", 1.5)} data-v-40f77877${ssrIncludeBooleanAttr(Array.isArray(playbackSpeed.value) ? ssrLooseContain(playbackSpeed.value, 1.5) : ssrLooseEqual(playbackSpeed.value, 1.5)) ? " selected" : ""}>1.5x</option><option${ssrRenderAttr("value", 1.75)} data-v-40f77877${ssrIncludeBooleanAttr(Array.isArray(playbackSpeed.value) ? ssrLooseContain(playbackSpeed.value, 1.75) : ssrLooseEqual(playbackSpeed.value, 1.75)) ? " selected" : ""}>1.75x</option><option${ssrRenderAttr("value", 2)} data-v-40f77877${ssrIncludeBooleanAttr(Array.isArray(playbackSpeed.value) ? ssrLooseContain(playbackSpeed.value, 2) : ssrLooseEqual(playbackSpeed.value, 2)) ? " selected" : ""}>2x</option></select></div></div></div><audio${ssrRenderAttr("src", displayResult.value.audioUrl)} data-v-40f77877></audio><!--]-->`);
        }
        _push(`</div>`);
      }
      _push(`</div></div></div><div class="usage-tips" data-v-40f77877><div class="tip-item" data-v-40f77877><span class="tip-icon" data-v-40f77877>\u{1F3B5}</span><span data-v-40f77877>Music Generation: Create new music; Music Extension: Extend existing audio; Audio Cover: Recreate audio; Audio Expansion: Expand on uploaded audio; Accompaniment: Generate accompaniment; Vocal Generation: Generate vocals for audio</span></div><div class="tip-item" data-v-40f77877><span class="tip-icon" data-v-40f77877>\u{1F3BC}</span><span data-v-40f77877>Simple mode is suitable for quick generation, custom mode provides more control options</span></div><div class="tip-item" data-v-40f77877><span class="tip-icon" data-v-40f77877>\u{1F3B9}</span><span data-v-40f77877>Extend function requires selecting audio, cover and expand functions require uploading audio files (max 2 minutes), accompaniment and vocal generation require uploading source audio files</span></div><div class="tip-item" data-v-40f77877><span class="tip-icon" data-v-40f77877>\u26A1</span><span data-v-40f77877>V5 model has faster generation speed and better music expressiveness</span></div><div class="tip-item" data-v-40f77877><span class="tip-icon" data-v-40f77877>\u{1F3AF}</span><span data-v-40f77877>Vocal generation guides vocal content and style through prompts, supports music style and exclude tags control</span></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/SunoTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SunoTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-40f77877"]]);

export { SunoTool as S };
//# sourceMappingURL=SunoTool-BDchhMzS.mjs.map
