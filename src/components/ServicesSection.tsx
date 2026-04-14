'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from '../hooks/useInView';
import { useLocalizedServices } from '../hooks/useLocalizedServices';

const serviceIconSvgMap: Record<string, string> = {
  'window-cleaning': '/images/icons/residential-window-cleaning.svg',
  'pressure-washing': '/images/icons/pressure-washing.svg',
  'gutter-cleaning': '/images/icons/gutter-cleaning.svg',
  'downspout-repair': '/images/icons/downspout.svg',
  'deck-staining': '/images/icons/deck-stain.svg',
  'commercial-window-cleaning': '/images/icons/commercial-window-cleaning.svg',
  'dryer-vent-cleaning': '/images/icons/dryer-vent.svg',
  'polymeric-sand-replacement': '/images/icons/general-maintenance.svg',
};

interface ServicesSectionProps {
  tServicesTitle: string;
  tServicesSubtitle: string;
  tServicesLearnMore: string;
}

export default React.memo(function ServicesSection({
  tServicesTitle,
  tServicesSubtitle,
  tServicesLearnMore,
}: ServicesSectionProps) {
  const servicesRef = useInView();
  const services = useLocalizedServices();

  return (
    <section id="services" className="py-5 lg:py-16" ref={servicesRef.ref}>
      <div
        className={`text-center mb-16 transition-all duration-700 ${
          servicesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-4xl font-semibold text-[var(--foreground)] mb-4 tracking-tight">
          {tServicesTitle}
        </h2>
        <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
          {tServicesSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {services.map((service, index) => {
          const iconSrc = serviceIconSvgMap[service.slug];
          return (
            <div
              key={service.slug}
              className={`transition-all duration-700 ${
                servicesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: servicesRef.isInView ? `${index * 75}ms` : '0ms' }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="block bg-[var(--background-tertiary)] border border-[var(--border)] rounded-xl overflow-hidden group hover:shadow-lg hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div className="flex flex-col items-center text-center p-4 sm:p-5 gap-3">
                  {iconSrc && (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                      <Image
                        src={iconSrc}
                        alt=""
                        width={48}
                        height={48}
                        className="w-full h-full object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  )}
                  <h3 className="text-xs sm:text-sm font-bold uppercase text-[var(--primary)] leading-tight">
                    {service.title}
                  </h3>
                </div>
                <div className="hidden sm:block px-4 pb-4">
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                  <span className="mt-3 inline-block text-[var(--primary)] text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
                    {tServicesLearnMore}
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
});
