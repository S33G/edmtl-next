'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { useEffect } from 'react';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const updateLang = () => {
      document.documentElement.lang = i18n.language;
    };
    updateLang();
    i18n.on('languageChanged', updateLang);
    return () => {
      i18n.off('languageChanged', updateLang);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
