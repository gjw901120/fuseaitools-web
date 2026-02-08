import { _ as __nuxt_component_0 } from "./HomeLayout-CFv173Mv.js";
import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { S as SunoTool } from "./SunoTool-DMg_-YDh.js";
import { u as useToolSEO } from "./useToolSEO-CnGqkRSu.js";
import { u as useHead } from "./v3-DXSoGrP9.js";
import { _ as _export_sfc } from "../server.mjs";
import "./nuxt-link-BgkIFP7n.js";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
import "vue-router";
import "./useAuth-ComhLj5o.js";
import "#internal/nuxt/paths";
import "./UploadAudio-oxGsi1Fq.js";
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
  __name: "add-vocals",
  __ssrInlineRender: true,
  setup(__props) {
    const seoConfig = useToolSEO({
      name: "Suno - Vocal Generation",
      description: "Generate vocals for audio with Suno AI. Use for free online.",
      category: "audio",
      route: "/home/suno/add-vocals",
      keywords: ["Suno", "Vocal Generation", "AI music"],
      applicationCategory: "AudioApplication",
      offers: { price: "0", priceCurrency: "USD" }
    });
    useHead(seoConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tool-page" data-v-cdd8bead${_scopeId}>`);
            _push2(ssrRenderComponent(SunoTool, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "tool-page" }, [
                createVNode(SunoTool)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/suno/add-vocals.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const addVocals = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cdd8bead"]]);
export {
  addVocals as default
};
//# sourceMappingURL=add-vocals-BTrV6tXO.js.map
