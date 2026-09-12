'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { HiBars3, HiXMark, HiArrowUpRight, HiPhone } from 'react-icons/hi2';
import { Locale, localizedPath, navigation, stripLocale } from '@/lib/i18n';
import { prepareQuoteLanguageSwitch } from '@/lib/quote-draft';
import site from '../../config/site.json';

export default function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const path = stripLocale(pathname);
  const labels = navigation[locale];
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const isService = path.startsWith('/services/');
  const isContact = path === '/contact';
  const quoteHref = isService || isContact ? '#quote' : localizedPath(locale, '/contact');
  const links = [
    { path: '/#services', label: labels.services },
    { path: '/faq', label: labels.faq },
    { path: '/gallery', label: labels.gallery },
    { path: '/terms', label: labels.terms },
  ];

  useEffect(() => {
    if (!open) return;
    panel.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function closeMenu() {
    panel.current?.close();
    setOpen(false);
    menuButton.current?.focus();
  }

  function switchLanguage(event: React.MouseEvent<HTMLAnchorElement>, next: Locale) {
    event.preventDefault();
    if (next === locale) return;
    if (!prepareQuoteLanguageSwitch()) return;
    const query = new URLSearchParams(window.location.search);
    // Only a service identifier, never customer details, travels in the URL.
    const service = query.get('service');
    const suffix = service ? `?${new URLSearchParams({ service })}` : '';
    window.location.assign(`${localizedPath(next, path)}${suffix}${window.location.hash}`);
  }

  const languageLinks = <div className="language-switch" role="group" aria-label={locale === 'en' ? 'Website language' : 'Langue du site'}>
    {(['en', 'fr'] as const).map(lang => <a key={lang} href={localizedPath(lang, path)} lang={lang} hrefLang={lang} aria-label={lang === 'en' ? 'English' : 'Français'} aria-current={locale === lang ? 'page' : undefined} onClick={event => switchLanguage(event, lang)}>{lang.toUpperCase()}</a>)}
  </div>;

  return <>
    <a className="skip-link" href="#main">{labels.skip}</a>
    <header className={`site-header ${isContact ? 'site-header-compact' : ''}`}>
      <div className="container header-inner">
        <Link className="brand" href={localizedPath(locale, '/')} aria-label={`EDMTL — ${labels.home}`}>
          <Image src="/images/edm-box-logo.png" width={60} height={60} alt="" priority />
          <span><strong>EDMTL<span className="brand-dot">.</span></strong><small>Entretien Domestique Montréal</small></span>
        </Link>
        <nav className="desktop-nav" aria-label={locale === 'en' ? 'Main navigation' : 'Navigation principale'}>
          {links.map(link => <Link key={link.path} href={localizedPath(locale, link.path)} aria-current={path === link.path ? 'page' : undefined}>{link.label}</Link>)}
        </nav>
        <div className="header-actions">{languageLinks}<a className="button button-primary header-quote" href={quoteHref} data-track-event="quote_cta_click" data-track-placement="header">{labels.quote}<HiArrowUpRight aria-hidden="true" /></a>
          <button ref={menuButton} className="menu-toggle icon-button" onClick={() => setOpen(true)} aria-label={labels.menu} aria-expanded={open} aria-controls="mobile-navigation"><HiBars3 aria-hidden="true" /></button>
        </div>
      </div>
    </header>
    <dialog ref={panel} id="mobile-navigation" className="mobile-menu" aria-label={labels.menu} onCancel={() => setOpen(false)} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) closeMenu(); }}>
      <div className="mobile-menu-content"><div className="mobile-menu-top"><strong>EDMTL.</strong><button className="icon-button" onClick={closeMenu} aria-label={labels.close}><HiXMark /></button></div>
        <nav aria-label={labels.menu}><Link href={localizedPath(locale, '/')} onClick={closeMenu}>{labels.home}</Link>{links.map(link => <Link key={link.path} href={localizedPath(locale, link.path)} onClick={closeMenu}>{link.label}</Link>)}</nav>
        <a className="button button-primary" href={quoteHref} onClick={closeMenu} data-track-event="quote_cta_click" data-track-placement="mobile-menu">{labels.quote}<HiArrowUpRight /></a>
        <a className="menu-phone" href={`tel:${site.contact.phone}`}><HiPhone /> {site.contact.phone}</a>
        {languageLinks}
      </div>
    </dialog>
    <div className="mobile-actions"><a href={`tel:${site.contact.phone}`}><HiPhone aria-hidden="true" />{labels.call}</a><a href={quoteHref} data-track-event="quote_cta_click" data-track-placement="mobile-sticky">{labels.quote}<HiArrowUpRight aria-hidden="true" /></a></div>
  </>;
}
