'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PagePicker from './PagePicker';
import ContactFormSection from './ContactFormSection';
import Footer from './Footer';
import {
  HiStar,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2';
import siteConfig from '../../config/site.json';
import servicesData from '../../config/services.json';
import reviewsData from '../../config/reviews.json';
import { useInView } from '../hooks/useInView';
import { useTranslation } from '../hooks/useTranslation';

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

export default function LocalizedContent() {
  const [currentLocale, setCurrentLocale] = useState('en');
  const [reviewIndex, setReviewIndex] = useState(0);
  const { changeLocale } = useTranslation(currentLocale);

  const servicesRef = useInView();
  const trustRef = useInView();


  // Touch/swipe state for carousel
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

   const reviews = reviewsData;
   const reviewsPerPage = 3;
   const totalPages = Math.ceil(reviews.length / reviewsPerPage);
   const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

   const nextReviews = useCallback(() => {
     setSwipeDirection('left');
     setReviewIndex((prev) => (prev + 1) % totalPages);
     setTimeout(() => setSwipeDirection(null), 500);
   }, [totalPages]);

   const prevReviews = useCallback(() => {
     setSwipeDirection('right');
     setReviewIndex((prev) => (prev - 1 + totalPages) % totalPages);
     setTimeout(() => setSwipeDirection(null), 500);
   }, [totalPages]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextReviews();
      } else {
        prevReviews();
      }
    }
  };

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(nextReviews, 6000);
    return () => clearInterval(interval);
  }, [nextReviews]);

  const visibleReviews = reviews.slice(
    reviewIndex * reviewsPerPage,
    reviewIndex * reviewsPerPage + reviewsPerPage
  );
  // Pad with items from the start if we don't have enough
  const paddedReviews =
    visibleReviews.length < reviewsPerPage
      ? [...visibleReviews, ...reviews.slice(0, reviewsPerPage - visibleReviews.length)]
      : visibleReviews;

  const goToContact = () => {
    window.location.href = '/contact';
  };

  const heroData = siteConfig.hero[currentLocale as keyof typeof siteConfig.hero] || siteConfig.hero.en;
  const faqData = siteConfig.faq[currentLocale as keyof typeof siteConfig.faq] || siteConfig.faq.en;

  const handleLocaleChange = (locale: string) => {
    setCurrentLocale(locale);
    changeLocale(locale);
  };

  return (
    <div className="min-h-screen hex-pattern bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* ─── HEADER (desktop sticky) ─── */}
      <header className="hidden md:block sticky top-0 z-50 w-full border-b border-[var(--border)]/20 bg-[var(--background-secondary)]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-shrink-0">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)] rounded-lg"
                aria-label="Scroll to top"
              >
                <Image
                  src="/images/edm-main-logo.png"
                  alt="EDMTL"
                  width={120}
                  height={120}
                  className="h-20 w-auto md:h-28 object-contain"
                  priority
                />
              </button>
            </div>

            <div className="flex items-center gap-3 text-sm font-semibold tracking-wide">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="text-[var(--primary)] hover:text-[var(--foreground)] transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
              <span className="text-[var(--text-muted)]">-</span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-[var(--primary)] hover:text-[var(--foreground)] transition-colors uppercase"
              >
                {siteConfig.contact.email}
              </a>
            </div>

            <div className="flex-shrink-0">
              <PagePicker
                currentLocale={currentLocale}
                onLocaleChange={handleLocaleChange}
                isInHeader={true}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="md:hidden bg-[var(--background-secondary)] border-b border-[var(--border)]/20 py-2 px-4 flex items-center justify-center gap-3 text-xs font-semibold tracking-wide">
        <a
          href={`tel:${siteConfig.contact.phone}`}
          className="text-[var(--primary)] hover:text-[var(--foreground)] transition-colors"
        >
          {siteConfig.contact.phone}
        </a>
        <span className="text-[var(--text-muted)]">-</span>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="text-[var(--primary)] hover:text-[var(--foreground)] transition-colors uppercase"
        >
          {siteConfig.contact.email}
        </a>
      </div>

      {/* Mobile Navigation - Outside header for proper fixed positioning */}
      <div className="md:hidden">
        <PagePicker
          currentLocale={currentLocale}
          onLocaleChange={handleLocaleChange}
          isInHeader={false}
        />
      </div>

      <main>
        {/* ─── HERO SECTION ─── */}
        <section
          id="hero-section"
          className="hero-section text-center pt-20 pb-24 md:pt-28 md:pb-32 relative w-full"
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(/images/frontpagesplash.png)',
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
                src="/images/edm-box-logo.png"
                alt="EDMTL - Entretien Domestique Montreal"
                width={200}
                height={200}
                className="mx-auto w-48 h-48 md:w-56 md:h-56 object-contain logo-breathe"
              />
            </div>
            <h1
              className="text-5xl md:text-7xl font-bold text-[var(--primary)] mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-top-6 duration-700"
              style={{ animationDelay: '200ms' }}
            >
              {heroData.title}
            </h1>

            <div
              className="text-lg md:text-xl text-[var(--text-muted)] mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-top-8 duration-700 space-y-2"
              style={{ animationDelay: '400ms' }}
            >
              <p className="font-bold">
                {currentLocale === 'fr'
                  ? 'Nettoyage de Vitres / Nettoyage de Gouttières / Lavage à Pression / Teinture de Terrasse'
                  : 'Window Cleaning / Gutter Cleaning / Pressure Washing / Deck Staining'}
              </p>
              <p className="font-bold">
                {currentLocale === 'fr'
                  ? 'Montréal / West Island / Laval / Rive-Sud'
                  : 'Montreal / West Island / Laval / South Shore'}
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: '600ms' }}
            >
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="btn-primary inline-flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                {currentLocale === 'fr' ? 'Appelez maintenant' : 'Call Now'}
              </a>
              <button
                onClick={goToContact}
                className="btn-secondary inline-flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                {currentLocale === 'fr' ? 'Devis gratuit' : 'Free Quote'}
              </button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* ─── SERVICES SECTION (8 cards) ─── */}
          <section id="services" className="py-5 lg:py-16" ref={servicesRef.ref}>
            <div
              className={`text-center mb-16 transition-all duration-700 ${
                servicesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-4xl font-semibold text-[var(--foreground)] mb-4 tracking-tight">
                {currentLocale === 'fr' ? 'Nos Services' : 'Our Services'}
              </h2>
              <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
                {currentLocale === 'fr'
                  ? 'Avec attention aux détails, nos services gardent votre maison propre, protégée et bien entretenue'
                  : 'With attention to detail, our services keep your home looking clean, protected and well-maintained'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {servicesData.services.map((service, index) => {
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
                          {currentLocale === 'fr' ? 'En savoir plus →' : 'Learn more →'}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ─── TRUST SECTION (Reviews + Buzzwords) ─── */}
          <section id="trust" className="py-5 lg:py-16" ref={trustRef.ref}>
            <div
              className={`transition-all duration-700 ${
                trustRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-semibold text-[var(--foreground)] mb-3 tracking-tight">
                  {currentLocale === 'fr' ? 'Avis Google' : 'Google Reviews'}
                </h2>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-[var(--primary)]">5.0</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <HiStar key={i} className="w-6 h-6 text-[var(--primary)]" />
                    ))}
                  </div>
                </div>
                <a
                  href={siteConfig.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors underline"
                >
                  ({currentLocale === 'fr' ? 'Voir sur Google' : 'View on Google'})
                </a>
              </div>

              <div className="relative">
                <button
                  onClick={prevReviews}
                  className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[var(--background-secondary)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
                  aria-label="Previous reviews"
                >
                  <HiChevronLeft className="w-5 h-5" />
                </button>

                <div
                  className={`grid grid-cols-1 md:grid-cols-3 md:auto-rows-fr gap-4 md:gap-6 px-8 md:px-12 min-h-[300px] md:min-h-0 ${
                    swipeDirection === 'left' ? 'animate-swipe-left' : swipeDirection === 'right' ? 'animate-swipe-right' : ''
                  }`}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {paddedReviews.map((review, i) => (
                    <div
                      key={`${review.author}-${i}`}
                      className="bg-[var(--background-tertiary)] border border-[var(--border)] rounded-xl p-6 flex flex-col items-center text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-[var(--text-muted)]/30 flex items-center justify-center mb-3">
                        <span className="text-lg font-bold text-[var(--foreground)]">
                          {review.author.charAt(0)}
                        </span>
                      </div>
                      <h4 className="text-[var(--primary)] font-semibold mb-2">{review.author}</h4>
                      <div className="flex mb-3">
                        {[...Array(review.rating)].map((_, j) => (
                          <HiStar key={j} className="w-4 h-4 text-[var(--primary)]" />
                        ))}
                      </div>
                      <p className="text-sm text-[var(--foreground)]/80 leading-relaxed">
                        &ldquo;{review.text}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={nextReviews}
                  className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[var(--background-secondary)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
                  aria-label="Next reviews"
                >
                  <HiChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      i === reviewIndex ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'
                    }`}
                    aria-label={`Go to reviews page ${i + 1}`}
                  />
                ))}
              </div>

              {/* <div className="mt-16 flex flex-col items-center gap-3">
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4 tracking-tight">
                  {currentLocale === 'fr' ? 'POURQUOI EDMTL?' : 'WHY EDMTL?'}
                </h3>
                {['INSURED', 'EXPERIENCED', 'SAFE & RELIABLE'].map((buzzword) => {
                  const frMap: Record<string, string> = {
                    INSURED: 'ASSURÉ',
                    EXPERIENCED: 'EXPÉRIMENTÉ',
                    'SAFE & RELIABLE': 'SÉCURITAIRE ET FIABLE',
                  };
                  return (
                    <div
                      key={buzzword}
                      className="bg-[var(--primary)] text-black font-bold text-lg md:text-xl px-8 py-3 rounded-lg w-full max-w-sm text-center tracking-wide"
                    >
                      {currentLocale === 'fr' ? frMap[buzzword] : buzzword}
                    </div>
                  );
                })}
              </div> */}
            </div>
          </section>

          {/* ─── FAQ SECTION (unchanged) ─── */}
          <section id="faq" className="py-5">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-semibold text-[var(--foreground)] mb-4 tracking-tight">
                  {faqData.title}
                </h2>
              </div>

              <div className="space-y-3">
                {faqData.items.map((item, index) => (
                  <div key={index} className="card relative overflow-hidden group !min-h-0 !p-4 sm:!p-5">
                    <div className="absolute top-0 right-0 opacity-5 group-hover:opacity-20 pointer-events-none transition-all duration-300">
                      <svg
                        width="80"
                        height="80"
                        viewBox="0 0 120 120"
                        className="text-[var(--primary)] group-hover:text-[var(--primary)] transition-colors duration-300"
                        fill="currentColor"
                      >
                        <path d="M60 0C26.863 0 0 26.863 0 60s26.863 60 60 60 60-26.863 60-60S93.137 0 60 0zm0 110c-27.614 0-50-22.386-50-50S32.386 10 60 10s50 22.386 50 50-22.386 50-50 50z" />
                        <path d="M60 25c-10.493 0-19 8.507-19 19 0 2.761 2.239 5 5 5s5-2.239 5-5c0-4.963 4.037-9 9-9s9 4.037 9 9c0 4.418-3.582 8-8 8-2.761 0-5 2.239-5 5v8c0 2.761 2.239 5 5 5s5-2.239 5-5v-4.576C72.46 59.696 77 54.301 77 48c0-9.374-7.626-17-17-17z" />
                        <circle cx="60" cy="82" r="6" />
                      </svg>
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold text-[var(--foreground)] dark:text-[var(--foreground)] mb-2">
                        {item.question}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] dark:text-[var(--text-muted)] leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── WHY CHOOSE US / PROCESS STEPS (just above contact) ─── */}
          {/* <section className="py-10 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: '1',
                  titleEn: 'REQUEST A FREE QUOTE',
                  titleFr: 'DEMANDEZ UN DEVIS GRATUIT',
                  descEn: 'Submit our form, or contact us by phone or email',
                  descFr: 'Soumettez notre formulaire, ou contactez-nous par téléphone ou courriel',
                },
                {
                  step: '2',
                  titleEn: 'CLEAR COMMUNICATION',
                  titleFr: 'COMMUNICATION CLAIRE',
                  descEn: 'We confirm details, pricing, and timing up front',
                  descFr: 'Nous confirmons les détails, les prix et le calendrier à l\'avance',
                },
                {
                  step: '3',
                  titleEn: 'PROFESSIONAL SERVICE',
                  titleFr: 'SERVICE PROFESSIONNEL',
                  descEn: 'We show up on time and complete the job efficiently',
                  descFr: 'Nous arrivons à l\'heure et complétons le travail efficacement',
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--primary)] text-black text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 tracking-wide">
                    {currentLocale === 'fr' ? item.titleFr : item.titleEn}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {currentLocale === 'fr' ? item.descFr : item.descEn}
                  </p>
                </div>
              ))}
            </div>
          </section> */}

        </div>
      </main>

      <ContactFormSection />

      <Footer />
    </div>
  );
}
