import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
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
  __name: "pricing",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Pricing - FuseAI Tools",
      meta: [
        { name: "description", content: "Choose the perfect plan for your AI needs. Simple, transparent pricing with no hidden fees." }
      ]
    });
    const selectedSubscriptionType = ref("monthly");
    const selectedPlanIndex = ref(0);
    const subscriptionTypes = [
      { value: "weekly", label: "Weekly" },
      { value: "monthly", label: "Monthly" },
      { value: "yearly", label: "Yearly" }
    ];
    const pricingData = {
      basic: {
        name: "Basic",
        discount: 0.98,
        // 9.8% off means 0.98 discount rate (2% off)
        weekly: {
          price: 3.9,
          points: 390,
          bonusPercent: 10,
          bonusPoints: 39,
          totalPoints: 429
        },
        monthly: {
          price: 9.9,
          points: 990,
          bonusPercent: 20,
          bonusPoints: 198,
          totalPoints: 1188
        },
        yearly: {
          price: 99.9,
          points: 9990,
          // 99.9 * 100
          bonusPercent: 30,
          bonusPoints: 2997,
          // 9990 * 0.3
          totalPoints: 12987
          // 9990 + 2997
        }
      },
      pro: {
        name: "Pro",
        discount: 0.95,
        // 9.5% off means 0.95 discount rate (5% off)
        weekly: {
          price: 5.9,
          points: 590,
          bonusPercent: 20,
          bonusPoints: 118,
          totalPoints: 708
        },
        monthly: {
          price: 16.8,
          points: 1680,
          bonusPercent: 30,
          bonusPoints: 504,
          totalPoints: 2184
        },
        yearly: {
          price: 168.8,
          points: 16880,
          // 168.8 * 100
          bonusPercent: 40,
          bonusPoints: 6752,
          // 16880 * 0.4
          totalPoints: 23632
          // 16880 + 6752
        }
      },
      ultimate: {
        name: "Ultimate",
        discount: 0.88,
        // 8.8% off means 0.88 discount rate (12% off)
        weekly: {
          price: 7.9,
          points: 790,
          bonusPercent: 30,
          bonusPoints: 237,
          totalPoints: 1027
        },
        monthly: {
          price: 19.9,
          points: 1990,
          bonusPercent: 40,
          bonusPoints: 796,
          totalPoints: 2786
        },
        yearly: {
          price: 199.9,
          points: 19990,
          // 199.9 * 100
          bonusPercent: 50,
          bonusPoints: 9995,
          // 19990 * 0.5
          totalPoints: 29985
          // 19990 + 9995
        }
      }
    };
    const getCurrentPricing = (planType) => {
      const plan = pricingData[planType];
      return plan[selectedSubscriptionType.value];
    };
    const getPeriodLabel = computed(() => {
      const labels = {
        weekly: "week",
        monthly: "month",
        yearly: "year"
      };
      return labels[selectedSubscriptionType.value] || "month";
    });
    const getDiscountPercent = (discountRate) => {
      return Math.round((1 - discountRate) * 100);
    };
    const topupOptions = ref([
      {
        amount: 10,
        bonusRate: 0,
        baseCredits: 1e3,
        bonusCredits: 0,
        totalCredits: 1e3
      },
      {
        amount: 30,
        bonusRate: 10,
        baseCredits: 3e3,
        bonusCredits: 300,
        totalCredits: 3300
      },
      {
        amount: 50,
        bonusRate: 20,
        baseCredits: 5e3,
        bonusCredits: 1e3,
        totalCredits: 6e3
      },
      {
        amount: 100,
        bonusRate: 30,
        baseCredits: 1e4,
        bonusCredits: 3e3,
        totalCredits: 13e3
      }
    ]);
    const selectedTopupIndex = ref(null);
    const getCardColor = (index) => {
      const colors = [
        "#c7d2fe",
        // 最浅靛蓝 - $10
        "#a5b4fc",
        // 浅靛蓝 - $30
        "#818cf8",
        // 中靛蓝 - $50
        "#6366f1"
        // 深靛蓝 - $100
      ];
      return colors[index] || colors[0];
    };
    const getCardBackground = (index) => {
      const backgrounds = [
        "linear-gradient(135deg, #eef2ff 0%, #ffffff 100%)",
        // $10 - 最浅靛蓝
        "linear-gradient(135deg, #e0e7ff 0%, #ffffff 100%)",
        // $30 - 浅靛蓝
        "linear-gradient(135deg, #c7d2fe 0%, #ffffff 100%)",
        // $50 - 中靛蓝
        "linear-gradient(135deg, #a5b4fc 0%, #ffffff 100%)"
        // $100 - 深靛蓝
      ];
      return backgrounds[index] || backgrounds[0];
    };
    const getPlanColor = (index) => {
      const colors = [
        "#c7d2fe",
        // Basic - 最浅靛蓝
        "#818cf8",
        // Pro - 中靛蓝
        "#6366f1"
        // Ultimate - 深靛蓝
      ];
      return colors[index] || colors[0];
    };
    const getPlanBackground = (index) => {
      const backgrounds = [
        "linear-gradient(135deg, #eef2ff 0%, #ffffff 100%)",
        // Basic - 最浅靛蓝
        "linear-gradient(135deg, #e0e7ff 0%, #ffffff 100%)",
        // Pro - 中靛蓝
        "linear-gradient(135deg, #c7d2fe 0%, #ffffff 100%)"
        // Ultimate - 深靛蓝
      ];
      return backgrounds[index] || backgrounds[0];
    };
    const faqs = ref([
      {
        question: "What payment methods do you accept?",
        answer: "<p>We support all major credit cards, debit cards and PayPal for secure and convenient payment.</p>",
        isOpen: false
      },
      {
        question: "Is there a free trial/experience?",
        answer: "<ul><li>Register now and get 100 points immediately.</li><li>These points can be used to enjoy all AI models on the platform without the need to bind a payment method or subscribe to any package.</li></ul>",
        isOpen: false
      },
      {
        question: "How does billing and subscription work?",
        answer: "<p>We offer flexible and transparent billing methods to help you manage easily:</p><h4>1. Subscription period</h4><ul><li>Annual subscription package: Paid annually, benefits are distributed monthly.</li><li>Monthly/Weekly Payment Plan: The period lasts until the subscription expires.</li></ul><h4>2. Points Rules</h4><ul><li>The points purchased individually are valid indefinitely and do not expire.</li><li>If there are both subscription benefits and purchase points in the account, the system will prioritize the deduction of subscription benefits.</li></ul><h4>3. Self-management</h4><ul><li>You can cancel or change your subscription at any time in the account settings. Once cancelled, the benefits will remain available until the end of the current period.</li></ul>",
        isOpen: false
      },
      {
        question: "What is your refund policy?",
        answer: "<p>We offer clear and reasonable refund guarantees:</p><h4>Annual subscription refund</h4><p>All fees from the next billing cycle will be refunded. The current cycle will deduct the corresponding value of the consumed points.</p><h4>Refund for monthly/weekly payment plans</h4><p>After deducting the value of the consumed points, the remaining fee will be refunded.</p><h4>Points recharge and refund</h4><p>The remaining balance will be refunded after deducting the value of consumed points; if the points include a gift portion, the gift amount will be deducted first.</p><h4>Uniform rule</h4><p>If any refund involves the distribution of benefits, the corresponding amount will be deducted proportionally.</p>",
        isOpen: false
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pricing-page" }, _attrs))} data-v-b4dfa639><section class="hero-section" data-v-b4dfa639><div class="simply-container" data-v-b4dfa639><div class="hero-content" data-v-b4dfa639><h1 class="hero-title" data-v-b4dfa639>Plans &amp; Pricing</h1><p class="hero-subtitle" data-v-b4dfa639> Choose the perfect plan for your needs. All plans include our core AI features. </p></div></div></section><section class="pricing-plans" data-v-b4dfa639><div class="simply-container" data-v-b4dfa639><div class="subscription-type-toggle" data-v-b4dfa639><!--[-->`);
      ssrRenderList(subscriptionTypes, (type) => {
        _push(`<button class="${ssrRenderClass([{ active: unref(selectedSubscriptionType) === type.value }, "type-btn"])}" data-v-b4dfa639>${ssrInterpolate(type.label)}</button>`);
      });
      _push(`<!--]--></div><div class="plans-grid" data-v-b4dfa639><div class="${ssrRenderClass([{ "selected": unref(selectedPlanIndex) === 0 }, "plan-card basic"])}" style="${ssrRenderStyle({
        borderColor: unref(selectedPlanIndex) === 0 ? getPlanColor(2) : getPlanColor(0),
        background: unref(selectedPlanIndex) === 0 ? getPlanBackground(2) : getPlanBackground(0),
        borderWidth: unref(selectedPlanIndex) === 0 ? "2px" : "1px"
      })}" data-v-b4dfa639>`);
      if (unref(selectedPlanIndex) === 0) {
        _push(`<div class="plan-badge" style="${ssrRenderStyle({ background: `linear-gradient(135deg, ${getPlanColor(2)} 0%, #6366f1 100%)` })}" data-v-b4dfa639>Selected</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="plan-header" data-v-b4dfa639><div class="plan-title-row" data-v-b4dfa639><div class="plan-icon basic-icon" style="${ssrRenderStyle({ background: unref(selectedPlanIndex) === 0 ? getPlanColor(2) : getPlanColor(0), color: "white" })}" data-v-b4dfa639>★</div><h3 class="plan-name" data-v-b4dfa639>Basic</h3></div><div class="plan-price" data-v-b4dfa639><span class="price-amount" data-v-b4dfa639>$${ssrInterpolate(getCurrentPricing("basic").price)}</span><span class="price-period" data-v-b4dfa639>/${ssrInterpolate(unref(getPeriodLabel))}</span></div><div class="plan-discount" data-v-b4dfa639><span class="discount-text" data-v-b4dfa639>${ssrInterpolate(getDiscountPercent(pricingData.basic.discount))}% off</span></div></div><div class="points-info" data-v-b4dfa639><div class="points-row" data-v-b4dfa639><span class="points-label" data-v-b4dfa639>Base Points:</span><span class="points-value" data-v-b4dfa639>${ssrInterpolate(getCurrentPricing("basic").points)}</span></div><div class="points-row" data-v-b4dfa639><span class="points-label" data-v-b4dfa639>Bonus Rate:</span><span class="points-value bonus" data-v-b4dfa639>${ssrInterpolate(getCurrentPricing("basic").bonusPercent)}%</span></div><div class="points-row" data-v-b4dfa639><span class="points-label" data-v-b4dfa639>Bonus Points:</span><span class="points-value bonus" data-v-b4dfa639>+${ssrInterpolate(getCurrentPricing("basic").bonusPoints)}</span></div><div class="points-row total" data-v-b4dfa639><span class="points-label" data-v-b4dfa639>Total Points:</span><span class="points-value total-value" data-v-b4dfa639>${ssrInterpolate(getCurrentPricing("basic").totalPoints)}</span></div></div><button class="plan-button basic-button" style="${ssrRenderStyle({ background: unref(selectedPlanIndex) === 0 ? getPlanColor(2) : getPlanColor(0), color: "white", border: "none" })}" data-v-b4dfa639>Subscribe Now</button></div><div class="${ssrRenderClass([{ "selected": unref(selectedPlanIndex) === 1 }, "plan-card pro"])}" style="${ssrRenderStyle({
        borderColor: unref(selectedPlanIndex) === 1 ? getPlanColor(2) : getPlanColor(0),
        background: unref(selectedPlanIndex) === 1 ? getPlanBackground(2) : getPlanBackground(0),
        borderWidth: unref(selectedPlanIndex) === 1 ? "2px" : "1px"
      })}" data-v-b4dfa639>`);
      if (unref(selectedPlanIndex) === 1) {
        _push(`<div class="plan-badge" style="${ssrRenderStyle({ background: `linear-gradient(135deg, ${getPlanColor(2)} 0%, #6366f1 100%)` })}" data-v-b4dfa639>Selected</div>`);
      } else {
        _push(`<div class="plan-badge" style="${ssrRenderStyle({ background: `linear-gradient(135deg, ${getPlanColor(1)} 0%, ${getPlanColor(2)} 100%)` })}" data-v-b4dfa639>Popular</div>`);
      }
      _push(`<div class="plan-header" data-v-b4dfa639><div class="plan-title-row" data-v-b4dfa639><div class="plan-icon pro-icon" style="${ssrRenderStyle({ background: unref(selectedPlanIndex) === 1 ? getPlanColor(2) : getPlanColor(0), color: "white" })}" data-v-b4dfa639>◆</div><h3 class="plan-name" data-v-b4dfa639>Pro</h3></div><div class="plan-price" data-v-b4dfa639><span class="price-amount" data-v-b4dfa639>$${ssrInterpolate(getCurrentPricing("pro").price)}</span><span class="price-period" data-v-b4dfa639>/${ssrInterpolate(unref(getPeriodLabel))}</span></div><div class="plan-discount" data-v-b4dfa639><span class="discount-text" data-v-b4dfa639>${ssrInterpolate(getDiscountPercent(pricingData.pro.discount))}% off</span></div></div><div class="points-info" data-v-b4dfa639><div class="points-row" data-v-b4dfa639><span class="points-label" data-v-b4dfa639>Base Points:</span><span class="points-value" data-v-b4dfa639>${ssrInterpolate(getCurrentPricing("pro").points)}</span></div><div class="points-row" data-v-b4dfa639><span class="points-label" data-v-b4dfa639>Bonus Rate:</span><span class="points-value bonus" data-v-b4dfa639>${ssrInterpolate(getCurrentPricing("pro").bonusPercent)}%</span></div><div class="points-row" data-v-b4dfa639><span class="points-label" data-v-b4dfa639>Bonus Points:</span><span class="points-value bonus" data-v-b4dfa639>+${ssrInterpolate(getCurrentPricing("pro").bonusPoints)}</span></div><div class="points-row total" data-v-b4dfa639><span class="points-label" data-v-b4dfa639>Total Points:</span><span class="points-value total-value" data-v-b4dfa639>${ssrInterpolate(getCurrentPricing("pro").totalPoints)}</span></div></div><button class="plan-button pro-button" style="${ssrRenderStyle({ background: unref(selectedPlanIndex) === 1 ? getPlanColor(2) : getPlanColor(0), color: "white", border: "none" })}" data-v-b4dfa639>Subscribe Now</button></div><div class="${ssrRenderClass([{ "selected": unref(selectedPlanIndex) === 2 }, "plan-card ultimate"])}" style="${ssrRenderStyle({
        borderColor: unref(selectedPlanIndex) === 2 ? getPlanColor(2) : getPlanColor(0),
        background: unref(selectedPlanIndex) === 2 ? getPlanBackground(2) : getPlanBackground(0),
        borderWidth: unref(selectedPlanIndex) === 2 ? "2px" : "1px"
      })}" data-v-b4dfa639>`);
      if (unref(selectedPlanIndex) === 2) {
        _push(`<div class="plan-badge" style="${ssrRenderStyle({ background: `linear-gradient(135deg, ${getPlanColor(2)} 0%, #6366f1 100%)` })}" data-v-b4dfa639>Selected</div>`);
      } else {
        _push(`<div class="plan-badge" style="${ssrRenderStyle({ background: `linear-gradient(135deg, ${getPlanColor(2)} 0%, #6366f1 100%)` })}" data-v-b4dfa639>Best Value</div>`);
      }
      _push(`<div class="plan-header" data-v-b4dfa639><div class="plan-title-row" data-v-b4dfa639><div class="plan-icon ultimate-icon" style="${ssrRenderStyle({ background: unref(selectedPlanIndex) === 2 ? getPlanColor(2) : getPlanColor(0), color: "white" })}" data-v-b4dfa639>∞</div><h3 class="plan-name" data-v-b4dfa639>Ultimate</h3></div><div class="plan-price" data-v-b4dfa639><span class="price-amount" data-v-b4dfa639>$${ssrInterpolate(getCurrentPricing("ultimate").price)}</span><span class="price-period" data-v-b4dfa639>/${ssrInterpolate(unref(getPeriodLabel))}</span></div><div class="plan-discount" data-v-b4dfa639><span class="discount-text" data-v-b4dfa639>${ssrInterpolate(getDiscountPercent(pricingData.ultimate.discount))}% off</span></div></div><div class="points-info" data-v-b4dfa639><div class="points-row" data-v-b4dfa639><span class="points-label" data-v-b4dfa639>Base Points:</span><span class="points-value" data-v-b4dfa639>${ssrInterpolate(getCurrentPricing("ultimate").points)}</span></div><div class="points-row" data-v-b4dfa639><span class="points-label" data-v-b4dfa639>Bonus Rate:</span><span class="points-value bonus" data-v-b4dfa639>${ssrInterpolate(getCurrentPricing("ultimate").bonusPercent)}%</span></div><div class="points-row" data-v-b4dfa639><span class="points-label" data-v-b4dfa639>Bonus Points:</span><span class="points-value bonus" data-v-b4dfa639>+${ssrInterpolate(getCurrentPricing("ultimate").bonusPoints)}</span></div><div class="points-row total" data-v-b4dfa639><span class="points-label" data-v-b4dfa639>Total Points:</span><span class="points-value total-value" data-v-b4dfa639>${ssrInterpolate(getCurrentPricing("ultimate").totalPoints)}</span></div></div><button class="plan-button ultimate-button" style="${ssrRenderStyle({ background: unref(selectedPlanIndex) === 2 ? getPlanColor(2) : getPlanColor(0), color: "white", border: "none" })}" data-v-b4dfa639>Subscribe Now</button></div></div><div class="points-explanation" data-v-b4dfa639><p class="explanation-text" data-v-b4dfa639><i class="fas fa-info-circle" data-v-b4dfa639></i> Points conversion rate: $1 = 100 points (e.g., $9.9 = 990 points) </p><p class="discount-explanation" data-v-b4dfa639><i class="fas fa-info-circle" data-v-b4dfa639></i> Subscription benefits: Basic plan users enjoy 98% pricing on all models, Pro plan users enjoy 95% pricing, and Ultimate plan users enjoy 88% pricing. </p></div></div></section><section class="topup-section" data-v-b4dfa639><div class="simply-container" data-v-b4dfa639><div class="section-header" data-v-b4dfa639><h2 class="section-title" data-v-b4dfa639>Top Up Credits</h2><p class="section-subtitle" data-v-b4dfa639>Recharge your account and get bonus credits</p></div><div class="topup-grid" data-v-b4dfa639><!--[-->`);
      ssrRenderList(unref(topupOptions), (item, index) => {
        _push(`<div class="${ssrRenderClass([{
          "selected": unref(selectedTopupIndex) === index
        }, "topup-card"])}" style="${ssrRenderStyle({
          borderColor: unref(selectedTopupIndex) === index ? getCardColor(3) : getCardColor(0),
          background: unref(selectedTopupIndex) === index ? getCardBackground(3) : getCardBackground(0),
          borderWidth: unref(selectedTopupIndex) === index ? "2px" : "1px"
        })}" data-v-b4dfa639>`);
        if (unref(selectedTopupIndex) === index) {
          _push(`<div class="topup-badge" style="${ssrRenderStyle({ background: `linear-gradient(135deg, ${getCardColor(3)} 0%, #6366f1 100%)` })}" data-v-b4dfa639>Selected</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="topup-header" data-v-b4dfa639><div class="topup-amount" data-v-b4dfa639>$${ssrInterpolate(item.amount)}</div>`);
        if (item.bonusRate > 0) {
          _push(`<div class="topup-bonus-rate" data-v-b4dfa639>${ssrInterpolate(item.bonusRate)}% Bonus</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (item.bonusRate > 0) {
          _push(`<div class="topup-credits" data-v-b4dfa639><div class="credits-base" data-v-b4dfa639>${ssrInterpolate(item.baseCredits)}</div><div class="credits-plus" data-v-b4dfa639>+</div><div class="credits-bonus" data-v-b4dfa639>${ssrInterpolate(item.bonusCredits)}</div></div>`);
        } else {
          _push(`<div class="topup-credits" data-v-b4dfa639><div class="credits-base" data-v-b4dfa639>${ssrInterpolate(item.baseCredits)}</div></div>`);
        }
        _push(`<div class="topup-total" data-v-b4dfa639><span class="total-label" data-v-b4dfa639>Total Credits:</span><span class="total-value" data-v-b4dfa639>${ssrInterpolate(item.totalCredits)}</span></div><button class="topup-button" style="${ssrRenderStyle({ background: unref(selectedTopupIndex) === index ? getCardColor(3) : getCardColor(0), color: "white", border: "none" })}" data-v-b4dfa639>Recharge Now</button></div>`);
      });
      _push(`<!--]--></div><div class="topup-explanation" data-v-b4dfa639><p class="topup-explanation-text" data-v-b4dfa639><i class="fas fa-info-circle" data-v-b4dfa639></i> Top-up amounts can enjoy the same discount as your current subscription plan </p></div></div></section><section class="faq-section" data-v-b4dfa639><div class="simply-container" data-v-b4dfa639><h2 class="section-title" data-v-b4dfa639>Frequently Asked Questions</h2><div class="faq-list" data-v-b4dfa639><!--[-->`);
      ssrRenderList(unref(faqs), (faq, index) => {
        _push(`<div class="faq-item" data-v-b4dfa639><button class="faq-question" data-v-b4dfa639>${ssrInterpolate(faq.question)} <i class="${ssrRenderClass([{ rotated: faq.isOpen }, "fas fa-chevron-down"])}" data-v-b4dfa639></i></button><div class="${ssrRenderClass([{ open: faq.isOpen }, "faq-answer"])}" data-v-b4dfa639><div class="faq-content" data-v-b4dfa639>${faq.answer ?? ""}</div></div></div>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pricing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pricing = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b4dfa639"]]);
export {
  pricing as default
};
//# sourceMappingURL=pricing-BASf1fBj.js.map
