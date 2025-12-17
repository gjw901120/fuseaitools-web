<template>
  <div class="tool-page">
    <div class="chat-header">
      <div class="chat-tool-info">
        <div class="tool-avatar">
          <img src="/tools-logo/Deepseek.png" alt="Deepseek" />
        </div>
        <div class="tool-details">
          <h3>Deepseek</h3>
          <p>DeepSeek AI assistant</p>
        </div>
      </div>
    </div>
    <div class="chat-body">
      <div class="placeholder">Chat interface coming soon...</div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Deepseek - Chat | SimplyAI Tools'
})
</script>

<style scoped>
.tool-page { width: 100%; min-height: 100vh; background: #fff; }
.chat-header { padding: 16px 20px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; }
.chat-tool-info { display: flex; align-items: center; gap: 12px; }
.tool-avatar { width: 40px; height: 40px; border-radius: 8px; overflow: hidden; }
.tool-avatar img { width: 100%; height: 100%; object-fit: cover; }
.tool-details h3 { margin: 0; font-size: 16px; font-weight: 600; color: #1e293b; }
.tool-details p { margin: 0; font-size: 12px; color: #64748b; }
.chat-body { padding: 24px; }
.placeholder { color: #64748b; text-align: center; padding: 40px 0; }
</style>


