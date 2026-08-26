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
    // Use POST for health check — it hits the real widget handler.
    // GET to /api/widget/messages often returns 404 even when healthy,
    // so it can't distinguish proxy vs service. POST validates the path.
    // Send intentionally invalid payload (empty message) to avoid LLM cost:
    // healthy service -> 400 (validation), unhealthy/proxy -> 5xx or throw.
    const probe = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey
      },
      body: JSON.stringify({ message: '', source: 'website' }),
      cache: 'no-store',
      signal: AbortSignal.timeout(4000)
    })
    // Distinguish healthy vs proxy 404: healthy POST never 404, only 200/400/401.
    // pilatesvillacrespo.api.atenzia.tech down returns 404 text/plain "404 page not found" (Go).
    // Treat 404 and 5xx as unavailable.
    if (probe.status === 404 || probe.status >= 500) {
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
