'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackEvent } from '../lib/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    const pagePath = search ? `${pathname}?${search}` : pathname;

    trackEvent('page_view', {
      page_location: window.location.href,
      page_path: pagePath,
      page_title: document.title,
    });

    const serviceSlug = pathname.match(/^\/services\/([^/]+)$/)?.[1];
    if (serviceSlug) {
      trackEvent('view_item', {
        item_id: serviceSlug,
        item_name: serviceSlug,
        item_category: 'service',
      });
    }
  }, [pathname, search]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const element = (event.target as HTMLElement).closest<HTMLElement>('a, button');
      if (!element) return;

      const placement = element.dataset.trackPlacement || pathname;
      const href = element instanceof HTMLAnchorElement ? element.href : '';

      if (href.startsWith('tel:')) {
        trackEvent('phone_click', { placement });
        return;
      }

      if (href.startsWith('mailto:')) {
        trackEvent('email_click', { placement });
        return;
      }

      const eventName = element.dataset.trackEvent;
      if (!eventName) return;

      trackEvent(eventName, {
        placement,
        destination: href || undefined,
        service_slug: element.dataset.trackService,
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  return null;
}
