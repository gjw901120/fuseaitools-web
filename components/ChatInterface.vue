<template>
  <div class="chat-interface">
    <div class="chat-header">
      <div class="chat-tool-info">
        <div class="tool-avatar">
          <img :src="toolIcon" :alt="toolName" />
        </div>
        <div class="tool-details">
          <h3>{{ toolName }}</h3>
          <p>{{ toolDescription }}</p>
        </div>
      </div>
      <!-- New Start Button (shown when conversationId exists) -->
      <ClientOnly>
        <button 
          v-if="conversationId" 
          class="new-start-btn" 
          @click="handleNewStart"
          title="Start a new conversation"
        >
          New Start
        </button>
      </ClientOnly>
    </div>
    
    <div class="chat-messages">
      <div class="message" v-for="message in chatMessages" :key="message.id" :class="message.role">
        <div class="message-avatar">
          <img v-if="message.role === 'user'" :src="userAvatar" :alt="userName || 'User'" />
          <img v-else :src="toolIcon" :alt="toolName" />
        </div>
        <div class="message-content">
          <div class="message-text" v-html="formatMessageText(message.text)"></div>
          <!-- 显示上传的文件和图片 -->
          <div v-if="message.fileUrls && message.fileUrls.length > 0" class="message-files">
            <div 
              v-for="(fileUrl, index) in message.fileUrls" 
              :key="index" 
              class="message-file-item"
            >
              <!-- 图片直接展示 -->
              <img 
                v-if="isImageFile(fileUrl)" 
                :src="fileUrl" 
                :alt="`Image ${index + 1}`"
                class="message-image"
                @click="openImagePreview(fileUrl)"
              />
              <!-- 文档显示文档图标 -->
              <a 
                v-else 
                :href="fileUrl" 
                target="_blank" 
                class="message-document"
                :title="getFileName(fileUrl)"
              >
                <i class="fas fa-file"></i>
                <span class="document-name">{{ getFileName(fileUrl) }}</span>
              </a>
            </div>
          </div>
          <div class="message-time">{{ formatTime(message.timestamp) }}</div>
        </div>
      </div>
    </div>
    
    <div class="chat-input">
      <div class="input-actions">
        <!-- Model Selection and Icons (ClientOnly to prevent hydration mismatch) -->
        <ClientOnly>
          <!-- Model Selection Dropdown -->
          <div v-if="modelCategory" class="model-select-wrapper">
            <select 
              v-model="selectedModel" 
              class="model-select"
              :disabled="loadingModels || availableModels.length === 0"
              @change="onModelChange"
            >
              <option value="" disabled>
                {{ loadingModels ? 'Loading...' : (availableModels.length === 0 ? 'No models available' : 'Select Model') }}
              </option>
              <option 
                v-for="model in availableModels" 
                :key="model.id" 
                :value="model.id"
              >
                {{ model.name }}
              </option>
            </select>
          </div>
          <!-- Web Search Icon -->
          <div 
            v-if="currentModelInfo && currentModelInfo.isSearch === 1"
            class="action-icon" 
            :class="{ active: currentModelInfo && currentModelInfo.isSearch === 1 }"
            @click="toggleWebSearch" 
            title="Web Search"
          >
            <i class="fas fa-globe"></i>
          </div>
          <!-- Thinking Icon -->
          <div 
            v-if="currentModelInfo && currentModelInfo.isThink === 1"
            class="action-icon" 
            :class="{ active: currentModelInfo && currentModelInfo.isThink === 1 }"
            title="Thinking Mode"
          >
            <i class="fas fa-brain"></i>
          </div>
          <template #fallback>
            <div v-if="modelCategory" class="model-select-wrapper">
              <select class="model-select" disabled>
                <option>Loading...</option>
              </select>
            </div>
          </template>
        </ClientOnly>
        <!-- Upload File Button -->
        <button 
          class="action-btn" 
          @click="handleFileUpload" 
          :title="props.modelCategory === 'DeepSeek' 
            ? 'Supports various types of documents, with a maximum size of 8M.' 
            : 'Supports images and various types of documents, with a maximum size of 8M.'"
        >
          <i class="fas fa-paperclip"></i>
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
        <button class="send-btn" @click="sendMessage" :disabled="!inputMessage.trim() || isStreaming">
          <i v-if="!isStreaming" class="fas fa-paper-plane"></i>
          <span v-else>Sending...</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, inject, computed, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { useAuth } from '~/composables/useAuth'

const props = defineProps({
  toolName: {
    type: String,
    required: true
  },
  toolDescription: {
    type: String,
    required: true
  },
  toolIcon: {
    type: String,
    required: true
  },
  modelCategory: {
    type: String,
    default: null
  }
})

// 注入父组件的函数
const addToUsageHistory = inject('addToUsageHistory', null)

const config = useRuntimeConfig()
const { token, user } = useAuth()

// 计算用户头像
const userAvatar = computed(() => {
  if (user.value?.avatar && user.value.avatar.trim()) {
    return user.value.avatar
  }
  return '/default-avatar.svg'
})

// 计算用户名
const userName = computed(() => {
  return user.value?.name && user.value.name.trim() 
    ? user.value.name 
    : 'User'
})

// 获取认证 token
const getAuthToken = () => {
  if (!process.client) return null
  try {
    if (token.value) {
      return token.value
    }
    return localStorage.getItem('auth_token')
  } catch (error) {
    return localStorage.getItem('auth_token')
  }
}
const { get } = useApi()
const { showError } = useToast()

const inputMessage = ref('')
const chatMessages = ref([])
const uploadedFiles = ref([]) // 文件对象列表
const fileUrls = ref([]) // 上传后的文件 URL 数组
const isWebSearchEnabled = ref(false)
const selectedModel = ref('')
const modelsData = ref(null)
const loadingModels = ref(false)
const conversationId = ref('')
const isStreaming = ref(false)

// 计算可用的模型列表（只显示指定分类下的 CHAT 类型模型）
const availableModels = computed(() => {
  if (!modelsData.value || !props.modelCategory) return []
  
  // 支持 categoryList (驼峰) 和 category_list (下划线) 两种格式
  const categoryList = modelsData.value.categoryList || modelsData.value.category_list
  
  // 检查 categoryList 是否存在且为数组
  if (!categoryList || !Array.isArray(categoryList)) {
    console.warn('categoryList is not available or not an array:', modelsData.value)
    return []
  }
  
  const category = categoryList.find(
    cat => cat && cat.name === props.modelCategory
  )
  
  if (!category) {
    console.warn('Category not found:', props.modelCategory, 'Available categories:', categoryList.map(c => c?.name))
    return []
  }
  
  // 支持 modelList (驼峰) 和 model_list (下划线) 两种格式
  const modelList = category.modelList || category.model_list
  
  // 检查 modelList 是否存在且为数组
  if (!modelList || !Array.isArray(modelList)) {
    console.warn('modelList is not available or not an array for category:', category)
    return []
  }
  
  // 只返回 CHAT 类型的模型
  return modelList.filter(model => model && model.type === 'CHAT')
})

// 获取当前选中模型的详细信息
const currentModelInfo = computed(() => {
  if (!selectedModel.value || !availableModels.value.length) return null
  
  // 确保类型匹配（id 可能是数字或字符串）
  const modelId = typeof selectedModel.value === 'string' 
    ? parseInt(selectedModel.value, 10) 
    : selectedModel.value
    
  return availableModels.value.find(model => {
    const modelIdNum = typeof model.id === 'string' ? parseInt(model.id, 10) : model.id
    return modelIdNum === modelId
  }) || null
})

// 获取模型列表
const fetchModels = async () => {
  if (!props.modelCategory) return
  
  // 确保只在客户端执行
  if (!process.client) {
    console.warn('fetchModels: Skipping on server side')
    return
  }
  
  try {
    loadingModels.value = true
    
    // 优先使用 Nuxt 代理 API，避免 CORS 问题
    const useProxy = true
    let url
    
    if (useProxy) {
      // 使用 Nuxt 代理 API
      url = '/api/common/models/tree'
      console.log('Using proxy API:', url)
    } else {
      // 直接调用外部 API
      const apiBase = config.public.apiBase
      url = `${apiBase}/common/models/tree`
      console.log('Using direct API:', url)
      console.log('API Base:', apiBase)
    }
    
    // 获取认证 token
    const authToken = getAuthToken()
    
    // 构建请求头
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    
    // 如果已登录，添加 Authorization 头
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`
    }
    
    // 使用原生 fetch API 确保在客户端正常工作
    let response
    try {
      response = await fetch(url, {
        method: 'GET',
        headers: headers,
        credentials: 'include',
        mode: 'cors'
      })
    } catch (fetchError) {
      console.error('Fetch network error:', fetchError)
      // 如果是 CORS 错误且使用直接 API，尝试不使用 credentials
      if (!useProxy && fetchError.message && fetchError.message.includes('CORS')) {
        console.log('Retrying without credentials...')
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          mode: 'cors'
        })
      } else {
        throw fetchError
      }
    }
    
    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Response error text:', errorText)
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }
    
    // 检查响应内容类型
    const contentType = response.headers.get('content-type')
    console.log('Response content-type:', contentType)
    
    let result
    try {
      result = await response.json()
    } catch (jsonError) {
      const text = await response.text()
      console.error('JSON parse error:', jsonError)
      console.error('Response text:', text)
      throw new Error(`Failed to parse JSON response: ${jsonError.message}`)
    }
    
    console.log('API response:', result)
    
    // 检查响应结构，支持 errorCode (驼峰) 和 error_code (下划线) 两种格式
    const errorCode = result?.errorCode || result?.error_code
    const errorMessage = result?.errorMessage || result?.error_message
    const userTip = result?.userTip || result?.user_tip
    
    if (result && typeof result === 'object' && errorCode !== undefined) {
      if (errorCode === '00000') {
        // 验证数据结构
        if (result.data && typeof result.data === 'object') {
          modelsData.value = result.data
          console.log('Models data received:', result.data)
        } else {
          console.error('Invalid data structure:', result.data)
          modelsData.value = null
          throw new Error('Invalid response data structure')
        }
      } else {
        const errorMsg = userTip || errorMessage || 'Request failed'
        console.error('API returned error code:', errorCode, errorMsg)
        modelsData.value = null
        throw new Error(errorMsg)
      }
    } else {
      // 如果响应结构不符合预期，验证后使用
      if (result && typeof result === 'object') {
        modelsData.value = result
        console.log('Models data received (direct):', result)
      } else {
        console.error('Invalid response structure:', result)
        modelsData.value = null
        throw new Error('Invalid response structure')
      }
    }
    
    // 等待下一个 tick 确保 computed 属性已更新
    await nextTick()
    
    console.log('Available models:', availableModels.value)
    
    // 如果有可用模型，默认选择第一个
    if (availableModels.value.length > 0) {
      selectedModel.value = availableModels.value[0].id
      console.log('Default model selected:', selectedModel.value)
    } else {
      console.warn('No available models found for category:', props.modelCategory)
    }
  } catch (error) {
    console.error('Failed to fetch models:', error)
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause
    })
    // 不显示弹出提醒，只记录错误日志
  } finally {
    loadingModels.value = false
  }
}

// 模型选择变化处理
const onModelChange = () => {
  console.log('Selected model:', selectedModel.value)
  console.log('Current model info:', currentModelInfo.value)
  
  // 根据模型状态重置 Web Search 状态
  if (currentModelInfo.value && currentModelInfo.value.isSearch === 0) {
    isWebSearchEnabled.value = false
  }
  
  // 这里可以添加其他模型切换的逻辑
}

// 组件挂载时获取模型列表
onMounted(() => {
  if (props.modelCategory) {
    fetchModels()
  }
})

// 格式化时间
const formatTime = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

// 判断是否为图片文件
const isImageFile = (url) => {
  if (!url) return false
  const lowerUrl = url.toLowerCase()
  
  // 检查 URL 中是否包含图片扩展名
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.ico']
  const hasImageExtension = imageExtensions.some(ext => {
    // 检查扩展名是否在 URL 路径中（排除查询参数）
    const urlPath = lowerUrl.split('?')[0]
    return urlPath.endsWith(ext)
  })
  
  // 检查 URL 中是否包含 image 路径（如 /image/）
  const hasImagePath = lowerUrl.includes('/image/') || lowerUrl.includes('image/')
  
  return hasImageExtension || hasImagePath
}

// 获取文件名
const getFileName = (url) => {
  if (!url) return 'File'
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const fileName = pathname.split('/').pop() || 'File'
    return decodeURIComponent(fileName)
  } catch (e) {
    // 如果不是有效的 URL，尝试从路径中提取
    const parts = url.split('/')
    return parts[parts.length - 1] || 'File'
  }
}

// 打开图片预览
const openImagePreview = (imageUrl) => {
  if (!process.client) return
  // 在新窗口打开图片
  window.open(imageUrl, '_blank')
}

// 格式化消息文本（支持 Markdown 风格的表格、列表等）
const formatMessageText = (text) => {
  if (!text) return ''
  if (!process.client) return text // 服务端渲染时直接返回原文
  
  // 转义 HTML 特殊字符，防止 XSS
  const escapeHtml = (str) => {
    const div = document.createElement('div')
    div.textContent = str
    return div.innerHTML
  }
  
  // 先处理表格（在转义之前，因为需要识别原始格式）
  const lines = text.split('\n')
  const processedLines = []
  let i = 0
  
  while (i < lines.length) {
    const line = lines[i].trim()
    
    // 检查是否是表格行
    if (line.startsWith('|') && line.endsWith('|')) {
      // 收集连续的表格行
      const tableRows = []
      let j = i
      
      while (j < lines.length && lines[j].trim().startsWith('|') && lines[j].trim().endsWith('|')) {
        tableRows.push(lines[j].trim())
        j++
      }
      
      // 处理表格
      if (tableRows.length > 0) {
        let tableHtml = '<table class="message-table">'
        let isFirstRow = true
        
        tableRows.forEach((row, idx) => {
          const content = row.slice(1, -1) // 移除首尾的 |
          const cells = content.split('|').map(cell => cell.trim())
          
          // 检查是否是分隔行
          const isSeparator = cells.every(cell => /^:?-+:?$/.test(cell))
          if (isSeparator) {
            return // 跳过分隔行
          }
          
          const rowHtml = cells.map((cell) => {
            const tag = isFirstRow ? 'th' : 'td'
            const align = cell.startsWith(':') && cell.endsWith(':') ? 'center' 
                         : cell.endsWith(':') ? 'right' 
                         : 'left'
            const cellContent = escapeHtml(cell.replace(/^:+/g, '').replace(/:+$/g, ''))
            return `<${tag} style="text-align: ${align}">${cellContent}</${tag}>`
          }).join('')
          
          tableHtml += `<tr>${rowHtml}</tr>`
          isFirstRow = false
        })
        
        tableHtml += '</table>'
        processedLines.push(tableHtml)
        i = j
        continue
      }
    }
    
    // 非表格行，转义后保留
    processedLines.push(escapeHtml(lines[i]))
    i++
  }
  
  let formatted = processedLines.join('\n')
  
  // 处理标题：### 标题
  formatted = formatted.replace(/^###\s+(.+)$/gm, '<h3 class="message-heading">$1</h3>')
  formatted = formatted.replace(/^##\s+(.+)$/gm, '<h2 class="message-heading">$1</h2>')
  formatted = formatted.replace(/^#\s+(.+)$/gm, '<h1 class="message-heading">$1</h1>')
  
  // 处理无序列表：- 或 * 开头
  formatted = formatted.replace(/^[\-\*]\s+(.+)$/gm, '<li class="message-list-item">$1</li>')
  // 将连续的列表项包装在 ul 标签中
  formatted = formatted.replace(/(<li[^>]*>[\s\S]*?<\/li>)/g, (match) => {
    if (match.includes('<ul')) return match
    return `<ul class="message-list">${match}</ul>`
  })
  
  // 处理有序列表：1. 开头
  formatted = formatted.replace(/^\d+\.\s+(.+)$/gm, '<li class="message-list-item">$1</li>')
  
  // 处理分隔线：---
  formatted = formatted.replace(/^---+$/gm, '<hr class="message-divider">')
  
  // 处理粗体：**文本**
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  
  // 处理斜体：*文本*（避免与列表标记冲突）
  formatted = formatted.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>')
  
  // 处理代码块：```代码```
  formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre class="message-code-block"><code>$1</code></pre>')
  
  // 处理行内代码：`代码`
  formatted = formatted.replace(/`([^`\n]+)`/g, '<code class="message-inline-code">$1</code>')
  
  // 处理换行：将单个换行转换为 <br>，但保留段落之间的双换行
  formatted = formatted.replace(/\n\n/g, '</p><p class="message-paragraph">')
  formatted = formatted.replace(/\n/g, '<br>')
  
  // 包装在段落中（如果还没有被其他标签包装）
  if (!formatted.match(/^<(table|h[1-6]|ul|ol|pre|hr)/)) {
    formatted = `<p class="message-paragraph">${formatted}</p>`
  }
  
  return formatted
}

// 判断是否为图片文件
const isImageFileByType = (file) => {
  if (!file || !file.type) return false
  return file.type.startsWith('image/')
}

// 处理文件上传
const handleFileUpload = async () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  
  // DeepSeek 不支持图片，只允许文档
  if (props.modelCategory === 'DeepSeek') {
    // 排除图片类型，只允许文档
    input.accept = '.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.csv,.rtf,.odt,.ods,.odp'
  } else {
    input.accept = '*/*'
  }
  
  input.onchange = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    
    // DeepSeek 额外检查：过滤掉图片文件
    if (props.modelCategory === 'DeepSeek') {
      const imageFiles = files.filter(f => isImageFileByType(f))
      if (imageFiles.length > 0) {
        showError('DeepSeek does not support image uploads. Please upload documents only.', 5000)
        // 移除图片文件，只保留文档
        const documentFiles = files.filter(f => !isImageFileByType(f))
        if (documentFiles.length === 0) {
          return // 如果只剩下图片，直接返回
        }
        // 继续处理文档文件
        files.length = 0
        files.push(...documentFiles)
      }
    }
    
    try {
      // 创建 FormData
      const formData = new FormData()
      files.forEach(file => {
        formData.append('file', file)
      })
      
      // 获取认证 token
      const authToken = getAuthToken()
      
      // 构建请求头
      const headers = {
        'Accept': 'application/json'
      }
      
      // 如果已登录，添加 Authorization 头
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`
      }
      
      // 上传文件
      const response = await fetch('/api/common/batch-upload', {
        method: 'POST',
        headers: headers,
        body: formData,
        credentials: 'include'
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Upload failed' }))
        throw new Error(errorData.error || errorData.message || 'Upload failed')
      }
      
      const data = await response.json()
      
      // 处理统一标准响应结构：
      // {
      //   "errorCode": "00000",
      //   "errorMessage": "Everything ok",
      //   "data": { "urls": [...] }
      // }
      // 从 data.urls 中提取数组并赋值给 fileUrls
      let urls = []
      if (data.errorCode && data.data && data.data.urls && Array.isArray(data.data.urls)) {
        urls = data.data.urls
      } else if (data.fileUrls && Array.isArray(data.fileUrls)) {
        // 兼容旧格式
        urls = data.fileUrls
      } else if (data.data && Array.isArray(data.data)) {
        // 兼容旧格式
        urls = data.data
      }
      
      if (Array.isArray(urls) && urls.length > 0) {
        // 保存文件 URL 到 fileUrls 数组
        fileUrls.value.push(...urls)
        
        // 保存文件信息用于显示
        files.forEach((file, index) => {
          if (urls[index]) {
            uploadedFiles.value.push({
              id: Date.now() + Math.random(),
              name: file.name,
              file: file,
              size: file.size,
              url: urls[index] // 保存上传后的 URL
            })
          }
        })
        
        console.log('Files uploaded successfully:', urls)
      } else {
        throw new Error('Invalid response: fileUrls not found')
      }
    } catch (error) {
      console.error('File upload error:', error)
      showError(error.message || 'Failed to upload files', 5000)
    }
  }
  
  input.click()
}

// 删除文件
const removeFile = (index) => {
  // 同时删除文件 URL
  if (uploadedFiles.value[index]?.url) {
    const urlIndex = fileUrls.value.indexOf(uploadedFiles.value[index].url)
    if (urlIndex !== -1) {
      fileUrls.value.splice(urlIndex, 1)
    }
  }
  uploadedFiles.value.splice(index, 1)
}

// 切换联网搜索
const toggleWebSearch = () => {
  isWebSearchEnabled.value = !isWebSearchEnabled.value
  console.log('Web search:', isWebSearchEnabled.value ? 'Enabled' : 'Disabled')
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
  if (!inputMessage.value.trim() || isStreaming.value) return
  
  // 检查是否选择了模型
  if (!currentModelInfo.value) {
    alert('Please select a model first')
    return
  }
  
  // 添加到使用历史
  if (addToUsageHistory) {
    addToUsageHistory(props.toolName)
  }
  
  // 保存用户输入（用于错误时恢复）
  const userInput = inputMessage.value
  const userMessageId = Date.now()
  
  // 保存当前的文件 URLs（用于错误时恢复）
  const currentFileUrls = [...fileUrls.value]
  
  // 添加用户消息，包含文件 URLs
  const userMessage = {
    id: userMessageId,
    role: 'user',
    text: userInput,
    timestamp: new Date(),
    fileUrls: currentFileUrls.length > 0 ? [...currentFileUrls] : undefined
  }
  chatMessages.value.push(userMessage)
  
  // 清空输入框
  inputMessage.value = ''
  
  // 滚动到底部
  scrollToBottom()
  
  // 创建助手消息用于流式更新
  const assistantMessageId = Date.now() + 1
  const assistantMessage = {
    id: assistantMessageId,
    role: 'assistant',
    text: '',
    timestamp: new Date()
  }
  chatMessages.value.push(assistantMessage)
  
  // 开始流式请求
  isStreaming.value = true
  
  try {
    await streamChatRequest(userInput, assistantMessageId, userMessageId)
    // 发送成功后，清空文件 URL（因为已经提交了）
    fileUrls.value = []
    uploadedFiles.value = []
  } catch (error) {
    console.error('Stream request error:', error)
    // 显示错误提示（如果流式内部已弹框，则不重复弹）
    if (!error?.__handled) {
      showError(error.message || 'sorry！Service is busy. Please try again later.', 5000)
    }
    // 清除本次会话内容：移除用户消息和助手消息
    const assistantIndex = chatMessages.value.findIndex(m => m.id === assistantMessageId)
    const userIndex = chatMessages.value.findIndex(m => m.id === userMessageId)
    if (assistantIndex !== -1) {
      chatMessages.value.splice(assistantIndex, 1)
    }
    if (userIndex !== -1) {
      chatMessages.value.splice(userIndex, 1)
    }
    // 还原用户输入到文本框
    inputMessage.value = userInput
    // 还原文件 URLs（错误时保留文件）
    fileUrls.value = currentFileUrls
  } finally {
    isStreaming.value = false
    scrollToBottom()
  }
}

// 流式聊天请求
const streamChatRequest = async (prompt, messageId, userMessageId) => {
  if (!process.client) return
  
  // 获取模型名称
  const modelName = currentModelInfo.value.name
  
  // 构建请求体
  const requestBody = {
    model: modelName,
    prompt: prompt
  }
  
  // 如果存在 conversationId，添加到请求中
  if (conversationId.value) {
    requestBody.conversationId = conversationId.value
  }
  
  // 如果有上传的文件 URL，且当前模型是 CHAT 类型，添加到请求中
  // fileUrls 字段仅应用在 Chat 类型模型上（包括 GPT、DeepSeek、Claude、Gemini 等）
  if (fileUrls.value.length > 0 && currentModelInfo.value && currentModelInfo.value.type === 'CHAT') {
    requestBody.fileUrls = fileUrls.value
    if (process.dev) {
      console.log('[Chat Stream] Adding fileUrls to request:', {
        model: modelName,
        category: props.modelCategory,
        fileUrls: fileUrls.value,
        fileCount: fileUrls.value.length
      })
    }
  }
  
  // 获取认证 token
  const authToken = getAuthToken()
  
  // 构建请求头
  // 对于流式响应，Accept 头应该设置为 text/event-stream 或 application/stream+json
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'text/event-stream, application/json, */*'
  }
  
  // 如果已登录，添加 Authorization 头
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`
  }
  
  // 根据模型分类选择对应的 API 接口
  const getChatApiUrl = (category) => {
    const apiMap = {
      'GPT': '/api/chat/chatgpt',
      'DeepSeek': '/api/chat/deepseek',
      'Claude': '/api/chat/claude',
      'Gemini': '/api/chat/gemini'
    }
    return apiMap[category] || '/api/chat/chatgpt' // 默认使用 chatgpt
  }
  
  // 使用代理 API
  const url = getChatApiUrl(props.modelCategory)
  
  // 发送流式请求
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody),
    credentials: 'include',
    mode: 'cors'
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  // 读取流式响应（SSE 格式）
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let currentEvent = null
  let currentId = null
  let currentData = ''
  let hasError = false // 标记是否遇到错误
  let handledError = null // 记录已处理的业务错误（用于向上抛出，触发回滚）
  
  while (true) {
    const { done, value } = await reader.read()
    
    if (done || hasError) {
      break
    }
    
    // 解码数据
    buffer += decoder.decode(value, { stream: true })
    
    // 按行分割处理 SSE 格式
    const lines = buffer.split('\n')
    buffer = lines.pop() || '' // 保留最后一个不完整的行
    
    for (const line of lines) {
      const trimmedLine = line.trim()
      
      // 空行表示一个 SSE 消息结束
      if (!trimmedLine) {
        // 注意：SSE 的 event 可能缺省（缺省即 message），这里不能依赖 currentEvent 存在
        if (currentData) {
          try {
            const eventName = currentEvent || 'message'

            if (process.dev) {
              // 用 log（不是 debug），避免控制台过滤导致看不到
              console.log('[Chat Stream] SSE message received:', { event: eventName, id: currentId, data: currentData })
            }

            let data
            try {
              data = JSON.parse(currentData)
            } catch (e) {
              // 兼容：有些后端会把一段 JSON 拆成多行 data，按 SSE 规范会拼出带 \n 的字符串，导致 JSON.parse 失败
              // 尝试移除换行后再解析一次
              try {
                data = JSON.parse(String(currentData).replace(/\n/g, ''))
              } catch (_) {
                // 有些后端会直接推纯文本；JSON 解析失败时，按纯文本处理
                data = currentData
              }
            }

            // 全局错误判断：只要 errorCode != '00000' 就弹框（内容只取 errorMessage，空则默认文案）
            if (data && typeof data === 'object' && data.errorCode && String(data.errorCode) !== '00000') {
              const msg =
                (typeof data.errorMessage === 'string' && data.errorMessage.trim())
                  ? data.errorMessage.trim()
                  : 'sorry！Service is busy. Please try again later.'

              // 无论是否开启 dev，都输出一条可见的日志，便于你对照 Postman 的 SSE 内容
              console.warn('[Chat Stream] Non-00000 errorCode received:', {
                event: eventName,
                id: currentId,
                raw: currentData,
                parsed: data
              })
              // 额外输出一条纯字符串，避免控制台预览省略号影响判断
              console.warn('[Chat Stream] Non-00000 raw string:', String(currentData))
              showError(msg, 5000)

              // 清除本次会话内容：移除用户消息和助手消息
              const assistantMessageIndex = chatMessages.value.findIndex(m => m.id === messageId)
              const userMessageIndex = chatMessages.value.findIndex(m => m.id === userMessageId)
              if (assistantMessageIndex !== -1) {
                chatMessages.value.splice(assistantMessageIndex, 1)
              }
              if (userMessageIndex !== -1) {
                chatMessages.value.splice(userMessageIndex, 1)
              }

              // 还原用户输入到文本框
              inputMessage.value = prompt

              // 标记并停止流式
              handledError = Object.assign(new Error(msg), { __handled: true })
              hasError = true
              isStreaming.value = false
              reader.cancel().catch(() => {}) // 忽略取消时的错误
              break
            }

            // 处理 message 事件（正常消息内容）
            if (eventName === 'message') {
              // 兼容多种后端字段：content / data.content / text
              const content =
                (data && typeof data === 'object')
                  ? (data.content ?? data?.data?.content ?? data.text ?? null)
                  : data

              if (content !== undefined && content !== null && String(content).length > 0) {
                const messageIndex = chatMessages.value.findIndex(m => m.id === messageId)
                if (messageIndex !== -1) {
                  // 追加内容
                  chatMessages.value[messageIndex].text += String(content)
                  // 实时滚动
                  scrollToBottom()
                }
              }
            }
            
            // 处理 complete 事件
            if (eventName === 'complete') {
              // 处理完成状态
              if (data && typeof data === 'object' && data.status === 'completed') {
                // 如果有 eventId，保存为 conversationId
                if (data.eventId) {
                  conversationId.value = String(data.eventId)
                  console.log('Conversation ID saved:', conversationId.value)
                } else if (currentId) {
                  // 如果没有 eventId，使用 SSE 的 id
                  conversationId.value = String(currentId)
                  console.log('Conversation ID saved from SSE id:', conversationId.value)
                }
              }
            }
          } catch (parseError) {
            console.warn('Failed to handle SSE message:', { event: currentEvent, id: currentId, data: currentData }, parseError)
          }
        }
        
        // 重置当前事件
        currentEvent = null
        currentId = null
        currentData = ''
        continue
      }
      
      // 解析 SSE 字段
      if (trimmedLine.startsWith('event:')) {
        currentEvent = trimmedLine.substring(6).trim()
      } else if (trimmedLine.startsWith('id:')) {
        currentId = trimmedLine.substring(3).trim()
      } else if (trimmedLine.startsWith('data:')) {
        // SSE 允许同一事件多行 data，必须追加而不是覆盖
        const dataLine = trimmedLine.substring(5)
        currentData = currentData ? `${currentData}\n${dataLine}` : dataLine
      }
    }
  }
  
  // 处理剩余的 buffer（服务端可能不会用空行结尾，buffer 里可能包含多行：event/id/data）
  if (buffer && buffer.trim()) {
    const tailLines = buffer.split('\n')
    for (const rawLine of tailLines) {
      const t = rawLine.trim()
      if (!t) continue
      if (t.startsWith('event:')) {
        currentEvent = t.substring(6).trim()
      } else if (t.startsWith('id:')) {
        currentId = t.substring(3).trim()
      } else if (t.startsWith('data:')) {
        const dataLine = t.substring(5)
        currentData = currentData ? `${currentData}\n${dataLine}` : dataLine
      }
    }
  }

  // 如果最后一个 SSE 消息没有以空行结尾，这里补一次处理
  if (currentData && !hasError) {
    const eventName = currentEvent || 'message'
    try {
      if (process.dev) {
        console.log('[Chat Stream] SSE final message received:', { event: eventName, id: currentId, data: currentData })
      }

      let data
      try {
        data = JSON.parse(currentData)
      } catch (e) {
        try {
          data = JSON.parse(String(currentData).replace(/\n/g, ''))
        } catch (_) {
          data = currentData
        }
      }

      if (data && typeof data === 'object' && data.errorCode && String(data.errorCode) !== '00000') {
        const msg =
          (typeof data.errorMessage === 'string' && data.errorMessage.trim())
            ? data.errorMessage.trim()
            : 'sorry！Service is busy. Please try again later.'

        console.warn('[Chat Stream] Non-00000 errorCode received (final):', {
          event: eventName,
          id: currentId,
          raw: currentData,
          parsed: data
        })
        console.warn('[Chat Stream] Non-00000 raw string (final):', String(currentData))
        // 即使控制台被过滤，也把最后一次错误挂到 window 上，便于手动查看
        if (process.client) {
          window.__lastStreamError = {
            at: Date.now(),
            event: eventName,
            id: currentId,
            raw: currentData,
            parsed: data
          }
        }
        showError(msg, 5000)

        const assistantMessageIndex = chatMessages.value.findIndex(m => m.id === messageId)
        const userMessageIndex = chatMessages.value.findIndex(m => m.id === userMessageId)
        if (assistantMessageIndex !== -1) {
          chatMessages.value.splice(assistantMessageIndex, 1)
        }
        if (userMessageIndex !== -1) {
          chatMessages.value.splice(userMessageIndex, 1)
        }

        inputMessage.value = prompt
        handledError = Object.assign(new Error(msg), { __handled: true })
        isStreaming.value = false
      } else if (eventName === 'message') {
        const content =
          (data && typeof data === 'object')
            ? (data.content ?? data?.data?.content ?? data.text ?? null)
            : data

        if (content !== undefined && content !== null && String(content).length > 0) {
          const messageIndex = chatMessages.value.findIndex(m => m.id === messageId)
          if (messageIndex !== -1) {
            chatMessages.value[messageIndex].text += String(content)
          }
        }
      } else if (eventName === 'complete' && data && typeof data === 'object' && data.status === 'completed') {
        if (data.eventId) {
          conversationId.value = String(data.eventId)
        } else if (currentId) {
          conversationId.value = String(currentId)
        }
      }
    } catch (e) {
      console.warn('Failed to handle final SSE message:', { event: eventName, id: currentId, data: currentData }, e)
    }
  }

  // 如果流式内部已处理业务错误，向上抛出，触发 sendMessage 的回滚逻辑（避免清空 fileUrls 等）
  if (handledError) {
    throw handledError
  }
}

// 处理 New Start 按钮点击
const handleNewStart = () => {
  // 清空文件 URL
  fileUrls.value = []
  // 清除 conversationId
  conversationId.value = ''
  // 清除聊天消息
  chatMessages.value = []
  // 重新加载页面
  if (process.client) {
    window.location.reload()
  }
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
</script>

<style scoped>
.chat-interface {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  /* 确保能够正确计算高度 */
  position: relative;
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

.new-start-btn {
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.new-start-btn:hover {
  background: #5a6fd8;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
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
  /* 初始高度：一半高度 */
  min-height: calc((1330px - 200px - 70px - 140px) / 2);
  /* 最大高度：撑满剩余空间 */
  max-height: calc(1330px - 200px - 70px - 140px);
  /* 当内容超出最大高度时，出现滚动条 */
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* 自定义滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
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
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Markdown 格式化样式 */
.message-text :deep(.message-paragraph) {
  margin: 0.5em 0;
}

.message-text :deep(.message-heading) {
  font-weight: 600;
  margin: 1em 0 0.5em 0;
  line-height: 1.3;
}

.message-text :deep(h1.message-heading) {
  font-size: 1.5em;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.3em;
}

.message-text :deep(h2.message-heading) {
  font-size: 1.3em;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.3em;
}

.message-text :deep(h3.message-heading) {
  font-size: 1.1em;
}

.message-text :deep(.message-table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
  font-size: 0.9em;
}

.message-text :deep(.message-table th),
.message-text :deep(.message-table td) {
  border: 1px solid #e2e8f0;
  padding: 8px 12px;
  text-align: left;
}

.message-text :deep(.message-table th) {
  background-color: #f8fafc;
  font-weight: 600;
}

.message-text :deep(.message-table tr:nth-child(even)) {
  background-color: #f8fafc;
}

.message-text :deep(.message-table tr.table-separator) {
  display: none;
}

.message-text :deep(.message-list) {
  margin: 0.5em 0;
  padding-left: 1.5em;
  list-style-type: disc;
}

.message-text :deep(.message-list-item) {
  margin: 0.25em 0;
  line-height: 1.6;
}

.message-text :deep(.message-divider) {
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 1em 0;
}

.message-text :deep(.message-code-block) {
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 12px;
  margin: 1em 0;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  line-height: 1.5;
}

.message-text :deep(.message-code-block code) {
  background: transparent;
  padding: 0;
  border: none;
  white-space: pre;
}

.message-text :deep(.message-inline-code) {
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 2px 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.message-text :deep(strong) {
  font-weight: 600;
}

.message-text :deep(em) {
  font-style: italic;
}

/* 用户消息中的样式调整 */
.message.user .message-text :deep(.message-table th) {
  background-color: rgba(255, 255, 255, 0.1);
}

.message.user .message-text :deep(.message-table tr:nth-child(even)) {
  background-color: rgba(255, 255, 255, 0.05);
}

.message.user .message-text :deep(.message-code-block) {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.message.user .message-text :deep(.message-inline-code) {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
  margin-top: 8px;
}

/* 消息中的文件和图片 */
.message-files {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message-file-item {
  display: inline-block;
}

/* 消息中的图片 */
.message-image {
  max-width: 300px;
  max-height: 300px;
  border-radius: 8px;
  cursor: pointer;
  object-fit: cover;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s;
}

.message-image:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.message.user .message-image {
  border-color: rgba(255, 255, 255, 0.3);
}

/* 消息中的文档 */
.message-document {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.message.user .message-document {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.message-document:hover {
  background: rgba(255, 255, 255, 0.2);
}

.message.user .message-document:hover {
  background: rgba(255, 255, 255, 0.25);
}

.message-document i {
  font-size: 16px;
  color: #667eea;
}

.message.user .message-document i {
  color: white;
}

.message-document .document-name {
  font-size: 13px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.action-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 6px;
}

.action-icon:hover {
  background: #f1f5f9;
  color: #334155;
}

.action-icon.active {
  color: #667eea;
}

.action-icon.active:hover {
  background: #f1f5f9;
  color: #5a6fd8;
}

.action-icon i {
  font-size: 18px;
}

.model-select-wrapper {
  position: relative;
}

.model-select {
  min-width: 180px;
  height: 36px;
  padding: 0 12px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}

.model-select:hover {
  border-color: #cbd5e1;
  background-color: #f8fafc;
}

.model-select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.model-select:disabled {
  background-color: #f1f5f9;
  color: #94a3b8;
  cursor: not-allowed;
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
</style>

