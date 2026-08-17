'use client';

export type AnalyticsParameters = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, parameters: AnalyticsParameters = {}) {
  window.gtag?.('event', eventName, parameters);
}

export function trackAdsConversion(onComplete: () => void) {
  if (!window.gtag) {
    onComplete();
    return;
  }

  window.gtag('event', 'conversion', {
    send_to: 'AW-17512520543/3zN_CNflsK4bEN-2z55B',
    event_callback: onComplete,
    event_timeout: 1200,
  });
}
