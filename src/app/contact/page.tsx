import { HiHome, HiEnvelope, HiPhone, HiMapPin } from 'react-icons/hi2';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import HamburgerMenu from '../../components/HamburgerMenu';
import siteConfig from '../../../config/site.json';

export default function ContactPage() {
  const locale = 'en';

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
            CONTACT US
          </h1>
          <p className="text-[var(--text-muted)] text-lg">
            Get your free quote today - no obligation!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-[var(--background-secondary)] bg-opacity-50 rounded-lg p-8">
              <h2 className="text-[var(--primary)] text-2xl font-bold mb-6">GET IN TOUCH</h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="contact-icon"><HiPhone className="w-8 h-8" /></div>
                  <div>
                    <div className="text-[var(--primary)] font-bold">Phone</div>
                    <a href={`tel:${siteConfig.contact.phone}`} className="text-[var(--foreground)] text-xl hover:text-[var(--primary)]">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="contact-icon"><HiEnvelope className="w-8 h-8" /></div>
                  <div>
                    <div className="text-[var(--primary)] font-bold">Email</div>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-[var(--foreground)] hover:text-[var(--primary)]">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="contact-icon"><HiMapPin className="w-8 h-8" /></div>
                  <div>
                    <div className="text-[var(--primary)] font-bold">Service Area</div>
                    <div className="text-[var(--text-muted)]">
                      Montreal and surrounding areas including Saint-Lazare, Laval, North/South Shore, Vaudreuil-Dorion
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--border)]">
                <div className="text-[var(--primary)] font-bold mb-4">FREE QUOTES AVAILABLE</div>
                <div className="flex gap-4">
                  <a href={`tel:${siteConfig.contact.phone}`} className="btn-primary flex-1 text-center">
                    CALL NOW
                  </a>
                  <a href={`mailto:${siteConfig.contact.email}`} className="btn-primary flex-1 text-center">
                    EMAIL US
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form Placeholder */}
            <div className="bg-[var(--background-secondary)] bg-opacity-50 rounded-lg p-8">
              <h2 className="text-[var(--primary)] text-2xl font-bold mb-6">REQUEST A QUOTE</h2>

              <form className="space-y-4" data-netlify="true">
                <div>
                  <label className="block text-[var(--primary)] font-bold mb-2">Name *</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-[var(--primary)] font-bold mb-2">Email *</label>
                  <input
                    type="email"
                    className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[var(--primary)] font-bold mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none"
                    placeholder="(optional)"
                  />
                </div>

                <div>
                  <label className="block text-[var(--primary)] font-bold mb-2">Service Needed</label>
                  <select className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none">
                    <option>Select a service...</option>
                    <option>Window Cleaning</option>
                    <option>Gutter Services</option>
                    <option>Pressure Washing</option>
                    <option>Deck Refinishing</option>
                    <option>Other Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[var(--primary)] font-bold mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none"
                    placeholder="Please describe your project..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  SEND REQUEST
                </button>
              </form>
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
