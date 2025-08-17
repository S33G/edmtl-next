'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { HiXMark, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  onNext,
  onPrev,
  hasNext,
  hasPrev
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null);
  const [currentContent, setCurrentContent] = useState<React.ReactNode>(children);
  const [nextContent, setNextContent] = useState<React.ReactNode>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      // Delay hiding to allow exit animation
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Update content when children change
  useEffect(() => {
    if (!isTransitioning) {
      setCurrentContent(children);
    }
  }, [children, isTransitioning]);

  const handleNext = useCallback(() => {
    if (onNext && !isTransitioning) {
      setIsTransitioning(true);
      setTransitionDirection('left');
      setNextContent(children); // Store current content as next

      // Trigger the external onNext to get new content
      setTimeout(() => {
        onNext();
        // After new content loads, complete the transition
        setTimeout(() => {
          setCurrentContent(children); // Update to new content
          setNextContent(null);
          setIsTransitioning(false);
          setTransitionDirection(null);
        }, 100);
      }, 50);
    }
  }, [onNext, isTransitioning, children]);

  const handlePrev = useCallback(() => {
    if (onPrev && !isTransitioning) {
      setIsTransitioning(true);
      setTransitionDirection('right');
      setNextContent(children); // Store current content as next

      // Trigger the external onPrev to get new content
      setTimeout(() => {
        onPrev();
        // After new content loads, complete the transition
        setTimeout(() => {
          setCurrentContent(children); // Update to new content
          setNextContent(null);
          setIsTransitioning(false);
          setTransitionDirection(null);
        }, 100);
      }, 50);
    }
  }, [onPrev, isTransitioning, children]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && hasNext) {
      handleNext();
    }
    if (isRightSwipe && hasPrev) {
      handlePrev();
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight' && hasNext) {
        handleNext();
      } else if (event.key === 'ArrowLeft' && hasPrev) {
        handlePrev();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev, touchStart, touchEnd, handleNext, handlePrev]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={modalRef}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isOpen
          ? 'bg-[var(--background-secondary)]/50 backdrop-blur-sm'
          : 'bg-[var(--background-secondary)]/0 backdrop-blur-0'
      }`}
      onClick={handleBackdropClick}
    >
      {/* Left Arrow - Hidden on mobile */}
      {hasPrev && (
        <button
          onClick={handlePrev}
          disabled={isTransitioning}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-60 hidden md:flex items-center justify-center w-12 h-12 bg-[var(--background-secondary)] dark:bg-[var(--background-secondary)] rounded-full shadow-lg transition-all duration-300 ease-out ${
            isOpen
              ? 'opacity-100 scale-100 translate-x-0'
              : 'opacity-0 scale-75 -translate-x-4'
          } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105 hover:bg-[var(--primary)] dark:hover:bg-[var(--primary)]'}`}
          aria-label="Previous service"
        >
          <HiChevronLeft className="w-6 h-6 text-[var(--text-muted)] dark:text-[var(--text-muted)] hover:text-[var(--foreground)]" />
        </button>
      )}

      {/* Right Arrow - Hidden on mobile */}
      {hasNext && (
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-60 hidden md:flex items-center justify-center w-12 h-12 bg-[var(--background-secondary)] dark:bg-[var(--background-secondary)] rounded-full shadow-lg transition-all duration-300 ease-out ${
            isOpen
              ? 'opacity-100 scale-100 translate-x-0'
              : 'opacity-0 scale-75 translate-x-4'
          } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105 hover:bg-[var(--primary)] dark:hover:bg-[var(--primary)]'}`}
          aria-label="Next service"
        >
          <HiChevronRight className="w-6 h-6 text-[var(--text-muted)] dark:text-[var(--text-muted)] hover:text-[var(--foreground)]" />
        </button>
      )}

      <div
        className={`relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? isTransitioning
              ? transitionDirection === 'right'
                ? 'opacity-100 scale-95 translate-x-12'
                : 'opacity-100 scale-95 -translate-x-12'
              : 'opacity-100 scale-100 translate-x-0'
            : 'opacity-0 scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full bg-[var(--primary)] hover:bg-[var(--primary)] dark:bg-[var(--primary)] dark:hover:bg-[var(--primary)] shadow-lg transition-all duration-300 ease-out ${
            isOpen
              ? 'opacity-100 scale-100 translate-x-0 translate-y-0'
              : 'opacity-0 scale-75 translate-x-2 -translate-y-2'
          } hover:scale-110 hover:rotate-90`}
          aria-label="Close modal"
        >
          <HiXMark className="w-5 h-5 text-black transition-transform duration-200" />
        </button>

        {/* Modal Content */}
        <div className="relative overflow-y-auto max-h-[90vh]">
          {/* Current Content */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              isTransitioning
                ? transitionDirection === 'left'
                  ? 'opacity-0 transform -translate-x-full'
                  : 'opacity-0 transform translate-x-full'
                : 'opacity-100 transform translate-x-0'
            }`}
          >
            {currentContent}
          </div>

          {/* Transitioning Content */}
          {isTransitioning && nextContent && (
            <div
              className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
                transitionDirection === 'left'
                  ? 'opacity-100 transform translate-x-0'
                  : 'opacity-100 transform translate-x-0'
              }`}
              style={{
                transform: transitionDirection === 'left'
                  ? 'translateX(100%)'
                  : 'translateX(-100%)'
              }}
            >
              {nextContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
