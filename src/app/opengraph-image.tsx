import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import path from 'path'

export const dynamic = 'force-static'
export const alt = 'EDMTL - Entretien Domestique Montreal'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  const logoBuffer = readFileSync(
    path.join(process.cwd(), 'public', 'images', 'edmtl-logo.png')
  )
  const logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: -120,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,184,0,0.06) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,184,0,0.04) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        <img
          src={logoSrc}
          alt="EDMTL - Entretien Domestique Montreal"
          style={{
            width: 580,
            height: 'auto',
            objectFit: 'contain',
          }}
        />

        <div
          style={{
            width: 60,
            height: 3,
            background: '#FFB800',
            marginTop: 36,
            marginBottom: 28,
            display: 'flex',
            borderRadius: 2,
          }}
        />

        <p
          style={{
            fontSize: 26,
            margin: 0,
            color: '#9ca3af',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Professional Home Maintenance
        </p>

        <p
          style={{
            fontSize: 20,
            margin: '12px 0 0',
            color: '#FFB800',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Montréal · Laval · West Island
        </p>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, #FFB800 0%, #FFA500 50%, #FFB800 100%)',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
