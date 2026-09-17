export type Locale = 'en' | 'fr';

export const locales: Locale[] = ['en', 'fr'];

export function stripLocale(path: string): string {
  return path.replace(/^\/fr(?=\/|$)/, '') || '/';
}

export function localizedPath(locale: Locale, path: string): string {
  const clean = stripLocale(path.startsWith('/') ? path : `/${path}`);
  return locale === 'fr' ? `/fr${clean === '/' ? '' : clean}` : clean;
}

export const navigation = {
  en: { home: 'Home', services: 'Services', reviews: 'Reviews', faq: 'FAQ', gallery: 'Gallery', terms: 'Terms of Service', quote: 'Free quote', call: 'Call us', menu: 'Menu', close: 'Close menu', privacy: 'Privacy policy', other: 'More services', skip: 'Skip to content' },
  fr: { home: 'Accueil', services: 'Services', reviews: 'Avis', faq: 'FAQ', gallery: 'Galerie', terms: 'Modalités de service', quote: 'Soumission gratuite', call: 'Appelez-nous', menu: 'Menu', close: 'Fermer le menu', privacy: 'Confidentialité', other: 'Autres services', skip: 'Aller au contenu' },
};
