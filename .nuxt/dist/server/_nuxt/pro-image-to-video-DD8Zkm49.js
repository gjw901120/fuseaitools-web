import { _ as __nuxt_component_0 } from "./HomeLayout-DmP_sp7g.js";
import { _ as __nuxt_component_0$1 } from "./client-only-BJZIIy-4.js";
import { withAsyncContext, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { S as SoraTool } from "./SoraTool-DFiQ9B8J.js";
import { a as useToolSEOAsync } from "./useToolSEO-Da7aGo7f.js";
import { u as useHead } from "./v3-DXSoGrP9.js";
import { _ as _export_sfc } from "../server.mjs";
import "./nuxt-link-BgkIFP7n.js";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
import "vue-router";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/klona/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import "./useApi-1a9EtG7k.js";
import "./useAuth-BT_C6798.js";
import "./useToast-CATlmXE8.js";
import "./UploadImage-D6DL1USQ.js";
import "./useModelPrice-DCrt0_k3.js";
import "./useRecordPolling-QI_mIuwF.js";
import "./useBatchUploadUrl-_AVZ_-oO.js";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
const _sfc_main = {
  __name: "pro-image-to-video",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const seoConfig = ([__temp, __restore] = withAsyncContext(() => useToolSEOAsync({
      name: "Sora Pro Image to Video Generator",
      description: "High-quality image-to-video with Sora 2 Pro. Pay per video with credits.",
      category: "video",
      route: "/home/sora/pro-image-to-video",
      keywords: ["Sora", "Sora 2 Pro", "image-to-video", "AI video generation"],
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Video Generation",
      offers: { price: "0", priceCurrency: "USD" },
      offerDescription: "Pay per video with credits.",
      priceFromApi: { modelKey: "sora-2-pro-image-to-video", eligibleQuantityName: "Credits Required" }
    })), __temp = await __temp, __restore(), __temp);
    useHead(seoConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tool-page" data-v-b05b51dc${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              fallback: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div style="${ssrRenderStyle({ "padding": "20px", "text-align": "center" })}" data-v-b05b51dc${_scopeId2}>Loading Sora Tool...</div>`);
                } else {
                  return [
                    createVNode("div", { style: { "padding": "20px", "text-align": "center" } }, "Loading Sora Tool...")
                  ];
                }
              })
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "tool-page" }, [
                createVNode(_component_ClientOnly, null, {
                  fallback: withCtx(() => [
                    createVNode("div", { style: { "padding": "20px", "text-align": "center" } }, "Loading Sora Tool...")
                  ]),
                  default: withCtx(() => [
                    createVNode(SoraTool)
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/sora/pro-image-to-video.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const proImageToVideo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b05b51dc"]]);
export {
  proImageToVideo as default
};
//# sourceMappingURL=pro-image-to-video-DD8Zkm49.js.map
