'use client';

import Head from 'next/head';
import { ServiceMetadataItem } from '../lib/seo';

interface SEOHeadProps {
  metadata: ServiceMetadataItem;
  locale: string;
  structuredData?: object;
}

export default function SEOHead({ metadata, locale, structuredData }: SEOHeadProps) {
  const jsonLd = structuredData || {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Entretien Domestique Montreal (EDM)",
    "image": "/images/edm-main-logo.png",
    "telephone": "(438) 500-3099",
    "email": "info@edmtl.ca",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Montreal",
      "addressRegion": "QC",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.5017,
      "longitude": -73.5673
    },
    "url": "https://edmtl.ca",
    "sameAs": [
      "https://www.google.com/maps/place/Montreal,+QC",
    ],
    "openingHours": "Mo-Fr 08:00-18:00, Sa 09:00-17:00",
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50",
      "bestRating": "5"
    }
  };

  return (
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords.join(', ')} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Entretien Domestique Montreal" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={`https://edmtl.ca${metadata.canonical}`} />
      <meta property="og:site_name" content="Entretien Domestique Montreal" />
      <meta property="og:image" content="/images/edm-main-logo.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={locale === 'fr' ? 'fr_CA' : 'en_CA'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content="/images/edm-main-logo.png" />

      {/* Canonical URL */}
      <link rel="canonical" href={`https://edmtl.ca${metadata.canonical}`} />

      {/* Alternate language links */}
      <link rel="alternate" hrefLang="en" href={`https://edmtl.ca${metadata.alternateUrls.en}`} />
      <link rel="alternate" hrefLang="fr" href={`https://edmtl.ca${metadata.alternateUrls.fr}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://edmtl.ca${metadata.alternateUrls.en}`} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </Head>
  );
}
