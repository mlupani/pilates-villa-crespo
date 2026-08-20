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
