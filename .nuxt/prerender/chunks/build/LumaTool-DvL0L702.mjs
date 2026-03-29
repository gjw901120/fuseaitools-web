import { inject, reactive, ref, computed, watch, mergeProps, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { useRouter, useRoute } from 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import { u as useAuth } from './useAuth-BT_C6798.mjs';
import { u as useToast } from './useToast-CATlmXE8.mjs';
import { u as useApi } from './useApi-1a9EtG7k.mjs';
import { u as useModelPrice } from './useModelPrice-DCrt0_k3.mjs';
import { u as useRecordPolling } from './useRecordPolling-QI_mIuwF.mjs';
import { _ as _export_sfc } from './server.mjs';

const _imports_0 = publicAssetsURL("/tools-logo/Luma.png");
const _sfc_main = {
  __name: "LumaTool",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    inject("addToUsageHistory");
    useAuth();
    const { getPrice, formatCredits, discount } = useModelPrice();
    useToast();
    useApi();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const formData = reactive({
      prompt: "",
      watermark: ""
    });
    const referenceVideo = ref("");
    const videoFile = ref(null);
    const uploadedVideoUrl = ref(null);
    const isUploadingVideo = ref(false);
    ref(null);
    const isGenerating = ref(false);
    const formatFileSize = (bytes) => {
      if (bytes == null || bytes === 0) return "0 B";
      const k = 1024;
      const sizes = ["B", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    const generatedVideos = ref([]);
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const loadingRecordId = ref(null);
    ref(null);
    computed(() => {
      var _a, _b, _c, _d, _e;
      if (isDetailView.value && ((_a = detailData.value) == null ? void 0 : _a.status) === 2 && ((_c = (_b = detailData.value) == null ? void 0 : _b.outputUrls) == null ? void 0 : _c.length)) {
        const url = typeof detailData.value.outputUrls[0] === "string" ? detailData.value.outputUrls[0] : (_d = detailData.value.outputUrls[0]) == null ? void 0 : _d.url;
        return [{ id: "detail", url, prompt: ((_e = detailData.value.originalData) == null ? void 0 : _e.prompt) || "", createdAt: (/* @__PURE__ */ new Date()).toISOString() }];
      }
      return generatedVideos.value;
    });
    function fillFormFromOriginalData(o) {
      if (!o || typeof o !== "object") return;
      Object.keys(formData).forEach((k) => {
        if (o[k] !== void 0) formData[k] = o[k];
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
    const lumaPriceText = computed(() => {
      var _a;
      const credits = getPrice("Luma");
      const str = formatCredits(credits);
      const rate = Number((_a = discount == null ? void 0 : discount.value) != null ? _a : 1);
      let discountText = "";
      if (!Number.isNaN(rate) && rate > 0 && rate !== 1) {
        const percent = (rate * 100).toFixed(0);
        discountText = ` \xB7 ${percent}%`;
      }
      return str ? `\xB7 ${str} credits${discountText}` : "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "luma-tool" }, _attrs))} data-v-f7a5d116><div class="tool-header" data-v-f7a5d116><div class="tool-avatar" data-v-f7a5d116><img${ssrRenderAttr("src", _imports_0)} alt="Luma" data-v-f7a5d116></div><div class="tool-details" data-v-f7a5d116><h3 data-v-f7a5d116>Luma</h3><p data-v-f7a5d116>Build and scale creative products with the world&#39;s most popular and intuitive Video and Image generation models with Luma.</p></div></div><div class="main-content" data-v-f7a5d116><div class="config-panel" data-v-f7a5d116><div class="config-header" data-v-f7a5d116><h4 data-v-f7a5d116>Video Modification Configuration</h4></div><form class="config-form" data-v-f7a5d116><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-f7a5d116><div class="form-group" data-v-f7a5d116><label for="prompt" data-v-f7a5d116>Modification Description *</label><textarea id="prompt" placeholder="Text prompt describing the desired video modification. Should be detailed and specific in describing the desired changes, describing the visual elements you want to add or modify. Important: English only." rows="4" required data-v-f7a5d116>${ssrInterpolate(formData.prompt)}</textarea></div><div class="form-group" data-v-f7a5d116><label class="form-label" data-v-f7a5d116>Input Video *</label><div class="luma-video-upload" data-v-f7a5d116><div class="${ssrRenderClass([{ "has-video": referenceVideo.value }, "luma-video-trigger"])}" data-v-f7a5d116><input type="file" accept="video/*" class="luma-video-file-input" data-v-f7a5d116><div class="luma-video-trigger-inner" data-v-f7a5d116><i class="fas fa-cloud-upload-alt" data-v-f7a5d116></i><span data-v-f7a5d116>Click to upload video</span><small data-v-f7a5d116>Supports MP4, MOV, AVI, max 500MB</small></div></div>`);
      if (isUploadingVideo.value) {
        _push(`<div class="luma-video-uploading" data-v-f7a5d116><i class="fas fa-spinner fa-spin" data-v-f7a5d116></i> Uploading video... </div>`);
      } else {
        _push(`<!---->`);
      }
      if (referenceVideo.value && !isUploadingVideo.value) {
        _push(`<div class="luma-video-display" data-v-f7a5d116><div class="luma-video-preview-wrap" data-v-f7a5d116><video${ssrRenderAttr("src", referenceVideo.value)} class="luma-video-preview" controls data-v-f7a5d116></video><button type="button" class="luma-video-remove" title="Remove" data-v-f7a5d116><i class="fas fa-times" data-v-f7a5d116></i></button></div>`);
        if (videoFile.value) {
          _push(`<div class="luma-video-meta" data-v-f7a5d116><span class="luma-video-name" data-v-f7a5d116>${ssrInterpolate(videoFile.value.name)}</span><span class="luma-video-size" data-v-f7a5d116>${ssrInterpolate(formatFileSize(videoFile.value.size))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-hint" data-v-f7a5d116> Input video for modification. Supports MP4, MOV, AVI formats, maximum 500MB, maximum 10 seconds. </div></div><div class="form-group" data-v-f7a5d116><label for="watermark" data-v-f7a5d116>Watermark Identifier</label><input id="watermark"${ssrRenderAttr("value", formData.watermark)} type="text" placeholder="your-watermark-id" data-v-f7a5d116><div class="form-help" data-v-f7a5d116> Optional parameter. If provided, a watermark will be added to the output video, which can be used for branding or identification purposes. </div></div><div class="form-actions" data-v-f7a5d116><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!((_a = formData.prompt) == null ? void 0 : _a.trim()) || !uploadedVideoUrl.value || isGenerating.value) ? " disabled" : ""} data-v-f7a5d116>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-f7a5d116></i>`);
      } else {
        _push(`<i class="fas fa-magic" data-v-f7a5d116></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Modifying..." : "Modify Video")} `);
      if (lumaPriceText.value) {
        _push(`<span class="price-tag" data-v-f7a5d116>${ssrInterpolate(lumaPriceText.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></fieldset></form></div><div class="result-panel" data-v-f7a5d116><div class="video-header" data-v-f7a5d116><h4 data-v-f7a5d116>Video Preview</h4>`);
      if (generatedVideos.value.length > 0) {
        _push(`<div class="video-actions" data-v-f7a5d116><button class="btn-secondary" data-v-f7a5d116><i class="fas fa-trash" data-v-f7a5d116></i> Clear All </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="video-container" data-v-f7a5d116>`);
      if (generatedVideos.value.length > 0) {
        _push(`<div class="video-showcase" data-v-f7a5d116><!--[-->`);
        ssrRenderList(generatedVideos.value, (video, index) => {
          _push(`<div class="video-showcase-item" data-v-f7a5d116><div class="video-player" data-v-f7a5d116><video controls${ssrRenderAttr("src", video.url)}${ssrRenderAttr("poster", video.thumbnail)} data-v-f7a5d116> Your browser does not support video playback </video></div><div class="video-details" data-v-f7a5d116><div class="video-meta" data-v-f7a5d116><span class="video-duration" data-v-f7a5d116>${ssrInterpolate(video.duration)}</span><span class="video-size" data-v-f7a5d116>${ssrInterpolate(video.size)}</span>`);
          if (video.watermark) {
            _push(`<span class="video-watermark" data-v-f7a5d116>${ssrInterpolate(video.watermark)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="video-actions" data-v-f7a5d116><button class="btn-icon" title="Download" data-v-f7a5d116><i class="fas fa-download" data-v-f7a5d116></i></button><button class="btn-icon" title="Share" data-v-f7a5d116><i class="fas fa-share" data-v-f7a5d116></i></button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty-state" data-v-f7a5d116><div class="empty-icon" data-v-f7a5d116><i class="fas fa-magic" data-v-f7a5d116></i></div><h3 data-v-f7a5d116>Waiting to Modify Video</h3><p data-v-f7a5d116>Enter video URL and modification description, click &quot;Modify Video&quot; button to start processing</p><div class="empty-features" data-v-f7a5d116><div class="feature-item" data-v-f7a5d116><i class="fas fa-cube" data-v-f7a5d116></i><span data-v-f7a5d116>3D Video Generation</span></div><div class="feature-item" data-v-f7a5d116><i class="fas fa-edit" data-v-f7a5d116></i><span data-v-f7a5d116>Video Modification</span></div><div class="feature-item" data-v-f7a5d116><i class="fas fa-eye" data-v-f7a5d116></i><span data-v-f7a5d116>Visual Effects</span></div></div></div>`);
      }
      _push(`</div></div></div><div class="usage-tips" data-v-f7a5d116><div class="tip-item" data-v-f7a5d116><span class="tip-icon" data-v-f7a5d116>\u{1F310}</span><span data-v-f7a5d116><strong data-v-f7a5d116>English Description:</strong> All prompts must be in English, ensure description is accurate and clear</span></div><div class="tip-item" data-v-f7a5d116><span class="tip-icon" data-v-f7a5d116>\u{1F4DD}</span><span data-v-f7a5d116><strong data-v-f7a5d116>Detailed Description:</strong> Specifically describe the visual elements to add or modify</span></div><div class="tip-item" data-v-f7a5d116><span class="tip-icon" data-v-f7a5d116>\u{1F3A5}</span><span data-v-f7a5d116><strong data-v-f7a5d116>Video Requirements:</strong> Input video maximum 500MB, maximum 10 seconds</span></div><div class="tip-item" data-v-f7a5d116><span class="tip-icon" data-v-f7a5d116>\u{1F4C1}</span><span data-v-f7a5d116><strong data-v-f7a5d116>Format Support:</strong> Supports MP4, MOV, AVI formats</span></div><div class="tip-item" data-v-f7a5d116><span class="tip-icon" data-v-f7a5d116>\u{1F3AC}</span><span data-v-f7a5d116><strong data-v-f7a5d116>3D Effects:</strong> Focus on 3D scenes and three-dimensional visual effects</span></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/LumaTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LumaTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f7a5d116"]]);

export { LumaTool as L };
//# sourceMappingURL=LumaTool-DvL0L702.mjs.map
