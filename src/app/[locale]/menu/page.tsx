'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HiHome, HiEnvelope, HiPhone } from 'react-icons/hi2';
import LanguageSwitcher from '../../../components/LanguageSwitcher';
import HamburgerMenu from '../../../components/HamburgerMenu';
import siteConfig from '../../../../config/site.json';

export default function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState('en');
  const [servicesData, setServicesData] = useState(siteConfig.services.en);
  const [isEnglish, setIsEnglish] = useState(true);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      const currentLocale = resolvedParams.locale || 'en';
      setLocale(currentLocale);
      setIsEnglish(currentLocale === 'en');
      setServicesData(siteConfig.services[currentLocale as keyof typeof siteConfig.services] || siteConfig.services.en);
      setMounted(true);
    };

    resolveParams();
  }, [params]);

  if (!mounted) {
    return (
      <div className="min-h-screen hex-pattern flex items-center justify-center">
        <div className="animate-pulse text-blue-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hex-pattern">
      {/* Header */}
      <header className="bg-black bg-opacity-80 py-4">
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
            <a href={locale === 'en' ? '/' : `/${locale}`} className="contact-icon" title="Home"><HiHome className="w-6 h-6" /></a>
            <HamburgerMenu currentLocale={locale} />
            <a href={`mailto:${siteConfig.contact.email}`} className="contact-icon" title="Email"><HiEnvelope className="w-6 h-6" /></a>
            <a href={`tel:${siteConfig.contact.phone}`} className="contact-icon" title="Phone"><HiPhone className="w-6 h-6" /></a>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="logo-3d text-4xl lg:text-5xl text-yellow-400 mb-6">
            {isEnglish ? 'OUR SERVICES' : 'NOS SERVICES'}
          </h1>
          <p className="text-gray-300 text-lg">
            {isEnglish
              ? 'Professional home maintenance services in Montreal and surrounding areas'
              : 'Services professionnels d\'entretien résidentiel à Montréal et environs'
            }
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div key={index} className="service-card group">
              <Image
                src={service.image || `/api/placeholder/400/300?text=${service.name}`}
                alt={service.name}
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="service-overlay">
                <div className="text-yellow-400 font-bold text-lg mb-2">
                  {service.name.toUpperCase()}
                </div>
                <button className="btn-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isEnglish ? 'GET QUOTE' : 'DEVIS GRATUIT'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-black bg-opacity-50 rounded-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-yellow-400 text-2xl font-bold mb-4">
              {isEnglish ? 'READY TO GET STARTED?' : 'PRÊT À COMMENCER?'}
            </h2>
            <p className="text-gray-300 mb-6">
              {isEnglish
                ? 'Contact us today for a free, no-obligation quote on any of our services.'
                : 'Contactez-nous dès aujourd\'hui pour un devis gratuit et sans engagement sur tous nos services.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="btn-primary"
              >
                {isEnglish ? 'CALL' : 'APPELEZ'} {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="btn-primary"
              >
                {isEnglish ? 'EMAIL US' : 'ÉCRIVEZ-NOUS'}
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-gray-400 text-sm">
            {siteConfig.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
