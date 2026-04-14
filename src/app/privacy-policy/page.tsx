import { Metadata } from 'next';
import Footer from '../../components/Footer';
import SubpageHeader from '../../components/SubpageHeader';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for EDMTL - Entretien Domestique Montreal. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://edmtl.com/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen hex-pattern bg-[var(--background)]">
      <SubpageHeader />

      <section className="pt-12 sm:pt-20 pb-10 sm:pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] tracking-tight mb-4 text-center">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--text-muted)] text-center mb-12">
            Last updated: April 14, 2025
          </p>

          <div className="space-y-10 text-[var(--foreground-secondary)] leading-relaxed">
            {/* Introduction */}
            <div>
              <p>
                Entretien Domestique Montreal (&ldquo;EDMTL&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website{' '}
                <a
                  href="https://edmtl.com"
                  className="text-[var(--primary)] hover:underline"
                >
                  edmtl.com
                </a>
                . This Privacy Policy explains what personal information we collect, how we use it,
                and your rights regarding that information.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
                1. Information We Collect
              </h2>

              <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">
                a) Information You Provide
              </h3>
              <p className="mb-3">
                When you submit our contact form to request a quote, we collect the following
                information:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 mb-6">
                <li>
                  <strong className="text-[var(--foreground)]">Name</strong> &mdash; to identify you
                  and address you personally
                </li>
                <li>
                  <strong className="text-[var(--foreground)]">Email address</strong> &mdash; to
                  respond to your inquiry
                </li>
                <li>
                  <strong className="text-[var(--foreground)]">Phone number</strong> &mdash; to
                  contact you about your service request
                </li>
                <li>
                  <strong className="text-[var(--foreground)]">Message content</strong> &mdash; to
                  understand your project requirements
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">
                b) Information Collected Automatically
              </h3>
              <p className="mb-3">
                When you visit our website, certain information is collected automatically through
                third-party services:
              </p>

              <h4 className="font-semibold text-[var(--foreground)] mt-4 mb-1">
                Google Analytics &amp; Google Ads
              </h4>
              <p className="mb-2">
                We use Google Analytics and Google Ads conversion tracking to understand how visitors
                use our site and to measure the effectiveness of our advertising. These services may
                collect:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 mb-4">
                <li>IP address (anonymised where possible)</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referring website or source</li>
                <li>Device type (desktop, mobile, tablet)</li>
                <li>Approximate geographic location (city/region level)</li>
                <li>Form submission conversion events (no form content is sent to Google)</li>
              </ul>
              <p className="mb-6 text-sm text-[var(--text-muted)]">
                Google Analytics uses cookies to collect this data. For more information, see{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] hover:underline"
                >
                  Google&apos;s Privacy Policy
                </a>
                . You can opt out of Google Analytics by installing the{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] hover:underline"
                >
                  Google Analytics Opt-Out Browser Add-on
                </a>
                .
              </p>

              <h4 className="font-semibold text-[var(--foreground)] mt-4 mb-1">
                Google Fonts
              </h4>
              <p className="mb-6">
                Our website loads fonts (Geist and Geist Mono) from Google&apos;s font service. When
                your browser requests these fonts, your IP address is transmitted to Google. See{' '}
                <a
                  href="https://developers.google.com/fonts/faq/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] hover:underline"
                >
                  Google Fonts Privacy
                </a>{' '}
                for details.
              </p>

              <h4 className="font-semibold text-[var(--foreground)] mt-4 mb-1">
                Hosting &amp; Server Logs
              </h4>
              <p>
                Our website is hosted on Netlify. Netlify automatically collects standard server log
                information including your IP address, browser user agent, referring page, and the
                date and time of each request. This data is used for security, performance
                monitoring, and abuse prevention. See{' '}
                <a
                  href="https://www.netlify.com/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] hover:underline"
                >
                  Netlify&apos;s Privacy Policy
                </a>{' '}
                for details.
              </p>
            </div>

            {/* How We Use Your Information */}
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
                2. How We Use Your Information
              </h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Respond to your quote requests and inquiries</li>
                <li>Schedule and coordinate our maintenance services</li>
                <li>Understand how visitors use our website to improve the user experience</li>
                <li>Measure the performance of our advertising campaigns</li>
                <li>Maintain the security and performance of our website</li>
              </ul>
            </div>

            {/* Form Submissions & Netlify */}
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
                3. Form Submissions
              </h2>
              <p>
                Contact form submissions are processed and stored by Netlify Forms. When you submit
                the form, your name, email, phone number, and message are transmitted to Netlify and
                made available to us through their dashboard. We use this data solely to respond to
                your inquiry. We do not sell, rent, or share this information with any unrelated
                third party.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
                4. Cookies
              </h2>
              <p className="mb-3">Our website uses the following cookies:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse mb-4">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="text-left py-2 pr-4 text-[var(--primary)] font-semibold">
                        Cookie
                      </th>
                      <th className="text-left py-2 pr-4 text-[var(--primary)] font-semibold">
                        Provider
                      </th>
                      <th className="text-left py-2 pr-4 text-[var(--primary)] font-semibold">
                        Purpose
                      </th>
                      <th className="text-left py-2 text-[var(--primary)] font-semibold">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[var(--border)]/50">
                      <td className="py-2 pr-4 font-mono text-xs">_ga</td>
                      <td className="py-2 pr-4">Google Analytics</td>
                      <td className="py-2 pr-4">Distinguishes unique visitors</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr className="border-b border-[var(--border)]/50">
                      <td className="py-2 pr-4 font-mono text-xs">_ga_*</td>
                      <td className="py-2 pr-4">Google Analytics</td>
                      <td className="py-2 pr-4">Maintains session state</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr className="border-b border-[var(--border)]/50">
                      <td className="py-2 pr-4 font-mono text-xs">_gcl_au</td>
                      <td className="py-2 pr-4">Google Ads</td>
                      <td className="py-2 pr-4">Stores ad click information for conversion tracking</td>
                      <td className="py-2">90 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                You can control or delete cookies through your browser settings. Blocking cookies may
                affect how some features of the site function.
              </p>
            </div>

            {/* Third-Party Services */}
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
                5. Third-Party Services
              </h2>
              <p className="mb-3">We use the following third-party services that may process your data:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong className="text-[var(--foreground)]">Google Analytics / Google Ads</strong>{' '}
                  &mdash; website analytics and advertising conversion tracking
                </li>
                <li>
                  <strong className="text-[var(--foreground)]">Google Fonts</strong> &mdash; web font
                  delivery
                </li>
                <li>
                  <strong className="text-[var(--foreground)]">Netlify</strong> &mdash; website
                  hosting and form submission processing
                </li>
                <li>
                  <strong className="text-[var(--foreground)]">Google Maps</strong> &mdash; linked
                  for directions and reviews (opens externally; we do not embed Google Maps on this
                  site)
                </li>
              </ul>
              <p className="mt-3">
                Each third-party service operates under its own privacy policy. We encourage you to
                review their policies.
              </p>
            </div>

            {/* Data Retention */}
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
                6. Data Retention
              </h2>
              <p>
                We retain contact form submissions for as long as necessary to respond to your
                inquiry and to maintain records of our business communications. Analytics data is
                retained according to Google&apos;s default retention periods (14 months). Server
                logs are retained by Netlify according to their data retention policies.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
                7. Your Rights
              </h2>
              <p className="mb-3">
                Under applicable Canadian privacy legislation, including Quebec&apos;s Law 25 (
                <em>Loi modernisant des dispositions l&eacute;gislatives en mati&egrave;re de
                protection des renseignements personnels</em>
                ) and the Personal Information Protection and Electronic Documents Act (PIPEDA), you
                have the right to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Withdraw your consent to data processing</li>
                <li>File a complaint with the Commission d&apos;acc&egrave;s &agrave; l&apos;information du Qu&eacute;bec (CAI)</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us using the details below.
              </p>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
                8. Data Security
              </h2>
              <p>
                Our website is served over HTTPS, ensuring that data transmitted between your browser
                and our server is encrypted. Form submissions are processed securely through
                Netlify&apos;s infrastructure. While we take reasonable measures to protect your
                information, no method of electronic transmission or storage is 100% secure.
              </p>
            </div>

            {/* Children */}
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
                9. Children&apos;s Privacy
              </h2>
              <p>
                Our website and services are not directed to individuals under the age of 18. We do
                not knowingly collect personal information from children. If you believe a child has
                provided us with personal information, please contact us and we will delete it.
              </p>
            </div>

            {/* Changes */}
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
                10. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on
                this page with a revised &ldquo;Last updated&rdquo; date. We encourage you to review
                this page periodically.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
                11. Contact Us
              </h2>
              <p className="mb-3">
                If you have any questions about this Privacy Policy or wish to exercise your privacy
                rights, please contact us:
              </p>
              <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-xl p-6">
                <p className="font-semibold text-[var(--foreground)] mb-2">
                  Entretien Domestique Montreal
                </p>
                <p>
                  Email:{' '}
                  <a
                    href="mailto:info@edmtl.com"
                    className="text-[var(--primary)] hover:underline"
                  >
                    info@edmtl.com
                  </a>
                </p>
                <p>
                  Phone:{' '}
                  <a
                    href="tel:4385003099"
                    className="text-[var(--primary)] hover:underline"
                  >
                    438-500-3099
                  </a>
                </p>
                <p>Montreal, QC, Canada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
