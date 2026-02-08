<template>
  <div class="home-page">
    <!-- 主布局容器 -->
    <div class="main-layout">
      <!-- 左侧：AI工具使用历史记录（20%） -->
      <aside class="left-sidebar">
        <div class="timeline-header">
          <h3>History</h3>
        </div>
        
        <div class="timeline-container">
          <div class="timeline-items">
            <div class="timeline-item" v-for="(record, index) in usageHistory" :key="record.id">
              <div class="timeline-marker" :class="[record.status, record.type]">
                <i :class="record.icon"></i>
              </div>
              <div class="timeline-content">
                <div class="timeline-header">
                  <div class="timeline-tool">{{ record.toolName }}</div>
                </div>
                <div class="timeline-description">{{ record.description }}</div>
                <div class="timeline-meta">
                  <div class="timeline-time">{{ formatTime(record.timestamp) }}</div>
                  <div class="timeline-duration">{{ record.duration }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 加载更多按钮 -->
          <div class="load-more-container" v-if="hasMoreData">
            <button class="load-more-btn" @click="loadMore" :disabled="isLoading">
              <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-plus"></i>
              {{ isLoading ? '加载中...' : '加载更多' }}
            </button>
          </div>
          
          <!-- 空状态 -->
          <div v-if="usageHistory.length === 0" class="empty-timeline">
            <i class="fas fa-history"></i>
            <p>暂无使用记录</p>
          </div>
        </div>
      </aside>

      <!-- 右侧：工具导航和展示区域（80%） -->
      <main class="right-main">
        <!-- 上方：AI工具聚合导航（30%） -->
        <header class="tools-navigation">
          <div class="nav-tabs">
            <div 
              v-for="navItem in navItems" 
              :key="navItem.id"
              class="nav-tab"
              :class="{ active: selectedCategory === navItem.id }"
              @click="selectCategory(navItem.id)"
            >
              <i :class="navItem.icon"></i>
              <span>{{ navItem.name }}</span>
              <span class="tool-count">{{ getToolCount(navItem.type) }}</span>
            </div>
          </div>
          
          <!-- 二级导航：有路由的用 NuxtLink 保证可点击跳转（如 Luma） -->
          <div class="sub-nav" v-if="selectedCategory">
            <template v-for="subTool in getCurrentTools()" :key="subTool.id">
              <NuxtLink
                v-if="toolRouteMap[subTool.name]"
                :to="toolRouteMap[subTool.name]"
                class="sub-nav-item"
                :class="{ active: selectedTool === subTool.id }"
              >
                {{ subTool.name }}
              </NuxtLink>
              <div
                v-else
                class="sub-nav-item"
                :class="{ active: selectedTool === subTool.id }"
                @click="selectTool(subTool.id)"
              >
                {{ subTool.name }}
              </div>
            </template>
          </div>
        </header>

        <!-- 下方：工具界面（70%） -->
        <section class="tool-interface">
          <!-- Veo3 工具组件 -->
          <Veo3Tool v-if="getSelectedToolInfo().name === 'Veo3'" />
          
          <!-- Runway 工具组件 -->
          <RunwayTool v-else-if="getSelectedToolInfo().name === 'Runway'" />
          
          <!-- Luma 工具组件 -->
          <LumaTool v-else-if="getSelectedToolInfo().name === 'Luma'" />
          
          <!-- Midjourney 工具组件 -->
          <MidjourneyTool v-else-if="getSelectedToolInfo().name === 'Midjourney'" />
          
          <!-- GPT 4o Image 工具组件 -->
          <GPT4oImageTool v-else-if="getSelectedToolInfo().name === 'GPT 4o Image'" />
          
          <!-- Flux Kontext 工具组件 -->
          <FluxKontextTool v-else-if="getSelectedToolInfo().name === 'Flux Kontext'" />
          
          <!-- Nano Banana 工具组件 -->
          <NanoBananaTool v-else-if="getSelectedToolInfo().name === 'Nano Banana'" />
          
          <!-- ElevenLabs 工具组件 -->
          <ElevenLabsTool v-else-if="getSelectedToolInfo().name === 'Elevenlabs'" />
          
          <!-- Suno 工具组件 -->
          <SunoTool v-else-if="getSelectedToolInfo().name === 'Suno'" />
          
          <!-- Sora 工具组件 -->
          <SoraTool v-else-if="getSelectedToolInfo().name === 'Sora'" />
          
          <!-- 其他工具的聊天界面 -->
          <div v-else class="chat-interface">
            <div class="chat-header">
              <div class="chat-tool-info">
                <div class="tool-avatar">
                  <img :src="getSelectedToolInfo().icon" :alt="getSelectedToolInfo().name" />
                </div>
                <div class="tool-details">
                  <h3>{{ getSelectedToolInfo().name }}</h3>
                  <p>{{ getSelectedToolInfo().description }}</p>
                </div>
              </div>
            </div>
            
            <div class="chat-messages">
              <div class="message" v-for="message in chatMessages" :key="message.id" :class="message.role">
                <div class="message-avatar">
                  <img v-if="message.role === 'user'" src="https://via.placeholder.com/32x32/667eea/ffffff?text=U" alt="User" />
                  <img v-else :src="getSelectedToolInfo().icon" :alt="getSelectedToolInfo().name" />
                </div>
                <div class="message-content">
                  <div class="message-text">{{ message.text }}</div>
                  <div class="message-time">{{ formatTime(message.timestamp) }}</div>
                </div>
              </div>
            </div>
            
            <div class="chat-input">
              <div class="input-actions" v-if="isChatTool()">
                <button class="action-btn" @click="handleFileUpload" title="Upload File">
                  <i class="fas fa-paperclip"></i>
                </button>
                <button 
                  class="action-btn" 
                  :class="{ active: isWebSearchEnabled }"
                  @click="toggleWebSearch" 
                  title="Web Search"
                >
                  <i class="fas fa-globe"></i>
                </button>
                <div class="uploaded-files" v-if="uploadedFiles.length > 0">
                  <div 
                    class="file-item" 
                    v-for="(file, index) in uploadedFiles" 
                    :key="file.id"
                  >
                    <span class="file-name">{{ file.name }}</span>
                    <button class="file-delete-btn" @click="removeFile(index)" title="Delete File">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="input-container">
                <textarea 
                  v-model="inputMessage" 
                  placeholder="Enter your question or request..."
                  @keydown.enter.prevent="sendMessage"
                  rows="3"
                ></textarea>
                <button class="send-btn" @click="sendMessage" :disabled="!inputMessage.trim()">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
// 导入组件
import Veo3Tool from '~/components/tools/Veo3Tool.vue'
import RunwayTool from '~/components/tools/RunwayTool.vue'
import LumaTool from '~/components/tools/LumaTool.vue'
import MidjourneyTool from '~/components/tools/MidjourneyTool.vue'
import GPT4oImageTool from '~/components/tools/GPT4oImageTool.vue'
import NanoBananaTool from '~/components/tools/NanoBananaTool.vue'
import ElevenLabsTool from '~/components/tools/ElevenLabsTool.vue'
import FluxKontextTool from '~/components/tools/FluxKontextTool.vue'
import SunoTool from '~/components/tools/SunoTool.vue'
import SoraTool from '~/components/tools/SoraTool.vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { watch, provide, onMounted, onUnmounted, nextTick } from 'vue'

const router = useRouter()
const route = useRoute()

// 工具名称到路由的映射
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

// SEO优化
useHead({
  title: 'AI Tools Platform - FuseAI',
  meta: [
    { name: 'description', content: 'Discover and use the most advanced AI tools to enhance your work efficiency and creativity. Includes 500+ curated AI tools covering writing, design, programming, data analysis and more.' },
    { name: 'keywords', content: 'AI tools, artificial intelligence, AI applications, work efficiency, tool recommendations, FuseAI' }
  ]
})

// 响应式数据
const selectedCategory = ref(1)
const selectedTool = ref(1)

// 分页相关
const currentPage = ref(1)
const itemsPerPage = 10
const isLoading = ref(false)

// 聊天相关
const inputMessage = ref('')
const isWebSearchEnabled = ref(false)
const uploadedFiles = ref([])
const chatMessages = ref([])

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

// 所有历史记录数据
const allHistoryData = [
  {
    id: 1,
    toolName: 'ChatGPT',
    type: 'chat',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30分钟前
    duration: '15分钟',
    status: 'completed',
    icon: 'fas fa-comments',
    description: '对话生成 - 撰写产品介绍文案'
  },
  {
    id: 2,
    toolName: 'Midjourney',
    type: 'image',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2小时前
    duration: '8分钟',
    status: 'completed',
    icon: 'fas fa-image',
    description: '图像生成 - 创建品牌Logo设计'
  },
  {
    id: 3,
    toolName: 'ElevenLabs',
    type: 'audio',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5小时前
    duration: '12分钟',
    status: 'completed',
    icon: 'fas fa-microphone',
    description: '语音合成 - 制作播客介绍音频'
  },
  {
    id: 4,
    toolName: 'Runway ML',
    type: 'video',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1天前
    duration: '20分钟',
    status: 'completed',
    icon: 'fas fa-video',
    description: '视频编辑 - 制作产品演示视频'
  },
  {
    id: 5,
    toolName: 'Claude',
    type: 'chat',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2天前
    duration: '25分钟',
    status: 'completed',
    icon: 'fas fa-comments',
    description: '对话分析 - 分析用户反馈数据'
  },
  {
    id: 6,
    toolName: 'DALL-E 3',
    type: 'image',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3天前
    duration: '6分钟',
    status: 'completed',
    icon: 'fas fa-image',
    description: '图像创作 - 生成社交媒体配图'
  },
  {
    id: 7,
    toolName: 'Synthesia',
    type: 'video',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4天前
    duration: '18分钟',
    status: 'completed',
    icon: 'fas fa-video',
    description: 'AI视频生成 - 制作培训视频'
  },
  {
    id: 8,
    toolName: 'Murf AI',
    type: 'audio',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5天前
    duration: '10分钟',
    status: 'completed',
    icon: 'fas fa-microphone',
    description: '语音克隆 - 制作配音音频'
  },
  {
    id: 9,
    toolName: 'Jasper AI',
    type: 'chat',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6天前
    duration: '22分钟',
    status: 'completed',
    icon: 'fas fa-comments',
    description: '内容创作 - 撰写营销邮件'
  },
  {
    id: 10,
    toolName: 'Stable Diffusion',
    type: 'image',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7天前
    duration: '14分钟',
    status: 'completed',
    icon: 'fas fa-image',
    description: '图像生成 - 创建概念艺术图'
  },
  {
    id: 17,
    toolName: 'Descript',
    type: 'audio',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8天前
    duration: '16分钟',
    status: 'completed',
    icon: 'fas fa-microphone',
    description: '音频编辑 - 处理采访录音'
  },
  {
    id: 12,
    toolName: 'Luma AI',
    type: 'video',
    timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9天前
    duration: '12分钟',
    status: 'completed',
    icon: 'fas fa-video',
    description: '3D视频生成 - 制作产品展示'
  },
  {
    id: 13,
    toolName: 'Copy.ai',
    type: 'chat',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10天前
    duration: '8分钟',
    status: 'completed',
    icon: 'fas fa-comments',
    description: '文案生成 - 创建社交媒体内容'
  },
  {
    id: 14,
    toolName: 'Canva AI',
    type: 'image',
    timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000), // 11天前
    duration: '20分钟',
    status: 'completed',
    icon: 'fas fa-image',
    description: '设计生成 - 制作海报设计'
  },
  {
    id: 15,
    toolName: 'Podcastle',
    type: 'audio',
    timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12天前
    duration: '25分钟',
    status: 'completed',
    icon: 'fas fa-microphone',
    description: '播客制作 - 编辑播客节目'
  },
  {
    id: 16,
    toolName: 'InVideo',
    type: 'video',
    timestamp: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000), // 13天前
    duration: '30分钟',
    status: 'completed',
    icon: 'fas fa-video',
    description: '视频制作 - 创建宣传视频'
  }
]

// 当前显示的历史记录
const usageHistory = ref([])

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
    description: 'OpenAI的图像生成模型',
    icon: '/tools-logo/ChatGpt.png',
    rating: 4.7,
    usageCount: 750
  },
  {
    id: 7,
    name: 'Flux Kontext',
    type: 'image',
    description: '高质量图像生成模型',
    icon: '/tools-logo/FluxKontext.png',
    rating: 4.6,
    usageCount: 850
  },
  {
    id: 8,
    name: 'Nano Banana',
    type: 'image',
    description: '轻量级图像生成工具',
    icon: '/tools-logo/NanoBanana.png',
    rating: 4.5,
    usageCount: 560
  },
  
  // Audio 工具
  {
    id: 10,
    name: 'Suno',
    type: 'audio',
    description: 'AI音乐生成工具',
    icon: '/tools-logo/suno.png',
    rating: 4.8,
    usageCount: 780
  },
  {
    id: 11,
    name: 'Elevenlabs',
    type: 'audio',
    description: 'AI语音合成工具',
    icon: '/tools-logo/Elevenlabs.png',
    rating: 4.8,
    usageCount: 920
  },
  
  // Video 工具
  {
    id: 12,
    name: 'Veo3',
    type: 'video',
    description: 'Google的AI视频生成工具',
    icon: '/tools-logo/Veo.png',
    rating: 4.8,
    usageCount: 890
  },
  {
    id: 13,
    name: 'Runway',
    type: 'video',
    description: 'AI视频编辑工具',
    icon: '/tools-logo/Runway.png',
    rating: 4.7,
    usageCount: 720
  },
  {
    id: 14,
    name: 'Luma',
    type: 'video',
    description: '3D视频生成工具',
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
  },
  {
    id: 15,
    name: 'Midjourney',
    type: 'image',
    description: 'AI图像生成平台',
    icon: '/tools-logo/Midjourney.png',
    rating: 4.8,
    usageCount: 1200
  }
])

// 方法
const formatTime = (timestamp) => {
  const now = new Date()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (days > 0) return `${days}天前`
  if (hours > 0) return `${hours}小时前`
  if (minutes > 0) return `${minutes}分钟前`
  return '刚刚'
}

const getTypeLabel = (type) => {
  const typeLabels = {
    chat: '对话',
    image: '图像',
    audio: '音频',
    video: '视频'
  }
  return typeLabels[type] || type
}

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  // 重置选中的工具为第一个
  const tools = getCurrentTools()
  selectedTool.value = tools.length > 0 ? tools[0].id : null

  // 根据一级分类切换到该分类的默认工具路由
  const selectedNav = navItems.value.find(nav => nav.id === categoryId)
  if (!selectedNav) return

  const defaultToolByCategory = {
    chat: 'GPT',
    image: 'GPT 4o Image'
    // 其他分类可按需追加，如：audio/video
  }

  const defaultToolName = defaultToolByCategory[selectedNav.type]
  if (defaultToolName && toolRouteMap[defaultToolName]) {
    const defaultTool = allTools.value.find(t => t.name === defaultToolName)
    if (defaultTool) {
      selectedTool.value = defaultTool.id
      router.push(toolRouteMap[defaultToolName])
    }
  } else if (tools.length > 0) {
    // 若没有定义默认映射，则跳转到该分类下第一个工具
    const firstTool = tools[0]
    if (firstTool && toolRouteMap[firstTool.name]) {
      router.push(toolRouteMap[firstTool.name])
    }
  }
}

const selectTool = (toolId) => {
  selectedTool.value = toolId
  
  // 更新路由
  const tool = allTools.value.find(t => t.id === toolId)
  if (tool && toolRouteMap[tool.name]) {
    router.push(toolRouteMap[tool.name])
  }
}

// 添加到history（仅在真正使用工具时调用）
const addToUsageHistory = (toolName) => {
  const tool = allTools.value.find(t => t.name === toolName)
  if (tool) {
    const getToolIcon = (type) => {
      const icons = {
        chat: 'fas fa-comments',
        image: 'fas fa-image',
        audio: 'fas fa-microphone',
        video: 'fas fa-video'
      }
      return icons[type] || 'fas fa-robot'
    }
    
    const newRecord = {
      id: Date.now(),
      toolName: tool.name,
      type: tool.type,
      timestamp: new Date(),
      duration: '0分钟',
      status: 'in_progress',
      icon: getToolIcon(tool.type),
      description: `${getTypeLabel(tool.type)}处理 - 正在使用${tool.name}`
    }
    
    usageHistory.value.unshift(newRecord)
    
    // 同步聊天消息区域高度（历史记录变化时）
    syncChatMessagesHeight()
    
    // 模拟使用完成（3秒后）
    setTimeout(() => {
      const record = usageHistory.value.find(r => r.id === newRecord.id)
      if (record) {
        record.status = 'completed'
        record.duration = '3分钟'
        record.description = `${getTypeLabel(tool.type)}完成 - 使用${tool.name}处理任务`
      }
      // 完成后再次同步高度
      syncChatMessagesHeight()
    }, 3000)
    
    // 增加使用次数
    tool.usageCount++
  }
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

// 判断是否是chat工具（GPT/Deepseek/Claude/Gemini）
const isChatTool = () => {
  const tool = getSelectedToolInfo()
  const chatToolNames = ['GPT', 'Deepseek', 'Claude', 'Gemini']
  return chatToolNames.includes(tool.name)
}

// 处理文件上传
const handleFileUpload = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.accept = '*/*'
  input.onchange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      // 将文件添加到列表中
      files.forEach(file => {
        uploadedFiles.value.push({
          id: Date.now() + Math.random(),
          name: file.name,
          file: file,
          size: file.size
        })
      })
      console.log('上传文件:', files)
      // TODO: 实现文件上传到服务器的逻辑
    }
  }
  input.click()
}

// 删除文件
const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
}

// 切换联网搜索
const toggleWebSearch = () => {
  isWebSearchEnabled.value = !isWebSearchEnabled.value
  console.log('联网搜索:', isWebSearchEnabled.value ? '已启用' : '已禁用')
}

// 动态设置聊天消息区域高度，使其与左侧history底部对齐
const syncChatMessagesHeight = () => {
  nextTick(() => {
    const timelineContainer = document.querySelector('.timeline-container')
    const chatMessages = document.querySelector('.chat-messages')
    
    if (timelineContainer && chatMessages) {
      const timelineHeight = timelineContainer.offsetHeight
      chatMessages.style.maxHeight = `${timelineHeight}px`
    }
  })
}

// 自动滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    const messagesContainer = document.querySelector('.chat-messages')
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  })
}

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return
  
  // 添加用户消息
  const userMessage = {
    id: Date.now(),
    role: 'user',
    text: inputMessage.value,
    timestamp: new Date()
  }
  chatMessages.value.push(userMessage)
  
  const userInput = inputMessage.value
  inputMessage.value = ''
  
  // 同步高度并滚动到底部
  syncChatMessagesHeight()
  scrollToBottom()
  
  // 模拟AI回复
  setTimeout(() => {
    const assistantMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      text: generateAIResponse(userInput),
      timestamp: new Date()
    }
    chatMessages.value.push(assistantMessage)
    // AI回复后也同步高度并滚动到底部
    syncChatMessagesHeight()
    scrollToBottom()
  }, 1000)
}

const generateAIResponse = (userInput) => {
  const responses = [
    'That\'s a great question! Let me help you analyze it.',
    'Based on your needs, I suggest you could consider the following aspects...',
    'I understand your thoughts. Here are some suggestions for your reference.',
    'This is an interesting topic! Let me explain it in detail for you.',
    'Based on my knowledge, I can provide the following information...'
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}


const clearHistory = () => {
  usageHistory.value = []
  currentPage.value = 1
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
  
  // 模拟加载延迟
  await new Promise(resolve => setTimeout(resolve, 800))
  
  currentPage.value++
  loadHistoryData()
  
  isLoading.value = false
  
  // 加载更多后同步高度
  syncChatMessagesHeight()
}

// 检查是否还有更多数据
const hasMoreData = computed(() => {
  return (currentPage.value * itemsPerPage) < allHistoryData.length
})

// 初始化加载数据
loadHistoryData()

// 监听路由变化，同步侧边栏导航状态
watch(() => route.path, (newPath) => {
  // 如果访问的是 /home，默认跳转到 /home/gpt/generate
  if (newPath === '/home') {
    router.replace('/home/gpt/generate')
    return
  }
  
  // 根据路由路径找到对应的工具
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
    // Chat tools
    '/home/gpt': 'GPT',
    '/home/gpt/generate': 'GPT',
    '/home/deepseek': 'Deepseek',
    '/home/deepseek/generate': 'Deepseek',
    '/home/claude': 'Claude',
    '/home/claude/generate': 'Claude',
    '/home/gemini': 'Gemini',
    '/home/gemini/generate': 'Gemini'
  }
  
  const toolName = routeToToolMap[newPath]
  if (toolName) {
    const tool = allTools.value.find(t => t.name === toolName)
    if (tool) {
      selectedTool.value = tool.id
      // 设置对应的分类
      const toolType = tool.type
      const navItem = navItems.value.find(nav => nav.type === toolType)
      if (navItem) {
        selectedCategory.value = navItem.id
      }
    }
  }
  
  // 路由变化后同步高度
  syncChatMessagesHeight()
}, { immediate: true })

// 初始化选中的工具
onMounted(() => {
  const tools = getCurrentTools()
  if (tools.length > 0) {
    selectedTool.value = tools[0].id
  }
  
  // 同步聊天消息区域高度
  syncChatMessagesHeight()
  
  // 监听窗口大小变化
  window.addEventListener('resize', syncChatMessagesHeight)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('resize', syncChatMessagesHeight)
})

// 提供给子组件使用
provide('addToUsageHistory', addToUsageHistory)
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #f8fafc;
  margin: 0;
  padding: 0;
  overflow: visible;
}

/* 主布局容器 */
.main-layout {
  display: flex;
  min-height: 100vh;
  height: 100vh;
  margin-top: 0;
  overflow: hidden;
}

/* 左侧边栏 - 20% */
.left-sidebar {
  width: 20%;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
}

.timeline-header {
  padding: 10px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8fafc;
  text-align: center;
  border-radius: 8px;
}

.timeline-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #334155;
  text-align: center;
  width: 100%;
}

.timeline-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.timeline-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.timeline-items {
  flex: 1;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  position: relative;
}

.timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 16px;
  top: 40px;
  width: 2px;
  height: calc(100% + 20px);
  background: #e2e8f0;
}

.timeline-marker {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
  font-size: 14px;
}

.timeline-marker.completed {
  background: #10b981;
  color: white;
}

.timeline-marker.in_progress {
  background: #f59e0b;
  color: white;
  animation: pulse 2s infinite;
}

/* 不同类型的时间线标记颜色 */
.timeline-marker.chat {
  background: #3b82f6;
}

.timeline-marker.image {
  background: #8b5cf6;
}

.timeline-marker.audio {
  background: #f59e0b;
}

.timeline-marker.video {
  background: #ef4444;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.timeline-content {
  flex: 1;
  min-width: 0;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
}

.timeline-tool {
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
}


.timeline-description {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
  line-height: 1.4;
}

.timeline-meta {
  display: flex;
  gap: 12px;
  font-size: 11px;
  color: #94a3b8;
}

.timeline-time {
  font-weight: 500;
}

.timeline-duration {
  font-weight: 500;
}

.load-more-container {
  padding: 20px 0;
  border-top: 1px solid #e2e8f0;
  margin-top: auto;
}

.load-more-btn {
  width: 100%;
  padding: 12px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.load-more-btn:hover:not(:disabled) {
  background: #5a6fd8;
  transform: translateY(-1px);
}

.load-more-btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
  transform: none;
}

.load-more-btn i {
  font-size: 12px;
}

.empty-timeline {
  text-align: center;
  padding: 40px 20px;
  color: #64748b;
}

.empty-timeline i {
  font-size: 2rem;
  margin-bottom: 12px;
  opacity: 0.5;
}

/* 右侧主区域 - 80% */
.right-main {
  width: 80%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
  min-height: 0;
  height: 100vh;
}

/* 工具导航区域 - 自适应高度 */
.tools-navigation {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  min-height: fit-content;
  max-height: 40%;
  overflow-y: auto;
}

.nav-tabs {
  display: flex;
  padding: 20px 20px 0;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: #64748b;
  flex: 1;
  justify-content: center;
  min-width: 0;
}

.nav-tab:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.nav-tab.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.nav-tab i {
  font-size: 16px;
}

.tool-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
}

.sub-nav {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 16px 20px 20px;
  gap: 8px;
  align-content: start;
}

.sub-nav-item {
  padding: 8px 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
  color: #64748b;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  display: inline-block;
}

.sub-nav-item:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.sub-nav-item.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}



/* 工具界面 - 占据剩余空间 */
.tool-interface {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  min-height: 0;
  height: 100%;
  overflow: hidden;
}

/* 聊天界面 - 占据剩余空间 */
.chat-interface {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  min-height: 0;
  height: 100%;
  overflow: hidden;
}

.chat-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  flex-shrink: 0;
}

.chat-tool-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tool-avatar {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
}

.tool-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tool-details h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.tool-details p {
  margin: 0;
  font-size: 12px;
  color: #64748b;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px 20px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  max-height: 100%;
}

.chat-messages:empty {
  padding-bottom: 16px;
}

.message {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.message-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  max-width: 70%;
  background: #f8fafc;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.message.user .message-content {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.message-text {
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 4px;
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
}

.chat-input {
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
  flex-shrink: 0;
}

.input-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  align-items: center;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #334155;
}

.action-btn.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.action-btn.active:hover {
  background: #5a6fd8;
  border-color: #5a6fd8;
}

.action-btn i {
  font-size: 16px;
}

.uploaded-files {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 4px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 13px;
  color: #334155;
}

.file-name {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 3px;
}

.file-delete-btn:hover {
  background: #fee2e2;
  color: #ef4444;
}

.file-delete-btn i {
  font-size: 11px;
}

.input-container {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.input-container textarea {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
  outline: none;
  transition: border-color 0.2s ease;
  font-family: inherit;
}

.input-container textarea:focus {
  border-color: #667eea;
}

.send-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #667eea;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-btn:hover:not(:disabled) {
  background: #5a6fd8;
  transform: translateY(-1px);
}

.send-btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
  transform: none;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-layout {
    flex-direction: column;
    height: 100vh;
  }
  
  .left-sidebar {
    width: 100%;
    height: 300px;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
    min-height: 300px;
  }
  
  .right-main {
    width: 100%;
    min-height: 0;
    height: calc(100vh - 300px);
    flex: 1;
  }
  
  .tools-navigation {
    max-height: 35%;
  }
  
  .chat-interface {
    height: 100%;
  }
}

@media (max-width: 1200px) {
  .sub-nav {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 900px) {
  .sub-nav {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .nav-tabs {
    flex-direction: column;
    gap: 4px;
  }
  
  .nav-tab {
    justify-content: center;
    flex: none;
  }
  
  .sub-nav {
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
  }
  
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .tool-card {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .tool-meta {
    justify-content: center;
  }
}
</style>
