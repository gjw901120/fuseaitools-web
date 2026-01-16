<template>
  <div class="pricing-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="simply-container">
        <div class="hero-content">
          <h1 class="hero-title">Plans & Pricing</h1>
          <p class="hero-subtitle">
            Choose the perfect plan for your needs. All plans include our core AI features.
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
            :style="{ 
              borderColor: selectedPlanIndex === 0 ? getPlanColor(2) : getPlanColor(0),
              background: selectedPlanIndex === 0 ? getPlanBackground(2) : getPlanBackground(0),
              borderWidth: selectedPlanIndex === 0 ? '2px' : '1px'
            }"
            @click="selectPlan(0)"
          >
            <div class="plan-badge" v-if="selectedPlanIndex === 0" :style="{ background: `linear-gradient(135deg, ${getPlanColor(2)} 0%, #6366f1 100%)` }">Selected</div>
            <div class="plan-header">
              <div class="plan-title-row">
                <div class="plan-icon basic-icon" :style="{ background: selectedPlanIndex === 0 ? getPlanColor(2) : getPlanColor(0), color: 'white' }">★</div>
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
                <span class="points-label">Base Points:</span>
                <span class="points-value">{{ getCurrentPricing('basic').points }}</span>
              </div>
              <div class="points-row">
                <span class="points-label">Bonus Rate:</span>
                <span class="points-value bonus">{{ getCurrentPricing('basic').bonusPercent }}%</span>
              </div>
              <div class="points-row">
                <span class="points-label">Bonus Points:</span>
                <span class="points-value bonus">+{{ getCurrentPricing('basic').bonusPoints }}</span>
              </div>
              <div class="points-row total">
                <span class="points-label">Total Points:</span>
                <span class="points-value total-value">{{ getCurrentPricing('basic').totalPoints }}</span>
              </div>
            </div>

            <button class="plan-button basic-button" :style="{ background: selectedPlanIndex === 0 ? getPlanColor(2) : getPlanColor(0), color: 'white', border: 'none' }" @click.stop="subscribePlan(0)">Subscribe Now</button>
          </div>

          <!-- Pro Plan -->
          <div 
            class="plan-card pro"
            :class="{ 'selected': selectedPlanIndex === 1 }"
            :style="{ 
              borderColor: selectedPlanIndex === 1 ? getPlanColor(2) : getPlanColor(0),
              background: selectedPlanIndex === 1 ? getPlanBackground(2) : getPlanBackground(0),
              borderWidth: selectedPlanIndex === 1 ? '2px' : '1px'
            }"
            @click="selectPlan(1)"
          >
            <div class="plan-badge" v-if="selectedPlanIndex === 1" :style="{ background: `linear-gradient(135deg, ${getPlanColor(2)} 0%, #6366f1 100%)` }">Selected</div>
            <div class="plan-badge" v-else :style="{ background: `linear-gradient(135deg, ${getPlanColor(1)} 0%, ${getPlanColor(2)} 100%)` }">Popular</div>
            <div class="plan-header">
              <div class="plan-title-row">
                <div class="plan-icon pro-icon" :style="{ background: selectedPlanIndex === 1 ? getPlanColor(2) : getPlanColor(0), color: 'white' }">◆</div>
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
                <span class="points-label">Base Points:</span>
                <span class="points-value">{{ getCurrentPricing('pro').points }}</span>
              </div>
              <div class="points-row">
                <span class="points-label">Bonus Rate:</span>
                <span class="points-value bonus">{{ getCurrentPricing('pro').bonusPercent }}%</span>
              </div>
              <div class="points-row">
                <span class="points-label">Bonus Points:</span>
                <span class="points-value bonus">+{{ getCurrentPricing('pro').bonusPoints }}</span>
              </div>
              <div class="points-row total">
                <span class="points-label">Total Points:</span>
                <span class="points-value total-value">{{ getCurrentPricing('pro').totalPoints }}</span>
              </div>
            </div>

            <button class="plan-button pro-button" :style="{ background: selectedPlanIndex === 1 ? getPlanColor(2) : getPlanColor(0), color: 'white', border: 'none' }" @click.stop="subscribePlan(1)">Subscribe Now</button>
          </div>

          <!-- Ultimate Plan -->
          <div 
            class="plan-card ultimate"
            :class="{ 'selected': selectedPlanIndex === 2 }"
            :style="{ 
              borderColor: selectedPlanIndex === 2 ? getPlanColor(2) : getPlanColor(0),
              background: selectedPlanIndex === 2 ? getPlanBackground(2) : getPlanBackground(0),
              borderWidth: selectedPlanIndex === 2 ? '2px' : '1px'
            }"
            @click="selectPlan(2)"
          >
            <div class="plan-badge" v-if="selectedPlanIndex === 2" :style="{ background: `linear-gradient(135deg, ${getPlanColor(2)} 0%, #6366f1 100%)` }">Selected</div>
            <div class="plan-badge" v-else :style="{ background: `linear-gradient(135deg, ${getPlanColor(2)} 0%, #6366f1 100%)` }">Best Value</div>
            <div class="plan-header">
              <div class="plan-title-row">
                <div class="plan-icon ultimate-icon" :style="{ background: selectedPlanIndex === 2 ? getPlanColor(2) : getPlanColor(0), color: 'white' }">∞</div>
                <h3 class="plan-name">Ultimate</h3>
              </div>
              <div class="plan-price">
                <span class="price-amount">${{ getCurrentPricing('ultimate').price }}</span>
                <span class="price-period">/{{ getPeriodLabel }}</span>
              </div>
              <div class="plan-discount">
                <span class="discount-text">{{ getDiscountPercent(pricingData.ultimate.discount) }}% off</span>
              </div>
            </div>
            
            <!-- Points Information -->
            <div class="points-info">
              <div class="points-row">
                <span class="points-label">Base Points:</span>
                <span class="points-value">{{ getCurrentPricing('ultimate').points }}</span>
              </div>
              <div class="points-row">
                <span class="points-label">Bonus Rate:</span>
                <span class="points-value bonus">{{ getCurrentPricing('ultimate').bonusPercent }}%</span>
              </div>
              <div class="points-row">
                <span class="points-label">Bonus Points:</span>
                <span class="points-value bonus">+{{ getCurrentPricing('ultimate').bonusPoints }}</span>
              </div>
              <div class="points-row total">
                <span class="points-label">Total Points:</span>
                <span class="points-value total-value">{{ getCurrentPricing('ultimate').totalPoints }}</span>
              </div>
            </div>

            <button class="plan-button ultimate-button" :style="{ background: selectedPlanIndex === 2 ? getPlanColor(2) : getPlanColor(0), color: 'white', border: 'none' }" @click.stop="subscribePlan(2)">Subscribe Now</button>
          </div>
        </div>

        <!-- Points Explanation -->
        <div class="points-explanation">
          <p class="explanation-text">
            <i class="fas fa-info-circle"></i>
            Points conversion rate: $1 = 100 points (e.g., $9.9 = 990 points)
          </p>
          <p class="discount-explanation">
            <i class="fas fa-info-circle"></i>
            Subscription benefits: Basic plan users enjoy 98% pricing on all models, Pro plan users enjoy 95% pricing, and Ultimate plan users enjoy 88% pricing.
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
              'selected': selectedTopupIndex === index
            }"
            :style="{ 
              borderColor: selectedTopupIndex === index ? getCardColor(3) : getCardColor(0),
              background: selectedTopupIndex === index ? getCardBackground(3) : getCardBackground(0),
              borderWidth: selectedTopupIndex === index ? '2px' : '1px'
            }"
            @click="selectTopup(index)"
          >
            <div class="topup-badge" v-if="selectedTopupIndex === index" :style="{ background: `linear-gradient(135deg, ${getCardColor(3)} 0%, #6366f1 100%)` }">Selected</div>
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
            <button class="topup-button" :style="{ background: selectedTopupIndex === index ? getCardColor(3) : getCardColor(0), color: 'white', border: 'none' }" @click.stop="rechargeTopup(index)">Recharge Now</button>
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
// 设置页面标题
useHead({
  title: 'Pricing - FuseAI Tools',
  meta: [
    { name: 'description', content: 'Choose the perfect plan for your AI needs. Simple, transparent pricing with no hidden fees.' }
  ]
})

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
    discount: 0.98, // 9.8% off means 0.98 discount rate (2% off)
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
      points: 9990, // 99.9 * 100
      bonusPercent: 30,
      bonusPoints: 2997, // 9990 * 0.3
      totalPoints: 12987 // 9990 + 2997
    }
  },
  pro: {
    name: 'Pro',
    discount: 0.95, // 9.5% off means 0.95 discount rate (5% off)
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
      points: 16880, // 168.8 * 100
      bonusPercent: 40,
      bonusPoints: 6752, // 16880 * 0.4
      totalPoints: 23632 // 16880 + 6752
    }
  },
  ultimate: {
    name: 'Ultimate',
    discount: 0.88, // 8.8% off means 0.88 discount rate (12% off)
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
      points: 19990, // 199.9 * 100
      bonusPercent: 50,
      bonusPoints: 9995, // 19990 * 0.5
      totalPoints: 29985 // 19990 + 9995
    }
  }
}

// Calculate pricing and points for current subscription type
const getCurrentPricing = (planType) => {
  const plan = pricingData[planType]
  return plan[selectedSubscriptionType.value]
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

// Calculate discount percentage from discount rate
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

// 选中的充值选项索引
const selectedTopupIndex = ref(null)

// 选择充值选项
const selectTopup = (index) => {
  selectedTopupIndex.value = selectedTopupIndex.value === index ? null : index
}

// 充值操作
const rechargeTopup = (index) => {
  const item = topupOptions.value[index]
  console.log('Recharging:', item)
  // 这里可以添加实际的充值逻辑
}

// 获取卡片边框颜色（靛蓝递进式）
const getCardColor = (index) => {
  const colors = [
    '#c7d2fe', // 最浅靛蓝 - $10
    '#a5b4fc', // 浅靛蓝 - $30
    '#818cf8', // 中靛蓝 - $50
    '#6366f1'  // 深靛蓝 - $100
  ]
  return colors[index] || colors[0]
}

// 获取卡片背景颜色（靛蓝递进式）
const getCardBackground = (index) => {
  const backgrounds = [
    'linear-gradient(135deg, #eef2ff 0%, #ffffff 100%)', // $10 - 最浅靛蓝
    'linear-gradient(135deg, #e0e7ff 0%, #ffffff 100%)', // $30 - 浅靛蓝
    'linear-gradient(135deg, #c7d2fe 0%, #ffffff 100%)', // $50 - 中靛蓝
    'linear-gradient(135deg, #a5b4fc 0%, #ffffff 100%)'  // $100 - 深靛蓝
  ]
  return backgrounds[index] || backgrounds[0]
}

// 获取订阅套餐边框颜色（靛蓝递进式）
const getPlanColor = (index) => {
  const colors = [
    '#c7d2fe', // Basic - 最浅靛蓝
    '#818cf8', // Pro - 中靛蓝
    '#6366f1'  // Ultimate - 深靛蓝
  ]
  return colors[index] || colors[0]
}

// 获取订阅套餐背景颜色（靛蓝递进式）
const getPlanBackground = (index) => {
  const backgrounds = [
    'linear-gradient(135deg, #eef2ff 0%, #ffffff 100%)', // Basic - 最浅靛蓝
    'linear-gradient(135deg, #e0e7ff 0%, #ffffff 100%)', // Pro - 中靛蓝
    'linear-gradient(135deg, #c7d2fe 0%, #ffffff 100%)'  // Ultimate - 深靛蓝
  ]
  return backgrounds[index] || backgrounds[0]
}

// FAQ 数据
const faqs = ref([
  {
    question: 'What payment methods do you accept?',
    answer: '<p>We support all major credit cards, debit cards and PayPal for secure and convenient payment.</p>',
    isOpen: false
  },
  {
    question: 'Is there a free trial/experience?',
    answer: '<ul><li>Register now and get 100 points immediately.</li><li>These points can be used to enjoy all AI models on the platform without the need to bind a payment method or subscribe to any package.</li></ul>',
    isOpen: false
  },
  {
    question: 'How does billing and subscription work?',
    answer: '<p>We offer flexible and transparent billing methods to help you manage easily:</p><h4>1. Subscription period</h4><ul><li>Annual subscription package: Paid annually, benefits are distributed monthly.</li><li>Monthly/Weekly Payment Plan: The period lasts until the subscription expires.</li></ul><h4>2. Points Rules</h4><ul><li>The points purchased individually are valid indefinitely and do not expire.</li><li>If there are both subscription benefits and purchase points in the account, the system will prioritize the deduction of subscription benefits.</li></ul><h4>3. Self-management</h4><ul><li>You can cancel or change your subscription at any time in the account settings. Once cancelled, the benefits will remain available until the end of the current period.</li></ul>',
    isOpen: false
  },
  {
    question: 'What is your refund policy?',
    answer: '<p>We offer clear and reasonable refund guarantees:</p><h4>Annual subscription refund</h4><p>All fees from the next billing cycle will be refunded. The current cycle will deduct the corresponding value of the consumed points.</p><h4>Refund for monthly/weekly payment plans</h4><p>After deducting the value of the consumed points, the remaining fee will be refunded.</p><h4>Points recharge and refund</h4><p>The remaining balance will be refunded after deducting the value of consumed points; if the points include a gift portion, the gift amount will be deducted first.</p><h4>Uniform rule</h4><p>If any refund involves the distribution of benefits, the corresponding amount will be deducted proportionally.</p>',
    isOpen: false
  }
])

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}

// 选择订阅套餐
const selectPlan = (index) => {
  selectedPlanIndex.value = index
}

// 订阅套餐操作
const subscribePlan = (index) => {
  selectedPlanIndex.value = index
  const planNames = ['basic', 'pro', 'ultimate']
  const planName = planNames[index]
  console.log('Subscribing to:', planName, getCurrentPricing(planName))
  // 这里可以添加实际的订阅逻辑
}
</script>

<style scoped>
.pricing-page {
  min-height: 100vh;
  background: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Hero Section */
.hero-section {
  padding: 60px 0 40px;
  text-align: center;
  background: #ffffff;
  color: #1a1a1a;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  color: #1a1a1a;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 780px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Pricing Plans */
.pricing-plans {
  padding: 60px 0;
  background: #f8fafc;
}

/* Subscription Type Toggle */
.subscription-type-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  background: white;
  padding: 0.5rem;
  border-radius: 12px;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.type-btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  color: #6b7280;
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-btn:hover {
  background: #f3f4f6;
  color: #1f2937;
}

.type-btn.active {
  background: #6366f1;
  color: white;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
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
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.25);
  transform: translateY(-2px);
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
  color: #1f2937;
}

.plan-price {
  margin-bottom: 0.5rem;
}

.price-amount {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.price-period {
  font-size: 1.25rem;
  font-weight: 400;
  color: #6b7280;
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
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border: 1px solid #e5e7eb;
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
  border-top: 2px solid #e5e7eb;
  margin-top: 0.75rem;
}

.points-label {
  color: #6b7280;
  font-weight: 500;
}

.points-value {
  color: #1f2937;
  font-weight: 600;
}

.points-value.bonus {
  color: #10b981;
}

.points-value.total-value {
  font-size: 1.125rem;
  color: #6366f1;
  font-weight: 700;
}

/* Points Explanation */
.points-explanation {
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  max-width: 780px;
  margin-left: auto;
  margin-right: auto;
}

.explanation-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0 0 0.75rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.explanation-text i {
  color: #667eea;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  vertical-align: middle;
}

.discount-explanation {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.discount-explanation i {
  color: #667eea;
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
  margin-top: 1rem;
}

.basic-button:hover,
.pro-button:hover,
.ultimate-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

/* Top-up Section */
.topup-section {
  padding: 60px 0;
  background: #ffffff;
}

.topup-section .section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.topup-section .section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.topup-section .section-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
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
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.25);
  transform: translateY(-2px);
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
  color: #1f2937;
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
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;
}

.credits-base {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap;
}

.credits-plus {
  font-size: 1.25rem;
  font-weight: 600;
  color: #6b7280;
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
  border-top: 2px solid #e5e7eb;
  width: 100%;
  box-sizing: border-box;
}

.total-label {
  color: #6b7280;
  font-weight: 500;
  font-size: 0.9375rem;
}

.total-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #6366f1;
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
  background: white;
  border-radius: 8px;
  max-width: 780px;
  margin-left: auto;
  margin-right: auto;
}

.topup-explanation-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.topup-explanation-text i {
  color: #667eea;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  vertical-align: middle;
}

/* FAQ Section */
.faq-section {
  padding: 60px 0;
  background: #ffffff;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #1f2937;
}

.faq-list {
  max-width: 1040px;
  margin: 0 auto;
}

.faq-item {
  background: white;
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.faq-question {
  width: 100%;
  padding: 1.5rem;
  text-align: left;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;
}

.faq-question:hover {
  background: #f8fafc;
}

.faq-question i {
  transition: transform 0.3s ease;
  color: #6b7280;
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
  padding: 0 1.5rem 1.5rem;
  color: #6b7280;
  line-height: 1.8;
}

.faq-content p {
  margin: 0.75rem 0 0.75rem 0;
  color: #6b7280;
  line-height: 1.8;
}

.faq-content p:first-child {
  margin-top: 0;
}

.faq-content h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
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
  color: #6b7280;
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
