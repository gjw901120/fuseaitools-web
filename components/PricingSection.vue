<template>
  <section class="pricing-section">
    <div class="simply-container">
      <div class="section-header">
        <h2>Simple, Transparent Pricing</h2>
        <p>Choose the plan that works best for you</p>
      </div>

      <div class="pricing-grid">
        <div class="pricing-card">
          <div class="pricing-header">
            <h3>Free</h3>
            <div class="price">$0<span>/forever</span></div>
          </div>
          <ul class="features-list">
            <li><i class="fas fa-check"></i> 5 conversations per day</li>
            <li><i class="fas fa-check"></i> Basic AI assistance</li>
            <li><i class="fas fa-check"></i> Standard response quality</li>
            <li><i class="fas fa-check"></i> Community support</li>
          </ul>
          <button class="pricing-btn">Get Started</button>
        </div>

        <div class="pricing-card popular">
          <div class="popular-badge">Most Popular</div>
          <div class="pricing-header">
            <h3>Pro</h3>
            <div class="price">$15<span>/month</span></div>
          </div>
          <ul class="features-list">
            <li><i class="fas fa-check"></i> Unlimited conversations</li>
            <li><i class="fas fa-check"></i> Advanced AI models</li>
            <li><i class="fas fa-check"></i> Priority response</li>
            <li><i class="fas fa-check"></i> Code generation</li>
            <li><i class="fas fa-check"></i> Email support</li>
          </ul>
          <button class="pricing-btn primary">Start Free Trial</button>
        </div>

        <div class="pricing-card">
          <div class="pricing-header">
            <h3>Team</h3>
            <div class="price">$30<span>/month</span></div>
          </div>
          <ul class="features-list">
            <li><i class="fas fa-check"></i> Everything in Pro</li>
            <li><i class="fas fa-check"></i> Multiple team members</li>
            <li><i class="fas fa-check"></i> Collaboration tools</li>
            <li><i class="fas fa-check"></i> API access</li>
            <li><i class="fas fa-check"></i> Priority support</li>
          </ul>
          <button class="pricing-btn">Contact Sales</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 价格区域组件逻辑
</script>

<style scoped>
.pricing-section {
  padding: 80px 0;
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.section-header p {
  font-size: 1.2rem;
  color: #6b7280;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.pricing-card {
  position: relative;
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  text-align: center;
  transition: all 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.pricing-card.popular {
  border-color: #667eea;
  transform: scale(1.05);
}

.pricing-card.popular:hover {
  transform: scale(1.05) translateY(-5px);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.pricing-header {
  margin-bottom: 2rem;
}

.pricing-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.price {
  font-size: 3rem;
  font-weight: 800;
  color: #1a1a1a;
}

.price span {
  font-size: 1.2rem;
  color: #6b7280;
  font-weight: 500;
}

.features-list {
  list-style: none;
  margin-bottom: 2.5rem;
  text-align: left;
}

.features-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: #4b5563;
}

.features-list i {
  color: #10b981;
  font-size: 0.9rem;
}

.pricing-btn {
  width: 100%;
  padding: 1rem 2rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  color: #4b5563;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pricing-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.pricing-btn.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
}

.pricing-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .pricing-card.popular {
    transform: none;
  }

  .pricing-card.popular:hover {
    transform: translateY(-5px);
  }
}
</style>