import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <section className="max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--background-tertiary)] p-8 text-center shadow-lg sm:p-12">
        <h1 className="text-3xl font-bold text-[var(--primary)]">Thank You!</h1>
        <p className="mt-5 text-[var(--foreground-secondary)] leading-relaxed">
          Your message has been sent successfully. We&apos;ll get back to you within 24 hours.
        </p>
        <p className="mt-4 text-[var(--foreground-secondary)]">
          For urgent requests, call us at{' '}
          <a
            href="tel:4385003099"
            data-track-placement="thank_you"
            className="font-semibold text-[var(--primary)] hover:underline"
          >
            (438) 500-3099
          </a>
          .
        </p>
        <Link
          href="/"
          className="btn-primary mt-8 inline-block"
        >
          Return to Home
        </Link>
      </section>
    </main>
  );
}
