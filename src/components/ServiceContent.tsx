'use client';

import { HiCheckCircle, HiSparkles, HiEye, HiHomeModern, HiWrenchScrewdriver, HiBeaker } from 'react-icons/hi2';
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

  const serviceData = siteConfig.serviceModals[locale][serviceKey];
  const ctaData = siteConfig.serviceModals[locale].cta;
  const icons = serviceIcons[serviceKey];

  return (
    <div className="p-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/30 text-[var(--primary)] dark:text-[var(--primary)] px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm border border-[var(--primary)] dark:border-[var(--primary)]/30">
          <HiSparkles className="w-4 h-4" />
          <span>{serviceData.subtitle}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-muted)] dark:text-[var(--foreground)] mb-4">
          {serviceData.title}
        </h1>
        <p className="text-lg text-[var(--text-muted)] dark:text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed">
          {serviceData.description}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {serviceData.services.map((item: any, index: number) => {
          const Icon = icons[index];
          return (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 hover:shadow-lg hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/40 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <Icon className="w-6 h-6 text-[var(--primary)] dark:text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-muted)] dark:text-[var(--foreground)] mb-3">{item.title}</h3>
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
