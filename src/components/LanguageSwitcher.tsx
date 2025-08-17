'use client';

import { useRouter } from 'next/navigation';
import ReactCountryFlag from 'react-country-flag';
import siteConfig from '../../config/site.json';

interface LanguageSwitcherProps {
  currentLocale?: string;
  onLocaleChange?: (locale: string) => void;
}

export default function LanguageSwitcher({ currentLocale = 'en', onLocaleChange }: LanguageSwitcherProps) {
  const router = useRouter();

  const handleLanguageChange = (locale: string) => {
    if (onLocaleChange) {
      // Use the callback for instant client-side switching
      onLocaleChange(locale);
    } else {
      // Fall back to navigation for static pages
      if (locale === 'en') {
        router.push('/');
      } else {
        router.push(`/${locale}`);
      }
    }
  };

  const getLanguageLabel = (locale: string) => {
    switch (locale) {
      case 'en':
        return 'EN';
      case 'fr':
        return 'FR';
      default:
        return locale.toUpperCase();
    }
  };

  const getCountryCode = (locale: string) => {
    switch (locale) {
      case 'en':
        return 'US';
      case 'fr':
        return 'CA';
      default:
        return 'US';
    }
  };

  // Hide the language switcher if there's only one supported locale
  // Keep all logic intact for future multi-language support
  if (siteConfig.supportedLocales.length <= 1) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      {siteConfig.supportedLocales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLanguageChange(locale)}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentLocale === locale
              ? 'bg-[var(--primary)] text-black shadow-md'
              : 'text-[var(--text-muted)] hover:bg-[var(--primary)] hover:text-black hover:shadow-md'
          }`}
          title={locale === 'en' ? 'English' : 'Français'}
        >
          <ReactCountryFlag
            countryCode={getCountryCode(locale)}
            svg
            style={{
              width: '1.2em',
              height: '1.2em',
            }}
          />
          <span>{getLanguageLabel(locale)}</span>
        </button>
      ))}
    </div>
  );
}
