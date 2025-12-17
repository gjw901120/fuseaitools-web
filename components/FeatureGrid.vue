<template>
  <section class="feature-grid-section">
    <div class="simply-container">
      <div class="section-header">
        <h2>Featured Capabilities</h2>
        <p>Explore our comprehensive suite of AI-powered tools</p>
      </div>

      <div class="features-container">
        <!-- AI Models Column -->
        <div class="feature-column">
          <h3><i class="fas fa-brain"></i> AI Models</h3>
          <div class="feature-items">
            <div class="feature-item" v-for="model in aiModels" :key="model">
              {{ model }}
            </div>
          </div>
        </div>

        <!-- Image Tools Column -->
        <div class="feature-column">
          <h3><i class="fas fa-image"></i> Image Tools</h3>
          <div class="feature-items">
            <div class="feature-item" v-for="tool in imageTools" :key="tool">
              {{ tool }}
            </div>
          </div>
        </div>

        <!-- Writing Tools Column -->
        <div class="feature-column">
          <h3><i class="fas fa-pen"></i> Writing Tools</h3>
          <div class="feature-items">
            <div class="feature-item" v-for="tool in writingTools" :key="tool">
              {{ tool }}
            </div>
          </div>
        </div>

        <!-- Analysis Tools Column -->
        <div class="feature-column">
          <h3><i class="fas fa-chart-bar"></i> Overview & Analysis</h3>
          <div class="feature-items">
            <div class="feature-item" v-for="tool in analysisTools" :key="tool">
              {{ tool }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const aiModels = [
  'GPT-5', 'OpenAI o3', 'OpenAI od-mini', 'Gemini 2.5 Pro',
  'Claude 3.7 Sonnet', 'DeepSeek-R1', 'GPT-4o', 'DALL-E 3',
  'Stable Diffusion', 'Ideogram 2.0', 'Runway AI', 'Flux AI'
]

const imageTools = [
  'AI Image Generator', 'AI Image to Image', 'Background Remover',
  'AI Logo Generator', 'Image Restoration', 'Watermark Remover',
  'Stable Video Diffusion', 'Pika AI', 'Halluo AI'
]

const writingTools = [
  'AI Detector', 'Text Optimizer', 'Number Decoder',
  'ChatGPT Detector', 'Text Rewriter', 'AI Translator',
  'AI Mind Map', 'Audio to Text'
]

const analysisTools = [
  'YouTube Video Summarizer', 'Video Summary Generator',
  'AI Video Search', 'AI Resume Scanner', 'AI Resume Analyzer',
  'PDF OCR Tool', 'ChatPDF', 'PDF Translator'
]
</script>

<style scoped>
.feature-grid-section {
  padding: 80px 0;
  background: #f8fafc;
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

.features-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.feature-column {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.feature-column h3 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #374151;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
}

.feature-column h3 i {
  color: #667eea;
}

.feature-items {
  display: grid;
  gap: 0.75rem;
}

.feature-item {
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-radius: 8px;
  color: #4b5563;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.feature-item:hover {
  background: #667eea;
  color: white;
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .features-container {
    grid-template-columns: 1fr;
  }
}
</style>