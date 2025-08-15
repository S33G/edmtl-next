import LocalizedContent from '../components/LocalizedContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EDMTL - Professional Home Maintenance Services Montreal',
  description: 'Professional home maintenance services in Montreal. Window cleaning, gutter services, pressure washing, deck refinishing. Free quotes available. Over 10 years experience.',
  keywords: 'Montreal home maintenance, window cleaning Montreal, gutter cleaning Montreal, pressure washing, deck refinishing, home services Montreal, EDM, Entretien Domestique Montreal',
  openGraph: {
    title: 'EDMTL - Professional Home Maintenance Services Montreal',
    description: 'Professional home maintenance services in Montreal. Window cleaning, gutter services, pressure washing, deck refinishing.',
    url: 'https://edmtl.com',
    siteName: 'EDMTL',
    locale: 'en_CA',
    type: 'website',
  },
  alternates: {
    canonical: 'https://edmtl.com',
    languages: {
      'en-CA': 'https://edmtl.com',
      'fr-CA': 'https://edmtl.com/fr',
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "EDMTL - Entretien Domestique Montreal",
  "alternateName": "EDM",
  "description": "Professional home maintenance service company with over 10 years of combined experience. Specializing in window cleaning, gutter services, pressure washing, and deck refinishing.",
  "url": "https://edmtl.com",
  "telephone": "438-500-3099",
  "email": "info@edmtl.com",
  "priceRange": "$$",
  "paymentAccepted": "Credit Card, E-transfer",
  "areaServed": [
    {
      "@type": "City",
      "name": "Montreal",
      "addressRegion": "Quebec",
      "addressCountry": "CA"
    },
    {
      "@type": "City",
      "name": "Laval",
      "addressRegion": "Quebec",
      "addressCountry": "CA"
    }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "45.5017",
    "longitude": "-73.5673"
  }
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LocalizedContent />
    </>
  );
}
