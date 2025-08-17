import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 512,
  height: 512,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FFB800',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000',
          fontWeight: 'bold',
          fontSize: 180,
          borderRadius: 64,
        }}
      >
        EDM
      </div>
    ),
    {
      ...size,
    }
  )
}
