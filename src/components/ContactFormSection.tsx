'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import siteConfig from '../../config/site.json';
import servicesData from '../../config/services.json';

declare global {
  interface Window {
    gtag: (command: string, action: string, parameters: object) => void;
  }
}

interface Service {
  slug: string;
  title: string;
}

export default function ContactFormSection() {
  const phone = siteConfig.contact.phone;
  const email = siteConfig.contact.email;
  const services = servicesData.services as Service[];

  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service');

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Pre-select service from URL param on mount
  useEffect(() => {
    if (preselectedService) {
      const service = services.find((s) => s.slug === preselectedService);
      if (service) {
        setSelectedServices([service.slug]);
      }
    }
  }, [preselectedService, services]);

  const handleServiceToggle = (slug: string) => {
    setSelectedServices((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          ...formData,
          services: selectedServices.join(', '),
        }).toString(),
      });

      if (response.ok) {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            send_to: 'AW-17512520543/3zN_CNflsK4bEN-2z55B',
          });
        }
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setSelectedServices([]);
        setTimeout(() => {
          window.location.href = '/thank-you.html';
        }, 1500);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <form
          name="contact-form"
          data-netlify="true"
          style={{ display: 'none' }}
        >
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <textarea name="message"></textarea>
          <input type="text" name="services" />
        </form>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-[var(--background-tertiary)] border border-[var(--border)] rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012 8.5v-.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-[var(--primary)] font-bold">Phone</div>
                  <a
                    href={`tel:${phone.replace(/-/g, '')}`}
                    className="text-[var(--foreground)] text-xl hover:text-[var(--primary)] transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <rect width="16" height="12" x="2" y="4" rx="2" />
                    <path d="M2 6l8 5 8-5" />
                  </svg>
                </div>
                <div>
                  <div className="text-[var(--primary)] font-bold">Email</div>
                  <a
                    href={`mailto:${email}`}
                    className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-[var(--primary)] font-bold">Service Area</div>
                  <div className="text-[var(--text-muted)]">
                    Montreal and surrounding areas including Saint-Lazare, Laval, North/South Shore,
                    Vaudreuil-Dorion
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border)]">
              <div className="text-[var(--primary)] font-bold mb-4">FREE QUOTES AVAILABLE</div>
              <div className="flex gap-4 mb-4">
                <a
                  href={`tel:${phone.replace(/-/g, '')}`}
                  className="flex-1 text-center bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-black px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  CALL NOW
                </a>
                <a
                  href={`mailto:${email}`}
                  className="flex-1 text-center bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-black px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  EMAIL US
                </a>
              </div>
              <a
                href={siteConfig.contact.vcard.filePath}
                download="EDMTL-Contact.vcf"
                className="flex items-center justify-center gap-2 text-center p-3 border border-[var(--primary)] rounded-lg text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-all duration-300 w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Add to Contacts
              </a>
            </div>
          </div>

          <div className="bg-[var(--background-tertiary)] border border-[var(--border)] rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Request a Quote</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[var(--foreground)] font-bold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded-lg border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
                  placeholder="Your full name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-[var(--foreground)] font-bold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded-lg border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-[var(--foreground)] font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded-lg border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
                  placeholder="(optional)"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-[var(--foreground)] font-bold mb-3">Services Interested In</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {services.map((service) => (
                    <label
                      key={service.slug}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.slug)}
                        onChange={() => handleServiceToggle(service.slug)}
                        className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)] bg-[var(--background-secondary)]"
                        disabled={isSubmitting}
                      />
                      <span className="text-[var(--foreground-secondary)] text-sm group-hover:text-[var(--foreground)] transition-colors">
                        {service.title}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[var(--foreground)] font-bold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 bg-[var(--background-secondary)] text-[var(--foreground)] rounded-lg border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
                  placeholder="Please describe your project..."
                  disabled={isSubmitting}
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-3 bg-green-900/50 border border-green-600 text-green-400 rounded-lg">
                  Thank you! Your message has been sent successfully. Redirecting...
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3 bg-red-900/50 border border-red-600 text-red-400 rounded-lg">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-black px-6 py-3 rounded-xl font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'SEND REQUEST'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Image
            src="/images/edm-box-logo.png"
            alt="EDMTL"
            width={80}
            height={80}
            className="opacity-30"
          />
        </div>
      </div>
    </section>
  );
}
