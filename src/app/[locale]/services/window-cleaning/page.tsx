'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiCheckCircle, HiSparkles, HiEye } from 'react-icons/hi2';
import ServiceHeader from '../../../../components/ServiceHeader';
import SEOHead from '../../../../components/SEOHead';
import { getServiceMetadata } from '../../../../lib/seo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WindowCleaningPage({ params }: any) {
  const [mounted, setMounted] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(params?.locale || 'en');
  const locale = params?.locale || 'en';
  const metadata = getServiceMetadata('window-cleaning', locale);

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
      title: 'Crystal Clear Windows',
      description: 'Professional window cleaning services for residential and commercial properties in Montreal. Our experienced team delivers streak-free results using professional equipment and techniques.',
      backToHome: 'Back to Home',
      services: {
        interior: {
          title: 'Interior Cleaning',
          description: 'Complete interior window cleaning including frames, sills, and glass surfaces. We protect your furniture and floors while delivering spotless results.',
          features: [
            'Professional squeegee technique',
            'Frame and sill cleaning',
            'Furniture protection'
          ]
        },
        exterior: {
          title: 'Exterior Cleaning',
          description: 'Professional exterior window cleaning using purified water systems and specialized equipment to remove dirt, grime, and environmental buildup.',
          features: [
            'Pure water cleaning system',
            'Eco-friendly solutions',
            'Streak-free results'
          ]
        },
        waterFed: {
          title: 'Water-Fed System',
          description: 'Advanced water-fed pole system using purified water for streak-free cleaning. Ideal for high windows and provides longer-lasting cleanliness.',
          features: [
            'Purified water system',
            'Reach up to 4 stories',
            'Eco-friendly method'
          ]
        }
      },
      process: {
        title: 'Our Window Cleaning Process',
        steps: [
          { title: 'Assessment', description: 'We assess your windows and determine the best cleaning method' },
          { title: 'Preparation', description: 'We protect your property and prepare our professional equipment' },
          { title: 'Cleaning', description: 'Professional cleaning using appropriate techniques and equipment' },
          { title: 'Inspection', description: 'Final quality check to ensure perfect, streak-free results' }
        ]
      },
      features: {
        whyChoose: 'Why Choose Our Window Cleaning?',
        reasons: [
          'Professional squeegee technique for streak-free results',
          'Interior and exterior cleaning available',
          'Water-fed pole system for high windows',
          'Screen and frame cleaning included',
          'Fully insured and experienced professionals'
        ],
        serviceAreas: 'Service Areas',
        areas: [
          'Residential properties',
          'Commercial buildings',
          'Multi-story buildings',
          'Retail storefronts',
          'Office buildings'
        ]
      },
      cta: {
        title: 'Ready for Crystal Clear Windows?',
        description: 'Get a free quote for professional window cleaning services. We serve residential and commercial properties throughout Montreal.',
        getQuote: 'Get Free Quote',
        call: 'Call (438) 500-3099'
      }
    },
    fr: {
      title: 'Vitres Parfaitement Propres',
      description: 'Services professionnels de nettoyage de vitres pour propriétés résidentielles et commerciales à Montréal. Notre équipe expérimentée offre des résultats sans traces en utilisant des équipements et techniques professionnels.',
      backToHome: 'Retour à l\'accueil',
      services: {
        interior: {
          title: 'Nettoyage Intérieur',
          description: 'Nettoyage complet des vitres intérieures incluant les cadres, rebords et surfaces vitrées. Nous protégeons vos meubles et planchers tout en offrant des résultats impeccables.',
          features: [
            'Technique professionnelle avec raclette',
            'Nettoyage des cadres et rebords',
            'Protection des meubles'
          ]
        },
        exterior: {
          title: 'Nettoyage Extérieur',
          description: 'Nettoyage professionnel des vitres extérieures utilisant des systèmes d\'eau purifiée et des équipements spécialisés pour éliminer saleté, crasse et accumulations environnementales.',
          features: [
            'Système de nettoyage à l\'eau pure',
            'Solutions écologiques',
            'Résultats sans traces'
          ]
        },
        waterFed: {
          title: 'Système à Eau',
          description: 'Système avancé de perche à eau utilisant de l\'eau purifiée pour un nettoyage sans traces. Idéal pour les fenêtres hautes et offre une propreté plus durable.',
          features: [
            'Système d\'eau purifiée',
            'Atteint jusqu\'à 4 étages',
            'Méthode écologique'
          ]
        }
      },
      process: {
        title: 'Notre Processus de Nettoyage',
        steps: [
          { title: 'Évaluation', description: 'Nous évaluons vos fenêtres et déterminons la meilleure méthode de nettoyage' },
          { title: 'Préparation', description: 'Nous protégeons votre propriété et préparons notre équipement professionnel' },
          { title: 'Nettoyage', description: 'Nettoyage professionnel utilisant les techniques et équipements appropriés' },
          { title: 'Inspection', description: 'Vérification finale de qualité pour assurer des résultats parfaits et sans traces' }
        ]
      },
      features: {
        whyChoose: 'Pourquoi Choisir Notre Nettoyage de Vitres?',
        reasons: [
          'Technique professionnelle avec raclette pour des résultats sans traces',
          'Nettoyage intérieur et extérieur disponible',
          'Système de perche à eau pour les fenêtres hautes',
          'Nettoyage des moustiquaires et cadres inclus',
          'Professionnels entièrement assurés et expérimentés'
        ],
        serviceAreas: 'Zones de Service',
        areas: [
          'Propriétés résidentielles',
          'Bâtiments commerciaux',
          'Bâtiments à plusieurs étages',
          'Vitrines de magasins',
          'Immeubles de bureaux'
        ]
      },
      cta: {
        title: 'Prêt pour des Vitres Cristallines?',
        description: 'Obtenez un devis gratuit pour des services professionnels de nettoyage de vitres. Nous desservons les propriétés résidentielles et commerciales dans tout Montréal.',
        getQuote: 'Devis Gratuit',
        call: 'Appelez (438) 500-3099'
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  const handleLocaleChange = (newLocale: string) => {
    setCurrentLocale(newLocale);
    // In a real app, you would handle routing here
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
    "serviceType": "Window Cleaning",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CAD"
    }
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[var(--primary)]/10 dark:bg-teal-900/30 text-[var(--primary)] dark:text-teal-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HiSparkles className="w-4 h-4" />
            <span>Professional Window Cleaning</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-6">
            {t.title}
          </h1>
          <p className="text-xl text-gray-300 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Interior Window Cleaning */}
          <div className="bg-gray-800 dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-700 dark:border-gray-700 p-8 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-6">
              <HiEye className="w-6 h-6 text-[var(--primary)] dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-semibold text-white dark:text-white mb-4">{t.services.interior.title}</h3>
            <p className="text-gray-300 dark:text-gray-300 mb-6 leading-relaxed">
              {t.services.interior.description}
            </p>
            <ul className="space-y-2">
              {t.services.interior.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-300 dark:text-gray-300">
                  <HiCheckCircle className="w-4 h-4 text-[var(--success)] dark:text-green-400 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Exterior Window Cleaning */}
          <div className="bg-gray-800 dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-700 dark:border-gray-700 p-8 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-6">
              <HiSparkles className="w-6 h-6 text-[var(--primary)] dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-semibold text-white dark:text-white mb-4">{t.services.exterior.title}</h3>
            <p className="text-gray-300 dark:text-gray-300 mb-6">
              {t.services.exterior.description}
            </p>
            <ul className="space-y-2">
              {t.services.exterior.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-300 dark:text-gray-300">
                  <HiCheckCircle className="w-4 h-4 text-[var(--success)] dark:text-green-400 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Water-Fed Window Cleaning */}
          <div className="bg-gray-800 dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-700 dark:border-gray-700 p-8 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[var(--primary)] dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 8.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white dark:text-white mb-4">{t.services.waterFed.title}</h3>
            <p className="text-gray-300 dark:text-gray-300 mb-6">
              {t.services.waterFed.description}
            </p>
            <ul className="space-y-2">
              {t.services.waterFed.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-300 dark:text-gray-300">
                  <HiCheckCircle className="w-4 h-4 text-[var(--success)] dark:text-green-400 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-gray-800 dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-700 dark:border-gray-700 p-8 mb-16">
          <h2 className="text-2xl font-bold text-white dark:text-white mb-8 text-center">{t.process.title}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {t.process.steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[var(--primary)]/10 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-[var(--primary)] dark:text-teal-400">{index + 1}</span>
                </div>
                <h3 className="font-semibold text-white dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-300 dark:text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800 dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-700 dark:border-gray-700 p-8">
            <h3 className="text-xl font-semibold text-white dark:text-white mb-6">{t.features.whyChoose}</h3>
            <ul className="space-y-3">
              {t.features.reasons.map((reason, index) => (
                <li key={index} className="flex items-start">
                  <HiCheckCircle className="w-5 h-5 text-[var(--success)] dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 dark:text-gray-300">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-700 dark:border-gray-700 p-8">
            <h3 className="text-xl font-semibold text-white dark:text-white mb-6">{t.features.serviceAreas}</h3>
            <div className="space-y-4">
              {t.features.areas.map((area, index) => (
                <div key={index} className="flex items-center text-gray-300 dark:text-gray-300">
                  <span className="w-2 h-2 bg-[var(--primary)] dark:bg-blue-400 rounded-full mr-3"></span>
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-[var(--primary)] to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-blue-100 dark:text-blue-200 mb-6 max-w-2xl mx-auto">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${homeUrl}#contact`}
              className="bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              {t.cta.getQuote}
            </Link>
            <a
              href="tel:438-500-3099"
              className="bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-800 px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              {t.cta.call}
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
