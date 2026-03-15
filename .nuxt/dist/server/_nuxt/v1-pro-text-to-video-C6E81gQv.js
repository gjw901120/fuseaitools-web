import { _ as __nuxt_component_0 } from "./HomeLayout-BhPmJPes.js";
import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { S as SeedanceTool } from "./SeedanceTool-wZptg8mB.js";
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
import "./useModelPrice-DcNReY6Y.js";
import "./useBatchUploadUrl-Wq7pvxpv.js";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
const _sfc_main = {
  __name: "v1-pro-text-to-video",
  __ssrInlineRender: true,
  setup(__props) {
    const seoConfig = useToolSEO({
      name: "Seedance v1 Pro Text to Video",
      description: "Seedance v1 Pro Text to Video - Pro text-to-video with 21:9–9:16, 480p/720p/1080p, 5s/10s.",
      category: "video",
      route: "/home/seedance/v1-pro-text-to-video",
      keywords: ["Seedance", "Pro Text to Video", "AI video", "v1-pro"],
      applicationCategory: "VideoApplication",
      offers: { price: "0", priceCurrency: "USD" }
    });
    useHead(seoConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tool-page" data-v-451712a1${_scopeId}>`);
            _push2(ssrRenderComponent(SeedanceTool, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "tool-page" }, [
                createVNode(SeedanceTool)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/seedance/v1-pro-text-to-video.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const v1ProTextToVideo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-451712a1"]]);
export {
  v1ProTextToVideo as default
};
//# sourceMappingURL=v1-pro-text-to-video-C6E81gQv.js.map
