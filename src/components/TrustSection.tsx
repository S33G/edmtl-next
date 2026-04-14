'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  HiStar,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2';
import { useInView } from '../hooks/useInView';
import reviewsData from '../../config/reviews.json';

interface TrustSectionProps {
  tReviewsTitle: string;
  tReviewsViewOnGoogle: string;
  googleMapsUrl: string;
}

export default React.memo(function TrustSection({
  tReviewsTitle,
  tReviewsViewOnGoogle,
  googleMapsUrl,
}: TrustSectionProps) {
  const trustRef = useInView();
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const reviews = reviewsData;
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const [reviewIndex, setReviewIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [carouselHeight, setCarouselHeight] = useState<number | null>(null);

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
    const interval = setInterval(nextReviews, 30000);
    return () => clearInterval(interval);
  }, [nextReviews]);

  // Measure carousel height once on mount and on resize to prevent layout jumps
  useEffect(() => {
    const measureCarousel = () => {
      if (carouselRef.current) {
        const height = carouselRef.current.scrollHeight;
        setCarouselHeight(height);
      }
    };

    measureCarousel();
    window.addEventListener('resize', measureCarousel);
    return () => window.removeEventListener('resize', measureCarousel);
  }, []);

  const visibleReviews = reviews.slice(
    reviewIndex * reviewsPerPage,
    reviewIndex * reviewsPerPage + reviewsPerPage
  );
  // Pad with items from the start if we don't have enough
  const paddedReviews =
    visibleReviews.length < reviewsPerPage
      ? [...visibleReviews, ...reviews.slice(0, reviewsPerPage - visibleReviews.length)]
      : visibleReviews;

  return (
    <section id="trust" className="py-5 lg:py-16" ref={trustRef.ref}>
      <div
        className={`transition-all duration-700 ${
          trustRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-[var(--foreground)] mb-3 tracking-tight">
            {tReviewsTitle}
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
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors underline"
          >
            ({tReviewsViewOnGoogle})
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
            ref={carouselRef}
            className={`grid grid-cols-1 md:grid-cols-3 md:auto-rows-fr gap-4 md:gap-6 px-8 md:px-12 transition-all duration-0 ${
              swipeDirection === 'left' ? 'animate-swipe-left' : swipeDirection === 'right' ? 'animate-swipe-right' : ''
            }`}
            style={{ minHeight: carouselHeight ? `${carouselHeight}px` : 'auto' }}
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
  );
});
