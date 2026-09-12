'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackEvent } from '../lib/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const locale = /^\/fr(?:\/|$)/.test(pathname) ? 'fr' : 'en';

  useEffect(() => {
    const pagePath = search ? `${pathname}?${search}` : pathname;

    trackEvent('page_view', {
      page_location: window.location.href,
      page_path: pagePath,
      page_title: document.title,
      locale,
    });

    const serviceSlug = pathname.match(/^(?:\/fr)?\/services\/([^/]+)\/?$/)?.[1];
    if (serviceSlug) {
      trackEvent('view_item', {
        item_id: serviceSlug,
        item_name: serviceSlug,
        item_category: 'service',
        locale,
      });
    }
  }, [pathname, search, locale]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>('a, button') : null;
      if (!element) return;

      const placement = element.dataset.trackPlacement || pathname;
      const href = element instanceof HTMLAnchorElement ? element.href : '';

      if (href.startsWith('tel:')) {
        trackEvent('phone_click', { placement, locale });
        return;
      }

      if (href.startsWith('mailto:')) {
        trackEvent('email_click', { placement, locale });
        return;
      }

      const eventName = element.dataset.trackEvent;
      if (!eventName) return;

      trackEvent(eventName, {
        placement,
        destination: href || undefined,
        service_slug: element.dataset.trackService,
        locale,
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname, locale]);

  return null;
}
