'use client';

import { useRouter } from 'next/navigation';
import { HiOutlineGlobeAlt } from 'react-icons/hi2';
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

  return (
    <div className="flex items-center space-x-1">
      <HiOutlineGlobeAlt className="w-4 h-4 text-gray-400" />
      {siteConfig.supportedLocales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLanguageChange(locale)}
          className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
            currentLocale === locale
              ? 'bg-yellow-400 text-black'
              : 'text-gray-300 hover:bg-yellow-400 hover:text-black'
          }`}
          title={locale === 'en' ? 'English' : 'Français'}
        >
          {getLanguageLabel(locale)}
        </button>
      ))}
    </div>
  );
}
