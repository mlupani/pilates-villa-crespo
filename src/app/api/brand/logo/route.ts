import { NextResponse } from 'next/server'
import { getCloudinaryConfig, getLogoFolder, uploadToCloudinary } from '@/lib/cloudinary'

export const runtime = 'nodejs'

const MAX_BYTES = 4 * 1024 * 1024 // 4MB
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/avif'])

function isValidUrl (value: string): boolean {
  try {
    const u = new URL(value)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

// GET -> devuelve config actual (útil para la UI de personalización)
export async function GET () {
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL?.trim() ?? ''
  const cfg = getCloudinaryConfig()
  return NextResponse.json({
    logoUrl: logoUrl || '/logo.png',
    isCustom: Boolean(logoUrl),
    cloudinary: {
      configured: cfg.canUpload,
      mode: cfg.mode,
      cloudName: cfg.cloudName ?? null,
      hasPreset: Boolean(cfg.uploadPreset)
    }
  })
}

// POST -> multipart/form-data con `file` o JSON con `{ url }`
// Si se envía file: se sube a Cloudinary y devuelve { secure_url }
// Si se envía url: se valida y devuelve { url }
export async function POST (req: Request) {
  const contentType = req.headers.get('content-type') ?? ''

  // JSON -> validar URL directa (sin subir)
  if (contentType.includes('application/json')) {
    const body = (await req.json().catch(() => null)) as { url?: string } | null
    const url = body?.url?.trim()
    if (!url) return NextResponse.json({ error: 'Falta el campo `url`' }, { status: 400 })
    if (!isValidUrl(url)) return NextResponse.json({ error: 'URL inválida. Usá http(s)://...' }, { status: 400 })
    // opcional: avisar si no es imagen por extensión, pero no bloqueamos (puede ser cloudinary transform url)
    return NextResponse.json({ url, secure_url: url, mode: 'url' })
  }

  // FormData -> file upload
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Body debe ser multipart/form-data con campo `file` o JSON con `url`' }, { status: 400 })
  }

  // Permitir también url por form-data
  const urlFromForm = (form.get('url') as string | null)?.trim()
  if (urlFromForm && !form.get('file')) {
    if (!isValidUrl(urlFromForm)) return NextResponse.json({ error: 'URL inválida' }, { status: 400 })
    return NextResponse.json({ url: urlFromForm, secure_url: urlFromForm, mode: 'url' })
  }

  const file = form.get('file') as File | null
  if (!file || typeof (file as File).arrayBuffer !== 'function') {
    return NextResponse.json({ error: 'Falta el archivo `file`. Adjuntá una imagen o enviá { url }.' }, { status: 400 })
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: `Archivo muy grande (máx ${MAX_BYTES / 1024 / 1024}MB)` }, { status: 400 })
  }
  if (file.type && !ALLOWED_TYPES.has(file.type)) {
    // no bloqueamos svg estricto pero avisamos; permitimos igual si es image/*
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: `Tipo no permitido: ${file.type}. Subí JPG, PNG, WebP o SVG.` }, { status: 400 })
    }
  }

  const cfg = getCloudinaryConfig()
  if (!cfg.canUpload) {
    return NextResponse.json(
      {
        error:
          'Cloudinary no configurado en el servidor. Configurá CLOUDINARY_CLOUD_NAME + CLOUDINARY_UPLOAD_PRESET (unsigned) o CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET.',
        hint: 'Para probar sin Cloudinary, podés usar directamente la opción URL.'
      },
      { status: 503 }
    )
  }

  try {
    const result = await uploadToCloudinary(file, {
      folder: getLogoFolder(),
      filename: (file as File).name || 'logo'
    })
    return NextResponse.json({
      url: result.secure_url,
      secure_url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      mode: 'cloudinary' as const,
      // sugerencia para .env
      envLine: `NEXT_PUBLIC_LOGO_URL=${result.secure_url}`
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error desconocido en upload'
    return NextResponse.json({ error: msg }, { status: 502 })
  }
}
