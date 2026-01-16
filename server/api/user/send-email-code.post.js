export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const backendUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.fuseaitools.com/api/user/send-email-code'
    : 'http://127.0.0.1:8080/api/user/send-email-code'

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()

    // 返回相同的状态码和响应
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('Proxy error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to send email code'
    })
  }
})

