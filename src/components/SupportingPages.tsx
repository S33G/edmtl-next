import Link from 'next/link';
import type { ReactNode } from 'react';
import siteConfig from '../../config/site.json';
import { getGallery } from '../data/gallery';
import { getPrimaryServices } from '../lib/services';
import { localizedPath, type Locale } from '../lib/i18n';
import Gallery from './Gallery';

type PageProps = { locale: Locale };

function QuoteLink({ locale }: PageProps) {
  return <Link className="button button-primary" href={localizedPath(locale, '/contact')} data-track-event="quote_cta_click" data-track-placement="supporting_page">{locale === 'fr' ? 'Obtenir un devis gratuit' : 'Get a free quote'} <span aria-hidden="true">↗</span></Link>;
}

export function FaqPage({ locale }: PageProps) {
  const fr = locale === 'fr';
  const questions = siteConfig.faq[locale].items;
  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">{fr ? 'Des réponses simples' : 'Good to know'}</p>
        <h1 className="page-heading">{fr ? 'Questions fréquentes' : 'Frequently asked questions'}</h1>
        <p className="lead">{fr ? 'Les réponses à vos questions sur nos services, nos devis et les secteurs que nous desservons.' : 'Answers about our services, free quotes and the areas we cover.'}</p>
      </section>
      <section className="section container" aria-label={fr ? 'Questions et réponses' : 'Questions and answers'}>
        <div style={{ maxWidth: '54rem', margin: '0 auto' }}>
          {questions.map((item) => <details className="card" key={item.question} style={{ marginBottom: '1rem', padding: '1.5rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem', minHeight: '2.75rem', alignContent: 'center' }}>{item.question}</summary>
            <p style={{ marginTop: '1rem', lineHeight: 1.8 }}>{item.answer}</p>
          </details>)}
          <div className="card" style={{ marginTop: '2.5rem', padding: '2rem' }}>
            <h2>{fr ? 'Parlons de votre projet.' : 'Let’s talk about your project.'}</h2>
            <p style={{ margin: '1rem 0 1.5rem' }}>{fr ? 'Votre demande de devis est gratuite et ne vous engage à rien.' : 'Your quote is free, with no obligation to book.'}</p>
            <QuoteLink locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}

export function GalleryPage({ locale }: PageProps) {
  const fr = locale === 'fr';
  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">{fr ? 'Nos réalisations' : 'Our work'}</p>
        <h1 className="page-heading">{fr ? 'Des résultats qui se voient.' : 'See the difference.'}</h1>
        <p className="lead">{fr ? 'Découvrez nos travaux de nettoyage et d’entretien extérieur. Choisissez un service, puis ouvrez une photo pour voir les détails.' : 'Explore our exterior cleaning and maintenance projects. Choose a service and open any photo for a closer look.'}</p>
      </section>
      <section className="section container" aria-label={fr ? 'Galerie des réalisations EDMTL' : 'EDMTL project gallery'}>
        <Gallery locale={locale} photos={getGallery(locale)} filters={getPrimaryServices(locale).map((service) => ({ slug: service.slug, label: service.title }))} />
        <div style={{ marginTop: '3rem', textAlign: 'center' }}><QuoteLink locale={locale} /></div>
      </section>
    </>
  );
}

export function TermsPage({ locale }: PageProps) {
  const fr = locale === 'fr';
  // Local and deploy previews expose the draft for review. A production deploy
  // needs the client's explicit approval before publishing these terms.
  if (process.env.CONTEXT === 'production' && process.env.EDMTL_TERMS_APPROVED !== 'true') {
    return <section className="page-intro container">
      <h1 className="page-heading">{fr ? 'Conditions de service' : 'Terms of service'}</h1>
      <p className="lead">{fr ? 'Communiquez avec EDMTL pour confirmer les conditions applicables à votre projet avant de réserver.' : 'Contact EDMTL to confirm the terms for your project before booking.'}</p>
      <ContactDetails locale={locale} />
    </section>;
  }
  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">{fr ? 'Travailler ensemble' : 'Working together'}</p>
        <h1 className="page-heading">{fr ? 'Conditions de service' : 'Terms of service'}</h1>
        <p className="lead">{fr ? 'Les renseignements utiles pour demander un devis et discuter de votre projet avec EDMTL.' : 'Helpful information for requesting a quote and discussing your project with EDMTL.'}</p>
      </section>
      <section className="section container">
        <article className="prose" style={{ maxWidth: '50rem', margin: '0 auto' }}>
          <h2>{fr ? 'À propos de nos services' : 'About our services'}</h2>
          <p>{fr ? 'Entretien Domestique Montréal (EDMTL) offre des services de nettoyage et d’entretien de propriétés à Montréal et dans les environs. Communiquez avec nous pour discuter du travail souhaité et de votre propriété.' : 'Entretien Domestique Montreal (EDMTL) provides property cleaning and maintenance services in Montreal and the surrounding area. Contact us to discuss the work you need and your property.'}</p>
          <h2>{fr ? 'Devis gratuits et sans engagement' : 'Free, no-obligation quotes'}</h2>
          <p>{fr ? 'Nos devis sont gratuits. Une demande de devis ne vous oblige pas à réserver un service. Le formulaire sert à nous transmettre votre demande; il ne constitue pas une confirmation de rendez-vous.' : 'Our quotes are free. Requesting a quote does not oblige you to book a service. The form sends us your inquiry; it does not confirm an appointment.'}</p>
          <h2>{fr ? 'Votre demande de service' : 'Your service request'}</h2>
          <p>{fr ? 'Indiquez les services qui vous intéressent, votre code postal et vos coordonnées afin que nous puissions communiquer avec vous au sujet de votre projet. Les détails du travail et le prix sont à confirmer avec EDMTL.' : 'Tell us which services you are interested in, your postal code and how to reach you so we can discuss your project. The work details and price are to be confirmed with EDMTL.'}</p>
          <h2>{fr ? 'Secteurs desservis' : 'Service area'}</h2>
          <p>{fr ? 'Nous desservons Montréal ainsi que les secteurs de Saint-Lazare, Laval, la Rive-Nord, la Rive-Sud et Vaudreuil-Dorion. Les déplacements plus loin peuvent faire l’objet d’un tarif établi dans le devis.' : 'We serve Montreal and areas including Saint-Lazare, Laval, the North Shore, the South Shore and Vaudreuil-Dorion. Travel farther afield may be available at a quoted rate.'}</p>
          <h2>{fr ? 'Modes de paiement' : 'Payment methods'}</h2>
          <p>{fr ? 'Nous acceptons les principales cartes de crédit et les virements Interac. Les modalités applicables à votre projet sont à confirmer lors de la réservation.' : 'We accept major credit cards and e-transfer. The payment arrangements for your project are to be confirmed when booking.'}</p>
          <h2>{fr ? 'Vos renseignements personnels' : 'Your personal information'}</h2>
          <p>{fr ? 'Consultez notre ' : 'Read our '}<Link href={localizedPath(locale, '/privacy-policy')}>{fr ? 'politique de confidentialité' : 'privacy policy'}</Link>{fr ? ' pour connaître la façon dont les renseignements transmis sur ce site sont traités.' : ' to understand how information submitted through this website is handled.'}</p>
          <h2>{fr ? 'Nous joindre' : 'Contact us'}</h2>
          <ContactDetails locale={locale} />
        </article>
      </section>
    </>
  );
}

function ContactDetails({ locale }: PageProps) {
  return <div className="card" style={{ padding: '1.5rem' }}>
    <p><strong>{locale === 'fr' ? 'Entretien Domestique Montréal' : 'Entretien Domestique Montreal'}</strong></p>
    <p>{locale === 'fr' ? 'Courriel : ' : 'Email: '}<a href={`mailto:${siteConfig.contact.email}`} data-track-placement="policy_contact">{siteConfig.contact.email}</a></p>
    <p>{locale === 'fr' ? 'Téléphone : ' : 'Phone: '}<a href={`tel:${siteConfig.contact.phone.replace(/-/g, '')}`} data-track-placement="policy_contact">{siteConfig.contact.phone}</a></p>
    <p>{locale === 'fr' ? 'Montréal, Québec, Canada' : 'Montreal, QC, Canada'}</p>
  </div>;
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export function PrivacyPage({ locale }: PageProps) {
  const fr = locale === 'fr';
  const suppliedFields = fr ? [
    'Nom — pour vous identifier et nous adresser à vous personnellement.',
    'Numéro de téléphone — pour communiquer avec vous au sujet de votre demande de service.',
    'Adresse courriel (facultative) — pour répondre à votre demande par courriel si vous la fournissez.',
    'Code postal (facultatif) — pour situer votre projet et vérifier le secteur desservi.',
    'Services choisis — pour comprendre les services qui vous intéressent.',
    'Langue du formulaire — pour répondre dans la langue utilisée lors de votre demande.',
  ] : [
    'Name — to identify you and address you personally.',
    'Phone number — to contact you about your service request.',
    'Email address (optional) — to respond to your inquiry by email if you provide it.',
    'Postal code (optional) — to locate your project and check the service area.',
    'Selected services — to understand the services you are interested in.',
    'Form language — to respond in the language used for your inquiry.',
  ];
  const automaticFields = fr ? [
    'Adresse IP (anonymisée lorsque possible)', 'Type et version du navigateur', 'Système d’exploitation',
    'Pages consultées et temps passé sur chaque page', 'Site ou source de provenance', 'Type d’appareil (ordinateur, téléphone ou tablette)',
    'Emplacement géographique approximatif (ville ou région)', 'Événements de conversion liés à l’envoi du formulaire (les coordonnées saisies ne sont pas envoyées à Google par le formulaire)',
  ] : [
    'IP address (anonymised where possible)', 'Browser type and version', 'Operating system',
    'Pages visited and time spent on each page', 'Referring website or source', 'Device type (desktop, mobile, tablet)',
    'Approximate geographic location (city/region level)', 'Form submission conversion events (the form does not send your entered contact details to Google)',
  ];
  const uses = fr ? [
    'Répondre à vos demandes de devis et à vos questions', 'Planifier et coordonner nos services d’entretien',
    'Comprendre l’utilisation du site afin d’améliorer l’expérience des visiteurs', 'Mesurer la performance de nos campagnes publicitaires', 'Maintenir la sécurité et la performance de notre site',
  ] : [
    'Respond to your quote requests and inquiries', 'Schedule and coordinate our maintenance services',
    'Understand how visitors use our website to improve the user experience', 'Measure the performance of our advertising campaigns', 'Maintain the security and performance of our website',
  ];
  const rights = fr ? [
    'Accéder aux renseignements personnels que nous détenons à votre sujet', 'Demander la correction de renseignements inexacts',
    'Demander la suppression de vos renseignements personnels', 'Retirer votre consentement au traitement des données',
    'Déposer une plainte auprès de la Commission d’accès à l’information du Québec (CAI)',
  ] : [
    'Access the personal information we hold about you', 'Request correction of inaccurate information', 'Request deletion of your personal information',
    'Withdraw your consent to data processing', 'File a complaint with the Commission d’accès à l’information du Québec (CAI)',
  ];
  const list = (items: string[]) => <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>;

  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">{fr ? 'Vos renseignements' : 'Your information'}</p>
        <h1 className="page-heading">{fr ? 'Politique de confidentialité' : 'Privacy policy'}</h1>
        <p>{fr ? 'Dernière mise à jour : 11 septembre 2026' : 'Last updated: September 11, 2026'}</p>
      </section>
      <section className="section container">
        <article className="prose" style={{ maxWidth: '50rem', margin: '0 auto' }}>
          <p>{fr ? 'Entretien Domestique Montréal (« EDMTL », « nous » ou « notre ») exploite le site ' : 'Entretien Domestique Montreal (“EDMTL”, “we”, “us” or “our”) operates the website '}<a href="https://edmtl.com">edmtl.com</a>{fr ? '. Cette politique explique quels renseignements personnels nous recueillons, comment nous les utilisons et vos droits à leur égard.' : '. This policy explains what personal information we collect, how we use it and your rights regarding that information.'}</p>

          <h2>{fr ? '1. Renseignements recueillis' : '1. Information we collect'}</h2>
          <h3>{fr ? 'a) Renseignements que vous fournissez' : 'a) Information you provide'}</h3>
          <p>{fr ? 'Lorsque vous remplissez notre formulaire pour demander un devis, nous recueillons les renseignements suivants :' : 'When you submit our form to request a quote, we collect the following information:'}</p>
          {list(suppliedFields)}
          <h3>{fr ? 'b) Renseignements recueillis automatiquement' : 'b) Information collected automatically'}</h3>
          <p>{fr ? 'Lorsque vous consultez notre site, certains renseignements sont recueillis automatiquement par des services tiers.' : 'When you visit our website, certain information is collected automatically through third-party services.'}</p>
          <h4>Google Analytics &amp; Google Ads</h4>
          <p>{fr ? 'Nous utilisons Google Analytics et le suivi des conversions Google Ads, au moyen de Google Tag Manager, pour comprendre l’utilisation du site et mesurer l’efficacité de notre publicité. Ces services peuvent recueillir :' : 'We use Google Analytics and Google Ads conversion tracking, through Google Tag Manager, to understand how visitors use our site and measure the effectiveness of our advertising. These services may collect:'}</p>
          {list(automaticFields)}
          <p>{fr ? 'Google Analytics utilise des témoins pour recueillir ces données. Consultez la ' : 'Google Analytics uses cookies to collect this data. See '}<ExternalLink href="https://policies.google.com/privacy">{fr ? 'politique de confidentialité de Google' : 'Google Privacy Policy'}</ExternalLink>{fr ? '. Vous pouvez désactiver Google Analytics en installant le ' : '. You can opt out of Google Analytics by installing the '}<ExternalLink href="https://tools.google.com/dlpage/gaoptout">{fr ? 'module complémentaire de désactivation de Google Analytics' : 'Google Analytics Opt-Out Browser Add-on'}</ExternalLink>.</p>
          <h4>{fr ? 'Polices de caractères' : 'Fonts'}</h4>
          <p>{fr ? 'Le site utilise les polices déjà présentes sur votre appareil. Votre navigateur n’a pas besoin de les télécharger auprès d’un service tiers.' : 'The website uses fonts already available on your device. Your browser does not need to download them from a third-party font service.'}</p>
          <h4>{fr ? 'Hébergement et journaux du serveur' : 'Hosting and server logs'}</h4>
          <p>{fr ? 'Notre site est hébergé par Netlify. Netlify recueille automatiquement des renseignements standard dans les journaux du serveur, notamment votre adresse IP, l’identifiant de votre navigateur, la page de provenance, ainsi que la date et l’heure de chaque requête. Ces données servent à la sécurité, au suivi des performances et à la prévention des abus. Consultez la ' : 'Our website is hosted on Netlify. Netlify automatically collects standard server log information including your IP address, browser user agent, referring page, and the date and time of each request. This data is used for security, performance monitoring and abuse prevention. See '}<ExternalLink href="https://www.netlify.com/privacy/">{fr ? 'politique de confidentialité de Netlify' : 'Netlify Privacy Policy'}</ExternalLink>.</p>

          <h2>{fr ? '2. Utilisation de vos renseignements' : '2. How we use your information'}</h2>
          <p>{fr ? 'Nous utilisons les renseignements recueillis pour :' : 'We use the information we collect to:'}</p>
          {list(uses)}

          <h2>{fr ? '3. Envoi des formulaires' : '3. Form submissions'}</h2>
          <p>{fr ? 'Les formulaires sont traités et conservés par Netlify Forms. Lors de l’envoi, votre nom, numéro de téléphone, adresse courriel facultative, code postal, services choisis et langue du formulaire sont transmis à Netlify et mis à notre disposition dans son tableau de bord. Nous utilisons ces données uniquement pour répondre à votre demande. Nous ne vendons, ne louons et ne partageons pas ces renseignements avec des tiers sans lien avec cette demande.' : 'Form submissions are processed and stored by Netlify Forms. When you submit the form, your name, phone number, optional email address, postal code, selected services and form language are transmitted to Netlify and made available to us through its dashboard. We use this data solely to respond to your inquiry. We do not sell, rent or share this information with any unrelated third party.'}</p>
          <p>{fr ? 'Si vous changez la langue pendant que vous remplissez le formulaire, les renseignements saisis sont temporairement conservés dans le stockage de session de cet onglet pour les rétablir sur la page équivalente. Ce brouillon est supprimé lors de sa récupération ou de l’envoi réussi du formulaire; il n’est plus rétabli après 10 minutes. Vos coordonnées ne sont pas ajoutées à l’adresse de la page.' : 'If you change language while completing the form, your draft is temporarily kept in this tab’s session storage so it can be restored on the equivalent page. The draft is removed when read or when the form is successfully submitted; drafts older than 10 minutes are not restored. Your contact details are not added to the page address.'}</p>

          <h2>{fr ? '4. Témoins (cookies)' : '4. Cookies'}</h2>
          <p>{fr ? 'Notre site utilise les témoins suivants :' : 'Our website uses the following cookies:'}</p>
          <div role="region" aria-label={fr ? 'Tableau des témoins' : 'Cookie table'} tabIndex={0} style={{ overflowX: 'auto' }}>
            <table>
              <thead><tr>{(fr ? ['Témoin', 'Fournisseur', 'Utilité', 'Durée'] : ['Cookie', 'Provider', 'Purpose', 'Duration']).map((heading) => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
              <tbody>
                <tr><td><code>_ga</code></td><td>Google Analytics</td><td>{fr ? 'Distinguer les visiteurs uniques' : 'Distinguishes unique visitors'}</td><td>{fr ? '2 ans' : '2 years'}</td></tr>
                <tr><td><code>_ga_*</code></td><td>Google Analytics</td><td>{fr ? 'Maintenir l’état de la session' : 'Maintains session state'}</td><td>{fr ? '2 ans' : '2 years'}</td></tr>
                <tr><td><code>_gcl_au</code></td><td>Google Ads</td><td>{fr ? 'Conserver les clics publicitaires pour le suivi des conversions' : 'Stores ad click information for conversion tracking'}</td><td>{fr ? '90 jours' : '90 days'}</td></tr>
              </tbody>
            </table>
          </div>
          <p>{fr ? 'Vous pouvez gérer ou supprimer les témoins dans les paramètres de votre navigateur. Le blocage des témoins peut avoir une incidence sur certaines fonctions du site.' : 'You can control or delete cookies through your browser settings. Blocking cookies may affect how some features of the site function.'}</p>

          <h2>{fr ? '5. Services tiers' : '5. Third-party services'}</h2>
          <p>{fr ? 'Nous utilisons les services tiers suivants, qui peuvent traiter vos données :' : 'We use the following third-party services that may process your data:'}</p>
          {list(fr ? [
            'Google Analytics / Google Ads / Google Tag Manager — analyse du site et suivi des conversions publicitaires.',
            'Netlify — hébergement du site, livraison des polices hébergées localement et traitement des formulaires.',
            'Google Maps — liens vers les itinéraires et les avis; ouverture sur un site externe, sans carte Google Maps intégrée au site.',
          ] : [
            'Google Analytics / Google Ads / Google Tag Manager — website analytics and advertising conversion tracking.',
            'Netlify — website hosting, delivery of self-hosted fonts and form submission processing.',
            'Google Maps — linked for directions and reviews; opens externally, with no Google Maps embedded on this site.',
          ])}
          <p>{fr ? 'Chaque service tiers applique sa propre politique de confidentialité. Nous vous invitons à les consulter.' : 'Each third-party service operates under its own privacy policy. We encourage you to review their policies.'}</p>

          <h2>{fr ? '6. Conservation des données' : '6. Data retention'}</h2>
          <p>{fr ? 'Nous conservons les formulaires aussi longtemps que nécessaire pour répondre à votre demande et garder une trace de nos communications professionnelles. La période de conservation prévue pour les données analytiques est de 14 mois. Netlify conserve les journaux du serveur conformément à ses politiques de conservation des données.' : 'We retain form submissions for as long as necessary to respond to your inquiry and maintain records of our business communications. Our stated retention period for analytics data is 14 months. Server logs are retained by Netlify according to its data retention policies.'}</p>

          <h2>{fr ? '7. Vos droits' : '7. Your rights'}</h2>
          <p>{fr ? 'Selon la législation canadienne applicable en matière de protection de la vie privée, notamment la Loi 25 du Québec (Loi modernisant des dispositions législatives en matière de protection des renseignements personnels) et la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE), vous avez le droit de :' : 'Under applicable Canadian privacy legislation, including Quebec’s Law 25 (Loi modernisant des dispositions législatives en matière de protection des renseignements personnels) and the Personal Information Protection and Electronic Documents Act (PIPEDA), you have the right to:'}</p>
          {list(rights)}
          <p>{fr ? 'Pour exercer ces droits, veuillez nous joindre aux coordonnées ci-dessous.' : 'To exercise these rights, please contact us using the details below.'}</p>

          <h2>{fr ? '8. Sécurité des données' : '8. Data security'}</h2>
          <p>{fr ? 'Notre site utilise HTTPS pour chiffrer les données transmises entre votre navigateur et notre serveur. Les formulaires sont traités de façon sécurisée par l’infrastructure de Netlify. Malgré les mesures raisonnables prises pour protéger vos renseignements, aucune méthode de transmission ou de stockage électronique n’est entièrement sécurisée.' : 'Our website is served over HTTPS, ensuring that data transmitted between your browser and our server is encrypted. Form submissions are processed securely through Netlify’s infrastructure. While we take reasonable measures to protect your information, no method of electronic transmission or storage is 100% secure.'}</p>

          <h2>{fr ? '9. Confidentialité des enfants' : '9. Children’s privacy'}</h2>
          <p>{fr ? 'Notre site et nos services ne s’adressent pas aux personnes de moins de 18 ans. Nous ne recueillons pas sciemment de renseignements personnels auprès d’enfants. Si vous croyez qu’un enfant nous a transmis des renseignements personnels, veuillez nous contacter afin que nous les supprimions.' : 'Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it.'}</p>

          <h2>{fr ? '10. Modifications de cette politique' : '10. Changes to this policy'}</h2>
          <p>{fr ? 'Nous pouvons mettre à jour cette politique de temps à autre. Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour. Nous vous invitons à consulter cette page régulièrement.' : 'We may update this policy from time to time. Any changes will be posted on this page with a revised last-updated date. We encourage you to review this page periodically.'}</p>

          <h2>{fr ? '11. Nous joindre' : '11. Contact us'}</h2>
          <p>{fr ? 'Pour toute question au sujet de cette politique ou pour exercer vos droits en matière de confidentialité, veuillez communiquer avec nous :' : 'If you have questions about this policy or wish to exercise your privacy rights, please contact us:'}</p>
          <ContactDetails locale={locale} />
        </article>
      </section>
    </>
  );
}

export function ThankYouPage({ locale }: PageProps) {
  const fr = locale === 'fr';
  return <section className="section container">
    <div className="card" style={{ maxWidth: '42rem', padding: 'clamp(1.5rem, 5vw, 4rem)', margin: '2rem auto', textAlign: 'center' }}>
      <p className="eyebrow">{fr ? 'Merci de nous avoir contactés' : 'Thanks for getting in touch'}</p>
      <h1 className="page-heading">{fr ? 'Votre demande a été reçue.' : 'Your quote request is in.'}</h1>
      <p className="lead">{fr ? 'Nous avons bien reçu votre demande. L’équipe EDMTL communiquera avec vous pour discuter de votre projet.' : 'We’ve received your request. The EDMTL team will get in touch to discuss your project.'}</p>
      <p style={{ margin: '1.5rem 0' }}>{fr ? 'Vous préférez nous parler directement? ' : 'Prefer to speak with us directly? '}<a href={`tel:${siteConfig.contact.phone.replace(/-/g, '')}`} data-track-placement="thank_you">{siteConfig.contact.phone}</a></p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href={localizedPath(locale, '/')} className="button button-primary">{fr ? 'Retour à l’accueil' : 'Back to home'}</Link>
        <Link href={localizedPath(locale, '/gallery')} className="button button-secondary">{fr ? 'Voir nos réalisations' : 'Explore our work'}</Link>
      </div>
    </div>
  </section>;
}
