import { _ as __nuxt_component_0 } from "./HomeLayout-CFv173Mv.js";
import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { V as Veo3Tool } from "./Veo3Tool-LH6gJBa_.js";
import { u as useToolSEO } from "./useToolSEO-CnGqkRSu.js";
import { u as useHead } from "./v3-DXSoGrP9.js";
import { _ as _export_sfc } from "../server.mjs";
import "./nuxt-link-BgkIFP7n.js";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
import "vue-router";
import "./useAuth-ComhLj5o.js";
import "#internal/nuxt/paths";
import "./UploadImage-a1UOMv8U.js";
import "./useToast-CATlmXE8.js";
import "./useModelPrice-BZpig2xf.js";
import "./useRecordPolling-DxMEWIpb.js";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
const _sfc_main = {
  __name: "reference-to-video",
  __ssrInlineRender: true,
  setup(__props) {
    const seoConfig = useToolSEO({
      name: "Veo3 Reference to Video",
      description: "Veo3 Reference to Video - Generate video from reference images. Use Google Veo 3 for free online.",
      category: "video",
      route: "/home/veo3/reference-to-video",
      keywords: ["Veo3", "Reference to Video", "AI video", "Google Veo"],
      applicationCategory: "VideoApplication",
      offers: { price: "0", priceCurrency: "USD" }
    });
    useHead(seoConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tool-page" data-v-b7dfef16${_scopeId}>`);
            _push2(ssrRenderComponent(Veo3Tool, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "tool-page" }, [
                createVNode(Veo3Tool)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/veo3/reference-to-video.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const referenceToVideo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b7dfef16"]]);
export {
  referenceToVideo as default
};
//# sourceMappingURL=reference-to-video-B2ki3qNV.js.map
