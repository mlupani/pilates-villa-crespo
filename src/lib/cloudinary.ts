import crypto from 'node:crypto'

export interface CloudinaryUploadResult {
  secure_url: string
  url: string
  public_id: string
  width: number
  height: number
  format: string
  bytes: number
}

function getCloudName (): string | null {
  return (
    process.env.CLOUDINARY_CLOUD_NAME?.trim() ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() ||
    null
  )
}

function getUploadPreset (): string | null {
  return process.env.CLOUDINARY_UPLOAD_PRESET?.trim() || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET?.trim() || null
}

function getApiKey (): string | null {
  return process.env.CLOUDINARY_API_KEY?.trim() || null
}

function getApiSecret (): string | null {
  return process.env.CLOUDINARY_API_SECRET?.trim() || null
}

export function getCloudinaryConfig () {
  const cloudName = getCloudName()
  const uploadPreset = getUploadPreset()
  const apiKey = getApiKey()
  const apiSecret = getApiSecret()

  // signed upload needs cloudName + apiKey + apiSecret
  // unsigned needs cloudName + uploadPreset
  const canUnsigned = Boolean(cloudName && uploadPreset)
  const canSigned = Boolean(cloudName && apiKey && apiSecret)

  return {
    cloudName,
    uploadPreset,
    apiKey,
    apiSecret,
    canUpload: canUnsigned || canSigned,
    mode: canUnsigned ? 'unsigned' as const : canSigned ? 'signed' as const : null
  }
}

export function isCloudinaryConfigured (): boolean {
  return getCloudinaryConfig().canUpload
}

function signParams (params: Record<string, string>, apiSecret: string): string {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&')
  return crypto.createHash('sha1').update(toSign + apiSecret).digest('hex')
}

export async function uploadToCloudinary (
  file: File | Blob,
  opts?: { folder?: string; publicId?: string; filename?: string }
): Promise<CloudinaryUploadResult> {
  const { cloudName, uploadPreset, apiKey, apiSecret, canUpload, mode } = getCloudinaryConfig()

  if (!cloudName || !canUpload) {
    throw new Error(
      'Cloudinary no configurado. Definí CLOUDINARY_CLOUD_NAME + CLOUDINARY_UPLOAD_PRESET (unsigned) o CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET (signed).'
    )
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

  const form = new FormData()
  // Cloudinary expects field name "file"
  form.append('file', file, (opts?.filename as string) ?? 'logo')

  if (opts?.folder) form.append('folder', opts.folder)
  if (opts?.publicId) form.append('public_id', opts.publicId)

  if (mode === 'unsigned' && uploadPreset) {
    form.append('upload_preset', uploadPreset)
  } else if (mode === 'signed') {
    if (!apiKey || !apiSecret) throw new Error('Faltan CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET para firma')
    const timestamp = String(Math.round(Date.now() / 1000))
    const params: Record<string, string> = { timestamp }
    if (opts?.folder) params.folder = opts.folder
    if (opts?.publicId) params.public_id = opts.publicId
    const signature = signParams(params, apiSecret)
    form.append('timestamp', timestamp)
    form.append('api_key', apiKey)
    form.append('signature', signature)
  }

  const res = await fetch(endpoint, { method: 'POST', body: form })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Cloudinary upload falló (${res.status}): ${text.slice(0, 500)}`)
  }

  const json = (await res.json()) as CloudinaryUploadResult
  if (!json.secure_url) throw new Error('Cloudinary no devolvió secure_url')
  return json
}

export function getLogoFolder (): string {
  return process.env.CLOUDINARY_LOGO_FOLDER?.trim() || 'pilates-villa-crespo/brand'
}
