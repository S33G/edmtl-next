import ContactFormSection from './ContactFormSection';
import HomePage from './HomePage';
import { FaqPage, GalleryPage, PrivacyPage, TermsPage, ThankYouPage } from './SupportingPages';
import WindowWashGame from './WindowWashGame';
import Link from 'next/link';
import { Locale, localizedPath } from '@/lib/i18n';
import { JsonLd, breadcrumbData, pageMetadata } from '@/lib/metadata';
import site from '../../config/site.json';

export type PageName = 'home' | 'contact' | 'faq' | 'gallery' | 'terms' | 'privacy-policy' | 'thank-you' | 'game';
const info: Record<Locale, Record<PageName, [string, string]>> = {
  en: {
    home: ['Home Maintenance in Montréal', 'Owner-operated home maintenance in Montréal: window and gutter cleaning, polymeric sand, pressure washing, and deck sanding and staining. Free quotes.'],
    contact: ['Get Your Free Quote', 'Request a free, no-obligation quote for home maintenance in Montréal. Choose your services and leave your name and phone number.'],
    faq: ['Frequently Asked Questions', 'Answers about EDMTL quotes, insurance, payment methods, and home maintenance service areas in Greater Montréal.'],
    gallery: ['Our Work — Project Gallery', 'Explore EDMTL window cleaning, gutter cleaning, pressure washing, polymeric sand, and deck projects using our existing project photos.'],
    terms: ['Terms of Service', 'Information about EDMTL service inquiries, free quotes, payment methods, and contacting our team.'],
    'privacy-policy': ['Privacy Policy', 'How EDMTL collects and uses quote-request information and website analytics.'],
    'thank-you': ['Thank You', 'Your quote request has been received by EDMTL.'],
    game: ['Window Washer', 'Try the EDMTL window-washing game.'],
  },
  fr: {
    home: ['Entretien de maison à Montréal', 'Entretien de maison par les propriétaires à Montréal : vitres, gouttières, sable polymère, lavage à pression, sablage et teinture de terrasses. Soumissions gratuites.'],
    contact: ['Obtenir une soumission gratuite', 'Demandez une soumission gratuite et sans engagement pour l’entretien de votre maison à Montréal. Choisissez vos services et laissez vos coordonnées.'],
    faq: ['Questions fréquentes', 'Les réponses à vos questions sur les soumissions, les assurances, les paiements et les secteurs desservis par EDMTL dans le Grand Montréal.'],
    gallery: ['Nos réalisations — Galerie', 'Découvrez les projets EDMTL : lavage de vitres, gouttières, lavage à pression, sable polymère et entretien de terrasses.'],
    terms: ['Conditions de service', 'Renseignements sur les demandes de service EDMTL, les devis gratuits, les modes de paiement et les coordonnées de notre équipe.'],
    'privacy-policy': ['Politique de confidentialité', 'Comment EDMTL recueille et utilise les renseignements des demandes de soumission et les données de navigation.'],
    'thank-you': ['Merci', 'EDMTL a bien reçu votre demande de soumission.'],
    game: ['Lavage de vitres', 'Essayez le jeu de lavage de vitres EDMTL.'],
  },
};

export function getPageMetadata(name: PageName, locale: Locale) {
  const [title, description] = info[locale][name];
  return pageMetadata(locale, name === 'home' ? '/' : `/${name}`, title, description, ['terms', 'thank-you', 'game'].includes(name));
}

export default function RoutePage({ name, locale }: { name: PageName; locale: Locale }) {
  if (name === 'home') return <HomePage locale={locale} />;
  const pages = { faq: FaqPage, gallery: GalleryPage, terms: TermsPage, 'privacy-policy': PrivacyPage, 'thank-you': ThankYouPage };
  const Component = name in pages ? pages[name as keyof typeof pages] : undefined;
  return <>
    <JsonLd data={breadcrumbData(locale, [{ name: info[locale][name][0], path: `/${name}` }])} />
    <nav className="breadcrumbs container supporting-breadcrumbs" aria-label={locale === 'en' ? 'Breadcrumbs' : 'Fil d’Ariane'}><Link href={localizedPath(locale, '/')}>{locale === 'en' ? 'Home' : 'Accueil'}</Link><span aria-hidden="true">/</span><span aria-current="page">{info[locale][name][0]}</span></nav>
    {Component ? <Component locale={locale} /> : name === 'game' ? <WindowWashGame locale={locale} /> : <section className="contact-page section"><div className="container"><div className="page-heading"><h1>{locale === 'en' ? 'Get your free quote.' : 'Votre soumission gratuite.'}</h1><p className="lead">{locale === 'en' ? 'A few details are all we need to get started. Your quote is free, with no obligation.' : 'Quelques renseignements suffisent pour commencer. Votre soumission est gratuite et sans engagement.'}</p></div><ContactFormSection locale={locale} variant="dedicated" /><p className="contact-phone">{locale === 'en' ? 'Prefer to talk? Call ' : 'Vous préférez discuter? Appelez le '}<a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a></p></div></section>}
  </>;
}
