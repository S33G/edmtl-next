'use client';

import { stripLocale } from './i18n';

export interface QuoteDraft {
  name: string;
  phone: string;
  email: string;
  postalCode: string;
  selectedServices: string[];
}

interface QuoteDraftSnapshot {
  draft: QuoteDraft;
  isSubmitting: boolean;
}

type DraftProvider = () => QuoteDraftSnapshot;
const storageKey = 'edmtl:quote-language-handoff';
const lifetime = 10 * 60 * 1000;
let draftProvider: DraftProvider | undefined;

export function registerQuoteDraftProvider(provider: DraftProvider): () => void {
  draftProvider = provider;
  return () => {
    if (draftProvider === provider) draftProvider = undefined;
  };
}

function pathLocale(pathname: string): 'en' | 'fr' {
  return /^\/fr(?:\/|$)/.test(pathname) ? 'fr' : 'en';
}

export function clearQuoteLanguageDraft(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(storageKey);
  } catch {
    // Storage can be unavailable in a private or restricted browser session.
  }
}

/** Save only for an explicit language switch, never on ordinary form edits. */
export function prepareQuoteLanguageSwitch(): boolean {
  if (typeof window === 'undefined') return true;
  const snapshot = draftProvider?.();
  if (snapshot?.isSubmitting) return false;
  clearQuoteLanguageDraft();
  if (!snapshot) return true;
  try {
    window.sessionStorage.setItem(storageKey, JSON.stringify({
      version: 1,
      path: stripLocale(window.location.pathname),
      sourceLocale: pathLocale(window.location.pathname),
      expiresAt: Date.now() + lifetime,
      draft: snapshot.draft,
    }));
  } catch {
    // Language navigation remains available when storage is disabled.
  }
  return true;
}

/** Consume once, only on the equivalent page in the other language. */
export function consumeQuoteLanguageDraft(): QuoteDraft | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.sessionStorage.getItem(storageKey);
    window.sessionStorage.removeItem(storageKey);
    if (!stored) return null;
    const handoff = JSON.parse(stored);
    if (
      handoff.version !== 1 ||
      handoff.path !== stripLocale(window.location.pathname) ||
      handoff.sourceLocale === pathLocale(window.location.pathname) ||
      typeof handoff.expiresAt !== 'number' ||
      handoff.expiresAt < Date.now() ||
      handoff.expiresAt > Date.now() + lifetime
    ) return null;
    const draft = handoff.draft;
    if (!draft || !['name', 'phone', 'email', 'postalCode'].every((key) => typeof draft[key] === 'string')) return null;
    if (!Array.isArray(draft.selectedServices) || !draft.selectedServices.every((slug: unknown) => typeof slug === 'string')) return null;
    return {
      name: draft.name.slice(0, 120),
      phone: draft.phone.slice(0, 40),
      email: draft.email.slice(0, 254),
      postalCode: draft.postalCode.slice(0, 16),
      selectedServices: draft.selectedServices.slice(0, 20),
    };
  } catch {
    return null;
  }
}
