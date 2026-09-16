import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiArrowUpRight } from 'react-icons/hi2';
import { Locale, localizedPath } from '@/lib/i18n';
import { getService, getPrimaryServices } from '@/lib/services';
import { JsonLd, breadcrumbData, businessData } from '@/lib/metadata';
import ContactFormSection from './ContactFormSection';
import ProjectImage from './ProjectImage';

export default function ServicePage({ locale, slug }: { locale: Locale; slug: string }) {
  const service = getService(slug, locale);
  if (!service) notFound();
  const isEnglish = locale === 'en';
  const path = `/services/${slug}`;
  return <>
    <JsonLd data={breadcrumbData(locale, [{ name: service.title, path }])} />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', '@id': `https://edmtl.com${localizedPath(locale, path)}#service`, name: service.title, description: service.description, url: `https://edmtl.com${localizedPath(locale, path)}`, image: `https://edmtl.com${service.hero}`, provider: businessData(), areaServed: ['Montréal', 'West Island', 'Laval', 'South Shore'] }} />
    <section className="section service-top"><div className="container"><nav className="breadcrumbs" aria-label={isEnglish ? 'Breadcrumbs' : 'Fil d’Ariane'}><Link href={localizedPath(locale, '/')}>{isEnglish ? 'Home' : 'Accueil'}</Link><span aria-hidden="true">/</span><Link href={localizedPath(locale, '/#services')}>{isEnglish ? 'Services' : 'Services'}</Link><span aria-hidden="true">/</span><span aria-current="page">{service.title}</span></nav>
      <div className="service-intro"><div><p className="eyebrow">{isEnglish ? 'CARE FOR YOUR HOME' : 'PRENDRE SOIN DE VOTRE MAISON'}</p><h1>{service.title}</h1><p className="lead">{service.subtitle}</p></div><a className="button button-primary" href="#quote" data-track-event="quote_cta_click" data-track-service={slug} data-track-placement="service-hero">{isEnglish ? 'Get your free quote' : 'Obtenir une soumission gratuite'}<HiArrowUpRight aria-hidden="true" /></a></div>
      <div className="service-main-grid"><div className="service-story"><ProjectImage src={service.hero} alt={service.title} className="service-hero-photo" priority sizes="(min-width: 1200px) 650px, (min-width: 1000px) 55vw, 100vw" /><div className="service-overview prose">{service.intro.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div><a className="text-link" href="#service-details">{isEnglish ? 'See our work' : 'Voir nos réalisations'}<span aria-hidden="true">↓</span></a></div><div className="service-quote"><ContactFormSection locale={locale} serviceSlug={slug} variant="embedded" /></div></div>
    </div></section>
    {service.commercial && <section id="commercial" className="section"><div className="container"><div className="prose"><h2>{service.commercial.heading}</h2>{service.commercial.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<a className="button button-primary" href="#quote">{isEnglish ? 'Get your free quote' : 'Obtenir une soumission gratuite'}<HiArrowUpRight aria-hidden="true" /></a></div></div></section>}
    {service.images.length > 0 && <section id="service-details" className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">{isEnglish ? 'A CLOSER LOOK' : 'VOIR LA DIFFÉRENCE'}</p><h2>{isEnglish ? 'See the work for yourself.' : 'Le résultat parle de lui-même.'}</h2></div><Link className="text-link" href={localizedPath(locale, '/gallery')}>{isEnglish ? 'View gallery' : 'Voir la galerie'}<HiArrowUpRight /></Link></div><div className="service-projects">{service.images.map(photo => <figure key={photo.src}><ProjectImage src={photo.src} alt={photo.alt} className="project-photo" /></figure>)}</div></div></section>}
    <section className="section service-next"><div className="container"><div className="quote-banner"><div><p className="eyebrow">{isEnglish ? 'YOUR HOME, TAKEN CARE OF' : 'VOTRE MAISON, ENTRE BONNES MAINS'}</p><h2>{isEnglish ? 'Let’s talk about your project.' : 'Parlons de votre projet.'}</h2><p>{isEnglish ? 'Free quotes, with no obligation to book.' : 'Une soumission gratuite, sans obligation.'}</p></div><a className="button button-primary" href="#quote" data-track-event="quote_cta_click" data-track-service={slug} data-track-placement="service-bottom">{isEnglish ? 'Get your free quote' : 'Obtenir une soumission gratuite'}<HiArrowUpRight /></a></div><nav className="related-services" aria-label={isEnglish ? 'Other services' : 'Autres services'}>{getPrimaryServices(locale).filter(item => item.slug !== slug).map(item => <Link key={item.slug} href={localizedPath(locale, `/services/${item.slug}`)}>{item.title}<HiArrowUpRight /></Link>)}</nav></div></section>
  </>;
}
