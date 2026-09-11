import { Suspense } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import { Locale } from '@/lib/i18n';
import AnalyticsTracker from './AnalyticsTracker';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import '@/app/globals.css';

export default function SiteLayout({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return <html lang={locale}><body>
    <GoogleTagManager gtmId="GTM-W98ZQFSS" />
    <Suspense fallback={null}><AnalyticsTracker /></Suspense>
    <SiteHeader locale={locale} />
    <main id="main" tabIndex={-1}>{children}</main>
    <SiteFooter locale={locale} />
  </body></html>;
}
