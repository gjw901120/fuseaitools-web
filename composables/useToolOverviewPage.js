import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { toolOverviews } from '~/data/toolOverviews.js'

/** 概览页 key -> logo 路径（与 useHomeLayout 中 categoryToLogo 对应） */
const OVERVIEW_KEY_TO_LOGO = {
  gpt: '/tools-logo/ChatGpt.png',
  deepseek: '/tools-logo/Deepseek.png',
  claude: '/tools-logo/Claude.png',
  gemini: '/tools-logo/Gemini.png',
  'gpt-4o-image': '/tools-logo/ChatGPT4OImage.png',
  'flux-kontext': '/tools-logo/FluxKontext.png',
  'nano-banana': '/tools-logo/NanoBanana.png',
  midjourney: '/tools-logo/Midjourney.png',
  seedream: '/tools-logo/Seedream.png',
  qwen: '/tools-logo/QWen.png',
  suno: '/tools-logo/suno.png',
  elevenlabs: '/tools-logo/Elevenlabs.png',
  veo3: '/tools-logo/Veo.png',
  runway: '/tools-logo/Runway.png',
  luma: '/tools-logo/Luma.png',
  sora: '/tools-logo/sora.png',
  wan: '/tools-logo/Wan.png',
  seedance: '/tools-logo/Seedance.png'
}

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
  const overviewConfig = computed(() => {
    const key = overviewKey.value
    if (!key) return null
    const config = toolOverviews[key] || null
    if (!config) return null
    const logo = OVERVIEW_KEY_TO_LOGO[key]
    return logo ? { ...config, logo } : config
  })
  return { isOverviewPage, overviewConfig }
}
