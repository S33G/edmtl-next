import { HiHome, HiEnvelope, HiPhone } from 'react-icons/hi2';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import HamburgerMenu from '../../components/HamburgerMenu';
import siteConfig from '../../../config/site.json';

export default function GalleryPage() {
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
            GALLERY
          </h1>
          <p className="text-[var(--text-muted)] text-lg">
            See our work in action - before and after photos of our services
          </p>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center">
          <div className="bg-[var(--background-secondary)] bg-opacity-50 rounded-lg p-12 max-w-2xl mx-auto">
            <h2 className="text-[var(--primary)] text-2xl font-bold mb-4">
              GALLERY COMING SOON
            </h2>
            <p className="text-[var(--text-muted)] mb-6">
              We&apos;re working on showcasing our best work. Check back soon!
            </p>
            <Link
              href="/"
              className="btn-primary"
            >
              BACK TO HOME
            </Link>
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
