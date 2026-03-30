import { _ as __nuxt_component_0 } from "./HomeLayout-DmP_sp7g.js";
import { withAsyncContext, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { I as Imagen4Tool } from "./Imagen4Tool-CFZ-bQeX.js";
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
import "./useRecordPolling-QI_mIuwF.js";
import "./useModelPrice-DCrt0_k3.js";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
const _sfc_main = {
  __name: "imagen4-ultra",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const seoConfig = ([__temp, __restore] = withAsyncContext(() => useToolSEOAsync({
      name: "Imagen4 Ultra",
      description: "High-fidelity image generation with Imagen4 Ultra. Supports prompt, negative prompt, aspect ratio, and seed.",
      category: "image",
      route: "/home/imagen4/imagen4-ultra",
      keywords: ["Imagen4 Ultra", "AI image", "Google Imagen 4 Ultra"],
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Image Generation",
      offers: { price: "0", priceCurrency: "USD" },
      offerDescription: "Pay per image with credits.",
      priceFromApi: { modelKey: "imagen4-ultra", eligibleQuantityName: "Credits Required" }
    })), __temp = await __temp, __restore(), __temp);
    useHead(seoConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tool-page" data-v-64fd2898${_scopeId}>`);
            _push2(ssrRenderComponent(Imagen4Tool, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "tool-page" }, [
                createVNode(Imagen4Tool)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/imagen4/imagen4-ultra.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const imagen4Ultra = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-64fd2898"]]);
export {
  imagen4Ultra as default
};
//# sourceMappingURL=imagen4-ultra-CmnBuU4P.js.map
