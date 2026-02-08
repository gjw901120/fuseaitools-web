import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = {
  __name: "UploadImage",
  __ssrInlineRender: true,
  props: {
    // 基础配置
    inputId: {
      type: String,
      default: "image-upload"
    },
    label: {
      type: String,
      default: "参考图片 (可选)"
    },
    // 上传区域配置
    uploadIcon: {
      type: String,
      default: "fas fa-cloud-upload-alt"
    },
    uploadText: {
      type: String,
      default: "点击上传图片"
    },
    uploadHint: {
      type: String,
      default: "支持 .jfif, .jpeg, .jpg, .png, .webp (最多5张)"
    },
    // 文件配置
    accept: {
      type: String,
      default: ".jfif,.pjpeg,.jpeg,.pjp,.jpg,.png,.webp"
    },
    multiple: {
      type: Boolean,
      default: true
    },
    maxFiles: {
      type: Number,
      default: 5
    },
    maxFileSize: {
      type: Number,
      default: 10 * 1024 * 1024
      // 10MB
    },
    // 额外提示
    additionalHint: {
      type: String,
      default: ""
    },
    // 主题配置
    themeColor: {
      type: String,
      default: "#6366f1"
    }
  },
  emits: ["update:files", "file-added", "file-removed"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const fileInput = ref(null);
    const uploadedFiles = ref([]);
    const isImage = (file) => {
      return file.type.startsWith("image/");
    };
    const getFilePreview = (file) => {
      return URL.createObjectURL(file);
    };
    const getFileIcon = (file) => {
      if (file.type.startsWith("image/")) {
        return "fas fa-image";
      } else if (file.type.startsWith("video/")) {
        return "fas fa-video";
      } else if (file.type.startsWith("audio/")) {
        return "fas fa-file-audio";
      } else {
        return "fas fa-file";
      }
    };
    const clearFiles = () => {
      uploadedFiles.value = [];
      if (fileInput.value) {
        fileInput.value.value = "";
      }
      emit("update:files", []);
    };
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    __expose({
      clearFiles,
      triggerUpload: () => {
        var _a;
        return (_a = fileInput.value) == null ? void 0 : _a.click();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        ":--v6008fe80": __props.themeColor
      } };
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "uploaded-image" }, _attrs, _cssVars))} data-v-3fbc44ea><div class="form-group" data-v-3fbc44ea><label data-v-3fbc44ea>${ssrInterpolate(__props.label)}</label><div class="file-upload-area" data-v-3fbc44ea><input${ssrRenderAttr("id", __props.inputId)} type="file"${ssrRenderAttr("accept", __props.accept)}${ssrIncludeBooleanAttr(__props.multiple) ? " multiple" : ""} class="file-input" data-v-3fbc44ea><label${ssrRenderAttr("for", __props.inputId)} class="file-upload-label" data-v-3fbc44ea><div class="upload-content" data-v-3fbc44ea><i class="${ssrRenderClass(__props.uploadIcon)}" data-v-3fbc44ea></i><div class="upload-text" data-v-3fbc44ea><span data-v-3fbc44ea>${ssrInterpolate(__props.uploadText)}</span><small data-v-3fbc44ea>${ssrInterpolate(__props.uploadHint)}</small></div></div></label></div>`);
      if (uploadedFiles.value.length > 0) {
        _push(`<div class="uploaded-files" data-v-3fbc44ea><!--[-->`);
        ssrRenderList(uploadedFiles.value, (file, index) => {
          _push(`<div class="file-item" data-v-3fbc44ea><div class="${ssrRenderClass([{ "clickable": isImage(file) }, "file-preview"])}" data-v-3fbc44ea>`);
          if (isImage(file)) {
            _push(`<img${ssrRenderAttr("src", getFilePreview(file))}${ssrRenderAttr("alt", file.name)} class="preview-image" data-v-3fbc44ea>`);
          } else {
            _push(`<i class="${ssrRenderClass([getFileIcon(file), "file-icon"])}" data-v-3fbc44ea></i>`);
          }
          if (isImage(file)) {
            _push(`<div class="preview-overlay" data-v-3fbc44ea><i class="fas fa-eye" data-v-3fbc44ea></i></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="file-info" data-v-3fbc44ea><span class="file-name" data-v-3fbc44ea>${ssrInterpolate(file.name)}</span><span class="file-size" data-v-3fbc44ea>${ssrInterpolate(formatFileSize(file.size))}</span></div><button type="button" class="remove-file" data-v-3fbc44ea><i class="fas fa-times" data-v-3fbc44ea></i></button></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.additionalHint) {
        _push(`<div class="additional-hint" data-v-3fbc44ea>${ssrInterpolate(__props.additionalHint)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/common/UploadImage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UploadImage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3fbc44ea"]]);
export {
  UploadImage as U
};
//# sourceMappingURL=UploadImage-a1UOMv8U.js.map
