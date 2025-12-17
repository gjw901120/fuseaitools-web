<template>
  <div class="tool-page">
    <ClientOnly>
      <SoraTool />
      <template #fallback>
        <div style="padding: 20px; text-align: center;">Loading Sora Tool...</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import SoraTool from '~/components/tools/SoraTool.vue'

useHead({
  title: 'Sora - Video Generation | SimplyAI Tools',
  meta: [
    { name: 'description', content: 'Sora 2 text-to-video and image-to-video generation. Control aspect ratio, frames, quality, and watermark options.' },
    { name: 'keywords', content: 'Sora, text-to-video, image-to-video, AI video generation' }
  ]
})
</script>

<style scoped>
.tool-page {
  width: 100%;
  height: 100vh;
}
</style>


