'use client';

import { useState } from 'react';
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
    let value: unknown = translations[locale] || translations.en;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to English if translation not found in current locale
        let fallbackValue: unknown = translations.en;
        for (const fallbackKey of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && fallbackKey in fallbackValue) {
            fallbackValue = (fallbackValue as Record<string, unknown>)[fallbackKey];
          } else {
            return key; // Return key if translation not found
          }
        }
        return String(fallbackValue) || key;
      }
    }

    return String(value) || key;
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
