'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

declare global {
  interface Window {
    gtag: (command: string, action: string, parameters: object) => void;
  }
}

interface ContactFormProps {
  translations?: {
    phone: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    sendRequest: string;
  };
}

export default function ContactForm({ translations }: ContactFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const label = {
    phone: translations?.phone ?? t('contact.form.phone'),
    namePlaceholder: translations?.namePlaceholder ?? t('contact.form.namePlaceholder'),
    emailPlaceholder: translations?.emailPlaceholder ?? t('contact.form.emailPlaceholder'),
    phonePlaceholder: translations?.phonePlaceholder ?? t('contact.form.phonePlaceholder'),
    messagePlaceholder: translations?.messagePlaceholder ?? t('contact.form.messagePlaceholder'),
    sendRequest: translations?.sendRequest ?? t('contact.form.sendRequest'),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact-form',
          ...formData
        }).toString()
      });

      if (response.ok) {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-17512520543/3zN_CNflsK4bEN-2z55B'
          });
        }

        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });

        setTimeout(() => {
          window.location.href = '/thank-you.html';
        }, 1500);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        name="contact-form"
        data-netlify="true"
        style={{ display: 'none' }}
      >
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <textarea name="message"></textarea>
      </form>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[var(--primary)] font-bold mb-2">{t('contact.form.name')}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none"
            placeholder={label.namePlaceholder}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-[var(--primary)] font-bold mb-2">{t('contact.form.email')}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none"
            placeholder={label.emailPlaceholder}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-[var(--primary)] font-bold mb-2">{label.phone}</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none"
            placeholder={label.phonePlaceholder}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-[var(--primary)] font-bold mb-2">{t('contact.form.message')}</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none"
            placeholder={label.messagePlaceholder}
            disabled={isSubmitting}
          />
        </div>

        {submitStatus === 'success' && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {t('contact.form.successMessage')}
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {t('contact.form.errorMessage')}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('contact.form.sending') : label.sendRequest}
        </button>
      </form>
    </>
  );
}
