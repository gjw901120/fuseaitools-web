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
        <div class="pricing-toggle">
          <span class="toggle-label" :class="{ active: !isYearly }">monthly</span>
          <button class="toggle-switch" @click="toggleBilling">
            <div class="toggle-slider" :class="{ yearly: isYearly }"></div>
          </button>
          <span class="toggle-label" :class="{ active: isYearly }">
            Yearly 
            <span class="discount-badge">Save 20%</span>
          </span>
        </div>

        <div class="plans-grid">
          <!-- Unlimited Plan -->
          <div class="plan-card unlimited">
            <div class="plan-badge">Flash Sale 50%</div>
            <div class="plan-header">
              <div class="plan-title-row">
                <div class="plan-icon unlimited-icon">∞</div>
                <h3 class="plan-name">Unlimited</h3>
              </div>
              <div class="plan-price">
                <span class="price-amount">US${{ isYearly ? '149' : '12.4' }}<span class="price-period">/{{ isYearly ? 'year' : 'month' }}</span></span>
                <span v-if="isYearly" class="price-original">US$299/year</span>
              </div>
              <p class="plan-description">For power users and businesses</p>
            </div>
            
            <!-- Detailed Features -->
            <div class="detailed-features">
              <!-- Basic Models -->
              <div class="feature-category">
                <h4 class="category-title">Access to Basic Models</h4>
                <div class="access-info">Unlimited access to basic models</div>
                <div class="model-list">
                  <div class="model-item">
                    <div class="model-icon gpt-icon">S</div>
                    <span>GPT-4o mini</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon claude-icon">*</div>
                    <span>Claude 3.5 Haiku</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon deepseek-icon">Y</div>
                    <span>DeepSeek V3 & R1</span>
                  </div>
                </div>
              </div>

              <!-- Advanced Models -->
              <div class="feature-category">
                <h4 class="category-title">Access to Advanced Models</h4>
                <div class="access-info">Unlimited access to advanced models</div>
                <div class="model-list">
                  <div class="model-item">
                    <div class="model-icon gpt-icon">S</div>
                    <span>GPT-5</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon claude-icon">*</div>
                    <span>Claude 4</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon gemini-icon">◆</div>
                    <span>Gemini 2.5 Pro</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon llama-icon">∞</div>
                    <span>Llama 3.1 405B</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon grok-icon">G</div>
                    <span>Grok 3</span>
                  </div>
                </div>
              </div>

              <!-- Image & Video Generation -->
              <div class="feature-category">
                <h4 class="category-title">Image and Video Generation</h4>
                <div class="model-list">
                  <div class="model-item">
                    <div class="model-icon nano-icon">★</div>
                    <span>Nano Banana</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon sd3-icon">S.</div>
                    <span>SD3</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon dalle-icon">D</div>
                    <span>Dall-E 3</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon flux-icon">A</div>
                    <span>Flux Pro & Dev</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon pixverse-icon">P</div>
                    <span>Pixverse</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon kling-icon">K</div>
                    <span>Kling</span>
                  </div>
                </div>
              </div>

              <!-- Other Features -->
              <div class="feature-category">
                <h4 class="category-title">Smart Writing & Translation</h4>
                <div class="access-info">Advanced smart writing, translation, and summary</div>
              </div>

              <div class="feature-category">
                <h4 class="category-title">ChatPDF</h4>
                <div class="access-info">Unlimited ChatPDF</div>
              </div>

              <div class="feature-category">
                <h4 class="category-title">Application Integration</h4>
                <div class="app-list">
                  <div class="app-item">
                    <div class="app-icon gmail-icon">M</div>
                  </div>
                  <div class="app-item">
                    <div class="app-icon outlook-icon">✉</div>
                  </div>
                  <div class="app-item">
                    <div class="app-icon facebook-icon">f</div>
                  </div>
                  <div class="app-item">
                    <div class="app-icon twitter-icon">X</div>
                  </div>
                  <div class="app-item">
                    <div class="app-icon linkedin-icon">in</div>
                  </div>
                </div>
              </div>

              <div class="feature-category">
                <h4 class="category-title">Cross-platform AI Assistant</h4>
                <div class="platform-list">
                  <div class="platform-item">
                    <div class="platform-icon chrome-icon">🌐</div>
                  </div>
                  <div class="platform-item">
                    <div class="platform-icon windows-icon">⊞</div>
                  </div>
                  <div class="platform-item">
                    <div class="platform-icon apple-icon">🍎</div>
                  </div>
                  <div class="platform-item">
                    <div class="platform-icon android-icon">🤖</div>
                  </div>
                  <div class="platform-item">
                    <div class="platform-icon vscode-icon"><></div>
                  </div>
                </div>
              </div>
            </div>

            <button class="plan-button unlimited-button">Subscribe Now</button>
          </div>

          <!-- Pro Plan -->
          <div class="plan-card pro">
            <div class="plan-header">
              <div class="plan-title-row">
                <div class="plan-icon pro-icon">◆</div>
                <h3 class="plan-name">Pro</h3>
              </div>
              <div class="plan-price">
                <span class="price-amount">US${{ isYearly ? '99' : '8.3' }}<span class="price-period">/{{ isYearly ? 'year' : 'month' }}</span></span>
              </div>
              <p class="plan-description">For professionals and small teams</p>
            </div>
            
            <!-- Detailed Features -->
            <div class="detailed-features">
              <!-- Basic Models -->
              <div class="feature-category">
                <h4 class="category-title">Access to Basic Models</h4>
                <div class="access-info">5000 accesses to basic models monthly</div>
                <div class="model-list">
                  <div class="model-item">
                    <div class="model-icon gpt-icon">S</div>
                    <span>GPT-4o mini</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon claude-icon">*</div>
                    <span>Claude 3.5 Haiku</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon deepseek-icon">Y</div>
                    <span>DeepSeek V3 & R1</span>
                  </div>
                </div>
              </div>

              <!-- Advanced Models -->
              <div class="feature-category">
                <h4 class="category-title">Access to Advanced Models</h4>
                <div class="access-info">200 accesses to advanced models monthly</div>
                <div class="model-list">
                  <div class="model-item">
                    <div class="model-icon gpt-icon">S</div>
                    <span>GPT-5</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon claude-icon">*</div>
                    <span>Claude 4</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon gemini-icon">◆</div>
                    <span>Gemini 2.5 Pro</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon llama-icon">∞</div>
                    <span>Llama 3.1 405B</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon grok-icon">G</div>
                    <span>Grok 3</span>
                  </div>
                </div>
              </div>

              <!-- Image & Video Generation -->
              <div class="feature-category">
                <h4 class="category-title">Image and Video Generation</h4>
                <div class="model-list">
                  <div class="model-item">
                    <div class="model-icon nano-icon">★</div>
                    <span>Nano Banana</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon sd3-icon">S.</div>
                    <span>SD3</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon dalle-icon">D</div>
                    <span>Dall-E 3</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon flux-icon">A</div>
                    <span>Flux Pro & Dev</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon pixverse-icon">P</div>
                    <span>Pixverse</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon kling-icon">K</div>
                    <span>Kling</span>
                  </div>
                </div>
              </div>

              <!-- Other Features -->
              <div class="feature-category">
                <h4 class="category-title">Smart Writing & Translation</h4>
                <div class="access-info">Advanced smart writing, translation, and summary</div>
              </div>

              <div class="feature-category">
                <h4 class="category-title">ChatPDF</h4>
                <div class="access-info">Unlimited ChatPDF</div>
              </div>

              <div class="feature-category">
                <h4 class="category-title">Application Integration</h4>
                <div class="app-list">
                  <div class="app-item">
                    <div class="app-icon gmail-icon">M</div>
                  </div>
                  <div class="app-item">
                    <div class="app-icon outlook-icon">✉</div>
                  </div>
                  <div class="app-item">
                    <div class="app-icon facebook-icon">f</div>
                  </div>
                  <div class="app-item">
                    <div class="app-icon twitter-icon">X</div>
                  </div>
                  <div class="app-item">
                    <div class="app-icon linkedin-icon">in</div>
                  </div>
                </div>
              </div>

              <div class="feature-category">
                <h4 class="category-title">Cross-platform AI Assistant</h4>
                <div class="platform-list">
                  <div class="platform-item">
                    <div class="platform-icon chrome-icon">🌐</div>
                  </div>
                  <div class="platform-item">
                    <div class="platform-icon windows-icon">⊞</div>
                  </div>
                  <div class="platform-item">
                    <div class="platform-icon apple-icon">🍎</div>
                  </div>
                  <div class="platform-item">
                    <div class="platform-icon android-icon">🤖</div>
                  </div>
                  <div class="platform-item">
                    <div class="platform-icon vscode-icon"><></div>
                  </div>
                </div>
              </div>
            </div>

            <button class="plan-button pro-button">Subscribe Now</button>
          </div>

          <!-- Free Plan -->
          <div class="plan-card free">
            <div class="plan-header">
              <div class="plan-title-row">
                <div class="plan-icon free-icon">★</div>
                <h3 class="plan-name">Free</h3>
              </div>
              <div class="plan-price">
                <span class="price-amount">US$0.0</span>
              </div>
              <p class="plan-description">Perfect for getting started</p>
            </div>
            
            <!-- Detailed Features -->
            <div class="detailed-features">
              <!-- Basic Models -->
              <div class="feature-category">
                <h4 class="category-title">Access to Basic Models</h4>
                <div class="access-info">40 accesses to basic models daily</div>
                <div class="model-list">
                  <div class="model-item">
                    <div class="model-icon gpt-icon">S</div>
                    <span>GPT-4o mini</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon claude-icon">*</div>
                    <span>Claude 3.5 Haiku</span>
                  </div>
                  <div class="model-item">
                    <div class="model-icon deepseek-icon">Y</div>
                    <span>DeepSeek V3 & R1</span>
                  </div>
                </div>
              </div>

              <!-- Advanced Models -->
              <div class="feature-category">
                <h4 class="category-title">Access to Advanced Models</h4>
                <div class="access-info">Not available</div>
              </div>

              <!-- Image & Video Generation -->
              <div class="feature-category">
                <h4 class="category-title">Image and Video Generation</h4>
                <div class="access-info">Limited trial for image/video generation</div>
              </div>

              <!-- Smart Writing -->
              <div class="feature-category">
                <h4 class="category-title">Smart Writing & Translation</h4>
                <div class="access-info">Basic model-driven smart writing, translation, and summary</div>
              </div>

              <!-- ChatPDF -->
              <div class="feature-category">
                <h4 class="category-title">ChatPDF</h4>
                <div class="access-info">Limited trial for ChatPDF</div>
              </div>

              <!-- Application Integration -->
              <div class="feature-category">
                <h4 class="category-title">Application Integration</h4>
                <div class="app-list">
                  <div class="app-item">
                    <div class="app-icon gmail-icon">M</div>
                  </div>
                  <div class="app-item">
                    <div class="app-icon outlook-icon">✉</div>
                  </div>
                  <div class="app-item">
                    <div class="app-icon facebook-icon">f</div>
                  </div>
                  <div class="app-item">
                    <div class="app-icon twitter-icon">X</div>
                  </div>
                  <div class="app-item">
                    <div class="app-icon linkedin-icon">in</div>
                  </div>
                </div>
              </div>

              <!-- Cross-platform -->
              <div class="feature-category">
                <h4 class="category-title">Cross-platform AI Assistant</h4>
                <div class="platform-list">
                  <div class="platform-item">
                    <div class="platform-icon chrome-icon">🌐</div>
                  </div>
                  <div class="platform-item">
                    <div class="platform-icon windows-icon">⊞</div>
                  </div>
                  <div class="platform-item">
                    <div class="platform-icon apple-icon">🍎</div>
                  </div>
                  <div class="platform-item">
                    <div class="platform-icon android-icon">🤖</div>
                  </div>
                  <div class="platform-item">
                    <div class="platform-icon vscode-icon"><></div>
                  </div>
                </div>
              </div>
            </div>

            <button class="plan-button free-button" disabled>Current Subscription</button>
          </div>
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
              <p>{{ faq.answer }}</p>
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
  title: 'Pricing - SimplyAI Tools',
  meta: [
    { name: 'description', content: 'Choose the perfect plan for your AI needs. Simple, transparent pricing with no hidden fees.' }
  ]
})

// 年付/月付切换
const isYearly = ref(false)

const toggleBilling = () => {
  isYearly.value = !isYearly.value
}

// FAQ 数据
const faqs = ref([
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes will take effect immediately.',
    isOpen: false
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.',
    isOpen: false
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, you can start with our free plan which includes 10 requests per day. No credit card required.',
    isOpen: false
  },
  {
    question: 'How does billing work?',
    answer: 'Billing is automatic and recurring. You can cancel anytime from your account settings.',
    isOpen: false
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all paid plans.',
    isOpen: false
  }
])

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
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

.breadcrumb {
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-start;
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.home-link {
  background: rgba(102, 126, 234, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: #667eea;
}

.home-link:hover {
  background: rgba(102, 126, 234, 0.2);
  color: #5a6fd8;
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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Pricing Plans */
.pricing-plans {
  padding: 60px 0;
  background: #f8fafc;
}

.pricing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.toggle-label {
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  transition: color 0.3s ease;
}

.toggle-label.active {
  color: #667eea;
}

.discount-badge {
  background: #10b981;
  color: white;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 8px;
}

.toggle-switch {
  position: relative;
  width: 50px;
  height: 28px;
  background: #e5e7eb;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
}

.toggle-switch:hover {
  background: #d1d5db;
}

.toggle-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-slider.yearly {
  transform: translateX(22px);
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.plan-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  position: relative;
  transition: all 0.3s ease;
  max-width: 480px;
  margin: 0 auto;
}

.plan-card:hover {
  border-color: #d1d5db;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.plan-card.unlimited {
  background: white;
  color: #1f2937;
  border-color: #e5e7eb;
}

.plan-badge {
  position: absolute;
  top: -8px;
  right: 16px;
  background: #1f2937;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.plan-badge::before {
  content: "⚡";
  font-size: 0.75rem;
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
  margin-bottom: 1rem;
}

.unlimited-icon {
  background: #1f2937;
  color: white;
}

.pro-icon {
  background: #667eea;
  color: white;
}

.free-icon {
  background: #e5e7eb;
  color: #6b7280;
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

.price-original {
  font-size: 0.875rem;
  color: #9ca3af;
  text-decoration: line-through;
  margin-left: 0.5rem;
}

.plan-description {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0;
}

.plan-features {
  margin-bottom: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #374151;
}

.plan-card.unlimited .feature-item {
  color: #e5e7eb;
}

.feature-item i {
  color: #10b981;
  font-size: 0.875rem;
}

.plan-button {
  width: 100%;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.unlimited-button {
  background: white;
  color: #1f2937;
}

.unlimited-button:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
}

.pro-button {
  background: #f3f4f6;
  color: #1f2937;
}

.pro-button:hover {
  background: #e5e7eb;
  transform: translateY(-2px);
}

.free-button {
  background: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}

.free-button:disabled {
  opacity: 0.6;
}

/* Detailed Features */
.detailed-features {
  margin: 1.5rem 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(229, 231, 235, 0.3);
}

.feature-category {
  margin-bottom: 1.5rem;
}

.feature-category:last-child {
  margin-bottom: 0;
}

.category-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.access-info {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.model-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.model-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #374151;
}

.model-icon {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  color: white;
  flex-shrink: 0;
}

.gpt-icon {
  background: #10a37f;
}

.claude-icon {
  background: #ff6b35;
}

.deepseek-icon {
  background: #3b82f6;
}

.gemini-icon {
  background: #ea4335;
}

.llama-icon {
  background: #f59e0b;
}

.grok-icon {
  background: #1f2937;
}

.nano-icon {
  background: #06b6d4;
}

.sd3-icon {
  background: #8b5cf6;
}

.dalle-icon {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
}

.flux-icon {
  background: #1f2937;
}

.pixverse-icon {
  background: #8b5cf6;
}

.kling-icon {
  background: #1e40af;
}

.app-list, .platform-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.app-item, .platform-item {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-icon, .platform-icon {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  color: white;
}

.gmail-icon {
  background: #ea4335;
}

.outlook-icon {
  background: #0078d4;
}

.facebook-icon {
  background: #1877f2;
}

.twitter-icon {
  background: #1da1f2;
}

.linkedin-icon {
  background: #0077b5;
}

.chrome-icon {
  background: linear-gradient(45deg, #4285f4, #34a853, #fbbc05, #ea4335);
  color: white;
}

.windows-icon {
  background: #0078d4;
}

.apple-icon {
  background: #1f2937;
  color: white;
}

.android-icon {
  background: #3ddc84;
  color: #1f2937;
}

.vscode-icon {
  background: #007acc;
}

/* FAQ Section */
.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #1f2937;
}

/* FAQ Section */
.faq-section {
  padding: 60px 0;
  background: #f8fafc;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: white;
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
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
  max-height: 200px;
}

.faq-answer p {
  padding: 0 1.5rem 1.5rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
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
  
  .detailed-features {
    margin: 1rem 0;
    padding-top: 1rem;
  }
  
  .feature-category {
    margin-bottom: 1rem;
  }
  
  .category-title {
    font-size: 0.8rem;
  }
  
  .access-info {
    font-size: 0.7rem;
  }
  
  .model-item {
    font-size: 0.75rem;
  }
  
  .model-icon {
    width: 18px;
    height: 18px;
    font-size: 0.65rem;
  }
  
  .app-list, .platform-list {
    gap: 0.25rem;
  }
  
  .app-item, .platform-item {
    width: 24px;
    height: 24px;
  }
  
  .app-icon, .platform-icon {
    width: 18px;
    height: 18px;
    font-size: 0.65rem;
  }
}
</style>