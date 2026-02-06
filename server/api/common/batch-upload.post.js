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
    
    // 构建 FormData 用于转发到后端（后端要求 @RequestParam("file") MultipartFile[]）
    const forwardFormData = new FormData()
    let filePartCount = 0
    formData.forEach((item, index) => {
      // 只转发 name 为 'file' 的部分，且需有数据；若无 filename 则用 file_0, file_1 等
      const isFilePart = item.name === 'file' || item.filename
      const hasData = item.data && (item.data.length ?? item.data.byteLength ?? 0) > 0
      if (isFilePart && hasData) {
        const blob = new Blob([item.data], { type: item.type || 'application/octet-stream' })
        const filename = item.filename && item.filename.trim() ? item.filename : `file_${index}`
        forwardFormData.append('file', blob, filename)
        filePartCount += 1
      }
    })

    if (filePartCount === 0) {
      throw createError({
        statusCode: 400,
        message: "No file part in request. Ensure form field name is 'file' and multipart body is sent."
      })
    }

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
      const errorData = await response.json().catch(() => ({}))
      console.error('Backend upload error:', errorData)
      // 抛出异常，携带后端 errorMessage，便于前端统一展示
      const msg = (errorData && typeof errorData.errorMessage === 'string' && errorData.errorMessage.trim())
        ? errorData.errorMessage.trim()
        : (errorData?.message || errorData?.userTip || errorData?.error || 'Upload failed')
      throw createError({
        statusCode: response.status,
        message: msg
      })
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
