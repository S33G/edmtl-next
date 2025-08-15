'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HiSparkles
} from 'react-icons/hi2';
import ServiceHeader from '../../../../components/ServiceHeader';
import SEOHead from '../../../../components/SEOHead';
import { getServiceMetadata } from '../../../../lib/seo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PressureWashingPage({ params }: any) {
  const [mounted, setMounted] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(params.locale || 'en');
  const locale = params.locale || 'en';
  const metadata = getServiceMetadata('pressure-washing', locale);

  useEffect(() => {
    setMounted(true);
    setCurrentLocale(locale);
  }, [locale]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--background-secondary)] dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-pulse text-[var(--primary)] dark:text-teal-400">Loading...</div>
      </div>
    );
  }

  const homeUrl = locale === 'en' ? '/' : `/${locale}`;

  const content = {
    en: {
      title: 'Professional Pressure Washing',
      description: 'Restore the beauty of your property with our professional pressure washing services. We use advanced equipment and techniques to clean driveways, patios, decks, siding, and more.',
      backToHome: 'Back to Home'
    },
    fr: {
      title: 'Lavage à Pression Professionnel',
      description: 'Redonnez de la beauté à votre propriété avec nos services professionnels de lavage à pression. Nous utilisons des équipements avancés et des techniques pour nettoyer allées, patios, terrasses, revêtements et plus.',
      backToHome: 'Retour à l\'accueil'
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  const handleLocaleChange = (newLocale: string) => {
    setCurrentLocale(newLocale);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t.title,
    "description": t.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Entretien Domestique Montreal",
      "telephone": "(438) 500-3099",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Montreal",
        "addressRegion": "QC",
        "addressCountry": "CA"
      }
    },
    "areaServed": "Montreal, QC",
    "serviceType": "Pressure Washing"
  };

  return (
    <>
      <SEOHead
        metadata={metadata}
        locale={locale}
        structuredData={structuredData}
      />
      <div className="min-h-screen hex-pattern bg-gray-900 text-[var(--foreground)] transition-colors duration-300">
        <ServiceHeader
          locale={currentLocale}
          onLocaleChange={handleLocaleChange}
        />

        <main>
          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-[var(--primary)]/10 dark:bg-teal-900/30 text-[var(--primary)] dark:text-teal-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <HiSparkles className="w-4 h-4" />
                <span>Professional Pressure Washing</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 dark:text-yellow-300 mb-6">
                {t.title}
              </h1>
              <p className="text-xl text-gray-300 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t.description}
              </p>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-[var(--primary)] to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-2xl p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">
                {locale === 'fr' ? 'Prêt pour un Nettoyage Professionnel?' : 'Ready for Professional Cleaning?'}
              </h2>
              <p className="text-blue-100 dark:text-blue-200 mb-6 max-w-2xl mx-auto">
                {locale === 'fr'
                  ? 'Obtenez un devis gratuit pour nos services de lavage à pression.'
                  : 'Get a free quote for pressure washing services.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                  <Link
                    href={homeUrl}
                    className="bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                  >
                  {locale === 'fr' ? 'Devis Gratuit' : 'Get Free Quote'}
                </Link>
                <a
                  href="tel:438-500-3099"
                  className="bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-800 px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  {locale === 'fr' ? 'Appelez (438) 500-3099' : 'Call (438) 500-3099'}
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
