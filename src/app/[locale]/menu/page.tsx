import { HiHome, HiEnvelope, HiPhone } from 'react-icons/hi2';
import LanguageSwitcher from '../../../components/LanguageSwitcher';
import HamburgerMenu from '../../../components/HamburgerMenu';
import siteConfig from '../../../../config/site.json';
import type { FC } from 'react';

interface PageProps {
  params: {
    locale: string;
  };
}

const MenuPage: FC<PageProps> = ({ params }) => {
  const locale = params.locale || 'en';
  const servicesData = siteConfig.services[locale as keyof typeof siteConfig.services] || siteConfig.services.en;
  const isEnglish = locale === 'en';

  return (
    <div className="min-h-screen hex-pattern">
      {/* Header */}
      <header className="bg-black bg-opacity-80 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/images/edm-main-logo.png"
              alt="EDM Logo"
              className="w-28 h-28 mr-4"
            />
            <div>
              <div className="text-yellow-400 text-sm font-bold">ENTRETIEN</div>
              <div className="text-yellow-400 text-sm font-bold">DOMESTIQUE</div>
              <div className="text-yellow-400 text-sm font-bold">MONTREAL</div>
            </div>
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
              <img
                src={service.image || `/api/placeholder/400/300?text=${service.name}`}
                alt={service.name}
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
};

export default MenuPage;
