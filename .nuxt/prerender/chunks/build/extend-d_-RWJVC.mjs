import { _ as __nuxt_component_0 } from './HomeLayout-CFv173Mv.mjs';
import { withCtx, createVNode, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderComponent } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { V as Veo3Tool } from './Veo3Tool-LH6gJBa_.mjs';
import { u as useToolSEO } from './useToolSEO-CnGqkRSu.mjs';
import { u as useHead } from './v3-DXSoGrP9.mjs';
import { _ as _export_sfc } from './server.mjs';
import './nuxt-link-BgkIFP7n.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import '../_/renderer.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/destr/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ofetch/dist/node.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unstorage/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/project/fuseaitools-web/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/project/fuseaitools-web/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ohash/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/klona/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/scule/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/project/fuseaitools-web/node_modules/pathe/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unhead/dist/server.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/devalue/index.js';
import 'file://C:/project/fuseaitools-web/node_modules/unhead/dist/utils.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unhead/dist/plugins.mjs';
import './UploadImage-a1UOMv8U.mjs';
import './useAuth-ComhLj5o.mjs';
import './useToast-CATlmXE8.mjs';
import './useModelPrice-BZpig2xf.mjs';
import './useRecordPolling-DxMEWIpb.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs';

const _sfc_main = {
  __name: "extend",
  __ssrInlineRender: true,
  setup(__props) {
    const seoConfig = useToolSEO({
      name: "Veo3 Video Extend",
      description: "Veo3 Video Extend - Extend video duration or content from existing clips. Use for free online.",
      category: "video",
      route: "/home/veo3/extend",
      keywords: ["Veo3", "Video Extend", "extend video", "AI video"],
      applicationCategory: "VideoApplication",
      offers: { price: "0", priceCurrency: "USD" }
    });
    useHead(seoConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tool-page" data-v-92ebc0fb${_scopeId}>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/veo3/extend.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const extend = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-92ebc0fb"]]);

export { extend as default };
//# sourceMappingURL=extend-d_-RWJVC.mjs.map
