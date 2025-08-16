import { useState, useEffect } from 'react';
import enTranslations from '../locales/en.json';
import frTranslations from '../locales/fr.json';

type Translations = typeof enTranslations;

const translations: Record<string, Translations> = {
  en: enTranslations,
  fr: frTranslations,
};

export function useTranslation(initialLocale: string = 'en') {
  const [locale, setLocale] = useState(initialLocale);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale] || translations.en;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    // Fallback to English if translation not found
    if (value === undefined) {
      let fallbackValue: any = translations.en;
      for (const k of keys) {
        fallbackValue = fallbackValue?.[k];
        if (fallbackValue === undefined) break;
      }
      return fallbackValue || key;
    }
    
    return value || key;
  };

  const changeLocale = (newLocale: string) => {
    if (translations[newLocale]) {
      setLocale(newLocale);
    }
  };

  return {
    t,
    locale,
    changeLocale,
    availableLocales: Object.keys(translations),
  };
}

export default useTranslation;
