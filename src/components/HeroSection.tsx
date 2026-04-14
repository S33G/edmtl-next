'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HeroSectionProps {
  heroTitle: string;
  phone: string;
  tHeroServicesList: string;
  tHeroLocations: string;
  tHeroCallNow: string;
  tHeroFreeQuote: string;
}

export default React.memo(function HeroSection({
  heroTitle,
  phone,
  tHeroServicesList,
  tHeroLocations,
  tHeroCallNow,
  tHeroFreeQuote,
}: HeroSectionProps) {
  const router = useRouter();

  const goToContact = () => {
    router.push('/contact');
  };

  return (
    <section
      id="hero-section"
      className="hero-section text-center pt-20 pb-24 md:pt-28 md:pb-32 relative w-full"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/frontpagesplash.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          filter: 'brightness(0.7) contrast(0.8)',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[var(--background)]/60 via-transparent to-[var(--background)]/80" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <Image
            src="/images/edm-box-logo.webp"
            alt="EDMTL - Entretien Domestique Montreal"
            width={200}
            height={200}
            className="mx-auto w-48 h-48 md:w-56 md:h-56 object-contain logo-breathe"
            priority
          />
        </div>
        <h1
          className="text-5xl md:text-7xl font-bold text-[var(--primary)] mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-top-6 duration-700"
          style={{ animationDelay: '200ms' }}
        >
          {heroTitle}
        </h1>

        <div
          className="text-lg md:text-xl text-[var(--text-muted)] mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-top-8 duration-700 space-y-2"
          style={{ animationDelay: '400ms' }}
        >
          <p className="font-bold">
            {tHeroServicesList}
          </p>
          <p className="font-bold">
            {tHeroLocations}
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700"
          style={{ animationDelay: '600ms' }}
        >
          <a
            href={`tel:${phone}`}
            className="btn-primary inline-flex items-center justify-center transition-all duration-200 hover:scale-105"
          >
            {tHeroCallNow}
          </a>
          <button
            onClick={goToContact}
            className="btn-secondary inline-flex items-center justify-center transition-all duration-200 hover:scale-105"
          >
            {tHeroFreeQuote}
          </button>
        </div>
      </div>
    </section>
  );
});
