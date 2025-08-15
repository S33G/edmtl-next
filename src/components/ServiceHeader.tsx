'use client';

import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import HamburgerMenu from './HamburgerMenu';
import ThemeToggle from './ThemeToggle';

interface ServiceHeaderProps {
  locale: string;
  onLocaleChange?: (locale: string) => void;
}

export default function ServiceHeader({ locale, onLocaleChange }: ServiceHeaderProps) {
  const handleLocaleChange = (newLocale: string) => {
    if (onLocaleChange) {
      onLocaleChange(newLocale);
    }
  };

  return (
    <header className="glass sticky top-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href={locale === 'en' ? '/' : `/${locale}`} className="flex items-center">
          <img
            src="/images/edm-main-logo.png"
            alt="EDM Logo"
            className="w-32 h-32"
          />
        </Link>

        {/* Contact Icons */}
        <div className="contact-icons">
          <ThemeToggle />
          <HamburgerMenu currentLocale={locale} />
          <LanguageSwitcher currentLocale={locale} onLocaleChange={handleLocaleChange} />
        </div>
      </div>
    </header>
  );
}
