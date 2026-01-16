export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const backendUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.fuseaitools.com/api/chat/claude'
    : 'http://127.0.0.1:8080/api/chat/claude'

  try {
    // 获取请求头中的 Authorization
    const authHeader = getHeader(event, 'authorization')
    
    // 获取客户端发送的 Accept 头，如果没有则使用默认值
    const clientAccept = getHeader(event, 'accept') || 'text/event-stream, application/json, */*'
    
    // 构建请求头
    const headers = {
      'Content-Type': 'application/json',
      'Accept': clientAccept,
    }
    
    // 确保 Authorization 头被正确传递
    if (authHeader) {
      headers['Authorization'] = authHeader
      console.log('Forwarding Authorization header to backend')
    } else {
      console.warn('No Authorization header found in request')
    }
    
    console.log('Proxying request to:', backendUrl)
    console.log('Request body:', JSON.stringify(body))
    
    // 发送流式请求到后端
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })

    console.log('Backend response status:', response.status)

    if (!response.ok) {
      setResponseStatus(event, response.status)
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }))
      console.error('Backend error:', errorData)
      return errorData
    }

    // 设置响应头为流式传输
    setHeader(event, 'Content-Type', 'application/json')
    setHeader(event, 'Cache-Control', 'no-cache')
    setHeader(event, 'Connection', 'keep-alive')
    setHeader(event, 'Transfer-Encoding', 'chunked')
    
    console.log('Streaming response to client')
    
    // 返回流式响应体
    return response.body
  } catch (error) {
    console.error('Stream proxy error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to stream chat: ' + (error.message || 'Unknown error')
    })
  }
})

