'use client';

import { HiCheckCircle, HiSparkles, HiEye, HiHomeModern, HiWrenchScrewdriver, HiBeaker } from 'react-icons/hi2';
import Image from 'next/image';
import siteConfig from '../../config/site.json';

interface ServiceContentProps {
  serviceKey: 'window-cleaning' | 'gutter-services' | 'pressure-washing' | 'deck-refinishing';
  locale?: 'en' | 'fr';
}

export default function ServiceContent({ serviceKey, locale = 'en' }: ServiceContentProps) {
  const serviceIcons = {
    'window-cleaning': [HiEye, HiSparkles, HiHomeModern],
    'gutter-services': [HiHomeModern, HiWrenchScrewdriver, HiSparkles],
    'pressure-washing': [HiSparkles, HiHomeModern, HiBeaker],
    'deck-refinishing': [HiWrenchScrewdriver, HiSparkles, HiHomeModern]
  };

  const serviceImages = {
    'window-cleaning': {
      header: '/images/services/window-cleaning-header.png',
      sections: [
        '/images/services/interior-window-cleaning.png',
        '/images/services/exterior-window-cleaning.png',
        '/images/services/commercial-window-cleaning.png'
      ]
    },
    'gutter-services': {
      header: '/images/services/gutter-services-header.png',
      sections: [
        '/images/services/gutter-cleaning.png',
        '/images/services/gutter-guard-installation.png',
        '/images/services/maintenance-&-repairs-(gutter).png'
      ]
    },
    'pressure-washing': {
      header: '/images/services/pressure-washing.png',
      sections: [
        '/images/services/hard-surface-washing.png',
        '/images/services/soft-surface-cleaning.png',
        '/images/services/moss-removal.png'
      ]
    },
    'deck-refinishing': {
      header: '/images/services/deck-refinishing-header.png',
      sections: [
        '/images/services/wash-&-brighten.png',
        '/images/services/surface-cleaning-and-preparation.png',
        '/images/services/staining-&-sealing.png'
      ]
    }
  };

  const serviceData = siteConfig.serviceModals[locale][serviceKey];
  const ctaData = siteConfig.serviceModals[locale].cta;
  const icons = serviceIcons[serviceKey];
  const images = serviceImages[serviceKey];

  return (
    <div className="p-6">
      {/* Hero Section with Header Image */}
      <div className="text-center mb-8">
        <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-6">
          <Image
            src={images.header}
            alt={serviceData.title}
            fill
            className="object-cover"
            priority
          />
          {/* Enhanced overlay with gradient for better text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/75 flex flex-col items-center justify-center p-6">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/30 text-[var(--primary)] dark:text-[var(--primary)] px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm border border-[var(--primary)] dark:border-[var(--primary)]/30">
              <HiSparkles className="w-4 h-4" />
              <span>{serviceData.subtitle}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg [text-shadow:2px_2px_4px_rgba(0,0,0,0.8),0px_4px_8px_rgba(0,0,0,0.6),0px_1px_12px_rgba(0,0,0,0.7)]">
              {serviceData.title}
            </h1>
            <p className="text-lg text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md [text-shadow:1px_1px_3px_rgba(0,0,0,0.7),0px_2px_5px_rgba(0,0,0,0.5)]">
              {serviceData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {serviceData.services.map((item: { title: string; description: string; features: string[] }, index: number) => {
          const Icon = icons[index];
          return (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 hover:shadow-lg hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300">
              {/* Service Image with subtle overlay */}
              <div className="relative w-full h-[200px] rounded-xl overflow-hidden mb-4 group">
                <Image
                  src={images.sections[index]}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/40 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <Icon className="w-6 h-6 text-[var(--primary)] dark:text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-muted)] dark:text-[var(--foreground)] mb-3 [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)]">{item.title}</h3>
              <p className="text-[var(--text-muted)] dark:text-[var(--text-muted)] mb-4">
                {item.description}
              </p>
              <ul className="space-y-2">
                {item.features.map((feature: string, featureIndex: number) => (
                  <li key={featureIndex} className="flex items-center text-sm text-[var(--text-muted)] dark:text-[var(--text-muted)]">
                    <HiCheckCircle className="w-4 h-4 text-[var(--primary)] dark:text-[var(--primary)] mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded-xl p-6 text-center text-[var(--foreground)] mt-8 shadow-lg">
        <h3 className="text-xl font-semibold mb-2">
          {ctaData.ready}
        </h3>
        <p className="text-[var(--text-muted)] mb-4">
          {ctaData.contact}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-[var(--foreground)] px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {ctaData.callNow}
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="border border-[var(--primary)] text-[var(--primary)] hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 hover:text-[var(--foreground)] px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5"
          >
            {ctaData.freeQuote}
          </a>
        </div>
      </div>
    </div>
  );
}
