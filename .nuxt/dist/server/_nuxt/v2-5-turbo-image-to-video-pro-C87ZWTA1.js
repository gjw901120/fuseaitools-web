import { _ as __nuxt_component_0 } from "./HomeLayout-BhPmJPes.js";
import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { K as KlingTool } from "./KlingTool-CN4Umoxm.js";
import { u as useToolSEO } from "./useToolSEO-Biuf6Haj.js";
import { u as useHead } from "./v3-DXSoGrP9.js";
import { _ as _export_sfc } from "../server.mjs";
import "./nuxt-link-BgkIFP7n.js";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
import "vue-router";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import "./client-only-BJZIIy-4.js";
import "C:/project/fuseaitools-web/node_modules/klona/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import "./useAuth-BT_C6798.js";
import "./UploadImage-CdWm1sTQ.js";
import "./useToast-CATlmXE8.js";
import "./useRecordPolling-QI_mIuwF.js";
import "./useBatchUploadUrl-Wq7pvxpv.js";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
const _sfc_main = {
  __name: "v2-5-turbo-image-to-video-pro",
  __ssrInlineRender: true,
  setup(__props) {
    const seoConfig = useToolSEO({
      name: "Kling v2.5 Turbo Image to Video Pro",
      description: "Kling v2.5 Turbo Image to Video Pro - High-quality image-to-video with tail frame, duration 5/10s, negative prompt, CFG scale.",
      category: "video",
      route: "/home/kling/v2-5-turbo-image-to-video-pro",
      keywords: ["Kling", "Kuaishou", "Image to Video", "AI video", "v2.5 Turbo"],
      applicationCategory: "VideoApplication",
      offers: { price: "0", priceCurrency: "USD" }
    });
    useHead(seoConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tool-page" data-v-777bba8c${_scopeId}>`);
            _push2(ssrRenderComponent(KlingTool, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "tool-page" }, [
                createVNode(KlingTool)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/kling/v2-5-turbo-image-to-video-pro.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const v25TurboImageToVideoPro = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-777bba8c"]]);
export {
  v25TurboImageToVideoPro as default
};
//# sourceMappingURL=v2-5-turbo-image-to-video-pro-C87ZWTA1.js.map
