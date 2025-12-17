<template>
  <div class="pricing-card" :class="{ popular: plan.popular }">
    <div class="pricing-header">
      <h3 class="plan-name">{{ plan.name }}</h3>
      <div class="plan-price">
        <span class="price">{{ plan.price }}</span>
        <span class="period">/{{ plan.period }}</span>
      </div>
      <div v-if="plan.popular" class="popular-badge">Most Popular</div>
    </div>
    <ul class="plan-features">
      <li v-for="(feature, index) in plan.features" :key="index">
        <i class="fas fa-check"></i>
        {{ feature }}
      </li>
    </ul>
    <button class="plan-button" :class="{ 'popular-button': plan.popular }" @click="selectPlan(plan)">
      {{ plan.buttonText }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  plan: {
    type: Object,
    required: true
  }
})

const selectPlan = (plan) => {
  // 处理选择套餐逻辑
  console.log('Selected plan:', plan.name)
}
</script>

<style scoped>
.pricing-card {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 2px solid #f1f5f9;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.pricing-card.popular {
  border-color: #667eea;
  transform: scale(1.05);
}

.pricing-card.popular:hover {
  transform: scale(1.05) translateY(-5px);
}

.pricing-header {
  margin-bottom: 2rem;
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.plan-price {
  margin-bottom: 1rem;
}

.price {
  font-size: 3rem;
  font-weight: 800;
  color: #1a1a1a;
}

.period {
  color: #6b7280;
  font-size: 1.2rem;
}

.popular-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
}

.plan-features {
  list-style: none;
  margin-bottom: 2.5rem;
  text-align: left;
}

.plan-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: #4b5563;
}

.plan-features i {
  color: #10b981;
  font-size: 0.9rem;
}

.plan-button {
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

.plan-button:hover {
  border-color: #667eea;
  color: #667eea;
}

.popular-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.popular-button:hover {
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