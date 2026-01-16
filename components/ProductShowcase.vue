<template>
  <section class="product-showcase">
    <div class="simply-container">
      <div class="showcase-content">
        <!-- Left Side - AI Models -->
        <div class="models-section">
          <h2 class="section-title">AI Models</h2>
          <div class="models-grid">
            <div class="model-category">
              <h3>Advanced Models</h3>
              <div class="model-list">
                <div class="model-item" v-for="model in advancedModels" :key="model">
                  <i class="fas fa-brain"></i>
                  <span>{{ model }}</span>
                </div>
              </div>
            </div>

            <div class="model-category">
              <h3>Creative Models</h3>
              <div class="model-list">
                <div class="model-item" v-for="model in creativeModels" :key="model">
                  <i class="fas fa-palette"></i>
                  <span>{{ model }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Tools -->
        <div class="tools-section">
          <h2 class="section-title">AI Tools</h2>
          <div class="tools-grid">
            <ToolCategory
                v-for="category in toolCategories"
                :key="category.title"
                :category="category"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const advancedModels = [
  'GPT-5',
  'OpenAI o3',
  'OpenAI od-mini',
  'Gemini 2.5 Pro',
  'Claude 3.7 Sonnet',
  'DeepSeek-R1',
  'GPT-4o',
  'Gemini 2.0',
  'Mistral AI'
]

const creativeModels = [
  'DALL-E 3',
  'GPT-4o Image',
  'Stable Diffusion',
  'Ideogram 2.0',
  'Recraft AI',
  'Playground AI',
  'Runway AI',
  'Flux AI',
  'Imagen 3'
]

const toolCategories = [
  {
    title: 'Image Tools',
    icon: 'fas fa-image',
    tools: [
      'AI Image Generator',
      'AI Image to Image',
      'AI Background Remover',
      'AI Logo Generator',
      'Image Restoration',
      'AI Watermark Remover'
    ]
  },
  {
    title: 'PDF Tools',
    icon: 'fas fa-file-pdf',
    tools: [
      'ChatPDF',
      'PDF Translator',
      'PDF to PNG',
      'PDF to JPG',
      'PDF to PPT',
      'PDF to WORD',
      'PDF OCR Tool'
    ]
  },
  {
    title: 'Writing Tools',
    icon: 'fas fa-pen',
    tools: [
      'AI Detector',
      'AI Text Optimizer',
      'AI Number Decoder',
      'ChatGPT Detector',
      'Text Rewriter',
      'AI Translator'
    ]
  },
  {
    title: 'Video Tools',
    icon: 'fas fa-video',
    tools: [
      'AI Video Player',
      'YouTube Video Summarizer',
      'Video Summary Generator',
      'AI Video Search'
    ]
  },
  {
    title: 'Analysis Tools',
    icon: 'fas fa-chart-bar',
    tools: [
      'AI Mind Map',
      'Audio to Text',
      'AI Resume Scanner',
      'AI Resume Analyzer'
    ]
  },
  {
    title: 'Comparison',
    icon: 'fas fa-balance-scale',
    tools: [
      'Ask AI',
      'AI Chat',
      'VS ChatGPT Plus',
      'VS Poe',
      'VS Claude AI',
      'VS Microsoft Copilot',
      'ChatGPT VS Gemini'
    ]
  }
]
</script>

<style scoped>
.product-showcase {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.showcase-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 42px; /* 60px * 0.7 */
  align-items: start;
  max-width: 84%; /* 缩小整体宽度30% */
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1a1a1a;
  text-align: center;
}

.models-grid {
  display: flex;
  flex-direction: column;
  gap: 1.4rem; /* 2rem * 0.7 */
}

.model-category h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #374151;
  border-left: 4px solid #667eea;
  padding-left: 1rem;
}

.model-list {
  display: grid;
  gap: 0.75rem;
}

.model-item {
  display: flex;
  align-items: center;
  gap: 0.525rem; /* 0.75rem * 0.7 */
  padding: 0.525rem 0.7rem; /* 0.75rem * 0.7, 1rem * 0.7 */
  background: white;
  border-radius: 5.6px; /* 8px * 0.7 */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  font-size: 0.875rem; /* 缩小字体 */
}

.model-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.model-item i {
  color: #667eea;
  width: 14px; /* 20px * 0.7 */
  font-size: 0.875rem; /* 缩小图标大小 */
}

.tools-grid {
  display: grid;
  gap: 1.4rem; /* 2rem * 0.7 */
}

@media (max-width: 1024px) {
  .showcase-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>