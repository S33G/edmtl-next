'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ServiceHeader from '../../components/ServiceHeader';
import SEOHead from '../../components/SEOHead';
import { HiSparkles, HiHomeModern, HiWrenchScrewdriver, HiBeaker } from 'react-icons/hi2';

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  const [currentLocale, setCurrentLocale] = useState('en');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--background-secondary)] dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-pulse text-[var(--primary)] dark:text-blue-400">Loading...</div>
      </div>
    );
  }

  const handleLocaleChange = (newLocale: string) => {
    setCurrentLocale(newLocale);
  };

  const services = [
    {
      title: 'Window Cleaning',
      titleFr: 'Nettoyage de Vitres',
      description: 'Professional interior and exterior window cleaning with streak-free results.',
      descriptionFr: 'Nettoyage professionnel de vitres intérieures et extérieures avec résultats sans traces.',
      href: '/services/window-cleaning',
      icon: HiSparkles,
      color: 'blue'
    },
    {
      title: 'Gutter Services',
      titleFr: 'Nettoyage de Gouttières',
      description: 'Complete gutter cleaning, maintenance, and repair services.',
      descriptionFr: 'Services complets de nettoyage, entretien et réparation de gouttières.',
      href: '/services/gutter-services',
      icon: HiHomeModern,
      color: 'green'
    },
    {
      title: 'Pressure Washing',
      titleFr: 'Lavage à Pression',
      description: 'High-pressure cleaning for driveways, patios, decks, and exterior surfaces.',
      descriptionFr: 'Nettoyage haute pression pour allées, patios, terrasses et surfaces extérieures.',
      href: '/services/pressure-washing',
      icon: HiWrenchScrewdriver,
      color: 'purple'
    },
    {
      title: 'Deck Refinishing',
      titleFr: 'Rénovation de Terrasses',
      description: 'Professional deck restoration, staining, and sealing services.',
      descriptionFr: 'Services professionnels de restauration, teinture et scellement de terrasses.',
      href: '/services/deck-refinishing',
      icon: HiBeaker,
      color: 'orange'
    }
  ];

  const metadata = {
    title: currentLocale === 'fr'
      ? 'Services d\'Entretien Domestique Montréal | Nettoyage Professionnel | EDM'
      : 'Montreal Home Maintenance Services | Professional Cleaning | EDM',
    description: currentLocale === 'fr'
      ? 'Services professionnels d\'entretien domestique à Montréal. Nettoyage de vitres, gouttières, lavage à pression, rénovation de terrasses. Appelez (438) 500-3099.'
      : 'Professional home maintenance services in Montreal. Window cleaning, gutter services, pressure washing, deck refinishing. Call (438) 500-3099 for free quote.',
    keywords: currentLocale === 'fr'
      ? ['services entretien Montréal', 'nettoyage professionnel', 'entretien domestique', 'Montréal nettoyage', 'services résidentiels']
      : ['Montreal home maintenance', 'professional cleaning services', 'residential services', 'Montreal cleaning', 'home services'],
    canonical: '/services',
    alternateUrls: {
      en: '/services',
      fr: '/fr/services'
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": currentLocale === 'fr' ? 'Services d\'Entretien Domestique' : 'Home Maintenance Services',
    "description": metadata.description,
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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": currentLocale === 'fr' ? 'Catalogue de Services' : 'Service Catalog',
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": currentLocale === 'fr' ? service.titleFr : service.title,
          "description": currentLocale === 'fr' ? service.descriptionFr : service.description
        }
      }))
    }
  };

  return (
    <>
      <SEOHead
        metadata={metadata}
        locale={currentLocale}
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
              <div className="inline-flex items-center space-x-2 bg-[var(--primary)]/10 dark:bg-blue-900/30 text-[var(--primary)] dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <HiHomeModern className="w-4 h-4" />
                <span>{currentLocale === 'fr' ? 'Services Professionnels' : 'Professional Services'}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 dark:text-yellow-300 mb-6">
                {currentLocale === 'fr' ? 'Nos Services d\'Entretien' : 'Our Home Maintenance Services'}
              </h1>
              <p className="text-xl text-gray-300 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {currentLocale === 'fr'
                  ? 'Services professionnels d\'entretien domestique à Montréal et environs. Qualité garantie, équipe expérimentée, résultats exceptionnels.'
                  : 'Professional home maintenance services in Montreal and surrounding areas. Guaranteed quality, experienced team, exceptional results.'
                }
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={index}
                    href={service.href}
                    className="bg-gray-800 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-700 dark:border-gray-700 group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-${service.color}-100 dark:bg-${service.color}-900/30`}>
                        <Icon className={`w-8 h-8 text-${service.color}-600 dark:text-${service.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white dark:text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {currentLocale === 'fr' ? service.titleFr : service.title}
                        </h3>
                        <p className="text-gray-300 dark:text-gray-300 leading-relaxed">
                          {currentLocale === 'fr' ? service.descriptionFr : service.description}
                        </p>
                        <div className="mt-4 text-blue-400 dark:text-blue-400 text-sm font-medium group-hover:underline">
                          {currentLocale === 'fr' ? 'En savoir plus →' : 'Learn more →'}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-[var(--primary)] to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-2xl p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">
                {currentLocale === 'fr' ? 'Prêt pour Nos Services?' : 'Ready for Our Services?'}
              </h2>
              <p className="text-blue-100 dark:text-blue-200 mb-6 max-w-2xl mx-auto">
                {currentLocale === 'fr'
                  ? 'Contactez-nous dès aujourd\'hui pour un devis gratuit et personnalisé.'
                  : 'Contact us today for a free, personalized quote.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#contact"
                  className="bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  {currentLocale === 'fr' ? 'Devis Gratuit' : 'Get Free Quote'}
                </Link>
                <a
                  href="tel:438-500-3099"
                  className="bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-800 px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  {currentLocale === 'fr' ? 'Appelez (438) 500-3099' : 'Call (438) 500-3099'}
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
