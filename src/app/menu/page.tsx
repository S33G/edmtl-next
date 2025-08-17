import { HiHome, HiEnvelope, HiPhone } from 'react-icons/hi2';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import HamburgerMenu from '../../components/HamburgerMenu';
import siteConfig from '../../../config/site.json';

export default function MenuPage() {
  const locale = 'en';
  const servicesData = siteConfig.services[locale];

  return (
    <div className="min-h-screen hex-pattern">
      {/* Header */}
      <header className="bg-[var(--background-secondary)] bg-opacity-80 backdrop-blur-md py-4">
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
            <Link href="/" className="contact-icon" title="Home"><HiHome className="w-6 h-6" /></Link>
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
          <h1 className="logo-3d text-4xl lg:text-5xl text-[var(--primary)] mb-6">
            OUR SERVICES
          </h1>
          <p className="text-[var(--text-muted)] text-lg">
            Professional home maintenance services in Montreal and surrounding areas
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
                <div className="text-[var(--primary)] font-bold text-lg mb-2">
                  {service.name.toUpperCase()}
                </div>
                <button className="btn-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  GET QUOTE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-[var(--background-secondary)] bg-opacity-50 rounded-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-[var(--primary)] text-2xl font-bold mb-4">
              READY TO GET STARTED?
            </h2>
            <p className="text-[var(--text-muted)] mb-6">
              Contact us today for a free, no-obligation quote on any of our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="btn-primary"
              >
                CALL {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="btn-primary"
              >
                EMAIL US
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--background-secondary)] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-[var(--text-muted)] text-sm">
            {siteConfig.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
