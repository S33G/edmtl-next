import { ImageResponse } from 'next/og'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import servicesData from '../../../../config/services.json'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Service {
  slug: string
  pageTitle: string
  subtitle: string
}

const serviceHeroImages: Record<string, string> = {
  'window-cleaning': 'images/services/window-cleaning-header.png',
  'gutter-cleaning': 'images/services/gutter-services-header.png',
  'pressure-washing': 'images/services/pressure-washing.png',
  'deck-staining': 'images/services/deck-refinishing-header.png',
  'commercial-window-cleaning': 'images/services/commercial-window-cleaning.png',
  'exterior-maintenance': 'images/services/moss-removal.png',
}

function readImageAsBase64(relativePath: string): string | null {
  try {
    const fullPath = path.join(process.cwd(), 'public', relativePath)
    if (!existsSync(fullPath)) return null
    const buffer = readFileSync(fullPath)
    const ext = path.extname(relativePath).slice(1).toLowerCase()
    const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'jpeg' : 'png'
    return `data:image/${mimeType};base64,${buffer.toString('base64')}`
  } catch {
    return null
  }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = (servicesData.services as Service[]).find(s => s.slug === slug)

  const cubeLogoSrc = readImageAsBase64('images/edm-box-logo.png')
  const logoSrc = readImageAsBase64('images/edmtl-logo.png')
  const heroSrc = serviceHeroImages[slug]
    ? readImageAsBase64(serviceHeroImages[slug])
    : null

  if (!heroSrc) {
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
          {logoSrc && (
            <img
              src={logoSrc}
              alt="EDMTL - Entretien Domestique Montreal"
              style={{ width: 500, height: 'auto', objectFit: 'contain', marginBottom: 40 }}
            />
          )}
          {service && (
            <>
              <p
                style={{
                  fontSize: 44,
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 0,
                  textAlign: 'center',
                  letterSpacing: '-0.01em',
                }}
              >
                {service.pageTitle}
              </p>
              <p
                style={{
                  fontSize: 24,
                  color: '#FFB800',
                  margin: '16px 0 0',
                  textAlign: 'center',
                }}
              >
                {service.subtitle}
              </p>
            </>
          )}
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

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <img
          src={heroSrc}
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.12) 100%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '48px 56px',
          }}
        >
          {cubeLogoSrc && (
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                background: 'white',
                borderRadius: 10,
                padding: '6px 14px',
                marginBottom: 22,
              }}
            >
              <img
                src={cubeLogoSrc}
                alt="EDMTL"
                style={{ height: 52, width: 'auto', objectFit: 'contain' }}
              />
            </div>
          )}

          {service && (
            <>
              <p
                style={{
                  fontSize: 52,
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 0,
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                }}
              >
                {service.pageTitle}
              </p>
              <p
                style={{
                  fontSize: 26,
                  color: '#FFB800',
                  margin: '14px 0 0',
                  fontWeight: 500,
                }}
              >
                {service.subtitle}
              </p>
            </>
          )}
        </div>

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
