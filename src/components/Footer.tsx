'use client';

import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '../../config/site.json';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const navLinks = [
    { label: t('footer.home'), href: '/' },
    { label: t('footer.services'), href: '/#services' },
    { label: t('footer.contact'), href: '/contact' },
    { label: t('footer.reviews'), href: '/#reviews' },
    { label: t('footer.faq'), href: '/#faq' },
  ];

  return (
    <footer className="border-t border-[var(--primary)]/20 bg-gradient-to-b from-[var(--background-secondary)] to-[#111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" aria-label="EDMTL Home">
              <Image
                src="/images/edm-main-logo.webp"
                alt="EDM - Entretien Domestique Montreal"
                width={200}
                height={200}
                className="h-20 md:h-24 w-auto"
              />
            </Link>
            <div className="flex flex-col items-center md:items-start gap-2">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="text-[var(--primary)] font-semibold text-lg hover:brightness-110 transition-all"
              >
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-[var(--primary)] font-semibold hover:brightness-110 transition-all uppercase"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:flex-col md:items-start md:gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--primary)] font-bold uppercase text-sm hover:brightness-125 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="text-center md:text-right">
            <div className="text-[var(--text-muted)] text-sm leading-relaxed">
              <p>{t('footer.serviceAreas')}</p>
              <p>{t('footer.serviceAreasDetail')}</p>
            </div>
            <Link
              href="/contact"
              className="mt-4 inline-block bg-[var(--primary)] text-black font-semibold px-6 py-2.5 rounded-lg hover:bg-[var(--primary-dark)] transition-colors text-sm"
            >
              {t('footer.freeQuote')}
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col items-center gap-2">
          <p className="text-[var(--text-muted)] text-sm text-center">
            {t('footer.copyright')}
          </p>
          <Link
            href="/privacy-policy"
            className="text-[var(--text-muted)] text-xs hover:text-[var(--primary)] transition-colors"
          >
            {t('footer.privacyPolicy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
