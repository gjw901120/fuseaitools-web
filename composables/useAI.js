// AI 功能组合式函数
import { ref } from 'vue'

export const useAI = () => {
    const chatMessages = ref([])
    const isLoading = ref(false)

    const sendMessage = async (message) => {
        if (!message.trim()) return

        // 添加用户消息
        chatMessages.value.push({
            type: 'user',
            content: message,
            timestamp: new Date()
        })

        isLoading.value = true

        try {
            // 模拟 AI 响应
            const response = await simulateAIResponse(message)

            // 添加 AI 消息
            chatMessages.value.push({
                type: 'ai',
                content: response,
                timestamp: new Date()
            })
        } catch (error) {
            console.error('AI response error:', error)
        } finally {
            isLoading.value = false
        }
    }

    const simulateAIResponse = (message) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const responses = {
                    'hello': 'Hello! How can I assist you today?',
                    'help': 'I can help with coding, writing, analysis, and much more. What do you need help with?',
                    'code': 'Here is a sample code snippet to get you started...',
                    'default': 'I understand you said: "' + message + '". How can I help you with that?'
                }

                const lowerMessage = message.toLowerCase()
                const response = Object.keys(responses).find(key => lowerMessage.includes(key))
                resolve(responses[response] || responses.default)
            }, 1000)
        })
    }

    const clearChat = () => {
        chatMessages.value = []
    }

    return {
        chatMessages,
        isLoading,
        sendMessage,
        clearChat
    }
}