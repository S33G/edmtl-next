'use client';

import React, { useState, useEffect } from 'react';
import { HiHome, HiWrenchScrewdriver, HiPhone, HiLanguage } from 'react-icons/hi2';
import ReactCountryFlag from 'react-country-flag';
import siteConfig from '../../config/site.json';
import { useTranslation } from '../hooks/useTranslation';

interface PagePickerProps {
  currentLocale: string;
  onLocaleChange: (locale: string) => void;
  isInHeader?: boolean;
}

const PagePicker: React.FC<PagePickerProps> = ({ currentLocale, onLocaleChange, isInHeader = false }) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [showLanguagePopup, setShowLanguagePopup] = useState<boolean>(false);
  const { t } = useTranslation(currentLocale);

  const sections = [
    {
      id: 'hero',
      label: t('navigation.home'),
      icon: HiHome,
    },
    {
      id: 'services',
      label: t('navigation.services'),
      icon: HiWrenchScrewdriver,
    },
    // {
    //   id: 'reviews',
    //   label: t('navigation.gallery'),
    //   icon: HiChatBubbleBottomCenterText,
    // },
    {
      id: 'contact',
      label: t('navigation.contact'),
      icon: HiPhone,
    },
    {
      id: 'language',
      label: t('navigation.language'),
      icon: HiLanguage,
    },
  ];

  const getCountryCode = (locale: string) => {
    switch (locale) {
      case 'en':
        return 'US';
      case 'fr':
        return 'CA';
      default:
        return 'US';
    }
  };

  const handleLanguageChange = (locale: string) => {
    onLocaleChange(locale);
    setShowLanguagePopup(false);
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'language') {
      setShowLanguagePopup(!showLanguagePopup);
      return;
    }

    const element = document.getElementById(sectionId === 'hero' ? 'hero-section' : sectionId);
    if (element) {
      const headerHeight = 80; // Account for sticky header height
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    } else if (sectionId === 'hero') {
      // If hero-section doesn't exist, scroll to top with header offset
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveSection(sectionId);
  };

  // Track which section is currently in view
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px',
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId === 'hero-section' || entry.target.closest('#hero-section')) {
            setActiveSection('hero');
          } else if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sectionsToObserve = ['hero-section', 'services', 'reviews', 'contact'];
    sectionsToObserve.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Check if we're at the top of the page
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`z-40 ${isInHeader ? 'relative' : 'fixed inset-x-0 bottom-0 md:right-6 md:top-1/2 md:-translate-y-1/2 md:inset-x-auto md:bottom-auto'}`}>
      <div className={`${isInHeader
        ? 'glass bg-[var(--background-secondary)]/95 dark:bg-[var(--background-secondary)]/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-[var(--border)]/50 dark:border-[var(--border)]/50 flex space-x-2'
        : 'md:glass md:bg-[var(--background-secondary)]/95 md:dark:bg-[var(--background-secondary)]/95 md:backdrop-blur-sm md:rounded-2xl md:p-4 md:shadow-lg md:border md:border-[var(--border)]/50 md:dark:border-[var(--border)]/50 md:flex md:flex-col md:space-y-4 bg-[var(--background-secondary)] dark:bg-[var(--background-secondary)] border-t border-[var(--border)] dark:border-[var(--border)] safe-area-inset-bottom'
      }`}>
        <div className={`${isInHeader ? 'contents' : 'flex justify-around items-center px-4 py-3 md:flex-col md:space-y-4 md:px-0 md:py-0'}`}>
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id || (section.id === 'language' && showLanguagePopup);

          return (
            <div key={section.id} className="relative">
              <button
                onClick={() => scrollToSection(section.id)}
                className={`
                  group relative flex items-center justify-center rounded-xl transition-all duration-300 ${isInHeader ? 'w-12 h-12' : 'w-14 h-14 md:w-12 md:h-12 flex-col'}
                  ${isActive
                    ? 'bg-[var(--primary)] text-[var(--foreground)] shadow-lg scale-105'
                    : 'hover:bg-[var(--background-secondary)] dark:hover:bg-[var(--background-secondary)] text-[var(--text-muted)] dark:text-[var(--text-muted)] hover:scale-105'
                  }
                `}
                title={section.label}
              >
                <Icon className={`${isInHeader ? 'w-5 h-5' : 'w-5 h-5 md:w-5 md:h-5'}`} />

                {/* Mobile title - only show when not in header */}
                {!isInHeader && (
                  <span className={`text-xs mt-1 font-medium leading-tight md:hidden ${isActive ? 'text-[var(--foreground)]' : 'text-[var(--text-muted)] dark:text-[var(--text-muted)]'}`}>
                    {section.id === 'hero' ? (currentLocale === 'fr' ? 'Accueil' : 'Home') :
                     section.id === 'services' ? (currentLocale === 'fr' ? 'Services' : 'Services') :
                     section.id === 'reviews' ? (currentLocale === 'fr' ? 'Avis' : 'Reviews') :
                     section.id === 'contact' ? (currentLocale === 'fr' ? 'Contact' : 'Contact') :
                     section.id === 'language' ? (currentLocale === 'fr' ? 'Langue' : 'Language') : section.label}
                  </span>
                )}

                {/* Desktop Tooltip - only show on desktop */}
                <div className={`absolute ${isInHeader ? 'top-full left-1/2 -translate-x-1/2 mt-2' : 'right-16 top-1/2 -translate-y-1/2 hidden md:block'} opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50`}>
                  <div className="bg-[var(--background-secondary)] dark:bg-[var(--background-secondary)] text-[var(--foreground)] px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg border border-[var(--border)]/50">
                    {section.label}
                    <div className={`absolute ${isInHeader
                      ? 'bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-b-4 border-b-[var(--background-secondary)] dark:border-b-[var(--background-secondary)] border-l-4 border-l-transparent border-r-4 border-r-transparent'
                      : 'top-1/2 -translate-y-1/2 left-full w-0 h-0 border-l-4 border-l-[var(--background-secondary)] dark:border-l-[var(--background-secondary)] border-t-4 border-t-transparent border-b-4 border-b-transparent'
                    }`}></div>
                  </div>
                </div>
              </button>

              {/* Language Popup */}
              {section.id === 'language' && showLanguagePopup && (
                <div className={`absolute z-50 ${isInHeader ? 'top-full left-1/2 -translate-x-1/2 mt-2' : 'bottom-full left-1/2 -translate-x-1/2 mb-2 md:right-16 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:left-auto md:mb-0'}`}>
                  <div className="bg-[var(--background-secondary)] dark:bg-[var(--background-secondary)] rounded-xl p-3 shadow-xl border border-[var(--border)] dark:border-[var(--border)] min-w-[140px]">
                    <div className="space-y-1">
                      {siteConfig.supportedLocales.map((locale) => (
                        <button
                          key={locale}
                          onClick={() => handleLanguageChange(locale)}
                          className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            currentLocale === locale
                              ? 'bg-[var(--primary)] text-[var(--foreground)] shadow-sm'
                              : 'text-[var(--text-muted)] dark:text-[var(--text-muted)] hover:bg-[var(--primary)] hover:text-[var(--foreground)] hover:shadow-sm'
                          }`}
                          title={locale === 'en' ? 'English' : 'Français'}
                        >
                          <ReactCountryFlag
                            countryCode={getCountryCode(locale)}
                            svg
                            style={{
                              width: '1.2em',
                              height: '1.2em',
                            }}
                          />
                          <span className="whitespace-nowrap font-medium">{locale === 'en' ? 'English' : 'Français'}</span>
                        </button>
                      ))}
                    </div>
                    {/* Arrow pointing to the button */}
                    <div className={`absolute ${isInHeader
                      ? 'bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-b-8 border-b-[var(--background-secondary)] dark:border-b-[var(--background-secondary)] border-l-8 border-l-transparent border-r-8 border-r-transparent'
                      : 'top-full left-1/2 -translate-x-1/2 w-0 h-0 border-t-8 border-t-[var(--background-secondary)] dark:border-t-[var(--background-secondary)] border-l-8 border-l-transparent border-r-8 border-r-transparent md:top-1/2 md:-translate-y-1/2 md:left-full md:border-t-transparent md:border-b-transparent md:border-l-8 md:border-l-[var(--background-secondary)] md:dark:border-l-[var(--background-secondary)]'
                    }`}></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>

      {/* Backdrop to close language popup */}
      {showLanguagePopup && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowLanguagePopup(false)}
        />
      )}
    </div>
  );
};

export default PagePicker;
