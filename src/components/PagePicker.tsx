'use client';

import React, { useState, useEffect } from 'react';
import { HiHome, HiWrenchScrewdriver, HiChatBubbleBottomCenterText, HiPhone, HiLanguage } from 'react-icons/hi2';
import ReactCountryFlag from 'react-country-flag';
import siteConfig from '../../config/site.json';

interface PagePickerProps {
  currentLocale: string;
  onLocaleChange: (locale: string) => void;
  isInHeader?: boolean;
}

const PagePicker: React.FC<PagePickerProps> = ({ currentLocale, onLocaleChange, isInHeader = false }) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [showLanguagePopup, setShowLanguagePopup] = useState<boolean>(false);

  const sections = [
    {
      id: 'hero',
      label: currentLocale === 'fr' ? 'Accueil' : 'Home',
      icon: HiHome,
    },
    {
      id: 'services',
      label: currentLocale === 'fr' ? 'Services' : 'Services',
      icon: HiWrenchScrewdriver,
    },
    {
      id: 'reviews',
      label: currentLocale === 'fr' ? 'Avis' : 'Gallery',
      icon: HiChatBubbleBottomCenterText,
    },
    {
      id: 'contact',
      label: currentLocale === 'fr' ? 'Contact' : 'Get in Touch',
      icon: HiPhone,
    },
    {
      id: 'language',
      label: currentLocale === 'fr' ? 'Langue' : 'Language',
      icon: HiLanguage,
    },
  ];

  const getLanguageLabel = (locale: string) => {
    switch (locale) {
      case 'en':
        return 'EN';
      case 'fr':
        return 'FR';
      default:
        return locale.toUpperCase();
    }
  };

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

  const heroData = siteConfig.hero[currentLocale as keyof typeof siteConfig.hero] || siteConfig.hero.en;

  return (
    <div className={`z-40 ${isInHeader ? 'relative' : 'fixed right-6 top-1/2 -translate-y-1/2'}`}>
      <div className={`glass bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-gray-200/50 dark:border-gray-700/50 ${isInHeader ? 'flex space-x-2' : 'space-y-2'}`}>
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id || (section.id === 'language' && showLanguagePopup);

          return (
            <div key={section.id} className="relative">
              <button
                onClick={() => scrollToSection(section.id)}
                className={`
                  group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300
                  ${isActive
                    ? 'bg-yellow-400 text-black shadow-lg scale-110'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 hover:scale-105'
                  }
                `}
                title={section.label}
              >
                <Icon className="w-5 h-5" />

                {/* Tooltip */}
                <div className={`absolute ${isInHeader ? 'bottom-16 left-1/2 -translate-x-1/2' : 'right-16 top-1/2 -translate-y-1/2'} opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none`}>
                  <div className="bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
                    {section.label}
                    <div className={`absolute ${isInHeader
                      ? 'top-full left-1/2 -translate-x-1/2 w-0 h-0 border-t-4 border-t-gray-900 dark:border-t-gray-800 border-l-4 border-l-transparent border-r-4 border-r-transparent'
                      : 'top-1/2 -translate-y-1/2 left-full w-0 h-0 border-l-4 border-l-gray-900 dark:border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent'
                    }`}></div>
                  </div>
                </div>
              </button>

              {/* Language Popup */}
              {section.id === 'language' && showLanguagePopup && (
                <div className={`absolute z-50 ${isInHeader ? 'bottom-16 left-1/2 -translate-x-1/2' : 'right-16 top-1/2 -translate-y-1/2'}`}>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 shadow-xl border border-gray-200 dark:border-gray-600 min-w-[140px]">
                    <div className="space-y-1">
                      {siteConfig.supportedLocales.map((locale) => (
                        <button
                          key={locale}
                          onClick={() => handleLanguageChange(locale)}
                          className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            currentLocale === locale
                              ? 'bg-yellow-400 text-black shadow-sm'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-yellow-400 hover:text-black hover:shadow-sm'
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
                      ? 'top-full left-1/2 -translate-x-1/2 w-0 h-0 border-t-8 border-t-gray-50 dark:border-t-gray-800 border-l-8 border-l-transparent border-r-8 border-r-transparent'
                      : 'top-1/2 -translate-y-1/2 left-full w-0 h-0 border-l-8 border-l-gray-50 dark:border-l-gray-800 border-t-8 border-t-transparent border-b-8 border-b-transparent'
                    }`}></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
