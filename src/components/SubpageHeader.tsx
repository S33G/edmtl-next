import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '../../config/site.json';

export default function SubpageHeader() {
  const phone = siteConfig.contact.phone;
  const email = siteConfig.contact.email;

  return (
    <>
      {/* Desktop sticky header — matches homepage pattern */}
      <header className="hidden md:block sticky top-0 z-50 w-full border-b border-[var(--border)]/20 bg-[var(--background-secondary)]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-1">
          <div className="flex items-center justify-between">
            {/* Logo — large, fills header height */}
            <div className="flex items-center flex-shrink-0">
              <Link
                href="/"
                className="transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)] rounded-lg"
              >
                <Image
                  src="/images/edm-main-logo.png"
                  alt="EDMTL"
                  width={200}
                  height={200}
                  className="h-20 w-auto md:h-28 object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Contact info — centered */}
            <div className="flex items-center gap-3 text-sm font-semibold tracking-wide">
              <a
                href={`tel:${phone}`}
                className="text-[var(--primary)] hover:text-[var(--foreground)] transition-colors"
              >
                {phone}
              </a>
              <span className="text-[var(--text-muted)]">-</span>
              <a
                href={`mailto:${email}`}
                className="text-[var(--primary)] hover:text-[var(--foreground)] transition-colors uppercase"
              >
                {email}
              </a>
            </div>

            {/* Right side nav */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors text-sm flex items-center gap-1.5 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5" />
                  <path d="m12 19-7-7 7-7" />
                </svg>
                Home
              </Link>
              <Link
                href="/contact"
                className="bg-[var(--primary)] text-black font-semibold px-5 py-2 rounded-lg hover:bg-[var(--primary-dark)] transition-colors text-sm"
              >
                Free Quote
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile contact bar — matches homepage pattern */}
      <div className="md:hidden bg-[var(--background-secondary)] border-b border-[var(--border)]/20 py-2 px-4 flex items-center justify-center gap-3 text-xs font-semibold tracking-wide">
        <a
          href={`tel:${phone}`}
          className="text-[var(--primary)] hover:text-[var(--foreground)] transition-colors"
        >
          {phone}
        </a>
        <span className="text-[var(--text-muted)]">-</span>
        <a
          href={`mailto:${email}`}
          className="text-[var(--primary)] hover:text-[var(--foreground)] transition-colors uppercase"
        >
          {email}
        </a>
      </div>

      {/* Mobile sticky nav bar */}
      <div className="md:hidden sticky top-0 z-50 bg-[var(--background-secondary)] border-b border-[var(--border)]/20 px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/edm-main-logo.png"
              alt="EDMTL"
              width={120}
              height={120}
              className="h-10 sm:h-12 w-auto object-contain"
              priority
            />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors text-xs font-medium flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
              Home
            </Link>
            <Link
              href="/contact"
              className="bg-[var(--primary)] text-black font-semibold px-4 py-1.5 rounded-lg hover:bg-[var(--primary-dark)] transition-colors text-xs"
            >
              Free Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
