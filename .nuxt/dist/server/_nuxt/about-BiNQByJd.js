import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-page" }, _attrs))} data-v-dbb23496><section class="hero-section" data-v-dbb23496><div class="simply-container" data-v-dbb23496><div class="hero-content" data-v-dbb23496><h1 class="hero-title" data-v-dbb23496>About Fuse AI Tools</h1><p class="hero-subtitle" data-v-dbb23496> A platform that collects various practical AI tools, committed to providing users with the best AI tool experience. </p></div></div></section><section class="content-section" data-v-dbb23496><div class="simply-container" data-v-dbb23496><div class="content-wrapper" data-v-dbb23496><h2 data-v-dbb23496>Our Mission</h2><p data-v-dbb23496>Fuse AI Tools is committed to providing users with the most comprehensive and practical AI tool collection, enabling everyone to easily use artificial intelligence technology to improve work efficiency and creativity.</p><h2 data-v-dbb23496>Why Choose Us</h2><ul data-v-dbb23496><li data-v-dbb23496>Curated high-quality AI tools, rigorously screened</li><li data-v-dbb23496>Continuous updates, keeping up with AI technology developments</li><li data-v-dbb23496>Detailed usage guides and tutorials</li><li data-v-dbb23496>User-friendly interface design</li></ul><h2 data-v-dbb23496>Contact Us</h2><div class="contact-section" data-v-dbb23496><p class="contact-intro" data-v-dbb23496> We&#39;re here to help! If you have any questions, need assistance, or want to share your feedback, please don&#39;t hesitate to reach out to us. </p><div class="contact-cards" data-v-dbb23496><div class="contact-card" data-v-dbb23496><div class="contact-icon" data-v-dbb23496><i class="fas fa-envelope" data-v-dbb23496></i></div><h3 data-v-dbb23496>Customer Service</h3><p class="contact-description" data-v-dbb23496> For technical support, account issues, billing questions, or any problems you encounter while using our platform. </p><a href="mailto:service@fuseaitools.com" class="contact-email" data-v-dbb23496> service@fuseaitools.com </a></div><div class="contact-card" data-v-dbb23496><div class="contact-icon" data-v-dbb23496><i class="fas fa-lightbulb" data-v-dbb23496></i></div><h3 data-v-dbb23496>Feedback &amp; Suggestions</h3><p class="contact-description" data-v-dbb23496> Share your ideas, feature requests, or suggestions to help us improve and enhance your experience on Fuse AI Tools. </p><a href="mailto:support@fuseaitools.com" class="contact-email" data-v-dbb23496> support@fuseaitools.com </a></div></div><div class="contact-commitment" data-v-dbb23496><div class="commitment-icon" data-v-dbb23496><i class="fas fa-clock" data-v-dbb23496></i></div><p class="commitment-text" data-v-dbb23496> We are committed to responding to your inquiries and questions within 12 hours, and we will work diligently to provide you with satisfactory answers or solutions as quickly as possible. </p></div></div></div></div></section></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-dbb23496"]]);
export {
  about as default
};
//# sourceMappingURL=about-BiNQByJd.js.map
