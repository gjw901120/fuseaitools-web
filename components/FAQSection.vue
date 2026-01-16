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
    question: "What is FuseAI?",
    answer: "<p>FuseAI is an integrated artificial intelligence platform that brings together various cutting-edge AI tools, including chat, image generation, audio processing, and video creation. The platform's objective is to enable users to easily access and utilize the most comprehensive AI capabilities from a single location.</p>",
    isOpen: true
  },
  {
    question: "How to use FuseAI?",
    answer: "<p>Users can access the platform simply by completing registration. Upon registration, users can enjoy over 50 professional AI models and tools. FuseAI is designed to meet various needs, whether it's getting inspiration through intelligent dialogue, creating visual works with text-to-image tools, processing and optimizing audio, or generating high-quality video content.</p>",
    isOpen: false
  },
  {
    question: "Is FuseAI free?",
    answer: "<p>Yes, FuseAI offers flexible experience plans:</p><ul><li><strong>Free Experience:</strong> Users who register receive 100 points, which allows them to experience all models on the site without barriers.</li><li><strong>Paid Plans:</strong> There are multiple subscription plans designed to provide more substantial point quotas and exclusive discounts, catering to high-frequency and professional users.</li><li><strong>Additional Option:</strong> The platform also supports direct top-up of points for on-demand usage.</li></ul>",
    isOpen: false
  },
  {
    question: "How does FuseAI work?",
    answer: "<p>The core of FuseAI lies in its powerful model integration. It seamlessly integrates industry-leading AI technologies, providing examples for different functionalities:</p><ul><li><strong>Dialogue and Reasoning:</strong> ChatGPT, Claude, Gemini, etc.</li><li><strong>Image Generation:</strong> Midjourney, Flux Kontext, etc.</li><li><strong>Audio Processing:</strong> Suno, ElevenLabs, etc.</li><li><strong>Video Generation:</strong> Veo3, Runway, Luma, Sora, etc.</li></ul><p>Through a unified, user-friendly interface, we integrate these scattered cutting-edge capabilities into a coherent workflow, providing you with a one-stop AI solution.</p>",
    isOpen: false
  }
])

// FAQ 结构化数据
const faqSchema = computed(() => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.value.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
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
  background: #ffffff;
  border-top: 1px solid #f3f4f6;
}

.faq-header {
  text-align: center;
  margin-bottom: 3rem;
}

.faq-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1.2;
}

.faq-list {
  max-width: 1040px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  display: block;
  margin: 0;
  padding: 0;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.faq-question:hover {
  background: #f9fafb;
  margin: 0 -2rem;
  padding-left: 2rem;
  padding-right: 2rem;
}

.question-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
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
  color: #6b7280;
  transition: all 0.3s ease;
}

.faq-icon i {
  font-size: 0.875rem;
}

.faq-item.active .faq-icon {
  color: #3b82f6;
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 0 1.5rem 0;
  animation: slideDown 0.3s ease-out;
}

.faq-content {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.8;
}

.faq-content p {
  margin: 0.75rem 0;
  color: #4b5563;
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
  color: #4b5563;
  line-height: 1.8;
}

.faq-content strong {
  font-weight: 600;
  color: #1f2937;
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
  
  .faq-question {
    padding: 1.25rem 0;
  }
  
  .faq-question:hover {
    margin: 0 -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .question-text {
    font-size: 1rem;
  }
  
  .faq-answer {
    padding: 0 0 1.25rem 0;
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




