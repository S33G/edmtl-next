'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="contact-icon flex items-center justify-center"
        title="Menu"
      >
        <HiBars3 className="w-5 h-5" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Menu Content */}
          <div className="relative bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-lg p-8 max-w-md w-full mx-4 border border-yellow-400">
            {/* Close Button */}
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 flex items-center justify-center"
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
                className="w-full text-left text-white hover:text-yellow-400 py-3 px-4 rounded transition-colors border-b border-gray-600 flex items-center space-x-3"
              >
                <HiHome className="w-5 h-5" />
                <span>{currentLocale === 'en' ? 'Home' : 'Accueil'}</span>
              </button>

              <button
                onClick={() => navigateTo(currentLocale === 'en' ? '/#services' : `/${currentLocale}#services`)}
                className="w-full text-left text-white hover:text-yellow-400 py-3 px-4 rounded transition-colors border-b border-gray-600 flex items-center space-x-3"
              >
                <HiWrenchScrewdriver className="w-5 h-5" />
                <span>{currentLocale === 'en' ? 'Services' : 'Services'}</span>
              </button>

              <button
                onClick={() => navigateTo(currentLocale === 'en' ? '/gallery' : `/${currentLocale}/gallery`)}
                className="w-full text-left text-white hover:text-yellow-400 py-3 px-4 rounded transition-colors border-b border-gray-600 flex items-center space-x-3"
              >
                <HiPhoto className="w-5 h-5" />
                <span>{currentLocale === 'en' ? 'Gallery' : 'Galerie'}</span>
              </button>

              <button
                onClick={() => navigateTo(currentLocale === 'en' ? '/contact' : `/${currentLocale}/contact`)}
                className="w-full text-left text-white hover:text-yellow-400 py-3 px-4 rounded transition-colors border-b border-gray-600 flex items-center space-x-3"
              >
                <HiPhone className="w-5 h-5" />
                <span>{currentLocale === 'en' ? 'Contact' : 'Contact'}</span>
              </button>
            </nav>

            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t border-gray-600 text-center">
              <div className="text-yellow-400 font-bold text-lg mb-2">
                {currentLocale === 'en' ? 'Call Us Now!' : 'Appelez-nous!'}
              </div>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="text-white text-xl font-bold hover:text-yellow-400 transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
              <div className="mt-2">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
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
