'use client';

import Image from 'next/image';
import { useLocalizedService } from '../hooks/useLocalizedServices';
import { useTranslation } from 'react-i18next';

const serviceSectionImages: Record<string, Record<string, string>> = {
  'window-cleaning': {
    'Interior & Exterior Window Cleaning': '/images/services/windowcleaningexternalframe1.png',
    'Residential Window Cleaning': '/images/services/windowcleaninginteriortrack1.png',
    'Nettoyage de vitres intérieures et extérieures': '/images/services/windowcleaningexternalframe1.png',
    'Nettoyage de vitres résidentiel': '/images/services/windowcleaninginteriortrack1.png',
  },
  'gutter-cleaning': {
    'Gutter Guards': '/images/services/gutterguards1.png',
    'Downspout Repair': '/images/services/downspoutrepair1.png',
    'Pare-feuilles': '/images/services/gutterguards1.png',
    'Réparation de descentes pluviales': '/images/services/downspoutrepair1.png',
  },
  'pressure-washing': {
    'Using the Right Pressure': '/images/services/pressurewashingsiding1.png',
    'Before and After Difference': '/images/services/pressurewashingcomposite1.png',
    'Utiliser la bonne pression': '/images/services/pressurewashingsiding1.png',
    'La différence avant et après': '/images/services/pressurewashingcomposite1.png',
  },
  'deck-staining': {
    'Staining': '/images/services/deckstaining1.png',
    'Teinture': '/images/services/deckstaining1.png',
  },
};

const serviceHeroImages: Record<string, string> = {
  'window-cleaning': '/images/services/window-cleaning-header.png',
  'gutter-cleaning': '/images/services/guttercleaningbeforeafter1.png',
  'pressure-washing': '/images/services/pressure-washing.png',
  'deck-staining': '/images/services/deck-refinishing-header.png',
  'commercial-window-cleaning': '/images/services/commercialwindowcleaning1.png',
  'dryer-vent-cleaning': '/images/services/dryerventcleaning1.png',
  'downspout-repair': '/images/services/downspoutrepair1.png',
  'polymeric-sand-replacement': '/images/services/polymericsand1.png',
};

interface ServicePageContentProps {
  slug: string;
  phone: string;
}

export default function ServicePageContent({ slug, phone }: ServicePageContentProps) {
  const service = useLocalizedService(slug);
  const { t } = useTranslation();

  if (!service) return null;

  const heroImage = serviceHeroImages[slug];
  const sectionImages = serviceSectionImages[slug] || {};

  return (
    <>
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

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href={`tel:${phone}`}
              className="btn-primary inline-flex items-center justify-center"
            >
              {t('servicePage.callNow')}
            </a>
            <a
              href={`/contact?service=${slug}`}
              className="btn-secondary inline-flex items-center justify-center"
            >
              {t('servicePage.freeQuote')}
            </a>
          </div>
        </div>
      </section>

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

      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-[var(--background-tertiary)] border border-[var(--border)] rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-4">
              {t('servicePage.readyToStart')}
            </h2>
            <p className="text-[var(--text-muted)] mb-8 text-lg">
              {t('servicePage.contactForQuote')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`tel:${phone}`}
                className="btn-primary inline-flex items-center justify-center"
              >
                {t('servicePage.callNow')}
              </a>
              <a
                href={`/contact?service=${slug}`}
                className="btn-secondary inline-flex items-center justify-center"
              >
                {t('servicePage.freeQuote')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
