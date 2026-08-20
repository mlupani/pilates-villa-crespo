function withHttps (value: string) {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value
  }

  return `https://${value}`
}

export function getSiteUrl () {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return new URL(withHttps(explicit))

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (production) return new URL(withHttps(production))

  const vercel = process.env.VERCEL_URL
  if (vercel) return new URL(withHttps(vercel))

  return new URL('http://localhost:3000')
}

export function getAbsoluteUrl (path = '/') {
  return new URL(path, getSiteUrl()).toString()
}

export function isIndexable () {
  if (process.env.NEXT_PUBLIC_NO_INDEX === 'true') return false
  if (process.env.VERCEL_ENV) return process.env.VERCEL_ENV === 'production'
  return process.env.NODE_ENV === 'production'
}

export function isPendingValue (value: string | null | undefined) {
  if (!value) return true
  const trimmed = value.trim()
  return (
    trimmed.length === 0 ||
    trimmed.startsWith('TODO_') ||
    trimmed === 'WHATSAPP_NUMBER'
  )
}

export function envOrPlaceholder (value: string | undefined, placeholder: string) {
  const trimmed = value?.trim()
  return trimmed || placeholder
}
