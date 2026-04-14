import { Suspense } from 'react';
import { Metadata } from 'next';
import Footer from '../../components/Footer';
import ContactFormSection from '../../components/ContactFormSection';
import SubpageHeader from '../../components/SubpageHeader';
import { ContactHero, ContactBottomCTA } from '../../components/ContactPageSections';

export const metadata: Metadata = {
  title: 'Contact Us - Free Quote',
  description:
    'Contact EDMTL for a free quote on window cleaning, gutter cleaning, pressure washing, and deck staining services in Montreal. Call 438-500-3099 or fill out our online form.',
  keywords:
    'contact EDMTL, free quote Montreal, window cleaning quote, gutter cleaning quote, pressure washing quote, Montreal home maintenance contact',
  openGraph: {
    title: 'Contact Us - Free Quote | EDMTL',
    description:
      'Get a free quote for professional home maintenance services in Montreal. Window cleaning, gutter services, pressure washing, and more.',
    url: 'https://edmtl.com/contact',
    type: 'website',
  },
  alternates: {
    canonical: 'https://edmtl.com/contact',
  },
};

const contactStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  mainEntity: {
    '@type': 'LocalBusiness',
    name: 'EDMTL - Entretien Domestique Montreal',
    telephone: '438-500-3099',
    email: 'info@edmtl.com',
    url: 'https://edmtl.com',
    areaServed: [
      { '@type': 'City', name: 'Montreal', addressRegion: 'Quebec', addressCountry: 'CA' },
      { '@type': 'City', name: 'Laval', addressRegion: 'Quebec', addressCountry: 'CA' },
      { '@type': 'City', name: 'Saint-Lazare', addressRegion: 'Quebec', addressCountry: 'CA' },
      { '@type': 'City', name: 'Vaudreuil-Dorion', addressRegion: 'Quebec', addressCountry: 'CA' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '19:00',
    },
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen hex-pattern bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }}
      />

      <SubpageHeader />

      <ContactHero />

      <Suspense>
        <ContactFormSection />
      </Suspense>

      <ContactBottomCTA />

      <Footer />
    </div>
  );
}
