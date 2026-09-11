import { MetadataRoute } from 'next';
import { getServices } from '@/lib/services';
import { locales, localizedPath } from '@/lib/i18n';
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/contact', '/faq', '/gallery', '/privacy-policy', ...getServices('en').map(service => `/services/${service.slug}`)];
  return locales.flatMap(locale => routes.map(route => ({ url: `https://edmtl.com${localizedPath(locale, route)}`, changeFrequency: 'monthly' as const, priority: route === '/' ? 1 : route.startsWith('/services/') ? 0.8 : 0.6, alternates: { languages: { 'en-CA': `https://edmtl.com${localizedPath('en', route)}`, 'fr-CA': `https://edmtl.com${localizedPath('fr', route)}`, 'x-default': `https://edmtl.com${localizedPath('en', route)}` } } })));
}
