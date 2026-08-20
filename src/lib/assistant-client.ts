import {
  assistantResponseSchema,
  type AssistantClientRequest,
  type AssistantResponse
} from '@/lib/schemas'

export async function sendAssistantMessage (
  input: AssistantClientRequest
): Promise<AssistantResponse> {
  const response = await fetch('/api/assistant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...input,
      source: 'website'
    })
  })

  if (!response.ok) {
    throw new Error('ASSISTANT_UNAVAILABLE')
  }

  const parsed = assistantResponseSchema.safeParse(await response.json())
  if (!parsed.success) {
    throw new Error('ASSISTANT_INVALID_RESPONSE')
  }

  return parsed.data
}
