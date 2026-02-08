import { u as useToolOverviewPage, _ as __nuxt_component_0 } from "./useToolOverviewPage-B8o7LoIe.js";
import { e as __nuxt_component_1 } from "../server.mjs";
import { unref, mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import "./HomeLayout-CFv173Mv.js";
import "./nuxt-link-BgkIFP7n.js";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
import "vue-router";
import "./useAuth-ComhLj5o.js";
import "./v3-DXSoGrP9.js";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
const _sfc_main = {
  __name: "gpt",
  __ssrInlineRender: true,
  setup(__props) {
    const { isOverviewPage, overviewConfig } = useToolOverviewPage();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ToolOverview = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      if (unref(isOverviewPage) && unref(overviewConfig)) {
        _push(ssrRenderComponent(_component_ToolOverview, mergeProps({ config: unref(overviewConfig) }, _attrs), null, _parent));
      } else {
        _push(ssrRenderComponent(_component_NuxtPage, _attrs, null, _parent));
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/gpt.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=gpt-EVjB1Mm0.js.map
