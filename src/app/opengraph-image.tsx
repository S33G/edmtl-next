import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'EDMTL - Entretien Domestique Montreal'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            background: '#FFB800',
            width: 200,
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            marginBottom: 40,
            fontSize: 48,
            fontWeight: 'bold',
            color: '#000',
          }}
        >
          EDM
        </div>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            margin: 0,
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          ENTRETIEN DOMESTIQUE
        </h1>
        <h2
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            margin: 0,
            textAlign: 'center',
            color: '#FFB800',
          }}
        >
          MONTREAL
        </h2>
        <p
          style={{
            fontSize: 28,
            margin: 0,
            marginTop: 30,
            textAlign: 'center',
            color: '#d1d5db',
          }}
        >
          Professional Home Maintenance Services
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}
