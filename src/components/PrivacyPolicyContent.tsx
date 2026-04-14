'use client';

import { useTranslation } from 'react-i18next';

export default function PrivacyPolicyContent() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === 'fr';

  return (
    <section className="pt-12 sm:pt-20 pb-10 sm:pb-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] tracking-tight mb-4 text-center">
          {isFr ? 'Politique de confidentialité' : 'Privacy Policy'}
        </h1>
        <p className="text-sm text-[var(--text-muted)] text-center mb-12">
          {isFr ? 'Dernière mise à jour : 14 avril 2025' : 'Last updated: April 14, 2025'}
        </p>

        <div className="space-y-10 text-[var(--foreground-secondary)] leading-relaxed">
          <div>
            <p>
              {isFr
                ? <>Entretien Domestique Montreal (&laquo;&nbsp;EDMTL&nbsp;&raquo;, &laquo;&nbsp;nous&nbsp;&raquo;, &laquo;&nbsp;notre&nbsp;&raquo;) exploite le site web{' '}<a href="https://edmtl.com" className="text-[var(--primary)] hover:underline">edmtl.com</a>. Cette politique de confidentialité explique quelles informations personnelles nous recueillons, comment nous les utilisons et vos droits concernant ces informations.</>
                : <>Entretien Domestique Montreal (&ldquo;EDMTL&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website{' '}<a href="https://edmtl.com" className="text-[var(--primary)] hover:underline">edmtl.com</a>. This Privacy Policy explains what personal information we collect, how we use it, and your rights regarding that information.</>
              }
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
              {isFr ? '1. Informations que nous recueillons' : '1. Information We Collect'}
            </h2>

            <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">
              {isFr ? 'a) Informations que vous fournissez' : 'a) Information You Provide'}
            </h3>
            <p className="mb-3">
              {isFr
                ? 'Lorsque vous soumettez notre formulaire de contact pour demander un devis, nous recueillons les informations suivantes :'
                : 'When you submit our contact form to request a quote, we collect the following information:'}
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2 mb-6">
              <li><strong className="text-[var(--foreground)]">{isFr ? 'Nom' : 'Name'}</strong> &mdash; {isFr ? 'pour vous identifier et vous adresser personnellement' : 'to identify you and address you personally'}</li>
              <li><strong className="text-[var(--foreground)]">{isFr ? 'Adresse email' : 'Email address'}</strong> &mdash; {isFr ? 'pour répondre à votre demande' : 'to respond to your inquiry'}</li>
              <li><strong className="text-[var(--foreground)]">{isFr ? 'Numéro de téléphone' : 'Phone number'}</strong> &mdash; {isFr ? 'pour vous contacter au sujet de votre demande de service' : 'to contact you about your service request'}</li>
              <li><strong className="text-[var(--foreground)]">{isFr ? 'Contenu du message' : 'Message content'}</strong> &mdash; {isFr ? 'pour comprendre les exigences de votre projet' : 'to understand your project requirements'}</li>
            </ul>

            <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">
              {isFr ? 'b) Informations recueillies automatiquement' : 'b) Information Collected Automatically'}
            </h3>
            <p className="mb-3">
              {isFr
                ? 'Lorsque vous visitez notre site web, certaines informations sont recueillies automatiquement par des services tiers :'
                : 'When you visit our website, certain information is collected automatically through third-party services:'}
            </p>

            <h4 className="font-semibold text-[var(--foreground)] mt-4 mb-1">
              Google Analytics &amp; Google Ads
            </h4>
            <p className="mb-2">
              {isFr
                ? "Nous utilisons Google Analytics et le suivi des conversions Google Ads pour comprendre comment les visiteurs utilisent notre site et mesurer l'efficacité de notre publicité. Ces services peuvent recueillir :"
                : 'We use Google Analytics and Google Ads conversion tracking to understand how visitors use our site and to measure the effectiveness of our advertising. These services may collect:'}
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2 mb-4">
              <li>{isFr ? 'Adresse IP (anonymisée dans la mesure du possible)' : 'IP address (anonymised where possible)'}</li>
              <li>{isFr ? 'Type et version du navigateur' : 'Browser type and version'}</li>
              <li>{isFr ? 'Système d\'exploitation' : 'Operating system'}</li>
              <li>{isFr ? 'Pages visitées et temps passé sur chaque page' : 'Pages visited and time spent on each page'}</li>
              <li>{isFr ? 'Site web ou source de référence' : 'Referring website or source'}</li>
              <li>{isFr ? 'Type d\'appareil (ordinateur, mobile, tablette)' : 'Device type (desktop, mobile, tablet)'}</li>
              <li>{isFr ? 'Localisation géographique approximative (niveau ville/région)' : 'Approximate geographic location (city/region level)'}</li>
              <li>{isFr ? 'Événements de conversion de soumission de formulaire (aucun contenu de formulaire n\'est envoyé à Google)' : 'Form submission conversion events (no form content is sent to Google)'}</li>
            </ul>
            <p className="mb-6 text-sm text-[var(--text-muted)]">
              {isFr
                ? <>Google Analytics utilise des cookies pour recueillir ces données. Pour plus d&apos;informations, consultez la{' '}<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">Politique de confidentialité de Google</a>. Vous pouvez vous désinscrire de Google Analytics en installant le{' '}<a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">Module complémentaire de navigateur pour la désactivation de Google Analytics</a>.</>
                : <>Google Analytics uses cookies to collect this data. For more information, see{' '}<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">Google&apos;s Privacy Policy</a>. You can opt out of Google Analytics by installing the{' '}<a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">Google Analytics Opt-Out Browser Add-on</a>.</>
              }
            </p>

            <h4 className="font-semibold text-[var(--foreground)] mt-4 mb-1">Google Fonts</h4>
            <p className="mb-6">
              {isFr
                ? <>Notre site web charge des polices (Geist et Geist Mono) depuis le service de polices de Google. Lorsque votre navigateur demande ces polices, votre adresse IP est transmise à Google. Voir{' '}<a href="https://developers.google.com/fonts/faq/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">Google Fonts Privacy</a> pour les détails.</>
                : <>Our website loads fonts (Geist and Geist Mono) from Google&apos;s font service. When your browser requests these fonts, your IP address is transmitted to Google. See{' '}<a href="https://developers.google.com/fonts/faq/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">Google Fonts Privacy</a> for details.</>
              }
            </p>

            <h4 className="font-semibold text-[var(--foreground)] mt-4 mb-1">
              {isFr ? 'Hébergement et journaux serveur' : 'Hosting & Server Logs'}
            </h4>
            <p>
              {isFr
                ? <>Notre site web est hébergé sur Netlify. Netlify recueille automatiquement les informations standard des journaux serveur, y compris votre adresse IP, l&apos;agent utilisateur du navigateur, la page de référence et la date et l&apos;heure de chaque requête. Ces données sont utilisées pour la sécurité, la surveillance des performances et la prévention des abus. Voir la{' '}<a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">Politique de confidentialité de Netlify</a> pour les détails.</>
                : <>Our website is hosted on Netlify. Netlify automatically collects standard server log information including your IP address, browser user agent, referring page, and the date and time of each request. This data is used for security, performance monitoring, and abuse prevention. See{' '}<a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">Netlify&apos;s Privacy Policy</a> for details.</>
              }
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
              {isFr ? '2. Comment nous utilisons vos informations' : '2. How We Use Your Information'}
            </h2>
            <p className="mb-3">{isFr ? 'Nous utilisons les informations recueillies pour :' : 'We use the information we collect to:'}</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>{isFr ? 'Répondre à vos demandes de devis et questions' : 'Respond to your quote requests and inquiries'}</li>
              <li>{isFr ? 'Planifier et coordonner nos services d\'entretien' : 'Schedule and coordinate our maintenance services'}</li>
              <li>{isFr ? 'Comprendre comment les visiteurs utilisent notre site web pour améliorer l\'expérience utilisateur' : 'Understand how visitors use our website to improve the user experience'}</li>
              <li>{isFr ? 'Mesurer la performance de nos campagnes publicitaires' : 'Measure the performance of our advertising campaigns'}</li>
              <li>{isFr ? 'Maintenir la sécurité et la performance de notre site web' : 'Maintain the security and performance of our website'}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
              {isFr ? '3. Soumissions de formulaires' : '3. Form Submissions'}
            </h2>
            <p>
              {isFr
                ? 'Les soumissions du formulaire de contact sont traitées et stockées par Netlify Forms. Lorsque vous soumettez le formulaire, votre nom, email, numéro de téléphone et message sont transmis à Netlify et mis à notre disposition via leur tableau de bord. Nous utilisons ces données uniquement pour répondre à votre demande. Nous ne vendons, ne louons ni ne partageons ces informations avec des tiers non liés.'
                : 'Contact form submissions are processed and stored by Netlify Forms. When you submit the form, your name, email, phone number, and message are transmitted to Netlify and made available to us through their dashboard. We use this data solely to respond to your inquiry. We do not sell, rent, or share this information with any unrelated third party.'}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
              4. Cookies
            </h2>
            <p className="mb-3">{isFr ? 'Notre site web utilise les cookies suivants :' : 'Our website uses the following cookies:'}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mb-4">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-2 pr-4 text-[var(--primary)] font-semibold">Cookie</th>
                    <th className="text-left py-2 pr-4 text-[var(--primary)] font-semibold">{isFr ? 'Fournisseur' : 'Provider'}</th>
                    <th className="text-left py-2 pr-4 text-[var(--primary)] font-semibold">{isFr ? 'Objectif' : 'Purpose'}</th>
                    <th className="text-left py-2 text-[var(--primary)] font-semibold">{isFr ? 'Durée' : 'Duration'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--border)]/50">
                    <td className="py-2 pr-4 font-mono text-xs">_ga</td>
                    <td className="py-2 pr-4">Google Analytics</td>
                    <td className="py-2 pr-4">{isFr ? 'Distingue les visiteurs uniques' : 'Distinguishes unique visitors'}</td>
                    <td className="py-2">{isFr ? '2 ans' : '2 years'}</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]/50">
                    <td className="py-2 pr-4 font-mono text-xs">_ga_*</td>
                    <td className="py-2 pr-4">Google Analytics</td>
                    <td className="py-2 pr-4">{isFr ? 'Maintient l\'état de la session' : 'Maintains session state'}</td>
                    <td className="py-2">{isFr ? '2 ans' : '2 years'}</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]/50">
                    <td className="py-2 pr-4 font-mono text-xs">_gcl_au</td>
                    <td className="py-2 pr-4">Google Ads</td>
                    <td className="py-2 pr-4">{isFr ? 'Stocke les informations de clic publicitaire pour le suivi des conversions' : 'Stores ad click information for conversion tracking'}</td>
                    <td className="py-2">{isFr ? '90 jours' : '90 days'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              {isFr
                ? 'Vous pouvez contrôler ou supprimer les cookies via les paramètres de votre navigateur. Le blocage des cookies peut affecter le fonctionnement de certaines fonctionnalités du site.'
                : 'You can control or delete cookies through your browser settings. Blocking cookies may affect how some features of the site function.'}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
              {isFr ? '5. Services tiers' : '5. Third-Party Services'}
            </h2>
            <p className="mb-3">{isFr ? 'Nous utilisons les services tiers suivants qui peuvent traiter vos données :' : 'We use the following third-party services that may process your data:'}</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong className="text-[var(--foreground)]">Google Analytics / Google Ads</strong> &mdash; {isFr ? 'analyse de site web et suivi des conversions publicitaires' : 'website analytics and advertising conversion tracking'}</li>
              <li><strong className="text-[var(--foreground)]">Google Fonts</strong> &mdash; {isFr ? 'fourniture de polices web' : 'web font delivery'}</li>
              <li><strong className="text-[var(--foreground)]">Netlify</strong> &mdash; {isFr ? 'hébergement de site web et traitement des soumissions de formulaires' : 'website hosting and form submission processing'}</li>
              <li><strong className="text-[var(--foreground)]">Google Maps</strong> &mdash; {isFr ? 'lié pour les itinéraires et avis (s\'ouvre en externe; nous n\'intégrons pas Google Maps sur ce site)' : 'linked for directions and reviews (opens externally; we do not embed Google Maps on this site)'}</li>
            </ul>
            <p className="mt-3">
              {isFr
                ? 'Chaque service tiers fonctionne selon sa propre politique de confidentialité. Nous vous encourageons à consulter leurs politiques.'
                : 'Each third-party service operates under its own privacy policy. We encourage you to review their policies.'}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
              {isFr ? '6. Conservation des données' : '6. Data Retention'}
            </h2>
            <p>
              {isFr
                ? "Nous conservons les soumissions du formulaire de contact aussi longtemps que nécessaire pour répondre à votre demande et maintenir les registres de nos communications commerciales. Les données d'analyse sont conservées selon les périodes de conservation par défaut de Google (14 mois). Les journaux serveur sont conservés par Netlify selon leurs politiques de conservation des données."
                : "We retain contact form submissions for as long as necessary to respond to your inquiry and to maintain records of our business communications. Analytics data is retained according to Google's default retention periods (14 months). Server logs are retained by Netlify according to their data retention policies."}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
              {isFr ? '7. Vos droits' : '7. Your Rights'}
            </h2>
            <p className="mb-3">
              {isFr
                ? 'En vertu de la législation canadienne applicable en matière de vie privée, y compris la Loi 25 du Québec (Loi modernisant des dispositions législatives en matière de protection des renseignements personnels) et la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE), vous avez le droit de :'
                : <>Under applicable Canadian privacy legislation, including Quebec&apos;s Law 25 (<em>Loi modernisant des dispositions l&eacute;gislatives en mati&egrave;re de protection des renseignements personnels</em>) and the Personal Information Protection and Electronic Documents Act (PIPEDA), you have the right to:</>}
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>{isFr ? 'Accéder aux informations personnelles que nous détenons à votre sujet' : 'Access the personal information we hold about you'}</li>
              <li>{isFr ? 'Demander la correction d\'informations inexactes' : 'Request correction of inaccurate information'}</li>
              <li>{isFr ? 'Demander la suppression de vos informations personnelles' : 'Request deletion of your personal information'}</li>
              <li>{isFr ? 'Retirer votre consentement au traitement des données' : 'Withdraw your consent to data processing'}</li>
              <li>{isFr ? "Déposer une plainte auprès de la Commission d'accès à l'information du Québec (CAI)" : "File a complaint with the Commission d'accès à l'information du Québec (CAI)"}</li>
            </ul>
            <p className="mt-3">
              {isFr
                ? 'Pour exercer l\'un de ces droits, veuillez nous contacter en utilisant les coordonnées ci-dessous.'
                : 'To exercise any of these rights, please contact us using the details below.'}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
              {isFr ? '8. Sécurité des données' : '8. Data Security'}
            </h2>
            <p>
              {isFr
                ? "Notre site web est servi via HTTPS, garantissant que les données transmises entre votre navigateur et notre serveur sont cryptées. Les soumissions de formulaires sont traitées de manière sécurisée via l'infrastructure de Netlify. Bien que nous prenions des mesures raisonnables pour protéger vos informations, aucune méthode de transmission électronique ou de stockage n'est sécurisée à 100%."
                : "Our website is served over HTTPS, ensuring that data transmitted between your browser and our server is encrypted. Form submissions are processed securely through Netlify's infrastructure. While we take reasonable measures to protect your information, no method of electronic transmission or storage is 100% secure."}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
              {isFr ? '9. Vie privée des enfants' : "9. Children's Privacy"}
            </h2>
            <p>
              {isFr
                ? "Notre site web et nos services ne s'adressent pas aux personnes de moins de 18 ans. Nous ne recueillons pas sciemment d'informations personnelles auprès d'enfants. Si vous pensez qu'un enfant nous a fourni des informations personnelles, veuillez nous contacter et nous les supprimerons."
                : 'Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it.'}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
              {isFr ? '10. Modifications de cette politique' : '10. Changes to This Policy'}
            </h2>
            <p>
              {isFr
                ? "Nous pouvons mettre à jour cette politique de confidentialité de temps en temps. Tout changement sera publié sur cette page avec une date de « dernière mise à jour » révisée. Nous vous encourageons à consulter cette page périodiquement."
                : 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised "Last updated" date. We encourage you to review this page periodically.'}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
              {isFr ? '11. Nous contacter' : '11. Contact Us'}
            </h2>
            <p className="mb-3">
              {isFr
                ? 'Si vous avez des questions sur cette politique de confidentialité ou souhaitez exercer vos droits en matière de vie privée, veuillez nous contacter :'
                : 'If you have any questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:'}
            </p>
            <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-xl p-6">
              <p className="font-semibold text-[var(--foreground)] mb-2">
                Entretien Domestique Montreal
              </p>
              <p>
                Email:{' '}
                <a href="mailto:info@edmtl.com" className="text-[var(--primary)] hover:underline">
                  info@edmtl.com
                </a>
              </p>
              <p>
                {isFr ? 'Téléphone' : 'Phone'}:{' '}
                <a href="tel:4385003099" className="text-[var(--primary)] hover:underline">
                  438-500-3099
                </a>
              </p>
              <p>{isFr ? 'Montréal, QC, Canada' : 'Montreal, QC, Canada'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
