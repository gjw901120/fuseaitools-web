import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { toolOverviews } from '~/data/toolOverviews.js'

/**
 * 在工具父级页面使用（如 runway.vue、suno.vue）。
 * 当访问 /home/{tool} 时显示概览页，访问 /home/{tool}/xxx 时显示子页 NuxtPage。
 */
export function useToolOverviewPage() {
  const route = useRoute()
  const pathNormalized = computed(() => (route.path || '').replace(/\/$/, ''))
  const overviewKey = computed(() => {
    const match = pathNormalized.value.match(/^\/home\/([^/]+)$/)
    return match ? match[1] : null
  })
  const isOverviewPage = computed(() => !!overviewKey.value)
  const overviewConfig = computed(() =>
    overviewKey.value ? toolOverviews[overviewKey.value] || null : null
  )
  return { isOverviewPage, overviewConfig }
}
