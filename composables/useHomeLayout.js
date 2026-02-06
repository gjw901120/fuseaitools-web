import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export const useHomeLayout = () => {
  const router = useRouter()
  const route = useRoute()

  // API category -> 路由（历史记录点击跳转，仅用分类即可）
  const categoryToRoute = {
    'GPT': '/home/gpt',
    'DeepSeek': '/home/deepseek',
    'Deepseek': '/home/deepseek',
    'Claude': '/home/claude',
    'Gemini': '/home/gemini',
    'Veo3': '/home/veo3',
    'Runway': '/home/runway',
    'Luma': '/home/luma',
    'Midjourney': '/home/midjourney',
    'GPT 4o Image': '/home/gpt-4o-image',
    'Flux Kontext': '/home/flux-kontext',
    'Nano Banana': '/home/nano-banana',
    'Suno': '/home/suno',
    'Elevenlabs': '/home/elevenlabs',
    'ElevenLabs': '/home/elevenlabs',
    'Sora': '/home/sora'
  }

  // API category -> 类型（用于图标）
  const categoryToType = {
    'GPT': 'chat', 'DeepSeek': 'chat', 'Deepseek': 'chat', 'Claude': 'chat', 'Gemini': 'chat',
    'Veo3': 'video', 'Runway': 'video', 'Luma': 'video', 'Sora': 'video',
    'Midjourney': 'image', 'GPT 4o Image': 'image', 'Flux Kontext': 'image', 'Nano Banana': 'image',
    'Suno': 'audio', 'Elevenlabs': 'audio', 'ElevenLabs': 'audio'
  }

  // 工具名称到路由的映射（导航用）
  const toolRouteMap = {
    'Veo3': '/home/veo3',
    'Runway': '/home/runway',
    'Luma': '/home/luma',
    'Midjourney': '/home/midjourney',
    'GPT 4o Image': '/home/gpt-4o-image',
    'Flux Kontext': '/home/flux-kontext',
    'Nano Banana': '/home/nano-banana',
    'Elevenlabs': '/home/elevenlabs',
    'Suno': '/home/suno',
    'Sora': '/home/sora',
    // Chat tools
    'GPT': '/home/gpt',
    'Deepseek': '/home/deepseek',
    'Claude': '/home/claude',
    'Gemini': '/home/gemini'
  }

  // 响应式数据
  const selectedCategory = ref(1)
  const selectedTool = ref(1)

  // 分页相关（历史记录 10 条一页）
  const currentPage = ref(1)
  const itemsPerPage = 10
  const isLoading = ref(false)
  const historyHasMore = ref(true)

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

  // 当前显示的历史记录（来自 API：recordId, category, model, title, gtmCreated）
  const usageHistory = ref([])

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

  // 根据 category 取路由（历史项点击跳转；无 recordId 时只跳工具页）
  const getHistoryItemRoute = (record) => {
    const category = (record.category || record.toolName || '').trim()
    const path = categoryToRoute[category] || categoryToRoute[record.model]
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
    return {
      id: item.recordId,
      recordId: item.recordId,
      category: category,
      model: item.model,
      toolName: category,
      type,
      timestamp: item.gtmCreated,
      description: item.title != null ? String(item.title) : '',
      icon: getToolIcon(type),
      status: 'completed'
    }
  }

  const loadHistoryData = async () => {
    if (typeof window === 'undefined') return
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
      const errorCode = raw.errorCode ?? raw.error_code
      const data = raw.data
      const list = Array.isArray(data) ? data : []
      const mapped = list.map(mapHistoryItem)
      if (currentPage.value === 1) {
        usageHistory.value = mapped
      } else {
        usageHistory.value.push(...mapped)
      }
      historyHasMore.value = list.length >= itemsPerPage
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

  // 检查是否还有更多数据
  const hasMoreData = computed(() => historyHasMore.value)

  // 同步路由到选中状态
  const syncRouteToSelection = () => {
    const routeToToolMap = {
      '/home/veo3': 'Veo3',
      '/home/runway': 'Runway', 
      '/home/luma': 'Luma',
      '/home/midjourney': 'Midjourney',
      '/home/gpt-4o-image': 'GPT 4o Image',
      '/home/flux-kontext': 'Flux Kontext',
      '/home/nano-banana': 'Nano Banana',
      '/home/elevenlabs': 'Elevenlabs',
      '/home/suno': 'Suno',
      '/home/sora': 'Sora',
      '/home/gpt': 'GPT',
      '/home/deepseek': 'Deepseek',
      '/home/claude': 'Claude',
      '/home/gemini': 'Gemini'
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
      const newRecord = {
        id: Date.now(),
        toolName: tool.name,
        type: tool.type,
        timestamp: new Date(),
        duration: '0 minutes',
        status: 'in_progress',
        icon: getToolIcon(tool.type),
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
      router.replace('/home/gpt')
      return
    }
    syncRouteToSelection()
  }, { immediate: true })

  // 初始化选中的工具 + 拉取历史记录
  onMounted(() => {
    if (route.path === '/home') {
      router.replace('/home/gpt')
      return
    }
    const hasMatched = syncRouteToSelection()
    if (!hasMatched) {
      const gptTool = allTools.value.find(t => t.name === 'GPT')
      if (gptTool) {
        selectedTool.value = gptTool.id
        selectedCategory.value = navItems.value.find(nav => nav.type === 'chat')?.id || 2
        router.push('/home/gpt')
      } else {
        const tools = getCurrentTools()
        if (tools.length > 0) selectedTool.value = tools[0].id
      }
    }
    loadHistoryData()
  })

  return {
    route,
    selectedCategory,
    selectedTool,
    navItems,
    allTools,
    usageHistory,
    isLoading,
    hasMoreData,
    formatTime,
    getToolCount,
    getCurrentTools,
    getSelectedToolInfo,
    selectCategory,
    selectTool,
    loadMore,
    addToUsageHistory,
    getHistoryItemRoute,
    navigateToHistoryItem
  }
}


