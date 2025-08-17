import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EDMTL - Entretien Domestique Montreal',
    short_name: 'EDMTL',
    description: 'Professional home maintenance services in Montreal. Window cleaning, gutter services, pressure washing, and deck refinishing.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1f2937',
    theme_color: '#FFB800',
    icons: [
      {
        src: '/icon-192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
