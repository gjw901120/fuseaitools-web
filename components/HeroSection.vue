<template>
  <section class="hero-section">
    <div class="simply-container">
      <div class="hero-content">
        <div class="hero-text">
          <div class="hero-badge">AI Tools Free</div>
          <h1 class="hero-title">
            All-in-One AI Platform
            <span class="gradient-text">50+ AI Models & Tools Free</span>
          </h1>
          <p class="hero-description">
            Access over 50 AI models and tools in one platform—Chat, Image, Audio, and Video. Everything you need to work smarter.
          </p>
          <p class="hero-credits">
            <strong>Register now and get <span class="credits-highlight">100 credits free</span>.</strong> No credit card required.
          </p>
          <div class="hero-actions">
            <button class="btn-primary" @click="startFreeTrial">
              Get 100 Free Credits
            </button>
            <button class="btn-secondary" @click="exploreProducts">
              Explore AI Tools Free
            </button>
          </div>
          <div class="hero-features">
            <div class="feature-pill feature-pill-free" @click="goToHome">
              <i class="fas fa-gift"></i>
              AI Tools Free
            </div>
            <div class="feature-pill" @click="goToHome">
              <i class="fas fa-brain"></i>
              50+ AI Models
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="ai-demo-window">
            <div class="window-header">
              <div class="window-controls">
                <span class="control red"></span>
                <span class="control yellow"></span>
                <span class="control green"></span>
              </div>
              <div class="window-title">FuseAI Chat</div>
            </div>
            <div class="chat-messages">
              <div class="message user-message">
                <div class="avatar">👤</div>
                <div class="content">Can you help me write a Python function to calculate factorial?</div>
              </div>
              <div class="message ai-message">
                <div class="avatar">🤖</div>
                <div class="content">
                  <pre><code>def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)</code></pre>
                </div>
              </div>
              <div class="message user-message">
                <div class="avatar">👤</div>
                <div class="content">Great! Can you add error handling?</div>
              </div>
            </div>
            <div class="chat-input">
              <input type="text" placeholder="Ask me anything..." v-model="userInput" @keyup.enter="sendMessage" />
              <button class="send-btn" @click="sendMessage">
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const router = useRouter()
const userInput = ref('')

const startFreeTrial = () => {
  router.push('/pricing')
}

const exploreProducts = () => {
  router.push('/home')
}

const goToHome = () => {
  router.push('/home')
}

const sendMessage = () => {
  if (userInput.value.trim()) {
    // Handle sending message logic
    console.log('Sending message:', userInput.value)
    userInput.value = ''
  }
}
</script>

<style scoped>
.hero-section {
  padding: 100px 0 80px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  border-radius: 9999px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.3rem;
  color: #4b5563;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.hero-credits {
  font-size: 1.15rem;
  color: #374151;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.credits-highlight {
  color: #667eea;
  font-weight: 800;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.btn-primary, .btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: white;
  color: #4b5563;
  border: 2px solid #e5e7eb;
}

.btn-secondary:hover {
  border-color: #667eea;
  color: #667eea;
}

.hero-features {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.feature-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
}

.feature-pill:hover {
  background: rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}

.feature-pill i {
  font-size: 0.8rem;
}

.feature-pill-free {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  border-color: rgba(102, 126, 234, 0.4);
  font-weight: 700;
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.ai-demo-window {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 400px;
}

.window-header {
  background: #f8fafc;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.window-controls {
  display: flex;
  gap: 0.5rem;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.control.red { background: #f87171; }
.control.yellow { background: #fbbf24; }
.control.green { background: #10b981; }

.window-title {
  font-weight: 600;
  color: #4b5563;
}

.chat-messages {
  padding: 1rem;
  height: 300px;
  overflow-y: auto;
}

.message {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.user-message {
  flex-direction: row-reverse;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.user-message .avatar {
  background: #667eea;
  color: white;
}

.ai-message .avatar {
  background: #10b981;
  color: white;
}

.message .content {
  background: #f8fafc;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  max-width: 80%;
}

.user-message .content {
  background: #667eea;
  color: white;
}

pre {
  margin: 0;
  font-size: 0.8rem;
  background: #1a1a1a;
  color: #f8fafc;
  padding: 0.75rem;
  border-radius: 8px;
  overflow-x: auto;
}

.chat-input {
  display: flex;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  gap: 0.5rem;
}

.chat-input input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
}

.chat-input input:focus {
  border-color: #667eea;
}

.send-btn {
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  width: 44px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.send-btn:hover {
  background: #5a6fd8;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-features {
    justify-content: center;
  }
}
</style>