import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useHead } from "./v3-DXSoGrP9.js";
import { _ as _export_sfc } from "../server.mjs";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
const _sfc_main = {
  __name: "test-routes",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Route Testing - FuseAI Tools",
      meta: [
        {
          name: "description",
          content: "Test whether all tool routing functions work properly."
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "test-page" }, _attrs))} data-v-3fe56d72><h1 data-v-3fe56d72>路由测试页面</h1><div class="test-links" data-v-3fe56d72><a href="/home/elevenlabs" class="test-link" data-v-3fe56d72>ElevenLabs 主页</a><a href="/home/elevenlabs/multilingual-v2" class="test-link" data-v-3fe56d72>ElevenLabs Multilingual v2</a><a href="/home/elevenlabs/turbo-2-5" class="test-link" data-v-3fe56d72>ElevenLabs Turbo 2.5</a><a href="/home/nano-banana" class="test-link" data-v-3fe56d72>Nano Banana 主页</a><a href="/home/gpt-4o-image/generate" class="test-link" data-v-3fe56d72>GPT 4o Image 主页</a></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test-routes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const testRoutes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3fe56d72"]]);
export {
  testRoutes as default
};
//# sourceMappingURL=test-routes-DKqpUqa1.js.map
