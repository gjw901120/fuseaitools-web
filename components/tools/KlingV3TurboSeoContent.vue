<template>
  <ToolSeoContent :data="seo" />
</template>

<script setup>
// SEO 内容本体在 data/seo/kling-v3-turbo.js，模板由 ToolSeoContent 统一渲染
import ToolSeoContent from '~/components/tools/ToolSeoContent.vue'
import seo from '~/data/seo/kling-v3-turbo.js'
</script>

<style src="~/assets/css/tool-seo-content.css"></style>
