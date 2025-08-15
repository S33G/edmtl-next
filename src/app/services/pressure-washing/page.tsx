'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiArrowLeft, HiCheckCircle, HiBeaker, HiCog6Tooth, HiSparkles } from 'react-icons/hi2';

export default function PressureWashingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--background-secondary)] dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-pulse text-[var(--primary)] dark:text-teal-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--background-secondary)] dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="relative bg-gray-900/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-[var(--border-light)] dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-300 dark:text-gray-400 hover:text-[var(--primary)] dark:hover:text-teal-400 transition-colors duration-200"
            >
              <HiArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="text-sm text-gray-300 dark:text-gray-400">
              Professional Pressure Washing
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[var(--primary)]/10 dark:bg-teal-900/30 text-[var(--primary)] dark:text-teal-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HiSparkles className="w-4 h-4" />
            <span>Professional Pressure Washing</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-6">
            Expert Pressure Washing
          </h1>
          <p className="text-xl text-gray-300 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Professional pressure washing services in Montreal. Each surface has its own ideal cleaning method -
            from low pressure for delicate surfaces to high pressure for tough stains. We have the right tools and experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* General Pressure Washing */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-4">
              <HiSparkles className="w-6 h-6 text-[var(--primary)] dark:text-teal-400" />
            </div>
            <h3 className="text-lg font-semibold text-white dark:text-white mb-3">Pressure Washing</h3>
            <p className="text-gray-300 dark:text-gray-300 text-sm">
              Professional pressure washing for siding, driveways, decks, and large concrete surfaces using proper pressure and techniques.
            </p>
          </div>

          {/* High-Pressure Surface Washing */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-4">
              <HiCog6Tooth className="w-6 h-6 text-[var(--primary)] dark:text-teal-400" />
            </div>
            <h3 className="text-lg font-semibold text-white dark:text-white mb-3">High-Pressure</h3>
            <p className="text-gray-300 dark:text-gray-300 text-sm">
              Specialized equipment for cleaning large asphalt and concrete surfaces like driveways and parking garages efficiently.
            </p>
          </div>

          {/* Low-Pressure Surface Washing */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--primary)] dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white dark:text-white mb-3">Low-Pressure</h3>
            <p className="text-gray-300 dark:text-gray-300 text-sm">
              Gentle cleaning for delicate surfaces like wooden decks and vinyl siding using reduced pressure or soft-wash chemicals.
            </p>
          </div>

          {/* Polymeric Sand */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-4">
              <HiBeaker className="w-6 h-6 text-[var(--primary)] dark:text-teal-400" />
            </div>
            <h3 className="text-lg font-semibold text-white dark:text-white mb-3">Polymeric Sand</h3>
            <p className="text-gray-300 dark:text-gray-300 text-sm">
              Professional removal and installation of polymeric sand for interlocking pavers to restore their appearance and stability.
            </p>
          </div>
        </div>

        {/* Detailed Services */}
        <div className="space-y-12 mb-16">
          {/* General Pressure Washing */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white dark:text-white mb-6">Professional Pressure Washing</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-300 dark:text-gray-300 mb-6">
                    When used properly, the pressure washer is one of the most effective ways to clean large outdoor areas.
                    When used improperly, they can easily damage property and cause injury. We have been trusted to wash
                    siding, driveways, decks, and properties with large amounts of concrete pavers.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Extensive experience with various surfaces</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Proper pressure selection for each surface</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Professional safety protocols</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Trusted by property owners</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-black dark:text-white mb-4">Surfaces We Clean</h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>• House siding and exterior walls</li>
                    <li>• Driveways and walkways</li>
                    <li>• Decks and patios</li>
                    <li>• Concrete pavers and slabs</li>
                    <li>• Commercial surfaces</li>
                    <li>• Fences and outdoor structures</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* High-Pressure Surface Washing */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white dark:text-white mb-6">High-Pressure Surface Washing</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-300 dark:text-gray-300 mb-6">
                    We are equipped to pressure wash large asphalt and concrete surfaces like driveways and parking garages
                    efficiently. Often this requires the use of pre-wash, surfactant, degreaser, or detergent. Instead of a wand,
                    our surface washer attachment allows us to clean large areas with ease.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">High pressure (3000-4000 PSI) capability</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Surface washer attachment for large areas</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Pre-wash and degreaser application</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Efficient cleaning of parking garages</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-semibold text-blue-900 mb-4">Ideal For:</h3>
                  <ul className="space-y-2 text-sm text-[var(--primary)] dark:text-teal-400">
                    <li>• Large concrete driveways</li>
                    <li>• Parking garages and lots</li>
                    <li>• Commercial concrete surfaces</li>
                    <li>• Heavily stained asphalt</li>
                    <li>• Industrial floor cleaning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Low-Pressure Surface Washing */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white dark:text-white mb-6">Low-Pressure Surface Washing</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-300 dark:text-gray-300 mb-6">
                    On delicate surfaces like wooden decks or vinyl siding, powerful gas-powered pressure washers can easily
                    cause damage. The alternatives are to use a less powerful electric pressure washer (set to about 1600 PSI),
                    wash by hand, or soft-wash with a chemical. Whatever surface you need cleaning, EDM has the solution.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Low pressure (~1600 PSI) for delicate surfaces</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Soft-wash chemical applications</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Hand washing when appropriate</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Surface-appropriate cleaning methods</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="font-semibold text-green-900 mb-4">Perfect For:</h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• Wooden decks and fences</li>
                    <li>• Vinyl and aluminum siding</li>
                    <li>• Painted surfaces</li>
                    <li>• Delicate outdoor furniture</li>
                    <li>• Soft stone or brick</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Polymeric Sand Removal/Install */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white dark:text-white mb-6">Polymeric Sand Removal & Installation</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-300 dark:text-gray-300 mb-6">
                    If your interlock or pavers are looking unhappy, removing and replacing the polymeric sand that holds them
                    together can drastically improve the look. The keys to proper installation are using the correct amount and
                    depth of sand and using a compacting plate to vibrate and press the new sand tightly into the joints.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Professional sand removal and installation</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Proper depth and amount calculation</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Compacting plate vibration</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Dramatically improved appearance</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <h3 className="font-semibold text-amber-900 mb-4">⚠️ Why Choose Professionals</h3>
                  <p className="text-sm text-amber-800 mb-3">
                    Many amateur companies attempt this service without proper technique. This can lead to:
                  </p>
                  <ul className="space-y-2 text-xs text-amber-800">
                    <li>• Insufficient compaction</li>
                    <li>• Incorrect sand depth</li>
                    <li>• Poor joint filling</li>
                    <li>• Short-term results</li>
                  </ul>
                  <p className="text-sm font-medium text-amber-900 mt-3">Always hire a trusted professional!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-8 mb-16">
          <h2 className="text-2xl font-bold text-white dark:text-white mb-8 text-center">Why Choose EDM Pressure Washing?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiCog6Tooth className="w-8 h-8 text-[var(--primary)] dark:text-teal-400" />
              </div>
              <h3 className="font-semibold text-white dark:text-white mb-2">Right Equipment</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">From low pressure (1600 PSI) to high pressure (3000-4000 PSI), we have the right tools for every surface</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiBeaker className="w-8 h-8 text-[var(--primary)] dark:text-teal-400" />
              </div>
              <h3 className="font-semibold text-white dark:text-white mb-2">Extensive Experience</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">After many years, we always know the appropriate method to choose for each unique situation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiCheckCircle className="w-8 h-8 text-[var(--primary)] dark:text-teal-400" />
              </div>
              <h3 className="font-semibold text-white dark:text-white mb-2">Trusted Results</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">Clear communication, fixed-price quotes, and showing up on time with efficient, thorough work</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Property?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get a free quote for professional pressure washing services. We use the right pressure and techniques for every surface.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-gray-800 text-white dark:text-teal-400 hover:bg-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              Get Free Quote
            </Link>
            <a
              href="tel:438-500-3099"
              className="bg-blue-800 text-white hover:bg-blue-900 px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              Call (438) 500-3099
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
