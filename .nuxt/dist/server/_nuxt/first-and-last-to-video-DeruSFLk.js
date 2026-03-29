import { _ as __nuxt_component_0 } from "./HomeLayout-DmP_sp7g.js";
import { withAsyncContext, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { V as Veo3Tool } from "./Veo3Tool-B81C6sH2.js";
import { a as useToolSEOAsync } from "./useToolSEO-Da7aGo7f.js";
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
  __name: "first-and-last-to-video",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const seoConfig = ([__temp, __restore] = withAsyncContext(() => useToolSEOAsync({
      name: "Veo 3 First and Last Frames to Video Generator",
      description: "Generate transition videos from two keyframe images using Google Veo 3. Pay per video with credits.",
      category: "video",
      route: "/home/veo3/first-and-last-to-video",
      keywords: ["Veo3", "First And Last Frames", "image to video", "AI video"],
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Video Generation",
      offers: { price: "0", priceCurrency: "USD" },
      offerDescription: "Pay per video with credits.",
      priceFromApi: { modelKey: ["veo3", "veo3_fast"], eligibleQuantityName: "Credits Required" }
    })), __temp = await __temp, __restore(), __temp);
    useHead(seoConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tool-page" data-v-807b8b33${_scopeId}>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/veo3/first-and-last-to-video.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const firstAndLastToVideo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-807b8b33"]]);
export {
  firstAndLastToVideo as default
};
//# sourceMappingURL=first-and-last-to-video-DeruSFLk.js.map
