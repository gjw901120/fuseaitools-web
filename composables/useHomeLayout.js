import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export const useHomeLayout = () => {
  const router = useRouter()
  const route = useRoute()

  // 工具名称到路由的映射
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

  // 分页相关
  const currentPage = ref(1)
  const itemsPerPage = 10
  const isLoading = ref(false)

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

  // 所有历史记录数据
  const allHistoryData = [
    {
      id: 1,
      toolName: 'ChatGPT',
      type: 'chat',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      duration: '15 minutes',
      status: 'completed',
      icon: 'fas fa-comments',
      description: 'Chat generation - Write product introduction copy'
    },
    {
      id: 2,
      toolName: 'Midjourney',
      type: 'image',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      duration: '8分钟',
      status: 'completed',
      icon: 'fas fa-image',
      description: 'Image generation - Create brand logo design'
    },
    {
      id: 3,
      toolName: 'ElevenLabs',
      type: 'audio',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      duration: '12分钟',
      status: 'completed',
      icon: 'fas fa-microphone',
      description: 'Voice synthesis - Create podcast introduction audio'
    },
    {
      id: 4,
      toolName: 'Runway ML',
      type: 'video',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      duration: '20分钟',
      status: 'completed',
      icon: 'fas fa-video',
      description: 'Video editing - Create product demo video'
    },
    {
      id: 5,
      toolName: 'Claude',
      type: 'chat',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      duration: '25 minutes',
      status: 'completed',
      icon: 'fas fa-comments',
      description: 'Chat analysis - Analyze user feedback data'
    },
    {
      id: 6,
      toolName: 'GPT 4o Image',
      type: 'image',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      duration: '10 minutes',
      status: 'completed',
      icon: 'fas fa-image',
      description: 'Image generation - Create product promotional image'
    },
    {
      id: 7,
      toolName: 'Suno',
      type: 'audio',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      duration: '18 minutes',
      status: 'completed',
      icon: 'fas fa-microphone',
      description: 'Music generation - Create background music'
    },
    {
      id: 8,
      toolName: 'Veo3',
      type: 'video',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      duration: '22 minutes',
      status: 'completed',
      icon: 'fas fa-video',
      description: 'Video generation - Create product demo video'
    },
    {
      id: 9,
      toolName: 'Deepseek',
      type: 'chat',
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      duration: '12分钟',
      status: 'completed',
      icon: 'fas fa-comments',
      description: 'Chat generation - Code review and optimization'
    },
    {
      id: 10,
      toolName: 'Flux Kontext',
      type: 'image',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      duration: '14 minutes',
      status: 'completed',
      icon: 'fas fa-image',
      description: 'Image generation - Create concept art'
    },
    {
      id: 11,
      toolName: 'Luma',
      type: 'video',
      timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      duration: '16 minutes',
      status: 'completed',
      icon: 'fas fa-video',
      description: '3D video generation - Create product showcase'
    },
    {
      id: 12,
      toolName: 'Gemini',
      type: 'chat',
      timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
      duration: '8分钟',
      status: 'completed',
      icon: 'fas fa-comments',
      description: 'Chat analysis - Analyze market trends'
    },
    {
      id: 13,
      toolName: 'Nano Banana',
      type: 'image',
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      duration: '6 minutes',
      status: 'completed',
      icon: 'fas fa-image',
      description: 'Image generation - Quick icon generation'
    },
    {
      id: 14,
      toolName: 'Sora',
      type: 'video',
      timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      duration: '20分钟',
      status: 'completed',
      icon: 'fas fa-video',
      description: 'Video generation - Create promotional video'
    },
    {
      id: 15,
      toolName: 'ChatGPT',
      type: 'chat',
      timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      duration: '30 minutes',
      status: 'completed',
      icon: 'fas fa-comments',
      description: 'Chat generation - Write technical documentation'
    }
  ]

  // 当前显示的历史记录
  const usageHistory = ref([])

  // 方法
  const formatTime = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    
    if (days > 0) return `${days} days ago`
    if (hours > 0) return `${hours} hours ago`
    if (minutes > 0) return `${minutes} minutes ago`
    return 'Just now'
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

  const selectCategory = (categoryId) => {
    selectedCategory.value = categoryId
    const tools = getCurrentTools()
    selectedTool.value = tools.length > 0 ? tools[0].id : null

    const selectedNav = navItems.value.find(nav => nav.id === categoryId)
    if (!selectedNav) return

    const defaultToolByCategory = {
      chat: 'GPT',
      image: 'GPT 4o Image',
      audio: 'Suno',
      video: 'Veo3'
    }

    const defaultToolName = defaultToolByCategory[selectedNav.type]
    if (defaultToolName && toolRouteMap[defaultToolName]) {
      const defaultTool = allTools.value.find(t => t.name === defaultToolName)
      if (defaultTool) {
        selectedTool.value = defaultTool.id
        router.push(toolRouteMap[defaultToolName])
      }
    } else if (tools.length > 0) {
      const firstTool = tools[0]
      if (firstTool && toolRouteMap[firstTool.name]) {
        router.push(toolRouteMap[firstTool.name])
      }
    }
  }

  const selectTool = (toolId) => {
    selectedTool.value = toolId
    
    const tool = allTools.value.find(t => t.id === toolId)
    if (tool && toolRouteMap[tool.name]) {
      router.push(toolRouteMap[tool.name])
    }
  }

  // 加载历史记录数据
  const loadHistoryData = () => {
    const startIndex = (currentPage.value - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const newData = allHistoryData.slice(startIndex, endIndex)
    
    if (currentPage.value === 1) {
      usageHistory.value = newData
    } else {
      usageHistory.value.push(...newData)
    }
  }

  // 加载更多数据
  const loadMore = async () => {
    if (isLoading.value) return
    
    isLoading.value = true
    
    await new Promise(resolve => setTimeout(resolve, 800))
    
    currentPage.value++
    loadHistoryData()
    
    isLoading.value = false
  }

  // 检查是否还有更多数据
  const hasMoreData = computed(() => {
    return (currentPage.value * itemsPerPage) < allHistoryData.length
  })

  // 初始化加载数据
  loadHistoryData()

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

  // 初始化选中的工具（仅在路由中没有匹配的工具时设置默认值）
  onMounted(() => {
    // 如果访问的是 /home，默认跳转到 /home/gpt
    if (route.path === '/home') {
      router.replace('/home/gpt')
      return
    }
    
    const hasMatched = syncRouteToSelection()
    if (!hasMatched) {
      // 默认选择 GPT 工具
      const gptTool = allTools.value.find(t => t.name === 'GPT')
      if (gptTool) {
        selectedTool.value = gptTool.id
        selectedCategory.value = navItems.value.find(nav => nav.type === 'chat')?.id || 2
        router.push('/home/gpt')
      } else {
        const tools = getCurrentTools()
        if (tools.length > 0) {
          selectedTool.value = tools[0].id
        }
      }
    }
  })

  return {
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
    addToUsageHistory
  }
}


