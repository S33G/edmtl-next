import Link from 'next/link';
import Image from 'next/image';
import { Locale, localizedPath, navigation } from '@/lib/i18n';
import { getPrimaryServices, getServices } from '@/lib/services';
import site from '../../config/site.json';

export default function SiteFooter({ locale }: { locale: Locale }) {
  const labels = navigation[locale];
  return <footer className="site-footer"><div className="container">
    <div className="footer-grid"><div className="footer-brand"><Link className="brand" href={localizedPath(locale, '/')}><Image src="/images/edm-box-logo.png" width={58} height={58} alt="EDMTL" /><strong>EDMTL.</strong></Link><p>{locale === 'en' ? 'Care for your home. Pride in our work.' : 'Votre maison, notre savoir-faire.'}</p><a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a><small>{locale === 'en' ? 'Montréal · West Island · Laval · South Shore' : 'Montréal · Ouest-de-l’Île · Laval · Rive-Sud'}</small></div>
    <nav aria-label={labels.services}><h2>{labels.services}</h2>{getPrimaryServices(locale).map(service => <Link key={service.slug} href={localizedPath(locale, `/services/${service.slug}`)}>{service.title}</Link>)}</nav>
    <nav aria-label={labels.other}><h2>{labels.other}</h2>{getServices(locale).filter(service => !service.primary).map(service => <Link key={service.slug} href={localizedPath(locale, `/services/${service.slug}`)}>{service.title}</Link>)}<Link href={localizedPath(locale, '/gallery')}>{labels.gallery}</Link><Link href={localizedPath(locale, '/faq')}>{labels.faq}</Link></nav>
    <div className="footer-quote"><h2>{locale === 'en' ? 'Let’s talk about your project.' : 'Parlons de votre projet.'}</h2><p>{locale === 'en' ? 'A free quote. No obligation.' : 'Une soumission gratuite. Sans engagement.'}</p><Link className="button button-primary" href={localizedPath(locale, '/contact')} data-track-event="quote_cta_click" data-track-placement="footer">{labels.quote} <span aria-hidden="true">↗</span></Link></div></div>
    <div className="footer-bottom"><small>© {new Date().getFullYear()} Entretien Domestique Montréal</small><div><Link href={localizedPath(locale, '/privacy-policy')}>{labels.privacy}</Link><Link href={localizedPath(locale, '/terms')}>{labels.terms}</Link></div></div>
  </div></footer>;
}
