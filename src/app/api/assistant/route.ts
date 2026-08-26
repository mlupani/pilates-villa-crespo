import {
  assistantClientRequestSchema,
  assistantResponseSchema
} from '@/lib/schemas'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const UPSTREAM_TIMEOUT_MS = 25_000

function normalizeEndpoint (value: string) {
  if (/^https?:\/\//i.test(value)) return value
  return `http://${value}`
}

function getAssistantConfig () {
  const endpoint = process.env.ASSISTANT_API_URL?.trim()
  const apiKey = process.env.ASSISTANT_API_KEY?.trim()
  if (!endpoint || !apiKey) return null
  return { endpoint: normalizeEndpoint(endpoint), apiKey }
}

export async function GET () {
  const config = getAssistantConfig()
  if (!config) {
    return Response.json({ available: false }, {
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' }
    })
  }

  try {
    const probe = await fetch(config.endpoint, {
      method: 'GET',
      headers: { 'x-api-key': config.apiKey },
      cache: 'no-store',
      signal: AbortSignal.timeout(5000)
    })
    // Fix VPS bug: fetch no throw on proxy 502. Need to check status.
    // 5xx = upstream down (nginx 502, service 500). 4xx (401/404/405) = service up but method/key rejected -> still available.
    if (probe.status >= 500) {
      return Response.json({ available: false }, {
        headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' }
      })
    }
    return Response.json({ available: true }, {
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' }
    })
  } catch {
    return Response.json({ available: false }, {
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' }
    })
  }
}

export async function POST (request: Request) {
  const config = getAssistantConfig()
  if (!config) {
    return Response.json({ ok: false }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }

  const parsed = assistantClientRequestSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ ok: false }, { status: 400 })
  }

  const payload: {
    message: string
    source: 'website'
    conversationId?: string
  } = {
    message: parsed.data.message,
    source: parsed.data.source
  }

  if (parsed.data.conversationId) {
    payload.conversationId = parsed.data.conversationId
  }

  let upstream: Response
  try {
    upstream = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)
    })
  } catch {
    return Response.json({ ok: false }, { status: 502 })
  }

  if (!upstream.ok) {
    return Response.json({ ok: false }, { status: 502 })
  }

  let data: unknown
  try {
    data = await upstream.json()
  } catch {
    return Response.json({ ok: false }, { status: 502 })
  }

  const response = assistantResponseSchema.safeParse(data)
  if (!response.success) {
    return Response.json({ ok: false }, { status: 502 })
  }

  return Response.json(response.data)
}
