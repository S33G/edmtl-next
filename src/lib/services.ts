import type { Locale } from './i18n';
import english from '../data/services.en.json';
import french from '../data/services.fr.json';

export interface Service {
  slug: string;
  title: string;
  pageTitle: string;
  subtitle: string;
  description: string;
  intro: string[];
  sections: Array<{
    id: string;
    heading: string;
    content: string;
    list?: { title: string; items: string[] };
  }>;
  hero: string;
  images: Array<{ src: string; alt: string; comparison?: boolean }>;
  primary: boolean;
}

const translations: Record<Locale, Service[]> = { en: english, fr: french };
const legacySlugs: Record<string, string> = {
  'polymeric-sand-replacement': 'pressure-washing',
  'deck-refinishing': 'deck-staining',
  'gutter-services': 'gutter-cleaning',
};

export function canonicalServiceSlug(slug: string): string {
  return Object.prototype.hasOwnProperty.call(legacySlugs, slug) ? legacySlugs[slug] : slug;
}

export function getServices(locale: Locale): Service[] {
  return translations[locale];
}

export function getPrimaryServices(locale: Locale): Service[] {
  return getServices(locale).filter((service) => service.primary);
}

export function getService(slug: string, locale: Locale): Service | undefined {
  return getServices(locale).find((service) => service.slug === canonicalServiceSlug(slug));
}
