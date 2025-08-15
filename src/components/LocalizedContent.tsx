'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import GoogleReviews from './GoogleReviews';
import Modal from './Modal';
import ServiceContent from './ServiceContent';
import PagePicker from './PagePicker';
import { HiUserGroup, HiShieldCheck, HiCurrencyDollar } from 'react-icons/hi2';
import siteConfig from '../../config/site.json';
import { useInView } from '../hooks/useInView';

export default function LocalizedContent() {
  const [currentLocale, setCurrentLocale] = useState('en');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const servicesRef = useInView();
  const reviewsRef = useInView();
  const contactRef = useInView();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerHeight = 120; // Account for sticky header height
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const openServiceModal = (serviceKey: string) => {
    setSelectedService(serviceKey);
  };

  const closeServiceModal = () => {
    setSelectedService(null);
  };

  const services = ['window-cleaning', 'gutter-services', 'pressure-washing', 'deck-refinishing'] as const;

  const goToNextService = () => {
    if (!selectedService) return;
    const currentIndex = services.findIndex(s => s === selectedService);
    const nextIndex = (currentIndex + 1) % services.length;
    setSelectedService(services[nextIndex]);
  };

  const goToPrevService = () => {
    if (!selectedService) return;
    const currentIndex = services.findIndex(s => s === selectedService);
    const prevIndex = currentIndex === 0 ? services.length - 1 : currentIndex - 1;
    setSelectedService(services[prevIndex]);
  };

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

          {/* Desktop PagePicker */}
          <div className="hidden lg:block">
            <PagePicker currentLocale={currentLocale} onLocaleChange={handleLocaleChange} isInHeader={true} />
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <section id="hero-section" className="hero-section text-center py-24">
            <div className="max-w-4xl mx-auto">
              {/* Hero Logo */}
              <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <Image
                  src="/images/edm-box-logo.png"
                  alt="EDMTL - Entretien Domestique Montreal"
                  width={200}
                  height={200}
                  className="mx-auto w-48 h-48 md:w-56 md:h-56 object-contain logo-breathe"
                />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 dark:text-yellow-300 mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-top-6 duration-700" style={{ animationDelay: '200ms' }}>
                {heroData.title}
              </h1>
              <p className="text-xl text-gray-500 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-normal animate-in fade-in slide-in-from-top-8 duration-700" style={{ animationDelay: '400ms' }}>
                {heroData.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '600ms' }}>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="btn-primary inline-flex items-center justify-center transition-all duration-200 hover:scale-105"
                >
                  {currentLocale === 'fr' ? 'Appelez maintenant' : 'Call Now'}
                </a>
                <button
                  onClick={scrollToContact}
                  className="btn-secondary inline-flex items-center justify-center transition-all duration-200 hover:scale-105"
                >
                  {currentLocale === 'fr' ? 'Devis gratuit' : 'Free Quote'}
                </button>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-20" ref={servicesRef.ref}>
            <div className={`text-center mb-16 transition-all duration-700 ${
              servicesRef.isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}>
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
              <div className={`transition-all duration-700 ${
                servicesRef.isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: servicesRef.isInView ? '0ms' : '0ms' }}>
                <button onClick={() => openServiceModal('window-cleaning')} className="card group hover:shadow-lg transition-all duration-300 text-left w-full cursor-pointer hover:scale-105 hover:-translate-y-2 h-full flex flex-col justify-between">
                  <div className="flex-grow">
                    <div className="text-teal-600 mb-4">
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
                  </div>
                  <div className="mt-4 text-teal-600 group-hover:text-teal-700 text-sm font-medium">
                    {currentLocale === 'fr' ? 'En savoir plus →' : 'Learn more →'}
                  </div>
                </button>
              </div>

              <div className={`transition-all duration-700 ${
                servicesRef.isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: servicesRef.isInView ? '100ms' : '0ms' }}>
              <button onClick={() => openServiceModal('gutter-services')} className="card group hover:shadow-lg transition-all duration-300 text-left w-full cursor-pointer hover:scale-105 hover:-translate-y-2 h-full flex flex-col justify-between">
                  <div className="flex-grow">
                    <div className="text-teal-600 mb-4">
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
                  </div>
                  <div className="mt-4 text-teal-600 group-hover:text-teal-700 text-sm font-medium">
                    {currentLocale === 'fr' ? 'En savoir plus →' : 'Learn more →'}
                  </div>
                </button>
              </div>

              <div className={`transition-all duration-700 ${
                servicesRef.isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: servicesRef.isInView ? '200ms' : '0ms' }}>
              <button onClick={() => openServiceModal('pressure-washing')} className="card group hover:shadow-lg transition-all duration-300 text-left w-full cursor-pointer hover:scale-105 hover:-translate-y-2 h-full flex flex-col justify-between">
                  <div className="flex-grow">
                    <div className="text-teal-600 mb-4">
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
                  </div>
                  <div className="mt-4 text-teal-600 group-hover:text-teal-700 text-sm font-medium">
                    {currentLocale === 'fr' ? 'En savoir plus →' : 'Learn more →'}
                  </div>
                </button>
              </div>

              <div className={`transition-all duration-700 ${
                servicesRef.isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: servicesRef.isInView ? '300ms' : '0ms' }}>
              <button onClick={() => openServiceModal('deck-refinishing')} className="card group hover:shadow-lg transition-all duration-300 text-left w-full cursor-pointer hover:scale-105 hover:-translate-y-2 h-full flex flex-col justify-between">
                  <div className="flex-grow">
                    <div className="text-teal-600 mb-4">
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
                  </div>
                  <div className="mt-4 text-teal-600 group-hover:text-teal-700 text-sm font-medium">
                    {currentLocale === 'fr' ? 'En savoir plus →' : 'Learn more →'}
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section id="reviews" className="py-20 bg-gray-900 dark:bg-gray-800 rounded-3xl mx-4" ref={reviewsRef.ref}>
            <div className="max-w-6xl mx-auto px-6">
              <div className={`text-center mb-12 transition-all duration-700 ${
                reviewsRef.isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
                <h2 className="text-4xl font-semibold text-white dark:text-gray-100 mb-4 tracking-tight">
                  {currentLocale === 'fr' ? 'Avis Clients' : 'Customer Reviews'}
                </h2>
              </div>
              <div className={`grid lg:grid-cols-2 gap-12 transition-all duration-700 ${
                reviewsRef.isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: reviewsRef.isInView ? '200ms' : '0ms' }}>
                <GoogleReviews />
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
                        className="text-teal-600 group-hover:text-yellow-500 transition-colors duration-300"
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

          {/* Contact Section */}
          <section id="contact" className="py-20" ref={contactRef.ref}>
            <div className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
              contactRef.isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-semibold text-[var(--foreground)] dark:text-white mb-4 tracking-tight">
                  {currentLocale === 'fr' ? 'Contactez-nous' : 'Get in Touch'}
                </h2>
                <p className="text-[var(--text-muted)] dark:text-gray-300 text-lg">
                  {currentLocale === 'fr'
                    ? 'Obtenez votre devis gratuit aujourd\'hui - sans obligation!'
                    : 'Get your free quote today - no obligation!'
                  }
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="card">
                  <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)] dark:text-white">
                    {currentLocale === 'fr' ? 'Contactez-nous' : 'Get in Touch'}
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012 8.5v-.5z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-yellow-600 font-bold">
                          {currentLocale === 'fr' ? 'Téléphone' : 'Phone'}
                        </div>
                        <a href="tel:438-500-3099" className="text-[var(--foreground)] dark:text-white text-xl hover:text-yellow-600">
                          438-500-3099
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm12 0H5v12h10V4z"/>
                          <path d="M5 6h10v2H5V6zm0 4h10v2H5v-2z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-yellow-600 font-bold">Email</div>
                        <a href="mailto:info@edmtl.com" className="text-[var(--foreground)] dark:text-white hover:text-yellow-600">
                          info@edmtl.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-yellow-600 font-bold">
                          {currentLocale === 'fr' ? 'Zone de service' : 'Service Area'}
                        </div>
                        <div className="text-[var(--text-muted)] dark:text-gray-300">
                          {currentLocale === 'fr'
                            ? 'Montréal et environs incluant Saint-Lazare, Laval, Rive-Nord/Sud, Vaudreuil-Dorion'
                            : 'Montreal and surrounding areas including Saint-Lazare, Laval, North/South Shore, Vaudreuil-Dorion'
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[var(--border)]">
                    <div className="text-yellow-600 font-bold mb-4">
                      {currentLocale === 'fr' ? 'DEVIS GRATUITS DISPONIBLES' : 'FREE QUOTES AVAILABLE'}
                    </div>
                    <div className="flex gap-4">
                      <a href="tel:438-500-3099" className="flex-1 text-center bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
                        {currentLocale === 'fr' ? 'APPELER' : 'CALL NOW'}
                      </a>
                      <a href="mailto:info@edmtl.com" className="flex-1 text-center bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
                        {currentLocale === 'fr' ? 'EMAIL' : 'EMAIL US'}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="card">
                  <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)] dark:text-white">
                    {currentLocale === 'fr' ? 'Demander un devis' : 'Request a Quote'}
                  </h3>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-[var(--foreground)] dark:text-white font-bold mb-2">
                        {currentLocale === 'fr' ? 'Nom *' : 'Name *'}
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 bg-[var(--background-tertiary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-teal-400 focus:outline-none transition-colors"
                        placeholder={currentLocale === 'fr' ? 'Votre nom complet' : 'Your full name'}
                      />
                    </div>

                    <div>
                      <label className="block text-[var(--foreground)] dark:text-white font-bold mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="w-full p-3 bg-[var(--background-tertiary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-teal-400 focus:outline-none transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-[var(--foreground)] dark:text-white font-bold mb-2">
                        {currentLocale === 'fr' ? 'Téléphone' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        className="w-full p-3 bg-[var(--background-tertiary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-teal-400 focus:outline-none transition-colors"
                        placeholder={currentLocale === 'fr' ? '(optionnel)' : '(optional)'}
                      />
                    </div>

                    <div>
                      <label className="block text-[var(--foreground)] dark:text-white font-bold mb-2">
                        {currentLocale === 'fr' ? 'Service requis' : 'Service Needed'}
                      </label>
                      <select className="w-full p-3 bg-[var(--background-tertiary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-teal-400 focus:outline-none transition-colors">
                        <option>{currentLocale === 'fr' ? 'Sélectionner un service...' : 'Select a service...'}</option>
                        <option>{currentLocale === 'fr' ? 'Nettoyage de vitres' : 'Window Cleaning'}</option>
                        <option>{currentLocale === 'fr' ? 'Services de gouttières' : 'Gutter Services'}</option>
                        <option>{currentLocale === 'fr' ? 'Lavage à pression' : 'Pressure Washing'}</option>
                        <option>{currentLocale === 'fr' ? 'Rénovation de terrasses' : 'Deck Refinishing'}</option>
                        <option>{currentLocale === 'fr' ? 'Autres services' : 'Other Services'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[var(--foreground)] dark:text-white font-bold mb-2">
                        {currentLocale === 'fr' ? 'Message' : 'Message'}
                      </label>
                      <textarea
                        rows={4}
                        className="w-full p-3 bg-[var(--background-tertiary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-teal-400 focus:outline-none transition-colors"
                        placeholder={currentLocale === 'fr' ? 'Veuillez décrire votre projet...' : 'Please describe your project...'}
                      />
                    </div>

                    <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
                      {currentLocale === 'fr' ? 'ENVOYER LA DEMANDE' : 'SEND REQUEST'}
                    </button>
                  </form>
                </div>
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-2xl mb-6">
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

      {/* Service Modal */}
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={closeServiceModal}
          onNext={goToNextService}
          onPrev={goToPrevService}
          hasNext={true}
          hasPrev={true}
        >
          <ServiceContent
            serviceKey={selectedService as 'window-cleaning' | 'gutter-services' | 'pressure-washing' | 'deck-refinishing'}
            locale={currentLocale as 'en' | 'fr'}
          />
        </Modal>
      )}

      {/* Mobile/Tablet Page Picker */}
      <div className="lg:hidden">
        <PagePicker currentLocale={currentLocale} onLocaleChange={handleLocaleChange} />
      </div>
    </div>
  );
}
