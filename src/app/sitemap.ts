import { MetadataRoute } from 'next'
import servicesData from '../../config/services.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://edmtl.com'

  const staticRoutes = [
    { path: '', priority: 1 },
    { path: '/contact', priority: 0.9 },
  ]

  const serviceRoutes = servicesData.services.map((service) => ({
    path: `/services/${service.slug}`,
    priority: 0.8,
  }))

  const allRoutes = [...staticRoutes, ...serviceRoutes]

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route.priority,
  }))
}
