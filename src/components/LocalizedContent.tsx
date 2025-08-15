'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import HamburgerMenu from './HamburgerMenu';
import ThemeToggle from './ThemeToggle';
import GoogleReviews from './GoogleReviews';
import GoogleMapEmbed from './GoogleMapEmbed';
import { HiUserGroup, HiShieldCheck, HiCurrencyDollar } from 'react-icons/hi2';
import siteConfig from '../../config/site.json';

export default function LocalizedContent() {
  const [currentLocale, setCurrentLocale] = useState('en');

  const heroData = siteConfig.hero[currentLocale as keyof typeof siteConfig.hero] || siteConfig.hero.en;
  const faqData = siteConfig.faq[currentLocale as keyof typeof siteConfig.faq] || siteConfig.faq.en;
  const featuresData = [
    {
      title: currentLocale === 'fr' ? '5 étoiles sur Google' : '5 stars on Google',
    },
    {
      title: currentLocale === 'fr' ? 'Équipe professionnelle' : 'Professional team',
    },
    {
      title: currentLocale === 'fr' ? 'Service garanti' : 'Guaranteed service',
    },
    {
      title: currentLocale === 'fr' ? 'Entièrement assuré' : 'Fully insured',
    }
  ];

  const handleLocaleChange = (locale: string) => {
    setCurrentLocale(locale);
  };

  return (
    <div className="min-h-screen hex-pattern bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Header */}
      <header className="glass sticky top-0 z-50 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/images/edm-main-logo.png"
              alt="EDM Logo"
              width={128}
              height={128}
              className="w-32 h-32"
            />
          </div>

          {/* Contact Icons */}
          <div className="contact-icons">
            <ThemeToggle />
            <HamburgerMenu currentLocale={currentLocale} />
            <LanguageSwitcher currentLocale={currentLocale} onLocaleChange={handleLocaleChange} />
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <section className="hero-section text-center py-24">
            <div className="max-w-4xl mx-auto">
              {/* Hero Logo */}
              <div className="mb-8">
                <Image
                  src="/images/edm-box-logo.png"
                  alt="EDMTL - Entretien Domestique Montreal"
                  width={200}
                  height={200}
                  className="mx-auto w-48 h-48 md:w-56 md:h-56 object-contain"
                />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 dark:text-yellow-300 mb-6 tracking-tight leading-tight">
                {heroData.title}
              </h1>
              <p className="text-xl text-gray-500 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-normal">
                {heroData.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="btn-primary inline-flex items-center justify-center"
                >
                  {currentLocale === 'fr' ? 'Appelez maintenant' : 'Call Now'}
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  {currentLocale === 'fr' ? 'Devis gratuit' : 'Free Quote'}
                </a>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-semibold text-[var(--foreground)] dark:text-white mb-4 tracking-tight">
                {currentLocale === 'fr' ? 'Nos Services' : 'Our Services'}
              </h2>
              <p className="text-xl text-[var(--text-muted)] dark:text-gray-300 max-w-2xl mx-auto">
                {currentLocale === 'fr'
                  ? 'Des services professionnels pour votre maison'
                  : 'Professional services for your home'
                }
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href={currentLocale === 'en' ? '/services/window-cleaning' : `/${currentLocale}/services/window-cleaning`} className="card group hover:shadow-lg transition-all duration-300">
                <div className="text-blue-600 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="card-title">
                  {currentLocale === 'fr' ? 'Nettoyage de vitres' : 'Window Cleaning'}
                </h3>
                <p className="card-description">
                  {currentLocale === 'fr'
                    ? 'Nettoyage professionnel de vitres intérieures et extérieures'
                    : 'Professional interior and exterior window cleaning'
                  }
                </p>
                <div className="mt-4 text-blue-600 group-hover:text-blue-700 text-sm font-medium">
                  {currentLocale === 'fr' ? 'En savoir plus →' : 'Learn more →'}
                </div>
              </Link>

              <Link href={currentLocale === 'en' ? '/services/gutter-services' : `/${currentLocale}/services/gutter-services`} className="card group hover:shadow-lg transition-all duration-300">
                <div className="text-blue-600 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="card-title">
                  {currentLocale === 'fr' ? 'Nettoyage de gouttières' : 'Gutter Services'}
                </h3>
                <p className="card-description">
                  {currentLocale === 'fr'
                    ? 'Nettoyage et entretien complets des gouttières'
                    : 'Complete gutter cleaning and maintenance'
                  }
                </p>
                <div className="mt-4 text-blue-600 group-hover:text-blue-700 text-sm font-medium">
                  {currentLocale === 'fr' ? 'En savoir plus →' : 'Learn more →'}
                </div>
              </Link>

              <Link href={currentLocale === 'en' ? '/services/pressure-washing' : `/${currentLocale}/services/pressure-washing`} className="card group hover:shadow-lg transition-all duration-300">
                <div className="text-blue-600 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="card-title">
                  {currentLocale === 'fr' ? 'Lavage à pression' : 'Pressure Washing'}
                </h3>
                <p className="card-description">
                  {currentLocale === 'fr'
                    ? 'Nettoyage haute pression pour toutes surfaces'
                    : 'High-pressure cleaning for all surfaces'
                  }
                </p>
                <div className="mt-4 text-blue-600 group-hover:text-blue-700 text-sm font-medium">
                  {currentLocale === 'fr' ? 'En savoir plus →' : 'Learn more →'}
                </div>
              </Link>

              <Link href={currentLocale === 'en' ? '/services/deck-refinishing' : `/${currentLocale}/services/deck-refinishing`} className="card group hover:shadow-lg transition-all duration-300">
                <div className="text-blue-600 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="card-title">
                  {currentLocale === 'fr' ? 'Rénovation de terrasses' : 'Deck Refinishing'}
                </h3>
                <p className="card-description">
                  {currentLocale === 'fr'
                    ? 'Rénovation et restauration de terrasses en bois'
                    : 'Wood deck renovation and restoration'
                  }
                </p>
                <div className="mt-4 text-blue-600 group-hover:text-blue-700 text-sm font-medium">
                  {currentLocale === 'fr' ? 'En savoir plus →' : 'Learn more →'}
                </div>
              </Link>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="py-20 bg-gray-900 dark:bg-gray-800 rounded-3xl mx-4">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-semibold text-white dark:text-gray-100 mb-4 tracking-tight">
                  {currentLocale === 'fr' ? 'Avis Clients' : 'Customer Reviews'}
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-12">
                <GoogleReviews />
                <GoogleMapEmbed />
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
                  {faqData.title}
                </h2>
              </div>

              <div className="space-y-4">
                {faqData.items.map((item, index) => (
                  <div key={index} className="card relative overflow-hidden group">
                    {/* Abstract Question Mark Background */}
                    <div className="absolute top-0 right-0 opacity-5 group-hover:opacity-20 pointer-events-none transition-all duration-300">
                      <svg
                        width="120"
                        height="120"
                        viewBox="0 0 120 120"
                        className="text-blue-600 group-hover:text-yellow-500 transition-colors duration-300"
                        fill="currentColor"
                      >
                        <path d="M60 0C26.863 0 0 26.863 0 60s26.863 60 60 60 60-26.863 60-60S93.137 0 60 0zm0 110c-27.614 0-50-22.386-50-50S32.386 10 60 10s50 22.386 50 50-22.386 50-50 50z"/>
                        <path d="M60 25c-10.493 0-19 8.507-19 19 0 2.761 2.239 5 5 5s5-2.239 5-5c0-4.963 4.037-9 9-9s9 4.037 9 9c0 4.418-3.582 8-8 8-2.761 0-5 2.239-5 5v8c0 2.761 2.239 5 5 5s5-2.239 5-5v-4.576C72.46 59.696 77 54.301 77 48c0-9.374-7.626-17-17-17z"/>
                        <circle cx="60" cy="82" r="6"/>
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold text-[var(--foreground)] dark:text-white mb-3">
                        {item.question}
                      </h3>
                      <p className="text-[var(--text-muted)] dark:text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Features Footer */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-white mb-4 tracking-tight">
              {currentLocale === 'fr' ? 'Pourquoi choisir EDMTL' : 'Why Choose EDMTL'}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuresData.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
                  {index === 0 && <span className="text-2xl font-bold text-white">5⭐</span>}
                  {index === 1 && <HiUserGroup className="w-8 h-8 text-white" />}
                  {index === 2 && <HiShieldCheck className="w-8 h-8 text-white" />}
                  {index === 3 && <HiCurrencyDollar className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 border-t border-gray-800 dark:border-gray-700" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Copyright */}
          <div className="text-center text-gray-300 dark:text-gray-400 text-sm">
            © 2024 EDMTL - Entretien Domestique Montreal. {currentLocale === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </div>
        </div>
      </footer>
    </div>
  );
}
