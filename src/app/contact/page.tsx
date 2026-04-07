import { Suspense } from 'react';
import { Metadata } from 'next';
import Footer from '../../components/Footer';
import ContactFormSection from '../../components/ContactFormSection';
import SubpageHeader from '../../components/SubpageHeader';
import siteConfig from '../../../config/site.json';

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
  const phone = siteConfig.contact.phone;
  const email = siteConfig.contact.email;

  return (
    <div className="min-h-screen hex-pattern bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }}
      />

      <SubpageHeader />

      {/* Hero */}
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] tracking-tight mb-4">
            Get Your Free Quote
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            Ready to transform your property? Contact us today for a no-obligation quote on any of our
            professional home maintenance services.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <Suspense>
        <ContactFormSection />
      </Suspense>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-20 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
            Prefer to talk?
          </h2>
          <p className="mt-3 text-[var(--text-muted)] text-lg">
            Give us a call — we&apos;re happy to discuss your project
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${phone.replace(/-/g, '')}`}
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call 438-500-3099
            </a>
            <a
              href={`mailto:${email}`}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
