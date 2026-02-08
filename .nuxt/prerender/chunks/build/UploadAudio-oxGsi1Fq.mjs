import { ref, computed, mergeProps, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderStyle } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  __name: "UploadAudio",
  __ssrInlineRender: true,
  props: {
    inputId: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: "\u4E0A\u4F20\u97F3\u9891\u6587\u4EF6"
    },
    uploadIcon: {
      type: String,
      default: "fas fa-cloud-upload-alt"
    },
    uploadText: {
      type: String,
      default: "\u70B9\u51FB\u4E0A\u4F20\u97F3\u9891\u6587\u4EF6"
    },
    uploadHint: {
      type: String,
      default: "\u652F\u6301 MP3, WAV, M4A \u7B49\u683C\u5F0F"
    },
    additionalHint: {
      type: String,
      default: ""
    },
    themeColor: {
      type: String,
      default: "#10b981"
    },
    maxDuration: {
      type: Number,
      default: null
      // 最大时长（秒）
    },
    maxFileSize: {
      type: Number,
      default: 10 * 1024 * 1024
      // 默认10MB
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:files"],
  setup(__props, { emit: __emit }) {
    ref(null);
    ref(null);
    const uploadedFile = ref(null);
    const isPlaying = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    const progress = computed(() => {
      return duration.value > 0 ? currentTime.value / duration.value * 100 : 0;
    });
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    const formatTime = (seconds) => {
      if (isNaN(seconds)) return "0:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        ":--v39e840aa": __props.themeColor
      } };
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "uploaded-audio" }, _attrs, _cssVars))} data-v-68b38d73><div class="upload-container" data-v-68b38d73><input${ssrRenderAttr("id", __props.inputId)} type="file" accept="audio/*" class="file-input" data-v-68b38d73><div class="upload-area" data-v-68b38d73><div class="upload-content" data-v-68b38d73><div class="upload-icon" data-v-68b38d73><i class="${ssrRenderClass(__props.uploadIcon)}" data-v-68b38d73></i></div><div class="upload-text" data-v-68b38d73><span class="upload-title" data-v-68b38d73>${ssrInterpolate(__props.uploadText)}</span><small class="upload-subtitle" data-v-68b38d73>${ssrInterpolate(__props.uploadHint)}</small></div></div></div></div>`);
      if (uploadedFile.value) {
        _push(`<div class="uploaded-audio-display" data-v-68b38d73><div class="audio-file-info" data-v-68b38d73><i class="fas fa-file-audio audio-icon" data-v-68b38d73></i><div class="file-details" data-v-68b38d73><span class="file-name" data-v-68b38d73>${ssrInterpolate(uploadedFile.value.name)}</span><span class="file-size" data-v-68b38d73>${ssrInterpolate(formatFileSize(uploadedFile.value.size))}</span></div><button type="button" class="remove-btn" title="\u5220\u9664\u6587\u4EF6" data-v-68b38d73><i class="fas fa-times" data-v-68b38d73></i></button></div><div class="audio-player" data-v-68b38d73><button type="button" class="${ssrRenderClass([{ playing: isPlaying.value }, "play-pause-btn"])}"${ssrRenderAttr("title", isPlaying.value ? "\u6682\u505C" : "\u64AD\u653E")} data-v-68b38d73><i class="${ssrRenderClass(isPlaying.value ? "fas fa-pause" : "fas fa-play")}" data-v-68b38d73></i></button><div class="progress-container" data-v-68b38d73><div class="progress-bar" style="${ssrRenderStyle({ width: progress.value + "%" })}" data-v-68b38d73></div></div><span class="time-display" data-v-68b38d73>${ssrInterpolate(formatTime(currentTime.value))} / ${ssrInterpolate(formatTime(duration.value))}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.additionalHint) {
        _push(`<div class="additional-hint" data-v-68b38d73>${ssrInterpolate(__props.additionalHint)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<audio data-v-68b38d73></audio></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/common/UploadAudio.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UploadAudio = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-68b38d73"]]);

export { UploadAudio as U };
//# sourceMappingURL=UploadAudio-oxGsi1Fq.mjs.map
