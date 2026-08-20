'use client'

import { analyticsEvents } from '@/lib/analytics'
import { track } from '@/lib/track'
import type { LeadCaptureInput } from '@/lib/schemas'

export function captureLead (input: Omit<LeadCaptureInput, 'page_path' | 'occurred_at'> & {
  page_path?: string
  occurred_at?: string
}) {
  const leadType = input.variant === 'reserva' ? 'trial_class' : 'contact'

  track(analyticsEvents.generateLead, {
    funnel_step: input.variant === 'reserva' ? 'reserva' : 'lead',
    lead_type: leadType,
    source: 'assistant'
  })

  const payload = {
    ...input,
    page_path: input.page_path || window.location.pathname,
    occurred_at: input.occurred_at || new Date().toISOString()
  }

  fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true
  }).catch(() => undefined)
}
