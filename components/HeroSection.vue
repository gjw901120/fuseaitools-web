<template>
  <section class="hero-section">
    <div class="simply-container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            All-in-One AI Platform
            <span class="gradient-text">100+ AI Models & Tools Free</span>
          </h1>
          <p class="hero-description">
            Access over 100 AI models and tools in one platform—Chat, Image, Audio, and Video. Everything you need to work smarter.
          </p>
          <p class="hero-credits">
            <strong>Register now and get <span class="credits-highlight">77 credits free</span>.</strong> No credit card required.
          </p>
          <div class="hero-actions">
            <button class="btn-primary" @click="startFreeTrial">
              Get 77 Free Credits
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
              100+ AI Models
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
  background: var(--flux-bg);
  background-image:
    radial-gradient(ellipse 80% 50% at 50% -20%, hsla(173, 80%, 40%, 0.12), transparent),
    radial-gradient(ellipse 60% 40% at 100% 50%, hsla(200, 90%, 42%, 0.08), transparent);
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--flux-foreground);
}

.gradient-text {
  background: var(--flux-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.3rem;
  color: var(--flux-muted);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.hero-credits {
  font-size: 1.15rem;
  color: var(--flux-muted);
  margin-bottom: 2rem;
  line-height: 1.5;
}

.credits-highlight {
  color: var(--flux-primary);
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
  background: var(--flux-gradient);
  color: var(--flux-foreground);
  box-shadow: 0 4px 20px var(--flux-primary-glow);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px var(--flux-primary-glow);
}

.btn-secondary {
  background: transparent;
  color: var(--flux-muted);
  border: 1px solid var(--flux-border);
}

.btn-secondary:hover {
  border-color: var(--flux-primary);
  color: var(--flux-primary);
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
  background: var(--flux-primary-muted);
  border: 1px solid hsla(173, 80%, 40%, 0.25);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--flux-primary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.feature-pill:hover {
  background: hsla(173, 80%, 40%, 0.22);
  border-color: hsla(173, 80%, 40%, 0.4);
  transform: translateY(-2px);
}

.feature-pill i {
  font-size: 0.8rem;
}

.feature-pill-free {
  background: hsla(173, 80%, 40%, 0.18);
  border-color: hsla(173, 80%, 40%, 0.35);
  font-weight: 700;
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.ai-demo-window {
  background: var(--flux-card);
  border-radius: 16px;
  box-shadow: 0 20px 60px hsla(0, 0%, 0%, 0.4);
  border: 1px solid var(--flux-border);
  overflow: hidden;
  width: 100%;
  max-width: 400px;
}

.window-header {
  background: var(--flux-bg-elevated);
  padding: 1rem;
  border-bottom: 1px solid var(--flux-border);
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
  color: var(--flux-muted);
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
  background: var(--flux-primary);
  color: var(--flux-foreground);
}

.ai-message .avatar {
  background: var(--flux-success);
  color: var(--flux-foreground);
}

.message .content {
  background: var(--flux-bg-elevated);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  max-width: 80%;
  color: var(--flux-muted);
}

.user-message .content {
  background: var(--flux-primary);
  color: var(--flux-foreground);
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
  border-top: 1px solid var(--flux-border);
  gap: 0.5rem;
}

.chat-input input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--flux-border);
  border-radius: 8px;
  outline: none;
  background: var(--flux-input-bg);
  color: var(--flux-foreground);
}

.chat-input input:focus {
  border-color: var(--flux-primary);
}

.send-btn {
  background: var(--flux-primary);
  color: var(--flux-foreground);
  border: none;
  border-radius: 8px;
  width: 44px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.send-btn:hover {
  background: var(--flux-primary-hover);
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