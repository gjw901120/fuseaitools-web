<template>
  <div class="product-dropdown">
    <div class="dropdown-content">
      <!-- Left Column - Applications -->
      <div class="dropdown-column">
        <h3 class="column-title">
          <i class="fas fa-rocket"></i>
          Applications
        </h3>
        <div class="application-list">
          <div class="application-item">
            <div class="app-icon">
              <i class="fab fa-chrome"></i>
            </div>
            <div class="app-info">
              <h4>Browser Extension</h4>
              <p>Support Chrome & Edge</p>
            </div>
          </div>

          <div class="application-item">
            <div class="app-icon">
              <i class="fas fa-desktop"></i>
            </div>
            <div class="app-info">
              <h4>Desktop App</h4>
              <p>Support Windows & Mac</p>
            </div>
          </div>

          <div class="application-item">
            <div class="app-icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <div class="app-info">
              <h4>Mobile App</h4>
              <p>Support Android & iOS</p>
            </div>
          </div>

          <div class="application-item featured">
            <div class="app-icon">
              <i class="fas fa-code"></i>
            </div>
            <div class="app-info">
              <h4>SimplyAI Code</h4>
              <p>Programming assistant for VSCode and JetBrains</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Middle Columns - AI Models & Tools -->
      <div class="dropdown-column">
        <h3 class="column-title">
          <i class="fas fa-brain"></i>
          AI Models
        </h3>
        <div class="model-list">
          <div class="model-item" v-for="model in aiModels" :key="model">
            <i class="fas fa-microchip"></i>
            <span>{{ model }}</span>
          </div>
        </div>
      </div>

      <div class="dropdown-column">
        <h3 class="column-title">
          <i class="fas fa-image"></i>
          Image Tools
        </h3>
        <div class="tool-list">
          <div class="tool-item" v-for="tool in imageTools" :key="tool">
            <i class="fas fa-wand-magic-sparkles"></i>
            <span>{{ tool }}</span>
          </div>
        </div>
      </div>

      <!-- Right Columns - PDF & Writing Tools -->
      <div class="dropdown-column">
        <h3 class="column-title">
          <i class="fas fa-file-pdf"></i>
          PDF Tools
        </h3>
        <div class="tool-list">
          <div class="tool-item" v-for="tool in pdfTools" :key="tool">
            <i class="fas fa-file-contract"></i>
            <span>{{ tool }}</span>
          </div>
        </div>
      </div>

      <div class="dropdown-column">
        <h3 class="column-title">
          <i class="fas fa-pen"></i>
          Writing Tools
        </h3>
        <div class="tool-list">
          <div class="tool-item" v-for="tool in writingTools" :key="tool">
            <i class="fas fa-edit"></i>
            <span>{{ tool }}</span>
          </div>
        </div>
      </div>

      <div class="dropdown-column">
        <h3 class="column-title">
          <i class="fas fa-chart-bar"></i>
          Analysis Tools
        </h3>
        <div class="tool-list">
          <div class="tool-item" v-for="tool in analysisTools" :key="tool">
            <i class="fas fa-chart-line"></i>
            <span>{{ tool }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="dropdown-footer">
      <div class="footer-content">
        <div class="footer-text">
          <h4>Start Creating with AI</h4>
          <p>Access all tools with one subscription</p>
        </div>
        <button class="cta-button">
          Get Started Free
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const aiModels = [
  'GPT-5',
  'OpenAI o3',
  'Gemini 2.5 Pro',
  'Claude 3.7 Sonnet',
  'Kling AI',
  'Polverse AI',
  'DeepSeek-R1',
  'GPT-4o'
]

const imageTools = [
  'AI Image Generator',
  'AI Image to Image',
  'AI Background Remover',
  'AI Watermark Tool',
  'AI Logo Generator',
  'Image Restoration'
]

const pdfTools = [
  'ChatPDF',
  'PDF Translator',
  'PDF to PNG',
  'PDF to PPT',
  'AI Resume Scanner',
  'AI Resume Analyzer'
]

const writingTools = [
  'AI Detector',
  'AI Text Optimizer',
  'AI Number Decoder',
  'AI Translator',
  'Text Rewriter',
  'Audio to Text'
]

const analysisTools = [
  'YouTube Video Summarizer',
  'AI Video Summary',
  'Summary Generator',
  'AI Podcast Generator',
  'AI Mind Map',
  'Audio Transcription'
]
</script>

<style scoped>
.product-dropdown {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.dropdown-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr 1fr;
  gap: 0;
  padding: 2rem;
}

.dropdown-column {
  padding: 0 1rem;
  border-right: 1px solid #f3f4f6;
}

.dropdown-column:last-child {
  border-right: none;
}

.column-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f3f4f6;
}

.column-title i {
  color: #667eea;
  font-size: 1.1rem;
}

/* Applications Styles */
.application-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.application-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.application-item:hover {
  background: #f8fafc;
  transform: translateX(5px);
}

.application-item.featured {
  background: linear-gradient(135deg, #667eea10, #764ba210);
  border: 1px solid #667eea20;
}

.app-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #667eea;
  border-radius: 10px;
  color: white;
  font-size: 1.2rem;
}

.app-info h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.25rem 0;
}

.app-info p {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0;
}

/* Model & Tool Lists */
.model-list,
.tool-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.model-item,
.tool-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #4b5563;
  transition: all 0.2s ease;
  cursor: pointer;
}

.model-item:hover,
.tool-item:hover {
  background: #667eea;
  color: white;
  transform: translateX(3px);
}

.model-item i,
.tool-item i {
  font-size: 0.8rem;
  width: 16px;
  text-align: center;
}

/* Dropdown Footer */
.dropdown-footer {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-top: 1px solid #e5e7eb;
  padding: 1.5rem 2rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-text h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.25rem 0;
}

.footer-text p {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

.cta-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .dropdown-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .dropdown-column {
    border-right: none;
    padding: 0;
  }
}

@media (max-width: 768px) {
  .dropdown-content {
    grid-template-columns: 1fr;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>