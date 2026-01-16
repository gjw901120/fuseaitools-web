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
          <div class="message-text">{{ message.text }}</div>
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
        <button class="action-btn" @click="handleFileUpload" title="Upload File">
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

const inputMessage = ref('')
const chatMessages = ref([])
const uploadedFiles = ref([])
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

// 处理文件上传
const handleFileUpload = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.accept = '*/*'
  input.onchange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      files.forEach(file => {
        uploadedFiles.value.push({
          id: Date.now() + Math.random(),
          name: file.name,
          file: file,
          size: file.size
        })
      })
      console.log('Upload files:', files)
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
    await streamChatRequest(userInput, assistantMessageId)
  } catch (error) {
    console.error('Stream request error:', error)
    // 更新消息显示错误
    const messageIndex = chatMessages.value.findIndex(m => m.id === assistantMessageId)
    if (messageIndex !== -1) {
      chatMessages.value[messageIndex].text = 'Error: ' + (error.message || 'Request failed')
    }
  } finally {
    isStreaming.value = false
    scrollToBottom()
  }
}

// 流式聊天请求
const streamChatRequest = async (prompt, messageId) => {
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
  
  while (true) {
    const { done, value } = await reader.read()
    
    if (done) {
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
        if (currentEvent && currentData) {
          try {
            const data = JSON.parse(currentData)
            
            // 处理 message 事件
            if (currentEvent === 'message') {
              // 处理消息内容
              if (data.content !== undefined && data.content !== null) {
                const messageIndex = chatMessages.value.findIndex(m => m.id === messageId)
                if (messageIndex !== -1) {
                  // 追加内容
                  chatMessages.value[messageIndex].text += data.content
                  // 实时滚动
                  scrollToBottom()
                }
              }
            }
            
            // 处理 complete 事件
            if (currentEvent === 'complete') {
              // 处理完成状态
              if (data.status === 'completed') {
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
            console.warn('Failed to parse SSE data:', currentData, parseError)
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
        currentData = trimmedLine.substring(5).trim()
      }
    }
  }
  
  // 处理剩余的 buffer（最后一个不完整的 SSE 消息）
  if (buffer.trim()) {
    const trimmedLine = buffer.trim()
    if (trimmedLine.startsWith('event:')) {
      currentEvent = trimmedLine.substring(6).trim()
    } else if (trimmedLine.startsWith('id:')) {
      currentId = trimmedLine.substring(3).trim()
    } else if (trimmedLine.startsWith('data:')) {
      currentData = trimmedLine.substring(5).trim()
      
      // 尝试解析最后一个数据
      if (currentData) {
        try {
          const data = JSON.parse(currentData)
          
          if (currentEvent === 'message' && data.content !== undefined && data.content !== null) {
            const messageIndex = chatMessages.value.findIndex(m => m.id === messageId)
            if (messageIndex !== -1) {
              chatMessages.value[messageIndex].text += data.content
            }
          }
          
          if (currentEvent === 'complete' && data.status === 'completed') {
            if (data.eventId) {
              conversationId.value = String(data.eventId)
            } else if (currentId) {
              conversationId.value = String(currentId)
            }
          }
        } catch (parseError) {
          console.warn('Failed to parse remaining SSE data:', currentData, parseError)
        }
      }
    }
  }
}

// 处理 New Start 按钮点击
const handleNewStart = () => {
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

