/**
 * 批量文件上传接口（代理）
 * 支持多文件上传，返回文件 URL 数组
 * 
 * 后端接口：/api/common/batch-upload
 * 参数：@RequestParam("file") MultipartFile[] files
 * 返回统一标准结构（直接返回后端响应，不做转换）：
 * {
 *   "errorCode": "00000",
 *   "errorMessage": "Everything ok",
 *   "data": {
 *     "urls": ["url1", "url2", ...]
 *   }
 * }
 * 
 * 前端组件会从 data.urls 中提取数组并赋值给 fileUrls
 */
export default defineEventHandler(async (event) => {
  // 获取 multipart form data
  const formData = await readMultipartFormData(event)
  
  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'No files provided'
    })
  }
  
  const backendUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.fuseaitools.com/api/common/batch-upload'
    : 'http://127.0.0.1:8080/api/common/batch-upload'

  try {
    // 获取请求头中的 Authorization
    const authHeader = getHeader(event, 'authorization')
    
    // 构建 FormData 用于转发到后端
    // 在 Node.js 环境中，使用全局 FormData（Node.js 18+ 支持）
    const forwardFormData = new FormData()
    formData.forEach((item) => {
      if (item.filename) {
        // 文件字段，使用 Blob 创建文件对象
        // Node.js 18+ 支持 Blob 和 FormData
        const blob = new Blob([item.data], { type: item.type || 'application/octet-stream' })
        forwardFormData.append('file', blob, item.filename)
      }
    })
    
    // 构建请求头（不设置 Content-Type，让 fetch 自动设置 multipart/form-data 边界）
    const headers = {
      'Accept': 'application/json',
    }
    
    // 确保 Authorization 头被正确传递
    if (authHeader) {
      headers['Authorization'] = authHeader
      console.log('Forwarding Authorization header to backend')
    } else {
      console.warn('No Authorization header found in request')
    }
    
    console.log('Proxying batch upload request to:', backendUrl, `Files: ${formData.length}`)
    
    // 转发 FormData 到后端
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: headers,
      body: forwardFormData
    })

    console.log('Backend response status:', response.status)

    if (!response.ok) {
      setResponseStatus(event, response.status)
      const errorData = await response.json().catch(() => ({ error: 'Upload failed' }))
      console.error('Backend upload error:', errorData)
      return errorData
    }

    const data = await response.json()
    
    // 直接返回后端原始响应，不做任何转换
    // 保持统一标准结构：{ errorCode, errorMessage, data: { urls: [...] } }
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('Upload proxy error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to upload files: ' + (error.message || 'Unknown error')
    })
  }
})
