import { useTranslation } from 'react-i18next';
import servicesData from '../../config/services.json';

interface LocalizedString {
  en: string;
  fr: string;
}

interface LocalizedStringArray {
  en: string[];
  fr: string[];
}

interface ServiceSection {
  heading: string;
  content: string;
  list?: {
    title: string;
    items: string[];
  };
}

interface LocalizedSections {
  en: ServiceSection[];
  fr: ServiceSection[];
}

interface RawService {
  slug: string;
  title: LocalizedString;
  pageTitle: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  intro: LocalizedStringArray;
  sections: LocalizedSections;
}

export interface LocalizedService {
  slug: string;
  title: string;
  pageTitle: string;
  subtitle: string;
  description: string;
  intro: string[];
  sections: ServiceSection[];
}

function getLocalized(field: LocalizedString, lang: string): string {
  return lang === 'fr' ? field.fr : field.en;
}

function getLocalizedArray(field: LocalizedStringArray, lang: string): string[] {
  return lang === 'fr' ? field.fr : field.en;
}

function getLocalizedSections(field: LocalizedSections, lang: string): ServiceSection[] {
  return lang === 'fr' ? field.fr : field.en;
}

function localizeService(raw: RawService, lang: string): LocalizedService {
  return {
    slug: raw.slug,
    title: getLocalized(raw.title, lang),
    pageTitle: getLocalized(raw.pageTitle, lang),
    subtitle: getLocalized(raw.subtitle, lang),
    description: getLocalized(raw.description, lang),
    intro: getLocalizedArray(raw.intro, lang),
    sections: getLocalizedSections(raw.sections, lang),
  };
}

export function useLocalizedServices(): LocalizedService[] {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  return (servicesData.services as RawService[]).map((s) => localizeService(s, lang));
}

export function useLocalizedService(slug: string): LocalizedService | undefined {
  const services = useLocalizedServices();
  return services.find((s) => s.slug === slug);
}

/** Non-hook version for getting localized service data with an explicit language */
export function getLocalizedServices(lang: string): LocalizedService[] {
  return (servicesData.services as RawService[]).map((s) => localizeService(s, lang));
}

export function getLocalizedServiceBySlug(slug: string, lang: string): LocalizedService | undefined {
  return getLocalizedServices(lang).find((s) => s.slug === slug);
}
