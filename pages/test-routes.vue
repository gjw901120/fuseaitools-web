<template>
  <div class="test-page">
    <h1>路由测试页面</h1>
    <div class="test-links">
      <a href="/home/elevenlabs" class="test-link">ElevenLabs 主页</a>
      <a href="/home/elevenlabs/multilingual-v2" class="test-link">ElevenLabs Multilingual v2</a>
      <a href="/home/elevenlabs/turbo-2-5" class="test-link">ElevenLabs Turbo 2.5</a>
      <a href="/home/nano-banana" class="test-link">Nano Banana 主页</a>
      <a href="/home/gpt-4o-image" class="test-link">GPT 4o Image 主页</a>
    </div>
  </div>
</template>

<script setup>
// SEO 优化
useHead({
  title: 'Route Testing - FuseAI Tools',
  meta: [
    {
      name: 'description',
      content: 'Test whether all tool routing functions work properly.'
    }
  ]
})
</script>

<style scoped>
.test-page {
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
}

.test-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
}

.test-link {
  display: inline-block;
  padding: 12px 24px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  text-decoration: none;
  color: #374151;
  transition: all 0.3s ease;
}

.test-link:hover {
  background: #e2e8f0;
  border-color: #8b5cf6;
  color: #8b5cf6;
}
</style>






