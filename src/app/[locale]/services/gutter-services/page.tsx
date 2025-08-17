'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HiHomeModern,
  HiWrenchScrewdriver,
  HiShieldCheck
} from 'react-icons/hi2';
import ServiceHeader from '../../../../components/ServiceHeader';
import SEOHead from '../../../../components/SEOHead';
import { getServiceMetadata } from '../../../../lib/seo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GutterServicesPage({ params }: any) {
  const [mounted, setMounted] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(params.locale || 'en');
  const locale = params.locale || 'en';
  const metadata = getServiceMetadata('gutter-services', locale);

  useEffect(() => {
    setMounted(true);
    setCurrentLocale(locale);
  }, [locale]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--background-secondary)] dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-pulse text-[var(--primary)] dark:text-[var(--primary)]">Loading...</div>
      </div>
    );
  }

  const homeUrl = locale === 'en' ? '/' : `/${locale}`;

  const content = {
    en: {
      title: 'Complete Gutter Solutions',
      description: 'Protect your home with professional gutter cleaning, maintenance, and installation services. Prevent water damage and maintain your property\'s integrity year-round.',
      backToHome: 'Back to Home',
      services: [
        {
          title: 'Gutter Cleaning',
          description: 'Complete removal of debris, leaves, and buildup. Hand cleaning ensures thorough results and proper water flow.',
          icon: HiHomeModern
        },
        {
          title: 'Exterior Cleaning',
          description: 'Professional cleaning of gutter exteriors to restore appearance and prevent staining.',
          icon: HiHomeModern
        },
        {
          title: 'Repairs & Blockages',
          description: 'Fix leaks, unclog downspouts, and repair damaged sections to ensure optimal performance.',
          icon: HiWrenchScrewdriver
        },
        {
          title: 'Gutter Guards',
          description: 'Professional installation of gutter protection systems to reduce maintenance needs.',
          icon: HiShieldCheck
        }
      ]
    },
    fr: {
      title: 'Solutions Complètes de Gouttières',
      description: 'Protégez votre maison avec nos services professionnels de nettoyage, entretien et installation de gouttières. Prévenez les dégâts d\'eau et maintenez l\'intégrité de votre propriété toute l\'année.',
      backToHome: 'Retour à l\'accueil',
      services: [
        {
          title: 'Nettoyage de Gouttières',
          description: 'Enlèvement complet des débris, feuilles et accumulations. Le nettoyage manuel assure des résultats minutieux et un écoulement d\'eau optimal.',
          icon: HiWrenchScrewdriver
        },
        {
          title: 'Nettoyage Extérieur',
          description: 'Nettoyage professionnel de l\'extérieur des gouttières pour restaurer l\'apparence et prévenir les taches.',
          icon: HiHomeModern
        },
        {
          title: 'Réparations et Blocages',
          description: 'Réparer les fuites, déboucher les descentes pluviales et réparer les sections endommagées pour assurer une performance optimale.',
          icon: HiWrenchScrewdriver
        },
        {
          title: 'Protections de Gouttières',
          description: 'Installation professionnelle de systèmes de protection de gouttières pour réduire les besoins d\'entretien.',
          icon: HiShieldCheck
        }
      ]
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
    "serviceType": "Gutter Services"
  };

  return (
    <>
      <SEOHead
        metadata={metadata}
        locale={locale}
        structuredData={structuredData}
      />
      <div className="min-h-screen hex-pattern bg-[var(--background-secondary)] text-[var(--foreground)] transition-colors duration-300">
        <ServiceHeader
          locale={currentLocale}
          onLocaleChange={handleLocaleChange}
        />

        <main>
          <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 text-[var(--primary)] dark:text-[var(--primary)] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HiHomeModern className="w-4 h-4" />
            <span>Professional Gutter Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] dark:text-[var(--foreground)] mb-6">
            {t.title}
          </h1>
          <p className="text-xl text-[var(--text-muted)] dark:text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {t.services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="bg-[var(--background-secondary)] dark:bg-[var(--background-secondary)] rounded-2xl shadow-sm border border-[var(--border)] dark:border-[var(--border)] p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 rounded-xl flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-[var(--primary)] dark:text-[var(--primary)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] dark:text-[var(--foreground)] mb-3">{service.title}</h3>
                <p className="text-[var(--text-muted)] dark:text-[var(--text-muted)] text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-[var(--primary)] to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-2xl p-8 text-center text-[var(--foreground)]">
          <h2 className="text-2xl font-bold mb-4">
            {locale === 'fr' ? 'Prêt pour des Gouttières Parfaites?' : 'Ready for Perfect Gutters?'}
          </h2>
          <p className="text-[var(--primary)] dark:text-[var(--primary)] mb-6 max-w-2xl mx-auto">
            {locale === 'fr'
              ? 'Obtenez un devis gratuit pour nos services professionnels de gouttières.'
              : 'Get a free quote for professional gutter services.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Link
                href={homeUrl}
                className="bg-[var(--background-secondary)] text-[var(--foreground)] hover:bg-[var(--background-secondary)] dark:bg-[var(--background-secondary)] dark:hover:bg-[var(--background-secondary)] px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
              >
              {locale === 'fr' ? 'Devis Gratuit' : 'Get Free Quote'}
            </Link>
            <a
              href="tel:438-500-3099"
              className="bg-[var(--background-secondary)] text-[var(--foreground)] hover:bg-[var(--background-secondary)] dark:bg-[var(--background-secondary)] dark:hover:bg-[var(--background-secondary)] px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
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
