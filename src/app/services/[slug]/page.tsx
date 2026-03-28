import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import servicesData from '../../../../config/services.json';
import siteConfig from '../../../../config/site.json';
import Footer from '../../../components/Footer';
import SubpageHeader from '../../../components/SubpageHeader';

interface ServiceSection {
  heading: string;
  content: string;
  list?: {
    title: string;
    items: string[];
  };
}

interface Service {
  slug: string;
  title: string;
  pageTitle: string;
  subtitle: string;
  description: string;
  intro: string[];
  sections: ServiceSection[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getService(slug: string): Service | undefined {
  return (servicesData.services as Service[]).find((s) => s.slug === slug);
}

// Hero image for each service page
const serviceHeroImages: Record<string, string> = {
  'window-cleaning': '/images/services/window-cleaning-header.png',
  'gutter-cleaning': '/images/services/gutter-services-header.png',
  'pressure-washing': '/images/services/pressure-washing.png',
  'deck-staining': '/images/services/deck-refinishing-header.png',
  'commercial-window-cleaning': '/images/services/commercial-window-cleaning.png',
  'dryer-vent-cleaning': '/images/icons/dryer-vent.svg',
  'downspout-repair': '/images/icons/downspout.svg',
  'exterior-maintenance': '/images/services/moss-removal.png',
};

// Additional images mapped to section headings per service
const serviceSectionImages: Record<string, Record<string, string>> = {
  'window-cleaning': {
    'Interior & Exterior Window Cleaning': '/images/services/exterior-window-cleaning.png',
    'Residential Window Cleaning': '/images/services/interior-window-cleaning.png',
  },
  'gutter-cleaning': {
    'Gutter Guards': '/images/services/gutter-guard-installation.png',
    'Downspout Repair': '/images/services/maintenance-&-repairs-(gutter).png',
    'Caulking': '/images/services/gutter-cleaning.png',
  },
  'pressure-washing': {
    'Surfaces We Clean': '/images/services/hard-surface-washing.png',
    'Using the Right Pressure': '/images/services/soft-surface-cleaning.png',
    'Before and After Difference': '/images/services/surface-cleaning-and-preparation.png',
  },
  'deck-staining': {
    'Staining': '/images/services/staining-&-sealing.png',
  },
  'exterior-maintenance': {
    'Moss Removal & Soft Washing': '/images/services/moss-removal.png',
    'Polymeric Sand Replacement': '/images/services/wash-&-brighten.png',
  },
};

export async function generateStaticParams() {
  return (servicesData.services as Service[]).map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  const heroImage = serviceHeroImages[slug];
  const ogImages = heroImage && !heroImage.endsWith('.svg')
    ? [{ url: heroImage, width: 900, height: 500, alt: service.pageTitle }]
    : undefined;

  return {
    title: service.pageTitle,
    description: service.description,
    keywords: `${service.title}, Montreal, EDMTL, home maintenance, ${service.slug.replace(/-/g, ' ')}`,
    openGraph: {
      title: `${service.pageTitle} | EDMTL`,
      description: service.description,
      url: `https://edmtl.com/services/${service.slug}`,
      type: 'website',
      images: ogImages,
    },
    alternates: {
      canonical: `https://edmtl.com/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return notFound();
  }

  const phone = siteConfig.contact.phone;
  const heroImage = serviceHeroImages[slug];
  const sectionImages = serviceSectionImages[slug] || {};

  return (
    <div className="min-h-screen hex-pattern bg-[var(--background)]">
      <SubpageHeader />

      {/* Service Hero / Header Area */}
      <section className="pt-12 sm:pt-16 pb-10 sm:pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] uppercase tracking-tight">
            {service.pageTitle}
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-[var(--primary)] font-medium leading-relaxed">
            {service.subtitle}
          </p>

          {heroImage && (
            heroImage.endsWith('.svg') ? (
              <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background-tertiary)] flex items-center justify-center py-12 sm:py-16">
                <Image
                  src={heroImage}
                  alt={service.pageTitle}
                  width={120}
                  height={120}
                  className="w-24 h-24 sm:w-32 sm:h-32 text-[var(--primary)]"
                  priority
                />
              </div>
            ) : (
              <div className="mt-8 rounded-2xl overflow-hidden border border-[var(--border)]">
                <Image
                  src={heroImage}
                  alt={service.pageTitle}
                  width={900}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            )
          )}

          <div className="mt-8 space-y-4">
            {service.intro.map((paragraph, i) => (
              <p
                key={i}
                className="text-[var(--foreground-secondary)] leading-relaxed text-base sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`tel:${phone.replace(/-/g, '')}`}
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call Now
            </a>
            <Link
              href={`/contact?service=${slug}`}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          {service.sections.map((section, i) => {
            const sectionImage = sectionImages[section.heading];
            return (
            <div
              key={i}
              className="bg-[var(--background-tertiary)] border border-[var(--border)] rounded-2xl p-6 sm:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--primary)] uppercase tracking-wide mb-4">
                {section.heading}
              </h2>

              {sectionImage && (
                <div className="mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={sectionImage}
                    alt={section.heading}
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <div className="text-[var(--foreground-secondary)] leading-relaxed text-base sm:text-lg whitespace-pre-line">
                {section.content}
              </div>

              {section.list && (
                <div className="mt-6">
                  <h3 className="text-[var(--foreground)] font-semibold text-base sm:text-lg mb-3">
                    {section.list.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.list.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--primary)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="flex-shrink-0 mt-1"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-[var(--foreground-secondary)] text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 sm:py-20 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
            Ready to get started?
          </h2>
          <p className="mt-3 text-[var(--text-muted)] text-lg">
            Contact us for a free quote
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${phone.replace(/-/g, '')}`}
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call Now
            </a>
            <Link
              href={`/contact?service=${slug}`}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
