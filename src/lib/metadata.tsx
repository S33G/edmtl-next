import { Metadata } from 'next';
import { Locale, localizedPath } from './i18n';
import site from '../../config/site.json';

export const baseUrl = 'https://edmtl.com';

export function pageMetadata(locale: Locale, path: string, title: string, description: string, noindex = false): Metadata {
  const url = `${baseUrl}${localizedPath(locale, path)}`;
  const image = localizedPath(locale, path.startsWith('/services/') ? `${path}/opengraph-image` : '/opengraph-image');
  return {
    title: `${title} | EDMTL`, description, metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        'en-CA': `${baseUrl}${localizedPath('en', path)}`,
        'fr-CA': `${baseUrl}${localizedPath('fr', path)}`,
        'x-default': `${baseUrl}${localizedPath('en', path)}`,
      },
    },
    openGraph: {
      title: `${title} | EDMTL`, description, url, siteName: 'EDMTL', type: 'website',
      locale: locale === 'en' ? 'en_CA' : 'fr_CA', alternateLocale: locale === 'en' ? 'fr_CA' : 'en_CA',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title: `${title} | EDMTL`, description, images: [image] },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    icons: { icon: '/favicon.ico', apple: '/apple-icon' }, manifest: '/manifest.webmanifest',
  };
}

export function businessData() {
  return { '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', '@id': `${baseUrl}/#business`, name: 'Entretien Domestique Montréal', alternateName: 'EDMTL', url: baseUrl, telephone: site.contact.phone, email: site.contact.email, logo: `${baseUrl}/images/edm-box-logo.png`, areaServed: ['Montréal', 'West Island', 'Laval', 'South Shore', 'Saint-Lazare', 'Vaudreuil-Dorion'], sameAs: [site.contact.googleMapsUrl] };
}

export function breadcrumbData(locale: Locale, items: { name: string; path: string }[]) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ name: locale === 'en' ? 'Home' : 'Accueil', path: '/' }, ...items].map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: `${baseUrl}${localizedPath(locale, item.path)}` })) };
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
