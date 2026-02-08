import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useState } from 'nuxt/app'

export const useHomeLayout = () => {
  const router = useRouter()
  const route = useRoute()

  // API category -> 路由（历史记录点击跳转，仅用分类即可）
  const categoryToRoute = {
    'GPT': '/home/gpt/generate',
    'DeepSeek': '/home/deepseek/generate',
    'Deepseek': '/home/deepseek/generate',
    'Claude': '/home/claude/generate',
    'Gemini': '/home/gemini/generate',
    'Veo3': '/home/veo3/text-to-video',
    'Runway': '/home/runway/generate',
    'Luma': '/home/luma/generate',
    'Midjourney': '/home/midjourney/imagine',
    'GPT 4o Image': '/home/gpt-4o-image/generate',
    'Flux Kontext': '/home/flux-kontext/generate',
    'Nano Banana': '/home/nano-banana/generate',
    'Suno': '/home/suno/generate',
    'Elevenlabs': '/home/elevenlabs/multilingual-v2',
    'ElevenLabs': '/home/elevenlabs/multilingual-v2',
    'Sora': '/home/sora/text-to-video'
  }

  // API category -> 类型（用于图标）
  const categoryToType = {
    'GPT': 'chat', 'DeepSeek': 'chat', 'Deepseek': 'chat', 'Claude': 'chat', 'Gemini': 'chat',
    'Veo3': 'video', 'Runway': 'video', 'Luma': 'video', 'Sora': 'video',
    'Midjourney': 'image', 'GPT 4o Image': 'image', 'Flux Kontext': 'image', 'Nano Banana': 'image',
    'Suno': 'audio', 'Elevenlabs': 'audio', 'ElevenLabs': 'audio'
  }

  // API category -> public/tools-logo 图标路径（History 下方展示）
  const categoryToLogo = {
    'GPT': '/tools-logo/ChatGpt.png',
    'DeepSeek': '/tools-logo/Deepseek.png',
    'Deepseek': '/tools-logo/Deepseek.png',
    'Claude': '/tools-logo/Claude.png',
    'Gemini': '/tools-logo/Gemini.png',
    'Veo3': '/tools-logo/Veo.png',
    'Runway': '/tools-logo/Runway.png',
    'Luma': '/tools-logo/Luma.png',
    'Sora': '/tools-logo/sora.png',
    'Midjourney': '/tools-logo/Midjourney.png',
    'GPT 4o Image': '/tools-logo/ChatGpt.png',
    'Flux Kontext': '/tools-logo/FluxKontext.png',
    'Nano Banana': '/tools-logo/NanoBanana.png',
    'Suno': '/tools-logo/suno.png',
    'Elevenlabs': '/tools-logo/Elevenlabs.png',
    'ElevenLabs': '/tools-logo/Elevenlabs.png'
  }

  // 工具名称到路由的映射（导航用）
  const toolRouteMap = {
    'Veo3': '/home/veo3/text-to-video',
    'Runway': '/home/runway/generate',
    'Luma': '/home/luma/generate',
    'Midjourney': '/home/midjourney/imagine',
    'GPT 4o Image': '/home/gpt-4o-image/generate',
    'Flux Kontext': '/home/flux-kontext/generate',
    'Nano Banana': '/home/nano-banana/generate',
    'Elevenlabs': '/home/elevenlabs/multilingual-v2',
    'Suno': '/home/suno/generate',
    'Sora': '/home/sora/text-to-video',
    // Chat tools
    'GPT': '/home/gpt/generate',
    'Deepseek': '/home/deepseek/generate',
    'Claude': '/home/claude/generate',
    'Gemini': '/home/gemini/generate'
  }

  // 响应式数据
  const selectedCategory = ref(1)
  const selectedTool = ref(1)

  // 分页相关（历史记录 10 条一页）；与 lastHistoryLoadAt 一致用 useState，切换 tab 不丢数据、不重复请求
  const currentPage = useState('home-history-current-page', () => 1)
  const itemsPerPage = 10
  const isLoading = ref(false)
  const historyHasMore = useState('home-history-has-more', () => true)

  // 导航项目
  const navItems = ref([
    {
      id: 1,
      name: 'All',
      type: 'all',
      icon: 'fas fa-th'
    },
    {
      id: 2,
      name: 'Chat',
      type: 'chat',
      icon: 'fas fa-comments'
    },
    {
      id: 3,
      name: 'Image',
      type: 'image',
      icon: 'fas fa-image'
    },
    {
      id: 4,
      name: 'Audio',
      type: 'audio',
      icon: 'fas fa-microphone'
    },
    {
      id: 5,
      name: 'Video',
      type: 'video',
      icon: 'fas fa-video'
    }
  ])

  // 所有工具数据
  const allTools = ref([
    // Chat 工具
    {
      id: 1,
      name: 'GPT',
      type: 'chat',
      description: 'OpenAI conversational AI assistant',
      icon: '/tools-logo/ChatGpt.png',
      rating: 4.9,
      usageCount: 1250
    },
    {
      id: 2,
      name: 'Deepseek',
      type: 'chat',
      description: 'DeepSeek AI assistant',
      icon: '/tools-logo/Deepseek.png',
      rating: 4.8,
      usageCount: 890
    },
    {
      id: 3,
      name: 'Claude',
      type: 'chat',
      description: 'Anthropic AI assistant',
      icon: '/tools-logo/Claude.png',
      rating: 4.8,
      usageCount: 980
    },
    {
      id: 4,
      name: 'Gemini',
      type: 'chat',
      description: 'Google AI assistant',
      icon: '/tools-logo/Gemini.png',
      rating: 4.7,
      usageCount: 680
    },
    // Image 工具
    {
      id: 6,
      name: 'GPT 4o Image',
      type: 'image',
      description: 'OpenAI image generation model',
      icon: '/tools-logo/ChatGpt.png',
      rating: 4.7,
      usageCount: 750
    },
    {
      id: 7,
      name: 'Flux Kontext',
      type: 'image',
      description: 'High-quality image generation model',
      icon: '/tools-logo/FluxKontext.png',
      rating: 4.6,
      usageCount: 850
    },
    {
      id: 8,
      name: 'Nano Banana',
      type: 'image',
      description: 'Lightweight image generation tool',
      icon: '/tools-logo/NanoBanana.png',
      rating: 4.5,
      usageCount: 560
    },
    {
      id: 15,
      name: 'Midjourney',
      type: 'image',
      description: 'AI image generation platform',
      icon: '/tools-logo/Midjourney.png',
      rating: 4.8,
      usageCount: 1200
    },
    // Audio 工具
    {
      id: 10,
      name: 'Suno',
      type: 'audio',
      description: 'AI music generation tool',
      icon: '/tools-logo/suno.png',
      rating: 4.8,
      usageCount: 780
    },
    {
      id: 11,
      name: 'Elevenlabs',
      type: 'audio',
      description: 'AI voice synthesis tool',
      icon: '/tools-logo/Elevenlabs.png',
      rating: 4.8,
      usageCount: 920
    },
    // Video 工具
    {
      id: 12,
      name: 'Veo3',
      type: 'video',
      description: 'Google AI video generation tool',
      icon: '/tools-logo/Veo.png',
      rating: 4.8,
      usageCount: 650
    },
    {
      id: 13,
      name: 'Runway',
      type: 'video',
      description: 'AI video editing tool',
      icon: '/tools-logo/Runway.png',
      rating: 4.7,
      usageCount: 720
    },
    {
      id: 14,
      name: 'Luma',
      type: 'video',
      description: '3D video generation tool',
      icon: '/tools-logo/Luma.png',
      rating: 4.6,
      usageCount: 650
    },
    {
      id: 16,
      name: 'Sora',
      type: 'video',
      description: 'Sora 2 视频生成（Text-to-Video / Image-to-Video）',
      icon: '/tools-logo/Veo.png',
      rating: 4.7,
      usageCount: 0
    }
  ])

  // 当前显示的历史记录（来自 API）；useState 保证切换 tab 后仍显示已加载列表，无需重复请求
  const usageHistory = useState('home-history-list', () => [])

  // 状态机：上次成功加载 list 的时间戳，10 分钟内仅「刷新」「加载更多」会再次请求（useState 保证跨页面/remount 唯一）
  const lastHistoryLoadAt = useState('home-history-last-load-at', () => 0)
  const HISTORY_COOLDOWN_MS = 10 * 60 * 1000

  // 方法：24 小时内显示相对时间（如 21 hours ago），超过 24 小时显示实际时间
  const formatTime = (timestamp) => {
    if (!timestamp) return ''
    const date = typeof timestamp === 'string' ? new Date(timestamp.replace(' ', 'T')) : timestamp
    if (Number.isNaN(date.getTime())) return ''
    const now = new Date()
    const diff = now - date
    const oneDayMs = 24 * 60 * 60 * 1000
    if (diff >= oneDayMs) {
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    }
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    if (hours > 0) return `${hours} hour${hours === 1 ? '' : 's'} ago`
    if (minutes > 0) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
    return 'Just now'
  }

  // model -> 路由（History 详情用；多 Tab 工具按 model 区分到对应 Tab 路由）
  const modelToPath = {
    // Midjourney（二级路由）
    midjourney_imagine: '/home/midjourney/imagine',
    midjourney_upscale: '/home/midjourney/upscale',
    midjourney_vary: '/home/midjourney/vary',
    // Nano Banana（三级路由）
    'nano-banana': '/home/nano-banana/generate',
    'nano-banana-edit': '/home/nano-banana/edit',
    'nano-banana-pro': '/home/nano-banana/pro-generate',
    // Suno（三级路由）
    suno_generate: '/home/suno/generate',
    suno_extend: '/home/suno/extend',
    suno_upload_cover: '/home/suno/upload-cover',
    suno_upload_extend: '/home/suno/upload-extend',
    suno_add_instrumental: '/home/suno/add-instrumental',
    suno_add_vocals: '/home/suno/add-vocals',
    // Runway（三级路由）
    runway_generate: '/home/runway/generate',
    runway_extend: '/home/runway/extend',
    runway_aleph: '/home/runway/aleph',
    // Veo3（三级路由）
    veo3: '/home/veo3/text-to-video',
    veo3_fast: '/home/veo3/text-to-video',
    text_2_video: '/home/veo3/text-to-video',
    first_and_last_frames_2_video: '/home/veo3/first-and-last-to-video',
    reference_2_video: '/home/veo3/reference-to-video',
    veo3_extend: '/home/veo3/extend',
    video_extend: '/home/veo3/extend',
    // Sora（二级路由，model 与定价 key 对应）
    'sora-2-text-to-video': '/home/sora/text-to-video',
    'sora-2-image-to-video': '/home/sora/image-to-video',
    'sora-2-pro-text-to-video': '/home/sora/pro-text-to-video',
    'sora-2-pro-image-to-video': '/home/sora/pro-image-to-video',
    'sora-watermark-remover': '/home/sora/watermark-remover',
    'sora-2-pro-storyboard': '/home/sora/pro-storyboard',
    // ElevenLabs（三级路由）
    elevenlabs_text_to_speech_multilingual: '/home/elevenlabs/multilingual-v2',
    elevenlabs_text_to_speech_turbo: '/home/elevenlabs/turbo-2-5',
    elevenlabs_speech_to_text: '/home/elevenlabs/speech-to-text',
    elevenlabs_sound_effect: '/home/elevenlabs/sound-effect-v2',
    elevenlabs_audio_isolation: '/home/elevenlabs/audio-isolation'
  }

  // 根据 category/model 取路由（历史项点击跳转；无 recordId 时只跳工具页）
  const getHistoryItemRoute = (record) => {
    const category = (record.category || record.toolName || '').trim()
    const model = (record.model || '').trim().toLowerCase()
    let path = model && modelToPath[model]
      ? modelToPath[model]
      : (categoryToRoute[category] || categoryToRoute[record.model] || null)
    if (!path) {
      if (model.startsWith('midjourney_')) path = '/home/midjourney/imagine'
      else if (model.startsWith('elevenlabs_')) path = '/home/elevenlabs/multilingual-v2'
      else if (model.startsWith('veo3') || model.includes('_2_video') || model === 'video_extend') path = '/home/veo3/text-to-video'
      else if (model.startsWith('sora')) path = '/home/sora/text-to-video'
      else path = categoryToRoute[category] || null
    }
    if (!path) return null
    const recordId = record.recordId || (typeof record.id === 'string' ? record.id : null)
    if (!recordId) return path
    return `${path}?record-id=${encodeURIComponent(recordId)}`
  }

  const navigateToHistoryItem = (record) => {
    const path = getHistoryItemRoute(record)
    if (path) router.push(path)
  }

  const getToolCount = (type) => {
    if (type === 'all') {
      return allTools.value.length
    }
    return allTools.value.filter(tool => tool.type === type).length
  }

  const getCurrentTools = () => {
    const selectedNav = navItems.value.find(nav => nav.id === selectedCategory.value)
    if (!selectedNav) return []
    
    if (selectedNav.type === 'all') {
      return allTools.value
    }
    
    return allTools.value.filter(tool => tool.type === selectedNav.type)
  }

  const getSelectedToolInfo = () => {
    const tool = allTools.value.find(t => t.id === selectedTool.value)
    return tool || allTools.value[0]
  }

  const selectCategory = async (categoryId) => {
    selectedCategory.value = categoryId
    const tools = getCurrentTools()
    const selectedNav = navItems.value.find(nav => nav.id === categoryId)
    if (!selectedNav) return

    const defaultToolByCategory = {
      chat: 'GPT',
      image: 'GPT 4o Image',
      audio: 'Suno',
      video: 'Veo3'
    }

    const defaultToolName = defaultToolByCategory[selectedNav.type]
    const defaultTool = defaultToolName ? allTools.value.find(t => t.name === defaultToolName) : null
    const targetTool = defaultTool || (tools.length > 0 ? tools[0] : null)
    const targetPath = targetTool && toolRouteMap[targetTool.name] ? toolRouteMap[targetTool.name] : null

    selectedTool.value = targetTool ? targetTool.id : (tools.length > 0 ? tools[0].id : null)

    if (targetPath) {
      try {
        await router.push(targetPath)
      } catch (e) {
        if (e?.name !== 'NavigationDuplicated' && e?.name !== 'NavigationAborted') throw e
      }
    }
  }

  const selectTool = async (toolId) => {
    const tool = allTools.value.find(t => t.id === toolId)
    if (!tool || !toolRouteMap[tool.name]) return
    const targetPath = toolRouteMap[tool.name]
    selectedTool.value = toolId
    try {
      await router.push(targetPath)
    } catch (e) {
      if (e?.name !== 'NavigationDuplicated' && e?.name !== 'NavigationAborted') throw e
    }
  }

  // 从 API 加载历史记录（10 条一页）
  const getAuthToken = () => {
    if (typeof window === 'undefined') return null
    try {
      const { token } = useAuth()
      if (token?.value) return token.value
      return localStorage.getItem('auth_token')
    } catch {
      return localStorage.getItem('auth_token')
    }
  }

  const mapHistoryItem = (item) => {
    const category = (item.category || '').trim()
    const type = categoryToType[category] || 'chat'
    const logoUrl = categoryToLogo[category]
    return {
      id: item.recordId,
      recordId: item.recordId,
      category: category,
      model: item.model,
      toolName: category,
      type,
      timestamp: item.gtmCreated,
      description: item.title != null ? String(item.title) : '',
      icon: logoUrl || getToolIcon(type),
      iconIsImage: !!logoUrl,
      status: 'completed'
    }
  }

  const loadHistoryData = async (forceReload = false) => {
    if (typeof window === 'undefined') return
    // 10 分钟内：仅「刷新」或「加载更多」可请求；首次加载或 tab 切换不再重复请求
    const isFirstPage = currentPage.value === 1
    if (!forceReload && isFirstPage && lastHistoryLoadAt.value > 0 && (Date.now() - lastHistoryLoadAt.value < HISTORY_COOLDOWN_MS)) {
      return
    }
    isLoading.value = true
    try {
      const url = `/api/records/list?page=${currentPage.value}&size=${itemsPerPage}`
      const headers = { Accept: 'application/json' }
      const token = getAuthToken()
      if (token) headers['Authorization'] = `Bearer ${token}`
      const response = await fetch(url, { method: 'GET', headers, credentials: 'include' })
      const raw = await response.json().catch(() => null)
      if (!raw || typeof raw !== 'object') {
        historyHasMore.value = false
        return
      }
      const data = raw.data
      const list = Array.isArray(data) ? data : []
      const mapped = list.map(mapHistoryItem)
      if (isFirstPage) {
        usageHistory.value = mapped
      } else {
        usageHistory.value.push(...mapped)
      }
      historyHasMore.value = list.length >= itemsPerPage
      // 仅在第一页加载或刷新时更新计时，加载更多不重置 10 分钟
      if (isFirstPage) lastHistoryLoadAt.value = Date.now()
    } catch (e) {
      console.error('Load history failed:', e)
      historyHasMore.value = false
    } finally {
      isLoading.value = false
    }
  }

  // 加载更多数据
  const loadMore = async () => {
    if (isLoading.value || !historyHasMore.value) return
    currentPage.value++
    await loadHistoryData()
  }

  // 刷新历史：重置到第一页并强制重新请求（绕过 10 分钟冷却），请求成功后重置计时
  const refreshHistory = async () => {
    currentPage.value = 1
    await loadHistoryData(true)
  }

  // 检查是否还有更多数据
  const hasMoreData = computed(() => historyHasMore.value)

  // 同步路由到选中状态
  const syncRouteToSelection = () => {
    const routeToToolMap = {
      '/home/veo3': 'Veo3',
      '/home/veo3/text-to-video': 'Veo3',
      '/home/veo3/first-and-last-to-video': 'Veo3',
      '/home/veo3/reference-to-video': 'Veo3',
      '/home/veo3/extend': 'Veo3',
      '/home/runway': 'Runway',
      '/home/runway/generate': 'Runway',
      '/home/runway/extend': 'Runway',
      '/home/runway/aleph': 'Runway',
      '/home/luma': 'Luma',
      '/home/luma/generate': 'Luma',
      '/home/midjourney': 'Midjourney',
      '/home/midjourney/imagine': 'Midjourney',
      '/home/midjourney/upscale': 'Midjourney',
      '/home/midjourney/vary': 'Midjourney',
      '/home/gpt-4o-image': 'GPT 4o Image',
      '/home/gpt-4o-image/generate': 'GPT 4o Image',
      '/home/flux-kontext': 'Flux Kontext',
      '/home/flux-kontext/generate': 'Flux Kontext',
      '/home/nano-banana': 'Nano Banana',
      '/home/nano-banana/generate': 'Nano Banana',
      '/home/nano-banana/edit': 'Nano Banana',
      '/home/nano-banana/pro-generate': 'Nano Banana',
      '/home/elevenlabs': 'Elevenlabs',
      '/home/elevenlabs/multilingual-v2': 'Elevenlabs',
      '/home/elevenlabs/turbo-2-5': 'Elevenlabs',
      '/home/elevenlabs/speech-to-text': 'Elevenlabs',
      '/home/elevenlabs/sound-effect-v2': 'Elevenlabs',
      '/home/elevenlabs/audio-isolation': 'Elevenlabs',
      '/home/suno': 'Suno',
      '/home/suno/generate': 'Suno',
      '/home/suno/extend': 'Suno',
      '/home/suno/upload-cover': 'Suno',
      '/home/suno/upload-extend': 'Suno',
      '/home/suno/add-instrumental': 'Suno',
      '/home/suno/add-vocals': 'Suno',
      '/home/sora': 'Sora',
      '/home/sora/text-to-video': 'Sora',
      '/home/sora/image-to-video': 'Sora',
      '/home/sora/pro-text-to-video': 'Sora',
      '/home/sora/pro-image-to-video': 'Sora',
      '/home/sora/watermark-remover': 'Sora',
      '/home/sora/pro-storyboard': 'Sora',
      '/home/gpt': 'GPT',
      '/home/gpt/generate': 'GPT',
      '/home/deepseek': 'Deepseek',
      '/home/deepseek/generate': 'Deepseek',
      '/home/claude': 'Claude',
      '/home/claude/generate': 'Claude',
      '/home/gemini': 'Gemini',
      '/home/gemini/generate': 'Gemini'
    }
    
    const toolName = routeToToolMap[route.path]
    if (toolName) {
      const tool = allTools.value.find(t => t.name === toolName)
      if (tool) {
        selectedTool.value = tool.id
        const toolType = tool.type
        const navItem = navItems.value.find(nav => nav.type === toolType)
        if (navItem) {
          selectedCategory.value = navItem.id
        }
        return true
      }
    }
    return false
  }

  // 获取工具类型标签
  const getTypeLabel = (type) => {
    const labels = {
      chat: 'Chat',
      image: 'Image',
      audio: 'Audio',
      video: 'Video'
    }
    return labels[type] || 'Tool'
  }

  // 获取工具图标
  const getToolIcon = (type) => {
    const icons = {
      chat: 'fas fa-comments',
      image: 'fas fa-image',
      audio: 'fas fa-microphone',
      video: 'fas fa-video'
    }
    return icons[type] || 'fas fa-robot'
  }

  // 添加到history（仅在真正使用工具时调用）
  const addToUsageHistory = (toolName) => {
    const tool = allTools.value.find(t => t.name === toolName)
    if (tool) {
      const logoUrl = categoryToLogo[tool.name] || (typeof tool.icon === 'string' && tool.icon.startsWith('/') ? tool.icon : null)
      const newRecord = {
        id: Date.now(),
        toolName: tool.name,
        type: tool.type,
        timestamp: new Date(),
        duration: '0 minutes',
        status: 'in_progress',
        icon: logoUrl || getToolIcon(tool.type),
        iconIsImage: !!logoUrl,
        description: `${getTypeLabel(tool.type)} processing - Using ${tool.name}`
      }
      
      usageHistory.value.unshift(newRecord)
      
      // 模拟使用完成（3秒后）
      setTimeout(() => {
        const record = usageHistory.value.find(r => r.id === newRecord.id)
        if (record) {
          record.status = 'completed'
          record.duration = '3 minutes'
          record.description = `${getTypeLabel(tool.type)} completed - Used ${tool.name} to process task`
        }
      }, 3000)
      
      // 增加使用次数
      tool.usageCount++
    }
  }

  // 监听路由变化，同步侧边栏导航状态
  watch(() => route.path, (newPath) => {
    // 如果访问的是 /home，默认跳转到 /home/gpt
    if (newPath === '/home') {
      router.replace('/home/gpt/generate')
      return
    }
    syncRouteToSelection()
  }, { immediate: true })

  // 初始化选中的工具 + 仅首次进入 home 时拉取历史（tab 切换不重复请求）
  onMounted(() => {
    if (route.path === '/home') {
      router.replace('/home/gpt/generate')
    } else {
      const hasMatched = syncRouteToSelection()
      if (!hasMatched) {
        const gptTool = allTools.value.find(t => t.name === 'GPT')
        if (gptTool) {
          selectedTool.value = gptTool.id
          selectedCategory.value = navItems.value.find(nav => nav.type === 'chat')?.id || 2
          router.push('/home/gpt/generate')
        } else {
          const tools = getCurrentTools()
          if (tools.length > 0) selectedTool.value = tools[0].id
        }
      }
    }
    // 10 分钟内且已有列表数据时，不再请求（避免「加载更多」后 currentPage=2 导致冷却判断被绕过）
    const inCooldown = lastHistoryLoadAt.value > 0 && (Date.now() - lastHistoryLoadAt.value < HISTORY_COOLDOWN_MS)
    if (inCooldown && usageHistory.value.length > 0) return
    loadHistoryData()
  })

  return {
    route,
    selectedCategory,
    selectedTool,
    navItems,
    allTools,
    usageHistory,
    toolRouteMap,
    isLoading,
    hasMoreData,
    formatTime,
    getToolCount,
    getCurrentTools,
    getSelectedToolInfo,
    selectCategory,
    selectTool,
    loadMore,
    refreshHistory,
    addToUsageHistory,
    getHistoryItemRoute,
    navigateToHistoryItem
  }
}


