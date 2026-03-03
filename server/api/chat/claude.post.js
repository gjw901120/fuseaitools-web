export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/chat/claude`

  try {
    const authHeader = getHeader(event, 'authorization')
    const clientAccept = getHeader(event, 'accept') || 'text/event-stream, application/json, */*'
    const headers = {
      'Content-Type': 'application/json',
      Accept: clientAccept
    }
    if (authHeader) headers['Authorization'] = authHeader
    const cookie = getHeader(event, 'cookie')
    if (cookie) headers['Cookie'] = cookie

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      setResponseStatus(event, response.status)
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }))
      return errorData
    }

    setHeader(event, 'Content-Type', 'application/json')
    setHeader(event, 'Cache-Control', 'no-cache')
    setHeader(event, 'Connection', 'keep-alive')
    setHeader(event, 'Transfer-Encoding', 'chunked')
    return response.body
  } catch (error) {
    console.error('Stream proxy error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to stream chat: ' + (error.message || 'Unknown error')
    })
  }
})

