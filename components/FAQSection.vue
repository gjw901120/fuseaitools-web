<template>
  <section class="faq-section">
    <div class="simply-container">
      <div class="faq-header">
        <h2 class="faq-title">Frequently Asked Questions</h2>
      </div>
      
      <div class="faq-list">
        <article 
          v-for="(item, index) in faqItems" 
          :key="index"
          class="faq-item"
          :class="{ 'active': item.isOpen }"
        >
          <div class="faq-question" @click="toggleFAQ(index)">
            <h3 class="question-text">{{ item.question }}</h3>
            <div class="faq-icon">
              <i class="fas" :class="item.isOpen ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
            </div>
          </div>
          
          <div v-if="item.isOpen" class="faq-answer">
            <div class="faq-content" v-html="item.answer"></div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// FAQ数据
const faqItems = ref([
  {
    question: "What is FuseAI Tools?",
    answer: "<p>FuseAI Tools is an integrated AI platform with 100+ models for chat, image, video, and audio. Use everything in the browser with credit-based pricing—new users receive <strong>20 free credits</strong> on sign-up.</p>",
    isOpen: true
  },
  {
    question: "How do I use FuseAI Tools?",
    answer: "<p>Register for free, then open any tool from the <a href=\"/home\">AI tools hub</a>. Each workflow shows the credits required before you generate. No local GPU or separate installs are needed.</p>",
    isOpen: false
  },
  {
    question: "Is FuseAI Tools free?",
    answer: "<p>Yes—you can start for free:</p><ul><li><strong>Free sign-up:</strong> New users receive <strong>20 free credits</strong> to try models across chat, image, video, and audio—no payment method required.</li><li><strong>Subscriptions:</strong> Basic, Pro, and Ultra plans include monthly credits and member discounts on generations.</li><li><strong>Top-up:</strong> Buy additional credits anytime on our <a href=\"/pricing\">pricing page</a>.</li></ul>",
    isOpen: false
  },
  {
    question: "How does pricing work?",
    answer: "<p>Generations consume <strong>credits</strong> from your balance. Subscription plans include credits plus lower per-generation rates; you can also top up credits separately. See <a href=\"/pricing\">pricing</a> for plans, conversion ($1 = 100 credits), and member discounts.</p>",
    isOpen: false
  },
  {
    question: "Which AI models are available?",
    answer: "<p>FuseAI Tools integrates leading models across categories, for example:</p><ul><li><strong>Chat:</strong> ChatGPT, Claude, Gemini, DeepSeek</li><li><strong>Image:</strong> Flux Kontext, Ideogram, GPT Image, Wan 2.7, Seedream, and more</li><li><strong>Audio:</strong> Suno, ElevenLabs</li><li><strong>Video:</strong> Veo3, Wan, HappyHorse, Runway, Luma, Sora, Seedance, Kling, and more</li></ul><p>Browse the full list from the <a href=\"/home\">tools hub</a> or read tutorials on <a href=\"/news\">News</a>.</p>",
    isOpen: false
  }
])

// FAQ 结构化数据（仅保留一处，避免与首页重复；Answer.text 使用纯文本）
const faqSchema = computed(() => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.value.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": typeof item.answer === 'string' ? item.answer.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : item.answer
    }
  }))
}))

// 添加 FAQ 结构化数据到页面 head
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(faqSchema.value)
    }
  ]
})

// 切换FAQ展开/收起状态
const toggleFAQ = (index) => {
  faqItems.value[index].isOpen = !faqItems.value[index].isOpen
}
</script>

<style scoped>
.faq-section {
  padding: 5rem 0;
  background: var(--flux-bg);
  border-top: 1px solid var(--flux-border-subtle);
}

.faq-header {
  text-align: center;
  margin-bottom: 3rem;
}

.faq-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--flux-foreground);
  margin: 0;
  line-height: 1.2;
}

.faq-list {
  max-width: 1040px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  background: var(--flux-card);
  border: 1px solid var(--flux-border);
  border-radius: 14px;
  transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  display: block;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.faq-item:hover {
  border-color: var(--flux-border);
  box-shadow: 0 4px 20px hsla(0, 0%, 0%, 0.2);
}

.faq-item.active {
  border-color: hsla(173, 80%, 40%, 0.35);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.35rem 1.75rem;
  cursor: pointer;
  transition: background 0.25s ease;
}

.faq-question:hover {
  background: var(--flux-card-hover);
}

.question-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--flux-foreground);
  margin: 0;
  flex: 1;
  line-height: 1.5;
}

.faq-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  color: var(--flux-muted);
  transition: all 0.3s ease;
}

.faq-icon i {
  font-size: 0.875rem;
}

.faq-item.active .faq-icon {
  color: var(--flux-primary);
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1.75rem 1.5rem 1.75rem;
  animation: slideDown 0.3s ease-out;
}

.faq-content {
  font-size: 1rem;
  color: var(--flux-muted);
  line-height: 1.8;
  padding-left: 0.25rem;
}

.faq-content p {
  margin: 0.75rem 0;
  color: var(--flux-muted);
  line-height: 1.8;
}

.faq-content p:first-child {
  margin-top: 0;
}

.faq-content p:last-child {
  margin-bottom: 0;
}

.faq-content ul {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
  list-style-type: disc;
}

.faq-content li {
  margin: 0.5rem 0;
  color: var(--flux-muted);
  line-height: 1.8;
}

.faq-content strong {
  font-weight: 600;
  color: var(--flux-foreground);
}

.faq-content a {
  color: var(--flux-primary);
  text-decoration: none;
  font-weight: 500;
}

.faq-content a:hover {
  text-decoration: underline;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .faq-section {
    padding: 3rem 0;
  }
  
  .faq-title {
    font-size: 2rem;
  }
  
  .faq-list {
    gap: 0.75rem;
  }

  .faq-item {
    border-radius: 12px;
  }

  .faq-question {
    padding: 1.15rem 1.25rem;
  }
  
  .question-text {
    font-size: 1rem;
  }
  
  .faq-answer {
    padding: 0 1.25rem 1.25rem 1.25rem;
  }
}

@media (max-width: 480px) {
  .faq-section {
    padding: 2rem 0;
  }
  
  .faq-title {
    font-size: 1.75rem;
  }
  
  .faq-header {
    margin-bottom: 2rem;
  }
}
</style>




