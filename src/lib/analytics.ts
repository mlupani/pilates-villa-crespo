import { routes } from '@/lib/routes'
import { isPendingValue } from '@/lib/site'

export const analyticsEvents = {
  clickWhatsapp: 'click_whatsapp',
  clickReservarClase: 'click_reservar_clase',
  clickClasePrueba: 'click_clase_prueba',
  clickVerHorarios: 'click_ver_horarios',
  clickContacto: 'click_contacto',
  assistantOpen: 'assistant_open',
  assistantInteract: 'assistant_interact',
  generateLead: 'generate_lead'
} as const

export type AnalyticsEventName = typeof analyticsEvents[keyof typeof analyticsEvents]

export type FunnelStep = 'interes' | 'conversion' | 'lead' | 'reserva'
export type ContactMethod = 'whatsapp' | 'phone' | 'email' | 'maps' | 'instagram' | 'google' | 'facebook' | 'other'
export type LeadType = 'contact' | 'trial_class'
export type AssistantSource = 'fab' | 'hash' | 'link'
export type AssistantInteraction = 'message' | 'quick_reply' | 'cta'

export interface AnalyticsParams {
  page_path?: string
  page_title?: string
  section?: string
  link_url?: string
  link_text?: string
  source?: string
  funnel_step?: FunnelStep
  contact_method?: ContactMethod
  lead_type?: LeadType
  interaction_type?: AssistantInteraction
}

export interface ClassifiedClick {
  name: AnalyticsEventName
  params: Pick<AnalyticsParams, 'funnel_step' | 'contact_method'>
}

export function getGaMeasurementId () {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()
  if (!id || isPendingValue(id)) return null
  if (!/^G-[A-Z0-9]+$/i.test(id)) return null
  return id
}

function normalizePath (pathname: string) {
  if (!pathname || pathname === '/') return '/'
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

function resolveUrl (href: string) {
  try {
    return new URL(href, 'https://local.invalid')
  } catch {
    return null
  }
}

export function classifyClick (href: string): ClassifiedClick | null {
  const raw = href.trim()
  if (!raw || raw === '#') return null

  const url = resolveUrl(raw)
  if (!url) return null

  const host = url.hostname.replace(/^www\./, '')
  const path = normalizePath(url.pathname)
  const hash = url.hash

  if (host === 'wa.me' || host.includes('whatsapp')) {
    return {
      name: analyticsEvents.clickWhatsapp,
      params: { funnel_step: 'conversion', contact_method: 'whatsapp' }
    }
  }

  if (url.protocol === 'tel:') {
    return {
      name: analyticsEvents.clickContacto,
      params: { funnel_step: 'interes', contact_method: 'phone' }
    }
  }

  if (url.protocol === 'mailto:') {
    return {
      name: analyticsEvents.clickContacto,
      params: { funnel_step: 'interes', contact_method: 'email' }
    }
  }

  if (host.includes('maps.google.') || (host.includes('google.') && path.includes('/maps'))) {
    return {
      name: analyticsEvents.clickContacto,
      params: { funnel_step: 'interes', contact_method: 'maps' }
    }
  }

  if (host.includes('instagram.com')) {
    return {
      name: analyticsEvents.clickContacto,
      params: { funnel_step: 'interes', contact_method: 'instagram' }
    }
  }

  if (host.includes('facebook.com')) {
    return {
      name: analyticsEvents.clickContacto,
      params: { funnel_step: 'interes', contact_method: 'facebook' }
    }
  }

  if (host.includes('g.page') || host.includes('business.google') || host.includes('google.com/maps')) {
    return {
      name: analyticsEvents.clickContacto,
      params: { funnel_step: 'interes', contact_method: 'google' }
    }
  }

  if (hash === '#asistente') {
    return {
      name: analyticsEvents.clickReservarClase,
      params: { funnel_step: 'conversion' }
    }
  }

  if (hash === '#horarios' || path === routes.schedule) {
    return {
      name: analyticsEvents.clickVerHorarios,
      params: { funnel_step: 'interes' }
    }
  }

  if (path === routes.trial) {
    return {
      name: analyticsEvents.clickClasePrueba,
      params: { funnel_step: 'interes' }
    }
  }

  if (hash === '#contacto' || hash === '#ubicacion') {
    return {
      name: analyticsEvents.clickContacto,
      params: { funnel_step: 'interes', contact_method: 'other' }
    }
  }

  return null
}
