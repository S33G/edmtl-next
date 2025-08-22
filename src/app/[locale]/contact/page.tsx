import { HiHome, HiEnvelope, HiPhone, HiMapPin, HiUser } from 'react-icons/hi2';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '../../../components/LanguageSwitcher';
import HamburgerMenu from '../../../components/HamburgerMenu';
import siteConfig from '../../../../config/site.json';

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';

  const translations = {
    en: {
      pageTitle: "CONTACT US",
      pageSubtitle: "Get your free quote today - no obligation!",
      getInTouch: "GET IN TOUCH",
      phone: "Phone",
      email: "Email",
      serviceArea: "Service Area",
      serviceAreaDesc: "Montreal and surrounding areas including Saint-Lazare, Laval, North/South Shore, Vaudreuil-Dorion",
      freeQuotes: "FREE QUOTES AVAILABLE",
      callNow: "CALL NOW",
      emailUs: "EMAIL US",
      requestQuote: "REQUEST A QUOTE",
      namePlaceholder: "Your full name",
      emailPlaceholder: "your.email@example.com",
      phonePlaceholder: "(optional)",
      servicePlaceholder: "Select a service...",
      messagePlaceholder: "Please describe your project...",
      sendRequest: "SEND REQUEST"
    },
    fr: {
      pageTitle: "CONTACTEZ-NOUS",
      pageSubtitle: "Obtenez votre devis gratuit aujourd'hui - sans obligation!",
      getInTouch: "ENTRER EN CONTACT",
      phone: "Téléphone",
      email: "Courriel",
      serviceArea: "Zone de service",
      serviceAreaDesc: "Montréal et les environs, y compris Saint-Lazare, Laval, Rive-Nord/Sud, Vaudreuil-Dorion",
      freeQuotes: "DEVIS GRATUITS DISPONIBLES",
      callNow: "APPELEZ MAINTENANT",
      emailUs: "ENVOYEZ-NOUS UN EMAIL",
      requestQuote: "DEMANDER UN DEVIS",
      namePlaceholder: "Votre nom complet",
      emailPlaceholder: "votre.email@exemple.com",
      phonePlaceholder: "(optionnel)",
      servicePlaceholder: "Sélectionnez un service...",
      messagePlaceholder: "Veuillez décrire votre projet...",
      sendRequest: "ENVOYER LA DEMANDE"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen hex-pattern">
      {/* Header */}
      <header className="bg-[var(--background-secondary)] bg-opacity-80 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={locale === 'en' ? '/' : `/${locale}`}>
              <Image
                src="/images/edm-main-logo.png"
                alt="EDM Logo"
                width={128}
                height={128}
                className="w-32 h-32"
              />
            </Link>
          </div>

          {/* Contact Icons */}
          <div className="contact-icons">
            <Link href={locale === 'en' ? '/' : `/${locale}`} className="contact-icon" title="Home"><HiHome className="w-6 h-6" /></Link>
            <HamburgerMenu currentLocale={locale} />
            <a href={`mailto:${siteConfig.contact.email}`} className="contact-icon" title="Email"><HiEnvelope className="w-6 h-6" /></a>
            <a href={`tel:${siteConfig.contact.phone}`} className="contact-icon" title="Phone"><HiPhone className="w-6 h-6" /></a>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-12">
          <h1 className="logo-3d text-4xl lg:text-5xl text-[var(--primary)] mb-6">
            {t.pageTitle}
          </h1>
          <p className="text-[var(--text-muted)] text-lg">
            {t.pageSubtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-[var(--background-secondary)] bg-opacity-50 rounded-lg p-8">
              <h2 className="text-[var(--primary)] text-2xl font-bold mb-6">{t.getInTouch}</h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="contact-icon"><HiPhone className="w-8 h-8" /></div>
                  <div>
                    <div className="text-[var(--primary)] font-bold">{t.phone}</div>
                    <a href={`tel:${siteConfig.contact.phone}`} className="text-[var(--foreground)] text-xl hover:text-[var(--primary)]">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="contact-icon"><HiEnvelope className="w-8 h-8" /></div>
                  <div>
                    <div className="text-[var(--primary)] font-bold">{t.email}</div>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-[var(--foreground)] hover:text-[var(--primary)]">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="contact-icon"><HiMapPin className="w-8 h-8" /></div>
                  <div>
                    <div className="text-[var(--primary)] font-bold">{t.serviceArea}</div>
                    <div className="text-[var(--text-muted)]">
                      {t.serviceAreaDesc}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--border)]">
                <div className="text-[var(--primary)] font-bold mb-4">{t.freeQuotes}</div>
                <div className="flex gap-4 mb-4">
                  <a href={`tel:${siteConfig.contact.phone}`} className="btn-primary flex-1 text-center">
                    {t.callNow}
                  </a>
                  <a href={`mailto:${siteConfig.contact.email}`} className="btn-primary flex-1 text-center">
                    {t.emailUs}
                  </a>
                </div>
                <div className="mt-4">
                  <a
                    href={siteConfig.contact.vcard.filePath}
                    download="EDMTL-Contact.vcf"
                    className="flex items-center justify-center gap-2 text-center p-3 border border-[var(--primary)] rounded-lg text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)] transition-all duration-300"
                  >
                    <HiUser className="w-5 h-5" />
                    {siteConfig.contact.vcard.labels[locale as 'en' | 'fr'] || siteConfig.contact.vcard.labels.en}
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[var(--background-secondary)] bg-opacity-50 rounded-lg p-8">
              <h2 className="text-[var(--primary)] text-2xl font-bold mb-6">{t.requestQuote}</h2>

              <form
                className="space-y-4"
                name="contact-form"
                method="POST"
                action="/thank-you.html"
                data-netlify="true"
              >
                <input type="hidden" name="form-name" value="contact-form" />
                <div>
                  <label className="block text-[var(--primary)] font-bold mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none"
                    placeholder={t.namePlaceholder}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[var(--primary)] font-bold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none"
                    placeholder={t.emailPlaceholder}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[var(--primary)] font-bold mb-2">{t.phone}</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none"
                    placeholder={t.phonePlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-[var(--primary)] font-bold mb-2">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none"
                    placeholder={t.messagePlaceholder}
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  {t.sendRequest}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[var(--background-secondary)] py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center text-[var(--text-muted)] text-sm">
            {siteConfig.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
