'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import {
  HiBars3,
  HiXMark,
  HiHome,
  HiWrenchScrewdriver,
  HiPhoto,
  HiPhone
} from 'react-icons/hi2';
import siteConfig from '../../config/site.json';

export default function HamburgerMenu({ currentLocale = 'en' }: { currentLocale?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);

    // If we're currently on a /menu page, navigate back to home
    if (pathname.includes('/menu')) {
      const homePath = currentLocale === 'en' ? '/' : `/${currentLocale}`;
      router.push(homePath);
    }
  };

  const navigateTo = (path: string) => {
    router.push(path);
    closeMenu();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="contact-icon flex items-center justify-center transition-transform duration-200 hover:scale-110"
        title="Menu"
      >
        <HiBars3 className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-[var(--background-secondary)] bg-opacity-70 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            onClick={closeMenu}
          />

          {/* Menu Content */}
          <div className="relative bg-[var(--background-secondary)] bg-opacity-90 backdrop-blur-md rounded-lg p-8 max-w-md w-full mx-4 border border-[var(--primary)] animate-in slide-in-from-top-4 fade-in duration-300">
            {/* Close Button */}
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 text-[var(--primary)] hover:text-[var(--primary)] flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-90"
            >
              <HiXMark className="w-6 h-6" />
            </button>

            {/* Logo */}
            <div className="text-center mb-8">
              <Image
                src="/images/edm-main-logo.png"
                alt="EDM Logo"
                width={96}
                height={96}
                className="w-24 h-24 mx-auto"
              />
            </div>

            {/* Navigation Links */}
            <nav className="space-y-4">
              <button
                onClick={() => navigateTo(currentLocale === 'en' ? '/' : `/${currentLocale}`)}
                className="w-full text-left text-[var(--foreground)] hover:text-[var(--primary)] py-3 px-4 rounded transition-all duration-200 border-b border-[var(--border)] flex items-center space-x-3 hover:translate-x-2 hover:bg-[var(--background-secondary)]/50 animate-in slide-in-from-left-4 fade-in duration-300"
                style={{ animationDelay: '100ms' }}
              >
                <HiHome className="w-5 h-5 transition-transform duration-200" />
                <span>{currentLocale === 'en' ? 'Home' : 'Accueil'}</span>
              </button>

              <button
                onClick={() => scrollToSection('services')}
                className="w-full text-left text-[var(--foreground)] hover:text-[var(--primary)] py-3 px-4 rounded transition-all duration-200 border-b border-[var(--border)] flex items-center space-x-3 hover:translate-x-2 hover:bg-[var(--background-secondary)]/50 animate-in slide-in-from-left-4 fade-in duration-300"
                style={{ animationDelay: '200ms' }}
              >
                <HiWrenchScrewdriver className="w-5 h-5 transition-transform duration-200" />
                <span>{currentLocale === 'en' ? 'Services' : 'Services'}</span>
              </button>

              <button
                onClick={() => navigateTo(currentLocale === 'en' ? '/gallery' : `/${currentLocale}/gallery`)}
                className="w-full text-left text-[var(--foreground)] hover:text-[var(--primary)] py-3 px-4 rounded transition-all duration-200 border-b border-[var(--border)] flex items-center space-x-3 hover:translate-x-2 hover:bg-[var(--background-secondary)]/50 animate-in slide-in-from-left-4 fade-in duration-300"
                style={{ animationDelay: '300ms' }}
              >
                <HiPhoto className="w-5 h-5 transition-transform duration-200" />
                <span>{currentLocale === 'en' ? 'Gallery' : 'Galerie'}</span>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="w-full text-left text-[var(--foreground)] hover:text-[var(--primary)] py-3 px-4 rounded transition-all duration-200 border-b border-[var(--border)] flex items-center space-x-3 hover:translate-x-2 hover:bg-[var(--background-secondary)]/50 animate-in slide-in-from-left-4 fade-in duration-300"
                style={{ animationDelay: '400ms' }}
              >
                <HiPhone className="w-5 h-5 transition-transform duration-200" />
                <span>{currentLocale === 'en' ? 'Contact' : 'Contact'}</span>
              </button>
            </nav>

            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t border-[var(--border)] text-center animate-in slide-in-from-bottom-4 fade-in duration-300" style={{ animationDelay: '500ms' }}>
              <div className="text-[var(--primary)] font-bold text-lg mb-2">
                {currentLocale === 'en' ? 'Call Us Now!' : 'Appelez-nous!'}
              </div>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="text-[var(--foreground)] text-xl font-bold hover:text-[var(--primary)] transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
              <div className="mt-2">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors text-sm"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            {/* Free Quote CTA */}
            <div className="mt-6">
              <button
                onClick={() => navigateTo(currentLocale === 'en' ? '/contact' : `/${currentLocale}/contact`)}
                className="w-full btn-primary text-center"
              >
                {currentLocale === 'en' ? 'GET FREE QUOTE' : 'DEVIS GRATUIT'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
