import { after } from 'next/server'
import { leadCaptureSchema } from '@/lib/schemas'

async function forwardLead (webhook: string, payload: unknown) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }
  const secret = process.env.LEADS_WEBHOOK_SECRET?.trim()
  if (secret) headers.Authorization = `Bearer ${secret}`

  await fetch(webhook, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  })
}

export async function POST (request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }

  const parsed = leadCaptureSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ ok: false }, { status: 400 })
  }

  const webhook = process.env.LEADS_WEBHOOK_URL?.trim()
  if (webhook) {
    const payload = parsed.data
    after(async () => {
      try {
        await forwardLead(webhook, payload)
      } catch {
        // El envío al CRM no debe afectar la respuesta al visitante.
      }
    })
  }

  return Response.json({
    ok: true,
    forwarded: Boolean(webhook)
  })
}
