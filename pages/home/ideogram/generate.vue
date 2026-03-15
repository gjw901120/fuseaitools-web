<template>
  <div></div>
</template>

<script setup>
// 重定向到第一个二级 tab，避免 /generate 与二级 tab 重复
await navigateTo('/home/ideogram/v3-text-to-image', { replace: true, redirectCode: 301 })
</script>
