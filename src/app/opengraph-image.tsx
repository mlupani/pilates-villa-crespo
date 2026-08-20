/* eslint-disable @next/next/no-img-element -- ImageResponse only supports <img> */
import { ImageResponse } from 'next/og'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

export const alt = 'Logo de Pilates Villa Crespo'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const logoData = await readFile(
  join(process.cwd(), 'public/logo.jpg'),
  'base64'
)
const logoSrc = `data:image/jpeg;base64,${logoData}`

export default async function OpenGraphImage () {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F6F1EA'
        }}
      >
        <img
          src={logoSrc}
          width={480}
          height={480}
          alt=''
        />
      </div>
    ),
    { ...size }
  )
}
