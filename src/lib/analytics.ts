'use client';

import { sendGTMEvent } from '@next/third-parties/google';

export type AnalyticsParameters = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, parameters: AnalyticsParameters = {}) {
  sendGTMEvent({ event: eventName, ...parameters });
}
