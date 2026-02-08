<template>
  <ToolOverview v-if="isOverviewPage && overviewConfig" :config="overviewConfig" />
  <NuxtPage v-else />
</template>

<script setup>
import { useToolOverviewPage } from '~/composables/useToolOverviewPage'
const { isOverviewPage, overviewConfig } = useToolOverviewPage()
</script>
