// 轻量 MJ API 客户端封装
export const useMjApi = () => {
  const BASE_URL = 'https://wolfai.top'
        const getAuthHeader = () => {
            const apiKey = process.env.NEWAPI_API_KEY || process.env.OPENAI_API_KEY || ''
            if (!apiKey) {
                console.warn('[MJ] 缺少 API Key，请在环境变量中设置 NEWAPI_API_KEY 或 OPENAI_API_KEY')
            }
            // 文档要求两者用空格拼接时可同时存在；最少提供一个
            const token = [process.env.NEWAPI_API_KEY, process.env.OPENAI_API_KEY].filter(Boolean).join(' ')
            return { Authorization: `Bearer ${token}`.trim() }
        }
    
        const request = async (path, options = {}) => {
            const url = `${BASE_URL}${path}`
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...getAuthHeader(),
                ...(options.headers || {})
            }
            const res = await fetch(url, { ...options, headers })
            let data
            try {
                data = await res.json()
            } catch (e) {
                throw new Error(`响应解析失败: ${res.status}`)
            }
            if (!res.ok) {
                throw new Error(data?.description || `请求失败: ${res.status}`)
            }
            return data
        }
    
        // 提交类
        const submitImagine = (body) => request('/mj/submit/imagine', { method: 'POST', body: JSON.stringify(body) })
        const submitBlend = (body) => request('/mj/submit/blend', { method: 'POST', body: JSON.stringify(body) })
        const submitDescribe = (body) => request('/mj/submit/describe', { method: 'POST', body: JSON.stringify(body) })
        const submitModal = (body) => request('/mj/submit/modal', { method: 'POST', body: JSON.stringify(body) })
        const submitSwapFace = (body) => request('/mj/insight-face/swap', { method: 'POST', body: JSON.stringify(body) })
        const submitAction = (body) => request('/mj/submit/action', { method: 'POST', body: JSON.stringify(body) })
        const uploadDiscordImages = (body) => request('/mj/submit/upload-discord-images', { method: 'POST', body: JSON.stringify(body) })
    
        // 任务类
        const listTasksByIds = (ids) => request('/mj/task/list-by-condition', { method: 'POST', body: JSON.stringify({ ids }) })
        const fetchTask = (id) => request(`/mj/task/${encodeURIComponent(id)}/fetch`, { method: 'GET' })
        const fetchImageSeed = (id) => request(`/mj/task/${encodeURIComponent(id)}/image-seed`, { method: 'GET' })
    
        return {
            submitImagine,
            submitBlend,
            submitDescribe,
            submitModal,
            submitSwapFace,
            submitAction,
            uploadDiscordImages,
            listTasksByIds,
            fetchTask,
            fetchImageSeed
        }
    }