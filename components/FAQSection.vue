<template>
  <section class="faq-section">
    <div class="simply-container">
      <div class="faq-header">
        <h2 class="faq-title">Frequently Asked Questions</h2>
      </div>
      
      <div class="faq-list">
        <div 
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
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// FAQ数据
const faqItems = ref([
  {
    question: "What is SimplyAI?",
    answer: "SimplyAI is a platform that integrates multiple AI models, designed to be your one-stop platform for easily using various AI tools, including chat, image generation, audio processing, video generation, and more.",
    isOpen: true
  },
  {
    question: "How do I use SimplyAI?",
    answer: "After registering a SimplyAI account, you can access over 50 AI models and tools on the platform. You can use the chat feature for conversations, image generation tools to create images, audio tools to process sound, or video tools to generate video content.",
    isOpen: false
  },
  {
    question: "Is SimplyAI free?",
    answer: "SimplyAI offers a free version that includes basic AI conversation features. We also provide a paid premium version with more advanced features and higher usage limits.",
    isOpen: false
  },
  {
    question: "How does SimplyAI work?",
    answer: "SimplyAI integrates multiple AI models including ChatGPT, Claude, Gemini, and others, as well as image generation tools like Midjourney and Flux Kontext, audio tools like Suno and Elevenlabs, and video generation tools like Veo3, Runway, Luma, and Sora, providing you with comprehensive AI capabilities.",
    isOpen: false
  }
])

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
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid #e5e7eb;
  transition: all 0.3s ease;
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

.faq-answer p {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
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




