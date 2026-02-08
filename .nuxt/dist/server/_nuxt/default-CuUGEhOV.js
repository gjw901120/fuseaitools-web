import { _ as __nuxt_component_0$2 } from "./client-only-BJZIIy-4.js";
import { _ as __nuxt_component_0$3 } from "./nuxt-link-BgkIFP7n.js";
import { ref, unref, useSSRContext, computed, watch, nextTick, mergeProps, withCtx, createVNode, createTextVNode } from "vue";
import { ssrRenderTeleport, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { u as useAuth } from "./useAuth-ComhLj5o.js";
import { _ as _export_sfc, u as useRouter } from "../server.mjs";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import { u as useToast } from "./useToast-CATlmXE8.js";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
const _sfc_main$6 = {
  __name: "LoginModal",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "google-login", "email-login", "show-verify-code"],
  setup(__props, { emit: __emit }) {
    const email = ref("");
    const loading = ref(false);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.isOpen) {
          _push2(`<div class="modal-overlay" data-v-9caf3621><div class="modal-content" data-v-9caf3621><button class="close-btn" data-v-9caf3621><i class="fas fa-times" data-v-9caf3621></i></button><div class="modal-header" data-v-9caf3621><h2 class="modal-title" data-v-9caf3621>Welcome</h2><p class="modal-subtitle" data-v-9caf3621>Sign in or sign up to continue</p></div><div class="login-options" data-v-9caf3621><button class="login-btn google-btn" data-v-9caf3621><div class="btn-content" data-v-9caf3621><svg class="google-icon" viewBox="0 0 24 24" width="20" height="20" data-v-9caf3621><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" data-v-9caf3621></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" data-v-9caf3621></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" data-v-9caf3621></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" data-v-9caf3621></path></svg><span data-v-9caf3621>Continue with Google</span></div></button><div class="divider" data-v-9caf3621><span class="divider-text" data-v-9caf3621>OR</span></div><div class="email-login" data-v-9caf3621><input${ssrRenderAttr("value", unref(email))} type="email" class="email-input" placeholder="Enter your email" data-v-9caf3621><button class="login-btn continue-btn"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-v-9caf3621>`);
          if (unref(loading)) {
            _push2(`<span data-v-9caf3621>Sending...</span>`);
          } else {
            _push2(`<span data-v-9caf3621>Continue</span>`);
          }
          _push2(`</button>`);
          if (unref(error)) {
            _push2(`<p class="error-message" data-v-9caf3621>${ssrInterpolate(unref(error))}</p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><div class="modal-footer" data-v-9caf3621><p class="footer-text" data-v-9caf3621> By signing up, you agree to the <a href="#" class="footer-link" data-v-9caf3621>Terms of Service</a> and <a href="#" class="footer-link" data-v-9caf3621>Privacy Policy</a>. </p></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LoginModal.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-9caf3621"]]);
const _sfc_main$5 = {
  __name: "VerifyCodeModal",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      required: true
    }
  },
  emits: ["close", "verify-success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    useAuth();
    useRouter();
    const codeDigits = ref(["", "", "", "", "", ""]);
    const codeInputs = ref([]);
    const loading = ref(false);
    const error = ref("");
    const success = ref("");
    const hasError = ref(false);
    const resendCooldown = ref(0);
    const isCodeComplete = computed(() => {
      return codeDigits.value.every((digit) => digit !== "");
    });
    const resetForm = () => {
      codeDigits.value = ["", "", "", "", "", ""];
      error.value = "";
      success.value = "";
      hasError.value = false;
      loading.value = false;
      if (codeInputs.value[0]) {
        codeInputs.value[0].focus();
      }
    };
    watch(() => props.isOpen, (newVal) => {
      if (newVal) {
        resetForm();
        nextTick(() => {
          var _a;
          (_a = codeInputs.value[0]) == null ? void 0 : _a.focus();
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.isOpen) {
          _push2(`<div class="modal-overlay" data-v-d2bfc93e><div class="modal-content" data-v-d2bfc93e><button class="close-btn" data-v-d2bfc93e><i class="fas fa-times" data-v-d2bfc93e></i></button><div class="modal-header" data-v-d2bfc93e><h2 class="modal-title" data-v-d2bfc93e>Enter Verification Code</h2><p class="modal-subtitle" data-v-d2bfc93e>We&#39;ve sent a verification code to<br data-v-d2bfc93e><strong data-v-d2bfc93e>${ssrInterpolate(__props.email)}</strong></p></div><div class="verify-form" data-v-d2bfc93e><div class="code-input-container" data-v-d2bfc93e><!--[-->`);
          ssrRenderList(unref(codeDigits), (digit, index) => {
            _push2(`<input${ssrRenderAttr("value", unref(codeDigits)[index])} type="text" maxlength="1" class="${ssrRenderClass([{ "error": unref(hasError) }, "code-input"])}" data-v-d2bfc93e>`);
          });
          _push2(`<!--]--></div>`);
          if (unref(error)) {
            _push2(`<p class="error-message" data-v-d2bfc93e>${ssrInterpolate(unref(error))}</p>`);
          } else {
            _push2(`<!---->`);
          }
          if (unref(success)) {
            _push2(`<p class="success-message" data-v-d2bfc93e>${ssrInterpolate(unref(success))}</p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="resend-section" data-v-d2bfc93e><p class="resend-text" data-v-d2bfc93e> Didn&#39;t receive the code? <button class="resend-btn"${ssrIncludeBooleanAttr(unref(resendCooldown) > 0) ? " disabled" : ""} data-v-d2bfc93e>${ssrInterpolate(unref(resendCooldown) > 0 ? `Resend in ${unref(resendCooldown)}s` : "Resend")}</button></p></div><button class="verify-btn"${ssrIncludeBooleanAttr(!unref(isCodeComplete) || unref(loading)) ? " disabled" : ""} data-v-d2bfc93e>`);
          if (unref(loading)) {
            _push2(`<span data-v-d2bfc93e>Verifying...</span>`);
          } else {
            _push2(`<span data-v-d2bfc93e>Verify</span>`);
          }
          _push2(`</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/VerifyCodeModal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-d2bfc93e"]]);
const _imports_0 = "" + __buildAssetsURL("favicon.B_IMNnZ4.ico");
const _sfc_main$4 = {
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.avatar) && user.value.avatar.trim() ? user.value.avatar : "/default-avatar.svg";
    });
    computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.name) && user.value.name.trim() ? user.value.name : "";
    });
    const mobileMenuOpen = ref(false);
    const loginModalOpen = ref(false);
    const verifyCodeModalOpen = ref(false);
    const verifyEmail = ref("");
    ref(false);
    const closeMobileMenu = () => {
      mobileMenuOpen.value = false;
    };
    const closeLoginModal = () => {
      loginModalOpen.value = false;
    };
    const handleShowVerifyCode = (email) => {
      verifyEmail.value = email;
      verifyCodeModalOpen.value = true;
    };
    const closeVerifyCodeModal = () => {
      verifyCodeModalOpen.value = false;
      verifyEmail.value = "";
    };
    const handleVerifySuccess = (token) => {
      closeVerifyCodeModal();
      closeLoginModal();
    };
    const handleGoogleLogin = () => {
      console.log("Google login");
    };
    const handleEmailLogin = (email) => {
      console.log("Email login:", email);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$2;
      const _component_NuxtLink = __nuxt_component_0$3;
      const _component_LoginModal = __nuxt_component_2$1;
      const _component_VerifyCodeModal = __nuxt_component_3;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "app-header" }, _attrs))} data-v-5cd19e4c>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<div class="simply-container" data-v-5cd19e4c><div class="header-content" data-v-5cd19e4c><div class="logo" data-v-5cd19e4c>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "logo-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="Logo" class="logo-icon" data-v-5cd19e4c${_scopeId}><span data-v-5cd19e4c${_scopeId}>FuseAI</span>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "Logo",
                class: "logo-icon"
              }),
              createVNode("span", null, "FuseAI")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="nav" data-v-5cd19e4c>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/home",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/pricing",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Pricing`);
          } else {
            return [
              createTextVNode("Pricing")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/news",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`News`);
          } else {
            return [
              createTextVNode("News")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`About`);
          } else {
            return [
              createTextVNode("About")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="header-actions" data-v-5cd19e4c>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="btn-signup" disabled data-v-5cd19e4c${_scopeId}>Loading...</button>`);
          } else {
            return [
              createVNode("button", {
                class: "btn-signup",
                disabled: ""
              }, "Loading...")
            ];
          }
        })
      }, _parent));
      _push(`</div><button class="mobile-menu-btn" data-v-5cd19e4c><i class="fas fa-bars" data-v-5cd19e4c></i></button></div>`);
      if (unref(mobileMenuOpen)) {
        _push(`<div class="mobile-menu" data-v-5cd19e4c>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/home",
          class: "mobile-nav-link",
          onClick: closeMobileMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Home`);
            } else {
              return [
                createTextVNode("Home")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/features",
          class: "mobile-nav-link",
          onClick: closeMobileMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Features`);
            } else {
              return [
                createTextVNode("Features")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/pricing",
          class: "mobile-nav-link",
          onClick: closeMobileMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Pricing`);
            } else {
              return [
                createTextVNode("Pricing")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/news",
          class: "mobile-nav-link",
          onClick: closeMobileMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`News`);
            } else {
              return [
                createTextVNode("News")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/about",
          class: "mobile-nav-link",
          onClick: closeMobileMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`About`);
            } else {
              return [
                createTextVNode("About")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="mobile-actions" data-v-5cd19e4c>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {
          fallback: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="btn-signup" disabled data-v-5cd19e4c${_scopeId}>Loading...</button>`);
            } else {
              return [
                createVNode("button", {
                  class: "btn-signup",
                  disabled: ""
                }, "Loading...")
              ];
            }
          })
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_LoginModal, {
        "is-open": unref(loginModalOpen),
        onClose: closeLoginModal,
        onGoogleLogin: handleGoogleLogin,
        onEmailLogin: handleEmailLogin,
        onShowVerifyCode: handleShowVerifyCode
      }, null, _parent));
      _push(ssrRenderComponent(_component_VerifyCodeModal, {
        "is-open": unref(verifyCodeModalOpen),
        email: unref(verifyEmail),
        onClose: closeVerifyCodeModal,
        onVerifySuccess: handleVerifySuccess
      }, null, _parent));
      _push(`</header>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-5cd19e4c"]]);
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "app-footer" }, _attrs))} data-v-b1bd21b0><div class="simply-container" data-v-b1bd21b0><div class="footer-content" data-v-b1bd21b0><div class="footer-section" data-v-b1bd21b0><div class="logo" data-v-b1bd21b0><i class="fas fa-robot" data-v-b1bd21b0></i><span data-v-b1bd21b0>FuseAI</span></div><p class="company-description" data-v-b1bd21b0> Your intelligent AI assistant for work, learning, and creativity. Powered by advanced artificial intelligence technology. </p></div></div><div class="footer-bottom" data-v-b1bd21b0><div class="footer-bottom-content" data-v-b1bd21b0><div class="copyright" data-v-b1bd21b0><p data-v-b1bd21b0>© 2026 Fuse Tech . LTD. All rights reserved.</p></div></div></div></div></footer>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-b1bd21b0"]]);
const _sfc_main$2 = {
  __name: "Toast",
  __ssrInlineRender: true,
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "error",
      // error, success, warning, info
      validator: (value) => ["error", "success", "warning", "info"].includes(value)
    },
    duration: {
      type: Number,
      default: 3e3
      // 显示时长（毫秒）
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(true);
    const typeClass = computed(() => `toast-${props.type}`);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(isVisible)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["toast-container", unref(typeClass)]
        }, _attrs))} data-v-7f20bd99><div class="toast-content" data-v-7f20bd99><div class="toast-icon" data-v-7f20bd99>`);
        if (__props.type === "error") {
          _push(`<span class="toast-emoji" data-v-7f20bd99>😔</span>`);
        } else if (__props.type === "success") {
          _push(`<i class="fas fa-check-circle" data-v-7f20bd99></i>`);
        } else if (__props.type === "warning") {
          _push(`<i class="fas fa-exclamation-triangle" data-v-7f20bd99></i>`);
        } else {
          _push(`<i class="fas fa-info-circle" data-v-7f20bd99></i>`);
        }
        _push(`</div><div class="toast-message-wrapper" data-v-7f20bd99><div class="toast-message" data-v-7f20bd99>${ssrInterpolate(__props.message)}</div></div><button class="toast-close" aria-label="Close" data-v-7f20bd99><i class="fas fa-times" data-v-7f20bd99></i></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Toast.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-7f20bd99"]]);
const _sfc_main$1 = {
  __name: "ToastContainer",
  __ssrInlineRender: true,
  setup(__props) {
    const { toasts, removeToast } = useToast();
    watch(toasts, (newToasts) => {
      console.log("Toasts updated:", newToasts.length, newToasts);
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Toast = __nuxt_component_0;
      if (unref(toasts).length > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "toast-wrapper" }, _attrs))} data-v-136232b3><!--[-->`);
        ssrRenderList(unref(toasts), (toast) => {
          _push(ssrRenderComponent(_component_Toast, {
            key: toast.id,
            message: toast.message,
            type: toast.type,
            duration: toast.duration || 5e3,
            onClose: ($event) => unref(removeToast)(toast.id)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ToastContainer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-136232b3"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppHeader = __nuxt_component_0$1;
  const _component_AppFooter = __nuxt_component_1;
  const _component_ToastContainer = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-layout" }, _attrs))}><div class="layout-header">`);
  _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
  _push(`</div><main class="main-content"><div class="simply-layout">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></main><div class="layout-footer">`);
  _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_ToastContainer, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  _default as default
};
//# sourceMappingURL=default-CuUGEhOV.js.map
