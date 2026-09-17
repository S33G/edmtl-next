import { MetadataRoute } from 'next'

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EDMTL - Entretien Domestique Montreal',
    short_name: 'EDMTL',
    description: 'Professional home maintenance services in Montreal. Window cleaning, gutter services, pressure washing, and deck refinishing.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F9F6F0',
    theme_color: '#F9F6F0',
    icons: [
      {
        src: '/images/app-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/app-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/images/app-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
