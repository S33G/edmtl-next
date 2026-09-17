'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '../lib/analytics';
import { type Locale, localizedPath } from '../lib/i18n';
import { canonicalServiceSlug, getPrimaryServices, getServices } from '../lib/services';
import {
  clearQuoteLanguageDraft,
  consumeQuoteLanguageDraft,
  registerQuoteDraftProvider,
} from '../lib/quote-draft';

interface ContactFormSectionProps {
  locale?: Locale;
  serviceSlug?: string;
  variant?: 'embedded' | 'dedicated';
}

const copy = {
  en: {
    eyebrow: 'LET’S TALK ABOUT YOUR PROJECT',
    title: 'Get a free quote',
    intro: 'Tell us what you need. We’ll get in touch to discuss your property.',
    required: 'Name, phone and at least one service are required.',
    name: 'Name', phone: 'Phone', email: 'Email', postalCode: 'Postal code',
    optional: 'optional', services: 'What can we help with?',
    submit: 'Request my free quote', sending: 'Sending your request…', sent: 'Request sent',
    success: 'Thank you! Your request has been sent. Taking you to your confirmation…',
    error: 'Your request could not be sent. Your details are still here — please try again.',
    validation: 'Please check the highlighted fields.',
    nameError: 'Please enter your name.', phoneError: 'Please enter your phone number.',
    emailError: 'Please enter a valid email address, or leave this field empty.',
    serviceError: 'Please select at least one service.',
    privacy: 'We use your details to respond to your request.', privacyLink: 'Privacy policy',
  },
  fr: {
    eyebrow: 'PARLONS DE VOTRE PROJET',
    title: 'Obtenez une soumission gratuite',
    intro: 'Dites-nous ce qu’il vous faut. On vous recontacte pour en discuter.',
    required: 'Le nom, le téléphone et au moins un service sont obligatoires.',
    name: 'Nom', phone: 'Téléphone', email: 'Courriel', postalCode: 'Code postal',
    optional: 'facultatif', services: 'Quels services vous intéressent?',
    submit: 'Demander ma soumission gratuite', sending: 'Envoi de votre demande…', sent: 'Demande envoyée',
    success: 'Merci! On a bien reçu votre demande. Votre confirmation s’affiche dans un instant…',
    error: 'L’envoi n’a pas fonctionné. Vos renseignements sont encore là : vous pouvez réessayer.',
    validation: 'Vérifiez les champs indiqués.',
    nameError: 'Entrez votre nom.', phoneError: 'Entrez votre numéro de téléphone.',
    emailError: 'Entrez une adresse courriel valide ou laissez ce champ vide.',
    serviceError: 'Choisissez au moins un service.',
    privacy: 'On utilise vos renseignements pour répondre à votre demande.', privacyLink: 'Politique de confidentialité',
  },
} satisfies Record<Locale, Record<string, string>>;

type FieldName = 'name' | 'phone' | 'email' | 'postalCode';
type FormErrors = Partial<Record<FieldName | 'services', string>>;

export default function ContactFormSection({ locale = 'en', serviceSlug, variant = 'embedded' }: ContactFormSectionProps) {
  const t = copy[locale];
  const services = getServices(locale);
  const primaryServices = getPrimaryServices(locale);
  const initialSlug = serviceSlug ? canonicalServiceSlug(serviceSlug) : undefined;
  const initialSelection = initialSlug && services.some((service) => service.slug === initialSlug) ? [initialSlug] : [];
  const [selectedServices, setSelectedServices] = useState<string[]>(initialSelection);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', postalCode: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const lockedRef = useRef(false);
  const startedRef = useRef(false);
  const initializedRef = useRef<string | null>(null);
  const redirectRef = useRef<number | undefined>(undefined);
  const snapshotRef = useRef({ ...formData, selectedServices });
  const id = `quote-${useId()}`;
  const locked = status === 'submitting' || status === 'success';

  useEffect(() => {
    snapshotRef.current = { ...formData, selectedServices };
  }, [formData, selectedServices]);

  useEffect(() => registerQuoteDraftProvider(() => ({
    draft: snapshotRef.current,
    isSubmitting: lockedRef.current,
  })), []);

  useEffect(() => {
    const context = `${locale}:${serviceSlug ?? ''}`;
    if (initializedRef.current === context) return;
    initializedRef.current = context;
    const draft = consumeQuoteLanguageDraft();
    const available = getServices(locale);
    const normalize = (slugs: string[]) => [...new Set(slugs.map(canonicalServiceSlug).filter((slug): slug is string => Boolean(slug && available.some((service) => service.slug === slug))))];
    if (draft) {
      const selection = normalize(draft.selectedServices);
      setFormData({ name: draft.name, phone: draft.phone, email: draft.email, postalCode: draft.postalCode });
      setSelectedServices(selection);

      return;
    }

    if (serviceSlug) {
      const selection = normalize([serviceSlug]);
      setSelectedServices(selection);

    } else {
      const query = new URLSearchParams(window.location.search).get('service');
      if (query) {
        const selection = normalize(query.split(','));
        setSelectedServices(selection);

      }
    }
  }, [locale, serviceSlug]);

  useEffect(() => () => {
    if (redirectRef.current !== undefined) window.clearTimeout(redirectRef.current);
  }, []);

  const handleFormStart = () => {
    if (startedRef.current || lockedRef.current) return;
    startedRef.current = true;
    trackEvent('form_start', { form_id: 'contact-form', locale });
  };

  const handleChange = (field: FieldName, value: string) => {
    if (lockedRef.current) return;
    handleFormStart();
    setFormData((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    if (status === 'error') setStatus('idle');
  };

  const handleServiceToggle = (slug: string) => {
    if (lockedRef.current) return;
    handleFormStart();
    const selected = !selectedServices.includes(slug);
    setSelectedServices((previous) => selected ? [...previous, slug] : previous.filter((value) => value !== slug));
    setErrors((previous) => ({ ...previous, services: undefined }));
    trackEvent('service_select', { form_id: 'contact-form', locale, service_slug: slug, selected });
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (lockedRef.current) return;
    handleFormStart();
    const nextErrors: FormErrors = {};
    if (!formData.name.trim()) nextErrors.name = t.nameError;
    if (!formData.phone.trim()) nextErrors.phone = t.phoneError;
    const emailInput = event.currentTarget.elements.namedItem('email') as HTMLInputElement | null;
    if (formData.email.trim() && emailInput?.validity.typeMismatch) nextErrors.email = t.emailError;
    if (!selectedServices.length) nextErrors.services = t.serviceError;
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus('idle');
      trackEvent('form_error', { form_id: 'contact-form', locale, error_type: 'validation_error' });
      const firstField = Object.keys(nextErrors)[0];
      window.requestAnimationFrame(() => {
        const input = firstField === 'services'
          ? formRef.current?.querySelector<HTMLInputElement>('input[type="checkbox"]')
          : formRef.current?.elements.namedItem(firstField === 'postalCode' ? 'postal-code' : firstField) as HTMLInputElement | null;
        input?.focus();
      });
      return;
    }

    lockedRef.current = true;
    setStatus('submitting');
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact-form',
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          'postal-code': formData.postalCode.trim(),
          services: selectedServices.join(', '),
          locale,
          message: '',
        }).toString(),
      });

      if (!response.ok) {
        trackEvent('form_error', { form_id: 'contact-form', locale, error_type: 'submission_failed' });
        lockedRef.current = false;
        setStatus('error');
        return;
      }

      trackEvent('generate_lead', {
        form_id: 'contact-form', locale,
        service_count: selectedServices.length,
        service_slug: selectedServices.join(','),
      });
      clearQuoteLanguageDraft();
      setStatus('success');
      redirectRef.current = window.setTimeout(() => {
        window.location.assign(localizedPath(locale, '/thank-you'));
      }, 1500);
    } catch {
      trackEvent('form_error', { form_id: 'contact-form', locale, error_type: 'network_error' });
      lockedRef.current = false;
      setStatus('error');
    }
  };

  const renderService = (service: (typeof services)[number]) => (
    <label key={service.slug} className={`service-option${selectedServices.includes(service.slug) ? ' service-option-selected' : ''}`}>
      <input
        type="checkbox" name="services" value={service.slug}
        checked={selectedServices.includes(service.slug)}
        onChange={() => handleServiceToggle(service.slug)} disabled={locked}
      />
      <span>{service.title}</span>
    </label>
  );

  return (
    <section id="quote" className={`quote-card quote-card-${variant}`} aria-labelledby={`${id}-heading`}>
      <div className={variant === 'dedicated' ? 'sr-only' : 'quote-card-header'}>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id={`${id}-heading`}>{t.title}</h2>
        <p>{t.intro}</p>
      </div>
      <form
        ref={formRef} id="contact-form" name="contact-form" method="POST"
        action={localizedPath(locale, '/thank-you')} data-netlify="true"
        className="quote-form" onSubmit={handleSubmit} onFocus={handleFormStart}
        noValidate aria-busy={status === 'submitting'}
      >
        <input type="hidden" name="form-name" value="contact-form" />
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="message" value="" />
        <p className="form-required-note">{t.required}</p>
        <div className="form-fields">
          {(['name', 'phone', 'email', 'postalCode'] as const).map((field) => {
            const required = field === 'name' || field === 'phone';
            return (
              <div className="field" key={field}>
                <label className="field-label" htmlFor={`${id}-${field}`}>
                  {t[field]} {required ? <span aria-hidden="true">*</span> : <span>({t.optional})</span>}
                </label>
                <input
                  id={`${id}-${field}`} name={field === 'postalCode' ? 'postal-code' : field}
                  type={field === 'phone' ? 'tel' : field === 'email' ? 'email' : 'text'}
                  autoComplete={field === 'phone' ? 'tel' : field === 'postalCode' ? 'postal-code' : field}
                  inputMode={field === 'phone' ? 'tel' : field === 'email' ? 'email' : 'text'}
                  autoCapitalize={field === 'email' ? 'none' : field === 'postalCode' ? 'characters' : 'words'}
                  maxLength={field === 'name' ? 120 : field === 'phone' ? 40 : field === 'email' ? 254 : 16}
                  value={formData[field]} onChange={(event) => handleChange(field, event.target.value)}
                  required={required} disabled={locked}
                  aria-invalid={Boolean(errors[field])}
                  aria-describedby={errors[field] ? `${id}-${field}-error` : undefined}
                />
                {errors[field] && <p className="field-error" id={`${id}-${field}-error`}>{errors[field]}</p>}
              </div>
            );
          })}
        </div>
        <fieldset aria-invalid={Boolean(errors.services)} aria-describedby={errors.services ? `${id}-services-error` : undefined}>
          <legend className="field-label">{t.services} <span aria-hidden="true">*</span></legend>
          <div className="service-options">
            {primaryServices.map(renderService)}

          </div>
          {errors.services && <p className="field-error" id={`${id}-services-error`}>{errors.services}</p>}
        </fieldset>
        {Object.values(errors).some(Boolean) && <p className="form-status form-status-error" role="alert">{t.validation}</p>}
        {status === 'error' && <p className="form-status form-status-error" role="alert">{t.error}</p>}
        {status === 'success' && <p className="form-status form-status-success" role="status">{t.success}</p>}
        <button type="submit" className="button button-primary" disabled={locked}>
          {status === 'submitting' ? t.sending : status === 'success' ? t.sent : t.submit}
        </button>
        <p className="form-footnote">{t.privacy} <Link href={localizedPath(locale, '/privacy-policy')}>{t.privacyLink}</Link></p>
      </form>
    </section>
  );
}
