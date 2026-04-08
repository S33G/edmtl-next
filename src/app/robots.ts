import { MetadataRoute } from 'next'

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      crawlDelay: 1,
    },
    sitemap: 'https://edmtl.com/sitemap.xml',
  }
}
