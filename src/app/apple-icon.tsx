import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#C49A1A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1C1814',
          fontWeight: 'bold',
          fontSize: 64,
          borderRadius: 20,
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
