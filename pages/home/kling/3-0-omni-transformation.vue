<template>
  <HomeLayout currentPath="/home/kling/3-0-omni-transformation" :showAllTools="false">
    <template #hero>
      <div class="kling-page-shell">
        <KlingTool />
        <Kling30OmniTransformationSeoContent />
      </div>
    </template>
  </HomeLayout>
</template>

<script setup>
import KlingTool from '~/components/tools/KlingTool.vue'
import Kling30OmniTransformationSeoContent from '~/components/tools/Kling30OmniTransformationSeoContent.vue'

defineProps({
  publicAgent: { type: Object, default: null },
})

const { fetchSEOData } = useApi()
const route = useRoute()

const { data: seoData } = await useAsyncData(
  `seo-kling-3-0-omni-transformation-${route.path}`,
  () => fetchSEOData(route.path, { forceLocal: true }),
  { default: () => null, watch: [() => route.path] },
)

useToolSEOAsync(seoData, () => ({
  title: 'Kling 3.0 Omni Video Transformation — Transform Existing Video with 720p / 1080p / 4K',
  description: 'Kling 3.0 Omni Video Transformation turns one uploaded source video into a new clip from a text prompt, with optional reference images. Billing follows the actual uploaded video length, with 720p, 1080p and 4K output.',
  keywords: ['Kling 3.0 Omni video transformation', 'Kling video to video', 'AI video restyle', 'Kling 4K video', 'FuseAI'],
  ogImage: '/logo-wide.png',
  priceFromApi: { modelKey: 'kling-3.0-omni-transformation', fallback: 'Custom' },
}))
</script>

<style scoped>
.kling-page-shell {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
