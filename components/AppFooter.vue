<template>
  <footer class="app-footer">
    <div class="simply-container">
      <div class="footer-content">
        <!-- Left Section - Company Info -->
        <div class="footer-section">
          <div class="logo">
            <i class="fas fa-robot"></i>
            <span>SimplyAI</span>
          </div>
          <p class="company-description">
            Your intelligent AI assistant for work, learning, and creativity.
            Powered by advanced artificial intelligence technology.
          </p>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <div class="copyright">
            <p>&copy; 2025 BUTTERFLY EFFECT PTE. LTD. All rights reserved.</p>
            <p class="trademark">
              CHATGPT is a registered trademark of OPENAI OPCO, LLC.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.app-footer {
  background: #f8fafc;
  color: #374151;
  padding: 60px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 1rem;
}

.logo i {
  font-size: 1.8rem;
}

.company-description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.footer-links-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.footer-links-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
}

.footer-link {
  color: #6b7280;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.9rem;
  white-space: nowrap;
}

.footer-link:hover {
  color: #667eea;
}

.footer-bottom {
  border-top: 1px solid #e5e7eb;
  padding-top: 20px;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright p {
  color: #6b7280;
  font-size: 0.85rem;
  margin: 0;
}

.trademark {
  font-size: 0.8rem !important;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .footer-links-row {
    gap: 1rem;
  }

  .footer-bottom-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>