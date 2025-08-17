import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://edmtl.com'

  // Main pages
  const routes = [
    '',
    '/fr',
    '/services',
    '/services/window-cleaning',
    '/services/gutter-services',
    '/services/pressure-washing',
    '/services/deck-refinishing',
    '/contact',
    '/gallery',
    '/menu',
  ]

  // Locale variations
  const sitemapEntries = routes.flatMap(route => {
    if (route.startsWith('/fr')) {
      return [{
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '/fr' ? 1 : 0.8,
      }]
    }

    return [
      {
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
      },
      {
        url: `${baseUrl}/fr${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
      },
    ]
  })

  return sitemapEntries
}
