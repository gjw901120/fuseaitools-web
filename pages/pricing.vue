<template>
  <div class="pricing-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="simply-container">
        <div class="hero-content">
          <h1 class="hero-title">Plans & Pricing</h1>
          <p class="hero-subtitle">
            Choose the plan that fits your workflow. New users get <strong>20 free credits</strong> on sign-up—no card required to start.
          </p>
        </div>
      </div>
    </section>

    <!-- Pricing Plans -->
    <section class="pricing-plans">
      <div class="simply-container">
        <!-- Subscription Type Toggle -->
        <div class="subscription-type-toggle">
          <button 
            v-for="type in subscriptionTypes" 
            :key="type.value"
            class="type-btn"
            :class="{ active: selectedSubscriptionType === type.value }"
            @click="selectedSubscriptionType = type.value"
          >
            {{ type.label }}
          </button>
        </div>

        <div class="plans-grid">
          <!-- Basic Plan -->
          <div 
            class="plan-card basic"
            :class="{ 'selected': selectedPlanIndex === 0 }"
            :style="getPlanCardStyle(0)"
            @click="selectPlan(0)"
          >
            <div class="plan-badge" v-if="selectedPlanIndex === 0" :style="getPlanBadgeStyle(0)">Selected</div>
            <div class="plan-header">
              <div class="plan-title-row">
                <div class="plan-icon basic-icon" :style="getPlanAccentStyle(0)">★</div>
                <h3 class="plan-name">Basic</h3>
              </div>
              <div class="plan-price">
                <span class="price-amount">${{ getCurrentPricing('basic').price }}</span>
                <span class="price-period">/{{ getPeriodLabel }}</span>
              </div>
              <div class="plan-discount">
                <span class="discount-text">{{ getDiscountPercent(pricingData.basic.discount) }}% off</span>
              </div>
            </div>
            
            <!-- Points Information -->
            <div class="points-info">
              <div class="points-row">
                <span class="points-label">Base Credits:</span>
                <span class="points-value">{{ formatPlanCredits('basic', 'base') }}</span>
              </div>
              <div class="points-row">
                <span class="points-label">Bonus Rate:</span>
                <span class="points-value bonus">{{ getCurrentPricing('basic').bonusPercent }}%</span>
              </div>
              <div class="points-row">
                <span class="points-label">Bonus Credits:</span>
                <span class="points-value bonus">{{ formatPlanCredits('basic', 'bonus') }}</span>
              </div>
              <div v-if="selectedSubscriptionType === 'yearly'" class="points-row points-row-formula">
                <span class="points-value points-formula">{{ getYearlyCreditsFormula('basic') }}</span>
              </div>
              <div class="points-row total">
                <span class="points-label">Total Credits:</span>
                <span class="points-value total-value">{{ selectedSubscriptionType === 'yearly' ? getCurrentPricing('basic').totalPoints : formatPlanCredits('basic', 'total') }}</span>
              </div>
            </div>

            <div class="comprehensive-discount">
              <span class="comprehensive-discount-label">Comprehensive Discount</span>
              <span class="comprehensive-discount-value">{{ getComprehensiveDiscountDisplay('basic') }}</span>
            </div>

            <button class="plan-button basic-button" :style="getPlanButtonStyle(0)" :disabled="stripeLoading" @click.stop="subscribePlan(0)">{{ stripeLoading ? 'Loading...' : 'Subscribe Now' }}</button>
          </div>

          <!-- Pro Plan -->
          <div 
            class="plan-card pro"
            :class="{ 'selected': selectedPlanIndex === 1 }"
            :style="getPlanCardStyle(1)"
            @click="selectPlan(1)"
          >
            <div class="plan-badge" v-if="selectedPlanIndex === 1" :style="getPlanBadgeStyle(1)">Selected</div>
            <div class="plan-badge" v-else :style="{ background: `linear-gradient(135deg, ${getPlanColor(1)} 0%, ${getPlanColor(2)} 100%)` }">Popular</div>
            <div class="plan-header">
              <div class="plan-title-row">
                <div class="plan-icon pro-icon" :style="getPlanAccentStyle(1)">◆</div>
                <h3 class="plan-name">Pro</h3>
              </div>
              <div class="plan-price">
                <span class="price-amount">${{ getCurrentPricing('pro').price }}</span>
                <span class="price-period">/{{ getPeriodLabel }}</span>
              </div>
              <div class="plan-discount">
                <span class="discount-text">{{ getDiscountPercent(pricingData.pro.discount) }}% off</span>
              </div>
            </div>
            
            <!-- Points Information -->
            <div class="points-info">
              <div class="points-row">
                <span class="points-label">Base Credits:</span>
                <span class="points-value">{{ formatPlanCredits('pro', 'base') }}</span>
              </div>
              <div class="points-row">
                <span class="points-label">Bonus Rate:</span>
                <span class="points-value bonus">{{ getCurrentPricing('pro').bonusPercent }}%</span>
              </div>
              <div class="points-row">
                <span class="points-label">Bonus Credits:</span>
                <span class="points-value bonus">{{ formatPlanCredits('pro', 'bonus') }}</span>
              </div>
              <div v-if="selectedSubscriptionType === 'yearly'" class="points-row points-row-formula">
                <span class="points-value points-formula">{{ getYearlyCreditsFormula('pro') }}</span>
              </div>
              <div class="points-row total">
                <span class="points-label">Total Credits:</span>
                <span class="points-value total-value">{{ selectedSubscriptionType === 'yearly' ? getCurrentPricing('pro').totalPoints : formatPlanCredits('pro', 'total') }}</span>
              </div>
            </div>

            <div class="comprehensive-discount">
              <span class="comprehensive-discount-label">Comprehensive Discount</span>
              <span class="comprehensive-discount-value">{{ getComprehensiveDiscountDisplay('pro') }}</span>
            </div>

            <button class="plan-button pro-button" :style="getPlanButtonStyle(1)" :disabled="stripeLoading" @click.stop="subscribePlan(1)">{{ stripeLoading ? 'Loading...' : 'Subscribe Now' }}</button>
          </div>

          <!-- Ultra Plan -->
          <div 
            class="plan-card ultra"
            :class="{ 'selected': selectedPlanIndex === 2 }"
            :style="getPlanCardStyle(2)"
            @click="selectPlan(2)"
          >
            <div class="plan-badge" v-if="selectedPlanIndex === 2" :style="getPlanBadgeStyle(2)">Selected</div>
            <div class="plan-badge" v-else :style="{ background: `linear-gradient(135deg, ${getPlanColor(2)} 0%, ${FLUX_GRADIENT_END} 100%)` }">Best Value</div>
            <div class="plan-header">
              <div class="plan-title-row">
                <div class="plan-icon ultra-icon" :style="getPlanAccentStyle(2)">∞</div>
                <h3 class="plan-name">Ultra</h3>
              </div>
              <div class="plan-price">
                <span class="price-amount">${{ getCurrentPricing('ultra').price }}</span>
                <span class="price-period">/{{ getPeriodLabel }}</span>
              </div>
              <div class="plan-discount">
                <span class="discount-text">{{ getDiscountPercent(pricingData.ultra.discount) }}% off</span>
              </div>
            </div>
            
            <!-- Points Information -->
            <div class="points-info">
              <div class="points-row">
                <span class="points-label">Base Credits:</span>
                <span class="points-value">{{ formatPlanCredits('ultra', 'base') }}</span>
              </div>
              <div class="points-row">
                <span class="points-label">Bonus Rate:</span>
                <span class="points-value bonus">{{ getCurrentPricing('ultra').bonusPercent }}%</span>
              </div>
              <div class="points-row">
                <span class="points-label">Bonus Credits:</span>
                <span class="points-value bonus">{{ formatPlanCredits('ultra', 'bonus') }}</span>
              </div>
              <div v-if="selectedSubscriptionType === 'yearly'" class="points-row points-row-formula">
                <span class="points-value points-formula">{{ getYearlyCreditsFormula('ultra') }}</span>
              </div>
              <div class="points-row total">
                <span class="points-label">Total Credits:</span>
                <span class="points-value total-value">{{ selectedSubscriptionType === 'yearly' ? getCurrentPricing('ultra').totalPoints : formatPlanCredits('ultra', 'total') }}</span>
              </div>
            </div>

            <div class="comprehensive-discount">
              <span class="comprehensive-discount-label">Comprehensive Discount</span>
              <span class="comprehensive-discount-value">{{ getComprehensiveDiscountDisplay('ultra') }}</span>
            </div>

            <button class="plan-button ultra-button" :style="getPlanButtonStyle(2)" :disabled="stripeLoading" @click.stop="subscribePlan(2)">{{ stripeLoading ? 'Loading...' : 'Subscribe Now' }}</button>
          </div>
        </div>

        <!-- Credits Explanation -->
        <div class="points-explanation">
          <p class="explanation-text">
            <i class="fas fa-info-circle"></i>
            Credits conversion rate: $1 = 100 credits (e.g., $9.9 = 990 credits)
          </p>
          <p class="discount-explanation">
            <i class="fas fa-info-circle"></i>
            Subscription benefits: Basic members pay 98% of list price, Pro members pay 95%, and Ultra members pay 88% on all models.
          </p>
        </div>
      </div>
    </section>

    <!-- Top-up Section -->
    <section class="topup-section">
      <div class="simply-container">
        <div class="section-header">
          <h2 class="section-title">Top Up Credits</h2>
          <p class="section-subtitle">Recharge your account and get bonus credits</p>
        </div>

        <div class="topup-grid">
          <div 
            v-for="(item, index) in topupOptions" 
            :key="index"
            class="topup-card"
            :class="{ 
              'selected': selectedTopupIndex === index,
              [`topup-card--tier-${index}`]: selectedTopupIndex === index
            }"
            :style="getTopupCardStyle(index)"
            @click="selectTopup(index)"
          >
            <div class="topup-badge" v-if="selectedTopupIndex === index" :style="getTopupBadgeStyle(index)">Selected</div>
            <div class="topup-header">
              <div class="topup-amount">${{ item.amount }}</div>
              <div class="topup-bonus-rate" v-if="item.bonusRate > 0">{{ item.bonusRate }}% Bonus</div>
            </div>
            <div class="topup-credits" v-if="item.bonusRate > 0">
              <div class="credits-base">{{ item.baseCredits }}</div>
              <div class="credits-plus">+</div>
              <div class="credits-bonus">{{ item.bonusCredits }}</div>
            </div>
            <div class="topup-credits" v-else>
              <div class="credits-base">{{ item.baseCredits }}</div>
            </div>
            <div class="topup-total">
              <span class="total-label">Total Credits:</span>
              <span class="total-value">{{ item.totalCredits }}</span>
            </div>
            <button class="topup-button" :style="getTopupButtonStyle(index)" :disabled="stripeLoading" @click.stop="rechargeTopup(index)">{{ stripeLoading ? 'Loading...' : 'Recharge Now' }}</button>
          </div>
        </div>

        <!-- Top-up Explanation -->
        <div class="topup-explanation">
          <p class="topup-explanation-text">
            <i class="fas fa-info-circle"></i>
            Top-up amounts can enjoy the same discount as your current subscription plan
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="simply-container">
        <h2 class="section-title">Frequently Asked Questions</h2>
        
        <div class="faq-list">
          <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
            <button class="faq-question" @click="toggleFaq(index)">
              {{ faq.question }}
              <i class="fas fa-chevron-down" :class="{ rotated: faq.isOpen }"></i>
            </button>
            <div class="faq-answer" :class="{ open: faq.isOpen }">
              <div class="faq-content" v-html="faq.answer"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 设置页面 SEO
const siteUrl = 'https://fuseaitools.com'
const pricingCanonical = `${siteUrl}/pricing`

useHead({
  title: 'Pricing & Credits - FuseAI Tools | Plans & Top-Up',
  meta: [
    {
      name: 'description',
      content:
        'FuseAI Tools pricing: Basic, Pro, and Ultra plans with credit top-ups. $1 = 100 credits. New users get 20 free credits on sign-up. Member discounts on all AI models.'
    },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { property: 'og:title', content: 'Pricing & Credits | FuseAI Tools' },
    {
      property: 'og:description',
      content: 'Subscription plans and credit top-ups for 100+ AI models. 20 free credits for new users.'
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: pricingCanonical },
    { property: 'og:image', content: `${siteUrl}/logo-wide.png` },
    { property: 'og:site_name', content: 'FuseAI Tools' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Pricing & Credits | FuseAI Tools' },
    {
      name: 'twitter:description',
      content: 'Plans, top-ups, and 20 free credits on sign-up for FuseAI Tools.'
    },
    { name: 'twitter:image', content: `${siteUrl}/logo-wide.png` }
  ],
  link: [{ rel: 'canonical', href: pricingCanonical }]
})

const { post } = useApi()
const { showError } = useToast()

// Subscription types: weekly, monthly, yearly
const selectedSubscriptionType = ref('monthly')

// 选中的订阅套餐索引，默认选中 Basic (0)
const selectedPlanIndex = ref(0)

const subscriptionTypes = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' }
]

// Pricing data structure
const pricingData = {
  basic: {
    name: 'Basic',
    discount: 0.98,
    comprehensiveDiscounts: { weekly: 0.89, monthly: 0.82, yearly: 0.76 },
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
      points: 999,
      bonusPercent: 30,
      bonusPoints: 299,
      totalPoints: 15576 // (999 + 299) * 12
    }
  },
  pro: {
    name: 'Pro',
    discount: 0.95,
    comprehensiveDiscounts: { weekly: 0.79, monthly: 0.73, yearly: 0.68 },
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
      points: 1688,
      bonusPercent: 40,
      bonusPoints: 676,
      totalPoints: 28368 // (1688 + 676) * 12
    }
  },
  ultra: {
    name: 'Ultra',
    discount: 0.88,
    comprehensiveDiscounts: { weekly: 0.68, monthly: 0.63, yearly: 0.59 },
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
      points: 1999,
      bonusPercent: 50,
      bonusPoints: 999,
      totalPoints: 35976 // (1999 + 999) * 12
    }
  }
}

// Calculate pricing and points for current subscription type
const getCurrentPricing = (planType) => {
  const plan = pricingData[planType]
  return plan[selectedSubscriptionType.value]
}

/** Base/bonus show per-month on yearly */
function formatPlanCredits (planType, field) {
  const p = getCurrentPricing(planType)
  if (selectedSubscriptionType.value === 'yearly') {
    if (field === 'base') return `${p.points}/month`
    if (field === 'bonus') return `+${p.bonusPoints}`
  }
  if (field === 'base') return String(p.points)
  if (field === 'bonus') return `+${p.bonusPoints}`
  return String(p.totalPoints)
}

function getYearlyCreditsFormula (planType) {
  const p = getCurrentPricing(planType)
  return `${p.points + p.bonusPoints} × 12`
}

const getComprehensiveDiscount = (planType) => {
  const plan = pricingData[planType]
  return plan.comprehensiveDiscounts[selectedSubscriptionType.value]
}

const getComprehensiveDiscountDisplay = (planType) => {
  return `${Math.round(getComprehensiveDiscount(planType) * 100)}%`
}

// Get subscription period label
const getPeriodLabel = computed(() => {
  const labels = {
    weekly: 'week',
    monthly: 'month',
    yearly: 'year'
  }
  return labels[selectedSubscriptionType.value] || 'month'
})

// Calculate discount percentage from discount rate (legacy helper)
const getDiscountPercent = (discountRate) => {
  return Math.round((1 - discountRate) * 100)
}

// Top-up 充值数据
const topupOptions = ref([
  {
    amount: 10,
    bonusRate: 0,
    baseCredits: 1000,
    bonusCredits: 0,
    totalCredits: 1000
  },
  {
    amount: 30,
    bonusRate: 10,
    baseCredits: 3000,
    bonusCredits: 300,
    totalCredits: 3300
  },
  {
    amount: 50,
    bonusRate: 20,
    baseCredits: 5000,
    bonusCredits: 1000,
    totalCredits: 6000
  },
  {
    amount: 100,
    bonusRate: 30,
    baseCredits: 10000,
    bonusCredits: 3000,
    totalCredits: 13000
  }
])

// 选中的充值选项索引（默认选中 $30）
const selectedTopupIndex = ref(1)

// 选择充值选项
const selectTopup = (index) => {
  selectedTopupIndex.value = selectedTopupIndex.value === index ? null : index
}

// 创建 Stripe 会话并跳转收银台
const stripeLoading = ref(false)

async function createStripeSession(type, priceId) {
  if (stripeLoading.value) return
  stripeLoading.value = true
  try {
    const data = await post('/api/stripe/create-session', { type, priceId })
    const url = data?.sessionUrl
    if (url) {
      window.location.href = url
      return
    }
    showError('Invalid response: missing checkout URL')
  } catch (e) {
    if (!e?.__fromApi) showError(e?.message || 'Failed to start checkout')
  } finally {
    stripeLoading.value = false
  }
}

// 充值：从左到右 priceId 1–4
const rechargeTopup = (index) => {
  const priceId = index + 1
  createStripeSession('recharge', priceId)
}

const FLUX_GRADIENT_END = 'hsl(200, 90%, 42%)'

const planIdlePalette = {
  border: 'hsl(215, 16%, 35%)',
  background: 'linear-gradient(135deg, hsl(215, 25%, 14%) 0%, hsl(215, 20%, 10%) 100%)',
  accent: 'hsl(215, 16%, 35%)',
  badgeEnd: 'hsl(215, 16%, 42%)',
  boxShadow: 'none'
}

// 选中态：Basic ← 原 Pro；Pro 为 Basic 与 Ultra 中间态；Ultra 最鲜艳
const planSelectedPalettes = [
  {
    border: 'hsl(173, 72%, 46%)',
    background: 'linear-gradient(135deg, hsla(173, 72%, 44%, 0.22) 0%, hsl(215, 20%, 10%) 100%)',
    accent: 'hsl(173, 78%, 48%)',
    badgeEnd: FLUX_GRADIENT_END,
    boxShadow: '0 6px 24px hsla(173, 80%, 42%, 0.28)'
  },
  {
    border: 'hsl(169, 82%, 50%)',
    background: 'linear-gradient(135deg, hsla(169, 80%, 47%, 0.27) 0%, hsla(173, 78%, 42%, 0.1) 100%)',
    accent: 'hsl(166, 86%, 52%)',
    badgeEnd: 'hsl(187, 92%, 50%)',
    boxShadow: '0 7px 28px hsla(169, 85%, 45%, 0.33)'
  },
  {
    border: 'hsl(165, 92%, 54%)',
    background: 'linear-gradient(135deg, hsla(165, 90%, 50%, 0.32) 0%, hsla(173, 85%, 42%, 0.14) 100%)',
    accent: 'hsl(158, 95%, 56%)',
    badgeEnd: 'hsl(190, 95%, 58%)',
    boxShadow: '0 8px 32px hsla(165, 90%, 48%, 0.38)'
  }
]

const getPlanPalette = (tier) => {
  return selectedPlanIndex.value === tier ? planSelectedPalettes[tier] : planIdlePalette
}

const getPlanCardStyle = (tier) => {
  const palette = getPlanPalette(tier)
  const selected = selectedPlanIndex.value === tier
  return {
    borderColor: palette.border,
    background: palette.background,
    borderWidth: selected ? '2px' : '1px',
    boxShadow: selected ? palette.boxShadow : undefined
  }
}

const getPlanAccentStyle = (tier) => {
  const palette = getPlanPalette(tier)
  return { background: palette.accent, color: 'white' }
}

const getPlanButtonStyle = (tier) => {
  const palette = getPlanPalette(tier)
  return { background: palette.accent, color: 'white', border: 'none' }
}

const getPlanBadgeStyle = (tier) => {
  const palette = planSelectedPalettes[tier]
  return { background: `linear-gradient(135deg, ${palette.accent} 0%, ${palette.badgeEnd} 100%)` }
}

// Top-up 选中态：左→右 Basic → 中间两档递进 → Ultra（4 档）
const topupSelectedPalettes = [
  planSelectedPalettes[0],
  {
    border: 'hsl(171, 77%, 48%)',
    background: 'linear-gradient(135deg, hsla(171, 76%, 45%, 0.245) 0%, hsla(173, 74%, 42%, 0.06) 100%)',
    accent: 'hsl(170, 82%, 50%)',
    badgeEnd: 'hsl(194, 91%, 46%)',
    boxShadow: '0 6px 26px hsla(171, 82%, 44%, 0.305)'
  },
  {
    border: 'hsl(167, 87%, 52%)',
    background: 'linear-gradient(135deg, hsla(167, 85%, 48%, 0.295) 0%, hsla(169, 82%, 42%, 0.12) 100%)',
    accent: 'hsl(162, 90%, 54%)',
    badgeEnd: 'hsl(188, 94%, 54%)',
    boxShadow: '0 7px 30px hsla(167, 88%, 46%, 0.355)'
  },
  planSelectedPalettes[2]
]

const getTopupPalette = (tier) => {
  return selectedTopupIndex.value === tier ? topupSelectedPalettes[tier] : planIdlePalette
}

const getTopupCardStyle = (tier) => {
  const palette = getTopupPalette(tier)
  const selected = selectedTopupIndex.value === tier
  return {
    borderColor: palette.border,
    background: palette.background,
    borderWidth: selected ? '2px' : '1px',
    boxShadow: selected ? palette.boxShadow : undefined
  }
}

const getTopupButtonStyle = (tier) => {
  const palette = getTopupPalette(tier)
  return { background: palette.accent, color: 'white', border: 'none' }
}

const getTopupBadgeStyle = (tier) => {
  const palette = topupSelectedPalettes[tier]
  return { background: `linear-gradient(135deg, ${palette.accent} 0%, ${palette.badgeEnd} 100%)` }
}

const getPlanColor = (index) => {
  const colors = [
    'hsl(215, 16%, 35%)',
    'hsl(173, 60%, 38%)',
    'hsl(173, 80%, 40%)'
  ]
  return colors[index] || colors[0]
}

// FAQ 数据
const faqs = ref([
  {
    question: 'What payment methods do you accept?',
    answer: '<p>We support all major credit cards, debit cards and PayPal for secure and convenient payment.</p>',
    isOpen: false
  },
  {
    question: 'Is there a free trial or sign-up bonus?',
    answer:
      '<ul><li>Register and get <strong>20 free credits</strong> immediately.</li><li>Use credits across chat, image, video, and audio models—no payment method or subscription required to start.</li></ul>',
    isOpen: false
  },
  {
    question: 'How do credits work on FuseAI Tools?',
    answer:
      '<p>Each generation shows the <strong>credits required</strong> on the tool page before you submit. Video tools (e.g., Wan, HappyHorse) typically charge by duration and resolution; image and chat tools charge per run or per token rule. Member plans apply discounts (Basic 98%, Pro 95%, Ultra 88% of list price).</p>',
    isOpen: false
  },
  {
    question: 'How does billing and subscription work?',
    answer:
      '<p>We offer flexible and transparent billing:</p><h4>1. Subscription period</h4><ul><li>Annual plans: paid once per year; benefits are distributed monthly.</li><li>Monthly/weekly plans: active until the period ends.</li></ul><h4>2. Credit rules</h4><ul><li>Top-up credits you purchase separately do not expire.</li><li>If your account has both subscription benefits and purchased credits, subscription benefits are used first.</li></ul><h4>3. Self-management</h4><ul><li>Cancel or change your subscription anytime in account settings. Benefits remain until the current period ends.</li></ul>',
    isOpen: false
  },
  {
    question: 'What is your refund policy?',
    answer:
      '<p>We offer clear refund guarantees:</p><h4>Annual subscription refund</h4><p>Fees from the next billing cycle are refunded. The current cycle deducts the value of consumed credits.</p><h4>Monthly/weekly refund</h4><p>After deducting consumed credits, the remaining fee is refunded.</p><h4>Credit top-up refund</h4><p>The remaining balance is refunded after deducting consumed credits; bonus credits are deducted first if included.</p><h4>Uniform rule</h4><p>If a refund involves distributed benefits, the corresponding amount is deducted proportionally.</p>',
    isOpen: false
  }
])

const faqsForSchema = computed(() =>
  faqs.value.map((faq) => ({ question: faq.question, answer: faq.answer }))
)
useToolSeoFaqSchema(faqsForSchema)

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}

// 选择订阅套餐
const selectPlan = (index) => {
  selectedPlanIndex.value = index
}

// 订阅套餐操作：weekly priceId 1–3，monthly 4–6，yearly 7–9
const subscribePlan = (index) => {
  selectedPlanIndex.value = index
  const typeMap = { weekly: 1, monthly: 4, yearly: 7 }
  const base = typeMap[selectedSubscriptionType.value] ?? 4
  const priceId = base + index
  createStripeSession('subscription', priceId)
}
</script>

<style scoped>
.pricing-page {
  min-height: 100vh;
  background: var(--flux-bg, hsl(220, 14%, 5%));
  color: var(--flux-foreground, hsl(0, 0%, 98%));
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Hero Section - 深色径向渐变，与首页 Hero 一致 */
.hero-section {
  padding: 20px 0;
  text-align: left;
  background: var(--flux-bg, hsl(220, 14%, 5%));
  background-image:
    radial-gradient(ellipse 80% 50% at 50% -20%, hsla(173, 80%, 40%, 0.14), transparent),
    radial-gradient(ellipse 60% 40% at 100% 50%, hsla(200, 90%, 42%, 0.1), transparent),
    linear-gradient(180deg, hsl(215, 25%, 11%) 0%, hsl(220, 14%, 5%) 100%);
  color: var(--flux-foreground, hsl(0, 0%, 98%));
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: var(--flux-foreground, hsl(0, 0%, 98%));
  text-align: left;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: hsla(0, 0%, 98%, 0.85);
  max-width: 720px;
  margin: 0;
  line-height: 1.6;
  text-align: left;
}

.hero-subtitle strong {
  color: var(--flux-foreground, hsl(0, 0%, 98%));
  font-weight: 600;
}

/* Pricing Plans */
.pricing-plans {
  padding: 60px 0;
  background: var(--flux-bg, hsl(220, 14%, 5%));
  background-image:
    radial-gradient(ellipse 70% 55% at 50% 0%, hsla(173, 80%, 40%, 0.08), transparent),
    radial-gradient(ellipse 55% 45% at 100% 80%, hsla(200, 90%, 42%, 0.06), transparent);
}

/* Subscription Type Toggle */
.subscription-type-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  background: var(--flux-card, hsl(215, 25%, 14%));
  padding: 0.5rem;
  border-radius: 12px;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid var(--flux-border, hsl(215, 16%, 22%));
  box-shadow: 0 4px 24px hsla(0, 0%, 0%, 0.25);
}

.type-btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  color: var(--flux-muted, hsl(215, 12%, 62%));
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-btn:hover {
  background: var(--flux-card-hover, hsl(215, 22%, 18%));
  color: var(--flux-foreground, hsl(0, 0%, 98%));
}

.type-btn.active {
  background: hsl(173, 80%, 40%);
  color: white;
  box-shadow: 0 2px 8px hsla(173, 80%, 40%, 0.35);
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1560px;
  margin: 0 auto 2rem;
}

.plan-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
}

.plan-card:hover {
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15);
  transform: translateY(-2px);
}

.plan-card.selected {
  transform: translateY(-2px);
}

.plan-card.basic.selected {
  box-shadow: 0 6px 24px hsla(173, 80%, 42%, 0.28);
}

.plan-card.pro.selected {
  box-shadow: 0 7px 28px hsla(169, 85%, 45%, 0.33);
}

.plan-card.ultra.selected {
  box-shadow: 0 8px 32px hsla(165, 90%, 48%, 0.38);
}


.plan-badge {
  position: absolute;
  top: -8px;
  right: 16px;
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 1;
}

.plan-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.plan-title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.plan-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}


.plan-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--flux-foreground, hsl(0, 0%, 98%));
}

.plan-price {
  margin-bottom: 0.5rem;
}

.price-amount {
  font-size: 2rem;
  font-weight: 700;
  color: var(--flux-foreground, hsl(0, 0%, 98%));
}

.price-period {
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--flux-muted, hsl(215, 12%, 62%));
}

.plan-discount {
  margin-bottom: 0.5rem;
}

.discount-text {
  display: inline-block;
  background: #fef3c7;
  color: #92400e;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
}

.plan-description {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0;
}

/* Points Information */
.points-info {
  background: var(--flux-input-bg, hsl(215, 20%, 10%));
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border: 1px solid var(--flux-border, hsl(215, 16%, 22%));
}

.points-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.9375rem;
}

.points-row:last-child {
  margin-bottom: 0;
}

.points-row.total {
  padding-top: 0.75rem;
  border-top: 2px solid var(--flux-border, hsl(215, 16%, 22%));
  margin-top: 0.75rem;
}

.points-row-formula {
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}

.points-formula {
  width: 100%;
  text-align: right;
  font-weight: 600;
  color: var(--flux-muted, hsl(215, 12%, 62%));
}

.points-label {
  color: var(--flux-muted, hsl(215, 12%, 62%));
  font-weight: 500;
}

.points-value {
  color: var(--flux-foreground, hsl(0, 0%, 98%));
  font-weight: 600;
}

.points-value.bonus {
  color: #10b981;
}

.points-value.total-value {
  font-size: 1.125rem;
  color: hsl(173, 80%, 40%);
  font-weight: 700;
}

/* Points Explanation */
.points-explanation {
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background: var(--flux-card, hsl(215, 25%, 14%));
  border: 1px solid var(--flux-border, hsl(215, 16%, 22%));
  border-radius: 8px;
  max-width: 780px;
  margin-left: auto;
  margin-right: auto;
}

.explanation-text {
  color: var(--flux-muted, hsl(215, 12%, 62%));
  font-size: 0.875rem;
  margin: 0 0 0.75rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.explanation-text i {
  color: var(--flux-primary, hsl(173, 80%, 40%));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  vertical-align: middle;
}

.discount-explanation {
  color: var(--flux-muted, hsl(215, 12%, 62%));
  font-size: 0.875rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.discount-explanation i {
  color: var(--flux-primary, hsl(173, 80%, 40%));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  vertical-align: middle;
}

.plan-button {
  width: 100%;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9375rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.75rem;
}

.comprehensive-discount {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
  padding: 1rem 1.125rem;
  border-radius: 10px;
  border: 1px solid hsla(165, 85%, 52%, 0.55);
  background: linear-gradient(
    180deg,
    hsla(165, 80%, 48%, 0.22) 0%,
    hsla(173, 75%, 42%, 0.14) 100%
  );
  box-shadow:
    0 0 0 1px hsla(165, 90%, 62%, 0.12) inset,
    0 4px 20px hsla(165, 85%, 45%, 0.18);
}

.comprehensive-discount-label {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: hsl(165, 55%, 82%);
}

.comprehensive-discount-value {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  color: hsl(158, 92%, 62%);
  text-shadow: 0 0 18px hsla(158, 95%, 58%, 0.45);
}

.basic-button:hover,
.pro-button:hover,
.ultra-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

/* Top-up Section */
.topup-section {
  padding: 60px 0;
  background: var(--flux-bg, hsl(220, 14%, 5%));
  background-image:
    radial-gradient(ellipse 60% 45% at 0% 50%, hsla(173, 80%, 40%, 0.06), transparent),
    radial-gradient(ellipse 50% 40% at 100% 50%, hsla(200, 90%, 42%, 0.05), transparent);
  border-top: 1px solid var(--flux-border-subtle, hsla(215, 16%, 32%, 0.5));
}

.topup-section .section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.topup-section .section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--flux-foreground, hsl(0, 0%, 98%));
}

.topup-section .section-subtitle {
  font-size: 1.125rem;
  color: var(--flux-muted, hsl(215, 12%, 62%));
}

.topup-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
}

.topup-card {
  border-radius: 12px;
  padding: 2rem;
  border: 2px solid;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.topup-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
  border-width: 2px;
}

.topup-card.selected {
  transform: translateY(-2px);
}

.topup-card--tier-0.selected {
  box-shadow: 0 6px 24px hsla(173, 80%, 42%, 0.28);
}

.topup-card--tier-1.selected {
  box-shadow: 0 6px 26px hsla(171, 82%, 44%, 0.305);
}

.topup-card--tier-2.selected {
  box-shadow: 0 7px 30px hsla(167, 88%, 46%, 0.355);
}

.topup-card--tier-3.selected {
  box-shadow: 0 8px 32px hsla(165, 90%, 48%, 0.38);
}

.topup-badge {
  position: absolute;
  top: -8px;
  right: 16px;
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 1;
}


.topup-header {
  margin-bottom: 1.5rem;
  width: 100%;
}

.topup-amount {
  font-size: 2rem;
  font-weight: 700;
  color: var(--flux-foreground, hsl(0, 0%, 98%));
  margin-bottom: 0.5rem;
  word-break: break-word;
  overflow-wrap: break-word;
}

.topup-bonus-rate {
  display: inline-block;
  background: #fef3c7;
  color: #92400e;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
}

.topup-credits {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--flux-input-bg, hsl(215, 20%, 10%));
  border-radius: 8px;
  border: 1px solid var(--flux-border, hsl(215, 16%, 22%));
  width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;
}

.credits-base {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--flux-foreground, hsl(0, 0%, 98%));
  white-space: nowrap;
}

.credits-plus {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--flux-muted, hsl(215, 12%, 62%));
  white-space: nowrap;
}

.credits-bonus {
  font-size: 1.25rem;
  font-weight: 600;
  color: #10b981;
  white-space: nowrap;
}

.topup-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  margin-bottom: 1rem;
  border-top: 2px solid var(--flux-border, hsl(215, 16%, 22%));
  width: 100%;
  box-sizing: border-box;
}

.total-label {
  color: var(--flux-muted, hsl(215, 12%, 62%));
  font-weight: 500;
  font-size: 0.9375rem;
}

.total-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: hsl(173, 80%, 40%);
  white-space: nowrap;
}

.topup-button {
  width: 100%;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9375rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
  margin-top: auto;
}

.topup-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.topup-explanation {
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background: var(--flux-card, hsl(215, 25%, 14%));
  border: 1px solid var(--flux-border, hsl(215, 16%, 22%));
  border-radius: 8px;
  max-width: 780px;
  margin-left: auto;
  margin-right: auto;
}

.topup-explanation-text {
  color: var(--flux-muted, hsl(215, 12%, 62%));
  font-size: 0.875rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.topup-explanation-text i {
  color: var(--flux-primary, hsl(173, 80%, 40%));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  vertical-align: middle;
}

/* FAQ Section */
.faq-section {
  padding: 60px 0;
  background: var(--flux-bg, hsl(220, 14%, 5%));
  border-top: 1px solid var(--flux-border-subtle, hsla(215, 16%, 32%, 0.5));
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--flux-foreground, hsl(0, 0%, 98%));
}

.faq-list {
  max-width: 1040px;
  margin: 0 auto;
}

.faq-item {
  background: var(--flux-card, hsl(215, 25%, 14%));
  border-radius: 14px;
  margin-bottom: 1rem;
  overflow: hidden;
  box-shadow: none;
  border: 1px solid var(--flux-border, hsl(215, 16%, 22%));
}

.faq-question {
  width: 100%;
  padding: 1.35rem 1.75rem;
  text-align: left;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: var(--flux-foreground, hsl(0, 0%, 98%));
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;
}

.faq-question:hover {
  background: var(--flux-card-hover, hsl(215, 22%, 18%));
}

.faq-question i {
  transition: transform 0.3s ease;
  color: var(--flux-muted, hsl(215, 12%, 62%));
}

.faq-question i.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer.open {
  max-height: 2000px;
}

.faq-content {
  padding: 0 1.75rem 1.5rem;
  color: var(--flux-muted, hsl(215, 12%, 62%));
  line-height: 1.8;
}

.faq-content p {
  margin: 0.75rem 0 0.75rem 0;
  color: var(--flux-muted, hsl(215, 12%, 62%));
  line-height: 1.8;
}

.faq-content p:first-child {
  margin-top: 0;
}

.faq-content h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--flux-foreground, hsl(0, 0%, 98%));
  margin: 1.25rem 0 0.75rem 0;
}

.faq-content h4:first-of-type {
  margin-top: 1rem;
}

.faq-content ul {
  margin: 0.5rem 0 0.75rem 0;
  padding-left: 1.5rem;
  list-style-type: disc;
}

.faq-content li {
  margin: 0.5rem 0;
  color: var(--flux-muted, hsl(215, 12%, 62%));
  line-height: 1.8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .plans-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .plan-card {
    max-width: 100%;
    padding: 1.5rem;
  }

  .subscription-type-toggle {
    max-width: 100%;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .type-btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .topup-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .topup-card {
    padding: 1.5rem;
  }
}

@media (max-width: 1024px) {
  .topup-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .topup-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .topup-grid {
    grid-template-columns: 1fr;
  }
}
</style>
